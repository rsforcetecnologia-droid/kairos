// js/api/audit.js
import { db } from '../firebase-config.js';
import { 
    collection, 
    addDoc, 
    query, 
    where, 
    orderBy, 
    getDocs, 
    limit 
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

const COLLECTION = 'audit_logs';

/**
 * Regista uma ação no sistema.
 * @param {string} establishmentId
 * @param {object} user 
 * @param {string} module 
 * @param {string} action 
 * @param {string} description 
 * @param {array|object} details - (NOVO) Lista de alterações {field, old, new}
 */
export const logAction = async (establishmentId, user, module, action, description, details = null) => {
    try {
        if (!user) return; 
        
        await addDoc(collection(db, COLLECTION), {
            establishmentId,
            userId: user.uid,
            userName: user.name || user.email || 'Utilizador',
            module,
            action,
            description,
            details, // <--- Guardamos os detalhes aqui
            timestamp: new Date()
        });
    } catch (error) {
        console.error("Falha silenciosa ao registar log:", error);
    }
};

export const getAuditLogs = async (establishmentId, limitLogs = 100) => {
    try {
        const q = query(
            collection(db, COLLECTION),
            where("establishmentId", "==", establishmentId),
            orderBy("timestamp", "desc"),
            limit(limitLogs)
        );

        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Erro ao buscar logs:", error);
        throw error;
    }
};