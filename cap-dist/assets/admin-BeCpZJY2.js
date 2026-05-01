import"./modulepreload-polyfill-B5Qt9EMX.js";import{a as y}from"./firebase-config-seH-87Om.js";import{onAuthStateChanged as N,signOut as M}from"https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";import{a as p,b as c,e as b,s as k,c as q}from"./utils-DTVAHnIk.js";import"https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";import"https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";import"https://www.gstatic.com/firebasejs/11.6.1/firebase-storage.js";import"https://www.gstatic.com/firebasejs/11.6.1/firebase-messaging.js";const C={super_admin:["dashboard","establishments","whatsapp","financial","team","settings"],support:["establishments","whatsapp"],financial:["dashboard","establishments","financial"],developer:["whatsapp","settings"]};let v=null;function R(){document.body.style.display="none",N(y,async e=>{if(e)try{let a=(await e.getIdTokenResult()).claims.role;a==="super-admin"&&(a="super_admin"),a&&C[a]?(v=a,console.log("🛡️ Acesso Seguro Concedido! Perfil:",v),z(v),document.body.style.display="flex"):(console.error("🚨 Intruso detectado: Conta sem cargo de gestão."),await M(y),window.location.href="admin-login.html")}catch(s){console.error("Erro ao verificar permissões de segurança:",s),window.location.href="admin-login.html"}else window.location.href="admin-login.html"})}function z(e){const s=C[e]||[];document.querySelectorAll("[data-module]").forEach(t=>{const o=t.getAttribute("data-module");s.includes(o)||t.remove()})}async function O(){try{await M(y),window.location.href="admin-login.html"}catch(e){console.error("Erro ao sair do sistema:",e)}}const F=e=>new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(e||0);async function U(e){e.innerHTML=`
        <div class="flex flex-col items-center justify-center h-full text-slate-400">
            <div class="loader mb-4"></div>
            <p class="font-medium text-sm animate-pulse">A carregar métricas do SaaS...</p>
        </div>
    `;try{const s=await p("/api/admin/dashboard-stats");if(!s||!s.kpis)throw new Error("Dados de KPIs não retornados pela API.");const{kpis:a}=s,t=Math.max(...a.newSubscribersData,1),o=a.newSubscribersData.map(l=>`
                <div class="group relative flex-1 flex items-end justify-center h-full">
                    <div class="w-full bg-brand-200 hover:bg-brand-500 transition-colors rounded-t-sm" style="height: ${l/t*100}%"></div>
                    <div class="opacity-0 group-hover:opacity-100 absolute -top-8 bg-slate-800 text-white text-[10px] py-1 px-2 rounded font-bold transition-opacity whitespace-nowrap z-10 pointer-events-none">
                        ${l} novos
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
                        <h3 class="text-3xl font-black text-slate-800 relative z-10 tracking-tight">${F(a.mrr)}</h3>
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
                        <h3 class="text-3xl font-black text-slate-800 relative z-10 tracking-tight">${a.activeUsers}</h3>
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
                        <h3 class="text-3xl font-black text-slate-800 relative z-10 tracking-tight">${a.totalUsers}</h3>
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
                        <h3 class="text-3xl font-black text-rose-600 relative z-10 tracking-tight">${a.churnRate}%</h3>
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
                                +${a.newSubscribersData.reduce((l,i)=>l+i,0)}
                            </div>
                        </div>
                        
                        <div class="flex-1 min-h-[160px] flex items-end gap-1 pb-2 pt-8 border-b border-slate-100">
                            ${o}
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
        `}}let r={tenants:[],plans:[],payments:[],searchQuery:"",currentPage:1,limit:20,totalPages:1,activeTab:"cadastro"},h=null;async function _(e){V(e),ae(e),await Promise.all([J(),x()])}function V(e){e.innerHTML=`
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
    `}async function J(){try{r.plans=await p("/api/admin/plans")||[]}catch{c("Erro","Falha ao carregar os planos.","error")}}async function x(){const e=document.getElementById("tenants-table-body"),s=document.getElementById("pagination-container");e&&(e.innerHTML='<tr><td colspan="5" class="py-12 text-center"><div class="loader mx-auto mb-2 border-brand-500"></div></td></tr>');try{let a=`/api/admin/tenants?page=${r.currentPage}&limit=${r.limit}`;r.searchQuery&&(a+=`&search=${encodeURIComponent(r.searchQuery)}`);const t=await p(a);r.tenants=(t.data||[]).filter(o=>o.status!=="deleted"),r.totalPages=t.pagination.totalPages||1,T(),Q(s)}catch{e&&(e.innerHTML='<tr><td colspan="5" class="py-12 text-center text-rose-500">Erro ao carregar clientes.</td></tr>')}}async function A(e){try{const s=await p(`/api/admin/tenants/${e}/payments`);r.payments=s||[],W(e)}catch{document.getElementById("payments-wrapper").innerHTML='<p class="text-rose-500 text-xs font-bold text-center mt-4">Erro ao carregar pagamentos.</p>'}}function j(e){if(!e)return"-";try{const[s,a,t]=e.split("T")[0].split("-");return`${t}/${a}/${s}`}catch{return e}}function T(){const e=document.getElementById("tenants-table-body");if(!e)return;if(r.tenants.length===0){e.innerHTML='<tr><td colspan="5" class="py-16 text-center text-slate-400">Nenhum cliente encontrado.</td></tr>';return}const s=new Map(r.plans.map(t=>[t.id,t.name])),a=r.tenants.map(t=>{const o=t.status==="inactive"||t.status==="blocked",l=t.planId||t.subscription&&t.subscription.planId,i=s.get(l)||"Não Definido",d=t.nextDueDate?j(t.nextDueDate):"-",m=t.lastPaymentStatus==="overdue"?'<span class="text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded ml-1 border border-rose-100"><i class="bi bi-exclamation-circle text-[8px]"></i> Atrasado</span>':'<span class="text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded ml-1 border border-emerald-100">Em dia</span>';return`
            <tr class="hover:bg-slate-50 transition-colors group cursor-pointer border-b border-slate-100" data-action="view-tenant" data-id="${t.id}">
                <td class="p-4">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-lg ${t.isNetwork?"bg-indigo-50 text-indigo-500 border-indigo-100":"bg-white text-slate-500 border-slate-200"} flex items-center justify-center border shadow-sm">
                            <i class="bi ${t.isNetwork?"bi-diagram-3-fill":"bi-shop"}"></i>
                        </div>
                        <div>
                            <p class="text-sm font-bold text-slate-800 group-hover:text-brand-600 transition-colors">${b(t.name)}</p>
                            <p class="text-[10px] text-slate-500 font-semibold mt-0.5">DOC: ${b(t.document||"N/A")}</p>
                        </div>
                    </div>
                </td>
                <td class="p-4">
                    <p class="text-xs font-bold text-slate-700"><i class="bi bi-person-fill text-slate-300 mr-1"></i> ${b(t.ownerEmail||"S/E-mail")}</p>
                </td>
                <td class="p-4 text-center">
                    <p class="text-xs font-black text-slate-700">${b(i)}</p>
                    <p class="text-[9px] font-bold text-slate-500 mt-1">Vence: ${d} ${m}</p>
                </td>
                <td class="p-4 text-center">
                    ${o?'<span class="bg-rose-50 text-rose-600 border border-rose-200 px-2 py-1 rounded text-[9px] font-black uppercase tracking-widest"><i class="bi bi-lock-fill"></i> Bloqueado</span>':'<span class="bg-emerald-50 text-emerald-600 border border-emerald-200 px-2 py-1 rounded text-[9px] font-black uppercase tracking-widest"><i class="bi bi-check-circle-fill"></i> Ativo</span>'}
                </td>
                <td class="p-4 text-right">
                    <div class="flex items-center justify-end gap-2">
                        <button class="bg-white border border-slate-200 text-slate-600 px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm hover:bg-brand-50 hover:text-brand-600 hover:border-brand-200 transition-colors active:scale-95" data-action="view-tenant" data-id="${t.id}">
                            Gerir
                        </button>
                        <button class="bg-white border border-slate-200 text-slate-400 w-8 h-8 flex items-center justify-center rounded-lg shadow-sm hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-colors active:scale-95" data-action="delete-tenant" data-id="${t.id}" title="Excluir Cliente">
                            <i class="bi bi-trash3"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `}).join("");e.innerHTML=a}function Q(e){if(e){if(r.totalPages<=1){e.innerHTML="";return}e.innerHTML=`
        <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Pág. ${r.currentPage} de ${r.totalPages}</span>
        <div class="flex gap-2">
            <button data-action="prev-page" class="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 shadow-sm disabled:opacity-50" ${r.currentPage<=1?"disabled":""}><i class="bi bi-chevron-left"></i></button>
            <button data-action="next-page" class="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 shadow-sm disabled:opacity-50" ${r.currentPage>=r.totalPages?"disabled":""}><i class="bi bi-chevron-right"></i></button>
        </div>
    `}}function G(){const e=document.getElementById("modalCreateTenant"),s=document.getElementById("modalCreateTenantContent"),a=document.getElementById("newTenantPlan");e&&s&&(a&&r.plans.length>0&&(a.innerHTML='<option value="">Selecione o plano...</option>'+r.plans.map(t=>`<option value="${t.id}">${b(t.name)}</option>`).join("")),e.classList.remove("opacity-0","pointer-events-none"),s.classList.remove("scale-95"),s.classList.add("scale-100"))}function L(){const e=document.getElementById("modalCreateTenant"),s=document.getElementById("modalCreateTenantContent"),a=document.getElementById("formCreateTenant"),t=document.getElementById("feedbackMsg");e&&s&&(s.classList.remove("scale-100"),s.classList.add("scale-95"),e.classList.add("opacity-0","pointer-events-none"),setTimeout(()=>{a&&a.reset(),t&&t.classList.add("hidden")},300))}function Z(e,s=null){if(!s)return;const a=document.getElementById("slide-panel-overlay"),t=document.getElementById("slide-panel"),o=document.getElementById("modal-container"),l=document.getElementById("panel-title"),i=document.getElementById("panel-footer"),d=document.getElementById("panel-tabs-container");a.classList.remove("hidden"),t.classList.remove("hidden"),t.classList.add("flex"),requestAnimationFrame(()=>{a.classList.remove("opacity-0"),o.classList.remove("scale-95","opacity-0"),o.classList.add("scale-100","opacity-100")});const n=r.tenants.find(u=>u.id===s);if(!n)return;const m=r.plans.map(u=>`<option value="${u.id}">${b(u.name)}</option>`).join("");l.innerText=n.name,d.classList.remove("hidden"),o.classList.add("max-w-4xl"),r.activeTab="cadastro",D(n,m),i.innerHTML=`
        <button data-action="close-panel" class="px-6 py-3 rounded-xl font-bold text-sm text-slate-600 bg-white border border-slate-300 hover:bg-slate-50 transition-colors uppercase tracking-widest active:scale-95">Fechar Janela</button>
        <button data-action="update-tenant" data-id="${n.id}" class="px-8 py-3 bg-brand-600 text-white font-black text-sm uppercase tracking-widest rounded-xl hover:bg-brand-700 transition-colors shadow-md active:scale-95 flex items-center justify-center gap-2">
            <i class="bi bi-save2"></i> Salvar Cadastro
        </button>
    `}function D(e,s){const a=document.getElementById("panel-content");document.querySelectorAll(".panel-tab").forEach(l=>{l.dataset.tab===r.activeTab?(l.classList.remove("border-transparent","text-slate-500"),l.classList.add("border-brand-600","text-brand-600")):(l.classList.add("border-transparent","text-slate-500"),l.classList.remove("border-brand-600","text-brand-600"))});const o=e.status==="inactive"||e.status==="blocked"||e.status==="deleted";r.activeTab==="cadastro"?(a.innerHTML=`
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
                        <button type="button" data-action="toggle-status" data-id="${e.id}" data-current="${e.status}" class="w-full py-3 ${o?"bg-emerald-600 text-white border-transparent":"bg-white border-rose-200 text-rose-700 hover:bg-rose-600 hover:text-white hover:border-transparent"} font-black text-xs uppercase tracking-widest rounded-xl transition-colors shadow-sm active:scale-95 flex items-center justify-center gap-1.5">
                            <i class="bi ${o?"bi-unlock-fill":"bi-lock-fill"}"></i> ${o?"Desbloquear Ambiente":"Bloquear Sistema"}
                        </button>
                    </div>
                </div>
            </form>
        `,setTimeout(()=>{const l=document.getElementById("edit-plan"),i=e.planId||e.subscription&&e.subscription.planId;l&&i&&(l.value=i)},50)):r.activeTab==="history"&&(a.innerHTML=`
            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col h-full min-h-[400px]">
                <div class="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
                    <h4 class="text-xs font-black text-slate-800 tracking-tight flex items-center gap-2"><i class="bi bi-receipt-cutoff text-emerald-600"></i> Faturas Pagas</h4>
                    <button data-action="add-manual-payment" data-id="${e.id}" class="bg-emerald-600 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 shadow-sm shadow-emerald-500/30 active:scale-95 transition-all flex items-center gap-1"><i class="bi bi-plus-lg"></i> Inserir</button>
                </div>
                
                <div id="payments-wrapper" class="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-3">
                    <div class="loader mx-auto mt-10"></div>
                </div>
            </div>
        `,A(e.id))}function W(e){const s=document.getElementById("payments-wrapper");if(s){if(r.payments.length===0){s.innerHTML=`
            <div class="text-center py-16">
                <div class="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3 border border-slate-100"><i class="bi bi-receipt text-2xl text-slate-300"></i></div>
                <p class="text-sm font-bold text-slate-600">Nenhum pagamento registado.</p>
                <p class="text-xs text-slate-400 mt-1">Os pagamentos desta assinatura aparecerão aqui.</p>
            </div>
        `;return}s.innerHTML=r.payments.map(a=>`
        <div class="flex justify-between items-center p-4 bg-slate-50 border border-slate-200 rounded-xl shadow-sm hover:border-brand-200 hover:bg-white transition-all group">
            <div>
                <p class="text-base font-black text-slate-800 tracking-tight">R$ ${Number(a.amount).toFixed(2)}</p>
                <p class="text-[10px] font-bold text-slate-500 mt-1 uppercase tracking-widest"><i class="bi bi-calendar-check text-emerald-500 mr-1"></i> Data: ${j(a.paymentDate)}</p>
            </div>
            <div class="text-right">
                <span class="bg-emerald-100 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest shadow-sm">Pago</span>
                <p class="text-[9px] font-bold text-slate-400 mt-1.5 uppercase tracking-widest">Via ${b(a.paymentMethod)}</p>
            </div>
        </div>
    `).join("")}}function E(){const e=document.getElementById("slide-panel-overlay"),s=document.getElementById("slide-panel"),a=document.getElementById("modal-container");e.classList.add("opacity-0"),a&&(a.classList.remove("scale-100","opacity-100"),a.classList.add("scale-95","opacity-0")),setTimeout(()=>{e.classList.add("hidden"),s.classList.add("hidden"),s.classList.remove("flex")},300)}async function X(e){const s=e.dataset.id,a={phone:document.getElementById("edit-phone").value,documentInfo:document.getElementById("edit-doc").value,planId:document.getElementById("edit-plan").value,nextDueDate:document.getElementById("edit-due-date").value,gracePeriodDays:document.getElementById("edit-grace-period").value,lastPaymentStatus:document.getElementById("edit-pay-status").value},t=e.innerHTML;e.innerHTML='<div class="loader border-white mr-2 w-4 h-4"></div> Salvando...',e.disabled=!0;try{await p(`/api/admin/tenants/${s}`,{method:"PUT",body:JSON.stringify(a)}),c("Sucesso","Cadastro do cliente salvo com sucesso.","success");const o=r.tenants.findIndex(l=>l.id===s);o>-1&&(r.tenants[o]={...r.tenants[o],...a,document:a.documentInfo},T()),E()}catch(o){c("Erro",o.message,"error"),e.innerHTML=t,e.disabled=!1}}async function K(e){const s=`
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
    `,{modalElement:a,close:t}=q({title:"Registar Fatura Paga",contentHTML:s,maxWidth:"max-w-sm"});a.querySelector("#manual-payment-form").addEventListener("submit",async o=>{o.preventDefault();const l=o.target.querySelector('button[type="submit"]'),i=l.innerHTML;l.innerHTML='<div class="loader border-white w-4 h-4"></div>',l.disabled=!0;const d={amount:document.getElementById("pay-amount").value,paymentDate:document.getElementById("pay-date").value,paymentMethod:document.getElementById("pay-method").value,status:"paid"};try{await p(`/api/admin/tenants/${e}/payments`,{method:"POST",body:JSON.stringify(d)}),c("Sucesso","Pagamento registado. O vencimento foi adiado em 1 mês.","success"),t(),await x(),A(e)}catch(n){c("Erro",n.message,"error"),l.innerHTML=i,l.disabled=!1}})}async function Y(e){if(await k("Atenção MÁXIMA!","Deseja excluir DEFINITIVAMENTE este cliente? A conta ficará invisível, o acesso será bloqueado e ele desaparecerá desta tabela."))try{await p(`/api/admin/tenants/${e}/status`,{method:"PATCH",body:JSON.stringify({status:"deleted"})}),c("Sucesso","Ambiente excluído com sucesso.","success"),r.tenants=r.tenants.filter(a=>a.id!==e),T()}catch(a){c("Erro",a.message,"error")}}async function ee(e){const s=e.dataset.id,a=e.dataset.current==="inactive"||e.dataset.current==="blocked"||e.dataset.current==="deleted"?"active":"blocked";if(!await k("Zona de Risco",`Deseja realmente ${a==="blocked"?"BLOQUEAR":"DESBLOQUEAR"} o acesso de toda esta rede?`))return;const o=e.innerHTML;e.innerHTML='<div class="loader mx-auto border-white w-4 h-4"></div>',e.disabled=!0;try{await p(`/api/admin/tenants/${s}/status`,{method:"PATCH",body:JSON.stringify({status:a})}),c("Sucesso",`Ambiente ${a==="blocked"?"bloqueado":"ativado"}.`,"success"),E(),await x()}catch(l){c("Erro",l.message,"error"),e.innerHTML=o,e.disabled=!1}}async function te(e){const s=e.dataset.id,a=e.innerHTML;e.innerHTML='<div class="loader border-brand-600 mr-2 w-4 h-4"></div> Acedendo...',e.disabled=!0;try{const t=await p(`/api/admin/tenants/${s}/impersonate`,{method:"POST"});t&&t.token&&(localStorage.setItem("impersonateToken",t.token),c("Conectado","A redirecionar...","info"),setTimeout(()=>{window.open("/app.html","_blank"),e.innerHTML=a,e.disabled=!1},1e3))}catch(t){c("Acesso Recusado",t.message,"error"),e.innerHTML=a,e.disabled=!1}}function ae(e){h&&e.removeEventListener("click",h);let s;e.addEventListener("input",t=>{t.target.id==="search-tenant-input"&&(clearTimeout(s),s=setTimeout(()=>{r.searchQuery=t.target.value,r.currentPage=1,x()},500))}),h=t=>{if(t.target.closest("#btn-open-create-modal")){G();return}if(t.target.closest("#btnCloseTenantModal")||t.target.closest("#btnCancelTenant")){L();return}if(t.target.id==="slide-panel-overlay"||t.target.closest("#btn-close-panel")||t.target.closest('[data-action="close-panel"]')){E();return}const o=t.target.closest(".panel-tab");if(o){r.activeTab=o.dataset.tab;const d=document.querySelector('[data-action="update-tenant"], [data-action="toggle-status"], [data-action="add-manual-payment"]')?.dataset.id;if(d){const n=r.tenants.find(u=>u.id===d),m=r.plans.map(u=>`<option value="${u.id}">${b(u.name)}</option>`).join("");D(n,m)}return}const l=t.target.closest("[data-action], #btn-refresh-table");if(!l)return;if(l.id==="btn-refresh-table"){x();return}const i=l.dataset.action;if(i==="delete-tenant"){t.stopPropagation(),Y(l.dataset.id);return}switch(t.preventDefault(),i){case"view-tenant":Z("view",l.dataset.id);break;case"update-tenant":X(l);break;case"toggle-status":ee(l);break;case"impersonate":te(l);break;case"add-manual-payment":K(l.dataset.id);break;case"prev-page":r.currentPage>1&&(r.currentPage--,x());break;case"next-page":r.currentPage<r.totalPages&&(r.currentPage++,x());break}},e.addEventListener("click",h);const a=document.getElementById("formCreateTenant");a&&!a.dataset.listener&&(a.dataset.listener="true",a.addEventListener("submit",async t=>{t.preventDefault();const o=document.getElementById("btnCreateTenant"),l=document.getElementById("feedbackMsg"),i=o.innerHTML;try{o.disabled=!0,o.innerHTML='<div class="loader border-white mr-2 w-4 h-4" style="display:inline-block"></div> Criando...',l.classList.add("hidden");const d=document.querySelector('input[name="newTenantIsNetwork"]:checked'),n={establishmentName:document.getElementById("newTenantName").value,establishmentId:document.getElementById("newTenantId").value,ownerEmail:document.getElementById("newTenantEmail").value,ownerPassword:document.getElementById("newTenantPassword").value,ownerName:document.getElementById("newTenantOwnerName").value,documentInfo:document.getElementById("newTenantDoc").value,phone:document.getElementById("newTenantPhone").value,planId:document.getElementById("newTenantPlan").value,isNetwork:d&&d.value==="true",timezone:Intl.DateTimeFormat().resolvedOptions().timeZone};await p("/api/public/register",{method:"POST",body:JSON.stringify(n)}),c("Fantástico!","Ambiente do cliente criado com sucesso!","success"),L(),x()}catch(d){l.textContent=d.message||"Ocorreu um erro ao criar o cliente.",l.classList.remove("hidden","bg-emerald-50","text-emerald-700","border-emerald-200"),l.classList.add("bg-rose-50","text-rose-700","border-rose-200")}finally{o.disabled=!1,o.innerHTML=i}}))}const se={dashboard:"Visão Geral (Dashboard)",agenda:"Agenda / Calendário",comandas:"Comandas / PDV",relatorios:"Relatórios (Analytics)","sales-report":"Relatório de Vendas",financial:"Financeiro",servicos:"Serviços",produtos:"Produtos",suppliers:"Fornecedores",profissionais:"Profissionais",ausencias:"Ausências e Bloqueios",clientes:"Clientes",packages:"Pacotes de Serviços",commissions:"Comissões",estabelecimento:"Configurações",users:"Usuários Internos",whatsapp:"Integração WhatsApp",mobileApp:"Acesso App Mobile"};let g={plans:[],tempPlanId:null},w=null;async function oe(e){le(e),de(e),await I()}function le(e){e.innerHTML=`
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
                                <th class="p-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">Preço</th>
                                <th class="p-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">Ciclo</th>
                                <th class="p-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">Trial</th>
                                <th class="p-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">Limites (Lojas/Usr/Prof)</th>
                                <th class="p-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">Status</th>
                                <th class="p-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody id="plans-table-body" class="divide-y divide-slate-100">
                            <tr>
                                <td colspan="7" class="py-16 text-center text-slate-400">
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
                                    <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Preço do Período (R$) *</label>
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
                                    <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1" title="Frequência em que o cliente será cobrado">Ciclo de Cobrança *</label>
                                    <select id="plan-interval" required class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm font-black text-slate-800 transition-shadow cursor-pointer">
                                        <option value="1">Mensal</option>
                                        <option value="6">Semestral</option>
                                        <option value="12">Anual</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1" title="Dias grátis de carência antes do Pagar.me fazer a 1ª cobrança no cartão">Dias de Teste (Trial) *</label>
                                    <input type="number" id="plan-trial" required min="0" value="7" class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-lg font-black text-slate-800 transition-shadow" placeholder="Ex: 7">
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
    `}async function I(){const e=document.getElementById("plans-table-body");try{const s=new Date().getTime(),a=await p(`/api/saas/plans?_t=${s}`);g.plans=a||[],re()}catch(s){console.error("Erro ao buscar planos:",s),e&&(e.innerHTML='<tr><td colspan="7" class="py-12 text-center text-rose-500 font-bold text-sm"><i class="bi bi-exclamation-triangle block text-2xl mb-2"></i> Erro ao carregar os planos.</td></tr>')}}function re(){const e=document.getElementById("plans-table-body");if(!e)return;if(g.plans.length===0){e.innerHTML=`
            <tr>
                <td colspan="7" class="py-16 text-center">
                    <div class="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-300 text-2xl"><i class="bi bi-tags"></i></div>
                    <p class="text-sm font-bold text-slate-600">Nenhum plano cadastrado.</p>
                    <p class="text-xs text-slate-400 mt-1">Clique em '+ Novo Plano' para criar as regras de venda.</p>
                </td>
            </tr>`;return}const s=new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}),a=g.plans.map(t=>{const l=t.active!==!1?'<span class="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-widest"><i class="bi bi-check-circle-fill mr-1"></i> Ativo</span>':'<span class="bg-slate-100 text-slate-500 border border-slate-200 px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-widest"><i class="bi bi-pause-circle-fill mr-1"></i> Inativo</span>',i=t.intervalCount===12?"Anual":t.intervalCount===6?"Semestral":"Mensal",d=t.trialDays?`${t.trialDays} dias`:"Sem trial";return`
            <tr class="hover:bg-slate-50 transition-colors group cursor-pointer" data-action="edit-plan" data-id="${t.id}">
                <td class="p-4">
                    <p class="text-sm font-black text-slate-800 group-hover:text-emerald-600 transition-colors">${b(t.name)}</p>
                </td>
                <td class="p-4 text-center">
                    <p class="text-lg font-black text-slate-700">${s.format(t.price)}</p>
                </td>
                <td class="p-4 text-center">
                    <span class="inline-block bg-slate-100 text-slate-600 px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-widest shadow-sm">${i}</span>
                </td>
                <td class="p-4 text-center">
                    <span class="inline-block bg-emerald-50 text-emerald-600 px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-widest shadow-sm">${d}</span>
                </td>
                <td class="p-4 text-center space-y-1">
                    <span class="inline-block bg-indigo-50 text-indigo-700 border border-indigo-200 px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-widest shadow-sm">${t.maxEstablishments||1} Lojas</span>
                    <span class="inline-block bg-blue-50 text-blue-700 border border-blue-200 px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-widest shadow-sm">${t.maxUsers||1} Usrs</span>
                    <span class="inline-block bg-cyan-50 text-cyan-700 border border-cyan-200 px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-widest shadow-sm">${t.maxProfessionals||1} Profs</span>
                </td>
                <td class="p-4 text-center">${l}</td>
                <td class="p-4 text-right">
                    <button data-action="delete-plan" data-id="${t.id}" class="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-200 shadow-sm transition-all active:scale-95 ml-auto">
                        <i class="bi bi-trash3 pointer-events-none"></i>
                    </button>
                </td>
            </tr>
        `}).join("");e.innerHTML=a}function P(e=null){g.tempPlanId=e;const s=document.getElementById("plan-modal");document.getElementById("plan-form").reset();const t=!!e;document.getElementById("modal-title").innerText=t?"Editar Plano SaaS":"Novo Plano SaaS";const o=t?g.plans.find(n=>n.id===e):null;document.getElementById("plan-name").value=o?o.name:"",document.getElementById("plan-price").value=o?o.price:"",document.getElementById("plan-max-ests").value=o&&o.maxEstablishments||1,document.getElementById("plan-max-users").value=o&&o.maxUsers||1,document.getElementById("plan-max-profs").value=o&&o.maxProfessionals||1,document.getElementById("plan-interval").value=o&&o.intervalCount||1,document.getElementById("plan-trial").value=o&&o.trialDays!==void 0?o.trialDays:7;const l=document.getElementById("modules-grid"),i=o?.features||o?.allowedModules||{},d=Array.isArray(i)?i.reduce((n,m)=>({...n,[m]:!0}),{}):i;l.innerHTML=Object.entries(se).map(([n,m])=>{const u=!t||d[n]?"checked":"";return`
            <label class="flex items-center p-3 border border-slate-200 rounded-xl cursor-pointer transition-colors hover:bg-emerald-50/50 hover:border-emerald-300 group shadow-sm bg-slate-50">
                <input type="checkbox" name="plan-modules" value="${n}" ${u} class="w-4 h-4 text-emerald-600 border-slate-300 rounded focus:ring-emerald-500 cursor-pointer">
                <span class="text-xs font-bold text-slate-700 ml-3 group-hover:text-emerald-800">${m}</span>
            </label>
        `}).join(""),s.classList.remove("hidden"),s.style.display="flex",requestAnimationFrame(()=>{s.classList.remove("opacity-0");const n=s.querySelector("#modal-content-wrapper");n&&(n.classList.remove("translate-y-full","md:translate-y-8","md:scale-95","opacity-0"),n.classList.add("translate-y-0","md:scale-100","opacity-100"))})}function H(){const e=document.getElementById("plan-modal");if(!e)return;e.classList.add("opacity-0");const s=e.querySelector("#modal-content-wrapper");s&&(s.classList.remove("translate-y-0","md:scale-100","opacity-100"),s.classList.add("translate-y-full","md:translate-y-8","md:scale-95","opacity-0")),setTimeout(()=>{e.classList.add("hidden"),e.style.display="none",g.tempPlanId=null},300)}async function ie(e){e.preventDefault();const s=document.getElementById("btn-submit-plan"),a=s.innerHTML;s.innerHTML='<div class="loader-small border-white mr-2"></div> Salvando...',s.disabled=!0;const t=[];document.querySelectorAll('input[name="plan-modules"]:checked').forEach(l=>{t.push(l.value)});const o={name:document.getElementById("plan-name").value,price:parseFloat(document.getElementById("plan-price").value),intervalCount:parseInt(document.getElementById("plan-interval").value,10),trialDays:parseInt(document.getElementById("plan-trial").value,10),maxEstablishments:parseInt(document.getElementById("plan-max-ests").value,10),maxUsers:parseInt(document.getElementById("plan-max-users").value,10),maxProfessionals:parseInt(document.getElementById("plan-max-profs").value,10),allowedModules:t,features:t};try{g.tempPlanId?(await p(`/api/saas/plans/${g.tempPlanId}`,{method:"PUT",body:JSON.stringify(o)}),c("Sucesso!","Plano atualizado com sucesso.","success")):(await p("/api/saas/plans",{method:"POST",body:JSON.stringify(o)}),c("Sucesso!","Plano criado com sucesso no SaaS e no Pagar.me.","success")),H(),await I()}catch(l){console.error("Erro ao salvar plano:",l),c("Erro",l.message||"Erro ao salvar o plano.","error")}finally{s.innerHTML=a,s.disabled=!1}}async function ne(e){if(await k("Apagar Plano","Deseja realmente apagar este plano? Clientes antigos continuarão a utilizá-lo, mas não estará disponível para novas vendas."))try{await p(`/api/saas/plans/${e}`,{method:"DELETE"}),c("Sucesso","Plano apagado.","success"),await I()}catch(a){c("Erro",a.message,"error")}}function de(e){w&&e.removeEventListener("click",w),w=a=>{const t=a.target.closest("#btn-close-modal")||a.target.closest("#btn-cancel-modal"),o=a.target.id==="plan-modal";if(t||o){H();return}const l=a.target.closest("[data-action], #btn-new-plan");if(!l)return;if(l.id==="btn-new-plan"){P();return}switch(l.dataset.action){case"edit-plan":a.target.closest('[data-action="delete-plan"]')||P(l.dataset.id);break;case"delete-plan":a.stopPropagation(),ne(l.dataset.id);break}},e.addEventListener("click",w);const s=document.getElementById("plan-form");s&&s.addEventListener("submit",ie)}R();document.getElementById("btn-logout").addEventListener("click",O);const S=document.querySelectorAll(".menu-item"),f=document.getElementById("dynamic-content"),ce=document.getElementById("page-title"),$=["bg-brand-600","text-white","shadow-md","shadow-brand-500/20"],B=["hover:bg-sidebarHover","hover:text-white"];S.forEach(e=>{e.addEventListener("click",async s=>{s.preventDefault(),S.forEach(l=>{l.classList.remove(...$),l.classList.add(...B);const i=l.querySelector("i");i&&i.classList.replace("text-white","text-slate-400")});const a=s.currentTarget;a.classList.remove(...B),a.classList.add(...$);const t=a.querySelector("i");t&&t.classList.replace("text-slate-400","text-white"),ce.innerText=a.innerText.trim(),v&&(document.getElementById("user-role-display").innerText=v);const o=a.getAttribute("href").replace("#","");f.innerHTML='<div class="flex h-full items-center justify-center"><div class="loader"></div></div>',setTimeout(async()=>{o==="dashboard"?await U(f):o==="establishments"?await _(f):o==="financial"?await oe(f):f.innerHTML=`
                            <div class="flex flex-col items-center justify-center h-full text-slate-400">
                                <i class="bi bi-tools text-5xl mb-4 opacity-30"></i>
                                <h3 class="text-lg font-bold text-slate-600">Módulo em Desenvolvimento</h3>
                                <p class="text-sm mt-1">A seção "${o}" estará disponível em breve.</p>
                            </div>
                        `},300)})});setTimeout(()=>{const e=document.querySelector('.menu-item[href="#dashboard"]');e&&e.click()},1e3);
