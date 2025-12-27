const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // Certifica-te que o arquivo está na mesma pasta

// 1. Inicializa o Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// 2. Define os Módulos Padrão (Sistema Completo)
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

// 3. Dados dos Planos (Antigos + Novos 2026)
const plans = [
    // --- PLANOS ANTIGOS (Mantidos no histórico) ---
    {
        id: 'solo_mensal',
        data: {
            name: 'Plano Solo - Mensal',
            stripePriceId: 'price_1STtcZAIZNC4mWLrdcFeJnWj',
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
            price: 406.80,
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
    },

    // ============================================================
    // --- NOVOS PLANOS PROMOCIONAIS 2026 (Unlimited) ---
    // Preço Base: R$ 85,90
    // ============================================================
    
    // 1. Mensal (Preço base)
    {
        id: 'lancamento_mensal', 
        data: {
            name: 'Plano Unlimited 2026 - Mensal',
            stripePriceId: 'prod_Tg6AvFIKgmpfiW', // <--- PREENCHER AQUI
            price: 85.90,
            maxProfessionals: 9999, // Ilimitado
            maxUsers: 9999, // Ilimitado
            description: 'Condição especial 2026. Acesso total e ilimitado.',
            allowedModules: allModules,
            active: true,
            isPromo: true
        }
    },

    // 2. Semestral (15% de Desconto)
    {
        id: 'lancamento_semestral',
        data: {
            name: 'Plano Unlimited 2026 - Semestral',
            stripePriceId: 'prod_Tg6BKL21lbdLap', // <--- PREENCHER AQUI
            price: 438.09, // R$ 85,90 * 6 * 0.85
            maxProfessionals: 9999,
            maxUsers: 9999,
            description: 'Condição especial 2026. Semestral com 15% OFF.',
            allowedModules: allModules,
            active: true,
            isPromo: true
        }
    },

    // 3. Anual (30% de Desconto)
    {
        id: 'lancamento_anual',
        data: {
            name: 'Plano Unlimited 2026 - Anual',
            stripePriceId: 'prod_Tg6Cz0CIeHz4tz', // <--- PREENCHER AQUI
            price: 721.56, // R$ 85,90 * 12 * 0.70
            maxProfessionals: 9999,
            maxUsers: 9999,
            description: 'Condição especial 2026. Anual com 30% OFF.',
            allowedModules: allModules,
            active: true,
            isPromo: true
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
        console.log("✅ Sucesso! Todos os planos (incluindo Oferta 2026) foram criados/atualizados.");
    } catch (error) {
        console.error("❌ Erro ao subir planos:", error);
    }
}

uploadPlans();