// Arquivo: js/admin/super-dashboard.js

// 1. IMPORTAÇÃO CORRIGIDA: Puxamos TUDO do nosso ficheiro central para garantir a mesma versão (11.6.1)
import { db, collection, getDocs, query, where } from '../firebase-config.js';

// Função principal que será chamada quando o utilizador clicar no menu "Dashboard"
export async function loadDashboard(container) {
    
    // 1. Mostra o ecrã de carregamento estruturado com CSS inline para facilitar
    container.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 20px;">
            <h3 style="color: #374151; font-size: 1.5rem; font-weight: 600; margin-bottom: 10px;">📊 Visão Geral do Negócio</h3>
            <div id="dashboard-metrics" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px;">
                <p style="color: #6b7280;">A procurar métricas no banco de dados...</p>
            </div>
        </div>
    `;

    try {
        const metricsContainer = document.getElementById('dashboard-metrics');

        // 2. Referência para a coleção de clientes/estabelecimentos
        const establishmentsRef = collection(db, 'establishments');

        // 3. Executando as Buscas no Banco de Dados simultaneamente para ser mais rápido
        const [allEstabSnapshot, activeEstabSnapshot, blockedEstabSnapshot] = await Promise.all([
            getDocs(establishmentsRef), // Pega TODOS para contar o total
            getDocs(query(establishmentsRef, where("status", "==", "active"))), // Pega só os ATIVOS
            getDocs(query(establishmentsRef, where("status", "==", "blocked"))) // Pega os BLOQUEADOS/INADIMPLENTES
        ]);

        // 4. Calculando as Métricas
        const totalEstablishments = allEstabSnapshot.size;
        const activeCount = activeEstabSnapshot.size;
        const blockedCount = blockedEstabSnapshot.size;

        // Cálculo de MRR (Faturamento Recorrente Mensal)
        // Aqui iteramos sobre os clientes ativos e somamos o valor do plano deles.
        let estimatedMRR = 0;
        activeEstabSnapshot.forEach(doc => {
            const data = doc.data();
            // SUPOSIÇÃO: Assumindo que guardas o valor do plano no campo 'planPrice'. 
            // Se o campo for outro (ex: 'valorMensalidade'), altera a linha abaixo.
            const valorPlano = parseFloat(data.planPrice) || 0; 
            estimatedMRR += valorPlano;
        });

        // Formata o MRR para Moeda Brasileira (BRL)
        const formatadoMRR = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(estimatedMRR);

        // 5. Renderizando os Cards no ecrã com os dados reais
        metricsContainer.innerHTML = `
            <div style="background: #ffffff; padding: 25px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border-left: 5px solid #6b7280;">
                <h4 style="font-size: 0.85rem; color: #6b7280; text-transform: uppercase; margin: 0;">Total Cadastrados</h4>
                <div style="font-size: 2.2rem; font-weight: 700; color: #111827; margin-top: 10px;">${totalEstablishments}</div>
            </div>

            <div style="background: #ffffff; padding: 25px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border-left: 5px solid #10b981;">
                <h4 style="font-size: 0.85rem; color: #6b7280; text-transform: uppercase; margin: 0;">Assinaturas Ativas</h4>
                <div style="font-size: 2.2rem; font-weight: 700; color: #10b981; margin-top: 10px;">${activeCount}</div>
            </div>

            <div style="background: #ffffff; padding: 25px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border-left: 5px solid #3b82f6;">
                <h4 style="font-size: 0.85rem; color: #6b7280; text-transform: uppercase; margin: 0;">Receita Mensal (MRR)</h4>
                <div style="font-size: 2.2rem; font-weight: 700; color: #3b82f6; margin-top: 10px;">${formatadoMRR}</div>
            </div>

            <div style="background: #ffffff; padding: 25px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border-left: 5px solid #ef4444;">
                <h4 style="font-size: 0.85rem; color: #6b7280; text-transform: uppercase; margin: 0;">Clientes Bloqueados</h4>
                <div style="font-size: 2.2rem; font-weight: 700; color: #ef4444; margin-top: 10px;">${blockedCount}</div>
            </div>
        `;

    } catch (error) {
        console.error("Erro ao carregar os dados do Dashboard:", error);
        container.innerHTML = `
            <div style="background: #fee2e2; color: #dc2626; padding: 20px; border-radius: 8px;">
                <strong>Erro ao buscar dados!</strong> Verifique a conexão com o banco de dados e as permissões (Rules).<br>
                <small>${error.message}</small>
            </div>
        `;
    }
}