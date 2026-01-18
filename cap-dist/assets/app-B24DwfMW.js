const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/web-BMmM4dVX.js","assets/modulepreload-polyfill-B5Qt9EMX.js","assets/firebase-config-C2tbVz-J.js","assets/styles-C2XZ_b0c.css"])))=>i.map(i=>d[i]);
import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css               */import{a as U,d as _,m as Vo}from"./firebase-config-C2tbVz-J.js";import{EmailAuthProvider as qs,reauthenticateWithCredential as Ns,verifyBeforeUpdateEmail as Rs,updatePassword as js,updateProfile as Fs,setPersistence as Hs,browserLocalPersistence as Os,onAuthStateChanged as Aa,signOut as Uo}from"https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";import{doc as pe,getDoc as qa,updateDoc as wo,setDoc as zs,addDoc as Na,collection as ge,query as Ft,where as it,getDocs as ko,orderBy as Ra,writeBatch as ja,serverTimestamp as _o,deleteDoc as Vs,arrayUnion as Us,onSnapshot as _s}from"https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";import{getToken as Ws,onMessage as Js}from"https://www.gstatic.com/firebasejs/11.6.1/firebase-messaging.js";import"https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";import"https://www.gstatic.com/firebasejs/11.6.1/firebase-storage.js";const m={establishmentId:null,establishmentName:null,userName:null,userProfessionalId:null,userPermissions:null,establishmentSettings:null,enabledModules:{agenda:!0,comandas:!0,relatorios:!0,commissions:!0,packages:!0,financial:!0,servicos:!0,produtos:!0,profissionais:!0,clientes:!0,users:!0,estabelecimento:!0},professionals:[],services:[],professionalColors:new Map,allEvents:[]};function Gs(e,t,o){m.establishmentId=e,m.establishmentName=t,m.userPermissions=o}const Fa=window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1",lo=Fa?"http://localhost:8080":"https://kairos-app-407358446276.us-central1.run.app";console.log(`🚀 API configurada para modo: ${Fa?"LOCAL (Dev)":"PRODUÇÃO (Cloud)"}`);console.log("📡 URL Base:",lo);async function Ys(){const e=U.currentUser;return e?{"Content-Type":"application/json",Authorization:`Bearer ${await e.getIdToken()}`}:(console.warn("Usuário não logado, tentando redirecionar para /login"),window.location.href="/login",null)}async function I(e,t={}){const o=await Ys();if(!o)throw new Error("Utilizador não autenticado. A requisição foi cancelada.");const a=lo.replace(/\/$/,""),r=e.startsWith("/")?e:`/${e}`,s=`${a}${r}`;console.log(`AuthenticatedFetch: ${t.method||"GET"} ${s}`);try{const n=await fetch(s,{...t,headers:{...o,...t.headers}});if(!n.ok){const l=(await n.json().catch(()=>({message:n.statusText}))).message||`Erro na API: ${n.status}`;if(l.includes("FAILED_PRECONDITION")&&l.includes("requires an index")){const d=/(https:\/\/[^\s]+)/,c=l.match(d),u=c?c[0]:"URL não encontrada na mensagem de erro.";console.warn(`%c AVISO IMPORTANTE (FIREBASE): ÍNDICE NECESSÁRIO! %c
                    
Sua consulta em '${e}' falhou porque um índice composto do Firestore é necessário.
Para corrigir isso, clique no link abaixo (com o Firebase logado) e crie o índice:
                    
%c${u}%c
                    
--------------------------------------------------------------------`,"background-color: #ffc; color: #663300; font-size: 14px; font-weight: bold; padding: 5px;","color: #663300; font-size: 12px;","color: #0000ff; font-size: 12px; font-weight: bold; text-decoration: underline;","color: #663300; font-size: 12px;")}throw console.error(`Erro na API (${n.status}) em ${s}:`,l),new Error(l)}return n.json()}catch(n){throw console.error(`Falha de rede ao tentar acessar ${s}:`,n.message),n.message.includes("Failed to fetch")||n.message.includes("NetworkError")?new Error(`Não foi possível conectar ao servidor em ${lo}. Verifique se o servidor backend está rodando.`):n}}const Ha=(e,t,o,a=null)=>{let r=`/api/appointments/${e}?startDate=${t}&endDate=${o}`;return a&&(r+=`&professionalId=${a}`),I(r)},Qs=({establishmentId:e,professionalId:t,serviceIds:o,date:a})=>{const r=`/api/availability?establishmentId=${e}&professionalId=${t}&serviceIds=${o.join(",")}&date=${a}`;return I(r)},Xs=e=>I("/api/appointments",{method:"POST",body:JSON.stringify(e)}),Zs=(e,t)=>I(`/api/appointments/${e}`,{method:"PUT",body:JSON.stringify(t)}),Wo=e=>I(`/api/appointments/${e}`,{method:"DELETE"}),Ks=e=>I(`/api/appointments/${e}/reopen`,{method:"POST"}),er=(e,t)=>I(`/api/appointments/${e}/checkout`,{method:"POST",body:JSON.stringify(t)});let W;async function tr(){if(!W)try{W=new(window.AudioContext||window.webkitAudioContext)}catch(e){console.error("Não foi possível inicializar o áudio:",e)}}function or(){if(!W){console.warn("AudioContext não inicializado. O som não será tocado.");return}W.state==="suspended"&&W.resume();const e=W.createOscillator(),t=W.createGain();e.connect(t),t.connect(W.destination),e.type="sine",e.frequency.setValueAtTime(800,W.currentTime),t.gain.setValueAtTime(0,W.currentTime),t.gain.linearRampToValueAtTime(.3,W.currentTime+.01),t.gain.exponentialRampToValueAtTime(1e-4,W.currentTime+.2),e.start(W.currentTime),e.stop(W.currentTime+.2)}function p(e,t,o="info",a=!1){const r=document.getElementById("toast-container");if(!r)return;a&&or();const s=document.createElement("div"),n={success:"bg-green-50 border-green-400 text-green-700",error:"bg-red-50 border-red-400 text-red-700",info:"bg-blue-50 border-blue-400 text-blue-700"},i={success:'<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',error:'<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',info:'<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>'},l={success:"bg-green-500",error:"bg-red-500",info:"bg-blue-500"};s.className=`toast ${n[o]||n.info}`,s.innerHTML=`
        <div class="toast-icon">${i[o]||i.info}</div>
        <div class="toast-content">
            <p class="font-bold">${e}</p>
            <p class="text-sm">${t}</p>
        </div>
        <button class="toast-close">&times;</button>
        <div class="toast-progress-bar">
            <div class="toast-progress ${l[o]||l.info}"></div>
        </div>
    `,r.appendChild(s),s.querySelector(".toast-close").addEventListener("click",()=>s.remove()),setTimeout(()=>{s.remove()},4e3)}function H(e,t){const o=document.getElementById("genericModal");return new Promise(a=>{o.innerHTML=`
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
            </div>`,o.style.display="flex",document.getElementById("genericModalConfirmBtn").onclick=()=>{o.style.display="none",a(!0)},document.getElementById("genericModalCancelBtn").onclick=()=>{o.style.display="none",a(!1)}})}function Y({title:e,contentHTML:t,maxWidth:o="max-w-4xl",showCloseButton:a=!0}){let r=document.getElementById("genericModal");const s=r.cloneNode(!1);r.parentNode.replaceChild(s,r),r=s;const n=()=>{r.style.display="none"},i=c=>{r.querySelector("#genericModalContentBody").innerHTML=c};r.innerHTML=`
        <div class="modal-content ${o} p-0 rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[95vh]">
            
            <header class="p-5 border-b flex justify-between items-center bg-gray-50">
                <h2 class="text-xl font-bold text-gray-800">${e}</h2>
                ${a?'<button data-close-modal class="text-2xl font-bold text-gray-500 hover:text-gray-900">&times;</button>':""}
            </header>

            <div id="genericModalContentBody" class="flex-1 overflow-y-auto p-5">
                ${t}
            </div>
            
            <footer id="genericModalFooter" class="hidden"></footer>
        </div>
    `;const l=r.querySelector("[data-close-modal]");l&&(l.onclick=n);const d=r.querySelector('[data-action="close-modal"]');return d&&(d.onclick=n),r.addEventListener("click",c=>{c.target.closest(".modal-content")||n()}),r.style.display="flex",{modalElement:r,close:n,setContent:i}}function Ht(e){const t=document.getElementById(e);t&&(t.style.display="none")}function ar(){document.body.addEventListener("click",()=>{W||tr()},{once:!0}),document.addEventListener("click",e=>{const t=e.target.closest('[data-action="close-modal"]');if(t){const a=t.dataset.target;if(a){const r=document.getElementById(a);r&&(r.style.display="none")}}if(e.target.closest("[data-close-modal]")){const a=document.getElementById("genericModal");a&&(a.style.display="none")}})}const X=document.getElementById("sidebar"),Jo=document.getElementById("sidebarToggle"),Ke=document.getElementById("mainContent"),sr=document.querySelectorAll(".sidebar-link"),Go=document.getElementById("hamburger-menu-btn"),Oe=document.getElementById("mobile-overlay");function $t(e){!X||!Ke||(X.classList.toggle("collapsed",e),Ke.classList.toggle("sidebar-collapsed-shift",e))}function rr(){!X||!Oe||(X.classList.add("mobile-open"),Oe.classList.add("visible"))}function bt(){!X||!Oe||(X.classList.remove("mobile-open"),Oe.classList.remove("visible"))}function nr(){$t(!X.classList.contains("collapsed"))}function ir(e,t,o){if(!X||!Ke)return;Ke.classList.add("main-content-shift"),window.innerWidth>=768?$t(X.classList.contains("collapsed")):(Ke.classList.remove("main-content-shift","sidebar-collapsed-shift"),bt()),Jo&&Jo.addEventListener("click",r=>{r.stopPropagation(),nr()}),X.addEventListener("mouseenter",()=>{window.innerWidth>=1024&&X.classList.contains("collapsed")&&$t(!1)}),X.addEventListener("mouseleave",()=>{window.innerWidth>=1024&&(document.querySelector("#sidebarToggle:hover")||$t(!0))}),Go&&Go.addEventListener("click",r=>{r.stopPropagation(),rr()}),Oe&&Oe.addEventListener("click",r=>{r.stopPropagation(),bt()});let a=0;X.addEventListener("touchstart",r=>{a=r.changedTouches[0].screenX},{passive:!0}),X.addEventListener("touchend",r=>{const s=r.changedTouches[0].screenX;a-s>50&&bt()},{passive:!0}),sr.forEach(r=>{const s=r.getAttribute("data-target"),n=s.replace("-section",""),i=o?.[n]!==!1,l=t===null||t[s]?.view===!0;if(!i||!l){r.style.display="none";return}r.style.display="flex",r.addEventListener("click",d=>{d.preventDefault(),s&&typeof e=="function"&&e(s),window.innerWidth<768&&bt()})})}const Ie=e=>{const t=e||m.establishmentId;return t?I(`/api/establishments/${t}`):Promise.reject(new Error("ID do estabelecimento não fornecido."))},Et=(e,t)=>{const o=e||m.establishmentId;return o?I(`/api/establishments/${o}`,{method:"PUT",body:JSON.stringify(t)}):Promise.reject(new Error("ID do estabelecimento não fornecido."))},lr=(e,t)=>{const o=e||m.establishmentId;return o?I(`/api/establishments/${o}/booking-status`,{method:"PATCH",body:JSON.stringify({publicBookingEnabled:t})}):Promise.reject(new Error("ID do estabelecimento não fornecido."))},dr=(e,t)=>{const o=e||m.establishmentId;return o?I(`/api/establishments/${o}/owner-email`,{method:"PATCH",body:JSON.stringify({newEmail:t})}):Promise.reject(new Error("ID do estabelecimento não fornecido."))},K=e=>I(`/api/professionals/${e}`),cr=e=>I(`/api/professionals/details/${e}`),Oa=e=>I("/api/professionals",{method:"POST",body:JSON.stringify(e)}),Tt=(e,t)=>I(`/api/professionals/${e}`,{method:"PUT",body:JSON.stringify(t)}),Yo=(e,t)=>Tt(e,{services:t}),za=e=>I(`/api/professionals/${e}`,{method:"DELETE"}),ur=e=>{const t=e.map(o=>za(o));return Promise.all(t)},be=e=>I(`/api/services/${e}`),Va=e=>I("/api/services",{method:"POST",body:JSON.stringify(e)}),mr=(e,t)=>I(`/api/services/${e}`,{method:"PUT",body:JSON.stringify(t)}),pr=e=>I(`/api/services/${e}`,{method:"DELETE"}),gr=(e,t)=>I(`/api/services/${e}/status`,{method:"PATCH",body:JSON.stringify({active:t})}),br=e=>I(`/api/services/stats/most-popular/${e}`),ut=e=>I(`/api/products/${e}`),Ua=e=>I("/api/products",{method:"POST",body:JSON.stringify(e)}),fr=(e,t)=>I(`/api/products/${e}`,{method:"PUT",body:JSON.stringify(t)}),vr=e=>I(`/api/products/${e}`,{method:"DELETE"}),hr=(e,t)=>I(`/api/products/${e}/stock`,{method:"PATCH",body:JSON.stringify(t)}),xr=({startDate:e,endDate:t,productId:o,categoryId:a,establishmentId:r})=>{const s=new URLSearchParams({startDate:e,endDate:t});return o&&o!=="all"&&s.append("productId",o),a&&a!=="all"&&s.append("categoryId",a),r&&s.append("establishmentId",r),I(`/api/products/stock-history/report?${s.toString()}`)},yr={indigo:{name:"Padrão (Índigo)",main:"#4f46e5"},blue:{name:"Azul",main:"#2563eb"},sky:{name:"Céu",main:"#0284c7"},teal:{name:"Verde Água",main:"#0d9488"},emerald:{name:"Esmeralda",main:"#059669"},green:{name:"Verde",main:"#16a34a"},lime:{name:"Lima",main:"#65a30d"},amber:{name:"Âmbar",main:"#d97706"},orange:{name:"Laranja",main:"#ea580c"},red:{name:"Vermelho",main:"#dc2626"},rose:{name:"Rosa",main:"#e11d48"},pink:{name:"Pink",main:"#db2777"},fuchsia:{name:"Fúcsia",main:"#c026d3"},purple:{name:"Roxo",main:"#7c3aed"},violet:{name:"Violeta",main:"#8b5cf6"},gray:{name:"Cinza",main:"#4b5563"},black:{name:"Preto",main:"#111827"}};function Qo(e,t,o){return new Promise((a,r)=>{const s=new FileReader;s.readAsDataURL(e),s.onload=n=>{const i=new Image;i.src=n.target.result,i.onload=()=>{const l=document.createElement("canvas");let d=i.width,c=i.height;d>t&&(c*=t/d,d=t),l.width=d,l.height=c,l.getContext("2d").drawImage(i,0,0,d,c);const g=e.type==="image/png"&&t<500?"image/png":"image/jpeg";a(l.toDataURL(g,o))},i.onerror=l=>r(l)},s.onerror=n=>r(n)})}let ue=null;const It=[{id:"company_data",title:"Identidade do Negócio",icon:"🏢",description:"Configure os dados da sua empresa."},{id:"branding",title:"Sua Marca",icon:"🎨",description:"Logo e cores (Opcional)."},{id:"time_config",title:"O Relógio",icon:"⏱️",description:"Tempo padrão entre agendamentos."},{id:"first_service",title:"O Menu",icon:"✂️",description:"Seu principal serviço."},{id:"first_prof",title:"Sua Equipe",icon:"💇",description:"Cadastre o primeiro profissional."},{id:"first_product",title:"O Estoque",icon:"🧴",description:"Cadastre um produto (opcional)."}];let ee=0,Pt=[];async function wr(){try{console.log("Iniciando verificação de Onboarding para ID:",m.establishmentId);const e=await Ie(m.establishmentId),t=await K(m.establishmentId),o=await be(m.establishmentId);Pt=o||[];const a=e&&e.name&&(e.phone||e.address),r=e&&(e.logo||e.themeColor&&e.themeColor!=="indigo"),s=e&&e.slotInterval>0,n=o&&o.length>0,i=t&&t.length>0;if(console.log("Status Onboarding:",{hasCompanyData:a,hasBranding:r,hasTimeConfig:s,hasService:n,hasProf:i}),a&&s&&i&&n)return;if(!a)ee=0;else if(!r&&!s)ee=1;else if(!s)ee=2;else if(!n)ee=3;else if(!i)ee=4;else if(ee===0)return;kr(),$o(ee)}catch(e){console.error("Erro ao verificar onboarding:",e)}}function kr(){document.getElementById("onboarding-overlay")||(ue=document.createElement("div"),ue.id="onboarding-overlay",ue.className="fixed inset-0 bg-gray-900 bg-opacity-95 z-[9999] flex items-center justify-center p-4 overflow-y-auto",ue.style.cssText="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background-color: rgba(17, 24, 39, 0.95); z-index: 9999; display: flex; align-items: center; justify-content: center;",ue.innerHTML=`
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
    `,document.body.appendChild(ue),So())}function So(){const e=Math.round(ee/It.length*100),t=document.getElementById("progress-bar"),o=document.getElementById("progress-text");t&&(t.style.width=`${e}%`),o&&(o.innerText=`${e}%`)}function $o(e){const t=document.getElementById("onboarding-step-content"),o=It[e];if(!o){Xo(t);return}let a="";if(o.id==="company_data")a=`
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
        `;else if(o.id==="branding")a=`
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
                            ${Object.entries(yr).map(([s,n])=>`<option value="${s}">${n.name}</option>`).join("")}
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
        `;else if(o.id==="time_config")a=`
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
        `;else if(o.id==="first_service")a=`
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
        `;else if(o.id==="first_prof"){const r=Pt.map(n=>`<option value="${n.id}">${n.name}</option>`).join(""),s=Pt.length>0;a=`
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
                ${s?`
                <div>
                    <label class="block text-xs font-bold text-gray-700 uppercase">Serviço Principal</label>
                    <select name="serviceId" class="mt-1 w-full p-2 border rounded text-sm bg-white">
                        ${r}
                    </select>
                </div>
                `:""}
            </form>
        `}else o.id==="first_product"&&(a=`
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
            <span class="text-3xl mr-3">${o.icon}</span>
            <div>
                <h3 class="text-lg font-bold text-gray-800">${o.title}</h3>
                <p class="text-gray-500 text-xs">${o.description}</p>
            </div>
        </div>
        
        ${a}

        <div class="mt-6 flex justify-end gap-2">
            ${o.id==="first_product"||o.id==="branding"?'<button type="button" id="skip-btn" class="text-gray-500 hover:text-gray-700 font-medium text-sm px-3 py-2">Pular</button>':""}
            <button type="button" id="next-step-btn" class="bg-indigo-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-indigo-700 transition flex items-center gap-2 text-sm">
                ${e===It.length-1?"Concluir":"Próximo"}
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
            </button>
        </div>
    `,document.getElementById("next-step-btn").addEventListener("click",()=>Sr(o.id)),document.getElementById("skip-btn")&&document.getElementById("skip-btn").addEventListener("click",()=>{e===It.length-1?Xo(t):(ee++,So(),$o(ee))}),o.id==="branding"){const r=document.getElementById("logo-input"),s=document.getElementById("bg-input");r&&(r.onchange=async n=>{const i=n.target.files[0];if(i)try{const l=await Qo(i,200,.8);document.getElementById("logo-base64").value=l,document.getElementById("logo-preview").innerHTML=`<img src="${l}" class="w-full h-full object-contain rounded">`}catch(l){console.error("Erro logo",l)}}),s&&(s.onchange=async n=>{const i=n.target.files[0];if(i)try{const l=await Qo(i,1024,.7);document.getElementById("bg-base64").value=l}catch(l){console.error("Erro bg",l)}})}}function Xo(e){e.innerHTML=`
        <div class="text-center py-6">
            <div class="text-5xl mb-3">🏆</div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">Tudo Pronto!</h3>
            <p class="text-gray-600 text-sm mb-6">Seu sistema está configurado. Boas vendas!</p>
            <button id="finish-onboarding-btn" class="bg-indigo-600 text-white font-bold py-2 px-6 rounded-full hover:bg-indigo-700 transition shadow-lg transform hover:scale-105 text-sm">
                Acessar Painel
            </button>
        </div>
    `;const t=document.getElementById("progress-bar"),o=document.getElementById("progress-text");t&&(t.style.width="100%"),o&&(o.innerText="100%"),document.getElementById("finish-onboarding-btn").onclick=()=>{ue&&ue.remove(),window.location.reload()}}async function Sr(e){const t=document.getElementById("step-form");if(!t.reportValidity())return;const o=document.getElementById("next-step-btn"),a=o.innerHTML;o.disabled=!0,o.innerHTML="Salvando...";const r=new FormData(t),s=Object.fromEntries(r.entries());try{if(e==="company_data")await Et(m.establishmentId,{name:s.name,phone:s.phone,email:s.email,address:s.address,zipCode:s.zipCode});else if(e==="branding"){const n={};s.logoBase64&&(n.logo=s.logoBase64),s.bgBase64&&(n.backgroundImage=s.bgBase64),s.themeColor&&(n.themeColor=s.themeColor),s.primaryColor&&(n.primaryColor=s.primaryColor),Object.keys(n).length>0&&await Et(m.establishmentId,n)}else if(e==="time_config"){const n=parseInt(s.slotInterval);await Et(m.establishmentId,{slotInterval:n})}else if(e==="first_service"){const n=await Va({establishmentId:m.establishmentId,name:s.name,price:parseFloat(s.price),duration:parseInt(s.duration),active:!0});n&&Pt.push(n)}else if(e==="first_prof"){const n=await Oa({establishmentId:m.establishmentId,name:s.name,specialty:s.role,active:!0,commissionRate:0});if(s.serviceId&&n&&n.id)try{Yo?await Yo(n.id,[s.serviceId]):Tt&&await Tt(n.id,{services:[s.serviceId]})}catch(i){console.warn("Não foi possível vincular o serviço automaticamente.",i)}}else e==="first_product"&&await Ua({establishmentId:m.establishmentId,name:s.name,price:parseFloat(s.salePrice),stock:parseInt(s.stock),active:!0});p("Sucesso","Passo concluído!","success"),ee++,So(),$o(ee)}catch(n){p("Erro","Erro ao salvar: "+n.message,"error"),o.disabled=!1,o.innerHTML=a}}var ze;(function(e){e.Unimplemented="UNIMPLEMENTED",e.Unavailable="UNAVAILABLE"})(ze||(ze={}));class Zt extends Error{constructor(t,o,a){super(t),this.message=t,this.code=o,this.data=a}}const $r=e=>{var t,o;return e?.androidBridge?"android":!((o=(t=e?.webkit)===null||t===void 0?void 0:t.messageHandlers)===null||o===void 0)&&o.bridge?"ios":"web"},Er=e=>{const t=e.CapacitorCustomPlatform||null,o=e.Capacitor||{},a=o.Plugins=o.Plugins||{},r=()=>t!==null?t.name:$r(e),s=()=>r()!=="web",n=u=>{const g=d.get(u);return!!(g?.platforms.has(r())||i(u))},i=u=>{var g;return(g=o.PluginHeaders)===null||g===void 0?void 0:g.find(b=>b.name===u)},l=u=>e.console.error(u),d=new Map,c=(u,g={})=>{const b=d.get(u);if(b)return console.warn(`Capacitor plugin "${u}" already registered. Cannot register plugins twice.`),b.proxy;const h=r(),v=i(u);let w;const k=async()=>(!w&&h in g?w=typeof g[h]=="function"?w=await g[h]():w=g[h]:t!==null&&!w&&"web"in g&&(w=typeof g.web=="function"?w=await g.web():w=g.web),w),S=(T,M)=>{var R,F;if(v){const z=v?.methods.find(j=>M===j.name);if(z)return z.rtype==="promise"?j=>o.nativePromise(u,M.toString(),j):(j,Q)=>o.nativeCallback(u,M.toString(),j,Q);if(T)return(R=T[M])===null||R===void 0?void 0:R.bind(T)}else{if(T)return(F=T[M])===null||F===void 0?void 0:F.bind(T);throw new Zt(`"${u}" plugin is not implemented on ${h}`,ze.Unimplemented)}},y=T=>{let M;const R=(...F)=>{const z=k().then(j=>{const Q=S(j,T);if(Q){const Ce=Q(...F);return M=Ce?.remove,Ce}else throw new Zt(`"${u}.${T}()" is not implemented on ${h}`,ze.Unimplemented)});return T==="addListener"&&(z.remove=async()=>M()),z};return R.toString=()=>`${T.toString()}() { [capacitor code] }`,Object.defineProperty(R,"name",{value:T,writable:!1,configurable:!1}),R},E=y("addListener"),C=y("removeListener"),D=(T,M)=>{const R=E({eventName:T},M),F=async()=>{const j=await R;C({eventName:T,callbackId:j},M)},z=new Promise(j=>R.then(()=>j({remove:F})));return z.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await F()},z},A=new Proxy({},{get(T,M){switch(M){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return v?D:E;case"removeListener":return C;default:return y(M)}}});return a[u]=A,d.set(u,{name:u,proxy:A,platforms:new Set([...Object.keys(g),...v?[h]:[]])}),A};return o.convertFileSrc||(o.convertFileSrc=u=>u),o.getPlatform=r,o.handleError=l,o.isNativePlatform=s,o.isPluginAvailable=n,o.registerPlugin=c,o.Exception=Zt,o.DEBUG=!!o.DEBUG,o.isLoggingEnabled=!!o.isLoggingEnabled,o},Ir=e=>e.Capacitor=Er(e),ae=Ir(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),Ot=ae.registerPlugin;class _a{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(t,o){let a=!1;this.listeners[t]||(this.listeners[t]=[],a=!0),this.listeners[t].push(o);const s=this.windowListeners[t];s&&!s.registered&&this.addWindowListener(s),a&&this.sendRetainedArgumentsForEvent(t);const n=async()=>this.removeListener(t,o);return Promise.resolve({remove:n})}async removeAllListeners(){this.listeners={};for(const t in this.windowListeners)this.removeWindowListener(this.windowListeners[t]);this.windowListeners={}}notifyListeners(t,o,a){const r=this.listeners[t];if(!r){if(a){let s=this.retainedEventArguments[t];s||(s=[]),s.push(o),this.retainedEventArguments[t]=s}return}r.forEach(s=>s(o))}hasListeners(t){var o;return!!(!((o=this.listeners[t])===null||o===void 0)&&o.length)}registerWindowListener(t,o){this.windowListeners[o]={registered:!1,windowEventName:t,pluginEventName:o,handler:a=>{this.notifyListeners(o,a)}}}unimplemented(t="not implemented"){return new ae.Exception(t,ze.Unimplemented)}unavailable(t="not available"){return new ae.Exception(t,ze.Unavailable)}async removeListener(t,o){const a=this.listeners[t];if(!a)return;const r=a.indexOf(o);this.listeners[t].splice(r,1),this.listeners[t].length||this.removeWindowListener(this.windowListeners[t])}addWindowListener(t){window.addEventListener(t.windowEventName,t.handler),t.registered=!0}removeWindowListener(t){t&&(window.removeEventListener(t.windowEventName,t.handler),t.registered=!1)}sendRetainedArgumentsForEvent(t){const o=this.retainedEventArguments[t];o&&(delete this.retainedEventArguments[t],o.forEach(a=>{this.notifyListeners(t,a)}))}}const Zo=e=>encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),Ko=e=>e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent);class Cr extends _a{async getCookies(){const t=document.cookie,o={};return t.split(";").forEach(a=>{if(a.length<=0)return;let[r,s]=a.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");r=Ko(r).trim(),s=Ko(s).trim(),o[r]=s}),o}async setCookie(t){try{const o=Zo(t.key),a=Zo(t.value),r=`; expires=${(t.expires||"").replace("expires=","")}`,s=(t.path||"/").replace("path=",""),n=t.url!=null&&t.url.length>0?`domain=${t.url}`:"";document.cookie=`${o}=${a||""}${r}; path=${s}; ${n};`}catch(o){return Promise.reject(o)}}async deleteCookie(t){try{document.cookie=`${t.key}=; Max-Age=0`}catch(o){return Promise.reject(o)}}async clearCookies(){try{const t=document.cookie.split(";")||[];for(const o of t)document.cookie=o.replace(/^ +/,"").replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(t){return Promise.reject(t)}}async clearAllCookies(){try{await this.clearCookies()}catch(t){return Promise.reject(t)}}}Ot("CapacitorCookies",{web:()=>new Cr});const Lr=async e=>new Promise((t,o)=>{const a=new FileReader;a.onload=()=>{const r=a.result;t(r.indexOf(",")>=0?r.split(",")[1]:r)},a.onerror=r=>o(r),a.readAsDataURL(e)}),Tr=(e={})=>{const t=Object.keys(e);return Object.keys(e).map(r=>r.toLocaleLowerCase()).reduce((r,s,n)=>(r[s]=e[t[n]],r),{})},Pr=(e,t=!0)=>e?Object.entries(e).reduce((a,r)=>{const[s,n]=r;let i,l;return Array.isArray(n)?(l="",n.forEach(d=>{i=t?encodeURIComponent(d):d,l+=`${s}=${i}&`}),l.slice(0,-1)):(i=t?encodeURIComponent(n):n,l=`${s}=${i}`),`${a}&${l}`},"").substr(1):null,Br=(e,t={})=>{const o=Object.assign({method:e.method||"GET",headers:e.headers},t),r=Tr(e.headers)["content-type"]||"";if(typeof e.data=="string")o.body=e.data;else if(r.includes("application/x-www-form-urlencoded")){const s=new URLSearchParams;for(const[n,i]of Object.entries(e.data||{}))s.set(n,i);o.body=s.toString()}else if(r.includes("multipart/form-data")||e.data instanceof FormData){const s=new FormData;if(e.data instanceof FormData)e.data.forEach((i,l)=>{s.append(l,i)});else for(const i of Object.keys(e.data))s.append(i,e.data[i]);o.body=s;const n=new Headers(o.headers);n.delete("content-type"),o.headers=n}else(r.includes("application/json")||typeof e.data=="object")&&(o.body=JSON.stringify(e.data));return o};class Dr extends _a{async request(t){const o=Br(t,t.webFetchExtra),a=Pr(t.params,t.shouldEncodeUrlParams),r=a?`${t.url}?${a}`:t.url,s=await fetch(r,o),n=s.headers.get("content-type")||"";let{responseType:i="text"}=s.ok?t:{};n.includes("application/json")&&(i="json");let l,d;switch(i){case"arraybuffer":case"blob":d=await s.blob(),l=await Lr(d);break;case"json":l=await s.json();break;case"document":case"text":default:l=await s.text()}const c={};return s.headers.forEach((u,g)=>{c[g]=u}),{data:l,headers:c,status:s.status,url:s.url}}async get(t){return this.request(Object.assign(Object.assign({},t),{method:"GET"}))}async post(t){return this.request(Object.assign(Object.assign({},t),{method:"POST"}))}async put(t){return this.request(Object.assign(Object.assign({},t),{method:"PUT"}))}async patch(t){return this.request(Object.assign(Object.assign({},t),{method:"PATCH"}))}async delete(t){return this.request(Object.assign(Object.assign({},t),{method:"DELETE"}))}}Ot("CapacitorHttp",{web:()=>new Dr});const G=Ot("PushNotifications",{}),Mr="modulepreload",Ar=function(e){return"/"+e},ea={},qr=function(t,o,a){let r=Promise.resolve();if(o&&o.length>0){let l=function(d){return Promise.all(d.map(c=>Promise.resolve(c).then(u=>({status:"fulfilled",value:u}),u=>({status:"rejected",reason:u}))))};document.getElementsByTagName("link");const n=document.querySelector("meta[property=csp-nonce]"),i=n?.nonce||n?.getAttribute("nonce");r=l(o.map(d=>{if(d=Ar(d),d in ea)return;ea[d]=!0;const c=d.endsWith(".css"),u=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${u}`))return;const g=document.createElement("link");if(g.rel=c?"stylesheet":Mr,c||(g.as="script"),g.crossOrigin="",g.href=d,i&&g.setAttribute("nonce",i),document.head.appendChild(g),c)return new Promise((b,h)=>{g.addEventListener("load",b),g.addEventListener("error",()=>h(new Error(`Unable to preload CSS for ${d}`)))})}))}function s(n){const i=new Event("vite:preloadError",{cancelable:!0});if(i.payload=n,window.dispatchEvent(i),!i.defaultPrevented)throw n}return r.then(n=>{for(const i of n||[])i.status==="rejected"&&s(i.reason);return t().catch(s)})},ta=Ot("App",{web:()=>qr(()=>import("./web-BMmM4dVX.js"),__vite__mapDeps([0,1,2,3])).then(e=>new e.AppWeb)}),Nr="BDA-IaH_jjWBRwHbuFcB56I25jKHpchx34yZtv_6iIo_yV2tz_yIZYS3hfntDaN5Slf4ch8ZEJCIt4D7LIWX4mY";let oa=!1;async function Wa(){if(window.Capacitor&&window.Capacitor.isNativePlatform()){try{await G.removeAllListeners(),await G.addListener("registration",async o=>{Ya(o.value,!0)}),await G.addListener("pushNotificationReceived",o=>{console.log("[Push Nativo] Recebido em Foreground (Visual gerido pelo Firestore):",o)}),await G.addListener("pushNotificationActionPerformed",o=>{const a=o.notification.data;console.log("Notificação clicada (Ação):",a)});let t=await G.checkPermissions();t.receive==="prompt"&&(t=await G.requestPermissions()),t.receive==="granted"&&await G.register()}catch(t){console.error("[Push Nativo] Erro:",t)}return}"Notification"in window&&Notification.permission==="granted"&&Ga()}async function Ja(){try{return await Notification.requestPermission()==="granted"?(console.log("Permissão concedida pelo utilizador."),await Ga(),!0):(console.warn("Permissão de notificações negada."),!1)}catch(e){return console.error("Erro ao pedir permissão Web:",e),!1}}async function Ga(){if("serviceWorker"in navigator)try{const e=await navigator.serviceWorker.register("/firebase-messaging-sw.js");await e.update();const t=await Ws(Vo,{vapidKey:Nr,serviceWorkerRegistration:e});t?(console.log("[Push Web] Token validado."),await Ya(t,!1)):console.warn("[Push Web] Token veio vazio."),oa||(Js(Vo,o=>{console.log("[Push Web] Recebido em Foreground (Silencioso):",o)}),oa=!0)}catch(e){console.error("[Push Web] Falha no registo:",e)}else console.warn("Navegador sem suporte a Service Worker.")}async function Ya(e,t){const o=U.currentUser;if(!o){console.warn("Usuário não logado. Token não salvo.");return}const a=pe(_,"users",o.uid);try{const r=await qa(a);if(r.exists()){const n=r.data().fcmTokens||[];if(n.length===1&&n[0]===e){console.log("Token já sincronizado e único. Nenhuma ação necessária.");return}}await wo(a,{fcmTokens:[e],lastLoginAt:new Date().toISOString(),platform:t?"android_native":"pwa_web"}),console.log("Token atualizado (Sessão Única garantida).")}catch(r){if(r.code==="not-found")try{await zs(a,{email:o.email,fcmTokens:[e],platform:t?"android_native":"pwa_web",createdAt:new Date().toISOString()},{merge:!0}),console.log("Utilizador criado e token inicial salvo.")}catch(s){console.error("Erro ao criar user:",s)}else console.error("Erro ao atualizar token:",r)}}const Rr=(e,t,o="all",a="all")=>{const r=new URLSearchParams({startDate:e,endDate:t});return o&&o!=="all"&&r.append("professionalId",o),a&&a!=="all"&&r.append("costCenterId",a),I(`/api/reports/indicators?${r.toString()}`)},jr=e=>e?I(`/api/financial/cost-centers/${e}`):Promise.resolve([]),Fr=({establishmentId:e,startDate:t,endDate:o,cashierSessionId:a})=>{const r=new URLSearchParams({startDate:t,endDate:o});return a&&a!=="all"&&r.append("cashierSessionId",a),e&&r.append("establishmentId",e),I(`/api/reports/sales?${r.toString()}`)},Hr=()=>I("/api/reports/summary",{method:"GET"}),zt=(e,t,o,a="all")=>{const r=`/api/blockages/${e}?startDate=${t}&endDate=${o}&professionalId=${a}`;return I(r)},Vt=e=>I("/api/blockages",{method:"POST",body:JSON.stringify(e)}),Eo=e=>I(`/api/blockages/${e}`,{method:"DELETE"}),Qa=e=>I("/api/blockages/batch-delete",{method:"POST",body:JSON.stringify({ids:e})}),Io=e=>e?String(e).replace(/\D/g,""):"",Ut=(e,t="",o=20,a={})=>{const r=new URLSearchParams;return t&&r.append("search",t),o&&r.append("limit",o),a&&a.hasLoyalty&&r.append("hasLoyalty","true"),a&&a.birthMonth&&r.append("birthMonth",a.birthMonth),a&&a.inactiveDays&&r.append("inactiveDays",a.inactiveDays),I(`/api/clients/${e}?${r.toString()}`)},Xa=(e,t)=>{const o=encodeURIComponent(t);return I(`/api/clients/details/${e}/${o}`)},Za=e=>{const t=e.phone||e.id;if(!t)throw new Error("Telefone é obrigatório");const o=Io(t),a={...e,phone:o,id:o};return I(`/api/clients/${o}`,{method:"PUT",body:JSON.stringify(a)})},Co=Za,Ka=(e,t)=>Za({...t,id:e}),Or=e=>{const t=encodeURIComponent(e);return I(`/api/clients/${t}`,{method:"DELETE"})},zr=(e,t,o,a)=>I("/api/clients/redeem",{method:"POST",body:JSON.stringify({establishmentId:e,clientPhone:Io(t),points:o,rewardName:a})}),Vr=(e,t)=>Xa(e,Io(t));function f(e){return e==null?"":String(e).replace(/[&<>'"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[t])}function es(e,t=800,o=800,a=.7){return new Promise((r,s)=>{if(!e.type.match(/image.*/))return s(new Error("O ficheiro selecionado não é uma imagem."));const n=new FileReader;n.readAsDataURL(e),n.onload=i=>{const l=new Image;l.src=i.target.result,l.onload=()=>{let d=l.width,c=l.height;d>c?d>t&&(c*=t/d,d=t):c>o&&(d*=o/c,c=o);const u=document.createElement("canvas");u.width=d,u.height=c,u.getContext("2d").drawImage(l,0,0,d,c);const b=u.toDataURL("image/jpeg",a);r(b)},l.onerror=d=>s(new Error("Erro ao carregar a imagem para processamento."))},n.onerror=i=>s(new Error("Erro ao ler o ficheiro."))})}const aa=document.getElementById("content");let sa=!1;const co=[{bg:"#e0e7ff",border:"#4f46e5",main:"#4f46e5"},{bg:"#d1fae5",border:"#059669",main:"#059669"},{bg:"#ffe4e6",border:"#e11d48",main:"#e11d48"},{bg:"#fef3c7",border:"#d97706",main:"#d97706"},{bg:"#cffafe",border:"#0e7490",main:"#0e7490"},{bg:"#e0f2fe",border:"#0284c7",main:"#0284c7"},{bg:"#ede9fe",border:"#7c3aed",main:"#7c3aed"},{bg:"#fce7f3",border:"#db2777",main:"#db2777"}];let mt=[],_t=[],Ve={},Re=[],P={currentView:"list",weekViewDays:7,currentDate:new Date,selectedProfessionalId:"all",profSearchTerm:"",showInactiveProfs:!1,scrollToAppointmentId:null,isSelectionMode:!1,selectedItems:new Set},L={step:1,data:{id:null,clientName:"",clientPhone:"",selectedServiceIds:[],professionalId:null,professionalName:"",date:null,time:null,redeemedReward:null,clientHasRewards:!1,clientLoyaltyPoints:0}};function Ur(e){return new Intl.DateTimeFormat("pt-BR",{weekday:"short",day:"2-digit",month:"short"}).format(e).replace(/\./g,"")}function ts(e){const t=new Date(e);if(t.setHours(0,0,0,0),P.currentView==="week"&&P.weekViewDays===7){const o=t.getDay(),a=t.getDate()-o+(o===0?-6:1);return new Date(t.setDate(a))}return t}function Bt(){const e=document.getElementById("profSelectorContainer"),t=P.profSearchTerm.toLowerCase();if(!e||!m.professionals)return;let o=m.professionals.filter(s=>P.showInactiveProfs||s.status!=="inactive");t&&(o=o.filter(s=>s.name.toLowerCase().includes(t)));const r=[...[{id:"all",name:"Todos",photo:null,status:"active"}],...o];e.innerHTML=r.map(s=>{const n=P.selectedProfessionalId===s.id,i=s.name==="Todos"?"Todos":s.name.split(" ")[0],l=s.name==="Todos"?"T":s.name.charAt(0).toUpperCase(),d=s.status!=="inactive",c=f(i),u=co[0],g=s.id!=="all"&&m.professionalColors.get(s.id)||u,b=s.photo||`https://placehold.co/64x64/${g.main?.replace("#","")||"E0E7FF"}/${g.light?.replace("#","")||"4F46E5"}?text=${l}`,h=s.id==="all"?"#e0e7ff":g.light,v=s.id==="all"?"#4f46e5":g.main,k=`border: 3px solid ${n?g.border:"transparent"}; box-shadow: ${n?"0 0 0 2px "+g.border:"none"};`;return`
            <div class="prof-card ${n?"selected":""} ${d?"":"opacity-50"}" 
                 data-action="select-professional" 
                 data-prof-id="${s.id}">
                ${s.id==="all"?`<div class="prof-card-all-placeholder" style="background-color: ${h}; color: ${v}; ${k}">
                           ${l}
                          </div>`:`<img src="${b}" alt="${c}" class="prof-card-photo" style="${k}" />`}
                <span class="prof-card-name">${c}</span>
            </div>
        `}).join("")}function _r(e,t,o,a,r){const s=(e||"").replace(/\D/g,""),n=new Date(r).toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit"}),i=new Date(r).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),l=`Olá, ${t}! Você tem um agendamento de ${o} com o(a) profissional ${a} para o dia ${n} às ${i}. Podemos confirmar? Agradecemos a preferência!`,d=encodeURIComponent(l);return`https://wa.me/${s}?text=${d}`}function Wr(e){const t=document.getElementById("agenda-view");if(!t)return;if(e.sort((a,r)=>new Date(a.startTime)-new Date(r.startTime)),e.length===0){t.innerHTML='<div class="text-center p-10 text-gray-500"><svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path vector-effect="non-scaling-stroke" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg><h3 class="mt-2 text-sm font-medium text-gray-900">Nenhum agendamento ou bloqueio</h3><p class="mt-1 text-sm text-gray-500">Não há eventos para o dia e filtros selecionados.</p></div>';return}const o=e.map(a=>{const r=new Date(a.startTime),s=new Date(a.endTime),n=r.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),i=s.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),l=m.professionalColors.get(a.professionalId)||{},d=f(a.reason),c=f(a.professionalName),u=f(a.clientName),g=f(a.serviceName),b=P.selectedItems.has(a.id),h=P.isSelectionMode?`<div class="flex items-center justify-center pr-3 border-r border-gray-200 mr-3">
                 <input type="checkbox" class="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 cursor-pointer" 
                        data-action="toggle-select-item" 
                        data-id="${a.id}" 
                        ${b?"checked":""}>
               </div>`:"";if(a.type==="blockage")return`
                <div class="appointment-list-card bg-red-50" style="border-left-color: ${l.border};">
                    ${h}
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
                </div>`;const v=a.status==="completed",w=v?"bg-green-100 text-green-800":"bg-yellow-100 text-yellow-800",k=v?"Finalizado":"Aberto",S=JSON.stringify(a).replace(/'/g,"&apos;"),y=a.redeemedReward?.points>0,E=a.hasRewards&&!y,C=_r(a.clientPhone,a.clientName,a.serviceName,a.professionalName,a.startTime),D=P.isSelectionMode?"":'data-action="open-comanda"';return`
            <div class="appointment-list-card" data-appointment='${S}' style="border-left-color: ${l.border};">
                
                ${h}

                <div class="time-info" ${D}>
                    <p class="font-bold text-md">${n}</p>
                    <p class="text-xs text-gray-500">${i}</p>
                </div>

                <div class="details-info min-w-0" ${D}>
                    <p class="font-bold text-gray-800 truncate">${E?"🎁 ":""}${u}</p>
                    <p class="text-sm text-gray-600 truncate">${g}</p>
                    <p class="text-xs text-gray-500 truncate">com ${c||"Indefinido"}</p>
                    
                    ${y?'<p class="text-xs font-semibold text-purple-600">Resgate de Prémio</p>':""}
                </div>

                <div class="status-info">
                    <span class="status-badge ${w} mb-1">${k}</span>
                    <div class="card-actions flex gap-1 items-center">
                        ${v?`
                            <button data-action="edit-appointment" data-appointment='${S}' class="action-btn opacity-40 cursor-not-allowed" title="Finalizado - Não editável" disabled><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z"></path></svg></button>
                        `:`
                            <a href="${C}" target="_blank" class="action-btn text-green-500 hover:text-green-700 p-1" title="Enviar Confirmação WhatsApp">
                                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12.036 2a10 10 0 100 20 10 10 0 000-20zM17.5 14.8c-.24.125-1.465.716-1.696.804-.23.09-.49.135-.75.045-.26-.09-.982-.322-1.87-.965-.888-.643-1.474-1.442-1.64-1.748-.166-.307-.015-.467.106-.615.116-.149.23-.388.344-.582.113-.193.15-.327.1-.462-.05-.136-.264-.322-.544-.654-.28-.332-.572-.782-.828-.958-.255-.176-.438-.158-.61-.158-.173 0-.374-.022-.574-.022-.2 0-.54.075-.826.375-.285.3-.99.965-.99 2.355 0 1.43 1.018 2.872 1.16 3.072.14.2 2 3.047 4.86 4.218 2.86 1.17 2.86.786 3.376 1.054.516.268 1.49.462 1.696.406.206-.057 1.463-.615 1.67-.887.2-.27.2-.504.14-.615-.058-.11-.23-.166-.48-.306z"/></svg>
                            </a>
                            <button data-action="edit-appointment" data-appointment='${S}' class="action-btn" title="Editar Agendamento"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z"></path></svg></button>
                        `}
                        <button data-action="delete-appointment" data-id="${a.id}" class="action-btn" title="Apagar Agendamento"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
                    </div>
                </div>
            </div>`}).join("");t.innerHTML=`<div class="list-view-container space-y-2 pb-24">${o}</div>`}function Lo(){return window.innerWidth<768&&P.currentView==="week"?3:P.weekViewDays}function Jr(e){const t=document.getElementById("agenda-view");if(!t)return;const o=["Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sábado"],a=ts(P.currentDate),r=Lo();let s=`<div class="grid divide-x divide-gray-200 min-h-[60vh]" style="grid-template-columns: repeat(${r}, minmax(0, 1fr));">`;for(let n=0;n<r;n++){const i=new Date(a);i.setDate(i.getDate()+n);const l=new Date,d=i.toDateString()===l.toDateString(),c=e.filter(g=>new Date(g.startTime).toDateString()===i.toDateString()).sort((g,b)=>new Date(g.startTime)-new Date(b.startTime));let u='<div class="p-1 space-y-2">';c.length>0?u+=c.map(g=>{const h=new Date(g.startTime).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),v=m.professionalColors.get(g.professionalId)||{bg:"#e5e7eb",border:"#9ca3af"},w=f(g.reason),k=f(g.professionalName),S=f(g.clientName),y=f(g.serviceName);if(g.type==="blockage")return`
                        <div class="p-2 rounded-lg border-l-4 flex flex-col bg-red-100" style="border-left-color: ${v.border};">
                            <span class="font-bold text-xs text-red-900">${h}</span>
                            <div class="mt-1 min-w-0">
                                <p class="font-semibold text-sm text-red-800 truncate">${w}</p>
                                <p class="text-xs text-red-600 truncate">com ${k}</p>
                            </div>
                        </div>
                    `;const E=JSON.stringify(g).replace(/'/g,"&apos;"),C=g.redeemedReward?.points>0,D=g.hasRewards&&!C,A=g.status==="completed";return`
                    <div class="p-2 rounded-lg border-l-4 flex flex-col cursor-pointer" 
                         style="background-color: ${v.bg}; border-left-color: ${v.border};"
                         data-action="open-comanda" data-appointment='${E}'>
                        
                        <div class="flex justify-between items-center">
                            <span class="font-bold text-xs text-gray-900">${h}</span>
                            ${A?'<span class="text-[10px] font-semibold bg-green-200 text-green-800 px-1 rounded-sm">OK</span>':""}
                        </div>

                        <div class="mt-1 min-w-0">
                            <p class="font-semibold text-sm text-gray-800 truncate">${D?"🎁 ":""}${S}</p>
                            <p class="text-xs text-gray-600 truncate">${y}</p>
                            <p class="text-xs text-gray-500 truncate">com ${k||"Indefinido"}</p>
                            ${C?'<p class="text-xs text-purple-600 truncate">Resgate</p>':""}
                        </div>
                        
                        </div>
                `}).join(""):u+='<div class="text-center text-xs text-gray-400 pt-4">Nenhum evento</div>',u+="</div>",s+=`
            <div class="flex flex-col">
                <div class="text-center py-2 border-b ${d?"bg-indigo-100 text-indigo-700":"bg-gray-50"}">
                    <p class="font-bold">${o[i.getDay()]}</p>
                    <p class="text-sm">${i.getDate()}/${i.getMonth()+1}</p>
                </div>
                <div class="flex-grow overflow-y-auto">${u}</div>
            </div>
        `}s+="</div>",t.innerHTML=s}function os(){const e=m.allEvents.filter(t=>P.selectedProfessionalId==="all"||t.professionalId===P.selectedProfessionalId);P.currentView==="list"?Wr(e):Jr(e),To()}function To(){const e=document.getElementById("batch-delete-container"),t=document.querySelector('[data-action="new-appointment"]');e&&(P.isSelectionMode&&P.selectedItems.size>0?(e.innerHTML=`
            <div class="bg-white p-4 rounded-xl shadow-2xl border border-red-100 flex items-center justify-between gap-4">
                <span class="font-bold text-gray-800">${P.selectedItems.size} selecionado(s)</span>
                <button data-action="batch-delete" class="bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 shadow-md flex items-center gap-2">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    Excluir
                </button>
            </div>
        `,e.style.display="block",t&&(t.style.display="none")):(e.style.display="none",t&&(t.style.display="flex")))}async function oe(){const e=document.getElementById("agenda-view");if(!e)return;P.selectedItems.clear(),To(),e.innerHTML='<div class="loader mx-auto my-10"></div>';let t,o;const a=document.getElementById("weekRange");if(a){if(P.currentView==="list")t=new Date(P.currentDate),t.setHours(0,0,0,0),o=new Date(P.currentDate),o.setHours(23,59,59,999),a.textContent=Ur(t);else{const r=Lo();t=ts(new Date(P.currentDate)),o=new Date(t),o.setDate(t.getDate()+(r-1)),o.setHours(23,59,59,999),a.textContent=`${t.toLocaleDateString("pt-BR",{day:"2-digit",month:"short"})} - ${o.toLocaleDateString("pt-BR",{day:"2-digit",month:"short"})}`}try{const r=await Ha(m.establishmentId,t.toISOString(),o.toISOString(),P.selectedProfessionalId==="all"?null:P.selectedProfessionalId),s=await zt(m.establishmentId,t.toISOString(),o.toISOString(),P.selectedProfessionalId);if(!document.getElementById("agenda-view"))return;const n=s.map(l=>{let d=l.professionalName;if(!d&&l.professionalId){const c=m.professionals?m.professionals.find(u=>u.id===l.professionalId):null;c&&(d=c.name)}return{...l,type:"blockage",professionalName:d||"Não identificado"}}),i=[...r.map(l=>({...l,type:"appointment"})),...n];if(m.allEvents=i,Bt(),os(),P.scrollToAppointmentId){const l=document.querySelector(`[data-appointment*='"id":"${P.scrollToAppointmentId}"']`);l&&(l.scrollIntoView({behavior:"smooth",block:"center"}),l.style.transition="background-color 0.5s ease-in-out",l.style.backgroundColor="#e0e7ff",setTimeout(()=>{l.style.backgroundColor=""},2500)),P.scrollToAppointmentId=null}}catch(r){document.getElementById("agenda-view")&&(document.getElementById("agenda-view").innerHTML='<div class="p-6 text-center text-red-600">Falha ao carregar dados.</div>',p("Erro na Agenda",`Não foi possível carregar a agenda: ${r.message}`,"error"))}}}async function Gr(){try{const[e,t,o]=await Promise.all([m.professionals&&m.professionals.length>0?Promise.resolve(m.professionals):K(m.establishmentId),m.services&&m.services.length>0?Promise.resolve(m.services):be(m.establishmentId),Ve.enabled!==void 0?Promise.resolve(null):Ie(m.establishmentId)]);(!m.professionals||m.professionals.length===0)&&(m.professionals=e||[]),(!m.services||m.services.length===0)&&(m.services=t||[]),Re=[],o&&(Ve=o.loyaltyProgram||{enabled:!1}),m.professionals.forEach((a,r)=>{m.professionalColors.set(a.id,co[r%co.length])}),Bt()}catch(e){console.error("Erro ao popular filtros e dependências do modal:",e),p("Atenção","Não foi possível pré-carregar os dados para agendamento. A abertura do modal pode ser lenta.","error")}}function uo(e){e<1||e>4||(L.step=e,mo(null,!0))}function as(e,t){const o=document.getElementById("multiServiceToggle"),a=o&&o.checked,r=t.classList.contains("selected"),s=L.data.selectedServiceIds.indexOf(e);if(r)t.classList.remove("selected","border-blue-500"),s>-1&&L.data.selectedServiceIds.splice(s,1);else{if(!a){L.data.selectedServiceIds=[];const n=document.getElementById("apptServicesContainer");n&&n.querySelectorAll(".service-card.selected").forEach(i=>{i.classList.remove("selected","border-blue-500")})}t.classList.add("selected","border-blue-500"),L.data.selectedServiceIds.push(e)}}function ss(e,t){const o=document.querySelector(".professional-step-cards");if(!o)return;o.querySelectorAll(".professional-modal-card").forEach(r=>r.classList.remove("selected","border-blue-500")),t.classList.add("selected","border-blue-500");const a=_t.find(r=>r.id===e);L.data.professionalId=e,L.data.professionalName=a?a.name:"N/A"}function Yr(e,t){const o=document.getElementById("availableTimesContainer");o&&(o.querySelectorAll(".time-slot-card").forEach(a=>a.classList.remove("selected")),t.classList.add("selected"),L.data.time=e)}async function ra(){const e=document.getElementById("apptTotalDuration"),t=document.getElementById("availableTimesContainer");if(!e||!t)return;const o=L.data.professionalId,a=L.data.selectedServiceIds,r=document.getElementById("apptDate").value;L.data.date=r;const s=a.reduce((n,i)=>{const l=mt.find(d=>d.id===i);return n+(l?l.duration+(l.bufferTime||0):0)},0);if(e.textContent=`${s} min`,s===0||!o||!r){t.innerHTML='<p class="col-span-full text-center text-gray-500">Selecione serviço, profissional e data.</p>';return}t.innerHTML='<div class="loader mx-auto col-span-full"></div>';try{let n=await Qs({establishmentId:m.establishmentId,professionalId:o,serviceIds:a,date:r});const i=new Date;if(new Date(r+"T00:00:00").toDateString()===i.toDateString()){const d=i.getHours()*60+i.getMinutes();n=n.filter(c=>{const[u,g]=c.split(":").map(Number);return u*60+g>=d})}if(t.innerHTML="",n.length>0){if(n.forEach(d=>{const c=document.createElement("button");c.type="button",c.className=`time-slot-card p-2 text-sm bg-gray-100 rounded-md hover:bg-gray-200 transition ${L.data.time===d?"selected":""}`,c.textContent=d,c.addEventListener("click",()=>Yr(d,c)),t.appendChild(c)}),L.data.time){const d=t.querySelector(`[data-action="time-slot"][data-time="${L.data.time}"]`);d&&d.classList.add("selected")}}else t.innerHTML='<p class="col-span-full text-center text-gray-500">Nenhum horário disponível.</p>'}catch(n){console.error("Erro ao buscar horários:",n),t.innerHTML='<p class="col-span-full text-center text-red-500">Erro ao buscar horários.</p>'}}function Qr(){const e=document.getElementById("loyaltyRewardsContainer");if(!e)return;const{clientHasRewards:t,clientLoyaltyPoints:o,redeemedReward:a}=L.data,{enabled:r,rewards:s}=Ve;if(!r||!t||!s||s.length===0){e.classList.add("hidden"),e.innerHTML="";return}e.classList.remove("hidden");const n=s.filter(l=>o>=l.points);let i=`
        <h4 class="text-md font-semibold text-gray-700 mb-2">🎁 Prêmios Disponíveis (${o} pontos)</h4>
    `;n.length>0?(i+='<div class="space-y-2">',i+=n.map(l=>{const d=a?.reward===l.reward,c=f(l.reward);return`
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
            `}).join(""),i+="</div>"):i+='<p class="text-sm text-gray-600">Pontos insuficientes para resgatar os prêmios disponíveis.</p>',e.innerHTML=i,e.querySelectorAll('input[name="loyaltyReward"]').forEach(l=>{l.addEventListener("change",d=>{d.target.checked&&(L.data.redeemedReward={reward:d.target.value,points:parseInt(d.target.dataset.points,10)})})}),e.insertAdjacentHTML("beforeend",`
        <label class="flex items-center p-3 mt-2 bg-white rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-50">
            <input type="radio" name="loyaltyReward" class="form-radio text-gray-400" 
                   value="none" 
                   ${a?"":"checked"}>
            <span class="ml-3 text-gray-600">Não resgatar prêmio agora</span>
        </label>
    `),e.querySelector('input[value="none"]').addEventListener("change",l=>{l.target.checked&&(L.data.redeemedReward=null)})}async function Xr(e){e.preventDefault();const t=e.target,o=t.querySelector('button[type="submit"]');if(!L.data.time||L.data.selectedServiceIds.length===0||!L.data.professionalId)return p("Erro de Validação","Por favor, selecione o horário, serviço(s) e profissional antes de confirmar.","error");o.disabled=!0,o.textContent="A confirmar...";const a=L.data.selectedServiceIds.map(d=>{const c=mt.find(u=>u.id===d);return{id:c.id,name:c.name,price:c.price,duration:c.duration,bufferTime:c.bufferTime||0,photo:c.photo||null}}),[r,s]=L.data.time.split(":"),n=new Date(`${L.data.date}T${r}:${s}:00`),i={establishmentId:m.establishmentId,clientName:L.data.clientName,clientPhone:L.data.clientPhone,services:a,professionalId:L.data.professionalId,startTime:n.toISOString(),redeemedReward:L.data.redeemedReward},l=t.querySelector("#appointmentId").value;l&&(i.id=l);try{l?await Zs(l,i):await Xs(i),p(`Agendamento ${l?"atualizado":"criado"} com sucesso!`,"success"),document.getElementById("appointmentModal").style.display="none",oe()}catch(d){p(d.message,"error")}finally{o.disabled=!1,o.textContent="Confirmar Agendamento"}}function rs(e){const t=L.data.clientName===e.name&&L.data.clientPhone===e.phone,o=f(e.name),a=f(e.phone);return`
        <div class="client-search-card p-3 bg-white rounded-lg border-2 border-gray-200 cursor-pointer transition-all hover:bg-blue-50 ${t?"selected border-blue-500":""}" 
             data-action="select-client" 
             data-client-name="${o}" 
             data-client-phone="${a}"
             data-client-id="${e.id}"
             data-loyalty-points="${e.loyaltyPoints||0}">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold">${o.charAt(0).toUpperCase()}</div>
                <div>
                    <p class="font-semibold text-gray-800">${o}</p>
                    <p class="text-sm text-gray-500">${a}</p>
                </div>
            </div>
        </div>
    `}async function Zr(e){const t=document.getElementById("clientSearchResults");if(!t)return;const o=e.trim();if(o.length<3){t.innerHTML='<p class="text-sm text-gray-500">Digite pelo menos 3 caracteres para buscar clientes existentes.</p>';return}t.innerHTML='<div class="loader-small mx-auto my-2"></div>';try{const a=await Ut(m.establishmentId,o);if(Re=a,a.length===0){t.innerHTML='<p class="text-sm text-gray-500">Nenhum cliente encontrado com este termo.</p>';return}t.innerHTML=a.map(rs).join(""),t.querySelectorAll('[data-action="select-client"]').forEach(r=>{r.addEventListener("click",s=>{const n=r.dataset.clientName,i=r.dataset.clientPhone,l=parseInt(r.dataset.loyaltyPoints||"0",10);L.data.clientName=n,L.data.clientPhone=i,L.data.clientLoyaltyPoints=l;const d=Ve,c=Math.min(...(d?.rewards||[]).map(u=>u.points));L.data.clientHasRewards=d.enabled&&c!==1/0&&L.data.clientLoyaltyPoints>=c,document.getElementById("apptClientName").value=n,document.getElementById("apptClientPhone").value=i,document.querySelectorAll(".client-search-card").forEach(u=>u.classList.remove("selected","border-blue-500")),r.classList.add("selected","border-blue-500")})})}catch(a){console.error("Erro na busca de clientes:",a),t.innerHTML='<p class="text-sm text-red-500">Erro ao buscar clientes.</p>'}}async function Kr(e){e.preventDefault();const t=document.getElementById("clientRegistrationForm"),o=t.querySelector('button[type="submit"]'),a={establishmentId:m.establishmentId,name:t.querySelector("#regClientName").value.trim(),email:t.querySelector("#regClientEmail").value.trim(),phone:t.querySelector("#regClientPhone").value.trim(),dobDay:t.querySelector("#regClientDobDay").value.trim(),dobMonth:t.querySelector("#regClientDobMonth").value.trim(),notes:t.querySelector("#regClientNotes").value.trim()};if(!a.name||!a.phone)return p("Erro de Validação","Nome e Telefone são obrigatórios.","error");o.disabled=!0,o.textContent="A salvar...";try{await Co(a),Re.push({name:a.name,phone:a.phone,loyaltyPoints:0}),L.data.clientName=a.name,L.data.clientPhone=a.phone,L.data.clientHasRewards=!1,L.data.clientLoyaltyPoints=0,p("Cliente cadastrado com sucesso!","success"),document.getElementById("genericModal").style.display="none",uo(1)}catch(r){p(`Erro ao cadastrar cliente: ${r.message}`,"error")}finally{o.disabled=!1,o.textContent="Salvar"}}function en(){Y({title:"Cadastrar Novo Cliente",contentHTML:`
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
    `,maxWidth:"max-w-2xl"});const t=document.getElementById("clientRegistrationForm");t&&t.addEventListener("submit",Kr)}function tn(){en()}function on(e,t){const o=e?"Editar Agendamento":"Selecionar Cliente",a=`
        <div class="p-5 space-y-6">
            <h3 class="text-xl font-bold text-gray-800">1. Dados do Cliente</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label for="apptClientName" class="block text-sm font-medium text-gray-700">Nome Completo</label>
                    <input type="text" id="apptClientName" required class="mt-1 block w-full p-3 rounded-lg border-gray-300 shadow-sm" placeholder="Nome Completo" value="${f(L.data.clientName)}">
                </div>
                <div>
                    <label for="apptClientPhone" class="block text-sm font-medium text-gray-700">Telemóvel</label>
                    <input type="tel" id="apptClientPhone" required class="mt-1 block w-full p-3 rounded-lg border-gray-300 shadow-sm" placeholder="(XX) XXXXX-XXXX" value="${f(L.data.clientPhone)}">
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
    `;return{title:o,content:a}}function an(){const e="Selecionar Serviço",o=`
        <div class="p-5 space-y-6">
            <h3 class="text-xl font-bold text-gray-800">2. Serviços</h3>
             
             <div class="flex flex-col sm:flex-row items-center gap-4 bg-gray-100 p-4 rounded-lg border border-gray-200">
                 <input type="search" id="serviceSearchModalInput" placeholder="Buscar Serviço..." class="w-full sm:flex-grow p-3 pl-10 border rounded-lg">
                 
                 <label class="flex items-center space-x-2 cursor-pointer flex-shrink-0">
                     <div class="relative">
                         <input type="checkbox" id="multiServiceToggle" class="sr-only" ${L.data.selectedServiceIds.length>1?"checked":""}>
                         <div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full transition-colors"></div>
                         <div class="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform" style="transition: all 0.3s;"></div>
                     </div>
                     <span class="text-sm font-medium text-gray-700">Selecionar Vários</span>
                 </label>
            </div>
            
            <div id="apptServicesContainer" class="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3 max-h-48 overflow-y-auto p-1">
                 ${mt.map(a=>{const r=L.data.selectedServiceIds.includes(a.id),s=a.photo||"https://placehold.co/40x40/E0E7FF/4F46E5?text=S",n=f(a.name);return`
                         <div class="service-card p-3 bg-white rounded-lg border-2 border-gray-200 cursor-pointer transition-all hover:bg-gray-50 ${r?"selected border-blue-500":""}" data-service-id="${a.id}">
                             <div class="flex items-center">
                                 <img src="${s}" class="w-8 h-8 rounded-full object-cover mr-3 flex-shrink-0">
                                 <div class="flex-1">
                                     <p class="font-semibold text-sm text-gray-800">${n}</p>
                                     <p class="text-xs text-gray-500">R$ ${a.price.toFixed(2)} (${a.duration} min)</p>
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
    `;return{title:e,content:o}}function sn(){const e="Selecionar Profissional",t=`
        <div class="p-5 space-y-6">
             <h3 class="text-xl font-bold text-gray-800">3. Profissional</h3>
             <div id="apptProfessionalContainer" class="mt-4 flex flex-wrap gap-3 max-h-48 overflow-y-auto p-1 professional-step-cards">
                 ${_t.map(o=>{const a=L.data.professionalId===o.id,r=o.photo||"https://placehold.co/60x60/E0E7FF/4F46E5?text=P",s=f(o.name);return`
                         <div class="professional-modal-card p-3 bg-white rounded-lg border-2 border-gray-200 text-center cursor-pointer transition-all hover:bg-gray-50 ${a?"selected border-blue-500":""}" data-professional-id="${o.id}">
                             <img src="${r}" class="w-12 h-12 rounded-full object-cover mx-auto mb-1">
                             <p class="text-xs font-semibold text-gray-800">${s.split(" ")[0]}</p>
                             <p class="text-[10px] text-gray-500">${f(o.specialty||"Profissional")}</p>
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
    `;return{title:e,content:t}}function rn(e){const t=e?"Confirmar Edição":"Data e Horário",o=new Date,a=`${o.getFullYear()}-${String(o.getMonth()+1).padStart(2,"0")}-${String(o.getDate()).padStart(2,"0")}`,r=L.data.date||a,s=f(L.data.clientName),n=f(L.data.professionalName),i=`
        <div class="p-5 space-y-6">
            <h3 class="text-xl font-bold text-gray-800">4. ${t}</h3>

            <div class="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400 space-y-1">
                <p class="font-bold text-gray-800">${s}</p>
                <p class="text-sm text-gray-700">Serviços: ${L.data.selectedServiceIds.length} selecionado(s)</p>
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
    `;return{title:t,content:i}}function nn(e){const t=document.getElementById("apptServicesContainer");if(!t)return;const o=e.toLowerCase(),a=mt.filter(r=>r.name.toLowerCase().includes(o));t.innerHTML=a.map(r=>{const s=L.data.selectedServiceIds.includes(r.id),n=r.photo||"https://placehold.co/40x40/E0E7FF/4F46E5?text=S";return`
            <div class="service-card p-3 bg-white rounded-lg border-2 border-gray-200 cursor-pointer transition-all hover:bg-gray-50 ${s?"selected border-blue-500":""}" data-service-id="${r.id}">
                <div class="flex items-center">
                    <img src="${n}" class="w-8 h-8 rounded-full object-cover mr-3 flex-shrink-0">
                    <div class="flex-1">
                        <p class="font-semibold text-sm text-gray-800">${f(r.name)}</p>
                        <p class="text-xs text-gray-500">R$ ${r.price.toFixed(2)} (${r.duration} min)</p>
                    </div>
                </div>
            </div>`}).join(""),t.querySelectorAll(".service-card").forEach(r=>{r.addEventListener("click",()=>as(r.dataset.serviceId,r))})}function ln(e){const t=document.getElementById("apptProfessionalContainer");if(!t)return;const o=e.toLowerCase(),a=_t.filter(r=>r.name.toLowerCase().includes(o));t.innerHTML=a.map(r=>{const s=L.data.professionalId===r.id,n=r.photo||"https://placehold.co/60x60/E0E7FF/4F46E5?text=P",i=f(r.name);return`
             <div class="professional-modal-card p-3 bg-white rounded-lg border-2 border-gray-200 text-center cursor-pointer transition-all hover:bg-gray-50 ${s?"selected border-blue-500":""}" data-professional-id="${r.id}">
                 <img src="${n}" class="w-12 h-12 rounded-full object-cover mx-auto mb-1">
                 <p class="text-xs font-semibold text-gray-800">${i.split(" ")[0]}</p>
                 <p class="text-[10px] text-gray-500">${f(r.specialty||"Profissional")}</p>
             </div>`}).join(""),t.querySelectorAll(".professional-modal-card").forEach(r=>{r.addEventListener("click",()=>ss(r.dataset.professionalId,r))})}async function mo(e=null,t=!1){const o=document.getElementById("appointmentModal");if(!t){const s=e?.startTime?new Date(e.startTime).toISOString().split("T")[0]:new Date().toISOString().split("T")[0],n=e?.startTime?new Date(e.startTime).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit",hour12:!1}):null;if(L={step:1,data:{id:e?.id||null,clientName:e?.clientName||"",clientPhone:e?.clientPhone||"",selectedServiceIds:e?.services?.map(i=>i.id)||[],professionalId:e?.professionalId||null,professionalName:e?.professionalName||"",date:s,time:n,redeemedReward:e?.redeemedReward||null,clientHasRewards:e?.hasRewards||!1,clientLoyaltyPoints:0}},e&&e.clientName)try{const i=await Ut(m.establishmentId,e.clientName),l=i.find(d=>d.phone===e.clientPhone);l&&(L.data.clientLoyaltyPoints=l.loyaltyPoints||0,Re=i)}catch(i){console.warn("Não foi possível carregar pontos do cliente para edição:",i)}}if(!m.services||!m.professionals||Ve.enabled===void 0){p("Erro","Os dados da agenda ainda não foram carregados. Tente novamente em alguns segundos.","error");return}if(mt=m.services,_t=m.professionals.filter(s=>s.status==="active"),L.data.clientLoyaltyPoints>0){const s=Ve,n=Math.min(...(s?.rewards||[]).map(i=>i.points));L.data.clientHasRewards=s.enabled&&n!==1/0&&L.data.clientLoyaltyPoints>=n}let a={title:"Erro",content:"<p>Etapa não encontrada.</p>"};switch(L.step){case 1:a=on(e);break;case 2:a=an();break;case 3:a=sn();break;case 4:a=rn(e);break}o.innerHTML=`
        <div class="modal-content max-w-4xl p-0 rounded-xl overflow-hidden shadow-2xl">
            <header class="p-5 border-b flex justify-between items-center bg-gray-50">
                <h2 class="text-xl font-bold text-gray-800">${a.title}</h2>
                <button type="button" data-action="close-modal" data-target="appointmentModal" class="text-2xl font-bold text-gray-500 hover:text-gray-900">&times;</button>
            </header>
            
            <form id="appointmentForm" class="flex flex-col h-full">
                <input type="hidden" id="appointmentId" value="${L.data.id||""}">
                <input type="hidden" id="selectedTime" value="${L.data.time||""}">
                
                <div class="flex-1 overflow-y-auto" style="max-height: 80vh;">
                    ${a.content}
                </div>
                
            </form>
        </div>`,o.querySelectorAll('[data-action="next-step"]').forEach(s=>{s.addEventListener("click",()=>{const n=parseInt(s.dataset.currentStep,10);if(n===1){const i=o.querySelector("#apptClientName"),l=o.querySelector("#apptClientPhone");if(L.data.clientName=i.value.trim(),L.data.clientPhone=l.value.trim(),!L.data.clientName||!L.data.clientPhone)return p("Atenção","Nome e telefone do cliente são obrigatórios.","error")}else if(n===2){if(L.data.selectedServiceIds.length===0)return p("Atenção","Selecione pelo menos um serviço.","error")}else if(n===3&&!L.data.professionalId)return p("Atenção","Selecione um profissional.","error");uo(n+1)})}),o.querySelectorAll('[data-action="prev-step"]').forEach(s=>{s.addEventListener("click",()=>uo(parseInt(s.dataset.currentStep,10)-1))});const r=o.querySelector("#appointmentForm");if(L.step===4&&r&&r.addEventListener("submit",Xr),o.style.display="flex",L.step===2){o.querySelector("#apptServicesContainer").querySelectorAll(".service-card").forEach(i=>{i.addEventListener("click",()=>as(i.dataset.serviceId,i))});const n=o.querySelector("#serviceSearchModalInput");n&&n.addEventListener("input",i=>nn(i.target.value))}if(L.step===3){o.querySelector("#apptProfessionalContainer").querySelectorAll(".professional-modal-card").forEach(i=>{i.addEventListener("click",()=>ss(i.dataset.professionalId,i))});const n=o.querySelector("#professionalSearchModalInput");n&&n.addEventListener("input",i=>ln(i.target.value))}if(L.step===1){const s=o.querySelector("#clientSearchInput");if(s&&(s.addEventListener("input",i=>Zr(i.target.value)),L.data.clientName&&L.data.clientPhone&&Re.length>0)){const i=document.getElementById("clientSearchResults");i&&(i.innerHTML=Re.map(rs).join(""))}const n=o.querySelector('[data-action="open-client-registration"]');n&&n.addEventListener("click",tn)}if(L.step===4){const s=o.querySelector("#apptDate");s&&s.addEventListener("change",ra),ra(),Qr()}}async function ns(e={}){P.currentDate=e.targetDate?new Date(e.targetDate):P.currentDate||new Date,P.scrollToAppointmentId=e.scrollToAppointmentId||null,P.profSearchTerm="",P.isSelectionMode=!1,P.selectedItems.clear(),window.innerWidth<768&&(P.currentView="list"),aa.innerHTML=`
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
                            <button data-view="list" class="view-btn ${P.currentView==="list"?"active":""}">Lista</button>
                            <button data-view="week" class="view-btn ${P.currentView==="week"?"active":""}">Semana</button>
                        </div>
                        <div id="week-days-toggle" class="${P.currentView==="week"?"flex":"hidden"} items-center gap-1 rounded-lg bg-gray-200 p-1">
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
        </section>`;const t=document.getElementById("btn-toggle-select");t.addEventListener("click",()=>{P.isSelectionMode=!P.isSelectionMode,P.isSelectionMode||P.selectedItems.clear(),t.classList.toggle("bg-blue-100",P.isSelectionMode),t.classList.toggle("text-blue-700",P.isSelectionMode),os()}),document.querySelectorAll(".view-btn[data-view]").forEach(a=>{a.addEventListener("click",()=>{document.querySelectorAll(".view-btn[data-view]").forEach(s=>s.classList.remove("active")),a.classList.add("active"),P.currentView=a.dataset.view;const r=document.getElementById("week-days-toggle");if(P.currentView==="week"){if(r.style.display="flex",window.innerWidth<768){P.weekViewDays=3,document.querySelectorAll(".week-days-btn").forEach(n=>n.classList.remove("active"));const s=document.querySelector('.week-days-btn[data-days="3"]');s&&s.classList.add("active")}}else r.style.display="none";oe()})}),document.querySelectorAll(".week-days-btn").forEach(a=>{a.addEventListener("click",()=>{document.querySelectorAll(".week-days-btn").forEach(r=>r.classList.remove("active")),a.classList.add("active"),P.weekViewDays=parseInt(a.dataset.days,10),oe()})}),document.getElementById("todayBtn").addEventListener("click",()=>{P.currentDate=new Date,oe()});const o=a=>{const r=parseInt(a.currentTarget.dataset.amount,10),s=P.currentView==="week"?Lo():1,n=new Date(P.currentDate);n.setDate(n.getDate()+r*s),P.currentDate=n,oe()};document.getElementById("prevBtn").addEventListener("click",o),document.getElementById("nextBtn").addEventListener("click",o),document.getElementById("profSearchInput").addEventListener("input",a=>{P.profSearchTerm=a.target.value,Bt()}),document.getElementById("showInactiveProfsToggle").addEventListener("change",a=>{P.showInactiveProfs=a.target.checked,Bt(),oe()}),sa||(aa.addEventListener("click",async a=>{const r=a.target.closest("[data-action]");if(a.target.dataset.action==="toggle-select-item"){const l=a.target.dataset.id;a.target.checked?P.selectedItems.add(l):P.selectedItems.delete(l),To();return}if(r&&r.dataset.action==="batch-delete"){const l=P.selectedItems.size;if(await H("Excluir em Lote",`Tem certeza que deseja excluir ${l} agendamento(s)? Esta ação não pode ser desfeita.`)){const c=Array.from(P.selectedItems);let u=0;try{await Promise.all(c.map(async g=>{try{await Wo(g),u++}catch(b){console.error(`Falha ao excluir ${g}`,b)}})),p(`${u} agendamento(s) excluído(s).`,"success"),P.selectedItems.clear(),P.isSelectionMode=!1,document.getElementById("btn-toggle-select").classList.remove("bg-blue-100","text-blue-700"),oe()}catch{p("Erro ao processar exclusão em lote.","error")}}return}if(a.target.closest('[data-action="select-professional"]')){const d=a.target.closest('[data-action="select-professional"]').dataset.profId,c=P.selectedProfessionalId===d&&d!=="all";if(P.selectedProfessionalId=c?"all":d,d!=="all"){const u=document.getElementById("profSearchInput");u&&(u.value=""),P.profSearchTerm=""}await oe();return}if(!r)return;const s=r.dataset.action;let n=null;const i=a.target.closest("[data-appointment]");switch(i&&(n=JSON.parse(i.dataset.appointment.replace(/&apos;/g,"'"))),s){case"new-appointment":mo();break;case"edit-appointment":if(P.isSelectionMode||!n)return;if(n.status==="completed"){p("Atenção","Agendamentos finalizados não podem ser editados.","error");return}n.hasRewards&&!n.redeemedReward&&p("🎁 Cliente com Prêmios!","Este cliente tem pontos para resgatar. Verifique a Etapa 4 do agendamento.","info"),mo(n);break;case"delete-appointment":{if(P.isSelectionMode)return;const l=r.dataset.id;if(await H("Confirmar Exclusão","Tem a certeza que deseja apagar este agendamento?"))try{await Wo(l),p("Agendamento apagado!","success"),oe()}catch(c){p(`Não foi possível apagar: ${c.message}`,"error")}break}case"open-comanda":if(P.isSelectionMode)return;if(n){n.hasRewards&&!n.redeemedReward&&n.status!=="completed"&&p("🎁 Cliente com Prêmios!","Este cliente tem pontos de fidelidade para resgatar.","info");const l=n.status==="completed"?"finalizadas":"em-atendimento",d={selectedAppointmentId:n.id,initialFilter:l};if(l==="finalizadas"){let c=n.startTime;if(n.transaction&&n.transaction.paidAt){const u=n.transaction.paidAt;typeof u=="object"&&u._seconds?c=new Date(u._seconds*1e3):c=u}d.filterDate=c}Z("comandas-section",d)}break}}),sa=!0),await Gr(),await oe()}const dn=(e,t=null,o=1,a=12)=>{let r=`/api/comandas/${e}?page=${o}&limit=${a}`;return t&&(r+=`&date=${t}`),I(r)},cn=(e,t)=>I(`/api/appointments/${e}/comanda`,{method:"POST",body:JSON.stringify({items:t})}),un=e=>I("/api/sales",{method:"POST",body:JSON.stringify(e)}),mn=e=>I(`/api/sales/${e}`,{method:"DELETE"}),pn=()=>I("/api/cashier/status").catch(e=>{if(e.message.includes("404")||e.message.includes("não encontrada"))return null;throw e}),gn=e=>{const t={establishmentId:e.establishmentId,initialAmount:Number(e.initialAmount),notes:e.notes||""};return console.log("Payload enviado para abrir caixa:",t),I("/api/cashier/open",{method:"POST",body:JSON.stringify(t)})},bn=(e,t)=>{const o={finalAmount:Number(t)};return console.log("Payload enviado para fechar caixa:",o),I(`/api/cashier/close/${e}`,{method:"PUT",body:JSON.stringify(o)})},fn=()=>I("/api/cashier/history").then(e=>e||[]).catch(e=>(console.error("Erro ao buscar histórico:",e),[])),vn=e=>I(`/api/cashier/report/${e}`),Po=e=>I(`/api/packages/${e}`),hn=e=>I("/api/packages",{method:"POST",body:JSON.stringify(e)}),xn=(e,t)=>I(`/api/packages/${e}`,{method:"PUT",body:JSON.stringify(t)}),yn=e=>I(`/api/packages/${e}`,{method:"DELETE"});let x={allComandas:[],catalog:{services:[],products:[],packages:[]},activeFilter:"atendimento",selectedComandaId:null,viewMode:"items",isCashierOpen:!1,activeCashierSessionId:null,loyaltySettings:null,pendingRedemption:null,paging:{page:1,limit:10,total:0},checkoutState:{payments:[],selectedMethod:"dinheiro",installments:1,amountReceived:"",discount:{type:"real",value:0},discountReason:""},isProcessing:!1},Le=null,Pe=null,na=null;function is(e,t){return function(...o){clearTimeout(na),na=setTimeout(()=>e.apply(this,o),t)}}async function ia(e,t="stay"){if(!e||!e.id)return;e._localUpdatedAt=Date.now(),e._cachedItems=null,e._hasUnsavedChanges=!1,lt(),t==="checkout"&&(x.viewMode="checkout",x.checkoutState.payments||(x.checkoutState.payments=[]),x.checkoutState.selectedMethod="dinheiro",x.checkoutState.amountReceived="",x.checkoutState.discount.value||(x.checkoutState.discount={type:"real",value:0},x.checkoutState.discountReason=""),V());const o=document.createElement("div");o.id="saving-overlay",o.className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center backdrop-blur-sm",o.innerHTML=`
        <div class="bg-white p-6 rounded-2xl shadow-2xl flex flex-col items-center animate-fade-in">
            <div class="loader mb-4 border-t-indigo-600"></div>
            <p class="text-gray-800 font-bold text-lg">Sincronizando...</p>
        </div>
    `,document.body.appendChild(o);try{const a=(e.comandaItems||[]).filter(r=>r&&r.id&&String(r.id)!=="undefined"&&String(r.id)!=="null").map(r=>{const s={...r};if(s.id=String(r.id),s.type==="product"){const n=s.id;s.productId||(s.productId=n),s.product_id||(s.product_id=n)}if(s.type==="service"){const n=s.id;s.serviceId||(s.serviceId=n),s.service_id||(s.service_id=n)}return s});e.type==="walk-in"&&String(e.id).startsWith("temp-")||await cn(e.id,a),document.body.contains(o)&&document.body.removeChild(o),t!=="checkout"&&(p("Sucesso","Comanda atualizada!","success"),V())}catch(a){document.body.contains(o)&&document.body.removeChild(o),console.error("Erro ao salvar:",a),e._hasUnsavedChanges=!0,V(),p("Erro","Falha ao salvar no servidor: "+a.message,"warning")}}function $e(e){if(!e._cachedItems){let t=[];if(e.status==="completed"){const o=e.comandaItems||e.items||[];t=o.length>0?o:e.services||[]}else{const o=(e.services||[]).map(n=>({...n,_source:"original_service",type:"service"})),a=o.reduce((n,i)=>{const l=String(i.id);return n[l]=(n[l]||0)+1,n},{}),r=[...e.comandaItems||[],...e.items||[]],s=[];r.forEach(n=>{const i=String(n.id);(n.type==="service"||!n.type)&&a[i]>0?a[i]--:s.push({...n,_source:"extra"})}),t=[...o,...s]}return e._cachedItems=t,e._cachedTimestamp=Date.now(),t}return e._cachedItems}function wn(){const e=document.getElementById("comandas-layout");if(e){e.classList.add("detail-view-active");const t=document.getElementById("comanda-detail-container");t&&(t.scrollTop=0)}}function Be(){const e=document.getElementById("comandas-layout");e&&e.classList.remove("detail-view-active")}function kn(){const e=new Date().toISOString().split("T")[0];Pe.innerHTML=`
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
    `,Wt()}function Wt(){const e=document.getElementById("cashier-alert-box"),t=document.getElementById("btn-new-sale");x.isCashierOpen?(e&&(e.innerHTML=""),t&&(t.classList.remove("opacity-50","cursor-not-allowed"),t.disabled=!1)):(e&&(e.innerHTML=`
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
        `),t&&(t.classList.add("opacity-50","cursor-not-allowed"),t.disabled=!0)),Sn()}function Sn(){const e=document.getElementById("cashier-controls");e&&(x.isCashierOpen?e.innerHTML=`
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
        `,t&&(t.innerHTML="");return}const a={atendimento:"confirmed",finalizadas:"completed"}[x.activeFilter],r=x.allComandas.filter(n=>n.status===a);if(r.length===0){e.innerHTML='<p class="text-center text-gray-400 py-10 text-sm">Nenhuma venda encontrada.</p>',la(t);return}const s=document.createDocumentFragment();r.forEach(n=>{const i=$e(n);let l=0;n.status==="completed"&&n.totalAmount!==void 0&&n.totalAmount!==null?l=Number(n.totalAmount):l=i.reduce((S,y)=>S+Number(y.price||0),0);const c=n.loyaltyRedemption||n.discount&&n.discount.reason&&String(n.discount.reason).toLowerCase().includes("fidelidade")?'<span class="inline-flex items-center justify-center bg-yellow-100 text-yellow-700 rounded-full w-5 h-5 ml-2" title="Prémio Resgatado">🎁</span>':"",u=n.id===x.selectedComandaId,g=new Date(n.startTime).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),b=n.type==="walk-in"||typeof n.id=="string"&&n.id.startsWith("temp-"),h=f(n.clientName||"Cliente sem nome"),v=f(n.professionalName||"Sem profissional"),w=b?'<span class="text-[10px] font-bold uppercase text-blue-600 bg-blue-100 px-2 py-0.5 rounded-md border border-blue-200">Avulso</span>':'<span class="text-[10px] font-bold uppercase text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded-md border border-indigo-200">Agenda</span>',k=document.createElement("div");k.className=`comanda-card cursor-pointer ${u?"selected":""}`,k.dataset.action="select-comanda",k.dataset.comandaId=n.id,k.innerHTML=`
            <div class="flex justify-between items-start mb-1 pointer-events-none">
                <p class="font-bold text-gray-800 truncate max-w-[70%] text-sm">${h}</p>
                <div class="flex items-center">
                    <p class="font-bold text-gray-900 text-sm">R$ ${l.toFixed(2)}</p>
                    ${c}
                </div>
            </div>
            <div class="flex justify-between items-center mt-1 pointer-events-none">
                <div class="flex items-center gap-2">
                    ${w}
                    <p class="text-xs text-gray-500 truncate max-w-[100px]">${v}</p>
                </div>
                <p class="text-xs text-gray-400 font-medium">${g}</p> 
            </div>
        `,s.appendChild(k)}),e.innerHTML="",e.appendChild(s),la(t)}function la(e){if(!e)return;e.innerHTML="";const{page:t,total:o,limit:a}=x.paging,r=Math.ceil((o||0)/a);if(r===0)return;const s=document.createElement("div");s.className="flex gap-2 justify-center items-center w-full",s.innerHTML=`
        <button data-page="${t-1}" class="px-3 py-1 rounded bg-white border border-gray-300 hover:bg-gray-100 text-sm font-medium ${t<=1?"opacity-50 cursor-not-allowed":""}" ${t<=1?"disabled":""}>&laquo;</button>
        <span class="text-xs font-semibold text-gray-600 mx-2">Pág ${t} de ${r||1}</span>
        <button data-page="${t+1}" class="px-3 py-1 rounded bg-white border border-gray-300 hover:bg-gray-100 text-sm font-medium ${t>=r?"opacity-50 cursor-not-allowed":""}" ${t>=r?"disabled":""}>&raquo;</button>
    `,e.appendChild(s),s.querySelectorAll("button[data-page]").forEach(n=>{n.onclick=i=>{i.stopPropagation();const l=parseInt(n.dataset.page,10);l>0&&l<=r&&(x.paging.page=l,re())}})}function V(){const e=document.getElementById("comanda-detail-container");if(!e)return;const t=x.allComandas.find(v=>v.id===x.selectedComandaId);if(x.viewMode==="checkout"&&t){$n(t,e);return}const o=`
        <div class="mobile-only-header">
            <button data-action="back-to-list" class="btn-back-mobile">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
            </button>
            <h3 class="font-bold text-lg text-gray-800 ml-2">Detalhes</h3>
        </div>
    `;if(!x.isCashierOpen){e.innerHTML=`
            ${o}
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
        `;return}const a=$e(t),r=t.status==="completed",s=t.type==="walk-in"||typeof t.id=="string"&&t.id.startsWith("temp-"),n=a.reduce((v,w)=>{const k=w._source==="original_service",S=w.id||w.name,y=k?`original-${S}`:`${w.type}-${S}`;return v[y]||(v[y]={...w,quantity:0,sources:[]}),v[y].quantity+=1,w._source&&v[y].sources.push(w._source),v},{}),i=Object.values(n).reduce((v,w)=>v+Number(w.price||0)*w.quantity,0),l=f(t.clientName||"Cliente sem nome"),d=f(t.professionalName||"Profissional não atribuído"),c=t._hasUnsavedChanges,b=`
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
    `,h=`
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
        ${o} 
        <div class="flex-grow overflow-y-auto p-4 pb-24 custom-scrollbar"> 
            <div class="flex justify-between items-start mb-6 border-b pb-4">
                <div>
                    <h3 class="text-xl font-bold text-gray-800 truncate max-w-[200px]">${l}</h3>
                    <p class="text-sm text-gray-500 flex items-center gap-1 mt-1">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                        ${d}
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
                ${Object.values(n).map(v=>{const w=v.sources&&v.sources.includes("original_service"),k=x.pendingRedemption&&String(x.pendingRedemption.appliedToItemId)===String(v.id),S=v.isReward||k;return`
                    <div class="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-100 shadow-sm ${S?"border-yellow-300 bg-yellow-50 ring-1 ring-yellow-200":""}">
                        <div class="flex items-center gap-3 w-full">
                            <div class="flex-grow min-w-0">
                                <p class="text-sm font-semibold text-gray-800 line-clamp-1">
                                    ${S?"🎁 ":""}
                                    ${f(v.name)}
                                    ${w?'<span class="text-[10px] text-indigo-600 bg-indigo-50 px-1 rounded border border-indigo-100 ml-1">Original</span>':""}
                                </p>
                                <p class="text-xs text-gray-500">${S?'<span class="text-yellow-700 font-bold bg-yellow-100 px-1 rounded">Prémio Fidelidade</span>':`R$ ${(v.price||0).toFixed(2)} un.`}</p>
                            </div>
                            ${r?`<span class="flex items-center justify-center w-8 h-8 bg-gray-100 text-gray-700 font-bold text-sm rounded-lg">${v.quantity}x</span>`:`
                                <div class="flex items-center bg-gray-100 rounded-lg p-1 gap-3">
                                    ${w?`<span class="text-sm font-bold text-gray-500 w-16 text-center py-1 bg-gray-200 rounded text-[10px] uppercase">Fixo: ${v.quantity}</span>`:`<button data-action="decrease-qty" data-item-id="${v.id}" data-item-type="${v.type}" class="w-6 h-6 flex items-center justify-center rounded bg-white text-gray-600 shadow-sm hover:bg-red-50 hover:text-red-600 disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-gray-600">-</button>
                                         <span class="text-sm font-bold text-gray-800 w-4 text-center">${v.quantity}</span>
                                         <button data-action="increase-qty" data-item-id="${v.id}" data-item-type="${v.type}" class="w-6 h-6 flex items-center justify-center rounded bg-white text-gray-600 shadow-sm hover:bg-green-50 hover:text-green-600">+</button>`}
                                </div>
                            `}
                            <div class="flex items-center justify-end w-20">
                                <span class="font-bold text-gray-900 whitespace-nowrap">R$ ${(v.price*v.quantity).toFixed(2)}</span>
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

        ${r?"":h}
    `,!r&&(t.clientId||t.clientName)&&En(t,e.querySelector("#loyalty-container"))}function $n(e,t){const a=$e(e).reduce((g,b)=>g+Number(b.price||0)*(b.quantity||1),0),r=x.checkoutState,s=r.discount||{type:"real",value:0};let n=0;s.type==="percent"?n=a*s.value/100:n=s.value,n>a&&(n=a);const i=a-n,l=r.payments.reduce((g,b)=>g+b.value,0),d=Math.max(0,i-l);(!r.amountReceived||d>0)&&(r.amountReceived=d.toFixed(2));const c=`
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
                <p class="text-sm font-semibold text-gray-500 uppercase tracking-wide">Subtotal: <span id="checkout-subtotal-display">R$ ${a.toFixed(2)}</span></p>
                
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
                    ${d<=.01?'<p class="text-green-600 font-bold text-lg">Pago</p>':`<p class="text-red-500 font-medium">Faltam: <span id="checkout-remaining-display">R$ ${d.toFixed(2)}</span></p>`}
                </div>
            </div>

            <div class="space-y-3 mb-6">
                ${r.payments.map((g,b)=>`
                    <div class="flex justify-between items-center bg-white p-3 rounded-lg border border-gray-200 shadow-sm animate-fade-in-fast">
                        <div class="flex items-center gap-3">
                             <div class="bg-gray-100 p-2 rounded-lg">
                                <span class="font-bold text-xs uppercase text-gray-600">${g.method}</span>
                             </div>
                             ${g.installments>1?`<span class="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">${g.installments}x</span>`:""}
                        </div>
                        <div class="flex items-center gap-3">
                            <span class="font-bold text-gray-900">R$ ${g.value.toFixed(2)}</span>
                            <button data-action="remove-payment-checkout" data-index="${b}" class="text-red-400 hover:text-red-600 p-1"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
                        </div>
                    </div>
                `).join("")}
            </div>

            ${d>.01?`
            <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <label class="block text-xs font-bold text-gray-500 uppercase mb-3">Adicionar Pagamento</label>
                <div class="grid grid-cols-3 gap-2 mb-4">
                    ${["dinheiro","pix","debito","credito","crediario"].map(g=>`
                        <button data-action="select-method" data-method="${g}" class="p-2 rounded-lg border text-xs font-bold uppercase transition ${r.selectedMethod===g?"bg-indigo-600 text-white border-indigo-600 shadow-md":"bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"}">
                            ${g}
                        </button>
                    `).join("")}
                </div>
                
                ${["credito","crediario"].includes(r.selectedMethod)?`
                    <div class="mb-3">
                        <label class="text-xs text-gray-500">Parcelas</label>
                        <select id="checkout-installments" class="w-full mt-1 p-2 border rounded-lg text-sm bg-gray-50">
                            ${Array.from({length:12},(g,b)=>`<option value="${b+1}" ${r.installments===b+1?"selected":""}>${b+1}x</option>`).join("")}
                        </select>
                    </div>
                `:""}

                <div class="flex items-end gap-2">
                    <div class="flex-grow">
                        <label class="text-xs text-gray-500">Valor</label>
                        <input type="number" id="checkout-amount" step="0.01" class="w-full p-2 border rounded-lg text-lg font-bold" value="${d.toFixed(2)}">
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
    `;const u=()=>{const g=x.checkoutState.discount.type,b=x.checkoutState.discount.value;let h=g==="percent"?a*b/100:b;h>a&&(h=a);const v=a-h,w=x.checkoutState.payments.reduce((C,D)=>C+D.value,0),k=Math.max(0,v-w),S=t.querySelector("#checkout-total-display");S&&(S.textContent=`R$ ${v.toFixed(2)}`);const y=t.querySelector("#checkout-status-msg");y&&(k<=.01?y.innerHTML='<p class="text-green-600 font-bold text-lg">Pago</p>':y.innerHTML=`<p class="text-red-500 font-medium">Faltam: <span id="checkout-remaining-display">R$ ${k.toFixed(2)}</span></p>`);const E=t.querySelector("#checkout-amount");E&&k>0&&document.activeElement!==E&&(E.value=k.toFixed(2))};t.querySelector("#discount-value")?.addEventListener("input",g=>{const b=parseFloat(g.target.value)||0;x.checkoutState.discount.value=b,u()}),t.querySelector("#discount-type")?.addEventListener("change",g=>{x.checkoutState.discount.type=g.target.value,u()}),t.querySelector("#discount-reason")?.addEventListener("input",g=>{x.checkoutState.discountReason=g.target.value}),t.querySelector("#checkout-amount")?.addEventListener("input",g=>{x.checkoutState.amountReceived=g.target.value}),t.querySelector("#checkout-installments")?.addEventListener("change",g=>{x.checkoutState.installments=parseInt(g.target.value,10)})}async function En(e,t){if(!t)return;const o=x.loyaltySettings;if(!o||!o.enabled)return;let a=null;try{if(e.clientId)a=await Xa(m.establishmentId,e.clientId);else if(e.clientName){const i=await Ut(m.establishmentId,e.clientName,1);i&&i.length>0&&(a=i[0])}}catch(i){console.warn("Erro ao buscar dados de fidelidade",i)}if(!a||a.loyaltyPoints===void 0)return;const r=Number(a.loyaltyPoints)||0,n=(o.tiers||o.rewards||[]).filter(i=>{const l=Number(i.costPoints||i.points||0);return l>0&&r>=l});if(n.length>0){const i=document.createElement("div");i.className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl p-4 shadow-sm flex justify-between items-center animate-fade-in",i.innerHTML=`
            <div class="flex items-center gap-3">
                <div class="bg-yellow-100 p-2 rounded-full text-yellow-600">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                </div>
                <div>
                    <p class="text-sm font-bold text-yellow-800">Prémio Disponível!</p>
                    <p class="text-xs text-yellow-700">Saldo: <strong>${r} pts</strong></p>
                </div>
            </div>
        `;const l=document.createElement("button");l.innerText="Resgatar",l.className="text-xs font-bold bg-yellow-500 text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-600 transition-colors",l.onclick=()=>In(n,e),i.appendChild(l),t.innerHTML="",t.appendChild(i)}}function In(e,t){const o=`
        <div class="space-y-4">
            <p class="text-sm text-gray-600 mb-4">O cliente possui pontos suficientes para resgatar os seguintes itens:</p>
            <div class="space-y-2 max-h-96 overflow-y-auto custom-scrollbar">
                ${e.map(s=>{const n=s.costPoints||s.points||0,i=s.name||s.reward,l=s.type||"money",d=s.discount?parseFloat(s.discount).toFixed(2):"0.00";let c="",u="bg-gray-100 text-gray-600";switch(l){case"service":c="Serviço",u="bg-indigo-100 text-indigo-700";break;case"product":c="Produto",u="bg-green-100 text-green-700";break;case"package":c="Pacote",u="bg-purple-100 text-purple-700";break;case"money":default:c="Valor Livre",u="bg-yellow-100 text-yellow-700";break}return`
                    <button data-action="select-reward" data-reward-id="${s.id||i}" class="w-full flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:border-yellow-400 hover:bg-yellow-50 transition-all group">
                        <div class="text-left flex-1">
                            <div class="flex items-center gap-2 mb-1">
                                <span class="text-[10px] font-bold uppercase px-2 py-0.5 rounded ${u}">${c}</span>
                                <p class="font-bold text-gray-800 group-hover:text-yellow-700">${f(i)}</p>
                            </div>
                            <p class="text-xs text-gray-500">Custo: ${n} pontos</p>
                        </div>
                        <div class="text-right">
                            <span class="block text-sm font-bold text-green-600">Desc. R$ ${d}</span>
                        </div>
                    </button>
                `}).join("")}
            </div>
        </div>
    `,{modalElement:a,close:r}=Y({title:"🎁 Resgatar Prémio",contentHTML:o,maxWidth:"max-w-md"});a.addEventListener("click",s=>{const n=s.target.closest('[data-action="select-reward"]');if(n){const i=n.dataset.rewardId,l=e.find(d=>d.id&&d.id==i||(d.name||d.reward)==i);l&&(Cn(l,t),r())}})}async function Cn(e,t){const o=Number(e.costPoints||e.points||0),a=e.name||e.reward,r=e.type||"money";if(r==="money"){const l=parseFloat(e.discount)||0;if(l<=0){p("Erro","O valor do desconto configurado é inválido.","error");return}x.checkoutState.discount={type:"real",value:l},x.checkoutState.discountReason=`Resgate Fidelidade: ${a}`,x.pendingRedemption={rewardId:e.id||null,name:a,cost:o,type:"money"},p("Sucesso",`Prémio "${a}" resgatado! Desconto de R$ ${l.toFixed(2)} aplicado.`,"success"),V();return}const s=$e(t),n=e.itemId?String(e.itemId):null;if(!n){p("Erro de Configuração",`O prémio "${a}" não tem um item vinculado nas configurações.`,"error");return}const i=s.find(l=>{const d=l.id?String(l.id):null,c=l.serviceId?String(l.serviceId):l.service_id?String(l.service_id):null,u=l.productId?String(l.productId):l.product_id?String(l.product_id):null;return r==="service"?d===n||c===n:r==="product"?d===n||u===n:r==="package"?d===n:!1});if(i){let l=parseFloat(e.discount);(!l||l<=0)&&(l=parseFloat(i.price||0)),x.checkoutState.discount={type:"real",value:l},x.checkoutState.discountReason=`Resgate Fidelidade: ${a}`,x.pendingRedemption={rewardId:e.id||null,name:a,cost:o,type:r,appliedToItemId:i.id},p("Sucesso",`Prémio "${a}" resgatado! Item encontrado e desconto de R$ ${l.toFixed(2)} aplicado.`,"success"),V()}else p("Item Não Encontrado",`Para resgatar o prémio "${a}", o ${r==="service"?"serviço":r==="product"?"produto":"pacote"} correspondente deve estar lançado nesta comanda. Por favor, adicione o item primeiro e tente resgatar novamente.`,"warning")}function Ln(){if(!x.isCashierOpen)return p("Caixa Fechado","Abra o caixa antes de adicionar itens.","error");const{modalElement:e,close:t}=Y({title:"Adicionar Item à Comanda",contentHTML:'<div id="add-item-content"></div>',maxWidth:"max-w-4xl"}),o=()=>{const r=e.querySelector("#add-item-content");r.innerHTML=`
            <input type="search" id="item-search-input" placeholder="Pesquisar por nome..." class="w-full p-3 mb-4 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div><h4 class="font-semibold mb-2 text-center text-indigo-600">Serviços</h4><div id="modal-service-list" class="space-y-2 max-h-80 overflow-y-auto custom-scrollbar"></div></div>
                <div><h4 class="font-semibold mb-2 text-center text-green-600">Produtos</h4><div id="modal-product-list" class="space-y-2 max-h-80 overflow-y-auto custom-scrollbar"></div></div>
                <div><h4 class="font-semibold mb-2 text-center text-purple-600">Pacotes</h4><div id="modal-package-list" class="space-y-2 max-h-80 overflow-y-auto custom-scrollbar"></div></div>
            </div>`;const s=(i="")=>{const l=i.toLowerCase(),d={service:'<svg class="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v4.512a9.04 9.04 0 00-3 5.012M12 12a9.04 9.04 0 01-3-5.012V5l-1-1z" /></svg>',product:'<svg class="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>',package:'<svg class="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-14L4 7m8 4v10M4 7v10l8 4" /></svg>'},c={"modal-service-list":{items:x.catalog.services,type:"service"},"modal-product-list":{items:x.catalog.products,type:"product"},"modal-package-list":{items:x.catalog.packages,type:"package"}};Object.entries(c).forEach(([u,{items:g,type:b}])=>{const h=document.getElementById(u);if(!h)return;const v=g.filter(w=>w.name.toLowerCase().includes(l)).slice(0,50);h.innerHTML=v.map(w=>w.id?`
                    <button data-action="select-item-for-quantity" data-item-type="${b}" data-item-id="${w.id}" class="flex items-center gap-2 w-full p-2 bg-white border rounded hover:bg-gray-50 transition text-left">
                        <div class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gray-50">${d[b]}</div>
                        <span class="flex-grow text-sm truncate">${f(w.name)}</span>
                        <span class="font-bold text-xs text-gray-700">R$ ${w.price.toFixed(2)}</span>
                    </button>
                `:"").join("")||'<p class="text-xs text-gray-400 text-center py-2">Nada encontrado</p>'})};s();const n=document.getElementById("item-search-input");n.addEventListener("input",is(i=>{s(i.target.value)},300)),setTimeout(()=>n.focus(),100)},a=r=>{let s=1;const n=e.querySelector("#add-item-content"),i=()=>{document.getElementById("quantity-display").textContent=s,document.getElementById("quantity-minus-btn").disabled=s<=1};n.innerHTML=`
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
        `,document.getElementById("quantity-minus-btn").onclick=()=>{s>1&&(s--,i())},document.getElementById("quantity-plus-btn").onclick=()=>{s++,i()},document.querySelector('[data-action="confirm-add-item"]').onclick=async()=>{await ds(r,s),t()}};e.addEventListener("click",r=>{const s=r.target.closest('[data-action="select-item-for-quantity"]'),n=r.target.closest('[data-action="back-to-catalog"]');if(s){const{itemType:i,itemId:l}=s.dataset,c=(x.catalog[i+"s"]||[]).find(u=>u.id===l);c&&a({...c,type:i})}else n&&o()}),o()}async function po(e=null){if(!x.isCashierOpen)return p("Caixa Fechado","Abra o caixa antes de criar uma nova venda.","error");if(!m.professionals||m.professionals.length===0)try{m.professionals=await K(m.establishmentId)}catch{return p("Erro","Não foi possível carregar profissionais.","error")}const o=`
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
                <select id="new-sale-professional" required class="mt-1 w-full p-2 border rounded-md bg-white"><option value="">Selecione...</option>${m.professionals.map(l=>`<option value="${l.id}">${f(l.name)}</option>`).join("")}</select>
            </div>
            <div class="pt-4 border-t"><button type="submit" id="btn-start-sale" class="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400">Iniciar Venda</button></div>
        </form>
    `,{modalElement:a}=Y({title:"Nova Venda Avulsa",contentHTML:o,maxWidth:"max-w-md"}),r=a.querySelector("#client-search"),s=a.querySelector("#client-suggestions"),n=a.querySelector("#selected-client-id");e&&(n.value=e.id,r.value=`${e.name} (${e.phone||"Sem tel"})`,r.classList.add("bg-green-50","border-green-300","text-green-800")),r.addEventListener("input",is(async l=>{const d=l.target.value.trim();if(n.value="",r.classList.remove("bg-green-50","border-green-300","text-green-800"),d.length<2){s.classList.add("hidden");return}try{s.innerHTML='<li class="p-2 text-xs text-gray-500">Buscando...</li>',s.classList.remove("hidden");const c=await Ut(m.establishmentId,d,10);c.length===0?s.innerHTML='<li class="p-2 text-xs text-gray-500">Nenhum cliente encontrado</li>':s.innerHTML=c.map(u=>`<li data-client-id="${u.id}" data-client-name="${u.name}" data-client-phone="${u.phone}" class="p-2 hover:bg-indigo-50 cursor-pointer border-b last:border-0 transition-colors"><div class="font-bold text-sm text-gray-800">${f(u.name)}</div><div class="text-xs text-gray-500">${u.phone||"Sem telefone"}</div></li>`).join("")}catch{s.classList.add("hidden")}},400)),s.addEventListener("click",l=>{const d=l.target.closest("li[data-client-id]");d&&(n.value=d.dataset.clientId,n.dataset.name=d.dataset.clientName,n.dataset.phone=d.dataset.clientPhone,r.value=`${d.dataset.clientName}`,r.classList.add("bg-green-50","border-green-300","text-green-800"),s.classList.add("hidden"))}),document.addEventListener("click",l=>{!r.contains(l.target)&&!s.contains(l.target)&&s.classList.add("hidden")}),a.querySelector("#new-sale-form").addEventListener("submit",qn);const i=a.querySelector('[data-action="new-client-from-sale"]');i&&i.addEventListener("click",l=>{l.preventDefault(),a.style.display="none",Tn()})}function Tn(){Y({title:"Cadastrar Novo Cliente",contentHTML:`
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
    `,maxWidth:"max-w-2xl"});const t=document.getElementById("comandas_clientRegistrationForm");t&&t.addEventListener("submit",Pn)}async function Pn(e){e.preventDefault();const t=document.getElementById("comandas_clientRegistrationForm");if(!t)return;const o=t.querySelector("#regClientName"),r=t.querySelector("#regClientPhone").value.replace(/\D/g,"");if(!o.value||!r)return p("Erro","Nome e Telefone são obrigatórios.","error");try{const s=await Vr(m.establishmentId,r);if(s)p("Atenção","Cliente já cadastrado.","info"),document.getElementById("genericModal").style.display="none",po(s);else{const n=await Co({establishmentId:m.establishmentId,name:o.value,phone:r});p("Sucesso","Cliente cadastrado!","success"),document.getElementById("genericModal").style.display="none",po(n)}}catch(s){p("Erro",s.message,"error")}}async function Bn(){const e=`
        <form id="open-cashier-form" class="space-y-4">
            <div>
                <label for="initial-amount" class="block text-sm font-medium text-gray-700">Valor Inicial do Caixa</label>
                <div class="mt-1 relative"><span class="absolute left-3 top-2 text-gray-500 font-semibold">R$</span><input type="number" step="0.01" min="0" id="initial-amount" required class="w-full p-2 pl-12 border rounded-md text-lg font-semibold" placeholder="0.00" value="0.00"></div>
            </div>
            <div class="pt-4 border-t"><button type="submit" class="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition shadow-md">Confirmar Abertura</button></div>
        </form>
    `,{modalElement:t}=Y({title:"Abrir Caixa",contentHTML:e,maxWidth:"max-w-md"});t.querySelector("#open-cashier-form").addEventListener("submit",async o=>{o.preventDefault();const a=parseFloat(document.getElementById("initial-amount").value);if(isNaN(a)||a<0)return p("Valor Inválido","Insira um valor válido.","error");try{const r=await gn({establishmentId:m.establishmentId,initialAmount:parseFloat(a.toFixed(2))});x.isCashierOpen=!0,x.activeCashierSessionId=r.id,document.getElementById("genericModal").style.display="none",p("Sucesso!",`Caixa aberto (R$ ${a.toFixed(2)})`,"success"),Wt(),await re()}catch(r){p("Erro",`Falha ao abrir caixa: ${r.message}`,"error")}})}async function Dn(){const e=x.activeCashierSessionId;if(e)try{const t=await vn(e),o=`
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
        `,{modalElement:a}=Y({title:"Fechar Caixa",contentHTML:o,maxWidth:"max-w-md"});a.querySelector("#close-cashier-form").addEventListener("submit",async r=>{r.preventDefault();const s=parseFloat(document.getElementById("final-amount").value);if(isNaN(s)||s<0)return p("Valor Inválido","Insira um valor final válido.","error");try{await bn(e,s),x.isCashierOpen=!1,x.activeCashierSessionId=null,document.getElementById("genericModal").style.display="none",Wt(),await re(),p("Sucesso!","Caixa fechado com sucesso!","success")}catch(n){p("Erro",`Falha ao fechar caixa: ${n.message}`,"error")}})}catch(t){p("Erro",`Falha ao carregar relatório: ${t.message}`,"error")}}async function Mn(e){if(x.activeFilter===e)return;x.activeFilter=e,x.paging.page=1,document.querySelectorAll(".filter-btn").forEach(o=>o.classList.remove("bg-white","text-indigo-600","shadow")),document.querySelector(`[data-filter="${e}"]`).classList.add("bg-white","text-indigo-600","shadow"),document.getElementById("finalizadas-datepicker").classList.toggle("hidden",e!=="finalizadas"),Be(),x.selectedComandaId=null,x.viewMode="items";const t=document.getElementById("comandas-list");t&&(t.innerHTML='<div class="loader mx-auto mt-10"></div>'),await re(),V()}function ls(e){x.selectedComandaId=e,x.viewMode="items",x.pendingRedemption=null,x.checkoutState.discount={type:"real",value:0},x.checkoutState.discountReason="",lt(),wn(),V()}async function ds(e,t){const o=x.allComandas.find(s=>s.id===x.selectedComandaId);if(!o)return;if(!e.id||String(e.id)==="undefined"){console.error("Tentativa de adicionar item sem ID:",e),p("Erro","Item sem identificador. Não foi possível adicionar.","error");return}const a=parseFloat(e.price)||0,r=Array(t).fill(0).map(()=>{const s={id:String(e.id),name:e.name,price:a,type:e.type,isReward:e.isReward||!1,pointsCost:e.pointsCost||0};return e.type==="product"?(s.productId=s.id,s.product_id=s.id):e.type==="service"&&(s.serviceId=s.id,s.service_id=s.id),s});o.comandaItems=o.comandaItems||[],o.comandaItems.push(...r),o._cachedItems=null,o._hasUnsavedChanges=!0,V()}async function da(e,t){const o=x.allComandas.find(s=>s.id===x.selectedComandaId);if(!o)return;let a=!1,r=(o.comandaItems||[]).findIndex(s=>s.id==e&&s.type===t);r>-1&&(o.comandaItems.splice(r,1),a=!0),a&&(o._cachedItems=null,o._hasUnsavedChanges=!0,V())}async function An(e){if(x.isProcessing)return;const t=$e(e),o=t.reduce((w,k)=>w+Number(k.price||0)*(k.quantity||1),0),a=x.checkoutState.discount||{type:"real",value:0};let r=a.type==="percent"?o*a.value/100:a.value;r>o&&(r=o);const s=o-r,{payments:n}=x.checkoutState,i=n.reduce((w,k)=>w+k.value,0),l=s-i;if(l>.01){if(!await H("Pagamento Parcial",`O valor de R$ ${l.toFixed(2)} não foi pago. Deseja registrar como DÍVIDA (Fiado) no cadastro do cliente?`))return;n.push({method:"fiado",value:l,installments:1})}x.isProcessing=!0;const d=e.type==="appointment",c=t;let u=0;const g=x.loyaltySettings;g&&g.enabled&&(u=parseInt(g.pointsPerVisit||1,10),console.log(`Fidelidade: Cliente ganhou ${u} pontos fixos pela visita.`));const b={...a,reason:x.checkoutState.discountReason||""},h={payments:n,totalAmount:Number(s),items:c,cashierSessionId:x.activeCashierSessionId,loyaltyPointsEarned:u,discount:b,loyaltyRedemption:x.pendingRedemption},v=document.createElement("div");v.className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center backdrop-blur-sm",v.innerHTML='<div class="bg-white p-6 rounded-2xl shadow-2xl flex flex-col items-center"><div class="loader mb-4 border-t-indigo-600"></div><p>Finalizando venda...</p></div>',document.body.appendChild(v);try{d?await er(e.id,h):(h.establishmentId=m.establishmentId,h.clientId=e.clientId,h.clientName=e.clientName,h.professionalId=e.professionalId,e.clientPhone&&(h.clientPhone=e.clientPhone),await un(h));let w="Venda finalizada com sucesso!";u>0&&(w+=` Cliente ganhou ${u} pontos!`),p("Sucesso!",w,"success"),Be(),x.selectedComandaId=null,x.viewMode="items",x.pendingRedemption=null,await re()}catch(w){p("Erro no Checkout",w.message,"error")}finally{document.body.contains(v)&&document.body.removeChild(v),x.isProcessing=!1}}async function qn(e){e.preventDefault();const t=document.getElementById("selected-client-id"),o=document.getElementById("new-sale-professional").value,a=t.value,r=document.getElementById("client-search").value,s=t.dataset.phone||"";if(!a)return p("Erro","Selecione um cliente válido.","error");const n=m.professionals.find(l=>l.id===o);if(!n)return p("Erro","Selecione um profissional válido.","error");const i={id:`temp-${Date.now()}`,type:"walk-in",clientId:a,clientName:r.split("(")[0].trim(),clientPhone:s,professionalId:n.id,professionalName:n.name,startTime:new Date,status:"confirmed",services:[],comandaItems:[]};x.allComandas.unshift(i),x.selectedComandaId=i.id,x.viewMode="items",document.getElementById("genericModal").style.display="none",ls(i.id)}async function re(){const e=document.getElementById("comandas-list");(!e.hasChildNodes()||e.innerHTML.includes("loader"))&&(e.innerHTML='<div class="loader mx-auto mt-10"></div>');const t=x.activeFilter==="finalizadas"?document.getElementById("filter-date").value:null;try{const o=pn(),a=dn(m.establishmentId,t,x.paging.page,x.paging.limit),r=Ie(m.establishmentId),[s,n,i]=await Promise.all([o,a,r]);if(x.isCashierOpen=!!s,x.activeCashierSessionId=s?s.id:null,Wt(),i&&i.loyaltyProgram&&(x.loyaltySettings=i.loyaltyProgram),!x.isCashierOpen&&x.activeFilter==="atendimento"){lt(),V();return}if(x.allComandas=n.data||n,x.paging.total=n.total||n.length,x.catalog.services.length===0){const[l,d,c,u]=await Promise.all([be(m.establishmentId),ut(m.establishmentId),Po(m.establishmentId),K(m.establishmentId)]);x.catalog={services:l,products:d,packages:c},m.professionals=u}lt(),V()}catch(o){p("Erro",`Não foi possível carregar os dados: ${o.message}`,"error")}}async function Nn(e={}){Pe=document.getElementById("content"),x.selectedComandaId=e.selectedAppointmentId||null,x.viewMode="items",kn(),Le&&(Pe.removeEventListener("click",Le),Pe.removeEventListener("change",Le)),Le=async t=>{const o=t.target.closest("[data-action], [data-filter], [data-comanda-id]");if(t.target.id==="filter-date"&&x.activeFilter==="finalizadas"){x.paging.page=1,await re();return}if(o){if(o.matches("[data-filter]"))Mn(o.dataset.filter);else if(o.matches("[data-comanda-id]")){if(t.target.closest('[data-action="go-to-appointment"]')){t.stopPropagation();return}ls(o.dataset.comandaId)}else if(o.matches("[data-action]")){const r=o.dataset.action,s=o.dataset.id||x.selectedComandaId,n=x.allComandas.find(i=>i.id===s);switch(r){case"back-to-list":Be(),x.selectedComandaId=null,document.querySelectorAll(".comanda-card").forEach(S=>S.classList.remove("selected")),V();break;case"new-sale":po();break;case"add-item":Ln();break;case"open-cashier":Bn();break;case"close-cashier":await Dn();break;case"view-sales-report":Z("sales-report-section");break;case"go-to-checkout":await ia(n,"checkout");break;case"back-to-items":x.viewMode="items",V();break;case"save-comanda":await ia(n,"stay");break;case"select-method":x.checkoutState.selectedMethod=o.dataset.method,x.checkoutState.installments=1,V();break;case"add-payment-checkout":const i=document.getElementById("checkout-amount");let l=parseFloat(i.value);const c=$e(n).reduce((S,y)=>S+(y.price||0),0),u=x.checkoutState.discount||{type:"real",value:0};let g=u.type==="percent"?c*u.value/100:u.value;g>c&&(g=c);const b=c-g,h=x.checkoutState.payments.reduce((S,y)=>S+y.value,0),v=b-h;if(isNaN(l)||l<=0){p("Valor inválido","Insira um valor maior que zero.","error");break}if(l>v+.05){p("Valor inválido","Valor excede o restante.","error");break}const w={method:x.checkoutState.selectedMethod,value:l};["credito","crediario"].includes(x.checkoutState.selectedMethod)&&x.checkoutState.installments>1&&(w.installments=x.checkoutState.installments),x.checkoutState.payments.push(w),x.checkoutState.selectedMethod="dinheiro",x.checkoutState.installments=1,x.checkoutState.amountReceived="",V();break;case"remove-payment-checkout":const k=parseInt(o.dataset.index,10);x.checkoutState.payments.splice(k,1),V();break;case"finalize-checkout":await An(n);break;case"increase-qty":{const S=o.dataset.itemId,y=o.dataset.itemType;if(!S||S==="undefined"||S==="null"){p("Erro","Item inválido para adição.","error");return}let C=$e(n).find(A=>A.id==S&&A.type===y);C||(C=(x.catalog[y+"s"]||[]).find(T=>T.id==S));const D=C?{id:C.id,name:C.name,price:Number(C.price),type:C.type}:{id:S,name:"Item Indisponível",price:0,type:y};await ds(D,1);break}case"decrease-qty":{await da(o.dataset.itemId,o.dataset.itemType);break}case"remove-item":await da(o.dataset.itemId,o.dataset.itemType);break;case"reopen-appointment":{if(await H("Reabrir Comanda","Tem certeza? O pagamento será estornado."))try{await Ks(s);const y=x.allComandas.findIndex(E=>E.id===s);y!==-1&&(x.allComandas[y].status="confirmed",delete x.allComandas[y].transaction),x.selectedComandaId=null,Be(),await re(),p("Sucesso!","Comanda reaberta.","success")}catch(y){p("Erro",y.message,"error")}break}case"go-to-appointment":{const S=o.dataset.id,y=o.dataset.date;Z("agenda-section",{scrollToAppointmentId:S,targetDate:new Date(y)});break}case"delete-walk-in":{if(await H("Excluir Venda","Confirma a exclusão desta venda avulsa?"))if(s.startsWith("temp-"))x.allComandas=x.allComandas.filter(y=>y.id!==s),x.selectedComandaId=null,lt(),V(),Be();else try{await mn(s),p("Sucesso","Venda excluída.","success"),x.selectedComandaId=null,Be(),await re()}catch(y){p("Erro",y.message,"error")}break}}}}},Pe.addEventListener("click",Le),Pe.addEventListener("change",Le),e.initialFilter&&(x.activeFilter=e.initialFilter==="finalizadas"?"finalizadas":"atendimento"),e.selectedAppointmentId&&(x.selectedComandaId=e.selectedAppointmentId),document.querySelectorAll(".filter-btn").forEach(t=>t.classList.remove("bg-white","text-indigo-600","shadow")),document.querySelector(`[data-filter="${x.activeFilter}"]`).classList.add("bg-white","text-indigo-600","shadow"),document.getElementById("finalizadas-datepicker").classList.toggle("hidden",x.activeFilter!=="finalizadas"),e.filterDate&&(document.getElementById("filter-date").value=new Date(e.filterDate).toISOString().split("T")[0]),await re()}const Bo=e=>I(`/api/financial/natures/${e}`),Rn=e=>I("/api/financial/natures",{method:"POST",body:JSON.stringify(e)}),jn=e=>I(`/api/financial/natures/${e}`,{method:"DELETE"}),Do=e=>I(`/api/financial/cost-centers/${e}`),Fn=e=>I("/api/financial/cost-centers",{method:"POST",body:JSON.stringify(e)}),Hn=e=>I(`/api/financial/cost-centers/${e}`,{method:"DELETE"}),cs=(e,t)=>I(`/api/financial/${e}`,{method:"POST",body:JSON.stringify(t)}),us=(e,t={})=>{let o=`/api/financial/${e}`;const a=new URLSearchParams;t.establishmentId&&a.append("establishmentId",t.establishmentId),t.startDate&&a.append("startDate",t.startDate),t.endDate&&a.append("endDate",t.endDate),t.natureId&&a.append("natureId",t.natureId),t.costCenterId&&a.append("costCenterId",t.costCenterId),t.status&&a.append("status",t.status);const r=a.toString();return r&&(o+=`?${r}`),I(o)},ms=(e,t,o)=>I(`/api/financial/${e}/${t}`,{method:"PUT",body:JSON.stringify(o)}),ps=(e,t)=>I(`/api/financial/${e}/${t}`,{method:"DELETE"}),gs=(e,t)=>{const o=t.map(a=>I(`/api/financial/${e}/${a}`,{method:"DELETE"}));return Promise.all(o)},bs=(e,t,o)=>I(`/api/financial/${e}/${t}/status`,{method:"PATCH",body:JSON.stringify({status:"paid",paymentDate:o})}),On=e=>cs("payables",e),zn=e=>us("payables",e),Vn=(e,t)=>ms("payables",e,t),Un=e=>ps("payables",e),_n=(e,t)=>bs("payables",e,t),Wn=e=>cs("receivables",e),Jn=e=>us("receivables",e),Gn=(e,t)=>ms("receivables",e,t),Yn=e=>ps("receivables",e),Qn=(e,t)=>bs("receivables",e,t),Xn=(e,t,o)=>I(`/api/financial/cash-flow?establishmentId=${e}&startDate=${t}&endDate=${o}`),go=document.getElementById("content");let me={};const ca=["#4f46e5","#10b981","#f59e0b","#ef4444","#8b5cf6","#ec4899","#06b6d4"],q={startDate:new Date(new Date().getFullYear(),new Date().getMonth(),1).toISOString().split("T")[0],endDate:new Date().toISOString().split("T")[0],selectedProfessional:"all",selectedCostCenter:"all",professionalsList:[],costCentersList:[],data:null,appointmentsData:[],cashFlowData:null,currentTab:"dashboards",isFilterOpen:!1};async function Zn(){if(!window.Chart)return new Promise((e,t)=>{const o=document.createElement("script");o.src="https://cdn.jsdelivr.net/npm/chart.js",o.onload=e,o.onerror=t,document.head.appendChild(o)})}async function Kn(){go.innerHTML=`
        <div class="flex flex-col items-center justify-center h-[calc(100vh-100px)]">
            <div class="loader mb-4 border-t-indigo-600"></div>
            <p class="text-gray-500 font-medium animate-pulse">Carregando inteligência...</p>
        </div>`;try{await Zn();const[e,t]=await Promise.all([K(m.establishmentId),jr(m.establishmentId).catch(()=>[])]);q.professionalsList=e||[],q.costCentersList=t||[],ei(),await fs()}catch(e){console.error("Erro no loadReportsPage:",e),go.innerHTML=`
            <div class="flex flex-col items-center justify-center h-full text-red-500 p-6 text-center">
                <div class="bg-red-50 p-4 rounded-full mb-4"><svg class="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div>
                <h3 class="text-lg font-bold text-gray-800">Ops! Algo deu errado.</h3>
                <p class="text-sm text-gray-600 mt-2">${f(e.message)}</p>
                <button onclick="window.location.reload()" class="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-700 transition-transform active:scale-95">Tentar Novamente</button>
            </div>`}}function ei(){const e=q.professionalsList.map(o=>`<option value="${o.id}">${f(o.name)}</option>`).join(""),t=q.costCentersList.map(o=>`<option value="${o.id}">${f(o.name)}</option>`).join("");go.innerHTML=`
        <div class="flex flex-col min-h-screen bg-gray-50 pb-24 relative w-full overflow-x-hidden">
            
            <div class="sticky top-0 z-30 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 transition-all duration-300">
                <div class="max-w-7xl mx-auto px-3 md:px-4 py-3">
                    <div class="flex justify-between items-center">
                        <div class="overflow-hidden mr-2">
                            <h1 class="text-lg md:text-xl font-bold text-gray-800 flex items-center gap-2 truncate">
                                <svg class="w-5 h-5 md:w-6 md:h-6 text-indigo-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                                Relatórios
                            </h1>
                            <p class="text-[10px] md:text-xs text-gray-500 mt-0.5 truncate" id="date-range-display">
                                ${Dt(q.startDate)} até ${Dt(q.endDate)}
                            </p>
                        </div>
                        <button id="toggle-filters-btn" class="p-2 bg-indigo-50 text-indigo-600 rounded-full hover:bg-indigo-100 transition-colors relative flex-shrink-0">
                            <svg class="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
                        </button>
                    </div>
                </div>

                <div id="filters-container" class="hidden border-t border-gray-100 bg-gray-50/50 overflow-hidden transition-all duration-300">
                    <div class="p-4 grid grid-cols-1 md:grid-cols-4 gap-3 max-w-7xl mx-auto">
                        <div class="space-y-1">
                            <label class="text-xs font-semibold text-gray-500 ml-1">Início</label>
                            <input type="date" id="report-start" value="${q.startDate}" class="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm">
                        </div>
                        <div class="space-y-1">
                            <label class="text-xs font-semibold text-gray-500 ml-1">Fim</label>
                            <input type="date" id="report-end" value="${q.endDate}" class="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm">
                        </div>
                        <div class="space-y-1">
                            <label class="text-xs font-semibold text-gray-500 ml-1">Profissional</label>
                            <select id="report-prof" class="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm">
                                <option value="all">Todos Profissionais</option>
                                ${e}
                            </select>
                        </div>
                        <div class="space-y-1">
                            <label class="text-xs font-semibold text-gray-500 ml-1">Centro de Custo</label>
                            <select id="report-cost" class="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm">
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
                        <button data-tab="appointments" class="tab-btn flex-1 py-2 px-4 rounded-full text-xs md:text-sm font-medium transition-all whitespace-nowrap border">Agendamentos</button>
                        <button data-tab="dre" class="tab-btn flex-1 py-2 px-4 rounded-full text-xs md:text-sm font-medium transition-all whitespace-nowrap border">DRE Contábil</button>
                    </div>
                </div>
            </div>

            <main id="report-content" class="flex-1 max-w-7xl w-full mx-auto px-3 md:px-4 py-4 space-y-4 animate-fade-in"></main>
        </div>
    `,document.getElementById("toggle-filters-btn").onclick=ua,document.getElementById("btn-apply-filters").onclick=()=>{ti(),ua()},document.querySelectorAll(".tab-btn").forEach(o=>{o.onclick=()=>{q.currentTab=o.dataset.tab,ma(),vs(),window.scrollTo({top:0,behavior:"smooth"})}}),ma()}function ua(){const e=document.getElementById("filters-container"),t=document.getElementById("toggle-filters-btn");q.isFilterOpen=!q.isFilterOpen,q.isFilterOpen?(e.classList.remove("hidden"),t.classList.add("bg-indigo-100","text-indigo-800")):(e.classList.add("hidden"),t.classList.remove("bg-indigo-100","text-indigo-800"))}function ma(){document.querySelectorAll(".tab-btn").forEach(e=>{const t=e.dataset.tab===q.currentTab;e.className=t?"tab-btn py-2 px-6 rounded-full text-xs md:text-sm font-bold bg-indigo-600 text-white shadow-md transform scale-105 transition-all whitespace-nowrap border-transparent":"tab-btn py-2 px-6 rounded-full text-xs md:text-sm font-medium text-gray-500 bg-white border-gray-200 hover:bg-gray-50 transition-all whitespace-nowrap"})}function Dt(e){if(!e)return"";const t=e.split("-");return`${t[2]}/${t[1]}`}async function ti(){q.startDate=document.getElementById("report-start").value,q.endDate=document.getElementById("report-end").value,q.selectedProfessional=document.getElementById("report-prof").value,q.selectedCostCenter=document.getElementById("report-cost").value,document.getElementById("date-range-display").textContent=`${Dt(q.startDate)} até ${Dt(q.endDate)}`,await fs()}async function fs(){const e=document.getElementById("report-content");e.innerHTML='<div class="flex justify-center py-20"><div class="loader border-t-indigo-600"></div></div>';try{const t=q.selectedProfessional==="all"?null:q.selectedProfessional,o=Rr(q.startDate,q.endDate,q.selectedProfessional,q.selectedCostCenter),a=Xn(m.establishmentId,q.startDate,q.endDate).catch(()=>({labels:[],payables:[],receivables:[],expectedBalance:[]})),r=new Date(q.startDate+"T00:00:00").toISOString(),s=new Date(q.endDate+"T23:59:59").toISOString(),n=Ha(m.establishmentId,r,s,t).catch(()=>[]),[i,l,d]=await Promise.all([o,a,n]);q.data=i,q.cashFlowData=l,q.appointmentsData=Array.isArray(d)?d:[],vs()}catch(t){console.error(t),e.innerHTML=`
            <div class="bg-red-50 border border-red-100 p-6 rounded-2xl text-center mx-4">
                <div class="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                </div>
                <p class="font-bold text-gray-800">Não foi possível carregar</p>
                <p class="text-sm text-gray-500 mt-1">${f(t.message||"Verifique sua conexão.")}</p>
            </div>`}}function vs(){const e=document.getElementById("report-content");if(q.data)switch(q.currentTab){case"dashboards":oi(e);break;case"appointments":ai(e);break;case"dre":si(e);break}}function oi(e){const{dreSimple:t,charts:o}=q.data,a=t||{grossRevenue:0,netProfit:0,variableCosts:0};e.innerHTML=`
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 animate-slide-up w-full">
            <div class="bg-white p-4 md:p-5 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group">
                <div class="absolute right-0 top-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <svg class="w-16 h-16 md:w-20 md:h-20 text-blue-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
                </div>
                <div class="flex items-center gap-2 mb-2">
                    <span class="p-2 bg-blue-50 text-blue-600 rounded-lg">
                        <svg class="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8a1 1 0 011 1v4a1 1 0 11-2 0v-4a1 1 0 011-1zm0 0a1 1 0 001-1V5a1 1 0 10-2 0v2a1 1 0 001 1zm0 0a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1z" /></svg>
                    </span>
                    <p class="text-[10px] md:text-xs text-gray-500 font-bold uppercase tracking-wider">Faturamento</p>
                </div>
                <p class="text-xl md:text-2xl font-black text-gray-800 tracking-tight">R$ ${a.grossRevenue.toLocaleString("pt-BR",{minimumFractionDigits:2})}</p>
                <div class="mt-3 md:mt-4 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                     <div class="h-full bg-blue-500 rounded-full" style="width: 100%"></div>
                </div>
            </div>

            <div class="bg-white p-4 md:p-5 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
                <div class="flex items-center gap-2 mb-2">
                    <span class="p-2 bg-red-50 text-red-600 rounded-lg">
                        <svg class="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" /></svg>
                    </span>
                    <p class="text-[10px] md:text-xs text-gray-500 font-bold uppercase tracking-wider">Custos</p>
                </div>
                <p class="text-xl md:text-2xl font-black text-red-500 tracking-tight">R$ ${a.variableCosts.toLocaleString("pt-BR",{minimumFractionDigits:2})}</p>
                <div class="mt-3 md:mt-4 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                     <div class="h-full bg-red-500 rounded-full" style="width: ${a.grossRevenue>0?a.variableCosts/a.grossRevenue*100:0}%"></div>
                </div>
            </div>

            <div class="bg-white p-4 md:p-5 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
                <div class="flex items-center gap-2 mb-2">
                    <span class="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                        <svg class="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </span>
                    <p class="text-[10px] md:text-xs text-gray-500 font-bold uppercase tracking-wider">Lucro Líquido</p>
                </div>
                <p class="text-xl md:text-2xl font-black text-emerald-600 tracking-tight">R$ ${a.netProfit.toLocaleString("pt-BR",{minimumFractionDigits:2})}</p>
                 <div class="mt-3 md:mt-4 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                     <div class="h-full bg-emerald-500 rounded-full" style="width: ${a.grossRevenue>0?a.netProfit/a.grossRevenue*100:0}%"></div>
                </div>
            </div>
        </div>

        <div class="bg-white p-4 md:p-5 rounded-3xl shadow-sm border border-gray-100 mt-4 md:mt-6 animate-slide-up delay-100 w-full">
            <div class="mb-4 md:mb-6">
                <h3 class="text-base md:text-lg font-bold text-gray-800">Fluxo de Caixa</h3>
                <p class="text-[10px] md:text-xs text-gray-400">Entradas, saídas e saldo acumulado.</p>
            </div>
            <div class="relative w-full h-64 md:h-96">
                <canvas id="chart-cashflow-modern"></canvas>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mt-4 md:mt-6 animate-slide-up delay-200 w-full">
            <div class="bg-white p-4 md:p-5 rounded-3xl shadow-sm border border-gray-100 w-full">
                <h3 class="font-bold text-gray-800 mb-4 text-xs md:text-sm uppercase tracking-wide">Evolução Mensal</h3>
                <div class="relative h-56 md:h-64"><canvas id="chart-monthly"></canvas></div>
            </div>
            <div class="bg-white p-4 md:p-5 rounded-3xl shadow-sm border border-gray-100 w-full">
                <h3 class="font-bold text-gray-800 mb-4 text-xs md:text-sm uppercase tracking-wide">Vendas por Profissional</h3>
                <div class="relative h-56 md:h-64 flex justify-center"><canvas id="chart-profs"></canvas></div>
            </div>
        </div>
    `,q.cashFlowData&&ri("chart-cashflow-modern",q.cashFlowData),pa("chart-monthly","bar","Receita Mensal",o.salesMonthly.labels,o.salesMonthly.data,ca[0]),pa("chart-profs","doughnut","Total Vendas",o.professionals.labels,o.professionals.data,ca)}function ai(e){const t=q.appointmentsData,o=t.length;let a=0,r=0,s=0;const n={},i={};let l=new Date(q.startDate);const d=new Date(q.endDate);for(;l<=d;)n[l.toISOString().split("T")[0]]=0,l.setDate(l.getDate()+1);t.forEach(b=>{const h=parseFloat(b.totalAmount||b.price||0),v=(b.status||"").toLowerCase();let w=b.startTime?(b.startTime.toDate?b.startTime.toDate():new Date(b.startTime)).toISOString().split("T")[0]:"";const k=b.professionalName||"Sem Profissional";i[k]||(i[k]={name:k,count:0,value:0}),["cancelled","cancelado","no-show"].includes(v)?r++:(["completed","finalized","paid"].includes(v)&&a++,s+=h,w&&n.hasOwnProperty(w)&&n[w]++,i[k].count++,i[k].value+=h)});const c=Object.keys(n).sort(),u=c.map(b=>n[b]),g=Object.values(i).sort((b,h)=>h.value-b.value);e.innerHTML=`
        <div class="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 animate-slide-up w-full">
            <div class="bg-white p-3 md:p-4 rounded-2xl shadow-sm border border-gray-100 col-span-2 md:col-span-1">
                <p class="text-[10px] text-gray-500 font-bold uppercase">Agendamentos</p>
                <div class="flex items-end gap-2 mt-1">
                    <p class="text-2xl md:text-3xl font-black text-gray-800">${o}</p>
                </div>
            </div>
            
            <div class="bg-white p-3 md:p-4 rounded-2xl shadow-sm border border-gray-100">
                <p class="text-[10px] text-gray-500 font-bold uppercase">Concluídos</p>
                <p class="text-lg md:text-xl font-black text-indigo-600 mt-1">${o>0?Math.round(a/o*100):0}%</p>
            </div>
             <div class="bg-white p-3 md:p-4 rounded-2xl shadow-sm border border-gray-100">
                <p class="text-[10px] text-gray-500 font-bold uppercase">Cancelados</p>
                <p class="text-lg md:text-xl font-black text-red-500 mt-1">${r}</p>
            </div>

            <div class="bg-white p-3 md:p-4 rounded-2xl shadow-sm border border-gray-100 col-span-2 md:col-span-1">
                <p class="text-[10px] text-gray-500 font-bold uppercase">Valor Estimado</p>
                 <p class="text-xl md:text-2xl font-black text-gray-800 mt-1">R$ ${s.toLocaleString("pt-BR",{minimumFractionDigits:0})}</p>
            </div>
        </div>

        <div class="bg-white p-4 md:p-5 rounded-3xl shadow-sm border border-gray-100 mt-4 animate-slide-up delay-100 w-full">
            <h3 class="text-base md:text-lg font-bold text-gray-800 mb-4">Volume Diário</h3>
            <div class="relative w-full h-56 md:h-64">
                <canvas id="chart-appointments-daily"></canvas>
            </div>
        </div>

        <div class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mt-4 animate-slide-up delay-200 w-full">
            <div class="p-4 md:p-5 border-b border-gray-50 bg-gray-50/50">
                <h3 class="text-base md:text-lg font-bold text-gray-800">Ranking Profissional</h3>
            </div>
            <div class="overflow-x-auto no-scrollbar w-full">
                <table class="w-full text-xs md:text-sm min-w-full">
                    <tbody class="divide-y divide-gray-100">
                        ${g.map((b,h)=>{const v=g[0]?.value||1,w=b.value/v*100;return`
                            <tr class="group">
                                <td class="p-3 md:p-4 w-8 md:w-12 text-center font-bold text-gray-300">${h+1}</td>
                                <td class="p-3 md:p-4 pl-0 min-w-[100px]">
                                    <p class="font-bold text-gray-800 truncate">${f(b.name)}</p>
                                    <div class="w-full h-1.5 bg-gray-100 rounded-full mt-2 overflow-hidden">
                                        <div class="h-full bg-indigo-500 rounded-full" style="width: ${w}%"></div>
                                    </div>
                                </td>
                                <td class="p-3 md:p-4 text-center">
                                    <span class="bg-indigo-50 text-indigo-700 px-2 md:px-2.5 py-1 rounded-lg font-bold text-xs">${b.count}</span>
                                </td>
                                <td class="p-3 md:p-4 text-right font-bold text-gray-700 whitespace-nowrap">R$ ${b.value.toLocaleString("pt-BR",{minimumFractionDigits:0})}</td>
                            </tr>
                        `}).join("")}
                        ${g.length===0?'<tr><td colspan="4" class="p-8 text-center text-gray-400">Sem dados.</td></tr>':""}
                    </tbody>
                </table>
            </div>
        </div>
    `,ni("chart-appointments-daily",c,u)}function si(e){const{dreFinancial:t}=q.data;if(!t)return;const o=t.totalRevenues,a=(i,l,d,c=!1)=>{const u=o>0?l/o*100:0,g=c?"- ":"";return`
        <div class="flex items-center justify-between py-2 md:py-3 px-3 md:px-4 border-b border-dashed border-gray-100 last:border-0">
            <div class="flex-1 pr-2 md:pr-4 overflow-hidden">
                <p class="text-[10px] md:text-xs font-semibold text-gray-600 truncate">${f(i)}</p>
                <div class="w-full h-1 bg-gray-100 rounded-full mt-1.5 overflow-hidden max-w-[80px] md:max-w-[100px]">
                    <div class="h-full ${d.replace("text-","bg-")} opacity-40" style="width: ${Math.min(u,100)}%"></div>
                </div>
            </div>
            <div class="text-right flex-shrink-0">
                <p class="text-xs md:text-sm font-bold ${d}">${g}R$ ${l.toLocaleString("pt-BR",{minimumFractionDigits:2})}</p>
                <p class="text-[9px] md:text-[10px] text-gray-400 font-medium">${u.toFixed(1)}%</p>
            </div>
        </div>`},r=Object.entries(t.revenues).map(([i,l])=>a(i,l,"text-emerald-600",!1)).join(""),s=Object.entries(t.expenses).map(([i,l])=>a(i,l,"text-red-500",!0)).join("");t.netResult>=0;const n=t.netResult>=0?"Lucro":"Prejuízo";e.innerHTML=`
        <div class="max-w-xl mx-auto animate-slide-up pb-10 w-full">
            <div class="bg-gray-900 text-white rounded-3xl p-5 md:p-6 shadow-xl relative overflow-hidden mb-4 md:mb-6">
                <div class="absolute right-0 top-0 opacity-10 transform translate-x-1/4 -translate-y-1/4">
                    <svg class="w-32 h-32 md:w-48 md:h-48" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
                </div>
                <p class="text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Resultado Líquido</p>
                <h2 class="text-3xl md:text-4xl font-black mb-2">R$ ${t.netResult.toLocaleString("pt-BR",{minimumFractionDigits:2})}</h2>
                <span class="inline-block px-2 py-1 md:px-3 md:py-1 bg-white/20 rounded-lg text-[10px] md:text-xs font-bold backdrop-blur-sm">
                    ${n}: ${(o>0?t.netResult/o*100:0).toFixed(1)}% de Margem
                </span>
            </div>

            <div class="space-y-3 md:space-y-4">
                <div class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div class="bg-gray-50/50 p-3 border-b border-gray-100 flex justify-between items-center">
                        <h3 class="text-xs font-bold text-gray-500 uppercase tracking-wider pl-2">Receitas</h3>
                        <span class="text-[10px] md:text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">Total: R$ ${t.totalRevenues.toLocaleString("pt-BR",{minimumFractionDigits:0})}</span>
                    </div>
                    <div>${r||'<p class="text-xs text-gray-400 p-4 text-center">Nenhuma receita.</p>'}</div>
                </div>

                <div class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div class="bg-gray-50/50 p-3 border-b border-gray-100 flex justify-between items-center">
                        <h3 class="text-xs font-bold text-gray-500 uppercase tracking-wider pl-2">Despesas</h3>
                        <span class="text-[10px] md:text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-md">Total: R$ ${t.totalExpenses.toLocaleString("pt-BR",{minimumFractionDigits:0})}</span>
                    </div>
                    <div>${s||'<p class="text-xs text-gray-400 p-4 text-center">Nenhuma despesa.</p>'}</div>
                </div>
            </div>
        </div>
    `}function ri(e,t){const o=document.getElementById(e);if(!o)return;const a=o.getContext("2d");me[e]&&me[e].destroy();const r=a.createLinearGradient(0,0,0,400);r.addColorStop(0,"rgba(59, 130, 246, 0.4)"),r.addColorStop(1,"rgba(59, 130, 246, 0.0)");const s=t.payables.map(i=>i*-1),n=t.labels.map(i=>i.split("-").reverse().slice(0,2).join("/"));me[e]=new Chart(a,{type:"bar",data:{labels:n,datasets:[{label:"Saldo",data:t.expectedBalance,type:"line",borderColor:"#3b82f6",backgroundColor:r,borderWidth:3,pointRadius:3,pointBackgroundColor:"#fff",pointBorderColor:"#3b82f6",pointBorderWidth:2,pointHoverRadius:6,hitRadius:30,fill:!0,tension:.4,order:0,yAxisID:"y"},{label:"Entradas",data:t.receivables,backgroundColor:"#34d399",borderRadius:4,barPercentage:.6,order:1,yAxisID:"y"},{label:"Saídas",data:s,backgroundColor:"#f87171",borderRadius:4,barPercentage:.6,order:2,yAxisID:"y"}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"index",intersect:!1},plugins:{legend:{position:"top",align:"end",labels:{usePointStyle:!0,boxWidth:6,font:{family:"'Inter', sans-serif",size:10}}},tooltip:{backgroundColor:"#fff",titleColor:"#111",bodyColor:"#444",borderColor:"#eee",borderWidth:1,padding:10}},scales:{x:{grid:{display:!1},ticks:{font:{size:10}}},y:{display:!0,grid:{color:"#f3f4f6",borderDash:[4,4]},ticks:{callback:i=>new Intl.NumberFormat("pt-BR",{notation:"compact"}).format(i),font:{size:10}}}}}})}function ni(e,t,o){const a=document.getElementById(e);if(!a)return;const r=a.getContext("2d");me[e]&&me[e].destroy();const s=r.createLinearGradient(0,0,0,300);s.addColorStop(0,"rgba(99, 102, 241, 0.5)"),s.addColorStop(1,"rgba(99, 102, 241, 0.0)");const n=t.map(i=>i.split("-").reverse().slice(0,2).join("/"));me[e]=new Chart(r,{type:"line",data:{labels:n,datasets:[{label:"Agendamentos",data:o,borderColor:"#6366f1",backgroundColor:s,borderWidth:2,fill:!0,tension:.4,pointRadius:3,pointBackgroundColor:"#fff",pointBorderColor:"#6366f1",pointBorderWidth:2,pointHoverRadius:5,hitRadius:30}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"index",intersect:!1},plugins:{legend:{display:!1},tooltip:{backgroundColor:"#fff",titleColor:"#111",bodyColor:"#6366f1",borderColor:"#eee",borderWidth:1}},scales:{x:{grid:{display:!1},ticks:{font:{size:10}}},y:{beginAtZero:!0,grid:{color:"#f3f4f6"},ticks:{stepSize:1,font:{size:10}}}}}})}function pa(e,t,o,a,r,s){const n=document.getElementById(e);if(!n)return;const i=n.getContext("2d");me[e]&&me[e].destroy(),new Chart(i,{type:t,data:{labels:a,datasets:[{label:o,data:r,backgroundColor:s,borderColor:Array.isArray(s)?"#fff":s,borderWidth:1,tension:.3,fill:t==="line"}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:t==="doughnut",position:"right",labels:{usePointStyle:!0,boxWidth:8,font:{size:10}}}},scales:t==="doughnut"?{}:{x:{grid:{display:!1},ticks:{font:{size:9}}},y:{grid:{color:"#f3f4f6"},beginAtZero:!0,ticks:{font:{size:9}}}}}})}const Jt=(e,t="products")=>I(`/api/${t}/categories/${e}`),hs=(e,t="products")=>I(`/api/${t}/categories`,{method:"POST",body:JSON.stringify(e)}),xs=(e,t="products")=>I(`/api/${t}/categories/${e}`,{method:"DELETE"}),ii="audit_logs",Ue=async(e,t,o,a,r,s=null)=>{try{if(!t)return;await Na(ge(_,ii),{establishmentId:e,userId:t.uid,userName:t.name||t.email||"Utilizador",module:o,action:a,description:r,details:s,timestamp:new Date})}catch(n){console.error("Falha silenciosa ao registar log:",n)}},xe=document.getElementById("content");let le=null,et="services",ke="all";function _e(){const e=U.currentUser;return e?{uid:e.uid,name:e.displayName||e.email}:{uid:"unknown",name:"Desconhecido"}}async function li(e){e.preventDefault();const o=e.target.closest("#categoryForm").querySelector("#categoryName"),a=o.value;if(a)try{await hs({establishmentId:m.establishmentId,name:a},"services"),Ue(m.establishmentId,_e(),"Categorias (Serviços)","Criou",`Criou categoria: ${a}`),o.value="",p("Sucesso","Categoria criada!","success"),await Mo(),await pt()}catch(r){p("Erro",`Não foi possível criar a categoria: ${r.message}`,"error")}}async function di(e){if(await H("Apagar Categoria","Tem a certeza? Os serviços nesta categoria ficarão sem categoria."))try{await xs(e,"services"),Ue(m.establishmentId,_e(),"Categorias (Serviços)","Excluiu",`Excluiu uma categoria (ID: ${e})`),p("Sucesso","Categoria apagada.","success"),await Mo(),await pt()}catch{p("Erro","Não foi possível apagar a categoria.","error")}}async function Mo(){const e=document.getElementById("categoryList");if(e){e.innerHTML='<div class="loader mx-auto my-4"></div>';try{const t=await Jt(m.establishmentId,"services");m.serviceCategories=t,e.innerHTML="",t.length>0?e.innerHTML=t.map(o=>`
                <div class="flex justify-between items-center bg-gray-100 p-2 rounded">
                    <span>${f(o.name)}</span>
                    <button data-action="delete-category" data-id="${o.id}" class="text-red-500 hover:text-red-700 font-semibold text-sm">Apagar</button>
                </div>`).join(""):e.innerHTML='<p class="text-center text-gray-500">Nenhuma categoria criada.</p>'}catch{e.innerHTML='<p class="text-red-500 text-center">Erro ao carregar categorias.</p>'}}}function ci(){Y({title:"Gerir Categorias de Serviços",contentHTML:`
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
    `,maxWidth:"max-w-xl"});const t=document.getElementById("genericModal");if(t){const o=t.querySelector("#categoryForm");o&&(o.addEventListener("submit",li),t.addEventListener("click",a=>{const r=a.target.closest('button[data-action="delete-category"]');r&&(a.preventDefault(),di(r.dataset.id))}))}Mo()}async function ui(e){e.preventDefault();const t=e.target.closest("#serviceModal"),o=t.querySelector("#serviceId").value,a={},r=t.querySelector('input[name="commissionType"]:checked').value;r==="custom"&&t.querySelectorAll(".professional-commission-row").forEach(n=>{const i=n.dataset.profId;if(n.querySelector('input[type="checkbox"]').checked){const d=parseFloat(n.querySelector('input[type="number"]').value);a[i]=isNaN(d)?0:d}});const s={establishmentId:m.establishmentId,name:t.querySelector("#serviceName").value,price:parseFloat(t.querySelector("#servicePrice").value),duration:parseInt(t.querySelector("#serviceDurationMinutes").value,10),bufferTime:parseInt(t.querySelector("#serviceBufferTimeMinutes").value,10)||0,categoryId:t.querySelector("#serviceCategory").value||null,commissionRate:parseFloat(t.querySelector("#serviceCommissionRate").value)||0,active:t.querySelector("#serviceStatus").value==="true",photo:t.querySelector("#servicePhotoBase64").value,notes:t.querySelector("#serviceNotes").value,commissionType:r,professionalCommissions:a};try{o?(await mr(o,s),Ue(m.establishmentId,_e(),"Serviços","Editou",`Editou o serviço: ${s.name}`)):(await Va(s),Ue(m.establishmentId,_e(),"Serviços","Criou",`Criou novo serviço: ${s.name}`)),document.getElementById("serviceModal").style.display="none",p("Sucesso",`Serviço ${o?"atualizado":"adicionado"} com sucesso!`,"success"),await pt()}catch(n){p("Erro",n.message,"error")}}function ga(e=null){const t=document.getElementById("serviceModal"),o=m.serviceCategories||[],a=e?.duration||0,r=e?.bufferTime||0,s=f(e?.name||""),n=f(e?.notes||""),i=e?s:"Novo Serviço",l=o.map(E=>`<option value="${E.id}" ${e?.categoryId===E.id?"selected":""}>${f(E.name)}</option>`).join("");t.innerHTML=`
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
                            ${l}
                        </select>
                    </div>
                    
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label for="serviceDurationMinutes" class="block text-sm font-medium text-gray-700">Duração (minutos)</label>
                            <input type="number" id="serviceDurationMinutes" min="0" value="${a}" class="mt-1 w-full p-2 border rounded-md" required>
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
    </div>`,t.style.display="flex",t.addEventListener("click",async E=>{const C=E.target.closest("button[data-action]");if(!C)return;const D=C.dataset.action,A=C.dataset.id;if(D==="close-modal"&&(t.style.display="none"),D==="delete-service"){if(!A)return;if(t.style.display="none",await H("Apagar Serviço","Tem a certeza que deseja apagar este serviço?"))try{const M=m.services.find(R=>R.id===A)?.name||"Desconhecido";await pr(A),Ue(m.establishmentId,_e(),"Serviços","Excluiu",`Excluiu o serviço: ${M}`),p("Sucesso","Serviço apagado com sucesso!","success"),await pt()}catch(M){p("Erro",`Não foi possível apagar o serviço: ${M.message}`,"error")}else t.style.display="flex"}});const d=t.querySelectorAll(".tab-btn"),c=t.querySelectorAll(".tab-content");d.forEach(E=>{E.addEventListener("click",()=>{d.forEach(C=>{C.classList.remove("border-indigo-500","text-indigo-600"),C.classList.add("border-transparent","text-gray-500","hover:text-gray-700","hover:border-gray-300")}),E.classList.add("border-indigo-500","text-indigo-600"),E.classList.remove("border-transparent","text-gray-500","hover:text-gray-700","hover:border-gray-300"),c.forEach(C=>C.classList.add("hidden")),document.getElementById(`tab-content-${E.dataset.tab}`).classList.remove("hidden")})});const u=t.querySelectorAll('input[name="commissionType"]'),g=document.getElementById("defaultCommissionRateContainer"),b=document.getElementById("professionalCommissionsContainer");function h(){const E=t.querySelector('input[name="commissionType"]:checked').value;g&&(g.style.display=E==="default"?"block":"none"),b&&(b.style.display=E==="custom"?"block":"none")}u.forEach(E=>E.addEventListener("change",h));const v=document.getElementById("professionalCommissionsList");v&&(v.innerHTML=(m.professionals||[]).map(E=>{const C=e?.professionalCommissions?.[E.id]!==void 0,D=e?.professionalCommissions?.[E.id]||0;return`
                <div class="professional-commission-row flex items-center justify-between p-2 rounded-md ${C?"bg-blue-50":""}" data-prof-id="${E.id}">
                    <label class="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" ${C?"checked":""} class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                        <img src="${E.photo||`https://placehold.co/40x40/E2E8F0/4A5568?text=${f(E.name.charAt(0))}`}" class="w-8 h-8 rounded-full object-cover">
                        <span class="text-sm font-medium">${f(E.name)}</span>
                    </label>
                    <div class="flex items-center gap-1">
                        <input type="number" value="${D}" class="w-20 p-1 border rounded-md text-sm text-center" ${C?"":"disabled"}>
                        <span class="text-sm font-semibold">%</span>
                    </div>
                </div>
            `}).join(""),v.querySelectorAll('input[type="checkbox"]').forEach(E=>{E.addEventListener("change",C=>{const D=C.target.closest(".professional-commission-row");D.querySelector('input[type="number"]').disabled=!C.target.checked,D.classList.toggle("bg-blue-50",C.target.checked)})})),h();const w=t.querySelector("#serviceForm"),k=t.querySelector("#servicePhotoInput"),S=t.querySelector("#servicePhotoPreview"),y=t.querySelector("#servicePhotoBase64");t.querySelector("#servicePhotoButton").addEventListener("click",()=>k.click()),k.onchange=async()=>{const E=k.files[0];if(E){S.src="https://placehold.co/128x128/E2E8F0/4A5568?text=...";try{const C=await es(E,800,800,.8),A=C.length*3/4,T=1e3*1024;if(A>T)throw new Error("A imagem é muito grande mesmo após a compressão.");S.src=C,y.value=C}catch(C){console.error("Erro ao processar imagem:",C),p("Erro de Imagem",C.message||"Não foi possível processar a imagem.","error"),S.src=e?.photo||"https://placehold.co/128x128/E2E8F0/4A5568?text=Foto",y.value=e?.photo||"",k.value=""}}},w.addEventListener("submit",ui)}function De(){const e=document.getElementById("servicesList");if(!e)return;const t=document.getElementById("serviceSearchInput")?.value.toLowerCase()||"",o=document.getElementById("serviceCategoryFilter")?.value||"all",a=new Map((m.serviceCategories||[]).map(s=>[s.id,s.name]));let r=(m.services||[]).filter(Boolean);if(ke!=="all"){const s=ke==="active";r=r.filter(n=>n.active!==!1===s)}r=r.filter(s=>{const n=s.name.toLowerCase().includes(t),i=o==="all"||s.categoryId===o;return n&&i}),e.innerHTML="",r.length>0?r.forEach(s=>{const n=document.createElement("div"),i=JSON.stringify(s).replace(/'/g,"&apos;");n.className=`service-card bg-white rounded-lg shadow-md flex overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-lg hover:bg-gray-50 ${s.active!==!1?"opacity-100":"opacity-50 bg-gray-100"} sm:flex-col`,n.dataset.action="edit-service",n.dataset.service=i;const l=f(s.name),d=f(a.get(s.categoryId)||"N/A"),c=s.photo||`https://placehold.co/200x200/E2E8F0/4A5568?text=${encodeURIComponent(s.name.charAt(0))}`;n.innerHTML=`
                <img src="${c}" alt="Imagem de ${l}" class="w-20 h-20 object-cover flex-shrink-0 sm:w-full sm:h-24">
                
                <div class="p-3 flex flex-col flex-grow justify-between w-full">
                    <div class="flex justify-between items-start mb-1">
                        <h3 class="text-sm font-bold text-gray-900 flex-1 text-left truncate pr-2">${l}</h3>
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
                            <p class="text-xs text-gray-500 text-left mb-1 truncate">Categoria: ${d}</p>
                            <p class="text-xs text-gray-500 text-left">Duração: ${s.duration} min (+${s.bufferTime||0} min extra)</p>
                        </div>
                        <div class="flex justify-between items-center sm:hidden mt-2">
                            <p class="text-lg font-bold text-indigo-600 text-left">R$ ${s.price.toFixed(2)}</p>
                            <p class="text-xs text-gray-500 text-right">${s.duration} min</p>
                        </div>
                    </div>
                </div>`,e.appendChild(n)}):e.innerHTML='<p class="col-span-full text-center text-gray-500 py-10">Nenhum serviço encontrado.</p>'}function Ao(){const e={active:0,inactive:0,total:0},t=(m.services||[]).filter(Boolean);t.forEach(n=>{n.active===!1?e.inactive++:e.active++}),e.total=t.length;const o=document.getElementById("indicator-total"),a=document.getElementById("indicator-active"),r=document.getElementById("indicator-inactive"),s=document.getElementById("indicator-popular");o&&(o.textContent=e.total),a&&(a.textContent=e.active),r&&(r.textContent=e.inactive),s&&(m.mostPopularService&&m.mostPopularService.name!=="N/A"?(s.textContent=f(m.mostPopularService.name),s.closest(".indicator-card").title=`${m.mostPopularService.name} (${m.mostPopularService.count} agendamentos)`):(s.textContent="N/A",s.closest(".indicator-card").title="Nenhum serviço agendado ainda"))}function mi(){const e=document.getElementById("services-content-container");e.innerHTML=`
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
    `;const t=document.getElementById("serviceCategoryFilter");t&&(t.innerHTML='<option value="all">Todas as categorias</option>',(m.serviceCategories||[]).forEach(o=>t.innerHTML+=`<option value="${o.id}">${f(o.name)}</option>`)),Ao(),De()}function pi(){const e=document.getElementById("services-content-container");e.innerHTML=`
        <div class="p-8 text-center">
            <h3 class="text-xl font-bold text-gray-700">Relatórios de Serviços</h3>
            <p class="text-gray-500 mt-2">Em breve, aqui poderás ver relatórios detalhados sobre os teus serviços mais rentáveis, mais agendados e muito mais.</p>
        </div>
    `}async function pt(){const e=document.getElementById("services-content-container");if(e){const t=e.querySelector(".loader");t&&(t.style.display="block")}try{const[t,o,a,r]=await Promise.all([be(m.establishmentId),K(m.establishmentId),Jt(m.establishmentId,"services"),br(m.establishmentId)]);m.services=(t||[]).filter(Boolean),m.professionals=(o||[]).filter(Boolean),m.serviceCategories=(a||[]).filter(Boolean),m.mostPopularService=r||{name:"N/A",count:0},m.services.forEach(s=>{s.active===void 0&&(s.active=!0)}),ys(et)}catch(t){e&&(e.innerHTML='<p class="text-red-500 col-span-full text-center py-10">Erro ao carregar dados. Verifique a conexão com o servidor.</p>'),p("Erro",`Não foi possível carregar os dados: ${t.message}`,"error")}}function ys(e){if(document.getElementById("services-content-container")){if(et===e&&document.getElementById("services-content-container").children.length>1){et==="services"&&(Ao(),De());return}et=e,ke="all",document.querySelectorAll("#services-tabs button.tab-button").forEach(t=>{const o=t.dataset.view===e;t.classList.toggle("border-indigo-500",o),t.classList.toggle("text-indigo-600",o),t.classList.toggle("border-transparent",!o),t.classList.toggle("text-gray-500",!o)}),e==="services"?mi():e==="reports"&&pi()}}function gi(){le&&(xe.removeEventListener("click",le),xe.removeEventListener("input",le),xe.removeEventListener("change",le)),le=async e=>{const t=e.target;if(t.closest('[data-action="toggle-service-status"]')){e.stopPropagation();const r=t.closest('[data-action="toggle-service-status"]'),s=r.dataset.id,n=r.checked;try{await gr(s,n);const i=m.services.findIndex(l=>l.id===s);i>-1&&(m.services[i].active=n),Ue(m.establishmentId,_e(),"Serviços","Atualizou Status",`Alterou status do serviço (ID: ${s}) para ${n?"Ativo":"Inativo"}`),De(),Ao()}catch(i){p("Erro",`Não foi possível atualizar o status: ${i.message}`,"error"),r.checked=!n,De()}return}const o=t.closest("button[data-action], button[data-view], .indicator-card[data-action], .service-card[data-action]");if(t.id==="serviceSearchInput"||t.id==="serviceCategoryFilter"){De();return}if(!o)return;if(o.hasAttribute("data-view")){ys(o.dataset.view);return}switch(o.dataset.action){case"new-service":ga();break;case"edit-service":const r=JSON.parse(o.dataset.service);ga(r);break;case"manage-categories":ci();break;case"filter-service":const s=o.dataset.filterType;if(s==="popular")return;ke=s==="total"?"all":s,document.querySelectorAll('.indicator-card[data-action="filter-service"]').forEach(n=>{const i=n.dataset.filterType,d=i===ke||i==="total"&&ke==="all";n.classList.toggle("ring-2",d),n.classList.toggle("ring-indigo-500",d),n.classList.toggle("shadow-lg",d)}),De();break}},xe.addEventListener("click",le),xe.addEventListener("input",le),xe.addEventListener("change",le)}async function bi(){xe.innerHTML=`
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
        </section>`,gi();try{(!m.professionals||m.professionals.length===0)&&(m.professionals=await K(m.establishmentId)||[])}catch(e){console.error("Falha ao carregar profissionais:",e),p("Erro","Não foi possível carregar a lista de profissionais.","error"),m.professionals=[]}et="services",ke="all",await pt()}const Gt="suppliers",qo="purchases",ws="financial_payables",No=async e=>{try{const t=Ft(ge(_,Gt),it("establishmentId","==",e)),o=await ko(t),a=[];return o.forEach(r=>{a.push({id:r.id,...r.data()})}),a}catch(t){throw console.error("Erro ao buscar fornecedores:",t),t}},fi=async e=>{try{return{id:(await Na(ge(_,Gt),e)).id,...e}}catch(t){throw console.error("Erro ao criar fornecedor:",t),t}},vi=async(e,t)=>{try{const o=pe(_,Gt,e);return await wo(o,t),{id:e,...t}}catch(o){throw console.error("Erro ao atualizar fornecedor:",o),o}},hi=async e=>{try{const t=pe(_,Gt,e);return await Vs(t),!0}catch(t){throw console.error("Erro ao excluir fornecedor:",t),t}},xi=async(e,t=null)=>{try{const o=ja(_),a=pe(ge(_,qo)),r={...e,createdAt:_o()};if(o.set(a,r),t&&t.defaultNatureId&&t.defaultCostCenterId){const s=pe(ge(_,ws)),n=new Date().toISOString().split("T")[0],i={establishmentId:e.establishmentId,description:`Compra - ${e.supplierName}`,amount:parseFloat(e.totalAmount),dueDate:n,naturezaId:t.defaultNatureId,centroDeCustoId:t.defaultCostCenterId,notes:`Gerado automaticamente pelo Pedido de Compra. Itens: ${e.items.length}`,status:"pending",paymentDate:null,purchaseId:a.id,createdAt:_o()};o.set(s,i)}return await o.commit(),{id:a.id,...r}}catch(o){throw console.error("Erro ao registrar compra com integração:",o),o}},yi=async(e,t)=>{try{const o=ja(_),a=pe(_,qo,e);o.delete(a);const r=Ft(ge(_,ws),it("purchaseId","==",e),it("establishmentId","==",t));return(await ko(r)).forEach(n=>{o.delete(n.ref)}),await o.commit(),!0}catch(o){throw console.error("Erro ao excluir compra e financeiro:",o),o}},wi=async e=>{try{const t=Ft(ge(_,qo),it("establishmentId","==",e),Ra("createdAt","desc")),o=await ko(t),a=[];return o.forEach(r=>{a.push({id:r.id,...r.data()})}),a}catch(t){throw console.error("Erro ao buscar histórico de compras:",t),t}},fe=document.getElementById("content");let de=null,tt="products",se="all";async function ki(e){e.preventDefault();const o=e.target.closest("#categoryForm").querySelector("#categoryName"),a=o.value;if(a)try{await hs({establishmentId:m.establishmentId,name:a},"products"),o.value="",p("Sucesso","Categoria de produto criada!","success"),await Ro(),await gt()}catch(r){p("Erro",`Não foi possível criar a categoria: ${r.message}`,"error")}}async function Si(e){if(await H("Apagar Categoria","Tem a certeza? Os produtos nesta categoria ficarão sem categoria."))try{await xs(e,"products"),p("Sucesso","Categoria de produto apagada.","success"),await Ro(),await gt()}catch{p("Erro","Não foi possível apagar a categoria.","error")}}async function Ro(){const e=document.getElementById("categoryList");if(e){e.innerHTML='<div class="loader mx-auto my-4"></div>';try{const t=await Jt(m.establishmentId,"products");m.categories=t,e.innerHTML="",t.length>0?e.innerHTML=t.map(o=>`
                <div class="flex justify-between items-center bg-gray-100 p-2 rounded">
                    <span>${f(o.name)}</span>
                    <button data-action="delete-category" data-id="${o.id}" class="text-red-500 hover:text-red-700 font-semibold text-sm">Apagar</button>
                </div>`).join(""):e.innerHTML='<p class="text-center text-gray-500">Nenhuma categoria encontrada.</p>'}catch{e.innerHTML='<p class="text-red-500 text-center">Erro ao carregar categorias.</p>'}}}function $i(){Y({title:"Gerir Categorias de Produtos",contentHTML:`
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
    `,maxWidth:"max-w-xl"});const t=document.getElementById("genericModal");if(t){const o=t.querySelector("#categoryForm");o&&(o.addEventListener("submit",ki),t.addEventListener("click",a=>{const r=a.target.closest('button[data-action="delete-category"]');r&&Si(r.dataset.id)}))}Ro()}async function Ei(e){if(!e)return;if(await H("Apagar Produto","Tem a certeza que deseja apagar este produto? Esta ação não pode ser revertida."))try{await vr(e),p("Sucesso","Produto apagado com sucesso!","success"),await gt()}catch(o){p("Erro",`Não foi possível apagar o produto: ${o.message}`,"error")}}async function Ii(e){const t=e.querySelector("#productId").value,o=parseInt(e.querySelector("#productCurrentStock").value),a=parseInt(e.querySelector("#productMinStock").value),r=parseInt(e.querySelector("#productMaxStock").value),s=e.querySelectorAll("#selectedSuppliersList .selected-supplier-item"),n=Array.from(s).map(l=>l.dataset.id),i={establishmentId:m.establishmentId,name:e.querySelector("#productName").value,price:parseFloat(e.querySelector("#productPrice").value),costPrice:parseFloat(e.querySelector("#productCostPrice").value)||0,commissionRate:parseFloat(e.querySelector("#productCommissionRate").value)||0,currentStock:isNaN(o)?0:o,minStock:isNaN(a)?0:a,maxStock:isNaN(r)?0:r,categoryId:e.querySelector("#productCategory").value||null,photo:e.querySelector("#productPhotoBase64").value,supplierIds:n};try{t?await fr(t,i):await Ua(i),document.getElementById("productModal").style.display="none",p("Sucesso",`Produto ${t?"atualizado":"adicionado"} com sucesso!`,"success"),await gt()}catch(l){throw new Error(l.message)}}function ba(e,t=800,o=800,a="image/jpeg",r=.8){return new Promise((s,n)=>{if(!e.type.startsWith("image/"))return n(new Error("O ficheiro selecionado não é uma imagem."));const i=new FileReader;i.onload=l=>{const d=new Image;d.onload=()=>{let c=d.width,u=d.height;c>u?c>t&&(u*=t/c,c=t):u>o&&(c*=o/u,u=o);const g=document.createElement("canvas");g.width=c,g.height=u,g.getContext("2d").drawImage(d,0,0,c,u);const h=g.toDataURL(a,r);s(h)},d.onerror=c=>n(new Error("Não foi possível carregar a imagem.")),d.src=l.target.result},i.onerror=l=>n(new Error("Não foi possível ler o ficheiro.")),i.readAsDataURL(e)})}function fa(e=null){const t=document.getElementById("productModal"),o=m.categories||[],a=m.suppliers||[],r=o.map(T=>`<option value="${T.id}" ${e?.categoryId===T.id?"selected":""}>${f(T.name)}</option>`).join("");let s=new Set(e?.supplierIds||[]);const n=f(e?.name||""),i=e?.price||"",l=e?.costPrice||"",d=e?.commissionRate||"",c=e?.minStock||0,u=e?.maxStock||0,g=e?.currentStock||0,b=e?n:"Novo Produto";t.innerHTML=`
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
                            
                            <div class="form-group"><label for="productCostPrice">Preço de Custo Médio (R$)</label><input type="number" id="productCostPrice" step="0.01" value="${l}" class="mt-1 w-full p-2 border rounded-md" placeholder="0.00"></div>
                            
                            <div class="form-group"><label for="productCommissionRate">Comissão (%)</label><input type="number" id="productCommissionRate" placeholder="Ex: 10" value="${d}" class="mt-1 w-full p-2 border rounded-md"></div>
                        </div></div>
                    </div>
                    <div class="mt-6 pt-6 border-t"><h3 class="text-lg font-semibold text-gray-700 text-left mb-4">Controlo de Stock (Definições)</h3><div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div class="form-group"><label for="productCurrentStock">Atual</label><input type="number" id="productCurrentStock" value="${g}" readonly class="mt-1 w-full p-2 border rounded-md bg-gray-100"></div>
                        <div class="form-group"><label for="productMinStock">Mínimo (Alerta)</label><input type="number" id="productMinStock" value="${c}" class="mt-1 w-full p-2 border rounded-md"></div>
                        <div class="form-group"><label for="productMaxStock">Máximo</label><input type="number" id="productMaxStock" value="${u}" class="mt-1 w-full p-2 border rounded-md"></div>
                    </div></div>
                </div>

                <div id="tab-content-stock" class="tab-content hidden space-y-6">
                    <p class="text-sm text-gray-600">Use esta secção para registar entradas (compras) ou saídas (perdas) manuais. O estoque atual é <strong id="currentStockDisplay" class="text-lg">${g}</strong>.</p>
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
    </div>`;const h=t.querySelector("#productCategory"),v=t.querySelector("#productPhotoInput");t.querySelector("#productPhotoButton").addEventListener("click",()=>v.click()),h.innerHTML='<option value="">Sem categoria</option>'+(m.categories||[]).map(T=>`<option value="${T.id}" ${e?.categoryId===T.id?"selected":""}>${f(T.name)}</option>`).join(""),e&&(h.value=e.categoryId||"");const w=t.querySelector("#productPhotoPreview");t.querySelector("#productPhotoBase64");const k=e?.photo||"https://placehold.co/128x128/E2E8F0/4A5568?text=Foto",S=e?.photo||"";v.onchange=async()=>{const T=v.files[0];if(T){w.src="https://placehold.co/128x128/E2E8F0/4A5568?text=...";try{const M=await ba(T,800,800,"image/jpeg",.8),F=M.length*3/4,z=1e3*1024;if(F>z)throw new Error("A imagem é muito grande mesmo após a compressão.");preview.src=M,base64Input.value=M}catch(M){console.error("Erro ao processar imagem:",M),p("Erro de Imagem",M.message||"Não foi possível processar a imagem.","error"),preview.src=k,base64Input.value=S,A.value=""}}};const y=t.cloneNode(!0);t.parentNode.replaceChild(y,t);const E=()=>{const T=y.querySelector("#modalSupplierSearch"),M=y.querySelector("#supplierSearchResults"),R=y.querySelector("#selectedSuppliersList"),F=T.value.toLowerCase();if(F.length>0){const z=a.filter(j=>j.name.toLowerCase().includes(F)&&!s.has(j.id));z.length>0?(M.classList.remove("hidden"),M.innerHTML=z.map(j=>`
                    <div class="p-2 hover:bg-indigo-50 cursor-pointer border-b last:border-0 text-sm flex justify-between items-center" data-add-supplier="${j.id}">
                        <span class="font-medium">${f(j.name)}</span>
                        <span class="text-indigo-600 text-xs">+ Adicionar</span>
                    </div>
                `).join("")):(M.classList.remove("hidden"),M.innerHTML='<div class="p-2 text-xs text-gray-500 text-center">Nenhum resultado disponível.</div>')}else M.classList.add("hidden");s.size>0?(R.innerHTML="",s.forEach(z=>{const j=a.find(Q=>Q.id===z);j&&(R.innerHTML+=`
                        <div class="selected-supplier-item flex items-center justify-between bg-white border p-2 rounded shadow-sm" data-id="${j.id}">
                            <div class="text-sm">
                                <p class="font-bold text-gray-800">${f(j.name)}</p>
                                <p class="text-xs text-gray-500">${f(j.contactName||"")} - ${f(j.phone||"")}</p>
                            </div>
                            <button type="button" class="text-red-500 hover:text-red-700 p-1" data-remove-supplier="${j.id}" title="Remover">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </div>
                    `)})):R.innerHTML='<p class="text-xs text-gray-400 text-center py-2">Nenhum fornecedor selecionado.</p>'};y.querySelector("#modalSupplierSearch").addEventListener("input",E),y.addEventListener("click",T=>{const M=T.target.closest("[data-add-supplier]");if(M){const F=M.dataset.addSupplier;s.add(F),y.querySelector("#modalSupplierSearch").value="",E()}const R=T.target.closest("[data-remove-supplier]");if(R){const F=R.dataset.removeSupplier;s.delete(F),E()}}),E(),y.addEventListener("click",async T=>{const M=T.target.closest("button[data-action]");if(!M)return;const R=M.dataset.action,F=y.querySelector("#productId").value;if(R==="close-modal"&&(y.style.display="none"),R==="delete-product"){if(!F)return;y.style.display="none",await Ei(F)}if(R==="save-product-modal"){const z=y.querySelector("#productForm");if(z){if(!z.querySelector("#productName").value||!z.querySelector("#productPrice").value){p("Erro","Nome e Preço de Venda são obrigatórios.","error");return}const j=M.closest('button[data-action="save-product-modal"]');j.disabled=!0,j.textContent="A salvar...";try{await Ii(z)}catch(Q){p("Erro",`Falha ao salvar: ${Q.message}`,"error"),j.disabled=!1,j.textContent="Salvar Alterações"}}}if(R==="adjust-stock-modal"){T.preventDefault();const z=y.querySelector("#stockAdjustmentAmount"),j=y.querySelector("#stockAdjustmentReason"),Q=parseInt(z.value,10),Ce=parseInt(M.dataset.change,10);if(!Q||Q<=0){p("Erro","Por favor, insira uma quantidade válida.","error");return}const Xt=Q*Ce,As=j.value||(Xt>0?"Entrada manual":"Saída manual");try{await hr(F,{change:Xt,reason:As});const Je=m.products.findIndex(Ge=>Ge.id===F);if(Je>-1){const Ge=m.products[Je].currentStock+Xt;m.products[Je].currentStock=Ge,y.querySelector("#currentStockDisplay").textContent=Ge,y.querySelector("#productCurrentStock").value=Ge,z.value="",j.value="",p("Sucesso","Estoque atualizado!","success"),jo(),dt()}}catch(Je){p("Erro de Stock",Je.message,"error")}}});const C=y.querySelectorAll(".tab-btn"),D=y.querySelectorAll(".tab-content");C.forEach(T=>{T.addEventListener("click",M=>{M.preventDefault(),C.forEach(R=>{R.classList.remove("border-indigo-500","text-indigo-600"),R.classList.add("border-transparent","text-gray-500","hover:text-gray-700","hover:border-gray-300")}),T.classList.add("border-indigo-500","text-indigo-600"),T.classList.remove("border-transparent","text-gray-500","hover:text-gray-700","hover:border-gray-300"),D.forEach(R=>R.classList.add("hidden")),document.getElementById(`tab-content-${T.dataset.tab}`).classList.remove("hidden")})});const A=y.querySelector("#productPhotoInput");y.querySelector("#productPhotoButton").addEventListener("click",()=>A.click()),A.onchange=async()=>{const T=A.files[0];if(!T)return;const M=y.querySelector("#productPhotoPreview"),R=y.querySelector("#productPhotoBase64");M.src="https://placehold.co/128x128/E2E8F0/4A5568?text=...";try{const F=await ba(T,800,800,"image/jpeg",.8),j=F.length*3/4,Q=1e3*1024;if(j>Q)throw new Error("A imagem é muito grande mesmo após a compressão.");M.src=F,R.value=F}catch(F){console.error("Erro ao processar imagem:",F),p("Erro de Imagem",F.message||"Não foi possível processar a imagem.","error"),M.src=k,R.value=S,A.value=""}},y.style.display="flex"}function Ci(){const e=document.getElementById("products-content-container");e.innerHTML=`
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
    `;const t=document.getElementById("productCategoryFilter");t&&(t.innerHTML='<option value="all">Todas as categorias</option>',(m.categories||[]).forEach(o=>t.innerHTML+=`<option value="${o.id}">${f(o.name)}</option>`)),jo(),dt()}function Li(){const e=document.getElementById("products-content-container"),t=new Date().toISOString().split("T")[0],o=new Date;o.setDate(o.getDate()-30);const a=o.toISOString().split("T")[0];e.innerHTML=`
        <div class="space-y-6">
             <div class="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 items-end bg-white p-4 rounded-lg shadow-sm">
                <div class="col-span-1"><label for="reportStartDate" class="block text-xs font-medium text-gray-700">De</label><input type="date" id="reportStartDate" value="${a}" class="mt-1 w-full p-2 border rounded-md text-sm"></div>
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
        </div>`;const r=document.getElementById("productFilterReport"),s=document.getElementById("categoryFilterReport");r&&m.products&&(r.innerHTML+=m.products.map(n=>`<option value="${n.id}">${f(n.name)}</option>`).join("")),s&&m.categories&&(s.innerHTML+=m.categories.map(n=>`<option value="${n.id}">${f(n.name)}</option>`).join(""))}async function Ti(){const e=document.getElementById("report-results");e.innerHTML='<div class="loader mx-auto my-8"></div>';const t={startDate:document.getElementById("reportStartDate").value,endDate:document.getElementById("reportEndDate").value,productId:document.getElementById("productFilterReport").value,categoryId:document.getElementById("categoryFilterReport").value,establishmentId:m.establishmentId};try{const o=await xr(t);if(o.length===0){e.innerHTML=`
                <div class="bg-white border rounded-lg shadow-sm p-8">
                    <p class="text-center text-gray-500">Nenhuma movimentação encontrada para este período.</p>
                </div>`;return}const a=`
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
                        ${o.map(s=>`
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
                ${o.map(s=>`
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
            </div>`;e.innerHTML=a+r}catch(o){p("Erro",`Não foi possível gerar o relatório: ${o.message}`,"error"),e.innerHTML=`<div class="bg-white border border-red-200 rounded-lg p-8 text-center text-red-500">${o.message}</div>`}}function jo(){const e={ok:0,near_min:0,at_min:0,empty:0};if(!m.products)return;m.products.forEach(s=>{if(!s)return;const n=s.currentStock,i=s.minStock;n<=0?e.empty++:i>0&&n<=i?e.at_min++:i>0&&n<=i*1.2?e.near_min++:e.ok++});const t=document.getElementById("indicator-ok"),o=document.getElementById("indicator-near-min"),a=document.getElementById("indicator-at-min"),r=document.getElementById("indicator-empty");t&&(t.textContent=e.ok),o&&(o.textContent=e.near_min),a&&(a.textContent=e.at_min),r&&(r.textContent=e.empty)}function dt(){const e=document.getElementById("productsList");if(!e)return;const t=document.getElementById("productSearchInput")?.value.toLowerCase()||"",o=document.getElementById("productCategoryFilter")?.value||"all",a=new Map((m.categories||[]).map(s=>[s.id,s.name]));let r=(m.products||[]).filter(Boolean);se!=="all"&&(r=r.filter(s=>{const n=s.currentStock,i=s.minStock;switch(se){case"ok":return n>0&&(i===0||n>i*1.2);case"near_min":return i>0&&n>i&&n<=i*1.2;case"at_min":return i>0&&n>0&&n<=i;case"empty":return n<=0;default:return!0}})),r=r.filter(s=>{const n=s.name.toLowerCase().includes(t),i=o==="all"||s.categoryId===o;return n&&i}),e.innerHTML="",r.length>0?(e.className="space-y-3 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 sm:gap-4 sm:space-y-0",r.forEach(s=>{const n=document.createElement("div"),i=JSON.stringify(s).replace(/'/g,"&apos;");n.className=`product-card bg-white rounded-lg shadow-md flex items-center gap-3 p-3 overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-lg hover:bg-gray-50 
                              sm:flex-col sm:p-0 sm:items-stretch sm:gap-0`,n.dataset.action="edit-product",n.dataset.product=i;const l=s.photo||`https://placehold.co/200x200/E2E8F0/4A5568?text=${encodeURIComponent(s.name.charAt(0))}`,d=a.get(s.categoryId)||"N/A";let c="",u="text-gray-500";const g=s.currentStock,b=s.minStock;g<=0?(c='<span class="text-xs font-semibold text-red-600">Esgotado</span>',u="text-red-600 font-semibold"):b>0&&g<=b?(c='<span class="text-xs font-semibold text-orange-600">Estoque Mínimo</span>',u="text-orange-600 font-semibold"):b>0&&g<=b*1.2?(c='<span class="text-xs font-semibold text-blue-600">Estoque Baixo</span>',u="text-blue-600 font-semibold"):(c='<span class="text-xs font-semibold text-green-600">Em Estoque</span>',u="text-green-600 font-semibold"),n.innerHTML=`
                <img src="${l}" alt="Imagem de ${f(s.name)}" class="w-16 h-16 rounded-md object-cover flex-shrink-0 sm:w-full sm:h-24 sm:rounded-b-none">
                
                <div class="flex-1 sm:p-3 sm:flex sm:flex-col sm:flex-grow">
                    <div class="sm:flex-grow">
                        <div class="flex justify-between items-start mb-1 gap-2">
                            <h3 class="text-sm font-bold text-gray-900 flex-1 text-left">${f(s.name)}</h3>
                            <div class="hidden sm:block">${c}</div>
                        </div>
                        
                        <p class="text-xl font-bold text-indigo-600 mb-1 text-left hidden sm:block">R$ ${s.price.toFixed(2)}</p>
                        
                        <p class="text-xs text-gray-500 text-left mb-2 hidden sm:block">Categoria: ${f(d)}</p>
                    </div>

                    <div class="flex justify-between items-center mt-2 sm:mt-0">
                        <p class="text-lg font-bold text-indigo-600 text-left sm:hidden">R$ ${s.price.toFixed(2)}</p>
                        <p class="text-xs text-gray-500 text-right sm:text-left">
                            Estoque: <span class="font-bold text-base ${u}">${s.currentStock}</span>
                        </p>
                    </div>
                </div>`,e.appendChild(n)})):(e.className="",e.innerHTML='<p class="col-span-full text-center text-gray-500 py-10">Nenhum produto encontrado.</p>')}async function gt(){const e=document.getElementById("products-content-container");e&&(e.innerHTML='<div class="loader col-span-full mx-auto my-8"></div>');try{const[t,o,a]=await Promise.all([ut(m.establishmentId),Jt(m.establishmentId,"products"),No(m.establishmentId)]);m.products=(t||[]).filter(Boolean),m.categories=(o||[]).filter(Boolean),m.suppliers=(a||[]).filter(Boolean),ks(tt)}catch(t){e&&(e.innerHTML=`<p class="text-red-500 col-span-full text-center p-8">Erro ao carregar dados: ${t.message}</p>`)}}function ks(e){if(document.getElementById("products-content-container")){if(tt===e&&document.getElementById("products-content-container").children.length>1){tt==="products"&&(jo(),dt());return}tt=e,se="all",document.querySelectorAll("#products-tabs button.tab-button").forEach(t=>{const o=t.dataset.view===e;t.classList.toggle("border-indigo-500",o),t.classList.toggle("text-indigo-600",o),t.classList.toggle("border-transparent",!o),t.classList.toggle("text-gray-500",!o)}),e==="products"?Ci():e==="movements"&&Li()}}async function Pi(){fe.innerHTML=`
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
        </section>`,de&&(fe.removeEventListener("click",de),fe.removeEventListener("input",de),fe.removeEventListener("change",de)),de=async e=>{const t=e.target;if(t.id==="productSearchInput"||t.id==="productCategoryFilter"){dt();return}const o=e.target.closest("button[data-action], button[data-view], .indicator-card[data-action], .product-card[data-action]");if(!o||e.target.closest('[data-action-stop-propagation="true"]'))return;if(o.hasAttribute("data-view")){ks(o.dataset.view);return}switch(o.dataset.action){case"new-product":fa();break;case"edit-product":fa(JSON.parse(o.dataset.product));break;case"manage-product-categories":$i();break;case"generate-report":await Ti();break;case"filter-stock":const r=o.dataset.filterType;se=se===r?"all":r,document.querySelectorAll(".indicator-card").forEach(s=>{s.classList.toggle("ring-2",s.dataset.filterType===se),s.classList.toggle("ring-indigo-500",s.dataset.filterType===se),s.classList.toggle("shadow-lg",s.dataset.filterType===se)}),dt();break}},fe.addEventListener("click",de),fe.addEventListener("input",de),fe.addEventListener("change",de),tt="products",se="all",await gt()}const ve=document.getElementById("content");let ce=null,Ct="list",O={step:1,productsToBuy:[],allSuppliers:[],finalOrders:{},isQuoteMode:!1};async function Bi(){Ct==="list"?Yt():Ct==="purchases"?(O.step=1,ot()):Ct==="history"&&Ss()}async function Di(){try{const e=await No(m.establishmentId);return m.suppliers=e||[],O.allSuppliers=e,!0}catch(e){return console.error(e),!1}}async function Mi(e){if(await H("Excluir Fornecedor","Tem a certeza? Isso removerá o vínculo com os produtos."))try{await hi(e),p("Sucesso","Fornecedor excluído.","success"),Ht("genericModal"),Yt()}catch(t){p("Erro","Erro ao excluir: "+t.message,"error")}}async function Ai(e){e.preventDefault();const t=e.target,o=t.querySelector("#supId").value,a={name:t.querySelector("#supName").value,contactName:t.querySelector("#supContact").value,email:t.querySelector("#supEmail").value,phone:t.querySelector("#supPhone").value,taxId:t.querySelector("#supTaxId").value,category:t.querySelector("#supCategory").value,establishmentId:m.establishmentId},r=t.querySelector('button[type="submit"]');r.disabled=!0,r.textContent="A salvar...";try{o?(await vi(o,a),p("Sucesso","Fornecedor atualizado!","success")):(await fi(a),p("Sucesso","Fornecedor criado!","success")),Ht("genericModal"),Yt()}catch(s){p("Erro","Erro ao salvar: "+s.message,"error")}finally{r.disabled=!1,r.textContent="Salvar"}}async function Yt(){const e=document.getElementById("suppliersList");if(!e)return;e.innerHTML='<div class="loader mx-auto my-8"></div>',await Di();const t=document.getElementById("supplierSearchInput")?.value.toLowerCase()||"",o=m.suppliers.filter(s=>s.name.toLowerCase().includes(t)||s.contactName&&s.contactName.toLowerCase().includes(t));if(e.innerHTML="",o.length===0){e.innerHTML='<div class="text-center text-gray-500 py-8">Nenhum fornecedor encontrado.</div>';return}let a='<div class="flex flex-col gap-2 md:hidden">';o.forEach(s=>{const n=JSON.stringify(s).replace(/"/g,"&quot;"),i=f(s.name),l=f(s.category||"Geral"),d=f(s.contactName||"");a+=`
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
        `}),a+="</div>";let r=`
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
    `;o.forEach(s=>{const n=JSON.stringify(s).replace(/"/g,"&quot;"),i=f(s.name),l=f(s.taxId||"Sem doc."),d=f(s.email||"-"),c=f(s.phone||"-"),u=f(s.category||"Geral");r+=`
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
                    <button data-action="delete" data-id="${s.id}" class="text-red-600 hover:text-red-900">Excluir</button>
                </td>
            </tr>
        `}),r+="</tbody></table></div>",e.innerHTML=a+r}function qi(e){const t=e.phone?`https://wa.me/${e.phone.replace(/\D/g,"")}`:"#",o=e.phone?`tel:${e.phone}`:"#",a=e.email?`mailto:${e.email}`:"#",r=JSON.stringify(e).replace(/"/g,"&quot;"),s=f(e.name),n=f(e.category||"Fornecedor"),i=f(e.contactName||""),l=f(e.phone||""),d=`
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
            <a href="${o}" class="${e.phone?"":"opacity-50 pointer-events-none"} flex flex-col items-center justify-center p-3 bg-blue-50 rounded-lg text-blue-700 hover:bg-blue-100 transition-colors">
                <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                <span class="text-xs font-bold">Ligar</span>
            </a>
            <a href="${a}" class="${e.email?"":"opacity-50 pointer-events-none"} flex flex-col items-center justify-center p-3 bg-gray-50 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
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
    `;Y({title:"",contentHTML:d,maxWidth:"max-w-md"})}async function ot(){const e=document.getElementById("purchasesContainer");if(e)if(O.step===1){e.innerHTML='<div class="loader mx-auto my-8"></div>';try{const[t,o]=await Promise.all([ut(m.establishmentId),No(m.establishmentId)]);O.allSuppliers=o||[];const a=t.filter(d=>{const c=parseInt(d.currentStock||0),u=parseInt(d.minStock||0);return c<=u});if(O.productsToBuy=a,a.length===0){e.innerHTML=`
                    <div class="text-center py-10 bg-white rounded-lg shadow-sm border border-gray-100">
                        <div class="bg-green-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                            <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                        <h3 class="text-lg font-bold text-gray-800">Tudo em ordem!</h3>
                        <p class="text-gray-600">Nenhum produto abaixo do estoque mínimo.</p>
                        <button class="mt-4 text-indigo-600 hover:underline text-sm" onclick="window.location.reload()">Atualizar Dados</button>
                    </div>
                `;return}let r='<div class="flex flex-col gap-3 md:hidden">',s="";a.forEach(d=>{const c=parseInt(d.minStock)||0,u=parseInt(d.currentStock)||0,g=Math.max(c-u,1),b=parseFloat(d.costPrice||0),h=f(d.name);let v='<option value="">Selecione...</option>';O.allSuppliers.length>0?O.allSuppliers.forEach(w=>{const S=d.supplierIds&&d.supplierIds.includes(w.id)?"selected":"";v+=`<option value="${w.id}" ${S}>${f(w.name)}</option>`}):v='<option value="">Sem fornecedores</option>',r+=`
                    <div class="product-row bg-white p-3 rounded-lg shadow-sm border border-gray-200" data-product-id="${d.id}" data-cost="${b}">
                        <div class="flex justify-between items-start mb-2">
                            <div class="flex items-center gap-2">
                                <input type="checkbox" class="row-select w-5 h-5 text-indigo-600 rounded border-gray-300" checked>
                                <div>
                                    <p class="font-bold text-gray-800 text-sm">${h}</p>
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
                                <input type="number" class="qty-input w-full p-2 border border-gray-300 rounded text-center font-bold text-indigo-700 bg-indigo-50" value="${g}" min="1">
                            </div>
                            <div>
                                <label class="text-xs text-gray-500 block mb-1">Fornecedor</label>
                                <select class="supplier-select w-full p-2 border border-gray-300 rounded bg-white text-xs truncate">
                                    ${v}
                                </select>
                            </div>
                        </div>
                        <div class="mt-2 pt-2 border-t border-gray-100 flex justify-between items-center">
                            <span class="text-xs text-gray-500">Subtotal Previsto:</span>
                            <span class="row-subtotal font-bold text-indigo-600 text-sm">R$ ${(g*b).toFixed(2)}</span>
                        </div>
                    </div>
                `,s+=`
                    <tr class="hover:bg-gray-50 border-b border-gray-100 product-row" data-product-id="${d.id}" data-cost="${b}">
                        <td class="p-3 pl-4 text-center w-10">
                            <input type="checkbox" class="row-select w-5 h-5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500" checked>
                        </td>
                        <td class="p-3 font-medium text-gray-800">${h}</td>
                        <td class="p-3 text-center text-xs text-gray-600">
                            <div class="flex flex-col items-center">
                                <span class="font-bold text-red-600">${u} <span class="text-gray-400 font-normal">Atual</span></span>
                                <span class="border-t border-gray-200 w-12 my-0.5"></span>
                                <span class="font-medium">${c} <span class="text-gray-400 font-normal">Mínimo</span></span>
                            </div>
                        </td>
                        <td class="p-3 text-center w-24">
                            <input type="number" class="qty-input w-full p-2 border border-gray-300 rounded text-center text-lg font-bold text-indigo-700 bg-indigo-50" value="${g}" min="1">
                        </td>
                        <td class="p-3 text-right text-sm text-gray-600">R$ ${b.toFixed(2)}</td>
                        <td class="p-3 text-right text-sm font-bold text-gray-800 row-subtotal">R$ ${(g*b).toFixed(2)}</td>
                        <td class="p-3 w-48">
                            <select class="supplier-select w-full p-2 border border-gray-300 rounded-md bg-white text-sm">
                                ${v}
                            </select>
                        </td>
                    </tr>
                `}),r+="</div>";const n=O.isQuoteMode?"REVISAR COTAÇÕES":"GERAR PEDIDOS DE COMPRA",i=O.isQuoteMode?"bg-indigo-600 hover:bg-indigo-700":"bg-green-600 hover:bg-green-700",l=O.isQuoteMode?'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>':'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>';e.innerHTML=`
                <div class="space-y-4 animate-fade-in pb-20">
                    <div class="bg-white p-3 md:p-4 rounded-lg border border-gray-200 shadow-sm">
                        <div class="flex flex-col md:flex-row justify-between items-center gap-3">
                            <div class="flex items-center gap-3 w-full md:w-auto">
                                <input type="checkbox" id="toggle-quote-mode" class="w-5 h-5 text-indigo-600 rounded" ${O.isQuoteMode?"checked":""}>
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
                            <tbody class="divide-y divide-gray-100" id="purchase-table-body">${s}</tbody>
                        </table>
                    </div>
                </div>
            `,bo()}catch(t){console.error(t),e.innerHTML='<p class="text-red-500 text-center">Erro ao calcular compras.</p>'}}else O.step===2&&Ni(e)}function Ni(e){if(!O.finalOrders||Object.keys(O.finalOrders).length===0){O.step=1,ot();return}const t=O.isQuoteMode;let o="",a=0;const r=t?"border-indigo-100":"border-gray-200",s=t?"bg-indigo-50 border-indigo-100":"bg-gray-50 border-gray-200",n=t?"bg-blue-100 text-blue-700":"bg-green-100 text-green-700",i=t?"hidden":"flex",l=t?"Cotações Prontas":"Pedidos Prontos",d=t?"text-indigo-600":"text-green-600",c=t?"bg-indigo-50 border-indigo-100":"bg-green-50 border-green-100",u=t?"text-indigo-800":"text-green-800";for(const[g,b]of Object.entries(O.finalOrders)){let h=0,v=b.items.map(C=>{const D=C.qty*C.cost;return h+=D,`
            <div class="flex justify-between py-2 border-b border-gray-50 text-sm">
                <span class="text-gray-800 font-medium">${f(C.name)}</span>
                <div class="text-right">
                    <span class="text-gray-500 text-xs block">${C.qty} x R$ ${C.cost.toFixed(2)}</span>
                    <span class="text-indigo-600 font-bold block">R$ ${D.toFixed(2)}</span>
                </div>
            </div>
        `}).join("");a+=h;const w=encodeURIComponent(JSON.stringify({supplierId:g,supplierName:b.info.name,totalAmount:h,items:b.items})),k=encodeURIComponent(JSON.stringify({name:b.info.name,phone:b.info.phone,email:b.info.email})),S=encodeURIComponent(JSON.stringify(b.items)),y=f(b.info.name),E=f(b.info.email||"");o+=`
            <div class="bg-white border ${r} rounded-xl overflow-hidden shadow-sm supplier-order-card mb-4" data-supplier-id="${g}">
                <div class="${s} p-3 border-b flex justify-between items-center">
                    <div>
                        <h4 class="font-bold text-gray-800 text-base">${y}</h4>
                        <div class="text-[10px] text-gray-500 flex flex-col">
                            <span>${E}</span>
                        </div>
                    </div>
                    <div class="text-right">
                        <span class="${n} text-xs font-bold px-2 py-1 rounded">R$ ${h.toFixed(2)}</span>
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
                        data-supplier-info="${k}"
                        data-order-items="${S}"
                        data-total="${h}">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.897.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.463 1.065 2.876 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                        Enviar
                    </button>
                    <button class="btn-register-order bg-blue-600 text-white px-2 py-2.5 rounded-lg hover:bg-blue-700 text-xs font-bold items-center justify-center gap-1 shadow-sm ${i}" data-order="${w}">
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
                    <p class="text-sm ${d}">Valor Estimado: <strong class="text-lg">R$ ${a.toFixed(2)}</strong></p>
                </div>
                <button id="btn-back-step1" class="text-gray-600 hover:text-gray-900 text-sm font-medium underline py-2">
                    ← Voltar e Corrigir
                </button>
            </div>
            <div>
                ${o}
            </div>
        </div>
    `}async function Ss(){const e=document.getElementById("historyContainer");if(e){e.innerHTML='<div class="loader mx-auto my-8"></div>';try{const t=await wi(m.establishmentId);if(t.length===0){e.innerHTML='<div class="text-center text-gray-500 py-8">Nenhum histórico encontrado.</div>';return}let o='<div class="flex flex-col gap-3 md:hidden">';t.forEach(s=>{const n=new Date(s.createdAt.seconds*1e3).toLocaleDateString("pt-BR"),i=f(s.supplierName);o+=`
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
            `}),o+="</div>";let r=`
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
        `;e.innerHTML=o+r}catch(t){console.error(t),e.innerHTML='<p class="text-red-500 text-center">Erro ao carregar histórico.</p>'}}}function Ri(e){const t=new Date(e.createdAt.seconds*1e3).toLocaleString("pt-BR"),o=e.items.map(r=>`
        <li class="flex justify-between py-3 border-b border-gray-100 last:border-0">
            <div>
                <p class="font-medium text-sm text-gray-800">${f(r.name)}</p>
                <p class="text-xs text-gray-500">${r.qty} un. x R$ ${parseFloat(r.cost).toFixed(2)}</p>
            </div>
            <p class="text-sm font-bold text-gray-700">R$ ${(r.qty*r.cost).toFixed(2)}</p>
        </li>
    `).join(""),a=`
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
                <ul class="max-h-60 overflow-y-auto px-4">${o}</ul>
            </div>

            <div class="flex justify-between items-center pt-2 px-2">
                <p class="text-base text-gray-600 font-medium">Total Pago:</p>
                <p class="text-2xl font-bold text-green-600">R$ ${parseFloat(e.totalAmount).toFixed(2)}</p>
            </div>
            
            <div class="flex justify-end pt-4">
                 <button type="button" class="modal-close w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-200 active:scale-95 transition-transform">FECHAR</button>
            </div>
        </div>
    `;Y({title:"Detalhes da Compra",contentHTML:a,maxWidth:"max-w-md"}),setTimeout(()=>{document.querySelector("#genericModal .modal-close").addEventListener("click",()=>{Ht("genericModal")})},50)}function bo(){const e=document.querySelectorAll(".product-row");let t=0;e.forEach(a=>{if(a.offsetParent===null)return;const r=a.querySelector(".row-select"),s=a.querySelector(".qty-input"),n=a.querySelector(".row-subtotal"),i=parseFloat(a.dataset.cost||0),l=parseInt(s.value||0);if(r.checked){const d=i*l;t+=d,n&&(n.textContent=`R$ ${d.toFixed(2)}`),a.classList.remove("opacity-50","bg-gray-50")}else a.classList.add("opacity-50","bg-gray-50")});const o=document.getElementById("total-purchase-cost");o&&(o.textContent=`R$ ${t.toFixed(2).replace(".",",")}`)}async function ji(e,t=!1){if(!window.jspdf){alert("Erro: Biblioteca PDF não carregada.");return}const{jsPDF:o}=window.jspdf,a=new o,r=new Date().toLocaleDateString("pt-BR"),s=t?[100,116,139]:[22,163,74];a.setFontSize(22),a.setTextColor(...s),a.setFont("helvetica","bold");const n=t?"SOLICITAÇÃO DE COTAÇÃO":"PEDIDO DE COMPRA";a.text(n,14,20),a.setDrawColor(...s),a.setLineWidth(.5),a.line(14,25,196,25),a.setFontSize(10),a.setTextColor(0),a.setFont("helvetica","bold"),a.text("DE:",14,35),a.setFont("helvetica","normal"),a.text(m.establishmentName||"Nossa Empresa",14,40),a.text(`Data: ${r}`,14,45),a.setFont("helvetica","bold"),a.text("PARA:",110,35),a.setFont("helvetica","normal"),a.text(e.info.name||"Fornecedor",110,40),e.info.email&&a.text(`Email: ${e.info.email}`,110,45),e.info.phone&&a.text(`Tel: ${e.info.phone}`,110,50),a.setFontSize(10),a.setFont("helvetica","italic");const i=t?"Por favor, enviem os vossos melhores preços e condições para os itens listados abaixo.":"Confirmação de pedido de compra conforme os itens e quantidades abaixo.";a.text(i,14,65);const l=t?["Produto","Quantidade Solicitada"]:["Produto","Qtd.","V. Unitário","V. Total"],d=e.items.map(b=>t?[b.name,b.qty.toString()]:[b.name,b.qty.toString(),`R$ ${b.cost.toFixed(2)}`,`R$ ${(b.qty*b.cost).toFixed(2)}`]);a.autoTable({startY:75,head:[l],body:d,theme:"striped",headStyles:{fillColor:s,textColor:[255,255,255],fontStyle:"bold",halign:"left"},styles:{fontSize:10,cellPadding:3,valign:"middle"},columnStyles:t?{}:{1:{halign:"center"},2:{halign:"right"},3:{halign:"right",fontStyle:"bold"}},foot:t?null:[["","","TOTAL DO PEDIDO:",{content:`R$ ${d.reduce((b,h)=>b+parseFloat(h[3].replace("R$ ","")),0).toFixed(2)}`,styles:{halign:"right",fontStyle:"bold",fillColor:[240,240,240],textColor:[0,0,0]}}]]});const c=a.internal.getNumberOfPages();for(let b=1;b<=c;b++)a.setPage(b),a.setFontSize(8),a.setTextColor(150),a.text(`Gerado por Kairos - Página ${b} de ${c}`,196,290,{align:"right"});const u=e.info.name.replace(/[^a-zA-Z0-9]/g,"_"),g=`${t?"Cotacao":"Pedido"}_${u}_${r.replace(/\//g,"-")}.pdf`;a.save(g),p("Sucesso","PDF gerado com sucesso!","success")}function va(e=null){const t=`
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
    `;Y({title:e?"Editar Fornecedor":"Novo Fornecedor",contentHTML:t,maxWidth:"max-w-lg"}),setTimeout(()=>{document.getElementById("supplierForm").addEventListener("submit",Ai),document.querySelector("#genericModal .modal-close").addEventListener("click",()=>Ht("genericModal"))},50)}function Fi(){ve.innerHTML=`
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
    `,ce&&(ve.removeEventListener("click",ce),ve.removeEventListener("input",ce),ve.removeEventListener("change",ce)),ce=e=>{if(e.target.closest("#tab-btn-list")&&ft("list"),e.target.closest("#tab-btn-purchases")&&ft("purchases"),e.target.closest("#tab-btn-history")&&ft("history"),e.target.id==="toggle-quote-mode"&&(O.isQuoteMode=e.target.checked,ot()),e.target.id==="supplierSearchInput"&&Yt(),e.target.closest("#btn-new-supplier")&&va(),e.target.closest(".supplier-item-mobile")){const o=e.target.closest(".supplier-item-mobile"),a=JSON.parse(o.dataset.supplier);qi(a)}const t=e.target.closest("button[data-action]");if(t){const o=t.dataset.action;o==="delete"&&Mi(t.dataset.id),o==="edit"&&va(JSON.parse(t.dataset.supplier))}if((e.target.classList.contains("qty-input")||e.target.classList.contains("row-select"))&&bo(),e.target.id==="check-all-rows"){const o=e.target.checked;document.querySelectorAll(".row-select").forEach(a=>a.checked=o),bo()}if(e.target.closest("#btn-go-to-orders")){const o=document.querySelectorAll(".product-row"),a={};let r=!1;if(o.forEach(s=>{if(s.offsetParent===null||!s.querySelector(".row-select").checked)return;r=!0;let i="Produto";const l=s.querySelector("td:nth-child(2)"),d=s.querySelector(".font-bold");l?i=l.innerText:d&&(i=d.innerText);const c=parseInt(s.querySelector(".qty-input").value),u=parseFloat(s.dataset.cost),b=s.querySelector(".supplier-select").value;if(b){if(!a[b]){const h=O.allSuppliers.find(v=>v.id===b);a[b]={info:h,items:[]}}a[b].items.push({name:i,qty:c,cost:u})}}),!r){p("Atenção","Selecione pelo menos um item para gerar o pedido.","error");return}O.finalOrders=a,O.step=2,ot()}if(e.target.closest("#btn-back-step1")&&(O.step=1,ot()),e.target.closest(".btn-send-order")){const o=e.target.closest(".btn-send-order"),a=JSON.parse(decodeURIComponent(o.dataset.supplierInfo)),r=JSON.parse(decodeURIComponent(o.dataset.orderItems)),s=parseFloat(o.dataset.total),n=O.isQuoteMode;if(a.phone){const i=a.phone.replace(/\D/g,"");let l="";n?(l=`Olá *${a.name}*, tudo bem?

Gostaria de solicitar uma *cotação* para os seguintes itens:

`,r.forEach(c=>{l+=`- ${c.qty}x ${c.name}
`}),l+=`
Aguardo o retorno. Obrigado!`):(l=`Olá *${a.name}*, gostaria de realizar o seguinte *pedido*:

`,l+=`*ITENS:*
`,r.forEach(c=>{l+=`- ${c.qty}x ${c.name}
`}),l+=`
Aguardo confirmação.`);const d=`https://wa.me/${i}?text=${encodeURIComponent(l)}`;window.open(d,"_blank"),p("Aberto","WhatsApp aberto.","success")}else if(a.email){const i=n?`Solicitação de Cotação - ${m.establishmentName||"Empresa"}`:`Pedido de Compra - ${m.establishmentName||"Empresa"}`;let l=`Olá ${a.name},

`;n?l+=`Gostaria de solicitar uma cotação para os itens abaixo:

`:l+=`Gostaria de realizar o seguinte pedido:

`,r.forEach(c=>{l+=`- ${c.qty}x ${c.name}
`}),n||(l+=`
Valor Total Estimado: R$ ${s.toFixed(2)}`),l+=`

Aguardo retorno.`;const d=`mailto:${a.email}?subject=${encodeURIComponent(i)}&body=${encodeURIComponent(l)}`;window.location.href=d}else p("Erro","Fornecedor sem telefone ou email cadastrado.","error")}if(e.target.closest(".btn-register-order")){const o=e.target.closest(".btn-register-order");if(o.disabled)return;const a=JSON.parse(decodeURIComponent(o.dataset.order));a.establishmentId=m.establishmentId,o.disabled=!0,o.textContent="A processar...",Ie(m.establishmentId).then(r=>{const s=r.purchaseConfig||null;return xi(a,s)}).then(()=>{p("Sucesso","Compra registrada e integrada ao financeiro!","success"),o.innerHTML='<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Registrado',o.classList.replace("bg-blue-600","bg-green-600"),o.classList.replace("hover:bg-blue-700","hover:bg-green-700")}).catch(r=>{o.disabled=!1,o.innerHTML='<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Salvar',p("Erro","Falha ao registrar compra: "+r.message,"error")})}if(e.target.closest(".btn-delete-purchase")){const a=e.target.closest(".btn-delete-purchase").dataset.id;H("Excluir Compra","Isto apagará o registo histórico E o lançamento financeiro associado. Deseja continuar?").then(async r=>{if(r)try{await yi(a,m.establishmentId),p("Sucesso","Compra e financeiro excluídos.","success"),Ss()}catch(s){p("Erro","Erro ao excluir: "+s.message,"error")}})}if(e.target.closest(".btn-print-order")){const a=e.target.closest(".supplier-order-card").dataset.supplierId,r=O.finalOrders[a];r?ji(r,O.isQuoteMode):p("Erro","Dados do pedido não encontrados.","error")}if(e.target.closest(".btn-view-purchase")){const o=e.target.closest(".btn-view-purchase"),a=JSON.parse(o.dataset.purchase);Ri(a)}},ve.addEventListener("click",ce),ve.addEventListener("input",ce),ve.addEventListener("change",ce),ft("list")}function ft(e){Ct=e,["list","purchases","history"].forEach(o=>{const a=document.getElementById(`tab-btn-${o}`),r=document.getElementById(`tab-content-${o}`);o===e?(a.classList.add("border-indigo-500","text-indigo-600"),a.classList.remove("border-transparent","text-gray-500"),r.classList.remove("hidden")):(a.classList.remove("border-indigo-500","text-indigo-600"),a.classList.add("border-transparent","text-gray-500"),r.classList.add("hidden"))});const t=document.getElementById("btn-new-supplier");t&&(e==="list"?t.classList.remove("hidden"):t.classList.add("hidden")),Bi()}const Kt=document.getElementById("content"),ha={monday:"Segunda",tuesday:"Terça",wednesday:"Quarta",thursday:"Quinta",friday:"Sexta",saturday:"Sábado",sunday:"Domingo"};let ne=new Set,vt=null,Me=null;function Hi(e=8){let t="";for(let o=0;o<e;o++)t+=`
        <div class="bg-white rounded-lg shadow-md flex items-center gap-4 p-3 overflow-hidden animate-pulse sm:flex-col sm:items-stretch sm:p-0 sm:gap-0">
            <div class="w-16 h-16 rounded-full bg-gray-200 flex-shrink-0 sm:w-full sm:h-32 sm:rounded-b-none sm:rounded-t-lg"></div>
            <div class="flex-1 space-y-3 sm:p-4">
                <div class="h-4 bg-gray-200 rounded w-3/4"></div>
                <div class="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
        </div>
        `;return t}function Oi(e){return e.length===0?'<p class="col-span-full text-center text-gray-500 py-10">Nenhum profissional encontrado.</p>':e.map(t=>{const o=t.status==="inactive",a=f(t.name),r=f(t.specialty||"Especialidade"),s=t.photo||`https://placehold.co/100x100/E2E8F0/4A5568?text=${encodeURIComponent(t.name?t.name.charAt(0):"P")}`,n=JSON.stringify(t).replace(/'/g,"&apos;");return`
            <div class="professional-card bg-white rounded-lg shadow-md flex items-center gap-4 p-3 cursor-pointer transition-transform transform hover:shadow-lg hover:bg-gray-50
                        sm:flex-col sm:items-stretch sm:p-0 sm:gap-0 ${o?"opacity-50 bg-gray-100":""}" 
                 data-action="open-professional-modal" data-professional='${n}'>
                
                <img src="${s}" alt="Foto de ${a}" class="w-16 h-16 rounded-full object-cover flex-shrink-0
                            sm:w-full sm:h-32 sm:rounded-b-none sm:rounded-t-lg">
                
                <div class="flex-1 sm:p-4">
                    <div class="flex justify-between items-start">
                        <div>
                            <h3 class="text-sm font-bold text-gray-900 text-left sm:text-base">${a}</h3>
                            <p class="text-xs text-gray-500 text-left sm:text-sm">${r}</p>
                        </div>
                        <span class="text-xs font-semibold py-1 px-2 rounded-full hidden sm:inline-block ${o?"bg-red-100 text-red-700":"bg-green-100 text-green-700"}">
                            ${o?"Inativo":"Ativo"}
                        </span>
                    </div>
                    <div class="mt-2 pt-2 border-t sm:hidden">
                        <span class="text-xs font-semibold ${o?"text-red-700":"text-green-700"}">${o?"Inativo":"Ativo"}</span>
                    </div>
                    <div class="hidden sm:block mt-3 pt-3 border-t">
                        <p class="text-xs text-gray-600">Serviços: <span class="font-semibold">${t.services?.length||0}</span></p>
                    </div>
                </div>
            </div>`}).join("")}function eo(){const e=document.getElementById("genericModal");e.style.display="none",Me&&e.removeEventListener("click",Me)}async function zi(e){const t=document.getElementById("genericModal"),o=e.id?e:{name:"Novo Profissional",specialty:"",status:"active",workingHours:{},services:[]},a=f(o.name),r=m.services||await be(m.establishmentId),s=m.professionals||await K(m.establishmentId),n=`
        <div class="modal-content max-w-5xl p-0 overflow-y-auto max-h-[90vh]"> 
            <div class="modal-header px-6 py-4 flex justify-between items-center border-b">
                <h2 class="text-2xl font-bold text-gray-800">${a}</h2>
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
                    data-id="${o.id||""}" 
                    class="text-red-600 hover:text-red-800 transition-colors ${o.id?"":"hidden"}" 
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
        </div>`;t.innerHTML=n,t.style.display="flex",Vi(o,r),Ui(o),_i(o,s),Ji(o)}function Vi(e,t){const o=document.getElementById("professionalForm"),a=e.dob?e.dob.split("/"):["",""],r=Array.from({length:12},(w,k)=>{const S=k+1,y=S==a[1]?"selected":"",E=new Date(0,k).toLocaleString("pt-BR",{month:"long"});return`<option value="${S}" ${y}>${E.charAt(0).toUpperCase()+E.slice(1)}</option>`}).join(""),s=e.status||"active",n=f(e.name||""),i=f(e.specialty||""),l=f(e.phone||""),d=f(e.notes||"");o.innerHTML=`
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
                    <div class="form-group"><label for="profPhone">Número de telefone</label><input type="tel" id="profPhone" value="${l}" class="mt-1 w-full p-2 border rounded-md"></div>
                    <div class="form-group"><label for="profDobDay">Aniversário (Dia)</label><input type="number" id="profDobDay" value="${a[0]}" min="1" max="31" class="mt-1 w-full p-2 border rounded-md"></div>
                    <div class="form-group"><label for="profDobMonth">Aniversário (Mês)</label><select id="profDobMonth" class="mt-1 w-full p-2 border rounded-md bg-white"><option value="">Selecione...</option>${r}</select></div>
                    <div class="form-group"><label for="profOrderOnAgenda">Ordem na agenda</label><input type="number" id="profOrderOnAgenda" value="${e.orderOnAgenda||"1"}" min="1" class="mt-1 w-full p-2 border rounded-md"></div>
                </div>
                 <div class="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div class="form-group"><label for="profCommission">Recebe comissão?</label><select id="profCommission" class="mt-1 w-full p-2 border rounded-md bg-white"><option value="sim" ${e.receivesCommission?"selected":""}>Sim</option><option value="nao" ${e.receivesCommission?"":"selected"}>Não</option></select></div>
                    <div class="form-group"><label for="profShowOnAgenda">Mostrar na agenda</label><select id="profShowOnAgenda" class="mt-1 w-full p-2 border rounded-md bg-white"><option value="sim" ${e.showOnAgenda!==!1?"selected":""}>Sim</option><option value="nao" ${e.showOnAgenda===!1?"selected":""}>Não</option></select></div>
                </div>
            </div>
        </div>

        <div><label class="block text-sm font-medium text-gray-700">Serviços Realizados</label><div id="profServicesContainer" class="mt-2 grid grid-cols-2 md:grid-cols-3 gap-4 p-4 border rounded-md bg-white max-h-48 overflow-y-auto">${t.map(w=>`<label class="flex items-center space-x-2"><input type="checkbox" value="${w.id}" class="rounded" ${e.services?.includes(w.id)?"checked":""}><span>${f(w.name)}</span></label>`).join("")}</div></div>
        <div class="form-group"><label for="profNotes">Observações</label><textarea id="profNotes" rows="3" class="mt-1 w-full p-2 border rounded-md">${d}</textarea></div>`;const c=document.getElementById("profPhotoInput"),u=document.getElementById("profPhotoButton"),g=document.getElementById("profPhotoPreview"),b=document.getElementById("profPhotoBase64"),h=e.photo||`https://placehold.co/128x128/E2E8F0/4A5568?text=${encodeURIComponent(e.name?e.name.charAt(0):"P")}`,v=e.photo||"";u&&u.addEventListener("click",()=>c.click()),c&&(c.onchange=async()=>{const w=c.files[0];if(w){g.src="https://placehold.co/128x128/E2E8F0/4A5568?text=...";try{const k=await es(w,800,800,.8),y=k.length*3/4,E=1e3*1024;if(y>E)throw new Error("A imagem é muito grande mesmo após a compressão.");g.src=k,b.value=k}catch(k){p("Erro de Imagem",k.message||"Não foi possível processar a imagem.","error"),g.src=h,b.value=v,c.value=""}}})}function Ui(e){const t=document.getElementById("jornada");t.innerHTML='<div><h3 class="text-xl font-semibold mb-4">Jornada de Trabalho Semanal</h3><p class="text-sm text-gray-600 mb-4">Defina os horários de trabalho padrão para este profissional.</p><div id="profScheduleContainer" class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4"></div></div>',Wi(t.querySelector("#profScheduleContainer"),e.workingHours||{})}async function _i(e,t){const o=document.getElementById("bloqueios");o.innerHTML=`
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
        </div>`;const a=document.getElementById("batchBlockageForm");a&&a.addEventListener("submit",async s=>{s.preventDefault();const n=Array.from(s.target.querySelectorAll('input[name="batch-professionals"]:checked')).map(b=>b.value);if(n.length===0)return p("Atenção","Selecione pelo menos um profissional.","error");const i=s.target.batchBlockageStartDate.value,l=s.target.batchBlockageEndDate.value||i,d=s.target.batchBlockageStartTime.value,c=s.target.batchBlockageEndTime.value,u=s.target.batchBlockageReason.value;if(!i||!d||!c)return p("Atenção","Preencha Data de Início, Início e Fim.","error");const g=n.map(b=>{const h={professionalId:b,establishmentId:m.establishmentId,startTime:new Date(`${i}T${d}`).toISOString(),endTime:new Date(`${l}T${c}`).toISOString(),reason:u};return Vt(h)});try{await Promise.all(g),p("Sucesso!",`${n.length} bloqueios foram criados.`);const b=document.getElementById("prof-blockages-filter").value;at(e.id,b)}catch(b){p("Erro",b.message,"error")}}),document.getElementById("prof-blockages-filter").addEventListener("change",s=>at(e.id,s.target.value)),await at(e.id,"future")}function Wi(e,t){e.innerHTML=Object.keys(ha).map(o=>{const a=t[o]||{},r=a.active!==!1;return`
            <div class="day-schedule-card p-3 rounded-lg ${r?"bg-white":"bg-gray-100 disabled"} border">
                 <div class="flex justify-between items-center"><span class="font-semibold text-gray-800">${ha[o]}</span><label class="flex items-center cursor-pointer"><div class="relative"><input type="checkbox" data-day="${o}" data-field="active" class="sr-only" ${r?"checked":""}><div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full"></div></div></label></div>
                <div class="time-inputs grid grid-cols-2 gap-2 mt-2 text-sm">
                    <div><label>Início:</label><input type="time" data-day="${o}" data-field="start" value="${a.start||"09:00"}" class="w-full p-1 border rounded" ${r?"":"disabled"}></div>
                    <div><label>Fim:</label><input type="time" data-day="${o}" data-field="end" value="${a.end||"18:00"}" class="w-full p-1 border rounded" ${r?"":"disabled"}></div>
                    <div><label>Intervalo:</label><input type="time" data-day="${o}" data-field="breakStart" value="${a.breakStart||"12:00"}" class="w-full p-1 border rounded" ${r?"":"disabled"}></div>
                    <div><label>Fim Int.:</label><input type="time" data-day="${o}" data-field="breakEnd" value="${a.breakEnd||"13:00"}" class="w-full p-1 border rounded" ${r?"":"disabled"}></div>
                </div>
            </div>`}).join(""),e.querySelectorAll('input[type="checkbox"][data-field="active"]').forEach(o=>{o.addEventListener("change",a=>{const r=a.target.closest(".day-schedule-card"),s=!a.target.checked;r.classList.toggle("bg-white",!s),r.classList.toggle("bg-gray-100",s),r.classList.toggle("disabled",s),r.querySelectorAll(".time-inputs input").forEach(n=>n.disabled=s)})})}async function at(e,t="future"){const o=document.getElementById("blockagesList");if(o){o.innerHTML='<div class="loader mx-auto"></div>';try{const a=new Date;let r,s;t==="history"?(s=new Date,r=new Date,r.setFullYear(r.getFullYear()-2)):(r=new Date,s=new Date,s.setFullYear(s.getFullYear()+2));let i=(await zt(m.establishmentId,r.toISOString(),s.toISOString(),e)).map(d=>({...d,startTime:new Date(d.startTime),endTime:new Date(d.endTime)}));t==="history"?i=i.filter(d=>d.endTime<a).sort((d,c)=>c.startTime-d.startTime):i=i.filter(d=>d.endTime>=a).sort((d,c)=>d.startTime-c.startTime);const l=i.reduce((d,c)=>{const u=c.reason||"Sem motivo";return d[u]||(d[u]=[]),d[u].push(c),d},{});if(Object.keys(l).length===0){o.innerHTML=`<p class="text-center text-gray-500 text-sm py-4">Nenhum bloqueio ${t==="history"?"no histórico":"futuro"}.</p>`;return}o.innerHTML=Object.entries(l).map(([d,c])=>`
            <div class="bg-gray-100 rounded-lg p-3 my-2 space-y-2">
                <div class="flex justify-between items-center pb-2 border-b">
                    <h4 class="font-bold text-gray-700">${f(d)} (${c.length})</h4>
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
        `).join("")}catch(a){o.innerHTML=`<p class="text-red-500">${a.message}</p>`}}}function Ji(e){const t=document.getElementById("genericModal");Me&&t.removeEventListener("click",Me),Me=async o=>{const a=o.target.closest("button[data-action]");if(!a){const s=o.target.closest(".tab-link");s&&(t.querySelectorAll(".tab-link").forEach(n=>n.classList.remove("active")),s.classList.add("active"),t.querySelectorAll(".tab-content").forEach(n=>n.classList.add("hidden")),document.getElementById(s.dataset.tab).classList.remove("hidden"));return}const r=a.dataset.action;switch(o.stopPropagation(),r){case"close-modal":eo();break;case"delete-professional":const s=a.dataset.id;if(await H("Excluir Profissional",`Tem certeza que deseja excluir ${e.name}? Esta ação não pode ser desfeita.`))try{await za(s),p("Sucesso!","Profissional excluído.","success"),eo(),Mt()}catch(v){p("Erro",`Não foi possível excluir: ${v.message}`,"error")}break;case"save-professional":const i=document.getElementById("professionalForm"),l=a,d=document.getElementById("profScheduleContainer"),c=Array.from(i.querySelectorAll("#profServicesContainer input:checked")).map(v=>v.value),u={};d&&d.querySelectorAll(".day-schedule-card").forEach(v=>{const w=v.querySelector('[data-field="active"]').dataset.day;u[w]={active:v.querySelector('[data-field="active"]').checked,start:v.querySelector('[data-field="start"]').value,end:v.querySelector('[data-field="end"]').value,breakStart:v.querySelector('[data-field="breakStart"]').value,breakEnd:v.querySelector('[data-field="breakEnd"]').value}});const g={...e,id:i.querySelector("#professionalId").value||void 0,name:i.querySelector("#profName").value,specialty:i.querySelector("#profSpecialty").value,photo:i.querySelector("#profPhotoBase64").value,services:c,workingHours:u,phone:i.querySelector("#profPhone").value,dob:`${i.querySelector("#profDobDay").value}/${i.querySelector("#profDobMonth").value}`,receivesCommission:i.querySelector("#profCommission").value==="sim",showOnAgenda:i.querySelector("#profShowOnAgenda").value==="sim",orderOnAgenda:parseInt(i.querySelector("#profOrderOnAgenda").value)||1,notes:i.querySelector("#profNotes").value,status:i.querySelector("#profStatus").value,establishmentId:m.establishmentId};l.disabled=!0,l.textContent="A salvar...";try{g.id?(await Tt(g.id,g),p("Sucesso!","Profissional atualizado.","success")):(delete g.id,await Oa(g),p("Sucesso!","Profissional criado.","success")),eo(),Mt()}catch(v){p("Erro",v.message,"error"),l.disabled=!1,l.textContent="Salvar"}break;case"delete-blockage":const b=a.dataset.id;if(await H("Apagar Bloqueio","Tem certeza?"))try{await Eo(b),p("Bloqueio removido.","success");const v=document.getElementById("prof-blockages-filter")?document.getElementById("prof-blockages-filter").value:"future";at(e.id,v)}catch(v){p("Erro",v.message,"error")}break;case"batch-delete-blockage":const h=JSON.parse(a.dataset.ids);if(await H("Apagar em Lote",`Tem certeza que deseja apagar ${h.length} bloqueios com este motivo?`))try{await Qa(h),p("Bloqueios removidos.","success");const v=document.getElementById("prof-blockages-filter")?document.getElementById("prof-blockages-filter").value:"future";at(e.id,v)}catch(v){p("Erro",v.message,"error")}break}},t.addEventListener("click",Me)}function fo(){const e=document.getElementById("batch-actions-container"),t=document.getElementById("selected-count");!e||!t||(ne.size>0?(t.textContent=`${ne.size} selecionado(s)`,e.classList.remove("hidden")):e.classList.add("hidden"))}function Gi(){H("Excluir em Lote",`Tem certeza que deseja excluir ${ne.size} profissionais? Esta ação não pode ser desfeita.`).then(async e=>{if(e)try{await ur(Array.from(ne)),p("Sucesso!",`${ne.size} profissionais foram excluídos.`,"success"),ne.clear(),fo(),Mt()}catch(t){p("Erro",`Não foi possível excluir em lote: ${t.message}`,"error")}})}function Ye(){const e=document.getElementById("professionalsList");if(!e)return;if(!m.professionals){e.className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 pb-20",e.innerHTML=Hi();return}const t=document.getElementById("showInactiveProfToggle").checked,o=document.getElementById("profSearchInput").value.toLowerCase(),a=m.professionals.filter(r=>{const s=r.name.toLowerCase().includes(o),n=t||r.status!=="inactive";return s&&n});e.className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 pb-20",e.innerHTML=Oi(a)}async function Mt(){ne.clear(),Kt.innerHTML=`
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
        </section>`,vt&&Kt.removeEventListener("click",vt),vt=t=>{const o=t.target.closest('[data-action="open-professional-modal"]'),a=t.target.closest('[data-action="batch-delete"]');if(o){t.preventDefault();let s={};if(o.dataset.professional)try{s=JSON.parse(o.dataset.professional)}catch(n){console.error("Erro ao fazer parse do professional data:",n);return}zi(s);return}if(a){Gi();return}const r=t.target.closest(".professional-checkbox");if(r){const s=r.dataset.id;r.checked?ne.add(s):ne.delete(s),Ye(),fo();return}},Kt.addEventListener("click",vt),document.getElementById("profSearchInput").addEventListener("input",Ye),document.getElementById("showInactiveProfToggle").addEventListener("change",Ye);const e=document.getElementById("professionalsList");m.professionals=null,m.services=null,Ye();try{const[t,o]=await Promise.all([K(m.establishmentId),be(m.establishmentId)]);m.professionals=t,m.services=o,Ye(),fo()}catch{e.innerHTML='<p class="text-red-500 col-span-full">Erro ao carregar dados da página.</p>'}}let $={clients:[],selectedClient:null,activeTab:"profile",filters:{search:"",inactiveDays:"",birthMonth:"",hasLoyalty:!1,hasDebt:!1},showFilters:!1,loading:!1,historyLimit:20,historySearchTerm:"",historyLoading:!1,historyData:{appointments:[],sales:[],loyaltyLog:[]},modalOpen:!1},$s=null;const Yi=e=>e?String(e).replace(/\D/g,""):"",Qi=e=>{if(!e)return"Nunca";let t;if(typeof e=="object"&&(e.seconds||e._seconds)){const o=e.seconds||e._seconds;t=new Date(o*1e3)}else t=new Date(e);return isNaN(t.getTime())?"Data Inválida":t.toLocaleDateString("pt-BR")};function Fo(){$s.innerHTML=`
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
                ${$.loading?'<div class="flex justify-center pt-20"><div class="loader"></div></div>':""}
            </div>
        </section>
    `;const e=document.getElementById("btn-new-client");e&&(e.onclick=rl)}function ct(){if($.modalOpen)return;Fo();const e=document.getElementById("clients-content-area"),t=$.filters.inactiveDays||$.filters.birthMonth||$.filters.hasLoyalty||$.filters.hasDebt,o=`
        <div class="sticky top-0 bg-gray-50 z-20 px-3 sm:px-4 pt-4 pb-2 w-full">
            <div class="flex gap-2 items-center">
                <div class="relative flex-grow shadow-sm">
                    <input type="text" id="client-search" 
                        class="w-full py-3 pl-10 pr-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 text-sm outline-none transition bg-white" 
                        placeholder="Buscar cliente..." 
                        value="${$.filters.search}">
                    <svg class="w-5 h-5 text-gray-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                
                <button id="btn-toggle-filters" class="flex-shrink-0 p-3 rounded-xl border transition flex items-center gap-2 font-medium ${$.showFilters||t?"bg-indigo-50 border-indigo-200 text-indigo-700":"bg-white border-gray-300 text-gray-600 hover:bg-gray-50"}">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>
                    <span class="hidden sm:inline">Filtros</span>
                    ${t?'<span class="flex h-2 w-2 rounded-full bg-indigo-600"></span>':""}
                </button>
            </div>

            <div id="filter-panel" class="${$.showFilters?"max-h-96 opacity-100 mt-3":"max-h-0 opacity-0 overflow-hidden"} transition-all duration-300 ease-in-out">
                <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    
                    <div class="space-y-1">
                        <label class="text-xs font-bold text-gray-500 uppercase">Dias Ausente (Min)</label>
                        <div class="relative">
                            <input type="number" id="filter-inactive" min="1"
                                class="w-full p-2.5 pl-9 rounded-lg border border-gray-300 focus:ring-indigo-500 text-sm bg-gray-50 outline-none" 
                                placeholder="Ex: 30 dias" 
                                value="${$.filters.inactiveDays}">
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
                            <input type="checkbox" id="filter-loyalty" class="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4" ${$.filters.hasLoyalty?"checked":""}>
                            <span class="ml-2 text-sm text-gray-700 font-medium">Com Pontos Fidelidade</span>
                        </label>
                        <label class="flex items-center cursor-pointer hover:bg-red-50 p-1 rounded transition">
                            <input type="checkbox" id="filter-debt" class="rounded text-red-600 focus:ring-red-500 w-4 h-4" ${$.filters.hasDebt?"checked":""}>
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
    `,a=$.clients.length>0?`
        <div class="px-3 sm:px-4 pb-20 pt-2 w-full">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                ${$.clients.map(c=>{const u=c.totalDebt&&parseFloat(c.totalDebt)>0,g=Qi(c.lastVisit);return`
                    <div class="client-card bg-white p-3 sm:p-4 rounded-xl border ${u?"border-l-4 border-l-red-500 border-y-red-100 border-r-red-100":"border-gray-200 border-l-4 border-l-indigo-500"} shadow-sm hover:shadow-md transition cursor-pointer active:bg-gray-50 flex items-center gap-3 group" data-id="${c.id}">
                        
                        <div class="w-12 h-12 rounded-full ${u?"bg-red-100 text-red-600":"bg-indigo-100 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white"} transition-colors flex items-center justify-center font-bold text-lg flex-shrink-0">
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
                                ${u?`<span class="text-[10px] font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded-full border border-red-200">Devendo: R$ ${parseFloat(c.totalDebt).toFixed(2)}</span>`:""}
                                <span class="text-[10px] text-gray-400 flex items-center gap-1 ml-auto">
                                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    ${g==="Nunca"?"Novo":g}
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
    `;e.innerHTML=o+a;const r=document.getElementById("client-search"),s=document.getElementById("btn-toggle-filters"),n=document.getElementById("btn-apply-filters"),i=document.getElementById("btn-clear-search");s&&(s.onclick=()=>{$.showFilters=!$.showFilters,ct()});const l=document.getElementById("filter-birth-month");l&&(l.value=$.filters.birthMonth);const d=()=>{const c=document.getElementById("filter-inactive"),u=document.getElementById("filter-loyalty"),g=document.getElementById("filter-debt"),b=document.getElementById("filter-birth-month");$.filters={search:r.value,inactiveDays:c?c.value:"",birthMonth:b?b.value:"",hasLoyalty:u?u.checked:!1,hasDebt:g?g.checked:!1},vo()};n&&(n.onclick=d),i&&(i.onclick=()=>{$.filters={search:"",inactiveDays:"",birthMonth:"",hasLoyalty:!1,hasDebt:!1},$.showFilters=!1,vo()}),r.addEventListener("keypress",c=>{c.key==="Enter"&&d()}),e.querySelectorAll(".client-card").forEach(c=>{c.onclick=()=>Es(c.dataset.id)})}function Xi(e){const t=`
        <div class="bg-white border-b sticky top-0 z-10 shadow-sm w-full">
            <div class="flex overflow-x-auto no-scrollbar gap-1 px-3 sm:px-4 py-1 w-full">
                <button class="tab-btn ${$.activeTab==="profile"?"active":""}" data-tab="profile">👤 Perfil</button>
                <button class="tab-btn ${$.activeTab==="appointments"?"active":""}" data-tab="appointments">📅 Agendamentos</button>
                <button class="tab-btn ${$.activeTab==="history"?"active":""}" data-tab="history">💰 Histórico</button>
                <button class="tab-btn ${$.activeTab==="loyalty"?"active":""}" data-tab="loyalty">⭐ Fidelidade</button>
            </div>
        </div>
    `;let o="";return $.activeTab==="profile"?o=el(e):$.activeTab==="appointments"?o=tl():$.activeTab==="history"?o=ol():$.activeTab==="loyalty"&&(o=al(e)),`
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
                ${$.historyLoading?'<div class="absolute inset-0 bg-white/80 flex items-start justify-center pt-20 z-20"><div class="loader"></div></div>':""}
                <div class="animate-fade-in max-w-4xl mx-auto w-full pb-10">
                    ${o}
                </div>
            </div>
        </div>
    `}function Zi(e,t){if(!document.getElementById("tabs-styles")){const s=document.createElement("style");s.id="tabs-styles",s.textContent=`
            .tab-btn { padding: 12px 16px; white-space: nowrap; font-size: 0.9rem; font-weight: 500; color: #6b7280; border-bottom: 2px solid transparent; transition: all 0.2s; flex-shrink: 0; }
            .tab-btn.active { color: #4f46e5; border-bottom-color: #4f46e5; font-weight: 700; background-color: #f3f4f6; border-top-left-radius: 8px; border-top-right-radius: 8px; }
            .no-scrollbar::-webkit-scrollbar { display: none; }
            .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `,e.appendChild(s)}if(e.querySelectorAll(".tab-btn").forEach(s=>{s.onclick=async()=>{const n=s.dataset.tab;if($.activeTab===n)return;(n==="appointments"||n==="history")&&($.historyLimit=20,$.historySearchTerm=""),$.activeTab=n,je(),n!=="profile"&&!$.historyLoading&&$.historyData.appointments.length===0&&await xa(t.id)}}),$.activeTab==="profile"){const s=e.querySelector("#form-edit-client"),n=e.querySelector("#btn-delete-client");s&&(s.onsubmit=nl),n&&(n.onclick=il)}if($.activeTab==="loyalty"){const s=e.querySelector("#btn-manual-redeem");s&&(s.onclick=()=>sl(t))}const o=e.querySelector("#history-search-input");if(o){const s=o.value;o.value="",o.focus(),o.value=s,o.addEventListener("input",n=>{$.historySearchTerm=n.target.value,je()})}const a=e.querySelector("#btn-load-more");a&&(a.onclick=()=>{$.historyLimit+=20,je(),xa(t.id)}),e.querySelectorAll("[data-go-agenda]").forEach(s=>{s.onclick=n=>{Fe(),Z("agenda-section",{targetDate:new Date(s.dataset.date),scrollToAppointmentId:s.dataset.id})}}),e.querySelectorAll("[data-go-comanda]").forEach(s=>{s.onclick=n=>{Fe(),Z("comandas-section",{selectedAppointmentId:s.dataset.id,initialFilter:"finalizadas"})}});const r=e.querySelector("#btn-close-modal");r&&(r.onclick=Fe)}async function je(){const e=$.selectedClient;if(!e){Fe();return}Ki(e)}function Ki(e){let t=document.getElementById("client-details-modal-overlay");t||(t=document.createElement("div"),t.id="client-details-modal-overlay",t.className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-0 sm:p-4 animate-fade-in",t.innerHTML=`
            <div class="bg-white w-full h-full sm:h-[90vh] sm:max-w-5xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col relative animate-scale-in" id="client-modal-content">
            </div>
        `,t.onclick=a=>{a.target===t&&Fe()},document.body.appendChild(t),document.body.classList.add("overflow-hidden"),$.modalOpen=!0);const o=t.querySelector("#client-modal-content");o.innerHTML=Xi(e),Zi(o,e)}function Fe(){const e=document.getElementById("client-details-modal-overlay");e&&e.remove(),document.body.classList.remove("overflow-hidden"),$.modalOpen=!1,$.selectedClient=null,ct()}function el(e){return`
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
    `}function tl(e){let t=$.historyData.appointments||[];if($.historySearchTerm){const a=$.historySearchTerm.toLowerCase();t=t.filter(r=>r.serviceName&&r.serviceName.toLowerCase().includes(a)||r.professionalName&&r.professionalName.toLowerCase().includes(a))}t.sort((a,r)=>new Date(r.startTime)-new Date(a.startTime));const o=a=>{const r=new Date(a.startTime),s=r.toLocaleDateString("pt-BR",{weekday:"short",day:"2-digit",month:"short"}).replace(".",""),n=r.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),i=r<new Date;let l=i?"Concluído":"Agendado",d=i?"bg-gray-200 text-gray-600":"bg-green-100 text-green-700";return a.status==="cancelled"&&(l="Cancelado",d="bg-red-100 text-red-600"),`
            <div class="relative bg-white border rounded-xl p-3 shadow-sm mb-3 flex gap-3 cursor-pointer active:scale-[0.99] transition w-full overflow-hidden"
                 data-go-agenda="true" data-id="${a.id}" data-date="${a.startTime}">
                
                <div class="flex-shrink-0 w-14 flex flex-col items-center justify-center rounded-lg bg-gray-100 border border-gray-200 p-1">
                    <span class="text-xs font-bold text-gray-500 uppercase">${s.split(" ")[0]}</span>
                    <span class="text-lg font-black text-gray-800 leading-none">${r.getDate()}</span>
                    <span class="text-[10px] text-gray-500">${n}</span>
                </div>

                <div class="flex-grow min-w-0 flex flex-col justify-center">
                    <h4 class="font-bold text-gray-800 text-sm truncate">${f(a.serviceName||"Serviço")}</h4>
                    <p class="text-xs text-gray-500 truncate">Prof: ${f(a.professionalName||"N/A")}</p>
                    <div class="mt-1">
                        <span class="inline-block text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${d}">
                            ${l}
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
                        value="${$.historySearchTerm}">
                    <svg class="w-5 h-5 text-gray-400 absolute left-3 top-5.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
            </div>

            <div class="w-full">
                ${t.length?t.map(o).join(""):'<p class="text-center text-gray-400 py-10 italic">Nenhum agendamento encontrado.</p>'}
            </div>
            
            ${t.length>=$.historyLimit?`
            <button id="btn-load-more" class="w-full py-3 text-sm text-indigo-600 font-bold bg-indigo-50 rounded-xl hover:bg-indigo-100 transition">
                Carregar mais antigos...
            </button>`:""}
        </div>
    `}function ol(e){let t=$.historyData.sales||[];if($.historySearchTerm){const o=$.historySearchTerm.toLowerCase();t=t.filter(a=>a.id.includes(o))}return t.sort((o,a)=>new Date(a.date)-new Date(o.date)),t.length===0&&!$.historySearchTerm?'<div class="text-center py-12 text-gray-400">Nenhum registro financeiro.</div>':`
        <div class="space-y-4 w-full">
            <div class="sticky top-0 bg-gray-50 pt-2 pb-2 z-10 w-full">
                <div class="relative w-full">
                    <input type="text" id="history-search-input" 
                        class="w-full p-3 pl-10 bg-white border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm" 
                        placeholder="Buscar código da venda..." 
                        value="${$.historySearchTerm}">
                    <svg class="w-5 h-5 text-gray-400 absolute left-3 top-5.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
            </div>

            <div class="space-y-3 w-full">
                ${t.map(o=>{const a=new Date(o.date||o.createdAt),r=o.totalAmount||0;return`
                    <div class="bg-white border border-gray-200 rounded-xl p-4 flex justify-between items-center shadow-sm active:bg-gray-50 cursor-pointer w-full"
                         data-go-comanda="true" data-id="${o.id}">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                            </div>
                            <div>
                                <p class="font-bold text-gray-800 text-sm">Venda #${o.id.slice(-4)}</p>
                                <p class="text-xs text-gray-500">${a.toLocaleDateString()}</p>
                            </div>
                        </div>
                        <div class="text-right">
                            <p class="font-bold text-gray-900">R$ ${parseFloat(r).toFixed(2)}</p>
                            <p class="text-[10px] text-indigo-500 font-medium">Ver detalhes</p>
                        </div>
                    </div>
                    `}).join("")}
            </div>
            
             ${t.length>=$.historyLimit?`
            <button id="btn-load-more" class="w-full py-3 text-sm text-indigo-600 font-bold bg-indigo-50 rounded-xl hover:bg-indigo-100 transition">
                Carregar mais...
            </button>`:""}
        </div>
    `}function al(e){const t=$.historyData.loyaltyLog||[];t.sort((a,r)=>new Date(r.date)-new Date(a.date));const o=t.length>0?t.map(a=>{const r=a.type==="redemption";return`
            <div class="flex justify-between items-center py-3 border-b border-gray-100 last:border-0 w-full">
                <div class="flex items-center gap-3">
                    <div class="w-2 h-2 rounded-full ${r?"bg-red-500":"bg-green-500"}"></div>
                    <div>
                        <p class="text-sm font-medium text-gray-700">${f(a.description||(r?"Resgate":"Acúmulo"))}</p>
                        <p class="text-[10px] text-gray-400">${new Date(a.date).toLocaleDateString()}</p>
                    </div>
                </div>
                <span class="font-bold text-sm ${r?"text-red-600":"text-green-600"}">
                    ${r?"-":"+"}${a.points}
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
                ${o}
            </div>
        </div>
    `}async function vo(){$.loading=!0,Fo();try{let e=`/api/clients/${m.establishmentId}?limit=20`;$.filters.search&&(e+=`&search=${encodeURIComponent($.filters.search)}`),$.filters.inactiveDays&&(e+=`&inactiveDays=${$.filters.inactiveDays}`),$.filters.hasLoyalty&&(e+="&hasLoyalty=true"),$.filters.hasDebt&&(e+="&hasDebt=true"),$.clients=await I(e),ct()}catch(e){console.error(e),p("Erro","Falha ao carregar clientes.","error"),$.clients=[],ct()}finally{$.loading=!1;const e=document.querySelector(".loader");e&&e.parentElement&&e.parentElement.remove()}}async function xa(e){const t=$.selectedClient;if(!(!t||!t.phone)){$.historyLoading=!0;try{const o=new Date;o.setMonth(o.getMonth()+12);const a=new Date;a.setFullYear(a.getFullYear()-5);let r=`/api/appointments/${m.establishmentId}?startDate=${a.toISOString()}&endDate=${o.toISOString()}`;r+=`&clientPhone=${encodeURIComponent(Yi(t.phone))}`,r+=`&limit=${$.historyLimit}`;const s=await I(r);$.historyData.appointments=s,$.historyData.sales=s.filter(i=>i.status==="completed").map(i=>({id:i.id,date:i.startTime,totalAmount:i.totalAmount||0,items:i.comandaItems||i.services||[]}));const n=[];s.forEach(i=>{i.status==="completed"&&i.loyaltyPointsEarned>0&&n.push({type:"earn",points:i.loyaltyPointsEarned,date:i.startTime,description:"Venda finalizada"}),i.loyaltyRedemption&&n.push({type:"redemption",points:i.loyaltyRedemption.cost||0,date:i.startTime,description:`Resgate: ${i.loyaltyRedemption.name}`})}),$.historyData.loyaltyLog=n}catch(o){console.error("Erro ao buscar histórico",o)}finally{$.historyLoading=!1,$.modalOpen&&$.selectedClient&&je()}}}function sl(e){const t=e.loyaltyPoints||0,o=`
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
    `,{modalElement:a,close:r}=Y({title:"Ajuste de Pontos",contentHTML:o,maxWidth:"w-[90%] max-w-xs"});a.querySelector("form").onsubmit=async s=>{s.preventDefault();const n=document.getElementById("redeem-action").value,i=parseInt(document.getElementById("redeem-points").value,10),l=document.getElementById("redeem-reason").value;if(!i||i<=0)return p("Erro","Qtd inválida.","error");if(n==="debit"&&i>t)return p("Erro","Saldo insuficiente.","error");try{let d=t;n==="debit"?(await zr(m.establishmentId,e.phone,i,l),d-=i):(d+=i,await Ka(e.id,{loyaltyPoints:d})),$.selectedClient.loyaltyPoints=d,$.historyData.loyaltyLog.unshift({type:n==="debit"?"redemption":"earn",points:i,date:new Date().toISOString(),description:l+" (Manual)"}),p("Sucesso","Saldo atualizado.","success"),r(),je()}catch(d){p("Erro",d.message,"error")}}}function Es(e){$.selectedClient=$.clients.find(t=>t.id===e),$.activeTab="profile",$.historyLimit=20,$.historySearchTerm="",$.historyData={appointments:[],sales:[],loyaltyLog:[]},je()}function rl(){const e=`
        <form id="modal-new-client-form" class="space-y-4">
            <div><label class="block text-sm font-bold text-gray-700 mb-1">Nome Completo *</label><input type="text" id="new-name" required class="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"></div>
            <div><label class="block text-sm font-bold text-gray-700 mb-1">Telefone (WhatsApp) *</label><input type="tel" id="new-phone" required class="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"></div>
            <div class="pt-4">
                <button type="submit" class="w-full bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold shadow hover:bg-indigo-700 active:scale-95 transition">Cadastrar</button>
            </div>
        </form>
    `,{modalElement:t,close:o}=Y({title:"Novo Cliente",contentHTML:e,maxWidth:"w-[90%] max-w-sm"});t.querySelector("form").onsubmit=async a=>{a.preventDefault();const r=document.getElementById("new-name").value,s=document.getElementById("new-phone").value;try{const n=await Co({establishmentId:m.establishmentId,name:r,phone:s});$.clients.unshift(n),p("Sucesso","Cliente criado!","success"),o(),Es(n.id)}catch(n){p("Erro",n.message,"error")}}}async function nl(e){e.preventDefault();const t=new FormData(e.target),o=Object.fromEntries(t.entries());o.establishmentId=m.establishmentId;try{await Ka($.selectedClient.id,o),Object.assign($.selectedClient,o);const a=$.clients.findIndex(r=>r.id===$.selectedClient.id);a!==-1&&($.clients[a]=$.selectedClient),p("Sucesso","Dados salvos!","success")}catch(a){p("Erro",a.message,"error")}}async function il(){if(await H("Excluir Cliente","Tem certeza? O histórico será apagado."))try{await Or($.selectedClient.id),$.clients=$.clients.filter(e=>e.id!==$.selectedClient.id),$.selectedClient=null,p("Sucesso","Cliente removido.","success"),Fe(),ct()}catch(e){p("Erro",e.message,"error")}}async function ll(){$s=document.getElementById("content"),$.selectedClient=null,$.searchTerm="",$.historyLimit=20,$.showFilters=!1,$.modalOpen=!1,$.filters={search:"",inactiveDays:"",birthMonth:"",hasLoyalty:!1,hasDebt:!1},Fo(),await vo()}const ye=document.getElementById("content"),to={monday:"Segunda",tuesday:"Terça",wednesday:"Quarta",thursday:"Quinta",friday:"Sexta",saturday:"Sábado",sunday:"Domingo"},dl={indigo:{name:"Padrão (Índigo)",main:"#4f46e5"},blue:{name:"Azul",main:"#2563eb"},sky:{name:"Céu",main:"#0284c7"},teal:{name:"Verde Água",main:"#0d9488"},emerald:{name:"Esmeralda",main:"#059669"},green:{name:"Verde",main:"#16a34a"},lime:{name:"Lima",main:"#65a30d"},amber:{name:"Âmbar",main:"#d97706"},orange:{name:"Laranja",main:"#ea580c"},red:{name:"Vermelho",main:"#dc2626"},rose:{name:"Rosa",main:"#e11d48"},pink:{name:"Pink",main:"#db2777"},fuchsia:{name:"Fúcsia",main:"#c026d3"},purple:{name:"Roxo",main:"#7c3aed"},violet:{name:"Violeta",main:"#8b5cf6"},gray:{name:"Cinza",main:"#4b5563"},black:{name:"Preto",main:"#111827"}},Is=[{id:"personal-data",icon:"M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",label:"Dados Gerais"},{id:"branding",icon:"M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z",label:"Identidade e Cores"},{id:"booking",icon:"M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2H5a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",label:"Agendamento Online"},{id:"working-hours",icon:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",label:"Horário de Funcionamento"},{id:"loyalty",icon:"M5 5a2 2 0 012-2h10a2 2 0 012 2v1h2a1 1 0 011 1v3a1 1 0 01-1 1h-2v1a2 2 0 01-2 2H7a2 2 0 01-2-2v-1H3a1 1 0 01-1-1V7a1 1 0 011-1h2V5z",label:"Plano de Fidelidade"},{id:"financial",icon:"M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8a1 1 0 011 1v4a1 1 0 11-2 0v-4a1 1 0 011-1zm0 0a1 1 0 001-1V5a1 1 0 10-2 0v2a1 1 0 001 1zm0 0a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1z",label:"Integração Financeira"},{id:"change-password",icon:"M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",label:"Alterar senha"},{id:"change-email",icon:"M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207",label:"Alterar E-mail de Acesso"},{id:"support",icon:"M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z",label:"Suporte e Ajuda"},{id:"cancellation",icon:"M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z",label:"Cancelar Assinatura"}];let J=null;function ya(e,t,o){return new Promise((a,r)=>{const s=new FileReader;s.readAsDataURL(e),s.onload=n=>{const i=new Image;i.src=n.target.result,i.onload=()=>{const l=document.createElement("canvas");let d=i.width,c=i.height;d>t&&(c*=t/d,d=t),l.width=d,l.height=c,l.getContext("2d").drawImage(i,0,0,d,c);const g=e.type==="image/png"&&t<500?"image/png":"image/jpeg";a(l.toDataURL(g,o))},i.onerror=l=>r(l)},s.onerror=n=>r(n)})}function Te(e,t=null){let o='<option value="">-- Selecione (Opcional) --</option>';const a=n=>{const i=new Map,l=[];return n&&(n.forEach(d=>i.set(d.id,{...d,children:[]})),i.forEach(d=>{d.parentId&&i.has(d.parentId)?i.get(d.parentId).children.push(d):l.push(d)})),l},r=(n,i="")=>{const l=n.id===t?"selected":"";o+=`<option value="${n.id}" ${l}>${i}${f(n.name)}</option>`,n.children.forEach(d=>r(d,i+"— "))};return a(e).forEach(n=>r(n)),o}async function We(e,t){const o=t.target.querySelector('button[type="submit"]');o&&(o.disabled=!0,o.textContent="A Salvar...");try{const a=J||await Ie(m.establishmentId),r=[],{ownerName:s,...n}=e;if(s&&s!==m.userName){const l=U.currentUser;l&&r.push(Fs(l,{displayName:s}).then(()=>{m.userName=s}))}const i={...a,...n};if(r.push(Et(m.establishmentId,i)),await Promise.all(r),J=i,p("Sucesso","Definições salvas com sucesso! A página será recarregada para aplicar o novo tema.","success"),n.themeColor)setTimeout(()=>window.location.reload(),1500);else{const l=document.getElementById("panelEstablishmentName");n.name&&l&&(l.textContent=n.name,m.establishmentName=n.name)}}catch(a){p("Erro",`Não foi possível salvar: ${a.message}`,"error")}finally{o&&(o.disabled=!1,o.textContent="Salvar")}}function cl(e,t){const o=f(e.name||""),a=f(e.phone||""),r=f(e.document||""),s=f(e.email||""),n=f(e.address||""),i=f(e.website||""),l=f(m.userName||"");t.innerHTML=`
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
                    <input type="text" id="establishmentName" class="mt-1 w-full p-2 border border-gray-300 rounded-md" value="${o}">
                </div>
                <div>
                    <label for="establishmentPhone" class="block text-sm font-medium text-gray-700">Telefone Principal</label>
                    <input type="tel" id="establishmentPhone" class="mt-1 w-full p-2 border border-gray-300 rounded-md" value="${a}">
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
    `,t.querySelector("#personal-data-form").addEventListener("submit",d=>{d.preventDefault();const c={ownerName:t.querySelector("#ownerName").value,name:t.querySelector("#establishmentName").value,phone:t.querySelector("#establishmentPhone").value,document:t.querySelector("#establishmentCnpjCpf").value,email:t.querySelector("#establishmentEmail").value,address:t.querySelector("#establishmentAddress").value,website:t.querySelector("#establishmentWebsite").value};We(c,d)})}function ul(e,t){t.innerHTML=`
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
    `,t.querySelector("#change-password-form").addEventListener("submit",async o=>{o.preventDefault();const a=t.querySelector("#newPassword").value,r=t.querySelector("#confirmPassword").value;if(a!==r){p("Erro","As senhas não coincidem.","error");return}const s=t.querySelector('button[form="change-password-form"]');s.disabled=!0,s.textContent="A Salvar...";try{const n=U.currentUser;if(n)await js(n,a),p("Sucesso","Senha alterada com sucesso!","success"),o.target.reset();else throw new Error("Nenhum usuário autenticado encontrado.")}catch(n){p("Erro",`Não foi possível alterar a senha: ${n.message}`,"error")}finally{s.disabled=!1,s.textContent="Salvar Nova Senha"}})}function ml(e,t){t.innerHTML=`
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
    `,t.querySelector("#change-email-form").addEventListener("submit",async o=>{o.preventDefault();const a=t.querySelector("#newEmail").value,r=t.querySelector("#currentPassword").value;if(!a||!r){p("Erro","Preencha todos os campos.","error");return}const s=t.querySelector('button[form="change-email-form"]');s.disabled=!0,s.textContent="A verificar...";try{const n=U.currentUser;if(!n)throw new Error("Usuário não autenticado.");const i=qs.credential(n.email,r);await Ns(n,i),s.textContent="A enviar link...",await Rs(n,a),s.textContent="A atualizar BD...",await dr(m.establishmentId,a),p("Sucesso","Link de verificação enviado! Por favor, verifique seu **novo e-mail** para confirmar a alteração.","success"),o.target.reset()}catch(n){let i="Não foi possível alterar o e-mail.";n.code==="auth/wrong-password"?i="A senha atual está incorreta.":n.code==="auth/email-already-in-use"?i="Este e-mail já está sendo usado por outra conta.":n.code==="auth/operation-not-allowed"?i="A troca de e-mail precisa ser habilitada no console do Firebase.":i=n.message,p("Erro",i,"error")}finally{s.disabled=!1,s.textContent="Salvar Novo E-mail"}})}function pl(e,t){const o=f(e.welcomeMessage||"");t.innerHTML=`
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
                        <input type="text" id="establishmentWelcomeMessage" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="Ex: Simples, rápido e à sua medida." value="${o}">
                    </div>
                </div>

                <div class="border-t pt-4 mt-4">
                    <h4 class="text-lg font-semibold text-gray-800 mb-2">Tema do Painel (Sistema)</h4>
                    <p class="text-sm text-gray-600 mb-4">Escolha a cor dos menus e botões do <strong>seu</strong> painel de gestão.</p>
                    <div id="color-palette-container" class="flex flex-wrap gap-4"></div>
                </div>
            </form>
        </div>
    `,t.querySelector("#establishmentLogoBase64").value=e.logo||"",t.querySelector("#establishmentBackgroundImageBase64").value=e.backgroundImage||"",Cs(e.themeColor||"indigo",t),t.querySelector("#establishmentLogoButton").onclick=()=>t.querySelector("#establishmentLogoInput").click(),t.querySelector("#establishmentLogoInput").onchange=async a=>{const r=a.target.files[0];if(r)try{const s=await ya(r,300,.9);t.querySelector("#establishmentLogoPreview").src=s,t.querySelector("#establishmentLogoBase64").value=s}catch(s){console.error("Erro ao processar logo:",s),p("Erro","Formato de imagem inválido ou corrompido.","error")}},t.querySelector("#establishmentBgButton").onclick=()=>t.querySelector("#establishmentBgInput").click(),t.querySelector("#establishmentBgInput").onchange=async a=>{const r=a.target.files[0];if(r){const s=t.querySelector("#establishmentBgButton"),n=s.textContent;try{s.textContent="A processar...",s.disabled=!0;const i=await ya(r,1280,.7);t.querySelector("#establishmentBgPreview").src=i,t.querySelector("#establishmentBgPreview").classList.remove("hidden"),t.querySelector("#establishmentBgPlaceholder").classList.add("hidden"),t.querySelector("#establishmentBackgroundImageBase64").value=i}catch(i){console.error("Erro ao processar fundo:",i),p("Erro","Não foi possível processar esta imagem. Tente outra.","error")}finally{s.textContent=n,s.disabled=!1}}},t.querySelector("#establishmentBgRemoveBtn").onclick=()=>{t.querySelector("#establishmentBgPreview").src="",t.querySelector("#establishmentBgPreview").classList.add("hidden"),t.querySelector("#establishmentBgPlaceholder").classList.remove("hidden"),t.querySelector("#establishmentBackgroundImageBase64").value=""},t.querySelector("#branding-form").addEventListener("submit",a=>{a.preventDefault();const r={logo:t.querySelector("#establishmentLogoBase64").value,welcomeMessage:t.querySelector("#establishmentWelcomeMessage").value,backgroundImage:t.querySelector("#establishmentBackgroundImageBase64").value,primaryColor:t.querySelector("#establishmentPrimaryColorInput").value,textColor:t.querySelector("#establishmentTextColorInput").value,themeColor:t.querySelector("#establishmentThemeColor").value};We(r,a)})}function gl(e,t){const o=e.urlId||m.establishmentId,a="https://www.kairosagenda.com.br";let r=window.location.origin;(r.includes("localhost")||r.includes("capacitor://")||r.includes("127.0.0.1")||r.includes("192.168"))&&(r=a);const s=f(`${r}/agendar?id=${o}`),n=e.publicBookingEnabled||!1,i=n?"Agendamento Online ATIVO":"Agendamento Online INATIVO",l=n?"text-green-600":"text-red-600";t.innerHTML=`
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
    `,t.querySelector("#copyBookingLinkBtn").addEventListener("click",()=>{const d=t.querySelector("#publicBookingLink");if(navigator.clipboard&&window.isSecureContext)navigator.clipboard.writeText(d.value).then(()=>{p("Sucesso","Link copiado para a área de transferência!","success")}).catch(c=>{p("Erro","Não foi possível copiar o link.","error")});else try{d.select(),document.execCommand("copy"),d.blur(),p("Sucesso","Link copiado para a área de transferência!","success")}catch{p("Erro","Não foi possível copiar o link. Por favor, copie manualmente.","error")}}),t.querySelector("#publicBookingToggle").addEventListener("change",async d=>{const c=d.target.checked,u=t.querySelector("#publicBookingStatusText");c?(u.textContent="Agendamento Online ATIVO",u.className="text-sm font-semibold text-green-600"):(u.textContent="Agendamento Online INATIVO",u.className="text-sm font-semibold text-red-600");try{d.target.disabled=!0,await lr(m.establishmentId,c),J.publicBookingEnabled=c,p("Sucesso",`Agendamento online ${c?"ativado":"desativado"}!`,"success")}catch(g){p("Erro",`Não foi possível alterar o status: ${g.message}`,"error"),d.target.checked=!c,c?(u.textContent="Agendamento Online ATIVO",u.className="text-sm font-semibold text-green-600"):(u.textContent="Agendamento Online INATIVO",u.className="text-sm font-semibold text-red-600")}finally{d.target.disabled=!1}}),wl(e.slotInterval||30,t),t.querySelector("#booking-form").addEventListener("submit",d=>{d.preventDefault();const c={slotInterval:parseInt(t.querySelector("#establishmentSlotInterval").value,10)};We(c,d)})}function bl(e,t){t.innerHTML=`
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
    `;const o=t.querySelector("#establishmentTimezone");if(e.timezone)o.value=e.timezone;else try{const s=Intl.DateTimeFormat().resolvedOptions().timeZone;Array.from(o.options).some(i=>i.value===s)?o.value=s:o.value="America/Sao_Paulo"}catch{o.value="America/Sao_Paulo"}const a=t.querySelector("#establishmentWorkingHoursContainer"),r=e.workingHours||{};Object.keys(to).forEach(s=>{const n=r[s]||{},i=to[s],l=n.active!==!1,d=document.createElement("div");d.className=`day-schedule-card p-4 rounded-lg ${l?"bg-gray-50":"bg-gray-100 disabled"}`,d.innerHTML=`
            <div class="flex justify-between items-center mb-3">
                <span class="font-bold text-gray-800">${i}</span>
                <label class="flex items-center cursor-pointer">
                    <div class="relative">
                        <input type="checkbox" id="est-${s}-active" class="sr-only" ${l?"checked":""}>
                        <div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full"></div>
                    </div>
                </label>
            </div>
            <div class="time-inputs space-y-2">
                <div class="flex items-center gap-2"><label class="w-16">Início:</label><input type="time" id="est-${s}-start" value="${n.start||"09:00"}" class="w-full rounded-md border-gray-300 shadow-sm text-sm p-1"></div>
                <div class="flex items-center gap-2"><label class="w-16">Fim:</label><input type="time" id="est-${s}-end" value="${n.end||"18:00"}" class="w-full rounded-md border-gray-300 shadow-sm text-sm p-1"></div>
                <div class="flex items-center gap-2"><label class="w-16">Intervalo:</label><input type="time" id="est-${s}-breakStart" value="${n.breakStart||"12:00"}" class="w-full rounded-md border-gray-300 shadow-sm text-sm p-1"></div>
                <div class="flex items-center gap-2"><label class="w-16">Fim Int.:</label><input type="time" id="est-${s}-breakEnd" value="${n.breakEnd||"13:00"}" class="w-full rounded-md border-gray-300 shadow-sm text-sm p-1"></div>
            </div>`,a.appendChild(d)}),a.addEventListener("change",s=>{const n=s.target.closest('.day-schedule-card input[type="checkbox"]');n&&n.closest(".day-schedule-card").classList.toggle("disabled",!n.checked)}),t.querySelector("#working-hours-form").addEventListener("submit",s=>{s.preventDefault();const n={};Object.keys(to).forEach(l=>{n[l]={active:t.querySelector(`#est-${l}-active`).checked,start:t.querySelector(`#est-${l}-start`).value,end:t.querySelector(`#est-${l}-end`).value,breakStart:t.querySelector(`#est-${l}-breakStart`).value,breakEnd:t.querySelector(`#est-${l}-breakEnd`).value}});const i=t.querySelector("#establishmentTimezone").value;We({workingHours:n,timezone:i},s)})}async function fl(e,t){const o=e.loyaltyProgram||{},a=o.pointsPerVisit||1;let r=[],s=[],n=[];try{[r,s,n]=await Promise.all([be(m.establishmentId),ut(m.establishmentId),Po(m.establishmentId)])}catch(d){console.error("Erro ao carregar dados para fidelidade:",d)}t.innerHTML=`
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
                         <input type="number" id="loyaltyPointsPerVisit" value="${a}" min="1" step="1" class="w-20 p-2 border border-purple-300 rounded-md focus:ring-purple-500 focus:border-purple-500 text-center font-bold">
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
    `,t.querySelector("#loyaltyEnabled").checked=o.enabled||!1;const i=t.querySelector("#loyaltyTiersContainer"),l=(d={})=>{const c=document.createElement("div");c.className="loyalty-tier-row group bg-white md:bg-transparent p-3 md:p-0 border md:border-0 rounded-lg shadow-sm md:shadow-none relative md:grid md:grid-cols-[0.8fr_1fr_1.5fr_1fr_auto] md:gap-2 md:items-start";const u=d.type||"money",g=d.itemId||"",b=d.reward||"",h=d.discount||"",v=d.points||d.costPoints||"";c.innerHTML=`
            <div class="mb-2 md:mb-0">
                <label class="md:hidden text-xs font-bold text-gray-500 mb-1 block">Custo (Pontos)</label>
                <div class="relative">
                    <input type="number" placeholder="Ex: 100" data-field="points" value="${v}" class="w-full p-2 pl-2 border rounded-md font-semibold text-gray-800">
                    <span class="md:hidden absolute right-3 top-2 text-xs text-gray-400">pts</span>
                </div>
            </div>

            <div class="mb-2 md:mb-0">
                <label class="md:hidden text-xs font-bold text-gray-500 mb-1 block">Tipo</label>
                <select data-field="type" class="type-select w-full p-2 border rounded-md bg-white text-sm">
                    <option value="money" ${u==="money"?"selected":""}>Desconto Livre (R$)</option>
                    <option value="service" ${u==="service"?"selected":""}>Serviço Específico</option>
                    <option value="product" ${u==="product"?"selected":""}>Produto Específico</option>
                    <option value="package" ${u==="package"?"selected":""}>Pacote</option>
                </select>
            </div>

            <div class="mb-2 md:mb-0 relative">
                <label class="md:hidden text-xs font-bold text-gray-500 mb-1 block">Item / Descrição</label>
                
                <input type="text" placeholder="Ex: Vale Compras R$ 20" data-field="rewardName" value="${f(b)}" class="desc-input w-full p-2 border rounded-md ${u!=="money"?"hidden":""}">
                
                <select data-field="itemId" class="item-select w-full p-2 border rounded-md bg-white text-sm ${u==="money"?"hidden":""}">
                    <option value="">Selecione o item...</option>
                </select>
            </div>

            <div class="mb-2 md:mb-0">
                <label class="md:hidden text-xs font-bold text-gray-500 mb-1 block">Valor Desconto (R$)</label>
                <div class="flex items-center relative">
                    <span class="absolute left-3 text-gray-500">R$</span>
                    <input type="number" placeholder="0.00" data-field="discount" value="${h}" step="0.01" class="discount-input w-full p-2 pl-8 border rounded-md">
                </div>
                <p class="text-[10px] text-gray-500 mt-1 hidden md:block">Deixe 0 para 100% (se item)</p>
            </div>

            <button type="button" class="remove-loyalty-tier absolute top-2 right-2 md:static text-gray-400 hover:text-red-600 p-2 rounded-md hover:bg-red-50 transition-colors" title="Remover">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            </button>
        `;const w=c.querySelector(".type-select"),k=c.querySelector(".item-select"),S=c.querySelector(".desc-input"),y=c.querySelector(".discount-input"),E=C=>{k.innerHTML='<option value="">Selecione...</option>';let D=[];C==="service"?D=r:C==="product"?D=s:C==="package"&&(D=n),D.forEach(A=>{const T=A.id===g,M=A.name||A.title||"Sem nome",R=A.price||A.salePrice||0;k.innerHTML+=`<option value="${A.id}" data-price="${R}" ${T?"selected":""}>${f(M)}</option>`})};return u!=="money"&&E(u),w.addEventListener("change",C=>{const D=C.target.value;D==="money"?(k.classList.add("hidden"),S.classList.remove("hidden"),S.value="",y.value=""):(k.classList.remove("hidden"),S.classList.add("hidden"),E(D),y.value="")}),k.addEventListener("change",C=>{const D=C.target.selectedOptions[0];if(D&&D.value){S.value=D.text;const A=D.dataset.price;A&&(y.value=parseFloat(A).toFixed(2))}}),c};(o.tiers||[]).forEach(d=>{i.appendChild(l(d))}),t.querySelector("#add-loyalty-tier").addEventListener("click",()=>{i.appendChild(l())}),i.addEventListener("click",d=>{const c=d.target.closest(".remove-loyalty-tier");c&&c.closest(".loyalty-tier-row").remove()}),t.querySelector("#loyalty-form").addEventListener("submit",d=>{d.preventDefault();const c="visit",u=Array.from(t.querySelectorAll("#loyaltyTiersContainer .loyalty-tier-row")).map(b=>{const h=b.querySelector(".type-select").value,v=h==="money"?null:b.querySelector(".item-select").value;let w="";if(h==="money")w=b.querySelector(".desc-input").value;else{const k=b.querySelector(".item-select");w=k.options[k.selectedIndex]?.text||""}return{points:parseInt(b.querySelector('input[data-field="points"]').value,10)||0,costPoints:parseInt(b.querySelector('input[data-field="points"]').value,10)||0,type:h,itemId:v,reward:w,name:w,discount:parseFloat(b.querySelector('input[data-field="discount"]').value)||0}}),g={loyaltyProgram:{enabled:t.querySelector("#loyaltyEnabled").checked,type:c,pointsPerVisit:parseInt(t.querySelector("#loyaltyPointsPerVisit").value,10)||1,pointsPerCurrency:0,tiers:u.filter(b=>b.points>0&&b.reward)}};We(g,d)})}async function vl(e,t){t.innerHTML=`
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
    `;try{const[o,a]=await Promise.all([Bo(m.establishmentId),Do(m.establishmentId)]),r=e.financialIntegration||{},s=e.commissionConfig||{},n=e.purchaseConfig||{};t.querySelector("#financialNatureId").innerHTML=Te(o,r.defaultNaturezaId),t.querySelector("#financialCostCenterId").innerHTML=Te(a,r.defaultCentroDeCustoId),t.querySelector("#purchaseNatureId").innerHTML=Te(o,n.defaultNatureId),t.querySelector("#purchaseCostCenterId").innerHTML=Te(a,n.defaultCostCenterId),t.querySelector("#commissionNatureId").innerHTML=Te(o,s.defaultNatureId),t.querySelector("#commissionCostCenterId").innerHTML=Te(a,s.defaultCostCenterId)}catch{p("Erro","Não foi possível carregar os dados para a integração financeira.","error")}t.querySelector("#financial-form").addEventListener("submit",o=>{o.preventDefault();const a={financialIntegration:{defaultNaturezaId:t.querySelector("#financialNatureId").value||null,defaultCentroDeCustoId:t.querySelector("#financialCostCenterId").value||null},purchaseConfig:{defaultNatureId:t.querySelector("#purchaseNatureId").value||null,defaultCostCenterId:t.querySelector("#purchaseCostCenterId").value||null},commissionConfig:{defaultNatureId:t.querySelector("#commissionNatureId").value||null,defaultCostCenterId:t.querySelector("#commissionCostCenterId").value||null}};We(a,o)})}function hl(e,t){const o="5516997859430",a=encodeURIComponent("Olá, preciso de ajuda com o sistema Kairos."),r=`https://wa.me/${o}?text=${a}`;t.innerHTML=`
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
    `}function xl(e,t){const o="5516997859430",a=encodeURIComponent("Olá, gostaria de solicitar o cancelamento da minha assinatura."),r=`https://wa.me/${o}?text=${a}`,s="sistemakairosagenda@gmail.com";t.innerHTML=`
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
                        <a href="mailto:${s}" class="text-indigo-600 font-semibold hover:underline">${s}</a>
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
    `}function yl(e,t){t.innerHTML=`
        <div class="bg-white p-4 md:p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-bold text-gray-800">${e}</h3>
            <p class="mt-4 text-gray-500">Esta secção ainda não foi implementada.</p>
        </div>
    `}function Cs(e="indigo",t){const o=t.querySelector("#color-palette-container"),a=t.querySelector("#establishmentThemeColor");!o||!a||(o.innerHTML="",Object.entries(dl).forEach(([r,s])=>{const n=r===e,i=document.createElement("div");i.className="w-24 text-center cursor-pointer mb-4",i.innerHTML=`
            <div class="w-16 h-16 mx-auto rounded-full border-4 ${n?"border-gray-800 scale-110 shadow-lg":"border-transparent"} p-1 transition-all">
                <div class="w-full h-full rounded-full" style="background-color: ${s.main};"></div>
            </div>
            <p class="text-xs mt-2 font-medium ${n?"text-gray-900 font-bold":"text-gray-500"}">${s.name}</p>
        `,i.addEventListener("click",()=>{a.value=r,Cs(r,t)}),o.appendChild(i)}),a.value=e)}function wl(e,t){const o=t.querySelector("#slotIntervalContainer"),a=t.querySelector("#establishmentSlotInterval");if(!o||!a)return;const r=[{label:"10 min",value:10},{label:"15 min",value:15},{label:"20 min",value:20},{label:"30 min",value:30},{label:"45 min",value:45},{label:"1 hora",value:60}];o.innerHTML=r.map(s=>{const n=s.value===e;return`<button type="button" data-value="${s.value}" 
                       class="interval-btn py-2 px-4 rounded-full text-sm font-semibold transition-colors 
                           ${n?"bg-indigo-600 text-white":"bg-gray-200 text-gray-700 hover:bg-gray-300"}">
                       ${s.label}
                   </button>`}).join(""),a.value=e,o.querySelectorAll(".interval-btn").forEach(s=>{s.addEventListener("click",()=>{a.value=s.dataset.value,o.querySelectorAll(".interval-btn").forEach(n=>{n.classList.remove("bg-indigo-600","text-white"),n.classList.add("bg-gray-200","text-gray-700")}),s.classList.add("bg-indigo-600","text-white"),s.classList.remove("bg-gray-200","text-gray-700")})})}async function kl(e){const t=Is.find(a=>a.id===e);if(!t){console.error("Secção de definições não encontrada:",e);return}ye.innerHTML=`
        <div class="bg-white p-4 shadow-md sticky top-0 z-10 md:relative">
            <button data-action="back-to-list" class="flex items-center gap-2 font-semibold text-indigo-600 hover:text-indigo-800">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
                Voltar
            </button>
        </div>
        
        <div id="settings-content-detail" class="p-4">
            <div class="flex justify-center items-center h-full"><div class="loader"></div></div>
        </div>
    `,ye.querySelector('button[data-action="back-to-list"]').addEventListener("click",a=>{a.preventDefault(),Ls()});const o=document.getElementById("settings-content-detail");switch(e){case"personal-data":cl(J,o);break;case"change-password":ul(J,o);break;case"change-email":ml(J,o);break;case"branding":pl(J,o);break;case"booking":gl(J,o);break;case"working-hours":bl(J,o);break;case"loyalty":await fl(J,o);break;case"financial":await vl(J,o);break;case"support":hl(J,o);break;case"cancellation":xl(J,o);break;default:yl(t?t.label:"Definições",o)}}async function Ls(){if(ye.innerHTML=`
        <div class="bg-white p-4 rounded-lg shadow-md mb-6">
            <h2 class="text-xl font-bold text-gray-800 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-500" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" /></svg>
                Definições
            </h2>
        </div>
        <div class="flex justify-center items-center h-64"><div class="loader"></div></div>
    `,!J)try{J=await Ie(m.establishmentId)}catch{p("Erro Fatal","Não foi possível carregar os dados do estabelecimento.","error"),ye.innerHTML='<p class="text-red-500">Erro ao carregar dados.</p>';return}const e=U.currentUser;e&&e.displayName&&(m.userName=e.displayName);const t=f(m.userName||U.currentUser.email);let a=`https://placehold.co/96x96/E2E8F0/4A5568?text=${t?t.charAt(0).toUpperCase():"U"}`;e&&e.photoURL&&(a=e.photoURL),ye.innerHTML=`
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
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                 </div>

                 <div class="relative w-24 h-24 mx-auto">
                    <img id="user-avatar" src="${a}" class="w-24 h-24 rounded-full object-cover">
                 </div>
                 <h3 class="font-bold mt-2 text-lg truncate">${t}</h3>
                 ${m.userName&&m.userName!==U.currentUser.email?`<p class="text-sm text-gray-500">${f(U.currentUser.email)}</p>`:""}
                 
                 <p class="text-xs text-indigo-600 font-semibold mt-2">VER MEU PERFIL / MEUS BLOQUEIOS</p>
            </div>
        </div>

        <div class="bg-white p-4 rounded-lg shadow-md">
            <nav id="settings-menu-list" class="space-y-1">
                ${Is.map(s=>`
                    <button data-section="${s.id}" class="w-full flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100 font-semibold text-sm">
                        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${s.icon}"></path></svg>
                        <span class="flex-1 text-left">${s.label}</span>
                        <svg class="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                    </button>
                `).join("")}
            </nav>
        </div>
    `,ye.querySelector("#settings-menu-list").addEventListener("click",s=>{const n=s.target.closest("button[data-section]");n&&(s.preventDefault(),kl(n.dataset.section))});const r=ye.querySelector('[data-action="go-to-my-profile"]');r&&r.addEventListener("click",s=>{s.preventDefault(),Z("my-profile-section")})}const st=document.getElementById("content");async function He(e){const t=document.getElementById("blockagesList");if(t){t.innerHTML='<div class="loader mx-auto"></div>';try{const o=document.getElementById("filterStartDate")?.value,a=document.getElementById("filterEndDate")?.value,r=await zt(m.establishmentId,o||new Date().toISOString().split("T")[0],a||new Date().toISOString().split("T")[0],e),s=document.getElementById("filterReason")?.value.toLowerCase(),n=s?r.filter(l=>l.reason&&l.reason.toLowerCase().includes(s)):r,i=n.reduce((l,d)=>{const c=d.reason||"Sem motivo";return l[c]||(l[c]=[]),l[c].push(d),l},{});if(t.innerHTML="",n.length===0){t.innerHTML='<p class="text-center text-gray-500">Nenhum bloqueio encontrado.</p>';return}Object.entries(i).forEach(([l,d])=>{const c=document.createElement("div");c.className="bg-gray-100 rounded-lg p-3 my-2 space-y-2";let g=`<div class="flex justify-between items-center pb-2 border-b border-gray-200">
                                <h4 class="font-bold text-gray-700">${f(l)} (${d.length})</h4>`;if(d.length>1){const b=JSON.stringify(d.map(h=>h.id));g+=`<button data-action="batch-delete-blockage" data-ids='${b}' class="text-xs text-red-600 hover:text-red-800 font-semibold flex items-center gap-1">
                                    Apagar Lote
                                </button>`}g+="</div>",c.innerHTML=g,d.forEach(b=>{const h=new Date(b.startTime),v=new Date(b.endTime),w=h.toLocaleDateString("pt-BR"),k=v.toLocaleDateString("pt-BR"),y=`
                    <div class="bg-white p-3 rounded-md flex items-center justify-between shadow-sm">
                        <div>
                            <p class="font-medium text-gray-800 text-sm">
                                ${w===k?`${w} | ${h.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})} - ${v.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}`:`De ${w} às ${h.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}<br>Até ${k} às ${v.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}`}
                            </p>
                        </div>
                        <button class="p-1 rounded-full text-gray-500 hover:bg-gray-100 hover:text-red-600" data-action="delete-blockage" data-id="${b.id}">Apagar</button>
                    </div>`;c.innerHTML+=y}),t.appendChild(c)})}catch(o){t.innerHTML=`<p class="text-center text-red-500">Erro: ${o.message}</p>`}}}async function Sl(e){e.preventDefault();const t=e.target,o=t.querySelector("#blockageProfId").value,a=t.querySelector("#blockageDate").value,r=t.querySelector("#blockageEndDate").value||a,s=t.querySelector("#blockageStartTime").value,n=t.querySelector("#blockageEndTime").value,i={establishmentId:m.establishmentId,professionalId:o,startTime:new Date(`${a}T${s}:00`).toISOString(),endTime:new Date(`${r}T${n}:00`).toISOString(),reason:t.querySelector("#blockageReason").value};try{await Vt(i),t.reset(),p("Sucesso","Bloqueio adicionado com sucesso!","success"),He(o)}catch(l){p("Erro",`Não foi possível criar o bloqueio: ${l.message}`,"error")}}async function $l(e){e.preventDefault();const t=e.target,o=Array.from(t.querySelectorAll('input[name="batch-professionals"]:checked')).map(c=>c.value);if(o.length===0)return p("Atenção","Selecione pelo menos um profissional.","error");const a=t.querySelector("#batchBlockageDate").value,r=t.querySelector("#batchBlockageEndDate").value||a,s=t.querySelector("#batchBlockageStartTime").value,n=t.querySelector("#batchBlockageEndTime").value,i=t.querySelector("#batchBlockageReason").value,l=t.querySelector('button[type="submit"]');l.disabled=!0,l.textContent="Aguarde...";const d=o.map(c=>{const u={establishmentId:m.establishmentId,professionalId:c,startTime:new Date(`${a}T${s}:00`).toISOString(),endTime:new Date(`${r}T${n}:00`).toISOString(),reason:i};return Vt(u)});try{await Promise.all(d),p("Sucesso",`${o.length} bloqueios foram criados com sucesso!`,"success"),t.reset(),t.querySelectorAll('input[name="batch-professionals"]:checked').forEach(u=>u.checked=!1);const c=document.getElementById("blockageProfId").value;c&&He(c)}catch(c){p("Erro",`Ocorreu um erro: ${c.message}`,"error")}finally{l.disabled=!1,l.textContent="Adicionar Bloqueio em Lote"}}function El(e){st.addEventListener("submit",t=>{t.target.id==="blockageForm"&&Sl(t),t.target.id==="batchBlockageForm"&&$l(t)}),st.addEventListener("input",t=>{t.target.matches("#filterStartDate, #filterEndDate, #filterReason")&&He(e)}),st.addEventListener("click",async t=>{const o=t.target.closest("button[data-action]");if(!o)return;const a=o.dataset.action;if(a==="back-to-professionals")Z("profissionais-section");else if(a==="delete-blockage"){if(await H("Apagar Bloqueio","Tem a certeza que deseja apagar este bloqueio?"))try{await Eo(o.dataset.id),p("Sucesso","Bloqueio removido.","success"),He(e)}catch(s){p("Erro",`Não foi possível remover o bloqueio: ${s.message}`,"error")}}else if(a==="batch-delete-blockage"){const r=JSON.parse(o.dataset.ids);if(await H("Apagar Lote de Bloqueios",`Tem certeza que deseja apagar ${r.length} bloqueios de uma vez?`))try{await Qa(r),p("Sucesso",`${r.length} bloqueios removidos.`,"success"),He(e)}catch(n){p("Erro",`Não foi possível apagar os bloqueios: ${n.message}`,"error")}}})}async function Il(e){const{professionalId:t,professionalName:o}=e;if(!t||!o){st.innerHTML='<p class="text-red-500 p-8">Erro: ID do profissional não fornecido.</p>';return}const a=f(o);st.innerHTML=`
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
        </section>`,El(t),await He(t);const r=document.getElementById("batchProfSelectionContainer");try{const s=await K(m.establishmentId);r.innerHTML=s.map(n=>`
            <div class="flex items-center">
                <input id="prof-batch-${n.id}" value="${n.id}" name="batch-professionals" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                <label for="prof-batch-${n.id}" class="ml-2 text-sm text-gray-700">${f(n.name)}</label>
            </div>`).join("")}catch{r.innerHTML='<p class="text-red-500">Erro ao carregar profissionais.</p>'}}const Cl=e=>I(`/api/users/${e}`),Ll=e=>I("/api/users",{method:"POST",body:JSON.stringify(e)}),Tl=(e,t)=>I(`/api/users/${e}`,{method:"PUT",body:JSON.stringify(t)}),Pl=e=>I(`/api/users/${e}`,{method:"DELETE"}),Bl=(e,t)=>I(`/api/users/${e}/password`,{method:"PUT",body:JSON.stringify({password:t})}),Dl=(e,t)=>I(`/api/users/${e}/status`,{method:"PATCH",body:JSON.stringify({status:t})}),he=document.getElementById("content"),Ml={"agenda-section":"Agenda","comandas-section":"Comandas","relatorios-section":"Relatórios Gerais","sales-report-section":"Relatório de Vendas (Caixa)","financial-section":"Financeiro","servicos-section":"Serviços","produtos-section":"Produtos","suppliers-section":"Fornecedores","profissionais-section":"Profissionais","ausencias-section":"Ausências e Bloqueios","clientes-section":"Clientes","packages-section":"Pacotes","commissions-section":"Comissões","estabelecimento-section":"Configurações do Estabelecimento","users-section":"Usuários e Acessos"},Al={view:"Visualizar",create:"Criar",edit:"Editar"};let Qe=null,Xe=null;function ql(e){const t=document.getElementById("usersListContainer");if(!t)return;const o=document.getElementById("showInactiveUsersToggle")?.checked;if(e.length===0){const a=o?"Nenhum usuário encontrado.":"Nenhum usuário ativo cadastrado.";t.innerHTML=`<p class="col-span-full text-center text-gray-500">${a}</p>`;return}e.sort((a,r)=>(a.status==="active"?-1:1)-(r.status==="active"?-1:1)),t.innerHTML=e.map(a=>{const r=JSON.stringify(a).replace(/'/g,"&apos;"),s=a.status==="active",n=m.professionals.find(c=>c.id===a.professionalId),i=n?n.name:"N/A",l=n?n.name.charAt(0):a.name.charAt(0),d=n?.photo||`https://placehold.co/64x64/E2E8F0/4A5568?text=${encodeURIComponent(l)}`;return`
        <div class="user-card-clickable bg-white rounded-lg shadow-sm border overflow-hidden flex cursor-pointer ${s?"":"opacity-60"}" 
             data-action="edit-user" 
             data-user='${r}'>
            
            <img src="${d}" alt="Foto de Perfil" class="w-16 h-16 object-cover flex-shrink-0 pointer-events-none">
            
            <div class="p-3 flex-grow flex flex-col justify-between">
                
                <div class="pointer-events-none">
                    <p class="font-bold text-gray-800 text-sm truncate">${a.name}</p>
                    <p class="text-xs text-gray-500 truncate">${a.email}</p>
                    <p class="text-xs text-gray-400 mt-1">Prof: <span class="font-semibold text-gray-700">${i}</span></p>
                </div>
                
                <div class="mt-2 flex items-center justify-start gap-2">
                    <label class="flex items-center cursor-pointer" title="${s?"Ativo":"Inativo"}">
                        <div class="relative">
                            <input type="checkbox" data-action="toggle-user-status" data-user-id="${a.id}" class="sr-only" ${s?"checked":""}>
                            <div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full"></div>
                        </div>
                    </label>
                    
                    <button data-action="delete-user" data-user-id="${a.id}" class="text-gray-500 hover:text-red-600 p-2 rounded-full transition-colors action-btn-delete" title="Excluir Usuário">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                </div>
            </div>
        </div>
    `}).join("")}function Lt(){const e=document.getElementById("showInactiveUsersToggle")?.checked;let t;e?t=m.users:t=m.users.filter(o=>o.status==="active"),ql(t)}function Nl(e={}){return Object.entries(Ml).map(([t,o])=>{const a=t==="agenda-section"||t==="comandas-section",r=e[t]?.view_all_prof===!0,s=Object.entries(Al).map(([i,l])=>`
             <label class="flex flex-col items-center space-y-1 cursor-pointer">
                <div class="relative">
                    <input type="checkbox" data-module="${t}" data-permission="${i}" class="sr-only" 
                        ${e[t]?.[i]?"checked":""}>
                    <div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full"></div>
                </div>
                <span class="text-xs text-gray-600">${l}</span>
            </label>
        `).join(""),n=a?`
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
            <h4 class="font-bold text-gray-800 border-b pb-2">${o}</h4>
            <div class="grid grid-cols-3 gap-2">
                ${s}
            </div>
            ${n}
        </div>
    `}).join("")}async function wa(e=null){document.getElementById("user-list-view").classList.add("hidden");const t=document.getElementById("user-form-view");t.classList.remove("hidden");let o=m.professionals;if(!o||o.length===0)try{o=await K(m.establishmentId),m.professionals=o}catch{p("Erro","Não foi possível carregar a lista de profissionais.","error")}const a=k=>o.find(S=>S.id===k),r=(k,S)=>{const E=a(k)?.photo,C=S.charAt(0).toUpperCase();return{photoSrc:E||`https://placehold.co/128x128/E2E8F0/4A5568?text=${C}`,initials:C,photoUrl:E||""}},s=e?.professionalId,n=e?.name||"Novo Usuário",i=r(s,n),l=a(s),d=k=>{let S='<option value="">-- Não Associado a um Profissional --</option>';return S+=o.map(y=>`<option value="${y.id}" ${y.id===k?"selected":""}>${y.name} (${y.specialty||"N/A"})</option>`).join(""),S},c=e!==null;t.querySelector("#userFormTitle").textContent=c?`Editar Usuário: ${e.name}`:"Novo Usuário";const u=t.querySelector("#userForm");u.innerHTML=`
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
                    ${Nl(e?.permissions)}
                </div>
            </div>

            <div class="flex gap-4 pt-6 border-t">
                <button type="button" data-action="back-to-list" class="flex-1 py-3 px-4 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400">Cancelar</button>
                <button type="submit" class="flex-1 py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">Salvar Alterações</button>
            </div>
        </div>
    `;const g=window.innerWidth<768,b=u.querySelector(".bg-white");if(g&&b){b.classList.remove("rounded-xl","shadow-2xl","sm:p-6");const k=u.closest("section");k&&(k.style.padding="0",k.style.margin="0"),b.classList.add("p-4")}const h=u.querySelector("#userProfessionalId"),v=u.querySelector("#userPhotoPreview"),w=u.querySelector("#profPhotoName");if(h.addEventListener("change",k=>{const S=k.target.value,y=a(S),E=y?y.name:"Selecione um profissional",C=r(S,n);v.src=C.photoSrc,w.textContent=E,u.querySelector("#professionalPhotoUrl").value=C.photoUrl}),u.addEventListener("submit",async k=>{k.preventDefault();const S=e?.email,y=u.querySelector("#userEmail").value,E={};u.querySelectorAll('input[type="checkbox"]').forEach(A=>{const T=A.dataset.module,M=A.dataset.permission;E[T]||(E[T]={}),E[T][M]=A.checked});const C=u.querySelector("#userProfessionalId").value||null,D={name:u.querySelector("#userName").value,permissions:E,professionalId:C,establishmentId:m.establishmentId};try{c?(S!==y&&(D.email=y),await Tl(e.id,D),p("Usuário atualizado com sucesso!","success")):(D.email=u.querySelector("#userEmail").value,D.password=u.querySelector("#userPassword").value,await Ll(D),p("Usuário criado com sucesso!","success")),At()}catch(A){p(`Erro: ${A.message}`,"error")}}),c){const k=u.querySelector("#password-change-container"),S=k.querySelector('[data-action="show-password-form"]'),y=k.querySelector("#password-form"),E=y.querySelector('[data-action="save-password"]'),C=y.querySelector('[data-action="cancel-password-change"]');S.addEventListener("click",()=>{S.classList.add("hidden"),y.classList.remove("hidden")}),C.addEventListener("click",()=>{S.classList.remove("hidden"),y.classList.add("hidden"),y.querySelector("#userNewPassword").value=""}),E.addEventListener("click",async()=>{const D=y.querySelector("#userNewPassword").value;if(!D||D.length<6){p("Senha inválida","A nova senha deve ter pelo menos 6 caracteres.","error");return}if(await H("Alterar Senha","Tem a certeza que deseja alterar a senha deste usuário?"))try{E.disabled=!0,E.textContent="Aguarde...",await Bl(e.id,D),p("Sucesso!","A senha do usuário foi alterada.","success"),S.classList.remove("hidden"),y.classList.add("hidden"),y.querySelector("#userNewPassword").value=""}catch(T){p("Erro",`Não foi possível alterar a senha: ${T.message}`,"error")}finally{E.disabled=!1,E.textContent="Salvar Nova Senha"}})}}async function Rl(){const e=document.getElementById("usersListContainer");e.innerHTML='<div class="loader col-span-full mx-auto"></div>';try{const[t,o]=await Promise.all([Cl(m.establishmentId),K(m.establishmentId)]);m.users=t,m.professionals=o,Lt()}catch{p("Erro ao carregar usuários.","error"),e.innerHTML='<p class="col-span-full text-center text-red-500">Não foi possível carregar os usuários.</p>'}}async function At(){he.innerHTML=`
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
    `,Qe&&he.removeEventListener("click",Qe),Xe&&he.removeEventListener("change",Xe),Qe=async e=>{if(!document.getElementById("user-list-view")){he.removeEventListener("click",Qe);return}const t=e.target.closest("[data-action]");if(!t)return;switch(t.dataset.action){case"new-user":wa();break;case"edit-user":const a=JSON.parse(t.dataset.user.replace(/&apos;/g,"'"));wa(a);break;case"back-to-list":At();break;case"delete-user":{e.stopPropagation();const r=t.dataset.userId;if(await H("Excluir Usuário","Tem certeza que deseja excluir este usuário? Esta ação é irreversível."))try{await Pl(r),p("Usuário excluído com sucesso!","success"),At()}catch(n){p(`Erro ao excluir: ${n.message}`,"error")}break}}},Xe=async e=>{if(!document.getElementById("user-list-view")){he.removeEventListener("change",Xe);return}const t=e.target.closest('input[data-action="toggle-user-status"]');if(e.target.id==="showInactiveUsersToggle")Lt();else if(t){e.stopPropagation();const o=t.dataset.userId,a=t.checked?"active":"inactive";try{await Dl(o,a),p(`Usuário ${a==="active"?"ativado":"inativado"} com sucesso.`,"success");const r=m.users.findIndex(s=>s.id===o);r>-1&&(m.users[r].status=a,Lt())}catch(r){p(`Erro ao atualizar status: ${r.message}`,"error"),t.checked=!t.checked,Lt()}}},he.addEventListener("click",Qe),he.addEventListener("change",Xe),await Rl()}const jl=document.getElementById("content");let ka={},ho=null;function Fl(){Object.values(ka).forEach(e=>e?.destroy()),ka={}}function Hl(e,t){if(!window.jspdf){p("Erro","Biblioteca PDF não carregada.","error");return}const{jsPDF:o}=window.jspdf,a=new o({orientation:"landscape",unit:"px",format:"a4"}),r=document.getElementById("salesReportSummaryCards");if(a.setFontSize(18),a.text(e,a.internal.pageSize.getWidth()/2,40,{align:"center"}),r){const n=[["Receita Total",r.querySelector("#summary-revenue").textContent],["Vendas Totais",r.querySelector("#summary-transactions").textContent],["Ticket Médio",r.querySelector("#summary-avg-ticket").textContent]];a.autoTable({startY:60,head:[["Métrica","Valor"]],body:n,theme:"striped",headStyles:{fillColor:[79,70,229]}})}const s=a.lastAutoTable?a.lastAutoTable.finalY+20:60;a.text("Detalhes das Vendas",20,s),a.autoTable({html:`#${t}`,startY:s+10,theme:"grid",headStyles:{fillColor:[22,163,74]}}),a.save(`${e.replace(/[\s/]/g,"_").toLowerCase()}.pdf`)}function Sa(e){const t=document.getElementById("genericModal"),o=f(e.client),a=f(e.items),r=f(e.responsavelCaixa||"N/A"),s=(e.payments||[]).map(n=>`
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
                    <p class="font-semibold text-gray-800">${o}</p>
                </div>
                 <div class="bg-gray-50 p-3 rounded-lg">
                    <p class="text-sm font-medium text-gray-600">Itens</p>
                    <p class="font-semibold text-gray-800">${a}</p>
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
    `,t.style.display="flex"}function Ol(e){const{summary:t,transactions:o}=e;document.getElementById("summary-revenue").textContent=`R$ ${t.totalRevenue.toFixed(2)}`,document.getElementById("summary-transactions").textContent=t.totalTransactions,document.getElementById("summary-avg-ticket").textContent=`R$ ${t.averageTicket.toFixed(2)}`;const a=document.getElementById("paymentSummaryTableBody"),r=Object.entries(t.paymentMethodTotals).sort(([,i],[,l])=>l-i);a.innerHTML=r.map(([i,l])=>`
        <tr class="border-b">
            <td class="py-2 px-4 font-medium">${f(i.charAt(0).toUpperCase()+i.slice(1))}</td>
            <td class="py-2 px-4 text-right font-semibold">R$ ${l.toFixed(2)}</td>
        </tr>
    `).join("");const s=document.getElementById("transactionsTableBody"),n=document.getElementById("mobileTransactionsList");if(o.length===0){const i='<tr><td colspan="5" class="text-center py-8 text-gray-500">Nenhuma venda encontrada para o período selecionado.</td></tr>';s.innerHTML=i,n.innerHTML='<div class="text-center py-8 text-gray-500">Nenhuma venda encontrada.</div>';return}s.innerHTML=o.map((i,l)=>{const d=f(i.client),c=f(i.items),u=f(i.type);return`
        <tr class="border-b hover:bg-gray-50 cursor-pointer" data-transaction-index="${l}">
            <td class="w-24 py-3 px-4">${new Date(i.date).toLocaleString("pt-BR",{dateStyle:"short",timeStyle:"short"})}</td>
            <td class="w-40 py-3 px-4 truncate max-w-[150px]">${d}</td>
            <td class="w-auto py-3 px-4 truncate max-w-[200px]">${c}</td>
            <td class="w-16 py-3 px-4 text-center text-xs">${u}</td>
            <td class="w-24 py-3 px-4 text-right font-medium">R$ ${i.total.toFixed(2)}</td>
        </tr>
    `}).join(""),s.querySelectorAll("tr").forEach(i=>{i.addEventListener("dblclick",()=>{const l=i.dataset.transactionIndex,d=ho.transactions[l];d&&Sa(d)})}),n.innerHTML=o.map((i,l)=>{const d=f(i.client),c=f(i.items),u=f(i.type);return`
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
    `}).join(""),n.querySelectorAll("div[data-transaction-index]").forEach(i=>{i.addEventListener("click",()=>{const l=i.dataset.transactionIndex,d=ho.transactions[l];d&&Sa(d)})})}async function $a(){const e=document.getElementById("main-reports-view"),t=document.getElementById("reportStartDate"),o=document.getElementById("reportEndDate");if(!e||!t||!o)return;const a=t.value,r=o.value;if(!a||!r)return p("Atenção","Por favor, selecione as datas de início e fim.","error");e.innerHTML='<div class="p-8 text-center"><div class="loader mx-auto"></div><p class="mt-4">A gerar relatório...</p></div>';try{const s=document.getElementById("cashierSessionFilter").value,n=await Fr({establishmentId:m.establishmentId,startDate:a,endDate:r,cashierSessionId:s});ho=n,e.innerHTML=`
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
        `,Ol(n)}catch(s){p("Erro",`Não foi possível carregar o relatório: ${s.message}`,"error"),e.innerHTML=`<p class="p-8 text-center text-red-500">${f(s.message)}</p>`}}async function zl(){Fl();const e=new Date().toISOString().split("T")[0],t=new Date;t.setDate(t.getDate()-30);const o=t.toISOString().split("T")[0];jl.innerHTML=`
        <section class="pb-20 md:pb-0"> <div class="flex flex-col gap-4 mb-6">
                <h2 class="text-2xl md:text-3xl font-bold text-gray-800 px-2 md:px-0">Relatório de Vendas</h2>
                
                <div class="w-full bg-white p-4 rounded-lg shadow-md space-y-4">
                    <div class="grid grid-cols-2 gap-3 md:flex md:items-center md:gap-4">
                        <div class="flex-1">
                            <label for="reportStartDate" class="block text-xs font-medium text-gray-500 mb-1">De:</label>
                            <input type="date" id="reportStartDate" value="${o}" class="w-full p-2 border rounded-md text-sm">
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
        </section>`,document.getElementById("generateReportBtn").addEventListener("click",$a),document.getElementById("exportPdfBtn").addEventListener("click",()=>{const a=document.getElementById("reportStartDate").value,r=document.getElementById("reportEndDate").value,s=`Relatorio_Vendas_${a}_a_${r}`;Hl(s,"transactionsTable")});try{const a=await fn(m.establishmentId),r=document.getElementById("cashierSessionFilter");a&&a.length>0&&a.forEach(s=>{const n=new Date(s.openTime).toLocaleString("pt-BR",{dateStyle:"short"}),i=f(s.closedByName||"N/A");r.innerHTML+=`<option value="${s.id}">${i} - ${n}</option>`})}catch{p("Erro","Não foi possível carregar o histórico de caixas para o filtro.","error")}await $a()}const Vl=document.getElementById("content");let B={payables:[],receivables:[],natures:[],costCenters:[],currentTab:"payables",statusFilter:"pending",startDate:new Date(new Date().getFullYear(),new Date().getMonth(),1).toISOString().split("T")[0],endDate:new Date().toISOString().split("T")[0],filterNaturezaId:"all",filterCostCenterId:"all",isFilterOpen:!1,selectedIds:new Set,isSelectionMode:!1},ht=null,xt=null;function Ho(e){const t=new Map,o=[];return e&&(e.forEach(a=>t.set(a.id,{...a,children:[]})),t.forEach(a=>{a.parentId&&t.has(a.parentId)?t.get(a.parentId).children.push(a):o.push(a)})),o}function Ts(e){if(!e)return{day:"--",month:"---"};const t=new Date(e+"T00:00:00"),o=t.getDate().toString().padStart(2,"0"),a=t.toLocaleString("pt-BR",{month:"short"}).toUpperCase().replace(".","");return{day:o,month:a,full:t.toLocaleDateString("pt-BR")}}function ie(e){return new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(e)}function Ul(e,t,o){if(!e)return;if(!t||t.length===0){e.innerHTML='<p class="text-center text-gray-400 text-sm py-4">Nenhum item criado.</p>';return}const a=(r,s=0)=>`
            <div class="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-100 mb-1" style="margin-left: ${s*16}px;">
                <span class="text-sm font-medium text-gray-700">${r.name}</span>
                <button data-action="delete-${o}" data-id="${r.id}" class="text-red-400 hover:text-red-600 text-xs font-semibold px-2 py-1 bg-red-50 rounded hover:bg-red-100 transition-colors">
                    Excluir
                </button>
            </div>
            ${r.children.map(i=>a(i,s+1)).join("")}
        `;e.innerHTML=t.map(r=>a(r)).join("")}async function xo(e){const t=document.getElementById("genericModal"),o=e==="nature",a=o?"Naturezas Financeiras":"Centros de Custo",r=o?Bo:Do,s=o?Rn:Fn,n=o?"natures":"costCenters";t.innerHTML=`
        <div class="modal-content max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden">
            <div class="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <h2 class="text-lg font-bold text-gray-800">Gerir ${a}</h2>
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
        </div>`,t.style.display="flex";const i=t.querySelector("#hierarchyList"),l=t.querySelector("#itemParent"),d=u=>{const g=Ho(u);Ul(i,g,e);const b=l.value;l.innerHTML='<option value="">-- Categoria Principal --</option>';const h=(v,w=0)=>{const k="  ".repeat(w)+(w>0?"↳ ":"");l.innerHTML+=`<option value="${v.id}">${k}${v.name}</option>`,v.children.forEach(S=>h(S,w+1))};g.forEach(v=>h(v)),l.value=b};try{const u=await r(m.establishmentId);B[n]=u,d(u)}catch(u){console.error(u)}const c=t.querySelector("#hierarchyForm");c.addEventListener("submit",async u=>{u.preventDefault();const g=t.querySelector("#itemName").value,b=l.value;try{await s({name:g,parentId:b||null,establishmentId:m.establishmentId});const h=await r(m.establishmentId);B[n]=h,d(h),c.reset(),await Ee(),p("Sucesso","Item adicionado.","success")}catch(h){p("Erro",h.message,"error")}})}async function _l(){Wl(),Jl(),await Ee()}function Wl(){Vl.innerHTML=`
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
    `}function Jl(){document.getElementById("select-all-toggle").addEventListener("change",o=>{const a=o.target.checked,r=document.querySelectorAll(".item-checkbox");B.selectedIds.clear(),r.forEach(s=>{s.checked=a,a&&B.selectedIds.add(s.dataset.id)}),Ae()}),document.getElementById("cancel-selection-btn").addEventListener("click",()=>{B.selectedIds.clear(),document.getElementById("select-all-toggle").checked=!1,document.querySelectorAll(".item-checkbox").forEach(o=>o.checked=!1),Ae()}),document.getElementById("batch-delete-btn").addEventListener("click",async()=>{const o=B.selectedIds.size;if(o===0)return;if(await H("Excluir Selecionados",`Tem certeza que deseja excluir ${o} itens? Esta ação não pode ser desfeita.`))try{const r=B.currentTab==="payables"?"payables":"receivables";await gs(r,Array.from(B.selectedIds)),p("Sucesso",`${o} itens excluídos.`,"success"),B.selectedIds.clear(),Ae(),Ee()}catch(r){p("Erro","Falha ao excluir itens.","error"),console.error(r)}}),document.getElementById("toggle-filter-btn").addEventListener("click",()=>{const o=document.getElementById("filter-panel"),a=document.getElementById("toggle-filter-btn");B.isFilterOpen=!B.isFilterOpen,B.isFilterOpen?(o.classList.remove("hidden"),a.classList.add("bg-indigo-100","text-indigo-600")):(o.classList.add("hidden"),a.classList.remove("bg-indigo-100","text-indigo-600"))}),document.getElementById("settings-btn").addEventListener("click",ed),document.getElementById("fab-add").addEventListener("click",()=>{const o=B.currentTab==="payables"?"payable":"receivable";oo(o)});const e=document.getElementById("tab-receivables"),t=document.getElementById("tab-payables");e.addEventListener("click",()=>Ea("receivables")),t.addEventListener("click",()=>Ea("payables")),document.querySelectorAll(".status-filter-btn").forEach(o=>{o.addEventListener("click",a=>{document.querySelectorAll(".status-filter-btn").forEach(r=>{r.classList.remove("bg-indigo-100","text-indigo-700"),r.classList.add("text-gray-500")}),a.target.classList.add("bg-indigo-100","text-indigo-700"),a.target.classList.remove("text-gray-500"),B.statusFilter=a.target.dataset.status})}),document.getElementById("apply-filter-btn").addEventListener("click",()=>{B.startDate=document.getElementById("filterStartDate").value,B.endDate=document.getElementById("filterEndDate").value,B.filterNaturezaId=document.getElementById("filterNaturezaId").value,B.filterCostCenterId=document.getElementById("filterCostCenterId").value,document.getElementById("toggle-filter-btn").click(),Ee()}),ht&&document.body.removeEventListener("click",ht),ht=o=>{const a=o.target;if(a.classList.contains("item-checkbox")){const n=a.dataset.id;a.checked?B.selectedIds.add(n):B.selectedIds.delete(n),Ae(),o.stopPropagation();return}const r=a.closest("button[data-action]");if(r){const{action:n,type:i,id:l}=r.dataset;if(o.stopPropagation(),n==="delete"){const d=r.closest(".financial-card-item").dataset.item.replace(/&apos;/g,"'"),c=JSON.parse(d);Xl(i,c);return}if(n==="mark-as-paid"){Ql(i,l);return}if(n==="manage-natures"){xo("nature");return}if(n==="manage-cost-centers"){xo("cost-center");return}if(n==="edit"){const d=JSON.parse(r.dataset.item.replace(/&apos;/g,"'"));oo(i,d);return}}const s=a.closest(".financial-card-item");if(s&&document.getElementById("list-container").contains(s)&&!a.closest(".checkbox-wrapper")){const{type:n}=s.dataset,i=JSON.parse(s.dataset.item.replace(/&apos;/g,"'"));oo(n,i)}},document.body.addEventListener("click",ht),xt&&document.getElementById("genericModal").removeEventListener("click",xt),xt=o=>{if(o.target.closest('[data-action="close-modal"]')){document.getElementById("genericModal").style.display="none";return}const r=o.target.closest('button[data-action^="delete-"]');if(r){const s=r.dataset.action.split("-")[1];Kl(s,r.dataset.id)}},document.getElementById("genericModal").addEventListener("click",xt)}function Ae(){const e=document.getElementById("batch-action-bar"),t=document.getElementById("selected-count"),o=document.getElementById("fab-add"),a=B.selectedIds.size;t.textContent=a,a>0?(e.classList.remove("hidden"),o.classList.add("hidden")):(e.classList.add("hidden"),o.classList.remove("hidden"))}function Ea(e){B.currentTab=e,B.selectedIds.clear(),Ae();const t=document.getElementById("tab-receivables"),o=document.getElementById("tab-payables"),a=document.getElementById("fab-add");e==="receivables"?(t.classList.add("bg-white","text-green-700","shadow-sm"),t.classList.remove("text-gray-500"),o.classList.remove("bg-white","text-red-700","shadow-sm"),o.classList.add("text-gray-500"),a.className="fixed bottom-6 right-6 w-14 h-14 bg-green-600 text-white rounded-full shadow-xl flex items-center justify-center hover:bg-green-700 hover:scale-105 transition-all z-40"):(o.classList.add("bg-white","text-red-700","shadow-sm"),o.classList.remove("text-gray-500"),t.classList.remove("bg-white","text-green-700","shadow-sm"),t.classList.add("text-gray-500"),a.className="fixed bottom-6 right-6 w-14 h-14 bg-red-600 text-white rounded-full shadow-xl flex items-center justify-center hover:bg-red-700 hover:scale-105 transition-all z-40"),Ps()}async function Ee(){const e=document.getElementById("list-container");e.innerHTML='<div class="loader mx-auto my-10"></div>';try{if(B.natures.length===0){const[r,s]=await Promise.all([Bo(m.establishmentId),Do(m.establishmentId)]);B.natures=r,B.costCenters=s,Gl()}const t={startDate:B.startDate,endDate:B.endDate,establishmentId:m.establishmentId};B.filterNaturezaId!=="all"&&(t.natureId=B.filterNaturezaId),B.filterCostCenterId!=="all"&&(t.costCenterId=B.filterCostCenterId);const[o,a]=await Promise.all([zn(t),Jn(t)]);B.payables=o.entries||[],B.receivables=a.entries||[],Yl(),Ps()}catch(t){e.innerHTML=`<p class="text-center text-red-500 mt-10">Erro ao carregar: ${t.message}</p>`}}function Gl(){const e=a=>{let r='<option value="all">Todas</option>';const s=Ho(a),n=(i,l=0)=>{const d="  ".repeat(l)+(l>0?"↳ ":"");r+=`<option value="${i.id}">${d}${i.name}</option>`,i.children.forEach(c=>n(c,l+1))};return s.forEach(i=>n(i)),r},t=document.getElementById("filterNaturezaId"),o=document.getElementById("filterCostCenterId");t&&(t.innerHTML=e(B.natures)),o&&(o.innerHTML=e(B.costCenters)),t&&(t.value=B.filterNaturezaId),o&&(o.value=B.filterCostCenterId)}function Yl(){const e=document.getElementById("summary-section");if(!e)return;const t=B.receivables.reduce((l,d)=>l+d.amount,0),o=B.receivables.filter(l=>l.status==="paid").reduce((l,d)=>l+d.amount,0),a=t-o,r=B.payables.reduce((l,d)=>l+d.amount,0),s=B.payables.filter(l=>l.status==="paid").reduce((l,d)=>l+d.amount,0),n=r-s,i=o-s;e.innerHTML=`
        <div class="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 col-span-2 md:col-span-1">
            <p class="text-[10px] text-gray-400 font-bold uppercase tracking-wider">A Receber</p>
            <p class="text-xl font-bold text-green-600">${ie(a)}</p>
        </div>
        <div class="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 col-span-2 md:col-span-1">
            <p class="text-[10px] text-gray-400 font-bold uppercase tracking-wider">A Pagar</p>
            <p class="text-xl font-bold text-red-500">${ie(n)}</p>
        </div>
        <div class="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 col-span-2 md:col-span-1">
            <p class="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Realizado</p>
            <p class="text-xl font-bold ${i>=0?"text-indigo-600":"text-orange-500"}">${ie(i)}</p>
        </div>
    `}function Ps(){const e=document.getElementById("list-container");if(!e)return;const t=B.currentTab==="receivables",o=t?B.receivables:B.payables;let a=o;if(B.statusFilter!=="all"&&(a=o.filter(n=>n.status===B.statusFilter)),a.sort((n,i)=>new Date(n.dueDate)-new Date(i.dueDate)),a.length===0){e.innerHTML=`
            <div class="flex flex-col items-center justify-center py-12 text-gray-400 opacity-60">
                <svg class="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                <p>Nenhum lançamento encontrado.</p>
            </div>
        `;return}const r=new Map(B.natures.map(n=>[n.id,n.name])),s=t?"receivable":"payable";e.innerHTML=a.map(n=>{const i=Ts(n.dueDate),l=n.status==="paid",d=l?"text-gray-400":t?"text-green-600":"text-red-500",c=n.naturezaId&&r.get(n.naturezaId)||"Geral",u=JSON.stringify(n).replace(/'/g,"&apos;"),g=B.selectedIds.has(n.id),h=!!n.recurrenceId?'<span class="ml-1 text-gray-400"><svg class="w-3 h-3 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg></span>':"";return`
        <div class="financial-card-item w-full max-w-full bg-white p-3 rounded-xl shadow-sm border ${g?"border-indigo-400 bg-indigo-50":"border-gray-100"} flex items-start gap-3 relative overflow-hidden cursor-pointer hover:shadow-md transition-all active:scale-[0.99]"
             data-type="${s}"
             data-item='${u}'>
            
            <div class="absolute left-0 top-0 bottom-0 w-1 ${l?"bg-gray-300":t?"bg-green-500":"bg-red-500"}"></div>

            <div class="checkbox-wrapper pt-3 pl-1">
                <input type="checkbox" class="item-checkbox w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer" data-id="${n.id}" ${g?"checked":""}>
            </div>

            <div class="flex-shrink-0 flex flex-col items-center justify-center bg-gray-50 rounded-lg w-12 h-12 border border-gray-100 mt-0.5">
                <span class="text-base font-bold text-gray-800 leading-none">${i.day}</span>
                <span class="text-[9px] font-bold text-gray-400 uppercase leading-none mt-0.5">${i.month}</span>
            </div>

            <div class="flex-1 min-w-0 flex flex-col justify-start">
                <h3 class="font-bold text-gray-800 text-sm break-words whitespace-normal pr-1 leading-snug ${l?"line-through text-gray-400":""}">
                    ${n.description}
                </h3>
                <div class="flex items-center gap-1.5 mt-1 flex-wrap">
                    <span class="text-[10px] px-1.5 py-0.5 rounded-md bg-indigo-50 text-indigo-600 font-medium break-all flex items-center">
                        ${c} ${h}
                    </span>
                    ${l?'<span class="text-[10px] px-1.5 py-0.5 rounded-md bg-gray-100 text-gray-500 font-medium whitespace-nowrap">Baixado</span>':""}
                </div>
            </div>

            <div class="flex-shrink-0 text-right pl-1 flex flex-col items-end">
                <p class="font-bold text-sm ${d} whitespace-nowrap">${ie(n.amount)}</p>
                
                <div class="flex justify-end gap-3 mt-2">
                    ${l?"":`
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
        `}).join("")}async function Ql(e,t){const o=new Date().toISOString().split("T")[0];try{await(e==="payable"?_n(t,o):Qn(t,o)),p("Sucesso","Lançamento baixado!","success"),await Ee()}catch(a){p("Erro",a.message,"error")}}async function Xl(e,t){if(!!!t.recurrenceId){await H("Excluir Lançamento","Tem certeza? Essa ação não pode ser desfeita.")&&await Bs(e,[t.id]);return}Zl(e,t)}function Zl(e,t){const o=document.getElementById("genericModal"),r=(e==="payable"?B.payables:B.receivables).filter(d=>d.recurrenceId===t.recurrenceId);r.sort((d,c)=>new Date(d.dueDate)-new Date(c.dueDate)),o.innerHTML=`
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
                ${r.map(d=>{const c=d.id===t.id,u=d.status==="paid",g=Ts(d.dueDate);return`
                    <label class="flex items-center gap-3 p-3 bg-white rounded-xl border ${c?"border-red-300 ring-1 ring-red-100":"border-gray-200"} hover:border-red-300 cursor-pointer transition-all group">
                        <input type="checkbox" class="modal-item-checkbox w-5 h-5 rounded border-gray-300 text-red-600 focus:ring-red-500" value="${d.id}" ${c?"checked":""}>
                        
                        <div class="flex-shrink-0 w-10 h-10 bg-gray-50 rounded-lg flex flex-col items-center justify-center border border-gray-100">
                            <span class="text-xs font-bold text-gray-700">${g.day}</span>
                            <span class="text-[8px] font-bold text-gray-400 uppercase">${g.month}</span>
                        </div>

                        <div class="flex-1 min-w-0">
                            <p class="text-sm font-semibold text-gray-800 truncate">${d.description}</p>
                            <p class="text-xs text-gray-500">${ie(d.amount)} ${u?'<span class="text-green-600 font-bold ml-1">(Pago)</span>':'<span class="text-orange-500 ml-1">(Pendente)</span>'}</p>
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
    `,o.style.display="flex";const s=o.querySelector("#modal-select-all"),n=o.querySelectorAll(".modal-item-checkbox"),i=o.querySelector("#confirm-batch-delete");s.addEventListener("change",d=>{n.forEach(c=>c.checked=d.target.checked),l()}),n.forEach(d=>{d.addEventListener("change",l)});function l(){const d=Array.from(n).filter(c=>c.checked).length;i.textContent=d>0?`Excluir ${d} Item(ns)`:"Selecione itens para excluir",i.disabled=d===0,d===0?i.classList.add("opacity-50","cursor-not-allowed"):i.classList.remove("opacity-50","cursor-not-allowed")}i.addEventListener("click",async()=>{const d=Array.from(n).filter(u=>u.checked).map(u=>u.value);if(d.length===0)return;o.style.display="none",await H("Confirmar Exclusão",`Tem certeza que deseja apagar ${d.length} itens definitivamente?`)&&await Bs(e,d)}),l()}async function Bs(e,t){try{t.length===1?e==="payable"?await Un(t[0]):await Yn(t[0]):await gs(e==="payable"?"payables":"receivables",t),p("Sucesso",`${t.length} item(ns) excluído(s).`,"success"),B.selectedIds.clear(),Ae(),await Ee()}catch(o){p("Erro",o.message,"error")}}async function Kl(e,t){const a=e==="nature"?jn:Hn;if(await H("Apagar Item","Tem a certeza? Apagar um item principal também apagará os seus sub-itens."))try{await a(t),xo(e==="nature"?"nature":"cost-center")}catch(s){p("Erro",s.message,"error")}}function ed(){const e=document.getElementById("genericModal");e.innerHTML=`
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
    `,e.style.display="flex"}function oo(e,t=null){const o=document.getElementById("genericModal"),a=e==="payable",r=a?"red":"green",s=t?`Editar ${a?"Despesa":"Receita"}`:`Nova ${a?"Despesa":"Receita"}`,n=(S,y)=>{let E='<option value="">-- Selecione --</option>';const C=Ho(S),D=(A,T=0)=>{const M="  ".repeat(T)+(T>0?"↳ ":""),R=A.id===y?"selected":"";E+=`<option value="${A.id}" ${R}>${M}${A.name}</option>`,A.children.forEach(F=>D(F,T+1))};return C.forEach(A=>D(A)),E};o.innerHTML=`
        <div class="modal-content max-w-xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden m-4 flex flex-col max-h-[90vh]">
            
            <div class="bg-${r}-50 px-6 py-4 border-b border-${r}-100 flex justify-between items-center flex-shrink-0">
                <div class="flex items-center gap-3">
                    <div class="p-2 bg-white rounded-lg text-${r}-600 shadow-sm">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${a?"M19 14l-7 7m0 0l-7-7m7 7V3":"M5 10l7-7m0 0l7 7m-7-7v18"}"/></svg>
                    </div>
                    <div>
                        <h2 class="text-xl font-bold text-gray-800">${s}</h2>
                        <p class="text-xs text-gray-500">${a?"Registre suas saídas":"Registre suas entradas"}</p>
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
                            <span class="text-sm font-bold text-gray-600 group-hover:text-gray-800 transition-colors">Marcar como ${a?"Pago":"Recebido"}</span>
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
        </div>`,o.style.display="flex";const i=o.querySelector("#financial-form");let l="single",d=2;const c=i.querySelector('[name="amount"]'),u=i.querySelector("#recurrence-options"),g=i.querySelector("#recurrence-summary"),b=i.querySelector("#installments-input"),h=i.querySelector("#status-toggle"),v=i.querySelector("#payment-date-wrapper"),w=i.querySelector('[name="paymentDate"]'),k=()=>{if(l==="single")return;const S=parseFloat(c.value)||0;if(d=parseInt(b.value)||2,S===0){g.innerHTML="Digite um valor para ver a simulação.";return}if(l==="installment"){const y=S/d;g.innerHTML=`
                <span class="block text-xs text-gray-500 uppercase">Resumo do Parcelamento</span>
                <span class="font-bold block">${d}x de ${ie(y)}</span>
                <span class="text-xs text-gray-400">Total: ${ie(S)}</span>
            `}else if(l==="repeat"){const y=S*d;g.innerHTML=`
                <span class="block text-xs text-gray-500 uppercase">Resumo da Recorrência</span>
                <span class="font-bold block">${d}x de ${ie(S)}</span>
                <span class="text-xs text-gray-400">Total Gerado: ${ie(y)}</span>
            `}};t||(o.querySelectorAll(".mode-btn").forEach(S=>{S.addEventListener("click",y=>{if(o.querySelectorAll(".mode-btn").forEach(E=>{E.classList.remove("bg-white","text-gray-800","shadow-sm","font-semibold"),E.classList.add("text-gray-500","font-medium")}),y.target.classList.add("bg-white","text-gray-800","shadow-sm","font-semibold"),y.target.classList.remove("text-gray-500","font-medium"),l=y.target.dataset.mode,l==="single")u.classList.add("hidden");else{u.classList.remove("hidden");const E=u.querySelector("label");E.textContent=l==="installment"?"Número de Parcelas":"Repetir por quantos meses?",k()}})}),o.querySelector('[data-mode="single"]').click()),c.addEventListener("input",k),b&&(b.addEventListener("input",k),i.querySelector("#btn-minus").addEventListener("click",()=>{let S=parseInt(b.value)||2;S>2&&(b.value=S-1,k())}),i.querySelector("#btn-plus").addEventListener("click",()=>{let S=parseInt(b.value)||2;S<60&&(b.value=S+1,k())})),h.addEventListener("change",()=>{h.checked?(v.classList.remove("hidden"),w.required=!0):(v.classList.add("hidden"),w.required=!1)}),i.addEventListener("submit",async S=>{S.preventDefault();const y=new FormData(i),E=h.checked,C=parseFloat(y.get("amount"));let D=C,A=1;!t&&l!=="single"?(A=parseInt(y.get("installments")),l==="repeat"&&(D=C*A)):A=1;const T={description:y.get("description"),amount:D,dueDate:y.get("dueDate"),naturezaId:y.get("naturezaId")||null,centroDeCustoId:y.get("centroDeCustoId")||null,notes:y.get("notes"),status:E?"paid":"pending",paymentDate:E?y.get("paymentDate"):null,establishmentId:m.establishmentId,installments:A};A>1&&!t&&(T.recurrenceId=self.crypto.randomUUID());try{t?(await(a?Vn(t.id,T):Gn(t.id,T)),p("Sucesso","Atualizado com sucesso!","success")):(await(a?On(T):Wn(T)),p("Sucesso","Lançamento criado!","success")),document.getElementById("genericModal").style.display="none",Ee()}catch(M){console.error(M),p("Erro",M.message||"Erro ao salvar","error")}})}const td=e=>I("/api/commissions/calculate",{method:"POST",body:JSON.stringify(e)}),od=e=>I("/api/commissions/save",{method:"POST",body:JSON.stringify(e)}),ad=(e,t)=>{const o=new URLSearchParams({startDate:e,endDate:t}).toString();return I(`/api/commissions/stats?${o}`)},sd=(e={})=>{Object.keys(e).forEach(a=>(e[a]===void 0||e[a]===null||e[a]==="")&&delete e[a]);const t=new URLSearchParams(e).toString(),o=`/api/commissions/history${t?"?"+t:""}`;return I(o)},rd=e=>I(`/api/commissions/report/${e}`,{method:"DELETE"}),qt=new Date,Ia=new Date(qt.getFullYear(),qt.getMonth(),1),N={currentTab:"dashboard",professionals:[],calculationResult:null,historyData:[],periodString:"",dashStartDate:Ia.toISOString().split("T")[0],dashEndDate:qt.toISOString().split("T")[0],dashStats:{revenue:0,commissions:0},histStartDate:Ia.toISOString().split("T")[0],histEndDate:qt.toISOString().split("T")[0],histProfessionalId:"all"};let yt=null;const Ze=document.getElementById("content");async function nd(){try{N.professionals=await K(m.establishmentId)}catch(e){console.error("Erro profissionais",e)}vd(),id(),Qt(),Rt("dashboard")}function id(){yt&&Ze.removeEventListener("click",yt),yt=e=>{const t=e.target.closest("button");if(!t)return;const o=t.dataset.action,a=t.dataset.id,r=t.dataset.idx;switch(o){case"tab-nav":Rt(t.dataset.tab);break;case"toggle-all-profs":ld();break;case"back-to-filters":N.calculationResult=null,Nt(document.getElementById("commissions-content"));break;case"view-preview-items":fd(r);break;case"save-final-report":cd();break;case"start-new-calc":Rt("calculator");break;case"print-receipt":ud(a);break;case"delete-report":md(a);break;case"filter-dashboard":Qt();break;case"filter-history":Oo();break}},Ze.addEventListener("click",yt),Ze.oninput=e=>{if(e.target.classList.contains("input-debit")||e.target.classList.contains("input-credit")){const t=e.target.dataset.idx;gd(t)}},Ze.onsubmit=e=>{e.target.id==="calc-form"&&(e.preventDefault(),dd())}}async function Qt(){const e=document.getElementById("dash-start"),t=document.getElementById("dash-end");e&&(N.dashStartDate=e.value),t&&(N.dashEndDate=t.value);const o=document.getElementById("dashboard-stats-container");o&&(o.innerHTML='<div class="flex justify-center py-10"><div class="loader"></div></div>');try{const a=await ad(N.dashStartDate,N.dashEndDate);N.dashStats={revenue:a.totalRevenue||0,commissions:a.totalCommissionsPaid||0},N.currentTab==="dashboard"&&Ds(document.getElementById("commissions-content"))}catch(a){console.error(a),o&&(o.innerHTML='<p class="text-red-500 text-center">Erro ao carregar dados.</p>')}}async function Oo(){const e=document.getElementById("hist-start"),t=document.getElementById("hist-end"),o=document.getElementById("hist-prof");e&&(N.histStartDate=e.value),t&&(N.histEndDate=t.value),o&&(N.histProfessionalId=o.value);const a=document.getElementById("history-list-container");if(a){a.innerHTML='<div class="flex justify-center py-10"><div class="loader"></div></div>';try{const r=await sd({startDate:N.histStartDate,endDate:N.histEndDate,professionalId:N.histProfessionalId});N.historyData=r,Ms(a,r)}catch{a.innerHTML='<p class="text-red-500 text-center py-4">Erro ao buscar registros.</p>'}}}function ld(){const e=document.querySelectorAll(".prof-checkbox"),t=Array.from(e).every(o=>o.checked);e.forEach(o=>o.checked=!t)}async function dd(){const e=Array.from(document.querySelectorAll(".prof-checkbox:checked")).map(s=>s.value);if(e.length===0)return p("Atenção","Selecione profissionais","error");const t={professionalIds:e,startDate:document.getElementById("start-date").value,endDate:document.getElementById("end-date").value,calculationTypes:{services:document.getElementById("type-services").checked,products:document.getElementById("type-products").checked,packages:document.getElementById("type-packages").checked}},o=new Date(t.startDate+"T00:00:00").toLocaleDateString("pt-BR"),a=new Date(t.endDate+"T00:00:00").toLocaleDateString("pt-BR");N.periodString=`${o} a ${a}`;const r=document.getElementById("commissions-content");r.innerHTML='<div class="flex flex-col items-center justify-center py-20"><div class="loader mb-4"></div><p class="text-gray-500 animate-pulse">Calculando...</p></div>';try{const s=await td(t);N.calculationResult=s.map(n=>({...n,extraDebit:0,extraCredit:0,finalValue:n.summary.totalCommission,notes:""})),Nt(r)}catch(s){p("Erro",s.message,"error"),N.calculationResult=null,Nt(r)}}async function cd(){const e=N.calculationResult.length;if(await H("Confirmar",`Gerar ${e} relatórios? Isso marcará as vendas como pagas.`))try{const o=N.calculationResult.map(a=>{const r=a.items.map(s=>s.originalSaleId).filter(s=>s!=null);return od({professionalId:a.professionalId,professionalName:a.professionalName,period:N.periodString,processedSalesIds:r,reportData:{...a,summary:{...a.summary,finalValue:a.finalValue,extraDebit:a.extraDebit||0,extraCredit:a.extraCredit||0,notes:a.notes||""}}})});await Promise.all(o),p("Sucesso","Pagamentos registrados!","success"),N.calculationResult=null,Qt(),Rt("history")}catch(o){p("Erro",o.message,"error")}}function ud(e){const t=N.historyData.find(o=>o.id===e);t&&pd(t)}async function md(e){if(await H("Excluir","Deseja remover este registro? As vendas voltarão a ficar disponíveis para cálculo."))try{await rd(e),p("Sucesso","Registro removido.","success"),Oo(),Qt()}catch(o){p("Erro",o.message,"error")}}function pd(e){const{jsPDF:t}=window.jspdf;if(!t)return p("Erro","PDF lib não carregada.","error");const o=new t,a=o.internal.pageSize.getWidth()/2;o.setFontSize(18),o.setFont(void 0,"bold"),o.text("RECIBO DE PAGAMENTO DE COMISSÃO",a,20,{align:"center"}),o.setFontSize(12),o.setFont(void 0,"normal"),o.text(`Profissional: ${e.professionalName}`,15,40),o.text(`Período: ${e.period}`,15,48);const r=[["Comissão Bruta",`R$ ${e.summary.totalCommission.toFixed(2)}`]];e.summary.extraCredit>0&&r.push(["(+) Bônus",`R$ ${e.summary.extraCredit.toFixed(2)}`]),e.summary.extraDebit>0&&r.push(["(-) Descontos",`R$ ${e.summary.extraDebit.toFixed(2)}`]),o.autoTable({startY:60,head:[["Descrição","Valor"]],body:r,theme:"grid"});const s=o.lastAutoTable.finalY+10;o.setFontSize(14),o.setFont(void 0,"bold"),o.text(`Total Líquido: R$ ${(e.summary.finalValue||e.summary.totalCommission).toFixed(2)}`,190,s,{align:"right"}),o.save(`Recibo_${e.professionalName}.pdf`)}function gd(e){const t=document.querySelectorAll(`.input-debit[data-idx="${e}"]`),o=document.querySelectorAll(`.input-credit[data-idx="${e}"]`);let a=0,r=0;if(t.forEach(s=>{s.value&&(a=parseFloat(s.value))}),o.forEach(s=>{s.value&&(r=parseFloat(s.value))}),N.calculationResult&&N.calculationResult[e]){const s=N.calculationResult[e];s.extraDebit=a,s.extraCredit=r,s.finalValue=s.summary.totalCommission-a+r,t.forEach(i=>{i!==document.activeElement&&(i.value=a||"")}),o.forEach(i=>{i!==document.activeElement&&(i.value=r||"")}),document.querySelectorAll(`.final-value-display[data-idx="${e}"]`).forEach(i=>i.innerText=`R$ ${s.finalValue.toFixed(2)}`),bd()}}function bd(){const e=N.calculationResult.reduce((o,a)=>o+a.finalValue,0);document.querySelectorAll("#grand-total-display").forEach(o=>o.innerText=`R$ ${e.toFixed(2)}`)}function fd(e){const t=N.calculationResult[e];if(!t)return;const o=t.items.map(a=>`
        <div class="flex justify-between items-center p-3 border-b border-gray-100 last:border-0 hover:bg-gray-50">
            <div class="flex-1">
                <p class="text-sm font-bold text-gray-800">${a.item}</p>
                <p class="text-xs text-gray-500">${new Date(a.date).toLocaleDateString("pt-BR")} • ${a.client}</p>
            </div>
            <div class="text-right">
                <p class="text-sm font-bold text-green-600">R$ ${a.commissionValue.toFixed(2)}</p>
                <p class="text-xs text-gray-400">${a.commissionRate}% de R$ ${a.value.toFixed(2)}</p>
            </div>
        </div>
    `).join("");Y({title:"Detalhes da Comissão",contentHTML:`<div class="bg-gray-50 p-3 rounded-lg mb-4 flex justify-between items-center"><div><p class="text-xs text-gray-500">Profissional</p><p class="font-bold text-gray-800">${t.professionalName}</p></div><div class="text-right"><p class="text-xs text-gray-500">Total Itens</p><p class="font-bold text-gray-800">${t.items.length}</p></div></div><div class="border rounded-lg overflow-hidden max-h-[60vh] overflow-y-auto">${o}</div>`,maxWidth:"max-w-md"})}function Nt(e){if(N.calculationResult){const t=N.calculationResult,o=t.reduce((s,n)=>s+n.finalValue,0),a=t.map((s,n)=>`
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
                    <div class="text-right"><p class="text-xs uppercase font-bold text-gray-500">Total a Pagar</p><p id="grand-total-display" class="text-2xl md:text-3xl font-extrabold text-green-600">R$ ${o.toFixed(2)}</p></div>
                </div>
                <div class="block md:hidden space-y-4">${a}</div>
                <div class="hidden md:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"><table class="min-w-full divide-y divide-gray-200"><thead class="bg-gray-50"><tr><th class="px-6 py-3 text-left text-xs font-bold uppercase">Profissional</th><th class="px-6 py-3 text-right text-xs font-bold uppercase">Bruto</th><th class="px-6 py-3 text-right text-xs font-bold uppercase">(-) Desc.</th><th class="px-6 py-3 text-right text-xs font-bold uppercase">(+) Bônus</th><th class="px-6 py-3 text-right text-xs font-bold uppercase">Líquido</th><th class="px-6 py-3 text-center text-xs font-bold uppercase">Ações</th></tr></thead><tbody>${r}</tbody></table></div>
                <div class="fixed bottom-0 left-0 w-full bg-white p-4 border-t border-gray-200 shadow-lg md:static md:bg-transparent md:border-0 md:shadow-none z-30 flex justify-end gap-3">
                    <button data-action="back-to-filters" class="hidden md:block px-6 py-3 border border-gray-300 rounded-xl text-gray-700 font-bold">Cancelar</button>
                    <button data-action="save-final-report" class="w-full md:w-auto px-6 py-4 md:py-3 bg-green-600 text-white rounded-xl font-bold shadow-md hover:bg-green-700 transition">Finalizar Apuração</button>
                </div>
            </div>`}else{const t=new Date().toISOString().split("T")[0],o=new Date(new Date().getFullYear(),new Date().getMonth(),1).toISOString().split("T")[0],a=N.professionals.map(r=>`
            <label class="flex items-center p-3 bg-white border border-gray-200 rounded-lg shadow-sm active:bg-indigo-50 transition cursor-pointer">
                <input type="checkbox" value="${r.id}" class="prof-checkbox w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500">
                <span class="ml-3 font-medium text-gray-700">${r.name}</span>
            </label>`).join("");e.innerHTML=`
            <form id="calc-form" class="space-y-6 max-w-3xl mx-auto animate-fade-in">
                <div class="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                    <h3 class="font-bold text-gray-800 mb-4">Novo Cálculo</h3>
                    <div class="grid grid-cols-2 gap-4">
                        <div><label class="text-xs font-bold text-gray-500 uppercase">Início</label><input type="date" id="start-date" value="${o}" class="w-full mt-1 rounded-lg border-gray-300"></div>
                        <div><label class="text-xs font-bold text-gray-500 uppercase">Fim</label><input type="date" id="end-date" value="${t}" class="w-full mt-1 rounded-lg border-gray-300"></div>
                    </div>
                </div>
                <div class="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                    <div class="flex justify-between items-center mb-4"><h3 class="font-bold text-gray-800">Profissionais</h3><button type="button" data-action="toggle-all-profs" class="text-sm text-indigo-600 font-medium">Selecionar Todos</button></div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-60 overflow-y-auto">${a}</div>
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
            </form>`}}function vd(){Ze.innerHTML=`
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
    `}function Rt(e){N.currentTab=e,["dashboard","calculator","history"].forEach(o=>{const a=document.getElementById(`tab-${o}`);o===e?a.className="flex-1 md:flex-none px-4 py-2 rounded-md text-sm font-bold bg-white text-indigo-600 shadow-sm border border-gray-100":a.className="flex-1 md:flex-none px-4 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700"});const t=document.getElementById("commissions-content");e==="dashboard"&&Ds(t),e==="calculator"&&Nt(t),e==="history"&&hd(t)}function Ds(e){const{revenue:t,commissions:o}=N.dashStats,a=t>0?(o/t*100).toFixed(1):0;e.innerHTML=`
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
                        <p class="text-2xl font-extrabold text-gray-800 mt-2">R$ ${o.toFixed(2)}</p>
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
                                    ${a}%
                                </span>
                            </div>
                        </div>
                        <div class="overflow-hidden h-4 mb-4 text-xs flex rounded bg-indigo-100">
                            <div style="width:${Math.min(a,100)}%" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500 transition-all duration-500"></div>
                        </div>
                        <p class="text-sm text-gray-500">
                            De cada R$ 100,00 vendidos, <strong>R$ ${a}</strong> foram pagos em comissões neste período.
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
    `}function hd(e){const t=N.professionals.map(o=>`<option value="${o.id}" ${N.histProfessionalId===o.id?"selected":""}>${o.name}</option>`).join("");e.innerHTML=`
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
    `,N.historyData.length>0?Ms(document.getElementById("history-list-container"),N.historyData):Oo()}function Ms(e,t){if(t.length===0){e.innerHTML=`
            <div class="text-center py-16 bg-white rounded-xl border border-dashed border-gray-300">
                <h3 class="mt-2 text-sm font-medium text-gray-900">Nenhum registro encontrado</h3>
                <p class="mt-1 text-sm text-gray-500">Tente ajustar os filtros de data.</p>
            </div>`;return}const o=t.map(r=>`
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
    `).join(""),a=t.map(r=>`
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
        <div class="block md:hidden pb-20">${o}</div>
        <div class="hidden md:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <table class="min-w-full text-left">
                <thead class="bg-gray-50 text-gray-500 uppercase text-xs">
                    <tr><th class="px-6 py-3">Data Pagto</th><th class="px-6 py-3">Profissional</th><th class="px-6 py-3">Ref. Período</th><th class="px-6 py-3 text-right">Valor Pago</th><th class="px-6 py-3 text-right">Ações</th></tr>
                </thead>
                <tbody>${a}</tbody>
            </table>
        </div>
    `}const ao=document.getElementById("content");let Se={allPackages:[],catalogForModal:{services:[],products:[]}},wt=null,qe=null;function xd(e=6){let t="";for(let o=0;o<e;o++)t+=`
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
        `;return t}function yd(){const e=document.getElementById("packagesListContainer");if(e){if(Se.allPackages.length===0){e.innerHTML=`
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
            </div>`;return}e.innerHTML=Se.allPackages.map(t=>{const o=t.status==="active",a=JSON.stringify(t).replace(/'/g,"&apos;"),r=t.price||0,s=t.originalPrice||0,n=s>r?s-r:0,i=s>0?(s-r)/s*100:0,l=f(t.name),d=f(t.description||"Sem descrição");return`
            <div class="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 flex flex-col cursor-pointer"
                 data-action="edit-package" data-package='${a}'>
                
                <div class="p-4 flex-grow">
                    <div class="flex justify-between items-start">
                        <div class="min-w-0 pr-2">
                            <h3 class="text-base font-bold text-gray-900 truncate">${l}</h3>
                            <p class="text-xs text-gray-500 truncate">${d}</p>
                        </div>
                        <span class="text-xs font-semibold py-0.5 px-2 rounded-full flex-shrink-0 ${o?"bg-green-100 text-green-700":"bg-gray-100 text-gray-700"}">
                            ${o?"Ativo":"Inativo"}
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
        `}).join("")}}function Ca(){const e=document.getElementById("genericModal");e.style.display="none",qe&&e.removeEventListener("click",qe)}async function La(e=null){const t=document.getElementById("genericModal"),o=!!e,a=e?JSON.parse(JSON.stringify(e.items||[])):[],r=f(e?.name||""),s=f(e?.description||""),n=e?.price||"",i=e?.commissionRate||0,l=e?.validityDays||30,d=`
        <div class="modal-content max-w-4xl overflow-y-auto max-h-[90vh]">
            <form id="package-form" class="flex flex-col h-full">
                <div class="p-4 sm:p-6 border-b flex justify-between items-center">
                    <h2 class="text-2xl font-bold text-gray-800">${o?"Editar Pacote":"Criar Novo Pacote"}</h2>
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
    `;t.innerHTML=d,t.style.display="flex";const c=t.querySelector("#package-items-list"),u=(b,h)=>{const v=h.querySelector("#originalPrice"),w=b.reduce((k,S)=>k+S.price*S.quantity,0);v&&(v.textContent=`R$ ${w.toFixed(2)}`)},g=b=>{b.length===0?c.innerHTML='<p class="text-center text-gray-500 p-4">Nenhum item adicionado.</p>':c.innerHTML=b.map((h,v)=>{const w=h.type==="service",k=w?"Serviço":"Produto",S=w?"bg-indigo-100 text-indigo-800":"bg-green-100 text-green-800";return`
                <div class="flex items-center justify-between bg-white p-2 rounded shadow-sm border border-gray-200">
                    <div class="flex items-center gap-3 min-w-0">
                        <input type="number" value="${h.quantity}" min="1" class="w-12 p-1 border rounded-md text-sm quantity-input flex-shrink-0" data-index="${v}">
                        <span class="text-xs font-medium px-2 py-0.5 rounded-full ${S}">${k}</span>
                        <span class="font-medium text-gray-800 truncate">${f(h.name)}</span>
                    </div>
                    <div class="flex items-center gap-2 flex-shrink-0">
                        <span class="text-sm text-gray-600">R$ ${h.price.toFixed(2)}</span>
                        <button type="button" class="text-red-500 hover:text-red-700 remove-item-btn font-bold" data-index="${v}">&times;</button>
                    </div>
                </div>
            `}).join(""),u(b,t)};g(a),c.addEventListener("change",b=>{if(b.target.classList.contains("quantity-input")){const h=parseInt(b.target.dataset.index,10),v=parseInt(b.target.value,10);v>0&&a[h]&&(a[h].quantity=v,g(a))}}),c.addEventListener("click",b=>{if(b.target.classList.contains("remove-item-btn")){const h=parseInt(b.target.dataset.index,10);a.splice(h,1),g(a)}}),t.querySelector("#add-item-to-package-btn").onclick=()=>wd(b=>{const h=a.find(v=>v.id===b.id&&v.type===b.type);h?h.quantity++:a.push({...b,quantity:1}),g(a)}),qe&&t.removeEventListener("click",qe),qe=async b=>{const h=b.target.closest("button[data-action]");if(!h)return;const v=h.dataset.action;if(b.stopPropagation(),v==="close-modal"&&Ca(),v==="save-package"){const w=h,k={id:document.getElementById("packageId").value||null,name:document.getElementById("packageName").value,description:document.getElementById("packageDescription").value,status:document.getElementById("packageStatus").value,items:a,originalPrice:a.reduce((S,y)=>S+y.price*y.quantity,0),price:parseFloat(document.getElementById("finalPrice").value),commissionRate:parseFloat(document.getElementById("commissionRate").value)||0,validityDays:parseInt(document.getElementById("validityDays").value,10)||null,establishmentId:m.establishmentId};if(!k.name||!k.price){p("Erro","Nome do Pacote e Preço Final são obrigatórios.","error");return}if(k.items.length===0){p("Erro","Adicione pelo menos um item ao pacote.","error");return}w.disabled=!0,w.textContent="A salvar...";try{o?await xn(k.id,k):(delete k.id,await hn(k)),p("Sucesso!",`Pacote ${o?"atualizado":"criado"} com sucesso.`,"success"),Ca(),await zo()}catch(S){p("Erro",`Não foi possível salvar o pacote: ${S.message}`,"error"),w.disabled=!1,w.textContent="Salvar Pacote"}}},t.addEventListener("click",qe)}function wd(e){let t="";const o=document.createElement("div");o.id="item-selection-modal",o.className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[110]";const a={service:'<svg class="w-6 h-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v4.512a9.04 9.04 0 00-3 5.012M12 12a9.04 9.04 0 01-3-5.012V5l-1-1z" /></svg>',product:'<svg class="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>'},r=l=>{const d=t.toLowerCase(),c=Se.catalogForModal.services.filter(h=>h.name.toLowerCase().includes(d)),u=Se.catalogForModal.products.filter(h=>h.name.toLowerCase().includes(d)),g=c.map(h=>`
            <button data-action="select-item" data-item-type="service" data-item-id="${h.id}" class="flex items-center gap-3 w-full p-3 bg-white border rounded-lg hover:bg-gray-50 transition">
                <div class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gray-100">${a.service}</div>
                <span class="flex-grow text-left min-w-0 truncate">${f(h.name)}</span>
                <span class="font-semibold flex-shrink-0">R$ ${h.price.toFixed(2)}</span>
            </button>
        `).join("")||'<p class="text-xs text-gray-400 text-center p-4">Nenhum serviço encontrado.</p>',b=u.map(h=>`
            <button data-action="select-item" data-item-type="product" data-item-id="${h.id}" class="flex items-center gap-3 w-full p-3 bg-white border rounded-lg hover:bg-gray-50 transition">
                <div class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gray-100">${a.product}</div>
                <span class="flex-grow text-left min-w-0 truncate">${f(h.name)}</span>
                <span class="font-semibold flex-shrink-0">R$ ${h.price.toFixed(2)}</span>
            </button>
        `).join("")||'<p class="text-xs text-gray-400 text-center p-4">Nenhum produto encontrado.</p>';l.innerHTML=`
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><h4 class="font-semibold mb-2 text-center text-indigo-600">Serviços</h4><div id="modal-service-list" class="space-y-2 max-h-96 overflow-y-auto">${g}</div></div>
                <div><h4 class="font-semibold mb-2 text-center text-green-600">Produtos</h4><div id="modal-product-list" class="space-y-2 max-h-96 overflow-y-auto">${b}</div></div>
            </div>
        `};o.innerHTML=`
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
    `,document.body.appendChild(o);const s=o.querySelector("#item-selection-list"),n=o.querySelector("#item-search-input"),i=()=>{o.remove()};r(s),n.addEventListener("input",()=>{t=n.value,r(s)}),o.addEventListener("click",l=>{const d=l.target.closest('[data-action="select-item"]'),c=l.target.closest('[data-action="close-selection-modal"]');if(d){const{itemType:u,itemId:g}=d.dataset,h=(Se.catalogForModal[u+"s"]||[]).find(v=>v.id===g);h&&(e({...h,type:u}),i())}else(c||l.target===o)&&i()})}async function zo(){ao.innerHTML=`
        <section id="packages-page" class="p-4 sm:p-6">
             <div class="sticky top-0 z-10 bg-gray-100 sm:bg-transparent pt-3 pb-4 mb-6 -mx-4 -mt-4 sm:mx-0 sm:mt-0 sm:bg-transparent sm:pt-0 sm:pb-0 sm:static">
                <div class="flex justify-between items-center px-4 sm:px-0">
                    <h2 class="text-2xl sm:text-3xl font-bold text-gray-800">Pacotes de Serviços</h2>
                </div>
            </div>
            
            <div id="packagesListContainer" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pb-20">
                ${xd()}
            </div>
            
            <button data-action="new-package" class="fixed z-30 bottom-20 right-4 sm:bottom-6 sm:right-6 w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-transform hover:scale-105">
                <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
            </button>
        </section>
    `,wt&&ao.removeEventListener("click",wt),wt=e=>{if(e.target.closest('[data-action-stop-propagation="true"]')){e.stopPropagation();const a=e.target.closest('[data-action="delete-package"]');if(a){const r=a.dataset.id;H("Excluir Pacote","Tem a certeza que deseja excluir este pacote? Esta ação é irreversível.").then(async s=>{if(s)try{await yn(r),p("Sucesso!","Pacote excluído.","success"),await zo()}catch(n){p("Erro",`Não foi possível excluir: ${n.message}`,"error")}})}return}const t=e.target.closest('[data-action="new-package"], [data-action="edit-package"]');if(!t)return;const o=t.dataset.action;if(o==="new-package")La(null);else if(o==="edit-package"){const a=JSON.parse(t.dataset.package);La(a)}},ao.addEventListener("click",wt);try{const[e,t,o]=await Promise.all([Po(m.establishmentId),be(m.establishmentId),ut(m.establishmentId)]);Se.allPackages=e,Se.catalogForModal={services:t.filter(a=>a.active),products:o},yd()}catch{document.getElementById("packagesListContainer").innerHTML='<p class="text-red-500 col-span-full">Erro ao carregar pacotes.</p>'}}const kd=document.getElementById("content");let Sd=null;async function $d(){const e=f(m.userName||"Usuário"),t=f(U.currentUser?.email||"E-mail não disponível"),o=m.userName?m.userName.charAt(0):"U";kd.innerHTML=`
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
                             src="https://placehold.co/128x128/E2E8F0/4A5568?text=${encodeURIComponent(o)}" 
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
    `,await Ed()}async function Ed(){const e=document.getElementById("professional-agenda-block");e.innerHTML="";try{const t=m.userProfessionalId;if(t){const o=await cr(t);Sd=o,o.photo&&(document.getElementById("user-profile-avatar").src=o.photo);const a=f(o.name);e.innerHTML=`
                <div class="bg-indigo-50 p-4 rounded-lg flex items-center gap-4 mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                        <p class="font-semibold text-indigo-800">Você está associado ao profissional: ${a}</p>
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
            `,Id(o.id),document.getElementById("my-blocks-filter").addEventListener("change",s=>jt(o.id,s.target.value)),jt(o.id,"future")}else e.innerHTML=`
                <div class="bg-gray-100 p-4 rounded-lg text-center text-gray-600">
                    <p>Você não possui um perfil de profissional associado a esta conta.</p>
                    <p class="text-sm mt-2">Para gerenciar sua agenda, peça ao administrador para associar seu usuário a um profissional existente na tela de "Usuários".</p>
                </div>
            `}catch(t){console.error("Erro ao carregar seção de profissional:",t),e.innerHTML=`
            <div class="bg-red-100 p-4 rounded-lg text-red-700">
                <p>Ocorreu um erro ao carregar os dados do profissional.</p>
                <p class="text-sm mt-2">${f(t.message)}</p>
            </div>
        `}}function Id(e){const t=document.getElementById("block-schedule-form");t.addEventListener("submit",async o=>{o.preventDefault();const a=t.querySelector("#blockDate").value,r=t.querySelector("#blockStartTime").value,s=t.querySelector("#blockEndTime").value,n=t.querySelector("#blockReason").value;if(!a||!r||!s){p("Erro","Por favor, preencha a data e os horários de início e fim.","error");return}if(r>=s){p("Erro","A hora de início deve ser anterior à hora de fim.","error");return}const i=new Date(`${a}T${r}:00`),l=new Date(`${a}T${s}:00`),d=t.querySelector('button[type="submit"]');d.disabled=!0,d.textContent="A bloquear...";try{await Vt({establishmentId:m.establishmentId,professionalId:e,reason:n||"Bloqueado (Meu Perfil)",startTime:i.toISOString(),endTime:l.toISOString()}),p("Sucesso","Agenda bloqueada com sucesso!","success"),t.reset();const c=document.getElementById("my-blocks-filter").value;jt(e,c)}catch(c){console.error("Erro ao bloquear agenda:",c),p("Erro",`Não foi possível bloquear a agenda: ${c.message}`,"error")}finally{d.disabled=!1,d.textContent="Bloquear Agenda"}})}async function jt(e,t="future"){const o=document.getElementById("my-blocks-list");o.innerHTML='<p class="text-gray-500">A carregar bloqueios...</p>';try{const a=new Date;let r,s;t==="history"?(s=new Date,r=new Date,r.setFullYear(r.getFullYear()-1)):(r=new Date,s=new Date,s.setFullYear(s.getFullYear()+1));let i=(await zt(m.establishmentId,r.toISOString(),s.toISOString(),e)).map(l=>({...l,startTime:new Date(l.startTime),endTime:new Date(l.endTime)}));t==="history"?i=i.filter(l=>l.endTime<a).sort((l,d)=>d.startTime-l.startTime):i=i.filter(l=>l.endTime>=a).sort((l,d)=>l.startTime-d.startTime),i.length>0?(o.innerHTML=i.map(l=>{const d=l.startTime.toLocaleDateString("pt-BR"),c=`${l.startTime.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})} - ${l.endTime.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}`,u=l.endTime<new Date,g=f(l.reason||"Sem motivo");return`
                    <div class="flex items-center justify-between p-3 ${u?"bg-gray-100 opacity-75":"bg-white border border-gray-200"} rounded-md shadow-sm">
                        <div>
                            <p class="font-semibold text-gray-800">${d} das ${c}</p>
                            <p class="text-sm text-gray-600">${g}</p>
                        </div>
                        <button data-block-id="${l.id}" class="remove-block-btn text-red-500 hover:text-red-700 text-2xl font-bold leading-none p-1" title="Apagar bloqueio">
                            &times;
                        </button>
                    </div>
                `}).join(""),o.querySelectorAll(".remove-block-btn").forEach(l=>{l.addEventListener("click",async d=>{const c=d.currentTarget.dataset.blockId;if(confirm("Tem certeza que deseja remover este bloqueio?"))try{await Eo(c),p("Sucesso","Bloqueio removido.","success"),jt(e,t)}catch(u){console.error("Erro ao remover bloqueio:",u),p("Erro",`Não foi possível remover o bloqueio: ${u.message}`,"error")}})})):o.innerHTML=`<p class="text-gray-500 py-4 text-center">Nenhum bloqueio ${t==="history"?"no histórico recente":"futuro agendado"}.</p>`}catch(a){console.error("Erro ao carregar bloqueios:",a),o.innerHTML=`<p class="text-red-500">Erro ao carregar bloqueios: ${f(a.message)}</p>`}}document.addEventListener("DOMContentLoaded",()=>{document.addEventListener("gesturestart",function(t){t.preventDefault()}),document.addEventListener("gesturechange",function(t){t.preventDefault()}),document.addEventListener("gestureend",function(t){t.preventDefault()});let e=0;document.addEventListener("touchend",function(t){const o=new Date().getTime();o-e<=300&&t.preventDefault(),e=o},!1)});const kt=document.getElementById("loadingScreen"),so=document.getElementById("dashboardContent"),ro=document.getElementById("content"),Ta=document.getElementById("notificationBell"),no=document.getElementById("notificationBadge"),St=document.getElementById("notificationPanel"),Pa=document.getElementById("notificationList"),io=document.getElementById("profileMenuButton"),te=document.getElementById("profileDropdown"),Cd=document.getElementById("profileName"),Ld=document.getElementById("profileEmail"),Td=document.getElementById("logoutButton"),Ba=document.getElementById("myProfileLink"),Da=document.getElementById("hamburger-menu-btn"),we=document.getElementById("sidebar"),Ne=document.getElementById("mobile-overlay"),Ma={indigo:{main:"#4f46e5",hover:"#4338ca",light:"#e0e7ff",text:"#ffffff"},blue:{main:"#2563eb",hover:"#1d4ed8",light:"#dbeafe",text:"#ffffff"},sky:{main:"#0284c7",hover:"#0369a1",light:"#e0f2fe",text:"#ffffff"},teal:{main:"#0d9488",hover:"#0f766e",light:"#ccfbf1",text:"#ffffff"},emerald:{main:"#059669",hover:"#047857",light:"#d1fae5",text:"#ffffff"},green:{main:"#16a34a",hover:"#15803d",light:"#dcfce7",text:"#ffffff"},lime:{main:"#65a30d",hover:"#4d7c0f",light:"#ecfccb",text:"#ffffff"},amber:{main:"#d97706",hover:"#b45309",light:"#fef3c7",text:"#1f2937"},orange:{main:"#ea580c",hover:"#c2410c",light:"#ffedd5",text:"#ffffff"},red:{main:"#dc2626",hover:"#b91c1c",light:"#fee2e2",text:"#ffffff"},rose:{main:"#e11d48",hover:"#be123c",light:"#ffe4e6",text:"#ffffff"},pink:{main:"#db2777",hover:"#be185d",light:"#fce7f3",text:"#ffffff"},fuchsia:{main:"#c026d3",hover:"#a21caf",light:"#fae8ff",text:"#ffffff"},purple:{main:"#7c3aed",hover:"#6d28d9",light:"#ede9fe",text:"#ffffff"},violet:{main:"#8b5cf6",hover:"#7c3aed",light:"#ddd6fe",text:"#ffffff"},gray:{main:"#4b5563",hover:"#374151",light:"#f3f4f6",text:"#ffffff"},black:{main:"#111827",hover:"#000000",light:"#e5e7eb",text:"#ffffff"}};let rt=null,nt=[];const Pd={"agenda-section":ns,"comandas-section":Nn,"relatorios-section":Kn,"servicos-section":bi,"produtos-section":Pi,"suppliers-section":Fi,"profissionais-section":Mt,"clientes-section":ll,"estabelecimento-section":Ls,"ausencias-section":Il,"users-section":At,"sales-report-section":zl,"financial-section":_l,"commissions-section":nd,"packages-section":zo,"my-profile-section":$d};function Bd(e){const t=Ma[e]||Ma.indigo,a=(s=>{const n=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(s);return n?`${parseInt(n[1],16)}, ${parseInt(n[2],16)}, ${parseInt(n[3],16)}`:"79, 70, 229"})(t.main);document.body.style.setProperty("--theme-main",t.main);const r=document.getElementById("dynamic-theme-styles");r.innerHTML=`
        :root {
            --theme-color-main: ${t.main};
            --theme-color-hover: ${t.hover};
            --theme-color-light: ${t.light};
            --theme-rgb: ${a};
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
    `}function yo(){const e=nt.filter(t=>!t.read).length;if(e>0?(no.textContent=e,no.classList.remove("hidden")):no.classList.add("hidden"),nt.length===0){Pa.innerHTML='<p class="text-center text-gray-500 p-4">Nenhuma notificação.</p>';return}Pa.innerHTML=nt.map(t=>`
    <div class="notification-item ${t.read?"":"unread"}">
    <p class="font-semibold">${t.title}</p>
    <p class="text-sm text-gray-600">${t.message}</p>
    <p class="text-xs text-gray-400 mt-1">${t.time}</p>
    </div>
    `).join("")}function Dd(e){rt&&rt();const t=ge(_,"establishments",e,"notifications"),o=Ft(t,it("timestamp",">=",new Date),Ra("timestamp","desc"));rt=_s(o,a=>{a.docChanges().forEach(r=>{if(r.type==="added"){const s=r.doc.data();nt.unshift({title:s.title,message:s.message,time:s.timestamp.toDate().toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),read:!1}),p(s.title,s.message,"info",!0),yo();const n=document.querySelector(".sidebar-link.active");n&&n.dataset.target==="agenda-section"&&(s.type==="cancellation"||s.type==="new_appointment")&&(console.log("Atualizando agenda em tempo real..."),ns())}})},a=>{console.error("Erro no listener de notificações em tempo real:",a)})}function Z(e,t={}){const o=e.replace("-section","");if(e!=="my-profile-section"){const r=m.enabledModules?.[o]!==!1,s=m.userPermissions===null||m.userPermissions[e]?.view===!0;if(!r||!s){ro.innerHTML='<div class="p-8 text-center"><h2 class="text-2xl font-bold text-red-600">Acesso Negado</h2><p class="text-gray-600">Você não tem permissão para visualizar este módulo.</p></div>',document.querySelectorAll(".sidebar-link").forEach(n=>n.classList.remove("active")),we.classList.contains("absolute")&&(we.classList.add("hidden"),Ne.classList.add("hidden"));return}}const a=Pd[e];a?(document.querySelectorAll(".sidebar-link").forEach(r=>{r.classList.toggle("active",r.getAttribute("data-target")===e)}),e==="my-profile-section"&&document.querySelectorAll(".sidebar-link").forEach(r=>r.classList.remove("active")),ro.innerHTML="",window.innerWidth<768&&(we.classList.add("hidden"),Ne.classList.add("hidden")),a(t)):ro.innerHTML=`<div class="p-8 text-center"><h2 class="text-2xl font-bold">Página em Construção</h2><p class="text-gray-600">O módulo para "${e}" ainda não foi implementado.</p></div>`}async function Md(e){const t=document.getElementById("kpi-appointments-wrapper"),o=document.getElementById("kpi-financial-wrapper"),a=document.getElementById("kpi-today-appointments"),r=document.getElementById("kpi-today-revenue"),s=e===null||e["agenda-section"]?.view===!0,n=e===null||e["financial-section"]?.view===!0;if(s&&t&&(t.classList.remove("hidden"),t.classList.add("inline-flex")),n&&o&&(o.classList.remove("hidden"),o.classList.add("inline-flex")),!(!s&&!n))try{const i=await Hr();s&&a&&(a.textContent=i.todayAppointments.toString()),n&&r&&(r.textContent=`R$ ${i.todayRevenue.toFixed(2).replace(".",",")}`)}catch(i){console.error("Erro ao carregar KPIs do cabeçalho:",i)}}async function Ad(e){try{console.log("[Nativo] Iniciando configuração de Push..."),ae.getPlatform()==="android"&&(await G.createChannel({id:"default",name:"Notificações Gerais",description:"Alertas de agendamentos e avisos",importance:5,visibility:1,vibration:!0}),console.log("Canal Android criado."));let t=await G.checkPermissions();if(t.receive==="prompt"&&(t=await G.requestPermissions()),t.receive!=="granted")return;await G.register(),G.addListener("registration",async o=>{console.log("Push Token gerado:",o.value);try{const a=pe(_,"users",e);await wo(a,{fcmTokens:Us(o.value),platform:"native_mobile"}),console.log("Token FCM salvo no perfil do utilizador (Nativo).")}catch(a){console.error("Erro ao salvar token FCM:",a)}}),G.addListener("registrationError",o=>{console.error("Erro no registo de push notifications:",o)}),G.addListener("pushNotificationReceived",o=>{console.log("Notificação Push recebida:",o),p(o.title,o.body,"info",!0)}),G.addListener("pushNotificationActionPerformed",o=>{console.log("Ação na notificação push:",o),Z("agenda-section")})}catch(t){console.log("Push Notifications não suportado/inicializado:",t)}}function qd(){const e=document.getElementById("exitConfirmationModal"),t=document.getElementById("btn-cancel-exit"),o=document.getElementById("btn-confirm-exit"),a=()=>e.style.display="block",r=()=>e.style.display="none",s=()=>e.style.display==="block";e&&(t.addEventListener("click",()=>{r(),ae.isNativePlatform()||history.pushState(null,document.title,location.href)}),o.addEventListener("click",()=>{r(),ae.isNativePlatform()?ta.exitApp():history.back()}),ae.isNativePlatform()?ta.addListener("backButton",({canGoBack:n})=>{if(s())r();else{const i=document.querySelectorAll('.modal[style*="display: block"]'),l=Array.from(i).filter(u=>u.id!=="exitConfirmationModal");if(l.length>0){l.forEach(u=>u.style.display="none");return}const d=document.getElementById("sidebar");if(d&&!d.classList.contains("hidden")&&window.innerWidth<768){d.classList.add("hidden"),document.getElementById("mobile-overlay").classList.add("hidden");return}const c=document.querySelector(".sidebar-link.active");c&&c.getAttribute("data-target")==="agenda-section"?a():Z("agenda-section")}}):(history.pushState(null,document.title,location.href),window.addEventListener("popstate",n=>{if(s()){r(),history.pushState(null,document.title,location.href);return}const i=document.querySelectorAll('.modal[style*="display: block"], .modal[style*="display: flex"]'),l=Array.from(i).filter(c=>c.id!=="exitConfirmationModal");if(l.length>0){l.forEach(c=>c.style.display="none"),history.pushState(null,document.title,location.href);return}const d=document.querySelector(".sidebar-link.active");d&&d.getAttribute("data-target")==="agenda-section"?a():(Z("agenda-section"),history.pushState(null,document.title,location.href))})))}async function Nd(){try{await Hs(U,Os),console.log("Persistência LOCAL configurada na inicialização.")}catch(e){console.error("Erro ao definir persistência no main.js",e)}ae.isNativePlatform()&&(document.body.classList.add("is-app-native"),console.log("Modo App Nativo detectado: Layout ajustado para Safe Areas.")),ar(),qd(),Da&&Da.addEventListener("click",e=>{e.stopPropagation(),we.classList.remove("hidden"),we.classList.add("absolute","inset-y-0","left-0","z-40","shadow-xl"),Ne.classList.remove("hidden")}),Ne&&Ne.addEventListener("click",()=>{we.classList.add("hidden"),we.classList.remove("absolute","inset-y-0","left-0","z-40","shadow-xl"),Ne.classList.add("hidden")}),Ta.addEventListener("click",e=>{e.stopPropagation(),St.classList.toggle("hidden"),St.classList.contains("hidden")||(nt.forEach(t=>t.read=!0),yo())}),io.addEventListener("click",e=>{e.stopPropagation(),te.classList.toggle("active"),te.classList.contains("active")?te.classList.remove("hidden"):setTimeout(()=>te.classList.add("hidden"),200)}),Ba&&Ba.addEventListener("click",e=>{e.preventDefault(),Z("my-profile-section"),te.classList.remove("active"),te.classList.add("hidden")}),document.addEventListener("click",e=>{!St.contains(e.target)&&e.target!==Ta&&St.classList.add("hidden"),!te.contains(e.target)&&e.target!==io&&te.classList.contains("active")&&(te.classList.remove("active"),setTimeout(()=>te.classList.add("hidden"),200))}),Aa(U,async e=>{if(e){if(console.log("Usuário detectado:",e.email),!ae.isNativePlatform()&&(console.log("Inicializando Web Push (PWA)..."),Wa(),"Notification"in window&&Notification.permission==="default")){const t=document.getElementById("toast-notification-request"),o=document.getElementById("btn-enable-toast"),a=document.getElementById("btn-deny-toast"),r=document.getElementById("btn-close-toast");setTimeout(()=>{t&&(t.style.display="block")},3500),o&&o.addEventListener("click",async()=>{await Ja()&&t&&(t.style.display="none")});const s=()=>{t&&(t.style.display="none")};a&&a.addEventListener("click",s),r&&r.addEventListener("click",s)}try{const o=(await e.getIdTokenResult(!0)).claims;if((o.role==="owner"||o.role==="employee")&&o.establishmentId){const a=await Ie(o.establishmentId);m.enabledModules=a.modules,Bd(a.themeColor||"indigo");let r=null,s=e.displayName,n=null;if(o.role==="employee"||o.role==="owner"){const d=pe(_,"users",e.uid),c=await qa(d);if(c.exists()){const u=c.data();r=o.role==="employee"?u.permissions||{}:null,s=u.name||s,n=u.professionalId||null}else if(o.role==="employee")throw new Error("Dados de permissão do funcionário não encontrados.")}m.userProfessionalId=n,ae.isNativePlatform()&&Ad(e.uid);const i=s||e.email;Gs(o.establishmentId,a.name,r),io.textContent=i.charAt(0).toUpperCase(),Cd.textContent=i,Ld.textContent=e.email;const l=()=>{rt&&rt(),Uo(U).then(()=>window.location.href="/login.html")};Td.addEventListener("click",d=>{d.preventDefault(),l()}),ir(Z,r,m.enabledModules),Md(r),Dd(o.establishmentId),yo(),kt.classList.add("fade-out"),so.style.display="flex",setTimeout(()=>{kt.style.display="none"},500),console.log("Verificando Onboarding..."),setTimeout(()=>{wr()},1500),Z("agenda-section")}else throw new Error("Utilizador não tem permissão de 'owner' ou 'employee' ou 'establishmentId'.")}catch(t){console.error("Erro crítico na inicialização do painel:",t),kt.classList.add("fade-out"),setTimeout(()=>{kt.style.display="none"},500),so.innerHTML=`
                    <div class="w-full h-full flex flex-col items-center justify-center bg-gray-100 p-4">
                        <h2 class="text-2xl font-bold text-red-600 mb-4">Erro de Acesso</h2>
                        <p class="text-gray-700 text-center mb-6">Não foi possível carregar os seus dados ou permissões. Isto pode acontecer se a sua conta foi desativada ou está configurada incorretamente.</p>
                        <p class="text-sm text-gray-500 mb-6">Detalhe do erro: ${t.message}</p>
                        <button id="errorLogoutButton" class="bg-red-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-red-700">Sair e Tentar Novamente</button>
                    </div>
                `,so.style.display="flex",document.getElementById("errorLogoutButton").addEventListener("click",()=>{Uo(U).then(()=>window.location.href="/login.html")})}}else window.location.href="/login.html"})}Nd();Aa(U,async e=>{if(e){await Wa();const o="Notification"in window&&Notification.permission==="default",a=window.Capacitor&&window.Capacitor.isNativePlatform();if(o&&!a){const r=document.getElementById("toast-notification-request"),s=document.getElementById("btn-enable-toast"),n=document.getElementById("btn-deny-toast"),i=document.getElementById("btn-close-toast");setTimeout(()=>{r&&(r.style.display="block")},3500),s&&s.addEventListener("click",async()=>{await Ja()&&r&&(r.style.display="none")});const l=()=>{r&&(r.style.display="none")};n&&n.addEventListener("click",l),i&&i.addEventListener("click",l)}}});export{_a as W};
