const express = require('express');
const router = express.Router();

router.get('/:establishmentId', async (req, res) => {
    const { establishmentId } = req.params;
    try {
        const { db } = req;

        // Busca os dados de 3 coleções em paralelo para otimizar
        const [appointmentsSnapshot, walkInSalesSnapshot, professionalsSnapshot] = await Promise.all([
            // Busca TODOS os agendamentos (em aberto e finalizados)
            db.collection('appointments').where('establishmentId', '==', establishmentId).get(),
            // Busca APENAS as vendas avulsas para evitar duplicar os agendamentos finalizados
            db.collection('sales').where('establishmentId', '==', establishmentId).where('type', '==', 'walk-in').get(),
            db.collection('professionals').where('establishmentId', '==', establishmentId).get()
        ]);

        const professionalsMap = new Map(professionalsSnapshot.docs.map(doc => [doc.id, doc.data().name]));

        // Mapeia os agendamentos para o formato de comanda
        let comandasFromAppointments = appointmentsSnapshot.docs.map(doc => {
            const comanda = { id: doc.id, ...doc.data() };
            // Converte Timestamps para Datas ISO para serem consistentes no frontend
            if (comanda.transaction && comanda.transaction.paidAt) {
                comanda.transaction.paidAt = comanda.transaction.paidAt.toDate().toISOString();
            }
            if (comanda.startTime) {
                comanda.startTime = comanda.startTime.toDate().toISOString();
            }
            if (comanda.endTime) {
                comanda.endTime = comanda.endTime.toDate().toISOString();
            }
            return {
                ...comanda,
                type: 'appointment', // Garante que o tipo está definido
                professionalName: professionalsMap.get(comanda.professionalId) || 'Indefinido'
            };
        });
        
        // Mapeia as vendas avulsas para o formato de comanda
        let comandasFromSales = walkInSalesSnapshot.docs.map(doc => {
            const sale = { id: doc.id, ...doc.data() };
            if (sale.transaction && sale.transaction.paidAt) {
                sale.transaction.paidAt = sale.transaction.paidAt.toDate().toISOString();
            }
            if (sale.startTime) {
                sale.startTime = sale.startTime.toDate().toISOString();
            }
            return {
                ...sale,
                professionalName: sale.professionalName || professionalsMap.get(sale.professionalId) || 'Indefinido'
            };
        });

        // Junta os dois arrays
        const allComandas = [...comandasFromAppointments, ...comandasFromSales];

        // Ordena o resultado final pela data de início/criação
        allComandas.sort((a, b) => new Date(b.startTime) - new Date(a.startTime));

        res.status(200).json(allComandas);
    } catch (error) {
        console.error("Erro ao listar comandas:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor ao buscar comandas.' });
    }
});

module.exports = router;
