import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css               */import{a as V,d as U,m as Ha}from"./firebase-config-C2tbVz-J.js";import{EmailAuthProvider as ks,reauthenticateWithCredential as Ss,verifyBeforeUpdateEmail as $s,updatePassword as Es,updateProfile as Is,setPersistence as Cs,browserLocalPersistence as Ls,onAuthStateChanged as Io,signOut as Oa}from"https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";import{doc as ce,getDoc as Co,updateDoc as wa,setDoc as Ts,addDoc as Lo,collection as ue,query as qt,where as ot,getDocs as ka,orderBy as To,writeBatch as Po,serverTimestamp as za,deleteDoc as Ps,arrayUnion as Bs,onSnapshot as Ds}from"https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";import{getToken as Ms,onMessage as As}from"https://www.gstatic.com/firebasejs/11.6.1/firebase-messaging.js";import"https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";import"https://www.gstatic.com/firebasejs/11.6.1/firebase-storage.js";const m={establishmentId:null,establishmentName:null,userName:null,userProfessionalId:null,userPermissions:null,establishmentSettings:null,enabledModules:{agenda:!0,comandas:!0,relatorios:!0,commissions:!0,packages:!0,financial:!0,servicos:!0,produtos:!0,profissionais:!0,clientes:!0,users:!0,estabelecimento:!0},professionals:[],services:[],professionalColors:new Map,allEvents:[]};function Ns(e,t,a){m.establishmentId=e,m.establishmentName=t,m.userPermissions=a}const ia="https://kairos-app-407358446276.us-central1.run.app";console.log("🚀 API configurada para Produção (US):",ia);async function qs(){const e=V.currentUser;return e?{"Content-Type":"application/json",Authorization:`Bearer ${await e.getIdToken()}`}:(console.warn("Usuário não logado, tentando redirecionar para /login"),window.location.href="/login",null)}async function w(e,t={}){const a=await qs();if(!a)throw new Error("Utilizador não autenticado. A requisição foi cancelada.");const s=ia.replace(/\/$/,""),r=e.startsWith("/")?e:`/${e}`,o=`${s}${r}`;console.log(`AuthenticatedFetch: ${t.method||"GET"} ${o}`);try{const n=await fetch(o,{...t,headers:{...a,...t.headers}});if(!n.ok){const l=(await n.json().catch(()=>({message:n.statusText}))).message||`Erro na API: ${n.status}`;if(l.includes("FAILED_PRECONDITION")&&l.includes("requires an index")){const d=/(https:\/\/[^\s]+)/,c=l.match(d),u=c?c[0]:"URL não encontrada na mensagem de erro.";console.warn(`%c AVISO IMPORTANTE (FIREBASE): ÍNDICE NECESSÁRIO! %c
                    
Sua consulta em '${e}' falhou porque um índice composto do Firestore é necessário.
Para corrigir isso, clique no link abaixo (com o Firebase logado) e crie o índice:
                    
%c${u}%c
                    
--------------------------------------------------------------------`,"background-color: #ffc; color: #663300; font-size: 14px; font-weight: bold; padding: 5px;","color: #663300; font-size: 12px;","color: #0000ff; font-size: 12px; font-weight: bold; text-decoration: underline;","color: #663300; font-size: 12px;")}throw console.error(`Erro na API (${n.status}) em ${o}:`,l),new Error(l)}return n.json()}catch(n){throw console.error(`Falha de rede ao tentar acessar ${o}:`,n.message),n.message.includes("Failed to fetch")||n.message.includes("NetworkError")?new Error(`Não foi possível conectar ao servidor em ${ia}. Verifique sua conexão com a internet.`):n}}const Bo=(e,t,a,s=null)=>{let r=`/api/appointments/${e}?startDate=${t}&endDate=${a}`;return s&&(r+=`&professionalId=${s}`),w(r)},Rs=(e,t,a)=>{const s=`/api/appointments/cancelled/${e}?startDate=${t}&endDate=${a}`;return w(s)},Fs=({establishmentId:e,professionalId:t,serviceIds:a,date:s})=>{const r=`/api/availability?establishmentId=${e}&professionalId=${t}&serviceIds=${a.join(",")}&date=${s}`;return w(r)},js=e=>w("/api/appointments",{method:"POST",body:JSON.stringify(e)}),Sa=(e,t)=>w(`/api/appointments/${e}`,{method:"PUT",body:JSON.stringify(t)}),Hs=e=>w(`/api/appointments/${e}`,{method:"DELETE"}),Os=e=>w(`/api/appointments/${e}/reopen`,{method:"POST"}),zs=(e,t)=>w(`/api/appointments/${e}/checkout`,{method:"POST",body:JSON.stringify(t)});let J;async function Vs(){if(!J)try{J=new(window.AudioContext||window.webkitAudioContext)}catch(e){console.error("Não foi possível inicializar o áudio:",e)}}function Us(){if(!J){console.warn("AudioContext não inicializado. O som não será tocado.");return}J.state==="suspended"&&J.resume();const e=J.createOscillator(),t=J.createGain();e.connect(t),t.connect(J.destination),e.type="sine",e.frequency.setValueAtTime(800,J.currentTime),t.gain.setValueAtTime(0,J.currentTime),t.gain.linearRampToValueAtTime(.3,J.currentTime+.01),t.gain.exponentialRampToValueAtTime(1e-4,J.currentTime+.2),e.start(J.currentTime),e.stop(J.currentTime+.2)}function b(e,t,a="info",s=!1){const r=document.getElementById("toast-container");if(!r)return;s&&Us();const o=document.createElement("div"),n={success:"bg-green-50 border-green-400 text-green-700",error:"bg-red-50 border-red-400 text-red-700",info:"bg-blue-50 border-blue-400 text-blue-700"},i={success:'<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',error:'<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',info:'<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>'},l={success:"bg-green-500",error:"bg-red-500",info:"bg-blue-500"};o.className=`toast ${n[a]||n.info}`,o.innerHTML=`
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
            </div>`,a.style.display="flex",document.getElementById("genericModalConfirmBtn").onclick=()=>{a.style.display="none",s(!0)},document.getElementById("genericModalCancelBtn").onclick=()=>{a.style.display="none",s(!1)}})}function _({title:e,contentHTML:t,maxWidth:a="max-w-4xl",showCloseButton:s=!0}){let r=document.getElementById("genericModal");const o=r.cloneNode(!1);r.parentNode.replaceChild(o,r),r=o;const n=()=>{r.style.display="none"},i=c=>{r.querySelector("#genericModalContentBody").innerHTML=c};r.innerHTML=`
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
    `;const l=r.querySelector("[data-close-modal]");l&&(l.onclick=n);const d=r.querySelector('[data-action="close-modal"]');return d&&(d.onclick=n),r.addEventListener("click",c=>{c.target.closest(".modal-content")||n()}),r.style.display="flex",{modalElement:r,close:n,setContent:i}}function Rt(e){const t=document.getElementById(e);t&&(t.style.display="none")}function _s(){document.body.addEventListener("click",()=>{J||Vs()},{once:!0}),document.addEventListener("click",e=>{const t=e.target.closest('[data-action="close-modal"]');if(t){const s=t.dataset.target;if(s){const r=document.getElementById(s);r&&(r.style.display="none")}}if(e.target.closest("[data-close-modal]")){const s=document.getElementById("genericModal");s&&(s.style.display="none")}})}async function Va(){const e=document.getElementById("cancellationListContainer");if(!e)return;e.innerHTML='<div class="loader mx-auto"></div>';const t=document.getElementById("cancelStartDate").value,a=document.getElementById("cancelEndDate").value;try{const s=await Rs(m.establishmentId,t,a);if(s.length===0){e.innerHTML='<p class="text-center text-gray-500 py-4">Nenhum cancelamento encontrado para este período.</p>';return}e.innerHTML=s.map(r=>`
            <div class="bg-red-50 p-3 rounded-lg border-l-4 border-red-400">
                <div class="flex justify-between items-center">
                    <div>
                        <p class="font-bold text-gray-800">${r.clientName}</p>
                        <p class="text-sm text-gray-600">${new Date(r.date).toLocaleString("pt-BR",{dateStyle:"short",timeStyle:"short"})} - ${r.serviceName}</p>
                        <p class="text-xs text-gray-500">com ${r.professionalName}</p>
                    </div>
                </div>
            </div>
        `).join("")}catch(s){e.innerHTML=`<p class="text-red-500 text-center py-4">Erro ao carregar histórico: ${s.message}</p>`}}function Js(){const e=new Date().toISOString().split("T")[0],t=new Date;t.setDate(t.getDate()-30);const s=`
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
    `,{modalElement:r}=_({title:"Histórico de Cancelamentos",contentHTML:s,maxWidth:"max-w-3xl"});r.querySelector("#searchCancellationsBtn").addEventListener("click",Va),Va()}const Q=document.getElementById("sidebar"),Ua=document.getElementById("sidebarToggle"),Ye=document.getElementById("mainContent"),Ws=document.querySelectorAll(".sidebar-link"),_a=document.getElementById("hamburger-menu-btn"),Ne=document.getElementById("mobile-overlay");function wt(e){!Q||!Ye||(Q.classList.toggle("collapsed",e),Ye.classList.toggle("sidebar-collapsed-shift",e))}function Gs(){!Q||!Ne||(Q.classList.add("mobile-open"),Ne.classList.add("visible"))}function ct(){!Q||!Ne||(Q.classList.remove("mobile-open"),Ne.classList.remove("visible"))}function Ys(){wt(!Q.classList.contains("collapsed"))}function Qs(e,t,a){if(!Q||!Ye)return;Ye.classList.add("main-content-shift"),window.innerWidth>=768?wt(Q.classList.contains("collapsed")):(Ye.classList.remove("main-content-shift","sidebar-collapsed-shift"),ct()),Ua&&Ua.addEventListener("click",r=>{r.stopPropagation(),Ys()}),Q.addEventListener("mouseenter",()=>{window.innerWidth>=1024&&Q.classList.contains("collapsed")&&wt(!1)}),Q.addEventListener("mouseleave",()=>{window.innerWidth>=1024&&(document.querySelector("#sidebarToggle:hover")||wt(!0))}),_a&&_a.addEventListener("click",r=>{r.stopPropagation(),Gs()}),Ne&&Ne.addEventListener("click",r=>{r.stopPropagation(),ct()});let s=0;Q.addEventListener("touchstart",r=>{s=r.changedTouches[0].screenX},{passive:!0}),Q.addEventListener("touchend",r=>{const o=r.changedTouches[0].screenX;s-o>50&&ct()},{passive:!0}),Ws.forEach(r=>{const o=r.getAttribute("data-target"),n=o.replace("-section",""),i=a?.[n]!==!1,l=t===null||t[o]?.view===!0;if(!i||!l){r.style.display="none";return}r.style.display="flex",r.addEventListener("click",d=>{d.preventDefault(),o&&typeof e=="function"&&e(o),window.innerWidth<768&&ct()})})}const $e=e=>{const t=e||m.establishmentId;return t?w(`/api/establishments/${t}`):Promise.reject(new Error("ID do estabelecimento não fornecido."))},kt=(e,t)=>{const a=e||m.establishmentId;return a?w(`/api/establishments/${a}`,{method:"PUT",body:JSON.stringify(t)}):Promise.reject(new Error("ID do estabelecimento não fornecido."))},Xs=(e,t)=>{const a=e||m.establishmentId;return a?w(`/api/establishments/${a}/booking-status`,{method:"PATCH",body:JSON.stringify({publicBookingEnabled:t})}):Promise.reject(new Error("ID do estabelecimento não fornecido."))},Zs=(e,t)=>{const a=e||m.establishmentId;return a?w(`/api/establishments/${a}/owner-email`,{method:"PATCH",body:JSON.stringify({newEmail:t})}):Promise.reject(new Error("ID do estabelecimento não fornecido."))},X=e=>w(`/api/professionals/${e}`),Ks=e=>w(`/api/professionals/details/${e}`),Do=e=>w("/api/professionals",{method:"POST",body:JSON.stringify(e)}),It=(e,t)=>w(`/api/professionals/${e}`,{method:"PUT",body:JSON.stringify(t)}),Ja=(e,t)=>It(e,{services:t}),Mo=e=>w(`/api/professionals/${e}`,{method:"DELETE"}),er=e=>{const t=e.map(a=>Mo(a));return Promise.all(t)},Ee=e=>w(`/api/services/${e}`),Ao=e=>w("/api/services",{method:"POST",body:JSON.stringify(e)}),tr=(e,t)=>w(`/api/services/${e}`,{method:"PUT",body:JSON.stringify(t)}),ar=e=>w(`/api/services/${e}`,{method:"DELETE"}),or=(e,t)=>w(`/api/services/${e}/status`,{method:"PATCH",body:JSON.stringify({active:t})}),sr=e=>w(`/api/services/stats/most-popular/${e}`),Ft=e=>w(`/api/products/${e}`),No=e=>w("/api/products",{method:"POST",body:JSON.stringify(e)}),rr=(e,t)=>w(`/api/products/${e}`,{method:"PUT",body:JSON.stringify(t)}),nr=e=>w(`/api/products/${e}`,{method:"DELETE"}),ir=(e,t)=>w(`/api/products/${e}/stock`,{method:"PATCH",body:JSON.stringify(t)}),lr=({startDate:e,endDate:t,productId:a,categoryId:s,establishmentId:r})=>{const o=new URLSearchParams({startDate:e,endDate:t});return a&&a!=="all"&&o.append("productId",a),s&&s!=="all"&&o.append("categoryId",s),r&&o.append("establishmentId",r),w(`/api/products/stock-history/report?${o.toString()}`)},dr={indigo:{name:"Padrão (Índigo)",main:"#4f46e5"},blue:{name:"Azul",main:"#2563eb"},sky:{name:"Céu",main:"#0284c7"},teal:{name:"Verde Água",main:"#0d9488"},emerald:{name:"Esmeralda",main:"#059669"},green:{name:"Verde",main:"#16a34a"},lime:{name:"Lima",main:"#65a30d"},amber:{name:"Âmbar",main:"#d97706"},orange:{name:"Laranja",main:"#ea580c"},red:{name:"Vermelho",main:"#dc2626"},rose:{name:"Rosa",main:"#e11d48"},pink:{name:"Pink",main:"#db2777"},fuchsia:{name:"Fúcsia",main:"#c026d3"},purple:{name:"Roxo",main:"#7c3aed"},violet:{name:"Violeta",main:"#8b5cf6"},gray:{name:"Cinza",main:"#4b5563"},black:{name:"Preto",main:"#111827"}};function Wa(e,t,a){return new Promise((s,r)=>{const o=new FileReader;o.readAsDataURL(e),o.onload=n=>{const i=new Image;i.src=n.target.result,i.onload=()=>{const l=document.createElement("canvas");let d=i.width,c=i.height;d>t&&(c*=t/d,d=t),l.width=d,l.height=c,l.getContext("2d").drawImage(i,0,0,d,c);const p=e.type==="image/png"&&t<500?"image/png":"image/jpeg";s(l.toDataURL(p,a))},i.onerror=l=>r(l)},o.onerror=n=>r(n)})}let de=null;const St=[{id:"company_data",title:"Identidade do Negócio",icon:"🏢",description:"Configure os dados da sua empresa."},{id:"branding",title:"Sua Marca",icon:"🎨",description:"Logo e cores (Opcional)."},{id:"time_config",title:"O Relógio",icon:"⏱️",description:"Tempo padrão entre agendamentos."},{id:"first_service",title:"O Menu",icon:"✂️",description:"Seu principal serviço."},{id:"first_prof",title:"Sua Equipe",icon:"💇",description:"Cadastre o primeiro profissional."},{id:"first_product",title:"O Estoque",icon:"🧴",description:"Cadastre um produto (opcional)."}];let Z=0,Ct=[];async function cr(){try{console.log("Iniciando verificação de Onboarding para ID:",m.establishmentId);const e=await $e(m.establishmentId),t=await X(m.establishmentId),a=await Ee(m.establishmentId);Ct=a||[];const s=e&&e.name&&(e.phone||e.address),r=e&&(e.logo||e.themeColor&&e.themeColor!=="indigo"),o=e&&e.slotInterval>0,n=a&&a.length>0,i=t&&t.length>0;if(console.log("Status Onboarding:",{hasCompanyData:s,hasBranding:r,hasTimeConfig:o,hasService:n,hasProf:i}),s&&o&&i&&n)return;if(!s)Z=0;else if(!r&&!o)Z=1;else if(!o)Z=2;else if(!n)Z=3;else if(!i)Z=4;else if(Z===0)return;ur(),Ea(Z)}catch(e){console.error("Erro ao verificar onboarding:",e)}}function ur(){document.getElementById("onboarding-overlay")||(de=document.createElement("div"),de.id="onboarding-overlay",de.className="fixed inset-0 bg-gray-900 bg-opacity-95 z-[9999] flex items-center justify-center p-4 overflow-y-auto",de.style.cssText="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background-color: rgba(17, 24, 39, 0.95); z-index: 9999; display: flex; align-items: center; justify-content: center;",de.innerHTML=`
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
    `,document.body.appendChild(de),$a())}function $a(){const e=Math.round(Z/St.length*100),t=document.getElementById("progress-bar"),a=document.getElementById("progress-text");t&&(t.style.width=`${e}%`),a&&(a.innerText=`${e}%`)}function Ea(e){const t=document.getElementById("onboarding-step-content"),a=St[e];if(!a){Ga(t);return}let s="";if(a.id==="company_data")s=`
            <form id="step-form" class="space-y-3">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                        <label class="block text-xs font-bold text-gray-700 uppercase">Nome do Estabelecimento</label>
                        <input type="text" name="name" class="mt-1 w-full p-2 border rounded text-sm" required placeholder="Ex: Barbearia do João">
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-gray-700 uppercase">Seu Nome</label>
                        <input type="text" name="ownerName" class="mt-1 w-full p-2 border rounded text-sm" required value="${m.userName||""}">
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                        <label class="block text-xs font-bold text-gray-700 uppercase">WhatsApp</label>
                        <input type="tel" name="phone" class="mt-1 w-full p-2 border rounded text-sm" required placeholder="(00) 00000-0000">
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-gray-700 uppercase">E-mail</label>
                        <input type="email" name="email" class="mt-1 w-full p-2 border rounded text-sm" required value="${m.userEmail||""}">
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
                            ${Object.entries(dr).map(([o,n])=>`<option value="${o}">${n.name}</option>`).join("")}
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
        `;else if(a.id==="first_prof"){const r=Ct.map(n=>`<option value="${n.id}">${n.name}</option>`).join(""),o=Ct.length>0;s=`
            <form id="step-form" class="space-y-3">
                <p class="text-gray-600 text-sm">Quem realiza os serviços? (Pode ser você!)</p>
                <div>
                    <label class="block text-xs font-bold text-gray-700 uppercase">Nome</label>
                    <input type="text" name="name" class="mt-1 w-full p-2 border rounded text-sm" required value="${m.userName||""}">
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
                ${e===St.length-1?"Concluir":"Próximo"}
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
            </button>
        </div>
    `,document.getElementById("next-step-btn").addEventListener("click",()=>mr(a.id)),document.getElementById("skip-btn")&&document.getElementById("skip-btn").addEventListener("click",()=>{e===St.length-1?Ga(t):(Z++,$a(),Ea(Z))}),a.id==="branding"){const r=document.getElementById("logo-input"),o=document.getElementById("bg-input");r&&(r.onchange=async n=>{const i=n.target.files[0];if(i)try{const l=await Wa(i,200,.8);document.getElementById("logo-base64").value=l,document.getElementById("logo-preview").innerHTML=`<img src="${l}" class="w-full h-full object-contain rounded">`}catch(l){console.error("Erro logo",l)}}),o&&(o.onchange=async n=>{const i=n.target.files[0];if(i)try{const l=await Wa(i,1024,.7);document.getElementById("bg-base64").value=l}catch(l){console.error("Erro bg",l)}})}}function Ga(e){e.innerHTML=`
        <div class="text-center py-6">
            <div class="text-5xl mb-3">🏆</div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">Tudo Pronto!</h3>
            <p class="text-gray-600 text-sm mb-6">Seu sistema está configurado. Boas vendas!</p>
            <button id="finish-onboarding-btn" class="bg-indigo-600 text-white font-bold py-2 px-6 rounded-full hover:bg-indigo-700 transition shadow-lg transform hover:scale-105 text-sm">
                Acessar Painel
            </button>
        </div>
    `;const t=document.getElementById("progress-bar"),a=document.getElementById("progress-text");t&&(t.style.width="100%"),a&&(a.innerText="100%"),document.getElementById("finish-onboarding-btn").onclick=()=>{de&&de.remove(),window.location.reload()}}async function mr(e){const t=document.getElementById("step-form");if(!t.reportValidity())return;const a=document.getElementById("next-step-btn"),s=a.innerHTML;a.disabled=!0,a.innerHTML="Salvando...";const r=new FormData(t),o=Object.fromEntries(r.entries());try{if(e==="company_data")await kt(m.establishmentId,{name:o.name,phone:o.phone,email:o.email,address:o.address,zipCode:o.zipCode});else if(e==="branding"){const n={};o.logoBase64&&(n.logo=o.logoBase64),o.bgBase64&&(n.backgroundImage=o.bgBase64),o.themeColor&&(n.themeColor=o.themeColor),o.primaryColor&&(n.primaryColor=o.primaryColor),Object.keys(n).length>0&&await kt(m.establishmentId,n)}else if(e==="time_config"){const n=parseInt(o.slotInterval);await kt(m.establishmentId,{slotInterval:n})}else if(e==="first_service"){const n=await Ao({establishmentId:m.establishmentId,name:o.name,price:parseFloat(o.price),duration:parseInt(o.duration),active:!0});n&&Ct.push(n)}else if(e==="first_prof"){const n=await Do({establishmentId:m.establishmentId,name:o.name,specialty:o.role,active:!0,commissionRate:0});if(o.serviceId&&n&&n.id)try{Ja?await Ja(n.id,[o.serviceId]):It&&await It(n.id,{services:[o.serviceId]})}catch(i){console.warn("Não foi possível vincular o serviço automaticamente.",i)}}else e==="first_product"&&await No({establishmentId:m.establishmentId,name:o.name,price:parseFloat(o.salePrice),stock:parseInt(o.stock),active:!0});b("Sucesso","Passo concluído!","success"),Z++,$a(),Ea(Z)}catch(n){b("Erro","Erro ao salvar: "+n.message,"error"),a.disabled=!1,a.innerHTML=s}}var qe;(function(e){e.Unimplemented="UNIMPLEMENTED",e.Unavailable="UNAVAILABLE"})(qe||(qe={}));class Yt extends Error{constructor(t,a,s){super(t),this.message=t,this.code=a,this.data=s}}const pr=e=>{var t,a;return e?.androidBridge?"android":!((a=(t=e?.webkit)===null||t===void 0?void 0:t.messageHandlers)===null||a===void 0)&&a.bridge?"ios":"web"},gr=e=>{const t=e.CapacitorCustomPlatform||null,a=e.Capacitor||{},s=a.Plugins=a.Plugins||{},r=()=>t!==null?t.name:pr(e),o=()=>r()!=="web",n=u=>{const p=d.get(u);return!!(p?.platforms.has(r())||i(u))},i=u=>{var p;return(p=a.PluginHeaders)===null||p===void 0?void 0:p.find(g=>g.name===u)},l=u=>e.console.error(u),d=new Map,c=(u,p={})=>{const g=d.get(u);if(g)return console.warn(`Capacitor plugin "${u}" already registered. Cannot register plugins twice.`),g.proxy;const f=r(),h=i(u);let y;const S=async()=>(!y&&f in p?y=typeof p[f]=="function"?y=await p[f]():y=p[f]:t!==null&&!y&&"web"in p&&(y=typeof p.web=="function"?y=await p.web():y=p.web),y),I=(L,T)=>{var N,R;if(h){const z=h?.methods.find(A=>T===A.name);if(z)return z.rtype==="promise"?A=>a.nativePromise(u,T.toString(),A):(A,Y)=>a.nativeCallback(u,T.toString(),A,Y);if(L)return(N=L[T])===null||N===void 0?void 0:N.bind(L)}else{if(L)return(R=L[T])===null||R===void 0?void 0:R.bind(L);throw new Yt(`"${u}" plugin is not implemented on ${f}`,qe.Unimplemented)}},$=L=>{let T;const N=(...R)=>{const z=S().then(A=>{const Y=I(A,L);if(Y){const Ie=Y(...R);return T=Ie?.remove,Ie}else throw new Yt(`"${u}.${L}()" is not implemented on ${f}`,qe.Unimplemented)});return L==="addListener"&&(z.remove=async()=>T()),z};return N.toString=()=>`${L.toString()}() { [capacitor code] }`,Object.defineProperty(N,"name",{value:L,writable:!1,configurable:!1}),N},k=$("addListener"),C=$("removeListener"),F=(L,T)=>{const N=k({eventName:L},T),R=async()=>{const A=await N;C({eventName:L,callbackId:A},T)},z=new Promise(A=>N.then(()=>A({remove:R})));return z.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await R()},z},O=new Proxy({},{get(L,T){switch(T){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return h?F:k;case"removeListener":return C;default:return $(T)}}});return s[u]=O,d.set(u,{name:u,proxy:O,platforms:new Set([...Object.keys(p),...h?[f]:[]])}),O};return a.convertFileSrc||(a.convertFileSrc=u=>u),a.getPlatform=r,a.handleError=l,a.isNativePlatform=o,a.isPluginAvailable=n,a.registerPlugin=c,a.Exception=Yt,a.DEBUG=!!a.DEBUG,a.isLoggingEnabled=!!a.isLoggingEnabled,a},br=e=>e.Capacitor=gr(e),ye=br(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),Ia=ye.registerPlugin;class qo{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(t,a){let s=!1;this.listeners[t]||(this.listeners[t]=[],s=!0),this.listeners[t].push(a);const o=this.windowListeners[t];o&&!o.registered&&this.addWindowListener(o),s&&this.sendRetainedArgumentsForEvent(t);const n=async()=>this.removeListener(t,a);return Promise.resolve({remove:n})}async removeAllListeners(){this.listeners={};for(const t in this.windowListeners)this.removeWindowListener(this.windowListeners[t]);this.windowListeners={}}notifyListeners(t,a,s){const r=this.listeners[t];if(!r){if(s){let o=this.retainedEventArguments[t];o||(o=[]),o.push(a),this.retainedEventArguments[t]=o}return}r.forEach(o=>o(a))}hasListeners(t){var a;return!!(!((a=this.listeners[t])===null||a===void 0)&&a.length)}registerWindowListener(t,a){this.windowListeners[a]={registered:!1,windowEventName:t,pluginEventName:a,handler:s=>{this.notifyListeners(a,s)}}}unimplemented(t="not implemented"){return new ye.Exception(t,qe.Unimplemented)}unavailable(t="not available"){return new ye.Exception(t,qe.Unavailable)}async removeListener(t,a){const s=this.listeners[t];if(!s)return;const r=s.indexOf(a);this.listeners[t].splice(r,1),this.listeners[t].length||this.removeWindowListener(this.windowListeners[t])}addWindowListener(t){window.addEventListener(t.windowEventName,t.handler),t.registered=!0}removeWindowListener(t){t&&(window.removeEventListener(t.windowEventName,t.handler),t.registered=!1)}sendRetainedArgumentsForEvent(t){const a=this.retainedEventArguments[t];a&&(delete this.retainedEventArguments[t],a.forEach(s=>{this.notifyListeners(t,s)}))}}const Ya=e=>encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),Qa=e=>e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent);class fr extends qo{async getCookies(){const t=document.cookie,a={};return t.split(";").forEach(s=>{if(s.length<=0)return;let[r,o]=s.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");r=Qa(r).trim(),o=Qa(o).trim(),a[r]=o}),a}async setCookie(t){try{const a=Ya(t.key),s=Ya(t.value),r=`; expires=${(t.expires||"").replace("expires=","")}`,o=(t.path||"/").replace("path=",""),n=t.url!=null&&t.url.length>0?`domain=${t.url}`:"";document.cookie=`${a}=${s||""}${r}; path=${o}; ${n};`}catch(a){return Promise.reject(a)}}async deleteCookie(t){try{document.cookie=`${t.key}=; Max-Age=0`}catch(a){return Promise.reject(a)}}async clearCookies(){try{const t=document.cookie.split(";")||[];for(const a of t)document.cookie=a.replace(/^ +/,"").replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(t){return Promise.reject(t)}}async clearAllCookies(){try{await this.clearCookies()}catch(t){return Promise.reject(t)}}}Ia("CapacitorCookies",{web:()=>new fr});const vr=async e=>new Promise((t,a)=>{const s=new FileReader;s.onload=()=>{const r=s.result;t(r.indexOf(",")>=0?r.split(",")[1]:r)},s.onerror=r=>a(r),s.readAsDataURL(e)}),hr=(e={})=>{const t=Object.keys(e);return Object.keys(e).map(r=>r.toLocaleLowerCase()).reduce((r,o,n)=>(r[o]=e[t[n]],r),{})},xr=(e,t=!0)=>e?Object.entries(e).reduce((s,r)=>{const[o,n]=r;let i,l;return Array.isArray(n)?(l="",n.forEach(d=>{i=t?encodeURIComponent(d):d,l+=`${o}=${i}&`}),l.slice(0,-1)):(i=t?encodeURIComponent(n):n,l=`${o}=${i}`),`${s}&${l}`},"").substr(1):null,yr=(e,t={})=>{const a=Object.assign({method:e.method||"GET",headers:e.headers},t),r=hr(e.headers)["content-type"]||"";if(typeof e.data=="string")a.body=e.data;else if(r.includes("application/x-www-form-urlencoded")){const o=new URLSearchParams;for(const[n,i]of Object.entries(e.data||{}))o.set(n,i);a.body=o.toString()}else if(r.includes("multipart/form-data")||e.data instanceof FormData){const o=new FormData;if(e.data instanceof FormData)e.data.forEach((i,l)=>{o.append(l,i)});else for(const i of Object.keys(e.data))o.append(i,e.data[i]);a.body=o;const n=new Headers(a.headers);n.delete("content-type"),a.headers=n}else(r.includes("application/json")||typeof e.data=="object")&&(a.body=JSON.stringify(e.data));return a};class wr extends qo{async request(t){const a=yr(t,t.webFetchExtra),s=xr(t.params,t.shouldEncodeUrlParams),r=s?`${t.url}?${s}`:t.url,o=await fetch(r,a),n=o.headers.get("content-type")||"";let{responseType:i="text"}=o.ok?t:{};n.includes("application/json")&&(i="json");let l,d;switch(i){case"arraybuffer":case"blob":d=await o.blob(),l=await vr(d);break;case"json":l=await o.json();break;case"document":case"text":default:l=await o.text()}const c={};return o.headers.forEach((u,p)=>{c[p]=u}),{data:l,headers:c,status:o.status,url:o.url}}async get(t){return this.request(Object.assign(Object.assign({},t),{method:"GET"}))}async post(t){return this.request(Object.assign(Object.assign({},t),{method:"POST"}))}async put(t){return this.request(Object.assign(Object.assign({},t),{method:"PUT"}))}async patch(t){return this.request(Object.assign(Object.assign({},t),{method:"PATCH"}))}async delete(t){return this.request(Object.assign(Object.assign({},t),{method:"DELETE"}))}}Ia("CapacitorHttp",{web:()=>new wr});const G=Ia("PushNotifications",{}),kr="BDA-IaH_jjWBRwHbuFcB56I25jKHpchx34yZtv_6iIo_yV2tz_yIZYS3hfntDaN5Slf4ch8ZEJCIt4D7LIWX4mY";let Xa=!1;async function Ro(){if(window.Capacitor&&window.Capacitor.isNativePlatform()){try{await G.removeAllListeners(),await G.addListener("registration",async a=>{Ho(a.value,!0)}),await G.addListener("pushNotificationReceived",a=>{console.log("[Push Nativo] Recebido em Foreground (Visual gerido pelo Firestore):",a)}),await G.addListener("pushNotificationActionPerformed",a=>{const s=a.notification.data;console.log("Notificação clicada (Ação):",s)});let t=await G.checkPermissions();t.receive==="prompt"&&(t=await G.requestPermissions()),t.receive==="granted"&&await G.register()}catch(t){console.error("[Push Nativo] Erro:",t)}return}"Notification"in window&&Notification.permission==="granted"&&jo()}async function Fo(){try{return await Notification.requestPermission()==="granted"?(console.log("Permissão concedida pelo utilizador."),await jo(),!0):(console.warn("Permissão de notificações negada."),!1)}catch(e){return console.error("Erro ao pedir permissão Web:",e),!1}}async function jo(){if("serviceWorker"in navigator)try{const e=await navigator.serviceWorker.register("/firebase-messaging-sw.js");await e.update();const t=await Ms(Ha,{vapidKey:kr,serviceWorkerRegistration:e});t?(console.log("[Push Web] Token validado."),await Ho(t,!1)):console.warn("[Push Web] Token veio vazio."),Xa||(As(Ha,a=>{console.log("[Push Web] Recebido em Foreground (Silencioso):",a)}),Xa=!0)}catch(e){console.error("[Push Web] Falha no registo:",e)}else console.warn("Navegador sem suporte a Service Worker.")}async function Ho(e,t){const a=V.currentUser;if(!a){console.warn("Usuário não logado. Token não salvo.");return}const s=ce(U,"users",a.uid);try{const r=await Co(s);if(r.exists()){const n=r.data().fcmTokens||[];if(n.length===1&&n[0]===e){console.log("Token já sincronizado e único. Nenhuma ação necessária.");return}}await wa(s,{fcmTokens:[e],lastLoginAt:new Date().toISOString(),platform:t?"android_native":"pwa_web"}),console.log("Token atualizado (Sessão Única garantida).")}catch(r){if(r.code==="not-found")try{await Ts(s,{email:a.email,fcmTokens:[e],platform:t?"android_native":"pwa_web",createdAt:new Date().toISOString()},{merge:!0}),console.log("Utilizador criado e token inicial salvo.")}catch(o){console.error("Erro ao criar user:",o)}else console.error("Erro ao atualizar token:",r)}}const Sr=(e,t,a="all",s="all")=>{const r=new URLSearchParams({startDate:e,endDate:t});return a&&a!=="all"&&r.append("professionalId",a),s&&s!=="all"&&r.append("costCenterId",s),w(`/api/reports/indicators?${r.toString()}`)},$r=e=>e?w(`/api/financial/cost-centers/${e}`):Promise.resolve([]),Er=({establishmentId:e,startDate:t,endDate:a,cashierSessionId:s})=>{const r=new URLSearchParams({startDate:t,endDate:a});return s&&s!=="all"&&r.append("cashierSessionId",s),e&&r.append("establishmentId",e),w(`/api/reports/sales?${r.toString()}`)},Ir=()=>w("/api/reports/summary",{method:"GET"}),jt=(e,t,a,s="all")=>{const r=`/api/blockages/${e}?startDate=${t}&endDate=${a}&professionalId=${s}`;return w(r)},Ht=e=>w("/api/blockages",{method:"POST",body:JSON.stringify(e)}),Ca=e=>w(`/api/blockages/${e}`,{method:"DELETE"}),Oo=e=>w("/api/blockages/batch-delete",{method:"POST",body:JSON.stringify({ids:e})}),Ot=e=>e?String(e).replace(/\D/g,""):"",He=(e,t="",a=20,s={})=>{const r=new URLSearchParams;return t&&r.append("search",t),a&&r.append("limit",a),s.hasLoyalty&&r.append("hasLoyalty","true"),s.birthMonth&&r.append("birthMonth",s.birthMonth),s.inactiveDays&&r.append("inactiveDays",s.inactiveDays),w(`/api/clients/${e}?${r.toString()}`)},Cr=e=>{if(!e.phone)throw new Error("Telefone é obrigatório");const t=Ot(e.phone),a={...e,phone:t,id:t};return w(`/api/clients/${t}`,{method:"PUT",body:JSON.stringify(a)})},Lr=(e,t)=>{const a=Ot(t);return w(`/api/clients/full-history/${e}?phone=${a}`)},zo=e=>{const t=Ot(e);return w(`/api/clients/${t}`,{method:"DELETE"})},Tr=(e,t,a,s)=>w("/api/clients/redeem",{method:"POST",body:JSON.stringify({establishmentId:e,clientPhone:Ot(t),points:a,rewardName:s})});function v(e){return e==null?"":String(e).replace(/[&<>'"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[t])}function Vo(e,t=800,a=800,s=.7){return new Promise((r,o)=>{if(!e.type.match(/image.*/))return o(new Error("O ficheiro selecionado não é uma imagem."));const n=new FileReader;n.readAsDataURL(e),n.onload=i=>{const l=new Image;l.src=i.target.result,l.onload=()=>{let d=l.width,c=l.height;d>c?d>t&&(c*=t/d,d=t):c>a&&(d*=a/c,c=a);const u=document.createElement("canvas");u.width=d,u.height=c,u.getContext("2d").drawImage(l,0,0,d,c);const g=u.toDataURL("image/jpeg",s);r(g)},l.onerror=d=>o(new Error("Erro ao carregar a imagem para processamento."))},n.onerror=i=>o(new Error("Erro ao ler o ficheiro."))})}const Za=document.getElementById("content");let Ka=!1;const la=[{bg:"#e0e7ff",border:"#4f46e5",main:"#4f46e5"},{bg:"#d1fae5",border:"#059669",main:"#059669"},{bg:"#ffe4e6",border:"#e11d48",main:"#e11d48"},{bg:"#fef3c7",border:"#d97706",main:"#d97706"},{bg:"#cffafe",border:"#0e7490",main:"#0e7490"},{bg:"#e0f2fe",border:"#0284c7",main:"#0284c7"},{bg:"#ede9fe",border:"#7c3aed",main:"#7c3aed"},{bg:"#fce7f3",border:"#db2777",main:"#db2777"}];let it=[],zt=[],Re={},Me=[],D={currentView:"list",weekViewDays:7,currentDate:new Date,selectedProfessionalId:"all",profSearchTerm:"",showInactiveProfs:!1,scrollToAppointmentId:null},E={step:1,data:{id:null,clientName:"",clientPhone:"",selectedServiceIds:[],professionalId:null,professionalName:"",date:null,time:null,redeemedReward:null,clientHasRewards:!1,clientLoyaltyPoints:0}};function Pr(e){return new Intl.DateTimeFormat("pt-BR",{weekday:"short",day:"2-digit",month:"short"}).format(e).replace(/\./g,"")}function Uo(e){const t=new Date(e);if(t.setHours(0,0,0,0),D.currentView==="week"&&D.weekViewDays===7){const a=t.getDay(),s=t.getDate()-a+(a===0?-6:1);return new Date(t.setDate(s))}return t}function Lt(){const e=document.getElementById("profSelectorContainer"),t=D.profSearchTerm.toLowerCase();if(!e||!m.professionals)return;let a=m.professionals.filter(o=>D.showInactiveProfs||o.status!=="inactive");t&&(a=a.filter(o=>o.name.toLowerCase().includes(t)));const r=[...[{id:"all",name:"Todos",photo:null,status:"active"}],...a];e.innerHTML=r.map(o=>{const n=D.selectedProfessionalId===o.id,i=o.name==="Todos"?"Todos":o.name.split(" ")[0],l=o.name==="Todos"?"T":o.name.charAt(0).toUpperCase(),d=o.status!=="inactive",c=v(i),u=la[0],p=o.id!=="all"&&m.professionalColors.get(o.id)||u,g=o.photo||`https://placehold.co/64x64/${p.main?.replace("#","")||"E0E7FF"}/${p.light?.replace("#","")||"4F46E5"}?text=${l}`,f=o.id==="all"?"#e0e7ff":p.light,h=o.id==="all"?"#4f46e5":p.main,S=`border: 3px solid ${n?p.border:"transparent"}; box-shadow: ${n?"0 0 0 2px "+p.border:"none"};`;return`
            <div class="prof-card ${n?"selected":""} ${d?"":"opacity-50"}" 
                 data-action="select-professional" 
                 data-prof-id="${o.id}">
                ${o.id==="all"?`<div class="prof-card-all-placeholder" style="background-color: ${f}; color: ${h}; ${S}">
                           ${l}
                          </div>`:`<img src="${g}" alt="${c}" class="prof-card-photo" style="${S}" />`}
                <span class="prof-card-name">${c}</span>
            </div>
        `}).join("")}function Br(e,t,a,s,r){const o=(e||"").replace(/\D/g,""),n=new Date(r).toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit"}),i=new Date(r).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),l=`Olá, ${t}! Você tem um agendamento de ${a} com o(a) profissional ${s} para o dia ${n} às ${i}. Podemos confirmar? Agradecemos a preferência!`,d=encodeURIComponent(l);return`https://wa.me/${o}?text=${d}`}function Dr(e){const t=document.getElementById("agenda-view");if(!t)return;if(e.sort((s,r)=>new Date(s.startTime)-new Date(r.startTime)),e.length===0){t.innerHTML='<div class="text-center p-10 text-gray-500"><svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path vector-effect="non-scaling-stroke" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg><h3 class="mt-2 text-sm font-medium text-gray-900">Nenhum agendamento ou bloqueio</h3><p class="mt-1 text-sm text-gray-500">Não há eventos para o dia e filtros selecionados.</p></div>';return}const a=e.map(s=>{const r=new Date(s.startTime),o=new Date(s.endTime),n=r.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),i=o.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),l=m.professionalColors.get(s.professionalId)||{},d=v(s.reason),c=v(s.professionalName),u=v(s.clientName),p=v(s.serviceName);if(s.type==="blockage")return`
                <div class="appointment-list-card bg-red-50" style="border-left-color: ${l.border};">
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
                </div>`;const g=s.status==="completed",f=g?"bg-green-100 text-green-800":"bg-yellow-100 text-yellow-800",h=g?"Finalizado":"Aberto",y=JSON.stringify(s).replace(/'/g,"&apos;"),S=s.redeemedReward?.points>0,I=s.hasRewards&&!S,$=Br(s.clientPhone,s.clientName,s.serviceName,s.professionalName,s.startTime);return`
            <div class="appointment-list-card" data-appointment='${y}' style="border-left-color: ${l.border};">
                
                <div class="time-info" data-action="open-comanda">
                    <p class="font-bold text-md">${n}</p>
                    <p class="text-xs text-gray-500">${i}</p>
                </div>

                <div class="details-info min-w-0" data-action="open-comanda">
                    <p class="font-bold text-gray-800 truncate">${I?"🎁 ":""}${u}</p>
                    <p class="text-sm text-gray-600 truncate">${p}</p>
                    <p class="text-xs text-gray-500 truncate">com ${c||"Indefinido"}</p>
                    
                    ${S?'<p class="text-xs font-semibold text-purple-600">Resgate de Prémio</p>':""}
                </div>

                <div class="status-info">
                    <span class="status-badge ${f} mb-1">${h}</span>
                    <div class="card-actions flex gap-1 items-center">
                        ${g?`
                            <button data-action="edit-appointment" data-appointment='${y}' class="action-btn opacity-40 cursor-not-allowed" title="Finalizado - Não editável" disabled><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z"></path></svg></button>
                        `:`
                            <a href="${$}" target="_blank" class="action-btn text-green-500 hover:text-green-700 p-1" title="Enviar Confirmação WhatsApp">
                                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12.036 2a10 10 0 100 20 10 10 0 000-20zM17.5 14.8c-.24.125-1.465.716-1.696.804-.23.09-.49.135-.75.045-.26-.09-.982-.322-1.87-.965-.888-.643-1.474-1.442-1.64-1.748-.166-.307-.015-.467.106-.615.116-.149.23-.388.344-.582.113-.193.15-.327.1-.462-.05-.136-.264-.322-.544-.654-.28-.332-.572-.782-.828-.958-.255-.176-.438-.158-.61-.158-.173 0-.374-.022-.574-.022-.2 0-.54.075-.826.375-.285.3-.99.965-.99 2.355 0 1.43 1.018 2.872 1.16 3.072.14.2 2 3.047 4.86 4.218 2.86 1.17 2.86.786 3.376 1.054.516.268 1.49.462 1.696.406.206-.057 1.463-.615 1.67-.887.2-.27.2-.504.14-.615-.058-.11-.23-.166-.48-.306z"/></svg>
                            </a>
                            <button data-action="edit-appointment" data-appointment='${y}' class="action-btn" title="Editar Agendamento"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z"></path></svg></button>
                        `}
                        <button data-action="delete-appointment" data-id="${s.id}" class="action-btn" title="Apagar Agendamento"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
                    </div>
                </div>
            </div>`}).join("");t.innerHTML=`<div class="list-view-container">${a}</div>`}function La(){return window.innerWidth<768&&D.currentView==="week"?3:D.weekViewDays}function Mr(e){const t=document.getElementById("agenda-view");if(!t)return;const a=["Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sábado"],s=Uo(D.currentDate),r=La();let o=`<div class="grid divide-x divide-gray-200 min-h-[60vh]" style="grid-template-columns: repeat(${r}, minmax(0, 1fr));">`;for(let n=0;n<r;n++){const i=new Date(s);i.setDate(i.getDate()+n);const l=new Date,d=i.toDateString()===l.toDateString(),c=e.filter(p=>new Date(p.startTime).toDateString()===i.toDateString()).sort((p,g)=>new Date(p.startTime)-new Date(g.startTime));let u='<div class="p-1 space-y-2">';c.length>0?u+=c.map(p=>{const f=new Date(p.startTime).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),h=m.professionalColors.get(p.professionalId)||{bg:"#e5e7eb",border:"#9ca3af"},y=v(p.reason),S=v(p.professionalName),I=v(p.clientName),$=v(p.serviceName);if(p.type==="blockage")return`
                        <div class="p-2 rounded-lg border-l-4 flex flex-col bg-red-100" style="border-left-color: ${h.border};">
                            <span class="font-bold text-xs text-red-900">${f}</span>
                            <div class="mt-1 min-w-0">
                                <p class="font-semibold text-sm text-red-800 truncate">${y}</p>
                                <p class="text-xs text-red-600 truncate">com ${S}</p>
                            </div>
                        </div>
                    `;const k=JSON.stringify(p).replace(/'/g,"&apos;"),C=p.redeemedReward?.points>0,F=p.hasRewards&&!C,O=p.status==="completed";return`
                    <div class="p-2 rounded-lg border-l-4 flex flex-col cursor-pointer" 
                         style="background-color: ${h.bg}; border-left-color: ${h.border};"
                         data-action="open-comanda" data-appointment='${k}'>
                        
                        <div class="flex justify-between items-center">
                            <span class="font-bold text-xs text-gray-900">${f}</span>
                            ${O?'<span class="text-[10px] font-semibold bg-green-200 text-green-800 px-1 rounded-sm">OK</span>':""}
                        </div>

                        <div class="mt-1 min-w-0">
                            <p class="font-semibold text-sm text-gray-800 truncate">${F?"🎁 ":""}${I}</p>
                            <p class="text-xs text-gray-600 truncate">${$}</p>
                            <p class="text-xs text-gray-500 truncate">com ${S||"Indefinido"}</p>
                            ${C?'<p class="text-xs text-purple-600 truncate">Resgate</p>':""}
                        </div>
                        
                        </div>
                `}).join(""):u+='<div class="text-center text-xs text-gray-400 pt-4">Nenhum evento</div>',u+="</div>",o+=`
            <div class="flex flex-col">
                <div class="text-center py-2 border-b ${d?"bg-indigo-100 text-indigo-700":"bg-gray-50"}">
                    <p class="font-bold">${a[i.getDay()]}</p>
                    <p class="text-sm">${i.getDate()}/${i.getMonth()+1}</p>
                </div>
                <div class="flex-grow overflow-y-auto">${u}</div>
            </div>
        `}o+="</div>",t.innerHTML=o}function Ar(){const e=m.allEvents.filter(t=>D.selectedProfessionalId==="all"||t.professionalId===D.selectedProfessionalId);D.currentView==="list"?Dr(e):Mr(e)}async function te(){const e=document.getElementById("agenda-view");if(!e)return;e.innerHTML='<div class="loader mx-auto my-10"></div>';let t,a;const s=document.getElementById("weekRange");if(s){if(D.currentView==="list")t=new Date(D.currentDate),t.setHours(0,0,0,0),a=new Date(D.currentDate),a.setHours(23,59,59,999),s.textContent=Pr(t);else{const r=La();t=Uo(new Date(D.currentDate)),a=new Date(t),a.setDate(t.getDate()+(r-1)),a.setHours(23,59,59,999),s.textContent=`${t.toLocaleDateString("pt-BR",{day:"2-digit",month:"short"})} - ${a.toLocaleDateString("pt-BR",{day:"2-digit",month:"short"})}`}try{const r=await Bo(m.establishmentId,t.toISOString(),a.toISOString(),D.selectedProfessionalId==="all"?null:D.selectedProfessionalId),o=await jt(m.establishmentId,t.toISOString(),a.toISOString(),D.selectedProfessionalId);if(!document.getElementById("agenda-view"))return;const n=o.map(l=>{let d=l.professionalName;if(!d&&l.professionalId){const c=m.professionals?m.professionals.find(u=>u.id===l.professionalId):null;c&&(d=c.name)}return{...l,type:"blockage",professionalName:d||"Não identificado"}}),i=[...r.map(l=>({...l,type:"appointment"})),...n];if(m.allEvents=i,Lt(),Ar(),D.scrollToAppointmentId){const l=document.querySelector(`[data-appointment*='"id":"${D.scrollToAppointmentId}"']`);l&&(l.scrollIntoView({behavior:"smooth",block:"center"}),l.style.transition="background-color 0.5s ease-in-out",l.style.backgroundColor="#e0e7ff",setTimeout(()=>{l.style.backgroundColor=""},2500)),D.scrollToAppointmentId=null}}catch(r){document.getElementById("agenda-view")&&(document.getElementById("agenda-view").innerHTML='<div class="p-6 text-center text-red-600">Falha ao carregar dados.</div>',b("Erro na Agenda",`Não foi possível carregar a agenda: ${r.message}`,"error"))}}}async function Nr(){try{const[e,t,a]=await Promise.all([m.professionals&&m.professionals.length>0?Promise.resolve(m.professionals):X(m.establishmentId),m.services&&m.services.length>0?Promise.resolve(m.services):Ee(m.establishmentId),Re.enabled!==void 0?Promise.resolve(null):$e(m.establishmentId)]);(!m.professionals||m.professionals.length===0)&&(m.professionals=e||[]),(!m.services||m.services.length===0)&&(m.services=t||[]),Me=[],a&&(Re=a.loyaltyProgram||{enabled:!1}),m.professionals.forEach((s,r)=>{m.professionalColors.set(s.id,la[r%la.length])}),Lt()}catch(e){console.error("Erro ao popular filtros e dependências do modal:",e),b("Atenção","Não foi possível pré-carregar os dados para agendamento. A abertura do modal pode ser lenta.","error")}}function da(e){e<1||e>4||(E.step=e,ca(null,!0))}function _o(e,t){const a=document.getElementById("multiServiceToggle"),s=a&&a.checked,r=t.classList.contains("selected"),o=E.data.selectedServiceIds.indexOf(e);if(r)t.classList.remove("selected","border-blue-500"),o>-1&&E.data.selectedServiceIds.splice(o,1);else{if(!s){E.data.selectedServiceIds=[];const n=document.getElementById("apptServicesContainer");n&&n.querySelectorAll(".service-card.selected").forEach(i=>{i.classList.remove("selected","border-blue-500")})}t.classList.add("selected","border-blue-500"),E.data.selectedServiceIds.push(e)}}function Jo(e,t){const a=document.querySelector(".professional-step-cards");if(!a)return;a.querySelectorAll(".professional-modal-card").forEach(r=>r.classList.remove("selected","border-blue-500")),t.classList.add("selected","border-blue-500");const s=zt.find(r=>r.id===e);E.data.professionalId=e,E.data.professionalName=s?s.name:"N/A"}function qr(e,t){const a=document.getElementById("availableTimesContainer");a&&(a.querySelectorAll(".time-slot-card").forEach(s=>s.classList.remove("selected")),t.classList.add("selected"),E.data.time=e)}async function eo(){const e=document.getElementById("apptTotalDuration"),t=document.getElementById("availableTimesContainer");if(!e||!t)return;const a=E.data.professionalId,s=E.data.selectedServiceIds,r=document.getElementById("apptDate").value;E.data.date=r;const o=s.reduce((n,i)=>{const l=it.find(d=>d.id===i);return n+(l?l.duration+(l.bufferTime||0):0)},0);if(e.textContent=`${o} min`,o===0||!a||!r){t.innerHTML='<p class="col-span-full text-center text-gray-500">Selecione serviço, profissional e data.</p>';return}t.innerHTML='<div class="loader mx-auto col-span-full"></div>';try{let n=await Fs({establishmentId:m.establishmentId,professionalId:a,serviceIds:s,date:r});const i=new Date;if(new Date(r+"T00:00:00").toDateString()===i.toDateString()){const d=i.getHours()*60+i.getMinutes();n=n.filter(c=>{const[u,p]=c.split(":").map(Number);return u*60+p>=d})}if(t.innerHTML="",n.length>0){if(n.forEach(d=>{const c=document.createElement("button");c.type="button",c.className=`time-slot-card p-2 text-sm bg-gray-100 rounded-md hover:bg-gray-200 transition ${E.data.time===d?"selected":""}`,c.textContent=d,c.addEventListener("click",()=>qr(d,c)),t.appendChild(c)}),E.data.time){const d=t.querySelector(`[data-action="time-slot"][data-time="${E.data.time}"]`);d&&d.classList.add("selected")}}else t.innerHTML='<p class="col-span-full text-center text-gray-500">Nenhum horário disponível.</p>'}catch(n){console.error("Erro ao buscar horários:",n),t.innerHTML='<p class="col-span-full text-center text-red-500">Erro ao buscar horários.</p>'}}function Rr(){const e=document.getElementById("loyaltyRewardsContainer");if(!e)return;const{clientHasRewards:t,clientLoyaltyPoints:a,redeemedReward:s}=E.data,{enabled:r,rewards:o}=Re;if(!r||!t||!o||o.length===0){e.classList.add("hidden"),e.innerHTML="";return}e.classList.remove("hidden");const n=o.filter(l=>a>=l.points);let i=`
        <h4 class="text-md font-semibold text-gray-700 mb-2">🎁 Prêmios Disponíveis (${a} pontos)</h4>
    `;n.length>0?(i+='<div class="space-y-2">',i+=n.map(l=>{const d=s?.reward===l.reward,c=v(l.reward);return`
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
            `}).join(""),i+="</div>"):i+='<p class="text-sm text-gray-600">Pontos insuficientes para resgatar os prêmios disponíveis.</p>',e.innerHTML=i,e.querySelectorAll('input[name="loyaltyReward"]').forEach(l=>{l.addEventListener("change",d=>{d.target.checked&&(E.data.redeemedReward={reward:d.target.value,points:parseInt(d.target.dataset.points,10)})})}),e.insertAdjacentHTML("beforeend",`
        <label class="flex items-center p-3 mt-2 bg-white rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-50">
            <input type="radio" name="loyaltyReward" class="form-radio text-gray-400" 
                   value="none" 
                   ${s?"":"checked"}>
            <span class="ml-3 text-gray-600">Não resgatar prêmio agora</span>
        </label>
    `),e.querySelector('input[value="none"]').addEventListener("change",l=>{l.target.checked&&(E.data.redeemedReward=null)})}async function Fr(e){e.preventDefault();const t=e.target,a=t.querySelector('button[type="submit"]');if(!E.data.time||E.data.selectedServiceIds.length===0||!E.data.professionalId)return b("Erro de Validação","Por favor, selecione o horário, serviço(s) e profissional antes de confirmar.","error");a.disabled=!0,a.textContent="A confirmar...";const s=E.data.selectedServiceIds.map(d=>{const c=it.find(u=>u.id===d);return{id:c.id,name:c.name,price:c.price,duration:c.duration,bufferTime:c.bufferTime||0,photo:c.photo||null}}),[r,o]=E.data.time.split(":"),n=new Date(`${E.data.date}T${r}:${o}:00`),i={establishmentId:m.establishmentId,clientName:E.data.clientName,clientPhone:E.data.clientPhone,services:s,professionalId:E.data.professionalId,startTime:n.toISOString(),redeemedReward:E.data.redeemedReward},l=t.querySelector("#appointmentId").value;l&&(i.id=l);try{l?await Sa(l,i):await js(i),b(`Agendamento ${l?"atualizado":"criado"} com sucesso!`,"success"),document.getElementById("appointmentModal").style.display="none",te()}catch(d){b(d.message,"error")}finally{a.disabled=!1,a.textContent="Confirmar Agendamento"}}function Wo(e){const t=E.data.clientName===e.name&&E.data.clientPhone===e.phone,a=v(e.name),s=v(e.phone);return`
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
    `}async function jr(e){const t=document.getElementById("clientSearchResults");if(!t)return;const a=e.trim();if(a.length<3){t.innerHTML='<p class="text-sm text-gray-500">Digite pelo menos 3 caracteres para buscar clientes existentes.</p>';return}t.innerHTML='<div class="loader-small mx-auto my-2"></div>';try{const s=await He(m.establishmentId,a);if(Me=s,s.length===0){t.innerHTML='<p class="text-sm text-gray-500">Nenhum cliente encontrado com este termo.</p>';return}t.innerHTML=s.map(Wo).join(""),t.querySelectorAll('[data-action="select-client"]').forEach(r=>{r.addEventListener("click",o=>{const n=r.dataset.clientName,i=r.dataset.clientPhone,l=parseInt(r.dataset.loyaltyPoints||"0",10);E.data.clientName=n,E.data.clientPhone=i,E.data.clientLoyaltyPoints=l;const d=Re,c=Math.min(...(d?.rewards||[]).map(u=>u.points));E.data.clientHasRewards=d.enabled&&c!==1/0&&E.data.clientLoyaltyPoints>=c,document.getElementById("apptClientName").value=n,document.getElementById("apptClientPhone").value=i,document.querySelectorAll(".client-search-card").forEach(u=>u.classList.remove("selected","border-blue-500")),r.classList.add("selected","border-blue-500")})})}catch(s){console.error("Erro na busca de clientes:",s),t.innerHTML='<p class="text-sm text-red-500">Erro ao buscar clientes.</p>'}}async function Hr(e){e.preventDefault();const t=document.getElementById("clientRegistrationForm"),a=t.querySelector('button[type="submit"]'),s={establishmentId:m.establishmentId,name:t.querySelector("#regClientName").value.trim(),email:t.querySelector("#regClientEmail").value.trim(),phone:t.querySelector("#regClientPhone").value.trim(),dobDay:t.querySelector("#regClientDobDay").value.trim(),dobMonth:t.querySelector("#regClientDobMonth").value.trim(),notes:t.querySelector("#regClientNotes").value.trim()};if(!s.name||!s.phone)return b("Erro de Validação","Nome e Telefone são obrigatórios.","error");a.disabled=!0,a.textContent="A salvar...";try{await(void 0)(s),Me.push({name:s.name,phone:s.phone,loyaltyPoints:0}),E.data.clientName=s.name,E.data.clientPhone=s.phone,E.data.clientHasRewards=!1,E.data.clientLoyaltyPoints=0,b("Cliente cadastrado com sucesso!","success"),document.getElementById("genericModal").style.display="none",da(1)}catch(r){b(`Erro ao cadastrar cliente: ${r.message}`,"error")}finally{a.disabled=!1,a.textContent="Salvar"}}function Or(){_({title:"Cadastrar Novo Cliente",contentHTML:`
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
    `,maxWidth:"max-w-2xl"});const t=document.getElementById("clientRegistrationForm");t&&t.addEventListener("submit",Hr)}function zr(){Or()}function Vr(e,t){const a=e?"Editar Agendamento":"Selecionar Cliente",s=`
        <div class="p-5 space-y-6">
            <h3 class="text-xl font-bold text-gray-800">1. Dados do Cliente</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label for="apptClientName" class="block text-sm font-medium text-gray-700">Nome Completo</label>
                    <input type="text" id="apptClientName" required class="mt-1 block w-full p-3 rounded-lg border-gray-300 shadow-sm" placeholder="Nome Completo" value="${v(E.data.clientName)}">
                </div>
                <div>
                    <label for="apptClientPhone" class="block text-sm font-medium text-gray-700">Telemóvel</label>
                    <input type="tel" id="apptClientPhone" required class="mt-1 block w-full p-3 rounded-lg border-gray-300 shadow-sm" placeholder="(XX) XXXXX-XXXX" value="${v(E.data.clientPhone)}">
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
    `;return{title:a,content:s}}function Ur(){const e="Selecionar Serviço",a=`
        <div class="p-5 space-y-6">
            <h3 class="text-xl font-bold text-gray-800">2. Serviços</h3>
             
             <div class="flex flex-col sm:flex-row items-center gap-4 bg-gray-100 p-4 rounded-lg border border-gray-200">
                 <input type="search" id="serviceSearchModalInput" placeholder="Buscar Serviço..." class="w-full sm:flex-grow p-3 pl-10 border rounded-lg">
                 
                 <label class="flex items-center space-x-2 cursor-pointer flex-shrink-0">
                     <div class="relative">
                         <input type="checkbox" id="multiServiceToggle" class="sr-only" ${E.data.selectedServiceIds.length>1?"checked":""}>
                         <div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full transition-colors"></div>
                         <div class="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform" style="transition: all 0.3s;"></div>
                     </div>
                     <span class="text-sm font-medium text-gray-700">Selecionar Vários</span>
                 </label>
            </div>
            
            <div id="apptServicesContainer" class="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3 max-h-48 overflow-y-auto p-1">
                 ${it.map(s=>{const r=E.data.selectedServiceIds.includes(s.id),o=s.photo||"https://placehold.co/40x40/E0E7FF/4F46E5?text=S",n=v(s.name);return`
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
    `;return{title:e,content:a}}function _r(){const e="Selecionar Profissional",t=`
        <div class="p-5 space-y-6">
             <h3 class="text-xl font-bold text-gray-800">3. Profissional</h3>
             <div id="apptProfessionalContainer" class="mt-4 flex flex-wrap gap-3 max-h-48 overflow-y-auto p-1 professional-step-cards">
                 ${zt.map(a=>{const s=E.data.professionalId===a.id,r=a.photo||"https://placehold.co/60x60/E0E7FF/4F46E5?text=P",o=v(a.name);return`
                         <div class="professional-modal-card p-3 bg-white rounded-lg border-2 border-gray-200 text-center cursor-pointer transition-all hover:bg-gray-50 ${s?"selected border-blue-500":""}" data-professional-id="${a.id}">
                             <img src="${r}" class="w-12 h-12 rounded-full object-cover mx-auto mb-1">
                             <p class="text-xs font-semibold text-gray-800">${o.split(" ")[0]}</p>
                             <p class="text-[10px] text-gray-500">${v(a.specialty||"Profissional")}</p>
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
    `;return{title:e,content:t}}function Jr(e){const t=e?"Confirmar Edição":"Data e Horário",a=new Date,s=`${a.getFullYear()}-${String(a.getMonth()+1).padStart(2,"0")}-${String(a.getDate()).padStart(2,"0")}`,r=E.data.date||s,o=v(E.data.clientName),n=v(E.data.professionalName),i=`
        <div class="p-5 space-y-6">
            <h3 class="text-xl font-bold text-gray-800">4. ${t}</h3>

            <div class="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400 space-y-1">
                <p class="font-bold text-gray-800">${o}</p>
                <p class="text-sm text-gray-700">Serviços: ${E.data.selectedServiceIds.length} selecionado(s)</p>
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
    `;return{title:t,content:i}}function Wr(e){const t=document.getElementById("apptServicesContainer");if(!t)return;const a=e.toLowerCase(),s=it.filter(r=>r.name.toLowerCase().includes(a));t.innerHTML=s.map(r=>{const o=E.data.selectedServiceIds.includes(r.id),n=r.photo||"https://placehold.co/40x40/E0E7FF/4F46E5?text=S";return`
            <div class="service-card p-3 bg-white rounded-lg border-2 border-gray-200 cursor-pointer transition-all hover:bg-gray-50 ${o?"selected border-blue-500":""}" data-service-id="${r.id}">
                <div class="flex items-center">
                    <img src="${n}" class="w-8 h-8 rounded-full object-cover mr-3 flex-shrink-0">
                    <div class="flex-1">
                        <p class="font-semibold text-sm text-gray-800">${v(r.name)}</p>
                        <p class="text-xs text-gray-500">R$ ${r.price.toFixed(2)} (${r.duration} min)</p>
                    </div>
                </div>
            </div>`}).join(""),t.querySelectorAll(".service-card").forEach(r=>{r.addEventListener("click",()=>_o(r.dataset.serviceId,r))})}function Gr(e){const t=document.getElementById("apptProfessionalContainer");if(!t)return;const a=e.toLowerCase(),s=zt.filter(r=>r.name.toLowerCase().includes(a));t.innerHTML=s.map(r=>{const o=E.data.professionalId===r.id,n=r.photo||"https://placehold.co/60x60/E0E7FF/4F46E5?text=P",i=v(r.name);return`
             <div class="professional-modal-card p-3 bg-white rounded-lg border-2 border-gray-200 text-center cursor-pointer transition-all hover:bg-gray-50 ${o?"selected border-blue-500":""}" data-professional-id="${r.id}">
                 <img src="${n}" class="w-12 h-12 rounded-full object-cover mx-auto mb-1">
                 <p class="text-xs font-semibold text-gray-800">${i.split(" ")[0]}</p>
                 <p class="text-[10px] text-gray-500">${v(r.specialty||"Profissional")}</p>
             </div>`}).join(""),t.querySelectorAll(".professional-modal-card").forEach(r=>{r.addEventListener("click",()=>Jo(r.dataset.professionalId,r))})}async function ca(e=null,t=!1){const a=document.getElementById("appointmentModal");if(!t){const o=e?.startTime?new Date(e.startTime).toISOString().split("T")[0]:new Date().toISOString().split("T")[0],n=e?.startTime?new Date(e.startTime).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit",hour12:!1}):null;if(E={step:1,data:{id:e?.id||null,clientName:e?.clientName||"",clientPhone:e?.clientPhone||"",selectedServiceIds:e?.services?.map(i=>i.id)||[],professionalId:e?.professionalId||null,professionalName:e?.professionalName||"",date:o,time:n,redeemedReward:e?.redeemedReward||null,clientHasRewards:e?.hasRewards||!1,clientLoyaltyPoints:0}},e&&e.clientName)try{const i=await He(m.establishmentId,e.clientName),l=i.find(d=>d.phone===e.clientPhone);l&&(E.data.clientLoyaltyPoints=l.loyaltyPoints||0,Me=i)}catch(i){console.warn("Não foi possível carregar pontos do cliente para edição:",i)}}if(!m.services||!m.professionals||Re.enabled===void 0){b("Erro","Os dados da agenda ainda não foram carregados. Tente novamente em alguns segundos.","error");return}if(it=m.services,zt=m.professionals.filter(o=>o.status==="active"),E.data.clientLoyaltyPoints>0){const o=Re,n=Math.min(...(o?.rewards||[]).map(i=>i.points));E.data.clientHasRewards=o.enabled&&n!==1/0&&E.data.clientLoyaltyPoints>=n}let s={title:"Erro",content:"<p>Etapa não encontrada.</p>"};switch(E.step){case 1:s=Vr(e);break;case 2:s=Ur();break;case 3:s=_r();break;case 4:s=Jr(e);break}a.innerHTML=`
        <div class="modal-content max-w-4xl p-0 rounded-xl overflow-hidden shadow-2xl">
            <header class="p-5 border-b flex justify-between items-center bg-gray-50">
                <h2 class="text-xl font-bold text-gray-800">${s.title}</h2>
                <button type="button" data-action="close-modal" data-target="appointmentModal" class="text-2xl font-bold text-gray-500 hover:text-gray-900">&times;</button>
            </header>
            
            <form id="appointmentForm" class="flex flex-col h-full">
                <input type="hidden" id="appointmentId" value="${E.data.id||""}">
                <input type="hidden" id="selectedTime" value="${E.data.time||""}">
                
                <div class="flex-1 overflow-y-auto" style="max-height: 80vh;">
                    ${s.content}
                </div>
                
            </form>
        </div>`,a.querySelectorAll('[data-action="next-step"]').forEach(o=>{o.addEventListener("click",()=>{const n=parseInt(o.dataset.currentStep,10);if(n===1){const i=a.querySelector("#apptClientName"),l=a.querySelector("#apptClientPhone");if(E.data.clientName=i.value.trim(),E.data.clientPhone=l.value.trim(),!E.data.clientName||!E.data.clientPhone)return b("Atenção","Nome e telefone do cliente são obrigatórios.","error")}else if(n===2){if(E.data.selectedServiceIds.length===0)return b("Atenção","Selecione pelo menos um serviço.","error")}else if(n===3&&!E.data.professionalId)return b("Atenção","Selecione um profissional.","error");da(n+1)})}),a.querySelectorAll('[data-action="prev-step"]').forEach(o=>{o.addEventListener("click",()=>da(parseInt(o.dataset.currentStep,10)-1))});const r=a.querySelector("#appointmentForm");if(E.step===4&&r&&r.addEventListener("submit",Fr),a.style.display="flex",E.step===2){a.querySelector("#apptServicesContainer").querySelectorAll(".service-card").forEach(i=>{i.addEventListener("click",()=>_o(i.dataset.serviceId,i))});const n=a.querySelector("#serviceSearchModalInput");n&&n.addEventListener("input",i=>Wr(i.target.value))}if(E.step===3){a.querySelector("#apptProfessionalContainer").querySelectorAll(".professional-modal-card").forEach(i=>{i.addEventListener("click",()=>Jo(i.dataset.professionalId,i))});const n=a.querySelector("#professionalSearchModalInput");n&&n.addEventListener("input",i=>Gr(i.target.value))}if(E.step===1){const o=a.querySelector("#clientSearchInput");if(o&&(o.addEventListener("input",i=>jr(i.target.value)),E.data.clientName&&E.data.clientPhone&&Me.length>0)){const i=document.getElementById("clientSearchResults");i&&(i.innerHTML=Me.map(Wo).join(""))}const n=a.querySelector('[data-action="open-client-registration"]');n&&n.addEventListener("click",zr)}if(E.step===4){const o=a.querySelector("#apptDate");o&&o.addEventListener("change",eo),eo(),Rr()}}async function Go(e={}){D.currentDate=e.targetDate?new Date(e.targetDate):D.currentDate||new Date,D.scrollToAppointmentId=e.scrollToAppointmentId||null,D.profSearchTerm="",window.innerWidth<768&&(D.currentView="list"),Za.innerHTML=`
        <section>
            <div class="bg-white p-4 rounded-xl shadow-lg mb-4">
                
                <div class="flex flex-col sm:flex-row sm:flex-wrap sm:justify-between sm:items-center mb-4 gap-4">
                    <span id="weekRange" class="font-semibold text-lg w-full text-left sm:text-right sm:flex-grow order-1 sm:order-2"></span>
                    <div class="flex flex-wrap items-center gap-2 order-2 sm:order-1">
                        <div class="flex items-center gap-1 rounded-lg bg-gray-200 p-1">
                            <button data-view="list" class="view-btn ${D.currentView==="list"?"active":""}">Lista</button>
                            <button data-view="week" class="view-btn ${D.currentView==="week"?"active":""}">Semana</button>
                        </div>
                        <div id="week-days-toggle" class="${D.currentView==="week"?"flex":"hidden"} items-center gap-1 rounded-lg bg-gray-200 p-1">
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
        </section>`,document.querySelectorAll(".view-btn[data-view]").forEach(a=>{a.addEventListener("click",()=>{document.querySelectorAll(".view-btn[data-view]").forEach(r=>r.classList.remove("active")),a.classList.add("active"),D.currentView=a.dataset.view;const s=document.getElementById("week-days-toggle");if(D.currentView==="week"){if(s.style.display="flex",window.innerWidth<768){D.weekViewDays=3,document.querySelectorAll(".week-days-btn").forEach(o=>o.classList.remove("active"));const r=document.querySelector('.week-days-btn[data-days="3"]');r&&r.classList.add("active")}}else s.style.display="none";te()})}),document.querySelectorAll(".week-days-btn").forEach(a=>{a.addEventListener("click",()=>{document.querySelectorAll(".week-days-btn").forEach(s=>s.classList.remove("active")),a.classList.add("active"),D.weekViewDays=parseInt(a.dataset.days,10),te()})}),document.getElementById("todayBtn").addEventListener("click",()=>{D.currentDate=new Date,te()});const t=a=>{const s=parseInt(a.currentTarget.dataset.amount,10),r=D.currentView==="week"?La():1,o=new Date(D.currentDate);o.setDate(o.getDate()+s*r),D.currentDate=o,te()};document.getElementById("prevBtn").addEventListener("click",t),document.getElementById("nextBtn").addEventListener("click",t),document.getElementById("profSearchInput").addEventListener("input",a=>{D.profSearchTerm=a.target.value,Lt()}),document.getElementById("showInactiveProfsToggle").addEventListener("change",a=>{D.showInactiveProfs=a.target.checked,Lt(),te()}),Ka||(Za.addEventListener("click",async a=>{const s=a.target.closest("[data-action]");if(a.target.closest('[data-action="select-professional"]')){const l=a.target.closest('[data-action="select-professional"]').dataset.profId,d=D.selectedProfessionalId===l&&l!=="all";if(D.selectedProfessionalId=d?"all":l,l!=="all"){const c=document.getElementById("profSearchInput");c&&(c.value=""),D.profSearchTerm=""}await te();return}if(!s)return;const r=s.dataset.action;let o=null;const n=a.target.closest("[data-appointment]");switch(n&&(o=JSON.parse(n.dataset.appointment.replace(/&apos;/g,"'"))),r){case"new-appointment":ca();break;case"edit-appointment":if(!o)return;if(o.status==="completed"){b("Atenção","Agendamentos finalizados não podem ser editados.","error");return}o.hasRewards&&!o.redeemedReward&&b("🎁 Cliente com Prêmios!","Este cliente tem pontos para resgatar. Verifique a Etapa 4 do agendamento.","info"),ca(o);break;case"delete-appointment":{const i=s.dataset.id;if(await j("Confirmar Exclusão","Tem a certeza que deseja apagar este agendamento?"))try{await Hs(i),b("Agendamento apagado!","success"),te()}catch(d){b(`Não foi possível apagar: ${d.message}`,"error")}break}case"open-comanda":if(o){o.hasRewards&&!o.redeemedReward&&o.status!=="completed"&&b("🎁 Cliente com Prêmios!","Este cliente tem pontos de fidelidade para resgatar.","info");const i=o.status==="completed"?"finalizadas":"em-atendimento",l={selectedAppointmentId:o.id,initialFilter:i};if(i==="finalizadas"){let d=o.startTime;if(o.transaction&&o.transaction.paidAt){const c=o.transaction.paidAt;typeof c=="object"&&c._seconds?d=new Date(c._seconds*1e3):d=c}l.filterDate=d}re("comandas-section",l)}break}}),Ka=!0),await Nr(),await te()}const Yr=(e,t=null,a=1,s=12)=>{let r=`/api/comandas/${e}?page=${a}&limit=${s}`;return t&&(r+=`&date=${t}`),w(r)},Qr=e=>w("/api/sales",{method:"POST",body:JSON.stringify(e)}),Xr=e=>w(`/api/sales/${e}/reopen`,{method:"POST"}),Zr=e=>w(`/api/sales/${e}`,{method:"DELETE"}),Yo=()=>w("/api/cashier/status").catch(e=>{if(e.message.includes("404")||e.message.includes("não encontrada"))return null;throw e}),Kr=e=>{const t={establishmentId:e.establishmentId,initialAmount:Number(e.initialAmount),notes:e.notes||""};return console.log("Payload enviado para abrir caixa:",t),w("/api/cashier/open",{method:"POST",body:JSON.stringify(t)})},en=(e,t)=>{const a={finalAmount:Number(t)};return console.log("Payload enviado para fechar caixa:",a),w(`/api/cashier/close/${e}`,{method:"PUT",body:JSON.stringify(a)})},tn=()=>w("/api/cashier/history").then(e=>e||[]).catch(e=>(console.error("Erro ao buscar histórico:",e),[])),an=e=>w(`/api/cashier/report/${e}`),Qo=e=>w(`/api/packages/${e}`),on=e=>w("/api/packages",{method:"POST",body:JSON.stringify(e)}),sn=(e,t)=>w(`/api/packages/${e}`,{method:"PUT",body:JSON.stringify(t)}),rn=e=>w(`/api/packages/${e}`,{method:"DELETE"});let x={allComandas:[],catalog:{services:[],products:[],packages:[]},clients:[],activeFilter:"atendimento",selectedComandaId:null,isCashierOpen:!1,activeCashierSessionId:null,loyaltySettings:null,paging:{page:1,limit:12,total:0}},Ce=null,Te=null;function Vt(e){if(e.status==="completed"){const r=e.comandaItems||e.items||[];return r.length>0?r:e.services||[]}const t=e.services||[],a=[...e.comandaItems||[],...e.items||[]];let s=[...t];return a.forEach(r=>{if(r.type==="product"){s.push(r);return}s.some(n=>{const i=n.id&&r.id&&n.id===r.id,l=n.name&&r.name&&n.name===r.name;return i||l})||s.push(r)}),s}function nn(){const e=document.getElementById("comandas-layout");if(e){e.classList.add("detail-view-active");const t=document.getElementById("comanda-detail-container");t&&(t.scrollTop=0)}}function he(){const e=document.getElementById("comandas-layout");e&&e.classList.remove("detail-view-active")}function ln(){const e=new Date().toISOString().split("T")[0];Te.innerHTML=`
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
    `}function dn(){const e=document.getElementById("cashier-controls");e&&(x.isCashierOpen?e.innerHTML=`
            <span class="hidden sm:inline-block text-sm font-medium text-green-700 bg-green-100 py-1 px-3 rounded-full">Caixa Aberto</span>
            <button data-action="close-cashier" class="py-2 px-4 bg-red-100 text-red-700 font-semibold rounded-lg hover:bg-red-200 text-sm">Fechar Caixa</button>
            <button data-action="view-sales-report" class="py-2 px-4 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 text-sm">Relatório</button>
        `:e.innerHTML=`
            <span class="hidden sm:inline-block text-sm font-medium text-red-700 bg-red-100 py-1 px-3 rounded-full">Caixa Fechado</span>
            <button data-action="open-cashier" class="py-2 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 text-sm">Abrir Caixa</button>
            <button data-action="view-sales-report" class="py-2 px-4 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 text-sm">Relatório</button>
        `)}function me(){const e=document.getElementById("comandas-list");if(!e)return;if(!x.isCashierOpen&&x.activeFilter==="atendimento"){e.innerHTML=`
            <div class="text-center py-10 opacity-60">
                <p class="text-sm font-medium text-gray-700">Caixa Fechado</p>
                <p class="text-xs text-gray-500">Abra o caixa para ver as vendas</p>
            </div>
        `;return}const a={atendimento:"confirmed",finalizadas:"completed"}[x.activeFilter],s=x.allComandas.filter(r=>r.status===a);if(s.length===0){e.innerHTML='<p class="text-center text-gray-400 py-10 text-sm">Nenhuma venda encontrada.</p>',to(e);return}e.innerHTML=s.map(r=>{const n=Vt(r).reduce((g,f)=>g+(f.price||0),0),i=r.id===x.selectedComandaId,l=new Date(r.startTime).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),d=r.type==="walk-in"||r.id.startsWith("temp-"),c=v(r.clientName),u=v(r.professionalName),p=d?'<span class="text-[10px] font-bold uppercase text-blue-600 bg-blue-100 px-2 py-0.5 rounded-md">Avulso</span>':'<span class="text-[10px] font-bold uppercase text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded-md">Agendado</span>';return`
            <div data-action="select-comanda" data-comanda-id="${r.id}" 
                 class="comanda-card cursor-pointer ${i?"selected":""}">
                
                <div class="flex justify-between items-start mb-1">
                    <p class="font-bold text-gray-800 truncate max-w-[70%]">${c}</p>
                    <p class="font-bold text-gray-900">R$ ${n.toFixed(2)}</p>
                </div>
                
                <div class="flex justify-between items-center mt-1">
                    <div class="flex items-center gap-2">
                        ${p}
                        <p class="text-xs text-gray-500 truncate max-w-[100px]">${u}</p>
                    </div>
                    <p class="text-xs text-gray-400 font-medium">${l}</p> 
                </div>
            </div>
        `}).join(""),to(e)}function to(e){const{page:t,total:a,limit:s}=x.paging,r=Math.ceil((a||0)/s);if(r<=1)return;let o='<div class="flex gap-2 justify-center mt-4 flex-wrap pb-4">';t>1&&(o+=`<button data-page="${t-1}" class="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-sm">&laquo;</button>`);for(let n=1;n<=r;n++)n===1||n===r||n>=t-2&&n<=t+2?o+=`<button data-page="${n}" class="px-3 py-1 rounded text-sm ${n===t?"bg-indigo-600 text-white font-bold":"bg-gray-200 hover:bg-gray-300"}">${n}</button>`:(n===t-3||n===t+3)&&(o+='<span class="px-2 text-gray-400">...</span>');t<r&&(o+=`<button data-page="${t+1}" class="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-sm">&raquo;</button>`),o+="</div>",e.innerHTML+=o,e.querySelectorAll("button[data-page]").forEach(n=>{n.onclick=i=>{i.stopPropagation(),x.paging.page=parseInt(n.dataset.page,10),oe()}})}function K(){const e=document.getElementById("comanda-detail-container");if(!e)return;const t=`
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
        `;return}const a=x.allComandas.find(g=>g.id===x.selectedComandaId);if(!a){e.innerHTML=`
            <div class="hidden lg:flex flex-col items-center justify-center h-full text-center text-gray-400">
                <svg class="w-16 h-16 mb-4 opacity-20" fill="currentColor" viewBox="0 0 20 20"><path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/></svg>
                <p class="text-lg font-medium">Selecione uma venda</p>
                <p class="text-sm">Toque em um item à esquerda para ver os detalhes</p>
            </div>
        `;return}const s=Vt(a),r=a.status==="completed",o=a.type==="walk-in"||a.id.startsWith("temp-"),n=o?"":`<button data-action="go-to-appointment" data-id="${a.id}" data-date="${a.startTime}" 
                class="text-indigo-600 text-xs font-semibold hover:underline flex items-center gap-1 mt-1">
             Ir para Agendamento <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
           </button>`,i=s.reduce((g,f)=>{const h=`${f.type}-${f.id||f.name}`;return g[h]||(g[h]={...f,quantity:0}),g[h].quantity+=1,g},{}),l=Object.values(i).reduce((g,f)=>g+(f.price||0)*f.quantity,0),d=v(a.clientName),c=v(a.professionalName),u=`
        <div class="grid grid-cols-2 gap-3 mobile-hidden">
            <button data-action="add-item" class="py-3.5 bg-blue-50 text-blue-700 font-bold rounded-xl hover:bg-blue-100 transition border border-blue-200">
                + ADICIONAR
            </button>
            <button data-action="checkout" class="py-3.5 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition shadow-lg shadow-green-200">
                RECEBER
            </button>
        </div>
    `,p=`
        <div class="mobile-fabs-container">
            <button data-action="add-item" class="fab-btn-secondary" title="Adicionar Item">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
            </button>
            <button data-action="checkout" class="fab-btn-primary" title="Receber / Pagar">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
            </button>
        </div>
    `;e.innerHTML=`
        ${t} 
        <div class="flex-grow overflow-y-auto p-4 pb-24"> <div class="flex justify-between items-start mb-6 border-b pb-4">
                <div>
                    <h3 class="text-xl font-bold text-gray-800 truncate max-w-[200px]">${d}</h3>
                    <p class="text-sm text-gray-500 flex items-center gap-1 mt-1">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                        ${c}
                    </p>
                    ${o?'<span class="mt-2 inline-block px-2 py-1 text-xs font-bold bg-blue-100 text-blue-700 rounded-md">Venda Avulsa</span>':n}
                </div>
                <div class="flex gap-2">
                    ${r?`<button data-action="reopen-appointment" data-id="${a.id}" class="p-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200" title="Reabrir"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg></button>`:""}
                    ${o&&!r?`<button data-action="delete-walk-in" data-id="${a.id}" class="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200" title="Excluir"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>`:""}
                </div>
            </div>

            <div id="loyalty-container" class="mb-4"></div>

            <div class="space-y-3">
                <h4 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Itens do Pedido</h4>
                ${Object.values(i).map(g=>`
                    <div class="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-100 shadow-sm ${g.isReward?"border-yellow-200 bg-yellow-50":""}">
                        <div class="flex items-center gap-3">
                            <span class="flex items-center justify-center w-8 h-8 bg-gray-100 text-gray-700 font-bold text-sm rounded-lg">
                                ${g.quantity}x
                            </span>
                            <div>
                                <p class="text-sm font-semibold text-gray-800 line-clamp-1">
                                    ${g.isReward?"🎁 ":""}${v(g.name)}
                                </p>
                                <p class="text-xs text-gray-500">
                                    ${g.isReward?'<span class="text-yellow-700 font-bold">Prémio Fidelidade</span>':`R$ ${(g.price||0).toFixed(2)} un.`}
                                </p>
                            </div>
                        </div>
                        <div class="flex items-center gap-3">
                            <span class="font-bold text-gray-900">R$ ${(g.price*g.quantity).toFixed(2)}</span>
                            ${r?"":`<button data-action="remove-item" data-item-id="${g.id}" data-item-type="${g.type}" class="text-red-400 hover:text-red-600 p-1 rounded-full hover:bg-red-50"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>`}
                        </div>
                    </div>
                `).join("")}
                
                ${Object.keys(i).length===0?'<div class="text-center py-8 text-gray-400 border-2 border-dashed rounded-lg text-sm">Nenhum item adicionado</div>':""}
            </div>
        </div>

        <footer class="p-4 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            <div class="flex flex-col items-start lg:flex-row lg:justify-between lg:items-end mb-4">
                <span class="text-sm text-gray-500 font-medium">Total a Pagar</span>
                <span class="text-4xl lg:text-3xl font-extrabold text-gray-900 mt-1 lg:mt-0">R$ ${l.toFixed(2)}</span>
            </div>
            
            ${r?`
                <div class="bg-green-50 text-green-700 text-center py-3 rounded-xl font-bold border border-green-200 flex items-center justify-center gap-2">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                    Venda Finalizada
                </div>
            `:u}
        </footer>

        ${r?"":p}
    `,r||cn(a,e.querySelector("#loyalty-container"))}async function cn(e,t){if(!t)return;const a=x.loyaltySettings;if(!a||!a.enabled)return;let s=null;if(e.clientId&&(s=x.clients.find(n=>n.id===e.clientId)),s||(s=x.clients.find(n=>n.name===e.clientName)),!s||s.loyaltyPoints===void 0)try{if(e.clientId)s=await(void 0)(e.clientId);else{const n=await He(m.establishmentId,e.clientName);s=n.find(i=>i.name===e.clientName)||n[0]}}catch(n){console.error("[Fidelidade] Erro ao buscar cliente",n);return}if(!s||!s.loyaltyPoints)return;const o=(a.tiers||a.rewards||[]).filter(n=>{const i=n.costPoints||n.points||0;return s.loyaltyPoints>=i});if(o.length>0){const n=document.createElement("div");n.className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl p-4 shadow-sm flex justify-between items-center",n.innerHTML=`
            <div class="flex items-center gap-3">
                <div class="bg-yellow-100 p-2 rounded-full text-yellow-600">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                </div>
                <div>
                    <p class="text-sm font-bold text-yellow-800">Prémio Disponível!</p>
                    <p class="text-xs text-yellow-700">Saldo: <strong>${s.loyaltyPoints} pts</strong></p>
                </div>
            </div>
        `;const i=document.createElement("button");i.innerText="Resgatar",i.className="text-xs font-bold bg-yellow-500 text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-600 transition-colors",i.onclick=()=>un(o),n.appendChild(i),t.innerHTML="",t.appendChild(n)}}function un(e,t){const a=`
        <div class="space-y-4">
            <p class="text-sm text-gray-600 mb-4">O cliente possui pontos suficientes para resgatar os seguintes itens:</p>
            <div class="space-y-2 max-h-96 overflow-y-auto">
                ${e.map(o=>{const n=o.costPoints||o.points||0,i=o.name||o.reward;return`
                    <button data-action="select-reward" data-reward-id="${o.id||i}" class="w-full flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:border-yellow-400 hover:bg-yellow-50 transition-all group">
                        <div class="text-left">
                            <p class="font-bold text-gray-800 group-hover:text-yellow-700">${v(i)}</p>
                            <p class="text-xs text-gray-500">Custo: ${n} pontos</p>
                        </div>
                        <span class="text-sm font-bold text-green-600 bg-green-100 px-3 py-1 rounded-full">Grátis</span>
                    </button>
                `}).join("")}
            </div>
        </div>
    `,{modalElement:s,close:r}=_({title:"🎁 Resgatar Prémio",contentHTML:a,maxWidth:"max-w-md"});s.addEventListener("click",o=>{const n=o.target.closest('[data-action="select-reward"]');if(n){const i=n.dataset.rewardId,l=e.find(d=>d.id&&d.id==i||(d.name||d.reward)==i);l&&(mn(l),r())}})}async function mn(e,t){const a=e.costPoints||e.points||0,s=e.name||e.reward,r={id:e.serviceId||e.productId||`reward-${Date.now()}`,name:`${s}`,price:0,type:e.serviceId?"service":"product",isReward:!0,pointsCost:a};await Xo(r,1)}function pn(){_({title:"Cadastrar Novo Cliente",contentHTML:`
        <form id="comandas_clientRegistrationForm" class="flex flex-col h-full">
            <div class="flex-1 overflow-y-auto p-5 space-y-6" style="max-height: 80vh;">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label for="regClientName" class="block text-sm font-medium text-gray-700">Nome</label>
                        <input type="text" id="regClientName" required class="mt-1 block w-full p-3 rounded-lg border-gray-300 shadow-sm">
                    </div>
                    <div>
                        <label for="regClientPhone" class="block text-sm font-medium text-gray-700">Telefone (ID)</label>
                        <input type="tel" id="regClientPhone" required class="mt-1 block w-full p-3 rounded-lg border-gray-300 shadow-sm">
                        <p class="text-xs text-gray-400 mt-1">Use apenas números.</p>
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
    `,maxWidth:"max-w-2xl"});const t=document.getElementById("comandas_clientRegistrationForm");t&&t.addEventListener("submit",gn)}async function gn(e){e.preventDefault();const t=document.getElementById("comandas_clientRegistrationForm");if(!t)return;const a=t.querySelector('button[type="submit"]'),s=t.querySelector("#regClientName"),n=t.querySelector("#regClientPhone").value.trim().replace(/\D/g,""),i={establishmentId:m.establishmentId,name:s.value.trim(),email:t.querySelector("#regClientEmail").value.trim()||null,phone:n,dob:`${t.querySelector("#regClientDobDay").value.trim()}/${t.querySelector("#regClientDobMonth").value.trim()}`,notes:t.querySelector("#regClientNotes").value.trim()||null};if(!i.name||!n)return b("Erro de Validação","Nome e Telefone (apenas números) são obrigatórios.","error");a.disabled=!0,a.textContent="Verificando...";try{const l=await(void 0)(m.establishmentId,n);if(l)b("Atenção",`Cliente já cadastrado: ${l.name}. Selecionando existente...`,"info"),x.clients.find(c=>c.id===l.id)||x.clients.push(l),document.getElementById("genericModal").style.display="none",ua(l.id);else{a.textContent="A salvar...";const d=await(void 0)(i);x.clients.push({id:d.id,...i}),b("Cliente cadastrado com sucesso!","success"),document.getElementById("genericModal").style.display="none",ua(d.id)}}catch(l){b(`Erro ao processar: ${l.message}`,"error")}finally{a&&(a.disabled=!1,a.textContent="Salvar Cliente")}}function bn(){if(!x.isCashierOpen){b("Caixa Fechado","Abra o caixa antes de adicionar itens.","error");return}const{modalElement:e,close:t}=_({title:"Adicionar Item à Comanda",contentHTML:'<div id="add-item-content"></div>',maxWidth:"max-w-4xl"}),a=()=>{let r="";const o=e.querySelector("#add-item-content"),n={service:'<svg class="w-6 h-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v4.512a9.04 9.04 0 00-3 5.012M12 12a9.04 9.04 0 01-3-5.012V5l-1-1z" /></svg>',product:'<svg class="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>',package:'<svg class="w-6 h-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-14L4 7m8 4v10M4 7v10l8 4" /></svg>'},i=()=>{const l=r.toLowerCase(),d=u=>u.filter(p=>p.name.toLowerCase().includes(l)),c={"modal-service-list":{items:d(x.catalog.services),type:"service"},"modal-product-list":{items:d(x.catalog.products),type:"product"},"modal-package-list":{items:d(x.catalog.packages),type:"package"}};for(const[u,{items:p,type:g}]of Object.entries(c)){const f=o.querySelector(`#${u}`);f&&(f.innerHTML=p.map(h=>`
                        <button data-action="select-item-for-quantity" data-item-type="${g}" data-item-id="${h.id}" class="flex items-center gap-3 w-full p-3 bg-white border rounded-lg hover:bg-gray-50 transition">
                            <div class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gray-100">${n[g]}</div>
                            <span class="flex-grow text-left min-w-0 truncate">${v(h.name)}</span>
                            <span class="font-semibold flex-shrink-0">R$ ${h.price.toFixed(2)}</span>
                        </button>
                    `).join("")||'<p class="text-xs text-gray-400 text-center p-4">Nenhum item.</p>')}};o.innerHTML=`
            <input type="search" id="item-search-input" placeholder="Pesquisar por nome..." class="w-full p-3 mb-4 border rounded-lg">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div><h4 class="font-semibold mb-2 text-center text-indigo-600">Serviços</h4><div id="modal-service-list" class="space-y-2 max-h-96 overflow-y-auto"></div></div>
                <div><h4 class="font-semibold mb-2 text-center text-green-600">Produtos</h4><div id="modal-product-list" class="space-y-2 max-h-96 overflow-y-auto"></div></div>
                <div><h4 class="font-semibold mb-2 text-center text-purple-600">Pacotes</h4><div id="modal-package-list" class="space-y-2 max-h-96 overflow-y-auto"></div></div>
            </div>`,i(),o.querySelector("#item-search-input").addEventListener("input",l=>{r=l.target.value,i()})},s=r=>{let o=1;const n=e.querySelector("#add-item-content"),i=()=>{document.getElementById("quantity-display").textContent=o,document.getElementById("quantity-minus-btn").disabled=o<=1};n.innerHTML=`
            <div class="text-center p-8 relative">
                <button data-action="back-to-catalog" class="absolute top-5 left-5 text-gray-600 hover:text-gray-900">&larr; Voltar</button>
                <h3 class="font-bold text-2xl text-gray-800">${v(r.name)}</h3>
                <p class="text-lg text-gray-500">R$ ${r.price.toFixed(2)}</p>
                <div class="my-8 flex items-center justify-center gap-4">
                    <button id="quantity-minus-btn" class="w-12 h-12 rounded-full bg-gray-200 text-3xl font-bold text-gray-600 hover:bg-gray-300">-</button>
                    <span id="quantity-display" class="text-4xl font-bold w-20 text-center">${o}</span>
                    <button id="quantity-plus-btn" class="w-12 h-12 rounded-full bg-gray-200 text-3xl font-bold text-gray-600 hover:bg-gray-300">+</button>
                </div>
                <button data-action="confirm-add-item" class="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700">Adicionar à Comanda</button>
            </div>
        `,document.getElementById("quantity-minus-btn").onclick=()=>{o>1&&(o--,i())},document.getElementById("quantity-plus-btn").onclick=()=>{o++,i()},document.querySelector('[data-action="confirm-add-item"]').onclick=async()=>{await Xo(r,o),t()}};e.addEventListener("click",r=>{const o=r.target.closest('[data-action="select-item-for-quantity"]'),n=r.target.closest('[data-action="back-to-catalog"]');if(o){const{itemType:i,itemId:l}=o.dataset,c=(x.catalog[i+"s"]||[]).find(u=>u.id===l);c&&s({...c,type:i})}else n&&a()}),a()}async function ua(e=null){if(!x.isCashierOpen){b("Caixa Fechado","Abra o caixa antes de criar uma nova venda.","error");return}if(!x.clients||x.clients.length===0)try{x.clients=await He(m.establishmentId)}catch{b("Erro","Não foi possível carregar dados de clientes.","error");return}if(!m.professionals||m.professionals.length===0)try{m.professionals=await X(m.establishmentId)}catch{b("Erro","Não foi possível carregar dados de profissionais.","error");return}const t=x.clients.map(n=>{const i=n.id===e?"selected":"";return`<option value="${n.id}" ${i}>${v(n.name)} - ${v(n.phone)}</option>`}).join(""),a=m.professionals.map(n=>`<option value="${n.id}">${v(n.name)}</option>`).join(""),s=`
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
    `,{modalElement:r}=_({title:"Nova Venda Avulsa",contentHTML:s,maxWidth:"max-w-md"});r.querySelector("#new-sale-form").addEventListener("submit",kn);const o=r.querySelector('[data-action="new-client-from-sale"]');o&&o.addEventListener("click",n=>{n.preventDefault(),r.style.display="none",pn()})}function fn(){if(!x.isCashierOpen){b("Caixa Fechado","Abra o caixa antes de finalizar pagamentos.","error");return}const e=x.allComandas.find(u=>u.id===x.selectedComandaId);if(!e)return;const t=Vt(e),a=new Set,s=[];for(const u of t){if(u.type==="service"&&u.id){if(a.has(u.id))continue;a.add(u.id)}s.push(u)}const r=s.reduce((u,p)=>u+(p.price||0),0);let o=[],n={remainingAmount:r,selectedMethod:"dinheiro",installments:1,amountReceived:""};const i=()=>{const u=document.getElementById("payment-list"),p=document.getElementById("remaining-amount"),g=document.getElementById("finalize-checkout-btn"),f=document.getElementById("change-container"),h=document.getElementById("installments-container"),y=document.getElementById("payment-value"),S=document.getElementById("payment-controls"),I=o.reduce((k,C)=>k+C.value,0);n.remainingAmount=r-I,u.innerHTML=o.map((k,C)=>`
            <div class="flex justify-between items-center bg-gray-100 p-2 rounded-md animate-fade-in-fast">
                <span class="font-medium text-sm">${k.method.charAt(0).toUpperCase()+k.method.slice(1)} ${k.installments>1?`(${k.installments}x)`:""}</span>
                <div class="flex items-center gap-2">
                    <span class="font-semibold">R$ ${k.value.toFixed(2)}</span>
                    <button data-action="remove-payment" data-payment-index="${C}" class="text-red-500 font-bold">&times;</button>
                </div>
            </div>`).join(""),n.remainingAmount<=.001?(p.textContent="Total Pago!",p.className="text-lg font-bold text-center mb-4 text-green-600",y.value="",g.disabled=!1,S&&(S.style.display="none")):(p.textContent=`Faltam: R$ ${n.remainingAmount.toFixed(2)}`,p.className="text-lg font-bold text-center mb-4 text-red-600",y.value=n.remainingAmount.toFixed(2),g.disabled=!0,S&&(S.style.display="block")),document.querySelectorAll(".payment-method-btn").forEach(k=>{k.classList.toggle("ring-2",k.dataset.method===n.selectedMethod),k.classList.toggle("ring-offset-2",k.dataset.method===n.selectedMethod)}),h.style.display=["credito","crediario"].includes(n.selectedMethod)?"block":"none",f.style.display=n.selectedMethod==="dinheiro"&&n.remainingAmount>0?"block":"none";const $=parseFloat(n.amountReceived)-n.remainingAmount;document.getElementById("change-value").textContent=`R$ ${$>0?$.toFixed(2):"0.00"}`},l=()=>{const u=document.getElementById("payment-value");let p=parseFloat(u.value);if(isNaN(p)||p<=0){b("Valor Inválido","Insira um valor de pagamento válido e maior que zero.","error");return}if(p>n.remainingAmount+.001){b("Valor Inválido","O valor excede o saldo restante.","error");return}const g={method:n.selectedMethod,value:p};["credito","crediario"].includes(n.selectedMethod)&&n.installments>1&&(g.installments=n.installments),o.push(g),n.selectedMethod="dinheiro",n.installments=1,document.getElementById("installments-select").value=1,i()},d=`
        <div class="text-center mb-4">
            <p class="text-lg text-gray-600">Valor Total</p>
            <p class="text-4xl font-bold text-gray-800 my-2">R$ ${r.toFixed(2)}</p>
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
            <div id="installments-container" class="hidden"><label class="text-sm font-medium">Parcelas</label><select id="installments-select" class="w-full p-2 border rounded-md bg-white mt-1">${Array.from({length:12},(u,p)=>`<option value="${p+1}">${p+1}x</option>`).join("")}</select></div>
            <div class="flex items-end gap-2">
                <div class="flex-grow"><label class="text-sm font-medium">Valor a Adicionar</label><input type="number" step="0.01" id="payment-value" class="w-full p-2 border rounded-md text-lg font-bold"></div>
                <button id="add-payment-btn" class="py-2 px-4 bg-gray-700 text-white font-semibold rounded-md hover:bg-gray-800">Adicionar</button>
            </div>
            <div id="change-container" class="hidden mt-2 p-3 bg-blue-50 rounded-lg"><label class="text-sm">Valor Recebido</label><input type="number" id="amount-received" class="w-full p-2 border rounded-md text-lg" /><p class="flex justify-between mt-2 font-semibold"><span>Troco:</span><strong id="change-value" class="text-blue-600">R$ 0.00</strong></p></div>
        </div>
        <div class="mt-6 pt-4 border-t"><button id="finalize-checkout-btn" class="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 disabled:bg-gray-400" disabled>Finalizar</button></div>
    `,{modalElement:c}=_({title:"Finalizar Pagamento",contentHTML:d,maxWidth:"max-w-md"});document.getElementById("payment-value").value=n.remainingAmount.toFixed(2),c.addEventListener("click",u=>{const p=u.target.closest(".payment-method-btn");p&&(n.selectedMethod=p.dataset.method,n.installments=1,document.getElementById("installments-select").value=1,i()),u.target.closest("#add-payment-btn")&&l(),u.target.closest('[data-action="remove-payment"]')&&(o.splice(parseInt(u.target.closest('[data-action="remove-payment"]').dataset.paymentIndex,10),1),i()),u.target.closest("#finalize-checkout-btn")&&wn(e,r,o)}),c.addEventListener("change",u=>{u.target.id==="installments-select"&&(n.installments=parseInt(u.target.value,10))}),c.addEventListener("input",u=>{u.target.id==="amount-received"&&(n.amountReceived=u.target.value,i())}),i()}async function vn(){const e=`
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
    `,{modalElement:t}=_({title:"Abrir Caixa",contentHTML:e,maxWidth:"max-w-md"});t.querySelector("#open-cashier-form").addEventListener("submit",async a=>{a.preventDefault();const s=document.getElementById("initial-amount"),r=s.value.trim(),o=document.getElementById("cashier-notes").value.trim(),n=parseFloat(r);if(r===""||isNaN(n)||n<0){b("Valor Inválido","Por favor, insira um valor inicial válido (maior ou igual a R$ 0,00).","error"),s.focus();return}try{const i={establishmentId:m.establishmentId,initialAmount:parseFloat(n.toFixed(2))};o&&(i.notes=o);const l=await Kr(i);x.isCashierOpen=!0,x.activeCashierSessionId=l.id,await Ta(),document.getElementById("genericModal").style.display="none",b("Sucesso!",`Caixa aberto com valor inicial de R$ ${n.toFixed(2)}`,"success")}catch(i){b("Erro",`Não foi possível abrir o caixa: ${i.message}`,"error")}})}async function hn(){const e=x.activeCashierSessionId;if(e)try{const t=await an(e),a=`
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
        `,{modalElement:s}=_({title:"Fechar Caixa",contentHTML:a,maxWidth:"max-w-md"});s.querySelector("#close-cashier-form").addEventListener("submit",async r=>{r.preventDefault();const o=parseFloat(document.getElementById("final-amount").value);if(isNaN(o)||o<0){b("Valor Inválido","Insira um valor final válido.","error");return}try{await en(e,o),x.isCashierOpen=!1,x.activeCashierSessionId=null,document.getElementById("genericModal").style.display="none",await Ta(),b("Sucesso!","Caixa fechado com sucesso!","success")}catch(n){b("Erro",`Não foi possível fechar o caixa: ${n.message}`,"error")}})}catch(t){b("Erro",`Não foi possível carregar o relatório de fecho: ${t.message}`,"error")}}async function xn(e){x.activeFilter!==e&&(x.activeFilter=e,x.paging.page=1,document.querySelectorAll(".filter-btn").forEach(t=>t.classList.remove("bg-white","text-indigo-600","shadow")),document.querySelector(`[data-filter="${e}"]`).classList.add("bg-white","text-indigo-600","shadow"),document.getElementById("finalizadas-datepicker").classList.toggle("hidden",e!=="finalizadas"),he(),await oe(),x.selectedComandaId=null,K())}function ma(e){x.selectedComandaId=e,me(),nn(),K()}async function Xo(e,t){const a=x.allComandas.find(r=>r.id===x.selectedComandaId);if(!a)return;const s=Array(t).fill(0).map(()=>({id:e.id,name:e.name,price:e.price,type:e.type,isReward:e.isReward||!1,pointsCost:e.pointsCost||0}));if(a.comandaItems=a.comandaItems||[],a.comandaItems.push(...s),a.type==="walk-in"&&a.id.startsWith("temp-")){b("Sucesso",`${t}x ${e.name} adicionado(s)!`,"success"),K(),me();return}try{await Sa(a.id,a),b("Sucesso",`${t}x ${e.name} adicionado(s)!`,"success"),K(),me()}catch(r){b("Erro",`Não foi possível adicionar o item: ${r.message}`,"error"),a.comandaItems.splice(a.comandaItems.length-t,t)}}async function yn(e,t){const a=x.allComandas.find(o=>o.id===x.selectedComandaId);if(!a)return;let s=!1,r=(a.comandaItems||[]).findIndex(o=>o.id===e&&o.type===t);if(r>-1)a.comandaItems.splice(r,1),s=!0;else{let o=(a.services||[]).findIndex(n=>n.id===e);if(o>-1)a.services.splice(o,1),s=!0;else{let n=(a.items||[]).findIndex(i=>i.id===e&&i.type===t);n>-1&&(a.items.splice(n,1),s=!0)}}if(s){if(a.type==="walk-in"&&a.id.startsWith("temp-")){b("Sucesso","Item removido!","success"),K(),me();return}try{await Sa(a.id,a),b("Sucesso","Item removido!","success"),K(),me()}catch(o){b("Erro",`Não foi possível remover o item: ${o.message}`,"error"),await oe()}}}async function wn(e,t,a){const s=e.type==="appointment",r=Vt(e),o=new Set,n=[];for(const c of r){if(c.type==="service"&&c.id){if(o.has(c.id))continue;o.add(c.id)}n.push(c)}let i=0;const l=x.loyaltySettings;if(l&&l.enabled)if(l.type==="visit")i=l.pointsPerVisit||1;else{const c=l.pointsPerCurrency||10;i=Math.floor(t/c)}const d={payments:a,totalAmount:t,items:n,cashierSessionId:x.activeCashierSessionId,loyaltyPointsEarned:i};try{s?await zs(e.id,d):(d.establishmentId=m.establishmentId,d.clientId=e.clientId,d.clientName=e.clientName,d.professionalId=e.professionalId,d.clientPhone=e.clientPhone,await Qr(d));let c="Venda finalizada com sucesso!";i>0&&(c+=` Cliente ganhou ${i} pontos.`),b("Sucesso!",c,"success"),document.getElementById("genericModal").style.display="none",he(),x.selectedComandaId=null,await oe()}catch(c){b("Erro no Checkout",c.message,"error")}}async function kn(e){e.preventDefault();const t=document.getElementById("new-sale-client").value,a=document.getElementById("new-sale-professional").value,s=x.clients.find(n=>n.id===t),r=m.professionals.find(n=>n.id===a);if(!s||!r){b("Erro","Selecione um cliente e um profissional válidos.","error");return}const o={id:`temp-${Date.now()}`,type:"walk-in",clientId:s.id,clientName:s.name,clientPhone:s.phone,professionalId:r.id,professionalName:r.name,startTime:new Date,status:"confirmed",services:[],comandaItems:[]};x.allComandas.unshift(o),x.selectedComandaId=o.id,document.getElementById("genericModal").style.display="none",ma(o.id)}async function oe(){const e=document.getElementById("comandas-list");e.innerHTML='<div class="loader mx-auto mt-10"></div>';const t=x.activeFilter==="finalizadas"?document.getElementById("filter-date").value:null;try{const a=await Yo();if(x.isCashierOpen=!!a,x.activeCashierSessionId=a?a.id:null,dn(),!x.isCashierOpen&&x.activeFilter==="atendimento"){me(),K();return}try{const r=await(void 0)(m.establishmentId);r&&r.loyaltyProgram&&(x.loyaltySettings=r.loyaltyProgram)}catch{console.log("Sem config de fidelidade carregada")}const s=await Yr(m.establishmentId,t,x.paging.page,x.paging.limit);if(x.allComandas=s.data||s,x.paging.total=s.total||s.length,x.catalog.services.length===0){const[r,o,n,i,l]=await Promise.all([Ee(m.establishmentId),Ft(m.establishmentId),Qo(m.establishmentId),He(m.establishmentId),X(m.establishmentId)]);x.catalog={services:r,products:o,packages:n},x.clients=i,m.professionals=l}me(),x.selectedComandaId,K()}catch(a){b("Erro de Carregamento",`Não foi possível carregar os dados: ${a.message}`,"error"),e.innerHTML=`<p class="text-red-500 p-4">${a.message}</p>`}}async function Ta(e={}){Te=document.getElementById("content");try{const t=await Yo();x.isCashierOpen=!!t,x.activeCashierSessionId=t?t.id:null}catch(t){console.error("Erro ao verificar caixa:",t),x.isCashierOpen=!1}x.selectedComandaId=e.selectedAppointmentId||null,ln(),Ce&&(Te.removeEventListener("click",Ce),Te.removeEventListener("change",Ce)),Ce=async t=>{const a=t.target.closest("[data-action], [data-filter], [data-comanda-id], [data-id]");if(t.target.id==="filter-date"&&x.activeFilter==="finalizadas"){x.paging.page=1,await oe();return}if(a){if(a.matches("[data-filter]"))xn(a.dataset.filter);else if(a.matches("[data-comanda-id]")){if(t.target.closest('[data-action="go-to-appointment"]')){t.stopPropagation();return}ma(a.dataset.comandaId)}else if(a.matches("[data-action]")){const s=a.dataset.action,r=a.dataset.id||x.selectedComandaId;switch(s){case"back-to-list":{he(),x.selectedComandaId=null,document.querySelectorAll(".comanda-card").forEach(o=>o.classList.remove("selected")),K();break}case"new-sale":ua();break;case"add-item":bn();break;case"checkout":fn();break;case"open-cashier":vn();break;case"close-cashier":await hn();break;case"view-sales-report":re("sales-report-section");break;case"remove-item":await yn(a.dataset.itemId,a.dataset.itemType);break;case"reopen-appointment":{if(await j("Reabrir Comanda","Tem certeza? O pagamento será estornado e os produtos devolvidos ao estoque."))try{await Os(r);const n=x.allComandas.findIndex(i=>i.id===r);n!==-1&&(delete x.allComandas[n].transaction,delete x.allComandas[n].cashierSessionId,delete x.allComandas[n].redeemedReward,x.allComandas[n].status="confirmed"),x.selectedComandaId=null,he(),b("Sucesso!","Comanda reaberta para edição.","success"),await oe()}catch(n){b("Erro",`Não foi possível reabrir: ${n.message}`,"error")}break}case"reopen-walk-in":{if(await j("Reabrir Venda","Tem certeza? A venda será cancelada e os produtos devolvidos ao estoque."))try{await Xr(r),b("Sucesso!","Venda revertida."),he(),x.selectedComandaId=null,await oe()}catch(n){b("Erro",`Não foi possível reabrir: ${n.message}`,"error")}break}case"go-to-appointment":{const o=a.dataset.id,n=a.dataset.date;re("agenda-section",{scrollToAppointmentId:o,targetDate:new Date(n)});break}case"delete-walk-in":{if(await j("Excluir Venda","Tem certeza que deseja excluir esta venda avulsa? O estoque dos produtos será devolvido."))if(r.startsWith("temp-"))x.allComandas=x.allComandas.filter(n=>n.id!==r),x.selectedComandaId=null,me(),K(),b("Sucesso","Venda avulsa removida.","success"),he();else try{await Zr(r),b("Sucesso","Venda avulsa excluída com sucesso.","success"),x.selectedComandaId=null,he(),await oe()}catch(n){b("Erro",`Não foi possível excluir: ${n.message}`,"error")}break}}}}},Te.addEventListener("click",Ce),Te.addEventListener("change",Ce),e.initialFilter&&(x.activeFilter=e.initialFilter==="finalizadas"?"finalizadas":"atendimento"),e.selectedAppointmentId&&(x.selectedComandaId=e.selectedAppointmentId),document.querySelectorAll(".filter-btn").forEach(t=>t.classList.remove("bg-white","text-indigo-600","shadow")),document.querySelector(`[data-filter="${x.activeFilter}"]`).classList.add("bg-white","text-indigo-600","shadow"),document.getElementById("finalizadas-datepicker").classList.toggle("hidden",x.activeFilter!=="finalizadas"),e.filterDate&&(document.getElementById("filter-date").value=new Date(e.filterDate).toISOString().split("T")[0]),await oe(),x.selectedComandaId&&ma(x.selectedComandaId)}const pa=document.getElementById("content");let Qt={};const ut=["#4f46e5","#10b981","#f59e0b","#ef4444","#8b5cf6","#ec4899","#06b6d4"],q={startDate:new Date(new Date().getFullYear(),new Date().getMonth(),1).toISOString().split("T")[0],endDate:new Date().toISOString().split("T")[0],selectedProfessional:"all",selectedCostCenter:"all",professionalsList:[],costCentersList:[],data:null,appointmentsData:[],currentTab:"dashboards"};async function Sn(){if(!window.Chart)return new Promise((e,t)=>{const a=document.createElement("script");a.src="https://cdn.jsdelivr.net/npm/chart.js",a.onload=e,a.onerror=t,document.head.appendChild(a)})}async function $n(){pa.innerHTML='<div class="flex flex-col items-center justify-center h-64"><div class="loader mb-4"></div><p class="text-gray-500">A carregar inteligência de dados...</p></div>';try{await Sn();const[e,t]=await Promise.all([X(m.establishmentId),$r(m.establishmentId).catch(()=>[])]);q.professionalsList=e||[],q.costCentersList=t||[],En(),await Zo()}catch(e){console.error("Erro no loadReportsPage:",e),pa.innerHTML=`
            <div class="flex flex-col items-center justify-center h-full text-red-500">
                <svg class="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <p>Erro ao carregar relatórios: ${v(e.message)}</p>
                <button onclick="window.location.reload()" class="mt-4 px-4 py-2 bg-gray-200 rounded text-gray-700 hover:bg-gray-300">Tentar Novamente</button>
            </div>`}}function En(){const e=q.professionalsList.map(a=>`<option value="${a.id}">${v(a.name)}</option>`).join(""),t=q.costCentersList.map(a=>`<option value="${a.id}">${v(a.name)}</option>`).join("");pa.innerHTML=`
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
    `,document.getElementById("btn-filter").onclick=In,document.querySelectorAll(".tab-btn").forEach(a=>{a.onclick=()=>{q.currentTab=a.dataset.tab,ao(),Ko()}}),ao()}function ao(){document.querySelectorAll(".tab-btn").forEach(e=>{const t=e.dataset.tab===q.currentTab;e.className=t?"tab-btn flex-1 px-4 py-2 rounded-md text-sm font-bold bg-white text-indigo-600 shadow-sm transition-all whitespace-nowrap":"tab-btn flex-1 px-4 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-200 transition-all whitespace-nowrap"})}async function In(){q.startDate=document.getElementById("report-start").value,q.endDate=document.getElementById("report-end").value,q.selectedProfessional=document.getElementById("report-prof").value,q.selectedCostCenter=document.getElementById("report-cost").value,await Zo()}async function Zo(){const e=document.getElementById("report-content");e.innerHTML='<div class="flex justify-center py-20"><div class="loader"></div></div>';try{const t=Sr(q.startDate,q.endDate,q.selectedProfessional,q.selectedCostCenter),a=q.selectedProfessional==="all"?null:q.selectedProfessional,s=new Date(q.startDate+"T00:00:00").toISOString(),r=new Date(q.endDate+"T23:59:59").toISOString(),o=Bo(m.establishmentId,s,r,a).catch(l=>[]),[n,i]=await Promise.all([t,o]);q.data=n,q.appointmentsData=Array.isArray(i)?i:[],Ko()}catch(t){console.error(t),e.innerHTML=`
            <div class="bg-red-50 border-l-4 border-red-500 p-4 rounded text-red-700 text-center">
                <p class="font-bold">Erro ao carregar dados</p>
                <p class="text-sm">${v(t.message||"Verifique sua conexão.")}</p>
            </div>`}}function Ko(){const e=document.getElementById("report-content");if(q.data)switch(q.currentTab){case"dashboards":Cn(e);break;case"appointments":Ln(e);break;case"dre":Tn(e);break}}function Cn(e){const{dreSimple:t,charts:a}=q.data,s=t||{grossRevenue:0,netProfit:0,variableCosts:0},r=q.data.totalAppointments||0,o=r>0?s.grossRevenue/r:0;e.innerHTML=`
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
    `,We("chart-monthly","bar","Receita Mensal",a.salesMonthly.labels,a.salesMonthly.data,ut[0]);const n=a.professionals.labels.map(l=>v(l));We("chart-profs","doughnut","Total Vendas",n,a.professionals.data,ut),We("chart-daily","line","Vendas Diárias",a.salesDaily.labels,a.salesDaily.data,ut[4]);const i=a.products.labels.map(l=>v(l));We("chart-products","bar","Total Vendido",i,a.products.data,ut[1])}function Ln(e){const t=q.appointmentsData,a=t.length;let s=0,r=0,o=0,n=0;const i={},l={};let d=new Date(q.startDate);const c=new Date(q.endDate);for(;d<=c;)i[d.toISOString().split("T")[0]]=0,d.setDate(d.getDate()+1);t.forEach(f=>{const h=parseFloat(f.totalAmount||f.price||0),y=(f.status||"").toLowerCase();let S=f.startTime?(f.startTime.toDate?f.startTime.toDate():new Date(f.startTime)).toISOString().split("T")[0]:"";const I=f.professionalName||"Sem Profissional";l[I]||(l[I]={name:I,count:0,value:0}),["cancelled","cancelado","no-show"].includes(y)?(r++,n+=h):(["completed","finalized","paid"].includes(y)&&s++,o+=h,S&&i.hasOwnProperty(S)&&i[S]++,l[I].count++,l[I].value+=h)});const u=Object.keys(i).sort(),p=u.map(f=>i[f]),g=Object.values(l).sort((f,h)=>h.count-f.count);e.innerHTML=`
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
                        ${g.map(f=>`
                            <tr>
                                <td class="p-3 text-gray-800 font-medium">${v(f.name)}</td>
                                <td class="p-3 text-center"><span class="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full text-xs font-bold">${f.count}</span></td>
                                <td class="p-3 text-right text-gray-600">R$ ${f.value.toLocaleString("pt-BR",{minimumFractionDigits:2})}</td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
            </div>
        </div>
    `,We("dailyApptChart","line","Agendamentos",u.map(f=>f.split("-").reverse().slice(0,2).join("/")),p,"#4f46e5")}function Tn(e){const{dreFinancial:t}=q.data,a=Object.entries(t.revenues).map(([r,o])=>`
        <tr class="text-sm text-gray-600 bg-green-50/30 hover:bg-green-50 transition-colors">
            <td class="pl-8 py-2 border-l-4 border-transparent hover:border-green-400">${v(r)}</td>
            <td class="text-right pr-6 py-2 text-green-700 font-medium">R$ ${o.toFixed(2)}</td>
            <td class="text-right pr-4 text-xs text-gray-400">${t.totalRevenues>0?(o/t.totalRevenues*100).toFixed(1):0}%</td>
        </tr>
    `).join(""),s=Object.entries(t.expenses).map(([r,o])=>`
        <tr class="text-sm text-gray-600 bg-red-50/30 hover:bg-red-50 transition-colors">
            <td class="pl-8 py-2 border-l-4 border-transparent hover:border-red-400">${v(r)}</td>
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
    `}function We(e,t,a,s,r,o){const n=document.getElementById(e);if(!n)return;const i=n.getContext("2d");Qt[e]&&Qt[e].destroy();const l={type:t,data:{labels:s,datasets:[{label:a,data:r,backgroundColor:Array.isArray(o)?o:t==="line"?"rgba(79, 70, 229, 0.1)":o,borderColor:Array.isArray(o)?"#fff":o,borderWidth:2,fill:t==="line",tension:.3,borderRadius:t==="bar"?4:0,pointBackgroundColor:"#fff",pointBorderColor:o,pointHoverBackgroundColor:o}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:t==="doughnut",position:"bottom"},tooltip:{backgroundColor:"rgba(17, 24, 39, 0.9)",padding:10,cornerRadius:8,callbacks:{label:d=>{let c=d.dataset.label||"";return c&&(c+=": "),d.parsed.y!==null?c+=new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(d.parsed.y):c+=d.raw,c}}}},scales:t==="doughnut"?{}:{y:{beginAtZero:!0,grid:{color:"#f3f4f6"},ticks:{font:{size:11}}},x:{grid:{display:!1},ticks:{font:{size:11}}}}}};Qt[e]=new Chart(i,l)}const Ut=(e,t="products")=>w(`/api/${t}/categories/${e}`),es=(e,t="products")=>w(`/api/${t}/categories`,{method:"POST",body:JSON.stringify(e)}),ts=(e,t="products")=>w(`/api/${t}/categories/${e}`,{method:"DELETE"}),Pn="audit_logs",Fe=async(e,t,a,s,r,o=null)=>{try{if(!t)return;await Lo(ue(U,Pn),{establishmentId:e,userId:t.uid,userName:t.name||t.email||"Utilizador",module:a,action:s,description:r,details:o,timestamp:new Date})}catch(n){console.error("Falha silenciosa ao registar log:",n)}},ve=document.getElementById("content");let ne=null,Qe="services",we="all";function je(){const e=V.currentUser;return e?{uid:e.uid,name:e.displayName||e.email}:{uid:"unknown",name:"Desconhecido"}}async function Bn(e){e.preventDefault();const a=e.target.closest("#categoryForm").querySelector("#categoryName"),s=a.value;if(s)try{await es({establishmentId:m.establishmentId,name:s},"services"),Fe(m.establishmentId,je(),"Categorias (Serviços)","Criou",`Criou categoria: ${s}`),a.value="",b("Sucesso","Categoria criada!","success"),await Pa(),await lt()}catch(r){b("Erro",`Não foi possível criar a categoria: ${r.message}`,"error")}}async function Dn(e){if(await j("Apagar Categoria","Tem a certeza? Os serviços nesta categoria ficarão sem categoria."))try{await ts(e,"services"),Fe(m.establishmentId,je(),"Categorias (Serviços)","Excluiu",`Excluiu uma categoria (ID: ${e})`),b("Sucesso","Categoria apagada.","success"),await Pa(),await lt()}catch{b("Erro","Não foi possível apagar a categoria.","error")}}async function Pa(){const e=document.getElementById("categoryList");if(e){e.innerHTML='<div class="loader mx-auto my-4"></div>';try{const t=await Ut(m.establishmentId,"services");m.serviceCategories=t,e.innerHTML="",t.length>0?e.innerHTML=t.map(a=>`
                <div class="flex justify-between items-center bg-gray-100 p-2 rounded">
                    <span>${v(a.name)}</span>
                    <button data-action="delete-category" data-id="${a.id}" class="text-red-500 hover:text-red-700 font-semibold text-sm">Apagar</button>
                </div>`).join(""):e.innerHTML='<p class="text-center text-gray-500">Nenhuma categoria criada.</p>'}catch{e.innerHTML='<p class="text-red-500 text-center">Erro ao carregar categorias.</p>'}}}function Mn(){_({title:"Gerir Categorias de Serviços",contentHTML:`
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
    `,maxWidth:"max-w-xl"});const t=document.getElementById("genericModal");if(t){const a=t.querySelector("#categoryForm");a&&(a.addEventListener("submit",Bn),t.addEventListener("click",s=>{const r=s.target.closest('button[data-action="delete-category"]');r&&(s.preventDefault(),Dn(r.dataset.id))}))}Pa()}async function An(e){e.preventDefault();const t=e.target.closest("#serviceModal"),a=t.querySelector("#serviceId").value,s={},r=t.querySelector('input[name="commissionType"]:checked').value;r==="custom"&&t.querySelectorAll(".professional-commission-row").forEach(n=>{const i=n.dataset.profId;if(n.querySelector('input[type="checkbox"]').checked){const d=parseFloat(n.querySelector('input[type="number"]').value);s[i]=isNaN(d)?0:d}});const o={establishmentId:m.establishmentId,name:t.querySelector("#serviceName").value,price:parseFloat(t.querySelector("#servicePrice").value),duration:parseInt(t.querySelector("#serviceDurationMinutes").value,10),bufferTime:parseInt(t.querySelector("#serviceBufferTimeMinutes").value,10)||0,categoryId:t.querySelector("#serviceCategory").value||null,commissionRate:parseFloat(t.querySelector("#serviceCommissionRate").value)||0,active:t.querySelector("#serviceStatus").value==="true",photo:t.querySelector("#servicePhotoBase64").value,notes:t.querySelector("#serviceNotes").value,commissionType:r,professionalCommissions:s};try{a?(await tr(a,o),Fe(m.establishmentId,je(),"Serviços","Editou",`Editou o serviço: ${o.name}`)):(await Ao(o),Fe(m.establishmentId,je(),"Serviços","Criou",`Criou novo serviço: ${o.name}`)),document.getElementById("serviceModal").style.display="none",b("Sucesso",`Serviço ${a?"atualizado":"adicionado"} com sucesso!`,"success"),await lt()}catch(n){b("Erro",n.message,"error")}}function oo(e=null){const t=document.getElementById("serviceModal"),a=m.serviceCategories||[],s=e?.duration||0,r=e?.bufferTime||0,o=v(e?.name||""),n=v(e?.notes||""),i=e?o:"Novo Serviço",l=a.map(k=>`<option value="${k.id}" ${e?.categoryId===k.id?"selected":""}>${v(k.name)}</option>`).join("");t.innerHTML=`
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
    </div>`,t.style.display="flex",t.addEventListener("click",async k=>{const C=k.target.closest("button[data-action]");if(!C)return;const F=C.dataset.action,O=C.dataset.id;if(F==="close-modal"&&(t.style.display="none"),F==="delete-service"){if(!O)return;if(t.style.display="none",await j("Apagar Serviço","Tem a certeza que deseja apagar este serviço?"))try{const T=m.services.find(N=>N.id===O)?.name||"Desconhecido";await ar(O),Fe(m.establishmentId,je(),"Serviços","Excluiu",`Excluiu o serviço: ${T}`),b("Sucesso","Serviço apagado com sucesso!","success"),await lt()}catch(T){b("Erro",`Não foi possível apagar o serviço: ${T.message}`,"error")}else t.style.display="flex"}});const d=t.querySelectorAll(".tab-btn"),c=t.querySelectorAll(".tab-content");d.forEach(k=>{k.addEventListener("click",()=>{d.forEach(C=>{C.classList.remove("border-indigo-500","text-indigo-600"),C.classList.add("border-transparent","text-gray-500","hover:text-gray-700","hover:border-gray-300")}),k.classList.add("border-indigo-500","text-indigo-600"),k.classList.remove("border-transparent","text-gray-500","hover:text-gray-700","hover:border-gray-300"),c.forEach(C=>C.classList.add("hidden")),document.getElementById(`tab-content-${k.dataset.tab}`).classList.remove("hidden")})});const u=t.querySelectorAll('input[name="commissionType"]'),p=document.getElementById("defaultCommissionRateContainer"),g=document.getElementById("professionalCommissionsContainer");function f(){const k=t.querySelector('input[name="commissionType"]:checked').value;p&&(p.style.display=k==="default"?"block":"none"),g&&(g.style.display=k==="custom"?"block":"none")}u.forEach(k=>k.addEventListener("change",f));const h=document.getElementById("professionalCommissionsList");h&&(h.innerHTML=(m.professionals||[]).map(k=>{const C=e?.professionalCommissions?.[k.id]!==void 0,F=e?.professionalCommissions?.[k.id]||0;return`
                <div class="professional-commission-row flex items-center justify-between p-2 rounded-md ${C?"bg-blue-50":""}" data-prof-id="${k.id}">
                    <label class="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" ${C?"checked":""} class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                        <img src="${k.photo||`https://placehold.co/40x40/E2E8F0/4A5568?text=${v(k.name.charAt(0))}`}" class="w-8 h-8 rounded-full object-cover">
                        <span class="text-sm font-medium">${v(k.name)}</span>
                    </label>
                    <div class="flex items-center gap-1">
                        <input type="number" value="${F}" class="w-20 p-1 border rounded-md text-sm text-center" ${C?"":"disabled"}>
                        <span class="text-sm font-semibold">%</span>
                    </div>
                </div>
            `}).join(""),h.querySelectorAll('input[type="checkbox"]').forEach(k=>{k.addEventListener("change",C=>{const F=C.target.closest(".professional-commission-row");F.querySelector('input[type="number"]').disabled=!C.target.checked,F.classList.toggle("bg-blue-50",C.target.checked)})})),f();const y=t.querySelector("#serviceForm"),S=t.querySelector("#servicePhotoInput"),I=t.querySelector("#servicePhotoPreview"),$=t.querySelector("#servicePhotoBase64");t.querySelector("#servicePhotoButton").addEventListener("click",()=>S.click()),S.onchange=async()=>{const k=S.files[0];if(k){I.src="https://placehold.co/128x128/E2E8F0/4A5568?text=...";try{const C=await Vo(k,800,800,.8),O=C.length*3/4,L=1e3*1024;if(O>L)throw new Error("A imagem é muito grande mesmo após a compressão.");I.src=C,$.value=C}catch(C){console.error("Erro ao processar imagem:",C),b("Erro de Imagem",C.message||"Não foi possível processar a imagem.","error"),I.src=e?.photo||"https://placehold.co/128x128/E2E8F0/4A5568?text=Foto",$.value=e?.photo||"",S.value=""}}},y.addEventListener("submit",An)}function Pe(){const e=document.getElementById("servicesList");if(!e)return;const t=document.getElementById("serviceSearchInput")?.value.toLowerCase()||"",a=document.getElementById("serviceCategoryFilter")?.value||"all",s=new Map((m.serviceCategories||[]).map(o=>[o.id,o.name]));let r=(m.services||[]).filter(Boolean);if(we!=="all"){const o=we==="active";r=r.filter(n=>n.active!==!1===o)}r=r.filter(o=>{const n=o.name.toLowerCase().includes(t),i=a==="all"||o.categoryId===a;return n&&i}),e.innerHTML="",r.length>0?r.forEach(o=>{const n=document.createElement("div"),i=JSON.stringify(o).replace(/'/g,"&apos;");n.className=`service-card bg-white rounded-lg shadow-md flex overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-lg hover:bg-gray-50 ${o.active!==!1?"opacity-100":"opacity-50 bg-gray-100"} sm:flex-col`,n.dataset.action="edit-service",n.dataset.service=i;const l=v(o.name),d=v(s.get(o.categoryId)||"N/A"),c=o.photo||`https://placehold.co/200x200/E2E8F0/4A5568?text=${encodeURIComponent(o.name.charAt(0))}`;n.innerHTML=`
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
                </div>`,e.appendChild(n)}):e.innerHTML='<p class="col-span-full text-center text-gray-500 py-10">Nenhum serviço encontrado.</p>'}function Ba(){const e={active:0,inactive:0,total:0},t=(m.services||[]).filter(Boolean);t.forEach(n=>{n.active===!1?e.inactive++:e.active++}),e.total=t.length;const a=document.getElementById("indicator-total"),s=document.getElementById("indicator-active"),r=document.getElementById("indicator-inactive"),o=document.getElementById("indicator-popular");a&&(a.textContent=e.total),s&&(s.textContent=e.active),r&&(r.textContent=e.inactive),o&&(m.mostPopularService&&m.mostPopularService.name!=="N/A"?(o.textContent=v(m.mostPopularService.name),o.closest(".indicator-card").title=`${m.mostPopularService.name} (${m.mostPopularService.count} agendamentos)`):(o.textContent="N/A",o.closest(".indicator-card").title="Nenhum serviço agendado ainda"))}function Nn(){const e=document.getElementById("services-content-container");e.innerHTML=`
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
    `;const t=document.getElementById("serviceCategoryFilter");t&&(t.innerHTML='<option value="all">Todas as categorias</option>',(m.serviceCategories||[]).forEach(a=>t.innerHTML+=`<option value="${a.id}">${v(a.name)}</option>`)),Ba(),Pe()}function qn(){const e=document.getElementById("services-content-container");e.innerHTML=`
        <div class="p-8 text-center">
            <h3 class="text-xl font-bold text-gray-700">Relatórios de Serviços</h3>
            <p class="text-gray-500 mt-2">Em breve, aqui poderás ver relatórios detalhados sobre os teus serviços mais rentáveis, mais agendados e muito mais.</p>
        </div>
    `}async function lt(){const e=document.getElementById("services-content-container");if(e){const t=e.querySelector(".loader");t&&(t.style.display="block")}try{const[t,a,s,r]=await Promise.all([Ee(m.establishmentId),X(m.establishmentId),Ut(m.establishmentId,"services"),sr(m.establishmentId)]);m.services=(t||[]).filter(Boolean),m.professionals=(a||[]).filter(Boolean),m.serviceCategories=(s||[]).filter(Boolean),m.mostPopularService=r||{name:"N/A",count:0},m.services.forEach(o=>{o.active===void 0&&(o.active=!0)}),as(Qe)}catch(t){e&&(e.innerHTML='<p class="text-red-500 col-span-full text-center py-10">Erro ao carregar dados. Verifique a conexão com o servidor.</p>'),b("Erro",`Não foi possível carregar os dados: ${t.message}`,"error")}}function as(e){if(document.getElementById("services-content-container")){if(Qe===e&&document.getElementById("services-content-container").children.length>1){Qe==="services"&&(Ba(),Pe());return}Qe=e,we="all",document.querySelectorAll("#services-tabs button.tab-button").forEach(t=>{const a=t.dataset.view===e;t.classList.toggle("border-indigo-500",a),t.classList.toggle("text-indigo-600",a),t.classList.toggle("border-transparent",!a),t.classList.toggle("text-gray-500",!a)}),e==="services"?Nn():e==="reports"&&qn()}}function Rn(){ne&&(ve.removeEventListener("click",ne),ve.removeEventListener("input",ne),ve.removeEventListener("change",ne)),ne=async e=>{const t=e.target;if(t.closest('[data-action="toggle-service-status"]')){e.stopPropagation();const r=t.closest('[data-action="toggle-service-status"]'),o=r.dataset.id,n=r.checked;try{await or(o,n);const i=m.services.findIndex(l=>l.id===o);i>-1&&(m.services[i].active=n),Fe(m.establishmentId,je(),"Serviços","Atualizou Status",`Alterou status do serviço (ID: ${o}) para ${n?"Ativo":"Inativo"}`),Pe(),Ba()}catch(i){b("Erro",`Não foi possível atualizar o status: ${i.message}`,"error"),r.checked=!n,Pe()}return}const a=t.closest("button[data-action], button[data-view], .indicator-card[data-action], .service-card[data-action]");if(t.id==="serviceSearchInput"||t.id==="serviceCategoryFilter"){Pe();return}if(!a)return;if(a.hasAttribute("data-view")){as(a.dataset.view);return}switch(a.dataset.action){case"new-service":oo();break;case"edit-service":const r=JSON.parse(a.dataset.service);oo(r);break;case"manage-categories":Mn();break;case"filter-service":const o=a.dataset.filterType;if(o==="popular")return;we=o==="total"?"all":o,document.querySelectorAll('.indicator-card[data-action="filter-service"]').forEach(n=>{const i=n.dataset.filterType,d=i===we||i==="total"&&we==="all";n.classList.toggle("ring-2",d),n.classList.toggle("ring-indigo-500",d),n.classList.toggle("shadow-lg",d)}),Pe();break}},ve.addEventListener("click",ne),ve.addEventListener("input",ne),ve.addEventListener("change",ne)}async function Fn(){ve.innerHTML=`
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
        </section>`,Rn();try{(!m.professionals||m.professionals.length===0)&&(m.professionals=await X(m.establishmentId)||[])}catch(e){console.error("Falha ao carregar profissionais:",e),b("Erro","Não foi possível carregar a lista de profissionais.","error"),m.professionals=[]}Qe="services",we="all",await lt()}const _t="suppliers",Da="purchases",os="financial_payables",Ma=async e=>{try{const t=qt(ue(U,_t),ot("establishmentId","==",e)),a=await ka(t),s=[];return a.forEach(r=>{s.push({id:r.id,...r.data()})}),s}catch(t){throw console.error("Erro ao buscar fornecedores:",t),t}},jn=async e=>{try{return{id:(await Lo(ue(U,_t),e)).id,...e}}catch(t){throw console.error("Erro ao criar fornecedor:",t),t}},Hn=async(e,t)=>{try{const a=ce(U,_t,e);return await wa(a,t),{id:e,...t}}catch(a){throw console.error("Erro ao atualizar fornecedor:",a),a}},On=async e=>{try{const t=ce(U,_t,e);return await Ps(t),!0}catch(t){throw console.error("Erro ao excluir fornecedor:",t),t}},zn=async(e,t=null)=>{try{const a=Po(U),s=ce(ue(U,Da)),r={...e,createdAt:za()};if(a.set(s,r),t&&t.defaultNatureId&&t.defaultCostCenterId){const o=ce(ue(U,os)),n=new Date().toISOString().split("T")[0],i={establishmentId:e.establishmentId,description:`Compra - ${e.supplierName}`,amount:parseFloat(e.totalAmount),dueDate:n,naturezaId:t.defaultNatureId,centroDeCustoId:t.defaultCostCenterId,notes:`Gerado automaticamente pelo Pedido de Compra. Itens: ${e.items.length}`,status:"pending",paymentDate:null,purchaseId:s.id,createdAt:za()};a.set(o,i)}return await a.commit(),{id:s.id,...r}}catch(a){throw console.error("Erro ao registrar compra com integração:",a),a}},Vn=async(e,t)=>{try{const a=Po(U),s=ce(U,Da,e);a.delete(s);const r=qt(ue(U,os),ot("purchaseId","==",e),ot("establishmentId","==",t));return(await ka(r)).forEach(n=>{a.delete(n.ref)}),await a.commit(),!0}catch(a){throw console.error("Erro ao excluir compra e financeiro:",a),a}},Un=async e=>{try{const t=qt(ue(U,Da),ot("establishmentId","==",e),To("createdAt","desc")),a=await ka(t),s=[];return a.forEach(r=>{s.push({id:r.id,...r.data()})}),s}catch(t){throw console.error("Erro ao buscar histórico de compras:",t),t}},ge=document.getElementById("content");let ie=null,Xe="products",ae="all";async function _n(e){e.preventDefault();const a=e.target.closest("#categoryForm").querySelector("#categoryName"),s=a.value;if(s)try{await es({establishmentId:m.establishmentId,name:s},"products"),a.value="",b("Sucesso","Categoria de produto criada!","success"),await Aa(),await dt()}catch(r){b("Erro",`Não foi possível criar a categoria: ${r.message}`,"error")}}async function Jn(e){if(await j("Apagar Categoria","Tem a certeza? Os produtos nesta categoria ficarão sem categoria."))try{await ts(e,"products"),b("Sucesso","Categoria de produto apagada.","success"),await Aa(),await dt()}catch{b("Erro","Não foi possível apagar a categoria.","error")}}async function Aa(){const e=document.getElementById("categoryList");if(e){e.innerHTML='<div class="loader mx-auto my-4"></div>';try{const t=await Ut(m.establishmentId,"products");m.categories=t,e.innerHTML="",t.length>0?e.innerHTML=t.map(a=>`
                <div class="flex justify-between items-center bg-gray-100 p-2 rounded">
                    <span>${v(a.name)}</span>
                    <button data-action="delete-category" data-id="${a.id}" class="text-red-500 hover:text-red-700 font-semibold text-sm">Apagar</button>
                </div>`).join(""):e.innerHTML='<p class="text-center text-gray-500">Nenhuma categoria encontrada.</p>'}catch{e.innerHTML='<p class="text-red-500 text-center">Erro ao carregar categorias.</p>'}}}function Wn(){_({title:"Gerir Categorias de Produtos",contentHTML:`
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
    `,maxWidth:"max-w-xl"});const t=document.getElementById("genericModal");if(t){const a=t.querySelector("#categoryForm");a&&(a.addEventListener("submit",_n),t.addEventListener("click",s=>{const r=s.target.closest('button[data-action="delete-category"]');r&&Jn(r.dataset.id)}))}Aa()}async function Gn(e){if(!e)return;if(await j("Apagar Produto","Tem a certeza que deseja apagar este produto? Esta ação não pode ser revertida."))try{await nr(e),b("Sucesso","Produto apagado com sucesso!","success"),await dt()}catch(a){b("Erro",`Não foi possível apagar o produto: ${a.message}`,"error")}}async function Yn(e){const t=e.querySelector("#productId").value,a=parseInt(e.querySelector("#productCurrentStock").value),s=parseInt(e.querySelector("#productMinStock").value),r=parseInt(e.querySelector("#productMaxStock").value),o=e.querySelectorAll("#selectedSuppliersList .selected-supplier-item"),n=Array.from(o).map(l=>l.dataset.id),i={establishmentId:m.establishmentId,name:e.querySelector("#productName").value,price:parseFloat(e.querySelector("#productPrice").value),costPrice:parseFloat(e.querySelector("#productCostPrice").value)||0,commissionRate:parseFloat(e.querySelector("#productCommissionRate").value)||0,currentStock:isNaN(a)?0:a,minStock:isNaN(s)?0:s,maxStock:isNaN(r)?0:r,categoryId:e.querySelector("#productCategory").value||null,photo:e.querySelector("#productPhotoBase64").value,supplierIds:n};try{t?await rr(t,i):await No(i),document.getElementById("productModal").style.display="none",b("Sucesso",`Produto ${t?"atualizado":"adicionado"} com sucesso!`,"success"),await dt()}catch(l){throw new Error(l.message)}}function so(e,t=800,a=800,s="image/jpeg",r=.8){return new Promise((o,n)=>{if(!e.type.startsWith("image/"))return n(new Error("O ficheiro selecionado não é uma imagem."));const i=new FileReader;i.onload=l=>{const d=new Image;d.onload=()=>{let c=d.width,u=d.height;c>u?c>t&&(u*=t/c,c=t):u>a&&(c*=a/u,u=a);const p=document.createElement("canvas");p.width=c,p.height=u,p.getContext("2d").drawImage(d,0,0,c,u);const f=p.toDataURL(s,r);o(f)},d.onerror=c=>n(new Error("Não foi possível carregar a imagem.")),d.src=l.target.result},i.onerror=l=>n(new Error("Não foi possível ler o ficheiro.")),i.readAsDataURL(e)})}function ro(e=null){const t=document.getElementById("productModal"),a=m.categories||[],s=m.suppliers||[],r=a.map(L=>`<option value="${L.id}" ${e?.categoryId===L.id?"selected":""}>${v(L.name)}</option>`).join("");let o=new Set(e?.supplierIds||[]);const n=v(e?.name||""),i=e?.price||"",l=e?.costPrice||"",d=e?.commissionRate||"",c=e?.minStock||0,u=e?.maxStock||0,p=e?.currentStock||0,g=e?n:"Novo Produto";t.innerHTML=`
    <div class="modal-content max-w-3xl overflow-y-auto max-h-[90vh]">
        <form id="productForm">
            <input type="hidden" id="productId" value="${e?.id||""}">
            <input type="hidden" id="productPhotoBase64" value="${e?.photo||""}">
            
            <div class="flex justify-between items-center mb-4">
                <h2 id="productModalTitle" class="text-2xl font-bold text-gray-800">${g}</h2>
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
                        <div class="form-group"><label for="productCurrentStock">Atual</label><input type="number" id="productCurrentStock" value="${p}" readonly class="mt-1 w-full p-2 border rounded-md bg-gray-100"></div>
                        <div class="form-group"><label for="productMinStock">Mínimo (Alerta)</label><input type="number" id="productMinStock" value="${c}" class="mt-1 w-full p-2 border rounded-md"></div>
                        <div class="form-group"><label for="productMaxStock">Máximo</label><input type="number" id="productMaxStock" value="${u}" class="mt-1 w-full p-2 border rounded-md"></div>
                    </div></div>
                </div>

                <div id="tab-content-stock" class="tab-content hidden space-y-6">
                    <p class="text-sm text-gray-600">Use esta secção para registar entradas (compras) ou saídas (perdas) manuais. O estoque atual é <strong id="currentStockDisplay" class="text-lg">${p}</strong>.</p>
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
    </div>`;const f=t.querySelector("#productCategory"),h=t.querySelector("#productPhotoInput");t.querySelector("#productPhotoButton").addEventListener("click",()=>h.click()),f.innerHTML='<option value="">Sem categoria</option>'+(m.categories||[]).map(L=>`<option value="${L.id}" ${e?.categoryId===L.id?"selected":""}>${v(L.name)}</option>`).join(""),e&&(f.value=e.categoryId||"");const y=t.querySelector("#productPhotoPreview");t.querySelector("#productPhotoBase64");const S=e?.photo||"https://placehold.co/128x128/E2E8F0/4A5568?text=Foto",I=e?.photo||"";h.onchange=async()=>{const L=h.files[0];if(L){y.src="https://placehold.co/128x128/E2E8F0/4A5568?text=...";try{const T=await so(L,800,800,"image/jpeg",.8),R=T.length*3/4,z=1e3*1024;if(R>z)throw new Error("A imagem é muito grande mesmo após a compressão.");preview.src=T,base64Input.value=T}catch(T){console.error("Erro ao processar imagem:",T),b("Erro de Imagem",T.message||"Não foi possível processar a imagem.","error"),preview.src=S,base64Input.value=I,O.value=""}}};const $=t.cloneNode(!0);t.parentNode.replaceChild($,t);const k=()=>{const L=$.querySelector("#modalSupplierSearch"),T=$.querySelector("#supplierSearchResults"),N=$.querySelector("#selectedSuppliersList"),R=L.value.toLowerCase();if(R.length>0){const z=s.filter(A=>A.name.toLowerCase().includes(R)&&!o.has(A.id));z.length>0?(T.classList.remove("hidden"),T.innerHTML=z.map(A=>`
                    <div class="p-2 hover:bg-indigo-50 cursor-pointer border-b last:border-0 text-sm flex justify-between items-center" data-add-supplier="${A.id}">
                        <span class="font-medium">${v(A.name)}</span>
                        <span class="text-indigo-600 text-xs">+ Adicionar</span>
                    </div>
                `).join("")):(T.classList.remove("hidden"),T.innerHTML='<div class="p-2 text-xs text-gray-500 text-center">Nenhum resultado disponível.</div>')}else T.classList.add("hidden");o.size>0?(N.innerHTML="",o.forEach(z=>{const A=s.find(Y=>Y.id===z);A&&(N.innerHTML+=`
                        <div class="selected-supplier-item flex items-center justify-between bg-white border p-2 rounded shadow-sm" data-id="${A.id}">
                            <div class="text-sm">
                                <p class="font-bold text-gray-800">${v(A.name)}</p>
                                <p class="text-xs text-gray-500">${v(A.contactName||"")} - ${v(A.phone||"")}</p>
                            </div>
                            <button type="button" class="text-red-500 hover:text-red-700 p-1" data-remove-supplier="${A.id}" title="Remover">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </div>
                    `)})):N.innerHTML='<p class="text-xs text-gray-400 text-center py-2">Nenhum fornecedor selecionado.</p>'};$.querySelector("#modalSupplierSearch").addEventListener("input",k),$.addEventListener("click",L=>{const T=L.target.closest("[data-add-supplier]");if(T){const R=T.dataset.addSupplier;o.add(R),$.querySelector("#modalSupplierSearch").value="",k()}const N=L.target.closest("[data-remove-supplier]");if(N){const R=N.dataset.removeSupplier;o.delete(R),k()}}),k(),$.addEventListener("click",async L=>{const T=L.target.closest("button[data-action]");if(!T)return;const N=T.dataset.action,R=$.querySelector("#productId").value;if(N==="close-modal"&&($.style.display="none"),N==="delete-product"){if(!R)return;$.style.display="none",await Gn(R)}if(N==="save-product-modal"){const z=$.querySelector("#productForm");if(z){if(!z.querySelector("#productName").value||!z.querySelector("#productPrice").value){b("Erro","Nome e Preço de Venda são obrigatórios.","error");return}const A=T.closest('button[data-action="save-product-modal"]');A.disabled=!0,A.textContent="A salvar...";try{await Yn(z)}catch(Y){b("Erro",`Falha ao salvar: ${Y.message}`,"error"),A.disabled=!1,A.textContent="Salvar Alterações"}}}if(N==="adjust-stock-modal"){L.preventDefault();const z=$.querySelector("#stockAdjustmentAmount"),A=$.querySelector("#stockAdjustmentReason"),Y=parseInt(z.value,10),Ie=parseInt(T.dataset.change,10);if(!Y||Y<=0){b("Erro","Por favor, insira uma quantidade válida.","error");return}const Gt=Y*Ie,ws=A.value||(Gt>0?"Entrada manual":"Saída manual");try{await ir(R,{change:Gt,reason:ws});const ze=m.products.findIndex(Ve=>Ve.id===R);if(ze>-1){const Ve=m.products[ze].currentStock+Gt;m.products[ze].currentStock=Ve,$.querySelector("#currentStockDisplay").textContent=Ve,$.querySelector("#productCurrentStock").value=Ve,z.value="",A.value="",b("Sucesso","Estoque atualizado!","success"),Na(),st()}}catch(ze){b("Erro de Stock",ze.message,"error")}}});const C=$.querySelectorAll(".tab-btn"),F=$.querySelectorAll(".tab-content");C.forEach(L=>{L.addEventListener("click",T=>{T.preventDefault(),C.forEach(N=>{N.classList.remove("border-indigo-500","text-indigo-600"),N.classList.add("border-transparent","text-gray-500","hover:text-gray-700","hover:border-gray-300")}),L.classList.add("border-indigo-500","text-indigo-600"),L.classList.remove("border-transparent","text-gray-500","hover:text-gray-700","hover:border-gray-300"),F.forEach(N=>N.classList.add("hidden")),document.getElementById(`tab-content-${L.dataset.tab}`).classList.remove("hidden")})});const O=$.querySelector("#productPhotoInput");$.querySelector("#productPhotoButton").addEventListener("click",()=>O.click()),O.onchange=async()=>{const L=O.files[0];if(!L)return;const T=$.querySelector("#productPhotoPreview"),N=$.querySelector("#productPhotoBase64");T.src="https://placehold.co/128x128/E2E8F0/4A5568?text=...";try{const R=await so(L,800,800,"image/jpeg",.8),A=R.length*3/4,Y=1e3*1024;if(A>Y)throw new Error("A imagem é muito grande mesmo após a compressão.");T.src=R,N.value=R}catch(R){console.error("Erro ao processar imagem:",R),b("Erro de Imagem",R.message||"Não foi possível processar a imagem.","error"),T.src=S,N.value=I,O.value=""}},$.style.display="flex"}function Qn(){const e=document.getElementById("products-content-container");e.innerHTML=`
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
    `;const t=document.getElementById("productCategoryFilter");t&&(t.innerHTML='<option value="all">Todas as categorias</option>',(m.categories||[]).forEach(a=>t.innerHTML+=`<option value="${a.id}">${v(a.name)}</option>`)),Na(),st()}function Xn(){const e=document.getElementById("products-content-container"),t=new Date().toISOString().split("T")[0],a=new Date;a.setDate(a.getDate()-30);const s=a.toISOString().split("T")[0];e.innerHTML=`
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
        </div>`;const r=document.getElementById("productFilterReport"),o=document.getElementById("categoryFilterReport");r&&m.products&&(r.innerHTML+=m.products.map(n=>`<option value="${n.id}">${v(n.name)}</option>`).join("")),o&&m.categories&&(o.innerHTML+=m.categories.map(n=>`<option value="${n.id}">${v(n.name)}</option>`).join(""))}async function Zn(){const e=document.getElementById("report-results");e.innerHTML='<div class="loader mx-auto my-8"></div>';const t={startDate:document.getElementById("reportStartDate").value,endDate:document.getElementById("reportEndDate").value,productId:document.getElementById("productFilterReport").value,categoryId:document.getElementById("categoryFilterReport").value,establishmentId:m.establishmentId};try{const a=await lr(t);if(a.length===0){e.innerHTML=`
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
                                <td class="px-4 py-3 whitespace-nowrap font-semibold text-gray-800">${v(o.productName)}</td>
                                <td class="px-4 py-3 whitespace-nowrap text-center font-bold ${o.change>0?"text-green-600":"text-red-600"}">
                                    ${o.change>0?"+":""}${o.change}
                                </td>
                                <td class="px-4 py-3 whitespace-nowrap text-center text-gray-500">${o.oldStock}</td>
                                <td class="px-4 py-3 whitespace-nowrap text-center text-gray-800 font-medium">${o.newStock}</td>
                                <td class="px-4 py-3 whitespace-nowrap text-gray-600 truncate max-w-xs" title="${v(o.reason)}">${v(o.reason)}</td>
                                <td class="px-4 py-3 whitespace-nowrap text-gray-600">${v(o.user)}</td>
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
                                <h4 class="font-bold text-gray-800 text-base line-clamp-1">${v(o.productName)}</h4>
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
                            <span class="text-gray-600 truncate max-w-[60%] font-medium" title="${v(o.reason)}">
                                ${v(o.reason)||"Sem motivo"}
                            </span>
                            <span class="text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                                ${v(o.user)||"Sistema"}
                            </span>
                        </div>
                    </div>
                `).join("")}
            </div>`;e.innerHTML=s+r}catch(a){b("Erro",`Não foi possível gerar o relatório: ${a.message}`,"error"),e.innerHTML=`<div class="bg-white border border-red-200 rounded-lg p-8 text-center text-red-500">${a.message}</div>`}}function Na(){const e={ok:0,near_min:0,at_min:0,empty:0};if(!m.products)return;m.products.forEach(o=>{if(!o)return;const n=o.currentStock,i=o.minStock;n<=0?e.empty++:i>0&&n<=i?e.at_min++:i>0&&n<=i*1.2?e.near_min++:e.ok++});const t=document.getElementById("indicator-ok"),a=document.getElementById("indicator-near-min"),s=document.getElementById("indicator-at-min"),r=document.getElementById("indicator-empty");t&&(t.textContent=e.ok),a&&(a.textContent=e.near_min),s&&(s.textContent=e.at_min),r&&(r.textContent=e.empty)}function st(){const e=document.getElementById("productsList");if(!e)return;const t=document.getElementById("productSearchInput")?.value.toLowerCase()||"",a=document.getElementById("productCategoryFilter")?.value||"all",s=new Map((m.categories||[]).map(o=>[o.id,o.name]));let r=(m.products||[]).filter(Boolean);ae!=="all"&&(r=r.filter(o=>{const n=o.currentStock,i=o.minStock;switch(ae){case"ok":return n>0&&(i===0||n>i*1.2);case"near_min":return i>0&&n>i&&n<=i*1.2;case"at_min":return i>0&&n>0&&n<=i;case"empty":return n<=0;default:return!0}})),r=r.filter(o=>{const n=o.name.toLowerCase().includes(t),i=a==="all"||o.categoryId===a;return n&&i}),e.innerHTML="",r.length>0?(e.className="space-y-3 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 sm:gap-4 sm:space-y-0",r.forEach(o=>{const n=document.createElement("div"),i=JSON.stringify(o).replace(/'/g,"&apos;");n.className=`product-card bg-white rounded-lg shadow-md flex items-center gap-3 p-3 overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-lg hover:bg-gray-50 
                              sm:flex-col sm:p-0 sm:items-stretch sm:gap-0`,n.dataset.action="edit-product",n.dataset.product=i;const l=o.photo||`https://placehold.co/200x200/E2E8F0/4A5568?text=${encodeURIComponent(o.name.charAt(0))}`,d=s.get(o.categoryId)||"N/A";let c="",u="text-gray-500";const p=o.currentStock,g=o.minStock;p<=0?(c='<span class="text-xs font-semibold text-red-600">Esgotado</span>',u="text-red-600 font-semibold"):g>0&&p<=g?(c='<span class="text-xs font-semibold text-orange-600">Estoque Mínimo</span>',u="text-orange-600 font-semibold"):g>0&&p<=g*1.2?(c='<span class="text-xs font-semibold text-blue-600">Estoque Baixo</span>',u="text-blue-600 font-semibold"):(c='<span class="text-xs font-semibold text-green-600">Em Estoque</span>',u="text-green-600 font-semibold"),n.innerHTML=`
                <img src="${l}" alt="Imagem de ${v(o.name)}" class="w-16 h-16 rounded-md object-cover flex-shrink-0 sm:w-full sm:h-24 sm:rounded-b-none">
                
                <div class="flex-1 sm:p-3 sm:flex sm:flex-col sm:flex-grow">
                    <div class="sm:flex-grow">
                        <div class="flex justify-between items-start mb-1 gap-2">
                            <h3 class="text-sm font-bold text-gray-900 flex-1 text-left">${v(o.name)}</h3>
                            <div class="hidden sm:block">${c}</div>
                        </div>
                        
                        <p class="text-xl font-bold text-indigo-600 mb-1 text-left hidden sm:block">R$ ${o.price.toFixed(2)}</p>
                        
                        <p class="text-xs text-gray-500 text-left mb-2 hidden sm:block">Categoria: ${v(d)}</p>
                    </div>

                    <div class="flex justify-between items-center mt-2 sm:mt-0">
                        <p class="text-lg font-bold text-indigo-600 text-left sm:hidden">R$ ${o.price.toFixed(2)}</p>
                        <p class="text-xs text-gray-500 text-right sm:text-left">
                            Estoque: <span class="font-bold text-base ${u}">${o.currentStock}</span>
                        </p>
                    </div>
                </div>`,e.appendChild(n)})):(e.className="",e.innerHTML='<p class="col-span-full text-center text-gray-500 py-10">Nenhum produto encontrado.</p>')}async function dt(){const e=document.getElementById("products-content-container");e&&(e.innerHTML='<div class="loader col-span-full mx-auto my-8"></div>');try{const[t,a,s]=await Promise.all([Ft(m.establishmentId),Ut(m.establishmentId,"products"),Ma(m.establishmentId)]);m.products=(t||[]).filter(Boolean),m.categories=(a||[]).filter(Boolean),m.suppliers=(s||[]).filter(Boolean),ss(Xe)}catch(t){e&&(e.innerHTML=`<p class="text-red-500 col-span-full text-center p-8">Erro ao carregar dados: ${t.message}</p>`)}}function ss(e){if(document.getElementById("products-content-container")){if(Xe===e&&document.getElementById("products-content-container").children.length>1){Xe==="products"&&(Na(),st());return}Xe=e,ae="all",document.querySelectorAll("#products-tabs button.tab-button").forEach(t=>{const a=t.dataset.view===e;t.classList.toggle("border-indigo-500",a),t.classList.toggle("text-indigo-600",a),t.classList.toggle("border-transparent",!a),t.classList.toggle("text-gray-500",!a)}),e==="products"?Qn():e==="movements"&&Xn()}}async function Kn(){ge.innerHTML=`
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
        </section>`,ie&&(ge.removeEventListener("click",ie),ge.removeEventListener("input",ie),ge.removeEventListener("change",ie)),ie=async e=>{const t=e.target;if(t.id==="productSearchInput"||t.id==="productCategoryFilter"){st();return}const a=e.target.closest("button[data-action], button[data-view], .indicator-card[data-action], .product-card[data-action]");if(!a||e.target.closest('[data-action-stop-propagation="true"]'))return;if(a.hasAttribute("data-view")){ss(a.dataset.view);return}switch(a.dataset.action){case"new-product":ro();break;case"edit-product":ro(JSON.parse(a.dataset.product));break;case"manage-product-categories":Wn();break;case"generate-report":await Zn();break;case"filter-stock":const r=a.dataset.filterType;ae=ae===r?"all":r,document.querySelectorAll(".indicator-card").forEach(o=>{o.classList.toggle("ring-2",o.dataset.filterType===ae),o.classList.toggle("ring-indigo-500",o.dataset.filterType===ae),o.classList.toggle("shadow-lg",o.dataset.filterType===ae)}),st();break}},ge.addEventListener("click",ie),ge.addEventListener("input",ie),ge.addEventListener("change",ie),Xe="products",ae="all",await dt()}const be=document.getElementById("content");let le=null,$t="list",H={step:1,productsToBuy:[],allSuppliers:[],finalOrders:{},isQuoteMode:!1};async function ei(){$t==="list"?Jt():$t==="purchases"?(H.step=1,Ze()):$t==="history"&&rs()}async function ti(){try{const e=await Ma(m.establishmentId);return m.suppliers=e||[],H.allSuppliers=e,!0}catch(e){return console.error(e),!1}}async function ai(e){if(await j("Excluir Fornecedor","Tem a certeza? Isso removerá o vínculo com os produtos."))try{await On(e),b("Sucesso","Fornecedor excluído.","success"),Rt("genericModal"),Jt()}catch(t){b("Erro","Erro ao excluir: "+t.message,"error")}}async function oi(e){e.preventDefault();const t=e.target,a=t.querySelector("#supId").value,s={name:t.querySelector("#supName").value,contactName:t.querySelector("#supContact").value,email:t.querySelector("#supEmail").value,phone:t.querySelector("#supPhone").value,taxId:t.querySelector("#supTaxId").value,category:t.querySelector("#supCategory").value,establishmentId:m.establishmentId},r=t.querySelector('button[type="submit"]');r.disabled=!0,r.textContent="A salvar...";try{a?(await Hn(a,s),b("Sucesso","Fornecedor atualizado!","success")):(await jn(s),b("Sucesso","Fornecedor criado!","success")),Rt("genericModal"),Jt()}catch(o){b("Erro","Erro ao salvar: "+o.message,"error")}finally{r.disabled=!1,r.textContent="Salvar"}}async function Jt(){const e=document.getElementById("suppliersList");if(!e)return;e.innerHTML='<div class="loader mx-auto my-8"></div>',await ti();const t=document.getElementById("supplierSearchInput")?.value.toLowerCase()||"",a=m.suppliers.filter(o=>o.name.toLowerCase().includes(t)||o.contactName&&o.contactName.toLowerCase().includes(t));if(e.innerHTML="",a.length===0){e.innerHTML='<div class="text-center text-gray-500 py-8">Nenhum fornecedor encontrado.</div>';return}let s='<div class="flex flex-col gap-2 md:hidden">';a.forEach(o=>{const n=JSON.stringify(o).replace(/"/g,"&quot;"),i=v(o.name),l=v(o.category||"Geral"),d=v(o.contactName||"");s+=`
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
    `;a.forEach(o=>{const n=JSON.stringify(o).replace(/"/g,"&quot;"),i=v(o.name),l=v(o.taxId||"Sem doc."),d=v(o.email||"-"),c=v(o.phone||"-"),u=v(o.category||"Geral");r+=`
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
                        ${u}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button data-action="edit" data-supplier="${n}" class="text-indigo-600 hover:text-indigo-900 mr-3">Editar</button>
                    <button data-action="delete" data-id="${o.id}" class="text-red-600 hover:text-red-900">Excluir</button>
                </td>
            </tr>
        `}),r+="</tbody></table></div>",e.innerHTML=s+r}function si(e){const t=e.phone?`https://wa.me/${e.phone.replace(/\D/g,"")}`:"#",a=e.phone?`tel:${e.phone}`:"#",s=e.email?`mailto:${e.email}`:"#",r=JSON.stringify(e).replace(/"/g,"&quot;"),o=v(e.name),n=v(e.category||"Fornecedor"),i=v(e.contactName||""),l=v(e.phone||""),d=`
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
    `;_({title:"",contentHTML:d,maxWidth:"max-w-md"})}async function Ze(){const e=document.getElementById("purchasesContainer");if(e)if(H.step===1){e.innerHTML='<div class="loader mx-auto my-8"></div>';try{const[t,a]=await Promise.all([Ft(m.establishmentId),Ma(m.establishmentId)]);H.allSuppliers=a||[];const s=t.filter(d=>{const c=parseInt(d.currentStock||0),u=parseInt(d.minStock||0);return c<=u});if(H.productsToBuy=s,s.length===0){e.innerHTML=`
                    <div class="text-center py-10 bg-white rounded-lg shadow-sm border border-gray-100">
                        <div class="bg-green-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                            <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                        <h3 class="text-lg font-bold text-gray-800">Tudo em ordem!</h3>
                        <p class="text-gray-600">Nenhum produto abaixo do estoque mínimo.</p>
                        <button class="mt-4 text-indigo-600 hover:underline text-sm" onclick="window.location.reload()">Atualizar Dados</button>
                    </div>
                `;return}let r='<div class="flex flex-col gap-3 md:hidden">',o="";s.forEach(d=>{const c=parseInt(d.minStock)||0,u=parseInt(d.currentStock)||0,p=Math.max(c-u,1),g=parseFloat(d.costPrice||0),f=v(d.name);let h='<option value="">Selecione...</option>';H.allSuppliers.length>0?H.allSuppliers.forEach(y=>{const I=d.supplierIds&&d.supplierIds.includes(y.id)?"selected":"";h+=`<option value="${y.id}" ${I}>${v(y.name)}</option>`}):h='<option value="">Sem fornecedores</option>',r+=`
                    <div class="product-row bg-white p-3 rounded-lg shadow-sm border border-gray-200" data-product-id="${d.id}" data-cost="${g}">
                        <div class="flex justify-between items-start mb-2">
                            <div class="flex items-center gap-2">
                                <input type="checkbox" class="row-select w-5 h-5 text-indigo-600 rounded border-gray-300" checked>
                                <div>
                                    <p class="font-bold text-gray-800 text-sm">${f}</p>
                                    <p class="text-xs text-gray-500">Custo: R$ ${g.toFixed(2)}</p>
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
                                <input type="number" class="qty-input w-full p-2 border border-gray-300 rounded text-center font-bold text-indigo-700 bg-indigo-50" value="${p}" min="1">
                            </div>
                            <div>
                                <label class="text-xs text-gray-500 block mb-1">Fornecedor</label>
                                <select class="supplier-select w-full p-2 border border-gray-300 rounded bg-white text-xs truncate">
                                    ${h}
                                </select>
                            </div>
                        </div>
                        <div class="mt-2 pt-2 border-t border-gray-100 flex justify-between items-center">
                            <span class="text-xs text-gray-500">Subtotal Previsto:</span>
                            <span class="row-subtotal font-bold text-indigo-600 text-sm">R$ ${(p*g).toFixed(2)}</span>
                        </div>
                    </div>
                `,o+=`
                    <tr class="hover:bg-gray-50 border-b border-gray-100 product-row" data-product-id="${d.id}" data-cost="${g}">
                        <td class="p-3 pl-4 text-center w-10">
                            <input type="checkbox" class="row-select w-5 h-5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500" checked>
                        </td>
                        <td class="p-3 font-medium text-gray-800">${f}</td>
                        <td class="p-3 text-center text-xs text-gray-600">
                            <div class="flex flex-col items-center">
                                <span class="font-bold text-red-600">${u} <span class="text-gray-400 font-normal">Atual</span></span>
                                <span class="border-t border-gray-200 w-12 my-0.5"></span>
                                <span class="font-medium">${c} <span class="text-gray-400 font-normal">Mínimo</span></span>
                            </div>
                        </td>
                        <td class="p-3 text-center w-24">
                            <input type="number" class="qty-input w-full p-2 border border-gray-300 rounded text-center text-lg font-bold text-indigo-700 bg-indigo-50" value="${p}" min="1">
                        </td>
                        <td class="p-3 text-right text-sm text-gray-600">R$ ${g.toFixed(2)}</td>
                        <td class="p-3 text-right text-sm font-bold text-gray-800 row-subtotal">R$ ${(p*g).toFixed(2)}</td>
                        <td class="p-3 w-48">
                            <select class="supplier-select w-full p-2 border border-gray-300 rounded-md bg-white text-sm">
                                ${h}
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
            `,ga()}catch(t){console.error(t),e.innerHTML='<p class="text-red-500 text-center">Erro ao calcular compras.</p>'}}else H.step===2&&ri(e)}function ri(e){if(!H.finalOrders||Object.keys(H.finalOrders).length===0){H.step=1,Ze();return}const t=H.isQuoteMode;let a="",s=0;const r=t?"border-indigo-100":"border-gray-200",o=t?"bg-indigo-50 border-indigo-100":"bg-gray-50 border-gray-200",n=t?"bg-blue-100 text-blue-700":"bg-green-100 text-green-700",i=t?"hidden":"flex",l=t?"Cotações Prontas":"Pedidos Prontos",d=t?"text-indigo-600":"text-green-600",c=t?"bg-indigo-50 border-indigo-100":"bg-green-50 border-green-100",u=t?"text-indigo-800":"text-green-800";for(const[p,g]of Object.entries(H.finalOrders)){let f=0,h=g.items.map(C=>{const F=C.qty*C.cost;return f+=F,`
            <div class="flex justify-between py-2 border-b border-gray-50 text-sm">
                <span class="text-gray-800 font-medium">${v(C.name)}</span>
                <div class="text-right">
                    <span class="text-gray-500 text-xs block">${C.qty} x R$ ${C.cost.toFixed(2)}</span>
                    <span class="text-indigo-600 font-bold block">R$ ${F.toFixed(2)}</span>
                </div>
            </div>
        `}).join("");s+=f;const y=encodeURIComponent(JSON.stringify({supplierId:p,supplierName:g.info.name,totalAmount:f,items:g.items})),S=encodeURIComponent(JSON.stringify({name:g.info.name,phone:g.info.phone,email:g.info.email})),I=encodeURIComponent(JSON.stringify(g.items)),$=v(g.info.name),k=v(g.info.email||"");a+=`
            <div class="bg-white border ${r} rounded-xl overflow-hidden shadow-sm supplier-order-card mb-4" data-supplier-id="${p}">
                <div class="${o} p-3 border-b flex justify-between items-center">
                    <div>
                        <h4 class="font-bold text-gray-800 text-base">${$}</h4>
                        <div class="text-[10px] text-gray-500 flex flex-col">
                            <span>${k}</span>
                        </div>
                    </div>
                    <div class="text-right">
                        <span class="${n} text-xs font-bold px-2 py-1 rounded">R$ ${f.toFixed(2)}</span>
                    </div>
                </div>
                <div class="p-3">
                    ${h}
                </div>
                <div class="p-3 bg-gray-50 border-t border-gray-200 grid grid-cols-3 gap-2">
                    <button class="btn-print-order bg-white border border-gray-300 text-gray-700 px-2 py-2.5 rounded-lg hover:bg-gray-50 text-xs font-bold flex items-center justify-center gap-1">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
                        PDF
                    </button>
                    <button class="btn-send-order bg-green-500 text-white px-2 py-2.5 rounded-lg hover:bg-green-600 text-xs font-bold flex items-center justify-center gap-1 shadow-sm"
                        data-supplier-info="${S}"
                        data-order-items="${I}"
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
                    <h3 class="font-bold ${u} text-lg">${l}</h3>
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
    `}async function rs(){const e=document.getElementById("historyContainer");if(e){e.innerHTML='<div class="loader mx-auto my-8"></div>';try{const t=await Un(m.establishmentId);if(t.length===0){e.innerHTML='<div class="text-center text-gray-500 py-8">Nenhum histórico encontrado.</div>';return}let a='<div class="flex flex-col gap-3 md:hidden">';t.forEach(o=>{const n=new Date(o.createdAt.seconds*1e3).toLocaleDateString("pt-BR"),i=v(o.supplierName);a+=`
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
                <td class="p-3 font-medium text-gray-800">${v(o.supplierName)}</td>
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
        `;e.innerHTML=a+r}catch(t){console.error(t),e.innerHTML='<p class="text-red-500 text-center">Erro ao carregar histórico.</p>'}}}function ni(e){const t=new Date(e.createdAt.seconds*1e3).toLocaleString("pt-BR"),a=e.items.map(r=>`
        <li class="flex justify-between py-3 border-b border-gray-100 last:border-0">
            <div>
                <p class="font-medium text-sm text-gray-800">${v(r.name)}</p>
                <p class="text-xs text-gray-500">${r.qty} un. x R$ ${parseFloat(r.cost).toFixed(2)}</p>
            </div>
            <p class="text-sm font-bold text-gray-700">R$ ${(r.qty*r.cost).toFixed(2)}</p>
        </li>
    `).join(""),s=`
        <div class="space-y-4">
            <div class="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
                <div>
                    <p class="text-xs text-gray-500 uppercase font-bold">Fornecedor</p>
                    <p class="font-bold text-gray-900 text-lg">${v(e.supplierName)}</p>
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
    `;_({title:"Detalhes da Compra",contentHTML:s,maxWidth:"max-w-md"}),setTimeout(()=>{document.querySelector("#genericModal .modal-close").addEventListener("click",()=>{Rt("genericModal")})},50)}function ga(){const e=document.querySelectorAll(".product-row");let t=0;e.forEach(s=>{if(s.offsetParent===null)return;const r=s.querySelector(".row-select"),o=s.querySelector(".qty-input"),n=s.querySelector(".row-subtotal"),i=parseFloat(s.dataset.cost||0),l=parseInt(o.value||0);if(r.checked){const d=i*l;t+=d,n&&(n.textContent=`R$ ${d.toFixed(2)}`),s.classList.remove("opacity-50","bg-gray-50")}else s.classList.add("opacity-50","bg-gray-50")});const a=document.getElementById("total-purchase-cost");a&&(a.textContent=`R$ ${t.toFixed(2).replace(".",",")}`)}async function ii(e,t=!1){if(!window.jspdf){alert("Erro: Biblioteca PDF não carregada.");return}const{jsPDF:a}=window.jspdf,s=new a,r=new Date().toLocaleDateString("pt-BR"),o=t?[100,116,139]:[22,163,74];s.setFontSize(22),s.setTextColor(...o),s.setFont("helvetica","bold");const n=t?"SOLICITAÇÃO DE COTAÇÃO":"PEDIDO DE COMPRA";s.text(n,14,20),s.setDrawColor(...o),s.setLineWidth(.5),s.line(14,25,196,25),s.setFontSize(10),s.setTextColor(0),s.setFont("helvetica","bold"),s.text("DE:",14,35),s.setFont("helvetica","normal"),s.text(m.establishmentName||"Nossa Empresa",14,40),s.text(`Data: ${r}`,14,45),s.setFont("helvetica","bold"),s.text("PARA:",110,35),s.setFont("helvetica","normal"),s.text(e.info.name||"Fornecedor",110,40),e.info.email&&s.text(`Email: ${e.info.email}`,110,45),e.info.phone&&s.text(`Tel: ${e.info.phone}`,110,50),s.setFontSize(10),s.setFont("helvetica","italic");const i=t?"Por favor, enviem os vossos melhores preços e condições para os itens listados abaixo.":"Confirmação de pedido de compra conforme os itens e quantidades abaixo.";s.text(i,14,65);const l=t?["Produto","Quantidade Solicitada"]:["Produto","Qtd.","V. Unitário","V. Total"],d=e.items.map(g=>t?[g.name,g.qty.toString()]:[g.name,g.qty.toString(),`R$ ${g.cost.toFixed(2)}`,`R$ ${(g.qty*g.cost).toFixed(2)}`]);s.autoTable({startY:75,head:[l],body:d,theme:"striped",headStyles:{fillColor:o,textColor:[255,255,255],fontStyle:"bold",halign:"left"},styles:{fontSize:10,cellPadding:3,valign:"middle"},columnStyles:t?{}:{1:{halign:"center"},2:{halign:"right"},3:{halign:"right",fontStyle:"bold"}},foot:t?null:[["","","TOTAL DO PEDIDO:",{content:`R$ ${d.reduce((g,f)=>g+parseFloat(f[3].replace("R$ ","")),0).toFixed(2)}`,styles:{halign:"right",fontStyle:"bold",fillColor:[240,240,240],textColor:[0,0,0]}}]]});const c=s.internal.getNumberOfPages();for(let g=1;g<=c;g++)s.setPage(g),s.setFontSize(8),s.setTextColor(150),s.text(`Gerado por Kairos - Página ${g} de ${c}`,196,290,{align:"right"});const u=e.info.name.replace(/[^a-zA-Z0-9]/g,"_"),p=`${t?"Cotacao":"Pedido"}_${u}_${r.replace(/\//g,"-")}.pdf`;s.save(p),b("Sucesso","PDF gerado com sucesso!","success")}function no(e=null){const t=`
        <form id="supplierForm" class="space-y-4">
            <input type="hidden" id="supId" value="${e?.id||""}">
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="col-span-1 md:col-span-2">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Nome da Empresa *</label>
                    <input type="text" id="supName" value="${v(e?.name||"")}" required class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-shadow" placeholder="Ex: Distribuidora Beleza">
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
                    <input type="text" id="supContact" value="${v(e?.contactName||"")}" class="w-full p-3 border border-gray-300 rounded-lg outline-none" placeholder="Ex: João Silva">
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Telefone / WhatsApp</label>
                    <input type="tel" id="supPhone" value="${v(e?.phone||"")}" class="w-full p-3 border border-gray-300 rounded-lg outline-none" placeholder="(00) 00000-0000">
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" id="supEmail" value="${v(e?.email||"")}" class="w-full p-3 border border-gray-300 rounded-lg outline-none" placeholder="contato@empresa.com">
                </div>

                <div class="col-span-1 md:col-span-2">
                    <label class="block text-sm font-medium text-gray-700 mb-1">CNPJ / CPF</label>
                    <input type="text" id="supTaxId" value="${v(e?.taxId||"")}" class="w-full p-3 border border-gray-300 rounded-lg outline-none">
                </div>
            </div>

            <div class="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
                <button type="button" class="modal-close w-full md:w-auto px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-bold hover:bg-gray-200 transition-colors">Cancelar</button>
                <button type="submit" class="w-full md:w-auto px-6 py-3 bg-indigo-600 text-white rounded-lg font-bold shadow-md hover:bg-indigo-700 transition-colors">
                    ${e?"Atualizar Dados":"Salvar Fornecedor"}
                </button>
            </div>
        </form>
    `;_({title:e?"Editar Fornecedor":"Novo Fornecedor",contentHTML:t,maxWidth:"max-w-lg"}),setTimeout(()=>{document.getElementById("supplierForm").addEventListener("submit",oi),document.querySelector("#genericModal .modal-close").addEventListener("click",()=>Rt("genericModal"))},50)}function li(){be.innerHTML=`
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
    `,le&&(be.removeEventListener("click",le),be.removeEventListener("input",le),be.removeEventListener("change",le)),le=e=>{if(e.target.closest("#tab-btn-list")&&mt("list"),e.target.closest("#tab-btn-purchases")&&mt("purchases"),e.target.closest("#tab-btn-history")&&mt("history"),e.target.id==="toggle-quote-mode"&&(H.isQuoteMode=e.target.checked,Ze()),e.target.id==="supplierSearchInput"&&Jt(),e.target.closest("#btn-new-supplier")&&no(),e.target.closest(".supplier-item-mobile")){const a=e.target.closest(".supplier-item-mobile"),s=JSON.parse(a.dataset.supplier);si(s)}const t=e.target.closest("button[data-action]");if(t){const a=t.dataset.action;a==="delete"&&ai(t.dataset.id),a==="edit"&&no(JSON.parse(t.dataset.supplier))}if((e.target.classList.contains("qty-input")||e.target.classList.contains("row-select"))&&ga(),e.target.id==="check-all-rows"){const a=e.target.checked;document.querySelectorAll(".row-select").forEach(s=>s.checked=a),ga()}if(e.target.closest("#btn-go-to-orders")){const a=document.querySelectorAll(".product-row"),s={};let r=!1;if(a.forEach(o=>{if(o.offsetParent===null||!o.querySelector(".row-select").checked)return;r=!0;let i="Produto";const l=o.querySelector("td:nth-child(2)"),d=o.querySelector(".font-bold");l?i=l.innerText:d&&(i=d.innerText);const c=parseInt(o.querySelector(".qty-input").value),u=parseFloat(o.dataset.cost),g=o.querySelector(".supplier-select").value;if(g){if(!s[g]){const f=H.allSuppliers.find(h=>h.id===g);s[g]={info:f,items:[]}}s[g].items.push({name:i,qty:c,cost:u})}}),!r){b("Atenção","Selecione pelo menos um item para gerar o pedido.","error");return}H.finalOrders=s,H.step=2,Ze()}if(e.target.closest("#btn-back-step1")&&(H.step=1,Ze()),e.target.closest(".btn-send-order")){const a=e.target.closest(".btn-send-order"),s=JSON.parse(decodeURIComponent(a.dataset.supplierInfo)),r=JSON.parse(decodeURIComponent(a.dataset.orderItems)),o=parseFloat(a.dataset.total),n=H.isQuoteMode;if(s.phone){const i=s.phone.replace(/\D/g,"");let l="";n?(l=`Olá *${s.name}*, tudo bem?

Gostaria de solicitar uma *cotação* para os seguintes itens:

`,r.forEach(c=>{l+=`- ${c.qty}x ${c.name}
`}),l+=`
Aguardo o retorno. Obrigado!`):(l=`Olá *${s.name}*, gostaria de realizar o seguinte *pedido*:

`,l+=`*ITENS:*
`,r.forEach(c=>{l+=`- ${c.qty}x ${c.name}
`}),l+=`
Aguardo confirmação.`);const d=`https://wa.me/${i}?text=${encodeURIComponent(l)}`;window.open(d,"_blank"),b("Aberto","WhatsApp aberto.","success")}else if(s.email){const i=n?`Solicitação de Cotação - ${m.establishmentName||"Empresa"}`:`Pedido de Compra - ${m.establishmentName||"Empresa"}`;let l=`Olá ${s.name},

`;n?l+=`Gostaria de solicitar uma cotação para os itens abaixo:

`:l+=`Gostaria de realizar o seguinte pedido:

`,r.forEach(c=>{l+=`- ${c.qty}x ${c.name}
`}),n||(l+=`
Valor Total Estimado: R$ ${o.toFixed(2)}`),l+=`

Aguardo retorno.`;const d=`mailto:${s.email}?subject=${encodeURIComponent(i)}&body=${encodeURIComponent(l)}`;window.location.href=d}else b("Erro","Fornecedor sem telefone ou email cadastrado.","error")}if(e.target.closest(".btn-register-order")){const a=e.target.closest(".btn-register-order");if(a.disabled)return;const s=JSON.parse(decodeURIComponent(a.dataset.order));s.establishmentId=m.establishmentId,a.disabled=!0,a.textContent="A processar...",$e(m.establishmentId).then(r=>{const o=r.purchaseConfig||null;return zn(s,o)}).then(()=>{b("Sucesso","Compra registrada e integrada ao financeiro!","success"),a.innerHTML='<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Registrado',a.classList.replace("bg-blue-600","bg-green-600"),a.classList.replace("hover:bg-blue-700","hover:bg-green-700")}).catch(r=>{a.disabled=!1,a.innerHTML='<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Salvar',b("Erro","Falha ao registrar compra: "+r.message,"error")})}if(e.target.closest(".btn-delete-purchase")){const s=e.target.closest(".btn-delete-purchase").dataset.id;j("Excluir Compra","Isto apagará o registo histórico E o lançamento financeiro associado. Deseja continuar?").then(async r=>{if(r)try{await Vn(s,m.establishmentId),b("Sucesso","Compra e financeiro excluídos.","success"),rs()}catch(o){b("Erro","Erro ao excluir: "+o.message,"error")}})}if(e.target.closest(".btn-print-order")){const s=e.target.closest(".supplier-order-card").dataset.supplierId,r=H.finalOrders[s];r?ii(r,H.isQuoteMode):b("Erro","Dados do pedido não encontrados.","error")}if(e.target.closest(".btn-view-purchase")){const a=e.target.closest(".btn-view-purchase"),s=JSON.parse(a.dataset.purchase);ni(s)}},be.addEventListener("click",le),be.addEventListener("input",le),be.addEventListener("change",le),mt("list")}function mt(e){$t=e,["list","purchases","history"].forEach(a=>{const s=document.getElementById(`tab-btn-${a}`),r=document.getElementById(`tab-content-${a}`);a===e?(s.classList.add("border-indigo-500","text-indigo-600"),s.classList.remove("border-transparent","text-gray-500"),r.classList.remove("hidden")):(s.classList.remove("border-indigo-500","text-indigo-600"),s.classList.add("border-transparent","text-gray-500"),r.classList.add("hidden"))});const t=document.getElementById("btn-new-supplier");t&&(e==="list"?t.classList.remove("hidden"):t.classList.add("hidden")),ei()}const Xt=document.getElementById("content"),io={monday:"Segunda",tuesday:"Terça",wednesday:"Quarta",thursday:"Quinta",friday:"Sexta",saturday:"Sábado",sunday:"Domingo"};let se=new Set,pt=null,Be=null;function di(e=8){let t="";for(let a=0;a<e;a++)t+=`
        <div class="bg-white rounded-lg shadow-md flex items-center gap-4 p-3 overflow-hidden animate-pulse sm:flex-col sm:items-stretch sm:p-0 sm:gap-0">
            <div class="w-16 h-16 rounded-full bg-gray-200 flex-shrink-0 sm:w-full sm:h-32 sm:rounded-b-none sm:rounded-t-lg"></div>
            <div class="flex-1 space-y-3 sm:p-4">
                <div class="h-4 bg-gray-200 rounded w-3/4"></div>
                <div class="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
        </div>
        `;return t}function ci(e){return e.length===0?'<p class="col-span-full text-center text-gray-500 py-10">Nenhum profissional encontrado.</p>':e.map(t=>{const a=t.status==="inactive",s=v(t.name),r=v(t.specialty||"Especialidade"),o=t.photo||`https://placehold.co/100x100/E2E8F0/4A5568?text=${encodeURIComponent(t.name?t.name.charAt(0):"P")}`,n=JSON.stringify(t).replace(/'/g,"&apos;");return`
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
            </div>`}).join("")}function Zt(){const e=document.getElementById("genericModal");e.style.display="none",Be&&e.removeEventListener("click",Be)}async function ui(e){const t=document.getElementById("genericModal"),a=e.id?e:{name:"Novo Profissional",specialty:"",status:"active",workingHours:{},services:[]},s=v(a.name),r=m.services||await Ee(m.establishmentId),o=m.professionals||await X(m.establishmentId),n=`
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
        </div>`;t.innerHTML=n,t.style.display="flex",mi(a,r),pi(a),gi(a,o),fi(a)}function mi(e,t){const a=document.getElementById("professionalForm"),s=e.dob?e.dob.split("/"):["",""],r=Array.from({length:12},(y,S)=>{const I=S+1,$=I==s[1]?"selected":"",k=new Date(0,S).toLocaleString("pt-BR",{month:"long"});return`<option value="${I}" ${$}>${k.charAt(0).toUpperCase()+k.slice(1)}</option>`}).join(""),o=e.status||"active",n=v(e.name||""),i=v(e.specialty||""),l=v(e.phone||""),d=v(e.notes||"");a.innerHTML=`
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

        <div><label class="block text-sm font-medium text-gray-700">Serviços Realizados</label><div id="profServicesContainer" class="mt-2 grid grid-cols-2 md:grid-cols-3 gap-4 p-4 border rounded-md bg-white max-h-48 overflow-y-auto">${t.map(y=>`<label class="flex items-center space-x-2"><input type="checkbox" value="${y.id}" class="rounded" ${e.services?.includes(y.id)?"checked":""}><span>${v(y.name)}</span></label>`).join("")}</div></div>
        <div class="form-group"><label for="profNotes">Observações</label><textarea id="profNotes" rows="3" class="mt-1 w-full p-2 border rounded-md">${d}</textarea></div>`;const c=document.getElementById("profPhotoInput"),u=document.getElementById("profPhotoButton"),p=document.getElementById("profPhotoPreview"),g=document.getElementById("profPhotoBase64"),f=e.photo||`https://placehold.co/128x128/E2E8F0/4A5568?text=${encodeURIComponent(e.name?e.name.charAt(0):"P")}`,h=e.photo||"";u&&u.addEventListener("click",()=>c.click()),c&&(c.onchange=async()=>{const y=c.files[0];if(y){p.src="https://placehold.co/128x128/E2E8F0/4A5568?text=...";try{const S=await Vo(y,800,800,.8),$=S.length*3/4,k=1e3*1024;if($>k)throw new Error("A imagem é muito grande mesmo após a compressão.");p.src=S,g.value=S}catch(S){b("Erro de Imagem",S.message||"Não foi possível processar a imagem.","error"),p.src=f,g.value=h,c.value=""}}})}function pi(e){const t=document.getElementById("jornada");t.innerHTML='<div><h3 class="text-xl font-semibold mb-4">Jornada de Trabalho Semanal</h3><p class="text-sm text-gray-600 mb-4">Defina os horários de trabalho padrão para este profissional.</p><div id="profScheduleContainer" class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4"></div></div>',bi(t.querySelector("#profScheduleContainer"),e.workingHours||{})}async function gi(e,t){const a=document.getElementById("bloqueios");a.innerHTML=`
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
                <h3 class="text-xl font-semibold mb-4">Lançamento de Bloqueios</h3>
                <form id="batchBlockageForm" class="p-4 bg-white rounded-lg shadow-inner space-y-3 mb-4">
                    <h4 class="font-semibold text-gray-800">Selecione os Profissionais</h4>
                    <div id="batchProfSelectionContainer" class="max-h-32 overflow-y-auto p-2 border rounded-md space-y-2">
                        ${t.map(o=>`<label class="flex items-center"><input type="checkbox" name="batch-professionals" value="${o.id}" class="rounded mr-2" ${o.id===e.id?"checked":""}><span>${v(o.name)}</span></label>`).join("")}
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
                    <h3 class="text-xl font-semibold">Bloqueios de ${v(e.name)}</h3>
                    <select id="prof-blockages-filter" class="p-1 border rounded text-sm bg-white">
                        <option value="future">Futuros</option>
                        <option value="history">Histórico</option>
                    </select>
                </div>
                <div id="blockagesList" class="space-y-2 max-h-96 overflow-y-auto pr-2"></div>
            </div>
        </div>`;const s=document.getElementById("batchBlockageForm");s&&s.addEventListener("submit",async o=>{o.preventDefault();const n=Array.from(o.target.querySelectorAll('input[name="batch-professionals"]:checked')).map(g=>g.value);if(n.length===0)return b("Atenção","Selecione pelo menos um profissional.","error");const i=o.target.batchBlockageStartDate.value,l=o.target.batchBlockageEndDate.value||i,d=o.target.batchBlockageStartTime.value,c=o.target.batchBlockageEndTime.value,u=o.target.batchBlockageReason.value;if(!i||!d||!c)return b("Atenção","Preencha Data de Início, Início e Fim.","error");const p=n.map(g=>{const f={professionalId:g,establishmentId:m.establishmentId,startTime:new Date(`${i}T${d}`).toISOString(),endTime:new Date(`${l}T${c}`).toISOString(),reason:u};return Ht(f)});try{await Promise.all(p),b("Sucesso!",`${n.length} bloqueios foram criados.`);const g=document.getElementById("prof-blockages-filter").value;Ke(e.id,g)}catch(g){b("Erro",g.message,"error")}}),document.getElementById("prof-blockages-filter").addEventListener("change",o=>Ke(e.id,o.target.value)),await Ke(e.id,"future")}function bi(e,t){e.innerHTML=Object.keys(io).map(a=>{const s=t[a]||{},r=s.active!==!1;return`
            <div class="day-schedule-card p-3 rounded-lg ${r?"bg-white":"bg-gray-100 disabled"} border">
                 <div class="flex justify-between items-center"><span class="font-semibold text-gray-800">${io[a]}</span><label class="flex items-center cursor-pointer"><div class="relative"><input type="checkbox" data-day="${a}" data-field="active" class="sr-only" ${r?"checked":""}><div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full"></div></div></label></div>
                <div class="time-inputs grid grid-cols-2 gap-2 mt-2 text-sm">
                    <div><label>Início:</label><input type="time" data-day="${a}" data-field="start" value="${s.start||"09:00"}" class="w-full p-1 border rounded" ${r?"":"disabled"}></div>
                    <div><label>Fim:</label><input type="time" data-day="${a}" data-field="end" value="${s.end||"18:00"}" class="w-full p-1 border rounded" ${r?"":"disabled"}></div>
                    <div><label>Intervalo:</label><input type="time" data-day="${a}" data-field="breakStart" value="${s.breakStart||"12:00"}" class="w-full p-1 border rounded" ${r?"":"disabled"}></div>
                    <div><label>Fim Int.:</label><input type="time" data-day="${a}" data-field="breakEnd" value="${s.breakEnd||"13:00"}" class="w-full p-1 border rounded" ${r?"":"disabled"}></div>
                </div>
            </div>`}).join(""),e.querySelectorAll('input[type="checkbox"][data-field="active"]').forEach(a=>{a.addEventListener("change",s=>{const r=s.target.closest(".day-schedule-card"),o=!s.target.checked;r.classList.toggle("bg-white",!o),r.classList.toggle("bg-gray-100",o),r.classList.toggle("disabled",o),r.querySelectorAll(".time-inputs input").forEach(n=>n.disabled=o)})})}async function Ke(e,t="future"){const a=document.getElementById("blockagesList");if(a){a.innerHTML='<div class="loader mx-auto"></div>';try{const s=new Date;let r,o;t==="history"?(o=new Date,r=new Date,r.setFullYear(r.getFullYear()-2)):(r=new Date,o=new Date,o.setFullYear(o.getFullYear()+2));let i=(await jt(m.establishmentId,r.toISOString(),o.toISOString(),e)).map(d=>({...d,startTime:new Date(d.startTime),endTime:new Date(d.endTime)}));t==="history"?i=i.filter(d=>d.endTime<s).sort((d,c)=>c.startTime-d.startTime):i=i.filter(d=>d.endTime>=s).sort((d,c)=>d.startTime-c.startTime);const l=i.reduce((d,c)=>{const u=c.reason||"Sem motivo";return d[u]||(d[u]=[]),d[u].push(c),d},{});if(Object.keys(l).length===0){a.innerHTML=`<p class="text-center text-gray-500 text-sm py-4">Nenhum bloqueio ${t==="history"?"no histórico":"futuro"}.</p>`;return}a.innerHTML=Object.entries(l).map(([d,c])=>`
            <div class="bg-gray-100 rounded-lg p-3 my-2 space-y-2">
                <div class="flex justify-between items-center pb-2 border-b">
                    <h4 class="font-bold text-gray-700">${v(d)} (${c.length})</h4>
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
        `).join("")}catch(s){a.innerHTML=`<p class="text-red-500">${s.message}</p>`}}}function fi(e){const t=document.getElementById("genericModal");Be&&t.removeEventListener("click",Be),Be=async a=>{const s=a.target.closest("button[data-action]");if(!s){const o=a.target.closest(".tab-link");o&&(t.querySelectorAll(".tab-link").forEach(n=>n.classList.remove("active")),o.classList.add("active"),t.querySelectorAll(".tab-content").forEach(n=>n.classList.add("hidden")),document.getElementById(o.dataset.tab).classList.remove("hidden"));return}const r=s.dataset.action;switch(a.stopPropagation(),r){case"close-modal":Zt();break;case"delete-professional":const o=s.dataset.id;if(await j("Excluir Profissional",`Tem certeza que deseja excluir ${e.name}? Esta ação não pode ser desfeita.`))try{await Mo(o),b("Sucesso!","Profissional excluído.","success"),Zt(),Tt()}catch(h){b("Erro",`Não foi possível excluir: ${h.message}`,"error")}break;case"save-professional":const i=document.getElementById("professionalForm"),l=s,d=document.getElementById("profScheduleContainer"),c=Array.from(i.querySelectorAll("#profServicesContainer input:checked")).map(h=>h.value),u={};d&&d.querySelectorAll(".day-schedule-card").forEach(h=>{const y=h.querySelector('[data-field="active"]').dataset.day;u[y]={active:h.querySelector('[data-field="active"]').checked,start:h.querySelector('[data-field="start"]').value,end:h.querySelector('[data-field="end"]').value,breakStart:h.querySelector('[data-field="breakStart"]').value,breakEnd:h.querySelector('[data-field="breakEnd"]').value}});const p={...e,id:i.querySelector("#professionalId").value||void 0,name:i.querySelector("#profName").value,specialty:i.querySelector("#profSpecialty").value,photo:i.querySelector("#profPhotoBase64").value,services:c,workingHours:u,phone:i.querySelector("#profPhone").value,dob:`${i.querySelector("#profDobDay").value}/${i.querySelector("#profDobMonth").value}`,receivesCommission:i.querySelector("#profCommission").value==="sim",showOnAgenda:i.querySelector("#profShowOnAgenda").value==="sim",orderOnAgenda:parseInt(i.querySelector("#profOrderOnAgenda").value)||1,notes:i.querySelector("#profNotes").value,status:i.querySelector("#profStatus").value,establishmentId:m.establishmentId};l.disabled=!0,l.textContent="A salvar...";try{p.id?(await It(p.id,p),b("Sucesso!","Profissional atualizado.","success")):(delete p.id,await Do(p),b("Sucesso!","Profissional criado.","success")),Zt(),Tt()}catch(h){b("Erro",h.message,"error"),l.disabled=!1,l.textContent="Salvar"}break;case"delete-blockage":const g=s.dataset.id;if(await j("Apagar Bloqueio","Tem certeza?"))try{await Ca(g),b("Bloqueio removido.","success");const h=document.getElementById("prof-blockages-filter")?document.getElementById("prof-blockages-filter").value:"future";Ke(e.id,h)}catch(h){b("Erro",h.message,"error")}break;case"batch-delete-blockage":const f=JSON.parse(s.dataset.ids);if(await j("Apagar em Lote",`Tem certeza que deseja apagar ${f.length} bloqueios com este motivo?`))try{await Oo(f),b("Bloqueios removidos.","success");const h=document.getElementById("prof-blockages-filter")?document.getElementById("prof-blockages-filter").value:"future";Ke(e.id,h)}catch(h){b("Erro",h.message,"error")}break}},t.addEventListener("click",Be)}function ba(){const e=document.getElementById("batch-actions-container"),t=document.getElementById("selected-count");!e||!t||(se.size>0?(t.textContent=`${se.size} selecionado(s)`,e.classList.remove("hidden")):e.classList.add("hidden"))}function vi(){j("Excluir em Lote",`Tem certeza que deseja excluir ${se.size} profissionais? Esta ação não pode ser desfeita.`).then(async e=>{if(e)try{await er(Array.from(se)),b("Sucesso!",`${se.size} profissionais foram excluídos.`,"success"),se.clear(),ba(),Tt()}catch(t){b("Erro",`Não foi possível excluir em lote: ${t.message}`,"error")}})}function Ue(){const e=document.getElementById("professionalsList");if(!e)return;if(!m.professionals){e.className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 pb-20",e.innerHTML=di();return}const t=document.getElementById("showInactiveProfToggle").checked,a=document.getElementById("profSearchInput").value.toLowerCase(),s=m.professionals.filter(r=>{const o=r.name.toLowerCase().includes(a),n=t||r.status!=="inactive";return o&&n});e.className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 pb-20",e.innerHTML=ci(s)}async function Tt(){se.clear(),Xt.innerHTML=`
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
        </section>`,pt&&Xt.removeEventListener("click",pt),pt=t=>{const a=t.target.closest('[data-action="open-professional-modal"]'),s=t.target.closest('[data-action="batch-delete"]');if(a){t.preventDefault();let o={};if(a.dataset.professional)try{o=JSON.parse(a.dataset.professional)}catch(n){console.error("Erro ao fazer parse do professional data:",n);return}ui(o);return}if(s){vi();return}const r=t.target.closest(".professional-checkbox");if(r){const o=r.dataset.id;r.checked?se.add(o):se.delete(o),Ue(),ba();return}},Xt.addEventListener("click",pt),document.getElementById("profSearchInput").addEventListener("input",Ue),document.getElementById("showInactiveProfToggle").addEventListener("change",Ue);const e=document.getElementById("professionalsList");m.professionals=null,m.services=null,Ue();try{const[t,a]=await Promise.all([X(m.establishmentId),Ee(m.establishmentId)]);m.professionals=t,m.services=a,Ue(),ba()}catch{e.innerHTML='<p class="text-red-500 col-span-full">Erro ao carregar dados da página.</p>'}}let B={clients:[],establishment:null,searchTimeout:null,currentClient:null,history:[],filters:{hasLoyalty:!1,birthMonth:"",inactiveDays:""},showFilters:!1,selectionMode:!1,selectedClients:new Set};const hi=e=>e?e.replace(/\D/g,""):"",Pt=e=>{if(!e)return"";const t=e.replace(/\D/g,"");return t.length>10?t.replace(/^(\d\d)(\d{5})(\d{4}).*/,"($1) $2-$3"):t.replace(/^(\d\d)(\d{4})(\d{0,4}).*/,"($1) $2-$3")},xi=e=>new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(e||0),fa=e=>{if(!e)return"-";try{const t=new Date(e);return isNaN(t.getTime())?"-":t.toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit",year:"2-digit",hour:"2-digit",minute:"2-digit"})}catch{return"-"}},yi=()=>{B.showFilters=!B.showFilters;const e=document.getElementById("filter-panel");e&&e.classList.toggle("hidden",!B.showFilters)},ns=()=>{B.selectionMode=!B.selectionMode,B.selectedClients.clear(),ds(),qa()},is=e=>{B.selectedClients.has(e)?B.selectedClients.delete(e):B.selectedClients.add(e),qa();const t=document.getElementById(`card-${e}`);if(t){const a=t.querySelector(".client-checkbox");a&&(a.checked=B.selectedClients.has(e)),B.selectedClients.has(e)?t.classList.add("ring-2","ring-indigo-500","bg-indigo-50"):t.classList.remove("ring-2","ring-indigo-500","bg-indigo-50")}},qa=()=>{const e=document.getElementById("header-normal"),t=document.getElementById("header-selection"),a=document.getElementById("selected-count");B.selectionMode?(e.classList.add("hidden"),t.classList.remove("hidden"),a&&(a.textContent=`${B.selectedClients.size} selecionado(s)`)):(e.classList.remove("hidden"),t.classList.add("hidden"))},wi=async()=>{const e=B.selectedClients.size;if(e!==0&&await j("Excluir Clientes",`Tem certeza que deseja excluir ${e} clientes selecionados? Esta ação não pode ser desfeita.`)){const t=document.getElementById("btn-bulk-delete");t&&(t.disabled=!0,t.textContent="Excluindo...");try{const a=Array.from(B.selectedClients).map(s=>zo(s));await Promise.all(a),b("Sucesso",`${e} clientes excluídos com sucesso!`,"success"),ns(),pe()}catch(a){console.error(a),b("Erro","Ocorreu um erro ao excluir alguns clientes.","error"),t&&(t.disabled=!1,t.textContent="Excluir")}}},ki=()=>{const e=document.getElementById("filter-loyalty"),t=document.getElementById("filter-month"),a=document.getElementById("filter-inactive");B.filters.hasLoyalty=e?e.checked:!1,B.filters.birthMonth=t?t.value:"",B.filters.inactiveDays=a?a.value:"",pe()},Si=()=>{const e=document.getElementById("filter-loyalty"),t=document.getElementById("filter-month"),a=document.getElementById("filter-inactive");e&&(e.checked=!1),t&&(t.value=""),a&&(a.value=""),B.filters={hasLoyalty:!1,birthMonth:"",inactiveDays:""},pe()},ls=async(e=null)=>{B.currentClient=e;const t=!e;if(_({title:"",contentHTML:(s=>`
        <div class="h-[80vh] flex flex-col bg-gray-50 rounded-lg overflow-hidden">
            <div class="bg-white border-b px-6 py-4 flex justify-between items-center shrink-0">
                <div>
                    <h2 class="text-xl font-bold text-gray-800">${t?"Novo Cliente":s.name||"Cliente"}</h2>
                    ${t?"":`<p class="text-sm text-gray-500">${Pt(s.phone)}</p>`}
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
    `)(e||{}),maxWidth:"max-w-3xl"}),window.switchTab=s=>va(s,t),window.handleSave=$i,window.handleDelete=Ei,!t&&e.id)try{const s=await(void 0)(e.id);if(s){B.currentClient=s;const r=document.querySelector(".bg-indigo-100.text-indigo-700");r&&(r.textContent=`${s.loyaltyPoints||0} pts`)}B.history=await Lr(m.establishmentId,e.phone)}catch(s){console.error("Erro ao carregar dados frescos do cliente",s),B.history=[]}va("details",t)},va=(e,t)=>{const a=document.getElementById("modal-body");if(!a)return;document.querySelectorAll('[id^="tab-btn-"]').forEach(o=>{o.classList.remove("border-indigo-600","text-indigo-600"),o.classList.add("border-transparent","text-gray-500")});const s=document.getElementById(`tab-btn-${e}`);s&&(s.classList.add("border-indigo-600","text-indigo-600"),s.classList.remove("border-transparent","text-gray-500"));const r=B.currentClient||{};if(e==="details"){if(a.innerHTML=`
            <form id="form-client" class="space-y-4 max-w-lg mx-auto">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                    <input type="text" name="name" value="${r.name||""}" class="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500 outline-none" required>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Telefone (WhatsApp)</label>
                    <input type="tel" name="phone" id="input-phone" value="${Pt(r.phone)}" 
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
        `,t){const o=document.getElementById("input-phone");o&&(o.oninput=n=>n.target.value=Pt(n.target.value))}}else if(e==="appointments"){const o=new Date,n=B.history.filter(i=>{const l=new Date(i.date);return i.type==="appointment"&&l>=o&&i.status!=="cancelled"});if(n.sort((i,l)=>new Date(i.date)-new Date(l.date)),!n.length){a.innerHTML=`<div class="text-center py-10">
                <p class="text-gray-400 mb-4">Nenhum agendamento futuro.</p>
                <button onclick="document.getElementById('genericModal').style.display='none'; navigateTo('agenda-section')" class="text-indigo-600 font-bold hover:underline">Ir para Agenda</button>
            </div>`;return}a.innerHTML=`
            <div class="space-y-3">
                ${n.map(i=>`
                    <div class="flex items-center justify-between p-4 border-l-4 border-indigo-500 bg-white shadow-sm rounded-r-lg hover:shadow-md transition-shadow">
                        <div>
                            <p class="font-bold text-gray-800">${i.description}</p>
                            <p class="text-sm text-gray-600 mt-1">
                                📅 ${fa(i.date)}
                            </p>
                            <span class="text-xs bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded mt-2 inline-block">Agendado</span>
                        </div>
                        <button onclick="document.getElementById('genericModal').style.display='none'; navigateTo('agenda-section', { targetDate: '${i.date}', scrollToAppointmentId: '${i.id}' })" class="p-2 text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors group" title="Ver na Agenda">
                            <svg class="w-6 h-6 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 12h14"/></svg>
                        </button>
                    </div>
                `).join("")}
            </div>
        `}else if(e==="history"){const o=[...B.history].sort((n,i)=>new Date(i.date)-new Date(n.date));if(!o.length){a.innerHTML='<div class="text-center text-gray-400 mt-10">Histórico vazio.</div>';return}a.innerHTML=`
            <div class="space-y-3">
                ${o.map(n=>{const i=n.sourceId||n.id,l=n.type==="sale"||n.type==="appointment"&&n.status==="completed";return`
                    <div ${l?`onclick="document.getElementById('genericModal').style.display='none'; navigateTo('comandas-section', { selectedAppointmentId: '${i}' })"`:""} class="flex items-center justify-between p-3 border rounded bg-white ${l?"cursor-pointer hover:bg-indigo-50 hover:border-indigo-300 shadow-sm":"hover:bg-gray-50"} transition-all">
                        <div class="flex items-center gap-3">
                            <div class="p-2 rounded-full ${n.type==="sale"?"bg-green-100 text-green-600":n.type==="loyalty"?"bg-purple-100 text-purple-600":"bg-blue-100 text-blue-600"}">
                                <span class="text-xs font-bold uppercase">${n.type.substring(0,1)}</span>
                            </div>
                            <div>
                                <p class="text-sm font-bold text-gray-800">${n.description}</p>
                                <div class="flex gap-2 items-center text-xs text-gray-500">
                                    <span>${fa(n.date)}</span>
                                    ${n.status?`<span>• ${n.status}</span>`:""}
                                </div>
                            </div>
                        </div>
                        <div class="text-right">
                             <span class="block text-sm font-bold ${n.isPoints?"text-purple-600":"text-gray-700"}">
                                ${n.isPoints?n.value>0?`+${n.value} pts`:`${n.value} pts`:xi(n.value)}
                             </span>
                             ${l?'<span class="text-[10px] text-indigo-500 font-medium">Ver Detalhes</span>':""}
                        </div>
                    </div>
                `}).join("")}
            </div>
        `}else if(e==="loyalty"){const o=B.establishment.loyaltyProgram;if(!o||!o.enabled){a.innerHTML='<div class="text-center text-gray-400 mt-10">Programa de fidelidade não ativo neste estabelecimento.</div>';return}const n=r.loyaltyPoints||0,i=o.type==="visit"?`Regra: Ganhe ${o.pointsPerVisit||1} pontos a cada visita`:`Regra: Ganhe 1 ponto a cada R$ ${o.pointsPerCurrency||10}`,l=o.tiers||o.rewards||[];a.innerHTML=`
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
                ${l.map(d=>{const c=d.costPoints||d.points||0,u=n>=c,p=d.reward||d.name;return`
                        <div class="flex justify-between items-center p-3 border rounded ${u?"bg-green-50 border-green-200":"bg-gray-50 opacity-70"}">
                            <div>
                                <p class="font-bold text-gray-800">${escapeHTML(p)}</p>
                                <p class="text-xs text-gray-500">${c} pontos necessários</p>
                            </div>
                            <button onclick="window.handleRedeem('${c}', '${escapeHTML(p)}')" ${u?"":"disabled"} 
                                class="px-3 py-1 rounded text-xs font-bold ${u?"bg-green-600 text-white hover:bg-green-700":"bg-gray-300 text-gray-500 cursor-not-allowed"}">
                                Resgatar
                            </button>
                        </div>
                    `}).join("")}
                ${l.length===0?'<p class="text-center text-gray-500 text-sm">Nenhum prémio cadastrado.</p>':""}
            </div>
        `,window.handleRedeem=async(d,c)=>{if(await j("Resgatar",`Trocar ${d} pontos por "${c}"?`))try{await Tr(m.establishmentId,r.phone,d,c),b("Sucesso","Resgate realizado!","success"),r.loyaltyPoints=(r.loyaltyPoints||0)-parseInt(d),B.history.unshift({type:"loyalty",description:`Resgate: ${c}`,date:new Date().toISOString(),value:-d,isPoints:!0,status:"completed"}),va("loyalty",!1),pe()}catch(u){b("Erro",u.message||"Erro ao resgatar","error")}}}},$i=async()=>{const e=document.getElementById("form-client"),t=new FormData(e),a=t.get("phone").replace(/\D/g,"");if(a.length<10){b("Erro","Telefone inválido","error");return}const s={name:t.get("name"),phone:a,email:t.get("email"),birthDate:t.get("birthDate"),notes:t.get("notes"),establishmentId:m.establishmentId};try{await Cr(s),b("Sucesso","Cliente salvo!","success"),document.getElementById("genericModal").style.display="none",pe()}catch(r){b("Erro","Erro ao salvar cliente","error"),console.error(r)}},Ei=async()=>{if(await j("Excluir","Tem certeza? Isso apagará o histórico deste cliente."))try{const e=hi(B.currentClient.phone);await zo(e),b("Sucesso","Cliente removido","success"),document.getElementById("genericModal").style.display="none",pe()}catch(e){b("Erro","Erro ao remover","error"),console.error(e)}},ds=()=>{const e=document.getElementById("clients-grid");if(e){if(e.innerHTML="",B.clients.length===0){e.innerHTML=`
            <div class="col-span-full flex flex-col items-center justify-center py-20 text-gray-400">
                <svg class="w-16 h-16 mb-4 opacity-20" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path></svg>
                <p class="text-lg">Nenhum cliente encontrado.</p>
                <div class="mt-2 text-sm text-gray-500">
                    <button onclick="window.openNewClient()" class="text-indigo-600 font-bold hover:underline">Cadastrar novo</button>
                </div>
            </div>
        `;return}B.clients.forEach(t=>{const a=document.createElement("div"),s=B.selectedClients.has(t.phone);a.id=`card-${t.phone}`,a.className=`bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-all cursor-pointer flex items-center justify-between group relative ${s?"ring-2 ring-indigo-500 bg-indigo-50":""}`,a.onclick=n=>{n.target.type!=="checkbox"&&(B.selectionMode?is(t.phone):ls(t))};let r="Nunca visitou";if(t.lastVisit){const n=fa(t.lastVisit);n!=="-"&&(r=`Última visita: ${n.split(" ")[0]}`)}const o=B.selectionMode?`
            <div class="absolute top-2 left-2 z-10" onclick="event.stopPropagation()">
                <input type="checkbox" class="client-checkbox w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500" 
                    ${s?"checked":""} 
                    onchange="window.toggleClientSelection('${t.phone}')">
            </div>
        `:"";a.innerHTML=`
            ${o}
            <div class="flex items-center gap-4 ${B.selectionMode?"ml-6":""}">
                <div class="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow shrink-0">
                    ${t.name.charAt(0).toUpperCase()}
                </div>
                <div>
                    <h3 class="font-bold text-gray-800 text-sm md:text-base group-hover:text-indigo-600 transition-colors line-clamp-1">${t.name}</h3>
                    <p class="text-xs text-gray-500">${Pt(t.phone)}</p>
                    <p class="text-[10px] text-gray-400 mt-1 flex items-center gap-1">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        ${r}
                    </p>
                </div>
            </div>
            <div class="text-right">
                <span class="block text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg">
                    ${t.loyaltyPoints||0} pts
                </span>
            </div>
        `,e.appendChild(a)})}},pe=async(e="")=>{const t=document.getElementById("clients-grid");t&&(t.innerHTML='<div class="col-span-full flex justify-center py-10"><div class="loader"></div></div>');const a=e||document.getElementById("search-input")?.value||"";try{if(B.clients=await He(m.establishmentId,a,100,B.filters),B.filters.inactiveDays){const s=parseInt(B.filters.inactiveDays,10);if(!isNaN(s)&&s>0){const r=new Date,o=new Date(r.setDate(r.getDate()-s));B.clients=B.clients.filter(n=>{if(!n.lastVisit)return!0;const i=new Date(n.lastVisit);return isNaN(i.getTime())?!0:i<o})}}ds(),qa()}catch(s){console.error(s),t&&(t.innerHTML='<p class="col-span-full text-center text-red-500">Erro ao carregar lista.</p>')}},Ii=async()=>{const e=document.getElementById("content");e.innerHTML=`
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
    `,window.openNewClient=()=>ls(null),window.toggleFilterPanel=yi,window.toggleSelectionMode=ns,window.toggleClientSelection=is,window.handleBulkDelete=wi,window.applyFilters=ki,window.clearFilters=Si;const t=document.getElementById("search-input");t&&t.addEventListener("input",a=>{clearTimeout(B.searchTimeout),B.searchTimeout=setTimeout(()=>{pe(a.target.value)},400)});try{const[a]=await Promise.all([$e(m.establishmentId),pe()]);B.establishment=a}catch(a){console.error("Erro inicialização clientes",a)}},rt=e=>w(`/api/financial/natures/${e}`),Ci=e=>w("/api/financial/natures",{method:"POST",body:JSON.stringify(e)}),Li=e=>w(`/api/financial/natures/${e}`,{method:"DELETE"}),nt=e=>w(`/api/financial/cost-centers/${e}`),Ti=e=>w("/api/financial/cost-centers",{method:"POST",body:JSON.stringify(e)}),Pi=e=>w(`/api/financial/cost-centers/${e}`,{method:"DELETE"}),cs=(e,t)=>w(`/api/financial/${e}`,{method:"POST",body:JSON.stringify(t)}),us=(e,t={})=>{let a=`/api/financial/${e}`;const s=new URLSearchParams;t.establishmentId&&s.append("establishmentId",t.establishmentId),t.startDate&&s.append("startDate",t.startDate),t.endDate&&s.append("endDate",t.endDate),t.natureId&&s.append("natureId",t.natureId),t.costCenterId&&s.append("costCenterId",t.costCenterId),t.status&&s.append("status",t.status);const r=s.toString();return r&&(a+=`?${r}`),w(a)},ms=(e,t,a)=>w(`/api/financial/${e}/${t}`,{method:"PUT",body:JSON.stringify(a)}),ps=(e,t)=>w(`/api/financial/${e}/${t}`,{method:"DELETE"}),gs=(e,t,a)=>w(`/api/financial/${e}/${t}/status`,{method:"PATCH",body:JSON.stringify({status:"paid",paymentDate:a})}),Bi=e=>cs("payables",e),Di=e=>us("payables",e),Mi=(e,t)=>ms("payables",e,t),Ai=e=>ps("payables",e),Ni=(e,t)=>gs("payables",e,t),qi=e=>cs("receivables",e),Ri=e=>us("receivables",e),Fi=(e,t)=>ms("receivables",e,t),ji=e=>ps("receivables",e),Hi=(e,t)=>gs("receivables",e,t),Oi=(e,t,a)=>w(`/api/financial/cash-flow?establishmentId=${e}&startDate=${t}&endDate=${a}`),zi=e=>w(`/api/financial/today-summary/${e}`),xe=document.getElementById("content"),Kt={monday:"Segunda",tuesday:"Terça",wednesday:"Quarta",thursday:"Quinta",friday:"Sexta",saturday:"Sábado",sunday:"Domingo"},Vi={indigo:{name:"Padrão (Índigo)",main:"#4f46e5"},blue:{name:"Azul",main:"#2563eb"},sky:{name:"Céu",main:"#0284c7"},teal:{name:"Verde Água",main:"#0d9488"},emerald:{name:"Esmeralda",main:"#059669"},green:{name:"Verde",main:"#16a34a"},lime:{name:"Lima",main:"#65a30d"},amber:{name:"Âmbar",main:"#d97706"},orange:{name:"Laranja",main:"#ea580c"},red:{name:"Vermelho",main:"#dc2626"},rose:{name:"Rosa",main:"#e11d48"},pink:{name:"Pink",main:"#db2777"},fuchsia:{name:"Fúcsia",main:"#c026d3"},purple:{name:"Roxo",main:"#7c3aed"},violet:{name:"Violeta",main:"#8b5cf6"},gray:{name:"Cinza",main:"#4b5563"},black:{name:"Preto",main:"#111827"}},bs=[{id:"personal-data",icon:"M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",label:"Dados Gerais"},{id:"branding",icon:"M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z",label:"Identidade e Cores"},{id:"booking",icon:"M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2H5a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",label:"Agendamento Online"},{id:"working-hours",icon:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",label:"Horário de Funcionamento"},{id:"loyalty",icon:"M5 5a2 2 0 012-2h10a2 2 0 012 2v1h2a1 1 0 011 1v3a1 1 0 01-1 1h-2v1a2 2 0 01-2 2H7a2 2 0 01-2-2v-1H3a1 1 0 01-1-1V7a1 1 0 011-1h2V5z",label:"Plano de Fidelidade"},{id:"financial",icon:"M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8a1 1 0 011 1v4a1 1 0 11-2 0v-4a1 1 0 011-1zm0 0a1 1 0 001-1V5a1 1 0 10-2 0v2a1 1 0 001 1zm0 0a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1z",label:"Integração Financeira"},{id:"change-password",icon:"M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",label:"Alterar senha"},{id:"change-email",icon:"M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207",label:"Alterar E-mail de Acesso"},{id:"support",icon:"M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z",label:"Suporte e Ajuda"},{id:"cancellation",icon:"M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z",label:"Cancelar Assinatura"}];let W=null;function lo(e,t,a){return new Promise((s,r)=>{const o=new FileReader;o.readAsDataURL(e),o.onload=n=>{const i=new Image;i.src=n.target.result,i.onload=()=>{const l=document.createElement("canvas");let d=i.width,c=i.height;d>t&&(c*=t/d,d=t),l.width=d,l.height=c,l.getContext("2d").drawImage(i,0,0,d,c);const p=e.type==="image/png"&&t<500?"image/png":"image/jpeg";s(l.toDataURL(p,a))},i.onerror=l=>r(l)},o.onerror=n=>r(n)})}function Le(e,t=null){let a='<option value="">-- Selecione (Opcional) --</option>';const s=n=>{const i=new Map,l=[];return n&&(n.forEach(d=>i.set(d.id,{...d,children:[]})),i.forEach(d=>{d.parentId&&i.has(d.parentId)?i.get(d.parentId).children.push(d):l.push(d)})),l},r=(n,i="")=>{const l=n.id===t?"selected":"";a+=`<option value="${n.id}" ${l}>${i}${v(n.name)}</option>`,n.children.forEach(d=>r(d,i+"— "))};return s(e).forEach(n=>r(n)),a}async function Oe(e,t){const a=t.target.querySelector('button[type="submit"]');a&&(a.disabled=!0,a.textContent="A Salvar...");try{const s=W||await $e(m.establishmentId),r=[],{ownerName:o,...n}=e;if(o&&o!==m.userName){const l=V.currentUser;l&&r.push(Is(l,{displayName:o}).then(()=>{m.userName=o}))}const i={...s,...n};if(r.push(kt(m.establishmentId,i)),await Promise.all(r),W=i,b("Sucesso","Definições salvas com sucesso! A página será recarregada para aplicar o novo tema.","success"),n.themeColor)setTimeout(()=>window.location.reload(),1500);else{const l=document.getElementById("panelEstablishmentName");n.name&&l&&(l.textContent=n.name,m.establishmentName=n.name)}}catch(s){b("Erro",`Não foi possível salvar: ${s.message}`,"error")}finally{a&&(a.disabled=!1,a.textContent="Salvar")}}function Ui(e,t){const a=v(e.name||""),s=v(e.phone||""),r=v(e.document||""),o=v(e.email||""),n=v(e.address||""),i=v(e.website||""),l=v(m.userName||"");t.innerHTML=`
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
    `,t.querySelector("#personal-data-form").addEventListener("submit",d=>{d.preventDefault();const c={ownerName:t.querySelector("#ownerName").value,name:t.querySelector("#establishmentName").value,phone:t.querySelector("#establishmentPhone").value,document:t.querySelector("#establishmentCnpjCpf").value,email:t.querySelector("#establishmentEmail").value,address:t.querySelector("#establishmentAddress").value,website:t.querySelector("#establishmentWebsite").value};Oe(c,d)})}function _i(e,t){t.innerHTML=`
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
    `,t.querySelector("#change-password-form").addEventListener("submit",async a=>{a.preventDefault();const s=t.querySelector("#newPassword").value,r=t.querySelector("#confirmPassword").value;if(s!==r){b("Erro","As senhas não coincidem.","error");return}const o=t.querySelector('button[form="change-password-form"]');o.disabled=!0,o.textContent="A Salvar...";try{const n=V.currentUser;if(n)await Es(n,s),b("Sucesso","Senha alterada com sucesso!","success"),a.target.reset();else throw new Error("Nenhum usuário autenticado encontrado.")}catch(n){b("Erro",`Não foi possível alterar a senha: ${n.message}`,"error")}finally{o.disabled=!1,o.textContent="Salvar Nova Senha"}})}function Ji(e,t){t.innerHTML=`
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
    `,t.querySelector("#change-email-form").addEventListener("submit",async a=>{a.preventDefault();const s=t.querySelector("#newEmail").value,r=t.querySelector("#currentPassword").value;if(!s||!r){b("Erro","Preencha todos os campos.","error");return}const o=t.querySelector('button[form="change-email-form"]');o.disabled=!0,o.textContent="A verificar...";try{const n=V.currentUser;if(!n)throw new Error("Usuário não autenticado.");const i=ks.credential(n.email,r);await Ss(n,i),o.textContent="A enviar link...",await $s(n,s),o.textContent="A atualizar BD...",await Zs(m.establishmentId,s),b("Sucesso","Link de verificação enviado! Por favor, verifique seu **novo e-mail** para confirmar a alteração.","success"),a.target.reset()}catch(n){let i="Não foi possível alterar o e-mail.";n.code==="auth/wrong-password"?i="A senha atual está incorreta.":n.code==="auth/email-already-in-use"?i="Este e-mail já está sendo usado por outra conta.":n.code==="auth/operation-not-allowed"?i="A troca de e-mail precisa ser habilitada no console do Firebase.":i=n.message,b("Erro",i,"error")}finally{o.disabled=!1,o.textContent="Salvar Novo E-mail"}})}function Wi(e,t){const a=v(e.welcomeMessage||"");t.innerHTML=`
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
    `,t.querySelector("#establishmentLogoBase64").value=e.logo||"",t.querySelector("#establishmentBackgroundImageBase64").value=e.backgroundImage||"",fs(e.themeColor||"indigo",t),t.querySelector("#establishmentLogoButton").onclick=()=>t.querySelector("#establishmentLogoInput").click(),t.querySelector("#establishmentLogoInput").onchange=async s=>{const r=s.target.files[0];if(r)try{const o=await lo(r,300,.9);t.querySelector("#establishmentLogoPreview").src=o,t.querySelector("#establishmentLogoBase64").value=o}catch(o){console.error("Erro ao processar logo:",o),b("Erro","Formato de imagem inválido ou corrompido.","error")}},t.querySelector("#establishmentBgButton").onclick=()=>t.querySelector("#establishmentBgInput").click(),t.querySelector("#establishmentBgInput").onchange=async s=>{const r=s.target.files[0];if(r){const o=t.querySelector("#establishmentBgButton"),n=o.textContent;try{o.textContent="A processar...",o.disabled=!0;const i=await lo(r,1280,.7);t.querySelector("#establishmentBgPreview").src=i,t.querySelector("#establishmentBgPreview").classList.remove("hidden"),t.querySelector("#establishmentBgPlaceholder").classList.add("hidden"),t.querySelector("#establishmentBackgroundImageBase64").value=i}catch(i){console.error("Erro ao processar fundo:",i),b("Erro","Não foi possível processar esta imagem. Tente outra.","error")}finally{o.textContent=n,o.disabled=!1}}},t.querySelector("#establishmentBgRemoveBtn").onclick=()=>{t.querySelector("#establishmentBgPreview").src="",t.querySelector("#establishmentBgPreview").classList.add("hidden"),t.querySelector("#establishmentBgPlaceholder").classList.remove("hidden"),t.querySelector("#establishmentBackgroundImageBase64").value=""},t.querySelector("#branding-form").addEventListener("submit",s=>{s.preventDefault();const r={logo:t.querySelector("#establishmentLogoBase64").value,welcomeMessage:t.querySelector("#establishmentWelcomeMessage").value,backgroundImage:t.querySelector("#establishmentBackgroundImageBase64").value,primaryColor:t.querySelector("#establishmentPrimaryColorInput").value,textColor:t.querySelector("#establishmentTextColorInput").value,themeColor:t.querySelector("#establishmentThemeColor").value};Oe(r,s)})}function Gi(e,t){const a=e.urlId||m.establishmentId,s="https://www.kairosagenda.com.br";let r=window.location.origin;(r.includes("localhost")||r.includes("capacitor://")||r.includes("127.0.0.1")||r.includes("192.168"))&&(r=s);const o=v(`${r}/agendar?id=${a}`),n=e.publicBookingEnabled||!1,i=n?"Agendamento Online ATIVO":"Agendamento Online INATIVO",l=n?"text-green-600":"text-red-600";t.innerHTML=`
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
    `,t.querySelector("#copyBookingLinkBtn").addEventListener("click",()=>{const d=t.querySelector("#publicBookingLink");if(navigator.clipboard&&window.isSecureContext)navigator.clipboard.writeText(d.value).then(()=>{b("Sucesso","Link copiado para a área de transferência!","success")}).catch(c=>{b("Erro","Não foi possível copiar o link.","error")});else try{d.select(),document.execCommand("copy"),d.blur(),b("Sucesso","Link copiado para a área de transferência!","success")}catch{b("Erro","Não foi possível copiar o link. Por favor, copie manualmente.","error")}}),t.querySelector("#publicBookingToggle").addEventListener("change",async d=>{const c=d.target.checked,u=t.querySelector("#publicBookingStatusText");c?(u.textContent="Agendamento Online ATIVO",u.className="text-sm font-semibold text-green-600"):(u.textContent="Agendamento Online INATIVO",u.className="text-sm font-semibold text-red-600");try{d.target.disabled=!0,await Xs(m.establishmentId,c),W.publicBookingEnabled=c,b("Sucesso",`Agendamento online ${c?"ativado":"desativado"}!`,"success")}catch(p){b("Erro",`Não foi possível alterar o status: ${p.message}`,"error"),d.target.checked=!c,c?(u.textContent="Agendamento Online ATIVO",u.className="text-sm font-semibold text-green-600"):(u.textContent="Agendamento Online INATIVO",u.className="text-sm font-semibold text-red-600")}finally{d.target.disabled=!1}}),tl(e.slotInterval||30,t),t.querySelector("#booking-form").addEventListener("submit",d=>{d.preventDefault();const c={slotInterval:parseInt(t.querySelector("#establishmentSlotInterval").value,10)};Oe(c,d)})}function Yi(e,t){t.innerHTML=`
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
    `;const a=t.querySelector("#establishmentTimezone");if(e.timezone)a.value=e.timezone;else try{const o=Intl.DateTimeFormat().resolvedOptions().timeZone;Array.from(a.options).some(i=>i.value===o)?a.value=o:a.value="America/Sao_Paulo"}catch{a.value="America/Sao_Paulo"}const s=t.querySelector("#establishmentWorkingHoursContainer"),r=e.workingHours||{};Object.keys(Kt).forEach(o=>{const n=r[o]||{},i=Kt[o],l=n.active!==!1,d=document.createElement("div");d.className=`day-schedule-card p-4 rounded-lg ${l?"bg-gray-50":"bg-gray-100 disabled"}`,d.innerHTML=`
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
            </div>`,s.appendChild(d)}),s.addEventListener("change",o=>{const n=o.target.closest('.day-schedule-card input[type="checkbox"]');n&&n.closest(".day-schedule-card").classList.toggle("disabled",!n.checked)}),t.querySelector("#working-hours-form").addEventListener("submit",o=>{o.preventDefault();const n={};Object.keys(Kt).forEach(l=>{n[l]={active:t.querySelector(`#est-${l}-active`).checked,start:t.querySelector(`#est-${l}-start`).value,end:t.querySelector(`#est-${l}-end`).value,breakStart:t.querySelector(`#est-${l}-breakStart`).value,breakEnd:t.querySelector(`#est-${l}-breakEnd`).value}});const i=t.querySelector("#establishmentTimezone").value;Oe({workingHours:n,timezone:i},o)})}function Qi(e,t){const a=e.loyaltyProgram||{},s=a.type||"amount",r=a.pointsPerCurrency||10,o=a.pointsPerVisit||1;t.innerHTML=`
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
    `,t.querySelector("#loyaltyEnabled").checked=a.enabled||!1;const n=t.querySelectorAll('input[name="loyaltyType"]'),i=t.querySelector("#loyalty-config-amount"),l=t.querySelector("#loyalty-config-visit");n.forEach(u=>{u.addEventListener("change",p=>{const g=p.target.value;n.forEach(f=>{const h=f.closest("label");f.checked?h.classList.add("border-indigo-500","bg-indigo-50","ring-1","ring-indigo-500"):h.classList.remove("border-indigo-500","bg-indigo-50","ring-1","ring-indigo-500")}),g==="amount"?(i.classList.remove("hidden"),l.classList.add("hidden")):(i.classList.add("hidden"),l.classList.remove("hidden"))})});const d=t.querySelector("#loyaltyTiersContainer"),c=(u={})=>{const p=document.createElement("div"),g=v(u.reward||"");return p.className="loyalty-tier-row group bg-white md:bg-transparent p-3 md:p-0 border md:border-0 rounded-lg shadow-sm md:shadow-none relative",p.innerHTML=`
            <div class="mb-2 md:mb-0">
                <label class="md:hidden text-xs font-bold text-gray-500 mb-1 block">Custo em Pontos</label>
                <div class="relative">
                    <input type="number" placeholder="Ex: 100" data-field="points" value="${u.points||""}" class="w-full p-2 pl-2 border rounded-md font-semibold text-gray-800">
                    <span class="md:hidden absolute right-3 top-2 text-xs text-gray-400">pts</span>
                </div>
            </div>
            <div class="mb-2 md:mb-0">
                <label class="md:hidden text-xs font-bold text-gray-500 mb-1 block">Descrição do Prémio</label>
                <input type="text" placeholder="Ex: Corte de Cabelo Grátis" data-field="reward" value="${g}" class="w-full p-2 border rounded-md">
            </div>
            <div class="mb-2 md:mb-0">
                <label class="md:hidden text-xs font-bold text-gray-500 mb-1 block">Desconto (R$)</label>
                <div class="flex items-center relative">
                    <span class="absolute left-3 text-gray-500">R$</span>
                    <input type="number" placeholder="0.00" data-field="discount" value="${u.discount||""}" class="w-full p-2 pl-8 border rounded-md">
                </div>
            </div>
            <button type="button" class="remove-loyalty-tier absolute top-2 right-2 md:static text-gray-400 hover:text-red-600 p-2 rounded-md hover:bg-red-50 transition-colors" title="Remover">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            </button>
        `,p};(a.tiers||[]).forEach(u=>{d.appendChild(c(u))}),t.querySelector("#add-loyalty-tier").addEventListener("click",()=>{d.appendChild(c())}),d.addEventListener("click",u=>{const p=u.target.closest(".remove-loyalty-tier");p&&p.closest(".loyalty-tier-row").remove()}),t.querySelector("#loyalty-form").addEventListener("submit",u=>{u.preventDefault();const p=t.querySelector('input[name="loyaltyType"]:checked').value,g=Array.from(t.querySelectorAll("#loyaltyTiersContainer .loyalty-tier-row")).map(h=>({points:parseInt(h.querySelector('input[data-field="points"]').value,10)||0,reward:h.querySelector('input[data-field="reward"]').value,discount:parseFloat(h.querySelector('input[data-field="discount"]').value)||0})),f={loyaltyProgram:{enabled:t.querySelector("#loyaltyEnabled").checked,type:p,pointsPerCurrency:parseFloat(t.querySelector("#loyaltyPointsPerCurrency").value)||10,pointsPerVisit:parseInt(t.querySelector("#loyaltyPointsPerVisit").value,10)||1,tiers:g.filter(h=>h.points>0&&h.reward).map(h=>({costPoints:h.points,reward:h.reward,name:h.reward,discount:h.discount}))}};Oe(f,u)})}async function Xi(e,t){t.innerHTML=`
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
    `;try{const[a,s]=await Promise.all([rt(m.establishmentId),nt(m.establishmentId)]),r=e.financialIntegration||{},o=e.commissionConfig||{},n=e.purchaseConfig||{};t.querySelector("#financialNatureId").innerHTML=Le(a,r.defaultNaturezaId),t.querySelector("#financialCostCenterId").innerHTML=Le(s,r.defaultCentroDeCustoId),t.querySelector("#purchaseNatureId").innerHTML=Le(a,n.defaultNatureId),t.querySelector("#purchaseCostCenterId").innerHTML=Le(s,n.defaultCostCenterId),t.querySelector("#commissionNatureId").innerHTML=Le(a,o.defaultNatureId),t.querySelector("#commissionCostCenterId").innerHTML=Le(s,o.defaultCostCenterId)}catch{b("Erro","Não foi possível carregar os dados para a integração financeira.","error")}t.querySelector("#financial-form").addEventListener("submit",a=>{a.preventDefault();const s={financialIntegration:{defaultNaturezaId:t.querySelector("#financialNatureId").value||null,defaultCentroDeCustoId:t.querySelector("#financialCostCenterId").value||null},purchaseConfig:{defaultNatureId:t.querySelector("#purchaseNatureId").value||null,defaultCostCenterId:t.querySelector("#purchaseCostCenterId").value||null},commissionConfig:{defaultNatureId:t.querySelector("#commissionNatureId").value||null,defaultCostCenterId:t.querySelector("#commissionCostCenterId").value||null}};Oe(s,a)})}function Zi(e,t){const a="5516997859430",s=encodeURIComponent("Olá, preciso de ajuda com o sistema Kairos."),r=`https://wa.me/${a}?text=${s}`;t.innerHTML=`
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
    `}function Ki(e,t){const a="5516997859430",s=encodeURIComponent("Olá, gostaria de solicitar o cancelamento da minha assinatura."),r=`https://wa.me/${a}?text=${s}`,o="sistemakairosagenda@gmail.com";t.innerHTML=`
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
    `}function el(e,t){t.innerHTML=`
        <div class="bg-white p-4 md:p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-bold text-gray-800">${e}</h3>
            <p class="mt-4 text-gray-500">Esta secção ainda não foi implementada.</p>
        </div>
    `}function fs(e="indigo",t){const a=t.querySelector("#color-palette-container"),s=t.querySelector("#establishmentThemeColor");!a||!s||(a.innerHTML="",Object.entries(Vi).forEach(([r,o])=>{const n=r===e,i=document.createElement("div");i.className="w-24 text-center cursor-pointer mb-4",i.innerHTML=`
            <div class="w-16 h-16 mx-auto rounded-full border-4 ${n?"border-gray-800 scale-110 shadow-lg":"border-transparent"} p-1 transition-all">
                <div class="w-full h-full rounded-full" style="background-color: ${o.main};"></div>
            </div>
            <p class="text-xs mt-2 font-medium ${n?"text-gray-900 font-bold":"text-gray-500"}">${o.name}</p>
        `,i.addEventListener("click",()=>{s.value=r,fs(r,t)}),a.appendChild(i)}),s.value=e)}function tl(e,t){const a=t.querySelector("#slotIntervalContainer"),s=t.querySelector("#establishmentSlotInterval");if(!a||!s)return;const r=[{label:"10 min",value:10},{label:"15 min",value:15},{label:"20 min",value:20},{label:"30 min",value:30},{label:"45 min",value:45},{label:"1 hora",value:60}];a.innerHTML=r.map(o=>{const n=o.value===e;return`<button type="button" data-value="${o.value}" 
                       class="interval-btn py-2 px-4 rounded-full text-sm font-semibold transition-colors 
                           ${n?"bg-indigo-600 text-white":"bg-gray-200 text-gray-700 hover:bg-gray-300"}">
                       ${o.label}
                   </button>`}).join(""),s.value=e,a.querySelectorAll(".interval-btn").forEach(o=>{o.addEventListener("click",()=>{s.value=o.dataset.value,a.querySelectorAll(".interval-btn").forEach(n=>{n.classList.remove("bg-indigo-600","text-white"),n.classList.add("bg-gray-200","text-gray-700")}),o.classList.add("bg-indigo-600","text-white"),o.classList.remove("bg-gray-200","text-gray-700")})})}async function al(e){const t=bs.find(s=>s.id===e);if(!t){console.error("Secção de definições não encontrada:",e);return}xe.innerHTML=`
        <div class="bg-white p-4 shadow-md sticky top-0 z-10 md:relative">
            <button data-action="back-to-list" class="flex items-center gap-2 font-semibold text-indigo-600 hover:text-indigo-800">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
                Voltar
            </button>
        </div>
        
        <div id="settings-content-detail" class="p-4">
            <div class="flex justify-center items-center h-full"><div class="loader"></div></div>
        </div>
    `,xe.querySelector('button[data-action="back-to-list"]').addEventListener("click",s=>{s.preventDefault(),vs()});const a=document.getElementById("settings-content-detail");switch(e){case"personal-data":Ui(W,a);break;case"change-password":_i(W,a);break;case"change-email":Ji(W,a);break;case"branding":Wi(W,a);break;case"booking":Gi(W,a);break;case"working-hours":Yi(W,a);break;case"loyalty":Qi(W,a);break;case"financial":await Xi(W,a);break;case"support":Zi(W,a);break;case"cancellation":Ki(W,a);break;default:el(t?t.label:"Definições",a)}}async function vs(){if(xe.innerHTML=`
        <div class="bg-white p-4 rounded-lg shadow-md mb-6">
            <h2 class="text-xl font-bold text-gray-800 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-500" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" /></svg>
                Definições
            </h2>
        </div>
        <div class="flex justify-center items-center h-64"><div class="loader"></div></div>
    `,!W)try{W=await $e(m.establishmentId)}catch{b("Erro Fatal","Não foi possível carregar os dados do estabelecimento.","error"),xe.innerHTML='<p class="text-red-500">Erro ao carregar dados.</p>';return}const e=V.currentUser;e&&e.displayName&&(m.userName=e.displayName);const t=v(m.userName||V.currentUser.email);let s=`https://placehold.co/96x96/E2E8F0/4A5568?text=${t?t.charAt(0).toUpperCase():"U"}`;e&&e.photoURL&&(s=e.photoURL),xe.innerHTML=`
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
                 ${m.userName&&m.userName!==V.currentUser.email?`<p class="text-sm text-gray-500">${v(V.currentUser.email)}</p>`:""}
                 
                 <p class="text-xs text-indigo-600 font-semibold mt-2">VER MEU PERFIL / MEUS BLOQUEIOS</p>
            </div>
        </div>

        <div class="bg-white p-4 rounded-lg shadow-md">
            <nav id="settings-menu-list" class="space-y-1">
                ${bs.map(o=>`
                    <button data-section="${o.id}" class="w-full flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100 font-semibold text-sm">
                        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${o.icon}"></path></svg>
                        <span class="flex-1 text-left">${o.label}</span>
                        <svg class="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                    </button>
                `).join("")}
            </nav>
        </div>
    `,xe.querySelector("#settings-menu-list").addEventListener("click",o=>{const n=o.target.closest("button[data-section]");n&&(o.preventDefault(),al(n.dataset.section))});const r=xe.querySelector('[data-action="go-to-my-profile"]');r&&r.addEventListener("click",o=>{o.preventDefault(),re("my-profile-section")})}const et=document.getElementById("content");async function Ae(e){const t=document.getElementById("blockagesList");if(t){t.innerHTML='<div class="loader mx-auto"></div>';try{const a=document.getElementById("filterStartDate")?.value,s=document.getElementById("filterEndDate")?.value,r=await jt(m.establishmentId,a||new Date().toISOString().split("T")[0],s||new Date().toISOString().split("T")[0],e),o=document.getElementById("filterReason")?.value.toLowerCase(),n=o?r.filter(l=>l.reason&&l.reason.toLowerCase().includes(o)):r,i=n.reduce((l,d)=>{const c=d.reason||"Sem motivo";return l[c]||(l[c]=[]),l[c].push(d),l},{});if(t.innerHTML="",n.length===0){t.innerHTML='<p class="text-center text-gray-500">Nenhum bloqueio encontrado.</p>';return}Object.entries(i).forEach(([l,d])=>{const c=document.createElement("div");c.className="bg-gray-100 rounded-lg p-3 my-2 space-y-2";let p=`<div class="flex justify-between items-center pb-2 border-b border-gray-200">
                                <h4 class="font-bold text-gray-700">${v(l)} (${d.length})</h4>`;if(d.length>1){const g=JSON.stringify(d.map(f=>f.id));p+=`<button data-action="batch-delete-blockage" data-ids='${g}' class="text-xs text-red-600 hover:text-red-800 font-semibold flex items-center gap-1">
                                    Apagar Lote
                                </button>`}p+="</div>",c.innerHTML=p,d.forEach(g=>{const f=new Date(g.startTime),h=new Date(g.endTime),y=f.toLocaleDateString("pt-BR"),S=h.toLocaleDateString("pt-BR"),$=`
                    <div class="bg-white p-3 rounded-md flex items-center justify-between shadow-sm">
                        <div>
                            <p class="font-medium text-gray-800 text-sm">
                                ${y===S?`${y} | ${f.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})} - ${h.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}`:`De ${y} às ${f.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}<br>Até ${S} às ${h.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}`}
                            </p>
                        </div>
                        <button class="p-1 rounded-full text-gray-500 hover:bg-gray-100 hover:text-red-600" data-action="delete-blockage" data-id="${g.id}">Apagar</button>
                    </div>`;c.innerHTML+=$}),t.appendChild(c)})}catch(a){t.innerHTML=`<p class="text-center text-red-500">Erro: ${a.message}</p>`}}}async function ol(e){e.preventDefault();const t=e.target,a=t.querySelector("#blockageProfId").value,s=t.querySelector("#blockageDate").value,r=t.querySelector("#blockageEndDate").value||s,o=t.querySelector("#blockageStartTime").value,n=t.querySelector("#blockageEndTime").value,i={establishmentId:m.establishmentId,professionalId:a,startTime:new Date(`${s}T${o}:00`).toISOString(),endTime:new Date(`${r}T${n}:00`).toISOString(),reason:t.querySelector("#blockageReason").value};try{await Ht(i),t.reset(),b("Sucesso","Bloqueio adicionado com sucesso!","success"),Ae(a)}catch(l){b("Erro",`Não foi possível criar o bloqueio: ${l.message}`,"error")}}async function sl(e){e.preventDefault();const t=e.target,a=Array.from(t.querySelectorAll('input[name="batch-professionals"]:checked')).map(c=>c.value);if(a.length===0)return b("Atenção","Selecione pelo menos um profissional.","error");const s=t.querySelector("#batchBlockageDate").value,r=t.querySelector("#batchBlockageEndDate").value||s,o=t.querySelector("#batchBlockageStartTime").value,n=t.querySelector("#batchBlockageEndTime").value,i=t.querySelector("#batchBlockageReason").value,l=t.querySelector('button[type="submit"]');l.disabled=!0,l.textContent="Aguarde...";const d=a.map(c=>{const u={establishmentId:m.establishmentId,professionalId:c,startTime:new Date(`${s}T${o}:00`).toISOString(),endTime:new Date(`${r}T${n}:00`).toISOString(),reason:i};return Ht(u)});try{await Promise.all(d),b("Sucesso",`${a.length} bloqueios foram criados com sucesso!`,"success"),t.reset(),t.querySelectorAll('input[name="batch-professionals"]:checked').forEach(u=>u.checked=!1);const c=document.getElementById("blockageProfId").value;c&&Ae(c)}catch(c){b("Erro",`Ocorreu um erro: ${c.message}`,"error")}finally{l.disabled=!1,l.textContent="Adicionar Bloqueio em Lote"}}function rl(e){et.addEventListener("submit",t=>{t.target.id==="blockageForm"&&ol(t),t.target.id==="batchBlockageForm"&&sl(t)}),et.addEventListener("input",t=>{t.target.matches("#filterStartDate, #filterEndDate, #filterReason")&&Ae(e)}),et.addEventListener("click",async t=>{const a=t.target.closest("button[data-action]");if(!a)return;const s=a.dataset.action;if(s==="back-to-professionals")re("profissionais-section");else if(s==="delete-blockage"){if(await j("Apagar Bloqueio","Tem a certeza que deseja apagar este bloqueio?"))try{await Ca(a.dataset.id),b("Sucesso","Bloqueio removido.","success"),Ae(e)}catch(o){b("Erro",`Não foi possível remover o bloqueio: ${o.message}`,"error")}}else if(s==="batch-delete-blockage"){const r=JSON.parse(a.dataset.ids);if(await j("Apagar Lote de Bloqueios",`Tem certeza que deseja apagar ${r.length} bloqueios de uma vez?`))try{await Oo(r),b("Sucesso",`${r.length} bloqueios removidos.`,"success"),Ae(e)}catch(n){b("Erro",`Não foi possível apagar os bloqueios: ${n.message}`,"error")}}})}async function nl(e){const{professionalId:t,professionalName:a}=e;if(!t||!a){et.innerHTML='<p class="text-red-500 p-8">Erro: ID do profissional não fornecido.</p>';return}const s=v(a);et.innerHTML=`
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
        </section>`,rl(t),await Ae(t);const r=document.getElementById("batchProfSelectionContainer");try{const o=await X(m.establishmentId);r.innerHTML=o.map(n=>`
            <div class="flex items-center">
                <input id="prof-batch-${n.id}" value="${n.id}" name="batch-professionals" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                <label for="prof-batch-${n.id}" class="ml-2 text-sm text-gray-700">${v(n.name)}</label>
            </div>`).join("")}catch{r.innerHTML='<p class="text-red-500">Erro ao carregar profissionais.</p>'}}const il=e=>w(`/api/users/${e}`),ll=e=>w("/api/users",{method:"POST",body:JSON.stringify(e)}),dl=(e,t)=>w(`/api/users/${e}`,{method:"PUT",body:JSON.stringify(t)}),cl=e=>w(`/api/users/${e}`,{method:"DELETE"}),ul=(e,t)=>w(`/api/users/${e}/password`,{method:"PUT",body:JSON.stringify({password:t})}),ml=(e,t)=>w(`/api/users/${e}/status`,{method:"PATCH",body:JSON.stringify({status:t})}),fe=document.getElementById("content"),pl={"agenda-section":"Agenda","comandas-section":"Comandas","relatorios-section":"Relatórios Gerais","sales-report-section":"Relatório de Vendas (Caixa)","financial-section":"Financeiro","servicos-section":"Serviços","produtos-section":"Produtos","suppliers-section":"Fornecedores","profissionais-section":"Profissionais","ausencias-section":"Ausências e Bloqueios","clientes-section":"Clientes","packages-section":"Pacotes","commissions-section":"Comissões","estabelecimento-section":"Configurações do Estabelecimento","users-section":"Usuários e Acessos"},gl={view:"Visualizar",create:"Criar",edit:"Editar"};let _e=null,Je=null;function bl(e){const t=document.getElementById("usersListContainer");if(!t)return;const a=document.getElementById("showInactiveUsersToggle")?.checked;if(e.length===0){const s=a?"Nenhum usuário encontrado.":"Nenhum usuário ativo cadastrado.";t.innerHTML=`<p class="col-span-full text-center text-gray-500">${s}</p>`;return}e.sort((s,r)=>(s.status==="active"?-1:1)-(r.status==="active"?-1:1)),t.innerHTML=e.map(s=>{const r=JSON.stringify(s).replace(/'/g,"&apos;"),o=s.status==="active",n=m.professionals.find(c=>c.id===s.professionalId),i=n?n.name:"N/A",l=n?n.name.charAt(0):s.name.charAt(0),d=n?.photo||`https://placehold.co/64x64/E2E8F0/4A5568?text=${encodeURIComponent(l)}`;return`
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
    `}).join("")}function Et(){const e=document.getElementById("showInactiveUsersToggle")?.checked;let t;e?t=m.users:t=m.users.filter(a=>a.status==="active"),bl(t)}function fl(e={}){return Object.entries(pl).map(([t,a])=>{const s=t==="agenda-section"||t==="comandas-section",r=e[t]?.view_all_prof===!0,o=Object.entries(gl).map(([i,l])=>`
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
    `}).join("")}async function co(e=null){document.getElementById("user-list-view").classList.add("hidden");const t=document.getElementById("user-form-view");t.classList.remove("hidden");let a=m.professionals;if(!a||a.length===0)try{a=await X(m.establishmentId),m.professionals=a}catch{b("Erro","Não foi possível carregar a lista de profissionais.","error")}const s=S=>a.find(I=>I.id===S),r=(S,I)=>{const k=s(S)?.photo,C=I.charAt(0).toUpperCase();return{photoSrc:k||`https://placehold.co/128x128/E2E8F0/4A5568?text=${C}`,initials:C,photoUrl:k||""}},o=e?.professionalId,n=e?.name||"Novo Usuário",i=r(o,n),l=s(o),d=S=>{let I='<option value="">-- Não Associado a um Profissional --</option>';return I+=a.map($=>`<option value="${$.id}" ${$.id===S?"selected":""}>${$.name} (${$.specialty||"N/A"})</option>`).join(""),I},c=e!==null;t.querySelector("#userFormTitle").textContent=c?`Editar Usuário: ${e.name}`:"Novo Usuário";const u=t.querySelector("#userForm");u.innerHTML=`
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
                    ${fl(e?.permissions)}
                </div>
            </div>

            <div class="flex gap-4 pt-6 border-t">
                <button type="button" data-action="back-to-list" class="flex-1 py-3 px-4 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400">Cancelar</button>
                <button type="submit" class="flex-1 py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">Salvar Alterações</button>
            </div>
        </div>
    `;const p=window.innerWidth<768,g=u.querySelector(".bg-white");if(p&&g){g.classList.remove("rounded-xl","shadow-2xl","sm:p-6");const S=u.closest("section");S&&(S.style.padding="0",S.style.margin="0"),g.classList.add("p-4")}const f=u.querySelector("#userProfessionalId"),h=u.querySelector("#userPhotoPreview"),y=u.querySelector("#profPhotoName");if(f.addEventListener("change",S=>{const I=S.target.value,$=s(I),k=$?$.name:"Selecione um profissional",C=r(I,n);h.src=C.photoSrc,y.textContent=k,u.querySelector("#professionalPhotoUrl").value=C.photoUrl}),u.addEventListener("submit",async S=>{S.preventDefault();const I=e?.email,$=u.querySelector("#userEmail").value,k={};u.querySelectorAll('input[type="checkbox"]').forEach(O=>{const L=O.dataset.module,T=O.dataset.permission;k[L]||(k[L]={}),k[L][T]=O.checked});const C=u.querySelector("#userProfessionalId").value||null,F={name:u.querySelector("#userName").value,permissions:k,professionalId:C,establishmentId:m.establishmentId};try{c?(I!==$&&(F.email=$),await dl(e.id,F),b("Usuário atualizado com sucesso!","success")):(F.email=u.querySelector("#userEmail").value,F.password=u.querySelector("#userPassword").value,await ll(F),b("Usuário criado com sucesso!","success")),Bt()}catch(O){b(`Erro: ${O.message}`,"error")}}),c){const S=u.querySelector("#password-change-container"),I=S.querySelector('[data-action="show-password-form"]'),$=S.querySelector("#password-form"),k=$.querySelector('[data-action="save-password"]'),C=$.querySelector('[data-action="cancel-password-change"]');I.addEventListener("click",()=>{I.classList.add("hidden"),$.classList.remove("hidden")}),C.addEventListener("click",()=>{I.classList.remove("hidden"),$.classList.add("hidden"),$.querySelector("#userNewPassword").value=""}),k.addEventListener("click",async()=>{const F=$.querySelector("#userNewPassword").value;if(!F||F.length<6){b("Senha inválida","A nova senha deve ter pelo menos 6 caracteres.","error");return}if(await j("Alterar Senha","Tem a certeza que deseja alterar a senha deste usuário?"))try{k.disabled=!0,k.textContent="Aguarde...",await ul(e.id,F),b("Sucesso!","A senha do usuário foi alterada.","success"),I.classList.remove("hidden"),$.classList.add("hidden"),$.querySelector("#userNewPassword").value=""}catch(L){b("Erro",`Não foi possível alterar a senha: ${L.message}`,"error")}finally{k.disabled=!1,k.textContent="Salvar Nova Senha"}})}}async function vl(){const e=document.getElementById("usersListContainer");e.innerHTML='<div class="loader col-span-full mx-auto"></div>';try{const[t,a]=await Promise.all([il(m.establishmentId),X(m.establishmentId)]);m.users=t,m.professionals=a,Et()}catch{b("Erro ao carregar usuários.","error"),e.innerHTML='<p class="col-span-full text-center text-red-500">Não foi possível carregar os usuários.</p>'}}async function Bt(){fe.innerHTML=`
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
    `,_e&&fe.removeEventListener("click",_e),Je&&fe.removeEventListener("change",Je),_e=async e=>{if(!document.getElementById("user-list-view")){fe.removeEventListener("click",_e);return}const t=e.target.closest("[data-action]");if(!t)return;switch(t.dataset.action){case"new-user":co();break;case"edit-user":const s=JSON.parse(t.dataset.user.replace(/&apos;/g,"'"));co(s);break;case"back-to-list":Bt();break;case"delete-user":{e.stopPropagation();const r=t.dataset.userId;if(await j("Excluir Usuário","Tem certeza que deseja excluir este usuário? Esta ação é irreversível."))try{await cl(r),b("Usuário excluído com sucesso!","success"),Bt()}catch(n){b(`Erro ao excluir: ${n.message}`,"error")}break}}},Je=async e=>{if(!document.getElementById("user-list-view")){fe.removeEventListener("change",Je);return}const t=e.target.closest('input[data-action="toggle-user-status"]');if(e.target.id==="showInactiveUsersToggle")Et();else if(t){e.stopPropagation();const a=t.dataset.userId,s=t.checked?"active":"inactive";try{await ml(a,s),b(`Usuário ${s==="active"?"ativado":"inativado"} com sucesso.`,"success");const r=m.users.findIndex(o=>o.id===a);r>-1&&(m.users[r].status=s,Et())}catch(r){b(`Erro ao atualizar status: ${r.message}`,"error"),t.checked=!t.checked,Et()}}},fe.addEventListener("click",_e),fe.addEventListener("change",Je),await vl()}const hl=document.getElementById("content");let uo={},ha=null;function xl(){Object.values(uo).forEach(e=>e?.destroy()),uo={}}function yl(e,t){if(!window.jspdf){b("Erro","Biblioteca PDF não carregada.","error");return}const{jsPDF:a}=window.jspdf,s=new a({orientation:"landscape",unit:"px",format:"a4"}),r=document.getElementById("salesReportSummaryCards");if(s.setFontSize(18),s.text(e,s.internal.pageSize.getWidth()/2,40,{align:"center"}),r){const n=[["Receita Total",r.querySelector("#summary-revenue").textContent],["Vendas Totais",r.querySelector("#summary-transactions").textContent],["Ticket Médio",r.querySelector("#summary-avg-ticket").textContent]];s.autoTable({startY:60,head:[["Métrica","Valor"]],body:n,theme:"striped",headStyles:{fillColor:[79,70,229]}})}const o=s.lastAutoTable?s.lastAutoTable.finalY+20:60;s.text("Detalhes das Vendas",20,o),s.autoTable({html:`#${t}`,startY:o+10,theme:"grid",headStyles:{fillColor:[22,163,74]}}),s.save(`${e.replace(/[\s/]/g,"_").toLowerCase()}.pdf`)}function mo(e){const t=document.getElementById("genericModal"),a=v(e.client),s=v(e.items),r=v(e.responsavelCaixa||"N/A"),o=(e.payments||[]).map(n=>`
        <div class="flex justify-between text-sm">
            <span>${v(n.method.charAt(0).toUpperCase()+n.method.slice(1))}</span>
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
    `,t.style.display="flex"}function wl(e){const{summary:t,transactions:a}=e;document.getElementById("summary-revenue").textContent=`R$ ${t.totalRevenue.toFixed(2)}`,document.getElementById("summary-transactions").textContent=t.totalTransactions,document.getElementById("summary-avg-ticket").textContent=`R$ ${t.averageTicket.toFixed(2)}`;const s=document.getElementById("paymentSummaryTableBody"),r=Object.entries(t.paymentMethodTotals).sort(([,i],[,l])=>l-i);s.innerHTML=r.map(([i,l])=>`
        <tr class="border-b">
            <td class="py-2 px-4 font-medium">${v(i.charAt(0).toUpperCase()+i.slice(1))}</td>
            <td class="py-2 px-4 text-right font-semibold">R$ ${l.toFixed(2)}</td>
        </tr>
    `).join("");const o=document.getElementById("transactionsTableBody"),n=document.getElementById("mobileTransactionsList");if(a.length===0){const i='<tr><td colspan="5" class="text-center py-8 text-gray-500">Nenhuma venda encontrada para o período selecionado.</td></tr>';o.innerHTML=i,n.innerHTML='<div class="text-center py-8 text-gray-500">Nenhuma venda encontrada.</div>';return}o.innerHTML=a.map((i,l)=>{const d=v(i.client),c=v(i.items),u=v(i.type);return`
        <tr class="border-b hover:bg-gray-50 cursor-pointer" data-transaction-index="${l}">
            <td class="w-24 py-3 px-4">${new Date(i.date).toLocaleString("pt-BR",{dateStyle:"short",timeStyle:"short"})}</td>
            <td class="w-40 py-3 px-4 truncate max-w-[150px]">${d}</td>
            <td class="w-auto py-3 px-4 truncate max-w-[200px]">${c}</td>
            <td class="w-16 py-3 px-4 text-center text-xs">${u}</td>
            <td class="w-24 py-3 px-4 text-right font-medium">R$ ${i.total.toFixed(2)}</td>
        </tr>
    `}).join(""),o.querySelectorAll("tr").forEach(i=>{i.addEventListener("dblclick",()=>{const l=i.dataset.transactionIndex,d=ha.transactions[l];d&&mo(d)})}),n.innerHTML=a.map((i,l)=>{const d=v(i.client),c=v(i.items),u=v(i.type);return`
        <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100 active:bg-gray-50 cursor-pointer transition-colors" data-transaction-index="${l}">
            <div class="flex justify-between items-start mb-2">
                <div class="flex flex-col">
                    <span class="text-xs text-gray-500 font-medium">${new Date(i.date).toLocaleString("pt-BR",{dateStyle:"short",timeStyle:"short"})}</span>
                    <span class="font-bold text-gray-800 text-lg">${d}</span>
                </div>
                <div class="text-right">
                    <span class="block font-bold text-green-600 text-lg">R$ ${i.total.toFixed(2)}</span>
                    <span class="inline-block px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600 border border-gray-200">${u}</span>
                </div>
            </div>
            <div class="mt-2 pt-2 border-t border-dashed border-gray-200">
                <p class="text-sm text-gray-600 line-clamp-2">${c}</p>
            </div>
            <p class="text-xs text-blue-500 mt-2 text-center font-medium">Toque para ver detalhes</p>
        </div>
    `}).join(""),n.querySelectorAll("div[data-transaction-index]").forEach(i=>{i.addEventListener("click",()=>{const l=i.dataset.transactionIndex,d=ha.transactions[l];d&&mo(d)})})}async function po(){const e=document.getElementById("main-reports-view"),t=document.getElementById("reportStartDate"),a=document.getElementById("reportEndDate");if(!e||!t||!a)return;const s=t.value,r=a.value;if(!s||!r)return b("Atenção","Por favor, selecione as datas de início e fim.","error");e.innerHTML='<div class="p-8 text-center"><div class="loader mx-auto"></div><p class="mt-4">A gerar relatório...</p></div>';try{const o=document.getElementById("cashierSessionFilter").value,n=await Er({establishmentId:m.establishmentId,startDate:s,endDate:r,cashierSessionId:o});ha=n,e.innerHTML=`
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
        `,wl(n)}catch(o){b("Erro",`Não foi possível carregar o relatório: ${o.message}`,"error"),e.innerHTML=`<p class="p-8 text-center text-red-500">${v(o.message)}</p>`}}async function kl(){xl();const e=new Date().toISOString().split("T")[0],t=new Date;t.setDate(t.getDate()-30);const a=t.toISOString().split("T")[0];hl.innerHTML=`
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
        </section>`,document.getElementById("generateReportBtn").addEventListener("click",po),document.getElementById("exportPdfBtn").addEventListener("click",()=>{const s=document.getElementById("reportStartDate").value,r=document.getElementById("reportEndDate").value,o=`Relatorio_Vendas_${s}_a_${r}`;yl(o,"transactionsTable")});try{const s=await tn(m.establishmentId),r=document.getElementById("cashierSessionFilter");s&&s.length>0&&s.forEach(o=>{const n=new Date(o.openTime).toLocaleString("pt-BR",{dateStyle:"short"}),i=v(o.closedByName||"N/A");r.innerHTML+=`<option value="${o.id}">${i} - ${n}</option>`})}catch{b("Erro","Não foi possível carregar o histórico de caixas para o filtro.","error")}await po()}const Sl=document.getElementById("content");let P={payables:[],receivables:[],natures:[],costCenters:[],currentFilter:"pending",startDate:new Date(new Date().getFullYear(),new Date().getMonth()-1,1).toISOString().split("T")[0],endDate:new Date().toISOString().split("T")[0],previousBalance:0,filterNaturezaId:"all",filterCostCenterId:"all",currentListView:"receivables"},ea=null,gt=null,bt=null;function Ra(e){const t=new Map,a=[];return e&&(e.forEach(s=>t.set(s.id,{...s,children:[]})),t.forEach(s=>{s.parentId&&t.has(s.parentId)?t.get(s.parentId).children.push(s):a.push(s)})),a}function hs(e,t,a){if(!e)return;if(!t||t.length===0){e.innerHTML='<p class="text-center text-gray-500">Nenhum item criado.</p>';return}const s=(r,o=0)=>{const n="— ".repeat(o);return`
            <div style="margin-left: ${o*20}px;" class="flex justify-between items-center bg-gray-100 p-2 rounded">
                <span>${n}${r.name}</span>
                <button data-action="delete-${a}" data-id="${r.id}" class="text-red-500 hover:text-red-700 font-semibold text-sm">Apagar</button>
            </div>
            ${r.children.map(i=>s(i,o+1)).join("")}
        `};e.innerHTML=t.map(r=>s(r)).join("")}async function go(e){document.getElementById("fab-menu")?.classList.add("hidden"),document.getElementById("main-fab-btn")?.classList.remove("rotate-45");const t=document.getElementById("genericModal"),a=e==="nature",s=`Gerir ${a?"Naturezas Financeiras":"Centros de Custo"}`,r=a?rt:nt,o=a?"natures":"costCenters";t.innerHTML=`
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
        </div>`,t.style.display="flex";const n=t.querySelector("#hierarchyList"),i=t.querySelector("#itemParent"),l=c=>{const u=Ra(c);if(hs(n,u,e),i){i.innerHTML='<option value="">-- Nível Principal --</option>';const p=(g,f="",h=0)=>{const y=h>0?"— ".repeat(h):"";i.innerHTML+=`<option value="${g.id}">${y}${g.name}</option>`,g.children.forEach(S=>p(S,f+"— "))};u.forEach(g=>p(g))}};try{const c=await r(m.establishmentId);P[o]=c,l(c)}catch(c){console.error(c)}const d=t.querySelector("#hierarchyForm");d&&d.addEventListener("submit",async c=>{c.preventDefault();const u=t.querySelector("#itemName");if(!u)return;const p=u.value,g=i.value,f=a?Ci:Ti;try{await f({name:p,parentId:g||null,establishmentId:m.establishmentId});const h=await r(m.establishmentId);P[o]=h,l(h),d.reset(),await ke()}catch(h){b("Erro",`Não foi possível criar: ${h.message}`,"error")}})}function $l(e){const t=document.getElementById("cashFlowChart");if(!t)return;const a=t.getContext("2d");ea&&ea.destroy();const s=e.payables.map(r=>r*-1);ea=new Chart(a,{type:"bar",data:{labels:e.labels,datasets:[{label:"Receitas",data:e.receivables,backgroundColor:"rgba(74, 222, 128, 0.6)",borderColor:"rgba(34, 197, 94, 1)",borderWidth:1,yAxisID:"y"},{label:"Despesas",data:s,backgroundColor:"rgba(248, 113, 113, 0.6)",borderColor:"rgba(239, 68, 68, 1)",borderWidth:1,yAxisID:"y"},{label:"Saldo Acumulado",data:e.expectedBalance,type:"line",borderColor:"rgba(59, 130, 246, 1)",backgroundColor:"rgba(59, 130, 246, 0.2)",borderWidth:3,pointRadius:4,pointBackgroundColor:"rgba(59, 130, 246, 1)",fill:!0,tension:.1,yAxisID:"y1"}]},options:{responsive:!0,maintainAspectRatio:!1,scales:{x:{stacked:!0},y:{type:"linear",display:!0,position:"left",stacked:!0,title:{display:!0,text:"Movimentações (R$)"}},y1:{type:"linear",display:!0,position:"right",title:{display:!0,text:"Saldo Acumulado (R$)"},grid:{drawOnChartArea:!1}}},plugins:{tooltip:{callbacks:{label:function(r){let o=r.dataset.label||"";if(o&&(o+=": "),r.parsed.y!==null){const n=Math.abs(r.parsed.y);o+=new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(n)}return o}}}}}})}async function bo(){const e=document.getElementById("cash-flow-chart-container"),t=document.getElementById("cashFlowStartDate"),a=document.getElementById("cashFlowEndDate");if(!e||!t||!a)return;const s=t.value,r=a.value;if(!s||!r){b("Atenção","Por favor, selecione as datas de início e fim.","error");return}e.innerHTML='<div class="loader mx-auto my-10"></div>';try{const o=await Oi(m.establishmentId,s,r);document.getElementById("cash-flow-chart-container")&&(e.innerHTML='<canvas id="cashFlowChart"></canvas>',$l(o))}catch(o){document.getElementById("cash-flow-chart-container")&&(e.innerHTML=`<p class="text-red-500 text-center">Erro ao carregar dados do gráfico: ${o.message}</p>`)}}function fo(){document.getElementById("fab-menu")?.classList.add("hidden"),document.getElementById("main-fab-btn")?.classList.remove("rotate-45");const e=document.getElementById("genericModal"),t=new Date,a=new Date(t.getFullYear(),t.getMonth(),1).toISOString().split("T")[0],s=t.toISOString().split("T")[0];e.innerHTML=`
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
    `,e.style.display="flex";const r=e.querySelector("#generateCashFlowBtn");r&&(r.addEventListener("click",bo),bo())}function El(){const e=document.getElementById("genericModal"),t=P.payables.filter(u=>u.status==="pending").reduce((u,p)=>u+p.amount,0),a=P.receivables.filter(u=>u.status==="pending").reduce((u,p)=>u+p.amount,0),s=a-t,r=P.payables.filter(u=>u.status==="paid").reduce((u,p)=>u+p.amount,0),o=P.receivables.filter(u=>u.status==="paid").reduce((u,p)=>u+p.amount,0),n=o-r,i=P.previousBalance||0,l=i+n,d=u=>new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(u),c=u=>u>=0?"text-green-600":"text-red-600";e.innerHTML=`
        <div class="modal-content max-w-4xl max-h-[90vh] flex flex-col">
             <div class="flex justify-between items-center p-6 border-b">
                <h2 class="text-2xl font-bold text-gray-800">Painel de Indicadores Financeiros</h2>
                <button type="button" data-action="close-modal" data-target="genericModal" class="text-2xl font-bold text-gray-500 hover:text-gray-800">&times;</button>
            </div>
            <div class="p-6 overflow-y-auto space-y-8">
                
                <p class="text-center text-sm text-gray-500 mb-6 bg-yellow-50 p-2 rounded-md">
                    Análise do período: ${new Date(P.startDate+"T00:00:00").toLocaleDateString("pt-BR")} a ${new Date(P.endDate+"T00:00:00").toLocaleDateString("pt-BR")}.
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
    `,e.style.display="flex"}function Il(){const e=document.getElementById("genericModal");e.innerHTML=`
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
    `,e.style.display="flex"}function ft(e,t="all"){let a='<option value="all">Todos</option>';const s=n=>{const i=new Map,l=[];return n&&(n.forEach(d=>i.set(d.id,{...d,children:[]})),i.forEach(d=>{d.parentId&&i.has(d.parentId)?i.get(d.parentId).children.push(d):l.push(d)})),l},r=(n,i=0)=>{const l=i>0?"— ".repeat(i):"",d=n.id===t?"selected":"";a+=`<option value="${n.id}" ${d}>${l}${n.name}</option>`,n.children.forEach(c=>r(c,i+1))};return s(e).forEach(n=>r(n)),a}async function ke(){const e=document.getElementById("financial-content");if(!e)return;const t=document.getElementById("filterStartDate"),a=document.getElementById("filterEndDate");if(!t||!a)return;const s=t.value,r=a.value,o=document.getElementById("filterNaturezaId")?.value,n=document.getElementById("filterCostCenterId")?.value;if(!s||!r){try{const[d,c]=await Promise.all([rt(m.establishmentId),nt(m.establishmentId)]);if(!document.getElementById("financial-content"))return;P={...P,natures:d,costCenters:c},document.getElementById("filterNaturezaId")&&(document.getElementById("filterNaturezaId").innerHTML=ft(P.natures)),document.getElementById("filterCostCenterId")&&(document.getElementById("filterCostCenterId").innerHTML=ft(P.costCenters))}catch(d){b("Erro",`Não foi possível carregar os dados base: ${d.message}`,"error")}xa(),ho();return}const i=document.getElementById("payables-list"),l=document.getElementById("receivables-list");i&&(i.innerHTML='<div class="loader mx-auto"></div>'),l&&(l.innerHTML='<div class="loader mx-auto"></div>');try{const d={startDate:s,endDate:r,establishmentId:m.establishmentId};o&&o!=="all"&&(d.natureId=o),n&&n!=="all"&&(d.costCenterId=n);const[c,u,p,g]=await Promise.all([Di(d),Ri(d),rt(m.establishmentId),nt(m.establishmentId)]);if(!document.getElementById("financial-content"))return;const f=(u.previousBalance||0)-(c.previousBalance||0);P={...P,payables:c.entries||[],receivables:u.entries||[],natures:p||[],costCenters:g||[],previousBalance:f,filterNaturezaId:o,filterCostCenterId:n},document.getElementById("filterNaturezaId")&&(document.getElementById("filterNaturezaId").innerHTML=ft(P.natures,P.filterNaturezaId)),document.getElementById("filterCostCenterId")&&(document.getElementById("filterCostCenterId").innerHTML=ft(P.costCenters,P.filterCostCenterId)),xa(),ho()}catch(d){document.getElementById("financial-content")&&(b("Erro",`Não foi possível carregar os dados: ${d.message}`,"error"),e.innerHTML='<p class="text-red-500 text-center">Falha ao carregar dados.</p>')}}async function Cl(e,t,a=null){e.preventDefault();const s=e.target,r=s.querySelector('[name="status"]').checked,o=s.querySelector('[name="paymentDate"]').value,n=parseFloat(s.querySelector('[name="amount"]').value),i=parseInt(s.querySelector('[name="installments"]')?.value,10)||1;if(isNaN(n)){b("Erro de Validação","O valor inserido é inválido.","error");return}if(r&&!o){b("Erro de Validação","Por favor, forneça a data de pagamento para um lançamento pago.","error");return}const l={description:s.querySelector('[name="description"]').value,amount:n,dueDate:s.querySelector('[name="dueDate"]').value,naturezaId:s.querySelector('[name="naturezaId"]').value||null,centroDeCustoId:s.querySelector('[name="centroDeCustoId"]').value||null,notes:s.querySelector('[name="notes"]').value,status:r?"paid":"pending",paymentDate:r?o:null,installments:a?1:i,establishmentId:m.establishmentId};try{a?(await(t==="payable"?Mi(a,l):Fi(a,l)),b("Sucesso","Lançamento atualizado!","success")):(await(t==="payable"?Bi(l):qi(l)),b("Sucesso","Lançamento adicionado!","success")),document.getElementById("genericModal").style.display="none",await ke()}catch(d){b("Erro",`Não foi possível salvar: ${d.message}`,"error")}}async function Ll(e,t){if(await j("Confirmar Exclusão","Tem certeza? Esta ação é irreversível."))try{await(e==="payable"?Ai(t):ji(t)),b("Sucesso","Lançamento excluído!","success"),await ke()}catch(s){b("Erro",`Falha ao excluir: ${s.message}`,"error")}}async function Tl(e,t){const a=new Date().toISOString().split("T")[0];try{await(e==="payable"?Ni(t,a):Hi(t,a)),b("Sucesso","Lançamento atualizado!","success"),await ke()}catch(s){b("Erro",`Falha ao atualizar status: ${s.message}`,"error")}}function vo(e){const t=P.currentFilter;return t==="all"?e:e.filter(a=>a.status===t)}function xa(){const e=document.getElementById("payables-list"),t=document.getElementById("receivables-list");if(!e||!t)return;const a=new Map(P.natures.map(i=>[i.id,i.name])),s=new Map(P.costCenters.map(i=>[i.id,i.name])),r=vo(P.payables),o=vo(P.receivables),n=(i,l)=>{const d=i.status==="paid",c=JSON.stringify(i).replace(/'/g,"&apos;"),u=i.naturezaId?a.get(i.naturezaId):"N/A",p=i.centroDeCustoId?s.get(i.centroDeCustoId):"N/A";let g=l==="payable"?"text-red-600":"text-green-600";const f=d?"bg-gray-200 text-gray-600":l==="payable"?"bg-red-100 text-red-700":"bg-yellow-100 text-yellow-700",h=d?"Finalizado":"Pendente";return d&&(g="text-gray-500"),`
        <div class="bg-white p-3 rounded-lg shadow-sm border-l-4 ${d?"border-gray-300 opacity-70":l==="payable"?"border-red-400":"border-green-400"}">
            <div class="flex justify-between items-center">
                <div>
                    <p class="font-bold">${i.description}</p>
                    <p class="text-sm text-gray-500">Vence em: ${new Date(i.dueDate+"T00:00:00").toLocaleDateString("pt-BR")}</p>
                    <div class="flex flex-wrap gap-2 mt-1">
                        <span class="text-xs font-semibold bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">Natureza: ${u}</span>
                        <span class="text-xs font-semibold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">C. Custo: ${p}</span>
                    </div>
                </div>
                <div class="flex items-center gap-2 text-right">
                    <p class="font-bold text-lg ${g}">R$ ${i.amount.toFixed(2)}</p>
                    <div class="flex flex-col items-center gap-1">
                        <span class="text-xs font-semibold px-2 py-1 rounded-full ${f}">${h}</span>
                        <div class="flex">
                            ${d?"":`<button data-action="mark-as-paid" data-type="${l}" data-id="${i.id}" class="text-gray-500 hover:text-green-500 p-1" title="Marcar como pago/recebido"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></button>`}
                            <button data-action="edit" data-type="${l}" data-item='${c}' class="text-gray-400 hover:text-blue-500 p-1" title="Editar"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z"></path></svg></button>
                            <button data-action="delete" data-type="${l}" data-id="${i.id}" class="text-gray-400 hover:text-red-500 p-1" title="Apagar"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`};e.innerHTML=r.map(i=>n(i,"payable")).join("")||'<p class="text-center text-gray-500 py-4">Nenhuma conta a pagar.</p>',t.innerHTML=o.map(i=>n(i,"receivable")).join("")||'<p class="text-center text-gray-500 py-4">Nenhuma conta a receber.</p>'}function ho(){const e=P.payables.filter(n=>n.status==="pending").reduce((n,i)=>n+i.amount,0),t=P.receivables.filter(n=>n.status==="pending").reduce((n,i)=>n+i.amount,0),a=t-e,s=document.getElementById("summary-pending-receivables");s&&(s.textContent=`R$ ${t.toFixed(2)}`);const r=document.getElementById("summary-pending-payables");r&&(r.textContent=`R$ ${e.toFixed(2)}`);const o=document.getElementById("summary-pending-balance");o&&(o.textContent=`R$ ${a.toFixed(2)}`,o.className=`text-2xl font-bold ${a>=0?"text-green-600":"text-red-600"}`)}function ta(e,t=null){document.getElementById("fab-menu")?.classList.add("hidden"),document.getElementById("main-fab-btn")?.classList.remove("rotate-45");const a=document.getElementById("genericModal"),s=`${t?"Editar":"Nova"} ${e==="payable"?"Despesa":"Receita"}`,r=e==="payable"?"bg-red-600 hover:bg-red-700":"bg-green-600 hover:bg-green-700",o=p=>{let g='<option value="">-- Selecione (Opcional) --</option>';const f=Ra(p),h=(y,S="",I=0)=>{const $=I>0?"— ".repeat(I):"";g+=`<option value="${y.id}">${$}${y.name}</option>`,y.children.forEach(k=>h(k,S+"— "))};return f.forEach(y=>h(y)),g},n=o(P.natures),i=o(P.costCenters),l=t?"":`
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
        </div>`,a.style.display="flex",t){const p=a.querySelector('[name="naturezaId"]');p&&(p.value=t.naturezaId||"");const g=a.querySelector('[name="centroDeCustoId"]');g&&(g.value=t.centroDeCustoId||"")}const d=a.querySelector("#status"),c=a.querySelector("#payment-date-container"),u=a.querySelector('[name="paymentDate"]');t?.status==="paid"&&(d.checked=!0,c.classList.remove("hidden"),u.value=t.paymentDate||new Date().toISOString().split("T")[0]),d.addEventListener("change",()=>{c.classList.toggle("hidden",!d.checked),u.required=d.checked}),a.querySelector("#financial-form").addEventListener("submit",p=>Cl(p,e,t?.id))}async function Pl(){const e=new Date,a=new Date(e.getFullYear(),e.getMonth()-1,1).toISOString().split("T")[0],s=e.toISOString().split("T")[0];P.startDate=a,P.endDate=s,P.currentFilter="pending",P.filterNaturezaId="all",P.filterCostCenterId="all",Sl.innerHTML=`
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
                            <input type="date" id="filterStartDate" value="${P.startDate}" class="w-full p-1 border rounded-md text-sm">
                        </div>
                        <div class="w-full md:w-auto">
                            <label for="filterEndDate" class="text-xs font-medium">Até:</label>
                            <input type="date" id="filterEndDate" value="${P.endDate}" class="w-full p-1 border rounded-md text-sm">
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
    `;const r=document.getElementById("main-fab-btn"),o=document.getElementById("fab-menu");if(r&&o){r.addEventListener("click",h=>{h.stopPropagation(),o.classList.toggle("hidden"),r.classList.toggle("rotate-45")});const p=o.querySelector('button[data-action="open-modal"][data-type="receivable"]'),g=o.querySelector('button[data-action="open-modal"][data-type="payable"]'),f=o.querySelector('button[data-action="open-cash-flow-modal"]');p&&p.addEventListener("click",h=>{h.stopPropagation(),ta("receivable")}),g&&g.addEventListener("click",h=>{h.stopPropagation(),ta("payable")}),f&&f.addEventListener("click",h=>{h.stopPropagation(),fo()})}gt&&document.body.removeEventListener("click",gt),bt&&document.getElementById("genericModal").removeEventListener("click",bt);const n=()=>{const p=document.getElementById("filterStartDate"),g=document.getElementById("filterEndDate"),f=document.getElementById("filterNaturezaId"),h=document.getElementById("filterCostCenterId");if(!p)return;P.startDate=p.value,P.endDate=g.value,P.filterNaturezaId=f.value,P.filterCostCenterId=h.value;const y=document.getElementById("advanced-filters");y&&y.classList.contains("hidden")===!1&&window.innerWidth<768&&y.classList.add("hidden"),ke()},i=p=>{const g=p.target.closest("[data-status-filter]");if(!g)return;const f=g.dataset.statusFilter;P.currentFilter=f,document.querySelectorAll("[data-status-filter]").forEach(h=>{h.classList.remove("bg-blue-100","text-blue-800"),h.classList.add("bg-gray-100","text-gray-600")}),g.classList.remove("bg-gray-100","text-gray-600"),g.classList.add("bg-blue-100","text-blue-800"),xa()},l=p=>{const g=document.getElementById("payables-container"),f=document.getElementById("receivables-container"),h=document.getElementById("btn-payables-view"),y=document.getElementById("btn-receivables-view");g&&(window.innerWidth>=1024&&P.currentListView===p||(p==="payables"?(g.classList.remove("hidden"),f.classList.add("hidden"),h&&(h.classList.remove("bg-gray-200"),h.classList.add("bg-red-100","border","border-red-500")),y&&(y.classList.remove("bg-green-100","border","border-green-500"),y.classList.add("bg-gray-200"))):(g.classList.add("hidden"),f.classList.remove("hidden"),h&&(h.classList.remove("bg-red-100","border","border-red-500"),h.classList.add("bg-gray-200")),y&&(y.classList.remove("bg-gray-200"),y.classList.add("bg-green-100","border","border-green-500"))),P.currentListView=p))};document.getElementById("applyDateFilterBtn").addEventListener("click",n),document.getElementById("filterNaturezaId").addEventListener("change",()=>{P.filterNaturezaId=document.getElementById("filterNaturezaId").value}),document.getElementById("filterCostCenterId").addEventListener("change",()=>{P.filterCostCenterId=document.getElementById("filterCostCenterId").value}),document.querySelectorAll("[data-status-filter]").forEach(p=>{p.addEventListener("click",i)}),gt=p=>{const g=p.target.closest("button[data-action]");if(!g)return;const{action:f,type:h,id:y}=g.dataset;f==="edit"?ta(h,JSON.parse(g.dataset.item.replace(/&apos;/g,"'"))):f==="delete"?Ll(h,y):f==="mark-as-paid"?Tl(h,y):f==="manage-natures"?go("nature"):f==="manage-cost-centers"?go("cost-center"):f==="open-cash-flow-modal"?fo():f==="toggle-filters"?document.getElementById("advanced-filters")?.classList.toggle("hidden"):f==="open-indicators-modal"?El():f==="open-settings-modal"?Il():f==="toggle-list-view"&&l(g.dataset.list)},bt=p=>{const g=p.target.closest('button[data-action^="delete-"]');if(g){const f=g.dataset.action.split("-")[1];d(f,g.dataset.id)}},document.body.addEventListener("click",gt),document.getElementById("genericModal").addEventListener("click",bt);async function d(p,g){const f=p==="nature",h=f?Li:Pi,y=f?rt:nt,S=f?"natures":"costCenters",I=document.getElementById("hierarchyList");if(await j("Apagar Item","Tem a certeza? Apagar um item principal também apagará os seus sub-itens."))try{await h(g);const k=await y(m.establishmentId);P[S]=k,hs(I,Ra(k),p),await ke()}catch(k){b("Erro",`Não foi possível apagar: ${k.message}`,"error")}}const c=()=>{const p=window.innerWidth<1024,g=document.getElementById("payables-container"),f=document.getElementById("receivables-container"),h=document.getElementById("list-toggle-buttons");g&&f&&(g.classList.remove("hidden"),f.classList.remove("hidden"),p?(g.classList.remove("lg:col-span-1"),f.classList.remove("lg:col-span-1"),h?.classList.remove("hidden"),l(P.currentListView)):(g.classList.add("lg:col-span-1"),f.classList.add("lg:col-span-1"),h?.classList.add("hidden"),g.classList.remove("hidden"),f.classList.remove("hidden")))};c(),window.addEventListener("resize",c);const u=document.querySelector(`[data-status-filter="${P.currentFilter}"]`);u&&(document.querySelectorAll("[data-status-filter]").forEach(p=>{p.classList.remove("bg-blue-100","text-blue-800"),p.classList.add("bg-gray-100","text-gray-600")}),u.classList.remove("bg-gray-100","text-gray-600"),u.classList.add("bg-blue-100","text-blue-800"));try{const p=await zi(m.establishmentId),g=document.getElementById("summary-today-payables");g&&(g.textContent=`R$ ${p.totalPayables.toFixed(2)}`);const f=document.getElementById("summary-today-receivables");f&&(f.textContent=`R$ ${p.totalReceivables.toFixed(2)}`)}catch{}await ke()}const Bl=e=>w("/api/commissions/calculate",{method:"POST",body:JSON.stringify(e)}),Dl=e=>w("/api/commissions/save",{method:"POST",body:JSON.stringify(e)}),Ml=(e,t)=>{const a=new URLSearchParams({startDate:e,endDate:t}).toString();return w(`/api/commissions/stats?${a}`)},Al=(e={})=>{Object.keys(e).forEach(s=>(e[s]===void 0||e[s]===null||e[s]==="")&&delete e[s]);const t=new URLSearchParams(e).toString(),a=`/api/commissions/history${t?"?"+t:""}`;return w(a)},Nl=e=>w(`/api/commissions/report/${e}`,{method:"DELETE"}),Dt=new Date,xo=new Date(Dt.getFullYear(),Dt.getMonth(),1),M={currentTab:"dashboard",professionals:[],calculationResult:null,historyData:[],periodString:"",dashStartDate:xo.toISOString().split("T")[0],dashEndDate:Dt.toISOString().split("T")[0],dashStats:{revenue:0,commissions:0},histStartDate:xo.toISOString().split("T")[0],histEndDate:Dt.toISOString().split("T")[0],histProfessionalId:"all"};let vt=null;const Ge=document.getElementById("content");async function ql(){try{M.professionals=await X(m.establishmentId)}catch(e){console.error("Erro profissionais",e)}Wl(),Rl(),Wt(),At("dashboard")}function Rl(){vt&&Ge.removeEventListener("click",vt),vt=e=>{const t=e.target.closest("button");if(!t)return;const a=t.dataset.action,s=t.dataset.id,r=t.dataset.idx;switch(a){case"tab-nav":At(t.dataset.tab);break;case"toggle-all-profs":Fl();break;case"back-to-filters":M.calculationResult=null,Mt(document.getElementById("commissions-content"));break;case"view-preview-items":Jl(r);break;case"save-final-report":Hl();break;case"start-new-calc":At("calculator");break;case"print-receipt":Ol(s);break;case"delete-report":zl(s);break;case"filter-dashboard":Wt();break;case"filter-history":Fa();break}},Ge.addEventListener("click",vt),Ge.oninput=e=>{if(e.target.classList.contains("input-debit")||e.target.classList.contains("input-credit")){const t=e.target.dataset.idx;Ul(t)}},Ge.onsubmit=e=>{e.target.id==="calc-form"&&(e.preventDefault(),jl())}}async function Wt(){const e=document.getElementById("dash-start"),t=document.getElementById("dash-end");e&&(M.dashStartDate=e.value),t&&(M.dashEndDate=t.value);const a=document.getElementById("dashboard-stats-container");a&&(a.innerHTML='<div class="flex justify-center py-10"><div class="loader"></div></div>');try{const s=await Ml(M.dashStartDate,M.dashEndDate);M.dashStats={revenue:s.totalRevenue||0,commissions:s.totalCommissionsPaid||0},M.currentTab==="dashboard"&&xs(document.getElementById("commissions-content"))}catch(s){console.error(s),a&&(a.innerHTML='<p class="text-red-500 text-center">Erro ao carregar dados.</p>')}}async function Fa(){const e=document.getElementById("hist-start"),t=document.getElementById("hist-end"),a=document.getElementById("hist-prof");e&&(M.histStartDate=e.value),t&&(M.histEndDate=t.value),a&&(M.histProfessionalId=a.value);const s=document.getElementById("history-list-container");if(s){s.innerHTML='<div class="flex justify-center py-10"><div class="loader"></div></div>';try{const r=await Al({startDate:M.histStartDate,endDate:M.histEndDate,professionalId:M.histProfessionalId});M.historyData=r,ys(s,r)}catch{s.innerHTML='<p class="text-red-500 text-center py-4">Erro ao buscar registros.</p>'}}}function Fl(){const e=document.querySelectorAll(".prof-checkbox"),t=Array.from(e).every(a=>a.checked);e.forEach(a=>a.checked=!t)}async function jl(){const e=Array.from(document.querySelectorAll(".prof-checkbox:checked")).map(o=>o.value);if(e.length===0)return b("Atenção","Selecione profissionais","error");const t={professionalIds:e,startDate:document.getElementById("start-date").value,endDate:document.getElementById("end-date").value,calculationTypes:{services:document.getElementById("type-services").checked,products:document.getElementById("type-products").checked,packages:document.getElementById("type-packages").checked}},a=new Date(t.startDate+"T00:00:00").toLocaleDateString("pt-BR"),s=new Date(t.endDate+"T00:00:00").toLocaleDateString("pt-BR");M.periodString=`${a} a ${s}`;const r=document.getElementById("commissions-content");r.innerHTML='<div class="flex flex-col items-center justify-center py-20"><div class="loader mb-4"></div><p class="text-gray-500 animate-pulse">Calculando...</p></div>';try{const o=await Bl(t);M.calculationResult=o.map(n=>({...n,extraDebit:0,extraCredit:0,finalValue:n.summary.totalCommission,notes:""})),Mt(r)}catch(o){b("Erro",o.message,"error"),M.calculationResult=null,Mt(r)}}async function Hl(){const e=M.calculationResult.length;if(await j("Confirmar",`Gerar ${e} relatórios? Isso marcará as vendas como pagas.`))try{const a=M.calculationResult.map(s=>{const r=s.items.map(o=>o.originalSaleId).filter(o=>o!=null);return Dl({professionalId:s.professionalId,professionalName:s.professionalName,period:M.periodString,processedSalesIds:r,reportData:{...s,summary:{...s.summary,finalValue:s.finalValue,extraDebit:s.extraDebit||0,extraCredit:s.extraCredit||0,notes:s.notes||""}}})});await Promise.all(a),b("Sucesso","Pagamentos registrados!","success"),M.calculationResult=null,Wt(),At("history")}catch(a){b("Erro",a.message,"error")}}function Ol(e){const t=M.historyData.find(a=>a.id===e);t&&Vl(t)}async function zl(e){if(await j("Excluir","Deseja remover este registro? As vendas voltarão a ficar disponíveis para cálculo."))try{await Nl(e),b("Sucesso","Registro removido.","success"),Fa(),Wt()}catch(a){b("Erro",a.message,"error")}}function Vl(e){const{jsPDF:t}=window.jspdf;if(!t)return b("Erro","PDF lib não carregada.","error");const a=new t,s=a.internal.pageSize.getWidth()/2;a.setFontSize(18),a.setFont(void 0,"bold"),a.text("RECIBO DE PAGAMENTO DE COMISSÃO",s,20,{align:"center"}),a.setFontSize(12),a.setFont(void 0,"normal"),a.text(`Profissional: ${e.professionalName}`,15,40),a.text(`Período: ${e.period}`,15,48);const r=[["Comissão Bruta",`R$ ${e.summary.totalCommission.toFixed(2)}`]];e.summary.extraCredit>0&&r.push(["(+) Bônus",`R$ ${e.summary.extraCredit.toFixed(2)}`]),e.summary.extraDebit>0&&r.push(["(-) Descontos",`R$ ${e.summary.extraDebit.toFixed(2)}`]),a.autoTable({startY:60,head:[["Descrição","Valor"]],body:r,theme:"grid"});const o=a.lastAutoTable.finalY+10;a.setFontSize(14),a.setFont(void 0,"bold"),a.text(`Total Líquido: R$ ${(e.summary.finalValue||e.summary.totalCommission).toFixed(2)}`,190,o,{align:"right"}),a.save(`Recibo_${e.professionalName}.pdf`)}function Ul(e){const t=document.querySelectorAll(`.input-debit[data-idx="${e}"]`),a=document.querySelectorAll(`.input-credit[data-idx="${e}"]`);let s=0,r=0;if(t.forEach(o=>{o.value&&(s=parseFloat(o.value))}),a.forEach(o=>{o.value&&(r=parseFloat(o.value))}),M.calculationResult&&M.calculationResult[e]){const o=M.calculationResult[e];o.extraDebit=s,o.extraCredit=r,o.finalValue=o.summary.totalCommission-s+r,t.forEach(i=>{i!==document.activeElement&&(i.value=s||"")}),a.forEach(i=>{i!==document.activeElement&&(i.value=r||"")}),document.querySelectorAll(`.final-value-display[data-idx="${e}"]`).forEach(i=>i.innerText=`R$ ${o.finalValue.toFixed(2)}`),_l()}}function _l(){const e=M.calculationResult.reduce((a,s)=>a+s.finalValue,0);document.querySelectorAll("#grand-total-display").forEach(a=>a.innerText=`R$ ${e.toFixed(2)}`)}function Jl(e){const t=M.calculationResult[e];if(!t)return;const a=t.items.map(s=>`
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
    `).join("");_({title:"Detalhes da Comissão",contentHTML:`<div class="bg-gray-50 p-3 rounded-lg mb-4 flex justify-between items-center"><div><p class="text-xs text-gray-500">Profissional</p><p class="font-bold text-gray-800">${t.professionalName}</p></div><div class="text-right"><p class="text-xs text-gray-500">Total Itens</p><p class="font-bold text-gray-800">${t.items.length}</p></div></div><div class="border rounded-lg overflow-hidden max-h-[60vh] overflow-y-auto">${a}</div>`,maxWidth:"max-w-md"})}function Mt(e){if(M.calculationResult){const t=M.calculationResult,a=t.reduce((o,n)=>o+n.finalValue,0),s=t.map((o,n)=>`
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
            </form>`}}function Wl(){Ge.innerHTML=`
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
    `}function At(e){M.currentTab=e,["dashboard","calculator","history"].forEach(a=>{const s=document.getElementById(`tab-${a}`);a===e?s.className="flex-1 md:flex-none px-4 py-2 rounded-md text-sm font-bold bg-white text-indigo-600 shadow-sm border border-gray-100":s.className="flex-1 md:flex-none px-4 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700"});const t=document.getElementById("commissions-content");e==="dashboard"&&xs(t),e==="calculator"&&Mt(t),e==="history"&&Gl(t)}function xs(e){const{revenue:t,commissions:a}=M.dashStats,s=t>0?(a/t*100).toFixed(1):0;e.innerHTML=`
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
    `}function Gl(e){const t=M.professionals.map(a=>`<option value="${a.id}" ${M.histProfessionalId===a.id?"selected":""}>${a.name}</option>`).join("");e.innerHTML=`
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
    `,M.historyData.length>0?ys(document.getElementById("history-list-container"),M.historyData):Fa()}function ys(e,t){if(t.length===0){e.innerHTML=`
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
    `}const aa=document.getElementById("content");let Se={allPackages:[],catalogForModal:{services:[],products:[]}},ht=null,De=null;function Yl(e=6){let t="";for(let a=0;a<e;a++)t+=`
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
        `;return t}function Ql(){const e=document.getElementById("packagesListContainer");if(e){if(Se.allPackages.length===0){e.innerHTML=`
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
            </div>`;return}e.innerHTML=Se.allPackages.map(t=>{const a=t.status==="active",s=JSON.stringify(t).replace(/'/g,"&apos;"),r=t.price||0,o=t.originalPrice||0,n=o>r?o-r:0,i=o>0?(o-r)/o*100:0,l=v(t.name),d=v(t.description||"Sem descrição");return`
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
        `}).join("")}}function yo(){const e=document.getElementById("genericModal");e.style.display="none",De&&e.removeEventListener("click",De)}async function wo(e=null){const t=document.getElementById("genericModal"),a=!!e,s=e?JSON.parse(JSON.stringify(e.items||[])):[],r=v(e?.name||""),o=v(e?.description||""),n=e?.price||"",i=e?.commissionRate||0,l=e?.validityDays||30,d=`
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
    `;t.innerHTML=d,t.style.display="flex";const c=t.querySelector("#package-items-list"),u=(g,f)=>{const h=f.querySelector("#originalPrice"),y=g.reduce((S,I)=>S+I.price*I.quantity,0);h&&(h.textContent=`R$ ${y.toFixed(2)}`)},p=g=>{g.length===0?c.innerHTML='<p class="text-center text-gray-500 p-4">Nenhum item adicionado.</p>':c.innerHTML=g.map((f,h)=>{const y=f.type==="service",S=y?"Serviço":"Produto",I=y?"bg-indigo-100 text-indigo-800":"bg-green-100 text-green-800";return`
                <div class="flex items-center justify-between bg-white p-2 rounded shadow-sm border border-gray-200">
                    <div class="flex items-center gap-3 min-w-0">
                        <input type="number" value="${f.quantity}" min="1" class="w-12 p-1 border rounded-md text-sm quantity-input flex-shrink-0" data-index="${h}">
                        <span class="text-xs font-medium px-2 py-0.5 rounded-full ${I}">${S}</span>
                        <span class="font-medium text-gray-800 truncate">${v(f.name)}</span>
                    </div>
                    <div class="flex items-center gap-2 flex-shrink-0">
                        <span class="text-sm text-gray-600">R$ ${f.price.toFixed(2)}</span>
                        <button type="button" class="text-red-500 hover:text-red-700 remove-item-btn font-bold" data-index="${h}">&times;</button>
                    </div>
                </div>
            `}).join(""),u(g,t)};p(s),c.addEventListener("change",g=>{if(g.target.classList.contains("quantity-input")){const f=parseInt(g.target.dataset.index,10),h=parseInt(g.target.value,10);h>0&&s[f]&&(s[f].quantity=h,p(s))}}),c.addEventListener("click",g=>{if(g.target.classList.contains("remove-item-btn")){const f=parseInt(g.target.dataset.index,10);s.splice(f,1),p(s)}}),t.querySelector("#add-item-to-package-btn").onclick=()=>Xl(g=>{const f=s.find(h=>h.id===g.id&&h.type===g.type);f?f.quantity++:s.push({...g,quantity:1}),p(s)}),De&&t.removeEventListener("click",De),De=async g=>{const f=g.target.closest("button[data-action]");if(!f)return;const h=f.dataset.action;if(g.stopPropagation(),h==="close-modal"&&yo(),h==="save-package"){const y=f,S={id:document.getElementById("packageId").value||null,name:document.getElementById("packageName").value,description:document.getElementById("packageDescription").value,status:document.getElementById("packageStatus").value,items:s,originalPrice:s.reduce((I,$)=>I+$.price*$.quantity,0),price:parseFloat(document.getElementById("finalPrice").value),commissionRate:parseFloat(document.getElementById("commissionRate").value)||0,validityDays:parseInt(document.getElementById("validityDays").value,10)||null,establishmentId:m.establishmentId};if(!S.name||!S.price){b("Erro","Nome do Pacote e Preço Final são obrigatórios.","error");return}if(S.items.length===0){b("Erro","Adicione pelo menos um item ao pacote.","error");return}y.disabled=!0,y.textContent="A salvar...";try{a?await sn(S.id,S):(delete S.id,await on(S)),b("Sucesso!",`Pacote ${a?"atualizado":"criado"} com sucesso.`,"success"),yo(),await ja()}catch(I){b("Erro",`Não foi possível salvar o pacote: ${I.message}`,"error"),y.disabled=!1,y.textContent="Salvar Pacote"}}},t.addEventListener("click",De)}function Xl(e){let t="";const a=document.createElement("div");a.id="item-selection-modal",a.className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[110]";const s={service:'<svg class="w-6 h-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v4.512a9.04 9.04 0 00-3 5.012M12 12a9.04 9.04 0 01-3-5.012V5l-1-1z" /></svg>',product:'<svg class="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>'},r=l=>{const d=t.toLowerCase(),c=Se.catalogForModal.services.filter(f=>f.name.toLowerCase().includes(d)),u=Se.catalogForModal.products.filter(f=>f.name.toLowerCase().includes(d)),p=c.map(f=>`
            <button data-action="select-item" data-item-type="service" data-item-id="${f.id}" class="flex items-center gap-3 w-full p-3 bg-white border rounded-lg hover:bg-gray-50 transition">
                <div class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gray-100">${s.service}</div>
                <span class="flex-grow text-left min-w-0 truncate">${v(f.name)}</span>
                <span class="font-semibold flex-shrink-0">R$ ${f.price.toFixed(2)}</span>
            </button>
        `).join("")||'<p class="text-xs text-gray-400 text-center p-4">Nenhum serviço encontrado.</p>',g=u.map(f=>`
            <button data-action="select-item" data-item-type="product" data-item-id="${f.id}" class="flex items-center gap-3 w-full p-3 bg-white border rounded-lg hover:bg-gray-50 transition">
                <div class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gray-100">${s.product}</div>
                <span class="flex-grow text-left min-w-0 truncate">${v(f.name)}</span>
                <span class="font-semibold flex-shrink-0">R$ ${f.price.toFixed(2)}</span>
            </button>
        `).join("")||'<p class="text-xs text-gray-400 text-center p-4">Nenhum produto encontrado.</p>';l.innerHTML=`
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><h4 class="font-semibold mb-2 text-center text-indigo-600">Serviços</h4><div id="modal-service-list" class="space-y-2 max-h-96 overflow-y-auto">${p}</div></div>
                <div><h4 class="font-semibold mb-2 text-center text-green-600">Produtos</h4><div id="modal-product-list" class="space-y-2 max-h-96 overflow-y-auto">${g}</div></div>
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
    `,document.body.appendChild(a);const o=a.querySelector("#item-selection-list"),n=a.querySelector("#item-search-input"),i=()=>{a.remove()};r(o),n.addEventListener("input",()=>{t=n.value,r(o)}),a.addEventListener("click",l=>{const d=l.target.closest('[data-action="select-item"]'),c=l.target.closest('[data-action="close-selection-modal"]');if(d){const{itemType:u,itemId:p}=d.dataset,f=(Se.catalogForModal[u+"s"]||[]).find(h=>h.id===p);f&&(e({...f,type:u}),i())}else(c||l.target===a)&&i()})}async function ja(){aa.innerHTML=`
        <section id="packages-page" class="p-4 sm:p-6">
             <div class="sticky top-0 z-10 bg-gray-100 sm:bg-transparent pt-3 pb-4 mb-6 -mx-4 -mt-4 sm:mx-0 sm:mt-0 sm:bg-transparent sm:pt-0 sm:pb-0 sm:static">
                <div class="flex justify-between items-center px-4 sm:px-0">
                    <h2 class="text-2xl sm:text-3xl font-bold text-gray-800">Pacotes de Serviços</h2>
                </div>
            </div>
            
            <div id="packagesListContainer" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pb-20">
                ${Yl()}
            </div>
            
            <button data-action="new-package" class="fixed z-30 bottom-20 right-4 sm:bottom-6 sm:right-6 w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-transform hover:scale-105">
                <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
            </button>
        </section>
    `,ht&&aa.removeEventListener("click",ht),ht=e=>{if(e.target.closest('[data-action-stop-propagation="true"]')){e.stopPropagation();const s=e.target.closest('[data-action="delete-package"]');if(s){const r=s.dataset.id;j("Excluir Pacote","Tem a certeza que deseja excluir este pacote? Esta ação é irreversível.").then(async o=>{if(o)try{await rn(r),b("Sucesso!","Pacote excluído.","success"),await ja()}catch(n){b("Erro",`Não foi possível excluir: ${n.message}`,"error")}})}return}const t=e.target.closest('[data-action="new-package"], [data-action="edit-package"]');if(!t)return;const a=t.dataset.action;if(a==="new-package")wo(null);else if(a==="edit-package"){const s=JSON.parse(t.dataset.package);wo(s)}},aa.addEventListener("click",ht);try{const[e,t,a]=await Promise.all([Qo(m.establishmentId),Ee(m.establishmentId),Ft(m.establishmentId)]);Se.allPackages=e,Se.catalogForModal={services:t.filter(s=>s.active),products:a},Ql()}catch{document.getElementById("packagesListContainer").innerHTML='<p class="text-red-500 col-span-full">Erro ao carregar pacotes.</p>'}}const Zl=document.getElementById("content");let Kl=null;async function ed(){const e=v(m.userName||"Usuário"),t=v(V.currentUser?.email||"E-mail não disponível"),a=m.userName?m.userName.charAt(0):"U";Zl.innerHTML=`
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
    `,await td()}async function td(){const e=document.getElementById("professional-agenda-block");e.innerHTML="";try{const t=m.userProfessionalId;if(t){const a=await Ks(t);Kl=a,a.photo&&(document.getElementById("user-profile-avatar").src=a.photo);const s=v(a.name);e.innerHTML=`
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
            `,ad(a.id),document.getElementById("my-blocks-filter").addEventListener("change",o=>Nt(a.id,o.target.value)),Nt(a.id,"future")}else e.innerHTML=`
                <div class="bg-gray-100 p-4 rounded-lg text-center text-gray-600">
                    <p>Você não possui um perfil de profissional associado a esta conta.</p>
                    <p class="text-sm mt-2">Para gerenciar sua agenda, peça ao administrador para associar seu usuário a um profissional existente na tela de "Usuários".</p>
                </div>
            `}catch(t){console.error("Erro ao carregar seção de profissional:",t),e.innerHTML=`
            <div class="bg-red-100 p-4 rounded-lg text-red-700">
                <p>Ocorreu um erro ao carregar os dados do profissional.</p>
                <p class="text-sm mt-2">${v(t.message)}</p>
            </div>
        `}}function ad(e){const t=document.getElementById("block-schedule-form");t.addEventListener("submit",async a=>{a.preventDefault();const s=t.querySelector("#blockDate").value,r=t.querySelector("#blockStartTime").value,o=t.querySelector("#blockEndTime").value,n=t.querySelector("#blockReason").value;if(!s||!r||!o){b("Erro","Por favor, preencha a data e os horários de início e fim.","error");return}if(r>=o){b("Erro","A hora de início deve ser anterior à hora de fim.","error");return}const i=new Date(`${s}T${r}:00`),l=new Date(`${s}T${o}:00`),d=t.querySelector('button[type="submit"]');d.disabled=!0,d.textContent="A bloquear...";try{await Ht({establishmentId:m.establishmentId,professionalId:e,reason:n||"Bloqueado (Meu Perfil)",startTime:i.toISOString(),endTime:l.toISOString()}),b("Sucesso","Agenda bloqueada com sucesso!","success"),t.reset();const c=document.getElementById("my-blocks-filter").value;Nt(e,c)}catch(c){console.error("Erro ao bloquear agenda:",c),b("Erro",`Não foi possível bloquear a agenda: ${c.message}`,"error")}finally{d.disabled=!1,d.textContent="Bloquear Agenda"}})}async function Nt(e,t="future"){const a=document.getElementById("my-blocks-list");a.innerHTML='<p class="text-gray-500">A carregar bloqueios...</p>';try{const s=new Date;let r,o;t==="history"?(o=new Date,r=new Date,r.setFullYear(r.getFullYear()-1)):(r=new Date,o=new Date,o.setFullYear(o.getFullYear()+1));let i=(await jt(m.establishmentId,r.toISOString(),o.toISOString(),e)).map(l=>({...l,startTime:new Date(l.startTime),endTime:new Date(l.endTime)}));t==="history"?i=i.filter(l=>l.endTime<s).sort((l,d)=>d.startTime-l.startTime):i=i.filter(l=>l.endTime>=s).sort((l,d)=>l.startTime-d.startTime),i.length>0?(a.innerHTML=i.map(l=>{const d=l.startTime.toLocaleDateString("pt-BR"),c=`${l.startTime.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})} - ${l.endTime.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}`,u=l.endTime<new Date,p=v(l.reason||"Sem motivo");return`
                    <div class="flex items-center justify-between p-3 ${u?"bg-gray-100 opacity-75":"bg-white border border-gray-200"} rounded-md shadow-sm">
                        <div>
                            <p class="font-semibold text-gray-800">${d} das ${c}</p>
                            <p class="text-sm text-gray-600">${p}</p>
                        </div>
                        <button data-block-id="${l.id}" class="remove-block-btn text-red-500 hover:text-red-700 text-2xl font-bold leading-none p-1" title="Apagar bloqueio">
                            &times;
                        </button>
                    </div>
                `}).join(""),a.querySelectorAll(".remove-block-btn").forEach(l=>{l.addEventListener("click",async d=>{const c=d.currentTarget.dataset.blockId;if(confirm("Tem certeza que deseja remover este bloqueio?"))try{await Ca(c),b("Sucesso","Bloqueio removido.","success"),Nt(e,t)}catch(u){console.error("Erro ao remover bloqueio:",u),b("Erro",`Não foi possível remover o bloqueio: ${u.message}`,"error")}})})):a.innerHTML=`<p class="text-gray-500 py-4 text-center">Nenhum bloqueio ${t==="history"?"no histórico recente":"futuro agendado"}.</p>`}catch(s){console.error("Erro ao carregar bloqueios:",s),a.innerHTML=`<p class="text-red-500">Erro ao carregar bloqueios: ${v(s.message)}</p>`}}const xt=document.getElementById("loadingScreen"),oa=document.getElementById("dashboardContent"),sa=document.getElementById("content"),ko=document.getElementById("notificationBell"),ra=document.getElementById("notificationBadge"),yt=document.getElementById("notificationPanel"),So=document.getElementById("notificationList"),na=document.getElementById("profileMenuButton"),ee=document.getElementById("profileDropdown"),od=document.getElementById("profileName"),sd=document.getElementById("profileEmail"),rd=document.getElementById("logoutButton"),nd=document.getElementById("cancellationHistoryBtn"),$o=document.getElementById("myProfileLink"),Eo={indigo:{main:"#4f46e5",hover:"#4338ca",light:"#e0e7ff",text:"#ffffff"},blue:{main:"#2563eb",hover:"#1d4ed8",light:"#dbeafe",text:"#ffffff"},sky:{main:"#0284c7",hover:"#0369a1",light:"#e0f2fe",text:"#ffffff"},teal:{main:"#0d9488",hover:"#0f766e",light:"#ccfbf1",text:"#ffffff"},emerald:{main:"#059669",hover:"#047857",light:"#d1fae5",text:"#ffffff"},green:{main:"#16a34a",hover:"#15803d",light:"#dcfce7",text:"#ffffff"},lime:{main:"#65a30d",hover:"#4d7c0f",light:"#ecfccb",text:"#ffffff"},amber:{main:"#d97706",hover:"#b45309",light:"#fef3c7",text:"#1f2937"},orange:{main:"#ea580c",hover:"#c2410c",light:"#ffedd5",text:"#ffffff"},red:{main:"#dc2626",hover:"#b91c1c",light:"#fee2e2",text:"#ffffff"},rose:{main:"#e11d48",hover:"#be123c",light:"#ffe4e6",text:"#ffffff"},pink:{main:"#db2777",hover:"#be185d",light:"#fce7f3",text:"#ffffff"},fuchsia:{main:"#c026d3",hover:"#a21caf",light:"#fae8ff",text:"#ffffff"},purple:{main:"#7c3aed",hover:"#6d28d9",light:"#ede9fe",text:"#ffffff"},violet:{main:"#8b5cf6",hover:"#7c3aed",light:"#ddd6fe",text:"#ffffff"},gray:{main:"#4b5563",hover:"#374151",light:"#f3f4f6",text:"#ffffff"},black:{main:"#111827",hover:"#000000",light:"#e5e7eb",text:"#ffffff"}};let tt=null,at=[];const id={"agenda-section":Go,"comandas-section":Ta,"relatorios-section":$n,"servicos-section":Fn,"produtos-section":Kn,"suppliers-section":li,"profissionais-section":Tt,"clientes-section":Ii,"estabelecimento-section":vs,"ausencias-section":nl,"users-section":Bt,"sales-report-section":kl,"financial-section":Pl,"commissions-section":ql,"packages-section":ja,"my-profile-section":ed};function ld(e){const t=Eo[e]||Eo.indigo,s=(o=>{const n=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(o);return n?`${parseInt(n[1],16)}, ${parseInt(n[2],16)}, ${parseInt(n[3],16)}`:"79, 70, 229"})(t.main);document.body.style.setProperty("--theme-main",t.main);const r=document.getElementById("dynamic-theme-styles");r.innerHTML=`
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
    `}function ya(){const e=at.filter(t=>!t.read).length;if(e>0?(ra.textContent=e,ra.classList.remove("hidden")):ra.classList.add("hidden"),at.length===0){So.innerHTML='<p class="text-center text-gray-500 p-4">Nenhuma notificação.</p>';return}So.innerHTML=at.map(t=>`
    <div class="notification-item ${t.read?"":"unread"}">
    <p class="font-semibold">${t.title}</p>
    <p class="text-sm text-gray-600">${t.message}</p>
    <p class="text-xs text-gray-400 mt-1">${t.time}</p>
    </div>
    `).join("")}function dd(e){tt&&tt();const t=ue(U,"establishments",e,"notifications"),a=qt(t,ot("timestamp",">=",new Date),To("timestamp","desc"));tt=Ds(a,s=>{s.docChanges().forEach(r=>{if(r.type==="added"){const o=r.doc.data();at.unshift({title:o.title,message:o.message,time:o.timestamp.toDate().toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),read:!1}),b(o.title,o.message,"info",!0),ya();const n=document.querySelector(".sidebar-link.active");n&&n.dataset.target==="agenda-section"&&(o.type==="cancellation"||o.type==="new_appointment")&&(console.log("Atualizando agenda em tempo real..."),Go())}})},s=>{console.error("Erro no listener de notificações em tempo real:",s)})}function re(e,t={}){const a=e.replace("-section","");if(e!=="my-profile-section"){const r=m.enabledModules?.[a]!==!1,o=m.userPermissions===null||m.userPermissions[e]?.view===!0;if(!r||!o){sa.innerHTML='<div class="p-8 text-center"><h2 class="text-2xl font-bold text-red-600">Acesso Negado</h2><p class="text-gray-600">Você não tem permissão para visualizar este módulo.</p></div>',document.querySelectorAll(".sidebar-link").forEach(n=>n.classList.remove("active"));return}}const s=id[e];s?(document.querySelectorAll(".sidebar-link").forEach(r=>{r.classList.toggle("active",r.getAttribute("data-target")===e)}),e==="my-profile-section"&&document.querySelectorAll(".sidebar-link").forEach(r=>r.classList.remove("active")),sa.innerHTML="",s(t)):sa.innerHTML=`<div class="p-8 text-center"><h2 class="text-2xl font-bold">Página em Construção</h2><p class="text-gray-600">O módulo para "${e}" ainda não foi implementado.</p></div>`}async function cd(e){const t=document.getElementById("kpi-appointments-wrapper"),a=document.getElementById("kpi-financial-wrapper"),s=document.getElementById("kpi-today-appointments"),r=document.getElementById("kpi-today-revenue"),o=e===null||e["agenda-section"]?.view===!0,n=e===null||e["financial-section"]?.view===!0;if(o&&t&&t.classList.remove("hidden"),n&&a&&a.classList.remove("hidden"),!(!o&&!n))try{const i=await Ir();o&&s&&(s.textContent=i.todayAppointments.toString()),n&&r&&(r.textContent=`R$ ${i.todayRevenue.toFixed(2).replace(".",",")}`)}catch(i){console.error("Erro ao carregar KPIs do cabeçalho:",i)}}async function ud(e){try{console.log("[Nativo] Iniciando configuração de Push..."),ye.getPlatform()==="android"&&(await G.createChannel({id:"default",name:"Notificações Gerais",description:"Alertas de agendamentos e avisos",importance:5,visibility:1,vibration:!0}),console.log("Canal Android criado."));let t=await G.checkPermissions();if(t.receive==="prompt"&&(t=await G.requestPermissions()),t.receive!=="granted"){alert("ERRO: Permissão de notificações negada!");return}await G.register(),G.addListener("registration",async a=>{console.log("Push Token gerado:",a.value);try{const s=ce(U,"users",e);await wa(s,{fcmTokens:Bs(a.value),platform:"native_mobile"}),console.log("Token FCM salvo no perfil do utilizador (Nativo).")}catch(s){alert("Erro ao salvar no Banco: "+s.message),console.error("Erro ao salvar token FCM:",s)}}),G.addListener("registrationError",a=>{alert("FALHA DE REGISTO: "+JSON.stringify(a)),console.error("Erro no registo de push notifications:",a)}),G.addListener("pushNotificationReceived",a=>{console.log("Notificação Push recebida:",a),b(a.title,a.body,"info",!0)}),G.addListener("pushNotificationActionPerformed",a=>{console.log("Ação na notificação push:",a),re("agenda-section")})}catch(t){alert("Erro Fatal Push: "+t.message),console.log("Push Notifications não suportado/inicializado:",t)}}async function md(){try{await Cs(V,Ls),console.log("Persistência LOCAL configurada na inicialização.")}catch(e){console.error("Erro ao definir persistência no main.js",e)}ye.isNativePlatform()&&(document.body.classList.add("is-app-native"),console.log("Modo App Nativo detectado: Layout ajustado para Safe Areas.")),_s(),ko.addEventListener("click",e=>{e.stopPropagation(),yt.classList.toggle("hidden"),yt.classList.contains("hidden")||(at.forEach(t=>t.read=!0),ya())}),nd.addEventListener("click",()=>{Js()}),na.addEventListener("click",e=>{e.stopPropagation(),ee.classList.toggle("active"),ee.classList.contains("active")?ee.classList.remove("hidden"):setTimeout(()=>ee.classList.add("hidden"),200)}),$o&&$o.addEventListener("click",e=>{e.preventDefault(),re("my-profile-section"),ee.classList.remove("active"),ee.classList.add("hidden")}),document.addEventListener("click",e=>{!yt.contains(e.target)&&e.target!==ko&&yt.classList.add("hidden"),!ee.contains(e.target)&&e.target!==na&&ee.classList.contains("active")&&(ee.classList.remove("active"),setTimeout(()=>ee.classList.add("hidden"),200))}),Io(V,async e=>{if(e){if(console.log("Usuário detectado:",e.email),!ye.isNativePlatform()&&(console.log("Inicializando Web Push (PWA)..."),Ro(),"Notification"in window&&Notification.permission==="default")){const t=document.getElementById("toast-notification-request"),a=document.getElementById("btn-enable-toast"),s=document.getElementById("btn-deny-toast"),r=document.getElementById("btn-close-toast");setTimeout(()=>{t&&(t.style.display="block")},3500),a&&a.addEventListener("click",async()=>{await Fo()&&t&&(t.style.display="none")});const o=()=>{t&&(t.style.display="none")};s&&s.addEventListener("click",o),r&&r.addEventListener("click",o)}try{const a=(await e.getIdTokenResult(!0)).claims;if((a.role==="owner"||a.role==="employee")&&a.establishmentId){const s=await $e(a.establishmentId);m.enabledModules=s.modules,ld(s.themeColor||"indigo");let r=null,o=e.displayName,n=null;if(a.role==="employee"||a.role==="owner"){const d=ce(U,"users",e.uid),c=await Co(d);if(c.exists()){const u=c.data();r=a.role==="employee"?u.permissions||{}:null,o=u.name||o,n=u.professionalId||null}else if(a.role==="employee")throw new Error("Dados de permissão do funcionário não encontrados.")}m.userProfessionalId=n,ye.isNativePlatform()&&ud(e.uid);const i=o||e.email;Ns(a.establishmentId,s.name,r),na.textContent=i.charAt(0).toUpperCase(),od.textContent=i,sd.textContent=e.email;const l=()=>{tt&&tt(),Oa(V).then(()=>window.location.href="/login.html")};rd.addEventListener("click",d=>{d.preventDefault(),l()}),Qs(re,r,m.enabledModules),cd(r),dd(a.establishmentId),ya(),xt.classList.add("fade-out"),oa.style.display="flex",setTimeout(()=>{xt.style.display="none"},500),console.log("Verificando Onboarding..."),setTimeout(()=>{cr()},1500),re("agenda-section")}else throw new Error("Utilizador não tem permissão de 'owner' ou 'employee' ou 'establishmentId'.")}catch(t){console.error("Erro crítico na inicialização do painel:",t),xt.classList.add("fade-out"),setTimeout(()=>{xt.style.display="none"},500),oa.innerHTML=`
                    <div class="w-full h-full flex flex-col items-center justify-center bg-gray-100 p-4">
                        <h2 class="text-2xl font-bold text-red-600 mb-4">Erro de Acesso</h2>
                        <p class="text-gray-700 text-center mb-6">Não foi possível carregar os seus dados ou permissões. Isto pode acontecer se a sua conta foi desativada ou está configurada incorretamente.</p>
                        <p class="text-sm text-gray-500 mb-6">Detalhe do erro: ${t.message}</p>
                        <button id="errorLogoutButton" class="bg-red-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-red-700">Sair e Tentar Novamente</button>
                    </div>
                `,oa.style.display="flex",document.getElementById("errorLogoutButton").addEventListener("click",()=>{Oa(V).then(()=>window.location.href="/login.html")})}}else window.location.href="/login.html"})}md();Io(V,async e=>{if(e){await Ro();const a="Notification"in window&&Notification.permission==="default",s=window.Capacitor&&window.Capacitor.isNativePlatform();if(a&&!s){const r=document.getElementById("toast-notification-request"),o=document.getElementById("btn-enable-toast"),n=document.getElementById("btn-deny-toast"),i=document.getElementById("btn-close-toast");setTimeout(()=>{r&&(r.style.display="block")},3500),o&&o.addEventListener("click",async()=>{await Fo()&&r&&(r.style.display="none")});const l=()=>{r&&(r.style.display="none")};n&&n.addEventListener("click",l),i&&i.addEventListener("click",l)}}});
