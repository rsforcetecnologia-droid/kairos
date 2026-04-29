import"./modulepreload-polyfill-B5Qt9EMX.js";import{a as y}from"./firebase-config-seH-87Om.js";import{onAuthStateChanged as N,signOut as B}from"https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";import{a as p,b as d,e as b,s as k,c as q}from"./utils-DTVAHnIk.js";import"https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";import"https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";import"https://www.gstatic.com/firebasejs/11.6.1/firebase-storage.js";import"https://www.gstatic.com/firebasejs/11.6.1/firebase-messaging.js";const A={super_admin:["dashboard","establishments","whatsapp","financial","team","settings"],support:["establishments","whatsapp"],financial:["dashboard","establishments","financial"],developer:["whatsapp","settings"]};let v=null;function R(){document.body.style.display="none",N(y,async e=>{if(e)try{let t=(await e.getIdTokenResult()).claims.role;t==="super-admin"&&(t="super_admin"),t&&A[t]?(v=t,console.log("🛡️ Acesso Seguro Concedido! Perfil:",v),O(v),document.body.style.display="flex"):(console.error("🚨 Intruso detectado: Conta sem cargo de gestão."),await B(y),window.location.href="admin-login.html")}catch(s){console.error("Erro ao verificar permissões de segurança:",s),window.location.href="admin-login.html"}else window.location.href="admin-login.html"})}function O(e){const s=A[e]||[];document.querySelectorAll("[data-module]").forEach(a=>{const l=a.getAttribute("data-module");s.includes(l)||a.remove()})}async function z(){try{await B(y),window.location.href="admin-login.html"}catch(e){console.error("Erro ao sair do sistema:",e)}}const F=e=>new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(e||0);async function U(e){e.innerHTML=`
        <div class="flex flex-col items-center justify-center h-full text-slate-400">
            <div class="loader mb-4"></div>
            <p class="font-medium text-sm animate-pulse">A carregar métricas do SaaS...</p>
        </div>
    `;try{const s=await p("/api/admin/dashboard-stats");if(!s||!s.kpis)throw new Error("Dados de KPIs não retornados pela API.");const{kpis:t}=s,a=Math.max(...t.newSubscribersData,1),l=t.newSubscribersData.map(o=>`
                <div class="group relative flex-1 flex items-end justify-center h-full">
                    <div class="w-full bg-brand-200 hover:bg-brand-500 transition-colors rounded-t-sm" style="height: ${o/a*100}%"></div>
                    <div class="opacity-0 group-hover:opacity-100 absolute -top-8 bg-slate-800 text-white text-[10px] py-1 px-2 rounded font-bold transition-opacity whitespace-nowrap z-10 pointer-events-none">
                        ${o} novos
                    </div>
                </div>
            `).join("");e.innerHTML=`
            <div class="max-w-7xl mx-auto animate-fade-in space-y-6 pb-12">
                
                <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-6">
                    <div>
                        <h2 class="text-2xl font-black text-slate-800 tracking-tight">Visão Executiva SaaS</h2>
                        <p class="text-sm text-slate-500 font-medium mt-1">Acompanhe a saúde financeira e o crescimento da sua plataforma.</p>
                    </div>
                    <button onclick="location.reload()" class="bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-50 shadow-sm transition-all active:scale-95 flex items-center gap-2">
                        <i class="bi bi-arrow-clockwise text-sm"></i> Atualizar Dados
                    </button>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
                    
                    <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group hover:border-emerald-300 transition-colors">
                        <div class="absolute -right-6 -top-6 opacity-5 group-hover:opacity-10 transition-opacity">
                            <i class="bi bi-cash-stack text-9xl text-emerald-500"></i>
                        </div>
                        <div class="flex items-center gap-3 mb-3 relative z-10">
                            <div class="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shadow-inner">
                                <i class="bi bi-graph-up-arrow text-lg"></i>
                            </div>
                            <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-tight">Receita<br>Recorrente (MRR)</span>
                        </div>
                        <h3 class="text-3xl font-black text-slate-800 relative z-10 tracking-tight">${F(t.mrr)}</h3>
                    </div>

                    <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group hover:border-brand-300 transition-colors">
                        <div class="absolute -right-6 -top-6 opacity-5 group-hover:opacity-10 transition-opacity">
                            <i class="bi bi-buildings text-9xl text-brand-500"></i>
                        </div>
                        <div class="flex items-center gap-3 mb-3 relative z-10">
                            <div class="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center border border-brand-100 shadow-inner">
                                <i class="bi bi-check-circle-fill text-lg"></i>
                            </div>
                            <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-tight">Assinaturas<br>Ativas</span>
                        </div>
                        <h3 class="text-3xl font-black text-slate-800 relative z-10 tracking-tight">${t.activeUsers}</h3>
                    </div>

                    <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group hover:border-slate-300 transition-colors">
                        <div class="absolute -right-6 -top-6 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
                            <i class="bi bi-hdd-network text-9xl text-slate-500"></i>
                        </div>
                        <div class="flex items-center gap-3 mb-3 relative z-10">
                            <div class="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center border border-slate-200 shadow-inner">
                                <i class="bi bi-database-fill text-lg"></i>
                            </div>
                            <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-tight">Total<br>Cadastrados</span>
                        </div>
                        <h3 class="text-3xl font-black text-slate-800 relative z-10 tracking-tight">${t.totalUsers}</h3>
                    </div>

                    <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group hover:border-rose-300 transition-colors">
                        <div class="absolute -right-6 -top-6 opacity-5 group-hover:opacity-10 transition-opacity">
                            <i class="bi bi-pie-chart-fill text-9xl text-rose-500"></i>
                        </div>
                        <div class="flex items-center gap-3 mb-3 relative z-10">
                            <div class="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100 shadow-inner">
                                <i class="bi bi-exclamation-triangle-fill text-lg"></i>
                            </div>
                            <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-tight">Taxa de<br>Cancelamento</span>
                        </div>
                        <h3 class="text-3xl font-black text-rose-600 relative z-10 tracking-tight">${t.churnRate}%</h3>
                    </div>

                </div>

                <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
                    
                    <div class="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
                        <div class="flex justify-between items-center mb-6">
                            <div>
                                <h3 class="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                                    <i class="bi bi-bar-chart-fill text-brand-500"></i> Novos Assinantes
                                </h3>
                                <p class="text-xs text-slate-400 mt-1">Crescimento diário nos últimos 30 dias.</p>
                            </div>
                            <div class="bg-brand-50 text-brand-700 text-xl font-black px-4 py-2 rounded-xl shadow-inner border border-brand-100">
                                +${t.newSubscribersData.reduce((o,n)=>o+n,0)}
                            </div>
                        </div>
                        
                        <div class="flex-1 min-h-[160px] flex items-end gap-1 pb-2 pt-8 border-b border-slate-100">
                            ${l}
                        </div>
                        <div class="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-3">
                            <span>Há 30 dias</span>
                            <span>Hoje</span>
                        </div>
                    </div>

                    <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <h3 class="text-sm font-bold text-slate-800 uppercase tracking-wider mb-5 flex items-center gap-2">
                            <i class="bi bi-lightning-charge-fill text-amber-400"></i> Acções Rápidas
                        </h3>
                        
                        <div class="space-y-3">
                            <a href="#establishments" class="block w-full text-left p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-brand-50 hover:border-brand-200 transition-colors group">
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center gap-3">
                                        <div class="w-8 h-8 rounded-lg bg-white text-brand-600 flex items-center justify-center shadow-sm border border-slate-200 group-hover:border-brand-300">
                                            <i class="bi bi-building-add"></i>
                                        </div>
                                        <span class="font-bold text-sm text-slate-700 group-hover:text-brand-700">Novo Inquilino (Rede)</span>
                                    </div>
                                    <i class="bi bi-chevron-right text-slate-400"></i>
                                </div>
                            </a>
                            
                            <a href="#financial" class="block w-full text-left p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-200 transition-colors group">
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center gap-3">
                                        <div class="w-8 h-8 rounded-lg bg-white text-emerald-600 flex items-center justify-center shadow-sm border border-slate-200 group-hover:border-emerald-300">
                                            <i class="bi bi-tags-fill"></i>
                                        </div>
                                        <span class="font-bold text-sm text-slate-700 group-hover:text-emerald-700">Gerir Planos SaaS</span>
                                    </div>
                                    <i class="bi bi-chevron-right text-slate-400"></i>
                                </div>
                            </a>

                            <div class="pt-4 mt-4 border-t border-slate-100">
                                <div class="bg-indigo-50 border border-indigo-100 rounded-xl p-4 flex gap-3">
                                    <i class="bi bi-info-circle-fill text-indigo-500 mt-0.5"></i>
                                    <div>
                                        <p class="text-xs font-bold text-indigo-900">Modo de Suporte</p>
                                        <p class="text-[10px] text-indigo-700 mt-1 font-medium leading-tight">Vá à secção "Clientes (Redes)", selecione um inquilino e clique em "Assumir Identidade" para prestar suporte.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        `}catch(s){console.error("Erro ao carregar os dados do Dashboard:",s),e.innerHTML=`
            <div class="flex flex-col items-center justify-center h-full text-slate-500 p-6">
                <i class="bi bi-exclamation-triangle text-5xl mb-4 text-rose-400"></i>
                <h3 class="font-bold text-lg text-slate-700">Falha ao Sincronizar</h3>
                <p class="font-medium text-sm mt-1 max-w-md text-center">Não foi possível carregar as métricas do SaaS. Verifique se o utilizador atual possui privilégios de Super Admin.</p>
                <button onclick="location.reload()" class="mt-6 px-6 py-2.5 bg-brand-600 text-white rounded-xl text-sm font-semibold hover:bg-brand-700 transition-colors shadow-sm active:scale-95">Tentar Novamente</button>
            </div>
        `}}let r={tenants:[],plans:[],payments:[],searchQuery:"",currentPage:1,limit:20,totalPages:1,activeTab:"cadastro"},h=null;async function _(e){V(e),ae(e),await Promise.all([J(),m()])}function V(e){e.innerHTML=`
        <div class="h-full flex flex-col w-full relative font-sans animate-fade-in pb-12">
            
            <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                    <h2 class="text-2xl font-black text-slate-800 tracking-tight">Clientes (SaaS CRM)</h2>
                    <p class="text-sm text-slate-500 font-medium mt-1">Gira cadastros, planos, faturas e bloqueios dos seus clientes.</p>
                </div>
                <button id="btn-open-create-modal" class="bg-brand-600 text-white px-5 py-3 rounded-xl font-bold text-sm hover:bg-brand-700 shadow-md shadow-brand-500/30 active:scale-95 transition-all flex items-center gap-2">
                    <i class="bi bi-building-add text-lg"></i> Novo Cliente
                </button>
            </div>

            <div class="bg-white p-2 rounded-2xl shadow-sm border border-slate-200 mb-4 flex items-center">
                <i class="bi bi-search text-slate-400 ml-3 text-lg"></i>
                <input type="text" id="search-tenant-input" placeholder="Pesquisar por nome da empresa, CNPJ/CPF ou email..." class="w-full bg-transparent border-none p-3 outline-none text-sm font-bold text-slate-700 placeholder-slate-400">
                <div class="border-l border-slate-200 pl-2 ml-2">
                    <button id="btn-refresh-table" class="w-10 h-10 flex items-center justify-center rounded-xl text-slate-400 hover:text-brand-600 hover:bg-brand-50 transition-colors" title="Atualizar">
                        <i class="bi bi-arrow-clockwise text-lg"></i>
                    </button>
                </div>
            </div>

            <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex-1 flex flex-col min-h-0">
                <div class="overflow-x-auto flex-1 custom-scrollbar">
                    <table class="w-full text-left border-collapse whitespace-nowrap">
                        <thead class="bg-slate-50 border-b border-slate-200 sticky top-0 z-10">
                            <tr>
                                <th class="p-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Empresa / Rede</th>
                                <th class="p-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Acesso Master</th>
                                <th class="p-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">Assinatura SaaS</th>
                                <th class="p-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">Status</th>
                                <th class="p-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody id="tenants-table-body" class="divide-y divide-slate-100">
                            <tr><td colspan="5" class="py-16 text-center text-slate-400"><div class="loader mx-auto mb-3 border-brand-500"></div></td></tr>
                        </tbody>
                    </table>
                </div>
                <div id="pagination-container" class="bg-slate-50 border-t border-slate-200 p-3 flex justify-between items-center px-6"></div>
            </div>

            <div id="slide-panel-overlay" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 hidden opacity-0 transition-opacity duration-300"></div>

            <div id="slide-panel" class="fixed inset-0 z-50 hidden items-center justify-center p-4 sm:p-6 pointer-events-none">
                
                <div id="modal-container" class="w-full max-w-4xl bg-slate-50 rounded-3xl shadow-2xl flex flex-col max-h-[95vh] overflow-hidden transform scale-95 opacity-0 transition-all duration-300 pointer-events-auto">
                    
                    <div class="px-6 py-5 border-b border-slate-200 bg-white flex justify-between items-center shadow-sm z-20 flex-shrink-0">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center text-xl border border-brand-100">
                                <i class="bi bi-briefcase-fill"></i>
                            </div>
                            <div>
                                <h3 id="panel-title" class="text-xl font-black text-slate-800 tracking-tight">Painel</h3>
                                <p id="panel-subtitle" class="text-[10px] font-bold text-brand-600 uppercase tracking-widest mt-0.5">Gestão de Cliente SaaS</p>
                            </div>
                        </div>
                        <button id="btn-close-panel" class="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-rose-50 hover:text-rose-600 transition-colors active:scale-95 shadow-inner">
                            <i class="bi bi-x-lg"></i>
                        </button>
                    </div>
                    
                    <div id="panel-tabs-container" class="hidden bg-white border-b border-slate-200 px-6 pt-2 flex gap-6 overflow-x-auto custom-scrollbar flex-shrink-0 z-10 shadow-sm">
                        <button data-tab="cadastro" class="panel-tab text-xs font-bold py-3 border-b-2 border-brand-600 text-brand-600 whitespace-nowrap">Cadastro Completo</button>
                        <button data-tab="history" class="panel-tab text-xs font-bold py-3 border-b-2 border-transparent text-slate-500 hover:text-slate-800 whitespace-nowrap">Histórico de Pagamentos</button>
                    </div>

                    <div id="panel-content" class="flex-1 overflow-y-auto p-5 md:p-8 custom-scrollbar space-y-6 relative bg-slate-50"></div>
                    
                    <div id="panel-footer" class="p-5 border-t border-slate-200 bg-white flex gap-3 justify-end shadow-[0_-10px_20px_-3px_rgba(0,0,0,0.05)] z-20 flex-shrink-0"></div>
                </div>
            </div>
        </div>
    `}async function J(){try{r.plans=await p("/api/admin/plans")||[]}catch{d("Erro","Falha ao carregar os planos.","error")}}async function m(){const e=document.getElementById("tenants-table-body"),s=document.getElementById("pagination-container");e&&(e.innerHTML='<tr><td colspan="5" class="py-12 text-center"><div class="loader mx-auto mb-2 border-brand-500"></div></td></tr>');try{let t=`/api/admin/tenants?page=${r.currentPage}&limit=${r.limit}`;r.searchQuery&&(t+=`&search=${encodeURIComponent(r.searchQuery)}`);const a=await p(t);r.tenants=(a.data||[]).filter(l=>l.status!=="deleted"),r.totalPages=a.pagination.totalPages||1,T(),Q(s)}catch{e&&(e.innerHTML='<tr><td colspan="5" class="py-12 text-center text-rose-500">Erro ao carregar clientes.</td></tr>')}}async function C(e){try{const s=await p(`/api/admin/tenants/${e}/payments`);r.payments=s||[],W(e)}catch{document.getElementById("payments-wrapper").innerHTML='<p class="text-rose-500 text-xs font-bold text-center mt-4">Erro ao carregar pagamentos.</p>'}}function j(e){if(!e)return"-";try{const[s,t,a]=e.split("T")[0].split("-");return`${a}/${t}/${s}`}catch{return e}}function T(){const e=document.getElementById("tenants-table-body");if(!e)return;if(r.tenants.length===0){e.innerHTML='<tr><td colspan="5" class="py-16 text-center text-slate-400">Nenhum cliente encontrado.</td></tr>';return}const s=new Map(r.plans.map(a=>[a.id,a.name])),t=r.tenants.map(a=>{const l=a.status==="inactive"||a.status==="blocked",o=s.get(a.planId)||"Não Definido",n=a.nextDueDate?j(a.nextDueDate):"-",i=a.lastPaymentStatus==="overdue"?'<span class="text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded ml-1 border border-rose-100"><i class="bi bi-exclamation-circle text-[8px]"></i> Atrasado</span>':'<span class="text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded ml-1 border border-emerald-100">Em dia</span>';return`
            <tr class="hover:bg-slate-50 transition-colors group cursor-pointer border-b border-slate-100" data-action="view-tenant" data-id="${a.id}">
                <td class="p-4">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-lg ${a.isNetwork?"bg-indigo-50 text-indigo-500 border-indigo-100":"bg-white text-slate-500 border-slate-200"} flex items-center justify-center border shadow-sm">
                            <i class="bi ${a.isNetwork?"bi-diagram-3-fill":"bi-shop"}"></i>
                        </div>
                        <div>
                            <p class="text-sm font-bold text-slate-800 group-hover:text-brand-600 transition-colors">${b(a.name)}</p>
                            <p class="text-[10px] text-slate-500 font-semibold mt-0.5">DOC: ${b(a.document||"N/A")}</p>
                        </div>
                    </div>
                </td>
                <td class="p-4">
                    <p class="text-xs font-bold text-slate-700"><i class="bi bi-person-fill text-slate-300 mr-1"></i> ${b(a.ownerEmail||"S/E-mail")}</p>
                </td>
                <td class="p-4 text-center">
                    <p class="text-xs font-black text-slate-700">${b(o)}</p>
                    <p class="text-[9px] font-bold text-slate-500 mt-1">Vence: ${n} ${i}</p>
                </td>
                <td class="p-4 text-center">
                    ${l?'<span class="bg-rose-50 text-rose-600 border border-rose-200 px-2 py-1 rounded text-[9px] font-black uppercase tracking-widest"><i class="bi bi-lock-fill"></i> Bloqueado</span>':'<span class="bg-emerald-50 text-emerald-600 border border-emerald-200 px-2 py-1 rounded text-[9px] font-black uppercase tracking-widest"><i class="bi bi-check-circle-fill"></i> Ativo</span>'}
                </td>
                <td class="p-4 text-right">
                    <div class="flex items-center justify-end gap-2">
                        <button class="bg-white border border-slate-200 text-slate-600 px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm hover:bg-brand-50 hover:text-brand-600 hover:border-brand-200 transition-colors active:scale-95" data-action="view-tenant" data-id="${a.id}">
                            Gerir
                        </button>
                        <button class="bg-white border border-slate-200 text-slate-400 w-8 h-8 flex items-center justify-center rounded-lg shadow-sm hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-colors active:scale-95" data-action="delete-tenant" data-id="${a.id}" title="Excluir Cliente">
                            <i class="bi bi-trash3"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `}).join("");e.innerHTML=t}function Q(e){if(e){if(r.totalPages<=1){e.innerHTML="";return}e.innerHTML=`
        <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Pág. ${r.currentPage} de ${r.totalPages}</span>
        <div class="flex gap-2">
            <button data-action="prev-page" class="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 shadow-sm disabled:opacity-50" ${r.currentPage<=1?"disabled":""}><i class="bi bi-chevron-left"></i></button>
            <button data-action="next-page" class="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 shadow-sm disabled:opacity-50" ${r.currentPage>=r.totalPages?"disabled":""}><i class="bi bi-chevron-right"></i></button>
        </div>
    `}}function G(){const e=document.getElementById("modalCreateTenant"),s=document.getElementById("modalCreateTenantContent"),t=document.getElementById("newTenantPlan");e&&s&&(t&&r.plans.length>0&&(t.innerHTML='<option value="">Selecione o plano...</option>'+r.plans.map(a=>`<option value="${a.id}">${b(a.name)}</option>`).join("")),e.classList.remove("opacity-0","pointer-events-none"),s.classList.remove("scale-95"),s.classList.add("scale-100"))}function I(){const e=document.getElementById("modalCreateTenant"),s=document.getElementById("modalCreateTenantContent"),t=document.getElementById("formCreateTenant"),a=document.getElementById("feedbackMsg");e&&s&&(s.classList.remove("scale-100"),s.classList.add("scale-95"),e.classList.add("opacity-0","pointer-events-none"),setTimeout(()=>{t&&t.reset(),a&&a.classList.add("hidden")},300))}function Z(e,s=null){if(!s)return;const t=document.getElementById("slide-panel-overlay"),a=document.getElementById("slide-panel"),l=document.getElementById("modal-container"),o=document.getElementById("panel-title"),n=document.getElementById("panel-footer"),c=document.getElementById("panel-tabs-container");t.classList.remove("hidden"),a.classList.remove("hidden"),a.classList.add("flex"),requestAnimationFrame(()=>{t.classList.remove("opacity-0"),l.classList.remove("scale-95","opacity-0"),l.classList.add("scale-100","opacity-100")});const i=r.tenants.find(u=>u.id===s);if(!i)return;const g=r.plans.map(u=>`<option value="${u.id}">${b(u.name)}</option>`).join("");o.innerText=i.name,c.classList.remove("hidden"),l.classList.add("max-w-4xl"),r.activeTab="cadastro",H(i,g),n.innerHTML=`
        <button data-action="close-panel" class="px-6 py-3 rounded-xl font-bold text-sm text-slate-600 bg-white border border-slate-300 hover:bg-slate-50 transition-colors uppercase tracking-widest active:scale-95">Fechar Janela</button>
        <button data-action="update-tenant" data-id="${i.id}" class="px-8 py-3 bg-brand-600 text-white font-black text-sm uppercase tracking-widest rounded-xl hover:bg-brand-700 transition-colors shadow-md active:scale-95 flex items-center justify-center gap-2">
            <i class="bi bi-save2"></i> Salvar Cadastro
        </button>
    `}function H(e,s){const t=document.getElementById("panel-content");document.querySelectorAll(".panel-tab").forEach(o=>{o.dataset.tab===r.activeTab?(o.classList.remove("border-transparent","text-slate-500"),o.classList.add("border-brand-600","text-brand-600")):(o.classList.add("border-transparent","text-slate-500"),o.classList.remove("border-brand-600","text-brand-600"))});const l=e.status==="inactive"||e.status==="blocked"||e.status==="deleted";r.activeTab==="cadastro"?(t.innerHTML=`
            <form id="tenant-full-form" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
                        <div class="flex items-center gap-3 mb-4 border-b border-slate-100 pb-3">
                            <div class="w-10 h-10 rounded-lg ${e.isNetwork?"bg-indigo-50 text-indigo-500 border-indigo-100":"bg-slate-50 text-slate-500 border-slate-200"} flex items-center justify-center text-lg border flex-shrink-0">
                                <i class="bi ${e.isNetwork?"bi-diagram-3-fill":"bi-shop"}"></i>
                            </div>
                            <div>
                                <h4 class="text-[11px] font-black text-slate-700 uppercase tracking-widest">Perfil da Empresa</h4>
                                <p class="text-[10px] text-slate-400 font-bold">${e.isNetwork?"Rede / Franquia":"Empresa Única"}</p>
                            </div>
                        </div>

                        <div class="space-y-4 flex-1">
                            <div>
                                <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Email Master (Login)</label>
                                <input type="text" value="${b(e.ownerEmail)}" disabled class="w-full p-3 bg-slate-100 border border-slate-200 rounded-xl text-sm font-bold text-slate-500 cursor-not-allowed">
                            </div>
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Telefone Comercial</label>
                                    <input type="text" id="edit-phone" value="${b(e.phone||"")}" class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 outline-none focus:ring-2 focus:ring-brand-500 transition-shadow">
                                </div>
                                <div>
                                    <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">CNPJ / CPF</label>
                                    <input type="text" id="edit-doc" value="${b(e.document||"")}" class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 outline-none focus:ring-2 focus:ring-brand-500 transition-shadow">
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm border-l-4 border-l-emerald-500 flex flex-col">
                        <h4 class="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-4 flex items-center gap-2 border-b border-slate-100 pb-2"><i class="bi bi-credit-card-2-front text-sm"></i> Faturação e Assinatura SaaS</h4>
                        
                        <div class="space-y-4 flex-1">
                            <div>
                                <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Plano Contratado (Upsell / Downgrade)</label>
                                <select id="edit-plan" class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 outline-none focus:ring-2 focus:ring-brand-500 cursor-pointer transition-shadow">
                                    ${s}
                                </select>
                            </div>
                            
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Data de Vencimento</label>
                                    <input type="date" id="edit-due-date" value="${e.nextDueDate||""}" class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 outline-none focus:ring-2 focus:ring-brand-500 transition-shadow">
                                </div>
                                <div>
                                    <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1" title="Dias para bloqueio após vencimento">Carência (Dias)</label>
                                    <input type="number" id="edit-grace-period" value="${e.gracePeriodDays!==void 0?e.gracePeriodDays:5}" class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 outline-none focus:ring-2 focus:ring-brand-500 transition-shadow">
                                </div>
                            </div>

                            <div>
                                <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Status da Fatura Atual</label>
                                <select id="edit-pay-status" class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 outline-none focus:ring-2 focus:ring-brand-500 cursor-pointer transition-shadow">
                                    <option value="paid" ${e.lastPaymentStatus==="paid"?"selected":""}>Em Dia (Pago)</option>
                                    <option value="pending" ${e.lastPaymentStatus==="pending"?"selected":""}>Pendente / Aguardando</option>
                                    <option value="overdue" ${e.lastPaymentStatus==="overdue"?"selected":""}>Atrasado (Inadimplente)</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                
                <hr class="border-slate-200 my-6">

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div class="bg-indigo-50 p-5 rounded-2xl border border-indigo-100 shadow-sm flex flex-col justify-between">
                        <div>
                            <h4 class="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-2 flex items-center gap-2"><i class="bi bi-headset text-sm"></i> Suporte Técnico</h4>
                            <p class="text-[10px] text-indigo-800 font-medium mb-4 leading-relaxed">Aceder à conta deste cliente sem necessitar da senha original.</p>
                        </div>
                        <button type="button" data-action="impersonate" data-id="${e.id}" class="w-full py-3 bg-white border border-indigo-200 text-indigo-700 font-black text-xs uppercase tracking-widest rounded-xl hover:bg-indigo-600 hover:text-white transition-colors shadow-sm active:scale-95 flex justify-center items-center gap-2">
                            <i class="bi bi-box-arrow-in-right text-lg"></i> Assumir Identidade
                        </button>
                    </div>

                    <div class="bg-rose-50 p-5 rounded-2xl border border-rose-100 shadow-sm flex flex-col justify-between">
                        <div>
                            <h4 class="text-[10px] font-black text-rose-600 uppercase tracking-widest mb-2 flex items-center gap-2"><i class="bi bi-exclamation-triangle-fill text-sm"></i> Zona de Risco</h4>
                            <p class="text-[10px] text-rose-800 font-medium mb-4 leading-relaxed">Bloquear impede o acesso imediato de todas as unidades desta rede.</p>
                        </div>
                        <button type="button" data-action="toggle-status" data-id="${e.id}" data-current="${e.status}" class="w-full py-3 ${l?"bg-emerald-600 text-white border-transparent":"bg-white border-rose-200 text-rose-700 hover:bg-rose-600 hover:text-white hover:border-transparent"} font-black text-xs uppercase tracking-widest rounded-xl transition-colors shadow-sm active:scale-95 flex items-center justify-center gap-1.5">
                            <i class="bi ${l?"bi-unlock-fill":"bi-lock-fill"}"></i> ${l?"Desbloquear Ambiente":"Bloquear Sistema"}
                        </button>
                    </div>
                </div>
            </form>
        `,setTimeout(()=>{const o=document.getElementById("edit-plan");o&&e.planId&&(o.value=e.planId)},50)):r.activeTab==="history"&&(t.innerHTML=`
            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col h-full min-h-[400px]">
                <div class="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
                    <h4 class="text-xs font-black text-slate-800 tracking-tight flex items-center gap-2"><i class="bi bi-receipt-cutoff text-emerald-600"></i> Faturas Pagas</h4>
                    <button data-action="add-manual-payment" data-id="${e.id}" class="bg-emerald-600 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 shadow-sm shadow-emerald-500/30 active:scale-95 transition-all flex items-center gap-1"><i class="bi bi-plus-lg"></i> Inserir</button>
                </div>
                
                <div id="payments-wrapper" class="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-3">
                    <div class="loader mx-auto mt-10"></div>
                </div>
            </div>
        `,C(e.id))}function W(e){const s=document.getElementById("payments-wrapper");if(s){if(r.payments.length===0){s.innerHTML=`
            <div class="text-center py-16">
                <div class="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3 border border-slate-100"><i class="bi bi-receipt text-2xl text-slate-300"></i></div>
                <p class="text-sm font-bold text-slate-600">Nenhum pagamento registado.</p>
                <p class="text-xs text-slate-400 mt-1">Os pagamentos desta assinatura aparecerão aqui.</p>
            </div>
        `;return}s.innerHTML=r.payments.map(t=>`
        <div class="flex justify-between items-center p-4 bg-slate-50 border border-slate-200 rounded-xl shadow-sm hover:border-brand-200 hover:bg-white transition-all group">
            <div>
                <p class="text-base font-black text-slate-800 tracking-tight">R$ ${Number(t.amount).toFixed(2)}</p>
                <p class="text-[10px] font-bold text-slate-500 mt-1 uppercase tracking-widest"><i class="bi bi-calendar-check text-emerald-500 mr-1"></i> Data: ${j(t.paymentDate)}</p>
            </div>
            <div class="text-right">
                <span class="bg-emerald-100 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest shadow-sm">Pago</span>
                <p class="text-[9px] font-bold text-slate-400 mt-1.5 uppercase tracking-widest">Via ${b(t.paymentMethod)}</p>
            </div>
        </div>
    `).join("")}}function E(){const e=document.getElementById("slide-panel-overlay"),s=document.getElementById("slide-panel"),t=document.getElementById("modal-container");e.classList.add("opacity-0"),t&&(t.classList.remove("scale-100","opacity-100"),t.classList.add("scale-95","opacity-0")),setTimeout(()=>{e.classList.add("hidden"),s.classList.add("hidden"),s.classList.remove("flex")},300)}async function X(e){const s=e.dataset.id,t={phone:document.getElementById("edit-phone").value,documentInfo:document.getElementById("edit-doc").value,planId:document.getElementById("edit-plan").value,nextDueDate:document.getElementById("edit-due-date").value,gracePeriodDays:document.getElementById("edit-grace-period").value,lastPaymentStatus:document.getElementById("edit-pay-status").value},a=e.innerHTML;e.innerHTML='<div class="loader border-white mr-2 w-4 h-4"></div> Salvando...',e.disabled=!0;try{await p(`/api/admin/tenants/${s}`,{method:"PUT",body:JSON.stringify(t)}),d("Sucesso","Cadastro do cliente salvo com sucesso.","success");const l=r.tenants.findIndex(o=>o.id===s);l>-1&&(r.tenants[l]={...r.tenants[l],...t,document:t.documentInfo},T()),E()}catch(l){d("Erro",l.message,"error"),e.innerHTML=a,e.disabled=!1}}async function K(e){const s=`
        <form id="manual-payment-form" class="space-y-5 bg-white p-1 rounded-2xl">
            <div>
                <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Valor Recebido (R$)</label>
                <div class="relative">
                    <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 font-black">R$</span>
                    <input type="number" id="pay-amount" step="0.01" required class="w-full pl-10 p-3.5 bg-slate-50 border border-slate-200 rounded-xl font-black text-lg text-slate-800 outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow">
                </div>
            </div>
            <div>
                <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Data do Pagamento</label>
                <input type="date" id="pay-date" required value="${new Date().toISOString().split("T")[0]}" class="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-sm text-slate-800 outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow">
            </div>
            <div>
                <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Forma de Pagamento</label>
                <select id="pay-method" class="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-sm text-slate-800 outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer transition-shadow">
                    <option value="pix">PIX</option>
                    <option value="cartao">Cartão de Crédito</option>
                    <option value="boleto">Boleto Bancário</option>
                    <option value="manual">Manual / Transferência</option>
                </select>
            </div>
            <button type="submit" class="w-full py-4 mt-4 bg-emerald-600 text-white font-black text-sm uppercase tracking-widest rounded-xl hover:bg-emerald-700 shadow-md active:scale-95 transition-transform flex justify-center items-center gap-2">
                <i class="bi bi-check2-circle text-lg"></i> Confirmar Fatura Paga
            </button>
        </form>
    `,{modalElement:t,close:a}=q({title:"Registar Fatura Paga",contentHTML:s,maxWidth:"max-w-sm"});t.querySelector("#manual-payment-form").addEventListener("submit",async l=>{l.preventDefault();const o=l.target.querySelector('button[type="submit"]'),n=o.innerHTML;o.innerHTML='<div class="loader border-white w-4 h-4"></div>',o.disabled=!0;const c={amount:document.getElementById("pay-amount").value,paymentDate:document.getElementById("pay-date").value,paymentMethod:document.getElementById("pay-method").value,status:"paid"};try{await p(`/api/admin/tenants/${e}/payments`,{method:"POST",body:JSON.stringify(c)}),d("Sucesso","Pagamento registado. O vencimento foi adiado em 1 mês.","success"),a(),await m(),C(e)}catch(i){d("Erro",i.message,"error"),o.innerHTML=n,o.disabled=!1}})}async function Y(e){if(await k("Atenção MÁXIMA!","Deseja excluir DEFINITIVAMENTE este cliente? A conta ficará invisível, o acesso será bloqueado e ele desaparecerá desta tabela."))try{await p(`/api/admin/tenants/${e}/status`,{method:"PATCH",body:JSON.stringify({status:"deleted"})}),d("Sucesso","Ambiente excluído com sucesso.","success"),r.tenants=r.tenants.filter(t=>t.id!==e),T()}catch(t){d("Erro",t.message,"error")}}async function ee(e){const s=e.dataset.id,t=e.dataset.current==="inactive"||e.dataset.current==="blocked"||e.dataset.current==="deleted"?"active":"blocked";if(!await k("Zona de Risco",`Deseja realmente ${t==="blocked"?"BLOQUEAR":"DESBLOQUEAR"} o acesso de toda esta rede?`))return;const l=e.innerHTML;e.innerHTML='<div class="loader mx-auto border-white w-4 h-4"></div>',e.disabled=!0;try{await p(`/api/admin/tenants/${s}/status`,{method:"PATCH",body:JSON.stringify({status:t})}),d("Sucesso",`Ambiente ${t==="blocked"?"bloqueado":"ativado"}.`,"success"),E(),await m()}catch(o){d("Erro",o.message,"error"),e.innerHTML=l,e.disabled=!1}}async function te(e){const s=e.dataset.id,t=e.innerHTML;e.innerHTML='<div class="loader border-brand-600 mr-2 w-4 h-4"></div> Acedendo...',e.disabled=!0;try{const a=await p(`/api/admin/tenants/${s}/impersonate`,{method:"POST"});a&&a.token&&(localStorage.setItem("impersonateToken",a.token),d("Conectado","A redirecionar...","info"),setTimeout(()=>{window.open("/app.html","_blank"),e.innerHTML=t,e.disabled=!1},1e3))}catch(a){d("Acesso Recusado",a.message,"error"),e.innerHTML=t,e.disabled=!1}}function ae(e){h&&e.removeEventListener("click",h);let s;e.addEventListener("input",a=>{a.target.id==="search-tenant-input"&&(clearTimeout(s),s=setTimeout(()=>{r.searchQuery=a.target.value,r.currentPage=1,m()},500))}),h=a=>{if(a.target.closest("#btn-open-create-modal")){G();return}if(a.target.closest("#btnCloseTenantModal")||a.target.closest("#btnCancelTenant")){I();return}if(a.target.id==="slide-panel-overlay"||a.target.closest("#btn-close-panel")||a.target.closest('[data-action="close-panel"]')){E();return}const l=a.target.closest(".panel-tab");if(l){r.activeTab=l.dataset.tab;const c=document.querySelector('[data-action="update-tenant"], [data-action="toggle-status"], [data-action="add-manual-payment"]')?.dataset.id;if(c){const i=r.tenants.find(u=>u.id===c),g=r.plans.map(u=>`<option value="${u.id}">${b(u.name)}</option>`).join("");H(i,g)}return}const o=a.target.closest("[data-action], #btn-refresh-table");if(!o)return;if(o.id==="btn-refresh-table"){m();return}const n=o.dataset.action;if(n==="delete-tenant"){a.stopPropagation(),Y(o.dataset.id);return}switch(a.preventDefault(),n){case"view-tenant":Z("view",o.dataset.id);break;case"update-tenant":X(o);break;case"toggle-status":ee(o);break;case"impersonate":te(o);break;case"add-manual-payment":K(o.dataset.id);break;case"prev-page":r.currentPage>1&&(r.currentPage--,m());break;case"next-page":r.currentPage<r.totalPages&&(r.currentPage++,m());break}},e.addEventListener("click",h);const t=document.getElementById("formCreateTenant");t&&!t.dataset.listener&&(t.dataset.listener="true",t.addEventListener("submit",async a=>{a.preventDefault();const l=document.getElementById("btnCreateTenant"),o=document.getElementById("feedbackMsg"),n=l.innerHTML;try{l.disabled=!0,l.innerHTML='<div class="loader border-white mr-2 w-4 h-4" style="display:inline-block"></div> Criando...',o.classList.add("hidden");const c=document.querySelector('input[name="newTenantIsNetwork"]:checked'),i={establishmentName:document.getElementById("newTenantName").value,establishmentId:document.getElementById("newTenantId").value,ownerEmail:document.getElementById("newTenantEmail").value,ownerPassword:document.getElementById("newTenantPassword").value,ownerName:document.getElementById("newTenantOwnerName").value,documentInfo:document.getElementById("newTenantDoc").value,phone:document.getElementById("newTenantPhone").value,planId:document.getElementById("newTenantPlan").value,isNetwork:c&&c.value==="true",timezone:Intl.DateTimeFormat().resolvedOptions().timeZone};await p("/api/public/register",{method:"POST",body:JSON.stringify(i)}),d("Fantástico!","Ambiente do cliente criado com sucesso!","success"),I(),m()}catch(c){o.textContent=c.message||"Ocorreu um erro ao criar o cliente.",o.classList.remove("hidden","bg-emerald-50","text-emerald-700","border-emerald-200"),o.classList.add("bg-rose-50","text-rose-700","border-rose-200")}finally{l.disabled=!1,l.innerHTML=n}}))}const se={dashboard:"Visão Geral (Dashboard)",agenda:"Agenda / Calendário",comandas:"Comandas / PDV",relatorios:"Relatórios (Analytics)","sales-report":"Relatório de Vendas",financial:"Financeiro",servicos:"Serviços",produtos:"Produtos",suppliers:"Fornecedores",profissionais:"Profissionais",ausencias:"Ausências e Bloqueios",clientes:"Clientes",packages:"Pacotes de Serviços",commissions:"Comissões",estabelecimento:"Configurações",users:"Usuários Internos",whatsapp:"Integração WhatsApp",mobileApp:"Acesso App Mobile"};let x={plans:[],tempPlanId:null},w=null;async function oe(e){le(e),de(e),await L()}function le(e){e.innerHTML=`
        <div class="h-full flex flex-col w-full relative font-sans animate-fade-in pb-[100px] md:pb-6">
            
            <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                    <h2 class="text-2xl font-black text-slate-800 tracking-tight">Planos SaaS & Faturação</h2>
                    <p class="text-sm text-slate-500 font-medium mt-1">Crie as regras de negócio, preços e limites do seu software.</p>
                </div>
                <button id="btn-new-plan" class="bg-emerald-600 text-white px-5 py-3 rounded-xl font-bold text-sm hover:bg-emerald-700 shadow-md shadow-emerald-500/30 active:scale-95 transition-all flex items-center gap-2">
                    <i class="bi bi-plus-circle-fill text-lg"></i> Novo Plano
                </button>
            </div>

            <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
                <div class="overflow-x-auto custom-scrollbar">
                    <table class="w-full text-left border-collapse whitespace-nowrap">
                        <thead class="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th class="p-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Nome do Plano</th>
                                <th class="p-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">Preço (Mensal)</th>
                                <th class="p-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">Limites (Lojas/Usr/Prof)</th>
                                <th class="p-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">Status</th>
                                <th class="p-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody id="plans-table-body" class="divide-y divide-slate-100">
                            <tr>
                                <td colspan="5" class="py-16 text-center text-slate-400">
                                    <div class="loader mx-auto mb-3 border-emerald-500"></div>
                                    <p class="text-xs font-bold uppercase tracking-widest">A carregar Planos...</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div id="plan-modal" class="hidden fixed inset-0 z-[99999] bg-slate-900/60 backdrop-blur-sm flex-col items-center justify-center opacity-0 transition-opacity duration-300 md:p-6 p-3">
                <div id="modal-content-wrapper" class="w-full max-w-2xl bg-white flex flex-col transform transition-all duration-300 translate-y-full md:translate-y-8 md:scale-95 opacity-0 rounded-3xl overflow-hidden shadow-2xl relative max-h-full">
                    
                    <header class="bg-emerald-600 border-b border-emerald-700 px-6 py-5 flex items-center justify-between shadow-sm z-20 flex-shrink-0 relative overflow-hidden">
                        <div class="absolute right-[-20px] top-[-20px] opacity-10 pointer-events-none">
                            <i class="bi bi-tag-fill text-9xl text-white"></i>
                        </div>
                        <div class="text-left z-10 relative">
                            <h2 id="modal-title" class="text-xl font-black text-white tracking-tight leading-tight">Novo Plano</h2>
                            <p class="text-[10px] text-emerald-100 font-bold uppercase tracking-widest mt-0.5">Configuração do SaaS</p>
                        </div>
                        <button type="button" id="btn-close-modal" class="w-10 h-10 flex items-center justify-center rounded-full bg-black/10 text-white hover:bg-black/20 active:scale-90 transition-colors z-10 relative">
                            <i class="bi bi-x-lg pointer-events-none"></i>
                        </button>
                    </header>
                    
                    <form id="plan-form" class="flex-grow overflow-y-auto p-6 custom-scrollbar bg-slate-50 space-y-6">
                        
                        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                            <div>
                                <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Nome Comercial do Plano *</label>
                                <input type="text" id="plan-name" required class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm font-black text-slate-800 transition-shadow" placeholder="Ex: Profissional, Basic, Enterprise...">
                            </div>
                            
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Preço Mensal (R$) *</label>
                                    <div class="relative">
                                        <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 font-black">R$</span>
                                        <input type="number" step="0.01" id="plan-price" required class="w-full pl-10 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-lg font-black text-slate-800 transition-shadow" placeholder="0.00">
                                    </div>
                                </div>
                                <div>
                                    <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1" title="Quantas Lojas (Matriz + Filiais) o cliente pode ter?">Máx. Lojas Total *</label>
                                    <input type="number" id="plan-max-ests" required min="1" class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-lg font-black text-slate-800 transition-shadow" placeholder="Ex: 1, 3, 999...">
                                </div>
                            </div>

                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1" title="Quantos usuários administrativos o plano permite?">Máx. Usuários Sistema *</label>
                                    <input type="number" id="plan-max-users" required min="1" class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-lg font-black text-slate-800 transition-shadow" placeholder="Ex: 5, 10, 999...">
                                </div>
                                <div>
                                    <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1" title="Quantos profissionais podem ter agenda neste plano?">Máx. Profissionais *</label>
                                    <input type="number" id="plan-max-profs" required min="1" class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-lg font-black text-slate-800 transition-shadow" placeholder="Ex: 3, 10, 999...">
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 class="text-[11px] font-black text-emerald-600 uppercase tracking-widest mb-3 ml-1 flex items-center gap-2"><i class="bi bi-grid-1x2-fill"></i> Módulos Liberados no Plano</h3>
                            <p class="text-xs text-slate-500 mb-4 ml-1">Selecione as telas que estarão visíveis para os clientes deste plano.</p>
                            
                            <div id="modules-grid" class="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm max-h-64 overflow-y-auto custom-scrollbar">
                                </div>
                        </div>
                    </form>

                    <footer class="p-5 bg-white border-t border-slate-200 shadow-[0_-10px_20px_-3px_rgba(0,0,0,0.05)] flex justify-end gap-3 z-50 flex-shrink-0">
                        <button type="button" id="btn-cancel-modal" class="px-6 py-3 rounded-xl font-bold text-sm text-slate-600 bg-white border border-slate-300 hover:bg-slate-50 transition-colors uppercase tracking-wider">Cancelar</button>
                        <button type="submit" form="plan-form" id="btn-submit-plan" class="px-8 py-3 rounded-xl font-black text-sm text-white bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-500/30 transition-all flex items-center gap-2 active:scale-95 uppercase tracking-wider">
                            <i class="bi bi-save2-fill text-lg"></i> Salvar Plano
                        </button>
                    </footer>
                </div>
            </div>
            
        </div>
    `}async function L(){const e=document.getElementById("plans-table-body");try{const s=new Date().getTime(),t=await p(`/api/saas/plans?_t=${s}`);x.plans=t||[],re()}catch(s){console.error("Erro ao buscar planos:",s),e&&(e.innerHTML='<tr><td colspan="5" class="py-12 text-center text-rose-500 font-bold text-sm"><i class="bi bi-exclamation-triangle block text-2xl mb-2"></i> Erro ao carregar os planos.</td></tr>')}}function re(){const e=document.getElementById("plans-table-body");if(!e)return;if(x.plans.length===0){e.innerHTML=`
            <tr>
                <td colspan="5" class="py-16 text-center">
                    <div class="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-300 text-2xl"><i class="bi bi-tags"></i></div>
                    <p class="text-sm font-bold text-slate-600">Nenhum plano cadastrado.</p>
                    <p class="text-xs text-slate-400 mt-1">Clique em '+ Novo Plano' para criar as regras de venda.</p>
                </td>
            </tr>`;return}const s=new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}),t=x.plans.map(a=>{const o=a.active!==!1?'<span class="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-widest"><i class="bi bi-check-circle-fill mr-1"></i> Ativo</span>':'<span class="bg-slate-100 text-slate-500 border border-slate-200 px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-widest"><i class="bi bi-pause-circle-fill mr-1"></i> Inativo</span>';return`
            <tr class="hover:bg-slate-50 transition-colors group cursor-pointer" data-action="edit-plan" data-id="${a.id}">
                <td class="p-4">
                    <p class="text-sm font-black text-slate-800 group-hover:text-emerald-600 transition-colors">${b(a.name)}</p>
                </td>
                <td class="p-4 text-center">
                    <p class="text-lg font-black text-slate-700">${s.format(a.price)}</p>
                </td>
                <td class="p-4 text-center space-y-1">
                    <span class="inline-block bg-indigo-50 text-indigo-700 border border-indigo-200 px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-widest shadow-sm">${a.maxEstablishments||1} Lojas</span>
                    <span class="inline-block bg-blue-50 text-blue-700 border border-blue-200 px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-widest shadow-sm">${a.maxUsers||1} Usrs</span>
                    <span class="inline-block bg-cyan-50 text-cyan-700 border border-cyan-200 px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-widest shadow-sm">${a.maxProfessionals||1} Profs</span>
                </td>
                <td class="p-4 text-center">${o}</td>
                <td class="p-4 text-right">
                    <button data-action="delete-plan" data-id="${a.id}" class="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-200 shadow-sm transition-all active:scale-95 ml-auto">
                        <i class="bi bi-trash3 pointer-events-none"></i>
                    </button>
                </td>
            </tr>
        `}).join("");e.innerHTML=t}function P(e=null){x.tempPlanId=e;const s=document.getElementById("plan-modal");document.getElementById("plan-form").reset();const a=!!e;document.getElementById("modal-title").innerText=a?"Editar Plano SaaS":"Novo Plano SaaS";const l=a?x.plans.find(i=>i.id===e):null;document.getElementById("plan-name").value=l?l.name:"",document.getElementById("plan-price").value=l?l.price:"",document.getElementById("plan-max-ests").value=l&&l.maxEstablishments||1,document.getElementById("plan-max-users").value=l&&l.maxUsers||1,document.getElementById("plan-max-profs").value=l&&l.maxProfessionals||1;const o=document.getElementById("modules-grid"),n=l?.features||l?.allowedModules||{},c=Array.isArray(n)?n.reduce((i,g)=>({...i,[g]:!0}),{}):n;o.innerHTML=Object.entries(se).map(([i,g])=>{const u=!a||c[i]?"checked":"";return`
            <label class="flex items-center p-3 border border-slate-200 rounded-xl cursor-pointer transition-colors hover:bg-emerald-50/50 hover:border-emerald-300 group shadow-sm bg-slate-50">
                <input type="checkbox" name="plan-modules" value="${i}" ${u} class="w-4 h-4 text-emerald-600 border-slate-300 rounded focus:ring-emerald-500 cursor-pointer">
                <span class="text-xs font-bold text-slate-700 ml-3 group-hover:text-emerald-800">${g}</span>
            </label>
        `}).join(""),s.classList.remove("hidden"),s.style.display="flex",requestAnimationFrame(()=>{s.classList.remove("opacity-0");const i=s.querySelector("#modal-content-wrapper");i&&(i.classList.remove("translate-y-full","md:translate-y-8","md:scale-95","opacity-0"),i.classList.add("translate-y-0","md:scale-100","opacity-100"))})}function D(){const e=document.getElementById("plan-modal");if(!e)return;e.classList.add("opacity-0");const s=e.querySelector("#modal-content-wrapper");s&&(s.classList.remove("translate-y-0","md:scale-100","opacity-100"),s.classList.add("translate-y-full","md:translate-y-8","md:scale-95","opacity-0")),setTimeout(()=>{e.classList.add("hidden"),e.style.display="none",x.tempPlanId=null},300)}async function ie(e){e.preventDefault();const s=document.getElementById("btn-submit-plan"),t=s.innerHTML;s.innerHTML='<div class="loader-small border-white mr-2"></div> Salvando...',s.disabled=!0;const a=[];document.querySelectorAll('input[name="plan-modules"]:checked').forEach(o=>{a.push(o.value)});const l={name:document.getElementById("plan-name").value,price:parseFloat(document.getElementById("plan-price").value),maxEstablishments:parseInt(document.getElementById("plan-max-ests").value,10),maxUsers:parseInt(document.getElementById("plan-max-users").value,10),maxProfessionals:parseInt(document.getElementById("plan-max-profs").value,10),allowedModules:a,features:a};try{x.tempPlanId?(await p(`/api/saas/plans/${x.tempPlanId}`,{method:"PUT",body:JSON.stringify(l)}),d("Sucesso!","Plano atualizado com sucesso.","success")):(await p("/api/saas/plans",{method:"POST",body:JSON.stringify(l)}),d("Sucesso!","Plano criado com sucesso no SaaS e no Pagar.me.","success")),D(),await L()}catch(o){console.error("Erro ao salvar plano:",o),d("Erro",o.message||"Erro ao salvar o plano.","error")}finally{s.innerHTML=t,s.disabled=!1}}async function ne(e){if(await k("Apagar Plano","Deseja realmente apagar este plano? Clientes antigos continuarão a utilizá-lo, mas não estará disponível para novas vendas."))try{await p(`/api/saas/plans/${e}`,{method:"DELETE"}),d("Sucesso","Plano apagado.","success"),await L()}catch(t){d("Erro",t.message,"error")}}function de(e){w&&e.removeEventListener("click",w),w=t=>{const a=t.target.closest("#btn-close-modal")||t.target.closest("#btn-cancel-modal"),l=t.target.id==="plan-modal";if(a||l){D();return}const o=t.target.closest("[data-action], #btn-new-plan");if(!o)return;if(o.id==="btn-new-plan"){P();return}switch(o.dataset.action){case"edit-plan":t.target.closest('[data-action="delete-plan"]')||P(o.dataset.id);break;case"delete-plan":t.stopPropagation(),ne(o.dataset.id);break}},e.addEventListener("click",w);const s=document.getElementById("plan-form");s&&s.addEventListener("submit",ie)}R();document.getElementById("btn-logout").addEventListener("click",z);const S=document.querySelectorAll(".menu-item"),f=document.getElementById("dynamic-content"),ce=document.getElementById("page-title"),M=["bg-brand-600","text-white","shadow-md","shadow-brand-500/20"],$=["hover:bg-sidebarHover","hover:text-white"];S.forEach(e=>{e.addEventListener("click",async s=>{s.preventDefault(),S.forEach(o=>{o.classList.remove(...M),o.classList.add(...$);const n=o.querySelector("i");n&&n.classList.replace("text-white","text-slate-400")});const t=s.currentTarget;t.classList.remove(...$),t.classList.add(...M);const a=t.querySelector("i");a&&a.classList.replace("text-slate-400","text-white"),ce.innerText=t.innerText.trim(),v&&(document.getElementById("user-role-display").innerText=v);const l=t.getAttribute("href").replace("#","");f.innerHTML='<div class="flex h-full items-center justify-center"><div class="loader"></div></div>',setTimeout(async()=>{l==="dashboard"?await U(f):l==="establishments"?await _(f):l==="financial"?await oe(f):f.innerHTML=`
                            <div class="flex flex-col items-center justify-center h-full text-slate-400">
                                <i class="bi bi-tools text-5xl mb-4 opacity-30"></i>
                                <h3 class="text-lg font-bold text-slate-600">Módulo em Desenvolvimento</h3>
                                <p class="text-sm mt-1">A seção "${l}" estará disponível em breve.</p>
                            </div>
                        `},300)})});setTimeout(()=>{const e=document.querySelector('.menu-item[href="#dashboard"]');e&&e.click()},1e3);
