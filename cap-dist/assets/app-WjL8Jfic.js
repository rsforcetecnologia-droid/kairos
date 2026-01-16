const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/web-Bz1asRFh.js","assets/modulepreload-polyfill-B5Qt9EMX.js","assets/firebase-config-C2tbVz-J.js","assets/styles-C2XZ_b0c.css"])))=>i.map(i=>d[i]);
import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css               */import{a as _,d as W,m as Fa}from"./firebase-config-C2tbVz-J.js";import{EmailAuthProvider as Ts,reauthenticateWithCredential as Ps,verifyBeforeUpdateEmail as Bs,updatePassword as Ds,updateProfile as Ms,setPersistence as As,browserLocalPersistence as qs,onAuthStateChanged as Bo,signOut as Ha}from"https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";import{doc as pe,getDoc as Do,updateDoc as ha,setDoc as Ns,addDoc as Mo,collection as ge,query as jt,where as rt,getDocs as xa,orderBy as Ao,writeBatch as qo,serverTimestamp as Oa,deleteDoc as Rs,arrayUnion as js,onSnapshot as Fs}from"https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";import{getToken as Hs,onMessage as Os}from"https://www.gstatic.com/firebasejs/11.6.1/firebase-messaging.js";import"https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";import"https://www.gstatic.com/firebasejs/11.6.1/firebase-storage.js";const u={establishmentId:null,establishmentName:null,userName:null,userProfessionalId:null,userPermissions:null,establishmentSettings:null,enabledModules:{agenda:!0,comandas:!0,relatorios:!0,commissions:!0,packages:!0,financial:!0,servicos:!0,produtos:!0,profissionais:!0,clientes:!0,users:!0,estabelecimento:!0},professionals:[],services:[],professionalColors:new Map,allEvents:[]};function zs(e,t,a){u.establishmentId=e,u.establishmentName=t,u.userPermissions=a}const No=window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1",ia=No?"http://localhost:8080":"https://kairos-app-407358446276.us-central1.run.app";console.log(`🚀 API configurada para modo: ${No?"LOCAL (Dev)":"PRODUÇÃO (Cloud)"}`);console.log("📡 URL Base:",ia);async function Vs(){const e=_.currentUser;return e?{"Content-Type":"application/json",Authorization:`Bearer ${await e.getIdToken()}`}:(console.warn("Usuário não logado, tentando redirecionar para /login"),window.location.href="/login",null)}async function $(e,t={}){const a=await Vs();if(!a)throw new Error("Utilizador não autenticado. A requisição foi cancelada.");const s=ia.replace(/\/$/,""),r=e.startsWith("/")?e:`/${e}`,o=`${s}${r}`;console.log(`AuthenticatedFetch: ${t.method||"GET"} ${o}`);try{const n=await fetch(o,{...t,headers:{...a,...t.headers}});if(!n.ok){const l=(await n.json().catch(()=>({message:n.statusText}))).message||`Erro na API: ${n.status}`;if(l.includes("FAILED_PRECONDITION")&&l.includes("requires an index")){const d=/(https:\/\/[^\s]+)/,c=l.match(d),m=c?c[0]:"URL não encontrada na mensagem de erro.";console.warn(`%c AVISO IMPORTANTE (FIREBASE): ÍNDICE NECESSÁRIO! %c
                    
Sua consulta em '${e}' falhou porque um índice composto do Firestore é necessário.
Para corrigir isso, clique no link abaixo (com o Firebase logado) e crie o índice:
                    
%c${m}%c
                    
--------------------------------------------------------------------`,"background-color: #ffc; color: #663300; font-size: 14px; font-weight: bold; padding: 5px;","color: #663300; font-size: 12px;","color: #0000ff; font-size: 12px; font-weight: bold; text-decoration: underline;","color: #663300; font-size: 12px;")}throw console.error(`Erro na API (${n.status}) em ${o}:`,l),new Error(l)}return n.json()}catch(n){throw console.error(`Falha de rede ao tentar acessar ${o}:`,n.message),n.message.includes("Failed to fetch")||n.message.includes("NetworkError")?new Error(`Não foi possível conectar ao servidor em ${ia}. Verifique se o servidor backend está rodando.`):n}}const Ro=(e,t,a,s=null)=>{let r=`/api/appointments/${e}?startDate=${t}&endDate=${a}`;return s&&(r+=`&professionalId=${s}`),$(r)},Us=({establishmentId:e,professionalId:t,serviceIds:a,date:s})=>{const r=`/api/availability?establishmentId=${e}&professionalId=${t}&serviceIds=${a.join(",")}&date=${s}`;return $(r)},_s=e=>$("/api/appointments",{method:"POST",body:JSON.stringify(e)}),Ws=(e,t)=>$(`/api/appointments/${e}`,{method:"PUT",body:JSON.stringify(t)}),za=e=>$(`/api/appointments/${e}`,{method:"DELETE"}),Js=e=>$(`/api/appointments/${e}/reopen`,{method:"POST"}),Gs=(e,t)=>$(`/api/appointments/${e}/checkout`,{method:"POST",body:JSON.stringify(t)});let J;async function Ys(){if(!J)try{J=new(window.AudioContext||window.webkitAudioContext)}catch(e){console.error("Não foi possível inicializar o áudio:",e)}}function Qs(){if(!J){console.warn("AudioContext não inicializado. O som não será tocado.");return}J.state==="suspended"&&J.resume();const e=J.createOscillator(),t=J.createGain();e.connect(t),t.connect(J.destination),e.type="sine",e.frequency.setValueAtTime(800,J.currentTime),t.gain.setValueAtTime(0,J.currentTime),t.gain.linearRampToValueAtTime(.3,J.currentTime+.01),t.gain.exponentialRampToValueAtTime(1e-4,J.currentTime+.2),e.start(J.currentTime),e.stop(J.currentTime+.2)}function p(e,t,a="info",s=!1){const r=document.getElementById("toast-container");if(!r)return;s&&Qs();const o=document.createElement("div"),n={success:"bg-green-50 border-green-400 text-green-700",error:"bg-red-50 border-red-400 text-red-700",info:"bg-blue-50 border-blue-400 text-blue-700"},i={success:'<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',error:'<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',info:'<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>'},l={success:"bg-green-500",error:"bg-red-500",info:"bg-blue-500"};o.className=`toast ${n[a]||n.info}`,o.innerHTML=`
        <div class="toast-icon">${i[a]||i.info}</div>
        <div class="toast-content">
            <p class="font-bold">${e}</p>
            <p class="text-sm">${t}</p>
        </div>
        <button class="toast-close">&times;</button>
        <div class="toast-progress-bar">
            <div class="toast-progress ${l[a]||l.info}"></div>
        </div>
    `,r.appendChild(o),o.querySelector(".toast-close").addEventListener("click",()=>o.remove()),setTimeout(()=>{o.remove()},4e3)}function z(e,t){const a=document.getElementById("genericModal");return new Promise(s=>{a.innerHTML=`
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
            </div>`,a.style.display="flex",document.getElementById("genericModalConfirmBtn").onclick=()=>{a.style.display="none",s(!0)},document.getElementById("genericModalCancelBtn").onclick=()=>{a.style.display="none",s(!1)}})}function Q({title:e,contentHTML:t,maxWidth:a="max-w-4xl",showCloseButton:s=!0}){let r=document.getElementById("genericModal");const o=r.cloneNode(!1);r.parentNode.replaceChild(o,r),r=o;const n=()=>{r.style.display="none"},i=c=>{r.querySelector("#genericModalContentBody").innerHTML=c};r.innerHTML=`
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
    `;const l=r.querySelector("[data-close-modal]");l&&(l.onclick=n);const d=r.querySelector('[data-action="close-modal"]');return d&&(d.onclick=n),r.addEventListener("click",c=>{c.target.closest(".modal-content")||n()}),r.style.display="flex",{modalElement:r,close:n,setContent:i}}function Ft(e){const t=document.getElementById(e);t&&(t.style.display="none")}function Xs(){document.body.addEventListener("click",()=>{J||Ys()},{once:!0}),document.addEventListener("click",e=>{const t=e.target.closest('[data-action="close-modal"]');if(t){const s=t.dataset.target;if(s){const r=document.getElementById(s);r&&(r.style.display="none")}}if(e.target.closest("[data-close-modal]")){const s=document.getElementById("genericModal");s&&(s.style.display="none")}})}const X=document.getElementById("sidebar"),Va=document.getElementById("sidebarToggle"),Xe=document.getElementById("mainContent"),Zs=document.querySelectorAll(".sidebar-link"),Ua=document.getElementById("hamburger-menu-btn"),Re=document.getElementById("mobile-overlay");function kt(e){!X||!Xe||(X.classList.toggle("collapsed",e),Xe.classList.toggle("sidebar-collapsed-shift",e))}function Ks(){!X||!Re||(X.classList.add("mobile-open"),Re.classList.add("visible"))}function pt(){!X||!Re||(X.classList.remove("mobile-open"),Re.classList.remove("visible"))}function er(){kt(!X.classList.contains("collapsed"))}function tr(e,t,a){if(!X||!Xe)return;Xe.classList.add("main-content-shift"),window.innerWidth>=768?kt(X.classList.contains("collapsed")):(Xe.classList.remove("main-content-shift","sidebar-collapsed-shift"),pt()),Va&&Va.addEventListener("click",r=>{r.stopPropagation(),er()}),X.addEventListener("mouseenter",()=>{window.innerWidth>=1024&&X.classList.contains("collapsed")&&kt(!1)}),X.addEventListener("mouseleave",()=>{window.innerWidth>=1024&&(document.querySelector("#sidebarToggle:hover")||kt(!0))}),Ua&&Ua.addEventListener("click",r=>{r.stopPropagation(),Ks()}),Re&&Re.addEventListener("click",r=>{r.stopPropagation(),pt()});let s=0;X.addEventListener("touchstart",r=>{s=r.changedTouches[0].screenX},{passive:!0}),X.addEventListener("touchend",r=>{const o=r.changedTouches[0].screenX;s-o>50&&pt()},{passive:!0}),Zs.forEach(r=>{const o=r.getAttribute("data-target"),n=o.replace("-section",""),i=a?.[n]!==!1,l=t===null||t[o]?.view===!0;if(!i||!l){r.style.display="none";return}r.style.display="flex",r.addEventListener("click",d=>{d.preventDefault(),o&&typeof e=="function"&&e(o),window.innerWidth<768&&pt()})})}const Ee=e=>{const t=e||u.establishmentId;return t?$(`/api/establishments/${t}`):Promise.reject(new Error("ID do estabelecimento não fornecido."))},St=(e,t)=>{const a=e||u.establishmentId;return a?$(`/api/establishments/${a}`,{method:"PUT",body:JSON.stringify(t)}):Promise.reject(new Error("ID do estabelecimento não fornecido."))},ar=(e,t)=>{const a=e||u.establishmentId;return a?$(`/api/establishments/${a}/booking-status`,{method:"PATCH",body:JSON.stringify({publicBookingEnabled:t})}):Promise.reject(new Error("ID do estabelecimento não fornecido."))},or=(e,t)=>{const a=e||u.establishmentId;return a?$(`/api/establishments/${a}/owner-email`,{method:"PATCH",body:JSON.stringify({newEmail:t})}):Promise.reject(new Error("ID do estabelecimento não fornecido."))},K=e=>$(`/api/professionals/${e}`),sr=e=>$(`/api/professionals/details/${e}`),jo=e=>$("/api/professionals",{method:"POST",body:JSON.stringify(e)}),Lt=(e,t)=>$(`/api/professionals/${e}`,{method:"PUT",body:JSON.stringify(t)}),_a=(e,t)=>Lt(e,{services:t}),Fo=e=>$(`/api/professionals/${e}`,{method:"DELETE"}),rr=e=>{const t=e.map(a=>Fo(a));return Promise.all(t)},be=e=>$(`/api/services/${e}`),Ho=e=>$("/api/services",{method:"POST",body:JSON.stringify(e)}),nr=(e,t)=>$(`/api/services/${e}`,{method:"PUT",body:JSON.stringify(t)}),ir=e=>$(`/api/services/${e}`,{method:"DELETE"}),lr=(e,t)=>$(`/api/services/${e}/status`,{method:"PATCH",body:JSON.stringify({active:t})}),dr=e=>$(`/api/services/stats/most-popular/${e}`),lt=e=>$(`/api/products/${e}`),Oo=e=>$("/api/products",{method:"POST",body:JSON.stringify(e)}),cr=(e,t)=>$(`/api/products/${e}`,{method:"PUT",body:JSON.stringify(t)}),ur=e=>$(`/api/products/${e}`,{method:"DELETE"}),mr=(e,t)=>$(`/api/products/${e}/stock`,{method:"PATCH",body:JSON.stringify(t)}),pr=({startDate:e,endDate:t,productId:a,categoryId:s,establishmentId:r})=>{const o=new URLSearchParams({startDate:e,endDate:t});return a&&a!=="all"&&o.append("productId",a),s&&s!=="all"&&o.append("categoryId",s),r&&o.append("establishmentId",r),$(`/api/products/stock-history/report?${o.toString()}`)},gr={indigo:{name:"Padrão (Índigo)",main:"#4f46e5"},blue:{name:"Azul",main:"#2563eb"},sky:{name:"Céu",main:"#0284c7"},teal:{name:"Verde Água",main:"#0d9488"},emerald:{name:"Esmeralda",main:"#059669"},green:{name:"Verde",main:"#16a34a"},lime:{name:"Lima",main:"#65a30d"},amber:{name:"Âmbar",main:"#d97706"},orange:{name:"Laranja",main:"#ea580c"},red:{name:"Vermelho",main:"#dc2626"},rose:{name:"Rosa",main:"#e11d48"},pink:{name:"Pink",main:"#db2777"},fuchsia:{name:"Fúcsia",main:"#c026d3"},purple:{name:"Roxo",main:"#7c3aed"},violet:{name:"Violeta",main:"#8b5cf6"},gray:{name:"Cinza",main:"#4b5563"},black:{name:"Preto",main:"#111827"}};function Wa(e,t,a){return new Promise((s,r)=>{const o=new FileReader;o.readAsDataURL(e),o.onload=n=>{const i=new Image;i.src=n.target.result,i.onload=()=>{const l=document.createElement("canvas");let d=i.width,c=i.height;d>t&&(c*=t/d,d=t),l.width=d,l.height=c,l.getContext("2d").drawImage(i,0,0,d,c);const g=e.type==="image/png"&&t<500?"image/png":"image/jpeg";s(l.toDataURL(g,a))},i.onerror=l=>r(l)},o.onerror=n=>r(n)})}let ue=null;const $t=[{id:"company_data",title:"Identidade do Negócio",icon:"🏢",description:"Configure os dados da sua empresa."},{id:"branding",title:"Sua Marca",icon:"🎨",description:"Logo e cores (Opcional)."},{id:"time_config",title:"O Relógio",icon:"⏱️",description:"Tempo padrão entre agendamentos."},{id:"first_service",title:"O Menu",icon:"✂️",description:"Seu principal serviço."},{id:"first_prof",title:"Sua Equipe",icon:"💇",description:"Cadastre o primeiro profissional."},{id:"first_product",title:"O Estoque",icon:"🧴",description:"Cadastre um produto (opcional)."}];let ee=0,Tt=[];async function br(){try{console.log("Iniciando verificação de Onboarding para ID:",u.establishmentId);const e=await Ee(u.establishmentId),t=await K(u.establishmentId),a=await be(u.establishmentId);Tt=a||[];const s=e&&e.name&&(e.phone||e.address),r=e&&(e.logo||e.themeColor&&e.themeColor!=="indigo"),o=e&&e.slotInterval>0,n=a&&a.length>0,i=t&&t.length>0;if(console.log("Status Onboarding:",{hasCompanyData:s,hasBranding:r,hasTimeConfig:o,hasService:n,hasProf:i}),s&&o&&i&&n)return;if(!s)ee=0;else if(!r&&!o)ee=1;else if(!o)ee=2;else if(!n)ee=3;else if(!i)ee=4;else if(ee===0)return;fr(),wa(ee)}catch(e){console.error("Erro ao verificar onboarding:",e)}}function fr(){document.getElementById("onboarding-overlay")||(ue=document.createElement("div"),ue.id="onboarding-overlay",ue.className="fixed inset-0 bg-gray-900 bg-opacity-95 z-[9999] flex items-center justify-center p-4 overflow-y-auto",ue.style.cssText="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background-color: rgba(17, 24, 39, 0.95); z-index: 9999; display: flex; align-items: center; justify-content: center;",ue.innerHTML=`
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
    `,document.body.appendChild(ue),ya())}function ya(){const e=Math.round(ee/$t.length*100),t=document.getElementById("progress-bar"),a=document.getElementById("progress-text");t&&(t.style.width=`${e}%`),a&&(a.innerText=`${e}%`)}function wa(e){const t=document.getElementById("onboarding-step-content"),a=$t[e];if(!a){Ja(t);return}let s="";if(a.id==="company_data")s=`
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
                            ${Object.entries(gr).map(([o,n])=>`<option value="${o}">${n.name}</option>`).join("")}
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
    `,document.getElementById("next-step-btn").addEventListener("click",()=>vr(a.id)),document.getElementById("skip-btn")&&document.getElementById("skip-btn").addEventListener("click",()=>{e===$t.length-1?Ja(t):(ee++,ya(),wa(ee))}),a.id==="branding"){const r=document.getElementById("logo-input"),o=document.getElementById("bg-input");r&&(r.onchange=async n=>{const i=n.target.files[0];if(i)try{const l=await Wa(i,200,.8);document.getElementById("logo-base64").value=l,document.getElementById("logo-preview").innerHTML=`<img src="${l}" class="w-full h-full object-contain rounded">`}catch(l){console.error("Erro logo",l)}}),o&&(o.onchange=async n=>{const i=n.target.files[0];if(i)try{const l=await Wa(i,1024,.7);document.getElementById("bg-base64").value=l}catch(l){console.error("Erro bg",l)}})}}function Ja(e){e.innerHTML=`
        <div class="text-center py-6">
            <div class="text-5xl mb-3">🏆</div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">Tudo Pronto!</h3>
            <p class="text-gray-600 text-sm mb-6">Seu sistema está configurado. Boas vendas!</p>
            <button id="finish-onboarding-btn" class="bg-indigo-600 text-white font-bold py-2 px-6 rounded-full hover:bg-indigo-700 transition shadow-lg transform hover:scale-105 text-sm">
                Acessar Painel
            </button>
        </div>
    `;const t=document.getElementById("progress-bar"),a=document.getElementById("progress-text");t&&(t.style.width="100%"),a&&(a.innerText="100%"),document.getElementById("finish-onboarding-btn").onclick=()=>{ue&&ue.remove(),window.location.reload()}}async function vr(e){const t=document.getElementById("step-form");if(!t.reportValidity())return;const a=document.getElementById("next-step-btn"),s=a.innerHTML;a.disabled=!0,a.innerHTML="Salvando...";const r=new FormData(t),o=Object.fromEntries(r.entries());try{if(e==="company_data")await St(u.establishmentId,{name:o.name,phone:o.phone,email:o.email,address:o.address,zipCode:o.zipCode});else if(e==="branding"){const n={};o.logoBase64&&(n.logo=o.logoBase64),o.bgBase64&&(n.backgroundImage=o.bgBase64),o.themeColor&&(n.themeColor=o.themeColor),o.primaryColor&&(n.primaryColor=o.primaryColor),Object.keys(n).length>0&&await St(u.establishmentId,n)}else if(e==="time_config"){const n=parseInt(o.slotInterval);await St(u.establishmentId,{slotInterval:n})}else if(e==="first_service"){const n=await Ho({establishmentId:u.establishmentId,name:o.name,price:parseFloat(o.price),duration:parseInt(o.duration),active:!0});n&&Tt.push(n)}else if(e==="first_prof"){const n=await jo({establishmentId:u.establishmentId,name:o.name,specialty:o.role,active:!0,commissionRate:0});if(o.serviceId&&n&&n.id)try{_a?await _a(n.id,[o.serviceId]):Lt&&await Lt(n.id,{services:[o.serviceId]})}catch(i){console.warn("Não foi possível vincular o serviço automaticamente.",i)}}else e==="first_product"&&await Oo({establishmentId:u.establishmentId,name:o.name,price:parseFloat(o.salePrice),stock:parseInt(o.stock),active:!0});p("Sucesso","Passo concluído!","success"),ee++,ya(),wa(ee)}catch(n){p("Erro","Erro ao salvar: "+n.message,"error"),a.disabled=!1,a.innerHTML=s}}var je;(function(e){e.Unimplemented="UNIMPLEMENTED",e.Unavailable="UNAVAILABLE"})(je||(je={}));class Xt extends Error{constructor(t,a,s){super(t),this.message=t,this.code=a,this.data=s}}const hr=e=>{var t,a;return e?.androidBridge?"android":!((a=(t=e?.webkit)===null||t===void 0?void 0:t.messageHandlers)===null||a===void 0)&&a.bridge?"ios":"web"},xr=e=>{const t=e.CapacitorCustomPlatform||null,a=e.Capacitor||{},s=a.Plugins=a.Plugins||{},r=()=>t!==null?t.name:hr(e),o=()=>r()!=="web",n=m=>{const g=d.get(m);return!!(g?.platforms.has(r())||i(m))},i=m=>{var g;return(g=a.PluginHeaders)===null||g===void 0?void 0:g.find(b=>b.name===m)},l=m=>e.console.error(m),d=new Map,c=(m,g={})=>{const b=d.get(m);if(b)return console.warn(`Capacitor plugin "${m}" already registered. Cannot register plugins twice.`),b.proxy;const h=r(),v=i(m);let x;const w=async()=>(!x&&h in g?x=typeof g[h]=="function"?x=await g[h]():x=g[h]:t!==null&&!x&&"web"in g&&(x=typeof g.web=="function"?x=await g.web():x=g.web),x),S=(P,B)=>{var A,M;if(v){const F=v?.methods.find(j=>B===j.name);if(F)return F.rtype==="promise"?j=>a.nativePromise(m,B.toString(),j):(j,U)=>a.nativeCallback(m,B.toString(),j,U);if(P)return(A=P[B])===null||A===void 0?void 0:A.bind(P)}else{if(P)return(M=P[B])===null||M===void 0?void 0:M.bind(P);throw new Xt(`"${m}" plugin is not implemented on ${h}`,je.Unimplemented)}},k=P=>{let B;const A=(...M)=>{const F=w().then(j=>{const U=S(j,P);if(U){const ie=U(...M);return B=ie?.remove,ie}else throw new Xt(`"${m}.${P}()" is not implemented on ${h}`,je.Unimplemented)});return P==="addListener"&&(F.remove=async()=>B()),F};return A.toString=()=>`${P.toString()}() { [capacitor code] }`,Object.defineProperty(A,"name",{value:P,writable:!1,configurable:!1}),A},E=k("addListener"),L=k("removeListener"),D=(P,B)=>{const A=E({eventName:P},B),M=async()=>{const j=await A;L({eventName:P,callbackId:j},B)},F=new Promise(j=>A.then(()=>j({remove:M})));return F.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await M()},F},H=new Proxy({},{get(P,B){switch(B){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return v?D:E;case"removeListener":return L;default:return k(B)}}});return s[m]=H,d.set(m,{name:m,proxy:H,platforms:new Set([...Object.keys(g),...v?[h]:[]])}),H};return a.convertFileSrc||(a.convertFileSrc=m=>m),a.getPlatform=r,a.handleError=l,a.isNativePlatform=o,a.isPluginAvailable=n,a.registerPlugin=c,a.Exception=Xt,a.DEBUG=!!a.DEBUG,a.isLoggingEnabled=!!a.isLoggingEnabled,a},yr=e=>e.Capacitor=xr(e),oe=yr(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),Ht=oe.registerPlugin;class zo{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(t,a){let s=!1;this.listeners[t]||(this.listeners[t]=[],s=!0),this.listeners[t].push(a);const o=this.windowListeners[t];o&&!o.registered&&this.addWindowListener(o),s&&this.sendRetainedArgumentsForEvent(t);const n=async()=>this.removeListener(t,a);return Promise.resolve({remove:n})}async removeAllListeners(){this.listeners={};for(const t in this.windowListeners)this.removeWindowListener(this.windowListeners[t]);this.windowListeners={}}notifyListeners(t,a,s){const r=this.listeners[t];if(!r){if(s){let o=this.retainedEventArguments[t];o||(o=[]),o.push(a),this.retainedEventArguments[t]=o}return}r.forEach(o=>o(a))}hasListeners(t){var a;return!!(!((a=this.listeners[t])===null||a===void 0)&&a.length)}registerWindowListener(t,a){this.windowListeners[a]={registered:!1,windowEventName:t,pluginEventName:a,handler:s=>{this.notifyListeners(a,s)}}}unimplemented(t="not implemented"){return new oe.Exception(t,je.Unimplemented)}unavailable(t="not available"){return new oe.Exception(t,je.Unavailable)}async removeListener(t,a){const s=this.listeners[t];if(!s)return;const r=s.indexOf(a);this.listeners[t].splice(r,1),this.listeners[t].length||this.removeWindowListener(this.windowListeners[t])}addWindowListener(t){window.addEventListener(t.windowEventName,t.handler),t.registered=!0}removeWindowListener(t){t&&(window.removeEventListener(t.windowEventName,t.handler),t.registered=!1)}sendRetainedArgumentsForEvent(t){const a=this.retainedEventArguments[t];a&&(delete this.retainedEventArguments[t],a.forEach(s=>{this.notifyListeners(t,s)}))}}const Ga=e=>encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),Ya=e=>e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent);class wr extends zo{async getCookies(){const t=document.cookie,a={};return t.split(";").forEach(s=>{if(s.length<=0)return;let[r,o]=s.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");r=Ya(r).trim(),o=Ya(o).trim(),a[r]=o}),a}async setCookie(t){try{const a=Ga(t.key),s=Ga(t.value),r=`; expires=${(t.expires||"").replace("expires=","")}`,o=(t.path||"/").replace("path=",""),n=t.url!=null&&t.url.length>0?`domain=${t.url}`:"";document.cookie=`${a}=${s||""}${r}; path=${o}; ${n};`}catch(a){return Promise.reject(a)}}async deleteCookie(t){try{document.cookie=`${t.key}=; Max-Age=0`}catch(a){return Promise.reject(a)}}async clearCookies(){try{const t=document.cookie.split(";")||[];for(const a of t)document.cookie=a.replace(/^ +/,"").replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(t){return Promise.reject(t)}}async clearAllCookies(){try{await this.clearCookies()}catch(t){return Promise.reject(t)}}}Ht("CapacitorCookies",{web:()=>new wr});const kr=async e=>new Promise((t,a)=>{const s=new FileReader;s.onload=()=>{const r=s.result;t(r.indexOf(",")>=0?r.split(",")[1]:r)},s.onerror=r=>a(r),s.readAsDataURL(e)}),Sr=(e={})=>{const t=Object.keys(e);return Object.keys(e).map(r=>r.toLocaleLowerCase()).reduce((r,o,n)=>(r[o]=e[t[n]],r),{})},$r=(e,t=!0)=>e?Object.entries(e).reduce((s,r)=>{const[o,n]=r;let i,l;return Array.isArray(n)?(l="",n.forEach(d=>{i=t?encodeURIComponent(d):d,l+=`${o}=${i}&`}),l.slice(0,-1)):(i=t?encodeURIComponent(n):n,l=`${o}=${i}`),`${s}&${l}`},"").substr(1):null,Er=(e,t={})=>{const a=Object.assign({method:e.method||"GET",headers:e.headers},t),r=Sr(e.headers)["content-type"]||"";if(typeof e.data=="string")a.body=e.data;else if(r.includes("application/x-www-form-urlencoded")){const o=new URLSearchParams;for(const[n,i]of Object.entries(e.data||{}))o.set(n,i);a.body=o.toString()}else if(r.includes("multipart/form-data")||e.data instanceof FormData){const o=new FormData;if(e.data instanceof FormData)e.data.forEach((i,l)=>{o.append(l,i)});else for(const i of Object.keys(e.data))o.append(i,e.data[i]);a.body=o;const n=new Headers(a.headers);n.delete("content-type"),a.headers=n}else(r.includes("application/json")||typeof e.data=="object")&&(a.body=JSON.stringify(e.data));return a};class Ir extends zo{async request(t){const a=Er(t,t.webFetchExtra),s=$r(t.params,t.shouldEncodeUrlParams),r=s?`${t.url}?${s}`:t.url,o=await fetch(r,a),n=o.headers.get("content-type")||"";let{responseType:i="text"}=o.ok?t:{};n.includes("application/json")&&(i="json");let l,d;switch(i){case"arraybuffer":case"blob":d=await o.blob(),l=await kr(d);break;case"json":l=await o.json();break;case"document":case"text":default:l=await o.text()}const c={};return o.headers.forEach((m,g)=>{c[g]=m}),{data:l,headers:c,status:o.status,url:o.url}}async get(t){return this.request(Object.assign(Object.assign({},t),{method:"GET"}))}async post(t){return this.request(Object.assign(Object.assign({},t),{method:"POST"}))}async put(t){return this.request(Object.assign(Object.assign({},t),{method:"PUT"}))}async patch(t){return this.request(Object.assign(Object.assign({},t),{method:"PATCH"}))}async delete(t){return this.request(Object.assign(Object.assign({},t),{method:"DELETE"}))}}Ht("CapacitorHttp",{web:()=>new Ir});const Y=Ht("PushNotifications",{}),Cr="modulepreload",Lr=function(e){return"/"+e},Qa={},Tr=function(t,a,s){let r=Promise.resolve();if(a&&a.length>0){let l=function(d){return Promise.all(d.map(c=>Promise.resolve(c).then(m=>({status:"fulfilled",value:m}),m=>({status:"rejected",reason:m}))))};document.getElementsByTagName("link");const n=document.querySelector("meta[property=csp-nonce]"),i=n?.nonce||n?.getAttribute("nonce");r=l(a.map(d=>{if(d=Lr(d),d in Qa)return;Qa[d]=!0;const c=d.endsWith(".css"),m=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${m}`))return;const g=document.createElement("link");if(g.rel=c?"stylesheet":Cr,c||(g.as="script"),g.crossOrigin="",g.href=d,i&&g.setAttribute("nonce",i),document.head.appendChild(g),c)return new Promise((b,h)=>{g.addEventListener("load",b),g.addEventListener("error",()=>h(new Error(`Unable to preload CSS for ${d}`)))})}))}function o(n){const i=new Event("vite:preloadError",{cancelable:!0});if(i.payload=n,window.dispatchEvent(i),!i.defaultPrevented)throw n}return r.then(n=>{for(const i of n||[])i.status==="rejected"&&o(i.reason);return t().catch(o)})},Xa=Ht("App",{web:()=>Tr(()=>import("./web-Bz1asRFh.js"),__vite__mapDeps([0,1,2,3])).then(e=>new e.AppWeb)}),Pr="BDA-IaH_jjWBRwHbuFcB56I25jKHpchx34yZtv_6iIo_yV2tz_yIZYS3hfntDaN5Slf4ch8ZEJCIt4D7LIWX4mY";let Za=!1;async function Vo(){if(window.Capacitor&&window.Capacitor.isNativePlatform()){try{await Y.removeAllListeners(),await Y.addListener("registration",async a=>{Wo(a.value,!0)}),await Y.addListener("pushNotificationReceived",a=>{console.log("[Push Nativo] Recebido em Foreground (Visual gerido pelo Firestore):",a)}),await Y.addListener("pushNotificationActionPerformed",a=>{const s=a.notification.data;console.log("Notificação clicada (Ação):",s)});let t=await Y.checkPermissions();t.receive==="prompt"&&(t=await Y.requestPermissions()),t.receive==="granted"&&await Y.register()}catch(t){console.error("[Push Nativo] Erro:",t)}return}"Notification"in window&&Notification.permission==="granted"&&_o()}async function Uo(){try{return await Notification.requestPermission()==="granted"?(console.log("Permissão concedida pelo utilizador."),await _o(),!0):(console.warn("Permissão de notificações negada."),!1)}catch(e){return console.error("Erro ao pedir permissão Web:",e),!1}}async function _o(){if("serviceWorker"in navigator)try{const e=await navigator.serviceWorker.register("/firebase-messaging-sw.js");await e.update();const t=await Hs(Fa,{vapidKey:Pr,serviceWorkerRegistration:e});t?(console.log("[Push Web] Token validado."),await Wo(t,!1)):console.warn("[Push Web] Token veio vazio."),Za||(Os(Fa,a=>{console.log("[Push Web] Recebido em Foreground (Silencioso):",a)}),Za=!0)}catch(e){console.error("[Push Web] Falha no registo:",e)}else console.warn("Navegador sem suporte a Service Worker.")}async function Wo(e,t){const a=_.currentUser;if(!a){console.warn("Usuário não logado. Token não salvo.");return}const s=pe(W,"users",a.uid);try{const r=await Do(s);if(r.exists()){const n=r.data().fcmTokens||[];if(n.length===1&&n[0]===e){console.log("Token já sincronizado e único. Nenhuma ação necessária.");return}}await ha(s,{fcmTokens:[e],lastLoginAt:new Date().toISOString(),platform:t?"android_native":"pwa_web"}),console.log("Token atualizado (Sessão Única garantida).")}catch(r){if(r.code==="not-found")try{await Ns(s,{email:a.email,fcmTokens:[e],platform:t?"android_native":"pwa_web",createdAt:new Date().toISOString()},{merge:!0}),console.log("Utilizador criado e token inicial salvo.")}catch(o){console.error("Erro ao criar user:",o)}else console.error("Erro ao atualizar token:",r)}}const Br=(e,t,a="all",s="all")=>{const r=new URLSearchParams({startDate:e,endDate:t});return a&&a!=="all"&&r.append("professionalId",a),s&&s!=="all"&&r.append("costCenterId",s),$(`/api/reports/indicators?${r.toString()}`)},Dr=e=>e?$(`/api/financial/cost-centers/${e}`):Promise.resolve([]),Mr=({establishmentId:e,startDate:t,endDate:a,cashierSessionId:s})=>{const r=new URLSearchParams({startDate:t,endDate:a});return s&&s!=="all"&&r.append("cashierSessionId",s),e&&r.append("establishmentId",e),$(`/api/reports/sales?${r.toString()}`)},Ar=()=>$("/api/reports/summary",{method:"GET"}),Ot=(e,t,a,s="all")=>{const r=`/api/blockages/${e}?startDate=${t}&endDate=${a}&professionalId=${s}`;return $(r)},zt=e=>$("/api/blockages",{method:"POST",body:JSON.stringify(e)}),ka=e=>$(`/api/blockages/${e}`,{method:"DELETE"}),Jo=e=>$("/api/blockages/batch-delete",{method:"POST",body:JSON.stringify({ids:e})}),Sa=e=>e?String(e).replace(/\D/g,""):"",dt=(e,t="",a=20,s={})=>{const r=new URLSearchParams;return t&&r.append("search",t),a&&r.append("limit",a),s&&s.hasLoyalty&&r.append("hasLoyalty","true"),s&&s.birthMonth&&r.append("birthMonth",s.birthMonth),s&&s.inactiveDays&&r.append("inactiveDays",s.inactiveDays),$(`/api/clients/${e}?${r.toString()}`)},Go=(e,t)=>{const a=encodeURIComponent(t);return $(`/api/clients/details/${e}/${a}`)},Yo=e=>{const t=e.phone||e.id;if(!t)throw new Error("Telefone é obrigatório");const a=Sa(t),s={...e,phone:a,id:a};return $(`/api/clients/${a}`,{method:"PUT",body:JSON.stringify(s)})},$a=Yo,Qo=(e,t)=>Yo({...t,id:e}),qr=e=>{const t=encodeURIComponent(e);return $(`/api/clients/${t}`,{method:"DELETE"})},Nr=(e,t,a,s)=>$("/api/clients/redeem",{method:"POST",body:JSON.stringify({establishmentId:e,clientPhone:Sa(t),points:a,rewardName:s})}),Rr=(e,t)=>Go(e,Sa(t));function f(e){return e==null?"":String(e).replace(/[&<>'"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[t])}function Xo(e,t=800,a=800,s=.7){return new Promise((r,o)=>{if(!e.type.match(/image.*/))return o(new Error("O ficheiro selecionado não é uma imagem."));const n=new FileReader;n.readAsDataURL(e),n.onload=i=>{const l=new Image;l.src=i.target.result,l.onload=()=>{let d=l.width,c=l.height;d>c?d>t&&(c*=t/d,d=t):c>a&&(d*=a/c,c=a);const m=document.createElement("canvas");m.width=d,m.height=c,m.getContext("2d").drawImage(l,0,0,d,c);const b=m.toDataURL("image/jpeg",s);r(b)},l.onerror=d=>o(new Error("Erro ao carregar a imagem para processamento."))},n.onerror=i=>o(new Error("Erro ao ler o ficheiro."))})}const Ka=document.getElementById("content");let eo=!1;const la=[{bg:"#e0e7ff",border:"#4f46e5",main:"#4f46e5"},{bg:"#d1fae5",border:"#059669",main:"#059669"},{bg:"#ffe4e6",border:"#e11d48",main:"#e11d48"},{bg:"#fef3c7",border:"#d97706",main:"#d97706"},{bg:"#cffafe",border:"#0e7490",main:"#0e7490"},{bg:"#e0f2fe",border:"#0284c7",main:"#0284c7"},{bg:"#ede9fe",border:"#7c3aed",main:"#7c3aed"},{bg:"#fce7f3",border:"#db2777",main:"#db2777"}];let ct=[],Vt=[],Fe={},Ae=[],T={currentView:"list",weekViewDays:7,currentDate:new Date,selectedProfessionalId:"all",profSearchTerm:"",showInactiveProfs:!1,scrollToAppointmentId:null,isSelectionMode:!1,selectedItems:new Set},C={step:1,data:{id:null,clientName:"",clientPhone:"",selectedServiceIds:[],professionalId:null,professionalName:"",date:null,time:null,redeemedReward:null,clientHasRewards:!1,clientLoyaltyPoints:0}};function jr(e){return new Intl.DateTimeFormat("pt-BR",{weekday:"short",day:"2-digit",month:"short"}).format(e).replace(/\./g,"")}function Zo(e){const t=new Date(e);if(t.setHours(0,0,0,0),T.currentView==="week"&&T.weekViewDays===7){const a=t.getDay(),s=t.getDate()-a+(a===0?-6:1);return new Date(t.setDate(s))}return t}function Pt(){const e=document.getElementById("profSelectorContainer"),t=T.profSearchTerm.toLowerCase();if(!e||!u.professionals)return;let a=u.professionals.filter(o=>T.showInactiveProfs||o.status!=="inactive");t&&(a=a.filter(o=>o.name.toLowerCase().includes(t)));const r=[...[{id:"all",name:"Todos",photo:null,status:"active"}],...a];e.innerHTML=r.map(o=>{const n=T.selectedProfessionalId===o.id,i=o.name==="Todos"?"Todos":o.name.split(" ")[0],l=o.name==="Todos"?"T":o.name.charAt(0).toUpperCase(),d=o.status!=="inactive",c=f(i),m=la[0],g=o.id!=="all"&&u.professionalColors.get(o.id)||m,b=o.photo||`https://placehold.co/64x64/${g.main?.replace("#","")||"E0E7FF"}/${g.light?.replace("#","")||"4F46E5"}?text=${l}`,h=o.id==="all"?"#e0e7ff":g.light,v=o.id==="all"?"#4f46e5":g.main,w=`border: 3px solid ${n?g.border:"transparent"}; box-shadow: ${n?"0 0 0 2px "+g.border:"none"};`;return`
            <div class="prof-card ${n?"selected":""} ${d?"":"opacity-50"}" 
                 data-action="select-professional" 
                 data-prof-id="${o.id}">
                ${o.id==="all"?`<div class="prof-card-all-placeholder" style="background-color: ${h}; color: ${v}; ${w}">
                           ${l}
                          </div>`:`<img src="${b}" alt="${c}" class="prof-card-photo" style="${w}" />`}
                <span class="prof-card-name">${c}</span>
            </div>
        `}).join("")}function Fr(e,t,a,s,r){const o=(e||"").replace(/\D/g,""),n=new Date(r).toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit"}),i=new Date(r).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),l=`Olá, ${t}! Você tem um agendamento de ${a} com o(a) profissional ${s} para o dia ${n} às ${i}. Podemos confirmar? Agradecemos a preferência!`,d=encodeURIComponent(l);return`https://wa.me/${o}?text=${d}`}function Hr(e){const t=document.getElementById("agenda-view");if(!t)return;if(e.sort((s,r)=>new Date(s.startTime)-new Date(r.startTime)),e.length===0){t.innerHTML='<div class="text-center p-10 text-gray-500"><svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path vector-effect="non-scaling-stroke" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg><h3 class="mt-2 text-sm font-medium text-gray-900">Nenhum agendamento ou bloqueio</h3><p class="mt-1 text-sm text-gray-500">Não há eventos para o dia e filtros selecionados.</p></div>';return}const a=e.map(s=>{const r=new Date(s.startTime),o=new Date(s.endTime),n=r.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),i=o.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),l=u.professionalColors.get(s.professionalId)||{},d=f(s.reason),c=f(s.professionalName),m=f(s.clientName),g=f(s.serviceName),b=T.selectedItems.has(s.id),h=T.isSelectionMode?`<div class="flex items-center justify-center pr-3 border-r border-gray-200 mr-3">
                 <input type="checkbox" class="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 cursor-pointer" 
                        data-action="toggle-select-item" 
                        data-id="${s.id}" 
                        ${b?"checked":""}>
               </div>`:"";if(s.type==="blockage")return`
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
                </div>`;const v=s.status==="completed",x=v?"bg-green-100 text-green-800":"bg-yellow-100 text-yellow-800",w=v?"Finalizado":"Aberto",S=JSON.stringify(s).replace(/'/g,"&apos;"),k=s.redeemedReward?.points>0,E=s.hasRewards&&!k,L=Fr(s.clientPhone,s.clientName,s.serviceName,s.professionalName,s.startTime),D=T.isSelectionMode?"":'data-action="open-comanda"';return`
            <div class="appointment-list-card" data-appointment='${S}' style="border-left-color: ${l.border};">
                
                ${h}

                <div class="time-info" ${D}>
                    <p class="font-bold text-md">${n}</p>
                    <p class="text-xs text-gray-500">${i}</p>
                </div>

                <div class="details-info min-w-0" ${D}>
                    <p class="font-bold text-gray-800 truncate">${E?"🎁 ":""}${m}</p>
                    <p class="text-sm text-gray-600 truncate">${g}</p>
                    <p class="text-xs text-gray-500 truncate">com ${c||"Indefinido"}</p>
                    
                    ${k?'<p class="text-xs font-semibold text-purple-600">Resgate de Prémio</p>':""}
                </div>

                <div class="status-info">
                    <span class="status-badge ${x} mb-1">${w}</span>
                    <div class="card-actions flex gap-1 items-center">
                        ${v?`
                            <button data-action="edit-appointment" data-appointment='${S}' class="action-btn opacity-40 cursor-not-allowed" title="Finalizado - Não editável" disabled><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z"></path></svg></button>
                        `:`
                            <a href="${L}" target="_blank" class="action-btn text-green-500 hover:text-green-700 p-1" title="Enviar Confirmação WhatsApp">
                                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12.036 2a10 10 0 100 20 10 10 0 000-20zM17.5 14.8c-.24.125-1.465.716-1.696.804-.23.09-.49.135-.75.045-.26-.09-.982-.322-1.87-.965-.888-.643-1.474-1.442-1.64-1.748-.166-.307-.015-.467.106-.615.116-.149.23-.388.344-.582.113-.193.15-.327.1-.462-.05-.136-.264-.322-.544-.654-.28-.332-.572-.782-.828-.958-.255-.176-.438-.158-.61-.158-.173 0-.374-.022-.574-.022-.2 0-.54.075-.826.375-.285.3-.99.965-.99 2.355 0 1.43 1.018 2.872 1.16 3.072.14.2 2 3.047 4.86 4.218 2.86 1.17 2.86.786 3.376 1.054.516.268 1.49.462 1.696.406.206-.057 1.463-.615 1.67-.887.2-.27.2-.504.14-.615-.058-.11-.23-.166-.48-.306z"/></svg>
                            </a>
                            <button data-action="edit-appointment" data-appointment='${S}' class="action-btn" title="Editar Agendamento"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z"></path></svg></button>
                        `}
                        <button data-action="delete-appointment" data-id="${s.id}" class="action-btn" title="Apagar Agendamento"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
                    </div>
                </div>
            </div>`}).join("");t.innerHTML=`<div class="list-view-container space-y-2 pb-24">${a}</div>`}function Ea(){return window.innerWidth<768&&T.currentView==="week"?3:T.weekViewDays}function Or(e){const t=document.getElementById("agenda-view");if(!t)return;const a=["Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sábado"],s=Zo(T.currentDate),r=Ea();let o=`<div class="grid divide-x divide-gray-200 min-h-[60vh]" style="grid-template-columns: repeat(${r}, minmax(0, 1fr));">`;for(let n=0;n<r;n++){const i=new Date(s);i.setDate(i.getDate()+n);const l=new Date,d=i.toDateString()===l.toDateString(),c=e.filter(g=>new Date(g.startTime).toDateString()===i.toDateString()).sort((g,b)=>new Date(g.startTime)-new Date(b.startTime));let m='<div class="p-1 space-y-2">';c.length>0?m+=c.map(g=>{const h=new Date(g.startTime).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),v=u.professionalColors.get(g.professionalId)||{bg:"#e5e7eb",border:"#9ca3af"},x=f(g.reason),w=f(g.professionalName),S=f(g.clientName),k=f(g.serviceName);if(g.type==="blockage")return`
                        <div class="p-2 rounded-lg border-l-4 flex flex-col bg-red-100" style="border-left-color: ${v.border};">
                            <span class="font-bold text-xs text-red-900">${h}</span>
                            <div class="mt-1 min-w-0">
                                <p class="font-semibold text-sm text-red-800 truncate">${x}</p>
                                <p class="text-xs text-red-600 truncate">com ${w}</p>
                            </div>
                        </div>
                    `;const E=JSON.stringify(g).replace(/'/g,"&apos;"),L=g.redeemedReward?.points>0,D=g.hasRewards&&!L,H=g.status==="completed";return`
                    <div class="p-2 rounded-lg border-l-4 flex flex-col cursor-pointer" 
                         style="background-color: ${v.bg}; border-left-color: ${v.border};"
                         data-action="open-comanda" data-appointment='${E}'>
                        
                        <div class="flex justify-between items-center">
                            <span class="font-bold text-xs text-gray-900">${h}</span>
                            ${H?'<span class="text-[10px] font-semibold bg-green-200 text-green-800 px-1 rounded-sm">OK</span>':""}
                        </div>

                        <div class="mt-1 min-w-0">
                            <p class="font-semibold text-sm text-gray-800 truncate">${D?"🎁 ":""}${S}</p>
                            <p class="text-xs text-gray-600 truncate">${k}</p>
                            <p class="text-xs text-gray-500 truncate">com ${w||"Indefinido"}</p>
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
        `}o+="</div>",t.innerHTML=o}function Ko(){const e=u.allEvents.filter(t=>T.selectedProfessionalId==="all"||t.professionalId===T.selectedProfessionalId);T.currentView==="list"?Hr(e):Or(e),Ia()}function Ia(){const e=document.getElementById("batch-delete-container"),t=document.querySelector('[data-action="new-appointment"]');e&&(T.isSelectionMode&&T.selectedItems.size>0?(e.innerHTML=`
            <div class="bg-white p-4 rounded-xl shadow-2xl border border-red-100 flex items-center justify-between gap-4">
                <span class="font-bold text-gray-800">${T.selectedItems.size} selecionado(s)</span>
                <button data-action="batch-delete" class="bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 shadow-md flex items-center gap-2">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    Excluir
                </button>
            </div>
        `,e.style.display="block",t&&(t.style.display="none")):(e.style.display="none",t&&(t.style.display="flex")))}async function ae(){const e=document.getElementById("agenda-view");if(!e)return;T.selectedItems.clear(),Ia(),e.innerHTML='<div class="loader mx-auto my-10"></div>';let t,a;const s=document.getElementById("weekRange");if(s){if(T.currentView==="list")t=new Date(T.currentDate),t.setHours(0,0,0,0),a=new Date(T.currentDate),a.setHours(23,59,59,999),s.textContent=jr(t);else{const r=Ea();t=Zo(new Date(T.currentDate)),a=new Date(t),a.setDate(t.getDate()+(r-1)),a.setHours(23,59,59,999),s.textContent=`${t.toLocaleDateString("pt-BR",{day:"2-digit",month:"short"})} - ${a.toLocaleDateString("pt-BR",{day:"2-digit",month:"short"})}`}try{const r=await Ro(u.establishmentId,t.toISOString(),a.toISOString(),T.selectedProfessionalId==="all"?null:T.selectedProfessionalId),o=await Ot(u.establishmentId,t.toISOString(),a.toISOString(),T.selectedProfessionalId);if(!document.getElementById("agenda-view"))return;const n=o.map(l=>{let d=l.professionalName;if(!d&&l.professionalId){const c=u.professionals?u.professionals.find(m=>m.id===l.professionalId):null;c&&(d=c.name)}return{...l,type:"blockage",professionalName:d||"Não identificado"}}),i=[...r.map(l=>({...l,type:"appointment"})),...n];if(u.allEvents=i,Pt(),Ko(),T.scrollToAppointmentId){const l=document.querySelector(`[data-appointment*='"id":"${T.scrollToAppointmentId}"']`);l&&(l.scrollIntoView({behavior:"smooth",block:"center"}),l.style.transition="background-color 0.5s ease-in-out",l.style.backgroundColor="#e0e7ff",setTimeout(()=>{l.style.backgroundColor=""},2500)),T.scrollToAppointmentId=null}}catch(r){document.getElementById("agenda-view")&&(document.getElementById("agenda-view").innerHTML='<div class="p-6 text-center text-red-600">Falha ao carregar dados.</div>',p("Erro na Agenda",`Não foi possível carregar a agenda: ${r.message}`,"error"))}}}async function zr(){try{const[e,t,a]=await Promise.all([u.professionals&&u.professionals.length>0?Promise.resolve(u.professionals):K(u.establishmentId),u.services&&u.services.length>0?Promise.resolve(u.services):be(u.establishmentId),Fe.enabled!==void 0?Promise.resolve(null):Ee(u.establishmentId)]);(!u.professionals||u.professionals.length===0)&&(u.professionals=e||[]),(!u.services||u.services.length===0)&&(u.services=t||[]),Ae=[],a&&(Fe=a.loyaltyProgram||{enabled:!1}),u.professionals.forEach((s,r)=>{u.professionalColors.set(s.id,la[r%la.length])}),Pt()}catch(e){console.error("Erro ao popular filtros e dependências do modal:",e),p("Atenção","Não foi possível pré-carregar os dados para agendamento. A abertura do modal pode ser lenta.","error")}}function da(e){e<1||e>4||(C.step=e,ca(null,!0))}function es(e,t){const a=document.getElementById("multiServiceToggle"),s=a&&a.checked,r=t.classList.contains("selected"),o=C.data.selectedServiceIds.indexOf(e);if(r)t.classList.remove("selected","border-blue-500"),o>-1&&C.data.selectedServiceIds.splice(o,1);else{if(!s){C.data.selectedServiceIds=[];const n=document.getElementById("apptServicesContainer");n&&n.querySelectorAll(".service-card.selected").forEach(i=>{i.classList.remove("selected","border-blue-500")})}t.classList.add("selected","border-blue-500"),C.data.selectedServiceIds.push(e)}}function ts(e,t){const a=document.querySelector(".professional-step-cards");if(!a)return;a.querySelectorAll(".professional-modal-card").forEach(r=>r.classList.remove("selected","border-blue-500")),t.classList.add("selected","border-blue-500");const s=Vt.find(r=>r.id===e);C.data.professionalId=e,C.data.professionalName=s?s.name:"N/A"}function Vr(e,t){const a=document.getElementById("availableTimesContainer");a&&(a.querySelectorAll(".time-slot-card").forEach(s=>s.classList.remove("selected")),t.classList.add("selected"),C.data.time=e)}async function to(){const e=document.getElementById("apptTotalDuration"),t=document.getElementById("availableTimesContainer");if(!e||!t)return;const a=C.data.professionalId,s=C.data.selectedServiceIds,r=document.getElementById("apptDate").value;C.data.date=r;const o=s.reduce((n,i)=>{const l=ct.find(d=>d.id===i);return n+(l?l.duration+(l.bufferTime||0):0)},0);if(e.textContent=`${o} min`,o===0||!a||!r){t.innerHTML='<p class="col-span-full text-center text-gray-500">Selecione serviço, profissional e data.</p>';return}t.innerHTML='<div class="loader mx-auto col-span-full"></div>';try{let n=await Us({establishmentId:u.establishmentId,professionalId:a,serviceIds:s,date:r});const i=new Date;if(new Date(r+"T00:00:00").toDateString()===i.toDateString()){const d=i.getHours()*60+i.getMinutes();n=n.filter(c=>{const[m,g]=c.split(":").map(Number);return m*60+g>=d})}if(t.innerHTML="",n.length>0){if(n.forEach(d=>{const c=document.createElement("button");c.type="button",c.className=`time-slot-card p-2 text-sm bg-gray-100 rounded-md hover:bg-gray-200 transition ${C.data.time===d?"selected":""}`,c.textContent=d,c.addEventListener("click",()=>Vr(d,c)),t.appendChild(c)}),C.data.time){const d=t.querySelector(`[data-action="time-slot"][data-time="${C.data.time}"]`);d&&d.classList.add("selected")}}else t.innerHTML='<p class="col-span-full text-center text-gray-500">Nenhum horário disponível.</p>'}catch(n){console.error("Erro ao buscar horários:",n),t.innerHTML='<p class="col-span-full text-center text-red-500">Erro ao buscar horários.</p>'}}function Ur(){const e=document.getElementById("loyaltyRewardsContainer");if(!e)return;const{clientHasRewards:t,clientLoyaltyPoints:a,redeemedReward:s}=C.data,{enabled:r,rewards:o}=Fe;if(!r||!t||!o||o.length===0){e.classList.add("hidden"),e.innerHTML="";return}e.classList.remove("hidden");const n=o.filter(l=>a>=l.points);let i=`
        <h4 class="text-md font-semibold text-gray-700 mb-2">🎁 Prêmios Disponíveis (${a} pontos)</h4>
    `;n.length>0?(i+='<div class="space-y-2">',i+=n.map(l=>{const d=s?.reward===l.reward,c=f(l.reward);return`
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
            `}).join(""),i+="</div>"):i+='<p class="text-sm text-gray-600">Pontos insuficientes para resgatar os prêmios disponíveis.</p>',e.innerHTML=i,e.querySelectorAll('input[name="loyaltyReward"]').forEach(l=>{l.addEventListener("change",d=>{d.target.checked&&(C.data.redeemedReward={reward:d.target.value,points:parseInt(d.target.dataset.points,10)})})}),e.insertAdjacentHTML("beforeend",`
        <label class="flex items-center p-3 mt-2 bg-white rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-50">
            <input type="radio" name="loyaltyReward" class="form-radio text-gray-400" 
                   value="none" 
                   ${s?"":"checked"}>
            <span class="ml-3 text-gray-600">Não resgatar prêmio agora</span>
        </label>
    `),e.querySelector('input[value="none"]').addEventListener("change",l=>{l.target.checked&&(C.data.redeemedReward=null)})}async function _r(e){e.preventDefault();const t=e.target,a=t.querySelector('button[type="submit"]');if(!C.data.time||C.data.selectedServiceIds.length===0||!C.data.professionalId)return p("Erro de Validação","Por favor, selecione o horário, serviço(s) e profissional antes de confirmar.","error");a.disabled=!0,a.textContent="A confirmar...";const s=C.data.selectedServiceIds.map(d=>{const c=ct.find(m=>m.id===d);return{id:c.id,name:c.name,price:c.price,duration:c.duration,bufferTime:c.bufferTime||0,photo:c.photo||null}}),[r,o]=C.data.time.split(":"),n=new Date(`${C.data.date}T${r}:${o}:00`),i={establishmentId:u.establishmentId,clientName:C.data.clientName,clientPhone:C.data.clientPhone,services:s,professionalId:C.data.professionalId,startTime:n.toISOString(),redeemedReward:C.data.redeemedReward},l=t.querySelector("#appointmentId").value;l&&(i.id=l);try{l?await Ws(l,i):await _s(i),p(`Agendamento ${l?"atualizado":"criado"} com sucesso!`,"success"),document.getElementById("appointmentModal").style.display="none",ae()}catch(d){p(d.message,"error")}finally{a.disabled=!1,a.textContent="Confirmar Agendamento"}}function as(e){const t=C.data.clientName===e.name&&C.data.clientPhone===e.phone,a=f(e.name),s=f(e.phone);return`
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
    `}async function Wr(e){const t=document.getElementById("clientSearchResults");if(!t)return;const a=e.trim();if(a.length<3){t.innerHTML='<p class="text-sm text-gray-500">Digite pelo menos 3 caracteres para buscar clientes existentes.</p>';return}t.innerHTML='<div class="loader-small mx-auto my-2"></div>';try{const s=await dt(u.establishmentId,a);if(Ae=s,s.length===0){t.innerHTML='<p class="text-sm text-gray-500">Nenhum cliente encontrado com este termo.</p>';return}t.innerHTML=s.map(as).join(""),t.querySelectorAll('[data-action="select-client"]').forEach(r=>{r.addEventListener("click",o=>{const n=r.dataset.clientName,i=r.dataset.clientPhone,l=parseInt(r.dataset.loyaltyPoints||"0",10);C.data.clientName=n,C.data.clientPhone=i,C.data.clientLoyaltyPoints=l;const d=Fe,c=Math.min(...(d?.rewards||[]).map(m=>m.points));C.data.clientHasRewards=d.enabled&&c!==1/0&&C.data.clientLoyaltyPoints>=c,document.getElementById("apptClientName").value=n,document.getElementById("apptClientPhone").value=i,document.querySelectorAll(".client-search-card").forEach(m=>m.classList.remove("selected","border-blue-500")),r.classList.add("selected","border-blue-500")})})}catch(s){console.error("Erro na busca de clientes:",s),t.innerHTML='<p class="text-sm text-red-500">Erro ao buscar clientes.</p>'}}async function Jr(e){e.preventDefault();const t=document.getElementById("clientRegistrationForm"),a=t.querySelector('button[type="submit"]'),s={establishmentId:u.establishmentId,name:t.querySelector("#regClientName").value.trim(),email:t.querySelector("#regClientEmail").value.trim(),phone:t.querySelector("#regClientPhone").value.trim(),dobDay:t.querySelector("#regClientDobDay").value.trim(),dobMonth:t.querySelector("#regClientDobMonth").value.trim(),notes:t.querySelector("#regClientNotes").value.trim()};if(!s.name||!s.phone)return p("Erro de Validação","Nome e Telefone são obrigatórios.","error");a.disabled=!0,a.textContent="A salvar...";try{await $a(s),Ae.push({name:s.name,phone:s.phone,loyaltyPoints:0}),C.data.clientName=s.name,C.data.clientPhone=s.phone,C.data.clientHasRewards=!1,C.data.clientLoyaltyPoints=0,p("Cliente cadastrado com sucesso!","success"),document.getElementById("genericModal").style.display="none",da(1)}catch(r){p(`Erro ao cadastrar cliente: ${r.message}`,"error")}finally{a.disabled=!1,a.textContent="Salvar"}}function Gr(){Q({title:"Cadastrar Novo Cliente",contentHTML:`
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
    `,maxWidth:"max-w-2xl"});const t=document.getElementById("clientRegistrationForm");t&&t.addEventListener("submit",Jr)}function Yr(){Gr()}function Qr(e,t){const a=e?"Editar Agendamento":"Selecionar Cliente",s=`
        <div class="p-5 space-y-6">
            <h3 class="text-xl font-bold text-gray-800">1. Dados do Cliente</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label for="apptClientName" class="block text-sm font-medium text-gray-700">Nome Completo</label>
                    <input type="text" id="apptClientName" required class="mt-1 block w-full p-3 rounded-lg border-gray-300 shadow-sm" placeholder="Nome Completo" value="${f(C.data.clientName)}">
                </div>
                <div>
                    <label for="apptClientPhone" class="block text-sm font-medium text-gray-700">Telemóvel</label>
                    <input type="tel" id="apptClientPhone" required class="mt-1 block w-full p-3 rounded-lg border-gray-300 shadow-sm" placeholder="(XX) XXXXX-XXXX" value="${f(C.data.clientPhone)}">
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
                         <input type="checkbox" id="multiServiceToggle" class="sr-only" ${C.data.selectedServiceIds.length>1?"checked":""}>
                         <div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full transition-colors"></div>
                         <div class="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform" style="transition: all 0.3s;"></div>
                     </div>
                     <span class="text-sm font-medium text-gray-700">Selecionar Vários</span>
                 </label>
            </div>
            
            <div id="apptServicesContainer" class="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3 max-h-48 overflow-y-auto p-1">
                 ${ct.map(s=>{const r=C.data.selectedServiceIds.includes(s.id),o=s.photo||"https://placehold.co/40x40/E0E7FF/4F46E5?text=S",n=f(s.name);return`
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
                 ${Vt.map(a=>{const s=C.data.professionalId===a.id,r=a.photo||"https://placehold.co/60x60/E0E7FF/4F46E5?text=P",o=f(a.name);return`
                         <div class="professional-modal-card p-3 bg-white rounded-lg border-2 border-gray-200 text-center cursor-pointer transition-all hover:bg-gray-50 ${s?"selected border-blue-500":""}" data-professional-id="${a.id}">
                             <img src="${r}" class="w-12 h-12 rounded-full object-cover mx-auto mb-1">
                             <p class="text-xs font-semibold text-gray-800">${o.split(" ")[0]}</p>
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
    `;return{title:e,content:t}}function Kr(e){const t=e?"Confirmar Edição":"Data e Horário",a=new Date,s=`${a.getFullYear()}-${String(a.getMonth()+1).padStart(2,"0")}-${String(a.getDate()).padStart(2,"0")}`,r=C.data.date||s,o=f(C.data.clientName),n=f(C.data.professionalName),i=`
        <div class="p-5 space-y-6">
            <h3 class="text-xl font-bold text-gray-800">4. ${t}</h3>

            <div class="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400 space-y-1">
                <p class="font-bold text-gray-800">${o}</p>
                <p class="text-sm text-gray-700">Serviços: ${C.data.selectedServiceIds.length} selecionado(s)</p>
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
    `;return{title:t,content:i}}function en(e){const t=document.getElementById("apptServicesContainer");if(!t)return;const a=e.toLowerCase(),s=ct.filter(r=>r.name.toLowerCase().includes(a));t.innerHTML=s.map(r=>{const o=C.data.selectedServiceIds.includes(r.id),n=r.photo||"https://placehold.co/40x40/E0E7FF/4F46E5?text=S";return`
            <div class="service-card p-3 bg-white rounded-lg border-2 border-gray-200 cursor-pointer transition-all hover:bg-gray-50 ${o?"selected border-blue-500":""}" data-service-id="${r.id}">
                <div class="flex items-center">
                    <img src="${n}" class="w-8 h-8 rounded-full object-cover mr-3 flex-shrink-0">
                    <div class="flex-1">
                        <p class="font-semibold text-sm text-gray-800">${f(r.name)}</p>
                        <p class="text-xs text-gray-500">R$ ${r.price.toFixed(2)} (${r.duration} min)</p>
                    </div>
                </div>
            </div>`}).join(""),t.querySelectorAll(".service-card").forEach(r=>{r.addEventListener("click",()=>es(r.dataset.serviceId,r))})}function tn(e){const t=document.getElementById("apptProfessionalContainer");if(!t)return;const a=e.toLowerCase(),s=Vt.filter(r=>r.name.toLowerCase().includes(a));t.innerHTML=s.map(r=>{const o=C.data.professionalId===r.id,n=r.photo||"https://placehold.co/60x60/E0E7FF/4F46E5?text=P",i=f(r.name);return`
             <div class="professional-modal-card p-3 bg-white rounded-lg border-2 border-gray-200 text-center cursor-pointer transition-all hover:bg-gray-50 ${o?"selected border-blue-500":""}" data-professional-id="${r.id}">
                 <img src="${n}" class="w-12 h-12 rounded-full object-cover mx-auto mb-1">
                 <p class="text-xs font-semibold text-gray-800">${i.split(" ")[0]}</p>
                 <p class="text-[10px] text-gray-500">${f(r.specialty||"Profissional")}</p>
             </div>`}).join(""),t.querySelectorAll(".professional-modal-card").forEach(r=>{r.addEventListener("click",()=>ts(r.dataset.professionalId,r))})}async function ca(e=null,t=!1){const a=document.getElementById("appointmentModal");if(!t){const o=e?.startTime?new Date(e.startTime).toISOString().split("T")[0]:new Date().toISOString().split("T")[0],n=e?.startTime?new Date(e.startTime).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit",hour12:!1}):null;if(C={step:1,data:{id:e?.id||null,clientName:e?.clientName||"",clientPhone:e?.clientPhone||"",selectedServiceIds:e?.services?.map(i=>i.id)||[],professionalId:e?.professionalId||null,professionalName:e?.professionalName||"",date:o,time:n,redeemedReward:e?.redeemedReward||null,clientHasRewards:e?.hasRewards||!1,clientLoyaltyPoints:0}},e&&e.clientName)try{const i=await dt(u.establishmentId,e.clientName),l=i.find(d=>d.phone===e.clientPhone);l&&(C.data.clientLoyaltyPoints=l.loyaltyPoints||0,Ae=i)}catch(i){console.warn("Não foi possível carregar pontos do cliente para edição:",i)}}if(!u.services||!u.professionals||Fe.enabled===void 0){p("Erro","Os dados da agenda ainda não foram carregados. Tente novamente em alguns segundos.","error");return}if(ct=u.services,Vt=u.professionals.filter(o=>o.status==="active"),C.data.clientLoyaltyPoints>0){const o=Fe,n=Math.min(...(o?.rewards||[]).map(i=>i.points));C.data.clientHasRewards=o.enabled&&n!==1/0&&C.data.clientLoyaltyPoints>=n}let s={title:"Erro",content:"<p>Etapa não encontrada.</p>"};switch(C.step){case 1:s=Qr(e);break;case 2:s=Xr();break;case 3:s=Zr();break;case 4:s=Kr(e);break}a.innerHTML=`
        <div class="modal-content max-w-4xl p-0 rounded-xl overflow-hidden shadow-2xl">
            <header class="p-5 border-b flex justify-between items-center bg-gray-50">
                <h2 class="text-xl font-bold text-gray-800">${s.title}</h2>
                <button type="button" data-action="close-modal" data-target="appointmentModal" class="text-2xl font-bold text-gray-500 hover:text-gray-900">&times;</button>
            </header>
            
            <form id="appointmentForm" class="flex flex-col h-full">
                <input type="hidden" id="appointmentId" value="${C.data.id||""}">
                <input type="hidden" id="selectedTime" value="${C.data.time||""}">
                
                <div class="flex-1 overflow-y-auto" style="max-height: 80vh;">
                    ${s.content}
                </div>
                
            </form>
        </div>`,a.querySelectorAll('[data-action="next-step"]').forEach(o=>{o.addEventListener("click",()=>{const n=parseInt(o.dataset.currentStep,10);if(n===1){const i=a.querySelector("#apptClientName"),l=a.querySelector("#apptClientPhone");if(C.data.clientName=i.value.trim(),C.data.clientPhone=l.value.trim(),!C.data.clientName||!C.data.clientPhone)return p("Atenção","Nome e telefone do cliente são obrigatórios.","error")}else if(n===2){if(C.data.selectedServiceIds.length===0)return p("Atenção","Selecione pelo menos um serviço.","error")}else if(n===3&&!C.data.professionalId)return p("Atenção","Selecione um profissional.","error");da(n+1)})}),a.querySelectorAll('[data-action="prev-step"]').forEach(o=>{o.addEventListener("click",()=>da(parseInt(o.dataset.currentStep,10)-1))});const r=a.querySelector("#appointmentForm");if(C.step===4&&r&&r.addEventListener("submit",_r),a.style.display="flex",C.step===2){a.querySelector("#apptServicesContainer").querySelectorAll(".service-card").forEach(i=>{i.addEventListener("click",()=>es(i.dataset.serviceId,i))});const n=a.querySelector("#serviceSearchModalInput");n&&n.addEventListener("input",i=>en(i.target.value))}if(C.step===3){a.querySelector("#apptProfessionalContainer").querySelectorAll(".professional-modal-card").forEach(i=>{i.addEventListener("click",()=>ts(i.dataset.professionalId,i))});const n=a.querySelector("#professionalSearchModalInput");n&&n.addEventListener("input",i=>tn(i.target.value))}if(C.step===1){const o=a.querySelector("#clientSearchInput");if(o&&(o.addEventListener("input",i=>Wr(i.target.value)),C.data.clientName&&C.data.clientPhone&&Ae.length>0)){const i=document.getElementById("clientSearchResults");i&&(i.innerHTML=Ae.map(as).join(""))}const n=a.querySelector('[data-action="open-client-registration"]');n&&n.addEventListener("click",Yr)}if(C.step===4){const o=a.querySelector("#apptDate");o&&o.addEventListener("change",to),to(),Ur()}}async function os(e={}){T.currentDate=e.targetDate?new Date(e.targetDate):T.currentDate||new Date,T.scrollToAppointmentId=e.scrollToAppointmentId||null,T.profSearchTerm="",T.isSelectionMode=!1,T.selectedItems.clear(),window.innerWidth<768&&(T.currentView="list"),Ka.innerHTML=`
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
                            <button data-view="list" class="view-btn ${T.currentView==="list"?"active":""}">Lista</button>
                            <button data-view="week" class="view-btn ${T.currentView==="week"?"active":""}">Semana</button>
                        </div>
                        <div id="week-days-toggle" class="${T.currentView==="week"?"flex":"hidden"} items-center gap-1 rounded-lg bg-gray-200 p-1">
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
        </section>`;const t=document.getElementById("btn-toggle-select");t.addEventListener("click",()=>{T.isSelectionMode=!T.isSelectionMode,T.isSelectionMode||T.selectedItems.clear(),t.classList.toggle("bg-blue-100",T.isSelectionMode),t.classList.toggle("text-blue-700",T.isSelectionMode),Ko()}),document.querySelectorAll(".view-btn[data-view]").forEach(s=>{s.addEventListener("click",()=>{document.querySelectorAll(".view-btn[data-view]").forEach(o=>o.classList.remove("active")),s.classList.add("active"),T.currentView=s.dataset.view;const r=document.getElementById("week-days-toggle");if(T.currentView==="week"){if(r.style.display="flex",window.innerWidth<768){T.weekViewDays=3,document.querySelectorAll(".week-days-btn").forEach(n=>n.classList.remove("active"));const o=document.querySelector('.week-days-btn[data-days="3"]');o&&o.classList.add("active")}}else r.style.display="none";ae()})}),document.querySelectorAll(".week-days-btn").forEach(s=>{s.addEventListener("click",()=>{document.querySelectorAll(".week-days-btn").forEach(r=>r.classList.remove("active")),s.classList.add("active"),T.weekViewDays=parseInt(s.dataset.days,10),ae()})}),document.getElementById("todayBtn").addEventListener("click",()=>{T.currentDate=new Date,ae()});const a=s=>{const r=parseInt(s.currentTarget.dataset.amount,10),o=T.currentView==="week"?Ea():1,n=new Date(T.currentDate);n.setDate(n.getDate()+r*o),T.currentDate=n,ae()};document.getElementById("prevBtn").addEventListener("click",a),document.getElementById("nextBtn").addEventListener("click",a),document.getElementById("profSearchInput").addEventListener("input",s=>{T.profSearchTerm=s.target.value,Pt()}),document.getElementById("showInactiveProfsToggle").addEventListener("change",s=>{T.showInactiveProfs=s.target.checked,Pt(),ae()}),eo||(Ka.addEventListener("click",async s=>{const r=s.target.closest("[data-action]");if(s.target.dataset.action==="toggle-select-item"){const l=s.target.dataset.id;s.target.checked?T.selectedItems.add(l):T.selectedItems.delete(l),Ia();return}if(r&&r.dataset.action==="batch-delete"){const l=T.selectedItems.size;if(await z("Excluir em Lote",`Tem certeza que deseja excluir ${l} agendamento(s)? Esta ação não pode ser desfeita.`)){const c=Array.from(T.selectedItems);let m=0;try{await Promise.all(c.map(async g=>{try{await za(g),m++}catch(b){console.error(`Falha ao excluir ${g}`,b)}})),p(`${m} agendamento(s) excluído(s).`,"success"),T.selectedItems.clear(),T.isSelectionMode=!1,document.getElementById("btn-toggle-select").classList.remove("bg-blue-100","text-blue-700"),ae()}catch{p("Erro ao processar exclusão em lote.","error")}}return}if(s.target.closest('[data-action="select-professional"]')){const d=s.target.closest('[data-action="select-professional"]').dataset.profId,c=T.selectedProfessionalId===d&&d!=="all";if(T.selectedProfessionalId=c?"all":d,d!=="all"){const m=document.getElementById("profSearchInput");m&&(m.value=""),T.profSearchTerm=""}await ae();return}if(!r)return;const o=r.dataset.action;let n=null;const i=s.target.closest("[data-appointment]");switch(i&&(n=JSON.parse(i.dataset.appointment.replace(/&apos;/g,"'"))),o){case"new-appointment":ca();break;case"edit-appointment":if(T.isSelectionMode||!n)return;if(n.status==="completed"){p("Atenção","Agendamentos finalizados não podem ser editados.","error");return}n.hasRewards&&!n.redeemedReward&&p("🎁 Cliente com Prêmios!","Este cliente tem pontos para resgatar. Verifique a Etapa 4 do agendamento.","info"),ca(n);break;case"delete-appointment":{if(T.isSelectionMode)return;const l=r.dataset.id;if(await z("Confirmar Exclusão","Tem a certeza que deseja apagar este agendamento?"))try{await za(l),p("Agendamento apagado!","success"),ae()}catch(c){p(`Não foi possível apagar: ${c.message}`,"error")}break}case"open-comanda":if(T.isSelectionMode)return;if(n){n.hasRewards&&!n.redeemedReward&&n.status!=="completed"&&p("🎁 Cliente com Prêmios!","Este cliente tem pontos de fidelidade para resgatar.","info");const l=n.status==="completed"?"finalizadas":"em-atendimento",d={selectedAppointmentId:n.id,initialFilter:l};if(l==="finalizadas"){let c=n.startTime;if(n.transaction&&n.transaction.paidAt){const m=n.transaction.paidAt;typeof m=="object"&&m._seconds?c=new Date(m._seconds*1e3):c=m}d.filterDate=c}Z("comandas-section",d)}break}}),eo=!0),await zr(),await ae()}const an=(e,t=null,a=1,s=12)=>{let r=`/api/comandas/${e}?page=${a}&limit=${s}`;return t&&(r+=`&date=${t}`),$(r)},on=(e,t)=>$(`/api/appointments/${e}/comanda`,{method:"POST",body:JSON.stringify({items:t})}),sn=e=>$("/api/sales",{method:"POST",body:JSON.stringify(e)}),rn=e=>$(`/api/sales/${e}`,{method:"DELETE"}),nn=()=>$("/api/cashier/status").catch(e=>{if(e.message.includes("404")||e.message.includes("não encontrada"))return null;throw e}),ln=e=>{const t={establishmentId:e.establishmentId,initialAmount:Number(e.initialAmount),notes:e.notes||""};return console.log("Payload enviado para abrir caixa:",t),$("/api/cashier/open",{method:"POST",body:JSON.stringify(t)})},dn=(e,t)=>{const a={finalAmount:Number(t)};return console.log("Payload enviado para fechar caixa:",a),$(`/api/cashier/close/${e}`,{method:"PUT",body:JSON.stringify(a)})},cn=()=>$("/api/cashier/history").then(e=>e||[]).catch(e=>(console.error("Erro ao buscar histórico:",e),[])),un=e=>$(`/api/cashier/report/${e}`),Ca=e=>$(`/api/packages/${e}`),mn=e=>$("/api/packages",{method:"POST",body:JSON.stringify(e)}),pn=(e,t)=>$(`/api/packages/${e}`,{method:"PUT",body:JSON.stringify(t)}),gn=e=>$(`/api/packages/${e}`,{method:"DELETE"});let y={allComandas:[],catalog:{services:[],products:[],packages:[]},activeFilter:"atendimento",selectedComandaId:null,viewMode:"items",isCashierOpen:!1,activeCashierSessionId:null,loyaltySettings:null,pendingRedemption:null,paging:{page:1,limit:10,total:0},checkoutState:{payments:[],selectedMethod:"dinheiro",installments:1,amountReceived:"",discount:{type:"real",value:0},discountReason:""},isProcessing:!1},Ie=null,Le=null,ao=null;function ss(e,t){return function(...a){clearTimeout(ao),ao=setTimeout(()=>e.apply(this,a),t)}}async function oo(e,t="stay"){if(!e||!e.id)return;e._localUpdatedAt=Date.now(),e._cachedItems=null,e._hasUnsavedChanges=!1,nt(),t==="checkout"&&(y.viewMode="checkout",y.checkoutState.payments||(y.checkoutState.payments=[]),y.checkoutState.selectedMethod="dinheiro",y.checkoutState.amountReceived="",y.checkoutState.discount.value||(y.checkoutState.discount={type:"real",value:0},y.checkoutState.discountReason=""),V());const a=document.createElement("div");a.id="saving-overlay",a.className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center backdrop-blur-sm",a.innerHTML=`
        <div class="bg-white p-6 rounded-2xl shadow-2xl flex flex-col items-center animate-fade-in">
            <div class="loader mb-4 border-t-indigo-600"></div>
            <p class="text-gray-800 font-bold text-lg">Sincronizando...</p>
        </div>
    `,document.body.appendChild(a);try{const s=(e.comandaItems||[]).filter(r=>r&&r.id&&String(r.id)!=="undefined"&&String(r.id)!=="null").map(r=>{const o={...r};if(o.id=String(r.id),o.type==="product"){const n=o.id;o.productId||(o.productId=n),o.product_id||(o.product_id=n)}if(o.type==="service"){const n=o.id;o.serviceId||(o.serviceId=n),o.service_id||(o.service_id=n)}return o});e.type==="walk-in"&&String(e.id).startsWith("temp-")||await on(e.id,s),document.body.contains(a)&&document.body.removeChild(a),t!=="checkout"&&(p("Sucesso","Comanda atualizada!","success"),V())}catch(s){document.body.contains(a)&&document.body.removeChild(a),console.error("Erro ao salvar:",s),e._hasUnsavedChanges=!0,V(),p("Erro","Falha ao salvar no servidor: "+s.message,"warning")}}function $e(e){if(!e._cachedItems){let t=[];if(e.status==="completed"){const a=e.comandaItems||e.items||[];t=a.length>0?a:e.services||[]}else{const a=(e.services||[]).map(n=>({...n,_source:"original_service",type:"service"})),s=a.reduce((n,i)=>{const l=String(i.id);return n[l]=(n[l]||0)+1,n},{}),r=[...e.comandaItems||[],...e.items||[]],o=[];r.forEach(n=>{const i=String(n.id);(n.type==="service"||!n.type)&&s[i]>0?s[i]--:o.push({...n,_source:"extra"})}),t=[...a,...o]}return e._cachedItems=t,e._cachedTimestamp=Date.now(),t}return e._cachedItems}function bn(){const e=document.getElementById("comandas-layout");if(e){e.classList.add("detail-view-active");const t=document.getElementById("comanda-detail-container");t&&(t.scrollTop=0)}}function Te(){const e=document.getElementById("comandas-layout");e&&e.classList.remove("detail-view-active")}function fn(){const e=new Date().toISOString().split("T")[0];Le.innerHTML=`
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
        `)}function nt(){const e=document.getElementById("comandas-list"),t=document.getElementById("pagination-container");if(!e)return;if(!y.isCashierOpen&&y.activeFilter==="atendimento"){e.innerHTML=`
            <div class="text-center py-10 opacity-60">
                <svg class="w-12 h-12 mx-auto text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                <p class="text-sm font-medium text-gray-700">Caixa Fechado</p>
                <p class="text-xs text-gray-500">Abra o caixa para ver as vendas</p>
            </div>
        `,t&&(t.innerHTML="");return}const s={atendimento:"confirmed",finalizadas:"completed"}[y.activeFilter],r=y.allComandas.filter(n=>n.status===s);if(r.length===0){e.innerHTML='<p class="text-center text-gray-400 py-10 text-sm">Nenhuma venda encontrada.</p>',so(t);return}const o=document.createDocumentFragment();r.forEach(n=>{const i=$e(n);let l=0;n.status==="completed"&&n.totalAmount!==void 0&&n.totalAmount!==null?l=Number(n.totalAmount):l=i.reduce((S,k)=>S+Number(k.price||0),0);const c=n.loyaltyRedemption||n.discount&&n.discount.reason&&String(n.discount.reason).toLowerCase().includes("fidelidade")?'<span class="inline-flex items-center justify-center bg-yellow-100 text-yellow-700 rounded-full w-5 h-5 ml-2" title="Prémio Resgatado">🎁</span>':"",m=n.id===y.selectedComandaId,g=new Date(n.startTime).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),b=n.type==="walk-in"||typeof n.id=="string"&&n.id.startsWith("temp-"),h=f(n.clientName||"Cliente sem nome"),v=f(n.professionalName||"Sem profissional"),x=b?'<span class="text-[10px] font-bold uppercase text-blue-600 bg-blue-100 px-2 py-0.5 rounded-md border border-blue-200">Avulso</span>':'<span class="text-[10px] font-bold uppercase text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded-md border border-indigo-200">Agenda</span>',w=document.createElement("div");w.className=`comanda-card cursor-pointer ${m?"selected":""}`,w.dataset.action="select-comanda",w.dataset.comandaId=n.id,w.innerHTML=`
            <div class="flex justify-between items-start mb-1 pointer-events-none">
                <p class="font-bold text-gray-800 truncate max-w-[70%] text-sm">${h}</p>
                <div class="flex items-center">
                    <p class="font-bold text-gray-900 text-sm">R$ ${l.toFixed(2)}</p>
                    ${c}
                </div>
            </div>
            <div class="flex justify-between items-center mt-1 pointer-events-none">
                <div class="flex items-center gap-2">
                    ${x}
                    <p class="text-xs text-gray-500 truncate max-w-[100px]">${v}</p>
                </div>
                <p class="text-xs text-gray-400 font-medium">${g}</p> 
            </div>
        `,o.appendChild(w)}),e.innerHTML="",e.appendChild(o),so(t)}function so(e){if(!e)return;e.innerHTML="";const{page:t,total:a,limit:s}=y.paging,r=Math.ceil((a||0)/s);if(r===0)return;const o=document.createElement("div");o.className="flex gap-2 justify-center items-center w-full",o.innerHTML=`
        <button data-page="${t-1}" class="px-3 py-1 rounded bg-white border border-gray-300 hover:bg-gray-100 text-sm font-medium ${t<=1?"opacity-50 cursor-not-allowed":""}" ${t<=1?"disabled":""}>&laquo;</button>
        <span class="text-xs font-semibold text-gray-600 mx-2">Pág ${t} de ${r||1}</span>
        <button data-page="${t+1}" class="px-3 py-1 rounded bg-white border border-gray-300 hover:bg-gray-100 text-sm font-medium ${t>=r?"opacity-50 cursor-not-allowed":""}" ${t>=r?"disabled":""}>&raquo;</button>
    `,e.appendChild(o),o.querySelectorAll("button[data-page]").forEach(n=>{n.onclick=i=>{i.stopPropagation();const l=parseInt(n.dataset.page,10);l>0&&l<=r&&(y.paging.page=l,re())}})}function V(){const e=document.getElementById("comanda-detail-container");if(!e)return;const t=y.allComandas.find(v=>v.id===y.selectedComandaId);if(y.viewMode==="checkout"&&t){hn(t,e);return}const a=`
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
        `;return}const s=$e(t),r=t.status==="completed",o=t.type==="walk-in"||typeof t.id=="string"&&t.id.startsWith("temp-"),n=s.reduce((v,x)=>{const w=x._source==="original_service",S=x.id||x.name,k=w?`original-${S}`:`${x.type}-${S}`;return v[k]||(v[k]={...x,quantity:0,sources:[]}),v[k].quantity+=1,x._source&&v[k].sources.push(x._source),v},{}),i=Object.values(n).reduce((v,x)=>v+Number(x.price||0)*x.quantity,0),l=f(t.clientName||"Cliente sem nome"),d=f(t.professionalName||"Profissional não atribuído"),c=t._hasUnsavedChanges,b=`
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
                ${Object.values(n).map(v=>{const x=v.sources&&v.sources.includes("original_service"),w=y.pendingRedemption&&String(y.pendingRedemption.appliedToItemId)===String(v.id),S=v.isReward||w;return`
                    <div class="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-100 shadow-sm ${S?"border-yellow-300 bg-yellow-50 ring-1 ring-yellow-200":""}">
                        <div class="flex items-center gap-3 w-full">
                            <div class="flex-grow min-w-0">
                                <p class="text-sm font-semibold text-gray-800 line-clamp-1">
                                    ${S?"🎁 ":""}
                                    ${f(v.name)}
                                    ${x?'<span class="text-[10px] text-indigo-600 bg-indigo-50 px-1 rounded border border-indigo-100 ml-1">Original</span>':""}
                                </p>
                                <p class="text-xs text-gray-500">${S?'<span class="text-yellow-700 font-bold bg-yellow-100 px-1 rounded">Prémio Fidelidade</span>':`R$ ${(v.price||0).toFixed(2)} un.`}</p>
                            </div>
                            ${r?`<span class="flex items-center justify-center w-8 h-8 bg-gray-100 text-gray-700 font-bold text-sm rounded-lg">${v.quantity}x</span>`:`
                                <div class="flex items-center bg-gray-100 rounded-lg p-1 gap-3">
                                    ${x?`<span class="text-sm font-bold text-gray-500 w-16 text-center py-1 bg-gray-200 rounded text-[10px] uppercase">Fixo: ${v.quantity}</span>`:`<button data-action="decrease-qty" data-item-id="${v.id}" data-item-type="${v.type}" class="w-6 h-6 flex items-center justify-center rounded bg-white text-gray-600 shadow-sm hover:bg-red-50 hover:text-red-600 disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-gray-600">-</button>
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
    `,!r&&(t.clientId||t.clientName)&&xn(t,e.querySelector("#loyalty-container"))}function hn(e,t){const s=$e(e).reduce((g,b)=>g+Number(b.price||0)*(b.quantity||1),0),r=y.checkoutState,o=r.discount||{type:"real",value:0};let n=0;o.type==="percent"?n=s*o.value/100:n=o.value,n>s&&(n=s);const i=s-n,l=r.payments.reduce((g,b)=>g+b.value,0),d=Math.max(0,i-l);(!r.amountReceived||d>0)&&(r.amountReceived=d.toFixed(2));const c=`
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
                <p class="text-sm font-semibold text-gray-500 uppercase tracking-wide">Subtotal: <span id="checkout-subtotal-display">R$ ${s.toFixed(2)}</span></p>
                
                <div class="flex flex-col items-center justify-center gap-2 mt-4 mb-2">
                     <div class="flex items-center gap-2">
                         <span class="text-xs font-bold text-red-500">Desconto:</span>
                         <div class="flex border rounded-lg bg-white overflow-hidden shadow-sm w-40">
                             <input type="number" id="discount-value" value="${o.value}" class="w-20 p-1 text-center text-sm font-bold text-red-600 outline-none" placeholder="0">
                             <select id="discount-type" class="bg-gray-100 text-xs font-bold text-gray-700 border-l p-1 outline-none">
                                 <option value="real" ${o.type==="real"?"selected":""}>R$</option>
                                 <option value="percent" ${o.type==="percent"?"selected":""}>%</option>
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
    `;const m=()=>{const g=y.checkoutState.discount.type,b=y.checkoutState.discount.value;let h=g==="percent"?s*b/100:b;h>s&&(h=s);const v=s-h,x=y.checkoutState.payments.reduce((L,D)=>L+D.value,0),w=Math.max(0,v-x),S=t.querySelector("#checkout-total-display");S&&(S.textContent=`R$ ${v.toFixed(2)}`);const k=t.querySelector("#checkout-status-msg");k&&(w<=.01?k.innerHTML='<p class="text-green-600 font-bold text-lg">Pago</p>':k.innerHTML=`<p class="text-red-500 font-medium">Faltam: <span id="checkout-remaining-display">R$ ${w.toFixed(2)}</span></p>`);const E=t.querySelector("#checkout-amount");E&&w>0&&document.activeElement!==E&&(E.value=w.toFixed(2))};t.querySelector("#discount-value")?.addEventListener("input",g=>{const b=parseFloat(g.target.value)||0;y.checkoutState.discount.value=b,m()}),t.querySelector("#discount-type")?.addEventListener("change",g=>{y.checkoutState.discount.type=g.target.value,m()}),t.querySelector("#discount-reason")?.addEventListener("input",g=>{y.checkoutState.discountReason=g.target.value}),t.querySelector("#checkout-amount")?.addEventListener("input",g=>{y.checkoutState.amountReceived=g.target.value}),t.querySelector("#checkout-installments")?.addEventListener("change",g=>{y.checkoutState.installments=parseInt(g.target.value,10)})}async function xn(e,t){if(!t)return;const a=y.loyaltySettings;if(!a||!a.enabled)return;let s=null;try{if(e.clientId)s=await Go(u.establishmentId,e.clientId);else if(e.clientName){const i=await dt(u.establishmentId,e.clientName,1);i&&i.length>0&&(s=i[0])}}catch(i){console.warn("Erro ao buscar dados de fidelidade",i)}if(!s||s.loyaltyPoints===void 0)return;const r=Number(s.loyaltyPoints)||0,n=(a.tiers||a.rewards||[]).filter(i=>{const l=Number(i.costPoints||i.points||0);return l>0&&r>=l});if(n.length>0){const i=document.createElement("div");i.className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl p-4 shadow-sm flex justify-between items-center animate-fade-in",i.innerHTML=`
            <div class="flex items-center gap-3">
                <div class="bg-yellow-100 p-2 rounded-full text-yellow-600">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                </div>
                <div>
                    <p class="text-sm font-bold text-yellow-800">Prémio Disponível!</p>
                    <p class="text-xs text-yellow-700">Saldo: <strong>${r} pts</strong></p>
                </div>
            </div>
        `;const l=document.createElement("button");l.innerText="Resgatar",l.className="text-xs font-bold bg-yellow-500 text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-600 transition-colors",l.onclick=()=>yn(n,e),i.appendChild(l),t.innerHTML="",t.appendChild(i)}}function yn(e,t){const a=`
        <div class="space-y-4">
            <p class="text-sm text-gray-600 mb-4">O cliente possui pontos suficientes para resgatar os seguintes itens:</p>
            <div class="space-y-2 max-h-96 overflow-y-auto custom-scrollbar">
                ${e.map(o=>{const n=o.costPoints||o.points||0,i=o.name||o.reward,l=o.type||"money",d=o.discount?parseFloat(o.discount).toFixed(2):"0.00";let c="",m="bg-gray-100 text-gray-600";switch(l){case"service":c="Serviço",m="bg-indigo-100 text-indigo-700";break;case"product":c="Produto",m="bg-green-100 text-green-700";break;case"package":c="Pacote",m="bg-purple-100 text-purple-700";break;case"money":default:c="Valor Livre",m="bg-yellow-100 text-yellow-700";break}return`
                    <button data-action="select-reward" data-reward-id="${o.id||i}" class="w-full flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:border-yellow-400 hover:bg-yellow-50 transition-all group">
                        <div class="text-left flex-1">
                            <div class="flex items-center gap-2 mb-1">
                                <span class="text-[10px] font-bold uppercase px-2 py-0.5 rounded ${m}">${c}</span>
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
    `,{modalElement:s,close:r}=Q({title:"🎁 Resgatar Prémio",contentHTML:a,maxWidth:"max-w-md"});s.addEventListener("click",o=>{const n=o.target.closest('[data-action="select-reward"]');if(n){const i=n.dataset.rewardId,l=e.find(d=>d.id&&d.id==i||(d.name||d.reward)==i);l&&(wn(l,t),r())}})}async function wn(e,t){const a=Number(e.costPoints||e.points||0),s=e.name||e.reward,r=e.type||"money";if(r==="money"){const l=parseFloat(e.discount)||0;if(l<=0){p("Erro","O valor do desconto configurado é inválido.","error");return}y.checkoutState.discount={type:"real",value:l},y.checkoutState.discountReason=`Resgate Fidelidade: ${s}`,y.pendingRedemption={rewardId:e.id||null,name:s,cost:a,type:"money"},p("Sucesso",`Prémio "${s}" resgatado! Desconto de R$ ${l.toFixed(2)} aplicado.`,"success"),V();return}const o=$e(t),n=e.itemId?String(e.itemId):null;if(!n){p("Erro de Configuração",`O prémio "${s}" não tem um item vinculado nas configurações.`,"error");return}const i=o.find(l=>{const d=l.id?String(l.id):null,c=l.serviceId?String(l.serviceId):l.service_id?String(l.service_id):null,m=l.productId?String(l.productId):l.product_id?String(l.product_id):null;return r==="service"?d===n||c===n:r==="product"?d===n||m===n:r==="package"?d===n:!1});if(i){let l=parseFloat(e.discount);(!l||l<=0)&&(l=parseFloat(i.price||0)),y.checkoutState.discount={type:"real",value:l},y.checkoutState.discountReason=`Resgate Fidelidade: ${s}`,y.pendingRedemption={rewardId:e.id||null,name:s,cost:a,type:r,appliedToItemId:i.id},p("Sucesso",`Prémio "${s}" resgatado! Item encontrado e desconto de R$ ${l.toFixed(2)} aplicado.`,"success"),V()}else p("Item Não Encontrado",`Para resgatar o prémio "${s}", o ${r==="service"?"serviço":r==="product"?"produto":"pacote"} correspondente deve estar lançado nesta comanda. Por favor, adicione o item primeiro e tente resgatar novamente.`,"warning")}function kn(){if(!y.isCashierOpen)return p("Caixa Fechado","Abra o caixa antes de adicionar itens.","error");const{modalElement:e,close:t}=Q({title:"Adicionar Item à Comanda",contentHTML:'<div id="add-item-content"></div>',maxWidth:"max-w-4xl"}),a=()=>{const r=e.querySelector("#add-item-content");r.innerHTML=`
            <input type="search" id="item-search-input" placeholder="Pesquisar por nome..." class="w-full p-3 mb-4 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div><h4 class="font-semibold mb-2 text-center text-indigo-600">Serviços</h4><div id="modal-service-list" class="space-y-2 max-h-80 overflow-y-auto custom-scrollbar"></div></div>
                <div><h4 class="font-semibold mb-2 text-center text-green-600">Produtos</h4><div id="modal-product-list" class="space-y-2 max-h-80 overflow-y-auto custom-scrollbar"></div></div>
                <div><h4 class="font-semibold mb-2 text-center text-purple-600">Pacotes</h4><div id="modal-package-list" class="space-y-2 max-h-80 overflow-y-auto custom-scrollbar"></div></div>
            </div>`;const o=(i="")=>{const l=i.toLowerCase(),d={service:'<svg class="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v4.512a9.04 9.04 0 00-3 5.012M12 12a9.04 9.04 0 01-3-5.012V5l-1-1z" /></svg>',product:'<svg class="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>',package:'<svg class="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-14L4 7m8 4v10M4 7v10l8 4" /></svg>'},c={"modal-service-list":{items:y.catalog.services,type:"service"},"modal-product-list":{items:y.catalog.products,type:"product"},"modal-package-list":{items:y.catalog.packages,type:"package"}};Object.entries(c).forEach(([m,{items:g,type:b}])=>{const h=document.getElementById(m);if(!h)return;const v=g.filter(x=>x.name.toLowerCase().includes(l)).slice(0,50);h.innerHTML=v.map(x=>x.id?`
                    <button data-action="select-item-for-quantity" data-item-type="${b}" data-item-id="${x.id}" class="flex items-center gap-2 w-full p-2 bg-white border rounded hover:bg-gray-50 transition text-left">
                        <div class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gray-50">${d[b]}</div>
                        <span class="flex-grow text-sm truncate">${f(x.name)}</span>
                        <span class="font-bold text-xs text-gray-700">R$ ${x.price.toFixed(2)}</span>
                    </button>
                `:"").join("")||'<p class="text-xs text-gray-400 text-center py-2">Nada encontrado</p>'})};o();const n=document.getElementById("item-search-input");n.addEventListener("input",ss(i=>{o(i.target.value)},300)),setTimeout(()=>n.focus(),100)},s=r=>{let o=1;const n=e.querySelector("#add-item-content"),i=()=>{document.getElementById("quantity-display").textContent=o,document.getElementById("quantity-minus-btn").disabled=o<=1};n.innerHTML=`
            <div class="text-center p-8 relative">
                <button data-action="back-to-catalog" class="absolute top-0 left-0 text-gray-600 hover:text-gray-900 font-medium flex items-center gap-1">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg> Voltar
                </button>
                <h3 class="font-bold text-2xl text-gray-800 mt-4">${f(r.name)}</h3>
                <p class="text-lg text-gray-500 font-medium">R$ ${r.price.toFixed(2)}</p>
                <div class="my-8 flex items-center justify-center gap-6">
                    <button id="quantity-minus-btn" class="w-14 h-14 rounded-full bg-gray-100 text-2xl font-bold text-gray-600 hover:bg-gray-200 transition disabled:opacity-50">-</button>
                    <span id="quantity-display" class="text-5xl font-bold w-24 text-center text-indigo-700">${o}</span>
                    <button id="quantity-plus-btn" class="w-14 h-14 rounded-full bg-gray-100 text-2xl font-bold text-gray-600 hover:bg-gray-200 transition">+</button>
                </div>
                <button data-action="confirm-add-item" class="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition shadow-lg text-lg">Adicionar à Comanda</button>
            </div>
        `,document.getElementById("quantity-minus-btn").onclick=()=>{o>1&&(o--,i())},document.getElementById("quantity-plus-btn").onclick=()=>{o++,i()},document.querySelector('[data-action="confirm-add-item"]').onclick=async()=>{await ns(r,o),t()}};e.addEventListener("click",r=>{const o=r.target.closest('[data-action="select-item-for-quantity"]'),n=r.target.closest('[data-action="back-to-catalog"]');if(o){const{itemType:i,itemId:l}=o.dataset,c=(y.catalog[i+"s"]||[]).find(m=>m.id===l);c&&s({...c,type:i})}else n&&a()}),a()}async function ua(e=null){if(!y.isCashierOpen)return p("Caixa Fechado","Abra o caixa antes de criar uma nova venda.","error");if(!u.professionals||u.professionals.length===0)try{u.professionals=await K(u.establishmentId)}catch{return p("Erro","Não foi possível carregar profissionais.","error")}const a=`
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
                <select id="new-sale-professional" required class="mt-1 w-full p-2 border rounded-md bg-white"><option value="">Selecione...</option>${u.professionals.map(l=>`<option value="${l.id}">${f(l.name)}</option>`).join("")}</select>
            </div>
            <div class="pt-4 border-t"><button type="submit" id="btn-start-sale" class="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400">Iniciar Venda</button></div>
        </form>
    `,{modalElement:s}=Q({title:"Nova Venda Avulsa",contentHTML:a,maxWidth:"max-w-md"}),r=s.querySelector("#client-search"),o=s.querySelector("#client-suggestions"),n=s.querySelector("#selected-client-id");e&&(n.value=e.id,r.value=`${e.name} (${e.phone||"Sem tel"})`,r.classList.add("bg-green-50","border-green-300","text-green-800")),r.addEventListener("input",ss(async l=>{const d=l.target.value.trim();if(n.value="",r.classList.remove("bg-green-50","border-green-300","text-green-800"),d.length<2){o.classList.add("hidden");return}try{o.innerHTML='<li class="p-2 text-xs text-gray-500">Buscando...</li>',o.classList.remove("hidden");const c=await dt(u.establishmentId,d,10);c.length===0?o.innerHTML='<li class="p-2 text-xs text-gray-500">Nenhum cliente encontrado</li>':o.innerHTML=c.map(m=>`<li data-client-id="${m.id}" data-client-name="${m.name}" data-client-phone="${m.phone}" class="p-2 hover:bg-indigo-50 cursor-pointer border-b last:border-0 transition-colors"><div class="font-bold text-sm text-gray-800">${f(m.name)}</div><div class="text-xs text-gray-500">${m.phone||"Sem telefone"}</div></li>`).join("")}catch{o.classList.add("hidden")}},400)),o.addEventListener("click",l=>{const d=l.target.closest("li[data-client-id]");d&&(n.value=d.dataset.clientId,n.dataset.name=d.dataset.clientName,n.dataset.phone=d.dataset.clientPhone,r.value=`${d.dataset.clientName}`,r.classList.add("bg-green-50","border-green-300","text-green-800"),o.classList.add("hidden"))}),document.addEventListener("click",l=>{!r.contains(l.target)&&!o.contains(l.target)&&o.classList.add("hidden")}),s.querySelector("#new-sale-form").addEventListener("submit",Tn);const i=s.querySelector('[data-action="new-client-from-sale"]');i&&i.addEventListener("click",l=>{l.preventDefault(),s.style.display="none",Sn()})}function Sn(){Q({title:"Cadastrar Novo Cliente",contentHTML:`
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
    `,maxWidth:"max-w-2xl"});const t=document.getElementById("comandas_clientRegistrationForm");t&&t.addEventListener("submit",$n)}async function $n(e){e.preventDefault();const t=document.getElementById("comandas_clientRegistrationForm");if(!t)return;const a=t.querySelector("#regClientName"),r=t.querySelector("#regClientPhone").value.replace(/\D/g,"");if(!a.value||!r)return p("Erro","Nome e Telefone são obrigatórios.","error");try{const o=await Rr(u.establishmentId,r);if(o)p("Atenção","Cliente já cadastrado.","info"),document.getElementById("genericModal").style.display="none",ua(o);else{const n=await $a({establishmentId:u.establishmentId,name:a.value,phone:r});p("Sucesso","Cliente cadastrado!","success"),document.getElementById("genericModal").style.display="none",ua(n)}}catch(o){p("Erro",o.message,"error")}}async function En(){const e=`
        <form id="open-cashier-form" class="space-y-4">
            <div>
                <label for="initial-amount" class="block text-sm font-medium text-gray-700">Valor Inicial do Caixa</label>
                <div class="mt-1 relative"><span class="absolute left-3 top-2 text-gray-500 font-semibold">R$</span><input type="number" step="0.01" min="0" id="initial-amount" required class="w-full p-2 pl-12 border rounded-md text-lg font-semibold" placeholder="0.00" value="0.00"></div>
            </div>
            <div class="pt-4 border-t"><button type="submit" class="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition shadow-md">Confirmar Abertura</button></div>
        </form>
    `,{modalElement:t}=Q({title:"Abrir Caixa",contentHTML:e,maxWidth:"max-w-md"});t.querySelector("#open-cashier-form").addEventListener("submit",async a=>{a.preventDefault();const s=parseFloat(document.getElementById("initial-amount").value);if(isNaN(s)||s<0)return p("Valor Inválido","Insira um valor válido.","error");try{const r=await ln({establishmentId:u.establishmentId,initialAmount:parseFloat(s.toFixed(2))});y.isCashierOpen=!0,y.activeCashierSessionId=r.id,document.getElementById("genericModal").style.display="none",p("Sucesso!",`Caixa aberto (R$ ${s.toFixed(2)})`,"success"),Ut(),await re()}catch(r){p("Erro",`Falha ao abrir caixa: ${r.message}`,"error")}})}async function In(){const e=y.activeCashierSessionId;if(e)try{const t=await un(e),a=`
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
        `,{modalElement:s}=Q({title:"Fechar Caixa",contentHTML:a,maxWidth:"max-w-md"});s.querySelector("#close-cashier-form").addEventListener("submit",async r=>{r.preventDefault();const o=parseFloat(document.getElementById("final-amount").value);if(isNaN(o)||o<0)return p("Valor Inválido","Insira um valor final válido.","error");try{await dn(e,o),y.isCashierOpen=!1,y.activeCashierSessionId=null,document.getElementById("genericModal").style.display="none",Ut(),await re(),p("Sucesso!","Caixa fechado com sucesso!","success")}catch(n){p("Erro",`Falha ao fechar caixa: ${n.message}`,"error")}})}catch(t){p("Erro",`Falha ao carregar relatório: ${t.message}`,"error")}}async function Cn(e){if(y.activeFilter===e)return;y.activeFilter=e,y.paging.page=1,document.querySelectorAll(".filter-btn").forEach(a=>a.classList.remove("bg-white","text-indigo-600","shadow")),document.querySelector(`[data-filter="${e}"]`).classList.add("bg-white","text-indigo-600","shadow"),document.getElementById("finalizadas-datepicker").classList.toggle("hidden",e!=="finalizadas"),Te(),y.selectedComandaId=null,y.viewMode="items";const t=document.getElementById("comandas-list");t&&(t.innerHTML='<div class="loader mx-auto mt-10"></div>'),await re(),V()}function rs(e){y.selectedComandaId=e,y.viewMode="items",y.pendingRedemption=null,y.checkoutState.discount={type:"real",value:0},y.checkoutState.discountReason="",nt(),bn(),V()}async function ns(e,t){const a=y.allComandas.find(o=>o.id===y.selectedComandaId);if(!a)return;if(!e.id||String(e.id)==="undefined"){console.error("Tentativa de adicionar item sem ID:",e),p("Erro","Item sem identificador. Não foi possível adicionar.","error");return}const s=parseFloat(e.price)||0,r=Array(t).fill(0).map(()=>{const o={id:String(e.id),name:e.name,price:s,type:e.type,isReward:e.isReward||!1,pointsCost:e.pointsCost||0};return e.type==="product"?(o.productId=o.id,o.product_id=o.id):e.type==="service"&&(o.serviceId=o.id,o.service_id=o.id),o});a.comandaItems=a.comandaItems||[],a.comandaItems.push(...r),a._cachedItems=null,a._hasUnsavedChanges=!0,V()}async function ro(e,t){const a=y.allComandas.find(o=>o.id===y.selectedComandaId);if(!a)return;let s=!1,r=(a.comandaItems||[]).findIndex(o=>o.id==e&&o.type===t);r>-1&&(a.comandaItems.splice(r,1),s=!0),s&&(a._cachedItems=null,a._hasUnsavedChanges=!0,V())}async function Ln(e){if(y.isProcessing)return;const t=$e(e),a=t.reduce((x,w)=>x+Number(w.price||0)*(w.quantity||1),0),s=y.checkoutState.discount||{type:"real",value:0};let r=s.type==="percent"?a*s.value/100:s.value;r>a&&(r=a);const o=a-r,{payments:n}=y.checkoutState,i=n.reduce((x,w)=>x+w.value,0),l=o-i;if(l>.01){if(!await z("Pagamento Parcial",`O valor de R$ ${l.toFixed(2)} não foi pago. Deseja registrar como DÍVIDA (Fiado) no cadastro do cliente?`))return;n.push({method:"fiado",value:l,installments:1})}y.isProcessing=!0;const d=e.type==="appointment",c=t;let m=0;const g=y.loyaltySettings;if(g&&g.enabled){const x=g.type?String(g.type).toLowerCase().trim():"";if(console.log("Fidelidade Config:",{type:x,settings:g}),x==="visit"||x==="visita"||x==="fixed")m=Number(g.pointsPerVisit)||1;else{const w=Number(g.pointsPerCurrency)||10;w>0&&(m=Math.floor(o/w))}}const b={...s,reason:y.checkoutState.discountReason||""},h={payments:n,totalAmount:Number(o),items:c,cashierSessionId:y.activeCashierSessionId,loyaltyPointsEarned:m,discount:b,loyaltyRedemption:y.pendingRedemption},v=document.createElement("div");v.className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center backdrop-blur-sm",v.innerHTML='<div class="bg-white p-6 rounded-2xl shadow-2xl flex flex-col items-center"><div class="loader mb-4 border-t-indigo-600"></div><p>Finalizando venda...</p></div>',document.body.appendChild(v);try{d?await Gs(e.id,h):(h.establishmentId=u.establishmentId,h.clientId=e.clientId,h.clientName=e.clientName,h.professionalId=e.professionalId,e.clientPhone&&(h.clientPhone=e.clientPhone),await sn(h));let x="Venda finalizada com sucesso!";m>0&&(x+=` Cliente ganhou ${m} pontos!`),p("Sucesso!",x,"success"),Te(),y.selectedComandaId=null,y.viewMode="items",y.pendingRedemption=null,await re()}catch(x){p("Erro no Checkout",x.message,"error")}finally{document.body.contains(v)&&document.body.removeChild(v),y.isProcessing=!1}}async function Tn(e){e.preventDefault();const t=document.getElementById("selected-client-id"),a=document.getElementById("new-sale-professional").value,s=t.value,r=document.getElementById("client-search").value,o=t.dataset.phone||"";if(!s)return p("Erro","Selecione um cliente válido.","error");const n=u.professionals.find(l=>l.id===a);if(!n)return p("Erro","Selecione um profissional válido.","error");const i={id:`temp-${Date.now()}`,type:"walk-in",clientId:s,clientName:r.split("(")[0].trim(),clientPhone:o,professionalId:n.id,professionalName:n.name,startTime:new Date,status:"confirmed",services:[],comandaItems:[]};y.allComandas.unshift(i),y.selectedComandaId=i.id,y.viewMode="items",document.getElementById("genericModal").style.display="none",rs(i.id)}async function re(){const e=document.getElementById("comandas-list");(!e.hasChildNodes()||e.innerHTML.includes("loader"))&&(e.innerHTML='<div class="loader mx-auto mt-10"></div>');const t=y.activeFilter==="finalizadas"?document.getElementById("filter-date").value:null;try{const a=nn(),s=an(u.establishmentId,t,y.paging.page,y.paging.limit),r=Ee(u.establishmentId),[o,n,i]=await Promise.all([a,s,r]);if(y.isCashierOpen=!!o,y.activeCashierSessionId=o?o.id:null,Ut(),i&&i.loyaltyProgram&&(y.loyaltySettings=i.loyaltyProgram),!y.isCashierOpen&&y.activeFilter==="atendimento"){nt(),V();return}if(y.allComandas=n.data||n,y.paging.total=n.total||n.length,y.catalog.services.length===0){const[l,d,c,m]=await Promise.all([be(u.establishmentId),lt(u.establishmentId),Ca(u.establishmentId),K(u.establishmentId)]);y.catalog={services:l,products:d,packages:c},u.professionals=m}nt(),V()}catch(a){p("Erro",`Não foi possível carregar os dados: ${a.message}`,"error")}}async function Pn(e={}){Le=document.getElementById("content"),y.selectedComandaId=e.selectedAppointmentId||null,y.viewMode="items",fn(),Ie&&(Le.removeEventListener("click",Ie),Le.removeEventListener("change",Ie)),Ie=async t=>{const a=t.target.closest("[data-action], [data-filter], [data-comanda-id]");if(t.target.id==="filter-date"&&y.activeFilter==="finalizadas"){y.paging.page=1,await re();return}if(a){if(a.matches("[data-filter]"))Cn(a.dataset.filter);else if(a.matches("[data-comanda-id]")){if(t.target.closest('[data-action="go-to-appointment"]')){t.stopPropagation();return}rs(a.dataset.comandaId)}else if(a.matches("[data-action]")){const r=a.dataset.action,o=a.dataset.id||y.selectedComandaId,n=y.allComandas.find(i=>i.id===o);switch(r){case"back-to-list":Te(),y.selectedComandaId=null,document.querySelectorAll(".comanda-card").forEach(S=>S.classList.remove("selected")),V();break;case"new-sale":ua();break;case"add-item":kn();break;case"open-cashier":En();break;case"close-cashier":await In();break;case"view-sales-report":Z("sales-report-section");break;case"go-to-checkout":await oo(n,"checkout");break;case"back-to-items":y.viewMode="items",V();break;case"save-comanda":await oo(n,"stay");break;case"select-method":y.checkoutState.selectedMethod=a.dataset.method,y.checkoutState.installments=1,V();break;case"add-payment-checkout":const i=document.getElementById("checkout-amount");let l=parseFloat(i.value);const c=$e(n).reduce((S,k)=>S+(k.price||0),0),m=y.checkoutState.discount||{type:"real",value:0};let g=m.type==="percent"?c*m.value/100:m.value;g>c&&(g=c);const b=c-g,h=y.checkoutState.payments.reduce((S,k)=>S+k.value,0),v=b-h;if(isNaN(l)||l<=0){p("Valor inválido","Insira um valor maior que zero.","error");break}if(l>v+.05){p("Valor inválido","Valor excede o restante.","error");break}const x={method:y.checkoutState.selectedMethod,value:l};["credito","crediario"].includes(y.checkoutState.selectedMethod)&&y.checkoutState.installments>1&&(x.installments=y.checkoutState.installments),y.checkoutState.payments.push(x),y.checkoutState.selectedMethod="dinheiro",y.checkoutState.installments=1,y.checkoutState.amountReceived="",V();break;case"remove-payment-checkout":const w=parseInt(a.dataset.index,10);y.checkoutState.payments.splice(w,1),V();break;case"finalize-checkout":await Ln(n);break;case"increase-qty":{const S=a.dataset.itemId,k=a.dataset.itemType;if(!S||S==="undefined"||S==="null"){p("Erro","Item inválido para adição.","error");return}let L=$e(n).find(H=>H.id==S&&H.type===k);L||(L=(y.catalog[k+"s"]||[]).find(P=>P.id==S));const D=L?{id:L.id,name:L.name,price:Number(L.price),type:L.type}:{id:S,name:"Item Indisponível",price:0,type:k};await ns(D,1);break}case"decrease-qty":{await ro(a.dataset.itemId,a.dataset.itemType);break}case"remove-item":await ro(a.dataset.itemId,a.dataset.itemType);break;case"reopen-appointment":{if(await z("Reabrir Comanda","Tem certeza? O pagamento será estornado."))try{await Js(o);const k=y.allComandas.findIndex(E=>E.id===o);k!==-1&&(y.allComandas[k].status="confirmed",delete y.allComandas[k].transaction),y.selectedComandaId=null,Te(),await re(),p("Sucesso!","Comanda reaberta.","success")}catch(k){p("Erro",k.message,"error")}break}case"go-to-appointment":{const S=a.dataset.id,k=a.dataset.date;Z("agenda-section",{scrollToAppointmentId:S,targetDate:new Date(k)});break}case"delete-walk-in":{if(await z("Excluir Venda","Confirma a exclusão desta venda avulsa?"))if(o.startsWith("temp-"))y.allComandas=y.allComandas.filter(k=>k.id!==o),y.selectedComandaId=null,nt(),V(),Te();else try{await rn(o),p("Sucesso","Venda excluída.","success"),y.selectedComandaId=null,Te(),await re()}catch(k){p("Erro",k.message,"error")}break}}}}},Le.addEventListener("click",Ie),Le.addEventListener("change",Ie),e.initialFilter&&(y.activeFilter=e.initialFilter==="finalizadas"?"finalizadas":"atendimento"),e.selectedAppointmentId&&(y.selectedComandaId=e.selectedAppointmentId),document.querySelectorAll(".filter-btn").forEach(t=>t.classList.remove("bg-white","text-indigo-600","shadow")),document.querySelector(`[data-filter="${y.activeFilter}"]`).classList.add("bg-white","text-indigo-600","shadow"),document.getElementById("finalizadas-datepicker").classList.toggle("hidden",y.activeFilter!=="finalizadas"),e.filterDate&&(document.getElementById("filter-date").value=new Date(e.filterDate).toISOString().split("T")[0]),await re()}const La=e=>$(`/api/financial/natures/${e}`),Bn=e=>$("/api/financial/natures",{method:"POST",body:JSON.stringify(e)}),Dn=e=>$(`/api/financial/natures/${e}`,{method:"DELETE"}),Ta=e=>$(`/api/financial/cost-centers/${e}`),Mn=e=>$("/api/financial/cost-centers",{method:"POST",body:JSON.stringify(e)}),An=e=>$(`/api/financial/cost-centers/${e}`,{method:"DELETE"}),is=(e,t)=>$(`/api/financial/${e}`,{method:"POST",body:JSON.stringify(t)}),ls=(e,t={})=>{let a=`/api/financial/${e}`;const s=new URLSearchParams;t.establishmentId&&s.append("establishmentId",t.establishmentId),t.startDate&&s.append("startDate",t.startDate),t.endDate&&s.append("endDate",t.endDate),t.natureId&&s.append("natureId",t.natureId),t.costCenterId&&s.append("costCenterId",t.costCenterId),t.status&&s.append("status",t.status);const r=s.toString();return r&&(a+=`?${r}`),$(a)},ds=(e,t,a)=>$(`/api/financial/${e}/${t}`,{method:"PUT",body:JSON.stringify(a)}),cs=(e,t)=>$(`/api/financial/${e}/${t}`,{method:"DELETE"}),us=(e,t,a)=>$(`/api/financial/${e}/${t}/status`,{method:"PATCH",body:JSON.stringify({status:"paid",paymentDate:a})}),qn=e=>is("payables",e),Nn=e=>ls("payables",e),Rn=(e,t)=>ds("payables",e,t),jn=e=>cs("payables",e),Fn=(e,t)=>us("payables",e,t),Hn=e=>is("receivables",e),On=e=>ls("receivables",e),zn=(e,t)=>ds("receivables",e,t),Vn=e=>cs("receivables",e),Un=(e,t)=>us("receivables",e,t),_n=(e,t,a)=>$(`/api/financial/cash-flow?establishmentId=${e}&startDate=${t}&endDate=${a}`),ma=document.getElementById("content");let me={};const no=["#4f46e5","#10b981","#f59e0b","#ef4444","#8b5cf6","#ec4899","#06b6d4"],q={startDate:new Date(new Date().getFullYear(),new Date().getMonth(),1).toISOString().split("T")[0],endDate:new Date().toISOString().split("T")[0],selectedProfessional:"all",selectedCostCenter:"all",professionalsList:[],costCentersList:[],data:null,appointmentsData:[],cashFlowData:null,currentTab:"dashboards",isFilterOpen:!1};async function Wn(){if(!window.Chart)return new Promise((e,t)=>{const a=document.createElement("script");a.src="https://cdn.jsdelivr.net/npm/chart.js",a.onload=e,a.onerror=t,document.head.appendChild(a)})}async function Jn(){ma.innerHTML=`
        <div class="flex flex-col items-center justify-center h-[calc(100vh-100px)]">
            <div class="loader mb-4 border-t-indigo-600"></div>
            <p class="text-gray-500 font-medium animate-pulse">Carregando inteligência...</p>
        </div>`;try{await Wn();const[e,t]=await Promise.all([K(u.establishmentId),Dr(u.establishmentId).catch(()=>[])]);q.professionalsList=e||[],q.costCentersList=t||[],Gn(),await ms()}catch(e){console.error("Erro no loadReportsPage:",e),ma.innerHTML=`
            <div class="flex flex-col items-center justify-center h-full text-red-500 p-6 text-center">
                <div class="bg-red-50 p-4 rounded-full mb-4"><svg class="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div>
                <h3 class="text-lg font-bold text-gray-800">Ops! Algo deu errado.</h3>
                <p class="text-sm text-gray-600 mt-2">${f(e.message)}</p>
                <button onclick="window.location.reload()" class="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-700 transition-transform active:scale-95">Tentar Novamente</button>
            </div>`}}function Gn(){const e=q.professionalsList.map(a=>`<option value="${a.id}">${f(a.name)}</option>`).join(""),t=q.costCentersList.map(a=>`<option value="${a.id}">${f(a.name)}</option>`).join("");ma.innerHTML=`
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
                                ${Bt(q.startDate)} até ${Bt(q.endDate)}
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
    `,document.getElementById("toggle-filters-btn").onclick=io,document.getElementById("btn-apply-filters").onclick=()=>{Yn(),io()},document.querySelectorAll(".tab-btn").forEach(a=>{a.onclick=()=>{q.currentTab=a.dataset.tab,lo(),ps(),window.scrollTo({top:0,behavior:"smooth"})}}),lo()}function io(){const e=document.getElementById("filters-container"),t=document.getElementById("toggle-filters-btn");q.isFilterOpen=!q.isFilterOpen,q.isFilterOpen?(e.classList.remove("hidden"),t.classList.add("bg-indigo-100","text-indigo-800")):(e.classList.add("hidden"),t.classList.remove("bg-indigo-100","text-indigo-800"))}function lo(){document.querySelectorAll(".tab-btn").forEach(e=>{const t=e.dataset.tab===q.currentTab;e.className=t?"tab-btn py-2 px-6 rounded-full text-xs md:text-sm font-bold bg-indigo-600 text-white shadow-md transform scale-105 transition-all whitespace-nowrap border-transparent":"tab-btn py-2 px-6 rounded-full text-xs md:text-sm font-medium text-gray-500 bg-white border-gray-200 hover:bg-gray-50 transition-all whitespace-nowrap"})}function Bt(e){if(!e)return"";const t=e.split("-");return`${t[2]}/${t[1]}`}async function Yn(){q.startDate=document.getElementById("report-start").value,q.endDate=document.getElementById("report-end").value,q.selectedProfessional=document.getElementById("report-prof").value,q.selectedCostCenter=document.getElementById("report-cost").value,document.getElementById("date-range-display").textContent=`${Bt(q.startDate)} até ${Bt(q.endDate)}`,await ms()}async function ms(){const e=document.getElementById("report-content");e.innerHTML='<div class="flex justify-center py-20"><div class="loader border-t-indigo-600"></div></div>';try{const t=q.selectedProfessional==="all"?null:q.selectedProfessional,a=Br(q.startDate,q.endDate,q.selectedProfessional,q.selectedCostCenter),s=_n(u.establishmentId,q.startDate,q.endDate).catch(()=>({labels:[],payables:[],receivables:[],expectedBalance:[]})),r=new Date(q.startDate+"T00:00:00").toISOString(),o=new Date(q.endDate+"T23:59:59").toISOString(),n=Ro(u.establishmentId,r,o,t).catch(()=>[]),[i,l,d]=await Promise.all([a,s,n]);q.data=i,q.cashFlowData=l,q.appointmentsData=Array.isArray(d)?d:[],ps()}catch(t){console.error(t),e.innerHTML=`
            <div class="bg-red-50 border border-red-100 p-6 rounded-2xl text-center mx-4">
                <div class="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                </div>
                <p class="font-bold text-gray-800">Não foi possível carregar</p>
                <p class="text-sm text-gray-500 mt-1">${f(t.message||"Verifique sua conexão.")}</p>
            </div>`}}function ps(){const e=document.getElementById("report-content");if(q.data)switch(q.currentTab){case"dashboards":Qn(e);break;case"appointments":Xn(e);break;case"dre":Zn(e);break}}function Qn(e){const{dreSimple:t,charts:a}=q.data,s=t||{grossRevenue:0,netProfit:0,variableCosts:0};e.innerHTML=`
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
                <p class="text-xl md:text-2xl font-black text-gray-800 tracking-tight">R$ ${s.grossRevenue.toLocaleString("pt-BR",{minimumFractionDigits:2})}</p>
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
                <p class="text-xl md:text-2xl font-black text-red-500 tracking-tight">R$ ${s.variableCosts.toLocaleString("pt-BR",{minimumFractionDigits:2})}</p>
                <div class="mt-3 md:mt-4 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                     <div class="h-full bg-red-500 rounded-full" style="width: ${s.grossRevenue>0?s.variableCosts/s.grossRevenue*100:0}%"></div>
                </div>
            </div>

            <div class="bg-white p-4 md:p-5 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
                <div class="flex items-center gap-2 mb-2">
                    <span class="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                        <svg class="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </span>
                    <p class="text-[10px] md:text-xs text-gray-500 font-bold uppercase tracking-wider">Lucro Líquido</p>
                </div>
                <p class="text-xl md:text-2xl font-black text-emerald-600 tracking-tight">R$ ${s.netProfit.toLocaleString("pt-BR",{minimumFractionDigits:2})}</p>
                 <div class="mt-3 md:mt-4 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                     <div class="h-full bg-emerald-500 rounded-full" style="width: ${s.grossRevenue>0?s.netProfit/s.grossRevenue*100:0}%"></div>
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
    `,q.cashFlowData&&Kn("chart-cashflow-modern",q.cashFlowData),co("chart-monthly","bar","Receita Mensal",a.salesMonthly.labels,a.salesMonthly.data,no[0]),co("chart-profs","doughnut","Total Vendas",a.professionals.labels,a.professionals.data,no)}function Xn(e){const t=q.appointmentsData,a=t.length;let s=0,r=0,o=0;const n={},i={};let l=new Date(q.startDate);const d=new Date(q.endDate);for(;l<=d;)n[l.toISOString().split("T")[0]]=0,l.setDate(l.getDate()+1);t.forEach(b=>{const h=parseFloat(b.totalAmount||b.price||0),v=(b.status||"").toLowerCase();let x=b.startTime?(b.startTime.toDate?b.startTime.toDate():new Date(b.startTime)).toISOString().split("T")[0]:"";const w=b.professionalName||"Sem Profissional";i[w]||(i[w]={name:w,count:0,value:0}),["cancelled","cancelado","no-show"].includes(v)?r++:(["completed","finalized","paid"].includes(v)&&s++,o+=h,x&&n.hasOwnProperty(x)&&n[x]++,i[w].count++,i[w].value+=h)});const c=Object.keys(n).sort(),m=c.map(b=>n[b]),g=Object.values(i).sort((b,h)=>h.value-b.value);e.innerHTML=`
        <div class="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 animate-slide-up w-full">
            <div class="bg-white p-3 md:p-4 rounded-2xl shadow-sm border border-gray-100 col-span-2 md:col-span-1">
                <p class="text-[10px] text-gray-500 font-bold uppercase">Agendamentos</p>
                <div class="flex items-end gap-2 mt-1">
                    <p class="text-2xl md:text-3xl font-black text-gray-800">${a}</p>
                </div>
            </div>
            
            <div class="bg-white p-3 md:p-4 rounded-2xl shadow-sm border border-gray-100">
                <p class="text-[10px] text-gray-500 font-bold uppercase">Concluídos</p>
                <p class="text-lg md:text-xl font-black text-indigo-600 mt-1">${a>0?Math.round(s/a*100):0}%</p>
            </div>
             <div class="bg-white p-3 md:p-4 rounded-2xl shadow-sm border border-gray-100">
                <p class="text-[10px] text-gray-500 font-bold uppercase">Cancelados</p>
                <p class="text-lg md:text-xl font-black text-red-500 mt-1">${r}</p>
            </div>

            <div class="bg-white p-3 md:p-4 rounded-2xl shadow-sm border border-gray-100 col-span-2 md:col-span-1">
                <p class="text-[10px] text-gray-500 font-bold uppercase">Valor Estimado</p>
                 <p class="text-xl md:text-2xl font-black text-gray-800 mt-1">R$ ${o.toLocaleString("pt-BR",{minimumFractionDigits:0})}</p>
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
                        ${g.map((b,h)=>{const v=g[0]?.value||1,x=b.value/v*100;return`
                            <tr class="group">
                                <td class="p-3 md:p-4 w-8 md:w-12 text-center font-bold text-gray-300">${h+1}</td>
                                <td class="p-3 md:p-4 pl-0 min-w-[100px]">
                                    <p class="font-bold text-gray-800 truncate">${f(b.name)}</p>
                                    <div class="w-full h-1.5 bg-gray-100 rounded-full mt-2 overflow-hidden">
                                        <div class="h-full bg-indigo-500 rounded-full" style="width: ${x}%"></div>
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
    `,ei("chart-appointments-daily",c,m)}function Zn(e){const{dreFinancial:t}=q.data;if(!t)return;const a=t.totalRevenues,s=(i,l,d,c=!1)=>{const m=a>0?l/a*100:0,g=c?"- ":"";return`
        <div class="flex items-center justify-between py-2 md:py-3 px-3 md:px-4 border-b border-dashed border-gray-100 last:border-0">
            <div class="flex-1 pr-2 md:pr-4 overflow-hidden">
                <p class="text-[10px] md:text-xs font-semibold text-gray-600 truncate">${f(i)}</p>
                <div class="w-full h-1 bg-gray-100 rounded-full mt-1.5 overflow-hidden max-w-[80px] md:max-w-[100px]">
                    <div class="h-full ${d.replace("text-","bg-")} opacity-40" style="width: ${Math.min(m,100)}%"></div>
                </div>
            </div>
            <div class="text-right flex-shrink-0">
                <p class="text-xs md:text-sm font-bold ${d}">${g}R$ ${l.toLocaleString("pt-BR",{minimumFractionDigits:2})}</p>
                <p class="text-[9px] md:text-[10px] text-gray-400 font-medium">${m.toFixed(1)}%</p>
            </div>
        </div>`},r=Object.entries(t.revenues).map(([i,l])=>s(i,l,"text-emerald-600",!1)).join(""),o=Object.entries(t.expenses).map(([i,l])=>s(i,l,"text-red-500",!0)).join("");t.netResult>=0;const n=t.netResult>=0?"Lucro":"Prejuízo";e.innerHTML=`
        <div class="max-w-xl mx-auto animate-slide-up pb-10 w-full">
            <div class="bg-gray-900 text-white rounded-3xl p-5 md:p-6 shadow-xl relative overflow-hidden mb-4 md:mb-6">
                <div class="absolute right-0 top-0 opacity-10 transform translate-x-1/4 -translate-y-1/4">
                    <svg class="w-32 h-32 md:w-48 md:h-48" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
                </div>
                <p class="text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Resultado Líquido</p>
                <h2 class="text-3xl md:text-4xl font-black mb-2">R$ ${t.netResult.toLocaleString("pt-BR",{minimumFractionDigits:2})}</h2>
                <span class="inline-block px-2 py-1 md:px-3 md:py-1 bg-white/20 rounded-lg text-[10px] md:text-xs font-bold backdrop-blur-sm">
                    ${n}: ${(a>0?t.netResult/a*100:0).toFixed(1)}% de Margem
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
                    <div>${o||'<p class="text-xs text-gray-400 p-4 text-center">Nenhuma despesa.</p>'}</div>
                </div>
            </div>
        </div>
    `}function Kn(e,t){const a=document.getElementById(e);if(!a)return;const s=a.getContext("2d");me[e]&&me[e].destroy();const r=s.createLinearGradient(0,0,0,400);r.addColorStop(0,"rgba(59, 130, 246, 0.4)"),r.addColorStop(1,"rgba(59, 130, 246, 0.0)");const o=t.payables.map(i=>i*-1),n=t.labels.map(i=>i.split("-").reverse().slice(0,2).join("/"));me[e]=new Chart(s,{type:"bar",data:{labels:n,datasets:[{label:"Saldo",data:t.expectedBalance,type:"line",borderColor:"#3b82f6",backgroundColor:r,borderWidth:3,pointRadius:3,pointBackgroundColor:"#fff",pointBorderColor:"#3b82f6",pointBorderWidth:2,pointHoverRadius:6,hitRadius:30,fill:!0,tension:.4,order:0,yAxisID:"y"},{label:"Entradas",data:t.receivables,backgroundColor:"#34d399",borderRadius:4,barPercentage:.6,order:1,yAxisID:"y"},{label:"Saídas",data:o,backgroundColor:"#f87171",borderRadius:4,barPercentage:.6,order:2,yAxisID:"y"}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"index",intersect:!1},plugins:{legend:{position:"top",align:"end",labels:{usePointStyle:!0,boxWidth:6,font:{family:"'Inter', sans-serif",size:10}}},tooltip:{backgroundColor:"#fff",titleColor:"#111",bodyColor:"#444",borderColor:"#eee",borderWidth:1,padding:10}},scales:{x:{grid:{display:!1},ticks:{font:{size:10}}},y:{display:!0,grid:{color:"#f3f4f6",borderDash:[4,4]},ticks:{callback:i=>new Intl.NumberFormat("pt-BR",{notation:"compact"}).format(i),font:{size:10}}}}}})}function ei(e,t,a){const s=document.getElementById(e);if(!s)return;const r=s.getContext("2d");me[e]&&me[e].destroy();const o=r.createLinearGradient(0,0,0,300);o.addColorStop(0,"rgba(99, 102, 241, 0.5)"),o.addColorStop(1,"rgba(99, 102, 241, 0.0)");const n=t.map(i=>i.split("-").reverse().slice(0,2).join("/"));me[e]=new Chart(r,{type:"line",data:{labels:n,datasets:[{label:"Agendamentos",data:a,borderColor:"#6366f1",backgroundColor:o,borderWidth:2,fill:!0,tension:.4,pointRadius:3,pointBackgroundColor:"#fff",pointBorderColor:"#6366f1",pointBorderWidth:2,pointHoverRadius:5,hitRadius:30}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"index",intersect:!1},plugins:{legend:{display:!1},tooltip:{backgroundColor:"#fff",titleColor:"#111",bodyColor:"#6366f1",borderColor:"#eee",borderWidth:1}},scales:{x:{grid:{display:!1},ticks:{font:{size:10}}},y:{beginAtZero:!0,grid:{color:"#f3f4f6"},ticks:{stepSize:1,font:{size:10}}}}}})}function co(e,t,a,s,r,o){const n=document.getElementById(e);if(!n)return;const i=n.getContext("2d");me[e]&&me[e].destroy(),new Chart(i,{type:t,data:{labels:s,datasets:[{label:a,data:r,backgroundColor:o,borderColor:Array.isArray(o)?"#fff":o,borderWidth:1,tension:.3,fill:t==="line"}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:t==="doughnut",position:"right",labels:{usePointStyle:!0,boxWidth:8,font:{size:10}}}},scales:t==="doughnut"?{}:{x:{grid:{display:!1},ticks:{font:{size:9}}},y:{grid:{color:"#f3f4f6"},beginAtZero:!0,ticks:{font:{size:9}}}}}})}const _t=(e,t="products")=>$(`/api/${t}/categories/${e}`),gs=(e,t="products")=>$(`/api/${t}/categories`,{method:"POST",body:JSON.stringify(e)}),bs=(e,t="products")=>$(`/api/${t}/categories/${e}`,{method:"DELETE"}),ti="audit_logs",He=async(e,t,a,s,r,o=null)=>{try{if(!t)return;await Mo(ge(W,ti),{establishmentId:e,userId:t.uid,userName:t.name||t.email||"Utilizador",module:a,action:s,description:r,details:o,timestamp:new Date})}catch(n){console.error("Falha silenciosa ao registar log:",n)}},xe=document.getElementById("content");let le=null,Ze="services",ke="all";function Oe(){const e=_.currentUser;return e?{uid:e.uid,name:e.displayName||e.email}:{uid:"unknown",name:"Desconhecido"}}async function ai(e){e.preventDefault();const a=e.target.closest("#categoryForm").querySelector("#categoryName"),s=a.value;if(s)try{await gs({establishmentId:u.establishmentId,name:s},"services"),He(u.establishmentId,Oe(),"Categorias (Serviços)","Criou",`Criou categoria: ${s}`),a.value="",p("Sucesso","Categoria criada!","success"),await Pa(),await ut()}catch(r){p("Erro",`Não foi possível criar a categoria: ${r.message}`,"error")}}async function oi(e){if(await z("Apagar Categoria","Tem a certeza? Os serviços nesta categoria ficarão sem categoria."))try{await bs(e,"services"),He(u.establishmentId,Oe(),"Categorias (Serviços)","Excluiu",`Excluiu uma categoria (ID: ${e})`),p("Sucesso","Categoria apagada.","success"),await Pa(),await ut()}catch{p("Erro","Não foi possível apagar a categoria.","error")}}async function Pa(){const e=document.getElementById("categoryList");if(e){e.innerHTML='<div class="loader mx-auto my-4"></div>';try{const t=await _t(u.establishmentId,"services");u.serviceCategories=t,e.innerHTML="",t.length>0?e.innerHTML=t.map(a=>`
                <div class="flex justify-between items-center bg-gray-100 p-2 rounded">
                    <span>${f(a.name)}</span>
                    <button data-action="delete-category" data-id="${a.id}" class="text-red-500 hover:text-red-700 font-semibold text-sm">Apagar</button>
                </div>`).join(""):e.innerHTML='<p class="text-center text-gray-500">Nenhuma categoria criada.</p>'}catch{e.innerHTML='<p class="text-red-500 text-center">Erro ao carregar categorias.</p>'}}}function si(){Q({title:"Gerir Categorias de Serviços",contentHTML:`
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
    `,maxWidth:"max-w-xl"});const t=document.getElementById("genericModal");if(t){const a=t.querySelector("#categoryForm");a&&(a.addEventListener("submit",ai),t.addEventListener("click",s=>{const r=s.target.closest('button[data-action="delete-category"]');r&&(s.preventDefault(),oi(r.dataset.id))}))}Pa()}async function ri(e){e.preventDefault();const t=e.target.closest("#serviceModal"),a=t.querySelector("#serviceId").value,s={},r=t.querySelector('input[name="commissionType"]:checked').value;r==="custom"&&t.querySelectorAll(".professional-commission-row").forEach(n=>{const i=n.dataset.profId;if(n.querySelector('input[type="checkbox"]').checked){const d=parseFloat(n.querySelector('input[type="number"]').value);s[i]=isNaN(d)?0:d}});const o={establishmentId:u.establishmentId,name:t.querySelector("#serviceName").value,price:parseFloat(t.querySelector("#servicePrice").value),duration:parseInt(t.querySelector("#serviceDurationMinutes").value,10),bufferTime:parseInt(t.querySelector("#serviceBufferTimeMinutes").value,10)||0,categoryId:t.querySelector("#serviceCategory").value||null,commissionRate:parseFloat(t.querySelector("#serviceCommissionRate").value)||0,active:t.querySelector("#serviceStatus").value==="true",photo:t.querySelector("#servicePhotoBase64").value,notes:t.querySelector("#serviceNotes").value,commissionType:r,professionalCommissions:s};try{a?(await nr(a,o),He(u.establishmentId,Oe(),"Serviços","Editou",`Editou o serviço: ${o.name}`)):(await Ho(o),He(u.establishmentId,Oe(),"Serviços","Criou",`Criou novo serviço: ${o.name}`)),document.getElementById("serviceModal").style.display="none",p("Sucesso",`Serviço ${a?"atualizado":"adicionado"} com sucesso!`,"success"),await ut()}catch(n){p("Erro",n.message,"error")}}function uo(e=null){const t=document.getElementById("serviceModal"),a=u.serviceCategories||[],s=e?.duration||0,r=e?.bufferTime||0,o=f(e?.name||""),n=f(e?.notes||""),i=e?o:"Novo Serviço",l=a.map(E=>`<option value="${E.id}" ${e?.categoryId===E.id?"selected":""}>${f(E.name)}</option>`).join("");t.innerHTML=`
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
    </div>`,t.style.display="flex",t.addEventListener("click",async E=>{const L=E.target.closest("button[data-action]");if(!L)return;const D=L.dataset.action,H=L.dataset.id;if(D==="close-modal"&&(t.style.display="none"),D==="delete-service"){if(!H)return;if(t.style.display="none",await z("Apagar Serviço","Tem a certeza que deseja apagar este serviço?"))try{const B=u.services.find(A=>A.id===H)?.name||"Desconhecido";await ir(H),He(u.establishmentId,Oe(),"Serviços","Excluiu",`Excluiu o serviço: ${B}`),p("Sucesso","Serviço apagado com sucesso!","success"),await ut()}catch(B){p("Erro",`Não foi possível apagar o serviço: ${B.message}`,"error")}else t.style.display="flex"}});const d=t.querySelectorAll(".tab-btn"),c=t.querySelectorAll(".tab-content");d.forEach(E=>{E.addEventListener("click",()=>{d.forEach(L=>{L.classList.remove("border-indigo-500","text-indigo-600"),L.classList.add("border-transparent","text-gray-500","hover:text-gray-700","hover:border-gray-300")}),E.classList.add("border-indigo-500","text-indigo-600"),E.classList.remove("border-transparent","text-gray-500","hover:text-gray-700","hover:border-gray-300"),c.forEach(L=>L.classList.add("hidden")),document.getElementById(`tab-content-${E.dataset.tab}`).classList.remove("hidden")})});const m=t.querySelectorAll('input[name="commissionType"]'),g=document.getElementById("defaultCommissionRateContainer"),b=document.getElementById("professionalCommissionsContainer");function h(){const E=t.querySelector('input[name="commissionType"]:checked').value;g&&(g.style.display=E==="default"?"block":"none"),b&&(b.style.display=E==="custom"?"block":"none")}m.forEach(E=>E.addEventListener("change",h));const v=document.getElementById("professionalCommissionsList");v&&(v.innerHTML=(u.professionals||[]).map(E=>{const L=e?.professionalCommissions?.[E.id]!==void 0,D=e?.professionalCommissions?.[E.id]||0;return`
                <div class="professional-commission-row flex items-center justify-between p-2 rounded-md ${L?"bg-blue-50":""}" data-prof-id="${E.id}">
                    <label class="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" ${L?"checked":""} class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                        <img src="${E.photo||`https://placehold.co/40x40/E2E8F0/4A5568?text=${f(E.name.charAt(0))}`}" class="w-8 h-8 rounded-full object-cover">
                        <span class="text-sm font-medium">${f(E.name)}</span>
                    </label>
                    <div class="flex items-center gap-1">
                        <input type="number" value="${D}" class="w-20 p-1 border rounded-md text-sm text-center" ${L?"":"disabled"}>
                        <span class="text-sm font-semibold">%</span>
                    </div>
                </div>
            `}).join(""),v.querySelectorAll('input[type="checkbox"]').forEach(E=>{E.addEventListener("change",L=>{const D=L.target.closest(".professional-commission-row");D.querySelector('input[type="number"]').disabled=!L.target.checked,D.classList.toggle("bg-blue-50",L.target.checked)})})),h();const x=t.querySelector("#serviceForm"),w=t.querySelector("#servicePhotoInput"),S=t.querySelector("#servicePhotoPreview"),k=t.querySelector("#servicePhotoBase64");t.querySelector("#servicePhotoButton").addEventListener("click",()=>w.click()),w.onchange=async()=>{const E=w.files[0];if(E){S.src="https://placehold.co/128x128/E2E8F0/4A5568?text=...";try{const L=await Xo(E,800,800,.8),H=L.length*3/4,P=1e3*1024;if(H>P)throw new Error("A imagem é muito grande mesmo após a compressão.");S.src=L,k.value=L}catch(L){console.error("Erro ao processar imagem:",L),p("Erro de Imagem",L.message||"Não foi possível processar a imagem.","error"),S.src=e?.photo||"https://placehold.co/128x128/E2E8F0/4A5568?text=Foto",k.value=e?.photo||"",w.value=""}}},x.addEventListener("submit",ri)}function Pe(){const e=document.getElementById("servicesList");if(!e)return;const t=document.getElementById("serviceSearchInput")?.value.toLowerCase()||"",a=document.getElementById("serviceCategoryFilter")?.value||"all",s=new Map((u.serviceCategories||[]).map(o=>[o.id,o.name]));let r=(u.services||[]).filter(Boolean);if(ke!=="all"){const o=ke==="active";r=r.filter(n=>n.active!==!1===o)}r=r.filter(o=>{const n=o.name.toLowerCase().includes(t),i=a==="all"||o.categoryId===a;return n&&i}),e.innerHTML="",r.length>0?r.forEach(o=>{const n=document.createElement("div"),i=JSON.stringify(o).replace(/'/g,"&apos;");n.className=`service-card bg-white rounded-lg shadow-md flex overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-lg hover:bg-gray-50 ${o.active!==!1?"opacity-100":"opacity-50 bg-gray-100"} sm:flex-col`,n.dataset.action="edit-service",n.dataset.service=i;const l=f(o.name),d=f(s.get(o.categoryId)||"N/A"),c=o.photo||`https://placehold.co/200x200/E2E8F0/4A5568?text=${encodeURIComponent(o.name.charAt(0))}`;n.innerHTML=`
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
                </div>`,e.appendChild(n)}):e.innerHTML='<p class="col-span-full text-center text-gray-500 py-10">Nenhum serviço encontrado.</p>'}function Ba(){const e={active:0,inactive:0,total:0},t=(u.services||[]).filter(Boolean);t.forEach(n=>{n.active===!1?e.inactive++:e.active++}),e.total=t.length;const a=document.getElementById("indicator-total"),s=document.getElementById("indicator-active"),r=document.getElementById("indicator-inactive"),o=document.getElementById("indicator-popular");a&&(a.textContent=e.total),s&&(s.textContent=e.active),r&&(r.textContent=e.inactive),o&&(u.mostPopularService&&u.mostPopularService.name!=="N/A"?(o.textContent=f(u.mostPopularService.name),o.closest(".indicator-card").title=`${u.mostPopularService.name} (${u.mostPopularService.count} agendamentos)`):(o.textContent="N/A",o.closest(".indicator-card").title="Nenhum serviço agendado ainda"))}function ni(){const e=document.getElementById("services-content-container");e.innerHTML=`
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
    `;const t=document.getElementById("serviceCategoryFilter");t&&(t.innerHTML='<option value="all">Todas as categorias</option>',(u.serviceCategories||[]).forEach(a=>t.innerHTML+=`<option value="${a.id}">${f(a.name)}</option>`)),Ba(),Pe()}function ii(){const e=document.getElementById("services-content-container");e.innerHTML=`
        <div class="p-8 text-center">
            <h3 class="text-xl font-bold text-gray-700">Relatórios de Serviços</h3>
            <p class="text-gray-500 mt-2">Em breve, aqui poderás ver relatórios detalhados sobre os teus serviços mais rentáveis, mais agendados e muito mais.</p>
        </div>
    `}async function ut(){const e=document.getElementById("services-content-container");if(e){const t=e.querySelector(".loader");t&&(t.style.display="block")}try{const[t,a,s,r]=await Promise.all([be(u.establishmentId),K(u.establishmentId),_t(u.establishmentId,"services"),dr(u.establishmentId)]);u.services=(t||[]).filter(Boolean),u.professionals=(a||[]).filter(Boolean),u.serviceCategories=(s||[]).filter(Boolean),u.mostPopularService=r||{name:"N/A",count:0},u.services.forEach(o=>{o.active===void 0&&(o.active=!0)}),fs(Ze)}catch(t){e&&(e.innerHTML='<p class="text-red-500 col-span-full text-center py-10">Erro ao carregar dados. Verifique a conexão com o servidor.</p>'),p("Erro",`Não foi possível carregar os dados: ${t.message}`,"error")}}function fs(e){if(document.getElementById("services-content-container")){if(Ze===e&&document.getElementById("services-content-container").children.length>1){Ze==="services"&&(Ba(),Pe());return}Ze=e,ke="all",document.querySelectorAll("#services-tabs button.tab-button").forEach(t=>{const a=t.dataset.view===e;t.classList.toggle("border-indigo-500",a),t.classList.toggle("text-indigo-600",a),t.classList.toggle("border-transparent",!a),t.classList.toggle("text-gray-500",!a)}),e==="services"?ni():e==="reports"&&ii()}}function li(){le&&(xe.removeEventListener("click",le),xe.removeEventListener("input",le),xe.removeEventListener("change",le)),le=async e=>{const t=e.target;if(t.closest('[data-action="toggle-service-status"]')){e.stopPropagation();const r=t.closest('[data-action="toggle-service-status"]'),o=r.dataset.id,n=r.checked;try{await lr(o,n);const i=u.services.findIndex(l=>l.id===o);i>-1&&(u.services[i].active=n),He(u.establishmentId,Oe(),"Serviços","Atualizou Status",`Alterou status do serviço (ID: ${o}) para ${n?"Ativo":"Inativo"}`),Pe(),Ba()}catch(i){p("Erro",`Não foi possível atualizar o status: ${i.message}`,"error"),r.checked=!n,Pe()}return}const a=t.closest("button[data-action], button[data-view], .indicator-card[data-action], .service-card[data-action]");if(t.id==="serviceSearchInput"||t.id==="serviceCategoryFilter"){Pe();return}if(!a)return;if(a.hasAttribute("data-view")){fs(a.dataset.view);return}switch(a.dataset.action){case"new-service":uo();break;case"edit-service":const r=JSON.parse(a.dataset.service);uo(r);break;case"manage-categories":si();break;case"filter-service":const o=a.dataset.filterType;if(o==="popular")return;ke=o==="total"?"all":o,document.querySelectorAll('.indicator-card[data-action="filter-service"]').forEach(n=>{const i=n.dataset.filterType,d=i===ke||i==="total"&&ke==="all";n.classList.toggle("ring-2",d),n.classList.toggle("ring-indigo-500",d),n.classList.toggle("shadow-lg",d)}),Pe();break}},xe.addEventListener("click",le),xe.addEventListener("input",le),xe.addEventListener("change",le)}async function di(){xe.innerHTML=`
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
        </section>`,li();try{(!u.professionals||u.professionals.length===0)&&(u.professionals=await K(u.establishmentId)||[])}catch(e){console.error("Falha ao carregar profissionais:",e),p("Erro","Não foi possível carregar a lista de profissionais.","error"),u.professionals=[]}Ze="services",ke="all",await ut()}const Wt="suppliers",Da="purchases",vs="financial_payables",Ma=async e=>{try{const t=jt(ge(W,Wt),rt("establishmentId","==",e)),a=await xa(t),s=[];return a.forEach(r=>{s.push({id:r.id,...r.data()})}),s}catch(t){throw console.error("Erro ao buscar fornecedores:",t),t}},ci=async e=>{try{return{id:(await Mo(ge(W,Wt),e)).id,...e}}catch(t){throw console.error("Erro ao criar fornecedor:",t),t}},ui=async(e,t)=>{try{const a=pe(W,Wt,e);return await ha(a,t),{id:e,...t}}catch(a){throw console.error("Erro ao atualizar fornecedor:",a),a}},mi=async e=>{try{const t=pe(W,Wt,e);return await Rs(t),!0}catch(t){throw console.error("Erro ao excluir fornecedor:",t),t}},pi=async(e,t=null)=>{try{const a=qo(W),s=pe(ge(W,Da)),r={...e,createdAt:Oa()};if(a.set(s,r),t&&t.defaultNatureId&&t.defaultCostCenterId){const o=pe(ge(W,vs)),n=new Date().toISOString().split("T")[0],i={establishmentId:e.establishmentId,description:`Compra - ${e.supplierName}`,amount:parseFloat(e.totalAmount),dueDate:n,naturezaId:t.defaultNatureId,centroDeCustoId:t.defaultCostCenterId,notes:`Gerado automaticamente pelo Pedido de Compra. Itens: ${e.items.length}`,status:"pending",paymentDate:null,purchaseId:s.id,createdAt:Oa()};a.set(o,i)}return await a.commit(),{id:s.id,...r}}catch(a){throw console.error("Erro ao registrar compra com integração:",a),a}},gi=async(e,t)=>{try{const a=qo(W),s=pe(W,Da,e);a.delete(s);const r=jt(ge(W,vs),rt("purchaseId","==",e),rt("establishmentId","==",t));return(await xa(r)).forEach(n=>{a.delete(n.ref)}),await a.commit(),!0}catch(a){throw console.error("Erro ao excluir compra e financeiro:",a),a}},bi=async e=>{try{const t=jt(ge(W,Da),rt("establishmentId","==",e),Ao("createdAt","desc")),a=await xa(t),s=[];return a.forEach(r=>{s.push({id:r.id,...r.data()})}),s}catch(t){throw console.error("Erro ao buscar histórico de compras:",t),t}},fe=document.getElementById("content");let de=null,Ke="products",se="all";async function fi(e){e.preventDefault();const a=e.target.closest("#categoryForm").querySelector("#categoryName"),s=a.value;if(s)try{await gs({establishmentId:u.establishmentId,name:s},"products"),a.value="",p("Sucesso","Categoria de produto criada!","success"),await Aa(),await mt()}catch(r){p("Erro",`Não foi possível criar a categoria: ${r.message}`,"error")}}async function vi(e){if(await z("Apagar Categoria","Tem a certeza? Os produtos nesta categoria ficarão sem categoria."))try{await bs(e,"products"),p("Sucesso","Categoria de produto apagada.","success"),await Aa(),await mt()}catch{p("Erro","Não foi possível apagar a categoria.","error")}}async function Aa(){const e=document.getElementById("categoryList");if(e){e.innerHTML='<div class="loader mx-auto my-4"></div>';try{const t=await _t(u.establishmentId,"products");u.categories=t,e.innerHTML="",t.length>0?e.innerHTML=t.map(a=>`
                <div class="flex justify-between items-center bg-gray-100 p-2 rounded">
                    <span>${f(a.name)}</span>
                    <button data-action="delete-category" data-id="${a.id}" class="text-red-500 hover:text-red-700 font-semibold text-sm">Apagar</button>
                </div>`).join(""):e.innerHTML='<p class="text-center text-gray-500">Nenhuma categoria encontrada.</p>'}catch{e.innerHTML='<p class="text-red-500 text-center">Erro ao carregar categorias.</p>'}}}function hi(){Q({title:"Gerir Categorias de Produtos",contentHTML:`
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
    `,maxWidth:"max-w-xl"});const t=document.getElementById("genericModal");if(t){const a=t.querySelector("#categoryForm");a&&(a.addEventListener("submit",fi),t.addEventListener("click",s=>{const r=s.target.closest('button[data-action="delete-category"]');r&&vi(r.dataset.id)}))}Aa()}async function xi(e){if(!e)return;if(await z("Apagar Produto","Tem a certeza que deseja apagar este produto? Esta ação não pode ser revertida."))try{await ur(e),p("Sucesso","Produto apagado com sucesso!","success"),await mt()}catch(a){p("Erro",`Não foi possível apagar o produto: ${a.message}`,"error")}}async function yi(e){const t=e.querySelector("#productId").value,a=parseInt(e.querySelector("#productCurrentStock").value),s=parseInt(e.querySelector("#productMinStock").value),r=parseInt(e.querySelector("#productMaxStock").value),o=e.querySelectorAll("#selectedSuppliersList .selected-supplier-item"),n=Array.from(o).map(l=>l.dataset.id),i={establishmentId:u.establishmentId,name:e.querySelector("#productName").value,price:parseFloat(e.querySelector("#productPrice").value),costPrice:parseFloat(e.querySelector("#productCostPrice").value)||0,commissionRate:parseFloat(e.querySelector("#productCommissionRate").value)||0,currentStock:isNaN(a)?0:a,minStock:isNaN(s)?0:s,maxStock:isNaN(r)?0:r,categoryId:e.querySelector("#productCategory").value||null,photo:e.querySelector("#productPhotoBase64").value,supplierIds:n};try{t?await cr(t,i):await Oo(i),document.getElementById("productModal").style.display="none",p("Sucesso",`Produto ${t?"atualizado":"adicionado"} com sucesso!`,"success"),await mt()}catch(l){throw new Error(l.message)}}function mo(e,t=800,a=800,s="image/jpeg",r=.8){return new Promise((o,n)=>{if(!e.type.startsWith("image/"))return n(new Error("O ficheiro selecionado não é uma imagem."));const i=new FileReader;i.onload=l=>{const d=new Image;d.onload=()=>{let c=d.width,m=d.height;c>m?c>t&&(m*=t/c,c=t):m>a&&(c*=a/m,m=a);const g=document.createElement("canvas");g.width=c,g.height=m,g.getContext("2d").drawImage(d,0,0,c,m);const h=g.toDataURL(s,r);o(h)},d.onerror=c=>n(new Error("Não foi possível carregar a imagem.")),d.src=l.target.result},i.onerror=l=>n(new Error("Não foi possível ler o ficheiro.")),i.readAsDataURL(e)})}function po(e=null){const t=document.getElementById("productModal"),a=u.categories||[],s=u.suppliers||[],r=a.map(P=>`<option value="${P.id}" ${e?.categoryId===P.id?"selected":""}>${f(P.name)}</option>`).join("");let o=new Set(e?.supplierIds||[]);const n=f(e?.name||""),i=e?.price||"",l=e?.costPrice||"",d=e?.commissionRate||"",c=e?.minStock||0,m=e?.maxStock||0,g=e?.currentStock||0,b=e?n:"Novo Produto";t.innerHTML=`
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
                        <div class="form-group"><label for="productMaxStock">Máximo</label><input type="number" id="productMaxStock" value="${m}" class="mt-1 w-full p-2 border rounded-md"></div>
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
    </div>`;const h=t.querySelector("#productCategory"),v=t.querySelector("#productPhotoInput");t.querySelector("#productPhotoButton").addEventListener("click",()=>v.click()),h.innerHTML='<option value="">Sem categoria</option>'+(u.categories||[]).map(P=>`<option value="${P.id}" ${e?.categoryId===P.id?"selected":""}>${f(P.name)}</option>`).join(""),e&&(h.value=e.categoryId||"");const x=t.querySelector("#productPhotoPreview");t.querySelector("#productPhotoBase64");const w=e?.photo||"https://placehold.co/128x128/E2E8F0/4A5568?text=Foto",S=e?.photo||"";v.onchange=async()=>{const P=v.files[0];if(P){x.src="https://placehold.co/128x128/E2E8F0/4A5568?text=...";try{const B=await mo(P,800,800,"image/jpeg",.8),M=B.length*3/4,F=1e3*1024;if(M>F)throw new Error("A imagem é muito grande mesmo após a compressão.");preview.src=B,base64Input.value=B}catch(B){console.error("Erro ao processar imagem:",B),p("Erro de Imagem",B.message||"Não foi possível processar a imagem.","error"),preview.src=w,base64Input.value=S,H.value=""}}};const k=t.cloneNode(!0);t.parentNode.replaceChild(k,t);const E=()=>{const P=k.querySelector("#modalSupplierSearch"),B=k.querySelector("#supplierSearchResults"),A=k.querySelector("#selectedSuppliersList"),M=P.value.toLowerCase();if(M.length>0){const F=s.filter(j=>j.name.toLowerCase().includes(M)&&!o.has(j.id));F.length>0?(B.classList.remove("hidden"),B.innerHTML=F.map(j=>`
                    <div class="p-2 hover:bg-indigo-50 cursor-pointer border-b last:border-0 text-sm flex justify-between items-center" data-add-supplier="${j.id}">
                        <span class="font-medium">${f(j.name)}</span>
                        <span class="text-indigo-600 text-xs">+ Adicionar</span>
                    </div>
                `).join("")):(B.classList.remove("hidden"),B.innerHTML='<div class="p-2 text-xs text-gray-500 text-center">Nenhum resultado disponível.</div>')}else B.classList.add("hidden");o.size>0?(A.innerHTML="",o.forEach(F=>{const j=s.find(U=>U.id===F);j&&(A.innerHTML+=`
                        <div class="selected-supplier-item flex items-center justify-between bg-white border p-2 rounded shadow-sm" data-id="${j.id}">
                            <div class="text-sm">
                                <p class="font-bold text-gray-800">${f(j.name)}</p>
                                <p class="text-xs text-gray-500">${f(j.contactName||"")} - ${f(j.phone||"")}</p>
                            </div>
                            <button type="button" class="text-red-500 hover:text-red-700 p-1" data-remove-supplier="${j.id}" title="Remover">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </div>
                    `)})):A.innerHTML='<p class="text-xs text-gray-400 text-center py-2">Nenhum fornecedor selecionado.</p>'};k.querySelector("#modalSupplierSearch").addEventListener("input",E),k.addEventListener("click",P=>{const B=P.target.closest("[data-add-supplier]");if(B){const M=B.dataset.addSupplier;o.add(M),k.querySelector("#modalSupplierSearch").value="",E()}const A=P.target.closest("[data-remove-supplier]");if(A){const M=A.dataset.removeSupplier;o.delete(M),E()}}),E(),k.addEventListener("click",async P=>{const B=P.target.closest("button[data-action]");if(!B)return;const A=B.dataset.action,M=k.querySelector("#productId").value;if(A==="close-modal"&&(k.style.display="none"),A==="delete-product"){if(!M)return;k.style.display="none",await xi(M)}if(A==="save-product-modal"){const F=k.querySelector("#productForm");if(F){if(!F.querySelector("#productName").value||!F.querySelector("#productPrice").value){p("Erro","Nome e Preço de Venda são obrigatórios.","error");return}const j=B.closest('button[data-action="save-product-modal"]');j.disabled=!0,j.textContent="A salvar...";try{await yi(F)}catch(U){p("Erro",`Falha ao salvar: ${U.message}`,"error"),j.disabled=!1,j.textContent="Salvar Alterações"}}}if(A==="adjust-stock-modal"){P.preventDefault();const F=k.querySelector("#stockAdjustmentAmount"),j=k.querySelector("#stockAdjustmentReason"),U=parseInt(F.value,10),ie=parseInt(B.dataset.change,10);if(!U||U<=0){p("Erro","Por favor, insira uma quantidade válida.","error");return}const Qt=U*ie,Ls=j.value||(Qt>0?"Entrada manual":"Saída manual");try{await mr(M,{change:Qt,reason:Ls});const _e=u.products.findIndex(We=>We.id===M);if(_e>-1){const We=u.products[_e].currentStock+Qt;u.products[_e].currentStock=We,k.querySelector("#currentStockDisplay").textContent=We,k.querySelector("#productCurrentStock").value=We,F.value="",j.value="",p("Sucesso","Estoque atualizado!","success"),qa(),it()}}catch(_e){p("Erro de Stock",_e.message,"error")}}});const L=k.querySelectorAll(".tab-btn"),D=k.querySelectorAll(".tab-content");L.forEach(P=>{P.addEventListener("click",B=>{B.preventDefault(),L.forEach(A=>{A.classList.remove("border-indigo-500","text-indigo-600"),A.classList.add("border-transparent","text-gray-500","hover:text-gray-700","hover:border-gray-300")}),P.classList.add("border-indigo-500","text-indigo-600"),P.classList.remove("border-transparent","text-gray-500","hover:text-gray-700","hover:border-gray-300"),D.forEach(A=>A.classList.add("hidden")),document.getElementById(`tab-content-${P.dataset.tab}`).classList.remove("hidden")})});const H=k.querySelector("#productPhotoInput");k.querySelector("#productPhotoButton").addEventListener("click",()=>H.click()),H.onchange=async()=>{const P=H.files[0];if(!P)return;const B=k.querySelector("#productPhotoPreview"),A=k.querySelector("#productPhotoBase64");B.src="https://placehold.co/128x128/E2E8F0/4A5568?text=...";try{const M=await mo(P,800,800,"image/jpeg",.8),j=M.length*3/4,U=1e3*1024;if(j>U)throw new Error("A imagem é muito grande mesmo após a compressão.");B.src=M,A.value=M}catch(M){console.error("Erro ao processar imagem:",M),p("Erro de Imagem",M.message||"Não foi possível processar a imagem.","error"),B.src=w,A.value=S,H.value=""}},k.style.display="flex"}function wi(){const e=document.getElementById("products-content-container");e.innerHTML=`
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
    `;const t=document.getElementById("productCategoryFilter");t&&(t.innerHTML='<option value="all">Todas as categorias</option>',(u.categories||[]).forEach(a=>t.innerHTML+=`<option value="${a.id}">${f(a.name)}</option>`)),qa(),it()}function ki(){const e=document.getElementById("products-content-container"),t=new Date().toISOString().split("T")[0],a=new Date;a.setDate(a.getDate()-30);const s=a.toISOString().split("T")[0];e.innerHTML=`
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
        </div>`;const r=document.getElementById("productFilterReport"),o=document.getElementById("categoryFilterReport");r&&u.products&&(r.innerHTML+=u.products.map(n=>`<option value="${n.id}">${f(n.name)}</option>`).join("")),o&&u.categories&&(o.innerHTML+=u.categories.map(n=>`<option value="${n.id}">${f(n.name)}</option>`).join(""))}async function Si(){const e=document.getElementById("report-results");e.innerHTML='<div class="loader mx-auto my-8"></div>';const t={startDate:document.getElementById("reportStartDate").value,endDate:document.getElementById("reportEndDate").value,productId:document.getElementById("productFilterReport").value,categoryId:document.getElementById("categoryFilterReport").value,establishmentId:u.establishmentId};try{const a=await pr(t);if(a.length===0){e.innerHTML=`
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
                                <td class="px-4 py-3 whitespace-nowrap font-semibold text-gray-800">${f(o.productName)}</td>
                                <td class="px-4 py-3 whitespace-nowrap text-center font-bold ${o.change>0?"text-green-600":"text-red-600"}">
                                    ${o.change>0?"+":""}${o.change}
                                </td>
                                <td class="px-4 py-3 whitespace-nowrap text-center text-gray-500">${o.oldStock}</td>
                                <td class="px-4 py-3 whitespace-nowrap text-center text-gray-800 font-medium">${o.newStock}</td>
                                <td class="px-4 py-3 whitespace-nowrap text-gray-600 truncate max-w-xs" title="${f(o.reason)}">${f(o.reason)}</td>
                                <td class="px-4 py-3 whitespace-nowrap text-gray-600">${f(o.user)}</td>
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
                                <h4 class="font-bold text-gray-800 text-base line-clamp-1">${f(o.productName)}</h4>
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
                            <span class="text-gray-600 truncate max-w-[60%] font-medium" title="${f(o.reason)}">
                                ${f(o.reason)||"Sem motivo"}
                            </span>
                            <span class="text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                                ${f(o.user)||"Sistema"}
                            </span>
                        </div>
                    </div>
                `).join("")}
            </div>`;e.innerHTML=s+r}catch(a){p("Erro",`Não foi possível gerar o relatório: ${a.message}`,"error"),e.innerHTML=`<div class="bg-white border border-red-200 rounded-lg p-8 text-center text-red-500">${a.message}</div>`}}function qa(){const e={ok:0,near_min:0,at_min:0,empty:0};if(!u.products)return;u.products.forEach(o=>{if(!o)return;const n=o.currentStock,i=o.minStock;n<=0?e.empty++:i>0&&n<=i?e.at_min++:i>0&&n<=i*1.2?e.near_min++:e.ok++});const t=document.getElementById("indicator-ok"),a=document.getElementById("indicator-near-min"),s=document.getElementById("indicator-at-min"),r=document.getElementById("indicator-empty");t&&(t.textContent=e.ok),a&&(a.textContent=e.near_min),s&&(s.textContent=e.at_min),r&&(r.textContent=e.empty)}function it(){const e=document.getElementById("productsList");if(!e)return;const t=document.getElementById("productSearchInput")?.value.toLowerCase()||"",a=document.getElementById("productCategoryFilter")?.value||"all",s=new Map((u.categories||[]).map(o=>[o.id,o.name]));let r=(u.products||[]).filter(Boolean);se!=="all"&&(r=r.filter(o=>{const n=o.currentStock,i=o.minStock;switch(se){case"ok":return n>0&&(i===0||n>i*1.2);case"near_min":return i>0&&n>i&&n<=i*1.2;case"at_min":return i>0&&n>0&&n<=i;case"empty":return n<=0;default:return!0}})),r=r.filter(o=>{const n=o.name.toLowerCase().includes(t),i=a==="all"||o.categoryId===a;return n&&i}),e.innerHTML="",r.length>0?(e.className="space-y-3 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 sm:gap-4 sm:space-y-0",r.forEach(o=>{const n=document.createElement("div"),i=JSON.stringify(o).replace(/'/g,"&apos;");n.className=`product-card bg-white rounded-lg shadow-md flex items-center gap-3 p-3 overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-lg hover:bg-gray-50 
                              sm:flex-col sm:p-0 sm:items-stretch sm:gap-0`,n.dataset.action="edit-product",n.dataset.product=i;const l=o.photo||`https://placehold.co/200x200/E2E8F0/4A5568?text=${encodeURIComponent(o.name.charAt(0))}`,d=s.get(o.categoryId)||"N/A";let c="",m="text-gray-500";const g=o.currentStock,b=o.minStock;g<=0?(c='<span class="text-xs font-semibold text-red-600">Esgotado</span>',m="text-red-600 font-semibold"):b>0&&g<=b?(c='<span class="text-xs font-semibold text-orange-600">Estoque Mínimo</span>',m="text-orange-600 font-semibold"):b>0&&g<=b*1.2?(c='<span class="text-xs font-semibold text-blue-600">Estoque Baixo</span>',m="text-blue-600 font-semibold"):(c='<span class="text-xs font-semibold text-green-600">Em Estoque</span>',m="text-green-600 font-semibold"),n.innerHTML=`
                <img src="${l}" alt="Imagem de ${f(o.name)}" class="w-16 h-16 rounded-md object-cover flex-shrink-0 sm:w-full sm:h-24 sm:rounded-b-none">
                
                <div class="flex-1 sm:p-3 sm:flex sm:flex-col sm:flex-grow">
                    <div class="sm:flex-grow">
                        <div class="flex justify-between items-start mb-1 gap-2">
                            <h3 class="text-sm font-bold text-gray-900 flex-1 text-left">${f(o.name)}</h3>
                            <div class="hidden sm:block">${c}</div>
                        </div>
                        
                        <p class="text-xl font-bold text-indigo-600 mb-1 text-left hidden sm:block">R$ ${o.price.toFixed(2)}</p>
                        
                        <p class="text-xs text-gray-500 text-left mb-2 hidden sm:block">Categoria: ${f(d)}</p>
                    </div>

                    <div class="flex justify-between items-center mt-2 sm:mt-0">
                        <p class="text-lg font-bold text-indigo-600 text-left sm:hidden">R$ ${o.price.toFixed(2)}</p>
                        <p class="text-xs text-gray-500 text-right sm:text-left">
                            Estoque: <span class="font-bold text-base ${m}">${o.currentStock}</span>
                        </p>
                    </div>
                </div>`,e.appendChild(n)})):(e.className="",e.innerHTML='<p class="col-span-full text-center text-gray-500 py-10">Nenhum produto encontrado.</p>')}async function mt(){const e=document.getElementById("products-content-container");e&&(e.innerHTML='<div class="loader col-span-full mx-auto my-8"></div>');try{const[t,a,s]=await Promise.all([lt(u.establishmentId),_t(u.establishmentId,"products"),Ma(u.establishmentId)]);u.products=(t||[]).filter(Boolean),u.categories=(a||[]).filter(Boolean),u.suppliers=(s||[]).filter(Boolean),hs(Ke)}catch(t){e&&(e.innerHTML=`<p class="text-red-500 col-span-full text-center p-8">Erro ao carregar dados: ${t.message}</p>`)}}function hs(e){if(document.getElementById("products-content-container")){if(Ke===e&&document.getElementById("products-content-container").children.length>1){Ke==="products"&&(qa(),it());return}Ke=e,se="all",document.querySelectorAll("#products-tabs button.tab-button").forEach(t=>{const a=t.dataset.view===e;t.classList.toggle("border-indigo-500",a),t.classList.toggle("text-indigo-600",a),t.classList.toggle("border-transparent",!a),t.classList.toggle("text-gray-500",!a)}),e==="products"?wi():e==="movements"&&ki()}}async function $i(){fe.innerHTML=`
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
        </section>`,de&&(fe.removeEventListener("click",de),fe.removeEventListener("input",de),fe.removeEventListener("change",de)),de=async e=>{const t=e.target;if(t.id==="productSearchInput"||t.id==="productCategoryFilter"){it();return}const a=e.target.closest("button[data-action], button[data-view], .indicator-card[data-action], .product-card[data-action]");if(!a||e.target.closest('[data-action-stop-propagation="true"]'))return;if(a.hasAttribute("data-view")){hs(a.dataset.view);return}switch(a.dataset.action){case"new-product":po();break;case"edit-product":po(JSON.parse(a.dataset.product));break;case"manage-product-categories":hi();break;case"generate-report":await Si();break;case"filter-stock":const r=a.dataset.filterType;se=se===r?"all":r,document.querySelectorAll(".indicator-card").forEach(o=>{o.classList.toggle("ring-2",o.dataset.filterType===se),o.classList.toggle("ring-indigo-500",o.dataset.filterType===se),o.classList.toggle("shadow-lg",o.dataset.filterType===se)}),it();break}},fe.addEventListener("click",de),fe.addEventListener("input",de),fe.addEventListener("change",de),Ke="products",se="all",await mt()}const ve=document.getElementById("content");let ce=null,Et="list",O={step:1,productsToBuy:[],allSuppliers:[],finalOrders:{},isQuoteMode:!1};async function Ei(){Et==="list"?Jt():Et==="purchases"?(O.step=1,et()):Et==="history"&&xs()}async function Ii(){try{const e=await Ma(u.establishmentId);return u.suppliers=e||[],O.allSuppliers=e,!0}catch(e){return console.error(e),!1}}async function Ci(e){if(await z("Excluir Fornecedor","Tem a certeza? Isso removerá o vínculo com os produtos."))try{await mi(e),p("Sucesso","Fornecedor excluído.","success"),Ft("genericModal"),Jt()}catch(t){p("Erro","Erro ao excluir: "+t.message,"error")}}async function Li(e){e.preventDefault();const t=e.target,a=t.querySelector("#supId").value,s={name:t.querySelector("#supName").value,contactName:t.querySelector("#supContact").value,email:t.querySelector("#supEmail").value,phone:t.querySelector("#supPhone").value,taxId:t.querySelector("#supTaxId").value,category:t.querySelector("#supCategory").value,establishmentId:u.establishmentId},r=t.querySelector('button[type="submit"]');r.disabled=!0,r.textContent="A salvar...";try{a?(await ui(a,s),p("Sucesso","Fornecedor atualizado!","success")):(await ci(s),p("Sucesso","Fornecedor criado!","success")),Ft("genericModal"),Jt()}catch(o){p("Erro","Erro ao salvar: "+o.message,"error")}finally{r.disabled=!1,r.textContent="Salvar"}}async function Jt(){const e=document.getElementById("suppliersList");if(!e)return;e.innerHTML='<div class="loader mx-auto my-8"></div>',await Ii();const t=document.getElementById("supplierSearchInput")?.value.toLowerCase()||"",a=u.suppliers.filter(o=>o.name.toLowerCase().includes(t)||o.contactName&&o.contactName.toLowerCase().includes(t));if(e.innerHTML="",a.length===0){e.innerHTML='<div class="text-center text-gray-500 py-8">Nenhum fornecedor encontrado.</div>';return}let s='<div class="flex flex-col gap-2 md:hidden">';a.forEach(o=>{const n=JSON.stringify(o).replace(/"/g,"&quot;"),i=f(o.name),l=f(o.category||"Geral"),d=f(o.contactName||"");s+=`
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
    `;a.forEach(o=>{const n=JSON.stringify(o).replace(/"/g,"&quot;"),i=f(o.name),l=f(o.taxId||"Sem doc."),d=f(o.email||"-"),c=f(o.phone||"-"),m=f(o.category||"Geral");r+=`
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
        `}),r+="</tbody></table></div>",e.innerHTML=s+r}function Ti(e){const t=e.phone?`https://wa.me/${e.phone.replace(/\D/g,"")}`:"#",a=e.phone?`tel:${e.phone}`:"#",s=e.email?`mailto:${e.email}`:"#",r=JSON.stringify(e).replace(/"/g,"&quot;"),o=f(e.name),n=f(e.category||"Fornecedor"),i=f(e.contactName||""),l=f(e.phone||""),d=`
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
    `;Q({title:"",contentHTML:d,maxWidth:"max-w-md"})}async function et(){const e=document.getElementById("purchasesContainer");if(e)if(O.step===1){e.innerHTML='<div class="loader mx-auto my-8"></div>';try{const[t,a]=await Promise.all([lt(u.establishmentId),Ma(u.establishmentId)]);O.allSuppliers=a||[];const s=t.filter(d=>{const c=parseInt(d.currentStock||0),m=parseInt(d.minStock||0);return c<=m});if(O.productsToBuy=s,s.length===0){e.innerHTML=`
                    <div class="text-center py-10 bg-white rounded-lg shadow-sm border border-gray-100">
                        <div class="bg-green-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                            <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                        <h3 class="text-lg font-bold text-gray-800">Tudo em ordem!</h3>
                        <p class="text-gray-600">Nenhum produto abaixo do estoque mínimo.</p>
                        <button class="mt-4 text-indigo-600 hover:underline text-sm" onclick="window.location.reload()">Atualizar Dados</button>
                    </div>
                `;return}let r='<div class="flex flex-col gap-3 md:hidden">',o="";s.forEach(d=>{const c=parseInt(d.minStock)||0,m=parseInt(d.currentStock)||0,g=Math.max(c-m,1),b=parseFloat(d.costPrice||0),h=f(d.name);let v='<option value="">Selecione...</option>';O.allSuppliers.length>0?O.allSuppliers.forEach(x=>{const S=d.supplierIds&&d.supplierIds.includes(x.id)?"selected":"";v+=`<option value="${x.id}" ${S}>${f(x.name)}</option>`}):v='<option value="">Sem fornecedores</option>',r+=`
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
                                    <span class="font-bold text-red-600">${m}</span>
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
                `,o+=`
                    <tr class="hover:bg-gray-50 border-b border-gray-100 product-row" data-product-id="${d.id}" data-cost="${b}">
                        <td class="p-3 pl-4 text-center w-10">
                            <input type="checkbox" class="row-select w-5 h-5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500" checked>
                        </td>
                        <td class="p-3 font-medium text-gray-800">${h}</td>
                        <td class="p-3 text-center text-xs text-gray-600">
                            <div class="flex flex-col items-center">
                                <span class="font-bold text-red-600">${m} <span class="text-gray-400 font-normal">Atual</span></span>
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
                            <tbody class="divide-y divide-gray-100" id="purchase-table-body">${o}</tbody>
                        </table>
                    </div>
                </div>
            `,pa()}catch(t){console.error(t),e.innerHTML='<p class="text-red-500 text-center">Erro ao calcular compras.</p>'}}else O.step===2&&Pi(e)}function Pi(e){if(!O.finalOrders||Object.keys(O.finalOrders).length===0){O.step=1,et();return}const t=O.isQuoteMode;let a="",s=0;const r=t?"border-indigo-100":"border-gray-200",o=t?"bg-indigo-50 border-indigo-100":"bg-gray-50 border-gray-200",n=t?"bg-blue-100 text-blue-700":"bg-green-100 text-green-700",i=t?"hidden":"flex",l=t?"Cotações Prontas":"Pedidos Prontos",d=t?"text-indigo-600":"text-green-600",c=t?"bg-indigo-50 border-indigo-100":"bg-green-50 border-green-100",m=t?"text-indigo-800":"text-green-800";for(const[g,b]of Object.entries(O.finalOrders)){let h=0,v=b.items.map(L=>{const D=L.qty*L.cost;return h+=D,`
            <div class="flex justify-between py-2 border-b border-gray-50 text-sm">
                <span class="text-gray-800 font-medium">${f(L.name)}</span>
                <div class="text-right">
                    <span class="text-gray-500 text-xs block">${L.qty} x R$ ${L.cost.toFixed(2)}</span>
                    <span class="text-indigo-600 font-bold block">R$ ${D.toFixed(2)}</span>
                </div>
            </div>
        `}).join("");s+=h;const x=encodeURIComponent(JSON.stringify({supplierId:g,supplierName:b.info.name,totalAmount:h,items:b.items})),w=encodeURIComponent(JSON.stringify({name:b.info.name,phone:b.info.phone,email:b.info.email})),S=encodeURIComponent(JSON.stringify(b.items)),k=f(b.info.name),E=f(b.info.email||"");a+=`
            <div class="bg-white border ${r} rounded-xl overflow-hidden shadow-sm supplier-order-card mb-4" data-supplier-id="${g}">
                <div class="${o} p-3 border-b flex justify-between items-center">
                    <div>
                        <h4 class="font-bold text-gray-800 text-base">${k}</h4>
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
                        data-supplier-info="${w}"
                        data-order-items="${S}"
                        data-total="${h}">
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
    `}async function xs(){const e=document.getElementById("historyContainer");if(e){e.innerHTML='<div class="loader mx-auto my-8"></div>';try{const t=await bi(u.establishmentId);if(t.length===0){e.innerHTML='<div class="text-center text-gray-500 py-8">Nenhum histórico encontrado.</div>';return}let a='<div class="flex flex-col gap-3 md:hidden">';t.forEach(o=>{const n=new Date(o.createdAt.seconds*1e3).toLocaleDateString("pt-BR"),i=f(o.supplierName);a+=`
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
                <td class="p-3 font-medium text-gray-800">${f(o.supplierName)}</td>
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
        `;e.innerHTML=a+r}catch(t){console.error(t),e.innerHTML='<p class="text-red-500 text-center">Erro ao carregar histórico.</p>'}}}function Bi(e){const t=new Date(e.createdAt.seconds*1e3).toLocaleString("pt-BR"),a=e.items.map(r=>`
        <li class="flex justify-between py-3 border-b border-gray-100 last:border-0">
            <div>
                <p class="font-medium text-sm text-gray-800">${f(r.name)}</p>
                <p class="text-xs text-gray-500">${r.qty} un. x R$ ${parseFloat(r.cost).toFixed(2)}</p>
            </div>
            <p class="text-sm font-bold text-gray-700">R$ ${(r.qty*r.cost).toFixed(2)}</p>
        </li>
    `).join(""),s=`
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
    `;Q({title:"Detalhes da Compra",contentHTML:s,maxWidth:"max-w-md"}),setTimeout(()=>{document.querySelector("#genericModal .modal-close").addEventListener("click",()=>{Ft("genericModal")})},50)}function pa(){const e=document.querySelectorAll(".product-row");let t=0;e.forEach(s=>{if(s.offsetParent===null)return;const r=s.querySelector(".row-select"),o=s.querySelector(".qty-input"),n=s.querySelector(".row-subtotal"),i=parseFloat(s.dataset.cost||0),l=parseInt(o.value||0);if(r.checked){const d=i*l;t+=d,n&&(n.textContent=`R$ ${d.toFixed(2)}`),s.classList.remove("opacity-50","bg-gray-50")}else s.classList.add("opacity-50","bg-gray-50")});const a=document.getElementById("total-purchase-cost");a&&(a.textContent=`R$ ${t.toFixed(2).replace(".",",")}`)}async function Di(e,t=!1){if(!window.jspdf){alert("Erro: Biblioteca PDF não carregada.");return}const{jsPDF:a}=window.jspdf,s=new a,r=new Date().toLocaleDateString("pt-BR"),o=t?[100,116,139]:[22,163,74];s.setFontSize(22),s.setTextColor(...o),s.setFont("helvetica","bold");const n=t?"SOLICITAÇÃO DE COTAÇÃO":"PEDIDO DE COMPRA";s.text(n,14,20),s.setDrawColor(...o),s.setLineWidth(.5),s.line(14,25,196,25),s.setFontSize(10),s.setTextColor(0),s.setFont("helvetica","bold"),s.text("DE:",14,35),s.setFont("helvetica","normal"),s.text(u.establishmentName||"Nossa Empresa",14,40),s.text(`Data: ${r}`,14,45),s.setFont("helvetica","bold"),s.text("PARA:",110,35),s.setFont("helvetica","normal"),s.text(e.info.name||"Fornecedor",110,40),e.info.email&&s.text(`Email: ${e.info.email}`,110,45),e.info.phone&&s.text(`Tel: ${e.info.phone}`,110,50),s.setFontSize(10),s.setFont("helvetica","italic");const i=t?"Por favor, enviem os vossos melhores preços e condições para os itens listados abaixo.":"Confirmação de pedido de compra conforme os itens e quantidades abaixo.";s.text(i,14,65);const l=t?["Produto","Quantidade Solicitada"]:["Produto","Qtd.","V. Unitário","V. Total"],d=e.items.map(b=>t?[b.name,b.qty.toString()]:[b.name,b.qty.toString(),`R$ ${b.cost.toFixed(2)}`,`R$ ${(b.qty*b.cost).toFixed(2)}`]);s.autoTable({startY:75,head:[l],body:d,theme:"striped",headStyles:{fillColor:o,textColor:[255,255,255],fontStyle:"bold",halign:"left"},styles:{fontSize:10,cellPadding:3,valign:"middle"},columnStyles:t?{}:{1:{halign:"center"},2:{halign:"right"},3:{halign:"right",fontStyle:"bold"}},foot:t?null:[["","","TOTAL DO PEDIDO:",{content:`R$ ${d.reduce((b,h)=>b+parseFloat(h[3].replace("R$ ","")),0).toFixed(2)}`,styles:{halign:"right",fontStyle:"bold",fillColor:[240,240,240],textColor:[0,0,0]}}]]});const c=s.internal.getNumberOfPages();for(let b=1;b<=c;b++)s.setPage(b),s.setFontSize(8),s.setTextColor(150),s.text(`Gerado por Kairos - Página ${b} de ${c}`,196,290,{align:"right"});const m=e.info.name.replace(/[^a-zA-Z0-9]/g,"_"),g=`${t?"Cotacao":"Pedido"}_${m}_${r.replace(/\//g,"-")}.pdf`;s.save(g),p("Sucesso","PDF gerado com sucesso!","success")}function go(e=null){const t=`
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
    `;Q({title:e?"Editar Fornecedor":"Novo Fornecedor",contentHTML:t,maxWidth:"max-w-lg"}),setTimeout(()=>{document.getElementById("supplierForm").addEventListener("submit",Li),document.querySelector("#genericModal .modal-close").addEventListener("click",()=>Ft("genericModal"))},50)}function Mi(){ve.innerHTML=`
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
    `,ce&&(ve.removeEventListener("click",ce),ve.removeEventListener("input",ce),ve.removeEventListener("change",ce)),ce=e=>{if(e.target.closest("#tab-btn-list")&&gt("list"),e.target.closest("#tab-btn-purchases")&&gt("purchases"),e.target.closest("#tab-btn-history")&&gt("history"),e.target.id==="toggle-quote-mode"&&(O.isQuoteMode=e.target.checked,et()),e.target.id==="supplierSearchInput"&&Jt(),e.target.closest("#btn-new-supplier")&&go(),e.target.closest(".supplier-item-mobile")){const a=e.target.closest(".supplier-item-mobile"),s=JSON.parse(a.dataset.supplier);Ti(s)}const t=e.target.closest("button[data-action]");if(t){const a=t.dataset.action;a==="delete"&&Ci(t.dataset.id),a==="edit"&&go(JSON.parse(t.dataset.supplier))}if((e.target.classList.contains("qty-input")||e.target.classList.contains("row-select"))&&pa(),e.target.id==="check-all-rows"){const a=e.target.checked;document.querySelectorAll(".row-select").forEach(s=>s.checked=a),pa()}if(e.target.closest("#btn-go-to-orders")){const a=document.querySelectorAll(".product-row"),s={};let r=!1;if(a.forEach(o=>{if(o.offsetParent===null||!o.querySelector(".row-select").checked)return;r=!0;let i="Produto";const l=o.querySelector("td:nth-child(2)"),d=o.querySelector(".font-bold");l?i=l.innerText:d&&(i=d.innerText);const c=parseInt(o.querySelector(".qty-input").value),m=parseFloat(o.dataset.cost),b=o.querySelector(".supplier-select").value;if(b){if(!s[b]){const h=O.allSuppliers.find(v=>v.id===b);s[b]={info:h,items:[]}}s[b].items.push({name:i,qty:c,cost:m})}}),!r){p("Atenção","Selecione pelo menos um item para gerar o pedido.","error");return}O.finalOrders=s,O.step=2,et()}if(e.target.closest("#btn-back-step1")&&(O.step=1,et()),e.target.closest(".btn-send-order")){const a=e.target.closest(".btn-send-order"),s=JSON.parse(decodeURIComponent(a.dataset.supplierInfo)),r=JSON.parse(decodeURIComponent(a.dataset.orderItems)),o=parseFloat(a.dataset.total),n=O.isQuoteMode;if(s.phone){const i=s.phone.replace(/\D/g,"");let l="";n?(l=`Olá *${s.name}*, tudo bem?

Gostaria de solicitar uma *cotação* para os seguintes itens:

`,r.forEach(c=>{l+=`- ${c.qty}x ${c.name}
`}),l+=`
Aguardo o retorno. Obrigado!`):(l=`Olá *${s.name}*, gostaria de realizar o seguinte *pedido*:

`,l+=`*ITENS:*
`,r.forEach(c=>{l+=`- ${c.qty}x ${c.name}
`}),l+=`
Aguardo confirmação.`);const d=`https://wa.me/${i}?text=${encodeURIComponent(l)}`;window.open(d,"_blank"),p("Aberto","WhatsApp aberto.","success")}else if(s.email){const i=n?`Solicitação de Cotação - ${u.establishmentName||"Empresa"}`:`Pedido de Compra - ${u.establishmentName||"Empresa"}`;let l=`Olá ${s.name},

`;n?l+=`Gostaria de solicitar uma cotação para os itens abaixo:

`:l+=`Gostaria de realizar o seguinte pedido:

`,r.forEach(c=>{l+=`- ${c.qty}x ${c.name}
`}),n||(l+=`
Valor Total Estimado: R$ ${o.toFixed(2)}`),l+=`

Aguardo retorno.`;const d=`mailto:${s.email}?subject=${encodeURIComponent(i)}&body=${encodeURIComponent(l)}`;window.location.href=d}else p("Erro","Fornecedor sem telefone ou email cadastrado.","error")}if(e.target.closest(".btn-register-order")){const a=e.target.closest(".btn-register-order");if(a.disabled)return;const s=JSON.parse(decodeURIComponent(a.dataset.order));s.establishmentId=u.establishmentId,a.disabled=!0,a.textContent="A processar...",Ee(u.establishmentId).then(r=>{const o=r.purchaseConfig||null;return pi(s,o)}).then(()=>{p("Sucesso","Compra registrada e integrada ao financeiro!","success"),a.innerHTML='<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Registrado',a.classList.replace("bg-blue-600","bg-green-600"),a.classList.replace("hover:bg-blue-700","hover:bg-green-700")}).catch(r=>{a.disabled=!1,a.innerHTML='<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Salvar',p("Erro","Falha ao registrar compra: "+r.message,"error")})}if(e.target.closest(".btn-delete-purchase")){const s=e.target.closest(".btn-delete-purchase").dataset.id;z("Excluir Compra","Isto apagará o registo histórico E o lançamento financeiro associado. Deseja continuar?").then(async r=>{if(r)try{await gi(s,u.establishmentId),p("Sucesso","Compra e financeiro excluídos.","success"),xs()}catch(o){p("Erro","Erro ao excluir: "+o.message,"error")}})}if(e.target.closest(".btn-print-order")){const s=e.target.closest(".supplier-order-card").dataset.supplierId,r=O.finalOrders[s];r?Di(r,O.isQuoteMode):p("Erro","Dados do pedido não encontrados.","error")}if(e.target.closest(".btn-view-purchase")){const a=e.target.closest(".btn-view-purchase"),s=JSON.parse(a.dataset.purchase);Bi(s)}},ve.addEventListener("click",ce),ve.addEventListener("input",ce),ve.addEventListener("change",ce),gt("list")}function gt(e){Et=e,["list","purchases","history"].forEach(a=>{const s=document.getElementById(`tab-btn-${a}`),r=document.getElementById(`tab-content-${a}`);a===e?(s.classList.add("border-indigo-500","text-indigo-600"),s.classList.remove("border-transparent","text-gray-500"),r.classList.remove("hidden")):(s.classList.remove("border-indigo-500","text-indigo-600"),s.classList.add("border-transparent","text-gray-500"),r.classList.add("hidden"))});const t=document.getElementById("btn-new-supplier");t&&(e==="list"?t.classList.remove("hidden"):t.classList.add("hidden")),Ei()}const Zt=document.getElementById("content"),bo={monday:"Segunda",tuesday:"Terça",wednesday:"Quarta",thursday:"Quinta",friday:"Sexta",saturday:"Sábado",sunday:"Domingo"};let ne=new Set,bt=null,Be=null;function Ai(e=8){let t="";for(let a=0;a<e;a++)t+=`
        <div class="bg-white rounded-lg shadow-md flex items-center gap-4 p-3 overflow-hidden animate-pulse sm:flex-col sm:items-stretch sm:p-0 sm:gap-0">
            <div class="w-16 h-16 rounded-full bg-gray-200 flex-shrink-0 sm:w-full sm:h-32 sm:rounded-b-none sm:rounded-t-lg"></div>
            <div class="flex-1 space-y-3 sm:p-4">
                <div class="h-4 bg-gray-200 rounded w-3/4"></div>
                <div class="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
        </div>
        `;return t}function qi(e){return e.length===0?'<p class="col-span-full text-center text-gray-500 py-10">Nenhum profissional encontrado.</p>':e.map(t=>{const a=t.status==="inactive",s=f(t.name),r=f(t.specialty||"Especialidade"),o=t.photo||`https://placehold.co/100x100/E2E8F0/4A5568?text=${encodeURIComponent(t.name?t.name.charAt(0):"P")}`,n=JSON.stringify(t).replace(/'/g,"&apos;");return`
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
            </div>`}).join("")}function Kt(){const e=document.getElementById("genericModal");e.style.display="none",Be&&e.removeEventListener("click",Be)}async function Ni(e){const t=document.getElementById("genericModal"),a=e.id?e:{name:"Novo Profissional",specialty:"",status:"active",workingHours:{},services:[]},s=f(a.name),r=u.services||await be(u.establishmentId),o=u.professionals||await K(u.establishmentId),n=`
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
        </div>`;t.innerHTML=n,t.style.display="flex",Ri(a,r),ji(a),Fi(a,o),Oi(a)}function Ri(e,t){const a=document.getElementById("professionalForm"),s=e.dob?e.dob.split("/"):["",""],r=Array.from({length:12},(x,w)=>{const S=w+1,k=S==s[1]?"selected":"",E=new Date(0,w).toLocaleString("pt-BR",{month:"long"});return`<option value="${S}" ${k}>${E.charAt(0).toUpperCase()+E.slice(1)}</option>`}).join(""),o=e.status||"active",n=f(e.name||""),i=f(e.specialty||""),l=f(e.phone||""),d=f(e.notes||"");a.innerHTML=`
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

        <div><label class="block text-sm font-medium text-gray-700">Serviços Realizados</label><div id="profServicesContainer" class="mt-2 grid grid-cols-2 md:grid-cols-3 gap-4 p-4 border rounded-md bg-white max-h-48 overflow-y-auto">${t.map(x=>`<label class="flex items-center space-x-2"><input type="checkbox" value="${x.id}" class="rounded" ${e.services?.includes(x.id)?"checked":""}><span>${f(x.name)}</span></label>`).join("")}</div></div>
        <div class="form-group"><label for="profNotes">Observações</label><textarea id="profNotes" rows="3" class="mt-1 w-full p-2 border rounded-md">${d}</textarea></div>`;const c=document.getElementById("profPhotoInput"),m=document.getElementById("profPhotoButton"),g=document.getElementById("profPhotoPreview"),b=document.getElementById("profPhotoBase64"),h=e.photo||`https://placehold.co/128x128/E2E8F0/4A5568?text=${encodeURIComponent(e.name?e.name.charAt(0):"P")}`,v=e.photo||"";m&&m.addEventListener("click",()=>c.click()),c&&(c.onchange=async()=>{const x=c.files[0];if(x){g.src="https://placehold.co/128x128/E2E8F0/4A5568?text=...";try{const w=await Xo(x,800,800,.8),k=w.length*3/4,E=1e3*1024;if(k>E)throw new Error("A imagem é muito grande mesmo após a compressão.");g.src=w,b.value=w}catch(w){p("Erro de Imagem",w.message||"Não foi possível processar a imagem.","error"),g.src=h,b.value=v,c.value=""}}})}function ji(e){const t=document.getElementById("jornada");t.innerHTML='<div><h3 class="text-xl font-semibold mb-4">Jornada de Trabalho Semanal</h3><p class="text-sm text-gray-600 mb-4">Defina os horários de trabalho padrão para este profissional.</p><div id="profScheduleContainer" class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4"></div></div>',Hi(t.querySelector("#profScheduleContainer"),e.workingHours||{})}async function Fi(e,t){const a=document.getElementById("bloqueios");a.innerHTML=`
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
                <h3 class="text-xl font-semibold mb-4">Lançamento de Bloqueios</h3>
                <form id="batchBlockageForm" class="p-4 bg-white rounded-lg shadow-inner space-y-3 mb-4">
                    <h4 class="font-semibold text-gray-800">Selecione os Profissionais</h4>
                    <div id="batchProfSelectionContainer" class="max-h-32 overflow-y-auto p-2 border rounded-md space-y-2">
                        ${t.map(o=>`<label class="flex items-center"><input type="checkbox" name="batch-professionals" value="${o.id}" class="rounded mr-2" ${o.id===e.id?"checked":""}><span>${f(o.name)}</span></label>`).join("")}
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
        </div>`;const s=document.getElementById("batchBlockageForm");s&&s.addEventListener("submit",async o=>{o.preventDefault();const n=Array.from(o.target.querySelectorAll('input[name="batch-professionals"]:checked')).map(b=>b.value);if(n.length===0)return p("Atenção","Selecione pelo menos um profissional.","error");const i=o.target.batchBlockageStartDate.value,l=o.target.batchBlockageEndDate.value||i,d=o.target.batchBlockageStartTime.value,c=o.target.batchBlockageEndTime.value,m=o.target.batchBlockageReason.value;if(!i||!d||!c)return p("Atenção","Preencha Data de Início, Início e Fim.","error");const g=n.map(b=>{const h={professionalId:b,establishmentId:u.establishmentId,startTime:new Date(`${i}T${d}`).toISOString(),endTime:new Date(`${l}T${c}`).toISOString(),reason:m};return zt(h)});try{await Promise.all(g),p("Sucesso!",`${n.length} bloqueios foram criados.`);const b=document.getElementById("prof-blockages-filter").value;tt(e.id,b)}catch(b){p("Erro",b.message,"error")}}),document.getElementById("prof-blockages-filter").addEventListener("change",o=>tt(e.id,o.target.value)),await tt(e.id,"future")}function Hi(e,t){e.innerHTML=Object.keys(bo).map(a=>{const s=t[a]||{},r=s.active!==!1;return`
            <div class="day-schedule-card p-3 rounded-lg ${r?"bg-white":"bg-gray-100 disabled"} border">
                 <div class="flex justify-between items-center"><span class="font-semibold text-gray-800">${bo[a]}</span><label class="flex items-center cursor-pointer"><div class="relative"><input type="checkbox" data-day="${a}" data-field="active" class="sr-only" ${r?"checked":""}><div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full"></div></div></label></div>
                <div class="time-inputs grid grid-cols-2 gap-2 mt-2 text-sm">
                    <div><label>Início:</label><input type="time" data-day="${a}" data-field="start" value="${s.start||"09:00"}" class="w-full p-1 border rounded" ${r?"":"disabled"}></div>
                    <div><label>Fim:</label><input type="time" data-day="${a}" data-field="end" value="${s.end||"18:00"}" class="w-full p-1 border rounded" ${r?"":"disabled"}></div>
                    <div><label>Intervalo:</label><input type="time" data-day="${a}" data-field="breakStart" value="${s.breakStart||"12:00"}" class="w-full p-1 border rounded" ${r?"":"disabled"}></div>
                    <div><label>Fim Int.:</label><input type="time" data-day="${a}" data-field="breakEnd" value="${s.breakEnd||"13:00"}" class="w-full p-1 border rounded" ${r?"":"disabled"}></div>
                </div>
            </div>`}).join(""),e.querySelectorAll('input[type="checkbox"][data-field="active"]').forEach(a=>{a.addEventListener("change",s=>{const r=s.target.closest(".day-schedule-card"),o=!s.target.checked;r.classList.toggle("bg-white",!o),r.classList.toggle("bg-gray-100",o),r.classList.toggle("disabled",o),r.querySelectorAll(".time-inputs input").forEach(n=>n.disabled=o)})})}async function tt(e,t="future"){const a=document.getElementById("blockagesList");if(a){a.innerHTML='<div class="loader mx-auto"></div>';try{const s=new Date;let r,o;t==="history"?(o=new Date,r=new Date,r.setFullYear(r.getFullYear()-2)):(r=new Date,o=new Date,o.setFullYear(o.getFullYear()+2));let i=(await Ot(u.establishmentId,r.toISOString(),o.toISOString(),e)).map(d=>({...d,startTime:new Date(d.startTime),endTime:new Date(d.endTime)}));t==="history"?i=i.filter(d=>d.endTime<s).sort((d,c)=>c.startTime-d.startTime):i=i.filter(d=>d.endTime>=s).sort((d,c)=>d.startTime-c.startTime);const l=i.reduce((d,c)=>{const m=c.reason||"Sem motivo";return d[m]||(d[m]=[]),d[m].push(c),d},{});if(Object.keys(l).length===0){a.innerHTML=`<p class="text-center text-gray-500 text-sm py-4">Nenhum bloqueio ${t==="history"?"no histórico":"futuro"}.</p>`;return}a.innerHTML=Object.entries(l).map(([d,c])=>`
            <div class="bg-gray-100 rounded-lg p-3 my-2 space-y-2">
                <div class="flex justify-between items-center pb-2 border-b">
                    <h4 class="font-bold text-gray-700">${f(d)} (${c.length})</h4>
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
        `).join("")}catch(s){a.innerHTML=`<p class="text-red-500">${s.message}</p>`}}}function Oi(e){const t=document.getElementById("genericModal");Be&&t.removeEventListener("click",Be),Be=async a=>{const s=a.target.closest("button[data-action]");if(!s){const o=a.target.closest(".tab-link");o&&(t.querySelectorAll(".tab-link").forEach(n=>n.classList.remove("active")),o.classList.add("active"),t.querySelectorAll(".tab-content").forEach(n=>n.classList.add("hidden")),document.getElementById(o.dataset.tab).classList.remove("hidden"));return}const r=s.dataset.action;switch(a.stopPropagation(),r){case"close-modal":Kt();break;case"delete-professional":const o=s.dataset.id;if(await z("Excluir Profissional",`Tem certeza que deseja excluir ${e.name}? Esta ação não pode ser desfeita.`))try{await Fo(o),p("Sucesso!","Profissional excluído.","success"),Kt(),Dt()}catch(v){p("Erro",`Não foi possível excluir: ${v.message}`,"error")}break;case"save-professional":const i=document.getElementById("professionalForm"),l=s,d=document.getElementById("profScheduleContainer"),c=Array.from(i.querySelectorAll("#profServicesContainer input:checked")).map(v=>v.value),m={};d&&d.querySelectorAll(".day-schedule-card").forEach(v=>{const x=v.querySelector('[data-field="active"]').dataset.day;m[x]={active:v.querySelector('[data-field="active"]').checked,start:v.querySelector('[data-field="start"]').value,end:v.querySelector('[data-field="end"]').value,breakStart:v.querySelector('[data-field="breakStart"]').value,breakEnd:v.querySelector('[data-field="breakEnd"]').value}});const g={...e,id:i.querySelector("#professionalId").value||void 0,name:i.querySelector("#profName").value,specialty:i.querySelector("#profSpecialty").value,photo:i.querySelector("#profPhotoBase64").value,services:c,workingHours:m,phone:i.querySelector("#profPhone").value,dob:`${i.querySelector("#profDobDay").value}/${i.querySelector("#profDobMonth").value}`,receivesCommission:i.querySelector("#profCommission").value==="sim",showOnAgenda:i.querySelector("#profShowOnAgenda").value==="sim",orderOnAgenda:parseInt(i.querySelector("#profOrderOnAgenda").value)||1,notes:i.querySelector("#profNotes").value,status:i.querySelector("#profStatus").value,establishmentId:u.establishmentId};l.disabled=!0,l.textContent="A salvar...";try{g.id?(await Lt(g.id,g),p("Sucesso!","Profissional atualizado.","success")):(delete g.id,await jo(g),p("Sucesso!","Profissional criado.","success")),Kt(),Dt()}catch(v){p("Erro",v.message,"error"),l.disabled=!1,l.textContent="Salvar"}break;case"delete-blockage":const b=s.dataset.id;if(await z("Apagar Bloqueio","Tem certeza?"))try{await ka(b),p("Bloqueio removido.","success");const v=document.getElementById("prof-blockages-filter")?document.getElementById("prof-blockages-filter").value:"future";tt(e.id,v)}catch(v){p("Erro",v.message,"error")}break;case"batch-delete-blockage":const h=JSON.parse(s.dataset.ids);if(await z("Apagar em Lote",`Tem certeza que deseja apagar ${h.length} bloqueios com este motivo?`))try{await Jo(h),p("Bloqueios removidos.","success");const v=document.getElementById("prof-blockages-filter")?document.getElementById("prof-blockages-filter").value:"future";tt(e.id,v)}catch(v){p("Erro",v.message,"error")}break}},t.addEventListener("click",Be)}function ga(){const e=document.getElementById("batch-actions-container"),t=document.getElementById("selected-count");!e||!t||(ne.size>0?(t.textContent=`${ne.size} selecionado(s)`,e.classList.remove("hidden")):e.classList.add("hidden"))}function zi(){z("Excluir em Lote",`Tem certeza que deseja excluir ${ne.size} profissionais? Esta ação não pode ser desfeita.`).then(async e=>{if(e)try{await rr(Array.from(ne)),p("Sucesso!",`${ne.size} profissionais foram excluídos.`,"success"),ne.clear(),ga(),Dt()}catch(t){p("Erro",`Não foi possível excluir em lote: ${t.message}`,"error")}})}function Je(){const e=document.getElementById("professionalsList");if(!e)return;if(!u.professionals){e.className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 pb-20",e.innerHTML=Ai();return}const t=document.getElementById("showInactiveProfToggle").checked,a=document.getElementById("profSearchInput").value.toLowerCase(),s=u.professionals.filter(r=>{const o=r.name.toLowerCase().includes(a),n=t||r.status!=="inactive";return o&&n});e.className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 pb-20",e.innerHTML=qi(s)}async function Dt(){ne.clear(),Zt.innerHTML=`
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
        </section>`,bt&&Zt.removeEventListener("click",bt),bt=t=>{const a=t.target.closest('[data-action="open-professional-modal"]'),s=t.target.closest('[data-action="batch-delete"]');if(a){t.preventDefault();let o={};if(a.dataset.professional)try{o=JSON.parse(a.dataset.professional)}catch(n){console.error("Erro ao fazer parse do professional data:",n);return}Ni(o);return}if(s){zi();return}const r=t.target.closest(".professional-checkbox");if(r){const o=r.dataset.id;r.checked?ne.add(o):ne.delete(o),Je(),ga();return}},Zt.addEventListener("click",bt),document.getElementById("profSearchInput").addEventListener("input",Je),document.getElementById("showInactiveProfToggle").addEventListener("change",Je);const e=document.getElementById("professionalsList");u.professionals=null,u.services=null,Je();try{const[t,a]=await Promise.all([K(u.establishmentId),be(u.establishmentId)]);u.professionals=t,u.services=a,Je(),ga()}catch{e.innerHTML='<p class="text-red-500 col-span-full">Erro ao carregar dados da página.</p>'}}let I={clients:[],selectedClient:null,activeTab:"profile",searchTerm:"",loading:!1,historyLimit:20,historySearchTerm:"",historyLoading:!1,historyData:{appointments:[],sales:[],loyaltyLog:[]}},ys=null;function Gt(){ys.innerHTML=`
        <section class="h-full flex flex-col bg-gray-50">
            <div class="p-4 bg-white border-b shadow-sm flex flex-col sm:flex-row justify-between items-center gap-3 sticky top-0 z-30">
                <div class="w-full sm:w-auto text-center sm:text-left">
                    <h2 class="text-xl sm:text-2xl font-bold text-gray-800">Gestão de Clientes</h2>
                    <p class="text-xs text-gray-500 hidden sm:block">Gerencie perfis, histórico, agendamentos e fidelidade</p>
                </div>
                
                <div class="w-full sm:w-auto">
                    ${I.selectedClient?`
                    <button id="btn-back-list" class="w-full sm:w-auto bg-gray-100 text-gray-700 px-4 py-2.5 rounded-lg hover:bg-gray-200 transition border border-gray-300 flex items-center justify-center gap-2 text-sm font-bold active:scale-95 transform duration-150">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                        Voltar
                    </button>
                    `:`
                    <button id="btn-new-client" class="w-full sm:w-auto bg-indigo-600 text-white px-4 py-2.5 rounded-lg hover:bg-indigo-700 transition shadow flex items-center justify-center gap-2 text-sm font-bold active:scale-95 transform duration-150">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                        Novo Cliente
                    </button>`}
                </div>
            </div>

            <div id="clients-content-area" class="flex-grow overflow-y-auto p-2 sm:p-4 custom-scrollbar">
                ${I.loading?'<div class="loader mx-auto mt-10"></div>':""}
            </div>
        </section>
    `;const e=document.getElementById("btn-new-client"),t=document.getElementById("btn-back-list");e&&(e.onclick=Yi),t&&(t.onclick=()=>{I.selectedClient=null,ze()})}function ze(){Gt();const e=document.getElementById("clients-content-area"),t=I.clients.filter(o=>o.name.toLowerCase().includes(I.searchTerm.toLowerCase())||o.phone&&o.phone.includes(I.searchTerm)),a=`
        <div class="mb-4 sm:mb-6 max-w-2xl mx-auto px-1 sm:px-0">
            <div class="relative">
                <input type="text" id="client-search" 
                    class="w-full p-3.5 pl-12 rounded-xl border border-gray-200 shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none transition text-base" 
                    placeholder="Buscar por nome ou telefone..." 
                    value="${I.searchTerm}">
                <svg class="w-6 h-6 text-gray-400 absolute left-4 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
        </div>
    `,s=t.length>0?`
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 max-w-6xl mx-auto pb-10">
            ${t.map(o=>`
                <div class="client-card bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition cursor-pointer group relative overflow-hidden active:bg-gray-50" data-id="${o.id}">
                    <div class="absolute top-0 left-0 w-1 h-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition"></div>
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-lg flex-shrink-0">
                            ${o.name.charAt(0).toUpperCase()}
                        </div>
                        <div class="flex-grow min-w-0">
                            <h3 class="font-bold text-gray-800 truncate text-base sm:text-lg">${f(o.name)}</h3>
                            <p class="text-sm text-gray-500 flex items-center gap-1">
                                <svg class="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                                <span class="truncate">${o.phone||"Sem telefone"}</span>
                            </p>
                            ${o.loyaltyPoints?`<span class="text-xs font-bold text-amber-600 mt-1 inline-block bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100">⭐ ${o.loyaltyPoints} pts</span>`:""}
                        </div>
                        <div class="text-right flex-shrink-0">
                            <span class="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">Ver</span>
                        </div>
                    </div>
                </div>
            `).join("")}
        </div>
    `:`
        <div class="text-center py-20 opacity-50 px-4">
            <svg class="w-16 h-16 sm:w-20 sm:h-20 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
            <p class="text-lg sm:text-xl font-medium text-gray-600">Nenhum cliente encontrado</p>
            <p class="text-sm text-gray-400">Tente buscar outro nome ou cadastre um novo.</p>
        </div>
    `;e.innerHTML=a+s;const r=document.getElementById("client-search");r.focus(),r.setSelectionRange(r.value.length,r.value.length),r.addEventListener("input",o=>{I.searchTerm=o.target.value,ze()}),e.querySelectorAll(".client-card").forEach(o=>{o.onclick=()=>ws(o.dataset.id)})}async function qe(){Gt();const e=document.getElementById("clients-content-area"),t=I.selectedClient;if(!t)return ze();I.activeTab!=="profile"&&I.historyData.appointments.length===0&&await fo(t.id);const a=`
        <div class="flex gap-2 mb-6 border-b overflow-x-auto pb-1 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
            <button class="tab-btn ${I.activeTab==="profile"?"active-tab":""}" data-tab="profile">
                👤 Perfil
            </button>
            <button class="tab-btn ${I.activeTab==="appointments"?"active-tab":""}" data-tab="appointments">
                📅 Agendamentos
            </button>
            <button class="tab-btn ${I.activeTab==="history"?"active-tab":""}" data-tab="history">
                💰 Histórico
            </button>
            <button class="tab-btn ${I.activeTab==="loyalty"?"active-tab":""}" data-tab="loyalty">
                ⭐ Fidelidade
            </button>
        </div>
    `;let s="";I.activeTab==="profile"?s=Vi(t):I.activeTab==="appointments"?s=Ui():I.activeTab==="history"?s=_i():I.activeTab==="loyalty"&&(s=Wi(t)),e.innerHTML=`
        <div class="max-w-4xl mx-auto w-full bg-white sm:rounded-2xl shadow-none sm:shadow-lg border-x-0 sm:border border-gray-200 overflow-hidden -mt-2 sm:mt-0">
            <div class="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white relative">
                <div class="flex flex-col md:flex-row items-center gap-4 relative z-10">
                    <div class="w-20 h-20 rounded-full bg-white text-indigo-600 flex items-center justify-center text-3xl font-bold shadow-lg flex-shrink-0">
                        ${t.name.charAt(0).toUpperCase()}
                    </div>
                    <div class="text-center md:text-left">
                        <h2 class="text-2xl font-bold leading-tight">${f(t.name)}</h2>
                        <p class="opacity-90 text-sm mt-1">${t.phone||"Sem telefone"}</p>
                        ${t.email?`<p class="opacity-75 text-xs">${t.email}</p>`:""}
                    </div>
                    
                    <div class="md:ml-auto bg-white/20 p-2 rounded-lg backdrop-blur-sm text-center min-w-[100px]">
                        <p class="text-xs uppercase font-bold tracking-wide opacity-80">Pontos</p>
                        <p class="text-2xl font-extrabold text-yellow-300 shadow-sm">${t.loyaltyPoints||0}</p>
                    </div>
                </div>
            </div>

            <div class="p-4 sm:p-6">
                ${a}
                <div class="animate-fade-in relative min-h-[300px]">
                    ${I.historyLoading?'<div class="absolute inset-0 bg-white/80 flex items-start justify-center pt-10 z-20"><div class="loader"></div></div>':""}
                    ${s}
                </div>
            </div>
        </div>
    `;const r=document.createElement("style");if(r.textContent=`
        .tab-btn { padding: 0.75rem 1rem; font-weight: 600; color: #6b7280; border-bottom: 3px solid transparent; transition: all 0.3s; white-space: nowrap; font-size: 0.9rem; }
        .tab-btn:hover { color: #4f46e5; background-color: #f9fafb; border-radius: 0.5rem 0.5rem 0 0; }
        .active-tab { color: #4f46e5; border-bottom-color: #4f46e5; }
        .history-card:hover { transform: translateY(-2px); box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        @media (min-width: 640px) { .tab-btn { padding: 0.75rem 1.5rem; font-size: 1rem; } }
    `,e.appendChild(r),e.querySelectorAll(".tab-btn").forEach(i=>{i.onclick=()=>{const l=i.dataset.tab;I.activeTab!==l&&(l==="appointments"||l==="history")&&(I.historyLimit=20,I.historySearchTerm=""),I.activeTab=l,qe()}}),I.activeTab==="profile"&&(document.getElementById("form-edit-client").onsubmit=Qi,document.getElementById("btn-delete-client").onclick=Xi),I.activeTab==="loyalty"){const i=document.getElementById("btn-manual-redeem");i&&(i.onclick=()=>Gi(t))}const o=document.getElementById("history-search-input");if(o){o.focus();const i=o.value;o.value="",o.value=i,o.addEventListener("input",l=>{I.historySearchTerm=l.target.value,qe()})}const n=document.getElementById("btn-load-more");n&&(n.onclick=()=>{I.historyLimit+=20,qe(),fo(t.id)}),e.querySelectorAll("[data-go-agenda]").forEach(i=>{i.onclick=l=>{const d=i.dataset.date,c=i.dataset.id;Z("agenda-section",{targetDate:new Date(d),scrollToAppointmentId:c})}}),e.querySelectorAll("[data-go-comanda]").forEach(i=>{i.onclick=l=>{const d=i.dataset.id;Z("comandas-section",{selectedAppointmentId:d,initialFilter:"finalizadas"})}})}function Vi(e){return`
        <form id="form-edit-client" class="space-y-4 pb-10">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700">Nome Completo</label>
                    <input type="text" name="name" value="${f(e.name)}" required class="mt-1 block w-full p-3 rounded-lg border border-gray-300 focus:ring-indigo-500 bg-gray-50 focus:bg-white transition text-base">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Telefone</label>
                    <input type="tel" name="phone" value="${f(e.phone||"")}" class="mt-1 block w-full p-3 rounded-lg border border-gray-300 focus:ring-indigo-500 bg-gray-50 focus:bg-white transition text-base">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">E-mail</label>
                    <input type="email" name="email" value="${f(e.email||"")}" class="mt-1 block w-full p-3 rounded-lg border border-gray-300 focus:ring-indigo-500 bg-gray-50 focus:bg-white transition text-base">
                </div>
                <div class="grid grid-cols-2 gap-2">
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Dia Nasc.</label>
                        <input type="number" name="dobDay" min="1" max="31" value="${e.dobDay||""}" class="mt-1 block w-full p-3 rounded-lg border border-gray-300 text-base">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Mês Nasc.</label>
                        <input type="number" name="dobMonth" min="1" max="12" value="${e.dobMonth||""}" class="mt-1 block w-full p-3 rounded-lg border border-gray-300 text-base">
                    </div>
                </div>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700">Observações</label>
                <textarea name="notes" rows="3" class="mt-1 block w-full p-3 rounded-lg border border-gray-300 focus:ring-indigo-500 bg-gray-50 focus:bg-white transition text-base">${f(e.notes||"")}</textarea>
            </div>
            
            <div class="pt-6 flex flex-col-reverse sm:flex-row justify-between items-center border-t mt-4 gap-4">
                <button type="button" id="btn-delete-client" class="w-full sm:w-auto text-red-500 hover:text-red-700 text-sm font-bold flex items-center justify-center gap-1 py-3 sm:py-0">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    Excluir Cliente
                </button>
                <button type="submit" class="w-full sm:w-auto bg-indigo-600 text-white px-6 py-3 rounded-lg font-bold shadow hover:bg-indigo-700 transition transform active:scale-95">
                    Salvar Alterações
                </button>
            </div>
        </form>
    `}function Ui(e){let t=I.historyData.appointments||[];if(I.historySearchTerm){const r=I.historySearchTerm.toLowerCase();t=t.filter(o=>o.serviceName&&o.serviceName.toLowerCase().includes(r)||o.professionalName&&o.professionalName.toLowerCase().includes(r)||o.startTime&&new Date(o.startTime).toLocaleDateString().includes(r))}const a=new Date;t.sort((r,o)=>new Date(o.startTime)-new Date(r.startTime));const s=r=>{const o=new Date(r.startTime),n=o.toLocaleDateString("pt-BR",{weekday:"short",day:"2-digit",month:"short"}),i=o.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),l=o<a;return`
            <div class="history-card bg-white border border-gray-200 rounded-lg p-3 sm:p-4 mb-3 transition-all cursor-pointer relative overflow-hidden group active:bg-gray-50"
                 data-go-agenda="true" data-id="${r.id}" data-date="${r.startTime}">
                <div class="absolute left-0 top-0 bottom-0 w-1.5 ${r.status==="cancelled"?"bg-red-500":l?"bg-gray-400":"bg-green-500"}"></div>
                <div class="flex justify-between items-start pl-2">
                    <div>
                        <p class="font-bold text-gray-800 flex items-center gap-1.5 text-base">
                            <span class="capitalize">${n}</span> <span class="text-sm font-normal text-gray-500">às ${i}</span>
                        </p>
                        <p class="text-sm text-gray-600 mt-0.5 font-medium line-clamp-1">${f(r.serviceName||"Serviço")}</p>
                        <p class="text-xs text-gray-500 mt-0.5">Prof: ${f(r.professionalName||"N/A")}</p>
                    </div>
                    <div class="text-right flex flex-col items-end">
                        <span class="text-[10px] sm:text-xs px-2 py-1 rounded-full whitespace-nowrap ${r.status==="cancelled"?"bg-red-100 text-red-600":l?"bg-gray-100 text-gray-600":"bg-green-100 text-green-700 font-bold"}">
                            ${r.status==="cancelled"?"Cancelado":l?"Concluído":"Agendado"}
                        </span>
                    </div>
                </div>
            </div>
        `};return`
        <div class="space-y-4 pb-10">
            <div class="relative">
                <input type="text" id="history-search-input" 
                    class="w-full p-3 pl-10 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition" 
                    placeholder="Buscar serviço, profissional..." 
                    value="${I.historySearchTerm}">
                <svg class="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>

            <div class="space-y-2">
                ${t.length?t.map(s).join(""):'<p class="text-center text-gray-400 py-8 text-sm">Nenhum agendamento encontrado.</p>'}
            </div>
            
            ${t.length>=I.historyLimit?`
            <div class="text-center pt-2">
                <button id="btn-load-more" class="w-full sm:w-auto text-sm text-indigo-600 font-bold hover:underline py-3 px-4 rounded bg-indigo-50 active:bg-indigo-100">
                    Carregar mais registros...
                </button>
            </div>`:""}
        </div>
    `}function _i(e){let t=I.historyData.sales||[];if(I.historySearchTerm){const a=I.historySearchTerm.toLowerCase();t=t.filter(s=>s.id.includes(a)||s.date&&new Date(s.date).toLocaleDateString().includes(a))}return t.sort((a,s)=>new Date(s.date)-new Date(a.date)),t.length===0&&!I.historySearchTerm?`
            <div class="text-center py-12">
                <p class="text-gray-400 text-sm">Nenhum registro financeiro encontrado.</p>
            </div>
        `:`
        <div class="space-y-4 pb-10">
            <div class="relative">
                <input type="text" id="history-search-input" 
                    class="w-full p-3 pl-10 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition" 
                    placeholder="Buscar por código ou data..." 
                    value="${I.historySearchTerm}">
                <svg class="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>

            <div class="space-y-3">
                ${t.map(a=>{const s=new Date(a.date||a.createdAt),r=a.totalAmount||a.total||0,o=(a.items||[]).length;return`
                    <div class="history-card bg-white border border-gray-200 rounded-lg p-3 sm:p-4 flex justify-between items-center cursor-pointer transition group active:bg-gray-50"
                         data-go-comanda="true" data-id="${a.id}">
                        <div class="flex items-center gap-3">
                            <div class="bg-indigo-50 p-2 rounded-lg text-indigo-600 flex-shrink-0">
                                <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
                            </div>
                            <div>
                                <p class="font-bold text-gray-800 text-sm sm:text-base">Venda #${a.id.slice(-4)}</p>
                                <p class="text-xs text-gray-500">${s.toLocaleDateString()} • ${o} item(s)</p>
                            </div>
                        </div>
                        <div class="text-right">
                            <p class="font-bold text-green-600 text-sm sm:text-base">R$ ${parseFloat(r).toFixed(2)}</p>
                            <span class="text-[10px] text-indigo-500 font-bold opacity-100 sm:opacity-0 group-hover:opacity-100 transition">Detalhes &rarr;</span>
                        </div>
                    </div>
                    `}).join("")}
            </div>
            
            ${t.length>=I.historyLimit?`
            <div class="text-center pt-2">
                <button id="btn-load-more" class="w-full sm:w-auto text-sm text-indigo-600 font-bold hover:underline py-3 px-4 rounded bg-indigo-50 active:bg-indigo-100">
                    Carregar mais...
                </button>
            </div>`:""}
        </div>
    `}function Wi(e){const t=I.historyData.loyaltyLog||[];t.sort((s,r)=>new Date(r.date)-new Date(s.date));const a=t.length>0?t.map(s=>{const r=s.type==="redemption";return`
            <div class="flex justify-between items-center bg-white border border-gray-100 p-3 rounded-lg mb-2">
                <div class="flex items-center gap-3">
                    <div class="p-2 rounded-full ${r?"bg-red-50":"bg-green-50"}">
                        ${r?'<svg class="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" /></svg>':'<svg class="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>'}
                    </div>
                    <div>
                        <p class="text-sm font-bold text-gray-800">${f(s.description||(r?"Resgate":"Acúmulo"))}</p>
                        <p class="text-xs text-gray-500">${new Date(s.date).toLocaleDateString()} às ${new Date(s.date).toLocaleTimeString()}</p>
                    </div>
                </div>
                <div class="text-right">
                    <span class="font-bold ${r?"text-red-600":"text-green-600"}">
                        ${r?"-":"+"}${s.points} pts
                    </span>
                </div>
            </div>
        `}).join(""):'<p class="text-center text-gray-400 py-4 text-sm">Nenhum histórico de pontos.</p>';return`
        <div class="space-y-6 pb-10">
            <div class="bg-gradient-to-r from-amber-400 to-orange-500 rounded-xl p-6 text-white shadow-lg relative overflow-hidden">
                <div class="absolute right-0 top-0 opacity-10 transform translate-x-4 -translate-y-4">
                    <svg class="w-32 h-32" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                </div>
                <p class="text-amber-100 font-bold uppercase tracking-wider text-xs mb-1">Saldo Atual</p>
                <h1 class="text-4xl font-extrabold flex items-center gap-2">
                    ${e.loyaltyPoints||0} <span class="text-lg opacity-80 font-normal">pontos</span>
                </h1>
                <div class="mt-4 flex gap-2">
                    <button id="btn-manual-redeem" class="bg-white/20 hover:bg-white/30 text-white text-xs font-bold py-2 px-4 rounded-lg backdrop-blur-sm transition border border-white/30">
                        Resgate Manual / Ajuste
                    </button>
                </div>
            </div>

            <div>
                <h4 class="text-sm font-bold text-gray-600 mb-3 uppercase tracking-wide">Extrato de Pontos</h4>
                <div class="bg-gray-50 rounded-xl p-2 border border-gray-200">
                    ${a}
                </div>
            </div>
        </div>
    `}async function Ji(){I.loading=!0,Gt();try{I.clients=await dt(u.establishmentId,""),ze()}catch{p("Erro","Falha ao carregar clientes.","error")}finally{I.loading=!1,ze()}}async function fo(e){const t=I.selectedClient;if(!(!t||!t.phone)){if(I.historyLoading=!0,document.getElementById("clients-content-area").querySelector(".tab-btn")){const a=document.createElement("div");a.className="absolute inset-0 bg-white/70 flex items-start justify-center pt-20 z-50 transition-opacity duration-300",a.innerHTML='<div class="loader"></div>';const s=document.querySelector(".animate-fade-in");s&&s.appendChild(a)}try{const a=new Date;a.setMonth(a.getMonth()+12);const s=new Date;s.setFullYear(s.getFullYear()-5);let r=`/api/appointments/${u.establishmentId}?startDate=${s.toISOString()}&endDate=${a.toISOString()}`;r+=`&clientPhone=${encodeURIComponent(t.phone)}`,r+=`&limit=${I.historyLimit}`;const o=await $(r);I.historyData.appointments=o,I.historyData.sales=o.filter(i=>i.status==="completed").map(i=>({id:i.id,date:i.startTime,totalAmount:i.totalAmount||0,items:i.services||[]}));const n=[];o.forEach(i=>{i.status==="completed"&&i.loyaltyPointsEarned>0&&n.push({type:"earn",points:i.loyaltyPointsEarned,date:i.startTime,description:"Venda finalizada"}),i.loyaltyRedemption&&n.push({type:"redemption",points:i.loyaltyRedemption.cost||0,date:i.startTime,description:`Resgate: ${i.loyaltyRedemption.name}`})}),I.historyData.loyaltyLog=n}catch(a){console.error("Erro ao buscar histórico otimizado",a),p("Aviso","Não foi possível carregar o histórico completo. Verifique sua conexão.","warning")}finally{I.historyLoading=!1,qe()}}}function Gi(e){const t=e.loyaltyPoints||0,a=`
        <div class="text-center mb-6">
            <p class="text-sm text-gray-500">Saldo Atual</p>
            <h2 class="text-3xl font-bold text-gray-800">${t} pts</h2>
        </div>
        <form id="manual-redeem-form" class="space-y-4">
            <div>
                <label class="block text-sm font-medium text-gray-700">Ação</label>
                <select id="redeem-action" class="w-full p-2 border rounded-lg bg-gray-50">
                    <option value="debit">Debitar Pontos (Resgate)</option>
                    <option value="credit">Adicionar Pontos (Ajuste)</option>
                </select>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700">Quantidade de Pontos</label>
                <input type="number" id="redeem-points" min="1" required class="w-full p-2 border rounded-lg text-lg font-bold" placeholder="0">
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700">Motivo / Descrição</label>
                <input type="text" id="redeem-reason" required class="w-full p-2 border rounded-lg" placeholder="Ex: Resgate de brinde balcão">
            </div>
            <div class="pt-4 border-t flex justify-end">
                <button type="submit" class="bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-indigo-700">Confirmar</button>
            </div>
        </form>
    `,{modalElement:s,close:r}=Q({title:"Ajuste Manual de Pontos",contentHTML:a,maxWidth:"max-w-sm"});s.querySelector("form").onsubmit=async o=>{o.preventDefault();const n=document.getElementById("redeem-action").value,i=parseInt(document.getElementById("redeem-points").value,10),l=document.getElementById("redeem-reason").value;if(!i||i<=0)return p("Erro","Insira uma quantidade válida.","error");if(n==="debit"&&i>t)return p("Erro","Saldo insuficiente.","error");try{let d=t;n==="debit"?(await Nr(u.establishmentId,e.phone,i,l),d-=i):(d+=i,await Qo(e.id,{loyaltyPoints:d})),I.selectedClient.loyaltyPoints=d,I.historyData.loyaltyLog.unshift({type:n==="debit"?"redemption":"earn",points:i,date:new Date().toISOString(),description:l+" (Manual)"}),p("Sucesso","Saldo de pontos atualizado.","success"),r(),qe()}catch(d){p("Erro","Falha ao atualizar pontos: "+d.message,"error")}}}function ws(e){I.selectedClient=I.clients.find(t=>t.id===e),I.activeTab="profile",I.historyLimit=20,I.historySearchTerm="",I.historyData={appointments:[],sales:[],loyaltyLog:[]},qe()}function Yi(){const e=`
        <form id="modal-new-client-form" class="space-y-4">
            <div><label class="block text-sm font-medium text-gray-700">Nome *</label><input type="text" id="new-name" required class="w-full border p-3 rounded-lg mt-1 text-base"></div>
            <div><label class="block text-sm font-medium text-gray-700">Telefone *</label><input type="tel" id="new-phone" required class="w-full border p-3 rounded-lg mt-1 text-base"></div>
            <div class="flex justify-end pt-4">
                <button type="submit" class="w-full sm:w-auto bg-indigo-600 text-white px-6 py-3 rounded-lg font-bold shadow hover:bg-indigo-700">Salvar</button>
            </div>
        </form>
    `,{modalElement:t,close:a}=Q({title:"Novo Cliente",contentHTML:e});t.querySelector("form").onsubmit=async s=>{s.preventDefault();const r=document.getElementById("new-name").value,o=document.getElementById("new-phone").value;try{const n=await $a({establishmentId:u.establishmentId,name:r,phone:o});I.clients.unshift(n),p("Sucesso","Cliente criado!","success"),a(),ws(n.id)}catch(n){p("Erro",n.message,"error")}}}async function Qi(e){e.preventDefault();const t=new FormData(e.target),a=Object.fromEntries(t.entries());try{await Qo(I.selectedClient.id,a),Object.assign(I.selectedClient,a);const s=I.clients.findIndex(r=>r.id===I.selectedClient.id);s!==-1&&(I.clients[s]=I.selectedClient),p("Sucesso","Dados atualizados!","success")}catch(s){p("Erro","Falha ao salvar: "+s.message,"error")}}async function Xi(){if(await z("Excluir Cliente","Tem certeza? Todo o histórico será perdido."))try{await qr(I.selectedClient.id),I.clients=I.clients.filter(e=>e.id!==I.selectedClient.id),I.selectedClient=null,p("Sucesso","Cliente removido.","success"),ze()}catch(e){p("Erro",e.message,"error")}}async function Zi(){ys=document.getElementById("content"),I.selectedClient=null,I.searchTerm="",I.historyLimit=20,Gt(),await Ji()}const ye=document.getElementById("content"),ea={monday:"Segunda",tuesday:"Terça",wednesday:"Quarta",thursday:"Quinta",friday:"Sexta",saturday:"Sábado",sunday:"Domingo"},Ki={indigo:{name:"Padrão (Índigo)",main:"#4f46e5"},blue:{name:"Azul",main:"#2563eb"},sky:{name:"Céu",main:"#0284c7"},teal:{name:"Verde Água",main:"#0d9488"},emerald:{name:"Esmeralda",main:"#059669"},green:{name:"Verde",main:"#16a34a"},lime:{name:"Lima",main:"#65a30d"},amber:{name:"Âmbar",main:"#d97706"},orange:{name:"Laranja",main:"#ea580c"},red:{name:"Vermelho",main:"#dc2626"},rose:{name:"Rosa",main:"#e11d48"},pink:{name:"Pink",main:"#db2777"},fuchsia:{name:"Fúcsia",main:"#c026d3"},purple:{name:"Roxo",main:"#7c3aed"},violet:{name:"Violeta",main:"#8b5cf6"},gray:{name:"Cinza",main:"#4b5563"},black:{name:"Preto",main:"#111827"}},ks=[{id:"personal-data",icon:"M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",label:"Dados Gerais"},{id:"branding",icon:"M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z",label:"Identidade e Cores"},{id:"booking",icon:"M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2H5a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",label:"Agendamento Online"},{id:"working-hours",icon:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",label:"Horário de Funcionamento"},{id:"loyalty",icon:"M5 5a2 2 0 012-2h10a2 2 0 012 2v1h2a1 1 0 011 1v3a1 1 0 01-1 1h-2v1a2 2 0 01-2 2H7a2 2 0 01-2-2v-1H3a1 1 0 01-1-1V7a1 1 0 011-1h2V5z",label:"Plano de Fidelidade"},{id:"financial",icon:"M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8a1 1 0 011 1v4a1 1 0 11-2 0v-4a1 1 0 011-1zm0 0a1 1 0 001-1V5a1 1 0 10-2 0v2a1 1 0 001 1zm0 0a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1z",label:"Integração Financeira"},{id:"change-password",icon:"M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",label:"Alterar senha"},{id:"change-email",icon:"M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207",label:"Alterar E-mail de Acesso"},{id:"support",icon:"M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z",label:"Suporte e Ajuda"},{id:"cancellation",icon:"M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z",label:"Cancelar Assinatura"}];let G=null;function vo(e,t,a){return new Promise((s,r)=>{const o=new FileReader;o.readAsDataURL(e),o.onload=n=>{const i=new Image;i.src=n.target.result,i.onload=()=>{const l=document.createElement("canvas");let d=i.width,c=i.height;d>t&&(c*=t/d,d=t),l.width=d,l.height=c,l.getContext("2d").drawImage(i,0,0,d,c);const g=e.type==="image/png"&&t<500?"image/png":"image/jpeg";s(l.toDataURL(g,a))},i.onerror=l=>r(l)},o.onerror=n=>r(n)})}function Ce(e,t=null){let a='<option value="">-- Selecione (Opcional) --</option>';const s=n=>{const i=new Map,l=[];return n&&(n.forEach(d=>i.set(d.id,{...d,children:[]})),i.forEach(d=>{d.parentId&&i.has(d.parentId)?i.get(d.parentId).children.push(d):l.push(d)})),l},r=(n,i="")=>{const l=n.id===t?"selected":"";a+=`<option value="${n.id}" ${l}>${i}${f(n.name)}</option>`,n.children.forEach(d=>r(d,i+"— "))};return s(e).forEach(n=>r(n)),a}async function Ve(e,t){const a=t.target.querySelector('button[type="submit"]');a&&(a.disabled=!0,a.textContent="A Salvar...");try{const s=G||await Ee(u.establishmentId),r=[],{ownerName:o,...n}=e;if(o&&o!==u.userName){const l=_.currentUser;l&&r.push(Ms(l,{displayName:o}).then(()=>{u.userName=o}))}const i={...s,...n};if(r.push(St(u.establishmentId,i)),await Promise.all(r),G=i,p("Sucesso","Definições salvas com sucesso! A página será recarregada para aplicar o novo tema.","success"),n.themeColor)setTimeout(()=>window.location.reload(),1500);else{const l=document.getElementById("panelEstablishmentName");n.name&&l&&(l.textContent=n.name,u.establishmentName=n.name)}}catch(s){p("Erro",`Não foi possível salvar: ${s.message}`,"error")}finally{a&&(a.disabled=!1,a.textContent="Salvar")}}function el(e,t){const a=f(e.name||""),s=f(e.phone||""),r=f(e.document||""),o=f(e.email||""),n=f(e.address||""),i=f(e.website||""),l=f(u.userName||"");t.innerHTML=`
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
    `,t.querySelector("#personal-data-form").addEventListener("submit",d=>{d.preventDefault();const c={ownerName:t.querySelector("#ownerName").value,name:t.querySelector("#establishmentName").value,phone:t.querySelector("#establishmentPhone").value,document:t.querySelector("#establishmentCnpjCpf").value,email:t.querySelector("#establishmentEmail").value,address:t.querySelector("#establishmentAddress").value,website:t.querySelector("#establishmentWebsite").value};Ve(c,d)})}function tl(e,t){t.innerHTML=`
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
    `,t.querySelector("#change-password-form").addEventListener("submit",async a=>{a.preventDefault();const s=t.querySelector("#newPassword").value,r=t.querySelector("#confirmPassword").value;if(s!==r){p("Erro","As senhas não coincidem.","error");return}const o=t.querySelector('button[form="change-password-form"]');o.disabled=!0,o.textContent="A Salvar...";try{const n=_.currentUser;if(n)await Ds(n,s),p("Sucesso","Senha alterada com sucesso!","success"),a.target.reset();else throw new Error("Nenhum usuário autenticado encontrado.")}catch(n){p("Erro",`Não foi possível alterar a senha: ${n.message}`,"error")}finally{o.disabled=!1,o.textContent="Salvar Nova Senha"}})}function al(e,t){t.innerHTML=`
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
    `,t.querySelector("#change-email-form").addEventListener("submit",async a=>{a.preventDefault();const s=t.querySelector("#newEmail").value,r=t.querySelector("#currentPassword").value;if(!s||!r){p("Erro","Preencha todos os campos.","error");return}const o=t.querySelector('button[form="change-email-form"]');o.disabled=!0,o.textContent="A verificar...";try{const n=_.currentUser;if(!n)throw new Error("Usuário não autenticado.");const i=Ts.credential(n.email,r);await Ps(n,i),o.textContent="A enviar link...",await Bs(n,s),o.textContent="A atualizar BD...",await or(u.establishmentId,s),p("Sucesso","Link de verificação enviado! Por favor, verifique seu **novo e-mail** para confirmar a alteração.","success"),a.target.reset()}catch(n){let i="Não foi possível alterar o e-mail.";n.code==="auth/wrong-password"?i="A senha atual está incorreta.":n.code==="auth/email-already-in-use"?i="Este e-mail já está sendo usado por outra conta.":n.code==="auth/operation-not-allowed"?i="A troca de e-mail precisa ser habilitada no console do Firebase.":i=n.message,p("Erro",i,"error")}finally{o.disabled=!1,o.textContent="Salvar Novo E-mail"}})}function ol(e,t){const a=f(e.welcomeMessage||"");t.innerHTML=`
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
    `,t.querySelector("#establishmentLogoBase64").value=e.logo||"",t.querySelector("#establishmentBackgroundImageBase64").value=e.backgroundImage||"",Ss(e.themeColor||"indigo",t),t.querySelector("#establishmentLogoButton").onclick=()=>t.querySelector("#establishmentLogoInput").click(),t.querySelector("#establishmentLogoInput").onchange=async s=>{const r=s.target.files[0];if(r)try{const o=await vo(r,300,.9);t.querySelector("#establishmentLogoPreview").src=o,t.querySelector("#establishmentLogoBase64").value=o}catch(o){console.error("Erro ao processar logo:",o),p("Erro","Formato de imagem inválido ou corrompido.","error")}},t.querySelector("#establishmentBgButton").onclick=()=>t.querySelector("#establishmentBgInput").click(),t.querySelector("#establishmentBgInput").onchange=async s=>{const r=s.target.files[0];if(r){const o=t.querySelector("#establishmentBgButton"),n=o.textContent;try{o.textContent="A processar...",o.disabled=!0;const i=await vo(r,1280,.7);t.querySelector("#establishmentBgPreview").src=i,t.querySelector("#establishmentBgPreview").classList.remove("hidden"),t.querySelector("#establishmentBgPlaceholder").classList.add("hidden"),t.querySelector("#establishmentBackgroundImageBase64").value=i}catch(i){console.error("Erro ao processar fundo:",i),p("Erro","Não foi possível processar esta imagem. Tente outra.","error")}finally{o.textContent=n,o.disabled=!1}}},t.querySelector("#establishmentBgRemoveBtn").onclick=()=>{t.querySelector("#establishmentBgPreview").src="",t.querySelector("#establishmentBgPreview").classList.add("hidden"),t.querySelector("#establishmentBgPlaceholder").classList.remove("hidden"),t.querySelector("#establishmentBackgroundImageBase64").value=""},t.querySelector("#branding-form").addEventListener("submit",s=>{s.preventDefault();const r={logo:t.querySelector("#establishmentLogoBase64").value,welcomeMessage:t.querySelector("#establishmentWelcomeMessage").value,backgroundImage:t.querySelector("#establishmentBackgroundImageBase64").value,primaryColor:t.querySelector("#establishmentPrimaryColorInput").value,textColor:t.querySelector("#establishmentTextColorInput").value,themeColor:t.querySelector("#establishmentThemeColor").value};Ve(r,s)})}function sl(e,t){const a=e.urlId||u.establishmentId,s="https://www.kairosagenda.com.br";let r=window.location.origin;(r.includes("localhost")||r.includes("capacitor://")||r.includes("127.0.0.1")||r.includes("192.168"))&&(r=s);const o=f(`${r}/agendar?id=${a}`),n=e.publicBookingEnabled||!1,i=n?"Agendamento Online ATIVO":"Agendamento Online INATIVO",l=n?"text-green-600":"text-red-600";t.innerHTML=`
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
    `,t.querySelector("#copyBookingLinkBtn").addEventListener("click",()=>{const d=t.querySelector("#publicBookingLink");if(navigator.clipboard&&window.isSecureContext)navigator.clipboard.writeText(d.value).then(()=>{p("Sucesso","Link copiado para a área de transferência!","success")}).catch(c=>{p("Erro","Não foi possível copiar o link.","error")});else try{d.select(),document.execCommand("copy"),d.blur(),p("Sucesso","Link copiado para a área de transferência!","success")}catch{p("Erro","Não foi possível copiar o link. Por favor, copie manualmente.","error")}}),t.querySelector("#publicBookingToggle").addEventListener("change",async d=>{const c=d.target.checked,m=t.querySelector("#publicBookingStatusText");c?(m.textContent="Agendamento Online ATIVO",m.className="text-sm font-semibold text-green-600"):(m.textContent="Agendamento Online INATIVO",m.className="text-sm font-semibold text-red-600");try{d.target.disabled=!0,await ar(u.establishmentId,c),G.publicBookingEnabled=c,p("Sucesso",`Agendamento online ${c?"ativado":"desativado"}!`,"success")}catch(g){p("Erro",`Não foi possível alterar o status: ${g.message}`,"error"),d.target.checked=!c,c?(m.textContent="Agendamento Online ATIVO",m.className="text-sm font-semibold text-green-600"):(m.textContent="Agendamento Online INATIVO",m.className="text-sm font-semibold text-red-600")}finally{d.target.disabled=!1}}),ul(e.slotInterval||30,t),t.querySelector("#booking-form").addEventListener("submit",d=>{d.preventDefault();const c={slotInterval:parseInt(t.querySelector("#establishmentSlotInterval").value,10)};Ve(c,d)})}function rl(e,t){t.innerHTML=`
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
            </div>`,s.appendChild(d)}),s.addEventListener("change",o=>{const n=o.target.closest('.day-schedule-card input[type="checkbox"]');n&&n.closest(".day-schedule-card").classList.toggle("disabled",!n.checked)}),t.querySelector("#working-hours-form").addEventListener("submit",o=>{o.preventDefault();const n={};Object.keys(ea).forEach(l=>{n[l]={active:t.querySelector(`#est-${l}-active`).checked,start:t.querySelector(`#est-${l}-start`).value,end:t.querySelector(`#est-${l}-end`).value,breakStart:t.querySelector(`#est-${l}-breakStart`).value,breakEnd:t.querySelector(`#est-${l}-breakEnd`).value}});const i=t.querySelector("#establishmentTimezone").value;Ve({workingHours:n,timezone:i},o)})}async function nl(e,t){const a=e.loyaltyProgram||{},s=a.type||"amount",r=a.pointsPerCurrency||10,o=a.pointsPerVisit||1;let n=[],i=[],l=[];try{[n,i,l]=await Promise.all([be(u.establishmentId),lt(u.establishmentId),Ca(u.establishmentId)])}catch(h){console.error("Erro ao carregar dados para fidelidade:",h)}t.innerHTML=`
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
                     <p class="text-xs text-gray-500 mb-3">Defina os prêmios. Ao selecionar um item específico (Serviço, Produto ou Pacote), o sistema identificará automaticamente no checkout para aplicar o desconto.</p>
                     
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
    `,t.querySelector("#loyaltyEnabled").checked=a.enabled||!1;const d=t.querySelectorAll('input[name="loyaltyType"]'),c=t.querySelector("#loyalty-config-amount"),m=t.querySelector("#loyalty-config-visit");d.forEach(h=>{h.addEventListener("change",v=>{const x=v.target.value;d.forEach(w=>{const S=w.closest("label");w.checked?S.classList.add("border-indigo-500","bg-indigo-50","ring-1","ring-indigo-500"):S.classList.remove("border-indigo-500","bg-indigo-50","ring-1","ring-indigo-500")}),x==="amount"?(c.classList.remove("hidden"),m.classList.add("hidden")):(c.classList.add("hidden"),m.classList.remove("hidden"))})});const g=t.querySelector("#loyaltyTiersContainer"),b=(h={})=>{const v=document.createElement("div");v.className="loyalty-tier-row group bg-white md:bg-transparent p-3 md:p-0 border md:border-0 rounded-lg shadow-sm md:shadow-none relative md:grid md:grid-cols-[0.8fr_1fr_1.5fr_1fr_auto] md:gap-2 md:items-start";const x=h.type||"money",w=h.itemId||"",S=h.reward||"",k=h.discount||"",E=h.points||h.costPoints||"";v.innerHTML=`
            <div class="mb-2 md:mb-0">
                <label class="md:hidden text-xs font-bold text-gray-500 mb-1 block">Custo (Pontos)</label>
                <div class="relative">
                    <input type="number" placeholder="Ex: 100" data-field="points" value="${E}" class="w-full p-2 pl-2 border rounded-md font-semibold text-gray-800">
                    <span class="md:hidden absolute right-3 top-2 text-xs text-gray-400">pts</span>
                </div>
            </div>

            <div class="mb-2 md:mb-0">
                <label class="md:hidden text-xs font-bold text-gray-500 mb-1 block">Tipo</label>
                <select data-field="type" class="type-select w-full p-2 border rounded-md bg-white text-sm">
                    <option value="money" ${x==="money"?"selected":""}>Desconto Livre (R$)</option>
                    <option value="service" ${x==="service"?"selected":""}>Serviço Específico</option>
                    <option value="product" ${x==="product"?"selected":""}>Produto Específico</option>
                    <option value="package" ${x==="package"?"selected":""}>Pacote</option>
                </select>
            </div>

            <div class="mb-2 md:mb-0 relative">
                <label class="md:hidden text-xs font-bold text-gray-500 mb-1 block">Item / Descrição</label>
                
                <input type="text" placeholder="Ex: Vale Compras R$ 20" data-field="rewardName" value="${f(S)}" class="desc-input w-full p-2 border rounded-md ${x!=="money"?"hidden":""}">
                
                <select data-field="itemId" class="item-select w-full p-2 border rounded-md bg-white text-sm ${x==="money"?"hidden":""}">
                    <option value="">Selecione o item...</option>
                </select>
            </div>

            <div class="mb-2 md:mb-0">
                <label class="md:hidden text-xs font-bold text-gray-500 mb-1 block">Valor Desconto (R$)</label>
                <div class="flex items-center relative">
                    <span class="absolute left-3 text-gray-500">R$</span>
                    <input type="number" placeholder="0.00" data-field="discount" value="${k}" step="0.01" class="discount-input w-full p-2 pl-8 border rounded-md">
                </div>
                <p class="text-[10px] text-gray-500 mt-1 hidden md:block">Deixe 0 para 100% (se item)</p>
            </div>

            <button type="button" class="remove-loyalty-tier absolute top-2 right-2 md:static text-gray-400 hover:text-red-600 p-2 rounded-md hover:bg-red-50 transition-colors" title="Remover">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            </button>
        `;const L=v.querySelector(".type-select"),D=v.querySelector(".item-select"),H=v.querySelector(".desc-input"),P=v.querySelector(".discount-input"),B=A=>{D.innerHTML='<option value="">Selecione...</option>';let M=[];A==="service"?M=n:A==="product"?M=i:A==="package"&&(M=l),M.forEach(F=>{const j=F.id===w,U=F.name||F.title||"Sem nome",ie=F.price||F.salePrice||0;D.innerHTML+=`<option value="${F.id}" data-price="${ie}" ${j?"selected":""}>${f(U)}</option>`})};return x!=="money"&&B(x),L.addEventListener("change",A=>{const M=A.target.value;M==="money"?(D.classList.add("hidden"),H.classList.remove("hidden"),H.value="",P.value=""):(D.classList.remove("hidden"),H.classList.add("hidden"),B(M),P.value="")}),D.addEventListener("change",A=>{const M=A.target.selectedOptions[0];if(M&&M.value){H.value=M.text;const F=M.dataset.price;F&&(P.value=parseFloat(F).toFixed(2))}}),v};(a.tiers||[]).forEach(h=>{g.appendChild(b(h))}),t.querySelector("#add-loyalty-tier").addEventListener("click",()=>{g.appendChild(b())}),g.addEventListener("click",h=>{const v=h.target.closest(".remove-loyalty-tier");v&&v.closest(".loyalty-tier-row").remove()}),t.querySelector("#loyalty-form").addEventListener("submit",h=>{h.preventDefault();const v=t.querySelector('input[name="loyaltyType"]:checked').value,x=Array.from(t.querySelectorAll("#loyaltyTiersContainer .loyalty-tier-row")).map(S=>{const k=S.querySelector(".type-select").value,E=k==="money"?null:S.querySelector(".item-select").value;let L="";if(k==="money")L=S.querySelector(".desc-input").value;else{const D=S.querySelector(".item-select");L=D.options[D.selectedIndex]?.text||""}return{points:parseInt(S.querySelector('input[data-field="points"]').value,10)||0,costPoints:parseInt(S.querySelector('input[data-field="points"]').value,10)||0,type:k,itemId:E,reward:L,name:L,discount:parseFloat(S.querySelector('input[data-field="discount"]').value)||0}}),w={loyaltyProgram:{enabled:t.querySelector("#loyaltyEnabled").checked,type:v,pointsPerCurrency:parseFloat(t.querySelector("#loyaltyPointsPerCurrency").value)||10,pointsPerVisit:parseInt(t.querySelector("#loyaltyPointsPerVisit").value,10)||1,tiers:x.filter(S=>S.points>0&&S.reward)}};Ve(w,h)})}async function il(e,t){t.innerHTML=`
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
    `;try{const[a,s]=await Promise.all([La(u.establishmentId),Ta(u.establishmentId)]),r=e.financialIntegration||{},o=e.commissionConfig||{},n=e.purchaseConfig||{};t.querySelector("#financialNatureId").innerHTML=Ce(a,r.defaultNaturezaId),t.querySelector("#financialCostCenterId").innerHTML=Ce(s,r.defaultCentroDeCustoId),t.querySelector("#purchaseNatureId").innerHTML=Ce(a,n.defaultNatureId),t.querySelector("#purchaseCostCenterId").innerHTML=Ce(s,n.defaultCostCenterId),t.querySelector("#commissionNatureId").innerHTML=Ce(a,o.defaultNatureId),t.querySelector("#commissionCostCenterId").innerHTML=Ce(s,o.defaultCostCenterId)}catch{p("Erro","Não foi possível carregar os dados para a integração financeira.","error")}t.querySelector("#financial-form").addEventListener("submit",a=>{a.preventDefault();const s={financialIntegration:{defaultNaturezaId:t.querySelector("#financialNatureId").value||null,defaultCentroDeCustoId:t.querySelector("#financialCostCenterId").value||null},purchaseConfig:{defaultNatureId:t.querySelector("#purchaseNatureId").value||null,defaultCostCenterId:t.querySelector("#purchaseCostCenterId").value||null},commissionConfig:{defaultNatureId:t.querySelector("#commissionNatureId").value||null,defaultCostCenterId:t.querySelector("#commissionCostCenterId").value||null}};Ve(s,a)})}function ll(e,t){const a="5516997859430",s=encodeURIComponent("Olá, preciso de ajuda com o sistema Kairos."),r=`https://wa.me/${a}?text=${s}`;t.innerHTML=`
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
    `}function dl(e,t){const a="5516997859430",s=encodeURIComponent("Olá, gostaria de solicitar o cancelamento da minha assinatura."),r=`https://wa.me/${a}?text=${s}`,o="sistemakairosagenda@gmail.com";t.innerHTML=`
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
    `}function cl(e,t){t.innerHTML=`
        <div class="bg-white p-4 md:p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-bold text-gray-800">${e}</h3>
            <p class="mt-4 text-gray-500">Esta secção ainda não foi implementada.</p>
        </div>
    `}function Ss(e="indigo",t){const a=t.querySelector("#color-palette-container"),s=t.querySelector("#establishmentThemeColor");!a||!s||(a.innerHTML="",Object.entries(Ki).forEach(([r,o])=>{const n=r===e,i=document.createElement("div");i.className="w-24 text-center cursor-pointer mb-4",i.innerHTML=`
            <div class="w-16 h-16 mx-auto rounded-full border-4 ${n?"border-gray-800 scale-110 shadow-lg":"border-transparent"} p-1 transition-all">
                <div class="w-full h-full rounded-full" style="background-color: ${o.main};"></div>
            </div>
            <p class="text-xs mt-2 font-medium ${n?"text-gray-900 font-bold":"text-gray-500"}">${o.name}</p>
        `,i.addEventListener("click",()=>{s.value=r,Ss(r,t)}),a.appendChild(i)}),s.value=e)}function ul(e,t){const a=t.querySelector("#slotIntervalContainer"),s=t.querySelector("#establishmentSlotInterval");if(!a||!s)return;const r=[{label:"10 min",value:10},{label:"15 min",value:15},{label:"20 min",value:20},{label:"30 min",value:30},{label:"45 min",value:45},{label:"1 hora",value:60}];a.innerHTML=r.map(o=>{const n=o.value===e;return`<button type="button" data-value="${o.value}" 
                       class="interval-btn py-2 px-4 rounded-full text-sm font-semibold transition-colors 
                           ${n?"bg-indigo-600 text-white":"bg-gray-200 text-gray-700 hover:bg-gray-300"}">
                       ${o.label}
                   </button>`}).join(""),s.value=e,a.querySelectorAll(".interval-btn").forEach(o=>{o.addEventListener("click",()=>{s.value=o.dataset.value,a.querySelectorAll(".interval-btn").forEach(n=>{n.classList.remove("bg-indigo-600","text-white"),n.classList.add("bg-gray-200","text-gray-700")}),o.classList.add("bg-indigo-600","text-white"),o.classList.remove("bg-gray-200","text-gray-700")})})}async function ml(e){const t=ks.find(s=>s.id===e);if(!t){console.error("Secção de definições não encontrada:",e);return}ye.innerHTML=`
        <div class="bg-white p-4 shadow-md sticky top-0 z-10 md:relative">
            <button data-action="back-to-list" class="flex items-center gap-2 font-semibold text-indigo-600 hover:text-indigo-800">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
                Voltar
            </button>
        </div>
        
        <div id="settings-content-detail" class="p-4">
            <div class="flex justify-center items-center h-full"><div class="loader"></div></div>
        </div>
    `,ye.querySelector('button[data-action="back-to-list"]').addEventListener("click",s=>{s.preventDefault(),$s()});const a=document.getElementById("settings-content-detail");switch(e){case"personal-data":el(G,a);break;case"change-password":tl(G,a);break;case"change-email":al(G,a);break;case"branding":ol(G,a);break;case"booking":sl(G,a);break;case"working-hours":rl(G,a);break;case"loyalty":await nl(G,a);break;case"financial":await il(G,a);break;case"support":ll(G,a);break;case"cancellation":dl(G,a);break;default:cl(t?t.label:"Definições",a)}}async function $s(){if(ye.innerHTML=`
        <div class="bg-white p-4 rounded-lg shadow-md mb-6">
            <h2 class="text-xl font-bold text-gray-800 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-500" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" /></svg>
                Definições
            </h2>
        </div>
        <div class="flex justify-center items-center h-64"><div class="loader"></div></div>
    `,!G)try{G=await Ee(u.establishmentId)}catch{p("Erro Fatal","Não foi possível carregar os dados do estabelecimento.","error"),ye.innerHTML='<p class="text-red-500">Erro ao carregar dados.</p>';return}const e=_.currentUser;e&&e.displayName&&(u.userName=e.displayName);const t=f(u.userName||_.currentUser.email);let s=`https://placehold.co/96x96/E2E8F0/4A5568?text=${t?t.charAt(0).toUpperCase():"U"}`;e&&e.photoURL&&(s=e.photoURL),ye.innerHTML=`
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
                    <img id="user-avatar" src="${s}" class="w-24 h-24 rounded-full object-cover">
                 </div>
                 <h3 class="font-bold mt-2 text-lg truncate">${t}</h3>
                 ${u.userName&&u.userName!==_.currentUser.email?`<p class="text-sm text-gray-500">${f(_.currentUser.email)}</p>`:""}
                 
                 <p class="text-xs text-indigo-600 font-semibold mt-2">VER MEU PERFIL / MEUS BLOQUEIOS</p>
            </div>
        </div>

        <div class="bg-white p-4 rounded-lg shadow-md">
            <nav id="settings-menu-list" class="space-y-1">
                ${ks.map(o=>`
                    <button data-section="${o.id}" class="w-full flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100 font-semibold text-sm">
                        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${o.icon}"></path></svg>
                        <span class="flex-1 text-left">${o.label}</span>
                        <svg class="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                    </button>
                `).join("")}
            </nav>
        </div>
    `,ye.querySelector("#settings-menu-list").addEventListener("click",o=>{const n=o.target.closest("button[data-section]");n&&(o.preventDefault(),ml(n.dataset.section))});const r=ye.querySelector('[data-action="go-to-my-profile"]');r&&r.addEventListener("click",o=>{o.preventDefault(),Z("my-profile-section")})}const at=document.getElementById("content");async function Ne(e){const t=document.getElementById("blockagesList");if(t){t.innerHTML='<div class="loader mx-auto"></div>';try{const a=document.getElementById("filterStartDate")?.value,s=document.getElementById("filterEndDate")?.value,r=await Ot(u.establishmentId,a||new Date().toISOString().split("T")[0],s||new Date().toISOString().split("T")[0],e),o=document.getElementById("filterReason")?.value.toLowerCase(),n=o?r.filter(l=>l.reason&&l.reason.toLowerCase().includes(o)):r,i=n.reduce((l,d)=>{const c=d.reason||"Sem motivo";return l[c]||(l[c]=[]),l[c].push(d),l},{});if(t.innerHTML="",n.length===0){t.innerHTML='<p class="text-center text-gray-500">Nenhum bloqueio encontrado.</p>';return}Object.entries(i).forEach(([l,d])=>{const c=document.createElement("div");c.className="bg-gray-100 rounded-lg p-3 my-2 space-y-2";let g=`<div class="flex justify-between items-center pb-2 border-b border-gray-200">
                                <h4 class="font-bold text-gray-700">${f(l)} (${d.length})</h4>`;if(d.length>1){const b=JSON.stringify(d.map(h=>h.id));g+=`<button data-action="batch-delete-blockage" data-ids='${b}' class="text-xs text-red-600 hover:text-red-800 font-semibold flex items-center gap-1">
                                    Apagar Lote
                                </button>`}g+="</div>",c.innerHTML=g,d.forEach(b=>{const h=new Date(b.startTime),v=new Date(b.endTime),x=h.toLocaleDateString("pt-BR"),w=v.toLocaleDateString("pt-BR"),k=`
                    <div class="bg-white p-3 rounded-md flex items-center justify-between shadow-sm">
                        <div>
                            <p class="font-medium text-gray-800 text-sm">
                                ${x===w?`${x} | ${h.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})} - ${v.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}`:`De ${x} às ${h.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}<br>Até ${w} às ${v.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}`}
                            </p>
                        </div>
                        <button class="p-1 rounded-full text-gray-500 hover:bg-gray-100 hover:text-red-600" data-action="delete-blockage" data-id="${b.id}">Apagar</button>
                    </div>`;c.innerHTML+=k}),t.appendChild(c)})}catch(a){t.innerHTML=`<p class="text-center text-red-500">Erro: ${a.message}</p>`}}}async function pl(e){e.preventDefault();const t=e.target,a=t.querySelector("#blockageProfId").value,s=t.querySelector("#blockageDate").value,r=t.querySelector("#blockageEndDate").value||s,o=t.querySelector("#blockageStartTime").value,n=t.querySelector("#blockageEndTime").value,i={establishmentId:u.establishmentId,professionalId:a,startTime:new Date(`${s}T${o}:00`).toISOString(),endTime:new Date(`${r}T${n}:00`).toISOString(),reason:t.querySelector("#blockageReason").value};try{await zt(i),t.reset(),p("Sucesso","Bloqueio adicionado com sucesso!","success"),Ne(a)}catch(l){p("Erro",`Não foi possível criar o bloqueio: ${l.message}`,"error")}}async function gl(e){e.preventDefault();const t=e.target,a=Array.from(t.querySelectorAll('input[name="batch-professionals"]:checked')).map(c=>c.value);if(a.length===0)return p("Atenção","Selecione pelo menos um profissional.","error");const s=t.querySelector("#batchBlockageDate").value,r=t.querySelector("#batchBlockageEndDate").value||s,o=t.querySelector("#batchBlockageStartTime").value,n=t.querySelector("#batchBlockageEndTime").value,i=t.querySelector("#batchBlockageReason").value,l=t.querySelector('button[type="submit"]');l.disabled=!0,l.textContent="Aguarde...";const d=a.map(c=>{const m={establishmentId:u.establishmentId,professionalId:c,startTime:new Date(`${s}T${o}:00`).toISOString(),endTime:new Date(`${r}T${n}:00`).toISOString(),reason:i};return zt(m)});try{await Promise.all(d),p("Sucesso",`${a.length} bloqueios foram criados com sucesso!`,"success"),t.reset(),t.querySelectorAll('input[name="batch-professionals"]:checked').forEach(m=>m.checked=!1);const c=document.getElementById("blockageProfId").value;c&&Ne(c)}catch(c){p("Erro",`Ocorreu um erro: ${c.message}`,"error")}finally{l.disabled=!1,l.textContent="Adicionar Bloqueio em Lote"}}function bl(e){at.addEventListener("submit",t=>{t.target.id==="blockageForm"&&pl(t),t.target.id==="batchBlockageForm"&&gl(t)}),at.addEventListener("input",t=>{t.target.matches("#filterStartDate, #filterEndDate, #filterReason")&&Ne(e)}),at.addEventListener("click",async t=>{const a=t.target.closest("button[data-action]");if(!a)return;const s=a.dataset.action;if(s==="back-to-professionals")Z("profissionais-section");else if(s==="delete-blockage"){if(await z("Apagar Bloqueio","Tem a certeza que deseja apagar este bloqueio?"))try{await ka(a.dataset.id),p("Sucesso","Bloqueio removido.","success"),Ne(e)}catch(o){p("Erro",`Não foi possível remover o bloqueio: ${o.message}`,"error")}}else if(s==="batch-delete-blockage"){const r=JSON.parse(a.dataset.ids);if(await z("Apagar Lote de Bloqueios",`Tem certeza que deseja apagar ${r.length} bloqueios de uma vez?`))try{await Jo(r),p("Sucesso",`${r.length} bloqueios removidos.`,"success"),Ne(e)}catch(n){p("Erro",`Não foi possível apagar os bloqueios: ${n.message}`,"error")}}})}async function fl(e){const{professionalId:t,professionalName:a}=e;if(!t||!a){at.innerHTML='<p class="text-red-500 p-8">Erro: ID do profissional não fornecido.</p>';return}const s=f(a);at.innerHTML=`
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
        </section>`,bl(t),await Ne(t);const r=document.getElementById("batchProfSelectionContainer");try{const o=await K(u.establishmentId);r.innerHTML=o.map(n=>`
            <div class="flex items-center">
                <input id="prof-batch-${n.id}" value="${n.id}" name="batch-professionals" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                <label for="prof-batch-${n.id}" class="ml-2 text-sm text-gray-700">${f(n.name)}</label>
            </div>`).join("")}catch{r.innerHTML='<p class="text-red-500">Erro ao carregar profissionais.</p>'}}const vl=e=>$(`/api/users/${e}`),hl=e=>$("/api/users",{method:"POST",body:JSON.stringify(e)}),xl=(e,t)=>$(`/api/users/${e}`,{method:"PUT",body:JSON.stringify(t)}),yl=e=>$(`/api/users/${e}`,{method:"DELETE"}),wl=(e,t)=>$(`/api/users/${e}/password`,{method:"PUT",body:JSON.stringify({password:t})}),kl=(e,t)=>$(`/api/users/${e}/status`,{method:"PATCH",body:JSON.stringify({status:t})}),he=document.getElementById("content"),Sl={"agenda-section":"Agenda","comandas-section":"Comandas","relatorios-section":"Relatórios Gerais","sales-report-section":"Relatório de Vendas (Caixa)","financial-section":"Financeiro","servicos-section":"Serviços","produtos-section":"Produtos","suppliers-section":"Fornecedores","profissionais-section":"Profissionais","ausencias-section":"Ausências e Bloqueios","clientes-section":"Clientes","packages-section":"Pacotes","commissions-section":"Comissões","estabelecimento-section":"Configurações do Estabelecimento","users-section":"Usuários e Acessos"},$l={view:"Visualizar",create:"Criar",edit:"Editar"};let Ge=null,Ye=null;function El(e){const t=document.getElementById("usersListContainer");if(!t)return;const a=document.getElementById("showInactiveUsersToggle")?.checked;if(e.length===0){const s=a?"Nenhum usuário encontrado.":"Nenhum usuário ativo cadastrado.";t.innerHTML=`<p class="col-span-full text-center text-gray-500">${s}</p>`;return}e.sort((s,r)=>(s.status==="active"?-1:1)-(r.status==="active"?-1:1)),t.innerHTML=e.map(s=>{const r=JSON.stringify(s).replace(/'/g,"&apos;"),o=s.status==="active",n=u.professionals.find(c=>c.id===s.professionalId),i=n?n.name:"N/A",l=n?n.name.charAt(0):s.name.charAt(0),d=n?.photo||`https://placehold.co/64x64/E2E8F0/4A5568?text=${encodeURIComponent(l)}`;return`
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
    `}).join("")}function It(){const e=document.getElementById("showInactiveUsersToggle")?.checked;let t;e?t=u.users:t=u.users.filter(a=>a.status==="active"),El(t)}function Il(e={}){return Object.entries(Sl).map(([t,a])=>{const s=t==="agenda-section"||t==="comandas-section",r=e[t]?.view_all_prof===!0,o=Object.entries($l).map(([i,l])=>`
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
    `}).join("")}async function ho(e=null){document.getElementById("user-list-view").classList.add("hidden");const t=document.getElementById("user-form-view");t.classList.remove("hidden");let a=u.professionals;if(!a||a.length===0)try{a=await K(u.establishmentId),u.professionals=a}catch{p("Erro","Não foi possível carregar a lista de profissionais.","error")}const s=w=>a.find(S=>S.id===w),r=(w,S)=>{const E=s(w)?.photo,L=S.charAt(0).toUpperCase();return{photoSrc:E||`https://placehold.co/128x128/E2E8F0/4A5568?text=${L}`,initials:L,photoUrl:E||""}},o=e?.professionalId,n=e?.name||"Novo Usuário",i=r(o,n),l=s(o),d=w=>{let S='<option value="">-- Não Associado a um Profissional --</option>';return S+=a.map(k=>`<option value="${k.id}" ${k.id===w?"selected":""}>${k.name} (${k.specialty||"N/A"})</option>`).join(""),S},c=e!==null;t.querySelector("#userFormTitle").textContent=c?`Editar Usuário: ${e.name}`:"Novo Usuário";const m=t.querySelector("#userForm");m.innerHTML=`
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
                    ${Il(e?.permissions)}
                </div>
            </div>

            <div class="flex gap-4 pt-6 border-t">
                <button type="button" data-action="back-to-list" class="flex-1 py-3 px-4 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400">Cancelar</button>
                <button type="submit" class="flex-1 py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">Salvar Alterações</button>
            </div>
        </div>
    `;const g=window.innerWidth<768,b=m.querySelector(".bg-white");if(g&&b){b.classList.remove("rounded-xl","shadow-2xl","sm:p-6");const w=m.closest("section");w&&(w.style.padding="0",w.style.margin="0"),b.classList.add("p-4")}const h=m.querySelector("#userProfessionalId"),v=m.querySelector("#userPhotoPreview"),x=m.querySelector("#profPhotoName");if(h.addEventListener("change",w=>{const S=w.target.value,k=s(S),E=k?k.name:"Selecione um profissional",L=r(S,n);v.src=L.photoSrc,x.textContent=E,m.querySelector("#professionalPhotoUrl").value=L.photoUrl}),m.addEventListener("submit",async w=>{w.preventDefault();const S=e?.email,k=m.querySelector("#userEmail").value,E={};m.querySelectorAll('input[type="checkbox"]').forEach(H=>{const P=H.dataset.module,B=H.dataset.permission;E[P]||(E[P]={}),E[P][B]=H.checked});const L=m.querySelector("#userProfessionalId").value||null,D={name:m.querySelector("#userName").value,permissions:E,professionalId:L,establishmentId:u.establishmentId};try{c?(S!==k&&(D.email=k),await xl(e.id,D),p("Usuário atualizado com sucesso!","success")):(D.email=m.querySelector("#userEmail").value,D.password=m.querySelector("#userPassword").value,await hl(D),p("Usuário criado com sucesso!","success")),Mt()}catch(H){p(`Erro: ${H.message}`,"error")}}),c){const w=m.querySelector("#password-change-container"),S=w.querySelector('[data-action="show-password-form"]'),k=w.querySelector("#password-form"),E=k.querySelector('[data-action="save-password"]'),L=k.querySelector('[data-action="cancel-password-change"]');S.addEventListener("click",()=>{S.classList.add("hidden"),k.classList.remove("hidden")}),L.addEventListener("click",()=>{S.classList.remove("hidden"),k.classList.add("hidden"),k.querySelector("#userNewPassword").value=""}),E.addEventListener("click",async()=>{const D=k.querySelector("#userNewPassword").value;if(!D||D.length<6){p("Senha inválida","A nova senha deve ter pelo menos 6 caracteres.","error");return}if(await z("Alterar Senha","Tem a certeza que deseja alterar a senha deste usuário?"))try{E.disabled=!0,E.textContent="Aguarde...",await wl(e.id,D),p("Sucesso!","A senha do usuário foi alterada.","success"),S.classList.remove("hidden"),k.classList.add("hidden"),k.querySelector("#userNewPassword").value=""}catch(P){p("Erro",`Não foi possível alterar a senha: ${P.message}`,"error")}finally{E.disabled=!1,E.textContent="Salvar Nova Senha"}})}}async function Cl(){const e=document.getElementById("usersListContainer");e.innerHTML='<div class="loader col-span-full mx-auto"></div>';try{const[t,a]=await Promise.all([vl(u.establishmentId),K(u.establishmentId)]);u.users=t,u.professionals=a,It()}catch{p("Erro ao carregar usuários.","error"),e.innerHTML='<p class="col-span-full text-center text-red-500">Não foi possível carregar os usuários.</p>'}}async function Mt(){he.innerHTML=`
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
    `,Ge&&he.removeEventListener("click",Ge),Ye&&he.removeEventListener("change",Ye),Ge=async e=>{if(!document.getElementById("user-list-view")){he.removeEventListener("click",Ge);return}const t=e.target.closest("[data-action]");if(!t)return;switch(t.dataset.action){case"new-user":ho();break;case"edit-user":const s=JSON.parse(t.dataset.user.replace(/&apos;/g,"'"));ho(s);break;case"back-to-list":Mt();break;case"delete-user":{e.stopPropagation();const r=t.dataset.userId;if(await z("Excluir Usuário","Tem certeza que deseja excluir este usuário? Esta ação é irreversível."))try{await yl(r),p("Usuário excluído com sucesso!","success"),Mt()}catch(n){p(`Erro ao excluir: ${n.message}`,"error")}break}}},Ye=async e=>{if(!document.getElementById("user-list-view")){he.removeEventListener("change",Ye);return}const t=e.target.closest('input[data-action="toggle-user-status"]');if(e.target.id==="showInactiveUsersToggle")It();else if(t){e.stopPropagation();const a=t.dataset.userId,s=t.checked?"active":"inactive";try{await kl(a,s),p(`Usuário ${s==="active"?"ativado":"inativado"} com sucesso.`,"success");const r=u.users.findIndex(o=>o.id===a);r>-1&&(u.users[r].status=s,It())}catch(r){p(`Erro ao atualizar status: ${r.message}`,"error"),t.checked=!t.checked,It()}}},he.addEventListener("click",Ge),he.addEventListener("change",Ye),await Cl()}const Ll=document.getElementById("content");let xo={},ba=null;function Tl(){Object.values(xo).forEach(e=>e?.destroy()),xo={}}function Pl(e,t){if(!window.jspdf){p("Erro","Biblioteca PDF não carregada.","error");return}const{jsPDF:a}=window.jspdf,s=new a({orientation:"landscape",unit:"px",format:"a4"}),r=document.getElementById("salesReportSummaryCards");if(s.setFontSize(18),s.text(e,s.internal.pageSize.getWidth()/2,40,{align:"center"}),r){const n=[["Receita Total",r.querySelector("#summary-revenue").textContent],["Vendas Totais",r.querySelector("#summary-transactions").textContent],["Ticket Médio",r.querySelector("#summary-avg-ticket").textContent]];s.autoTable({startY:60,head:[["Métrica","Valor"]],body:n,theme:"striped",headStyles:{fillColor:[79,70,229]}})}const o=s.lastAutoTable?s.lastAutoTable.finalY+20:60;s.text("Detalhes das Vendas",20,o),s.autoTable({html:`#${t}`,startY:o+10,theme:"grid",headStyles:{fillColor:[22,163,74]}}),s.save(`${e.replace(/[\s/]/g,"_").toLowerCase()}.pdf`)}function yo(e){const t=document.getElementById("genericModal"),a=f(e.client),s=f(e.items),r=f(e.responsavelCaixa||"N/A"),o=(e.payments||[]).map(n=>`
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
    `,t.style.display="flex"}function Bl(e){const{summary:t,transactions:a}=e;document.getElementById("summary-revenue").textContent=`R$ ${t.totalRevenue.toFixed(2)}`,document.getElementById("summary-transactions").textContent=t.totalTransactions,document.getElementById("summary-avg-ticket").textContent=`R$ ${t.averageTicket.toFixed(2)}`;const s=document.getElementById("paymentSummaryTableBody"),r=Object.entries(t.paymentMethodTotals).sort(([,i],[,l])=>l-i);s.innerHTML=r.map(([i,l])=>`
        <tr class="border-b">
            <td class="py-2 px-4 font-medium">${f(i.charAt(0).toUpperCase()+i.slice(1))}</td>
            <td class="py-2 px-4 text-right font-semibold">R$ ${l.toFixed(2)}</td>
        </tr>
    `).join("");const o=document.getElementById("transactionsTableBody"),n=document.getElementById("mobileTransactionsList");if(a.length===0){const i='<tr><td colspan="5" class="text-center py-8 text-gray-500">Nenhuma venda encontrada para o período selecionado.</td></tr>';o.innerHTML=i,n.innerHTML='<div class="text-center py-8 text-gray-500">Nenhuma venda encontrada.</div>';return}o.innerHTML=a.map((i,l)=>{const d=f(i.client),c=f(i.items),m=f(i.type);return`
        <tr class="border-b hover:bg-gray-50 cursor-pointer" data-transaction-index="${l}">
            <td class="w-24 py-3 px-4">${new Date(i.date).toLocaleString("pt-BR",{dateStyle:"short",timeStyle:"short"})}</td>
            <td class="w-40 py-3 px-4 truncate max-w-[150px]">${d}</td>
            <td class="w-auto py-3 px-4 truncate max-w-[200px]">${c}</td>
            <td class="w-16 py-3 px-4 text-center text-xs">${m}</td>
            <td class="w-24 py-3 px-4 text-right font-medium">R$ ${i.total.toFixed(2)}</td>
        </tr>
    `}).join(""),o.querySelectorAll("tr").forEach(i=>{i.addEventListener("dblclick",()=>{const l=i.dataset.transactionIndex,d=ba.transactions[l];d&&yo(d)})}),n.innerHTML=a.map((i,l)=>{const d=f(i.client),c=f(i.items),m=f(i.type);return`
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
    `}).join(""),n.querySelectorAll("div[data-transaction-index]").forEach(i=>{i.addEventListener("click",()=>{const l=i.dataset.transactionIndex,d=ba.transactions[l];d&&yo(d)})})}async function wo(){const e=document.getElementById("main-reports-view"),t=document.getElementById("reportStartDate"),a=document.getElementById("reportEndDate");if(!e||!t||!a)return;const s=t.value,r=a.value;if(!s||!r)return p("Atenção","Por favor, selecione as datas de início e fim.","error");e.innerHTML='<div class="p-8 text-center"><div class="loader mx-auto"></div><p class="mt-4">A gerar relatório...</p></div>';try{const o=document.getElementById("cashierSessionFilter").value,n=await Mr({establishmentId:u.establishmentId,startDate:s,endDate:r,cashierSessionId:o});ba=n,e.innerHTML=`
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
        `,Bl(n)}catch(o){p("Erro",`Não foi possível carregar o relatório: ${o.message}`,"error"),e.innerHTML=`<p class="p-8 text-center text-red-500">${f(o.message)}</p>`}}async function Dl(){Tl();const e=new Date().toISOString().split("T")[0],t=new Date;t.setDate(t.getDate()-30);const a=t.toISOString().split("T")[0];Ll.innerHTML=`
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
        </section>`,document.getElementById("generateReportBtn").addEventListener("click",wo),document.getElementById("exportPdfBtn").addEventListener("click",()=>{const s=document.getElementById("reportStartDate").value,r=document.getElementById("reportEndDate").value,o=`Relatorio_Vendas_${s}_a_${r}`;Pl(o,"transactionsTable")});try{const s=await cn(u.establishmentId),r=document.getElementById("cashierSessionFilter");s&&s.length>0&&s.forEach(o=>{const n=new Date(o.openTime).toLocaleString("pt-BR",{dateStyle:"short"}),i=f(o.closedByName||"N/A");r.innerHTML+=`<option value="${o.id}">${i} - ${n}</option>`})}catch{p("Erro","Não foi possível carregar o histórico de caixas para o filtro.","error")}await wo()}const Ml=document.getElementById("content");let N={payables:[],receivables:[],natures:[],costCenters:[],currentTab:"payables",statusFilter:"pending",startDate:new Date(new Date().getFullYear(),new Date().getMonth(),1).toISOString().split("T")[0],endDate:new Date().toISOString().split("T")[0],filterNaturezaId:"all",filterCostCenterId:"all",isFilterOpen:!1},ft=null,vt=null;function Na(e){const t=new Map,a=[];return e&&(e.forEach(s=>t.set(s.id,{...s,children:[]})),t.forEach(s=>{s.parentId&&t.has(s.parentId)?t.get(s.parentId).children.push(s):a.push(s)})),a}function Al(e){if(!e)return{day:"--",month:"---"};const t=new Date(e+"T00:00:00"),a=t.getDate().toString().padStart(2,"0"),s=t.toLocaleString("pt-BR",{month:"short"}).toUpperCase().replace(".","");return{day:a,month:s,full:t.toLocaleDateString("pt-BR")}}function Ct(e){return new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(e)}function ql(e,t,a){if(!e)return;if(!t||t.length===0){e.innerHTML='<p class="text-center text-gray-400 text-sm py-4">Nenhum item criado.</p>';return}const s=(r,o=0)=>`
            <div class="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-100 mb-1" style="margin-left: ${o*16}px;">
                <span class="text-sm font-medium text-gray-700">${r.name}</span>
                <button data-action="delete-${a}" data-id="${r.id}" class="text-red-400 hover:text-red-600 text-xs font-semibold px-2 py-1 bg-red-50 rounded hover:bg-red-100 transition-colors">
                    Excluir
                </button>
            </div>
            ${r.children.map(i=>s(i,o+1)).join("")}
        `;e.innerHTML=t.map(r=>s(r)).join("")}async function fa(e){const t=document.getElementById("genericModal"),a=e==="nature",s=a?"Naturezas Financeiras":"Centros de Custo",r=a?La:Ta,o=a?Bn:Mn,n=a?"natures":"costCenters";t.innerHTML=`
        <div class="modal-content max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden">
            <div class="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <h2 class="text-lg font-bold text-gray-800">Gerir ${s}</h2>
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
        </div>`,t.style.display="flex";const i=t.querySelector("#hierarchyList"),l=t.querySelector("#itemParent"),d=m=>{const g=Na(m);ql(i,g,e);const b=l.value;l.innerHTML='<option value="">-- Categoria Principal --</option>';const h=(v,x=0)=>{const w="  ".repeat(x)+(x>0?"↳ ":"");l.innerHTML+=`<option value="${v.id}">${w}${v.name}</option>`,v.children.forEach(S=>h(S,x+1))};g.forEach(v=>h(v)),l.value=b};try{const m=await r(u.establishmentId);N[n]=m,d(m)}catch(m){console.error(m)}const c=t.querySelector("#hierarchyForm");c.addEventListener("submit",async m=>{m.preventDefault();const g=t.querySelector("#itemName").value,b=l.value;try{await o({name:g,parentId:b||null,establishmentId:u.establishmentId});const h=await r(u.establishmentId);N[n]=h,d(h),c.reset(),await Ue(),p("Sucesso","Item adicionado.","success")}catch(h){p("Erro",h.message,"error")}})}async function Nl(){Rl(),jl(),await Ue()}function Rl(){Ml.innerHTML=`
        <div class="flex flex-col h-[calc(100vh-80px)] md:h-auto bg-gray-50 w-full overflow-hidden">
            
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
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.096 2.572-1.065z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div id="filter-panel" class="hidden overflow-hidden transition-all duration-300 mb-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <div class="col-span-2 md:col-span-1">
                                <label class="text-xs font-semibold text-gray-500 ml-1">De</label>
                                <input type="date" id="filterStartDate" value="${N.startDate}" class="w-full p-2 border border-gray-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-indigo-500 outline-none">
                            </div>
                            <div class="col-span-2 md:col-span-1">
                                <label class="text-xs font-semibold text-gray-500 ml-1">Até</label>
                                <input type="date" id="filterEndDate" value="${N.endDate}" class="w-full p-2 border border-gray-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-indigo-500 outline-none">
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
    `}function jl(){document.getElementById("toggle-filter-btn").addEventListener("click",()=>{const a=document.getElementById("filter-panel"),s=document.getElementById("toggle-filter-btn");N.isFilterOpen=!N.isFilterOpen,N.isFilterOpen?(a.classList.remove("hidden"),s.classList.add("bg-indigo-100","text-indigo-600")):(a.classList.add("hidden"),s.classList.remove("bg-indigo-100","text-indigo-600"))}),document.getElementById("settings-btn").addEventListener("click",Ul),document.getElementById("fab-add").addEventListener("click",()=>{const a=N.currentTab==="payables"?"payable":"receivable";ta(a)});const e=document.getElementById("tab-receivables"),t=document.getElementById("tab-payables");e.addEventListener("click",()=>ko("receivables")),t.addEventListener("click",()=>ko("payables")),document.querySelectorAll(".status-filter-btn").forEach(a=>{a.addEventListener("click",s=>{document.querySelectorAll(".status-filter-btn").forEach(r=>{r.classList.remove("bg-indigo-100","text-indigo-700"),r.classList.add("text-gray-500")}),s.target.classList.add("bg-indigo-100","text-indigo-700"),s.target.classList.remove("text-gray-500"),N.statusFilter=s.target.dataset.status})}),document.getElementById("apply-filter-btn").addEventListener("click",()=>{N.startDate=document.getElementById("filterStartDate").value,N.endDate=document.getElementById("filterEndDate").value,N.filterNaturezaId=document.getElementById("filterNaturezaId").value,N.filterCostCenterId=document.getElementById("filterCostCenterId").value,document.getElementById("toggle-filter-btn").click(),Ue()}),ft&&document.body.removeEventListener("click",ft),ft=a=>{const s=a.target,r=s.closest("button[data-action]");if(r){const{action:n,type:i,id:l}=r.dataset;if(a.stopPropagation(),n==="delete"){zl(i,l);return}if(n==="mark-as-paid"){Ol(i,l);return}if(n==="manage-natures"){fa("nature");return}if(n==="manage-cost-centers"){fa("cost-center");return}if(n==="edit"){const d=JSON.parse(r.dataset.item.replace(/&apos;/g,"'"));ta(i,d);return}}const o=s.closest(".financial-card-item");if(o&&document.getElementById("list-container").contains(o)){const{type:n}=o.dataset,i=JSON.parse(o.dataset.item.replace(/&apos;/g,"'"));ta(n,i)}},document.body.addEventListener("click",ft),vt&&document.getElementById("genericModal").removeEventListener("click",vt),vt=a=>{if(a.target.closest('[data-action="close-modal"]')){document.getElementById("genericModal").style.display="none";return}const r=a.target.closest('button[data-action^="delete-"]');if(r){const o=r.dataset.action.split("-")[1];Vl(o,r.dataset.id)}},document.getElementById("genericModal").addEventListener("click",vt)}function ko(e){N.currentTab=e;const t=document.getElementById("tab-receivables"),a=document.getElementById("tab-payables"),s=document.getElementById("fab-add");e==="receivables"?(t.classList.add("bg-white","text-green-700","shadow-sm"),t.classList.remove("text-gray-500"),a.classList.remove("bg-white","text-red-700","shadow-sm"),a.classList.add("text-gray-500"),s.className="fixed bottom-6 right-6 w-14 h-14 bg-green-600 text-white rounded-full shadow-xl flex items-center justify-center hover:bg-green-700 hover:scale-105 transition-all z-40"):(a.classList.add("bg-white","text-red-700","shadow-sm"),a.classList.remove("text-gray-500"),t.classList.remove("bg-white","text-green-700","shadow-sm"),t.classList.add("text-gray-500"),s.className="fixed bottom-6 right-6 w-14 h-14 bg-red-600 text-white rounded-full shadow-xl flex items-center justify-center hover:bg-red-700 hover:scale-105 transition-all z-40"),Es()}async function Ue(){const e=document.getElementById("list-container");e.innerHTML='<div class="loader mx-auto my-10"></div>';try{if(N.natures.length===0){const[r,o]=await Promise.all([La(u.establishmentId),Ta(u.establishmentId)]);N.natures=r,N.costCenters=o,Fl()}const t={startDate:N.startDate,endDate:N.endDate,establishmentId:u.establishmentId};N.filterNaturezaId!=="all"&&(t.natureId=N.filterNaturezaId),N.filterCostCenterId!=="all"&&(t.costCenterId=N.filterCostCenterId);const[a,s]=await Promise.all([Nn(t),On(t)]);N.payables=a.entries||[],N.receivables=s.entries||[],Hl(),Es()}catch(t){e.innerHTML=`<p class="text-center text-red-500 mt-10">Erro ao carregar: ${t.message}</p>`}}function Fl(){const e=s=>{let r='<option value="all">Todas</option>';const o=Na(s),n=(i,l=0)=>{const d="  ".repeat(l)+(l>0?"↳ ":"");r+=`<option value="${i.id}">${d}${i.name}</option>`,i.children.forEach(c=>n(c,l+1))};return o.forEach(i=>n(i)),r},t=document.getElementById("filterNaturezaId"),a=document.getElementById("filterCostCenterId");t&&(t.innerHTML=e(N.natures)),a&&(a.innerHTML=e(N.costCenters)),t&&(t.value=N.filterNaturezaId),a&&(a.value=N.filterCostCenterId)}function Hl(){const e=document.getElementById("summary-section");if(!e)return;const t=N.receivables.reduce((l,d)=>l+d.amount,0),a=N.receivables.filter(l=>l.status==="paid").reduce((l,d)=>l+d.amount,0),s=t-a,r=N.payables.reduce((l,d)=>l+d.amount,0),o=N.payables.filter(l=>l.status==="paid").reduce((l,d)=>l+d.amount,0),n=r-o,i=a-o;e.innerHTML=`
        <div class="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 col-span-2 md:col-span-1">
            <p class="text-[10px] text-gray-400 font-bold uppercase tracking-wider">A Receber</p>
            <p class="text-xl font-bold text-green-600">${Ct(s)}</p>
        </div>
        <div class="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 col-span-2 md:col-span-1">
            <p class="text-[10px] text-gray-400 font-bold uppercase tracking-wider">A Pagar</p>
            <p class="text-xl font-bold text-red-500">${Ct(n)}</p>
        </div>
        <div class="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 col-span-2 md:col-span-1">
            <p class="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Realizado</p>
            <p class="text-xl font-bold ${i>=0?"text-indigo-600":"text-orange-500"}">${Ct(i)}</p>
        </div>
    `}function Es(){const e=document.getElementById("list-container");if(!e)return;const t=N.currentTab==="receivables",a=t?N.receivables:N.payables;let s=a;if(N.statusFilter!=="all"&&(s=a.filter(n=>n.status===N.statusFilter)),s.sort((n,i)=>new Date(n.dueDate)-new Date(i.dueDate)),s.length===0){e.innerHTML=`
            <div class="flex flex-col items-center justify-center py-12 text-gray-400 opacity-60">
                <svg class="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                <p>Nenhum lançamento encontrado.</p>
            </div>
        `;return}const r=new Map(N.natures.map(n=>[n.id,n.name])),o=t?"receivable":"payable";e.innerHTML=s.map(n=>{const i=Al(n.dueDate),l=n.status==="paid",d=l?"text-gray-400":t?"text-green-600":"text-red-500",c=n.naturezaId&&r.get(n.naturezaId)||"Geral",m=JSON.stringify(n).replace(/'/g,"&apos;");return`
        <div class="financial-card-item w-full max-w-full bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex items-start gap-3 relative overflow-hidden cursor-pointer hover:shadow-md transition-all active:scale-[0.99]"
             data-type="${o}"
             data-item='${m}'>
            
            <div class="absolute left-0 top-0 bottom-0 w-1 ${l?"bg-gray-300":t?"bg-green-500":"bg-red-500"}"></div>

            <div class="flex-shrink-0 flex flex-col items-center justify-center bg-gray-50 rounded-lg w-12 h-12 border border-gray-100 mt-0.5">
                <span class="text-base font-bold text-gray-800 leading-none">${i.day}</span>
                <span class="text-[9px] font-bold text-gray-400 uppercase leading-none mt-0.5">${i.month}</span>
            </div>

            <div class="flex-1 min-w-0 flex flex-col justify-start">
                <h3 class="font-bold text-gray-800 text-sm break-words whitespace-normal pr-1 leading-snug ${l?"line-through text-gray-400":""}">
                    ${n.description}
                </h3>
                <div class="flex items-center gap-1.5 mt-1 flex-wrap">
                    <span class="text-[10px] px-1.5 py-0.5 rounded-md bg-indigo-50 text-indigo-600 font-medium break-all">
                        ${c}
                    </span>
                    ${l?'<span class="text-[10px] px-1.5 py-0.5 rounded-md bg-gray-100 text-gray-500 font-medium whitespace-nowrap">Baixado</span>':""}
                </div>
            </div>

            <div class="flex-shrink-0 text-right pl-1 flex flex-col items-end">
                <p class="font-bold text-sm ${d} whitespace-nowrap">${Ct(n.amount)}</p>
                
                <div class="flex justify-end gap-3 mt-2">
                    ${l?"":`
                        <button data-action="mark-as-paid" data-type="${o}" data-id="${n.id}" class="p-1.5 rounded-full text-gray-400 hover:text-green-500 hover:bg-green-50 transition-colors z-10" title="Baixar">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                        </button>
                    `}
                    
                    <button data-action="delete" data-type="${o}" data-id="${n.id}" class="p-1.5 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors z-10" title="Excluir">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                    </button>
                </div>
            </div>
        </div>
        `}).join("")}async function Ol(e,t){const a=new Date().toISOString().split("T")[0];try{await(e==="payable"?Fn(t,a):Un(t,a)),p("Sucesso","Lançamento baixado!","success"),await Ue()}catch(s){p("Erro",s.message,"error")}}async function zl(e,t){if(await z("Excluir Lançamento","Tem certeza? Essa ação não pode ser desfeita."))try{await(e==="payable"?jn(t):Vn(t)),p("Sucesso","Lançamento excluído.","success"),await Ue()}catch(s){p("Erro",s.message,"error")}}async function Vl(e,t){const s=e==="nature"?Dn:An;if(await z("Apagar Item","Tem a certeza? Apagar um item principal também apagará os seus sub-itens."))try{await s(t),fa(e==="nature"?"nature":"cost-center")}catch(o){p("Erro",o.message,"error")}}function Ul(){const e=document.getElementById("genericModal");e.innerHTML=`
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
    `,e.style.display="flex"}function ta(e,t=null){const a=document.getElementById("genericModal"),s=e==="payable",r=`${t?"Editar":"Nova"} ${s?"Despesa":"Receita"}`,o=s?"red":"green",n=(m,g)=>{let b='<option value="">-- Selecione --</option>';const h=Na(m),v=(x,w=0)=>{const S="  ".repeat(w)+(w>0?"↳ ":""),k=x.id===g?"selected":"";b+=`<option value="${x.id}" ${k}>${S}${x.name}</option>`,x.children.forEach(E=>v(E,w+1))};return h.forEach(x=>v(x)),b};a.innerHTML=`
        <div class="modal-content max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden w-full m-4">
            <div class="bg-${o}-50 px-6 py-4 border-b border-${o}-100 flex justify-between items-center">
                <h2 class="text-xl font-bold text-${o}-800">${r}</h2>
                <button type="button" data-action="close-modal" class="text-${o}-400 hover:text-${o}-600 text-2xl font-bold">&times;</button>
            </div>
            
            <form id="financial-form" class="p-6 space-y-4">
                <div>
                    <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Descrição</label>
                    <input type="text" name="description" required class="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-${o}-500 outline-none transition-all" value="${t?.description||""}" placeholder="Ex: Conta de Luz, Venda Balcão...">
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Valor (R$)</label>
                        <input type="number" step="0.01" name="amount" required class="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-${o}-500 outline-none font-bold text-gray-700" value="${t?.amount||""}">
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Vencimento</label>
                        <input type="date" name="dueDate" required class="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-${o}-500 outline-none" value="${t?.dueDate||new Date().toISOString().split("T")[0]}">
                    </div>
                </div>

                ${t?"":`
                <div class="p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <label class="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" id="toggle-installments" class="w-4 h-4 text-${o}-600 rounded focus:ring-${o}-500">
                        <span class="text-sm font-semibold text-gray-700">Repetir / Parcelar</span>
                    </label>
                    <div id="installments-container" class="hidden mt-3">
                        <label class="block text-xs text-gray-500 mb-1">Número de Parcelas (Mensais)</label>
                        <input type="number" name="installments" min="2" max="36" value="2" class="w-full p-2 border border-gray-200 rounded-lg">
                    </div>
                </div>`}

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Natureza</label>
                        <select name="naturezaId" class="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-${o}-500 outline-none text-sm">
                            ${n(N.natures,t?.naturezaId)}
                        </select>
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Centro de Custo</label>
                        <select name="centroDeCustoId" class="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-${o}-500 outline-none text-sm">
                            ${n(N.costCenters,t?.centroDeCustoId)}
                        </select>
                    </div>
                </div>

                <div>
                    <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Observações</label>
                    <textarea name="notes" rows="2" class="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-${o}-500 outline-none text-sm">${t?.notes||""}</textarea>
                </div>

                <div class="border-t border-gray-100 pt-4 mt-2">
                    <label class="flex items-center justify-between cursor-pointer group">
                        <span class="text-sm font-bold text-gray-700 group-hover:text-${o}-700 transition-colors">Já foi Pago/Recebido?</span>
                        <div class="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" name="status" id="status-toggle" class="sr-only peer" ${t?.status==="paid"?"checked":""}>
                            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-${o}-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-${o}-600"></div>
                        </div>
                    </label>
                    
                    <div id="payment-date-wrapper" class="${t?.status==="paid"?"":"hidden"} mt-3 bg-${o}-50 p-3 rounded-lg animate-fade-in">
                        <label class="block text-xs font-bold text-${o}-700 mb-1">Data do Pagamento</label>
                        <input type="date" name="paymentDate" class="w-full p-2 border border-${o}-200 rounded-lg text-sm" value="${t?.paymentDate||new Date().toISOString().split("T")[0]}">
                    </div>
                </div>

                <div class="pt-4 flex gap-3">
                    <button type="button" data-action="close-modal" class="flex-1 py-3 bg-gray-100 text-gray-600 font-semibold rounded-xl hover:bg-gray-200">Cancelar</button>
                    <button type="submit" class="flex-1 py-3 bg-${o}-600 text-white font-semibold rounded-xl hover:bg-${o}-700 shadow-lg active:scale-95 transition-transform">Salvar</button>
                </div>
            </form>
        </div>`,a.style.display="flex";const i=a.querySelector("#financial-form"),l=i.querySelector("#status-toggle"),d=i.querySelector("#payment-date-wrapper"),c=i.querySelector('[name="paymentDate"]');if(!t){const m=i.querySelector("#toggle-installments"),g=i.querySelector("#installments-container");m.addEventListener("change",()=>{g.classList.toggle("hidden",!m.checked)})}l.addEventListener("change",()=>{l.checked?(d.classList.remove("hidden"),c.required=!0):(d.classList.add("hidden"),c.required=!1)}),i.addEventListener("submit",async m=>{m.preventDefault();const g=new FormData(i),b=l.checked,h={description:g.get("description"),amount:parseFloat(g.get("amount")),dueDate:g.get("dueDate"),naturezaId:g.get("naturezaId")||null,centroDeCustoId:g.get("centroDeCustoId")||null,notes:g.get("notes"),status:b?"paid":"pending",paymentDate:b?g.get("paymentDate"):null,establishmentId:u.establishmentId},v=g.get("installments");!t&&v&&parseInt(v)>1?h.installments=parseInt(v):h.installments=1;try{t?(await(s?Rn(t.id,h):zn(t.id,h)),p("Sucesso","Atualizado com sucesso!","success")):(await(s?qn(h):Hn(h)),p("Sucesso","Criado com sucesso!","success")),document.getElementById("genericModal").style.display="none",Ue()}catch(x){p("Erro",x.message,"error")}})}const _l=e=>$("/api/commissions/calculate",{method:"POST",body:JSON.stringify(e)}),Wl=e=>$("/api/commissions/save",{method:"POST",body:JSON.stringify(e)}),Jl=(e,t)=>{const a=new URLSearchParams({startDate:e,endDate:t}).toString();return $(`/api/commissions/stats?${a}`)},Gl=(e={})=>{Object.keys(e).forEach(s=>(e[s]===void 0||e[s]===null||e[s]==="")&&delete e[s]);const t=new URLSearchParams(e).toString(),a=`/api/commissions/history${t?"?"+t:""}`;return $(a)},Yl=e=>$(`/api/commissions/report/${e}`,{method:"DELETE"}),At=new Date,So=new Date(At.getFullYear(),At.getMonth(),1),R={currentTab:"dashboard",professionals:[],calculationResult:null,historyData:[],periodString:"",dashStartDate:So.toISOString().split("T")[0],dashEndDate:At.toISOString().split("T")[0],dashStats:{revenue:0,commissions:0},histStartDate:So.toISOString().split("T")[0],histEndDate:At.toISOString().split("T")[0],histProfessionalId:"all"};let ht=null;const Qe=document.getElementById("content");async function Ql(){try{R.professionals=await K(u.establishmentId)}catch(e){console.error("Erro profissionais",e)}id(),Xl(),Yt(),Nt("dashboard")}function Xl(){ht&&Qe.removeEventListener("click",ht),ht=e=>{const t=e.target.closest("button");if(!t)return;const a=t.dataset.action,s=t.dataset.id,r=t.dataset.idx;switch(a){case"tab-nav":Nt(t.dataset.tab);break;case"toggle-all-profs":Zl();break;case"back-to-filters":R.calculationResult=null,qt(document.getElementById("commissions-content"));break;case"view-preview-items":nd(r);break;case"save-final-report":ed();break;case"start-new-calc":Nt("calculator");break;case"print-receipt":td(s);break;case"delete-report":ad(s);break;case"filter-dashboard":Yt();break;case"filter-history":Ra();break}},Qe.addEventListener("click",ht),Qe.oninput=e=>{if(e.target.classList.contains("input-debit")||e.target.classList.contains("input-credit")){const t=e.target.dataset.idx;sd(t)}},Qe.onsubmit=e=>{e.target.id==="calc-form"&&(e.preventDefault(),Kl())}}async function Yt(){const e=document.getElementById("dash-start"),t=document.getElementById("dash-end");e&&(R.dashStartDate=e.value),t&&(R.dashEndDate=t.value);const a=document.getElementById("dashboard-stats-container");a&&(a.innerHTML='<div class="flex justify-center py-10"><div class="loader"></div></div>');try{const s=await Jl(R.dashStartDate,R.dashEndDate);R.dashStats={revenue:s.totalRevenue||0,commissions:s.totalCommissionsPaid||0},R.currentTab==="dashboard"&&Is(document.getElementById("commissions-content"))}catch(s){console.error(s),a&&(a.innerHTML='<p class="text-red-500 text-center">Erro ao carregar dados.</p>')}}async function Ra(){const e=document.getElementById("hist-start"),t=document.getElementById("hist-end"),a=document.getElementById("hist-prof");e&&(R.histStartDate=e.value),t&&(R.histEndDate=t.value),a&&(R.histProfessionalId=a.value);const s=document.getElementById("history-list-container");if(s){s.innerHTML='<div class="flex justify-center py-10"><div class="loader"></div></div>';try{const r=await Gl({startDate:R.histStartDate,endDate:R.histEndDate,professionalId:R.histProfessionalId});R.historyData=r,Cs(s,r)}catch{s.innerHTML='<p class="text-red-500 text-center py-4">Erro ao buscar registros.</p>'}}}function Zl(){const e=document.querySelectorAll(".prof-checkbox"),t=Array.from(e).every(a=>a.checked);e.forEach(a=>a.checked=!t)}async function Kl(){const e=Array.from(document.querySelectorAll(".prof-checkbox:checked")).map(o=>o.value);if(e.length===0)return p("Atenção","Selecione profissionais","error");const t={professionalIds:e,startDate:document.getElementById("start-date").value,endDate:document.getElementById("end-date").value,calculationTypes:{services:document.getElementById("type-services").checked,products:document.getElementById("type-products").checked,packages:document.getElementById("type-packages").checked}},a=new Date(t.startDate+"T00:00:00").toLocaleDateString("pt-BR"),s=new Date(t.endDate+"T00:00:00").toLocaleDateString("pt-BR");R.periodString=`${a} a ${s}`;const r=document.getElementById("commissions-content");r.innerHTML='<div class="flex flex-col items-center justify-center py-20"><div class="loader mb-4"></div><p class="text-gray-500 animate-pulse">Calculando...</p></div>';try{const o=await _l(t);R.calculationResult=o.map(n=>({...n,extraDebit:0,extraCredit:0,finalValue:n.summary.totalCommission,notes:""})),qt(r)}catch(o){p("Erro",o.message,"error"),R.calculationResult=null,qt(r)}}async function ed(){const e=R.calculationResult.length;if(await z("Confirmar",`Gerar ${e} relatórios? Isso marcará as vendas como pagas.`))try{const a=R.calculationResult.map(s=>{const r=s.items.map(o=>o.originalSaleId).filter(o=>o!=null);return Wl({professionalId:s.professionalId,professionalName:s.professionalName,period:R.periodString,processedSalesIds:r,reportData:{...s,summary:{...s.summary,finalValue:s.finalValue,extraDebit:s.extraDebit||0,extraCredit:s.extraCredit||0,notes:s.notes||""}}})});await Promise.all(a),p("Sucesso","Pagamentos registrados!","success"),R.calculationResult=null,Yt(),Nt("history")}catch(a){p("Erro",a.message,"error")}}function td(e){const t=R.historyData.find(a=>a.id===e);t&&od(t)}async function ad(e){if(await z("Excluir","Deseja remover este registro? As vendas voltarão a ficar disponíveis para cálculo."))try{await Yl(e),p("Sucesso","Registro removido.","success"),Ra(),Yt()}catch(a){p("Erro",a.message,"error")}}function od(e){const{jsPDF:t}=window.jspdf;if(!t)return p("Erro","PDF lib não carregada.","error");const a=new t,s=a.internal.pageSize.getWidth()/2;a.setFontSize(18),a.setFont(void 0,"bold"),a.text("RECIBO DE PAGAMENTO DE COMISSÃO",s,20,{align:"center"}),a.setFontSize(12),a.setFont(void 0,"normal"),a.text(`Profissional: ${e.professionalName}`,15,40),a.text(`Período: ${e.period}`,15,48);const r=[["Comissão Bruta",`R$ ${e.summary.totalCommission.toFixed(2)}`]];e.summary.extraCredit>0&&r.push(["(+) Bônus",`R$ ${e.summary.extraCredit.toFixed(2)}`]),e.summary.extraDebit>0&&r.push(["(-) Descontos",`R$ ${e.summary.extraDebit.toFixed(2)}`]),a.autoTable({startY:60,head:[["Descrição","Valor"]],body:r,theme:"grid"});const o=a.lastAutoTable.finalY+10;a.setFontSize(14),a.setFont(void 0,"bold"),a.text(`Total Líquido: R$ ${(e.summary.finalValue||e.summary.totalCommission).toFixed(2)}`,190,o,{align:"right"}),a.save(`Recibo_${e.professionalName}.pdf`)}function sd(e){const t=document.querySelectorAll(`.input-debit[data-idx="${e}"]`),a=document.querySelectorAll(`.input-credit[data-idx="${e}"]`);let s=0,r=0;if(t.forEach(o=>{o.value&&(s=parseFloat(o.value))}),a.forEach(o=>{o.value&&(r=parseFloat(o.value))}),R.calculationResult&&R.calculationResult[e]){const o=R.calculationResult[e];o.extraDebit=s,o.extraCredit=r,o.finalValue=o.summary.totalCommission-s+r,t.forEach(i=>{i!==document.activeElement&&(i.value=s||"")}),a.forEach(i=>{i!==document.activeElement&&(i.value=r||"")}),document.querySelectorAll(`.final-value-display[data-idx="${e}"]`).forEach(i=>i.innerText=`R$ ${o.finalValue.toFixed(2)}`),rd()}}function rd(){const e=R.calculationResult.reduce((a,s)=>a+s.finalValue,0);document.querySelectorAll("#grand-total-display").forEach(a=>a.innerText=`R$ ${e.toFixed(2)}`)}function nd(e){const t=R.calculationResult[e];if(!t)return;const a=t.items.map(s=>`
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
    `).join("");Q({title:"Detalhes da Comissão",contentHTML:`<div class="bg-gray-50 p-3 rounded-lg mb-4 flex justify-between items-center"><div><p class="text-xs text-gray-500">Profissional</p><p class="font-bold text-gray-800">${t.professionalName}</p></div><div class="text-right"><p class="text-xs text-gray-500">Total Itens</p><p class="font-bold text-gray-800">${t.items.length}</p></div></div><div class="border rounded-lg overflow-hidden max-h-[60vh] overflow-y-auto">${a}</div>`,maxWidth:"max-w-md"})}function qt(e){if(R.calculationResult){const t=R.calculationResult,a=t.reduce((o,n)=>o+n.finalValue,0),s=t.map((o,n)=>`
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
            </div>`}else{const t=new Date().toISOString().split("T")[0],a=new Date(new Date().getFullYear(),new Date().getMonth(),1).toISOString().split("T")[0],s=R.professionals.map(r=>`
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
            </form>`}}function id(){Qe.innerHTML=`
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
    `}function Nt(e){R.currentTab=e,["dashboard","calculator","history"].forEach(a=>{const s=document.getElementById(`tab-${a}`);a===e?s.className="flex-1 md:flex-none px-4 py-2 rounded-md text-sm font-bold bg-white text-indigo-600 shadow-sm border border-gray-100":s.className="flex-1 md:flex-none px-4 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700"});const t=document.getElementById("commissions-content");e==="dashboard"&&Is(t),e==="calculator"&&qt(t),e==="history"&&ld(t)}function Is(e){const{revenue:t,commissions:a}=R.dashStats,s=t>0?(a/t*100).toFixed(1):0;e.innerHTML=`
        <div class="space-y-6 animate-fade-in">
            <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row gap-4 items-end">
                <div class="flex-1 w-full">
                    <label class="text-xs font-bold text-gray-500 uppercase">Data Inicial</label>
                    <input type="date" id="dash-start" value="${R.dashStartDate}" class="w-full mt-1 rounded-lg border-gray-300">
                </div>
                <div class="flex-1 w-full">
                    <label class="text-xs font-bold text-gray-500 uppercase">Data Final</label>
                    <input type="date" id="dash-end" value="${R.dashEndDate}" class="w-full mt-1 rounded-lg border-gray-300">
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
    `}function ld(e){const t=R.professionals.map(a=>`<option value="${a.id}" ${R.histProfessionalId===a.id?"selected":""}>${a.name}</option>`).join("");e.innerHTML=`
        <div class="space-y-6">
            <div class="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                <h2 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    Pesquisar Pagamentos
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <div>
                        <label class="text-xs font-bold text-gray-500 uppercase">De (Data Pagto)</label>
                        <input type="date" id="hist-start" value="${R.histStartDate}" class="w-full mt-1 rounded-lg border-gray-300">
                    </div>
                    <div>
                        <label class="text-xs font-bold text-gray-500 uppercase">Até</label>
                        <input type="date" id="hist-end" value="${R.histEndDate}" class="w-full mt-1 rounded-lg border-gray-300">
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
    `,R.historyData.length>0?Cs(document.getElementById("history-list-container"),R.historyData):Ra()}function Cs(e,t){if(t.length===0){e.innerHTML=`
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
    `}const aa=document.getElementById("content");let Se={allPackages:[],catalogForModal:{services:[],products:[]}},xt=null,De=null;function dd(e=6){let t="";for(let a=0;a<e;a++)t+=`
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
        `;return t}function cd(){const e=document.getElementById("packagesListContainer");if(e){if(Se.allPackages.length===0){e.innerHTML=`
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
            </div>`;return}e.innerHTML=Se.allPackages.map(t=>{const a=t.status==="active",s=JSON.stringify(t).replace(/'/g,"&apos;"),r=t.price||0,o=t.originalPrice||0,n=o>r?o-r:0,i=o>0?(o-r)/o*100:0,l=f(t.name),d=f(t.description||"Sem descrição");return`
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
        `}).join("")}}function $o(){const e=document.getElementById("genericModal");e.style.display="none",De&&e.removeEventListener("click",De)}async function Eo(e=null){const t=document.getElementById("genericModal"),a=!!e,s=e?JSON.parse(JSON.stringify(e.items||[])):[],r=f(e?.name||""),o=f(e?.description||""),n=e?.price||"",i=e?.commissionRate||0,l=e?.validityDays||30,d=`
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
    `;t.innerHTML=d,t.style.display="flex";const c=t.querySelector("#package-items-list"),m=(b,h)=>{const v=h.querySelector("#originalPrice"),x=b.reduce((w,S)=>w+S.price*S.quantity,0);v&&(v.textContent=`R$ ${x.toFixed(2)}`)},g=b=>{b.length===0?c.innerHTML='<p class="text-center text-gray-500 p-4">Nenhum item adicionado.</p>':c.innerHTML=b.map((h,v)=>{const x=h.type==="service",w=x?"Serviço":"Produto",S=x?"bg-indigo-100 text-indigo-800":"bg-green-100 text-green-800";return`
                <div class="flex items-center justify-between bg-white p-2 rounded shadow-sm border border-gray-200">
                    <div class="flex items-center gap-3 min-w-0">
                        <input type="number" value="${h.quantity}" min="1" class="w-12 p-1 border rounded-md text-sm quantity-input flex-shrink-0" data-index="${v}">
                        <span class="text-xs font-medium px-2 py-0.5 rounded-full ${S}">${w}</span>
                        <span class="font-medium text-gray-800 truncate">${f(h.name)}</span>
                    </div>
                    <div class="flex items-center gap-2 flex-shrink-0">
                        <span class="text-sm text-gray-600">R$ ${h.price.toFixed(2)}</span>
                        <button type="button" class="text-red-500 hover:text-red-700 remove-item-btn font-bold" data-index="${v}">&times;</button>
                    </div>
                </div>
            `}).join(""),m(b,t)};g(s),c.addEventListener("change",b=>{if(b.target.classList.contains("quantity-input")){const h=parseInt(b.target.dataset.index,10),v=parseInt(b.target.value,10);v>0&&s[h]&&(s[h].quantity=v,g(s))}}),c.addEventListener("click",b=>{if(b.target.classList.contains("remove-item-btn")){const h=parseInt(b.target.dataset.index,10);s.splice(h,1),g(s)}}),t.querySelector("#add-item-to-package-btn").onclick=()=>ud(b=>{const h=s.find(v=>v.id===b.id&&v.type===b.type);h?h.quantity++:s.push({...b,quantity:1}),g(s)}),De&&t.removeEventListener("click",De),De=async b=>{const h=b.target.closest("button[data-action]");if(!h)return;const v=h.dataset.action;if(b.stopPropagation(),v==="close-modal"&&$o(),v==="save-package"){const x=h,w={id:document.getElementById("packageId").value||null,name:document.getElementById("packageName").value,description:document.getElementById("packageDescription").value,status:document.getElementById("packageStatus").value,items:s,originalPrice:s.reduce((S,k)=>S+k.price*k.quantity,0),price:parseFloat(document.getElementById("finalPrice").value),commissionRate:parseFloat(document.getElementById("commissionRate").value)||0,validityDays:parseInt(document.getElementById("validityDays").value,10)||null,establishmentId:u.establishmentId};if(!w.name||!w.price){p("Erro","Nome do Pacote e Preço Final são obrigatórios.","error");return}if(w.items.length===0){p("Erro","Adicione pelo menos um item ao pacote.","error");return}x.disabled=!0,x.textContent="A salvar...";try{a?await pn(w.id,w):(delete w.id,await mn(w)),p("Sucesso!",`Pacote ${a?"atualizado":"criado"} com sucesso.`,"success"),$o(),await ja()}catch(S){p("Erro",`Não foi possível salvar o pacote: ${S.message}`,"error"),x.disabled=!1,x.textContent="Salvar Pacote"}}},t.addEventListener("click",De)}function ud(e){let t="";const a=document.createElement("div");a.id="item-selection-modal",a.className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[110]";const s={service:'<svg class="w-6 h-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v4.512a9.04 9.04 0 00-3 5.012M12 12a9.04 9.04 0 01-3-5.012V5l-1-1z" /></svg>',product:'<svg class="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>'},r=l=>{const d=t.toLowerCase(),c=Se.catalogForModal.services.filter(h=>h.name.toLowerCase().includes(d)),m=Se.catalogForModal.products.filter(h=>h.name.toLowerCase().includes(d)),g=c.map(h=>`
            <button data-action="select-item" data-item-type="service" data-item-id="${h.id}" class="flex items-center gap-3 w-full p-3 bg-white border rounded-lg hover:bg-gray-50 transition">
                <div class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gray-100">${s.service}</div>
                <span class="flex-grow text-left min-w-0 truncate">${f(h.name)}</span>
                <span class="font-semibold flex-shrink-0">R$ ${h.price.toFixed(2)}</span>
            </button>
        `).join("")||'<p class="text-xs text-gray-400 text-center p-4">Nenhum serviço encontrado.</p>',b=m.map(h=>`
            <button data-action="select-item" data-item-type="product" data-item-id="${h.id}" class="flex items-center gap-3 w-full p-3 bg-white border rounded-lg hover:bg-gray-50 transition">
                <div class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gray-100">${s.product}</div>
                <span class="flex-grow text-left min-w-0 truncate">${f(h.name)}</span>
                <span class="font-semibold flex-shrink-0">R$ ${h.price.toFixed(2)}</span>
            </button>
        `).join("")||'<p class="text-xs text-gray-400 text-center p-4">Nenhum produto encontrado.</p>';l.innerHTML=`
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><h4 class="font-semibold mb-2 text-center text-indigo-600">Serviços</h4><div id="modal-service-list" class="space-y-2 max-h-96 overflow-y-auto">${g}</div></div>
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
    `,document.body.appendChild(a);const o=a.querySelector("#item-selection-list"),n=a.querySelector("#item-search-input"),i=()=>{a.remove()};r(o),n.addEventListener("input",()=>{t=n.value,r(o)}),a.addEventListener("click",l=>{const d=l.target.closest('[data-action="select-item"]'),c=l.target.closest('[data-action="close-selection-modal"]');if(d){const{itemType:m,itemId:g}=d.dataset,h=(Se.catalogForModal[m+"s"]||[]).find(v=>v.id===g);h&&(e({...h,type:m}),i())}else(c||l.target===a)&&i()})}async function ja(){aa.innerHTML=`
        <section id="packages-page" class="p-4 sm:p-6">
             <div class="sticky top-0 z-10 bg-gray-100 sm:bg-transparent pt-3 pb-4 mb-6 -mx-4 -mt-4 sm:mx-0 sm:mt-0 sm:bg-transparent sm:pt-0 sm:pb-0 sm:static">
                <div class="flex justify-between items-center px-4 sm:px-0">
                    <h2 class="text-2xl sm:text-3xl font-bold text-gray-800">Pacotes de Serviços</h2>
                </div>
            </div>
            
            <div id="packagesListContainer" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pb-20">
                ${dd()}
            </div>
            
            <button data-action="new-package" class="fixed z-30 bottom-20 right-4 sm:bottom-6 sm:right-6 w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-transform hover:scale-105">
                <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
            </button>
        </section>
    `,xt&&aa.removeEventListener("click",xt),xt=e=>{if(e.target.closest('[data-action-stop-propagation="true"]')){e.stopPropagation();const s=e.target.closest('[data-action="delete-package"]');if(s){const r=s.dataset.id;z("Excluir Pacote","Tem a certeza que deseja excluir este pacote? Esta ação é irreversível.").then(async o=>{if(o)try{await gn(r),p("Sucesso!","Pacote excluído.","success"),await ja()}catch(n){p("Erro",`Não foi possível excluir: ${n.message}`,"error")}})}return}const t=e.target.closest('[data-action="new-package"], [data-action="edit-package"]');if(!t)return;const a=t.dataset.action;if(a==="new-package")Eo(null);else if(a==="edit-package"){const s=JSON.parse(t.dataset.package);Eo(s)}},aa.addEventListener("click",xt);try{const[e,t,a]=await Promise.all([Ca(u.establishmentId),be(u.establishmentId),lt(u.establishmentId)]);Se.allPackages=e,Se.catalogForModal={services:t.filter(s=>s.active),products:a},cd()}catch{document.getElementById("packagesListContainer").innerHTML='<p class="text-red-500 col-span-full">Erro ao carregar pacotes.</p>'}}const md=document.getElementById("content");let pd=null;async function gd(){const e=f(u.userName||"Usuário"),t=f(_.currentUser?.email||"E-mail não disponível"),a=u.userName?u.userName.charAt(0):"U";md.innerHTML=`
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
    `,await bd()}async function bd(){const e=document.getElementById("professional-agenda-block");e.innerHTML="";try{const t=u.userProfessionalId;if(t){const a=await sr(t);pd=a,a.photo&&(document.getElementById("user-profile-avatar").src=a.photo);const s=f(a.name);e.innerHTML=`
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
            `,fd(a.id),document.getElementById("my-blocks-filter").addEventListener("change",o=>Rt(a.id,o.target.value)),Rt(a.id,"future")}else e.innerHTML=`
                <div class="bg-gray-100 p-4 rounded-lg text-center text-gray-600">
                    <p>Você não possui um perfil de profissional associado a esta conta.</p>
                    <p class="text-sm mt-2">Para gerenciar sua agenda, peça ao administrador para associar seu usuário a um profissional existente na tela de "Usuários".</p>
                </div>
            `}catch(t){console.error("Erro ao carregar seção de profissional:",t),e.innerHTML=`
            <div class="bg-red-100 p-4 rounded-lg text-red-700">
                <p>Ocorreu um erro ao carregar os dados do profissional.</p>
                <p class="text-sm mt-2">${f(t.message)}</p>
            </div>
        `}}function fd(e){const t=document.getElementById("block-schedule-form");t.addEventListener("submit",async a=>{a.preventDefault();const s=t.querySelector("#blockDate").value,r=t.querySelector("#blockStartTime").value,o=t.querySelector("#blockEndTime").value,n=t.querySelector("#blockReason").value;if(!s||!r||!o){p("Erro","Por favor, preencha a data e os horários de início e fim.","error");return}if(r>=o){p("Erro","A hora de início deve ser anterior à hora de fim.","error");return}const i=new Date(`${s}T${r}:00`),l=new Date(`${s}T${o}:00`),d=t.querySelector('button[type="submit"]');d.disabled=!0,d.textContent="A bloquear...";try{await zt({establishmentId:u.establishmentId,professionalId:e,reason:n||"Bloqueado (Meu Perfil)",startTime:i.toISOString(),endTime:l.toISOString()}),p("Sucesso","Agenda bloqueada com sucesso!","success"),t.reset();const c=document.getElementById("my-blocks-filter").value;Rt(e,c)}catch(c){console.error("Erro ao bloquear agenda:",c),p("Erro",`Não foi possível bloquear a agenda: ${c.message}`,"error")}finally{d.disabled=!1,d.textContent="Bloquear Agenda"}})}async function Rt(e,t="future"){const a=document.getElementById("my-blocks-list");a.innerHTML='<p class="text-gray-500">A carregar bloqueios...</p>';try{const s=new Date;let r,o;t==="history"?(o=new Date,r=new Date,r.setFullYear(r.getFullYear()-1)):(r=new Date,o=new Date,o.setFullYear(o.getFullYear()+1));let i=(await Ot(u.establishmentId,r.toISOString(),o.toISOString(),e)).map(l=>({...l,startTime:new Date(l.startTime),endTime:new Date(l.endTime)}));t==="history"?i=i.filter(l=>l.endTime<s).sort((l,d)=>d.startTime-l.startTime):i=i.filter(l=>l.endTime>=s).sort((l,d)=>l.startTime-d.startTime),i.length>0?(a.innerHTML=i.map(l=>{const d=l.startTime.toLocaleDateString("pt-BR"),c=`${l.startTime.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})} - ${l.endTime.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}`,m=l.endTime<new Date,g=f(l.reason||"Sem motivo");return`
                    <div class="flex items-center justify-between p-3 ${m?"bg-gray-100 opacity-75":"bg-white border border-gray-200"} rounded-md shadow-sm">
                        <div>
                            <p class="font-semibold text-gray-800">${d} das ${c}</p>
                            <p class="text-sm text-gray-600">${g}</p>
                        </div>
                        <button data-block-id="${l.id}" class="remove-block-btn text-red-500 hover:text-red-700 text-2xl font-bold leading-none p-1" title="Apagar bloqueio">
                            &times;
                        </button>
                    </div>
                `}).join(""),a.querySelectorAll(".remove-block-btn").forEach(l=>{l.addEventListener("click",async d=>{const c=d.currentTarget.dataset.blockId;if(confirm("Tem certeza que deseja remover este bloqueio?"))try{await ka(c),p("Sucesso","Bloqueio removido.","success"),Rt(e,t)}catch(m){console.error("Erro ao remover bloqueio:",m),p("Erro",`Não foi possível remover o bloqueio: ${m.message}`,"error")}})})):a.innerHTML=`<p class="text-gray-500 py-4 text-center">Nenhum bloqueio ${t==="history"?"no histórico recente":"futuro agendado"}.</p>`}catch(s){console.error("Erro ao carregar bloqueios:",s),a.innerHTML=`<p class="text-red-500">Erro ao carregar bloqueios: ${f(s.message)}</p>`}}document.addEventListener("DOMContentLoaded",()=>{document.addEventListener("gesturestart",function(t){t.preventDefault()}),document.addEventListener("gesturechange",function(t){t.preventDefault()}),document.addEventListener("gestureend",function(t){t.preventDefault()});let e=0;document.addEventListener("touchend",function(t){const a=new Date().getTime();a-e<=300&&t.preventDefault(),e=a},!1)});const yt=document.getElementById("loadingScreen"),oa=document.getElementById("dashboardContent"),sa=document.getElementById("content"),Io=document.getElementById("notificationBell"),ra=document.getElementById("notificationBadge"),wt=document.getElementById("notificationPanel"),Co=document.getElementById("notificationList"),na=document.getElementById("profileMenuButton"),te=document.getElementById("profileDropdown"),vd=document.getElementById("profileName"),hd=document.getElementById("profileEmail"),xd=document.getElementById("logoutButton"),Lo=document.getElementById("myProfileLink"),To=document.getElementById("hamburger-menu-btn"),we=document.getElementById("sidebar"),Me=document.getElementById("mobile-overlay"),Po={indigo:{main:"#4f46e5",hover:"#4338ca",light:"#e0e7ff",text:"#ffffff"},blue:{main:"#2563eb",hover:"#1d4ed8",light:"#dbeafe",text:"#ffffff"},sky:{main:"#0284c7",hover:"#0369a1",light:"#e0f2fe",text:"#ffffff"},teal:{main:"#0d9488",hover:"#0f766e",light:"#ccfbf1",text:"#ffffff"},emerald:{main:"#059669",hover:"#047857",light:"#d1fae5",text:"#ffffff"},green:{main:"#16a34a",hover:"#15803d",light:"#dcfce7",text:"#ffffff"},lime:{main:"#65a30d",hover:"#4d7c0f",light:"#ecfccb",text:"#ffffff"},amber:{main:"#d97706",hover:"#b45309",light:"#fef3c7",text:"#1f2937"},orange:{main:"#ea580c",hover:"#c2410c",light:"#ffedd5",text:"#ffffff"},red:{main:"#dc2626",hover:"#b91c1c",light:"#fee2e2",text:"#ffffff"},rose:{main:"#e11d48",hover:"#be123c",light:"#ffe4e6",text:"#ffffff"},pink:{main:"#db2777",hover:"#be185d",light:"#fce7f3",text:"#ffffff"},fuchsia:{main:"#c026d3",hover:"#a21caf",light:"#fae8ff",text:"#ffffff"},purple:{main:"#7c3aed",hover:"#6d28d9",light:"#ede9fe",text:"#ffffff"},violet:{main:"#8b5cf6",hover:"#7c3aed",light:"#ddd6fe",text:"#ffffff"},gray:{main:"#4b5563",hover:"#374151",light:"#f3f4f6",text:"#ffffff"},black:{main:"#111827",hover:"#000000",light:"#e5e7eb",text:"#ffffff"}};let ot=null,st=[];const yd={"agenda-section":os,"comandas-section":Pn,"relatorios-section":Jn,"servicos-section":di,"produtos-section":$i,"suppliers-section":Mi,"profissionais-section":Dt,"clientes-section":Zi,"estabelecimento-section":$s,"ausencias-section":fl,"users-section":Mt,"sales-report-section":Dl,"financial-section":Nl,"commissions-section":Ql,"packages-section":ja,"my-profile-section":gd};function wd(e){const t=Po[e]||Po.indigo,s=(o=>{const n=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(o);return n?`${parseInt(n[1],16)}, ${parseInt(n[2],16)}, ${parseInt(n[3],16)}`:"79, 70, 229"})(t.main);document.body.style.setProperty("--theme-main",t.main);const r=document.getElementById("dynamic-theme-styles");r.innerHTML=`
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
    `}function va(){const e=st.filter(t=>!t.read).length;if(e>0?(ra.textContent=e,ra.classList.remove("hidden")):ra.classList.add("hidden"),st.length===0){Co.innerHTML='<p class="text-center text-gray-500 p-4">Nenhuma notificação.</p>';return}Co.innerHTML=st.map(t=>`
    <div class="notification-item ${t.read?"":"unread"}">
    <p class="font-semibold">${t.title}</p>
    <p class="text-sm text-gray-600">${t.message}</p>
    <p class="text-xs text-gray-400 mt-1">${t.time}</p>
    </div>
    `).join("")}function kd(e){ot&&ot();const t=ge(W,"establishments",e,"notifications"),a=jt(t,rt("timestamp",">=",new Date),Ao("timestamp","desc"));ot=Fs(a,s=>{s.docChanges().forEach(r=>{if(r.type==="added"){const o=r.doc.data();st.unshift({title:o.title,message:o.message,time:o.timestamp.toDate().toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),read:!1}),p(o.title,o.message,"info",!0),va();const n=document.querySelector(".sidebar-link.active");n&&n.dataset.target==="agenda-section"&&(o.type==="cancellation"||o.type==="new_appointment")&&(console.log("Atualizando agenda em tempo real..."),os())}})},s=>{console.error("Erro no listener de notificações em tempo real:",s)})}function Z(e,t={}){const a=e.replace("-section","");if(e!=="my-profile-section"){const r=u.enabledModules?.[a]!==!1,o=u.userPermissions===null||u.userPermissions[e]?.view===!0;if(!r||!o){sa.innerHTML='<div class="p-8 text-center"><h2 class="text-2xl font-bold text-red-600">Acesso Negado</h2><p class="text-gray-600">Você não tem permissão para visualizar este módulo.</p></div>',document.querySelectorAll(".sidebar-link").forEach(n=>n.classList.remove("active")),we.classList.contains("absolute")&&(we.classList.add("hidden"),Me.classList.add("hidden"));return}}const s=yd[e];s?(document.querySelectorAll(".sidebar-link").forEach(r=>{r.classList.toggle("active",r.getAttribute("data-target")===e)}),e==="my-profile-section"&&document.querySelectorAll(".sidebar-link").forEach(r=>r.classList.remove("active")),sa.innerHTML="",window.innerWidth<768&&(we.classList.add("hidden"),Me.classList.add("hidden")),s(t)):sa.innerHTML=`<div class="p-8 text-center"><h2 class="text-2xl font-bold">Página em Construção</h2><p class="text-gray-600">O módulo para "${e}" ainda não foi implementado.</p></div>`}async function Sd(e){const t=document.getElementById("kpi-appointments-wrapper"),a=document.getElementById("kpi-financial-wrapper"),s=document.getElementById("kpi-today-appointments"),r=document.getElementById("kpi-today-revenue"),o=e===null||e["agenda-section"]?.view===!0,n=e===null||e["financial-section"]?.view===!0;if(o&&t&&(t.classList.remove("hidden"),t.classList.add("inline-flex")),n&&a&&(a.classList.remove("hidden"),a.classList.add("inline-flex")),!(!o&&!n))try{const i=await Ar();o&&s&&(s.textContent=i.todayAppointments.toString()),n&&r&&(r.textContent=`R$ ${i.todayRevenue.toFixed(2).replace(".",",")}`)}catch(i){console.error("Erro ao carregar KPIs do cabeçalho:",i)}}async function $d(e){try{console.log("[Nativo] Iniciando configuração de Push..."),oe.getPlatform()==="android"&&(await Y.createChannel({id:"default",name:"Notificações Gerais",description:"Alertas de agendamentos e avisos",importance:5,visibility:1,vibration:!0}),console.log("Canal Android criado."));let t=await Y.checkPermissions();if(t.receive==="prompt"&&(t=await Y.requestPermissions()),t.receive!=="granted")return;await Y.register(),Y.addListener("registration",async a=>{console.log("Push Token gerado:",a.value);try{const s=pe(W,"users",e);await ha(s,{fcmTokens:js(a.value),platform:"native_mobile"}),console.log("Token FCM salvo no perfil do utilizador (Nativo).")}catch(s){console.error("Erro ao salvar token FCM:",s)}}),Y.addListener("registrationError",a=>{console.error("Erro no registo de push notifications:",a)}),Y.addListener("pushNotificationReceived",a=>{console.log("Notificação Push recebida:",a),p(a.title,a.body,"info",!0)}),Y.addListener("pushNotificationActionPerformed",a=>{console.log("Ação na notificação push:",a),Z("agenda-section")})}catch(t){console.log("Push Notifications não suportado/inicializado:",t)}}function Ed(){const e=document.getElementById("exitConfirmationModal"),t=document.getElementById("btn-cancel-exit"),a=document.getElementById("btn-confirm-exit"),s=()=>e.style.display="block",r=()=>e.style.display="none",o=()=>e.style.display==="block";e&&(t.addEventListener("click",()=>{r(),oe.isNativePlatform()||history.pushState(null,document.title,location.href)}),a.addEventListener("click",()=>{r(),oe.isNativePlatform()?Xa.exitApp():history.back()}),oe.isNativePlatform()?Xa.addListener("backButton",({canGoBack:n})=>{if(o())r();else{const i=document.querySelectorAll('.modal[style*="display: block"]'),l=Array.from(i).filter(m=>m.id!=="exitConfirmationModal");if(l.length>0){l.forEach(m=>m.style.display="none");return}const d=document.getElementById("sidebar");if(d&&!d.classList.contains("hidden")&&window.innerWidth<768){d.classList.add("hidden"),document.getElementById("mobile-overlay").classList.add("hidden");return}const c=document.querySelector(".sidebar-link.active");c&&c.getAttribute("data-target")==="agenda-section"?s():Z("agenda-section")}}):(history.pushState(null,document.title,location.href),window.addEventListener("popstate",n=>{if(o()){r(),history.pushState(null,document.title,location.href);return}const i=document.querySelectorAll('.modal[style*="display: block"], .modal[style*="display: flex"]'),l=Array.from(i).filter(c=>c.id!=="exitConfirmationModal");if(l.length>0){l.forEach(c=>c.style.display="none"),history.pushState(null,document.title,location.href);return}const d=document.querySelector(".sidebar-link.active");d&&d.getAttribute("data-target")==="agenda-section"?s():(Z("agenda-section"),history.pushState(null,document.title,location.href))})))}async function Id(){try{await As(_,qs),console.log("Persistência LOCAL configurada na inicialização.")}catch(e){console.error("Erro ao definir persistência no main.js",e)}oe.isNativePlatform()&&(document.body.classList.add("is-app-native"),console.log("Modo App Nativo detectado: Layout ajustado para Safe Areas.")),Xs(),Ed(),To&&To.addEventListener("click",e=>{e.stopPropagation(),we.classList.remove("hidden"),we.classList.add("absolute","inset-y-0","left-0","z-40","shadow-xl"),Me.classList.remove("hidden")}),Me&&Me.addEventListener("click",()=>{we.classList.add("hidden"),we.classList.remove("absolute","inset-y-0","left-0","z-40","shadow-xl"),Me.classList.add("hidden")}),Io.addEventListener("click",e=>{e.stopPropagation(),wt.classList.toggle("hidden"),wt.classList.contains("hidden")||(st.forEach(t=>t.read=!0),va())}),na.addEventListener("click",e=>{e.stopPropagation(),te.classList.toggle("active"),te.classList.contains("active")?te.classList.remove("hidden"):setTimeout(()=>te.classList.add("hidden"),200)}),Lo&&Lo.addEventListener("click",e=>{e.preventDefault(),Z("my-profile-section"),te.classList.remove("active"),te.classList.add("hidden")}),document.addEventListener("click",e=>{!wt.contains(e.target)&&e.target!==Io&&wt.classList.add("hidden"),!te.contains(e.target)&&e.target!==na&&te.classList.contains("active")&&(te.classList.remove("active"),setTimeout(()=>te.classList.add("hidden"),200))}),Bo(_,async e=>{if(e){if(console.log("Usuário detectado:",e.email),!oe.isNativePlatform()&&(console.log("Inicializando Web Push (PWA)..."),Vo(),"Notification"in window&&Notification.permission==="default")){const t=document.getElementById("toast-notification-request"),a=document.getElementById("btn-enable-toast"),s=document.getElementById("btn-deny-toast"),r=document.getElementById("btn-close-toast");setTimeout(()=>{t&&(t.style.display="block")},3500),a&&a.addEventListener("click",async()=>{await Uo()&&t&&(t.style.display="none")});const o=()=>{t&&(t.style.display="none")};s&&s.addEventListener("click",o),r&&r.addEventListener("click",o)}try{const a=(await e.getIdTokenResult(!0)).claims;if((a.role==="owner"||a.role==="employee")&&a.establishmentId){const s=await Ee(a.establishmentId);u.enabledModules=s.modules,wd(s.themeColor||"indigo");let r=null,o=e.displayName,n=null;if(a.role==="employee"||a.role==="owner"){const d=pe(W,"users",e.uid),c=await Do(d);if(c.exists()){const m=c.data();r=a.role==="employee"?m.permissions||{}:null,o=m.name||o,n=m.professionalId||null}else if(a.role==="employee")throw new Error("Dados de permissão do funcionário não encontrados.")}u.userProfessionalId=n,oe.isNativePlatform()&&$d(e.uid);const i=o||e.email;zs(a.establishmentId,s.name,r),na.textContent=i.charAt(0).toUpperCase(),vd.textContent=i,hd.textContent=e.email;const l=()=>{ot&&ot(),Ha(_).then(()=>window.location.href="/login.html")};xd.addEventListener("click",d=>{d.preventDefault(),l()}),tr(Z,r,u.enabledModules),Sd(r),kd(a.establishmentId),va(),yt.classList.add("fade-out"),oa.style.display="flex",setTimeout(()=>{yt.style.display="none"},500),console.log("Verificando Onboarding..."),setTimeout(()=>{br()},1500),Z("agenda-section")}else throw new Error("Utilizador não tem permissão de 'owner' ou 'employee' ou 'establishmentId'.")}catch(t){console.error("Erro crítico na inicialização do painel:",t),yt.classList.add("fade-out"),setTimeout(()=>{yt.style.display="none"},500),oa.innerHTML=`
                    <div class="w-full h-full flex flex-col items-center justify-center bg-gray-100 p-4">
                        <h2 class="text-2xl font-bold text-red-600 mb-4">Erro de Acesso</h2>
                        <p class="text-gray-700 text-center mb-6">Não foi possível carregar os seus dados ou permissões. Isto pode acontecer se a sua conta foi desativada ou está configurada incorretamente.</p>
                        <p class="text-sm text-gray-500 mb-6">Detalhe do erro: ${t.message}</p>
                        <button id="errorLogoutButton" class="bg-red-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-red-700">Sair e Tentar Novamente</button>
                    </div>
                `,oa.style.display="flex",document.getElementById("errorLogoutButton").addEventListener("click",()=>{Ha(_).then(()=>window.location.href="/login.html")})}}else window.location.href="/login.html"})}Id();Bo(_,async e=>{if(e){await Vo();const a="Notification"in window&&Notification.permission==="default",s=window.Capacitor&&window.Capacitor.isNativePlatform();if(a&&!s){const r=document.getElementById("toast-notification-request"),o=document.getElementById("btn-enable-toast"),n=document.getElementById("btn-deny-toast"),i=document.getElementById("btn-close-toast");setTimeout(()=>{r&&(r.style.display="block")},3500),o&&o.addEventListener("click",async()=>{await Uo()&&r&&(r.style.display="none")});const l=()=>{r&&(r.style.display="none")};n&&n.addEventListener("click",l),i&&i.addEventListener("click",l)}}});export{zo as W};
