const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const multer = require('multer');
const xlsx = require('xlsx');
const { verifyToken, isSuperAdmin } = require('../middlewares/auth');

const upload = multer({ storage: multer.memoryStorage() });

// Função auxiliar para converter datas do Excel (números) para objetos Date do JavaScript
const excelDateToJSDate = (excelDate) => {
    if (typeof excelDate !== 'number') {
        // Se já for uma string de data (ex: YYYY-MM-DD), tenta converter diretamente
        const date = new Date(excelDate);
        if (!isNaN(date.getTime())) {
            return date;
        }
        return null;
    }
    // O Excel armazena datas como o número de dias desde 1900-01-01
    const jsDate = new Date(Date.UTC(1899, 11, 30, 0, 0, 0, 0) + excelDate * 86400000);
    // Adiciona o fuso horário local para evitar problemas de um dia a menos
    jsDate.setMinutes(jsDate.getMinutes() + jsDate.getTimezoneOffset());
    return jsDate;
};


router.post('/:establishmentId/:type', verifyToken, isSuperAdmin, upload.single('dataFile'), async (req, res) => {
    const { establishmentId, type } = req.params;
    if (!req.file) {
        return res.status(400).json({ message: 'Nenhum arquivo enviado.' });
    }

    try {
        const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(sheet);

        const { db } = req;
        const batch = db.batch();
        let count = 0;

        // Cache para evitar buscas repetidas no banco de dados
        const professionalsCache = new Map();
        const servicesCache = new Map();

        const getProfessional = async (id) => {
            if (professionalsCache.has(id)) return professionalsCache.get(id);
            const doc = await db.collection('professionals').doc(id).get();
            if (!doc.exists) throw new Error(`Profissional com ID ${id} não encontrado.`);
            const data = doc.data();
            professionalsCache.set(id, data);
            return data;
        };

        const getService = async (id) => {
            if (servicesCache.has(id)) return servicesCache.get(id);
            const doc = await db.collection('services').doc(id).get();
            if (!doc.exists) throw new Error(`Serviço com ID ${id} não encontrado.`);
            const data = doc.data();
            servicesCache.set(id, data);
            return data;
        };


        switch (type) {
            case 'products':
                data.forEach(row => {
                    const docRef = db.collection('products').doc();
                    batch.set(docRef, {
                        establishmentId,
                        name: row.name,
                        price: parseFloat(row.price) || 0,
                        currentStock: parseInt(row.currentStock) || 0,
                        minStock: parseInt(row.minStock) || 0,
                        maxStock: parseInt(row.maxStock) || 0,
                        createdAt: admin.firestore.FieldValue.serverTimestamp()
                    });
                    count++;
                });
                break;
            case 'services':
                 data.forEach(row => {
                    const docRef = db.collection('services').doc();
                    batch.set(docRef, {
                        establishmentId,
                        name: row.name,
                        price: parseFloat(row.price) || 0,
                        duration: parseInt(row.duration) || 0,
                        bufferTime: parseInt(row.bufferTime) || 0,
                        active: true,
                        createdAt: admin.firestore.FieldValue.serverTimestamp()
                    });
                    count++;
                });
                break;
            case 'professionals':
                 data.forEach(row => {
                    const docRef = db.collection('professionals').doc();
                    batch.set(docRef, {
                        establishmentId,
                        name: row.name,
                        specialty: row.specialty,
                        status: 'active',
                        createdAt: admin.firestore.FieldValue.serverTimestamp()
                    });
                    count++;
                });
                break;
            
            case 'appointments':
                for (const row of data) {
                    const professional = await getProfessional(row.professionalId);
                    const service = await getService(row.serviceId);
                    
                    const totalDuration = (service.duration || 0) + (service.bufferTime || 0);
                    const startDate = excelDateToJSDate(row.startTime);
                    if (!startDate) throw new Error(`Data/hora inválida para ${row.clientName}: ${row.startTime}`);

                    const endDate = new Date(startDate.getTime() + totalDuration * 60000);

                    const docRef = db.collection('appointments').doc();
                    batch.set(docRef, {
                        establishmentId,
                        clientName: row.clientName,
                        clientPhone: String(row.clientPhone),
                        professionalId: row.professionalId,
                        professionalName: professional.name,
                        services: [{ id: row.serviceId, name: service.name, price: service.price, duration: service.duration, bufferTime: service.bufferTime }],
                        startTime: admin.firestore.Timestamp.fromDate(startDate),
                        endTime: admin.firestore.Timestamp.fromDate(endDate),
                        status: 'confirmed',
                        createdAt: admin.firestore.FieldValue.serverTimestamp()
                    });
                    count++;
                }
                break;

            case 'financials':
                data.forEach(row => {
                    const collection = row.type === 'payable' ? 'financial_payables' : 'financial_receivables';
                    const dueDate = excelDateToJSDate(row.dueDate);
                     if (!dueDate) throw new Error(`Data de vencimento inválida para ${row.description}: ${row.dueDate}`);

                    const docRef = db.collection(collection).doc();
                    batch.set(docRef, {
                        establishmentId,
                        description: row.description,
                        amount: parseFloat(row.amount) || 0,
                        dueDate: dueDate.toISOString().split('T')[0],
                        status: 'pending',
                        createdAt: admin.firestore.FieldValue.serverTimestamp()
                    });
                    count++;
                });
                break;
            
            default:
                return res.status(400).json({ message: 'Tipo de importação inválido.' });
        }

        await batch.commit();
        res.status(200).json({ message: `${count} registros de ${type} importados com sucesso para o estabelecimento ${establishmentId}!` });

    } catch (error) {
        console.error("Erro na importação:", error);
        res.status(500).json({ message: `Ocorreu um erro no servidor: ${error.message}` });
    }
});

module.exports = router;