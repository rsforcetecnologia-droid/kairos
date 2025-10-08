const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

// --- CATEGORIAS DE PRODUTOS ---
router.post('/categories', async (req, res) => {
    try {
        const { establishmentId, name } = req.body;
        if (!establishmentId || !name) return res.status(400).json({ message: 'ID do estabelecimento e nome da categoria são obrigatórios.' });
        const { db } = req;
        const newCategory = { establishmentId, name, createdAt: admin.firestore.FieldValue.serverTimestamp() };
        const docRef = await db.collection('productCategories').add(newCategory);
        res.status(201).json({ message: 'Categoria criada com sucesso!', id: docRef.id, data: newCategory });
    } catch (error) {
        console.error("Erro ao criar categoria:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

router.get('/categories/:establishmentId', async (req, res) => {
    try {
        const { establishmentId } = req.params;
        const { db } = req;
        const snapshot = await db.collection('productCategories').where('establishmentId', '==', establishmentId).orderBy('name').get();
        if (snapshot.empty) return res.status(200).json([]);
        const categoriesList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(categoriesList);
    } catch (error) {
        console.error("Erro ao listar categorias:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

router.delete('/categories/:categoryId', async (req, res) => {
    const { categoryId } = req.params;
    try {
        const { db } = req;
        await db.collection('productCategories').doc(categoryId).delete();
        res.status(200).json({ message: 'Categoria apagada com sucesso.' });
    } catch (error) {
        console.error("Erro ao apagar categoria:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

// --- PRODUTOS ---
router.post('/', async (req, res) => {
    try {
        const { establishmentId, name, price, currentStock, minStock, maxStock, categoryId, photo, commissionRate } = req.body;
        if (!establishmentId || !name || price === undefined) return res.status(400).json({ message: 'Os campos establishmentId, name e price são obrigatórios.' });
        const { db } = req;
        const newProduct = {
            establishmentId, name,
            price: Number(price) || 0,
            currentStock: Number(currentStock) || 0,
            minStock: Number(minStock) || 0,
            maxStock: Number(maxStock) || 0,
            categoryId: categoryId || null,
            photo: photo || null,
            commissionRate: Number(commissionRate) || 0,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        };
        const docRef = await db.collection('products').add(newProduct);
        res.status(201).json({ message: 'Produto criado com sucesso!', productId: docRef.id, data: newProduct });
    } catch (error) {
        console.error("Erro ao criar produto:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor ao tentar criar o produto.' });
    }
});

router.get('/:establishmentId', async (req, res) => {
    try {
        const { establishmentId } = req.params;
        const { db } = req;
        const snapshot = await db.collection('products').where('establishmentId', '==', establishmentId).orderBy('name').get();
        if (snapshot.empty) return res.status(200).json([]);
        const productsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(productsList);
    } catch (error) {
        console.error("Erro ao listar produtos:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor ao tentar listar os produtos.' });
    }
});

// ATUALIZADO: Rota de atualização agora regista o histórico de estoque
router.put('/:productId', async (req, res) => {
    const { productId } = req.params;
    const data = req.body;
    try {
        const { db } = req;
        const productRef = db.collection('products').doc(productId);

        await db.runTransaction(async (transaction) => {
            const productDoc = await transaction.get(productRef);
            if (!productDoc.exists) {
                throw new Error("Produto não encontrado.");
            }

            const oldStock = productDoc.data().currentStock || 0;
            const newStock = Number(data.currentStock) || 0;
            const change = newStock - oldStock;

            const updatedData = {
                ...data,
                price: Number(data.price) || 0,
                currentStock: newStock,
                minStock: Number(data.minStock) || 0,
                maxStock: Number(data.maxStock) || 0,
                commissionRate: Number(data.commissionRate) || 0,
            };
            
            transaction.update(productRef, updatedData);

            if (change !== 0) {
                const historyRef = productRef.collection('stockHistory').doc();
                transaction.set(historyRef, {
                    change,
                    newStock,
                    oldStock,
                    reason: 'Ajuste manual (edição)',
                    timestamp: admin.firestore.FieldValue.serverTimestamp(),
                    user: req.user.uid // Regista o UID do utilizador que fez a alteração
                });
            }
        });
        
        res.status(200).json({ message: 'Produto atualizado com sucesso.' });
    } catch (error) {
        console.error("Erro ao atualizar produto:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});


router.patch('/:productId/stock', async (req, res) => {
    const { productId } = req.params;
    const { change, reason } = req.body;
    if (typeof change !== 'number') return res.status(400).json({ message: 'A quantidade da alteração ("change") deve ser um número.' });
    try {
        const { db } = req;
        const productRef = db.collection('products').doc(productId);
        await db.runTransaction(async (transaction) => {
            const productDoc = await transaction.get(productRef);
            if (!productDoc.exists) throw new Error("Produto não encontrado.");
            const oldStock = productDoc.data().currentStock || 0;
            const newStock = oldStock + change;
            if (newStock < 0) throw new Error("A operação resultaria em stock negativo.");
            transaction.update(productRef, { currentStock: newStock });
            const historyRef = productRef.collection('stockHistory').doc();
            transaction.set(historyRef, {
                change, newStock, oldStock,
                reason: reason || 'Ajuste manual',
                timestamp: admin.firestore.FieldValue.serverTimestamp(),
                user: req.user.uid
            });
        });
        res.status(200).json({ message: 'Stock atualizado com sucesso.' });
    } catch (error) {
        console.error("Erro ao ajustar stock:", error);
        res.status(500).json({ message: error.message || 'Ocorreu um erro no servidor.' });
    }
});

router.delete('/:productId', async (req, res) => {
    const { productId } = req.params;
    try {
        const { db } = req;
        if (!productId) return res.status(400).json({ message: 'O ID do produto é obrigatório.' });
        await db.collection('products').doc(productId).delete();
        res.status(200).json({ message: 'Produto removido com sucesso.' });
    } catch (error) {
        console.error("Erro ao remover produto:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

router.get('/:productId/stock-history', async (req, res) => {
    const { productId } = req.params;
    try {
        const { db } = req;
        const historySnapshot = await db.collection('products').doc(productId).collection('stockHistory').orderBy('timestamp', 'desc').get();
        if (historySnapshot.empty) return res.status(200).json([]);
        const history = historySnapshot.docs.map(doc => {
            const data = doc.data();
            return { ...data, timestamp: data.timestamp.toDate() };
        });
        res.status(200).json(history);
    } catch (error) {
        console.error("Erro ao buscar histórico de stock:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

router.get('/stock-history/report', async (req, res) => {
    const { establishmentId } = req.user;
    const { startDate, endDate, productId, categoryId } = req.query;

    if (!startDate || !endDate) {
        return res.status(400).json({ message: 'Datas de início e fim são obrigatórias.' });
    }

    try {
        const { db } = req;
        const start = admin.firestore.Timestamp.fromDate(new Date(startDate));
        const end = admin.firestore.Timestamp.fromDate(new Date(endDate + "T23:59:59"));

        let productsQuery = db.collection('products').where('establishmentId', '==', establishmentId);

        if (productId && productId !== 'all') {
            productsQuery = productsQuery.where(admin.firestore.FieldPath.documentId(), '==', productId);
        }
        if (categoryId && categoryId !== 'all') {
            productsQuery = productsQuery.where('categoryId', '==', categoryId);
        }

        const productsSnapshot = await productsQuery.get();
        if (productsSnapshot.empty) {
            return res.status(200).json([]);
        }

        const allMovements = [];
        const userCache = {}; 

        for (const productDoc of productsSnapshot.docs) {
            const productData = productDoc.data();
            const historyQuery = db.collection('products').doc(productDoc.id).collection('stockHistory')
                .where('timestamp', '>=', start)
                .where('timestamp', '<=', end)
                .orderBy('timestamp', 'desc');
            
            const historySnapshot = await historyQuery.get();

            for (const historyDoc of historySnapshot.docs) {
                const historyData = historyDoc.data();

                if (historyData.user && !userCache[historyData.user]) {
                    try {
                        const userRecord = await admin.auth().getUser(historyData.user);
                        userCache[historyData.user] = userRecord.displayName || userRecord.email;
                    } catch (e) {
                        userCache[historyData.user] = 'Utilizador Desconhecido';
                    }
                }

                allMovements.push({
                    productId: productDoc.id,
                    productName: productData.name,
                    date: historyData.timestamp.toDate(),
                    change: historyData.change,
                    oldStock: historyData.oldStock,
                    newStock: historyData.newStock,
                    reason: historyData.reason,
                    user: userCache[historyData.user] || 'N/A'
                });
            }
        }

        allMovements.sort((a, b) => b.date - a.date);

        res.status(200).json(allMovements);

    } catch (error) {
        console.error("Erro ao gerar relatório de estoque:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});


module.exports = router;