const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // Certifica-te que o arquivo está na mesma pasta

// 1. Inicializa o Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// 2. Define os Módulos Padrão (Como o site diz "Sistema Completo" para todos, ativamos tudo)
const allModules = {
    agenda: true,
    financial: true,
    sales: true,
    stock: true,
    professionals: true,
    clients: true,
    reports: true,
    marketing: true,
    settings: true
};

// 3. Dados dos Planos (Baseado no teu CSV e estrutura definida)
const plans = [
    // --- SOLO (1 Profissional) ---
    {
        id: 'solo_mensal',
        data: {
            name: 'Plano Solo - Mensal',
            stripePriceId: 'price_1STtcZAIZNC4mWLrdcFeJnWj', // ID do Stripe (CSV)
            price: 79.90,
            maxProfessionals: 1,
            maxUsers: 1,
            description: 'Ideal para profissionais independentes. Cobrança mensal.',
            allowedModules: allModules,
            active: true
        }
    },
    {
        id: 'solo_semestral',
        data: {
            name: 'Plano Solo - Semestral',
            stripePriceId: 'price_1Sh94fAIZNC4mWLrd9JJauh5',
            price: 406.80, // Valor total do período
            maxProfessionals: 1,
            maxUsers: 1,
            description: 'Ideal para profissionais independentes. Cobrança semestral.',
            allowedModules: allModules,
            active: true
        }
    },
    {
        id: 'solo_anual',
        data: {
            name: 'Plano Solo - Anual',
            stripePriceId: 'price_1Sh993AIZNC4mWLr9MBnzlXL',
            price: 670.80,
            maxProfessionals: 1,
            maxUsers: 1,
            description: 'Ideal para profissionais independentes. Cobrança anual.',
            allowedModules: allModules,
            active: true
        }
    },

    // --- STARTER (Até 5 Profissionais) ---
    {
        id: 'starter_mensal',
        data: {
            name: 'Plano Starter - Mensal',
            stripePriceId: 'price_1STte2AIZNC4mWLrDKu3dVzQ',
            price: 109.90,
            maxProfessionals: 5,
            maxUsers: 5,
            description: 'Pequenas equipes em crescimento. Cobrança mensal.',
            allowedModules: allModules,
            active: true
        }
    },
    {
        id: 'starter_semestral',
        data: {
            name: 'Plano Starter - Semestral',
            stripePriceId: 'price_1Sh95fAIZNC4mWLrp7JJ91qH',
            price: 559.80,
            maxProfessionals: 5,
            maxUsers: 5,
            description: 'Pequenas equipes em crescimento. Cobrança semestral.',
            allowedModules: allModules,
            active: true
        }
    },
    {
        id: 'starter_anual',
        data: {
            name: 'Plano Starter - Anual',
            stripePriceId: 'price_1Sh99fAIZNC4mWLrYBjyi93p',
            price: 922.80,
            maxProfessionals: 5,
            maxUsers: 5,
            description: 'Pequenas equipes em crescimento. Cobrança anual.',
            allowedModules: allModules,
            active: true
        }
    },

    // --- PRO (Até 15 Profissionais) ---
    {
        id: 'pro_mensal',
        data: {
            name: 'Plano Pro - Mensal',
            stripePriceId: 'price_1STtffAIZNC4mWLrMpoMBvyp',
            price: 164.50,
            maxProfessionals: 15,
            maxUsers: 15,
            description: 'Salões estabelecidos. Cobrança mensal.',
            allowedModules: allModules,
            active: true
        }
    },
    {
        id: 'pro_semestral',
        data: {
            name: 'Plano Pro - Semestral',
            stripePriceId: 'price_1Sh96dAIZNC4mWLrt8rE2LIw',
            price: 838.80,
            maxProfessionals: 15,
            maxUsers: 15,
            description: 'Salões estabelecidos. Cobrança semestral.',
            allowedModules: allModules,
            active: true
        }
    },
    {
        id: 'pro_anual',
        data: {
            name: 'Plano Pro - Anual',
            stripePriceId: 'price_1Sh9AkAIZNC4mWLraW5Uu69s',
            price: 1381.80,
            maxProfessionals: 15,
            maxUsers: 15,
            description: 'Salões estabelecidos. Cobrança anual.',
            allowedModules: allModules,
            active: true
        }
    },

    // --- BUSINESS (Ilimitado) ---
    {
        id: 'business_mensal',
        data: {
            name: 'Plano Business - Mensal',
            stripePriceId: 'price_1SaGMYAIZNC4mWLrKRcA05pf',
            price: 219.90,
            maxProfessionals: 9999,
            maxUsers: 9999,
            description: 'Grandes redes e franquias. Cobrança mensal.',
            allowedModules: allModules,
            active: true
        }
    },
    {
        id: 'business_semestral',
        data: {
            name: 'Plano Business - Semestral',
            stripePriceId: 'price_1Sh98AAIZNC4mWLrVk8qNewm',
            price: 1120.80,
            maxProfessionals: 9999,
            maxUsers: 9999,
            description: 'Grandes redes e franquias. Cobrança semestral.',
            allowedModules: allModules,
            active: true
        }
    },
    {
        id: 'business_anual',
        data: {
            name: 'Plano Business - Anual',
            stripePriceId: 'price_1Sh9C9AIZNC4mWLrqiuUM9RA',
            price: 1846.80,
            maxProfessionals: 9999,
            maxUsers: 9999,
            description: 'Grandes redes e franquias. Cobrança anual.',
            allowedModules: allModules,
            active: true
        }
    }
];

// 4. Função para subir os dados
async function uploadPlans() {
    console.log("🚀 Iniciando upload dos planos...");
    const batch = db.batch();

    plans.forEach(plan => {
        const docRef = db.collection('subscriptionPlans').doc(plan.id);
        // Usa set com merge: true para não apagar campos extras se já existirem
        batch.set(docRef, {
            ...plan.data,
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
    });

    try {
        await batch.commit();
        console.log("✅ Sucesso! Todos os 12 planos foram criados/atualizados.");
    } catch (error) {
        console.error("❌ Erro ao subir planos:", error);
    }
}

uploadPlans();