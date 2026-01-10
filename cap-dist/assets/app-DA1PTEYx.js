import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css               */import{a as V,d as U,m as Oa}from"./firebase-config-C2tbVz-J.js";import{EmailAuthProvider as Ps,reauthenticateWithCredential as Bs,verifyBeforeUpdateEmail as Ds,updatePassword as Ms,updateProfile as As,setPersistence as Ns,browserLocalPersistence as qs,onAuthStateChanged as Bo,signOut as za}from"https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";import{doc as ce,getDoc as Do,updateDoc as wa,setDoc as Rs,addDoc as Mo,collection as ue,query as Ft,where as at,getDocs as ka,orderBy as Ao,writeBatch as No,serverTimestamp as Va,deleteDoc as Fs,arrayUnion as js,onSnapshot as Hs}from"https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";import{getToken as Os,onMessage as zs}from"https://www.gstatic.com/firebasejs/11.6.1/firebase-messaging.js";import"https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";import"https://www.gstatic.com/firebasejs/11.6.1/firebase-storage.js";const u={establishmentId:null,establishmentName:null,userName:null,userProfessionalId:null,userPermissions:null,establishmentSettings:null,enabledModules:{agenda:!0,comandas:!0,relatorios:!0,commissions:!0,packages:!0,financial:!0,servicos:!0,produtos:!0,profissionais:!0,clientes:!0,users:!0,estabelecimento:!0},professionals:[],services:[],professionalColors:new Map,allEvents:[]};function Vs(e,t,a){u.establishmentId=e,u.establishmentName=t,u.userPermissions=a}const qo=window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1",la=qo?"http://localhost:8080":"https://kairos-app-407358446276.us-central1.run.app";console.log(`🚀 API configurada para modo: ${qo?"LOCAL (Dev)":"PRODUÇÃO (Cloud)"}`);console.log("📡 URL Base:",la);async function Us(){const e=V.currentUser;return e?{"Content-Type":"application/json",Authorization:`Bearer ${await e.getIdToken()}`}:(console.warn("Usuário não logado, tentando redirecionar para /login"),window.location.href="/login",null)}async function w(e,t={}){const a=await Us();if(!a)throw new Error("Utilizador não autenticado. A requisição foi cancelada.");const s=la.replace(/\/$/,""),r=e.startsWith("/")?e:`/${e}`,o=`${s}${r}`;console.log(`AuthenticatedFetch: ${t.method||"GET"} ${o}`);try{const n=await fetch(o,{...t,headers:{...a,...t.headers}});if(!n.ok){const l=(await n.json().catch(()=>({message:n.statusText}))).message||`Erro na API: ${n.status}`;if(l.includes("FAILED_PRECONDITION")&&l.includes("requires an index")){const d=/(https:\/\/[^\s]+)/,c=l.match(d),m=c?c[0]:"URL não encontrada na mensagem de erro.";console.warn(`%c AVISO IMPORTANTE (FIREBASE): ÍNDICE NECESSÁRIO! %c
                    
Sua consulta em '${e}' falhou porque um índice composto do Firestore é necessário.
Para corrigir isso, clique no link abaixo (com o Firebase logado) e crie o índice:
                    
%c${m}%c
                    
--------------------------------------------------------------------`,"background-color: #ffc; color: #663300; font-size: 14px; font-weight: bold; padding: 5px;","color: #663300; font-size: 12px;","color: #0000ff; font-size: 12px; font-weight: bold; text-decoration: underline;","color: #663300; font-size: 12px;")}throw console.error(`Erro na API (${n.status}) em ${o}:`,l),new Error(l)}return n.json()}catch(n){throw console.error(`Falha de rede ao tentar acessar ${o}:`,n.message),n.message.includes("Failed to fetch")||n.message.includes("NetworkError")?new Error(`Não foi possível conectar ao servidor em ${la}. Verifique se o servidor backend está rodando.`):n}}const Ro=(e,t,a,s=null)=>{let r=`/api/appointments/${e}?startDate=${t}&endDate=${a}`;return s&&(r+=`&professionalId=${s}`),w(r)},_s=(e,t,a)=>{const s=`/api/appointments/cancelled/${e}?startDate=${t}&endDate=${a}`;return w(s)},Js=({establishmentId:e,professionalId:t,serviceIds:a,date:s})=>{const r=`/api/availability?establishmentId=${e}&professionalId=${t}&serviceIds=${a.join(",")}&date=${s}`;return w(r)},Ws=e=>w("/api/appointments",{method:"POST",body:JSON.stringify(e)}),Gs=(e,t)=>w(`/api/appointments/${e}`,{method:"PUT",body:JSON.stringify(t)}),Ua=e=>w(`/api/appointments/${e}`,{method:"DELETE"}),Ys=e=>w(`/api/appointments/${e}/reopen`,{method:"POST"}),Qs=(e,t)=>w(`/api/appointments/${e}/checkout`,{method:"POST",body:JSON.stringify(t)});let _;async function Xs(){if(!_)try{_=new(window.AudioContext||window.webkitAudioContext)}catch(e){console.error("Não foi possível inicializar o áudio:",e)}}function Zs(){if(!_){console.warn("AudioContext não inicializado. O som não será tocado.");return}_.state==="suspended"&&_.resume();const e=_.createOscillator(),t=_.createGain();e.connect(t),t.connect(_.destination),e.type="sine",e.frequency.setValueAtTime(800,_.currentTime),t.gain.setValueAtTime(0,_.currentTime),t.gain.linearRampToValueAtTime(.3,_.currentTime+.01),t.gain.exponentialRampToValueAtTime(1e-4,_.currentTime+.2),e.start(_.currentTime),e.stop(_.currentTime+.2)}function g(e,t,a="info",s=!1){const r=document.getElementById("toast-container");if(!r)return;s&&Zs();const o=document.createElement("div"),n={success:"bg-green-50 border-green-400 text-green-700",error:"bg-red-50 border-red-400 text-red-700",info:"bg-blue-50 border-blue-400 text-blue-700"},i={success:'<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',error:'<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',info:'<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>'},l={success:"bg-green-500",error:"bg-red-500",info:"bg-blue-500"};o.className=`toast ${n[a]||n.info}`,o.innerHTML=`
        <div class="toast-icon">${i[a]||i.info}</div>
        <div class="toast-content">
            <p class="font-bold">${e}</p>
            <p class="text-sm">${t}</p>
        </div>
        <button class="toast-close">&times;</button>
        <div class="toast-progress-bar">
            <div class="toast-progress ${l[a]||l.info}"></div>
        </div>
    `,r.appendChild(o),o.querySelector(".toast-close").addEventListener("click",()=>o.remove()),setTimeout(()=>{o.remove()},4e3)}function j(e,t){const a=document.getElementById("genericModal");return new Promise(s=>{a.innerHTML=`
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
            </div>`,a.style.display="flex",document.getElementById("genericModalConfirmBtn").onclick=()=>{a.style.display="none",s(!0)},document.getElementById("genericModalCancelBtn").onclick=()=>{a.style.display="none",s(!1)}})}function Y({title:e,contentHTML:t,maxWidth:a="max-w-4xl",showCloseButton:s=!0}){let r=document.getElementById("genericModal");const o=r.cloneNode(!1);r.parentNode.replaceChild(o,r),r=o;const n=()=>{r.style.display="none"},i=c=>{r.querySelector("#genericModalContentBody").innerHTML=c};r.innerHTML=`
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
    `;const l=r.querySelector("[data-close-modal]");l&&(l.onclick=n);const d=r.querySelector('[data-action="close-modal"]');return d&&(d.onclick=n),r.addEventListener("click",c=>{c.target.closest(".modal-content")||n()}),r.style.display="flex",{modalElement:r,close:n,setContent:i}}function jt(e){const t=document.getElementById(e);t&&(t.style.display="none")}function Ks(){document.body.addEventListener("click",()=>{_||Xs()},{once:!0}),document.addEventListener("click",e=>{const t=e.target.closest('[data-action="close-modal"]');if(t){const s=t.dataset.target;if(s){const r=document.getElementById(s);r&&(r.style.display="none")}}if(e.target.closest("[data-close-modal]")){const s=document.getElementById("genericModal");s&&(s.style.display="none")}})}async function _a(){const e=document.getElementById("cancellationListContainer");if(!e)return;e.innerHTML='<div class="loader mx-auto"></div>';const t=document.getElementById("cancelStartDate").value,a=document.getElementById("cancelEndDate").value;try{const s=await _s(u.establishmentId,t,a);if(s.length===0){e.innerHTML='<p class="text-center text-gray-500 py-4">Nenhum cancelamento encontrado para este período.</p>';return}e.innerHTML=s.map(r=>`
            <div class="bg-red-50 p-3 rounded-lg border-l-4 border-red-400">
                <div class="flex justify-between items-center">
                    <div>
                        <p class="font-bold text-gray-800">${r.clientName}</p>
                        <p class="text-sm text-gray-600">${new Date(r.date).toLocaleString("pt-BR",{dateStyle:"short",timeStyle:"short"})} - ${r.serviceName}</p>
                        <p class="text-xs text-gray-500">com ${r.professionalName}</p>
                    </div>
                </div>
            </div>
        `).join("")}catch(s){e.innerHTML=`<p class="text-red-500 text-center py-4">Erro ao carregar histórico: ${s.message}</p>`}}function er(){const e=new Date().toISOString().split("T")[0],t=new Date;t.setDate(t.getDate()-30);const s=`
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
    `,{modalElement:r}=Y({title:"Histórico de Cancelamentos",contentHTML:s,maxWidth:"max-w-3xl"});r.querySelector("#searchCancellationsBtn").addEventListener("click",_a),_a()}const X=document.getElementById("sidebar"),Ja=document.getElementById("sidebarToggle"),Ge=document.getElementById("mainContent"),tr=document.querySelectorAll(".sidebar-link"),Wa=document.getElementById("hamburger-menu-btn"),Ae=document.getElementById("mobile-overlay");function kt(e){!X||!Ge||(X.classList.toggle("collapsed",e),Ge.classList.toggle("sidebar-collapsed-shift",e))}function ar(){!X||!Ae||(X.classList.add("mobile-open"),Ae.classList.add("visible"))}function ut(){!X||!Ae||(X.classList.remove("mobile-open"),Ae.classList.remove("visible"))}function or(){kt(!X.classList.contains("collapsed"))}function sr(e,t,a){if(!X||!Ge)return;Ge.classList.add("main-content-shift"),window.innerWidth>=768?kt(X.classList.contains("collapsed")):(Ge.classList.remove("main-content-shift","sidebar-collapsed-shift"),ut()),Ja&&Ja.addEventListener("click",r=>{r.stopPropagation(),or()}),X.addEventListener("mouseenter",()=>{window.innerWidth>=1024&&X.classList.contains("collapsed")&&kt(!1)}),X.addEventListener("mouseleave",()=>{window.innerWidth>=1024&&(document.querySelector("#sidebarToggle:hover")||kt(!0))}),Wa&&Wa.addEventListener("click",r=>{r.stopPropagation(),ar()}),Ae&&Ae.addEventListener("click",r=>{r.stopPropagation(),ut()});let s=0;X.addEventListener("touchstart",r=>{s=r.changedTouches[0].screenX},{passive:!0}),X.addEventListener("touchend",r=>{const o=r.changedTouches[0].screenX;s-o>50&&ut()},{passive:!0}),tr.forEach(r=>{const o=r.getAttribute("data-target"),n=o.replace("-section",""),i=a?.[n]!==!1,l=t===null||t[o]?.view===!0;if(!i||!l){r.style.display="none";return}r.style.display="flex",r.addEventListener("click",d=>{d.preventDefault(),o&&typeof e=="function"&&e(o),window.innerWidth<768&&ut()})})}const ke=e=>{const t=e||u.establishmentId;return t?w(`/api/establishments/${t}`):Promise.reject(new Error("ID do estabelecimento não fornecido."))},St=(e,t)=>{const a=e||u.establishmentId;return a?w(`/api/establishments/${a}`,{method:"PUT",body:JSON.stringify(t)}):Promise.reject(new Error("ID do estabelecimento não fornecido."))},rr=(e,t)=>{const a=e||u.establishmentId;return a?w(`/api/establishments/${a}/booking-status`,{method:"PATCH",body:JSON.stringify({publicBookingEnabled:t})}):Promise.reject(new Error("ID do estabelecimento não fornecido."))},nr=(e,t)=>{const a=e||u.establishmentId;return a?w(`/api/establishments/${a}/owner-email`,{method:"PATCH",body:JSON.stringify({newEmail:t})}):Promise.reject(new Error("ID do estabelecimento não fornecido."))},Z=e=>w(`/api/professionals/${e}`),ir=e=>w(`/api/professionals/details/${e}`),Fo=e=>w("/api/professionals",{method:"POST",body:JSON.stringify(e)}),Lt=(e,t)=>w(`/api/professionals/${e}`,{method:"PUT",body:JSON.stringify(t)}),Ga=(e,t)=>Lt(e,{services:t}),jo=e=>w(`/api/professionals/${e}`,{method:"DELETE"}),lr=e=>{const t=e.map(a=>jo(a));return Promise.all(t)},Se=e=>w(`/api/services/${e}`),Ho=e=>w("/api/services",{method:"POST",body:JSON.stringify(e)}),dr=(e,t)=>w(`/api/services/${e}`,{method:"PUT",body:JSON.stringify(t)}),cr=e=>w(`/api/services/${e}`,{method:"DELETE"}),ur=(e,t)=>w(`/api/services/${e}/status`,{method:"PATCH",body:JSON.stringify({active:t})}),mr=e=>w(`/api/services/stats/most-popular/${e}`),Ht=e=>w(`/api/products/${e}`),Oo=e=>w("/api/products",{method:"POST",body:JSON.stringify(e)}),pr=(e,t)=>w(`/api/products/${e}`,{method:"PUT",body:JSON.stringify(t)}),gr=e=>w(`/api/products/${e}`,{method:"DELETE"}),br=(e,t)=>w(`/api/products/${e}/stock`,{method:"PATCH",body:JSON.stringify(t)}),fr=({startDate:e,endDate:t,productId:a,categoryId:s,establishmentId:r})=>{const o=new URLSearchParams({startDate:e,endDate:t});return a&&a!=="all"&&o.append("productId",a),s&&s!=="all"&&o.append("categoryId",s),r&&o.append("establishmentId",r),w(`/api/products/stock-history/report?${o.toString()}`)},vr={indigo:{name:"Padrão (Índigo)",main:"#4f46e5"},blue:{name:"Azul",main:"#2563eb"},sky:{name:"Céu",main:"#0284c7"},teal:{name:"Verde Água",main:"#0d9488"},emerald:{name:"Esmeralda",main:"#059669"},green:{name:"Verde",main:"#16a34a"},lime:{name:"Lima",main:"#65a30d"},amber:{name:"Âmbar",main:"#d97706"},orange:{name:"Laranja",main:"#ea580c"},red:{name:"Vermelho",main:"#dc2626"},rose:{name:"Rosa",main:"#e11d48"},pink:{name:"Pink",main:"#db2777"},fuchsia:{name:"Fúcsia",main:"#c026d3"},purple:{name:"Roxo",main:"#7c3aed"},violet:{name:"Violeta",main:"#8b5cf6"},gray:{name:"Cinza",main:"#4b5563"},black:{name:"Preto",main:"#111827"}};function Ya(e,t,a){return new Promise((s,r)=>{const o=new FileReader;o.readAsDataURL(e),o.onload=n=>{const i=new Image;i.src=n.target.result,i.onload=()=>{const l=document.createElement("canvas");let d=i.width,c=i.height;d>t&&(c*=t/d,d=t),l.width=d,l.height=c,l.getContext("2d").drawImage(i,0,0,d,c);const b=e.type==="image/png"&&t<500?"image/png":"image/jpeg";s(l.toDataURL(b,a))},i.onerror=l=>r(l)},o.onerror=n=>r(n)})}let de=null;const $t=[{id:"company_data",title:"Identidade do Negócio",icon:"🏢",description:"Configure os dados da sua empresa."},{id:"branding",title:"Sua Marca",icon:"🎨",description:"Logo e cores (Opcional)."},{id:"time_config",title:"O Relógio",icon:"⏱️",description:"Tempo padrão entre agendamentos."},{id:"first_service",title:"O Menu",icon:"✂️",description:"Seu principal serviço."},{id:"first_prof",title:"Sua Equipe",icon:"💇",description:"Cadastre o primeiro profissional."},{id:"first_product",title:"O Estoque",icon:"🧴",description:"Cadastre um produto (opcional)."}];let K=0,Tt=[];async function hr(){try{console.log("Iniciando verificação de Onboarding para ID:",u.establishmentId);const e=await ke(u.establishmentId),t=await Z(u.establishmentId),a=await Se(u.establishmentId);Tt=a||[];const s=e&&e.name&&(e.phone||e.address),r=e&&(e.logo||e.themeColor&&e.themeColor!=="indigo"),o=e&&e.slotInterval>0,n=a&&a.length>0,i=t&&t.length>0;if(console.log("Status Onboarding:",{hasCompanyData:s,hasBranding:r,hasTimeConfig:o,hasService:n,hasProf:i}),s&&o&&i&&n)return;if(!s)K=0;else if(!r&&!o)K=1;else if(!o)K=2;else if(!n)K=3;else if(!i)K=4;else if(K===0)return;xr(),$a(K)}catch(e){console.error("Erro ao verificar onboarding:",e)}}function xr(){document.getElementById("onboarding-overlay")||(de=document.createElement("div"),de.id="onboarding-overlay",de.className="fixed inset-0 bg-gray-900 bg-opacity-95 z-[9999] flex items-center justify-center p-4 overflow-y-auto",de.style.cssText="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background-color: rgba(17, 24, 39, 0.95); z-index: 9999; display: flex; align-items: center; justify-content: center;",de.innerHTML=`
        <div class="bg-white rounded-xl shadow-2xl w-full overflow-hidden relative animate-fade-in-up" style="background-color: white; border-radius: 0.75rem; max-width: 35rem; width: 95%;">
            <div class="bg-indigo-600 p-4 text-white text-center" style="background-color: #4f46e5; padding: 1.25rem; color: white;">
                <h2 class="text-2xl font-bold mb-1">🚀 Vamos Decolar!</h2>
                <p class="text-indigo-100 text-sm">Complete as missões para configurar seu ambiente.</p>
                
                <div class="mt-4 relative pt-1">
                    <div class="flex mb-1 items-center justify-between">
                        <div class="text-right">
                            <span class="text-[10px] font-semibold inline-block py-0.5 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200">
                                Progresso
                            </span>
                        </div>
                        <div class="text-right">
                            <span id="progress-text" class="text-xs font-semibold inline-block text-white">
                                0%
                            </span>
                        </div>
                    </div>
                    <div class="overflow-hidden h-1.5 mb-2 text-xs flex rounded bg-indigo-200" style="background-color: #c7d2fe; height: 0.375rem; border-radius: 0.25rem;">
                        <div id="progress-bar" style="width:0%; background-color: #4ade80;" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-500"></div>
                    </div>
                </div>
            </div>

            <div id="onboarding-step-content" class="p-5">
                </div>
        </div>
    `,document.body.appendChild(de),Sa())}function Sa(){const e=Math.round(K/$t.length*100),t=document.getElementById("progress-bar"),a=document.getElementById("progress-text");t&&(t.style.width=`${e}%`),a&&(a.innerText=`${e}%`)}function $a(e){const t=document.getElementById("onboarding-step-content"),a=$t[e];if(!a){Qa(t);return}let s="";if(a.id==="company_data")s=`
            <form id="step-form" class="space-y-3">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                        <label class="block text-xs font-bold text-gray-700 uppercase">Nome do Estabelecimento</label>
                        <input type="text" name="name" class="mt-1 w-full p-2 border rounded text-sm" required placeholder="Ex: Barbearia do João">
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-gray-700 uppercase">Seu Nome</label>
                        <input type="text" name="ownerName" class="mt-1 w-full p-2 border rounded text-sm" required value="${u.userName||""}">
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                        <label class="block text-xs font-bold text-gray-700 uppercase">WhatsApp</label>
                        <input type="tel" name="phone" class="mt-1 w-full p-2 border rounded text-sm" required placeholder="(00) 00000-0000">
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-gray-700 uppercase">E-mail</label>
                        <input type="email" name="email" class="mt-1 w-full p-2 border rounded text-sm" required value="${u.userEmail||""}">
                    </div>
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-700 uppercase">Endereço</label>
                    <input type="text" name="address" class="mt-1 w-full p-2 border rounded text-sm" required placeholder="Rua, Número, Bairro">
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-700 uppercase">CEP</label>
                    <input type="text" name="zipCode" class="mt-1 w-full p-2 border rounded text-sm" required placeholder="00000-000">
                </div>
            </form>
        `;else if(a.id==="branding")s=`
            <form id="step-form" class="space-y-4">
                <p class="text-gray-600 text-xs">Personalize a aparência do seu sistema (Opcional).</p>
                
                <div class="flex items-center gap-3">
                    <div class="shrink-0">
                        <div id="logo-preview" class="h-14 w-14 rounded bg-gray-100 border flex items-center justify-center text-[10px] text-gray-400">Logo</div>
                    </div>
                    <div class="w-full">
                        <label class="block text-xs font-bold text-gray-700 uppercase">Logotipo</label>
                        <input type="file" id="logo-input" accept="image/*" class="mt-1 block w-full text-xs text-gray-500 file:mr-2 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100">
                        <input type="hidden" name="logoBase64" id="logo-base64">
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-3">
                    <div>
                        <label class="block text-xs font-bold text-gray-700 uppercase">Tema do Painel</label>
                        <select name="themeColor" class="mt-1 w-full p-2 border rounded text-sm bg-white">
                            ${Object.entries(vr).map(([o,n])=>`<option value="${o}">${n.name}</option>`).join("")}
                        </select>
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-gray-700 uppercase">Cor do Link</label>
                        <div class="flex items-center gap-2 mt-1">
                            <input type="color" name="primaryColor" value="#4f46e5" class="h-8 w-12 p-0.5 border rounded cursor-pointer">
                        </div>
                    </div>
                </div>

                <div>
                    <label class="block text-xs font-bold text-gray-700 uppercase">Imagem de Fundo</label>
                    <input type="file" id="bg-input" accept="image/*" class="mt-1 block w-full text-xs text-gray-500 file:mr-2 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100">
                    <input type="hidden" name="bgBase64" id="bg-base64">
                </div>
            </form>
        `;else if(a.id==="time_config")s=`
            <form id="step-form" class="space-y-4">
                <p class="text-gray-600 text-sm">Selecione o intervalo padrão da agenda.</p>
                
                <div class="grid grid-cols-3 gap-2">
                    ${[10,15,20,30,45,60].map(r=>`
                        <label class="cursor-pointer">
                            <input type="radio" name="slotInterval" value="${r}" class="peer sr-only" ${r===30?"checked":""}>
                            <div class="text-center py-2 px-1 border rounded hover:bg-indigo-50 peer-checked:bg-indigo-600 peer-checked:text-white peer-checked:border-indigo-600 transition-all font-bold text-sm text-gray-700">
                                ${r} min
                            </div>
                        </label>
                    `).join("")}
                </div>
            </form>
        `;else if(a.id==="first_service")s=`
            <form id="step-form" class="space-y-3">
                <p class="text-gray-600 text-sm">Qual serviço você mais vende?</p>
                <div>
                    <label class="block text-xs font-bold text-gray-700 uppercase">Nome do Serviço</label>
                    <input type="text" name="name" class="mt-1 w-full p-2 border rounded text-sm" required placeholder="Ex: Corte Masculino">
                </div>
                <div class="grid grid-cols-2 gap-3">
                    <div>
                        <label class="block text-xs font-bold text-gray-700 uppercase">Preço (R$)</label>
                        <input type="number" name="price" step="0.01" class="mt-1 w-full p-2 border rounded text-sm" required placeholder="0,00">
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-gray-700 uppercase">Duração (min)</label>
                        <input type="number" name="duration" class="mt-1 w-full p-2 border rounded text-sm" required value="30">
                    </div>
                </div>
            </form>
        `;else if(a.id==="first_prof"){const r=Tt.map(n=>`<option value="${n.id}">${n.name}</option>`).join(""),o=Tt.length>0;s=`
            <form id="step-form" class="space-y-3">
                <p class="text-gray-600 text-sm">Quem realiza os serviços? (Pode ser você!)</p>
                <div>
                    <label class="block text-xs font-bold text-gray-700 uppercase">Nome</label>
                    <input type="text" name="name" class="mt-1 w-full p-2 border rounded text-sm" required value="${u.userName||""}">
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-700 uppercase">Especialidade</label>
                    <input type="text" name="role" class="mt-1 w-full p-2 border rounded text-sm" placeholder="Ex: Cabeleireiro">
                </div>
                ${o?`
                <div>
                    <label class="block text-xs font-bold text-gray-700 uppercase">Serviço Principal</label>
                    <select name="serviceId" class="mt-1 w-full p-2 border rounded text-sm bg-white">
                        ${r}
                    </select>
                </div>
                `:""}
            </form>
        `}else a.id==="first_product"&&(s=`
            <form id="step-form" class="space-y-3">
                <p class="text-gray-600 text-sm">Cadastre um produto para venda.</p>
                <div>
                    <label class="block text-xs font-bold text-gray-700 uppercase">Nome do Produto</label>
                    <input type="text" name="name" class="mt-1 w-full p-2 border rounded text-sm" required placeholder="Ex: Gel Fixador">
                </div>
                <div class="grid grid-cols-2 gap-3">
                    <div>
                        <label class="block text-xs font-bold text-gray-700 uppercase">Venda (R$)</label>
                        <input type="number" name="salePrice" step="0.01" class="mt-1 w-full p-2 border rounded text-sm" required placeholder="0,00">
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-gray-700 uppercase">Estoque</label>
                        <input type="number" name="stock" class="mt-1 w-full p-2 border rounded text-sm" required value="10">
                    </div>
                </div>
            </form>
        `);if(t.innerHTML=`
        <div class="flex items-center mb-4">
            <span class="text-3xl mr-3">${a.icon}</span>
            <div>
                <h3 class="text-lg font-bold text-gray-800">${a.title}</h3>
                <p class="text-gray-500 text-xs">${a.description}</p>
            </div>
        </div>
        
        ${s}

        <div class="mt-6 flex justify-end gap-2">
            ${a.id==="first_product"||a.id==="branding"?'<button type="button" id="skip-btn" class="text-gray-500 hover:text-gray-700 font-medium text-sm px-3 py-2">Pular</button>':""}
            <button type="button" id="next-step-btn" class="bg-indigo-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-indigo-700 transition flex items-center gap-2 text-sm">
                ${e===$t.length-1?"Concluir":"Próximo"}
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
            </button>
        </div>
    `,document.getElementById("next-step-btn").addEventListener("click",()=>yr(a.id)),document.getElementById("skip-btn")&&document.getElementById("skip-btn").addEventListener("click",()=>{e===$t.length-1?Qa(t):(K++,Sa(),$a(K))}),a.id==="branding"){const r=document.getElementById("logo-input"),o=document.getElementById("bg-input");r&&(r.onchange=async n=>{const i=n.target.files[0];if(i)try{const l=await Ya(i,200,.8);document.getElementById("logo-base64").value=l,document.getElementById("logo-preview").innerHTML=`<img src="${l}" class="w-full h-full object-contain rounded">`}catch(l){console.error("Erro logo",l)}}),o&&(o.onchange=async n=>{const i=n.target.files[0];if(i)try{const l=await Ya(i,1024,.7);document.getElementById("bg-base64").value=l}catch(l){console.error("Erro bg",l)}})}}function Qa(e){e.innerHTML=`
        <div class="text-center py-6">
            <div class="text-5xl mb-3">🏆</div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">Tudo Pronto!</h3>
            <p class="text-gray-600 text-sm mb-6">Seu sistema está configurado. Boas vendas!</p>
            <button id="finish-onboarding-btn" class="bg-indigo-600 text-white font-bold py-2 px-6 rounded-full hover:bg-indigo-700 transition shadow-lg transform hover:scale-105 text-sm">
                Acessar Painel
            </button>
        </div>
    `;const t=document.getElementById("progress-bar"),a=document.getElementById("progress-text");t&&(t.style.width="100%"),a&&(a.innerText="100%"),document.getElementById("finish-onboarding-btn").onclick=()=>{de&&de.remove(),window.location.reload()}}async function yr(e){const t=document.getElementById("step-form");if(!t.reportValidity())return;const a=document.getElementById("next-step-btn"),s=a.innerHTML;a.disabled=!0,a.innerHTML="Salvando...";const r=new FormData(t),o=Object.fromEntries(r.entries());try{if(e==="company_data")await St(u.establishmentId,{name:o.name,phone:o.phone,email:o.email,address:o.address,zipCode:o.zipCode});else if(e==="branding"){const n={};o.logoBase64&&(n.logo=o.logoBase64),o.bgBase64&&(n.backgroundImage=o.bgBase64),o.themeColor&&(n.themeColor=o.themeColor),o.primaryColor&&(n.primaryColor=o.primaryColor),Object.keys(n).length>0&&await St(u.establishmentId,n)}else if(e==="time_config"){const n=parseInt(o.slotInterval);await St(u.establishmentId,{slotInterval:n})}else if(e==="first_service"){const n=await Ho({establishmentId:u.establishmentId,name:o.name,price:parseFloat(o.price),duration:parseInt(o.duration),active:!0});n&&Tt.push(n)}else if(e==="first_prof"){const n=await Fo({establishmentId:u.establishmentId,name:o.name,specialty:o.role,active:!0,commissionRate:0});if(o.serviceId&&n&&n.id)try{Ga?await Ga(n.id,[o.serviceId]):Lt&&await Lt(n.id,{services:[o.serviceId]})}catch(i){console.warn("Não foi possível vincular o serviço automaticamente.",i)}}else e==="first_product"&&await Oo({establishmentId:u.establishmentId,name:o.name,price:parseFloat(o.salePrice),stock:parseInt(o.stock),active:!0});g("Sucesso","Passo concluído!","success"),K++,Sa(),$a(K)}catch(n){g("Erro","Erro ao salvar: "+n.message,"error"),a.disabled=!1,a.innerHTML=s}}var Ne;(function(e){e.Unimplemented="UNIMPLEMENTED",e.Unavailable="UNAVAILABLE"})(Ne||(Ne={}));class Qt extends Error{constructor(t,a,s){super(t),this.message=t,this.code=a,this.data=s}}const wr=e=>{var t,a;return e?.androidBridge?"android":!((a=(t=e?.webkit)===null||t===void 0?void 0:t.messageHandlers)===null||a===void 0)&&a.bridge?"ios":"web"},kr=e=>{const t=e.CapacitorCustomPlatform||null,a=e.Capacitor||{},s=a.Plugins=a.Plugins||{},r=()=>t!==null?t.name:wr(e),o=()=>r()!=="web",n=m=>{const b=d.get(m);return!!(b?.platforms.has(r())||i(m))},i=m=>{var b;return(b=a.PluginHeaders)===null||b===void 0?void 0:b.find(f=>f.name===m)},l=m=>e.console.error(m),d=new Map,c=(m,b={})=>{const f=d.get(m);if(f)return console.warn(`Capacitor plugin "${m}" already registered. Cannot register plugins twice.`),f.proxy;const v=r(),p=i(m);let x;const k=async()=>(!x&&v in b?x=typeof b[v]=="function"?x=await b[v]():x=b[v]:t!==null&&!x&&"web"in b&&(x=typeof b.web=="function"?x=await b.web():x=b.web),x),E=(T,B)=>{var N,F;if(p){const z=p?.methods.find(A=>B===A.name);if(z)return z.rtype==="promise"?A=>a.nativePromise(m,B.toString(),A):(A,Q)=>a.nativeCallback(m,B.toString(),A,Q);if(T)return(N=T[B])===null||N===void 0?void 0:N.bind(T)}else{if(T)return(F=T[B])===null||F===void 0?void 0:F.bind(T);throw new Qt(`"${m}" plugin is not implemented on ${v}`,Ne.Unimplemented)}},S=T=>{let B;const N=(...F)=>{const z=k().then(A=>{const Q=E(A,T);if(Q){const $e=Q(...F);return B=$e?.remove,$e}else throw new Qt(`"${m}.${T}()" is not implemented on ${v}`,Ne.Unimplemented)});return T==="addListener"&&(z.remove=async()=>B()),z};return N.toString=()=>`${T.toString()}() { [capacitor code] }`,Object.defineProperty(N,"name",{value:T,writable:!1,configurable:!1}),N},$=S("addListener"),L=S("removeListener"),R=(T,B)=>{const N=$({eventName:T},B),F=async()=>{const A=await N;L({eventName:T,callbackId:A},B)},z=new Promise(A=>N.then(()=>A({remove:F})));return z.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await F()},z},O=new Proxy({},{get(T,B){switch(B){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return p?R:$;case"removeListener":return L;default:return S(B)}}});return s[m]=O,d.set(m,{name:m,proxy:O,platforms:new Set([...Object.keys(b),...p?[v]:[]])}),O};return a.convertFileSrc||(a.convertFileSrc=m=>m),a.getPlatform=r,a.handleError=l,a.isNativePlatform=o,a.isPluginAvailable=n,a.registerPlugin=c,a.Exception=Qt,a.DEBUG=!!a.DEBUG,a.isLoggingEnabled=!!a.isLoggingEnabled,a},Sr=e=>e.Capacitor=kr(e),he=Sr(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),Ea=he.registerPlugin;class zo{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(t,a){let s=!1;this.listeners[t]||(this.listeners[t]=[],s=!0),this.listeners[t].push(a);const o=this.windowListeners[t];o&&!o.registered&&this.addWindowListener(o),s&&this.sendRetainedArgumentsForEvent(t);const n=async()=>this.removeListener(t,a);return Promise.resolve({remove:n})}async removeAllListeners(){this.listeners={};for(const t in this.windowListeners)this.removeWindowListener(this.windowListeners[t]);this.windowListeners={}}notifyListeners(t,a,s){const r=this.listeners[t];if(!r){if(s){let o=this.retainedEventArguments[t];o||(o=[]),o.push(a),this.retainedEventArguments[t]=o}return}r.forEach(o=>o(a))}hasListeners(t){var a;return!!(!((a=this.listeners[t])===null||a===void 0)&&a.length)}registerWindowListener(t,a){this.windowListeners[a]={registered:!1,windowEventName:t,pluginEventName:a,handler:s=>{this.notifyListeners(a,s)}}}unimplemented(t="not implemented"){return new he.Exception(t,Ne.Unimplemented)}unavailable(t="not available"){return new he.Exception(t,Ne.Unavailable)}async removeListener(t,a){const s=this.listeners[t];if(!s)return;const r=s.indexOf(a);this.listeners[t].splice(r,1),this.listeners[t].length||this.removeWindowListener(this.windowListeners[t])}addWindowListener(t){window.addEventListener(t.windowEventName,t.handler),t.registered=!0}removeWindowListener(t){t&&(window.removeEventListener(t.windowEventName,t.handler),t.registered=!1)}sendRetainedArgumentsForEvent(t){const a=this.retainedEventArguments[t];a&&(delete this.retainedEventArguments[t],a.forEach(s=>{this.notifyListeners(t,s)}))}}const Xa=e=>encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),Za=e=>e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent);class $r extends zo{async getCookies(){const t=document.cookie,a={};return t.split(";").forEach(s=>{if(s.length<=0)return;let[r,o]=s.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");r=Za(r).trim(),o=Za(o).trim(),a[r]=o}),a}async setCookie(t){try{const a=Xa(t.key),s=Xa(t.value),r=`; expires=${(t.expires||"").replace("expires=","")}`,o=(t.path||"/").replace("path=",""),n=t.url!=null&&t.url.length>0?`domain=${t.url}`:"";document.cookie=`${a}=${s||""}${r}; path=${o}; ${n};`}catch(a){return Promise.reject(a)}}async deleteCookie(t){try{document.cookie=`${t.key}=; Max-Age=0`}catch(a){return Promise.reject(a)}}async clearCookies(){try{const t=document.cookie.split(";")||[];for(const a of t)document.cookie=a.replace(/^ +/,"").replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(t){return Promise.reject(t)}}async clearAllCookies(){try{await this.clearCookies()}catch(t){return Promise.reject(t)}}}Ea("CapacitorCookies",{web:()=>new $r});const Er=async e=>new Promise((t,a)=>{const s=new FileReader;s.onload=()=>{const r=s.result;t(r.indexOf(",")>=0?r.split(",")[1]:r)},s.onerror=r=>a(r),s.readAsDataURL(e)}),Ir=(e={})=>{const t=Object.keys(e);return Object.keys(e).map(r=>r.toLocaleLowerCase()).reduce((r,o,n)=>(r[o]=e[t[n]],r),{})},Cr=(e,t=!0)=>e?Object.entries(e).reduce((s,r)=>{const[o,n]=r;let i,l;return Array.isArray(n)?(l="",n.forEach(d=>{i=t?encodeURIComponent(d):d,l+=`${o}=${i}&`}),l.slice(0,-1)):(i=t?encodeURIComponent(n):n,l=`${o}=${i}`),`${s}&${l}`},"").substr(1):null,Lr=(e,t={})=>{const a=Object.assign({method:e.method||"GET",headers:e.headers},t),r=Ir(e.headers)["content-type"]||"";if(typeof e.data=="string")a.body=e.data;else if(r.includes("application/x-www-form-urlencoded")){const o=new URLSearchParams;for(const[n,i]of Object.entries(e.data||{}))o.set(n,i);a.body=o.toString()}else if(r.includes("multipart/form-data")||e.data instanceof FormData){const o=new FormData;if(e.data instanceof FormData)e.data.forEach((i,l)=>{o.append(l,i)});else for(const i of Object.keys(e.data))o.append(i,e.data[i]);a.body=o;const n=new Headers(a.headers);n.delete("content-type"),a.headers=n}else(r.includes("application/json")||typeof e.data=="object")&&(a.body=JSON.stringify(e.data));return a};class Tr extends zo{async request(t){const a=Lr(t,t.webFetchExtra),s=Cr(t.params,t.shouldEncodeUrlParams),r=s?`${t.url}?${s}`:t.url,o=await fetch(r,a),n=o.headers.get("content-type")||"";let{responseType:i="text"}=o.ok?t:{};n.includes("application/json")&&(i="json");let l,d;switch(i){case"arraybuffer":case"blob":d=await o.blob(),l=await Er(d);break;case"json":l=await o.json();break;case"document":case"text":default:l=await o.text()}const c={};return o.headers.forEach((m,b)=>{c[b]=m}),{data:l,headers:c,status:o.status,url:o.url}}async get(t){return this.request(Object.assign(Object.assign({},t),{method:"GET"}))}async post(t){return this.request(Object.assign(Object.assign({},t),{method:"POST"}))}async put(t){return this.request(Object.assign(Object.assign({},t),{method:"PUT"}))}async patch(t){return this.request(Object.assign(Object.assign({},t),{method:"PATCH"}))}async delete(t){return this.request(Object.assign(Object.assign({},t),{method:"DELETE"}))}}Ea("CapacitorHttp",{web:()=>new Tr});const W=Ea("PushNotifications",{}),Pr="BDA-IaH_jjWBRwHbuFcB56I25jKHpchx34yZtv_6iIo_yV2tz_yIZYS3hfntDaN5Slf4ch8ZEJCIt4D7LIWX4mY";let Ka=!1;async function Vo(){if(window.Capacitor&&window.Capacitor.isNativePlatform()){try{await W.removeAllListeners(),await W.addListener("registration",async a=>{Jo(a.value,!0)}),await W.addListener("pushNotificationReceived",a=>{console.log("[Push Nativo] Recebido em Foreground (Visual gerido pelo Firestore):",a)}),await W.addListener("pushNotificationActionPerformed",a=>{const s=a.notification.data;console.log("Notificação clicada (Ação):",s)});let t=await W.checkPermissions();t.receive==="prompt"&&(t=await W.requestPermissions()),t.receive==="granted"&&await W.register()}catch(t){console.error("[Push Nativo] Erro:",t)}return}"Notification"in window&&Notification.permission==="granted"&&_o()}async function Uo(){try{return await Notification.requestPermission()==="granted"?(console.log("Permissão concedida pelo utilizador."),await _o(),!0):(console.warn("Permissão de notificações negada."),!1)}catch(e){return console.error("Erro ao pedir permissão Web:",e),!1}}async function _o(){if("serviceWorker"in navigator)try{const e=await navigator.serviceWorker.register("/firebase-messaging-sw.js");await e.update();const t=await Os(Oa,{vapidKey:Pr,serviceWorkerRegistration:e});t?(console.log("[Push Web] Token validado."),await Jo(t,!1)):console.warn("[Push Web] Token veio vazio."),Ka||(zs(Oa,a=>{console.log("[Push Web] Recebido em Foreground (Silencioso):",a)}),Ka=!0)}catch(e){console.error("[Push Web] Falha no registo:",e)}else console.warn("Navegador sem suporte a Service Worker.")}async function Jo(e,t){const a=V.currentUser;if(!a){console.warn("Usuário não logado. Token não salvo.");return}const s=ce(U,"users",a.uid);try{const r=await Do(s);if(r.exists()){const n=r.data().fcmTokens||[];if(n.length===1&&n[0]===e){console.log("Token já sincronizado e único. Nenhuma ação necessária.");return}}await wa(s,{fcmTokens:[e],lastLoginAt:new Date().toISOString(),platform:t?"android_native":"pwa_web"}),console.log("Token atualizado (Sessão Única garantida).")}catch(r){if(r.code==="not-found")try{await Rs(s,{email:a.email,fcmTokens:[e],platform:t?"android_native":"pwa_web",createdAt:new Date().toISOString()},{merge:!0}),console.log("Utilizador criado e token inicial salvo.")}catch(o){console.error("Erro ao criar user:",o)}else console.error("Erro ao atualizar token:",r)}}const Br=(e,t,a="all",s="all")=>{const r=new URLSearchParams({startDate:e,endDate:t});return a&&a!=="all"&&r.append("professionalId",a),s&&s!=="all"&&r.append("costCenterId",s),w(`/api/reports/indicators?${r.toString()}`)},Dr=e=>e?w(`/api/financial/cost-centers/${e}`):Promise.resolve([]),Mr=({establishmentId:e,startDate:t,endDate:a,cashierSessionId:s})=>{const r=new URLSearchParams({startDate:t,endDate:a});return s&&s!=="all"&&r.append("cashierSessionId",s),e&&r.append("establishmentId",e),w(`/api/reports/sales?${r.toString()}`)},Ar=()=>w("/api/reports/summary",{method:"GET"}),Ot=(e,t,a,s="all")=>{const r=`/api/blockages/${e}?startDate=${t}&endDate=${a}&professionalId=${s}`;return w(r)},zt=e=>w("/api/blockages",{method:"POST",body:JSON.stringify(e)}),Ia=e=>w(`/api/blockages/${e}`,{method:"DELETE"}),Wo=e=>w("/api/blockages/batch-delete",{method:"POST",body:JSON.stringify({ids:e})}),Ca=e=>e?String(e).replace(/\D/g,""):"",it=(e,t="",a=20,s={})=>{const r=new URLSearchParams;return t&&r.append("search",t),a&&r.append("limit",a),s.hasLoyalty&&r.append("hasLoyalty","true"),s.birthMonth&&r.append("birthMonth",s.birthMonth),s.inactiveDays&&r.append("inactiveDays",s.inactiveDays),w(`/api/clients/${e}?${r.toString()}`)},da=(e,t)=>{const a=encodeURIComponent(t);return w(`/api/clients/details/${e}/${a}`)},Nr=e=>{if(!e.phone)throw new Error("Telefone é obrigatório");const t=Ca(e.phone),a={...e,phone:t,id:t};return w(`/api/clients/${t}`,{method:"PUT",body:JSON.stringify(a)})},qr=(e,t)=>{const a=Ca(t);return w(`/api/clients/full-history/${e}?phone=${a}`)},Go=e=>{const t=encodeURIComponent(e);return w(`/api/clients/${t}`,{method:"DELETE"})},Rr=(e,t,a,s)=>w("/api/clients/redeem",{method:"POST",body:JSON.stringify({establishmentId:e,clientPhone:Ca(t),points:a,rewardName:s})});function h(e){return e==null?"":String(e).replace(/[&<>'"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[t])}function Yo(e,t=800,a=800,s=.7){return new Promise((r,o)=>{if(!e.type.match(/image.*/))return o(new Error("O ficheiro selecionado não é uma imagem."));const n=new FileReader;n.readAsDataURL(e),n.onload=i=>{const l=new Image;l.src=i.target.result,l.onload=()=>{let d=l.width,c=l.height;d>c?d>t&&(c*=t/d,d=t):c>a&&(d*=a/c,c=a);const m=document.createElement("canvas");m.width=d,m.height=c,m.getContext("2d").drawImage(l,0,0,d,c);const f=m.toDataURL("image/jpeg",s);r(f)},l.onerror=d=>o(new Error("Erro ao carregar a imagem para processamento."))},n.onerror=i=>o(new Error("Erro ao ler o ficheiro."))})}const eo=document.getElementById("content");let to=!1;const ca=[{bg:"#e0e7ff",border:"#4f46e5",main:"#4f46e5"},{bg:"#d1fae5",border:"#059669",main:"#059669"},{bg:"#ffe4e6",border:"#e11d48",main:"#e11d48"},{bg:"#fef3c7",border:"#d97706",main:"#d97706"},{bg:"#cffafe",border:"#0e7490",main:"#0e7490"},{bg:"#e0f2fe",border:"#0284c7",main:"#0284c7"},{bg:"#ede9fe",border:"#7c3aed",main:"#7c3aed"},{bg:"#fce7f3",border:"#db2777",main:"#db2777"}];let lt=[],Vt=[],qe={},De=[],C={currentView:"list",weekViewDays:7,currentDate:new Date,selectedProfessionalId:"all",profSearchTerm:"",showInactiveProfs:!1,scrollToAppointmentId:null,isSelectionMode:!1,selectedItems:new Set},I={step:1,data:{id:null,clientName:"",clientPhone:"",selectedServiceIds:[],professionalId:null,professionalName:"",date:null,time:null,redeemedReward:null,clientHasRewards:!1,clientLoyaltyPoints:0}};function Fr(e){return new Intl.DateTimeFormat("pt-BR",{weekday:"short",day:"2-digit",month:"short"}).format(e).replace(/\./g,"")}function Qo(e){const t=new Date(e);if(t.setHours(0,0,0,0),C.currentView==="week"&&C.weekViewDays===7){const a=t.getDay(),s=t.getDate()-a+(a===0?-6:1);return new Date(t.setDate(s))}return t}function Pt(){const e=document.getElementById("profSelectorContainer"),t=C.profSearchTerm.toLowerCase();if(!e||!u.professionals)return;let a=u.professionals.filter(o=>C.showInactiveProfs||o.status!=="inactive");t&&(a=a.filter(o=>o.name.toLowerCase().includes(t)));const r=[...[{id:"all",name:"Todos",photo:null,status:"active"}],...a];e.innerHTML=r.map(o=>{const n=C.selectedProfessionalId===o.id,i=o.name==="Todos"?"Todos":o.name.split(" ")[0],l=o.name==="Todos"?"T":o.name.charAt(0).toUpperCase(),d=o.status!=="inactive",c=h(i),m=ca[0],b=o.id!=="all"&&u.professionalColors.get(o.id)||m,f=o.photo||`https://placehold.co/64x64/${b.main?.replace("#","")||"E0E7FF"}/${b.light?.replace("#","")||"4F46E5"}?text=${l}`,v=o.id==="all"?"#e0e7ff":b.light,p=o.id==="all"?"#4f46e5":b.main,k=`border: 3px solid ${n?b.border:"transparent"}; box-shadow: ${n?"0 0 0 2px "+b.border:"none"};`;return`
            <div class="prof-card ${n?"selected":""} ${d?"":"opacity-50"}" 
                 data-action="select-professional" 
                 data-prof-id="${o.id}">
                ${o.id==="all"?`<div class="prof-card-all-placeholder" style="background-color: ${v}; color: ${p}; ${k}">
                           ${l}
                          </div>`:`<img src="${f}" alt="${c}" class="prof-card-photo" style="${k}" />`}
                <span class="prof-card-name">${c}</span>
            </div>
        `}).join("")}function jr(e,t,a,s,r){const o=(e||"").replace(/\D/g,""),n=new Date(r).toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit"}),i=new Date(r).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),l=`Olá, ${t}! Você tem um agendamento de ${a} com o(a) profissional ${s} para o dia ${n} às ${i}. Podemos confirmar? Agradecemos a preferência!`,d=encodeURIComponent(l);return`https://wa.me/${o}?text=${d}`}function Hr(e){const t=document.getElementById("agenda-view");if(!t)return;if(e.sort((s,r)=>new Date(s.startTime)-new Date(r.startTime)),e.length===0){t.innerHTML='<div class="text-center p-10 text-gray-500"><svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path vector-effect="non-scaling-stroke" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg><h3 class="mt-2 text-sm font-medium text-gray-900">Nenhum agendamento ou bloqueio</h3><p class="mt-1 text-sm text-gray-500">Não há eventos para o dia e filtros selecionados.</p></div>';return}const a=e.map(s=>{const r=new Date(s.startTime),o=new Date(s.endTime),n=r.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),i=o.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),l=u.professionalColors.get(s.professionalId)||{},d=h(s.reason),c=h(s.professionalName),m=h(s.clientName),b=h(s.serviceName),f=C.selectedItems.has(s.id),v=C.isSelectionMode?`<div class="flex items-center justify-center pr-3 border-r border-gray-200 mr-3">
                 <input type="checkbox" class="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 cursor-pointer" 
                        data-action="toggle-select-item" 
                        data-id="${s.id}" 
                        ${f?"checked":""}>
               </div>`:"";if(s.type==="blockage")return`
                <div class="appointment-list-card bg-red-50" style="border-left-color: ${l.border};">
                    ${v}
                    <div class="time-info">
                        <p class="font-bold text-md">${n}</p>
                        <p class="text-xs text-gray-500">${i}</p>
                    </div>
                    <div class="details-info min-w-0">
                        <p class="font-bold text-red-800 truncate">${d}</p>
                        <p class="text-sm text-gray-600 truncate">com ${c}</p>
                    </div>
                    <div class="status-info">
                        <span class="status-badge bg-red-100 text-red-800">Bloqueio</span>
                    </div>
                </div>`;const p=s.status==="completed",x=p?"bg-green-100 text-green-800":"bg-yellow-100 text-yellow-800",k=p?"Finalizado":"Aberto",E=JSON.stringify(s).replace(/'/g,"&apos;"),S=s.redeemedReward?.points>0,$=s.hasRewards&&!S,L=jr(s.clientPhone,s.clientName,s.serviceName,s.professionalName,s.startTime),R=C.isSelectionMode?"":'data-action="open-comanda"';return`
            <div class="appointment-list-card" data-appointment='${E}' style="border-left-color: ${l.border};">
                
                ${v}

                <div class="time-info" ${R}>
                    <p class="font-bold text-md">${n}</p>
                    <p class="text-xs text-gray-500">${i}</p>
                </div>

                <div class="details-info min-w-0" ${R}>
                    <p class="font-bold text-gray-800 truncate">${$?"🎁 ":""}${m}</p>
                    <p class="text-sm text-gray-600 truncate">${b}</p>
                    <p class="text-xs text-gray-500 truncate">com ${c||"Indefinido"}</p>
                    
                    ${S?'<p class="text-xs font-semibold text-purple-600">Resgate de Prémio</p>':""}
                </div>

                <div class="status-info">
                    <span class="status-badge ${x} mb-1">${k}</span>
                    <div class="card-actions flex gap-1 items-center">
                        ${p?`
                            <button data-action="edit-appointment" data-appointment='${E}' class="action-btn opacity-40 cursor-not-allowed" title="Finalizado - Não editável" disabled><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z"></path></svg></button>
                        `:`
                            <a href="${L}" target="_blank" class="action-btn text-green-500 hover:text-green-700 p-1" title="Enviar Confirmação WhatsApp">
                                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12.036 2a10 10 0 100 20 10 10 0 000-20zM17.5 14.8c-.24.125-1.465.716-1.696.804-.23.09-.49.135-.75.045-.26-.09-.982-.322-1.87-.965-.888-.643-1.474-1.442-1.64-1.748-.166-.307-.015-.467.106-.615.116-.149.23-.388.344-.582.113-.193.15-.327.1-.462-.05-.136-.264-.322-.544-.654-.28-.332-.572-.782-.828-.958-.255-.176-.438-.158-.61-.158-.173 0-.374-.022-.574-.022-.2 0-.54.075-.826.375-.285.3-.99.965-.99 2.355 0 1.43 1.018 2.872 1.16 3.072.14.2 2 3.047 4.86 4.218 2.86 1.17 2.86.786 3.376 1.054.516.268 1.49.462 1.696.406.206-.057 1.463-.615 1.67-.887.2-.27.2-.504.14-.615-.058-.11-.23-.166-.48-.306z"/></svg>
                            </a>
                            <button data-action="edit-appointment" data-appointment='${E}' class="action-btn" title="Editar Agendamento"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z"></path></svg></button>
                        `}
                        <button data-action="delete-appointment" data-id="${s.id}" class="action-btn" title="Apagar Agendamento"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
                    </div>
                </div>
            </div>`}).join("");t.innerHTML=`<div class="list-view-container space-y-2 pb-24">${a}</div>`}function La(){return window.innerWidth<768&&C.currentView==="week"?3:C.weekViewDays}function Or(e){const t=document.getElementById("agenda-view");if(!t)return;const a=["Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sábado"],s=Qo(C.currentDate),r=La();let o=`<div class="grid divide-x divide-gray-200 min-h-[60vh]" style="grid-template-columns: repeat(${r}, minmax(0, 1fr));">`;for(let n=0;n<r;n++){const i=new Date(s);i.setDate(i.getDate()+n);const l=new Date,d=i.toDateString()===l.toDateString(),c=e.filter(b=>new Date(b.startTime).toDateString()===i.toDateString()).sort((b,f)=>new Date(b.startTime)-new Date(f.startTime));let m='<div class="p-1 space-y-2">';c.length>0?m+=c.map(b=>{const v=new Date(b.startTime).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),p=u.professionalColors.get(b.professionalId)||{bg:"#e5e7eb",border:"#9ca3af"},x=h(b.reason),k=h(b.professionalName),E=h(b.clientName),S=h(b.serviceName);if(b.type==="blockage")return`
                        <div class="p-2 rounded-lg border-l-4 flex flex-col bg-red-100" style="border-left-color: ${p.border};">
                            <span class="font-bold text-xs text-red-900">${v}</span>
                            <div class="mt-1 min-w-0">
                                <p class="font-semibold text-sm text-red-800 truncate">${x}</p>
                                <p class="text-xs text-red-600 truncate">com ${k}</p>
                            </div>
                        </div>
                    `;const $=JSON.stringify(b).replace(/'/g,"&apos;"),L=b.redeemedReward?.points>0,R=b.hasRewards&&!L,O=b.status==="completed";return`
                    <div class="p-2 rounded-lg border-l-4 flex flex-col cursor-pointer" 
                         style="background-color: ${p.bg}; border-left-color: ${p.border};"
                         data-action="open-comanda" data-appointment='${$}'>
                        
                        <div class="flex justify-between items-center">
                            <span class="font-bold text-xs text-gray-900">${v}</span>
                            ${O?'<span class="text-[10px] font-semibold bg-green-200 text-green-800 px-1 rounded-sm">OK</span>':""}
                        </div>

                        <div class="mt-1 min-w-0">
                            <p class="font-semibold text-sm text-gray-800 truncate">${R?"🎁 ":""}${E}</p>
                            <p class="text-xs text-gray-600 truncate">${S}</p>
                            <p class="text-xs text-gray-500 truncate">com ${k||"Indefinido"}</p>
                            ${L?'<p class="text-xs text-purple-600 truncate">Resgate</p>':""}
                        </div>
                        
                        </div>
                `}).join(""):m+='<div class="text-center text-xs text-gray-400 pt-4">Nenhum evento</div>',m+="</div>",o+=`
            <div class="flex flex-col">
                <div class="text-center py-2 border-b ${d?"bg-indigo-100 text-indigo-700":"bg-gray-50"}">
                    <p class="font-bold">${a[i.getDay()]}</p>
                    <p class="text-sm">${i.getDate()}/${i.getMonth()+1}</p>
                </div>
                <div class="flex-grow overflow-y-auto">${m}</div>
            </div>
        `}o+="</div>",t.innerHTML=o}function Xo(){const e=u.allEvents.filter(t=>C.selectedProfessionalId==="all"||t.professionalId===C.selectedProfessionalId);C.currentView==="list"?Hr(e):Or(e),Ta()}function Ta(){const e=document.getElementById("batch-delete-container"),t=document.querySelector('[data-action="new-appointment"]');e&&(C.isSelectionMode&&C.selectedItems.size>0?(e.innerHTML=`
            <div class="bg-white p-4 rounded-xl shadow-2xl border border-red-100 flex items-center justify-between gap-4">
                <span class="font-bold text-gray-800">${C.selectedItems.size} selecionado(s)</span>
                <button data-action="batch-delete" class="bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 shadow-md flex items-center gap-2">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    Excluir
                </button>
            </div>
        `,e.style.display="block",t&&(t.style.display="none")):(e.style.display="none",t&&(t.style.display="flex")))}async function te(){const e=document.getElementById("agenda-view");if(!e)return;C.selectedItems.clear(),Ta(),e.innerHTML='<div class="loader mx-auto my-10"></div>';let t,a;const s=document.getElementById("weekRange");if(s){if(C.currentView==="list")t=new Date(C.currentDate),t.setHours(0,0,0,0),a=new Date(C.currentDate),a.setHours(23,59,59,999),s.textContent=Fr(t);else{const r=La();t=Qo(new Date(C.currentDate)),a=new Date(t),a.setDate(t.getDate()+(r-1)),a.setHours(23,59,59,999),s.textContent=`${t.toLocaleDateString("pt-BR",{day:"2-digit",month:"short"})} - ${a.toLocaleDateString("pt-BR",{day:"2-digit",month:"short"})}`}try{const r=await Ro(u.establishmentId,t.toISOString(),a.toISOString(),C.selectedProfessionalId==="all"?null:C.selectedProfessionalId),o=await Ot(u.establishmentId,t.toISOString(),a.toISOString(),C.selectedProfessionalId);if(!document.getElementById("agenda-view"))return;const n=o.map(l=>{let d=l.professionalName;if(!d&&l.professionalId){const c=u.professionals?u.professionals.find(m=>m.id===l.professionalId):null;c&&(d=c.name)}return{...l,type:"blockage",professionalName:d||"Não identificado"}}),i=[...r.map(l=>({...l,type:"appointment"})),...n];if(u.allEvents=i,Pt(),Xo(),C.scrollToAppointmentId){const l=document.querySelector(`[data-appointment*='"id":"${C.scrollToAppointmentId}"']`);l&&(l.scrollIntoView({behavior:"smooth",block:"center"}),l.style.transition="background-color 0.5s ease-in-out",l.style.backgroundColor="#e0e7ff",setTimeout(()=>{l.style.backgroundColor=""},2500)),C.scrollToAppointmentId=null}}catch(r){document.getElementById("agenda-view")&&(document.getElementById("agenda-view").innerHTML='<div class="p-6 text-center text-red-600">Falha ao carregar dados.</div>',g("Erro na Agenda",`Não foi possível carregar a agenda: ${r.message}`,"error"))}}}async function zr(){try{const[e,t,a]=await Promise.all([u.professionals&&u.professionals.length>0?Promise.resolve(u.professionals):Z(u.establishmentId),u.services&&u.services.length>0?Promise.resolve(u.services):Se(u.establishmentId),qe.enabled!==void 0?Promise.resolve(null):ke(u.establishmentId)]);(!u.professionals||u.professionals.length===0)&&(u.professionals=e||[]),(!u.services||u.services.length===0)&&(u.services=t||[]),De=[],a&&(qe=a.loyaltyProgram||{enabled:!1}),u.professionals.forEach((s,r)=>{u.professionalColors.set(s.id,ca[r%ca.length])}),Pt()}catch(e){console.error("Erro ao popular filtros e dependências do modal:",e),g("Atenção","Não foi possível pré-carregar os dados para agendamento. A abertura do modal pode ser lenta.","error")}}function ua(e){e<1||e>4||(I.step=e,ma(null,!0))}function Zo(e,t){const a=document.getElementById("multiServiceToggle"),s=a&&a.checked,r=t.classList.contains("selected"),o=I.data.selectedServiceIds.indexOf(e);if(r)t.classList.remove("selected","border-blue-500"),o>-1&&I.data.selectedServiceIds.splice(o,1);else{if(!s){I.data.selectedServiceIds=[];const n=document.getElementById("apptServicesContainer");n&&n.querySelectorAll(".service-card.selected").forEach(i=>{i.classList.remove("selected","border-blue-500")})}t.classList.add("selected","border-blue-500"),I.data.selectedServiceIds.push(e)}}function Ko(e,t){const a=document.querySelector(".professional-step-cards");if(!a)return;a.querySelectorAll(".professional-modal-card").forEach(r=>r.classList.remove("selected","border-blue-500")),t.classList.add("selected","border-blue-500");const s=Vt.find(r=>r.id===e);I.data.professionalId=e,I.data.professionalName=s?s.name:"N/A"}function Vr(e,t){const a=document.getElementById("availableTimesContainer");a&&(a.querySelectorAll(".time-slot-card").forEach(s=>s.classList.remove("selected")),t.classList.add("selected"),I.data.time=e)}async function ao(){const e=document.getElementById("apptTotalDuration"),t=document.getElementById("availableTimesContainer");if(!e||!t)return;const a=I.data.professionalId,s=I.data.selectedServiceIds,r=document.getElementById("apptDate").value;I.data.date=r;const o=s.reduce((n,i)=>{const l=lt.find(d=>d.id===i);return n+(l?l.duration+(l.bufferTime||0):0)},0);if(e.textContent=`${o} min`,o===0||!a||!r){t.innerHTML='<p class="col-span-full text-center text-gray-500">Selecione serviço, profissional e data.</p>';return}t.innerHTML='<div class="loader mx-auto col-span-full"></div>';try{let n=await Js({establishmentId:u.establishmentId,professionalId:a,serviceIds:s,date:r});const i=new Date;if(new Date(r+"T00:00:00").toDateString()===i.toDateString()){const d=i.getHours()*60+i.getMinutes();n=n.filter(c=>{const[m,b]=c.split(":").map(Number);return m*60+b>=d})}if(t.innerHTML="",n.length>0){if(n.forEach(d=>{const c=document.createElement("button");c.type="button",c.className=`time-slot-card p-2 text-sm bg-gray-100 rounded-md hover:bg-gray-200 transition ${I.data.time===d?"selected":""}`,c.textContent=d,c.addEventListener("click",()=>Vr(d,c)),t.appendChild(c)}),I.data.time){const d=t.querySelector(`[data-action="time-slot"][data-time="${I.data.time}"]`);d&&d.classList.add("selected")}}else t.innerHTML='<p class="col-span-full text-center text-gray-500">Nenhum horário disponível.</p>'}catch(n){console.error("Erro ao buscar horários:",n),t.innerHTML='<p class="col-span-full text-center text-red-500">Erro ao buscar horários.</p>'}}function Ur(){const e=document.getElementById("loyaltyRewardsContainer");if(!e)return;const{clientHasRewards:t,clientLoyaltyPoints:a,redeemedReward:s}=I.data,{enabled:r,rewards:o}=qe;if(!r||!t||!o||o.length===0){e.classList.add("hidden"),e.innerHTML="";return}e.classList.remove("hidden");const n=o.filter(l=>a>=l.points);let i=`
        <h4 class="text-md font-semibold text-gray-700 mb-2">🎁 Prêmios Disponíveis (${a} pontos)</h4>
    `;n.length>0?(i+='<div class="space-y-2">',i+=n.map(l=>{const d=s?.reward===l.reward,c=h(l.reward);return`
                <label class="flex items-center p-3 bg-white rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-50">
                    <input type="radio" name="loyaltyReward" class="form-radio text-indigo-600" 
                           value="${c}" 
                           data-points="${l.points}"
                           ${d?"checked":""}>
                    <span class="ml-3">
                        <span class="font-semibold text-gray-800">${c}</span>
                        <span class="text-sm text-gray-600"> (-${l.points} pontos)</span>
                    </span>
                </label>
            `}).join(""),i+="</div>"):i+='<p class="text-sm text-gray-600">Pontos insuficientes para resgatar os prêmios disponíveis.</p>',e.innerHTML=i,e.querySelectorAll('input[name="loyaltyReward"]').forEach(l=>{l.addEventListener("change",d=>{d.target.checked&&(I.data.redeemedReward={reward:d.target.value,points:parseInt(d.target.dataset.points,10)})})}),e.insertAdjacentHTML("beforeend",`
        <label class="flex items-center p-3 mt-2 bg-white rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-50">
            <input type="radio" name="loyaltyReward" class="form-radio text-gray-400" 
                   value="none" 
                   ${s?"":"checked"}>
            <span class="ml-3 text-gray-600">Não resgatar prêmio agora</span>
        </label>
    `),e.querySelector('input[value="none"]').addEventListener("change",l=>{l.target.checked&&(I.data.redeemedReward=null)})}async function _r(e){e.preventDefault();const t=e.target,a=t.querySelector('button[type="submit"]');if(!I.data.time||I.data.selectedServiceIds.length===0||!I.data.professionalId)return g("Erro de Validação","Por favor, selecione o horário, serviço(s) e profissional antes de confirmar.","error");a.disabled=!0,a.textContent="A confirmar...";const s=I.data.selectedServiceIds.map(d=>{const c=lt.find(m=>m.id===d);return{id:c.id,name:c.name,price:c.price,duration:c.duration,bufferTime:c.bufferTime||0,photo:c.photo||null}}),[r,o]=I.data.time.split(":"),n=new Date(`${I.data.date}T${r}:${o}:00`),i={establishmentId:u.establishmentId,clientName:I.data.clientName,clientPhone:I.data.clientPhone,services:s,professionalId:I.data.professionalId,startTime:n.toISOString(),redeemedReward:I.data.redeemedReward},l=t.querySelector("#appointmentId").value;l&&(i.id=l);try{l?await Gs(l,i):await Ws(i),g(`Agendamento ${l?"atualizado":"criado"} com sucesso!`,"success"),document.getElementById("appointmentModal").style.display="none",te()}catch(d){g(d.message,"error")}finally{a.disabled=!1,a.textContent="Confirmar Agendamento"}}function es(e){const t=I.data.clientName===e.name&&I.data.clientPhone===e.phone,a=h(e.name),s=h(e.phone);return`
        <div class="client-search-card p-3 bg-white rounded-lg border-2 border-gray-200 cursor-pointer transition-all hover:bg-blue-50 ${t?"selected border-blue-500":""}" 
             data-action="select-client" 
             data-client-name="${a}" 
             data-client-phone="${s}"
             data-client-id="${e.id}"
             data-loyalty-points="${e.loyaltyPoints||0}">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold">${a.charAt(0).toUpperCase()}</div>
                <div>
                    <p class="font-semibold text-gray-800">${a}</p>
                    <p class="text-sm text-gray-500">${s}</p>
                </div>
            </div>
        </div>
    `}async function Jr(e){const t=document.getElementById("clientSearchResults");if(!t)return;const a=e.trim();if(a.length<3){t.innerHTML='<p class="text-sm text-gray-500">Digite pelo menos 3 caracteres para buscar clientes existentes.</p>';return}t.innerHTML='<div class="loader-small mx-auto my-2"></div>';try{const s=await it(u.establishmentId,a);if(De=s,s.length===0){t.innerHTML='<p class="text-sm text-gray-500">Nenhum cliente encontrado com este termo.</p>';return}t.innerHTML=s.map(es).join(""),t.querySelectorAll('[data-action="select-client"]').forEach(r=>{r.addEventListener("click",o=>{const n=r.dataset.clientName,i=r.dataset.clientPhone,l=parseInt(r.dataset.loyaltyPoints||"0",10);I.data.clientName=n,I.data.clientPhone=i,I.data.clientLoyaltyPoints=l;const d=qe,c=Math.min(...(d?.rewards||[]).map(m=>m.points));I.data.clientHasRewards=d.enabled&&c!==1/0&&I.data.clientLoyaltyPoints>=c,document.getElementById("apptClientName").value=n,document.getElementById("apptClientPhone").value=i,document.querySelectorAll(".client-search-card").forEach(m=>m.classList.remove("selected","border-blue-500")),r.classList.add("selected","border-blue-500")})})}catch(s){console.error("Erro na busca de clientes:",s),t.innerHTML='<p class="text-sm text-red-500">Erro ao buscar clientes.</p>'}}async function Wr(e){e.preventDefault();const t=document.getElementById("clientRegistrationForm"),a=t.querySelector('button[type="submit"]'),s={establishmentId:u.establishmentId,name:t.querySelector("#regClientName").value.trim(),email:t.querySelector("#regClientEmail").value.trim(),phone:t.querySelector("#regClientPhone").value.trim(),dobDay:t.querySelector("#regClientDobDay").value.trim(),dobMonth:t.querySelector("#regClientDobMonth").value.trim(),notes:t.querySelector("#regClientNotes").value.trim()};if(!s.name||!s.phone)return g("Erro de Validação","Nome e Telefone são obrigatórios.","error");a.disabled=!0,a.textContent="A salvar...";try{await(void 0)(s),De.push({name:s.name,phone:s.phone,loyaltyPoints:0}),I.data.clientName=s.name,I.data.clientPhone=s.phone,I.data.clientHasRewards=!1,I.data.clientLoyaltyPoints=0,g("Cliente cadastrado com sucesso!","success"),document.getElementById("genericModal").style.display="none",ua(1)}catch(r){g(`Erro ao cadastrar cliente: ${r.message}`,"error")}finally{a.disabled=!1,a.textContent="Salvar"}}function Gr(){Y({title:"Cadastrar Novo Cliente",contentHTML:`
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
    `,maxWidth:"max-w-2xl"});const t=document.getElementById("clientRegistrationForm");t&&t.addEventListener("submit",Wr)}function Yr(){Gr()}function Qr(e,t){const a=e?"Editar Agendamento":"Selecionar Cliente",s=`
        <div class="p-5 space-y-6">
            <h3 class="text-xl font-bold text-gray-800">1. Dados do Cliente</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label for="apptClientName" class="block text-sm font-medium text-gray-700">Nome Completo</label>
                    <input type="text" id="apptClientName" required class="mt-1 block w-full p-3 rounded-lg border-gray-300 shadow-sm" placeholder="Nome Completo" value="${h(I.data.clientName)}">
                </div>
                <div>
                    <label for="apptClientPhone" class="block text-sm font-medium text-gray-700">Telemóvel</label>
                    <input type="tel" id="apptClientPhone" required class="mt-1 block w-full p-3 rounded-lg border-gray-300 shadow-sm" placeholder="(XX) XXXXX-XXXX" value="${h(I.data.clientPhone)}">
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
    `;return{title:a,content:s}}function Xr(){const e="Selecionar Serviço",a=`
        <div class="p-5 space-y-6">
            <h3 class="text-xl font-bold text-gray-800">2. Serviços</h3>
             
             <div class="flex flex-col sm:flex-row items-center gap-4 bg-gray-100 p-4 rounded-lg border border-gray-200">
                 <input type="search" id="serviceSearchModalInput" placeholder="Buscar Serviço..." class="w-full sm:flex-grow p-3 pl-10 border rounded-lg">
                 
                 <label class="flex items-center space-x-2 cursor-pointer flex-shrink-0">
                     <div class="relative">
                         <input type="checkbox" id="multiServiceToggle" class="sr-only" ${I.data.selectedServiceIds.length>1?"checked":""}>
                         <div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full transition-colors"></div>
                         <div class="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform" style="transition: all 0.3s;"></div>
                     </div>
                     <span class="text-sm font-medium text-gray-700">Selecionar Vários</span>
                 </label>
            </div>
            
            <div id="apptServicesContainer" class="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3 max-h-48 overflow-y-auto p-1">
                 ${lt.map(s=>{const r=I.data.selectedServiceIds.includes(s.id),o=s.photo||"https://placehold.co/40x40/E0E7FF/4F46E5?text=S",n=h(s.name);return`
                         <div class="service-card p-3 bg-white rounded-lg border-2 border-gray-200 cursor-pointer transition-all hover:bg-gray-50 ${r?"selected border-blue-500":""}" data-service-id="${s.id}">
                             <div class="flex items-center">
                                 <img src="${o}" class="w-8 h-8 rounded-full object-cover mr-3 flex-shrink-0">
                                 <div class="flex-1">
                                     <p class="font-semibold text-sm text-gray-800">${n}</p>
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
    `;return{title:e,content:a}}function Zr(){const e="Selecionar Profissional",t=`
        <div class="p-5 space-y-6">
             <h3 class="text-xl font-bold text-gray-800">3. Profissional</h3>
             <div id="apptProfessionalContainer" class="mt-4 flex flex-wrap gap-3 max-h-48 overflow-y-auto p-1 professional-step-cards">
                 ${Vt.map(a=>{const s=I.data.professionalId===a.id,r=a.photo||"https://placehold.co/60x60/E0E7FF/4F46E5?text=P",o=h(a.name);return`
                         <div class="professional-modal-card p-3 bg-white rounded-lg border-2 border-gray-200 text-center cursor-pointer transition-all hover:bg-gray-50 ${s?"selected border-blue-500":""}" data-professional-id="${a.id}">
                             <img src="${r}" class="w-12 h-12 rounded-full object-cover mx-auto mb-1">
                             <p class="text-xs font-semibold text-gray-800">${o.split(" ")[0]}</p>
                             <p class="text-[10px] text-gray-500">${h(a.specialty||"Profissional")}</p>
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
    `;return{title:e,content:t}}function Kr(e){const t=e?"Confirmar Edição":"Data e Horário",a=new Date,s=`${a.getFullYear()}-${String(a.getMonth()+1).padStart(2,"0")}-${String(a.getDate()).padStart(2,"0")}`,r=I.data.date||s,o=h(I.data.clientName),n=h(I.data.professionalName),i=`
        <div class="p-5 space-y-6">
            <h3 class="text-xl font-bold text-gray-800">4. ${t}</h3>

            <div class="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400 space-y-1">
                <p class="font-bold text-gray-800">${o}</p>
                <p class="text-sm text-gray-700">Serviços: ${I.data.selectedServiceIds.length} selecionado(s)</p>
                <p class="text-sm text-gray-700">Profissional: ${n}</p>
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
    `;return{title:t,content:i}}function en(e){const t=document.getElementById("apptServicesContainer");if(!t)return;const a=e.toLowerCase(),s=lt.filter(r=>r.name.toLowerCase().includes(a));t.innerHTML=s.map(r=>{const o=I.data.selectedServiceIds.includes(r.id),n=r.photo||"https://placehold.co/40x40/E0E7FF/4F46E5?text=S";return`
            <div class="service-card p-3 bg-white rounded-lg border-2 border-gray-200 cursor-pointer transition-all hover:bg-gray-50 ${o?"selected border-blue-500":""}" data-service-id="${r.id}">
                <div class="flex items-center">
                    <img src="${n}" class="w-8 h-8 rounded-full object-cover mr-3 flex-shrink-0">
                    <div class="flex-1">
                        <p class="font-semibold text-sm text-gray-800">${h(r.name)}</p>
                        <p class="text-xs text-gray-500">R$ ${r.price.toFixed(2)} (${r.duration} min)</p>
                    </div>
                </div>
            </div>`}).join(""),t.querySelectorAll(".service-card").forEach(r=>{r.addEventListener("click",()=>Zo(r.dataset.serviceId,r))})}function tn(e){const t=document.getElementById("apptProfessionalContainer");if(!t)return;const a=e.toLowerCase(),s=Vt.filter(r=>r.name.toLowerCase().includes(a));t.innerHTML=s.map(r=>{const o=I.data.professionalId===r.id,n=r.photo||"https://placehold.co/60x60/E0E7FF/4F46E5?text=P",i=h(r.name);return`
             <div class="professional-modal-card p-3 bg-white rounded-lg border-2 border-gray-200 text-center cursor-pointer transition-all hover:bg-gray-50 ${o?"selected border-blue-500":""}" data-professional-id="${r.id}">
                 <img src="${n}" class="w-12 h-12 rounded-full object-cover mx-auto mb-1">
                 <p class="text-xs font-semibold text-gray-800">${i.split(" ")[0]}</p>
                 <p class="text-[10px] text-gray-500">${h(r.specialty||"Profissional")}</p>
             </div>`}).join(""),t.querySelectorAll(".professional-modal-card").forEach(r=>{r.addEventListener("click",()=>Ko(r.dataset.professionalId,r))})}async function ma(e=null,t=!1){const a=document.getElementById("appointmentModal");if(!t){const o=e?.startTime?new Date(e.startTime).toISOString().split("T")[0]:new Date().toISOString().split("T")[0],n=e?.startTime?new Date(e.startTime).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit",hour12:!1}):null;if(I={step:1,data:{id:e?.id||null,clientName:e?.clientName||"",clientPhone:e?.clientPhone||"",selectedServiceIds:e?.services?.map(i=>i.id)||[],professionalId:e?.professionalId||null,professionalName:e?.professionalName||"",date:o,time:n,redeemedReward:e?.redeemedReward||null,clientHasRewards:e?.hasRewards||!1,clientLoyaltyPoints:0}},e&&e.clientName)try{const i=await it(u.establishmentId,e.clientName),l=i.find(d=>d.phone===e.clientPhone);l&&(I.data.clientLoyaltyPoints=l.loyaltyPoints||0,De=i)}catch(i){console.warn("Não foi possível carregar pontos do cliente para edição:",i)}}if(!u.services||!u.professionals||qe.enabled===void 0){g("Erro","Os dados da agenda ainda não foram carregados. Tente novamente em alguns segundos.","error");return}if(lt=u.services,Vt=u.professionals.filter(o=>o.status==="active"),I.data.clientLoyaltyPoints>0){const o=qe,n=Math.min(...(o?.rewards||[]).map(i=>i.points));I.data.clientHasRewards=o.enabled&&n!==1/0&&I.data.clientLoyaltyPoints>=n}let s={title:"Erro",content:"<p>Etapa não encontrada.</p>"};switch(I.step){case 1:s=Qr(e);break;case 2:s=Xr();break;case 3:s=Zr();break;case 4:s=Kr(e);break}a.innerHTML=`
        <div class="modal-content max-w-4xl p-0 rounded-xl overflow-hidden shadow-2xl">
            <header class="p-5 border-b flex justify-between items-center bg-gray-50">
                <h2 class="text-xl font-bold text-gray-800">${s.title}</h2>
                <button type="button" data-action="close-modal" data-target="appointmentModal" class="text-2xl font-bold text-gray-500 hover:text-gray-900">&times;</button>
            </header>
            
            <form id="appointmentForm" class="flex flex-col h-full">
                <input type="hidden" id="appointmentId" value="${I.data.id||""}">
                <input type="hidden" id="selectedTime" value="${I.data.time||""}">
                
                <div class="flex-1 overflow-y-auto" style="max-height: 80vh;">
                    ${s.content}
                </div>
                
            </form>
        </div>`,a.querySelectorAll('[data-action="next-step"]').forEach(o=>{o.addEventListener("click",()=>{const n=parseInt(o.dataset.currentStep,10);if(n===1){const i=a.querySelector("#apptClientName"),l=a.querySelector("#apptClientPhone");if(I.data.clientName=i.value.trim(),I.data.clientPhone=l.value.trim(),!I.data.clientName||!I.data.clientPhone)return g("Atenção","Nome e telefone do cliente são obrigatórios.","error")}else if(n===2){if(I.data.selectedServiceIds.length===0)return g("Atenção","Selecione pelo menos um serviço.","error")}else if(n===3&&!I.data.professionalId)return g("Atenção","Selecione um profissional.","error");ua(n+1)})}),a.querySelectorAll('[data-action="prev-step"]').forEach(o=>{o.addEventListener("click",()=>ua(parseInt(o.dataset.currentStep,10)-1))});const r=a.querySelector("#appointmentForm");if(I.step===4&&r&&r.addEventListener("submit",_r),a.style.display="flex",I.step===2){a.querySelector("#apptServicesContainer").querySelectorAll(".service-card").forEach(i=>{i.addEventListener("click",()=>Zo(i.dataset.serviceId,i))});const n=a.querySelector("#serviceSearchModalInput");n&&n.addEventListener("input",i=>en(i.target.value))}if(I.step===3){a.querySelector("#apptProfessionalContainer").querySelectorAll(".professional-modal-card").forEach(i=>{i.addEventListener("click",()=>Ko(i.dataset.professionalId,i))});const n=a.querySelector("#professionalSearchModalInput");n&&n.addEventListener("input",i=>tn(i.target.value))}if(I.step===1){const o=a.querySelector("#clientSearchInput");if(o&&(o.addEventListener("input",i=>Jr(i.target.value)),I.data.clientName&&I.data.clientPhone&&De.length>0)){const i=document.getElementById("clientSearchResults");i&&(i.innerHTML=De.map(es).join(""))}const n=a.querySelector('[data-action="open-client-registration"]');n&&n.addEventListener("click",Yr)}if(I.step===4){const o=a.querySelector("#apptDate");o&&o.addEventListener("change",ao),ao(),Ur()}}async function ts(e={}){C.currentDate=e.targetDate?new Date(e.targetDate):C.currentDate||new Date,C.scrollToAppointmentId=e.scrollToAppointmentId||null,C.profSearchTerm="",C.isSelectionMode=!1,C.selectedItems.clear(),window.innerWidth<768&&(C.currentView="list"),eo.innerHTML=`
        <section>
            <div class="bg-white p-4 rounded-xl shadow-lg mb-4">
                
                <div class="flex flex-col sm:flex-row sm:flex-wrap sm:justify-between sm:items-center mb-4 gap-4">
                    <span id="weekRange" class="font-semibold text-lg w-full text-left sm:text-right sm:flex-grow order-1 sm:order-2"></span>
                    <div class="flex flex-wrap items-center gap-2 order-2 sm:order-1">
                        <button id="btn-toggle-select" class="p-2 border rounded-md shadow-sm bg-gray-50 text-gray-700 hover:bg-gray-100 flex items-center gap-1" title="Selecionar Múltiplos">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
                            <span class="hidden sm:inline">Selecionar</span>
                        </button>
                        
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

            </div> 
            
            <div id="agenda-view" class="bg-white rounded-xl shadow-lg overflow-hidden"></div>
            
            <button data-action="new-appointment" class="fixed bottom-4 right-4 sm:bottom-10 sm:right-10 bg-indigo-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-xl hover:bg-indigo-700 transition z-50">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                </svg>
            </button>

            <div id="batch-delete-container" class="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 hidden w-[90%] max-w-md"></div>
        </section>`;const t=document.getElementById("btn-toggle-select");t.addEventListener("click",()=>{C.isSelectionMode=!C.isSelectionMode,C.isSelectionMode||C.selectedItems.clear(),t.classList.toggle("bg-blue-100",C.isSelectionMode),t.classList.toggle("text-blue-700",C.isSelectionMode),Xo()}),document.querySelectorAll(".view-btn[data-view]").forEach(s=>{s.addEventListener("click",()=>{document.querySelectorAll(".view-btn[data-view]").forEach(o=>o.classList.remove("active")),s.classList.add("active"),C.currentView=s.dataset.view;const r=document.getElementById("week-days-toggle");if(C.currentView==="week"){if(r.style.display="flex",window.innerWidth<768){C.weekViewDays=3,document.querySelectorAll(".week-days-btn").forEach(n=>n.classList.remove("active"));const o=document.querySelector('.week-days-btn[data-days="3"]');o&&o.classList.add("active")}}else r.style.display="none";te()})}),document.querySelectorAll(".week-days-btn").forEach(s=>{s.addEventListener("click",()=>{document.querySelectorAll(".week-days-btn").forEach(r=>r.classList.remove("active")),s.classList.add("active"),C.weekViewDays=parseInt(s.dataset.days,10),te()})}),document.getElementById("todayBtn").addEventListener("click",()=>{C.currentDate=new Date,te()});const a=s=>{const r=parseInt(s.currentTarget.dataset.amount,10),o=C.currentView==="week"?La():1,n=new Date(C.currentDate);n.setDate(n.getDate()+r*o),C.currentDate=n,te()};document.getElementById("prevBtn").addEventListener("click",a),document.getElementById("nextBtn").addEventListener("click",a),document.getElementById("profSearchInput").addEventListener("input",s=>{C.profSearchTerm=s.target.value,Pt()}),document.getElementById("showInactiveProfsToggle").addEventListener("change",s=>{C.showInactiveProfs=s.target.checked,Pt(),te()}),to||(eo.addEventListener("click",async s=>{const r=s.target.closest("[data-action]");if(s.target.dataset.action==="toggle-select-item"){const l=s.target.dataset.id;s.target.checked?C.selectedItems.add(l):C.selectedItems.delete(l),Ta();return}if(r&&r.dataset.action==="batch-delete"){const l=C.selectedItems.size;if(await j("Excluir em Lote",`Tem certeza que deseja excluir ${l} agendamento(s)? Esta ação não pode ser desfeita.`)){const c=Array.from(C.selectedItems);let m=0;try{await Promise.all(c.map(async b=>{try{await Ua(b),m++}catch(f){console.error(`Falha ao excluir ${b}`,f)}})),g(`${m} agendamento(s) excluído(s).`,"success"),C.selectedItems.clear(),C.isSelectionMode=!1,document.getElementById("btn-toggle-select").classList.remove("bg-blue-100","text-blue-700"),te()}catch{g("Erro ao processar exclusão em lote.","error")}}return}if(s.target.closest('[data-action="select-professional"]')){const d=s.target.closest('[data-action="select-professional"]').dataset.profId,c=C.selectedProfessionalId===d&&d!=="all";if(C.selectedProfessionalId=c?"all":d,d!=="all"){const m=document.getElementById("profSearchInput");m&&(m.value=""),C.profSearchTerm=""}await te();return}if(!r)return;const o=r.dataset.action;let n=null;const i=s.target.closest("[data-appointment]");switch(i&&(n=JSON.parse(i.dataset.appointment.replace(/&apos;/g,"'"))),o){case"new-appointment":ma();break;case"edit-appointment":if(C.isSelectionMode||!n)return;if(n.status==="completed"){g("Atenção","Agendamentos finalizados não podem ser editados.","error");return}n.hasRewards&&!n.redeemedReward&&g("🎁 Cliente com Prêmios!","Este cliente tem pontos para resgatar. Verifique a Etapa 4 do agendamento.","info"),ma(n);break;case"delete-appointment":{if(C.isSelectionMode)return;const l=r.dataset.id;if(await j("Confirmar Exclusão","Tem a certeza que deseja apagar este agendamento?"))try{await Ua(l),g("Agendamento apagado!","success"),te()}catch(c){g(`Não foi possível apagar: ${c.message}`,"error")}break}case"open-comanda":if(C.isSelectionMode)return;if(n){n.hasRewards&&!n.redeemedReward&&n.status!=="completed"&&g("🎁 Cliente com Prêmios!","Este cliente tem pontos de fidelidade para resgatar.","info");const l=n.status==="completed"?"finalizadas":"em-atendimento",d={selectedAppointmentId:n.id,initialFilter:l};if(l==="finalizadas"){let c=n.startTime;if(n.transaction&&n.transaction.paidAt){const m=n.transaction.paidAt;typeof m=="object"&&m._seconds?c=new Date(m._seconds*1e3):c=m}d.filterDate=c}ae("comandas-section",d)}break}}),to=!0),await zr(),await te()}const an=(e,t=null,a=1,s=12)=>{let r=`/api/comandas/${e}?page=${a}&limit=${s}`;return t&&(r+=`&date=${t}`),w(r)},on=(e,t)=>w(`/api/appointments/${e}/comanda`,{method:"POST",body:JSON.stringify({items:t})}),sn=e=>w("/api/sales",{method:"POST",body:JSON.stringify(e)}),rn=e=>w(`/api/sales/${e}`,{method:"DELETE"}),nn=()=>w("/api/cashier/status").catch(e=>{if(e.message.includes("404")||e.message.includes("não encontrada"))return null;throw e}),ln=e=>{const t={establishmentId:e.establishmentId,initialAmount:Number(e.initialAmount),notes:e.notes||""};return console.log("Payload enviado para abrir caixa:",t),w("/api/cashier/open",{method:"POST",body:JSON.stringify(t)})},dn=(e,t)=>{const a={finalAmount:Number(t)};return console.log("Payload enviado para fechar caixa:",a),w(`/api/cashier/close/${e}`,{method:"PUT",body:JSON.stringify(a)})},cn=()=>w("/api/cashier/history").then(e=>e||[]).catch(e=>(console.error("Erro ao buscar histórico:",e),[])),un=e=>w(`/api/cashier/report/${e}`),as=e=>w(`/api/packages/${e}`),mn=e=>w("/api/packages",{method:"POST",body:JSON.stringify(e)}),pn=(e,t)=>w(`/api/packages/${e}`,{method:"PUT",body:JSON.stringify(t)}),gn=e=>w(`/api/packages/${e}`,{method:"DELETE"});let y={allComandas:[],catalog:{services:[],products:[],packages:[]},activeFilter:"atendimento",selectedComandaId:null,viewMode:"items",isCashierOpen:!1,activeCashierSessionId:null,loyaltySettings:null,paging:{page:1,limit:10,total:0},checkoutState:{payments:[],selectedMethod:"dinheiro",installments:1,amountReceived:""}},Ee=null,Ce=null,oo=null;function os(e,t){return function(...a){clearTimeout(oo),oo=setTimeout(()=>e.apply(this,a),t)}}async function so(e,t="stay"){if(!e||!e.id)return;e._localUpdatedAt=Date.now(),e._cachedItems=null,e._hasUnsavedChanges=!1,ot(),t==="checkout"&&(y.viewMode="checkout",y.checkoutState.payments||(y.checkoutState.payments=[]),y.checkoutState.selectedMethod="dinheiro",y.checkoutState.amountReceived="",G());const a=document.createElement("div");a.id="saving-overlay",a.className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center backdrop-blur-sm",a.innerHTML=`
        <div class="bg-white p-6 rounded-2xl shadow-2xl flex flex-col items-center animate-fade-in">
            <div class="loader mb-4 border-t-indigo-600"></div>
            <p class="text-gray-800 font-bold text-lg">Sincronizando...</p>
        </div>
    `,document.body.appendChild(a);try{const s=(e.comandaItems||[]).filter(r=>r&&r.id&&String(r.id)!=="undefined"&&String(r.id)!=="null").map(r=>{const o={...r};if(o.id=String(r.id),o.type==="product"){const n=o.id;o.productId||(o.productId=n),o.product_id||(o.product_id=n)}if(o.type==="service"){const n=o.id;o.serviceId||(o.serviceId=n),o.service_id||(o.service_id=n)}return o});console.log("Enviando itens para salvar:",s),e.type==="walk-in"&&String(e.id).startsWith("temp-")||await on(e.id,s),document.body.contains(a)&&document.body.removeChild(a),t!=="checkout"&&(g("Sucesso","Comanda salva com sucesso!","success"),G())}catch(s){document.body.contains(a)&&document.body.removeChild(a),console.error("Erro ao salvar:",s),e._hasUnsavedChanges=!0,G(),g("Erro","Falha ao salvar no servidor: "+s.message,"warning")}}function Re(e){if(!e._cachedItems){let t=[];if(e.status==="completed"){const a=e.comandaItems||e.items||[];t=a.length>0?a:e.services||[]}else{const a=(e.services||[]).map(n=>({...n,_source:"original_service"})),s=e.comandaItems||[],r=e.items||[],o=[...s,...r].map(n=>({...n,_source:"extra"}));t=[...a,...o]}return e._cachedItems=t,e._cachedTimestamp=Date.now(),t}return e._cachedItems}function bn(){const e=document.getElementById("comandas-layout");if(e){e.classList.add("detail-view-active");const t=document.getElementById("comanda-detail-container");t&&(t.scrollTop=0)}}function Le(){const e=document.getElementById("comandas-layout");e&&e.classList.remove("detail-view-active")}function fn(){const e=new Date().toISOString().split("T")[0];Ce.innerHTML=`
        <section class="h-full flex flex-col">
            <div class="flex flex-wrap justify-between items-center mb-4 gap-4 px-1">
                <h2 class="text-2xl md:text-3xl font-bold text-gray-800">Ponto de Venda</h2>
                <div id="cashier-controls" class="flex items-center gap-2">
                    <div class="loader-sm"></div>
                </div>
            </div>

            <div id="cashier-alert-box"></div>

            <div id="comandas-layout">
                <div id="comandas-list-column" class="flex flex-col h-full">
                    <div class="p-4 pb-2 sticky top-0 bg-white z-10 border-b border-gray-100 shadow-sm flex-shrink-0">
                        <button 
                            id="btn-new-sale"
                            data-action="new-sale" 
                            class="w-full py-3 px-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition shadow-md flex items-center justify-center gap-2 mb-3"
                        >
                            <span>+</span> NOVA VENDA
                        </button>
                        
                        <div class="flex bg-gray-100 rounded-lg p-1">
                            <button data-filter="atendimento" class="filter-btn flex-1 text-sm font-medium py-2 rounded-md transition-all">Em Aberto</button>
                            <button data-filter="finalizadas" class="filter-btn flex-1 text-sm font-medium py-2 rounded-md transition-all">Finalizadas</button>
                        </div>
                    </div>

                    <div id="finalizadas-datepicker" class="hidden px-4 py-2 bg-gray-50 border-b flex-shrink-0">
                        <label for="filter-date" class="text-xs font-semibold text-gray-500 uppercase">Data:</label>
                        <input type="date" id="filter-date" value="${e}" class="w-full mt-1 p-2 border rounded-md bg-white text-sm">
                    </div>

                    <div id="comandas-list" class="p-3 space-y-2 overflow-y-auto custom-scrollbar flex-grow">
                        <div class="loader mx-auto mt-10"></div>
                    </div>
                    
                    <div id="pagination-container" class="p-2 border-t bg-gray-50 flex-shrink-0 min-h-[50px] flex justify-center items-center"></div>
                </div>

                <div id="comanda-detail-container">
                    <div class="hidden lg:flex flex-col items-center justify-center h-full text-center text-gray-400">
                        <p>Selecione uma venda para ver os detalhes</p>
                    </div>
                </div>
            </div>
        </section>
    `,Ut()}function Ut(){const e=document.getElementById("cashier-alert-box"),t=document.getElementById("btn-new-sale");y.isCashierOpen?(e&&(e.innerHTML=""),t&&(t.classList.remove("opacity-50","cursor-not-allowed"),t.disabled=!1)):(e&&(e.innerHTML=`
            <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-r-lg animate-fade-in">
                <div class="flex">
                    <div class="flex-shrink-0">⚠️</div>
                    <div class="ml-3">
                        <p class="text-sm text-yellow-700">
                            <strong>Caixa Fechado!</strong> Abra o caixa para realizar vendas.
                        </p>
                    </div>
                </div>
            </div>
        `),t&&(t.classList.add("opacity-50","cursor-not-allowed"),t.disabled=!0)),vn()}function vn(){const e=document.getElementById("cashier-controls");e&&(y.isCashierOpen?e.innerHTML=`
            <span class="hidden sm:inline-block text-sm font-medium text-green-700 bg-green-100 py-1 px-3 rounded-full border border-green-200">Caixa Aberto</span>
            <button data-action="close-cashier" class="py-2 px-4 bg-red-100 text-red-700 font-semibold rounded-lg hover:bg-red-200 text-sm transition">Fechar Caixa</button>
            <button data-action="view-sales-report" class="py-2 px-4 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 text-sm transition">Relatório</button>
        `:e.innerHTML=`
            <span class="hidden sm:inline-block text-sm font-medium text-red-700 bg-red-100 py-1 px-3 rounded-full border border-red-200">Caixa Fechado</span>
            <button data-action="open-cashier" class="py-2 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 text-sm shadow transition">Abrir Caixa</button>
            <button data-action="view-sales-report" class="py-2 px-4 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 text-sm transition">Relatório</button>
        `)}function ot(){const e=document.getElementById("comandas-list"),t=document.getElementById("pagination-container");if(!e)return;if(!y.isCashierOpen&&y.activeFilter==="atendimento"){e.innerHTML=`
            <div class="text-center py-10 opacity-60">
                <svg class="w-12 h-12 mx-auto text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                <p class="text-sm font-medium text-gray-700">Caixa Fechado</p>
                <p class="text-xs text-gray-500">Abra o caixa para ver as vendas</p>
            </div>
        `,t&&(t.innerHTML="");return}const s={atendimento:"confirmed",finalizadas:"completed"}[y.activeFilter],r=y.allComandas.filter(n=>n.status===s);if(r.length===0){e.innerHTML='<p class="text-center text-gray-400 py-10 text-sm">Nenhuma venda nesta página.</p>',ro(t);return}const o=document.createDocumentFragment();r.forEach(n=>{const l=Re(n).reduce((x,k)=>x+Number(k.price||0),0),d=n.id===y.selectedComandaId,c=new Date(n.startTime).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),m=n.type==="walk-in"||typeof n.id=="string"&&n.id.startsWith("temp-"),b=h(n.clientName||"Cliente sem nome"),f=h(n.professionalName||"Sem profissional"),v=m?'<span class="text-[10px] font-bold uppercase text-blue-600 bg-blue-100 px-2 py-0.5 rounded-md border border-blue-200">Avulso</span>':'<span class="text-[10px] font-bold uppercase text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded-md border border-indigo-200">Agenda</span>',p=document.createElement("div");p.className=`comanda-card cursor-pointer ${d?"selected":""}`,p.dataset.action="select-comanda",p.dataset.comandaId=n.id,p.innerHTML=`
            <div class="flex justify-between items-start mb-1 pointer-events-none">
                <p class="font-bold text-gray-800 truncate max-w-[70%] text-sm">${b}</p>
                <p class="font-bold text-gray-900 text-sm">R$ ${l.toFixed(2)}</p>
            </div>
            <div class="flex justify-between items-center mt-1 pointer-events-none">
                <div class="flex items-center gap-2">
                    ${v}
                    <p class="text-xs text-gray-500 truncate max-w-[100px]">${f}</p>
                </div>
                <p class="text-xs text-gray-400 font-medium">${c}</p> 
            </div>
        `,o.appendChild(p)}),e.innerHTML="",e.appendChild(o),ro(t)}function ro(e){if(!e)return;e.innerHTML="";const{page:t,total:a,limit:s}=y.paging,r=Math.ceil((a||0)/s);if(r===0)return;const o=document.createElement("div");o.className="flex gap-2 justify-center items-center w-full",o.innerHTML=`
        <button data-page="${t-1}" class="px-3 py-1 rounded bg-white border border-gray-300 hover:bg-gray-100 text-sm font-medium ${t<=1?"opacity-50 cursor-not-allowed":""}" ${t<=1?"disabled":""}>&laquo;</button>
        <span class="text-xs font-semibold text-gray-600 mx-2">Pág ${t} de ${r||1}</span>
        <button data-page="${t+1}" class="px-3 py-1 rounded bg-white border border-gray-300 hover:bg-gray-100 text-sm font-medium ${t>=r?"opacity-50 cursor-not-allowed":""}" ${t>=r?"disabled":""}>&raquo;</button>
    `,e.appendChild(o),o.querySelectorAll("button[data-page]").forEach(n=>{n.onclick=i=>{i.stopPropagation();const l=parseInt(n.dataset.page,10);l>0&&l<=r&&(y.paging.page=l,se())}})}function G(){const e=document.getElementById("comanda-detail-container");if(!e)return;const t=y.allComandas.find(p=>p.id===y.selectedComandaId);if(y.viewMode==="checkout"&&t){hn(t,e);return}const a=`
        <div class="mobile-only-header">
            <button data-action="back-to-list" class="btn-back-mobile">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
            </button>
            <h3 class="font-bold text-lg text-gray-800 ml-2">Detalhes</h3>
        </div>
    `;if(!y.isCashierOpen){e.innerHTML=`
            ${a}
            <div class="flex flex-col items-center justify-center h-full text-center text-gray-500 p-6">
                <div class="bg-gray-100 p-4 rounded-full mb-4">🔒</div>
                <p class="font-semibold text-lg">Caixa Fechado</p>
                <button data-action="open-cashier" class="py-2 px-6 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition shadow mt-4">Abrir Caixa</button>
            </div>
        `;return}if(!t){e.innerHTML=`
            <div class="hidden lg:flex flex-col items-center justify-center h-full text-center text-gray-400">
                <svg class="w-16 h-16 mb-4 opacity-20" fill="currentColor" viewBox="0 0 20 20"><path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/></svg>
                <p class="text-lg font-medium">Selecione uma venda</p>
                <p class="text-sm">Toque em um item à esquerda para ver os detalhes</p>
            </div>
        `;return}const s=Re(t),r=t.status==="completed",o=t.type==="walk-in"||typeof t.id=="string"&&t.id.startsWith("temp-"),n=s.reduce((p,x)=>{const k=x._source==="original_service",E=x.id||x.name,S=k?`original-${E}`:`${x.type}-${E}`;return p[S]||(p[S]={...x,quantity:0,sources:[]}),p[S].quantity+=1,x._source&&p[S].sources.push(x._source),p},{}),i=Object.values(n).reduce((p,x)=>p+Number(x.price||0)*x.quantity,0),l=h(t.clientName||"Cliente sem nome"),d=h(t.professionalName||"Profissional não atribuído"),c=t._hasUnsavedChanges,f=`
        <div class="grid grid-cols-3 gap-3 mobile-hidden pt-2">
            <button data-action="add-item" class="col-span-1 py-3 bg-blue-50 text-blue-700 font-bold rounded-xl hover:bg-blue-100 transition border border-blue-200 text-sm">
                + Item
            </button>
            <button data-action="save-comanda" class="col-span-1 py-3 font-bold rounded-xl transition text-sm ${c?"bg-amber-500 text-white hover:bg-amber-600 shadow-lg animate-pulse":"bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"}">
                ${c?"Salvar Alterações*":"Salvar"}
            </button>
            <button data-action="go-to-checkout" class="col-span-1 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition shadow-lg shadow-green-200 text-sm">
                Receber
            </button>
        </div>
    `,v=`
        <div class="mobile-fabs-container">
            <button data-action="add-item" class="fab-btn-secondary" title="Adicionar Item">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
            </button>
            <button data-action="save-comanda" class="fab-btn-secondary ${c?"bg-amber-500 text-white hover:bg-amber-600":"bg-gray-600 text-white hover:bg-gray-700"}" title="Salvar Alterações">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path></svg>
            </button>
            <button data-action="go-to-checkout" class="fab-btn-primary" title="Receber / Pagar">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </button>
        </div>
    `;e.innerHTML=`
        ${a} 
        <div class="flex-grow overflow-y-auto p-4 pb-24 custom-scrollbar"> 
            <div class="flex justify-between items-start mb-6 border-b pb-4">
                <div>
                    <h3 class="text-xl font-bold text-gray-800 truncate max-w-[200px]">${l}</h3>
                    <p class="text-sm text-gray-500 flex items-center gap-1 mt-1">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                        ${d}
                    </p>
                    ${o?'<span class="mt-2 inline-block px-2 py-1 text-xs font-bold bg-blue-100 text-blue-700 rounded-md">Venda Avulsa</span>':`<button data-action="go-to-appointment" data-id="${t.id}" data-date="${t.startTime}" class="text-indigo-600 text-xs font-semibold hover:underline flex items-center gap-1 mt-2">
                             Ver na Agenda <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                         </button>`}
                </div>
                <div class="flex gap-2">
                    ${r?`<button data-action="reopen-appointment" data-id="${t.id}" class="p-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200" title="Reabrir"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg></button>`:""}
                    ${o&&!r?`<button data-action="delete-walk-in" data-id="${t.id}" class="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200" title="Excluir"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>`:""}
                </div>
            </div>

            <div id="loyalty-container" class="mb-4"></div>

            <div class="space-y-3">
                <h4 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Itens do Pedido</h4>
                ${Object.values(n).map(p=>{const x=p.sources&&p.sources.includes("original_service");return`
                    <div class="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-100 shadow-sm ${p.isReward?"border-yellow-200 bg-yellow-50":""}">
                        <div class="flex items-center gap-3 w-full">
                            <div class="flex-grow min-w-0">
                                <p class="text-sm font-semibold text-gray-800 line-clamp-1">
                                    ${p.isReward?"🎁 ":""}
                                    ${h(p.name)}
                                    ${x?'<span class="text-[10px] text-indigo-600 bg-indigo-50 px-1 rounded border border-indigo-100 ml-1">Original</span>':""}
                                </p>
                                <p class="text-xs text-gray-500">${p.isReward?'<span class="text-yellow-700 font-bold">Prémio Fidelidade</span>':`R$ ${(p.price||0).toFixed(2)} un.`}</p>
                            </div>
                            ${r?`<span class="flex items-center justify-center w-8 h-8 bg-gray-100 text-gray-700 font-bold text-sm rounded-lg">${p.quantity}x</span>`:`
                                <div class="flex items-center bg-gray-100 rounded-lg p-1 gap-3">
                                    ${x?`<span class="text-sm font-bold text-gray-500 w-16 text-center py-1 bg-gray-200 rounded text-[10px] uppercase">Fixo: ${p.quantity}</span>`:`<button data-action="decrease-qty" data-item-id="${p.id}" data-item-type="${p.type}" class="w-6 h-6 flex items-center justify-center rounded bg-white text-gray-600 shadow-sm hover:bg-red-50 hover:text-red-600 disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-gray-600">-</button>
                                         <span class="text-sm font-bold text-gray-800 w-4 text-center">${p.quantity}</span>
                                         <button data-action="increase-qty" data-item-id="${p.id}" data-item-type="${p.type}" class="w-6 h-6 flex items-center justify-center rounded bg-white text-gray-600 shadow-sm hover:bg-green-50 hover:text-green-600">+</button>`}
                                </div>
                            `}
                            <div class="flex items-center justify-end w-20">
                                <span class="font-bold text-gray-900 whitespace-nowrap">R$ ${(p.price*p.quantity).toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                `}).join("")}
                ${Object.keys(n).length===0?'<div class="text-center py-8 text-gray-400 border-2 border-dashed rounded-lg text-sm">Nenhum item adicionado</div>':""}
            </div>
        </div>

        <footer class="p-4 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            <div class="flex flex-col items-start lg:flex-row lg:justify-between lg:items-end mb-4">
                <span class="text-sm text-gray-500 font-medium">Total a Pagar</span>
                <span class="text-4xl lg:text-3xl font-extrabold text-gray-900 mt-1 lg:mt-0">R$ ${i.toFixed(2)}</span>
            </div>
            ${r?`
                <div class="bg-green-50 text-green-700 text-center py-3 rounded-xl font-bold border border-green-200 flex items-center justify-center gap-2">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                    Venda Finalizada
                </div>
            `:f}
        </footer>

        ${r?"":v}
    `,!r&&(t.clientId||t.clientName)&&xn(t,e.querySelector("#loyalty-container"))}function hn(e,t){const s=Re(e).reduce((l,d)=>l+Number(d.price||0),0),r=y.checkoutState,o=r.payments.reduce((l,d)=>l+d.value,0),n=Math.max(0,s-o);(!r.amountReceived||n>0)&&(r.amountReceived=n.toFixed(2));const i=`
        <div class="mobile-only-header">
            <button data-action="back-to-items" class="btn-back-mobile">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
            </button>
            <h3 class="font-bold text-lg text-gray-800 ml-2">Pagamento</h3>
        </div>
    `;t.innerHTML=`
        ${i}
        <div class="flex-grow overflow-y-auto p-4 pb-24 custom-scrollbar">
            <div class="text-center mb-6 bg-gray-50 p-6 rounded-xl border border-gray-100">
                <p class="text-sm font-semibold text-gray-500 uppercase tracking-wide">Valor Total</p>
                <p class="text-5xl font-extrabold text-gray-800 mt-2">R$ ${s.toFixed(2)}</p>
                ${n<=.01?'<p class="text-green-600 font-bold mt-2 text-lg">Pago</p>':`<p class="text-red-500 font-medium mt-2">Faltam: R$ ${n.toFixed(2)}</p>`}
            </div>

            <div class="space-y-3 mb-6">
                ${r.payments.map((l,d)=>`
                    <div class="flex justify-between items-center bg-white p-3 rounded-lg border border-gray-200 shadow-sm animate-fade-in-fast">
                        <div class="flex items-center gap-3">
                             <div class="bg-gray-100 p-2 rounded-lg">
                                <span class="font-bold text-xs uppercase text-gray-600">${l.method}</span>
                             </div>
                             ${l.installments>1?`<span class="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">${l.installments}x</span>`:""}
                        </div>
                        <div class="flex items-center gap-3">
                            <span class="font-bold text-gray-900">R$ ${l.value.toFixed(2)}</span>
                            <button data-action="remove-payment-checkout" data-index="${d}" class="text-red-400 hover:text-red-600 p-1"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
                        </div>
                    </div>
                `).join("")}
            </div>

            ${n>.01?`
            <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <label class="block text-xs font-bold text-gray-500 uppercase mb-3">Adicionar Pagamento</label>
                <div class="grid grid-cols-3 gap-2 mb-4">
                    ${["dinheiro","pix","debito","credito","crediario"].map(l=>`
                        <button data-action="select-method" data-method="${l}" class="p-2 rounded-lg border text-xs font-bold uppercase transition ${r.selectedMethod===l?"bg-indigo-600 text-white border-indigo-600 shadow-md":"bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"}">
                            ${l}
                        </button>
                    `).join("")}
                </div>
                
                ${["credito","crediario"].includes(r.selectedMethod)?`
                    <div class="mb-3">
                        <label class="text-xs text-gray-500">Parcelas</label>
                        <select id="checkout-installments" class="w-full mt-1 p-2 border rounded-lg text-sm bg-gray-50">
                            ${Array.from({length:12},(l,d)=>`<option value="${d+1}" ${r.installments===d+1?"selected":""}>${d+1}x</option>`).join("")}
                        </select>
                    </div>
                `:""}

                <div class="flex items-end gap-2">
                    <div class="flex-grow">
                        <label class="text-xs text-gray-500">Valor</label>
                        <input type="number" id="checkout-amount" step="0.01" class="w-full p-2 border rounded-lg text-lg font-bold" value="${n.toFixed(2)}">
                    </div>
                    <button data-action="add-payment-checkout" class="h-[46px] px-4 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-900 transition">OK</button>
                </div>
            </div>
            `:""}
        </div>

        <footer class="p-4 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] grid grid-cols-2 gap-3">
            <button data-action="back-to-items" class="py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition">Voltar</button>
            <button data-action="finalize-checkout" class="py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition shadow-lg shadow-green-200 disabled:opacity-50 disabled:cursor-not-allowed" ${n>.01?"disabled":""}>Finalizar</button>
        </footer>
    `,t.querySelector("#checkout-amount")?.addEventListener("input",l=>{r.amountReceived=l.target.value}),t.querySelector("#checkout-installments")?.addEventListener("change",l=>{r.installments=parseInt(l.target.value,10)})}async function xn(e,t){if(!t)return;const a=y.loyaltySettings;if(!a||!a.enabled)return;let s=null;try{if(e.clientId)s=await da(u.establishmentId,e.clientId);else if(e.clientName){const i=await it(u.establishmentId,e.clientName,1);i&&i.length>0&&(s=i[0])}}catch(i){console.warn("Erro ao buscar dados de fidelidade",i)}if(!s||s.loyaltyPoints===void 0)return;const r=Number(s.loyaltyPoints)||0,n=(a.tiers||a.rewards||[]).filter(i=>{const l=Number(i.costPoints||i.points||0);return l>0&&r>=l});if(n.length>0){const i=document.createElement("div");i.className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl p-4 shadow-sm flex justify-between items-center animate-fade-in",i.innerHTML=`
            <div class="flex items-center gap-3">
                <div class="bg-yellow-100 p-2 rounded-full text-yellow-600">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                </div>
                <div>
                    <p class="text-sm font-bold text-yellow-800">Prémio Disponível!</p>
                    <p class="text-xs text-yellow-700">Saldo: <strong>${r} pts</strong></p>
                </div>
            </div>
        `;const l=document.createElement("button");l.innerText="Resgatar",l.className="text-xs font-bold bg-yellow-500 text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-600 transition-colors",l.onclick=()=>yn(n),i.appendChild(l),t.innerHTML="",t.appendChild(i)}}function yn(e,t){const a=`
        <div class="space-y-4">
            <p class="text-sm text-gray-600 mb-4">O cliente possui pontos suficientes para resgatar os seguintes itens:</p>
            <div class="space-y-2 max-h-96 overflow-y-auto custom-scrollbar">
                ${e.map(o=>{const n=o.costPoints||o.points||0,i=o.name||o.reward;return`
                    <button data-action="select-reward" data-reward-id="${o.id||i}" class="w-full flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:border-yellow-400 hover:bg-yellow-50 transition-all group">
                        <div class="text-left">
                            <p class="font-bold text-gray-800 group-hover:text-yellow-700">${h(i)}</p>
                            <p class="text-xs text-gray-500">Custo: ${n} pontos</p>
                        </div>
                        <span class="text-sm font-bold text-green-600 bg-green-100 px-3 py-1 rounded-full">Grátis</span>
                    </button>
                `}).join("")}
            </div>
        </div>
    `,{modalElement:s,close:r}=Y({title:"🎁 Resgatar Prémio",contentHTML:a,maxWidth:"max-w-md"});s.addEventListener("click",o=>{const n=o.target.closest('[data-action="select-reward"]');if(n){const i=n.dataset.rewardId,l=e.find(d=>d.id&&d.id==i||(d.name||d.reward)==i);l&&(wn(l),r())}})}async function wn(e,t){const a=Number(e.costPoints||e.points||0),s=e.name||e.reward,r={id:e.serviceId||e.productId||`reward-${Date.now()}`,name:`${s}`,price:0,type:e.serviceId?"service":"product",isReward:!0,pointsCost:a};await Pa(r,1)}function kn(){if(!y.isCashierOpen)return g("Caixa Fechado","Abra o caixa antes de adicionar itens.","error");const{modalElement:e,close:t}=Y({title:"Adicionar Item à Comanda",contentHTML:'<div id="add-item-content"></div>',maxWidth:"max-w-4xl"}),a=()=>{const r=e.querySelector("#add-item-content");r.innerHTML=`
            <input type="search" id="item-search-input" placeholder="Pesquisar por nome..." class="w-full p-3 mb-4 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div><h4 class="font-semibold mb-2 text-center text-indigo-600">Serviços</h4><div id="modal-service-list" class="space-y-2 max-h-80 overflow-y-auto custom-scrollbar"></div></div>
                <div><h4 class="font-semibold mb-2 text-center text-green-600">Produtos</h4><div id="modal-product-list" class="space-y-2 max-h-80 overflow-y-auto custom-scrollbar"></div></div>
                <div><h4 class="font-semibold mb-2 text-center text-purple-600">Pacotes</h4><div id="modal-package-list" class="space-y-2 max-h-80 overflow-y-auto custom-scrollbar"></div></div>
            </div>`;const o=(i="")=>{const l=i.toLowerCase(),d={service:'<svg class="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v4.512a9.04 9.04 0 00-3 5.012M12 12a9.04 9.04 0 01-3-5.012V5l-1-1z" /></svg>',product:'<svg class="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>',package:'<svg class="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-14L4 7m8 4v10M4 7v10l8 4" /></svg>'},c={"modal-service-list":{items:y.catalog.services,type:"service"},"modal-product-list":{items:y.catalog.products,type:"product"},"modal-package-list":{items:y.catalog.packages,type:"package"}};Object.entries(c).forEach(([m,{items:b,type:f}])=>{const v=document.getElementById(m);if(!v)return;const p=b.filter(x=>x.name.toLowerCase().includes(l)).slice(0,50);v.innerHTML=p.map(x=>x.id?`
                    <button data-action="select-item-for-quantity" data-item-type="${f}" data-item-id="${x.id}" class="flex items-center gap-2 w-full p-2 bg-white border rounded hover:bg-gray-50 transition text-left">
                        <div class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gray-50">${d[f]}</div>
                        <span class="flex-grow text-sm truncate">${h(x.name)}</span>
                        <span class="font-bold text-xs text-gray-700">R$ ${x.price.toFixed(2)}</span>
                    </button>
                `:"").join("")||'<p class="text-xs text-gray-400 text-center py-2">Nada encontrado</p>'})};o();const n=document.getElementById("item-search-input");n.addEventListener("input",os(i=>{o(i.target.value)},300)),setTimeout(()=>n.focus(),100)},s=r=>{let o=1;const n=e.querySelector("#add-item-content"),i=()=>{document.getElementById("quantity-display").textContent=o,document.getElementById("quantity-minus-btn").disabled=o<=1};n.innerHTML=`
            <div class="text-center p-8 relative">
                <button data-action="back-to-catalog" class="absolute top-0 left-0 text-gray-600 hover:text-gray-900 font-medium flex items-center gap-1">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg> Voltar
                </button>
                <h3 class="font-bold text-2xl text-gray-800 mt-4">${h(r.name)}</h3>
                <p class="text-lg text-gray-500 font-medium">R$ ${r.price.toFixed(2)}</p>
                <div class="my-8 flex items-center justify-center gap-6">
                    <button id="quantity-minus-btn" class="w-14 h-14 rounded-full bg-gray-100 text-2xl font-bold text-gray-600 hover:bg-gray-200 transition disabled:opacity-50">-</button>
                    <span id="quantity-display" class="text-5xl font-bold w-24 text-center text-indigo-700">${o}</span>
                    <button id="quantity-plus-btn" class="w-14 h-14 rounded-full bg-gray-100 text-2xl font-bold text-gray-600 hover:bg-gray-200 transition">+</button>
                </div>
                <button data-action="confirm-add-item" class="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition shadow-lg text-lg">Adicionar à Comanda</button>
            </div>
        `,document.getElementById("quantity-minus-btn").onclick=()=>{o>1&&(o--,i())},document.getElementById("quantity-plus-btn").onclick=()=>{o++,i()},document.querySelector('[data-action="confirm-add-item"]').onclick=async()=>{await Pa(r,o),t()}};e.addEventListener("click",r=>{const o=r.target.closest('[data-action="select-item-for-quantity"]'),n=r.target.closest('[data-action="back-to-catalog"]');if(o){const{itemType:i,itemId:l}=o.dataset,c=(y.catalog[i+"s"]||[]).find(m=>m.id===l);c&&s({...c,type:i})}else n&&a()}),a()}async function pa(e=null){if(!y.isCashierOpen)return g("Caixa Fechado","Abra o caixa antes de criar uma nova venda.","error");if(!u.professionals||u.professionals.length===0)try{u.professionals=await Z(u.establishmentId)}catch{return g("Erro","Não foi possível carregar profissionais.","error")}const a=`
        <form id="new-sale-form" class="space-y-4">
            <div class="relative">
                <label class="block text-sm font-medium text-gray-700">Cliente</label>
                <input type="text" id="client-search" class="mt-1 w-full p-2 border rounded-md bg-white focus:ring-2 focus:ring-indigo-500" placeholder="Digite nome ou telefone..." autocomplete="off">
                <input type="hidden" id="selected-client-id" required>
                <ul id="client-suggestions" class="hidden absolute z-50 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-y-auto mt-1"></ul>
                <button type="button" data-action="new-client-from-sale" class="text-xs text-blue-600 hover:underline mt-1 font-medium inline-block">+ Cadastrar Novo Cliente</button>
            </div>
            <div>
                <label for="new-sale-professional" class="block text-sm font-medium text-gray-700">Profissional</label>
                <select id="new-sale-professional" required class="mt-1 w-full p-2 border rounded-md bg-white"><option value="">Selecione...</option>${u.professionals.map(l=>`<option value="${l.id}">${h(l.name)}</option>`).join("")}</select>
            </div>
            <div class="pt-4 border-t"><button type="submit" id="btn-start-sale" class="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400">Iniciar Venda</button></div>
        </form>
    `,{modalElement:s}=Y({title:"Nova Venda Avulsa",contentHTML:a,maxWidth:"max-w-md"}),r=s.querySelector("#client-search"),o=s.querySelector("#client-suggestions"),n=s.querySelector("#selected-client-id");e&&(n.value=e.id,r.value=`${e.name} (${e.phone||"Sem tel"})`,r.classList.add("bg-green-50","border-green-300","text-green-800")),r.addEventListener("input",os(async l=>{const d=l.target.value.trim();if(n.value="",r.classList.remove("bg-green-50","border-green-300","text-green-800"),d.length<2){o.classList.add("hidden");return}try{o.innerHTML='<li class="p-2 text-xs text-gray-500">Buscando...</li>',o.classList.remove("hidden");const c=await it(u.establishmentId,d,10);c.length===0?o.innerHTML='<li class="p-2 text-xs text-gray-500">Nenhum cliente encontrado</li>':o.innerHTML=c.map(m=>`<li data-client-id="${m.id}" data-client-name="${m.name}" data-client-phone="${m.phone}" class="p-2 hover:bg-indigo-50 cursor-pointer border-b last:border-0 transition-colors"><div class="font-bold text-sm text-gray-800">${h(m.name)}</div><div class="text-xs text-gray-500">${m.phone||"Sem telefone"}</div></li>`).join("")}catch{o.classList.add("hidden")}},400)),o.addEventListener("click",l=>{const d=l.target.closest("li[data-client-id]");d&&(n.value=d.dataset.clientId,n.dataset.name=d.dataset.clientName,n.dataset.phone=d.dataset.clientPhone,r.value=`${d.dataset.clientName}`,r.classList.add("bg-green-50","border-green-300","text-green-800"),o.classList.add("hidden"))}),document.addEventListener("click",l=>{!r.contains(l.target)&&!o.contains(l.target)&&o.classList.add("hidden")}),s.querySelector("#new-sale-form").addEventListener("submit",Tn);const i=s.querySelector('[data-action="new-client-from-sale"]');i&&i.addEventListener("click",l=>{l.preventDefault(),s.style.display="none",Sn()})}function Sn(){Y({title:"Cadastrar Novo Cliente",contentHTML:`
        <form id="comandas_clientRegistrationForm" class="flex flex-col h-full">
            <div class="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar" style="max-height: 80vh;">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label class="block text-sm font-medium text-gray-700">Nome *</label><input type="text" id="regClientName" required class="mt-1 block w-full p-3 rounded-lg border-gray-300 shadow-sm"></div>
                    <div><label class="block text-sm font-medium text-gray-700">Telefone (ID) *</label><input type="tel" id="regClientPhone" required class="mt-1 block w-full p-3 rounded-lg border-gray-300 shadow-sm" placeholder="Apenas números"></div>
                </div>
            </div>
            <footer class="p-5 border-t bg-gray-100 flex justify-end gap-3 flex-shrink-0">
                <button type="submit" class="py-3 px-6 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition shadow-md">Salvar Cliente</button>
            </footer>
        </form>
    `,maxWidth:"max-w-2xl"});const t=document.getElementById("comandas_clientRegistrationForm");t&&t.addEventListener("submit",$n)}async function $n(e){e.preventDefault();const t=document.getElementById("comandas_clientRegistrationForm");if(!t)return;const a=t.querySelector("#regClientName"),r=t.querySelector("#regClientPhone").value.replace(/\D/g,"");if(!a.value||!r)return g("Erro","Nome e Telefone são obrigatórios.","error");try{const o=await(void 0)(u.establishmentId,r);if(o)g("Atenção","Cliente já cadastrado.","info"),document.getElementById("genericModal").style.display="none",pa(o);else{const n=await(void 0)({establishmentId:u.establishmentId,name:a.value,phone:r});g("Sucesso","Cliente cadastrado!","success"),document.getElementById("genericModal").style.display="none",pa(n)}}catch(o){g("Erro",o.message,"error")}}async function En(){const e=`
        <form id="open-cashier-form" class="space-y-4">
            <div>
                <label for="initial-amount" class="block text-sm font-medium text-gray-700">Valor Inicial do Caixa</label>
                <div class="mt-1 relative"><span class="absolute left-3 top-2 text-gray-500 font-semibold">R$</span><input type="number" step="0.01" min="0" id="initial-amount" required class="w-full p-2 pl-12 border rounded-md text-lg font-semibold" placeholder="0.00" value="0.00"></div>
            </div>
            <div class="pt-4 border-t"><button type="submit" class="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition shadow-md">Confirmar Abertura</button></div>
        </form>
    `,{modalElement:t}=Y({title:"Abrir Caixa",contentHTML:e,maxWidth:"max-w-md"});t.querySelector("#open-cashier-form").addEventListener("submit",async a=>{a.preventDefault();const s=parseFloat(document.getElementById("initial-amount").value);if(isNaN(s)||s<0)return g("Valor Inválido","Insira um valor válido.","error");try{const r=await ln({establishmentId:u.establishmentId,initialAmount:parseFloat(s.toFixed(2))});y.isCashierOpen=!0,y.activeCashierSessionId=r.id,document.getElementById("genericModal").style.display="none",g("Sucesso!",`Caixa aberto (R$ ${s.toFixed(2)})`,"success"),Ut(),await se()}catch(r){g("Erro",`Falha ao abrir caixa: ${r.message}`,"error")}})}async function In(){const e=y.activeCashierSessionId;if(e)try{const t=await un(e),a=`
            <form id="close-cashier-form" class="space-y-4">
                <div class="grid grid-cols-2 gap-4 text-center">
                    <div class="bg-blue-50 p-3 rounded-lg border border-blue-100"><p class="text-xs text-gray-500 uppercase font-bold">Abertura</p><p class="text-xl font-bold text-blue-700">R$ ${t.initialAmount.toFixed(2)}</p></div>
                    <div class="bg-green-50 p-3 rounded-lg border border-green-100"><p class="text-xs text-gray-500 uppercase font-bold">Vendas Dinheiro</p><p class="text-xl font-bold text-green-700">R$ ${t.cashSales.toFixed(2)}</p></div>
                </div>
                <div class="bg-gray-800 text-white p-4 rounded-lg text-center shadow-lg"><p class="text-sm font-medium opacity-80">Valor Esperado em Caixa</p><p class="text-3xl font-bold">R$ ${t.expectedAmount.toFixed(2)}</p></div>
                <hr>
                <div>
                    <label for="final-amount" class="block text-sm font-bold text-gray-700">Valor Final (Contado)</label>
                    <div class="mt-1 relative"><span class="absolute left-3 top-2 text-gray-500 font-semibold">R$</span><input type="number" step="0.01" min="0" id="final-amount" required class="w-full p-2 pl-12 border rounded-md text-lg font-semibold border-gray-300 focus:ring-2 focus:ring-red-500" placeholder="0.00" value="${t.expectedAmount.toFixed(2)}"></div>
                </div>
                <div class="pt-4 border-t"><button type="submit" class="w-full bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 transition shadow-md">Confirmar e Fechar</button></div>
            </form>
        `,{modalElement:s}=Y({title:"Fechar Caixa",contentHTML:a,maxWidth:"max-w-md"});s.querySelector("#close-cashier-form").addEventListener("submit",async r=>{r.preventDefault();const o=parseFloat(document.getElementById("final-amount").value);if(isNaN(o)||o<0)return g("Valor Inválido","Insira um valor final válido.","error");try{await dn(e,o),y.isCashierOpen=!1,y.activeCashierSessionId=null,document.getElementById("genericModal").style.display="none",Ut(),await se(),g("Sucesso!","Caixa fechado com sucesso!","success")}catch(n){g("Erro",`Falha ao fechar caixa: ${n.message}`,"error")}})}catch(t){g("Erro",`Falha ao carregar relatório: ${t.message}`,"error")}}async function Cn(e){y.activeFilter!==e&&(y.activeFilter=e,y.paging.page=1,document.querySelectorAll(".filter-btn").forEach(t=>t.classList.remove("bg-white","text-indigo-600","shadow")),document.querySelector(`[data-filter="${e}"]`).classList.add("bg-white","text-indigo-600","shadow"),document.getElementById("finalizadas-datepicker").classList.toggle("hidden",e!=="finalizadas"),Le(),await se(),y.selectedComandaId=null,y.viewMode="items",G())}function ss(e){y.selectedComandaId=e,y.viewMode="items",ot(),bn(),G()}async function Pa(e,t){const a=y.allComandas.find(o=>o.id===y.selectedComandaId);if(!a)return;if(!e.id||String(e.id)==="undefined"){console.error("Tentativa de adicionar item sem ID:",e),g("Erro","Item sem identificador. Não foi possível adicionar.","error");return}const s=parseFloat(e.price)||0,r=Array(t).fill(0).map(()=>{const o={id:String(e.id),name:e.name,price:s,type:e.type,isReward:e.isReward||!1,pointsCost:e.pointsCost||0};return e.type==="product"?(o.productId=o.id,o.product_id=o.id):e.type==="service"&&(o.serviceId=o.id,o.service_id=o.id),o});a.comandaItems=a.comandaItems||[],a.comandaItems.push(...r),a._cachedItems=null,a._hasUnsavedChanges=!0,G()}async function no(e,t){const a=y.allComandas.find(o=>o.id===y.selectedComandaId);if(!a)return;let s=!1,r=(a.comandaItems||[]).findIndex(o=>o.id==e&&o.type===t);r>-1&&(a.comandaItems.splice(r,1),s=!0),s&&(a._cachedItems=null,a._hasUnsavedChanges=!0,G())}async function Ln(e){if(y.isProcessing)return;y.isProcessing=!0;const t=e.type==="appointment",s=Re(e),{payments:r}=y.checkoutState,o=r.reduce((c,m)=>c+m.value,0);let n=0;const i=y.loyaltySettings;if(i&&i.enabled)if(i.type==="visit")n=Number(i.pointsPerVisit)||1;else{const c=Number(i.pointsPerCurrency)||10;c>0&&(n=Math.floor(o/c))}const l={payments:r,totalAmount:Number(o),items:s,cashierSessionId:y.activeCashierSessionId,loyaltyPointsEarned:n},d=document.createElement("div");d.className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center backdrop-blur-sm",d.innerHTML='<div class="bg-white p-6 rounded-2xl shadow-2xl flex flex-col items-center"><div class="loader mb-4 border-t-indigo-600"></div><p>Finalizando venda...</p></div>',document.body.appendChild(d);try{t?await Qs(e.id,l):(l.establishmentId=u.establishmentId,l.clientId=e.clientId,l.clientName=e.clientName,l.professionalId=e.professionalId,e.clientPhone&&(l.clientPhone=e.clientPhone),await sn(l));let c="Venda finalizada com sucesso!";n>0&&(c+=` Cliente ganhou ${n} pontos!`),g("Sucesso!",c,"success"),Le(),y.selectedComandaId=null,y.viewMode="items",await se()}catch(c){g("Erro no Checkout",c.message,"error")}finally{document.body.contains(d)&&document.body.removeChild(d),y.isProcessing=!1}}async function Tn(e){e.preventDefault();const t=document.getElementById("selected-client-id"),a=document.getElementById("new-sale-professional").value,s=t.value,r=document.getElementById("client-search").value,o=t.dataset.phone||"";if(!s)return g("Erro","Selecione um cliente válido.","error");const n=u.professionals.find(l=>l.id===a);if(!n)return g("Erro","Selecione um profissional válido.","error");const i={id:`temp-${Date.now()}`,type:"walk-in",clientId:s,clientName:r.split("(")[0].trim(),clientPhone:o,professionalId:n.id,professionalName:n.name,startTime:new Date,status:"confirmed",services:[],comandaItems:[]};y.allComandas.unshift(i),y.selectedComandaId=i.id,y.viewMode="items",document.getElementById("genericModal").style.display="none",ss(i.id)}async function se(){const e=document.getElementById("comandas-list");(!e.hasChildNodes()||e.innerHTML.includes("loader"))&&(e.innerHTML='<div class="loader mx-auto mt-10"></div>');const t=y.activeFilter==="finalizadas"?document.getElementById("filter-date").value:null;try{const a=await nn();if(y.isCashierOpen=!!a,y.activeCashierSessionId=a?a.id:null,Ut(),!y.isCashierOpen&&y.activeFilter==="atendimento"){ot(),G();return}try{const r=await(void 0)(u.establishmentId);r&&r.loyaltyProgram&&(y.loyaltySettings=r.loyaltyProgram)}catch{}const s=await an(u.establishmentId,t,y.paging.page,y.paging.limit);if(y.allComandas=s.data||s,y.paging.total=s.total||s.length,y.catalog.services.length===0){const[r,o,n,i]=await Promise.all([Se(u.establishmentId),Ht(u.establishmentId),as(u.establishmentId),Z(u.establishmentId)]);y.catalog={services:r,products:o,packages:n},u.professionals=i}ot(),G()}catch(a){g("Erro",`Não foi possível carregar os dados: ${a.message}`,"error")}}async function Pn(e={}){Ce=document.getElementById("content"),y.selectedComandaId=e.selectedAppointmentId||null,y.viewMode="items",fn(),Ee&&(Ce.removeEventListener("click",Ee),Ce.removeEventListener("change",Ee)),Ee=async t=>{const a=t.target.closest("[data-action], [data-filter], [data-comanda-id]");if(t.target.id==="filter-date"&&y.activeFilter==="finalizadas"){y.paging.page=1,await se();return}if(a){if(a.matches("[data-filter]"))Cn(a.dataset.filter);else if(a.matches("[data-comanda-id]")){if(t.target.closest('[data-action="go-to-appointment"]')){t.stopPropagation();return}ss(a.dataset.comandaId)}else if(a.matches("[data-action]")){const r=a.dataset.action,o=a.dataset.id||y.selectedComandaId,n=y.allComandas.find(i=>i.id===o);switch(r){case"back-to-list":Le(),y.selectedComandaId=null,document.querySelectorAll(".comanda-card").forEach(p=>p.classList.remove("selected")),G();break;case"new-sale":pa();break;case"add-item":kn();break;case"open-cashier":En();break;case"close-cashier":await In();break;case"view-sales-report":ae("sales-report-section");break;case"go-to-checkout":await so(n,"checkout");break;case"back-to-items":y.viewMode="items",G();break;case"save-comanda":await so(n,"stay");break;case"select-method":y.checkoutState.selectedMethod=a.dataset.method,y.checkoutState.installments=1,G();break;case"add-payment-checkout":const i=document.getElementById("checkout-amount");let l=parseFloat(i.value);const c=Re(n).reduce((p,x)=>p+(x.price||0),0),m=y.checkoutState.payments.reduce((p,x)=>p+x.value,0),b=c-m;if(isNaN(l)||l<=0){g("Valor inválido","Insira um valor maior que zero.","error");break}if(l>b+.05){g("Valor inválido","Valor excede o restante.","error");break}const f={method:y.checkoutState.selectedMethod,value:l};["credito","crediario"].includes(y.checkoutState.selectedMethod)&&y.checkoutState.installments>1&&(f.installments=y.checkoutState.installments),y.checkoutState.payments.push(f),y.checkoutState.selectedMethod="dinheiro",y.checkoutState.installments=1,y.checkoutState.amountReceived="",G();break;case"remove-payment-checkout":const v=parseInt(a.dataset.index,10);y.checkoutState.payments.splice(v,1),G();break;case"finalize-checkout":await Ln(n);break;case"increase-qty":{const p=a.dataset.itemId,x=a.dataset.itemType;if(!p||p==="undefined"||p==="null"){g("Erro","Item inválido para adição.","error");return}let E=Re(n).find($=>$.id==p&&$.type===x);E||(E=(y.catalog[x+"s"]||[]).find(L=>L.id==p));const S=E?{id:E.id,name:E.name,price:Number(E.price),type:E.type}:{id:p,name:"Item Indisponível",price:0,type:x};await Pa(S,1);break}case"decrease-qty":{await no(a.dataset.itemId,a.dataset.itemType);break}case"remove-item":await no(a.dataset.itemId,a.dataset.itemType);break;case"reopen-appointment":{if(await j("Reabrir Comanda","Tem certeza? O pagamento será estornado."))try{await Ys(o);const x=y.allComandas.findIndex(k=>k.id===o);x!==-1&&(y.allComandas[x].status="confirmed",delete y.allComandas[x].transaction),y.selectedComandaId=null,Le(),await se(),g("Sucesso!","Comanda reaberta.","success")}catch(x){g("Erro",x.message,"error")}break}case"go-to-appointment":{const p=a.dataset.id,x=a.dataset.date;ae("agenda-section",{scrollToAppointmentId:p,targetDate:new Date(x)});break}case"delete-walk-in":{if(await j("Excluir Venda","Confirma a exclusão desta venda avulsa?"))if(o.startsWith("temp-"))y.allComandas=y.allComandas.filter(x=>x.id!==o),y.selectedComandaId=null,ot(),G(),Le();else try{await rn(o),g("Sucesso","Venda excluída.","success"),y.selectedComandaId=null,Le(),await se()}catch(x){g("Erro",x.message,"error")}break}}}}},Ce.addEventListener("click",Ee),Ce.addEventListener("change",Ee),e.initialFilter&&(y.activeFilter=e.initialFilter==="finalizadas"?"finalizadas":"atendimento"),e.selectedAppointmentId&&(y.selectedComandaId=e.selectedAppointmentId),document.querySelectorAll(".filter-btn").forEach(t=>t.classList.remove("bg-white","text-indigo-600","shadow")),document.querySelector(`[data-filter="${y.activeFilter}"]`).classList.add("bg-white","text-indigo-600","shadow"),document.getElementById("finalizadas-datepicker").classList.toggle("hidden",y.activeFilter!=="finalizadas"),e.filterDate&&(document.getElementById("filter-date").value=new Date(e.filterDate).toISOString().split("T")[0]),await se()}const ga=document.getElementById("content");let Xt={};const mt=["#4f46e5","#10b981","#f59e0b","#ef4444","#8b5cf6","#ec4899","#06b6d4"],q={startDate:new Date(new Date().getFullYear(),new Date().getMonth(),1).toISOString().split("T")[0],endDate:new Date().toISOString().split("T")[0],selectedProfessional:"all",selectedCostCenter:"all",professionalsList:[],costCentersList:[],data:null,appointmentsData:[],currentTab:"dashboards"};async function Bn(){if(!window.Chart)return new Promise((e,t)=>{const a=document.createElement("script");a.src="https://cdn.jsdelivr.net/npm/chart.js",a.onload=e,a.onerror=t,document.head.appendChild(a)})}async function Dn(){ga.innerHTML='<div class="flex flex-col items-center justify-center h-64"><div class="loader mb-4"></div><p class="text-gray-500">A carregar inteligência de dados...</p></div>';try{await Bn();const[e,t]=await Promise.all([Z(u.establishmentId),Dr(u.establishmentId).catch(()=>[])]);q.professionalsList=e||[],q.costCentersList=t||[],Mn(),await rs()}catch(e){console.error("Erro no loadReportsPage:",e),ga.innerHTML=`
            <div class="flex flex-col items-center justify-center h-full text-red-500">
                <svg class="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <p>Erro ao carregar relatórios: ${h(e.message)}</p>
                <button onclick="window.location.reload()" class="mt-4 px-4 py-2 bg-gray-200 rounded text-gray-700 hover:bg-gray-300">Tentar Novamente</button>
            </div>`}}function Mn(){const e=q.professionalsList.map(a=>`<option value="${a.id}">${h(a.name)}</option>`).join(""),t=q.costCentersList.map(a=>`<option value="${a.id}">${h(a.name)}</option>`).join("");ga.innerHTML=`
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
                            <select id="report-prof" class="border rounded-lg px-2 py-2 text-sm bg-gray-50 focus:ring-2 focus:ring-indigo-500 outline-none w-full">
                                <option value="all">Todos Profissionais</option>
                                ${e}
                            </select>
                            <select id="report-cost" class="border rounded-lg px-2 py-2 text-sm bg-gray-50 focus:ring-2 focus:ring-indigo-500 outline-none w-full">
                                <option value="all">Todos Centros</option>
                                ${t}
                            </select>
                        </div>
                        <div class="flex gap-2">
                            <input type="date" id="report-start" value="${q.startDate}" class="border rounded-lg px-2 py-2 text-sm w-full">
                            <input type="date" id="report-end" value="${q.endDate}" class="border rounded-lg px-2 py-2 text-sm w-full">
                            <button id="btn-filter" class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 shadow-sm transition flex items-center justify-center">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <main id="report-content" class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6"></main>
        </div>
    `,document.getElementById("btn-filter").onclick=An,document.querySelectorAll(".tab-btn").forEach(a=>{a.onclick=()=>{q.currentTab=a.dataset.tab,io(),ns()}}),io()}function io(){document.querySelectorAll(".tab-btn").forEach(e=>{const t=e.dataset.tab===q.currentTab;e.className=t?"tab-btn flex-1 px-4 py-2 rounded-md text-sm font-bold bg-white text-indigo-600 shadow-sm transition-all whitespace-nowrap":"tab-btn flex-1 px-4 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-200 transition-all whitespace-nowrap"})}async function An(){q.startDate=document.getElementById("report-start").value,q.endDate=document.getElementById("report-end").value,q.selectedProfessional=document.getElementById("report-prof").value,q.selectedCostCenter=document.getElementById("report-cost").value,await rs()}async function rs(){const e=document.getElementById("report-content");e.innerHTML='<div class="flex justify-center py-20"><div class="loader"></div></div>';try{const t=Br(q.startDate,q.endDate,q.selectedProfessional,q.selectedCostCenter),a=q.selectedProfessional==="all"?null:q.selectedProfessional,s=new Date(q.startDate+"T00:00:00").toISOString(),r=new Date(q.endDate+"T23:59:59").toISOString(),o=Ro(u.establishmentId,s,r,a).catch(l=>[]),[n,i]=await Promise.all([t,o]);q.data=n,q.appointmentsData=Array.isArray(i)?i:[],ns()}catch(t){console.error(t),e.innerHTML=`
            <div class="bg-red-50 border-l-4 border-red-500 p-4 rounded text-red-700 text-center">
                <p class="font-bold">Erro ao carregar dados</p>
                <p class="text-sm">${h(t.message||"Verifique sua conexão.")}</p>
            </div>`}}function ns(){const e=document.getElementById("report-content");if(q.data)switch(q.currentTab){case"dashboards":Nn(e);break;case"appointments":qn(e);break;case"dre":Rn(e);break}}function Nn(e){const{dreSimple:t,charts:a}=q.data,s=t||{grossRevenue:0,netProfit:0,variableCosts:0},r=q.data.totalAppointments||0,o=r>0?s.grossRevenue/r:0;e.innerHTML=`
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 animate-fade-in">
            <div class="bg-white p-5 rounded-xl shadow-sm border-l-4 border-indigo-500">
                <p class="text-xs text-gray-500 font-bold uppercase">Faturamento</p>
                <p class="text-xl xl:text-2xl font-extrabold text-gray-800 mt-1">R$ ${s.grossRevenue.toFixed(2)}</p>
            </div>

            <div class="bg-white p-5 rounded-xl shadow-sm border-l-4 border-red-400">
                <p class="text-xs text-gray-500 font-bold uppercase">Comissões Pagas</p>
                <p class="text-xl xl:text-2xl font-extrabold text-red-600 mt-1">R$ ${s.variableCosts.toFixed(2)}</p>
            </div>

            <div class="bg-white p-5 rounded-xl shadow-sm border-l-4 border-green-500">
                <p class="text-xs text-gray-500 font-bold uppercase">Lucro Operacional</p>
                <p class="text-xl xl:text-2xl font-extrabold text-green-600 mt-1">R$ ${s.netProfit.toFixed(2)}</p>
                <p class="text-[10px] text-gray-400 mt-1">Faturamento (-) Comissões</p>
            </div>

            <div class="bg-white p-5 rounded-xl shadow-sm border-l-4 border-blue-500">
                <p class="text-xs text-gray-500 font-bold uppercase">Atendidos</p>
                <p class="text-xl xl:text-2xl font-extrabold text-blue-600 mt-1">${r}</p>
                <p class="text-[10px] text-gray-400 mt-1">Concluídos no período</p>
            </div>

            <div class="bg-white p-5 rounded-xl shadow-sm border-l-4 border-yellow-500">
                <p class="text-xs text-gray-500 font-bold uppercase">Ticket Médio</p>
                <p class="text-xl xl:text-2xl font-extrabold text-yellow-600 mt-1">R$ ${o.toFixed(2)}</p>
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
    `,Je("chart-monthly","bar","Receita Mensal",a.salesMonthly.labels,a.salesMonthly.data,mt[0]);const n=a.professionals.labels.map(l=>h(l));Je("chart-profs","doughnut","Total Vendas",n,a.professionals.data,mt),Je("chart-daily","line","Vendas Diárias",a.salesDaily.labels,a.salesDaily.data,mt[4]);const i=a.products.labels.map(l=>h(l));Je("chart-products","bar","Total Vendido",i,a.products.data,mt[1])}function qn(e){const t=q.appointmentsData,a=t.length;let s=0,r=0,o=0,n=0;const i={},l={};let d=new Date(q.startDate);const c=new Date(q.endDate);for(;d<=c;)i[d.toISOString().split("T")[0]]=0,d.setDate(d.getDate()+1);t.forEach(v=>{const p=parseFloat(v.totalAmount||v.price||0),x=(v.status||"").toLowerCase();let k=v.startTime?(v.startTime.toDate?v.startTime.toDate():new Date(v.startTime)).toISOString().split("T")[0]:"";const E=v.professionalName||"Sem Profissional";l[E]||(l[E]={name:E,count:0,value:0}),["cancelled","cancelado","no-show"].includes(x)?(r++,n+=p):(["completed","finalized","paid"].includes(x)&&s++,o+=p,k&&i.hasOwnProperty(k)&&i[k]++,l[E].count++,l[E].value+=p)});const m=Object.keys(i).sort(),b=m.map(v=>i[v]),f=Object.values(l).sort((v,p)=>p.count-v.count);e.innerHTML=`
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in">
            <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <p class="text-xs font-bold text-gray-500 uppercase">Total Agendamentos</p>
                <h3 class="text-3xl font-extrabold text-indigo-600 mt-1">${a-r}</h3>
                <p class="text-xs text-green-600 mt-1">${s} concluídos</p>
            </div>
            <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <p class="text-xs font-bold text-gray-500 uppercase">Valor Estimado</p>
                <h3 class="text-3xl font-extrabold text-gray-800 mt-1">R$ ${o.toLocaleString("pt-BR",{minimumFractionDigits:2})}</h3>
            </div>
            <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <p class="text-xs font-bold text-gray-500 uppercase">Cancelamentos</p>
                <h3 class="text-3xl font-extrabold text-red-500 mt-1">${r}</h3>
                <p class="text-xs text-red-400 mt-1">Perda: R$ ${n.toLocaleString("pt-BR",{minimumFractionDigits:2})}</p>
            </div>
        </div>

        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mt-6 animate-fade-in">
            <h3 class="font-bold text-gray-800 mb-4">Volume Diário</h3>
            <div class="h-64 w-full relative"><canvas id="dailyApptChart"></canvas></div>
        </div>

        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-6 animate-fade-in">
            <div class="flex justify-between items-center mb-4">
                <h3 class="font-bold text-gray-800">Performance por Profissional</h3>
            </div>
            <div class="overflow-x-auto">
                <table class="w-full text-sm">
                    <thead class="bg-gray-50 text-gray-500 font-semibold border-b">
                        <tr><th class="p-3 text-left">Nome</th><th class="p-3 text-center">Qtd.</th><th class="p-3 text-right">Valor Total</th></tr>
                    </thead>
                    <tbody class="divide-y">
                        ${f.map(v=>`
                            <tr>
                                <td class="p-3 text-gray-800 font-medium">${h(v.name)}</td>
                                <td class="p-3 text-center"><span class="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full text-xs font-bold">${v.count}</span></td>
                                <td class="p-3 text-right text-gray-600">R$ ${v.value.toLocaleString("pt-BR",{minimumFractionDigits:2})}</td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
            </div>
        </div>
    `,Je("dailyApptChart","line","Agendamentos",m.map(v=>v.split("-").reverse().slice(0,2).join("/")),b,"#4f46e5")}function Rn(e){const{dreFinancial:t}=q.data,a=Object.entries(t.revenues).map(([r,o])=>`
        <tr class="text-sm text-gray-600 bg-green-50/30 hover:bg-green-50 transition-colors">
            <td class="pl-8 py-2 border-l-4 border-transparent hover:border-green-400">${h(r)}</td>
            <td class="text-right pr-6 py-2 text-green-700 font-medium">R$ ${o.toFixed(2)}</td>
            <td class="text-right pr-4 text-xs text-gray-400">${t.totalRevenues>0?(o/t.totalRevenues*100).toFixed(1):0}%</td>
        </tr>
    `).join(""),s=Object.entries(t.expenses).map(([r,o])=>`
        <tr class="text-sm text-gray-600 bg-red-50/30 hover:bg-red-50 transition-colors">
            <td class="pl-8 py-2 border-l-4 border-transparent hover:border-red-400">${h(r)}</td>
            <td class="text-right pr-6 py-2 text-red-600 font-medium">- R$ ${o.toFixed(2)}</td>
            <td class="text-right pr-4 text-xs text-gray-400">${t.totalRevenues>0?(o/t.totalRevenues*100).toFixed(1):0}%</td>
        </tr>
    `).join("");e.innerHTML=`
        <div class="max-w-4xl mx-auto bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden animate-fade-in mb-10">
            <div class="bg-gray-900 text-white p-6 text-center relative overflow-hidden">
                <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                <h2 class="text-xl font-bold uppercase tracking-widest">DRE Gerencial Detalhado</h2>
                <p class="text-sm opacity-75 mt-1">
                    ${new Date(q.startDate).toLocaleDateString("pt-BR")} até ${new Date(q.endDate).toLocaleDateString("pt-BR")}
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
                    ${s||'<tr><td colspan="3" class="pl-8 py-3 text-sm text-gray-400 italic">Nenhuma despesa lançada no financeiro.</td></tr>'}

                    <tr class="font-extrabold text-white ${t.netResult>=0?"bg-green-600":"bg-red-600"} text-lg border-t-4 border-white shadow-inner">
                        <td class="p-6">3. (=) RESULTADO DO EXERCÍCIO</td>
                        <td class="p-6 text-right">R$ ${t.netResult.toFixed(2)}</td>
                        <td class="p-6 text-right opacity-90">
                            ${t.totalRevenues>0?(t.netResult/t.totalRevenues*100).toFixed(1):0}%
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    `}function Je(e,t,a,s,r,o){const n=document.getElementById(e);if(!n)return;const i=n.getContext("2d");Xt[e]&&Xt[e].destroy();const l={type:t,data:{labels:s,datasets:[{label:a,data:r,backgroundColor:Array.isArray(o)?o:t==="line"?"rgba(79, 70, 229, 0.1)":o,borderColor:Array.isArray(o)?"#fff":o,borderWidth:2,fill:t==="line",tension:.3,borderRadius:t==="bar"?4:0,pointBackgroundColor:"#fff",pointBorderColor:o,pointHoverBackgroundColor:o}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:t==="doughnut",position:"bottom"},tooltip:{backgroundColor:"rgba(17, 24, 39, 0.9)",padding:10,cornerRadius:8,callbacks:{label:d=>{let c=d.dataset.label||"";return c&&(c+=": "),d.parsed.y!==null?c+=new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(d.parsed.y):c+=d.raw,c}}}},scales:t==="doughnut"?{}:{y:{beginAtZero:!0,grid:{color:"#f3f4f6"},ticks:{font:{size:11}}},x:{grid:{display:!1},ticks:{font:{size:11}}}}}};Xt[e]=new Chart(i,l)}const _t=(e,t="products")=>w(`/api/${t}/categories/${e}`),is=(e,t="products")=>w(`/api/${t}/categories`,{method:"POST",body:JSON.stringify(e)}),ls=(e,t="products")=>w(`/api/${t}/categories/${e}`,{method:"DELETE"}),Fn="audit_logs",Fe=async(e,t,a,s,r,o=null)=>{try{if(!t)return;await Mo(ue(U,Fn),{establishmentId:e,userId:t.uid,userName:t.name||t.email||"Utilizador",module:a,action:s,description:r,details:o,timestamp:new Date})}catch(n){console.error("Falha silenciosa ao registar log:",n)}},fe=document.getElementById("content");let ne=null,Ye="services",xe="all";function je(){const e=V.currentUser;return e?{uid:e.uid,name:e.displayName||e.email}:{uid:"unknown",name:"Desconhecido"}}async function jn(e){e.preventDefault();const a=e.target.closest("#categoryForm").querySelector("#categoryName"),s=a.value;if(s)try{await is({establishmentId:u.establishmentId,name:s},"services"),Fe(u.establishmentId,je(),"Categorias (Serviços)","Criou",`Criou categoria: ${s}`),a.value="",g("Sucesso","Categoria criada!","success"),await Ba(),await dt()}catch(r){g("Erro",`Não foi possível criar a categoria: ${r.message}`,"error")}}async function Hn(e){if(await j("Apagar Categoria","Tem a certeza? Os serviços nesta categoria ficarão sem categoria."))try{await ls(e,"services"),Fe(u.establishmentId,je(),"Categorias (Serviços)","Excluiu",`Excluiu uma categoria (ID: ${e})`),g("Sucesso","Categoria apagada.","success"),await Ba(),await dt()}catch{g("Erro","Não foi possível apagar a categoria.","error")}}async function Ba(){const e=document.getElementById("categoryList");if(e){e.innerHTML='<div class="loader mx-auto my-4"></div>';try{const t=await _t(u.establishmentId,"services");u.serviceCategories=t,e.innerHTML="",t.length>0?e.innerHTML=t.map(a=>`
                <div class="flex justify-between items-center bg-gray-100 p-2 rounded">
                    <span>${h(a.name)}</span>
                    <button data-action="delete-category" data-id="${a.id}" class="text-red-500 hover:text-red-700 font-semibold text-sm">Apagar</button>
                </div>`).join(""):e.innerHTML='<p class="text-center text-gray-500">Nenhuma categoria criada.</p>'}catch{e.innerHTML='<p class="text-red-500 text-center">Erro ao carregar categorias.</p>'}}}function On(){Y({title:"Gerir Categorias de Serviços",contentHTML:`
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
    `,maxWidth:"max-w-xl"});const t=document.getElementById("genericModal");if(t){const a=t.querySelector("#categoryForm");a&&(a.addEventListener("submit",jn),t.addEventListener("click",s=>{const r=s.target.closest('button[data-action="delete-category"]');r&&(s.preventDefault(),Hn(r.dataset.id))}))}Ba()}async function zn(e){e.preventDefault();const t=e.target.closest("#serviceModal"),a=t.querySelector("#serviceId").value,s={},r=t.querySelector('input[name="commissionType"]:checked').value;r==="custom"&&t.querySelectorAll(".professional-commission-row").forEach(n=>{const i=n.dataset.profId;if(n.querySelector('input[type="checkbox"]').checked){const d=parseFloat(n.querySelector('input[type="number"]').value);s[i]=isNaN(d)?0:d}});const o={establishmentId:u.establishmentId,name:t.querySelector("#serviceName").value,price:parseFloat(t.querySelector("#servicePrice").value),duration:parseInt(t.querySelector("#serviceDurationMinutes").value,10),bufferTime:parseInt(t.querySelector("#serviceBufferTimeMinutes").value,10)||0,categoryId:t.querySelector("#serviceCategory").value||null,commissionRate:parseFloat(t.querySelector("#serviceCommissionRate").value)||0,active:t.querySelector("#serviceStatus").value==="true",photo:t.querySelector("#servicePhotoBase64").value,notes:t.querySelector("#serviceNotes").value,commissionType:r,professionalCommissions:s};try{a?(await dr(a,o),Fe(u.establishmentId,je(),"Serviços","Editou",`Editou o serviço: ${o.name}`)):(await Ho(o),Fe(u.establishmentId,je(),"Serviços","Criou",`Criou novo serviço: ${o.name}`)),document.getElementById("serviceModal").style.display="none",g("Sucesso",`Serviço ${a?"atualizado":"adicionado"} com sucesso!`,"success"),await dt()}catch(n){g("Erro",n.message,"error")}}function lo(e=null){const t=document.getElementById("serviceModal"),a=u.serviceCategories||[],s=e?.duration||0,r=e?.bufferTime||0,o=h(e?.name||""),n=h(e?.notes||""),i=e?o:"Novo Serviço",l=a.map($=>`<option value="${$.id}" ${e?.categoryId===$.id?"selected":""}>${h($.name)}</option>`).join("");t.innerHTML=`
    <div class="modal-content max-w-3xl overflow-y-auto max-h-[85vh] my-auto">
        <form id="serviceForm">
            <input type="hidden" id="serviceId" value="${e?.id||""}">
            <input type="hidden" id="servicePhotoBase64" value="${e?.photo||""}">
            
            <div class="flex justify-between items-center mb-4">
                <h2 id="serviceModalTitle" class="text-2xl font-bold text-gray-800">${i}</h2>
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
                        <input type="text" id="serviceName" value="${o}" class="mt-1 w-full p-2 border rounded-md" required>
                    </div>
                    <div>
                        <label for="servicePrice" class="block text-sm font-medium text-gray-700">Preço (a partir de:)</label>
                        <input type="number" id="servicePrice" step="0.01" value="${e?.price||""}" class="mt-1 w-full p-2 border rounded-md" required>
                    </div>
                    <div>
                        <label for="serviceCategory" class="block text-sm font-medium text-gray-700">Categoria</label>
                        <select id="serviceCategory" class="mt-1 w-full p-2 border rounded-md bg-white">
                            <option value="">Sem Categoria</option>
                            ${l}
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
                    <textarea id="serviceNotes" rows="3" class="mt-1 w-full p-2 border rounded-md">${n}</textarea>
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
    </div>`,t.style.display="flex",t.addEventListener("click",async $=>{const L=$.target.closest("button[data-action]");if(!L)return;const R=L.dataset.action,O=L.dataset.id;if(R==="close-modal"&&(t.style.display="none"),R==="delete-service"){if(!O)return;if(t.style.display="none",await j("Apagar Serviço","Tem a certeza que deseja apagar este serviço?"))try{const B=u.services.find(N=>N.id===O)?.name||"Desconhecido";await cr(O),Fe(u.establishmentId,je(),"Serviços","Excluiu",`Excluiu o serviço: ${B}`),g("Sucesso","Serviço apagado com sucesso!","success"),await dt()}catch(B){g("Erro",`Não foi possível apagar o serviço: ${B.message}`,"error")}else t.style.display="flex"}});const d=t.querySelectorAll(".tab-btn"),c=t.querySelectorAll(".tab-content");d.forEach($=>{$.addEventListener("click",()=>{d.forEach(L=>{L.classList.remove("border-indigo-500","text-indigo-600"),L.classList.add("border-transparent","text-gray-500","hover:text-gray-700","hover:border-gray-300")}),$.classList.add("border-indigo-500","text-indigo-600"),$.classList.remove("border-transparent","text-gray-500","hover:text-gray-700","hover:border-gray-300"),c.forEach(L=>L.classList.add("hidden")),document.getElementById(`tab-content-${$.dataset.tab}`).classList.remove("hidden")})});const m=t.querySelectorAll('input[name="commissionType"]'),b=document.getElementById("defaultCommissionRateContainer"),f=document.getElementById("professionalCommissionsContainer");function v(){const $=t.querySelector('input[name="commissionType"]:checked').value;b&&(b.style.display=$==="default"?"block":"none"),f&&(f.style.display=$==="custom"?"block":"none")}m.forEach($=>$.addEventListener("change",v));const p=document.getElementById("professionalCommissionsList");p&&(p.innerHTML=(u.professionals||[]).map($=>{const L=e?.professionalCommissions?.[$.id]!==void 0,R=e?.professionalCommissions?.[$.id]||0;return`
                <div class="professional-commission-row flex items-center justify-between p-2 rounded-md ${L?"bg-blue-50":""}" data-prof-id="${$.id}">
                    <label class="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" ${L?"checked":""} class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                        <img src="${$.photo||`https://placehold.co/40x40/E2E8F0/4A5568?text=${h($.name.charAt(0))}`}" class="w-8 h-8 rounded-full object-cover">
                        <span class="text-sm font-medium">${h($.name)}</span>
                    </label>
                    <div class="flex items-center gap-1">
                        <input type="number" value="${R}" class="w-20 p-1 border rounded-md text-sm text-center" ${L?"":"disabled"}>
                        <span class="text-sm font-semibold">%</span>
                    </div>
                </div>
            `}).join(""),p.querySelectorAll('input[type="checkbox"]').forEach($=>{$.addEventListener("change",L=>{const R=L.target.closest(".professional-commission-row");R.querySelector('input[type="number"]').disabled=!L.target.checked,R.classList.toggle("bg-blue-50",L.target.checked)})})),v();const x=t.querySelector("#serviceForm"),k=t.querySelector("#servicePhotoInput"),E=t.querySelector("#servicePhotoPreview"),S=t.querySelector("#servicePhotoBase64");t.querySelector("#servicePhotoButton").addEventListener("click",()=>k.click()),k.onchange=async()=>{const $=k.files[0];if($){E.src="https://placehold.co/128x128/E2E8F0/4A5568?text=...";try{const L=await Yo($,800,800,.8),O=L.length*3/4,T=1e3*1024;if(O>T)throw new Error("A imagem é muito grande mesmo após a compressão.");E.src=L,S.value=L}catch(L){console.error("Erro ao processar imagem:",L),g("Erro de Imagem",L.message||"Não foi possível processar a imagem.","error"),E.src=e?.photo||"https://placehold.co/128x128/E2E8F0/4A5568?text=Foto",S.value=e?.photo||"",k.value=""}}},x.addEventListener("submit",zn)}function Te(){const e=document.getElementById("servicesList");if(!e)return;const t=document.getElementById("serviceSearchInput")?.value.toLowerCase()||"",a=document.getElementById("serviceCategoryFilter")?.value||"all",s=new Map((u.serviceCategories||[]).map(o=>[o.id,o.name]));let r=(u.services||[]).filter(Boolean);if(xe!=="all"){const o=xe==="active";r=r.filter(n=>n.active!==!1===o)}r=r.filter(o=>{const n=o.name.toLowerCase().includes(t),i=a==="all"||o.categoryId===a;return n&&i}),e.innerHTML="",r.length>0?r.forEach(o=>{const n=document.createElement("div"),i=JSON.stringify(o).replace(/'/g,"&apos;");n.className=`service-card bg-white rounded-lg shadow-md flex overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-lg hover:bg-gray-50 ${o.active!==!1?"opacity-100":"opacity-50 bg-gray-100"} sm:flex-col`,n.dataset.action="edit-service",n.dataset.service=i;const l=h(o.name),d=h(s.get(o.categoryId)||"N/A"),c=o.photo||`https://placehold.co/200x200/E2E8F0/4A5568?text=${encodeURIComponent(o.name.charAt(0))}`;n.innerHTML=`
                <img src="${c}" alt="Imagem de ${l}" class="w-20 h-20 object-cover flex-shrink-0 sm:w-full sm:h-24">
                
                <div class="p-3 flex flex-col flex-grow justify-between w-full">
                    <div class="flex justify-between items-start mb-1">
                        <h3 class="text-sm font-bold text-gray-900 flex-1 text-left truncate pr-2">${l}</h3>
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
                            <p class="text-xs text-gray-500 text-left mb-1 truncate">Categoria: ${d}</p>
                            <p class="text-xs text-gray-500 text-left">Duração: ${o.duration} min (+${o.bufferTime||0} min extra)</p>
                        </div>
                        <div class="flex justify-between items-center sm:hidden mt-2">
                            <p class="text-lg font-bold text-indigo-600 text-left">R$ ${o.price.toFixed(2)}</p>
                            <p class="text-xs text-gray-500 text-right">${o.duration} min</p>
                        </div>
                    </div>
                </div>`,e.appendChild(n)}):e.innerHTML='<p class="col-span-full text-center text-gray-500 py-10">Nenhum serviço encontrado.</p>'}function Da(){const e={active:0,inactive:0,total:0},t=(u.services||[]).filter(Boolean);t.forEach(n=>{n.active===!1?e.inactive++:e.active++}),e.total=t.length;const a=document.getElementById("indicator-total"),s=document.getElementById("indicator-active"),r=document.getElementById("indicator-inactive"),o=document.getElementById("indicator-popular");a&&(a.textContent=e.total),s&&(s.textContent=e.active),r&&(r.textContent=e.inactive),o&&(u.mostPopularService&&u.mostPopularService.name!=="N/A"?(o.textContent=h(u.mostPopularService.name),o.closest(".indicator-card").title=`${u.mostPopularService.name} (${u.mostPopularService.count} agendamentos)`):(o.textContent="N/A",o.closest(".indicator-card").title="Nenhum serviço agendado ainda"))}function Vn(){const e=document.getElementById("services-content-container");e.innerHTML=`
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
    `;const t=document.getElementById("serviceCategoryFilter");t&&(t.innerHTML='<option value="all">Todas as categorias</option>',(u.serviceCategories||[]).forEach(a=>t.innerHTML+=`<option value="${a.id}">${h(a.name)}</option>`)),Da(),Te()}function Un(){const e=document.getElementById("services-content-container");e.innerHTML=`
        <div class="p-8 text-center">
            <h3 class="text-xl font-bold text-gray-700">Relatórios de Serviços</h3>
            <p class="text-gray-500 mt-2">Em breve, aqui poderás ver relatórios detalhados sobre os teus serviços mais rentáveis, mais agendados e muito mais.</p>
        </div>
    `}async function dt(){const e=document.getElementById("services-content-container");if(e){const t=e.querySelector(".loader");t&&(t.style.display="block")}try{const[t,a,s,r]=await Promise.all([Se(u.establishmentId),Z(u.establishmentId),_t(u.establishmentId,"services"),mr(u.establishmentId)]);u.services=(t||[]).filter(Boolean),u.professionals=(a||[]).filter(Boolean),u.serviceCategories=(s||[]).filter(Boolean),u.mostPopularService=r||{name:"N/A",count:0},u.services.forEach(o=>{o.active===void 0&&(o.active=!0)}),ds(Ye)}catch(t){e&&(e.innerHTML='<p class="text-red-500 col-span-full text-center py-10">Erro ao carregar dados. Verifique a conexão com o servidor.</p>'),g("Erro",`Não foi possível carregar os dados: ${t.message}`,"error")}}function ds(e){if(document.getElementById("services-content-container")){if(Ye===e&&document.getElementById("services-content-container").children.length>1){Ye==="services"&&(Da(),Te());return}Ye=e,xe="all",document.querySelectorAll("#services-tabs button.tab-button").forEach(t=>{const a=t.dataset.view===e;t.classList.toggle("border-indigo-500",a),t.classList.toggle("text-indigo-600",a),t.classList.toggle("border-transparent",!a),t.classList.toggle("text-gray-500",!a)}),e==="services"?Vn():e==="reports"&&Un()}}function _n(){ne&&(fe.removeEventListener("click",ne),fe.removeEventListener("input",ne),fe.removeEventListener("change",ne)),ne=async e=>{const t=e.target;if(t.closest('[data-action="toggle-service-status"]')){e.stopPropagation();const r=t.closest('[data-action="toggle-service-status"]'),o=r.dataset.id,n=r.checked;try{await ur(o,n);const i=u.services.findIndex(l=>l.id===o);i>-1&&(u.services[i].active=n),Fe(u.establishmentId,je(),"Serviços","Atualizou Status",`Alterou status do serviço (ID: ${o}) para ${n?"Ativo":"Inativo"}`),Te(),Da()}catch(i){g("Erro",`Não foi possível atualizar o status: ${i.message}`,"error"),r.checked=!n,Te()}return}const a=t.closest("button[data-action], button[data-view], .indicator-card[data-action], .service-card[data-action]");if(t.id==="serviceSearchInput"||t.id==="serviceCategoryFilter"){Te();return}if(!a)return;if(a.hasAttribute("data-view")){ds(a.dataset.view);return}switch(a.dataset.action){case"new-service":lo();break;case"edit-service":const r=JSON.parse(a.dataset.service);lo(r);break;case"manage-categories":On();break;case"filter-service":const o=a.dataset.filterType;if(o==="popular")return;xe=o==="total"?"all":o,document.querySelectorAll('.indicator-card[data-action="filter-service"]').forEach(n=>{const i=n.dataset.filterType,d=i===xe||i==="total"&&xe==="all";n.classList.toggle("ring-2",d),n.classList.toggle("ring-indigo-500",d),n.classList.toggle("shadow-lg",d)}),Te();break}},fe.addEventListener("click",ne),fe.addEventListener("input",ne),fe.addEventListener("change",ne)}async function Jn(){fe.innerHTML=`
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
        </section>`,_n();try{(!u.professionals||u.professionals.length===0)&&(u.professionals=await Z(u.establishmentId)||[])}catch(e){console.error("Falha ao carregar profissionais:",e),g("Erro","Não foi possível carregar a lista de profissionais.","error"),u.professionals=[]}Ye="services",xe="all",await dt()}const Jt="suppliers",Ma="purchases",cs="financial_payables",Aa=async e=>{try{const t=Ft(ue(U,Jt),at("establishmentId","==",e)),a=await ka(t),s=[];return a.forEach(r=>{s.push({id:r.id,...r.data()})}),s}catch(t){throw console.error("Erro ao buscar fornecedores:",t),t}},Wn=async e=>{try{return{id:(await Mo(ue(U,Jt),e)).id,...e}}catch(t){throw console.error("Erro ao criar fornecedor:",t),t}},Gn=async(e,t)=>{try{const a=ce(U,Jt,e);return await wa(a,t),{id:e,...t}}catch(a){throw console.error("Erro ao atualizar fornecedor:",a),a}},Yn=async e=>{try{const t=ce(U,Jt,e);return await Fs(t),!0}catch(t){throw console.error("Erro ao excluir fornecedor:",t),t}},Qn=async(e,t=null)=>{try{const a=No(U),s=ce(ue(U,Ma)),r={...e,createdAt:Va()};if(a.set(s,r),t&&t.defaultNatureId&&t.defaultCostCenterId){const o=ce(ue(U,cs)),n=new Date().toISOString().split("T")[0],i={establishmentId:e.establishmentId,description:`Compra - ${e.supplierName}`,amount:parseFloat(e.totalAmount),dueDate:n,naturezaId:t.defaultNatureId,centroDeCustoId:t.defaultCostCenterId,notes:`Gerado automaticamente pelo Pedido de Compra. Itens: ${e.items.length}`,status:"pending",paymentDate:null,purchaseId:s.id,createdAt:Va()};a.set(o,i)}return await a.commit(),{id:s.id,...r}}catch(a){throw console.error("Erro ao registrar compra com integração:",a),a}},Xn=async(e,t)=>{try{const a=No(U),s=ce(U,Ma,e);a.delete(s);const r=Ft(ue(U,cs),at("purchaseId","==",e),at("establishmentId","==",t));return(await ka(r)).forEach(n=>{a.delete(n.ref)}),await a.commit(),!0}catch(a){throw console.error("Erro ao excluir compra e financeiro:",a),a}},Zn=async e=>{try{const t=Ft(ue(U,Ma),at("establishmentId","==",e),Ao("createdAt","desc")),a=await ka(t),s=[];return a.forEach(r=>{s.push({id:r.id,...r.data()})}),s}catch(t){throw console.error("Erro ao buscar histórico de compras:",t),t}},pe=document.getElementById("content");let ie=null,Qe="products",oe="all";async function Kn(e){e.preventDefault();const a=e.target.closest("#categoryForm").querySelector("#categoryName"),s=a.value;if(s)try{await is({establishmentId:u.establishmentId,name:s},"products"),a.value="",g("Sucesso","Categoria de produto criada!","success"),await Na(),await ct()}catch(r){g("Erro",`Não foi possível criar a categoria: ${r.message}`,"error")}}async function ei(e){if(await j("Apagar Categoria","Tem a certeza? Os produtos nesta categoria ficarão sem categoria."))try{await ls(e,"products"),g("Sucesso","Categoria de produto apagada.","success"),await Na(),await ct()}catch{g("Erro","Não foi possível apagar a categoria.","error")}}async function Na(){const e=document.getElementById("categoryList");if(e){e.innerHTML='<div class="loader mx-auto my-4"></div>';try{const t=await _t(u.establishmentId,"products");u.categories=t,e.innerHTML="",t.length>0?e.innerHTML=t.map(a=>`
                <div class="flex justify-between items-center bg-gray-100 p-2 rounded">
                    <span>${h(a.name)}</span>
                    <button data-action="delete-category" data-id="${a.id}" class="text-red-500 hover:text-red-700 font-semibold text-sm">Apagar</button>
                </div>`).join(""):e.innerHTML='<p class="text-center text-gray-500">Nenhuma categoria encontrada.</p>'}catch{e.innerHTML='<p class="text-red-500 text-center">Erro ao carregar categorias.</p>'}}}function ti(){Y({title:"Gerir Categorias de Produtos",contentHTML:`
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
    `,maxWidth:"max-w-xl"});const t=document.getElementById("genericModal");if(t){const a=t.querySelector("#categoryForm");a&&(a.addEventListener("submit",Kn),t.addEventListener("click",s=>{const r=s.target.closest('button[data-action="delete-category"]');r&&ei(r.dataset.id)}))}Na()}async function ai(e){if(!e)return;if(await j("Apagar Produto","Tem a certeza que deseja apagar este produto? Esta ação não pode ser revertida."))try{await gr(e),g("Sucesso","Produto apagado com sucesso!","success"),await ct()}catch(a){g("Erro",`Não foi possível apagar o produto: ${a.message}`,"error")}}async function oi(e){const t=e.querySelector("#productId").value,a=parseInt(e.querySelector("#productCurrentStock").value),s=parseInt(e.querySelector("#productMinStock").value),r=parseInt(e.querySelector("#productMaxStock").value),o=e.querySelectorAll("#selectedSuppliersList .selected-supplier-item"),n=Array.from(o).map(l=>l.dataset.id),i={establishmentId:u.establishmentId,name:e.querySelector("#productName").value,price:parseFloat(e.querySelector("#productPrice").value),costPrice:parseFloat(e.querySelector("#productCostPrice").value)||0,commissionRate:parseFloat(e.querySelector("#productCommissionRate").value)||0,currentStock:isNaN(a)?0:a,minStock:isNaN(s)?0:s,maxStock:isNaN(r)?0:r,categoryId:e.querySelector("#productCategory").value||null,photo:e.querySelector("#productPhotoBase64").value,supplierIds:n};try{t?await pr(t,i):await Oo(i),document.getElementById("productModal").style.display="none",g("Sucesso",`Produto ${t?"atualizado":"adicionado"} com sucesso!`,"success"),await ct()}catch(l){throw new Error(l.message)}}function co(e,t=800,a=800,s="image/jpeg",r=.8){return new Promise((o,n)=>{if(!e.type.startsWith("image/"))return n(new Error("O ficheiro selecionado não é uma imagem."));const i=new FileReader;i.onload=l=>{const d=new Image;d.onload=()=>{let c=d.width,m=d.height;c>m?c>t&&(m*=t/c,c=t):m>a&&(c*=a/m,m=a);const b=document.createElement("canvas");b.width=c,b.height=m,b.getContext("2d").drawImage(d,0,0,c,m);const v=b.toDataURL(s,r);o(v)},d.onerror=c=>n(new Error("Não foi possível carregar a imagem.")),d.src=l.target.result},i.onerror=l=>n(new Error("Não foi possível ler o ficheiro.")),i.readAsDataURL(e)})}function uo(e=null){const t=document.getElementById("productModal"),a=u.categories||[],s=u.suppliers||[],r=a.map(T=>`<option value="${T.id}" ${e?.categoryId===T.id?"selected":""}>${h(T.name)}</option>`).join("");let o=new Set(e?.supplierIds||[]);const n=h(e?.name||""),i=e?.price||"",l=e?.costPrice||"",d=e?.commissionRate||"",c=e?.minStock||0,m=e?.maxStock||0,b=e?.currentStock||0,f=e?n:"Novo Produto";t.innerHTML=`
    <div class="modal-content max-w-3xl overflow-y-auto max-h-[90vh]">
        <form id="productForm">
            <input type="hidden" id="productId" value="${e?.id||""}">
            <input type="hidden" id="productPhotoBase64" value="${e?.photo||""}">
            
            <div class="flex justify-between items-center mb-4">
                <h2 id="productModalTitle" class="text-2xl font-bold text-gray-800">${f}</h2>
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
                            <div class="form-group sm:col-span-2"><label for="productName">Nome do Produto</label><input type="text" id="productName" value="${n}" required class="mt-1 w-full p-2 border rounded-md"></div>
                            
                            <div class="form-group sm:col-span-2"><label for="productCategory">Categoria</label><select id="productCategory" class="mt-1 w-full p-2 border rounded-md bg-white"><option value="">Sem categoria</option>${r}</select></div>
                            
                            <div class="form-group"><label for="productPrice">Preço Venda (R$)</label><input type="number" id="productPrice" step="0.01" value="${i}" required class="mt-1 w-full p-2 border rounded-md"></div>
                            
                            <div class="form-group"><label for="productCostPrice">Preço de Custo Médio (R$)</label><input type="number" id="productCostPrice" step="0.01" value="${l}" class="mt-1 w-full p-2 border rounded-md" placeholder="0.00"></div>
                            
                            <div class="form-group"><label for="productCommissionRate">Comissão (%)</label><input type="number" id="productCommissionRate" placeholder="Ex: 10" value="${d}" class="mt-1 w-full p-2 border rounded-md"></div>
                        </div></div>
                    </div>
                    <div class="mt-6 pt-6 border-t"><h3 class="text-lg font-semibold text-gray-700 text-left mb-4">Controlo de Stock (Definições)</h3><div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div class="form-group"><label for="productCurrentStock">Atual</label><input type="number" id="productCurrentStock" value="${b}" readonly class="mt-1 w-full p-2 border rounded-md bg-gray-100"></div>
                        <div class="form-group"><label for="productMinStock">Mínimo (Alerta)</label><input type="number" id="productMinStock" value="${c}" class="mt-1 w-full p-2 border rounded-md"></div>
                        <div class="form-group"><label for="productMaxStock">Máximo</label><input type="number" id="productMaxStock" value="${m}" class="mt-1 w-full p-2 border rounded-md"></div>
                    </div></div>
                </div>

                <div id="tab-content-stock" class="tab-content hidden space-y-6">
                    <p class="text-sm text-gray-600">Use esta secção para registar entradas (compras) ou saídas (perdas) manuais. O estoque atual é <strong id="currentStockDisplay" class="text-lg">${b}</strong>.</p>
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
    </div>`;const v=t.querySelector("#productCategory"),p=t.querySelector("#productPhotoInput");t.querySelector("#productPhotoButton").addEventListener("click",()=>p.click()),v.innerHTML='<option value="">Sem categoria</option>'+(u.categories||[]).map(T=>`<option value="${T.id}" ${e?.categoryId===T.id?"selected":""}>${h(T.name)}</option>`).join(""),e&&(v.value=e.categoryId||"");const x=t.querySelector("#productPhotoPreview");t.querySelector("#productPhotoBase64");const k=e?.photo||"https://placehold.co/128x128/E2E8F0/4A5568?text=Foto",E=e?.photo||"";p.onchange=async()=>{const T=p.files[0];if(T){x.src="https://placehold.co/128x128/E2E8F0/4A5568?text=...";try{const B=await co(T,800,800,"image/jpeg",.8),F=B.length*3/4,z=1e3*1024;if(F>z)throw new Error("A imagem é muito grande mesmo após a compressão.");preview.src=B,base64Input.value=B}catch(B){console.error("Erro ao processar imagem:",B),g("Erro de Imagem",B.message||"Não foi possível processar a imagem.","error"),preview.src=k,base64Input.value=E,O.value=""}}};const S=t.cloneNode(!0);t.parentNode.replaceChild(S,t);const $=()=>{const T=S.querySelector("#modalSupplierSearch"),B=S.querySelector("#supplierSearchResults"),N=S.querySelector("#selectedSuppliersList"),F=T.value.toLowerCase();if(F.length>0){const z=s.filter(A=>A.name.toLowerCase().includes(F)&&!o.has(A.id));z.length>0?(B.classList.remove("hidden"),B.innerHTML=z.map(A=>`
                    <div class="p-2 hover:bg-indigo-50 cursor-pointer border-b last:border-0 text-sm flex justify-between items-center" data-add-supplier="${A.id}">
                        <span class="font-medium">${h(A.name)}</span>
                        <span class="text-indigo-600 text-xs">+ Adicionar</span>
                    </div>
                `).join("")):(B.classList.remove("hidden"),B.innerHTML='<div class="p-2 text-xs text-gray-500 text-center">Nenhum resultado disponível.</div>')}else B.classList.add("hidden");o.size>0?(N.innerHTML="",o.forEach(z=>{const A=s.find(Q=>Q.id===z);A&&(N.innerHTML+=`
                        <div class="selected-supplier-item flex items-center justify-between bg-white border p-2 rounded shadow-sm" data-id="${A.id}">
                            <div class="text-sm">
                                <p class="font-bold text-gray-800">${h(A.name)}</p>
                                <p class="text-xs text-gray-500">${h(A.contactName||"")} - ${h(A.phone||"")}</p>
                            </div>
                            <button type="button" class="text-red-500 hover:text-red-700 p-1" data-remove-supplier="${A.id}" title="Remover">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </div>
                    `)})):N.innerHTML='<p class="text-xs text-gray-400 text-center py-2">Nenhum fornecedor selecionado.</p>'};S.querySelector("#modalSupplierSearch").addEventListener("input",$),S.addEventListener("click",T=>{const B=T.target.closest("[data-add-supplier]");if(B){const F=B.dataset.addSupplier;o.add(F),S.querySelector("#modalSupplierSearch").value="",$()}const N=T.target.closest("[data-remove-supplier]");if(N){const F=N.dataset.removeSupplier;o.delete(F),$()}}),$(),S.addEventListener("click",async T=>{const B=T.target.closest("button[data-action]");if(!B)return;const N=B.dataset.action,F=S.querySelector("#productId").value;if(N==="close-modal"&&(S.style.display="none"),N==="delete-product"){if(!F)return;S.style.display="none",await ai(F)}if(N==="save-product-modal"){const z=S.querySelector("#productForm");if(z){if(!z.querySelector("#productName").value||!z.querySelector("#productPrice").value){g("Erro","Nome e Preço de Venda são obrigatórios.","error");return}const A=B.closest('button[data-action="save-product-modal"]');A.disabled=!0,A.textContent="A salvar...";try{await oi(z)}catch(Q){g("Erro",`Falha ao salvar: ${Q.message}`,"error"),A.disabled=!1,A.textContent="Salvar Alterações"}}}if(N==="adjust-stock-modal"){T.preventDefault();const z=S.querySelector("#stockAdjustmentAmount"),A=S.querySelector("#stockAdjustmentReason"),Q=parseInt(z.value,10),$e=parseInt(B.dataset.change,10);if(!Q||Q<=0){g("Erro","Por favor, insira uma quantidade válida.","error");return}const Yt=Q*$e,Ts=A.value||(Yt>0?"Entrada manual":"Saída manual");try{await br(F,{change:Yt,reason:Ts});const Oe=u.products.findIndex(ze=>ze.id===F);if(Oe>-1){const ze=u.products[Oe].currentStock+Yt;u.products[Oe].currentStock=ze,S.querySelector("#currentStockDisplay").textContent=ze,S.querySelector("#productCurrentStock").value=ze,z.value="",A.value="",g("Sucesso","Estoque atualizado!","success"),qa(),st()}}catch(Oe){g("Erro de Stock",Oe.message,"error")}}});const L=S.querySelectorAll(".tab-btn"),R=S.querySelectorAll(".tab-content");L.forEach(T=>{T.addEventListener("click",B=>{B.preventDefault(),L.forEach(N=>{N.classList.remove("border-indigo-500","text-indigo-600"),N.classList.add("border-transparent","text-gray-500","hover:text-gray-700","hover:border-gray-300")}),T.classList.add("border-indigo-500","text-indigo-600"),T.classList.remove("border-transparent","text-gray-500","hover:text-gray-700","hover:border-gray-300"),R.forEach(N=>N.classList.add("hidden")),document.getElementById(`tab-content-${T.dataset.tab}`).classList.remove("hidden")})});const O=S.querySelector("#productPhotoInput");S.querySelector("#productPhotoButton").addEventListener("click",()=>O.click()),O.onchange=async()=>{const T=O.files[0];if(!T)return;const B=S.querySelector("#productPhotoPreview"),N=S.querySelector("#productPhotoBase64");B.src="https://placehold.co/128x128/E2E8F0/4A5568?text=...";try{const F=await co(T,800,800,"image/jpeg",.8),A=F.length*3/4,Q=1e3*1024;if(A>Q)throw new Error("A imagem é muito grande mesmo após a compressão.");B.src=F,N.value=F}catch(F){console.error("Erro ao processar imagem:",F),g("Erro de Imagem",F.message||"Não foi possível processar a imagem.","error"),B.src=k,N.value=E,O.value=""}},S.style.display="flex"}function si(){const e=document.getElementById("products-content-container");e.innerHTML=`
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
    `;const t=document.getElementById("productCategoryFilter");t&&(t.innerHTML='<option value="all">Todas as categorias</option>',(u.categories||[]).forEach(a=>t.innerHTML+=`<option value="${a.id}">${h(a.name)}</option>`)),qa(),st()}function ri(){const e=document.getElementById("products-content-container"),t=new Date().toISOString().split("T")[0],a=new Date;a.setDate(a.getDate()-30);const s=a.toISOString().split("T")[0];e.innerHTML=`
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
        </div>`;const r=document.getElementById("productFilterReport"),o=document.getElementById("categoryFilterReport");r&&u.products&&(r.innerHTML+=u.products.map(n=>`<option value="${n.id}">${h(n.name)}</option>`).join("")),o&&u.categories&&(o.innerHTML+=u.categories.map(n=>`<option value="${n.id}">${h(n.name)}</option>`).join(""))}async function ni(){const e=document.getElementById("report-results");e.innerHTML='<div class="loader mx-auto my-8"></div>';const t={startDate:document.getElementById("reportStartDate").value,endDate:document.getElementById("reportEndDate").value,productId:document.getElementById("productFilterReport").value,categoryId:document.getElementById("categoryFilterReport").value,establishmentId:u.establishmentId};try{const a=await fr(t);if(a.length===0){e.innerHTML=`
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
                                <td class="px-4 py-3 whitespace-nowrap font-semibold text-gray-800">${h(o.productName)}</td>
                                <td class="px-4 py-3 whitespace-nowrap text-center font-bold ${o.change>0?"text-green-600":"text-red-600"}">
                                    ${o.change>0?"+":""}${o.change}
                                </td>
                                <td class="px-4 py-3 whitespace-nowrap text-center text-gray-500">${o.oldStock}</td>
                                <td class="px-4 py-3 whitespace-nowrap text-center text-gray-800 font-medium">${o.newStock}</td>
                                <td class="px-4 py-3 whitespace-nowrap text-gray-600 truncate max-w-xs" title="${h(o.reason)}">${h(o.reason)}</td>
                                <td class="px-4 py-3 whitespace-nowrap text-gray-600">${h(o.user)}</td>
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
                                <h4 class="font-bold text-gray-800 text-base line-clamp-1">${h(o.productName)}</h4>
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
                            <span class="text-gray-600 truncate max-w-[60%] font-medium" title="${h(o.reason)}">
                                ${h(o.reason)||"Sem motivo"}
                            </span>
                            <span class="text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                                ${h(o.user)||"Sistema"}
                            </span>
                        </div>
                    </div>
                `).join("")}
            </div>`;e.innerHTML=s+r}catch(a){g("Erro",`Não foi possível gerar o relatório: ${a.message}`,"error"),e.innerHTML=`<div class="bg-white border border-red-200 rounded-lg p-8 text-center text-red-500">${a.message}</div>`}}function qa(){const e={ok:0,near_min:0,at_min:0,empty:0};if(!u.products)return;u.products.forEach(o=>{if(!o)return;const n=o.currentStock,i=o.minStock;n<=0?e.empty++:i>0&&n<=i?e.at_min++:i>0&&n<=i*1.2?e.near_min++:e.ok++});const t=document.getElementById("indicator-ok"),a=document.getElementById("indicator-near-min"),s=document.getElementById("indicator-at-min"),r=document.getElementById("indicator-empty");t&&(t.textContent=e.ok),a&&(a.textContent=e.near_min),s&&(s.textContent=e.at_min),r&&(r.textContent=e.empty)}function st(){const e=document.getElementById("productsList");if(!e)return;const t=document.getElementById("productSearchInput")?.value.toLowerCase()||"",a=document.getElementById("productCategoryFilter")?.value||"all",s=new Map((u.categories||[]).map(o=>[o.id,o.name]));let r=(u.products||[]).filter(Boolean);oe!=="all"&&(r=r.filter(o=>{const n=o.currentStock,i=o.minStock;switch(oe){case"ok":return n>0&&(i===0||n>i*1.2);case"near_min":return i>0&&n>i&&n<=i*1.2;case"at_min":return i>0&&n>0&&n<=i;case"empty":return n<=0;default:return!0}})),r=r.filter(o=>{const n=o.name.toLowerCase().includes(t),i=a==="all"||o.categoryId===a;return n&&i}),e.innerHTML="",r.length>0?(e.className="space-y-3 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 sm:gap-4 sm:space-y-0",r.forEach(o=>{const n=document.createElement("div"),i=JSON.stringify(o).replace(/'/g,"&apos;");n.className=`product-card bg-white rounded-lg shadow-md flex items-center gap-3 p-3 overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-lg hover:bg-gray-50 
                              sm:flex-col sm:p-0 sm:items-stretch sm:gap-0`,n.dataset.action="edit-product",n.dataset.product=i;const l=o.photo||`https://placehold.co/200x200/E2E8F0/4A5568?text=${encodeURIComponent(o.name.charAt(0))}`,d=s.get(o.categoryId)||"N/A";let c="",m="text-gray-500";const b=o.currentStock,f=o.minStock;b<=0?(c='<span class="text-xs font-semibold text-red-600">Esgotado</span>',m="text-red-600 font-semibold"):f>0&&b<=f?(c='<span class="text-xs font-semibold text-orange-600">Estoque Mínimo</span>',m="text-orange-600 font-semibold"):f>0&&b<=f*1.2?(c='<span class="text-xs font-semibold text-blue-600">Estoque Baixo</span>',m="text-blue-600 font-semibold"):(c='<span class="text-xs font-semibold text-green-600">Em Estoque</span>',m="text-green-600 font-semibold"),n.innerHTML=`
                <img src="${l}" alt="Imagem de ${h(o.name)}" class="w-16 h-16 rounded-md object-cover flex-shrink-0 sm:w-full sm:h-24 sm:rounded-b-none">
                
                <div class="flex-1 sm:p-3 sm:flex sm:flex-col sm:flex-grow">
                    <div class="sm:flex-grow">
                        <div class="flex justify-between items-start mb-1 gap-2">
                            <h3 class="text-sm font-bold text-gray-900 flex-1 text-left">${h(o.name)}</h3>
                            <div class="hidden sm:block">${c}</div>
                        </div>
                        
                        <p class="text-xl font-bold text-indigo-600 mb-1 text-left hidden sm:block">R$ ${o.price.toFixed(2)}</p>
                        
                        <p class="text-xs text-gray-500 text-left mb-2 hidden sm:block">Categoria: ${h(d)}</p>
                    </div>

                    <div class="flex justify-between items-center mt-2 sm:mt-0">
                        <p class="text-lg font-bold text-indigo-600 text-left sm:hidden">R$ ${o.price.toFixed(2)}</p>
                        <p class="text-xs text-gray-500 text-right sm:text-left">
                            Estoque: <span class="font-bold text-base ${m}">${o.currentStock}</span>
                        </p>
                    </div>
                </div>`,e.appendChild(n)})):(e.className="",e.innerHTML='<p class="col-span-full text-center text-gray-500 py-10">Nenhum produto encontrado.</p>')}async function ct(){const e=document.getElementById("products-content-container");e&&(e.innerHTML='<div class="loader col-span-full mx-auto my-8"></div>');try{const[t,a,s]=await Promise.all([Ht(u.establishmentId),_t(u.establishmentId,"products"),Aa(u.establishmentId)]);u.products=(t||[]).filter(Boolean),u.categories=(a||[]).filter(Boolean),u.suppliers=(s||[]).filter(Boolean),us(Qe)}catch(t){e&&(e.innerHTML=`<p class="text-red-500 col-span-full text-center p-8">Erro ao carregar dados: ${t.message}</p>`)}}function us(e){if(document.getElementById("products-content-container")){if(Qe===e&&document.getElementById("products-content-container").children.length>1){Qe==="products"&&(qa(),st());return}Qe=e,oe="all",document.querySelectorAll("#products-tabs button.tab-button").forEach(t=>{const a=t.dataset.view===e;t.classList.toggle("border-indigo-500",a),t.classList.toggle("text-indigo-600",a),t.classList.toggle("border-transparent",!a),t.classList.toggle("text-gray-500",!a)}),e==="products"?si():e==="movements"&&ri()}}async function ii(){pe.innerHTML=`
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
        </section>`,ie&&(pe.removeEventListener("click",ie),pe.removeEventListener("input",ie),pe.removeEventListener("change",ie)),ie=async e=>{const t=e.target;if(t.id==="productSearchInput"||t.id==="productCategoryFilter"){st();return}const a=e.target.closest("button[data-action], button[data-view], .indicator-card[data-action], .product-card[data-action]");if(!a||e.target.closest('[data-action-stop-propagation="true"]'))return;if(a.hasAttribute("data-view")){us(a.dataset.view);return}switch(a.dataset.action){case"new-product":uo();break;case"edit-product":uo(JSON.parse(a.dataset.product));break;case"manage-product-categories":ti();break;case"generate-report":await ni();break;case"filter-stock":const r=a.dataset.filterType;oe=oe===r?"all":r,document.querySelectorAll(".indicator-card").forEach(o=>{o.classList.toggle("ring-2",o.dataset.filterType===oe),o.classList.toggle("ring-indigo-500",o.dataset.filterType===oe),o.classList.toggle("shadow-lg",o.dataset.filterType===oe)}),st();break}},pe.addEventListener("click",ie),pe.addEventListener("input",ie),pe.addEventListener("change",ie),Qe="products",oe="all",await ct()}const ge=document.getElementById("content");let le=null,Et="list",H={step:1,productsToBuy:[],allSuppliers:[],finalOrders:{},isQuoteMode:!1};async function li(){Et==="list"?Wt():Et==="purchases"?(H.step=1,Xe()):Et==="history"&&ms()}async function di(){try{const e=await Aa(u.establishmentId);return u.suppliers=e||[],H.allSuppliers=e,!0}catch(e){return console.error(e),!1}}async function ci(e){if(await j("Excluir Fornecedor","Tem a certeza? Isso removerá o vínculo com os produtos."))try{await Yn(e),g("Sucesso","Fornecedor excluído.","success"),jt("genericModal"),Wt()}catch(t){g("Erro","Erro ao excluir: "+t.message,"error")}}async function ui(e){e.preventDefault();const t=e.target,a=t.querySelector("#supId").value,s={name:t.querySelector("#supName").value,contactName:t.querySelector("#supContact").value,email:t.querySelector("#supEmail").value,phone:t.querySelector("#supPhone").value,taxId:t.querySelector("#supTaxId").value,category:t.querySelector("#supCategory").value,establishmentId:u.establishmentId},r=t.querySelector('button[type="submit"]');r.disabled=!0,r.textContent="A salvar...";try{a?(await Gn(a,s),g("Sucesso","Fornecedor atualizado!","success")):(await Wn(s),g("Sucesso","Fornecedor criado!","success")),jt("genericModal"),Wt()}catch(o){g("Erro","Erro ao salvar: "+o.message,"error")}finally{r.disabled=!1,r.textContent="Salvar"}}async function Wt(){const e=document.getElementById("suppliersList");if(!e)return;e.innerHTML='<div class="loader mx-auto my-8"></div>',await di();const t=document.getElementById("supplierSearchInput")?.value.toLowerCase()||"",a=u.suppliers.filter(o=>o.name.toLowerCase().includes(t)||o.contactName&&o.contactName.toLowerCase().includes(t));if(e.innerHTML="",a.length===0){e.innerHTML='<div class="text-center text-gray-500 py-8">Nenhum fornecedor encontrado.</div>';return}let s='<div class="flex flex-col gap-2 md:hidden">';a.forEach(o=>{const n=JSON.stringify(o).replace(/"/g,"&quot;"),i=h(o.name),l=h(o.category||"Geral"),d=h(o.contactName||"");s+=`
            <div class="bg-white p-3 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between active:bg-gray-50 transition-colors cursor-pointer supplier-item-mobile" data-supplier="${n}">
                <div class="flex-1 min-w-0 pr-3">
                    <h3 class="font-bold text-gray-900 text-sm truncate">${i}</h3>
                    <div class="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                        <span class="truncate bg-gray-100 px-1.5 py-0.5 rounded">${l}</span>
                        ${d?`<span class="truncate">• ${d}</span>`:""}
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
    `;a.forEach(o=>{const n=JSON.stringify(o).replace(/"/g,"&quot;"),i=h(o.name),l=h(o.taxId||"Sem doc."),d=h(o.email||"-"),c=h(o.phone||"-"),m=h(o.category||"Geral");r+=`
            <tr class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-gray-900">${i}</div>
                    <div class="text-sm text-gray-500">${l}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">${d}</div>
                    <div class="text-sm text-gray-500">${c}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        ${m}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button data-action="edit" data-supplier="${n}" class="text-indigo-600 hover:text-indigo-900 mr-3">Editar</button>
                    <button data-action="delete" data-id="${o.id}" class="text-red-600 hover:text-red-900">Excluir</button>
                </td>
            </tr>
        `}),r+="</tbody></table></div>",e.innerHTML=s+r}function mi(e){const t=e.phone?`https://wa.me/${e.phone.replace(/\D/g,"")}`:"#",a=e.phone?`tel:${e.phone}`:"#",s=e.email?`mailto:${e.email}`:"#",r=JSON.stringify(e).replace(/"/g,"&quot;"),o=h(e.name),n=h(e.category||"Fornecedor"),i=h(e.contactName||""),l=h(e.phone||""),d=`
        <div class="text-center mb-6">
            <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 text-gray-500 text-2xl font-bold uppercase">
                ${o.substring(0,2)}
            </div>
            <h3 class="text-xl font-bold text-gray-900 leading-tight mb-1">${o}</h3>
            <span class="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                ${n}
            </span>
        </div>

        <div class="space-y-4 mb-8">
            ${i?`
            <div class="flex justify-between items-center border-b border-gray-100 pb-2">
                <span class="text-gray-500 text-sm">Contato</span>
                <span class="font-medium text-gray-800">${i}</span>
            </div>`:""}
            ${l?`
            <div class="flex justify-between items-center border-b border-gray-100 pb-2">
                <span class="text-gray-500 text-sm">Telefone</span>
                <span class="font-medium text-gray-800">${l}</span>
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
    `;Y({title:"",contentHTML:d,maxWidth:"max-w-md"})}async function Xe(){const e=document.getElementById("purchasesContainer");if(e)if(H.step===1){e.innerHTML='<div class="loader mx-auto my-8"></div>';try{const[t,a]=await Promise.all([Ht(u.establishmentId),Aa(u.establishmentId)]);H.allSuppliers=a||[];const s=t.filter(d=>{const c=parseInt(d.currentStock||0),m=parseInt(d.minStock||0);return c<=m});if(H.productsToBuy=s,s.length===0){e.innerHTML=`
                    <div class="text-center py-10 bg-white rounded-lg shadow-sm border border-gray-100">
                        <div class="bg-green-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                            <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                        <h3 class="text-lg font-bold text-gray-800">Tudo em ordem!</h3>
                        <p class="text-gray-600">Nenhum produto abaixo do estoque mínimo.</p>
                        <button class="mt-4 text-indigo-600 hover:underline text-sm" onclick="window.location.reload()">Atualizar Dados</button>
                    </div>
                `;return}let r='<div class="flex flex-col gap-3 md:hidden">',o="";s.forEach(d=>{const c=parseInt(d.minStock)||0,m=parseInt(d.currentStock)||0,b=Math.max(c-m,1),f=parseFloat(d.costPrice||0),v=h(d.name);let p='<option value="">Selecione...</option>';H.allSuppliers.length>0?H.allSuppliers.forEach(x=>{const E=d.supplierIds&&d.supplierIds.includes(x.id)?"selected":"";p+=`<option value="${x.id}" ${E}>${h(x.name)}</option>`}):p='<option value="">Sem fornecedores</option>',r+=`
                    <div class="product-row bg-white p-3 rounded-lg shadow-sm border border-gray-200" data-product-id="${d.id}" data-cost="${f}">
                        <div class="flex justify-between items-start mb-2">
                            <div class="flex items-center gap-2">
                                <input type="checkbox" class="row-select w-5 h-5 text-indigo-600 rounded border-gray-300" checked>
                                <div>
                                    <p class="font-bold text-gray-800 text-sm">${v}</p>
                                    <p class="text-xs text-gray-500">Custo: R$ ${f.toFixed(2)}</p>
                                </div>
                            </div>
                            <div class="text-right">
                                <span class="text-[10px] text-gray-500 uppercase font-bold tracking-wide block mb-0.5">Estoque</span>
                                <div class="flex items-center justify-end gap-1 text-xs">
                                    <span class="font-bold text-red-600">${m}</span>
                                    <span class="text-gray-400">/</span>
                                    <span class="font-medium text-gray-600">${c} (Mín)</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="grid grid-cols-2 gap-3 items-center mt-2">
                            <div>
                                <label class="text-xs text-gray-500 block mb-1">Qtd. a Comprar</label>
                                <input type="number" class="qty-input w-full p-2 border border-gray-300 rounded text-center font-bold text-indigo-700 bg-indigo-50" value="${b}" min="1">
                            </div>
                            <div>
                                <label class="text-xs text-gray-500 block mb-1">Fornecedor</label>
                                <select class="supplier-select w-full p-2 border border-gray-300 rounded bg-white text-xs truncate">
                                    ${p}
                                </select>
                            </div>
                        </div>
                        <div class="mt-2 pt-2 border-t border-gray-100 flex justify-between items-center">
                            <span class="text-xs text-gray-500">Subtotal Previsto:</span>
                            <span class="row-subtotal font-bold text-indigo-600 text-sm">R$ ${(b*f).toFixed(2)}</span>
                        </div>
                    </div>
                `,o+=`
                    <tr class="hover:bg-gray-50 border-b border-gray-100 product-row" data-product-id="${d.id}" data-cost="${f}">
                        <td class="p-3 pl-4 text-center w-10">
                            <input type="checkbox" class="row-select w-5 h-5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500" checked>
                        </td>
                        <td class="p-3 font-medium text-gray-800">${v}</td>
                        <td class="p-3 text-center text-xs text-gray-600">
                            <div class="flex flex-col items-center">
                                <span class="font-bold text-red-600">${m} <span class="text-gray-400 font-normal">Atual</span></span>
                                <span class="border-t border-gray-200 w-12 my-0.5"></span>
                                <span class="font-medium">${c} <span class="text-gray-400 font-normal">Mínimo</span></span>
                            </div>
                        </td>
                        <td class="p-3 text-center w-24">
                            <input type="number" class="qty-input w-full p-2 border border-gray-300 rounded text-center text-lg font-bold text-indigo-700 bg-indigo-50" value="${b}" min="1">
                        </td>
                        <td class="p-3 text-right text-sm text-gray-600">R$ ${f.toFixed(2)}</td>
                        <td class="p-3 text-right text-sm font-bold text-gray-800 row-subtotal">R$ ${(b*f).toFixed(2)}</td>
                        <td class="p-3 w-48">
                            <select class="supplier-select w-full p-2 border border-gray-300 rounded-md bg-white text-sm">
                                ${p}
                            </select>
                        </td>
                    </tr>
                `}),r+="</div>";const n=H.isQuoteMode?"REVISAR COTAÇÕES":"GERAR PEDIDOS DE COMPRA",i=H.isQuoteMode?"bg-indigo-600 hover:bg-indigo-700":"bg-green-600 hover:bg-green-700",l=H.isQuoteMode?'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>':'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>';e.innerHTML=`
                <div class="space-y-4 animate-fade-in pb-20">
                    <div class="bg-white p-3 md:p-4 rounded-lg border border-gray-200 shadow-sm">
                        <div class="flex flex-col md:flex-row justify-between items-center gap-3">
                            <div class="flex items-center gap-3 w-full md:w-auto">
                                <input type="checkbox" id="toggle-quote-mode" class="w-5 h-5 text-indigo-600 rounded" ${H.isQuoteMode?"checked":""}>
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
                            ${l}
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
            `,ba()}catch(t){console.error(t),e.innerHTML='<p class="text-red-500 text-center">Erro ao calcular compras.</p>'}}else H.step===2&&pi(e)}function pi(e){if(!H.finalOrders||Object.keys(H.finalOrders).length===0){H.step=1,Xe();return}const t=H.isQuoteMode;let a="",s=0;const r=t?"border-indigo-100":"border-gray-200",o=t?"bg-indigo-50 border-indigo-100":"bg-gray-50 border-gray-200",n=t?"bg-blue-100 text-blue-700":"bg-green-100 text-green-700",i=t?"hidden":"flex",l=t?"Cotações Prontas":"Pedidos Prontos",d=t?"text-indigo-600":"text-green-600",c=t?"bg-indigo-50 border-indigo-100":"bg-green-50 border-green-100",m=t?"text-indigo-800":"text-green-800";for(const[b,f]of Object.entries(H.finalOrders)){let v=0,p=f.items.map(L=>{const R=L.qty*L.cost;return v+=R,`
            <div class="flex justify-between py-2 border-b border-gray-50 text-sm">
                <span class="text-gray-800 font-medium">${h(L.name)}</span>
                <div class="text-right">
                    <span class="text-gray-500 text-xs block">${L.qty} x R$ ${L.cost.toFixed(2)}</span>
                    <span class="text-indigo-600 font-bold block">R$ ${R.toFixed(2)}</span>
                </div>
            </div>
        `}).join("");s+=v;const x=encodeURIComponent(JSON.stringify({supplierId:b,supplierName:f.info.name,totalAmount:v,items:f.items})),k=encodeURIComponent(JSON.stringify({name:f.info.name,phone:f.info.phone,email:f.info.email})),E=encodeURIComponent(JSON.stringify(f.items)),S=h(f.info.name),$=h(f.info.email||"");a+=`
            <div class="bg-white border ${r} rounded-xl overflow-hidden shadow-sm supplier-order-card mb-4" data-supplier-id="${b}">
                <div class="${o} p-3 border-b flex justify-between items-center">
                    <div>
                        <h4 class="font-bold text-gray-800 text-base">${S}</h4>
                        <div class="text-[10px] text-gray-500 flex flex-col">
                            <span>${$}</span>
                        </div>
                    </div>
                    <div class="text-right">
                        <span class="${n} text-xs font-bold px-2 py-1 rounded">R$ ${v.toFixed(2)}</span>
                    </div>
                </div>
                <div class="p-3">
                    ${p}
                </div>
                <div class="p-3 bg-gray-50 border-t border-gray-200 grid grid-cols-3 gap-2">
                    <button class="btn-print-order bg-white border border-gray-300 text-gray-700 px-2 py-2.5 rounded-lg hover:bg-gray-50 text-xs font-bold flex items-center justify-center gap-1">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
                        PDF
                    </button>
                    <button class="btn-send-order bg-green-500 text-white px-2 py-2.5 rounded-lg hover:bg-green-600 text-xs font-bold flex items-center justify-center gap-1 shadow-sm"
                        data-supplier-info="${k}"
                        data-order-items="${E}"
                        data-total="${v}">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.897.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.463 1.065 2.876 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                        Enviar
                    </button>
                    <button class="btn-register-order bg-blue-600 text-white px-2 py-2.5 rounded-lg hover:bg-blue-700 text-xs font-bold items-center justify-center gap-1 shadow-sm ${i}" data-order="${x}">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                        Salvar
                    </button>
                </div>
            </div>
        `}e.innerHTML=`
        <div class="space-y-4 animate-fade-in pb-24">
            <div class="flex flex-col justify-between items-center gap-3 ${c} p-4 rounded-lg border text-center">
                <div>
                    <h3 class="font-bold ${m} text-lg">${l}</h3>
                    <p class="text-sm ${d}">Valor Estimado: <strong class="text-lg">R$ ${s.toFixed(2)}</strong></p>
                </div>
                <button id="btn-back-step1" class="text-gray-600 hover:text-gray-900 text-sm font-medium underline py-2">
                    ← Voltar e Corrigir
                </button>
            </div>
            <div>
                ${a}
            </div>
        </div>
    `}async function ms(){const e=document.getElementById("historyContainer");if(e){e.innerHTML='<div class="loader mx-auto my-8"></div>';try{const t=await Zn(u.establishmentId);if(t.length===0){e.innerHTML='<div class="text-center text-gray-500 py-8">Nenhum histórico encontrado.</div>';return}let a='<div class="flex flex-col gap-3 md:hidden">';t.forEach(o=>{const n=new Date(o.createdAt.seconds*1e3).toLocaleDateString("pt-BR"),i=h(o.supplierName);a+=`
                <div class="bg-white p-3 rounded-lg shadow-sm border border-gray-100 flex justify-between items-center active:bg-gray-50 transition-colors">
                    <div>
                        <p class="text-xs text-gray-500 mb-0.5">${n}</p>
                        <p class="font-bold text-gray-800 text-sm">${i}</p>
                        <p class="text-xs text-gray-400 mt-0.5">${o.items.length} itens</p>
                    </div>
                    <div class="text-right flex flex-col items-end gap-2">
                        <p class="text-indigo-600 font-bold text-sm mb-1">R$ ${parseFloat(o.totalAmount).toFixed(2)}</p>
                        <div class="flex gap-2">
                            <button class="text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg hover:bg-gray-200 btn-view-purchase" data-purchase='${JSON.stringify(o)}'>
                                Ver
                            </button>
                            <button class="text-xs bg-red-50 text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-100 btn-delete-purchase" data-id="${o.id}">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                            </button>
                        </div>
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
                <td class="p-3 font-medium text-gray-800">${h(o.supplierName)}</td>
                <td class="p-3 text-right font-bold text-indigo-600 whitespace-nowrap">R$ ${parseFloat(o.totalAmount).toFixed(2)}</td>
                <td class="p-3 text-right flex justify-end gap-2">
                    <button class="text-xs bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-lg font-bold hover:bg-indigo-100 btn-view-purchase" data-purchase='${JSON.stringify(o)}'>
                        Ver
                    </button>
                    <button class="text-xs bg-red-50 text-red-600 px-3 py-1.5 rounded-lg font-bold hover:bg-red-100 btn-delete-purchase" data-id="${o.id}">
                        Excluir
                    </button>
                </td>
            </tr>
        `).join("")}</tbody>
                </table>
            </div>
        `;e.innerHTML=a+r}catch(t){console.error(t),e.innerHTML='<p class="text-red-500 text-center">Erro ao carregar histórico.</p>'}}}function gi(e){const t=new Date(e.createdAt.seconds*1e3).toLocaleString("pt-BR"),a=e.items.map(r=>`
        <li class="flex justify-between py-3 border-b border-gray-100 last:border-0">
            <div>
                <p class="font-medium text-sm text-gray-800">${h(r.name)}</p>
                <p class="text-xs text-gray-500">${r.qty} un. x R$ ${parseFloat(r.cost).toFixed(2)}</p>
            </div>
            <p class="text-sm font-bold text-gray-700">R$ ${(r.qty*r.cost).toFixed(2)}</p>
        </li>
    `).join(""),s=`
        <div class="space-y-4">
            <div class="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
                <div>
                    <p class="text-xs text-gray-500 uppercase font-bold">Fornecedor</p>
                    <p class="font-bold text-gray-900 text-lg">${h(e.supplierName)}</p>
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
    `;Y({title:"Detalhes da Compra",contentHTML:s,maxWidth:"max-w-md"}),setTimeout(()=>{document.querySelector("#genericModal .modal-close").addEventListener("click",()=>{jt("genericModal")})},50)}function ba(){const e=document.querySelectorAll(".product-row");let t=0;e.forEach(s=>{if(s.offsetParent===null)return;const r=s.querySelector(".row-select"),o=s.querySelector(".qty-input"),n=s.querySelector(".row-subtotal"),i=parseFloat(s.dataset.cost||0),l=parseInt(o.value||0);if(r.checked){const d=i*l;t+=d,n&&(n.textContent=`R$ ${d.toFixed(2)}`),s.classList.remove("opacity-50","bg-gray-50")}else s.classList.add("opacity-50","bg-gray-50")});const a=document.getElementById("total-purchase-cost");a&&(a.textContent=`R$ ${t.toFixed(2).replace(".",",")}`)}async function bi(e,t=!1){if(!window.jspdf){alert("Erro: Biblioteca PDF não carregada.");return}const{jsPDF:a}=window.jspdf,s=new a,r=new Date().toLocaleDateString("pt-BR"),o=t?[100,116,139]:[22,163,74];s.setFontSize(22),s.setTextColor(...o),s.setFont("helvetica","bold");const n=t?"SOLICITAÇÃO DE COTAÇÃO":"PEDIDO DE COMPRA";s.text(n,14,20),s.setDrawColor(...o),s.setLineWidth(.5),s.line(14,25,196,25),s.setFontSize(10),s.setTextColor(0),s.setFont("helvetica","bold"),s.text("DE:",14,35),s.setFont("helvetica","normal"),s.text(u.establishmentName||"Nossa Empresa",14,40),s.text(`Data: ${r}`,14,45),s.setFont("helvetica","bold"),s.text("PARA:",110,35),s.setFont("helvetica","normal"),s.text(e.info.name||"Fornecedor",110,40),e.info.email&&s.text(`Email: ${e.info.email}`,110,45),e.info.phone&&s.text(`Tel: ${e.info.phone}`,110,50),s.setFontSize(10),s.setFont("helvetica","italic");const i=t?"Por favor, enviem os vossos melhores preços e condições para os itens listados abaixo.":"Confirmação de pedido de compra conforme os itens e quantidades abaixo.";s.text(i,14,65);const l=t?["Produto","Quantidade Solicitada"]:["Produto","Qtd.","V. Unitário","V. Total"],d=e.items.map(f=>t?[f.name,f.qty.toString()]:[f.name,f.qty.toString(),`R$ ${f.cost.toFixed(2)}`,`R$ ${(f.qty*f.cost).toFixed(2)}`]);s.autoTable({startY:75,head:[l],body:d,theme:"striped",headStyles:{fillColor:o,textColor:[255,255,255],fontStyle:"bold",halign:"left"},styles:{fontSize:10,cellPadding:3,valign:"middle"},columnStyles:t?{}:{1:{halign:"center"},2:{halign:"right"},3:{halign:"right",fontStyle:"bold"}},foot:t?null:[["","","TOTAL DO PEDIDO:",{content:`R$ ${d.reduce((f,v)=>f+parseFloat(v[3].replace("R$ ","")),0).toFixed(2)}`,styles:{halign:"right",fontStyle:"bold",fillColor:[240,240,240],textColor:[0,0,0]}}]]});const c=s.internal.getNumberOfPages();for(let f=1;f<=c;f++)s.setPage(f),s.setFontSize(8),s.setTextColor(150),s.text(`Gerado por Kairos - Página ${f} de ${c}`,196,290,{align:"right"});const m=e.info.name.replace(/[^a-zA-Z0-9]/g,"_"),b=`${t?"Cotacao":"Pedido"}_${m}_${r.replace(/\//g,"-")}.pdf`;s.save(b),g("Sucesso","PDF gerado com sucesso!","success")}function mo(e=null){const t=`
        <form id="supplierForm" class="space-y-4">
            <input type="hidden" id="supId" value="${e?.id||""}">
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="col-span-1 md:col-span-2">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Nome da Empresa *</label>
                    <input type="text" id="supName" value="${h(e?.name||"")}" required class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-shadow" placeholder="Ex: Distribuidora Beleza">
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
                    <input type="text" id="supContact" value="${h(e?.contactName||"")}" class="w-full p-3 border border-gray-300 rounded-lg outline-none" placeholder="Ex: João Silva">
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Telefone / WhatsApp</label>
                    <input type="tel" id="supPhone" value="${h(e?.phone||"")}" class="w-full p-3 border border-gray-300 rounded-lg outline-none" placeholder="(00) 00000-0000">
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" id="supEmail" value="${h(e?.email||"")}" class="w-full p-3 border border-gray-300 rounded-lg outline-none" placeholder="contato@empresa.com">
                </div>

                <div class="col-span-1 md:col-span-2">
                    <label class="block text-sm font-medium text-gray-700 mb-1">CNPJ / CPF</label>
                    <input type="text" id="supTaxId" value="${h(e?.taxId||"")}" class="w-full p-3 border border-gray-300 rounded-lg outline-none">
                </div>
            </div>

            <div class="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
                <button type="button" class="modal-close w-full md:w-auto px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-bold hover:bg-gray-200 transition-colors">Cancelar</button>
                <button type="submit" class="w-full md:w-auto px-6 py-3 bg-indigo-600 text-white rounded-lg font-bold shadow-md hover:bg-indigo-700 transition-colors">
                    ${e?"Atualizar Dados":"Salvar Fornecedor"}
                </button>
            </div>
        </form>
    `;Y({title:e?"Editar Fornecedor":"Novo Fornecedor",contentHTML:t,maxWidth:"max-w-lg"}),setTimeout(()=>{document.getElementById("supplierForm").addEventListener("submit",ui),document.querySelector("#genericModal .modal-close").addEventListener("click",()=>jt("genericModal"))},50)}function fi(){ge.innerHTML=`
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
    `,le&&(ge.removeEventListener("click",le),ge.removeEventListener("input",le),ge.removeEventListener("change",le)),le=e=>{if(e.target.closest("#tab-btn-list")&&pt("list"),e.target.closest("#tab-btn-purchases")&&pt("purchases"),e.target.closest("#tab-btn-history")&&pt("history"),e.target.id==="toggle-quote-mode"&&(H.isQuoteMode=e.target.checked,Xe()),e.target.id==="supplierSearchInput"&&Wt(),e.target.closest("#btn-new-supplier")&&mo(),e.target.closest(".supplier-item-mobile")){const a=e.target.closest(".supplier-item-mobile"),s=JSON.parse(a.dataset.supplier);mi(s)}const t=e.target.closest("button[data-action]");if(t){const a=t.dataset.action;a==="delete"&&ci(t.dataset.id),a==="edit"&&mo(JSON.parse(t.dataset.supplier))}if((e.target.classList.contains("qty-input")||e.target.classList.contains("row-select"))&&ba(),e.target.id==="check-all-rows"){const a=e.target.checked;document.querySelectorAll(".row-select").forEach(s=>s.checked=a),ba()}if(e.target.closest("#btn-go-to-orders")){const a=document.querySelectorAll(".product-row"),s={};let r=!1;if(a.forEach(o=>{if(o.offsetParent===null||!o.querySelector(".row-select").checked)return;r=!0;let i="Produto";const l=o.querySelector("td:nth-child(2)"),d=o.querySelector(".font-bold");l?i=l.innerText:d&&(i=d.innerText);const c=parseInt(o.querySelector(".qty-input").value),m=parseFloat(o.dataset.cost),f=o.querySelector(".supplier-select").value;if(f){if(!s[f]){const v=H.allSuppliers.find(p=>p.id===f);s[f]={info:v,items:[]}}s[f].items.push({name:i,qty:c,cost:m})}}),!r){g("Atenção","Selecione pelo menos um item para gerar o pedido.","error");return}H.finalOrders=s,H.step=2,Xe()}if(e.target.closest("#btn-back-step1")&&(H.step=1,Xe()),e.target.closest(".btn-send-order")){const a=e.target.closest(".btn-send-order"),s=JSON.parse(decodeURIComponent(a.dataset.supplierInfo)),r=JSON.parse(decodeURIComponent(a.dataset.orderItems)),o=parseFloat(a.dataset.total),n=H.isQuoteMode;if(s.phone){const i=s.phone.replace(/\D/g,"");let l="";n?(l=`Olá *${s.name}*, tudo bem?

Gostaria de solicitar uma *cotação* para os seguintes itens:

`,r.forEach(c=>{l+=`- ${c.qty}x ${c.name}
`}),l+=`
Aguardo o retorno. Obrigado!`):(l=`Olá *${s.name}*, gostaria de realizar o seguinte *pedido*:

`,l+=`*ITENS:*
`,r.forEach(c=>{l+=`- ${c.qty}x ${c.name}
`}),l+=`
Aguardo confirmação.`);const d=`https://wa.me/${i}?text=${encodeURIComponent(l)}`;window.open(d,"_blank"),g("Aberto","WhatsApp aberto.","success")}else if(s.email){const i=n?`Solicitação de Cotação - ${u.establishmentName||"Empresa"}`:`Pedido de Compra - ${u.establishmentName||"Empresa"}`;let l=`Olá ${s.name},

`;n?l+=`Gostaria de solicitar uma cotação para os itens abaixo:

`:l+=`Gostaria de realizar o seguinte pedido:

`,r.forEach(c=>{l+=`- ${c.qty}x ${c.name}
`}),n||(l+=`
Valor Total Estimado: R$ ${o.toFixed(2)}`),l+=`

Aguardo retorno.`;const d=`mailto:${s.email}?subject=${encodeURIComponent(i)}&body=${encodeURIComponent(l)}`;window.location.href=d}else g("Erro","Fornecedor sem telefone ou email cadastrado.","error")}if(e.target.closest(".btn-register-order")){const a=e.target.closest(".btn-register-order");if(a.disabled)return;const s=JSON.parse(decodeURIComponent(a.dataset.order));s.establishmentId=u.establishmentId,a.disabled=!0,a.textContent="A processar...",ke(u.establishmentId).then(r=>{const o=r.purchaseConfig||null;return Qn(s,o)}).then(()=>{g("Sucesso","Compra registrada e integrada ao financeiro!","success"),a.innerHTML='<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Registrado',a.classList.replace("bg-blue-600","bg-green-600"),a.classList.replace("hover:bg-blue-700","hover:bg-green-700")}).catch(r=>{a.disabled=!1,a.innerHTML='<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Salvar',g("Erro","Falha ao registrar compra: "+r.message,"error")})}if(e.target.closest(".btn-delete-purchase")){const s=e.target.closest(".btn-delete-purchase").dataset.id;j("Excluir Compra","Isto apagará o registo histórico E o lançamento financeiro associado. Deseja continuar?").then(async r=>{if(r)try{await Xn(s,u.establishmentId),g("Sucesso","Compra e financeiro excluídos.","success"),ms()}catch(o){g("Erro","Erro ao excluir: "+o.message,"error")}})}if(e.target.closest(".btn-print-order")){const s=e.target.closest(".supplier-order-card").dataset.supplierId,r=H.finalOrders[s];r?bi(r,H.isQuoteMode):g("Erro","Dados do pedido não encontrados.","error")}if(e.target.closest(".btn-view-purchase")){const a=e.target.closest(".btn-view-purchase"),s=JSON.parse(a.dataset.purchase);gi(s)}},ge.addEventListener("click",le),ge.addEventListener("input",le),ge.addEventListener("change",le),pt("list")}function pt(e){Et=e,["list","purchases","history"].forEach(a=>{const s=document.getElementById(`tab-btn-${a}`),r=document.getElementById(`tab-content-${a}`);a===e?(s.classList.add("border-indigo-500","text-indigo-600"),s.classList.remove("border-transparent","text-gray-500"),r.classList.remove("hidden")):(s.classList.remove("border-indigo-500","text-indigo-600"),s.classList.add("border-transparent","text-gray-500"),r.classList.add("hidden"))});const t=document.getElementById("btn-new-supplier");t&&(e==="list"?t.classList.remove("hidden"):t.classList.add("hidden")),li()}const Zt=document.getElementById("content"),po={monday:"Segunda",tuesday:"Terça",wednesday:"Quarta",thursday:"Quinta",friday:"Sexta",saturday:"Sábado",sunday:"Domingo"};let re=new Set,gt=null,Pe=null;function vi(e=8){let t="";for(let a=0;a<e;a++)t+=`
        <div class="bg-white rounded-lg shadow-md flex items-center gap-4 p-3 overflow-hidden animate-pulse sm:flex-col sm:items-stretch sm:p-0 sm:gap-0">
            <div class="w-16 h-16 rounded-full bg-gray-200 flex-shrink-0 sm:w-full sm:h-32 sm:rounded-b-none sm:rounded-t-lg"></div>
            <div class="flex-1 space-y-3 sm:p-4">
                <div class="h-4 bg-gray-200 rounded w-3/4"></div>
                <div class="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
        </div>
        `;return t}function hi(e){return e.length===0?'<p class="col-span-full text-center text-gray-500 py-10">Nenhum profissional encontrado.</p>':e.map(t=>{const a=t.status==="inactive",s=h(t.name),r=h(t.specialty||"Especialidade"),o=t.photo||`https://placehold.co/100x100/E2E8F0/4A5568?text=${encodeURIComponent(t.name?t.name.charAt(0):"P")}`,n=JSON.stringify(t).replace(/'/g,"&apos;");return`
            <div class="professional-card bg-white rounded-lg shadow-md flex items-center gap-4 p-3 cursor-pointer transition-transform transform hover:shadow-lg hover:bg-gray-50
                        sm:flex-col sm:items-stretch sm:p-0 sm:gap-0 ${a?"opacity-50 bg-gray-100":""}" 
                 data-action="open-professional-modal" data-professional='${n}'>
                
                <img src="${o}" alt="Foto de ${s}" class="w-16 h-16 rounded-full object-cover flex-shrink-0
                            sm:w-full sm:h-32 sm:rounded-b-none sm:rounded-t-lg">
                
                <div class="flex-1 sm:p-4">
                    <div class="flex justify-between items-start">
                        <div>
                            <h3 class="text-sm font-bold text-gray-900 text-left sm:text-base">${s}</h3>
                            <p class="text-xs text-gray-500 text-left sm:text-sm">${r}</p>
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
            </div>`}).join("")}function Kt(){const e=document.getElementById("genericModal");e.style.display="none",Pe&&e.removeEventListener("click",Pe)}async function xi(e){const t=document.getElementById("genericModal"),a=e.id?e:{name:"Novo Profissional",specialty:"",status:"active",workingHours:{},services:[]},s=h(a.name),r=u.services||await Se(u.establishmentId),o=u.professionals||await Z(u.establishmentId),n=`
        <div class="modal-content max-w-5xl p-0 overflow-y-auto max-h-[90vh]"> 
            <div class="modal-header px-6 py-4 flex justify-between items-center border-b">
                <h2 class="text-2xl font-bold text-gray-800">${s}</h2>
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
        </div>`;t.innerHTML=n,t.style.display="flex",yi(a,r),wi(a),ki(a,o),$i(a)}function yi(e,t){const a=document.getElementById("professionalForm"),s=e.dob?e.dob.split("/"):["",""],r=Array.from({length:12},(x,k)=>{const E=k+1,S=E==s[1]?"selected":"",$=new Date(0,k).toLocaleString("pt-BR",{month:"long"});return`<option value="${E}" ${S}>${$.charAt(0).toUpperCase()+$.slice(1)}</option>`}).join(""),o=e.status||"active",n=h(e.name||""),i=h(e.specialty||""),l=h(e.phone||""),d=h(e.notes||"");a.innerHTML=`
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
                    <div class="form-group"><label for="profName">Nome</label><input type="text" id="profName" value="${n}" required class="mt-1 w-full p-2 border rounded-md"></div>
                    <div class="form-group"><label for="profSpecialty">Especialidade</label><input type="text" id="profSpecialty" value="${i}" required class="mt-1 w-full p-2 border rounded-md"></div>
                    <div class="form-group"><label for="profPhone">Número de telefone</label><input type="tel" id="profPhone" value="${l}" class="mt-1 w-full p-2 border rounded-md"></div>
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

        <div><label class="block text-sm font-medium text-gray-700">Serviços Realizados</label><div id="profServicesContainer" class="mt-2 grid grid-cols-2 md:grid-cols-3 gap-4 p-4 border rounded-md bg-white max-h-48 overflow-y-auto">${t.map(x=>`<label class="flex items-center space-x-2"><input type="checkbox" value="${x.id}" class="rounded" ${e.services?.includes(x.id)?"checked":""}><span>${h(x.name)}</span></label>`).join("")}</div></div>
        <div class="form-group"><label for="profNotes">Observações</label><textarea id="profNotes" rows="3" class="mt-1 w-full p-2 border rounded-md">${d}</textarea></div>`;const c=document.getElementById("profPhotoInput"),m=document.getElementById("profPhotoButton"),b=document.getElementById("profPhotoPreview"),f=document.getElementById("profPhotoBase64"),v=e.photo||`https://placehold.co/128x128/E2E8F0/4A5568?text=${encodeURIComponent(e.name?e.name.charAt(0):"P")}`,p=e.photo||"";m&&m.addEventListener("click",()=>c.click()),c&&(c.onchange=async()=>{const x=c.files[0];if(x){b.src="https://placehold.co/128x128/E2E8F0/4A5568?text=...";try{const k=await Yo(x,800,800,.8),S=k.length*3/4,$=1e3*1024;if(S>$)throw new Error("A imagem é muito grande mesmo após a compressão.");b.src=k,f.value=k}catch(k){g("Erro de Imagem",k.message||"Não foi possível processar a imagem.","error"),b.src=v,f.value=p,c.value=""}}})}function wi(e){const t=document.getElementById("jornada");t.innerHTML='<div><h3 class="text-xl font-semibold mb-4">Jornada de Trabalho Semanal</h3><p class="text-sm text-gray-600 mb-4">Defina os horários de trabalho padrão para este profissional.</p><div id="profScheduleContainer" class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4"></div></div>',Si(t.querySelector("#profScheduleContainer"),e.workingHours||{})}async function ki(e,t){const a=document.getElementById("bloqueios");a.innerHTML=`
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
                <h3 class="text-xl font-semibold mb-4">Lançamento de Bloqueios</h3>
                <form id="batchBlockageForm" class="p-4 bg-white rounded-lg shadow-inner space-y-3 mb-4">
                    <h4 class="font-semibold text-gray-800">Selecione os Profissionais</h4>
                    <div id="batchProfSelectionContainer" class="max-h-32 overflow-y-auto p-2 border rounded-md space-y-2">
                        ${t.map(o=>`<label class="flex items-center"><input type="checkbox" name="batch-professionals" value="${o.id}" class="rounded mr-2" ${o.id===e.id?"checked":""}><span>${h(o.name)}</span></label>`).join("")}
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
                    <h3 class="text-xl font-semibold">Bloqueios de ${h(e.name)}</h3>
                    <select id="prof-blockages-filter" class="p-1 border rounded text-sm bg-white">
                        <option value="future">Futuros</option>
                        <option value="history">Histórico</option>
                    </select>
                </div>
                <div id="blockagesList" class="space-y-2 max-h-96 overflow-y-auto pr-2"></div>
            </div>
        </div>`;const s=document.getElementById("batchBlockageForm");s&&s.addEventListener("submit",async o=>{o.preventDefault();const n=Array.from(o.target.querySelectorAll('input[name="batch-professionals"]:checked')).map(f=>f.value);if(n.length===0)return g("Atenção","Selecione pelo menos um profissional.","error");const i=o.target.batchBlockageStartDate.value,l=o.target.batchBlockageEndDate.value||i,d=o.target.batchBlockageStartTime.value,c=o.target.batchBlockageEndTime.value,m=o.target.batchBlockageReason.value;if(!i||!d||!c)return g("Atenção","Preencha Data de Início, Início e Fim.","error");const b=n.map(f=>{const v={professionalId:f,establishmentId:u.establishmentId,startTime:new Date(`${i}T${d}`).toISOString(),endTime:new Date(`${l}T${c}`).toISOString(),reason:m};return zt(v)});try{await Promise.all(b),g("Sucesso!",`${n.length} bloqueios foram criados.`);const f=document.getElementById("prof-blockages-filter").value;Ze(e.id,f)}catch(f){g("Erro",f.message,"error")}}),document.getElementById("prof-blockages-filter").addEventListener("change",o=>Ze(e.id,o.target.value)),await Ze(e.id,"future")}function Si(e,t){e.innerHTML=Object.keys(po).map(a=>{const s=t[a]||{},r=s.active!==!1;return`
            <div class="day-schedule-card p-3 rounded-lg ${r?"bg-white":"bg-gray-100 disabled"} border">
                 <div class="flex justify-between items-center"><span class="font-semibold text-gray-800">${po[a]}</span><label class="flex items-center cursor-pointer"><div class="relative"><input type="checkbox" data-day="${a}" data-field="active" class="sr-only" ${r?"checked":""}><div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full"></div></div></label></div>
                <div class="time-inputs grid grid-cols-2 gap-2 mt-2 text-sm">
                    <div><label>Início:</label><input type="time" data-day="${a}" data-field="start" value="${s.start||"09:00"}" class="w-full p-1 border rounded" ${r?"":"disabled"}></div>
                    <div><label>Fim:</label><input type="time" data-day="${a}" data-field="end" value="${s.end||"18:00"}" class="w-full p-1 border rounded" ${r?"":"disabled"}></div>
                    <div><label>Intervalo:</label><input type="time" data-day="${a}" data-field="breakStart" value="${s.breakStart||"12:00"}" class="w-full p-1 border rounded" ${r?"":"disabled"}></div>
                    <div><label>Fim Int.:</label><input type="time" data-day="${a}" data-field="breakEnd" value="${s.breakEnd||"13:00"}" class="w-full p-1 border rounded" ${r?"":"disabled"}></div>
                </div>
            </div>`}).join(""),e.querySelectorAll('input[type="checkbox"][data-field="active"]').forEach(a=>{a.addEventListener("change",s=>{const r=s.target.closest(".day-schedule-card"),o=!s.target.checked;r.classList.toggle("bg-white",!o),r.classList.toggle("bg-gray-100",o),r.classList.toggle("disabled",o),r.querySelectorAll(".time-inputs input").forEach(n=>n.disabled=o)})})}async function Ze(e,t="future"){const a=document.getElementById("blockagesList");if(a){a.innerHTML='<div class="loader mx-auto"></div>';try{const s=new Date;let r,o;t==="history"?(o=new Date,r=new Date,r.setFullYear(r.getFullYear()-2)):(r=new Date,o=new Date,o.setFullYear(o.getFullYear()+2));let i=(await Ot(u.establishmentId,r.toISOString(),o.toISOString(),e)).map(d=>({...d,startTime:new Date(d.startTime),endTime:new Date(d.endTime)}));t==="history"?i=i.filter(d=>d.endTime<s).sort((d,c)=>c.startTime-d.startTime):i=i.filter(d=>d.endTime>=s).sort((d,c)=>d.startTime-c.startTime);const l=i.reduce((d,c)=>{const m=c.reason||"Sem motivo";return d[m]||(d[m]=[]),d[m].push(c),d},{});if(Object.keys(l).length===0){a.innerHTML=`<p class="text-center text-gray-500 text-sm py-4">Nenhum bloqueio ${t==="history"?"no histórico":"futuro"}.</p>`;return}a.innerHTML=Object.entries(l).map(([d,c])=>`
            <div class="bg-gray-100 rounded-lg p-3 my-2 space-y-2">
                <div class="flex justify-between items-center pb-2 border-b">
                    <h4 class="font-bold text-gray-700">${h(d)} (${c.length})</h4>
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
        `).join("")}catch(s){a.innerHTML=`<p class="text-red-500">${s.message}</p>`}}}function $i(e){const t=document.getElementById("genericModal");Pe&&t.removeEventListener("click",Pe),Pe=async a=>{const s=a.target.closest("button[data-action]");if(!s){const o=a.target.closest(".tab-link");o&&(t.querySelectorAll(".tab-link").forEach(n=>n.classList.remove("active")),o.classList.add("active"),t.querySelectorAll(".tab-content").forEach(n=>n.classList.add("hidden")),document.getElementById(o.dataset.tab).classList.remove("hidden"));return}const r=s.dataset.action;switch(a.stopPropagation(),r){case"close-modal":Kt();break;case"delete-professional":const o=s.dataset.id;if(await j("Excluir Profissional",`Tem certeza que deseja excluir ${e.name}? Esta ação não pode ser desfeita.`))try{await jo(o),g("Sucesso!","Profissional excluído.","success"),Kt(),Bt()}catch(p){g("Erro",`Não foi possível excluir: ${p.message}`,"error")}break;case"save-professional":const i=document.getElementById("professionalForm"),l=s,d=document.getElementById("profScheduleContainer"),c=Array.from(i.querySelectorAll("#profServicesContainer input:checked")).map(p=>p.value),m={};d&&d.querySelectorAll(".day-schedule-card").forEach(p=>{const x=p.querySelector('[data-field="active"]').dataset.day;m[x]={active:p.querySelector('[data-field="active"]').checked,start:p.querySelector('[data-field="start"]').value,end:p.querySelector('[data-field="end"]').value,breakStart:p.querySelector('[data-field="breakStart"]').value,breakEnd:p.querySelector('[data-field="breakEnd"]').value}});const b={...e,id:i.querySelector("#professionalId").value||void 0,name:i.querySelector("#profName").value,specialty:i.querySelector("#profSpecialty").value,photo:i.querySelector("#profPhotoBase64").value,services:c,workingHours:m,phone:i.querySelector("#profPhone").value,dob:`${i.querySelector("#profDobDay").value}/${i.querySelector("#profDobMonth").value}`,receivesCommission:i.querySelector("#profCommission").value==="sim",showOnAgenda:i.querySelector("#profShowOnAgenda").value==="sim",orderOnAgenda:parseInt(i.querySelector("#profOrderOnAgenda").value)||1,notes:i.querySelector("#profNotes").value,status:i.querySelector("#profStatus").value,establishmentId:u.establishmentId};l.disabled=!0,l.textContent="A salvar...";try{b.id?(await Lt(b.id,b),g("Sucesso!","Profissional atualizado.","success")):(delete b.id,await Fo(b),g("Sucesso!","Profissional criado.","success")),Kt(),Bt()}catch(p){g("Erro",p.message,"error"),l.disabled=!1,l.textContent="Salvar"}break;case"delete-blockage":const f=s.dataset.id;if(await j("Apagar Bloqueio","Tem certeza?"))try{await Ia(f),g("Bloqueio removido.","success");const p=document.getElementById("prof-blockages-filter")?document.getElementById("prof-blockages-filter").value:"future";Ze(e.id,p)}catch(p){g("Erro",p.message,"error")}break;case"batch-delete-blockage":const v=JSON.parse(s.dataset.ids);if(await j("Apagar em Lote",`Tem certeza que deseja apagar ${v.length} bloqueios com este motivo?`))try{await Wo(v),g("Bloqueios removidos.","success");const p=document.getElementById("prof-blockages-filter")?document.getElementById("prof-blockages-filter").value:"future";Ze(e.id,p)}catch(p){g("Erro",p.message,"error")}break}},t.addEventListener("click",Pe)}function fa(){const e=document.getElementById("batch-actions-container"),t=document.getElementById("selected-count");!e||!t||(re.size>0?(t.textContent=`${re.size} selecionado(s)`,e.classList.remove("hidden")):e.classList.add("hidden"))}function Ei(){j("Excluir em Lote",`Tem certeza que deseja excluir ${re.size} profissionais? Esta ação não pode ser desfeita.`).then(async e=>{if(e)try{await lr(Array.from(re)),g("Sucesso!",`${re.size} profissionais foram excluídos.`,"success"),re.clear(),fa(),Bt()}catch(t){g("Erro",`Não foi possível excluir em lote: ${t.message}`,"error")}})}function Ve(){const e=document.getElementById("professionalsList");if(!e)return;if(!u.professionals){e.className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 pb-20",e.innerHTML=vi();return}const t=document.getElementById("showInactiveProfToggle").checked,a=document.getElementById("profSearchInput").value.toLowerCase(),s=u.professionals.filter(r=>{const o=r.name.toLowerCase().includes(a),n=t||r.status!=="inactive";return o&&n});e.className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 pb-20",e.innerHTML=hi(s)}async function Bt(){re.clear(),Zt.innerHTML=`
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
        </section>`,gt&&Zt.removeEventListener("click",gt),gt=t=>{const a=t.target.closest('[data-action="open-professional-modal"]'),s=t.target.closest('[data-action="batch-delete"]');if(a){t.preventDefault();let o={};if(a.dataset.professional)try{o=JSON.parse(a.dataset.professional)}catch(n){console.error("Erro ao fazer parse do professional data:",n);return}xi(o);return}if(s){Ei();return}const r=t.target.closest(".professional-checkbox");if(r){const o=r.dataset.id;r.checked?re.add(o):re.delete(o),Ve(),fa();return}},Zt.addEventListener("click",gt),document.getElementById("profSearchInput").addEventListener("input",Ve),document.getElementById("showInactiveProfToggle").addEventListener("change",Ve);const e=document.getElementById("professionalsList");u.professionals=null,u.services=null,Ve();try{const[t,a]=await Promise.all([Z(u.establishmentId),Se(u.establishmentId)]);u.professionals=t,u.services=a,Ve(),fa()}catch{e.innerHTML='<p class="text-red-500 col-span-full">Erro ao carregar dados da página.</p>'}}let P={clients:[],establishment:null,searchTimeout:null,currentClient:null,history:[],historyLimit:10,filters:{hasLoyalty:!1,birthMonth:"",inactiveDays:""},showFilters:!1,selectionMode:!1,selectedClients:new Set};const ps=e=>e?e.replace(/\D/g,""):"",Dt=e=>{if(!e)return"";const t=e.replace(/\D/g,"");return t.length>10?t.replace(/^(\d\d)(\d{5})(\d{4}).*/,"($1) $2-$3"):t.replace(/^(\d\d)(\d{4})(\d{0,4}).*/,"($1) $2-$3")},Ii=e=>new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(e||0),va=e=>{if(!e)return"-";try{const t=new Date(e);return isNaN(t.getTime())?"-":t.toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit",year:"2-digit",hour:"2-digit",minute:"2-digit"})}catch{return"-"}},Ci=()=>{P.showFilters=!P.showFilters;const e=document.getElementById("filter-panel");e&&e.classList.toggle("hidden",!P.showFilters)},gs=()=>{P.selectionMode=!P.selectionMode,P.selectedClients.clear(),vs(),Ra()},bs=e=>{P.selectedClients.has(e)?P.selectedClients.delete(e):P.selectedClients.add(e),Ra();const t=document.getElementById(`card-${e}`);if(t){const a=t.querySelector(".client-checkbox");a&&(a.checked=P.selectedClients.has(e)),P.selectedClients.has(e)?t.classList.add("ring-2","ring-indigo-500","bg-indigo-50"):t.classList.remove("ring-2","ring-indigo-500","bg-indigo-50")}},Ra=()=>{const e=document.getElementById("header-normal"),t=document.getElementById("header-selection"),a=document.getElementById("selected-count");P.selectionMode?(e.classList.add("hidden"),t.classList.remove("hidden"),a&&(a.textContent=`${P.selectedClients.size} selecionado(s)`)):(e.classList.remove("hidden"),t.classList.add("hidden"))},Li=async()=>{const e=P.selectedClients.size;if(e!==0&&await j("Excluir Clientes",`Tem certeza que deseja excluir ${e} clientes selecionados? Esta ação não pode ser desfeita.`)){const t=document.getElementById("btn-bulk-delete");t&&(t.disabled=!0,t.textContent="Excluindo...");try{const a=Array.from(P.selectedClients).map(s=>Go(s));await Promise.all(a),g("Sucesso",`${e} clientes excluídos com sucesso!`,"success"),gs(),setTimeout(()=>me(),500)}catch(a){console.error(a),g("Erro","Ocorreu um erro ao excluir alguns clientes.","error"),t&&(t.disabled=!1,t.textContent="Excluir")}}},Ti=()=>{const e=document.getElementById("filter-loyalty"),t=document.getElementById("filter-month"),a=document.getElementById("filter-inactive");P.filters.hasLoyalty=e?e.checked:!1,P.filters.birthMonth=t?t.value:"",P.filters.inactiveDays=a?a.value:"",me()},Pi=()=>{const e=document.getElementById("filter-loyalty"),t=document.getElementById("filter-month"),a=document.getElementById("filter-inactive");e&&(e.checked=!1),t&&(t.value=""),a&&(a.value=""),P.filters={hasLoyalty:!1,birthMonth:"",inactiveDays:""},me()},fs=async(e=null)=>{P.currentClient=e,P.historyLimit=10;const t=!e;if(Y({title:"",contentHTML:(s=>`
        <div class="h-[80vh] flex flex-col bg-gray-50 rounded-lg overflow-hidden">
            <div class="bg-white border-b px-6 py-4 flex justify-between items-center shrink-0">
                <div>
                    <h2 class="text-xl font-bold text-gray-800">${t?"Novo Cliente":s.name||"Cliente"}</h2>
                    ${t?"":`<p class="text-sm text-gray-500">${Dt(s.phone)}</p>`}
                </div>
                ${t?"":`
                <div class="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold">
                    ${s.loyaltyPoints||0} pts
                </div>`}
            </div>

            <div class="flex bg-white border-b shrink-0 overflow-x-auto">
                <button onclick="window.switchTab('details')" id="tab-btn-details" class="flex-1 py-3 px-4 text-sm font-medium border-b-2 border-indigo-600 text-indigo-600 transition-colors whitespace-nowrap">Cadastro</button>
                ${t?"":`
                <button onclick="window.switchTab('appointments')" id="tab-btn-appointments" class="flex-1 py-3 px-4 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-indigo-600 transition-colors whitespace-nowrap">Agendamentos</button>
                <button onclick="window.switchTab('history')" id="tab-btn-history" class="flex-1 py-3 px-4 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-indigo-600 transition-colors whitespace-nowrap">Histórico</button>
                <button onclick="window.switchTab('loyalty')" id="tab-btn-loyalty" class="flex-1 py-3 px-4 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-indigo-600 transition-colors whitespace-nowrap">Fidelidade</button>
                `}
            </div>

            <div id="modal-body" class="flex-1 overflow-y-auto p-6 relative">
                <div class="loader mx-auto mt-10"></div>
            </div>

            <div class="bg-white border-t p-4 flex justify-between shrink-0">
                ${t?"<div></div>":'<button onclick="window.handleDelete()" class="text-red-500 hover:bg-red-50 px-4 py-2 rounded text-sm font-medium">Excluir</button>'}
                <div class="flex gap-2">
                    <button onclick="document.getElementById('genericModal').style.display='none'" class="px-4 py-2 border rounded text-gray-700 hover:bg-gray-50">Cancelar</button>
                    <button onclick="window.handleSave()" class="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 font-medium">Salvar</button>
                </div>
            </div>
        </div>
    `)(e||{}),maxWidth:"max-w-3xl"}),window.switchTab=s=>It(s,t),window.handleSave=Bi,window.handleDelete=Di,window.loadMoreHistory=()=>{P.historyLimit+=10,It("history",t)},!t&&e.id)try{if(typeof da=="function"){const s=await da(u.establishmentId,e.id);if(s){P.currentClient=s;const r=document.querySelector(".bg-indigo-100.text-indigo-700");r&&(r.textContent=`${s.loyaltyPoints||0} pts`)}}P.history=await qr(u.establishmentId,e.phone)}catch(s){console.error("Aviso: Não foi possível atualizar detalhes do cliente",s),P.history=[]}It("details",t)},It=(e,t)=>{const a=document.getElementById("modal-body");if(!a)return;document.querySelectorAll('[id^="tab-btn-"]').forEach(o=>{o.classList.remove("border-indigo-600","text-indigo-600"),o.classList.add("border-transparent","text-gray-500")});const s=document.getElementById(`tab-btn-${e}`);s&&(s.classList.add("border-indigo-600","text-indigo-600"),s.classList.remove("border-transparent","text-gray-500"));const r=P.currentClient||{};if(e==="details"){if(a.innerHTML=`
            <form id="form-client" class="space-y-4 max-w-lg mx-auto">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                    <input type="text" name="name" value="${r.name||""}" class="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500 outline-none" required>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Telefone (WhatsApp)</label>
                    <input type="tel" name="phone" id="input-phone" value="${Dt(r.phone)}" 
                        ${t?'class="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500 outline-none"':'disabled class="w-full p-2 border rounded bg-gray-100 text-gray-500 cursor-not-allowed"'} 
                        placeholder="(00) 00000-0000" required>
                    ${t?"":'<p class="text-xs text-gray-400 mt-1">O telefone é o ID e não pode ser alterado.</p>'}
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">E-mail (Opcional)</label>
                    <input type="email" name="email" value="${r.email||""}" class="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500 outline-none">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Data de Nascimento (Opcional)</label>
                    <input type="date" name="birthDate" value="${r.birthDate||""}" class="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500 outline-none">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Anotações</label>
                    <textarea name="notes" rows="3" class="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500 outline-none">${r.notes||""}</textarea>
                </div>
            </form>
        `,t){const o=document.getElementById("input-phone");o&&(o.oninput=n=>n.target.value=Dt(n.target.value))}}else if(e==="appointments"){const o=new Date,n=P.history.filter(i=>{const l=new Date(i.date);return i.type==="appointment"&&l>=o&&i.status!=="cancelled"&&i.status!=="cancelado"&&i.status!=="completed"&&i.status!=="finalizado"});if(n.sort((i,l)=>new Date(i.date)-new Date(l.date)),!n.length){a.innerHTML=`<div class="text-center py-10">
                <p class="text-gray-400 mb-4">Nenhum agendamento programado.</p>
                <button onclick="document.getElementById('genericModal').style.display='none'; navigateTo('agenda-section')" class="text-indigo-600 font-bold hover:underline">Ir para Agenda</button>
            </div>`;return}a.innerHTML=`
            <div class="space-y-3">
                ${n.map(i=>`
                    <div onclick="document.getElementById('genericModal').style.display='none'; navigateTo('agenda-section', { targetDate: '${i.date}', scrollToAppointmentId: '${i.id}' })" 
                         class="flex items-center justify-between p-4 border-l-4 border-indigo-500 bg-white shadow-sm rounded-r-lg hover:shadow-md transition-all cursor-pointer hover:bg-indigo-50 group">
                        <div>
                            <p class="font-bold text-gray-800">${i.description}</p>
                            <p class="text-sm text-gray-600 mt-1">
                                📅 ${va(i.date)}
                            </p>
                            <span class="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded mt-2 inline-block font-medium">
                                ${i.status==="confirmed"?"Confirmado":"Agendado"}
                            </span>
                        </div>
                        <div class="p-2 text-indigo-400 group-hover:text-indigo-600 transition-colors">
                            <svg class="w-6 h-6 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 12h14"/></svg>
                        </div>
                    </div>
                `).join("")}
            </div>
        `}else if(e==="history"){const o=[...P.history].filter(l=>l.type==="appointment"&&(l.status==="completed"||l.status==="finalizado")).sort((l,d)=>new Date(d.date)-new Date(l.date)),n=o.slice(0,P.historyLimit),i=o.length>P.historyLimit;if(!n.length){a.innerHTML='<div class="text-center text-gray-400 mt-10">Nenhum histórico de agendamento finalizado.</div>';return}a.innerHTML=`
            <div class="space-y-3">
                ${n.map(l=>`
                    <div onclick="document.getElementById('genericModal').style.display='none'; navigateTo('comandas-section', { selectedAppointmentId: '${l.sourceId||l.id}' })" 
                         class="flex items-center justify-between p-3 border rounded bg-white cursor-pointer hover:bg-indigo-50 hover:border-indigo-300 shadow-sm transition-all group">
                        <div class="flex items-center gap-3">
                            <div class="p-2 rounded-full bg-green-100 text-green-600">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <p class="text-sm font-bold text-gray-800">${l.description}</p>
                                <div class="flex flex-col text-xs text-gray-500 mt-1">
                                    <span>📅 ${va(l.date)}</span>
                                    <span class="text-gray-600 font-medium">👤 ${l.professionalName||l.workerName||"Profissional"}</span>
                                </div>
                            </div>
                        </div>
                        <div class="text-right">
                             <span class="block text-sm font-bold text-gray-800">
                                ${Ii(l.value)}
                             </span>
                             <span class="text-[10px] text-indigo-500 font-medium group-hover:underline">Ver Comanda</span>
                        </div>
                    </div>
                `).join("")}
            </div>
            
            ${i?`
                <div class="text-center mt-4 pt-2">
                    <button onclick="window.loadMoreHistory()" class="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
                        Carregar mais antigos...
                    </button>
                    <p class="text-xs text-gray-400 mt-2">Mostrando ${n.length} de ${o.length}</p>
                </div>
            `:""}
        `}else if(e==="loyalty"){const o=P.establishment.loyaltyProgram;if(!o||!o.enabled){a.innerHTML='<div class="text-center text-gray-400 mt-10">Programa de fidelidade não ativo neste estabelecimento.</div>';return}const n=r.loyaltyPoints||0,i=o.type==="visit"?`Regra: Ganhe ${o.pointsPerVisit||1} pontos a cada visita`:`Regra: Ganhe 1 ponto a cada R$ ${o.pointsPerCurrency||10}`,l=o.tiers||o.rewards||[];a.innerHTML=`
            <div class="text-center mb-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl p-6 shadow-lg">
                <p class="text-xs uppercase tracking-widest opacity-80">Saldo Atual</p>
                <h3 class="text-5xl font-extrabold mt-2">${n}</h3>
                <p class="text-sm opacity-80">Pontos</p>
                <div class="mt-4 pt-4 border-t border-white/20">
                    <p class="text-xs font-medium bg-white/20 inline-block px-3 py-1 rounded-full">${i}</p>
                </div>
            </div>

            <h4 class="font-bold text-gray-700 mb-3 text-sm uppercase">Prêmios Disponíveis</h4>
            <div class="space-y-2">
                ${l.map(d=>{const c=d.costPoints||d.points||0,m=n>=c,b=d.reward||d.name;return`
                        <div class="flex justify-between items-center p-3 border rounded ${m?"bg-green-50 border-green-200":"bg-gray-50 opacity-70"}">
                            <div>
                                <p class="font-bold text-gray-800">${h(b)}</p>
                                <p class="text-xs text-gray-500">${c} pontos necessários</p>
                            </div>
                            <button onclick="window.handleRedeem('${c}', '${h(b)}')" ${m?"":"disabled"} 
                                class="px-3 py-1 rounded text-xs font-bold ${m?"bg-green-600 text-white hover:bg-green-700":"bg-gray-300 text-gray-500 cursor-not-allowed"}">
                                Resgatar
                            </button>
                        </div>
                    `}).join("")}
                ${l.length===0?'<p class="text-center text-gray-500 text-sm">Nenhum prémio cadastrado.</p>':""}
            </div>
        `,window.handleRedeem=async(d,c)=>{if(await j("Resgatar",`Trocar ${d} pontos por "${c}"?`))try{await Rr(u.establishmentId,r.phone,d,c),g("Sucesso","Resgate realizado!","success"),r.loyaltyPoints=(r.loyaltyPoints||0)-parseInt(d),P.history.unshift({type:"loyalty",description:`Resgate: ${c}`,date:new Date().toISOString(),value:-d,isPoints:!0,status:"completed"}),It("loyalty",!1),me()}catch(m){g("Erro",m.message||"Erro ao resgatar","error")}}}},Bi=async()=>{const e=document.getElementById("form-client"),t=new FormData(e),a=t.get("phone").replace(/\D/g,"");if(a.length<10){g("Erro","Telefone inválido","error");return}const s={name:t.get("name"),phone:a,email:t.get("email"),birthDate:t.get("birthDate"),notes:t.get("notes"),establishmentId:u.establishmentId};try{await Nr(s),g("Sucesso","Cliente salvo!","success"),document.getElementById("genericModal").style.display="none",me()}catch(r){g("Erro","Erro ao salvar cliente","error"),console.error(r)}},Di=async()=>{if(await j("Excluir","Tem certeza? Isso apagará o histórico deste cliente."))try{const e=P.currentClient.id||ps(P.currentClient.phone);await Go(e),g("Sucesso","Cliente removido","success"),document.getElementById("genericModal").style.display="none",setTimeout(()=>me(),500)}catch(e){g("Erro","Erro ao remover","error"),console.error(e)}},vs=()=>{const e=document.getElementById("clients-grid");if(e){if(e.innerHTML="",P.clients.length===0){e.innerHTML=`
            <div class="col-span-full flex flex-col items-center justify-center py-20 text-gray-400">
                <svg class="w-16 h-16 mb-4 opacity-20" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path></svg>
                <p class="text-lg">Nenhum cliente encontrado.</p>
                <div class="mt-2 text-sm text-gray-500">
                    <button onclick="window.openNewClient()" class="text-indigo-600 font-bold hover:underline">Cadastrar novo</button>
                </div>
            </div>
        `;return}P.clients.forEach(t=>{const a=document.createElement("div"),s=t.id||ps(t.phone),r=P.selectedClients.has(s);a.id=`card-${s}`,a.className=`bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-all cursor-pointer flex items-center justify-between group relative ${r?"ring-2 ring-indigo-500 bg-indigo-50":""}`,a.onclick=l=>{l.target.type!=="checkbox"&&(P.selectionMode?bs(s):fs(t))};const o=t.lastVisit||t.lastServiceDate||t.lastAppointmentDate;let n="Nunca visitou";if(o){const l=va(o);l&&l!=="-"&&(n=`Última visita: ${l.split(" ")[0]}`)}const i=P.selectionMode?`
            <div class="absolute top-2 left-2 z-10" onclick="event.stopPropagation()">
                <input type="checkbox" class="client-checkbox w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500" 
                    ${r?"checked":""} 
                    onchange="window.toggleClientSelection('${s}')">
            </div>
        `:"";a.innerHTML=`
            ${i}
            <div class="flex items-center gap-4 ${P.selectionMode?"ml-6":""}">
                <div class="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow shrink-0">
                    ${t.name.charAt(0).toUpperCase()}
                </div>
                <div>
                    <h3 class="font-bold text-gray-800 text-sm md:text-base group-hover:text-indigo-600 transition-colors line-clamp-1">${t.name}</h3>
                    <p class="text-xs text-gray-500">${Dt(t.phone)}</p>
                    <p class="text-[10px] text-gray-400 mt-1 flex items-center gap-1">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        ${n}
                    </p>
                </div>
            </div>
            <div class="text-right">
                <span class="block text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg">
                    ${t.loyaltyPoints||0} pts
                </span>
            </div>
        `,e.appendChild(a)})}},me=async(e="")=>{const t=document.getElementById("clients-grid");t&&(t.innerHTML='<div class="col-span-full flex justify-center py-10"><div class="loader"></div></div>');const a=e||document.getElementById("search-input")?.value||"";try{if(P.clients=await it(u.establishmentId,a,100,P.filters),P.filters.inactiveDays){const s=parseInt(P.filters.inactiveDays,10);if(!isNaN(s)&&s>0){const r=new Date,o=new Date(r.setDate(r.getDate()-s));P.clients=P.clients.filter(n=>{const i=n.lastVisit||n.lastServiceDate;if(!i)return!0;const l=new Date(i);return isNaN(l.getTime())?!0:l<o})}}vs(),Ra()}catch(s){console.error(s),t&&(t.innerHTML='<p class="col-span-full text-center text-red-500">Erro ao carregar lista.</p>')}},Mi=async()=>{const e=document.getElementById("content");e.innerHTML=`
        <div class="flex flex-col h-full bg-gray-50">
            <header id="header-normal" class="bg-white border-b sticky top-0 z-20 shadow-sm transition-all">
                <div class="px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <h1 class="text-2xl font-bold text-gray-800">Clientes</h1>
                    
                    <div class="flex flex-wrap w-full md:w-auto gap-3 items-center">
                        <div class="relative flex-grow md:flex-grow-0 md:w-64">
                            <input type="text" id="search-input" placeholder="Buscar nome ou telefone..." 
                                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none">
                            <svg class="w-4 h-4 text-gray-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                        </div>
                        
                        <button onclick="window.toggleSelectionMode()" class="bg-white text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 border border-gray-300 flex items-center gap-2 transition-colors h-[38px] text-sm font-medium">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
                            Selecionar
                        </button>

                        <button onclick="window.toggleFilterPanel()" class="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 border border-gray-200 flex items-center gap-2 transition-colors h-[38px]">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
                            <span class="hidden sm:inline">Filtros</span>
                        </button>

                        <button onclick="window.openNewClient()" class="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 shadow-sm flex items-center gap-2 text-sm whitespace-nowrap h-[38px]">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
                            Novo
                        </button>
                    </div>
                </div>
            </header>

            <header id="header-selection" class="hidden bg-indigo-50 border-b border-indigo-100 sticky top-0 z-30 shadow-md transition-all">
                <div class="px-6 py-4 flex items-center justify-between">
                    <div class="flex items-center gap-4">
                        <button onclick="window.toggleSelectionMode()" class="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-indigo-100">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                        <span id="selected-count" class="font-bold text-indigo-900 text-lg">0 selecionado(s)</span>
                    </div>
                    <button id="btn-bulk-delete" onclick="window.handleBulkDelete()" class="bg-red-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-700 shadow-sm flex items-center gap-2 text-sm transition-colors">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        Excluir Selecionados
                    </button>
                </div>
            </header>

            <div id="filter-panel" class="hidden border-t bg-gray-50 px-6 py-4 transition-all duration-300">
                <div class="flex flex-wrap items-end gap-4">
                    <div class="flex flex-col gap-1">
                        <span class="text-xs font-semibold text-gray-500 uppercase">Fidelidade</span>
                        <label class="flex items-center gap-2 bg-white px-3 py-2 rounded border border-gray-200 cursor-pointer hover:border-indigo-300 h-[38px]">
                            <input type="checkbox" id="filter-loyalty" class="text-indigo-600 rounded focus:ring-indigo-500">
                            <span class="text-sm text-gray-700">Com Pontos</span>
                        </label>
                    </div>
                    <div class="flex flex-col gap-1">
                        <label class="text-xs font-semibold text-gray-500 uppercase">Aniversariantes</label>
                        <select id="filter-month" class="bg-white border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none h-[38px] min-w-[140px]">
                            <option value="">Todos os meses</option>
                            <option value="01">Janeiro</option>
                            <option value="02">Fevereiro</option>
                            <option value="03">Março</option>
                            <option value="04">Abril</option>
                            <option value="05">Maio</option>
                            <option value="06">Junho</option>
                            <option value="07">Julho</option>
                            <option value="08">Agosto</option>
                            <option value="09">Setembro</option>
                            <option value="10">Outubro</option>
                            <option value="11">Novembro</option>
                            <option value="12">Dezembro</option>
                        </select>
                    </div>
                    <div class="flex flex-col gap-1">
                        <label class="text-xs font-semibold text-gray-500 uppercase">Ausentes há (+dias)</label>
                        <input type="number" id="filter-inactive" placeholder="Ex: 30" min="0" 
                            class="w-32 bg-white border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none h-[38px]">
                    </div>
                    <div class="flex gap-2 ml-auto">
                        <button onclick="window.clearFilters()" class="text-sm text-gray-500 hover:text-gray-700 px-3 py-2 underline h-[38px]">Limpar</button>
                        <button onclick="window.applyFilters()" class="bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded hover:bg-indigo-700 h-[38px] shadow-sm">Aplicar Filtros</button>
                    </div>
                </div>
            </div>

            <div class="flex-1 overflow-y-auto p-4 md:p-6">
                <div id="clients-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    </div>
            </div>
        </div>
    `,window.openNewClient=()=>fs(null),window.toggleFilterPanel=Ci,window.toggleSelectionMode=gs,window.toggleClientSelection=bs,window.handleBulkDelete=Li,window.applyFilters=Ti,window.clearFilters=Pi,window.navigateTo=ae;const t=document.getElementById("search-input");t&&t.addEventListener("input",a=>{clearTimeout(P.searchTimeout),P.searchTimeout=setTimeout(()=>{me(a.target.value)},400)});try{const[a]=await Promise.all([ke(u.establishmentId),me()]);P.establishment=a}catch(a){console.error("Erro inicialização clientes",a)}},rt=e=>w(`/api/financial/natures/${e}`),Ai=e=>w("/api/financial/natures",{method:"POST",body:JSON.stringify(e)}),Ni=e=>w(`/api/financial/natures/${e}`,{method:"DELETE"}),nt=e=>w(`/api/financial/cost-centers/${e}`),qi=e=>w("/api/financial/cost-centers",{method:"POST",body:JSON.stringify(e)}),Ri=e=>w(`/api/financial/cost-centers/${e}`,{method:"DELETE"}),hs=(e,t)=>w(`/api/financial/${e}`,{method:"POST",body:JSON.stringify(t)}),xs=(e,t={})=>{let a=`/api/financial/${e}`;const s=new URLSearchParams;t.establishmentId&&s.append("establishmentId",t.establishmentId),t.startDate&&s.append("startDate",t.startDate),t.endDate&&s.append("endDate",t.endDate),t.natureId&&s.append("natureId",t.natureId),t.costCenterId&&s.append("costCenterId",t.costCenterId),t.status&&s.append("status",t.status);const r=s.toString();return r&&(a+=`?${r}`),w(a)},ys=(e,t,a)=>w(`/api/financial/${e}/${t}`,{method:"PUT",body:JSON.stringify(a)}),ws=(e,t)=>w(`/api/financial/${e}/${t}`,{method:"DELETE"}),ks=(e,t,a)=>w(`/api/financial/${e}/${t}/status`,{method:"PATCH",body:JSON.stringify({status:"paid",paymentDate:a})}),Fi=e=>hs("payables",e),ji=e=>xs("payables",e),Hi=(e,t)=>ys("payables",e,t),Oi=e=>ws("payables",e),zi=(e,t)=>ks("payables",e,t),Vi=e=>hs("receivables",e),Ui=e=>xs("receivables",e),_i=(e,t)=>ys("receivables",e,t),Ji=e=>ws("receivables",e),Wi=(e,t)=>ks("receivables",e,t),Gi=(e,t,a)=>w(`/api/financial/cash-flow?establishmentId=${e}&startDate=${t}&endDate=${a}`),Yi=e=>w(`/api/financial/today-summary/${e}`),ve=document.getElementById("content"),ea={monday:"Segunda",tuesday:"Terça",wednesday:"Quarta",thursday:"Quinta",friday:"Sexta",saturday:"Sábado",sunday:"Domingo"},Qi={indigo:{name:"Padrão (Índigo)",main:"#4f46e5"},blue:{name:"Azul",main:"#2563eb"},sky:{name:"Céu",main:"#0284c7"},teal:{name:"Verde Água",main:"#0d9488"},emerald:{name:"Esmeralda",main:"#059669"},green:{name:"Verde",main:"#16a34a"},lime:{name:"Lima",main:"#65a30d"},amber:{name:"Âmbar",main:"#d97706"},orange:{name:"Laranja",main:"#ea580c"},red:{name:"Vermelho",main:"#dc2626"},rose:{name:"Rosa",main:"#e11d48"},pink:{name:"Pink",main:"#db2777"},fuchsia:{name:"Fúcsia",main:"#c026d3"},purple:{name:"Roxo",main:"#7c3aed"},violet:{name:"Violeta",main:"#8b5cf6"},gray:{name:"Cinza",main:"#4b5563"},black:{name:"Preto",main:"#111827"}},Ss=[{id:"personal-data",icon:"M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",label:"Dados Gerais"},{id:"branding",icon:"M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z",label:"Identidade e Cores"},{id:"booking",icon:"M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2H5a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",label:"Agendamento Online"},{id:"working-hours",icon:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",label:"Horário de Funcionamento"},{id:"loyalty",icon:"M5 5a2 2 0 012-2h10a2 2 0 012 2v1h2a1 1 0 011 1v3a1 1 0 01-1 1h-2v1a2 2 0 01-2 2H7a2 2 0 01-2-2v-1H3a1 1 0 01-1-1V7a1 1 0 011-1h2V5z",label:"Plano de Fidelidade"},{id:"financial",icon:"M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8a1 1 0 011 1v4a1 1 0 11-2 0v-4a1 1 0 011-1zm0 0a1 1 0 001-1V5a1 1 0 10-2 0v2a1 1 0 001 1zm0 0a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1z",label:"Integração Financeira"},{id:"change-password",icon:"M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",label:"Alterar senha"},{id:"change-email",icon:"M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207",label:"Alterar E-mail de Acesso"},{id:"support",icon:"M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z",label:"Suporte e Ajuda"},{id:"cancellation",icon:"M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z",label:"Cancelar Assinatura"}];let J=null;function go(e,t,a){return new Promise((s,r)=>{const o=new FileReader;o.readAsDataURL(e),o.onload=n=>{const i=new Image;i.src=n.target.result,i.onload=()=>{const l=document.createElement("canvas");let d=i.width,c=i.height;d>t&&(c*=t/d,d=t),l.width=d,l.height=c,l.getContext("2d").drawImage(i,0,0,d,c);const b=e.type==="image/png"&&t<500?"image/png":"image/jpeg";s(l.toDataURL(b,a))},i.onerror=l=>r(l)},o.onerror=n=>r(n)})}function Ie(e,t=null){let a='<option value="">-- Selecione (Opcional) --</option>';const s=n=>{const i=new Map,l=[];return n&&(n.forEach(d=>i.set(d.id,{...d,children:[]})),i.forEach(d=>{d.parentId&&i.has(d.parentId)?i.get(d.parentId).children.push(d):l.push(d)})),l},r=(n,i="")=>{const l=n.id===t?"selected":"";a+=`<option value="${n.id}" ${l}>${i}${h(n.name)}</option>`,n.children.forEach(d=>r(d,i+"— "))};return s(e).forEach(n=>r(n)),a}async function He(e,t){const a=t.target.querySelector('button[type="submit"]');a&&(a.disabled=!0,a.textContent="A Salvar...");try{const s=J||await ke(u.establishmentId),r=[],{ownerName:o,...n}=e;if(o&&o!==u.userName){const l=V.currentUser;l&&r.push(As(l,{displayName:o}).then(()=>{u.userName=o}))}const i={...s,...n};if(r.push(St(u.establishmentId,i)),await Promise.all(r),J=i,g("Sucesso","Definições salvas com sucesso! A página será recarregada para aplicar o novo tema.","success"),n.themeColor)setTimeout(()=>window.location.reload(),1500);else{const l=document.getElementById("panelEstablishmentName");n.name&&l&&(l.textContent=n.name,u.establishmentName=n.name)}}catch(s){g("Erro",`Não foi possível salvar: ${s.message}`,"error")}finally{a&&(a.disabled=!1,a.textContent="Salvar")}}function Xi(e,t){const a=h(e.name||""),s=h(e.phone||""),r=h(e.document||""),o=h(e.email||""),n=h(e.address||""),i=h(e.website||""),l=h(u.userName||"");t.innerHTML=`
        <div class="bg-white p-4 md:p-6 rounded-lg shadow-md">
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-xl font-bold text-gray-800">Dados Gerais e de Contato</h3>
                <button type="submit" form="personal-data-form" class="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600">Salvar</button>
            </div>
            <form id="personal-data-form" class="space-y-4">
                <div>
                    <label for="ownerName" class="block text-sm font-medium text-gray-700">Seu nome (Dono)</label>
                    <input type="text" id="ownerName" class="mt-1 w-full p-2 border border-gray-300 rounded-md" value="${l}">
                </div>
                <div>
                    <label for="establishmentName" class="block text-sm font-medium text-gray-700">Nome do Salão ou Barbearia</label>
                    <input type="text" id="establishmentName" class="mt-1 w-full p-2 border border-gray-300 rounded-md" value="${a}">
                </div>
                <div>
                    <label for="establishmentPhone" class="block text-sm font-medium text-gray-700">Telefone Principal</label>
                    <input type="tel" id="establishmentPhone" class="mt-1 w-full p-2 border border-gray-300 rounded-md" value="${s}">
                </div>
                <div>
                    <label for="establishmentCnpjCpf" class="block text-sm font-medium text-gray-700">CNPJ / CPF</label>
                    <input type="text" id="establishmentCnpjCpf" value="${r}" class="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm">
                </div>
                <div>
                    <label for="establishmentEmail" class="block text-sm font-medium text-gray-700">E-mail de Contato</label>
                    <input type="email" id="establishmentEmail" value="${o}" class="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm">
                </div>
                <div>
                    <label for="establishmentAddress" class="block text-sm font-medium text-gray-700">Endereço Completo</label>
                    <input type="text" id="establishmentAddress" value="${n}" class="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm">
                </div>
                <div>
                    <label for="establishmentWebsite" class="block text-sm font-medium text-gray-700">Website</label>
                    <input type="url" id="establishmentWebsite" value="${i}" class="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm">
                </div>
            </form>
        </div>
    `,t.querySelector("#personal-data-form").addEventListener("submit",d=>{d.preventDefault();const c={ownerName:t.querySelector("#ownerName").value,name:t.querySelector("#establishmentName").value,phone:t.querySelector("#establishmentPhone").value,document:t.querySelector("#establishmentCnpjCpf").value,email:t.querySelector("#establishmentEmail").value,address:t.querySelector("#establishmentAddress").value,website:t.querySelector("#establishmentWebsite").value};He(c,d)})}function Zi(e,t){t.innerHTML=`
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
    `,t.querySelector("#change-password-form").addEventListener("submit",async a=>{a.preventDefault();const s=t.querySelector("#newPassword").value,r=t.querySelector("#confirmPassword").value;if(s!==r){g("Erro","As senhas não coincidem.","error");return}const o=t.querySelector('button[form="change-password-form"]');o.disabled=!0,o.textContent="A Salvar...";try{const n=V.currentUser;if(n)await Ms(n,s),g("Sucesso","Senha alterada com sucesso!","success"),a.target.reset();else throw new Error("Nenhum usuário autenticado encontrado.")}catch(n){g("Erro",`Não foi possível alterar a senha: ${n.message}`,"error")}finally{o.disabled=!1,o.textContent="Salvar Nova Senha"}})}function Ki(e,t){t.innerHTML=`
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
    `,t.querySelector("#change-email-form").addEventListener("submit",async a=>{a.preventDefault();const s=t.querySelector("#newEmail").value,r=t.querySelector("#currentPassword").value;if(!s||!r){g("Erro","Preencha todos os campos.","error");return}const o=t.querySelector('button[form="change-email-form"]');o.disabled=!0,o.textContent="A verificar...";try{const n=V.currentUser;if(!n)throw new Error("Usuário não autenticado.");const i=Ps.credential(n.email,r);await Bs(n,i),o.textContent="A enviar link...",await Ds(n,s),o.textContent="A atualizar BD...",await nr(u.establishmentId,s),g("Sucesso","Link de verificação enviado! Por favor, verifique seu **novo e-mail** para confirmar a alteração.","success"),a.target.reset()}catch(n){let i="Não foi possível alterar o e-mail.";n.code==="auth/wrong-password"?i="A senha atual está incorreta.":n.code==="auth/email-already-in-use"?i="Este e-mail já está sendo usado por outra conta.":n.code==="auth/operation-not-allowed"?i="A troca de e-mail precisa ser habilitada no console do Firebase.":i=n.message,g("Erro",i,"error")}finally{o.disabled=!1,o.textContent="Salvar Novo E-mail"}})}function el(e,t){const a=h(e.welcomeMessage||"");t.innerHTML=`
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
                        <input type="text" id="establishmentWelcomeMessage" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="Ex: Simples, rápido e à sua medida." value="${a}">
                    </div>
                </div>

                <div class="border-t pt-4 mt-4">
                    <h4 class="text-lg font-semibold text-gray-800 mb-2">Tema do Painel (Sistema)</h4>
                    <p class="text-sm text-gray-600 mb-4">Escolha a cor dos menus e botões do <strong>seu</strong> painel de gestão.</p>
                    <div id="color-palette-container" class="flex flex-wrap gap-4"></div>
                </div>
            </form>
        </div>
    `,t.querySelector("#establishmentLogoBase64").value=e.logo||"",t.querySelector("#establishmentBackgroundImageBase64").value=e.backgroundImage||"",$s(e.themeColor||"indigo",t),t.querySelector("#establishmentLogoButton").onclick=()=>t.querySelector("#establishmentLogoInput").click(),t.querySelector("#establishmentLogoInput").onchange=async s=>{const r=s.target.files[0];if(r)try{const o=await go(r,300,.9);t.querySelector("#establishmentLogoPreview").src=o,t.querySelector("#establishmentLogoBase64").value=o}catch(o){console.error("Erro ao processar logo:",o),g("Erro","Formato de imagem inválido ou corrompido.","error")}},t.querySelector("#establishmentBgButton").onclick=()=>t.querySelector("#establishmentBgInput").click(),t.querySelector("#establishmentBgInput").onchange=async s=>{const r=s.target.files[0];if(r){const o=t.querySelector("#establishmentBgButton"),n=o.textContent;try{o.textContent="A processar...",o.disabled=!0;const i=await go(r,1280,.7);t.querySelector("#establishmentBgPreview").src=i,t.querySelector("#establishmentBgPreview").classList.remove("hidden"),t.querySelector("#establishmentBgPlaceholder").classList.add("hidden"),t.querySelector("#establishmentBackgroundImageBase64").value=i}catch(i){console.error("Erro ao processar fundo:",i),g("Erro","Não foi possível processar esta imagem. Tente outra.","error")}finally{o.textContent=n,o.disabled=!1}}},t.querySelector("#establishmentBgRemoveBtn").onclick=()=>{t.querySelector("#establishmentBgPreview").src="",t.querySelector("#establishmentBgPreview").classList.add("hidden"),t.querySelector("#establishmentBgPlaceholder").classList.remove("hidden"),t.querySelector("#establishmentBackgroundImageBase64").value=""},t.querySelector("#branding-form").addEventListener("submit",s=>{s.preventDefault();const r={logo:t.querySelector("#establishmentLogoBase64").value,welcomeMessage:t.querySelector("#establishmentWelcomeMessage").value,backgroundImage:t.querySelector("#establishmentBackgroundImageBase64").value,primaryColor:t.querySelector("#establishmentPrimaryColorInput").value,textColor:t.querySelector("#establishmentTextColorInput").value,themeColor:t.querySelector("#establishmentThemeColor").value};He(r,s)})}function tl(e,t){const a=e.urlId||u.establishmentId,s="https://www.kairosagenda.com.br";let r=window.location.origin;(r.includes("localhost")||r.includes("capacitor://")||r.includes("127.0.0.1")||r.includes("192.168"))&&(r=s);const o=h(`${r}/agendar?id=${a}`),n=e.publicBookingEnabled||!1,i=n?"Agendamento Online ATIVO":"Agendamento Online INATIVO",l=n?"text-green-600":"text-red-600";t.innerHTML=`
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
                    <span id="publicBookingStatusText" class="text-sm font-semibold ${l}">
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
    `,t.querySelector("#copyBookingLinkBtn").addEventListener("click",()=>{const d=t.querySelector("#publicBookingLink");if(navigator.clipboard&&window.isSecureContext)navigator.clipboard.writeText(d.value).then(()=>{g("Sucesso","Link copiado para a área de transferência!","success")}).catch(c=>{g("Erro","Não foi possível copiar o link.","error")});else try{d.select(),document.execCommand("copy"),d.blur(),g("Sucesso","Link copiado para a área de transferência!","success")}catch{g("Erro","Não foi possível copiar o link. Por favor, copie manualmente.","error")}}),t.querySelector("#publicBookingToggle").addEventListener("change",async d=>{const c=d.target.checked,m=t.querySelector("#publicBookingStatusText");c?(m.textContent="Agendamento Online ATIVO",m.className="text-sm font-semibold text-green-600"):(m.textContent="Agendamento Online INATIVO",m.className="text-sm font-semibold text-red-600");try{d.target.disabled=!0,await rr(u.establishmentId,c),J.publicBookingEnabled=c,g("Sucesso",`Agendamento online ${c?"ativado":"desativado"}!`,"success")}catch(b){g("Erro",`Não foi possível alterar o status: ${b.message}`,"error"),d.target.checked=!c,c?(m.textContent="Agendamento Online ATIVO",m.className="text-sm font-semibold text-green-600"):(m.textContent="Agendamento Online INATIVO",m.className="text-sm font-semibold text-red-600")}finally{d.target.disabled=!1}}),ll(e.slotInterval||30,t),t.querySelector("#booking-form").addEventListener("submit",d=>{d.preventDefault();const c={slotInterval:parseInt(t.querySelector("#establishmentSlotInterval").value,10)};He(c,d)})}function al(e,t){t.innerHTML=`
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
    `;const a=t.querySelector("#establishmentTimezone");if(e.timezone)a.value=e.timezone;else try{const o=Intl.DateTimeFormat().resolvedOptions().timeZone;Array.from(a.options).some(i=>i.value===o)?a.value=o:a.value="America/Sao_Paulo"}catch{a.value="America/Sao_Paulo"}const s=t.querySelector("#establishmentWorkingHoursContainer"),r=e.workingHours||{};Object.keys(ea).forEach(o=>{const n=r[o]||{},i=ea[o],l=n.active!==!1,d=document.createElement("div");d.className=`day-schedule-card p-4 rounded-lg ${l?"bg-gray-50":"bg-gray-100 disabled"}`,d.innerHTML=`
            <div class="flex justify-between items-center mb-3">
                <span class="font-bold text-gray-800">${i}</span>
                <label class="flex items-center cursor-pointer">
                    <div class="relative">
                        <input type="checkbox" id="est-${o}-active" class="sr-only" ${l?"checked":""}>
                        <div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full"></div>
                    </div>
                </label>
            </div>
            <div class="time-inputs space-y-2">
                <div class="flex items-center gap-2"><label class="w-16">Início:</label><input type="time" id="est-${o}-start" value="${n.start||"09:00"}" class="w-full rounded-md border-gray-300 shadow-sm text-sm p-1"></div>
                <div class="flex items-center gap-2"><label class="w-16">Fim:</label><input type="time" id="est-${o}-end" value="${n.end||"18:00"}" class="w-full rounded-md border-gray-300 shadow-sm text-sm p-1"></div>
                <div class="flex items-center gap-2"><label class="w-16">Intervalo:</label><input type="time" id="est-${o}-breakStart" value="${n.breakStart||"12:00"}" class="w-full rounded-md border-gray-300 shadow-sm text-sm p-1"></div>
                <div class="flex items-center gap-2"><label class="w-16">Fim Int.:</label><input type="time" id="est-${o}-breakEnd" value="${n.breakEnd||"13:00"}" class="w-full rounded-md border-gray-300 shadow-sm text-sm p-1"></div>
            </div>`,s.appendChild(d)}),s.addEventListener("change",o=>{const n=o.target.closest('.day-schedule-card input[type="checkbox"]');n&&n.closest(".day-schedule-card").classList.toggle("disabled",!n.checked)}),t.querySelector("#working-hours-form").addEventListener("submit",o=>{o.preventDefault();const n={};Object.keys(ea).forEach(l=>{n[l]={active:t.querySelector(`#est-${l}-active`).checked,start:t.querySelector(`#est-${l}-start`).value,end:t.querySelector(`#est-${l}-end`).value,breakStart:t.querySelector(`#est-${l}-breakStart`).value,breakEnd:t.querySelector(`#est-${l}-breakEnd`).value}});const i=t.querySelector("#establishmentTimezone").value;He({workingHours:n,timezone:i},o)})}function ol(e,t){const a=e.loyaltyProgram||{},s=a.type||"amount",r=a.pointsPerCurrency||10,o=a.pointsPerVisit||1;t.innerHTML=`
        <div class="bg-white p-4 md:p-6 rounded-lg shadow-md">
             <div class="flex justify-between items-center mb-6">
                 <h3 class="text-xl font-bold text-gray-800">Plano de Fidelidade</h3>
                 <button type="submit" form="loyalty-form" class="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600">Salvar</button>
             </div>
             <form id="loyalty-form" class="space-y-6">
                 
                 <div class="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-100">
                     <label for="loyaltyEnabled" class="flex items-center cursor-pointer w-full">
                         <div class="relative"><input type="checkbox" id="loyaltyEnabled" class="sr-only"><div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full"></div></div>
                         <span class="ml-3 font-medium text-gray-700">Habilitar Programa de Fidelidade</span>
                     </label>
                 </div>

                 <div>
                    <label class="block text-sm font-bold text-gray-700 mb-2">Como o cliente ganha pontos?</label>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <label class="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-indigo-50 transition-colors ${s==="amount"?"border-indigo-500 bg-indigo-50 ring-1 ring-indigo-500":""}">
                            <input type="radio" name="loyaltyType" value="amount" class="form-radio text-indigo-600 h-4 w-4" ${s==="amount"?"checked":""}>
                            <div class="ml-3">
                                <span class="block text-sm font-medium text-gray-900">Por Valor Gasto (R$)</span>
                                <span class="block text-xs text-gray-500">Ex: 1 ponto a cada R$ 10,00</span>
                            </div>
                        </label>

                        <label class="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-indigo-50 transition-colors ${s==="visit"?"border-indigo-500 bg-indigo-50 ring-1 ring-indigo-500":""}">
                            <input type="radio" name="loyaltyType" value="visit" class="form-radio text-indigo-600 h-4 w-4" ${s==="visit"?"checked":""}>
                            <div class="ml-3">
                                <span class="block text-sm font-medium text-gray-900">Por Visita Realizada</span>
                                <span class="block text-xs text-gray-500">Ex: 10 pontos por atendimento</span>
                            </div>
                        </label>
                    </div>
                 </div>

                 <div id="loyalty-config-amount" class="${s==="amount"?"":"hidden"} p-4 bg-blue-50 rounded-lg border border-blue-100">
                     <label for="loyaltyPointsPerCurrency" class="block text-sm font-medium text-blue-800">Regra de Conversão (Valor)</label>
                     <p class="text-xs text-blue-600 mb-2">Quanto o cliente precisa gastar para ganhar 1 ponto?</p>
                     <div class="flex items-center gap-2">
                         <span class="text-gray-600 font-medium">1 Ponto a cada R$</span>
                         <input type="number" id="loyaltyPointsPerCurrency" value="${r}" min="1" step="0.01" class="w-28 p-2 border border-blue-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                     </div>
                 </div>

                 <div id="loyalty-config-visit" class="${s==="visit"?"":"hidden"} p-4 bg-purple-50 rounded-lg border border-purple-100">
                     <label for="loyaltyPointsPerVisit" class="block text-sm font-medium text-purple-800">Regra de Conversão (Visita)</label>
                     <p class="text-xs text-purple-600 mb-2">Quantos pontos o cliente ganha ao finalizar um atendimento?</p>
                     <div class="flex items-center gap-2">
                         <span class="text-gray-600 font-medium">Ganhar</span>
                         <input type="number" id="loyaltyPointsPerVisit" value="${o}" min="1" step="1" class="w-20 p-2 border border-purple-300 rounded-md focus:ring-purple-500 focus:border-purple-500 text-center font-bold">
                         <span class="text-gray-600 font-medium">pontos por visita</span>
                     </div>
                 </div>

                 <hr class="border-gray-200">

                 <div>
                     <label class="block text-sm font-bold text-gray-700 mb-2">Prémios e Recompensas</label>
                     <p class="text-xs text-gray-500 mb-3">Defina quantos pontos são necessários para resgatar cada prémio.</p>
                     
                     <div class="hidden md:grid grid-cols-[1fr_2fr_1fr_auto] items-center gap-2 mb-1 text-xs font-bold text-gray-500 px-2">
                         <span>Custo (Pontos)</span>
                         <span>Descrição do Prémio</span>
                         <span>Valor Equivalente (R$)</span>
                         <span></span>
                     </div>
                     
                     <div id="loyaltyTiersContainer" class="space-y-4 md:space-y-2"></div>
                     
                     <button type="button" id="add-loyalty-tier" class="mt-3 flex items-center gap-1 text-sm font-bold text-indigo-600 hover:text-indigo-800 py-2 px-3 rounded-md hover:bg-indigo-50 transition-colors">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                        Adicionar Prémio
                     </button>
                 </div>
             </form>
        </div>
    `,t.querySelector("#loyaltyEnabled").checked=a.enabled||!1;const n=t.querySelectorAll('input[name="loyaltyType"]'),i=t.querySelector("#loyalty-config-amount"),l=t.querySelector("#loyalty-config-visit");n.forEach(m=>{m.addEventListener("change",b=>{const f=b.target.value;n.forEach(v=>{const p=v.closest("label");v.checked?p.classList.add("border-indigo-500","bg-indigo-50","ring-1","ring-indigo-500"):p.classList.remove("border-indigo-500","bg-indigo-50","ring-1","ring-indigo-500")}),f==="amount"?(i.classList.remove("hidden"),l.classList.add("hidden")):(i.classList.add("hidden"),l.classList.remove("hidden"))})});const d=t.querySelector("#loyaltyTiersContainer"),c=(m={})=>{const b=document.createElement("div"),f=h(m.reward||"");return b.className="loyalty-tier-row group bg-white md:bg-transparent p-3 md:p-0 border md:border-0 rounded-lg shadow-sm md:shadow-none relative",b.innerHTML=`
            <div class="mb-2 md:mb-0">
                <label class="md:hidden text-xs font-bold text-gray-500 mb-1 block">Custo em Pontos</label>
                <div class="relative">
                    <input type="number" placeholder="Ex: 100" data-field="points" value="${m.points||""}" class="w-full p-2 pl-2 border rounded-md font-semibold text-gray-800">
                    <span class="md:hidden absolute right-3 top-2 text-xs text-gray-400">pts</span>
                </div>
            </div>
            <div class="mb-2 md:mb-0">
                <label class="md:hidden text-xs font-bold text-gray-500 mb-1 block">Descrição do Prémio</label>
                <input type="text" placeholder="Ex: Corte de Cabelo Grátis" data-field="reward" value="${f}" class="w-full p-2 border rounded-md">
            </div>
            <div class="mb-2 md:mb-0">
                <label class="md:hidden text-xs font-bold text-gray-500 mb-1 block">Desconto (R$)</label>
                <div class="flex items-center relative">
                    <span class="absolute left-3 text-gray-500">R$</span>
                    <input type="number" placeholder="0.00" data-field="discount" value="${m.discount||""}" class="w-full p-2 pl-8 border rounded-md">
                </div>
            </div>
            <button type="button" class="remove-loyalty-tier absolute top-2 right-2 md:static text-gray-400 hover:text-red-600 p-2 rounded-md hover:bg-red-50 transition-colors" title="Remover">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            </button>
        `,b};(a.tiers||[]).forEach(m=>{d.appendChild(c(m))}),t.querySelector("#add-loyalty-tier").addEventListener("click",()=>{d.appendChild(c())}),d.addEventListener("click",m=>{const b=m.target.closest(".remove-loyalty-tier");b&&b.closest(".loyalty-tier-row").remove()}),t.querySelector("#loyalty-form").addEventListener("submit",m=>{m.preventDefault();const b=t.querySelector('input[name="loyaltyType"]:checked').value,f=Array.from(t.querySelectorAll("#loyaltyTiersContainer .loyalty-tier-row")).map(p=>({points:parseInt(p.querySelector('input[data-field="points"]').value,10)||0,reward:p.querySelector('input[data-field="reward"]').value,discount:parseFloat(p.querySelector('input[data-field="discount"]').value)||0})),v={loyaltyProgram:{enabled:t.querySelector("#loyaltyEnabled").checked,type:b,pointsPerCurrency:parseFloat(t.querySelector("#loyaltyPointsPerCurrency").value)||10,pointsPerVisit:parseInt(t.querySelector("#loyaltyPointsPerVisit").value,10)||1,tiers:f.filter(p=>p.points>0&&p.reward).map(p=>({costPoints:p.points,reward:p.reward,name:p.reward,discount:p.discount}))}};He(v,m)})}async function sl(e,t){t.innerHTML=`
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
                    <p class="text-sm text-green-700 mb-4">Defina a classificação automática para vendas realizadas no PDV/Agenda.</p>
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

                <div class="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <h4 class="text-lg font-semibold text-blue-800 mb-2 flex items-center gap-2">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                        Compras de Fornecedores (Contas a Pagar)
                    </h4>
                    <p class="text-sm text-blue-700 mb-4">Defina a classificação automática para pedidos de compra confirmados.</p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label for="purchaseNatureId" class="block text-sm font-bold text-gray-700">Natureza Padrão</label>
                            <select id="purchaseNatureId" class="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white">
                                <option value="">A carregar...</option>
                            </select>
                        </div>
                        <div>
                            <label for="purchaseCostCenterId" class="block text-sm font-bold text-gray-700">Centro de Custo</label>
                            <select id="purchaseCostCenterId" class="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white">
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
    `;try{const[a,s]=await Promise.all([rt(u.establishmentId),nt(u.establishmentId)]),r=e.financialIntegration||{},o=e.commissionConfig||{},n=e.purchaseConfig||{};t.querySelector("#financialNatureId").innerHTML=Ie(a,r.defaultNaturezaId),t.querySelector("#financialCostCenterId").innerHTML=Ie(s,r.defaultCentroDeCustoId),t.querySelector("#purchaseNatureId").innerHTML=Ie(a,n.defaultNatureId),t.querySelector("#purchaseCostCenterId").innerHTML=Ie(s,n.defaultCostCenterId),t.querySelector("#commissionNatureId").innerHTML=Ie(a,o.defaultNatureId),t.querySelector("#commissionCostCenterId").innerHTML=Ie(s,o.defaultCostCenterId)}catch{g("Erro","Não foi possível carregar os dados para a integração financeira.","error")}t.querySelector("#financial-form").addEventListener("submit",a=>{a.preventDefault();const s={financialIntegration:{defaultNaturezaId:t.querySelector("#financialNatureId").value||null,defaultCentroDeCustoId:t.querySelector("#financialCostCenterId").value||null},purchaseConfig:{defaultNatureId:t.querySelector("#purchaseNatureId").value||null,defaultCostCenterId:t.querySelector("#purchaseCostCenterId").value||null},commissionConfig:{defaultNatureId:t.querySelector("#commissionNatureId").value||null,defaultCostCenterId:t.querySelector("#commissionCostCenterId").value||null}};He(s,a)})}function rl(e,t){const a="5516997859430",s=encodeURIComponent("Olá, preciso de ajuda com o sistema Kairos."),r=`https://wa.me/${a}?text=${s}`;t.innerHTML=`
        <div class="bg-white p-4 md:p-6 rounded-lg shadow-md text-center md:text-left">
            <div class="flex flex-col md:flex-row items-center justify-between mb-6 border-b pb-4">
                <div>
                    <h3 class="text-xl font-bold text-gray-800">Suporte Técnico</h3>
                    <p class="text-sm text-gray-600 mt-1">Estamos aqui para ajudar você a tirar o máximo proveito do sistema.</p>
                </div>
            </div>

            <div class="bg-green-50 border border-green-100 rounded-lg p-6 flex flex-col items-center justify-center space-y-4">
                <div class="bg-white p-3 rounded-full shadow-sm">
                    <svg class="w-12 h-12 text-green-500" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                </div>
                
                <h4 class="text-lg font-semibold text-gray-800">Falar com Suporte via WhatsApp</h4>
                <p class="text-gray-600 max-w-md text-center">
                    Encontrou algum erro, tem dúvidas sobre funcionalidades ou precisa de ajuda com a sua conta? Clique abaixo para iniciar uma conversa.
                </p>

                <a href="${r}" target="_blank" rel="noopener noreferrer" 
                   class="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105 shadow-lg">
                    <span>Iniciar Atendimento</span>
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </a>
                
                <p class="text-xs text-gray-400 mt-4">Horário de atendimento: Seg a Sex, das 09h às 18h.</p>
            </div>
        </div>
    `}function nl(e,t){const a="5516997859430",s=encodeURIComponent("Olá, gostaria de solicitar o cancelamento da minha assinatura."),r=`https://wa.me/${a}?text=${s}`,o="sistemakairosagenda@gmail.com";t.innerHTML=`
        <div class="bg-white p-4 md:p-6 rounded-lg shadow-md">
            <div class="flex flex-col md:flex-row items-center justify-between mb-6 border-b pb-4">
                <div>
                    <h3 class="text-xl font-bold text-red-600">Cancelamento de Assinatura</h3>
                    <p class="text-sm text-gray-600 mt-1">Lamentamos ver você partir. Veja abaixo como proceder.</p>
                </div>
            </div>

            <div class="space-y-6">
                <p class="text-gray-700">
                    Para solicitar o cancelamento da sua assinatura, por favor, entre em contato conosco através de um dos canais abaixo. Nossa equipe financeira irá processar sua solicitação o mais breve possível.
                </p>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="border rounded-lg p-6 bg-gray-50 flex flex-col items-center text-center">
                        <div class="bg-white p-3 rounded-full shadow-sm mb-4">
                            <svg class="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                        </div>
                        <h4 class="font-bold text-gray-800 mb-2">Via E-mail</h4>
                        <p class="text-sm text-gray-600 mb-4">Envie um e-mail com seus dados para:</p>
                        <a href="mailto:${o}" class="text-indigo-600 font-semibold hover:underline">${o}</a>
                    </div>

                    <div class="border rounded-lg p-6 bg-green-50 border-green-100 flex flex-col items-center text-center">
                        <div class="bg-white p-3 rounded-full shadow-sm mb-4">
                             <svg class="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                            </svg>
                        </div>
                        <h4 class="font-bold text-gray-800 mb-2">Via WhatsApp</h4>
                        <p class="text-sm text-gray-600 mb-4">Fale diretamente com nosso suporte financeiro.</p>
                        <a href="${r}" target="_blank" rel="noopener noreferrer" 
                           class="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full transition-colors text-sm">
                            <span>Solicitar Cancelamento</span>
                        </a>
                    </div>
                </div>
                
                <div class="mt-8 p-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700">
                    <p class="font-bold">Importante:</p>
                    <p class="text-sm">O cancelamento pode levar até 48h úteis para ser processado. Seus dados permanecerão seguros conforme nossa política de privacidade.</p>
                </div>
            </div>
        </div>
    `}function il(e,t){t.innerHTML=`
        <div class="bg-white p-4 md:p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-bold text-gray-800">${e}</h3>
            <p class="mt-4 text-gray-500">Esta secção ainda não foi implementada.</p>
        </div>
    `}function $s(e="indigo",t){const a=t.querySelector("#color-palette-container"),s=t.querySelector("#establishmentThemeColor");!a||!s||(a.innerHTML="",Object.entries(Qi).forEach(([r,o])=>{const n=r===e,i=document.createElement("div");i.className="w-24 text-center cursor-pointer mb-4",i.innerHTML=`
            <div class="w-16 h-16 mx-auto rounded-full border-4 ${n?"border-gray-800 scale-110 shadow-lg":"border-transparent"} p-1 transition-all">
                <div class="w-full h-full rounded-full" style="background-color: ${o.main};"></div>
            </div>
            <p class="text-xs mt-2 font-medium ${n?"text-gray-900 font-bold":"text-gray-500"}">${o.name}</p>
        `,i.addEventListener("click",()=>{s.value=r,$s(r,t)}),a.appendChild(i)}),s.value=e)}function ll(e,t){const a=t.querySelector("#slotIntervalContainer"),s=t.querySelector("#establishmentSlotInterval");if(!a||!s)return;const r=[{label:"10 min",value:10},{label:"15 min",value:15},{label:"20 min",value:20},{label:"30 min",value:30},{label:"45 min",value:45},{label:"1 hora",value:60}];a.innerHTML=r.map(o=>{const n=o.value===e;return`<button type="button" data-value="${o.value}" 
                       class="interval-btn py-2 px-4 rounded-full text-sm font-semibold transition-colors 
                           ${n?"bg-indigo-600 text-white":"bg-gray-200 text-gray-700 hover:bg-gray-300"}">
                       ${o.label}
                   </button>`}).join(""),s.value=e,a.querySelectorAll(".interval-btn").forEach(o=>{o.addEventListener("click",()=>{s.value=o.dataset.value,a.querySelectorAll(".interval-btn").forEach(n=>{n.classList.remove("bg-indigo-600","text-white"),n.classList.add("bg-gray-200","text-gray-700")}),o.classList.add("bg-indigo-600","text-white"),o.classList.remove("bg-gray-200","text-gray-700")})})}async function dl(e){const t=Ss.find(s=>s.id===e);if(!t){console.error("Secção de definições não encontrada:",e);return}ve.innerHTML=`
        <div class="bg-white p-4 shadow-md sticky top-0 z-10 md:relative">
            <button data-action="back-to-list" class="flex items-center gap-2 font-semibold text-indigo-600 hover:text-indigo-800">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
                Voltar
            </button>
        </div>
        
        <div id="settings-content-detail" class="p-4">
            <div class="flex justify-center items-center h-full"><div class="loader"></div></div>
        </div>
    `,ve.querySelector('button[data-action="back-to-list"]').addEventListener("click",s=>{s.preventDefault(),Es()});const a=document.getElementById("settings-content-detail");switch(e){case"personal-data":Xi(J,a);break;case"change-password":Zi(J,a);break;case"change-email":Ki(J,a);break;case"branding":el(J,a);break;case"booking":tl(J,a);break;case"working-hours":al(J,a);break;case"loyalty":ol(J,a);break;case"financial":await sl(J,a);break;case"support":rl(J,a);break;case"cancellation":nl(J,a);break;default:il(t?t.label:"Definições",a)}}async function Es(){if(ve.innerHTML=`
        <div class="bg-white p-4 rounded-lg shadow-md mb-6">
            <h2 class="text-xl font-bold text-gray-800 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-500" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" /></svg>
                Definições
            </h2>
        </div>
        <div class="flex justify-center items-center h-64"><div class="loader"></div></div>
    `,!J)try{J=await ke(u.establishmentId)}catch{g("Erro Fatal","Não foi possível carregar os dados do estabelecimento.","error"),ve.innerHTML='<p class="text-red-500">Erro ao carregar dados.</p>';return}const e=V.currentUser;e&&e.displayName&&(u.userName=e.displayName);const t=h(u.userName||V.currentUser.email);let s=`https://placehold.co/96x96/E2E8F0/4A5568?text=${t?t.charAt(0).toUpperCase():"U"}`;e&&e.photoURL&&(s=e.photoURL),ve.innerHTML=`
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
                    <img id="user-avatar" src="${s}" class="w-24 h-24 rounded-full object-cover">
                 </div>
                 <h3 class="font-bold mt-2 text-lg truncate">${t}</h3>
                 ${u.userName&&u.userName!==V.currentUser.email?`<p class="text-sm text-gray-500">${h(V.currentUser.email)}</p>`:""}
                 
                 <p class="text-xs text-indigo-600 font-semibold mt-2">VER MEU PERFIL / MEUS BLOQUEIOS</p>
            </div>
        </div>

        <div class="bg-white p-4 rounded-lg shadow-md">
            <nav id="settings-menu-list" class="space-y-1">
                ${Ss.map(o=>`
                    <button data-section="${o.id}" class="w-full flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100 font-semibold text-sm">
                        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${o.icon}"></path></svg>
                        <span class="flex-1 text-left">${o.label}</span>
                        <svg class="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                    </button>
                `).join("")}
            </nav>
        </div>
    `,ve.querySelector("#settings-menu-list").addEventListener("click",o=>{const n=o.target.closest("button[data-section]");n&&(o.preventDefault(),dl(n.dataset.section))});const r=ve.querySelector('[data-action="go-to-my-profile"]');r&&r.addEventListener("click",o=>{o.preventDefault(),ae("my-profile-section")})}const Ke=document.getElementById("content");async function Me(e){const t=document.getElementById("blockagesList");if(t){t.innerHTML='<div class="loader mx-auto"></div>';try{const a=document.getElementById("filterStartDate")?.value,s=document.getElementById("filterEndDate")?.value,r=await Ot(u.establishmentId,a||new Date().toISOString().split("T")[0],s||new Date().toISOString().split("T")[0],e),o=document.getElementById("filterReason")?.value.toLowerCase(),n=o?r.filter(l=>l.reason&&l.reason.toLowerCase().includes(o)):r,i=n.reduce((l,d)=>{const c=d.reason||"Sem motivo";return l[c]||(l[c]=[]),l[c].push(d),l},{});if(t.innerHTML="",n.length===0){t.innerHTML='<p class="text-center text-gray-500">Nenhum bloqueio encontrado.</p>';return}Object.entries(i).forEach(([l,d])=>{const c=document.createElement("div");c.className="bg-gray-100 rounded-lg p-3 my-2 space-y-2";let b=`<div class="flex justify-between items-center pb-2 border-b border-gray-200">
                                <h4 class="font-bold text-gray-700">${h(l)} (${d.length})</h4>`;if(d.length>1){const f=JSON.stringify(d.map(v=>v.id));b+=`<button data-action="batch-delete-blockage" data-ids='${f}' class="text-xs text-red-600 hover:text-red-800 font-semibold flex items-center gap-1">
                                    Apagar Lote
                                </button>`}b+="</div>",c.innerHTML=b,d.forEach(f=>{const v=new Date(f.startTime),p=new Date(f.endTime),x=v.toLocaleDateString("pt-BR"),k=p.toLocaleDateString("pt-BR"),S=`
                    <div class="bg-white p-3 rounded-md flex items-center justify-between shadow-sm">
                        <div>
                            <p class="font-medium text-gray-800 text-sm">
                                ${x===k?`${x} | ${v.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})} - ${p.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}`:`De ${x} às ${v.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}<br>Até ${k} às ${p.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}`}
                            </p>
                        </div>
                        <button class="p-1 rounded-full text-gray-500 hover:bg-gray-100 hover:text-red-600" data-action="delete-blockage" data-id="${f.id}">Apagar</button>
                    </div>`;c.innerHTML+=S}),t.appendChild(c)})}catch(a){t.innerHTML=`<p class="text-center text-red-500">Erro: ${a.message}</p>`}}}async function cl(e){e.preventDefault();const t=e.target,a=t.querySelector("#blockageProfId").value,s=t.querySelector("#blockageDate").value,r=t.querySelector("#blockageEndDate").value||s,o=t.querySelector("#blockageStartTime").value,n=t.querySelector("#blockageEndTime").value,i={establishmentId:u.establishmentId,professionalId:a,startTime:new Date(`${s}T${o}:00`).toISOString(),endTime:new Date(`${r}T${n}:00`).toISOString(),reason:t.querySelector("#blockageReason").value};try{await zt(i),t.reset(),g("Sucesso","Bloqueio adicionado com sucesso!","success"),Me(a)}catch(l){g("Erro",`Não foi possível criar o bloqueio: ${l.message}`,"error")}}async function ul(e){e.preventDefault();const t=e.target,a=Array.from(t.querySelectorAll('input[name="batch-professionals"]:checked')).map(c=>c.value);if(a.length===0)return g("Atenção","Selecione pelo menos um profissional.","error");const s=t.querySelector("#batchBlockageDate").value,r=t.querySelector("#batchBlockageEndDate").value||s,o=t.querySelector("#batchBlockageStartTime").value,n=t.querySelector("#batchBlockageEndTime").value,i=t.querySelector("#batchBlockageReason").value,l=t.querySelector('button[type="submit"]');l.disabled=!0,l.textContent="Aguarde...";const d=a.map(c=>{const m={establishmentId:u.establishmentId,professionalId:c,startTime:new Date(`${s}T${o}:00`).toISOString(),endTime:new Date(`${r}T${n}:00`).toISOString(),reason:i};return zt(m)});try{await Promise.all(d),g("Sucesso",`${a.length} bloqueios foram criados com sucesso!`,"success"),t.reset(),t.querySelectorAll('input[name="batch-professionals"]:checked').forEach(m=>m.checked=!1);const c=document.getElementById("blockageProfId").value;c&&Me(c)}catch(c){g("Erro",`Ocorreu um erro: ${c.message}`,"error")}finally{l.disabled=!1,l.textContent="Adicionar Bloqueio em Lote"}}function ml(e){Ke.addEventListener("submit",t=>{t.target.id==="blockageForm"&&cl(t),t.target.id==="batchBlockageForm"&&ul(t)}),Ke.addEventListener("input",t=>{t.target.matches("#filterStartDate, #filterEndDate, #filterReason")&&Me(e)}),Ke.addEventListener("click",async t=>{const a=t.target.closest("button[data-action]");if(!a)return;const s=a.dataset.action;if(s==="back-to-professionals")ae("profissionais-section");else if(s==="delete-blockage"){if(await j("Apagar Bloqueio","Tem a certeza que deseja apagar este bloqueio?"))try{await Ia(a.dataset.id),g("Sucesso","Bloqueio removido.","success"),Me(e)}catch(o){g("Erro",`Não foi possível remover o bloqueio: ${o.message}`,"error")}}else if(s==="batch-delete-blockage"){const r=JSON.parse(a.dataset.ids);if(await j("Apagar Lote de Bloqueios",`Tem certeza que deseja apagar ${r.length} bloqueios de uma vez?`))try{await Wo(r),g("Sucesso",`${r.length} bloqueios removidos.`,"success"),Me(e)}catch(n){g("Erro",`Não foi possível apagar os bloqueios: ${n.message}`,"error")}}})}async function pl(e){const{professionalId:t,professionalName:a}=e;if(!t||!a){Ke.innerHTML='<p class="text-red-500 p-8">Erro: ID do profissional não fornecido.</p>';return}const s=h(a);Ke.innerHTML=`
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
        </section>`,ml(t),await Me(t);const r=document.getElementById("batchProfSelectionContainer");try{const o=await Z(u.establishmentId);r.innerHTML=o.map(n=>`
            <div class="flex items-center">
                <input id="prof-batch-${n.id}" value="${n.id}" name="batch-professionals" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                <label for="prof-batch-${n.id}" class="ml-2 text-sm text-gray-700">${h(n.name)}</label>
            </div>`).join("")}catch{r.innerHTML='<p class="text-red-500">Erro ao carregar profissionais.</p>'}}const gl=e=>w(`/api/users/${e}`),bl=e=>w("/api/users",{method:"POST",body:JSON.stringify(e)}),fl=(e,t)=>w(`/api/users/${e}`,{method:"PUT",body:JSON.stringify(t)}),vl=e=>w(`/api/users/${e}`,{method:"DELETE"}),hl=(e,t)=>w(`/api/users/${e}/password`,{method:"PUT",body:JSON.stringify({password:t})}),xl=(e,t)=>w(`/api/users/${e}/status`,{method:"PATCH",body:JSON.stringify({status:t})}),be=document.getElementById("content"),yl={"agenda-section":"Agenda","comandas-section":"Comandas","relatorios-section":"Relatórios Gerais","sales-report-section":"Relatório de Vendas (Caixa)","financial-section":"Financeiro","servicos-section":"Serviços","produtos-section":"Produtos","suppliers-section":"Fornecedores","profissionais-section":"Profissionais","ausencias-section":"Ausências e Bloqueios","clientes-section":"Clientes","packages-section":"Pacotes","commissions-section":"Comissões","estabelecimento-section":"Configurações do Estabelecimento","users-section":"Usuários e Acessos"},wl={view:"Visualizar",create:"Criar",edit:"Editar"};let Ue=null,_e=null;function kl(e){const t=document.getElementById("usersListContainer");if(!t)return;const a=document.getElementById("showInactiveUsersToggle")?.checked;if(e.length===0){const s=a?"Nenhum usuário encontrado.":"Nenhum usuário ativo cadastrado.";t.innerHTML=`<p class="col-span-full text-center text-gray-500">${s}</p>`;return}e.sort((s,r)=>(s.status==="active"?-1:1)-(r.status==="active"?-1:1)),t.innerHTML=e.map(s=>{const r=JSON.stringify(s).replace(/'/g,"&apos;"),o=s.status==="active",n=u.professionals.find(c=>c.id===s.professionalId),i=n?n.name:"N/A",l=n?n.name.charAt(0):s.name.charAt(0),d=n?.photo||`https://placehold.co/64x64/E2E8F0/4A5568?text=${encodeURIComponent(l)}`;return`
        <div class="user-card-clickable bg-white rounded-lg shadow-sm border overflow-hidden flex cursor-pointer ${o?"":"opacity-60"}" 
             data-action="edit-user" 
             data-user='${r}'>
            
            <img src="${d}" alt="Foto de Perfil" class="w-16 h-16 object-cover flex-shrink-0 pointer-events-none">
            
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
    `}).join("")}function Ct(){const e=document.getElementById("showInactiveUsersToggle")?.checked;let t;e?t=u.users:t=u.users.filter(a=>a.status==="active"),kl(t)}function Sl(e={}){return Object.entries(yl).map(([t,a])=>{const s=t==="agenda-section"||t==="comandas-section",r=e[t]?.view_all_prof===!0,o=Object.entries(wl).map(([i,l])=>`
             <label class="flex flex-col items-center space-y-1 cursor-pointer">
                <div class="relative">
                    <input type="checkbox" data-module="${t}" data-permission="${i}" class="sr-only" 
                        ${e[t]?.[i]?"checked":""}>
                    <div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full"></div>
                </div>
                <span class="text-xs text-gray-600">${l}</span>
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
    `}).join("")}async function bo(e=null){document.getElementById("user-list-view").classList.add("hidden");const t=document.getElementById("user-form-view");t.classList.remove("hidden");let a=u.professionals;if(!a||a.length===0)try{a=await Z(u.establishmentId),u.professionals=a}catch{g("Erro","Não foi possível carregar a lista de profissionais.","error")}const s=k=>a.find(E=>E.id===k),r=(k,E)=>{const $=s(k)?.photo,L=E.charAt(0).toUpperCase();return{photoSrc:$||`https://placehold.co/128x128/E2E8F0/4A5568?text=${L}`,initials:L,photoUrl:$||""}},o=e?.professionalId,n=e?.name||"Novo Usuário",i=r(o,n),l=s(o),d=k=>{let E='<option value="">-- Não Associado a um Profissional --</option>';return E+=a.map(S=>`<option value="${S.id}" ${S.id===k?"selected":""}>${S.name} (${S.specialty||"N/A"})</option>`).join(""),E},c=e!==null;t.querySelector("#userFormTitle").textContent=c?`Editar Usuário: ${e.name}`:"Novo Usuário";const m=t.querySelector("#userForm");m.innerHTML=`
        <div class="bg-white p-4 sm:p-6 rounded-xl shadow-2xl space-y-4">
            
            <div class="flex flex-col items-center mb-4">
                 <img id="userPhotoPreview" src="${i.photoSrc}" alt="Foto de Perfil do Profissional" class="w-20 h-20 rounded-full mx-auto mb-3 border-4 border-gray-200 object-cover">
                 <p id="profPhotoName" class="text-sm text-gray-500">${l?l.name:"Selecione um profissional"}</p>
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
                        ${d(e?.professionalId)}
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
                    ${Sl(e?.permissions)}
                </div>
            </div>

            <div class="flex gap-4 pt-6 border-t">
                <button type="button" data-action="back-to-list" class="flex-1 py-3 px-4 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400">Cancelar</button>
                <button type="submit" class="flex-1 py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">Salvar Alterações</button>
            </div>
        </div>
    `;const b=window.innerWidth<768,f=m.querySelector(".bg-white");if(b&&f){f.classList.remove("rounded-xl","shadow-2xl","sm:p-6");const k=m.closest("section");k&&(k.style.padding="0",k.style.margin="0"),f.classList.add("p-4")}const v=m.querySelector("#userProfessionalId"),p=m.querySelector("#userPhotoPreview"),x=m.querySelector("#profPhotoName");if(v.addEventListener("change",k=>{const E=k.target.value,S=s(E),$=S?S.name:"Selecione um profissional",L=r(E,n);p.src=L.photoSrc,x.textContent=$,m.querySelector("#professionalPhotoUrl").value=L.photoUrl}),m.addEventListener("submit",async k=>{k.preventDefault();const E=e?.email,S=m.querySelector("#userEmail").value,$={};m.querySelectorAll('input[type="checkbox"]').forEach(O=>{const T=O.dataset.module,B=O.dataset.permission;$[T]||($[T]={}),$[T][B]=O.checked});const L=m.querySelector("#userProfessionalId").value||null,R={name:m.querySelector("#userName").value,permissions:$,professionalId:L,establishmentId:u.establishmentId};try{c?(E!==S&&(R.email=S),await fl(e.id,R),g("Usuário atualizado com sucesso!","success")):(R.email=m.querySelector("#userEmail").value,R.password=m.querySelector("#userPassword").value,await bl(R),g("Usuário criado com sucesso!","success")),Mt()}catch(O){g(`Erro: ${O.message}`,"error")}}),c){const k=m.querySelector("#password-change-container"),E=k.querySelector('[data-action="show-password-form"]'),S=k.querySelector("#password-form"),$=S.querySelector('[data-action="save-password"]'),L=S.querySelector('[data-action="cancel-password-change"]');E.addEventListener("click",()=>{E.classList.add("hidden"),S.classList.remove("hidden")}),L.addEventListener("click",()=>{E.classList.remove("hidden"),S.classList.add("hidden"),S.querySelector("#userNewPassword").value=""}),$.addEventListener("click",async()=>{const R=S.querySelector("#userNewPassword").value;if(!R||R.length<6){g("Senha inválida","A nova senha deve ter pelo menos 6 caracteres.","error");return}if(await j("Alterar Senha","Tem a certeza que deseja alterar a senha deste usuário?"))try{$.disabled=!0,$.textContent="Aguarde...",await hl(e.id,R),g("Sucesso!","A senha do usuário foi alterada.","success"),E.classList.remove("hidden"),S.classList.add("hidden"),S.querySelector("#userNewPassword").value=""}catch(T){g("Erro",`Não foi possível alterar a senha: ${T.message}`,"error")}finally{$.disabled=!1,$.textContent="Salvar Nova Senha"}})}}async function $l(){const e=document.getElementById("usersListContainer");e.innerHTML='<div class="loader col-span-full mx-auto"></div>';try{const[t,a]=await Promise.all([gl(u.establishmentId),Z(u.establishmentId)]);u.users=t,u.professionals=a,Ct()}catch{g("Erro ao carregar usuários.","error"),e.innerHTML='<p class="col-span-full text-center text-red-500">Não foi possível carregar os usuários.</p>'}}async function Mt(){be.innerHTML=`
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
    `,Ue&&be.removeEventListener("click",Ue),_e&&be.removeEventListener("change",_e),Ue=async e=>{if(!document.getElementById("user-list-view")){be.removeEventListener("click",Ue);return}const t=e.target.closest("[data-action]");if(!t)return;switch(t.dataset.action){case"new-user":bo();break;case"edit-user":const s=JSON.parse(t.dataset.user.replace(/&apos;/g,"'"));bo(s);break;case"back-to-list":Mt();break;case"delete-user":{e.stopPropagation();const r=t.dataset.userId;if(await j("Excluir Usuário","Tem certeza que deseja excluir este usuário? Esta ação é irreversível."))try{await vl(r),g("Usuário excluído com sucesso!","success"),Mt()}catch(n){g(`Erro ao excluir: ${n.message}`,"error")}break}}},_e=async e=>{if(!document.getElementById("user-list-view")){be.removeEventListener("change",_e);return}const t=e.target.closest('input[data-action="toggle-user-status"]');if(e.target.id==="showInactiveUsersToggle")Ct();else if(t){e.stopPropagation();const a=t.dataset.userId,s=t.checked?"active":"inactive";try{await xl(a,s),g(`Usuário ${s==="active"?"ativado":"inativado"} com sucesso.`,"success");const r=u.users.findIndex(o=>o.id===a);r>-1&&(u.users[r].status=s,Ct())}catch(r){g(`Erro ao atualizar status: ${r.message}`,"error"),t.checked=!t.checked,Ct()}}},be.addEventListener("click",Ue),be.addEventListener("change",_e),await $l()}const El=document.getElementById("content");let fo={},ha=null;function Il(){Object.values(fo).forEach(e=>e?.destroy()),fo={}}function Cl(e,t){if(!window.jspdf){g("Erro","Biblioteca PDF não carregada.","error");return}const{jsPDF:a}=window.jspdf,s=new a({orientation:"landscape",unit:"px",format:"a4"}),r=document.getElementById("salesReportSummaryCards");if(s.setFontSize(18),s.text(e,s.internal.pageSize.getWidth()/2,40,{align:"center"}),r){const n=[["Receita Total",r.querySelector("#summary-revenue").textContent],["Vendas Totais",r.querySelector("#summary-transactions").textContent],["Ticket Médio",r.querySelector("#summary-avg-ticket").textContent]];s.autoTable({startY:60,head:[["Métrica","Valor"]],body:n,theme:"striped",headStyles:{fillColor:[79,70,229]}})}const o=s.lastAutoTable?s.lastAutoTable.finalY+20:60;s.text("Detalhes das Vendas",20,o),s.autoTable({html:`#${t}`,startY:o+10,theme:"grid",headStyles:{fillColor:[22,163,74]}}),s.save(`${e.replace(/[\s/]/g,"_").toLowerCase()}.pdf`)}function vo(e){const t=document.getElementById("genericModal"),a=h(e.client),s=h(e.items),r=h(e.responsavelCaixa||"N/A"),o=(e.payments||[]).map(n=>`
        <div class="flex justify-between text-sm">
            <span>${h(n.method.charAt(0).toUpperCase()+n.method.slice(1))}</span>
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
                         <span>R$ ${e.total.toFixed(2)}</span>
                     </div>
                </div>
            </div>
        </div>
    `,t.style.display="flex"}function Ll(e){const{summary:t,transactions:a}=e;document.getElementById("summary-revenue").textContent=`R$ ${t.totalRevenue.toFixed(2)}`,document.getElementById("summary-transactions").textContent=t.totalTransactions,document.getElementById("summary-avg-ticket").textContent=`R$ ${t.averageTicket.toFixed(2)}`;const s=document.getElementById("paymentSummaryTableBody"),r=Object.entries(t.paymentMethodTotals).sort(([,i],[,l])=>l-i);s.innerHTML=r.map(([i,l])=>`
        <tr class="border-b">
            <td class="py-2 px-4 font-medium">${h(i.charAt(0).toUpperCase()+i.slice(1))}</td>
            <td class="py-2 px-4 text-right font-semibold">R$ ${l.toFixed(2)}</td>
        </tr>
    `).join("");const o=document.getElementById("transactionsTableBody"),n=document.getElementById("mobileTransactionsList");if(a.length===0){const i='<tr><td colspan="5" class="text-center py-8 text-gray-500">Nenhuma venda encontrada para o período selecionado.</td></tr>';o.innerHTML=i,n.innerHTML='<div class="text-center py-8 text-gray-500">Nenhuma venda encontrada.</div>';return}o.innerHTML=a.map((i,l)=>{const d=h(i.client),c=h(i.items),m=h(i.type);return`
        <tr class="border-b hover:bg-gray-50 cursor-pointer" data-transaction-index="${l}">
            <td class="w-24 py-3 px-4">${new Date(i.date).toLocaleString("pt-BR",{dateStyle:"short",timeStyle:"short"})}</td>
            <td class="w-40 py-3 px-4 truncate max-w-[150px]">${d}</td>
            <td class="w-auto py-3 px-4 truncate max-w-[200px]">${c}</td>
            <td class="w-16 py-3 px-4 text-center text-xs">${m}</td>
            <td class="w-24 py-3 px-4 text-right font-medium">R$ ${i.total.toFixed(2)}</td>
        </tr>
    `}).join(""),o.querySelectorAll("tr").forEach(i=>{i.addEventListener("dblclick",()=>{const l=i.dataset.transactionIndex,d=ha.transactions[l];d&&vo(d)})}),n.innerHTML=a.map((i,l)=>{const d=h(i.client),c=h(i.items),m=h(i.type);return`
        <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100 active:bg-gray-50 cursor-pointer transition-colors" data-transaction-index="${l}">
            <div class="flex justify-between items-start mb-2">
                <div class="flex flex-col">
                    <span class="text-xs text-gray-500 font-medium">${new Date(i.date).toLocaleString("pt-BR",{dateStyle:"short",timeStyle:"short"})}</span>
                    <span class="font-bold text-gray-800 text-lg">${d}</span>
                </div>
                <div class="text-right">
                    <span class="block font-bold text-green-600 text-lg">R$ ${i.total.toFixed(2)}</span>
                    <span class="inline-block px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600 border border-gray-200">${m}</span>
                </div>
            </div>
            <div class="mt-2 pt-2 border-t border-dashed border-gray-200">
                <p class="text-sm text-gray-600 line-clamp-2">${c}</p>
            </div>
            <p class="text-xs text-blue-500 mt-2 text-center font-medium">Toque para ver detalhes</p>
        </div>
    `}).join(""),n.querySelectorAll("div[data-transaction-index]").forEach(i=>{i.addEventListener("click",()=>{const l=i.dataset.transactionIndex,d=ha.transactions[l];d&&vo(d)})})}async function ho(){const e=document.getElementById("main-reports-view"),t=document.getElementById("reportStartDate"),a=document.getElementById("reportEndDate");if(!e||!t||!a)return;const s=t.value,r=a.value;if(!s||!r)return g("Atenção","Por favor, selecione as datas de início e fim.","error");e.innerHTML='<div class="p-8 text-center"><div class="loader mx-auto"></div><p class="mt-4">A gerar relatório...</p></div>';try{const o=document.getElementById("cashierSessionFilter").value,n=await Mr({establishmentId:u.establishmentId,startDate:s,endDate:r,cashierSessionId:o});ha=n,e.innerHTML=`
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
        `,Ll(n)}catch(o){g("Erro",`Não foi possível carregar o relatório: ${o.message}`,"error"),e.innerHTML=`<p class="p-8 text-center text-red-500">${h(o.message)}</p>`}}async function Tl(){Il();const e=new Date().toISOString().split("T")[0],t=new Date;t.setDate(t.getDate()-30);const a=t.toISOString().split("T")[0];El.innerHTML=`
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
        </section>`,document.getElementById("generateReportBtn").addEventListener("click",ho),document.getElementById("exportPdfBtn").addEventListener("click",()=>{const s=document.getElementById("reportStartDate").value,r=document.getElementById("reportEndDate").value,o=`Relatorio_Vendas_${s}_a_${r}`;Cl(o,"transactionsTable")});try{const s=await cn(u.establishmentId),r=document.getElementById("cashierSessionFilter");s&&s.length>0&&s.forEach(o=>{const n=new Date(o.openTime).toLocaleString("pt-BR",{dateStyle:"short"}),i=h(o.closedByName||"N/A");r.innerHTML+=`<option value="${o.id}">${i} - ${n}</option>`})}catch{g("Erro","Não foi possível carregar o histórico de caixas para o filtro.","error")}await ho()}const Pl=document.getElementById("content");let D={payables:[],receivables:[],natures:[],costCenters:[],currentFilter:"pending",startDate:new Date(new Date().getFullYear(),new Date().getMonth()-1,1).toISOString().split("T")[0],endDate:new Date().toISOString().split("T")[0],previousBalance:0,filterNaturezaId:"all",filterCostCenterId:"all",currentListView:"receivables"},ta=null,bt=null,ft=null;function Fa(e){const t=new Map,a=[];return e&&(e.forEach(s=>t.set(s.id,{...s,children:[]})),t.forEach(s=>{s.parentId&&t.has(s.parentId)?t.get(s.parentId).children.push(s):a.push(s)})),a}function Is(e,t,a){if(!e)return;if(!t||t.length===0){e.innerHTML='<p class="text-center text-gray-500">Nenhum item criado.</p>';return}const s=(r,o=0)=>{const n="— ".repeat(o);return`
            <div style="margin-left: ${o*20}px;" class="flex justify-between items-center bg-gray-100 p-2 rounded">
                <span>${n}${r.name}</span>
                <button data-action="delete-${a}" data-id="${r.id}" class="text-red-500 hover:text-red-700 font-semibold text-sm">Apagar</button>
            </div>
            ${r.children.map(i=>s(i,o+1)).join("")}
        `};e.innerHTML=t.map(r=>s(r)).join("")}async function xo(e){document.getElementById("fab-menu")?.classList.add("hidden"),document.getElementById("main-fab-btn")?.classList.remove("rotate-45");const t=document.getElementById("genericModal"),a=e==="nature",s=`Gerir ${a?"Naturezas Financeiras":"Centros de Custo"}`,r=a?rt:nt,o=a?"natures":"costCenters";t.innerHTML=`
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
        </div>`,t.style.display="flex";const n=t.querySelector("#hierarchyList"),i=t.querySelector("#itemParent"),l=c=>{const m=Fa(c);if(Is(n,m,e),i){i.innerHTML='<option value="">-- Nível Principal --</option>';const b=(f,v="",p=0)=>{const x=p>0?"— ".repeat(p):"";i.innerHTML+=`<option value="${f.id}">${x}${f.name}</option>`,f.children.forEach(k=>b(k,v+"— "))};m.forEach(f=>b(f))}};try{const c=await r(u.establishmentId);D[o]=c,l(c)}catch(c){console.error(c)}const d=t.querySelector("#hierarchyForm");d&&d.addEventListener("submit",async c=>{c.preventDefault();const m=t.querySelector("#itemName");if(!m)return;const b=m.value,f=i.value,v=a?Ai:qi;try{await v({name:b,parentId:f||null,establishmentId:u.establishmentId});const p=await r(u.establishmentId);D[o]=p,l(p),d.reset(),await ye()}catch(p){g("Erro",`Não foi possível criar: ${p.message}`,"error")}})}function Bl(e){const t=document.getElementById("cashFlowChart");if(!t)return;const a=t.getContext("2d");ta&&ta.destroy();const s=e.payables.map(r=>r*-1);ta=new Chart(a,{type:"bar",data:{labels:e.labels,datasets:[{label:"Receitas",data:e.receivables,backgroundColor:"rgba(74, 222, 128, 0.6)",borderColor:"rgba(34, 197, 94, 1)",borderWidth:1,yAxisID:"y"},{label:"Despesas",data:s,backgroundColor:"rgba(248, 113, 113, 0.6)",borderColor:"rgba(239, 68, 68, 1)",borderWidth:1,yAxisID:"y"},{label:"Saldo Acumulado",data:e.expectedBalance,type:"line",borderColor:"rgba(59, 130, 246, 1)",backgroundColor:"rgba(59, 130, 246, 0.2)",borderWidth:3,pointRadius:4,pointBackgroundColor:"rgba(59, 130, 246, 1)",fill:!0,tension:.1,yAxisID:"y1"}]},options:{responsive:!0,maintainAspectRatio:!1,scales:{x:{stacked:!0},y:{type:"linear",display:!0,position:"left",stacked:!0,title:{display:!0,text:"Movimentações (R$)"}},y1:{type:"linear",display:!0,position:"right",title:{display:!0,text:"Saldo Acumulado (R$)"},grid:{drawOnChartArea:!1}}},plugins:{tooltip:{callbacks:{label:function(r){let o=r.dataset.label||"";if(o&&(o+=": "),r.parsed.y!==null){const n=Math.abs(r.parsed.y);o+=new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(n)}return o}}}}}})}async function yo(){const e=document.getElementById("cash-flow-chart-container"),t=document.getElementById("cashFlowStartDate"),a=document.getElementById("cashFlowEndDate");if(!e||!t||!a)return;const s=t.value,r=a.value;if(!s||!r){g("Atenção","Por favor, selecione as datas de início e fim.","error");return}e.innerHTML='<div class="loader mx-auto my-10"></div>';try{const o=await Gi(u.establishmentId,s,r);document.getElementById("cash-flow-chart-container")&&(e.innerHTML='<canvas id="cashFlowChart"></canvas>',Bl(o))}catch(o){document.getElementById("cash-flow-chart-container")&&(e.innerHTML=`<p class="text-red-500 text-center">Erro ao carregar dados do gráfico: ${o.message}</p>`)}}function wo(){document.getElementById("fab-menu")?.classList.add("hidden"),document.getElementById("main-fab-btn")?.classList.remove("rotate-45");const e=document.getElementById("genericModal"),t=new Date,a=new Date(t.getFullYear(),t.getMonth(),1).toISOString().split("T")[0],s=t.toISOString().split("T")[0];e.innerHTML=`
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
    `,e.style.display="flex";const r=e.querySelector("#generateCashFlowBtn");r&&(r.addEventListener("click",yo),yo())}function Dl(){const e=document.getElementById("genericModal"),t=D.payables.filter(m=>m.status==="pending").reduce((m,b)=>m+b.amount,0),a=D.receivables.filter(m=>m.status==="pending").reduce((m,b)=>m+b.amount,0),s=a-t,r=D.payables.filter(m=>m.status==="paid").reduce((m,b)=>m+b.amount,0),o=D.receivables.filter(m=>m.status==="paid").reduce((m,b)=>m+b.amount,0),n=o-r,i=D.previousBalance||0,l=i+n,d=m=>new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(m),c=m=>m>=0?"text-green-600":"text-red-600";e.innerHTML=`
        <div class="modal-content max-w-4xl max-h-[90vh] flex flex-col">
             <div class="flex justify-between items-center p-6 border-b">
                <h2 class="text-2xl font-bold text-gray-800">Painel de Indicadores Financeiros</h2>
                <button type="button" data-action="close-modal" data-target="genericModal" class="text-2xl font-bold text-gray-500 hover:text-gray-800">&times;</button>
            </div>
            <div class="p-6 overflow-y-auto space-y-8">
                
                <p class="text-center text-sm text-gray-500 mb-6 bg-yellow-50 p-2 rounded-md">
                    Análise do período: ${new Date(D.startDate+"T00:00:00").toLocaleDateString("pt-BR")} a ${new Date(D.endDate+"T00:00:00").toLocaleDateString("pt-BR")}.
                </p>
                
                <div class="bg-gray-50 p-4 rounded-lg shadow-inner">
                    <h3 class="text-xl font-semibold text-indigo-700 mb-4 border-b pb-2">Realizado no Período (Fechado)</h3>
                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                        <div class="bg-white p-3 rounded-lg shadow-sm border-b-4 border-green-400">
                            <p class="text-gray-500 text-sm">Total Recebido</p>
                            <p class="text-2xl font-bold text-green-600">${d(o)}</p>
                        </div>
                        <div class="bg-white p-3 rounded-lg shadow-sm border-b-4 border-red-400">
                            <p class="text-gray-500 text-sm">Total Pago</p>
                            <p class="text-2xl font-bold text-red-600">${d(r)}</p>
                        </div>
                        <div class="bg-white p-3 rounded-lg shadow-lg border-b-4 ${c(n)==="text-green-600"?"border-green-600":"border-red-600"}">
                            <p class="text-gray-700 text-sm font-medium">Saldo do Período</p>
                            <p class="text-2xl font-bold ${c(n)}">${d(n)}</p>
                        </div>
                    </div>
                </div>

                <div class="bg-gray-50 p-4 rounded-lg shadow-inner">
                    <h3 class="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">Balanço Patrimonial e Acumulado</h3>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
                        <div class="bg-white p-3 rounded-lg shadow-sm border-b-4 border-indigo-400">
                            <p class="text-gray-500 text-sm">Saldo Inicial (Realizado)</p>
                            <p class="text-2xl font-bold ${c(i)}">${d(i)}</p>
                            <p class="text-xs text-gray-400 mt-1">Acumulado antes do período</p>
                        </div>
                        <div class="bg-white p-3 rounded-lg shadow-lg border-b-4 border-blue-600">
                            <p class="text-gray-700 text-sm font-medium">Saldo Final Acumulado</p>
                            <p class="text-2xl font-bold ${c(l)}">${d(l)}</p>
                            <p class="text-xs text-gray-400 mt-1">Inicial + Saldo do Período</p>
                        </div>
                    </div>
                </div>

                <div class="bg-gray-50 p-4 rounded-lg shadow-inner">
                    <h3 class="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">Previsão (Abertos no Período)</h3>
                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                         <div class="bg-white p-3 rounded-lg shadow-sm border-b-4 border-green-400">
                            <p class="text-gray-500 text-sm">A Receber (Pendente)</p>
                            <p class="text-2xl font-bold text-green-600">${d(a)}</p>
                        </div>
                        <div class="bg-white p-3 rounded-lg shadow-sm border-b-4 border-red-400">
                            <p class="text-gray-500 text-sm">A Pagar (Pendente)</p>
                            <p class="text-2xl font-bold text-red-600">${d(t)}</p>
                        </div>
                        <div class="bg-white p-3 rounded-lg shadow-lg border-b-4 ${c(s)==="text-green-600"?"border-green-600":"border-red-600"}">
                            <p class="text-gray-700 text-sm font-medium">Saldo Previsto</p>
                            <p class="text-2xl font-bold ${c(s)}">${d(s)}</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    `,e.style.display="flex"}function Ml(){const e=document.getElementById("genericModal");e.innerHTML=`
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
    `,e.style.display="flex"}function vt(e,t="all"){let a='<option value="all">Todos</option>';const s=n=>{const i=new Map,l=[];return n&&(n.forEach(d=>i.set(d.id,{...d,children:[]})),i.forEach(d=>{d.parentId&&i.has(d.parentId)?i.get(d.parentId).children.push(d):l.push(d)})),l},r=(n,i=0)=>{const l=i>0?"— ".repeat(i):"",d=n.id===t?"selected":"";a+=`<option value="${n.id}" ${d}>${l}${n.name}</option>`,n.children.forEach(c=>r(c,i+1))};return s(e).forEach(n=>r(n)),a}async function ye(){const e=document.getElementById("financial-content");if(!e)return;const t=document.getElementById("filterStartDate"),a=document.getElementById("filterEndDate");if(!t||!a)return;const s=t.value,r=a.value,o=document.getElementById("filterNaturezaId")?.value,n=document.getElementById("filterCostCenterId")?.value;if(!s||!r){try{const[d,c]=await Promise.all([rt(u.establishmentId),nt(u.establishmentId)]);if(!document.getElementById("financial-content"))return;D={...D,natures:d,costCenters:c},document.getElementById("filterNaturezaId")&&(document.getElementById("filterNaturezaId").innerHTML=vt(D.natures)),document.getElementById("filterCostCenterId")&&(document.getElementById("filterCostCenterId").innerHTML=vt(D.costCenters))}catch(d){g("Erro",`Não foi possível carregar os dados base: ${d.message}`,"error")}xa(),So();return}const i=document.getElementById("payables-list"),l=document.getElementById("receivables-list");i&&(i.innerHTML='<div class="loader mx-auto"></div>'),l&&(l.innerHTML='<div class="loader mx-auto"></div>');try{const d={startDate:s,endDate:r,establishmentId:u.establishmentId};o&&o!=="all"&&(d.natureId=o),n&&n!=="all"&&(d.costCenterId=n);const[c,m,b,f]=await Promise.all([ji(d),Ui(d),rt(u.establishmentId),nt(u.establishmentId)]);if(!document.getElementById("financial-content"))return;const v=(m.previousBalance||0)-(c.previousBalance||0);D={...D,payables:c.entries||[],receivables:m.entries||[],natures:b||[],costCenters:f||[],previousBalance:v,filterNaturezaId:o,filterCostCenterId:n},document.getElementById("filterNaturezaId")&&(document.getElementById("filterNaturezaId").innerHTML=vt(D.natures,D.filterNaturezaId)),document.getElementById("filterCostCenterId")&&(document.getElementById("filterCostCenterId").innerHTML=vt(D.costCenters,D.filterCostCenterId)),xa(),So()}catch(d){document.getElementById("financial-content")&&(g("Erro",`Não foi possível carregar os dados: ${d.message}`,"error"),e.innerHTML='<p class="text-red-500 text-center">Falha ao carregar dados.</p>')}}async function Al(e,t,a=null){e.preventDefault();const s=e.target,r=s.querySelector('[name="status"]').checked,o=s.querySelector('[name="paymentDate"]').value,n=parseFloat(s.querySelector('[name="amount"]').value),i=parseInt(s.querySelector('[name="installments"]')?.value,10)||1;if(isNaN(n)){g("Erro de Validação","O valor inserido é inválido.","error");return}if(r&&!o){g("Erro de Validação","Por favor, forneça a data de pagamento para um lançamento pago.","error");return}const l={description:s.querySelector('[name="description"]').value,amount:n,dueDate:s.querySelector('[name="dueDate"]').value,naturezaId:s.querySelector('[name="naturezaId"]').value||null,centroDeCustoId:s.querySelector('[name="centroDeCustoId"]').value||null,notes:s.querySelector('[name="notes"]').value,status:r?"paid":"pending",paymentDate:r?o:null,installments:a?1:i,establishmentId:u.establishmentId};try{a?(await(t==="payable"?Hi(a,l):_i(a,l)),g("Sucesso","Lançamento atualizado!","success")):(await(t==="payable"?Fi(l):Vi(l)),g("Sucesso","Lançamento adicionado!","success")),document.getElementById("genericModal").style.display="none",await ye()}catch(d){g("Erro",`Não foi possível salvar: ${d.message}`,"error")}}async function Nl(e,t){if(await j("Confirmar Exclusão","Tem certeza? Esta ação é irreversível."))try{await(e==="payable"?Oi(t):Ji(t)),g("Sucesso","Lançamento excluído!","success"),await ye()}catch(s){g("Erro",`Falha ao excluir: ${s.message}`,"error")}}async function ql(e,t){const a=new Date().toISOString().split("T")[0];try{await(e==="payable"?zi(t,a):Wi(t,a)),g("Sucesso","Lançamento atualizado!","success"),await ye()}catch(s){g("Erro",`Falha ao atualizar status: ${s.message}`,"error")}}function ko(e){const t=D.currentFilter;return t==="all"?e:e.filter(a=>a.status===t)}function xa(){const e=document.getElementById("payables-list"),t=document.getElementById("receivables-list");if(!e||!t)return;const a=new Map(D.natures.map(i=>[i.id,i.name])),s=new Map(D.costCenters.map(i=>[i.id,i.name])),r=ko(D.payables),o=ko(D.receivables),n=(i,l)=>{const d=i.status==="paid",c=JSON.stringify(i).replace(/'/g,"&apos;"),m=i.naturezaId?a.get(i.naturezaId):"N/A",b=i.centroDeCustoId?s.get(i.centroDeCustoId):"N/A";let f=l==="payable"?"text-red-600":"text-green-600";const v=d?"bg-gray-200 text-gray-600":l==="payable"?"bg-red-100 text-red-700":"bg-yellow-100 text-yellow-700",p=d?"Finalizado":"Pendente";return d&&(f="text-gray-500"),`
        <div class="bg-white p-3 rounded-lg shadow-sm border-l-4 ${d?"border-gray-300 opacity-70":l==="payable"?"border-red-400":"border-green-400"}">
            <div class="flex justify-between items-center">
                <div>
                    <p class="font-bold">${i.description}</p>
                    <p class="text-sm text-gray-500">Vence em: ${new Date(i.dueDate+"T00:00:00").toLocaleDateString("pt-BR")}</p>
                    <div class="flex flex-wrap gap-2 mt-1">
                        <span class="text-xs font-semibold bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">Natureza: ${m}</span>
                        <span class="text-xs font-semibold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">C. Custo: ${b}</span>
                    </div>
                </div>
                <div class="flex items-center gap-2 text-right">
                    <p class="font-bold text-lg ${f}">R$ ${i.amount.toFixed(2)}</p>
                    <div class="flex flex-col items-center gap-1">
                        <span class="text-xs font-semibold px-2 py-1 rounded-full ${v}">${p}</span>
                        <div class="flex">
                            ${d?"":`<button data-action="mark-as-paid" data-type="${l}" data-id="${i.id}" class="text-gray-500 hover:text-green-500 p-1" title="Marcar como pago/recebido"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></button>`}
                            <button data-action="edit" data-type="${l}" data-item='${c}' class="text-gray-400 hover:text-blue-500 p-1" title="Editar"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z"></path></svg></button>
                            <button data-action="delete" data-type="${l}" data-id="${i.id}" class="text-gray-400 hover:text-red-500 p-1" title="Apagar"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`};e.innerHTML=r.map(i=>n(i,"payable")).join("")||'<p class="text-center text-gray-500 py-4">Nenhuma conta a pagar.</p>',t.innerHTML=o.map(i=>n(i,"receivable")).join("")||'<p class="text-center text-gray-500 py-4">Nenhuma conta a receber.</p>'}function So(){const e=D.payables.filter(n=>n.status==="pending").reduce((n,i)=>n+i.amount,0),t=D.receivables.filter(n=>n.status==="pending").reduce((n,i)=>n+i.amount,0),a=t-e,s=document.getElementById("summary-pending-receivables");s&&(s.textContent=`R$ ${t.toFixed(2)}`);const r=document.getElementById("summary-pending-payables");r&&(r.textContent=`R$ ${e.toFixed(2)}`);const o=document.getElementById("summary-pending-balance");o&&(o.textContent=`R$ ${a.toFixed(2)}`,o.className=`text-2xl font-bold ${a>=0?"text-green-600":"text-red-600"}`)}function aa(e,t=null){document.getElementById("fab-menu")?.classList.add("hidden"),document.getElementById("main-fab-btn")?.classList.remove("rotate-45");const a=document.getElementById("genericModal"),s=`${t?"Editar":"Nova"} ${e==="payable"?"Despesa":"Receita"}`,r=e==="payable"?"bg-red-600 hover:bg-red-700":"bg-green-600 hover:bg-green-700",o=b=>{let f='<option value="">-- Selecione (Opcional) --</option>';const v=Fa(b),p=(x,k="",E=0)=>{const S=E>0?"— ".repeat(E):"";f+=`<option value="${x.id}">${S}${x.name}</option>`,x.children.forEach($=>p($,k+"— "))};return v.forEach(x=>p(x)),f},n=o(D.natures),i=o(D.costCenters),l=t?"":`
        <div>
            <label>Número de Parcelas</label>
            <input type="number" name="installments" class="w-full p-2 border rounded-md" value="1" min="1" max="36">
        </div>
    `;if(a.innerHTML=`
        <div class="modal-content max-w-lg">
            <h2 class="text-2xl font-bold mb-6">${s}</h2>
            <form id="financial-form" class="space-y-4">
                <div><label>Descrição</label><input type="text" name="description" required class="w-full p-2 border rounded-md" value="${t?.description||""}"></div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div class="md:col-span-1"><label>Valor Total (R$)</label><input type="number" step="0.01" name="amount" required class="w-full p-2 border rounded-md" value="${t?.amount||""}"></div>
                    <div class="md:col-span-1"><label>1º Vencimento</label><input type="date" name="dueDate" required class="w-full p-2 border rounded-md" value="${t?.dueDate||""}"></div>
                    <div class="md:col-span-1">${l}</div>
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
        </div>`,a.style.display="flex",t){const b=a.querySelector('[name="naturezaId"]');b&&(b.value=t.naturezaId||"");const f=a.querySelector('[name="centroDeCustoId"]');f&&(f.value=t.centroDeCustoId||"")}const d=a.querySelector("#status"),c=a.querySelector("#payment-date-container"),m=a.querySelector('[name="paymentDate"]');t?.status==="paid"&&(d.checked=!0,c.classList.remove("hidden"),m.value=t.paymentDate||new Date().toISOString().split("T")[0]),d.addEventListener("change",()=>{c.classList.toggle("hidden",!d.checked),m.required=d.checked}),a.querySelector("#financial-form").addEventListener("submit",b=>Al(b,e,t?.id))}async function Rl(){const e=new Date,a=new Date(e.getFullYear(),e.getMonth()-1,1).toISOString().split("T")[0],s=e.toISOString().split("T")[0];D.startDate=a,D.endDate=s,D.currentFilter="pending",D.filterNaturezaId="all",D.filterCostCenterId="all",Pl.innerHTML=`
        <section>
            <div class="flex flex-wrap gap-4 justify-between items-center mb-6">
                <h2 class="text-3xl font-bold text-gray-800">Módulo Financeiro</h2>
                <div class="flex items-center gap-2 flex-wrap">
                    <button data-action="toggle-filters" class="md:hidden py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 flex items-center gap-2">
                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
                        Filtros
                    </button>
                    <button data-action="open-indicators-modal" class="md:hidden py-2 px-4 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 flex items-center gap-2">
                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6a1 1 0 011-1h4a1 1 0 011 1v13m-6 0a2 2 0 002 2h2a2 2 0 002-2m-6 0H9"/></svg>
                        Indicadores
                    </button>
                    <button data-action="open-settings-modal" class="md:hidden py-2 px-4 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 flex items-center gap-2">
                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.096 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        Config.
                    </button>
                    
                    <div class="hidden md:flex items-center gap-2 flex-wrap">
                        <button data-action="open-cash-flow-modal" class="py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                            Fluxo de Caixa
                        </button>
                        <button data-action="manage-natures" class="py-2 px-4 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700">Gerir Naturezas</button>
                        <button data-action="manage-cost-centers" class="py-2 px-4 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700">Gerir Centros de Custo</button>
                        
                        <button data-action="open-indicators-modal" class="py-2 px-4 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 flex items-center gap-2">
                             <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6a1 1 0 011-1h4a1 1 0 011 1v13m-6 0a2 2 0 002 2h2a2 2 0 002-2m-6 0H9"/></svg>
                            Indicadores
                        </button>
                    </div>
                </div>
            </div>

            <div id="financial-content">
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

                <div id="advanced-filters" class="hidden md:block bg-white p-3 rounded-lg shadow-md mb-4">
                    <h3 class="text-lg font-semibold text-gray-700 mb-3">Filtrar Período e Critérios</h3>
                    <div class="grid grid-cols-2 md:flex md:flex-wrap items-end gap-3 mb-3">
                        <div class="w-full md:w-auto">
                            <label for="filterStartDate" class="text-xs font-medium">De:</label>
                            <input type="date" id="filterStartDate" value="${D.startDate}" class="w-full p-1 border rounded-md text-sm">
                        </div>
                        <div class="w-full md:w-auto">
                            <label for="filterEndDate" class="text-xs font-medium">Até:</label>
                            <input type="date" id="filterEndDate" value="${D.endDate}" class="w-full p-1 border rounded-md text-sm">
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
                        
                        <button id="applyDateFilterBtn" class="w-full md:w-auto py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 col-span-2 md:col-span-auto">Aplicar Filtro</button>
                    </div>
                    
                    <div class="flex flex-wrap items-center justify-center sm:justify-start gap-3 border-t pt-3 mt-3">
                        <button data-status-filter="pending" class="filter-btn py-1 px-3 rounded-full text-xs font-semibold transition-colors bg-gray-100 text-gray-600">Aberto/Pendente</button>
                        <button data-status-filter="paid" class="filter-btn py-1 px-3 rounded-full text-xs font-semibold transition-colors bg-gray-100 text-gray-600">Pago/Finalizado</button>
                        <button data-status-filter="all" class="filter-btn py-1 px-3 rounded-full text-xs font-semibold transition-colors bg-gray-100 text-gray-600">Todos os Lançamentos</button>
                    </div>
                </div>
                
                <div class="hidden">
                    <h3 class="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Resumo Previsto (No Período)</h3>
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

                <div id="list-toggle-buttons" class="grid grid-cols-2 gap-3 mb-4 md:hidden">
                    <button data-action="toggle-list-view" data-list="payables" id="btn-payables-view" class="py-2 px-4 font-semibold rounded-lg shadow-md bg-gray-200 text-red-700">Contas a Pagar</button>
                    <button data-action="toggle-list-view" data-list="receivables" id="btn-receivables-view" class="py-2 px-4 font-semibold rounded-lg shadow-md bg-green-100 text-green-700 border border-green-500">Contas a Receber</button>
                </div>


                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div id="payables-container" class="lg:col-span-1">
                        <h3 class="text-xl font-semibold text-red-700 mb-4">Contas a Pagar</h3>
                        <div id="payables-list" class="space-y-3"></div>
                    </div>
                    <div id="receivables-container" class="lg:col-span-1">
                        <h3 class="text-xl font-semibold text-green-700 mb-4">Contas a Receber</h3>
                        <div id="receivables-list" class="space-y-3"></div>
                    </div>
                </div>
            </div>
        </section>
        
        <div id="main-fab-container" class="fixed bottom-6 right-6 z-50">
            <div id="fab-menu" class="flex flex-col items-end space-y-3 mb-3 hidden">
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
            <button data-action="toggle-fab-menu" id="main-fab-btn" class="w-14 h-14 bg-indigo-600 text-white font-bold text-3xl rounded-full shadow-xl hover:bg-indigo-700 flex items-center justify-center transition-transform duration-200">
                <svg class="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
            </button>
        </div>
    `;const r=document.getElementById("main-fab-btn"),o=document.getElementById("fab-menu");if(r&&o){r.addEventListener("click",p=>{p.stopPropagation(),o.classList.toggle("hidden"),r.classList.toggle("rotate-45")});const b=o.querySelector('button[data-action="open-modal"][data-type="receivable"]'),f=o.querySelector('button[data-action="open-modal"][data-type="payable"]'),v=o.querySelector('button[data-action="open-cash-flow-modal"]');b&&b.addEventListener("click",p=>{p.stopPropagation(),aa("receivable")}),f&&f.addEventListener("click",p=>{p.stopPropagation(),aa("payable")}),v&&v.addEventListener("click",p=>{p.stopPropagation(),wo()})}bt&&document.body.removeEventListener("click",bt),ft&&document.getElementById("genericModal").removeEventListener("click",ft);const n=()=>{const b=document.getElementById("filterStartDate"),f=document.getElementById("filterEndDate"),v=document.getElementById("filterNaturezaId"),p=document.getElementById("filterCostCenterId");if(!b)return;D.startDate=b.value,D.endDate=f.value,D.filterNaturezaId=v.value,D.filterCostCenterId=p.value;const x=document.getElementById("advanced-filters");x&&x.classList.contains("hidden")===!1&&window.innerWidth<768&&x.classList.add("hidden"),ye()},i=b=>{const f=b.target.closest("[data-status-filter]");if(!f)return;const v=f.dataset.statusFilter;D.currentFilter=v,document.querySelectorAll("[data-status-filter]").forEach(p=>{p.classList.remove("bg-blue-100","text-blue-800"),p.classList.add("bg-gray-100","text-gray-600")}),f.classList.remove("bg-gray-100","text-gray-600"),f.classList.add("bg-blue-100","text-blue-800"),xa()},l=b=>{const f=document.getElementById("payables-container"),v=document.getElementById("receivables-container"),p=document.getElementById("btn-payables-view"),x=document.getElementById("btn-receivables-view");f&&(window.innerWidth>=1024&&D.currentListView===b||(b==="payables"?(f.classList.remove("hidden"),v.classList.add("hidden"),p&&(p.classList.remove("bg-gray-200"),p.classList.add("bg-red-100","border","border-red-500")),x&&(x.classList.remove("bg-green-100","border","border-green-500"),x.classList.add("bg-gray-200"))):(f.classList.add("hidden"),v.classList.remove("hidden"),p&&(p.classList.remove("bg-red-100","border","border-red-500"),p.classList.add("bg-gray-200")),x&&(x.classList.remove("bg-gray-200"),x.classList.add("bg-green-100","border","border-green-500"))),D.currentListView=b))};document.getElementById("applyDateFilterBtn").addEventListener("click",n),document.getElementById("filterNaturezaId").addEventListener("change",()=>{D.filterNaturezaId=document.getElementById("filterNaturezaId").value}),document.getElementById("filterCostCenterId").addEventListener("change",()=>{D.filterCostCenterId=document.getElementById("filterCostCenterId").value}),document.querySelectorAll("[data-status-filter]").forEach(b=>{b.addEventListener("click",i)}),bt=b=>{const f=b.target.closest("button[data-action]");if(!f)return;const{action:v,type:p,id:x}=f.dataset;v==="edit"?aa(p,JSON.parse(f.dataset.item.replace(/&apos;/g,"'"))):v==="delete"?Nl(p,x):v==="mark-as-paid"?ql(p,x):v==="manage-natures"?xo("nature"):v==="manage-cost-centers"?xo("cost-center"):v==="open-cash-flow-modal"?wo():v==="toggle-filters"?document.getElementById("advanced-filters")?.classList.toggle("hidden"):v==="open-indicators-modal"?Dl():v==="open-settings-modal"?Ml():v==="toggle-list-view"&&l(f.dataset.list)},ft=b=>{const f=b.target.closest('button[data-action^="delete-"]');if(f){const v=f.dataset.action.split("-")[1];d(v,f.dataset.id)}},document.body.addEventListener("click",bt),document.getElementById("genericModal").addEventListener("click",ft);async function d(b,f){const v=b==="nature",p=v?Ni:Ri,x=v?rt:nt,k=v?"natures":"costCenters",E=document.getElementById("hierarchyList");if(await j("Apagar Item","Tem a certeza? Apagar um item principal também apagará os seus sub-itens."))try{await p(f);const $=await x(u.establishmentId);D[k]=$,Is(E,Fa($),b),await ye()}catch($){g("Erro",`Não foi possível apagar: ${$.message}`,"error")}}const c=()=>{const b=window.innerWidth<1024,f=document.getElementById("payables-container"),v=document.getElementById("receivables-container"),p=document.getElementById("list-toggle-buttons");f&&v&&(f.classList.remove("hidden"),v.classList.remove("hidden"),b?(f.classList.remove("lg:col-span-1"),v.classList.remove("lg:col-span-1"),p?.classList.remove("hidden"),l(D.currentListView)):(f.classList.add("lg:col-span-1"),v.classList.add("lg:col-span-1"),p?.classList.add("hidden"),f.classList.remove("hidden"),v.classList.remove("hidden")))};c(),window.addEventListener("resize",c);const m=document.querySelector(`[data-status-filter="${D.currentFilter}"]`);m&&(document.querySelectorAll("[data-status-filter]").forEach(b=>{b.classList.remove("bg-blue-100","text-blue-800"),b.classList.add("bg-gray-100","text-gray-600")}),m.classList.remove("bg-gray-100","text-gray-600"),m.classList.add("bg-blue-100","text-blue-800"));try{const b=await Yi(u.establishmentId),f=document.getElementById("summary-today-payables");f&&(f.textContent=`R$ ${b.totalPayables.toFixed(2)}`);const v=document.getElementById("summary-today-receivables");v&&(v.textContent=`R$ ${b.totalReceivables.toFixed(2)}`)}catch{}await ye()}const Fl=e=>w("/api/commissions/calculate",{method:"POST",body:JSON.stringify(e)}),jl=e=>w("/api/commissions/save",{method:"POST",body:JSON.stringify(e)}),Hl=(e,t)=>{const a=new URLSearchParams({startDate:e,endDate:t}).toString();return w(`/api/commissions/stats?${a}`)},Ol=(e={})=>{Object.keys(e).forEach(s=>(e[s]===void 0||e[s]===null||e[s]==="")&&delete e[s]);const t=new URLSearchParams(e).toString(),a=`/api/commissions/history${t?"?"+t:""}`;return w(a)},zl=e=>w(`/api/commissions/report/${e}`,{method:"DELETE"}),At=new Date,$o=new Date(At.getFullYear(),At.getMonth(),1),M={currentTab:"dashboard",professionals:[],calculationResult:null,historyData:[],periodString:"",dashStartDate:$o.toISOString().split("T")[0],dashEndDate:At.toISOString().split("T")[0],dashStats:{revenue:0,commissions:0},histStartDate:$o.toISOString().split("T")[0],histEndDate:At.toISOString().split("T")[0],histProfessionalId:"all"};let ht=null;const We=document.getElementById("content");async function Vl(){try{M.professionals=await Z(u.establishmentId)}catch(e){console.error("Erro profissionais",e)}ed(),Ul(),Gt(),qt("dashboard")}function Ul(){ht&&We.removeEventListener("click",ht),ht=e=>{const t=e.target.closest("button");if(!t)return;const a=t.dataset.action,s=t.dataset.id,r=t.dataset.idx;switch(a){case"tab-nav":qt(t.dataset.tab);break;case"toggle-all-profs":_l();break;case"back-to-filters":M.calculationResult=null,Nt(document.getElementById("commissions-content"));break;case"view-preview-items":Kl(r);break;case"save-final-report":Wl();break;case"start-new-calc":qt("calculator");break;case"print-receipt":Gl(s);break;case"delete-report":Yl(s);break;case"filter-dashboard":Gt();break;case"filter-history":ja();break}},We.addEventListener("click",ht),We.oninput=e=>{if(e.target.classList.contains("input-debit")||e.target.classList.contains("input-credit")){const t=e.target.dataset.idx;Xl(t)}},We.onsubmit=e=>{e.target.id==="calc-form"&&(e.preventDefault(),Jl())}}async function Gt(){const e=document.getElementById("dash-start"),t=document.getElementById("dash-end");e&&(M.dashStartDate=e.value),t&&(M.dashEndDate=t.value);const a=document.getElementById("dashboard-stats-container");a&&(a.innerHTML='<div class="flex justify-center py-10"><div class="loader"></div></div>');try{const s=await Hl(M.dashStartDate,M.dashEndDate);M.dashStats={revenue:s.totalRevenue||0,commissions:s.totalCommissionsPaid||0},M.currentTab==="dashboard"&&Cs(document.getElementById("commissions-content"))}catch(s){console.error(s),a&&(a.innerHTML='<p class="text-red-500 text-center">Erro ao carregar dados.</p>')}}async function ja(){const e=document.getElementById("hist-start"),t=document.getElementById("hist-end"),a=document.getElementById("hist-prof");e&&(M.histStartDate=e.value),t&&(M.histEndDate=t.value),a&&(M.histProfessionalId=a.value);const s=document.getElementById("history-list-container");if(s){s.innerHTML='<div class="flex justify-center py-10"><div class="loader"></div></div>';try{const r=await Ol({startDate:M.histStartDate,endDate:M.histEndDate,professionalId:M.histProfessionalId});M.historyData=r,Ls(s,r)}catch{s.innerHTML='<p class="text-red-500 text-center py-4">Erro ao buscar registros.</p>'}}}function _l(){const e=document.querySelectorAll(".prof-checkbox"),t=Array.from(e).every(a=>a.checked);e.forEach(a=>a.checked=!t)}async function Jl(){const e=Array.from(document.querySelectorAll(".prof-checkbox:checked")).map(o=>o.value);if(e.length===0)return g("Atenção","Selecione profissionais","error");const t={professionalIds:e,startDate:document.getElementById("start-date").value,endDate:document.getElementById("end-date").value,calculationTypes:{services:document.getElementById("type-services").checked,products:document.getElementById("type-products").checked,packages:document.getElementById("type-packages").checked}},a=new Date(t.startDate+"T00:00:00").toLocaleDateString("pt-BR"),s=new Date(t.endDate+"T00:00:00").toLocaleDateString("pt-BR");M.periodString=`${a} a ${s}`;const r=document.getElementById("commissions-content");r.innerHTML='<div class="flex flex-col items-center justify-center py-20"><div class="loader mb-4"></div><p class="text-gray-500 animate-pulse">Calculando...</p></div>';try{const o=await Fl(t);M.calculationResult=o.map(n=>({...n,extraDebit:0,extraCredit:0,finalValue:n.summary.totalCommission,notes:""})),Nt(r)}catch(o){g("Erro",o.message,"error"),M.calculationResult=null,Nt(r)}}async function Wl(){const e=M.calculationResult.length;if(await j("Confirmar",`Gerar ${e} relatórios? Isso marcará as vendas como pagas.`))try{const a=M.calculationResult.map(s=>{const r=s.items.map(o=>o.originalSaleId).filter(o=>o!=null);return jl({professionalId:s.professionalId,professionalName:s.professionalName,period:M.periodString,processedSalesIds:r,reportData:{...s,summary:{...s.summary,finalValue:s.finalValue,extraDebit:s.extraDebit||0,extraCredit:s.extraCredit||0,notes:s.notes||""}}})});await Promise.all(a),g("Sucesso","Pagamentos registrados!","success"),M.calculationResult=null,Gt(),qt("history")}catch(a){g("Erro",a.message,"error")}}function Gl(e){const t=M.historyData.find(a=>a.id===e);t&&Ql(t)}async function Yl(e){if(await j("Excluir","Deseja remover este registro? As vendas voltarão a ficar disponíveis para cálculo."))try{await zl(e),g("Sucesso","Registro removido.","success"),ja(),Gt()}catch(a){g("Erro",a.message,"error")}}function Ql(e){const{jsPDF:t}=window.jspdf;if(!t)return g("Erro","PDF lib não carregada.","error");const a=new t,s=a.internal.pageSize.getWidth()/2;a.setFontSize(18),a.setFont(void 0,"bold"),a.text("RECIBO DE PAGAMENTO DE COMISSÃO",s,20,{align:"center"}),a.setFontSize(12),a.setFont(void 0,"normal"),a.text(`Profissional: ${e.professionalName}`,15,40),a.text(`Período: ${e.period}`,15,48);const r=[["Comissão Bruta",`R$ ${e.summary.totalCommission.toFixed(2)}`]];e.summary.extraCredit>0&&r.push(["(+) Bônus",`R$ ${e.summary.extraCredit.toFixed(2)}`]),e.summary.extraDebit>0&&r.push(["(-) Descontos",`R$ ${e.summary.extraDebit.toFixed(2)}`]),a.autoTable({startY:60,head:[["Descrição","Valor"]],body:r,theme:"grid"});const o=a.lastAutoTable.finalY+10;a.setFontSize(14),a.setFont(void 0,"bold"),a.text(`Total Líquido: R$ ${(e.summary.finalValue||e.summary.totalCommission).toFixed(2)}`,190,o,{align:"right"}),a.save(`Recibo_${e.professionalName}.pdf`)}function Xl(e){const t=document.querySelectorAll(`.input-debit[data-idx="${e}"]`),a=document.querySelectorAll(`.input-credit[data-idx="${e}"]`);let s=0,r=0;if(t.forEach(o=>{o.value&&(s=parseFloat(o.value))}),a.forEach(o=>{o.value&&(r=parseFloat(o.value))}),M.calculationResult&&M.calculationResult[e]){const o=M.calculationResult[e];o.extraDebit=s,o.extraCredit=r,o.finalValue=o.summary.totalCommission-s+r,t.forEach(i=>{i!==document.activeElement&&(i.value=s||"")}),a.forEach(i=>{i!==document.activeElement&&(i.value=r||"")}),document.querySelectorAll(`.final-value-display[data-idx="${e}"]`).forEach(i=>i.innerText=`R$ ${o.finalValue.toFixed(2)}`),Zl()}}function Zl(){const e=M.calculationResult.reduce((a,s)=>a+s.finalValue,0);document.querySelectorAll("#grand-total-display").forEach(a=>a.innerText=`R$ ${e.toFixed(2)}`)}function Kl(e){const t=M.calculationResult[e];if(!t)return;const a=t.items.map(s=>`
        <div class="flex justify-between items-center p-3 border-b border-gray-100 last:border-0 hover:bg-gray-50">
            <div class="flex-1">
                <p class="text-sm font-bold text-gray-800">${s.item}</p>
                <p class="text-xs text-gray-500">${new Date(s.date).toLocaleDateString("pt-BR")} • ${s.client}</p>
            </div>
            <div class="text-right">
                <p class="text-sm font-bold text-green-600">R$ ${s.commissionValue.toFixed(2)}</p>
                <p class="text-xs text-gray-400">${s.commissionRate}% de R$ ${s.value.toFixed(2)}</p>
            </div>
        </div>
    `).join("");Y({title:"Detalhes da Comissão",contentHTML:`<div class="bg-gray-50 p-3 rounded-lg mb-4 flex justify-between items-center"><div><p class="text-xs text-gray-500">Profissional</p><p class="font-bold text-gray-800">${t.professionalName}</p></div><div class="text-right"><p class="text-xs text-gray-500">Total Itens</p><p class="font-bold text-gray-800">${t.items.length}</p></div></div><div class="border rounded-lg overflow-hidden max-h-[60vh] overflow-y-auto">${a}</div>`,maxWidth:"max-w-md"})}function Nt(e){if(M.calculationResult){const t=M.calculationResult,a=t.reduce((o,n)=>o+n.finalValue,0),s=t.map((o,n)=>`
            <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-4">
                <div class="flex justify-between items-start mb-3 border-b border-gray-100 pb-2">
                    <div><h4 class="font-bold text-gray-900 text-lg">${o.professionalName}</h4><p class="text-xs text-gray-500">${o.summary.totalItems} itens</p></div>
                    <div class="text-right"><p class="text-xs text-gray-500">Bruto</p><p class="font-bold text-gray-700">R$ ${o.summary.totalCommission.toFixed(2)}</p></div>
                </div>
                <div class="grid grid-cols-2 gap-3 mb-3">
                    <div><label class="text-xs font-bold text-red-500 uppercase">Desc.</label><input type="number" step="0.01" data-idx="${n}" class="input-debit w-full mt-1 p-2 border border-red-200 rounded-lg bg-red-50 font-bold text-red-700" value="${o.extraDebit||""}"></div>
                    <div><label class="text-xs font-bold text-green-500 uppercase">Bônus</label><input type="number" step="0.01" data-idx="${n}" class="input-credit w-full mt-1 p-2 border border-green-200 rounded-lg bg-green-50 font-bold text-green-700" value="${o.extraCredit||""}"></div>
                </div>
                <div class="flex justify-between items-center bg-gray-50 p-3 rounded-lg"><span class="text-sm font-medium">Líquido</span><span class="text-xl font-bold text-indigo-700 final-value-display" data-idx="${n}">R$ ${o.finalValue.toFixed(2)}</span></div>
                <button data-action="view-preview-items" data-idx="${n}" class="w-full mt-3 py-2 text-indigo-600 font-medium text-sm border border-indigo-100 rounded-lg">Ver Detalhes</button>
            </div>`).join(""),r=t.map((o,n)=>`
            <tr class="hover:bg-gray-50"><td class="px-6 py-4 font-bold text-gray-900">${o.professionalName}</td><td class="px-6 py-4 text-right">R$ ${o.summary.totalCommission.toFixed(2)}</td>
            <td class="px-6 py-4 text-right"><input type="number" step="0.01" data-idx="${n}" class="input-debit w-24 text-right border-gray-300 rounded bg-red-50 text-red-700" value="${o.extraDebit||""}"></td>
            <td class="px-6 py-4 text-right"><input type="number" step="0.01" data-idx="${n}" class="input-credit w-24 text-right border-gray-300 rounded bg-green-50 text-green-700" value="${o.extraCredit||""}"></td>
            <td class="px-6 py-4 text-right font-bold text-indigo-700 final-value-display" data-idx="${n}">R$ ${o.finalValue.toFixed(2)}</td>
            <td class="px-6 py-4 text-center"><button data-action="view-preview-items" data-idx="${n}" class="text-indigo-600 hover:underline text-sm">Ver Itens</button></td></tr>`).join("");e.innerHTML=`
            <div class="space-y-4 animate-fade-in pb-20">
                <div class="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-200 sticky top-0 z-10 flex justify-between items-center">
                    <div><button data-action="back-to-filters" class="text-sm text-gray-500 hover:text-indigo-600">← Voltar</button><h2 class="text-lg md:text-2xl font-bold text-gray-800">Prévia</h2></div>
                    <div class="text-right"><p class="text-xs uppercase font-bold text-gray-500">Total a Pagar</p><p id="grand-total-display" class="text-2xl md:text-3xl font-extrabold text-green-600">R$ ${a.toFixed(2)}</p></div>
                </div>
                <div class="block md:hidden space-y-4">${s}</div>
                <div class="hidden md:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"><table class="min-w-full divide-y divide-gray-200"><thead class="bg-gray-50"><tr><th class="px-6 py-3 text-left text-xs font-bold uppercase">Profissional</th><th class="px-6 py-3 text-right text-xs font-bold uppercase">Bruto</th><th class="px-6 py-3 text-right text-xs font-bold uppercase">(-) Desc.</th><th class="px-6 py-3 text-right text-xs font-bold uppercase">(+) Bônus</th><th class="px-6 py-3 text-right text-xs font-bold uppercase">Líquido</th><th class="px-6 py-3 text-center text-xs font-bold uppercase">Ações</th></tr></thead><tbody>${r}</tbody></table></div>
                <div class="fixed bottom-0 left-0 w-full bg-white p-4 border-t border-gray-200 shadow-lg md:static md:bg-transparent md:border-0 md:shadow-none z-30 flex justify-end gap-3">
                    <button data-action="back-to-filters" class="hidden md:block px-6 py-3 border border-gray-300 rounded-xl text-gray-700 font-bold">Cancelar</button>
                    <button data-action="save-final-report" class="w-full md:w-auto px-6 py-4 md:py-3 bg-green-600 text-white rounded-xl font-bold shadow-md hover:bg-green-700 transition">Finalizar Apuração</button>
                </div>
            </div>`}else{const t=new Date().toISOString().split("T")[0],a=new Date(new Date().getFullYear(),new Date().getMonth(),1).toISOString().split("T")[0],s=M.professionals.map(r=>`
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
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-60 overflow-y-auto">${s}</div>
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
            </form>`}}function ed(){We.innerHTML=`
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
    `}function qt(e){M.currentTab=e,["dashboard","calculator","history"].forEach(a=>{const s=document.getElementById(`tab-${a}`);a===e?s.className="flex-1 md:flex-none px-4 py-2 rounded-md text-sm font-bold bg-white text-indigo-600 shadow-sm border border-gray-100":s.className="flex-1 md:flex-none px-4 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700"});const t=document.getElementById("commissions-content");e==="dashboard"&&Cs(t),e==="calculator"&&Nt(t),e==="history"&&td(t)}function Cs(e){const{revenue:t,commissions:a}=M.dashStats,s=t>0?(a/t*100).toFixed(1):0;e.innerHTML=`
        <div class="space-y-6 animate-fade-in">
            <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row gap-4 items-end">
                <div class="flex-1 w-full">
                    <label class="text-xs font-bold text-gray-500 uppercase">Data Inicial</label>
                    <input type="date" id="dash-start" value="${M.dashStartDate}" class="w-full mt-1 rounded-lg border-gray-300">
                </div>
                <div class="flex-1 w-full">
                    <label class="text-xs font-bold text-gray-500 uppercase">Data Final</label>
                    <input type="date" id="dash-end" value="${M.dashEndDate}" class="w-full mt-1 rounded-lg border-gray-300">
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
                                    ${s}%
                                </span>
                            </div>
                        </div>
                        <div class="overflow-hidden h-4 mb-4 text-xs flex rounded bg-indigo-100">
                            <div style="width:${Math.min(s,100)}%" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500 transition-all duration-500"></div>
                        </div>
                        <p class="text-sm text-gray-500">
                            De cada R$ 100,00 vendidos, <strong>R$ ${s}</strong> foram pagos em comissões neste período.
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
    `}function td(e){const t=M.professionals.map(a=>`<option value="${a.id}" ${M.histProfessionalId===a.id?"selected":""}>${a.name}</option>`).join("");e.innerHTML=`
        <div class="space-y-6">
            <div class="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                <h2 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    Pesquisar Pagamentos
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <div>
                        <label class="text-xs font-bold text-gray-500 uppercase">De (Data Pagto)</label>
                        <input type="date" id="hist-start" value="${M.histStartDate}" class="w-full mt-1 rounded-lg border-gray-300">
                    </div>
                    <div>
                        <label class="text-xs font-bold text-gray-500 uppercase">Até</label>
                        <input type="date" id="hist-end" value="${M.histEndDate}" class="w-full mt-1 rounded-lg border-gray-300">
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
    `,M.historyData.length>0?Ls(document.getElementById("history-list-container"),M.historyData):ja()}function Ls(e,t){if(t.length===0){e.innerHTML=`
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
    `).join(""),s=t.map(r=>`
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
                <tbody>${s}</tbody>
            </table>
        </div>
    `}const oa=document.getElementById("content");let we={allPackages:[],catalogForModal:{services:[],products:[]}},xt=null,Be=null;function ad(e=6){let t="";for(let a=0;a<e;a++)t+=`
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
        `;return t}function od(){const e=document.getElementById("packagesListContainer");if(e){if(we.allPackages.length===0){e.innerHTML=`
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
            </div>`;return}e.innerHTML=we.allPackages.map(t=>{const a=t.status==="active",s=JSON.stringify(t).replace(/'/g,"&apos;"),r=t.price||0,o=t.originalPrice||0,n=o>r?o-r:0,i=o>0?(o-r)/o*100:0,l=h(t.name),d=h(t.description||"Sem descrição");return`
            <div class="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 flex flex-col cursor-pointer"
                 data-action="edit-package" data-package='${s}'>
                
                <div class="p-4 flex-grow">
                    <div class="flex justify-between items-start">
                        <div class="min-w-0 pr-2">
                            <h3 class="text-base font-bold text-gray-900 truncate">${l}</h3>
                            <p class="text-xs text-gray-500 truncate">${d}</p>
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
        `}).join("")}}function Eo(){const e=document.getElementById("genericModal");e.style.display="none",Be&&e.removeEventListener("click",Be)}async function Io(e=null){const t=document.getElementById("genericModal"),a=!!e,s=e?JSON.parse(JSON.stringify(e.items||[])):[],r=h(e?.name||""),o=h(e?.description||""),n=e?.price||"",i=e?.commissionRate||0,l=e?.validityDays||30,d=`
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
                                <input type="text" id="packageName" value="${r}" class="mt-1 w-full p-2 border rounded-md" required>
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
                            <textarea id="packageDescription" rows="2" class="mt-1 w-full p-2 border rounded-md">${o}</textarea>
                        </div>
                    </div>

                    <div class="border-t pt-6">
                        <div class="flex justify-between items-center mb-2">
                            <h3 class="text-lg font-semibold text-gray-800">Itens Incluídos</h3>
                            <button type="button" id="add-item-to-package-btn" class="py-1 px-3 bg-indigo-600 text-white font-semibold rounded-lg text-sm hover:bg-indigo-700 transition shadow-sm">+ Adicionar Item</button>
                        </div>
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
                                <input type="number" step="0.01" id="finalPrice" value="${n}" class="mt-1 w-full p-2 border rounded-md" required>
                            </div>
                            <div>
                                <label for="commissionRate" class="block text-sm font-medium text-gray-700">Comissão (%)</label>
                                <input type="number" id="commissionRate" value="${i}" class="mt-1 w-full p-2 border rounded-md" placeholder="Ex: 10">
                            </div>
                            <div>
                                <label for="validityDays" class="block text-sm font-medium text-gray-700">Validade (dias)</label>
                                <input type="number" id="validityDays" value="${l}" class="mt-1 w-full p-2 border rounded-md" placeholder="Ex: 30, 60, 90">
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
    `;t.innerHTML=d,t.style.display="flex";const c=t.querySelector("#package-items-list"),m=(f,v)=>{const p=v.querySelector("#originalPrice"),x=f.reduce((k,E)=>k+E.price*E.quantity,0);p&&(p.textContent=`R$ ${x.toFixed(2)}`)},b=f=>{f.length===0?c.innerHTML='<p class="text-center text-gray-500 p-4">Nenhum item adicionado.</p>':c.innerHTML=f.map((v,p)=>{const x=v.type==="service",k=x?"Serviço":"Produto",E=x?"bg-indigo-100 text-indigo-800":"bg-green-100 text-green-800";return`
                <div class="flex items-center justify-between bg-white p-2 rounded shadow-sm border border-gray-200">
                    <div class="flex items-center gap-3 min-w-0">
                        <input type="number" value="${v.quantity}" min="1" class="w-12 p-1 border rounded-md text-sm quantity-input flex-shrink-0" data-index="${p}">
                        <span class="text-xs font-medium px-2 py-0.5 rounded-full ${E}">${k}</span>
                        <span class="font-medium text-gray-800 truncate">${h(v.name)}</span>
                    </div>
                    <div class="flex items-center gap-2 flex-shrink-0">
                        <span class="text-sm text-gray-600">R$ ${v.price.toFixed(2)}</span>
                        <button type="button" class="text-red-500 hover:text-red-700 remove-item-btn font-bold" data-index="${p}">&times;</button>
                    </div>
                </div>
            `}).join(""),m(f,t)};b(s),c.addEventListener("change",f=>{if(f.target.classList.contains("quantity-input")){const v=parseInt(f.target.dataset.index,10),p=parseInt(f.target.value,10);p>0&&s[v]&&(s[v].quantity=p,b(s))}}),c.addEventListener("click",f=>{if(f.target.classList.contains("remove-item-btn")){const v=parseInt(f.target.dataset.index,10);s.splice(v,1),b(s)}}),t.querySelector("#add-item-to-package-btn").onclick=()=>sd(f=>{const v=s.find(p=>p.id===f.id&&p.type===f.type);v?v.quantity++:s.push({...f,quantity:1}),b(s)}),Be&&t.removeEventListener("click",Be),Be=async f=>{const v=f.target.closest("button[data-action]");if(!v)return;const p=v.dataset.action;if(f.stopPropagation(),p==="close-modal"&&Eo(),p==="save-package"){const x=v,k={id:document.getElementById("packageId").value||null,name:document.getElementById("packageName").value,description:document.getElementById("packageDescription").value,status:document.getElementById("packageStatus").value,items:s,originalPrice:s.reduce((E,S)=>E+S.price*S.quantity,0),price:parseFloat(document.getElementById("finalPrice").value),commissionRate:parseFloat(document.getElementById("commissionRate").value)||0,validityDays:parseInt(document.getElementById("validityDays").value,10)||null,establishmentId:u.establishmentId};if(!k.name||!k.price){g("Erro","Nome do Pacote e Preço Final são obrigatórios.","error");return}if(k.items.length===0){g("Erro","Adicione pelo menos um item ao pacote.","error");return}x.disabled=!0,x.textContent="A salvar...";try{a?await pn(k.id,k):(delete k.id,await mn(k)),g("Sucesso!",`Pacote ${a?"atualizado":"criado"} com sucesso.`,"success"),Eo(),await Ha()}catch(E){g("Erro",`Não foi possível salvar o pacote: ${E.message}`,"error"),x.disabled=!1,x.textContent="Salvar Pacote"}}},t.addEventListener("click",Be)}function sd(e){let t="";const a=document.createElement("div");a.id="item-selection-modal",a.className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[110]";const s={service:'<svg class="w-6 h-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v4.512a9.04 9.04 0 00-3 5.012M12 12a9.04 9.04 0 01-3-5.012V5l-1-1z" /></svg>',product:'<svg class="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>'},r=l=>{const d=t.toLowerCase(),c=we.catalogForModal.services.filter(v=>v.name.toLowerCase().includes(d)),m=we.catalogForModal.products.filter(v=>v.name.toLowerCase().includes(d)),b=c.map(v=>`
            <button data-action="select-item" data-item-type="service" data-item-id="${v.id}" class="flex items-center gap-3 w-full p-3 bg-white border rounded-lg hover:bg-gray-50 transition">
                <div class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gray-100">${s.service}</div>
                <span class="flex-grow text-left min-w-0 truncate">${h(v.name)}</span>
                <span class="font-semibold flex-shrink-0">R$ ${v.price.toFixed(2)}</span>
            </button>
        `).join("")||'<p class="text-xs text-gray-400 text-center p-4">Nenhum serviço encontrado.</p>',f=m.map(v=>`
            <button data-action="select-item" data-item-type="product" data-item-id="${v.id}" class="flex items-center gap-3 w-full p-3 bg-white border rounded-lg hover:bg-gray-50 transition">
                <div class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gray-100">${s.product}</div>
                <span class="flex-grow text-left min-w-0 truncate">${h(v.name)}</span>
                <span class="font-semibold flex-shrink-0">R$ ${v.price.toFixed(2)}</span>
            </button>
        `).join("")||'<p class="text-xs text-gray-400 text-center p-4">Nenhum produto encontrado.</p>';l.innerHTML=`
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><h4 class="font-semibold mb-2 text-center text-indigo-600">Serviços</h4><div id="modal-service-list" class="space-y-2 max-h-96 overflow-y-auto">${b}</div></div>
                <div><h4 class="font-semibold mb-2 text-center text-green-600">Produtos</h4><div id="modal-product-list" class="space-y-2 max-h-96 overflow-y-auto">${f}</div></div>
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
            </div>
        </div>
    `,document.body.appendChild(a);const o=a.querySelector("#item-selection-list"),n=a.querySelector("#item-search-input"),i=()=>{a.remove()};r(o),n.addEventListener("input",()=>{t=n.value,r(o)}),a.addEventListener("click",l=>{const d=l.target.closest('[data-action="select-item"]'),c=l.target.closest('[data-action="close-selection-modal"]');if(d){const{itemType:m,itemId:b}=d.dataset,v=(we.catalogForModal[m+"s"]||[]).find(p=>p.id===b);v&&(e({...v,type:m}),i())}else(c||l.target===a)&&i()})}async function Ha(){oa.innerHTML=`
        <section id="packages-page" class="p-4 sm:p-6">
             <div class="sticky top-0 z-10 bg-gray-100 sm:bg-transparent pt-3 pb-4 mb-6 -mx-4 -mt-4 sm:mx-0 sm:mt-0 sm:bg-transparent sm:pt-0 sm:pb-0 sm:static">
                <div class="flex justify-between items-center px-4 sm:px-0">
                    <h2 class="text-2xl sm:text-3xl font-bold text-gray-800">Pacotes de Serviços</h2>
                </div>
            </div>
            
            <div id="packagesListContainer" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pb-20">
                ${ad()}
            </div>
            
            <button data-action="new-package" class="fixed z-30 bottom-20 right-4 sm:bottom-6 sm:right-6 w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-transform hover:scale-105">
                <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
            </button>
        </section>
    `,xt&&oa.removeEventListener("click",xt),xt=e=>{if(e.target.closest('[data-action-stop-propagation="true"]')){e.stopPropagation();const s=e.target.closest('[data-action="delete-package"]');if(s){const r=s.dataset.id;j("Excluir Pacote","Tem a certeza que deseja excluir este pacote? Esta ação é irreversível.").then(async o=>{if(o)try{await gn(r),g("Sucesso!","Pacote excluído.","success"),await Ha()}catch(n){g("Erro",`Não foi possível excluir: ${n.message}`,"error")}})}return}const t=e.target.closest('[data-action="new-package"], [data-action="edit-package"]');if(!t)return;const a=t.dataset.action;if(a==="new-package")Io(null);else if(a==="edit-package"){const s=JSON.parse(t.dataset.package);Io(s)}},oa.addEventListener("click",xt);try{const[e,t,a]=await Promise.all([as(u.establishmentId),Se(u.establishmentId),Ht(u.establishmentId)]);we.allPackages=e,we.catalogForModal={services:t.filter(s=>s.active),products:a},od()}catch{document.getElementById("packagesListContainer").innerHTML='<p class="text-red-500 col-span-full">Erro ao carregar pacotes.</p>'}}const rd=document.getElementById("content");let nd=null;async function id(){const e=h(u.userName||"Usuário"),t=h(V.currentUser?.email||"E-mail não disponível"),a=u.userName?u.userName.charAt(0):"U";rd.innerHTML=`
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
                             src="https://placehold.co/128x128/E2E8F0/4A5568?text=${encodeURIComponent(a)}" 
                             alt="Avatar do Usuário" 
                             class="w-32 h-32 rounded-full object-cover border-4 border-indigo-200">
                        <h3 class="text-2xl font-bold text-gray-800 mt-4">${e}</h3>
                        <p class="text-md text-gray-600">${t}</p>
                    </div>
                </div>
            </div>

            <div class="md:col-span-2">
                 <div id="professional-agenda-block" class="p-4 md:p-6 bg-white rounded-lg shadow-md space-y-6">
                    <div class="flex justify-center items-center h-full"><div class="loader"></div></div>
                </div>
            </div>
        </div>
    `,await ld()}async function ld(){const e=document.getElementById("professional-agenda-block");e.innerHTML="";try{const t=u.userProfessionalId;if(t){const a=await ir(t);nd=a,a.photo&&(document.getElementById("user-profile-avatar").src=a.photo);const s=h(a.name);e.innerHTML=`
                <div class="bg-indigo-50 p-4 rounded-lg flex items-center gap-4 mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                        <p class="font-semibold text-indigo-800">Você está associado ao profissional: ${s}</p>
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
            `,dd(a.id),document.getElementById("my-blocks-filter").addEventListener("change",o=>Rt(a.id,o.target.value)),Rt(a.id,"future")}else e.innerHTML=`
                <div class="bg-gray-100 p-4 rounded-lg text-center text-gray-600">
                    <p>Você não possui um perfil de profissional associado a esta conta.</p>
                    <p class="text-sm mt-2">Para gerenciar sua agenda, peça ao administrador para associar seu usuário a um profissional existente na tela de "Usuários".</p>
                </div>
            `}catch(t){console.error("Erro ao carregar seção de profissional:",t),e.innerHTML=`
            <div class="bg-red-100 p-4 rounded-lg text-red-700">
                <p>Ocorreu um erro ao carregar os dados do profissional.</p>
                <p class="text-sm mt-2">${h(t.message)}</p>
            </div>
        `}}function dd(e){const t=document.getElementById("block-schedule-form");t.addEventListener("submit",async a=>{a.preventDefault();const s=t.querySelector("#blockDate").value,r=t.querySelector("#blockStartTime").value,o=t.querySelector("#blockEndTime").value,n=t.querySelector("#blockReason").value;if(!s||!r||!o){g("Erro","Por favor, preencha a data e os horários de início e fim.","error");return}if(r>=o){g("Erro","A hora de início deve ser anterior à hora de fim.","error");return}const i=new Date(`${s}T${r}:00`),l=new Date(`${s}T${o}:00`),d=t.querySelector('button[type="submit"]');d.disabled=!0,d.textContent="A bloquear...";try{await zt({establishmentId:u.establishmentId,professionalId:e,reason:n||"Bloqueado (Meu Perfil)",startTime:i.toISOString(),endTime:l.toISOString()}),g("Sucesso","Agenda bloqueada com sucesso!","success"),t.reset();const c=document.getElementById("my-blocks-filter").value;Rt(e,c)}catch(c){console.error("Erro ao bloquear agenda:",c),g("Erro",`Não foi possível bloquear a agenda: ${c.message}`,"error")}finally{d.disabled=!1,d.textContent="Bloquear Agenda"}})}async function Rt(e,t="future"){const a=document.getElementById("my-blocks-list");a.innerHTML='<p class="text-gray-500">A carregar bloqueios...</p>';try{const s=new Date;let r,o;t==="history"?(o=new Date,r=new Date,r.setFullYear(r.getFullYear()-1)):(r=new Date,o=new Date,o.setFullYear(o.getFullYear()+1));let i=(await Ot(u.establishmentId,r.toISOString(),o.toISOString(),e)).map(l=>({...l,startTime:new Date(l.startTime),endTime:new Date(l.endTime)}));t==="history"?i=i.filter(l=>l.endTime<s).sort((l,d)=>d.startTime-l.startTime):i=i.filter(l=>l.endTime>=s).sort((l,d)=>l.startTime-d.startTime),i.length>0?(a.innerHTML=i.map(l=>{const d=l.startTime.toLocaleDateString("pt-BR"),c=`${l.startTime.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})} - ${l.endTime.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}`,m=l.endTime<new Date,b=h(l.reason||"Sem motivo");return`
                    <div class="flex items-center justify-between p-3 ${m?"bg-gray-100 opacity-75":"bg-white border border-gray-200"} rounded-md shadow-sm">
                        <div>
                            <p class="font-semibold text-gray-800">${d} das ${c}</p>
                            <p class="text-sm text-gray-600">${b}</p>
                        </div>
                        <button data-block-id="${l.id}" class="remove-block-btn text-red-500 hover:text-red-700 text-2xl font-bold leading-none p-1" title="Apagar bloqueio">
                            &times;
                        </button>
                    </div>
                `}).join(""),a.querySelectorAll(".remove-block-btn").forEach(l=>{l.addEventListener("click",async d=>{const c=d.currentTarget.dataset.blockId;if(confirm("Tem certeza que deseja remover este bloqueio?"))try{await Ia(c),g("Sucesso","Bloqueio removido.","success"),Rt(e,t)}catch(m){console.error("Erro ao remover bloqueio:",m),g("Erro",`Não foi possível remover o bloqueio: ${m.message}`,"error")}})})):a.innerHTML=`<p class="text-gray-500 py-4 text-center">Nenhum bloqueio ${t==="history"?"no histórico recente":"futuro agendado"}.</p>`}catch(s){console.error("Erro ao carregar bloqueios:",s),a.innerHTML=`<p class="text-red-500">Erro ao carregar bloqueios: ${h(s.message)}</p>`}}const yt=document.getElementById("loadingScreen"),sa=document.getElementById("dashboardContent"),ra=document.getElementById("content"),Co=document.getElementById("notificationBell"),na=document.getElementById("notificationBadge"),wt=document.getElementById("notificationPanel"),Lo=document.getElementById("notificationList"),ia=document.getElementById("profileMenuButton"),ee=document.getElementById("profileDropdown"),cd=document.getElementById("profileName"),ud=document.getElementById("profileEmail"),md=document.getElementById("logoutButton"),pd=document.getElementById("cancellationHistoryBtn"),To=document.getElementById("myProfileLink"),Po={indigo:{main:"#4f46e5",hover:"#4338ca",light:"#e0e7ff",text:"#ffffff"},blue:{main:"#2563eb",hover:"#1d4ed8",light:"#dbeafe",text:"#ffffff"},sky:{main:"#0284c7",hover:"#0369a1",light:"#e0f2fe",text:"#ffffff"},teal:{main:"#0d9488",hover:"#0f766e",light:"#ccfbf1",text:"#ffffff"},emerald:{main:"#059669",hover:"#047857",light:"#d1fae5",text:"#ffffff"},green:{main:"#16a34a",hover:"#15803d",light:"#dcfce7",text:"#ffffff"},lime:{main:"#65a30d",hover:"#4d7c0f",light:"#ecfccb",text:"#ffffff"},amber:{main:"#d97706",hover:"#b45309",light:"#fef3c7",text:"#1f2937"},orange:{main:"#ea580c",hover:"#c2410c",light:"#ffedd5",text:"#ffffff"},red:{main:"#dc2626",hover:"#b91c1c",light:"#fee2e2",text:"#ffffff"},rose:{main:"#e11d48",hover:"#be123c",light:"#ffe4e6",text:"#ffffff"},pink:{main:"#db2777",hover:"#be185d",light:"#fce7f3",text:"#ffffff"},fuchsia:{main:"#c026d3",hover:"#a21caf",light:"#fae8ff",text:"#ffffff"},purple:{main:"#7c3aed",hover:"#6d28d9",light:"#ede9fe",text:"#ffffff"},violet:{main:"#8b5cf6",hover:"#7c3aed",light:"#ddd6fe",text:"#ffffff"},gray:{main:"#4b5563",hover:"#374151",light:"#f3f4f6",text:"#ffffff"},black:{main:"#111827",hover:"#000000",light:"#e5e7eb",text:"#ffffff"}};let et=null,tt=[];const gd={"agenda-section":ts,"comandas-section":Pn,"relatorios-section":Dn,"servicos-section":Jn,"produtos-section":ii,"suppliers-section":fi,"profissionais-section":Bt,"clientes-section":Mi,"estabelecimento-section":Es,"ausencias-section":pl,"users-section":Mt,"sales-report-section":Tl,"financial-section":Rl,"commissions-section":Vl,"packages-section":Ha,"my-profile-section":id};function bd(e){const t=Po[e]||Po.indigo,s=(o=>{const n=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(o);return n?`${parseInt(n[1],16)}, ${parseInt(n[2],16)}, ${parseInt(n[3],16)}`:"79, 70, 229"})(t.main);document.body.style.setProperty("--theme-main",t.main);const r=document.getElementById("dynamic-theme-styles");r.innerHTML=`
        :root {
            --theme-color-main: ${t.main};
            --theme-color-hover: ${t.hover};
            --theme-color-light: ${t.light};
            --theme-rgb: ${s};
        }
        .sidebar-link.active { 
            background-color: var(--theme-color-main) !important; 
            color: ${t.text} !important; 
        }
        .sidebar-link:not(.active):hover { 
            background-color: rgba(var(--theme-rgb), 0.1) !important;
            color: var(--theme-color-main) !important;
        }
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
    `}function ya(){const e=tt.filter(t=>!t.read).length;if(e>0?(na.textContent=e,na.classList.remove("hidden")):na.classList.add("hidden"),tt.length===0){Lo.innerHTML='<p class="text-center text-gray-500 p-4">Nenhuma notificação.</p>';return}Lo.innerHTML=tt.map(t=>`
    <div class="notification-item ${t.read?"":"unread"}">
    <p class="font-semibold">${t.title}</p>
    <p class="text-sm text-gray-600">${t.message}</p>
    <p class="text-xs text-gray-400 mt-1">${t.time}</p>
    </div>
    `).join("")}function fd(e){et&&et();const t=ue(U,"establishments",e,"notifications"),a=Ft(t,at("timestamp",">=",new Date),Ao("timestamp","desc"));et=Hs(a,s=>{s.docChanges().forEach(r=>{if(r.type==="added"){const o=r.doc.data();tt.unshift({title:o.title,message:o.message,time:o.timestamp.toDate().toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),read:!1}),g(o.title,o.message,"info",!0),ya();const n=document.querySelector(".sidebar-link.active");n&&n.dataset.target==="agenda-section"&&(o.type==="cancellation"||o.type==="new_appointment")&&(console.log("Atualizando agenda em tempo real..."),ts())}})},s=>{console.error("Erro no listener de notificações em tempo real:",s)})}function ae(e,t={}){const a=e.replace("-section","");if(e!=="my-profile-section"){const r=u.enabledModules?.[a]!==!1,o=u.userPermissions===null||u.userPermissions[e]?.view===!0;if(!r||!o){ra.innerHTML='<div class="p-8 text-center"><h2 class="text-2xl font-bold text-red-600">Acesso Negado</h2><p class="text-gray-600">Você não tem permissão para visualizar este módulo.</p></div>',document.querySelectorAll(".sidebar-link").forEach(n=>n.classList.remove("active"));return}}const s=gd[e];s?(document.querySelectorAll(".sidebar-link").forEach(r=>{r.classList.toggle("active",r.getAttribute("data-target")===e)}),e==="my-profile-section"&&document.querySelectorAll(".sidebar-link").forEach(r=>r.classList.remove("active")),ra.innerHTML="",s(t)):ra.innerHTML=`<div class="p-8 text-center"><h2 class="text-2xl font-bold">Página em Construção</h2><p class="text-gray-600">O módulo para "${e}" ainda não foi implementado.</p></div>`}async function vd(e){const t=document.getElementById("kpi-appointments-wrapper"),a=document.getElementById("kpi-financial-wrapper"),s=document.getElementById("kpi-today-appointments"),r=document.getElementById("kpi-today-revenue"),o=e===null||e["agenda-section"]?.view===!0,n=e===null||e["financial-section"]?.view===!0;if(o&&t&&t.classList.remove("hidden"),n&&a&&a.classList.remove("hidden"),!(!o&&!n))try{const i=await Ar();o&&s&&(s.textContent=i.todayAppointments.toString()),n&&r&&(r.textContent=`R$ ${i.todayRevenue.toFixed(2).replace(".",",")}`)}catch(i){console.error("Erro ao carregar KPIs do cabeçalho:",i)}}async function hd(e){try{console.log("[Nativo] Iniciando configuração de Push..."),he.getPlatform()==="android"&&(await W.createChannel({id:"default",name:"Notificações Gerais",description:"Alertas de agendamentos e avisos",importance:5,visibility:1,vibration:!0}),console.log("Canal Android criado."));let t=await W.checkPermissions();if(t.receive==="prompt"&&(t=await W.requestPermissions()),t.receive!=="granted"){alert("ERRO: Permissão de notificações negada!");return}await W.register(),W.addListener("registration",async a=>{console.log("Push Token gerado:",a.value);try{const s=ce(U,"users",e);await wa(s,{fcmTokens:js(a.value),platform:"native_mobile"}),console.log("Token FCM salvo no perfil do utilizador (Nativo).")}catch(s){alert("Erro ao salvar no Banco: "+s.message),console.error("Erro ao salvar token FCM:",s)}}),W.addListener("registrationError",a=>{alert("FALHA DE REGISTO: "+JSON.stringify(a)),console.error("Erro no registo de push notifications:",a)}),W.addListener("pushNotificationReceived",a=>{console.log("Notificação Push recebida:",a),g(a.title,a.body,"info",!0)}),W.addListener("pushNotificationActionPerformed",a=>{console.log("Ação na notificação push:",a),ae("agenda-section")})}catch(t){alert("Erro Fatal Push: "+t.message),console.log("Push Notifications não suportado/inicializado:",t)}}async function xd(){try{await Ns(V,qs),console.log("Persistência LOCAL configurada na inicialização.")}catch(e){console.error("Erro ao definir persistência no main.js",e)}he.isNativePlatform()&&(document.body.classList.add("is-app-native"),console.log("Modo App Nativo detectado: Layout ajustado para Safe Areas.")),Ks(),Co.addEventListener("click",e=>{e.stopPropagation(),wt.classList.toggle("hidden"),wt.classList.contains("hidden")||(tt.forEach(t=>t.read=!0),ya())}),pd.addEventListener("click",()=>{er()}),ia.addEventListener("click",e=>{e.stopPropagation(),ee.classList.toggle("active"),ee.classList.contains("active")?ee.classList.remove("hidden"):setTimeout(()=>ee.classList.add("hidden"),200)}),To&&To.addEventListener("click",e=>{e.preventDefault(),ae("my-profile-section"),ee.classList.remove("active"),ee.classList.add("hidden")}),document.addEventListener("click",e=>{!wt.contains(e.target)&&e.target!==Co&&wt.classList.add("hidden"),!ee.contains(e.target)&&e.target!==ia&&ee.classList.contains("active")&&(ee.classList.remove("active"),setTimeout(()=>ee.classList.add("hidden"),200))}),Bo(V,async e=>{if(e){if(console.log("Usuário detectado:",e.email),!he.isNativePlatform()&&(console.log("Inicializando Web Push (PWA)..."),Vo(),"Notification"in window&&Notification.permission==="default")){const t=document.getElementById("toast-notification-request"),a=document.getElementById("btn-enable-toast"),s=document.getElementById("btn-deny-toast"),r=document.getElementById("btn-close-toast");setTimeout(()=>{t&&(t.style.display="block")},3500),a&&a.addEventListener("click",async()=>{await Uo()&&t&&(t.style.display="none")});const o=()=>{t&&(t.style.display="none")};s&&s.addEventListener("click",o),r&&r.addEventListener("click",o)}try{const a=(await e.getIdTokenResult(!0)).claims;if((a.role==="owner"||a.role==="employee")&&a.establishmentId){const s=await ke(a.establishmentId);u.enabledModules=s.modules,bd(s.themeColor||"indigo");let r=null,o=e.displayName,n=null;if(a.role==="employee"||a.role==="owner"){const d=ce(U,"users",e.uid),c=await Do(d);if(c.exists()){const m=c.data();r=a.role==="employee"?m.permissions||{}:null,o=m.name||o,n=m.professionalId||null}else if(a.role==="employee")throw new Error("Dados de permissão do funcionário não encontrados.")}u.userProfessionalId=n,he.isNativePlatform()&&hd(e.uid);const i=o||e.email;Vs(a.establishmentId,s.name,r),ia.textContent=i.charAt(0).toUpperCase(),cd.textContent=i,ud.textContent=e.email;const l=()=>{et&&et(),za(V).then(()=>window.location.href="/login.html")};md.addEventListener("click",d=>{d.preventDefault(),l()}),sr(ae,r,u.enabledModules),vd(r),fd(a.establishmentId),ya(),yt.classList.add("fade-out"),sa.style.display="flex",setTimeout(()=>{yt.style.display="none"},500),console.log("Verificando Onboarding..."),setTimeout(()=>{hr()},1500),ae("agenda-section")}else throw new Error("Utilizador não tem permissão de 'owner' ou 'employee' ou 'establishmentId'.")}catch(t){console.error("Erro crítico na inicialização do painel:",t),yt.classList.add("fade-out"),setTimeout(()=>{yt.style.display="none"},500),sa.innerHTML=`
                    <div class="w-full h-full flex flex-col items-center justify-center bg-gray-100 p-4">
                        <h2 class="text-2xl font-bold text-red-600 mb-4">Erro de Acesso</h2>
                        <p class="text-gray-700 text-center mb-6">Não foi possível carregar os seus dados ou permissões. Isto pode acontecer se a sua conta foi desativada ou está configurada incorretamente.</p>
                        <p class="text-sm text-gray-500 mb-6">Detalhe do erro: ${t.message}</p>
                        <button id="errorLogoutButton" class="bg-red-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-red-700">Sair e Tentar Novamente</button>
                    </div>
                `,sa.style.display="flex",document.getElementById("errorLogoutButton").addEventListener("click",()=>{za(V).then(()=>window.location.href="/login.html")})}}else window.location.href="/login.html"})}xd();Bo(V,async e=>{if(e){await Vo();const a="Notification"in window&&Notification.permission==="default",s=window.Capacitor&&window.Capacitor.isNativePlatform();if(a&&!s){const r=document.getElementById("toast-notification-request"),o=document.getElementById("btn-enable-toast"),n=document.getElementById("btn-deny-toast"),i=document.getElementById("btn-close-toast");setTimeout(()=>{r&&(r.style.display="block")},3500),o&&o.addEventListener("click",async()=>{await Uo()&&r&&(r.style.display="none")});const l=()=>{r&&(r.style.display="none")};n&&n.addEventListener("click",l),i&&i.addEventListener("click",l)}}});
