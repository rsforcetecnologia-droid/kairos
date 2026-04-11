import"./modulepreload-polyfill-B5Qt9EMX.js";import{a as E,d as l}from"./firebase-config-C2tbVz-J.js";import{onAuthStateChanged as $,signOut as P}from"https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";import{collection as g,getDocs as p,query as I,where as A,doc as k,updateDoc as S,addDoc as q,deleteDoc as R}from"https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";import"https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";import"https://www.gstatic.com/firebasejs/11.6.1/firebase-storage.js";import"https://www.gstatic.com/firebasejs/11.6.1/firebase-messaging.js";const M={super_admin:["dashboard","establishments","whatsapp","financial","team","settings"],support:["establishments","whatsapp"],financial:["dashboard","establishments","financial"],developer:["whatsapp","settings"]};let m=null;function C(){document.body.style.display="none",$(E,async e=>{if(e)try{let a=(await e.getIdTokenResult()).claims.role;a==="super-admin"&&(a="super_admin"),a&&M[a]?(m=a,console.log("🛡️ Acesso Seguro Concedido! Perfil:",m),D(m),document.body.style.display="flex"):(console.error("🚨 Intruso detectado: Conta sem cargo de gestão."),await P(E),window.location.href="admin-login.html")}catch(t){console.error("Erro ao verificar permissões de segurança:",t),window.location.href="admin-login.html"}else window.location.href="admin-login.html"})}function D(e){const t=M[e]||[];document.querySelectorAll("[data-module]").forEach(o=>{const n=o.getAttribute("data-module");t.includes(n)||o.remove()})}async function N(){try{await P(E),window.location.href="admin-login.html"}catch(e){console.error("Erro ao sair do sistema:",e)}}async function U(e){e.innerHTML=`
        <div style="display: flex; flex-direction: column; gap: 20px;">
            <h3 style="color: #374151; font-size: 1.5rem; font-weight: 600; margin-bottom: 10px;">📊 Visão Geral do Negócio</h3>
            <div id="dashboard-metrics" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px;">
                <p style="color: #6b7280;">A procurar métricas no banco de dados...</p>
            </div>
        </div>
    `;try{const t=document.getElementById("dashboard-metrics"),a=g(l,"establishments"),[o,n,r]=await Promise.all([p(a),p(I(a,A("status","==","active"))),p(I(a,A("status","==","blocked")))]),d=o.size,s=n.size,i=r.size;let c=0;n.forEach(y=>{const x=y.data(),h=parseFloat(x.planPrice)||0;c+=h});const f=new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(c);t.innerHTML=`
            <div style="background: #ffffff; padding: 25px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border-left: 5px solid #6b7280;">
                <h4 style="font-size: 0.85rem; color: #6b7280; text-transform: uppercase; margin: 0;">Total Cadastrados</h4>
                <div style="font-size: 2.2rem; font-weight: 700; color: #111827; margin-top: 10px;">${d}</div>
            </div>

            <div style="background: #ffffff; padding: 25px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border-left: 5px solid #10b981;">
                <h4 style="font-size: 0.85rem; color: #6b7280; text-transform: uppercase; margin: 0;">Assinaturas Ativas</h4>
                <div style="font-size: 2.2rem; font-weight: 700; color: #10b981; margin-top: 10px;">${s}</div>
            </div>

            <div style="background: #ffffff; padding: 25px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border-left: 5px solid #3b82f6;">
                <h4 style="font-size: 0.85rem; color: #6b7280; text-transform: uppercase; margin: 0;">Receita Mensal (MRR)</h4>
                <div style="font-size: 2.2rem; font-weight: 700; color: #3b82f6; margin-top: 10px;">${f}</div>
            </div>

            <div style="background: #ffffff; padding: 25px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border-left: 5px solid #ef4444;">
                <h4 style="font-size: 0.85rem; color: #6b7280; text-transform: uppercase; margin: 0;">Clientes Bloqueados</h4>
                <div style="font-size: 2.2rem; font-weight: 700; color: #ef4444; margin-top: 10px;">${i}</div>
            </div>
        `}catch(t){console.error("Erro ao carregar os dados do Dashboard:",t),e.innerHTML=`
            <div style="background: #fee2e2; color: #dc2626; padding: 20px; border-radius: 8px;">
                <strong>Erro ao buscar dados!</strong> Verifique a conexão com o banco de dados e as permissões (Rules).<br>
                <small>${t.message}</small>
            </div>
        `}}async function T(e){e.innerHTML=`
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px;">
            <h3 style="color: #1f2937; font-size: 1.5rem; font-weight: 600;">🏢 Gestão de Estabelecimentos</h3>
            <button id="btn-add-client" style="background: #3b82f6; color: white; border: none; padding: 10px 18px; border-radius: 8px; cursor: pointer; font-weight: 600; transition: background 0.2s;">+ Novo Cliente</button>
        </div>

        <div style="background: white; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); overflow: hidden;">
            <div style="padding: 20px;">
                <p id="loading-msg" style="color: #6b7280; font-style: italic;">A buscar clientes no banco de dados...</p>
                
                <div style="overflow-x: auto;">
                    <table id="clients-table" style="width: 100%; border-collapse: collapse; display: none;">
                        <thead>
                            <tr style="background-color: #f9fafb; border-bottom: 2px solid #e5e7eb; text-align: left; color: #4b5563; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.5px;">
                                <th style="padding: 15px 20px;">Empresa / Cliente</th>
                                <th style="padding: 15px 20px;">Contato</th>
                                <th style="padding: 15px 20px;">Plano Atual</th>
                                <th style="padding: 15px 20px;">Status</th>
                                <th style="padding: 15px 20px; text-align: right;">Ações</th>
                            </tr>
                        </thead>
                        <tbody id="clients-tbody">
                            </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;try{const t=await p(g(l,"establishments")),a=document.getElementById("clients-tbody"),o=document.getElementById("clients-table"),n=document.getElementById("loading-msg");if(t.empty){n.innerText="Nenhum estabelecimento cadastrado ainda.";return}let r="";t.forEach(d=>{const s=d.data(),i=d.id,c=s.name||s.nomeFantasia||"Sem Nome Registrado",f=s.email||"Sem e-mail",y=s.phone||s.whatsapp||"Sem telefone",x=s.planName||"Plano Básico",h=s.status||"active";let v="",w="";h==="active"?(v='<span style="background: #d1fae5; color: #065f46; padding: 5px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: 700;">ATIVO</span>',w=`<button class="btn-toggle-status" data-id="${i}" data-action="block" style="background: #fee2e2; color: #b91c1c; border: 1px solid #fca5a5; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 0.8rem; font-weight: 600; margin-right: 8px;">Bloquear</button>`):(v='<span style="background: #fee2e2; color: #991b1b; padding: 5px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: 700;">BLOQUEADO</span>',w=`<button class="btn-toggle-status" data-id="${i}" data-action="unblock" style="background: #d1fae5; color: #047857; border: 1px solid #6ee7b7; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 0.8rem; font-weight: 600; margin-right: 8px;">Desbloquear</button>`),r+=`
                <tr style="border-bottom: 1px solid #f3f4f6; transition: background 0.2s;" onmouseover="this.style.backgroundColor='#f9fafb'" onmouseout="this.style.backgroundColor='transparent'">
                    <td style="padding: 15px 20px;">
                        <strong style="color: #111827; display: block;">${c}</strong>
                        <small style="color: #9ca3af; font-family: monospace;">ID: ${i}</small>
                    </td>
                    <td style="padding: 15px 20px; color: #4b5563;">
                        <span style="display: block;">${f}</span>
                        <small style="color: #6b7280;">${y}</small>
                    </td>
                    <td style="padding: 15px 20px; color: #374151; font-weight: 500;">${x}</td>
                    <td style="padding: 15px 20px;">${v}</td>
                    <td style="padding: 15px 20px; text-align: right;">
                        ${w}
                        <button class="btn-impersonate" data-id="${i}" style="background: #eff6ff; color: #1d4ed8; border: 1px solid #bfdbfe; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 0.8rem; font-weight: 600;">Entrar</button>
                    </td>
                </tr>
            `}),a.innerHTML=r,n.style.display="none",o.style.display="table",j(e)}catch(t){console.error("Erro ao carregar clientes:",t),e.innerHTML='<div style="background: #fee2e2; color: #991b1b; padding: 20px; border-radius: 8px;">Erro ao carregar lista de clientes. Verifique a consola.</div>'}}function j(e){document.querySelectorAll(".btn-toggle-status").forEach(o=>{o.addEventListener("click",async n=>{const r=n.target.getAttribute("data-id"),d=n.target.getAttribute("data-action");await H(r,d,e)})}),document.querySelectorAll(".btn-impersonate").forEach(o=>{o.addEventListener("click",n=>{const r=n.target.getAttribute("data-id");alert(`Acesso Administrativo ao cliente ID: ${r} 

(A lógica de login rápido será implementada aqui!)`)})})}async function H(e,t,a){const o=t==="block"?"blocked":"active";if(confirm(t==="block"?"Tem certeza que deseja SUSPENDER o acesso deste cliente?":"Tem certeza que deseja RESTAURAR o acesso deste cliente?"))try{const r=k(l,"establishments",e);await S(r,{status:o}),T(a)}catch(r){console.error("Erro ao alterar status:",r),alert("Falha ao atualizar o banco de dados: "+r.message)}}const F={dashboard:"Visão Geral (Dashboard)",agenda:"Agenda / Calendário",comandas:"Comandas / PDV",relatorios:"Relatórios (Analytics)","sales-report":"Relatório de Vendas",financial:"Financeiro",servicos:"Serviços",produtos:"Produtos",suppliers:"Fornecedores",profissionais:"Profissionais",ausencias:"Ausências e Bloqueios",clientes:"Clientes",packages:"Pacotes de Serviços",commissions:"Comissões",estabelecimento:"Configurações",users:"Usuários Internos",whatsapp:"Integração WhatsApp",mobileApp:"Acesso App Mobile"};let b=[];async function V(e){e.innerHTML=`
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
    `,await B(),G()}async function B(){try{const e=await p(g(l,"plans"));b=[],e.forEach(t=>{b.push({id:t.id,...t.data()})}),O()}catch(e){console.error("Erro ao buscar planos:",e),document.getElementById("loading-plans").innerText="Erro ao carregar planos."}}function O(){const e=document.getElementById("plans-tbody"),t=document.getElementById("plans-table"),a=document.getElementById("loading-plans");if(b.length===0){a.innerText="Nenhum plano cadastrado. Clique em '+ Novo Plano' para começar.",t.style.display="none";return}e.innerHTML=b.map(o=>`
        <tr style="border-bottom: 1px solid #f3f4f6; transition: background 0.2s;" onmouseover="this.style.backgroundColor='#f9fafb'" onmouseout="this.style.backgroundColor='transparent'">
            <td style="padding: 15px 20px; font-weight: 700; color: #111827;">${o.name}</td>
            <td style="padding: 15px 20px; color: #047857; font-weight: 600;">R$ ${parseFloat(o.price).toFixed(2)}</td>
            <td style="padding: 15px 20px; color: #4b5563;">${o.maxProfessionals} Profs / ${o.maxUsers} Users</td>
            <td style="padding: 15px 20px; text-align: right;">
                <button class="btn-edit-plan" data-id="${o.id}" style="background: #eff6ff; color: #1d4ed8; border: 1px solid #bfdbfe; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 0.8rem; font-weight: 600; margin-right: 5px;">Editar</button>
                <button class="btn-delete-plan" data-id="${o.id}" style="background: #fee2e2; color: #b91c1c; border: 1px solid #fca5a5; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 0.8rem; font-weight: 600;">Excluir</button>
            </td>
        </tr>
    `).join(""),a.style.display="none",t.style.display="table",document.querySelectorAll(".btn-edit-plan").forEach(o=>{o.addEventListener("click",n=>L(n.target.getAttribute("data-id")))}),document.querySelectorAll(".btn-delete-plan").forEach(o=>{o.addEventListener("click",n=>Q(n.target.getAttribute("data-id")))})}function G(){const e=document.getElementById("plan-modal");document.getElementById("btn-new-plan").addEventListener("click",()=>L()),document.getElementById("btn-close-modal").addEventListener("click",()=>e.style.display="none"),document.getElementById("btn-cancel-modal").addEventListener("click",()=>e.style.display="none"),document.getElementById("plan-form").addEventListener("submit",_)}function L(e=null){const t=document.getElementById("plan-modal");document.getElementById("plan-form").reset();const o=!!e;document.getElementById("modal-title").innerText=o?"Editar Plano":"Novo Plano",document.getElementById("plan-id").value=e||"";const n=o?b.find(s=>s.id===e):null;o&&(document.getElementById("plan-name").value=n.name,document.getElementById("plan-price").value=n.price,document.getElementById("plan-profs").value=n.maxProfessionals,document.getElementById("plan-users").value=n.maxUsers);const r=document.getElementById("modules-grid"),d=n?.allowedModules||{};r.innerHTML=Object.entries(F).map(([s,i])=>{const c=d[s]?"checked":"";return`
            <label style="display: flex; align-items: center; padding: 10px; border: 1px solid #e5e7eb; border-radius: 8px; cursor: pointer; transition: background 0.2s;" onmouseover="this.style.backgroundColor='#f9fafb'" onmouseout="this.style.backgroundColor='transparent'">
                <input type="checkbox" name="plan-modules" value="${s}" ${c} style="margin-right: 10px; width: 16px; height: 16px; accent-color: #10b981;">
                <span style="font-size: 0.85rem; color: #374151; font-weight: 500;">${i}</span>
            </label>
        `}).join(""),t.style.display="flex"}async function _(e){e.preventDefault();const t=document.querySelector('button[form="plan-form"]');t.innerText="A salvar...",t.disabled=!0;const a=document.getElementById("plan-id").value,o={};document.querySelectorAll('input[name="plan-modules"]:checked').forEach(r=>{o[r.value]=!0});const n={name:document.getElementById("plan-name").value,price:parseFloat(document.getElementById("plan-price").value),maxProfessionals:parseInt(document.getElementById("plan-profs").value),maxUsers:parseInt(document.getElementById("plan-users").value),allowedModules:o,updatedAt:new Date};try{if(a){const r=k(l,"plans",a);await S(r,n)}else n.createdAt=new Date,await q(g(l,"plans"),n);document.getElementById("plan-modal").style.display="none",await B()}catch(r){console.error("Erro ao salvar plano:",r),alert("Erro ao salvar o plano. Verifica o consola.")}finally{t.innerText="Salvar Plano",t.disabled=!1}}async function Q(e){if(confirm("Tem certeza que deseja excluir este plano? Esta ação não pode ser desfeita."))try{await R(k(l,"plans",e)),await B()}catch(t){console.error("Erro ao deletar plano:",t),alert("Erro ao excluir o plano.")}}C();document.getElementById("btn-logout").addEventListener("click",N);const z=document.querySelectorAll(".sidebar-menu a"),u=document.getElementById("dynamic-content");z.forEach(e=>{e.addEventListener("click",async t=>{t.preventDefault(),z.forEach(o=>o.classList.remove("active")),t.target.classList.add("active"),document.getElementById("page-title").innerText=t.target.innerText.substring(2).trim(),m&&(document.getElementById("user-role-display").innerText=m);const a=t.target.getAttribute("href").replace("#","");a==="dashboard"?await U(u):a==="establishments"?await T(u):a==="financial"?await V(u):u.innerHTML=`<h3 style="color: #6b7280;">Módulo ${a} em desenvolvimento...</h3>`})});setTimeout(()=>{const e=document.getElementById("menu-dashboard");e&&e.click()},1e3);
