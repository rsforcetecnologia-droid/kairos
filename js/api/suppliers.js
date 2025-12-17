// js/api/suppliers.js
import { db } from '../firebase-config.js';
import { 
    collection, 
    getDocs, 
    addDoc, 
    doc, 
    updateDoc, 
    deleteDoc,
    query,
    orderBy,
    where,
    writeBatch,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

const COLLECTION_NAME = 'suppliers';
const PURCHASES_COLLECTION = 'purchases';
const FINANCIAL_PAYABLES_COLLECTION = 'financial_payables'; // Garanta que este nome bate com o Firestore

// --- FORNECEDORES ---

export const getAll = async (establishmentId) => {
    try {
        const q = query(
            collection(db, COLLECTION_NAME),
            where("establishmentId", "==", establishmentId)
        );
        const querySnapshot = await getDocs(q);
        const suppliers = [];
        querySnapshot.forEach((doc) => {
            suppliers.push({ id: doc.id, ...doc.data() });
        });
        return suppliers;
    } catch (error) {
        console.error("Erro ao buscar fornecedores:", error);
        throw error;
    }
};

export const createSupplier = async (data) => {
    try {
        const docRef = await addDoc(collection(db, COLLECTION_NAME), data);
        return { id: docRef.id, ...data };
    } catch (error) {
        console.error("Erro ao criar fornecedor:", error);
        throw error;
    }
};

export const updateSupplier = async (id, data) => {
    try {
        const docRef = doc(db, COLLECTION_NAME, id);
        await updateDoc(docRef, data);
        return { id, ...data };
    } catch (error) {
        console.error("Erro ao atualizar fornecedor:", error);
        throw error;
    }
};

export const deleteSupplier = async (id) => {
    try {
        const docRef = doc(db, COLLECTION_NAME, id);
        await deleteDoc(docRef);
        return true;
    } catch (error) {
        console.error("Erro ao excluir fornecedor:", error);
        throw error;
    }
};

// --- COMPRAS (COM INTEGRAÇÃO E SEGURANÇA CORRIGIDA) ---

export const registerPurchase = async (purchaseData, financialConfig = null) => {
    try {
        const batch = writeBatch(db);
        
        const purchaseRef = doc(collection(db, PURCHASES_COLLECTION));
        const finalPurchaseData = {
            ...purchaseData,
            createdAt: serverTimestamp()
        };
        batch.set(purchaseRef, finalPurchaseData);

        if (financialConfig && financialConfig.defaultNatureId && financialConfig.defaultCostCenterId) {
            const financialRef = doc(collection(db, FINANCIAL_PAYABLES_COLLECTION));
            const today = new Date().toISOString().split('T')[0];
            
            const financialEntry = {
                establishmentId: purchaseData.establishmentId,
                description: `Compra - ${purchaseData.supplierName}`,
                amount: parseFloat(purchaseData.totalAmount),
                dueDate: today,
                naturezaId: financialConfig.defaultNatureId,
                centroDeCustoId: financialConfig.defaultCostCenterId,
                notes: `Gerado automaticamente pelo Pedido de Compra. Itens: ${purchaseData.items.length}`,
                status: 'pending',
                paymentDate: null,
                purchaseId: purchaseRef.id,
                createdAt: serverTimestamp()
            };
            batch.set(financialRef, financialEntry);
        }

        await batch.commit();
        return { id: purchaseRef.id, ...finalPurchaseData };
    } catch (error) {
        console.error("Erro ao registrar compra com integração:", error);
        throw error;
    }
};

// CORREÇÃO CRÍTICA AQUI: Recebe establishmentId e filtra na query
export const deletePurchase = async (purchaseId, establishmentId) => {
    try {
        const batch = writeBatch(db);

        // 1. Deletar do Histórico de Compras
        const purchaseRef = doc(db, PURCHASES_COLLECTION, purchaseId);
        batch.delete(purchaseRef);

        // 2. Buscar e Deletar lançamentos do Financeiro
        // OBRIGATÓRIO: O filtro 'establishmentId' é exigido pelas Regras de Segurança para permitir o 'read' (query)
        const finQuery = query(
            collection(db, FINANCIAL_PAYABLES_COLLECTION), 
            where('purchaseId', '==', purchaseId),
            where('establishmentId', '==', establishmentId) 
        );
        
        const finSnapshot = await getDocs(finQuery);
        
        finSnapshot.forEach(docSnap => {
            batch.delete(docSnap.ref);
        });

        await batch.commit();
        return true;
    } catch (error) {
        console.error("Erro ao excluir compra e financeiro:", error);
        throw error;
    }
};

export const getPurchaseHistory = async (establishmentId) => {
    try {
        const q = query(
            collection(db, PURCHASES_COLLECTION), 
            where("establishmentId", "==", establishmentId), 
            orderBy("createdAt", "desc")
        );
        
        const querySnapshot = await getDocs(q);
        const purchases = [];
        querySnapshot.forEach((doc) => {
            purchases.push({ id: doc.id, ...doc.data() });
        });
        return purchases;
    } catch (error) {
        console.error("Erro ao buscar histórico de compras:", error);
        throw error;
    }
};

export { deleteSupplier as delete };