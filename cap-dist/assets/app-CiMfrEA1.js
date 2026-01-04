import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css               */import{a as _e,d as Ae,m as mc}from"./firebase-config-C2tbVz-J.js";import{EmailAuthProvider as uh,reauthenticateWithCredential as mh,verifyBeforeUpdateEmail as ph,updatePassword as hh,updateProfile as gh,setPersistence as fh,browserLocalPersistence as bh,onAuthStateChanged as ou,signOut as pc}from"https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";import{addDoc as ru,collection as At,query as cr,where as Dn,getDocs as ui,orderBy as au,writeBatch as iu,doc as rs,serverTimestamp as hc,deleteDoc as vh,updateDoc as lu,getDoc as yh,arrayUnion as xh,onSnapshot as wh}from"https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";import"https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";import"https://www.gstatic.com/firebasejs/11.6.1/firebase-storage.js";import"https://www.gstatic.com/firebasejs/11.6.1/firebase-messaging.js";const w={establishmentId:null,establishmentName:null,userName:null,userProfessionalId:null,userPermissions:null,establishmentSettings:null,enabledModules:{agenda:!0,comandas:!0,relatorios:!0,commissions:!0,packages:!0,financial:!0,servicos:!0,produtos:!0,profissionais:!0,clientes:!0,users:!0,estabelecimento:!0},professionals:[],services:[],professionalColors:new Map,allEvents:[]};function Eh(t,e,s){w.establishmentId=t,w.establishmentName=e,w.userPermissions=s}const Ra="https://kairos-app-407358446276.us-central1.run.app";console.log("🚀 API configurada para Produção (US):",Ra);async function Ih(){const t=_e.currentUser;return t?{"Content-Type":"application/json",Authorization:`Bearer ${await t.getIdToken()}`}:(console.warn("Usuário não logado, tentando redirecionar para /login"),window.location.href="/login",null)}async function F(t,e={}){const s=await Ih();if(!s)throw new Error("Utilizador não autenticado. A requisição foi cancelada.");const n=Ra.replace(/\/$/,""),o=t.startsWith("/")?t:`/${t}`,r=`${n}${o}`;console.log(`AuthenticatedFetch: ${e.method||"GET"} ${r}`);try{const a=await fetch(r,{...e,headers:{...s,...e.headers}});if(!a.ok){const c=(await a.json().catch(()=>({message:a.statusText}))).message||`Erro na API: ${a.status}`;if(c.includes("FAILED_PRECONDITION")&&c.includes("requires an index")){const d=/(https:\/\/[^\s]+)/,p=c.match(d),h=p?p[0]:"URL não encontrada na mensagem de erro.";console.warn(`%c AVISO IMPORTANTE (FIREBASE): ÍNDICE NECESSÁRIO! %c
                    
Sua consulta em '${t}' falhou porque um índice composto do Firestore é necessário.
Para corrigir isso, clique no link abaixo (com o Firebase logado) e crie o índice:
                    
%c${h}%c
                    
--------------------------------------------------------------------`,"background-color: #ffc; color: #663300; font-size: 14px; font-weight: bold; padding: 5px;","color: #663300; font-size: 12px;","color: #0000ff; font-size: 12px; font-weight: bold; text-decoration: underline;","color: #663300; font-size: 12px;")}throw console.error(`Erro na API (${a.status}) em ${r}:`,c),new Error(c)}return a.json()}catch(a){throw console.error(`Falha de rede ao tentar acessar ${r}:`,a.message),a.message.includes("Failed to fetch")||a.message.includes("NetworkError")?new Error(`Não foi possível conectar ao servidor em ${Ra}. Verifique sua conexão com a internet.`):a}}const cu=(t,e,s,n=null)=>{let o=`/api/appointments/${t}?startDate=${e}&endDate=${s}`;return n&&(o+=`&professionalId=${n}`),F(o)},Sh=(t,e,s)=>{const n=`/api/appointments/cancelled/${t}?startDate=${e}&endDate=${s}`;return F(n)},Th=({establishmentId:t,professionalId:e,serviceIds:s,date:n})=>{const o=`/api/availability?establishmentId=${t}&professionalId=${e}&serviceIds=${s.join(",")}&date=${n}`;return F(o)},kh=t=>F("/api/appointments",{method:"POST",body:JSON.stringify(t)}),mi=(t,e)=>F(`/api/appointments/${t}`,{method:"PUT",body:JSON.stringify(e)}),Ch=t=>F(`/api/appointments/${t}`,{method:"DELETE"}),_h=t=>F(`/api/appointments/${t}/reopen`,{method:"POST"}),Ah=(t,e)=>F(`/api/appointments/${t}/checkout`,{method:"POST",body:JSON.stringify(e)});let Le;async function Ph(){if(!Le)try{Le=new(window.AudioContext||window.webkitAudioContext)}catch(t){console.error("Não foi possível inicializar o áudio:",t)}}function $h(){if(!Le){console.warn("AudioContext não inicializado. O som não será tocado.");return}Le.state==="suspended"&&Le.resume();const t=Le.createOscillator(),e=Le.createGain();t.connect(e),e.connect(Le.destination),t.type="sine",t.frequency.setValueAtTime(800,Le.currentTime),e.gain.setValueAtTime(0,Le.currentTime),e.gain.linearRampToValueAtTime(.3,Le.currentTime+.01),e.gain.exponentialRampToValueAtTime(1e-4,Le.currentTime+.2),t.start(Le.currentTime),t.stop(Le.currentTime+.2)}function k(t,e,s="info",n=!1){const o=document.getElementById("toast-container");if(!o)return;n&&$h();const r=document.createElement("div"),a={success:"bg-green-50 border-green-400 text-green-700",error:"bg-red-50 border-red-400 text-red-700",info:"bg-blue-50 border-blue-400 text-blue-700"},l={success:'<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',error:'<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',info:'<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>'},c={success:"bg-green-500",error:"bg-red-500",info:"bg-blue-500"};r.className=`toast ${a[s]||a.info}`,r.innerHTML=`
        <div class="toast-icon">${l[s]||l.info}</div>
        <div class="toast-content">
            <p class="font-bold">${t}</p>
            <p class="text-sm">${e}</p>
        </div>
        <button class="toast-close">&times;</button>
        <div class="toast-progress-bar">
            <div class="toast-progress ${c[s]||c.info}"></div>
        </div>
    `,o.appendChild(r),r.querySelector(".toast-close").addEventListener("click",()=>r.remove()),setTimeout(()=>{r.remove()},4e3)}function re(t,e){const s=document.getElementById("genericModal");return new Promise(n=>{s.innerHTML=`
            <div class="modal-content max-w-sm p-0 rounded-xl overflow-hidden shadow-2xl">
                <div class="p-6 text-center">
                    <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100">
                        <svg class="h-6 w-6 text-yellow-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h3 class="text-xl leading-6 font-bold text-gray-900 mt-4">${t}</h3>
                    <div class="mt-2 text-sm text-gray-600">
                        <p>${e}</p>
                    </div>
                </div>
                <div class="bg-gray-50 px-4 py-3 flex justify-center gap-3 border-t">
                    <button id="genericModalCancelBtn" class="flex-1 py-2 px-4 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition text-sm">Cancelar</button>
                    <button id="genericModalConfirmBtn" class="flex-1 py-2 px-4 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition text-sm">Confirmar</button>
                </div>
            </div>`,s.style.display="flex",document.getElementById("genericModalConfirmBtn").onclick=()=>{s.style.display="none",n(!0)},document.getElementById("genericModalCancelBtn").onclick=()=>{s.style.display="none",n(!1)}})}function Pe({title:t,contentHTML:e,maxWidth:s="max-w-4xl",showCloseButton:n=!0}){let o=document.getElementById("genericModal");const r=o.cloneNode(!1);o.parentNode.replaceChild(r,o),o=r;const a=()=>{o.style.display="none"},l=p=>{o.querySelector("#genericModalContentBody").innerHTML=p};o.innerHTML=`
        <div class="modal-content ${s} p-0 rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[95vh]">
            
            <header class="p-5 border-b flex justify-between items-center bg-gray-50">
                <h2 class="text-xl font-bold text-gray-800">${t}</h2>
                ${n?'<button data-close-modal class="text-2xl font-bold text-gray-500 hover:text-gray-900">&times;</button>':""}
            </header>

            <div id="genericModalContentBody" class="flex-1 overflow-y-auto p-5">
                ${e}
            </div>
            
            <footer id="genericModalFooter" class="hidden"></footer>
        </div>
    `;const c=o.querySelector("[data-close-modal]");c&&(c.onclick=a);const d=o.querySelector('[data-action="close-modal"]');return d&&(d.onclick=a),o.addEventListener("click",p=>{p.target.closest(".modal-content")||a()}),o.style.display="flex",{modalElement:o,close:a,setContent:l}}function dr(t){const e=document.getElementById(t);e&&(e.style.display="none")}function Dh(){document.body.addEventListener("click",()=>{Le||Ph()},{once:!0}),document.addEventListener("click",t=>{const e=t.target.closest('[data-action="close-modal"]');if(e){const n=e.dataset.target;if(n){const o=document.getElementById(n);o&&(o.style.display="none")}}if(t.target.closest("[data-close-modal]")){const n=document.getElementById("genericModal");n&&(n.style.display="none")}})}async function gc(){const t=document.getElementById("cancellationListContainer");if(!t)return;t.innerHTML='<div class="loader mx-auto"></div>';const e=document.getElementById("cancelStartDate").value,s=document.getElementById("cancelEndDate").value;try{const n=await Sh(w.establishmentId,e,s);if(n.length===0){t.innerHTML='<p class="text-center text-gray-500 py-4">Nenhum cancelamento encontrado para este período.</p>';return}t.innerHTML=n.map(o=>`
            <div class="bg-red-50 p-3 rounded-lg border-l-4 border-red-400">
                <div class="flex justify-between items-center">
                    <div>
                        <p class="font-bold text-gray-800">${o.clientName}</p>
                        <p class="text-sm text-gray-600">${new Date(o.date).toLocaleString("pt-BR",{dateStyle:"short",timeStyle:"short"})} - ${o.serviceName}</p>
                        <p class="text-xs text-gray-500">com ${o.professionalName}</p>
                    </div>
                </div>
            </div>
        `).join("")}catch(n){t.innerHTML=`<p class="text-red-500 text-center py-4">Erro ao carregar histórico: ${n.message}</p>`}}function Lh(){const t=new Date().toISOString().split("T")[0],e=new Date;e.setDate(e.getDate()-30);const n=`
        <div class="flex flex-col sm:flex-row sm:items-end gap-4 bg-gray-100 p-3 rounded-lg mb-4">
            
            <div class="w-full sm:flex-grow">
                <label for="cancelStartDate" class="text-sm font-medium">De:</label>
                <input type="date" id="cancelStartDate" value="${e.toISOString().split("T")[0]}" class="w-full p-2 border rounded-md">
            </div>
            
            <div class="w-full sm:flex-grow">
                <label for="cancelEndDate" class="text-sm font-medium">Até:</label>
                <input type="date" id="cancelEndDate" value="${t}" class="w-full p-2 border rounded-md">
            </div>
            
            <button id="searchCancellationsBtn" class="w-full sm:w-auto flex-shrink-0 py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">Buscar</button>
        </div>
        <div id="cancellationListContainer" class="space-y-3 max-h-96 overflow-y-auto pr-2">
            <div class="loader mx-auto"></div>
        </div>
    `,{modalElement:o}=Pe({title:"Histórico de Cancelamentos",contentHTML:n,maxWidth:"max-w-3xl"});o.querySelector("#searchCancellationsBtn").addEventListener("click",gc),gc()}const Fe=document.getElementById("sidebar"),fc=document.getElementById("sidebarToggle"),yn=document.getElementById("mainContent"),Rh=document.querySelectorAll(".sidebar-link"),bc=document.getElementById("hamburger-menu-btn"),Ls=document.getElementById("mobile-overlay");function Po(t){!Fe||!yn||(Fe.classList.toggle("collapsed",t),yn.classList.toggle("sidebar-collapsed-shift",t))}function Mh(){!Fe||!Ls||(Fe.classList.add("mobile-open"),Ls.classList.add("visible"))}function po(){!Fe||!Ls||(Fe.classList.remove("mobile-open"),Ls.classList.remove("visible"))}function Nh(){Po(!Fe.classList.contains("collapsed"))}function Bh(t,e,s){if(!Fe||!yn)return;yn.classList.add("main-content-shift"),window.innerWidth>=768?Po(Fe.classList.contains("collapsed")):(yn.classList.remove("main-content-shift","sidebar-collapsed-shift"),po()),fc&&fc.addEventListener("click",o=>{o.stopPropagation(),Nh()}),Fe.addEventListener("mouseenter",()=>{window.innerWidth>=1024&&Fe.classList.contains("collapsed")&&Po(!1)}),Fe.addEventListener("mouseleave",()=>{window.innerWidth>=1024&&(document.querySelector("#sidebarToggle:hover")||Po(!0))}),bc&&bc.addEventListener("click",o=>{o.stopPropagation(),Mh()}),Ls&&Ls.addEventListener("click",o=>{o.stopPropagation(),po()});let n=0;Fe.addEventListener("touchstart",o=>{n=o.changedTouches[0].screenX},{passive:!0}),Fe.addEventListener("touchend",o=>{const r=o.changedTouches[0].screenX;n-r>50&&po()},{passive:!0}),Rh.forEach(o=>{const r=o.getAttribute("data-target"),a=r.replace("-section",""),l=s?.[a]!==!1,c=e===null||e[r]?.view===!0;if(!l||!c){o.style.display="none";return}o.style.display="flex",o.addEventListener("click",d=>{d.preventDefault(),r&&typeof t=="function"&&t(r),window.innerWidth<768&&po()})})}const ms=t=>{const e=t||w.establishmentId;return e?F(`/api/establishments/${e}`):Promise.reject(new Error("ID do estabelecimento não fornecido."))},$o=(t,e)=>{const s=t||w.establishmentId;return s?F(`/api/establishments/${s}`,{method:"PUT",body:JSON.stringify(e)}):Promise.reject(new Error("ID do estabelecimento não fornecido."))},Vh=(t,e)=>{const s=t||w.establishmentId;return s?F(`/api/establishments/${s}/booking-status`,{method:"PATCH",body:JSON.stringify({publicBookingEnabled:e})}):Promise.reject(new Error("ID do estabelecimento não fornecido."))},Fh=(t,e)=>{const s=t||w.establishmentId;return s?F(`/api/establishments/${s}/owner-email`,{method:"PATCH",body:JSON.stringify({newEmail:e})}):Promise.reject(new Error("ID do estabelecimento não fornecido."))},ze=t=>F(`/api/professionals/${t}`),Oh=t=>F(`/api/professionals/details/${t}`),du=t=>F("/api/professionals",{method:"POST",body:JSON.stringify(t)}),Oo=(t,e)=>F(`/api/professionals/${t}`,{method:"PUT",body:JSON.stringify(e)}),vc=(t,e)=>Oo(t,{services:e}),uu=t=>F(`/api/professionals/${t}`,{method:"DELETE"}),qh=t=>{const e=t.map(s=>uu(s));return Promise.all(e)},ps=t=>F(`/api/services/${t}`),mu=t=>F("/api/services",{method:"POST",body:JSON.stringify(t)}),jh=(t,e)=>F(`/api/services/${t}`,{method:"PUT",body:JSON.stringify(e)}),Hh=t=>F(`/api/services/${t}`,{method:"DELETE"}),Uh=(t,e)=>F(`/api/services/${t}/status`,{method:"PATCH",body:JSON.stringify({active:e})}),zh=t=>F(`/api/services/stats/most-popular/${t}`),ur=t=>F(`/api/products/${t}`),pu=t=>F("/api/products",{method:"POST",body:JSON.stringify(t)}),Wh=(t,e)=>F(`/api/products/${t}`,{method:"PUT",body:JSON.stringify(e)}),Gh=t=>F(`/api/products/${t}`,{method:"DELETE"}),Kh=(t,e)=>F(`/api/products/${t}/stock`,{method:"PATCH",body:JSON.stringify(e)}),Jh=({startDate:t,endDate:e,productId:s,categoryId:n,establishmentId:o})=>{const r=new URLSearchParams({startDate:t,endDate:e});return s&&s!=="all"&&r.append("productId",s),n&&n!=="all"&&r.append("categoryId",n),o&&r.append("establishmentId",o),F(`/api/products/stock-history/report?${r.toString()}`)},Qh={indigo:{name:"Padrão (Índigo)",main:"#4f46e5"},blue:{name:"Azul",main:"#2563eb"},sky:{name:"Céu",main:"#0284c7"},teal:{name:"Verde Água",main:"#0d9488"},emerald:{name:"Esmeralda",main:"#059669"},green:{name:"Verde",main:"#16a34a"},lime:{name:"Lima",main:"#65a30d"},amber:{name:"Âmbar",main:"#d97706"},orange:{name:"Laranja",main:"#ea580c"},red:{name:"Vermelho",main:"#dc2626"},rose:{name:"Rosa",main:"#e11d48"},pink:{name:"Pink",main:"#db2777"},fuchsia:{name:"Fúcsia",main:"#c026d3"},purple:{name:"Roxo",main:"#7c3aed"},violet:{name:"Violeta",main:"#8b5cf6"},gray:{name:"Cinza",main:"#4b5563"},black:{name:"Preto",main:"#111827"}};function yc(t,e,s){return new Promise((n,o)=>{const r=new FileReader;r.readAsDataURL(t),r.onload=a=>{const l=new Image;l.src=a.target.result,l.onload=()=>{const c=document.createElement("canvas");let d=l.width,p=l.height;d>e&&(p*=e/d,d=e),c.width=d,c.height=p,c.getContext("2d").drawImage(l,0,0,d,p);const f=t.type==="image/png"&&e<500?"image/png":"image/jpeg";n(c.toDataURL(f,s))},l.onerror=c=>o(c)},r.onerror=a=>o(a)})}let kt=null;const Do=[{id:"company_data",title:"Identidade do Negócio",icon:"🏢",description:"Configure os dados da sua empresa."},{id:"branding",title:"Sua Marca",icon:"🎨",description:"Logo e cores (Opcional)."},{id:"time_config",title:"O Relógio",icon:"⏱️",description:"Tempo padrão entre agendamentos."},{id:"first_service",title:"O Menu",icon:"✂️",description:"Seu principal serviço."},{id:"first_prof",title:"Sua Equipe",icon:"💇",description:"Cadastre o primeiro profissional."},{id:"first_product",title:"O Estoque",icon:"🧴",description:"Cadastre um produto (opcional)."}];let We=0,qo=[];async function Xh(){try{console.log("Iniciando verificação de Onboarding para ID:",w.establishmentId);const t=await ms(w.establishmentId),e=await ze(w.establishmentId),s=await ps(w.establishmentId);qo=s||[];const n=t&&t.name&&(t.phone||t.address),o=t&&(t.logo||t.themeColor&&t.themeColor!=="indigo"),r=t&&t.slotInterval>0,a=s&&s.length>0,l=e&&e.length>0;if(console.log("Status Onboarding:",{hasCompanyData:n,hasBranding:o,hasTimeConfig:r,hasService:a,hasProf:l}),n&&r&&l&&a)return;if(!n)We=0;else if(!o&&!r)We=1;else if(!r)We=2;else if(!a)We=3;else if(!l)We=4;else if(We===0)return;Yh(),hi(We)}catch(t){console.error("Erro ao verificar onboarding:",t)}}function Yh(){document.getElementById("onboarding-overlay")||(kt=document.createElement("div"),kt.id="onboarding-overlay",kt.className="fixed inset-0 bg-gray-900 bg-opacity-95 z-[9999] flex items-center justify-center p-4 overflow-y-auto",kt.style.cssText="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background-color: rgba(17, 24, 39, 0.95); z-index: 9999; display: flex; align-items: center; justify-content: center;",kt.innerHTML=`
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
    `,document.body.appendChild(kt),pi())}function pi(){const t=Math.round(We/Do.length*100),e=document.getElementById("progress-bar"),s=document.getElementById("progress-text");e&&(e.style.width=`${t}%`),s&&(s.innerText=`${t}%`)}function hi(t){const e=document.getElementById("onboarding-step-content"),s=Do[t];if(!s){xc(e);return}let n="";if(s.id==="company_data")n=`
            <form id="step-form" class="space-y-3">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                        <label class="block text-xs font-bold text-gray-700 uppercase">Nome do Estabelecimento</label>
                        <input type="text" name="name" class="mt-1 w-full p-2 border rounded text-sm" required placeholder="Ex: Barbearia do João">
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-gray-700 uppercase">Seu Nome</label>
                        <input type="text" name="ownerName" class="mt-1 w-full p-2 border rounded text-sm" required value="${w.userName||""}">
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                        <label class="block text-xs font-bold text-gray-700 uppercase">WhatsApp</label>
                        <input type="tel" name="phone" class="mt-1 w-full p-2 border rounded text-sm" required placeholder="(00) 00000-0000">
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-gray-700 uppercase">E-mail</label>
                        <input type="email" name="email" class="mt-1 w-full p-2 border rounded text-sm" required value="${w.userEmail||""}">
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
        `;else if(s.id==="branding")n=`
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
                            ${Object.entries(Qh).map(([r,a])=>`<option value="${r}">${a.name}</option>`).join("")}
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
        `;else if(s.id==="time_config")n=`
            <form id="step-form" class="space-y-4">
                <p class="text-gray-600 text-sm">Selecione o intervalo padrão da agenda.</p>
                
                <div class="grid grid-cols-3 gap-2">
                    ${[10,15,20,30,45,60].map(o=>`
                        <label class="cursor-pointer">
                            <input type="radio" name="slotInterval" value="${o}" class="peer sr-only" ${o===30?"checked":""}>
                            <div class="text-center py-2 px-1 border rounded hover:bg-indigo-50 peer-checked:bg-indigo-600 peer-checked:text-white peer-checked:border-indigo-600 transition-all font-bold text-sm text-gray-700">
                                ${o} min
                            </div>
                        </label>
                    `).join("")}
                </div>
            </form>
        `;else if(s.id==="first_service")n=`
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
        `;else if(s.id==="first_prof"){const o=qo.map(a=>`<option value="${a.id}">${a.name}</option>`).join(""),r=qo.length>0;n=`
            <form id="step-form" class="space-y-3">
                <p class="text-gray-600 text-sm">Quem realiza os serviços? (Pode ser você!)</p>
                <div>
                    <label class="block text-xs font-bold text-gray-700 uppercase">Nome</label>
                    <input type="text" name="name" class="mt-1 w-full p-2 border rounded text-sm" required value="${w.userName||""}">
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-700 uppercase">Especialidade</label>
                    <input type="text" name="role" class="mt-1 w-full p-2 border rounded text-sm" placeholder="Ex: Cabeleireiro">
                </div>
                ${r?`
                <div>
                    <label class="block text-xs font-bold text-gray-700 uppercase">Serviço Principal</label>
                    <select name="serviceId" class="mt-1 w-full p-2 border rounded text-sm bg-white">
                        ${o}
                    </select>
                </div>
                `:""}
            </form>
        `}else s.id==="first_product"&&(n=`
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
        `);if(e.innerHTML=`
        <div class="flex items-center mb-4">
            <span class="text-3xl mr-3">${s.icon}</span>
            <div>
                <h3 class="text-lg font-bold text-gray-800">${s.title}</h3>
                <p class="text-gray-500 text-xs">${s.description}</p>
            </div>
        </div>
        
        ${n}

        <div class="mt-6 flex justify-end gap-2">
            ${s.id==="first_product"||s.id==="branding"?'<button type="button" id="skip-btn" class="text-gray-500 hover:text-gray-700 font-medium text-sm px-3 py-2">Pular</button>':""}
            <button type="button" id="next-step-btn" class="bg-indigo-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-indigo-700 transition flex items-center gap-2 text-sm">
                ${t===Do.length-1?"Concluir":"Próximo"}
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
            </button>
        </div>
    `,document.getElementById("next-step-btn").addEventListener("click",()=>Zh(s.id)),document.getElementById("skip-btn")&&document.getElementById("skip-btn").addEventListener("click",()=>{t===Do.length-1?xc(e):(We++,pi(),hi(We))}),s.id==="branding"){const o=document.getElementById("logo-input"),r=document.getElementById("bg-input");o&&(o.onchange=async a=>{const l=a.target.files[0];if(l)try{const c=await yc(l,200,.8);document.getElementById("logo-base64").value=c,document.getElementById("logo-preview").innerHTML=`<img src="${c}" class="w-full h-full object-contain rounded">`}catch(c){console.error("Erro logo",c)}}),r&&(r.onchange=async a=>{const l=a.target.files[0];if(l)try{const c=await yc(l,1024,.7);document.getElementById("bg-base64").value=c}catch(c){console.error("Erro bg",c)}})}}function xc(t){t.innerHTML=`
        <div class="text-center py-6">
            <div class="text-5xl mb-3">🏆</div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">Tudo Pronto!</h3>
            <p class="text-gray-600 text-sm mb-6">Seu sistema está configurado. Boas vendas!</p>
            <button id="finish-onboarding-btn" class="bg-indigo-600 text-white font-bold py-2 px-6 rounded-full hover:bg-indigo-700 transition shadow-lg transform hover:scale-105 text-sm">
                Acessar Painel
            </button>
        </div>
    `;const e=document.getElementById("progress-bar"),s=document.getElementById("progress-text");e&&(e.style.width="100%"),s&&(s.innerText="100%"),document.getElementById("finish-onboarding-btn").onclick=()=>{kt&&kt.remove(),window.location.reload()}}async function Zh(t){const e=document.getElementById("step-form");if(!e.reportValidity())return;const s=document.getElementById("next-step-btn"),n=s.innerHTML;s.disabled=!0,s.innerHTML="Salvando...";const o=new FormData(e),r=Object.fromEntries(o.entries());try{if(t==="company_data")await $o(w.establishmentId,{name:r.name,phone:r.phone,email:r.email,address:r.address,zipCode:r.zipCode});else if(t==="branding"){const a={};r.logoBase64&&(a.logo=r.logoBase64),r.bgBase64&&(a.backgroundImage=r.bgBase64),r.themeColor&&(a.themeColor=r.themeColor),r.primaryColor&&(a.primaryColor=r.primaryColor),Object.keys(a).length>0&&await $o(w.establishmentId,a)}else if(t==="time_config"){const a=parseInt(r.slotInterval);await $o(w.establishmentId,{slotInterval:a})}else if(t==="first_service"){const a=await mu({establishmentId:w.establishmentId,name:r.name,price:parseFloat(r.price),duration:parseInt(r.duration),active:!0});a&&qo.push(a)}else if(t==="first_prof"){const a=await du({establishmentId:w.establishmentId,name:r.name,specialty:r.role,active:!0,commissionRate:0});if(r.serviceId&&a&&a.id)try{vc?await vc(a.id,[r.serviceId]):Oo&&await Oo(a.id,{services:[r.serviceId]})}catch(l){console.warn("Não foi possível vincular o serviço automaticamente.",l)}}else t==="first_product"&&await pu({establishmentId:w.establishmentId,name:r.name,price:parseFloat(r.salePrice),stock:parseInt(r.stock),active:!0});k("Sucesso","Passo concluído!","success"),We++,pi(),hi(We)}catch(a){k("Erro","Erro ao salvar: "+a.message,"error"),s.disabled=!1,s.innerHTML=n}}var Rs;(function(t){t.Unimplemented="UNIMPLEMENTED",t.Unavailable="UNAVAILABLE"})(Rs||(Rs={}));class ia extends Error{constructor(e,s,n){super(e),this.message=e,this.code=s,this.data=n}}const eg=t=>{var e,s;return t?.androidBridge?"android":!((s=(e=t?.webkit)===null||e===void 0?void 0:e.messageHandlers)===null||s===void 0)&&s.bridge?"ios":"web"},tg=t=>{const e=t.CapacitorCustomPlatform||null,s=t.Capacitor||{},n=s.Plugins=s.Plugins||{},o=()=>e!==null?e.name:eg(t),r=()=>o()!=="web",a=h=>{const f=d.get(h);return!!(f?.platforms.has(o())||l(h))},l=h=>{var f;return(f=s.PluginHeaders)===null||f===void 0?void 0:f.find(x=>x.name===h)},c=h=>t.console.error(h),d=new Map,p=(h,f={})=>{const x=d.get(h);if(x)return console.warn(`Capacitor plugin "${h}" already registered. Cannot register plugins twice.`),x.proxy;const S=o(),_=l(h);let D;const R=async()=>(!D&&S in f?D=typeof f[S]=="function"?D=await f[S]():D=f[S]:e!==null&&!D&&"web"in f&&(D=typeof f.web=="function"?D=await f.web():D=f.web),D),O=(b,v)=>{var I,E;if(_){const C=_?.methods.find(y=>v===y.name);if(C)return C.rtype==="promise"?y=>s.nativePromise(h,v.toString(),y):(y,ne)=>s.nativeCallback(h,v.toString(),y,ne);if(b)return(I=b[v])===null||I===void 0?void 0:I.bind(b)}else{if(b)return(E=b[v])===null||E===void 0?void 0:E.bind(b);throw new ia(`"${h}" plugin is not implemented on ${S}`,Rs.Unimplemented)}},N=b=>{let v;const I=(...E)=>{const C=R().then(y=>{const ne=O(y,b);if(ne){const Me=ne(...E);return v=Me?.remove,Me}else throw new ia(`"${h}.${b}()" is not implemented on ${S}`,Rs.Unimplemented)});return b==="addListener"&&(C.remove=async()=>v()),C};return I.toString=()=>`${b.toString()}() { [capacitor code] }`,Object.defineProperty(I,"name",{value:b,writable:!1,configurable:!1}),I},B=N("addListener"),H=N("removeListener"),G=(b,v)=>{const I=B({eventName:b},v),E=async()=>{const y=await I;H({eventName:b,callbackId:y},v)},C=new Promise(y=>I.then(()=>y({remove:E})));return C.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await E()},C},T=new Proxy({},{get(b,v){switch(v){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return _?G:B;case"removeListener":return H;default:return N(v)}}});return n[h]=T,d.set(h,{name:h,proxy:T,platforms:new Set([...Object.keys(f),..._?[S]:[]])}),T};return s.convertFileSrc||(s.convertFileSrc=h=>h),s.getPlatform=o,s.handleError=c,s.isNativePlatform=r,s.isPluginAvailable=a,s.registerPlugin=p,s.Exception=ia,s.DEBUG=!!s.DEBUG,s.isLoggingEnabled=!!s.isLoggingEnabled,s},sg=t=>t.Capacitor=tg(t),Yt=sg(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),gi=Yt.registerPlugin;class hu{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(e,s){let n=!1;this.listeners[e]||(this.listeners[e]=[],n=!0),this.listeners[e].push(s);const r=this.windowListeners[e];r&&!r.registered&&this.addWindowListener(r),n&&this.sendRetainedArgumentsForEvent(e);const a=async()=>this.removeListener(e,s);return Promise.resolve({remove:a})}async removeAllListeners(){this.listeners={};for(const e in this.windowListeners)this.removeWindowListener(this.windowListeners[e]);this.windowListeners={}}notifyListeners(e,s,n){const o=this.listeners[e];if(!o){if(n){let r=this.retainedEventArguments[e];r||(r=[]),r.push(s),this.retainedEventArguments[e]=r}return}o.forEach(r=>r(s))}hasListeners(e){var s;return!!(!((s=this.listeners[e])===null||s===void 0)&&s.length)}registerWindowListener(e,s){this.windowListeners[s]={registered:!1,windowEventName:e,pluginEventName:s,handler:n=>{this.notifyListeners(s,n)}}}unimplemented(e="not implemented"){return new Yt.Exception(e,Rs.Unimplemented)}unavailable(e="not available"){return new Yt.Exception(e,Rs.Unavailable)}async removeListener(e,s){const n=this.listeners[e];if(!n)return;const o=n.indexOf(s);this.listeners[e].splice(o,1),this.listeners[e].length||this.removeWindowListener(this.windowListeners[e])}addWindowListener(e){window.addEventListener(e.windowEventName,e.handler),e.registered=!0}removeWindowListener(e){e&&(window.removeEventListener(e.windowEventName,e.handler),e.registered=!1)}sendRetainedArgumentsForEvent(e){const s=this.retainedEventArguments[e];s&&(delete this.retainedEventArguments[e],s.forEach(n=>{this.notifyListeners(e,n)}))}}const wc=t=>encodeURIComponent(t).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),Ec=t=>t.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent);class ng extends hu{async getCookies(){const e=document.cookie,s={};return e.split(";").forEach(n=>{if(n.length<=0)return;let[o,r]=n.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");o=Ec(o).trim(),r=Ec(r).trim(),s[o]=r}),s}async setCookie(e){try{const s=wc(e.key),n=wc(e.value),o=`; expires=${(e.expires||"").replace("expires=","")}`,r=(e.path||"/").replace("path=",""),a=e.url!=null&&e.url.length>0?`domain=${e.url}`:"";document.cookie=`${s}=${n||""}${o}; path=${r}; ${a};`}catch(s){return Promise.reject(s)}}async deleteCookie(e){try{document.cookie=`${e.key}=; Max-Age=0`}catch(s){return Promise.reject(s)}}async clearCookies(){try{const e=document.cookie.split(";")||[];for(const s of e)document.cookie=s.replace(/^ +/,"").replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(e){return Promise.reject(e)}}async clearAllCookies(){try{await this.clearCookies()}catch(e){return Promise.reject(e)}}}gi("CapacitorCookies",{web:()=>new ng});const og=async t=>new Promise((e,s)=>{const n=new FileReader;n.onload=()=>{const o=n.result;e(o.indexOf(",")>=0?o.split(",")[1]:o)},n.onerror=o=>s(o),n.readAsDataURL(t)}),rg=(t={})=>{const e=Object.keys(t);return Object.keys(t).map(o=>o.toLocaleLowerCase()).reduce((o,r,a)=>(o[r]=t[e[a]],o),{})},ag=(t,e=!0)=>t?Object.entries(t).reduce((n,o)=>{const[r,a]=o;let l,c;return Array.isArray(a)?(c="",a.forEach(d=>{l=e?encodeURIComponent(d):d,c+=`${r}=${l}&`}),c.slice(0,-1)):(l=e?encodeURIComponent(a):a,c=`${r}=${l}`),`${n}&${c}`},"").substr(1):null,ig=(t,e={})=>{const s=Object.assign({method:t.method||"GET",headers:t.headers},e),o=rg(t.headers)["content-type"]||"";if(typeof t.data=="string")s.body=t.data;else if(o.includes("application/x-www-form-urlencoded")){const r=new URLSearchParams;for(const[a,l]of Object.entries(t.data||{}))r.set(a,l);s.body=r.toString()}else if(o.includes("multipart/form-data")||t.data instanceof FormData){const r=new FormData;if(t.data instanceof FormData)t.data.forEach((l,c)=>{r.append(c,l)});else for(const l of Object.keys(t.data))r.append(l,t.data[l]);s.body=r;const a=new Headers(s.headers);a.delete("content-type"),s.headers=a}else(o.includes("application/json")||typeof t.data=="object")&&(s.body=JSON.stringify(t.data));return s};class lg extends hu{async request(e){const s=ig(e,e.webFetchExtra),n=ag(e.params,e.shouldEncodeUrlParams),o=n?`${e.url}?${n}`:e.url,r=await fetch(o,s),a=r.headers.get("content-type")||"";let{responseType:l="text"}=r.ok?e:{};a.includes("application/json")&&(l="json");let c,d;switch(l){case"arraybuffer":case"blob":d=await r.blob(),c=await og(d);break;case"json":c=await r.json();break;case"document":case"text":default:c=await r.text()}const p={};return r.headers.forEach((h,f)=>{p[f]=h}),{data:c,headers:p,status:r.status,url:r.url}}async get(e){return this.request(Object.assign(Object.assign({},e),{method:"GET"}))}async post(e){return this.request(Object.assign(Object.assign({},e),{method:"POST"}))}async put(e){return this.request(Object.assign(Object.assign({},e),{method:"PUT"}))}async patch(e){return this.request(Object.assign(Object.assign({},e),{method:"PATCH"}))}async delete(e){return this.request(Object.assign(Object.assign({},e),{method:"DELETE"}))}}gi("CapacitorHttp",{web:()=>new lg});const Ne=gi("PushNotifications",{}),cg=()=>{};var Ic={};const gu=function(t){const e=[];let s=0;for(let n=0;n<t.length;n++){let o=t.charCodeAt(n);o<128?e[s++]=o:o<2048?(e[s++]=o>>6|192,e[s++]=o&63|128):(o&64512)===55296&&n+1<t.length&&(t.charCodeAt(n+1)&64512)===56320?(o=65536+((o&1023)<<10)+(t.charCodeAt(++n)&1023),e[s++]=o>>18|240,e[s++]=o>>12&63|128,e[s++]=o>>6&63|128,e[s++]=o&63|128):(e[s++]=o>>12|224,e[s++]=o>>6&63|128,e[s++]=o&63|128)}return e},dg=function(t){const e=[];let s=0,n=0;for(;s<t.length;){const o=t[s++];if(o<128)e[n++]=String.fromCharCode(o);else if(o>191&&o<224){const r=t[s++];e[n++]=String.fromCharCode((o&31)<<6|r&63)}else if(o>239&&o<365){const r=t[s++],a=t[s++],l=t[s++],c=((o&7)<<18|(r&63)<<12|(a&63)<<6|l&63)-65536;e[n++]=String.fromCharCode(55296+(c>>10)),e[n++]=String.fromCharCode(56320+(c&1023))}else{const r=t[s++],a=t[s++];e[n++]=String.fromCharCode((o&15)<<12|(r&63)<<6|a&63)}}return e.join("")},fu={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const s=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,n=[];for(let o=0;o<t.length;o+=3){const r=t[o],a=o+1<t.length,l=a?t[o+1]:0,c=o+2<t.length,d=c?t[o+2]:0,p=r>>2,h=(r&3)<<4|l>>4;let f=(l&15)<<2|d>>6,x=d&63;c||(x=64,a||(f=64)),n.push(s[p],s[h],s[f],s[x])}return n.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(gu(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):dg(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const s=e?this.charToByteMapWebSafe_:this.charToByteMap_,n=[];for(let o=0;o<t.length;){const r=s[t.charAt(o++)],l=o<t.length?s[t.charAt(o)]:0;++o;const d=o<t.length?s[t.charAt(o)]:64;++o;const h=o<t.length?s[t.charAt(o)]:64;if(++o,r==null||l==null||d==null||h==null)throw new ug;const f=r<<2|l>>4;if(n.push(f),d!==64){const x=l<<4&240|d>>2;if(n.push(x),h!==64){const S=d<<6&192|h;n.push(S)}}}return n},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class ug extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const mg=function(t){const e=gu(t);return fu.encodeByteArray(e,!0)},bu=function(t){return mg(t).replace(/\./g,"")},pg=function(t){try{return fu.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};function hg(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}const gg=()=>hg().__FIREBASE_DEFAULTS__,fg=()=>{if(typeof process>"u"||typeof Ic>"u")return;const t=Ic.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},bg=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&pg(t[1]);return e&&JSON.parse(e)},vg=()=>{try{return cg()||gg()||fg()||bg()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}};function yg(t){try{return(t.startsWith("http://")||t.startsWith("https://")?new URL(t).hostname:t).endsWith(".cloudworkstations.dev")}catch{return!1}}function xg(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function wg(){const t=vg()?.forceEnvironment;if(t==="node")return!0;if(t==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Eg(){return!wg()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Ig(){try{return typeof indexedDB=="object"}catch{return!1}}function Sg(){return new Promise((t,e)=>{try{let s=!0;const n="validate-browser-context-for-indexeddb-analytics-module",o=self.indexedDB.open(n);o.onsuccess=()=>{o.result.close(),s||self.indexedDB.deleteDatabase(n),t(!0)},o.onupgradeneeded=()=>{s=!1},o.onerror=()=>{e(o.error?.message||"")}}catch(s){e(s)}})}const Tg="FirebaseError";class hs extends Error{constructor(e,s,n){super(s),this.code=e,this.customData=n,this.name=Tg,Object.setPrototypeOf(this,hs.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,mr.prototype.create)}}class mr{constructor(e,s,n){this.service=e,this.serviceName=s,this.errors=n}create(e,...s){const n=s[0]||{},o=`${this.service}/${e}`,r=this.errors[e],a=r?kg(r,n):"Error",l=`${this.serviceName}: ${a} (${o}).`;return new hs(o,l,n)}}function kg(t,e){return t.replace(Cg,(s,n)=>{const o=e[n];return o!=null?String(o):`<${n}?>`})}const Cg=/\{\$([^}]+)}/g;function vu(t,e){if(t===e)return!0;const s=Object.keys(t),n=Object.keys(e);for(const o of s){if(!n.includes(o))return!1;const r=t[o],a=e[o];if(Sc(r)&&Sc(a)){if(!vu(r,a))return!1}else if(r!==a)return!1}for(const o of n)if(!s.includes(o))return!1;return!0}function Sc(t){return t!==null&&typeof t=="object"}function gt(t){return t&&t._delegate?t._delegate:t}class Pt{constructor(e,s,n){this.name=e,this.instanceFactory=s,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}var ee;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(ee||(ee={}));const _g={debug:ee.DEBUG,verbose:ee.VERBOSE,info:ee.INFO,warn:ee.WARN,error:ee.ERROR,silent:ee.SILENT},Ag=ee.INFO,Pg={[ee.DEBUG]:"log",[ee.VERBOSE]:"log",[ee.INFO]:"info",[ee.WARN]:"warn",[ee.ERROR]:"error"},$g=(t,e,...s)=>{if(e<t.logLevel)return;const n=new Date().toISOString(),o=Pg[e];if(o)console[o](`[${n}]  ${t.name}:`,...s);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class yu{constructor(e){this.name=e,this._logLevel=Ag,this._logHandler=$g,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in ee))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?_g[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,ee.DEBUG,...e),this._logHandler(this,ee.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,ee.VERBOSE,...e),this._logHandler(this,ee.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,ee.INFO,...e),this._logHandler(this,ee.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,ee.WARN,...e),this._logHandler(this,ee.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,ee.ERROR,...e),this._logHandler(this,ee.ERROR,...e)}}const Dg=(t,e)=>e.some(s=>t instanceof s);let Tc,kc;function Lg(){return Tc||(Tc=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Rg(){return kc||(kc=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const xu=new WeakMap,Ma=new WeakMap,wu=new WeakMap,la=new WeakMap,fi=new WeakMap;function Mg(t){const e=new Promise((s,n)=>{const o=()=>{t.removeEventListener("success",r),t.removeEventListener("error",a)},r=()=>{s(ut(t.result)),o()},a=()=>{n(t.error),o()};t.addEventListener("success",r),t.addEventListener("error",a)});return e.then(s=>{s instanceof IDBCursor&&xu.set(s,t)}).catch(()=>{}),fi.set(e,t),e}function Ng(t){if(Ma.has(t))return;const e=new Promise((s,n)=>{const o=()=>{t.removeEventListener("complete",r),t.removeEventListener("error",a),t.removeEventListener("abort",a)},r=()=>{s(),o()},a=()=>{n(t.error||new DOMException("AbortError","AbortError")),o()};t.addEventListener("complete",r),t.addEventListener("error",a),t.addEventListener("abort",a)});Ma.set(t,e)}let Na={get(t,e,s){if(t instanceof IDBTransaction){if(e==="done")return Ma.get(t);if(e==="objectStoreNames")return t.objectStoreNames||wu.get(t);if(e==="store")return s.objectStoreNames[1]?void 0:s.objectStore(s.objectStoreNames[0])}return ut(t[e])},set(t,e,s){return t[e]=s,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function Bg(t){Na=t(Na)}function Vg(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...s){const n=t.call(ca(this),e,...s);return wu.set(n,e.sort?e.sort():[e]),ut(n)}:Rg().includes(t)?function(...e){return t.apply(ca(this),e),ut(xu.get(this))}:function(...e){return ut(t.apply(ca(this),e))}}function Fg(t){return typeof t=="function"?Vg(t):(t instanceof IDBTransaction&&Ng(t),Dg(t,Lg())?new Proxy(t,Na):t)}function ut(t){if(t instanceof IDBRequest)return Mg(t);if(la.has(t))return la.get(t);const e=Fg(t);return e!==t&&(la.set(t,e),fi.set(e,t)),e}const ca=t=>fi.get(t);function pr(t,e,{blocked:s,upgrade:n,blocking:o,terminated:r}={}){const a=indexedDB.open(t,e),l=ut(a);return n&&a.addEventListener("upgradeneeded",c=>{n(ut(a.result),c.oldVersion,c.newVersion,ut(a.transaction),c)}),s&&a.addEventListener("blocked",c=>s(c.oldVersion,c.newVersion,c)),l.then(c=>{r&&c.addEventListener("close",()=>r()),o&&c.addEventListener("versionchange",d=>o(d.oldVersion,d.newVersion,d))}).catch(()=>{}),l}function da(t,{blocked:e}={}){const s=indexedDB.deleteDatabase(t);return e&&s.addEventListener("blocked",n=>e(n.oldVersion,n)),ut(s).then(()=>{})}const Og=["get","getKey","getAll","getAllKeys","count"],qg=["put","add","delete","clear"],ua=new Map;function Cc(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(ua.get(e))return ua.get(e);const s=e.replace(/FromIndex$/,""),n=e!==s,o=qg.includes(s);if(!(s in(n?IDBIndex:IDBObjectStore).prototype)||!(o||Og.includes(s)))return;const r=async function(a,...l){const c=this.transaction(a,o?"readwrite":"readonly");let d=c.store;return n&&(d=d.index(l.shift())),(await Promise.all([d[s](...l),o&&c.done]))[0]};return ua.set(e,r),r}Bg(t=>({...t,get:(e,s,n)=>Cc(e,s)||t.get(e,s,n),has:(e,s)=>!!Cc(e,s)||t.has(e,s)}));class jg{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(s=>{if(Hg(s)){const n=s.getImmediate();return`${n.library}/${n.version}`}else return null}).filter(s=>s).join(" ")}}function Hg(t){return t.getComponent()?.type==="VERSION"}const Ba="@firebase/app",_c="0.14.5";const ft=new yu("@firebase/app"),Ug="@firebase/app-compat",zg="@firebase/analytics-compat",Wg="@firebase/analytics",Gg="@firebase/app-check-compat",Kg="@firebase/app-check",Jg="@firebase/auth",Qg="@firebase/auth-compat",Xg="@firebase/database",Yg="@firebase/data-connect",Zg="@firebase/database-compat",ef="@firebase/functions",tf="@firebase/functions-compat",sf="@firebase/installations",nf="@firebase/installations-compat",of="@firebase/messaging",rf="@firebase/messaging-compat",af="@firebase/performance",lf="@firebase/performance-compat",cf="@firebase/remote-config",df="@firebase/remote-config-compat",uf="@firebase/storage",mf="@firebase/storage-compat",pf="@firebase/firestore",hf="@firebase/ai",gf="@firebase/firestore-compat",ff="firebase",bf="12.5.0",vf={[Ba]:"fire-core",[Ug]:"fire-core-compat",[Wg]:"fire-analytics",[zg]:"fire-analytics-compat",[Kg]:"fire-app-check",[Gg]:"fire-app-check-compat",[Jg]:"fire-auth",[Qg]:"fire-auth-compat",[Xg]:"fire-rtdb",[Yg]:"fire-data-connect",[Zg]:"fire-rtdb-compat",[ef]:"fire-fn",[tf]:"fire-fn-compat",[sf]:"fire-iid",[nf]:"fire-iid-compat",[of]:"fire-fcm",[rf]:"fire-fcm-compat",[af]:"fire-perf",[lf]:"fire-perf-compat",[cf]:"fire-rc",[df]:"fire-rc-compat",[uf]:"fire-gcs",[mf]:"fire-gcs-compat",[pf]:"fire-fst",[gf]:"fire-fst-compat",[hf]:"fire-vertex","fire-js":"fire-js",[ff]:"fire-js-all"};const yf=new Map,xf=new Map,Ac=new Map;function Pc(t,e){try{t.container.addComponent(e)}catch(s){ft.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,s)}}function $t(t){const e=t.name;if(Ac.has(e))return ft.debug(`There were multiple attempts to register component ${e}.`),!1;Ac.set(e,t);for(const s of yf.values())Pc(s,t);for(const s of xf.values())Pc(s,t);return!0}function Eu(t,e){const s=t.container.getProvider("heartbeat").getImmediate({optional:!0});return s&&s.triggerHeartbeat(),t.container.getProvider(e)}function wf(t){return t==null?!1:t.settings!==void 0}const Ef={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},bi=new mr("app","Firebase",Ef);const If=bf;function mt(t,e,s){let n=vf[t]??t;s&&(n+=`-${s}`);const o=n.match(/\s|\//),r=e.match(/\s|\//);if(o||r){const a=[`Unable to register library "${n}" with version "${e}":`];o&&a.push(`library name "${n}" contains illegal characters (whitespace or "/")`),o&&r&&a.push("and"),r&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),ft.warn(a.join(" "));return}$t(new Pt(`${n}-version`,()=>({library:n,version:e}),"VERSION"))}const Sf="firebase-heartbeat-database",Tf=1,Ln="firebase-heartbeat-store";let ma=null;function Iu(){return ma||(ma=pr(Sf,Tf,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(Ln)}catch(s){console.warn(s)}}}}).catch(t=>{throw bi.create("idb-open",{originalErrorMessage:t.message})})),ma}async function kf(t){try{const s=(await Iu()).transaction(Ln),n=await s.objectStore(Ln).get(Su(t));return await s.done,n}catch(e){if(e instanceof hs)ft.warn(e.message);else{const s=bi.create("idb-get",{originalErrorMessage:e?.message});ft.warn(s.message)}}}async function $c(t,e){try{const n=(await Iu()).transaction(Ln,"readwrite");await n.objectStore(Ln).put(e,Su(t)),await n.done}catch(s){if(s instanceof hs)ft.warn(s.message);else{const n=bi.create("idb-set",{originalErrorMessage:s?.message});ft.warn(n.message)}}}function Su(t){return`${t.name}!${t.options.appId}`}const Cf=1024,_f=30;class Af{constructor(e){this.container=e,this._heartbeatsCache=null;const s=this.container.getProvider("app").getImmediate();this._storage=new $f(s),this._heartbeatsCachePromise=this._storage.read().then(n=>(this._heartbeatsCache=n,n))}async triggerHeartbeat(){try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),n=Dc();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===n||this._heartbeatsCache.heartbeats.some(o=>o.date===n))return;if(this._heartbeatsCache.heartbeats.push({date:n,agent:s}),this._heartbeatsCache.heartbeats.length>_f){const o=Df(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){ft.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=Dc(),{heartbeatsToSend:s,unsentEntries:n}=Pf(this._heartbeatsCache.heartbeats),o=bu(JSON.stringify({version:2,heartbeats:s}));return this._heartbeatsCache.lastSentHeartbeatDate=e,n.length>0?(this._heartbeatsCache.heartbeats=n,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),o}catch(e){return ft.warn(e),""}}}function Dc(){return new Date().toISOString().substring(0,10)}function Pf(t,e=Cf){const s=[];let n=t.slice();for(const o of t){const r=s.find(a=>a.agent===o.agent);if(r){if(r.dates.push(o.date),Lc(s)>e){r.dates.pop();break}}else if(s.push({agent:o.agent,dates:[o.date]}),Lc(s)>e){s.pop();break}n=n.slice(1)}return{heartbeatsToSend:s,unsentEntries:n}}class $f{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Ig()?Sg().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const s=await kf(this.app);return s?.heartbeats?s:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const n=await this.read();return $c(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??n.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const n=await this.read();return $c(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??n.lastSentHeartbeatDate,heartbeats:[...n.heartbeats,...e.heartbeats]})}else return}}function Lc(t){return bu(JSON.stringify({version:2,heartbeats:t})).length}function Df(t){if(t.length===0)return-1;let e=0,s=t[0].date;for(let n=1;n<t.length;n++)t[n].date<s&&(s=t[n].date,e=n);return e}function Lf(t){$t(new Pt("platform-logger",e=>new jg(e),"PRIVATE")),$t(new Pt("heartbeat",e=>new Af(e),"PRIVATE")),mt(Ba,_c,t),mt(Ba,_c,"esm2020"),mt("fire-js","")}Lf("");var Rc=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};var vi;(function(){var t;function e(T,b){function v(){}v.prototype=b.prototype,T.F=b.prototype,T.prototype=new v,T.prototype.constructor=T,T.D=function(I,E,C){for(var y=Array(arguments.length-2),ne=2;ne<arguments.length;ne++)y[ne-2]=arguments[ne];return b.prototype[E].apply(I,y)}}function s(){this.blockSize=-1}function n(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(n,s),n.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function o(T,b,v){v||(v=0);const I=Array(16);if(typeof b=="string")for(var E=0;E<16;++E)I[E]=b.charCodeAt(v++)|b.charCodeAt(v++)<<8|b.charCodeAt(v++)<<16|b.charCodeAt(v++)<<24;else for(E=0;E<16;++E)I[E]=b[v++]|b[v++]<<8|b[v++]<<16|b[v++]<<24;b=T.g[0],v=T.g[1],E=T.g[2];let C=T.g[3],y;y=b+(C^v&(E^C))+I[0]+3614090360&4294967295,b=v+(y<<7&4294967295|y>>>25),y=C+(E^b&(v^E))+I[1]+3905402710&4294967295,C=b+(y<<12&4294967295|y>>>20),y=E+(v^C&(b^v))+I[2]+606105819&4294967295,E=C+(y<<17&4294967295|y>>>15),y=v+(b^E&(C^b))+I[3]+3250441966&4294967295,v=E+(y<<22&4294967295|y>>>10),y=b+(C^v&(E^C))+I[4]+4118548399&4294967295,b=v+(y<<7&4294967295|y>>>25),y=C+(E^b&(v^E))+I[5]+1200080426&4294967295,C=b+(y<<12&4294967295|y>>>20),y=E+(v^C&(b^v))+I[6]+2821735955&4294967295,E=C+(y<<17&4294967295|y>>>15),y=v+(b^E&(C^b))+I[7]+4249261313&4294967295,v=E+(y<<22&4294967295|y>>>10),y=b+(C^v&(E^C))+I[8]+1770035416&4294967295,b=v+(y<<7&4294967295|y>>>25),y=C+(E^b&(v^E))+I[9]+2336552879&4294967295,C=b+(y<<12&4294967295|y>>>20),y=E+(v^C&(b^v))+I[10]+4294925233&4294967295,E=C+(y<<17&4294967295|y>>>15),y=v+(b^E&(C^b))+I[11]+2304563134&4294967295,v=E+(y<<22&4294967295|y>>>10),y=b+(C^v&(E^C))+I[12]+1804603682&4294967295,b=v+(y<<7&4294967295|y>>>25),y=C+(E^b&(v^E))+I[13]+4254626195&4294967295,C=b+(y<<12&4294967295|y>>>20),y=E+(v^C&(b^v))+I[14]+2792965006&4294967295,E=C+(y<<17&4294967295|y>>>15),y=v+(b^E&(C^b))+I[15]+1236535329&4294967295,v=E+(y<<22&4294967295|y>>>10),y=b+(E^C&(v^E))+I[1]+4129170786&4294967295,b=v+(y<<5&4294967295|y>>>27),y=C+(v^E&(b^v))+I[6]+3225465664&4294967295,C=b+(y<<9&4294967295|y>>>23),y=E+(b^v&(C^b))+I[11]+643717713&4294967295,E=C+(y<<14&4294967295|y>>>18),y=v+(C^b&(E^C))+I[0]+3921069994&4294967295,v=E+(y<<20&4294967295|y>>>12),y=b+(E^C&(v^E))+I[5]+3593408605&4294967295,b=v+(y<<5&4294967295|y>>>27),y=C+(v^E&(b^v))+I[10]+38016083&4294967295,C=b+(y<<9&4294967295|y>>>23),y=E+(b^v&(C^b))+I[15]+3634488961&4294967295,E=C+(y<<14&4294967295|y>>>18),y=v+(C^b&(E^C))+I[4]+3889429448&4294967295,v=E+(y<<20&4294967295|y>>>12),y=b+(E^C&(v^E))+I[9]+568446438&4294967295,b=v+(y<<5&4294967295|y>>>27),y=C+(v^E&(b^v))+I[14]+3275163606&4294967295,C=b+(y<<9&4294967295|y>>>23),y=E+(b^v&(C^b))+I[3]+4107603335&4294967295,E=C+(y<<14&4294967295|y>>>18),y=v+(C^b&(E^C))+I[8]+1163531501&4294967295,v=E+(y<<20&4294967295|y>>>12),y=b+(E^C&(v^E))+I[13]+2850285829&4294967295,b=v+(y<<5&4294967295|y>>>27),y=C+(v^E&(b^v))+I[2]+4243563512&4294967295,C=b+(y<<9&4294967295|y>>>23),y=E+(b^v&(C^b))+I[7]+1735328473&4294967295,E=C+(y<<14&4294967295|y>>>18),y=v+(C^b&(E^C))+I[12]+2368359562&4294967295,v=E+(y<<20&4294967295|y>>>12),y=b+(v^E^C)+I[5]+4294588738&4294967295,b=v+(y<<4&4294967295|y>>>28),y=C+(b^v^E)+I[8]+2272392833&4294967295,C=b+(y<<11&4294967295|y>>>21),y=E+(C^b^v)+I[11]+1839030562&4294967295,E=C+(y<<16&4294967295|y>>>16),y=v+(E^C^b)+I[14]+4259657740&4294967295,v=E+(y<<23&4294967295|y>>>9),y=b+(v^E^C)+I[1]+2763975236&4294967295,b=v+(y<<4&4294967295|y>>>28),y=C+(b^v^E)+I[4]+1272893353&4294967295,C=b+(y<<11&4294967295|y>>>21),y=E+(C^b^v)+I[7]+4139469664&4294967295,E=C+(y<<16&4294967295|y>>>16),y=v+(E^C^b)+I[10]+3200236656&4294967295,v=E+(y<<23&4294967295|y>>>9),y=b+(v^E^C)+I[13]+681279174&4294967295,b=v+(y<<4&4294967295|y>>>28),y=C+(b^v^E)+I[0]+3936430074&4294967295,C=b+(y<<11&4294967295|y>>>21),y=E+(C^b^v)+I[3]+3572445317&4294967295,E=C+(y<<16&4294967295|y>>>16),y=v+(E^C^b)+I[6]+76029189&4294967295,v=E+(y<<23&4294967295|y>>>9),y=b+(v^E^C)+I[9]+3654602809&4294967295,b=v+(y<<4&4294967295|y>>>28),y=C+(b^v^E)+I[12]+3873151461&4294967295,C=b+(y<<11&4294967295|y>>>21),y=E+(C^b^v)+I[15]+530742520&4294967295,E=C+(y<<16&4294967295|y>>>16),y=v+(E^C^b)+I[2]+3299628645&4294967295,v=E+(y<<23&4294967295|y>>>9),y=b+(E^(v|~C))+I[0]+4096336452&4294967295,b=v+(y<<6&4294967295|y>>>26),y=C+(v^(b|~E))+I[7]+1126891415&4294967295,C=b+(y<<10&4294967295|y>>>22),y=E+(b^(C|~v))+I[14]+2878612391&4294967295,E=C+(y<<15&4294967295|y>>>17),y=v+(C^(E|~b))+I[5]+4237533241&4294967295,v=E+(y<<21&4294967295|y>>>11),y=b+(E^(v|~C))+I[12]+1700485571&4294967295,b=v+(y<<6&4294967295|y>>>26),y=C+(v^(b|~E))+I[3]+2399980690&4294967295,C=b+(y<<10&4294967295|y>>>22),y=E+(b^(C|~v))+I[10]+4293915773&4294967295,E=C+(y<<15&4294967295|y>>>17),y=v+(C^(E|~b))+I[1]+2240044497&4294967295,v=E+(y<<21&4294967295|y>>>11),y=b+(E^(v|~C))+I[8]+1873313359&4294967295,b=v+(y<<6&4294967295|y>>>26),y=C+(v^(b|~E))+I[15]+4264355552&4294967295,C=b+(y<<10&4294967295|y>>>22),y=E+(b^(C|~v))+I[6]+2734768916&4294967295,E=C+(y<<15&4294967295|y>>>17),y=v+(C^(E|~b))+I[13]+1309151649&4294967295,v=E+(y<<21&4294967295|y>>>11),y=b+(E^(v|~C))+I[4]+4149444226&4294967295,b=v+(y<<6&4294967295|y>>>26),y=C+(v^(b|~E))+I[11]+3174756917&4294967295,C=b+(y<<10&4294967295|y>>>22),y=E+(b^(C|~v))+I[2]+718787259&4294967295,E=C+(y<<15&4294967295|y>>>17),y=v+(C^(E|~b))+I[9]+3951481745&4294967295,T.g[0]=T.g[0]+b&4294967295,T.g[1]=T.g[1]+(E+(y<<21&4294967295|y>>>11))&4294967295,T.g[2]=T.g[2]+E&4294967295,T.g[3]=T.g[3]+C&4294967295}n.prototype.v=function(T,b){b===void 0&&(b=T.length);const v=b-this.blockSize,I=this.C;let E=this.h,C=0;for(;C<b;){if(E==0)for(;C<=v;)o(this,T,C),C+=this.blockSize;if(typeof T=="string"){for(;C<b;)if(I[E++]=T.charCodeAt(C++),E==this.blockSize){o(this,I),E=0;break}}else for(;C<b;)if(I[E++]=T[C++],E==this.blockSize){o(this,I),E=0;break}}this.h=E,this.o+=b},n.prototype.A=function(){var T=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);T[0]=128;for(var b=1;b<T.length-8;++b)T[b]=0;b=this.o*8;for(var v=T.length-8;v<T.length;++v)T[v]=b&255,b/=256;for(this.v(T),T=Array(16),b=0,v=0;v<4;++v)for(let I=0;I<32;I+=8)T[b++]=this.g[v]>>>I&255;return T};function r(T,b){var v=l;return Object.prototype.hasOwnProperty.call(v,T)?v[T]:v[T]=b(T)}function a(T,b){this.h=b;const v=[];let I=!0;for(let E=T.length-1;E>=0;E--){const C=T[E]|0;I&&C==b||(v[E]=C,I=!1)}this.g=v}var l={};function c(T){return-128<=T&&T<128?r(T,function(b){return new a([b|0],b<0?-1:0)}):new a([T|0],T<0?-1:0)}function d(T){if(isNaN(T)||!isFinite(T))return h;if(T<0)return D(d(-T));const b=[];let v=1;for(let I=0;T>=v;I++)b[I]=T/v|0,v*=4294967296;return new a(b,0)}function p(T,b){if(T.length==0)throw Error("number format error: empty string");if(b=b||10,b<2||36<b)throw Error("radix out of range: "+b);if(T.charAt(0)=="-")return D(p(T.substring(1),b));if(T.indexOf("-")>=0)throw Error('number format error: interior "-" character');const v=d(Math.pow(b,8));let I=h;for(let C=0;C<T.length;C+=8){var E=Math.min(8,T.length-C);const y=parseInt(T.substring(C,C+E),b);E<8?(E=d(Math.pow(b,E)),I=I.j(E).add(d(y))):(I=I.j(v),I=I.add(d(y)))}return I}var h=c(0),f=c(1),x=c(16777216);t=a.prototype,t.m=function(){if(_(this))return-D(this).m();let T=0,b=1;for(let v=0;v<this.g.length;v++){const I=this.i(v);T+=(I>=0?I:4294967296+I)*b,b*=4294967296}return T},t.toString=function(T){if(T=T||10,T<2||36<T)throw Error("radix out of range: "+T);if(S(this))return"0";if(_(this))return"-"+D(this).toString(T);const b=d(Math.pow(T,6));var v=this;let I="";for(;;){const E=B(v,b).g;v=R(v,E.j(b));let C=((v.g.length>0?v.g[0]:v.h)>>>0).toString(T);if(v=E,S(v))return C+I;for(;C.length<6;)C="0"+C;I=C+I}},t.i=function(T){return T<0?0:T<this.g.length?this.g[T]:this.h};function S(T){if(T.h!=0)return!1;for(let b=0;b<T.g.length;b++)if(T.g[b]!=0)return!1;return!0}function _(T){return T.h==-1}t.l=function(T){return T=R(this,T),_(T)?-1:S(T)?0:1};function D(T){const b=T.g.length,v=[];for(let I=0;I<b;I++)v[I]=~T.g[I];return new a(v,~T.h).add(f)}t.abs=function(){return _(this)?D(this):this},t.add=function(T){const b=Math.max(this.g.length,T.g.length),v=[];let I=0;for(let E=0;E<=b;E++){let C=I+(this.i(E)&65535)+(T.i(E)&65535),y=(C>>>16)+(this.i(E)>>>16)+(T.i(E)>>>16);I=y>>>16,C&=65535,y&=65535,v[E]=y<<16|C}return new a(v,v[v.length-1]&-2147483648?-1:0)};function R(T,b){return T.add(D(b))}t.j=function(T){if(S(this)||S(T))return h;if(_(this))return _(T)?D(this).j(D(T)):D(D(this).j(T));if(_(T))return D(this.j(D(T)));if(this.l(x)<0&&T.l(x)<0)return d(this.m()*T.m());const b=this.g.length+T.g.length,v=[];for(var I=0;I<2*b;I++)v[I]=0;for(I=0;I<this.g.length;I++)for(let E=0;E<T.g.length;E++){const C=this.i(I)>>>16,y=this.i(I)&65535,ne=T.i(E)>>>16,Me=T.i(E)&65535;v[2*I+2*E]+=y*Me,O(v,2*I+2*E),v[2*I+2*E+1]+=C*Me,O(v,2*I+2*E+1),v[2*I+2*E+1]+=y*ne,O(v,2*I+2*E+1),v[2*I+2*E+2]+=C*ne,O(v,2*I+2*E+2)}for(T=0;T<b;T++)v[T]=v[2*T+1]<<16|v[2*T];for(T=b;T<2*b;T++)v[T]=0;return new a(v,0)};function O(T,b){for(;(T[b]&65535)!=T[b];)T[b+1]+=T[b]>>>16,T[b]&=65535,b++}function N(T,b){this.g=T,this.h=b}function B(T,b){if(S(b))throw Error("division by zero");if(S(T))return new N(h,h);if(_(T))return b=B(D(T),b),new N(D(b.g),D(b.h));if(_(b))return b=B(T,D(b)),new N(D(b.g),b.h);if(T.g.length>30){if(_(T)||_(b))throw Error("slowDivide_ only works with positive integers.");for(var v=f,I=b;I.l(T)<=0;)v=H(v),I=H(I);var E=G(v,1),C=G(I,1);for(I=G(I,2),v=G(v,2);!S(I);){var y=C.add(I);y.l(T)<=0&&(E=E.add(v),C=y),I=G(I,1),v=G(v,1)}return b=R(T,E.j(b)),new N(E,b)}for(E=h;T.l(b)>=0;){for(v=Math.max(1,Math.floor(T.m()/b.m())),I=Math.ceil(Math.log(v)/Math.LN2),I=I<=48?1:Math.pow(2,I-48),C=d(v),y=C.j(b);_(y)||y.l(T)>0;)v-=I,C=d(v),y=C.j(b);S(C)&&(C=f),E=E.add(C),T=R(T,y)}return new N(E,T)}t.B=function(T){return B(this,T).h},t.and=function(T){const b=Math.max(this.g.length,T.g.length),v=[];for(let I=0;I<b;I++)v[I]=this.i(I)&T.i(I);return new a(v,this.h&T.h)},t.or=function(T){const b=Math.max(this.g.length,T.g.length),v=[];for(let I=0;I<b;I++)v[I]=this.i(I)|T.i(I);return new a(v,this.h|T.h)},t.xor=function(T){const b=Math.max(this.g.length,T.g.length),v=[];for(let I=0;I<b;I++)v[I]=this.i(I)^T.i(I);return new a(v,this.h^T.h)};function H(T){const b=T.g.length+1,v=[];for(let I=0;I<b;I++)v[I]=T.i(I)<<1|T.i(I-1)>>>31;return new a(v,T.h)}function G(T,b){const v=b>>5;b%=32;const I=T.g.length-v,E=[];for(let C=0;C<I;C++)E[C]=b>0?T.i(C+v)>>>b|T.i(C+v+1)<<32-b:T.i(C+v);return new a(E,T.h)}n.prototype.digest=n.prototype.A,n.prototype.reset=n.prototype.u,n.prototype.update=n.prototype.v,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.B,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=d,a.fromString=p,vi=a}).apply(typeof Rc<"u"?Rc:typeof self<"u"?self:typeof window<"u"?window:{});var ho=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};var Tu,fn,ku,Lo,Va,Cu,_u,Au;(function(){var t,e=Object.defineProperty;function s(i){i=[typeof globalThis=="object"&&globalThis,i,typeof window=="object"&&window,typeof self=="object"&&self,typeof ho=="object"&&ho];for(var u=0;u<i.length;++u){var m=i[u];if(m&&m.Math==Math)return m}throw Error("Cannot find global object")}var n=s(this);function o(i,u){if(u)e:{var m=n;i=i.split(".");for(var g=0;g<i.length-1;g++){var A=i[g];if(!(A in m))break e;m=m[A]}i=i[i.length-1],g=m[i],u=u(g),u!=g&&u!=null&&e(m,i,{configurable:!0,writable:!0,value:u})}}o("Symbol.dispose",function(i){return i||Symbol("Symbol.dispose")}),o("Array.prototype.values",function(i){return i||function(){return this[Symbol.iterator]()}}),o("Object.entries",function(i){return i||function(u){var m=[],g;for(g in u)Object.prototype.hasOwnProperty.call(u,g)&&m.push([g,u[g]]);return m}});var r=r||{},a=this||self;function l(i){var u=typeof i;return u=="object"&&i!=null||u=="function"}function c(i,u,m){return i.call.apply(i.bind,arguments)}function d(i,u,m){return d=c,d.apply(null,arguments)}function p(i,u){var m=Array.prototype.slice.call(arguments,1);return function(){var g=m.slice();return g.push.apply(g,arguments),i.apply(this,g)}}function h(i,u){function m(){}m.prototype=u.prototype,i.Z=u.prototype,i.prototype=new m,i.prototype.constructor=i,i.Ob=function(g,A,$){for(var q=Array(arguments.length-2),Q=2;Q<arguments.length;Q++)q[Q-2]=arguments[Q];return u.prototype[A].apply(g,q)}}var f=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?i=>i&&AsyncContext.Snapshot.wrap(i):i=>i;function x(i){const u=i.length;if(u>0){const m=Array(u);for(let g=0;g<u;g++)m[g]=i[g];return m}return[]}function S(i,u){for(let g=1;g<arguments.length;g++){const A=arguments[g];var m=typeof A;if(m=m!="object"?m:A?Array.isArray(A)?"array":m:"null",m=="array"||m=="object"&&typeof A.length=="number"){m=i.length||0;const $=A.length||0;i.length=m+$;for(let q=0;q<$;q++)i[m+q]=A[q]}else i.push(A)}}class _{constructor(u,m){this.i=u,this.j=m,this.h=0,this.g=null}get(){let u;return this.h>0?(this.h--,u=this.g,this.g=u.next,u.next=null):u=this.i(),u}}function D(i){a.setTimeout(()=>{throw i},0)}function R(){var i=T;let u=null;return i.g&&(u=i.g,i.g=i.g.next,i.g||(i.h=null),u.next=null),u}class O{constructor(){this.h=this.g=null}add(u,m){const g=N.get();g.set(u,m),this.h?this.h.next=g:this.g=g,this.h=g}}var N=new _(()=>new B,i=>i.reset());class B{constructor(){this.next=this.g=this.h=null}set(u,m){this.h=u,this.g=m,this.next=null}reset(){this.next=this.g=this.h=null}}let H,G=!1,T=new O,b=()=>{const i=Promise.resolve(void 0);H=()=>{i.then(v)}};function v(){for(var i;i=R();){try{i.h.call(i.g)}catch(m){D(m)}var u=N;u.j(i),u.h<100&&(u.h++,i.next=u.g,u.g=i)}G=!1}function I(){this.u=this.u,this.C=this.C}I.prototype.u=!1,I.prototype.dispose=function(){this.u||(this.u=!0,this.N())},I.prototype[Symbol.dispose]=function(){this.dispose()},I.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function E(i,u){this.type=i,this.g=this.target=u,this.defaultPrevented=!1}E.prototype.h=function(){this.defaultPrevented=!0};var C=(function(){if(!a.addEventListener||!Object.defineProperty)return!1;var i=!1,u=Object.defineProperty({},"passive",{get:function(){i=!0}});try{const m=()=>{};a.addEventListener("test",m,u),a.removeEventListener("test",m,u)}catch{}return i})();function y(i){return/^[\s\xa0]*$/.test(i)}function ne(i,u){E.call(this,i?i.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,i&&this.init(i,u)}h(ne,E),ne.prototype.init=function(i,u){const m=this.type=i.type,g=i.changedTouches&&i.changedTouches.length?i.changedTouches[0]:null;this.target=i.target||i.srcElement,this.g=u,u=i.relatedTarget,u||(m=="mouseover"?u=i.fromElement:m=="mouseout"&&(u=i.toElement)),this.relatedTarget=u,g?(this.clientX=g.clientX!==void 0?g.clientX:g.pageX,this.clientY=g.clientY!==void 0?g.clientY:g.pageY,this.screenX=g.screenX||0,this.screenY=g.screenY||0):(this.clientX=i.clientX!==void 0?i.clientX:i.pageX,this.clientY=i.clientY!==void 0?i.clientY:i.pageY,this.screenX=i.screenX||0,this.screenY=i.screenY||0),this.button=i.button,this.key=i.key||"",this.ctrlKey=i.ctrlKey,this.altKey=i.altKey,this.shiftKey=i.shiftKey,this.metaKey=i.metaKey,this.pointerId=i.pointerId||0,this.pointerType=i.pointerType,this.state=i.state,this.i=i,i.defaultPrevented&&ne.Z.h.call(this)},ne.prototype.h=function(){ne.Z.h.call(this);const i=this.i;i.preventDefault?i.preventDefault():i.returnValue=!1};var Me="closure_listenable_"+(Math.random()*1e6|0),Ks=0;function Nr(i,u,m,g,A){this.listener=i,this.proxy=null,this.src=u,this.type=m,this.capture=!!g,this.ha=A,this.key=++Ks,this.da=this.fa=!1}function Xe(i){i.da=!0,i.listener=null,i.proxy=null,i.src=null,i.ha=null}function Ye(i,u,m){for(const g in i)u.call(m,i[g],g,i)}function Mp(i,u){for(const m in i)u.call(void 0,i[m],m,i)}function ul(i){const u={};for(const m in i)u[m]=i[m];return u}const ml="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function pl(i,u){let m,g;for(let A=1;A<arguments.length;A++){g=arguments[A];for(m in g)i[m]=g[m];for(let $=0;$<ml.length;$++)m=ml[$],Object.prototype.hasOwnProperty.call(g,m)&&(i[m]=g[m])}}function Zn(i){this.src=i,this.g={},this.h=0}Zn.prototype.add=function(i,u,m,g,A){const $=i.toString();i=this.g[$],i||(i=this.g[$]=[],this.h++);const q=Vr(i,u,g,A);return q>-1?(u=i[q],m||(u.fa=!1)):(u=new Nr(u,this.src,$,!!g,A),u.fa=m,i.push(u)),u};function Br(i,u){const m=u.type;if(m in i.g){var g=i.g[m],A=Array.prototype.indexOf.call(g,u,void 0),$;($=A>=0)&&Array.prototype.splice.call(g,A,1),$&&(Xe(u),i.g[m].length==0&&(delete i.g[m],i.h--))}}function Vr(i,u,m,g){for(let A=0;A<i.length;++A){const $=i[A];if(!$.da&&$.listener==u&&$.capture==!!m&&$.ha==g)return A}return-1}var Fr="closure_lm_"+(Math.random()*1e6|0),Or={};function hl(i,u,m,g,A){if(Array.isArray(u)){for(let $=0;$<u.length;$++)hl(i,u[$],m,g,A);return null}return m=bl(m),i&&i[Me]?i.J(u,m,l(g)?!!g.capture:!1,A):Np(i,u,m,!1,g,A)}function Np(i,u,m,g,A,$){if(!u)throw Error("Invalid event type");const q=l(A)?!!A.capture:!!A;let Q=jr(i);if(Q||(i[Fr]=Q=new Zn(i)),m=Q.add(u,m,g,q,$),m.proxy)return m;if(g=Bp(),m.proxy=g,g.src=i,g.listener=m,i.addEventListener)C||(A=q),A===void 0&&(A=!1),i.addEventListener(u.toString(),g,A);else if(i.attachEvent)i.attachEvent(fl(u.toString()),g);else if(i.addListener&&i.removeListener)i.addListener(g);else throw Error("addEventListener and attachEvent are unavailable.");return m}function Bp(){function i(m){return u.call(i.src,i.listener,m)}const u=Vp;return i}function gl(i,u,m,g,A){if(Array.isArray(u))for(var $=0;$<u.length;$++)gl(i,u[$],m,g,A);else g=l(g)?!!g.capture:!!g,m=bl(m),i&&i[Me]?(i=i.i,$=String(u).toString(),$ in i.g&&(u=i.g[$],m=Vr(u,m,g,A),m>-1&&(Xe(u[m]),Array.prototype.splice.call(u,m,1),u.length==0&&(delete i.g[$],i.h--)))):i&&(i=jr(i))&&(u=i.g[u.toString()],i=-1,u&&(i=Vr(u,m,g,A)),(m=i>-1?u[i]:null)&&qr(m))}function qr(i){if(typeof i!="number"&&i&&!i.da){var u=i.src;if(u&&u[Me])Br(u.i,i);else{var m=i.type,g=i.proxy;u.removeEventListener?u.removeEventListener(m,g,i.capture):u.detachEvent?u.detachEvent(fl(m),g):u.addListener&&u.removeListener&&u.removeListener(g),(m=jr(u))?(Br(m,i),m.h==0&&(m.src=null,u[Fr]=null)):Xe(i)}}}function fl(i){return i in Or?Or[i]:Or[i]="on"+i}function Vp(i,u){if(i.da)i=!0;else{u=new ne(u,this);const m=i.listener,g=i.ha||i.src;i.fa&&qr(i),i=m.call(g,u)}return i}function jr(i){return i=i[Fr],i instanceof Zn?i:null}var Hr="__closure_events_fn_"+(Math.random()*1e9>>>0);function bl(i){return typeof i=="function"?i:(i[Hr]||(i[Hr]=function(u){return i.handleEvent(u)}),i[Hr])}function Te(){I.call(this),this.i=new Zn(this),this.M=this,this.G=null}h(Te,I),Te.prototype[Me]=!0,Te.prototype.removeEventListener=function(i,u,m,g){gl(this,i,u,m,g)};function $e(i,u){var m,g=i.G;if(g)for(m=[];g;g=g.G)m.push(g);if(i=i.M,g=u.type||u,typeof u=="string")u=new E(u,i);else if(u instanceof E)u.target=u.target||i;else{var A=u;u=new E(g,i),pl(u,A)}A=!0;let $,q;if(m)for(q=m.length-1;q>=0;q--)$=u.g=m[q],A=eo($,g,!0,u)&&A;if($=u.g=i,A=eo($,g,!0,u)&&A,A=eo($,g,!1,u)&&A,m)for(q=0;q<m.length;q++)$=u.g=m[q],A=eo($,g,!1,u)&&A}Te.prototype.N=function(){if(Te.Z.N.call(this),this.i){var i=this.i;for(const u in i.g){const m=i.g[u];for(let g=0;g<m.length;g++)Xe(m[g]);delete i.g[u],i.h--}}this.G=null},Te.prototype.J=function(i,u,m,g){return this.i.add(String(i),u,!1,m,g)},Te.prototype.K=function(i,u,m,g){return this.i.add(String(i),u,!0,m,g)};function eo(i,u,m,g){if(u=i.i.g[String(u)],!u)return!0;u=u.concat();let A=!0;for(let $=0;$<u.length;++$){const q=u[$];if(q&&!q.da&&q.capture==m){const Q=q.listener,fe=q.ha||q.src;q.fa&&Br(i.i,q),A=Q.call(fe,g)!==!1&&A}}return A&&!g.defaultPrevented}function Fp(i,u){if(typeof i!="function")if(i&&typeof i.handleEvent=="function")i=d(i.handleEvent,i);else throw Error("Invalid listener argument");return Number(u)>2147483647?-1:a.setTimeout(i,u||0)}function vl(i){i.g=Fp(()=>{i.g=null,i.i&&(i.i=!1,vl(i))},i.l);const u=i.h;i.h=null,i.m.apply(null,u)}class Op extends I{constructor(u,m){super(),this.m=u,this.l=m,this.h=null,this.i=!1,this.g=null}j(u){this.h=arguments,this.g?this.i=!0:vl(this)}N(){super.N(),this.g&&(a.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Js(i){I.call(this),this.h=i,this.g={}}h(Js,I);var yl=[];function xl(i){Ye(i.g,function(u,m){this.g.hasOwnProperty(m)&&qr(u)},i),i.g={}}Js.prototype.N=function(){Js.Z.N.call(this),xl(this)},Js.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Ur=a.JSON.stringify,qp=a.JSON.parse,jp=class{stringify(i){return a.JSON.stringify(i,void 0)}parse(i){return a.JSON.parse(i,void 0)}};function wl(){}function El(){}var Qs={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function zr(){E.call(this,"d")}h(zr,E);function Wr(){E.call(this,"c")}h(Wr,E);var Vt={},Il=null;function to(){return Il=Il||new Te}Vt.Ia="serverreachability";function Sl(i){E.call(this,Vt.Ia,i)}h(Sl,E);function Xs(i){const u=to();$e(u,new Sl(u))}Vt.STAT_EVENT="statevent";function Tl(i,u){E.call(this,Vt.STAT_EVENT,i),this.stat=u}h(Tl,E);function De(i){const u=to();$e(u,new Tl(u,i))}Vt.Ja="timingevent";function kl(i,u){E.call(this,Vt.Ja,i),this.size=u}h(kl,E);function Ys(i,u){if(typeof i!="function")throw Error("Fn must not be null and must be a function");return a.setTimeout(function(){i()},u)}function Zs(){this.g=!0}Zs.prototype.ua=function(){this.g=!1};function Hp(i,u,m,g,A,$){i.info(function(){if(i.g)if($){var q="",Q=$.split("&");for(let oe=0;oe<Q.length;oe++){var fe=Q[oe].split("=");if(fe.length>1){const be=fe[0];fe=fe[1];const et=be.split("_");q=et.length>=2&&et[1]=="type"?q+(be+"="+fe+"&"):q+(be+"=redacted&")}}}else q=null;else q=$;return"XMLHTTP REQ ("+g+") [attempt "+A+"]: "+u+`
`+m+`
`+q})}function Up(i,u,m,g,A,$,q){i.info(function(){return"XMLHTTP RESP ("+g+") [ attempt "+A+"]: "+u+`
`+m+`
`+$+" "+q})}function bs(i,u,m,g){i.info(function(){return"XMLHTTP TEXT ("+u+"): "+Wp(i,m)+(g?" "+g:"")})}function zp(i,u){i.info(function(){return"TIMEOUT: "+u})}Zs.prototype.info=function(){};function Wp(i,u){if(!i.g)return u;if(!u)return null;try{const $=JSON.parse(u);if($){for(i=0;i<$.length;i++)if(Array.isArray($[i])){var m=$[i];if(!(m.length<2)){var g=m[1];if(Array.isArray(g)&&!(g.length<1)){var A=g[0];if(A!="noop"&&A!="stop"&&A!="close")for(let q=1;q<g.length;q++)g[q]=""}}}}return Ur($)}catch{return u}}var so={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},Cl={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},_l;function Gr(){}h(Gr,wl),Gr.prototype.g=function(){return new XMLHttpRequest},_l=new Gr;function en(i){return encodeURIComponent(String(i))}function Gp(i){var u=1;i=i.split(":");const m=[];for(;u>0&&i.length;)m.push(i.shift()),u--;return i.length&&m.push(i.join(":")),m}function bt(i,u,m,g){this.j=i,this.i=u,this.l=m,this.S=g||1,this.V=new Js(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new Al}function Al(){this.i=null,this.g="",this.h=!1}var Pl={},Kr={};function Jr(i,u,m){i.M=1,i.A=oo(Ze(u)),i.u=m,i.R=!0,$l(i,null)}function $l(i,u){i.F=Date.now(),no(i),i.B=Ze(i.A);var m=i.B,g=i.S;Array.isArray(g)||(g=[String(g)]),Ul(m.i,"t",g),i.C=0,m=i.j.L,i.h=new Al,i.g=lc(i.j,m?u:null,!i.u),i.P>0&&(i.O=new Op(d(i.Y,i,i.g),i.P)),u=i.V,m=i.g,g=i.ba;var A="readystatechange";Array.isArray(A)||(A&&(yl[0]=A.toString()),A=yl);for(let $=0;$<A.length;$++){const q=hl(m,A[$],g||u.handleEvent,!1,u.h||u);if(!q)break;u.g[q.key]=q}u=i.J?ul(i.J):{},i.u?(i.v||(i.v="POST"),u["Content-Type"]="application/x-www-form-urlencoded",i.g.ea(i.B,i.v,i.u,u)):(i.v="GET",i.g.ea(i.B,i.v,null,u)),Xs(),Hp(i.i,i.v,i.B,i.l,i.S,i.u)}bt.prototype.ba=function(i){i=i.target;const u=this.O;u&&xt(i)==3?u.j():this.Y(i)},bt.prototype.Y=function(i){try{if(i==this.g)e:{const Q=xt(this.g),fe=this.g.ya(),oe=this.g.ca();if(!(Q<3)&&(Q!=3||this.g&&(this.h.h||this.g.la()||Xl(this.g)))){this.K||Q!=4||fe==7||(fe==8||oe<=0?Xs(3):Xs(2)),Qr(this);var u=this.g.ca();this.X=u;var m=Kp(this);if(this.o=u==200,Up(this.i,this.v,this.B,this.l,this.S,Q,u),this.o){if(this.U&&!this.L){t:{if(this.g){var g,A=this.g;if((g=A.g?A.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!y(g)){var $=g;break t}}$=null}if(i=$)bs(this.i,this.l,i,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,Xr(this,i);else{this.o=!1,this.m=3,De(12),Ft(this),tn(this);break e}}if(this.R){i=!0;let be;for(;!this.K&&this.C<m.length;)if(be=Jp(this,m),be==Kr){Q==4&&(this.m=4,De(14),i=!1),bs(this.i,this.l,null,"[Incomplete Response]");break}else if(be==Pl){this.m=4,De(15),bs(this.i,this.l,m,"[Invalid Chunk]"),i=!1;break}else bs(this.i,this.l,be,null),Xr(this,be);if(Dl(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Q!=4||m.length!=0||this.h.h||(this.m=1,De(16),i=!1),this.o=this.o&&i,!i)bs(this.i,this.l,m,"[Invalid Chunked Response]"),Ft(this),tn(this);else if(m.length>0&&!this.W){this.W=!0;var q=this.j;q.g==this&&q.aa&&!q.P&&(q.j.info("Great, no buffering proxy detected. Bytes received: "+m.length),ra(q),q.P=!0,De(11))}}else bs(this.i,this.l,m,null),Xr(this,m);Q==4&&Ft(this),this.o&&!this.K&&(Q==4?oc(this.j,this):(this.o=!1,no(this)))}else ch(this.g),u==400&&m.indexOf("Unknown SID")>0?(this.m=3,De(12)):(this.m=0,De(13)),Ft(this),tn(this)}}}catch{}finally{}};function Kp(i){if(!Dl(i))return i.g.la();const u=Xl(i.g);if(u==="")return"";let m="";const g=u.length,A=xt(i.g)==4;if(!i.h.i){if(typeof TextDecoder>"u")return Ft(i),tn(i),"";i.h.i=new a.TextDecoder}for(let $=0;$<g;$++)i.h.h=!0,m+=i.h.i.decode(u[$],{stream:!(A&&$==g-1)});return u.length=0,i.h.g+=m,i.C=0,i.h.g}function Dl(i){return i.g?i.v=="GET"&&i.M!=2&&i.j.Aa:!1}function Jp(i,u){var m=i.C,g=u.indexOf(`
`,m);return g==-1?Kr:(m=Number(u.substring(m,g)),isNaN(m)?Pl:(g+=1,g+m>u.length?Kr:(u=u.slice(g,g+m),i.C=g+m,u)))}bt.prototype.cancel=function(){this.K=!0,Ft(this)};function no(i){i.T=Date.now()+i.H,Ll(i,i.H)}function Ll(i,u){if(i.D!=null)throw Error("WatchDog timer not null");i.D=Ys(d(i.aa,i),u)}function Qr(i){i.D&&(a.clearTimeout(i.D),i.D=null)}bt.prototype.aa=function(){this.D=null;const i=Date.now();i-this.T>=0?(zp(this.i,this.B),this.M!=2&&(Xs(),De(17)),Ft(this),this.m=2,tn(this)):Ll(this,this.T-i)};function tn(i){i.j.I==0||i.K||oc(i.j,i)}function Ft(i){Qr(i);var u=i.O;u&&typeof u.dispose=="function"&&u.dispose(),i.O=null,xl(i.V),i.g&&(u=i.g,i.g=null,u.abort(),u.dispose())}function Xr(i,u){try{var m=i.j;if(m.I!=0&&(m.g==i||Yr(m.h,i))){if(!i.L&&Yr(m.h,i)&&m.I==3){try{var g=m.Ba.g.parse(u)}catch{g=null}if(Array.isArray(g)&&g.length==3){var A=g;if(A[0]==0){e:if(!m.v){if(m.g)if(m.g.F+3e3<i.F)co(m),io(m);else break e;oa(m),De(18)}}else m.xa=A[1],0<m.xa-m.K&&A[2]<37500&&m.F&&m.A==0&&!m.C&&(m.C=Ys(d(m.Va,m),6e3));Nl(m.h)<=1&&m.ta&&(m.ta=void 0)}else qt(m,11)}else if((i.L||m.g==i)&&co(m),!y(u))for(A=m.Ba.g.parse(u),u=0;u<A.length;u++){let oe=A[u];const be=oe[0];if(!(be<=m.K))if(m.K=be,oe=oe[1],m.I==2)if(oe[0]=="c"){m.M=oe[1],m.ba=oe[2];const et=oe[3];et!=null&&(m.ka=et,m.j.info("VER="+m.ka));const jt=oe[4];jt!=null&&(m.za=jt,m.j.info("SVER="+m.za));const wt=oe[5];wt!=null&&typeof wt=="number"&&wt>0&&(g=1.5*wt,m.O=g,m.j.info("backChannelRequestTimeoutMs_="+g)),g=m;const Et=i.g;if(Et){const mo=Et.g?Et.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(mo){var $=g.h;$.g||mo.indexOf("spdy")==-1&&mo.indexOf("quic")==-1&&mo.indexOf("h2")==-1||($.j=$.l,$.g=new Set,$.h&&(Zr($,$.h),$.h=null))}if(g.G){const aa=Et.g?Et.g.getResponseHeader("X-HTTP-Session-Id"):null;aa&&(g.wa=aa,ie(g.J,g.G,aa))}}m.I=3,m.l&&m.l.ra(),m.aa&&(m.T=Date.now()-i.F,m.j.info("Handshake RTT: "+m.T+"ms")),g=m;var q=i;if(g.na=ic(g,g.L?g.ba:null,g.W),q.L){Bl(g.h,q);var Q=q,fe=g.O;fe&&(Q.H=fe),Q.D&&(Qr(Q),no(Q)),g.g=q}else sc(g);m.i.length>0&&lo(m)}else oe[0]!="stop"&&oe[0]!="close"||qt(m,7);else m.I==3&&(oe[0]=="stop"||oe[0]=="close"?oe[0]=="stop"?qt(m,7):na(m):oe[0]!="noop"&&m.l&&m.l.qa(oe),m.A=0)}}Xs(4)}catch{}}var Qp=class{constructor(i,u){this.g=i,this.map=u}};function Rl(i){this.l=i||10,a.PerformanceNavigationTiming?(i=a.performance.getEntriesByType("navigation"),i=i.length>0&&(i[0].nextHopProtocol=="hq"||i[0].nextHopProtocol=="h2")):i=!!(a.chrome&&a.chrome.loadTimes&&a.chrome.loadTimes()&&a.chrome.loadTimes().wasFetchedViaSpdy),this.j=i?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function Ml(i){return i.h?!0:i.g?i.g.size>=i.j:!1}function Nl(i){return i.h?1:i.g?i.g.size:0}function Yr(i,u){return i.h?i.h==u:i.g?i.g.has(u):!1}function Zr(i,u){i.g?i.g.add(u):i.h=u}function Bl(i,u){i.h&&i.h==u?i.h=null:i.g&&i.g.has(u)&&i.g.delete(u)}Rl.prototype.cancel=function(){if(this.i=Vl(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const i of this.g.values())i.cancel();this.g.clear()}};function Vl(i){if(i.h!=null)return i.i.concat(i.h.G);if(i.g!=null&&i.g.size!==0){let u=i.i;for(const m of i.g.values())u=u.concat(m.G);return u}return x(i.i)}var Fl=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Xp(i,u){if(i){i=i.split("&");for(let m=0;m<i.length;m++){const g=i[m].indexOf("=");let A,$=null;g>=0?(A=i[m].substring(0,g),$=i[m].substring(g+1)):A=i[m],u(A,$?decodeURIComponent($.replace(/\+/g," ")):"")}}}function vt(i){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let u;i instanceof vt?(this.l=i.l,sn(this,i.j),this.o=i.o,this.g=i.g,nn(this,i.u),this.h=i.h,ea(this,zl(i.i)),this.m=i.m):i&&(u=String(i).match(Fl))?(this.l=!1,sn(this,u[1]||"",!0),this.o=on(u[2]||""),this.g=on(u[3]||"",!0),nn(this,u[4]),this.h=on(u[5]||"",!0),ea(this,u[6]||"",!0),this.m=on(u[7]||"")):(this.l=!1,this.i=new an(null,this.l))}vt.prototype.toString=function(){const i=[];var u=this.j;u&&i.push(rn(u,Ol,!0),":");var m=this.g;return(m||u=="file")&&(i.push("//"),(u=this.o)&&i.push(rn(u,Ol,!0),"@"),i.push(en(m).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),m=this.u,m!=null&&i.push(":",String(m))),(m=this.h)&&(this.g&&m.charAt(0)!="/"&&i.push("/"),i.push(rn(m,m.charAt(0)=="/"?eh:Zp,!0))),(m=this.i.toString())&&i.push("?",m),(m=this.m)&&i.push("#",rn(m,sh)),i.join("")},vt.prototype.resolve=function(i){const u=Ze(this);let m=!!i.j;m?sn(u,i.j):m=!!i.o,m?u.o=i.o:m=!!i.g,m?u.g=i.g:m=i.u!=null;var g=i.h;if(m)nn(u,i.u);else if(m=!!i.h){if(g.charAt(0)!="/")if(this.g&&!this.h)g="/"+g;else{var A=u.h.lastIndexOf("/");A!=-1&&(g=u.h.slice(0,A+1)+g)}if(A=g,A==".."||A==".")g="";else if(A.indexOf("./")!=-1||A.indexOf("/.")!=-1){g=A.lastIndexOf("/",0)==0,A=A.split("/");const $=[];for(let q=0;q<A.length;){const Q=A[q++];Q=="."?g&&q==A.length&&$.push(""):Q==".."?(($.length>1||$.length==1&&$[0]!="")&&$.pop(),g&&q==A.length&&$.push("")):($.push(Q),g=!0)}g=$.join("/")}else g=A}return m?u.h=g:m=i.i.toString()!=="",m?ea(u,zl(i.i)):m=!!i.m,m&&(u.m=i.m),u};function Ze(i){return new vt(i)}function sn(i,u,m){i.j=m?on(u,!0):u,i.j&&(i.j=i.j.replace(/:$/,""))}function nn(i,u){if(u){if(u=Number(u),isNaN(u)||u<0)throw Error("Bad port number "+u);i.u=u}else i.u=null}function ea(i,u,m){u instanceof an?(i.i=u,nh(i.i,i.l)):(m||(u=rn(u,th)),i.i=new an(u,i.l))}function ie(i,u,m){i.i.set(u,m)}function oo(i){return ie(i,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),i}function on(i,u){return i?u?decodeURI(i.replace(/%25/g,"%2525")):decodeURIComponent(i):""}function rn(i,u,m){return typeof i=="string"?(i=encodeURI(i).replace(u,Yp),m&&(i=i.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),i):null}function Yp(i){return i=i.charCodeAt(0),"%"+(i>>4&15).toString(16)+(i&15).toString(16)}var Ol=/[#\/\?@]/g,Zp=/[#\?:]/g,eh=/[#\?]/g,th=/[#\?@]/g,sh=/#/g;function an(i,u){this.h=this.g=null,this.i=i||null,this.j=!!u}function Ot(i){i.g||(i.g=new Map,i.h=0,i.i&&Xp(i.i,function(u,m){i.add(decodeURIComponent(u.replace(/\+/g," ")),m)}))}t=an.prototype,t.add=function(i,u){Ot(this),this.i=null,i=vs(this,i);let m=this.g.get(i);return m||this.g.set(i,m=[]),m.push(u),this.h+=1,this};function ql(i,u){Ot(i),u=vs(i,u),i.g.has(u)&&(i.i=null,i.h-=i.g.get(u).length,i.g.delete(u))}function jl(i,u){return Ot(i),u=vs(i,u),i.g.has(u)}t.forEach=function(i,u){Ot(this),this.g.forEach(function(m,g){m.forEach(function(A){i.call(u,A,g,this)},this)},this)};function Hl(i,u){Ot(i);let m=[];if(typeof u=="string")jl(i,u)&&(m=m.concat(i.g.get(vs(i,u))));else for(i=Array.from(i.g.values()),u=0;u<i.length;u++)m=m.concat(i[u]);return m}t.set=function(i,u){return Ot(this),this.i=null,i=vs(this,i),jl(this,i)&&(this.h-=this.g.get(i).length),this.g.set(i,[u]),this.h+=1,this},t.get=function(i,u){return i?(i=Hl(this,i),i.length>0?String(i[0]):u):u};function Ul(i,u,m){ql(i,u),m.length>0&&(i.i=null,i.g.set(vs(i,u),x(m)),i.h+=m.length)}t.toString=function(){if(this.i)return this.i;if(!this.g)return"";const i=[],u=Array.from(this.g.keys());for(let g=0;g<u.length;g++){var m=u[g];const A=en(m);m=Hl(this,m);for(let $=0;$<m.length;$++){let q=A;m[$]!==""&&(q+="="+en(m[$])),i.push(q)}}return this.i=i.join("&")};function zl(i){const u=new an;return u.i=i.i,i.g&&(u.g=new Map(i.g),u.h=i.h),u}function vs(i,u){return u=String(u),i.j&&(u=u.toLowerCase()),u}function nh(i,u){u&&!i.j&&(Ot(i),i.i=null,i.g.forEach(function(m,g){const A=g.toLowerCase();g!=A&&(ql(this,g),Ul(this,A,m))},i)),i.j=u}function oh(i,u){const m=new Zs;if(a.Image){const g=new Image;g.onload=p(yt,m,"TestLoadImage: loaded",!0,u,g),g.onerror=p(yt,m,"TestLoadImage: error",!1,u,g),g.onabort=p(yt,m,"TestLoadImage: abort",!1,u,g),g.ontimeout=p(yt,m,"TestLoadImage: timeout",!1,u,g),a.setTimeout(function(){g.ontimeout&&g.ontimeout()},1e4),g.src=i}else u(!1)}function rh(i,u){const m=new Zs,g=new AbortController,A=setTimeout(()=>{g.abort(),yt(m,"TestPingServer: timeout",!1,u)},1e4);fetch(i,{signal:g.signal}).then($=>{clearTimeout(A),$.ok?yt(m,"TestPingServer: ok",!0,u):yt(m,"TestPingServer: server error",!1,u)}).catch(()=>{clearTimeout(A),yt(m,"TestPingServer: error",!1,u)})}function yt(i,u,m,g,A){try{A&&(A.onload=null,A.onerror=null,A.onabort=null,A.ontimeout=null),g(m)}catch{}}function ah(){this.g=new jp}function ta(i){this.i=i.Sb||null,this.h=i.ab||!1}h(ta,wl),ta.prototype.g=function(){return new ro(this.i,this.h)};function ro(i,u){Te.call(this),this.H=i,this.o=u,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}h(ro,Te),t=ro.prototype,t.open=function(i,u){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=i,this.D=u,this.readyState=1,cn(this)},t.send=function(i){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const u={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};i&&(u.body=i),(this.H||a).fetch(new Request(this.D,u)).then(this.Pa.bind(this),this.ga.bind(this))},t.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,ln(this)),this.readyState=0},t.Pa=function(i){if(this.g&&(this.l=i,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=i.headers,this.readyState=2,cn(this)),this.g&&(this.readyState=3,cn(this),this.g)))if(this.responseType==="arraybuffer")i.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof a.ReadableStream<"u"&&"body"in i){if(this.j=i.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;Wl(this)}else i.text().then(this.Oa.bind(this),this.ga.bind(this))};function Wl(i){i.j.read().then(i.Ma.bind(i)).catch(i.ga.bind(i))}t.Ma=function(i){if(this.g){if(this.o&&i.value)this.response.push(i.value);else if(!this.o){var u=i.value?i.value:new Uint8Array(0);(u=this.B.decode(u,{stream:!i.done}))&&(this.response=this.responseText+=u)}i.done?ln(this):cn(this),this.readyState==3&&Wl(this)}},t.Oa=function(i){this.g&&(this.response=this.responseText=i,ln(this))},t.Na=function(i){this.g&&(this.response=i,ln(this))},t.ga=function(){this.g&&ln(this)};function ln(i){i.readyState=4,i.l=null,i.j=null,i.B=null,cn(i)}t.setRequestHeader=function(i,u){this.A.append(i,u)},t.getResponseHeader=function(i){return this.h&&this.h.get(i.toLowerCase())||""},t.getAllResponseHeaders=function(){if(!this.h)return"";const i=[],u=this.h.entries();for(var m=u.next();!m.done;)m=m.value,i.push(m[0]+": "+m[1]),m=u.next();return i.join(`\r
`)};function cn(i){i.onreadystatechange&&i.onreadystatechange.call(i)}Object.defineProperty(ro.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(i){this.m=i?"include":"same-origin"}});function Gl(i){let u="";return Ye(i,function(m,g){u+=g,u+=":",u+=m,u+=`\r
`}),u}function sa(i,u,m){e:{for(g in m){var g=!1;break e}g=!0}g||(m=Gl(m),typeof i=="string"?m!=null&&en(m):ie(i,u,m))}function ue(i){Te.call(this),this.headers=new Map,this.L=i||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}h(ue,Te);var ih=/^https?$/i,lh=["POST","PUT"];t=ue.prototype,t.Fa=function(i){this.H=i},t.ea=function(i,u,m,g){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+i);u=u?u.toUpperCase():"GET",this.D=i,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():_l.g(),this.g.onreadystatechange=f(d(this.Ca,this));try{this.B=!0,this.g.open(u,String(i),!0),this.B=!1}catch($){Kl(this,$);return}if(i=m||"",m=new Map(this.headers),g)if(Object.getPrototypeOf(g)===Object.prototype)for(var A in g)m.set(A,g[A]);else if(typeof g.keys=="function"&&typeof g.get=="function")for(const $ of g.keys())m.set($,g.get($));else throw Error("Unknown input type for opt_headers: "+String(g));g=Array.from(m.keys()).find($=>$.toLowerCase()=="content-type"),A=a.FormData&&i instanceof a.FormData,!(Array.prototype.indexOf.call(lh,u,void 0)>=0)||g||A||m.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[$,q]of m)this.g.setRequestHeader($,q);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(i),this.v=!1}catch($){Kl(this,$)}};function Kl(i,u){i.h=!1,i.g&&(i.j=!0,i.g.abort(),i.j=!1),i.l=u,i.o=5,Jl(i),ao(i)}function Jl(i){i.A||(i.A=!0,$e(i,"complete"),$e(i,"error"))}t.abort=function(i){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=i||7,$e(this,"complete"),$e(this,"abort"),ao(this))},t.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),ao(this,!0)),ue.Z.N.call(this)},t.Ca=function(){this.u||(this.B||this.v||this.j?Ql(this):this.Xa())},t.Xa=function(){Ql(this)};function Ql(i){if(i.h&&typeof r<"u"){if(i.v&&xt(i)==4)setTimeout(i.Ca.bind(i),0);else if($e(i,"readystatechange"),xt(i)==4){i.h=!1;try{const $=i.ca();e:switch($){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var u=!0;break e;default:u=!1}var m;if(!(m=u)){var g;if(g=$===0){let q=String(i.D).match(Fl)[1]||null;!q&&a.self&&a.self.location&&(q=a.self.location.protocol.slice(0,-1)),g=!ih.test(q?q.toLowerCase():"")}m=g}if(m)$e(i,"complete"),$e(i,"success");else{i.o=6;try{var A=xt(i)>2?i.g.statusText:""}catch{A=""}i.l=A+" ["+i.ca()+"]",Jl(i)}}finally{ao(i)}}}}function ao(i,u){if(i.g){i.m&&(clearTimeout(i.m),i.m=null);const m=i.g;i.g=null,u||$e(i,"ready");try{m.onreadystatechange=null}catch{}}}t.isActive=function(){return!!this.g};function xt(i){return i.g?i.g.readyState:0}t.ca=function(){try{return xt(this)>2?this.g.status:-1}catch{return-1}},t.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},t.La=function(i){if(this.g){var u=this.g.responseText;return i&&u.indexOf(i)==0&&(u=u.substring(i.length)),qp(u)}};function Xl(i){try{if(!i.g)return null;if("response"in i.g)return i.g.response;switch(i.F){case"":case"text":return i.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in i.g)return i.g.mozResponseArrayBuffer}return null}catch{return null}}function ch(i){const u={};i=(i.g&&xt(i)>=2&&i.g.getAllResponseHeaders()||"").split(`\r
`);for(let g=0;g<i.length;g++){if(y(i[g]))continue;var m=Gp(i[g]);const A=m[0];if(m=m[1],typeof m!="string")continue;m=m.trim();const $=u[A]||[];u[A]=$,$.push(m)}Mp(u,function(g){return g.join(", ")})}t.ya=function(){return this.o},t.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function dn(i,u,m){return m&&m.internalChannelParams&&m.internalChannelParams[i]||u}function Yl(i){this.za=0,this.i=[],this.j=new Zs,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=dn("failFast",!1,i),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=dn("baseRetryDelayMs",5e3,i),this.Za=dn("retryDelaySeedMs",1e4,i),this.Ta=dn("forwardChannelMaxRetries",2,i),this.va=dn("forwardChannelRequestTimeoutMs",2e4,i),this.ma=i&&i.xmlHttpFactory||void 0,this.Ua=i&&i.Rb||void 0,this.Aa=i&&i.useFetchStreams||!1,this.O=void 0,this.L=i&&i.supportsCrossDomainXhr||!1,this.M="",this.h=new Rl(i&&i.concurrentRequestLimit),this.Ba=new ah,this.S=i&&i.fastHandshake||!1,this.R=i&&i.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=i&&i.Pb||!1,i&&i.ua&&this.j.ua(),i&&i.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&i&&i.detectBufferingProxy||!1,this.ia=void 0,i&&i.longPollingTimeout&&i.longPollingTimeout>0&&(this.ia=i.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}t=Yl.prototype,t.ka=8,t.I=1,t.connect=function(i,u,m,g){De(0),this.W=i,this.H=u||{},m&&g!==void 0&&(this.H.OSID=m,this.H.OAID=g),this.F=this.X,this.J=ic(this,null,this.W),lo(this)};function na(i){if(Zl(i),i.I==3){var u=i.V++,m=Ze(i.J);if(ie(m,"SID",i.M),ie(m,"RID",u),ie(m,"TYPE","terminate"),un(i,m),u=new bt(i,i.j,u),u.M=2,u.A=oo(Ze(m)),m=!1,a.navigator&&a.navigator.sendBeacon)try{m=a.navigator.sendBeacon(u.A.toString(),"")}catch{}!m&&a.Image&&(new Image().src=u.A,m=!0),m||(u.g=lc(u.j,null),u.g.ea(u.A)),u.F=Date.now(),no(u)}ac(i)}function io(i){i.g&&(ra(i),i.g.cancel(),i.g=null)}function Zl(i){io(i),i.v&&(a.clearTimeout(i.v),i.v=null),co(i),i.h.cancel(),i.m&&(typeof i.m=="number"&&a.clearTimeout(i.m),i.m=null)}function lo(i){if(!Ml(i.h)&&!i.m){i.m=!0;var u=i.Ea;H||b(),G||(H(),G=!0),T.add(u,i),i.D=0}}function dh(i,u){return Nl(i.h)>=i.h.j-(i.m?1:0)?!1:i.m?(i.i=u.G.concat(i.i),!0):i.I==1||i.I==2||i.D>=(i.Sa?0:i.Ta)?!1:(i.m=Ys(d(i.Ea,i,u),rc(i,i.D)),i.D++,!0)}t.Ea=function(i){if(this.m)if(this.m=null,this.I==1){if(!i){this.V=Math.floor(Math.random()*1e5),i=this.V++;const A=new bt(this,this.j,i);let $=this.o;if(this.U&&($?($=ul($),pl($,this.U)):$=this.U),this.u!==null||this.R||(A.J=$,$=null),this.S)e:{for(var u=0,m=0;m<this.i.length;m++){t:{var g=this.i[m];if("__data__"in g.map&&(g=g.map.__data__,typeof g=="string")){g=g.length;break t}g=void 0}if(g===void 0)break;if(u+=g,u>4096){u=m;break e}if(u===4096||m===this.i.length-1){u=m+1;break e}}u=1e3}else u=1e3;u=tc(this,A,u),m=Ze(this.J),ie(m,"RID",i),ie(m,"CVER",22),this.G&&ie(m,"X-HTTP-Session-Id",this.G),un(this,m),$&&(this.R?u="headers="+en(Gl($))+"&"+u:this.u&&sa(m,this.u,$)),Zr(this.h,A),this.Ra&&ie(m,"TYPE","init"),this.S?(ie(m,"$req",u),ie(m,"SID","null"),A.U=!0,Jr(A,m,null)):Jr(A,m,u),this.I=2}}else this.I==3&&(i?ec(this,i):this.i.length==0||Ml(this.h)||ec(this))};function ec(i,u){var m;u?m=u.l:m=i.V++;const g=Ze(i.J);ie(g,"SID",i.M),ie(g,"RID",m),ie(g,"AID",i.K),un(i,g),i.u&&i.o&&sa(g,i.u,i.o),m=new bt(i,i.j,m,i.D+1),i.u===null&&(m.J=i.o),u&&(i.i=u.G.concat(i.i)),u=tc(i,m,1e3),m.H=Math.round(i.va*.5)+Math.round(i.va*.5*Math.random()),Zr(i.h,m),Jr(m,g,u)}function un(i,u){i.H&&Ye(i.H,function(m,g){ie(u,g,m)}),i.l&&Ye({},function(m,g){ie(u,g,m)})}function tc(i,u,m){m=Math.min(i.i.length,m);const g=i.l?d(i.l.Ka,i.l,i):null;e:{var A=i.i;let Q=-1;for(;;){const fe=["count="+m];Q==-1?m>0?(Q=A[0].g,fe.push("ofs="+Q)):Q=0:fe.push("ofs="+Q);let oe=!0;for(let be=0;be<m;be++){var $=A[be].g;const et=A[be].map;if($-=Q,$<0)Q=Math.max(0,A[be].g-100),oe=!1;else try{$="req"+$+"_"||"";try{var q=et instanceof Map?et:Object.entries(et);for(const[jt,wt]of q){let Et=wt;l(wt)&&(Et=Ur(wt)),fe.push($+jt+"="+encodeURIComponent(Et))}}catch(jt){throw fe.push($+"type="+encodeURIComponent("_badmap")),jt}}catch{g&&g(et)}}if(oe){q=fe.join("&");break e}}q=void 0}return i=i.i.splice(0,m),u.G=i,q}function sc(i){if(!i.g&&!i.v){i.Y=1;var u=i.Da;H||b(),G||(H(),G=!0),T.add(u,i),i.A=0}}function oa(i){return i.g||i.v||i.A>=3?!1:(i.Y++,i.v=Ys(d(i.Da,i),rc(i,i.A)),i.A++,!0)}t.Da=function(){if(this.v=null,nc(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var i=4*this.T;this.j.info("BP detection timer enabled: "+i),this.B=Ys(d(this.Wa,this),i)}},t.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,De(10),io(this),nc(this))};function ra(i){i.B!=null&&(a.clearTimeout(i.B),i.B=null)}function nc(i){i.g=new bt(i,i.j,"rpc",i.Y),i.u===null&&(i.g.J=i.o),i.g.P=0;var u=Ze(i.na);ie(u,"RID","rpc"),ie(u,"SID",i.M),ie(u,"AID",i.K),ie(u,"CI",i.F?"0":"1"),!i.F&&i.ia&&ie(u,"TO",i.ia),ie(u,"TYPE","xmlhttp"),un(i,u),i.u&&i.o&&sa(u,i.u,i.o),i.O&&(i.g.H=i.O);var m=i.g;i=i.ba,m.M=1,m.A=oo(Ze(u)),m.u=null,m.R=!0,$l(m,i)}t.Va=function(){this.C!=null&&(this.C=null,io(this),oa(this),De(19))};function co(i){i.C!=null&&(a.clearTimeout(i.C),i.C=null)}function oc(i,u){var m=null;if(i.g==u){co(i),ra(i),i.g=null;var g=2}else if(Yr(i.h,u))m=u.G,Bl(i.h,u),g=1;else return;if(i.I!=0){if(u.o)if(g==1){m=u.u?u.u.length:0,u=Date.now()-u.F;var A=i.D;g=to(),$e(g,new kl(g,m)),lo(i)}else sc(i);else if(A=u.m,A==3||A==0&&u.X>0||!(g==1&&dh(i,u)||g==2&&oa(i)))switch(m&&m.length>0&&(u=i.h,u.i=u.i.concat(m)),A){case 1:qt(i,5);break;case 4:qt(i,10);break;case 3:qt(i,6);break;default:qt(i,2)}}}function rc(i,u){let m=i.Qa+Math.floor(Math.random()*i.Za);return i.isActive()||(m*=2),m*u}function qt(i,u){if(i.j.info("Error code "+u),u==2){var m=d(i.bb,i),g=i.Ua;const A=!g;g=new vt(g||"//www.google.com/images/cleardot.gif"),a.location&&a.location.protocol=="http"||sn(g,"https"),oo(g),A?oh(g.toString(),m):rh(g.toString(),m)}else De(2);i.I=0,i.l&&i.l.pa(u),ac(i),Zl(i)}t.bb=function(i){i?(this.j.info("Successfully pinged google.com"),De(2)):(this.j.info("Failed to ping google.com"),De(1))};function ac(i){if(i.I=0,i.ja=[],i.l){const u=Vl(i.h);(u.length!=0||i.i.length!=0)&&(S(i.ja,u),S(i.ja,i.i),i.h.i.length=0,x(i.i),i.i.length=0),i.l.oa()}}function ic(i,u,m){var g=m instanceof vt?Ze(m):new vt(m);if(g.g!="")u&&(g.g=u+"."+g.g),nn(g,g.u);else{var A=a.location;g=A.protocol,u=u?u+"."+A.hostname:A.hostname,A=+A.port;const $=new vt(null);g&&sn($,g),u&&($.g=u),A&&nn($,A),m&&($.h=m),g=$}return m=i.G,u=i.wa,m&&u&&ie(g,m,u),ie(g,"VER",i.ka),un(i,g),g}function lc(i,u,m){if(u&&!i.L)throw Error("Can't create secondary domain capable XhrIo object.");return u=i.Aa&&!i.ma?new ue(new ta({ab:m})):new ue(i.ma),u.Fa(i.L),u}t.isActive=function(){return!!this.l&&this.l.isActive(this)};function cc(){}t=cc.prototype,t.ra=function(){},t.qa=function(){},t.pa=function(){},t.oa=function(){},t.isActive=function(){return!0},t.Ka=function(){};function uo(){}uo.prototype.g=function(i,u){return new je(i,u)};function je(i,u){Te.call(this),this.g=new Yl(u),this.l=i,this.h=u&&u.messageUrlParams||null,i=u&&u.messageHeaders||null,u&&u.clientProtocolHeaderRequired&&(i?i["X-Client-Protocol"]="webchannel":i={"X-Client-Protocol":"webchannel"}),this.g.o=i,i=u&&u.initMessageHeaders||null,u&&u.messageContentType&&(i?i["X-WebChannel-Content-Type"]=u.messageContentType:i={"X-WebChannel-Content-Type":u.messageContentType}),u&&u.sa&&(i?i["X-WebChannel-Client-Profile"]=u.sa:i={"X-WebChannel-Client-Profile":u.sa}),this.g.U=i,(i=u&&u.Qb)&&!y(i)&&(this.g.u=i),this.A=u&&u.supportsCrossDomainXhr||!1,this.v=u&&u.sendRawJson||!1,(u=u&&u.httpSessionIdParam)&&!y(u)&&(this.g.G=u,i=this.h,i!==null&&u in i&&(i=this.h,u in i&&delete i[u])),this.j=new ys(this)}h(je,Te),je.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},je.prototype.close=function(){na(this.g)},je.prototype.o=function(i){var u=this.g;if(typeof i=="string"){var m={};m.__data__=i,i=m}else this.v&&(m={},m.__data__=Ur(i),i=m);u.i.push(new Qp(u.Ya++,i)),u.I==3&&lo(u)},je.prototype.N=function(){this.g.l=null,delete this.j,na(this.g),delete this.g,je.Z.N.call(this)};function dc(i){zr.call(this),i.__headers__&&(this.headers=i.__headers__,this.statusCode=i.__status__,delete i.__headers__,delete i.__status__);var u=i.__sm__;if(u){e:{for(const m in u){i=m;break e}i=void 0}(this.i=i)&&(i=this.i,u=u!==null&&i in u?u[i]:void 0),this.data=u}else this.data=i}h(dc,zr);function uc(){Wr.call(this),this.status=1}h(uc,Wr);function ys(i){this.g=i}h(ys,cc),ys.prototype.ra=function(){$e(this.g,"a")},ys.prototype.qa=function(i){$e(this.g,new dc(i))},ys.prototype.pa=function(i){$e(this.g,new uc)},ys.prototype.oa=function(){$e(this.g,"b")},uo.prototype.createWebChannel=uo.prototype.g,je.prototype.send=je.prototype.o,je.prototype.open=je.prototype.m,je.prototype.close=je.prototype.close,Au=function(){return new uo},_u=function(){return to()},Cu=Vt,Va={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},so.NO_ERROR=0,so.TIMEOUT=8,so.HTTP_ERROR=6,Lo=so,Cl.COMPLETE="complete",ku=Cl,El.EventType=Qs,Qs.OPEN="a",Qs.CLOSE="b",Qs.ERROR="c",Qs.MESSAGE="d",Te.prototype.listen=Te.prototype.J,fn=El,ue.prototype.listenOnce=ue.prototype.K,ue.prototype.getLastError=ue.prototype.Ha,ue.prototype.getLastErrorCode=ue.prototype.ya,ue.prototype.getStatus=ue.prototype.ca,ue.prototype.getResponseJson=ue.prototype.La,ue.prototype.getResponseText=ue.prototype.la,ue.prototype.send=ue.prototype.ea,ue.prototype.setWithCredentials=ue.prototype.Fa,Tu=ue}).apply(typeof ho<"u"?ho:typeof self<"u"?self:typeof window<"u"?window:{});const Mc="@firebase/firestore",Nc="4.9.2";class Be{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Be.UNAUTHENTICATED=new Be(null),Be.GOOGLE_CREDENTIALS=new Be("google-credentials-uid"),Be.FIRST_PARTY=new Be("first-party-uid"),Be.MOCK_USER=new Be("mock-user");let zs="12.3.0";const as=new yu("@firebase/firestore");function Es(){return as.logLevel}function U(t,...e){if(as.logLevel<=ee.DEBUG){const s=e.map(xi);as.debug(`Firestore (${zs}): ${t}`,...s)}}function is(t,...e){if(as.logLevel<=ee.ERROR){const s=e.map(xi);as.error(`Firestore (${zs}): ${t}`,...s)}}function yi(t,...e){if(as.logLevel<=ee.WARN){const s=e.map(xi);as.warn(`Firestore (${zs}): ${t}`,...s)}}function xi(t){if(typeof t=="string")return t;try{return(function(s){return JSON.stringify(s)})(t)}catch{return t}}function Y(t,e,s){let n="Unexpected state";typeof e=="string"?n=e:s=e,Pu(t,n,s)}function Pu(t,e,s){let n=`FIRESTORE (${zs}) INTERNAL ASSERTION FAILED: ${e} (ID: ${t.toString(16)})`;if(s!==void 0)try{n+=" CONTEXT: "+JSON.stringify(s)}catch{n+=" CONTEXT: "+s}throw is(n),new Error(n)}function me(t,e,s,n){let o="Unexpected state";typeof s=="string"?o=s:n=s,t||Pu(e,o,n)}function ae(t,e){return t}const M={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class z extends hs{constructor(e,s){super(e,s),this.code=e,this.message=s,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}class Zt{constructor(){this.promise=new Promise(((e,s)=>{this.resolve=e,this.reject=s}))}}class Rf{constructor(e,s){this.user=s,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class Mf{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,s){e.enqueueRetryable((()=>s(Be.UNAUTHENTICATED)))}shutdown(){}}class Nf{constructor(e){this.t=e,this.currentUser=Be.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,s){me(this.o===void 0,42304);let n=this.i;const o=c=>this.i!==n?(n=this.i,s(c)):Promise.resolve();let r=new Zt;this.o=()=>{this.i++,this.currentUser=this.u(),r.resolve(),r=new Zt,e.enqueueRetryable((()=>o(this.currentUser)))};const a=()=>{const c=r;e.enqueueRetryable((async()=>{await c.promise,await o(this.currentUser)}))},l=c=>{U("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=c,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit((c=>l(c))),setTimeout((()=>{if(!this.auth){const c=this.t.getImmediate({optional:!0});c?l(c):(U("FirebaseAuthCredentialsProvider","Auth not yet detected"),r.resolve(),r=new Zt)}}),0),a()}getToken(){const e=this.i,s=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(s).then((n=>this.i!==e?(U("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):n?(me(typeof n.accessToken=="string",31837,{l:n}),new Rf(n.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return me(e===null||typeof e=="string",2055,{h:e}),new Be(e)}}class Bf{constructor(e,s,n){this.P=e,this.T=s,this.I=n,this.type="FirstParty",this.user=Be.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class Vf{constructor(e,s,n){this.P=e,this.T=s,this.I=n}getToken(){return Promise.resolve(new Bf(this.P,this.T,this.I))}start(e,s){e.enqueueRetryable((()=>s(Be.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class Bc{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Ff{constructor(e,s){this.V=s,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,wf(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,s){me(this.o===void 0,3512);const n=r=>{r.error!=null&&U("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${r.error.message}`);const a=r.token!==this.m;return this.m=r.token,U("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?s(r.token):Promise.resolve()};this.o=r=>{e.enqueueRetryable((()=>n(r)))};const o=r=>{U("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=r,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit((r=>o(r))),setTimeout((()=>{if(!this.appCheck){const r=this.V.getImmediate({optional:!0});r?o(r):U("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.p)return Promise.resolve(new Bc(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then((s=>s?(me(typeof s.token=="string",44558,{tokenResult:s}),this.m=s.token,new Bc(s.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}function Of(t){const e=typeof self<"u"&&(self.crypto||self.msCrypto),s=new Uint8Array(t);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(s);else for(let n=0;n<t;n++)s[n]=Math.floor(256*Math.random());return s}class wi{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",s=62*Math.floor(4.129032258064516);let n="";for(;n.length<20;){const o=Of(40);for(let r=0;r<o.length;++r)n.length<20&&o[r]<s&&(n+=e.charAt(o[r]%62))}return n}}function se(t,e){return t<e?-1:t>e?1:0}function Fa(t,e){const s=Math.min(t.length,e.length);for(let n=0;n<s;n++){const o=t.charAt(n),r=e.charAt(n);if(o!==r)return pa(o)===pa(r)?se(o,r):pa(o)?1:-1}return se(t.length,e.length)}const qf=55296,jf=57343;function pa(t){const e=t.charCodeAt(0);return e>=qf&&e<=jf}function Ms(t,e,s){return t.length===e.length&&t.every(((n,o)=>s(n,e[o])))}const Vc="__name__";class st{constructor(e,s,n){s===void 0?s=0:s>e.length&&Y(637,{offset:s,range:e.length}),n===void 0?n=e.length-s:n>e.length-s&&Y(1746,{length:n,range:e.length-s}),this.segments=e,this.offset=s,this.len=n}get length(){return this.len}isEqual(e){return st.comparator(this,e)===0}child(e){const s=this.segments.slice(this.offset,this.limit());return e instanceof st?e.forEach((n=>{s.push(n)})):s.push(e),this.construct(s)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let s=0;s<this.length;s++)if(this.get(s)!==e.get(s))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let s=0;s<this.length;s++)if(this.get(s)!==e.get(s))return!1;return!0}forEach(e){for(let s=this.offset,n=this.limit();s<n;s++)e(this.segments[s])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,s){const n=Math.min(e.length,s.length);for(let o=0;o<n;o++){const r=st.compareSegments(e.get(o),s.get(o));if(r!==0)return r}return se(e.length,s.length)}static compareSegments(e,s){const n=st.isNumericId(e),o=st.isNumericId(s);return n&&!o?-1:!n&&o?1:n&&o?st.extractNumericId(e).compare(st.extractNumericId(s)):Fa(e,s)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return vi.fromString(e.substring(4,e.length-2))}}class pe extends st{construct(e,s,n){return new pe(e,s,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const s=[];for(const n of e){if(n.indexOf("//")>=0)throw new z(M.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);s.push(...n.split("/").filter((o=>o.length>0)))}return new pe(s)}static emptyPath(){return new pe([])}}const Hf=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Ee extends st{construct(e,s,n){return new Ee(e,s,n)}static isValidIdentifier(e){return Hf.test(e)}canonicalString(){return this.toArray().map((e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Ee.isValidIdentifier(e)||(e="`"+e+"`"),e))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Vc}static keyField(){return new Ee([Vc])}static fromServerFormat(e){const s=[];let n="",o=0;const r=()=>{if(n.length===0)throw new z(M.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);s.push(n),n=""};let a=!1;for(;o<e.length;){const l=e[o];if(l==="\\"){if(o+1===e.length)throw new z(M.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const c=e[o+1];if(c!=="\\"&&c!=="."&&c!=="`")throw new z(M.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);n+=c,o+=2}else l==="`"?(a=!a,o++):l!=="."||a?(n+=l,o++):(r(),o++)}if(r(),a)throw new z(M.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Ee(s)}static emptyPath(){return new Ee([])}}class X{constructor(e){this.path=e}static fromPath(e){return new X(pe.fromString(e))}static fromName(e){return new X(pe.fromString(e).popFirst(5))}static empty(){return new X(pe.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&pe.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,s){return pe.comparator(e.path,s.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new X(new pe(e.slice()))}}function Uf(t,e,s){if(!s)throw new z(M.INVALID_ARGUMENT,`Function ${t}() cannot be called with an empty ${e}.`)}function zf(t,e,s,n){if(e===!0&&n===!0)throw new z(M.INVALID_ARGUMENT,`${t} and ${s} cannot be used together.`)}function Fc(t){if(!X.isDocumentKey(t))throw new z(M.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`)}function $u(t){return typeof t=="object"&&t!==null&&(Object.getPrototypeOf(t)===Object.prototype||Object.getPrototypeOf(t)===null)}function Ei(t){if(t===void 0)return"undefined";if(t===null)return"null";if(typeof t=="string")return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if(typeof t=="number"||typeof t=="boolean")return""+t;if(typeof t=="object"){if(t instanceof Array)return"an array";{const e=(function(n){return n.constructor?n.constructor.name:null})(t);return e?`a custom ${e} object`:"an object"}}return typeof t=="function"?"a function":Y(12329,{type:typeof t})}function jo(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new z(M.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const s=Ei(t);throw new z(M.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${s}`)}}return t}function ge(t,e){const s={typeString:t};return e&&(s.value=e),s}function Hn(t,e){if(!$u(t))throw new z(M.INVALID_ARGUMENT,"JSON must be an object");let s;for(const n in e)if(e[n]){const o=e[n].typeString,r="value"in e[n]?{value:e[n].value}:void 0;if(!(n in t)){s=`JSON missing required field: '${n}'`;break}const a=t[n];if(o&&typeof a!==o){s=`JSON field '${n}' must be a ${o}.`;break}if(r!==void 0&&a!==r.value){s=`Expected '${n}' field to equal '${r.value}'`;break}}if(s)throw new z(M.INVALID_ARGUMENT,s);return!0}const Oc=-62135596800,qc=1e6;class de{static now(){return de.fromMillis(Date.now())}static fromDate(e){return de.fromMillis(e.getTime())}static fromMillis(e){const s=Math.floor(e/1e3),n=Math.floor((e-1e3*s)*qc);return new de(s,n)}constructor(e,s){if(this.seconds=e,this.nanoseconds=s,s<0)throw new z(M.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+s);if(s>=1e9)throw new z(M.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+s);if(e<Oc)throw new z(M.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new z(M.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/qc}_compareTo(e){return this.seconds===e.seconds?se(this.nanoseconds,e.nanoseconds):se(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:de._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(Hn(e,de._jsonSchema))return new de(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-Oc;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}de._jsonSchemaVersion="firestore/timestamp/1.0",de._jsonSchema={type:ge("string",de._jsonSchemaVersion),seconds:ge("number"),nanoseconds:ge("number")};class ce{static fromTimestamp(e){return new ce(e)}static min(){return new ce(new de(0,0))}static max(){return new ce(new de(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}const Rn=-1;function Wf(t,e){const s=t.toTimestamp().seconds,n=t.toTimestamp().nanoseconds+1,o=ce.fromTimestamp(n===1e9?new de(s+1,0):new de(s,n));return new Dt(o,X.empty(),e)}function Gf(t){return new Dt(t.readTime,t.key,Rn)}class Dt{constructor(e,s,n){this.readTime=e,this.documentKey=s,this.largestBatchId=n}static min(){return new Dt(ce.min(),X.empty(),Rn)}static max(){return new Dt(ce.max(),X.empty(),Rn)}}function Kf(t,e){let s=t.readTime.compareTo(e.readTime);return s!==0?s:(s=X.comparator(t.documentKey,e.documentKey),s!==0?s:se(t.largestBatchId,e.largestBatchId))}const Jf="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Qf{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((e=>e()))}}async function Ii(t){if(t.code!==M.FAILED_PRECONDITION||t.message!==Jf)throw t;U("LocalStore","Unexpectedly lost primary lease")}class L{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e((s=>{this.isDone=!0,this.result=s,this.nextCallback&&this.nextCallback(s)}),(s=>{this.isDone=!0,this.error=s,this.catchCallback&&this.catchCallback(s)}))}catch(e){return this.next(void 0,e)}next(e,s){return this.callbackAttached&&Y(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(s,this.error):this.wrapSuccess(e,this.result):new L(((n,o)=>{this.nextCallback=r=>{this.wrapSuccess(e,r).next(n,o)},this.catchCallback=r=>{this.wrapFailure(s,r).next(n,o)}}))}toPromise(){return new Promise(((e,s)=>{this.next(e,s)}))}wrapUserFunction(e){try{const s=e();return s instanceof L?s:L.resolve(s)}catch(s){return L.reject(s)}}wrapSuccess(e,s){return e?this.wrapUserFunction((()=>e(s))):L.resolve(s)}wrapFailure(e,s){return e?this.wrapUserFunction((()=>e(s))):L.reject(s)}static resolve(e){return new L(((s,n)=>{s(e)}))}static reject(e){return new L(((s,n)=>{n(e)}))}static waitFor(e){return new L(((s,n)=>{let o=0,r=0,a=!1;e.forEach((l=>{++o,l.next((()=>{++r,a&&r===o&&s()}),(c=>n(c)))})),a=!0,r===o&&s()}))}static or(e){let s=L.resolve(!1);for(const n of e)s=s.next((o=>o?L.resolve(o):n()));return s}static forEach(e,s){const n=[];return e.forEach(((o,r)=>{n.push(s.call(this,o,r))})),this.waitFor(n)}static mapArray(e,s){return new L(((n,o)=>{const r=e.length,a=new Array(r);let l=0;for(let c=0;c<r;c++){const d=c;s(e[d]).next((p=>{a[d]=p,++l,l===r&&n(a)}),(p=>o(p)))}}))}static doWhile(e,s){return new L(((n,o)=>{const r=()=>{e()===!0?s().next((()=>{r()}),o):n()};r()}))}}function Xf(t){const e=t.match(/Android ([\d.]+)/i),s=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(s)}function Un(t){return t.name==="IndexedDbTransactionError"}class Si{constructor(e,s){this.previousValue=e,s&&(s.sequenceNumberHandler=n=>this.ae(n),this.ue=n=>s.writeSequenceNumber(n))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}Si.ce=-1;const Ti=-1;function ki(t){return t==null}function Ho(t){return t===0&&1/t==-1/0}function Yf(t){return typeof t=="number"&&Number.isInteger(t)&&!Ho(t)&&t<=Number.MAX_SAFE_INTEGER&&t>=Number.MIN_SAFE_INTEGER}const Du="";function Zf(t){let e="";for(let s=0;s<t.length;s++)e.length>0&&(e=jc(e)),e=e0(t.get(s),e);return jc(e)}function e0(t,e){let s=e;const n=t.length;for(let o=0;o<n;o++){const r=t.charAt(o);switch(r){case"\0":s+="";break;case Du:s+="";break;default:s+=r}}return s}function jc(t){return t+Du+""}function Hc(t){let e=0;for(const s in t)Object.prototype.hasOwnProperty.call(t,s)&&e++;return e}function gs(t,e){for(const s in t)Object.prototype.hasOwnProperty.call(t,s)&&e(s,t[s])}function Lu(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}class qe{constructor(e,s){this.comparator=e,this.root=s||xe.EMPTY}insert(e,s){return new qe(this.comparator,this.root.insert(e,s,this.comparator).copy(null,null,xe.BLACK,null,null))}remove(e){return new qe(this.comparator,this.root.remove(e,this.comparator).copy(null,null,xe.BLACK,null,null))}get(e){let s=this.root;for(;!s.isEmpty();){const n=this.comparator(e,s.key);if(n===0)return s.value;n<0?s=s.left:n>0&&(s=s.right)}return null}indexOf(e){let s=0,n=this.root;for(;!n.isEmpty();){const o=this.comparator(e,n.key);if(o===0)return s+n.left.size;o<0?n=n.left:(s+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal(((s,n)=>(e(s,n),!1)))}toString(){const e=[];return this.inorderTraversal(((s,n)=>(e.push(`${s}:${n}`),!1))),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new go(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new go(this.root,e,this.comparator,!1)}getReverseIterator(){return new go(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new go(this.root,e,this.comparator,!0)}}class go{constructor(e,s,n,o){this.isReverse=o,this.nodeStack=[];let r=1;for(;!e.isEmpty();)if(r=s?n(e.key,s):1,s&&o&&(r*=-1),r<0)e=this.isReverse?e.left:e.right;else{if(r===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const s={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return s}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class xe{constructor(e,s,n,o,r){this.key=e,this.value=s,this.color=n??xe.RED,this.left=o??xe.EMPTY,this.right=r??xe.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,s,n,o,r){return new xe(e??this.key,s??this.value,n??this.color,o??this.left,r??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,s,n){let o=this;const r=n(e,o.key);return o=r<0?o.copy(null,null,null,o.left.insert(e,s,n),null):r===0?o.copy(null,s,null,null,null):o.copy(null,null,null,null,o.right.insert(e,s,n)),o.fixUp()}removeMin(){if(this.left.isEmpty())return xe.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,s){let n,o=this;if(s(e,o.key)<0)o.left.isEmpty()||o.left.isRed()||o.left.left.isRed()||(o=o.moveRedLeft()),o=o.copy(null,null,null,o.left.remove(e,s),null);else{if(o.left.isRed()&&(o=o.rotateRight()),o.right.isEmpty()||o.right.isRed()||o.right.left.isRed()||(o=o.moveRedRight()),s(e,o.key)===0){if(o.right.isEmpty())return xe.EMPTY;n=o.right.min(),o=o.copy(n.key,n.value,null,null,o.right.removeMin())}o=o.copy(null,null,null,null,o.right.remove(e,s))}return o.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,xe.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,xe.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),s=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,s)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw Y(43730,{key:this.key,value:this.value});if(this.right.isRed())throw Y(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw Y(27949);return e+(this.isRed()?0:1)}}xe.EMPTY=null,xe.RED=!0,xe.BLACK=!1;xe.EMPTY=new class{constructor(){this.size=0}get key(){throw Y(57766)}get value(){throw Y(16141)}get color(){throw Y(16727)}get left(){throw Y(29726)}get right(){throw Y(36894)}copy(e,s,n,o,r){return this}insert(e,s,n){return new xe(e,s)}remove(e,s){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};class Se{constructor(e){this.comparator=e,this.data=new qe(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal(((s,n)=>(e(s),!1)))}forEachInRange(e,s){const n=this.data.getIteratorFrom(e[0]);for(;n.hasNext();){const o=n.getNext();if(this.comparator(o.key,e[1])>=0)return;s(o.key)}}forEachWhile(e,s){let n;for(n=s!==void 0?this.data.getIteratorFrom(s):this.data.getIterator();n.hasNext();)if(!e(n.getNext().key))return}firstAfterOrEqual(e){const s=this.data.getIteratorFrom(e);return s.hasNext()?s.getNext().key:null}getIterator(){return new Uc(this.data.getIterator())}getIteratorFrom(e){return new Uc(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let s=this;return s.size<e.size&&(s=e,e=this),e.forEach((n=>{s=s.add(n)})),s}isEqual(e){if(!(e instanceof Se)||this.size!==e.size)return!1;const s=this.data.getIterator(),n=e.data.getIterator();for(;s.hasNext();){const o=s.getNext().key,r=n.getNext().key;if(this.comparator(o,r)!==0)return!1}return!0}toArray(){const e=[];return this.forEach((s=>{e.push(s)})),e}toString(){const e=[];return this.forEach((s=>e.push(s))),"SortedSet("+e.toString()+")"}copy(e){const s=new Se(this.comparator);return s.data=e,s}}class Uc{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}class Ue{constructor(e){this.fields=e,e.sort(Ee.comparator)}static empty(){return new Ue([])}unionWith(e){let s=new Se(Ee.comparator);for(const n of this.fields)s=s.add(n);for(const n of e)s=s.add(n);return new Ue(s.toArray())}covers(e){for(const s of this.fields)if(s.isPrefixOf(e))return!0;return!1}isEqual(e){return Ms(this.fields,e.fields,((s,n)=>s.isEqual(n)))}}class t0 extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}class ot{constructor(e){this.binaryString=e}static fromBase64String(e){const s=(function(o){try{return atob(o)}catch(r){throw typeof DOMException<"u"&&r instanceof DOMException?new t0("Invalid base64 string: "+r):r}})(e);return new ot(s)}static fromUint8Array(e){const s=(function(o){let r="";for(let a=0;a<o.length;++a)r+=String.fromCharCode(o[a]);return r})(e);return new ot(s)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(s){return btoa(s)})(this.binaryString)}toUint8Array(){return(function(s){const n=new Uint8Array(s.length);for(let o=0;o<s.length;o++)n[o]=s.charCodeAt(o);return n})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return se(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}ot.EMPTY_BYTE_STRING=new ot("");const s0=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function ls(t){if(me(!!t,39018),typeof t=="string"){let e=0;const s=s0.exec(t);if(me(!!s,46558,{timestamp:t}),s[1]){let o=s[1];o=(o+"000000000").substr(0,9),e=Number(o)}const n=new Date(t);return{seconds:Math.floor(n.getTime()/1e3),nanos:e}}return{seconds:we(t.seconds),nanos:we(t.nanos)}}function we(t){return typeof t=="number"?t:typeof t=="string"?Number(t):0}function Ns(t){return typeof t=="string"?ot.fromBase64String(t):ot.fromUint8Array(t)}const Ru="server_timestamp",Mu="__type__",Nu="__previous_value__",Bu="__local_write_time__";function Ci(t){return(t?.mapValue?.fields||{})[Mu]?.stringValue===Ru}function _i(t){const e=t.mapValue.fields[Nu];return Ci(e)?_i(e):e}function Uo(t){const e=ls(t.mapValue.fields[Bu].timestampValue);return new de(e.seconds,e.nanos)}class n0{constructor(e,s,n,o,r,a,l,c,d,p){this.databaseId=e,this.appId=s,this.persistenceKey=n,this.host=o,this.ssl=r,this.forceLongPolling=a,this.autoDetectLongPolling=l,this.longPollingOptions=c,this.useFetchStreams=d,this.isUsingEmulator=p}}const Oa="(default)";class zo{constructor(e,s){this.projectId=e,this.database=s||Oa}static empty(){return new zo("","")}get isDefaultDatabase(){return this.database===Oa}isEqual(e){return e instanceof zo&&e.projectId===this.projectId&&e.database===this.database}}const Vu="__type__",o0="__max__",fo={mapValue:{}},Fu="__vector__",qa="value";function cs(t){return"nullValue"in t?0:"booleanValue"in t?1:"integerValue"in t||"doubleValue"in t?2:"timestampValue"in t?3:"stringValue"in t?5:"bytesValue"in t?6:"referenceValue"in t?7:"geoPointValue"in t?8:"arrayValue"in t?9:"mapValue"in t?Ci(t)?4:a0(t)?9007199254740991:r0(t)?10:11:Y(28295,{value:t})}function rt(t,e){if(t===e)return!0;const s=cs(t);if(s!==cs(e))return!1;switch(s){case 0:case 9007199254740991:return!0;case 1:return t.booleanValue===e.booleanValue;case 4:return Uo(t).isEqual(Uo(e));case 3:return(function(o,r){if(typeof o.timestampValue=="string"&&typeof r.timestampValue=="string"&&o.timestampValue.length===r.timestampValue.length)return o.timestampValue===r.timestampValue;const a=ls(o.timestampValue),l=ls(r.timestampValue);return a.seconds===l.seconds&&a.nanos===l.nanos})(t,e);case 5:return t.stringValue===e.stringValue;case 6:return(function(o,r){return Ns(o.bytesValue).isEqual(Ns(r.bytesValue))})(t,e);case 7:return t.referenceValue===e.referenceValue;case 8:return(function(o,r){return we(o.geoPointValue.latitude)===we(r.geoPointValue.latitude)&&we(o.geoPointValue.longitude)===we(r.geoPointValue.longitude)})(t,e);case 2:return(function(o,r){if("integerValue"in o&&"integerValue"in r)return we(o.integerValue)===we(r.integerValue);if("doubleValue"in o&&"doubleValue"in r){const a=we(o.doubleValue),l=we(r.doubleValue);return a===l?Ho(a)===Ho(l):isNaN(a)&&isNaN(l)}return!1})(t,e);case 9:return Ms(t.arrayValue.values||[],e.arrayValue.values||[],rt);case 10:case 11:return(function(o,r){const a=o.mapValue.fields||{},l=r.mapValue.fields||{};if(Hc(a)!==Hc(l))return!1;for(const c in a)if(a.hasOwnProperty(c)&&(l[c]===void 0||!rt(a[c],l[c])))return!1;return!0})(t,e);default:return Y(52216,{left:t})}}function Mn(t,e){return(t.values||[]).find((s=>rt(s,e)))!==void 0}function Bs(t,e){if(t===e)return 0;const s=cs(t),n=cs(e);if(s!==n)return se(s,n);switch(s){case 0:case 9007199254740991:return 0;case 1:return se(t.booleanValue,e.booleanValue);case 2:return(function(r,a){const l=we(r.integerValue||r.doubleValue),c=we(a.integerValue||a.doubleValue);return l<c?-1:l>c?1:l===c?0:isNaN(l)?isNaN(c)?0:-1:1})(t,e);case 3:return zc(t.timestampValue,e.timestampValue);case 4:return zc(Uo(t),Uo(e));case 5:return Fa(t.stringValue,e.stringValue);case 6:return(function(r,a){const l=Ns(r),c=Ns(a);return l.compareTo(c)})(t.bytesValue,e.bytesValue);case 7:return(function(r,a){const l=r.split("/"),c=a.split("/");for(let d=0;d<l.length&&d<c.length;d++){const p=se(l[d],c[d]);if(p!==0)return p}return se(l.length,c.length)})(t.referenceValue,e.referenceValue);case 8:return(function(r,a){const l=se(we(r.latitude),we(a.latitude));return l!==0?l:se(we(r.longitude),we(a.longitude))})(t.geoPointValue,e.geoPointValue);case 9:return Wc(t.arrayValue,e.arrayValue);case 10:return(function(r,a){const l=r.fields||{},c=a.fields||{},d=l[qa]?.arrayValue,p=c[qa]?.arrayValue,h=se(d?.values?.length||0,p?.values?.length||0);return h!==0?h:Wc(d,p)})(t.mapValue,e.mapValue);case 11:return(function(r,a){if(r===fo.mapValue&&a===fo.mapValue)return 0;if(r===fo.mapValue)return 1;if(a===fo.mapValue)return-1;const l=r.fields||{},c=Object.keys(l),d=a.fields||{},p=Object.keys(d);c.sort(),p.sort();for(let h=0;h<c.length&&h<p.length;++h){const f=Fa(c[h],p[h]);if(f!==0)return f;const x=Bs(l[c[h]],d[p[h]]);if(x!==0)return x}return se(c.length,p.length)})(t.mapValue,e.mapValue);default:throw Y(23264,{he:s})}}function zc(t,e){if(typeof t=="string"&&typeof e=="string"&&t.length===e.length)return se(t,e);const s=ls(t),n=ls(e),o=se(s.seconds,n.seconds);return o!==0?o:se(s.nanos,n.nanos)}function Wc(t,e){const s=t.values||[],n=e.values||[];for(let o=0;o<s.length&&o<n.length;++o){const r=Bs(s[o],n[o]);if(r)return r}return se(s.length,n.length)}function Vs(t){return ja(t)}function ja(t){return"nullValue"in t?"null":"booleanValue"in t?""+t.booleanValue:"integerValue"in t?""+t.integerValue:"doubleValue"in t?""+t.doubleValue:"timestampValue"in t?(function(s){const n=ls(s);return`time(${n.seconds},${n.nanos})`})(t.timestampValue):"stringValue"in t?t.stringValue:"bytesValue"in t?(function(s){return Ns(s).toBase64()})(t.bytesValue):"referenceValue"in t?(function(s){return X.fromName(s).toString()})(t.referenceValue):"geoPointValue"in t?(function(s){return`geo(${s.latitude},${s.longitude})`})(t.geoPointValue):"arrayValue"in t?(function(s){let n="[",o=!0;for(const r of s.values||[])o?o=!1:n+=",",n+=ja(r);return n+"]"})(t.arrayValue):"mapValue"in t?(function(s){const n=Object.keys(s.fields||{}).sort();let o="{",r=!0;for(const a of n)r?r=!1:o+=",",o+=`${a}:${ja(s.fields[a])}`;return o+"}"})(t.mapValue):Y(61005,{value:t})}function Ro(t){switch(cs(t)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=_i(t);return e?16+Ro(e):16;case 5:return 2*t.stringValue.length;case 6:return Ns(t.bytesValue).approximateByteSize();case 7:return t.referenceValue.length;case 9:return(function(n){return(n.values||[]).reduce(((o,r)=>o+Ro(r)),0)})(t.arrayValue);case 10:case 11:return(function(n){let o=0;return gs(n.fields,((r,a)=>{o+=r.length+Ro(a)})),o})(t.mapValue);default:throw Y(13486,{value:t})}}function Ha(t){return!!t&&"integerValue"in t}function Ai(t){return!!t&&"arrayValue"in t}function Mo(t){return!!t&&"mapValue"in t}function r0(t){return(t?.mapValue?.fields||{})[Vu]?.stringValue===Fu}function xn(t){if(t.geoPointValue)return{geoPointValue:{...t.geoPointValue}};if(t.timestampValue&&typeof t.timestampValue=="object")return{timestampValue:{...t.timestampValue}};if(t.mapValue){const e={mapValue:{fields:{}}};return gs(t.mapValue.fields,((s,n)=>e.mapValue.fields[s]=xn(n))),e}if(t.arrayValue){const e={arrayValue:{values:[]}};for(let s=0;s<(t.arrayValue.values||[]).length;++s)e.arrayValue.values[s]=xn(t.arrayValue.values[s]);return e}return{...t}}function a0(t){return(((t.mapValue||{}).fields||{}).__type__||{}).stringValue===o0}class He{constructor(e){this.value=e}static empty(){return new He({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let s=this.value;for(let n=0;n<e.length-1;++n)if(s=(s.mapValue.fields||{})[e.get(n)],!Mo(s))return null;return s=(s.mapValue.fields||{})[e.lastSegment()],s||null}}set(e,s){this.getFieldsMap(e.popLast())[e.lastSegment()]=xn(s)}setAll(e){let s=Ee.emptyPath(),n={},o=[];e.forEach(((a,l)=>{if(!s.isImmediateParentOf(l)){const c=this.getFieldsMap(s);this.applyChanges(c,n,o),n={},o=[],s=l.popLast()}a?n[l.lastSegment()]=xn(a):o.push(l.lastSegment())}));const r=this.getFieldsMap(s);this.applyChanges(r,n,o)}delete(e){const s=this.field(e.popLast());Mo(s)&&s.mapValue.fields&&delete s.mapValue.fields[e.lastSegment()]}isEqual(e){return rt(this.value,e.value)}getFieldsMap(e){let s=this.value;s.mapValue.fields||(s.mapValue={fields:{}});for(let n=0;n<e.length;++n){let o=s.mapValue.fields[e.get(n)];Mo(o)&&o.mapValue.fields||(o={mapValue:{fields:{}}},s.mapValue.fields[e.get(n)]=o),s=o}return s.mapValue.fields}applyChanges(e,s,n){gs(s,((o,r)=>e[o]=r));for(const o of n)delete e[o]}clone(){return new He(xn(this.value))}}function Ou(t){const e=[];return gs(t.fields,((s,n)=>{const o=new Ee([s]);if(Mo(n)){const r=Ou(n.mapValue).fields;if(r.length===0)e.push(o);else for(const a of r)e.push(o.child(a))}else e.push(o)})),new Ue(e)}class Ge{constructor(e,s,n,o,r,a,l){this.key=e,this.documentType=s,this.version=n,this.readTime=o,this.createTime=r,this.data=a,this.documentState=l}static newInvalidDocument(e){return new Ge(e,0,ce.min(),ce.min(),ce.min(),He.empty(),0)}static newFoundDocument(e,s,n,o){return new Ge(e,1,s,ce.min(),n,o,0)}static newNoDocument(e,s){return new Ge(e,2,s,ce.min(),ce.min(),He.empty(),0)}static newUnknownDocument(e,s){return new Ge(e,3,s,ce.min(),ce.min(),He.empty(),2)}convertToFoundDocument(e,s){return!this.createTime.isEqual(ce.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=s,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=He.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=He.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=ce.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Ge&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Ge(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}class Wo{constructor(e,s){this.position=e,this.inclusive=s}}function Gc(t,e,s){let n=0;for(let o=0;o<t.position.length;o++){const r=e[o],a=t.position[o];if(r.field.isKeyField()?n=X.comparator(X.fromName(a.referenceValue),s.key):n=Bs(a,s.data.field(r.field)),r.dir==="desc"&&(n*=-1),n!==0)break}return n}function Kc(t,e){if(t===null)return e===null;if(e===null||t.inclusive!==e.inclusive||t.position.length!==e.position.length)return!1;for(let s=0;s<t.position.length;s++)if(!rt(t.position[s],e.position[s]))return!1;return!0}class Go{constructor(e,s="asc"){this.field=e,this.dir=s}}function i0(t,e){return t.dir===e.dir&&t.field.isEqual(e.field)}class qu{}class ye extends qu{constructor(e,s,n){super(),this.field=e,this.op=s,this.value=n}static create(e,s,n){return e.isKeyField()?s==="in"||s==="not-in"?this.createKeyFieldInFilter(e,s,n):new c0(e,s,n):s==="array-contains"?new m0(e,n):s==="in"?new p0(e,n):s==="not-in"?new h0(e,n):s==="array-contains-any"?new g0(e,n):new ye(e,s,n)}static createKeyFieldInFilter(e,s,n){return s==="in"?new d0(e,n):new u0(e,n)}matches(e){const s=e.data.field(this.field);return this.op==="!="?s!==null&&s.nullValue===void 0&&this.matchesComparison(Bs(s,this.value)):s!==null&&cs(this.value)===cs(s)&&this.matchesComparison(Bs(s,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return Y(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Lt extends qu{constructor(e,s){super(),this.filters=e,this.op=s,this.Pe=null}static create(e,s){return new Lt(e,s)}matches(e){return ju(this)?this.filters.find((s=>!s.matches(e)))===void 0:this.filters.find((s=>s.matches(e)))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce(((e,s)=>e.concat(s.getFlattenedFilters())),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function ju(t){return t.op==="and"}function Hu(t){return l0(t)&&ju(t)}function l0(t){for(const e of t.filters)if(e instanceof Lt)return!1;return!0}function Ua(t){if(t instanceof ye)return t.field.canonicalString()+t.op.toString()+Vs(t.value);if(Hu(t))return t.filters.map((e=>Ua(e))).join(",");{const e=t.filters.map((s=>Ua(s))).join(",");return`${t.op}(${e})`}}function Uu(t,e){return t instanceof ye?(function(n,o){return o instanceof ye&&n.op===o.op&&n.field.isEqual(o.field)&&rt(n.value,o.value)})(t,e):t instanceof Lt?(function(n,o){return o instanceof Lt&&n.op===o.op&&n.filters.length===o.filters.length?n.filters.reduce(((r,a,l)=>r&&Uu(a,o.filters[l])),!0):!1})(t,e):void Y(19439)}function zu(t){return t instanceof ye?(function(s){return`${s.field.canonicalString()} ${s.op} ${Vs(s.value)}`})(t):t instanceof Lt?(function(s){return s.op.toString()+" {"+s.getFilters().map(zu).join(" ,")+"}"})(t):"Filter"}class c0 extends ye{constructor(e,s,n){super(e,s,n),this.key=X.fromName(n.referenceValue)}matches(e){const s=X.comparator(e.key,this.key);return this.matchesComparison(s)}}class d0 extends ye{constructor(e,s){super(e,"in",s),this.keys=Wu("in",s)}matches(e){return this.keys.some((s=>s.isEqual(e.key)))}}class u0 extends ye{constructor(e,s){super(e,"not-in",s),this.keys=Wu("not-in",s)}matches(e){return!this.keys.some((s=>s.isEqual(e.key)))}}function Wu(t,e){return(e.arrayValue?.values||[]).map((s=>X.fromName(s.referenceValue)))}class m0 extends ye{constructor(e,s){super(e,"array-contains",s)}matches(e){const s=e.data.field(this.field);return Ai(s)&&Mn(s.arrayValue,this.value)}}class p0 extends ye{constructor(e,s){super(e,"in",s)}matches(e){const s=e.data.field(this.field);return s!==null&&Mn(this.value.arrayValue,s)}}class h0 extends ye{constructor(e,s){super(e,"not-in",s)}matches(e){if(Mn(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const s=e.data.field(this.field);return s!==null&&s.nullValue===void 0&&!Mn(this.value.arrayValue,s)}}class g0 extends ye{constructor(e,s){super(e,"array-contains-any",s)}matches(e){const s=e.data.field(this.field);return!(!Ai(s)||!s.arrayValue.values)&&s.arrayValue.values.some((n=>Mn(this.value.arrayValue,n)))}}class f0{constructor(e,s=null,n=[],o=[],r=null,a=null,l=null){this.path=e,this.collectionGroup=s,this.orderBy=n,this.filters=o,this.limit=r,this.startAt=a,this.endAt=l,this.Te=null}}function Jc(t,e=null,s=[],n=[],o=null,r=null,a=null){return new f0(t,e,s,n,o,r,a)}function Pi(t){const e=ae(t);if(e.Te===null){let s=e.path.canonicalString();e.collectionGroup!==null&&(s+="|cg:"+e.collectionGroup),s+="|f:",s+=e.filters.map((n=>Ua(n))).join(","),s+="|ob:",s+=e.orderBy.map((n=>(function(r){return r.field.canonicalString()+r.dir})(n))).join(","),ki(e.limit)||(s+="|l:",s+=e.limit),e.startAt&&(s+="|lb:",s+=e.startAt.inclusive?"b:":"a:",s+=e.startAt.position.map((n=>Vs(n))).join(",")),e.endAt&&(s+="|ub:",s+=e.endAt.inclusive?"a:":"b:",s+=e.endAt.position.map((n=>Vs(n))).join(",")),e.Te=s}return e.Te}function $i(t,e){if(t.limit!==e.limit||t.orderBy.length!==e.orderBy.length)return!1;for(let s=0;s<t.orderBy.length;s++)if(!i0(t.orderBy[s],e.orderBy[s]))return!1;if(t.filters.length!==e.filters.length)return!1;for(let s=0;s<t.filters.length;s++)if(!Uu(t.filters[s],e.filters[s]))return!1;return t.collectionGroup===e.collectionGroup&&!!t.path.isEqual(e.path)&&!!Kc(t.startAt,e.startAt)&&Kc(t.endAt,e.endAt)}class hr{constructor(e,s=null,n=[],o=[],r=null,a="F",l=null,c=null){this.path=e,this.collectionGroup=s,this.explicitOrderBy=n,this.filters=o,this.limit=r,this.limitType=a,this.startAt=l,this.endAt=c,this.Ie=null,this.Ee=null,this.de=null,this.startAt,this.endAt}}function b0(t,e,s,n,o,r,a,l){return new hr(t,e,s,n,o,r,a,l)}function v0(t){return new hr(t)}function Qc(t){return t.filters.length===0&&t.limit===null&&t.startAt==null&&t.endAt==null&&(t.explicitOrderBy.length===0||t.explicitOrderBy.length===1&&t.explicitOrderBy[0].field.isKeyField())}function y0(t){return t.collectionGroup!==null}function wn(t){const e=ae(t);if(e.Ie===null){e.Ie=[];const s=new Set;for(const r of e.explicitOrderBy)e.Ie.push(r),s.add(r.field.canonicalString());const n=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let l=new Se(Ee.comparator);return a.filters.forEach((c=>{c.getFlattenedFilters().forEach((d=>{d.isInequality()&&(l=l.add(d.field))}))})),l})(e).forEach((r=>{s.has(r.canonicalString())||r.isKeyField()||e.Ie.push(new Go(r,n))})),s.has(Ee.keyField().canonicalString())||e.Ie.push(new Go(Ee.keyField(),n))}return e.Ie}function es(t){const e=ae(t);return e.Ee||(e.Ee=x0(e,wn(t))),e.Ee}function x0(t,e){if(t.limitType==="F")return Jc(t.path,t.collectionGroup,e,t.filters,t.limit,t.startAt,t.endAt);{e=e.map((o=>{const r=o.dir==="desc"?"asc":"desc";return new Go(o.field,r)}));const s=t.endAt?new Wo(t.endAt.position,t.endAt.inclusive):null,n=t.startAt?new Wo(t.startAt.position,t.startAt.inclusive):null;return Jc(t.path,t.collectionGroup,e,t.filters,t.limit,s,n)}}function za(t,e,s){return new hr(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),e,s,t.startAt,t.endAt)}function Gu(t,e){return $i(es(t),es(e))&&t.limitType===e.limitType}function Ku(t){return`${Pi(es(t))}|lt:${t.limitType}`}function mn(t){return`Query(target=${(function(s){let n=s.path.canonicalString();return s.collectionGroup!==null&&(n+=" collectionGroup="+s.collectionGroup),s.filters.length>0&&(n+=`, filters: [${s.filters.map((o=>zu(o))).join(", ")}]`),ki(s.limit)||(n+=", limit: "+s.limit),s.orderBy.length>0&&(n+=`, orderBy: [${s.orderBy.map((o=>(function(a){return`${a.field.canonicalString()} (${a.dir})`})(o))).join(", ")}]`),s.startAt&&(n+=", startAt: ",n+=s.startAt.inclusive?"b:":"a:",n+=s.startAt.position.map((o=>Vs(o))).join(",")),s.endAt&&(n+=", endAt: ",n+=s.endAt.inclusive?"a:":"b:",n+=s.endAt.position.map((o=>Vs(o))).join(",")),`Target(${n})`})(es(t))}; limitType=${t.limitType})`}function Di(t,e){return e.isFoundDocument()&&(function(n,o){const r=o.key.path;return n.collectionGroup!==null?o.key.hasCollectionId(n.collectionGroup)&&n.path.isPrefixOf(r):X.isDocumentKey(n.path)?n.path.isEqual(r):n.path.isImmediateParentOf(r)})(t,e)&&(function(n,o){for(const r of wn(n))if(!r.field.isKeyField()&&o.data.field(r.field)===null)return!1;return!0})(t,e)&&(function(n,o){for(const r of n.filters)if(!r.matches(o))return!1;return!0})(t,e)&&(function(n,o){return!(n.startAt&&!(function(a,l,c){const d=Gc(a,l,c);return a.inclusive?d<=0:d<0})(n.startAt,wn(n),o)||n.endAt&&!(function(a,l,c){const d=Gc(a,l,c);return a.inclusive?d>=0:d>0})(n.endAt,wn(n),o))})(t,e)}function w0(t){return(e,s)=>{let n=!1;for(const o of wn(t)){const r=E0(o,e,s);if(r!==0)return r;n=n||o.field.isKeyField()}return 0}}function E0(t,e,s){const n=t.field.isKeyField()?X.comparator(e.key,s.key):(function(r,a,l){const c=a.data.field(r),d=l.data.field(r);return c!==null&&d!==null?Bs(c,d):Y(42886)})(t.field,e,s);switch(t.dir){case"asc":return n;case"desc":return-1*n;default:return Y(19790,{direction:t.dir})}}class fs{constructor(e,s){this.mapKeyFn=e,this.equalsFn=s,this.inner={},this.innerSize=0}get(e){const s=this.mapKeyFn(e),n=this.inner[s];if(n!==void 0){for(const[o,r]of n)if(this.equalsFn(o,e))return r}}has(e){return this.get(e)!==void 0}set(e,s){const n=this.mapKeyFn(e),o=this.inner[n];if(o===void 0)return this.inner[n]=[[e,s]],void this.innerSize++;for(let r=0;r<o.length;r++)if(this.equalsFn(o[r][0],e))return void(o[r]=[e,s]);o.push([e,s]),this.innerSize++}delete(e){const s=this.mapKeyFn(e),n=this.inner[s];if(n===void 0)return!1;for(let o=0;o<n.length;o++)if(this.equalsFn(n[o][0],e))return n.length===1?delete this.inner[s]:n.splice(o,1),this.innerSize--,!0;return!1}forEach(e){gs(this.inner,((s,n)=>{for(const[o,r]of n)e(o,r)}))}isEmpty(){return Lu(this.inner)}size(){return this.innerSize}}const I0=new qe(X.comparator);function Ko(){return I0}const Ju=new qe(X.comparator);function bo(...t){let e=Ju;for(const s of t)e=e.insert(s.key,s);return e}function Qu(t){let e=Ju;return t.forEach(((s,n)=>e=e.insert(s,n.overlayedDocument))),e}function Jt(){return En()}function Xu(){return En()}function En(){return new fs((t=>t.toString()),((t,e)=>t.isEqual(e)))}const S0=new qe(X.comparator),T0=new Se(X.comparator);function Ce(...t){let e=T0;for(const s of t)e=e.add(s);return e}const k0=new Se(se);function C0(){return k0}function Li(t,e){if(t.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Ho(e)?"-0":e}}function Yu(t){return{integerValue:""+t}}function _0(t,e){return Yf(e)?Yu(e):Li(t,e)}class gr{constructor(){this._=void 0}}function A0(t,e,s){return t instanceof Jo?(function(o,r){const a={fields:{[Mu]:{stringValue:Ru},[Bu]:{timestampValue:{seconds:o.seconds,nanos:o.nanoseconds}}}};return r&&Ci(r)&&(r=_i(r)),r&&(a.fields[Nu]=r),{mapValue:a}})(s,e):t instanceof Fs?em(t,e):t instanceof Nn?tm(t,e):(function(o,r){const a=Zu(o,r),l=Xc(a)+Xc(o.Ae);return Ha(a)&&Ha(o.Ae)?Yu(l):Li(o.serializer,l)})(t,e)}function P0(t,e,s){return t instanceof Fs?em(t,e):t instanceof Nn?tm(t,e):s}function Zu(t,e){return t instanceof Qo?(function(n){return Ha(n)||(function(r){return!!r&&"doubleValue"in r})(n)})(e)?e:{integerValue:0}:null}class Jo extends gr{}class Fs extends gr{constructor(e){super(),this.elements=e}}function em(t,e){const s=sm(e);for(const n of t.elements)s.some((o=>rt(o,n)))||s.push(n);return{arrayValue:{values:s}}}class Nn extends gr{constructor(e){super(),this.elements=e}}function tm(t,e){let s=sm(e);for(const n of t.elements)s=s.filter((o=>!rt(o,n)));return{arrayValue:{values:s}}}class Qo extends gr{constructor(e,s){super(),this.serializer=e,this.Ae=s}}function Xc(t){return we(t.integerValue||t.doubleValue)}function sm(t){return Ai(t)&&t.arrayValue.values?t.arrayValue.values.slice():[]}class $0{constructor(e,s){this.field=e,this.transform=s}}function D0(t,e){return t.field.isEqual(e.field)&&(function(n,o){return n instanceof Fs&&o instanceof Fs||n instanceof Nn&&o instanceof Nn?Ms(n.elements,o.elements,rt):n instanceof Qo&&o instanceof Qo?rt(n.Ae,o.Ae):n instanceof Jo&&o instanceof Jo})(t.transform,e.transform)}class L0{constructor(e,s){this.version=e,this.transformResults=s}}class nt{constructor(e,s){this.updateTime=e,this.exists=s}static none(){return new nt}static exists(e){return new nt(void 0,e)}static updateTime(e){return new nt(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function No(t,e){return t.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(t.updateTime):t.exists===void 0||t.exists===e.isFoundDocument()}class fr{}function nm(t,e){if(!t.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return t.isNoDocument()?new rm(t.key,nt.none()):new zn(t.key,t.data,nt.none());{const s=t.data,n=He.empty();let o=new Se(Ee.comparator);for(let r of e.fields)if(!o.has(r)){let a=s.field(r);a===null&&r.length>1&&(r=r.popLast(),a=s.field(r)),a===null?n.delete(r):n.set(r,a),o=o.add(r)}return new Bt(t.key,n,new Ue(o.toArray()),nt.none())}}function R0(t,e,s){t instanceof zn?(function(o,r,a){const l=o.value.clone(),c=Zc(o.fieldTransforms,r,a.transformResults);l.setAll(c),r.convertToFoundDocument(a.version,l).setHasCommittedMutations()})(t,e,s):t instanceof Bt?(function(o,r,a){if(!No(o.precondition,r))return void r.convertToUnknownDocument(a.version);const l=Zc(o.fieldTransforms,r,a.transformResults),c=r.data;c.setAll(om(o)),c.setAll(l),r.convertToFoundDocument(a.version,c).setHasCommittedMutations()})(t,e,s):(function(o,r,a){r.convertToNoDocument(a.version).setHasCommittedMutations()})(0,e,s)}function In(t,e,s,n){return t instanceof zn?(function(r,a,l,c){if(!No(r.precondition,a))return l;const d=r.value.clone(),p=ed(r.fieldTransforms,c,a);return d.setAll(p),a.convertToFoundDocument(a.version,d).setHasLocalMutations(),null})(t,e,s,n):t instanceof Bt?(function(r,a,l,c){if(!No(r.precondition,a))return l;const d=ed(r.fieldTransforms,c,a),p=a.data;return p.setAll(om(r)),p.setAll(d),a.convertToFoundDocument(a.version,p).setHasLocalMutations(),l===null?null:l.unionWith(r.fieldMask.fields).unionWith(r.fieldTransforms.map((h=>h.field)))})(t,e,s,n):(function(r,a,l){return No(r.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):l})(t,e,s)}function M0(t,e){let s=null;for(const n of t.fieldTransforms){const o=e.data.field(n.field),r=Zu(n.transform,o||null);r!=null&&(s===null&&(s=He.empty()),s.set(n.field,r))}return s||null}function Yc(t,e){return t.type===e.type&&!!t.key.isEqual(e.key)&&!!t.precondition.isEqual(e.precondition)&&!!(function(n,o){return n===void 0&&o===void 0||!(!n||!o)&&Ms(n,o,((r,a)=>D0(r,a)))})(t.fieldTransforms,e.fieldTransforms)&&(t.type===0?t.value.isEqual(e.value):t.type!==1||t.data.isEqual(e.data)&&t.fieldMask.isEqual(e.fieldMask))}class zn extends fr{constructor(e,s,n,o=[]){super(),this.key=e,this.value=s,this.precondition=n,this.fieldTransforms=o,this.type=0}getFieldMask(){return null}}class Bt extends fr{constructor(e,s,n,o,r=[]){super(),this.key=e,this.data=s,this.fieldMask=n,this.precondition=o,this.fieldTransforms=r,this.type=1}getFieldMask(){return this.fieldMask}}function om(t){const e=new Map;return t.fieldMask.fields.forEach((s=>{if(!s.isEmpty()){const n=t.data.field(s);e.set(s,n)}})),e}function Zc(t,e,s){const n=new Map;me(t.length===s.length,32656,{Re:s.length,Ve:t.length});for(let o=0;o<s.length;o++){const r=t[o],a=r.transform,l=e.data.field(r.field);n.set(r.field,P0(a,l,s[o]))}return n}function ed(t,e,s){const n=new Map;for(const o of t){const r=o.transform,a=s.data.field(o.field);n.set(o.field,A0(r,a,e))}return n}class rm extends fr{constructor(e,s){super(),this.key=e,this.precondition=s,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class N0 extends fr{constructor(e,s){super(),this.key=e,this.precondition=s,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}class B0{constructor(e,s,n,o){this.batchId=e,this.localWriteTime=s,this.baseMutations=n,this.mutations=o}applyToRemoteDocument(e,s){const n=s.mutationResults;for(let o=0;o<this.mutations.length;o++){const r=this.mutations[o];r.key.isEqual(e.key)&&R0(r,e,n[o])}}applyToLocalView(e,s){for(const n of this.baseMutations)n.key.isEqual(e.key)&&(s=In(n,e,s,this.localWriteTime));for(const n of this.mutations)n.key.isEqual(e.key)&&(s=In(n,e,s,this.localWriteTime));return s}applyToLocalDocumentSet(e,s){const n=Xu();return this.mutations.forEach((o=>{const r=e.get(o.key),a=r.overlayedDocument;let l=this.applyToLocalView(a,r.mutatedFields);l=s.has(o.key)?null:l;const c=nm(a,l);c!==null&&n.set(o.key,c),a.isValidDocument()||a.convertToNoDocument(ce.min())})),n}keys(){return this.mutations.reduce(((e,s)=>e.add(s.key)),Ce())}isEqual(e){return this.batchId===e.batchId&&Ms(this.mutations,e.mutations,((s,n)=>Yc(s,n)))&&Ms(this.baseMutations,e.baseMutations,((s,n)=>Yc(s,n)))}}class Ri{constructor(e,s,n,o){this.batch=e,this.commitVersion=s,this.mutationResults=n,this.docVersions=o}static from(e,s,n){me(e.mutations.length===n.length,58842,{me:e.mutations.length,fe:n.length});let o=(function(){return S0})();const r=e.mutations;for(let a=0;a<r.length;a++)o=o.insert(r[a].key,n[a].version);return new Ri(e,s,n,o)}}class V0{constructor(e,s){this.largestBatchId=e,this.mutation=s}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}var he,Z;function F0(t){switch(t){case M.OK:return Y(64938);case M.CANCELLED:case M.UNKNOWN:case M.DEADLINE_EXCEEDED:case M.RESOURCE_EXHAUSTED:case M.INTERNAL:case M.UNAVAILABLE:case M.UNAUTHENTICATED:return!1;case M.INVALID_ARGUMENT:case M.NOT_FOUND:case M.ALREADY_EXISTS:case M.PERMISSION_DENIED:case M.FAILED_PRECONDITION:case M.ABORTED:case M.OUT_OF_RANGE:case M.UNIMPLEMENTED:case M.DATA_LOSS:return!0;default:return Y(15467,{code:t})}}function O0(t){if(t===void 0)return is("GRPC error has no .code"),M.UNKNOWN;switch(t){case he.OK:return M.OK;case he.CANCELLED:return M.CANCELLED;case he.UNKNOWN:return M.UNKNOWN;case he.DEADLINE_EXCEEDED:return M.DEADLINE_EXCEEDED;case he.RESOURCE_EXHAUSTED:return M.RESOURCE_EXHAUSTED;case he.INTERNAL:return M.INTERNAL;case he.UNAVAILABLE:return M.UNAVAILABLE;case he.UNAUTHENTICATED:return M.UNAUTHENTICATED;case he.INVALID_ARGUMENT:return M.INVALID_ARGUMENT;case he.NOT_FOUND:return M.NOT_FOUND;case he.ALREADY_EXISTS:return M.ALREADY_EXISTS;case he.PERMISSION_DENIED:return M.PERMISSION_DENIED;case he.FAILED_PRECONDITION:return M.FAILED_PRECONDITION;case he.ABORTED:return M.ABORTED;case he.OUT_OF_RANGE:return M.OUT_OF_RANGE;case he.UNIMPLEMENTED:return M.UNIMPLEMENTED;case he.DATA_LOSS:return M.DATA_LOSS;default:return Y(39323,{code:t})}}(Z=he||(he={}))[Z.OK=0]="OK",Z[Z.CANCELLED=1]="CANCELLED",Z[Z.UNKNOWN=2]="UNKNOWN",Z[Z.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",Z[Z.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",Z[Z.NOT_FOUND=5]="NOT_FOUND",Z[Z.ALREADY_EXISTS=6]="ALREADY_EXISTS",Z[Z.PERMISSION_DENIED=7]="PERMISSION_DENIED",Z[Z.UNAUTHENTICATED=16]="UNAUTHENTICATED",Z[Z.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",Z[Z.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",Z[Z.ABORTED=10]="ABORTED",Z[Z.OUT_OF_RANGE=11]="OUT_OF_RANGE",Z[Z.UNIMPLEMENTED=12]="UNIMPLEMENTED",Z[Z.INTERNAL=13]="INTERNAL",Z[Z.UNAVAILABLE=14]="UNAVAILABLE",Z[Z.DATA_LOSS=15]="DATA_LOSS";new vi([4294967295,4294967295],0);class q0{constructor(e,s){this.databaseId=e,this.useProto3Json=s}}function Wa(t,e){return t.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function j0(t,e){return t.useProto3Json?e.toBase64():e.toUint8Array()}function H0(t,e){return Wa(t,e.toTimestamp())}function _s(t){return me(!!t,49232),ce.fromTimestamp((function(s){const n=ls(s);return new de(n.seconds,n.nanos)})(t))}function am(t,e){return Ga(t,e).canonicalString()}function Ga(t,e){const s=(function(o){return new pe(["projects",o.projectId,"databases",o.database])})(t).child("documents");return e===void 0?s:s.child(e)}function U0(t){const e=pe.fromString(t);return me(Y0(e),10190,{key:e.toString()}),e}function Ka(t,e){return am(t.databaseId,e.path)}function z0(t){const e=U0(t);return e.length===4?pe.emptyPath():G0(e)}function W0(t){return new pe(["projects",t.databaseId.projectId,"databases",t.databaseId.database]).canonicalString()}function G0(t){return me(t.length>4&&t.get(4)==="documents",29091,{key:t.toString()}),t.popFirst(5)}function td(t,e,s){return{name:Ka(t,e),fields:s.value.mapValue.fields}}function K0(t,e){let s;if(e instanceof zn)s={update:td(t,e.key,e.value)};else if(e instanceof rm)s={delete:Ka(t,e.key)};else if(e instanceof Bt)s={update:td(t,e.key,e.data),updateMask:X0(e.fieldMask)};else{if(!(e instanceof N0))return Y(16599,{Vt:e.type});s={verify:Ka(t,e.key)}}return e.fieldTransforms.length>0&&(s.updateTransforms=e.fieldTransforms.map((n=>(function(r,a){const l=a.transform;if(l instanceof Jo)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(l instanceof Fs)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:l.elements}};if(l instanceof Nn)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:l.elements}};if(l instanceof Qo)return{fieldPath:a.field.canonicalString(),increment:l.Ae};throw Y(20930,{transform:a.transform})})(0,n)))),e.precondition.isNone||(s.currentDocument=(function(o,r){return r.updateTime!==void 0?{updateTime:H0(o,r.updateTime)}:r.exists!==void 0?{exists:r.exists}:Y(27497)})(t,e.precondition)),s}function J0(t,e){return t&&t.length>0?(me(e!==void 0,14353),t.map((s=>(function(o,r){let a=o.updateTime?_s(o.updateTime):_s(r);return a.isEqual(ce.min())&&(a=_s(r)),new L0(a,o.transformResults||[])})(s,e)))):[]}function Q0(t){let e=z0(t.parent);const s=t.structuredQuery,n=s.from?s.from.length:0;let o=null;if(n>0){me(n===1,65062);const p=s.from[0];p.allDescendants?o=p.collectionId:e=e.child(p.collectionId)}let r=[];s.where&&(r=(function(h){const f=im(h);return f instanceof Lt&&Hu(f)?f.getFilters():[f]})(s.where));let a=[];s.orderBy&&(a=(function(h){return h.map((f=>(function(S){return new Go(Is(S.field),(function(D){switch(D){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(S.direction))})(f)))})(s.orderBy));let l=null;s.limit&&(l=(function(h){let f;return f=typeof h=="object"?h.value:h,ki(f)?null:f})(s.limit));let c=null;s.startAt&&(c=(function(h){const f=!!h.before,x=h.values||[];return new Wo(x,f)})(s.startAt));let d=null;return s.endAt&&(d=(function(h){const f=!h.before,x=h.values||[];return new Wo(x,f)})(s.endAt)),b0(e,o,a,r,l,"F",c,d)}function im(t){return t.unaryFilter!==void 0?(function(s){switch(s.unaryFilter.op){case"IS_NAN":const n=Is(s.unaryFilter.field);return ye.create(n,"==",{doubleValue:NaN});case"IS_NULL":const o=Is(s.unaryFilter.field);return ye.create(o,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const r=Is(s.unaryFilter.field);return ye.create(r,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=Is(s.unaryFilter.field);return ye.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return Y(61313);default:return Y(60726)}})(t):t.fieldFilter!==void 0?(function(s){return ye.create(Is(s.fieldFilter.field),(function(o){switch(o){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return Y(58110);default:return Y(50506)}})(s.fieldFilter.op),s.fieldFilter.value)})(t):t.compositeFilter!==void 0?(function(s){return Lt.create(s.compositeFilter.filters.map((n=>im(n))),(function(o){switch(o){case"AND":return"and";case"OR":return"or";default:return Y(1026)}})(s.compositeFilter.op))})(t):Y(30097,{filter:t})}function Is(t){return Ee.fromServerFormat(t.fieldPath)}function X0(t){const e=[];return t.fields.forEach((s=>e.push(s.canonicalString()))),{fieldPaths:e}}function Y0(t){return t.length>=4&&t.get(0)==="projects"&&t.get(2)==="databases"}class Z0{constructor(e){this.yt=e}}function eb(t){const e=Q0({parent:t.parent,structuredQuery:t.structuredQuery});return t.limitType==="LAST"?za(e,e.limit,"L"):e}class tb{constructor(){this.Cn=new sb}addToCollectionParentIndex(e,s){return this.Cn.add(s),L.resolve()}getCollectionParents(e,s){return L.resolve(this.Cn.getEntries(s))}addFieldIndex(e,s){return L.resolve()}deleteFieldIndex(e,s){return L.resolve()}deleteAllFieldIndexes(e){return L.resolve()}createTargetIndexes(e,s){return L.resolve()}getDocumentsMatchingTarget(e,s){return L.resolve(null)}getIndexType(e,s){return L.resolve(0)}getFieldIndexes(e,s){return L.resolve([])}getNextCollectionGroupToUpdate(e){return L.resolve(null)}getMinOffset(e,s){return L.resolve(Dt.min())}getMinOffsetFromCollectionGroup(e,s){return L.resolve(Dt.min())}updateCollectionGroup(e,s,n){return L.resolve()}updateIndexEntries(e,s){return L.resolve()}}class sb{constructor(){this.index={}}add(e){const s=e.lastSegment(),n=e.popLast(),o=this.index[s]||new Se(pe.comparator),r=!o.has(n);return this.index[s]=o.add(n),r}has(e){const s=e.lastSegment(),n=e.popLast(),o=this.index[s];return o&&o.has(n)}getEntries(e){return(this.index[e]||new Se(pe.comparator)).toArray()}}const sd={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},lm=41943040;class Ve{static withCacheSize(e){return new Ve(e,Ve.DEFAULT_COLLECTION_PERCENTILE,Ve.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,s,n){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=s,this.maximumSequenceNumbersToCollect=n}}Ve.DEFAULT_COLLECTION_PERCENTILE=10,Ve.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Ve.DEFAULT=new Ve(lm,Ve.DEFAULT_COLLECTION_PERCENTILE,Ve.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Ve.DISABLED=new Ve(-1,0,0);class Os{constructor(e){this.ar=e}next(){return this.ar+=2,this.ar}static ur(){return new Os(0)}static cr(){return new Os(-1)}}const nd="LruGarbageCollector",nb=1048576;function od([t,e],[s,n]){const o=se(t,s);return o===0?se(e,n):o}class ob{constructor(e){this.Ir=e,this.buffer=new Se(od),this.Er=0}dr(){return++this.Er}Ar(e){const s=[e,this.dr()];if(this.buffer.size<this.Ir)this.buffer=this.buffer.add(s);else{const n=this.buffer.last();od(s,n)<0&&(this.buffer=this.buffer.delete(n).add(s))}}get maxValue(){return this.buffer.last()[0]}}class rb{constructor(e,s,n){this.garbageCollector=e,this.asyncQueue=s,this.localStore=n,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Vr(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Vr(e){U(nd,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,(async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(s){Un(s)?U(nd,"Ignoring IndexedDB error during garbage collection: ",s):await Ii(s)}await this.Vr(3e5)}))}}class ab{constructor(e,s){this.mr=e,this.params=s}calculateTargetCount(e,s){return this.mr.gr(e).next((n=>Math.floor(s/100*n)))}nthSequenceNumber(e,s){if(s===0)return L.resolve(Si.ce);const n=new ob(s);return this.mr.forEachTarget(e,(o=>n.Ar(o.sequenceNumber))).next((()=>this.mr.pr(e,(o=>n.Ar(o))))).next((()=>n.maxValue))}removeTargets(e,s,n){return this.mr.removeTargets(e,s,n)}removeOrphanedDocuments(e,s){return this.mr.removeOrphanedDocuments(e,s)}collect(e,s){return this.params.cacheSizeCollectionThreshold===-1?(U("LruGarbageCollector","Garbage collection skipped; disabled"),L.resolve(sd)):this.getCacheSize(e).next((n=>n<this.params.cacheSizeCollectionThreshold?(U("LruGarbageCollector",`Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),sd):this.yr(e,s)))}getCacheSize(e){return this.mr.getCacheSize(e)}yr(e,s){let n,o,r,a,l,c,d;const p=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next((h=>(h>this.params.maximumSequenceNumbersToCollect?(U("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${h}`),o=this.params.maximumSequenceNumbersToCollect):o=h,a=Date.now(),this.nthSequenceNumber(e,o)))).next((h=>(n=h,l=Date.now(),this.removeTargets(e,n,s)))).next((h=>(r=h,c=Date.now(),this.removeOrphanedDocuments(e,n)))).next((h=>(d=Date.now(),Es()<=ee.DEBUG&&U("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-p}ms
	Determined least recently used ${o} in `+(l-a)+`ms
	Removed ${r} targets in `+(c-l)+`ms
	Removed ${h} documents in `+(d-c)+`ms
Total Duration: ${d-p}ms`),L.resolve({didRun:!0,sequenceNumbersCollected:o,targetsRemoved:r,documentsRemoved:h}))))}}function ib(t,e){return new ab(t,e)}class lb{constructor(){this.changes=new fs((e=>e.toString()),((e,s)=>e.isEqual(s))),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,s){this.assertNotApplied(),this.changes.set(e,Ge.newInvalidDocument(e).setReadTime(s))}getEntry(e,s){this.assertNotApplied();const n=this.changes.get(s);return n!==void 0?L.resolve(n):this.getFromCache(e,s)}getEntries(e,s){return this.getAllFromCache(e,s)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}class cb{constructor(e,s){this.overlayedDocument=e,this.mutatedFields=s}}class db{constructor(e,s,n,o){this.remoteDocumentCache=e,this.mutationQueue=s,this.documentOverlayCache=n,this.indexManager=o}getDocument(e,s){let n=null;return this.documentOverlayCache.getOverlay(e,s).next((o=>(n=o,this.remoteDocumentCache.getEntry(e,s)))).next((o=>(n!==null&&In(n.mutation,o,Ue.empty(),de.now()),o)))}getDocuments(e,s){return this.remoteDocumentCache.getEntries(e,s).next((n=>this.getLocalViewOfDocuments(e,n,Ce()).next((()=>n))))}getLocalViewOfDocuments(e,s,n=Ce()){const o=Jt();return this.populateOverlays(e,o,s).next((()=>this.computeViews(e,s,o,n).next((r=>{let a=bo();return r.forEach(((l,c)=>{a=a.insert(l,c.overlayedDocument)})),a}))))}getOverlayedDocuments(e,s){const n=Jt();return this.populateOverlays(e,n,s).next((()=>this.computeViews(e,s,n,Ce())))}populateOverlays(e,s,n){const o=[];return n.forEach((r=>{s.has(r)||o.push(r)})),this.documentOverlayCache.getOverlays(e,o).next((r=>{r.forEach(((a,l)=>{s.set(a,l)}))}))}computeViews(e,s,n,o){let r=Ko();const a=En(),l=(function(){return En()})();return s.forEach(((c,d)=>{const p=n.get(d.key);o.has(d.key)&&(p===void 0||p.mutation instanceof Bt)?r=r.insert(d.key,d):p!==void 0?(a.set(d.key,p.mutation.getFieldMask()),In(p.mutation,d,p.mutation.getFieldMask(),de.now())):a.set(d.key,Ue.empty())})),this.recalculateAndSaveOverlays(e,r).next((c=>(c.forEach(((d,p)=>a.set(d,p))),s.forEach(((d,p)=>l.set(d,new cb(p,a.get(d)??null)))),l)))}recalculateAndSaveOverlays(e,s){const n=En();let o=new qe(((a,l)=>a-l)),r=Ce();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,s).next((a=>{for(const l of a)l.keys().forEach((c=>{const d=s.get(c);if(d===null)return;let p=n.get(c)||Ue.empty();p=l.applyToLocalView(d,p),n.set(c,p);const h=(o.get(l.batchId)||Ce()).add(c);o=o.insert(l.batchId,h)}))})).next((()=>{const a=[],l=o.getReverseIterator();for(;l.hasNext();){const c=l.getNext(),d=c.key,p=c.value,h=Xu();p.forEach((f=>{if(!r.has(f)){const x=nm(s.get(f),n.get(f));x!==null&&h.set(f,x),r=r.add(f)}})),a.push(this.documentOverlayCache.saveOverlays(e,d,h))}return L.waitFor(a)})).next((()=>n))}recalculateAndSaveOverlaysForDocumentKeys(e,s){return this.remoteDocumentCache.getEntries(e,s).next((n=>this.recalculateAndSaveOverlays(e,n)))}getDocumentsMatchingQuery(e,s,n,o){return(function(a){return X.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0})(s)?this.getDocumentsMatchingDocumentQuery(e,s.path):y0(s)?this.getDocumentsMatchingCollectionGroupQuery(e,s,n,o):this.getDocumentsMatchingCollectionQuery(e,s,n,o)}getNextDocuments(e,s,n,o){return this.remoteDocumentCache.getAllFromCollectionGroup(e,s,n,o).next((r=>{const a=o-r.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,s,n.largestBatchId,o-r.size):L.resolve(Jt());let l=Rn,c=r;return a.next((d=>L.forEach(d,((p,h)=>(l<h.largestBatchId&&(l=h.largestBatchId),r.get(p)?L.resolve():this.remoteDocumentCache.getEntry(e,p).next((f=>{c=c.insert(p,f)}))))).next((()=>this.populateOverlays(e,d,r))).next((()=>this.computeViews(e,c,d,Ce()))).next((p=>({batchId:l,changes:Qu(p)})))))}))}getDocumentsMatchingDocumentQuery(e,s){return this.getDocument(e,new X(s)).next((n=>{let o=bo();return n.isFoundDocument()&&(o=o.insert(n.key,n)),o}))}getDocumentsMatchingCollectionGroupQuery(e,s,n,o){const r=s.collectionGroup;let a=bo();return this.indexManager.getCollectionParents(e,r).next((l=>L.forEach(l,(c=>{const d=(function(h,f){return new hr(f,null,h.explicitOrderBy.slice(),h.filters.slice(),h.limit,h.limitType,h.startAt,h.endAt)})(s,c.child(r));return this.getDocumentsMatchingCollectionQuery(e,d,n,o).next((p=>{p.forEach(((h,f)=>{a=a.insert(h,f)}))}))})).next((()=>a))))}getDocumentsMatchingCollectionQuery(e,s,n,o){let r;return this.documentOverlayCache.getOverlaysForCollection(e,s.path,n.largestBatchId).next((a=>(r=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,s,n,r,o)))).next((a=>{r.forEach(((c,d)=>{const p=d.getKey();a.get(p)===null&&(a=a.insert(p,Ge.newInvalidDocument(p)))}));let l=bo();return a.forEach(((c,d)=>{const p=r.get(c);p!==void 0&&In(p.mutation,d,Ue.empty(),de.now()),Di(s,d)&&(l=l.insert(c,d))})),l}))}}class ub{constructor(e){this.serializer=e,this.Lr=new Map,this.kr=new Map}getBundleMetadata(e,s){return L.resolve(this.Lr.get(s))}saveBundleMetadata(e,s){return this.Lr.set(s.id,(function(o){return{id:o.id,version:o.version,createTime:_s(o.createTime)}})(s)),L.resolve()}getNamedQuery(e,s){return L.resolve(this.kr.get(s))}saveNamedQuery(e,s){return this.kr.set(s.name,(function(o){return{name:o.name,query:eb(o.bundledQuery),readTime:_s(o.readTime)}})(s)),L.resolve()}}class mb{constructor(){this.overlays=new qe(X.comparator),this.qr=new Map}getOverlay(e,s){return L.resolve(this.overlays.get(s))}getOverlays(e,s){const n=Jt();return L.forEach(s,(o=>this.getOverlay(e,o).next((r=>{r!==null&&n.set(o,r)})))).next((()=>n))}saveOverlays(e,s,n){return n.forEach(((o,r)=>{this.St(e,s,r)})),L.resolve()}removeOverlaysForBatchId(e,s,n){const o=this.qr.get(n);return o!==void 0&&(o.forEach((r=>this.overlays=this.overlays.remove(r))),this.qr.delete(n)),L.resolve()}getOverlaysForCollection(e,s,n){const o=Jt(),r=s.length+1,a=new X(s.child("")),l=this.overlays.getIteratorFrom(a);for(;l.hasNext();){const c=l.getNext().value,d=c.getKey();if(!s.isPrefixOf(d.path))break;d.path.length===r&&c.largestBatchId>n&&o.set(c.getKey(),c)}return L.resolve(o)}getOverlaysForCollectionGroup(e,s,n,o){let r=new qe(((d,p)=>d-p));const a=this.overlays.getIterator();for(;a.hasNext();){const d=a.getNext().value;if(d.getKey().getCollectionGroup()===s&&d.largestBatchId>n){let p=r.get(d.largestBatchId);p===null&&(p=Jt(),r=r.insert(d.largestBatchId,p)),p.set(d.getKey(),d)}}const l=Jt(),c=r.getIterator();for(;c.hasNext()&&(c.getNext().value.forEach(((d,p)=>l.set(d,p))),!(l.size()>=o)););return L.resolve(l)}St(e,s,n){const o=this.overlays.get(n.key);if(o!==null){const a=this.qr.get(o.largestBatchId).delete(n.key);this.qr.set(o.largestBatchId,a)}this.overlays=this.overlays.insert(n.key,new V0(s,n));let r=this.qr.get(s);r===void 0&&(r=Ce(),this.qr.set(s,r)),this.qr.set(s,r.add(n.key))}}class pb{constructor(){this.sessionToken=ot.EMPTY_BYTE_STRING}getSessionToken(e){return L.resolve(this.sessionToken)}setSessionToken(e,s){return this.sessionToken=s,L.resolve()}}class Mi{constructor(){this.Qr=new Se(ve.$r),this.Ur=new Se(ve.Kr)}isEmpty(){return this.Qr.isEmpty()}addReference(e,s){const n=new ve(e,s);this.Qr=this.Qr.add(n),this.Ur=this.Ur.add(n)}Wr(e,s){e.forEach((n=>this.addReference(n,s)))}removeReference(e,s){this.Gr(new ve(e,s))}zr(e,s){e.forEach((n=>this.removeReference(n,s)))}jr(e){const s=new X(new pe([])),n=new ve(s,e),o=new ve(s,e+1),r=[];return this.Ur.forEachInRange([n,o],(a=>{this.Gr(a),r.push(a.key)})),r}Jr(){this.Qr.forEach((e=>this.Gr(e)))}Gr(e){this.Qr=this.Qr.delete(e),this.Ur=this.Ur.delete(e)}Hr(e){const s=new X(new pe([])),n=new ve(s,e),o=new ve(s,e+1);let r=Ce();return this.Ur.forEachInRange([n,o],(a=>{r=r.add(a.key)})),r}containsKey(e){const s=new ve(e,0),n=this.Qr.firstAfterOrEqual(s);return n!==null&&e.isEqual(n.key)}}class ve{constructor(e,s){this.key=e,this.Yr=s}static $r(e,s){return X.comparator(e.key,s.key)||se(e.Yr,s.Yr)}static Kr(e,s){return se(e.Yr,s.Yr)||X.comparator(e.key,s.key)}}class hb{constructor(e,s){this.indexManager=e,this.referenceDelegate=s,this.mutationQueue=[],this.tr=1,this.Zr=new Se(ve.$r)}checkEmpty(e){return L.resolve(this.mutationQueue.length===0)}addMutationBatch(e,s,n,o){const r=this.tr;this.tr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new B0(r,s,n,o);this.mutationQueue.push(a);for(const l of o)this.Zr=this.Zr.add(new ve(l.key,r)),this.indexManager.addToCollectionParentIndex(e,l.key.path.popLast());return L.resolve(a)}lookupMutationBatch(e,s){return L.resolve(this.Xr(s))}getNextMutationBatchAfterBatchId(e,s){const n=s+1,o=this.ei(n),r=o<0?0:o;return L.resolve(this.mutationQueue.length>r?this.mutationQueue[r]:null)}getHighestUnacknowledgedBatchId(){return L.resolve(this.mutationQueue.length===0?Ti:this.tr-1)}getAllMutationBatches(e){return L.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,s){const n=new ve(s,0),o=new ve(s,Number.POSITIVE_INFINITY),r=[];return this.Zr.forEachInRange([n,o],(a=>{const l=this.Xr(a.Yr);r.push(l)})),L.resolve(r)}getAllMutationBatchesAffectingDocumentKeys(e,s){let n=new Se(se);return s.forEach((o=>{const r=new ve(o,0),a=new ve(o,Number.POSITIVE_INFINITY);this.Zr.forEachInRange([r,a],(l=>{n=n.add(l.Yr)}))})),L.resolve(this.ti(n))}getAllMutationBatchesAffectingQuery(e,s){const n=s.path,o=n.length+1;let r=n;X.isDocumentKey(r)||(r=r.child(""));const a=new ve(new X(r),0);let l=new Se(se);return this.Zr.forEachWhile((c=>{const d=c.key.path;return!!n.isPrefixOf(d)&&(d.length===o&&(l=l.add(c.Yr)),!0)}),a),L.resolve(this.ti(l))}ti(e){const s=[];return e.forEach((n=>{const o=this.Xr(n);o!==null&&s.push(o)})),s}removeMutationBatch(e,s){me(this.ni(s.batchId,"removed")===0,55003),this.mutationQueue.shift();let n=this.Zr;return L.forEach(s.mutations,(o=>{const r=new ve(o.key,s.batchId);return n=n.delete(r),this.referenceDelegate.markPotentiallyOrphaned(e,o.key)})).next((()=>{this.Zr=n}))}ir(e){}containsKey(e,s){const n=new ve(s,0),o=this.Zr.firstAfterOrEqual(n);return L.resolve(s.isEqual(o&&o.key))}performConsistencyCheck(e){return this.mutationQueue.length,L.resolve()}ni(e,s){return this.ei(e)}ei(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Xr(e){const s=this.ei(e);return s<0||s>=this.mutationQueue.length?null:this.mutationQueue[s]}}class gb{constructor(e){this.ri=e,this.docs=(function(){return new qe(X.comparator)})(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,s){const n=s.key,o=this.docs.get(n),r=o?o.size:0,a=this.ri(s);return this.docs=this.docs.insert(n,{document:s.mutableCopy(),size:a}),this.size+=a-r,this.indexManager.addToCollectionParentIndex(e,n.path.popLast())}removeEntry(e){const s=this.docs.get(e);s&&(this.docs=this.docs.remove(e),this.size-=s.size)}getEntry(e,s){const n=this.docs.get(s);return L.resolve(n?n.document.mutableCopy():Ge.newInvalidDocument(s))}getEntries(e,s){let n=Ko();return s.forEach((o=>{const r=this.docs.get(o);n=n.insert(o,r?r.document.mutableCopy():Ge.newInvalidDocument(o))})),L.resolve(n)}getDocumentsMatchingQuery(e,s,n,o){let r=Ko();const a=s.path,l=new X(a.child("__id-9223372036854775808__")),c=this.docs.getIteratorFrom(l);for(;c.hasNext();){const{key:d,value:{document:p}}=c.getNext();if(!a.isPrefixOf(d.path))break;d.path.length>a.length+1||Kf(Gf(p),n)<=0||(o.has(p.key)||Di(s,p))&&(r=r.insert(p.key,p.mutableCopy()))}return L.resolve(r)}getAllFromCollectionGroup(e,s,n,o){Y(9500)}ii(e,s){return L.forEach(this.docs,(n=>s(n)))}newChangeBuffer(e){return new fb(this)}getSize(e){return L.resolve(this.size)}}class fb extends lb{constructor(e){super(),this.Nr=e}applyChanges(e){const s=[];return this.changes.forEach(((n,o)=>{o.isValidDocument()?s.push(this.Nr.addEntry(e,o)):this.Nr.removeEntry(n)})),L.waitFor(s)}getFromCache(e,s){return this.Nr.getEntry(e,s)}getAllFromCache(e,s){return this.Nr.getEntries(e,s)}}class bb{constructor(e){this.persistence=e,this.si=new fs((s=>Pi(s)),$i),this.lastRemoteSnapshotVersion=ce.min(),this.highestTargetId=0,this.oi=0,this._i=new Mi,this.targetCount=0,this.ai=Os.ur()}forEachTarget(e,s){return this.si.forEach(((n,o)=>s(o))),L.resolve()}getLastRemoteSnapshotVersion(e){return L.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return L.resolve(this.oi)}allocateTargetId(e){return this.highestTargetId=this.ai.next(),L.resolve(this.highestTargetId)}setTargetsMetadata(e,s,n){return n&&(this.lastRemoteSnapshotVersion=n),s>this.oi&&(this.oi=s),L.resolve()}Pr(e){this.si.set(e.target,e);const s=e.targetId;s>this.highestTargetId&&(this.ai=new Os(s),this.highestTargetId=s),e.sequenceNumber>this.oi&&(this.oi=e.sequenceNumber)}addTargetData(e,s){return this.Pr(s),this.targetCount+=1,L.resolve()}updateTargetData(e,s){return this.Pr(s),L.resolve()}removeTargetData(e,s){return this.si.delete(s.target),this._i.jr(s.targetId),this.targetCount-=1,L.resolve()}removeTargets(e,s,n){let o=0;const r=[];return this.si.forEach(((a,l)=>{l.sequenceNumber<=s&&n.get(l.targetId)===null&&(this.si.delete(a),r.push(this.removeMatchingKeysForTargetId(e,l.targetId)),o++)})),L.waitFor(r).next((()=>o))}getTargetCount(e){return L.resolve(this.targetCount)}getTargetData(e,s){const n=this.si.get(s)||null;return L.resolve(n)}addMatchingKeys(e,s,n){return this._i.Wr(s,n),L.resolve()}removeMatchingKeys(e,s,n){this._i.zr(s,n);const o=this.persistence.referenceDelegate,r=[];return o&&s.forEach((a=>{r.push(o.markPotentiallyOrphaned(e,a))})),L.waitFor(r)}removeMatchingKeysForTargetId(e,s){return this._i.jr(s),L.resolve()}getMatchingKeysForTargetId(e,s){const n=this._i.Hr(s);return L.resolve(n)}containsKey(e,s){return L.resolve(this._i.containsKey(s))}}class cm{constructor(e,s){this.ui={},this.overlays={},this.ci=new Si(0),this.li=!1,this.li=!0,this.hi=new pb,this.referenceDelegate=e(this),this.Pi=new bb(this),this.indexManager=new tb,this.remoteDocumentCache=(function(o){return new gb(o)})((n=>this.referenceDelegate.Ti(n))),this.serializer=new Z0(s),this.Ii=new ub(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.li=!1,Promise.resolve()}get started(){return this.li}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let s=this.overlays[e.toKey()];return s||(s=new mb,this.overlays[e.toKey()]=s),s}getMutationQueue(e,s){let n=this.ui[e.toKey()];return n||(n=new hb(s,this.referenceDelegate),this.ui[e.toKey()]=n),n}getGlobalsCache(){return this.hi}getTargetCache(){return this.Pi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ii}runTransaction(e,s,n){U("MemoryPersistence","Starting transaction:",e);const o=new vb(this.ci.next());return this.referenceDelegate.Ei(),n(o).next((r=>this.referenceDelegate.di(o).next((()=>r)))).toPromise().then((r=>(o.raiseOnCommittedEvent(),r)))}Ai(e,s){return L.or(Object.values(this.ui).map((n=>()=>n.containsKey(e,s))))}}class vb extends Qf{constructor(e){super(),this.currentSequenceNumber=e}}class Ni{constructor(e){this.persistence=e,this.Ri=new Mi,this.Vi=null}static mi(e){return new Ni(e)}get fi(){if(this.Vi)return this.Vi;throw Y(60996)}addReference(e,s,n){return this.Ri.addReference(n,s),this.fi.delete(n.toString()),L.resolve()}removeReference(e,s,n){return this.Ri.removeReference(n,s),this.fi.add(n.toString()),L.resolve()}markPotentiallyOrphaned(e,s){return this.fi.add(s.toString()),L.resolve()}removeTarget(e,s){this.Ri.jr(s.targetId).forEach((o=>this.fi.add(o.toString())));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(e,s.targetId).next((o=>{o.forEach((r=>this.fi.add(r.toString())))})).next((()=>n.removeTargetData(e,s)))}Ei(){this.Vi=new Set}di(e){const s=this.persistence.getRemoteDocumentCache().newChangeBuffer();return L.forEach(this.fi,(n=>{const o=X.fromPath(n);return this.gi(e,o).next((r=>{r||s.removeEntry(o,ce.min())}))})).next((()=>(this.Vi=null,s.apply(e))))}updateLimboDocument(e,s){return this.gi(e,s).next((n=>{n?this.fi.delete(s.toString()):this.fi.add(s.toString())}))}Ti(e){return 0}gi(e,s){return L.or([()=>L.resolve(this.Ri.containsKey(s)),()=>this.persistence.getTargetCache().containsKey(e,s),()=>this.persistence.Ai(e,s)])}}class Xo{constructor(e,s){this.persistence=e,this.pi=new fs((n=>Zf(n.path)),((n,o)=>n.isEqual(o))),this.garbageCollector=ib(this,s)}static mi(e,s){return new Xo(e,s)}Ei(){}di(e){return L.resolve()}forEachTarget(e,s){return this.persistence.getTargetCache().forEachTarget(e,s)}gr(e){const s=this.wr(e);return this.persistence.getTargetCache().getTargetCount(e).next((n=>s.next((o=>n+o))))}wr(e){let s=0;return this.pr(e,(n=>{s++})).next((()=>s))}pr(e,s){return L.forEach(this.pi,((n,o)=>this.br(e,n,o).next((r=>r?L.resolve():s(o)))))}removeTargets(e,s,n){return this.persistence.getTargetCache().removeTargets(e,s,n)}removeOrphanedDocuments(e,s){let n=0;const o=this.persistence.getRemoteDocumentCache(),r=o.newChangeBuffer();return o.ii(e,(a=>this.br(e,a,s).next((l=>{l||(n++,r.removeEntry(a,ce.min()))})))).next((()=>r.apply(e))).next((()=>n))}markPotentiallyOrphaned(e,s){return this.pi.set(s,e.currentSequenceNumber),L.resolve()}removeTarget(e,s){const n=s.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,n)}addReference(e,s,n){return this.pi.set(n,e.currentSequenceNumber),L.resolve()}removeReference(e,s,n){return this.pi.set(n,e.currentSequenceNumber),L.resolve()}updateLimboDocument(e,s){return this.pi.set(s,e.currentSequenceNumber),L.resolve()}Ti(e){let s=e.key.toString().length;return e.isFoundDocument()&&(s+=Ro(e.data.value)),s}br(e,s,n){return L.or([()=>this.persistence.Ai(e,s),()=>this.persistence.getTargetCache().containsKey(e,s),()=>{const o=this.pi.get(s);return L.resolve(o!==void 0&&o>n)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}class Bi{constructor(e,s,n,o){this.targetId=e,this.fromCache=s,this.Es=n,this.ds=o}static As(e,s){let n=Ce(),o=Ce();for(const r of s.docChanges)switch(r.type){case 0:n=n.add(r.doc.key);break;case 1:o=o.add(r.doc.key)}return new Bi(e,s.fromCache,n,o)}}class yb{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}class xb{constructor(){this.Rs=!1,this.Vs=!1,this.fs=100,this.gs=(function(){return Eg()?8:Xf(xg())>0?6:4})()}initialize(e,s){this.ps=e,this.indexManager=s,this.Rs=!0}getDocumentsMatchingQuery(e,s,n,o){const r={result:null};return this.ys(e,s).next((a=>{r.result=a})).next((()=>{if(!r.result)return this.ws(e,s,o,n).next((a=>{r.result=a}))})).next((()=>{if(r.result)return;const a=new yb;return this.Ss(e,s,a).next((l=>{if(r.result=l,this.Vs)return this.bs(e,s,a,l.size)}))})).next((()=>r.result))}bs(e,s,n,o){return n.documentReadCount<this.fs?(Es()<=ee.DEBUG&&U("QueryEngine","SDK will not create cache indexes for query:",mn(s),"since it only creates cache indexes for collection contains","more than or equal to",this.fs,"documents"),L.resolve()):(Es()<=ee.DEBUG&&U("QueryEngine","Query:",mn(s),"scans",n.documentReadCount,"local documents and returns",o,"documents as results."),n.documentReadCount>this.gs*o?(Es()<=ee.DEBUG&&U("QueryEngine","The SDK decides to create cache indexes for query:",mn(s),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,es(s))):L.resolve())}ys(e,s){if(Qc(s))return L.resolve(null);let n=es(s);return this.indexManager.getIndexType(e,n).next((o=>o===0?null:(s.limit!==null&&o===1&&(s=za(s,null,"F"),n=es(s)),this.indexManager.getDocumentsMatchingTarget(e,n).next((r=>{const a=Ce(...r);return this.ps.getDocuments(e,a).next((l=>this.indexManager.getMinOffset(e,n).next((c=>{const d=this.Ds(s,l);return this.Cs(s,d,a,c.readTime)?this.ys(e,za(s,null,"F")):this.vs(e,d,s,c)}))))})))))}ws(e,s,n,o){return Qc(s)||o.isEqual(ce.min())?L.resolve(null):this.ps.getDocuments(e,n).next((r=>{const a=this.Ds(s,r);return this.Cs(s,a,n,o)?L.resolve(null):(Es()<=ee.DEBUG&&U("QueryEngine","Re-using previous result from %s to execute query: %s",o.toString(),mn(s)),this.vs(e,a,s,Wf(o,Rn)).next((l=>l)))}))}Ds(e,s){let n=new Se(w0(e));return s.forEach(((o,r)=>{Di(e,r)&&(n=n.add(r))})),n}Cs(e,s,n,o){if(e.limit===null)return!1;if(n.size!==s.size)return!0;const r=e.limitType==="F"?s.last():s.first();return!!r&&(r.hasPendingWrites||r.version.compareTo(o)>0)}Ss(e,s,n){return Es()<=ee.DEBUG&&U("QueryEngine","Using full collection scan to execute query:",mn(s)),this.ps.getDocumentsMatchingQuery(e,s,Dt.min(),n)}vs(e,s,n,o){return this.ps.getDocumentsMatchingQuery(e,n,o).next((r=>(s.forEach((a=>{r=r.insert(a.key,a)})),r)))}}const wb="LocalStore";class Eb{constructor(e,s,n,o){this.persistence=e,this.Fs=s,this.serializer=o,this.Ms=new qe(se),this.xs=new fs((r=>Pi(r)),$i),this.Os=new Map,this.Ns=e.getRemoteDocumentCache(),this.Pi=e.getTargetCache(),this.Ii=e.getBundleCache(),this.Bs(n)}Bs(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new db(this.Ns,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Ns.setIndexManager(this.indexManager),this.Fs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(s=>e.collect(s,this.Ms)))}}function Ib(t,e,s,n){return new Eb(t,e,s,n)}async function dm(t,e){const s=ae(t);return await s.persistence.runTransaction("Handle user change","readonly",(n=>{let o;return s.mutationQueue.getAllMutationBatches(n).next((r=>(o=r,s.Bs(e),s.mutationQueue.getAllMutationBatches(n)))).next((r=>{const a=[],l=[];let c=Ce();for(const d of o){a.push(d.batchId);for(const p of d.mutations)c=c.add(p.key)}for(const d of r){l.push(d.batchId);for(const p of d.mutations)c=c.add(p.key)}return s.localDocuments.getDocuments(n,c).next((d=>({Ls:d,removedBatchIds:a,addedBatchIds:l})))}))}))}function Sb(t,e){const s=ae(t);return s.persistence.runTransaction("Acknowledge batch","readwrite-primary",(n=>{const o=e.batch.keys(),r=s.Ns.newChangeBuffer({trackRemovals:!0});return(function(l,c,d,p){const h=d.batch,f=h.keys();let x=L.resolve();return f.forEach((S=>{x=x.next((()=>p.getEntry(c,S))).next((_=>{const D=d.docVersions.get(S);me(D!==null,48541),_.version.compareTo(D)<0&&(h.applyToRemoteDocument(_,d),_.isValidDocument()&&(_.setReadTime(d.commitVersion),p.addEntry(_)))}))})),x.next((()=>l.mutationQueue.removeMutationBatch(c,h)))})(s,n,e,r).next((()=>r.apply(n))).next((()=>s.mutationQueue.performConsistencyCheck(n))).next((()=>s.documentOverlayCache.removeOverlaysForBatchId(n,o,e.batch.batchId))).next((()=>s.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(n,(function(l){let c=Ce();for(let d=0;d<l.mutationResults.length;++d)l.mutationResults[d].transformResults.length>0&&(c=c.add(l.batch.mutations[d].key));return c})(e)))).next((()=>s.localDocuments.getDocuments(n,o)))}))}function Tb(t){const e=ae(t);return e.persistence.runTransaction("Get last remote snapshot version","readonly",(s=>e.Pi.getLastRemoteSnapshotVersion(s)))}function kb(t,e){const s=ae(t);return s.persistence.runTransaction("Get next mutation batch","readonly",(n=>(e===void 0&&(e=Ti),s.mutationQueue.getNextMutationBatchAfterBatchId(n,e))))}class rd{constructor(){this.activeTargetIds=C0()}zs(e){this.activeTargetIds=this.activeTargetIds.add(e)}js(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Gs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class Cb{constructor(){this.Mo=new rd,this.xo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,s,n){}addLocalQueryTarget(e,s=!0){return s&&this.Mo.zs(e),this.xo[e]||"not-current"}updateQueryState(e,s,n){this.xo[e]=s}removeLocalQueryTarget(e){this.Mo.js(e)}isLocalQueryTarget(e){return this.Mo.activeTargetIds.has(e)}clearQueryState(e){delete this.xo[e]}getAllActiveQueryTargets(){return this.Mo.activeTargetIds}isActiveQueryTarget(e){return this.Mo.activeTargetIds.has(e)}start(){return this.Mo=new rd,Promise.resolve()}handleUserChange(e,s,n){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}class _b{Oo(e){}shutdown(){}}const ad="ConnectivityMonitor";class id{constructor(){this.No=()=>this.Bo(),this.Lo=()=>this.ko(),this.qo=[],this.Qo()}Oo(e){this.qo.push(e)}shutdown(){window.removeEventListener("online",this.No),window.removeEventListener("offline",this.Lo)}Qo(){window.addEventListener("online",this.No),window.addEventListener("offline",this.Lo)}Bo(){U(ad,"Network connectivity changed: AVAILABLE");for(const e of this.qo)e(0)}ko(){U(ad,"Network connectivity changed: UNAVAILABLE");for(const e of this.qo)e(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}let vo=null;function Ja(){return vo===null?vo=(function(){return 268435456+Math.round(2147483648*Math.random())})():vo++,"0x"+vo.toString(16)}const ha="RestConnection",Ab={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class Pb{get $o(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const s=e.ssl?"https":"http",n=encodeURIComponent(this.databaseId.projectId),o=encodeURIComponent(this.databaseId.database);this.Uo=s+"://"+e.host,this.Ko=`projects/${n}/databases/${o}`,this.Wo=this.databaseId.database===Oa?`project_id=${n}`:`project_id=${n}&database_id=${o}`}Go(e,s,n,o,r){const a=Ja(),l=this.zo(e,s.toUriEncodedString());U(ha,`Sending RPC '${e}' ${a}:`,l,n);const c={"google-cloud-resource-prefix":this.Ko,"x-goog-request-params":this.Wo};this.jo(c,o,r);const{host:d}=new URL(l),p=yg(d);return this.Jo(e,l,c,n,p).then((h=>(U(ha,`Received RPC '${e}' ${a}: `,h),h)),(h=>{throw yi(ha,`RPC '${e}' ${a} failed with error: `,h,"url: ",l,"request:",n),h}))}Ho(e,s,n,o,r,a){return this.Go(e,s,n,o,r)}jo(e,s,n){e["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+zs})(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),s&&s.headers.forEach(((o,r)=>e[r]=o)),n&&n.headers.forEach(((o,r)=>e[r]=o))}zo(e,s){const n=Ab[e];return`${this.Uo}/v1/${s}:${n}`}terminate(){}}class $b{constructor(e){this.Yo=e.Yo,this.Zo=e.Zo}Xo(e){this.e_=e}t_(e){this.n_=e}r_(e){this.i_=e}onMessage(e){this.s_=e}close(){this.Zo()}send(e){this.Yo(e)}o_(){this.e_()}__(){this.n_()}a_(e){this.i_(e)}u_(e){this.s_(e)}}const ke="WebChannelConnection";class Db extends Pb{constructor(e){super(e),this.c_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}Jo(e,s,n,o,r){const a=Ja();return new Promise(((l,c)=>{const d=new Tu;d.setWithCredentials(!0),d.listenOnce(ku.COMPLETE,(()=>{try{switch(d.getLastErrorCode()){case Lo.NO_ERROR:const h=d.getResponseJson();U(ke,`XHR for RPC '${e}' ${a} received:`,JSON.stringify(h)),l(h);break;case Lo.TIMEOUT:U(ke,`RPC '${e}' ${a} timed out`),c(new z(M.DEADLINE_EXCEEDED,"Request time out"));break;case Lo.HTTP_ERROR:const f=d.getStatus();if(U(ke,`RPC '${e}' ${a} failed with status:`,f,"response text:",d.getResponseText()),f>0){let x=d.getResponseJson();Array.isArray(x)&&(x=x[0]);const S=x?.error;if(S&&S.status&&S.message){const _=(function(R){const O=R.toLowerCase().replace(/_/g,"-");return Object.values(M).indexOf(O)>=0?O:M.UNKNOWN})(S.status);c(new z(_,S.message))}else c(new z(M.UNKNOWN,"Server responded with status "+d.getStatus()))}else c(new z(M.UNAVAILABLE,"Connection failed."));break;default:Y(9055,{l_:e,streamId:a,h_:d.getLastErrorCode(),P_:d.getLastError()})}}finally{U(ke,`RPC '${e}' ${a} completed.`)}}));const p=JSON.stringify(o);U(ke,`RPC '${e}' ${a} sending request:`,o),d.send(s,"POST",p,n,15)}))}T_(e,s,n){const o=Ja(),r=[this.Uo,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=Au(),l=_u(),c={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},d=this.longPollingOptions.timeoutSeconds;d!==void 0&&(c.longPollingTimeout=Math.round(1e3*d)),this.useFetchStreams&&(c.useFetchStreams=!0),this.jo(c.initMessageHeaders,s,n),c.encodeInitMessageHeaders=!0;const p=r.join("");U(ke,`Creating RPC '${e}' stream ${o}: ${p}`,c);const h=a.createWebChannel(p,c);this.I_(h);let f=!1,x=!1;const S=new $b({Yo:D=>{x?U(ke,`Not sending because RPC '${e}' stream ${o} is closed:`,D):(f||(U(ke,`Opening RPC '${e}' stream ${o} transport.`),h.open(),f=!0),U(ke,`RPC '${e}' stream ${o} sending:`,D),h.send(D))},Zo:()=>h.close()}),_=(D,R,O)=>{D.listen(R,(N=>{try{O(N)}catch(B){setTimeout((()=>{throw B}),0)}}))};return _(h,fn.EventType.OPEN,(()=>{x||(U(ke,`RPC '${e}' stream ${o} transport opened.`),S.o_())})),_(h,fn.EventType.CLOSE,(()=>{x||(x=!0,U(ke,`RPC '${e}' stream ${o} transport closed`),S.a_(),this.E_(h))})),_(h,fn.EventType.ERROR,(D=>{x||(x=!0,yi(ke,`RPC '${e}' stream ${o} transport errored. Name:`,D.name,"Message:",D.message),S.a_(new z(M.UNAVAILABLE,"The operation could not be completed")))})),_(h,fn.EventType.MESSAGE,(D=>{if(!x){const R=D.data[0];me(!!R,16349);const O=R,N=O?.error||O[0]?.error;if(N){U(ke,`RPC '${e}' stream ${o} received error:`,N);const B=N.status;let H=(function(b){const v=he[b];if(v!==void 0)return O0(v)})(B),G=N.message;H===void 0&&(H=M.INTERNAL,G="Unknown error status: "+B+" with message "+N.message),x=!0,S.a_(new z(H,G)),h.close()}else U(ke,`RPC '${e}' stream ${o} received:`,R),S.u_(R)}})),_(l,Cu.STAT_EVENT,(D=>{D.stat===Va.PROXY?U(ke,`RPC '${e}' stream ${o} detected buffering proxy`):D.stat===Va.NOPROXY&&U(ke,`RPC '${e}' stream ${o} detected no buffering proxy`)})),setTimeout((()=>{S.__()}),0),S}terminate(){this.c_.forEach((e=>e.close())),this.c_=[]}I_(e){this.c_.push(e)}E_(e){this.c_=this.c_.filter((s=>s===e))}}function ga(){return typeof document<"u"?document:null}function br(t){return new q0(t,!0)}class um{constructor(e,s,n=1e3,o=1.5,r=6e4){this.Mi=e,this.timerId=s,this.d_=n,this.A_=o,this.R_=r,this.V_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.V_=0}g_(){this.V_=this.R_}p_(e){this.cancel();const s=Math.floor(this.V_+this.y_()),n=Math.max(0,Date.now()-this.f_),o=Math.max(0,s-n);o>0&&U("ExponentialBackoff",`Backing off for ${o} ms (base delay: ${this.V_} ms, delay with jitter: ${s} ms, last attempt: ${n} ms ago)`),this.m_=this.Mi.enqueueAfterDelay(this.timerId,o,(()=>(this.f_=Date.now(),e()))),this.V_*=this.A_,this.V_<this.d_&&(this.V_=this.d_),this.V_>this.R_&&(this.V_=this.R_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.V_}}const ld="PersistentStream";class Lb{constructor(e,s,n,o,r,a,l,c){this.Mi=e,this.S_=n,this.b_=o,this.connection=r,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=l,this.listener=c,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new um(e,s)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Mi.enqueueAfterDelay(this.S_,6e4,(()=>this.k_())))}q_(e){this.Q_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}Q_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,s){this.Q_(),this.U_(),this.M_.cancel(),this.D_++,e!==4?this.M_.reset():s&&s.code===M.RESOURCE_EXHAUSTED?(is(s.toString()),is("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):s&&s.code===M.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.K_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.r_(s)}K_(){}auth(){this.state=1;const e=this.W_(this.D_),s=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([n,o])=>{this.D_===s&&this.G_(n,o)}),(n=>{e((()=>{const o=new z(M.UNKNOWN,"Fetching auth token failed: "+n.message);return this.z_(o)}))}))}G_(e,s){const n=this.W_(this.D_);this.stream=this.j_(e,s),this.stream.Xo((()=>{n((()=>this.listener.Xo()))})),this.stream.t_((()=>{n((()=>(this.state=2,this.v_=this.Mi.enqueueAfterDelay(this.b_,1e4,(()=>(this.O_()&&(this.state=3),Promise.resolve()))),this.listener.t_())))})),this.stream.r_((o=>{n((()=>this.z_(o)))})),this.stream.onMessage((o=>{n((()=>++this.F_==1?this.J_(o):this.onNext(o)))}))}N_(){this.state=5,this.M_.p_((async()=>{this.state=0,this.start()}))}z_(e){return U(ld,`close with error: ${e}`),this.stream=null,this.close(4,e)}W_(e){return s=>{this.Mi.enqueueAndForget((()=>this.D_===e?s():(U(ld,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class Rb extends Lb{constructor(e,s,n,o,r,a){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",s,n,o,a),this.serializer=r}get X_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}K_(){this.X_&&this.ea([])}j_(e,s){return this.connection.T_("Write",e,s)}J_(e){return me(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,me(!e.writeResults||e.writeResults.length===0,55816),this.listener.ta()}onNext(e){me(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();const s=J0(e.writeResults,e.commitTime),n=_s(e.commitTime);return this.listener.na(n,s)}ra(){const e={};e.database=W0(this.serializer),this.q_(e)}ea(e){const s={streamToken:this.lastStreamToken,writes:e.map((n=>K0(this.serializer,n)))};this.q_(s)}}class Mb{}class Nb extends Mb{constructor(e,s,n,o){super(),this.authCredentials=e,this.appCheckCredentials=s,this.connection=n,this.serializer=o,this.ia=!1}sa(){if(this.ia)throw new z(M.FAILED_PRECONDITION,"The client has already been terminated.")}Go(e,s,n,o){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([r,a])=>this.connection.Go(e,Ga(s,n),o,r,a))).catch((r=>{throw r.name==="FirebaseError"?(r.code===M.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),r):new z(M.UNKNOWN,r.toString())}))}Ho(e,s,n,o,r){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([a,l])=>this.connection.Ho(e,Ga(s,n),o,a,l,r))).catch((a=>{throw a.name==="FirebaseError"?(a.code===M.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new z(M.UNKNOWN,a.toString())}))}terminate(){this.ia=!0,this.connection.terminate()}}class Bb{constructor(e,s){this.asyncQueue=e,this.onlineStateHandler=s,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve()))))}ha(e){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,e==="Online"&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const s=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(is(s),this.aa=!1):U("OnlineStateTracker",s)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}const Wn="RemoteStore";class Vb{constructor(e,s,n,o,r){this.localStore=e,this.datastore=s,this.asyncQueue=n,this.remoteSyncer={},this.Ta=[],this.Ia=new Map,this.Ea=new Set,this.da=[],this.Aa=r,this.Aa.Oo((a=>{n.enqueueAndForget((async()=>{Kn(this)&&(U(Wn,"Restarting streams for network reachability change."),await(async function(c){const d=ae(c);d.Ea.add(4),await Gn(d),d.Ra.set("Unknown"),d.Ea.delete(4),await vr(d)})(this))}))})),this.Ra=new Bb(n,o)}}async function vr(t){if(Kn(t))for(const e of t.da)await e(!0)}async function Gn(t){for(const e of t.da)await e(!1)}function Kn(t){return ae(t).Ea.size===0}async function mm(t,e,s){if(!Un(e))throw e;t.Ea.add(1),await Gn(t),t.Ra.set("Offline"),s||(s=()=>Tb(t.localStore)),t.asyncQueue.enqueueRetryable((async()=>{U(Wn,"Retrying IndexedDB access"),await s(),t.Ea.delete(1),await vr(t)}))}function pm(t,e){return e().catch((s=>mm(t,s,e)))}async function yr(t){const e=ae(t),s=Rt(e);let n=e.Ta.length>0?e.Ta[e.Ta.length-1].batchId:Ti;for(;Fb(e);)try{const o=await kb(e.localStore,n);if(o===null){e.Ta.length===0&&s.L_();break}n=o.batchId,Ob(e,o)}catch(o){await mm(e,o)}hm(e)&&gm(e)}function Fb(t){return Kn(t)&&t.Ta.length<10}function Ob(t,e){t.Ta.push(e);const s=Rt(t);s.O_()&&s.X_&&s.ea(e.mutations)}function hm(t){return Kn(t)&&!Rt(t).x_()&&t.Ta.length>0}function gm(t){Rt(t).start()}async function qb(t){Rt(t).ra()}async function jb(t){const e=Rt(t);for(const s of t.Ta)e.ea(s.mutations)}async function Hb(t,e,s){const n=t.Ta.shift(),o=Ri.from(n,e,s);await pm(t,(()=>t.remoteSyncer.applySuccessfulWrite(o))),await yr(t)}async function Ub(t,e){e&&Rt(t).X_&&await(async function(n,o){if((function(a){return F0(a)&&a!==M.ABORTED})(o.code)){const r=n.Ta.shift();Rt(n).B_(),await pm(n,(()=>n.remoteSyncer.rejectFailedWrite(r.batchId,o))),await yr(n)}})(t,e),hm(t)&&gm(t)}async function cd(t,e){const s=ae(t);s.asyncQueue.verifyOperationInProgress(),U(Wn,"RemoteStore received new credentials");const n=Kn(s);s.Ea.add(3),await Gn(s),n&&s.Ra.set("Unknown"),await s.remoteSyncer.handleCredentialChange(e),s.Ea.delete(3),await vr(s)}async function zb(t,e){const s=ae(t);e?(s.Ea.delete(2),await vr(s)):e||(s.Ea.add(2),await Gn(s),s.Ra.set("Unknown"))}function Rt(t){return t.fa||(t.fa=(function(s,n,o){const r=ae(s);return r.sa(),new Rb(n,r.connection,r.authCredentials,r.appCheckCredentials,r.serializer,o)})(t.datastore,t.asyncQueue,{Xo:()=>Promise.resolve(),t_:qb.bind(null,t),r_:Ub.bind(null,t),ta:jb.bind(null,t),na:Hb.bind(null,t)}),t.da.push((async e=>{e?(t.fa.B_(),await yr(t)):(await t.fa.stop(),t.Ta.length>0&&(U(Wn,`Stopping write stream with ${t.Ta.length} pending writes`),t.Ta=[]))}))),t.fa}class Vi{constructor(e,s,n,o,r){this.asyncQueue=e,this.timerId=s,this.targetTimeMs=n,this.op=o,this.removalCallback=r,this.deferred=new Zt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((a=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(e,s,n,o,r){const a=Date.now()+n,l=new Vi(e,s,a,o,r);return l.start(n),l}start(e){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new z(M.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((e=>this.deferred.resolve(e)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function fm(t,e){if(is("AsyncQueue",`${e}: ${t}`),Un(t))return new z(M.UNAVAILABLE,`${e}: ${t}`);throw t}class Wb{constructor(){this.queries=dd(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(s,n){const o=ae(s),r=o.queries;o.queries=dd(),r.forEach(((a,l)=>{for(const c of l.Sa)c.onError(n)}))})(this,new z(M.ABORTED,"Firestore shutting down"))}}function dd(){return new fs((t=>Ku(t)),Gu)}function Gb(t){t.Ca.forEach((e=>{e.next()}))}var ud,md;(md=ud||(ud={})).Ma="default",md.Cache="cache";const Kb="SyncEngine";class Jb{constructor(e,s,n,o,r,a){this.localStore=e,this.remoteStore=s,this.eventManager=n,this.sharedClientState=o,this.currentUser=r,this.maxConcurrentLimboResolutions=a,this.Pu={},this.Tu=new fs((l=>Ku(l)),Gu),this.Iu=new Map,this.Eu=new Set,this.du=new qe(X.comparator),this.Au=new Map,this.Ru=new Mi,this.Vu={},this.mu=new Map,this.fu=Os.cr(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function Qb(t,e,s){const n=ev(t);try{const o=await(function(a,l){const c=ae(a),d=de.now(),p=l.reduce(((x,S)=>x.add(S.key)),Ce());let h,f;return c.persistence.runTransaction("Locally write mutations","readwrite",(x=>{let S=Ko(),_=Ce();return c.Ns.getEntries(x,p).next((D=>{S=D,S.forEach(((R,O)=>{O.isValidDocument()||(_=_.add(R))}))})).next((()=>c.localDocuments.getOverlayedDocuments(x,S))).next((D=>{h=D;const R=[];for(const O of l){const N=M0(O,h.get(O.key).overlayedDocument);N!=null&&R.push(new Bt(O.key,N,Ou(N.value.mapValue),nt.exists(!0)))}return c.mutationQueue.addMutationBatch(x,d,R,l)})).next((D=>{f=D;const R=D.applyToLocalDocumentSet(h,_);return c.documentOverlayCache.saveOverlays(x,D.batchId,R)}))})).then((()=>({batchId:f.batchId,changes:Qu(h)})))})(n.localStore,e);n.sharedClientState.addPendingMutation(o.batchId),(function(a,l,c){let d=a.Vu[a.currentUser.toKey()];d||(d=new qe(se)),d=d.insert(l,c),a.Vu[a.currentUser.toKey()]=d})(n,o.batchId,s),await xr(n,o.changes),await yr(n.remoteStore)}catch(o){const r=fm(o,"Failed to persist write");s.reject(r)}}function pd(t,e,s){const n=ae(t);if(n.isPrimaryClient&&s===0||!n.isPrimaryClient&&s===1){const o=[];n.Tu.forEach(((r,a)=>{const l=a.view.va(e);l.snapshot&&o.push(l.snapshot)})),(function(a,l){const c=ae(a);c.onlineState=l;let d=!1;c.queries.forEach(((p,h)=>{for(const f of h.Sa)f.va(l)&&(d=!0)})),d&&Gb(c)})(n.eventManager,e),o.length&&n.Pu.H_(o),n.onlineState=e,n.isPrimaryClient&&n.sharedClientState.setOnlineState(e)}}async function Xb(t,e){const s=ae(t),n=e.batch.batchId;try{const o=await Sb(s.localStore,e);vm(s,n,null),bm(s,n),s.sharedClientState.updateMutationState(n,"acknowledged"),await xr(s,o)}catch(o){await Ii(o)}}async function Yb(t,e,s){const n=ae(t);try{const o=await(function(a,l){const c=ae(a);return c.persistence.runTransaction("Reject batch","readwrite-primary",(d=>{let p;return c.mutationQueue.lookupMutationBatch(d,l).next((h=>(me(h!==null,37113),p=h.keys(),c.mutationQueue.removeMutationBatch(d,h)))).next((()=>c.mutationQueue.performConsistencyCheck(d))).next((()=>c.documentOverlayCache.removeOverlaysForBatchId(d,p,l))).next((()=>c.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(d,p))).next((()=>c.localDocuments.getDocuments(d,p)))}))})(n.localStore,e);vm(n,e,s),bm(n,e),n.sharedClientState.updateMutationState(e,"rejected",s),await xr(n,o)}catch(o){await Ii(o)}}function bm(t,e){(t.mu.get(e)||[]).forEach((s=>{s.resolve()})),t.mu.delete(e)}function vm(t,e,s){const n=ae(t);let o=n.Vu[n.currentUser.toKey()];if(o){const r=o.get(e);r&&(s?r.reject(s):r.resolve(),o=o.remove(e)),n.Vu[n.currentUser.toKey()]=o}}async function xr(t,e,s){const n=ae(t),o=[],r=[],a=[];n.Tu.isEmpty()||(n.Tu.forEach(((l,c)=>{a.push(n.pu(c,e,s).then((d=>{if((d||s)&&n.isPrimaryClient){const p=d?!d.fromCache:s?.targetChanges.get(c.targetId)?.current;n.sharedClientState.updateQueryState(c.targetId,p?"current":"not-current")}if(d){o.push(d);const p=Bi.As(c.targetId,d);r.push(p)}})))})),await Promise.all(a),n.Pu.H_(o),await(async function(c,d){const p=ae(c);try{await p.persistence.runTransaction("notifyLocalViewChanges","readwrite",(h=>L.forEach(d,(f=>L.forEach(f.Es,(x=>p.persistence.referenceDelegate.addReference(h,f.targetId,x))).next((()=>L.forEach(f.ds,(x=>p.persistence.referenceDelegate.removeReference(h,f.targetId,x)))))))))}catch(h){if(!Un(h))throw h;U(wb,"Failed to update sequence numbers: "+h)}for(const h of d){const f=h.targetId;if(!h.fromCache){const x=p.Ms.get(f),S=x.snapshotVersion,_=x.withLastLimboFreeSnapshotVersion(S);p.Ms=p.Ms.insert(f,_)}}})(n.localStore,r))}async function Zb(t,e){const s=ae(t);if(!s.currentUser.isEqual(e)){U(Kb,"User change. New user:",e.toKey());const n=await dm(s.localStore,e);s.currentUser=e,(function(r,a){r.mu.forEach((l=>{l.forEach((c=>{c.reject(new z(M.CANCELLED,a))}))})),r.mu.clear()})(s,"'waitForPendingWrites' promise is rejected due to a user change."),s.sharedClientState.handleUserChange(e,n.removedBatchIds,n.addedBatchIds),await xr(s,n.Ls)}}function ev(t){const e=ae(t);return e.remoteStore.remoteSyncer.applySuccessfulWrite=Xb.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=Yb.bind(null,e),e}class Yo{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=br(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,s){return null}Mu(e,s){return null}vu(e){return Ib(this.persistence,new xb,e.initialUser,this.serializer)}Cu(e){return new cm(Ni.mi,this.serializer)}Du(e){return new Cb}async terminate(){this.gcScheduler?.stop(),this.indexBackfillerScheduler?.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Yo.provider={build:()=>new Yo};class tv extends Yo{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,s){me(this.persistence.referenceDelegate instanceof Xo,46915);const n=this.persistence.referenceDelegate.garbageCollector;return new rb(n,e.asyncQueue,s)}Cu(e){const s=this.cacheSizeBytes!==void 0?Ve.withCacheSize(this.cacheSizeBytes):Ve.DEFAULT;return new cm((n=>Xo.mi(n,s)),this.serializer)}}class Qa{async initialize(e,s){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(s),this.remoteStore=this.createRemoteStore(s),this.eventManager=this.createEventManager(s),this.syncEngine=this.createSyncEngine(s,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=n=>pd(this.syncEngine,n,1),this.remoteStore.remoteSyncer.handleCredentialChange=Zb.bind(null,this.syncEngine),await zb(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return(function(){return new Wb})()}createDatastore(e){const s=br(e.databaseInfo.databaseId),n=(function(r){return new Db(r)})(e.databaseInfo);return(function(r,a,l,c){return new Nb(r,a,l,c)})(e.authCredentials,e.appCheckCredentials,n,s)}createRemoteStore(e){return(function(n,o,r,a,l){return new Vb(n,o,r,a,l)})(this.localStore,this.datastore,e.asyncQueue,(s=>pd(this.syncEngine,s,0)),(function(){return id.v()?new id:new _b})())}createSyncEngine(e,s){return(function(o,r,a,l,c,d,p){const h=new Jb(o,r,a,l,c,d);return p&&(h.gu=!0),h})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,s)}async terminate(){await(async function(s){const n=ae(s);U(Wn,"RemoteStore shutting down."),n.Ea.add(5),await Gn(n),n.Aa.shutdown(),n.Ra.set("Unknown")})(this.remoteStore),this.datastore?.terminate(),this.eventManager?.terminate()}}Qa.provider={build:()=>new Qa};const Mt="FirestoreClient";class sv{constructor(e,s,n,o,r){this.authCredentials=e,this.appCheckCredentials=s,this.asyncQueue=n,this.databaseInfo=o,this.user=Be.UNAUTHENTICATED,this.clientId=wi.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=r,this.authCredentials.start(n,(async a=>{U(Mt,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a})),this.appCheckCredentials.start(n,(a=>(U(Mt,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Zt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(s){const n=fm(s,"Failed to shutdown persistence");e.reject(n)}})),e.promise}}async function fa(t,e){t.asyncQueue.verifyOperationInProgress(),U(Mt,"Initializing OfflineComponentProvider");const s=t.configuration;await e.initialize(s);let n=s.initialUser;t.setCredentialChangeListener((async o=>{n.isEqual(o)||(await dm(e.localStore,o),n=o)})),e.persistence.setDatabaseDeletedListener((()=>t.terminate())),t._offlineComponents=e}async function hd(t,e){t.asyncQueue.verifyOperationInProgress();const s=await nv(t);U(Mt,"Initializing OnlineComponentProvider"),await e.initialize(s,t.configuration),t.setCredentialChangeListener((n=>cd(e.remoteStore,n))),t.setAppCheckTokenChangeListener(((n,o)=>cd(e.remoteStore,o))),t._onlineComponents=e}async function nv(t){if(!t._offlineComponents)if(t._uninitializedComponentsProvider){U(Mt,"Using user provided OfflineComponentProvider");try{await fa(t,t._uninitializedComponentsProvider._offline)}catch(e){const s=e;if(!(function(o){return o.name==="FirebaseError"?o.code===M.FAILED_PRECONDITION||o.code===M.UNIMPLEMENTED:!(typeof DOMException<"u"&&o instanceof DOMException)||o.code===22||o.code===20||o.code===11})(s))throw s;yi("Error using user provided cache. Falling back to memory cache: "+s),await fa(t,new Yo)}}else U(Mt,"Using default OfflineComponentProvider"),await fa(t,new tv(void 0));return t._offlineComponents}async function ov(t){return t._onlineComponents||(t._uninitializedComponentsProvider?(U(Mt,"Using user provided OnlineComponentProvider"),await hd(t,t._uninitializedComponentsProvider._online)):(U(Mt,"Using default OnlineComponentProvider"),await hd(t,new Qa))),t._onlineComponents}function rv(t){return ov(t).then((e=>e.syncEngine))}function ym(t){const e={};return t.timeoutSeconds!==void 0&&(e.timeoutSeconds=t.timeoutSeconds),e}const gd=new Map;const av="firestore.googleapis.com",fd=!0;class bd{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new z(M.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=av,this.ssl=fd}else this.host=e.host,this.ssl=e.ssl??fd;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=lm;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<nb)throw new z(M.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}zf("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=ym(e.experimentalLongPollingOptions??{}),(function(n){if(n.timeoutSeconds!==void 0){if(isNaN(n.timeoutSeconds))throw new z(M.INVALID_ARGUMENT,`invalid long polling timeout: ${n.timeoutSeconds} (must not be NaN)`);if(n.timeoutSeconds<5)throw new z(M.INVALID_ARGUMENT,`invalid long polling timeout: ${n.timeoutSeconds} (minimum allowed value is 5)`);if(n.timeoutSeconds>30)throw new z(M.INVALID_ARGUMENT,`invalid long polling timeout: ${n.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(function(n,o){return n.timeoutSeconds===o.timeoutSeconds})(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class xm{constructor(e,s,n,o){this._authCredentials=e,this._appCheckCredentials=s,this._databaseId=n,this._app=o,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new bd({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new z(M.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new z(M.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new bd(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=(function(n){if(!n)return new Mf;switch(n.type){case"firstParty":return new Vf(n.sessionIndex||"0",n.iamToken||null,n.authTokenFactory||null);case"provider":return n.client;default:throw new z(M.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(s){const n=gd.get(s);n&&(U("ComponentProvider","Removing Datastore"),gd.delete(s),n.terminate())})(this),Promise.resolve()}}class Fi{constructor(e,s,n){this.converter=s,this._query=n,this.type="query",this.firestore=e}withConverter(e){return new Fi(this.firestore,e,this._query)}}class Ie{constructor(e,s,n){this.converter=s,this._key=n,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Bn(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Ie(this.firestore,e,this._key)}toJSON(){return{type:Ie._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,s,n){if(Hn(s,Ie._jsonSchema))return new Ie(e,n||null,new X(pe.fromString(s.referencePath)))}}Ie._jsonSchemaVersion="firestore/documentReference/1.0",Ie._jsonSchema={type:ge("string",Ie._jsonSchemaVersion),referencePath:ge("string")};class Bn extends Fi{constructor(e,s,n){super(e,s,v0(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Ie(this.firestore,null,new X(e))}withConverter(e){return new Bn(this.firestore,e,this._path)}}function iv(t,e,...s){if(t=gt(t),arguments.length===1&&(e=wi.newId()),Uf("doc","path",e),t instanceof xm){const n=pe.fromString(e,...s);return Fc(n),new Ie(t,null,new X(n))}{if(!(t instanceof Ie||t instanceof Bn))throw new z(M.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=t._path.child(pe.fromString(e,...s));return Fc(n),new Ie(t.firestore,t instanceof Bn?t.converter:null,new X(n))}}const vd="AsyncQueue";class yd{constructor(e=Promise.resolve()){this.Xu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new um(this,"async_queue_retry"),this._c=()=>{const n=ga();n&&U(vd,"Visibility state changed to "+n.visibilityState),this.M_.w_()},this.ac=e;const s=ga();s&&typeof s.addEventListener=="function"&&s.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const s=ga();s&&typeof s.removeEventListener=="function"&&s.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise((()=>{}));const s=new Zt;return this.cc((()=>this.ec&&this.sc?Promise.resolve():(e().then(s.resolve,s.reject),s.promise))).then((()=>s.promise))}enqueueRetryable(e){this.enqueueAndForget((()=>(this.Xu.push(e),this.lc())))}async lc(){if(this.Xu.length!==0){try{await this.Xu[0](),this.Xu.shift(),this.M_.reset()}catch(e){if(!Un(e))throw e;U(vd,"Operation failed with retryable error: "+e)}this.Xu.length>0&&this.M_.p_((()=>this.lc()))}}cc(e){const s=this.ac.then((()=>(this.rc=!0,e().catch((n=>{throw this.nc=n,this.rc=!1,is("INTERNAL UNHANDLED ERROR: ",xd(n)),n})).then((n=>(this.rc=!1,n))))));return this.ac=s,s}enqueueAfterDelay(e,s,n){this.uc(),this.oc.indexOf(e)>-1&&(s=0);const o=Vi.createAndSchedule(this,e,s,n,(r=>this.hc(r)));return this.tc.push(o),o}uc(){this.nc&&Y(47125,{Pc:xd(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do e=this.ac,await e;while(e!==this.ac)}Ic(e){for(const s of this.tc)if(s.timerId===e)return!0;return!1}Ec(e){return this.Tc().then((()=>{this.tc.sort(((s,n)=>s.targetTimeMs-n.targetTimeMs));for(const s of this.tc)if(s.skipDelay(),e!=="all"&&s.timerId===e)break;return this.Tc()}))}dc(e){this.oc.push(e)}hc(e){const s=this.tc.indexOf(e);this.tc.splice(s,1)}}function xd(t){let e=t.message||"";return t.stack&&(e=t.stack.includes(t.message)?t.stack:t.message+`
`+t.stack),e}class Oi extends xm{constructor(e,s,n,o){super(e,s,n,o),this.type="firestore",this._queue=new yd,this._persistenceKey=o?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new yd(e),this._firestoreClient=void 0,await e}}}function lv(t){if(t._terminated)throw new z(M.FAILED_PRECONDITION,"The client has already been terminated.");return t._firestoreClient||cv(t),t._firestoreClient}function cv(t){const e=t._freezeSettings(),s=(function(o,r,a,l){return new n0(o,r,a,l.host,l.ssl,l.experimentalForceLongPolling,l.experimentalAutoDetectLongPolling,ym(l.experimentalLongPollingOptions),l.useFetchStreams,l.isUsingEmulator)})(t._databaseId,t._app?.options.appId||"",t._persistenceKey,e);t._componentsProvider||e.localCache?._offlineComponentProvider&&e.localCache?._onlineComponentProvider&&(t._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),t._firestoreClient=new sv(t._authCredentials,t._appCheckCredentials,t._queue,s,t._componentsProvider&&(function(o){const r=o?._online.build();return{_offline:o?._offline.build(r),_online:r}})(t._componentsProvider))}class Ke{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Ke(ot.fromBase64String(e))}catch(s){throw new z(M.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+s)}}static fromUint8Array(e){return new Ke(ot.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:Ke._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(Hn(e,Ke._jsonSchema))return Ke.fromBase64String(e.bytes)}}Ke._jsonSchemaVersion="firestore/bytes/1.0",Ke._jsonSchema={type:ge("string",Ke._jsonSchemaVersion),bytes:ge("string")};class wr{constructor(...e){for(let s=0;s<e.length;++s)if(e[s].length===0)throw new z(M.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Ee(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}class Er{constructor(e){this._methodName=e}}class pt{constructor(e,s){if(!isFinite(e)||e<-90||e>90)throw new z(M.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(s)||s<-180||s>180)throw new z(M.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+s);this._lat=e,this._long=s}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return se(this._lat,e._lat)||se(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:pt._jsonSchemaVersion}}static fromJSON(e){if(Hn(e,pt._jsonSchema))return new pt(e.latitude,e.longitude)}}pt._jsonSchemaVersion="firestore/geoPoint/1.0",pt._jsonSchema={type:ge("string",pt._jsonSchemaVersion),latitude:ge("number"),longitude:ge("number")};class ht{constructor(e){this._values=(e||[]).map((s=>s))}toArray(){return this._values.map((e=>e))}isEqual(e){return(function(n,o){if(n.length!==o.length)return!1;for(let r=0;r<n.length;++r)if(n[r]!==o[r])return!1;return!0})(this._values,e._values)}toJSON(){return{type:ht._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(Hn(e,ht._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every((s=>typeof s=="number")))return new ht(e.vectorValues);throw new z(M.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}ht._jsonSchemaVersion="firestore/vectorValue/1.0",ht._jsonSchema={type:ge("string",ht._jsonSchemaVersion),vectorValues:ge("object")};const dv=/^__.*__$/;class uv{constructor(e,s,n){this.data=e,this.fieldMask=s,this.fieldTransforms=n}toMutation(e,s){return this.fieldMask!==null?new Bt(e,this.data,this.fieldMask,s,this.fieldTransforms):new zn(e,this.data,s,this.fieldTransforms)}}class wm{constructor(e,s,n){this.data=e,this.fieldMask=s,this.fieldTransforms=n}toMutation(e,s){return new Bt(e,this.data,this.fieldMask,s,this.fieldTransforms)}}function Em(t){switch(t){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw Y(40011,{Ac:t})}}class Ir{constructor(e,s,n,o,r,a){this.settings=e,this.databaseId=s,this.serializer=n,this.ignoreUndefinedProperties=o,r===void 0&&this.Rc(),this.fieldTransforms=r||[],this.fieldMask=a||[]}get path(){return this.settings.path}get Ac(){return this.settings.Ac}Vc(e){return new Ir({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}mc(e){const s=this.path?.child(e),n=this.Vc({path:s,fc:!1});return n.gc(e),n}yc(e){const s=this.path?.child(e),n=this.Vc({path:s,fc:!1});return n.Rc(),n}wc(e){return this.Vc({path:void 0,fc:!0})}Sc(e){return Zo(e,this.settings.methodName,this.settings.bc||!1,this.path,this.settings.Dc)}contains(e){return this.fieldMask.find((s=>e.isPrefixOf(s)))!==void 0||this.fieldTransforms.find((s=>e.isPrefixOf(s.field)))!==void 0}Rc(){if(this.path)for(let e=0;e<this.path.length;e++)this.gc(this.path.get(e))}gc(e){if(e.length===0)throw this.Sc("Document fields must not be empty");if(Em(this.Ac)&&dv.test(e))throw this.Sc('Document fields cannot begin and end with "__"')}}class mv{constructor(e,s,n){this.databaseId=e,this.ignoreUndefinedProperties=s,this.serializer=n||br(e)}Cc(e,s,n,o=!1){return new Ir({Ac:e,methodName:s,Dc:n,path:Ee.emptyPath(),fc:!1,bc:o},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Im(t){const e=t._freezeSettings(),s=br(t._databaseId);return new mv(t._databaseId,!!e.ignoreUndefinedProperties,s)}function pv(t,e,s,n,o,r={}){const a=t.Cc(r.merge||r.mergeFields?2:0,e,s,o);ji("Data must be an object, but it was:",a,n);const l=Sm(n,a);let c,d;if(r.merge)c=new Ue(a.fieldMask),d=a.fieldTransforms;else if(r.mergeFields){const p=[];for(const h of r.mergeFields){const f=Xa(e,h,s);if(!a.contains(f))throw new z(M.INVALID_ARGUMENT,`Field '${f}' is specified in your field mask but missing from your input data.`);km(p,f)||p.push(f)}c=new Ue(p),d=a.fieldTransforms.filter((h=>c.covers(h.field)))}else c=null,d=a.fieldTransforms;return new uv(new He(l),c,d)}class Sr extends Er{_toFieldTransform(e){if(e.Ac!==2)throw e.Ac===1?e.Sc(`${this._methodName}() can only appear at the top level of your update data`):e.Sc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof Sr}}function hv(t,e,s){return new Ir({Ac:3,Dc:e.settings.Dc,methodName:t._methodName,fc:s},e.databaseId,e.serializer,e.ignoreUndefinedProperties)}class qi extends Er{constructor(e,s){super(e),this.vc=s}_toFieldTransform(e){const s=hv(this,e,!0),n=this.vc.map((r=>Jn(r,s))),o=new Fs(n);return new $0(e.path,o)}isEqual(e){return e instanceof qi&&vu(this.vc,e.vc)}}function gv(t,e,s,n){const o=t.Cc(1,e,s);ji("Data must be an object, but it was:",o,n);const r=[],a=He.empty();gs(n,((c,d)=>{const p=Hi(e,c,s);d=gt(d);const h=o.yc(p);if(d instanceof Sr)r.push(p);else{const f=Jn(d,h);f!=null&&(r.push(p),a.set(p,f))}}));const l=new Ue(r);return new wm(a,l,o.fieldTransforms)}function fv(t,e,s,n,o,r){const a=t.Cc(1,e,s),l=[Xa(e,n,s)],c=[o];if(r.length%2!=0)throw new z(M.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let f=0;f<r.length;f+=2)l.push(Xa(e,r[f])),c.push(r[f+1]);const d=[],p=He.empty();for(let f=l.length-1;f>=0;--f)if(!km(d,l[f])){const x=l[f];let S=c[f];S=gt(S);const _=a.yc(x);if(S instanceof Sr)d.push(x);else{const D=Jn(S,_);D!=null&&(d.push(x),p.set(x,D))}}const h=new Ue(d);return new wm(p,h,a.fieldTransforms)}function Jn(t,e){if(Tm(t=gt(t)))return ji("Unsupported field value:",e,t),Sm(t,e);if(t instanceof Er)return(function(n,o){if(!Em(o.Ac))throw o.Sc(`${n._methodName}() can only be used with update() and set()`);if(!o.path)throw o.Sc(`${n._methodName}() is not currently supported inside arrays`);const r=n._toFieldTransform(o);r&&o.fieldTransforms.push(r)})(t,e),null;if(t===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),t instanceof Array){if(e.settings.fc&&e.Ac!==4)throw e.Sc("Nested arrays are not supported");return(function(n,o){const r=[];let a=0;for(const l of n){let c=Jn(l,o.wc(a));c==null&&(c={nullValue:"NULL_VALUE"}),r.push(c),a++}return{arrayValue:{values:r}}})(t,e)}return(function(n,o){if((n=gt(n))===null)return{nullValue:"NULL_VALUE"};if(typeof n=="number")return _0(o.serializer,n);if(typeof n=="boolean")return{booleanValue:n};if(typeof n=="string")return{stringValue:n};if(n instanceof Date){const r=de.fromDate(n);return{timestampValue:Wa(o.serializer,r)}}if(n instanceof de){const r=new de(n.seconds,1e3*Math.floor(n.nanoseconds/1e3));return{timestampValue:Wa(o.serializer,r)}}if(n instanceof pt)return{geoPointValue:{latitude:n.latitude,longitude:n.longitude}};if(n instanceof Ke)return{bytesValue:j0(o.serializer,n._byteString)};if(n instanceof Ie){const r=o.databaseId,a=n.firestore._databaseId;if(!a.isEqual(r))throw o.Sc(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${r.projectId}/${r.database}`);return{referenceValue:am(n.firestore._databaseId||o.databaseId,n._key.path)}}if(n instanceof ht)return(function(a,l){return{mapValue:{fields:{[Vu]:{stringValue:Fu},[qa]:{arrayValue:{values:a.toArray().map((d=>{if(typeof d!="number")throw l.Sc("VectorValues must only contain numeric values.");return Li(l.serializer,d)}))}}}}}})(n,o);throw o.Sc(`Unsupported field value: ${Ei(n)}`)})(t,e)}function Sm(t,e){const s={};return Lu(t)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):gs(t,((n,o)=>{const r=Jn(o,e.mc(n));r!=null&&(s[n]=r)})),{mapValue:{fields:s}}}function Tm(t){return!(typeof t!="object"||t===null||t instanceof Array||t instanceof Date||t instanceof de||t instanceof pt||t instanceof Ke||t instanceof Ie||t instanceof Er||t instanceof ht)}function ji(t,e,s){if(!Tm(s)||!$u(s)){const n=Ei(s);throw n==="an object"?e.Sc(t+" a custom object"):e.Sc(t+" "+n)}}function Xa(t,e,s){if((e=gt(e))instanceof wr)return e._internalPath;if(typeof e=="string")return Hi(t,e);throw Zo("Field path arguments must be of type string or ",t,!1,void 0,s)}const bv=new RegExp("[~\\*/\\[\\]]");function Hi(t,e,s){if(e.search(bv)>=0)throw Zo(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,t,!1,void 0,s);try{return new wr(...e.split("."))._internalPath}catch{throw Zo(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,t,!1,void 0,s)}}function Zo(t,e,s,n,o){const r=n&&!n.isEmpty(),a=o!==void 0;let l=`Function ${e}() called with invalid data`;s&&(l+=" (via `toFirestore()`)"),l+=". ";let c="";return(r||a)&&(c+=" (found",r&&(c+=` in field ${n}`),a&&(c+=` in document ${o}`),c+=")"),new z(M.INVALID_ARGUMENT,l+t+c)}function km(t,e){return t.some((s=>s.isEqual(e)))}class Cm{constructor(e,s,n,o,r){this._firestore=e,this._userDataWriter=s,this._key=n,this._document=o,this._converter=r}get id(){return this._key.path.lastSegment()}get ref(){return new Ie(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new vv(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const s=this._document.data.field(_m("DocumentSnapshot.get",e));if(s!==null)return this._userDataWriter.convertValue(s)}}}class vv extends Cm{data(){return super.data()}}function _m(t,e){return typeof e=="string"?Hi(t,e):e instanceof wr?e._internalPath:e._delegate._internalPath}function yv(t,e,s){let n;return n=t?s&&(s.merge||s.mergeFields)?t.toFirestore(e,s):t.toFirestore(e):e,n}class yo{constructor(e,s){this.hasPendingWrites=e,this.fromCache=s}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class As extends Cm{constructor(e,s,n,o,r,a){super(e,s,n,o,a),this._firestore=e,this._firestoreImpl=e,this.metadata=r}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const s=new Bo(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(s,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,s={}){if(this._document){const n=this._document.data.field(_m("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n,s.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new z(M.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,s={};return s.type=As._jsonSchemaVersion,s.bundle="",s.bundleSource="DocumentSnapshot",s.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?s:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),s.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),s)}}As._jsonSchemaVersion="firestore/documentSnapshot/1.0",As._jsonSchema={type:ge("string",As._jsonSchemaVersion),bundleSource:ge("string","DocumentSnapshot"),bundleName:ge("string"),bundle:ge("string")};class Bo extends As{data(e={}){return super.data(e)}}class Sn{constructor(e,s,n,o){this._firestore=e,this._userDataWriter=s,this._snapshot=o,this.metadata=new yo(o.hasPendingWrites,o.fromCache),this.query=n}get docs(){const e=[];return this.forEach((s=>e.push(s))),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,s){this._snapshot.docs.forEach((n=>{e.call(s,new Bo(this._firestore,this._userDataWriter,n.key,n,new yo(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(e={}){const s=!!e.includeMetadataChanges;if(s&&this._snapshot.excludesMetadataChanges)throw new z(M.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===s||(this._cachedChanges=(function(o,r){if(o._snapshot.oldDocs.isEmpty()){let a=0;return o._snapshot.docChanges.map((l=>{const c=new Bo(o._firestore,o._userDataWriter,l.doc.key,l.doc,new yo(o._snapshot.mutatedKeys.has(l.doc.key),o._snapshot.fromCache),o.query.converter);return l.doc,{type:"added",doc:c,oldIndex:-1,newIndex:a++}}))}{let a=o._snapshot.oldDocs;return o._snapshot.docChanges.filter((l=>r||l.type!==3)).map((l=>{const c=new Bo(o._firestore,o._userDataWriter,l.doc.key,l.doc,new yo(o._snapshot.mutatedKeys.has(l.doc.key),o._snapshot.fromCache),o.query.converter);let d=-1,p=-1;return l.type!==0&&(d=a.indexOf(l.doc.key),a=a.delete(l.doc.key)),l.type!==1&&(a=a.add(l.doc),p=a.indexOf(l.doc.key)),{type:xv(l.type),doc:c,oldIndex:d,newIndex:p}}))}})(this,s),this._cachedChangesIncludeMetadataChanges=s),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new z(M.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=Sn._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=wi.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const s=[],n=[],o=[];return this.docs.forEach((r=>{r._document!==null&&(s.push(r._document),n.push(this._userDataWriter.convertObjectMap(r._document.data.value.mapValue.fields,"previous")),o.push(r.ref.path))})),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function xv(t){switch(t){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return Y(61501,{type:t})}}Sn._jsonSchemaVersion="firestore/querySnapshot/1.0",Sn._jsonSchema={type:ge("string",Sn._jsonSchemaVersion),bundleSource:ge("string","QuerySnapshot"),bundleName:ge("string"),bundle:ge("string")};function wv(t,e,s){t=jo(t,Ie);const n=jo(t.firestore,Oi),o=yv(t.converter,e,s);return Am(n,[pv(Im(n),"setDoc",t._key,o,t.converter!==null,s).toMutation(t._key,nt.none())])}function Ev(t,e,s,...n){t=jo(t,Ie);const o=jo(t.firestore,Oi),r=Im(o);let a;return a=typeof(e=gt(e))=="string"||e instanceof wr?fv(r,"updateDoc",t._key,e,s,n):gv(r,"updateDoc",t._key,e),Am(o,[a.toMutation(t._key,nt.exists(!0))])}function Am(t,e){return(function(n,o){const r=new Zt;return n.asyncQueue.enqueueAndForget((async()=>Qb(await rv(n),o,r))),r.promise})(lv(t),e)}function Iv(...t){return new qi("arrayUnion",t)}(function(e,s=!0){(function(o){zs=o})(If),$t(new Pt("firestore",((n,{instanceIdentifier:o,options:r})=>{const a=n.getProvider("app").getImmediate(),l=new Oi(new Nf(n.getProvider("auth-internal")),new Ff(a,n.getProvider("app-check-internal")),(function(d,p){if(!Object.prototype.hasOwnProperty.apply(d.options,["projectId"]))throw new z(M.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new zo(d.options.projectId,p)})(a,o),a);return r={useFetchStreams:s,...r},l._setSettings(r),l}),"PUBLIC").setMultipleInstances(!0)),mt(Mc,Nc,e),mt(Mc,Nc,"esm2020")})();const Pm="@firebase/installations",Ui="0.6.19";const $m=1e4,Dm=`w:${Ui}`,Lm="FIS_v2",Sv="https://firebaseinstallations.googleapis.com/v1",Tv=3600*1e3,kv="installations",Cv="Installations";const _v={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},ds=new mr(kv,Cv,_v);function Rm(t){return t instanceof hs&&t.code.includes("request-failed")}function Mm({projectId:t}){return`${Sv}/projects/${t}/installations`}function Nm(t){return{token:t.token,requestStatus:2,expiresIn:Pv(t.expiresIn),creationTime:Date.now()}}async function Bm(t,e){const n=(await e.json()).error;return ds.create("request-failed",{requestName:t,serverCode:n.code,serverMessage:n.message,serverStatus:n.status})}function Vm({apiKey:t}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t})}function Av(t,{refreshToken:e}){const s=Vm(t);return s.append("Authorization",$v(e)),s}async function Fm(t){const e=await t();return e.status>=500&&e.status<600?t():e}function Pv(t){return Number(t.replace("s","000"))}function $v(t){return`${Lm} ${t}`}async function Dv({appConfig:t,heartbeatServiceProvider:e},{fid:s}){const n=Mm(t),o=Vm(t),r=e.getImmediate({optional:!0});if(r){const d=await r.getHeartbeatsHeader();d&&o.append("x-firebase-client",d)}const a={fid:s,authVersion:Lm,appId:t.appId,sdkVersion:Dm},l={method:"POST",headers:o,body:JSON.stringify(a)},c=await Fm(()=>fetch(n,l));if(c.ok){const d=await c.json();return{fid:d.fid||s,registrationStatus:2,refreshToken:d.refreshToken,authToken:Nm(d.authToken)}}else throw await Bm("Create Installation",c)}function Om(t){return new Promise(e=>{setTimeout(e,t)})}function Lv(t){return btoa(String.fromCharCode(...t)).replace(/\+/g,"-").replace(/\//g,"_")}const Rv=/^[cdef][\w-]{21}$/,Ya="";function Mv(){try{const t=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(t),t[0]=112+t[0]%16;const s=Nv(t);return Rv.test(s)?s:Ya}catch{return Ya}}function Nv(t){return Lv(t).substr(0,22)}function Tr(t){return`${t.appName}!${t.appId}`}const qm=new Map;function jm(t,e){const s=Tr(t);Hm(s,e),Bv(s,e)}function Hm(t,e){const s=qm.get(t);if(s)for(const n of s)n(e)}function Bv(t,e){const s=Vv();s&&s.postMessage({key:t,fid:e}),Fv()}let Qt=null;function Vv(){return!Qt&&"BroadcastChannel"in self&&(Qt=new BroadcastChannel("[Firebase] FID Change"),Qt.onmessage=t=>{Hm(t.data.key,t.data.fid)}),Qt}function Fv(){qm.size===0&&Qt&&(Qt.close(),Qt=null)}const Ov="firebase-installations-database",qv=1,us="firebase-installations-store";let ba=null;function zi(){return ba||(ba=pr(Ov,qv,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(us)}}})),ba}async function er(t,e){const s=Tr(t),o=(await zi()).transaction(us,"readwrite"),r=o.objectStore(us),a=await r.get(s);return await r.put(e,s),await o.done,(!a||a.fid!==e.fid)&&jm(t,e.fid),e}async function Um(t){const e=Tr(t),n=(await zi()).transaction(us,"readwrite");await n.objectStore(us).delete(e),await n.done}async function kr(t,e){const s=Tr(t),o=(await zi()).transaction(us,"readwrite"),r=o.objectStore(us),a=await r.get(s),l=e(a);return l===void 0?await r.delete(s):await r.put(l,s),await o.done,l&&(!a||a.fid!==l.fid)&&jm(t,l.fid),l}async function Wi(t){let e;const s=await kr(t.appConfig,n=>{const o=jv(n),r=Hv(t,o);return e=r.registrationPromise,r.installationEntry});return s.fid===Ya?{installationEntry:await e}:{installationEntry:s,registrationPromise:e}}function jv(t){const e=t||{fid:Mv(),registrationStatus:0};return zm(e)}function Hv(t,e){if(e.registrationStatus===0){if(!navigator.onLine){const o=Promise.reject(ds.create("app-offline"));return{installationEntry:e,registrationPromise:o}}const s={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},n=Uv(t,s);return{installationEntry:s,registrationPromise:n}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:zv(t)}:{installationEntry:e}}async function Uv(t,e){try{const s=await Dv(t,e);return er(t.appConfig,s)}catch(s){throw Rm(s)&&s.customData.serverCode===409?await Um(t.appConfig):await er(t.appConfig,{fid:e.fid,registrationStatus:0}),s}}async function zv(t){let e=await wd(t.appConfig);for(;e.registrationStatus===1;)await Om(100),e=await wd(t.appConfig);if(e.registrationStatus===0){const{installationEntry:s,registrationPromise:n}=await Wi(t);return n||s}return e}function wd(t){return kr(t,e=>{if(!e)throw ds.create("installation-not-found");return zm(e)})}function zm(t){return Wv(t)?{fid:t.fid,registrationStatus:0}:t}function Wv(t){return t.registrationStatus===1&&t.registrationTime+$m<Date.now()}async function Gv({appConfig:t,heartbeatServiceProvider:e},s){const n=Kv(t,s),o=Av(t,s),r=e.getImmediate({optional:!0});if(r){const d=await r.getHeartbeatsHeader();d&&o.append("x-firebase-client",d)}const a={installation:{sdkVersion:Dm,appId:t.appId}},l={method:"POST",headers:o,body:JSON.stringify(a)},c=await Fm(()=>fetch(n,l));if(c.ok){const d=await c.json();return Nm(d)}else throw await Bm("Generate Auth Token",c)}function Kv(t,{fid:e}){return`${Mm(t)}/${e}/authTokens:generate`}async function Gi(t,e=!1){let s;const n=await kr(t.appConfig,r=>{if(!Wm(r))throw ds.create("not-registered");const a=r.authToken;if(!e&&Xv(a))return r;if(a.requestStatus===1)return s=Jv(t,e),r;{if(!navigator.onLine)throw ds.create("app-offline");const l=Zv(r);return s=Qv(t,l),l}});return s?await s:n.authToken}async function Jv(t,e){let s=await Ed(t.appConfig);for(;s.authToken.requestStatus===1;)await Om(100),s=await Ed(t.appConfig);const n=s.authToken;return n.requestStatus===0?Gi(t,e):n}function Ed(t){return kr(t,e=>{if(!Wm(e))throw ds.create("not-registered");const s=e.authToken;return ey(s)?{...e,authToken:{requestStatus:0}}:e})}async function Qv(t,e){try{const s=await Gv(t,e),n={...e,authToken:s};return await er(t.appConfig,n),s}catch(s){if(Rm(s)&&(s.customData.serverCode===401||s.customData.serverCode===404))await Um(t.appConfig);else{const n={...e,authToken:{requestStatus:0}};await er(t.appConfig,n)}throw s}}function Wm(t){return t!==void 0&&t.registrationStatus===2}function Xv(t){return t.requestStatus===2&&!Yv(t)}function Yv(t){const e=Date.now();return e<t.creationTime||t.creationTime+t.expiresIn<e+Tv}function Zv(t){const e={requestStatus:1,requestTime:Date.now()};return{...t,authToken:e}}function ey(t){return t.requestStatus===1&&t.requestTime+$m<Date.now()}async function ty(t){const e=t,{installationEntry:s,registrationPromise:n}=await Wi(e);return n?n.catch(console.error):Gi(e).catch(console.error),s.fid}async function sy(t,e=!1){const s=t;return await ny(s),(await Gi(s,e)).token}async function ny(t){const{registrationPromise:e}=await Wi(t);e&&await e}function oy(t){if(!t||!t.options)throw va("App Configuration");if(!t.name)throw va("App Name");const e=["projectId","apiKey","appId"];for(const s of e)if(!t.options[s])throw va(s);return{appName:t.name,projectId:t.options.projectId,apiKey:t.options.apiKey,appId:t.options.appId}}function va(t){return ds.create("missing-app-config-values",{valueName:t})}const Gm="installations",ry="installations-internal",ay=t=>{const e=t.getProvider("app").getImmediate(),s=oy(e),n=Eu(e,"heartbeat");return{app:e,appConfig:s,heartbeatServiceProvider:n,_delete:()=>Promise.resolve()}},iy=t=>{const e=t.getProvider("app").getImmediate(),s=Eu(e,Gm).getImmediate();return{getId:()=>ty(s),getToken:o=>sy(s,o)}};function ly(){$t(new Pt(Gm,ay,"PUBLIC")),$t(new Pt(ry,iy,"PRIVATE"))}ly();mt(Pm,Ui);mt(Pm,Ui,"esm2020");const cy="/firebase-messaging-sw.js",dy="/firebase-cloud-messaging-push-scope",Km="BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4",uy="https://fcmregistrations.googleapis.com/v1",Jm="google.c.a.c_id",my="google.c.a.c_l",py="google.c.a.ts",hy="google.c.a.e",Id=1e4;var Sd;(function(t){t[t.DATA_MESSAGE=1]="DATA_MESSAGE",t[t.DISPLAY_NOTIFICATION=3]="DISPLAY_NOTIFICATION"})(Sd||(Sd={}));var Vn;(function(t){t.PUSH_RECEIVED="push-received",t.NOTIFICATION_CLICKED="notification-clicked"})(Vn||(Vn={}));function it(t){const e=new Uint8Array(t);return btoa(String.fromCharCode(...e)).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}function gy(t){const e="=".repeat((4-t.length%4)%4),s=(t+e).replace(/\-/g,"+").replace(/_/g,"/"),n=atob(s),o=new Uint8Array(n.length);for(let r=0;r<n.length;++r)o[r]=n.charCodeAt(r);return o}const ya="fcm_token_details_db",fy=5,Td="fcm_token_object_Store";async function by(t){if("databases"in indexedDB&&!(await indexedDB.databases()).map(r=>r.name).includes(ya))return null;let e=null;return(await pr(ya,fy,{upgrade:async(n,o,r,a)=>{if(o<2||!n.objectStoreNames.contains(Td))return;const l=a.objectStore(Td),c=await l.index("fcmSenderId").get(t);if(await l.clear(),!!c){if(o===2){const d=c;if(!d.auth||!d.p256dh||!d.endpoint)return;e={token:d.fcmToken,createTime:d.createTime??Date.now(),subscriptionOptions:{auth:d.auth,p256dh:d.p256dh,endpoint:d.endpoint,swScope:d.swScope,vapidKey:typeof d.vapidKey=="string"?d.vapidKey:it(d.vapidKey)}}}else if(o===3){const d=c;e={token:d.fcmToken,createTime:d.createTime,subscriptionOptions:{auth:it(d.auth),p256dh:it(d.p256dh),endpoint:d.endpoint,swScope:d.swScope,vapidKey:it(d.vapidKey)}}}else if(o===4){const d=c;e={token:d.fcmToken,createTime:d.createTime,subscriptionOptions:{auth:it(d.auth),p256dh:it(d.p256dh),endpoint:d.endpoint,swScope:d.swScope,vapidKey:it(d.vapidKey)}}}}}})).close(),await da(ya),await da("fcm_vapid_details_db"),await da("undefined"),vy(e)?e:null}function vy(t){if(!t||!t.subscriptionOptions)return!1;const{subscriptionOptions:e}=t;return typeof t.createTime=="number"&&t.createTime>0&&typeof t.token=="string"&&t.token.length>0&&typeof e.auth=="string"&&e.auth.length>0&&typeof e.p256dh=="string"&&e.p256dh.length>0&&typeof e.endpoint=="string"&&e.endpoint.length>0&&typeof e.swScope=="string"&&e.swScope.length>0&&typeof e.vapidKey=="string"&&e.vapidKey.length>0}const yy="firebase-messaging-database",xy=1,Fn="firebase-messaging-store";let xa=null;function Qm(){return xa||(xa=pr(yy,xy,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(Fn)}}})),xa}async function wy(t){const e=Xm(t),n=await(await Qm()).transaction(Fn).objectStore(Fn).get(e);if(n)return n;{const o=await by(t.appConfig.senderId);if(o)return await Ki(t,o),o}}async function Ki(t,e){const s=Xm(t),o=(await Qm()).transaction(Fn,"readwrite");return await o.objectStore(Fn).put(e,s),await o.done,e}function Xm({appConfig:t}){return t.appId}const Ey={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"only-available-in-window":"This method is available in a Window context.","only-available-in-sw":"This method is available in a service worker context.","permission-default":"The notification permission was not granted and dismissed instead.","permission-blocked":"The notification permission was not granted and blocked instead.","unsupported-browser":"This browser doesn't support the API's required to use the Firebase SDK.","indexed-db-unsupported":"This browser doesn't support indexedDb.open() (ex. Safari iFrame, Firefox Private Browsing, etc)","failed-service-worker-registration":"We are unable to register the default service worker. {$browserErrorMessage}","token-subscribe-failed":"A problem occurred while subscribing the user to FCM: {$errorInfo}","token-subscribe-no-token":"FCM returned no token when subscribing the user to push.","token-unsubscribe-failed":"A problem occurred while unsubscribing the user from FCM: {$errorInfo}","token-update-failed":"A problem occurred while updating the user from FCM: {$errorInfo}","token-update-no-token":"FCM returned no token when updating the user to push.","use-sw-after-get-token":"The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.","invalid-sw-registration":"The input to useServiceWorker() must be a ServiceWorkerRegistration.","invalid-bg-handler":"The input to setBackgroundMessageHandler() must be a function.","invalid-vapid-key":"The public VAPID key must be a string.","use-vapid-key-after-get-token":"The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used."},Oe=new mr("messaging","Messaging",Ey);async function Iy(t,e){const s=await Qi(t),n=Ym(e),o={method:"POST",headers:s,body:JSON.stringify(n)};let r;try{r=await(await fetch(Ji(t.appConfig),o)).json()}catch(a){throw Oe.create("token-subscribe-failed",{errorInfo:a?.toString()})}if(r.error){const a=r.error.message;throw Oe.create("token-subscribe-failed",{errorInfo:a})}if(!r.token)throw Oe.create("token-subscribe-no-token");return r.token}async function Sy(t,e){const s=await Qi(t),n=Ym(e.subscriptionOptions),o={method:"PATCH",headers:s,body:JSON.stringify(n)};let r;try{r=await(await fetch(`${Ji(t.appConfig)}/${e.token}`,o)).json()}catch(a){throw Oe.create("token-update-failed",{errorInfo:a?.toString()})}if(r.error){const a=r.error.message;throw Oe.create("token-update-failed",{errorInfo:a})}if(!r.token)throw Oe.create("token-update-no-token");return r.token}async function Ty(t,e){const n={method:"DELETE",headers:await Qi(t)};try{const r=await(await fetch(`${Ji(t.appConfig)}/${e}`,n)).json();if(r.error){const a=r.error.message;throw Oe.create("token-unsubscribe-failed",{errorInfo:a})}}catch(o){throw Oe.create("token-unsubscribe-failed",{errorInfo:o?.toString()})}}function Ji({projectId:t}){return`${uy}/projects/${t}/registrations`}async function Qi({appConfig:t,installations:e}){const s=await e.getToken();return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t.apiKey,"x-goog-firebase-installations-auth":`FIS ${s}`})}function Ym({p256dh:t,auth:e,endpoint:s,vapidKey:n}){const o={web:{endpoint:s,auth:e,p256dh:t}};return n!==Km&&(o.web.applicationPubKey=n),o}const ky=10080*60*1e3;async function Cy(t){const e=await Ay(t.swRegistration,t.vapidKey),s={vapidKey:t.vapidKey,swScope:t.swRegistration.scope,endpoint:e.endpoint,auth:it(e.getKey("auth")),p256dh:it(e.getKey("p256dh"))},n=await wy(t.firebaseDependencies);if(n){if(Py(n.subscriptionOptions,s))return Date.now()>=n.createTime+ky?_y(t,{token:n.token,createTime:Date.now(),subscriptionOptions:s}):n.token;try{await Ty(t.firebaseDependencies,n.token)}catch(o){console.warn(o)}return kd(t.firebaseDependencies,s)}else return kd(t.firebaseDependencies,s)}async function _y(t,e){try{const s=await Sy(t.firebaseDependencies,e),n={...e,token:s,createTime:Date.now()};return await Ki(t.firebaseDependencies,n),s}catch(s){throw s}}async function kd(t,e){const n={token:await Iy(t,e),createTime:Date.now(),subscriptionOptions:e};return await Ki(t,n),n.token}async function Ay(t,e){const s=await t.pushManager.getSubscription();return s||t.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:gy(e)})}function Py(t,e){const s=e.vapidKey===t.vapidKey,n=e.endpoint===t.endpoint,o=e.auth===t.auth,r=e.p256dh===t.p256dh;return s&&n&&o&&r}function Cd(t){const e={from:t.from,collapseKey:t.collapse_key,messageId:t.fcmMessageId};return $y(e,t),Dy(e,t),Ly(e,t),e}function $y(t,e){if(!e.notification)return;t.notification={};const s=e.notification.title;s&&(t.notification.title=s);const n=e.notification.body;n&&(t.notification.body=n);const o=e.notification.image;o&&(t.notification.image=o);const r=e.notification.icon;r&&(t.notification.icon=r)}function Dy(t,e){e.data&&(t.data=e.data)}function Ly(t,e){if(!e.fcmOptions&&!e.notification?.click_action)return;t.fcmOptions={};const s=e.fcmOptions?.link??e.notification?.click_action;s&&(t.fcmOptions.link=s);const n=e.fcmOptions?.analytics_label;n&&(t.fcmOptions.analyticsLabel=n)}function Ry(t){return typeof t=="object"&&!!t&&Jm in t}function My(t){if(!t||!t.options)throw wa("App Configuration Object");if(!t.name)throw wa("App Name");const e=["projectId","apiKey","appId","messagingSenderId"],{options:s}=t;for(const n of e)if(!s[n])throw wa(n);return{appName:t.name,projectId:s.projectId,apiKey:s.apiKey,appId:s.appId,senderId:s.messagingSenderId}}function wa(t){return Oe.create("missing-app-config-values",{valueName:t})}class Ny{constructor(e,s,n){this.deliveryMetricsExportedToBigQueryEnabled=!1,this.onBackgroundMessageHandler=null,this.onMessageHandler=null,this.logEvents=[],this.isLogServiceStarted=!1;const o=My(e);this.firebaseDependencies={app:e,appConfig:o,installations:s,analyticsProvider:n}}_delete(){return Promise.resolve()}}async function By(t){try{t.swRegistration=await navigator.serviceWorker.register(cy,{scope:dy}),t.swRegistration.update().catch(()=>{}),await Vy(t.swRegistration)}catch(e){throw Oe.create("failed-service-worker-registration",{browserErrorMessage:e?.message})}}async function Vy(t){return new Promise((e,s)=>{const n=setTimeout(()=>s(new Error(`Service worker not registered after ${Id} ms`)),Id),o=t.installing||t.waiting;t.active?(clearTimeout(n),e()):o?o.onstatechange=r=>{r.target?.state==="activated"&&(o.onstatechange=null,clearTimeout(n),e())}:(clearTimeout(n),s(new Error("No incoming service worker found.")))})}async function Fy(t,e){if(!e&&!t.swRegistration&&await By(t),!(!e&&t.swRegistration)){if(!(e instanceof ServiceWorkerRegistration))throw Oe.create("invalid-sw-registration");t.swRegistration=e}}async function Oy(t,e){e?t.vapidKey=e:t.vapidKey||(t.vapidKey=Km)}async function Zm(t,e){if(!navigator)throw Oe.create("only-available-in-window");if(Notification.permission==="default"&&await Notification.requestPermission(),Notification.permission!=="granted")throw Oe.create("permission-blocked");return await Oy(t,e?.vapidKey),await Fy(t,e?.serviceWorkerRegistration),Cy(t)}async function qy(t,e,s){const n=jy(e);(await t.firebaseDependencies.analyticsProvider.get()).logEvent(n,{message_id:s[Jm],message_name:s[my],message_time:s[py],message_device_time:Math.floor(Date.now()/1e3)})}function jy(t){switch(t){case Vn.NOTIFICATION_CLICKED:return"notification_open";case Vn.PUSH_RECEIVED:return"notification_foreground";default:throw new Error}}async function Hy(t,e){const s=e.data;if(!s.isFirebaseMessaging)return;t.onMessageHandler&&s.messageType===Vn.PUSH_RECEIVED&&(typeof t.onMessageHandler=="function"?t.onMessageHandler(Cd(s)):t.onMessageHandler.next(Cd(s)));const n=s.data;Ry(n)&&n[hy]==="1"&&await qy(t,s.messageType,n)}const _d="@firebase/messaging",Ad="0.12.23";const Uy=t=>{const e=new Ny(t.getProvider("app").getImmediate(),t.getProvider("installations-internal").getImmediate(),t.getProvider("analytics-internal"));return navigator.serviceWorker.addEventListener("message",s=>Hy(e,s)),e},zy=t=>{const e=t.getProvider("messaging").getImmediate();return{getToken:n=>Zm(e,n)}};function Wy(){$t(new Pt("messaging",Uy,"PUBLIC")),$t(new Pt("messaging-internal",zy,"PRIVATE")),mt(_d,Ad),mt(_d,Ad,"esm2020")}function Gy(t,e){if(!navigator)throw Oe.create("only-available-in-window");return t.onMessageHandler=e,()=>{t.onMessageHandler=null}}async function Ky(t,e){return t=gt(t),Zm(t,e)}function Jy(t,e){return t=gt(t),Gy(t,e)}Wy();const Qy="BDA-IaH_jjWBRwHbuFcB56I25jKHpchx34yZtv_6iIo_yV2tz_yIZYS3hfntDaN5Slf4ch8ZEJCIt4D7LIWX4mY";let Pd=!1;async function ep(){if(window.Capacitor&&window.Capacitor.isNativePlatform()){try{await Ne.removeAllListeners(),await Ne.addListener("registration",async s=>{tp(s.value,!0)}),await Ne.addListener("pushNotificationReceived",s=>{});let e=await Ne.checkPermissions();e.receive==="prompt"&&(e=await Ne.requestPermissions()),e.receive==="granted"&&await Ne.register()}catch(e){console.error(e)}return}"Notification"in window&&(Notification.permission==="granted"?Xy():Notification.permission==="default"&&console.log("[Push Web] Aguardando interação do utilizador para pedir permissão (iOS Requirement)."))}async function Xy(){if("serviceWorker"in navigator)try{const t=await navigator.serviceWorker.register("/firebase-messaging-sw.js"),e=await Ky(mc,{vapidKey:Qy,serviceWorkerRegistration:t});e&&(console.log("[Push Web] Token:",e),await tp(e,!1)),Pd||(Jy(mc,s=>{console.log("[Push Web] Foreground:",s),s.notification&&k(s.notification.title,s.notification.body,"info",!0)}),Pd=!0)}catch(t){console.error("[Push Web] Falha no registo:",t)}}async function tp(t,e){const s=_e.currentUser;if(s)try{const n=iv(Ae,"users",s.uid);try{await Ev(n,{fcmTokens:Iv(t),lastLoginAt:new Date().toISOString(),platform:e?"android_native":"pwa_web"})}catch(o){o.code==="not-found"&&await wv(n,{email:s.email,fcmTokens:[t],platform:e?"android_native":"pwa_web"},{merge:!0})}}catch(n){console.error(n)}}const Yy=(t,e,s="all",n="all")=>{const o=new URLSearchParams({startDate:t,endDate:e});return s&&s!=="all"&&o.append("professionalId",s),n&&n!=="all"&&o.append("costCenterId",n),F(`/api/reports/indicators?${o.toString()}`)},Zy=t=>t?F(`/api/financial/cost-centers/${t}`):Promise.resolve([]),ex=({establishmentId:t,startDate:e,endDate:s,cashierSessionId:n})=>{const o=new URLSearchParams({startDate:e,endDate:s});return n&&n!=="all"&&o.append("cashierSessionId",n),t&&o.append("establishmentId",t),F(`/api/reports/sales?${o.toString()}`)},tx=()=>F("/api/reports/summary",{method:"GET"}),Cr=(t,e,s,n="all")=>{const o=`/api/blockages/${t}?startDate=${e}&endDate=${s}&professionalId=${n}`;return F(o)},_r=t=>F("/api/blockages",{method:"POST",body:JSON.stringify(t)}),Xi=t=>F(`/api/blockages/${t}`,{method:"DELETE"}),sp=t=>F("/api/blockages/batch-delete",{method:"POST",body:JSON.stringify({ids:t})}),np=t=>t?String(t).replace(/\D/g,""):"",Ws=(t,e="",s=null)=>{let n=`/api/clients/${t}`;const o=[];return e&&e.trim().length>0&&o.push(`search=${encodeURIComponent(e.trim())}`),s&&o.push(`limit=${s}`),o.length>0&&(n+=`?${o.join("&")}`),F(n)},sx=t=>{if(!t)throw new Error("ID do cliente é obrigatório");return F(`/api/clients/id/${encodeURIComponent(t)}`)},Yi=t=>{if(!t.phone)throw new Error("O telefone é obrigatório para criar o cliente.");const e=np(t.phone);return F(`/api/clients/${e}`,{method:"PUT",body:JSON.stringify(t)})},op=(t,e)=>F(`/api/clients/${encodeURIComponent(t)}`,{method:"PUT",body:JSON.stringify(e)}),rp=t=>F(`/api/clients/${encodeURIComponent(t)}`,{method:"DELETE"}),nx=(t,e,s)=>{const n=encodeURIComponent(e),o=encodeURIComponent(s),r=`/api/clients/history/${t}?clientName=${n}&clientPhone=${o}`;return F(r)},ox=(t,e,s)=>{const n=encodeURIComponent(e),o=encodeURIComponent(s),r=`/api/clients/loyalty-history/${t}?clientName=${n}&clientPhone=${o}`;return F(r)},rx=(t,e,s,n)=>F("/api/clients/redeem",{method:"POST",body:JSON.stringify({establishmentId:t,clientName:e,clientPhone:s,rewardData:n})}),ax=(t,e)=>{const s=np(e);return F(`/api/clients/id/${s}`).catch(()=>null)};function P(t){return t==null?"":String(t).replace(/[&<>'"]/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[e])}function ap(t,e=800,s=800,n=.7){return new Promise((o,r)=>{if(!t.type.match(/image.*/))return r(new Error("O ficheiro selecionado não é uma imagem."));const a=new FileReader;a.readAsDataURL(t),a.onload=l=>{const c=new Image;c.src=l.target.result,c.onload=()=>{let d=c.width,p=c.height;d>p?d>e&&(p*=e/d,d=e):p>s&&(d*=s/p,p=s);const h=document.createElement("canvas");h.width=d,h.height=p,h.getContext("2d").drawImage(c,0,0,d,p);const x=h.toDataURL("image/jpeg",n);o(x)},c.onerror=d=>r(new Error("Erro ao carregar a imagem para processamento."))},a.onerror=l=>r(new Error("Erro ao ler o ficheiro."))})}const $d=document.getElementById("content");let Dd=!1;const Za=[{bg:"#e0e7ff",border:"#4f46e5",main:"#4f46e5"},{bg:"#d1fae5",border:"#059669",main:"#059669"},{bg:"#ffe4e6",border:"#e11d48",main:"#e11d48"},{bg:"#fef3c7",border:"#d97706",main:"#d97706"},{bg:"#cffafe",border:"#0e7490",main:"#0e7490"},{bg:"#e0f2fe",border:"#0284c7",main:"#0284c7"},{bg:"#ede9fe",border:"#7c3aed",main:"#7c3aed"},{bg:"#fce7f3",border:"#db2777",main:"#db2777"}];let Qn=[],Ar=[],qs={},Ps=[],K={currentView:"list",weekViewDays:7,currentDate:new Date,selectedProfessionalId:"all",profSearchTerm:"",showInactiveProfs:!1,scrollToAppointmentId:null},j={step:1,data:{id:null,clientName:"",clientPhone:"",selectedServiceIds:[],professionalId:null,professionalName:"",date:null,time:null,redeemedReward:null,clientHasRewards:!1,clientLoyaltyPoints:0}};function ix(t){return new Intl.DateTimeFormat("pt-BR",{weekday:"short",day:"2-digit",month:"short"}).format(t).replace(/\./g,"")}function ip(t){const e=new Date(t);if(e.setHours(0,0,0,0),K.currentView==="week"&&K.weekViewDays===7){const s=e.getDay(),n=e.getDate()-s+(s===0?-6:1);return new Date(e.setDate(n))}return e}function tr(){const t=document.getElementById("profSelectorContainer"),e=K.profSearchTerm.toLowerCase();if(!t||!w.professionals)return;let s=w.professionals.filter(r=>K.showInactiveProfs||r.status!=="inactive");e&&(s=s.filter(r=>r.name.toLowerCase().includes(e)));const o=[...[{id:"all",name:"Todos",photo:null,status:"active"}],...s];t.innerHTML=o.map(r=>{const a=K.selectedProfessionalId===r.id,l=r.name==="Todos"?"Todos":r.name.split(" ")[0],c=r.name==="Todos"?"T":r.name.charAt(0).toUpperCase(),d=r.status!=="inactive",p=P(l),h=Za[0],f=r.id!=="all"&&w.professionalColors.get(r.id)||h,x=r.photo||`https://placehold.co/64x64/${f.main?.replace("#","")||"E0E7FF"}/${f.light?.replace("#","")||"4F46E5"}?text=${c}`,S=r.id==="all"?"#e0e7ff":f.light,_=r.id==="all"?"#4f46e5":f.main,R=`border: 3px solid ${a?f.border:"transparent"}; box-shadow: ${a?"0 0 0 2px "+f.border:"none"};`;return`
            <div class="prof-card ${a?"selected":""} ${d?"":"opacity-50"}" 
                 data-action="select-professional" 
                 data-prof-id="${r.id}">
                ${r.id==="all"?`<div class="prof-card-all-placeholder" style="background-color: ${S}; color: ${_}; ${R}">
                           ${c}
                          </div>`:`<img src="${x}" alt="${p}" class="prof-card-photo" style="${R}" />`}
                <span class="prof-card-name">${p}</span>
            </div>
        `}).join("")}function lx(t,e,s,n,o){const r=(t||"").replace(/\D/g,""),a=new Date(o).toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit"}),l=new Date(o).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),c=`Olá, ${e}! Você tem um agendamento de ${s} com o(a) profissional ${n} para o dia ${a} às ${l}. Podemos confirmar? Agradecemos a preferência!`,d=encodeURIComponent(c);return`https://wa.me/${r}?text=${d}`}function cx(t){const e=document.getElementById("agenda-view");if(!e)return;if(t.sort((n,o)=>new Date(n.startTime)-new Date(o.startTime)),t.length===0){e.innerHTML='<div class="text-center p-10 text-gray-500"><svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path vector-effect="non-scaling-stroke" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg><h3 class="mt-2 text-sm font-medium text-gray-900">Nenhum agendamento ou bloqueio</h3><p class="mt-1 text-sm text-gray-500">Não há eventos para o dia e filtros selecionados.</p></div>';return}const s=t.map(n=>{const o=new Date(n.startTime),r=new Date(n.endTime),a=o.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),l=r.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),c=w.professionalColors.get(n.professionalId)||{},d=P(n.reason),p=P(n.professionalName),h=P(n.clientName),f=P(n.serviceName);if(n.type==="blockage")return`
                <div class="appointment-list-card bg-red-50" style="border-left-color: ${c.border};">
                    <div class="time-info">
                        <p class="font-bold text-md">${a}</p>
                        <p class="text-xs text-gray-500">${l}</p>
                    </div>
                    <div class="details-info min-w-0">
                        <p class="font-bold text-red-800 truncate">${d}</p>
                        <p class="text-sm text-gray-600 truncate">com ${p}</p>
                    </div>
                    <div class="status-info">
                        <span class="status-badge bg-red-100 text-red-800">Bloqueio</span>
                    </div>
                </div>`;const x=n.status==="completed",S=x?"bg-green-100 text-green-800":"bg-yellow-100 text-yellow-800",_=x?"Finalizado":"Aberto",D=JSON.stringify(n).replace(/'/g,"&apos;"),R=n.redeemedReward?.points>0,O=n.hasRewards&&!R,N=lx(n.clientPhone,n.clientName,n.serviceName,n.professionalName,n.startTime);return`
            <div class="appointment-list-card" data-appointment='${D}' style="border-left-color: ${c.border};">
                
                <div class="time-info" data-action="open-comanda">
                    <p class="font-bold text-md">${a}</p>
                    <p class="text-xs text-gray-500">${l}</p>
                </div>

                <div class="details-info min-w-0" data-action="open-comanda">
                    <p class="font-bold text-gray-800 truncate">${O?"🎁 ":""}${h}</p>
                    <p class="text-sm text-gray-600 truncate">${f}</p>
                    <p class="text-xs text-gray-500 truncate">com ${p||"Indefinido"}</p>
                    
                    ${R?'<p class="text-xs font-semibold text-purple-600">Resgate de Prémio</p>':""}
                </div>

                <div class="status-info">
                    <span class="status-badge ${S} mb-1">${_}</span>
                    <div class="card-actions flex gap-1 items-center">
                        ${x?`
                            <button data-action="edit-appointment" data-appointment='${D}' class="action-btn opacity-40 cursor-not-allowed" title="Finalizado - Não editável" disabled><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z"></path></svg></button>
                        `:`
                            <a href="${N}" target="_blank" class="action-btn text-green-500 hover:text-green-700 p-1" title="Enviar Confirmação WhatsApp">
                                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12.036 2a10 10 0 100 20 10 10 0 000-20zM17.5 14.8c-.24.125-1.465.716-1.696.804-.23.09-.49.135-.75.045-.26-.09-.982-.322-1.87-.965-.888-.643-1.474-1.442-1.64-1.748-.166-.307-.015-.467.106-.615.116-.149.23-.388.344-.582.113-.193.15-.327.1-.462-.05-.136-.264-.322-.544-.654-.28-.332-.572-.782-.828-.958-.255-.176-.438-.158-.61-.158-.173 0-.374-.022-.574-.022-.2 0-.54.075-.826.375-.285.3-.99.965-.99 2.355 0 1.43 1.018 2.872 1.16 3.072.14.2 2 3.047 4.86 4.218 2.86 1.17 2.86.786 3.376 1.054.516.268 1.49.462 1.696.406.206-.057 1.463-.615 1.67-.887.2-.27.2-.504.14-.615-.058-.11-.23-.166-.48-.306z"/></svg>
                            </a>
                            <button data-action="edit-appointment" data-appointment='${D}' class="action-btn" title="Editar Agendamento"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z"></path></svg></button>
                        `}
                        <button data-action="delete-appointment" data-id="${n.id}" class="action-btn" title="Apagar Agendamento"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
                    </div>
                </div>
            </div>`}).join("");e.innerHTML=`<div class="list-view-container">${s}</div>`}function Zi(){return window.innerWidth<768&&K.currentView==="week"?3:K.weekViewDays}function dx(t){const e=document.getElementById("agenda-view");if(!e)return;const s=["Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sábado"],n=ip(K.currentDate),o=Zi();let r=`<div class="grid divide-x divide-gray-200 min-h-[60vh]" style="grid-template-columns: repeat(${o}, minmax(0, 1fr));">`;for(let a=0;a<o;a++){const l=new Date(n);l.setDate(l.getDate()+a);const c=new Date,d=l.toDateString()===c.toDateString(),p=t.filter(f=>new Date(f.startTime).toDateString()===l.toDateString()).sort((f,x)=>new Date(f.startTime)-new Date(x.startTime));let h='<div class="p-1 space-y-2">';p.length>0?h+=p.map(f=>{const S=new Date(f.startTime).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),_=w.professionalColors.get(f.professionalId)||{bg:"#e5e7eb",border:"#9ca3af"},D=P(f.reason),R=P(f.professionalName),O=P(f.clientName),N=P(f.serviceName);if(f.type==="blockage")return`
                        <div class="p-2 rounded-lg border-l-4 flex flex-col bg-red-100" style="border-left-color: ${_.border};">
                            <span class="font-bold text-xs text-red-900">${S}</span>
                            <div class="mt-1 min-w-0">
                                <p class="font-semibold text-sm text-red-800 truncate">${D}</p>
                                <p class="text-xs text-red-600 truncate">com ${R}</p>
                            </div>
                        </div>
                    `;const B=JSON.stringify(f).replace(/'/g,"&apos;"),H=f.redeemedReward?.points>0,G=f.hasRewards&&!H,T=f.status==="completed";return`
                    <div class="p-2 rounded-lg border-l-4 flex flex-col cursor-pointer" 
                         style="background-color: ${_.bg}; border-left-color: ${_.border};"
                         data-action="open-comanda" data-appointment='${B}'>
                        
                        <div class="flex justify-between items-center">
                            <span class="font-bold text-xs text-gray-900">${S}</span>
                            ${T?'<span class="text-[10px] font-semibold bg-green-200 text-green-800 px-1 rounded-sm">OK</span>':""}
                        </div>

                        <div class="mt-1 min-w-0">
                            <p class="font-semibold text-sm text-gray-800 truncate">${G?"🎁 ":""}${O}</p>
                            <p class="text-xs text-gray-600 truncate">${N}</p>
                            <p class="text-xs text-gray-500 truncate">com ${R||"Indefinido"}</p>
                            ${H?'<p class="text-xs text-purple-600 truncate">Resgate</p>':""}
                        </div>
                        
                        </div>
                `}).join(""):h+='<div class="text-center text-xs text-gray-400 pt-4">Nenhum evento</div>',h+="</div>",r+=`
            <div class="flex flex-col">
                <div class="text-center py-2 border-b ${d?"bg-indigo-100 text-indigo-700":"bg-gray-50"}">
                    <p class="font-bold">${s[l.getDay()]}</p>
                    <p class="text-sm">${l.getDate()}/${l.getMonth()+1}</p>
                </div>
                <div class="flex-grow overflow-y-auto">${h}</div>
            </div>
        `}r+="</div>",e.innerHTML=r}function ux(){const t=w.allEvents.filter(e=>K.selectedProfessionalId==="all"||e.professionalId===K.selectedProfessionalId);K.currentView==="list"?cx(t):dx(t)}async function at(){const t=document.getElementById("agenda-view");if(!t)return;t.innerHTML='<div class="loader mx-auto my-10"></div>';let e,s;const n=document.getElementById("weekRange");if(n){if(K.currentView==="list")e=new Date(K.currentDate),e.setHours(0,0,0,0),s=new Date(K.currentDate),s.setHours(23,59,59,999),n.textContent=ix(e);else{const o=Zi();e=ip(new Date(K.currentDate)),s=new Date(e),s.setDate(e.getDate()+(o-1)),s.setHours(23,59,59,999),n.textContent=`${e.toLocaleDateString("pt-BR",{day:"2-digit",month:"short"})} - ${s.toLocaleDateString("pt-BR",{day:"2-digit",month:"short"})}`}try{const o=await cu(w.establishmentId,e.toISOString(),s.toISOString(),K.selectedProfessionalId==="all"?null:K.selectedProfessionalId),r=await Cr(w.establishmentId,e.toISOString(),s.toISOString(),K.selectedProfessionalId);if(!document.getElementById("agenda-view"))return;const a=r.map(c=>{let d=c.professionalName;if(!d&&c.professionalId){const p=w.professionals?w.professionals.find(h=>h.id===c.professionalId):null;p&&(d=p.name)}return{...c,type:"blockage",professionalName:d||"Não identificado"}}),l=[...o.map(c=>({...c,type:"appointment"})),...a];if(w.allEvents=l,tr(),ux(),K.scrollToAppointmentId){const c=document.querySelector(`[data-appointment*='"id":"${K.scrollToAppointmentId}"']`);c&&(c.scrollIntoView({behavior:"smooth",block:"center"}),c.style.transition="background-color 0.5s ease-in-out",c.style.backgroundColor="#e0e7ff",setTimeout(()=>{c.style.backgroundColor=""},2500)),K.scrollToAppointmentId=null}}catch(o){document.getElementById("agenda-view")&&(document.getElementById("agenda-view").innerHTML='<div class="p-6 text-center text-red-600">Falha ao carregar dados.</div>',k("Erro na Agenda",`Não foi possível carregar a agenda: ${o.message}`,"error"))}}}async function mx(){try{const[t,e,s]=await Promise.all([w.professionals&&w.professionals.length>0?Promise.resolve(w.professionals):ze(w.establishmentId),w.services&&w.services.length>0?Promise.resolve(w.services):ps(w.establishmentId),qs.enabled!==void 0?Promise.resolve(null):ms(w.establishmentId)]);(!w.professionals||w.professionals.length===0)&&(w.professionals=t||[]),(!w.services||w.services.length===0)&&(w.services=e||[]),Ps=[],s&&(qs=s.loyaltyProgram||{enabled:!1}),w.professionals.forEach((n,o)=>{w.professionalColors.set(n.id,Za[o%Za.length])}),tr()}catch(t){console.error("Erro ao popular filtros e dependências do modal:",t),k("Atenção","Não foi possível pré-carregar os dados para agendamento. A abertura do modal pode ser lenta.","error")}}function ei(t){t<1||t>4||(j.step=t,ti(null,!0))}function lp(t,e){const s=document.getElementById("multiServiceToggle"),n=s&&s.checked,o=e.classList.contains("selected"),r=j.data.selectedServiceIds.indexOf(t);if(o)e.classList.remove("selected","border-blue-500"),r>-1&&j.data.selectedServiceIds.splice(r,1);else{if(!n){j.data.selectedServiceIds=[];const a=document.getElementById("apptServicesContainer");a&&a.querySelectorAll(".service-card.selected").forEach(l=>{l.classList.remove("selected","border-blue-500")})}e.classList.add("selected","border-blue-500"),j.data.selectedServiceIds.push(t)}}function cp(t,e){const s=document.querySelector(".professional-step-cards");if(!s)return;s.querySelectorAll(".professional-modal-card").forEach(o=>o.classList.remove("selected","border-blue-500")),e.classList.add("selected","border-blue-500");const n=Ar.find(o=>o.id===t);j.data.professionalId=t,j.data.professionalName=n?n.name:"N/A"}function px(t,e){const s=document.getElementById("availableTimesContainer");s&&(s.querySelectorAll(".time-slot-card").forEach(n=>n.classList.remove("selected")),e.classList.add("selected"),j.data.time=t)}async function Ld(){const t=document.getElementById("apptTotalDuration"),e=document.getElementById("availableTimesContainer");if(!t||!e)return;const s=j.data.professionalId,n=j.data.selectedServiceIds,o=document.getElementById("apptDate").value;j.data.date=o;const r=n.reduce((a,l)=>{const c=Qn.find(d=>d.id===l);return a+(c?c.duration+(c.bufferTime||0):0)},0);if(t.textContent=`${r} min`,r===0||!s||!o){e.innerHTML='<p class="col-span-full text-center text-gray-500">Selecione serviço, profissional e data.</p>';return}e.innerHTML='<div class="loader mx-auto col-span-full"></div>';try{let a=await Th({establishmentId:w.establishmentId,professionalId:s,serviceIds:n,date:o});const l=new Date;if(new Date(o+"T00:00:00").toDateString()===l.toDateString()){const d=l.getHours()*60+l.getMinutes();a=a.filter(p=>{const[h,f]=p.split(":").map(Number);return h*60+f>=d})}if(e.innerHTML="",a.length>0){if(a.forEach(d=>{const p=document.createElement("button");p.type="button",p.className=`time-slot-card p-2 text-sm bg-gray-100 rounded-md hover:bg-gray-200 transition ${j.data.time===d?"selected":""}`,p.textContent=d,p.addEventListener("click",()=>px(d,p)),e.appendChild(p)}),j.data.time){const d=e.querySelector(`[data-action="time-slot"][data-time="${j.data.time}"]`);d&&d.classList.add("selected")}}else e.innerHTML='<p class="col-span-full text-center text-gray-500">Nenhum horário disponível.</p>'}catch(a){console.error("Erro ao buscar horários:",a),e.innerHTML='<p class="col-span-full text-center text-red-500">Erro ao buscar horários.</p>'}}function hx(){const t=document.getElementById("loyaltyRewardsContainer");if(!t)return;const{clientHasRewards:e,clientLoyaltyPoints:s,redeemedReward:n}=j.data,{enabled:o,rewards:r}=qs;if(!o||!e||!r||r.length===0){t.classList.add("hidden"),t.innerHTML="";return}t.classList.remove("hidden");const a=r.filter(c=>s>=c.points);let l=`
        <h4 class="text-md font-semibold text-gray-700 mb-2">🎁 Prêmios Disponíveis (${s} pontos)</h4>
    `;a.length>0?(l+='<div class="space-y-2">',l+=a.map(c=>{const d=n?.reward===c.reward,p=P(c.reward);return`
                <label class="flex items-center p-3 bg-white rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-50">
                    <input type="radio" name="loyaltyReward" class="form-radio text-indigo-600" 
                           value="${p}" 
                           data-points="${c.points}"
                           ${d?"checked":""}>
                    <span class="ml-3">
                        <span class="font-semibold text-gray-800">${p}</span>
                        <span class="text-sm text-gray-600"> (-${c.points} pontos)</span>
                    </span>
                </label>
            `}).join(""),l+="</div>"):l+='<p class="text-sm text-gray-600">Pontos insuficientes para resgatar os prêmios disponíveis.</p>',t.innerHTML=l,t.querySelectorAll('input[name="loyaltyReward"]').forEach(c=>{c.addEventListener("change",d=>{d.target.checked&&(j.data.redeemedReward={reward:d.target.value,points:parseInt(d.target.dataset.points,10)})})}),t.insertAdjacentHTML("beforeend",`
        <label class="flex items-center p-3 mt-2 bg-white rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-50">
            <input type="radio" name="loyaltyReward" class="form-radio text-gray-400" 
                   value="none" 
                   ${n?"":"checked"}>
            <span class="ml-3 text-gray-600">Não resgatar prêmio agora</span>
        </label>
    `),t.querySelector('input[value="none"]').addEventListener("change",c=>{c.target.checked&&(j.data.redeemedReward=null)})}async function gx(t){t.preventDefault();const e=t.target,s=e.querySelector('button[type="submit"]');if(!j.data.time||j.data.selectedServiceIds.length===0||!j.data.professionalId)return k("Erro de Validação","Por favor, selecione o horário, serviço(s) e profissional antes de confirmar.","error");s.disabled=!0,s.textContent="A confirmar...";const n=j.data.selectedServiceIds.map(d=>{const p=Qn.find(h=>h.id===d);return{id:p.id,name:p.name,price:p.price,duration:p.duration,bufferTime:p.bufferTime||0,photo:p.photo||null}}),[o,r]=j.data.time.split(":"),a=new Date(`${j.data.date}T${o}:${r}:00`),l={establishmentId:w.establishmentId,clientName:j.data.clientName,clientPhone:j.data.clientPhone,services:n,professionalId:j.data.professionalId,startTime:a.toISOString(),redeemedReward:j.data.redeemedReward},c=e.querySelector("#appointmentId").value;c&&(l.id=c);try{c?await mi(c,l):await kh(l),k(`Agendamento ${c?"atualizado":"criado"} com sucesso!`,"success"),document.getElementById("appointmentModal").style.display="none",at()}catch(d){k(d.message,"error")}finally{s.disabled=!1,s.textContent="Confirmar Agendamento"}}function dp(t){const e=j.data.clientName===t.name&&j.data.clientPhone===t.phone,s=P(t.name),n=P(t.phone);return`
        <div class="client-search-card p-3 bg-white rounded-lg border-2 border-gray-200 cursor-pointer transition-all hover:bg-blue-50 ${e?"selected border-blue-500":""}" 
             data-action="select-client" 
             data-client-name="${s}" 
             data-client-phone="${n}"
             data-client-id="${t.id}"
             data-loyalty-points="${t.loyaltyPoints||0}">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold">${s.charAt(0).toUpperCase()}</div>
                <div>
                    <p class="font-semibold text-gray-800">${s}</p>
                    <p class="text-sm text-gray-500">${n}</p>
                </div>
            </div>
        </div>
    `}async function fx(t){const e=document.getElementById("clientSearchResults");if(!e)return;const s=t.toLowerCase().trim();if(s.length<3){e.innerHTML='<p class="text-sm text-gray-500">Digite pelo menos 3 caracteres para buscar clientes existentes.</p>';return}e.innerHTML='<div class="loader-small mx-auto my-2"></div>';try{const n=await Ws(w.establishmentId,s);if(Ps=n,n.length===0){e.innerHTML='<p class="text-sm text-gray-500">Nenhum cliente encontrado com este termo.</p>';return}e.innerHTML=n.map(dp).join(""),e.querySelectorAll('[data-action="select-client"]').forEach(o=>{o.addEventListener("click",r=>{const a=o.dataset.clientName,l=o.dataset.clientPhone,c=parseInt(o.dataset.loyaltyPoints||"0",10);j.data.clientName=a,j.data.clientPhone=l,j.data.clientLoyaltyPoints=c;const d=qs,p=Math.min(...(d?.rewards||[]).map(h=>h.points));j.data.clientHasRewards=d.enabled&&p!==1/0&&j.data.clientLoyaltyPoints>=p,document.getElementById("apptClientName").value=a,document.getElementById("apptClientPhone").value=l,document.querySelectorAll(".client-search-card").forEach(h=>h.classList.remove("selected","border-blue-500")),o.classList.add("selected","border-blue-500")})})}catch(n){console.error("Erro na busca de clientes:",n),e.innerHTML='<p class="text-sm text-red-500">Erro ao buscar clientes.</p>'}}async function bx(t){t.preventDefault();const e=document.getElementById("clientRegistrationForm"),s=e.querySelector('button[type="submit"]'),n={establishmentId:w.establishmentId,name:e.querySelector("#regClientName").value.trim(),email:e.querySelector("#regClientEmail").value.trim(),phone:e.querySelector("#regClientPhone").value.trim(),dobDay:e.querySelector("#regClientDobDay").value.trim(),dobMonth:e.querySelector("#regClientDobMonth").value.trim(),notes:e.querySelector("#regClientNotes").value.trim()};if(!n.name||!n.phone)return k("Erro de Validação","Nome e Telefone são obrigatórios.","error");s.disabled=!0,s.textContent="A salvar...";try{await Yi(n),Ps.push({name:n.name,phone:n.phone,loyaltyPoints:0}),j.data.clientName=n.name,j.data.clientPhone=n.phone,j.data.clientHasRewards=!1,j.data.clientLoyaltyPoints=0,k("Cliente cadastrado com sucesso!","success"),document.getElementById("genericModal").style.display="none",ei(1)}catch(o){k(`Erro ao cadastrar cliente: ${o.message}`,"error")}finally{s.disabled=!1,s.textContent="Salvar"}}function vx(){Pe({title:"Cadastrar Novo Cliente",contentHTML:`
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
    `,maxWidth:"max-w-2xl"});const e=document.getElementById("clientRegistrationForm");e&&e.addEventListener("submit",bx)}function yx(){vx()}function xx(t,e){const s=t?"Editar Agendamento":"Selecionar Cliente",n=`
        <div class="p-5 space-y-6">
            <h3 class="text-xl font-bold text-gray-800">1. Dados do Cliente</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label for="apptClientName" class="block text-sm font-medium text-gray-700">Nome Completo</label>
                    <input type="text" id="apptClientName" required class="mt-1 block w-full p-3 rounded-lg border-gray-300 shadow-sm" placeholder="Nome Completo" value="${P(j.data.clientName)}">
                </div>
                <div>
                    <label for="apptClientPhone" class="block text-sm font-medium text-gray-700">Telemóvel</label>
                    <input type="tel" id="apptClientPhone" required class="mt-1 block w-full p-3 rounded-lg border-gray-300 shadow-sm" placeholder="(XX) XXXXX-XXXX" value="${P(j.data.clientPhone)}">
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
    `;return{title:s,content:n}}function wx(){const t="Selecionar Serviço",s=`
        <div class="p-5 space-y-6">
            <h3 class="text-xl font-bold text-gray-800">2. Serviços</h3>
             
             <div class="flex flex-col sm:flex-row items-center gap-4 bg-gray-100 p-4 rounded-lg border border-gray-200">
                 <input type="search" id="serviceSearchModalInput" placeholder="Buscar Serviço..." class="w-full sm:flex-grow p-3 pl-10 border rounded-lg">
                 
                 <label class="flex items-center space-x-2 cursor-pointer flex-shrink-0">
                     <div class="relative">
                         <input type="checkbox" id="multiServiceToggle" class="sr-only" ${j.data.selectedServiceIds.length>1?"checked":""}>
                         <div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full transition-colors"></div>
                         <div class="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform" style="transition: all 0.3s;"></div>
                     </div>
                     <span class="text-sm font-medium text-gray-700">Selecionar Vários</span>
                 </label>
            </div>
            
            <div id="apptServicesContainer" class="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3 max-h-48 overflow-y-auto p-1">
                 ${Qn.map(n=>{const o=j.data.selectedServiceIds.includes(n.id),r=n.photo||"https://placehold.co/40x40/E0E7FF/4F46E5?text=S",a=P(n.name);return`
                         <div class="service-card p-3 bg-white rounded-lg border-2 border-gray-200 cursor-pointer transition-all hover:bg-gray-50 ${o?"selected border-blue-500":""}" data-service-id="${n.id}">
                             <div class="flex items-center">
                                 <img src="${r}" class="w-8 h-8 rounded-full object-cover mr-3 flex-shrink-0">
                                 <div class="flex-1">
                                     <p class="font-semibold text-sm text-gray-800">${a}</p>
                                     <p class="text-xs text-gray-500">R$ ${n.price.toFixed(2)} (${n.duration} min)</p>
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
    `;return{title:t,content:s}}function Ex(){const t="Selecionar Profissional",e=`
        <div class="p-5 space-y-6">
             <h3 class="text-xl font-bold text-gray-800">3. Profissional</h3>
             <div id="apptProfessionalContainer" class="mt-4 flex flex-wrap gap-3 max-h-48 overflow-y-auto p-1 professional-step-cards">
                 ${Ar.map(s=>{const n=j.data.professionalId===s.id,o=s.photo||"https://placehold.co/60x60/E0E7FF/4F46E5?text=P",r=P(s.name);return`
                         <div class="professional-modal-card p-3 bg-white rounded-lg border-2 border-gray-200 text-center cursor-pointer transition-all hover:bg-gray-50 ${n?"selected border-blue-500":""}" data-professional-id="${s.id}">
                             <img src="${o}" class="w-12 h-12 rounded-full object-cover mx-auto mb-1">
                             <p class="text-xs font-semibold text-gray-800">${r.split(" ")[0]}</p>
                             <p class="text-[10px] text-gray-500">${P(s.specialty||"Profissional")}</p>
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
    `;return{title:t,content:e}}function Ix(t){const e=t?"Confirmar Edição":"Data e Horário",s=new Date,n=`${s.getFullYear()}-${String(s.getMonth()+1).padStart(2,"0")}-${String(s.getDate()).padStart(2,"0")}`,o=j.data.date||n,r=P(j.data.clientName),a=P(j.data.professionalName),l=`
        <div class="p-5 space-y-6">
            <h3 class="text-xl font-bold text-gray-800">4. ${e}</h3>

            <div class="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400 space-y-1">
                <p class="font-bold text-gray-800">${r}</p>
                <p class="text-sm text-gray-700">Serviços: ${j.data.selectedServiceIds.length} selecionado(s)</p>
                <p class="text-sm text-gray-700">Profissional: ${a}</p>
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
    `;return{title:e,content:l}}function Sx(t){const e=document.getElementById("apptServicesContainer");if(!e)return;const s=t.toLowerCase(),n=Qn.filter(o=>o.name.toLowerCase().includes(s));e.innerHTML=n.map(o=>{const r=j.data.selectedServiceIds.includes(o.id),a=o.photo||"https://placehold.co/40x40/E0E7FF/4F46E5?text=S";return`
            <div class="service-card p-3 bg-white rounded-lg border-2 border-gray-200 cursor-pointer transition-all hover:bg-gray-50 ${r?"selected border-blue-500":""}" data-service-id="${o.id}">
                <div class="flex items-center">
                    <img src="${a}" class="w-8 h-8 rounded-full object-cover mr-3 flex-shrink-0">
                    <div class="flex-1">
                        <p class="font-semibold text-sm text-gray-800">${P(o.name)}</p>
                        <p class="text-xs text-gray-500">R$ ${o.price.toFixed(2)} (${o.duration} min)</p>
                    </div>
                </div>
            </div>`}).join(""),e.querySelectorAll(".service-card").forEach(o=>{o.addEventListener("click",()=>lp(o.dataset.serviceId,o))})}function Tx(t){const e=document.getElementById("apptProfessionalContainer");if(!e)return;const s=t.toLowerCase(),n=Ar.filter(o=>o.name.toLowerCase().includes(s));e.innerHTML=n.map(o=>{const r=j.data.professionalId===o.id,a=o.photo||"https://placehold.co/60x60/E0E7FF/4F46E5?text=P",l=P(o.name);return`
             <div class="professional-modal-card p-3 bg-white rounded-lg border-2 border-gray-200 text-center cursor-pointer transition-all hover:bg-gray-50 ${r?"selected border-blue-500":""}" data-professional-id="${o.id}">
                 <img src="${a}" class="w-12 h-12 rounded-full object-cover mx-auto mb-1">
                 <p class="text-xs font-semibold text-gray-800">${l.split(" ")[0]}</p>
                 <p class="text-[10px] text-gray-500">${P(o.specialty||"Profissional")}</p>
             </div>`}).join(""),e.querySelectorAll(".professional-modal-card").forEach(o=>{o.addEventListener("click",()=>cp(o.dataset.professionalId,o))})}async function ti(t=null,e=!1){const s=document.getElementById("appointmentModal");if(!e){const r=t?.startTime?new Date(t.startTime).toISOString().split("T")[0]:new Date().toISOString().split("T")[0],a=t?.startTime?new Date(t.startTime).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit",hour12:!1}):null;if(j={step:1,data:{id:t?.id||null,clientName:t?.clientName||"",clientPhone:t?.clientPhone||"",selectedServiceIds:t?.services?.map(l=>l.id)||[],professionalId:t?.professionalId||null,professionalName:t?.professionalName||"",date:r,time:a,redeemedReward:t?.redeemedReward||null,clientHasRewards:t?.hasRewards||!1,clientLoyaltyPoints:0}},t&&t.clientName)try{const l=await Ws(w.establishmentId,t.clientName),c=l.find(d=>d.phone===t.clientPhone);c&&(j.data.clientLoyaltyPoints=c.loyaltyPoints||0,Ps=l)}catch(l){console.warn("Não foi possível carregar pontos do cliente para edição:",l)}}if(!w.services||!w.professionals||qs.enabled===void 0){k("Erro","Os dados da agenda ainda não foram carregados. Tente novamente em alguns segundos.","error");return}if(Qn=w.services,Ar=w.professionals.filter(r=>r.status==="active"),j.data.clientLoyaltyPoints>0){const r=qs,a=Math.min(...(r?.rewards||[]).map(l=>l.points));j.data.clientHasRewards=r.enabled&&a!==1/0&&j.data.clientLoyaltyPoints>=a}let n={title:"Erro",content:"<p>Etapa não encontrada.</p>"};switch(j.step){case 1:n=xx(t);break;case 2:n=wx();break;case 3:n=Ex();break;case 4:n=Ix(t);break}s.innerHTML=`
        <div class="modal-content max-w-4xl p-0 rounded-xl overflow-hidden shadow-2xl">
            <header class="p-5 border-b flex justify-between items-center bg-gray-50">
                <h2 class="text-xl font-bold text-gray-800">${n.title}</h2>
                <button type="button" data-action="close-modal" data-target="appointmentModal" class="text-2xl font-bold text-gray-500 hover:text-gray-900">&times;</button>
            </header>
            
            <form id="appointmentForm" class="flex flex-col h-full">
                <input type="hidden" id="appointmentId" value="${j.data.id||""}">
                <input type="hidden" id="selectedTime" value="${j.data.time||""}">
                
                <div class="flex-1 overflow-y-auto" style="max-height: 80vh;">
                    ${n.content}
                </div>
                
            </form>
        </div>`,s.querySelectorAll('[data-action="next-step"]').forEach(r=>{r.addEventListener("click",()=>{const a=parseInt(r.dataset.currentStep,10);if(a===1){const l=s.querySelector("#apptClientName"),c=s.querySelector("#apptClientPhone");if(j.data.clientName=l.value.trim(),j.data.clientPhone=c.value.trim(),!j.data.clientName||!j.data.clientPhone)return k("Atenção","Nome e telefone do cliente são obrigatórios.","error")}else if(a===2){if(j.data.selectedServiceIds.length===0)return k("Atenção","Selecione pelo menos um serviço.","error")}else if(a===3&&!j.data.professionalId)return k("Atenção","Selecione um profissional.","error");ei(a+1)})}),s.querySelectorAll('[data-action="prev-step"]').forEach(r=>{r.addEventListener("click",()=>ei(parseInt(r.dataset.currentStep,10)-1))});const o=s.querySelector("#appointmentForm");if(j.step===4&&o&&o.addEventListener("submit",gx),s.style.display="flex",j.step===2){s.querySelector("#apptServicesContainer").querySelectorAll(".service-card").forEach(l=>{l.addEventListener("click",()=>lp(l.dataset.serviceId,l))});const a=s.querySelector("#serviceSearchModalInput");a&&a.addEventListener("input",l=>Sx(l.target.value))}if(j.step===3){s.querySelector("#apptProfessionalContainer").querySelectorAll(".professional-modal-card").forEach(l=>{l.addEventListener("click",()=>cp(l.dataset.professionalId,l))});const a=s.querySelector("#professionalSearchModalInput");a&&a.addEventListener("input",l=>Tx(l.target.value))}if(j.step===1){const r=s.querySelector("#clientSearchInput");if(r&&(r.addEventListener("input",l=>fx(l.target.value)),j.data.clientName&&j.data.clientPhone&&Ps.length>0)){const l=document.getElementById("clientSearchResults");l&&(l.innerHTML=Ps.map(dp).join(""))}const a=s.querySelector('[data-action="open-client-registration"]');a&&a.addEventListener("click",yx)}if(j.step===4){const r=s.querySelector("#apptDate");r&&r.addEventListener("change",Ld),Ld(),hx()}}async function up(t={}){K.currentDate=t.targetDate?new Date(t.targetDate):K.currentDate||new Date,K.scrollToAppointmentId=t.scrollToAppointmentId||null,K.profSearchTerm="",window.innerWidth<768&&(K.currentView="list"),$d.innerHTML=`
        <section>
            <div class="bg-white p-4 rounded-xl shadow-lg mb-4">
                
                <div class="flex flex-col sm:flex-row sm:flex-wrap sm:justify-between sm:items-center mb-4 gap-4">
                    <span id="weekRange" class="font-semibold text-lg w-full text-left sm:text-right sm:flex-grow order-1 sm:order-2"></span>
                    <div class="flex flex-wrap items-center gap-2 order-2 sm:order-1">
                        <div class="flex items-center gap-1 rounded-lg bg-gray-200 p-1">
                            <button data-view="list" class="view-btn ${K.currentView==="list"?"active":""}">Lista</button>
                            <button data-view="week" class="view-btn ${K.currentView==="week"?"active":""}">Semana</button>
                        </div>
                        <div id="week-days-toggle" class="${K.currentView==="week"?"flex":"hidden"} items-center gap-1 rounded-lg bg-gray-200 p-1">
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
        </section>`,document.querySelectorAll(".view-btn[data-view]").forEach(s=>{s.addEventListener("click",()=>{document.querySelectorAll(".view-btn[data-view]").forEach(o=>o.classList.remove("active")),s.classList.add("active"),K.currentView=s.dataset.view;const n=document.getElementById("week-days-toggle");if(K.currentView==="week"){if(n.style.display="flex",window.innerWidth<768){K.weekViewDays=3,document.querySelectorAll(".week-days-btn").forEach(r=>r.classList.remove("active"));const o=document.querySelector('.week-days-btn[data-days="3"]');o&&o.classList.add("active")}}else n.style.display="none";at()})}),document.querySelectorAll(".week-days-btn").forEach(s=>{s.addEventListener("click",()=>{document.querySelectorAll(".week-days-btn").forEach(n=>n.classList.remove("active")),s.classList.add("active"),K.weekViewDays=parseInt(s.dataset.days,10),at()})}),document.getElementById("todayBtn").addEventListener("click",()=>{K.currentDate=new Date,at()});const e=s=>{const n=parseInt(s.currentTarget.dataset.amount,10),o=K.currentView==="week"?Zi():1,r=new Date(K.currentDate);r.setDate(r.getDate()+n*o),K.currentDate=r,at()};document.getElementById("prevBtn").addEventListener("click",e),document.getElementById("nextBtn").addEventListener("click",e),document.getElementById("profSearchInput").addEventListener("input",s=>{K.profSearchTerm=s.target.value,tr()}),document.getElementById("showInactiveProfsToggle").addEventListener("change",s=>{K.showInactiveProfs=s.target.checked,tr(),at()}),Dd||($d.addEventListener("click",async s=>{const n=s.target.closest("[data-action]");if(s.target.closest('[data-action="select-professional"]')){const c=s.target.closest('[data-action="select-professional"]').dataset.profId,d=K.selectedProfessionalId===c&&c!=="all";if(K.selectedProfessionalId=d?"all":c,c!=="all"){const p=document.getElementById("profSearchInput");p&&(p.value=""),K.profSearchTerm=""}await at();return}if(!n)return;const o=n.dataset.action;let r=null;const a=s.target.closest("[data-appointment]");switch(a&&(r=JSON.parse(a.dataset.appointment.replace(/&apos;/g,"'"))),o){case"new-appointment":ti();break;case"edit-appointment":if(!r)return;if(r.status==="completed"){k("Atenção","Agendamentos finalizados não podem ser editados.","error");return}r.hasRewards&&!r.redeemedReward&&k("🎁 Cliente com Prêmios!","Este cliente tem pontos para resgatar. Verifique a Etapa 4 do agendamento.","info"),ti(r);break;case"delete-appointment":{const l=n.dataset.id;if(await re("Confirmar Exclusão","Tem a certeza que deseja apagar este agendamento?"))try{await Ch(l),k("Agendamento apagado!","success"),at()}catch(d){k(`Não foi possível apagar: ${d.message}`,"error")}break}case"open-comanda":if(r){r.hasRewards&&!r.redeemedReward&&r.status!=="completed"&&k("🎁 Cliente com Prêmios!","Este cliente tem pontos de fidelidade para resgatar.","info");const l=r.status==="completed"?"finalizadas":"em-atendimento",c={selectedAppointmentId:r.id,initialFilter:l};if(l==="finalizadas"){let d=r.startTime;if(r.transaction&&r.transaction.paidAt){const p=r.transaction.paidAt;typeof p=="object"&&p._seconds?d=new Date(p._seconds*1e3):d=p}c.filterDate=d}Qe("comandas-section",c)}break}}),Dd=!0),await mx(),await at()}const kx=(t,e=null,s=1,n=12)=>{let o=`/api/comandas/${t}?page=${s}&limit=${n}`;return e&&(o+=`&date=${e}`),F(o)},Cx=t=>F("/api/sales",{method:"POST",body:JSON.stringify(t)}),_x=t=>F(`/api/sales/${t}/reopen`,{method:"POST"}),Ax=t=>F(`/api/sales/${t}`,{method:"DELETE"}),mp=()=>F("/api/cashier/status").catch(t=>{if(t.message.includes("404")||t.message.includes("não encontrada"))return null;throw t}),Px=t=>{const e={establishmentId:t.establishmentId,initialAmount:Number(t.initialAmount),notes:t.notes||""};return console.log("Payload enviado para abrir caixa:",e),F("/api/cashier/open",{method:"POST",body:JSON.stringify(e)})},$x=(t,e)=>{const s={finalAmount:Number(e)};return console.log("Payload enviado para fechar caixa:",s),F(`/api/cashier/close/${t}`,{method:"PUT",body:JSON.stringify(s)})},Dx=()=>F("/api/cashier/history").then(t=>t||[]).catch(t=>(console.error("Erro ao buscar histórico:",t),[])),Lx=t=>F(`/api/cashier/report/${t}`),pp=t=>F(`/api/packages/${t}`),Rx=t=>F("/api/packages",{method:"POST",body:JSON.stringify(t)}),Mx=(t,e)=>F(`/api/packages/${t}`,{method:"PUT",body:JSON.stringify(e)}),Nx=t=>F(`/api/packages/${t}`,{method:"DELETE"});let V={allComandas:[],catalog:{services:[],products:[],packages:[]},clients:[],activeFilter:"atendimento",selectedComandaId:null,isCashierOpen:!1,activeCashierSessionId:null,loyaltySettings:null,paging:{page:1,limit:12,total:0}},xs=null,Ss=null;function Pr(t){if(t.status==="completed"){const o=t.comandaItems||t.items||[];return o.length>0?o:t.services||[]}const e=t.services||[],s=[...t.comandaItems||[],...t.items||[]];let n=[...e];return s.forEach(o=>{if(o.type==="product"){n.push(o);return}n.some(a=>{const l=a.id&&o.id&&a.id===o.id,c=a.name&&o.name&&a.name===o.name;return l||c})||n.push(o)}),n}function Bx(){const t=document.getElementById("comandas-layout");if(t){t.classList.add("detail-view-active");const e=document.getElementById("comanda-detail-container");e&&(e.scrollTop=0)}}function Gt(){const t=document.getElementById("comandas-layout");t&&t.classList.remove("detail-view-active")}function Vx(){const t=new Date().toISOString().split("T")[0];Ss.innerHTML=`
        <section class="h-full flex flex-col">
            <div class="flex flex-wrap justify-between items-center mb-4 gap-4 px-1">
                <h2 class="text-2xl md:text-3xl font-bold text-gray-800">Ponto de Venda</h2>
                <div id="cashier-controls" class="flex items-center gap-2"></div>
            </div>

            ${V.isCashierOpen?"":`
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
                            class="w-full py-3 px-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition shadow-md flex items-center justify-center gap-2 mb-3 ${V.isCashierOpen?"":"opacity-50 cursor-not-allowed"}"
                            ${V.isCashierOpen?"":"disabled"}
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
                        <input type="date" id="filter-date" value="${t}" class="w-full mt-1 p-2 border rounded-md bg-white text-sm">
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
    `}function Fx(){const t=document.getElementById("cashier-controls");t&&(V.isCashierOpen?t.innerHTML=`
            <span class="hidden sm:inline-block text-sm font-medium text-green-700 bg-green-100 py-1 px-3 rounded-full">Caixa Aberto</span>
            <button data-action="close-cashier" class="py-2 px-4 bg-red-100 text-red-700 font-semibold rounded-lg hover:bg-red-200 text-sm">Fechar Caixa</button>
            <button data-action="view-sales-report" class="py-2 px-4 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 text-sm">Relatório</button>
        `:t.innerHTML=`
            <span class="hidden sm:inline-block text-sm font-medium text-red-700 bg-red-100 py-1 px-3 rounded-full">Caixa Fechado</span>
            <button data-action="open-cashier" class="py-2 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 text-sm">Abrir Caixa</button>
            <button data-action="view-sales-report" class="py-2 px-4 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 text-sm">Relatório</button>
        `)}function Nt(){const t=document.getElementById("comandas-list");if(!t)return;if(!V.isCashierOpen&&V.activeFilter==="atendimento"){t.innerHTML=`
            <div class="text-center py-10 opacity-60">
                <p class="text-sm font-medium text-gray-700">Caixa Fechado</p>
                <p class="text-xs text-gray-500">Abra o caixa para ver as vendas</p>
            </div>
        `;return}const s={atendimento:"confirmed",finalizadas:"completed"}[V.activeFilter],n=V.allComandas.filter(o=>o.status===s);if(n.length===0){t.innerHTML='<p class="text-center text-gray-400 py-10 text-sm">Nenhuma venda encontrada.</p>',Rd(t);return}t.innerHTML=n.map(o=>{const a=Pr(o).reduce((x,S)=>x+(S.price||0),0),l=o.id===V.selectedComandaId,c=new Date(o.startTime).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),d=o.type==="walk-in"||o.id.startsWith("temp-"),p=P(o.clientName),h=P(o.professionalName),f=d?'<span class="text-[10px] font-bold uppercase text-blue-600 bg-blue-100 px-2 py-0.5 rounded-md">Avulso</span>':'<span class="text-[10px] font-bold uppercase text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded-md">Agendado</span>';return`
            <div data-action="select-comanda" data-comanda-id="${o.id}" 
                 class="comanda-card cursor-pointer ${l?"selected":""}">
                
                <div class="flex justify-between items-start mb-1">
                    <p class="font-bold text-gray-800 truncate max-w-[70%]">${p}</p>
                    <p class="font-bold text-gray-900">R$ ${a.toFixed(2)}</p>
                </div>
                
                <div class="flex justify-between items-center mt-1">
                    <div class="flex items-center gap-2">
                        ${f}
                        <p class="text-xs text-gray-500 truncate max-w-[100px]">${h}</p>
                    </div>
                    <p class="text-xs text-gray-400 font-medium">${c}</p> 
                </div>
            </div>
        `}).join(""),Rd(t)}function Rd(t){const{page:e,total:s,limit:n}=V.paging,o=Math.ceil((s||0)/n);if(o<=1)return;let r='<div class="flex gap-2 justify-center mt-4 flex-wrap pb-4">';e>1&&(r+=`<button data-page="${e-1}" class="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-sm">&laquo;</button>`);for(let a=1;a<=o;a++)a===1||a===o||a>=e-2&&a<=e+2?r+=`<button data-page="${a}" class="px-3 py-1 rounded text-sm ${a===e?"bg-indigo-600 text-white font-bold":"bg-gray-200 hover:bg-gray-300"}">${a}</button>`:(a===e-3||a===e+3)&&(r+='<span class="px-2 text-gray-400">...</span>');e<o&&(r+=`<button data-page="${e+1}" class="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-sm">&raquo;</button>`),r+="</div>",t.innerHTML+=r,t.querySelectorAll("button[data-page]").forEach(a=>{a.onclick=l=>{l.stopPropagation(),V.paging.page=parseInt(a.dataset.page,10),ct()}})}function Je(){const t=document.getElementById("comanda-detail-container");if(!t)return;const e=`
        <div class="mobile-only-header">
            <button data-action="back-to-list" class="btn-back-mobile">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
            </button>
            <h3 class="font-bold text-lg text-gray-800 ml-2">Detalhes</h3>
        </div>
    `;if(!V.isCashierOpen){t.innerHTML=`
            ${e}
            <div class="flex flex-col items-center justify-center h-full text-center text-gray-500 p-6">
                <div class="bg-gray-100 p-4 rounded-full mb-4">🔒</div>
                <p class="font-semibold text-lg">Caixa Fechado</p>
                <p class="text-sm mb-6">Abra o caixa para ver detalhes.</p>
                <button data-action="open-cashier" class="py-2 px-6 bg-green-600 text-white font-bold rounded-lg">Abrir Caixa</button>
            </div>
        `;return}const s=V.allComandas.find(h=>h.id===V.selectedComandaId);if(!s){t.innerHTML=`
            <div class="hidden lg:flex flex-col items-center justify-center h-full text-center text-gray-400">
                <svg class="w-16 h-16 mb-4 opacity-20" fill="currentColor" viewBox="0 0 20 20"><path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/></svg>
                <p class="text-lg font-medium">Selecione uma venda</p>
                <p class="text-sm">Toque em um item à esquerda para ver os detalhes</p>
            </div>
        `;return}const n=Pr(s),o=s.status==="completed",r=s.type==="walk-in"||s.id.startsWith("temp-"),a=r?"":`<button data-action="go-to-appointment" data-id="${s.id}" data-date="${s.startTime}" 
                class="text-indigo-600 text-xs font-semibold hover:underline flex items-center gap-1 mt-1">
             Ir para Agendamento <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
           </button>`,l=n.reduce((h,f)=>{const x=`${f.type}-${f.id||f.name}`;return h[x]||(h[x]={...f,quantity:0}),h[x].quantity+=1,h},{}),c=Object.values(l).reduce((h,f)=>h+(f.price||0)*f.quantity,0),d=P(s.clientName),p=P(s.professionalName);t.innerHTML=`
        ${e} <div class="flex-grow overflow-y-auto p-4">
            <div class="flex justify-between items-start mb-6 border-b pb-4">
                <div>
                    <h3 class="text-xl font-bold text-gray-800 truncate max-w-[200px]">${d}</h3>
                    <p class="text-sm text-gray-500 flex items-center gap-1 mt-1">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                        ${p}
                    </p>
                    ${r?'<span class="mt-2 inline-block px-2 py-1 text-xs font-bold bg-blue-100 text-blue-700 rounded-md">Venda Avulsa</span>':a}
                </div>
                <div class="flex gap-2">
                    ${o?`<button data-action="reopen-appointment" data-id="${s.id}" class="p-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200" title="Reabrir"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg></button>`:""}
                    ${r&&!o?`<button data-action="delete-walk-in" data-id="${s.id}" class="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200" title="Excluir"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>`:""}
                </div>
            </div>

            <div id="loyalty-container" class="mb-4"></div>

            <div class="space-y-3">
                <h4 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Itens do Pedido</h4>
                ${Object.values(l).map(h=>`
                    <div class="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-100 shadow-sm ${h.isReward?"border-yellow-200 bg-yellow-50":""}">
                        <div class="flex items-center gap-3">
                            <span class="flex items-center justify-center w-8 h-8 bg-gray-100 text-gray-700 font-bold text-sm rounded-lg">
                                ${h.quantity}x
                            </span>
                            <div>
                                <p class="text-sm font-semibold text-gray-800 line-clamp-1">
                                    ${h.isReward?"🎁 ":""}${P(h.name)}
                                </p>
                                <p class="text-xs text-gray-500">
                                    ${h.isReward?'<span class="text-yellow-700 font-bold">Prémio Fidelidade</span>':`R$ ${(h.price||0).toFixed(2)} un.`}
                                </p>
                            </div>
                        </div>
                        <div class="flex items-center gap-3">
                            <span class="font-bold text-gray-900">R$ ${(h.price*h.quantity).toFixed(2)}</span>
                            ${o?"":`<button data-action="remove-item" data-item-id="${h.id}" data-item-type="${h.type}" class="text-red-400 hover:text-red-600 p-1 rounded-full hover:bg-red-50"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>`}
                        </div>
                    </div>
                `).join("")}
                
                ${Object.keys(l).length===0?'<div class="text-center py-8 text-gray-400 border-2 border-dashed rounded-lg text-sm">Nenhum item adicionado</div>':""}
            </div>
        </div>

        <footer class="p-4 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            <div class="flex justify-between items-end mb-4">
                <span class="text-sm text-gray-500 font-medium">Total a Pagar</span>
                <span class="text-3xl font-extrabold text-gray-900">R$ ${c.toFixed(2)}</span>
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
    `,o||Ox(s,t.querySelector("#loyalty-container"))}async function Ox(t,e){if(!e)return;const s=V.loyaltySettings;if(!s||!s.enabled)return;let n=null;if(t.clientId&&(n=V.clients.find(r=>r.id===t.clientId)),n||(n=V.clients.find(r=>r.name===t.clientName)),!n||n.loyaltyPoints===void 0)try{if(t.clientId)n=await sx(t.clientId);else{const r=await Ws(w.establishmentId,t.clientName);n=r.find(a=>a.name===t.clientName)||r[0]}}catch(r){console.error("[Fidelidade] Erro ao buscar cliente",r);return}if(!n||!n.loyaltyPoints)return;const o=(s.rewards||[]).filter(r=>n.loyaltyPoints>=r.costPoints);if(o.length>0){const r=document.createElement("div");r.className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl p-4 shadow-sm flex justify-between items-center",r.innerHTML=`
            <div class="flex items-center gap-3">
                <div class="bg-yellow-100 p-2 rounded-full text-yellow-600">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                </div>
                <div>
                    <p class="text-sm font-bold text-yellow-800">Prémio Disponível!</p>
                    <p class="text-xs text-yellow-700">Saldo: <strong>${n.loyaltyPoints} pts</strong></p>
                </div>
            </div>
        `;const a=document.createElement("button");a.innerText="Resgatar",a.className="text-xs font-bold bg-yellow-500 text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-600 transition-colors",a.onclick=()=>qx(o),r.appendChild(a),e.innerHTML="",e.appendChild(r)}}function qx(t,e){const s=`
        <div class="space-y-4">
            <p class="text-sm text-gray-600 mb-4">O cliente possui pontos suficientes para resgatar os seguintes itens:</p>
            <div class="space-y-2 max-h-96 overflow-y-auto">
                ${t.map(r=>`
                    <button data-action="select-reward" data-reward-id="${r.id}" class="w-full flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:border-yellow-400 hover:bg-yellow-50 transition-all group">
                        <div class="text-left">
                            <p class="font-bold text-gray-800 group-hover:text-yellow-700">${P(r.name)}</p>
                            <p class="text-xs text-gray-500">Custo: ${r.costPoints} pontos</p>
                        </div>
                        <span class="text-sm font-bold text-green-600 bg-green-100 px-3 py-1 rounded-full">Grátis</span>
                    </button>
                `).join("")}
            </div>
        </div>
    `,{modalElement:n,close:o}=Pe({title:"🎁 Resgatar Prémio",contentHTML:s,maxWidth:"max-w-md"});n.addEventListener("click",r=>{const a=r.target.closest('[data-action="select-reward"]');if(a){const l=a.dataset.rewardId,c=t.find(d=>d.id==l);c&&(jx(c),o())}})}async function jx(t,e){const s={id:t.serviceId||t.productId||`reward-${Date.now()}`,name:`${t.name}`,price:0,type:t.serviceId?"service":"product",isReward:!0,pointsCost:t.costPoints};await hp(s,1)}function Hx(){Pe({title:"Cadastrar Novo Cliente",contentHTML:`
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
    `,maxWidth:"max-w-2xl"});const e=document.getElementById("comandas_clientRegistrationForm");e&&e.addEventListener("submit",Ux)}async function Ux(t){t.preventDefault();const e=document.getElementById("comandas_clientRegistrationForm");if(!e)return;const s=e.querySelector('button[type="submit"]'),n=e.querySelector("#regClientName"),a=e.querySelector("#regClientPhone").value.trim().replace(/\D/g,""),l={establishmentId:w.establishmentId,name:n.value.trim(),email:e.querySelector("#regClientEmail").value.trim()||null,phone:a,dob:`${e.querySelector("#regClientDobDay").value.trim()}/${e.querySelector("#regClientDobMonth").value.trim()}`,notes:e.querySelector("#regClientNotes").value.trim()||null};if(!l.name||!a)return k("Erro de Validação","Nome e Telefone (apenas números) são obrigatórios.","error");s.disabled=!0,s.textContent="Verificando...";try{const c=await ax(w.establishmentId,a);if(c)k("Atenção",`Cliente já cadastrado: ${c.name}. Selecionando existente...`,"info"),V.clients.find(p=>p.id===c.id)||V.clients.push(c),document.getElementById("genericModal").style.display="none",si(c.id);else{s.textContent="A salvar...";const d=await Yi(l);V.clients.push({id:d.id,...l}),k("Cliente cadastrado com sucesso!","success"),document.getElementById("genericModal").style.display="none",si(d.id)}}catch(c){k(`Erro ao processar: ${c.message}`,"error")}finally{s&&(s.disabled=!1,s.textContent="Salvar Cliente")}}function zx(){if(!V.isCashierOpen){k("Caixa Fechado","Abra o caixa antes de adicionar itens.","error");return}const{modalElement:t,close:e}=Pe({title:"Adicionar Item à Comanda",contentHTML:'<div id="add-item-content"></div>',maxWidth:"max-w-4xl"}),s=()=>{let o="";const r=t.querySelector("#add-item-content"),a={service:'<svg class="w-6 h-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v4.512a9.04 9.04 0 00-3 5.012M12 12a9.04 9.04 0 01-3-5.012V5l-1-1z" /></svg>',product:'<svg class="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>',package:'<svg class="w-6 h-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-14L4 7m8 4v10M4 7v10l8 4" /></svg>'},l=()=>{const c=o.toLowerCase(),d=h=>h.filter(f=>f.name.toLowerCase().includes(c)),p={"modal-service-list":{items:d(V.catalog.services),type:"service"},"modal-product-list":{items:d(V.catalog.products),type:"product"},"modal-package-list":{items:d(V.catalog.packages),type:"package"}};for(const[h,{items:f,type:x}]of Object.entries(p)){const S=r.querySelector(`#${h}`);S&&(S.innerHTML=f.map(_=>`
                        <button data-action="select-item-for-quantity" data-item-type="${x}" data-item-id="${_.id}" class="flex items-center gap-3 w-full p-3 bg-white border rounded-lg hover:bg-gray-50 transition">
                            <div class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gray-100">${a[x]}</div>
                            <span class="flex-grow text-left min-w-0 truncate">${P(_.name)}</span>
                            <span class="font-semibold flex-shrink-0">R$ ${_.price.toFixed(2)}</span>
                        </button>
                    `).join("")||'<p class="text-xs text-gray-400 text-center p-4">Nenhum item.</p>')}};r.innerHTML=`
            <input type="search" id="item-search-input" placeholder="Pesquisar por nome..." class="w-full p-3 mb-4 border rounded-lg">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div><h4 class="font-semibold mb-2 text-center text-indigo-600">Serviços</h4><div id="modal-service-list" class="space-y-2 max-h-96 overflow-y-auto"></div></div>
                <div><h4 class="font-semibold mb-2 text-center text-green-600">Produtos</h4><div id="modal-product-list" class="space-y-2 max-h-96 overflow-y-auto"></div></div>
                <div><h4 class="font-semibold mb-2 text-center text-purple-600">Pacotes</h4><div id="modal-package-list" class="space-y-2 max-h-96 overflow-y-auto"></div></div>
            </div>`,l(),r.querySelector("#item-search-input").addEventListener("input",c=>{o=c.target.value,l()})},n=o=>{let r=1;const a=t.querySelector("#add-item-content"),l=()=>{document.getElementById("quantity-display").textContent=r,document.getElementById("quantity-minus-btn").disabled=r<=1};a.innerHTML=`
            <div class="text-center p-8 relative">
                <button data-action="back-to-catalog" class="absolute top-5 left-5 text-gray-600 hover:text-gray-900">&larr; Voltar</button>
                <h3 class="font-bold text-2xl text-gray-800">${P(o.name)}</h3>
                <p class="text-lg text-gray-500">R$ ${o.price.toFixed(2)}</p>
                <div class="my-8 flex items-center justify-center gap-4">
                    <button id="quantity-minus-btn" class="w-12 h-12 rounded-full bg-gray-200 text-3xl font-bold text-gray-600 hover:bg-gray-300">-</button>
                    <span id="quantity-display" class="text-4xl font-bold w-20 text-center">${r}</span>
                    <button id="quantity-plus-btn" class="w-12 h-12 rounded-full bg-gray-200 text-3xl font-bold text-gray-600 hover:bg-gray-300">+</button>
                </div>
                <button data-action="confirm-add-item" class="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700">Adicionar à Comanda</button>
            </div>
        `,document.getElementById("quantity-minus-btn").onclick=()=>{r>1&&(r--,l())},document.getElementById("quantity-plus-btn").onclick=()=>{r++,l()},document.querySelector('[data-action="confirm-add-item"]').onclick=async()=>{await hp(o,r),e()}};t.addEventListener("click",o=>{const r=o.target.closest('[data-action="select-item-for-quantity"]'),a=o.target.closest('[data-action="back-to-catalog"]');if(r){const{itemType:l,itemId:c}=r.dataset,p=(V.catalog[l+"s"]||[]).find(h=>h.id===c);p&&n({...p,type:l})}else a&&s()}),s()}async function si(t=null){if(!V.isCashierOpen){k("Caixa Fechado","Abra o caixa antes de criar uma nova venda.","error");return}if(!V.clients||V.clients.length===0)try{V.clients=await Ws(w.establishmentId)}catch{k("Erro","Não foi possível carregar dados de clientes.","error");return}if(!w.professionals||w.professionals.length===0)try{w.professionals=await ze(w.establishmentId)}catch{k("Erro","Não foi possível carregar dados de profissionais.","error");return}const e=V.clients.map(a=>{const l=a.id===t?"selected":"";return`<option value="${a.id}" ${l}>${P(a.name)} - ${P(a.phone)}</option>`}).join(""),s=w.professionals.map(a=>`<option value="${a.id}">${P(a.name)}</option>`).join(""),n=`
        <form id="new-sale-form" class="space-y-4">
            <div>
                <label for="new-sale-client" class="block text-sm font-medium text-gray-700">Cliente</label>
                <select id="new-sale-client" required class="mt-1 w-full p-2 border rounded-md bg-white">
                    <option value="">Selecione um cliente...</option>
                    ${e}
                </select>
                <button type="button" data-action="new-client-from-sale" class="text-sm text-blue-600 hover:underline mt-1">ou Cadastrar Novo Cliente</button>
            </div>
            <div>
                <label for="new-sale-professional" class="block text-sm font-medium text-gray-700">Profissional Responsável</label>
                <select id="new-sale-professional" required class="mt-1 w-full p-2 border rounded-md bg-white">
                    <option value="">Selecione um profissional...</option>
                    ${s}
                </select>
            </div>
             <div class="pt-4 border-t">
                <button type="submit" class="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700">Iniciar Venda</button>
            </div>
        </form>
    `,{modalElement:o}=Pe({title:"Nova Venda Avulsa",contentHTML:n,maxWidth:"max-w-md"});o.querySelector("#new-sale-form").addEventListener("submit",Yx);const r=o.querySelector('[data-action="new-client-from-sale"]');r&&r.addEventListener("click",a=>{a.preventDefault(),o.style.display="none",Hx()})}function Wx(){if(!V.isCashierOpen){k("Caixa Fechado","Abra o caixa antes de finalizar pagamentos.","error");return}const t=V.allComandas.find(h=>h.id===V.selectedComandaId);if(!t)return;const e=Pr(t),s=new Set,n=[];for(const h of e){if(h.type==="service"&&h.id){if(s.has(h.id))continue;s.add(h.id)}n.push(h)}const o=n.reduce((h,f)=>h+(f.price||0),0);let r=[],a={remainingAmount:o,selectedMethod:"dinheiro",installments:1,amountReceived:""};const l=()=>{const h=document.getElementById("payment-list"),f=document.getElementById("remaining-amount"),x=document.getElementById("finalize-checkout-btn"),S=document.getElementById("change-container"),_=document.getElementById("installments-container"),D=document.getElementById("payment-value"),R=document.getElementById("payment-controls"),O=r.reduce((B,H)=>B+H.value,0);a.remainingAmount=o-O,h.innerHTML=r.map((B,H)=>`
            <div class="flex justify-between items-center bg-gray-100 p-2 rounded-md animate-fade-in-fast">
                <span class="font-medium text-sm">${B.method.charAt(0).toUpperCase()+B.method.slice(1)} ${B.installments>1?`(${B.installments}x)`:""}</span>
                <div class="flex items-center gap-2">
                    <span class="font-semibold">R$ ${B.value.toFixed(2)}</span>
                    <button data-action="remove-payment" data-payment-index="${H}" class="text-red-500 font-bold">&times;</button>
                </div>
            </div>`).join(""),a.remainingAmount<=.001?(f.textContent="Total Pago!",f.className="text-lg font-bold text-center mb-4 text-green-600",D.value="",x.disabled=!1,R&&(R.style.display="none")):(f.textContent=`Faltam: R$ ${a.remainingAmount.toFixed(2)}`,f.className="text-lg font-bold text-center mb-4 text-red-600",D.value=a.remainingAmount.toFixed(2),x.disabled=!0,R&&(R.style.display="block")),document.querySelectorAll(".payment-method-btn").forEach(B=>{B.classList.toggle("ring-2",B.dataset.method===a.selectedMethod),B.classList.toggle("ring-offset-2",B.dataset.method===a.selectedMethod)}),_.style.display=["credito","crediario"].includes(a.selectedMethod)?"block":"none",S.style.display=a.selectedMethod==="dinheiro"&&a.remainingAmount>0?"block":"none";const N=parseFloat(a.amountReceived)-a.remainingAmount;document.getElementById("change-value").textContent=`R$ ${N>0?N.toFixed(2):"0.00"}`},c=()=>{const h=document.getElementById("payment-value");let f=parseFloat(h.value);if(isNaN(f)||f<=0){k("Valor Inválido","Insira um valor de pagamento válido e maior que zero.","error");return}if(f>a.remainingAmount+.001){k("Valor Inválido","O valor excede o saldo restante.","error");return}const x={method:a.selectedMethod,value:f};["credito","crediario"].includes(a.selectedMethod)&&a.installments>1&&(x.installments=a.installments),r.push(x),a.selectedMethod="dinheiro",a.installments=1,document.getElementById("installments-select").value=1,l()},d=`
        <div class="text-center mb-4">
            <p class="text-lg text-gray-600">Valor Total</p>
            <p class="text-4xl font-bold text-gray-800 my-2">R$ ${o.toFixed(2)}</p>
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
            <div id="installments-container" class="hidden"><label class="text-sm font-medium">Parcelas</label><select id="installments-select" class="w-full p-2 border rounded-md bg-white mt-1">${Array.from({length:12},(h,f)=>`<option value="${f+1}">${f+1}x</option>`).join("")}</select></div>
            <div class="flex items-end gap-2">
                <div class="flex-grow"><label class="text-sm font-medium">Valor a Adicionar</label><input type="number" step="0.01" id="payment-value" class="w-full p-2 border rounded-md text-lg font-bold"></div>
                <button id="add-payment-btn" class="py-2 px-4 bg-gray-700 text-white font-semibold rounded-md hover:bg-gray-800">Adicionar</button>
            </div>
            <div id="change-container" class="hidden mt-2 p-3 bg-blue-50 rounded-lg"><label class="text-sm">Valor Recebido</label><input type="number" id="amount-received" class="w-full p-2 border rounded-md text-lg" /><p class="flex justify-between mt-2 font-semibold"><span>Troco:</span><strong id="change-value" class="text-blue-600">R$ 0.00</strong></p></div>
        </div>
        <div class="mt-6 pt-4 border-t"><button id="finalize-checkout-btn" class="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 disabled:bg-gray-400" disabled>Finalizar</button></div>
    `,{modalElement:p}=Pe({title:"Finalizar Pagamento",contentHTML:d,maxWidth:"max-w-md"});document.getElementById("payment-value").value=a.remainingAmount.toFixed(2),p.addEventListener("click",h=>{const f=h.target.closest(".payment-method-btn");f&&(a.selectedMethod=f.dataset.method,a.installments=1,document.getElementById("installments-select").value=1,l()),h.target.closest("#add-payment-btn")&&c(),h.target.closest('[data-action="remove-payment"]')&&(r.splice(parseInt(h.target.closest('[data-action="remove-payment"]').dataset.paymentIndex,10),1),l()),h.target.closest("#finalize-checkout-btn")&&Xx(t,o,r)}),p.addEventListener("change",h=>{h.target.id==="installments-select"&&(a.installments=parseInt(h.target.value,10))}),p.addEventListener("input",h=>{h.target.id==="amount-received"&&(a.amountReceived=h.target.value,l())}),l()}async function Gx(){const t=`
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
    `,{modalElement:e}=Pe({title:"Abrir Caixa",contentHTML:t,maxWidth:"max-w-md"});e.querySelector("#open-cashier-form").addEventListener("submit",async s=>{s.preventDefault();const n=document.getElementById("initial-amount"),o=n.value.trim(),r=document.getElementById("cashier-notes").value.trim(),a=parseFloat(o);if(o===""||isNaN(a)||a<0){k("Valor Inválido","Por favor, insira um valor inicial válido (maior ou igual a R$ 0,00).","error"),n.focus();return}try{const l={establishmentId:w.establishmentId,initialAmount:parseFloat(a.toFixed(2))};r&&(l.notes=r);const c=await Px(l);V.isCashierOpen=!0,V.activeCashierSessionId=c.id,await el(),document.getElementById("genericModal").style.display="none",k("Sucesso!",`Caixa aberto com valor inicial de R$ ${a.toFixed(2)}`,"success")}catch(l){k("Erro",`Não foi possível abrir o caixa: ${l.message}`,"error")}})}async function Kx(){const t=V.activeCashierSessionId;if(t)try{const e=await Lx(t),s=`
            <form id="close-cashier-form" class="space-y-4">
                <div class="grid grid-cols-2 gap-4 text-center">
                    <div class="bg-blue-50 p-3 rounded-lg">
                        <p class="text-sm text-gray-600">Valor de Abertura</p>
                        <p class="text-2xl font-bold text-blue-600">R$ ${e.initialAmount.toFixed(2)}</p>
                    </div>
                    <div class="bg-green-50 p-3 rounded-lg">
                        <p class="text-sm text-gray-600">Vendas em Dinheiro</p>
                        <p class="text-2xl font-bold text-green-600">R$ ${e.cashSales.toFixed(2)}</p>
                    </div>
                </div>
                <div class="bg-gray-100 p-4 rounded-lg text-center">
                    <p class="text-sm font-medium text-gray-700">Valor Esperado em Caixa</p>
                    <p class="text-3xl font-bold text-gray-900">R$ ${e.expectedAmount.toFixed(2)}</p>
                </div>
                <hr>
                <div>
                    <label for="final-amount" class="block text-sm font-medium text-gray-700">Valor Final (Contado no Caixa)</label>
                    <div class="mt-1 relative">
                        <span class="absolute left-3 top-2 text-gray-500 font-semibold">R$</span>
                        <input type="number" step="0.01" min="0" id="final-amount" required class="w-full p-2 pl-12 border rounded-md text-lg font-semibold" placeholder="0.00" value="${e.expectedAmount.toFixed(2)}">
                    </div>
                </div>
                <div class="pt-4 border-t">
                    <button type="submit" class="w-full bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 transition">Confirmar e Fechar Caixa</button>
                </div>
            </form>
        `,{modalElement:n}=Pe({title:"Fechar Caixa",contentHTML:s,maxWidth:"max-w-md"});n.querySelector("#close-cashier-form").addEventListener("submit",async o=>{o.preventDefault();const r=parseFloat(document.getElementById("final-amount").value);if(isNaN(r)||r<0){k("Valor Inválido","Insira um valor final válido.","error");return}try{await $x(t,r),V.isCashierOpen=!1,V.activeCashierSessionId=null,document.getElementById("genericModal").style.display="none",await el(),k("Sucesso!","Caixa fechado com sucesso!","success")}catch(a){k("Erro",`Não foi possível fechar o caixa: ${a.message}`,"error")}})}catch(e){k("Erro",`Não foi possível carregar o relatório de fecho: ${e.message}`,"error")}}async function Jx(t){V.activeFilter!==t&&(V.activeFilter=t,V.paging.page=1,document.querySelectorAll(".filter-btn").forEach(e=>e.classList.remove("bg-white","text-indigo-600","shadow")),document.querySelector(`[data-filter="${t}"]`).classList.add("bg-white","text-indigo-600","shadow"),document.getElementById("finalizadas-datepicker").classList.toggle("hidden",t!=="finalizadas"),Gt(),await ct(),V.selectedComandaId=null,Je())}function ni(t){V.selectedComandaId=t,Nt(),Bx(),Je()}async function hp(t,e){const s=V.allComandas.find(o=>o.id===V.selectedComandaId);if(!s)return;const n=Array(e).fill(0).map(()=>({id:t.id,name:t.name,price:t.price,type:t.type,isReward:t.isReward||!1,pointsCost:t.pointsCost||0}));if(s.comandaItems=s.comandaItems||[],s.comandaItems.push(...n),s.type==="walk-in"&&s.id.startsWith("temp-")){k("Sucesso",`${e}x ${t.name} adicionado(s)!`,"success"),Je(),Nt();return}try{await mi(s.id,s),k("Sucesso",`${e}x ${t.name} adicionado(s)!`,"success"),Je(),Nt()}catch(o){k("Erro",`Não foi possível adicionar o item: ${o.message}`,"error"),s.comandaItems.splice(s.comandaItems.length-e,e)}}async function Qx(t,e){const s=V.allComandas.find(r=>r.id===V.selectedComandaId);if(!s)return;let n=!1,o=(s.comandaItems||[]).findIndex(r=>r.id===t&&r.type===e);if(o>-1)s.comandaItems.splice(o,1),n=!0;else{let r=(s.services||[]).findIndex(a=>a.id===t);if(r>-1)s.services.splice(r,1),n=!0;else{let a=(s.items||[]).findIndex(l=>l.id===t&&l.type===e);a>-1&&(s.items.splice(a,1),n=!0)}}if(n){if(s.type==="walk-in"&&s.id.startsWith("temp-")){k("Sucesso","Item removido!","success"),Je(),Nt();return}try{await mi(s.id,s),k("Sucesso","Item removido!","success"),Je(),Nt()}catch(r){k("Erro",`Não foi possível remover o item: ${r.message}`,"error"),await ct()}}}async function Xx(t,e,s){const n=t.type==="appointment",o=Pr(t),r=new Set,a=[];for(const c of o){if(c.type==="service"&&c.id){if(r.has(c.id))continue;r.add(c.id)}a.push(c)}const l={payments:s,totalAmount:e,items:a,cashierSessionId:V.activeCashierSessionId};try{n?await Ah(t.id,l):(l.establishmentId=w.establishmentId,l.clientId=t.clientId,l.clientName=t.clientName,l.professionalId=t.professionalId,l.clientPhone=t.clientPhone,await Cx(l)),k("Sucesso!","Venda finalizada com sucesso!","success"),document.getElementById("genericModal").style.display="none",Gt(),V.selectedComandaId=null,await ct()}catch(c){k("Erro no Checkout",c.message,"error")}}async function Yx(t){t.preventDefault();const e=document.getElementById("new-sale-client").value,s=document.getElementById("new-sale-professional").value,n=V.clients.find(a=>a.id===e),o=w.professionals.find(a=>a.id===s);if(!n||!o){k("Erro","Selecione um cliente e um profissional válidos.","error");return}const r={id:`temp-${Date.now()}`,type:"walk-in",clientId:n.id,clientName:n.name,clientPhone:n.phone,professionalId:o.id,professionalName:o.name,startTime:new Date,status:"confirmed",services:[],comandaItems:[]};V.allComandas.unshift(r),V.selectedComandaId=r.id,document.getElementById("genericModal").style.display="none",ni(r.id)}async function ct(){const t=document.getElementById("comandas-list");t.innerHTML='<div class="loader mx-auto mt-10"></div>';const e=V.activeFilter==="finalizadas"?document.getElementById("filter-date").value:null;try{const s=await mp();if(V.isCashierOpen=!!s,V.activeCashierSessionId=s?s.id:null,Fx(),!V.isCashierOpen&&V.activeFilter==="atendimento"){Nt(),Je();return}try{const o=await(void 0)(w.establishmentId);o&&o.loyaltyProgram&&(V.loyaltySettings=o.loyaltyProgram)}catch{console.log("Sem config de fidelidade carregada")}const n=await kx(w.establishmentId,e,V.paging.page,V.paging.limit);if(V.allComandas=n.data||n,V.paging.total=n.total||n.length,V.catalog.services.length===0){const[o,r,a,l,c]=await Promise.all([ps(w.establishmentId),ur(w.establishmentId),pp(w.establishmentId),Ws(w.establishmentId),ze(w.establishmentId)]);V.catalog={services:o,products:r,packages:a},V.clients=l,w.professionals=c}Nt(),V.selectedComandaId,Je()}catch(s){k("Erro de Carregamento",`Não foi possível carregar os dados: ${s.message}`,"error"),t.innerHTML=`<p class="text-red-500 p-4">${s.message}</p>`}}async function el(t={}){Ss=document.getElementById("content");try{const e=await mp();V.isCashierOpen=!!e,V.activeCashierSessionId=e?e.id:null}catch(e){console.error("Erro ao verificar caixa:",e),V.isCashierOpen=!1}V.selectedComandaId=t.selectedAppointmentId||null,Vx(),xs&&(Ss.removeEventListener("click",xs),Ss.removeEventListener("change",xs)),xs=async e=>{const s=e.target.closest("[data-action], [data-filter], [data-comanda-id], [data-id]");if(e.target.id==="filter-date"&&V.activeFilter==="finalizadas"){V.paging.page=1,await ct();return}if(s){if(s.matches("[data-filter]"))Jx(s.dataset.filter);else if(s.matches("[data-comanda-id]")){if(e.target.closest('[data-action="go-to-appointment"]')){e.stopPropagation();return}ni(s.dataset.comandaId)}else if(s.matches("[data-action]")){const n=s.dataset.action,o=s.dataset.id||V.selectedComandaId;switch(n){case"back-to-list":{Gt(),V.selectedComandaId=null,document.querySelectorAll(".comanda-card").forEach(r=>r.classList.remove("selected")),Je();break}case"new-sale":si();break;case"add-item":zx();break;case"checkout":Wx();break;case"open-cashier":Gx();break;case"close-cashier":await Kx();break;case"view-sales-report":Qe("sales-report-section");break;case"remove-item":await Qx(s.dataset.itemId,s.dataset.itemType);break;case"reopen-appointment":{if(await re("Reabrir Comanda","Tem certeza? O pagamento será estornado e os produtos devolvidos ao estoque."))try{await _h(o);const a=V.allComandas.findIndex(l=>l.id===o);a!==-1&&(delete V.allComandas[a].transaction,delete V.allComandas[a].cashierSessionId,delete V.allComandas[a].redeemedReward,V.allComandas[a].status="confirmed"),V.selectedComandaId=null,Gt(),k("Sucesso!","Comanda reaberta para edição.","success"),await ct()}catch(a){k("Erro",`Não foi possível reabrir: ${a.message}`,"error")}break}case"reopen-walk-in":{if(await re("Reabrir Venda","Tem certeza? A venda será cancelada e os produtos devolvidos ao estoque."))try{await _x(o),k("Sucesso!","Venda revertida."),Gt(),V.selectedComandaId=null,await ct()}catch(a){k("Erro",`Não foi possível reabrir: ${a.message}`,"error")}break}case"go-to-appointment":{const r=s.dataset.id,a=s.dataset.date;Qe("agenda-section",{scrollToAppointmentId:r,targetDate:new Date(a)});break}case"delete-walk-in":{if(await re("Excluir Venda","Tem certeza que deseja excluir esta venda avulsa? O estoque dos produtos será devolvido."))if(o.startsWith("temp-"))V.allComandas=V.allComandas.filter(a=>a.id!==o),V.selectedComandaId=null,Nt(),Je(),k("Sucesso","Venda avulsa removida.","success"),Gt();else try{await Ax(o),k("Sucesso","Venda avulsa excluída com sucesso.","success"),V.selectedComandaId=null,Gt(),await ct()}catch(a){k("Erro",`Não foi possível excluir: ${a.message}`,"error")}break}}}}},Ss.addEventListener("click",xs),Ss.addEventListener("change",xs),t.initialFilter&&(V.activeFilter=t.initialFilter==="finalizadas"?"finalizadas":"atendimento"),t.selectedAppointmentId&&(V.selectedComandaId=t.selectedAppointmentId),document.querySelectorAll(".filter-btn").forEach(e=>e.classList.remove("bg-white","text-indigo-600","shadow")),document.querySelector(`[data-filter="${V.activeFilter}"]`).classList.add("bg-white","text-indigo-600","shadow"),document.getElementById("finalizadas-datepicker").classList.toggle("hidden",V.activeFilter!=="finalizadas"),t.filterDate&&(document.getElementById("filter-date").value=new Date(t.filterDate).toISOString().split("T")[0]),await ct(),V.selectedComandaId&&ni(V.selectedComandaId)}const oi=document.getElementById("content");let Ea={};const xo=["#4f46e5","#10b981","#f59e0b","#ef4444","#8b5cf6","#ec4899","#06b6d4"],te={startDate:new Date(new Date().getFullYear(),new Date().getMonth(),1).toISOString().split("T")[0],endDate:new Date().toISOString().split("T")[0],selectedProfessional:"all",selectedCostCenter:"all",professionalsList:[],costCentersList:[],data:null,appointmentsData:[],currentTab:"dashboards"};async function Zx(){if(!window.Chart)return new Promise((t,e)=>{const s=document.createElement("script");s.src="https://cdn.jsdelivr.net/npm/chart.js",s.onload=t,s.onerror=e,document.head.appendChild(s)})}async function ew(){oi.innerHTML='<div class="flex flex-col items-center justify-center h-64"><div class="loader mb-4"></div><p class="text-gray-500">A carregar inteligência de dados...</p></div>';try{await Zx();const[t,e]=await Promise.all([ze(w.establishmentId),Zy(w.establishmentId).catch(()=>[])]);te.professionalsList=t||[],te.costCentersList=e||[],tw(),await gp()}catch(t){console.error("Erro no loadReportsPage:",t),oi.innerHTML=`
            <div class="flex flex-col items-center justify-center h-full text-red-500">
                <svg class="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <p>Erro ao carregar relatórios: ${P(t.message)}</p>
                <button onclick="window.location.reload()" class="mt-4 px-4 py-2 bg-gray-200 rounded text-gray-700 hover:bg-gray-300">Tentar Novamente</button>
            </div>`}}function tw(){const t=te.professionalsList.map(s=>`<option value="${s.id}">${P(s.name)}</option>`).join(""),e=te.costCentersList.map(s=>`<option value="${s.id}">${P(s.name)}</option>`).join("");oi.innerHTML=`
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
                                ${t}
                            </select>
                            <select id="report-cost" class="border rounded-lg px-2 py-2 text-sm bg-gray-50 focus:ring-2 focus:ring-indigo-500 outline-none w-full">
                                <option value="all">Todos Centros</option>
                                ${e}
                            </select>
                        </div>
                        <div class="flex gap-2">
                            <input type="date" id="report-start" value="${te.startDate}" class="border rounded-lg px-2 py-2 text-sm w-full">
                            <input type="date" id="report-end" value="${te.endDate}" class="border rounded-lg px-2 py-2 text-sm w-full">
                            <button id="btn-filter" class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 shadow-sm transition flex items-center justify-center">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <main id="report-content" class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6"></main>
        </div>
    `,document.getElementById("btn-filter").onclick=sw,document.querySelectorAll(".tab-btn").forEach(s=>{s.onclick=()=>{te.currentTab=s.dataset.tab,Md(),fp()}}),Md()}function Md(){document.querySelectorAll(".tab-btn").forEach(t=>{const e=t.dataset.tab===te.currentTab;t.className=e?"tab-btn flex-1 px-4 py-2 rounded-md text-sm font-bold bg-white text-indigo-600 shadow-sm transition-all whitespace-nowrap":"tab-btn flex-1 px-4 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-200 transition-all whitespace-nowrap"})}async function sw(){te.startDate=document.getElementById("report-start").value,te.endDate=document.getElementById("report-end").value,te.selectedProfessional=document.getElementById("report-prof").value,te.selectedCostCenter=document.getElementById("report-cost").value,await gp()}async function gp(){const t=document.getElementById("report-content");t.innerHTML='<div class="flex justify-center py-20"><div class="loader"></div></div>';try{const e=Yy(te.startDate,te.endDate,te.selectedProfessional,te.selectedCostCenter),s=te.selectedProfessional==="all"?null:te.selectedProfessional,n=new Date(te.startDate+"T00:00:00").toISOString(),o=new Date(te.endDate+"T23:59:59").toISOString(),r=cu(w.establishmentId,n,o,s).catch(c=>[]),[a,l]=await Promise.all([e,r]);te.data=a,te.appointmentsData=Array.isArray(l)?l:[],fp()}catch(e){console.error(e),t.innerHTML=`
            <div class="bg-red-50 border-l-4 border-red-500 p-4 rounded text-red-700 text-center">
                <p class="font-bold">Erro ao carregar dados</p>
                <p class="text-sm">${P(e.message||"Verifique sua conexão.")}</p>
            </div>`}}function fp(){const t=document.getElementById("report-content");if(te.data)switch(te.currentTab){case"dashboards":nw(t);break;case"appointments":ow(t);break;case"dre":rw(t);break}}function nw(t){const{dreSimple:e,charts:s}=te.data,n=e||{grossRevenue:0,netProfit:0,variableCosts:0},o=te.data.totalAppointments||0,r=o>0?n.grossRevenue/o:0;t.innerHTML=`
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 animate-fade-in">
            <div class="bg-white p-5 rounded-xl shadow-sm border-l-4 border-indigo-500">
                <p class="text-xs text-gray-500 font-bold uppercase">Faturamento</p>
                <p class="text-xl xl:text-2xl font-extrabold text-gray-800 mt-1">R$ ${n.grossRevenue.toFixed(2)}</p>
            </div>

            <div class="bg-white p-5 rounded-xl shadow-sm border-l-4 border-red-400">
                <p class="text-xs text-gray-500 font-bold uppercase">Comissões Pagas</p>
                <p class="text-xl xl:text-2xl font-extrabold text-red-600 mt-1">R$ ${n.variableCosts.toFixed(2)}</p>
            </div>

            <div class="bg-white p-5 rounded-xl shadow-sm border-l-4 border-green-500">
                <p class="text-xs text-gray-500 font-bold uppercase">Lucro Operacional</p>
                <p class="text-xl xl:text-2xl font-extrabold text-green-600 mt-1">R$ ${n.netProfit.toFixed(2)}</p>
                <p class="text-[10px] text-gray-400 mt-1">Faturamento (-) Comissões</p>
            </div>

            <div class="bg-white p-5 rounded-xl shadow-sm border-l-4 border-blue-500">
                <p class="text-xs text-gray-500 font-bold uppercase">Atendidos</p>
                <p class="text-xl xl:text-2xl font-extrabold text-blue-600 mt-1">${o}</p>
                <p class="text-[10px] text-gray-400 mt-1">Concluídos no período</p>
            </div>

            <div class="bg-white p-5 rounded-xl shadow-sm border-l-4 border-yellow-500">
                <p class="text-xs text-gray-500 font-bold uppercase">Ticket Médio</p>
                <p class="text-xl xl:text-2xl font-extrabold text-yellow-600 mt-1">R$ ${r.toFixed(2)}</p>
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
    `,bn("chart-monthly","bar","Receita Mensal",s.salesMonthly.labels,s.salesMonthly.data,xo[0]);const a=s.professionals.labels.map(c=>P(c));bn("chart-profs","doughnut","Total Vendas",a,s.professionals.data,xo),bn("chart-daily","line","Vendas Diárias",s.salesDaily.labels,s.salesDaily.data,xo[4]);const l=s.products.labels.map(c=>P(c));bn("chart-products","bar","Total Vendido",l,s.products.data,xo[1])}function ow(t){const e=te.appointmentsData,s=e.length;let n=0,o=0,r=0,a=0;const l={},c={};let d=new Date(te.startDate);const p=new Date(te.endDate);for(;d<=p;)l[d.toISOString().split("T")[0]]=0,d.setDate(d.getDate()+1);e.forEach(S=>{const _=parseFloat(S.totalAmount||S.price||0),D=(S.status||"").toLowerCase();let R=S.startTime?(S.startTime.toDate?S.startTime.toDate():new Date(S.startTime)).toISOString().split("T")[0]:"";const O=S.professionalName||"Sem Profissional";c[O]||(c[O]={name:O,count:0,value:0}),["cancelled","cancelado","no-show"].includes(D)?(o++,a+=_):(["completed","finalized","paid"].includes(D)&&n++,r+=_,R&&l.hasOwnProperty(R)&&l[R]++,c[O].count++,c[O].value+=_)});const h=Object.keys(l).sort(),f=h.map(S=>l[S]),x=Object.values(c).sort((S,_)=>_.count-S.count);t.innerHTML=`
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in">
            <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <p class="text-xs font-bold text-gray-500 uppercase">Total Agendamentos</p>
                <h3 class="text-3xl font-extrabold text-indigo-600 mt-1">${s-o}</h3>
                <p class="text-xs text-green-600 mt-1">${n} concluídos</p>
            </div>
            <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <p class="text-xs font-bold text-gray-500 uppercase">Valor Estimado</p>
                <h3 class="text-3xl font-extrabold text-gray-800 mt-1">R$ ${r.toLocaleString("pt-BR",{minimumFractionDigits:2})}</h3>
            </div>
            <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <p class="text-xs font-bold text-gray-500 uppercase">Cancelamentos</p>
                <h3 class="text-3xl font-extrabold text-red-500 mt-1">${o}</h3>
                <p class="text-xs text-red-400 mt-1">Perda: R$ ${a.toLocaleString("pt-BR",{minimumFractionDigits:2})}</p>
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
                        ${x.map(S=>`
                            <tr>
                                <td class="p-3 text-gray-800 font-medium">${P(S.name)}</td>
                                <td class="p-3 text-center"><span class="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full text-xs font-bold">${S.count}</span></td>
                                <td class="p-3 text-right text-gray-600">R$ ${S.value.toLocaleString("pt-BR",{minimumFractionDigits:2})}</td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
            </div>
        </div>
    `,bn("dailyApptChart","line","Agendamentos",h.map(S=>S.split("-").reverse().slice(0,2).join("/")),f,"#4f46e5")}function rw(t){const{dreFinancial:e}=te.data,s=Object.entries(e.revenues).map(([o,r])=>`
        <tr class="text-sm text-gray-600 bg-green-50/30 hover:bg-green-50 transition-colors">
            <td class="pl-8 py-2 border-l-4 border-transparent hover:border-green-400">${P(o)}</td>
            <td class="text-right pr-6 py-2 text-green-700 font-medium">R$ ${r.toFixed(2)}</td>
            <td class="text-right pr-4 text-xs text-gray-400">${e.totalRevenues>0?(r/e.totalRevenues*100).toFixed(1):0}%</td>
        </tr>
    `).join(""),n=Object.entries(e.expenses).map(([o,r])=>`
        <tr class="text-sm text-gray-600 bg-red-50/30 hover:bg-red-50 transition-colors">
            <td class="pl-8 py-2 border-l-4 border-transparent hover:border-red-400">${P(o)}</td>
            <td class="text-right pr-6 py-2 text-red-600 font-medium">- R$ ${r.toFixed(2)}</td>
            <td class="text-right pr-4 text-xs text-gray-400">${e.totalRevenues>0?(r/e.totalRevenues*100).toFixed(1):0}%</td>
        </tr>
    `).join("");t.innerHTML=`
        <div class="max-w-4xl mx-auto bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden animate-fade-in mb-10">
            <div class="bg-gray-900 text-white p-6 text-center relative overflow-hidden">
                <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                <h2 class="text-xl font-bold uppercase tracking-widest">DRE Gerencial Detalhado</h2>
                <p class="text-sm opacity-75 mt-1">
                    ${new Date(te.startDate).toLocaleDateString("pt-BR")} até ${new Date(te.endDate).toLocaleDateString("pt-BR")}
                </p>
            </div>
            
            <table class="w-full">
                <tbody class="divide-y divide-gray-100">
                    <tr class="font-bold text-gray-800 bg-blue-50">
                        <td class="p-4">1. RECEITAS OPERACIONAIS</td>
                        <td class="p-4 text-right text-blue-800 font-extrabold">R$ ${e.totalRevenues.toFixed(2)}</td>
                        <td class="p-4 text-right w-24 text-blue-800">100%</td>
                    </tr>
                    ${s||'<tr><td colspan="3" class="pl-8 py-3 text-sm text-gray-400 italic">Nenhuma receita lançada no financeiro.</td></tr>'}

                    <tr class="font-bold text-gray-800 bg-orange-50 mt-4 border-t border-orange-100">
                        <td class="p-4">2. (-) CUSTOS E DESPESAS</td>
                        <td class="p-4 text-right text-red-600 font-extrabold">- R$ ${e.totalExpenses.toFixed(2)}</td>
                        <td class="p-4 text-right text-xs text-red-600 font-bold">
                            ${e.totalRevenues>0?(e.totalExpenses/e.totalRevenues*100).toFixed(1):0}%
                        </td>
                    </tr>
                    ${n||'<tr><td colspan="3" class="pl-8 py-3 text-sm text-gray-400 italic">Nenhuma despesa lançada no financeiro.</td></tr>'}

                    <tr class="font-extrabold text-white ${e.netResult>=0?"bg-green-600":"bg-red-600"} text-lg border-t-4 border-white shadow-inner">
                        <td class="p-6">3. (=) RESULTADO DO EXERCÍCIO</td>
                        <td class="p-6 text-right">R$ ${e.netResult.toFixed(2)}</td>
                        <td class="p-6 text-right opacity-90">
                            ${e.totalRevenues>0?(e.netResult/e.totalRevenues*100).toFixed(1):0}%
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    `}function bn(t,e,s,n,o,r){const a=document.getElementById(t);if(!a)return;const l=a.getContext("2d");Ea[t]&&Ea[t].destroy();const c={type:e,data:{labels:n,datasets:[{label:s,data:o,backgroundColor:Array.isArray(r)?r:e==="line"?"rgba(79, 70, 229, 0.1)":r,borderColor:Array.isArray(r)?"#fff":r,borderWidth:2,fill:e==="line",tension:.3,borderRadius:e==="bar"?4:0,pointBackgroundColor:"#fff",pointBorderColor:r,pointHoverBackgroundColor:r}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:e==="doughnut",position:"bottom"},tooltip:{backgroundColor:"rgba(17, 24, 39, 0.9)",padding:10,cornerRadius:8,callbacks:{label:d=>{let p=d.dataset.label||"";return p&&(p+=": "),d.parsed.y!==null?p+=new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(d.parsed.y):p+=d.raw,p}}}},scales:e==="doughnut"?{}:{y:{beginAtZero:!0,grid:{color:"#f3f4f6"},ticks:{font:{size:11}}},x:{grid:{display:!1},ticks:{font:{size:11}}}}}};Ea[t]=new Chart(l,c)}const $r=(t,e="products")=>F(`/api/${e}/categories/${t}`),bp=(t,e="products")=>F(`/api/${e}/categories`,{method:"POST",body:JSON.stringify(t)}),vp=(t,e="products")=>F(`/api/${e}/categories/${t}`,{method:"DELETE"}),aw="audit_logs",js=async(t,e,s,n,o,r=null)=>{try{if(!e)return;await ru(At(Ae,aw),{establishmentId:t,userId:e.uid,userName:e.name||e.email||"Utilizador",module:s,action:n,description:o,details:r,timestamp:new Date})}catch(a){console.error("Falha silenciosa ao registar log:",a)}},Wt=document.getElementById("content");let It=null,Tn="services",ts="all";function Hs(){const t=_e.currentUser;return t?{uid:t.uid,name:t.displayName||t.email}:{uid:"unknown",name:"Desconhecido"}}async function iw(t){t.preventDefault();const s=t.target.closest("#categoryForm").querySelector("#categoryName"),n=s.value;if(n)try{await bp({establishmentId:w.establishmentId,name:n},"services"),js(w.establishmentId,Hs(),"Categorias (Serviços)","Criou",`Criou categoria: ${n}`),s.value="",k("Sucesso","Categoria criada!","success"),await tl(),await Xn()}catch(o){k("Erro",`Não foi possível criar a categoria: ${o.message}`,"error")}}async function lw(t){if(await re("Apagar Categoria","Tem a certeza? Os serviços nesta categoria ficarão sem categoria."))try{await vp(t,"services"),js(w.establishmentId,Hs(),"Categorias (Serviços)","Excluiu",`Excluiu uma categoria (ID: ${t})`),k("Sucesso","Categoria apagada.","success"),await tl(),await Xn()}catch{k("Erro","Não foi possível apagar a categoria.","error")}}async function tl(){const t=document.getElementById("categoryList");if(t){t.innerHTML='<div class="loader mx-auto my-4"></div>';try{const e=await $r(w.establishmentId,"services");w.serviceCategories=e,t.innerHTML="",e.length>0?t.innerHTML=e.map(s=>`
                <div class="flex justify-between items-center bg-gray-100 p-2 rounded">
                    <span>${P(s.name)}</span>
                    <button data-action="delete-category" data-id="${s.id}" class="text-red-500 hover:text-red-700 font-semibold text-sm">Apagar</button>
                </div>`).join(""):t.innerHTML='<p class="text-center text-gray-500">Nenhuma categoria criada.</p>'}catch{t.innerHTML='<p class="text-red-500 text-center">Erro ao carregar categorias.</p>'}}}function cw(){Pe({title:"Gerir Categorias de Serviços",contentHTML:`
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
    `,maxWidth:"max-w-xl"});const e=document.getElementById("genericModal");if(e){const s=e.querySelector("#categoryForm");s&&(s.addEventListener("submit",iw),e.addEventListener("click",n=>{const o=n.target.closest('button[data-action="delete-category"]');o&&(n.preventDefault(),lw(o.dataset.id))}))}tl()}async function dw(t){t.preventDefault();const e=t.target.closest("#serviceModal"),s=e.querySelector("#serviceId").value,n={},o=e.querySelector('input[name="commissionType"]:checked').value;o==="custom"&&e.querySelectorAll(".professional-commission-row").forEach(a=>{const l=a.dataset.profId;if(a.querySelector('input[type="checkbox"]').checked){const d=parseFloat(a.querySelector('input[type="number"]').value);n[l]=isNaN(d)?0:d}});const r={establishmentId:w.establishmentId,name:e.querySelector("#serviceName").value,price:parseFloat(e.querySelector("#servicePrice").value),duration:parseInt(e.querySelector("#serviceDurationMinutes").value,10),bufferTime:parseInt(e.querySelector("#serviceBufferTimeMinutes").value,10)||0,categoryId:e.querySelector("#serviceCategory").value||null,commissionRate:parseFloat(e.querySelector("#serviceCommissionRate").value)||0,active:e.querySelector("#serviceStatus").value==="true",photo:e.querySelector("#servicePhotoBase64").value,notes:e.querySelector("#serviceNotes").value,commissionType:o,professionalCommissions:n};try{s?(await jh(s,r),js(w.establishmentId,Hs(),"Serviços","Editou",`Editou o serviço: ${r.name}`)):(await mu(r),js(w.establishmentId,Hs(),"Serviços","Criou",`Criou novo serviço: ${r.name}`)),document.getElementById("serviceModal").style.display="none",k("Sucesso",`Serviço ${s?"atualizado":"adicionado"} com sucesso!`,"success"),await Xn()}catch(a){k("Erro",a.message,"error")}}function Nd(t=null){const e=document.getElementById("serviceModal"),s=w.serviceCategories||[],n=t?.duration||0,o=t?.bufferTime||0,r=P(t?.name||""),a=P(t?.notes||""),l=t?r:"Novo Serviço",c=s.map(B=>`<option value="${B.id}" ${t?.categoryId===B.id?"selected":""}>${P(B.name)}</option>`).join("");e.innerHTML=`
    <div class="modal-content max-w-3xl overflow-y-auto max-h-[85vh] my-auto">
        <form id="serviceForm">
            <input type="hidden" id="serviceId" value="${t?.id||""}">
            <input type="hidden" id="servicePhotoBase64" value="${t?.photo||""}">
            
            <div class="flex justify-between items-center mb-4">
                <h2 id="serviceModalTitle" class="text-2xl font-bold text-gray-800">${l}</h2>
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
                        <img id="servicePhotoPreview" src="${t?.photo||"https://placehold.co/128x128/E2E8F0/4A5568?text=Foto"}" alt="Foto do Serviço" class="w-32 h-32 rounded-lg object-cover mb-3 border-4 border-gray-200 bg-gray-50">
                        <input type="file" id="servicePhotoInput" class="hidden" accept="image/*">
                        <button type="button" id="servicePhotoButton" class="bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">Alterar Imagem</button>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label for="serviceName" class="block text-sm font-medium text-gray-700">Nome do serviço</label>
                        <input type="text" id="serviceName" value="${r}" class="mt-1 w-full p-2 border rounded-md" required>
                    </div>
                    <div>
                        <label for="servicePrice" class="block text-sm font-medium text-gray-700">Preço (a partir de:)</label>
                        <input type="number" id="servicePrice" step="0.01" value="${t?.price||""}" class="mt-1 w-full p-2 border rounded-md" required>
                    </div>
                    <div>
                        <label for="serviceCategory" class="block text-sm font-medium text-gray-700">Categoria</label>
                        <select id="serviceCategory" class="mt-1 w-full p-2 border rounded-md bg-white">
                            <option value="">Sem Categoria</option>
                            ${c}
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
                    <textarea id="serviceNotes" rows="3" class="mt-1 w-full p-2 border rounded-md">${a}</textarea>
                </div>
                <div>
                    <label for="serviceStatus" class="block text-sm font-medium text-gray-700">Status</label>
                    <select id="serviceStatus" class="mt-1 w-full p-2 border rounded-md bg-white">
                        <option value="true" ${t?.active!==!1?"selected":""}>Ativo</option>
                        <option value="false" ${t?.active===!1?"selected":""}>Inativo</option>
                    </select>
                </div>
            </div>
            
            <div id="tab-content-comissoes" class="tab-content hidden space-y-6">
                <div>
                    <label class="block text-lg font-medium text-gray-800">Tipo de comissão</label>
                    <p class="text-sm text-gray-500">Qual o tipo de comissão que é paga neste serviço?</p>
                    <div class="mt-2 space-y-2">
                        <label class="flex items-center p-3 border rounded-md has-[:checked]:bg-indigo-50 has-[:checked]:border-indigo-400 cursor-pointer">
                            <input type="radio" name="commissionType" value="default" class="h-4 w-4 text-indigo-600 border-gray-300" ${t?.commissionType!=="custom"?"checked":""}>
                            <span class="ml-3 text-sm text-gray-700 font-medium">Padrão para todos os profissionais</span>
                        </label>
                        <label class="flex items-center p-3 border rounded-md has-[:checked]:bg-indigo-50 has-[:checked]:border-indigo-400 cursor-pointer">
                            <input type="radio" name="commissionType" value="custom" class="h-4 w-4 text-indigo-600 border-gray-300" ${t?.commissionType==="custom"?"checked":""}>
                            <span class="ml-3 text-sm text-gray-700 font-medium">Diferente para cada profissional</span>
                        </label>
                    </div>
                </div>
                <div id="defaultCommissionRateContainer">
                    <label for="serviceCommissionRate" class="block text-sm font-medium text-gray-700">Comissão Padrão (%)</label>
                    <input type="number" id="serviceCommissionRate" value="${t?.commissionRate||0}" class="mt-1 w-32 p-2 border rounded-md">
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
                    data-id="${t?.id||""}" 
                    class="w-full sm:w-auto text-red-600 hover:text-red-800 transition-colors ${t?"":"hidden"}"
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
    </div>`,e.style.display="flex",e.addEventListener("click",async B=>{const H=B.target.closest("button[data-action]");if(!H)return;const G=H.dataset.action,T=H.dataset.id;if(G==="close-modal"&&(e.style.display="none"),G==="delete-service"){if(!T)return;if(e.style.display="none",await re("Apagar Serviço","Tem a certeza que deseja apagar este serviço?"))try{const v=w.services.find(I=>I.id===T)?.name||"Desconhecido";await Hh(T),js(w.establishmentId,Hs(),"Serviços","Excluiu",`Excluiu o serviço: ${v}`),k("Sucesso","Serviço apagado com sucesso!","success"),await Xn()}catch(v){k("Erro",`Não foi possível apagar o serviço: ${v.message}`,"error")}else e.style.display="flex"}});const d=e.querySelectorAll(".tab-btn"),p=e.querySelectorAll(".tab-content");d.forEach(B=>{B.addEventListener("click",()=>{d.forEach(H=>{H.classList.remove("border-indigo-500","text-indigo-600"),H.classList.add("border-transparent","text-gray-500","hover:text-gray-700","hover:border-gray-300")}),B.classList.add("border-indigo-500","text-indigo-600"),B.classList.remove("border-transparent","text-gray-500","hover:text-gray-700","hover:border-gray-300"),p.forEach(H=>H.classList.add("hidden")),document.getElementById(`tab-content-${B.dataset.tab}`).classList.remove("hidden")})});const h=e.querySelectorAll('input[name="commissionType"]'),f=document.getElementById("defaultCommissionRateContainer"),x=document.getElementById("professionalCommissionsContainer");function S(){const B=e.querySelector('input[name="commissionType"]:checked').value;f&&(f.style.display=B==="default"?"block":"none"),x&&(x.style.display=B==="custom"?"block":"none")}h.forEach(B=>B.addEventListener("change",S));const _=document.getElementById("professionalCommissionsList");_&&(_.innerHTML=(w.professionals||[]).map(B=>{const H=t?.professionalCommissions?.[B.id]!==void 0,G=t?.professionalCommissions?.[B.id]||0;return`
                <div class="professional-commission-row flex items-center justify-between p-2 rounded-md ${H?"bg-blue-50":""}" data-prof-id="${B.id}">
                    <label class="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" ${H?"checked":""} class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                        <img src="${B.photo||`https://placehold.co/40x40/E2E8F0/4A5568?text=${P(B.name.charAt(0))}`}" class="w-8 h-8 rounded-full object-cover">
                        <span class="text-sm font-medium">${P(B.name)}</span>
                    </label>
                    <div class="flex items-center gap-1">
                        <input type="number" value="${G}" class="w-20 p-1 border rounded-md text-sm text-center" ${H?"":"disabled"}>
                        <span class="text-sm font-semibold">%</span>
                    </div>
                </div>
            `}).join(""),_.querySelectorAll('input[type="checkbox"]').forEach(B=>{B.addEventListener("change",H=>{const G=H.target.closest(".professional-commission-row");G.querySelector('input[type="number"]').disabled=!H.target.checked,G.classList.toggle("bg-blue-50",H.target.checked)})})),S();const D=e.querySelector("#serviceForm"),R=e.querySelector("#servicePhotoInput"),O=e.querySelector("#servicePhotoPreview"),N=e.querySelector("#servicePhotoBase64");e.querySelector("#servicePhotoButton").addEventListener("click",()=>R.click()),R.onchange=async()=>{const B=R.files[0];if(B){O.src="https://placehold.co/128x128/E2E8F0/4A5568?text=...";try{const H=await ap(B,800,800,.8),T=H.length*3/4,b=1e3*1024;if(T>b)throw new Error("A imagem é muito grande mesmo após a compressão.");O.src=H,N.value=H}catch(H){console.error("Erro ao processar imagem:",H),k("Erro de Imagem",H.message||"Não foi possível processar a imagem.","error"),O.src=t?.photo||"https://placehold.co/128x128/E2E8F0/4A5568?text=Foto",N.value=t?.photo||"",R.value=""}}},D.addEventListener("submit",dw)}function Ts(){const t=document.getElementById("servicesList");if(!t)return;const e=document.getElementById("serviceSearchInput")?.value.toLowerCase()||"",s=document.getElementById("serviceCategoryFilter")?.value||"all",n=new Map((w.serviceCategories||[]).map(r=>[r.id,r.name]));let o=(w.services||[]).filter(Boolean);if(ts!=="all"){const r=ts==="active";o=o.filter(a=>a.active!==!1===r)}o=o.filter(r=>{const a=r.name.toLowerCase().includes(e),l=s==="all"||r.categoryId===s;return a&&l}),t.innerHTML="",o.length>0?o.forEach(r=>{const a=document.createElement("div"),l=JSON.stringify(r).replace(/'/g,"&apos;");a.className=`service-card bg-white rounded-lg shadow-md flex overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-lg hover:bg-gray-50 ${r.active!==!1?"opacity-100":"opacity-50 bg-gray-100"} sm:flex-col`,a.dataset.action="edit-service",a.dataset.service=l;const c=P(r.name),d=P(n.get(r.categoryId)||"N/A"),p=r.photo||`https://placehold.co/200x200/E2E8F0/4A5568?text=${encodeURIComponent(r.name.charAt(0))}`;a.innerHTML=`
                <img src="${p}" alt="Imagem de ${c}" class="w-20 h-20 object-cover flex-shrink-0 sm:w-full sm:h-24">
                
                <div class="p-3 flex flex-col flex-grow justify-between w-full">
                    <div class="flex justify-between items-start mb-1">
                        <h3 class="text-sm font-bold text-gray-900 flex-1 text-left truncate pr-2">${c}</h3>
                        <label class="flex items-center cursor-pointer ml-2" data-action-stop-propagation="true">
                            <div class="relative">
                                <input type="checkbox" data-action="toggle-service-status" data-id="${r.id}" class="sr-only" ${r.active!==!1?"checked":""}>
                                <div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full"></div>
                            </div>
                        </label>
                    </div>

                    <p class="text-xl font-bold text-indigo-600 mb-1 text-left hidden sm:block">R$ ${r.price.toFixed(2)}</p>

                    <div>
                        <div class="hidden sm:block">
                            <p class="text-xs text-gray-500 text-left mb-1 truncate">Categoria: ${d}</p>
                            <p class="text-xs text-gray-500 text-left">Duração: ${r.duration} min (+${r.bufferTime||0} min extra)</p>
                        </div>
                        <div class="flex justify-between items-center sm:hidden mt-2">
                            <p class="text-lg font-bold text-indigo-600 text-left">R$ ${r.price.toFixed(2)}</p>
                            <p class="text-xs text-gray-500 text-right">${r.duration} min</p>
                        </div>
                    </div>
                </div>`,t.appendChild(a)}):t.innerHTML='<p class="col-span-full text-center text-gray-500 py-10">Nenhum serviço encontrado.</p>'}function sl(){const t={active:0,inactive:0,total:0},e=(w.services||[]).filter(Boolean);e.forEach(a=>{a.active===!1?t.inactive++:t.active++}),t.total=e.length;const s=document.getElementById("indicator-total"),n=document.getElementById("indicator-active"),o=document.getElementById("indicator-inactive"),r=document.getElementById("indicator-popular");s&&(s.textContent=t.total),n&&(n.textContent=t.active),o&&(o.textContent=t.inactive),r&&(w.mostPopularService&&w.mostPopularService.name!=="N/A"?(r.textContent=P(w.mostPopularService.name),r.closest(".indicator-card").title=`${w.mostPopularService.name} (${w.mostPopularService.count} agendamentos)`):(r.textContent="N/A",r.closest(".indicator-card").title="Nenhum serviço agendado ainda"))}function uw(){const t=document.getElementById("services-content-container");t.innerHTML=`
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
    `;const e=document.getElementById("serviceCategoryFilter");e&&(e.innerHTML='<option value="all">Todas as categorias</option>',(w.serviceCategories||[]).forEach(s=>e.innerHTML+=`<option value="${s.id}">${P(s.name)}</option>`)),sl(),Ts()}function mw(){const t=document.getElementById("services-content-container");t.innerHTML=`
        <div class="p-8 text-center">
            <h3 class="text-xl font-bold text-gray-700">Relatórios de Serviços</h3>
            <p class="text-gray-500 mt-2">Em breve, aqui poderás ver relatórios detalhados sobre os teus serviços mais rentáveis, mais agendados e muito mais.</p>
        </div>
    `}async function Xn(){const t=document.getElementById("services-content-container");if(t){const e=t.querySelector(".loader");e&&(e.style.display="block")}try{const[e,s,n,o]=await Promise.all([ps(w.establishmentId),ze(w.establishmentId),$r(w.establishmentId,"services"),zh(w.establishmentId)]);w.services=(e||[]).filter(Boolean),w.professionals=(s||[]).filter(Boolean),w.serviceCategories=(n||[]).filter(Boolean),w.mostPopularService=o||{name:"N/A",count:0},w.services.forEach(r=>{r.active===void 0&&(r.active=!0)}),yp(Tn)}catch(e){t&&(t.innerHTML='<p class="text-red-500 col-span-full text-center py-10">Erro ao carregar dados. Verifique a conexão com o servidor.</p>'),k("Erro",`Não foi possível carregar os dados: ${e.message}`,"error")}}function yp(t){if(document.getElementById("services-content-container")){if(Tn===t&&document.getElementById("services-content-container").children.length>1){Tn==="services"&&(sl(),Ts());return}Tn=t,ts="all",document.querySelectorAll("#services-tabs button.tab-button").forEach(e=>{const s=e.dataset.view===t;e.classList.toggle("border-indigo-500",s),e.classList.toggle("text-indigo-600",s),e.classList.toggle("border-transparent",!s),e.classList.toggle("text-gray-500",!s)}),t==="services"?uw():t==="reports"&&mw()}}function pw(){It&&(Wt.removeEventListener("click",It),Wt.removeEventListener("input",It),Wt.removeEventListener("change",It)),It=async t=>{const e=t.target;if(e.closest('[data-action="toggle-service-status"]')){t.stopPropagation();const o=e.closest('[data-action="toggle-service-status"]'),r=o.dataset.id,a=o.checked;try{await Uh(r,a);const l=w.services.findIndex(c=>c.id===r);l>-1&&(w.services[l].active=a),js(w.establishmentId,Hs(),"Serviços","Atualizou Status",`Alterou status do serviço (ID: ${r}) para ${a?"Ativo":"Inativo"}`),Ts(),sl()}catch(l){k("Erro",`Não foi possível atualizar o status: ${l.message}`,"error"),o.checked=!a,Ts()}return}const s=e.closest("button[data-action], button[data-view], .indicator-card[data-action], .service-card[data-action]");if(e.id==="serviceSearchInput"||e.id==="serviceCategoryFilter"){Ts();return}if(!s)return;if(s.hasAttribute("data-view")){yp(s.dataset.view);return}switch(s.dataset.action){case"new-service":Nd();break;case"edit-service":const o=JSON.parse(s.dataset.service);Nd(o);break;case"manage-categories":cw();break;case"filter-service":const r=s.dataset.filterType;if(r==="popular")return;ts=r==="total"?"all":r,document.querySelectorAll('.indicator-card[data-action="filter-service"]').forEach(a=>{const l=a.dataset.filterType,d=l===ts||l==="total"&&ts==="all";a.classList.toggle("ring-2",d),a.classList.toggle("ring-indigo-500",d),a.classList.toggle("shadow-lg",d)}),Ts();break}},Wt.addEventListener("click",It),Wt.addEventListener("input",It),Wt.addEventListener("change",It)}async function hw(){Wt.innerHTML=`
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
        </section>`,pw();try{(!w.professionals||w.professionals.length===0)&&(w.professionals=await ze(w.establishmentId)||[])}catch(t){console.error("Falha ao carregar profissionais:",t),k("Erro","Não foi possível carregar a lista de profissionais.","error"),w.professionals=[]}Tn="services",ts="all",await Xn()}const Dr="suppliers",nl="purchases",xp="financial_payables",ol=async t=>{try{const e=cr(At(Ae,Dr),Dn("establishmentId","==",t)),s=await ui(e),n=[];return s.forEach(o=>{n.push({id:o.id,...o.data()})}),n}catch(e){throw console.error("Erro ao buscar fornecedores:",e),e}},gw=async t=>{try{return{id:(await ru(At(Ae,Dr),t)).id,...t}}catch(e){throw console.error("Erro ao criar fornecedor:",e),e}},fw=async(t,e)=>{try{const s=rs(Ae,Dr,t);return await lu(s,e),{id:t,...e}}catch(s){throw console.error("Erro ao atualizar fornecedor:",s),s}},bw=async t=>{try{const e=rs(Ae,Dr,t);return await vh(e),!0}catch(e){throw console.error("Erro ao excluir fornecedor:",e),e}},vw=async(t,e=null)=>{try{const s=iu(Ae),n=rs(At(Ae,nl)),o={...t,createdAt:hc()};if(s.set(n,o),e&&e.defaultNatureId&&e.defaultCostCenterId){const r=rs(At(Ae,xp)),a=new Date().toISOString().split("T")[0],l={establishmentId:t.establishmentId,description:`Compra - ${t.supplierName}`,amount:parseFloat(t.totalAmount),dueDate:a,naturezaId:e.defaultNatureId,centroDeCustoId:e.defaultCostCenterId,notes:`Gerado automaticamente pelo Pedido de Compra. Itens: ${t.items.length}`,status:"pending",paymentDate:null,purchaseId:n.id,createdAt:hc()};s.set(r,l)}return await s.commit(),{id:n.id,...o}}catch(s){throw console.error("Erro ao registrar compra com integração:",s),s}},yw=async(t,e)=>{try{const s=iu(Ae),n=rs(Ae,nl,t);s.delete(n);const o=cr(At(Ae,xp),Dn("purchaseId","==",t),Dn("establishmentId","==",e));return(await ui(o)).forEach(a=>{s.delete(a.ref)}),await s.commit(),!0}catch(s){throw console.error("Erro ao excluir compra e financeiro:",s),s}},xw=async t=>{try{const e=cr(At(Ae,nl),Dn("establishmentId","==",t),au("createdAt","desc")),s=await ui(e),n=[];return s.forEach(o=>{n.push({id:o.id,...o.data()})}),n}catch(e){throw console.error("Erro ao buscar histórico de compras:",e),e}},Ht=document.getElementById("content");let St=null,kn="products",lt="all";async function ww(t){t.preventDefault();const s=t.target.closest("#categoryForm").querySelector("#categoryName"),n=s.value;if(n)try{await bp({establishmentId:w.establishmentId,name:n},"products"),s.value="",k("Sucesso","Categoria de produto criada!","success"),await rl(),await Yn()}catch(o){k("Erro",`Não foi possível criar a categoria: ${o.message}`,"error")}}async function Ew(t){if(await re("Apagar Categoria","Tem a certeza? Os produtos nesta categoria ficarão sem categoria."))try{await vp(t,"products"),k("Sucesso","Categoria de produto apagada.","success"),await rl(),await Yn()}catch{k("Erro","Não foi possível apagar a categoria.","error")}}async function rl(){const t=document.getElementById("categoryList");if(t){t.innerHTML='<div class="loader mx-auto my-4"></div>';try{const e=await $r(w.establishmentId,"products");w.categories=e,t.innerHTML="",e.length>0?t.innerHTML=e.map(s=>`
                <div class="flex justify-between items-center bg-gray-100 p-2 rounded">
                    <span>${P(s.name)}</span>
                    <button data-action="delete-category" data-id="${s.id}" class="text-red-500 hover:text-red-700 font-semibold text-sm">Apagar</button>
                </div>`).join(""):t.innerHTML='<p class="text-center text-gray-500">Nenhuma categoria encontrada.</p>'}catch{t.innerHTML='<p class="text-red-500 text-center">Erro ao carregar categorias.</p>'}}}function Iw(){Pe({title:"Gerir Categorias de Produtos",contentHTML:`
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
    `,maxWidth:"max-w-xl"});const e=document.getElementById("genericModal");if(e){const s=e.querySelector("#categoryForm");s&&(s.addEventListener("submit",ww),e.addEventListener("click",n=>{const o=n.target.closest('button[data-action="delete-category"]');o&&Ew(o.dataset.id)}))}rl()}async function Sw(t){if(!t)return;if(await re("Apagar Produto","Tem a certeza que deseja apagar este produto? Esta ação não pode ser revertida."))try{await Gh(t),k("Sucesso","Produto apagado com sucesso!","success"),await Yn()}catch(s){k("Erro",`Não foi possível apagar o produto: ${s.message}`,"error")}}async function Tw(t){const e=t.querySelector("#productId").value,s=parseInt(t.querySelector("#productCurrentStock").value),n=parseInt(t.querySelector("#productMinStock").value),o=parseInt(t.querySelector("#productMaxStock").value),r=t.querySelectorAll("#selectedSuppliersList .selected-supplier-item"),a=Array.from(r).map(c=>c.dataset.id),l={establishmentId:w.establishmentId,name:t.querySelector("#productName").value,price:parseFloat(t.querySelector("#productPrice").value),costPrice:parseFloat(t.querySelector("#productCostPrice").value)||0,commissionRate:parseFloat(t.querySelector("#productCommissionRate").value)||0,currentStock:isNaN(s)?0:s,minStock:isNaN(n)?0:n,maxStock:isNaN(o)?0:o,categoryId:t.querySelector("#productCategory").value||null,photo:t.querySelector("#productPhotoBase64").value,supplierIds:a};try{e?await Wh(e,l):await pu(l),document.getElementById("productModal").style.display="none",k("Sucesso",`Produto ${e?"atualizado":"adicionado"} com sucesso!`,"success"),await Yn()}catch(c){throw new Error(c.message)}}function Bd(t,e=800,s=800,n="image/jpeg",o=.8){return new Promise((r,a)=>{if(!t.type.startsWith("image/"))return a(new Error("O ficheiro selecionado não é uma imagem."));const l=new FileReader;l.onload=c=>{const d=new Image;d.onload=()=>{let p=d.width,h=d.height;p>h?p>e&&(h*=e/p,p=e):h>s&&(p*=s/h,h=s);const f=document.createElement("canvas");f.width=p,f.height=h,f.getContext("2d").drawImage(d,0,0,p,h);const S=f.toDataURL(n,o);r(S)},d.onerror=p=>a(new Error("Não foi possível carregar a imagem.")),d.src=c.target.result},l.onerror=c=>a(new Error("Não foi possível ler o ficheiro.")),l.readAsDataURL(t)})}function Vd(t=null){const e=document.getElementById("productModal"),s=w.categories||[],n=w.suppliers||[],o=s.map(b=>`<option value="${b.id}" ${t?.categoryId===b.id?"selected":""}>${P(b.name)}</option>`).join("");let r=new Set(t?.supplierIds||[]);const a=P(t?.name||""),l=t?.price||"",c=t?.costPrice||"",d=t?.commissionRate||"",p=t?.minStock||0,h=t?.maxStock||0,f=t?.currentStock||0,x=t?a:"Novo Produto";e.innerHTML=`
    <div class="modal-content max-w-3xl overflow-y-auto max-h-[90vh]">
        <form id="productForm">
            <input type="hidden" id="productId" value="${t?.id||""}">
            <input type="hidden" id="productPhotoBase64" value="${t?.photo||""}">
            
            <div class="flex justify-between items-center mb-4">
                <h2 id="productModalTitle" class="text-2xl font-bold text-gray-800">${x}</h2>
                <button type="button" data-action="close-modal" data-target="productModal" class="text-2xl font-bold">&times;</button>
            </div>

            <div class="p-0">
                <div class="border-b border-gray-200 mb-6">
                    <nav class="-mb-px flex space-x-6 overflow-x-auto" aria-label="Tabs">
                        <button type="button" data-tab="dados" class="tab-btn whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm border-indigo-500 text-indigo-600">Dados</button>
                        <button type="button" data-tab="stock" class="tab-btn whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 ${t?"":"hidden"}">Ajustar Estoque</button>
                        <button type="button" data-tab="suppliers" class="tab-btn whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300">Fornecedores</button>
                    </nav>
                </div>

                <div id="tab-content-dados" class="tab-content space-y-4">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div class="md:col-span-1 space-y-4">
                            <div class="form-group"><label>Imagem do Produto</label><div class="mt-1 flex flex-col items-center"><img id="productPhotoPreview" src="${t?.photo||"https://placehold.co/128x128/E2E8F0/4A5568?text=Foto"}" alt="Foto do Produto" class="w-32 h-32 rounded-lg object-cover mb-3 border-4 border-gray-200 bg-gray-50"><input type="file" id="productPhotoInput" class="hidden" accept="image/*"><button type="button" id="productPhotoButton" class="bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">Alterar Imagem</button></div></div>
                        </div>
                        <div class="md:col-span-2"><div class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                            <div class="form-group sm:col-span-2"><label for="productName">Nome do Produto</label><input type="text" id="productName" value="${a}" required class="mt-1 w-full p-2 border rounded-md"></div>
                            
                            <div class="form-group sm:col-span-2"><label for="productCategory">Categoria</label><select id="productCategory" class="mt-1 w-full p-2 border rounded-md bg-white"><option value="">Sem categoria</option>${o}</select></div>
                            
                            <div class="form-group"><label for="productPrice">Preço Venda (R$)</label><input type="number" id="productPrice" step="0.01" value="${l}" required class="mt-1 w-full p-2 border rounded-md"></div>
                            
                            <div class="form-group"><label for="productCostPrice">Preço de Custo Médio (R$)</label><input type="number" id="productCostPrice" step="0.01" value="${c}" class="mt-1 w-full p-2 border rounded-md" placeholder="0.00"></div>
                            
                            <div class="form-group"><label for="productCommissionRate">Comissão (%)</label><input type="number" id="productCommissionRate" placeholder="Ex: 10" value="${d}" class="mt-1 w-full p-2 border rounded-md"></div>
                        </div></div>
                    </div>
                    <div class="mt-6 pt-6 border-t"><h3 class="text-lg font-semibold text-gray-700 text-left mb-4">Controlo de Stock (Definições)</h3><div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div class="form-group"><label for="productCurrentStock">Atual</label><input type="number" id="productCurrentStock" value="${f}" readonly class="mt-1 w-full p-2 border rounded-md bg-gray-100"></div>
                        <div class="form-group"><label for="productMinStock">Mínimo (Alerta)</label><input type="number" id="productMinStock" value="${p}" class="mt-1 w-full p-2 border rounded-md"></div>
                        <div class="form-group"><label for="productMaxStock">Máximo</label><input type="number" id="productMaxStock" value="${h}" class="mt-1 w-full p-2 border rounded-md"></div>
                    </div></div>
                </div>

                <div id="tab-content-stock" class="tab-content hidden space-y-6">
                    <p class="text-sm text-gray-600">Use esta secção para registar entradas (compras) ou saídas (perdas) manuais. O estoque atual é <strong id="currentStockDisplay" class="text-lg">${f}</strong>.</p>
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
                    data-id="${t?.id||""}" 
                    class="w-full sm:w-auto text-red-600 hover:text-red-800 transition-colors ${t?"":"hidden"}"
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
    </div>`;const S=e.querySelector("#productCategory"),_=e.querySelector("#productPhotoInput");e.querySelector("#productPhotoButton").addEventListener("click",()=>_.click()),S.innerHTML='<option value="">Sem categoria</option>'+(w.categories||[]).map(b=>`<option value="${b.id}" ${t?.categoryId===b.id?"selected":""}>${P(b.name)}</option>`).join(""),t&&(S.value=t.categoryId||"");const D=e.querySelector("#productPhotoPreview");e.querySelector("#productPhotoBase64");const R=t?.photo||"https://placehold.co/128x128/E2E8F0/4A5568?text=Foto",O=t?.photo||"";_.onchange=async()=>{const b=_.files[0];if(b){D.src="https://placehold.co/128x128/E2E8F0/4A5568?text=...";try{const v=await Bd(b,800,800,"image/jpeg",.8),E=v.length*3/4,C=1e3*1024;if(E>C)throw new Error("A imagem é muito grande mesmo após a compressão.");preview.src=v,base64Input.value=v}catch(v){console.error("Erro ao processar imagem:",v),k("Erro de Imagem",v.message||"Não foi possível processar a imagem.","error"),preview.src=R,base64Input.value=O,T.value=""}}};const N=e.cloneNode(!0);e.parentNode.replaceChild(N,e);const B=()=>{const b=N.querySelector("#modalSupplierSearch"),v=N.querySelector("#supplierSearchResults"),I=N.querySelector("#selectedSuppliersList"),E=b.value.toLowerCase();if(E.length>0){const C=n.filter(y=>y.name.toLowerCase().includes(E)&&!r.has(y.id));C.length>0?(v.classList.remove("hidden"),v.innerHTML=C.map(y=>`
                    <div class="p-2 hover:bg-indigo-50 cursor-pointer border-b last:border-0 text-sm flex justify-between items-center" data-add-supplier="${y.id}">
                        <span class="font-medium">${P(y.name)}</span>
                        <span class="text-indigo-600 text-xs">+ Adicionar</span>
                    </div>
                `).join("")):(v.classList.remove("hidden"),v.innerHTML='<div class="p-2 text-xs text-gray-500 text-center">Nenhum resultado disponível.</div>')}else v.classList.add("hidden");r.size>0?(I.innerHTML="",r.forEach(C=>{const y=n.find(ne=>ne.id===C);y&&(I.innerHTML+=`
                        <div class="selected-supplier-item flex items-center justify-between bg-white border p-2 rounded shadow-sm" data-id="${y.id}">
                            <div class="text-sm">
                                <p class="font-bold text-gray-800">${P(y.name)}</p>
                                <p class="text-xs text-gray-500">${P(y.contactName||"")} - ${P(y.phone||"")}</p>
                            </div>
                            <button type="button" class="text-red-500 hover:text-red-700 p-1" data-remove-supplier="${y.id}" title="Remover">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </div>
                    `)})):I.innerHTML='<p class="text-xs text-gray-400 text-center py-2">Nenhum fornecedor selecionado.</p>'};N.querySelector("#modalSupplierSearch").addEventListener("input",B),N.addEventListener("click",b=>{const v=b.target.closest("[data-add-supplier]");if(v){const E=v.dataset.addSupplier;r.add(E),N.querySelector("#modalSupplierSearch").value="",B()}const I=b.target.closest("[data-remove-supplier]");if(I){const E=I.dataset.removeSupplier;r.delete(E),B()}}),B(),N.addEventListener("click",async b=>{const v=b.target.closest("button[data-action]");if(!v)return;const I=v.dataset.action,E=N.querySelector("#productId").value;if(I==="close-modal"&&(N.style.display="none"),I==="delete-product"){if(!E)return;N.style.display="none",await Sw(E)}if(I==="save-product-modal"){const C=N.querySelector("#productForm");if(C){if(!C.querySelector("#productName").value||!C.querySelector("#productPrice").value){k("Erro","Nome e Preço de Venda são obrigatórios.","error");return}const y=v.closest('button[data-action="save-product-modal"]');y.disabled=!0,y.textContent="A salvar...";try{await Tw(C)}catch(ne){k("Erro",`Falha ao salvar: ${ne.message}`,"error"),y.disabled=!1,y.textContent="Salvar Alterações"}}}if(I==="adjust-stock-modal"){b.preventDefault();const C=N.querySelector("#stockAdjustmentAmount"),y=N.querySelector("#stockAdjustmentReason"),ne=parseInt(C.value,10),Me=parseInt(v.dataset.change,10);if(!ne||ne<=0){k("Erro","Por favor, insira uma quantidade válida.","error");return}const Ks=ne*Me,Nr=y.value||(Ks>0?"Entrada manual":"Saída manual");try{await Kh(E,{change:Ks,reason:Nr});const Xe=w.products.findIndex(Ye=>Ye.id===E);if(Xe>-1){const Ye=w.products[Xe].currentStock+Ks;w.products[Xe].currentStock=Ye,N.querySelector("#currentStockDisplay").textContent=Ye,N.querySelector("#productCurrentStock").value=Ye,C.value="",y.value="",k("Sucesso","Estoque atualizado!","success"),al(),On()}}catch(Xe){k("Erro de Stock",Xe.message,"error")}}});const H=N.querySelectorAll(".tab-btn"),G=N.querySelectorAll(".tab-content");H.forEach(b=>{b.addEventListener("click",v=>{v.preventDefault(),H.forEach(I=>{I.classList.remove("border-indigo-500","text-indigo-600"),I.classList.add("border-transparent","text-gray-500","hover:text-gray-700","hover:border-gray-300")}),b.classList.add("border-indigo-500","text-indigo-600"),b.classList.remove("border-transparent","text-gray-500","hover:text-gray-700","hover:border-gray-300"),G.forEach(I=>I.classList.add("hidden")),document.getElementById(`tab-content-${b.dataset.tab}`).classList.remove("hidden")})});const T=N.querySelector("#productPhotoInput");N.querySelector("#productPhotoButton").addEventListener("click",()=>T.click()),T.onchange=async()=>{const b=T.files[0];if(!b)return;const v=N.querySelector("#productPhotoPreview"),I=N.querySelector("#productPhotoBase64");v.src="https://placehold.co/128x128/E2E8F0/4A5568?text=...";try{const E=await Bd(b,800,800,"image/jpeg",.8),y=E.length*3/4,ne=1e3*1024;if(y>ne)throw new Error("A imagem é muito grande mesmo após a compressão.");v.src=E,I.value=E}catch(E){console.error("Erro ao processar imagem:",E),k("Erro de Imagem",E.message||"Não foi possível processar a imagem.","error"),v.src=R,I.value=O,T.value=""}},N.style.display="flex"}function kw(){const t=document.getElementById("products-content-container");t.innerHTML=`
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
    `;const e=document.getElementById("productCategoryFilter");e&&(e.innerHTML='<option value="all">Todas as categorias</option>',(w.categories||[]).forEach(s=>e.innerHTML+=`<option value="${s.id}">${P(s.name)}</option>`)),al(),On()}function Cw(){const t=document.getElementById("products-content-container"),e=new Date().toISOString().split("T")[0],s=new Date;s.setDate(s.getDate()-30);const n=s.toISOString().split("T")[0];t.innerHTML=`
        <div class="space-y-6">
             <div class="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 items-end bg-white p-4 rounded-lg shadow-sm">
                <div class="col-span-1"><label for="reportStartDate" class="block text-xs font-medium text-gray-700">De</label><input type="date" id="reportStartDate" value="${n}" class="mt-1 w-full p-2 border rounded-md text-sm"></div>
                <div class="col-span-1"><label for="reportEndDate" class="block text-xs font-medium text-gray-700">Até</label><input type="date" id="reportEndDate" value="${e}" class="mt-1 w-full p-2 border rounded-md text-sm"></div>
                <div class="col-span-2 md:col-span-1"><label for="productFilterReport" class="block text-xs font-medium text-gray-700">Produto</label><select id="productFilterReport" class="mt-1 w-full p-2 border rounded-md bg-white text-sm"><option value="all">Todos</option></select></div>
                <div class="col-span-2 md:col-span-1"><label for="categoryFilterReport" class="block text-xs font-medium text-gray-700">Categoria</label><select id="categoryFilterReport" class="mt-1 w-full p-2 border rounded-md bg-white text-sm"><option value="all">Todas</option></select></div>
                <button data-action="generate-report" class="col-span-2 md:col-span-1 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 w-full text-sm">Gerar Relatório</button>
             </div>
             
             <div id="report-results">
                 <div class="bg-white border rounded-lg shadow-sm p-8">
                    <p class="text-center text-gray-500">Selecione os filtros e clique em "Gerar Relatório".</p>
                 </div>
             </div>
        </div>`;const o=document.getElementById("productFilterReport"),r=document.getElementById("categoryFilterReport");o&&w.products&&(o.innerHTML+=w.products.map(a=>`<option value="${a.id}">${P(a.name)}</option>`).join("")),r&&w.categories&&(r.innerHTML+=w.categories.map(a=>`<option value="${a.id}">${P(a.name)}</option>`).join(""))}async function _w(){const t=document.getElementById("report-results");t.innerHTML='<div class="loader mx-auto my-8"></div>';const e={startDate:document.getElementById("reportStartDate").value,endDate:document.getElementById("reportEndDate").value,productId:document.getElementById("productFilterReport").value,categoryId:document.getElementById("categoryFilterReport").value,establishmentId:w.establishmentId};try{const s=await Jh(e);if(s.length===0){t.innerHTML=`
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
                        ${s.map(r=>`
                            <tr class="hover:bg-gray-50">
                                <td class="px-4 py-3 whitespace-nowrap text-gray-600">${new Date(r.date).toLocaleString("pt-BR")}</td>
                                <td class="px-4 py-3 whitespace-nowrap font-semibold text-gray-800">${P(r.productName)}</td>
                                <td class="px-4 py-3 whitespace-nowrap text-center font-bold ${r.change>0?"text-green-600":"text-red-600"}">
                                    ${r.change>0?"+":""}${r.change}
                                </td>
                                <td class="px-4 py-3 whitespace-nowrap text-center text-gray-500">${r.oldStock}</td>
                                <td class="px-4 py-3 whitespace-nowrap text-center text-gray-800 font-medium">${r.newStock}</td>
                                <td class="px-4 py-3 whitespace-nowrap text-gray-600 truncate max-w-xs" title="${P(r.reason)}">${P(r.reason)}</td>
                                <td class="px-4 py-3 whitespace-nowrap text-gray-600">${P(r.user)}</td>
                            </tr>`).join("")}
                    </tbody>
                </table>
            </div>`,o=`
            <div class="md:hidden space-y-3 pb-20">
                ${s.map(r=>`
                    <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                        <div class="flex justify-between items-start mb-2">
                            <div>
                                <span class="text-xs text-gray-400 font-medium">${new Date(r.date).toLocaleString("pt-BR")}</span>
                                <h4 class="font-bold text-gray-800 text-base line-clamp-1">${P(r.productName)}</h4>
                            </div>
                            <span class="text-lg font-bold ${r.change>0?"text-green-600":"text-red-600"}">
                                ${r.change>0?"+":""}${r.change}
                            </span>
                        </div>
                        
                        <div class="flex items-center justify-between bg-gray-50 p-2 rounded mb-3 text-sm border border-gray-100">
                            <span class="text-gray-500">Estoque:</span>
                            <div class="flex items-center gap-2 font-mono">
                                <span class="text-gray-400">${r.oldStock}</span>
                                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                                <span class="text-gray-800 font-bold">${r.newStock}</span>
                            </div>
                        </div>

                        <div class="flex justify-between items-center text-xs border-t pt-2 border-dashed border-gray-200">
                            <span class="text-gray-600 truncate max-w-[60%] font-medium" title="${P(r.reason)}">
                                ${P(r.reason)||"Sem motivo"}
                            </span>
                            <span class="text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                                ${P(r.user)||"Sistema"}
                            </span>
                        </div>
                    </div>
                `).join("")}
            </div>`;t.innerHTML=n+o}catch(s){k("Erro",`Não foi possível gerar o relatório: ${s.message}`,"error"),t.innerHTML=`<div class="bg-white border border-red-200 rounded-lg p-8 text-center text-red-500">${s.message}</div>`}}function al(){const t={ok:0,near_min:0,at_min:0,empty:0};if(!w.products)return;w.products.forEach(r=>{if(!r)return;const a=r.currentStock,l=r.minStock;a<=0?t.empty++:l>0&&a<=l?t.at_min++:l>0&&a<=l*1.2?t.near_min++:t.ok++});const e=document.getElementById("indicator-ok"),s=document.getElementById("indicator-near-min"),n=document.getElementById("indicator-at-min"),o=document.getElementById("indicator-empty");e&&(e.textContent=t.ok),s&&(s.textContent=t.near_min),n&&(n.textContent=t.at_min),o&&(o.textContent=t.empty)}function On(){const t=document.getElementById("productsList");if(!t)return;const e=document.getElementById("productSearchInput")?.value.toLowerCase()||"",s=document.getElementById("productCategoryFilter")?.value||"all",n=new Map((w.categories||[]).map(r=>[r.id,r.name]));let o=(w.products||[]).filter(Boolean);lt!=="all"&&(o=o.filter(r=>{const a=r.currentStock,l=r.minStock;switch(lt){case"ok":return a>0&&(l===0||a>l*1.2);case"near_min":return l>0&&a>l&&a<=l*1.2;case"at_min":return l>0&&a>0&&a<=l;case"empty":return a<=0;default:return!0}})),o=o.filter(r=>{const a=r.name.toLowerCase().includes(e),l=s==="all"||r.categoryId===s;return a&&l}),t.innerHTML="",o.length>0?(t.className="space-y-3 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 sm:gap-4 sm:space-y-0",o.forEach(r=>{const a=document.createElement("div"),l=JSON.stringify(r).replace(/'/g,"&apos;");a.className=`product-card bg-white rounded-lg shadow-md flex items-center gap-3 p-3 overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-lg hover:bg-gray-50 
                              sm:flex-col sm:p-0 sm:items-stretch sm:gap-0`,a.dataset.action="edit-product",a.dataset.product=l;const c=r.photo||`https://placehold.co/200x200/E2E8F0/4A5568?text=${encodeURIComponent(r.name.charAt(0))}`,d=n.get(r.categoryId)||"N/A";let p="",h="text-gray-500";const f=r.currentStock,x=r.minStock;f<=0?(p='<span class="text-xs font-semibold text-red-600">Esgotado</span>',h="text-red-600 font-semibold"):x>0&&f<=x?(p='<span class="text-xs font-semibold text-orange-600">Estoque Mínimo</span>',h="text-orange-600 font-semibold"):x>0&&f<=x*1.2?(p='<span class="text-xs font-semibold text-blue-600">Estoque Baixo</span>',h="text-blue-600 font-semibold"):(p='<span class="text-xs font-semibold text-green-600">Em Estoque</span>',h="text-green-600 font-semibold"),a.innerHTML=`
                <img src="${c}" alt="Imagem de ${P(r.name)}" class="w-16 h-16 rounded-md object-cover flex-shrink-0 sm:w-full sm:h-24 sm:rounded-b-none">
                
                <div class="flex-1 sm:p-3 sm:flex sm:flex-col sm:flex-grow">
                    <div class="sm:flex-grow">
                        <div class="flex justify-between items-start mb-1 gap-2">
                            <h3 class="text-sm font-bold text-gray-900 flex-1 text-left">${P(r.name)}</h3>
                            <div class="hidden sm:block">${p}</div>
                        </div>
                        
                        <p class="text-xl font-bold text-indigo-600 mb-1 text-left hidden sm:block">R$ ${r.price.toFixed(2)}</p>
                        
                        <p class="text-xs text-gray-500 text-left mb-2 hidden sm:block">Categoria: ${P(d)}</p>
                    </div>

                    <div class="flex justify-between items-center mt-2 sm:mt-0">
                        <p class="text-lg font-bold text-indigo-600 text-left sm:hidden">R$ ${r.price.toFixed(2)}</p>
                        <p class="text-xs text-gray-500 text-right sm:text-left">
                            Estoque: <span class="font-bold text-base ${h}">${r.currentStock}</span>
                        </p>
                    </div>
                </div>`,t.appendChild(a)})):(t.className="",t.innerHTML='<p class="col-span-full text-center text-gray-500 py-10">Nenhum produto encontrado.</p>')}async function Yn(){const t=document.getElementById("products-content-container");t&&(t.innerHTML='<div class="loader col-span-full mx-auto my-8"></div>');try{const[e,s,n]=await Promise.all([ur(w.establishmentId),$r(w.establishmentId,"products"),ol(w.establishmentId)]);w.products=(e||[]).filter(Boolean),w.categories=(s||[]).filter(Boolean),w.suppliers=(n||[]).filter(Boolean),wp(kn)}catch(e){t&&(t.innerHTML=`<p class="text-red-500 col-span-full text-center p-8">Erro ao carregar dados: ${e.message}</p>`)}}function wp(t){if(document.getElementById("products-content-container")){if(kn===t&&document.getElementById("products-content-container").children.length>1){kn==="products"&&(al(),On());return}kn=t,lt="all",document.querySelectorAll("#products-tabs button.tab-button").forEach(e=>{const s=e.dataset.view===t;e.classList.toggle("border-indigo-500",s),e.classList.toggle("text-indigo-600",s),e.classList.toggle("border-transparent",!s),e.classList.toggle("text-gray-500",!s)}),t==="products"?kw():t==="movements"&&Cw()}}async function Aw(){Ht.innerHTML=`
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
        </section>`,St&&(Ht.removeEventListener("click",St),Ht.removeEventListener("input",St),Ht.removeEventListener("change",St)),St=async t=>{const e=t.target;if(e.id==="productSearchInput"||e.id==="productCategoryFilter"){On();return}const s=t.target.closest("button[data-action], button[data-view], .indicator-card[data-action], .product-card[data-action]");if(!s||t.target.closest('[data-action-stop-propagation="true"]'))return;if(s.hasAttribute("data-view")){wp(s.dataset.view);return}switch(s.dataset.action){case"new-product":Vd();break;case"edit-product":Vd(JSON.parse(s.dataset.product));break;case"manage-product-categories":Iw();break;case"generate-report":await _w();break;case"filter-stock":const o=s.dataset.filterType;lt=lt===o?"all":o,document.querySelectorAll(".indicator-card").forEach(r=>{r.classList.toggle("ring-2",r.dataset.filterType===lt),r.classList.toggle("ring-indigo-500",r.dataset.filterType===lt),r.classList.toggle("shadow-lg",r.dataset.filterType===lt)}),On();break}},Ht.addEventListener("click",St),Ht.addEventListener("input",St),Ht.addEventListener("change",St),kn="products",lt="all",await Yn()}const Ut=document.getElementById("content");let Tt=null,Vo="list",le={step:1,productsToBuy:[],allSuppliers:[],finalOrders:{},isQuoteMode:!1};async function Pw(){Vo==="list"?Lr():Vo==="purchases"?(le.step=1,Cn()):Vo==="history"&&Ep()}async function $w(){try{const t=await ol(w.establishmentId);return w.suppliers=t||[],le.allSuppliers=t,!0}catch(t){return console.error(t),!1}}async function Dw(t){if(await re("Excluir Fornecedor","Tem a certeza? Isso removerá o vínculo com os produtos."))try{await bw(t),k("Sucesso","Fornecedor excluído.","success"),dr("genericModal"),Lr()}catch(e){k("Erro","Erro ao excluir: "+e.message,"error")}}async function Lw(t){t.preventDefault();const e=t.target,s=e.querySelector("#supId").value,n={name:e.querySelector("#supName").value,contactName:e.querySelector("#supContact").value,email:e.querySelector("#supEmail").value,phone:e.querySelector("#supPhone").value,taxId:e.querySelector("#supTaxId").value,category:e.querySelector("#supCategory").value,establishmentId:w.establishmentId},o=e.querySelector('button[type="submit"]');o.disabled=!0,o.textContent="A salvar...";try{s?(await fw(s,n),k("Sucesso","Fornecedor atualizado!","success")):(await gw(n),k("Sucesso","Fornecedor criado!","success")),dr("genericModal"),Lr()}catch(r){k("Erro","Erro ao salvar: "+r.message,"error")}finally{o.disabled=!1,o.textContent="Salvar"}}async function Lr(){const t=document.getElementById("suppliersList");if(!t)return;t.innerHTML='<div class="loader mx-auto my-8"></div>',await $w();const e=document.getElementById("supplierSearchInput")?.value.toLowerCase()||"",s=w.suppliers.filter(r=>r.name.toLowerCase().includes(e)||r.contactName&&r.contactName.toLowerCase().includes(e));if(t.innerHTML="",s.length===0){t.innerHTML='<div class="text-center text-gray-500 py-8">Nenhum fornecedor encontrado.</div>';return}let n='<div class="flex flex-col gap-2 md:hidden">';s.forEach(r=>{const a=JSON.stringify(r).replace(/"/g,"&quot;"),l=P(r.name),c=P(r.category||"Geral"),d=P(r.contactName||"");n+=`
            <div class="bg-white p-3 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between active:bg-gray-50 transition-colors cursor-pointer supplier-item-mobile" data-supplier="${a}">
                <div class="flex-1 min-w-0 pr-3">
                    <h3 class="font-bold text-gray-900 text-sm truncate">${l}</h3>
                    <div class="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                        <span class="truncate bg-gray-100 px-1.5 py-0.5 rounded">${c}</span>
                        ${d?`<span class="truncate">• ${d}</span>`:""}
                    </div>
                </div>
                <div class="text-gray-400">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                </div>
            </div>
        `}),n+="</div>";let o=`
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
    `;s.forEach(r=>{const a=JSON.stringify(r).replace(/"/g,"&quot;"),l=P(r.name),c=P(r.taxId||"Sem doc."),d=P(r.email||"-"),p=P(r.phone||"-"),h=P(r.category||"Geral");o+=`
            <tr class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-gray-900">${l}</div>
                    <div class="text-sm text-gray-500">${c}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">${d}</div>
                    <div class="text-sm text-gray-500">${p}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        ${h}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button data-action="edit" data-supplier="${a}" class="text-indigo-600 hover:text-indigo-900 mr-3">Editar</button>
                    <button data-action="delete" data-id="${r.id}" class="text-red-600 hover:text-red-900">Excluir</button>
                </td>
            </tr>
        `}),o+="</tbody></table></div>",t.innerHTML=n+o}function Rw(t){const e=t.phone?`https://wa.me/${t.phone.replace(/\D/g,"")}`:"#",s=t.phone?`tel:${t.phone}`:"#",n=t.email?`mailto:${t.email}`:"#",o=JSON.stringify(t).replace(/"/g,"&quot;"),r=P(t.name),a=P(t.category||"Fornecedor"),l=P(t.contactName||""),c=P(t.phone||""),d=`
        <div class="text-center mb-6">
            <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 text-gray-500 text-2xl font-bold uppercase">
                ${r.substring(0,2)}
            </div>
            <h3 class="text-xl font-bold text-gray-900 leading-tight mb-1">${r}</h3>
            <span class="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                ${a}
            </span>
        </div>

        <div class="space-y-4 mb-8">
            ${l?`
            <div class="flex justify-between items-center border-b border-gray-100 pb-2">
                <span class="text-gray-500 text-sm">Contato</span>
                <span class="font-medium text-gray-800">${l}</span>
            </div>`:""}
            ${c?`
            <div class="flex justify-between items-center border-b border-gray-100 pb-2">
                <span class="text-gray-500 text-sm">Telefone</span>
                <span class="font-medium text-gray-800">${c}</span>
            </div>`:""}
        </div>

        <div class="grid grid-cols-3 gap-3 mb-6">
            <a href="${e}" target="_blank" class="${t.phone?"":"opacity-50 pointer-events-none"} flex flex-col items-center justify-center p-3 bg-green-50 rounded-lg text-green-700 hover:bg-green-100 transition-colors">
                <svg class="w-6 h-6 mb-1" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.897.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.463 1.065 2.876 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                <span class="text-xs font-bold">WhatsApp</span>
            </a>
            <a href="${s}" class="${t.phone?"":"opacity-50 pointer-events-none"} flex flex-col items-center justify-center p-3 bg-blue-50 rounded-lg text-blue-700 hover:bg-blue-100 transition-colors">
                <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                <span class="text-xs font-bold">Ligar</span>
            </a>
            <a href="${n}" class="${t.email?"":"opacity-50 pointer-events-none"} flex flex-col items-center justify-center p-3 bg-gray-50 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
                <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                <span class="text-xs font-bold">Email</span>
            </a>
        </div>

        <div class="flex flex-col gap-3">
            <button data-action="edit" data-supplier="${o}" class="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold text-sm shadow hover:bg-indigo-700 active:scale-[0.98] transition-transform">
                Editar Informações
            </button>
            <button data-action="delete" data-id="${t.id}" class="w-full bg-white text-red-600 border border-red-200 py-3 rounded-lg font-bold text-sm hover:bg-red-50 active:scale-[0.98] transition-transform">
                Excluir Fornecedor
            </button>
        </div>
    `;Pe({title:"",contentHTML:d,maxWidth:"max-w-md"})}async function Cn(){const t=document.getElementById("purchasesContainer");if(t)if(le.step===1){t.innerHTML='<div class="loader mx-auto my-8"></div>';try{const[e,s]=await Promise.all([ur(w.establishmentId),ol(w.establishmentId)]);le.allSuppliers=s||[];const n=e.filter(d=>{const p=parseInt(d.currentStock||0),h=parseInt(d.minStock||0);return p<=h});if(le.productsToBuy=n,n.length===0){t.innerHTML=`
                    <div class="text-center py-10 bg-white rounded-lg shadow-sm border border-gray-100">
                        <div class="bg-green-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                            <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                        <h3 class="text-lg font-bold text-gray-800">Tudo em ordem!</h3>
                        <p class="text-gray-600">Nenhum produto abaixo do estoque mínimo.</p>
                        <button class="mt-4 text-indigo-600 hover:underline text-sm" onclick="window.location.reload()">Atualizar Dados</button>
                    </div>
                `;return}let o='<div class="flex flex-col gap-3 md:hidden">',r="";n.forEach(d=>{const p=parseInt(d.minStock)||0,h=parseInt(d.currentStock)||0,f=Math.max(p-h,1),x=parseFloat(d.costPrice||0),S=P(d.name);let _='<option value="">Selecione...</option>';le.allSuppliers.length>0?le.allSuppliers.forEach(D=>{const O=d.supplierIds&&d.supplierIds.includes(D.id)?"selected":"";_+=`<option value="${D.id}" ${O}>${P(D.name)}</option>`}):_='<option value="">Sem fornecedores</option>',o+=`
                    <div class="product-row bg-white p-3 rounded-lg shadow-sm border border-gray-200" data-product-id="${d.id}" data-cost="${x}">
                        <div class="flex justify-between items-start mb-2">
                            <div class="flex items-center gap-2">
                                <input type="checkbox" class="row-select w-5 h-5 text-indigo-600 rounded border-gray-300" checked>
                                <div>
                                    <p class="font-bold text-gray-800 text-sm">${S}</p>
                                    <p class="text-xs text-gray-500">Custo: R$ ${x.toFixed(2)}</p>
                                </div>
                            </div>
                            <div class="text-right">
                                <span class="text-[10px] text-gray-500 uppercase font-bold tracking-wide block mb-0.5">Estoque</span>
                                <div class="flex items-center justify-end gap-1 text-xs">
                                    <span class="font-bold text-red-600">${h}</span>
                                    <span class="text-gray-400">/</span>
                                    <span class="font-medium text-gray-600">${p} (Mín)</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="grid grid-cols-2 gap-3 items-center mt-2">
                            <div>
                                <label class="text-xs text-gray-500 block mb-1">Qtd. a Comprar</label>
                                <input type="number" class="qty-input w-full p-2 border border-gray-300 rounded text-center font-bold text-indigo-700 bg-indigo-50" value="${f}" min="1">
                            </div>
                            <div>
                                <label class="text-xs text-gray-500 block mb-1">Fornecedor</label>
                                <select class="supplier-select w-full p-2 border border-gray-300 rounded bg-white text-xs truncate">
                                    ${_}
                                </select>
                            </div>
                        </div>
                        <div class="mt-2 pt-2 border-t border-gray-100 flex justify-between items-center">
                            <span class="text-xs text-gray-500">Subtotal Previsto:</span>
                            <span class="row-subtotal font-bold text-indigo-600 text-sm">R$ ${(f*x).toFixed(2)}</span>
                        </div>
                    </div>
                `,r+=`
                    <tr class="hover:bg-gray-50 border-b border-gray-100 product-row" data-product-id="${d.id}" data-cost="${x}">
                        <td class="p-3 pl-4 text-center w-10">
                            <input type="checkbox" class="row-select w-5 h-5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500" checked>
                        </td>
                        <td class="p-3 font-medium text-gray-800">${S}</td>
                        <td class="p-3 text-center text-xs text-gray-600">
                            <div class="flex flex-col items-center">
                                <span class="font-bold text-red-600">${h} <span class="text-gray-400 font-normal">Atual</span></span>
                                <span class="border-t border-gray-200 w-12 my-0.5"></span>
                                <span class="font-medium">${p} <span class="text-gray-400 font-normal">Mínimo</span></span>
                            </div>
                        </td>
                        <td class="p-3 text-center w-24">
                            <input type="number" class="qty-input w-full p-2 border border-gray-300 rounded text-center text-lg font-bold text-indigo-700 bg-indigo-50" value="${f}" min="1">
                        </td>
                        <td class="p-3 text-right text-sm text-gray-600">R$ ${x.toFixed(2)}</td>
                        <td class="p-3 text-right text-sm font-bold text-gray-800 row-subtotal">R$ ${(f*x).toFixed(2)}</td>
                        <td class="p-3 w-48">
                            <select class="supplier-select w-full p-2 border border-gray-300 rounded-md bg-white text-sm">
                                ${_}
                            </select>
                        </td>
                    </tr>
                `}),o+="</div>";const a=le.isQuoteMode?"REVISAR COTAÇÕES":"GERAR PEDIDOS DE COMPRA",l=le.isQuoteMode?"bg-indigo-600 hover:bg-indigo-700":"bg-green-600 hover:bg-green-700",c=le.isQuoteMode?'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>':'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>';t.innerHTML=`
                <div class="space-y-4 animate-fade-in pb-20">
                    <div class="bg-white p-3 md:p-4 rounded-lg border border-gray-200 shadow-sm">
                        <div class="flex flex-col md:flex-row justify-between items-center gap-3">
                            <div class="flex items-center gap-3 w-full md:w-auto">
                                <input type="checkbox" id="toggle-quote-mode" class="w-5 h-5 text-indigo-600 rounded" ${le.isQuoteMode?"checked":""}>
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
                        <button id="btn-go-to-orders" class="w-full ${l} text-white px-4 py-3 rounded-xl font-bold text-base shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2">
                            ${a}
                            ${c}
                        </button>
                    </div>

                    ${o}
                    
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
                            <tbody class="divide-y divide-gray-100" id="purchase-table-body">${r}</tbody>
                        </table>
                    </div>
                </div>
            `,ri()}catch(e){console.error(e),t.innerHTML='<p class="text-red-500 text-center">Erro ao calcular compras.</p>'}}else le.step===2&&Mw(t)}function Mw(t){if(!le.finalOrders||Object.keys(le.finalOrders).length===0){le.step=1,Cn();return}const e=le.isQuoteMode;let s="",n=0;const o=e?"border-indigo-100":"border-gray-200",r=e?"bg-indigo-50 border-indigo-100":"bg-gray-50 border-gray-200",a=e?"bg-blue-100 text-blue-700":"bg-green-100 text-green-700",l=e?"hidden":"flex",c=e?"Cotações Prontas":"Pedidos Prontos",d=e?"text-indigo-600":"text-green-600",p=e?"bg-indigo-50 border-indigo-100":"bg-green-50 border-green-100",h=e?"text-indigo-800":"text-green-800";for(const[f,x]of Object.entries(le.finalOrders)){let S=0,_=x.items.map(H=>{const G=H.qty*H.cost;return S+=G,`
            <div class="flex justify-between py-2 border-b border-gray-50 text-sm">
                <span class="text-gray-800 font-medium">${P(H.name)}</span>
                <div class="text-right">
                    <span class="text-gray-500 text-xs block">${H.qty} x R$ ${H.cost.toFixed(2)}</span>
                    <span class="text-indigo-600 font-bold block">R$ ${G.toFixed(2)}</span>
                </div>
            </div>
        `}).join("");n+=S;const D=encodeURIComponent(JSON.stringify({supplierId:f,supplierName:x.info.name,totalAmount:S,items:x.items})),R=encodeURIComponent(JSON.stringify({name:x.info.name,phone:x.info.phone,email:x.info.email})),O=encodeURIComponent(JSON.stringify(x.items)),N=P(x.info.name),B=P(x.info.email||"");s+=`
            <div class="bg-white border ${o} rounded-xl overflow-hidden shadow-sm supplier-order-card mb-4" data-supplier-id="${f}">
                <div class="${r} p-3 border-b flex justify-between items-center">
                    <div>
                        <h4 class="font-bold text-gray-800 text-base">${N}</h4>
                        <div class="text-[10px] text-gray-500 flex flex-col">
                            <span>${B}</span>
                        </div>
                    </div>
                    <div class="text-right">
                        <span class="${a} text-xs font-bold px-2 py-1 rounded">R$ ${S.toFixed(2)}</span>
                    </div>
                </div>
                <div class="p-3">
                    ${_}
                </div>
                <div class="p-3 bg-gray-50 border-t border-gray-200 grid grid-cols-3 gap-2">
                    <button class="btn-print-order bg-white border border-gray-300 text-gray-700 px-2 py-2.5 rounded-lg hover:bg-gray-50 text-xs font-bold flex items-center justify-center gap-1">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
                        PDF
                    </button>
                    <button class="btn-send-order bg-green-500 text-white px-2 py-2.5 rounded-lg hover:bg-green-600 text-xs font-bold flex items-center justify-center gap-1 shadow-sm"
                        data-supplier-info="${R}"
                        data-order-items="${O}"
                        data-total="${S}">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.897.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.463 1.065 2.876 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                        Enviar
                    </button>
                    <button class="btn-register-order bg-blue-600 text-white px-2 py-2.5 rounded-lg hover:bg-blue-700 text-xs font-bold items-center justify-center gap-1 shadow-sm ${l}" data-order="${D}">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                        Salvar
                    </button>
                </div>
            </div>
        `}t.innerHTML=`
        <div class="space-y-4 animate-fade-in pb-24">
            <div class="flex flex-col justify-between items-center gap-3 ${p} p-4 rounded-lg border text-center">
                <div>
                    <h3 class="font-bold ${h} text-lg">${c}</h3>
                    <p class="text-sm ${d}">Valor Estimado: <strong class="text-lg">R$ ${n.toFixed(2)}</strong></p>
                </div>
                <button id="btn-back-step1" class="text-gray-600 hover:text-gray-900 text-sm font-medium underline py-2">
                    ← Voltar e Corrigir
                </button>
            </div>
            <div>
                ${s}
            </div>
        </div>
    `}async function Ep(){const t=document.getElementById("historyContainer");if(t){t.innerHTML='<div class="loader mx-auto my-8"></div>';try{const e=await xw(w.establishmentId);if(e.length===0){t.innerHTML='<div class="text-center text-gray-500 py-8">Nenhum histórico encontrado.</div>';return}let s='<div class="flex flex-col gap-3 md:hidden">';e.forEach(r=>{const a=new Date(r.createdAt.seconds*1e3).toLocaleDateString("pt-BR"),l=P(r.supplierName);s+=`
                <div class="bg-white p-3 rounded-lg shadow-sm border border-gray-100 flex justify-between items-center active:bg-gray-50 transition-colors">
                    <div>
                        <p class="text-xs text-gray-500 mb-0.5">${a}</p>
                        <p class="font-bold text-gray-800 text-sm">${l}</p>
                        <p class="text-xs text-gray-400 mt-0.5">${r.items.length} itens</p>
                    </div>
                    <div class="text-right flex flex-col items-end gap-2">
                        <p class="text-indigo-600 font-bold text-sm mb-1">R$ ${parseFloat(r.totalAmount).toFixed(2)}</p>
                        <div class="flex gap-2">
                            <button class="text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg hover:bg-gray-200 btn-view-purchase" data-purchase='${JSON.stringify(r)}'>
                                Ver
                            </button>
                            <button class="text-xs bg-red-50 text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-100 btn-delete-purchase" data-id="${r.id}">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                            </button>
                        </div>
                    </div>
                </div>
            `}),s+="</div>";let o=`
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
                    <tbody class="divide-y divide-gray-100">${e.map(r=>`
            <tr class="hover:bg-gray-50 border-b border-gray-100">
                <td class="p-3 text-sm text-gray-600 whitespace-nowrap">${new Date(r.createdAt.seconds*1e3).toLocaleDateString("pt-BR")}</td>
                <td class="p-3 font-medium text-gray-800">${P(r.supplierName)}</td>
                <td class="p-3 text-right font-bold text-indigo-600 whitespace-nowrap">R$ ${parseFloat(r.totalAmount).toFixed(2)}</td>
                <td class="p-3 text-right flex justify-end gap-2">
                    <button class="text-xs bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-lg font-bold hover:bg-indigo-100 btn-view-purchase" data-purchase='${JSON.stringify(r)}'>
                        Ver
                    </button>
                    <button class="text-xs bg-red-50 text-red-600 px-3 py-1.5 rounded-lg font-bold hover:bg-red-100 btn-delete-purchase" data-id="${r.id}">
                        Excluir
                    </button>
                </td>
            </tr>
        `).join("")}</tbody>
                </table>
            </div>
        `;t.innerHTML=s+o}catch(e){console.error(e),t.innerHTML='<p class="text-red-500 text-center">Erro ao carregar histórico.</p>'}}}function Nw(t){const e=new Date(t.createdAt.seconds*1e3).toLocaleString("pt-BR"),s=t.items.map(o=>`
        <li class="flex justify-between py-3 border-b border-gray-100 last:border-0">
            <div>
                <p class="font-medium text-sm text-gray-800">${P(o.name)}</p>
                <p class="text-xs text-gray-500">${o.qty} un. x R$ ${parseFloat(o.cost).toFixed(2)}</p>
            </div>
            <p class="text-sm font-bold text-gray-700">R$ ${(o.qty*o.cost).toFixed(2)}</p>
        </li>
    `).join(""),n=`
        <div class="space-y-4">
            <div class="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
                <div>
                    <p class="text-xs text-gray-500 uppercase font-bold">Fornecedor</p>
                    <p class="font-bold text-gray-900 text-lg">${P(t.supplierName)}</p>
                </div>
                <div class="text-right">
                    <p class="text-xs text-gray-500 uppercase font-bold">Data</p>
                    <p class="font-medium text-gray-800">${e.split(" ")[0]}</p>
                </div>
            </div>
            
            <div class="border rounded-lg p-0 overflow-hidden">
                <div class="bg-gray-50 px-4 py-2 border-b border-gray-200">
                    <h4 class="text-xs font-bold text-gray-500 uppercase">Itens Comprados</h4>
                </div>
                <ul class="max-h-60 overflow-y-auto px-4">${s}</ul>
            </div>

            <div class="flex justify-between items-center pt-2 px-2">
                <p class="text-base text-gray-600 font-medium">Total Pago:</p>
                <p class="text-2xl font-bold text-green-600">R$ ${parseFloat(t.totalAmount).toFixed(2)}</p>
            </div>
            
            <div class="flex justify-end pt-4">
                 <button type="button" class="modal-close w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-200 active:scale-95 transition-transform">FECHAR</button>
            </div>
        </div>
    `;Pe({title:"Detalhes da Compra",contentHTML:n,maxWidth:"max-w-md"}),setTimeout(()=>{document.querySelector("#genericModal .modal-close").addEventListener("click",()=>{dr("genericModal")})},50)}function ri(){const t=document.querySelectorAll(".product-row");let e=0;t.forEach(n=>{if(n.offsetParent===null)return;const o=n.querySelector(".row-select"),r=n.querySelector(".qty-input"),a=n.querySelector(".row-subtotal"),l=parseFloat(n.dataset.cost||0),c=parseInt(r.value||0);if(o.checked){const d=l*c;e+=d,a&&(a.textContent=`R$ ${d.toFixed(2)}`),n.classList.remove("opacity-50","bg-gray-50")}else n.classList.add("opacity-50","bg-gray-50")});const s=document.getElementById("total-purchase-cost");s&&(s.textContent=`R$ ${e.toFixed(2).replace(".",",")}`)}async function Bw(t,e=!1){if(!window.jspdf){alert("Erro: Biblioteca PDF não carregada.");return}const{jsPDF:s}=window.jspdf,n=new s,o=new Date().toLocaleDateString("pt-BR"),r=e?[100,116,139]:[22,163,74];n.setFontSize(22),n.setTextColor(...r),n.setFont("helvetica","bold");const a=e?"SOLICITAÇÃO DE COTAÇÃO":"PEDIDO DE COMPRA";n.text(a,14,20),n.setDrawColor(...r),n.setLineWidth(.5),n.line(14,25,196,25),n.setFontSize(10),n.setTextColor(0),n.setFont("helvetica","bold"),n.text("DE:",14,35),n.setFont("helvetica","normal"),n.text(w.establishmentName||"Nossa Empresa",14,40),n.text(`Data: ${o}`,14,45),n.setFont("helvetica","bold"),n.text("PARA:",110,35),n.setFont("helvetica","normal"),n.text(t.info.name||"Fornecedor",110,40),t.info.email&&n.text(`Email: ${t.info.email}`,110,45),t.info.phone&&n.text(`Tel: ${t.info.phone}`,110,50),n.setFontSize(10),n.setFont("helvetica","italic");const l=e?"Por favor, enviem os vossos melhores preços e condições para os itens listados abaixo.":"Confirmação de pedido de compra conforme os itens e quantidades abaixo.";n.text(l,14,65);const c=e?["Produto","Quantidade Solicitada"]:["Produto","Qtd.","V. Unitário","V. Total"],d=t.items.map(x=>e?[x.name,x.qty.toString()]:[x.name,x.qty.toString(),`R$ ${x.cost.toFixed(2)}`,`R$ ${(x.qty*x.cost).toFixed(2)}`]);n.autoTable({startY:75,head:[c],body:d,theme:"striped",headStyles:{fillColor:r,textColor:[255,255,255],fontStyle:"bold",halign:"left"},styles:{fontSize:10,cellPadding:3,valign:"middle"},columnStyles:e?{}:{1:{halign:"center"},2:{halign:"right"},3:{halign:"right",fontStyle:"bold"}},foot:e?null:[["","","TOTAL DO PEDIDO:",{content:`R$ ${d.reduce((x,S)=>x+parseFloat(S[3].replace("R$ ","")),0).toFixed(2)}`,styles:{halign:"right",fontStyle:"bold",fillColor:[240,240,240],textColor:[0,0,0]}}]]});const p=n.internal.getNumberOfPages();for(let x=1;x<=p;x++)n.setPage(x),n.setFontSize(8),n.setTextColor(150),n.text(`Gerado por Kairos - Página ${x} de ${p}`,196,290,{align:"right"});const h=t.info.name.replace(/[^a-zA-Z0-9]/g,"_"),f=`${e?"Cotacao":"Pedido"}_${h}_${o.replace(/\//g,"-")}.pdf`;n.save(f),k("Sucesso","PDF gerado com sucesso!","success")}function Fd(t=null){const e=`
        <form id="supplierForm" class="space-y-4">
            <input type="hidden" id="supId" value="${t?.id||""}">
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="col-span-1 md:col-span-2">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Nome da Empresa *</label>
                    <input type="text" id="supName" value="${P(t?.name||"")}" required class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-shadow" placeholder="Ex: Distribuidora Beleza">
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                    <select id="supCategory" class="w-full p-3 border border-gray-300 rounded-lg outline-none bg-white">
                        <option value="Produtos" ${t?.category==="Produtos"?"selected":""}>Produtos</option>
                        <option value="Equipamentos" ${t?.category==="Equipamentos"?"selected":""}>Equipamentos</option>
                        <option value="Serviços" ${t?.category==="Serviços"?"selected":""}>Serviços</option>
                        <option value="Outros" ${t?.category==="Outros"?"selected":""}>Outros</option>
                    </select>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Nome Contato</label>
                    <input type="text" id="supContact" value="${P(t?.contactName||"")}" class="w-full p-3 border border-gray-300 rounded-lg outline-none" placeholder="Ex: João Silva">
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Telefone / WhatsApp</label>
                    <input type="tel" id="supPhone" value="${P(t?.phone||"")}" class="w-full p-3 border border-gray-300 rounded-lg outline-none" placeholder="(00) 00000-0000">
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" id="supEmail" value="${P(t?.email||"")}" class="w-full p-3 border border-gray-300 rounded-lg outline-none" placeholder="contato@empresa.com">
                </div>

                <div class="col-span-1 md:col-span-2">
                    <label class="block text-sm font-medium text-gray-700 mb-1">CNPJ / CPF</label>
                    <input type="text" id="supTaxId" value="${P(t?.taxId||"")}" class="w-full p-3 border border-gray-300 rounded-lg outline-none">
                </div>
            </div>

            <div class="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
                <button type="button" class="modal-close w-full md:w-auto px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-bold hover:bg-gray-200 transition-colors">Cancelar</button>
                <button type="submit" class="w-full md:w-auto px-6 py-3 bg-indigo-600 text-white rounded-lg font-bold shadow-md hover:bg-indigo-700 transition-colors">
                    ${t?"Atualizar Dados":"Salvar Fornecedor"}
                </button>
            </div>
        </form>
    `;Pe({title:t?"Editar Fornecedor":"Novo Fornecedor",contentHTML:e,maxWidth:"max-w-lg"}),setTimeout(()=>{document.getElementById("supplierForm").addEventListener("submit",Lw),document.querySelector("#genericModal .modal-close").addEventListener("click",()=>dr("genericModal"))},50)}function Vw(){Ut.innerHTML=`
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
    `,Tt&&(Ut.removeEventListener("click",Tt),Ut.removeEventListener("input",Tt),Ut.removeEventListener("change",Tt)),Tt=t=>{if(t.target.closest("#tab-btn-list")&&wo("list"),t.target.closest("#tab-btn-purchases")&&wo("purchases"),t.target.closest("#tab-btn-history")&&wo("history"),t.target.id==="toggle-quote-mode"&&(le.isQuoteMode=t.target.checked,Cn()),t.target.id==="supplierSearchInput"&&Lr(),t.target.closest("#btn-new-supplier")&&Fd(),t.target.closest(".supplier-item-mobile")){const s=t.target.closest(".supplier-item-mobile"),n=JSON.parse(s.dataset.supplier);Rw(n)}const e=t.target.closest("button[data-action]");if(e){const s=e.dataset.action;s==="delete"&&Dw(e.dataset.id),s==="edit"&&Fd(JSON.parse(e.dataset.supplier))}if((t.target.classList.contains("qty-input")||t.target.classList.contains("row-select"))&&ri(),t.target.id==="check-all-rows"){const s=t.target.checked;document.querySelectorAll(".row-select").forEach(n=>n.checked=s),ri()}if(t.target.closest("#btn-go-to-orders")){const s=document.querySelectorAll(".product-row"),n={};let o=!1;if(s.forEach(r=>{if(r.offsetParent===null||!r.querySelector(".row-select").checked)return;o=!0;let l="Produto";const c=r.querySelector("td:nth-child(2)"),d=r.querySelector(".font-bold");c?l=c.innerText:d&&(l=d.innerText);const p=parseInt(r.querySelector(".qty-input").value),h=parseFloat(r.dataset.cost),x=r.querySelector(".supplier-select").value;if(x){if(!n[x]){const S=le.allSuppliers.find(_=>_.id===x);n[x]={info:S,items:[]}}n[x].items.push({name:l,qty:p,cost:h})}}),!o){k("Atenção","Selecione pelo menos um item para gerar o pedido.","error");return}le.finalOrders=n,le.step=2,Cn()}if(t.target.closest("#btn-back-step1")&&(le.step=1,Cn()),t.target.closest(".btn-send-order")){const s=t.target.closest(".btn-send-order"),n=JSON.parse(decodeURIComponent(s.dataset.supplierInfo)),o=JSON.parse(decodeURIComponent(s.dataset.orderItems)),r=parseFloat(s.dataset.total),a=le.isQuoteMode;if(n.phone){const l=n.phone.replace(/\D/g,"");let c="";a?(c=`Olá *${n.name}*, tudo bem?

Gostaria de solicitar uma *cotação* para os seguintes itens:

`,o.forEach(p=>{c+=`- ${p.qty}x ${p.name}
`}),c+=`
Aguardo o retorno. Obrigado!`):(c=`Olá *${n.name}*, gostaria de realizar o seguinte *pedido*:

`,c+=`*ITENS:*
`,o.forEach(p=>{c+=`- ${p.qty}x ${p.name}
`}),c+=`
Aguardo confirmação.`);const d=`https://wa.me/${l}?text=${encodeURIComponent(c)}`;window.open(d,"_blank"),k("Aberto","WhatsApp aberto.","success")}else if(n.email){const l=a?`Solicitação de Cotação - ${w.establishmentName||"Empresa"}`:`Pedido de Compra - ${w.establishmentName||"Empresa"}`;let c=`Olá ${n.name},

`;a?c+=`Gostaria de solicitar uma cotação para os itens abaixo:

`:c+=`Gostaria de realizar o seguinte pedido:

`,o.forEach(p=>{c+=`- ${p.qty}x ${p.name}
`}),a||(c+=`
Valor Total Estimado: R$ ${r.toFixed(2)}`),c+=`

Aguardo retorno.`;const d=`mailto:${n.email}?subject=${encodeURIComponent(l)}&body=${encodeURIComponent(c)}`;window.location.href=d}else k("Erro","Fornecedor sem telefone ou email cadastrado.","error")}if(t.target.closest(".btn-register-order")){const s=t.target.closest(".btn-register-order");if(s.disabled)return;const n=JSON.parse(decodeURIComponent(s.dataset.order));n.establishmentId=w.establishmentId,s.disabled=!0,s.textContent="A processar...",ms(w.establishmentId).then(o=>{const r=o.purchaseConfig||null;return vw(n,r)}).then(()=>{k("Sucesso","Compra registrada e integrada ao financeiro!","success"),s.innerHTML='<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Registrado',s.classList.replace("bg-blue-600","bg-green-600"),s.classList.replace("hover:bg-blue-700","hover:bg-green-700")}).catch(o=>{s.disabled=!1,s.innerHTML='<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Salvar',k("Erro","Falha ao registrar compra: "+o.message,"error")})}if(t.target.closest(".btn-delete-purchase")){const n=t.target.closest(".btn-delete-purchase").dataset.id;re("Excluir Compra","Isto apagará o registo histórico E o lançamento financeiro associado. Deseja continuar?").then(async o=>{if(o)try{await yw(n,w.establishmentId),k("Sucesso","Compra e financeiro excluídos.","success"),Ep()}catch(r){k("Erro","Erro ao excluir: "+r.message,"error")}})}if(t.target.closest(".btn-print-order")){const n=t.target.closest(".supplier-order-card").dataset.supplierId,o=le.finalOrders[n];o?Bw(o,le.isQuoteMode):k("Erro","Dados do pedido não encontrados.","error")}if(t.target.closest(".btn-view-purchase")){const s=t.target.closest(".btn-view-purchase"),n=JSON.parse(s.dataset.purchase);Nw(n)}},Ut.addEventListener("click",Tt),Ut.addEventListener("input",Tt),Ut.addEventListener("change",Tt),wo("list")}function wo(t){Vo=t,["list","purchases","history"].forEach(s=>{const n=document.getElementById(`tab-btn-${s}`),o=document.getElementById(`tab-content-${s}`);s===t?(n.classList.add("border-indigo-500","text-indigo-600"),n.classList.remove("border-transparent","text-gray-500"),o.classList.remove("hidden")):(n.classList.remove("border-indigo-500","text-indigo-600"),n.classList.add("border-transparent","text-gray-500"),o.classList.add("hidden"))});const e=document.getElementById("btn-new-supplier");e&&(t==="list"?e.classList.remove("hidden"):e.classList.add("hidden")),Pw()}const Ia=document.getElementById("content"),Od={monday:"Segunda",tuesday:"Terça",wednesday:"Quarta",thursday:"Quinta",friday:"Sexta",saturday:"Sábado",sunday:"Domingo"};let dt=new Set,Eo=null,ks=null;function Fw(t=8){let e="";for(let s=0;s<t;s++)e+=`
        <div class="bg-white rounded-lg shadow-md flex items-center gap-4 p-3 overflow-hidden animate-pulse sm:flex-col sm:items-stretch sm:p-0 sm:gap-0">
            <div class="w-16 h-16 rounded-full bg-gray-200 flex-shrink-0 sm:w-full sm:h-32 sm:rounded-b-none sm:rounded-t-lg"></div>
            <div class="flex-1 space-y-3 sm:p-4">
                <div class="h-4 bg-gray-200 rounded w-3/4"></div>
                <div class="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
        </div>
        `;return e}function Ow(t){return t.length===0?'<p class="col-span-full text-center text-gray-500 py-10">Nenhum profissional encontrado.</p>':t.map(e=>{const s=e.status==="inactive",n=P(e.name),o=P(e.specialty||"Especialidade"),r=e.photo||`https://placehold.co/100x100/E2E8F0/4A5568?text=${encodeURIComponent(e.name?e.name.charAt(0):"P")}`,a=JSON.stringify(e).replace(/'/g,"&apos;");return`
            <div class="professional-card bg-white rounded-lg shadow-md flex items-center gap-4 p-3 cursor-pointer transition-transform transform hover:shadow-lg hover:bg-gray-50
                        sm:flex-col sm:items-stretch sm:p-0 sm:gap-0 ${s?"opacity-50 bg-gray-100":""}" 
                 data-action="open-professional-modal" data-professional='${a}'>
                
                <img src="${r}" alt="Foto de ${n}" class="w-16 h-16 rounded-full object-cover flex-shrink-0
                            sm:w-full sm:h-32 sm:rounded-b-none sm:rounded-t-lg">
                
                <div class="flex-1 sm:p-4">
                    <div class="flex justify-between items-start">
                        <div>
                            <h3 class="text-sm font-bold text-gray-900 text-left sm:text-base">${n}</h3>
                            <p class="text-xs text-gray-500 text-left sm:text-sm">${o}</p>
                        </div>
                        <span class="text-xs font-semibold py-1 px-2 rounded-full hidden sm:inline-block ${s?"bg-red-100 text-red-700":"bg-green-100 text-green-700"}">
                            ${s?"Inativo":"Ativo"}
                        </span>
                    </div>
                    <div class="mt-2 pt-2 border-t sm:hidden">
                        <span class="text-xs font-semibold ${s?"text-red-700":"text-green-700"}">${s?"Inativo":"Ativo"}</span>
                    </div>
                    <div class="hidden sm:block mt-3 pt-3 border-t">
                        <p class="text-xs text-gray-600">Serviços: <span class="font-semibold">${e.services?.length||0}</span></p>
                    </div>
                </div>
            </div>`}).join("")}function Sa(){const t=document.getElementById("genericModal");t.style.display="none",ks&&t.removeEventListener("click",ks)}async function qw(t){const e=document.getElementById("genericModal"),s=t.id?t:{name:"Novo Profissional",specialty:"",status:"active",workingHours:{},services:[]},n=P(s.name),o=w.services||await ps(w.establishmentId),r=w.professionals||await ze(w.establishmentId),a=`
        <div class="modal-content max-w-5xl p-0 overflow-y-auto max-h-[90vh]"> 
            <div class="modal-header px-6 py-4 flex justify-between items-center border-b">
                <h2 class="text-2xl font-bold text-gray-800">${n}</h2>
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
                    data-id="${s.id||""}" 
                    class="text-red-600 hover:text-red-800 transition-colors ${s.id?"":"hidden"}" 
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
        </div>`;e.innerHTML=a,e.style.display="flex",jw(s,o),Hw(s),Uw(s,r),Ww(s)}function jw(t,e){const s=document.getElementById("professionalForm"),n=t.dob?t.dob.split("/"):["",""],o=Array.from({length:12},(D,R)=>{const O=R+1,N=O==n[1]?"selected":"",B=new Date(0,R).toLocaleString("pt-BR",{month:"long"});return`<option value="${O}" ${N}>${B.charAt(0).toUpperCase()+B.slice(1)}</option>`}).join(""),r=t.status||"active",a=P(t.name||""),l=P(t.specialty||""),c=P(t.phone||""),d=P(t.notes||"");s.innerHTML=`
        <input type="hidden" id="professionalId" value="${t.id||""}">
        <input type="hidden" id="profPhotoBase64" value="${t.photo||""}">
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="md:col-span-1 space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700">Foto de Perfil</label>
                    <div class="mt-1 flex flex-col items-center">
                        <img id="profPhotoPreview" src="${t.photo||`https://placehold.co/128x128/E2E8F0/4A5568?text=${encodeURIComponent(t.name?t.name.charAt(0):"P")}`}" alt="Foto de Perfil" class="w-32 h-32 rounded-full object-cover mb-3 border-4 border-gray-200">
                        <input type="file" id="profPhotoInput" class="hidden" accept="image/*">
                        <button type="button" id="profPhotoButton" class="bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">Alterar Foto</button>
                    </div>
                </div>
                 <div class="form-group">
                    <label for="profStatus">Status</label>
                    <select id="profStatus" class="mt-1 w-full p-2 border rounded-md bg-white">
                        <option value="active" ${r!=="inactive"?"selected":""}>Ativo</option>
                        <option value="inactive" ${r==="inactive"?"selected":""}>Inativo</option>
                    </select>
                </div>
            </div>

            <div class="md:col-span-2 space-y-4">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div class="form-group"><label for="profName">Nome</label><input type="text" id="profName" value="${a}" required class="mt-1 w-full p-2 border rounded-md"></div>
                    <div class="form-group"><label for="profSpecialty">Especialidade</label><input type="text" id="profSpecialty" value="${l}" required class="mt-1 w-full p-2 border rounded-md"></div>
                    <div class="form-group"><label for="profPhone">Número de telefone</label><input type="tel" id="profPhone" value="${c}" class="mt-1 w-full p-2 border rounded-md"></div>
                    <div class="form-group"><label for="profDobDay">Aniversário (Dia)</label><input type="number" id="profDobDay" value="${n[0]}" min="1" max="31" class="mt-1 w-full p-2 border rounded-md"></div>
                    <div class="form-group"><label for="profDobMonth">Aniversário (Mês)</label><select id="profDobMonth" class="mt-1 w-full p-2 border rounded-md bg-white"><option value="">Selecione...</option>${o}</select></div>
                    <div class="form-group"><label for="profOrderOnAgenda">Ordem na agenda</label><input type="number" id="profOrderOnAgenda" value="${t.orderOnAgenda||"1"}" min="1" class="mt-1 w-full p-2 border rounded-md"></div>
                </div>
                 <div class="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div class="form-group"><label for="profCommission">Recebe comissão?</label><select id="profCommission" class="mt-1 w-full p-2 border rounded-md bg-white"><option value="sim" ${t.receivesCommission?"selected":""}>Sim</option><option value="nao" ${t.receivesCommission?"":"selected"}>Não</option></select></div>
                    <div class="form-group"><label for="profShowOnAgenda">Mostrar na agenda</label><select id="profShowOnAgenda" class="mt-1 w-full p-2 border rounded-md bg-white"><option value="sim" ${t.showOnAgenda!==!1?"selected":""}>Sim</option><option value="nao" ${t.showOnAgenda===!1?"selected":""}>Não</option></select></div>
                </div>
            </div>
        </div>

        <div><label class="block text-sm font-medium text-gray-700">Serviços Realizados</label><div id="profServicesContainer" class="mt-2 grid grid-cols-2 md:grid-cols-3 gap-4 p-4 border rounded-md bg-white max-h-48 overflow-y-auto">${e.map(D=>`<label class="flex items-center space-x-2"><input type="checkbox" value="${D.id}" class="rounded" ${t.services?.includes(D.id)?"checked":""}><span>${P(D.name)}</span></label>`).join("")}</div></div>
        <div class="form-group"><label for="profNotes">Observações</label><textarea id="profNotes" rows="3" class="mt-1 w-full p-2 border rounded-md">${d}</textarea></div>`;const p=document.getElementById("profPhotoInput"),h=document.getElementById("profPhotoButton"),f=document.getElementById("profPhotoPreview"),x=document.getElementById("profPhotoBase64"),S=t.photo||`https://placehold.co/128x128/E2E8F0/4A5568?text=${encodeURIComponent(t.name?t.name.charAt(0):"P")}`,_=t.photo||"";h&&h.addEventListener("click",()=>p.click()),p&&(p.onchange=async()=>{const D=p.files[0];if(D){f.src="https://placehold.co/128x128/E2E8F0/4A5568?text=...";try{const R=await ap(D,800,800,.8),N=R.length*3/4,B=1e3*1024;if(N>B)throw new Error("A imagem é muito grande mesmo após a compressão.");f.src=R,x.value=R}catch(R){k("Erro de Imagem",R.message||"Não foi possível processar a imagem.","error"),f.src=S,x.value=_,p.value=""}}})}function Hw(t){const e=document.getElementById("jornada");e.innerHTML='<div><h3 class="text-xl font-semibold mb-4">Jornada de Trabalho Semanal</h3><p class="text-sm text-gray-600 mb-4">Defina os horários de trabalho padrão para este profissional.</p><div id="profScheduleContainer" class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4"></div></div>',zw(e.querySelector("#profScheduleContainer"),t.workingHours||{})}async function Uw(t,e){const s=document.getElementById("bloqueios");s.innerHTML=`
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
                <h3 class="text-xl font-semibold mb-4">Lançamento de Bloqueios</h3>
                <form id="batchBlockageForm" class="p-4 bg-white rounded-lg shadow-inner space-y-3 mb-4">
                    <h4 class="font-semibold text-gray-800">Selecione os Profissionais</h4>
                    <div id="batchProfSelectionContainer" class="max-h-32 overflow-y-auto p-2 border rounded-md space-y-2">
                        ${e.map(r=>`<label class="flex items-center"><input type="checkbox" name="batch-professionals" value="${r.id}" class="rounded mr-2" ${r.id===t.id?"checked":""}><span>${P(r.name)}</span></label>`).join("")}
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
                    <h3 class="text-xl font-semibold">Bloqueios de ${P(t.name)}</h3>
                    <select id="prof-blockages-filter" class="p-1 border rounded text-sm bg-white">
                        <option value="future">Futuros</option>
                        <option value="history">Histórico</option>
                    </select>
                </div>
                <div id="blockagesList" class="space-y-2 max-h-96 overflow-y-auto pr-2"></div>
            </div>
        </div>`;const n=document.getElementById("batchBlockageForm");n&&n.addEventListener("submit",async r=>{r.preventDefault();const a=Array.from(r.target.querySelectorAll('input[name="batch-professionals"]:checked')).map(x=>x.value);if(a.length===0)return k("Atenção","Selecione pelo menos um profissional.","error");const l=r.target.batchBlockageStartDate.value,c=r.target.batchBlockageEndDate.value||l,d=r.target.batchBlockageStartTime.value,p=r.target.batchBlockageEndTime.value,h=r.target.batchBlockageReason.value;if(!l||!d||!p)return k("Atenção","Preencha Data de Início, Início e Fim.","error");const f=a.map(x=>{const S={professionalId:x,establishmentId:w.establishmentId,startTime:new Date(`${l}T${d}`).toISOString(),endTime:new Date(`${c}T${p}`).toISOString(),reason:h};return _r(S)});try{await Promise.all(f),k("Sucesso!",`${a.length} bloqueios foram criados.`);const x=document.getElementById("prof-blockages-filter").value;_n(t.id,x)}catch(x){k("Erro",x.message,"error")}}),document.getElementById("prof-blockages-filter").addEventListener("change",r=>_n(t.id,r.target.value)),await _n(t.id,"future")}function zw(t,e){t.innerHTML=Object.keys(Od).map(s=>{const n=e[s]||{},o=n.active!==!1;return`
            <div class="day-schedule-card p-3 rounded-lg ${o?"bg-white":"bg-gray-100 disabled"} border">
                 <div class="flex justify-between items-center"><span class="font-semibold text-gray-800">${Od[s]}</span><label class="flex items-center cursor-pointer"><div class="relative"><input type="checkbox" data-day="${s}" data-field="active" class="sr-only" ${o?"checked":""}><div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full"></div></div></label></div>
                <div class="time-inputs grid grid-cols-2 gap-2 mt-2 text-sm">
                    <div><label>Início:</label><input type="time" data-day="${s}" data-field="start" value="${n.start||"09:00"}" class="w-full p-1 border rounded" ${o?"":"disabled"}></div>
                    <div><label>Fim:</label><input type="time" data-day="${s}" data-field="end" value="${n.end||"18:00"}" class="w-full p-1 border rounded" ${o?"":"disabled"}></div>
                    <div><label>Intervalo:</label><input type="time" data-day="${s}" data-field="breakStart" value="${n.breakStart||"12:00"}" class="w-full p-1 border rounded" ${o?"":"disabled"}></div>
                    <div><label>Fim Int.:</label><input type="time" data-day="${s}" data-field="breakEnd" value="${n.breakEnd||"13:00"}" class="w-full p-1 border rounded" ${o?"":"disabled"}></div>
                </div>
            </div>`}).join(""),t.querySelectorAll('input[type="checkbox"][data-field="active"]').forEach(s=>{s.addEventListener("change",n=>{const o=n.target.closest(".day-schedule-card"),r=!n.target.checked;o.classList.toggle("bg-white",!r),o.classList.toggle("bg-gray-100",r),o.classList.toggle("disabled",r),o.querySelectorAll(".time-inputs input").forEach(a=>a.disabled=r)})})}async function _n(t,e="future"){const s=document.getElementById("blockagesList");if(s){s.innerHTML='<div class="loader mx-auto"></div>';try{const n=new Date;let o,r;e==="history"?(r=new Date,o=new Date,o.setFullYear(o.getFullYear()-2)):(o=new Date,r=new Date,r.setFullYear(r.getFullYear()+2));let l=(await Cr(w.establishmentId,o.toISOString(),r.toISOString(),t)).map(d=>({...d,startTime:new Date(d.startTime),endTime:new Date(d.endTime)}));e==="history"?l=l.filter(d=>d.endTime<n).sort((d,p)=>p.startTime-d.startTime):l=l.filter(d=>d.endTime>=n).sort((d,p)=>d.startTime-p.startTime);const c=l.reduce((d,p)=>{const h=p.reason||"Sem motivo";return d[h]||(d[h]=[]),d[h].push(p),d},{});if(Object.keys(c).length===0){s.innerHTML=`<p class="text-center text-gray-500 text-sm py-4">Nenhum bloqueio ${e==="history"?"no histórico":"futuro"}.</p>`;return}s.innerHTML=Object.entries(c).map(([d,p])=>`
            <div class="bg-gray-100 rounded-lg p-3 my-2 space-y-2">
                <div class="flex justify-between items-center pb-2 border-b">
                    <h4 class="font-bold text-gray-700">${P(d)} (${p.length})</h4>
                    ${p.length>1?`<button data-action="batch-delete-blockage" data-ids='${JSON.stringify(p.map(h=>h.id))}' class="text-xs text-red-600 font-semibold hover:underline">Apagar Todos (${p.length})</button>`:""}
                </div>
                ${p.map(h=>`
                    <div class="flex justify-between items-center bg-white p-2 rounded-md text-sm border">
                        <p class="text-xs text-gray-500">
                           ${h.startTime.toLocaleDateString("pt-BR")} 
                           <span class="text-gray-400 mx-1">|</span> 
                           ${h.startTime.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})} - ${h.endTime.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}
                        </p>
                        <button data-action="delete-blockage" data-id="${h.id}" class="text-red-500 p-1 rounded-full hover:bg-red-100" title="Apagar">&times;</button>
                    </div>
                `).join("")}
            </div>
        `).join("")}catch(n){s.innerHTML=`<p class="text-red-500">${n.message}</p>`}}}function Ww(t){const e=document.getElementById("genericModal");ks&&e.removeEventListener("click",ks),ks=async s=>{const n=s.target.closest("button[data-action]");if(!n){const r=s.target.closest(".tab-link");r&&(e.querySelectorAll(".tab-link").forEach(a=>a.classList.remove("active")),r.classList.add("active"),e.querySelectorAll(".tab-content").forEach(a=>a.classList.add("hidden")),document.getElementById(r.dataset.tab).classList.remove("hidden"));return}const o=n.dataset.action;switch(s.stopPropagation(),o){case"close-modal":Sa();break;case"delete-professional":const r=n.dataset.id;if(await re("Excluir Profissional",`Tem certeza que deseja excluir ${t.name}? Esta ação não pode ser desfeita.`))try{await uu(r),k("Sucesso!","Profissional excluído.","success"),Sa(),sr()}catch(_){k("Erro",`Não foi possível excluir: ${_.message}`,"error")}break;case"save-professional":const l=document.getElementById("professionalForm"),c=n,d=document.getElementById("profScheduleContainer"),p=Array.from(l.querySelectorAll("#profServicesContainer input:checked")).map(_=>_.value),h={};d&&d.querySelectorAll(".day-schedule-card").forEach(_=>{const D=_.querySelector('[data-field="active"]').dataset.day;h[D]={active:_.querySelector('[data-field="active"]').checked,start:_.querySelector('[data-field="start"]').value,end:_.querySelector('[data-field="end"]').value,breakStart:_.querySelector('[data-field="breakStart"]').value,breakEnd:_.querySelector('[data-field="breakEnd"]').value}});const f={...t,id:l.querySelector("#professionalId").value||void 0,name:l.querySelector("#profName").value,specialty:l.querySelector("#profSpecialty").value,photo:l.querySelector("#profPhotoBase64").value,services:p,workingHours:h,phone:l.querySelector("#profPhone").value,dob:`${l.querySelector("#profDobDay").value}/${l.querySelector("#profDobMonth").value}`,receivesCommission:l.querySelector("#profCommission").value==="sim",showOnAgenda:l.querySelector("#profShowOnAgenda").value==="sim",orderOnAgenda:parseInt(l.querySelector("#profOrderOnAgenda").value)||1,notes:l.querySelector("#profNotes").value,status:l.querySelector("#profStatus").value,establishmentId:w.establishmentId};c.disabled=!0,c.textContent="A salvar...";try{f.id?(await Oo(f.id,f),k("Sucesso!","Profissional atualizado.","success")):(delete f.id,await du(f),k("Sucesso!","Profissional criado.","success")),Sa(),sr()}catch(_){k("Erro",_.message,"error"),c.disabled=!1,c.textContent="Salvar"}break;case"delete-blockage":const x=n.dataset.id;if(await re("Apagar Bloqueio","Tem certeza?"))try{await Xi(x),k("Bloqueio removido.","success");const _=document.getElementById("prof-blockages-filter")?document.getElementById("prof-blockages-filter").value:"future";_n(t.id,_)}catch(_){k("Erro",_.message,"error")}break;case"batch-delete-blockage":const S=JSON.parse(n.dataset.ids);if(await re("Apagar em Lote",`Tem certeza que deseja apagar ${S.length} bloqueios com este motivo?`))try{await sp(S),k("Bloqueios removidos.","success");const _=document.getElementById("prof-blockages-filter")?document.getElementById("prof-blockages-filter").value:"future";_n(t.id,_)}catch(_){k("Erro",_.message,"error")}break}},e.addEventListener("click",ks)}function ai(){const t=document.getElementById("batch-actions-container"),e=document.getElementById("selected-count");!t||!e||(dt.size>0?(e.textContent=`${dt.size} selecionado(s)`,t.classList.remove("hidden")):t.classList.add("hidden"))}function Gw(){re("Excluir em Lote",`Tem certeza que deseja excluir ${dt.size} profissionais? Esta ação não pode ser desfeita.`).then(async t=>{if(t)try{await qh(Array.from(dt)),k("Sucesso!",`${dt.size} profissionais foram excluídos.`,"success"),dt.clear(),ai(),sr()}catch(e){k("Erro",`Não foi possível excluir em lote: ${e.message}`,"error")}})}function pn(){const t=document.getElementById("professionalsList");if(!t)return;if(!w.professionals){t.className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 pb-20",t.innerHTML=Fw();return}const e=document.getElementById("showInactiveProfToggle").checked,s=document.getElementById("profSearchInput").value.toLowerCase(),n=w.professionals.filter(o=>{const r=o.name.toLowerCase().includes(s),a=e||o.status!=="inactive";return r&&a});t.className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 pb-20",t.innerHTML=Ow(n)}async function sr(){dt.clear(),Ia.innerHTML=`
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
        </section>`,Eo&&Ia.removeEventListener("click",Eo),Eo=e=>{const s=e.target.closest('[data-action="open-professional-modal"]'),n=e.target.closest('[data-action="batch-delete"]');if(s){e.preventDefault();let r={};if(s.dataset.professional)try{r=JSON.parse(s.dataset.professional)}catch(a){console.error("Erro ao fazer parse do professional data:",a);return}qw(r);return}if(n){Gw();return}const o=e.target.closest(".professional-checkbox");if(o){const r=o.dataset.id;o.checked?dt.add(r):dt.delete(r),pn(),ai();return}},Ia.addEventListener("click",Eo),document.getElementById("profSearchInput").addEventListener("input",pn),document.getElementById("showInactiveProfToggle").addEventListener("change",pn);const t=document.getElementById("professionalsList");w.professionals=null,w.services=null,pn();try{const[e,s]=await Promise.all([ze(w.establishmentId),ps(w.establishmentId)]);w.professionals=e,w.services=s,pn(),ai()}catch{t.innerHTML='<p class="text-red-500 col-span-full">Erro ao carregar dados da página.</p>'}}const Kw=document.getElementById("content");let ss=[],_t={},$s=null,Jw="O Estabelecimento",Xt=1;const Ta=20;let Ct=new Set;const Qw=1;function nr(t){if(!t)return"";const e=String(t).replace(/\D/g,"");return e.length>11?e.replace(/^(\d\d)(\d{5})(\d{4}).*/,"($1) $2-$3"):e.length>10?e.replace(/^(\d\d)(\d{5})(\d{4})/,"($1) $2-$3"):e.length>6?e.replace(/^(\d\d)(\d{4})(\d{0,4})/,"($1) $2-$3"):e.length>2?e.replace(/^(\d\d)(\d{0,5})/,"($1) $2"):e||t}const il=t=>{const e=parseFloat(t);return isNaN(e)?"R$ 0,00":e.toLocaleString("pt-BR",{style:"currency",currency:"BRL"})};function Ip(t){if(!t)return 0;let e=0;if(t.totalAmount!==void 0&&t.totalAmount!==null?e=parseFloat(t.totalAmount):t.value!==void 0&&t.value!==null?e=parseFloat(t.value):t.price!==void 0&&t.price!==null&&!Array.isArray(t.price)&&(e=parseFloat(t.price)),!e||e===0){let s=0;t.services&&Array.isArray(t.services)&&(s+=t.services.reduce((o,r)=>{const a=parseFloat(r.price)||parseFloat(r.servicePrice)||0;return o+a},0));const n=t.comandaItems||t.items;n&&Array.isArray(n)&&(s+=n.reduce((o,r)=>{const a=parseFloat(r.price)||0,l=parseInt(r.quantity)||1;return o+a*l},0)),s>0&&(e=s)}return isNaN(e)?0:e}function Us(t){const e=t.serviceName||t.summary||t.description||"Serviço/Venda",s=t.professionalName||t.professional||t.employeeName||"---",n=new Date(t.date||t.startTime||t.createdAt),o=n.toLocaleDateString("pt-BR"),r=n.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),a=(t.status||"").toLowerCase();let l="neutral";return["completed","paid","finalized","finished"].includes(a)?l="success":["scheduled","confirmed","pending"].includes(a)?l="warning":["cancelled","canceled"].includes(a)&&(l="error"),{id:t.id,rawDate:n,displayDate:o,displayTime:r,serviceName:e,professionalName:s,totalValue:Ip(t),status:a,statusType:l}}function Xw(t,e){const s=(t||[]).filter(c=>Us(c).statusType==="success");let n=0;s.forEach(c=>{n+=Ip(c)});let o=_t&&_t.conversionRate?parseFloat(_t.conversionRate):Qw;o<=0&&(o=1);const r=Math.floor(n/o);let a=0;(e||[]).forEach(c=>{c.type==="redeem"&&(a+=c.points?Math.abs(c.points):0)});const l=r-a;return{totalSpent:n,totalPointsEarned:r,totalPointsRedeemed:a,currentBalance:l,moneyPerPoint:o}}async function Yw(t,e,s){if(!_t||!_t.enabled)return null;const n=Xw(e,s),o=parseInt(t.loyaltyPoints||0);if(o!==n.currentBalance){console.log(`[Auto-Sync] ${t.name}: ${o} -> ${n.currentBalance}`),t.loyaltyPoints=n.currentBalance,t.totalSpent=n.totalSpent;const r=ss.findIndex(a=>a.id===t.id);r>=0&&(ss[r].loyaltyPoints=n.currentBalance),op(t.id,{loyaltyPoints:n.currentBalance}).catch(console.error)}return n}window.openClientModal=async t=>{$s=t;const e=!t,s=`
        <div class="flex flex-col h-[85vh] md:h-full bg-gray-50 overflow-hidden">
            <div class="bg-white border-b px-6 py-4 flex justify-between items-center flex-shrink-0">
                <div>
                    <h2 class="text-xl font-bold text-gray-800">${e?"Novo Cliente":t.name}</h2>
                    ${e?"":`<p class="text-sm text-gray-500">${nr(t.phone)}</p>`}
                </div>
                ${e?"":`
                <div class="flex gap-2">
                    <span class="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold flex items-center">
                         ★ <span id="header-points-display" class="ml-1">...</span> pts
                    </span>
                </div>`}
            </div>

            <div class="flex bg-white border-b overflow-x-auto flex-shrink-0" id="modal-tabs-header">
                ${["Perfil","Agendamentos","Histórico","Fidelidade"].map((d,p)=>`
                    <button onclick="switchModalTab('${p}')" 
                        class="modal-tab-btn flex-1 py-3 px-4 text-sm font-medium text-gray-500 border-b-2 border-transparent hover:text-indigo-600 whitespace-nowrap transition-colors"
                        data-index="${p}">
                        ${d}
                    </button>
                `).join("")}
            </div>

            <div id="modal-tab-content" class="flex-1 overflow-y-auto p-4 md:p-6">
                <div class="loader mx-auto mt-10"></div>
            </div>

            <footer class="bg-white border-t p-4 flex justify-between items-center flex-shrink-0">
                ${e?"<div></div>":`
                <button id="btn-delete-client" class="text-red-500 hover:bg-red-50 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    Excluir
                </button>`}
                
                <div class="flex gap-3">
                    <button class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 text-sm" onclick="document.getElementById('genericModal').style.display='none'">Fechar</button>
                    <button id="btn-save-client" class="px-6 py-2 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 shadow-sm text-sm">Salvar</button>
                </div>
            </footer>
        </div>
    `;Pe({title:null,contentHTML:s,maxWidth:"max-w-4xl"});const n=document.querySelector("#genericModal > div");n&&(n.classList.remove("p-6"),n.classList.add("rounded-xl","overflow-hidden"));let o=[],r=[],a=null;if(!e)try{[o,r]=await Promise.all([nx(w.establishmentId,t.name,t.phone),_t.enabled?ox(w.establishmentId,t.name,t.phone):[]]),a=await Yw(t,o,r);const d=document.getElementById("header-points-display");d&&a&&(d.textContent=a.currentBalance)}catch(d){console.error("Erro ao carregar dados",d)}window.switchModalTab=d=>{const p=parseInt(d);document.querySelectorAll(".modal-tab-btn").forEach(x=>{x.classList.remove("border-indigo-600","text-indigo-600"),x.classList.add("border-transparent","text-gray-500")});const h=document.querySelector(`.modal-tab-btn[data-index="${p}"]`);h&&(h.classList.remove("border-transparent","text-gray-500"),h.classList.add("border-indigo-600","text-indigo-600"));const f=document.getElementById("modal-tab-content");f.innerHTML="",p===0?Zw(f,t):p===1?e2(f,o):p===2?t2(f,o):p===3&&s2(f,a,o,r)},window.switchModalTab(e?0:1);const l=document.getElementById("btn-save-client");l&&(l.onclick=n2);const c=document.getElementById("btn-delete-client");c&&(c.onclick=o2)};function Zw(t,e){const s=P(e?.name||""),n=P(e?.email||""),o=nr(e?.phone||""),r=P(e?.notes||""),a=e?.dob?e.dob.split("/"):["",""],l=!!e?.id;t.innerHTML=`
        <form id="client-form" class="space-y-5 max-w-2xl mx-auto">
            <input type="hidden" id="clientId" value="${e?.id||""}">
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">Nome Completo</label>
                    <input type="text" id="clientName" value="${s}" class="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" required>
                </div>
                
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">WhatsApp / Celular</label>
                    <input type="tel" id="clientPhone" value="${o}" 
                        class="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none ${l?"bg-gray-100 text-gray-500 cursor-not-allowed":""}" 
                        ${l?"disabled":""} required placeholder="(00) 00000-0000">
                    ${l?'<p class="text-[10px] text-gray-500 mt-1">O ID é o telefone e não pode ser alterado.</p>':""}
                </div>

                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">E-mail (Opcional)</label>
                    <input type="email" id="clientEmail" value="${n}" class="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none">
                </div>

                <div class="grid grid-cols-2 gap-3">
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-1">Dia Nasc.</label>
                        <input type="number" id="clientDobDay" value="${a[0]}" min="1" max="31" class="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none">
                    </div>
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-1">Mês</label>
                        <input type="number" id="clientDobMonth" value="${a[1]}" min="1" max="12" class="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none">
                    </div>
                </div>
            </div>

            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1">Observações Internas</label>
                <textarea id="clientNotes" rows="4" class="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none">${r}</textarea>
            </div>
        </form>
    `;const c=document.getElementById("clientPhone");c&&!l&&c.addEventListener("input",d=>{d.target.value=nr(d.target.value)})}function e2(t,e){if(!e){t.innerHTML='<p class="text-center text-gray-500 mt-10">Histórico vazio.</p>';return}const s=e.filter(n=>Us(n).statusType==="warning");if(s.sort((n,o)=>new Date(n.date||n.startTime)-new Date(o.date||o.startTime)),s.length===0){t.innerHTML=`<div class="flex flex-col items-center justify-center py-12 text-gray-400">
            <p>Nenhum agendamento pendente.</p>
        </div>`;return}t.innerHTML=`<div class="space-y-3">
        ${s.map(n=>{const o=Us(n);return`
            <div class="bg-white border border-l-4 border-l-indigo-500 rounded-lg p-4 shadow-sm flex justify-between items-center">
                <div>
                    <p class="font-bold text-gray-800">${o.serviceName}</p>
                    <p class="text-sm text-gray-600 mt-1">Com: ${o.professionalName}</p>
                    <p class="text-xs text-gray-400 mt-2">${o.displayDate} às ${o.displayTime}</p>
                </div>
                <button onclick="navigateToAppointment('${o.id}', '${n.date}')" class="text-indigo-600 hover:bg-indigo-50 p-2 rounded-full">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                </button>
            </div>`}).join("")}
    </div>`}function t2(t,e){if(!e){t.innerHTML='<p class="text-center text-gray-500">Histórico vazio.</p>';return}const s=e.filter(n=>Us(n).statusType==="success");if(s.sort((n,o)=>new Date(o.date||o.createdAt)-new Date(n.date||n.createdAt)),s.length===0){t.innerHTML='<p class="text-center text-gray-500 py-10">Nenhum serviço finalizado.</p>';return}t.innerHTML=`<div class="space-y-3">
        ${s.map(n=>{const o=Us(n);return`
            <div class="bg-white border border-gray-200 rounded-lg p-3 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div class="flex-grow">
                    <div class="flex items-center gap-2 mb-1">
                        <span class="text-xs font-bold uppercase text-green-600 bg-green-50 px-2 py-0.5 rounded">Finalizado</span>
                        <span class="text-xs text-gray-400">${o.displayDate}</span>
                    </div>
                    <h4 class="font-bold text-gray-800 text-sm">${o.serviceName}</h4>
                    <p class="text-xs text-gray-600 mt-0.5">Prof: ${o.professionalName}</p>
                </div>
                <div class="flex items-center justify-between sm:justify-end gap-4">
                    <span class="font-bold text-gray-800 text-sm">${il(o.totalValue)}</span>
                    <button onclick="navigateToComanda('${o.id}')" class="text-xs text-indigo-600 border border-indigo-200 px-3 py-1.5 rounded hover:bg-indigo-50">
                        Ver
                    </button>
                </div>
            </div>`}).join("")}
    </div>`}function s2(t,e,s,n){if(!e){t.innerHTML='<div class="text-center py-10 text-gray-500">Fidelidade desativada.</div>';return}const o=[];(s||[]).forEach(a=>{const l=Us(a);if(l.statusType==="success"){const c=Math.floor(l.totalValue/e.moneyPerPoint);c>0&&o.push({type:"earn",desc:"Serviço",points:c,date:l.rawDate})}}),(n||[]).forEach(a=>{o.push({type:"redeem",desc:`Resgate: ${a.reward||"Prêmio"}`,points:-Math.abs(a.points),date:new Date(a.timestamp||a.date)})}),o.sort((a,l)=>l.date-a.date);const r=(_t.tiers||[]).map(a=>{const l=e.currentBalance>=a.points;return`
            <div class="flex justify-between items-center p-3 rounded-lg border ${l?"bg-green-50 border-green-200":"bg-gray-50"}">
                <div>
                    <p class="font-bold text-sm text-gray-800">${P(a.reward)}</p>
                    <p class="text-xs text-gray-500">${a.points} pts</p>
                </div>
                <button onclick="handleRedeemReward('${a.points}', '${P(a.reward)}')" ${l?"":"disabled"}
                    class="px-3 py-1 text-xs font-bold rounded ${l?"bg-green-600 text-white hover:bg-green-700":"bg-gray-200 text-gray-400 cursor-not-allowed"}">
                    Resgatar
                </button>
            </div>`}).join("");t.innerHTML=`
        <div class="space-y-6">
            <div class="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white shadow-lg text-center">
                <p class="text-indigo-100 text-xs font-medium uppercase tracking-widest mb-1">Saldo</p>
                <p class="text-5xl font-extrabold mb-2">${e.currentBalance}</p>
                <p class="text-sm opacity-90">Gasto Total: ${il(e.totalSpent)}</p>
            </div>
            <div>
                <h3 class="font-bold text-gray-800 mb-3 text-sm uppercase">Prêmios</h3>
                <div class="space-y-2">${r||'<p class="text-sm text-gray-400">Sem prêmios.</p>'}</div>
            </div>
            <div>
                <h3 class="font-bold text-gray-800 mb-3 text-sm uppercase">Extrato</h3>
                <div class="bg-gray-50 rounded-lg border border-gray-200 max-h-64 overflow-y-auto">
                    ${o.map(a=>`
                        <div class="flex justify-between items-center p-3 border-b last:border-0">
                            <div><p class="text-xs font-semibold text-gray-700">${a.desc}</p><p class="text-[10px] text-gray-400">${a.date.toLocaleDateString("pt-BR")}</p></div>
                            <span class="font-bold text-sm ${a.type==="earn"?"text-green-600":"text-red-500"}">${a.type==="earn"?"+":""}${a.points}</span>
                        </div>`).join("")||'<p class="text-xs text-center p-4 text-gray-400">Vazio.</p>'}
                </div>
            </div>
        </div>`}window.navigateToAppointment=(t,e)=>{document.getElementById("genericModal").style.display="none",Qe("agenda-section",{targetDate:e,scrollToAppointmentId:t})};window.navigateToComanda=t=>{document.getElementById("genericModal").style.display="none",Qe("comandas-section",{selectedAppointmentId:t,initialFilter:"finalizada"})};window.handleRedeemReward=async(t,e)=>{if(await re("Resgatar",`Trocar ${t} pontos por "${e}"?`))try{await rx(w.establishmentId,$s.name,$s.phone,{points:parseInt(t),reward:e}),k("Sucesso","Resgatado!","success"),window.switchModalTab(3)}catch(s){k("Erro",s.message,"error")}};window.openClientModalFromCard=t=>{const e=ss.find(s=>s.id===t);e&&window.openClientModal(e)};window.changePage=t=>{Xt+=t;const e=document.getElementById("clientSearchInput").value.toLowerCase(),s=ss.filter(n=>n.name.toLowerCase().includes(e)||n.phone&&n.phone.includes(e));ii(s),document.getElementById("clientsList").scrollTop=0};window.handleBulkDelete=async()=>{if(!await re("Excluir",`Apagar ${Ct.size} clientes?`))return;document.getElementById("bulk-actions-bar").innerHTML='<span class="text-center w-full">Excluindo...</span>';const t=Array.from(Ct);await Promise.all(t.map(e=>rp(e).catch(console.error))),k("Sucesso","Excluídos.","success"),Rr()};async function n2(){const t=document.getElementById("client-form");if(!t)return;const e=t.querySelector("#clientId").value,s=t.querySelector("#clientPhone").value;if(s.replace(/\D/g,"").length<10){k("Erro","Telefone inválido.","error");return}const n={name:t.querySelector("#clientName").value.trim(),email:t.querySelector("#clientEmail").value.trim(),phone:s,dob:`${t.querySelector("#clientDobDay").value}/${t.querySelector("#clientDobMonth").value}`,notes:t.querySelector("#clientNotes").value.trim(),establishmentId:w.establishmentId};try{e?(await op(e,n),k("Sucesso","Atualizado!","success")):(await Yi(n),k("Sucesso","Criado!","success")),document.getElementById("genericModal").style.display="none",Rr()}catch(o){k("Erro",o.message,"error")}}async function o2(){if(!(!$s||!$s.id)&&await re("Excluir","Tem certeza?"))try{await rp($s.id),k("Sucesso","Removido.","success"),document.getElementById("genericModal").style.display="none",Rr()}catch(t){k("Erro",t.message,"error")}}function ii(t){const e=document.getElementById("clientsList");if(!e)return;e.innerHTML="";const s=Math.ceil(t.length/Ta),n=(Xt-1)*Ta,o=t.slice(n,n+Ta),r=document.getElementById("bulk-actions-bar");if(r&&r.classList.add("hidden"),Ct.clear(),o.length===0){e.innerHTML='<p class="text-center text-gray-500 mt-10">Nenhum cliente encontrado.</p>';return}const a=document.createElement("div");if(a.className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4",e.appendChild(a),o.forEach(l=>{const c=document.createElement("div");c.className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all cursor-pointer relative group",c.innerHTML=`
            <div class="absolute top-4 right-4">
                <input type="checkbox" class="client-checkbox w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer" value="${l.id}">
            </div>
            
            <div class="flex items-center gap-4" onclick="openClientModalFromCard('${l.id}')">
                <div class="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                    ${l.name.charAt(0).toUpperCase()}
                </div>
                <div>
                    <h3 class="font-bold text-gray-900 truncate pr-6">${P(l.name)}</h3>
                    <p class="text-sm text-gray-500">${nr(l.phone)}</p>
                </div>
            </div>
            
            <div class="mt-4 pt-3 border-t grid grid-cols-2 gap-2 text-center" onclick="openClientModalFromCard('${l.id}')">
                <div>
                    <p class="text-[10px] uppercase text-gray-400 font-bold tracking-wider">Pontos</p>
                    <p class="text-sm font-bold text-indigo-600">${l.loyaltyPoints||0}</p>
                </div>
                <div>
                    <p class="text-[10px] uppercase text-gray-400 font-bold tracking-wider">Total Gasto</p>
                    <p class="text-sm font-bold text-gray-700">${il(l.totalSpent||0)}</p>
                </div>
            </div>
        `;const d=c.querySelector(".client-checkbox");d.onclick=p=>{p.stopPropagation(),p.target.checked?Ct.add(l.id):Ct.delete(l.id);const h=document.getElementById("selected-count");Ct.size>0?(r.classList.remove("hidden"),h.textContent=Ct.size):r.classList.add("hidden")},a.appendChild(c)}),s>1){const l=document.createElement("div");l.className="flex justify-center items-center gap-4 mt-8 pb-10",l.innerHTML=`
            <button ${Xt===1?"disabled":""} onclick="changePage(-1)" class="px-4 py-2 bg-white border rounded disabled:opacity-50">Anterior</button>
            <span class="text-sm text-gray-600">Página ${Xt} de ${s}</span>
            <button ${Xt===s?"disabled":""} onclick="changePage(1)" class="px-4 py-2 bg-white border rounded disabled:opacity-50">Próximo</button>
        `,e.appendChild(l)}}async function Rr(){Xt=1,Ct.clear(),Kw.innerHTML=`
        <div class="h-full flex flex-col bg-gray-50">
            <header class="bg-white border-b px-4 py-3 flex flex-col md:flex-row md:items-center gap-4 sticky top-0 z-10 shadow-sm">
                <div class="flex-grow relative">
                    <input type="text" id="clientSearchInput" placeholder="Buscar por nome ou telefone..." 
                        class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none">
                    <svg class="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                </div>
                <div class="flex gap-2">
                     <button onclick="openClientModal(null)" class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-bold shadow flex items-center gap-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
                        Novo
                    </button>
                </div>
            </header>
            
            <div id="clientsList" class="flex-1 overflow-y-auto p-4">
                <div class="loader mx-auto mt-10"></div>
            </div>

            <div id="bulk-actions-bar" class="hidden bg-gray-900 text-white px-6 py-3 flex justify-between items-center fixed bottom-4 left-1/2 transform -translate-x-1/2 rounded-full shadow-xl z-20 w-[90%] max-w-md">
                <span class="text-sm font-medium"><span id="selected-count">0</span> selecionados</span>
                <button onclick="handleBulkDelete()" class="text-red-400 hover:text-red-200 font-bold text-sm">Excluir</button>
            </div>
        </div>
    `;try{const[t,e]=await Promise.all([Ws(w.establishmentId,"",1e3),ms(w.establishmentId)]);ss=t,_t=e.loyaltyProgram||{enabled:!1},Jw=e.name||"O Estabelecimento",ii(ss)}catch{document.getElementById("clientsList").innerHTML='<p class="text-center text-red-500 mt-10">Erro ao carregar clientes.</p>'}document.getElementById("clientSearchInput").addEventListener("input",t=>{const e=t.target.value.toLowerCase(),s=ss.filter(n=>n.name.toLowerCase().includes(e)||n.phone&&n.phone.includes(e));Xt=1,ii(s)})}const qn=t=>F(`/api/financial/natures/${t}`),r2=t=>F("/api/financial/natures",{method:"POST",body:JSON.stringify(t)}),a2=t=>F(`/api/financial/natures/${t}`,{method:"DELETE"}),jn=t=>F(`/api/financial/cost-centers/${t}`),i2=t=>F("/api/financial/cost-centers",{method:"POST",body:JSON.stringify(t)}),l2=t=>F(`/api/financial/cost-centers/${t}`,{method:"DELETE"}),Sp=(t,e)=>F(`/api/financial/${t}`,{method:"POST",body:JSON.stringify(e)}),Tp=(t,e={})=>{let s=`/api/financial/${t}`;const n=new URLSearchParams;e.establishmentId&&n.append("establishmentId",e.establishmentId),e.startDate&&n.append("startDate",e.startDate),e.endDate&&n.append("endDate",e.endDate),e.natureId&&n.append("natureId",e.natureId),e.costCenterId&&n.append("costCenterId",e.costCenterId),e.status&&n.append("status",e.status);const o=n.toString();return o&&(s+=`?${o}`),F(s)},kp=(t,e,s)=>F(`/api/financial/${t}/${e}`,{method:"PUT",body:JSON.stringify(s)}),Cp=(t,e)=>F(`/api/financial/${t}/${e}`,{method:"DELETE"}),_p=(t,e,s)=>F(`/api/financial/${t}/${e}/status`,{method:"PATCH",body:JSON.stringify({status:"paid",paymentDate:s})}),c2=t=>Sp("payables",t),d2=t=>Tp("payables",t),u2=(t,e)=>kp("payables",t,e),m2=t=>Cp("payables",t),p2=(t,e)=>_p("payables",t,e),h2=t=>Sp("receivables",t),g2=t=>Tp("receivables",t),f2=(t,e)=>kp("receivables",t,e),b2=t=>Cp("receivables",t),v2=(t,e)=>_p("receivables",t,e),y2=(t,e,s)=>F(`/api/financial/cash-flow?establishmentId=${t}&startDate=${e}&endDate=${s}`),x2=t=>F(`/api/financial/today-summary/${t}`),Kt=document.getElementById("content"),ka={monday:"Segunda",tuesday:"Terça",wednesday:"Quarta",thursday:"Quinta",friday:"Sexta",saturday:"Sábado",sunday:"Domingo"},w2={indigo:{name:"Padrão (Índigo)",main:"#4f46e5"},blue:{name:"Azul",main:"#2563eb"},sky:{name:"Céu",main:"#0284c7"},teal:{name:"Verde Água",main:"#0d9488"},emerald:{name:"Esmeralda",main:"#059669"},green:{name:"Verde",main:"#16a34a"},lime:{name:"Lima",main:"#65a30d"},amber:{name:"Âmbar",main:"#d97706"},orange:{name:"Laranja",main:"#ea580c"},red:{name:"Vermelho",main:"#dc2626"},rose:{name:"Rosa",main:"#e11d48"},pink:{name:"Pink",main:"#db2777"},fuchsia:{name:"Fúcsia",main:"#c026d3"},purple:{name:"Roxo",main:"#7c3aed"},violet:{name:"Violeta",main:"#8b5cf6"},gray:{name:"Cinza",main:"#4b5563"},black:{name:"Preto",main:"#111827"}},Ap=[{id:"personal-data",icon:"M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",label:"Dados Gerais"},{id:"branding",icon:"M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z",label:"Identidade e Cores"},{id:"booking",icon:"M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2H5a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",label:"Agendamento Online"},{id:"working-hours",icon:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",label:"Horário de Funcionamento"},{id:"loyalty",icon:"M5 5a2 2 0 012-2h10a2 2 0 012 2v1h2a1 1 0 011 1v3a1 1 0 01-1 1h-2v1a2 2 0 01-2 2H7a2 2 0 01-2-2v-1H3a1 1 0 01-1-1V7a1 1 0 011-1h2V5z",label:"Plano de Fidelidade"},{id:"financial",icon:"M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8a1 1 0 011 1v4a1 1 0 11-2 0v-4a1 1 0 011-1zm0 0a1 1 0 001-1V5a1 1 0 10-2 0v2a1 1 0 001 1zm0 0a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1z",label:"Integração Financeira"},{id:"change-password",icon:"M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",label:"Alterar senha"},{id:"change-email",icon:"M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207",label:"Alterar E-mail de Acesso"},{id:"support",icon:"M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z",label:"Suporte e Ajuda"},{id:"cancellation",icon:"M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z",label:"Cancelar Assinatura"}];let Re=null;function qd(t,e,s){return new Promise((n,o)=>{const r=new FileReader;r.readAsDataURL(t),r.onload=a=>{const l=new Image;l.src=a.target.result,l.onload=()=>{const c=document.createElement("canvas");let d=l.width,p=l.height;d>e&&(p*=e/d,d=e),c.width=d,c.height=p,c.getContext("2d").drawImage(l,0,0,d,p);const f=t.type==="image/png"&&e<500?"image/png":"image/jpeg";n(c.toDataURL(f,s))},l.onerror=c=>o(c)},r.onerror=a=>o(a)})}function ws(t,e=null){let s='<option value="">-- Selecione (Opcional) --</option>';const n=a=>{const l=new Map,c=[];return a&&(a.forEach(d=>l.set(d.id,{...d,children:[]})),l.forEach(d=>{d.parentId&&l.has(d.parentId)?l.get(d.parentId).children.push(d):c.push(d)})),c},o=(a,l="")=>{const c=a.id===e?"selected":"";s+=`<option value="${a.id}" ${c}>${l}${P(a.name)}</option>`,a.children.forEach(d=>o(d,l+"— "))};return n(t).forEach(a=>o(a)),s}async function Gs(t,e){const s=e.target.querySelector('button[type="submit"]');s&&(s.disabled=!0,s.textContent="A Salvar...");try{const n=Re||await ms(w.establishmentId),o=[],{ownerName:r,...a}=t;if(r&&r!==w.userName){const c=_e.currentUser;c&&o.push(gh(c,{displayName:r}).then(()=>{w.userName=r}))}const l={...n,...a};if(o.push($o(w.establishmentId,l)),await Promise.all(o),Re=l,k("Sucesso","Definições salvas com sucesso! A página será recarregada para aplicar o novo tema.","success"),a.themeColor)setTimeout(()=>window.location.reload(),1500);else{const c=document.getElementById("panelEstablishmentName");a.name&&c&&(c.textContent=a.name,w.establishmentName=a.name)}}catch(n){k("Erro",`Não foi possível salvar: ${n.message}`,"error")}finally{s&&(s.disabled=!1,s.textContent="Salvar")}}function E2(t,e){const s=P(t.name||""),n=P(t.phone||""),o=P(t.document||""),r=P(t.email||""),a=P(t.address||""),l=P(t.website||""),c=P(w.userName||"");e.innerHTML=`
        <div class="bg-white p-4 md:p-6 rounded-lg shadow-md">
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-xl font-bold text-gray-800">Dados Gerais e de Contato</h3>
                <button type="submit" form="personal-data-form" class="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600">Salvar</button>
            </div>
            <form id="personal-data-form" class="space-y-4">
                <div>
                    <label for="ownerName" class="block text-sm font-medium text-gray-700">Seu nome (Dono)</label>
                    <input type="text" id="ownerName" class="mt-1 w-full p-2 border border-gray-300 rounded-md" value="${c}">
                </div>
                <div>
                    <label for="establishmentName" class="block text-sm font-medium text-gray-700">Nome do Salão ou Barbearia</label>
                    <input type="text" id="establishmentName" class="mt-1 w-full p-2 border border-gray-300 rounded-md" value="${s}">
                </div>
                <div>
                    <label for="establishmentPhone" class="block text-sm font-medium text-gray-700">Telefone Principal</label>
                    <input type="tel" id="establishmentPhone" class="mt-1 w-full p-2 border border-gray-300 rounded-md" value="${n}">
                </div>
                <div>
                    <label for="establishmentCnpjCpf" class="block text-sm font-medium text-gray-700">CNPJ / CPF</label>
                    <input type="text" id="establishmentCnpjCpf" value="${o}" class="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm">
                </div>
                <div>
                    <label for="establishmentEmail" class="block text-sm font-medium text-gray-700">E-mail de Contato</label>
                    <input type="email" id="establishmentEmail" value="${r}" class="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm">
                </div>
                <div>
                    <label for="establishmentAddress" class="block text-sm font-medium text-gray-700">Endereço Completo</label>
                    <input type="text" id="establishmentAddress" value="${a}" class="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm">
                </div>
                <div>
                    <label for="establishmentWebsite" class="block text-sm font-medium text-gray-700">Website</label>
                    <input type="url" id="establishmentWebsite" value="${l}" class="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm">
                </div>
            </form>
        </div>
    `,e.querySelector("#personal-data-form").addEventListener("submit",d=>{d.preventDefault();const p={ownerName:e.querySelector("#ownerName").value,name:e.querySelector("#establishmentName").value,phone:e.querySelector("#establishmentPhone").value,document:e.querySelector("#establishmentCnpjCpf").value,email:e.querySelector("#establishmentEmail").value,address:e.querySelector("#establishmentAddress").value,website:e.querySelector("#establishmentWebsite").value};Gs(p,d)})}function I2(t,e){e.innerHTML=`
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
    `,e.querySelector("#change-password-form").addEventListener("submit",async s=>{s.preventDefault();const n=e.querySelector("#newPassword").value,o=e.querySelector("#confirmPassword").value;if(n!==o){k("Erro","As senhas não coincidem.","error");return}const r=e.querySelector('button[form="change-password-form"]');r.disabled=!0,r.textContent="A Salvar...";try{const a=_e.currentUser;if(a)await hh(a,n),k("Sucesso","Senha alterada com sucesso!","success"),s.target.reset();else throw new Error("Nenhum usuário autenticado encontrado.")}catch(a){k("Erro",`Não foi possível alterar a senha: ${a.message}`,"error")}finally{r.disabled=!1,r.textContent="Salvar Nova Senha"}})}function S2(t,e){e.innerHTML=`
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
    `,e.querySelector("#change-email-form").addEventListener("submit",async s=>{s.preventDefault();const n=e.querySelector("#newEmail").value,o=e.querySelector("#currentPassword").value;if(!n||!o){k("Erro","Preencha todos os campos.","error");return}const r=e.querySelector('button[form="change-email-form"]');r.disabled=!0,r.textContent="A verificar...";try{const a=_e.currentUser;if(!a)throw new Error("Usuário não autenticado.");const l=uh.credential(a.email,o);await mh(a,l),r.textContent="A enviar link...",await ph(a,n),r.textContent="A atualizar BD...",await Fh(w.establishmentId,n),k("Sucesso","Link de verificação enviado! Por favor, verifique seu **novo e-mail** para confirmar a alteração.","success"),s.target.reset()}catch(a){let l="Não foi possível alterar o e-mail.";a.code==="auth/wrong-password"?l="A senha atual está incorreta.":a.code==="auth/email-already-in-use"?l="Este e-mail já está sendo usado por outra conta.":a.code==="auth/operation-not-allowed"?l="A troca de e-mail precisa ser habilitada no console do Firebase.":l=a.message,k("Erro",l,"error")}finally{r.disabled=!1,r.textContent="Salvar Novo E-mail"}})}function T2(t,e){const s=P(t.welcomeMessage||"");e.innerHTML=`
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
                        <img id="establishmentLogoPreview" src="${t.logo||"https://placehold.co/128x128/E2E8F0/4A5568?text=Logo"}" class="mt-2 h-24 w-24 rounded-lg object-contain border p-1 bg-gray-50">
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
                                 <img id="establishmentBgPreview" src="${t.backgroundImage||""}" class="w-full h-full object-cover ${t.backgroundImage?"":"hidden"}">
                                 <div id="establishmentBgPlaceholder" class="${t.backgroundImage?"hidden":"flex"} w-full h-full items-center justify-center text-gray-400 text-xs text-center p-1">Sem Imagem</div>
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
                                <input type="color" id="establishmentPrimaryColorInput" value="${t.primaryColor||t.themeColor||"#4f46e5"}" class="h-10 w-20 p-1 rounded border border-gray-300 cursor-pointer">
                            </div>
                        </div>

                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-1">Cor do Texto (Nome/Mensagem)</label>
                            <div class="flex items-center gap-3">
                                <input type="color" id="establishmentTextColorInput" value="${t.textColor||"#111827"}" class="h-10 w-20 p-1 rounded border border-gray-300 cursor-pointer">
                                <span class="text-xs text-gray-500">Ajuste para melhorar a leitura sobre a imagem.</span>
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <label for="establishmentWelcomeMessage" class="block text-sm font-medium text-gray-700">Mensagem de Boas-Vindas</label>
                        <input type="text" id="establishmentWelcomeMessage" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="Ex: Simples, rápido e à sua medida." value="${s}">
                    </div>
                </div>

                <div class="border-t pt-4 mt-4">
                    <h4 class="text-lg font-semibold text-gray-800 mb-2">Tema do Painel (Sistema)</h4>
                    <p class="text-sm text-gray-600 mb-4">Escolha a cor dos menus e botões do <strong>seu</strong> painel de gestão.</p>
                    <div id="color-palette-container" class="flex flex-wrap gap-4"></div>
                </div>
            </form>
        </div>
    `,e.querySelector("#establishmentLogoBase64").value=t.logo||"",e.querySelector("#establishmentBackgroundImageBase64").value=t.backgroundImage||"",Pp(t.themeColor||"indigo",e),e.querySelector("#establishmentLogoButton").onclick=()=>e.querySelector("#establishmentLogoInput").click(),e.querySelector("#establishmentLogoInput").onchange=async n=>{const o=n.target.files[0];if(o)try{const r=await qd(o,300,.9);e.querySelector("#establishmentLogoPreview").src=r,e.querySelector("#establishmentLogoBase64").value=r}catch(r){console.error("Erro ao processar logo:",r),k("Erro","Formato de imagem inválido ou corrompido.","error")}},e.querySelector("#establishmentBgButton").onclick=()=>e.querySelector("#establishmentBgInput").click(),e.querySelector("#establishmentBgInput").onchange=async n=>{const o=n.target.files[0];if(o){const r=e.querySelector("#establishmentBgButton"),a=r.textContent;try{r.textContent="A processar...",r.disabled=!0;const l=await qd(o,1280,.7);e.querySelector("#establishmentBgPreview").src=l,e.querySelector("#establishmentBgPreview").classList.remove("hidden"),e.querySelector("#establishmentBgPlaceholder").classList.add("hidden"),e.querySelector("#establishmentBackgroundImageBase64").value=l}catch(l){console.error("Erro ao processar fundo:",l),k("Erro","Não foi possível processar esta imagem. Tente outra.","error")}finally{r.textContent=a,r.disabled=!1}}},e.querySelector("#establishmentBgRemoveBtn").onclick=()=>{e.querySelector("#establishmentBgPreview").src="",e.querySelector("#establishmentBgPreview").classList.add("hidden"),e.querySelector("#establishmentBgPlaceholder").classList.remove("hidden"),e.querySelector("#establishmentBackgroundImageBase64").value=""},e.querySelector("#branding-form").addEventListener("submit",n=>{n.preventDefault();const o={logo:e.querySelector("#establishmentLogoBase64").value,welcomeMessage:e.querySelector("#establishmentWelcomeMessage").value,backgroundImage:e.querySelector("#establishmentBackgroundImageBase64").value,primaryColor:e.querySelector("#establishmentPrimaryColorInput").value,textColor:e.querySelector("#establishmentTextColorInput").value,themeColor:e.querySelector("#establishmentThemeColor").value};Gs(o,n)})}function k2(t,e){const s=t.urlId||w.establishmentId,n="https://www.kairosagenda.com.br";let o=window.location.origin;(o.includes("localhost")||o.includes("capacitor://")||o.includes("127.0.0.1")||o.includes("192.168"))&&(o=n);const r=P(`${o}/agendar?id=${s}`),a=t.publicBookingEnabled||!1,l=a?"Agendamento Online ATIVO":"Agendamento Online INATIVO",c=a?"text-green-600":"text-red-600";e.innerHTML=`
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
                        value="${r}" 
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
                            <input type="checkbox" id="publicBookingToggle" class="sr-only" ${a?"checked":""}>
                            <div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full"></div>
                        </div>
                    </label>
                    <span id="publicBookingStatusText" class="text-sm font-semibold ${c}">
                        ${l}
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
    `,e.querySelector("#copyBookingLinkBtn").addEventListener("click",()=>{const d=e.querySelector("#publicBookingLink");if(navigator.clipboard&&window.isSecureContext)navigator.clipboard.writeText(d.value).then(()=>{k("Sucesso","Link copiado para a área de transferência!","success")}).catch(p=>{k("Erro","Não foi possível copiar o link.","error")});else try{d.select(),document.execCommand("copy"),d.blur(),k("Sucesso","Link copiado para a área de transferência!","success")}catch{k("Erro","Não foi possível copiar o link. Por favor, copie manualmente.","error")}}),e.querySelector("#publicBookingToggle").addEventListener("change",async d=>{const p=d.target.checked,h=e.querySelector("#publicBookingStatusText");p?(h.textContent="Agendamento Online ATIVO",h.className="text-sm font-semibold text-green-600"):(h.textContent="Agendamento Online INATIVO",h.className="text-sm font-semibold text-red-600");try{d.target.disabled=!0,await Vh(w.establishmentId,p),Re.publicBookingEnabled=p,k("Sucesso",`Agendamento online ${p?"ativado":"desativado"}!`,"success")}catch(f){k("Erro",`Não foi possível alterar o status: ${f.message}`,"error"),d.target.checked=!p,p?(h.textContent="Agendamento Online ATIVO",h.className="text-sm font-semibold text-green-600"):(h.textContent="Agendamento Online INATIVO",h.className="text-sm font-semibold text-red-600")}finally{d.target.disabled=!1}}),L2(t.slotInterval||30,e),e.querySelector("#booking-form").addEventListener("submit",d=>{d.preventDefault();const p={slotInterval:parseInt(e.querySelector("#establishmentSlotInterval").value,10)};Gs(p,d)})}function C2(t,e){e.innerHTML=`
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
    `;const s=e.querySelector("#establishmentTimezone");if(t.timezone)s.value=t.timezone;else try{const r=Intl.DateTimeFormat().resolvedOptions().timeZone;Array.from(s.options).some(l=>l.value===r)?s.value=r:s.value="America/Sao_Paulo"}catch{s.value="America/Sao_Paulo"}const n=e.querySelector("#establishmentWorkingHoursContainer"),o=t.workingHours||{};Object.keys(ka).forEach(r=>{const a=o[r]||{},l=ka[r],c=a.active!==!1,d=document.createElement("div");d.className=`day-schedule-card p-4 rounded-lg ${c?"bg-gray-50":"bg-gray-100 disabled"}`,d.innerHTML=`
            <div class="flex justify-between items-center mb-3">
                <span class="font-bold text-gray-800">${l}</span>
                <label class="flex items-center cursor-pointer">
                    <div class="relative">
                        <input type="checkbox" id="est-${r}-active" class="sr-only" ${c?"checked":""}>
                        <div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full"></div>
                    </div>
                </label>
            </div>
            <div class="time-inputs space-y-2">
                <div class="flex items-center gap-2"><label class="w-16">Início:</label><input type="time" id="est-${r}-start" value="${a.start||"09:00"}" class="w-full rounded-md border-gray-300 shadow-sm text-sm p-1"></div>
                <div class="flex items-center gap-2"><label class="w-16">Fim:</label><input type="time" id="est-${r}-end" value="${a.end||"18:00"}" class="w-full rounded-md border-gray-300 shadow-sm text-sm p-1"></div>
                <div class="flex items-center gap-2"><label class="w-16">Intervalo:</label><input type="time" id="est-${r}-breakStart" value="${a.breakStart||"12:00"}" class="w-full rounded-md border-gray-300 shadow-sm text-sm p-1"></div>
                <div class="flex items-center gap-2"><label class="w-16">Fim Int.:</label><input type="time" id="est-${r}-breakEnd" value="${a.breakEnd||"13:00"}" class="w-full rounded-md border-gray-300 shadow-sm text-sm p-1"></div>
            </div>`,n.appendChild(d)}),n.addEventListener("change",r=>{const a=r.target.closest('.day-schedule-card input[type="checkbox"]');a&&a.closest(".day-schedule-card").classList.toggle("disabled",!a.checked)}),e.querySelector("#working-hours-form").addEventListener("submit",r=>{r.preventDefault();const a={};Object.keys(ka).forEach(c=>{a[c]={active:e.querySelector(`#est-${c}-active`).checked,start:e.querySelector(`#est-${c}-start`).value,end:e.querySelector(`#est-${c}-end`).value,breakStart:e.querySelector(`#est-${c}-breakStart`).value,breakEnd:e.querySelector(`#est-${c}-breakEnd`).value}});const l=e.querySelector("#establishmentTimezone").value;Gs({workingHours:a,timezone:l},r)})}function _2(t,e){e.innerHTML=`
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
    `;const s=t.loyaltyProgram||{};e.querySelector("#loyaltyEnabled").checked=s.enabled||!1,e.querySelector("#loyaltyPointsPerCurrency").value=s.pointsPerCurrency||10;const n=e.querySelector("#loyaltyTiersContainer"),o=(r={})=>{const a=document.createElement("div"),l=P(r.reward||"");return a.className="loyalty-tier-row",a.innerHTML=`
            <div>
                <label class="md:hidden text-xs font-bold text-gray-500 mb-1 block">Pontos</label>
                <input type="number" placeholder="Pontos" data-field="points" value="${r.points||""}" class="w-full p-2 border rounded-md">
            </div>
            <div>
                <label class="md:hidden text-xs font-bold text-gray-500 mb-1 block">Descrição do Prémio</label>
                <input type="text" placeholder="Descrição do Prémio" data-field="reward" value="${l}" class="w-full p-2 border rounded-md">
            </div>
            <div>
                <label class="md:hidden text-xs font-bold text-gray-500 mb-1 block">Valor do Desconto (R$)</label>
                <div class="flex items-center"><span class="mr-1">R$</span><input type="number" placeholder="Valor" data-field="discount" value="${r.discount||""}" class="w-full p-2 border rounded-md"></div>
            </div>
            <button type="button" class="remove-loyalty-tier bg-red-100 text-red-700 p-2 rounded-md hover:bg-red-200 md:bg-transparent md:text-red-500 md:hover:bg-red-100">&times;</button>
        `,a};(s.tiers||[]).forEach(r=>{n.appendChild(o(r))}),e.querySelector("#add-loyalty-tier").addEventListener("click",()=>{n.appendChild(o())}),n.addEventListener("click",r=>{const a=r.target.closest(".remove-loyalty-tier");a&&a.closest(".loyalty-tier-row").remove()}),e.querySelector("#loyalty-form").addEventListener("submit",r=>{r.preventDefault();const a=Array.from(e.querySelectorAll("#loyaltyTiersContainer .loyalty-tier-row")).map(c=>({points:parseInt(c.querySelector('input[data-field="points"]').value,10)||0,reward:c.querySelector('input[data-field="reward"]').value,discount:parseFloat(c.querySelector('input[data-field="discount"]').value)||0})),l={loyaltyProgram:{enabled:e.querySelector("#loyaltyEnabled").checked,pointsPerCurrency:parseFloat(e.querySelector("#loyaltyPointsPerCurrency").value)||1,tiers:a.filter(c=>c.points>0&&c.reward)}};Gs(l,r)})}async function A2(t,e){e.innerHTML=`
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
    `;try{const[s,n]=await Promise.all([qn(w.establishmentId),jn(w.establishmentId)]),o=t.financialIntegration||{},r=t.commissionConfig||{},a=t.purchaseConfig||{};e.querySelector("#financialNatureId").innerHTML=ws(s,o.defaultNaturezaId),e.querySelector("#financialCostCenterId").innerHTML=ws(n,o.defaultCentroDeCustoId),e.querySelector("#purchaseNatureId").innerHTML=ws(s,a.defaultNatureId),e.querySelector("#purchaseCostCenterId").innerHTML=ws(n,a.defaultCostCenterId),e.querySelector("#commissionNatureId").innerHTML=ws(s,r.defaultNatureId),e.querySelector("#commissionCostCenterId").innerHTML=ws(n,r.defaultCostCenterId)}catch{k("Erro","Não foi possível carregar os dados para a integração financeira.","error")}e.querySelector("#financial-form").addEventListener("submit",s=>{s.preventDefault();const n={financialIntegration:{defaultNaturezaId:e.querySelector("#financialNatureId").value||null,defaultCentroDeCustoId:e.querySelector("#financialCostCenterId").value||null},purchaseConfig:{defaultNatureId:e.querySelector("#purchaseNatureId").value||null,defaultCostCenterId:e.querySelector("#purchaseCostCenterId").value||null},commissionConfig:{defaultNatureId:e.querySelector("#commissionNatureId").value||null,defaultCostCenterId:e.querySelector("#commissionCostCenterId").value||null}};Gs(n,s)})}function P2(t,e){const s="5516997859430",n=encodeURIComponent("Olá, preciso de ajuda com o sistema Kairos."),o=`https://wa.me/${s}?text=${n}`;e.innerHTML=`
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

                <a href="${o}" target="_blank" rel="noopener noreferrer" 
                   class="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105 shadow-lg">
                    <span>Iniciar Atendimento</span>
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </a>
                
                <p class="text-xs text-gray-400 mt-4">Horário de atendimento: Seg a Sex, das 09h às 18h.</p>
            </div>
        </div>
    `}function $2(t,e){const s="5516997859430",n=encodeURIComponent("Olá, gostaria de solicitar o cancelamento da minha assinatura."),o=`https://wa.me/${s}?text=${n}`,r="sistemakairosagenda@gmail.com";e.innerHTML=`
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
                        <a href="mailto:${r}" class="text-indigo-600 font-semibold hover:underline">${r}</a>
                    </div>

                    <div class="border rounded-lg p-6 bg-green-50 border-green-100 flex flex-col items-center text-center">
                        <div class="bg-white p-3 rounded-full shadow-sm mb-4">
                             <svg class="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                            </svg>
                        </div>
                        <h4 class="font-bold text-gray-800 mb-2">Via WhatsApp</h4>
                        <p class="text-sm text-gray-600 mb-4">Fale diretamente com nosso suporte financeiro.</p>
                        <a href="${o}" target="_blank" rel="noopener noreferrer" 
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
    `}function D2(t,e){e.innerHTML=`
        <div class="bg-white p-4 md:p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-bold text-gray-800">${t}</h3>
            <p class="mt-4 text-gray-500">Esta secção ainda não foi implementada.</p>
        </div>
    `}function Pp(t="indigo",e){const s=e.querySelector("#color-palette-container"),n=e.querySelector("#establishmentThemeColor");!s||!n||(s.innerHTML="",Object.entries(w2).forEach(([o,r])=>{const a=o===t,l=document.createElement("div");l.className="w-24 text-center cursor-pointer mb-4",l.innerHTML=`
            <div class="w-16 h-16 mx-auto rounded-full border-4 ${a?"border-gray-800 scale-110 shadow-lg":"border-transparent"} p-1 transition-all">
                <div class="w-full h-full rounded-full" style="background-color: ${r.main};"></div>
            </div>
            <p class="text-xs mt-2 font-medium ${a?"text-gray-900 font-bold":"text-gray-500"}">${r.name}</p>
        `,l.addEventListener("click",()=>{n.value=o,Pp(o,e)}),s.appendChild(l)}),n.value=t)}function L2(t,e){const s=e.querySelector("#slotIntervalContainer"),n=e.querySelector("#establishmentSlotInterval");if(!s||!n)return;const o=[{label:"10 min",value:10},{label:"15 min",value:15},{label:"20 min",value:20},{label:"30 min",value:30},{label:"45 min",value:45},{label:"1 hora",value:60}];s.innerHTML=o.map(r=>{const a=r.value===t;return`<button type="button" data-value="${r.value}" 
                       class="interval-btn py-2 px-4 rounded-full text-sm font-semibold transition-colors 
                           ${a?"bg-indigo-600 text-white":"bg-gray-200 text-gray-700 hover:bg-gray-300"}">
                       ${r.label}
                   </button>`}).join(""),n.value=t,s.querySelectorAll(".interval-btn").forEach(r=>{r.addEventListener("click",()=>{n.value=r.dataset.value,s.querySelectorAll(".interval-btn").forEach(a=>{a.classList.remove("bg-indigo-600","text-white"),a.classList.add("bg-gray-200","text-gray-700")}),r.classList.add("bg-indigo-600","text-white"),r.classList.remove("bg-gray-200","text-gray-700")})})}async function R2(t){const e=Ap.find(n=>n.id===t);if(!e){console.error("Secção de definições não encontrada:",t);return}Kt.innerHTML=`
        <div class="bg-white p-4 shadow-md sticky top-0 z-10 md:relative">
            <button data-action="back-to-list" class="flex items-center gap-2 font-semibold text-indigo-600 hover:text-indigo-800">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
                Voltar
            </button>
        </div>
        
        <div id="settings-content-detail" class="p-4">
            <div class="flex justify-center items-center h-full"><div class="loader"></div></div>
        </div>
    `,Kt.querySelector('button[data-action="back-to-list"]').addEventListener("click",n=>{n.preventDefault(),$p()});const s=document.getElementById("settings-content-detail");switch(t){case"personal-data":E2(Re,s);break;case"change-password":I2(Re,s);break;case"change-email":S2(Re,s);break;case"branding":T2(Re,s);break;case"booking":k2(Re,s);break;case"working-hours":C2(Re,s);break;case"loyalty":_2(Re,s);break;case"financial":await A2(Re,s);break;case"support":P2(Re,s);break;case"cancellation":$2(Re,s);break;default:D2(e?e.label:"Definições",s)}}async function $p(){if(Kt.innerHTML=`
        <div class="bg-white p-4 rounded-lg shadow-md mb-6">
            <h2 class="text-xl font-bold text-gray-800 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-500" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" /></svg>
                Definições
            </h2>
        </div>
        <div class="flex justify-center items-center h-64"><div class="loader"></div></div>
    `,!Re)try{Re=await ms(w.establishmentId)}catch{k("Erro Fatal","Não foi possível carregar os dados do estabelecimento.","error"),Kt.innerHTML='<p class="text-red-500">Erro ao carregar dados.</p>';return}const t=_e.currentUser;t&&t.displayName&&(w.userName=t.displayName);const e=P(w.userName||_e.currentUser.email);let n=`https://placehold.co/96x96/E2E8F0/4A5568?text=${e?e.charAt(0).toUpperCase():"U"}`;t&&t.photoURL&&(n=t.photoURL),Kt.innerHTML=`
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
                    <img id="user-avatar" src="${n}" class="w-24 h-24 rounded-full object-cover">
                 </div>
                 <h3 class="font-bold mt-2 text-lg truncate">${e}</h3>
                 ${w.userName&&w.userName!==_e.currentUser.email?`<p class="text-sm text-gray-500">${P(_e.currentUser.email)}</p>`:""}
                 
                 <p class="text-xs text-indigo-600 font-semibold mt-2">VER MEU PERFIL / MEUS BLOQUEIOS</p>
            </div>
        </div>

        <div class="bg-white p-4 rounded-lg shadow-md">
            <nav id="settings-menu-list" class="space-y-1">
                ${Ap.map(r=>`
                    <button data-section="${r.id}" class="w-full flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100 font-semibold text-sm">
                        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${r.icon}"></path></svg>
                        <span class="flex-1 text-left">${r.label}</span>
                        <svg class="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                    </button>
                `).join("")}
            </nav>
        </div>
    `,Kt.querySelector("#settings-menu-list").addEventListener("click",r=>{const a=r.target.closest("button[data-section]");a&&(r.preventDefault(),R2(a.dataset.section))});const o=Kt.querySelector('[data-action="go-to-my-profile"]');o&&o.addEventListener("click",r=>{r.preventDefault(),Qe("my-profile-section")})}const An=document.getElementById("content");async function Ds(t){const e=document.getElementById("blockagesList");if(e){e.innerHTML='<div class="loader mx-auto"></div>';try{const s=document.getElementById("filterStartDate")?.value,n=document.getElementById("filterEndDate")?.value,o=await Cr(w.establishmentId,s||new Date().toISOString().split("T")[0],n||new Date().toISOString().split("T")[0],t),r=document.getElementById("filterReason")?.value.toLowerCase(),a=r?o.filter(c=>c.reason&&c.reason.toLowerCase().includes(r)):o,l=a.reduce((c,d)=>{const p=d.reason||"Sem motivo";return c[p]||(c[p]=[]),c[p].push(d),c},{});if(e.innerHTML="",a.length===0){e.innerHTML='<p class="text-center text-gray-500">Nenhum bloqueio encontrado.</p>';return}Object.entries(l).forEach(([c,d])=>{const p=document.createElement("div");p.className="bg-gray-100 rounded-lg p-3 my-2 space-y-2";let f=`<div class="flex justify-between items-center pb-2 border-b border-gray-200">
                                <h4 class="font-bold text-gray-700">${P(c)} (${d.length})</h4>`;if(d.length>1){const x=JSON.stringify(d.map(S=>S.id));f+=`<button data-action="batch-delete-blockage" data-ids='${x}' class="text-xs text-red-600 hover:text-red-800 font-semibold flex items-center gap-1">
                                    Apagar Lote
                                </button>`}f+="</div>",p.innerHTML=f,d.forEach(x=>{const S=new Date(x.startTime),_=new Date(x.endTime),D=S.toLocaleDateString("pt-BR"),R=_.toLocaleDateString("pt-BR"),N=`
                    <div class="bg-white p-3 rounded-md flex items-center justify-between shadow-sm">
                        <div>
                            <p class="font-medium text-gray-800 text-sm">
                                ${D===R?`${D} | ${S.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})} - ${_.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}`:`De ${D} às ${S.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}<br>Até ${R} às ${_.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}`}
                            </p>
                        </div>
                        <button class="p-1 rounded-full text-gray-500 hover:bg-gray-100 hover:text-red-600" data-action="delete-blockage" data-id="${x.id}">Apagar</button>
                    </div>`;p.innerHTML+=N}),e.appendChild(p)})}catch(s){e.innerHTML=`<p class="text-center text-red-500">Erro: ${s.message}</p>`}}}async function M2(t){t.preventDefault();const e=t.target,s=e.querySelector("#blockageProfId").value,n=e.querySelector("#blockageDate").value,o=e.querySelector("#blockageEndDate").value||n,r=e.querySelector("#blockageStartTime").value,a=e.querySelector("#blockageEndTime").value,l={establishmentId:w.establishmentId,professionalId:s,startTime:new Date(`${n}T${r}:00`).toISOString(),endTime:new Date(`${o}T${a}:00`).toISOString(),reason:e.querySelector("#blockageReason").value};try{await _r(l),e.reset(),k("Sucesso","Bloqueio adicionado com sucesso!","success"),Ds(s)}catch(c){k("Erro",`Não foi possível criar o bloqueio: ${c.message}`,"error")}}async function N2(t){t.preventDefault();const e=t.target,s=Array.from(e.querySelectorAll('input[name="batch-professionals"]:checked')).map(p=>p.value);if(s.length===0)return k("Atenção","Selecione pelo menos um profissional.","error");const n=e.querySelector("#batchBlockageDate").value,o=e.querySelector("#batchBlockageEndDate").value||n,r=e.querySelector("#batchBlockageStartTime").value,a=e.querySelector("#batchBlockageEndTime").value,l=e.querySelector("#batchBlockageReason").value,c=e.querySelector('button[type="submit"]');c.disabled=!0,c.textContent="Aguarde...";const d=s.map(p=>{const h={establishmentId:w.establishmentId,professionalId:p,startTime:new Date(`${n}T${r}:00`).toISOString(),endTime:new Date(`${o}T${a}:00`).toISOString(),reason:l};return _r(h)});try{await Promise.all(d),k("Sucesso",`${s.length} bloqueios foram criados com sucesso!`,"success"),e.reset(),e.querySelectorAll('input[name="batch-professionals"]:checked').forEach(h=>h.checked=!1);const p=document.getElementById("blockageProfId").value;p&&Ds(p)}catch(p){k("Erro",`Ocorreu um erro: ${p.message}`,"error")}finally{c.disabled=!1,c.textContent="Adicionar Bloqueio em Lote"}}function B2(t){An.addEventListener("submit",e=>{e.target.id==="blockageForm"&&M2(e),e.target.id==="batchBlockageForm"&&N2(e)}),An.addEventListener("input",e=>{e.target.matches("#filterStartDate, #filterEndDate, #filterReason")&&Ds(t)}),An.addEventListener("click",async e=>{const s=e.target.closest("button[data-action]");if(!s)return;const n=s.dataset.action;if(n==="back-to-professionals")Qe("profissionais-section");else if(n==="delete-blockage"){if(await re("Apagar Bloqueio","Tem a certeza que deseja apagar este bloqueio?"))try{await Xi(s.dataset.id),k("Sucesso","Bloqueio removido.","success"),Ds(t)}catch(r){k("Erro",`Não foi possível remover o bloqueio: ${r.message}`,"error")}}else if(n==="batch-delete-blockage"){const o=JSON.parse(s.dataset.ids);if(await re("Apagar Lote de Bloqueios",`Tem certeza que deseja apagar ${o.length} bloqueios de uma vez?`))try{await sp(o),k("Sucesso",`${o.length} bloqueios removidos.`,"success"),Ds(t)}catch(a){k("Erro",`Não foi possível apagar os bloqueios: ${a.message}`,"error")}}})}async function V2(t){const{professionalId:e,professionalName:s}=t;if(!e||!s){An.innerHTML='<p class="text-red-500 p-8">Erro: ID do profissional não fornecido.</p>';return}const n=P(s);An.innerHTML=`
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
                        <h3 class="text-xl font-semibold mb-4 border-b pb-2">Bloqueio para <span class="text-indigo-600">${n}</span></h3>
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
                        <h3 class="text-xl font-semibold mb-4 border-b pb-2">Bloqueios de ${n}</h3>
                        <div id="blockage-filters" class="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                            <div><label for="filterStartDate" class="block text-sm font-medium text-gray-700">De</label><input type="date" id="filterStartDate" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></div>
                            <div><label for="filterEndDate" class="block text-sm font-medium text-gray-700">Até</label><input type="date" id="filterEndDate" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></div>
                            <div><label for="filterReason" class="block text-sm font-medium text-gray-700">Motivo</label><input type="text" id="filterReason" placeholder="Pesquisar motivo..." class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></div>
                        </div>
                        <div id="blockagesList" class="space-y-4 max-h-[60vh] overflow-y-auto pr-2"></div>
                    </div>
                </div>
            </div>
        </section>`,B2(e),await Ds(e);const o=document.getElementById("batchProfSelectionContainer");try{const r=await ze(w.establishmentId);o.innerHTML=r.map(a=>`
            <div class="flex items-center">
                <input id="prof-batch-${a.id}" value="${a.id}" name="batch-professionals" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                <label for="prof-batch-${a.id}" class="ml-2 text-sm text-gray-700">${P(a.name)}</label>
            </div>`).join("")}catch{o.innerHTML='<p class="text-red-500">Erro ao carregar profissionais.</p>'}}const F2=t=>F(`/api/users/${t}`),O2=t=>F("/api/users",{method:"POST",body:JSON.stringify(t)}),q2=(t,e)=>F(`/api/users/${t}`,{method:"PUT",body:JSON.stringify(e)}),j2=t=>F(`/api/users/${t}`,{method:"DELETE"}),H2=(t,e)=>F(`/api/users/${t}/password`,{method:"PUT",body:JSON.stringify({password:e})}),U2=(t,e)=>F(`/api/users/${t}/status`,{method:"PATCH",body:JSON.stringify({status:e})}),zt=document.getElementById("content"),z2={"agenda-section":"Agenda","comandas-section":"Comandas","relatorios-section":"Relatórios Gerais","sales-report-section":"Relatório de Vendas (Caixa)","financial-section":"Financeiro","servicos-section":"Serviços","produtos-section":"Produtos","suppliers-section":"Fornecedores","profissionais-section":"Profissionais","ausencias-section":"Ausências e Bloqueios","clientes-section":"Clientes","packages-section":"Pacotes","commissions-section":"Comissões","estabelecimento-section":"Configurações do Estabelecimento","users-section":"Usuários e Acessos"},W2={view:"Visualizar",create:"Criar",edit:"Editar"};let hn=null,gn=null;function G2(t){const e=document.getElementById("usersListContainer");if(!e)return;const s=document.getElementById("showInactiveUsersToggle")?.checked;if(t.length===0){const n=s?"Nenhum usuário encontrado.":"Nenhum usuário ativo cadastrado.";e.innerHTML=`<p class="col-span-full text-center text-gray-500">${n}</p>`;return}t.sort((n,o)=>(n.status==="active"?-1:1)-(o.status==="active"?-1:1)),e.innerHTML=t.map(n=>{const o=JSON.stringify(n).replace(/'/g,"&apos;"),r=n.status==="active",a=w.professionals.find(p=>p.id===n.professionalId),l=a?a.name:"N/A",c=a?a.name.charAt(0):n.name.charAt(0),d=a?.photo||`https://placehold.co/64x64/E2E8F0/4A5568?text=${encodeURIComponent(c)}`;return`
        <div class="user-card-clickable bg-white rounded-lg shadow-sm border overflow-hidden flex cursor-pointer ${r?"":"opacity-60"}" 
             data-action="edit-user" 
             data-user='${o}'>
            
            <img src="${d}" alt="Foto de Perfil" class="w-16 h-16 object-cover flex-shrink-0 pointer-events-none">
            
            <div class="p-3 flex-grow flex flex-col justify-between">
                
                <div class="pointer-events-none">
                    <p class="font-bold text-gray-800 text-sm truncate">${n.name}</p>
                    <p class="text-xs text-gray-500 truncate">${n.email}</p>
                    <p class="text-xs text-gray-400 mt-1">Prof: <span class="font-semibold text-gray-700">${l}</span></p>
                </div>
                
                <div class="mt-2 flex items-center justify-start gap-2">
                    <label class="flex items-center cursor-pointer" title="${r?"Ativo":"Inativo"}">
                        <div class="relative">
                            <input type="checkbox" data-action="toggle-user-status" data-user-id="${n.id}" class="sr-only" ${r?"checked":""}>
                            <div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full"></div>
                        </div>
                    </label>
                    
                    <button data-action="delete-user" data-user-id="${n.id}" class="text-gray-500 hover:text-red-600 p-2 rounded-full transition-colors action-btn-delete" title="Excluir Usuário">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                </div>
            </div>
        </div>
    `}).join("")}function Fo(){const t=document.getElementById("showInactiveUsersToggle")?.checked;let e;t?e=w.users:e=w.users.filter(s=>s.status==="active"),G2(e)}function K2(t={}){return Object.entries(z2).map(([e,s])=>{const n=e==="agenda-section"||e==="comandas-section",o=t[e]?.view_all_prof===!0,r=Object.entries(W2).map(([l,c])=>`
             <label class="flex flex-col items-center space-y-1 cursor-pointer">
                <div class="relative">
                    <input type="checkbox" data-module="${e}" data-permission="${l}" class="sr-only" 
                        ${t[e]?.[l]?"checked":""}>
                    <div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full"></div>
                </div>
                <span class="text-xs text-gray-600">${c}</span>
            </label>
        `).join(""),a=n?`
            <div class="col-span-full pt-2 mt-2 border-t border-gray-200">
                <label class="flex items-center space-x-3 cursor-pointer">
                    <div class="relative">
                        <input type="checkbox" data-module="${e}" data-permission="view_all_prof" class="sr-only" 
                            ${o?"checked":""}>
                        <div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full"></div>
                    </div>
                    <span class="text-sm font-semibold text-indigo-600">Ver todos os dados da Equipe</span>
                </label>
            </div>
        `:"";return`
        <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100 space-y-3">
            <h4 class="font-bold text-gray-800 border-b pb-2">${s}</h4>
            <div class="grid grid-cols-3 gap-2">
                ${r}
            </div>
            ${a}
        </div>
    `}).join("")}async function jd(t=null){document.getElementById("user-list-view").classList.add("hidden");const e=document.getElementById("user-form-view");e.classList.remove("hidden");let s=w.professionals;if(!s||s.length===0)try{s=await ze(w.establishmentId),w.professionals=s}catch{k("Erro","Não foi possível carregar a lista de profissionais.","error")}const n=R=>s.find(O=>O.id===R),o=(R,O)=>{const B=n(R)?.photo,H=O.charAt(0).toUpperCase();return{photoSrc:B||`https://placehold.co/128x128/E2E8F0/4A5568?text=${H}`,initials:H,photoUrl:B||""}},r=t?.professionalId,a=t?.name||"Novo Usuário",l=o(r,a),c=n(r),d=R=>{let O='<option value="">-- Não Associado a um Profissional --</option>';return O+=s.map(N=>`<option value="${N.id}" ${N.id===R?"selected":""}>${N.name} (${N.specialty||"N/A"})</option>`).join(""),O},p=t!==null;e.querySelector("#userFormTitle").textContent=p?`Editar Usuário: ${t.name}`:"Novo Usuário";const h=e.querySelector("#userForm");h.innerHTML=`
        <div class="bg-white p-4 sm:p-6 rounded-xl shadow-2xl space-y-4">
            
            <div class="flex flex-col items-center mb-4">
                 <img id="userPhotoPreview" src="${l.photoSrc}" alt="Foto de Perfil do Profissional" class="w-20 h-20 rounded-full mx-auto mb-3 border-4 border-gray-200 object-cover">
                 <p id="profPhotoName" class="text-sm text-gray-500">${c?c.name:"Selecione um profissional"}</p>
                 <input type="hidden" id="professionalPhotoUrl" value="${l.photoUrl}">
            </div>

            <div class="bg-blue-50 p-4 rounded-lg space-y-3">
                 <h3 class="font-bold text-lg text-blue-800">Dados de Acesso</h3>
                <div class="form-group">
                    <label for="userName">Nome Completo</label>
                    <input type="text" id="userName" required value="${t?.name||""}">
                </div>
                <div class="form-group">
                    <label for="userEmail">Email</label>
                    <input type="email" id="userEmail" required value="${t?.email||""}">
                    ${p?'<p class="text-xs text-gray-700 mt-1"></p>':""}
                </div>
            </div>

            <div class="bg-yellow-50 p-4 rounded-lg space-y-3">
                 <h3 class="font-bold text-lg text-yellow-800">Associação (Agenda)</h3>
                <div class="form-group">
                    <label for="userProfessionalId">Associar a Profissional (Opcional)</label>
                    <select id="userProfessionalId" class="mt-1 block w-full">
                        ${d(t?.professionalId)}
                    </select>
                    <p class="text-xs text-gray-700 mt-1">Define qual profissional este usuário representa na Agenda/Comandas.</p>
                </div>
            </div>
            
            ${p?"":`
            <div class="bg-red-50 p-4 rounded-lg space-y-3">
                 <h3 class="font-bold text-lg text-red-800">Senha Provisória</h3>
                 <div class="form-group">
                     <label for="userPassword">Senha Provisória</label>
                     <input type="password" id="userPassword" required placeholder="Mínimo 6 caracteres">
                 </div>
            </div>
            `}

            ${p?`
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
                    ${K2(t?.permissions)}
                </div>
            </div>

            <div class="flex gap-4 pt-6 border-t">
                <button type="button" data-action="back-to-list" class="flex-1 py-3 px-4 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400">Cancelar</button>
                <button type="submit" class="flex-1 py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">Salvar Alterações</button>
            </div>
        </div>
    `;const f=window.innerWidth<768,x=h.querySelector(".bg-white");if(f&&x){x.classList.remove("rounded-xl","shadow-2xl","sm:p-6");const R=h.closest("section");R&&(R.style.padding="0",R.style.margin="0"),x.classList.add("p-4")}const S=h.querySelector("#userProfessionalId"),_=h.querySelector("#userPhotoPreview"),D=h.querySelector("#profPhotoName");if(S.addEventListener("change",R=>{const O=R.target.value,N=n(O),B=N?N.name:"Selecione um profissional",H=o(O,a);_.src=H.photoSrc,D.textContent=B,h.querySelector("#professionalPhotoUrl").value=H.photoUrl}),h.addEventListener("submit",async R=>{R.preventDefault();const O=t?.email,N=h.querySelector("#userEmail").value,B={};h.querySelectorAll('input[type="checkbox"]').forEach(T=>{const b=T.dataset.module,v=T.dataset.permission;B[b]||(B[b]={}),B[b][v]=T.checked});const H=h.querySelector("#userProfessionalId").value||null,G={name:h.querySelector("#userName").value,permissions:B,professionalId:H,establishmentId:w.establishmentId};try{p?(O!==N&&(G.email=N),await q2(t.id,G),k("Usuário atualizado com sucesso!","success")):(G.email=h.querySelector("#userEmail").value,G.password=h.querySelector("#userPassword").value,await O2(G),k("Usuário criado com sucesso!","success")),or()}catch(T){k(`Erro: ${T.message}`,"error")}}),p){const R=h.querySelector("#password-change-container"),O=R.querySelector('[data-action="show-password-form"]'),N=R.querySelector("#password-form"),B=N.querySelector('[data-action="save-password"]'),H=N.querySelector('[data-action="cancel-password-change"]');O.addEventListener("click",()=>{O.classList.add("hidden"),N.classList.remove("hidden")}),H.addEventListener("click",()=>{O.classList.remove("hidden"),N.classList.add("hidden"),N.querySelector("#userNewPassword").value=""}),B.addEventListener("click",async()=>{const G=N.querySelector("#userNewPassword").value;if(!G||G.length<6){k("Senha inválida","A nova senha deve ter pelo menos 6 caracteres.","error");return}if(await re("Alterar Senha","Tem a certeza que deseja alterar a senha deste usuário?"))try{B.disabled=!0,B.textContent="Aguarde...",await H2(t.id,G),k("Sucesso!","A senha do usuário foi alterada.","success"),O.classList.remove("hidden"),N.classList.add("hidden"),N.querySelector("#userNewPassword").value=""}catch(b){k("Erro",`Não foi possível alterar a senha: ${b.message}`,"error")}finally{B.disabled=!1,B.textContent="Salvar Nova Senha"}})}}async function J2(){const t=document.getElementById("usersListContainer");t.innerHTML='<div class="loader col-span-full mx-auto"></div>';try{const[e,s]=await Promise.all([F2(w.establishmentId),ze(w.establishmentId)]);w.users=e,w.professionals=s,Fo()}catch{k("Erro ao carregar usuários.","error"),t.innerHTML='<p class="col-span-full text-center text-red-500">Não foi possível carregar os usuários.</p>'}}async function or(){zt.innerHTML=`
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
    `,hn&&zt.removeEventListener("click",hn),gn&&zt.removeEventListener("change",gn),hn=async t=>{if(!document.getElementById("user-list-view")){zt.removeEventListener("click",hn);return}const e=t.target.closest("[data-action]");if(!e)return;switch(e.dataset.action){case"new-user":jd();break;case"edit-user":const n=JSON.parse(e.dataset.user.replace(/&apos;/g,"'"));jd(n);break;case"back-to-list":or();break;case"delete-user":{t.stopPropagation();const o=e.dataset.userId;if(await re("Excluir Usuário","Tem certeza que deseja excluir este usuário? Esta ação é irreversível."))try{await j2(o),k("Usuário excluído com sucesso!","success"),or()}catch(a){k(`Erro ao excluir: ${a.message}`,"error")}break}}},gn=async t=>{if(!document.getElementById("user-list-view")){zt.removeEventListener("change",gn);return}const e=t.target.closest('input[data-action="toggle-user-status"]');if(t.target.id==="showInactiveUsersToggle")Fo();else if(e){t.stopPropagation();const s=e.dataset.userId,n=e.checked?"active":"inactive";try{await U2(s,n),k(`Usuário ${n==="active"?"ativado":"inativado"} com sucesso.`,"success");const o=w.users.findIndex(r=>r.id===s);o>-1&&(w.users[o].status=n,Fo())}catch(o){k(`Erro ao atualizar status: ${o.message}`,"error"),e.checked=!e.checked,Fo()}}},zt.addEventListener("click",hn),zt.addEventListener("change",gn),await J2()}const Q2=document.getElementById("content");let Hd={},li=null;function X2(){Object.values(Hd).forEach(t=>t?.destroy()),Hd={}}function Y2(t,e){if(!window.jspdf){k("Erro","Biblioteca PDF não carregada.","error");return}const{jsPDF:s}=window.jspdf,n=new s({orientation:"landscape",unit:"px",format:"a4"}),o=document.getElementById("salesReportSummaryCards");if(n.setFontSize(18),n.text(t,n.internal.pageSize.getWidth()/2,40,{align:"center"}),o){const a=[["Receita Total",o.querySelector("#summary-revenue").textContent],["Vendas Totais",o.querySelector("#summary-transactions").textContent],["Ticket Médio",o.querySelector("#summary-avg-ticket").textContent]];n.autoTable({startY:60,head:[["Métrica","Valor"]],body:a,theme:"striped",headStyles:{fillColor:[79,70,229]}})}const r=n.lastAutoTable?n.lastAutoTable.finalY+20:60;n.text("Detalhes das Vendas",20,r),n.autoTable({html:`#${e}`,startY:r+10,theme:"grid",headStyles:{fillColor:[22,163,74]}}),n.save(`${t.replace(/[\s/]/g,"_").toLowerCase()}.pdf`)}function Ud(t){const e=document.getElementById("genericModal"),s=P(t.client),n=P(t.items),o=P(t.responsavelCaixa||"N/A"),r=(t.payments||[]).map(a=>`
        <div class="flex justify-between text-sm">
            <span>${P(a.method.charAt(0).toUpperCase()+a.method.slice(1))}</span>
            <span class="font-medium">R$ ${a.value.toFixed(2)}</span>
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
                    <p class="font-semibold text-gray-800">${s}</p>
                </div>
                 <div class="bg-gray-50 p-3 rounded-lg">
                    <p class="text-sm font-medium text-gray-600">Itens</p>
                    <p class="font-semibold text-gray-800">${n}</p>
                </div>
                <div class="bg-gray-50 p-3 rounded-lg">
                    <p class="text-sm font-medium text-gray-600">Responsável pelo Caixa</p>
                    <p class="font-semibold text-gray-800">${o}</p>
                </div>
                 <div class="border-t pt-4 mt-4">
                     <h3 class="font-semibold mb-2">Pagamento</h3>
                     <div class="space-y-1">
                        ${r}
                     </div>
                     <div class="flex justify-between font-bold text-lg mt-2 pt-2 border-t">
                         <span>TOTAL</span>
                         <span>R$ ${t.total.toFixed(2)}</span>
                     </div>
                </div>
            </div>
        </div>
    `,e.style.display="flex"}function Z2(t){const{summary:e,transactions:s}=t;document.getElementById("summary-revenue").textContent=`R$ ${e.totalRevenue.toFixed(2)}`,document.getElementById("summary-transactions").textContent=e.totalTransactions,document.getElementById("summary-avg-ticket").textContent=`R$ ${e.averageTicket.toFixed(2)}`;const n=document.getElementById("paymentSummaryTableBody"),o=Object.entries(e.paymentMethodTotals).sort(([,l],[,c])=>c-l);n.innerHTML=o.map(([l,c])=>`
        <tr class="border-b">
            <td class="py-2 px-4 font-medium">${P(l.charAt(0).toUpperCase()+l.slice(1))}</td>
            <td class="py-2 px-4 text-right font-semibold">R$ ${c.toFixed(2)}</td>
        </tr>
    `).join("");const r=document.getElementById("transactionsTableBody"),a=document.getElementById("mobileTransactionsList");if(s.length===0){const l='<tr><td colspan="5" class="text-center py-8 text-gray-500">Nenhuma venda encontrada para o período selecionado.</td></tr>';r.innerHTML=l,a.innerHTML='<div class="text-center py-8 text-gray-500">Nenhuma venda encontrada.</div>';return}r.innerHTML=s.map((l,c)=>{const d=P(l.client),p=P(l.items),h=P(l.type);return`
        <tr class="border-b hover:bg-gray-50 cursor-pointer" data-transaction-index="${c}">
            <td class="w-24 py-3 px-4">${new Date(l.date).toLocaleString("pt-BR",{dateStyle:"short",timeStyle:"short"})}</td>
            <td class="w-40 py-3 px-4 truncate max-w-[150px]">${d}</td>
            <td class="w-auto py-3 px-4 truncate max-w-[200px]">${p}</td>
            <td class="w-16 py-3 px-4 text-center text-xs">${h}</td>
            <td class="w-24 py-3 px-4 text-right font-medium">R$ ${l.total.toFixed(2)}</td>
        </tr>
    `}).join(""),r.querySelectorAll("tr").forEach(l=>{l.addEventListener("dblclick",()=>{const c=l.dataset.transactionIndex,d=li.transactions[c];d&&Ud(d)})}),a.innerHTML=s.map((l,c)=>{const d=P(l.client),p=P(l.items),h=P(l.type);return`
        <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100 active:bg-gray-50 cursor-pointer transition-colors" data-transaction-index="${c}">
            <div class="flex justify-between items-start mb-2">
                <div class="flex flex-col">
                    <span class="text-xs text-gray-500 font-medium">${new Date(l.date).toLocaleString("pt-BR",{dateStyle:"short",timeStyle:"short"})}</span>
                    <span class="font-bold text-gray-800 text-lg">${d}</span>
                </div>
                <div class="text-right">
                    <span class="block font-bold text-green-600 text-lg">R$ ${l.total.toFixed(2)}</span>
                    <span class="inline-block px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600 border border-gray-200">${h}</span>
                </div>
            </div>
            <div class="mt-2 pt-2 border-t border-dashed border-gray-200">
                <p class="text-sm text-gray-600 line-clamp-2">${p}</p>
            </div>
            <p class="text-xs text-blue-500 mt-2 text-center font-medium">Toque para ver detalhes</p>
        </div>
    `}).join(""),a.querySelectorAll("div[data-transaction-index]").forEach(l=>{l.addEventListener("click",()=>{const c=l.dataset.transactionIndex,d=li.transactions[c];d&&Ud(d)})})}async function zd(){const t=document.getElementById("main-reports-view"),e=document.getElementById("reportStartDate"),s=document.getElementById("reportEndDate");if(!t||!e||!s)return;const n=e.value,o=s.value;if(!n||!o)return k("Atenção","Por favor, selecione as datas de início e fim.","error");t.innerHTML='<div class="p-8 text-center"><div class="loader mx-auto"></div><p class="mt-4">A gerar relatório...</p></div>';try{const r=document.getElementById("cashierSessionFilter").value,a=await ex({establishmentId:w.establishmentId,startDate:n,endDate:o,cashierSessionId:r});li=a,t.innerHTML=`
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
        `,Z2(a)}catch(r){k("Erro",`Não foi possível carregar o relatório: ${r.message}`,"error"),t.innerHTML=`<p class="p-8 text-center text-red-500">${P(r.message)}</p>`}}async function e1(){X2();const t=new Date().toISOString().split("T")[0],e=new Date;e.setDate(e.getDate()-30);const s=e.toISOString().split("T")[0];Q2.innerHTML=`
        <section class="pb-20 md:pb-0"> <div class="flex flex-col gap-4 mb-6">
                <h2 class="text-2xl md:text-3xl font-bold text-gray-800 px-2 md:px-0">Relatório de Vendas</h2>
                
                <div class="w-full bg-white p-4 rounded-lg shadow-md space-y-4">
                    <div class="grid grid-cols-2 gap-3 md:flex md:items-center md:gap-4">
                        <div class="flex-1">
                            <label for="reportStartDate" class="block text-xs font-medium text-gray-500 mb-1">De:</label>
                            <input type="date" id="reportStartDate" value="${s}" class="w-full p-2 border rounded-md text-sm">
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
        </section>`,document.getElementById("generateReportBtn").addEventListener("click",zd),document.getElementById("exportPdfBtn").addEventListener("click",()=>{const n=document.getElementById("reportStartDate").value,o=document.getElementById("reportEndDate").value,r=`Relatorio_Vendas_${n}_a_${o}`;Y2(r,"transactionsTable")});try{const n=await Dx(w.establishmentId),o=document.getElementById("cashierSessionFilter");n&&n.length>0&&n.forEach(r=>{const a=new Date(r.openTime).toLocaleString("pt-BR",{dateStyle:"short"}),l=P(r.closedByName||"N/A");o.innerHTML+=`<option value="${r.id}">${l} - ${a}</option>`})}catch{k("Erro","Não foi possível carregar o histórico de caixas para o filtro.","error")}await zd()}const t1=document.getElementById("content");let W={payables:[],receivables:[],natures:[],costCenters:[],currentFilter:"pending",startDate:new Date(new Date().getFullYear(),new Date().getMonth()-1,1).toISOString().split("T")[0],endDate:new Date().toISOString().split("T")[0],previousBalance:0,filterNaturezaId:"all",filterCostCenterId:"all",currentListView:"receivables"},Ca=null,Io=null,So=null;function ll(t){const e=new Map,s=[];return t&&(t.forEach(n=>e.set(n.id,{...n,children:[]})),e.forEach(n=>{n.parentId&&e.has(n.parentId)?e.get(n.parentId).children.push(n):s.push(n)})),s}function Dp(t,e,s){if(!t)return;if(!e||e.length===0){t.innerHTML='<p class="text-center text-gray-500">Nenhum item criado.</p>';return}const n=(o,r=0)=>{const a="— ".repeat(r);return`
            <div style="margin-left: ${r*20}px;" class="flex justify-between items-center bg-gray-100 p-2 rounded">
                <span>${a}${o.name}</span>
                <button data-action="delete-${s}" data-id="${o.id}" class="text-red-500 hover:text-red-700 font-semibold text-sm">Apagar</button>
            </div>
            ${o.children.map(l=>n(l,r+1)).join("")}
        `};t.innerHTML=e.map(o=>n(o)).join("")}async function Wd(t){document.getElementById("fab-menu")?.classList.add("hidden"),document.getElementById("main-fab-btn")?.classList.remove("rotate-45");const e=document.getElementById("genericModal"),s=t==="nature",n=`Gerir ${s?"Naturezas Financeiras":"Centros de Custo"}`,o=s?qn:jn,r=s?"natures":"costCenters";e.innerHTML=`
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
        </div>`,e.style.display="flex";const a=e.querySelector("#hierarchyList"),l=e.querySelector("#itemParent"),c=p=>{const h=ll(p);if(Dp(a,h,t),l){l.innerHTML='<option value="">-- Nível Principal --</option>';const f=(x,S="",_=0)=>{const D=_>0?"— ".repeat(_):"";l.innerHTML+=`<option value="${x.id}">${D}${x.name}</option>`,x.children.forEach(R=>f(R,S+"— "))};h.forEach(x=>f(x))}};try{const p=await o(w.establishmentId);W[r]=p,c(p)}catch(p){console.error(p)}const d=e.querySelector("#hierarchyForm");d&&d.addEventListener("submit",async p=>{p.preventDefault();const h=e.querySelector("#itemName");if(!h)return;const f=h.value,x=l.value,S=s?r2:i2;try{await S({name:f,parentId:x||null,establishmentId:w.establishmentId});const _=await o(w.establishmentId);W[r]=_,c(_),d.reset(),await ns()}catch(_){k("Erro",`Não foi possível criar: ${_.message}`,"error")}})}function s1(t){const e=document.getElementById("cashFlowChart");if(!e)return;const s=e.getContext("2d");Ca&&Ca.destroy();const n=t.payables.map(o=>o*-1);Ca=new Chart(s,{type:"bar",data:{labels:t.labels,datasets:[{label:"Receitas",data:t.receivables,backgroundColor:"rgba(74, 222, 128, 0.6)",borderColor:"rgba(34, 197, 94, 1)",borderWidth:1,yAxisID:"y"},{label:"Despesas",data:n,backgroundColor:"rgba(248, 113, 113, 0.6)",borderColor:"rgba(239, 68, 68, 1)",borderWidth:1,yAxisID:"y"},{label:"Saldo Acumulado",data:t.expectedBalance,type:"line",borderColor:"rgba(59, 130, 246, 1)",backgroundColor:"rgba(59, 130, 246, 0.2)",borderWidth:3,pointRadius:4,pointBackgroundColor:"rgba(59, 130, 246, 1)",fill:!0,tension:.1,yAxisID:"y1"}]},options:{responsive:!0,maintainAspectRatio:!1,scales:{x:{stacked:!0},y:{type:"linear",display:!0,position:"left",stacked:!0,title:{display:!0,text:"Movimentações (R$)"}},y1:{type:"linear",display:!0,position:"right",title:{display:!0,text:"Saldo Acumulado (R$)"},grid:{drawOnChartArea:!1}}},plugins:{tooltip:{callbacks:{label:function(o){let r=o.dataset.label||"";if(r&&(r+=": "),o.parsed.y!==null){const a=Math.abs(o.parsed.y);r+=new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(a)}return r}}}}}})}async function Gd(){const t=document.getElementById("cash-flow-chart-container"),e=document.getElementById("cashFlowStartDate"),s=document.getElementById("cashFlowEndDate");if(!t||!e||!s)return;const n=e.value,o=s.value;if(!n||!o){k("Atenção","Por favor, selecione as datas de início e fim.","error");return}t.innerHTML='<div class="loader mx-auto my-10"></div>';try{const r=await y2(w.establishmentId,n,o);document.getElementById("cash-flow-chart-container")&&(t.innerHTML='<canvas id="cashFlowChart"></canvas>',s1(r))}catch(r){document.getElementById("cash-flow-chart-container")&&(t.innerHTML=`<p class="text-red-500 text-center">Erro ao carregar dados do gráfico: ${r.message}</p>`)}}function Kd(){document.getElementById("fab-menu")?.classList.add("hidden"),document.getElementById("main-fab-btn")?.classList.remove("rotate-45");const t=document.getElementById("genericModal"),e=new Date,s=new Date(e.getFullYear(),e.getMonth(),1).toISOString().split("T")[0],n=e.toISOString().split("T")[0];t.innerHTML=`
        <div class="modal-content max-w-4xl">
             <div class="flex justify-between items-center mb-4">
                <h2 class="text-2xl font-bold text-gray-800">Fluxo de Caixa</h2>
                <button type="button" data-action="close-modal" data-target="genericModal" class="text-2xl font-bold">&times;</button>
            </div>
            <div class="flex flex-wrap items-end gap-4 mb-4 bg-gray-50 p-3 rounded-lg">
                <div>
                    <label for="cashFlowStartDate" class="text-sm font-medium">De:</label>
                    <input type="date" id="cashFlowStartDate" value="${s}" class="p-2 border rounded-md">
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
    `,t.style.display="flex";const o=t.querySelector("#generateCashFlowBtn");o&&(o.addEventListener("click",Gd),Gd())}function n1(){const t=document.getElementById("genericModal"),e=W.payables.filter(h=>h.status==="pending").reduce((h,f)=>h+f.amount,0),s=W.receivables.filter(h=>h.status==="pending").reduce((h,f)=>h+f.amount,0),n=s-e,o=W.payables.filter(h=>h.status==="paid").reduce((h,f)=>h+f.amount,0),r=W.receivables.filter(h=>h.status==="paid").reduce((h,f)=>h+f.amount,0),a=r-o,l=W.previousBalance||0,c=l+a,d=h=>new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(h),p=h=>h>=0?"text-green-600":"text-red-600";t.innerHTML=`
        <div class="modal-content max-w-4xl max-h-[90vh] flex flex-col">
             <div class="flex justify-between items-center p-6 border-b">
                <h2 class="text-2xl font-bold text-gray-800">Painel de Indicadores Financeiros</h2>
                <button type="button" data-action="close-modal" data-target="genericModal" class="text-2xl font-bold text-gray-500 hover:text-gray-800">&times;</button>
            </div>
            <div class="p-6 overflow-y-auto space-y-8">
                
                <p class="text-center text-sm text-gray-500 mb-6 bg-yellow-50 p-2 rounded-md">
                    Análise do período: ${new Date(W.startDate+"T00:00:00").toLocaleDateString("pt-BR")} a ${new Date(W.endDate+"T00:00:00").toLocaleDateString("pt-BR")}.
                </p>
                
                <div class="bg-gray-50 p-4 rounded-lg shadow-inner">
                    <h3 class="text-xl font-semibold text-indigo-700 mb-4 border-b pb-2">Realizado no Período (Fechado)</h3>
                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                        <div class="bg-white p-3 rounded-lg shadow-sm border-b-4 border-green-400">
                            <p class="text-gray-500 text-sm">Total Recebido</p>
                            <p class="text-2xl font-bold text-green-600">${d(r)}</p>
                        </div>
                        <div class="bg-white p-3 rounded-lg shadow-sm border-b-4 border-red-400">
                            <p class="text-gray-500 text-sm">Total Pago</p>
                            <p class="text-2xl font-bold text-red-600">${d(o)}</p>
                        </div>
                        <div class="bg-white p-3 rounded-lg shadow-lg border-b-4 ${p(a)==="text-green-600"?"border-green-600":"border-red-600"}">
                            <p class="text-gray-700 text-sm font-medium">Saldo do Período</p>
                            <p class="text-2xl font-bold ${p(a)}">${d(a)}</p>
                        </div>
                    </div>
                </div>

                <div class="bg-gray-50 p-4 rounded-lg shadow-inner">
                    <h3 class="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">Balanço Patrimonial e Acumulado</h3>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
                        <div class="bg-white p-3 rounded-lg shadow-sm border-b-4 border-indigo-400">
                            <p class="text-gray-500 text-sm">Saldo Inicial (Realizado)</p>
                            <p class="text-2xl font-bold ${p(l)}">${d(l)}</p>
                            <p class="text-xs text-gray-400 mt-1">Acumulado antes do período</p>
                        </div>
                        <div class="bg-white p-3 rounded-lg shadow-lg border-b-4 border-blue-600">
                            <p class="text-gray-700 text-sm font-medium">Saldo Final Acumulado</p>
                            <p class="text-2xl font-bold ${p(c)}">${d(c)}</p>
                            <p class="text-xs text-gray-400 mt-1">Inicial + Saldo do Período</p>
                        </div>
                    </div>
                </div>

                <div class="bg-gray-50 p-4 rounded-lg shadow-inner">
                    <h3 class="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">Previsão (Abertos no Período)</h3>
                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                         <div class="bg-white p-3 rounded-lg shadow-sm border-b-4 border-green-400">
                            <p class="text-gray-500 text-sm">A Receber (Pendente)</p>
                            <p class="text-2xl font-bold text-green-600">${d(s)}</p>
                        </div>
                        <div class="bg-white p-3 rounded-lg shadow-sm border-b-4 border-red-400">
                            <p class="text-gray-500 text-sm">A Pagar (Pendente)</p>
                            <p class="text-2xl font-bold text-red-600">${d(e)}</p>
                        </div>
                        <div class="bg-white p-3 rounded-lg shadow-lg border-b-4 ${p(n)==="text-green-600"?"border-green-600":"border-red-600"}">
                            <p class="text-gray-700 text-sm font-medium">Saldo Previsto</p>
                            <p class="text-2xl font-bold ${p(n)}">${d(n)}</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    `,t.style.display="flex"}function o1(){const t=document.getElementById("genericModal");t.innerHTML=`
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
    `,t.style.display="flex"}function To(t,e="all"){let s='<option value="all">Todos</option>';const n=a=>{const l=new Map,c=[];return a&&(a.forEach(d=>l.set(d.id,{...d,children:[]})),l.forEach(d=>{d.parentId&&l.has(d.parentId)?l.get(d.parentId).children.push(d):c.push(d)})),c},o=(a,l=0)=>{const c=l>0?"— ".repeat(l):"",d=a.id===e?"selected":"";s+=`<option value="${a.id}" ${d}>${c}${a.name}</option>`,a.children.forEach(p=>o(p,l+1))};return n(t).forEach(a=>o(a)),s}async function ns(){const t=document.getElementById("financial-content");if(!t)return;const e=document.getElementById("filterStartDate"),s=document.getElementById("filterEndDate");if(!e||!s)return;const n=e.value,o=s.value,r=document.getElementById("filterNaturezaId")?.value,a=document.getElementById("filterCostCenterId")?.value;if(!n||!o){try{const[d,p]=await Promise.all([qn(w.establishmentId),jn(w.establishmentId)]);if(!document.getElementById("financial-content"))return;W={...W,natures:d,costCenters:p},document.getElementById("filterNaturezaId")&&(document.getElementById("filterNaturezaId").innerHTML=To(W.natures)),document.getElementById("filterCostCenterId")&&(document.getElementById("filterCostCenterId").innerHTML=To(W.costCenters))}catch(d){k("Erro",`Não foi possível carregar os dados base: ${d.message}`,"error")}ci(),Qd();return}const l=document.getElementById("payables-list"),c=document.getElementById("receivables-list");l&&(l.innerHTML='<div class="loader mx-auto"></div>'),c&&(c.innerHTML='<div class="loader mx-auto"></div>');try{const d={startDate:n,endDate:o,establishmentId:w.establishmentId};r&&r!=="all"&&(d.natureId=r),a&&a!=="all"&&(d.costCenterId=a);const[p,h,f,x]=await Promise.all([d2(d),g2(d),qn(w.establishmentId),jn(w.establishmentId)]);if(!document.getElementById("financial-content"))return;const S=(h.previousBalance||0)-(p.previousBalance||0);W={...W,payables:p.entries||[],receivables:h.entries||[],natures:f||[],costCenters:x||[],previousBalance:S,filterNaturezaId:r,filterCostCenterId:a},document.getElementById("filterNaturezaId")&&(document.getElementById("filterNaturezaId").innerHTML=To(W.natures,W.filterNaturezaId)),document.getElementById("filterCostCenterId")&&(document.getElementById("filterCostCenterId").innerHTML=To(W.costCenters,W.filterCostCenterId)),ci(),Qd()}catch(d){document.getElementById("financial-content")&&(k("Erro",`Não foi possível carregar os dados: ${d.message}`,"error"),t.innerHTML='<p class="text-red-500 text-center">Falha ao carregar dados.</p>')}}async function r1(t,e,s=null){t.preventDefault();const n=t.target,o=n.querySelector('[name="status"]').checked,r=n.querySelector('[name="paymentDate"]').value,a=parseFloat(n.querySelector('[name="amount"]').value),l=parseInt(n.querySelector('[name="installments"]')?.value,10)||1;if(isNaN(a)){k("Erro de Validação","O valor inserido é inválido.","error");return}if(o&&!r){k("Erro de Validação","Por favor, forneça a data de pagamento para um lançamento pago.","error");return}const c={description:n.querySelector('[name="description"]').value,amount:a,dueDate:n.querySelector('[name="dueDate"]').value,naturezaId:n.querySelector('[name="naturezaId"]').value||null,centroDeCustoId:n.querySelector('[name="centroDeCustoId"]').value||null,notes:n.querySelector('[name="notes"]').value,status:o?"paid":"pending",paymentDate:o?r:null,installments:s?1:l,establishmentId:w.establishmentId};try{s?(await(e==="payable"?u2(s,c):f2(s,c)),k("Sucesso","Lançamento atualizado!","success")):(await(e==="payable"?c2(c):h2(c)),k("Sucesso","Lançamento adicionado!","success")),document.getElementById("genericModal").style.display="none",await ns()}catch(d){k("Erro",`Não foi possível salvar: ${d.message}`,"error")}}async function a1(t,e){if(await re("Confirmar Exclusão","Tem certeza? Esta ação é irreversível."))try{await(t==="payable"?m2(e):b2(e)),k("Sucesso","Lançamento excluído!","success"),await ns()}catch(n){k("Erro",`Falha ao excluir: ${n.message}`,"error")}}async function i1(t,e){const s=new Date().toISOString().split("T")[0];try{await(t==="payable"?p2(e,s):v2(e,s)),k("Sucesso","Lançamento atualizado!","success"),await ns()}catch(n){k("Erro",`Falha ao atualizar status: ${n.message}`,"error")}}function Jd(t){const e=W.currentFilter;return e==="all"?t:t.filter(s=>s.status===e)}function ci(){const t=document.getElementById("payables-list"),e=document.getElementById("receivables-list");if(!t||!e)return;const s=new Map(W.natures.map(l=>[l.id,l.name])),n=new Map(W.costCenters.map(l=>[l.id,l.name])),o=Jd(W.payables),r=Jd(W.receivables),a=(l,c)=>{const d=l.status==="paid",p=JSON.stringify(l).replace(/'/g,"&apos;"),h=l.naturezaId?s.get(l.naturezaId):"N/A",f=l.centroDeCustoId?n.get(l.centroDeCustoId):"N/A";let x=c==="payable"?"text-red-600":"text-green-600";const S=d?"bg-gray-200 text-gray-600":c==="payable"?"bg-red-100 text-red-700":"bg-yellow-100 text-yellow-700",_=d?"Finalizado":"Pendente";return d&&(x="text-gray-500"),`
        <div class="bg-white p-3 rounded-lg shadow-sm border-l-4 ${d?"border-gray-300 opacity-70":c==="payable"?"border-red-400":"border-green-400"}">
            <div class="flex justify-between items-center">
                <div>
                    <p class="font-bold">${l.description}</p>
                    <p class="text-sm text-gray-500">Vence em: ${new Date(l.dueDate+"T00:00:00").toLocaleDateString("pt-BR")}</p>
                    <div class="flex flex-wrap gap-2 mt-1">
                        <span class="text-xs font-semibold bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">Natureza: ${h}</span>
                        <span class="text-xs font-semibold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">C. Custo: ${f}</span>
                    </div>
                </div>
                <div class="flex items-center gap-2 text-right">
                    <p class="font-bold text-lg ${x}">R$ ${l.amount.toFixed(2)}</p>
                    <div class="flex flex-col items-center gap-1">
                        <span class="text-xs font-semibold px-2 py-1 rounded-full ${S}">${_}</span>
                        <div class="flex">
                            ${d?"":`<button data-action="mark-as-paid" data-type="${c}" data-id="${l.id}" class="text-gray-500 hover:text-green-500 p-1" title="Marcar como pago/recebido"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></button>`}
                            <button data-action="edit" data-type="${c}" data-item='${p}' class="text-gray-400 hover:text-blue-500 p-1" title="Editar"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z"></path></svg></button>
                            <button data-action="delete" data-type="${c}" data-id="${l.id}" class="text-gray-400 hover:text-red-500 p-1" title="Apagar"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`};t.innerHTML=o.map(l=>a(l,"payable")).join("")||'<p class="text-center text-gray-500 py-4">Nenhuma conta a pagar.</p>',e.innerHTML=r.map(l=>a(l,"receivable")).join("")||'<p class="text-center text-gray-500 py-4">Nenhuma conta a receber.</p>'}function Qd(){const t=W.payables.filter(a=>a.status==="pending").reduce((a,l)=>a+l.amount,0),e=W.receivables.filter(a=>a.status==="pending").reduce((a,l)=>a+l.amount,0),s=e-t,n=document.getElementById("summary-pending-receivables");n&&(n.textContent=`R$ ${e.toFixed(2)}`);const o=document.getElementById("summary-pending-payables");o&&(o.textContent=`R$ ${t.toFixed(2)}`);const r=document.getElementById("summary-pending-balance");r&&(r.textContent=`R$ ${s.toFixed(2)}`,r.className=`text-2xl font-bold ${s>=0?"text-green-600":"text-red-600"}`)}function _a(t,e=null){document.getElementById("fab-menu")?.classList.add("hidden"),document.getElementById("main-fab-btn")?.classList.remove("rotate-45");const s=document.getElementById("genericModal"),n=`${e?"Editar":"Nova"} ${t==="payable"?"Despesa":"Receita"}`,o=t==="payable"?"bg-red-600 hover:bg-red-700":"bg-green-600 hover:bg-green-700",r=f=>{let x='<option value="">-- Selecione (Opcional) --</option>';const S=ll(f),_=(D,R="",O=0)=>{const N=O>0?"— ".repeat(O):"";x+=`<option value="${D.id}">${N}${D.name}</option>`,D.children.forEach(B=>_(B,R+"— "))};return S.forEach(D=>_(D)),x},a=r(W.natures),l=r(W.costCenters),c=e?"":`
        <div>
            <label>Número de Parcelas</label>
            <input type="number" name="installments" class="w-full p-2 border rounded-md" value="1" min="1" max="36">
        </div>
    `;if(s.innerHTML=`
        <div class="modal-content max-w-lg">
            <h2 class="text-2xl font-bold mb-6">${n}</h2>
            <form id="financial-form" class="space-y-4">
                <div><label>Descrição</label><input type="text" name="description" required class="w-full p-2 border rounded-md" value="${e?.description||""}"></div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div class="md:col-span-1"><label>Valor Total (R$)</label><input type="number" step="0.01" name="amount" required class="w-full p-2 border rounded-md" value="${e?.amount||""}"></div>
                    <div class="md:col-span-1"><label>1º Vencimento</label><input type="date" name="dueDate" required class="w-full p-2 border rounded-md" value="${e?.dueDate||""}"></div>
                    <div class="md:col-span-1">${c}</div>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div><label>Natureza</label><select name="naturezaId" class="w-full p-2 border rounded-md bg-white">${a}</select></div>
                    <div><label>Centro de Custo</label><select name="centroDeCustoId" class="w-full p-2 border rounded-md bg-white">${l}</select></div>
                </div>
                <div><label>Observações</label><textarea name="notes" class="w-full p-2 border rounded-md">${e?.notes||""}</textarea></div>
                <div class="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                    <label for="status" class="flex items-center cursor-pointer"><div class="relative"><input type="checkbox" id="status" name="status" class="sr-only"><div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full"></div></div><span class="ml-3 font-semibold text-gray-700">Marcar como Pago/Recebido</span></label>
                    <div id="payment-date-container" class="hidden"><label>Data Pgto.</label><input type="date" name="paymentDate" class="p-2 border rounded-md"></div>
                </div>
                <div class="flex gap-4 pt-4"><button type="button" data-action="close-modal" data-target="genericModal" class="w-full py-2 px-4 bg-gray-600 text-white font-semibold rounded-lg">Cancelar</button><button type="submit" class="w-full py-2 px-4 text-white font-semibold rounded-lg ${o}">Salvar</button></div>
            </form>
        </div>`,s.style.display="flex",e){const f=s.querySelector('[name="naturezaId"]');f&&(f.value=e.naturezaId||"");const x=s.querySelector('[name="centroDeCustoId"]');x&&(x.value=e.centroDeCustoId||"")}const d=s.querySelector("#status"),p=s.querySelector("#payment-date-container"),h=s.querySelector('[name="paymentDate"]');e?.status==="paid"&&(d.checked=!0,p.classList.remove("hidden"),h.value=e.paymentDate||new Date().toISOString().split("T")[0]),d.addEventListener("change",()=>{p.classList.toggle("hidden",!d.checked),h.required=d.checked}),s.querySelector("#financial-form").addEventListener("submit",f=>r1(f,t,e?.id))}async function l1(){const t=new Date,s=new Date(t.getFullYear(),t.getMonth()-1,1).toISOString().split("T")[0],n=t.toISOString().split("T")[0];W.startDate=s,W.endDate=n,W.currentFilter="pending",W.filterNaturezaId="all",W.filterCostCenterId="all",t1.innerHTML=`
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
                            <input type="date" id="filterStartDate" value="${W.startDate}" class="w-full p-1 border rounded-md text-sm">
                        </div>
                        <div class="w-full md:w-auto">
                            <label for="filterEndDate" class="text-xs font-medium">Até:</label>
                            <input type="date" id="filterEndDate" value="${W.endDate}" class="w-full p-1 border rounded-md text-sm">
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
    `;const o=document.getElementById("main-fab-btn"),r=document.getElementById("fab-menu");if(o&&r){o.addEventListener("click",_=>{_.stopPropagation(),r.classList.toggle("hidden"),o.classList.toggle("rotate-45")});const f=r.querySelector('button[data-action="open-modal"][data-type="receivable"]'),x=r.querySelector('button[data-action="open-modal"][data-type="payable"]'),S=r.querySelector('button[data-action="open-cash-flow-modal"]');f&&f.addEventListener("click",_=>{_.stopPropagation(),_a("receivable")}),x&&x.addEventListener("click",_=>{_.stopPropagation(),_a("payable")}),S&&S.addEventListener("click",_=>{_.stopPropagation(),Kd()})}Io&&document.body.removeEventListener("click",Io),So&&document.getElementById("genericModal").removeEventListener("click",So);const a=()=>{const f=document.getElementById("filterStartDate"),x=document.getElementById("filterEndDate"),S=document.getElementById("filterNaturezaId"),_=document.getElementById("filterCostCenterId");if(!f)return;W.startDate=f.value,W.endDate=x.value,W.filterNaturezaId=S.value,W.filterCostCenterId=_.value;const D=document.getElementById("advanced-filters");D&&D.classList.contains("hidden")===!1&&window.innerWidth<768&&D.classList.add("hidden"),ns()},l=f=>{const x=f.target.closest("[data-status-filter]");if(!x)return;const S=x.dataset.statusFilter;W.currentFilter=S,document.querySelectorAll("[data-status-filter]").forEach(_=>{_.classList.remove("bg-blue-100","text-blue-800"),_.classList.add("bg-gray-100","text-gray-600")}),x.classList.remove("bg-gray-100","text-gray-600"),x.classList.add("bg-blue-100","text-blue-800"),ci()},c=f=>{const x=document.getElementById("payables-container"),S=document.getElementById("receivables-container"),_=document.getElementById("btn-payables-view"),D=document.getElementById("btn-receivables-view");x&&(window.innerWidth>=1024&&W.currentListView===f||(f==="payables"?(x.classList.remove("hidden"),S.classList.add("hidden"),_&&(_.classList.remove("bg-gray-200"),_.classList.add("bg-red-100","border","border-red-500")),D&&(D.classList.remove("bg-green-100","border","border-green-500"),D.classList.add("bg-gray-200"))):(x.classList.add("hidden"),S.classList.remove("hidden"),_&&(_.classList.remove("bg-red-100","border","border-red-500"),_.classList.add("bg-gray-200")),D&&(D.classList.remove("bg-gray-200"),D.classList.add("bg-green-100","border","border-green-500"))),W.currentListView=f))};document.getElementById("applyDateFilterBtn").addEventListener("click",a),document.getElementById("filterNaturezaId").addEventListener("change",()=>{W.filterNaturezaId=document.getElementById("filterNaturezaId").value}),document.getElementById("filterCostCenterId").addEventListener("change",()=>{W.filterCostCenterId=document.getElementById("filterCostCenterId").value}),document.querySelectorAll("[data-status-filter]").forEach(f=>{f.addEventListener("click",l)}),Io=f=>{const x=f.target.closest("button[data-action]");if(!x)return;const{action:S,type:_,id:D}=x.dataset;S==="edit"?_a(_,JSON.parse(x.dataset.item.replace(/&apos;/g,"'"))):S==="delete"?a1(_,D):S==="mark-as-paid"?i1(_,D):S==="manage-natures"?Wd("nature"):S==="manage-cost-centers"?Wd("cost-center"):S==="open-cash-flow-modal"?Kd():S==="toggle-filters"?document.getElementById("advanced-filters")?.classList.toggle("hidden"):S==="open-indicators-modal"?n1():S==="open-settings-modal"?o1():S==="toggle-list-view"&&c(x.dataset.list)},So=f=>{const x=f.target.closest('button[data-action^="delete-"]');if(x){const S=x.dataset.action.split("-")[1];d(S,x.dataset.id)}},document.body.addEventListener("click",Io),document.getElementById("genericModal").addEventListener("click",So);async function d(f,x){const S=f==="nature",_=S?a2:l2,D=S?qn:jn,R=S?"natures":"costCenters",O=document.getElementById("hierarchyList");if(await re("Apagar Item","Tem a certeza? Apagar um item principal também apagará os seus sub-itens."))try{await _(x);const B=await D(w.establishmentId);W[R]=B,Dp(O,ll(B),f),await ns()}catch(B){k("Erro",`Não foi possível apagar: ${B.message}`,"error")}}const p=()=>{const f=window.innerWidth<1024,x=document.getElementById("payables-container"),S=document.getElementById("receivables-container"),_=document.getElementById("list-toggle-buttons");x&&S&&(x.classList.remove("hidden"),S.classList.remove("hidden"),f?(x.classList.remove("lg:col-span-1"),S.classList.remove("lg:col-span-1"),_?.classList.remove("hidden"),c(W.currentListView)):(x.classList.add("lg:col-span-1"),S.classList.add("lg:col-span-1"),_?.classList.add("hidden"),x.classList.remove("hidden"),S.classList.remove("hidden")))};p(),window.addEventListener("resize",p);const h=document.querySelector(`[data-status-filter="${W.currentFilter}"]`);h&&(document.querySelectorAll("[data-status-filter]").forEach(f=>{f.classList.remove("bg-blue-100","text-blue-800"),f.classList.add("bg-gray-100","text-gray-600")}),h.classList.remove("bg-gray-100","text-gray-600"),h.classList.add("bg-blue-100","text-blue-800"));try{const f=await x2(w.establishmentId),x=document.getElementById("summary-today-payables");x&&(x.textContent=`R$ ${f.totalPayables.toFixed(2)}`);const S=document.getElementById("summary-today-receivables");S&&(S.textContent=`R$ ${f.totalReceivables.toFixed(2)}`)}catch{}await ns()}const c1=t=>F("/api/commissions/calculate",{method:"POST",body:JSON.stringify(t)}),d1=t=>F("/api/commissions/save",{method:"POST",body:JSON.stringify(t)}),u1=(t,e)=>{const s=new URLSearchParams({startDate:t,endDate:e}).toString();return F(`/api/commissions/stats?${s}`)},m1=(t={})=>{Object.keys(t).forEach(n=>(t[n]===void 0||t[n]===null||t[n]==="")&&delete t[n]);const e=new URLSearchParams(t).toString(),s=`/api/commissions/history${e?"?"+e:""}`;return F(s)},p1=t=>F(`/api/commissions/report/${t}`,{method:"DELETE"}),rr=new Date,Xd=new Date(rr.getFullYear(),rr.getMonth(),1),J={currentTab:"dashboard",professionals:[],calculationResult:null,historyData:[],periodString:"",dashStartDate:Xd.toISOString().split("T")[0],dashEndDate:rr.toISOString().split("T")[0],dashStats:{revenue:0,commissions:0},histStartDate:Xd.toISOString().split("T")[0],histEndDate:rr.toISOString().split("T")[0],histProfessionalId:"all"};let ko=null;const vn=document.getElementById("content");async function h1(){try{J.professionals=await ze(w.establishmentId)}catch(t){console.error("Erro profissionais",t)}T1(),g1(),Mr(),ir("dashboard")}function g1(){ko&&vn.removeEventListener("click",ko),ko=t=>{const e=t.target.closest("button");if(!e)return;const s=e.dataset.action,n=e.dataset.id,o=e.dataset.idx;switch(s){case"tab-nav":ir(e.dataset.tab);break;case"toggle-all-profs":f1();break;case"back-to-filters":J.calculationResult=null,ar(document.getElementById("commissions-content"));break;case"view-preview-items":S1(o);break;case"save-final-report":v1();break;case"start-new-calc":ir("calculator");break;case"print-receipt":y1(n);break;case"delete-report":x1(n);break;case"filter-dashboard":Mr();break;case"filter-history":cl();break}},vn.addEventListener("click",ko),vn.oninput=t=>{if(t.target.classList.contains("input-debit")||t.target.classList.contains("input-credit")){const e=t.target.dataset.idx;E1(e)}},vn.onsubmit=t=>{t.target.id==="calc-form"&&(t.preventDefault(),b1())}}async function Mr(){const t=document.getElementById("dash-start"),e=document.getElementById("dash-end");t&&(J.dashStartDate=t.value),e&&(J.dashEndDate=e.value);const s=document.getElementById("dashboard-stats-container");s&&(s.innerHTML='<div class="flex justify-center py-10"><div class="loader"></div></div>');try{const n=await u1(J.dashStartDate,J.dashEndDate);J.dashStats={revenue:n.totalRevenue||0,commissions:n.totalCommissionsPaid||0},J.currentTab==="dashboard"&&Lp(document.getElementById("commissions-content"))}catch(n){console.error(n),s&&(s.innerHTML='<p class="text-red-500 text-center">Erro ao carregar dados.</p>')}}async function cl(){const t=document.getElementById("hist-start"),e=document.getElementById("hist-end"),s=document.getElementById("hist-prof");t&&(J.histStartDate=t.value),e&&(J.histEndDate=e.value),s&&(J.histProfessionalId=s.value);const n=document.getElementById("history-list-container");if(n){n.innerHTML='<div class="flex justify-center py-10"><div class="loader"></div></div>';try{const o=await m1({startDate:J.histStartDate,endDate:J.histEndDate,professionalId:J.histProfessionalId});J.historyData=o,Rp(n,o)}catch{n.innerHTML='<p class="text-red-500 text-center py-4">Erro ao buscar registros.</p>'}}}function f1(){const t=document.querySelectorAll(".prof-checkbox"),e=Array.from(t).every(s=>s.checked);t.forEach(s=>s.checked=!e)}async function b1(){const t=Array.from(document.querySelectorAll(".prof-checkbox:checked")).map(r=>r.value);if(t.length===0)return k("Atenção","Selecione profissionais","error");const e={professionalIds:t,startDate:document.getElementById("start-date").value,endDate:document.getElementById("end-date").value,calculationTypes:{services:document.getElementById("type-services").checked,products:document.getElementById("type-products").checked,packages:document.getElementById("type-packages").checked}},s=new Date(e.startDate+"T00:00:00").toLocaleDateString("pt-BR"),n=new Date(e.endDate+"T00:00:00").toLocaleDateString("pt-BR");J.periodString=`${s} a ${n}`;const o=document.getElementById("commissions-content");o.innerHTML='<div class="flex flex-col items-center justify-center py-20"><div class="loader mb-4"></div><p class="text-gray-500 animate-pulse">Calculando...</p></div>';try{const r=await c1(e);J.calculationResult=r.map(a=>({...a,extraDebit:0,extraCredit:0,finalValue:a.summary.totalCommission,notes:""})),ar(o)}catch(r){k("Erro",r.message,"error"),J.calculationResult=null,ar(o)}}async function v1(){const t=J.calculationResult.length;if(await re("Confirmar",`Gerar ${t} relatórios? Isso marcará as vendas como pagas.`))try{const s=J.calculationResult.map(n=>{const o=n.items.map(r=>r.originalSaleId).filter(r=>r!=null);return d1({professionalId:n.professionalId,professionalName:n.professionalName,period:J.periodString,processedSalesIds:o,reportData:{...n,summary:{...n.summary,finalValue:n.finalValue,extraDebit:n.extraDebit||0,extraCredit:n.extraCredit||0,notes:n.notes||""}}})});await Promise.all(s),k("Sucesso","Pagamentos registrados!","success"),J.calculationResult=null,Mr(),ir("history")}catch(s){k("Erro",s.message,"error")}}function y1(t){const e=J.historyData.find(s=>s.id===t);e&&w1(e)}async function x1(t){if(await re("Excluir","Deseja remover este registro? As vendas voltarão a ficar disponíveis para cálculo."))try{await p1(t),k("Sucesso","Registro removido.","success"),cl(),Mr()}catch(s){k("Erro",s.message,"error")}}function w1(t){const{jsPDF:e}=window.jspdf;if(!e)return k("Erro","PDF lib não carregada.","error");const s=new e,n=s.internal.pageSize.getWidth()/2;s.setFontSize(18),s.setFont(void 0,"bold"),s.text("RECIBO DE PAGAMENTO DE COMISSÃO",n,20,{align:"center"}),s.setFontSize(12),s.setFont(void 0,"normal"),s.text(`Profissional: ${t.professionalName}`,15,40),s.text(`Período: ${t.period}`,15,48);const o=[["Comissão Bruta",`R$ ${t.summary.totalCommission.toFixed(2)}`]];t.summary.extraCredit>0&&o.push(["(+) Bônus",`R$ ${t.summary.extraCredit.toFixed(2)}`]),t.summary.extraDebit>0&&o.push(["(-) Descontos",`R$ ${t.summary.extraDebit.toFixed(2)}`]),s.autoTable({startY:60,head:[["Descrição","Valor"]],body:o,theme:"grid"});const r=s.lastAutoTable.finalY+10;s.setFontSize(14),s.setFont(void 0,"bold"),s.text(`Total Líquido: R$ ${(t.summary.finalValue||t.summary.totalCommission).toFixed(2)}`,190,r,{align:"right"}),s.save(`Recibo_${t.professionalName}.pdf`)}function E1(t){const e=document.querySelectorAll(`.input-debit[data-idx="${t}"]`),s=document.querySelectorAll(`.input-credit[data-idx="${t}"]`);let n=0,o=0;if(e.forEach(r=>{r.value&&(n=parseFloat(r.value))}),s.forEach(r=>{r.value&&(o=parseFloat(r.value))}),J.calculationResult&&J.calculationResult[t]){const r=J.calculationResult[t];r.extraDebit=n,r.extraCredit=o,r.finalValue=r.summary.totalCommission-n+o,e.forEach(l=>{l!==document.activeElement&&(l.value=n||"")}),s.forEach(l=>{l!==document.activeElement&&(l.value=o||"")}),document.querySelectorAll(`.final-value-display[data-idx="${t}"]`).forEach(l=>l.innerText=`R$ ${r.finalValue.toFixed(2)}`),I1()}}function I1(){const t=J.calculationResult.reduce((s,n)=>s+n.finalValue,0);document.querySelectorAll("#grand-total-display").forEach(s=>s.innerText=`R$ ${t.toFixed(2)}`)}function S1(t){const e=J.calculationResult[t];if(!e)return;const s=e.items.map(n=>`
        <div class="flex justify-between items-center p-3 border-b border-gray-100 last:border-0 hover:bg-gray-50">
            <div class="flex-1">
                <p class="text-sm font-bold text-gray-800">${n.item}</p>
                <p class="text-xs text-gray-500">${new Date(n.date).toLocaleDateString("pt-BR")} • ${n.client}</p>
            </div>
            <div class="text-right">
                <p class="text-sm font-bold text-green-600">R$ ${n.commissionValue.toFixed(2)}</p>
                <p class="text-xs text-gray-400">${n.commissionRate}% de R$ ${n.value.toFixed(2)}</p>
            </div>
        </div>
    `).join("");Pe({title:"Detalhes da Comissão",contentHTML:`<div class="bg-gray-50 p-3 rounded-lg mb-4 flex justify-between items-center"><div><p class="text-xs text-gray-500">Profissional</p><p class="font-bold text-gray-800">${e.professionalName}</p></div><div class="text-right"><p class="text-xs text-gray-500">Total Itens</p><p class="font-bold text-gray-800">${e.items.length}</p></div></div><div class="border rounded-lg overflow-hidden max-h-[60vh] overflow-y-auto">${s}</div>`,maxWidth:"max-w-md"})}function ar(t){if(J.calculationResult){const e=J.calculationResult,s=e.reduce((r,a)=>r+a.finalValue,0),n=e.map((r,a)=>`
            <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-4">
                <div class="flex justify-between items-start mb-3 border-b border-gray-100 pb-2">
                    <div><h4 class="font-bold text-gray-900 text-lg">${r.professionalName}</h4><p class="text-xs text-gray-500">${r.summary.totalItems} itens</p></div>
                    <div class="text-right"><p class="text-xs text-gray-500">Bruto</p><p class="font-bold text-gray-700">R$ ${r.summary.totalCommission.toFixed(2)}</p></div>
                </div>
                <div class="grid grid-cols-2 gap-3 mb-3">
                    <div><label class="text-xs font-bold text-red-500 uppercase">Desc.</label><input type="number" step="0.01" data-idx="${a}" class="input-debit w-full mt-1 p-2 border border-red-200 rounded-lg bg-red-50 font-bold text-red-700" value="${r.extraDebit||""}"></div>
                    <div><label class="text-xs font-bold text-green-500 uppercase">Bônus</label><input type="number" step="0.01" data-idx="${a}" class="input-credit w-full mt-1 p-2 border border-green-200 rounded-lg bg-green-50 font-bold text-green-700" value="${r.extraCredit||""}"></div>
                </div>
                <div class="flex justify-between items-center bg-gray-50 p-3 rounded-lg"><span class="text-sm font-medium">Líquido</span><span class="text-xl font-bold text-indigo-700 final-value-display" data-idx="${a}">R$ ${r.finalValue.toFixed(2)}</span></div>
                <button data-action="view-preview-items" data-idx="${a}" class="w-full mt-3 py-2 text-indigo-600 font-medium text-sm border border-indigo-100 rounded-lg">Ver Detalhes</button>
            </div>`).join(""),o=e.map((r,a)=>`
            <tr class="hover:bg-gray-50"><td class="px-6 py-4 font-bold text-gray-900">${r.professionalName}</td><td class="px-6 py-4 text-right">R$ ${r.summary.totalCommission.toFixed(2)}</td>
            <td class="px-6 py-4 text-right"><input type="number" step="0.01" data-idx="${a}" class="input-debit w-24 text-right border-gray-300 rounded bg-red-50 text-red-700" value="${r.extraDebit||""}"></td>
            <td class="px-6 py-4 text-right"><input type="number" step="0.01" data-idx="${a}" class="input-credit w-24 text-right border-gray-300 rounded bg-green-50 text-green-700" value="${r.extraCredit||""}"></td>
            <td class="px-6 py-4 text-right font-bold text-indigo-700 final-value-display" data-idx="${a}">R$ ${r.finalValue.toFixed(2)}</td>
            <td class="px-6 py-4 text-center"><button data-action="view-preview-items" data-idx="${a}" class="text-indigo-600 hover:underline text-sm">Ver Itens</button></td></tr>`).join("");t.innerHTML=`
            <div class="space-y-4 animate-fade-in pb-20">
                <div class="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-200 sticky top-0 z-10 flex justify-between items-center">
                    <div><button data-action="back-to-filters" class="text-sm text-gray-500 hover:text-indigo-600">← Voltar</button><h2 class="text-lg md:text-2xl font-bold text-gray-800">Prévia</h2></div>
                    <div class="text-right"><p class="text-xs uppercase font-bold text-gray-500">Total a Pagar</p><p id="grand-total-display" class="text-2xl md:text-3xl font-extrabold text-green-600">R$ ${s.toFixed(2)}</p></div>
                </div>
                <div class="block md:hidden space-y-4">${n}</div>
                <div class="hidden md:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"><table class="min-w-full divide-y divide-gray-200"><thead class="bg-gray-50"><tr><th class="px-6 py-3 text-left text-xs font-bold uppercase">Profissional</th><th class="px-6 py-3 text-right text-xs font-bold uppercase">Bruto</th><th class="px-6 py-3 text-right text-xs font-bold uppercase">(-) Desc.</th><th class="px-6 py-3 text-right text-xs font-bold uppercase">(+) Bônus</th><th class="px-6 py-3 text-right text-xs font-bold uppercase">Líquido</th><th class="px-6 py-3 text-center text-xs font-bold uppercase">Ações</th></tr></thead><tbody>${o}</tbody></table></div>
                <div class="fixed bottom-0 left-0 w-full bg-white p-4 border-t border-gray-200 shadow-lg md:static md:bg-transparent md:border-0 md:shadow-none z-30 flex justify-end gap-3">
                    <button data-action="back-to-filters" class="hidden md:block px-6 py-3 border border-gray-300 rounded-xl text-gray-700 font-bold">Cancelar</button>
                    <button data-action="save-final-report" class="w-full md:w-auto px-6 py-4 md:py-3 bg-green-600 text-white rounded-xl font-bold shadow-md hover:bg-green-700 transition">Finalizar Apuração</button>
                </div>
            </div>`}else{const e=new Date().toISOString().split("T")[0],s=new Date(new Date().getFullYear(),new Date().getMonth(),1).toISOString().split("T")[0],n=J.professionals.map(o=>`
            <label class="flex items-center p-3 bg-white border border-gray-200 rounded-lg shadow-sm active:bg-indigo-50 transition cursor-pointer">
                <input type="checkbox" value="${o.id}" class="prof-checkbox w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500">
                <span class="ml-3 font-medium text-gray-700">${o.name}</span>
            </label>`).join("");t.innerHTML=`
            <form id="calc-form" class="space-y-6 max-w-3xl mx-auto animate-fade-in">
                <div class="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                    <h3 class="font-bold text-gray-800 mb-4">Novo Cálculo</h3>
                    <div class="grid grid-cols-2 gap-4">
                        <div><label class="text-xs font-bold text-gray-500 uppercase">Início</label><input type="date" id="start-date" value="${s}" class="w-full mt-1 rounded-lg border-gray-300"></div>
                        <div><label class="text-xs font-bold text-gray-500 uppercase">Fim</label><input type="date" id="end-date" value="${e}" class="w-full mt-1 rounded-lg border-gray-300"></div>
                    </div>
                </div>
                <div class="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                    <div class="flex justify-between items-center mb-4"><h3 class="font-bold text-gray-800">Profissionais</h3><button type="button" data-action="toggle-all-profs" class="text-sm text-indigo-600 font-medium">Selecionar Todos</button></div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-60 overflow-y-auto">${n}</div>
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
            </form>`}}function T1(){vn.innerHTML=`
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
    `}function ir(t){J.currentTab=t,["dashboard","calculator","history"].forEach(s=>{const n=document.getElementById(`tab-${s}`);s===t?n.className="flex-1 md:flex-none px-4 py-2 rounded-md text-sm font-bold bg-white text-indigo-600 shadow-sm border border-gray-100":n.className="flex-1 md:flex-none px-4 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700"});const e=document.getElementById("commissions-content");t==="dashboard"&&Lp(e),t==="calculator"&&ar(e),t==="history"&&k1(e)}function Lp(t){const{revenue:e,commissions:s}=J.dashStats,n=e>0?(s/e*100).toFixed(1):0;t.innerHTML=`
        <div class="space-y-6 animate-fade-in">
            <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row gap-4 items-end">
                <div class="flex-1 w-full">
                    <label class="text-xs font-bold text-gray-500 uppercase">Data Inicial</label>
                    <input type="date" id="dash-start" value="${J.dashStartDate}" class="w-full mt-1 rounded-lg border-gray-300">
                </div>
                <div class="flex-1 w-full">
                    <label class="text-xs font-bold text-gray-500 uppercase">Data Final</label>
                    <input type="date" id="dash-end" value="${J.dashEndDate}" class="w-full mt-1 rounded-lg border-gray-300">
                </div>
                <button data-action="filter-dashboard" class="w-full md:w-auto bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-indigo-700 transition h-[42px]">
                    Filtrar
                </button>
            </div>

            <div id="dashboard-stats-container">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="bg-white p-6 rounded-xl shadow-sm border border-l-4 border-l-blue-500 border-gray-100">
                        <p class="text-sm text-gray-500 font-bold uppercase">Faturamento (Vendas)</p>
                        <p class="text-2xl font-extrabold text-gray-800 mt-2">R$ ${e.toFixed(2)}</p>
                        <p class="text-xs text-gray-400 mt-1">Total vendido no período</p>
                    </div>
                    <div class="bg-white p-6 rounded-xl shadow-sm border border-l-4 border-l-green-500 border-gray-100">
                        <p class="text-sm text-gray-500 font-bold uppercase">Comissões Pagas</p>
                        <p class="text-2xl font-extrabold text-gray-800 mt-2">R$ ${s.toFixed(2)}</p>
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
                                    ${n}%
                                </span>
                            </div>
                        </div>
                        <div class="overflow-hidden h-4 mb-4 text-xs flex rounded bg-indigo-100">
                            <div style="width:${Math.min(n,100)}%" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500 transition-all duration-500"></div>
                        </div>
                        <p class="text-sm text-gray-500">
                            De cada R$ 100,00 vendidos, <strong>R$ ${n}</strong> foram pagos em comissões neste período.
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
    `}function k1(t){const e=J.professionals.map(s=>`<option value="${s.id}" ${J.histProfessionalId===s.id?"selected":""}>${s.name}</option>`).join("");t.innerHTML=`
        <div class="space-y-6">
            <div class="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                <h2 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    Pesquisar Pagamentos
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <div>
                        <label class="text-xs font-bold text-gray-500 uppercase">De (Data Pagto)</label>
                        <input type="date" id="hist-start" value="${J.histStartDate}" class="w-full mt-1 rounded-lg border-gray-300">
                    </div>
                    <div>
                        <label class="text-xs font-bold text-gray-500 uppercase">Até</label>
                        <input type="date" id="hist-end" value="${J.histEndDate}" class="w-full mt-1 rounded-lg border-gray-300">
                    </div>
                    <div>
                        <label class="text-xs font-bold text-gray-500 uppercase">Profissional</label>
                        <select id="hist-prof" class="w-full mt-1 rounded-lg border-gray-300">
                            <option value="all">Todos</option>
                            ${e}
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
    `,J.historyData.length>0?Rp(document.getElementById("history-list-container"),J.historyData):cl()}function Rp(t,e){if(e.length===0){t.innerHTML=`
            <div class="text-center py-16 bg-white rounded-xl border border-dashed border-gray-300">
                <h3 class="mt-2 text-sm font-medium text-gray-900">Nenhum registro encontrado</h3>
                <p class="mt-1 text-sm text-gray-500">Tente ajustar os filtros de data.</p>
            </div>`;return}const s=e.map(o=>`
        <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-3 animate-fade-in">
            <div class="flex justify-between items-start mb-2">
                <div>
                    <p class="text-xs text-gray-400 uppercase">Pago em: ${new Date(o.createdAt).toLocaleDateString("pt-BR")}</p>
                    <h4 class="font-bold text-gray-800 text-lg">${o.professionalName}</h4>
                </div>
                <span class="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">Pago</span>
            </div>
            <div class="flex justify-between items-end mb-4">
                <p class="text-sm text-gray-500">Ref: ${o.period}</p>
                <p class="text-xl font-bold text-gray-900">R$ ${(o.summary.finalValue||o.summary.totalCommission).toFixed(2)}</p>
            </div>
            <div class="grid grid-cols-2 gap-2">
                <button data-action="print-receipt" data-id="${o.id}" class="flex items-center justify-center py-2 bg-indigo-50 text-indigo-600 rounded-lg font-bold text-sm hover:bg-indigo-100">
                    📄 Recibo
                </button>
                <button data-action="delete-report" data-id="${o.id}" class="flex items-center justify-center py-2 bg-red-50 text-red-600 rounded-lg font-bold text-sm hover:bg-red-100">
                    🗑️ Excluir
                </button>
            </div>
        </div>
    `).join(""),n=e.map(o=>`
        <tr class="hover:bg-gray-50 border-b border-gray-100">
            <td class="px-6 py-4 text-sm text-gray-500">${new Date(o.createdAt).toLocaleDateString("pt-BR")}</td>
            <td class="px-6 py-4 font-bold text-gray-900">${o.professionalName}</td>
            <td class="px-6 py-4 text-sm text-gray-500">${o.period}</td>
            <td class="px-6 py-4 text-right font-bold text-green-600">R$ ${(o.summary.finalValue||o.summary.totalCommission).toFixed(2)}</td>
            <td class="px-6 py-4 text-right space-x-2">
                <button data-action="print-receipt" data-id="${o.id}" class="text-indigo-600 hover:bg-indigo-50 px-3 py-1 rounded">Recibo</button>
                <button data-action="delete-report" data-id="${o.id}" class="text-red-600 hover:bg-red-50 px-3 py-1 rounded">Excluir</button>
            </td>
        </tr>
    `).join("");t.innerHTML=`
        <div class="block md:hidden pb-20">${s}</div>
        <div class="hidden md:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <table class="min-w-full text-left">
                <thead class="bg-gray-50 text-gray-500 uppercase text-xs">
                    <tr><th class="px-6 py-3">Data Pagto</th><th class="px-6 py-3">Profissional</th><th class="px-6 py-3">Ref. Período</th><th class="px-6 py-3 text-right">Valor Pago</th><th class="px-6 py-3 text-right">Ações</th></tr>
                </thead>
                <tbody>${n}</tbody>
            </table>
        </div>
    `}const Aa=document.getElementById("content");let os={allPackages:[],catalogForModal:{services:[],products:[]}},Co=null,Cs=null;function C1(t=6){let e="";for(let s=0;s<t;s++)e+=`
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
        `;return e}function _1(){const t=document.getElementById("packagesListContainer");if(t){if(os.allPackages.length===0){t.innerHTML=`
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
            </div>`;return}t.innerHTML=os.allPackages.map(e=>{const s=e.status==="active",n=JSON.stringify(e).replace(/'/g,"&apos;"),o=e.price||0,r=e.originalPrice||0,a=r>o?r-o:0,l=r>0?(r-o)/r*100:0,c=P(e.name),d=P(e.description||"Sem descrição");return`
            <div class="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 flex flex-col cursor-pointer"
                 data-action="edit-package" data-package='${n}'>
                
                <div class="p-4 flex-grow">
                    <div class="flex justify-between items-start">
                        <div class="min-w-0 pr-2">
                            <h3 class="text-base font-bold text-gray-900 truncate">${c}</h3>
                            <p class="text-xs text-gray-500 truncate">${d}</p>
                        </div>
                        <span class="text-xs font-semibold py-0.5 px-2 rounded-full flex-shrink-0 ${s?"bg-green-100 text-green-700":"bg-gray-100 text-gray-700"}">
                            ${s?"Ativo":"Inativo"}
                        </span>
                    </div>

                    <div class="mt-3 pt-3 border-t flex justify-between items-end">
                        <div>
                            <p class="text-2xl font-extrabold text-indigo-600">R$ ${o.toFixed(2)}</p>
                            ${a>0?`<p class="text-xs text-gray-500 line-through">De R$ ${r.toFixed(2)}</p>
                                 <span class="text-xs font-semibold text-red-600 bg-red-100 px-1.5 rounded">${l.toFixed(0)}% OFF</span>`:'<p class="text-xs text-gray-500 line-through">Valor integral</p>'}
                        </div>
                        
                        <div class="text-right flex flex-col items-end">
                            <p class="text-sm font-semibold text-gray-800">${(e.items||[]).length} Itens</p> 
                            <p class="text-xs text-gray-500">${e.commissionRate||0}% Comissão</p>
                            <p class="text-xs text-gray-500 mt-1">${e.validityDays||"-"} Dias Validade</p>
                        </div>
                    </div>
                </div>
                
                <div class="bg-gray-50 px-4 py-2 flex justify-end items-center gap-2 border-t">
                    <button data-action="delete-package" data-id="${e.id}" data-action-stop-propagation="true" class="text-sm font-semibold text-red-600 hover:text-red-800 py-1 px-2">Excluir</button>
                </div>
            </div>
        `}).join("")}}function Yd(){const t=document.getElementById("genericModal");t.style.display="none",Cs&&t.removeEventListener("click",Cs)}async function Zd(t=null){const e=document.getElementById("genericModal"),s=!!t,n=t?JSON.parse(JSON.stringify(t.items||[])):[],o=P(t?.name||""),r=P(t?.description||""),a=t?.price||"",l=t?.commissionRate||0,c=t?.validityDays||30,d=`
        <div class="modal-content max-w-4xl overflow-y-auto max-h-[90vh]">
            <form id="package-form" class="flex flex-col h-full">
                <div class="p-4 sm:p-6 border-b flex justify-between items-center">
                    <h2 class="text-2xl font-bold text-gray-800">${s?"Editar Pacote":"Criar Novo Pacote"}</h2>
                    <button type="button" data-action="close-modal" class="text-gray-500 hover:text-gray-800 text-3xl">&times;</button>
                </div>
                <div class="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
                    <input type="hidden" id="packageId" value="${t?.id||""}">
                    
                    <div>
                        <h3 class="text-lg font-semibold text-gray-800 mb-2">Informações Básicas</h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label for="packageName" class="block text-sm font-medium text-gray-700">Nome do Pacote</label>
                                <input type="text" id="packageName" value="${o}" class="mt-1 w-full p-2 border rounded-md" required>
                            </div>
                            <div>
                                <label for="packageStatus" class="block text-sm font-medium text-gray-700">Status</label>
                                <select id="packageStatus" class="mt-1 w-full p-2 border rounded-md bg-white">
                                    <option value="active" ${t?.status!=="inactive"?"selected":""}>Ativo</option>
                                    <option value="inactive" ${t?.status==="inactive"?"selected":""}>Inativo</option>
                                </select>
                            </div>
                        </div>
                        <div class="mt-4">
                            <label for="packageDescription" class="block text-sm font-medium text-gray-700">Descrição (Opcional)</label>
                            <textarea id="packageDescription" rows="2" class="mt-1 w-full p-2 border rounded-md">${r}</textarea>
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
                                <input type="number" step="0.01" id="finalPrice" value="${a}" class="mt-1 w-full p-2 border rounded-md" required>
                            </div>
                            <div>
                                <label for="commissionRate" class="block text-sm font-medium text-gray-700">Comissão (%)</label>
                                <input type="number" id="commissionRate" value="${l}" class="mt-1 w-full p-2 border rounded-md" placeholder="Ex: 10">
                            </div>
                            <div>
                                <label for="validityDays" class="block text-sm font-medium text-gray-700">Validade (dias)</label>
                                <input type="number" id="validityDays" value="${c}" class="mt-1 w-full p-2 border rounded-md" placeholder="Ex: 30, 60, 90">
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
    `;e.innerHTML=d,e.style.display="flex";const p=e.querySelector("#package-items-list"),h=(x,S)=>{const _=S.querySelector("#originalPrice"),D=x.reduce((R,O)=>R+O.price*O.quantity,0);_&&(_.textContent=`R$ ${D.toFixed(2)}`)},f=x=>{x.length===0?p.innerHTML='<p class="text-center text-gray-500 p-4">Nenhum item adicionado.</p>':p.innerHTML=x.map((S,_)=>{const D=S.type==="service",R=D?"Serviço":"Produto",O=D?"bg-indigo-100 text-indigo-800":"bg-green-100 text-green-800";return`
                <div class="flex items-center justify-between bg-white p-2 rounded shadow-sm border border-gray-200">
                    <div class="flex items-center gap-3 min-w-0">
                        <input type="number" value="${S.quantity}" min="1" class="w-12 p-1 border rounded-md text-sm quantity-input flex-shrink-0" data-index="${_}">
                        <span class="text-xs font-medium px-2 py-0.5 rounded-full ${O}">${R}</span>
                        <span class="font-medium text-gray-800 truncate">${P(S.name)}</span>
                    </div>
                    <div class="flex items-center gap-2 flex-shrink-0">
                        <span class="text-sm text-gray-600">R$ ${S.price.toFixed(2)}</span>
                        <button type="button" class="text-red-500 hover:text-red-700 remove-item-btn font-bold" data-index="${_}">&times;</button>
                    </div>
                </div>
            `}).join(""),h(x,e)};f(n),p.addEventListener("change",x=>{if(x.target.classList.contains("quantity-input")){const S=parseInt(x.target.dataset.index,10),_=parseInt(x.target.value,10);_>0&&n[S]&&(n[S].quantity=_,f(n))}}),p.addEventListener("click",x=>{if(x.target.classList.contains("remove-item-btn")){const S=parseInt(x.target.dataset.index,10);n.splice(S,1),f(n)}}),e.querySelector("#add-item-to-package-btn").onclick=()=>A1(x=>{const S=n.find(_=>_.id===x.id&&_.type===x.type);S?S.quantity++:n.push({...x,quantity:1}),f(n)}),Cs&&e.removeEventListener("click",Cs),Cs=async x=>{const S=x.target.closest("button[data-action]");if(!S)return;const _=S.dataset.action;if(x.stopPropagation(),_==="close-modal"&&Yd(),_==="save-package"){const D=S,R={id:document.getElementById("packageId").value||null,name:document.getElementById("packageName").value,description:document.getElementById("packageDescription").value,status:document.getElementById("packageStatus").value,items:n,originalPrice:n.reduce((O,N)=>O+N.price*N.quantity,0),price:parseFloat(document.getElementById("finalPrice").value),commissionRate:parseFloat(document.getElementById("commissionRate").value)||0,validityDays:parseInt(document.getElementById("validityDays").value,10)||null,establishmentId:w.establishmentId};if(!R.name||!R.price){k("Erro","Nome do Pacote e Preço Final são obrigatórios.","error");return}if(R.items.length===0){k("Erro","Adicione pelo menos um item ao pacote.","error");return}D.disabled=!0,D.textContent="A salvar...";try{s?await Mx(R.id,R):(delete R.id,await Rx(R)),k("Sucesso!",`Pacote ${s?"atualizado":"criado"} com sucesso.`,"success"),Yd(),await dl()}catch(O){k("Erro",`Não foi possível salvar o pacote: ${O.message}`,"error"),D.disabled=!1,D.textContent="Salvar Pacote"}}},e.addEventListener("click",Cs)}function A1(t){let e="";const s=document.createElement("div");s.id="item-selection-modal",s.className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[110]";const n={service:'<svg class="w-6 h-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v4.512a9.04 9.04 0 00-3 5.012M12 12a9.04 9.04 0 01-3-5.012V5l-1-1z" /></svg>',product:'<svg class="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>'},o=c=>{const d=e.toLowerCase(),p=os.catalogForModal.services.filter(S=>S.name.toLowerCase().includes(d)),h=os.catalogForModal.products.filter(S=>S.name.toLowerCase().includes(d)),f=p.map(S=>`
            <button data-action="select-item" data-item-type="service" data-item-id="${S.id}" class="flex items-center gap-3 w-full p-3 bg-white border rounded-lg hover:bg-gray-50 transition">
                <div class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gray-100">${n.service}</div>
                <span class="flex-grow text-left min-w-0 truncate">${P(S.name)}</span>
                <span class="font-semibold flex-shrink-0">R$ ${S.price.toFixed(2)}</span>
            </button>
        `).join("")||'<p class="text-xs text-gray-400 text-center p-4">Nenhum serviço encontrado.</p>',x=h.map(S=>`
            <button data-action="select-item" data-item-type="product" data-item-id="${S.id}" class="flex items-center gap-3 w-full p-3 bg-white border rounded-lg hover:bg-gray-50 transition">
                <div class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gray-100">${n.product}</div>
                <span class="flex-grow text-left min-w-0 truncate">${P(S.name)}</span>
                <span class="font-semibold flex-shrink-0">R$ ${S.price.toFixed(2)}</span>
            </button>
        `).join("")||'<p class="text-xs text-gray-400 text-center p-4">Nenhum produto encontrado.</p>';c.innerHTML=`
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><h4 class="font-semibold mb-2 text-center text-indigo-600">Serviços</h4><div id="modal-service-list" class="space-y-2 max-h-96 overflow-y-auto">${f}</div></div>
                <div><h4 class="font-semibold mb-2 text-center text-green-600">Produtos</h4><div id="modal-product-list" class="space-y-2 max-h-96 overflow-y-auto">${x}</div></div>
            </div>
        `};s.innerHTML=`
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
    `,document.body.appendChild(s);const r=s.querySelector("#item-selection-list"),a=s.querySelector("#item-search-input"),l=()=>{s.remove()};o(r),a.addEventListener("input",()=>{e=a.value,o(r)}),s.addEventListener("click",c=>{const d=c.target.closest('[data-action="select-item"]'),p=c.target.closest('[data-action="close-selection-modal"]');if(d){const{itemType:h,itemId:f}=d.dataset,S=(os.catalogForModal[h+"s"]||[]).find(_=>_.id===f);S&&(t({...S,type:h}),l())}else(p||c.target===s)&&l()})}async function dl(){Aa.innerHTML=`
        <section id="packages-page" class="p-4 sm:p-6">
             <div class="sticky top-0 z-10 bg-gray-100 sm:bg-transparent pt-3 pb-4 mb-6 -mx-4 -mt-4 sm:mx-0 sm:mt-0 sm:bg-transparent sm:pt-0 sm:pb-0 sm:static">
                <div class="flex justify-between items-center px-4 sm:px-0">
                    <h2 class="text-2xl sm:text-3xl font-bold text-gray-800">Pacotes de Serviços</h2>
                </div>
            </div>
            
            <div id="packagesListContainer" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pb-20">
                ${C1()}
            </div>
            
            <button data-action="new-package" class="fixed z-30 bottom-20 right-4 sm:bottom-6 sm:right-6 w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-transform hover:scale-105">
                <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
            </button>
        </section>
    `,Co&&Aa.removeEventListener("click",Co),Co=t=>{if(t.target.closest('[data-action-stop-propagation="true"]')){t.stopPropagation();const n=t.target.closest('[data-action="delete-package"]');if(n){const o=n.dataset.id;re("Excluir Pacote","Tem a certeza que deseja excluir este pacote? Esta ação é irreversível.").then(async r=>{if(r)try{await Nx(o),k("Sucesso!","Pacote excluído.","success"),await dl()}catch(a){k("Erro",`Não foi possível excluir: ${a.message}`,"error")}})}return}const e=t.target.closest('[data-action="new-package"], [data-action="edit-package"]');if(!e)return;const s=e.dataset.action;if(s==="new-package")Zd(null);else if(s==="edit-package"){const n=JSON.parse(e.dataset.package);Zd(n)}},Aa.addEventListener("click",Co);try{const[t,e,s]=await Promise.all([pp(w.establishmentId),ps(w.establishmentId),ur(w.establishmentId)]);os.allPackages=t,os.catalogForModal={services:e.filter(n=>n.active),products:s},_1()}catch{document.getElementById("packagesListContainer").innerHTML='<p class="text-red-500 col-span-full">Erro ao carregar pacotes.</p>'}}const P1=document.getElementById("content");let $1=null;async function D1(){const t=P(w.userName||"Usuário"),e=P(_e.currentUser?.email||"E-mail não disponível"),s=w.userName?w.userName.charAt(0):"U";P1.innerHTML=`
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
                             src="https://placehold.co/128x128/E2E8F0/4A5568?text=${encodeURIComponent(s)}" 
                             alt="Avatar do Usuário" 
                             class="w-32 h-32 rounded-full object-cover border-4 border-indigo-200">
                        <h3 class="text-2xl font-bold text-gray-800 mt-4">${t}</h3>
                        <p class="text-md text-gray-600">${e}</p>
                    </div>
                </div>
            </div>

            <div class="md:col-span-2">
                 <div id="professional-agenda-block" class="p-4 md:p-6 bg-white rounded-lg shadow-md space-y-6">
                    <div class="flex justify-center items-center h-full"><div class="loader"></div></div>
                </div>
            </div>
        </div>
    `,await L1()}async function L1(){const t=document.getElementById("professional-agenda-block");t.innerHTML="";try{const e=w.userProfessionalId;if(e){const s=await Oh(e);$1=s,s.photo&&(document.getElementById("user-profile-avatar").src=s.photo);const n=P(s.name);t.innerHTML=`
                <div class="bg-indigo-50 p-4 rounded-lg flex items-center gap-4 mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                        <p class="font-semibold text-indigo-800">Você está associado ao profissional: ${n}</p>
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
            `,R1(s.id),document.getElementById("my-blocks-filter").addEventListener("change",r=>lr(s.id,r.target.value)),lr(s.id,"future")}else t.innerHTML=`
                <div class="bg-gray-100 p-4 rounded-lg text-center text-gray-600">
                    <p>Você não possui um perfil de profissional associado a esta conta.</p>
                    <p class="text-sm mt-2">Para gerenciar sua agenda, peça ao administrador para associar seu usuário a um profissional existente na tela de "Usuários".</p>
                </div>
            `}catch(e){console.error("Erro ao carregar seção de profissional:",e),t.innerHTML=`
            <div class="bg-red-100 p-4 rounded-lg text-red-700">
                <p>Ocorreu um erro ao carregar os dados do profissional.</p>
                <p class="text-sm mt-2">${P(e.message)}</p>
            </div>
        `}}function R1(t){const e=document.getElementById("block-schedule-form");e.addEventListener("submit",async s=>{s.preventDefault();const n=e.querySelector("#blockDate").value,o=e.querySelector("#blockStartTime").value,r=e.querySelector("#blockEndTime").value,a=e.querySelector("#blockReason").value;if(!n||!o||!r){k("Erro","Por favor, preencha a data e os horários de início e fim.","error");return}if(o>=r){k("Erro","A hora de início deve ser anterior à hora de fim.","error");return}const l=new Date(`${n}T${o}:00`),c=new Date(`${n}T${r}:00`),d=e.querySelector('button[type="submit"]');d.disabled=!0,d.textContent="A bloquear...";try{await _r({establishmentId:w.establishmentId,professionalId:t,reason:a||"Bloqueado (Meu Perfil)",startTime:l.toISOString(),endTime:c.toISOString()}),k("Sucesso","Agenda bloqueada com sucesso!","success"),e.reset();const p=document.getElementById("my-blocks-filter").value;lr(t,p)}catch(p){console.error("Erro ao bloquear agenda:",p),k("Erro",`Não foi possível bloquear a agenda: ${p.message}`,"error")}finally{d.disabled=!1,d.textContent="Bloquear Agenda"}})}async function lr(t,e="future"){const s=document.getElementById("my-blocks-list");s.innerHTML='<p class="text-gray-500">A carregar bloqueios...</p>';try{const n=new Date;let o,r;e==="history"?(r=new Date,o=new Date,o.setFullYear(o.getFullYear()-1)):(o=new Date,r=new Date,r.setFullYear(r.getFullYear()+1));let l=(await Cr(w.establishmentId,o.toISOString(),r.toISOString(),t)).map(c=>({...c,startTime:new Date(c.startTime),endTime:new Date(c.endTime)}));e==="history"?l=l.filter(c=>c.endTime<n).sort((c,d)=>d.startTime-c.startTime):l=l.filter(c=>c.endTime>=n).sort((c,d)=>c.startTime-d.startTime),l.length>0?(s.innerHTML=l.map(c=>{const d=c.startTime.toLocaleDateString("pt-BR"),p=`${c.startTime.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})} - ${c.endTime.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}`,h=c.endTime<new Date,f=P(c.reason||"Sem motivo");return`
                    <div class="flex items-center justify-between p-3 ${h?"bg-gray-100 opacity-75":"bg-white border border-gray-200"} rounded-md shadow-sm">
                        <div>
                            <p class="font-semibold text-gray-800">${d} das ${p}</p>
                            <p class="text-sm text-gray-600">${f}</p>
                        </div>
                        <button data-block-id="${c.id}" class="remove-block-btn text-red-500 hover:text-red-700 text-2xl font-bold leading-none p-1" title="Apagar bloqueio">
                            &times;
                        </button>
                    </div>
                `}).join(""),s.querySelectorAll(".remove-block-btn").forEach(c=>{c.addEventListener("click",async d=>{const p=d.currentTarget.dataset.blockId;if(confirm("Tem certeza que deseja remover este bloqueio?"))try{await Xi(p),k("Sucesso","Bloqueio removido.","success"),lr(t,e)}catch(h){console.error("Erro ao remover bloqueio:",h),k("Erro",`Não foi possível remover o bloqueio: ${h.message}`,"error")}})})):s.innerHTML=`<p class="text-gray-500 py-4 text-center">Nenhum bloqueio ${e==="history"?"no histórico recente":"futuro agendado"}.</p>`}catch(n){console.error("Erro ao carregar bloqueios:",n),s.innerHTML=`<p class="text-red-500">Erro ao carregar bloqueios: ${P(n.message)}</p>`}}const _o=document.getElementById("loadingScreen"),Pa=document.getElementById("dashboardContent"),$a=document.getElementById("content"),eu=document.getElementById("notificationBell"),Da=document.getElementById("notificationBadge"),Ao=document.getElementById("notificationPanel"),tu=document.getElementById("notificationList"),La=document.getElementById("profileMenuButton"),tt=document.getElementById("profileDropdown"),M1=document.getElementById("profileName"),N1=document.getElementById("profileEmail"),B1=document.getElementById("logoutButton"),V1=document.getElementById("cancellationHistoryBtn"),su=document.getElementById("myProfileLink"),nu={indigo:{main:"#4f46e5",hover:"#4338ca",light:"#e0e7ff",text:"#ffffff"},blue:{main:"#2563eb",hover:"#1d4ed8",light:"#dbeafe",text:"#ffffff"},sky:{main:"#0284c7",hover:"#0369a1",light:"#e0f2fe",text:"#ffffff"},teal:{main:"#0d9488",hover:"#0f766e",light:"#ccfbf1",text:"#ffffff"},emerald:{main:"#059669",hover:"#047857",light:"#d1fae5",text:"#ffffff"},green:{main:"#16a34a",hover:"#15803d",light:"#dcfce7",text:"#ffffff"},lime:{main:"#65a30d",hover:"#4d7c0f",light:"#ecfccb",text:"#ffffff"},amber:{main:"#d97706",hover:"#b45309",light:"#fef3c7",text:"#1f2937"},orange:{main:"#ea580c",hover:"#c2410c",light:"#ffedd5",text:"#ffffff"},red:{main:"#dc2626",hover:"#b91c1c",light:"#fee2e2",text:"#ffffff"},rose:{main:"#e11d48",hover:"#be123c",light:"#ffe4e6",text:"#ffffff"},pink:{main:"#db2777",hover:"#be185d",light:"#fce7f3",text:"#ffffff"},fuchsia:{main:"#c026d3",hover:"#a21caf",light:"#fae8ff",text:"#ffffff"},purple:{main:"#7c3aed",hover:"#6d28d9",light:"#ede9fe",text:"#ffffff"},violet:{main:"#8b5cf6",hover:"#7c3aed",light:"#ddd6fe",text:"#ffffff"},gray:{main:"#4b5563",hover:"#374151",light:"#f3f4f6",text:"#ffffff"},black:{main:"#111827",hover:"#000000",light:"#e5e7eb",text:"#ffffff"}};let Pn=null,$n=[];const F1={"agenda-section":up,"comandas-section":el,"relatorios-section":ew,"servicos-section":hw,"produtos-section":Aw,"suppliers-section":Vw,"profissionais-section":sr,"clientes-section":Rr,"estabelecimento-section":$p,"ausencias-section":V2,"users-section":or,"sales-report-section":e1,"financial-section":l1,"commissions-section":h1,"packages-section":dl,"my-profile-section":D1};function O1(t){const e=nu[t]||nu.indigo,n=(r=>{const a=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(r);return a?`${parseInt(a[1],16)}, ${parseInt(a[2],16)}, ${parseInt(a[3],16)}`:"79, 70, 229"})(e.main);document.body.style.setProperty("--theme-main",e.main);const o=document.getElementById("dynamic-theme-styles");o.innerHTML=`
        :root {
            --theme-color-main: ${e.main};
            --theme-color-hover: ${e.hover};
            --theme-color-light: ${e.light};
            --theme-rgb: ${n};
        }
        .sidebar-link.active { 
            background-color: var(--theme-color-main) !important; 
            color: ${e.text} !important; 
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
    `}function di(){const t=$n.filter(e=>!e.read).length;if(t>0?(Da.textContent=t,Da.classList.remove("hidden")):Da.classList.add("hidden"),$n.length===0){tu.innerHTML='<p class="text-center text-gray-500 p-4">Nenhuma notificação.</p>';return}tu.innerHTML=$n.map(e=>`
    <div class="notification-item ${e.read?"":"unread"}">
    <p class="font-semibold">${e.title}</p>
    <p class="text-sm text-gray-600">${e.message}</p>
    <p class="text-xs text-gray-400 mt-1">${e.time}</p>
    </div>
    `).join("")}function q1(t){Pn&&Pn();const e=At(Ae,"establishments",t,"notifications"),s=cr(e,Dn("timestamp",">=",new Date),au("timestamp","desc"));Pn=wh(s,n=>{n.docChanges().forEach(o=>{if(o.type==="added"){const r=o.doc.data();$n.unshift({title:r.title,message:r.message,time:r.timestamp.toDate().toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),read:!1}),k(r.title,r.message,"info",!0),di();const a=document.querySelector(".sidebar-link.active");a&&a.dataset.target==="agenda-section"&&(r.type==="cancellation"||r.type==="new_appointment")&&(console.log("Atualizando agenda em tempo real..."),up())}})},n=>{console.error("Erro no listener de notificações em tempo real:",n)})}function Qe(t,e={}){const s=t.replace("-section","");if(t!=="my-profile-section"){const o=w.enabledModules?.[s]!==!1,r=w.userPermissions===null||w.userPermissions[t]?.view===!0;if(!o||!r){$a.innerHTML='<div class="p-8 text-center"><h2 class="text-2xl font-bold text-red-600">Acesso Negado</h2><p class="text-gray-600">Você não tem permissão para visualizar este módulo.</p></div>',document.querySelectorAll(".sidebar-link").forEach(a=>a.classList.remove("active"));return}}const n=F1[t];n?(document.querySelectorAll(".sidebar-link").forEach(o=>{o.classList.toggle("active",o.getAttribute("data-target")===t)}),t==="my-profile-section"&&document.querySelectorAll(".sidebar-link").forEach(o=>o.classList.remove("active")),$a.innerHTML="",n(e)):$a.innerHTML=`<div class="p-8 text-center"><h2 class="text-2xl font-bold">Página em Construção</h2><p class="text-gray-600">O módulo para "${t}" ainda não foi implementado.</p></div>`}async function j1(t){const e=document.getElementById("kpi-appointments-wrapper"),s=document.getElementById("kpi-financial-wrapper"),n=document.getElementById("kpi-today-appointments"),o=document.getElementById("kpi-today-revenue"),r=t===null||t["agenda-section"]?.view===!0,a=t===null||t["financial-section"]?.view===!0;if(r&&e&&e.classList.remove("hidden"),a&&s&&s.classList.remove("hidden"),!(!r&&!a))try{const l=await tx();r&&n&&(n.textContent=l.todayAppointments.toString()),a&&o&&(o.textContent=`R$ ${l.todayRevenue.toFixed(2).replace(".",",")}`)}catch(l){console.error("Erro ao carregar KPIs do cabeçalho:",l)}}async function H1(t){try{console.log("[Nativo] Iniciando configuração de Push..."),Yt.getPlatform()==="android"&&(await Ne.createChannel({id:"default",name:"Notificações Gerais",description:"Alertas de agendamentos e avisos",importance:5,visibility:1,vibration:!0}),console.log("Canal Android criado."));let e=await Ne.checkPermissions();if(e.receive==="prompt"&&(e=await Ne.requestPermissions()),e.receive!=="granted"){alert("ERRO: Permissão de notificações negada!");return}await Ne.register(),Ne.addListener("registration",async s=>{console.log("Push Token gerado:",s.value),alert("SUCESSO: Token gerado! "+s.value.substring(0,10)+"...");try{const n=rs(Ae,"users",t);await lu(n,{fcmTokens:xh(s.value),platform:"native_mobile"}),console.log("Token FCM salvo no perfil do utilizador (Nativo).")}catch(n){alert("Erro ao salvar no Banco: "+n.message),console.error("Erro ao salvar token FCM:",n)}}),Ne.addListener("registrationError",s=>{alert("FALHA DE REGISTO: "+JSON.stringify(s)),console.error("Erro no registo de push notifications:",s)}),Ne.addListener("pushNotificationReceived",s=>{console.log("Notificação Push recebida:",s),k(s.title,s.body,"info",!0)}),Ne.addListener("pushNotificationActionPerformed",s=>{console.log("Ação na notificação push:",s),Qe("agenda-section")})}catch(e){alert("Erro Fatal Push: "+e.message),console.log("Push Notifications não suportado/inicializado:",e)}}async function U1(){try{await fh(_e,bh),console.log("Persistência LOCAL configurada na inicialização.")}catch(t){console.error("Erro ao definir persistência no main.js",t)}Yt.isNativePlatform()&&(document.body.classList.add("is-app-native"),console.log("Modo App Nativo detectado: Layout ajustado para Safe Areas.")),Dh(),eu.addEventListener("click",t=>{t.stopPropagation(),Ao.classList.toggle("hidden"),Ao.classList.contains("hidden")||($n.forEach(e=>e.read=!0),di())}),V1.addEventListener("click",()=>{Lh()}),La.addEventListener("click",t=>{t.stopPropagation(),tt.classList.toggle("active"),tt.classList.contains("active")?tt.classList.remove("hidden"):setTimeout(()=>tt.classList.add("hidden"),200)}),su&&su.addEventListener("click",t=>{t.preventDefault(),Qe("my-profile-section"),tt.classList.remove("active"),tt.classList.add("hidden")}),document.addEventListener("click",t=>{!Ao.contains(t.target)&&t.target!==eu&&Ao.classList.add("hidden"),!tt.contains(t.target)&&t.target!==La&&tt.classList.contains("active")&&(tt.classList.remove("active"),setTimeout(()=>tt.classList.add("hidden"),200))}),ou(_e,async t=>{if(t){console.log("Usuário detectado:",t.email),Yt.isNativePlatform()||(console.log("Inicializando Web Push (PWA)..."),ep());try{const s=(await t.getIdTokenResult(!0)).claims;if((s.role==="owner"||s.role==="employee")&&s.establishmentId){const n=await ms(s.establishmentId);w.enabledModules=n.modules,O1(n.themeColor||"indigo");let o=null,r=t.displayName,a=null;if(s.role==="employee"||s.role==="owner"){const d=rs(Ae,"users",t.uid),p=await yh(d);if(p.exists()){const h=p.data();o=s.role==="employee"?h.permissions||{}:null,r=h.name||r,a=h.professionalId||null}else if(s.role==="employee")throw new Error("Dados de permissão do funcionário não encontrados.")}w.userProfessionalId=a,Yt.isNativePlatform()&&H1(t.uid);const l=r||t.email;Eh(s.establishmentId,n.name,o),La.textContent=l.charAt(0).toUpperCase(),M1.textContent=l,N1.textContent=t.email;const c=()=>{Pn&&Pn(),pc(_e).then(()=>window.location.href="/login.html")};B1.addEventListener("click",d=>{d.preventDefault(),c()}),Bh(Qe,o,w.enabledModules),j1(o),q1(s.establishmentId),di(),_o.classList.add("fade-out"),Pa.style.display="flex",setTimeout(()=>{_o.style.display="none"},500),console.log("Verificando Onboarding..."),setTimeout(()=>{Xh()},1500),Qe("agenda-section")}else throw new Error("Utilizador não tem permissão de 'owner' ou 'employee' ou 'establishmentId'.")}catch(e){console.error("Erro crítico na inicialização do painel:",e),_o.classList.add("fade-out"),setTimeout(()=>{_o.style.display="none"},500),Pa.innerHTML=`
                    <div class="w-full h-full flex flex-col items-center justify-center bg-gray-100 p-4">
                        <h2 class="text-2xl font-bold text-red-600 mb-4">Erro de Acesso</h2>
                        <p class="text-gray-700 text-center mb-6">Não foi possível carregar os seus dados ou permissões. Isto pode acontecer se a sua conta foi desativada ou está configurada incorretamente.</p>
                        <p class="text-sm text-gray-500 mb-6">Detalhe do erro: ${e.message}</p>
                        <button id="errorLogoutButton" class="bg-red-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-red-700">Sair e Tentar Novamente</button>
                    </div>
                `,Pa.style.display="flex",document.getElementById("errorLogoutButton").addEventListener("click",()=>{pc(_e).then(()=>window.location.href="/login.html")})}}else window.location.href="/login.html"})}U1();ou(_e,t=>{t&&ep()});
