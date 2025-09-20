import React, { useState, useEffect, useCallback, useRef } from 'react';
import { authenticatedFetch } from '../mobileApi.js';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const RelatoriosScreen = ({ user, showNotification }) => {
    const [kpis, setKpis] = useState(null);
    const [chartData, setChartData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const chartRef = useRef(null);

    const fetchReports = useCallback(async () => {
        if (!user) return;
        setIsLoading(true);
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(endDate.getDate() - 30);
        
        try {
            const endpoint = `/api/analytics/${user.establishmentId}?startDate=${startDate.toISOString().split('T')[0]}&endDate=${endDate.toISOString().split('T')[0]}`;
            const data = await authenticatedFetch(endpoint, {}, user);
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
            showNotification('Erro de Relatórios', err.message);
        } finally {
            setIsLoading(false);
        }
    }, [user, showNotification]);

    useEffect(() => {
        fetchReports();
    }, [fetchReports]);

    const chartOptions = {
        responsive: true,
        plugins: { legend: { display: false }, title: { display: false } },
        scales: { y: { beginAtZero: true } } 
    };

    const ChartCanvas = () => {
        useEffect(() => {
            if (chartRef.current && chartData) {
                const chartInstance = new ChartJS(chartRef.current, {
                    type: 'bar',
                    data: chartData,
                    options: chartOptions
                });
                return () => chartInstance.destroy();
            }
        }, [chartData]);
        return <canvas ref={chartRef}></canvas>;
    };

    return (
        <div className={`p-4 space-y-6 ${isLoading ? 'animate-pulse' : ''}`}>
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
                <h3 className="font-semibold text-gray-800 mb-4">Vendas por Mês</h3>
                {isLoading || !chartData ? <div className="h-48 bg-gray-200 rounded-md"></div> : <ChartCanvas />}
            </div>
        </div>
    );
};
