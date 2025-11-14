const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

// Função auxiliar para calcular totais de uma sessão de caixa
async function calculateSessionTotals(db, establishmentId, sessionId) {
    const appointmentsQuery = db.collection('appointments')
        .where('establishmentId', '==', establishmentId)
        .where('cashierSessionId', '==', sessionId)
        .where('status', '==', 'completed');
    
    const salesQuery = db.collection('sales')
        .where('establishmentId', '==', establishmentId)
        .where('cashierSessionId', '==', sessionId);

    const [appointmentsSnapshot, salesSnapshot] = await Promise.all([
        appointmentsQuery.get(),
        salesQuery.get()
    ]);

    let cashSales = 0;
    const processPayments = (doc) => {
        const data = doc.data();
        (data.transaction?.payments || []).forEach(p => {
            if (p.method && p.method.toLowerCase() === 'dinheiro') {
                cashSales += p.value;
            }
        });
    };

    appointmentsSnapshot.forEach(processPayments);
    salesSnapshot.forEach(processPayments);

    return { cashSales };
}


// Verificar status do caixa
router.get('/status', async (req, res) => {
    // --- INÍCIO DA CORREÇÃO 1: FILTRAR POR USUÁRIO ---
    const { establishmentId, uid } = req.user; // Pega o UID do usuário logado
    const { db } = req;
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const snapshot = await db.collection('cashierSessions')
            .where('establishmentId', '==', establishmentId)
            .where('openTime', '>=', today)
            .where('openTime', '<', tomorrow)
            .where('status', '==', 'open')
            .where('openedBy', '==', uid) // <-- SÓ RETORNA O CAIXA ABERTO PELO PRÓPRIO USUÁRIO
            .limit(1)
            .get();
    // --- FIM DA CORREÇÃO 1 ---

        if (snapshot.empty) return res.status(200).json(null);
        
        const session = { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
        res.status(200).json(session);
    } catch (error) {
        console.error("Erro ao verificar status do caixa:", error);
        
        // --- INÍCIO DA CORREÇÃO 4: ENVIAR MENSAGEM DE ERRO ORIGINAL ---
        // Se for um erro de índice, envie a MENSAGEM ORIGINAL do Firebase
        if (error.message && error.message.includes('requires an index')) {
             return res.status(500).json({ message: error.message });
        }
        // --- FIM DA CORREÇÃO 4 ---
        
        res.status(500).json({ message: "Erro ao verificar status do caixa." });
    }
});

// ROTA: Obter os dados para o relatório de fecho
router.get('/report/:sessionId', async (req, res) => {
    const { sessionId } = req.params;
    const { establishmentId } = req.user;
    const { db } = req;

    try {
        const sessionDoc = await db.collection('cashierSessions').doc(sessionId).get();
        if (!sessionDoc.exists || sessionDoc.data().establishmentId !== establishmentId) {
            return res.status(404).json({ message: "Sessão de caixa não encontrada." });
        }

        const sessionData = sessionDoc.data();
        const { cashSales } = await calculateSessionTotals(db, establishmentId, sessionId);
        const expectedAmount = sessionData.initialAmount + cashSales;

        res.status(200).json({
            initialAmount: sessionData.initialAmount,
            cashSales,
            expectedAmount
        });

    } catch (error) {
        console.error("Erro ao gerar relatório de fecho de caixa:", error);
        res.status(500).json({ message: "Erro ao gerar relatório de fecho de caixa." });
    }
});

// Abrir o caixa
router.post('/open', async (req, res) => {
    const { initialAmount } = req.body;
    // CORREÇÃO: Captura o nome do utilizador a partir do token
    const { establishmentId, uid, name } = req.user; 
    const { db } = req;

    if (typeof initialAmount !== 'number' || initialAmount < 0) {
        return res.status(400).json({ message: "Valor inicial inválido." });
    }
    try {
        const newSession = {
            establishmentId,
            initialAmount,
            openedBy: uid,
            openedByName: name || 'Utilizador desconhecido', // Salva o nome de quem abriu
            openTime: admin.firestore.FieldValue.serverTimestamp(),
            status: 'open',
        };
        const docRef = await db.collection('cashierSessions').add(newSession);
        res.status(201).json({ id: docRef.id, ...newSession });
    } catch (error) {
        console.error("Erro ao abrir o caixa:", error);
        res.status(500).json({ message: "Erro ao abrir o caixa." });
    }
});

// Fechar o caixa
router.put('/close/:sessionId', async (req, res) => {
    const { sessionId } = req.params;
    const { finalAmount } = req.body;
    // CORREÇÃO: Captura o nome do utilizador a partir do token
    const { establishmentId, uid, name } = req.user;
    const { db } = req;
    
    try {
        const { cashSales } = await calculateSessionTotals(db, establishmentId, sessionId);
        const sessionRef = db.collection('cashierSessions').doc(sessionId);

        const sessionDoc = await sessionRef.get();
        if (!sessionDoc.exists) {
             return res.status(404).json({ message: "Sessão de caixa não encontrada." });
        }
        const sessionData = sessionDoc.data();

        // --- INÍCIO DA CORREÇÃO 2: VERIFICAR QUEM ABRIU ---
        if (sessionData.openedBy !== uid) {
            return res.status(403).json({ message: "Acesso negado. Você só pode fechar um caixa que você mesmo abriu." });
        }
        // --- FIM DA CORREÇÃO 2 ---

        const expectedAmount = sessionData.initialAmount + cashSales;
        const difference = finalAmount - expectedAmount;

        await sessionRef.update({
            finalAmount: finalAmount,
            closedBy: uid,
            closedByName: name || 'Utilizador desconhecido', // Salva o nome de quem fechou
            closeTime: admin.firestore.FieldValue.serverTimestamp(),
            status: 'closed',
            report: { cashSales, expectedAmount, difference }
        });

        const updatedSession = await sessionRef.get();
        res.status(200).json(updatedSession.data());

    } catch (error) {
        console.error("Erro ao fechar o caixa:", error);
        res.status(500).json({ message: error.message || "Erro ao fechar o caixa." });
    }
});

// Obter histórico do caixa
router.get('/history', async (req, res) => {
    // --- INÍCIO DA CORREÇÃO 3: FILTRAR HISTÓRICO POR PERMISSÃO ---
    const { establishmentId, uid, role, permissions } = req.user;
    const { db } = req;

    try {
        let query = db.collection('cashierSessions')
            .where('establishmentId', '==', establishmentId)
            .where('status', '==', 'closed');
        
        // Verifica se o usuário pode ver relatórios de todos
        // (Dono (permissions=null) ou funcionário com a permissão específica)
        const canViewAllReports = (role === 'owner' || (permissions && permissions['relatorios-section']?.view === true));

        // Se NÃO PODE ver tudo, filtra para mostrar apenas os caixas abertos pelo próprio usuário
        if (!canViewAllReports) {
            query = query.where('openedBy', '==', uid);
        }

        // A ordenação deve vir depois dos 'where' de igualdade
        const snapshot = await query.orderBy('closeTime', 'desc').limit(30).get();
        
        if (snapshot.empty) return res.status(200).json([]);
        
        const history = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                openTime: data.openTime.toDate().toISOString(),
                closeTime: data.closeTime.toDate().toISOString(),
                initialAmount: data.initialAmount,
                finalAmount: data.finalAmount,
                report: data.report,
                openedByName: data.openedByName || 'N/A',
                closedByName: data.closedByName || 'N/A',
                openedBy: data.openedBy // <-- Adicionado para o filtro (se necessário no futuro)
            };
        });
        res.status(200).json(history);
    // --- FIM DA CORREÇÃO 3 ---
    } catch (error) {
        console.error("Erro ao buscar histórico de caixa:", error);
        // Verifica erro de índice (caso a permissão exija)
        if (error.message && error.message.includes('requires an index')) {
             return res.status(500).json({ message: error.message }); // Envia o erro original
        }
        res.status(500).json({ message: "Erro ao buscar histórico de caixa." });
    }
});

module.exports = router;