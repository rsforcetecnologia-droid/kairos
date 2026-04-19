import"./modulepreload-polyfill-B5Qt9EMX.js";import{a as y}from"./firebase-config-C2tbVz-J.js";import{onAuthStateChanged as B,signOut as I}from"https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";import{a as b,b as c,s as M,e as p}from"./utils-JfzC6GFr.js";import"https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";import"https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";import"https://www.gstatic.com/firebasejs/11.6.1/firebase-storage.js";import"https://www.gstatic.com/firebasejs/11.6.1/firebase-messaging.js";const $={super_admin:["dashboard","establishments","whatsapp","financial","team","settings"],support:["establishments","whatsapp"],financial:["dashboard","establishments","financial"],developer:["whatsapp","settings"]};let h=null;function j(){document.body.style.display="none",B(y,async e=>{if(e)try{let t=(await e.getIdTokenResult()).claims.role;t==="super-admin"&&(t="super_admin"),t&&$[t]?(h=t,console.log("🛡️ Acesso Seguro Concedido! Perfil:",h),z(h),document.body.style.display="flex"):(console.error("🚨 Intruso detectado: Conta sem cargo de gestão."),await I(y),window.location.href="admin-login.html")}catch(s){console.error("Erro ao verificar permissões de segurança:",s),window.location.href="admin-login.html"}else window.location.href="admin-login.html"})}function z(e){const s=$[e]||[];document.querySelectorAll("[data-module]").forEach(a=>{const i=a.getAttribute("data-module");s.includes(i)||a.remove()})}async function N(){try{await I(y),window.location.href="admin-login.html"}catch(e){console.error("Erro ao sair do sistema:",e)}}const C=e=>new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(e||0);async function H(e){e.innerHTML=`
        <div class="flex flex-col items-center justify-center h-full text-slate-400">
            <div class="loader mb-4"></div>
            <p class="font-medium text-sm animate-pulse">A carregar métricas do SaaS...</p>
        </div>
    `;try{const s=await b("/api/admin/dashboard-stats");if(!s||!s.kpis)throw new Error("Dados de KPIs não retornados pela API.");const{kpis:t}=s,a=Math.max(...t.newSubscribersData,1),i=t.newSubscribersData.map(r=>`
                <div class="group relative flex-1 flex items-end justify-center h-full">
                    <div class="w-full bg-brand-200 hover:bg-brand-500 transition-colors rounded-t-sm" style="height: ${r/a*100}%"></div>
                    <div class="opacity-0 group-hover:opacity-100 absolute -top-8 bg-slate-800 text-white text-[10px] py-1 px-2 rounded font-bold transition-opacity whitespace-nowrap z-10 pointer-events-none">
                        ${r} novos
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
                        <h3 class="text-3xl font-black text-slate-800 relative z-10 tracking-tight">${C(t.mrr)}</h3>
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
                                +${t.newSubscribersData.reduce((r,n)=>r+n,0)}
                            </div>
                        </div>
                        
                        <div class="flex-1 min-h-[160px] flex items-end gap-1 pb-2 pt-8 border-b border-slate-100">
                            ${i}
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
        `}}let l={tenants:[],plans:[],searchQuery:"",currentPage:1,limit:20,totalPages:1};async function q(e){R(e),J(e),await Promise.all([D(),u()])}function R(e){e.innerHTML=`
        <div class="h-full flex flex-col w-full relative font-sans animate-fade-in">
            
            <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                    <h2 class="text-2xl font-black text-slate-800 tracking-tight">Gestão de Inquilinos (Redes)</h2>
                    <p class="text-sm text-slate-500 font-medium mt-1">Gira os clientes da plataforma, planos e acessos Master.</p>
                </div>
                <button id="btn-open-wizard" class="bg-brand-600 text-white px-5 py-3 rounded-xl font-bold text-sm hover:bg-brand-700 shadow-md shadow-brand-500/30 active:scale-95 transition-all flex items-center gap-2">
                    <i class="bi bi-building-add text-lg"></i> Novo Cliente (Rede)
                </button>
            </div>

            <div class="bg-white p-2 rounded-2xl shadow-sm border border-slate-200 mb-4 flex items-center">
                <i class="bi bi-search text-slate-400 ml-3 text-lg"></i>
                <input type="text" id="search-tenant-input" placeholder="Pesquisar por nome da empresa, NIF, email..." class="w-full bg-transparent border-none p-3 outline-none text-sm font-bold text-slate-700 placeholder-slate-400">
                <div class="border-l border-slate-200 pl-2 ml-2">
                    <button id="btn-refresh-table" class="w-10 h-10 flex items-center justify-center rounded-xl text-slate-400 hover:text-brand-600 hover:bg-brand-50 transition-colors">
                        <i class="bi bi-arrow-clockwise text-lg"></i>
                    </button>
                </div>
            </div>

            <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex-1 flex flex-col min-h-0">
                <div class="overflow-x-auto flex-1 custom-scrollbar">
                    <table class="w-full text-left border-collapse whitespace-nowrap">
                        <thead class="bg-slate-50 border-b border-slate-200 sticky top-0 z-10">
                            <tr>
                                <th class="p-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Empresa (Rede)</th>
                                <th class="p-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Responsável (Master)</th>
                                <th class="p-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">Plano SaaS</th>
                                <th class="p-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">Status</th>
                                <th class="p-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody id="tenants-table-body" class="divide-y divide-slate-100">
                            <tr>
                                <td colspan="5" class="py-16 text-center text-slate-400">
                                    <div class="loader mx-auto mb-3 border-brand-500"></div>
                                    <p class="text-xs font-bold uppercase tracking-widest">A carregar Inquilinos...</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div id="pagination-container" class="bg-slate-50 border-t border-slate-200 p-3 flex justify-between items-center px-6"></div>
            </div>

            <div id="slide-panel-overlay" class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 hidden opacity-0 transition-opacity duration-300"></div>

            <div id="slide-panel" class="fixed top-0 right-0 h-full w-full max-w-[500px] bg-white z-50 shadow-[-10px_0_30px_rgba(0,0,0,0.1)] transform translate-x-full transition-transform duration-300 flex flex-col">
                <div class="px-6 py-5 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
                    <div>
                        <h3 id="panel-title" class="text-lg font-black text-slate-800 tracking-tight">Novo Inquilino</h3>
                        <p id="panel-subtitle" class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Configuração de Ambiente</p>
                    </div>
                    <button id="btn-close-panel" class="w-10 h-10 flex items-center justify-center rounded-full bg-slate-200 text-slate-600 hover:bg-slate-300 transition-colors active:scale-95">
                        <i class="bi bi-x-lg"></i>
                    </button>
                </div>
                
                <div id="panel-content" class="flex-1 overflow-y-auto p-6 custom-scrollbar">
                    </div>
                
                <div id="panel-footer" class="p-5 border-t border-slate-200 bg-slate-50 flex gap-3 justify-end">
                    </div>
            </div>
        </div>
    `}async function D(){try{const e=await b("/api/admin/plans");l.plans=e||[]}catch(e){console.error("Erro ao buscar planos:",e),c("Erro","Falha ao carregar a lista de planos SaaS do sistema.","error")}}async function u(){const e=document.getElementById("tenants-table-body"),s=document.getElementById("pagination-container");e&&(e.innerHTML='<tr><td colspan="5" class="py-12 text-center"><div class="loader mx-auto border-brand-500 mb-2"></div><p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Atualizando...</p></td></tr>');try{let t=`/api/admin/tenants?page=${l.currentPage}&limit=${l.limit}`;l.searchQuery&&(t+=`&search=${encodeURIComponent(l.searchQuery)}`);const a=await b(t);l.tenants=a.data||[],l.totalPages=a.pagination.totalPages||1,O(),F(s)}catch(t){console.error("Erro ao buscar inquilinos:",t),e&&(e.innerHTML='<tr><td colspan="5" class="py-12 text-center text-rose-500 font-bold text-sm"><i class="bi bi-exclamation-triangle block text-2xl mb-2"></i> Erro ao carregar os clientes.</td></tr>')}}function O(){const e=document.getElementById("tenants-table-body");if(!e)return;if(l.tenants.length===0){e.innerHTML=`
            <tr>
                <td colspan="5" class="py-16 text-center">
                    <div class="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-300 text-2xl"><i class="bi bi-buildings"></i></div>
                    <p class="text-sm font-bold text-slate-600">Nenhum cliente encontrado.</p>
                    <p class="text-xs text-slate-400 mt-1">Tente pesquisar com outro termo ou cadastre uma nova rede.</p>
                </td>
            </tr>`;return}const s=new Map(l.plans.map(a=>[a.id,a.name])),t=l.tenants.map(a=>{const r=a.status==="inactive"||a.status==="blocked"?'<span class="bg-rose-50 text-rose-700 border border-rose-200 px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-widest"><i class="bi bi-lock-fill mr-1"></i> Bloqueado</span>':'<span class="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-widest"><i class="bi bi-check-circle-fill mr-1"></i> Ativo</span>',n=s.get(a.planId)||"Plano Personalizado";return`
            <tr class="hover:bg-slate-50 transition-colors group cursor-pointer" data-action="view-tenant" data-id="${a.id}">
                <td class="p-4">
                    <p class="text-sm font-bold text-slate-800 group-hover:text-brand-600 transition-colors">${p(a.name)}</p>
                    <p class="text-[10px] text-slate-500 font-semibold mt-0.5"><i class="bi bi-file-earmark-text mr-1 opacity-50"></i>NIF/CNPJ: ${p(a.document||"Não ind.")}</p>
                </td>
                <td class="p-4">
                    <p class="text-xs font-bold text-slate-700"><i class="bi bi-person-fill mr-1 text-slate-400"></i> ${p(a.ownerEmail||"Desconhecido")}</p>
                </td>
                <td class="p-4 text-center">
                    <span class="bg-slate-100 text-slate-600 border border-slate-200 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-sm">${p(n)}</span>
                </td>
                <td class="p-4 text-center">${r}</td>
                <td class="p-4 text-right">
                    <button class="bg-white border border-slate-200 text-slate-600 px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm hover:bg-brand-50 hover:text-brand-600 hover:border-brand-200 transition-all active:scale-95">
                        Gerir
                    </button>
                </td>
            </tr>
        `}).join("");e.innerHTML=t}function F(e){if(e){if(l.totalPages<=1){e.innerHTML="";return}e.innerHTML=`
        <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Pág. ${l.currentPage} de ${l.totalPages}</span>
        <div class="flex gap-2">
            <button data-action="prev-page" class="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 shadow-sm disabled:opacity-50 transition-colors" ${l.currentPage<=1?"disabled":""}>
                <i class="bi bi-chevron-left"></i>
            </button>
            <button data-action="next-page" class="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 shadow-sm disabled:opacity-50 transition-colors" ${l.currentPage>=l.totalPages?"disabled":""}>
                <i class="bi bi-chevron-right"></i>
            </button>
        </div>
    `}}function E(e,s=null){const t=document.getElementById("slide-panel-overlay"),a=document.getElementById("slide-panel"),i=document.getElementById("panel-title"),r=document.getElementById("panel-content"),n=document.getElementById("panel-footer");if(t.classList.remove("hidden"),requestAnimationFrame(()=>{t.classList.remove("opacity-0"),a.classList.remove("translate-x-full")}),e==="create"){i.innerText="Nova Assinatura (SaaS)";const d=l.plans.map(o=>`<option value="${o.id}">${p(o.name)} - (Max: ${o.maxEstablishments} Lojas)</option>`).join("");r.innerHTML=`
            <form id="wizard-form" class="space-y-6">
                <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                    <h4 class="text-[10px] font-black text-brand-600 uppercase tracking-widest mb-4 flex items-center gap-2"><i class="bi bi-1-circle-fill text-sm"></i> Dados da Empresa</h4>
                    <div class="space-y-4">
                        <div>
                            <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Nome Fantasia / Rede *</label>
                            <input type="text" id="wiz-company" required class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none text-sm font-bold text-slate-800 transition-shadow">
                        </div>
                        <div>
                            <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">NIF / CNPJ (Opcional)</label>
                            <input type="text" id="wiz-doc" class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none text-sm font-bold text-slate-800 transition-shadow">
                        </div>
                    </div>
                </div>

                <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                    <h4 class="text-[10px] font-black text-brand-600 uppercase tracking-widest mb-4 flex items-center gap-2"><i class="bi bi-2-circle-fill text-sm"></i> Acesso Master (Dono)</h4>
                    <div class="space-y-4">
                        <div>
                            <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Nome do Proprietário *</label>
                            <input type="text" id="wiz-name" required class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none text-sm font-bold text-slate-800 transition-shadow">
                        </div>
                        <div>
                            <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">E-mail (Login) *</label>
                            <input type="email" id="wiz-email" required class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none text-sm font-bold text-slate-800 transition-shadow">
                        </div>
                        <div class="grid grid-cols-2 gap-3">
                            <div>
                                <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Senha Inicial *</label>
                                <input type="text" id="wiz-password" required value="kairos123" class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none text-sm font-bold text-slate-800 transition-shadow">
                            </div>
                            <div>
                                <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">WhatsApp</label>
                                <input type="text" id="wiz-phone" class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none text-sm font-bold text-slate-800 transition-shadow">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm border-l-4 border-l-brand-500">
                    <h4 class="text-[10px] font-black text-brand-600 uppercase tracking-widest mb-4 flex items-center gap-2"><i class="bi bi-3-circle-fill text-sm"></i> Faturação e Limites</h4>
                    <div>
                        <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Plano Base *</label>
                        <select id="wiz-plan" required class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none text-sm font-bold text-slate-800 transition-shadow cursor-pointer">
                            <option value="">Selecione o plano...</option>
                            ${d}
                        </select>
                        <p class="text-[9px] text-slate-400 mt-2 ml-1 font-medium"><i class="bi bi-info-circle"></i> O plano define quantos estabelecimentos (filiais) este cliente pode criar no sistema dele.</p>
                    </div>
                </div>
            </form>
        `,n.innerHTML=`
            <button data-action="close-panel" class="px-5 py-3 rounded-xl font-bold text-sm text-slate-600 bg-white border border-slate-300 hover:bg-slate-50 transition-colors">Cancelar</button>
            <button data-action="submit-wizard" class="px-6 py-3 rounded-xl font-bold text-sm text-white bg-brand-600 hover:bg-brand-700 shadow-md shadow-brand-500/30 transition-all flex items-center gap-2 active:scale-95">
                <i class="bi bi-check2-circle text-lg"></i> Criar Inquilino (Tenant)
            </button>
        `}else if(e==="view"&&s){const d=l.tenants.find(f=>f.id===s);if(!d)return;i.innerText="Detalhes do Inquilino";const o=d.status==="inactive"||d.status==="blocked",x=l.plans.find(f=>f.id===d.planId)?.name||"Plano Personalizado";r.innerHTML=`
            <div class="text-center mb-8">
                <div class="w-20 h-20 bg-slate-100 rounded-2xl mx-auto flex items-center justify-center text-3xl text-slate-300 border border-slate-200 shadow-inner mb-4">
                    <i class="bi bi-buildings-fill"></i>
                </div>
                <h2 class="text-xl font-black text-slate-800 tracking-tight">${p(d.name)}</h2>
                <p class="text-xs font-bold text-slate-500 mt-1 uppercase tracking-widest bg-slate-100 inline-block px-3 py-1 rounded-full border border-slate-200">Plano: ${p(x)}</p>
            </div>

            <div class="space-y-4">
                <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div class="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center flex-shrink-0"><i class="bi bi-person-fill text-lg"></i></div>
                    <div class="flex-1 min-w-0">
                        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Dono / Responsável</p>
                        <p class="text-sm font-bold text-slate-800 truncate">${p(d.ownerEmail)}</p>
                    </div>
                </div>

                <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div class="w-10 h-10 rounded-full bg-slate-50 text-slate-500 flex items-center justify-center flex-shrink-0"><i class="bi bi-file-earmark-text text-lg"></i></div>
                    <div class="flex-1 min-w-0">
                        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">NIF / CNPJ</p>
                        <p class="text-sm font-bold text-slate-800 truncate">${p(d.document||"Não fornecido")}</p>
                    </div>
                </div>

                <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div class="w-10 h-10 rounded-full ${o?"bg-rose-50 text-rose-500":"bg-emerald-50 text-emerald-500"} flex items-center justify-center flex-shrink-0">
                        <i class="bi ${o?"bi-lock-fill":"bi-check-circle-fill"} text-lg"></i>
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Status do Sistema</p>
                        <p class="text-sm font-black ${o?"text-rose-600":"text-emerald-600"} truncate uppercase tracking-widest">${o?"Acesso Suspenso":"Ambiente Ativo"}</p>
                    </div>
                </div>
            </div>

            <div class="mt-8 bg-indigo-50 border border-indigo-100 rounded-2xl p-5 shadow-sm">
                <h4 class="text-xs font-black text-indigo-800 uppercase tracking-widest mb-2 flex items-center gap-2"><i class="bi bi-headset"></i> Modo de Suporte</h4>
                <p class="text-[10px] text-indigo-600 font-medium mb-4 leading-relaxed">Assuma a identidade deste cliente temporariamente. O painel será aberto exatamente como o cliente o vê, permitindo-lhe investigar problemas ou configurar o ambiente para ele.</p>
                <button data-action="impersonate" data-id="${d.id}" class="w-full py-3.5 bg-white border border-indigo-200 text-indigo-700 font-black rounded-xl hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all shadow-sm flex items-center justify-center gap-2 active:scale-95">
                    <i class="bi bi-box-arrow-in-right text-lg"></i> Entrar como o Cliente
                </button>
            </div>
        `,n.innerHTML=`
            <button data-action="close-panel" class="px-5 py-3 rounded-xl font-bold text-sm text-slate-600 bg-white border border-slate-300 hover:bg-slate-50 transition-colors">Fechar</button>
            <button data-action="toggle-status" data-id="${d.id}" data-current="${d.status}" class="px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-sm active:scale-95 flex items-center gap-2 ${o?"bg-emerald-600 text-white hover:bg-emerald-700":"bg-rose-100 text-rose-700 border border-rose-200 hover:bg-rose-200"}">
                <i class="bi ${o?"bi-unlock-fill":"bi-lock-fill"}"></i> ${o?"Restaurar Acesso":"Suspender Cliente"}
            </button>
        `}}function v(){const e=document.getElementById("slide-panel-overlay");document.getElementById("slide-panel").classList.add("translate-x-full"),e.classList.add("opacity-0"),setTimeout(()=>{e.classList.add("hidden")},300)}async function U(e){const s=document.getElementById("wizard-form");if(!s.checkValidity()){s.reportValidity();return}const t={companyName:document.getElementById("wiz-company").value,documentInfo:document.getElementById("wiz-doc").value,adminName:document.getElementById("wiz-name").value,adminEmail:document.getElementById("wiz-email").value,adminPassword:document.getElementById("wiz-password").value,adminPhone:document.getElementById("wiz-phone").value,planId:document.getElementById("wiz-plan").value},a=e.innerHTML;e.innerHTML='<div class="loader-small border-white mr-2"></div> Criando Ambiente...',e.disabled=!0;try{const i=await b("/api/admin/tenants",{method:"POST",body:JSON.stringify(t)});c("Fantástico!",`A rede de ${t.companyName} foi criada e o utilizador Master já tem acesso.`,"success"),v(),await u()}catch(i){c("Erro na Criação",i.message,"error"),e.innerHTML=a,e.disabled=!1}}async function _(e){const s=e.dataset.id,t=e.dataset.current,a=t==="inactive"||t==="blocked"?"active":"blocked";if(await M("Alterar Status do Cliente",`Deseja realmente ${a==="blocked"?"BLOQUEAR":"DESBLOQUEAR"} esta rede? Isso afetará todas as filiais ligadas a esta conta e desconectará o cliente.`))try{const n=e.innerHTML;e.innerHTML='<div class="loader-small mx-auto border-current"></div>',e.disabled=!0,await b(`/api/admin/tenants/${s}/status`,{method:"PATCH",body:JSON.stringify({status:a})}),c("Sucesso",`O ambiente foi ${a==="blocked"?"bloqueado":"ativado"}.`,"success"),v(),await u()}catch(n){c("Erro",n.message,"error"),v()}}async function V(e){const s=e.dataset.id;try{const t=e.innerHTML;e.innerHTML='<div class="loader-small border-indigo-600 mr-2"></div> Conectando...',e.disabled=!0;const a=await b(`/api/admin/tenants/${s}/impersonate`,{method:"POST"});a&&a.token&&(localStorage.setItem("impersonateToken",a.token),c("Conectado","A redirecionar para o painel do cliente...","info"),setTimeout(()=>{window.open("/app.html","_blank"),e.innerHTML=t,e.disabled=!1},1e3))}catch(t){c("Acesso Recusado",t.message,"error"),e.innerHTML='<i class="bi bi-box-arrow-in-right text-lg"></i> Entrar como o Cliente',e.disabled=!1}}function J(e){let s;e.addEventListener("input",t=>{t.target.id==="search-tenant-input"&&(clearTimeout(s),s=setTimeout(()=>{l.searchQuery=t.target.value,l.currentPage=1,u()},500))}),e.addEventListener("click",t=>{const a=t.target.closest("[data-action]");if(a){switch(t.preventDefault(),a.dataset.action){case"close-panel":v();break;case"view-tenant":E("view",a.dataset.id);break;case"submit-wizard":U(a);break;case"toggle-status":_(a);break;case"impersonate":V(a);break;case"prev-page":l.currentPage>1&&(l.currentPage--,u());break;case"next-page":l.currentPage<l.totalPages&&(l.currentPage++,u());break}return}if(t.target.closest("#btn-open-wizard")){E("create");return}if(t.target.closest("#btn-refresh-table")){u();return}t.target.id==="slide-panel-overlay"&&v()})}const Q={dashboard:"Visão Geral (Dashboard)",agenda:"Agenda / Calendário",comandas:"Comandas / PDV",relatorios:"Relatórios (Analytics)","sales-report":"Relatório de Vendas",financial:"Financeiro",servicos:"Serviços",produtos:"Produtos",suppliers:"Fornecedores",profissionais:"Profissionais",ausencias:"Ausências e Bloqueios",clientes:"Clientes",packages:"Pacotes de Serviços",commissions:"Comissões",estabelecimento:"Configurações",users:"Usuários Internos",whatsapp:"Integração WhatsApp",mobileApp:"Acesso App Mobile"};let m={plans:[],tempPlanId:null},w=null;async function G(e){W(e),Z(e),await k()}function W(e){e.innerHTML=`
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
                                <th class="p-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">Limite de Unidades</th>
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
                            <i class="bi bi-x-lg"></i>
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
                                    <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1" title="Quantas filiais este plano permite criar?">Máx. Lojas (Filiais) *</label>
                                    <input type="number" id="plan-max-ests" required min="1" class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-lg font-black text-slate-800 transition-shadow" placeholder="Ex: 1, 3, 999...">
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
    `}async function k(){const e=document.getElementById("plans-table-body");try{const s=await b("/api/admin/plans");m.plans=s||[],K()}catch(s){console.error("Erro ao buscar planos:",s),e&&(e.innerHTML='<tr><td colspan="5" class="py-12 text-center text-rose-500 font-bold text-sm"><i class="bi bi-exclamation-triangle block text-2xl mb-2"></i> Erro ao carregar os planos.</td></tr>')}}function K(){const e=document.getElementById("plans-table-body");if(!e)return;if(m.plans.length===0){e.innerHTML=`
            <tr>
                <td colspan="5" class="py-16 text-center">
                    <div class="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-300 text-2xl"><i class="bi bi-tags"></i></div>
                    <p class="text-sm font-bold text-slate-600">Nenhum plano cadastrado.</p>
                    <p class="text-xs text-slate-400 mt-1">Clique em '+ Novo Plano' para criar as regras de venda.</p>
                </td>
            </tr>`;return}const s=new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}),t=m.plans.map(a=>{const r=a.active!==!1?'<span class="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-widest"><i class="bi bi-check-circle-fill mr-1"></i> Ativo</span>':'<span class="bg-slate-100 text-slate-500 border border-slate-200 px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-widest"><i class="bi bi-pause-circle-fill mr-1"></i> Inativo</span>';return`
            <tr class="hover:bg-slate-50 transition-colors group cursor-pointer" data-action="edit-plan" data-id="${a.id}">
                <td class="p-4">
                    <p class="text-sm font-black text-slate-800 group-hover:text-emerald-600 transition-colors">${p(a.name)}</p>
                </td>
                <td class="p-4 text-center">
                    <p class="text-lg font-black text-slate-700">${s.format(a.price)}</p>
                </td>
                <td class="p-4 text-center">
                    <span class="bg-indigo-50 text-indigo-700 border border-indigo-200 px-3 py-1.5 rounded-lg text-[11px] font-black uppercase tracking-widest shadow-sm">${a.maxEstablishments||1} Lojas Max.</span>
                </td>
                <td class="p-4 text-center">${r}</td>
                <td class="p-4 text-right">
                    <button data-action="delete-plan" data-id="${a.id}" class="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-200 shadow-sm transition-all active:scale-95 ml-auto">
                        <i class="bi bi-trash3"></i>
                    </button>
                </td>
            </tr>
        `}).join("");e.innerHTML=t}function L(e=null){m.tempPlanId=e;const s=document.getElementById("plan-modal");document.getElementById("plan-form").reset();const a=!!e;document.getElementById("modal-title").innerText=a?"Editar Plano SaaS":"Novo Plano SaaS";const i=a?m.plans.find(o=>o.id===e):null;a&&i?(document.getElementById("plan-name").value=i.name||"",document.getElementById("plan-price").value=i.price||0,document.getElementById("plan-max-ests").value=i.maxEstablishments||1):document.getElementById("plan-max-ests").value=1;const r=document.getElementById("modules-grid"),n=i?.features||i?.allowedModules||{},d=Array.isArray(n)?n.reduce((o,x)=>({...o,[x]:!0}),{}):n;r.innerHTML=Object.entries(Q).map(([o,x])=>{const f=!a||d[o]?"checked":"";return`
            <label class="flex items-center p-3 border border-slate-200 rounded-xl cursor-pointer transition-colors hover:bg-emerald-50/50 hover:border-emerald-300 group shadow-sm bg-slate-50">
                <input type="checkbox" name="plan-modules" value="${o}" ${f} class="w-4 h-4 text-emerald-600 border-slate-300 rounded focus:ring-emerald-500 cursor-pointer">
                <span class="text-xs font-bold text-slate-700 ml-3 group-hover:text-emerald-800">${x}</span>
            </label>
        `}).join(""),s.classList.remove("hidden"),s.style.display="flex",requestAnimationFrame(()=>{s.classList.remove("opacity-0");const o=s.querySelector("#modal-content-wrapper");o&&(o.classList.remove("translate-y-full","md:translate-y-8","md:scale-95","opacity-0"),o.classList.add("translate-y-0","md:scale-100","opacity-100"))})}function A(){const e=document.getElementById("plan-modal");if(!e)return;e.classList.add("opacity-0");const s=e.querySelector("#modal-content-wrapper");s&&(s.classList.remove("translate-y-0","md:scale-100","opacity-100"),s.classList.add("translate-y-full","md:translate-y-8","md:scale-95","opacity-0")),setTimeout(()=>{e.classList.add("hidden"),e.style.display="none",m.tempPlanId=null},300)}async function Y(e){e.preventDefault();const s=document.getElementById("btn-submit-plan"),t=s.innerHTML;s.innerHTML='<div class="loader-small border-white mr-2"></div> Salvando...',s.disabled=!0;const a=[];document.querySelectorAll('input[name="plan-modules"]:checked').forEach(r=>{a.push(r.value)});const i={name:document.getElementById("plan-name").value,price:parseFloat(document.getElementById("plan-price").value),maxEstablishments:parseInt(document.getElementById("plan-max-ests").value,10),features:a};try{m.tempPlanId?(await b(`/api/admin/plans/${m.tempPlanId}`,{method:"PUT",body:JSON.stringify(i)}),c("Sucesso!","Plano atualizado com sucesso.","success")):(await b("/api/admin/plans",{method:"POST",body:JSON.stringify(i)}),c("Sucesso!","Plano criado com sucesso.","success")),A(),await k()}catch(r){console.error("Erro ao salvar plano:",r),c("Erro",r.message||"Erro ao salvar o plano.","error")}finally{s.innerHTML=t,s.disabled=!1}}async function X(e){if(await M("Desativar Plano","Deseja realmente desativar este plano? Clientes antigos continuarão a utilizá-lo, mas não estará disponível para novas vendas."))try{await b(`/api/admin/plans/${e}`,{method:"DELETE"}),c("Sucesso","Plano desativado.","success"),await k()}catch(t){c("Erro",t.message,"error")}}function Z(e){w&&e.removeEventListener("click",w),w=t=>{if(t.target.id==="btn-close-modal"||t.target.id==="btn-cancel-modal"||t.target.id==="plan-modal"){A();return}const a=t.target.closest("[data-action], #btn-new-plan");if(!a)return;if(a.id==="btn-new-plan"){L();return}switch(a.dataset.action){case"edit-plan":t.target.closest('[data-action="delete-plan"]')||L(a.dataset.id);break;case"delete-plan":t.stopPropagation(),X(a.dataset.id);break}},e.addEventListener("click",w);const s=document.getElementById("plan-form");s&&s.addEventListener("submit",Y)}j();document.getElementById("btn-logout").addEventListener("click",N);const P=document.querySelectorAll(".menu-item"),g=document.getElementById("dynamic-content"),ee=document.getElementById("page-title"),S=["bg-brand-600","text-white","shadow-md","shadow-brand-500/20"],T=["hover:bg-sidebarHover","hover:text-white"];P.forEach(e=>{e.addEventListener("click",async s=>{s.preventDefault(),P.forEach(r=>{r.classList.remove(...S),r.classList.add(...T);const n=r.querySelector("i");n&&n.classList.replace("text-white","text-slate-400")});const t=s.currentTarget;t.classList.remove(...T),t.classList.add(...S);const a=t.querySelector("i");a&&a.classList.replace("text-slate-400","text-white"),ee.innerText=t.innerText.trim(),h&&(document.getElementById("user-role-display").innerText=h);const i=t.getAttribute("href").replace("#","");g.innerHTML='<div class="flex h-full items-center justify-center"><div class="loader"></div></div>',setTimeout(async()=>{i==="dashboard"?await H(g):i==="establishments"?await q(g):i==="financial"?await G(g):g.innerHTML=`
                            <div class="flex flex-col items-center justify-center h-full text-slate-400">
                                <i class="bi bi-tools text-5xl mb-4 opacity-30"></i>
                                <h3 class="text-lg font-bold text-slate-600">Módulo em Desenvolvimento</h3>
                                <p class="text-sm mt-1">A seção "${i}" estará disponível em breve.</p>
                            </div>
                        `},300)})});setTimeout(()=>{const e=document.querySelector('.menu-item[href="#dashboard"]');e&&e.click()},1e3);
