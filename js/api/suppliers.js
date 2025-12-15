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
    where
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

const COLLECTION_NAME = 'suppliers';
const PURCHASES_COLLECTION = 'purchases';

// --- FORNECEDORES ---

// ALTERADO: Agora recebe establishmentId para filtrar
export const getAll = async (establishmentId) => {
    try {
        // Cria a query filtrando pelo establishmentId
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

// --- COMPRAS (NOVO) ---

export const registerPurchase = async (purchaseData) => {
    try {
        // Adiciona timestamp se não vier
        const data = {
            ...purchaseData,
            createdAt: new Date()
        };
        const docRef = await addDoc(collection(db, PURCHASES_COLLECTION), data);
        return { id: docRef.id, ...data };
    } catch (error) {
        console.error("Erro ao registrar compra:", error);
        throw error;
    }
};

export const getPurchaseHistory = async (establishmentId) => {
    try {
        // ALTERADO: Filtro por estabelecimento ativado
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

// Alias (Mantém compatibilidade se algum outro ficheiro usar 'delete')
export { deleteSupplier as delete };