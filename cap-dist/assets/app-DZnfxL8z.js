const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/web-BWSM13SB.js","assets/modulepreload-polyfill-B5Qt9EMX.js","assets/firebase-config-C2tbVz-J.js","assets/styles-C2XZ_b0c.css"])))=>i.map(i=>d[i]);
import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css               */import{a as U,d as W,m as _a}from"./firebase-config-C2tbVz-J.js";import{EmailAuthProvider as Os,reauthenticateWithCredential as zs,verifyBeforeUpdateEmail as Vs,updatePassword as Us,updateProfile as _s,setPersistence as Ws,browserLocalPersistence as Js,onAuthStateChanged as Ro,signOut as Wa}from"https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";import{doc as pe,getDoc as jo,updateDoc as $a,setDoc as Gs,addDoc as Fo,collection as ge,query as Ot,where as it,getDocs as Ea,orderBy as Ho,writeBatch as Oo,serverTimestamp as Ja,deleteDoc as Ys,arrayUnion as Qs,onSnapshot as Xs}from"https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";import{getToken as Zs,onMessage as Ks}from"https://www.gstatic.com/firebasejs/11.6.1/firebase-messaging.js";import"https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";import"https://www.gstatic.com/firebasejs/11.6.1/firebase-storage.js";const u={userName:null,userProfessionalId:null,userPermissions:null,userRole:null,groupId:null,groupName:null,accessibleCompanies:[],accessibleEstablishments:[],currentViewContext:{type:null,id:null,name:null},establishmentId:null,establishmentName:null,establishmentSettings:null,enabledModules:{agenda:!0,comandas:!0,relatorios:!0,commissions:!0,packages:!0,financial:!0,servicos:!0,produtos:!0,profissionais:!0,clientes:!0,users:!0,estabelecimento:!0},professionals:[],services:[],professionalColors:new Map,allEvents:[]};function er(e,t,a){u.establishmentId=e,u.establishmentName=t,u.userPermissions=a,u.currentViewContext={type:"BRANCH",id:e,name:t}}const zo=window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1",ua=zo?"http://localhost:8080":"https://kairos-app-407358446276.us-central1.run.app";console.log(`🚀 API configurada para modo: ${zo?"LOCAL (Dev)":"PRODUÇÃO (Cloud)"}`);console.log("📡 URL Base:",ua);async function tr(){const e=U.currentUser;return e?{"Content-Type":"application/json",Authorization:`Bearer ${await e.getIdToken()}`}:(console.warn("Usuário não logado, tentando redirecionar para /login"),window.location.href="/login",null)}async function E(e,t={}){const a=await tr();if(!a)throw new Error("Utilizador não autenticado. A requisição foi cancelada.");const o=ua.replace(/\/$/,""),r=e.startsWith("/")?e:`/${e}`,s=`${o}${r}`;console.log(`AuthenticatedFetch: ${t.method||"GET"} ${s}`);try{const n=await fetch(s,{...t,headers:{...a,...t.headers}});if(!n.ok){const d=(await n.json().catch(()=>({message:n.statusText}))).message||`Erro na API: ${n.status}`;if(d.includes("FAILED_PRECONDITION")&&d.includes("requires an index")){const l=/(https:\/\/[^\s]+)/,c=d.match(l),m=c?c[0]:"URL não encontrada na mensagem de erro.";console.warn(`%c AVISO IMPORTANTE (FIREBASE): ÍNDICE NECESSÁRIO! %c
                    
Sua consulta em '${e}' falhou porque um índice composto do Firestore é necessário.
Para corrigir isso, clique no link abaixo (com o Firebase logado) e crie o índice:
                    
%c${m}%c
                    
--------------------------------------------------------------------`,"background-color: #ffc; color: #663300; font-size: 14px; font-weight: bold; padding: 5px;","color: #663300; font-size: 12px;","color: #0000ff; font-size: 12px; font-weight: bold; text-decoration: underline;","color: #663300; font-size: 12px;")}throw console.error(`Erro na API (${n.status}) em ${s}:`,d),new Error(d)}return n.json()}catch(n){throw console.error(`Falha de rede ao tentar acessar ${s}:`,n.message),n.message.includes("Failed to fetch")||n.message.includes("NetworkError")?new Error(`Não foi possível conectar ao servidor em ${ua}. Verifique se o servidor backend está rodando.`):n}}const Vo=(e,t,a,o=null)=>{let r=`/api/appointments/${e}?startDate=${t}&endDate=${a}`;return o&&(r+=`&professionalId=${o}`),E(r)},ar=({establishmentId:e,professionalId:t,serviceIds:a,date:o})=>{const r=`/api/availability?establishmentId=${e}&professionalId=${t}&serviceIds=${a.join(",")}&date=${o}`;return E(r)},or=e=>E("/api/appointments",{method:"POST",body:JSON.stringify(e)}),sr=(e,t)=>E(`/api/appointments/${e}`,{method:"PUT",body:JSON.stringify(t)}),Ga=e=>E(`/api/appointments/${e}`,{method:"DELETE"}),rr=e=>E(`/api/appointments/${e}/reopen`,{method:"POST"}),nr=(e,t)=>E(`/api/appointments/${e}/checkout`,{method:"POST",body:JSON.stringify(t)});let J;async function ir(){if(!J)try{J=new(window.AudioContext||window.webkitAudioContext)}catch(e){console.error("Não foi possível inicializar o áudio:",e)}}function lr(){if(!J){console.warn("AudioContext não inicializado. O som não será tocado.");return}J.state==="suspended"&&J.resume();const e=J.createOscillator(),t=J.createGain();e.connect(t),t.connect(J.destination),e.type="sine",e.frequency.setValueAtTime(800,J.currentTime),t.gain.setValueAtTime(0,J.currentTime),t.gain.linearRampToValueAtTime(.3,J.currentTime+.01),t.gain.exponentialRampToValueAtTime(1e-4,J.currentTime+.2),e.start(J.currentTime),e.stop(J.currentTime+.2)}function g(e,t,a="info",o=!1){const r=document.getElementById("toast-container");if(!r)return;o&&lr();const s=document.createElement("div"),n={success:"bg-green-50 border-green-400 text-green-700",error:"bg-red-50 border-red-400 text-red-700",info:"bg-blue-50 border-blue-400 text-blue-700"},i={success:'<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',error:'<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',info:'<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>'},d={success:"bg-green-500",error:"bg-red-500",info:"bg-blue-500"};s.className=`toast ${n[a]||n.info}`,s.innerHTML=`
        <div class="toast-icon">${i[a]||i.info}</div>
        <div class="toast-content">
            <p class="font-bold">${e}</p>
            <p class="text-sm">${t}</p>
        </div>
        <button class="toast-close">&times;</button>
        <div class="toast-progress-bar">
            <div class="toast-progress ${d[a]||d.info}"></div>
        </div>
    `,r.appendChild(s),s.querySelector(".toast-close").addEventListener("click",()=>s.remove()),setTimeout(()=>{s.remove()},4e3)}function H(e,t){const a=document.getElementById("genericModal");return new Promise(o=>{a.innerHTML=`
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
            </div>`,a.style.display="flex",document.getElementById("genericModalConfirmBtn").onclick=()=>{a.style.display="none",o(!0)},document.getElementById("genericModalCancelBtn").onclick=()=>{a.style.display="none",o(!1)}})}function _({title:e,contentHTML:t,maxWidth:a="max-w-4xl",showCloseButton:o=!0}){let r=document.getElementById("genericModal");const s=r.cloneNode(!1);r.parentNode.replaceChild(s,r),r=s;const n=()=>{r.style.display="none"},i=c=>{r.querySelector("#genericModalContentBody").innerHTML=c};r.innerHTML=`
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
    `;const d=r.querySelector("[data-close-modal]");d&&(d.onclick=n);const l=r.querySelector('[data-action="close-modal"]');return l&&(l.onclick=n),r.addEventListener("click",c=>{c.target.closest(".modal-content")||n()}),r.style.display="flex",{modalElement:r,close:n,setContent:i}}function zt(e){const t=document.getElementById(e);t&&(t.style.display="none")}function dr(){document.body.addEventListener("click",()=>{J||ir()},{once:!0}),document.addEventListener("click",e=>{const t=e.target.closest('[data-action="close-modal"]');if(t){const o=t.dataset.target;if(o){const r=document.getElementById(o);r&&(r.style.display="none")}}if(e.target.closest("[data-close-modal]")){const o=document.getElementById("genericModal");o&&(o.style.display="none")}})}const X=document.getElementById("sidebar"),Ya=document.getElementById("sidebarToggle"),Ke=document.getElementById("mainContent"),cr=document.querySelectorAll(".sidebar-link"),Qa=document.getElementById("hamburger-menu-btn"),ze=document.getElementById("mobile-overlay");function Ct(e){!X||!Ke||(X.classList.toggle("collapsed",e),Ke.classList.toggle("sidebar-collapsed-shift",e))}function ur(){!X||!ze||(X.classList.add("mobile-open"),ze.classList.add("visible"))}function bt(){!X||!ze||(X.classList.remove("mobile-open"),ze.classList.remove("visible"))}function mr(){Ct(!X.classList.contains("collapsed"))}function pr(e,t,a){if(!X||!Ke)return;Ke.classList.add("main-content-shift"),window.innerWidth>=768?Ct(X.classList.contains("collapsed")):(Ke.classList.remove("main-content-shift","sidebar-collapsed-shift"),bt()),Ya&&Ya.addEventListener("click",r=>{r.stopPropagation(),mr()}),X.addEventListener("mouseenter",()=>{window.innerWidth>=1024&&X.classList.contains("collapsed")&&Ct(!1)}),X.addEventListener("mouseleave",()=>{window.innerWidth>=1024&&(document.querySelector("#sidebarToggle:hover")||Ct(!0))}),Qa&&Qa.addEventListener("click",r=>{r.stopPropagation(),ur()}),ze&&ze.addEventListener("click",r=>{r.stopPropagation(),bt()});let o=0;X.addEventListener("touchstart",r=>{o=r.changedTouches[0].screenX},{passive:!0}),X.addEventListener("touchend",r=>{const s=r.changedTouches[0].screenX;o-s>50&&bt()},{passive:!0}),cr.forEach(r=>{const s=r.getAttribute("data-target"),n=s.replace("-section",""),i=a?.[n]!==!1,d=t===null||t[s]?.view===!0;if(!i||!d){r.style.display="none";return}r.style.display="flex",r.addEventListener("click",l=>{l.preventDefault(),s&&typeof e=="function"&&e(s),window.innerWidth<768&&bt()})})}const Ee=e=>{const t=e||u.establishmentId;return t?E(`/api/establishments/${t}`):Promise.reject(new Error("ID do estabelecimento não fornecido."))},Lt=(e,t)=>{const a=e||u.establishmentId;return a?E(`/api/establishments/${a}`,{method:"PUT",body:JSON.stringify(t)}):Promise.reject(new Error("ID do estabelecimento não fornecido."))},gr=(e,t)=>{const a=e||u.establishmentId;return a?E(`/api/establishments/${a}/booking-status`,{method:"PATCH",body:JSON.stringify({publicBookingEnabled:t})}):Promise.reject(new Error("ID do estabelecimento não fornecido."))},br=(e,t)=>{const a=e||u.establishmentId;return a?E(`/api/establishments/${a}/owner-email`,{method:"PATCH",body:JSON.stringify({newEmail:t})}):Promise.reject(new Error("ID do estabelecimento não fornecido."))},ee=e=>E(`/api/professionals/${e}`),fr=e=>E(`/api/professionals/details/${e}`),Uo=e=>E("/api/professionals",{method:"POST",body:JSON.stringify(e)}),Pt=(e,t)=>E(`/api/professionals/${e}`,{method:"PUT",body:JSON.stringify(t)}),Xa=(e,t)=>Pt(e,{services:t}),_o=e=>E(`/api/professionals/${e}`,{method:"DELETE"}),vr=e=>{const t=e.map(a=>_o(a));return Promise.all(t)},be=e=>E(`/api/services/${e}`),Wo=e=>E("/api/services",{method:"POST",body:JSON.stringify(e)}),hr=(e,t)=>E(`/api/services/${e}`,{method:"PUT",body:JSON.stringify(t)}),xr=e=>E(`/api/services/${e}`,{method:"DELETE"}),yr=(e,t)=>E(`/api/services/${e}/status`,{method:"PATCH",body:JSON.stringify({active:t})}),wr=e=>E(`/api/services/stats/most-popular/${e}`),ut=e=>E(`/api/products/${e}`),Jo=e=>E("/api/products",{method:"POST",body:JSON.stringify(e)}),kr=(e,t)=>E(`/api/products/${e}`,{method:"PUT",body:JSON.stringify(t)}),Sr=e=>E(`/api/products/${e}`,{method:"DELETE"}),$r=(e,t)=>E(`/api/products/${e}/stock`,{method:"PATCH",body:JSON.stringify(t)}),Er=({startDate:e,endDate:t,productId:a,categoryId:o,establishmentId:r})=>{const s=new URLSearchParams({startDate:e,endDate:t});return a&&a!=="all"&&s.append("productId",a),o&&o!=="all"&&s.append("categoryId",o),r&&s.append("establishmentId",r),E(`/api/products/stock-history/report?${s.toString()}`)},Ir={indigo:{name:"Padrão (Índigo)",main:"#4f46e5"},blue:{name:"Azul",main:"#2563eb"},sky:{name:"Céu",main:"#0284c7"},teal:{name:"Verde Água",main:"#0d9488"},emerald:{name:"Esmeralda",main:"#059669"},green:{name:"Verde",main:"#16a34a"},lime:{name:"Lima",main:"#65a30d"},amber:{name:"Âmbar",main:"#d97706"},orange:{name:"Laranja",main:"#ea580c"},red:{name:"Vermelho",main:"#dc2626"},rose:{name:"Rosa",main:"#e11d48"},pink:{name:"Pink",main:"#db2777"},fuchsia:{name:"Fúcsia",main:"#c026d3"},purple:{name:"Roxo",main:"#7c3aed"},violet:{name:"Violeta",main:"#8b5cf6"},gray:{name:"Cinza",main:"#4b5563"},black:{name:"Preto",main:"#111827"}};function Za(e,t,a){return new Promise((o,r)=>{const s=new FileReader;s.readAsDataURL(e),s.onload=n=>{const i=new Image;i.src=n.target.result,i.onload=()=>{const d=document.createElement("canvas");let l=i.width,c=i.height;l>t&&(c*=t/l,l=t),d.width=l,d.height=c,d.getContext("2d").drawImage(i,0,0,l,c);const p=e.type==="image/png"&&t<500?"image/png":"image/jpeg";o(d.toDataURL(p,a))},i.onerror=d=>r(d)},s.onerror=n=>r(n)})}let me=null;const Tt=[{id:"company_data",title:"Identidade do Negócio",icon:"🏢",description:"Configure os dados da sua empresa."},{id:"branding",title:"Sua Marca",icon:"🎨",description:"Logo e cores (Opcional)."},{id:"time_config",title:"O Relógio",icon:"⏱️",description:"Tempo padrão entre agendamentos."},{id:"first_service",title:"O Menu",icon:"✂️",description:"Seu principal serviço."},{id:"first_prof",title:"Sua Equipe",icon:"💇",description:"Cadastre o primeiro profissional."},{id:"first_product",title:"O Estoque",icon:"🧴",description:"Cadastre um produto (opcional)."}];let te=0,Bt=[];async function Cr(){try{console.log("Iniciando verificação de Onboarding para ID:",u.establishmentId);const e=await Ee(u.establishmentId),t=await ee(u.establishmentId),a=await be(u.establishmentId);Bt=a||[];const o=e&&e.name&&(e.phone||e.address),r=e&&(e.logo||e.themeColor&&e.themeColor!=="indigo"),s=e&&e.slotInterval>0,n=a&&a.length>0,i=t&&t.length>0;if(console.log("Status Onboarding:",{hasCompanyData:o,hasBranding:r,hasTimeConfig:s,hasService:n,hasProf:i}),o&&s&&i&&n)return;if(!o)te=0;else if(!r&&!s)te=1;else if(!s)te=2;else if(!n)te=3;else if(!i)te=4;else if(te===0)return;Lr(),Ca(te)}catch(e){console.error("Erro ao verificar onboarding:",e)}}function Lr(){document.getElementById("onboarding-overlay")||(me=document.createElement("div"),me.id="onboarding-overlay",me.className="fixed inset-0 bg-gray-900 bg-opacity-95 z-[9999] flex items-center justify-center p-4 overflow-y-auto",me.style.cssText="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background-color: rgba(17, 24, 39, 0.95); z-index: 9999; display: flex; align-items: center; justify-content: center;",me.innerHTML=`
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
    `,document.body.appendChild(me),Ia())}function Ia(){const e=Math.round(te/Tt.length*100),t=document.getElementById("progress-bar"),a=document.getElementById("progress-text");t&&(t.style.width=`${e}%`),a&&(a.innerText=`${e}%`)}function Ca(e){const t=document.getElementById("onboarding-step-content"),a=Tt[e];if(!a){Ka(t);return}let o="";if(a.id==="company_data")o=`
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
        `;else if(a.id==="branding")o=`
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
                            ${Object.entries(Ir).map(([s,n])=>`<option value="${s}">${n.name}</option>`).join("")}
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
        `;else if(a.id==="time_config")o=`
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
        `;else if(a.id==="first_service")o=`
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
        `;else if(a.id==="first_prof"){const r=Bt.map(n=>`<option value="${n.id}">${n.name}</option>`).join(""),s=Bt.length>0;o=`
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
                ${s?`
                <div>
                    <label class="block text-xs font-bold text-gray-700 uppercase">Serviço Principal</label>
                    <select name="serviceId" class="mt-1 w-full p-2 border rounded text-sm bg-white">
                        ${r}
                    </select>
                </div>
                `:""}
            </form>
        `}else a.id==="first_product"&&(o=`
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
        
        ${o}

        <div class="mt-6 flex justify-end gap-2">
            ${a.id==="first_product"||a.id==="branding"?'<button type="button" id="skip-btn" class="text-gray-500 hover:text-gray-700 font-medium text-sm px-3 py-2">Pular</button>':""}
            <button type="button" id="next-step-btn" class="bg-indigo-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-indigo-700 transition flex items-center gap-2 text-sm">
                ${e===Tt.length-1?"Concluir":"Próximo"}
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
            </button>
        </div>
    `,document.getElementById("next-step-btn").addEventListener("click",()=>Tr(a.id)),document.getElementById("skip-btn")&&document.getElementById("skip-btn").addEventListener("click",()=>{e===Tt.length-1?Ka(t):(te++,Ia(),Ca(te))}),a.id==="branding"){const r=document.getElementById("logo-input"),s=document.getElementById("bg-input");r&&(r.onchange=async n=>{const i=n.target.files[0];if(i)try{const d=await Za(i,200,.8);document.getElementById("logo-base64").value=d,document.getElementById("logo-preview").innerHTML=`<img src="${d}" class="w-full h-full object-contain rounded">`}catch(d){console.error("Erro logo",d)}}),s&&(s.onchange=async n=>{const i=n.target.files[0];if(i)try{const d=await Za(i,1024,.7);document.getElementById("bg-base64").value=d}catch(d){console.error("Erro bg",d)}})}}function Ka(e){e.innerHTML=`
        <div class="text-center py-6">
            <div class="text-5xl mb-3">🏆</div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">Tudo Pronto!</h3>
            <p class="text-gray-600 text-sm mb-6">Seu sistema está configurado. Boas vendas!</p>
            <button id="finish-onboarding-btn" class="bg-indigo-600 text-white font-bold py-2 px-6 rounded-full hover:bg-indigo-700 transition shadow-lg transform hover:scale-105 text-sm">
                Acessar Painel
            </button>
        </div>
    `;const t=document.getElementById("progress-bar"),a=document.getElementById("progress-text");t&&(t.style.width="100%"),a&&(a.innerText="100%"),document.getElementById("finish-onboarding-btn").onclick=()=>{me&&me.remove(),window.location.reload()}}async function Tr(e){const t=document.getElementById("step-form");if(!t.reportValidity())return;const a=document.getElementById("next-step-btn"),o=a.innerHTML;a.disabled=!0,a.innerHTML="Salvando...";const r=new FormData(t),s=Object.fromEntries(r.entries());try{if(e==="company_data")await Lt(u.establishmentId,{name:s.name,phone:s.phone,email:s.email,address:s.address,zipCode:s.zipCode});else if(e==="branding"){const n={};s.logoBase64&&(n.logo=s.logoBase64),s.bgBase64&&(n.backgroundImage=s.bgBase64),s.themeColor&&(n.themeColor=s.themeColor),s.primaryColor&&(n.primaryColor=s.primaryColor),Object.keys(n).length>0&&await Lt(u.establishmentId,n)}else if(e==="time_config"){const n=parseInt(s.slotInterval);await Lt(u.establishmentId,{slotInterval:n})}else if(e==="first_service"){const n=await Wo({establishmentId:u.establishmentId,name:s.name,price:parseFloat(s.price),duration:parseInt(s.duration),active:!0});n&&Bt.push(n)}else if(e==="first_prof"){const n=await Uo({establishmentId:u.establishmentId,name:s.name,specialty:s.role,active:!0,commissionRate:0});if(s.serviceId&&n&&n.id)try{Xa?await Xa(n.id,[s.serviceId]):Pt&&await Pt(n.id,{services:[s.serviceId]})}catch(i){console.warn("Não foi possível vincular o serviço automaticamente.",i)}}else e==="first_product"&&await Jo({establishmentId:u.establishmentId,name:s.name,price:parseFloat(s.salePrice),stock:parseInt(s.stock),active:!0});g("Sucesso","Passo concluído!","success"),te++,Ia(),Ca(te)}catch(n){g("Erro","Erro ao salvar: "+n.message,"error"),a.disabled=!1,a.innerHTML=o}}var Ve;(function(e){e.Unimplemented="UNIMPLEMENTED",e.Unavailable="UNAVAILABLE"})(Ve||(Ve={}));class ta extends Error{constructor(t,a,o){super(t),this.message=t,this.code=a,this.data=o}}const Dr=e=>{var t,a;return e?.androidBridge?"android":!((a=(t=e?.webkit)===null||t===void 0?void 0:t.messageHandlers)===null||a===void 0)&&a.bridge?"ios":"web"},Pr=e=>{const t=e.CapacitorCustomPlatform||null,a=e.Capacitor||{},o=a.Plugins=a.Plugins||{},r=()=>t!==null?t.name:Dr(e),s=()=>r()!=="web",n=m=>{const p=l.get(m);return!!(p?.platforms.has(r())||i(m))},i=m=>{var p;return(p=a.PluginHeaders)===null||p===void 0?void 0:p.find(b=>b.name===m)},d=m=>e.console.error(m),l=new Map,c=(m,p={})=>{const b=l.get(m);if(b)return console.warn(`Capacitor plugin "${m}" already registered. Cannot register plugins twice.`),b.proxy;const v=r(),h=i(m);let y;const w=async()=>(!y&&v in p?y=typeof p[v]=="function"?y=await p[v]():y=p[v]:t!==null&&!y&&"web"in p&&(y=typeof p.web=="function"?y=await p.web():y=p.web),y),$=(D,M)=>{var R,F;if(h){const O=h?.methods.find(j=>M===j.name);if(O)return O.rtype==="promise"?j=>a.nativePromise(m,M.toString(),j):(j,Y)=>a.nativeCallback(m,M.toString(),j,Y);if(D)return(R=D[M])===null||R===void 0?void 0:R.bind(D)}else{if(D)return(F=D[M])===null||F===void 0?void 0:F.bind(D);throw new ta(`"${m}" plugin is not implemented on ${v}`,Ve.Unimplemented)}},k=D=>{let M;const R=(...F)=>{const O=w().then(j=>{const Y=$(j,D);if(Y){const Ie=Y(...F);return M=Ie?.remove,Ie}else throw new ta(`"${m}.${D}()" is not implemented on ${v}`,Ve.Unimplemented)});return D==="addListener"&&(O.remove=async()=>M()),O};return R.toString=()=>`${D.toString()}() { [capacitor code] }`,Object.defineProperty(R,"name",{value:D,writable:!1,configurable:!1}),R},C=k("addListener"),T=k("removeListener"),A=(D,M)=>{const R=C({eventName:D},M),F=async()=>{const j=await R;T({eventName:D,callbackId:j},M)},O=new Promise(j=>R.then(()=>j({remove:F})));return O.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await F()},O},q=new Proxy({},{get(D,M){switch(M){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return h?A:C;case"removeListener":return T;default:return k(M)}}});return o[m]=q,l.set(m,{name:m,proxy:q,platforms:new Set([...Object.keys(p),...h?[v]:[]])}),q};return a.convertFileSrc||(a.convertFileSrc=m=>m),a.getPlatform=r,a.handleError=d,a.isNativePlatform=s,a.isPluginAvailable=n,a.registerPlugin=c,a.Exception=ta,a.DEBUG=!!a.DEBUG,a.isLoggingEnabled=!!a.isLoggingEnabled,a},Br=e=>e.Capacitor=Pr(e),se=Br(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),Vt=se.registerPlugin;class Go{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(t,a){let o=!1;this.listeners[t]||(this.listeners[t]=[],o=!0),this.listeners[t].push(a);const s=this.windowListeners[t];s&&!s.registered&&this.addWindowListener(s),o&&this.sendRetainedArgumentsForEvent(t);const n=async()=>this.removeListener(t,a);return Promise.resolve({remove:n})}async removeAllListeners(){this.listeners={};for(const t in this.windowListeners)this.removeWindowListener(this.windowListeners[t]);this.windowListeners={}}notifyListeners(t,a,o){const r=this.listeners[t];if(!r){if(o){let s=this.retainedEventArguments[t];s||(s=[]),s.push(a),this.retainedEventArguments[t]=s}return}r.forEach(s=>s(a))}hasListeners(t){var a;return!!(!((a=this.listeners[t])===null||a===void 0)&&a.length)}registerWindowListener(t,a){this.windowListeners[a]={registered:!1,windowEventName:t,pluginEventName:a,handler:o=>{this.notifyListeners(a,o)}}}unimplemented(t="not implemented"){return new se.Exception(t,Ve.Unimplemented)}unavailable(t="not available"){return new se.Exception(t,Ve.Unavailable)}async removeListener(t,a){const o=this.listeners[t];if(!o)return;const r=o.indexOf(a);this.listeners[t].splice(r,1),this.listeners[t].length||this.removeWindowListener(this.windowListeners[t])}addWindowListener(t){window.addEventListener(t.windowEventName,t.handler),t.registered=!0}removeWindowListener(t){t&&(window.removeEventListener(t.windowEventName,t.handler),t.registered=!1)}sendRetainedArgumentsForEvent(t){const a=this.retainedEventArguments[t];a&&(delete this.retainedEventArguments[t],a.forEach(o=>{this.notifyListeners(t,o)}))}}const eo=e=>encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),to=e=>e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent);class Mr extends Go{async getCookies(){const t=document.cookie,a={};return t.split(";").forEach(o=>{if(o.length<=0)return;let[r,s]=o.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");r=to(r).trim(),s=to(s).trim(),a[r]=s}),a}async setCookie(t){try{const a=eo(t.key),o=eo(t.value),r=`; expires=${(t.expires||"").replace("expires=","")}`,s=(t.path||"/").replace("path=",""),n=t.url!=null&&t.url.length>0?`domain=${t.url}`:"";document.cookie=`${a}=${o||""}${r}; path=${s}; ${n};`}catch(a){return Promise.reject(a)}}async deleteCookie(t){try{document.cookie=`${t.key}=; Max-Age=0`}catch(a){return Promise.reject(a)}}async clearCookies(){try{const t=document.cookie.split(";")||[];for(const a of t)document.cookie=a.replace(/^ +/,"").replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(t){return Promise.reject(t)}}async clearAllCookies(){try{await this.clearCookies()}catch(t){return Promise.reject(t)}}}Vt("CapacitorCookies",{web:()=>new Mr});const Ar=async e=>new Promise((t,a)=>{const o=new FileReader;o.onload=()=>{const r=o.result;t(r.indexOf(",")>=0?r.split(",")[1]:r)},o.onerror=r=>a(r),o.readAsDataURL(e)}),qr=(e={})=>{const t=Object.keys(e);return Object.keys(e).map(r=>r.toLocaleLowerCase()).reduce((r,s,n)=>(r[s]=e[t[n]],r),{})},Nr=(e,t=!0)=>e?Object.entries(e).reduce((o,r)=>{const[s,n]=r;let i,d;return Array.isArray(n)?(d="",n.forEach(l=>{i=t?encodeURIComponent(l):l,d+=`${s}=${i}&`}),d.slice(0,-1)):(i=t?encodeURIComponent(n):n,d=`${s}=${i}`),`${o}&${d}`},"").substr(1):null,Rr=(e,t={})=>{const a=Object.assign({method:e.method||"GET",headers:e.headers},t),r=qr(e.headers)["content-type"]||"";if(typeof e.data=="string")a.body=e.data;else if(r.includes("application/x-www-form-urlencoded")){const s=new URLSearchParams;for(const[n,i]of Object.entries(e.data||{}))s.set(n,i);a.body=s.toString()}else if(r.includes("multipart/form-data")||e.data instanceof FormData){const s=new FormData;if(e.data instanceof FormData)e.data.forEach((i,d)=>{s.append(d,i)});else for(const i of Object.keys(e.data))s.append(i,e.data[i]);a.body=s;const n=new Headers(a.headers);n.delete("content-type"),a.headers=n}else(r.includes("application/json")||typeof e.data=="object")&&(a.body=JSON.stringify(e.data));return a};class jr extends Go{async request(t){const a=Rr(t,t.webFetchExtra),o=Nr(t.params,t.shouldEncodeUrlParams),r=o?`${t.url}?${o}`:t.url,s=await fetch(r,a),n=s.headers.get("content-type")||"";let{responseType:i="text"}=s.ok?t:{};n.includes("application/json")&&(i="json");let d,l;switch(i){case"arraybuffer":case"blob":l=await s.blob(),d=await Ar(l);break;case"json":d=await s.json();break;case"document":case"text":default:d=await s.text()}const c={};return s.headers.forEach((m,p)=>{c[p]=m}),{data:d,headers:c,status:s.status,url:s.url}}async get(t){return this.request(Object.assign(Object.assign({},t),{method:"GET"}))}async post(t){return this.request(Object.assign(Object.assign({},t),{method:"POST"}))}async put(t){return this.request(Object.assign(Object.assign({},t),{method:"PUT"}))}async patch(t){return this.request(Object.assign(Object.assign({},t),{method:"PATCH"}))}async delete(t){return this.request(Object.assign(Object.assign({},t),{method:"DELETE"}))}}Vt("CapacitorHttp",{web:()=>new jr});const G=Vt("PushNotifications",{}),Fr="modulepreload",Hr=function(e){return"/"+e},ao={},Or=function(t,a,o){let r=Promise.resolve();if(a&&a.length>0){let d=function(l){return Promise.all(l.map(c=>Promise.resolve(c).then(m=>({status:"fulfilled",value:m}),m=>({status:"rejected",reason:m}))))};document.getElementsByTagName("link");const n=document.querySelector("meta[property=csp-nonce]"),i=n?.nonce||n?.getAttribute("nonce");r=d(a.map(l=>{if(l=Hr(l),l in ao)return;ao[l]=!0;const c=l.endsWith(".css"),m=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${m}`))return;const p=document.createElement("link");if(p.rel=c?"stylesheet":Fr,c||(p.as="script"),p.crossOrigin="",p.href=l,i&&p.setAttribute("nonce",i),document.head.appendChild(p),c)return new Promise((b,v)=>{p.addEventListener("load",b),p.addEventListener("error",()=>v(new Error(`Unable to preload CSS for ${l}`)))})}))}function s(n){const i=new Event("vite:preloadError",{cancelable:!0});if(i.payload=n,window.dispatchEvent(i),!i.defaultPrevented)throw n}return r.then(n=>{for(const i of n||[])i.status==="rejected"&&s(i.reason);return t().catch(s)})},oo=Vt("App",{web:()=>Or(()=>import("./web-BWSM13SB.js"),__vite__mapDeps([0,1,2,3])).then(e=>new e.AppWeb)}),zr="BDA-IaH_jjWBRwHbuFcB56I25jKHpchx34yZtv_6iIo_yV2tz_yIZYS3hfntDaN5Slf4ch8ZEJCIt4D7LIWX4mY";let so=!1;async function Yo(){if(window.Capacitor&&window.Capacitor.isNativePlatform()){try{await G.removeAllListeners(),await G.addListener("registration",async a=>{Zo(a.value,!0)}),await G.addListener("pushNotificationReceived",a=>{console.log("[Push Nativo] Recebido em Foreground (Visual gerido pelo Firestore):",a)}),await G.addListener("pushNotificationActionPerformed",a=>{const o=a.notification.data;console.log("Notificação clicada (Ação):",o)});let t=await G.checkPermissions();t.receive==="prompt"&&(t=await G.requestPermissions()),t.receive==="granted"&&await G.register()}catch(t){console.error("[Push Nativo] Erro:",t)}return}"Notification"in window&&Notification.permission==="granted"&&Xo()}async function Qo(){try{return await Notification.requestPermission()==="granted"?(console.log("Permissão concedida pelo utilizador."),await Xo(),!0):(console.warn("Permissão de notificações negada."),!1)}catch(e){return console.error("Erro ao pedir permissão Web:",e),!1}}async function Xo(){if("serviceWorker"in navigator)try{const e=await navigator.serviceWorker.register("/firebase-messaging-sw.js");await e.update();const t=await Zs(_a,{vapidKey:zr,serviceWorkerRegistration:e});t?(console.log("[Push Web] Token validado."),await Zo(t,!1)):console.warn("[Push Web] Token veio vazio."),so||(Ks(_a,a=>{console.log("[Push Web] Recebido em Foreground (Silencioso):",a)}),so=!0)}catch(e){console.error("[Push Web] Falha no registo:",e)}else console.warn("Navegador sem suporte a Service Worker.")}async function Zo(e,t){const a=U.currentUser;if(!a){console.warn("Usuário não logado. Token não salvo.");return}const o=pe(W,"users",a.uid);try{const r=await jo(o);if(r.exists()){const n=r.data().fcmTokens||[];if(n.length===1&&n[0]===e){console.log("Token já sincronizado e único. Nenhuma ação necessária.");return}}await $a(o,{fcmTokens:[e],lastLoginAt:new Date().toISOString(),platform:t?"android_native":"pwa_web"}),console.log("Token atualizado (Sessão Única garantida).")}catch(r){if(r.code==="not-found")try{await Gs(o,{email:a.email,fcmTokens:[e],platform:t?"android_native":"pwa_web",createdAt:new Date().toISOString()},{merge:!0}),console.log("Utilizador criado e token inicial salvo.")}catch(s){console.error("Erro ao criar user:",s)}else console.error("Erro ao atualizar token:",r)}}const Vr=(e,t,a="all",o="all")=>{const r=new URLSearchParams({startDate:e,endDate:t});return a&&a!=="all"&&r.append("professionalId",a),o&&o!=="all"&&r.append("costCenterId",o),E(`/api/reports/indicators?${r.toString()}`)},Ur=e=>e?E(`/api/financial/cost-centers/${e}`):Promise.resolve([]),_r=({establishmentId:e,startDate:t,endDate:a,cashierSessionId:o})=>{const r=new URLSearchParams({startDate:t,endDate:a});return o&&o!=="all"&&r.append("cashierSessionId",o),e&&r.append("establishmentId",e),E(`/api/reports/sales?${r.toString()}`)},Wr=()=>E("/api/reports/summary",{method:"GET"}),Ut=(e,t,a,o="all")=>{const r=`/api/blockages/${e}?startDate=${t}&endDate=${a}&professionalId=${o}`;return E(r)},_t=e=>E("/api/blockages",{method:"POST",body:JSON.stringify(e)}),La=e=>E(`/api/blockages/${e}`,{method:"DELETE"}),Ko=e=>E("/api/blockages/batch-delete",{method:"POST",body:JSON.stringify({ids:e})}),Ta=e=>e?String(e).replace(/\D/g,""):"",Wt=(e,t="",a=20,o={})=>{const r=new URLSearchParams;return t&&r.append("search",t),a&&r.append("limit",a),o&&o.hasLoyalty&&r.append("hasLoyalty","true"),o&&o.birthMonth&&r.append("birthMonth",o.birthMonth),o&&o.inactiveDays&&r.append("inactiveDays",o.inactiveDays),E(`/api/clients/${e}?${r.toString()}`)},es=(e,t)=>{const a=encodeURIComponent(t);return E(`/api/clients/details/${e}/${a}`)},ts=e=>{const t=e.phone||e.id;if(!t)throw new Error("Telefone é obrigatório");const a=Ta(t),o={...e,phone:a,id:a};return E(`/api/clients/${a}`,{method:"PUT",body:JSON.stringify(o)})},Da=ts,as=(e,t)=>ts({...t,id:e}),Jr=e=>{const t=encodeURIComponent(e);return E(`/api/clients/${t}`,{method:"DELETE"})},Gr=(e,t,a,o)=>E("/api/clients/redeem",{method:"POST",body:JSON.stringify({establishmentId:e,clientPhone:Ta(t),points:a,rewardName:o})}),Yr=(e,t)=>es(e,Ta(t));function f(e){return e==null?"":String(e).replace(/[&<>'"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[t])}function os(e,t=800,a=800,o=.7){return new Promise((r,s)=>{if(!e.type.match(/image.*/))return s(new Error("O ficheiro selecionado não é uma imagem."));const n=new FileReader;n.readAsDataURL(e),n.onload=i=>{const d=new Image;d.src=i.target.result,d.onload=()=>{let l=d.width,c=d.height;l>c?l>t&&(c*=t/l,l=t):c>a&&(l*=a/c,c=a);const m=document.createElement("canvas");m.width=l,m.height=c,m.getContext("2d").drawImage(d,0,0,l,c);const b=m.toDataURL("image/jpeg",o);r(b)},d.onerror=l=>s(new Error("Erro ao carregar a imagem para processamento."))},n.onerror=i=>s(new Error("Erro ao ler o ficheiro."))})}const ro=document.getElementById("content");let no=!1;const ma=[{bg:"#e0e7ff",border:"#4f46e5",main:"#4f46e5"},{bg:"#d1fae5",border:"#059669",main:"#059669"},{bg:"#ffe4e6",border:"#e11d48",main:"#e11d48"},{bg:"#fef3c7",border:"#d97706",main:"#d97706"},{bg:"#cffafe",border:"#0e7490",main:"#0e7490"},{bg:"#e0f2fe",border:"#0284c7",main:"#0284c7"},{bg:"#ede9fe",border:"#7c3aed",main:"#7c3aed"},{bg:"#fce7f3",border:"#db2777",main:"#db2777"}];let mt=[],Jt=[],Ue={},Ne=[],L={currentView:"list",weekViewDays:7,currentDate:new Date,selectedProfessionalId:"all",profSearchTerm:"",showInactiveProfs:!1,scrollToAppointmentId:null,isSelectionMode:!1,selectedItems:new Set},I={step:1,data:{id:null,clientName:"",clientPhone:"",selectedServiceIds:[],professionalId:null,professionalName:"",date:null,time:null,redeemedReward:null,clientHasRewards:!1,clientLoyaltyPoints:0}};function Qr(e){return new Intl.DateTimeFormat("pt-BR",{day:"2-digit",month:"2-digit"}).format(e)}function ss(e){const t=new Date(e);if(t.setHours(0,0,0,0),L.currentView==="week"&&L.weekViewDays===7){const a=t.getDay(),o=t.getDate()-a+(a===0?-6:1);return new Date(t.setDate(o))}return t}function Mt(){const e=document.getElementById("profSelectorContainer"),t=L.profSearchTerm.toLowerCase();if(!e||!u.professionals)return;let a=u.professionals.filter(s=>L.showInactiveProfs||s.status!=="inactive");t&&(a=a.filter(s=>s.name.toLowerCase().includes(t)));const r=[...[{id:"all",name:"Todos",photo:null,status:"active"}],...a];e.innerHTML=r.map(s=>{const n=L.selectedProfessionalId===s.id,i=s.name==="Todos"?"Todos":s.name.split(" ")[0],d=s.name==="Todos"?"T":s.name.charAt(0).toUpperCase(),l=s.status!=="inactive",c=f(i),m=ma[0],p=s.id!=="all"&&u.professionalColors.get(s.id)||m,b=s.photo||`https://placehold.co/64x64/${p.main?.replace("#","")||"E0E7FF"}/${p.light?.replace("#","")||"4F46E5"}?text=${d}`,v=s.id==="all"?"#e0e7ff":p.light,h=s.id==="all"?"#4f46e5":p.main,w=`border: 3px solid ${n?p.border:"transparent"}; box-shadow: ${n?"0 0 0 2px "+p.border:"none"};`;return`
            <div class="prof-card flex-shrink-0 ${n?"selected":""} ${l?"":"opacity-50"}" 
                 data-action="select-professional" 
                 data-prof-id="${s.id}">
                ${s.id==="all"?`<div class="prof-card-all-placeholder" style="background-color: ${v}; color: ${h}; ${w}">
                           ${d}
                          </div>`:`<img src="${b}" alt="${c}" class="prof-card-photo" style="${w}" />`}
                <span class="prof-card-name">${c}</span>
            </div>
        `}).join("")}function Xr(e,t,a,o,r){const s=(e||"").replace(/\D/g,""),n=new Date(r).toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit"}),i=new Date(r).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),d=`Olá, ${t}! Você tem um agendamento de ${a} com o(a) profissional ${o} para o dia ${n} às ${i}. Podemos confirmar? Agradecemos a preferência!`,l=encodeURIComponent(d);return`https://wa.me/${s}?text=${l}`}function Zr(e){const t=document.getElementById("agenda-view");if(!t)return;if(e.sort((o,r)=>new Date(o.startTime)-new Date(r.startTime)),e.length===0){t.innerHTML='<div class="text-center p-10 text-gray-500"><svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path vector-effect="non-scaling-stroke" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg><h3 class="mt-2 text-sm font-medium text-gray-900">Nenhum agendamento ou bloqueio</h3><p class="mt-1 text-sm text-gray-500">Não há eventos para o dia e filtros selecionados.</p></div>';return}const a=e.map(o=>{const r=new Date(o.startTime),s=new Date(o.endTime),n=r.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),i=s.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),d=u.professionalColors.get(o.professionalId)||{},l=f(o.reason),c=f(o.professionalName),m=f(o.clientName),p=f(o.serviceName),b=L.selectedItems.has(o.id),v=L.isSelectionMode?`<div class="flex items-center justify-center pr-3 border-r border-gray-200 mr-3">
                 <input type="checkbox" class="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 cursor-pointer" 
                        data-action="toggle-select-item" 
                        data-id="${o.id}" 
                        ${b?"checked":""}>
               </div>`:"";if(o.type==="blockage")return`
                <div class="appointment-list-card bg-red-50" style="border-left-color: ${d.border};">
                    ${v}
                    <div class="time-info">
                        <p class="font-bold text-md">${n}</p>
                        <p class="text-xs text-gray-500">${i}</p>
                    </div>
                    <div class="details-info min-w-0">
                        <p class="font-bold text-red-800 truncate">${l}</p>
                        <p class="text-sm text-gray-600 truncate">com ${c}</p>
                    </div>
                    <div class="status-info">
                        <span class="status-badge bg-red-100 text-red-800">Bloqueio</span>
                    </div>
                </div>`;const h=o.status==="completed",y=h?"bg-green-100 text-green-800":"bg-yellow-100 text-yellow-800",w=h?"Finalizado":"Aberto",$=JSON.stringify(o).replace(/'/g,"&apos;"),k=o.redeemedReward?.points>0,C=o.hasRewards&&!k,T=Xr(o.clientPhone,o.clientName,o.serviceName,o.professionalName,o.startTime),A=L.isSelectionMode?"":'data-action="open-comanda"';return`
            <div class="appointment-list-card" data-appointment='${$}' style="border-left-color: ${d.border};">
                ${v}
                <div class="time-info" ${A}>
                    <p class="font-bold text-md">${n}</p>
                    <p class="text-xs text-gray-500">${i}</p>
                </div>
                <div class="details-info min-w-0" ${A}>
                    <p class="font-bold text-gray-800 truncate">${C?"🎁 ":""}${m}</p>
                    <p class="text-sm text-gray-600 truncate">${p}</p>
                    <p class="text-xs text-gray-500 truncate">com ${c||"Indefinido"}</p>
                    ${k?'<p class="text-xs font-semibold text-purple-600">Resgate de Prémio</p>':""}
                </div>
                <div class="status-info">
                    <span class="status-badge ${y} mb-1">${w}</span>
                    <div class="card-actions flex gap-1 items-center">
                        ${h?`
                            <button data-action="edit-appointment" data-appointment='${$}' class="action-btn opacity-40 cursor-not-allowed" title="Finalizado - Não editável" disabled><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z"></path></svg></button>
                        `:`
                            <a href="${T}" target="_blank" class="action-btn text-green-500 hover:text-green-700 p-1" title="Enviar Confirmação WhatsApp">
                                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12.036 2a10 10 0 100 20 10 10 0 000-20zM17.5 14.8c-.24.125-1.465.716-1.696.804-.23.09-.49.135-.75.045-.26-.09-.982-.322-1.87-.965-.888-.643-1.474-1.442-1.64-1.748-.166-.307-.015-.467.106-.615.116-.149.23-.388.344-.582.113-.193.15-.327.1-.462-.05-.136-.264-.322-.544-.654-.28-.332-.572-.782-.828-.958-.255-.176-.438-.158-.61-.158-.173 0-.374-.022-.574-.022-.2 0-.54.075-.826.375-.285.3-.99.965-.99 2.355 0 1.43 1.018 2.872 1.16 3.072.14.2 2 3.047 4.86 4.218 2.86 1.17 2.86.786 3.376 1.054.516.268 1.49.462 1.696.406.206-.057 1.463-.615 1.67-.887.2-.27.2-.504.14-.615-.058-.11-.23-.166-.48-.306z"/></svg>
                            </a>
                            <button data-action="edit-appointment" data-appointment='${$}' class="action-btn" title="Editar Agendamento"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z"></path></svg></button>
                        `}
                        <button data-action="delete-appointment" data-id="${o.id}" class="action-btn" title="Apagar Agendamento"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
                    </div>
                </div>
            </div>`}).join("");t.innerHTML=`<div class="list-view-container space-y-2 pb-24">${a}</div>`}function rs(){return L.weekViewDays}function Kr(e){const t=document.getElementById("agenda-view");if(!t)return;const a=["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"],o=ss(L.currentDate),r=rs(),i=100/(window.innerWidth<768?3:r),d=`flex: 0 0 ${i}%; width: ${i}%; max-width: ${i}%; box-sizing: border-box; overflow: hidden;`;let l=`
        <style>
            .agenda-scroll-container::-webkit-scrollbar { display: none; }
            .agenda-scroll-container { -ms-overflow-style: none; scrollbar-width: none; }
        </style>
        <div class="flex divide-x divide-gray-100 min-h-[65vh] overflow-x-auto overflow-y-hidden snap-x snap-mandatory agenda-scroll-container w-full" style="scroll-behavior: smooth;">
    `;for(let c=0;c<r;c++){const m=new Date(o);m.setDate(m.getDate()+c);const p=new Date,b=m.toDateString()===p.toDateString(),v=e.filter(w=>new Date(w.startTime).toDateString()===m.toDateString()).sort((w,$)=>new Date(w.startTime)-new Date($.startTime));let h='<div class="flex-grow overflow-y-auto overflow-x-hidden px-1 py-1.5 space-y-2 pb-24 min-w-0">';v.length>0?h+=v.map(w=>{const k=new Date(w.startTime).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),C=u.professionalColors.get(w.professionalId)||{main:"#9ca3af"},T=f(w.reason),A=f(w.professionalName||"Indefinido"),q=f(w.clientName),D=f(w.serviceName);if(w.type==="blockage")return`
                        <div class="relative p-1.5 rounded-md bg-red-50 border border-red-100 shadow-sm overflow-hidden min-w-0 w-full">
                            <div class="absolute left-0 top-0 bottom-0 w-1 bg-red-500"></div>
                            <div class="pl-1 min-w-0 flex flex-col">
                                <span class="font-bold text-[10px] text-red-900 tracking-tight block truncate">${k}</span>
                                <p class="font-bold text-[10px] text-red-800 truncate leading-tight mt-0.5 w-full">${T}</p>
                                <p class="text-[9px] text-red-600 truncate mt-1 w-full">${A}</p>
                            </div>
                        </div>
                    `;const M=JSON.stringify(w).replace(/'/g,"&apos;"),R=w.redeemedReward?.points>0,F=w.hasRewards&&!R,O=w.status==="completed";return`
                    <div class="relative p-1.5 rounded-md bg-white border border-gray-100 shadow-sm cursor-pointer hover:shadow-md transition-all duration-200 overflow-hidden min-w-0 w-full flex flex-col" 
                         data-action="open-comanda" data-appointment='${M}'>
                        
                        <div class="absolute left-0 top-0 bottom-0 w-1" style="background-color: ${C.main};"></div>

                        <div class="pl-1 min-w-0 w-full flex flex-col h-full justify-center">
                            <div class="flex justify-between items-center mb-0.5 min-w-0 gap-1">
                                <span class="font-bold text-[10px] text-gray-800 truncate flex-grow">${k}</span>
                                ${O?'<span class="text-[7px] font-bold bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded-sm leading-none flex-shrink-0">OK</span>':""}
                            </div>

                            <p class="font-bold text-[10px] text-gray-800 truncate leading-tight w-full">${F?"🎁 ":""}${q}</p>
                            <p class="text-[9px] text-gray-500 truncate mt-0.5 leading-tight w-full">${D}</p>
                            <p class="text-[8px] text-gray-400 truncate leading-none mt-1.5 w-full">${A.split(" ")[0]}</p>
                        </div>
                    </div>
                `}).join(""):h+=`
                <div class="flex flex-col items-center justify-center pt-8 opacity-40 min-w-0 w-full">
                    <span class="text-[10px] font-medium text-gray-400 truncate">Livre</span>
                </div>`,h+="</div>",l+=`
            <div class="flex flex-col snap-start shrink-0 relative" style="${d}">
                <div class="sticky top-0 z-10 text-center py-2 ${b?"bg-indigo-600 text-white shadow-md":"bg-gray-50/95 backdrop-blur-sm text-gray-700 border-b border-gray-200"}">
                    <p class="text-[9px] uppercase tracking-widest font-bold opacity-80 mb-0.5 leading-none">${a[m.getDay()]}</p>
                    <div class="flex items-baseline justify-center gap-0.5 mt-1">
                        <span class="text-[16px] font-extrabold leading-none">${m.getDate()}</span>
                    </div>
                </div>
                ${h}
            </div>
        `}l+="</div>",t.innerHTML=l,setTimeout(()=>{const c=t.querySelector(".agenda-scroll-container"),m=c?.querySelector(".bg-indigo-600");if(c&&m){const p=m.parentElement;c.scrollTo({left:p.offsetLeft,behavior:"smooth"})}},150)}function ns(){const e=u.allEvents.filter(t=>L.selectedProfessionalId==="all"||t.professionalId===L.selectedProfessionalId);L.currentView==="list"?Zr(e):Kr(e),Pa()}function Pa(){const e=document.getElementById("batch-delete-container"),t=document.querySelector('[data-action="new-appointment"]');e&&(L.isSelectionMode&&L.selectedItems.size>0?(e.innerHTML=`
            <div class="bg-white p-4 rounded-xl shadow-2xl border border-red-100 flex items-center justify-between gap-4">
                <span class="font-bold text-gray-800">${L.selectedItems.size} selecionado(s)</span>
                <button data-action="batch-delete" class="bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 shadow-md flex items-center gap-2">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    Excluir
                </button>
            </div>
        `,e.style.display="block",t&&(t.style.display="none")):(e.style.display="none",t&&(t.style.display="flex")))}async function oe(){const e=document.getElementById("agenda-view");if(!e)return;L.selectedItems.clear(),Pa(),e.innerHTML='<div class="loader mx-auto my-10"></div>';let t,a;const o=document.getElementById("weekRange");if(!o)return;if(L.currentView==="list")t=new Date(L.currentDate),t.setHours(0,0,0,0),a=new Date(L.currentDate),a.setHours(23,59,59,999),o.textContent=Qr(t);else{const s=rs();t=ss(new Date(L.currentDate)),a=new Date(t),a.setDate(t.getDate()+(s-1)),a.setHours(23,59,59,999);const n=t.toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit"}),i=a.toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit"});o.textContent=`${n} a ${i}`}const r=document.getElementById("dateFilterInput");if(r){const s=L.currentDate,n=s.getFullYear(),i=String(s.getMonth()+1).padStart(2,"0"),d=String(s.getDate()).padStart(2,"0");r.value=`${n}-${i}-${d}`}try{const s=await Vo(u.establishmentId,t.toISOString(),a.toISOString(),L.selectedProfessionalId==="all"?null:L.selectedProfessionalId),n=await Ut(u.establishmentId,t.toISOString(),a.toISOString(),L.selectedProfessionalId);if(!document.getElementById("agenda-view"))return;const i=n.map(l=>{let c=l.professionalName;if(!c&&l.professionalId){const m=u.professionals?u.professionals.find(p=>p.id===l.professionalId):null;m&&(c=m.name)}return{...l,type:"blockage",professionalName:c||"Não identificado"}}),d=[...s.map(l=>({...l,type:"appointment"})),...i];if(u.allEvents=d,Mt(),ns(),L.scrollToAppointmentId){const l=document.querySelector(`[data-appointment*='"id":"${L.scrollToAppointmentId}"']`);l&&(l.scrollIntoView({behavior:"smooth",block:"center"}),l.style.transition="background-color 0.5s ease-in-out",l.style.backgroundColor="#e0e7ff",setTimeout(()=>{l.style.backgroundColor=""},2500)),L.scrollToAppointmentId=null}}catch(s){document.getElementById("agenda-view")&&(document.getElementById("agenda-view").innerHTML='<div class="p-6 text-center text-red-600">Falha ao carregar dados.</div>',g("Erro na Agenda",`Não foi possível carregar a agenda: ${s.message}`,"error"))}}async function en(){try{const[e,t,a]=await Promise.all([u.professionals&&u.professionals.length>0?Promise.resolve(u.professionals):ee(u.establishmentId),u.services&&u.services.length>0?Promise.resolve(u.services):be(u.establishmentId),Ue.enabled!==void 0?Promise.resolve(null):Ee(u.establishmentId)]);(!u.professionals||u.professionals.length===0)&&(u.professionals=e||[]),(!u.services||u.services.length===0)&&(u.services=t||[]),Ne=[],a&&(Ue=a.loyaltyProgram||{enabled:!1}),u.professionals.forEach((o,r)=>{u.professionalColors.set(o.id,ma[r%ma.length])}),Mt()}catch(e){console.error("Erro ao popular filtros e dependências do modal:",e),g("Atenção","Não foi possível pré-carregar os dados para agendamento. A abertura do modal pode ser lenta.","error")}}function pa(e){e<1||e>4||(I.step=e,ga(null,!0))}function is(e,t){const a=document.getElementById("multiServiceToggle"),o=a&&a.checked,r=t.classList.contains("selected"),s=I.data.selectedServiceIds.indexOf(e);if(r)t.classList.remove("selected","border-blue-500"),s>-1&&I.data.selectedServiceIds.splice(s,1);else{if(!o){I.data.selectedServiceIds=[];const n=document.getElementById("apptServicesContainer");n&&n.querySelectorAll(".service-card.selected").forEach(i=>{i.classList.remove("selected","border-blue-500")})}t.classList.add("selected","border-blue-500"),I.data.selectedServiceIds.push(e)}}function ls(e,t){const a=document.querySelector(".professional-step-cards");if(!a)return;a.querySelectorAll(".professional-modal-card").forEach(r=>r.classList.remove("selected","border-blue-500")),t.classList.add("selected","border-blue-500");const o=Jt.find(r=>r.id===e);I.data.professionalId=e,I.data.professionalName=o?o.name:"N/A"}function tn(e,t){const a=document.getElementById("availableTimesContainer");a&&(a.querySelectorAll(".time-slot-card").forEach(o=>o.classList.remove("selected")),t.classList.add("selected"),I.data.time=e)}async function io(){const e=document.getElementById("apptTotalDuration"),t=document.getElementById("availableTimesContainer");if(!e||!t)return;const a=I.data.professionalId,o=I.data.selectedServiceIds,r=document.getElementById("apptDate").value;I.data.date=r;const s=o.reduce((n,i)=>{const d=mt.find(l=>l.id===i);return n+(d?d.duration+(d.bufferTime||0):0)},0);if(e.textContent=`${s} min`,s===0||!a||!r){t.innerHTML='<p class="col-span-full text-center text-gray-500">Selecione serviço, profissional e data.</p>';return}t.innerHTML='<div class="loader mx-auto col-span-full"></div>';try{let n=await ar({establishmentId:u.establishmentId,professionalId:a,serviceIds:o,date:r});const i=new Date;if(new Date(r+"T00:00:00").toDateString()===i.toDateString()){const l=i.getHours()*60+i.getMinutes();n=n.filter(c=>{const[m,p]=c.split(":").map(Number);return m*60+p>=l})}if(t.innerHTML="",n.length>0){if(n.forEach(l=>{const c=document.createElement("button");c.type="button",c.className=`time-slot-card p-2 text-sm bg-gray-100 rounded-md hover:bg-gray-200 transition ${I.data.time===l?"selected":""}`,c.textContent=l,c.addEventListener("click",()=>tn(l,c)),t.appendChild(c)}),I.data.time){const l=t.querySelector(`[data-action="time-slot"][data-time="${I.data.time}"]`);l&&l.classList.add("selected")}}else t.innerHTML='<p class="col-span-full text-center text-gray-500">Nenhum horário disponível.</p>'}catch(n){console.error("Erro ao buscar horários:",n),t.innerHTML='<p class="col-span-full text-center text-red-500">Erro ao buscar horários.</p>'}}function an(){const e=document.getElementById("loyaltyRewardsContainer");if(!e)return;const{clientHasRewards:t,clientLoyaltyPoints:a,redeemedReward:o}=I.data,{enabled:r,rewards:s}=Ue;if(!r||!t||!s||s.length===0){e.classList.add("hidden"),e.innerHTML="";return}e.classList.remove("hidden");const n=s.filter(d=>a>=d.points);let i=`
        <h4 class="text-md font-semibold text-gray-700 mb-2">🎁 Prêmios Disponíveis (${a} pontos)</h4>
    `;n.length>0?(i+='<div class="space-y-2">',i+=n.map(d=>{const l=o?.reward===d.reward,c=f(d.reward);return`
                <label class="flex items-center p-3 bg-white rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-50">
                    <input type="radio" name="loyaltyReward" class="form-radio text-indigo-600" 
                           value="${c}" 
                           data-points="${d.points}"
                           ${l?"checked":""}>
                    <span class="ml-3">
                        <span class="font-semibold text-gray-800">${c}</span>
                        <span class="text-sm text-gray-600"> (-${d.points} pontos)</span>
                    </span>
                </label>
            `}).join(""),i+="</div>"):i+='<p class="text-sm text-gray-600">Pontos insuficientes para resgatar os prêmios disponíveis.</p>',e.innerHTML=i,e.querySelectorAll('input[name="loyaltyReward"]').forEach(d=>{d.addEventListener("change",l=>{l.target.checked&&(I.data.redeemedReward={reward:l.target.value,points:parseInt(l.target.dataset.points,10)})})}),e.insertAdjacentHTML("beforeend",`
        <label class="flex items-center p-3 mt-2 bg-white rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-50">
            <input type="radio" name="loyaltyReward" class="form-radio text-gray-400" 
                   value="none" 
                   ${o?"":"checked"}>
            <span class="ml-3 text-gray-600">Não resgatar prêmio agora</span>
        </label>
    `),e.querySelector('input[value="none"]').addEventListener("change",d=>{d.target.checked&&(I.data.redeemedReward=null)})}async function on(e){e.preventDefault();const t=e.target,a=t.querySelector('button[type="submit"]');if(!I.data.time||I.data.selectedServiceIds.length===0||!I.data.professionalId)return g("Erro de Validação","Por favor, selecione o horário, serviço(s) e profissional antes de confirmar.","error");a.disabled=!0,a.textContent="A confirmar...";const o=I.data.selectedServiceIds.map(l=>{const c=mt.find(m=>m.id===l);return{id:c.id,name:c.name,price:c.price,duration:c.duration,bufferTime:c.bufferTime||0,photo:c.photo||null}}),[r,s]=I.data.time.split(":"),n=new Date(`${I.data.date}T${r}:${s}:00`),i={establishmentId:u.establishmentId,clientName:I.data.clientName,clientPhone:I.data.clientPhone,services:o,professionalId:I.data.professionalId,startTime:n.toISOString(),redeemedReward:I.data.redeemedReward},d=t.querySelector("#appointmentId").value;d&&(i.id=d);try{d?await sr(d,i):await or(i),g(`Agendamento ${d?"atualizado":"criado"} com sucesso!`,"success"),document.getElementById("appointmentModal").style.display="none",oe()}catch(l){g(l.message,"error")}finally{a.disabled=!1,a.textContent="Confirmar Agendamento"}}function ds(e){const t=I.data.clientName===e.name&&I.data.clientPhone===e.phone,a=f(e.name),o=f(e.phone);return`
        <div class="client-search-card p-3 bg-white rounded-lg border-2 border-gray-200 cursor-pointer transition-all hover:bg-blue-50 ${t?"selected border-blue-500":""}" 
             data-action="select-client" 
             data-client-name="${a}" 
             data-client-phone="${o}"
             data-client-id="${e.id}"
             data-loyalty-points="${e.loyaltyPoints||0}">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold">${a.charAt(0).toUpperCase()}</div>
                <div>
                    <p class="font-semibold text-gray-800">${a}</p>
                    <p class="text-sm text-gray-500">${o}</p>
                </div>
            </div>
        </div>
    `}async function sn(e){const t=document.getElementById("clientSearchResults");if(!t)return;const a=e.trim();if(a.length<3){t.innerHTML='<p class="text-sm text-gray-500">Digite pelo menos 3 caracteres para buscar clientes existentes.</p>';return}t.innerHTML='<div class="loader-small mx-auto my-2"></div>';try{const o=await Wt(u.establishmentId,a);if(Ne=o,o.length===0){t.innerHTML='<p class="text-sm text-gray-500">Nenhum cliente encontrado com este termo.</p>';return}t.innerHTML=o.map(ds).join(""),t.querySelectorAll('[data-action="select-client"]').forEach(r=>{r.addEventListener("click",s=>{const n=r.dataset.clientName,i=r.dataset.clientPhone,d=parseInt(r.dataset.loyaltyPoints||"0",10);I.data.clientName=n,I.data.clientPhone=i,I.data.clientLoyaltyPoints=d;const l=Ue,c=Math.min(...(l?.rewards||[]).map(m=>m.points));I.data.clientHasRewards=l.enabled&&c!==1/0&&I.data.clientLoyaltyPoints>=c,document.getElementById("apptClientName").value=n,document.getElementById("apptClientPhone").value=i,document.querySelectorAll(".client-search-card").forEach(m=>m.classList.remove("selected","border-blue-500")),r.classList.add("selected","border-blue-500")})})}catch(o){console.error("Erro na busca de clientes:",o),t.innerHTML='<p class="text-sm text-red-500">Erro ao buscar clientes.</p>'}}async function rn(e){e.preventDefault();const t=document.getElementById("clientRegistrationForm"),a=t.querySelector('button[type="submit"]'),o={establishmentId:u.establishmentId,name:t.querySelector("#regClientName").value.trim(),email:t.querySelector("#regClientEmail").value.trim(),phone:t.querySelector("#regClientPhone").value.trim(),dobDay:t.querySelector("#regClientDobDay").value.trim(),dobMonth:t.querySelector("#regClientDobMonth").value.trim(),notes:t.querySelector("#regClientNotes").value.trim()};if(!o.name||!o.phone)return g("Erro de Validação","Nome e Telefone são obrigatórios.","error");a.disabled=!0,a.textContent="A salvar...";try{await Da(o),Ne.push({name:o.name,phone:o.phone,loyaltyPoints:0}),I.data.clientName=o.name,I.data.clientPhone=o.phone,I.data.clientHasRewards=!1,I.data.clientLoyaltyPoints=0,g("Cliente cadastrado com sucesso!","success"),document.getElementById("genericModal").style.display="none",pa(1)}catch(r){g(`Erro ao cadastrar cliente: ${r.message}`,"error")}finally{a.disabled=!1,a.textContent="Salvar"}}function nn(){_({title:"Cadastrar Novo Cliente",contentHTML:`
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
    `,maxWidth:"max-w-2xl"});const t=document.getElementById("clientRegistrationForm");t&&t.addEventListener("submit",rn)}function ln(){nn()}function dn(e,t){const a=e?"Editar Agendamento":"Selecionar Cliente",o=`
        <div class="p-5 space-y-6">
            <h3 class="text-xl font-bold text-gray-800">1. Dados do Cliente</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label for="apptClientName" class="block text-sm font-medium text-gray-700">Nome Completo</label>
                    <input type="text" id="apptClientName" required class="mt-1 block w-full p-3 rounded-lg border-gray-300 shadow-sm" placeholder="Nome Completo" value="${f(I.data.clientName)}">
                </div>
                <div>
                    <label for="apptClientPhone" class="block text-sm font-medium text-gray-700">Telemóvel</label>
                    <input type="tel" id="apptClientPhone" required class="mt-1 block w-full p-3 rounded-lg border-gray-300 shadow-sm" placeholder="(XX) XXXXX-XXXX" value="${f(I.data.clientPhone)}">
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
    `;return{title:a,content:o}}function cn(){const e="Selecionar Serviço",a=`
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
                 ${mt.map(o=>{const r=I.data.selectedServiceIds.includes(o.id),s=o.photo||"https://placehold.co/40x40/E0E7FF/4F46E5?text=S",n=f(o.name);return`
                         <div class="service-card p-3 bg-white rounded-lg border-2 border-gray-200 cursor-pointer transition-all hover:bg-gray-50 ${r?"selected border-blue-500":""}" data-service-id="${o.id}">
                             <div class="flex items-center">
                                 <img src="${s}" class="w-8 h-8 rounded-full object-cover mr-3 flex-shrink-0">
                                 <div class="flex-1">
                                     <p class="font-semibold text-sm text-gray-800">${n}</p>
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
    `;return{title:e,content:a}}function un(){const e="Selecionar Profissional",t=`
        <div class="p-5 space-y-6">
             <h3 class="text-xl font-bold text-gray-800">3. Profissional</h3>
             <div id="apptProfessionalContainer" class="mt-4 flex flex-wrap gap-3 max-h-48 overflow-y-auto p-1 professional-step-cards">
                 ${Jt.map(a=>{const o=I.data.professionalId===a.id,r=a.photo||"https://placehold.co/60x60/E0E7FF/4F46E5?text=P",s=f(a.name);return`
                         <div class="professional-modal-card p-3 bg-white rounded-lg border-2 border-gray-200 text-center cursor-pointer transition-all hover:bg-gray-50 ${o?"selected border-blue-500":""}" data-professional-id="${a.id}">
                             <img src="${r}" class="w-12 h-12 rounded-full object-cover mx-auto mb-1">
                             <p class="text-xs font-semibold text-gray-800">${s.split(" ")[0]}</p>
                             <p class="text-[10px] text-gray-500">${f(a.specialty||"Profissional")}</p>
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
    `;return{title:e,content:t}}function mn(e){const t=e?"Confirmar Edição":"Data e Horário",a=new Date,o=`${a.getFullYear()}-${String(a.getMonth()+1).padStart(2,"0")}-${String(a.getDate()).padStart(2,"0")}`,r=I.data.date||o,s=f(I.data.clientName),n=f(I.data.professionalName),i=`
        <div class="p-5 space-y-6">
            <h3 class="text-xl font-bold text-gray-800">4. ${t}</h3>

            <div class="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400 space-y-1">
                <p class="font-bold text-gray-800">${s}</p>
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
    `;return{title:t,content:i}}function pn(e){const t=document.getElementById("apptServicesContainer");if(!t)return;const a=e.toLowerCase(),o=mt.filter(r=>r.name.toLowerCase().includes(a));t.innerHTML=o.map(r=>{const s=I.data.selectedServiceIds.includes(r.id),n=r.photo||"https://placehold.co/40x40/E0E7FF/4F46E5?text=S";return`
            <div class="service-card p-3 bg-white rounded-lg border-2 border-gray-200 cursor-pointer transition-all hover:bg-gray-50 ${s?"selected border-blue-500":""}" data-service-id="${r.id}">
                <div class="flex items-center">
                    <img src="${n}" class="w-8 h-8 rounded-full object-cover mr-3 flex-shrink-0">
                    <div class="flex-1">
                        <p class="font-semibold text-sm text-gray-800">${f(r.name)}</p>
                        <p class="text-xs text-gray-500">R$ ${r.price.toFixed(2)} (${r.duration} min)</p>
                    </div>
                </div>
            </div>`}).join(""),t.querySelectorAll(".service-card").forEach(r=>{r.addEventListener("click",()=>is(r.dataset.serviceId,r))})}function gn(e){const t=document.getElementById("apptProfessionalContainer");if(!t)return;const a=e.toLowerCase(),o=Jt.filter(r=>r.name.toLowerCase().includes(a));t.innerHTML=o.map(r=>{const s=I.data.professionalId===r.id,n=r.photo||"https://placehold.co/60x60/E0E7FF/4F46E5?text=P",i=f(r.name);return`
             <div class="professional-modal-card p-3 bg-white rounded-lg border-2 border-gray-200 text-center cursor-pointer transition-all hover:bg-gray-50 ${s?"selected border-blue-500":""}" data-professional-id="${r.id}">
                 <img src="${n}" class="w-12 h-12 rounded-full object-cover mx-auto mb-1">
                 <p class="text-xs font-semibold text-gray-800">${i.split(" ")[0]}</p>
                 <p class="text-[10px] text-gray-500">${f(r.specialty||"Profissional")}</p>
             </div>`}).join(""),t.querySelectorAll(".professional-modal-card").forEach(r=>{r.addEventListener("click",()=>ls(r.dataset.professionalId,r))})}async function ga(e=null,t=!1){const a=document.getElementById("appointmentModal");if(!t){const s=e?.startTime?new Date(e.startTime).toISOString().split("T")[0]:new Date().toISOString().split("T")[0],n=e?.startTime?new Date(e.startTime).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit",hour12:!1}):null;if(I={step:1,data:{id:e?.id||null,clientName:e?.clientName||"",clientPhone:e?.clientPhone||"",selectedServiceIds:e?.services?.map(i=>i.id)||[],professionalId:e?.professionalId||null,professionalName:e?.professionalName||"",date:s,time:n,redeemedReward:e?.redeemedReward||null,clientHasRewards:e?.hasRewards||!1,clientLoyaltyPoints:0}},e&&e.clientName)try{const i=await Wt(u.establishmentId,e.clientName),d=i.find(l=>l.phone===e.clientPhone);d&&(I.data.clientLoyaltyPoints=d.loyaltyPoints||0,Ne=i)}catch(i){console.warn("Não foi possível carregar pontos do cliente para edição:",i)}}if(!u.services||!u.professionals||Ue.enabled===void 0){g("Erro","Os dados da agenda ainda não foram carregados. Tente novamente em alguns segundos.","error");return}if(mt=u.services,Jt=u.professionals.filter(s=>s.status==="active"),I.data.clientLoyaltyPoints>0){const s=Ue,n=Math.min(...(s?.rewards||[]).map(i=>i.points));I.data.clientHasRewards=s.enabled&&n!==1/0&&I.data.clientLoyaltyPoints>=n}let o={title:"Erro",content:"<p>Etapa não encontrada.</p>"};switch(I.step){case 1:o=dn(e);break;case 2:o=cn();break;case 3:o=un();break;case 4:o=mn(e);break}a.innerHTML=`
        <div class="modal-content max-w-4xl p-0 rounded-xl overflow-hidden shadow-2xl">
            <header class="p-5 border-b flex justify-between items-center bg-gray-50">
                <h2 class="text-xl font-bold text-gray-800">${o.title}</h2>
                <button type="button" data-action="close-modal" data-target="appointmentModal" class="text-2xl font-bold text-gray-500 hover:text-gray-900">&times;</button>
            </header>
            
            <form id="appointmentForm" class="flex flex-col h-full">
                <input type="hidden" id="appointmentId" value="${I.data.id||""}">
                <input type="hidden" id="selectedTime" value="${I.data.time||""}">
                
                <div class="flex-1 overflow-y-auto" style="max-height: 80vh;">
                    ${o.content}
                </div>
                
            </form>
        </div>`,a.querySelectorAll('[data-action="next-step"]').forEach(s=>{s.addEventListener("click",()=>{const n=parseInt(s.dataset.currentStep,10);if(n===1){const i=a.querySelector("#apptClientName"),d=a.querySelector("#apptClientPhone");if(I.data.clientName=i.value.trim(),I.data.clientPhone=d.value.trim(),!I.data.clientName||!I.data.clientPhone)return g("Atenção","Nome e telefone do cliente são obrigatórios.","error")}else if(n===2){if(I.data.selectedServiceIds.length===0)return g("Atenção","Selecione pelo menos um serviço.","error")}else if(n===3&&!I.data.professionalId)return g("Atenção","Selecione um profissional.","error");pa(n+1)})}),a.querySelectorAll('[data-action="prev-step"]').forEach(s=>{s.addEventListener("click",()=>pa(parseInt(s.dataset.currentStep,10)-1))});const r=a.querySelector("#appointmentForm");if(I.step===4&&r&&r.addEventListener("submit",on),a.style.display="flex",I.step===2){a.querySelector("#apptServicesContainer").querySelectorAll(".service-card").forEach(i=>{i.addEventListener("click",()=>is(i.dataset.serviceId,i))});const n=a.querySelector("#serviceSearchModalInput");n&&n.addEventListener("input",i=>pn(i.target.value))}if(I.step===3){a.querySelector("#apptProfessionalContainer").querySelectorAll(".professional-modal-card").forEach(i=>{i.addEventListener("click",()=>ls(i.dataset.professionalId,i))});const n=a.querySelector("#professionalSearchModalInput");n&&n.addEventListener("input",i=>gn(i.target.value))}if(I.step===1){const s=a.querySelector("#clientSearchInput");if(s&&(s.addEventListener("input",i=>sn(i.target.value)),I.data.clientName&&I.data.clientPhone&&Ne.length>0)){const i=document.getElementById("clientSearchResults");i&&(i.innerHTML=Ne.map(ds).join(""))}const n=a.querySelector('[data-action="open-client-registration"]');n&&n.addEventListener("click",ln)}if(I.step===4){const s=a.querySelector("#apptDate");s&&s.addEventListener("change",io),io(),an()}}async function cs(e={}){L.currentDate=e.targetDate?new Date(e.targetDate):L.currentDate||new Date,L.scrollToAppointmentId=e.scrollToAppointmentId||null,L.profSearchTerm="",L.isSelectionMode=!1,L.selectedItems.clear(),window.innerWidth<768&&(L.currentView="list"),ro.innerHTML=`
        <style>
            .agenda-scroll-container::-webkit-scrollbar { display: none; }
            .agenda-scroll-container { -ms-overflow-style: none; scrollbar-width: none; }
            .custom-scrollbar::-webkit-scrollbar { height: 4px; width: 4px; }
            .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 4px; }
            
            /* Switch toggle customizado */
            .toggle-bg::after { content: ''; position: absolute; top: 2px; left: 2px; width: 16px; height: 16px; background: white; border-radius: 50%; transition: transform 0.3s; }
            #showInactiveProfsToggle:checked + .toggle-bg { background-color: #4f46e5; }
            #showInactiveProfsToggle:checked + .toggle-bg::after { transform: translateX(100%); }
        </style>
        
        <section class="w-full flex flex-col gap-3 pb-20 overflow-hidden">
            
            <div class="bg-white p-3 rounded-xl shadow-sm border border-gray-100 w-full flex-shrink-0 z-10 transition-all duration-300">
                
                <div class="flex items-center justify-between gap-2 w-full">
                    
                    <div class="flex items-center gap-2 min-w-0">
                        <span id="weekRange" class="font-bold text-gray-800 text-sm sm:text-base flex-shrink-0"></span>
                        <input type="date" id="dateFilterInput" class="p-1 text-xs border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white w-[110px] cursor-pointer flex-shrink-0" title="Ir para a data">
                    </div>
                    
                    <button id="btn-toggle-filters" class="p-1.5 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors flex items-center justify-center gap-1 flex-shrink-0" title="Filtros e Opções">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>
                        <span class="text-xs font-semibold hidden sm:inline">Opções</span>
                    </button>
                </div>

                <div id="filters-panel" class="hidden flex-col gap-3 pt-3 mt-3 border-t border-gray-100">
                    <div class="flex flex-wrap items-center gap-2">
                        <button id="todayBtn" class="p-1.5 px-3 border rounded-md shadow-sm text-xs font-semibold bg-white text-gray-700 hover:bg-gray-50">Hoje</button>
                        
                        <div class="flex items-center gap-1 rounded-md bg-gray-200 p-1">
                            <button data-view="list" class="view-btn text-xs px-3 py-1 rounded-sm ${L.currentView==="list"?"bg-white shadow-sm":"text-gray-600"}">Lista</button>
                            <button data-view="week" class="view-btn text-xs px-3 py-1 rounded-sm ${L.currentView==="week"?"bg-white shadow-sm":"text-gray-600"}">Semana</button>
                        </div>
                        
                        <div id="week-days-toggle" class="${L.currentView==="week"?"flex":"hidden"} items-center gap-1 rounded-md bg-gray-200 p-1">
                            <button data-days="3" class="week-days-btn view-btn text-xs px-2 py-1 rounded-sm">3 dias</button>
                            <button data-days="5" class="week-days-btn view-btn text-xs px-2 py-1 rounded-sm hidden sm:block">5 dias</button>
                            <button data-days="7" class="week-days-btn view-btn text-xs px-2 py-1 rounded-sm hidden sm:block">7 dias</button>
                        </div>

                        <button id="btn-toggle-select" class="p-1.5 px-3 border rounded-md shadow-sm bg-gray-50 text-gray-700 hover:bg-gray-100 flex items-center gap-1 text-xs font-semibold transition-colors">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
                            Excluir Múltiplos
                        </button>
                    </div>

                    <div class="flex flex-col sm:flex-row sm:items-center gap-3">
                        <input type="search" id="profSearchInput" placeholder="Pesquisar profissional pelo nome..." class="w-full sm:flex-grow p-2 border rounded-md shadow-sm text-xs focus:ring-indigo-500 focus:border-indigo-500">
                        <label class="flex items-center gap-2 cursor-pointer flex-shrink-0">
                            <div class="relative">
                                <input type="checkbox" id="showInactiveProfsToggle" class="sr-only">
                                <div class="toggle-bg block bg-gray-300 w-10 h-5 rounded-full"></div>
                            </div>
                            <span class="text-xs font-medium text-gray-700">Exibir Inativos</span>
                        </label>
                    </div>
                </div>

                <div class="border-t border-gray-100 mt-3 pt-2">
                    <div id="profSelectorContainer" class="flex overflow-x-auto custom-scrollbar pb-2 items-start gap-2">
                        <div class="loader mx-auto"></div>
                    </div>
                </div>

            </div> 
            
            <div id="agenda-view" class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden relative w-full"></div>
            
            <button data-action="new-appointment" class="fixed bottom-6 right-6 sm:bottom-10 sm:right-10 bg-indigo-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-xl hover:bg-indigo-700 transition z-50 transform hover:scale-105">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                </svg>
            </button>

            <div id="batch-delete-container" class="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 hidden w-[90%] max-w-md"></div>
        </section>`;const t=document.getElementById("btn-toggle-filters"),a=document.getElementById("filters-panel");t&&a&&t.addEventListener("click",()=>{a.classList.toggle("hidden"),a.classList.toggle("flex"),t.classList.toggle("bg-blue-50"),t.classList.toggle("text-blue-600"),t.classList.toggle("border-blue-300")});const o=document.getElementById("btn-toggle-select");o.addEventListener("click",()=>{L.isSelectionMode=!L.isSelectionMode,L.isSelectionMode||L.selectedItems.clear(),o.classList.toggle("bg-blue-100",L.isSelectionMode),o.classList.toggle("text-blue-700",L.isSelectionMode),o.classList.toggle("border-blue-300",L.isSelectionMode),ns()}),document.querySelectorAll(".view-btn[data-view]").forEach(r=>{r.addEventListener("click",()=>{document.querySelectorAll(".view-btn[data-view]").forEach(n=>n.classList.remove("bg-white","shadow-sm")),r.classList.add("bg-white","shadow-sm"),L.currentView=r.dataset.view;const s=document.getElementById("week-days-toggle");if(L.currentView==="week"){if(s.classList.remove("hidden"),s.classList.add("flex"),window.innerWidth<768){L.weekViewDays=7,document.querySelectorAll(".week-days-btn").forEach(i=>i.classList.remove("bg-white","shadow-sm"));const n=document.querySelector('.week-days-btn[data-days="7"]');n&&n.classList.add("bg-white","shadow-sm")}}else s.classList.remove("flex"),s.classList.add("hidden");oe()})}),document.querySelectorAll(".week-days-btn").forEach(r=>{r.addEventListener("click",()=>{document.querySelectorAll(".week-days-btn").forEach(s=>s.classList.remove("bg-white","shadow-sm")),r.classList.add("bg-white","shadow-sm"),L.weekViewDays=parseInt(r.dataset.days,10),oe()})}),document.getElementById("todayBtn").addEventListener("click",()=>{L.currentDate=new Date,oe()}),document.getElementById("dateFilterInput").addEventListener("change",r=>{if(r.target.value){const[s,n,i]=r.target.value.split("-");L.currentDate=new Date(s,n-1,i),oe()}}),document.getElementById("profSearchInput").addEventListener("input",r=>{L.profSearchTerm=r.target.value,Mt()}),document.getElementById("showInactiveProfsToggle").addEventListener("change",r=>{L.showInactiveProfs=r.target.checked,Mt(),oe()}),no||(ro.addEventListener("click",async r=>{const s=r.target.closest("[data-action]");if(r.target.dataset.action==="toggle-select-item"){const l=r.target.dataset.id;r.target.checked?L.selectedItems.add(l):L.selectedItems.delete(l),Pa();return}if(s&&s.dataset.action==="batch-delete"){const l=L.selectedItems.size;if(await H("Excluir em Lote",`Tem certeza que deseja excluir ${l} agendamento(s)? Esta ação não pode ser desfeita.`)){const m=Array.from(L.selectedItems);let p=0;try{await Promise.all(m.map(async v=>{try{await Ga(v),p++}catch(h){console.error(`Falha ao excluir ${v}`,h)}})),g(`${p} agendamento(s) excluído(s).`,"success"),L.selectedItems.clear(),L.isSelectionMode=!1;const b=document.getElementById("btn-toggle-select");b&&b.classList.remove("bg-blue-100","text-blue-700","border-blue-300"),oe()}catch{g("Erro ao processar exclusão em lote.","error")}}return}if(r.target.closest('[data-action="select-professional"]')){const c=r.target.closest('[data-action="select-professional"]').dataset.profId,m=L.selectedProfessionalId===c&&c!=="all";if(L.selectedProfessionalId=m?"all":c,c!=="all"){const p=document.getElementById("profSearchInput");p&&(p.value=""),L.profSearchTerm=""}await oe();return}if(!s)return;const n=s.dataset.action;let i=null;const d=r.target.closest("[data-appointment]");switch(d&&(i=JSON.parse(d.dataset.appointment.replace(/&apos;/g,"'"))),n){case"new-appointment":ga();break;case"edit-appointment":if(L.isSelectionMode||!i)return;if(i.status==="completed"){g("Atenção","Agendamentos finalizados não podem ser editados.","error");return}i.hasRewards&&!i.redeemedReward&&g("🎁 Cliente com Prêmios!","Este cliente tem pontos para resgatar. Verifique a Etapa 4 do agendamento.","info"),ga(i);break;case"delete-appointment":{if(L.isSelectionMode)return;const l=s.dataset.id;if(await H("Confirmar Exclusão","Tem a certeza que deseja apagar este agendamento?"))try{await Ga(l),g("Agendamento apagado!","success"),oe()}catch(m){g(`Não foi possível apagar: ${m.message}`,"error")}break}case"open-comanda":if(L.isSelectionMode)return;if(i){i.hasRewards&&!i.redeemedReward&&i.status!=="completed"&&g("🎁 Cliente com Prêmios!","Este cliente tem pontos de fidelidade para resgatar.","info");const l=i.status==="completed"?"finalizadas":"em-atendimento",c={selectedAppointmentId:i.id,initialFilter:l};if(l==="finalizadas"){let m=i.startTime;if(i.transaction&&i.transaction.paidAt){const p=i.transaction.paidAt;typeof p=="object"&&p._seconds?m=new Date(p._seconds*1e3):m=p}c.filterDate=m}K("comandas-section",c)}break}}),no=!0),await en(),await oe()}const bn=(e,t=null,a=1,o=12)=>{let r=`/api/comandas/${e}?page=${a}&limit=${o}`;return t&&(r+=`&date=${t}`),E(r)},fn=(e,t)=>E(`/api/appointments/${e}/comanda`,{method:"POST",body:JSON.stringify({items:t})}),vn=e=>E("/api/sales",{method:"POST",body:JSON.stringify(e)}),hn=e=>E(`/api/sales/${e}`,{method:"DELETE"}),xn=()=>E("/api/cashier/status").catch(e=>{if(e.message.includes("404")||e.message.includes("não encontrada"))return null;throw e}),yn=e=>{const t={establishmentId:e.establishmentId,initialAmount:Number(e.initialAmount),notes:e.notes||""};return console.log("Payload enviado para abrir caixa:",t),E("/api/cashier/open",{method:"POST",body:JSON.stringify(t)})},wn=(e,t)=>{const a={finalAmount:Number(t)};return console.log("Payload enviado para fechar caixa:",a),E(`/api/cashier/close/${e}`,{method:"PUT",body:JSON.stringify(a)})},kn=()=>E("/api/cashier/history").then(e=>e||[]).catch(e=>(console.error("Erro ao buscar histórico:",e),[])),Sn=e=>E(`/api/cashier/report/${e}`),Ba=e=>E(`/api/packages/${e}`),$n=e=>E("/api/packages",{method:"POST",body:JSON.stringify(e)}),En=(e,t)=>E(`/api/packages/${e}`,{method:"PUT",body:JSON.stringify(t)}),In=e=>E(`/api/packages/${e}`,{method:"DELETE"});let x={allComandas:[],catalog:{services:[],products:[],packages:[]},activeFilter:"atendimento",selectedComandaId:null,viewMode:"items",isCashierOpen:!1,activeCashierSessionId:null,loyaltySettings:null,pendingRedemption:null,paging:{page:1,limit:10,total:0},checkoutState:{payments:[],selectedMethod:"dinheiro",installments:1,amountReceived:"",discount:{type:"real",value:0},discountReason:""},isProcessing:!1},Ce=null,Te=null,lo=null;function us(e,t){return function(...a){clearTimeout(lo),lo=setTimeout(()=>e.apply(this,a),t)}}async function co(e,t="stay"){if(!e||!e.id)return;e._localUpdatedAt=Date.now(),e._cachedItems=null,e._hasUnsavedChanges=!1,lt(),t==="checkout"&&(x.viewMode="checkout",x.checkoutState.payments||(x.checkoutState.payments=[]),x.checkoutState.selectedMethod="dinheiro",x.checkoutState.amountReceived="",x.checkoutState.discount.value||(x.checkoutState.discount={type:"real",value:0},x.checkoutState.discountReason=""),V());const a=document.createElement("div");a.id="saving-overlay",a.className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center backdrop-blur-sm",a.innerHTML=`
        <div class="bg-white p-6 rounded-2xl shadow-2xl flex flex-col items-center animate-fade-in">
            <div class="loader mb-4 border-t-indigo-600"></div>
            <p class="text-gray-800 font-bold text-lg">Sincronizando...</p>
        </div>
    `,document.body.appendChild(a);try{const o=(e.comandaItems||[]).filter(r=>r&&r.id&&String(r.id)!=="undefined"&&String(r.id)!=="null").map(r=>{const s={...r};if(s.id=String(r.id),s.type==="product"){const n=s.id;s.productId||(s.productId=n),s.product_id||(s.product_id=n)}if(s.type==="service"){const n=s.id;s.serviceId||(s.serviceId=n),s.service_id||(s.service_id=n)}return s});e.type==="walk-in"&&String(e.id).startsWith("temp-")||await fn(e.id,o),document.body.contains(a)&&document.body.removeChild(a),t!=="checkout"&&(g("Sucesso","Comanda atualizada!","success"),V())}catch(o){document.body.contains(a)&&document.body.removeChild(a),console.error("Erro ao salvar:",o),e._hasUnsavedChanges=!0,V(),g("Erro","Falha ao salvar no servidor: "+o.message,"warning")}}function Se(e){if(!e._cachedItems){let t=[];if(e.status==="completed"){const a=e.comandaItems||e.items||[];t=a.length>0?a:e.services||[]}else{const a=(e.services||[]).map(n=>({...n,_source:"original_service",type:"service"})),o=a.reduce((n,i)=>{const d=String(i.id);return n[d]=(n[d]||0)+1,n},{}),r=[...e.comandaItems||[],...e.items||[]],s=[];r.forEach(n=>{const i=String(n.id);(n.type==="service"||!n.type)&&o[i]>0?o[i]--:s.push({...n,_source:"extra"})}),t=[...a,...s]}return e._cachedItems=t,e._cachedTimestamp=Date.now(),t}return e._cachedItems}function Cn(){const e=document.getElementById("comandas-layout");if(e){e.classList.add("detail-view-active");const t=document.getElementById("comanda-detail-container");t&&(t.scrollTop=0)}}function De(){const e=document.getElementById("comandas-layout");e&&e.classList.remove("detail-view-active")}function Ln(){const e=new Date().toISOString().split("T")[0];Te.innerHTML=`
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
    `,Gt()}function Gt(){const e=document.getElementById("cashier-alert-box"),t=document.getElementById("btn-new-sale");x.isCashierOpen?(e&&(e.innerHTML=""),t&&(t.classList.remove("opacity-50","cursor-not-allowed"),t.disabled=!1)):(e&&(e.innerHTML=`
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
        `),t&&(t.classList.add("opacity-50","cursor-not-allowed"),t.disabled=!0)),Tn()}function Tn(){const e=document.getElementById("cashier-controls");e&&(x.isCashierOpen?e.innerHTML=`
            <span class="hidden sm:inline-block text-sm font-medium text-green-700 bg-green-100 py-1 px-3 rounded-full border border-green-200">Caixa Aberto</span>
            <button data-action="close-cashier" class="py-2 px-4 bg-red-100 text-red-700 font-semibold rounded-lg hover:bg-red-200 text-sm transition">Fechar Caixa</button>
            <button data-action="view-sales-report" class="py-2 px-4 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 text-sm transition">Relatório</button>
        `:e.innerHTML=`
            <span class="hidden sm:inline-block text-sm font-medium text-red-700 bg-red-100 py-1 px-3 rounded-full border border-red-200">Caixa Fechado</span>
            <button data-action="open-cashier" class="py-2 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 text-sm shadow transition">Abrir Caixa</button>
            <button data-action="view-sales-report" class="py-2 px-4 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 text-sm transition">Relatório</button>
        `)}function lt(){const e=document.getElementById("comandas-list"),t=document.getElementById("pagination-container");if(!e)return;if(!x.isCashierOpen&&x.activeFilter==="atendimento"){e.innerHTML=`
            <div class="text-center py-10 opacity-60">
                <svg class="w-12 h-12 mx-auto text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                <p class="text-sm font-medium text-gray-700">Caixa Fechado</p>
                <p class="text-xs text-gray-500">Abra o caixa para ver as vendas</p>
            </div>
        `,t&&(t.innerHTML="");return}const o={atendimento:"confirmed",finalizadas:"completed"}[x.activeFilter],r=x.allComandas.filter(n=>n.status===o);if(r.length===0){e.innerHTML='<p class="text-center text-gray-400 py-10 text-sm">Nenhuma venda encontrada.</p>',uo(t);return}const s=document.createDocumentFragment();r.forEach(n=>{const i=Se(n);let d=0;n.status==="completed"&&n.totalAmount!==void 0&&n.totalAmount!==null?d=Number(n.totalAmount):d=i.reduce(($,k)=>$+Number(k.price||0),0);const c=n.loyaltyRedemption||n.discount&&n.discount.reason&&String(n.discount.reason).toLowerCase().includes("fidelidade")?'<span class="inline-flex items-center justify-center bg-yellow-100 text-yellow-700 rounded-full w-5 h-5 ml-2" title="Prémio Resgatado">🎁</span>':"",m=n.id===x.selectedComandaId,p=new Date(n.startTime).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),b=n.type==="walk-in"||typeof n.id=="string"&&n.id.startsWith("temp-"),v=f(n.clientName||"Cliente sem nome"),h=f(n.professionalName||"Sem profissional"),y=b?'<span class="text-[10px] font-bold uppercase text-blue-600 bg-blue-100 px-2 py-0.5 rounded-md border border-blue-200">Avulso</span>':'<span class="text-[10px] font-bold uppercase text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded-md border border-indigo-200">Agenda</span>',w=document.createElement("div");w.className=`comanda-card cursor-pointer ${m?"selected":""}`,w.dataset.action="select-comanda",w.dataset.comandaId=n.id,w.innerHTML=`
            <div class="flex justify-between items-start mb-1 pointer-events-none">
                <p class="font-bold text-gray-800 truncate max-w-[70%] text-sm">${v}</p>
                <div class="flex items-center">
                    <p class="font-bold text-gray-900 text-sm">R$ ${d.toFixed(2)}</p>
                    ${c}
                </div>
            </div>
            <div class="flex justify-between items-center mt-1 pointer-events-none">
                <div class="flex items-center gap-2">
                    ${y}
                    <p class="text-xs text-gray-500 truncate max-w-[100px]">${h}</p>
                </div>
                <p class="text-xs text-gray-400 font-medium">${p}</p> 
            </div>
        `,s.appendChild(w)}),e.innerHTML="",e.appendChild(s),uo(t)}function uo(e){if(!e)return;e.innerHTML="";const{page:t,total:a,limit:o}=x.paging,r=Math.ceil((a||0)/o);if(r===0)return;const s=document.createElement("div");s.className="flex gap-2 justify-center items-center w-full",s.innerHTML=`
        <button data-page="${t-1}" class="px-3 py-1 rounded bg-white border border-gray-300 hover:bg-gray-100 text-sm font-medium ${t<=1?"opacity-50 cursor-not-allowed":""}" ${t<=1?"disabled":""}>&laquo;</button>
        <span class="text-xs font-semibold text-gray-600 mx-2">Pág ${t} de ${r||1}</span>
        <button data-page="${t+1}" class="px-3 py-1 rounded bg-white border border-gray-300 hover:bg-gray-100 text-sm font-medium ${t>=r?"opacity-50 cursor-not-allowed":""}" ${t>=r?"disabled":""}>&raquo;</button>
    `,e.appendChild(s),s.querySelectorAll("button[data-page]").forEach(n=>{n.onclick=i=>{i.stopPropagation();const d=parseInt(n.dataset.page,10);d>0&&d<=r&&(x.paging.page=d,ne())}})}function V(){const e=document.getElementById("comanda-detail-container");if(!e)return;const t=x.allComandas.find(h=>h.id===x.selectedComandaId);if(x.viewMode==="checkout"&&t){Dn(t,e);return}const a=`
        <div class="mobile-only-header">
            <button data-action="back-to-list" class="btn-back-mobile">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
            </button>
            <h3 class="font-bold text-lg text-gray-800 ml-2">Detalhes</h3>
        </div>
    `;if(!x.isCashierOpen){e.innerHTML=`
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
        `;return}const o=Se(t),r=t.status==="completed",s=t.type==="walk-in"||typeof t.id=="string"&&t.id.startsWith("temp-"),n=o.reduce((h,y)=>{const w=y._source==="original_service",$=y.id||y.name,k=w?`original-${$}`:`${y.type}-${$}`;return h[k]||(h[k]={...y,quantity:0,sources:[]}),h[k].quantity+=1,y._source&&h[k].sources.push(y._source),h},{}),i=Object.values(n).reduce((h,y)=>h+Number(y.price||0)*y.quantity,0),d=f(t.clientName||"Cliente sem nome"),l=f(t.professionalName||"Profissional não atribuído"),c=t._hasUnsavedChanges,b=`
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
                    <h3 class="text-xl font-bold text-gray-800 truncate max-w-[200px]">${d}</h3>
                    <p class="text-sm text-gray-500 flex items-center gap-1 mt-1">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                        ${l}
                    </p>
                    ${s?'<span class="mt-2 inline-block px-2 py-1 text-xs font-bold bg-blue-100 text-blue-700 rounded-md">Venda Avulsa</span>':`<button data-action="go-to-appointment" data-id="${t.id}" data-date="${t.startTime}" class="text-indigo-600 text-xs font-semibold hover:underline flex items-center gap-1 mt-2">
                             Ver na Agenda <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                         </button>`}
                </div>
                <div class="flex gap-2">
                    ${r?`<button data-action="reopen-appointment" data-id="${t.id}" class="p-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200" title="Reabrir"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg></button>`:""}
                    ${s&&!r?`<button data-action="delete-walk-in" data-id="${t.id}" class="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200" title="Excluir"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>`:""}
                </div>
            </div>

            <div id="loyalty-container" class="mb-4"></div>

            <div class="space-y-3">
                <h4 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Itens do Pedido</h4>
                ${Object.values(n).map(h=>{const y=h.sources&&h.sources.includes("original_service"),w=x.pendingRedemption&&String(x.pendingRedemption.appliedToItemId)===String(h.id),$=h.isReward||w;return`
                    <div class="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-100 shadow-sm ${$?"border-yellow-300 bg-yellow-50 ring-1 ring-yellow-200":""}">
                        <div class="flex items-center gap-3 w-full">
                            <div class="flex-grow min-w-0">
                                <p class="text-sm font-semibold text-gray-800 line-clamp-1">
                                    ${$?"🎁 ":""}
                                    ${f(h.name)}
                                    ${y?'<span class="text-[10px] text-indigo-600 bg-indigo-50 px-1 rounded border border-indigo-100 ml-1">Original</span>':""}
                                </p>
                                <p class="text-xs text-gray-500">${$?'<span class="text-yellow-700 font-bold bg-yellow-100 px-1 rounded">Prémio Fidelidade</span>':`R$ ${(h.price||0).toFixed(2)} un.`}</p>
                            </div>
                            ${r?`<span class="flex items-center justify-center w-8 h-8 bg-gray-100 text-gray-700 font-bold text-sm rounded-lg">${h.quantity}x</span>`:`
                                <div class="flex items-center bg-gray-100 rounded-lg p-1 gap-3">
                                    ${y?`<span class="text-sm font-bold text-gray-500 w-16 text-center py-1 bg-gray-200 rounded text-[10px] uppercase">Fixo: ${h.quantity}</span>`:`<button data-action="decrease-qty" data-item-id="${h.id}" data-item-type="${h.type}" class="w-6 h-6 flex items-center justify-center rounded bg-white text-gray-600 shadow-sm hover:bg-red-50 hover:text-red-600 disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-gray-600">-</button>
                                         <span class="text-sm font-bold text-gray-800 w-4 text-center">${h.quantity}</span>
                                         <button data-action="increase-qty" data-item-id="${h.id}" data-item-type="${h.type}" class="w-6 h-6 flex items-center justify-center rounded bg-white text-gray-600 shadow-sm hover:bg-green-50 hover:text-green-600">+</button>`}
                                </div>
                            `}
                            <div class="flex items-center justify-end w-20">
                                <span class="font-bold text-gray-900 whitespace-nowrap">R$ ${(h.price*h.quantity).toFixed(2)}</span>
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
            `:b}
        </footer>

        ${r?"":v}
    `,!r&&(t.clientId||t.clientName)&&Pn(t,e.querySelector("#loyalty-container"))}function Dn(e,t){const o=Se(e).reduce((p,b)=>p+Number(b.price||0)*(b.quantity||1),0),r=x.checkoutState,s=r.discount||{type:"real",value:0};let n=0;s.type==="percent"?n=o*s.value/100:n=s.value,n>o&&(n=o);const i=o-n,d=r.payments.reduce((p,b)=>p+b.value,0),l=Math.max(0,i-d);(!r.amountReceived||l>0)&&(r.amountReceived=l.toFixed(2));const c=`
        <div class="mobile-only-header">
            <button data-action="back-to-items" class="btn-back-mobile">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
            </button>
            <h3 class="font-bold text-lg text-gray-800 ml-2">Pagamento</h3>
        </div>
    `;t.innerHTML=`
        ${c}
        <div class="flex-grow overflow-y-auto p-4 pb-24 custom-scrollbar">
            
            <div class="text-center mb-6 bg-gray-50 p-6 rounded-xl border border-gray-100">
                <p class="text-sm font-semibold text-gray-500 uppercase tracking-wide">Subtotal: <span id="checkout-subtotal-display">R$ ${o.toFixed(2)}</span></p>
                
                <div class="flex flex-col items-center justify-center gap-2 mt-4 mb-2">
                     <div class="flex items-center gap-2">
                         <span class="text-xs font-bold text-red-500">Desconto:</span>
                         <div class="flex border rounded-lg bg-white overflow-hidden shadow-sm w-40">
                             <input type="number" id="discount-value" value="${s.value}" class="w-20 p-1 text-center text-sm font-bold text-red-600 outline-none" placeholder="0">
                             <select id="discount-type" class="bg-gray-100 text-xs font-bold text-gray-700 border-l p-1 outline-none">
                                 <option value="real" ${s.type==="real"?"selected":""}>R$</option>
                                 <option value="percent" ${s.type==="percent"?"selected":""}>%</option>
                             </select>
                         </div>
                     </div>
                     <input type="text" id="discount-reason" class="w-64 p-2 text-xs border border-gray-200 rounded-lg text-center focus:border-indigo-300 focus:ring focus:ring-indigo-100 outline-none" placeholder="Motivo do desconto (opcional)" value="${r.discountReason||""}">
                </div>

                <p class="text-5xl font-extrabold text-gray-800 mt-2" id="checkout-total-display">R$ ${i.toFixed(2)}</p>
                
                <div id="checkout-status-msg" class="mt-2">
                    ${l<=.01?'<p class="text-green-600 font-bold text-lg">Pago</p>':`<p class="text-red-500 font-medium">Faltam: <span id="checkout-remaining-display">R$ ${l.toFixed(2)}</span></p>`}
                </div>
            </div>

            <div class="space-y-3 mb-6">
                ${r.payments.map((p,b)=>`
                    <div class="flex justify-between items-center bg-white p-3 rounded-lg border border-gray-200 shadow-sm animate-fade-in-fast">
                        <div class="flex items-center gap-3">
                             <div class="bg-gray-100 p-2 rounded-lg">
                                <span class="font-bold text-xs uppercase text-gray-600">${p.method}</span>
                             </div>
                             ${p.installments>1?`<span class="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">${p.installments}x</span>`:""}
                        </div>
                        <div class="flex items-center gap-3">
                            <span class="font-bold text-gray-900">R$ ${p.value.toFixed(2)}</span>
                            <button data-action="remove-payment-checkout" data-index="${b}" class="text-red-400 hover:text-red-600 p-1"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
                        </div>
                    </div>
                `).join("")}
            </div>

            ${l>.01?`
            <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <label class="block text-xs font-bold text-gray-500 uppercase mb-3">Adicionar Pagamento</label>
                <div class="grid grid-cols-3 gap-2 mb-4">
                    ${["dinheiro","pix","debito","credito","crediario"].map(p=>`
                        <button data-action="select-method" data-method="${p}" class="p-2 rounded-lg border text-xs font-bold uppercase transition ${r.selectedMethod===p?"bg-indigo-600 text-white border-indigo-600 shadow-md":"bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"}">
                            ${p}
                        </button>
                    `).join("")}
                </div>
                
                ${["credito","crediario"].includes(r.selectedMethod)?`
                    <div class="mb-3">
                        <label class="text-xs text-gray-500">Parcelas</label>
                        <select id="checkout-installments" class="w-full mt-1 p-2 border rounded-lg text-sm bg-gray-50">
                            ${Array.from({length:12},(p,b)=>`<option value="${b+1}" ${r.installments===b+1?"selected":""}>${b+1}x</option>`).join("")}
                        </select>
                    </div>
                `:""}

                <div class="flex items-end gap-2">
                    <div class="flex-grow">
                        <label class="text-xs text-gray-500">Valor</label>
                        <input type="number" id="checkout-amount" step="0.01" class="w-full p-2 border rounded-lg text-lg font-bold" value="${l.toFixed(2)}">
                    </div>
                    <button data-action="add-payment-checkout" class="h-[46px] px-4 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-900 transition">OK</button>
                </div>
            </div>
            `:""}
        </div>

        <footer class="p-4 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] grid grid-cols-2 gap-3">
            <button data-action="back-to-items" class="py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition">Voltar</button>
            <button data-action="finalize-checkout" class="py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition shadow-lg shadow-green-200">Finalizar</button>
        </footer>
    `;const m=()=>{const p=x.checkoutState.discount.type,b=x.checkoutState.discount.value;let v=p==="percent"?o*b/100:b;v>o&&(v=o);const h=o-v,y=x.checkoutState.payments.reduce((T,A)=>T+A.value,0),w=Math.max(0,h-y),$=t.querySelector("#checkout-total-display");$&&($.textContent=`R$ ${h.toFixed(2)}`);const k=t.querySelector("#checkout-status-msg");k&&(w<=.01?k.innerHTML='<p class="text-green-600 font-bold text-lg">Pago</p>':k.innerHTML=`<p class="text-red-500 font-medium">Faltam: <span id="checkout-remaining-display">R$ ${w.toFixed(2)}</span></p>`);const C=t.querySelector("#checkout-amount");C&&w>0&&document.activeElement!==C&&(C.value=w.toFixed(2))};t.querySelector("#discount-value")?.addEventListener("input",p=>{const b=parseFloat(p.target.value)||0;x.checkoutState.discount.value=b,m()}),t.querySelector("#discount-type")?.addEventListener("change",p=>{x.checkoutState.discount.type=p.target.value,m()}),t.querySelector("#discount-reason")?.addEventListener("input",p=>{x.checkoutState.discountReason=p.target.value}),t.querySelector("#checkout-amount")?.addEventListener("input",p=>{x.checkoutState.amountReceived=p.target.value}),t.querySelector("#checkout-installments")?.addEventListener("change",p=>{x.checkoutState.installments=parseInt(p.target.value,10)})}async function Pn(e,t){if(!t)return;const a=x.loyaltySettings;if(!a||!a.enabled)return;let o=null;try{if(e.clientId)o=await es(u.establishmentId,e.clientId);else if(e.clientName){const i=await Wt(u.establishmentId,e.clientName,1);i&&i.length>0&&(o=i[0])}}catch(i){console.warn("Erro ao buscar dados de fidelidade",i)}if(!o||o.loyaltyPoints===void 0)return;const r=Number(o.loyaltyPoints)||0,n=(a.tiers||a.rewards||[]).filter(i=>{const d=Number(i.costPoints||i.points||0);return d>0&&r>=d});if(n.length>0){const i=document.createElement("div");i.className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl p-4 shadow-sm flex justify-between items-center animate-fade-in",i.innerHTML=`
            <div class="flex items-center gap-3">
                <div class="bg-yellow-100 p-2 rounded-full text-yellow-600">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                </div>
                <div>
                    <p class="text-sm font-bold text-yellow-800">Prémio Disponível!</p>
                    <p class="text-xs text-yellow-700">Saldo: <strong>${r} pts</strong></p>
                </div>
            </div>
        `;const d=document.createElement("button");d.innerText="Resgatar",d.className="text-xs font-bold bg-yellow-500 text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-600 transition-colors",d.onclick=()=>Bn(n,e),i.appendChild(d),t.innerHTML="",t.appendChild(i)}}function Bn(e,t){const a=`
        <div class="space-y-4">
            <p class="text-sm text-gray-600 mb-4">O cliente possui pontos suficientes para resgatar os seguintes itens:</p>
            <div class="space-y-2 max-h-96 overflow-y-auto custom-scrollbar">
                ${e.map(s=>{const n=s.costPoints||s.points||0,i=s.name||s.reward,d=s.type||"money",l=s.discount?parseFloat(s.discount).toFixed(2):"0.00";let c="",m="bg-gray-100 text-gray-600";switch(d){case"service":c="Serviço",m="bg-indigo-100 text-indigo-700";break;case"product":c="Produto",m="bg-green-100 text-green-700";break;case"package":c="Pacote",m="bg-purple-100 text-purple-700";break;case"money":default:c="Valor Livre",m="bg-yellow-100 text-yellow-700";break}return`
                    <button data-action="select-reward" data-reward-id="${s.id||i}" class="w-full flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:border-yellow-400 hover:bg-yellow-50 transition-all group">
                        <div class="text-left flex-1">
                            <div class="flex items-center gap-2 mb-1">
                                <span class="text-[10px] font-bold uppercase px-2 py-0.5 rounded ${m}">${c}</span>
                                <p class="font-bold text-gray-800 group-hover:text-yellow-700">${f(i)}</p>
                            </div>
                            <p class="text-xs text-gray-500">Custo: ${n} pontos</p>
                        </div>
                        <div class="text-right">
                            <span class="block text-sm font-bold text-green-600">Desc. R$ ${l}</span>
                        </div>
                    </button>
                `}).join("")}
            </div>
        </div>
    `,{modalElement:o,close:r}=_({title:"🎁 Resgatar Prémio",contentHTML:a,maxWidth:"max-w-md"});o.addEventListener("click",s=>{const n=s.target.closest('[data-action="select-reward"]');if(n){const i=n.dataset.rewardId,d=e.find(l=>l.id&&l.id==i||(l.name||l.reward)==i);d&&(Mn(d,t),r())}})}async function Mn(e,t){const a=Number(e.costPoints||e.points||0),o=e.name||e.reward,r=e.type||"money";if(r==="money"){const d=parseFloat(e.discount)||0;if(d<=0){g("Erro","O valor do desconto configurado é inválido.","error");return}x.checkoutState.discount={type:"real",value:d},x.checkoutState.discountReason=`Resgate Fidelidade: ${o}`,x.pendingRedemption={rewardId:e.id||null,name:o,cost:a,type:"money"},g("Sucesso",`Prémio "${o}" resgatado! Desconto de R$ ${d.toFixed(2)} aplicado.`,"success"),V();return}const s=Se(t),n=e.itemId?String(e.itemId):null;if(!n){g("Erro de Configuração",`O prémio "${o}" não tem um item vinculado nas configurações.`,"error");return}const i=s.find(d=>{const l=d.id?String(d.id):null,c=d.serviceId?String(d.serviceId):d.service_id?String(d.service_id):null,m=d.productId?String(d.productId):d.product_id?String(d.product_id):null;return r==="service"?l===n||c===n:r==="product"?l===n||m===n:r==="package"?l===n:!1});if(i){let d=parseFloat(e.discount);(!d||d<=0)&&(d=parseFloat(i.price||0)),x.checkoutState.discount={type:"real",value:d},x.checkoutState.discountReason=`Resgate Fidelidade: ${o}`,x.pendingRedemption={rewardId:e.id||null,name:o,cost:a,type:r,appliedToItemId:i.id},g("Sucesso",`Prémio "${o}" resgatado! Item encontrado e desconto de R$ ${d.toFixed(2)} aplicado.`,"success"),V()}else g("Item Não Encontrado",`Para resgatar o prémio "${o}", o ${r==="service"?"serviço":r==="product"?"produto":"pacote"} correspondente deve estar lançado nesta comanda. Por favor, adicione o item primeiro e tente resgatar novamente.`,"warning")}function An(){if(!x.isCashierOpen)return g("Caixa Fechado","Abra o caixa antes de adicionar itens.","error");const{modalElement:e,close:t}=_({title:"Adicionar Item à Comanda",contentHTML:'<div id="add-item-content"></div>',maxWidth:"max-w-4xl"}),a=()=>{const r=e.querySelector("#add-item-content");r.innerHTML=`
            <input type="search" id="item-search-input" placeholder="Pesquisar por nome..." class="w-full p-3 mb-4 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div><h4 class="font-semibold mb-2 text-center text-indigo-600">Serviços</h4><div id="modal-service-list" class="space-y-2 max-h-80 overflow-y-auto custom-scrollbar"></div></div>
                <div><h4 class="font-semibold mb-2 text-center text-green-600">Produtos</h4><div id="modal-product-list" class="space-y-2 max-h-80 overflow-y-auto custom-scrollbar"></div></div>
                <div><h4 class="font-semibold mb-2 text-center text-purple-600">Pacotes</h4><div id="modal-package-list" class="space-y-2 max-h-80 overflow-y-auto custom-scrollbar"></div></div>
            </div>`;const s=(i="")=>{const d=i.toLowerCase(),l={service:'<svg class="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v4.512a9.04 9.04 0 00-3 5.012M12 12a9.04 9.04 0 01-3-5.012V5l-1-1z" /></svg>',product:'<svg class="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>',package:'<svg class="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-14L4 7m8 4v10M4 7v10l8 4" /></svg>'},c={"modal-service-list":{items:x.catalog.services,type:"service"},"modal-product-list":{items:x.catalog.products,type:"product"},"modal-package-list":{items:x.catalog.packages,type:"package"}};Object.entries(c).forEach(([m,{items:p,type:b}])=>{const v=document.getElementById(m);if(!v)return;const h=p.filter(y=>y.name.toLowerCase().includes(d)).slice(0,50);v.innerHTML=h.map(y=>y.id?`
                    <button data-action="select-item-for-quantity" data-item-type="${b}" data-item-id="${y.id}" class="flex items-center gap-2 w-full p-2 bg-white border rounded hover:bg-gray-50 transition text-left">
                        <div class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gray-50">${l[b]}</div>
                        <span class="flex-grow text-sm truncate">${f(y.name)}</span>
                        <span class="font-bold text-xs text-gray-700">R$ ${y.price.toFixed(2)}</span>
                    </button>
                `:"").join("")||'<p class="text-xs text-gray-400 text-center py-2">Nada encontrado</p>'})};s();const n=document.getElementById("item-search-input");n.addEventListener("input",us(i=>{s(i.target.value)},300)),setTimeout(()=>n.focus(),100)},o=r=>{let s=1;const n=e.querySelector("#add-item-content"),i=()=>{document.getElementById("quantity-display").textContent=s,document.getElementById("quantity-minus-btn").disabled=s<=1};n.innerHTML=`
            <div class="text-center p-8 relative">
                <button data-action="back-to-catalog" class="absolute top-0 left-0 text-gray-600 hover:text-gray-900 font-medium flex items-center gap-1">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg> Voltar
                </button>
                <h3 class="font-bold text-2xl text-gray-800 mt-4">${f(r.name)}</h3>
                <p class="text-lg text-gray-500 font-medium">R$ ${r.price.toFixed(2)}</p>
                <div class="my-8 flex items-center justify-center gap-6">
                    <button id="quantity-minus-btn" class="w-14 h-14 rounded-full bg-gray-100 text-2xl font-bold text-gray-600 hover:bg-gray-200 transition disabled:opacity-50">-</button>
                    <span id="quantity-display" class="text-5xl font-bold w-24 text-center text-indigo-700">${s}</span>
                    <button id="quantity-plus-btn" class="w-14 h-14 rounded-full bg-gray-100 text-2xl font-bold text-gray-600 hover:bg-gray-200 transition">+</button>
                </div>
                <button data-action="confirm-add-item" class="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition shadow-lg text-lg">Adicionar à Comanda</button>
            </div>
        `,document.getElementById("quantity-minus-btn").onclick=()=>{s>1&&(s--,i())},document.getElementById("quantity-plus-btn").onclick=()=>{s++,i()},document.querySelector('[data-action="confirm-add-item"]').onclick=async()=>{await ps(r,s),t()}};e.addEventListener("click",r=>{const s=r.target.closest('[data-action="select-item-for-quantity"]'),n=r.target.closest('[data-action="back-to-catalog"]');if(s){const{itemType:i,itemId:d}=s.dataset,c=(x.catalog[i+"s"]||[]).find(m=>m.id===d);c&&o({...c,type:i})}else n&&a()}),a()}async function ba(e=null){if(!x.isCashierOpen)return g("Caixa Fechado","Abra o caixa antes de criar uma nova venda.","error");if(!u.professionals||u.professionals.length===0)try{u.professionals=await ee(u.establishmentId)}catch{return g("Erro","Não foi possível carregar profissionais.","error")}const a=`
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
                <select id="new-sale-professional" required class="mt-1 w-full p-2 border rounded-md bg-white"><option value="">Selecione...</option>${u.professionals.map(d=>`<option value="${d.id}">${f(d.name)}</option>`).join("")}</select>
            </div>
            <div class="pt-4 border-t"><button type="submit" id="btn-start-sale" class="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400">Iniciar Venda</button></div>
        </form>
    `,{modalElement:o}=_({title:"Nova Venda Avulsa",contentHTML:a,maxWidth:"max-w-md"}),r=o.querySelector("#client-search"),s=o.querySelector("#client-suggestions"),n=o.querySelector("#selected-client-id");e&&(n.value=e.id,r.value=`${e.name} (${e.phone||"Sem tel"})`,r.classList.add("bg-green-50","border-green-300","text-green-800")),r.addEventListener("input",us(async d=>{const l=d.target.value.trim();if(n.value="",r.classList.remove("bg-green-50","border-green-300","text-green-800"),l.length<2){s.classList.add("hidden");return}try{s.innerHTML='<li class="p-2 text-xs text-gray-500">Buscando...</li>',s.classList.remove("hidden");const c=await Wt(u.establishmentId,l,10);c.length===0?s.innerHTML='<li class="p-2 text-xs text-gray-500">Nenhum cliente encontrado</li>':s.innerHTML=c.map(m=>`<li data-client-id="${m.id}" data-client-name="${m.name}" data-client-phone="${m.phone}" class="p-2 hover:bg-indigo-50 cursor-pointer border-b last:border-0 transition-colors"><div class="font-bold text-sm text-gray-800">${f(m.name)}</div><div class="text-xs text-gray-500">${m.phone||"Sem telefone"}</div></li>`).join("")}catch{s.classList.add("hidden")}},400)),s.addEventListener("click",d=>{const l=d.target.closest("li[data-client-id]");l&&(n.value=l.dataset.clientId,n.dataset.name=l.dataset.clientName,n.dataset.phone=l.dataset.clientPhone,r.value=`${l.dataset.clientName}`,r.classList.add("bg-green-50","border-green-300","text-green-800"),s.classList.add("hidden"))}),document.addEventListener("click",d=>{!r.contains(d.target)&&!s.contains(d.target)&&s.classList.add("hidden")}),o.querySelector("#new-sale-form").addEventListener("submit",On);const i=o.querySelector('[data-action="new-client-from-sale"]');i&&i.addEventListener("click",d=>{d.preventDefault(),o.style.display="none",qn()})}function qn(){_({title:"Cadastrar Novo Cliente",contentHTML:`
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
    `,maxWidth:"max-w-2xl"});const t=document.getElementById("comandas_clientRegistrationForm");t&&t.addEventListener("submit",Nn)}async function Nn(e){e.preventDefault();const t=document.getElementById("comandas_clientRegistrationForm");if(!t)return;const a=t.querySelector("#regClientName"),r=t.querySelector("#regClientPhone").value.replace(/\D/g,"");if(!a.value||!r)return g("Erro","Nome e Telefone são obrigatórios.","error");try{const s=await Yr(u.establishmentId,r);if(s)g("Atenção","Cliente já cadastrado.","info"),document.getElementById("genericModal").style.display="none",ba(s);else{const n=await Da({establishmentId:u.establishmentId,name:a.value,phone:r});g("Sucesso","Cliente cadastrado!","success"),document.getElementById("genericModal").style.display="none",ba(n)}}catch(s){g("Erro",s.message,"error")}}async function Rn(){const e=`
        <form id="open-cashier-form" class="space-y-4">
            <div>
                <label for="initial-amount" class="block text-sm font-medium text-gray-700">Valor Inicial do Caixa</label>
                <div class="mt-1 relative"><span class="absolute left-3 top-2 text-gray-500 font-semibold">R$</span><input type="number" step="0.01" min="0" id="initial-amount" required class="w-full p-2 pl-12 border rounded-md text-lg font-semibold" placeholder="0.00" value="0.00"></div>
            </div>
            <div class="pt-4 border-t"><button type="submit" class="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition shadow-md">Confirmar Abertura</button></div>
        </form>
    `,{modalElement:t}=_({title:"Abrir Caixa",contentHTML:e,maxWidth:"max-w-md"});t.querySelector("#open-cashier-form").addEventListener("submit",async a=>{a.preventDefault();const o=parseFloat(document.getElementById("initial-amount").value);if(isNaN(o)||o<0)return g("Valor Inválido","Insira um valor válido.","error");try{const r=await yn({establishmentId:u.establishmentId,initialAmount:parseFloat(o.toFixed(2))});x.isCashierOpen=!0,x.activeCashierSessionId=r.id,document.getElementById("genericModal").style.display="none",g("Sucesso!",`Caixa aberto (R$ ${o.toFixed(2)})`,"success"),Gt(),await ne()}catch(r){g("Erro",`Falha ao abrir caixa: ${r.message}`,"error")}})}async function jn(){const e=x.activeCashierSessionId;if(e)try{const t=await Sn(e),a=`
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
        `,{modalElement:o}=_({title:"Fechar Caixa",contentHTML:a,maxWidth:"max-w-md"});o.querySelector("#close-cashier-form").addEventListener("submit",async r=>{r.preventDefault();const s=parseFloat(document.getElementById("final-amount").value);if(isNaN(s)||s<0)return g("Valor Inválido","Insira um valor final válido.","error");try{await wn(e,s),x.isCashierOpen=!1,x.activeCashierSessionId=null,document.getElementById("genericModal").style.display="none",Gt(),await ne(),g("Sucesso!","Caixa fechado com sucesso!","success")}catch(n){g("Erro",`Falha ao fechar caixa: ${n.message}`,"error")}})}catch(t){g("Erro",`Falha ao carregar relatório: ${t.message}`,"error")}}async function Fn(e){if(x.activeFilter===e)return;x.activeFilter=e,x.paging.page=1,document.querySelectorAll(".filter-btn").forEach(a=>a.classList.remove("bg-white","text-indigo-600","shadow")),document.querySelector(`[data-filter="${e}"]`).classList.add("bg-white","text-indigo-600","shadow"),document.getElementById("finalizadas-datepicker").classList.toggle("hidden",e!=="finalizadas"),De(),x.selectedComandaId=null,x.viewMode="items";const t=document.getElementById("comandas-list");t&&(t.innerHTML='<div class="loader mx-auto mt-10"></div>'),await ne(),V()}function ms(e){x.selectedComandaId=e,x.viewMode="items",x.pendingRedemption=null,x.checkoutState.discount={type:"real",value:0},x.checkoutState.discountReason="",lt(),Cn(),V()}async function ps(e,t){const a=x.allComandas.find(s=>s.id===x.selectedComandaId);if(!a)return;if(!e.id||String(e.id)==="undefined"){console.error("Tentativa de adicionar item sem ID:",e),g("Erro","Item sem identificador. Não foi possível adicionar.","error");return}const o=parseFloat(e.price)||0,r=Array(t).fill(0).map(()=>{const s={id:String(e.id),name:e.name,price:o,type:e.type,isReward:e.isReward||!1,pointsCost:e.pointsCost||0};return e.type==="product"?(s.productId=s.id,s.product_id=s.id):e.type==="service"&&(s.serviceId=s.id,s.service_id=s.id),s});a.comandaItems=a.comandaItems||[],a.comandaItems.push(...r),a._cachedItems=null,a._hasUnsavedChanges=!0,V()}async function mo(e,t){const a=x.allComandas.find(s=>s.id===x.selectedComandaId);if(!a)return;let o=!1,r=(a.comandaItems||[]).findIndex(s=>s.id==e&&s.type===t);r>-1&&(a.comandaItems.splice(r,1),o=!0),o&&(a._cachedItems=null,a._hasUnsavedChanges=!0,V())}async function Hn(e){if(x.isProcessing)return;const t=Se(e),a=t.reduce((y,w)=>y+Number(w.price||0)*(w.quantity||1),0),o=x.checkoutState.discount||{type:"real",value:0};let r=o.type==="percent"?a*o.value/100:o.value;r>a&&(r=a);const s=a-r,{payments:n}=x.checkoutState,i=n.reduce((y,w)=>y+w.value,0),d=s-i;if(d>.01){if(!await H("Pagamento Parcial",`O valor de R$ ${d.toFixed(2)} não foi pago. Deseja registrar como DÍVIDA (Fiado) no cadastro do cliente?`))return;n.push({method:"fiado",value:d,installments:1})}x.isProcessing=!0;const l=e.type==="appointment",c=t;let m=0;const p=x.loyaltySettings;p&&p.enabled&&(m=parseInt(p.pointsPerVisit||1,10),console.log(`Fidelidade: Cliente ganhou ${m} pontos fixos pela visita.`));const b={...o,reason:x.checkoutState.discountReason||""},v={payments:n,totalAmount:Number(s),items:c,cashierSessionId:x.activeCashierSessionId,loyaltyPointsEarned:m,discount:b,loyaltyRedemption:x.pendingRedemption},h=document.createElement("div");h.className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center backdrop-blur-sm",h.innerHTML='<div class="bg-white p-6 rounded-2xl shadow-2xl flex flex-col items-center"><div class="loader mb-4 border-t-indigo-600"></div><p>Finalizando venda...</p></div>',document.body.appendChild(h);try{l?await nr(e.id,v):(v.establishmentId=u.establishmentId,v.clientId=e.clientId,v.clientName=e.clientName,v.professionalId=e.professionalId,e.clientPhone&&(v.clientPhone=e.clientPhone),await vn(v));let y="Venda finalizada com sucesso!";m>0&&(y+=` Cliente ganhou ${m} pontos!`),g("Sucesso!",y,"success"),De(),x.selectedComandaId=null,x.viewMode="items",x.pendingRedemption=null,await ne()}catch(y){g("Erro no Checkout",y.message,"error")}finally{document.body.contains(h)&&document.body.removeChild(h),x.isProcessing=!1}}async function On(e){e.preventDefault();const t=document.getElementById("selected-client-id"),a=document.getElementById("new-sale-professional").value,o=t.value,r=document.getElementById("client-search").value,s=t.dataset.phone||"";if(!o)return g("Erro","Selecione um cliente válido.","error");const n=u.professionals.find(d=>d.id===a);if(!n)return g("Erro","Selecione um profissional válido.","error");const i={id:`temp-${Date.now()}`,type:"walk-in",clientId:o,clientName:r.split("(")[0].trim(),clientPhone:s,professionalId:n.id,professionalName:n.name,startTime:new Date,status:"confirmed",services:[],comandaItems:[]};x.allComandas.unshift(i),x.selectedComandaId=i.id,x.viewMode="items",document.getElementById("genericModal").style.display="none",ms(i.id)}async function ne(){const e=document.getElementById("comandas-list");(!e.hasChildNodes()||e.innerHTML.includes("loader"))&&(e.innerHTML='<div class="loader mx-auto mt-10"></div>');const t=x.activeFilter==="finalizadas"?document.getElementById("filter-date").value:null;try{const a=xn(),o=bn(u.establishmentId,t,x.paging.page,x.paging.limit),r=Ee(u.establishmentId),[s,n,i]=await Promise.all([a,o,r]);if(x.isCashierOpen=!!s,x.activeCashierSessionId=s?s.id:null,Gt(),i&&i.loyaltyProgram&&(x.loyaltySettings=i.loyaltyProgram),!x.isCashierOpen&&x.activeFilter==="atendimento"){lt(),V();return}if(x.allComandas=n.data||n,x.paging.total=n.total||n.length,x.catalog.services.length===0){const[d,l,c,m]=await Promise.all([be(u.establishmentId),ut(u.establishmentId),Ba(u.establishmentId),ee(u.establishmentId)]);x.catalog={services:d,products:l,packages:c},u.professionals=m}lt(),V()}catch(a){g("Erro",`Não foi possível carregar os dados: ${a.message}`,"error")}}async function zn(e={}){Te=document.getElementById("content"),x.selectedComandaId=e.selectedAppointmentId||null,x.viewMode="items",Ln(),Ce&&(Te.removeEventListener("click",Ce),Te.removeEventListener("change",Ce)),Ce=async t=>{const a=t.target.closest("[data-action], [data-filter], [data-comanda-id]");if(t.target.id==="filter-date"&&x.activeFilter==="finalizadas"){x.paging.page=1,await ne();return}if(a){if(a.matches("[data-filter]"))Fn(a.dataset.filter);else if(a.matches("[data-comanda-id]")){if(t.target.closest('[data-action="go-to-appointment"]')){t.stopPropagation();return}ms(a.dataset.comandaId)}else if(a.matches("[data-action]")){const r=a.dataset.action,s=a.dataset.id||x.selectedComandaId,n=x.allComandas.find(i=>i.id===s);switch(r){case"back-to-list":De(),x.selectedComandaId=null,document.querySelectorAll(".comanda-card").forEach($=>$.classList.remove("selected")),V();break;case"new-sale":ba();break;case"add-item":An();break;case"open-cashier":Rn();break;case"close-cashier":await jn();break;case"view-sales-report":K("sales-report-section");break;case"go-to-checkout":await co(n,"checkout");break;case"back-to-items":x.viewMode="items",V();break;case"save-comanda":await co(n,"stay");break;case"select-method":x.checkoutState.selectedMethod=a.dataset.method,x.checkoutState.installments=1,V();break;case"add-payment-checkout":const i=document.getElementById("checkout-amount");let d=parseFloat(i.value);const c=Se(n).reduce(($,k)=>$+(k.price||0),0),m=x.checkoutState.discount||{type:"real",value:0};let p=m.type==="percent"?c*m.value/100:m.value;p>c&&(p=c);const b=c-p,v=x.checkoutState.payments.reduce(($,k)=>$+k.value,0),h=b-v;if(isNaN(d)||d<=0){g("Valor inválido","Insira um valor maior que zero.","error");break}if(d>h+.05){g("Valor inválido","Valor excede o restante.","error");break}const y={method:x.checkoutState.selectedMethod,value:d};["credito","crediario"].includes(x.checkoutState.selectedMethod)&&x.checkoutState.installments>1&&(y.installments=x.checkoutState.installments),x.checkoutState.payments.push(y),x.checkoutState.selectedMethod="dinheiro",x.checkoutState.installments=1,x.checkoutState.amountReceived="",V();break;case"remove-payment-checkout":const w=parseInt(a.dataset.index,10);x.checkoutState.payments.splice(w,1),V();break;case"finalize-checkout":await Hn(n);break;case"increase-qty":{const $=a.dataset.itemId,k=a.dataset.itemType;if(!$||$==="undefined"||$==="null"){g("Erro","Item inválido para adição.","error");return}let T=Se(n).find(q=>q.id==$&&q.type===k);T||(T=(x.catalog[k+"s"]||[]).find(D=>D.id==$));const A=T?{id:T.id,name:T.name,price:Number(T.price),type:T.type}:{id:$,name:"Item Indisponível",price:0,type:k};await ps(A,1);break}case"decrease-qty":{await mo(a.dataset.itemId,a.dataset.itemType);break}case"remove-item":await mo(a.dataset.itemId,a.dataset.itemType);break;case"reopen-appointment":{if(await H("Reabrir Comanda","Tem certeza? O pagamento será estornado."))try{await rr(s);const k=x.allComandas.findIndex(C=>C.id===s);k!==-1&&(x.allComandas[k].status="confirmed",delete x.allComandas[k].transaction),x.selectedComandaId=null,De(),await ne(),g("Sucesso!","Comanda reaberta.","success")}catch(k){g("Erro",k.message,"error")}break}case"go-to-appointment":{const $=a.dataset.id,k=a.dataset.date;K("agenda-section",{scrollToAppointmentId:$,targetDate:new Date(k)});break}case"delete-walk-in":{if(await H("Excluir Venda","Confirma a exclusão desta venda avulsa?"))if(s.startsWith("temp-"))x.allComandas=x.allComandas.filter(k=>k.id!==s),x.selectedComandaId=null,lt(),V(),De();else try{await hn(s),g("Sucesso","Venda excluída.","success"),x.selectedComandaId=null,De(),await ne()}catch(k){g("Erro",k.message,"error")}break}}}}},Te.addEventListener("click",Ce),Te.addEventListener("change",Ce),e.initialFilter&&(x.activeFilter=e.initialFilter==="finalizadas"?"finalizadas":"atendimento"),e.selectedAppointmentId&&(x.selectedComandaId=e.selectedAppointmentId),document.querySelectorAll(".filter-btn").forEach(t=>t.classList.remove("bg-white","text-indigo-600","shadow")),document.querySelector(`[data-filter="${x.activeFilter}"]`).classList.add("bg-white","text-indigo-600","shadow"),document.getElementById("finalizadas-datepicker").classList.toggle("hidden",x.activeFilter!=="finalizadas"),e.filterDate&&(document.getElementById("filter-date").value=new Date(e.filterDate).toISOString().split("T")[0]),await ne()}const Yt=e=>E(`/api/financial/natures/${e}`),Vn=e=>E("/api/financial/natures",{method:"POST",body:JSON.stringify(e)}),Un=e=>E(`/api/financial/natures/${e}`,{method:"DELETE"}),Ma=e=>E(`/api/financial/cost-centers/${e}`),_n=e=>E("/api/financial/cost-centers",{method:"POST",body:JSON.stringify(e)}),Wn=e=>E(`/api/financial/cost-centers/${e}`,{method:"DELETE"}),gs=(e,t)=>E(`/api/financial/${e}`,{method:"POST",body:JSON.stringify(t)}),bs=(e,t={})=>{let a=`/api/financial/${e}`;const o=new URLSearchParams;t.establishmentId&&o.append("establishmentId",t.establishmentId),t.startDate&&o.append("startDate",t.startDate),t.endDate&&o.append("endDate",t.endDate),t.natureId&&o.append("natureId",t.natureId),t.costCenterId&&o.append("costCenterId",t.costCenterId),t.status&&o.append("status",t.status);const r=o.toString();return r&&(a+=`?${r}`),E(a)},fs=(e,t,a)=>E(`/api/financial/${e}/${t}`,{method:"PUT",body:JSON.stringify(a)}),vs=(e,t)=>E(`/api/financial/${e}/${t}`,{method:"DELETE"}),hs=(e,t)=>{const a=t.map(o=>E(`/api/financial/${e}/${o}`,{method:"DELETE"}));return Promise.all(a)},xs=(e,t,a)=>E(`/api/financial/${e}/${t}/status`,{method:"PATCH",body:JSON.stringify({status:"paid",paymentDate:a})}),Jn=e=>gs("payables",e),ys=e=>bs("payables",e),Gn=(e,t)=>fs("payables",e,t),Yn=e=>vs("payables",e),Qn=(e,t)=>xs("payables",e,t),Xn=e=>gs("receivables",e),ws=e=>bs("receivables",e),Zn=(e,t)=>fs("receivables",e,t),Kn=e=>vs("receivables",e),ei=(e,t)=>xs("receivables",e,t),fa=document.getElementById("content");let Z={};const ft={creditRealized:"#10b981",creditProvisioned:"#6ee7b7",debitRealized:"#ef4444",debitProvisioned:"#fca5a5"},ti=["#4f46e5","#10b981","#f59e0b","#ef4444","#8b5cf6","#ec4899","#06b6d4"],P={startDate:new Date(new Date().getFullYear(),new Date().getMonth(),1).toISOString().split("T")[0],endDate:new Date().toISOString().split("T")[0],selectedProfessional:"all",selectedCostCenter:"all",professionalsList:[],costCentersList:[],naturesList:[],rawPayables:[],rawReceivables:[],processedDRE:null,processedCashFlow:null,processedDailyRevenue:null,backendData:null,appointmentsData:[],currentTab:"dashboards",isFilterOpen:!1};async function ai(){if(!window.Chart)return new Promise((e,t)=>{const a=document.createElement("script");a.src="https://cdn.jsdelivr.net/npm/chart.js",a.onload=e,a.onerror=t,document.head.appendChild(a)})}async function oi(){fa.innerHTML=`
        <div class="flex flex-col items-center justify-center h-[calc(100vh-100px)] w-full">
            <div class="loader mb-4 border-t-indigo-600"></div>
            <p class="text-gray-500 font-medium animate-pulse">Carregando inteligência...</p>
        </div>`;try{await ai();const[e,t,a]=await Promise.all([ee(u.establishmentId),Ur(u.establishmentId).catch(()=>[]),Yt(u.establishmentId).catch(()=>[])]);P.professionalsList=e||[],P.costCentersList=t||[],P.naturesList=a||[],si(),await ks()}catch(e){console.error("Erro no loadReportsPage:",e),fa.innerHTML=`
            <div class="flex flex-col items-center justify-center h-full text-red-500 p-6 text-center w-full">
                <div class="bg-red-50 p-4 rounded-full mb-4"><svg class="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div>
                <h3 class="text-lg font-bold text-gray-800">Ops! Algo deu errado.</h3>
                <p class="text-sm text-gray-600 mt-2 max-w-xs mx-auto break-words">${f(e.message)}</p>
                <button onclick="window.location.reload()" class="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-700 transition-transform active:scale-95">Tentar Novamente</button>
            </div>`}}function si(){const e=P.professionalsList.map(a=>`<option value="${a.id}">${f(a.name)}</option>`).join(""),t=P.costCentersList.map(a=>`<option value="${a.id}">${f(a.name)}</option>`).join("");fa.innerHTML=`
        <div class="flex flex-col min-h-screen bg-gray-50 pb-24 relative w-full max-w-[100vw] overflow-x-hidden">
            
            <div class="sticky top-0 z-30 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 transition-all duration-300 w-full">
                <div class="max-w-7xl mx-auto px-3 md:px-4 py-3">
                    <div class="flex justify-between items-center">
                        <div class="flex-1 min-w-0 mr-2">
                            <h1 class="text-lg md:text-xl font-bold text-gray-800 flex items-center gap-2">
                                <span class="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg flex-shrink-0 shadow-sm border border-indigo-100">
                                    <svg class="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                                </span>
                                <span class="truncate">Relatórios</span>
                            </h1>
                            <p class="text-[10px] md:text-xs text-gray-500 mt-0.5 ml-1 truncate" id="date-range-display">
                                ${At(P.startDate)} até ${At(P.endDate)}
                            </p>
                        </div>
                        <button id="toggle-filters-btn" class="p-2 bg-indigo-50 text-indigo-600 rounded-full hover:bg-indigo-100 transition-colors relative flex-shrink-0">
                            <svg class="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
                        </button>
                    </div>
                </div>

                <div id="filters-container" class="hidden border-t border-gray-100 bg-gray-50/50 overflow-hidden transition-all duration-300 w-full">
                    <div class="p-4 grid grid-cols-1 md:grid-cols-4 gap-3 max-w-7xl mx-auto w-full">
                        <div class="space-y-1">
                            <label class="text-xs font-semibold text-gray-500 ml-1">Início</label>
                            <input type="date" id="report-start" value="${P.startDate}" class="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm">
                        </div>
                        <div class="space-y-1">
                            <label class="text-xs font-semibold text-gray-500 ml-1">Fim</label>
                            <input type="date" id="report-end" value="${P.endDate}" class="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm">
                        </div>
                        <div class="space-y-1">
                            <label class="text-xs font-semibold text-gray-500 ml-1">Profissional</label>
                            <select id="report-prof" class="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm text-gray-700">
                                <option value="all">Todos Profissionais</option>
                                ${e}
                            </select>
                        </div>
                        <div class="space-y-1">
                            <label class="text-xs font-semibold text-gray-500 ml-1">Centro de Custo</label>
                            <select id="report-cost" class="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm text-gray-700">
                                <option value="all">Todos Centros</option>
                                ${t}
                            </select>
                        </div>
                        <button id="btn-apply-filters" class="md:col-span-4 mt-2 w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow-md active:scale-95 transition-transform flex justify-center items-center gap-2">
                            Aplicar Filtros
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                        </button>
                    </div>
                </div>

                <div class="overflow-x-auto no-scrollbar border-t border-gray-100 bg-white w-full">
                    <div class="flex px-3 md:px-4 py-2 gap-2 min-w-max max-w-7xl mx-auto">
                        <button data-tab="dashboards" class="tab-btn flex-1 py-2 px-4 rounded-full text-xs md:text-sm font-medium transition-all whitespace-nowrap border">Financeiro</button>
                        <button data-tab="dre" class="tab-btn flex-1 py-2 px-4 rounded-full text-xs md:text-sm font-medium transition-all whitespace-nowrap border">DRE Contábil</button>
                        <button data-tab="appointments" class="tab-btn flex-1 py-2 px-4 rounded-full text-xs md:text-sm font-medium transition-all whitespace-nowrap border">Agendamentos</button>
                    </div>
                </div>
            </div>

            <main id="report-content" class="flex-1 max-w-7xl w-full mx-auto px-3 md:px-4 py-4 space-y-4 animate-fade-in overflow-hidden"></main>
        </div>
    `,document.getElementById("toggle-filters-btn").onclick=po,document.getElementById("btn-apply-filters").onclick=()=>{ri(),po()},document.querySelectorAll(".tab-btn").forEach(a=>{a.onclick=()=>{P.currentTab=a.dataset.tab,go(),Ss(),window.scrollTo({top:0,behavior:"smooth"})}}),go()}function po(){const e=document.getElementById("filters-container"),t=document.getElementById("toggle-filters-btn");P.isFilterOpen=!P.isFilterOpen,P.isFilterOpen?(e.classList.remove("hidden"),t.classList.add("bg-indigo-100","text-indigo-800")):(e.classList.add("hidden"),t.classList.remove("bg-indigo-100","text-indigo-800"))}function go(){document.querySelectorAll(".tab-btn").forEach(e=>{const t=e.dataset.tab===P.currentTab;e.className=t?"tab-btn py-2 px-6 rounded-full text-xs md:text-sm font-bold bg-indigo-600 text-white shadow-md transform scale-105 transition-all whitespace-nowrap border-transparent":"tab-btn py-2 px-6 rounded-full text-xs md:text-sm font-medium text-gray-500 bg-white border-gray-200 hover:bg-gray-50 transition-all whitespace-nowrap"})}function At(e){if(!e)return"";const t=e.split("-");return`${t[2]}/${t[1]}`}async function ri(){P.startDate=document.getElementById("report-start").value,P.endDate=document.getElementById("report-end").value,P.selectedProfessional=document.getElementById("report-prof").value,P.selectedCostCenter=document.getElementById("report-cost").value,document.getElementById("date-range-display").textContent=`${At(P.startDate)} até ${At(P.endDate)}`,await ks()}function ni(e,t){const a=new Map;P.naturesList.forEach(r=>a.set(r.id,r.name));const o={revenues:{},expenses:{},totalRevenues:0,totalExpenses:0,netResult:0};return t.forEach(r=>{if(r.status==="paid"){const s=r.naturezaId?a.get(r.naturezaId)||"Outras Receitas":"Geral";o.revenues[s]||(o.revenues[s]=0),o.revenues[s]+=r.amount,o.totalRevenues+=r.amount}}),e.forEach(r=>{if(r.status==="paid"){const s=r.naturezaId?a.get(r.naturezaId)||"Outras Despesas":"Geral";o.expenses[s]||(o.expenses[s]=0),o.expenses[s]+=r.amount,o.totalExpenses+=r.amount}}),o.netResult=o.totalRevenues-o.totalExpenses,o}function ii(e,t){const a={},o=l=>{a[l]||(a[l]={realizedCredit:0,provisionedCredit:0,realizedDebit:0,provisionedDebit:0})};let r=new Date(P.startDate);const s=new Date(P.endDate);for(;r<=s;)o(r.toISOString().split("T")[0]),r.setDate(r.getDate()+1);t.forEach(l=>{const c=l.dueDate.split("T")[0];a[c]&&(l.status==="paid"?a[c].realizedCredit+=l.amount:a[c].provisionedCredit+=l.amount)}),e.forEach(l=>{const c=l.dueDate.split("T")[0];a[c]&&(l.status==="paid"?a[c].realizedDebit+=l.amount:a[c].provisionedDebit+=l.amount)});const n=Object.keys(a).sort(),i=[];let d=0;return n.forEach(l=>{const c=a[l],m=c.realizedCredit+c.provisionedCredit-(c.realizedDebit+c.provisionedDebit);d+=m,i.push(d)}),{labels:n,realizedCredit:n.map(l=>a[l].realizedCredit),provisionedCredit:n.map(l=>a[l].provisionedCredit),realizedDebit:n.map(l=>a[l].realizedDebit*-1),provisionedDebit:n.map(l=>a[l].provisionedDebit*-1),balance:i}}function li(e){const t={};let a=new Date(P.startDate);const o=new Date(P.endDate);for(;a<=o;)t[a.toISOString().split("T")[0]]=0,a.setDate(a.getDate()+1);e.forEach(n=>{if(n.status==="paid"){const i=n.dueDate.split("T")[0];t.hasOwnProperty(i)&&(t[i]+=n.amount)}});const r=Object.keys(t).sort(),s=r.map(n=>t[n]);return{labels:r,data:s}}function di(e){const t=e.length;if(t<2)return{trendData:Array(t).fill(e[0]||0),color:"#9ca3af"};let a=0,o=0,r=0,s=0;for(let c=0;c<t;c++)a+=c,o+=e[c],r+=c*e[c],s+=c*c;const n=(t*r-a*o)/(t*s-a*a),i=(o-n*a)/t,d=[];for(let c=0;c<t;c++)d.push(n*c+i);const l=n>=0?"#10b981":"#ef4444";return{trendData:d,color:l}}async function ks(){const e=document.getElementById("report-content");e.innerHTML='<div class="flex justify-center py-20 w-full"><div class="loader border-t-indigo-600"></div></div>';try{const t={startDate:P.startDate,endDate:P.endDate,establishmentId:u.establishmentId};P.selectedCostCenter!=="all"&&(t.costCenterId=P.selectedCostCenter);const[a,o]=await Promise.all([ys(t),ws(t)]);P.rawPayables=a.entries||[],P.rawReceivables=o.entries||[];const r=await Vr(P.startDate,P.endDate,P.selectedProfessional,P.selectedCostCenter).catch(()=>({charts:{professionals:{labels:[],data:[]},salesMonthly:{labels:[],data:[]}}}));P.backendData=r,P.processedDRE=ni(P.rawPayables,P.rawReceivables),P.processedCashFlow=ii(P.rawPayables,P.rawReceivables),P.processedDailyRevenue=li(P.rawReceivables);const s=new Date(P.startDate+"T00:00:00").toISOString(),n=new Date(P.endDate+"T23:59:59").toISOString(),i=P.selectedProfessional==="all"?null:P.selectedProfessional,d=await Vo(u.establishmentId,s,n,i).catch(()=>[]);P.appointmentsData=Array.isArray(d)?d:[],Ss()}catch(t){console.error(t),e.innerHTML=`
            <div class="bg-red-50 border border-red-100 p-6 rounded-2xl text-center mx-4 w-full">
                <p class="font-bold text-gray-800">Não foi possível carregar</p>
                <p class="text-sm text-gray-500 mt-1">${f(t.message||"Verifique sua conexão.")}</p>
            </div>`}}function Ss(){const e=document.getElementById("report-content");switch(P.currentTab){case"dashboards":ci(e);break;case"appointments":ui(e);break;case"dre":mi(e);break}}function ci(e){const t=P.processedDRE,a=P.processedDailyRevenue,o=P.backendData.charts?.salesMonthly||{labels:[],data:[]},r=P.backendData.charts?.professionals||{labels:[],data:[]};e.innerHTML=`
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 animate-slide-up w-full">
            <div class="bg-white p-4 md:p-5 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group w-full">
                 <div class="flex items-center gap-2 mb-2">
                    <span class="p-2 bg-blue-50 text-blue-600 rounded-lg flex-shrink-0"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8a1 1 0 011 1v4a1 1 0 11-2 0v-4a1 1 0 011-1zm0 0a1 1 0 001-1V5a1 1 0 10-2 0v2a1 1 0 001 1zm0 0a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1z" /></svg></span>
                    <p class="text-xs text-gray-500 font-bold uppercase tracking-wider truncate">Receita Realizada</p>
                </div>
                <p class="text-2xl font-black text-gray-800 tracking-tight truncate">R$ ${t.totalRevenues.toLocaleString("pt-BR",{minimumFractionDigits:2})}</p>
            </div>
            <div class="bg-white p-4 md:p-5 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden w-full">
                <div class="flex items-center gap-2 mb-2">
                    <span class="p-2 bg-red-50 text-red-600 rounded-lg flex-shrink-0"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" /></svg></span>
                    <p class="text-xs text-gray-500 font-bold uppercase tracking-wider truncate">Despesa Realizada</p>
                </div>
                <p class="text-2xl font-black text-red-500 tracking-tight truncate">R$ ${t.totalExpenses.toLocaleString("pt-BR",{minimumFractionDigits:2})}</p>
            </div>
            <div class="bg-white p-4 md:p-5 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden w-full">
                <div class="flex items-center gap-2 mb-2">
                    <span class="p-2 bg-emerald-50 text-emerald-600 rounded-lg flex-shrink-0"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></span>
                    <p class="text-xs text-gray-500 font-bold uppercase tracking-wider truncate">Saldo Realizado</p>
                </div>
                <p class="text-2xl font-black text-emerald-600 tracking-tight truncate">R$ ${t.netResult.toLocaleString("pt-BR",{minimumFractionDigits:2})}</p>
            </div>
        </div>

        <div class="bg-white p-4 md:p-5 rounded-3xl shadow-sm border border-gray-100 mt-4 md:mt-6 animate-slide-up delay-100 w-full overflow-hidden">
            <div class="mb-4 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
                <div>
                    <h3 class="text-base md:text-lg font-bold text-gray-800">Fluxo de Caixa</h3>
                    <p class="text-[10px] md:text-xs text-gray-400">Analise provisionado vs realizado.</p>
                </div>
                <div class="flex flex-wrap gap-2 md:gap-3">
                    <label class="inline-flex items-center cursor-pointer bg-gray-50 px-2 py-1 rounded-lg border border-gray-100"><input type="checkbox" checked class="chart-toggle w-4 h-4 text-emerald-500 rounded border-gray-300 focus:ring-emerald-500" data-dataset="0"><span class="ml-1.5 text-[10px] md:text-xs font-semibold text-gray-700">Créd. Real.</span></label>
                    <label class="inline-flex items-center cursor-pointer bg-gray-50 px-2 py-1 rounded-lg border border-gray-100"><input type="checkbox" checked class="chart-toggle w-4 h-4 text-emerald-300 rounded border-gray-300 focus:ring-emerald-300" data-dataset="1"><span class="ml-1.5 text-[10px] md:text-xs font-semibold text-gray-700">Créd. Prov.</span></label>
                    <label class="inline-flex items-center cursor-pointer bg-gray-50 px-2 py-1 rounded-lg border border-gray-100"><input type="checkbox" checked class="chart-toggle w-4 h-4 text-red-500 rounded border-gray-300 focus:ring-red-500" data-dataset="2"><span class="ml-1.5 text-[10px] md:text-xs font-semibold text-gray-700">Déb. Real.</span></label>
                    <label class="inline-flex items-center cursor-pointer bg-gray-50 px-2 py-1 rounded-lg border border-gray-100"><input type="checkbox" checked class="chart-toggle w-4 h-4 text-red-300 rounded border-gray-300 focus:ring-red-300" data-dataset="3"><span class="ml-1.5 text-[10px] md:text-xs font-semibold text-gray-700">Déb. Prov.</span></label>
                    <label class="inline-flex items-center cursor-pointer bg-gray-50 px-2 py-1 rounded-lg border border-gray-100"><input type="checkbox" checked class="chart-toggle w-4 h-4 text-blue-500 rounded border-gray-300 focus:ring-blue-500" data-dataset="4"><span class="ml-1.5 text-[10px] md:text-xs font-semibold text-gray-700">Saldo</span></label>
                </div>
            </div>
            <div class="relative w-full h-60 md:h-80"><canvas id="chart-cashflow-modern"></canvas></div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mt-4 md:mt-6 animate-slide-up delay-200 w-full">
            <div class="bg-white p-4 md:p-5 rounded-3xl shadow-sm border border-gray-100 w-full overflow-hidden">
                <h3 class="font-bold text-gray-800 mb-4 text-xs md:text-sm uppercase tracking-wide truncate">Faturamento Diário (Realizado)</h3>
                <div class="relative h-56 md:h-64 w-full"><canvas id="chart-daily-revenue"></canvas></div>
            </div>
             <div class="bg-white p-4 md:p-5 rounded-3xl shadow-sm border border-gray-100 w-full overflow-hidden">
                <h3 class="font-bold text-gray-800 mb-4 text-xs md:text-sm uppercase tracking-wide truncate">Evolução Mensal (Realizada)</h3>
                <div class="relative h-56 md:h-64 w-full"><canvas id="chart-monthly"></canvas></div>
            </div>
            <div class="bg-white p-4 md:p-5 rounded-3xl shadow-sm border border-gray-100 w-full overflow-hidden lg:col-span-2">
                <h3 class="font-bold text-gray-800 mb-4 text-xs md:text-sm uppercase tracking-wide truncate">Faturamento por Profissional</h3>
                <div class="relative h-56 md:h-64 flex justify-center w-full"><canvas id="chart-profs"></canvas></div>
            </div>
        </div>
    `,pi("chart-cashflow-modern",P.processedCashFlow),bo("chart-daily-revenue","Receita Diária",a.labels.map(s=>s.split("-").reverse().slice(0,2).join("/")),a.data),bo("chart-monthly","Receita Mensal",o.labels,o.data),bi("chart-profs","doughnut","Total Vendas",r.labels,r.data,ti),document.querySelectorAll(".chart-toggle").forEach(s=>{s.addEventListener("change",n=>{const i=Z["chart-cashflow-modern"];if(i){const d=parseInt(n.target.dataset.dataset);i.setDatasetVisibility(d,n.target.checked),i.update()}})})}function ui(e){const t=P.appointmentsData,a=t.length;let o=0,r=0,s=0;const n={},i={};let d=new Date(P.startDate);const l=new Date(P.endDate);for(;d<=l;)n[d.toISOString().split("T")[0]]={active:0,cancelled:0},d.setDate(d.getDate()+1);t.forEach(v=>{const h=parseFloat(v.totalAmount||v.price||0),y=(v.status||"").toLowerCase();let w="";if(v.startTime){const k=v.startTime.toDate?v.startTime.toDate():new Date(v.startTime);isNaN(k)||(w=k.toISOString().split("T")[0])}const $=v.professionalName||"Sem Profissional";i[$]||(i[$]={name:$,count:0,value:0}),["cancelled","cancelado","no-show","cancelada"].includes(y)?(r++,w&&n[w]&&n[w].cancelled++):(["completed","finalized","paid"].includes(y)&&o++,s+=h,w&&n[w]&&n[w].active++,i[$].count++,i[$].value+=h)});const c=Object.keys(n).sort(),m=c.map(v=>n[v].active),p=c.map(v=>n[v].cancelled),b=Object.values(i).sort((v,h)=>h.value-v.value);e.innerHTML=`
        <div class="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 animate-slide-up w-full">
            <div class="bg-white p-3 md:p-4 rounded-2xl shadow-sm border border-gray-100 col-span-2 md:col-span-1 w-full">
                <p class="text-[10px] text-gray-500 font-bold uppercase truncate">Agendamentos</p>
                <div class="flex items-end gap-2 mt-1">
                    <p class="text-2xl md:text-3xl font-black text-gray-800">${a}</p>
                </div>
            </div>
            
            <div class="bg-white p-3 md:p-4 rounded-2xl shadow-sm border border-gray-100 w-full">
                <p class="text-[10px] text-gray-500 font-bold uppercase truncate">Concluídos</p>
                <p class="text-lg md:text-xl font-black text-indigo-600 mt-1">${a>0?Math.round(o/a*100):0}%</p>
            </div>
             <div class="bg-white p-3 md:p-4 rounded-2xl shadow-sm border border-gray-100 w-full">
                <p class="text-[10px] text-gray-500 font-bold uppercase truncate">Cancelados</p>
                <p class="text-lg md:text-xl font-black text-red-500 mt-1">${r}</p>
            </div>

            <div class="bg-white p-3 md:p-4 rounded-2xl shadow-sm border border-gray-100 col-span-2 md:col-span-1 w-full">
                <p class="text-[10px] text-gray-500 font-bold uppercase truncate">Valor Estimado</p>
                 <p class="text-xl md:text-2xl font-black text-gray-800 mt-1 truncate">R$ ${s.toLocaleString("pt-BR",{minimumFractionDigits:0})}</p>
            </div>
        </div>

        <div class="bg-white p-4 md:p-5 rounded-3xl shadow-sm border border-gray-100 mt-4 animate-slide-up delay-100 w-full overflow-hidden">
            <div class="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <h3 class="text-base md:text-lg font-bold text-gray-800 truncate">Volume Diário</h3>
                
                <div class="flex flex-wrap gap-2">
                    <label class="inline-flex items-center cursor-pointer bg-gray-50 px-2 py-1 rounded-lg border border-gray-100">
                        <input type="checkbox" checked class="app-chart-toggle w-4 h-4 text-indigo-500 rounded border-gray-300 focus:ring-indigo-500" data-dataset="0">
                        <span class="ml-1.5 text-[10px] md:text-xs font-semibold text-gray-700">Realizados</span>
                    </label>
                    <label class="inline-flex items-center cursor-pointer bg-gray-50 px-2 py-1 rounded-lg border border-gray-100">
                        <input type="checkbox" checked class="app-chart-toggle w-4 h-4 text-red-500 rounded border-gray-300 focus:ring-red-500" data-dataset="1">
                        <span class="ml-1.5 text-[10px] md:text-xs font-semibold text-gray-700">Cancelados</span>
                    </label>
                </div>
            </div>
            
            <div class="relative w-full h-56 md:h-64">
                <canvas id="chart-appointments-daily"></canvas>
            </div>
        </div>

        <div class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mt-4 animate-slide-up delay-200 w-full">
            <div class="p-4 md:p-5 border-b border-gray-50 bg-gray-50/50">
                <h3 class="text-base md:text-lg font-bold text-gray-800 truncate">Ranking Profissional</h3>
            </div>
            <div class="overflow-x-auto no-scrollbar w-full">
                <table class="w-full text-xs md:text-sm min-w-full">
                    <tbody class="divide-y divide-gray-100">
                        ${b.map((v,h)=>{const y=b[0]?.value||1,w=v.value/y*100;return`
                            <tr class="group">
                                <td class="p-3 md:p-4 w-8 md:w-12 text-center font-bold text-gray-300">${h+1}</td>
                                <td class="p-3 md:p-4 pl-0 min-w-[100px]">
                                    <p class="font-bold text-gray-800 truncate max-w-[120px] md:max-w-xs">${f(v.name)}</p>
                                    <div class="w-full h-1.5 bg-gray-100 rounded-full mt-2 overflow-hidden">
                                        <div class="h-full bg-indigo-500 rounded-full" style="width: ${w}%"></div>
                                    </div>
                                </td>
                                <td class="p-3 md:p-4 text-center">
                                    <span class="bg-indigo-50 text-indigo-700 px-2 md:px-2.5 py-1 rounded-lg font-bold text-xs">${v.count}</span>
                                </td>
                                <td class="p-3 md:p-4 text-right font-bold text-gray-700 whitespace-nowrap">R$ ${v.value.toLocaleString("pt-BR",{minimumFractionDigits:0})}</td>
                            </tr>
                        `}).join("")}
                        ${b.length===0?'<tr><td colspan="4" class="p-8 text-center text-gray-400">Sem dados.</td></tr>':""}
                    </tbody>
                </table>
            </div>
        </div>
    `,gi("chart-appointments-daily",c,m,p),document.querySelectorAll(".app-chart-toggle").forEach(v=>{v.addEventListener("change",h=>{const y=Z["chart-appointments-daily"];if(y){const w=parseInt(h.target.dataset.dataset);y.setDatasetVisibility(w,h.target.checked),y.update()}})})}function mi(e){const t=P.processedDRE;if(!t)return;const a=t.totalRevenues,o=(i,d,l,c=!1)=>{const m=a>0?d/a*100:0,p=c?"- ":"";return`
        <div class="flex items-center justify-between py-2 md:py-3 px-3 md:px-4 border-b border-dashed border-gray-100 last:border-0 w-full">
            <div class="flex-1 pr-2 md:pr-4 overflow-hidden min-w-0">
                <p class="text-[10px] md:text-xs font-semibold text-gray-600 truncate">${f(i)}</p>
                <div class="w-full h-1 bg-gray-100 rounded-full mt-1.5 overflow-hidden max-w-[80px] md:max-w-[100px]">
                    <div class="h-full ${l.replace("text-","bg-")} opacity-40" style="width: ${Math.min(m,100)}%"></div>
                </div>
            </div>
            <div class="text-right flex-shrink-0">
                <p class="text-xs md:text-sm font-bold ${l}">${p}R$ ${d.toLocaleString("pt-BR",{minimumFractionDigits:2})}</p>
                <p class="text-[9px] md:text-[10px] text-gray-400 font-medium">${m.toFixed(1)}%</p>
            </div>
        </div>`},r=Object.entries(t.revenues).map(([i,d])=>o(i,d,"text-emerald-600",!1)).join(""),s=Object.entries(t.expenses).map(([i,d])=>o(i,d,"text-red-500",!0)).join(""),n=t.netResult>=0?"Lucro Real":"Prejuízo Real";e.innerHTML=`
        <div class="max-w-xl mx-auto animate-slide-up pb-10 w-full">
            <div class="bg-gray-900 text-white rounded-3xl p-5 md:p-6 shadow-xl relative overflow-hidden mb-4 md:mb-6 w-full">
                <div class="absolute right-0 top-0 opacity-10 transform translate-x-1/4 -translate-y-1/4">
                    <svg class="w-32 h-32 md:w-48 md:h-48" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
                </div>
                <p class="text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-widest mb-1 truncate">Resultado Líquido (Realizado)</p>
                <h2 class="text-3xl md:text-4xl font-black mb-2 truncate">R$ ${t.netResult.toLocaleString("pt-BR",{minimumFractionDigits:2})}</h2>
                <span class="inline-block px-2 py-1 md:px-3 md:py-1 bg-white/20 rounded-lg text-[10px] md:text-xs font-bold backdrop-blur-sm whitespace-nowrap">
                    ${n}: ${(a>0?t.netResult/a*100:0).toFixed(1)}% de Margem
                </span>
            </div>

            <div class="space-y-3 md:space-y-4 w-full">
                <div class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden w-full">
                    <div class="bg-gray-50/50 p-3 border-b border-gray-100 flex justify-between items-center">
                        <h3 class="text-xs font-bold text-gray-500 uppercase tracking-wider pl-2 truncate">Receitas Baixadas</h3>
                        <span class="text-[10px] md:text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md flex-shrink-0 whitespace-nowrap">Total: R$ ${t.totalRevenues.toLocaleString("pt-BR",{minimumFractionDigits:0})}</span>
                    </div>
                    <div>${r||'<p class="text-xs text-gray-400 p-4 text-center">Nenhuma receita baixada.</p>'}</div>
                </div>

                <div class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden w-full">
                    <div class="bg-gray-50/50 p-3 border-b border-gray-100 flex justify-between items-center">
                        <h3 class="text-xs font-bold text-gray-500 uppercase tracking-wider pl-2 truncate">Despesas Baixadas</h3>
                        <span class="text-[10px] md:text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-md flex-shrink-0 whitespace-nowrap">Total: R$ ${t.totalExpenses.toLocaleString("pt-BR",{minimumFractionDigits:0})}</span>
                    </div>
                    <div>${s||'<p class="text-xs text-gray-400 p-4 text-center">Nenhuma despesa baixada.</p>'}</div>
                </div>
            </div>
        </div>
    `}function pi(e,t){const a=document.getElementById(e);if(!a)return;const o=a.getContext("2d");Z[e]&&Z[e].destroy();const r=o.createLinearGradient(0,0,0,400);r.addColorStop(0,"rgba(59, 130, 246, 0.4)"),r.addColorStop(1,"rgba(59, 130, 246, 0.0)");const s=t.labels.map(n=>n.split("-").reverse().slice(0,2).join("/"));Z[e]=new Chart(o,{type:"bar",data:{labels:s,datasets:[{label:"Créd. Realizado",data:t.realizedCredit,backgroundColor:ft.creditRealized,borderRadius:3,barPercentage:.7,order:1},{label:"Créd. Provisionado",data:t.provisionedCredit,backgroundColor:ft.creditProvisioned,borderRadius:3,borderWidth:1,borderColor:"#fff",borderDash:[5,5],barPercentage:.7,order:2},{label:"Déb. Realizado",data:t.realizedDebit,backgroundColor:ft.debitRealized,borderRadius:3,barPercentage:.7,order:3},{label:"Déb. Provisionado",data:t.provisionedDebit,backgroundColor:ft.debitProvisioned,borderRadius:3,borderWidth:1,borderColor:"#fff",borderDash:[5,5],barPercentage:.7,order:4},{label:"Saldo Acumulado",data:t.balance,type:"line",borderColor:"#3b82f6",backgroundColor:r,borderWidth:3,pointRadius:3,pointBackgroundColor:"#fff",pointBorderColor:"#3b82f6",pointBorderWidth:2,pointHoverRadius:8,hitRadius:30,fill:!0,tension:.4,order:0}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"index",intersect:!1},plugins:{legend:{display:!1},tooltip:{backgroundColor:"#fff",titleColor:"#111",bodyColor:"#444",borderColor:"#eee",borderWidth:1,padding:10,callbacks:{label:function(n){let i=n.dataset.label||"";return i&&(i+=": "),n.parsed.y!==null&&(i+=new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(Math.abs(n.parsed.y))),i}}}},scales:{x:{stacked:!0,grid:{display:!1},ticks:{font:{size:10}}},y:{stacked:!0,display:!0,grid:{color:"#f3f4f6",borderDash:[4,4]},ticks:{callback:n=>new Intl.NumberFormat("pt-BR",{notation:"compact"}).format(Math.abs(n)),font:{size:10}}}}}})}function gi(e,t,a,o){const r=document.getElementById(e);if(!r)return;const s=r.getContext("2d");Z[e]&&Z[e].destroy();const n=t.map(i=>i.split("-").reverse().slice(0,2).join("/"));Z[e]=new Chart(s,{type:"bar",data:{labels:n,datasets:[{label:"Realizados",data:a,backgroundColor:"#4f46e5",borderRadius:3,barPercentage:.6,order:1},{label:"Cancelados",data:o,backgroundColor:"#ef4444",borderRadius:3,barPercentage:.6,order:2}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"index",intersect:!1},plugins:{legend:{display:!1},tooltip:{backgroundColor:"#fff",titleColor:"#111",bodyColor:"#444",borderColor:"#eee",borderWidth:1}},scales:{x:{grid:{display:!1},ticks:{font:{size:10}}},y:{beginAtZero:!0,grid:{color:"#f3f4f6"},ticks:{stepSize:1,font:{size:10}}}}}})}function bo(e,t,a,o){const r=document.getElementById(e);if(!r)return;const s=r.getContext("2d");Z[e]&&Z[e].destroy();const{trendData:n,color:i}=di(o),d=n.map((m,p)=>p===n.length-1?"triangle":"circle"),l=n.map((m,p)=>p===n.length-1?6:3),c=n.map((m,p)=>p===n.length-1&&i==="#ef4444"?180:0);Z[e]=new Chart(s,{type:"bar",data:{labels:a,datasets:[{label:t,data:o,backgroundColor:"#4f46e5",borderRadius:4,order:1},{label:"Tendência",data:n,type:"line",borderColor:i,borderWidth:3,pointStyle:d,pointRadius:l,pointRotation:c,pointBackgroundColor:"#fff",pointBorderColor:i,pointBorderWidth:2,pointHoverRadius:8,hitRadius:30,fill:!1,tension:0,order:0}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1}},scales:{x:{grid:{display:!1},ticks:{font:{size:9}}},y:{grid:{color:"#f3f4f6"},beginAtZero:!0,ticks:{font:{size:9},callback:m=>new Intl.NumberFormat("pt-BR",{notation:"compact"}).format(m)}}}}})}function bi(e,t,a,o,r,s){const n=document.getElementById(e);if(!n)return;const i=n.getContext("2d");Z[e]&&Z[e].destroy(),new Chart(i,{type:t,data:{labels:o,datasets:[{label:a,data:r,backgroundColor:s,borderColor:Array.isArray(s)?"#fff":s,borderWidth:1,tension:.3,fill:t==="line"}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:t==="doughnut",position:"right",labels:{usePointStyle:!0,boxWidth:8,font:{size:10}}}},scales:{}}})}const Qt=(e,t="products")=>E(`/api/${t}/categories/${e}`),$s=(e,t="products")=>E(`/api/${t}/categories`,{method:"POST",body:JSON.stringify(e)}),Es=(e,t="products")=>E(`/api/${t}/categories/${e}`,{method:"DELETE"}),fi="audit_logs",_e=async(e,t,a,o,r,s=null)=>{try{if(!t)return;await Fo(ge(W,fi),{establishmentId:e,userId:t.uid,userName:t.name||t.email||"Utilizador",module:a,action:o,description:r,details:s,timestamp:new Date})}catch(n){console.error("Falha silenciosa ao registar log:",n)}},he=document.getElementById("content");let de=null,et="services",we="all";function We(){const e=U.currentUser;return e?{uid:e.uid,name:e.displayName||e.email}:{uid:"unknown",name:"Desconhecido"}}async function vi(e){e.preventDefault();const a=e.target.closest("#categoryForm").querySelector("#categoryName"),o=a.value;if(o)try{await $s({establishmentId:u.establishmentId,name:o},"services"),_e(u.establishmentId,We(),"Categorias (Serviços)","Criou",`Criou categoria: ${o}`),a.value="",g("Sucesso","Categoria criada!","success"),await Aa(),await pt()}catch(r){g("Erro",`Não foi possível criar a categoria: ${r.message}`,"error")}}async function hi(e){if(await H("Apagar Categoria","Tem a certeza? Os serviços nesta categoria ficarão sem categoria."))try{await Es(e,"services"),_e(u.establishmentId,We(),"Categorias (Serviços)","Excluiu",`Excluiu uma categoria (ID: ${e})`),g("Sucesso","Categoria apagada.","success"),await Aa(),await pt()}catch{g("Erro","Não foi possível apagar a categoria.","error")}}async function Aa(){const e=document.getElementById("categoryList");if(e){e.innerHTML='<div class="loader mx-auto my-4"></div>';try{const t=await Qt(u.establishmentId,"services");u.serviceCategories=t,e.innerHTML="",t.length>0?e.innerHTML=t.map(a=>`
                <div class="flex justify-between items-center bg-gray-100 p-2 rounded">
                    <span>${f(a.name)}</span>
                    <button data-action="delete-category" data-id="${a.id}" class="text-red-500 hover:text-red-700 font-semibold text-sm">Apagar</button>
                </div>`).join(""):e.innerHTML='<p class="text-center text-gray-500">Nenhuma categoria criada.</p>'}catch{e.innerHTML='<p class="text-red-500 text-center">Erro ao carregar categorias.</p>'}}}function xi(){_({title:"Gerir Categorias de Serviços",contentHTML:`
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
    `,maxWidth:"max-w-xl"});const t=document.getElementById("genericModal");if(t){const a=t.querySelector("#categoryForm");a&&(a.addEventListener("submit",vi),t.addEventListener("click",o=>{const r=o.target.closest('button[data-action="delete-category"]');r&&(o.preventDefault(),hi(r.dataset.id))}))}Aa()}async function yi(e){e.preventDefault();const t=e.target.closest("#serviceModal"),a=t.querySelector("#serviceId").value,o={},r=t.querySelector('input[name="commissionType"]:checked').value;r==="custom"&&t.querySelectorAll(".professional-commission-row").forEach(n=>{const i=n.dataset.profId;if(n.querySelector('input[type="checkbox"]').checked){const l=parseFloat(n.querySelector('input[type="number"]').value);o[i]=isNaN(l)?0:l}});const s={establishmentId:u.establishmentId,name:t.querySelector("#serviceName").value,price:parseFloat(t.querySelector("#servicePrice").value),duration:parseInt(t.querySelector("#serviceDurationMinutes").value,10),bufferTime:parseInt(t.querySelector("#serviceBufferTimeMinutes").value,10)||0,categoryId:t.querySelector("#serviceCategory").value||null,commissionRate:parseFloat(t.querySelector("#serviceCommissionRate").value)||0,active:t.querySelector("#serviceStatus").value==="true",photo:t.querySelector("#servicePhotoBase64").value,notes:t.querySelector("#serviceNotes").value,commissionType:r,professionalCommissions:o};try{a?(await hr(a,s),_e(u.establishmentId,We(),"Serviços","Editou",`Editou o serviço: ${s.name}`)):(await Wo(s),_e(u.establishmentId,We(),"Serviços","Criou",`Criou novo serviço: ${s.name}`)),document.getElementById("serviceModal").style.display="none",g("Sucesso",`Serviço ${a?"atualizado":"adicionado"} com sucesso!`,"success"),await pt()}catch(n){g("Erro",n.message,"error")}}function fo(e=null){const t=document.getElementById("serviceModal"),a=u.serviceCategories||[],o=e?.duration||0,r=e?.bufferTime||0,s=f(e?.name||""),n=f(e?.notes||""),i=e?s:"Novo Serviço",d=a.map(C=>`<option value="${C.id}" ${e?.categoryId===C.id?"selected":""}>${f(C.name)}</option>`).join("");t.innerHTML=`
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
                        <input type="text" id="serviceName" value="${s}" class="mt-1 w-full p-2 border rounded-md" required>
                    </div>
                    <div>
                        <label for="servicePrice" class="block text-sm font-medium text-gray-700">Preço (a partir de:)</label>
                        <input type="number" id="servicePrice" step="0.01" value="${e?.price||""}" class="mt-1 w-full p-2 border rounded-md" required>
                    </div>
                    <div>
                        <label for="serviceCategory" class="block text-sm font-medium text-gray-700">Categoria</label>
                        <select id="serviceCategory" class="mt-1 w-full p-2 border rounded-md bg-white">
                            <option value="">Sem Categoria</option>
                            ${d}
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
    </div>`,t.style.display="flex",t.addEventListener("click",async C=>{const T=C.target.closest("button[data-action]");if(!T)return;const A=T.dataset.action,q=T.dataset.id;if(A==="close-modal"&&(t.style.display="none"),A==="delete-service"){if(!q)return;if(t.style.display="none",await H("Apagar Serviço","Tem a certeza que deseja apagar este serviço?"))try{const M=u.services.find(R=>R.id===q)?.name||"Desconhecido";await xr(q),_e(u.establishmentId,We(),"Serviços","Excluiu",`Excluiu o serviço: ${M}`),g("Sucesso","Serviço apagado com sucesso!","success"),await pt()}catch(M){g("Erro",`Não foi possível apagar o serviço: ${M.message}`,"error")}else t.style.display="flex"}});const l=t.querySelectorAll(".tab-btn"),c=t.querySelectorAll(".tab-content");l.forEach(C=>{C.addEventListener("click",()=>{l.forEach(T=>{T.classList.remove("border-indigo-500","text-indigo-600"),T.classList.add("border-transparent","text-gray-500","hover:text-gray-700","hover:border-gray-300")}),C.classList.add("border-indigo-500","text-indigo-600"),C.classList.remove("border-transparent","text-gray-500","hover:text-gray-700","hover:border-gray-300"),c.forEach(T=>T.classList.add("hidden")),document.getElementById(`tab-content-${C.dataset.tab}`).classList.remove("hidden")})});const m=t.querySelectorAll('input[name="commissionType"]'),p=document.getElementById("defaultCommissionRateContainer"),b=document.getElementById("professionalCommissionsContainer");function v(){const C=t.querySelector('input[name="commissionType"]:checked').value;p&&(p.style.display=C==="default"?"block":"none"),b&&(b.style.display=C==="custom"?"block":"none")}m.forEach(C=>C.addEventListener("change",v));const h=document.getElementById("professionalCommissionsList");h&&(h.innerHTML=(u.professionals||[]).map(C=>{const T=e?.professionalCommissions?.[C.id]!==void 0,A=e?.professionalCommissions?.[C.id]||0;return`
                <div class="professional-commission-row flex items-center justify-between p-2 rounded-md ${T?"bg-blue-50":""}" data-prof-id="${C.id}">
                    <label class="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" ${T?"checked":""} class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                        <img src="${C.photo||`https://placehold.co/40x40/E2E8F0/4A5568?text=${f(C.name.charAt(0))}`}" class="w-8 h-8 rounded-full object-cover">
                        <span class="text-sm font-medium">${f(C.name)}</span>
                    </label>
                    <div class="flex items-center gap-1">
                        <input type="number" value="${A}" class="w-20 p-1 border rounded-md text-sm text-center" ${T?"":"disabled"}>
                        <span class="text-sm font-semibold">%</span>
                    </div>
                </div>
            `}).join(""),h.querySelectorAll('input[type="checkbox"]').forEach(C=>{C.addEventListener("change",T=>{const A=T.target.closest(".professional-commission-row");A.querySelector('input[type="number"]').disabled=!T.target.checked,A.classList.toggle("bg-blue-50",T.target.checked)})})),v();const y=t.querySelector("#serviceForm"),w=t.querySelector("#servicePhotoInput"),$=t.querySelector("#servicePhotoPreview"),k=t.querySelector("#servicePhotoBase64");t.querySelector("#servicePhotoButton").addEventListener("click",()=>w.click()),w.onchange=async()=>{const C=w.files[0];if(C){$.src="https://placehold.co/128x128/E2E8F0/4A5568?text=...";try{const T=await os(C,800,800,.8),q=T.length*3/4,D=1e3*1024;if(q>D)throw new Error("A imagem é muito grande mesmo após a compressão.");$.src=T,k.value=T}catch(T){console.error("Erro ao processar imagem:",T),g("Erro de Imagem",T.message||"Não foi possível processar a imagem.","error"),$.src=e?.photo||"https://placehold.co/128x128/E2E8F0/4A5568?text=Foto",k.value=e?.photo||"",w.value=""}}},y.addEventListener("submit",yi)}function Pe(){const e=document.getElementById("servicesList");if(!e)return;const t=document.getElementById("serviceSearchInput")?.value.toLowerCase()||"",a=document.getElementById("serviceCategoryFilter")?.value||"all",o=new Map((u.serviceCategories||[]).map(s=>[s.id,s.name]));let r=(u.services||[]).filter(Boolean);if(we!=="all"){const s=we==="active";r=r.filter(n=>n.active!==!1===s)}r=r.filter(s=>{const n=s.name.toLowerCase().includes(t),i=a==="all"||s.categoryId===a;return n&&i}),e.innerHTML="",r.length>0?r.forEach(s=>{const n=document.createElement("div"),i=JSON.stringify(s).replace(/'/g,"&apos;");n.className=`service-card bg-white rounded-lg shadow-md flex overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-lg hover:bg-gray-50 ${s.active!==!1?"opacity-100":"opacity-50 bg-gray-100"} sm:flex-col`,n.dataset.action="edit-service",n.dataset.service=i;const d=f(s.name),l=f(o.get(s.categoryId)||"N/A"),c=s.photo||`https://placehold.co/200x200/E2E8F0/4A5568?text=${encodeURIComponent(s.name.charAt(0))}`;n.innerHTML=`
                <img src="${c}" alt="Imagem de ${d}" class="w-20 h-20 object-cover flex-shrink-0 sm:w-full sm:h-24">
                
                <div class="p-3 flex flex-col flex-grow justify-between w-full">
                    <div class="flex justify-between items-start mb-1">
                        <h3 class="text-sm font-bold text-gray-900 flex-1 text-left truncate pr-2">${d}</h3>
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
                </div>`,e.appendChild(n)}):e.innerHTML='<p class="col-span-full text-center text-gray-500 py-10">Nenhum serviço encontrado.</p>'}function qa(){const e={active:0,inactive:0,total:0},t=(u.services||[]).filter(Boolean);t.forEach(n=>{n.active===!1?e.inactive++:e.active++}),e.total=t.length;const a=document.getElementById("indicator-total"),o=document.getElementById("indicator-active"),r=document.getElementById("indicator-inactive"),s=document.getElementById("indicator-popular");a&&(a.textContent=e.total),o&&(o.textContent=e.active),r&&(r.textContent=e.inactive),s&&(u.mostPopularService&&u.mostPopularService.name!=="N/A"?(s.textContent=f(u.mostPopularService.name),s.closest(".indicator-card").title=`${u.mostPopularService.name} (${u.mostPopularService.count} agendamentos)`):(s.textContent="N/A",s.closest(".indicator-card").title="Nenhum serviço agendado ainda"))}function wi(){const e=document.getElementById("services-content-container");e.innerHTML=`
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
    `;const t=document.getElementById("serviceCategoryFilter");t&&(t.innerHTML='<option value="all">Todas as categorias</option>',(u.serviceCategories||[]).forEach(a=>t.innerHTML+=`<option value="${a.id}">${f(a.name)}</option>`)),qa(),Pe()}function ki(){const e=document.getElementById("services-content-container");e.innerHTML=`
        <div class="p-8 text-center">
            <h3 class="text-xl font-bold text-gray-700">Relatórios de Serviços</h3>
            <p class="text-gray-500 mt-2">Em breve, aqui poderás ver relatórios detalhados sobre os teus serviços mais rentáveis, mais agendados e muito mais.</p>
        </div>
    `}async function pt(){const e=document.getElementById("services-content-container");if(e){const t=e.querySelector(".loader");t&&(t.style.display="block")}try{const[t,a,o,r]=await Promise.all([be(u.establishmentId),ee(u.establishmentId),Qt(u.establishmentId,"services"),wr(u.establishmentId)]);u.services=(t||[]).filter(Boolean),u.professionals=(a||[]).filter(Boolean),u.serviceCategories=(o||[]).filter(Boolean),u.mostPopularService=r||{name:"N/A",count:0},u.services.forEach(s=>{s.active===void 0&&(s.active=!0)}),Is(et)}catch(t){e&&(e.innerHTML='<p class="text-red-500 col-span-full text-center py-10">Erro ao carregar dados. Verifique a conexão com o servidor.</p>'),g("Erro",`Não foi possível carregar os dados: ${t.message}`,"error")}}function Is(e){if(document.getElementById("services-content-container")){if(et===e&&document.getElementById("services-content-container").children.length>1){et==="services"&&(qa(),Pe());return}et=e,we="all",document.querySelectorAll("#services-tabs button.tab-button").forEach(t=>{const a=t.dataset.view===e;t.classList.toggle("border-indigo-500",a),t.classList.toggle("text-indigo-600",a),t.classList.toggle("border-transparent",!a),t.classList.toggle("text-gray-500",!a)}),e==="services"?wi():e==="reports"&&ki()}}function Si(){de&&(he.removeEventListener("click",de),he.removeEventListener("input",de),he.removeEventListener("change",de)),de=async e=>{const t=e.target;if(t.closest('[data-action="toggle-service-status"]')){e.stopPropagation();const r=t.closest('[data-action="toggle-service-status"]'),s=r.dataset.id,n=r.checked;try{await yr(s,n);const i=u.services.findIndex(d=>d.id===s);i>-1&&(u.services[i].active=n),_e(u.establishmentId,We(),"Serviços","Atualizou Status",`Alterou status do serviço (ID: ${s}) para ${n?"Ativo":"Inativo"}`),Pe(),qa()}catch(i){g("Erro",`Não foi possível atualizar o status: ${i.message}`,"error"),r.checked=!n,Pe()}return}const a=t.closest("button[data-action], button[data-view], .indicator-card[data-action], .service-card[data-action]");if(t.id==="serviceSearchInput"||t.id==="serviceCategoryFilter"){Pe();return}if(!a)return;if(a.hasAttribute("data-view")){Is(a.dataset.view);return}switch(a.dataset.action){case"new-service":fo();break;case"edit-service":const r=JSON.parse(a.dataset.service);fo(r);break;case"manage-categories":xi();break;case"filter-service":const s=a.dataset.filterType;if(s==="popular")return;we=s==="total"?"all":s,document.querySelectorAll('.indicator-card[data-action="filter-service"]').forEach(n=>{const i=n.dataset.filterType,l=i===we||i==="total"&&we==="all";n.classList.toggle("ring-2",l),n.classList.toggle("ring-indigo-500",l),n.classList.toggle("shadow-lg",l)}),Pe();break}},he.addEventListener("click",de),he.addEventListener("input",de),he.addEventListener("change",de)}async function $i(){he.innerHTML=`
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
        </section>`,Si();try{(!u.professionals||u.professionals.length===0)&&(u.professionals=await ee(u.establishmentId)||[])}catch(e){console.error("Falha ao carregar profissionais:",e),g("Erro","Não foi possível carregar a lista de profissionais.","error"),u.professionals=[]}et="services",we="all",await pt()}const Xt="suppliers",Na="purchases",Cs="financial_payables",Ra=async e=>{try{const t=Ot(ge(W,Xt),it("establishmentId","==",e)),a=await Ea(t),o=[];return a.forEach(r=>{o.push({id:r.id,...r.data()})}),o}catch(t){throw console.error("Erro ao buscar fornecedores:",t),t}},Ei=async e=>{try{return{id:(await Fo(ge(W,Xt),e)).id,...e}}catch(t){throw console.error("Erro ao criar fornecedor:",t),t}},Ii=async(e,t)=>{try{const a=pe(W,Xt,e);return await $a(a,t),{id:e,...t}}catch(a){throw console.error("Erro ao atualizar fornecedor:",a),a}},Ci=async e=>{try{const t=pe(W,Xt,e);return await Ys(t),!0}catch(t){throw console.error("Erro ao excluir fornecedor:",t),t}},Li=async(e,t=null)=>{try{const a=Oo(W),o=pe(ge(W,Na)),r={...e,createdAt:Ja()};if(a.set(o,r),t&&t.defaultNatureId&&t.defaultCostCenterId){const s=pe(ge(W,Cs)),n=new Date().toISOString().split("T")[0],i={establishmentId:e.establishmentId,description:`Compra - ${e.supplierName}`,amount:parseFloat(e.totalAmount),dueDate:n,naturezaId:t.defaultNatureId,centroDeCustoId:t.defaultCostCenterId,notes:`Gerado automaticamente pelo Pedido de Compra. Itens: ${e.items.length}`,status:"pending",paymentDate:null,purchaseId:o.id,createdAt:Ja()};a.set(s,i)}return await a.commit(),{id:o.id,...r}}catch(a){throw console.error("Erro ao registrar compra com integração:",a),a}},Ti=async(e,t)=>{try{const a=Oo(W),o=pe(W,Na,e);a.delete(o);const r=Ot(ge(W,Cs),it("purchaseId","==",e),it("establishmentId","==",t));return(await Ea(r)).forEach(n=>{a.delete(n.ref)}),await a.commit(),!0}catch(a){throw console.error("Erro ao excluir compra e financeiro:",a),a}},Di=async e=>{try{const t=Ot(ge(W,Na),it("establishmentId","==",e),Ho("createdAt","desc")),a=await Ea(t),o=[];return a.forEach(r=>{o.push({id:r.id,...r.data()})}),o}catch(t){throw console.error("Erro ao buscar histórico de compras:",t),t}},fe=document.getElementById("content");let ce=null,tt="products",re="all";async function Pi(e){e.preventDefault();const a=e.target.closest("#categoryForm").querySelector("#categoryName"),o=a.value;if(o)try{await $s({establishmentId:u.establishmentId,name:o},"products"),a.value="",g("Sucesso","Categoria de produto criada!","success"),await ja(),await gt()}catch(r){g("Erro",`Não foi possível criar a categoria: ${r.message}`,"error")}}async function Bi(e){if(await H("Apagar Categoria","Tem a certeza? Os produtos nesta categoria ficarão sem categoria."))try{await Es(e,"products"),g("Sucesso","Categoria de produto apagada.","success"),await ja(),await gt()}catch{g("Erro","Não foi possível apagar a categoria.","error")}}async function ja(){const e=document.getElementById("categoryList");if(e){e.innerHTML='<div class="loader mx-auto my-4"></div>';try{const t=await Qt(u.establishmentId,"products");u.categories=t,e.innerHTML="",t.length>0?e.innerHTML=t.map(a=>`
                <div class="flex justify-between items-center bg-gray-100 p-2 rounded">
                    <span>${f(a.name)}</span>
                    <button data-action="delete-category" data-id="${a.id}" class="text-red-500 hover:text-red-700 font-semibold text-sm">Apagar</button>
                </div>`).join(""):e.innerHTML='<p class="text-center text-gray-500">Nenhuma categoria encontrada.</p>'}catch{e.innerHTML='<p class="text-red-500 text-center">Erro ao carregar categorias.</p>'}}}function Mi(){_({title:"Gerir Categorias de Produtos",contentHTML:`
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
    `,maxWidth:"max-w-xl"});const t=document.getElementById("genericModal");if(t){const a=t.querySelector("#categoryForm");a&&(a.addEventListener("submit",Pi),t.addEventListener("click",o=>{const r=o.target.closest('button[data-action="delete-category"]');r&&Bi(r.dataset.id)}))}ja()}async function Ai(e){if(!e)return;if(await H("Apagar Produto","Tem a certeza que deseja apagar este produto? Esta ação não pode ser revertida."))try{await Sr(e),g("Sucesso","Produto apagado com sucesso!","success"),await gt()}catch(a){g("Erro",`Não foi possível apagar o produto: ${a.message}`,"error")}}async function qi(e){const t=e.querySelector("#productId").value,a=parseInt(e.querySelector("#productCurrentStock").value),o=parseInt(e.querySelector("#productMinStock").value),r=parseInt(e.querySelector("#productMaxStock").value),s=e.querySelectorAll("#selectedSuppliersList .selected-supplier-item"),n=Array.from(s).map(d=>d.dataset.id),i={establishmentId:u.establishmentId,name:e.querySelector("#productName").value,price:parseFloat(e.querySelector("#productPrice").value),costPrice:parseFloat(e.querySelector("#productCostPrice").value)||0,commissionRate:parseFloat(e.querySelector("#productCommissionRate").value)||0,currentStock:isNaN(a)?0:a,minStock:isNaN(o)?0:o,maxStock:isNaN(r)?0:r,categoryId:e.querySelector("#productCategory").value||null,photo:e.querySelector("#productPhotoBase64").value,supplierIds:n};try{t?await kr(t,i):await Jo(i),document.getElementById("productModal").style.display="none",g("Sucesso",`Produto ${t?"atualizado":"adicionado"} com sucesso!`,"success"),await gt()}catch(d){throw new Error(d.message)}}function vo(e,t=800,a=800,o="image/jpeg",r=.8){return new Promise((s,n)=>{if(!e.type.startsWith("image/"))return n(new Error("O ficheiro selecionado não é uma imagem."));const i=new FileReader;i.onload=d=>{const l=new Image;l.onload=()=>{let c=l.width,m=l.height;c>m?c>t&&(m*=t/c,c=t):m>a&&(c*=a/m,m=a);const p=document.createElement("canvas");p.width=c,p.height=m,p.getContext("2d").drawImage(l,0,0,c,m);const v=p.toDataURL(o,r);s(v)},l.onerror=c=>n(new Error("Não foi possível carregar a imagem.")),l.src=d.target.result},i.onerror=d=>n(new Error("Não foi possível ler o ficheiro.")),i.readAsDataURL(e)})}function ho(e=null){const t=document.getElementById("productModal"),a=u.categories||[],o=u.suppliers||[],r=a.map(D=>`<option value="${D.id}" ${e?.categoryId===D.id?"selected":""}>${f(D.name)}</option>`).join("");let s=new Set(e?.supplierIds||[]);const n=f(e?.name||""),i=e?.price||"",d=e?.costPrice||"",l=e?.commissionRate||"",c=e?.minStock||0,m=e?.maxStock||0,p=e?.currentStock||0,b=e?n:"Novo Produto";t.innerHTML=`
    <div class="modal-content max-w-3xl overflow-y-auto max-h-[90vh]">
        <form id="productForm">
            <input type="hidden" id="productId" value="${e?.id||""}">
            <input type="hidden" id="productPhotoBase64" value="${e?.photo||""}">
            
            <div class="flex justify-between items-center mb-4">
                <h2 id="productModalTitle" class="text-2xl font-bold text-gray-800">${b}</h2>
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
                            
                            <div class="form-group"><label for="productCostPrice">Preço de Custo Médio (R$)</label><input type="number" id="productCostPrice" step="0.01" value="${d}" class="mt-1 w-full p-2 border rounded-md" placeholder="0.00"></div>
                            
                            <div class="form-group"><label for="productCommissionRate">Comissão (%)</label><input type="number" id="productCommissionRate" placeholder="Ex: 10" value="${l}" class="mt-1 w-full p-2 border rounded-md"></div>
                        </div></div>
                    </div>
                    <div class="mt-6 pt-6 border-t"><h3 class="text-lg font-semibold text-gray-700 text-left mb-4">Controlo de Stock (Definições)</h3><div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div class="form-group"><label for="productCurrentStock">Atual</label><input type="number" id="productCurrentStock" value="${p}" readonly class="mt-1 w-full p-2 border rounded-md bg-gray-100"></div>
                        <div class="form-group"><label for="productMinStock">Mínimo (Alerta)</label><input type="number" id="productMinStock" value="${c}" class="mt-1 w-full p-2 border rounded-md"></div>
                        <div class="form-group"><label for="productMaxStock">Máximo</label><input type="number" id="productMaxStock" value="${m}" class="mt-1 w-full p-2 border rounded-md"></div>
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
    </div>`;const v=t.querySelector("#productCategory"),h=t.querySelector("#productPhotoInput");t.querySelector("#productPhotoButton").addEventListener("click",()=>h.click()),v.innerHTML='<option value="">Sem categoria</option>'+(u.categories||[]).map(D=>`<option value="${D.id}" ${e?.categoryId===D.id?"selected":""}>${f(D.name)}</option>`).join(""),e&&(v.value=e.categoryId||"");const y=t.querySelector("#productPhotoPreview");t.querySelector("#productPhotoBase64");const w=e?.photo||"https://placehold.co/128x128/E2E8F0/4A5568?text=Foto",$=e?.photo||"";h.onchange=async()=>{const D=h.files[0];if(D){y.src="https://placehold.co/128x128/E2E8F0/4A5568?text=...";try{const M=await vo(D,800,800,"image/jpeg",.8),F=M.length*3/4,O=1e3*1024;if(F>O)throw new Error("A imagem é muito grande mesmo após a compressão.");preview.src=M,base64Input.value=M}catch(M){console.error("Erro ao processar imagem:",M),g("Erro de Imagem",M.message||"Não foi possível processar a imagem.","error"),preview.src=w,base64Input.value=$,q.value=""}}};const k=t.cloneNode(!0);t.parentNode.replaceChild(k,t);const C=()=>{const D=k.querySelector("#modalSupplierSearch"),M=k.querySelector("#supplierSearchResults"),R=k.querySelector("#selectedSuppliersList"),F=D.value.toLowerCase();if(F.length>0){const O=o.filter(j=>j.name.toLowerCase().includes(F)&&!s.has(j.id));O.length>0?(M.classList.remove("hidden"),M.innerHTML=O.map(j=>`
                    <div class="p-2 hover:bg-indigo-50 cursor-pointer border-b last:border-0 text-sm flex justify-between items-center" data-add-supplier="${j.id}">
                        <span class="font-medium">${f(j.name)}</span>
                        <span class="text-indigo-600 text-xs">+ Adicionar</span>
                    </div>
                `).join("")):(M.classList.remove("hidden"),M.innerHTML='<div class="p-2 text-xs text-gray-500 text-center">Nenhum resultado disponível.</div>')}else M.classList.add("hidden");s.size>0?(R.innerHTML="",s.forEach(O=>{const j=o.find(Y=>Y.id===O);j&&(R.innerHTML+=`
                        <div class="selected-supplier-item flex items-center justify-between bg-white border p-2 rounded shadow-sm" data-id="${j.id}">
                            <div class="text-sm">
                                <p class="font-bold text-gray-800">${f(j.name)}</p>
                                <p class="text-xs text-gray-500">${f(j.contactName||"")} - ${f(j.phone||"")}</p>
                            </div>
                            <button type="button" class="text-red-500 hover:text-red-700 p-1" data-remove-supplier="${j.id}" title="Remover">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </div>
                    `)})):R.innerHTML='<p class="text-xs text-gray-400 text-center py-2">Nenhum fornecedor selecionado.</p>'};k.querySelector("#modalSupplierSearch").addEventListener("input",C),k.addEventListener("click",D=>{const M=D.target.closest("[data-add-supplier]");if(M){const F=M.dataset.addSupplier;s.add(F),k.querySelector("#modalSupplierSearch").value="",C()}const R=D.target.closest("[data-remove-supplier]");if(R){const F=R.dataset.removeSupplier;s.delete(F),C()}}),C(),k.addEventListener("click",async D=>{const M=D.target.closest("button[data-action]");if(!M)return;const R=M.dataset.action,F=k.querySelector("#productId").value;if(R==="close-modal"&&(k.style.display="none"),R==="delete-product"){if(!F)return;k.style.display="none",await Ai(F)}if(R==="save-product-modal"){const O=k.querySelector("#productForm");if(O){if(!O.querySelector("#productName").value||!O.querySelector("#productPrice").value){g("Erro","Nome e Preço de Venda são obrigatórios.","error");return}const j=M.closest('button[data-action="save-product-modal"]');j.disabled=!0,j.textContent="A salvar...";try{await qi(O)}catch(Y){g("Erro",`Falha ao salvar: ${Y.message}`,"error"),j.disabled=!1,j.textContent="Salvar Alterações"}}}if(R==="adjust-stock-modal"){D.preventDefault();const O=k.querySelector("#stockAdjustmentAmount"),j=k.querySelector("#stockAdjustmentReason"),Y=parseInt(O.value,10),Ie=parseInt(M.dataset.change,10);if(!Y||Y<=0){g("Erro","Por favor, insira uma quantidade válida.","error");return}const ea=Y*Ie,Hs=j.value||(ea>0?"Entrada manual":"Saída manual");try{await $r(F,{change:ea,reason:Hs});const Ge=u.products.findIndex(Ye=>Ye.id===F);if(Ge>-1){const Ye=u.products[Ge].currentStock+ea;u.products[Ge].currentStock=Ye,k.querySelector("#currentStockDisplay").textContent=Ye,k.querySelector("#productCurrentStock").value=Ye,O.value="",j.value="",g("Sucesso","Estoque atualizado!","success"),Fa(),dt()}}catch(Ge){g("Erro de Stock",Ge.message,"error")}}});const T=k.querySelectorAll(".tab-btn"),A=k.querySelectorAll(".tab-content");T.forEach(D=>{D.addEventListener("click",M=>{M.preventDefault(),T.forEach(R=>{R.classList.remove("border-indigo-500","text-indigo-600"),R.classList.add("border-transparent","text-gray-500","hover:text-gray-700","hover:border-gray-300")}),D.classList.add("border-indigo-500","text-indigo-600"),D.classList.remove("border-transparent","text-gray-500","hover:text-gray-700","hover:border-gray-300"),A.forEach(R=>R.classList.add("hidden")),document.getElementById(`tab-content-${D.dataset.tab}`).classList.remove("hidden")})});const q=k.querySelector("#productPhotoInput");k.querySelector("#productPhotoButton").addEventListener("click",()=>q.click()),q.onchange=async()=>{const D=q.files[0];if(!D)return;const M=k.querySelector("#productPhotoPreview"),R=k.querySelector("#productPhotoBase64");M.src="https://placehold.co/128x128/E2E8F0/4A5568?text=...";try{const F=await vo(D,800,800,"image/jpeg",.8),j=F.length*3/4,Y=1e3*1024;if(j>Y)throw new Error("A imagem é muito grande mesmo após a compressão.");M.src=F,R.value=F}catch(F){console.error("Erro ao processar imagem:",F),g("Erro de Imagem",F.message||"Não foi possível processar a imagem.","error"),M.src=w,R.value=$,q.value=""}},k.style.display="flex"}function Ni(){const e=document.getElementById("products-content-container");e.innerHTML=`
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
    `;const t=document.getElementById("productCategoryFilter");t&&(t.innerHTML='<option value="all">Todas as categorias</option>',(u.categories||[]).forEach(a=>t.innerHTML+=`<option value="${a.id}">${f(a.name)}</option>`)),Fa(),dt()}function Ri(){const e=document.getElementById("products-content-container"),t=new Date().toISOString().split("T")[0],a=new Date;a.setDate(a.getDate()-30);const o=a.toISOString().split("T")[0];e.innerHTML=`
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
        </div>`;const r=document.getElementById("productFilterReport"),s=document.getElementById("categoryFilterReport");r&&u.products&&(r.innerHTML+=u.products.map(n=>`<option value="${n.id}">${f(n.name)}</option>`).join("")),s&&u.categories&&(s.innerHTML+=u.categories.map(n=>`<option value="${n.id}">${f(n.name)}</option>`).join(""))}async function ji(){const e=document.getElementById("report-results");e.innerHTML='<div class="loader mx-auto my-8"></div>';const t={startDate:document.getElementById("reportStartDate").value,endDate:document.getElementById("reportEndDate").value,productId:document.getElementById("productFilterReport").value,categoryId:document.getElementById("categoryFilterReport").value,establishmentId:u.establishmentId};try{const a=await Er(t);if(a.length===0){e.innerHTML=`
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
                                <td class="px-4 py-3 whitespace-nowrap font-semibold text-gray-800">${f(s.productName)}</td>
                                <td class="px-4 py-3 whitespace-nowrap text-center font-bold ${s.change>0?"text-green-600":"text-red-600"}">
                                    ${s.change>0?"+":""}${s.change}
                                </td>
                                <td class="px-4 py-3 whitespace-nowrap text-center text-gray-500">${s.oldStock}</td>
                                <td class="px-4 py-3 whitespace-nowrap text-center text-gray-800 font-medium">${s.newStock}</td>
                                <td class="px-4 py-3 whitespace-nowrap text-gray-600 truncate max-w-xs" title="${f(s.reason)}">${f(s.reason)}</td>
                                <td class="px-4 py-3 whitespace-nowrap text-gray-600">${f(s.user)}</td>
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
                                <h4 class="font-bold text-gray-800 text-base line-clamp-1">${f(s.productName)}</h4>
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
                            <span class="text-gray-600 truncate max-w-[60%] font-medium" title="${f(s.reason)}">
                                ${f(s.reason)||"Sem motivo"}
                            </span>
                            <span class="text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                                ${f(s.user)||"Sistema"}
                            </span>
                        </div>
                    </div>
                `).join("")}
            </div>`;e.innerHTML=o+r}catch(a){g("Erro",`Não foi possível gerar o relatório: ${a.message}`,"error"),e.innerHTML=`<div class="bg-white border border-red-200 rounded-lg p-8 text-center text-red-500">${a.message}</div>`}}function Fa(){const e={ok:0,near_min:0,at_min:0,empty:0};if(!u.products)return;u.products.forEach(s=>{if(!s)return;const n=s.currentStock,i=s.minStock;n<=0?e.empty++:i>0&&n<=i?e.at_min++:i>0&&n<=i*1.2?e.near_min++:e.ok++});const t=document.getElementById("indicator-ok"),a=document.getElementById("indicator-near-min"),o=document.getElementById("indicator-at-min"),r=document.getElementById("indicator-empty");t&&(t.textContent=e.ok),a&&(a.textContent=e.near_min),o&&(o.textContent=e.at_min),r&&(r.textContent=e.empty)}function dt(){const e=document.getElementById("productsList");if(!e)return;const t=document.getElementById("productSearchInput")?.value.toLowerCase()||"",a=document.getElementById("productCategoryFilter")?.value||"all",o=new Map((u.categories||[]).map(s=>[s.id,s.name]));let r=(u.products||[]).filter(Boolean);re!=="all"&&(r=r.filter(s=>{const n=s.currentStock,i=s.minStock;switch(re){case"ok":return n>0&&(i===0||n>i*1.2);case"near_min":return i>0&&n>i&&n<=i*1.2;case"at_min":return i>0&&n>0&&n<=i;case"empty":return n<=0;default:return!0}})),r=r.filter(s=>{const n=s.name.toLowerCase().includes(t),i=a==="all"||s.categoryId===a;return n&&i}),e.innerHTML="",r.length>0?(e.className="space-y-3 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 sm:gap-4 sm:space-y-0",r.forEach(s=>{const n=document.createElement("div"),i=JSON.stringify(s).replace(/'/g,"&apos;");n.className=`product-card bg-white rounded-lg shadow-md flex items-center gap-3 p-3 overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-lg hover:bg-gray-50 
                              sm:flex-col sm:p-0 sm:items-stretch sm:gap-0`,n.dataset.action="edit-product",n.dataset.product=i;const d=s.photo||`https://placehold.co/200x200/E2E8F0/4A5568?text=${encodeURIComponent(s.name.charAt(0))}`,l=o.get(s.categoryId)||"N/A";let c="",m="text-gray-500";const p=s.currentStock,b=s.minStock;p<=0?(c='<span class="text-xs font-semibold text-red-600">Esgotado</span>',m="text-red-600 font-semibold"):b>0&&p<=b?(c='<span class="text-xs font-semibold text-orange-600">Estoque Mínimo</span>',m="text-orange-600 font-semibold"):b>0&&p<=b*1.2?(c='<span class="text-xs font-semibold text-blue-600">Estoque Baixo</span>',m="text-blue-600 font-semibold"):(c='<span class="text-xs font-semibold text-green-600">Em Estoque</span>',m="text-green-600 font-semibold"),n.innerHTML=`
                <img src="${d}" alt="Imagem de ${f(s.name)}" class="w-16 h-16 rounded-md object-cover flex-shrink-0 sm:w-full sm:h-24 sm:rounded-b-none">
                
                <div class="flex-1 sm:p-3 sm:flex sm:flex-col sm:flex-grow">
                    <div class="sm:flex-grow">
                        <div class="flex justify-between items-start mb-1 gap-2">
                            <h3 class="text-sm font-bold text-gray-900 flex-1 text-left">${f(s.name)}</h3>
                            <div class="hidden sm:block">${c}</div>
                        </div>
                        
                        <p class="text-xl font-bold text-indigo-600 mb-1 text-left hidden sm:block">R$ ${s.price.toFixed(2)}</p>
                        
                        <p class="text-xs text-gray-500 text-left mb-2 hidden sm:block">Categoria: ${f(l)}</p>
                    </div>

                    <div class="flex justify-between items-center mt-2 sm:mt-0">
                        <p class="text-lg font-bold text-indigo-600 text-left sm:hidden">R$ ${s.price.toFixed(2)}</p>
                        <p class="text-xs text-gray-500 text-right sm:text-left">
                            Estoque: <span class="font-bold text-base ${m}">${s.currentStock}</span>
                        </p>
                    </div>
                </div>`,e.appendChild(n)})):(e.className="",e.innerHTML='<p class="col-span-full text-center text-gray-500 py-10">Nenhum produto encontrado.</p>')}async function gt(){const e=document.getElementById("products-content-container");e&&(e.innerHTML='<div class="loader col-span-full mx-auto my-8"></div>');try{const[t,a,o]=await Promise.all([ut(u.establishmentId),Qt(u.establishmentId,"products"),Ra(u.establishmentId)]);u.products=(t||[]).filter(Boolean),u.categories=(a||[]).filter(Boolean),u.suppliers=(o||[]).filter(Boolean),Ls(tt)}catch(t){e&&(e.innerHTML=`<p class="text-red-500 col-span-full text-center p-8">Erro ao carregar dados: ${t.message}</p>`)}}function Ls(e){if(document.getElementById("products-content-container")){if(tt===e&&document.getElementById("products-content-container").children.length>1){tt==="products"&&(Fa(),dt());return}tt=e,re="all",document.querySelectorAll("#products-tabs button.tab-button").forEach(t=>{const a=t.dataset.view===e;t.classList.toggle("border-indigo-500",a),t.classList.toggle("text-indigo-600",a),t.classList.toggle("border-transparent",!a),t.classList.toggle("text-gray-500",!a)}),e==="products"?Ni():e==="movements"&&Ri()}}async function Fi(){fe.innerHTML=`
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
        </section>`,ce&&(fe.removeEventListener("click",ce),fe.removeEventListener("input",ce),fe.removeEventListener("change",ce)),ce=async e=>{const t=e.target;if(t.id==="productSearchInput"||t.id==="productCategoryFilter"){dt();return}const a=e.target.closest("button[data-action], button[data-view], .indicator-card[data-action], .product-card[data-action]");if(!a||e.target.closest('[data-action-stop-propagation="true"]'))return;if(a.hasAttribute("data-view")){Ls(a.dataset.view);return}switch(a.dataset.action){case"new-product":ho();break;case"edit-product":ho(JSON.parse(a.dataset.product));break;case"manage-product-categories":Mi();break;case"generate-report":await ji();break;case"filter-stock":const r=a.dataset.filterType;re=re===r?"all":r,document.querySelectorAll(".indicator-card").forEach(s=>{s.classList.toggle("ring-2",s.dataset.filterType===re),s.classList.toggle("ring-indigo-500",s.dataset.filterType===re),s.classList.toggle("shadow-lg",s.dataset.filterType===re)}),dt();break}},fe.addEventListener("click",ce),fe.addEventListener("input",ce),fe.addEventListener("change",ce),tt="products",re="all",await gt()}const ve=document.getElementById("content");let ue=null,Dt="list",z={step:1,productsToBuy:[],allSuppliers:[],finalOrders:{},isQuoteMode:!1};async function Hi(){Dt==="list"?Zt():Dt==="purchases"?(z.step=1,at()):Dt==="history"&&Ts()}async function Oi(){try{const e=await Ra(u.establishmentId);return u.suppliers=e||[],z.allSuppliers=e,!0}catch(e){return console.error(e),!1}}async function zi(e){if(await H("Excluir Fornecedor","Tem a certeza? Isso removerá o vínculo com os produtos."))try{await Ci(e),g("Sucesso","Fornecedor excluído.","success"),zt("genericModal"),Zt()}catch(t){g("Erro","Erro ao excluir: "+t.message,"error")}}async function Vi(e){e.preventDefault();const t=e.target,a=t.querySelector("#supId").value,o={name:t.querySelector("#supName").value,contactName:t.querySelector("#supContact").value,email:t.querySelector("#supEmail").value,phone:t.querySelector("#supPhone").value,taxId:t.querySelector("#supTaxId").value,category:t.querySelector("#supCategory").value,establishmentId:u.establishmentId},r=t.querySelector('button[type="submit"]');r.disabled=!0,r.textContent="A salvar...";try{a?(await Ii(a,o),g("Sucesso","Fornecedor atualizado!","success")):(await Ei(o),g("Sucesso","Fornecedor criado!","success")),zt("genericModal"),Zt()}catch(s){g("Erro","Erro ao salvar: "+s.message,"error")}finally{r.disabled=!1,r.textContent="Salvar"}}async function Zt(){const e=document.getElementById("suppliersList");if(!e)return;e.innerHTML='<div class="loader mx-auto my-8"></div>',await Oi();const t=document.getElementById("supplierSearchInput")?.value.toLowerCase()||"",a=u.suppliers.filter(s=>s.name.toLowerCase().includes(t)||s.contactName&&s.contactName.toLowerCase().includes(t));if(e.innerHTML="",a.length===0){e.innerHTML='<div class="text-center text-gray-500 py-8">Nenhum fornecedor encontrado.</div>';return}let o='<div class="flex flex-col gap-2 md:hidden">';a.forEach(s=>{const n=JSON.stringify(s).replace(/"/g,"&quot;"),i=f(s.name),d=f(s.category||"Geral"),l=f(s.contactName||"");o+=`
            <div class="bg-white p-3 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between active:bg-gray-50 transition-colors cursor-pointer supplier-item-mobile" data-supplier="${n}">
                <div class="flex-1 min-w-0 pr-3">
                    <h3 class="font-bold text-gray-900 text-sm truncate">${i}</h3>
                    <div class="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                        <span class="truncate bg-gray-100 px-1.5 py-0.5 rounded">${d}</span>
                        ${l?`<span class="truncate">• ${l}</span>`:""}
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
    `;a.forEach(s=>{const n=JSON.stringify(s).replace(/"/g,"&quot;"),i=f(s.name),d=f(s.taxId||"Sem doc."),l=f(s.email||"-"),c=f(s.phone||"-"),m=f(s.category||"Geral");r+=`
            <tr class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-gray-900">${i}</div>
                    <div class="text-sm text-gray-500">${d}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">${l}</div>
                    <div class="text-sm text-gray-500">${c}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        ${m}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button data-action="edit" data-supplier="${n}" class="text-indigo-600 hover:text-indigo-900 mr-3">Editar</button>
                    <button data-action="delete" data-id="${s.id}" class="text-red-600 hover:text-red-900">Excluir</button>
                </td>
            </tr>
        `}),r+="</tbody></table></div>",e.innerHTML=o+r}function Ui(e){const t=e.phone?`https://wa.me/${e.phone.replace(/\D/g,"")}`:"#",a=e.phone?`tel:${e.phone}`:"#",o=e.email?`mailto:${e.email}`:"#",r=JSON.stringify(e).replace(/"/g,"&quot;"),s=f(e.name),n=f(e.category||"Fornecedor"),i=f(e.contactName||""),d=f(e.phone||""),l=`
        <div class="text-center mb-6">
            <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 text-gray-500 text-2xl font-bold uppercase">
                ${s.substring(0,2)}
            </div>
            <h3 class="text-xl font-bold text-gray-900 leading-tight mb-1">${s}</h3>
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
            ${d?`
            <div class="flex justify-between items-center border-b border-gray-100 pb-2">
                <span class="text-gray-500 text-sm">Telefone</span>
                <span class="font-medium text-gray-800">${d}</span>
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
    `;_({title:"",contentHTML:l,maxWidth:"max-w-md"})}async function at(){const e=document.getElementById("purchasesContainer");if(e)if(z.step===1){e.innerHTML='<div class="loader mx-auto my-8"></div>';try{const[t,a]=await Promise.all([ut(u.establishmentId),Ra(u.establishmentId)]);z.allSuppliers=a||[];const o=t.filter(l=>{const c=parseInt(l.currentStock||0),m=parseInt(l.minStock||0);return c<=m});if(z.productsToBuy=o,o.length===0){e.innerHTML=`
                    <div class="text-center py-10 bg-white rounded-lg shadow-sm border border-gray-100">
                        <div class="bg-green-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                            <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                        <h3 class="text-lg font-bold text-gray-800">Tudo em ordem!</h3>
                        <p class="text-gray-600">Nenhum produto abaixo do estoque mínimo.</p>
                        <button class="mt-4 text-indigo-600 hover:underline text-sm" onclick="window.location.reload()">Atualizar Dados</button>
                    </div>
                `;return}let r='<div class="flex flex-col gap-3 md:hidden">',s="";o.forEach(l=>{const c=parseInt(l.minStock)||0,m=parseInt(l.currentStock)||0,p=Math.max(c-m,1),b=parseFloat(l.costPrice||0),v=f(l.name);let h='<option value="">Selecione...</option>';z.allSuppliers.length>0?z.allSuppliers.forEach(y=>{const $=l.supplierIds&&l.supplierIds.includes(y.id)?"selected":"";h+=`<option value="${y.id}" ${$}>${f(y.name)}</option>`}):h='<option value="">Sem fornecedores</option>',r+=`
                    <div class="product-row bg-white p-3 rounded-lg shadow-sm border border-gray-200" data-product-id="${l.id}" data-cost="${b}">
                        <div class="flex justify-between items-start mb-2">
                            <div class="flex items-center gap-2">
                                <input type="checkbox" class="row-select w-5 h-5 text-indigo-600 rounded border-gray-300" checked>
                                <div>
                                    <p class="font-bold text-gray-800 text-sm">${v}</p>
                                    <p class="text-xs text-gray-500">Custo: R$ ${b.toFixed(2)}</p>
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
                            <span class="row-subtotal font-bold text-indigo-600 text-sm">R$ ${(p*b).toFixed(2)}</span>
                        </div>
                    </div>
                `,s+=`
                    <tr class="hover:bg-gray-50 border-b border-gray-100 product-row" data-product-id="${l.id}" data-cost="${b}">
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
                            <input type="number" class="qty-input w-full p-2 border border-gray-300 rounded text-center text-lg font-bold text-indigo-700 bg-indigo-50" value="${p}" min="1">
                        </td>
                        <td class="p-3 text-right text-sm text-gray-600">R$ ${b.toFixed(2)}</td>
                        <td class="p-3 text-right text-sm font-bold text-gray-800 row-subtotal">R$ ${(p*b).toFixed(2)}</td>
                        <td class="p-3 w-48">
                            <select class="supplier-select w-full p-2 border border-gray-300 rounded-md bg-white text-sm">
                                ${h}
                            </select>
                        </td>
                    </tr>
                `}),r+="</div>";const n=z.isQuoteMode?"REVISAR COTAÇÕES":"GERAR PEDIDOS DE COMPRA",i=z.isQuoteMode?"bg-indigo-600 hover:bg-indigo-700":"bg-green-600 hover:bg-green-700",d=z.isQuoteMode?'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>':'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>';e.innerHTML=`
                <div class="space-y-4 animate-fade-in pb-20">
                    <div class="bg-white p-3 md:p-4 rounded-lg border border-gray-200 shadow-sm">
                        <div class="flex flex-col md:flex-row justify-between items-center gap-3">
                            <div class="flex items-center gap-3 w-full md:w-auto">
                                <input type="checkbox" id="toggle-quote-mode" class="w-5 h-5 text-indigo-600 rounded" ${z.isQuoteMode?"checked":""}>
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
            `,va()}catch(t){console.error(t),e.innerHTML='<p class="text-red-500 text-center">Erro ao calcular compras.</p>'}}else z.step===2&&_i(e)}function _i(e){if(!z.finalOrders||Object.keys(z.finalOrders).length===0){z.step=1,at();return}const t=z.isQuoteMode;let a="",o=0;const r=t?"border-indigo-100":"border-gray-200",s=t?"bg-indigo-50 border-indigo-100":"bg-gray-50 border-gray-200",n=t?"bg-blue-100 text-blue-700":"bg-green-100 text-green-700",i=t?"hidden":"flex",d=t?"Cotações Prontas":"Pedidos Prontos",l=t?"text-indigo-600":"text-green-600",c=t?"bg-indigo-50 border-indigo-100":"bg-green-50 border-green-100",m=t?"text-indigo-800":"text-green-800";for(const[p,b]of Object.entries(z.finalOrders)){let v=0,h=b.items.map(T=>{const A=T.qty*T.cost;return v+=A,`
            <div class="flex justify-between py-2 border-b border-gray-50 text-sm">
                <span class="text-gray-800 font-medium">${f(T.name)}</span>
                <div class="text-right">
                    <span class="text-gray-500 text-xs block">${T.qty} x R$ ${T.cost.toFixed(2)}</span>
                    <span class="text-indigo-600 font-bold block">R$ ${A.toFixed(2)}</span>
                </div>
            </div>
        `}).join("");o+=v;const y=encodeURIComponent(JSON.stringify({supplierId:p,supplierName:b.info.name,totalAmount:v,items:b.items})),w=encodeURIComponent(JSON.stringify({name:b.info.name,phone:b.info.phone,email:b.info.email})),$=encodeURIComponent(JSON.stringify(b.items)),k=f(b.info.name),C=f(b.info.email||"");a+=`
            <div class="bg-white border ${r} rounded-xl overflow-hidden shadow-sm supplier-order-card mb-4" data-supplier-id="${p}">
                <div class="${s} p-3 border-b flex justify-between items-center">
                    <div>
                        <h4 class="font-bold text-gray-800 text-base">${k}</h4>
                        <div class="text-[10px] text-gray-500 flex flex-col">
                            <span>${C}</span>
                        </div>
                    </div>
                    <div class="text-right">
                        <span class="${n} text-xs font-bold px-2 py-1 rounded">R$ ${v.toFixed(2)}</span>
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
                        data-supplier-info="${w}"
                        data-order-items="${$}"
                        data-total="${v}">
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
                    <h3 class="font-bold ${m} text-lg">${d}</h3>
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
    `}async function Ts(){const e=document.getElementById("historyContainer");if(e){e.innerHTML='<div class="loader mx-auto my-8"></div>';try{const t=await Di(u.establishmentId);if(t.length===0){e.innerHTML='<div class="text-center text-gray-500 py-8">Nenhum histórico encontrado.</div>';return}let a='<div class="flex flex-col gap-3 md:hidden">';t.forEach(s=>{const n=new Date(s.createdAt.seconds*1e3).toLocaleDateString("pt-BR"),i=f(s.supplierName);a+=`
                <div class="bg-white p-3 rounded-lg shadow-sm border border-gray-100 flex justify-between items-center active:bg-gray-50 transition-colors">
                    <div>
                        <p class="text-xs text-gray-500 mb-0.5">${n}</p>
                        <p class="font-bold text-gray-800 text-sm">${i}</p>
                        <p class="text-xs text-gray-400 mt-0.5">${s.items.length} itens</p>
                    </div>
                    <div class="text-right flex flex-col items-end gap-2">
                        <p class="text-indigo-600 font-bold text-sm mb-1">R$ ${parseFloat(s.totalAmount).toFixed(2)}</p>
                        <div class="flex gap-2">
                            <button class="text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg hover:bg-gray-200 btn-view-purchase" data-purchase='${JSON.stringify(s)}'>
                                Ver
                            </button>
                            <button class="text-xs bg-red-50 text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-100 btn-delete-purchase" data-id="${s.id}">
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
                    <tbody class="divide-y divide-gray-100">${t.map(s=>`
            <tr class="hover:bg-gray-50 border-b border-gray-100">
                <td class="p-3 text-sm text-gray-600 whitespace-nowrap">${new Date(s.createdAt.seconds*1e3).toLocaleDateString("pt-BR")}</td>
                <td class="p-3 font-medium text-gray-800">${f(s.supplierName)}</td>
                <td class="p-3 text-right font-bold text-indigo-600 whitespace-nowrap">R$ ${parseFloat(s.totalAmount).toFixed(2)}</td>
                <td class="p-3 text-right flex justify-end gap-2">
                    <button class="text-xs bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-lg font-bold hover:bg-indigo-100 btn-view-purchase" data-purchase='${JSON.stringify(s)}'>
                        Ver
                    </button>
                    <button class="text-xs bg-red-50 text-red-600 px-3 py-1.5 rounded-lg font-bold hover:bg-red-100 btn-delete-purchase" data-id="${s.id}">
                        Excluir
                    </button>
                </td>
            </tr>
        `).join("")}</tbody>
                </table>
            </div>
        `;e.innerHTML=a+r}catch(t){console.error(t),e.innerHTML='<p class="text-red-500 text-center">Erro ao carregar histórico.</p>'}}}function Wi(e){const t=new Date(e.createdAt.seconds*1e3).toLocaleString("pt-BR"),a=e.items.map(r=>`
        <li class="flex justify-between py-3 border-b border-gray-100 last:border-0">
            <div>
                <p class="font-medium text-sm text-gray-800">${f(r.name)}</p>
                <p class="text-xs text-gray-500">${r.qty} un. x R$ ${parseFloat(r.cost).toFixed(2)}</p>
            </div>
            <p class="text-sm font-bold text-gray-700">R$ ${(r.qty*r.cost).toFixed(2)}</p>
        </li>
    `).join(""),o=`
        <div class="space-y-4">
            <div class="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
                <div>
                    <p class="text-xs text-gray-500 uppercase font-bold">Fornecedor</p>
                    <p class="font-bold text-gray-900 text-lg">${f(e.supplierName)}</p>
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
    `;_({title:"Detalhes da Compra",contentHTML:o,maxWidth:"max-w-md"}),setTimeout(()=>{document.querySelector("#genericModal .modal-close").addEventListener("click",()=>{zt("genericModal")})},50)}function va(){const e=document.querySelectorAll(".product-row");let t=0;e.forEach(o=>{if(o.offsetParent===null)return;const r=o.querySelector(".row-select"),s=o.querySelector(".qty-input"),n=o.querySelector(".row-subtotal"),i=parseFloat(o.dataset.cost||0),d=parseInt(s.value||0);if(r.checked){const l=i*d;t+=l,n&&(n.textContent=`R$ ${l.toFixed(2)}`),o.classList.remove("opacity-50","bg-gray-50")}else o.classList.add("opacity-50","bg-gray-50")});const a=document.getElementById("total-purchase-cost");a&&(a.textContent=`R$ ${t.toFixed(2).replace(".",",")}`)}async function Ji(e,t=!1){if(!window.jspdf){alert("Erro: Biblioteca PDF não carregada.");return}const{jsPDF:a}=window.jspdf,o=new a,r=new Date().toLocaleDateString("pt-BR"),s=t?[100,116,139]:[22,163,74];o.setFontSize(22),o.setTextColor(...s),o.setFont("helvetica","bold");const n=t?"SOLICITAÇÃO DE COTAÇÃO":"PEDIDO DE COMPRA";o.text(n,14,20),o.setDrawColor(...s),o.setLineWidth(.5),o.line(14,25,196,25),o.setFontSize(10),o.setTextColor(0),o.setFont("helvetica","bold"),o.text("DE:",14,35),o.setFont("helvetica","normal"),o.text(u.establishmentName||"Nossa Empresa",14,40),o.text(`Data: ${r}`,14,45),o.setFont("helvetica","bold"),o.text("PARA:",110,35),o.setFont("helvetica","normal"),o.text(e.info.name||"Fornecedor",110,40),e.info.email&&o.text(`Email: ${e.info.email}`,110,45),e.info.phone&&o.text(`Tel: ${e.info.phone}`,110,50),o.setFontSize(10),o.setFont("helvetica","italic");const i=t?"Por favor, enviem os vossos melhores preços e condições para os itens listados abaixo.":"Confirmação de pedido de compra conforme os itens e quantidades abaixo.";o.text(i,14,65);const d=t?["Produto","Quantidade Solicitada"]:["Produto","Qtd.","V. Unitário","V. Total"],l=e.items.map(b=>t?[b.name,b.qty.toString()]:[b.name,b.qty.toString(),`R$ ${b.cost.toFixed(2)}`,`R$ ${(b.qty*b.cost).toFixed(2)}`]);o.autoTable({startY:75,head:[d],body:l,theme:"striped",headStyles:{fillColor:s,textColor:[255,255,255],fontStyle:"bold",halign:"left"},styles:{fontSize:10,cellPadding:3,valign:"middle"},columnStyles:t?{}:{1:{halign:"center"},2:{halign:"right"},3:{halign:"right",fontStyle:"bold"}},foot:t?null:[["","","TOTAL DO PEDIDO:",{content:`R$ ${l.reduce((b,v)=>b+parseFloat(v[3].replace("R$ ","")),0).toFixed(2)}`,styles:{halign:"right",fontStyle:"bold",fillColor:[240,240,240],textColor:[0,0,0]}}]]});const c=o.internal.getNumberOfPages();for(let b=1;b<=c;b++)o.setPage(b),o.setFontSize(8),o.setTextColor(150),o.text(`Gerado por Kairos - Página ${b} de ${c}`,196,290,{align:"right"});const m=e.info.name.replace(/[^a-zA-Z0-9]/g,"_"),p=`${t?"Cotacao":"Pedido"}_${m}_${r.replace(/\//g,"-")}.pdf`;o.save(p),g("Sucesso","PDF gerado com sucesso!","success")}function xo(e=null){const t=`
        <form id="supplierForm" class="space-y-4">
            <input type="hidden" id="supId" value="${e?.id||""}">
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="col-span-1 md:col-span-2">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Nome da Empresa *</label>
                    <input type="text" id="supName" value="${f(e?.name||"")}" required class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-shadow" placeholder="Ex: Distribuidora Beleza">
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
                    <input type="text" id="supContact" value="${f(e?.contactName||"")}" class="w-full p-3 border border-gray-300 rounded-lg outline-none" placeholder="Ex: João Silva">
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Telefone / WhatsApp</label>
                    <input type="tel" id="supPhone" value="${f(e?.phone||"")}" class="w-full p-3 border border-gray-300 rounded-lg outline-none" placeholder="(00) 00000-0000">
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" id="supEmail" value="${f(e?.email||"")}" class="w-full p-3 border border-gray-300 rounded-lg outline-none" placeholder="contato@empresa.com">
                </div>

                <div class="col-span-1 md:col-span-2">
                    <label class="block text-sm font-medium text-gray-700 mb-1">CNPJ / CPF</label>
                    <input type="text" id="supTaxId" value="${f(e?.taxId||"")}" class="w-full p-3 border border-gray-300 rounded-lg outline-none">
                </div>
            </div>

            <div class="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
                <button type="button" class="modal-close w-full md:w-auto px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-bold hover:bg-gray-200 transition-colors">Cancelar</button>
                <button type="submit" class="w-full md:w-auto px-6 py-3 bg-indigo-600 text-white rounded-lg font-bold shadow-md hover:bg-indigo-700 transition-colors">
                    ${e?"Atualizar Dados":"Salvar Fornecedor"}
                </button>
            </div>
        </form>
    `;_({title:e?"Editar Fornecedor":"Novo Fornecedor",contentHTML:t,maxWidth:"max-w-lg"}),setTimeout(()=>{document.getElementById("supplierForm").addEventListener("submit",Vi),document.querySelector("#genericModal .modal-close").addEventListener("click",()=>zt("genericModal"))},50)}function Gi(){ve.innerHTML=`
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
    `,ue&&(ve.removeEventListener("click",ue),ve.removeEventListener("input",ue),ve.removeEventListener("change",ue)),ue=e=>{if(e.target.closest("#tab-btn-list")&&vt("list"),e.target.closest("#tab-btn-purchases")&&vt("purchases"),e.target.closest("#tab-btn-history")&&vt("history"),e.target.id==="toggle-quote-mode"&&(z.isQuoteMode=e.target.checked,at()),e.target.id==="supplierSearchInput"&&Zt(),e.target.closest("#btn-new-supplier")&&xo(),e.target.closest(".supplier-item-mobile")){const a=e.target.closest(".supplier-item-mobile"),o=JSON.parse(a.dataset.supplier);Ui(o)}const t=e.target.closest("button[data-action]");if(t){const a=t.dataset.action;a==="delete"&&zi(t.dataset.id),a==="edit"&&xo(JSON.parse(t.dataset.supplier))}if((e.target.classList.contains("qty-input")||e.target.classList.contains("row-select"))&&va(),e.target.id==="check-all-rows"){const a=e.target.checked;document.querySelectorAll(".row-select").forEach(o=>o.checked=a),va()}if(e.target.closest("#btn-go-to-orders")){const a=document.querySelectorAll(".product-row"),o={};let r=!1;if(a.forEach(s=>{if(s.offsetParent===null||!s.querySelector(".row-select").checked)return;r=!0;let i="Produto";const d=s.querySelector("td:nth-child(2)"),l=s.querySelector(".font-bold");d?i=d.innerText:l&&(i=l.innerText);const c=parseInt(s.querySelector(".qty-input").value),m=parseFloat(s.dataset.cost),b=s.querySelector(".supplier-select").value;if(b){if(!o[b]){const v=z.allSuppliers.find(h=>h.id===b);o[b]={info:v,items:[]}}o[b].items.push({name:i,qty:c,cost:m})}}),!r){g("Atenção","Selecione pelo menos um item para gerar o pedido.","error");return}z.finalOrders=o,z.step=2,at()}if(e.target.closest("#btn-back-step1")&&(z.step=1,at()),e.target.closest(".btn-send-order")){const a=e.target.closest(".btn-send-order"),o=JSON.parse(decodeURIComponent(a.dataset.supplierInfo)),r=JSON.parse(decodeURIComponent(a.dataset.orderItems)),s=parseFloat(a.dataset.total),n=z.isQuoteMode;if(o.phone){const i=o.phone.replace(/\D/g,"");let d="";n?(d=`Olá *${o.name}*, tudo bem?

Gostaria de solicitar uma *cotação* para os seguintes itens:

`,r.forEach(c=>{d+=`- ${c.qty}x ${c.name}
`}),d+=`
Aguardo o retorno. Obrigado!`):(d=`Olá *${o.name}*, gostaria de realizar o seguinte *pedido*:

`,d+=`*ITENS:*
`,r.forEach(c=>{d+=`- ${c.qty}x ${c.name}
`}),d+=`
Aguardo confirmação.`);const l=`https://wa.me/${i}?text=${encodeURIComponent(d)}`;window.open(l,"_blank"),g("Aberto","WhatsApp aberto.","success")}else if(o.email){const i=n?`Solicitação de Cotação - ${u.establishmentName||"Empresa"}`:`Pedido de Compra - ${u.establishmentName||"Empresa"}`;let d=`Olá ${o.name},

`;n?d+=`Gostaria de solicitar uma cotação para os itens abaixo:

`:d+=`Gostaria de realizar o seguinte pedido:

`,r.forEach(c=>{d+=`- ${c.qty}x ${c.name}
`}),n||(d+=`
Valor Total Estimado: R$ ${s.toFixed(2)}`),d+=`

Aguardo retorno.`;const l=`mailto:${o.email}?subject=${encodeURIComponent(i)}&body=${encodeURIComponent(d)}`;window.location.href=l}else g("Erro","Fornecedor sem telefone ou email cadastrado.","error")}if(e.target.closest(".btn-register-order")){const a=e.target.closest(".btn-register-order");if(a.disabled)return;const o=JSON.parse(decodeURIComponent(a.dataset.order));o.establishmentId=u.establishmentId,a.disabled=!0,a.textContent="A processar...",Ee(u.establishmentId).then(r=>{const s=r.purchaseConfig||null;return Li(o,s)}).then(()=>{g("Sucesso","Compra registrada e integrada ao financeiro!","success"),a.innerHTML='<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Registrado',a.classList.replace("bg-blue-600","bg-green-600"),a.classList.replace("hover:bg-blue-700","hover:bg-green-700")}).catch(r=>{a.disabled=!1,a.innerHTML='<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Salvar',g("Erro","Falha ao registrar compra: "+r.message,"error")})}if(e.target.closest(".btn-delete-purchase")){const o=e.target.closest(".btn-delete-purchase").dataset.id;H("Excluir Compra","Isto apagará o registo histórico E o lançamento financeiro associado. Deseja continuar?").then(async r=>{if(r)try{await Ti(o,u.establishmentId),g("Sucesso","Compra e financeiro excluídos.","success"),Ts()}catch(s){g("Erro","Erro ao excluir: "+s.message,"error")}})}if(e.target.closest(".btn-print-order")){const o=e.target.closest(".supplier-order-card").dataset.supplierId,r=z.finalOrders[o];r?Ji(r,z.isQuoteMode):g("Erro","Dados do pedido não encontrados.","error")}if(e.target.closest(".btn-view-purchase")){const a=e.target.closest(".btn-view-purchase"),o=JSON.parse(a.dataset.purchase);Wi(o)}},ve.addEventListener("click",ue),ve.addEventListener("input",ue),ve.addEventListener("change",ue),vt("list")}function vt(e){Dt=e,["list","purchases","history"].forEach(a=>{const o=document.getElementById(`tab-btn-${a}`),r=document.getElementById(`tab-content-${a}`);a===e?(o.classList.add("border-indigo-500","text-indigo-600"),o.classList.remove("border-transparent","text-gray-500"),r.classList.remove("hidden")):(o.classList.remove("border-indigo-500","text-indigo-600"),o.classList.add("border-transparent","text-gray-500"),r.classList.add("hidden"))});const t=document.getElementById("btn-new-supplier");t&&(e==="list"?t.classList.remove("hidden"):t.classList.add("hidden")),Hi()}const aa=document.getElementById("content"),yo={monday:"Segunda",tuesday:"Terça",wednesday:"Quarta",thursday:"Quinta",friday:"Sexta",saturday:"Sábado",sunday:"Domingo"};let ie=new Set,ht=null,Be=null;function Yi(e=8){let t="";for(let a=0;a<e;a++)t+=`
        <div class="bg-white rounded-lg shadow-md flex items-center gap-4 p-3 overflow-hidden animate-pulse sm:flex-col sm:items-stretch sm:p-0 sm:gap-0">
            <div class="w-16 h-16 rounded-full bg-gray-200 flex-shrink-0 sm:w-full sm:h-32 sm:rounded-b-none sm:rounded-t-lg"></div>
            <div class="flex-1 space-y-3 sm:p-4">
                <div class="h-4 bg-gray-200 rounded w-3/4"></div>
                <div class="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
        </div>
        `;return t}function Qi(e){return e.length===0?'<p class="col-span-full text-center text-gray-500 py-10">Nenhum profissional encontrado.</p>':e.map(t=>{const a=t.status==="inactive",o=f(t.name),r=f(t.specialty||"Especialidade"),s=t.photo||`https://placehold.co/100x100/E2E8F0/4A5568?text=${encodeURIComponent(t.name?t.name.charAt(0):"P")}`,n=JSON.stringify(t).replace(/'/g,"&apos;");return`
            <div class="professional-card bg-white rounded-lg shadow-md flex items-center gap-4 p-3 cursor-pointer transition-transform transform hover:shadow-lg hover:bg-gray-50
                        sm:flex-col sm:items-stretch sm:p-0 sm:gap-0 ${a?"opacity-50 bg-gray-100":""}" 
                 data-action="open-professional-modal" data-professional='${n}'>
                
                <img src="${s}" alt="Foto de ${o}" class="w-16 h-16 rounded-full object-cover flex-shrink-0
                            sm:w-full sm:h-32 sm:rounded-b-none sm:rounded-t-lg">
                
                <div class="flex-1 sm:p-4">
                    <div class="flex justify-between items-start">
                        <div>
                            <h3 class="text-sm font-bold text-gray-900 text-left sm:text-base">${o}</h3>
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
            </div>`}).join("")}function oa(){const e=document.getElementById("genericModal");e.style.display="none",Be&&e.removeEventListener("click",Be)}async function Xi(e){const t=document.getElementById("genericModal"),a=e.id?e:{name:"Novo Profissional",specialty:"",status:"active",workingHours:{},services:[]},o=f(a.name),r=u.services||await be(u.establishmentId),s=u.professionals||await ee(u.establishmentId),n=`
        <div class="modal-content max-w-5xl p-0 overflow-y-auto max-h-[90vh]"> 
            <div class="modal-header px-6 py-4 flex justify-between items-center border-b">
                <h2 class="text-2xl font-bold text-gray-800">${o}</h2>
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
        </div>`;t.innerHTML=n,t.style.display="flex",Zi(a,r),Ki(a),el(a,s),al(a)}function Zi(e,t){const a=document.getElementById("professionalForm"),o=e.dob?e.dob.split("/"):["",""],r=Array.from({length:12},(y,w)=>{const $=w+1,k=$==o[1]?"selected":"",C=new Date(0,w).toLocaleString("pt-BR",{month:"long"});return`<option value="${$}" ${k}>${C.charAt(0).toUpperCase()+C.slice(1)}</option>`}).join(""),s=e.status||"active",n=f(e.name||""),i=f(e.specialty||""),d=f(e.phone||""),l=f(e.notes||"");a.innerHTML=`
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
                    <div class="form-group"><label for="profName">Nome</label><input type="text" id="profName" value="${n}" required class="mt-1 w-full p-2 border rounded-md"></div>
                    <div class="form-group"><label for="profSpecialty">Especialidade</label><input type="text" id="profSpecialty" value="${i}" required class="mt-1 w-full p-2 border rounded-md"></div>
                    <div class="form-group"><label for="profPhone">Número de telefone</label><input type="tel" id="profPhone" value="${d}" class="mt-1 w-full p-2 border rounded-md"></div>
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

        <div><label class="block text-sm font-medium text-gray-700">Serviços Realizados</label><div id="profServicesContainer" class="mt-2 grid grid-cols-2 md:grid-cols-3 gap-4 p-4 border rounded-md bg-white max-h-48 overflow-y-auto">${t.map(y=>`<label class="flex items-center space-x-2"><input type="checkbox" value="${y.id}" class="rounded" ${e.services?.includes(y.id)?"checked":""}><span>${f(y.name)}</span></label>`).join("")}</div></div>
        <div class="form-group"><label for="profNotes">Observações</label><textarea id="profNotes" rows="3" class="mt-1 w-full p-2 border rounded-md">${l}</textarea></div>`;const c=document.getElementById("profPhotoInput"),m=document.getElementById("profPhotoButton"),p=document.getElementById("profPhotoPreview"),b=document.getElementById("profPhotoBase64"),v=e.photo||`https://placehold.co/128x128/E2E8F0/4A5568?text=${encodeURIComponent(e.name?e.name.charAt(0):"P")}`,h=e.photo||"";m&&m.addEventListener("click",()=>c.click()),c&&(c.onchange=async()=>{const y=c.files[0];if(y){p.src="https://placehold.co/128x128/E2E8F0/4A5568?text=...";try{const w=await os(y,800,800,.8),k=w.length*3/4,C=1e3*1024;if(k>C)throw new Error("A imagem é muito grande mesmo após a compressão.");p.src=w,b.value=w}catch(w){g("Erro de Imagem",w.message||"Não foi possível processar a imagem.","error"),p.src=v,b.value=h,c.value=""}}})}function Ki(e){const t=document.getElementById("jornada");t.innerHTML='<div><h3 class="text-xl font-semibold mb-4">Jornada de Trabalho Semanal</h3><p class="text-sm text-gray-600 mb-4">Defina os horários de trabalho padrão para este profissional.</p><div id="profScheduleContainer" class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4"></div></div>',tl(t.querySelector("#profScheduleContainer"),e.workingHours||{})}async function el(e,t){const a=document.getElementById("bloqueios");a.innerHTML=`
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
                <h3 class="text-xl font-semibold mb-4">Lançamento de Bloqueios</h3>
                <form id="batchBlockageForm" class="p-4 bg-white rounded-lg shadow-inner space-y-3 mb-4">
                    <h4 class="font-semibold text-gray-800">Selecione os Profissionais</h4>
                    <div id="batchProfSelectionContainer" class="max-h-32 overflow-y-auto p-2 border rounded-md space-y-2">
                        ${t.map(s=>`<label class="flex items-center"><input type="checkbox" name="batch-professionals" value="${s.id}" class="rounded mr-2" ${s.id===e.id?"checked":""}><span>${f(s.name)}</span></label>`).join("")}
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
                    <h3 class="text-xl font-semibold">Bloqueios de ${f(e.name)}</h3>
                    <select id="prof-blockages-filter" class="p-1 border rounded text-sm bg-white">
                        <option value="future">Futuros</option>
                        <option value="history">Histórico</option>
                    </select>
                </div>
                <div id="blockagesList" class="space-y-2 max-h-96 overflow-y-auto pr-2"></div>
            </div>
        </div>`;const o=document.getElementById("batchBlockageForm");o&&o.addEventListener("submit",async s=>{s.preventDefault();const n=Array.from(s.target.querySelectorAll('input[name="batch-professionals"]:checked')).map(b=>b.value);if(n.length===0)return g("Atenção","Selecione pelo menos um profissional.","error");const i=s.target.batchBlockageStartDate.value,d=s.target.batchBlockageEndDate.value||i,l=s.target.batchBlockageStartTime.value,c=s.target.batchBlockageEndTime.value,m=s.target.batchBlockageReason.value;if(!i||!l||!c)return g("Atenção","Preencha Data de Início, Início e Fim.","error");const p=n.map(b=>{const v={professionalId:b,establishmentId:u.establishmentId,startTime:new Date(`${i}T${l}`).toISOString(),endTime:new Date(`${d}T${c}`).toISOString(),reason:m};return _t(v)});try{await Promise.all(p),g("Sucesso!",`${n.length} bloqueios foram criados.`);const b=document.getElementById("prof-blockages-filter").value;ot(e.id,b)}catch(b){g("Erro",b.message,"error")}}),document.getElementById("prof-blockages-filter").addEventListener("change",s=>ot(e.id,s.target.value)),await ot(e.id,"future")}function tl(e,t){e.innerHTML=Object.keys(yo).map(a=>{const o=t[a]||{},r=o.active!==!1;return`
            <div class="day-schedule-card p-3 rounded-lg ${r?"bg-white":"bg-gray-100 disabled"} border">
                 <div class="flex justify-between items-center"><span class="font-semibold text-gray-800">${yo[a]}</span><label class="flex items-center cursor-pointer"><div class="relative"><input type="checkbox" data-day="${a}" data-field="active" class="sr-only" ${r?"checked":""}><div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full"></div></div></label></div>
                <div class="time-inputs grid grid-cols-2 gap-2 mt-2 text-sm">
                    <div><label>Início:</label><input type="time" data-day="${a}" data-field="start" value="${o.start||"09:00"}" class="w-full p-1 border rounded" ${r?"":"disabled"}></div>
                    <div><label>Fim:</label><input type="time" data-day="${a}" data-field="end" value="${o.end||"18:00"}" class="w-full p-1 border rounded" ${r?"":"disabled"}></div>
                    <div><label>Intervalo:</label><input type="time" data-day="${a}" data-field="breakStart" value="${o.breakStart||"12:00"}" class="w-full p-1 border rounded" ${r?"":"disabled"}></div>
                    <div><label>Fim Int.:</label><input type="time" data-day="${a}" data-field="breakEnd" value="${o.breakEnd||"13:00"}" class="w-full p-1 border rounded" ${r?"":"disabled"}></div>
                </div>
            </div>`}).join(""),e.querySelectorAll('input[type="checkbox"][data-field="active"]').forEach(a=>{a.addEventListener("change",o=>{const r=o.target.closest(".day-schedule-card"),s=!o.target.checked;r.classList.toggle("bg-white",!s),r.classList.toggle("bg-gray-100",s),r.classList.toggle("disabled",s),r.querySelectorAll(".time-inputs input").forEach(n=>n.disabled=s)})})}async function ot(e,t="future"){const a=document.getElementById("blockagesList");if(a){a.innerHTML='<div class="loader mx-auto"></div>';try{const o=new Date;let r,s;t==="history"?(s=new Date,r=new Date,r.setFullYear(r.getFullYear()-2)):(r=new Date,s=new Date,s.setFullYear(s.getFullYear()+2));let i=(await Ut(u.establishmentId,r.toISOString(),s.toISOString(),e)).map(l=>({...l,startTime:new Date(l.startTime),endTime:new Date(l.endTime)}));t==="history"?i=i.filter(l=>l.endTime<o).sort((l,c)=>c.startTime-l.startTime):i=i.filter(l=>l.endTime>=o).sort((l,c)=>l.startTime-c.startTime);const d=i.reduce((l,c)=>{const m=c.reason||"Sem motivo";return l[m]||(l[m]=[]),l[m].push(c),l},{});if(Object.keys(d).length===0){a.innerHTML=`<p class="text-center text-gray-500 text-sm py-4">Nenhum bloqueio ${t==="history"?"no histórico":"futuro"}.</p>`;return}a.innerHTML=Object.entries(d).map(([l,c])=>`
            <div class="bg-gray-100 rounded-lg p-3 my-2 space-y-2">
                <div class="flex justify-between items-center pb-2 border-b">
                    <h4 class="font-bold text-gray-700">${f(l)} (${c.length})</h4>
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
        `).join("")}catch(o){a.innerHTML=`<p class="text-red-500">${o.message}</p>`}}}function al(e){const t=document.getElementById("genericModal");Be&&t.removeEventListener("click",Be),Be=async a=>{const o=a.target.closest("button[data-action]");if(!o){const s=a.target.closest(".tab-link");s&&(t.querySelectorAll(".tab-link").forEach(n=>n.classList.remove("active")),s.classList.add("active"),t.querySelectorAll(".tab-content").forEach(n=>n.classList.add("hidden")),document.getElementById(s.dataset.tab).classList.remove("hidden"));return}const r=o.dataset.action;switch(a.stopPropagation(),r){case"close-modal":oa();break;case"delete-professional":const s=o.dataset.id;if(await H("Excluir Profissional",`Tem certeza que deseja excluir ${e.name}? Esta ação não pode ser desfeita.`))try{await _o(s),g("Sucesso!","Profissional excluído.","success"),oa(),qt()}catch(h){g("Erro",`Não foi possível excluir: ${h.message}`,"error")}break;case"save-professional":const i=document.getElementById("professionalForm"),d=o,l=document.getElementById("profScheduleContainer"),c=Array.from(i.querySelectorAll("#profServicesContainer input:checked")).map(h=>h.value),m={};l&&l.querySelectorAll(".day-schedule-card").forEach(h=>{const y=h.querySelector('[data-field="active"]').dataset.day;m[y]={active:h.querySelector('[data-field="active"]').checked,start:h.querySelector('[data-field="start"]').value,end:h.querySelector('[data-field="end"]').value,breakStart:h.querySelector('[data-field="breakStart"]').value,breakEnd:h.querySelector('[data-field="breakEnd"]').value}});const p={...e,id:i.querySelector("#professionalId").value||void 0,name:i.querySelector("#profName").value,specialty:i.querySelector("#profSpecialty").value,photo:i.querySelector("#profPhotoBase64").value,services:c,workingHours:m,phone:i.querySelector("#profPhone").value,dob:`${i.querySelector("#profDobDay").value}/${i.querySelector("#profDobMonth").value}`,receivesCommission:i.querySelector("#profCommission").value==="sim",showOnAgenda:i.querySelector("#profShowOnAgenda").value==="sim",orderOnAgenda:parseInt(i.querySelector("#profOrderOnAgenda").value)||1,notes:i.querySelector("#profNotes").value,status:i.querySelector("#profStatus").value,establishmentId:u.establishmentId};d.disabled=!0,d.textContent="A salvar...";try{p.id?(await Pt(p.id,p),g("Sucesso!","Profissional atualizado.","success")):(delete p.id,await Uo(p),g("Sucesso!","Profissional criado.","success")),oa(),qt()}catch(h){g("Erro",h.message,"error"),d.disabled=!1,d.textContent="Salvar"}break;case"delete-blockage":const b=o.dataset.id;if(await H("Apagar Bloqueio","Tem certeza?"))try{await La(b),g("Bloqueio removido.","success");const h=document.getElementById("prof-blockages-filter")?document.getElementById("prof-blockages-filter").value:"future";ot(e.id,h)}catch(h){g("Erro",h.message,"error")}break;case"batch-delete-blockage":const v=JSON.parse(o.dataset.ids);if(await H("Apagar em Lote",`Tem certeza que deseja apagar ${v.length} bloqueios com este motivo?`))try{await Ko(v),g("Bloqueios removidos.","success");const h=document.getElementById("prof-blockages-filter")?document.getElementById("prof-blockages-filter").value:"future";ot(e.id,h)}catch(h){g("Erro",h.message,"error")}break}},t.addEventListener("click",Be)}function ha(){const e=document.getElementById("batch-actions-container"),t=document.getElementById("selected-count");!e||!t||(ie.size>0?(t.textContent=`${ie.size} selecionado(s)`,e.classList.remove("hidden")):e.classList.add("hidden"))}function ol(){H("Excluir em Lote",`Tem certeza que deseja excluir ${ie.size} profissionais? Esta ação não pode ser desfeita.`).then(async e=>{if(e)try{await vr(Array.from(ie)),g("Sucesso!",`${ie.size} profissionais foram excluídos.`,"success"),ie.clear(),ha(),qt()}catch(t){g("Erro",`Não foi possível excluir em lote: ${t.message}`,"error")}})}function Qe(){const e=document.getElementById("professionalsList");if(!e)return;if(!u.professionals){e.className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 pb-20",e.innerHTML=Yi();return}const t=document.getElementById("showInactiveProfToggle").checked,a=document.getElementById("profSearchInput").value.toLowerCase(),o=u.professionals.filter(r=>{const s=r.name.toLowerCase().includes(a),n=t||r.status!=="inactive";return s&&n});e.className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 pb-20",e.innerHTML=Qi(o)}async function qt(){ie.clear(),aa.innerHTML=`
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
        </section>`,ht&&aa.removeEventListener("click",ht),ht=t=>{const a=t.target.closest('[data-action="open-professional-modal"]'),o=t.target.closest('[data-action="batch-delete"]');if(a){t.preventDefault();let s={};if(a.dataset.professional)try{s=JSON.parse(a.dataset.professional)}catch(n){console.error("Erro ao fazer parse do professional data:",n);return}Xi(s);return}if(o){ol();return}const r=t.target.closest(".professional-checkbox");if(r){const s=r.dataset.id;r.checked?ie.add(s):ie.delete(s),Qe(),ha();return}},aa.addEventListener("click",ht),document.getElementById("profSearchInput").addEventListener("input",Qe),document.getElementById("showInactiveProfToggle").addEventListener("change",Qe);const e=document.getElementById("professionalsList");u.professionals=null,u.services=null,Qe();try{const[t,a]=await Promise.all([ee(u.establishmentId),be(u.establishmentId)]);u.professionals=t,u.services=a,Qe(),ha()}catch{e.innerHTML='<p class="text-red-500 col-span-full">Erro ao carregar dados da página.</p>'}}let S={clients:[],selectedClient:null,activeTab:"profile",filters:{search:"",inactiveDays:"",birthMonth:"",hasLoyalty:!1,hasDebt:!1},showFilters:!1,loading:!1,historyLimit:20,historySearchTerm:"",historyLoading:!1,historyData:{appointments:[],sales:[],loyaltyLog:[]},modalOpen:!1},Ds=null;const sl=e=>e?String(e).replace(/\D/g,""):"",rl=e=>{if(!e)return"Nunca";let t;if(typeof e=="object"&&(e.seconds||e._seconds)){const a=e.seconds||e._seconds;t=new Date(a*1e3)}else t=new Date(e);return isNaN(t.getTime())?"Data Inválida":t.toLocaleDateString("pt-BR")};function Ha(){Ds.innerHTML=`
        <section class="h-[calc(100vh-4rem)] sm:h-full flex flex-col bg-gray-50 overflow-x-hidden w-full">
            <div class="bg-white border-b shadow-sm z-30 flex-shrink-0">
                <div class="p-3 sm:p-4 flex flex-col sm:flex-row justify-between items-center gap-3 max-w-7xl mx-auto w-full">
                    <div class="w-full sm:w-auto text-center sm:text-left">
                        <h2 class="text-xl sm:text-2xl font-bold text-gray-800">Clientes</h2>
                        <p class="text-xs text-gray-500 hidden sm:block">Gerencie sua base de contatos</p>
                    </div>
                    
                    <div class="w-full sm:w-auto flex gap-2">
                        <button id="btn-new-client" class="w-full sm:w-auto bg-indigo-600 text-white px-4 py-2.5 rounded-lg hover:bg-indigo-700 transition shadow flex items-center justify-center gap-2 text-sm font-bold active:scale-95 transform duration-150">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                            Novo
                        </button>
                    </div>
                </div>
            </div>

            <div id="clients-content-area" class="flex-grow overflow-y-auto custom-scrollbar w-full max-w-7xl mx-auto relative">
                ${S.loading?'<div class="flex justify-center pt-20"><div class="loader"></div></div>':""}
            </div>
        </section>
    `;const e=document.getElementById("btn-new-client");e&&(e.onclick=gl)}function ct(){if(S.modalOpen)return;Ha();const e=document.getElementById("clients-content-area"),t=S.filters.inactiveDays||S.filters.birthMonth||S.filters.hasLoyalty||S.filters.hasDebt,a=`
        <div class="sticky top-0 bg-gray-50 z-20 px-3 sm:px-4 pt-4 pb-2 w-full">
            <div class="flex gap-2 items-center">
                <div class="relative flex-grow shadow-sm">
                    <input type="text" id="client-search" 
                        class="w-full py-3 pl-10 pr-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 text-sm outline-none transition bg-white" 
                        placeholder="Buscar cliente..." 
                        value="${S.filters.search}">
                    <svg class="w-5 h-5 text-gray-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                
                <button id="btn-toggle-filters" class="flex-shrink-0 p-3 rounded-xl border transition flex items-center gap-2 font-medium ${S.showFilters||t?"bg-indigo-50 border-indigo-200 text-indigo-700":"bg-white border-gray-300 text-gray-600 hover:bg-gray-50"}">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>
                    <span class="hidden sm:inline">Filtros</span>
                    ${t?'<span class="flex h-2 w-2 rounded-full bg-indigo-600"></span>':""}
                </button>
            </div>

            <div id="filter-panel" class="${S.showFilters?"max-h-96 opacity-100 mt-3":"max-h-0 opacity-0 overflow-hidden"} transition-all duration-300 ease-in-out">
                <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    
                    <div class="space-y-1">
                        <label class="text-xs font-bold text-gray-500 uppercase">Dias Ausente (Min)</label>
                        <div class="relative">
                            <input type="number" id="filter-inactive" min="1"
                                class="w-full p-2.5 pl-9 rounded-lg border border-gray-300 focus:ring-indigo-500 text-sm bg-gray-50 outline-none" 
                                placeholder="Ex: 30 dias" 
                                value="${S.filters.inactiveDays}">
                            <svg class="w-4 h-4 text-gray-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                    </div>

                    <div class="space-y-1">
                        <label class="text-xs font-bold text-gray-500 uppercase">Aniversário em</label>
                        <select id="filter-birth-month" class="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-indigo-500 text-sm bg-gray-50 outline-none">
                            <option value="">Todos os meses</option>
                            <option value="1">Janeiro</option>
                            <option value="2">Fevereiro</option>
                            <option value="3">Março</option>
                            <option value="4">Abril</option>
                            <option value="5">Maio</option>
                            <option value="6">Junho</option>
                            <option value="7">Julho</option>
                            <option value="8">Agosto</option>
                            <option value="9">Setembro</option>
                            <option value="10">Outubro</option>
                            <option value="11">Novembro</option>
                            <option value="12">Dezembro</option>
                        </select>
                    </div>

                    <div class="flex flex-col justify-center gap-2 pt-4 sm:pt-0">
                        <label class="flex items-center cursor-pointer hover:bg-gray-50 p-1 rounded transition">
                            <input type="checkbox" id="filter-loyalty" class="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4" ${S.filters.hasLoyalty?"checked":""}>
                            <span class="ml-2 text-sm text-gray-700 font-medium">Com Pontos Fidelidade</span>
                        </label>
                        <label class="flex items-center cursor-pointer hover:bg-red-50 p-1 rounded transition">
                            <input type="checkbox" id="filter-debt" class="rounded text-red-600 focus:ring-red-500 w-4 h-4" ${S.filters.hasDebt?"checked":""}>
                            <span class="ml-2 text-sm font-semibold text-red-600">Com Débitos (Fiado)</span>
                        </label>
                    </div>

                    <div class="flex items-end">
                        <button id="btn-apply-filters" class="w-full bg-gray-900 text-white py-2.5 rounded-lg text-sm font-bold shadow hover:bg-gray-800 transition active:scale-95">
                            Aplicar Filtros
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `,o=S.clients.length>0?`
        <div class="px-3 sm:px-4 pb-20 pt-2 w-full">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                ${S.clients.map(c=>{const m=c.totalDebt&&parseFloat(c.totalDebt)>0,p=rl(c.lastVisit);return`
                    <div class="client-card bg-white p-3 sm:p-4 rounded-xl border ${m?"border-l-4 border-l-red-500 border-y-red-100 border-r-red-100":"border-gray-200 border-l-4 border-l-indigo-500"} shadow-sm hover:shadow-md transition cursor-pointer active:bg-gray-50 flex items-center gap-3 group" data-id="${c.id}">
                        
                        <div class="w-12 h-12 rounded-full ${m?"bg-red-100 text-red-600":"bg-indigo-100 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white"} transition-colors flex items-center justify-center font-bold text-lg flex-shrink-0">
                            ${c.name.charAt(0).toUpperCase()}
                        </div>
                        
                        <div class="flex-grow min-w-0">
                            <div class="flex justify-between items-start">
                                <h3 class="font-bold text-gray-800 truncate text-base">${f(c.name)}</h3>
                                ${c.dobDay&&c.dobMonth==new Date().getMonth()+1?'<span class="text-xs bg-pink-100 text-pink-600 px-1.5 py-0.5 rounded font-bold">🎂 Mês</span>':""}
                            </div>
                            <p class="text-sm text-gray-500 truncate">${c.phone||"Sem telefone"}</p>
                            
                            <div class="flex flex-wrap gap-2 mt-1.5 items-center">
                                ${c.loyaltyPoints?`<span class="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-200">⭐ ${c.loyaltyPoints}</span>`:""}
                                ${m?`<span class="text-[10px] font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded-full border border-red-200">Devendo: R$ ${parseFloat(c.totalDebt).toFixed(2)}</span>`:""}
                                <span class="text-[10px] text-gray-400 flex items-center gap-1 ml-auto">
                                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    ${p==="Nunca"?"Novo":p}
                                </span>
                            </div>
                        </div>
                        
                        <div class="text-gray-300 group-hover:text-indigo-500 transition-colors">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                        </div>
                    </div>
                `}).join("")}
            </div>
        </div>
    `:`
        <div class="text-center py-20 px-6 opacity-60">
            <div class="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
            </div>
            <p class="text-xl font-bold text-gray-800 mb-2">Nenhum cliente encontrado</p>
            <p class="text-sm text-gray-500 max-w-xs mx-auto">Tente ajustar seus filtros de busca ou cadastre um novo cliente.</p>
            ${t?'<button id="btn-clear-search" class="mt-4 text-indigo-600 font-bold text-sm hover:underline">Limpar Filtros</button>':""}
        </div>
    `;e.innerHTML=a+o;const r=document.getElementById("client-search"),s=document.getElementById("btn-toggle-filters"),n=document.getElementById("btn-apply-filters"),i=document.getElementById("btn-clear-search");s&&(s.onclick=()=>{S.showFilters=!S.showFilters,ct()});const d=document.getElementById("filter-birth-month");d&&(d.value=S.filters.birthMonth);const l=()=>{const c=document.getElementById("filter-inactive"),m=document.getElementById("filter-loyalty"),p=document.getElementById("filter-debt"),b=document.getElementById("filter-birth-month");S.filters={search:r.value,inactiveDays:c?c.value:"",birthMonth:b?b.value:"",hasLoyalty:m?m.checked:!1,hasDebt:p?p.checked:!1},xa()};n&&(n.onclick=l),i&&(i.onclick=()=>{S.filters={search:"",inactiveDays:"",birthMonth:"",hasLoyalty:!1,hasDebt:!1},S.showFilters=!1,xa()}),r.addEventListener("keypress",c=>{c.key==="Enter"&&l()}),e.querySelectorAll(".client-card").forEach(c=>{c.onclick=()=>Ps(c.dataset.id)})}function nl(e){const t=`
        <div class="bg-white border-b sticky top-0 z-10 shadow-sm w-full">
            <div class="flex overflow-x-auto no-scrollbar gap-1 px-3 sm:px-4 py-1 w-full">
                <button class="tab-btn ${S.activeTab==="profile"?"active":""}" data-tab="profile">👤 Perfil</button>
                <button class="tab-btn ${S.activeTab==="appointments"?"active":""}" data-tab="appointments">📅 Agendamentos</button>
                <button class="tab-btn ${S.activeTab==="history"?"active":""}" data-tab="history">💰 Histórico</button>
                <button class="tab-btn ${S.activeTab==="loyalty"?"active":""}" data-tab="loyalty">⭐ Fidelidade</button>
            </div>
        </div>
    `;let a="";return S.activeTab==="profile"?a=dl(e):S.activeTab==="appointments"?a=cl():S.activeTab==="history"?a=ul():S.activeTab==="loyalty"&&(a=ml(e)),`
        <div class="w-full bg-white shadow-sm min-h-full flex flex-col overflow-x-hidden">
            <div class="bg-gradient-to-br from-indigo-600 to-purple-700 p-4 sm:p-6 text-white relative overflow-hidden flex-shrink-0">
                
                <button id="btn-close-modal" class="absolute top-4 right-4 text-white/70 hover:text-white hover:bg-white/20 p-2 rounded-full transition z-50 bg-black/10 sm:bg-transparent">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>

                <div class="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 pt-6 sm:pt-0">
                    <div class="w-20 h-20 rounded-full bg-white text-indigo-600 flex items-center justify-center text-3xl font-bold shadow-lg ring-4 ring-white/20 flex-shrink-0">
                        ${e.name.charAt(0).toUpperCase()}
                    </div>
                    
                    <div class="text-center sm:text-left flex-grow min-w-0">
                        <h2 class="text-xl sm:text-2xl font-bold leading-tight break-words">${f(e.name)}</h2>
                        <div class="flex flex-col sm:flex-row items-center sm:items-start gap-1 mt-1 opacity-90 text-sm">
                            <span>${e.phone||"Sem telefone"}</span>
                            <span class="hidden sm:inline">•</span>
                            <span class="truncate max-w-[200px]">${e.email||""}</span>
                        </div>
                        
                        ${e.totalDebt&&e.totalDebt>0?`
                            <div class="mt-3 inline-block bg-red-900/40 backdrop-blur-md border border-red-400/30 px-3 py-1.5 rounded-full max-w-full">
                                <p class="text-xs font-bold text-red-50 flex items-center justify-center sm:justify-start gap-1 truncate">
                                    <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    Débito: R$ ${parseFloat(e.totalDebt).toFixed(2)}
                                </p>
                            </div>
                        `:""}
                    </div>
                    
                    <div class="mt-2 sm:mt-0 bg-white/10 p-3 rounded-xl backdrop-blur-sm text-center min-w-[100px] border border-white/10">
                        <p class="text-[10px] uppercase font-bold tracking-wide opacity-80">Fidelidade</p>
                        <p class="text-2xl font-extrabold text-yellow-300 drop-shadow-md">${e.loyaltyPoints||0}</p>
                    </div>
                </div>
            </div>

            ${t}

            <div class="p-3 sm:p-6 flex-grow relative bg-gray-50/50 overflow-y-auto custom-scrollbar">
                ${S.historyLoading?'<div class="absolute inset-0 bg-white/80 flex items-start justify-center pt-20 z-20"><div class="loader"></div></div>':""}
                <div class="animate-fade-in max-w-4xl mx-auto w-full pb-10">
                    ${a}
                </div>
            </div>
        </div>
    `}function il(e,t){if(!document.getElementById("tabs-styles")){const s=document.createElement("style");s.id="tabs-styles",s.textContent=`
            .tab-btn { padding: 12px 16px; white-space: nowrap; font-size: 0.9rem; font-weight: 500; color: #6b7280; border-bottom: 2px solid transparent; transition: all 0.2s; flex-shrink: 0; }
            .tab-btn.active { color: #4f46e5; border-bottom-color: #4f46e5; font-weight: 700; background-color: #f3f4f6; border-top-left-radius: 8px; border-top-right-radius: 8px; }
            .no-scrollbar::-webkit-scrollbar { display: none; }
            .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `,e.appendChild(s)}if(e.querySelectorAll(".tab-btn").forEach(s=>{s.onclick=async()=>{const n=s.dataset.tab;if(S.activeTab===n)return;(n==="appointments"||n==="history")&&(S.historyLimit=20,S.historySearchTerm=""),S.activeTab=n,Re(),n!=="profile"&&!S.historyLoading&&S.historyData.appointments.length===0&&await wo(t.id)}}),S.activeTab==="profile"){const s=e.querySelector("#form-edit-client"),n=e.querySelector("#btn-delete-client");s&&(s.onsubmit=bl),n&&(n.onclick=fl)}if(S.activeTab==="loyalty"){const s=e.querySelector("#btn-manual-redeem");s&&(s.onclick=()=>pl(t))}const a=e.querySelector("#history-search-input");if(a){const s=a.value;a.value="",a.focus(),a.value=s,a.addEventListener("input",n=>{S.historySearchTerm=n.target.value,Re()})}const o=e.querySelector("#btn-load-more");o&&(o.onclick=()=>{S.historyLimit+=20,Re(),wo(t.id)}),e.querySelectorAll("[data-go-agenda]").forEach(s=>{s.onclick=n=>{je(),K("agenda-section",{targetDate:new Date(s.dataset.date),scrollToAppointmentId:s.dataset.id})}}),e.querySelectorAll("[data-go-comanda]").forEach(s=>{s.onclick=n=>{je(),K("comandas-section",{selectedAppointmentId:s.dataset.id,initialFilter:"finalizadas"})}});const r=e.querySelector("#btn-close-modal");r&&(r.onclick=je)}async function Re(){const e=S.selectedClient;if(!e){je();return}ll(e)}function ll(e){let t=document.getElementById("client-details-modal-overlay");t||(t=document.createElement("div"),t.id="client-details-modal-overlay",t.className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-0 sm:p-4 animate-fade-in",t.innerHTML=`
            <div class="bg-white w-full h-full sm:h-[90vh] sm:max-w-5xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col relative animate-scale-in" id="client-modal-content">
            </div>
        `,t.onclick=o=>{o.target===t&&je()},document.body.appendChild(t),document.body.classList.add("overflow-hidden"),S.modalOpen=!0);const a=t.querySelector("#client-modal-content");a.innerHTML=nl(e),il(a,e)}function je(){const e=document.getElementById("client-details-modal-overlay");e&&e.remove(),document.body.classList.remove("overflow-hidden"),S.modalOpen=!1,S.selectedClient=null,ct()}function dl(e){return`
        <form id="form-edit-client" class="space-y-5 w-full">
            <div class="bg-white p-3 sm:p-4 rounded-xl border border-gray-200 shadow-sm w-full">
                <h3 class="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <svg class="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                    Dados Pessoais
                </h3>
                
                <div class="space-y-4 w-full">
                    <div class="w-full">
                        <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Nome Completo</label>
                        <input type="text" name="name" value="${f(e.name)}" required class="block w-full p-3 rounded-lg border border-gray-300 focus:ring-indigo-500 bg-gray-50 focus:bg-white transition text-base box-border">
                    </div>
                    
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                        <div class="w-full">
                            <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Telefone</label>
                            <input type="tel" name="phone" value="${f(e.phone||"")}" class="block w-full p-3 rounded-lg border border-gray-300 focus:ring-indigo-500 bg-gray-50 focus:bg-white transition text-base box-border">
                        </div>
                        <div class="w-full">
                            <label class="block text-xs font-bold text-gray-500 uppercase mb-1">E-mail</label>
                            <input type="email" name="email" value="${f(e.email||"")}" class="block w-full p-3 rounded-lg border border-gray-300 focus:ring-indigo-500 bg-gray-50 focus:bg-white transition text-base box-border">
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-4 w-full">
                        <div class="w-full">
                            <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Dia Nasc.</label>
                            <input type="number" name="dobDay" min="1" max="31" value="${e.dobDay||""}" class="block w-full p-3 rounded-lg border border-gray-300 bg-gray-50 text-base text-center box-border">
                        </div>
                        <div class="w-full">
                            <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Mês Nasc.</label>
                            <input type="number" name="dobMonth" min="1" max="12" value="${e.dobMonth||""}" class="block w-full p-3 rounded-lg border border-gray-300 bg-gray-50 text-base text-center box-border">
                        </div>
                    </div>
                </div>
            </div>

            <div class="bg-white p-3 sm:p-4 rounded-xl border border-gray-200 shadow-sm w-full">
                <h3 class="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <svg class="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                    Anotações
                </h3>
                <textarea name="notes" rows="4" class="block w-full p-3 rounded-lg border border-gray-300 focus:ring-indigo-500 bg-gray-50 focus:bg-white transition text-base box-border" placeholder="Preferências, alergias...">${f(e.notes||"")}</textarea>
            </div>
            
            <div class="flex flex-col gap-3 pt-2 w-full">
                <button type="submit" class="w-full bg-indigo-600 text-white px-6 py-3.5 rounded-xl font-bold shadow-lg hover:bg-indigo-700 transition transform active:scale-95 text-base">
                    Salvar Alterações
                </button>
                <button type="button" id="btn-delete-client" class="w-full bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 px-6 py-3 rounded-xl font-bold transition text-sm flex items-center justify-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    Excluir Cliente
                </button>
            </div>
        </form>
    `}function cl(e){let t=S.historyData.appointments||[];if(S.historySearchTerm){const o=S.historySearchTerm.toLowerCase();t=t.filter(r=>r.serviceName&&r.serviceName.toLowerCase().includes(o)||r.professionalName&&r.professionalName.toLowerCase().includes(o))}t.sort((o,r)=>new Date(r.startTime)-new Date(o.startTime));const a=o=>{const r=new Date(o.startTime),s=r.toLocaleDateString("pt-BR",{weekday:"short",day:"2-digit",month:"short"}).replace(".",""),n=r.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),i=r<new Date;let d=i?"Concluído":"Agendado",l=i?"bg-gray-200 text-gray-600":"bg-green-100 text-green-700";return o.status==="cancelled"&&(d="Cancelado",l="bg-red-100 text-red-600"),`
            <div class="relative bg-white border rounded-xl p-3 shadow-sm mb-3 flex gap-3 cursor-pointer active:scale-[0.99] transition w-full overflow-hidden"
                 data-go-agenda="true" data-id="${o.id}" data-date="${o.startTime}">
                
                <div class="flex-shrink-0 w-14 flex flex-col items-center justify-center rounded-lg bg-gray-100 border border-gray-200 p-1">
                    <span class="text-xs font-bold text-gray-500 uppercase">${s.split(" ")[0]}</span>
                    <span class="text-lg font-black text-gray-800 leading-none">${r.getDate()}</span>
                    <span class="text-[10px] text-gray-500">${n}</span>
                </div>

                <div class="flex-grow min-w-0 flex flex-col justify-center">
                    <h4 class="font-bold text-gray-800 text-sm truncate">${f(o.serviceName||"Serviço")}</h4>
                    <p class="text-xs text-gray-500 truncate">Prof: ${f(o.professionalName||"N/A")}</p>
                    <div class="mt-1">
                        <span class="inline-block text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${l}">
                            ${d}
                        </span>
                    </div>
                </div>

                <div class="flex items-center text-gray-300">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                </div>
            </div>
        `};return`
        <div class="space-y-4 w-full">
            <div class="sticky top-0 bg-gray-50 pt-2 pb-2 z-10 w-full">
                <div class="relative w-full">
                    <input type="text" id="history-search-input" 
                        class="w-full p-3 pl-10 bg-white border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm" 
                        placeholder="Filtrar histórico..." 
                        value="${S.historySearchTerm}">
                    <svg class="w-5 h-5 text-gray-400 absolute left-3 top-5.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
            </div>

            <div class="w-full">
                ${t.length?t.map(a).join(""):'<p class="text-center text-gray-400 py-10 italic">Nenhum agendamento encontrado.</p>'}
            </div>
            
            ${t.length>=S.historyLimit?`
            <button id="btn-load-more" class="w-full py-3 text-sm text-indigo-600 font-bold bg-indigo-50 rounded-xl hover:bg-indigo-100 transition">
                Carregar mais antigos...
            </button>`:""}
        </div>
    `}function ul(e){let t=S.historyData.sales||[];if(S.historySearchTerm){const a=S.historySearchTerm.toLowerCase();t=t.filter(o=>o.id.includes(a))}return t.sort((a,o)=>new Date(o.date)-new Date(a.date)),t.length===0&&!S.historySearchTerm?'<div class="text-center py-12 text-gray-400">Nenhum registro financeiro.</div>':`
        <div class="space-y-4 w-full">
            <div class="sticky top-0 bg-gray-50 pt-2 pb-2 z-10 w-full">
                <div class="relative w-full">
                    <input type="text" id="history-search-input" 
                        class="w-full p-3 pl-10 bg-white border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm" 
                        placeholder="Buscar código da venda..." 
                        value="${S.historySearchTerm}">
                    <svg class="w-5 h-5 text-gray-400 absolute left-3 top-5.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
            </div>

            <div class="space-y-3 w-full">
                ${t.map(a=>{const o=new Date(a.date||a.createdAt),r=a.totalAmount||0;return`
                    <div class="bg-white border border-gray-200 rounded-xl p-4 flex justify-between items-center shadow-sm active:bg-gray-50 cursor-pointer w-full"
                         data-go-comanda="true" data-id="${a.id}">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                            </div>
                            <div>
                                <p class="font-bold text-gray-800 text-sm">Venda #${a.id.slice(-4)}</p>
                                <p class="text-xs text-gray-500">${o.toLocaleDateString()}</p>
                            </div>
                        </div>
                        <div class="text-right">
                            <p class="font-bold text-gray-900">R$ ${parseFloat(r).toFixed(2)}</p>
                            <p class="text-[10px] text-indigo-500 font-medium">Ver detalhes</p>
                        </div>
                    </div>
                    `}).join("")}
            </div>
            
             ${t.length>=S.historyLimit?`
            <button id="btn-load-more" class="w-full py-3 text-sm text-indigo-600 font-bold bg-indigo-50 rounded-xl hover:bg-indigo-100 transition">
                Carregar mais...
            </button>`:""}
        </div>
    `}function ml(e){const t=S.historyData.loyaltyLog||[];t.sort((o,r)=>new Date(r.date)-new Date(o.date));const a=t.length>0?t.map(o=>{const r=o.type==="redemption";return`
            <div class="flex justify-between items-center py-3 border-b border-gray-100 last:border-0 w-full">
                <div class="flex items-center gap-3">
                    <div class="w-2 h-2 rounded-full ${r?"bg-red-500":"bg-green-500"}"></div>
                    <div>
                        <p class="text-sm font-medium text-gray-700">${f(o.description||(r?"Resgate":"Acúmulo"))}</p>
                        <p class="text-[10px] text-gray-400">${new Date(o.date).toLocaleDateString()}</p>
                    </div>
                </div>
                <span class="font-bold text-sm ${r?"text-red-600":"text-green-600"}">
                    ${r?"-":"+"}${o.points}
                </span>
            </div>
        `}).join(""):'<p class="text-center text-gray-400 py-4 text-xs italic">Sem histórico recente.</p>';return`
        <div class="space-y-6 w-full">
            <div class="bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden w-full">
                <div class="absolute right-0 top-0 opacity-10 transform translate-x-4 -translate-y-4">
                    <svg class="w-40 h-40" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                </div>
                
                <p class="text-amber-100 font-bold uppercase tracking-wider text-xs mb-1">Saldo de Pontos</p>
                <div class="flex items-baseline gap-2">
                    <h1 class="text-4xl sm:text-5xl font-black">${e.loyaltyPoints||0}</h1>
                    <span class="text-lg opacity-80">pts</span>
                </div>
                
                <button id="btn-manual-redeem" class="mt-4 w-full bg-white/20 hover:bg-white/30 text-white text-sm font-bold py-3 px-4 rounded-xl backdrop-blur-md transition border border-white/30 flex items-center justify-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                    Ajustar / Resgatar
                </button>
            </div>

            <div class="bg-white rounded-xl border border-gray-200 p-4 shadow-sm w-full">
                <h4 class="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3 border-b pb-2">Últimas Movimentações</h4>
                ${a}
            </div>
        </div>
    `}async function xa(){S.loading=!0,Ha();try{let e=`/api/clients/${u.establishmentId}?limit=20`;S.filters.search&&(e+=`&search=${encodeURIComponent(S.filters.search)}`),S.filters.inactiveDays&&(e+=`&inactiveDays=${S.filters.inactiveDays}`),S.filters.hasLoyalty&&(e+="&hasLoyalty=true"),S.filters.hasDebt&&(e+="&hasDebt=true"),S.clients=await E(e),ct()}catch(e){console.error(e),g("Erro","Falha ao carregar clientes.","error"),S.clients=[],ct()}finally{S.loading=!1;const e=document.querySelector(".loader");e&&e.parentElement&&e.parentElement.remove()}}async function wo(e){const t=S.selectedClient;if(!(!t||!t.phone)){S.historyLoading=!0;try{const a=new Date;a.setMonth(a.getMonth()+12);const o=new Date;o.setFullYear(o.getFullYear()-5);let r=`/api/appointments/${u.establishmentId}?startDate=${o.toISOString()}&endDate=${a.toISOString()}`;r+=`&clientPhone=${encodeURIComponent(sl(t.phone))}`,r+=`&limit=${S.historyLimit}`;const s=await E(r);S.historyData.appointments=s,S.historyData.sales=s.filter(i=>i.status==="completed").map(i=>({id:i.id,date:i.startTime,totalAmount:i.totalAmount||0,items:i.comandaItems||i.services||[]}));const n=[];s.forEach(i=>{i.status==="completed"&&i.loyaltyPointsEarned>0&&n.push({type:"earn",points:i.loyaltyPointsEarned,date:i.startTime,description:"Venda finalizada"}),i.loyaltyRedemption&&n.push({type:"redemption",points:i.loyaltyRedemption.cost||0,date:i.startTime,description:`Resgate: ${i.loyaltyRedemption.name}`})}),S.historyData.loyaltyLog=n}catch(a){console.error("Erro ao buscar histórico",a)}finally{S.historyLoading=!1,S.modalOpen&&S.selectedClient&&Re()}}}function pl(e){const t=e.loyaltyPoints||0,a=`
        <div class="text-center mb-6">
            <p class="text-xs text-gray-500 uppercase font-bold">Saldo Atual</p>
            <h2 class="text-4xl font-black text-gray-800">${t}</h2>
        </div>
        <form id="manual-redeem-form" class="space-y-4">
            <div>
                <label class="block text-sm font-bold text-gray-700 mb-1">Tipo de Ajuste</label>
                <select id="redeem-action" class="w-full p-3 border rounded-xl bg-gray-50 outline-none focus:ring-2 focus:ring-indigo-500">
                    <option value="debit">🔻 Remover Pontos (Resgate)</option>
                    <option value="credit">➕ Adicionar Pontos (Correção)</option>
                </select>
            </div>
            <div>
                <label class="block text-sm font-bold text-gray-700 mb-1">Quantidade</label>
                <input type="number" id="redeem-points" min="1" required class="w-full p-3 border rounded-xl text-lg font-bold outline-none focus:ring-2 focus:ring-indigo-500" placeholder="0">
            </div>
            <div>
                <label class="block text-sm font-bold text-gray-700 mb-1">Motivo</label>
                <input type="text" id="redeem-reason" required class="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Ex: Brinde entregue">
            </div>
            <div class="pt-4">
                <button type="submit" class="w-full bg-indigo-600 text-white px-4 py-3 rounded-xl font-bold shadow-lg hover:bg-indigo-700 active:scale-95 transition">Confirmar</button>
            </div>
        </form>
    `,{modalElement:o,close:r}=_({title:"Ajuste de Pontos",contentHTML:a,maxWidth:"w-[90%] max-w-xs"});o.querySelector("form").onsubmit=async s=>{s.preventDefault();const n=document.getElementById("redeem-action").value,i=parseInt(document.getElementById("redeem-points").value,10),d=document.getElementById("redeem-reason").value;if(!i||i<=0)return g("Erro","Qtd inválida.","error");if(n==="debit"&&i>t)return g("Erro","Saldo insuficiente.","error");try{let l=t;n==="debit"?(await Gr(u.establishmentId,e.phone,i,d),l-=i):(l+=i,await as(e.id,{loyaltyPoints:l})),S.selectedClient.loyaltyPoints=l,S.historyData.loyaltyLog.unshift({type:n==="debit"?"redemption":"earn",points:i,date:new Date().toISOString(),description:d+" (Manual)"}),g("Sucesso","Saldo atualizado.","success"),r(),Re()}catch(l){g("Erro",l.message,"error")}}}function Ps(e){S.selectedClient=S.clients.find(t=>t.id===e),S.activeTab="profile",S.historyLimit=20,S.historySearchTerm="",S.historyData={appointments:[],sales:[],loyaltyLog:[]},Re()}function gl(){const e=`
        <form id="modal-new-client-form" class="space-y-4">
            <div><label class="block text-sm font-bold text-gray-700 mb-1">Nome Completo *</label><input type="text" id="new-name" required class="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"></div>
            <div><label class="block text-sm font-bold text-gray-700 mb-1">Telefone (WhatsApp) *</label><input type="tel" id="new-phone" required class="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"></div>
            <div class="pt-4">
                <button type="submit" class="w-full bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold shadow hover:bg-indigo-700 active:scale-95 transition">Cadastrar</button>
            </div>
        </form>
    `,{modalElement:t,close:a}=_({title:"Novo Cliente",contentHTML:e,maxWidth:"w-[90%] max-w-sm"});t.querySelector("form").onsubmit=async o=>{o.preventDefault();const r=document.getElementById("new-name").value,s=document.getElementById("new-phone").value;try{const n=await Da({establishmentId:u.establishmentId,name:r,phone:s});S.clients.unshift(n),g("Sucesso","Cliente criado!","success"),a(),Ps(n.id)}catch(n){g("Erro",n.message,"error")}}}async function bl(e){e.preventDefault();const t=new FormData(e.target),a=Object.fromEntries(t.entries());a.establishmentId=u.establishmentId;try{await as(S.selectedClient.id,a),Object.assign(S.selectedClient,a);const o=S.clients.findIndex(r=>r.id===S.selectedClient.id);o!==-1&&(S.clients[o]=S.selectedClient),g("Sucesso","Dados salvos!","success")}catch(o){g("Erro",o.message,"error")}}async function fl(){if(await H("Excluir Cliente","Tem certeza? O histórico será apagado."))try{await Jr(S.selectedClient.id),S.clients=S.clients.filter(e=>e.id!==S.selectedClient.id),S.selectedClient=null,g("Sucesso","Cliente removido.","success"),je(),ct()}catch(e){g("Erro",e.message,"error")}}async function vl(){Ds=document.getElementById("content"),S.selectedClient=null,S.searchTerm="",S.historyLimit=20,S.showFilters=!1,S.modalOpen=!1,S.filters={search:"",inactiveDays:"",birthMonth:"",hasLoyalty:!1,hasDebt:!1},Ha(),await xa()}const xe=document.getElementById("content"),sa={monday:"Segunda",tuesday:"Terça",wednesday:"Quarta",thursday:"Quinta",friday:"Sexta",saturday:"Sábado",sunday:"Domingo"},hl={indigo:{name:"Padrão (Índigo)",main:"#4f46e5"},blue:{name:"Azul",main:"#2563eb"},sky:{name:"Céu",main:"#0284c7"},teal:{name:"Verde Água",main:"#0d9488"},emerald:{name:"Esmeralda",main:"#059669"},green:{name:"Verde",main:"#16a34a"},lime:{name:"Lima",main:"#65a30d"},amber:{name:"Âmbar",main:"#d97706"},orange:{name:"Laranja",main:"#ea580c"},red:{name:"Vermelho",main:"#dc2626"},rose:{name:"Rosa",main:"#e11d48"},pink:{name:"Pink",main:"#db2777"},fuchsia:{name:"Fúcsia",main:"#c026d3"},purple:{name:"Roxo",main:"#7c3aed"},violet:{name:"Violeta",main:"#8b5cf6"},gray:{name:"Cinza",main:"#4b5563"},black:{name:"Preto",main:"#111827"}};function Bs(){let e=[{id:"personal-data",icon:"M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",label:"Dados Gerais da Unidade"},{id:"branding",icon:"M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z",label:"Identidade e Cores"},{id:"booking",icon:"M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2H5a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",label:"Agendamento Online"},{id:"working-hours",icon:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",label:"Horário de Funcionamento"},{id:"loyalty",icon:"M5 5a2 2 0 012-2h10a2 2 0 012 2v1h2a1 1 0 011 1v3a1 1 0 01-1 1h-2v1a2 2 0 01-2 2H7a2 2 0 01-2-2v-1H3a1 1 0 01-1-1V7a1 1 0 011-1h2V5z",label:"Plano de Fidelidade"},{id:"financial",icon:"M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8a1 1 0 011 1v4a1 1 0 11-2 0v-4a1 1 0 011-1zm0 0a1 1 0 001-1V5a1 1 0 10-2 0v2a1 1 0 001 1zm0 0a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1z",label:"Integração Financeira"},{id:"change-password",icon:"M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",label:"Alterar senha"},{id:"change-email",icon:"M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207",label:"Alterar E-mail de Acesso"},{id:"support",icon:"M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z",label:"Suporte e Ajuda"},{id:"cancellation",icon:"M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z",label:"Cancelar Assinatura"}];return(u.userRole==="group_admin"||u.userRole==="company_admin")&&e.unshift({id:"manage-network",icon:"M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",label:"Gestão de Múltiplas Filiais e Empresas"}),e}let Q=null,Fe=null;function ko(e,t,a){return new Promise((o,r)=>{const s=new FileReader;s.readAsDataURL(e),s.onload=n=>{const i=new Image;i.src=n.target.result,i.onload=()=>{const d=document.createElement("canvas");let l=i.width,c=i.height;l>t&&(c*=t/l,l=t),d.width=l,d.height=c,d.getContext("2d").drawImage(i,0,0,l,c);const p=e.type==="image/png"&&t<500?"image/png":"image/jpeg";o(d.toDataURL(p,a))},i.onerror=d=>r(d)},s.onerror=n=>r(n)})}function Le(e,t=null){let a='<option value="">-- Selecione (Opcional) --</option>';const o=n=>{const i=new Map,d=[];return n&&(n.forEach(l=>i.set(l.id,{...l,children:[]})),i.forEach(l=>{l.parentId&&i.has(l.parentId)?i.get(l.parentId).children.push(l):d.push(l)})),d},r=(n,i="")=>{const d=n.id===t?"selected":"";a+=`<option value="${n.id}" ${d}>${i}${f(n.name)}</option>`,n.children.forEach(l=>r(l,i+"— "))};return o(e).forEach(n=>r(n)),a}async function Je(e,t){const a=t.target.querySelector('button[type="submit"]');a&&(a.disabled=!0,a.textContent="A Salvar...");try{const o=Q||await Ee(u.establishmentId),r=[],{ownerName:s,...n}=e;if(s&&s!==u.userName){const d=U.currentUser;d&&r.push(_s(d,{displayName:s}).then(()=>{u.userName=s}))}const i={...o,...n};r.push(Lt(u.currentViewContext?.id||u.establishmentId,i)),await Promise.all(r),Q=i,g("Sucesso","Definições salvas com sucesso! A página será recarregada para aplicar o novo tema.","success"),n.themeColor&&setTimeout(()=>window.location.reload(),1500)}catch(o){g("Erro",`Não foi possível salvar: ${o.message}`,"error")}finally{a&&(a.disabled=!1,a.textContent="Salvar")}}async function xl(){try{const e=await u.getAuthToken?.()||await U.currentUser.getIdToken(),t=await fetch("/api/establishments/hierarchy",{headers:{Authorization:`Bearer ${e}`}});if(!t.ok)throw new Error("Falha ao obter hierarquia.");Fe=await t.json()}catch(e){console.error(e),g("Erro","Não foi possível carregar a hierarquia da empresa.","error"),Fe={companies:[],branches:[]}}}async function Oa(e){e.innerHTML='<div class="flex justify-center py-10"><div class="loader"></div></div>',await xl();let t=`
        <div class="bg-white p-4 md:p-6 rounded-lg shadow-md">
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 border-b pb-4">
                <div>
                    <h3 class="text-xl font-bold text-indigo-900">Gestão de Empresas e Filiais</h3>
                    <p class="text-sm text-gray-500">Controle a estrutura completa da sua rede.</p>
                </div>
                <div class="flex gap-2">
                    <button data-action="new-company" class="bg-indigo-50 border border-indigo-200 text-indigo-700 font-semibold py-2 px-3 rounded-lg hover:bg-indigo-100 text-xs">
                        + Nova Empresa (Matriz)
                    </button>
                    <button data-action="new-branch" class="bg-indigo-600 text-white font-semibold py-2 px-3 rounded-lg hover:bg-indigo-700 text-xs shadow-sm">
                        + Nova Filial (Loja)
                    </button>
                </div>
            </div>
            
            <div class="space-y-6">
    `;Fe.companies.length===0?t+='<p class="text-gray-500 text-center py-8">Nenhuma empresa registada na sua rede.</p>':Fe.companies.forEach(a=>{const o=Fe.branches.filter(r=>r.companyId===a.id);t+=`
                <div class="border border-gray-200 rounded-xl overflow-hidden">
                    <div class="bg-gray-50 p-4 border-b flex justify-between items-center">
                        <div>
                            <h4 class="font-bold text-gray-800 text-lg flex items-center gap-2">
                                🏢 ${f(a.name)}
                            </h4>
                            <p class="text-xs text-gray-500 ml-6">CNPJ: ${f(a.cnpj||"Não registado")}</p>
                        </div>
                    </div>
                    
                    <div class="p-4 bg-white">
                        <h5 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Filiais Registadas (${o.length})</h5>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                            ${o.length===0?'<p class="text-sm text-gray-400 italic">Nenhuma filial associada a esta matriz.</p>':""}
                            ${o.map(r=>`
                                <div class="p-3 border rounded-lg bg-gray-50 hover:border-indigo-300 transition-colors flex justify-between items-center">
                                    <div>
                                        <p class="font-bold text-sm text-gray-800">📍 ${f(r.name)}</p>
                                        <p class="text-[10px] text-gray-500">ID: ${r.id}</p>
                                    </div>
                                    <button data-action="switch-context" data-id="${r.id}" data-name="${f(r.name)}" class="text-xs bg-white border border-gray-300 px-2 py-1 rounded hover:bg-gray-100 font-semibold shadow-sm">
                                        Gerir Unidade
                                    </button>
                                </div>
                            `).join("")}
                        </div>
                    </div>
                </div>
            `}),t+="</div></div>",e.innerHTML=t,e.querySelector('[data-action="new-company"]').addEventListener("click",()=>yl()),e.querySelector('[data-action="new-branch"]').addEventListener("click",()=>wl()),e.querySelectorAll('[data-action="switch-context"]').forEach(a=>{a.addEventListener("click",o=>{const{id:r,name:s}=o.target.dataset;u.setContext?(u.setContext("BRANCH",r,s),g("A carregar...",`Mudando o painel para a filial ${s}`,"info")):g("Erro","O mecanismo de multi-empresa ainda está a carregar.","error")})})}function yl(){_({title:"Adicionar Nova Empresa (Matriz)",contentHTML:`
        <form id="newCompanyForm" class="space-y-4 p-4">
            <div>
                <label class="block text-sm font-medium text-gray-700">Nome da Matriz (Empresa)</label>
                <input type="text" id="compName" required class="mt-1 w-full p-2 border rounded-md">
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700">CNPJ (Opcional)</label>
                <input type="text" id="compCnpj" class="mt-1 w-full p-2 border rounded-md">
            </div>
            <div class="flex justify-end gap-2 pt-4">
                <button type="button" data-action="close-modal" data-target="genericModal" class="px-4 py-2 bg-gray-200 text-gray-800 rounded">Cancelar</button>
                <button type="submit" class="px-4 py-2 bg-indigo-600 text-white rounded font-bold">Criar Matriz</button>
            </div>
        </form>
    `,maxWidth:"max-w-md"}),document.getElementById("newCompanyForm").addEventListener("submit",async t=>{t.preventDefault();const a=t.target.querySelector('button[type="submit"]');a.disabled=!0,a.textContent="...";try{const o=await u.getAuthToken?.()||await U.currentUser.getIdToken();if(!(await fetch("/api/establishments/companies",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${o}`},body:JSON.stringify({name:document.getElementById("compName").value,cnpj:document.getElementById("compCnpj").value,groupId:u.groupId})})).ok)throw new Error("Falha ao criar");g("Sucesso","Nova Matriz criada!","success"),document.getElementById("genericModal").style.display="none",Oa(document.getElementById("settings-content-detail"))}catch(o){g("Erro",o.message,"error"),a.disabled=!1,a.textContent="Criar Matriz"}})}function wl(){const e=Fe.companies.map(a=>`<option value="${a.id}">${a.name}</option>`).join("");if(!e)return g("Aviso","Crie uma Empresa (Matriz) primeiro.","error");const t=`
        <form id="newBranchForm" class="space-y-4 p-4">
            <div>
                <label class="block text-sm font-medium text-gray-700">Selecione a Matriz</label>
                <select id="branchCompanyId" required class="mt-1 w-full p-2 border rounded-md bg-white">
                    <option value="">Selecione...</option>
                    ${e}
                </select>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700">Nome da Filial (Ex: Shopping Sul)</label>
                <input type="text" id="branchName" required class="mt-1 w-full p-2 border rounded-md">
            </div>
            <div class="flex justify-end gap-2 pt-4">
                <button type="button" data-action="close-modal" data-target="genericModal" class="px-4 py-2 bg-gray-200 text-gray-800 rounded">Cancelar</button>
                <button type="submit" class="px-4 py-2 bg-indigo-600 text-white rounded font-bold">Criar Filial</button>
            </div>
        </form>
    `;_({title:"Adicionar Nova Filial",contentHTML:t,maxWidth:"max-w-md"}),document.getElementById("newBranchForm").addEventListener("submit",async a=>{a.preventDefault();const o=a.target.querySelector('button[type="submit"]');o.disabled=!0,o.textContent="...";try{const r=await u.getAuthToken?.()||await U.currentUser.getIdToken();if(!(await fetch("/api/establishments",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify({name:document.getElementById("branchName").value,companyId:document.getElementById("branchCompanyId").value,groupId:u.groupId})})).ok)throw new Error("Falha ao criar");g("Sucesso","Nova Filial criada e configurada!","success"),document.getElementById("genericModal").style.display="none",Oa(document.getElementById("settings-content-detail"))}catch(r){g("Erro",r.message,"error"),o.disabled=!1,o.textContent="Criar Filial"}})}function kl(e,t){const a=f(e.name||""),o=f(e.phone||""),r=f(e.document||""),s=f(e.email||""),n=f(e.address||""),i=f(e.website||""),d=f(u.userName||"");t.innerHTML=`
        <div class="bg-white p-4 md:p-6 rounded-lg shadow-md">
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-xl font-bold text-gray-800">Dados Gerais e de Contato</h3>
                <button type="submit" form="personal-data-form" class="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600">Salvar</button>
            </div>
            <form id="personal-data-form" class="space-y-4">
                <div>
                    <label for="ownerName" class="block text-sm font-medium text-gray-700">Seu nome (Dono)</label>
                    <input type="text" id="ownerName" class="mt-1 w-full p-2 border border-gray-300 rounded-md" value="${d}">
                </div>
                <div>
                    <label for="establishmentName" class="block text-sm font-medium text-gray-700">Nome do Salão ou Barbearia</label>
                    <input type="text" id="establishmentName" class="mt-1 w-full p-2 border border-gray-300 rounded-md" value="${a}">
                </div>
                <div>
                    <label for="establishmentPhone" class="block text-sm font-medium text-gray-700">Telefone Principal</label>
                    <input type="tel" id="establishmentPhone" class="mt-1 w-full p-2 border border-gray-300 rounded-md" value="${o}">
                </div>
                <div>
                    <label for="establishmentCnpjCpf" class="block text-sm font-medium text-gray-700">CNPJ / CPF</label>
                    <input type="text" id="establishmentCnpjCpf" value="${r}" class="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm">
                </div>
                <div>
                    <label for="establishmentEmail" class="block text-sm font-medium text-gray-700">E-mail de Contato</label>
                    <input type="email" id="establishmentEmail" value="${s}" class="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm">
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
    `,t.querySelector("#personal-data-form").addEventListener("submit",l=>{l.preventDefault();const c={ownerName:t.querySelector("#ownerName").value,name:t.querySelector("#establishmentName").value,phone:t.querySelector("#establishmentPhone").value,document:t.querySelector("#establishmentCnpjCpf").value,email:t.querySelector("#establishmentEmail").value,address:t.querySelector("#establishmentAddress").value,website:t.querySelector("#establishmentWebsite").value};Je(c,l)})}function Sl(e,t){t.innerHTML=`
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
    `,t.querySelector("#change-password-form").addEventListener("submit",async a=>{a.preventDefault();const o=t.querySelector("#newPassword").value,r=t.querySelector("#confirmPassword").value;if(o!==r){g("Erro","As senhas não coincidem.","error");return}const s=t.querySelector('button[form="change-password-form"]');s.disabled=!0,s.textContent="A Salvar...";try{const n=U.currentUser;if(n)await Us(n,o),g("Sucesso","Senha alterada com sucesso!","success"),a.target.reset();else throw new Error("Nenhum usuário autenticado encontrado.")}catch(n){g("Erro",`Não foi possível alterar a senha: ${n.message}`,"error")}finally{s.disabled=!1,s.textContent="Salvar Nova Senha"}})}function $l(e,t){t.innerHTML=`
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
    `,t.querySelector("#change-email-form").addEventListener("submit",async a=>{a.preventDefault();const o=t.querySelector("#newEmail").value,r=t.querySelector("#currentPassword").value;if(!o||!r){g("Erro","Preencha todos os campos.","error");return}const s=t.querySelector('button[form="change-email-form"]');s.disabled=!0,s.textContent="A verificar...";try{const n=U.currentUser;if(!n)throw new Error("Usuário não autenticado.");const i=Os.credential(n.email,r);await zs(n,i),s.textContent="A enviar link...",await Vs(n,o),s.textContent="A atualizar BD...",await br(u.establishmentId,o),g("Sucesso","Link de verificação enviado! Por favor, verifique seu **novo e-mail** para confirmar a alteração.","success"),a.target.reset()}catch(n){let i="Não foi possível alterar o e-mail.";n.code==="auth/wrong-password"?i="A senha atual está incorreta.":n.code==="auth/email-already-in-use"?i="Este e-mail já está sendo usado por outra conta.":n.code==="auth/operation-not-allowed"?i="A troca de e-mail precisa ser habilitada no console do Firebase.":i=n.message,g("Erro",i,"error")}finally{s.disabled=!1,s.textContent="Salvar Novo E-mail"}})}function El(e,t){const a=f(e.welcomeMessage||"");t.innerHTML=`
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
    `,t.querySelector("#establishmentLogoBase64").value=e.logo||"",t.querySelector("#establishmentBackgroundImageBase64").value=e.backgroundImage||"",Ms(e.themeColor||"indigo",t),t.querySelector("#establishmentLogoButton").onclick=()=>t.querySelector("#establishmentLogoInput").click(),t.querySelector("#establishmentLogoInput").onchange=async o=>{const r=o.target.files[0];if(r)try{const s=await ko(r,300,.9);t.querySelector("#establishmentLogoPreview").src=s,t.querySelector("#establishmentLogoBase64").value=s}catch{g("Erro","Formato de imagem inválido ou corrompido.","error")}},t.querySelector("#establishmentBgButton").onclick=()=>t.querySelector("#establishmentBgInput").click(),t.querySelector("#establishmentBgInput").onchange=async o=>{const r=o.target.files[0];if(r){const s=t.querySelector("#establishmentBgButton"),n=s.textContent;try{s.textContent="A processar...",s.disabled=!0;const i=await ko(r,1280,.7);t.querySelector("#establishmentBgPreview").src=i,t.querySelector("#establishmentBgPreview").classList.remove("hidden"),t.querySelector("#establishmentBgPlaceholder").classList.add("hidden"),t.querySelector("#establishmentBackgroundImageBase64").value=i}catch{g("Erro","Não foi possível processar esta imagem. Tente outra.","error")}finally{s.textContent=n,s.disabled=!1}}},t.querySelector("#establishmentBgRemoveBtn").onclick=()=>{t.querySelector("#establishmentBgPreview").src="",t.querySelector("#establishmentBgPreview").classList.add("hidden"),t.querySelector("#establishmentBgPlaceholder").classList.remove("hidden"),t.querySelector("#establishmentBackgroundImageBase64").value=""},t.querySelector("#branding-form").addEventListener("submit",o=>{o.preventDefault();const r={logo:t.querySelector("#establishmentLogoBase64").value,welcomeMessage:t.querySelector("#establishmentWelcomeMessage").value,backgroundImage:t.querySelector("#establishmentBackgroundImageBase64").value,primaryColor:t.querySelector("#establishmentPrimaryColorInput").value,textColor:t.querySelector("#establishmentTextColorInput").value,themeColor:t.querySelector("#establishmentThemeColor").value};Je(r,o)})}function Il(e,t){const a=e.urlId||u.establishmentId,o="https://www.kairosagenda.com.br";let r=window.location.origin;(r.includes("localhost")||r.includes("capacitor://")||r.includes("127.0.0.1")||r.includes("192.168"))&&(r=o);const s=f(`${r}/agendar?id=${a}`),n=e.publicBookingEnabled||!1,i=n?"Agendamento Online ATIVO":"Agendamento Online INATIVO",d=n?"text-green-600":"text-red-600";t.innerHTML=`
        <div class="bg-white p-4 md:p-6 rounded-lg shadow-md space-y-8">
            <div>
                <div class="flex justify-between items-center mb-6 border-b pb-4">
                    <h3 class="text-xl font-bold text-gray-800">Link Público de Agendamento</h3>
                </div>
                <p class="text-sm text-gray-600 mb-4">Este é o link exclusivo que você pode partilhar com os seus clientes.</p>
                <div class="flex flex-col sm:flex-row gap-2">
                    <input type="text" id="publicBookingLink" value="${s}" readonly class="flex-1 p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-700">
                    <button type="button" id="copyBookingLinkBtn" class="py-3 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition">Copiar Link</button>
                </div>
            </div>

            <div>
                <h3 class="text-xl font-bold text-gray-800 mb-6 border-b pb-4">Status do Agendamento Online</h3>
                <div class="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <label for="publicBookingToggle" class="flex items-center cursor-pointer">
                        <div class="relative">
                            <input type="checkbox" id="publicBookingToggle" class="sr-only" ${n?"checked":""}>
                            <div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full"></div>
                        </div>
                    </label>
                    <span id="publicBookingStatusText" class="text-sm font-semibold ${d}">${i}</span>
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
                    <div id="slotIntervalContainer" class="flex flex-wrap gap-2"></div>
                </form>
            </div>
        </div>
    `,t.querySelector("#copyBookingLinkBtn").addEventListener("click",()=>{const l=t.querySelector("#publicBookingLink");navigator.clipboard&&window.isSecureContext?navigator.clipboard.writeText(l.value).then(()=>g("Sucesso","Link copiado!","success")):(l.select(),document.execCommand("copy"),l.blur(),g("Sucesso","Link copiado!","success"))}),t.querySelector("#publicBookingToggle").addEventListener("change",async l=>{const c=l.target.checked,m=t.querySelector("#publicBookingStatusText");m.textContent=c?"Agendamento Online ATIVO":"Agendamento Online INATIVO",m.className=c?"text-sm font-semibold text-green-600":"text-sm font-semibold text-red-600";try{l.target.disabled=!0,await gr(u.establishmentId,c),Q.publicBookingEnabled=c,g("Sucesso",`Agendamento online ${c?"ativado":"desativado"}!`,"success")}catch(p){g("Erro",`Não foi possível alterar o status: ${p.message}`,"error"),l.target.checked=!c}finally{l.target.disabled=!1}}),Ml(e.slotInterval||30,t),t.querySelector("#booking-form").addEventListener("submit",l=>{l.preventDefault();const c={slotInterval:parseInt(t.querySelector("#establishmentSlotInterval").value,10)};Je(c,l)})}function Cl(e,t){t.innerHTML=`
         <div class="bg-white p-4 md:p-6 rounded-lg shadow-md">
             <div class="flex justify-between items-center mb-6">
                 <h3 class="text-xl font-bold text-gray-800">Horário de Funcionamento</h3>
                 <button type="submit" form="working-hours-form" class="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600">Salvar Horários</button>
             </div>
             
             <form id="working-hours-form">
                 <div class="mb-8 bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <label for="establishmentTimezone" class="block text-sm font-bold text-gray-700 mb-2">Fuso Horário da Região</label>
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
    `;const a=t.querySelector("#establishmentTimezone");if(e.timezone)a.value=e.timezone;else try{const s=Intl.DateTimeFormat().resolvedOptions().timeZone,n=Array.from(a.options).some(i=>i.value===s);a.value=n?s:"America/Sao_Paulo"}catch{a.value="America/Sao_Paulo"}const o=t.querySelector("#establishmentWorkingHoursContainer"),r=e.workingHours||{};Object.keys(sa).forEach(s=>{const n=r[s]||{},i=sa[s],d=n.active!==!1,l=document.createElement("div");l.className=`day-schedule-card p-4 rounded-lg ${d?"bg-gray-50":"bg-gray-100 disabled"}`,l.innerHTML=`
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
            </div>`,o.appendChild(l)}),o.addEventListener("change",s=>{const n=s.target.closest('.day-schedule-card input[type="checkbox"]');n&&n.closest(".day-schedule-card").classList.toggle("disabled",!n.checked)}),t.querySelector("#working-hours-form").addEventListener("submit",s=>{s.preventDefault();const n={};Object.keys(sa).forEach(d=>{n[d]={active:t.querySelector(`#est-${d}-active`).checked,start:t.querySelector(`#est-${d}-start`).value,end:t.querySelector(`#est-${d}-end`).value,breakStart:t.querySelector(`#est-${d}-breakStart`).value,breakEnd:t.querySelector(`#est-${d}-breakEnd`).value}});const i=t.querySelector("#establishmentTimezone").value;Je({workingHours:n,timezone:i},s)})}async function Ll(e,t){const a=e.loyaltyProgram||{},o=a.pointsPerVisit||1;let r=[],s=[],n=[];try{[r,s,n]=await Promise.all([be(u.establishmentId),ut(u.establishmentId),Ba(u.establishmentId)])}catch(l){console.error("Erro ao carregar dados para fidelidade:",l)}t.innerHTML=`
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

                 <div id="loyalty-config-visit" class="p-4 bg-purple-50 rounded-lg border border-purple-100">
                     <label for="loyaltyPointsPerVisit" class="block text-sm font-medium text-purple-800">Regra de Pontuação</label>
                     <p class="text-xs text-purple-600 mb-2">Quantos pontos o cliente ganha a cada venda realizada?</p>
                     <div class="flex items-center gap-2">
                         <span class="text-gray-600 font-medium">Ganhar</span>
                         <input type="number" id="loyaltyPointsPerVisit" value="${o}" min="1" step="1" class="w-20 p-2 border border-purple-300 rounded-md focus:ring-purple-500 focus:border-purple-500 text-center font-bold">
                         <span class="text-gray-600 font-medium">pontos por visita/venda</span>
                     </div>
                 </div>

                 <hr class="border-gray-200">

                 <div>
                     <label class="block text-sm font-bold text-gray-700 mb-2">Prémios e Recompensas</label>
                     <p class="text-xs text-gray-500 mb-3">Defina os prêmios que o cliente pode resgatar com os pontos acumulados.</p>
                     
                     <div class="hidden md:grid grid-cols-[0.8fr_1fr_1.5fr_1fr_auto] items-center gap-2 mb-1 text-xs font-bold text-gray-500 px-2">
                         <span>Custo (Pts)</span>
                         <span>Tipo do Prêmio</span>
                         <span>Item / Descrição</span>
                         <span>Valor Desconto (R$)</span>
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
    `,t.querySelector("#loyaltyEnabled").checked=a.enabled||!1;const i=t.querySelector("#loyaltyTiersContainer"),d=(l={})=>{const c=document.createElement("div");c.className="loyalty-tier-row group bg-white md:bg-transparent p-3 md:p-0 border md:border-0 rounded-lg shadow-sm md:shadow-none relative md:grid md:grid-cols-[0.8fr_1fr_1.5fr_1fr_auto] md:gap-2 md:items-start";const m=l.type||"money",p=l.itemId||"",b=l.reward||"",v=l.discount||"",h=l.points||l.costPoints||"";c.innerHTML=`
            <div class="mb-2 md:mb-0">
                <label class="md:hidden text-xs font-bold text-gray-500 mb-1 block">Custo (Pontos)</label>
                <div class="relative">
                    <input type="number" placeholder="Ex: 100" data-field="points" value="${h}" class="w-full p-2 pl-2 border rounded-md font-semibold text-gray-800">
                    <span class="md:hidden absolute right-3 top-2 text-xs text-gray-400">pts</span>
                </div>
            </div>

            <div class="mb-2 md:mb-0">
                <label class="md:hidden text-xs font-bold text-gray-500 mb-1 block">Tipo</label>
                <select data-field="type" class="type-select w-full p-2 border rounded-md bg-white text-sm">
                    <option value="money" ${m==="money"?"selected":""}>Desconto Livre (R$)</option>
                    <option value="service" ${m==="service"?"selected":""}>Serviço Específico</option>
                    <option value="product" ${m==="product"?"selected":""}>Produto Específico</option>
                    <option value="package" ${m==="package"?"selected":""}>Pacote</option>
                </select>
            </div>

            <div class="mb-2 md:mb-0 relative">
                <label class="md:hidden text-xs font-bold text-gray-500 mb-1 block">Item / Descrição</label>
                
                <input type="text" placeholder="Ex: Vale Compras R$ 20" data-field="rewardName" value="${f(b)}" class="desc-input w-full p-2 border rounded-md ${m!=="money"?"hidden":""}">
                
                <select data-field="itemId" class="item-select w-full p-2 border rounded-md bg-white text-sm ${m==="money"?"hidden":""}">
                    <option value="">Selecione o item...</option>
                </select>
            </div>

            <div class="mb-2 md:mb-0">
                <label class="md:hidden text-xs font-bold text-gray-500 mb-1 block">Valor Desconto (R$)</label>
                <div class="flex items-center relative">
                    <span class="absolute left-3 text-gray-500">R$</span>
                    <input type="number" placeholder="0.00" data-field="discount" value="${v}" step="0.01" class="discount-input w-full p-2 pl-8 border rounded-md">
                </div>
                <p class="text-[10px] text-gray-500 mt-1 hidden md:block">Deixe 0 para 100% (se item)</p>
            </div>

            <button type="button" class="remove-loyalty-tier absolute top-2 right-2 md:static text-gray-400 hover:text-red-600 p-2 rounded-md hover:bg-red-50 transition-colors" title="Remover">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            </button>
        `;const y=c.querySelector(".type-select"),w=c.querySelector(".item-select"),$=c.querySelector(".desc-input"),k=c.querySelector(".discount-input"),C=T=>{w.innerHTML='<option value="">Selecione...</option>';let A=[];T==="service"?A=r:T==="product"?A=s:T==="package"&&(A=n),A.forEach(q=>{const D=q.id===p,M=q.name||q.title||"Sem nome",R=q.price||q.salePrice||0;w.innerHTML+=`<option value="${q.id}" data-price="${R}" ${D?"selected":""}>${f(M)}</option>`})};return m!=="money"&&C(m),y.addEventListener("change",T=>{const A=T.target.value;A==="money"?(w.classList.add("hidden"),$.classList.remove("hidden"),$.value="",k.value=""):(w.classList.remove("hidden"),$.classList.add("hidden"),C(A),k.value="")}),w.addEventListener("change",T=>{const A=T.target.selectedOptions[0];if(A&&A.value){$.value=A.text;const q=A.dataset.price;q&&(k.value=parseFloat(q).toFixed(2))}}),c};(a.tiers||[]).forEach(l=>{i.appendChild(d(l))}),t.querySelector("#add-loyalty-tier").addEventListener("click",()=>{i.appendChild(d())}),i.addEventListener("click",l=>{const c=l.target.closest(".remove-loyalty-tier");c&&c.closest(".loyalty-tier-row").remove()}),t.querySelector("#loyalty-form").addEventListener("submit",l=>{l.preventDefault();const c=Array.from(t.querySelectorAll("#loyaltyTiersContainer .loyalty-tier-row")).map(p=>{const b=p.querySelector(".type-select").value,v=b==="money"?null:p.querySelector(".item-select").value;let h="";if(b==="money")h=p.querySelector(".desc-input").value;else{const y=p.querySelector(".item-select");h=y.options[y.selectedIndex]?.text||""}return{points:parseInt(p.querySelector('input[data-field="points"]').value,10)||0,costPoints:parseInt(p.querySelector('input[data-field="points"]').value,10)||0,type:b,itemId:v,reward:h,name:h,discount:parseFloat(p.querySelector('input[data-field="discount"]').value)||0}}),m={loyaltyProgram:{enabled:t.querySelector("#loyaltyEnabled").checked,type:"visit",pointsPerVisit:parseInt(t.querySelector("#loyaltyPointsPerVisit").value,10)||1,pointsPerCurrency:0,tiers:c.filter(p=>p.points>0&&p.reward)}};Je(m,l)})}async function Tl(e,t){t.innerHTML=`
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
    `;try{const[a,o]=await Promise.all([Yt(u.establishmentId),Ma(u.establishmentId)]),r=e.financialIntegration||{},s=e.commissionConfig||{},n=e.purchaseConfig||{};t.querySelector("#financialNatureId").innerHTML=Le(a,r.defaultNaturezaId),t.querySelector("#financialCostCenterId").innerHTML=Le(o,r.defaultCentroDeCustoId),t.querySelector("#purchaseNatureId").innerHTML=Le(a,n.defaultNatureId),t.querySelector("#purchaseCostCenterId").innerHTML=Le(o,n.defaultCostCenterId),t.querySelector("#commissionNatureId").innerHTML=Le(a,s.defaultNatureId),t.querySelector("#commissionCostCenterId").innerHTML=Le(o,s.defaultCostCenterId)}catch{g("Erro","Não foi possível carregar os dados para a integração financeira.","error")}t.querySelector("#financial-form").addEventListener("submit",a=>{a.preventDefault();const o={financialIntegration:{defaultNaturezaId:t.querySelector("#financialNatureId").value||null,defaultCentroDeCustoId:t.querySelector("#financialCostCenterId").value||null},purchaseConfig:{defaultNatureId:t.querySelector("#purchaseNatureId").value||null,defaultCostCenterId:t.querySelector("#purchaseCostCenterId").value||null},commissionConfig:{defaultNatureId:t.querySelector("#commissionNatureId").value||null,defaultCostCenterId:t.querySelector("#commissionCostCenterId").value||null}};Je(o,a)})}function Dl(e,t){const a="5516997859430",o=encodeURIComponent("Olá, preciso de ajuda com o sistema Kairos."),r=`https://wa.me/${a}?text=${o}`;t.innerHTML=`
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
                <a href="${r}" target="_blank" rel="noopener noreferrer" 
                   class="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full transition-all shadow-lg">
                    <span>Iniciar Atendimento</span>
                </a>
            </div>
        </div>
    `}function Pl(e,t){const a="5516997859430",o=encodeURIComponent("Olá, gostaria de solicitar o cancelamento da minha assinatura."),r=`https://wa.me/${a}?text=${o}`,s="sistemakairosagenda@gmail.com";t.innerHTML=`
        <div class="bg-white p-4 md:p-6 rounded-lg shadow-md">
            <div class="flex flex-col md:flex-row items-center justify-between mb-6 border-b pb-4">
                <div>
                    <h3 class="text-xl font-bold text-red-600">Cancelamento de Assinatura</h3>
                    <p class="text-sm text-gray-600 mt-1">Lamentamos ver você partir. Veja abaixo como proceder.</p>
                </div>
            </div>

            <div class="space-y-6">
                <p class="text-gray-700">Para solicitar o cancelamento da sua assinatura, por favor, entre em contato conosco através de um dos canais abaixo. Nossa equipe financeira irá processar sua solicitação o mais breve possível.</p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="border rounded-lg p-6 bg-gray-50 flex flex-col items-center text-center">
                        <h4 class="font-bold text-gray-800 mb-2">Via E-mail</h4>
                        <a href="mailto:${s}" class="text-indigo-600 font-semibold hover:underline">${s}</a>
                    </div>
                    <div class="border rounded-lg p-6 bg-green-50 border-green-100 flex flex-col items-center text-center">
                        <h4 class="font-bold text-gray-800 mb-2">Via WhatsApp</h4>
                        <a href="${r}" target="_blank" rel="noopener noreferrer" class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full transition-colors text-sm">Solicitar Cancelamento</a>
                    </div>
                </div>
            </div>
        </div>
    `}function Bl(e,t){t.innerHTML=`<div class="bg-white p-4 md:p-6 rounded-lg shadow-md"><h3 class="text-xl font-bold text-gray-800">${e}</h3><p class="mt-4 text-gray-500">Esta secção ainda não foi implementada.</p></div>`}function Ms(e="indigo",t){const a=t.querySelector("#color-palette-container"),o=t.querySelector("#establishmentThemeColor");!a||!o||(a.innerHTML="",Object.entries(hl).forEach(([r,s])=>{const n=r===e,i=document.createElement("div");i.className="w-24 text-center cursor-pointer mb-4",i.innerHTML=`
            <div class="w-16 h-16 mx-auto rounded-full border-4 ${n?"border-gray-800 scale-110 shadow-lg":"border-transparent"} p-1 transition-all">
                <div class="w-full h-full rounded-full" style="background-color: ${s.main};"></div>
            </div>
            <p class="text-xs mt-2 font-medium ${n?"text-gray-900 font-bold":"text-gray-500"}">${s.name}</p>
        `,i.addEventListener("click",()=>{o.value=r,Ms(r,t)}),a.appendChild(i)}),o.value=e)}function Ml(e,t){const a=t.querySelector("#slotIntervalContainer"),o=t.querySelector("#establishmentSlotInterval");if(!a||!o)return;const r=[{label:"10 min",value:10},{label:"15 min",value:15},{label:"20 min",value:20},{label:"30 min",value:30},{label:"45 min",value:45},{label:"1 hora",value:60}];a.innerHTML=r.map(s=>{const n=s.value===e;return`<button type="button" data-value="${s.value}" 
                       class="interval-btn py-2 px-4 rounded-full text-sm font-semibold transition-colors 
                           ${n?"bg-indigo-600 text-white":"bg-gray-200 text-gray-700 hover:bg-gray-300"}">
                       ${s.label}
                   </button>`}).join(""),o.value=e,a.querySelectorAll(".interval-btn").forEach(s=>{s.addEventListener("click",()=>{o.value=s.dataset.value,a.querySelectorAll(".interval-btn").forEach(n=>{n.classList.remove("bg-indigo-600","text-white"),n.classList.add("bg-gray-200","text-gray-700")}),s.classList.add("bg-indigo-600","text-white"),s.classList.remove("bg-gray-200","text-gray-700")})})}async function Al(e){const a=Bs().find(r=>r.id===e);if(!a){console.error("Secção de definições não encontrada:",e);return}xe.innerHTML=`
        <div class="bg-white p-4 shadow-sm sticky top-0 z-10 md:relative flex justify-between items-center">
            <button data-action="back-to-list" class="flex items-center gap-2 font-bold text-gray-600 hover:text-gray-900 bg-gray-100 px-3 py-1.5 rounded-lg text-sm transition">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"></path></svg>
                Voltar
            </button>
            <span class="text-sm font-bold text-gray-800">${a.label}</span>
        </div>
        
        <div id="settings-content-detail" class="p-2 md:p-4 pb-20">
            <div class="flex justify-center items-center py-10"><div class="loader"></div></div>
        </div>
    `,xe.querySelector('button[data-action="back-to-list"]').addEventListener("click",r=>{r.preventDefault(),As()});const o=document.getElementById("settings-content-detail");switch(e){case"manage-network":await Oa(o);break;case"personal-data":kl(Q,o);break;case"change-password":Sl(Q,o);break;case"change-email":$l(Q,o);break;case"branding":El(Q,o);break;case"booking":Il(Q,o);break;case"working-hours":Cl(Q,o);break;case"loyalty":await Ll(Q,o);break;case"financial":await Tl(Q,o);break;case"support":Dl(Q,o);break;case"cancellation":Pl(Q,o);break;default:Bl(a.label,o)}}async function As(){xe.innerHTML=`
        <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-4">
            <h2 class="text-xl font-bold text-gray-800 flex items-center gap-2">
                <svg class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.096 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                Definições do Sistema
            </h2>
        </div>
        <div class="flex justify-center items-center h-64"><div class="loader"></div></div>
    `;try{let n=u.currentViewContext?.id||u.establishmentId;u.currentViewContext?.type==="GROUP"&&(n=u.accessibleEstablishments[0]?.id||u.establishmentId),Q=await Ee(n)}catch{g("Erro Fatal","Não foi possível carregar as definições.","error"),xe.innerHTML='<p class="text-red-500 text-center py-10">Erro ao carregar dados.</p>';return}const e=U.currentUser;e&&e.displayName&&(u.userName=e.displayName);const t=f(u.userName||U.currentUser.email);let o=`https://placehold.co/96x96/E2E8F0/4A5568?text=${t?t.charAt(0).toUpperCase():"U"}`;e&&e.photoURL&&(o=e.photoURL);const r=Bs();xe.innerHTML=`
        <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-4">
            <h2 class="text-xl font-bold text-gray-800 flex items-center gap-2">
                <svg class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.096 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                Definições
            </h2>
        </div>
        
        <div data-action="go-to-my-profile" class="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-4 cursor-pointer hover:bg-gray-50 transition-all">
            <div class="text-center relative">
                 <div class="relative w-20 h-20 mx-auto">
                    <img id="user-avatar" src="${o}" class="w-20 h-20 rounded-full object-cover border-4 border-gray-100">
                 </div>
                 <h3 class="font-bold mt-2 text-base text-gray-800 truncate">${t}</h3>
                 <p class="text-xs text-indigo-600 font-bold mt-1">MEU PERFIL (VER BLOQUEIOS)</p>
            </div>
        </div>

        <div class="bg-white p-2 rounded-xl shadow-sm border border-gray-100 mb-20">
            <nav id="settings-menu-list" class="space-y-1">
                ${r.map(n=>`
                    <button data-section="${n.id}" class="w-full flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-gray-50 font-semibold text-sm transition-colors ${n.id==="manage-network"?"bg-indigo-50 border border-indigo-100 text-indigo-800 hover:bg-indigo-100 mb-3":""}">
                        <svg class="w-5 h-5 ${n.id==="manage-network"?"text-indigo-600":"text-gray-400"}" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${n.icon}"></path></svg>
                        <span class="flex-1 text-left">${n.label}</span>
                        <svg class="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"></path></svg>
                    </button>
                `).join("")}
            </nav>
        </div>
    `,xe.querySelector("#settings-menu-list").addEventListener("click",n=>{const i=n.target.closest("button[data-section]");i&&(n.preventDefault(),Al(i.dataset.section))});const s=xe.querySelector('[data-action="go-to-my-profile"]');s&&s.addEventListener("click",n=>{n.preventDefault(),K("my-profile-section")})}const st=document.getElementById("content");async function He(e){const t=document.getElementById("blockagesList");if(t){t.innerHTML='<div class="loader mx-auto"></div>';try{const a=document.getElementById("filterStartDate")?.value,o=document.getElementById("filterEndDate")?.value,r=await Ut(u.establishmentId,a||new Date().toISOString().split("T")[0],o||new Date().toISOString().split("T")[0],e),s=document.getElementById("filterReason")?.value.toLowerCase(),n=s?r.filter(d=>d.reason&&d.reason.toLowerCase().includes(s)):r,i=n.reduce((d,l)=>{const c=l.reason||"Sem motivo";return d[c]||(d[c]=[]),d[c].push(l),d},{});if(t.innerHTML="",n.length===0){t.innerHTML='<p class="text-center text-gray-500">Nenhum bloqueio encontrado.</p>';return}Object.entries(i).forEach(([d,l])=>{const c=document.createElement("div");c.className="bg-gray-100 rounded-lg p-3 my-2 space-y-2";let p=`<div class="flex justify-between items-center pb-2 border-b border-gray-200">
                                <h4 class="font-bold text-gray-700">${f(d)} (${l.length})</h4>`;if(l.length>1){const b=JSON.stringify(l.map(v=>v.id));p+=`<button data-action="batch-delete-blockage" data-ids='${b}' class="text-xs text-red-600 hover:text-red-800 font-semibold flex items-center gap-1">
                                    Apagar Lote
                                </button>`}p+="</div>",c.innerHTML=p,l.forEach(b=>{const v=new Date(b.startTime),h=new Date(b.endTime),y=v.toLocaleDateString("pt-BR"),w=h.toLocaleDateString("pt-BR"),k=`
                    <div class="bg-white p-3 rounded-md flex items-center justify-between shadow-sm">
                        <div>
                            <p class="font-medium text-gray-800 text-sm">
                                ${y===w?`${y} | ${v.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})} - ${h.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}`:`De ${y} às ${v.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}<br>Até ${w} às ${h.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}`}
                            </p>
                        </div>
                        <button class="p-1 rounded-full text-gray-500 hover:bg-gray-100 hover:text-red-600" data-action="delete-blockage" data-id="${b.id}">Apagar</button>
                    </div>`;c.innerHTML+=k}),t.appendChild(c)})}catch(a){t.innerHTML=`<p class="text-center text-red-500">Erro: ${a.message}</p>`}}}async function ql(e){e.preventDefault();const t=e.target,a=t.querySelector("#blockageProfId").value,o=t.querySelector("#blockageDate").value,r=t.querySelector("#blockageEndDate").value||o,s=t.querySelector("#blockageStartTime").value,n=t.querySelector("#blockageEndTime").value,i={establishmentId:u.establishmentId,professionalId:a,startTime:new Date(`${o}T${s}:00`).toISOString(),endTime:new Date(`${r}T${n}:00`).toISOString(),reason:t.querySelector("#blockageReason").value};try{await _t(i),t.reset(),g("Sucesso","Bloqueio adicionado com sucesso!","success"),He(a)}catch(d){g("Erro",`Não foi possível criar o bloqueio: ${d.message}`,"error")}}async function Nl(e){e.preventDefault();const t=e.target,a=Array.from(t.querySelectorAll('input[name="batch-professionals"]:checked')).map(c=>c.value);if(a.length===0)return g("Atenção","Selecione pelo menos um profissional.","error");const o=t.querySelector("#batchBlockageDate").value,r=t.querySelector("#batchBlockageEndDate").value||o,s=t.querySelector("#batchBlockageStartTime").value,n=t.querySelector("#batchBlockageEndTime").value,i=t.querySelector("#batchBlockageReason").value,d=t.querySelector('button[type="submit"]');d.disabled=!0,d.textContent="Aguarde...";const l=a.map(c=>{const m={establishmentId:u.establishmentId,professionalId:c,startTime:new Date(`${o}T${s}:00`).toISOString(),endTime:new Date(`${r}T${n}:00`).toISOString(),reason:i};return _t(m)});try{await Promise.all(l),g("Sucesso",`${a.length} bloqueios foram criados com sucesso!`,"success"),t.reset(),t.querySelectorAll('input[name="batch-professionals"]:checked').forEach(m=>m.checked=!1);const c=document.getElementById("blockageProfId").value;c&&He(c)}catch(c){g("Erro",`Ocorreu um erro: ${c.message}`,"error")}finally{d.disabled=!1,d.textContent="Adicionar Bloqueio em Lote"}}function Rl(e){st.addEventListener("submit",t=>{t.target.id==="blockageForm"&&ql(t),t.target.id==="batchBlockageForm"&&Nl(t)}),st.addEventListener("input",t=>{t.target.matches("#filterStartDate, #filterEndDate, #filterReason")&&He(e)}),st.addEventListener("click",async t=>{const a=t.target.closest("button[data-action]");if(!a)return;const o=a.dataset.action;if(o==="back-to-professionals")K("profissionais-section");else if(o==="delete-blockage"){if(await H("Apagar Bloqueio","Tem a certeza que deseja apagar este bloqueio?"))try{await La(a.dataset.id),g("Sucesso","Bloqueio removido.","success"),He(e)}catch(s){g("Erro",`Não foi possível remover o bloqueio: ${s.message}`,"error")}}else if(o==="batch-delete-blockage"){const r=JSON.parse(a.dataset.ids);if(await H("Apagar Lote de Bloqueios",`Tem certeza que deseja apagar ${r.length} bloqueios de uma vez?`))try{await Ko(r),g("Sucesso",`${r.length} bloqueios removidos.`,"success"),He(e)}catch(n){g("Erro",`Não foi possível apagar os bloqueios: ${n.message}`,"error")}}})}async function jl(e){const{professionalId:t,professionalName:a}=e;if(!t||!a){st.innerHTML='<p class="text-red-500 p-8">Erro: ID do profissional não fornecido.</p>';return}const o=f(a);st.innerHTML=`
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
                        <h3 class="text-xl font-semibold mb-4 border-b pb-2">Bloqueio para <span class="text-indigo-600">${o}</span></h3>
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
                        <h3 class="text-xl font-semibold mb-4 border-b pb-2">Bloqueios de ${o}</h3>
                        <div id="blockage-filters" class="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                            <div><label for="filterStartDate" class="block text-sm font-medium text-gray-700">De</label><input type="date" id="filterStartDate" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></div>
                            <div><label for="filterEndDate" class="block text-sm font-medium text-gray-700">Até</label><input type="date" id="filterEndDate" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></div>
                            <div><label for="filterReason" class="block text-sm font-medium text-gray-700">Motivo</label><input type="text" id="filterReason" placeholder="Pesquisar motivo..." class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></div>
                        </div>
                        <div id="blockagesList" class="space-y-4 max-h-[60vh] overflow-y-auto pr-2"></div>
                    </div>
                </div>
            </div>
        </section>`,Rl(t),await He(t);const r=document.getElementById("batchProfSelectionContainer");try{const s=await ee(u.establishmentId);r.innerHTML=s.map(n=>`
            <div class="flex items-center">
                <input id="prof-batch-${n.id}" value="${n.id}" name="batch-professionals" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                <label for="prof-batch-${n.id}" class="ml-2 text-sm text-gray-700">${f(n.name)}</label>
            </div>`).join("")}catch{r.innerHTML='<p class="text-red-500">Erro ao carregar profissionais.</p>'}}const Fl=e=>E(`/api/users/${e}`),Hl=e=>E("/api/users",{method:"POST",body:JSON.stringify(e)}),Ol=(e,t)=>E(`/api/users/${e}`,{method:"PUT",body:JSON.stringify(t)}),zl=e=>E(`/api/users/${e}`,{method:"DELETE"}),Vl=(e,t)=>E(`/api/users/${e}/password`,{method:"PUT",body:JSON.stringify({password:t})}),Ul=(e,t)=>E(`/api/users/${e}/status`,{method:"PATCH",body:JSON.stringify({status:t})}),Xe=document.getElementById("content"),_l={"agenda-section":"Agenda","comandas-section":"Comandas","relatorios-section":"Relatórios Gerais","sales-report-section":"Relatório de Vendas (Caixa)","financial-section":"Financeiro","servicos-section":"Serviços","produtos-section":"Produtos","suppliers-section":"Fornecedores","profissionais-section":"Profissionais","ausencias-section":"Ausências e Bloqueios","clientes-section":"Clientes","packages-section":"Pacotes","commissions-section":"Comissões","estabelecimento-section":"Configurações do Estabelecimento","users-section":"Usuários e Acessos"},Wl={view:"Visualizar",create:"Criar",edit:"Editar"};let xt=null,yt=null,Oe=null;const Jl={group_admin:"Administrador do Grupo",company_admin:"Gestor de Matriz",branch_manager:"Gestor de Filial",professional:"Profissional Padrão"};function Gl(e){const t=document.getElementById("usersListContainer");if(!t)return;const a=document.getElementById("showInactiveUsersToggle")?.checked;if(e.length===0){const o=a?"Nenhum usuário encontrado.":"Nenhum usuário ativo cadastrado.";t.innerHTML=`<p class="col-span-full text-center text-gray-500">${o}</p>`;return}e.sort((o,r)=>(o.status==="active"?-1:1)-(r.status==="active"?-1:1)),t.innerHTML=e.map(o=>{const r=JSON.stringify(o).replace(/'/g,"&apos;"),s=o.status==="active",n=u.professionals.find(p=>p.id===o.professionalId),i=n?n.name:"N/A",d=n?n.name.charAt(0):o.name.charAt(0),l=n?.photo||`https://placehold.co/64x64/E2E8F0/4A5568?text=${encodeURIComponent(d)}`,c=Jl[o.role]||"Profissional",m=o.role==="group_admin"?"bg-purple-100 text-purple-800":o.role==="company_admin"?"bg-blue-100 text-blue-800":o.role==="branch_manager"?"bg-orange-100 text-orange-800":"bg-gray-100 text-gray-800";return`
        <div class="user-card-clickable bg-white rounded-lg shadow-sm border overflow-hidden flex cursor-pointer ${s?"":"opacity-60"} hover:shadow-md transition" 
             data-action="edit-user" 
             data-user='${r}'>
            
            <img src="${l}" alt="Foto de Perfil" class="w-16 h-16 object-cover flex-shrink-0 pointer-events-none border-r">
            
            <div class="p-3 flex-grow flex flex-col justify-between min-w-0">
                <div class="pointer-events-none min-w-0">
                    <div class="flex justify-between items-start gap-2">
                        <p class="font-bold text-gray-800 text-sm truncate">${o.name}</p>
                        <span class="text-[9px] font-bold px-1.5 py-0.5 rounded-full whitespace-nowrap ${m}">${c}</span>
                    </div>
                    <p class="text-xs text-gray-500 truncate">${o.email}</p>
                    <p class="text-[10px] text-gray-400 mt-1 truncate">Prof: <span class="font-semibold text-gray-600">${i}</span></p>
                </div>
                
                <div class="mt-2 flex items-center justify-between gap-2">
                    <label class="flex items-center cursor-pointer" title="${s?"Ativo":"Inativo"}">
                        <div class="relative">
                            <input type="checkbox" data-action="toggle-user-status" data-user-id="${o.id}" class="sr-only" ${s?"checked":""}>
                            <div class="toggle-bg block bg-gray-300 w-8 h-4 rounded-full"></div>
                        </div>
                    </label>
                    
                    <button data-action="delete-user" data-user-id="${o.id}" class="text-gray-400 hover:text-red-600 p-1.5 rounded-md hover:bg-red-50 transition-colors action-btn-delete" title="Excluir Usuário">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                </div>
            </div>
        </div>
    `}).join("")}function ya(){const t=document.getElementById("showInactiveUsersToggle")?.checked?u.users:u.users.filter(a=>a.status==="active");Gl(t)}function Yl(e={}){return Object.entries(_l).map(([t,a])=>{const o=t==="agenda-section"||t==="comandas-section",r=e[t]?.view_all_prof===!0,s=Object.entries(Wl).map(([i,d])=>`
             <label class="flex flex-col items-center space-y-1 cursor-pointer">
                <div class="relative">
                    <input type="checkbox" data-module="${t}" data-permission="${i}" class="sr-only" ${e[t]?.[i]?"checked":""}>
                    <div class="toggle-bg block bg-gray-300 w-8 h-4 rounded-full"></div>
                </div>
                <span class="text-[10px] text-gray-600 font-medium">${d}</span>
            </label>
        `).join(""),n=o?`
            <div class="col-span-full pt-2 mt-2 border-t border-gray-100">
                <label class="flex items-center space-x-2 cursor-pointer">
                    <div class="relative">
                        <input type="checkbox" data-module="${t}" data-permission="view_all_prof" class="sr-only" ${r?"checked":""}>
                        <div class="toggle-bg block bg-gray-300 w-8 h-4 rounded-full"></div>
                    </div>
                    <span class="text-xs font-bold text-indigo-600">Ver dados de toda a Equipe</span>
                </label>
            </div>
        `:"";return`
        <div class="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
            <h4 class="font-bold text-xs text-gray-800 border-b pb-1.5 mb-2">${a}</h4>
            <div class="grid grid-cols-3 gap-1">
                ${s}
            </div>
            ${n}
        </div>
    `}).join("")}function So(e){if(!Oe||u.userRole==="professional")return"";const t=e?.accessibleEstablishments?.map(s=>s.id)||[],a=e?.accessibleCompanies?.map(s=>s.id)||[];if((e?.role||"professional")==="group_admin")return'<div class="p-3 bg-purple-50 border border-purple-200 rounded-lg text-purple-800 text-sm font-bold">Acesso Total (Global) liberado.</div>';let r='<div class="space-y-3 max-h-48 overflow-y-auto custom-scrollbar p-2 bg-gray-50 rounded border">';return Oe.companies.forEach(s=>{const n=a.includes(s.id),i=Oe.branches.filter(d=>d.companyId===s.id);r+=`
            <div class="company-block">
                <label class="flex items-center space-x-2 cursor-pointer mb-1">
                    <input type="checkbox" class="company-checkbox rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4" value="${s.id}" data-name="${s.name}" ${n?"checked":""}>
                    <span class="text-sm font-bold text-gray-800">🏢 ${s.name}</span>
                </label>
                <div class="pl-6 space-y-1 border-l-2 border-gray-200 ml-2">
                    ${i.map(d=>{const l=t.includes(d.id)||n;return`
                            <label class="flex items-center space-x-2 cursor-pointer">
                                <input type="checkbox" class="branch-checkbox rounded text-indigo-500 h-3 w-3" value="${d.id}" data-name="${d.name}" data-company-id="${s.id}" ${l?"checked":""}>
                                <span class="text-xs text-gray-600">📍 ${d.name}</span>
                            </label>
                        `}).join("")}
                </div>
            </div>
        `}),r+="</div>",r}async function $o(e=null){document.getElementById("user-list-view").classList.add("hidden");const t=document.getElementById("user-form-view");t.classList.remove("hidden");let a=u.professionals;if(!a||a.length===0)try{a=await ee(u.currentViewContext.id),u.professionals=a}catch{console.warn("Profissionais não carregados")}if(["group_admin","company_admin"].includes(u.userRole)&&!Oe)try{const l=await fetch("/api/establishments/hierarchy",{headers:{Authorization:`Bearer ${await u.getAuthToken?.()||""}`}});l.ok&&(Oe=await l.json())}catch(l){console.error("Falha ao buscar hierarquia",l),Oe={companies:[],branches:[]}}const o=l=>a?.find(c=>c.id===l),r=e?.professionalId;o(r);const s=e!==null;t.querySelector("#userFormTitle").textContent=s?`Editar: ${e.name}`:"Novo Usuário";const n=t.querySelector("#userForm");n.innerHTML=`
        <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-200 space-y-4">
            
            <div class="bg-gray-50 p-4 rounded-lg border space-y-3">
                 <h3 class="font-bold text-sm text-gray-800 border-b pb-1">Dados de Acesso</h3>
                 <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div class="form-group">
                        <label class="text-xs font-bold text-gray-600">Nome Completo</label>
                        <input type="text" id="userName" required value="${e?.name||""}" class="w-full p-2 border rounded text-sm">
                    </div>
                    <div class="form-group">
                        <label class="text-xs font-bold text-gray-600">E-mail de Login</label>
                        <input type="email" id="userEmail" required value="${e?.email||""}" class="w-full p-2 border rounded text-sm">
                    </div>
                </div>
            </div>

            ${["group_admin","company_admin"].includes(u.userRole)?`
            <div class="bg-indigo-50 p-4 rounded-lg border border-indigo-100 space-y-3">
                 <h3 class="font-bold text-sm text-indigo-800 border-b border-indigo-200 pb-1">Nível de Acesso (Enterprise)</h3>
                 <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="text-xs font-bold text-indigo-700 block mb-1">Perfil do Usuário</label>
                        <select id="userRole" class="w-full p-2 border border-indigo-300 rounded text-sm bg-white font-semibold">
                            ${u.userRole==="group_admin"?`<option value="group_admin" ${e?.role==="group_admin"?"selected":""}>Administrador Global (Acesso a tudo)</option>`:""}
                            <option value="company_admin" ${e?.role==="company_admin"?"selected":""}>Gestor de Empresa/Matriz</option>
                            <option value="branch_manager" ${e?.role==="branch_manager"?"selected":""}>Gestor de Filial (Loja)</option>
                            <option value="professional" ${e?.role==="professional"?"selected":""}>Profissional Padrão (Barbeiro)</option>
                        </select>
                    </div>
                    <div>
                        <label class="text-xs font-bold text-indigo-700 block mb-1">Locais Permitidos</label>
                        <div id="hierarchySelectorContainer">
                            ${So(e)}
                        </div>
                    </div>
                 </div>
            </div>
            `:`<input type="hidden" id="userRole" value="${e?.role||"professional"}">`}

            <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-100 space-y-3">
                 <h3 class="font-bold text-sm text-yellow-800 border-b border-yellow-200 pb-1">Associação na Agenda</h3>
                <div class="form-group">
                    <label class="text-xs font-bold text-yellow-700">Vincular a qual Profissional?</label>
                    <select id="userProfessionalId" class="w-full p-2 border border-yellow-300 rounded text-sm bg-white">
                        <option value="">-- Não Associar --</option>
                        ${a?.map(l=>`<option value="${l.id}" ${l.id===r?"selected":""}>${l.name}</option>`).join("")}
                    </select>
                    <p class="text-[10px] text-yellow-600 mt-1">Garante que o profissional só veja os agendamentos dele.</p>
                </div>
            </div>
            
            ${s?`
            <div class="border-t pt-4 bg-gray-50 p-3 rounded mt-4">
                <button type="button" data-action="show-password-form" class="text-xs py-1.5 px-3 bg-gray-800 text-white font-bold rounded hover:bg-gray-900 transition">Alterar Senha do Usuário</button>
                <div id="password-form" class="hidden mt-3 max-w-xs space-y-2">
                    <input type="password" id="userNewPassword" placeholder="Nova Senha" class="w-full p-2 border rounded text-sm">
                    <div class="flex gap-2">
                         <button type="button" data-action="cancel-password-change" class="flex-1 py-1.5 bg-gray-300 text-gray-800 text-xs font-bold rounded">Cancelar</button>
                         <button type="button" data-action="save-password" class="flex-1 py-1.5 bg-red-600 text-white text-xs font-bold rounded">Salvar Senha</button>
                    </div>
                </div>
            </div>
            `:`
            <div class="bg-red-50 p-4 rounded-lg border border-red-100">
                 <h3 class="font-bold text-sm text-red-800 mb-2">Senha Inicial</h3>
                 <input type="password" id="userPassword" required placeholder="Mínimo 6 caracteres" class="w-full p-2 border border-red-200 rounded text-sm">
            </div>
            `}

            <div class="border-t pt-4 mt-4">
                <h3 class="text-sm font-bold mb-3 text-gray-800">Permissões de Módulos</h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    ${Yl(e?.permissions)}
                </div>
            </div>

            <div class="flex gap-3 pt-6 border-t">
                <button type="button" data-action="back-to-list" class="flex-1 py-2 bg-gray-200 text-gray-800 font-bold rounded hover:bg-gray-300">Cancelar</button>
                <button type="submit" class="flex-1 py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700">Salvar Usuário</button>
            </div>
        </div>
    `;const i=n.querySelector("#userRole"),d=n.querySelector("#hierarchySelectorContainer");if(i&&d){i.addEventListener("change",c=>{const m={...e,role:c.target.value};d.innerHTML=So(m),l()});const l=()=>{d.querySelectorAll(".company-checkbox").forEach(c=>{c.addEventListener("change",m=>{m.target.closest(".company-block").querySelectorAll(".branch-checkbox").forEach(v=>v.checked=m.target.checked)})})};l()}if(n.addEventListener("submit",async l=>{l.preventDefault();const c={};n.querySelectorAll("input[data-module]").forEach(y=>{const w=y.dataset.module,$=y.dataset.permission;c[w]||(c[w]={}),c[w][$]=y.checked});const m=n.querySelector("#userProfessionalId").value||null,p=n.querySelector("#userRole")?.value||"professional",b=[],v=[];if(p!=="group_admin"&&n.querySelector(".company-checkbox")&&(n.querySelectorAll(".company-checkbox:checked").forEach(y=>{b.push({id:y.value,name:y.dataset.name})}),n.querySelectorAll(".branch-checkbox:checked").forEach(y=>{v.push({id:y.value,name:y.dataset.name,companyId:y.dataset.companyId})}),v.length===0))return g("Atenção","Você deve selecionar pelo menos uma filial para este usuário.","error");const h={name:n.querySelector("#userName").value,permissions:c,professionalId:m,role:p,accessibleCompanies:b,accessibleEstablishments:v};try{if(s){const y=n.querySelector("#userEmail").value;e?.email!==y&&(h.email=y),await Ol(e.id,h),g("Usuário atualizado com sucesso!","success")}else h.email=n.querySelector("#userEmail").value,h.password=n.querySelector("#userPassword").value,await Hl(h),g("Usuário criado com sucesso!","success");Nt()}catch(y){g(`Erro: ${y.message}`,"error")}}),s){const l=n.querySelector('[data-action="show-password-form"]'),c=n.querySelector("#password-form");l&&c&&(l.addEventListener("click",()=>{l.classList.add("hidden"),c.classList.remove("hidden")}),c.querySelector('[data-action="cancel-password-change"]').addEventListener("click",()=>{l.classList.remove("hidden"),c.classList.add("hidden"),c.querySelector("#userNewPassword").value=""}),c.querySelector('[data-action="save-password"]').addEventListener("click",async m=>{const p=m.target,b=c.querySelector("#userNewPassword").value;if(!b||b.length<6)return g("Aviso","Senha deve ter no mínimo 6 caracteres.","error");if(await H("Alterar Senha","Tem certeza?"))try{p.disabled=!0,p.textContent="...",await Vl(e.id,b),g("Sucesso","Senha alterada.","success"),l.classList.remove("hidden"),c.classList.add("hidden")}catch(v){g("Erro",v.message,"error")}finally{p.disabled=!1,p.textContent="Salvar Senha"}}))}}async function Ql(){const e=document.getElementById("usersListContainer");e.innerHTML='<div class="loader col-span-full mx-auto"></div>';try{const[t,a]=await Promise.all([Fl(u.currentViewContext.id),ee(u.currentViewContext.id)]);u.users=t,u.professionals=a,ya()}catch{g("Erro ao carregar usuários.","error"),e.innerHTML='<p class="col-span-full text-center text-red-500">Falha ao carregar.</p>'}}async function Nt(){Xe.innerHTML=`
        <style>
            .toggle-bg::after { content: ''; position: absolute; top: 2px; left: 2px; width: 12px; height: 12px; background: white; border-radius: 50%; transition: transform 0.2s; }
            input:checked + .toggle-bg { background-color: #4f46e5; }
            input:checked + .toggle-bg::after { transform: translateX(16px); }
            .custom-scrollbar::-webkit-scrollbar { width: 4px; }
            .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 4px; }
        </style>
        <div id="user-list-view" class="relative min-h-full pb-24">
            <section>
                <div class="flex flex-wrap justify-between items-center mb-6 gap-3 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <h2 class="text-xl font-bold text-gray-800">Equipe e Acessos</h2>
                    <label class="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" id="showInactiveUsersToggle" class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                        <span class="text-xs font-bold text-gray-600 uppercase">Exibir Inativos</span>
                    </label>
                </div>
                <div id="usersListContainer" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"></div>
            </section>
            
            <button id="fab-new-user" data-action="new-user" title="Novo Usuário" class="fixed bottom-6 right-6 bg-indigo-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-xl hover:bg-indigo-700 transition z-50 transform hover:scale-105">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"></path></svg>
            </button>
        </div>

        <div id="user-form-view" class="hidden pb-20">
             <section>
                <div class="flex justify-between items-center mb-4 bg-white p-3 rounded-lg shadow-sm border">
                    <h2 id="userFormTitle" class="text-lg font-bold text-gray-800"></h2>
                    <button data-action="back-to-list" class="bg-gray-100 text-gray-600 hover:text-gray-900 font-bold py-1.5 px-3 rounded-md transition text-xs">Voltar</button>
                </div>
                <form id="userForm"></form>
            </section>
        </div>
    `,xt&&Xe.removeEventListener("click",xt),yt&&Xe.removeEventListener("change",yt),xt=async e=>{const t=e.target.closest("[data-action]");if(!t)return;switch(t.dataset.action){case"new-user":$o();break;case"edit-user":const o=JSON.parse(t.dataset.user.replace(/&apos;/g,"'"));$o(o);break;case"back-to-list":Nt();break;case"delete-user":{if(e.stopPropagation(),await H("Excluir Usuário","Tem certeza? Ação irreversível."))try{await zl(t.dataset.userId),g("Usuário excluído!","success"),Nt()}catch(r){g(`Erro: ${r.message}`,"error")}break}}},yt=async e=>{const t=e.target.closest('input[data-action="toggle-user-status"]');if(e.target.id==="showInactiveUsersToggle")ya();else if(t){e.stopPropagation();const a=t.dataset.userId,o=t.checked?"active":"inactive";try{await Ul(a,o);const r=u.users.findIndex(s=>s.id===a);r>-1&&(u.users[r].status=o,ya())}catch(r){g(`Erro: ${r.message}`,"error"),t.checked=!t.checked}}},Xe.addEventListener("click",xt),Xe.addEventListener("change",yt),await Ql()}const Xl=document.getElementById("content");let Eo={},wa=null;function Zl(){Object.values(Eo).forEach(e=>e?.destroy()),Eo={}}function Kl(e,t){if(!window.jspdf){g("Erro","Biblioteca PDF não carregada.","error");return}const{jsPDF:a}=window.jspdf,o=new a({orientation:"landscape",unit:"px",format:"a4"}),r=document.getElementById("salesReportSummaryCards");if(o.setFontSize(18),o.text(e,o.internal.pageSize.getWidth()/2,40,{align:"center"}),r){const n=[["Receita Total",r.querySelector("#summary-revenue").textContent],["Vendas Totais",r.querySelector("#summary-transactions").textContent],["Ticket Médio",r.querySelector("#summary-avg-ticket").textContent]];o.autoTable({startY:60,head:[["Métrica","Valor"]],body:n,theme:"striped",headStyles:{fillColor:[79,70,229]}})}const s=o.lastAutoTable?o.lastAutoTable.finalY+20:60;o.text("Detalhes das Vendas",20,s),o.autoTable({html:`#${t}`,startY:s+10,theme:"grid",headStyles:{fillColor:[22,163,74]}}),o.save(`${e.replace(/[\s/]/g,"_").toLowerCase()}.pdf`)}function Io(e){const t=document.getElementById("genericModal"),a=f(e.client),o=f(e.items),r=f(e.responsavelCaixa||"N/A"),s=(e.payments||[]).map(n=>`
        <div class="flex justify-between text-sm">
            <span>${f(n.method.charAt(0).toUpperCase()+n.method.slice(1))}</span>
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
                    <p class="font-semibold text-gray-800">${o}</p>
                </div>
                <div class="bg-gray-50 p-3 rounded-lg">
                    <p class="text-sm font-medium text-gray-600">Responsável pelo Caixa</p>
                    <p class="font-semibold text-gray-800">${r}</p>
                </div>
                 <div class="border-t pt-4 mt-4">
                     <h3 class="font-semibold mb-2">Pagamento</h3>
                     <div class="space-y-1">
                        ${s}
                     </div>
                     <div class="flex justify-between font-bold text-lg mt-2 pt-2 border-t">
                         <span>TOTAL</span>
                         <span>R$ ${e.total.toFixed(2)}</span>
                     </div>
                </div>
            </div>
        </div>
    `,t.style.display="flex"}function ed(e){const{summary:t,transactions:a}=e;document.getElementById("summary-revenue").textContent=`R$ ${t.totalRevenue.toFixed(2)}`,document.getElementById("summary-transactions").textContent=t.totalTransactions,document.getElementById("summary-avg-ticket").textContent=`R$ ${t.averageTicket.toFixed(2)}`;const o=document.getElementById("paymentSummaryTableBody"),r=Object.entries(t.paymentMethodTotals).sort(([,i],[,d])=>d-i);o.innerHTML=r.map(([i,d])=>`
        <tr class="border-b">
            <td class="py-2 px-4 font-medium">${f(i.charAt(0).toUpperCase()+i.slice(1))}</td>
            <td class="py-2 px-4 text-right font-semibold">R$ ${d.toFixed(2)}</td>
        </tr>
    `).join("");const s=document.getElementById("transactionsTableBody"),n=document.getElementById("mobileTransactionsList");if(a.length===0){const i='<tr><td colspan="5" class="text-center py-8 text-gray-500">Nenhuma venda encontrada para o período selecionado.</td></tr>';s.innerHTML=i,n.innerHTML='<div class="text-center py-8 text-gray-500">Nenhuma venda encontrada.</div>';return}s.innerHTML=a.map((i,d)=>{const l=f(i.client),c=f(i.items),m=f(i.type);return`
        <tr class="border-b hover:bg-gray-50 cursor-pointer" data-transaction-index="${d}">
            <td class="w-24 py-3 px-4">${new Date(i.date).toLocaleString("pt-BR",{dateStyle:"short",timeStyle:"short"})}</td>
            <td class="w-40 py-3 px-4 truncate max-w-[150px]">${l}</td>
            <td class="w-auto py-3 px-4 truncate max-w-[200px]">${c}</td>
            <td class="w-16 py-3 px-4 text-center text-xs">${m}</td>
            <td class="w-24 py-3 px-4 text-right font-medium">R$ ${i.total.toFixed(2)}</td>
        </tr>
    `}).join(""),s.querySelectorAll("tr").forEach(i=>{i.addEventListener("dblclick",()=>{const d=i.dataset.transactionIndex,l=wa.transactions[d];l&&Io(l)})}),n.innerHTML=a.map((i,d)=>{const l=f(i.client),c=f(i.items),m=f(i.type);return`
        <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100 active:bg-gray-50 cursor-pointer transition-colors" data-transaction-index="${d}">
            <div class="flex justify-between items-start mb-2">
                <div class="flex flex-col">
                    <span class="text-xs text-gray-500 font-medium">${new Date(i.date).toLocaleString("pt-BR",{dateStyle:"short",timeStyle:"short"})}</span>
                    <span class="font-bold text-gray-800 text-lg">${l}</span>
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
    `}).join(""),n.querySelectorAll("div[data-transaction-index]").forEach(i=>{i.addEventListener("click",()=>{const d=i.dataset.transactionIndex,l=wa.transactions[d];l&&Io(l)})})}async function Co(){const e=document.getElementById("main-reports-view"),t=document.getElementById("reportStartDate"),a=document.getElementById("reportEndDate");if(!e||!t||!a)return;const o=t.value,r=a.value;if(!o||!r)return g("Atenção","Por favor, selecione as datas de início e fim.","error");e.innerHTML='<div class="p-8 text-center"><div class="loader mx-auto"></div><p class="mt-4">A gerar relatório...</p></div>';try{const s=document.getElementById("cashierSessionFilter").value,n=await _r({establishmentId:u.establishmentId,startDate:o,endDate:r,cashierSessionId:s});wa=n,e.innerHTML=`
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
        `,ed(n)}catch(s){g("Erro",`Não foi possível carregar o relatório: ${s.message}`,"error"),e.innerHTML=`<p class="p-8 text-center text-red-500">${f(s.message)}</p>`}}async function td(){Zl();const e=new Date().toISOString().split("T")[0],t=new Date;t.setDate(t.getDate()-30);const a=t.toISOString().split("T")[0];Xl.innerHTML=`
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
        </section>`,document.getElementById("generateReportBtn").addEventListener("click",Co),document.getElementById("exportPdfBtn").addEventListener("click",()=>{const o=document.getElementById("reportStartDate").value,r=document.getElementById("reportEndDate").value,s=`Relatorio_Vendas_${o}_a_${r}`;Kl(s,"transactionsTable")});try{const o=await kn(u.establishmentId),r=document.getElementById("cashierSessionFilter");o&&o.length>0&&o.forEach(s=>{const n=new Date(s.openTime).toLocaleString("pt-BR",{dateStyle:"short"}),i=f(s.closedByName||"N/A");r.innerHTML+=`<option value="${s.id}">${i} - ${n}</option>`})}catch{g("Erro","Não foi possível carregar o histórico de caixas para o filtro.","error")}await Co()}const ad=document.getElementById("content");let B={payables:[],receivables:[],natures:[],costCenters:[],currentTab:"payables",statusFilter:"pending",startDate:new Date(new Date().getFullYear(),new Date().getMonth(),1).toISOString().split("T")[0],endDate:new Date().toISOString().split("T")[0],filterNaturezaId:"all",filterCostCenterId:"all",isFilterOpen:!1,selectedIds:new Set,isSelectionMode:!1},wt=null,kt=null;function za(e){const t=new Map,a=[];return e&&(e.forEach(o=>t.set(o.id,{...o,children:[]})),t.forEach(o=>{o.parentId&&t.has(o.parentId)?t.get(o.parentId).children.push(o):a.push(o)})),a}function qs(e){if(!e)return{day:"--",month:"---"};const t=new Date(e+"T00:00:00"),a=t.getDate().toString().padStart(2,"0"),o=t.toLocaleString("pt-BR",{month:"short"}).toUpperCase().replace(".","");return{day:a,month:o,full:t.toLocaleDateString("pt-BR")}}function le(e){return new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(e)}function od(e,t,a){if(!e)return;if(!t||t.length===0){e.innerHTML='<p class="text-center text-gray-400 text-sm py-4">Nenhum item criado.</p>';return}const o=(r,s=0)=>`
            <div class="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-100 mb-1" style="margin-left: ${s*16}px;">
                <span class="text-sm font-medium text-gray-700">${r.name}</span>
                <button data-action="delete-${a}" data-id="${r.id}" class="text-red-400 hover:text-red-600 text-xs font-semibold px-2 py-1 bg-red-50 rounded hover:bg-red-100 transition-colors">
                    Excluir
                </button>
            </div>
            ${r.children.map(i=>o(i,s+1)).join("")}
        `;e.innerHTML=t.map(r=>o(r)).join("")}async function ka(e){const t=document.getElementById("genericModal"),a=e==="nature",o=a?"Naturezas Financeiras":"Centros de Custo",r=a?Yt:Ma,s=a?Vn:_n,n=a?"natures":"costCenters";t.innerHTML=`
        <div class="modal-content max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden">
            <div class="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <h2 class="text-lg font-bold text-gray-800">Gerir ${o}</h2>
                <button type="button" data-action="close-modal" class="text-gray-400 hover:text-gray-600 text-2xl font-bold">&times;</button>
            </div>
            
            <div class="p-6">
                <form id="hierarchyForm" class="space-y-4 mb-6">
                    <div>
                        <label class="block text-xs font-semibold text-gray-500 mb-1">Nome do Item</label>
                        <input type="text" id="itemName" placeholder="Ex: Manutenção, Vendas..." required class="w-full p-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none">
                    </div>
                    <div>
                        <label class="block text-xs font-semibold text-gray-500 mb-1">Sub-categoria de (Opcional)</label>
                        <select id="itemParent" class="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none">
                            <option value="">-- Categoria Principal --</option>
                        </select>
                    </div>
                    <button type="submit" class="w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-md">
                        Adicionar Item
                    </button>
                </form>

                <div class="border-t border-gray-100 pt-4">
                    <h3 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Itens Cadastrados</h3>
                    <div id="hierarchyList" class="space-y-1 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
                        <div class="loader mx-auto"></div>
                    </div>
                </div>
            </div>
        </div>`,t.style.display="flex";const i=t.querySelector("#hierarchyList"),d=t.querySelector("#itemParent"),l=m=>{const p=za(m);od(i,p,e);const b=d.value;d.innerHTML='<option value="">-- Categoria Principal --</option>';const v=(h,y=0)=>{const w="  ".repeat(y)+(y>0?"↳ ":"");d.innerHTML+=`<option value="${h.id}">${w}${h.name}</option>`,h.children.forEach($=>v($,y+1))};p.forEach(h=>v(h)),d.value=b};try{const m=await r(u.establishmentId);B[n]=m,l(m)}catch(m){console.error(m)}const c=t.querySelector("#hierarchyForm");c.addEventListener("submit",async m=>{m.preventDefault();const p=t.querySelector("#itemName").value,b=d.value;try{await s({name:p,parentId:b||null,establishmentId:u.establishmentId});const v=await r(u.establishmentId);B[n]=v,l(v),c.reset(),await $e(),g("Sucesso","Item adicionado.","success")}catch(v){g("Erro",v.message,"error")}})}async function sd(){rd(),nd(),await $e()}function rd(){ad.innerHTML=`
        <div class="flex flex-col h-[calc(100vh-80px)] md:h-auto bg-gray-50 w-full overflow-hidden relative">
            
            <div id="batch-action-bar" class="hidden absolute top-4 left-4 right-4 z-30 bg-white rounded-xl shadow-xl border border-gray-200 p-3 flex items-center justify-between animate-fade-in-down">
                <div class="flex items-center gap-3">
                    <button id="cancel-selection-btn" class="p-2 hover:bg-gray-100 rounded-full text-gray-500">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                    </button>
                    <span class="font-bold text-gray-700 text-sm"><span id="selected-count">0</span> selecionado(s)</span>
                </div>
                <button id="batch-delete-btn" class="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 font-semibold rounded-lg hover:bg-red-100 transition-colors text-xs uppercase tracking-wider">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                    Excluir
                </button>
            </div>

            <div class="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-20 w-full">
                <div class="max-w-5xl mx-auto px-4 py-3">
                    <div class="flex justify-between items-center mb-3">
                        <h1 class="text-xl font-bold text-gray-800">Financeiro</h1>
                        <div class="flex gap-2">
                            <button id="toggle-filter-btn" class="p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors relative">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
                            </button>
                            <button id="settings-btn" class="p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37.996.608 2.296.096 2.572-1.065z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div id="filter-panel" class="hidden overflow-hidden transition-all duration-300 mb-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <div class="col-span-2 md:col-span-1">
                                <label class="text-xs font-semibold text-gray-500 ml-1">De</label>
                                <input type="date" id="filterStartDate" value="${B.startDate}" class="w-full p-2 border border-gray-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-indigo-500 outline-none">
                            </div>
                            <div class="col-span-2 md:col-span-1">
                                <label class="text-xs font-semibold text-gray-500 ml-1">Até</label>
                                <input type="date" id="filterEndDate" value="${B.endDate}" class="w-full p-2 border border-gray-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-indigo-500 outline-none">
                            </div>
                            <div class="col-span-2 md:col-span-1">
                                <label class="text-xs font-semibold text-gray-500 ml-1">Natureza</label>
                                <select id="filterNaturezaId" class="w-full p-2 border border-gray-200 rounded-lg text-sm bg-white outline-none">
                                    <option value="all">Todas</option>
                                </select>
                            </div>
                            <div class="col-span-2 md:col-span-1">
                                <label class="text-xs font-semibold text-gray-500 ml-1">Centro Custo</label>
                                <select id="filterCostCenterId" class="w-full p-2 border border-gray-200 rounded-lg text-sm bg-white outline-none">
                                    <option value="all">Todos</option>
                                </select>
                            </div>
                            <div class="col-span-2 md:col-span-4 mt-2">
                                <div class="flex bg-white p-1 rounded-lg border border-gray-200">
                                    <button data-status="pending" class="status-filter-btn flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors bg-indigo-100 text-indigo-700">Pendentes</button>
                                    <button data-status="paid" class="status-filter-btn flex-1 py-1.5 text-xs font-semibold rounded-md text-gray-500 hover:bg-gray-50">Baixados</button>
                                    <button data-status="all" class="status-filter-btn flex-1 py-1.5 text-xs font-semibold rounded-md text-gray-500 hover:bg-gray-50">Todos</button>
                                </div>
                            </div>
                            <button id="apply-filter-btn" class="col-span-2 md:col-span-4 mt-2 w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-sm active:scale-95 transition-transform">
                                Aplicar Filtros
                            </button>
                        </div>
                    </div>

                    <div class="flex p-1 bg-gray-100 rounded-xl">
                        <button id="tab-receivables" class="flex-1 py-2 text-sm font-bold rounded-lg shadow-sm bg-white text-green-700 transition-all">
                            A Receber
                        </button>
                        <button id="tab-payables" class="flex-1 py-2 text-sm font-medium rounded-lg text-gray-500 hover:text-gray-700 transition-all">
                            A Pagar
                        </button>
                    </div>
                    
                    <div class="mt-3 flex items-center justify-end px-1">
                        <label class="flex items-center gap-2 cursor-pointer text-xs font-semibold text-gray-500 hover:text-gray-700">
                            <input type="checkbox" id="select-all-toggle" class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                            Selecionar Todos
                        </label>
                    </div>
                </div>
            </div>

            <div class="flex-1 overflow-y-auto px-4 py-6 max-w-5xl mx-auto w-full space-y-6">
                
                <div id="summary-section" class="grid grid-cols-2 md:grid-cols-4 gap-3 animate-fade-in">
                    </div>

                <div id="list-container" class="space-y-3 pb-20 w-full px-1">
                    <div class="text-center py-10"><div class="loader mx-auto"></div></div>
                </div>
            </div>

            <button id="fab-add" class="fixed bottom-6 right-6 w-14 h-14 bg-indigo-600 text-white rounded-full shadow-xl flex items-center justify-center hover:bg-indigo-700 hover:scale-105 transition-all z-40">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            </button>

        </div>
    `}function nd(){document.getElementById("select-all-toggle").addEventListener("change",a=>{const o=a.target.checked,r=document.querySelectorAll(".item-checkbox");B.selectedIds.clear(),r.forEach(s=>{s.checked=o,o&&B.selectedIds.add(s.dataset.id)}),Me()}),document.getElementById("cancel-selection-btn").addEventListener("click",()=>{B.selectedIds.clear(),document.getElementById("select-all-toggle").checked=!1,document.querySelectorAll(".item-checkbox").forEach(a=>a.checked=!1),Me()}),document.getElementById("batch-delete-btn").addEventListener("click",async()=>{const a=B.selectedIds.size;if(a===0)return;if(await H("Excluir Selecionados",`Tem certeza que deseja excluir ${a} itens? Esta ação não pode ser desfeita.`))try{const r=B.currentTab==="payables"?"payables":"receivables";await hs(r,Array.from(B.selectedIds)),g("Sucesso",`${a} itens excluídos.`,"success"),B.selectedIds.clear(),Me(),$e()}catch(r){g("Erro","Falha ao excluir itens.","error"),console.error(r)}}),document.getElementById("toggle-filter-btn").addEventListener("click",()=>{const a=document.getElementById("filter-panel"),o=document.getElementById("toggle-filter-btn");B.isFilterOpen=!B.isFilterOpen,B.isFilterOpen?(a.classList.remove("hidden"),o.classList.add("bg-indigo-100","text-indigo-600")):(a.classList.add("hidden"),o.classList.remove("bg-indigo-100","text-indigo-600"))}),document.getElementById("settings-btn").addEventListener("click",pd),document.getElementById("fab-add").addEventListener("click",()=>{const a=B.currentTab==="payables"?"payable":"receivable";ra(a)});const e=document.getElementById("tab-receivables"),t=document.getElementById("tab-payables");e.addEventListener("click",()=>Lo("receivables")),t.addEventListener("click",()=>Lo("payables")),document.querySelectorAll(".status-filter-btn").forEach(a=>{a.addEventListener("click",o=>{document.querySelectorAll(".status-filter-btn").forEach(r=>{r.classList.remove("bg-indigo-100","text-indigo-700"),r.classList.add("text-gray-500")}),o.target.classList.add("bg-indigo-100","text-indigo-700"),o.target.classList.remove("text-gray-500"),B.statusFilter=o.target.dataset.status})}),document.getElementById("apply-filter-btn").addEventListener("click",()=>{B.startDate=document.getElementById("filterStartDate").value,B.endDate=document.getElementById("filterEndDate").value,B.filterNaturezaId=document.getElementById("filterNaturezaId").value,B.filterCostCenterId=document.getElementById("filterCostCenterId").value,document.getElementById("toggle-filter-btn").click(),$e()}),wt&&document.body.removeEventListener("click",wt),wt=a=>{const o=a.target;if(o.classList.contains("item-checkbox")){const n=o.dataset.id;o.checked?B.selectedIds.add(n):B.selectedIds.delete(n),Me(),a.stopPropagation();return}const r=o.closest("button[data-action]");if(r){const{action:n,type:i,id:d}=r.dataset;if(a.stopPropagation(),n==="delete"){const l=r.closest(".financial-card-item").dataset.item.replace(/&apos;/g,"'"),c=JSON.parse(l);cd(i,c);return}if(n==="mark-as-paid"){dd(i,d);return}if(n==="manage-natures"){ka("nature");return}if(n==="manage-cost-centers"){ka("cost-center");return}if(n==="edit"){const l=JSON.parse(r.dataset.item.replace(/&apos;/g,"'"));ra(i,l);return}}const s=o.closest(".financial-card-item");if(s&&document.getElementById("list-container").contains(s)&&!o.closest(".checkbox-wrapper")){const{type:n}=s.dataset,i=JSON.parse(s.dataset.item.replace(/&apos;/g,"'"));ra(n,i)}},document.body.addEventListener("click",wt),kt&&document.getElementById("genericModal").removeEventListener("click",kt),kt=a=>{if(a.target.closest('[data-action="close-modal"]')){document.getElementById("genericModal").style.display="none";return}const r=a.target.closest('button[data-action^="delete-"]');if(r){const s=r.dataset.action.split("-")[1];md(s,r.dataset.id)}},document.getElementById("genericModal").addEventListener("click",kt)}function Me(){const e=document.getElementById("batch-action-bar"),t=document.getElementById("selected-count"),a=document.getElementById("fab-add"),o=B.selectedIds.size;t.textContent=o,o>0?(e.classList.remove("hidden"),a.classList.add("hidden")):(e.classList.add("hidden"),a.classList.remove("hidden"))}function Lo(e){B.currentTab=e,B.selectedIds.clear(),Me();const t=document.getElementById("tab-receivables"),a=document.getElementById("tab-payables"),o=document.getElementById("fab-add");e==="receivables"?(t.classList.add("bg-white","text-green-700","shadow-sm"),t.classList.remove("text-gray-500"),a.classList.remove("bg-white","text-red-700","shadow-sm"),a.classList.add("text-gray-500"),o.className="fixed bottom-6 right-6 w-14 h-14 bg-green-600 text-white rounded-full shadow-xl flex items-center justify-center hover:bg-green-700 hover:scale-105 transition-all z-40"):(a.classList.add("bg-white","text-red-700","shadow-sm"),a.classList.remove("text-gray-500"),t.classList.remove("bg-white","text-green-700","shadow-sm"),t.classList.add("text-gray-500"),o.className="fixed bottom-6 right-6 w-14 h-14 bg-red-600 text-white rounded-full shadow-xl flex items-center justify-center hover:bg-red-700 hover:scale-105 transition-all z-40"),Ns()}async function $e(){const e=document.getElementById("list-container");e.innerHTML='<div class="loader mx-auto my-10"></div>';try{if(B.natures.length===0){const[r,s]=await Promise.all([Yt(u.establishmentId),Ma(u.establishmentId)]);B.natures=r,B.costCenters=s,id()}const t={startDate:B.startDate,endDate:B.endDate,establishmentId:u.establishmentId};B.filterNaturezaId!=="all"&&(t.natureId=B.filterNaturezaId),B.filterCostCenterId!=="all"&&(t.costCenterId=B.filterCostCenterId);const[a,o]=await Promise.all([ys(t),ws(t)]);B.payables=a.entries||[],B.receivables=o.entries||[],ld(),Ns()}catch(t){e.innerHTML=`<p class="text-center text-red-500 mt-10">Erro ao carregar: ${t.message}</p>`}}function id(){const e=o=>{let r='<option value="all">Todas</option>';const s=za(o),n=(i,d=0)=>{const l="  ".repeat(d)+(d>0?"↳ ":"");r+=`<option value="${i.id}">${l}${i.name}</option>`,i.children.forEach(c=>n(c,d+1))};return s.forEach(i=>n(i)),r},t=document.getElementById("filterNaturezaId"),a=document.getElementById("filterCostCenterId");t&&(t.innerHTML=e(B.natures)),a&&(a.innerHTML=e(B.costCenters)),t&&(t.value=B.filterNaturezaId),a&&(a.value=B.filterCostCenterId)}function ld(){const e=document.getElementById("summary-section");if(!e)return;const t=B.receivables.reduce((d,l)=>d+l.amount,0),a=B.receivables.filter(d=>d.status==="paid").reduce((d,l)=>d+l.amount,0),o=t-a,r=B.payables.reduce((d,l)=>d+l.amount,0),s=B.payables.filter(d=>d.status==="paid").reduce((d,l)=>d+l.amount,0),n=r-s,i=a-s;e.innerHTML=`
        <div class="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 col-span-2 md:col-span-1">
            <p class="text-[10px] text-gray-400 font-bold uppercase tracking-wider">A Receber</p>
            <p class="text-xl font-bold text-green-600">${le(o)}</p>
        </div>
        <div class="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 col-span-2 md:col-span-1">
            <p class="text-[10px] text-gray-400 font-bold uppercase tracking-wider">A Pagar</p>
            <p class="text-xl font-bold text-red-500">${le(n)}</p>
        </div>
        <div class="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 col-span-2 md:col-span-1">
            <p class="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Realizado</p>
            <p class="text-xl font-bold ${i>=0?"text-indigo-600":"text-orange-500"}">${le(i)}</p>
        </div>
    `}function Ns(){const e=document.getElementById("list-container");if(!e)return;const t=B.currentTab==="receivables",a=t?B.receivables:B.payables;let o=a;if(B.statusFilter!=="all"&&(o=a.filter(n=>n.status===B.statusFilter)),o.sort((n,i)=>new Date(n.dueDate)-new Date(i.dueDate)),o.length===0){e.innerHTML=`
            <div class="flex flex-col items-center justify-center py-12 text-gray-400 opacity-60">
                <svg class="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                <p>Nenhum lançamento encontrado.</p>
            </div>
        `;return}const r=new Map(B.natures.map(n=>[n.id,n.name])),s=t?"receivable":"payable";e.innerHTML=o.map(n=>{const i=qs(n.dueDate),d=n.status==="paid",l=d?"text-gray-400":t?"text-green-600":"text-red-500",c=n.naturezaId&&r.get(n.naturezaId)||"Geral",m=JSON.stringify(n).replace(/'/g,"&apos;"),p=B.selectedIds.has(n.id),v=!!n.recurrenceId?'<span class="ml-1 text-gray-400"><svg class="w-3 h-3 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg></span>':"";return`
        <div class="financial-card-item w-full max-w-full bg-white p-3 rounded-xl shadow-sm border ${p?"border-indigo-400 bg-indigo-50":"border-gray-100"} flex items-start gap-3 relative overflow-hidden cursor-pointer hover:shadow-md transition-all active:scale-[0.99]"
             data-type="${s}"
             data-item='${m}'>
            
            <div class="absolute left-0 top-0 bottom-0 w-1 ${d?"bg-gray-300":t?"bg-green-500":"bg-red-500"}"></div>

            <div class="checkbox-wrapper pt-3 pl-1">
                <input type="checkbox" class="item-checkbox w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer" data-id="${n.id}" ${p?"checked":""}>
            </div>

            <div class="flex-shrink-0 flex flex-col items-center justify-center bg-gray-50 rounded-lg w-12 h-12 border border-gray-100 mt-0.5">
                <span class="text-base font-bold text-gray-800 leading-none">${i.day}</span>
                <span class="text-[9px] font-bold text-gray-400 uppercase leading-none mt-0.5">${i.month}</span>
            </div>

            <div class="flex-1 min-w-0 flex flex-col justify-start">
                <h3 class="font-bold text-gray-800 text-sm break-words whitespace-normal pr-1 leading-snug ${d?"line-through text-gray-400":""}">
                    ${n.description}
                </h3>
                <div class="flex items-center gap-1.5 mt-1 flex-wrap">
                    <span class="text-[10px] px-1.5 py-0.5 rounded-md bg-indigo-50 text-indigo-600 font-medium break-all flex items-center">
                        ${c} ${v}
                    </span>
                    ${d?'<span class="text-[10px] px-1.5 py-0.5 rounded-md bg-gray-100 text-gray-500 font-medium whitespace-nowrap">Baixado</span>':""}
                </div>
            </div>

            <div class="flex-shrink-0 text-right pl-1 flex flex-col items-end">
                <p class="font-bold text-sm ${l} whitespace-nowrap">${le(n.amount)}</p>
                
                <div class="flex justify-end gap-3 mt-2">
                    ${d?"":`
                        <button data-action="mark-as-paid" data-type="${s}" data-id="${n.id}" class="p-1.5 rounded-full text-gray-400 hover:text-green-500 hover:bg-green-50 transition-colors z-10" title="Baixar">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                        </button>
                    `}
                    
                    <button data-action="delete" data-type="${s}" data-id="${n.id}" class="p-1.5 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors z-10" title="Excluir">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                    </button>
                </div>
            </div>
        </div>
        `}).join("")}async function dd(e,t){const a=new Date().toISOString().split("T")[0];try{await(e==="payable"?Qn(t,a):ei(t,a)),g("Sucesso","Lançamento baixado!","success"),await $e()}catch(o){g("Erro",o.message,"error")}}async function cd(e,t){if(!!!t.recurrenceId){await H("Excluir Lançamento","Tem certeza? Essa ação não pode ser desfeita.")&&await Rs(e,[t.id]);return}ud(e,t)}function ud(e,t){const a=document.getElementById("genericModal"),r=(e==="payable"?B.payables:B.receivables).filter(l=>l.recurrenceId===t.recurrenceId);r.sort((l,c)=>new Date(l.dueDate)-new Date(c.dueDate)),a.innerHTML=`
        <div class="modal-content max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[85vh]">
            <div class="bg-red-50 px-6 py-4 border-b border-red-100 flex justify-between items-center">
                <div class="flex items-center gap-2">
                    <div class="p-1.5 bg-white rounded-lg text-red-600 shadow-sm">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                    </div>
                    <h2 class="text-lg font-bold text-gray-800">Gerenciar Parcelas</h2>
                </div>
                <button type="button" data-action="close-modal" class="text-gray-400 hover:text-gray-600 text-2xl font-bold">&times;</button>
            </div>
            
            <div class="p-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
                <span class="text-xs text-gray-500 font-semibold uppercase">Selecione os itens para excluir</span>
                <label class="flex items-center gap-2 cursor-pointer text-xs font-bold text-indigo-600 hover:text-indigo-800">
                    <input type="checkbox" id="modal-select-all" class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                    Marcar Todos
                </label>
            </div>

            <div class="overflow-y-auto p-2 space-y-1 custom-scrollbar flex-1">
                ${r.map(l=>{const c=l.id===t.id,m=l.status==="paid",p=qs(l.dueDate);return`
                    <label class="flex items-center gap-3 p-3 bg-white rounded-xl border ${c?"border-red-300 ring-1 ring-red-100":"border-gray-200"} hover:border-red-300 cursor-pointer transition-all group">
                        <input type="checkbox" class="modal-item-checkbox w-5 h-5 rounded border-gray-300 text-red-600 focus:ring-red-500" value="${l.id}" ${c?"checked":""}>
                        
                        <div class="flex-shrink-0 w-10 h-10 bg-gray-50 rounded-lg flex flex-col items-center justify-center border border-gray-100">
                            <span class="text-xs font-bold text-gray-700">${p.day}</span>
                            <span class="text-[8px] font-bold text-gray-400 uppercase">${p.month}</span>
                        </div>

                        <div class="flex-1 min-w-0">
                            <p class="text-sm font-semibold text-gray-800 truncate">${l.description}</p>
                            <p class="text-xs text-gray-500">${le(l.amount)} ${m?'<span class="text-green-600 font-bold ml-1">(Pago)</span>':'<span class="text-orange-500 ml-1">(Pendente)</span>'}</p>
                        </div>
                        
                        ${c?'<span class="text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-bold">Este</span>':""}
                    </label>
                    `}).join("")}
            </div>

            <div class="p-4 border-t border-gray-100 bg-white">
                <button id="confirm-batch-delete" class="w-full py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 shadow-md active:scale-[0.98] transition-all">
                    Excluir Selecionados
                </button>
            </div>
        </div>
    `,a.style.display="flex";const s=a.querySelector("#modal-select-all"),n=a.querySelectorAll(".modal-item-checkbox"),i=a.querySelector("#confirm-batch-delete");s.addEventListener("change",l=>{n.forEach(c=>c.checked=l.target.checked),d()}),n.forEach(l=>{l.addEventListener("change",d)});function d(){const l=Array.from(n).filter(c=>c.checked).length;i.textContent=l>0?`Excluir ${l} Item(ns)`:"Selecione itens para excluir",i.disabled=l===0,l===0?i.classList.add("opacity-50","cursor-not-allowed"):i.classList.remove("opacity-50","cursor-not-allowed")}i.addEventListener("click",async()=>{const l=Array.from(n).filter(m=>m.checked).map(m=>m.value);if(l.length===0)return;a.style.display="none",await H("Confirmar Exclusão",`Tem certeza que deseja apagar ${l.length} itens definitivamente?`)&&await Rs(e,l)}),d()}async function Rs(e,t){try{t.length===1?e==="payable"?await Yn(t[0]):await Kn(t[0]):await hs(e==="payable"?"payables":"receivables",t),g("Sucesso",`${t.length} item(ns) excluído(s).`,"success"),B.selectedIds.clear(),Me(),await $e()}catch(a){g("Erro",a.message,"error")}}async function md(e,t){const o=e==="nature"?Un:Wn;if(await H("Apagar Item","Tem a certeza? Apagar um item principal também apagará os seus sub-itens."))try{await o(t),ka(e==="nature"?"nature":"cost-center")}catch(s){g("Erro",s.message,"error")}}function pd(){const e=document.getElementById("genericModal");e.innerHTML=`
        <div class="modal-content max-w-sm bg-white rounded-2xl shadow-xl overflow-hidden">
            <div class="p-6 text-center">
                <h2 class="text-xl font-bold text-gray-800 mb-4">Configurações</h2>
                <div class="space-y-3">
                    <button data-action="manage-natures" class="w-full py-3 px-4 bg-indigo-50 text-indigo-700 font-semibold rounded-xl hover:bg-indigo-100 flex items-center justify-between group">
                        <span>Naturezas Financeiras</span>
                        <svg class="w-5 h-5 text-indigo-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                    </button>
                    <button data-action="manage-cost-centers" class="w-full py-3 px-4 bg-blue-50 text-blue-700 font-semibold rounded-xl hover:bg-blue-100 flex items-center justify-between group">
                        <span>Centros de Custo</span>
                        <svg class="w-5 h-5 text-blue-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                    </button>
                </div>
                <button type="button" data-action="close-modal" class="mt-6 text-gray-400 hover:text-gray-600 font-medium text-sm">Fechar</button>
            </div>
        </div>
    `,e.style.display="flex"}function ra(e,t=null){const a=document.getElementById("genericModal"),o=e==="payable",r=o?"red":"green",s=t?`Editar ${o?"Despesa":"Receita"}`:`Nova ${o?"Despesa":"Receita"}`,n=($,k)=>{let C='<option value="">-- Selecione --</option>';const T=za($),A=(q,D=0)=>{const M="  ".repeat(D)+(D>0?"↳ ":""),R=q.id===k?"selected":"";C+=`<option value="${q.id}" ${R}>${M}${q.name}</option>`,q.children.forEach(F=>A(F,D+1))};return T.forEach(q=>A(q)),C};a.innerHTML=`
        <div class="modal-content max-w-xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden m-4 flex flex-col max-h-[90vh]">
            
            <div class="bg-${r}-50 px-6 py-4 border-b border-${r}-100 flex justify-between items-center flex-shrink-0">
                <div class="flex items-center gap-3">
                    <div class="p-2 bg-white rounded-lg text-${r}-600 shadow-sm">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${o?"M19 14l-7 7m0 0l-7-7m7 7V3":"M5 10l7-7m0 0l7 7m-7-7v18"}"/></svg>
                    </div>
                    <div>
                        <h2 class="text-xl font-bold text-gray-800">${s}</h2>
                        <p class="text-xs text-gray-500">${o?"Registre suas saídas":"Registre suas entradas"}</p>
                    </div>
                </div>
                <button type="button" data-action="close-modal" class="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-100">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
            </div>
            
            <form id="financial-form" class="flex-1 overflow-y-auto custom-scrollbar">
                <div class="p-6 space-y-6">

                    ${t?"":`
                    <div class="bg-gray-50 p-1.5 rounded-xl flex border border-gray-200">
                        <button type="button" class="mode-btn flex-1 py-2 text-sm font-semibold rounded-lg shadow-sm bg-white text-gray-800 transition-all" data-mode="single">
                            Único
                        </button>
                        <button type="button" class="mode-btn flex-1 py-2 text-sm font-medium rounded-lg text-gray-500 hover:text-gray-700 transition-all" data-mode="installment">
                            Parcelado
                        </button>
                        <button type="button" class="mode-btn flex-1 py-2 text-sm font-medium rounded-lg text-gray-500 hover:text-gray-700 transition-all" data-mode="repeat">
                            Repetir (Fixo)
                        </button>
                    </div>
                    `}

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div class="md:col-span-1">
                            <label class="block text-xs font-bold text-gray-500 uppercase mb-1.5">Valor Total</label>
                            <div class="relative">
                                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">R$</span>
                                <input type="number" step="0.01" name="amount" required 
                                    class="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-${r}-500 outline-none font-bold text-lg text-gray-800" 
                                    value="${t?.amount||""}" placeholder="0,00">
                            </div>
                        </div>
                        <div class="md:col-span-2">
                            <label class="block text-xs font-bold text-gray-500 uppercase mb-1.5">Descrição</label>
                            <input type="text" name="description" required 
                                class="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-${r}-500 outline-none font-medium" 
                                value="${t?.description||""}" placeholder="Ex: Conta de Luz, Venda...">
                        </div>
                    </div>

                    <div id="recurrence-options" class="hidden animate-fade-in bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                        <div class="flex flex-col md:flex-row gap-4 items-end">
                            <div class="w-full md:w-1/2">
                                <label class="block text-xs font-bold text-indigo-700 uppercase mb-1.5">Quantidade de Meses</label>
                                <div class="flex items-center">
                                    <button type="button" id="btn-minus" class="w-10 h-10 bg-white border border-indigo-200 rounded-l-lg text-indigo-600 hover:bg-indigo-50 font-bold">-</button>
                                    <input type="number" id="installments-input" name="installments" min="2" max="60" value="2" 
                                        class="w-full h-10 border-y border-indigo-200 text-center font-bold text-indigo-700 outline-none appearance-none">
                                    <button type="button" id="btn-plus" class="w-10 h-10 bg-white border border-indigo-200 rounded-r-lg text-indigo-600 hover:bg-indigo-50 font-bold">+</button>
                                </div>
                            </div>
                            <div class="w-full md:w-1/2">
                                <div class="text-sm text-indigo-800 font-medium bg-white/60 p-3 rounded-lg border border-indigo-100 h-full flex items-center">
                                    <span id="recurrence-summary">Selecione o modo...</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label class="block text-xs font-bold text-gray-500 uppercase mb-1.5">Vencimento</label>
                            <input type="date" name="dueDate" required 
                                class="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-${r}-500 outline-none text-gray-700 font-medium" 
                                value="${t?.dueDate||new Date().toISOString().split("T")[0]}">
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-gray-500 uppercase mb-1.5">Natureza</label>
                            <select name="naturezaId" class="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-${r}-500 outline-none text-sm appearance-none">
                                ${n(B.natures,t?.naturezaId)}
                            </select>
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-gray-500 uppercase mb-1.5">Centro de Custo</label>
                            <select name="centroDeCustoId" class="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-${r}-500 outline-none text-sm appearance-none">
                                ${n(B.costCenters,t?.centroDeCustoId)}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label class="block text-xs font-bold text-gray-500 uppercase mb-1.5">Observações (Opcional)</label>
                        <textarea name="notes" rows="2" class="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-${r}-500 outline-none text-sm resize-none">${t?.notes||""}</textarea>
                    </div>

                    <div class="bg-gray-50 p-4 rounded-xl border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <label class="flex items-center gap-3 cursor-pointer group">
                            <div class="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" name="status" id="status-toggle" class="sr-only peer" ${t?.status==="paid"?"checked":""}>
                                <div class="w-12 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-${r}-500 shadow-inner"></div>
                            </div>
                            <span class="text-sm font-bold text-gray-600 group-hover:text-gray-800 transition-colors">Marcar como ${o?"Pago":"Recebido"}</span>
                        </label>
                        
                        <div id="payment-date-wrapper" class="${t?.status==="paid"?"":"hidden"} flex-1 md:max-w-xs animate-fade-in">
                            <input type="date" name="paymentDate" 
                                class="w-full p-2.5 border border-${r}-200 rounded-lg text-sm bg-white focus:ring-1 focus:ring-${r}-500 outline-none shadow-sm" 
                                value="${t?.paymentDate||new Date().toISOString().split("T")[0]}">
                        </div>
                    </div>
                </div>

                <div class="p-4 border-t border-gray-100 bg-gray-50 flex gap-3 flex-shrink-0">
                    <button type="button" data-action="close-modal" class="flex-1 py-3.5 bg-white border border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-gray-50 transition-colors">
                        Cancelar
                    </button>
                    <button type="submit" class="flex-[2] py-3.5 bg-${r}-600 text-white font-bold rounded-xl hover:bg-${r}-700 shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                        <span>${t?"Salvar Alterações":"Confirmar Lançamento"}</span>
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                    </button>
                </div>
            </form>
        </div>`,a.style.display="flex";const i=a.querySelector("#financial-form");let d="single",l=2;const c=i.querySelector('[name="amount"]'),m=i.querySelector("#recurrence-options"),p=i.querySelector("#recurrence-summary"),b=i.querySelector("#installments-input"),v=i.querySelector("#status-toggle"),h=i.querySelector("#payment-date-wrapper"),y=i.querySelector('[name="paymentDate"]'),w=()=>{if(d==="single")return;const $=parseFloat(c.value)||0;if(l=parseInt(b.value)||2,$===0){p.innerHTML="Digite um valor para ver a simulação.";return}if(d==="installment"){const k=$/l;p.innerHTML=`
                <span class="block text-xs text-gray-500 uppercase">Resumo do Parcelamento</span>
                <span class="font-bold block">${l}x de ${le(k)}</span>
                <span class="text-xs text-gray-400">Total: ${le($)}</span>
            `}else if(d==="repeat"){const k=$*l;p.innerHTML=`
                <span class="block text-xs text-gray-500 uppercase">Resumo da Recorrência</span>
                <span class="font-bold block">${l}x de ${le($)}</span>
                <span class="text-xs text-gray-400">Total Gerado: ${le(k)}</span>
            `}};t||(a.querySelectorAll(".mode-btn").forEach($=>{$.addEventListener("click",k=>{if(a.querySelectorAll(".mode-btn").forEach(C=>{C.classList.remove("bg-white","text-gray-800","shadow-sm","font-semibold"),C.classList.add("text-gray-500","font-medium")}),k.target.classList.add("bg-white","text-gray-800","shadow-sm","font-semibold"),k.target.classList.remove("text-gray-500","font-medium"),d=k.target.dataset.mode,d==="single")m.classList.add("hidden");else{m.classList.remove("hidden");const C=m.querySelector("label");C.textContent=d==="installment"?"Número de Parcelas":"Repetir por quantos meses?",w()}})}),a.querySelector('[data-mode="single"]').click()),c.addEventListener("input",w),b&&(b.addEventListener("input",w),i.querySelector("#btn-minus").addEventListener("click",()=>{let $=parseInt(b.value)||2;$>2&&(b.value=$-1,w())}),i.querySelector("#btn-plus").addEventListener("click",()=>{let $=parseInt(b.value)||2;$<60&&(b.value=$+1,w())})),v.addEventListener("change",()=>{v.checked?(h.classList.remove("hidden"),y.required=!0):(h.classList.add("hidden"),y.required=!1)}),i.addEventListener("submit",async $=>{$.preventDefault();const k=new FormData(i),C=v.checked,T=parseFloat(k.get("amount"));let A=T,q=1;!t&&d!=="single"?(q=parseInt(k.get("installments")),d==="repeat"&&(A=T*q)):q=1;const D={description:k.get("description"),amount:A,dueDate:k.get("dueDate"),naturezaId:k.get("naturezaId")||null,centroDeCustoId:k.get("centroDeCustoId")||null,notes:k.get("notes"),status:C?"paid":"pending",paymentDate:C?k.get("paymentDate"):null,establishmentId:u.establishmentId,installments:q};q>1&&!t&&(D.recurrenceId=self.crypto.randomUUID());try{t?(await(o?Gn(t.id,D):Zn(t.id,D)),g("Sucesso","Atualizado com sucesso!","success")):(await(o?Jn(D):Xn(D)),g("Sucesso","Lançamento criado!","success")),document.getElementById("genericModal").style.display="none",$e()}catch(M){console.error(M),g("Erro",M.message||"Erro ao salvar","error")}})}const gd=e=>E("/api/commissions/calculate",{method:"POST",body:JSON.stringify(e)}),bd=e=>E("/api/commissions/save",{method:"POST",body:JSON.stringify(e)}),fd=(e,t)=>{const a=new URLSearchParams({startDate:e,endDate:t}).toString();return E(`/api/commissions/stats?${a}`)},vd=(e={})=>{Object.keys(e).forEach(o=>(e[o]===void 0||e[o]===null||e[o]==="")&&delete e[o]);const t=new URLSearchParams(e).toString(),a=`/api/commissions/history${t?"?"+t:""}`;return E(a)},hd=e=>E(`/api/commissions/report/${e}`,{method:"DELETE"}),Rt=new Date,To=new Date(Rt.getFullYear(),Rt.getMonth(),1),N={currentTab:"dashboard",professionals:[],calculationResult:null,historyData:[],periodString:"",dashStartDate:To.toISOString().split("T")[0],dashEndDate:Rt.toISOString().split("T")[0],dashStats:{revenue:0,commissions:0},histStartDate:To.toISOString().split("T")[0],histEndDate:Rt.toISOString().split("T")[0],histProfessionalId:"all"};let St=null;const Ze=document.getElementById("content");async function xd(){try{N.professionals=await ee(u.establishmentId)}catch(e){console.error("Erro profissionais",e)}Dd(),yd(),Kt(),Ft("dashboard")}function yd(){St&&Ze.removeEventListener("click",St),St=e=>{const t=e.target.closest("button");if(!t)return;const a=t.dataset.action,o=t.dataset.id,r=t.dataset.idx;switch(a){case"tab-nav":Ft(t.dataset.tab);break;case"toggle-all-profs":wd();break;case"back-to-filters":N.calculationResult=null,jt(document.getElementById("commissions-content"));break;case"view-preview-items":Td(r);break;case"save-final-report":Sd();break;case"start-new-calc":Ft("calculator");break;case"print-receipt":$d(o);break;case"delete-report":Ed(o);break;case"filter-dashboard":Kt();break;case"filter-history":Va();break}},Ze.addEventListener("click",St),Ze.oninput=e=>{if(e.target.classList.contains("input-debit")||e.target.classList.contains("input-credit")){const t=e.target.dataset.idx;Cd(t)}},Ze.onsubmit=e=>{e.target.id==="calc-form"&&(e.preventDefault(),kd())}}async function Kt(){const e=document.getElementById("dash-start"),t=document.getElementById("dash-end");e&&(N.dashStartDate=e.value),t&&(N.dashEndDate=t.value);const a=document.getElementById("dashboard-stats-container");a&&(a.innerHTML='<div class="flex justify-center py-10"><div class="loader"></div></div>');try{const o=await fd(N.dashStartDate,N.dashEndDate);N.dashStats={revenue:o.totalRevenue||0,commissions:o.totalCommissionsPaid||0},N.currentTab==="dashboard"&&js(document.getElementById("commissions-content"))}catch(o){console.error(o),a&&(a.innerHTML='<p class="text-red-500 text-center">Erro ao carregar dados.</p>')}}async function Va(){const e=document.getElementById("hist-start"),t=document.getElementById("hist-end"),a=document.getElementById("hist-prof");e&&(N.histStartDate=e.value),t&&(N.histEndDate=t.value),a&&(N.histProfessionalId=a.value);const o=document.getElementById("history-list-container");if(o){o.innerHTML='<div class="flex justify-center py-10"><div class="loader"></div></div>';try{const r=await vd({startDate:N.histStartDate,endDate:N.histEndDate,professionalId:N.histProfessionalId});N.historyData=r,Fs(o,r)}catch{o.innerHTML='<p class="text-red-500 text-center py-4">Erro ao buscar registros.</p>'}}}function wd(){const e=document.querySelectorAll(".prof-checkbox"),t=Array.from(e).every(a=>a.checked);e.forEach(a=>a.checked=!t)}async function kd(){const e=Array.from(document.querySelectorAll(".prof-checkbox:checked")).map(s=>s.value);if(e.length===0)return g("Atenção","Selecione profissionais","error");const t={professionalIds:e,startDate:document.getElementById("start-date").value,endDate:document.getElementById("end-date").value,calculationTypes:{services:document.getElementById("type-services").checked,products:document.getElementById("type-products").checked,packages:document.getElementById("type-packages").checked}},a=new Date(t.startDate+"T00:00:00").toLocaleDateString("pt-BR"),o=new Date(t.endDate+"T00:00:00").toLocaleDateString("pt-BR");N.periodString=`${a} a ${o}`;const r=document.getElementById("commissions-content");r.innerHTML='<div class="flex flex-col items-center justify-center py-20"><div class="loader mb-4"></div><p class="text-gray-500 animate-pulse">Calculando...</p></div>';try{const s=await gd(t);N.calculationResult=s.map(n=>({...n,extraDebit:0,extraCredit:0,finalValue:n.summary.totalCommission,notes:""})),jt(r)}catch(s){g("Erro",s.message,"error"),N.calculationResult=null,jt(r)}}async function Sd(){const e=N.calculationResult.length;if(await H("Confirmar",`Gerar ${e} relatórios? Isso marcará as vendas como pagas.`))try{const a=N.calculationResult.map(o=>{const r=o.items.map(s=>s.originalSaleId).filter(s=>s!=null);return bd({professionalId:o.professionalId,professionalName:o.professionalName,period:N.periodString,processedSalesIds:r,reportData:{...o,summary:{...o.summary,finalValue:o.finalValue,extraDebit:o.extraDebit||0,extraCredit:o.extraCredit||0,notes:o.notes||""}}})});await Promise.all(a),g("Sucesso","Pagamentos registrados!","success"),N.calculationResult=null,Kt(),Ft("history")}catch(a){g("Erro",a.message,"error")}}function $d(e){const t=N.historyData.find(a=>a.id===e);t&&Id(t)}async function Ed(e){if(await H("Excluir","Deseja remover este registro? As vendas voltarão a ficar disponíveis para cálculo."))try{await hd(e),g("Sucesso","Registro removido.","success"),Va(),Kt()}catch(a){g("Erro",a.message,"error")}}function Id(e){const{jsPDF:t}=window.jspdf;if(!t)return g("Erro","PDF lib não carregada.","error");const a=new t,o=a.internal.pageSize.getWidth()/2;a.setFontSize(18),a.setFont(void 0,"bold"),a.text("RECIBO DE PAGAMENTO DE COMISSÃO",o,20,{align:"center"}),a.setFontSize(12),a.setFont(void 0,"normal"),a.text(`Profissional: ${e.professionalName}`,15,40),a.text(`Período: ${e.period}`,15,48);const r=[["Comissão Bruta",`R$ ${e.summary.totalCommission.toFixed(2)}`]];e.summary.extraCredit>0&&r.push(["(+) Bônus",`R$ ${e.summary.extraCredit.toFixed(2)}`]),e.summary.extraDebit>0&&r.push(["(-) Descontos",`R$ ${e.summary.extraDebit.toFixed(2)}`]),a.autoTable({startY:60,head:[["Descrição","Valor"]],body:r,theme:"grid"});const s=a.lastAutoTable.finalY+10;a.setFontSize(14),a.setFont(void 0,"bold"),a.text(`Total Líquido: R$ ${(e.summary.finalValue||e.summary.totalCommission).toFixed(2)}`,190,s,{align:"right"}),a.save(`Recibo_${e.professionalName}.pdf`)}function Cd(e){const t=document.querySelectorAll(`.input-debit[data-idx="${e}"]`),a=document.querySelectorAll(`.input-credit[data-idx="${e}"]`);let o=0,r=0;if(t.forEach(s=>{s.value&&(o=parseFloat(s.value))}),a.forEach(s=>{s.value&&(r=parseFloat(s.value))}),N.calculationResult&&N.calculationResult[e]){const s=N.calculationResult[e];s.extraDebit=o,s.extraCredit=r,s.finalValue=s.summary.totalCommission-o+r,t.forEach(i=>{i!==document.activeElement&&(i.value=o||"")}),a.forEach(i=>{i!==document.activeElement&&(i.value=r||"")}),document.querySelectorAll(`.final-value-display[data-idx="${e}"]`).forEach(i=>i.innerText=`R$ ${s.finalValue.toFixed(2)}`),Ld()}}function Ld(){const e=N.calculationResult.reduce((a,o)=>a+o.finalValue,0);document.querySelectorAll("#grand-total-display").forEach(a=>a.innerText=`R$ ${e.toFixed(2)}`)}function Td(e){const t=N.calculationResult[e];if(!t)return;const a=t.items.map(o=>`
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
    `).join("");_({title:"Detalhes da Comissão",contentHTML:`<div class="bg-gray-50 p-3 rounded-lg mb-4 flex justify-between items-center"><div><p class="text-xs text-gray-500">Profissional</p><p class="font-bold text-gray-800">${t.professionalName}</p></div><div class="text-right"><p class="text-xs text-gray-500">Total Itens</p><p class="font-bold text-gray-800">${t.items.length}</p></div></div><div class="border rounded-lg overflow-hidden max-h-[60vh] overflow-y-auto">${a}</div>`,maxWidth:"max-w-md"})}function jt(e){if(N.calculationResult){const t=N.calculationResult,a=t.reduce((s,n)=>s+n.finalValue,0),o=t.map((s,n)=>`
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
            </div>`}else{const t=new Date().toISOString().split("T")[0],a=new Date(new Date().getFullYear(),new Date().getMonth(),1).toISOString().split("T")[0],o=N.professionals.map(r=>`
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
            </form>`}}function Dd(){Ze.innerHTML=`
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
    `}function Ft(e){N.currentTab=e,["dashboard","calculator","history"].forEach(a=>{const o=document.getElementById(`tab-${a}`);a===e?o.className="flex-1 md:flex-none px-4 py-2 rounded-md text-sm font-bold bg-white text-indigo-600 shadow-sm border border-gray-100":o.className="flex-1 md:flex-none px-4 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700"});const t=document.getElementById("commissions-content");e==="dashboard"&&js(t),e==="calculator"&&jt(t),e==="history"&&Pd(t)}function js(e){const{revenue:t,commissions:a}=N.dashStats,o=t>0?(a/t*100).toFixed(1):0;e.innerHTML=`
        <div class="space-y-6 animate-fade-in">
            <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row gap-4 items-end">
                <div class="flex-1 w-full">
                    <label class="text-xs font-bold text-gray-500 uppercase">Data Inicial</label>
                    <input type="date" id="dash-start" value="${N.dashStartDate}" class="w-full mt-1 rounded-lg border-gray-300">
                </div>
                <div class="flex-1 w-full">
                    <label class="text-xs font-bold text-gray-500 uppercase">Data Final</label>
                    <input type="date" id="dash-end" value="${N.dashEndDate}" class="w-full mt-1 rounded-lg border-gray-300">
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
    `}function Pd(e){const t=N.professionals.map(a=>`<option value="${a.id}" ${N.histProfessionalId===a.id?"selected":""}>${a.name}</option>`).join("");e.innerHTML=`
        <div class="space-y-6">
            <div class="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                <h2 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    Pesquisar Pagamentos
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <div>
                        <label class="text-xs font-bold text-gray-500 uppercase">De (Data Pagto)</label>
                        <input type="date" id="hist-start" value="${N.histStartDate}" class="w-full mt-1 rounded-lg border-gray-300">
                    </div>
                    <div>
                        <label class="text-xs font-bold text-gray-500 uppercase">Até</label>
                        <input type="date" id="hist-end" value="${N.histEndDate}" class="w-full mt-1 rounded-lg border-gray-300">
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
    `,N.historyData.length>0?Fs(document.getElementById("history-list-container"),N.historyData):Va()}function Fs(e,t){if(t.length===0){e.innerHTML=`
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
    `}const na=document.getElementById("content");let ke={allPackages:[],catalogForModal:{services:[],products:[]}},$t=null,Ae=null;function Bd(e=6){let t="";for(let a=0;a<e;a++)t+=`
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
        `;return t}function Md(){const e=document.getElementById("packagesListContainer");if(e){if(ke.allPackages.length===0){e.innerHTML=`
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
            </div>`;return}e.innerHTML=ke.allPackages.map(t=>{const a=t.status==="active",o=JSON.stringify(t).replace(/'/g,"&apos;"),r=t.price||0,s=t.originalPrice||0,n=s>r?s-r:0,i=s>0?(s-r)/s*100:0,d=f(t.name),l=f(t.description||"Sem descrição");return`
            <div class="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 flex flex-col cursor-pointer"
                 data-action="edit-package" data-package='${o}'>
                
                <div class="p-4 flex-grow">
                    <div class="flex justify-between items-start">
                        <div class="min-w-0 pr-2">
                            <h3 class="text-base font-bold text-gray-900 truncate">${d}</h3>
                            <p class="text-xs text-gray-500 truncate">${l}</p>
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
        `}).join("")}}function Do(){const e=document.getElementById("genericModal");e.style.display="none",Ae&&e.removeEventListener("click",Ae)}async function Po(e=null){const t=document.getElementById("genericModal"),a=!!e,o=e?JSON.parse(JSON.stringify(e.items||[])):[],r=f(e?.name||""),s=f(e?.description||""),n=e?.price||"",i=e?.commissionRate||0,d=e?.validityDays||30,l=`
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
                            <textarea id="packageDescription" rows="2" class="mt-1 w-full p-2 border rounded-md">${s}</textarea>
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
                                <input type="number" id="validityDays" value="${d}" class="mt-1 w-full p-2 border rounded-md" placeholder="Ex: 30, 60, 90">
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
    `;t.innerHTML=l,t.style.display="flex";const c=t.querySelector("#package-items-list"),m=(b,v)=>{const h=v.querySelector("#originalPrice"),y=b.reduce((w,$)=>w+$.price*$.quantity,0);h&&(h.textContent=`R$ ${y.toFixed(2)}`)},p=b=>{b.length===0?c.innerHTML='<p class="text-center text-gray-500 p-4">Nenhum item adicionado.</p>':c.innerHTML=b.map((v,h)=>{const y=v.type==="service",w=y?"Serviço":"Produto",$=y?"bg-indigo-100 text-indigo-800":"bg-green-100 text-green-800";return`
                <div class="flex items-center justify-between bg-white p-2 rounded shadow-sm border border-gray-200">
                    <div class="flex items-center gap-3 min-w-0">
                        <input type="number" value="${v.quantity}" min="1" class="w-12 p-1 border rounded-md text-sm quantity-input flex-shrink-0" data-index="${h}">
                        <span class="text-xs font-medium px-2 py-0.5 rounded-full ${$}">${w}</span>
                        <span class="font-medium text-gray-800 truncate">${f(v.name)}</span>
                    </div>
                    <div class="flex items-center gap-2 flex-shrink-0">
                        <span class="text-sm text-gray-600">R$ ${v.price.toFixed(2)}</span>
                        <button type="button" class="text-red-500 hover:text-red-700 remove-item-btn font-bold" data-index="${h}">&times;</button>
                    </div>
                </div>
            `}).join(""),m(b,t)};p(o),c.addEventListener("change",b=>{if(b.target.classList.contains("quantity-input")){const v=parseInt(b.target.dataset.index,10),h=parseInt(b.target.value,10);h>0&&o[v]&&(o[v].quantity=h,p(o))}}),c.addEventListener("click",b=>{if(b.target.classList.contains("remove-item-btn")){const v=parseInt(b.target.dataset.index,10);o.splice(v,1),p(o)}}),t.querySelector("#add-item-to-package-btn").onclick=()=>Ad(b=>{const v=o.find(h=>h.id===b.id&&h.type===b.type);v?v.quantity++:o.push({...b,quantity:1}),p(o)}),Ae&&t.removeEventListener("click",Ae),Ae=async b=>{const v=b.target.closest("button[data-action]");if(!v)return;const h=v.dataset.action;if(b.stopPropagation(),h==="close-modal"&&Do(),h==="save-package"){const y=v,w={id:document.getElementById("packageId").value||null,name:document.getElementById("packageName").value,description:document.getElementById("packageDescription").value,status:document.getElementById("packageStatus").value,items:o,originalPrice:o.reduce(($,k)=>$+k.price*k.quantity,0),price:parseFloat(document.getElementById("finalPrice").value),commissionRate:parseFloat(document.getElementById("commissionRate").value)||0,validityDays:parseInt(document.getElementById("validityDays").value,10)||null,establishmentId:u.establishmentId};if(!w.name||!w.price){g("Erro","Nome do Pacote e Preço Final são obrigatórios.","error");return}if(w.items.length===0){g("Erro","Adicione pelo menos um item ao pacote.","error");return}y.disabled=!0,y.textContent="A salvar...";try{a?await En(w.id,w):(delete w.id,await $n(w)),g("Sucesso!",`Pacote ${a?"atualizado":"criado"} com sucesso.`,"success"),Do(),await Ua()}catch($){g("Erro",`Não foi possível salvar o pacote: ${$.message}`,"error"),y.disabled=!1,y.textContent="Salvar Pacote"}}},t.addEventListener("click",Ae)}function Ad(e){let t="";const a=document.createElement("div");a.id="item-selection-modal",a.className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[110]";const o={service:'<svg class="w-6 h-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v4.512a9.04 9.04 0 00-3 5.012M12 12a9.04 9.04 0 01-3-5.012V5l-1-1z" /></svg>',product:'<svg class="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>'},r=d=>{const l=t.toLowerCase(),c=ke.catalogForModal.services.filter(v=>v.name.toLowerCase().includes(l)),m=ke.catalogForModal.products.filter(v=>v.name.toLowerCase().includes(l)),p=c.map(v=>`
            <button data-action="select-item" data-item-type="service" data-item-id="${v.id}" class="flex items-center gap-3 w-full p-3 bg-white border rounded-lg hover:bg-gray-50 transition">
                <div class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gray-100">${o.service}</div>
                <span class="flex-grow text-left min-w-0 truncate">${f(v.name)}</span>
                <span class="font-semibold flex-shrink-0">R$ ${v.price.toFixed(2)}</span>
            </button>
        `).join("")||'<p class="text-xs text-gray-400 text-center p-4">Nenhum serviço encontrado.</p>',b=m.map(v=>`
            <button data-action="select-item" data-item-type="product" data-item-id="${v.id}" class="flex items-center gap-3 w-full p-3 bg-white border rounded-lg hover:bg-gray-50 transition">
                <div class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gray-100">${o.product}</div>
                <span class="flex-grow text-left min-w-0 truncate">${f(v.name)}</span>
                <span class="font-semibold flex-shrink-0">R$ ${v.price.toFixed(2)}</span>
            </button>
        `).join("")||'<p class="text-xs text-gray-400 text-center p-4">Nenhum produto encontrado.</p>';d.innerHTML=`
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><h4 class="font-semibold mb-2 text-center text-indigo-600">Serviços</h4><div id="modal-service-list" class="space-y-2 max-h-96 overflow-y-auto">${p}</div></div>
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
            </div>
        </div>
    `,document.body.appendChild(a);const s=a.querySelector("#item-selection-list"),n=a.querySelector("#item-search-input"),i=()=>{a.remove()};r(s),n.addEventListener("input",()=>{t=n.value,r(s)}),a.addEventListener("click",d=>{const l=d.target.closest('[data-action="select-item"]'),c=d.target.closest('[data-action="close-selection-modal"]');if(l){const{itemType:m,itemId:p}=l.dataset,v=(ke.catalogForModal[m+"s"]||[]).find(h=>h.id===p);v&&(e({...v,type:m}),i())}else(c||d.target===a)&&i()})}async function Ua(){na.innerHTML=`
        <section id="packages-page" class="p-4 sm:p-6">
             <div class="sticky top-0 z-10 bg-gray-100 sm:bg-transparent pt-3 pb-4 mb-6 -mx-4 -mt-4 sm:mx-0 sm:mt-0 sm:bg-transparent sm:pt-0 sm:pb-0 sm:static">
                <div class="flex justify-between items-center px-4 sm:px-0">
                    <h2 class="text-2xl sm:text-3xl font-bold text-gray-800">Pacotes de Serviços</h2>
                </div>
            </div>
            
            <div id="packagesListContainer" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pb-20">
                ${Bd()}
            </div>
            
            <button data-action="new-package" class="fixed z-30 bottom-20 right-4 sm:bottom-6 sm:right-6 w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-transform hover:scale-105">
                <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
            </button>
        </section>
    `,$t&&na.removeEventListener("click",$t),$t=e=>{if(e.target.closest('[data-action-stop-propagation="true"]')){e.stopPropagation();const o=e.target.closest('[data-action="delete-package"]');if(o){const r=o.dataset.id;H("Excluir Pacote","Tem a certeza que deseja excluir este pacote? Esta ação é irreversível.").then(async s=>{if(s)try{await In(r),g("Sucesso!","Pacote excluído.","success"),await Ua()}catch(n){g("Erro",`Não foi possível excluir: ${n.message}`,"error")}})}return}const t=e.target.closest('[data-action="new-package"], [data-action="edit-package"]');if(!t)return;const a=t.dataset.action;if(a==="new-package")Po(null);else if(a==="edit-package"){const o=JSON.parse(t.dataset.package);Po(o)}},na.addEventListener("click",$t);try{const[e,t,a]=await Promise.all([Ba(u.establishmentId),be(u.establishmentId),ut(u.establishmentId)]);ke.allPackages=e,ke.catalogForModal={services:t.filter(o=>o.active),products:a},Md()}catch{document.getElementById("packagesListContainer").innerHTML='<p class="text-red-500 col-span-full">Erro ao carregar pacotes.</p>'}}const qd=document.getElementById("content");let Nd=null;async function Rd(){const e=f(u.userName||"Usuário"),t=f(U.currentUser?.email||"E-mail não disponível"),a=u.userName?u.userName.charAt(0):"U";qd.innerHTML=`
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
    `,await jd()}async function jd(){const e=document.getElementById("professional-agenda-block");e.innerHTML="";try{const t=u.userProfessionalId;if(t){const a=await fr(t);Nd=a,a.photo&&(document.getElementById("user-profile-avatar").src=a.photo);const o=f(a.name);e.innerHTML=`
                <div class="bg-indigo-50 p-4 rounded-lg flex items-center gap-4 mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                        <p class="font-semibold text-indigo-800">Você está associado ao profissional: ${o}</p>
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
            `,Fd(a.id),document.getElementById("my-blocks-filter").addEventListener("change",s=>Ht(a.id,s.target.value)),Ht(a.id,"future")}else e.innerHTML=`
                <div class="bg-gray-100 p-4 rounded-lg text-center text-gray-600">
                    <p>Você não possui um perfil de profissional associado a esta conta.</p>
                    <p class="text-sm mt-2">Para gerenciar sua agenda, peça ao administrador para associar seu usuário a um profissional existente na tela de "Usuários".</p>
                </div>
            `}catch(t){console.error("Erro ao carregar seção de profissional:",t),e.innerHTML=`
            <div class="bg-red-100 p-4 rounded-lg text-red-700">
                <p>Ocorreu um erro ao carregar os dados do profissional.</p>
                <p class="text-sm mt-2">${f(t.message)}</p>
            </div>
        `}}function Fd(e){const t=document.getElementById("block-schedule-form");t.addEventListener("submit",async a=>{a.preventDefault();const o=t.querySelector("#blockDate").value,r=t.querySelector("#blockStartTime").value,s=t.querySelector("#blockEndTime").value,n=t.querySelector("#blockReason").value;if(!o||!r||!s){g("Erro","Por favor, preencha a data e os horários de início e fim.","error");return}if(r>=s){g("Erro","A hora de início deve ser anterior à hora de fim.","error");return}const i=new Date(`${o}T${r}:00`),d=new Date(`${o}T${s}:00`),l=t.querySelector('button[type="submit"]');l.disabled=!0,l.textContent="A bloquear...";try{await _t({establishmentId:u.establishmentId,professionalId:e,reason:n||"Bloqueado (Meu Perfil)",startTime:i.toISOString(),endTime:d.toISOString()}),g("Sucesso","Agenda bloqueada com sucesso!","success"),t.reset();const c=document.getElementById("my-blocks-filter").value;Ht(e,c)}catch(c){console.error("Erro ao bloquear agenda:",c),g("Erro",`Não foi possível bloquear a agenda: ${c.message}`,"error")}finally{l.disabled=!1,l.textContent="Bloquear Agenda"}})}async function Ht(e,t="future"){const a=document.getElementById("my-blocks-list");a.innerHTML='<p class="text-gray-500">A carregar bloqueios...</p>';try{const o=new Date;let r,s;t==="history"?(s=new Date,r=new Date,r.setFullYear(r.getFullYear()-1)):(r=new Date,s=new Date,s.setFullYear(s.getFullYear()+1));let i=(await Ut(u.establishmentId,r.toISOString(),s.toISOString(),e)).map(d=>({...d,startTime:new Date(d.startTime),endTime:new Date(d.endTime)}));t==="history"?i=i.filter(d=>d.endTime<o).sort((d,l)=>l.startTime-d.startTime):i=i.filter(d=>d.endTime>=o).sort((d,l)=>d.startTime-l.startTime),i.length>0?(a.innerHTML=i.map(d=>{const l=d.startTime.toLocaleDateString("pt-BR"),c=`${d.startTime.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})} - ${d.endTime.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}`,m=d.endTime<new Date,p=f(d.reason||"Sem motivo");return`
                    <div class="flex items-center justify-between p-3 ${m?"bg-gray-100 opacity-75":"bg-white border border-gray-200"} rounded-md shadow-sm">
                        <div>
                            <p class="font-semibold text-gray-800">${l} das ${c}</p>
                            <p class="text-sm text-gray-600">${p}</p>
                        </div>
                        <button data-block-id="${d.id}" class="remove-block-btn text-red-500 hover:text-red-700 text-2xl font-bold leading-none p-1" title="Apagar bloqueio">
                            &times;
                        </button>
                    </div>
                `}).join(""),a.querySelectorAll(".remove-block-btn").forEach(d=>{d.addEventListener("click",async l=>{const c=l.currentTarget.dataset.blockId;if(confirm("Tem certeza que deseja remover este bloqueio?"))try{await La(c),g("Sucesso","Bloqueio removido.","success"),Ht(e,t)}catch(m){console.error("Erro ao remover bloqueio:",m),g("Erro",`Não foi possível remover o bloqueio: ${m.message}`,"error")}})})):a.innerHTML=`<p class="text-gray-500 py-4 text-center">Nenhum bloqueio ${t==="history"?"no histórico recente":"futuro agendado"}.</p>`}catch(o){console.error("Erro ao carregar bloqueios:",o),a.innerHTML=`<p class="text-red-500">Erro ao carregar bloqueios: ${f(o.message)}</p>`}}document.addEventListener("DOMContentLoaded",()=>{document.addEventListener("gesturestart",function(t){t.preventDefault()}),document.addEventListener("gesturechange",function(t){t.preventDefault()}),document.addEventListener("gestureend",function(t){t.preventDefault()});let e=0;document.addEventListener("touchend",function(t){const a=new Date().getTime();a-e<=300&&t.preventDefault(),e=a},!1)});const Et=document.getElementById("loadingScreen"),ia=document.getElementById("dashboardContent"),la=document.getElementById("content"),Bo=document.getElementById("notificationBell"),da=document.getElementById("notificationBadge"),It=document.getElementById("notificationPanel"),Mo=document.getElementById("notificationList"),ca=document.getElementById("profileMenuButton"),ae=document.getElementById("profileDropdown"),Hd=document.getElementById("profileName"),Od=document.getElementById("profileEmail"),zd=document.getElementById("logoutButton"),Ao=document.getElementById("myProfileLink"),qo=document.getElementById("hamburger-menu-btn"),ye=document.getElementById("sidebar"),qe=document.getElementById("mobile-overlay"),No={indigo:{main:"#4f46e5",hover:"#4338ca",light:"#e0e7ff",text:"#ffffff"},blue:{main:"#2563eb",hover:"#1d4ed8",light:"#dbeafe",text:"#ffffff"},sky:{main:"#0284c7",hover:"#0369a1",light:"#e0f2fe",text:"#ffffff"},teal:{main:"#0d9488",hover:"#0f766e",light:"#ccfbf1",text:"#ffffff"},emerald:{main:"#059669",hover:"#047857",light:"#d1fae5",text:"#ffffff"},green:{main:"#16a34a",hover:"#15803d",light:"#dcfce7",text:"#ffffff"},lime:{main:"#65a30d",hover:"#4d7c0f",light:"#ecfccb",text:"#ffffff"},amber:{main:"#d97706",hover:"#b45309",light:"#fef3c7",text:"#1f2937"},orange:{main:"#ea580c",hover:"#c2410c",light:"#ffedd5",text:"#ffffff"},red:{main:"#dc2626",hover:"#b91c1c",light:"#fee2e2",text:"#ffffff"},rose:{main:"#e11d48",hover:"#be123c",light:"#ffe4e6",text:"#ffffff"},pink:{main:"#db2777",hover:"#be185d",light:"#fce7f3",text:"#ffffff"},fuchsia:{main:"#c026d3",hover:"#a21caf",light:"#fae8ff",text:"#ffffff"},purple:{main:"#7c3aed",hover:"#6d28d9",light:"#ede9fe",text:"#ffffff"},violet:{main:"#8b5cf6",hover:"#7c3aed",light:"#ddd6fe",text:"#ffffff"},gray:{main:"#4b5563",hover:"#374151",light:"#f3f4f6",text:"#ffffff"},black:{main:"#111827",hover:"#000000",light:"#e5e7eb",text:"#ffffff"}};let rt=null,nt=[];const Vd={"agenda-section":cs,"comandas-section":zn,"relatorios-section":oi,"servicos-section":$i,"produtos-section":Fi,"suppliers-section":Gi,"profissionais-section":qt,"clientes-section":vl,"estabelecimento-section":As,"ausencias-section":jl,"users-section":Nt,"sales-report-section":td,"financial-section":sd,"commissions-section":xd,"packages-section":Ua,"my-profile-section":Rd};function Ud(e){const t=No[e]||No.indigo,o=(s=>{const n=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(s);return n?`${parseInt(n[1],16)}, ${parseInt(n[2],16)}, ${parseInt(n[3],16)}`:"79, 70, 229"})(t.main);document.body.style.setProperty("--theme-main",t.main);const r=document.getElementById("dynamic-theme-styles");r.innerHTML=`
        :root {
            --theme-color-main: ${t.main};
            --theme-color-hover: ${t.hover};
            --theme-color-light: ${t.light};
            --theme-rgb: ${o};
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
    `}function Sa(){const e=nt.filter(t=>!t.read).length;if(e>0?(da.textContent=e,da.classList.remove("hidden")):da.classList.add("hidden"),nt.length===0){Mo.innerHTML='<p class="text-center text-gray-500 p-4">Nenhuma notificação.</p>';return}Mo.innerHTML=nt.map(t=>`
    <div class="notification-item ${t.read?"":"unread"}">
    <p class="font-semibold">${t.title}</p>
    <p class="text-sm text-gray-600">${t.message}</p>
    <p class="text-xs text-gray-400 mt-1">${t.time}</p>
    </div>
    `).join("")}function _d(e){rt&&rt();const t=ge(W,"establishments",e,"notifications"),a=Ot(t,it("timestamp",">=",new Date),Ho("timestamp","desc"));rt=Xs(a,o=>{o.docChanges().forEach(r=>{if(r.type==="added"){const s=r.doc.data();nt.unshift({title:s.title,message:s.message,time:s.timestamp.toDate().toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),read:!1}),g(s.title,s.message,"info",!0),Sa();const n=document.querySelector(".sidebar-link.active");n&&n.dataset.target==="agenda-section"&&(s.type==="cancellation"||s.type==="new_appointment")&&(console.log("Atualizando agenda em tempo real..."),cs())}})},o=>{console.error("Erro no listener de notificações em tempo real:",o)})}function K(e,t={}){const a=e.replace("-section","");if(e!=="my-profile-section"){const r=u.enabledModules?.[a]!==!1,s=u.userPermissions===null||u.userPermissions[e]?.view===!0;if(!r||!s){la.innerHTML='<div class="p-8 text-center"><h2 class="text-2xl font-bold text-red-600">Acesso Negado</h2><p class="text-gray-600">Você não tem permissão para visualizar este módulo.</p></div>',document.querySelectorAll(".sidebar-link").forEach(n=>n.classList.remove("active")),ye.classList.contains("absolute")&&(ye.classList.add("hidden"),qe.classList.add("hidden"));return}}const o=Vd[e];o?(document.querySelectorAll(".sidebar-link").forEach(r=>{r.classList.toggle("active",r.getAttribute("data-target")===e)}),e==="my-profile-section"&&document.querySelectorAll(".sidebar-link").forEach(r=>r.classList.remove("active")),la.innerHTML="",window.innerWidth<768&&(ye.classList.add("hidden"),qe.classList.add("hidden")),o(t)):la.innerHTML=`<div class="p-8 text-center"><h2 class="text-2xl font-bold">Página em Construção</h2><p class="text-gray-600">O módulo para "${e}" ainda não foi implementado.</p></div>`}async function Wd(e){const t=document.getElementById("kpi-appointments-wrapper"),a=document.getElementById("kpi-financial-wrapper"),o=document.getElementById("kpi-today-appointments"),r=document.getElementById("kpi-today-revenue"),s=e===null||e["agenda-section"]?.view===!0,n=e===null||e["financial-section"]?.view===!0;if(s&&t&&(t.classList.remove("hidden"),t.classList.add("inline-flex")),n&&a&&(a.classList.remove("hidden"),a.classList.add("inline-flex")),!(!s&&!n))try{const i=await Wr();s&&o&&(o.textContent=i.todayAppointments.toString()),n&&r&&(r.textContent=`R$ ${i.todayRevenue.toFixed(2).replace(".",",")}`)}catch(i){console.error("Erro ao carregar KPIs do cabeçalho:",i)}}async function Jd(e){try{console.log("[Nativo] Iniciando configuração de Push..."),se.getPlatform()==="android"&&(await G.createChannel({id:"default",name:"Notificações Gerais",description:"Alertas de agendamentos e avisos",importance:5,visibility:1,vibration:!0}),console.log("Canal Android criado."));let t=await G.checkPermissions();if(t.receive==="prompt"&&(t=await G.requestPermissions()),t.receive!=="granted")return;await G.register(),G.addListener("registration",async a=>{console.log("Push Token gerado:",a.value);try{const o=pe(W,"users",e);await $a(o,{fcmTokens:Qs(a.value),platform:"native_mobile"}),console.log("Token FCM salvo no perfil do utilizador (Nativo).")}catch(o){console.error("Erro ao salvar token FCM:",o)}}),G.addListener("registrationError",a=>{console.error("Erro no registo de push notifications:",a)}),G.addListener("pushNotificationReceived",a=>{console.log("Notificação Push recebida:",a),g(a.title,a.body,"info",!0)}),G.addListener("pushNotificationActionPerformed",a=>{console.log("Ação na notificação push:",a),K("agenda-section")})}catch(t){console.log("Push Notifications não suportado/inicializado:",t)}}function Gd(){const e=document.getElementById("exitConfirmationModal"),t=document.getElementById("btn-cancel-exit"),a=document.getElementById("btn-confirm-exit"),o=()=>e.style.display="block",r=()=>e.style.display="none",s=()=>e.style.display==="block";e&&(t.addEventListener("click",()=>{r(),se.isNativePlatform()||history.pushState(null,document.title,location.href)}),a.addEventListener("click",()=>{r(),se.isNativePlatform()?oo.exitApp():history.back()}),se.isNativePlatform()?oo.addListener("backButton",({canGoBack:n})=>{if(s())r();else{const i=document.querySelectorAll('.modal[style*="display: block"]'),d=Array.from(i).filter(m=>m.id!=="exitConfirmationModal");if(d.length>0){d.forEach(m=>m.style.display="none");return}const l=document.getElementById("sidebar");if(l&&!l.classList.contains("hidden")&&window.innerWidth<768){l.classList.add("hidden"),document.getElementById("mobile-overlay").classList.add("hidden");return}const c=document.querySelector(".sidebar-link.active");c&&c.getAttribute("data-target")==="agenda-section"?o():K("agenda-section")}}):(history.pushState(null,document.title,location.href),window.addEventListener("popstate",n=>{if(s()){r(),history.pushState(null,document.title,location.href);return}const i=document.querySelectorAll('.modal[style*="display: block"], .modal[style*="display: flex"]'),d=Array.from(i).filter(c=>c.id!=="exitConfirmationModal");if(d.length>0){d.forEach(c=>c.style.display="none"),history.pushState(null,document.title,location.href);return}const l=document.querySelector(".sidebar-link.active");l&&l.getAttribute("data-target")==="agenda-section"?o():(K("agenda-section"),history.pushState(null,document.title,location.href))})))}async function Yd(){try{await Ws(U,Js),console.log("Persistência LOCAL configurada na inicialização.")}catch(e){console.error("Erro ao definir persistência no main.js",e)}se.isNativePlatform()&&(document.body.classList.add("is-app-native"),console.log("Modo App Nativo detectado: Layout ajustado para Safe Areas.")),dr(),Gd(),qo&&qo.addEventListener("click",e=>{e.stopPropagation(),ye.classList.remove("hidden"),ye.classList.add("absolute","inset-y-0","left-0","z-40","shadow-xl"),qe.classList.remove("hidden")}),qe&&qe.addEventListener("click",()=>{ye.classList.add("hidden"),ye.classList.remove("absolute","inset-y-0","left-0","z-40","shadow-xl"),qe.classList.add("hidden")}),Bo.addEventListener("click",e=>{e.stopPropagation(),It.classList.toggle("hidden"),It.classList.contains("hidden")||(nt.forEach(t=>t.read=!0),Sa())}),ca.addEventListener("click",e=>{e.stopPropagation(),ae.classList.toggle("active"),ae.classList.contains("active")?ae.classList.remove("hidden"):setTimeout(()=>ae.classList.add("hidden"),200)}),Ao&&Ao.addEventListener("click",e=>{e.preventDefault(),K("my-profile-section"),ae.classList.remove("active"),ae.classList.add("hidden")}),document.addEventListener("click",e=>{!It.contains(e.target)&&e.target!==Bo&&It.classList.add("hidden"),!ae.contains(e.target)&&e.target!==ca&&ae.classList.contains("active")&&(ae.classList.remove("active"),setTimeout(()=>ae.classList.add("hidden"),200))}),Ro(U,async e=>{if(e){if(console.log("Usuário detectado:",e.email),!se.isNativePlatform()&&(console.log("Inicializando Web Push (PWA)..."),Yo(),"Notification"in window&&Notification.permission==="default")){const t=document.getElementById("toast-notification-request"),a=document.getElementById("btn-enable-toast"),o=document.getElementById("btn-deny-toast"),r=document.getElementById("btn-close-toast");setTimeout(()=>{t&&(t.style.display="block")},3500),a&&a.addEventListener("click",async()=>{await Qo()&&t&&(t.style.display="none")});const s=()=>{t&&(t.style.display="none")};o&&o.addEventListener("click",s),r&&r.addEventListener("click",s)}try{const a=(await e.getIdTokenResult(!0)).claims;if((a.role==="owner"||a.role==="employee")&&a.establishmentId){const o=await Ee(a.establishmentId);u.enabledModules=o.modules,Ud(o.themeColor||"indigo");let r=null,s=e.displayName,n=null;if(a.role==="employee"||a.role==="owner"){const l=pe(W,"users",e.uid),c=await jo(l);if(c.exists()){const m=c.data();r=a.role==="employee"?m.permissions||{}:null,s=m.name||s,n=m.professionalId||null}else if(a.role==="employee")throw new Error("Dados de permissão do funcionário não encontrados.")}u.userProfessionalId=n,se.isNativePlatform()&&Jd(e.uid);const i=s||e.email;er(a.establishmentId,o.name,r),ca.textContent=i.charAt(0).toUpperCase(),Hd.textContent=i,Od.textContent=e.email;const d=()=>{rt&&rt(),Wa(U).then(()=>window.location.href="/login.html")};zd.addEventListener("click",l=>{l.preventDefault(),d()}),pr(K,r,u.enabledModules),Wd(r),_d(a.establishmentId),Sa(),Et.classList.add("fade-out"),ia.style.display="flex",setTimeout(()=>{Et.style.display="none"},500),console.log("Verificando Onboarding..."),setTimeout(()=>{Cr()},1500),K("agenda-section")}else throw new Error("Utilizador não tem permissão de 'owner' ou 'employee' ou 'establishmentId'.")}catch(t){console.error("Erro crítico na inicialização do painel:",t),Et.classList.add("fade-out"),setTimeout(()=>{Et.style.display="none"},500),ia.innerHTML=`
                    <div class="w-full h-full flex flex-col items-center justify-center bg-gray-100 p-4">
                        <h2 class="text-2xl font-bold text-red-600 mb-4">Erro de Acesso</h2>
                        <p class="text-gray-700 text-center mb-6">Não foi possível carregar os seus dados ou permissões. Isto pode acontecer se a sua conta foi desativada ou está configurada incorretamente.</p>
                        <p class="text-sm text-gray-500 mb-6">Detalhe do erro: ${t.message}</p>
                        <button id="errorLogoutButton" class="bg-red-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-red-700">Sair e Tentar Novamente</button>
                    </div>
                `,ia.style.display="flex",document.getElementById("errorLogoutButton").addEventListener("click",()=>{Wa(U).then(()=>window.location.href="/login.html")})}}else window.location.href="/login.html"})}Yd();Ro(U,async e=>{if(e){await Yo();const a="Notification"in window&&Notification.permission==="default",o=window.Capacitor&&window.Capacitor.isNativePlatform();if(a&&!o){const r=document.getElementById("toast-notification-request"),s=document.getElementById("btn-enable-toast"),n=document.getElementById("btn-deny-toast"),i=document.getElementById("btn-close-toast");setTimeout(()=>{r&&(r.style.display="block")},3500),s&&s.addEventListener("click",async()=>{await Qo()&&r&&(r.style.display="none")});const d=()=>{r&&(r.style.display="none")};n&&n.addEventListener("click",d),i&&i.addEventListener("click",d)}}});export{Go as W};
