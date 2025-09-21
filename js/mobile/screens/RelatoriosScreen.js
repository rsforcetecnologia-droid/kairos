// js/mobile/screens/RelatoriosScreen.js

const { React } = window;
const { useState, useEffect, useRef } = React;
const { Chart: ChartJS } = window; // Aceder ao Chart.js do window

import { authenticatedFetch } from '../services/apiService.js';

// Componente para renderizar o gráfico, garantindo que seja destruído corretamente
const ChartCanvas = ({ chartData }) => {
    const canvasRef = useRef(null);
    const chartInstanceRef = useRef(null);

    useEffect(() => {
        if (canvasRef.current && chartData) {
            // Destrói qualquer gráfico anterior na tela para evitar conflitos
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }

            const chartOptions = {
                responsive: true,
                plugins: {
                    legend: { display: false },
                    title: { display: false },
                },
                scales: {
                    y: { beginAtZero: true }
                }
            };

            chartInstanceRef.current = new ChartJS(canvasRef.current, {
                type: 'bar',
                data: chartData,
                options: chartOptions
            });
        }
        
        // Função de limpeza para destruir o gráfico quando o componente for desmontado
        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
        };
    }, [chartData]);

    return <canvas ref={canvasRef}></canvas>;
};


const RelatoriosScreen = ({ user, showNotification }) => {
    const [kpis, setKpis] = useState(null);
    const [chartData, setChartData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReports = async () => {
            if (!user) return;
            setIsLoading(true);
            setError(null);
            
            // Define o período do relatório (últimos 30 dias)
            const endDate = new Date();
            const startDate = new Date();
            startDate.setDate(endDate.getDate() - 30);

            try {
                const url = `/api/analytics/${user.establishmentId}?startDate=${startDate.toISOString().split('T')[0]}&endDate=${endDate.toISOString().split('T')[0]}`;
                const data = await authenticatedFetch(url, {}, user);

                setKpis(data.kpis);
                setChartData({
                    labels: data.transactionsByMonth.map(item => item.month),
                    datasets: [{
                        label: 'Vendas',
                        data: data.transactionsByMonth.map(item => item.revenue),
                        backgroundColor: 'rgba(59, 130, 246, 0.5)',
                        borderColor: 'rgba(59, 130, 246, 1)',
                        borderWidth: 1,
                    }]
                });

            } catch (err) {
                setError('Falha ao carregar os relatórios.');
                showNotification('Erro', err.message);
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchReports();
    }, [user, showNotification]);

    if (error) return <div className="text-center p-10 text-red-500">{error}</div>;

    return (
        <div className={`p-4 space-y-6 ${isLoading ? 'animate-pulse' : ''}`}>
            <div className={`p-4 space-y-6 ${!isLoading ? 'animate-none' : ''}`}>
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow-md text-center">
                        <p className="text-sm text-gray-500">Receita Total</p>
                        {isLoading ? <div className="h-8 bg-gray-200 rounded-md mt-1"></div> : <p className="text-2xl font-bold text-green-600">R$ {(kpis?.totalRevenue || 0).toFixed(2)}</p>}
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md text-center">
                        <p className="text-sm text-gray-500">Vendas Totais</p>
                        {isLoading ? <div className="h-8 bg-gray-200 rounded-md mt-1"></div> : <p className="text-2xl font-bold text-blue-600">{kpis?.totalTransactions || 0}</p>}
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md text-center">
                    <p className="text-sm text-gray-500">Item Mais Popular</p>
                    {isLoading ? <div className="h-7 bg-gray-200 rounded-md mt-1 w-3/4 mx-auto"></div> : <p className="text-xl font-bold text-indigo-600">{kpis?.mostPopularItem || 'N/A'}</p>}
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="font-semibold text-gray-800 mb-4">Receita por Mês</h3>
                    {isLoading || !chartData ? <div className="h-48 bg-gray-200 rounded-md"></div> : <ChartCanvas chartData={chartData} />}
                </div>
            </div>
        </div>
    );
};

export default RelatoriosScreen;