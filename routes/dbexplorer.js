const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

// Função auxiliar para executar os comandos com segurança
router.post('/execute', async (req, res) => {
    const { action, collection, docId, data, where } = req.body;
    const { db } = req;

    if (!action || !collection) {
        return res.status(400).json({ message: "As propriedades 'action' e 'collection' são obrigatórias." });
    }

    try {
        switch (action.toLowerCase()) {
            case 'get': {
                let query = db.collection(collection);
                if (docId) {
                    const doc = await query.doc(docId).get();
                    if (!doc.exists) return res.status(404).json({ message: "Documento não encontrado." });
                    return res.status(200).json({ id: doc.id, ...doc.data() });
                }
                if (where && Array.isArray(where)) {
                    where.forEach(condition => {
                        query = query.where(condition[0], condition[1], condition[2]);
                    });
                }
                const snapshot = await query.get();
                const results = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                return res.status(200).json({ count: results.length, results: results });
            }
            case 'update': {
                if (!docId || !data) return res.status(400).json({ message: "'docId' e 'data' são obrigatórios para a ação 'update'." });
                await db.collection(collection).doc(docId).update(data);
                return res.status(200).json({ message: `Documento ${docId} em '${collection}' atualizado com sucesso.` });
            }
            case 'delete': {
                if (!docId) return res.status(400).json({ message: "'docId' é obrigatório para a ação 'delete'." });
                await db.collection(collection).doc(docId).delete();
                return res.status(200).json({ message: `Documento ${docId} em '${collection}' apagado com sucesso.` });
            }
            default:
                return res.status(400).json({ message: `Ação '${action}' é inválida. Use 'get', 'update' ou 'delete'.` });
        }
    } catch (error) {
        console.error("Erro no DB Explorer:", error);
        res.status(500).json({ message: `Erro ao executar comando: ${error.message}` });
    }
});

module.exports = router;
