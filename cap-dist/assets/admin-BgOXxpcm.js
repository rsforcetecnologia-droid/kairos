import"./modulepreload-polyfill-B5Qt9EMX.js";import{a as k,d as u}from"./firebase-config-C2tbVz-J.js";import{onAuthStateChanged as N,signOut as L}from"https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";import{collection as y,getDocs as b,query as A,where as S,doc as E,updateDoc as I,addDoc as $,deleteDoc as R}from"https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";import"https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";import"https://www.gstatic.com/firebasejs/11.6.1/firebase-storage.js";import"https://www.gstatic.com/firebasejs/11.6.1/firebase-messaging.js";const D={super_admin:["dashboard","establishments","whatsapp","financial","team","settings"],support:["establishments","whatsapp"],financial:["dashboard","establishments","financial"],developer:["whatsapp","settings"]};let x=null;function j(){document.body.style.display="none",N(k,async t=>{if(t)try{let n=(await t.getIdTokenResult()).claims.role;n==="super-admin"&&(n="super_admin"),n&&D[n]?(x=n,console.log("🛡️ Acesso Seguro Concedido! Perfil:",x),q(x),document.body.style.display="flex"):(console.error("🚨 Intruso detectado: Conta sem cargo de gestão."),await L(k),window.location.href="admin-login.html")}catch(e){console.error("Erro ao verificar permissões de segurança:",e),window.location.href="admin-login.html"}else window.location.href="admin-login.html"})}function q(t){const e=D[t]||[];document.querySelectorAll("[data-module]").forEach(o=>{const i=o.getAttribute("data-module");e.includes(i)||o.remove()})}async function F(){try{await L(k),window.location.href="admin-login.html"}catch(t){console.error("Erro ao sair do sistema:",t)}}async function U(t){t.innerHTML=`
        <div style="display: flex; flex-direction: column; gap: 20px;">
            <h3 style="color: #374151; font-size: 1.5rem; font-weight: 600; margin-bottom: 10px;">📊 Visão Geral do Negócio</h3>
            <div id="dashboard-metrics" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px;">
                <p style="color: #6b7280;">A procurar métricas no banco de dados...</p>
            </div>
        </div>
    `;try{const e=document.getElementById("dashboard-metrics"),n=y(u,"establishments"),[o,i,d]=await Promise.all([b(n),b(A(n,S("status","==","active"))),b(A(n,S("status","==","blocked")))]),s=o.size,l=i.size,m=d.size;let p=0;i.forEach(c=>{const r=c.data(),g=parseFloat(r.planPrice)||0;p+=g});const a=new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(p);e.innerHTML=`
            <div style="background: #ffffff; padding: 25px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border-left: 5px solid #6b7280;">
                <h4 style="font-size: 0.85rem; color: #6b7280; text-transform: uppercase; margin: 0;">Total Cadastrados</h4>
                <div style="font-size: 2.2rem; font-weight: 700; color: #111827; margin-top: 10px;">${s}</div>
            </div>

            <div style="background: #ffffff; padding: 25px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border-left: 5px solid #10b981;">
                <h4 style="font-size: 0.85rem; color: #6b7280; text-transform: uppercase; margin: 0;">Assinaturas Ativas</h4>
                <div style="font-size: 2.2rem; font-weight: 700; color: #10b981; margin-top: 10px;">${l}</div>
            </div>

            <div style="background: #ffffff; padding: 25px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border-left: 5px solid #3b82f6;">
                <h4 style="font-size: 0.85rem; color: #6b7280; text-transform: uppercase; margin: 0;">Receita Mensal (MRR)</h4>
                <div style="font-size: 2.2rem; font-weight: 700; color: #3b82f6; margin-top: 10px;">${a}</div>
            </div>

            <div style="background: #ffffff; padding: 25px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border-left: 5px solid #ef4444;">
                <h4 style="font-size: 0.85rem; color: #6b7280; text-transform: uppercase; margin: 0;">Clientes Bloqueados</h4>
                <div style="font-size: 2.2rem; font-weight: 700; color: #ef4444; margin-top: 10px;">${m}</div>
            </div>
        `}catch(e){console.error("Erro ao carregar os dados do Dashboard:",e),t.innerHTML=`
            <div style="background: #fee2e2; color: #dc2626; padding: 20px; border-radius: 8px;">
                <strong>Erro ao buscar dados!</strong> Verifique a conexão com o banco de dados e as permissões (Rules).<br>
                <small>${e.message}</small>
            </div>
        `}}let B=[],f=[];async function H(t){t.innerHTML=`
        <style>
            .estab-table th { background-color: #f8fafc; font-weight: 600; color: #475569; text-transform: uppercase; font-size: 0.75rem; letter-spacing: 0.05em; }
            .estab-row:hover { background-color: #f1f5f9; cursor: pointer; }
            .badge { padding: 4px 10px; border-radius: 9999px; font-size: 0.75rem; font-weight: 600; }
            .badge-active { background-color: #dcfce7; color: #166534; }
            .badge-blocked { background-color: #fee2e2; color: #991b1b; }
            
            /* Slide-out Panel */
            .slide-panel-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.4); z-index: 40; display: none; opacity: 0; transition: opacity 0.3s; }
            .slide-panel { position: fixed; top: 0; right: -600px; width: 100%; max-width: 500px; height: 100vh; background: #fff; z-index: 50; box-shadow: -4px 0 15px rgba(0,0,0,0.1); transition: right 0.3s ease-in-out; display: flex; flex-direction: column; }
            .slide-panel.open { right: 0; }
            .slide-panel-header { padding: 20px 25px; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; background: #f8fafc; }
            .slide-panel-content { padding: 25px; overflow-y: auto; flex: 1; }
            .slide-panel-footer { padding: 20px 25px; border-top: 1px solid #e2e8f0; background: #f8fafc; display: flex; justify-content: flex-end; gap: 10px; }
            
            /* Formulário no Panel */
            .form-group { margin-bottom: 15px; }
            .form-group label { display: block; font-size: 0.85rem; font-weight: 600; color: #475569; margin-bottom: 5px; }
            .form-control { width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 0.9rem; color: #1e293b; transition: border 0.2s; box-sizing: border-box;}
            .form-control:focus { border-color: #3b82f6; outline: none; box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1); }
            .form-row { display: flex; gap: 15px; }
            .form-row > div { flex: 1; }
            
            .btn-primary { background: #3b82f6; color: white; border: none; padding: 10px 18px; border-radius: 6px; cursor: pointer; font-weight: 600; transition: background 0.2s; }
            .btn-primary:hover { background: #2563eb; }
            .btn-secondary { background: #e2e8f0; color: #475569; border: none; padding: 10px 18px; border-radius: 6px; cursor: pointer; font-weight: 600; transition: background 0.2s; }
            .btn-secondary:hover { background: #cbd5e1; }
            .btn-danger { background: #fee2e2; color: #dc2626; border: 1px solid #fecaca; padding: 10px 18px; border-radius: 6px; cursor: pointer; font-weight: 600; }
            .btn-success { background: #dcfce7; color: #16a34a; border: 1px solid #bbf7d0; padding: 10px 18px; border-radius: 6px; cursor: pointer; font-weight: 600; }
            .btn-outline { background: transparent; color: #3b82f6; border: 1px solid #3b82f6; padding: 10px 18px; border-radius: 6px; cursor: pointer; font-weight: 600; display: flex; align-items: center; gap: 5px;}
        </style>

        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px;">
            <div>
                <h3 style="color: #0f172a; font-size: 1.5rem; font-weight: 700; margin: 0;">🏢 Gestão de Estabelecimentos</h3>
                <p style="color: #64748b; font-size: 0.9rem; margin-top: 5px;">Gerencie assinaturas, acessos e detalhes dos clientes Kairos.</p>
            </div>
            <button id="btn-add-client" class="btn-primary">+ Novo Cliente</button>
        </div>

        <div style="background: white; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); overflow: hidden;">
            <div style="padding: 20px;">
                <p id="loading-msg" style="color: #64748b; font-style: italic; text-align: center; padding: 20px;">A carregar base de dados...</p>
                
                <div style="overflow-x: auto;">
                    <table id="clients-table" class="estab-table" style="width: 100%; border-collapse: collapse; display: none;">
                        <thead>
                            <tr style="border-bottom: 2px solid #e2e8f0; text-align: left;">
                                <th style="padding: 15px;">Empresa</th>
                                <th style="padding: 15px;">Dono / Contato</th>
                                <th style="padding: 15px;">Plano</th>
                                <th style="padding: 15px;">Vencimento</th>
                                <th style="padding: 15px;">Status</th>
                                <th style="padding: 15px; text-align: right;">Ações</th>
                            </tr>
                        </thead>
                        <tbody id="clients-tbody"></tbody>
                    </table>
                </div>
            </div>
        </div>

        <div id="slide-overlay" class="slide-panel-overlay"></div>

        <div id="slide-panel" class="slide-panel">
            <div class="slide-panel-header">
                <h3 style="margin: 0; color: #0f172a; font-size: 1.2rem;">Detalhes do Estabelecimento</h3>
                <button id="btn-close-panel" style="background: none; border: none; font-size: 1.5rem; color: #64748b; cursor: pointer;">&times;</button>
            </div>
            
            <div class="slide-panel-content">
                <form id="form-estab-details">
                    <input type="hidden" id="edit-id">
                    
                    <h4 style="color: #3b82f6; margin-top: 0; margin-bottom: 15px; font-size: 0.9rem; text-transform: uppercase;">Acesso Rápido</h4>
                    <div style="display: flex; gap: 10px; margin-bottom: 25px; padding-bottom: 20px; border-bottom: 1px dashed #e2e8f0;">
                        <button type="button" id="btn-impersonate-action" class="btn-outline">
                            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path></svg>
                            Entrar como Cliente
                        </button>
                        <button type="button" id="btn-toggle-status-action" class="btn-secondary" style="flex: 1;">Bloquear</button>
                    </div>

                    <h4 style="color: #3b82f6; margin-bottom: 15px; font-size: 0.9rem; text-transform: uppercase;">Dados da Empresa</h4>
                    <div class="form-group">
                        <label>Nome Fantasia / Empresa</label>
                        <input type="text" id="edit-name" class="form-control" required>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>CPF / CNPJ</label>
                            <input type="text" id="edit-cpfCnpj" class="form-control">
                        </div>
                        <div class="form-group">
                            <label>Tenant (URL Customizada)</label>
                            <input type="text" id="edit-tenant" class="form-control" placeholder="ex: barbearia-do-joao">
                        </div>
                    </div>

                    <h4 style="color: #3b82f6; margin-top: 20px; margin-bottom: 15px; font-size: 0.9rem; text-transform: uppercase;">Contato</h4>
                    <div class="form-group">
                        <label>Nome do Dono / Responsável</label>
                        <input type="text" id="edit-owner" class="form-control">
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>E-mail</label>
                            <input type="email" id="edit-email" class="form-control">
                        </div>
                        <div class="form-group">
                            <label>WhatsApp / Telefone</label>
                            <input type="text" id="edit-phone" class="form-control">
                        </div>
                    </div>

                    <h4 style="color: #3b82f6; margin-top: 20px; margin-bottom: 15px; font-size: 0.9rem; text-transform: uppercase;">Assinatura & Acesso</h4>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Plano Atual</label>
                            <select id="edit-plan" class="form-control">
                                <option value="">A carregar...</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Criado em</label>
                            <input type="text" id="edit-created" class="form-control" readonly style="background: #f1f5f9; color: #64748b;">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Vencimento da Fatura</label>
                            <input type="date" id="edit-dueDate" class="form-control">
                        </div>
                        <div class="form-group">
                            <label>Limite de Acesso</label>
                            <input type="date" id="edit-accessLimit" class="form-control">
                        </div>
                    </div>
                </form>
            </div>
            
            <div class="slide-panel-footer">
                <button type="button" id="btn-cancel-edit" class="btn-secondary">Cancelar</button>
                <button type="button" id="btn-save-edit" class="btn-primary">Salvar Alterações</button>
            </div>
        </div>
    `,await O(),await z(),V()}async function O(){try{const t=await b(y(u,"packages"));f=[],t.empty||t.forEach(e=>{const n=e.data(),o=n.name||n.title||n.nome||e.id;f.push(o)}),f.length===0&&(await b(y(u,"plans"))).forEach(n=>{const o=n.data();f.push(o.name||o.title||o.nome||n.id)})}catch(t){console.warn("Aviso: Falha ao carregar planos do banco. Utilizando fallback padrão.",t)}}async function z(){const t=document.getElementById("clients-tbody"),e=document.getElementById("clients-table"),n=document.getElementById("loading-msg");try{const o=await b(y(u,"establishments"));if(B=[],o.empty){n.innerText="Nenhum estabelecimento cadastrado.";return}let i="";o.forEach(d=>{const s=d.data();s.id=d.id,B.push(s);const l=s.name||s.nomeFantasia||"Sem Nome",m=s.ownerName||s.dono||"Não informado",p=s.phone||s.whatsapp||"Sem telefone",a=s.planName||s.plano||"Sem Plano",c=s.status||"active",r=s.dueDate?C(s.dueDate):"Não def.";let g=c==="active"?'<span class="badge badge-active">ATIVO</span>':'<span class="badge badge-blocked">BLOQUEADO</span>';i+=`
                <tr class="estab-row" style="border-bottom: 1px solid #f1f5f9; transition: all 0.2s;" onclick="window.openEstablishmentDetails('${s.id}')">
                    <td style="padding: 15px;">
                        <strong style="color: #0f172a; display: block; font-size: 0.95rem;">${l}</strong>
                        <small style="color: #64748b; font-family: monospace;">ID: ${s.id.substring(0,8)}...</small>
                    </td>
                    <td style="padding: 15px; color: #475569; font-size: 0.9rem;">
                        <span style="display: block; font-weight: 500; color: #1e293b;">${m}</span>
                        <small style="color: #64748b;">${p}</small>
                    </td>
                    <td style="padding: 15px; color: #334155; font-weight: 500; font-size: 0.9rem;">${a}</td>
                    <td style="padding: 15px; color: #475569; font-size: 0.9rem;">${r}</td>
                    <td style="padding: 15px;">${g}</td>
                    <td style="padding: 15px; text-align: right;">
                        <button class="btn-secondary" style="padding: 6px 12px; font-size: 0.8rem;" onclick="event.stopPropagation(); window.openEstablishmentDetails('${s.id}')">Gerenciar</button>
                    </td>
                </tr>
            `}),t.innerHTML=i,n.style.display="none",e.style.display="table"}catch(o){console.error("Erro ao carregar clientes:",o),n.innerHTML='<span style="color: #dc2626;">Erro ao carregar base de dados.</span>'}}function V(t){const e=document.getElementById("slide-overlay"),n=document.getElementById("slide-panel"),o=document.getElementById("btn-close-panel"),i=document.getElementById("btn-cancel-edit"),d=document.getElementById("btn-save-edit"),s=document.getElementById("btn-impersonate-action"),l=document.getElementById("btn-toggle-status-action"),m=()=>{n.classList.remove("open"),e.style.opacity="0",setTimeout(()=>e.style.display="none",300)};o.addEventListener("click",m),i.addEventListener("click",m),e.addEventListener("click",m),window.openEstablishmentDetails=p=>{const a=B.find(v=>v.id===p);if(!a)return;document.getElementById("edit-id").value=a.id,document.getElementById("edit-name").value=a.name||a.nomeFantasia||"",document.getElementById("edit-cpfCnpj").value=a.cpfCnpj||a.cnpj||"",document.getElementById("edit-tenant").value=a.tenant||a.slug||"",document.getElementById("edit-owner").value=a.ownerName||a.dono||"",document.getElementById("edit-email").value=a.email||"",document.getElementById("edit-phone").value=a.phone||a.whatsapp||"";const c=document.getElementById("edit-plan");c.innerHTML="",f.forEach(v=>{c.add(new Option(v,v))});let r=a.planName||a.plano||"";r&&!f.includes(r)&&c.add(new Option(`${r} (Descontinuado)`,r)),c.value=r,document.getElementById("edit-created").value=a.createdAt?C(a.createdAt):"Desconhecida",document.getElementById("edit-dueDate").value=a.dueDate||"",document.getElementById("edit-accessLimit").value=a.accessLimit||"",(a.status||"active")==="active"?(l.className="btn-danger",l.innerText="Suspender Acesso",l.dataset.action="block"):(l.className="btn-success",l.innerText="Restaurar Acesso",l.dataset.action="unblock"),s.dataset.id=a.id,s.dataset.name=a.name||a.nomeFantasia||"Estabelecimento",e.style.display="block",setTimeout(()=>{e.style.opacity="1",n.classList.add("open")},10)},d.addEventListener("click",async()=>{const p=document.getElementById("edit-id").value,a=d.innerText;d.innerText="Salvando...",d.disabled=!0;try{const c=E(u,"establishments",p);await I(c,{name:document.getElementById("edit-name").value,nomeFantasia:document.getElementById("edit-name").value,cpfCnpj:document.getElementById("edit-cpfCnpj").value,tenant:document.getElementById("edit-tenant").value,slug:document.getElementById("edit-tenant").value,ownerName:document.getElementById("edit-owner").value,email:document.getElementById("edit-email").value,phone:document.getElementById("edit-phone").value,planName:document.getElementById("edit-plan").value,plano:document.getElementById("edit-plan").value,dueDate:document.getElementById("edit-dueDate").value,accessLimit:document.getElementById("edit-accessLimit").value}),m(),await z();const r=document.getElementById("btn-add-client"),g=r.innerText;r.innerText="✔ Salvo com sucesso!",r.style.background="#16a34a",setTimeout(()=>{r.innerText=g,r.style.background=""},3e3)}catch(c){console.error("Erro ao atualizar estabelecimento:",c),alert("Erro ao salvar: "+c.message)}finally{d.innerText=a,d.disabled=!1}}),l.addEventListener("click",async()=>{const p=document.getElementById("edit-id").value,a=l.dataset.action,c=a==="block"?"blocked":"active";if(confirm(`Deseja realmente ${a==="block"?"BLOQUEAR":"DESBLOQUEAR"} este estabelecimento?`))try{l.innerText="Aguarde...";const r=E(u,"establishments",p);await I(r,{status:c}),m(),await z()}catch(r){console.error("Erro ao alterar status:",r),alert("Erro: "+r.message),l.innerText=a==="block"?"Suspender Acesso":"Restaurar Acesso"}}),s.addEventListener("click",()=>{const p=s.dataset.id,a=s.dataset.name;confirm(`Deseja entrar no ambiente do cliente "${a}"?

Isto abrirá o sistema numa nova janela.`)&&(localStorage.setItem("kairos_superadmin_impersonating","true"),localStorage.setItem("tenantId",p),localStorage.setItem("tenantName",a),window.open("/app.html","_blank"))})}function C(t){if(!t)return"";let e;if(typeof t.toDate=="function"?e=t.toDate():(e=new Date(t),e.setMinutes(e.getMinutes()+e.getTimezoneOffset())),isNaN(e.getTime()))return t;const n=String(e.getDate()).padStart(2,"0"),o=String(e.getMonth()+1).padStart(2,"0"),i=e.getFullYear();return`${n}/${o}/${i}`}const G={dashboard:"Visão Geral (Dashboard)",agenda:"Agenda / Calendário",comandas:"Comandas / PDV",relatorios:"Relatórios (Analytics)","sales-report":"Relatório de Vendas",financial:"Financeiro",servicos:"Serviços",produtos:"Produtos",suppliers:"Fornecedores",profissionais:"Profissionais",ausencias:"Ausências e Bloqueios",clientes:"Clientes",packages:"Pacotes de Serviços",commissions:"Comissões",estabelecimento:"Configurações",users:"Usuários Internos",whatsapp:"Integração WhatsApp",mobileApp:"Acesso App Mobile"};let h=[];async function _(t){t.innerHTML=`
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px;">
            <h3 style="color: #1f2937; font-size: 1.5rem; font-weight: 600;">💳 Planos & Módulos</h3>
            <button id="btn-new-plan" style="background: #10b981; color: white; border: none; padding: 10px 18px; border-radius: 8px; cursor: pointer; font-weight: 600; transition: background 0.2s;">+ Novo Plano</button>
        </div>

        <div style="background: white; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); overflow: hidden;">
            <div style="padding: 20px;">
                <p id="loading-plans" style="color: #6b7280; font-style: italic;">A carregar planos...</p>
                <div style="overflow-x: auto;">
                    <table id="plans-table" style="width: 100%; border-collapse: collapse; display: none;">
                        <thead>
                            <tr style="background-color: #f9fafb; border-bottom: 2px solid #e5e7eb; text-align: left; color: #4b5563; font-size: 0.85rem; text-transform: uppercase;">
                                <th style="padding: 15px 20px;">Nome do Plano</th>
                                <th style="padding: 15px 20px;">Preço</th>
                                <th style="padding: 15px 20px;">Limites (Prof / Users)</th>
                                <th style="padding: 15px 20px; text-align: right;">Ações</th>
                            </tr>
                        </thead>
                        <tbody id="plans-tbody"></tbody>
                    </table>
                </div>
            </div>
        </div>

        <div id="plan-modal" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 100; display: none; justify-content: center; align-items: center; padding: 20px;">
            <div style="background: white; border-radius: 12px; width: 100%; max-width: 600px; max-height: 90vh; display: flex; flex-direction: column; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);">
                <div style="padding: 20px; border-bottom: 1px solid #e5e7eb; display: flex; justify-content: space-between; align-items: center; background: #f8fafc;">
                    <h2 id="modal-title" style="margin: 0; font-size: 1.25rem; font-weight: 700; color: #1f2937;">Novo Plano</h2>
                    <button id="btn-close-modal" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: #6b7280;">&times;</button>
                </div>
                
                <form id="plan-form" style="padding: 20px; overflow-y: auto; flex: 1;">
                    <input type="hidden" id="plan-id">
                    
                    <div style="margin-bottom: 15px;">
                        <label style="display: block; margin-bottom: 5px; font-weight: 600; font-size: 0.85rem; color: #374151;">Nome do Plano</label>
                        <input type="text" id="plan-name" required style="width: 100%; padding: 10px; border: 1px solid #d1d5db; border-radius: 6px; box-sizing: border-box;">
                    </div>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px; margin-bottom: 25px;">
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: 600; font-size: 0.85rem; color: #374151;">Preço (R$)</label>
                            <input type="number" id="plan-price" step="0.01" required style="width: 100%; padding: 10px; border: 1px solid #d1d5db; border-radius: 6px; box-sizing: border-box;">
                        </div>
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: 600; font-size: 0.85rem; color: #374151;">Máx. Profissionais</label>
                            <input type="number" id="plan-profs" required style="width: 100%; padding: 10px; border: 1px solid #d1d5db; border-radius: 6px; box-sizing: border-box;">
                        </div>
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: 600; font-size: 0.85rem; color: #374151;">Máx. Usuários</label>
                            <input type="number" id="plan-users" required style="width: 100%; padding: 10px; border: 1px solid #d1d5db; border-radius: 6px; box-sizing: border-box;">
                        </div>
                    </div>

                    <h3 style="font-size: 1rem; font-weight: 700; color: #1f2937; margin-bottom: 10px; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px;">Módulos Liberados no Plano</h3>
                    <p style="font-size: 0.75rem; color: #6b7280; margin-bottom: 15px;">Selecione quais telas e recursos os clientes deste plano terão acesso.</p>
                    
                    <div id="modules-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                        </div>
                </form>

                <div style="padding: 15px 20px; border-top: 1px solid #e5e7eb; background: #f9fafb; display: flex; justify-content: flex-end; gap: 10px;">
                    <button id="btn-cancel-modal" style="background: white; border: 1px solid #d1d5db; padding: 8px 15px; border-radius: 6px; cursor: pointer; font-weight: 600; color: #374151;">Cancelar</button>
                    <button type="submit" form="plan-form" style="background: #10b981; color: white; border: none; padding: 8px 20px; border-radius: 6px; cursor: pointer; font-weight: 600;">Salvar Plano</button>
                </div>
            </div>
        </div>
    `,await T(),W()}async function T(){try{const t=await b(y(u,"plans"));h=[],t.forEach(e=>{h.push({id:e.id,...e.data()})}),Q()}catch(t){console.error("Erro ao buscar planos:",t),document.getElementById("loading-plans").innerText="Erro ao carregar planos."}}function Q(){const t=document.getElementById("plans-tbody"),e=document.getElementById("plans-table"),n=document.getElementById("loading-plans");if(h.length===0){n.innerText="Nenhum plano cadastrado. Clique em '+ Novo Plano' para começar.",e.style.display="none";return}t.innerHTML=h.map(o=>`
        <tr style="border-bottom: 1px solid #f3f4f6; transition: background 0.2s;" onmouseover="this.style.backgroundColor='#f9fafb'" onmouseout="this.style.backgroundColor='transparent'">
            <td style="padding: 15px 20px; font-weight: 700; color: #111827;">${o.name}</td>
            <td style="padding: 15px 20px; color: #047857; font-weight: 600;">R$ ${parseFloat(o.price).toFixed(2)}</td>
            <td style="padding: 15px 20px; color: #4b5563;">${o.maxProfessionals} Profs / ${o.maxUsers} Users</td>
            <td style="padding: 15px 20px; text-align: right;">
                <button class="btn-edit-plan" data-id="${o.id}" style="background: #eff6ff; color: #1d4ed8; border: 1px solid #bfdbfe; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 0.8rem; font-weight: 600; margin-right: 5px;">Editar</button>
                <button class="btn-delete-plan" data-id="${o.id}" style="background: #fee2e2; color: #b91c1c; border: 1px solid #fca5a5; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 0.8rem; font-weight: 600;">Excluir</button>
            </td>
        </tr>
    `).join(""),n.style.display="none",e.style.display="table",document.querySelectorAll(".btn-edit-plan").forEach(o=>{o.addEventListener("click",i=>M(i.target.getAttribute("data-id")))}),document.querySelectorAll(".btn-delete-plan").forEach(o=>{o.addEventListener("click",i=>J(i.target.getAttribute("data-id")))})}function W(){const t=document.getElementById("plan-modal");document.getElementById("btn-new-plan").addEventListener("click",()=>M()),document.getElementById("btn-close-modal").addEventListener("click",()=>t.style.display="none"),document.getElementById("btn-cancel-modal").addEventListener("click",()=>t.style.display="none"),document.getElementById("plan-form").addEventListener("submit",Y)}function M(t=null){const e=document.getElementById("plan-modal");document.getElementById("plan-form").reset();const o=!!t;document.getElementById("modal-title").innerText=o?"Editar Plano":"Novo Plano",document.getElementById("plan-id").value=t||"";const i=o?h.find(l=>l.id===t):null;o&&(document.getElementById("plan-name").value=i.name,document.getElementById("plan-price").value=i.price,document.getElementById("plan-profs").value=i.maxProfessionals,document.getElementById("plan-users").value=i.maxUsers);const d=document.getElementById("modules-grid"),s=i?.allowedModules||{};d.innerHTML=Object.entries(G).map(([l,m])=>{const p=s[l]?"checked":"";return`
            <label style="display: flex; align-items: center; padding: 10px; border: 1px solid #e5e7eb; border-radius: 8px; cursor: pointer; transition: background 0.2s;" onmouseover="this.style.backgroundColor='#f9fafb'" onmouseout="this.style.backgroundColor='transparent'">
                <input type="checkbox" name="plan-modules" value="${l}" ${p} style="margin-right: 10px; width: 16px; height: 16px; accent-color: #10b981;">
                <span style="font-size: 0.85rem; color: #374151; font-weight: 500;">${m}</span>
            </label>
        `}).join(""),e.style.display="flex"}async function Y(t){t.preventDefault();const e=document.querySelector('button[form="plan-form"]');e.innerText="A salvar...",e.disabled=!0;const n=document.getElementById("plan-id").value,o={};document.querySelectorAll('input[name="plan-modules"]:checked').forEach(d=>{o[d.value]=!0});const i={name:document.getElementById("plan-name").value,price:parseFloat(document.getElementById("plan-price").value),maxProfessionals:parseInt(document.getElementById("plan-profs").value),maxUsers:parseInt(document.getElementById("plan-users").value),allowedModules:o,updatedAt:new Date};try{if(n){const d=E(u,"plans",n);await I(d,i)}else i.createdAt=new Date,await $(y(u,"plans"),i);document.getElementById("plan-modal").style.display="none",await T()}catch(d){console.error("Erro ao salvar plano:",d),alert("Erro ao salvar o plano. Verifica o consola.")}finally{e.innerText="Salvar Plano",e.disabled=!1}}async function J(t){if(confirm("Tem certeza que deseja excluir este plano? Esta ação não pode ser desfeita."))try{await R(E(u,"plans",t)),await T()}catch(e){console.error("Erro ao deletar plano:",e),alert("Erro ao excluir o plano.")}}j();document.getElementById("btn-logout").addEventListener("click",F);const P=document.querySelectorAll(".sidebar-menu a"),w=document.getElementById("dynamic-content");P.forEach(t=>{t.addEventListener("click",async e=>{e.preventDefault(),P.forEach(o=>o.classList.remove("active")),e.target.classList.add("active"),document.getElementById("page-title").innerText=e.target.innerText.substring(2).trim(),x&&(document.getElementById("user-role-display").innerText=x);const n=e.target.getAttribute("href").replace("#","");n==="dashboard"?await U(w):n==="establishments"?await H(w):n==="financial"?await _(w):w.innerHTML=`<h3 style="color: #6b7280;">Módulo ${n} em desenvolvimento...</h3>`})});setTimeout(()=>{const t=document.getElementById("menu-dashboard");t&&t.click()},1e3);
