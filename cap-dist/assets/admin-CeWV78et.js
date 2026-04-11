import"./modulepreload-polyfill-B5Qt9EMX.js";import{a as w,d as l}from"./firebase-config-C2tbVz-J.js";import{onAuthStateChanged as L,signOut as A}from"https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";import{doc as E,getDoc as T,collection as u,getDocs as c,query as B,where as z,updateDoc as R,addDoc as $,serverTimestamp as M,deleteDoc as P}from"https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";import"https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";import"https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";import"https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";import"https://www.gstatic.com/firebasejs/11.6.1/firebase-storage.js";import"https://www.gstatic.com/firebasejs/11.6.1/firebase-messaging.js";const q={super_admin:["dashboard","establishments","whatsapp","financial","team","settings"],support:["establishments","whatsapp"],financial:["dashboard","establishments","financial"],developer:["whatsapp","settings"]};let p=null;function C(){document.body.style.display="none",L(w,async t=>{if(t)try{const e=E(l,"admin_users",t.uid),o=await T(e);o.exists()?(p=o.data().role||"support",console.log("🛡️ Acesso concedido. Perfil:",p),D(p),document.body.style.display="flex"):(console.error("🚨 Intruso detectado: Usuário sem registro de Admin."),await A(w),window.location.href="/admin-login.html")}catch(e){console.error("Erro ao verificar permissões de segurança:",e),window.location.href="/admin-login.html"}else window.location.href="/admin-login.html"})}function D(t){const e=q[t]||[];document.querySelectorAll("[data-module]").forEach(r=>{const a=r.getAttribute("data-module");e.includes(a)||r.remove()})}async function N(){try{await A(w),window.location.href="/admin-login.html"}catch(t){console.error("Erro ao sair:",t)}}async function H(t){t.innerHTML=`
        <div style="display: flex; flex-direction: column; gap: 20px;">
            <h3 style="color: #374151; font-size: 1.5rem; font-weight: 600; margin-bottom: 10px;">📊 Visão Geral do Negócio</h3>
            <div id="dashboard-metrics" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px;">
                <p style="color: #6b7280;">Buscando métricas no banco de dados...</p>
            </div>
        </div>
    `;try{const e=document.getElementById("dashboard-metrics"),o=u(l,"establishments"),[r,a,n]=await Promise.all([c(o),c(B(o,z("status","==","active"))),c(B(o,z("status","==","blocked")))]),i=r.size,s=a.size,d=n.size;let m=0;a.forEach(f=>{const y=f.data(),x=parseFloat(y.planPrice)||0;m+=x});const g=new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(m);e.innerHTML=`
            <div style="background: #ffffff; padding: 25px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border-left: 5px solid #6b7280;">
                <h4 style="font-size: 0.85rem; color: #6b7280; text-transform: uppercase; margin: 0;">Total Cadastrados</h4>
                <div style="font-size: 2.2rem; font-weight: 700; color: #111827; margin-top: 10px;">${i}</div>
            </div>

            <div style="background: #ffffff; padding: 25px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border-left: 5px solid #10b981;">
                <h4 style="font-size: 0.85rem; color: #6b7280; text-transform: uppercase; margin: 0;">Assinaturas Ativas</h4>
                <div style="font-size: 2.2rem; font-weight: 700; color: #10b981; margin-top: 10px;">${s}</div>
            </div>

            <div style="background: #ffffff; padding: 25px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border-left: 5px solid #3b82f6;">
                <h4 style="font-size: 0.85rem; color: #6b7280; text-transform: uppercase; margin: 0;">Receita Mensal (MRR)</h4>
                <div style="font-size: 2.2rem; font-weight: 700; color: #3b82f6; margin-top: 10px;">${g}</div>
            </div>

            <div style="background: #ffffff; padding: 25px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border-left: 5px solid #ef4444;">
                <h4 style="font-size: 0.85rem; color: #6b7280; text-transform: uppercase; margin: 0;">Clientes Bloqueados</h4>
                <div style="font-size: 2.2rem; font-weight: 700; color: #ef4444; margin-top: 10px;">${d}</div>
            </div>
        `}catch(e){console.error("Erro ao carregar os dados do Dashboard:",e),t.innerHTML=`
            <div style="background: #fee2e2; color: #dc2626; padding: 20px; border-radius: 8px;">
                <strong>Erro ao buscar dados!</strong> Verifique a conexão com o banco de dados e as permissões (Rules).<br>
                <small>${e.message}</small>
            </div>
        `}}async function S(t){t.innerHTML=`
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px;">
            <h3 style="color: #1f2937; font-size: 1.5rem; font-weight: 600;">🏢 Gestão de Estabelecimentos</h3>
            <button id="btn-add-client" style="background: #3b82f6; color: white; border: none; padding: 10px 18px; border-radius: 8px; cursor: pointer; font-weight: 600; transition: background 0.2s;">+ Novo Cliente</button>
        </div>

        <div style="background: white; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); overflow: hidden;">
            <div style="padding: 20px;">
                <p id="loading-msg" style="color: #6b7280; font-style: italic;">Buscando clientes no banco de dados...</p>
                
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
    `;try{const e=await c(u(l,"establishments")),o=document.getElementById("clients-tbody"),r=document.getElementById("clients-table"),a=document.getElementById("loading-msg");if(e.empty){a.innerText="Nenhum estabelecimento cadastrado ainda.";return}let n="";e.forEach(i=>{const s=i.data(),d=i.id,m=s.name||s.nomeFantasia||"Sem Nome Registrado",g=s.email||"Sem e-mail",f=s.phone||s.whatsapp||"Sem telefone",y=s.planName||"Plano Básico",x=s.status||"active";let h="",v="";x==="active"?(h='<span style="background: #d1fae5; color: #065f46; padding: 5px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: 700;">ATIVO</span>',v=`<button class="btn-toggle-status" data-id="${d}" data-action="block" style="background: #fee2e2; color: #b91c1c; border: 1px solid #fca5a5; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 0.8rem; font-weight: 600; margin-right: 8px;">Bloquear</button>`):(h='<span style="background: #fee2e2; color: #991b1b; padding: 5px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: 700;">BLOQUEADO</span>',v=`<button class="btn-toggle-status" data-id="${d}" data-action="unblock" style="background: #d1fae5; color: #047857; border: 1px solid #6ee7b7; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 0.8rem; font-weight: 600; margin-right: 8px;">Desbloquear</button>`),n+=`
                <tr style="border-bottom: 1px solid #f3f4f6; transition: background 0.2s;" onmouseover="this.style.backgroundColor='#f9fafb'" onmouseout="this.style.backgroundColor='transparent'">
                    <td style="padding: 15px 20px;">
                        <strong style="color: #111827; display: block;">${m}</strong>
                        <small style="color: #9ca3af; font-family: monospace;">ID: ${d}</small>
                    </td>
                    <td style="padding: 15px 20px; color: #4b5563;">
                        <span style="display: block;">${g}</span>
                        <small style="color: #6b7280;">${f}</small>
                    </td>
                    <td style="padding: 15px 20px; color: #374151; font-weight: 500;">${y}</td>
                    <td style="padding: 15px 20px;">${h}</td>
                    <td style="padding: 15px 20px; text-align: right;">
                        ${v}
                        <button class="btn-impersonate" data-id="${d}" style="background: #eff6ff; color: #1d4ed8; border: 1px solid #bfdbfe; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 0.8rem; font-weight: 600;">Entrar</button>
                    </td>
                </tr>
            `}),o.innerHTML=n,a.style.display="none",r.style.display="table",j(t)}catch(e){console.error("Erro ao carregar clientes:",e),t.innerHTML='<div style="background: #fee2e2; color: #991b1b; padding: 20px; border-radius: 8px;">Erro ao carregar lista de clientes. Verifique o console.</div>'}}function j(t){document.querySelectorAll(".btn-toggle-status").forEach(r=>{r.addEventListener("click",async a=>{const n=a.target.getAttribute("data-id"),i=a.target.getAttribute("data-action");await F(n,i,t)})}),document.querySelectorAll(".btn-impersonate").forEach(r=>{r.addEventListener("click",a=>{const n=a.target.getAttribute("data-id");alert(`Acesso Administrativo ao cliente ID: ${n} 

(A lógica de login rápido será implementada aqui!)`)})})}async function F(t,e,o){const r=e==="block"?"blocked":"active";if(confirm(e==="block"?"Tem certeza que deseja SUSPENDER o acesso deste cliente?":"Tem certeza que deseja RESTAURAR o acesso deste cliente?"))try{const n=E(l,"establishments",t);await R(n,{status:r}),S(o)}catch(n){console.error("Erro ao alterar status:",n),alert("Falha ao atualizar o banco de dados: "+n.message)}}async function O(t){t.innerHTML=`
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px;">
            <h3 style="color: #1f2937; font-size: 1.5rem; font-weight: 600;">💳 Gestão de Planos & Assinaturas</h3>
            <button id="btn-new-plan" style="background: #10b981; color: white; border: none; padding: 10px 18px; border-radius: 8px; cursor: pointer; font-weight: 600; transition: background 0.2s;">+ Novo Plano</button>
        </div>

        <div id="modal-new-plan" style="display: none; background: white; padding: 25px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); margin-bottom: 30px; border: 1px solid #e5e7eb; border-top: 4px solid #10b981;">
            <h4 style="margin-top: 0; color: #374151; font-size: 1.1rem; margin-bottom: 15px;">Criar Novo Pacote / Plano</h4>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                <div>
                    <label style="display:block; font-size: 0.85rem; font-weight: 600; color: #4b5563; margin-bottom: 5px;">Nome do Plano</label>
                    <input type="text" id="plan-name" placeholder="Ex: Plano Pro" style="width: 100%; padding: 10px; border: 1px solid #d1d5db; border-radius: 6px; box-sizing: border-box;">
                </div>
                <div>
                    <label style="display:block; font-size: 0.85rem; font-weight: 600; color: #4b5563; margin-bottom: 5px;">Preço Mensal (R$)</label>
                    <input type="number" id="plan-price" placeholder="Ex: 97.00" step="0.01" style="width: 100%; padding: 10px; border: 1px solid #d1d5db; border-radius: 6px; box-sizing: border-box;">
                </div>
                <div style="grid-column: span 2;">
                    <label style="display:block; font-size: 0.85rem; font-weight: 600; color: #4b5563; margin-bottom: 5px;">Limite Mensal de WhatsApp</label>
                    <input type="number" id="plan-wa-limit" placeholder="Ex: 1000 (Deixe em branco para Ilimitado)" style="width: 100%; padding: 10px; border: 1px solid #d1d5db; border-radius: 6px; box-sizing: border-box;">
                </div>
            </div>
            
            <div style="margin-top: 20px; display: flex; justify-content: flex-end; gap: 10px;">
                <button id="btn-cancel-plan" style="background: #f3f4f6; color: #4b5563; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-weight: 500;">Cancelar</button>
                <button id="btn-save-plan" style="background: #3b82f6; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-weight: 600;">Salvar no Banco</button>
            </div>
        </div>

        <h4 style="color: #4b5563; margin-bottom: 15px; font-size: 1.1rem;">Pacotes Ativos no Sistema</h4>
        <p id="loading-plans" style="color: #6b7280; font-style: italic;">Buscando pacotes no banco de dados...</p>
        
        <div id="plans-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px;">
            </div>
    `,await k(),U()}async function k(){const t=document.getElementById("plans-grid"),e=document.getElementById("loading-plans");try{const o=await c(u(l,"packages"));e.style.display="none";let r="";if(o.empty){t.innerHTML='<p style="color: #9ca3af; grid-column: span 3;">Nenhum plano cadastrado. Crie o primeiro!</p>';return}o.forEach(a=>{const n=a.data(),i=a.id,s=parseFloat(n.price||0).toLocaleString("pt-BR",{style:"currency",currency:"BRL"}),d=n.whatsappLimit?`${n.whatsappLimit} msgs/mês`:"💬 WhatsApp Ilimitado";r+=`
                <div style="background: white; border: 1px solid #e5e7eb; border-radius: 12px; padding: 25px; box-shadow: 0 2px 5px rgba(0,0,0,0.02); display: flex; flex-direction: column; justify-content: space-between;">
                    <div>
                        <h3 style="margin: 0 0 10px 0; color: #1f2937; font-size: 1.2rem;">${n.name||"Plano Sem Nome"}</h3>
                        <div style="font-size: 2rem; font-weight: 700; color: #3b82f6; margin-bottom: 15px;">${s}</div>
                        <ul style="list-style: none; padding: 0; margin: 0; color: #6b7280; font-size: 0.9rem;">
                            <li style="margin-bottom: 8px;">✅ Acesso Completo ao Kairos</li>
                            <li style="margin-bottom: 8px;">✅ Suporte Prioritário</li>
                            <li style="margin-bottom: 8px; font-weight: 600; color: #10b981;">${d}</li>
                        </ul>
                    </div>
                    <div style="margin-top: 25px; border-top: 1px solid #f3f4f6; padding-top: 15px; display: flex; justify-content: space-between;">
                        <span style="font-size: 0.75rem; color: #9ca3af;">ID: ${i.substring(0,8)}...</span>
                        <button class="btn-delete-plan" data-id="${i}" style="background: transparent; color: #ef4444; border: none; font-size: 0.85rem; font-weight: 600; cursor: pointer; text-decoration: underline;">Excluir</button>
                    </div>
                </div>
            `}),t.innerHTML=r,document.querySelectorAll(".btn-delete-plan").forEach(a=>{a.addEventListener("click",V)})}catch(o){console.error("Erro ao buscar planos:",o),e.innerText="Erro ao buscar os planos. Verifique o console.",e.style.color="red"}}function U(t){const e=document.getElementById("modal-new-plan"),o=document.getElementById("btn-new-plan"),r=document.getElementById("btn-cancel-plan"),a=document.getElementById("btn-save-plan");o.addEventListener("click",()=>{e.style.display="block",o.style.display="none"}),r.addEventListener("click",()=>{e.style.display="none",o.style.display="block"}),a.addEventListener("click",async()=>{const n=document.getElementById("plan-name").value,i=document.getElementById("plan-price").value,s=document.getElementById("plan-wa-limit").value;if(!n||!i){alert("Nome e Preço são obrigatórios!");return}a.innerText="Salvando...",a.disabled=!0;try{await $(u(l,"packages"),{name:n,price:parseFloat(i),whatsappLimit:s?parseInt(s):null,createdAt:M(),status:"active"}),document.getElementById("plan-name").value="",document.getElementById("plan-price").value="",document.getElementById("plan-wa-limit").value="",e.style.display="none",o.style.display="block",a.innerText="Salvar no Banco",a.disabled=!1,document.getElementById("loading-plans").style.display="block",await k()}catch(d){console.error("Erro ao criar plano:",d),alert("Erro ao criar plano: "+d.message),a.innerText="Salvar no Banco",a.disabled=!1}})}async function V(t){const e=t.target.getAttribute("data-id");if(confirm("ATENÇÃO: Tem certeza que deseja apagar este plano? Clientes que já o possuem podem ser afetados se você não migrá-los antes."))try{await P(E(l,"packages",e)),document.getElementById("loading-plans").style.display="block",await k()}catch(o){console.error("Erro ao deletar:",o),alert("Erro ao deletar o plano.")}}C();document.getElementById("btn-logout").addEventListener("click",N);const I=document.querySelectorAll(".sidebar-menu a"),b=document.getElementById("dynamic-content");I.forEach(t=>{t.addEventListener("click",async e=>{e.preventDefault(),I.forEach(r=>r.classList.remove("active")),e.target.classList.add("active"),document.getElementById("page-title").innerText=e.target.innerText.substring(2).trim(),p&&(document.getElementById("user-role-display").innerText=p);const o=e.target.getAttribute("href").replace("#","");o==="dashboard"?await H(b):o==="establishments"?await S(b):o==="financial"?await O(b):b.innerHTML=`<h3 style="color: #6b7280;">Módulo ${o} em desenvolvimento...</h3>`})});setTimeout(()=>{const t=document.getElementById("menu-dashboard");t&&t.click()},1e3);
