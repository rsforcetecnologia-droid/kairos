// rsforcetecnologia-droid/kairos/kairos-08f2f50a43dfea2e6a68fcf12573d31b5ad8013e/routes/comandas.js

const express = require('express');
const router = express.Router();

router.get('/:establishmentId', async (req, res) => {
    const { establishmentId } = req.params;
    
    // Novo: Permissão explícita para ver todos os profissionais, caso o usuário logado seja Owner.
    // O professionalId virá do query param, que foi setado pelo frontend com o ID do usuário logado.
    const professionalIdFilter = req.query.professionalId; 
    
    // O Owner tem role 'owner', e geralmente não tem professionalId. Se for Owner, não filtramos.
    // Se for Employee e o professionalId não foi setado no token/query, filtramos pelo establishmentId.
    const isOwner = req.user && req.user.role === 'owner';

    try {
        const { db } = req;

        // Queries base
        let appointmentsQuery = db.collection('appointments').where('establishmentId', '==', establishmentId);
        let walkInSalesQuery = db.collection('sales').where('establishmentId', '==', establishmentId).where('type', '==', 'walk-in');
        
        // APLICA O FILTRO APENAS SE NÃO FOR O DONO E O professionalId TIVER SIDO FORNECIDO
        if (!isOwner && professionalIdFilter) {
            // Garante que o profissional só veja as comandas associadas a ele.
            appointmentsQuery = appointmentsQuery.where('professionalId', '==', professionalIdFilter);
            walkInSalesQuery = walkInSalesQuery.where('professionalId', '==', professionalIdFilter);
        }

        const [appointmentsSnapshot, walkInSalesSnapshot, professionalsSnapshot] = await Promise.all([
            appointmentsQuery.get(), 
            walkInSalesQuery.get(),   
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
                type: 'appointment', 
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