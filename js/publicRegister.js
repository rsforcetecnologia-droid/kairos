// js/publicRegister.js

// CONFIGURAÇÃO: Chave Pública do Stripe
const STRIPE_PUBLIC_KEY = 'pk_test_51STpHSAIZNC4mWLrbapCgFGi2o6tMg07vyFa22LKwGOpN4nNdO0KzB6S4ioHsz4YiQXWrFPn8dVuYgkl0xnCHl2l000K2JtygR'; 
const stripe = Stripe(STRIPE_PUBLIC_KEY);
const elements = stripe.elements();

// 1. Configurar Stripe Elements
const style = {
    base: {
        color: '#ffffff',
        fontFamily: '"Inter", sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': { color: '#94a3b8' }
    },
    invalid: { color: '#f87171', iconColor: '#f87171' }
};

const card = elements.create('card', { style: style, hidePostalCode: true });
card.mount('#card-element');

// 2. Lógica de Planos e Parcelamento
const urlParams = new URLSearchParams(window.location.search);
const selectedPlanId = urlParams.get('planId');

const PLAN_PRICES = {
    'lancamento_mensal': 85.90,
    'lancamento_semestral': 438.09,
    'lancamento_anual': 721.56
};

document.addEventListener("DOMContentLoaded", () => {
    
    // --- NOVO: CÁLCULO DA DATA DE COBRANÇA (7 DIAS) ---
    const today = new Date();
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + 7);
    
    const formattedDate = futureDate.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    const dateDisplay = document.getElementById('charge-date-display');
    if(dateDisplay) {
        dateDisplay.innerText = formattedDate;
    }
    // ----------------------------------------------------

    if (!selectedPlanId) {
        alert("Nenhum plano selecionado.");
        window.location.href = "index.html#planos";
        return;
    }

    updateUIForPlan(selectedPlanId);
});

function updateUIForPlan(planId) {
    const priceEl = document.getElementById('plan-price-val');
    const nameEl = document.getElementById('plan-name-display');
    const periodEl = document.getElementById('plan-period-text');
    const installmentsWrapper = document.getElementById('installments-wrapper');
    const installmentsSelect = document.getElementById('installmentsCount');

    let price = PLAN_PRICES[planId] || 0;
    let maxInstallments = 1;

    // Configuração Visual e de Parcelas
    if (planId.includes('mensal')) {
        nameEl.innerText = 'Plano Unlimited - Mensal';
        priceEl.innerText = 'R$ 85,90';
        periodEl.innerText = '/mês';
        installmentsWrapper.classList.remove('visible'); // Esconde parcelamento
        maxInstallments = 1;
    } 
    else if (planId.includes('semestral')) {
        nameEl.innerText = 'Plano Unlimited - Semestral';
        priceEl.innerText = 'R$ 438,09';
        periodEl.innerText = '/semestre';
        installmentsWrapper.classList.add('visible'); // Mostra parcelamento
        maxInstallments = 6;
    } 
    else if (planId.includes('anual')) {
        nameEl.innerText = 'Plano Unlimited - Anual';
        priceEl.innerText = 'R$ 721,56';
        periodEl.innerText = '/ano';
        installmentsWrapper.classList.add('visible'); // Mostra parcelamento
        maxInstallments = 12;
    }

    // Preencher o Select de Parcelas
    if (maxInstallments > 1) {
        installmentsSelect.innerHTML = ''; // Limpa opções
        
        // Opção à vista
        const opt1 = document.createElement('option');
        opt1.value = 1;
        opt1.text = `1x de R$ ${price.toFixed(2).replace('.', ',')} (À vista)`;
        installmentsSelect.add(opt1);

        // Opções parceladas (2x até Max)
        for (let i = 2; i <= maxInstallments; i++) {
            let installmentValue = price / i;
            const opt = document.createElement('option');
            opt.value = i;
            opt.text = `${i}x de R$ ${installmentValue.toFixed(2).replace('.', ',')} sem juros`;
            installmentsSelect.add(opt);
        }
        
        // Seleciona automaticamente o máximo de parcelas
        installmentsSelect.value = maxInstallments;
    }
}

// 3. Processar o Registo
const form = document.getElementById('register-form');
const submitBtn = document.getElementById('submit-button');
const btnText = document.getElementById('btn-text');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    submitBtn.disabled = true;
    btnText.innerText = "Criando sua conta...";
    
    const loader = submitBtn.querySelector('.loader');
    if(loader) loader.style.display = 'inline-block';

    const installmentsCount = parseInt(document.getElementById('installmentsCount').value) || 1;

    // 3.1 Criar o Payment Method no Stripe
    const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: 'card',
        card: card,
        billing_details: {
            name: document.getElementById('establishmentName').value,
            email: document.getElementById('ownerEmail').value,
        },
    });

    if (error) {
        document.getElementById('card-errors').textContent = error.message;
        resetButton();
        return;
    }

    // 3.2 Enviar para o Backend
    const formData = {
        establishmentName: document.getElementById('establishmentName').value,
        establishmentId: document.getElementById('establishmentId').value,
        ownerEmail: document.getElementById('ownerEmail').value,
        ownerPassword: document.getElementById('ownerPassword').value,
        planId: selectedPlanId,
        paymentMethodId: paymentMethod.id,
        installments: installmentsCount, 
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };

    try {
        const response = await fetch('https://kairos-app-407358446276.us-central1.run.app/api/public/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (response.ok) {
            // Sucesso!
            window.location.href = result.loginUrl || 'login.html';
        } else {
            throw new Error(result.message || "Erro ao criar conta.");
        }

    } catch (err) {
        alert("Erro: " + err.message);
        resetButton();
    }
});

function resetButton() {
    submitBtn.disabled = false;
    btnText.innerText = "Começar Teste Grátis de 7 Dias";
    const loader = submitBtn.querySelector('.loader');
    if(loader) loader.style.display = 'none';
}