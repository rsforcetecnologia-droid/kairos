// CONFIGURAÇÃO: Substitui pela tua CHAVE PÚBLICA do Stripe (pk_test_...)
const STRIPE_PUBLIC_KEY = 'pk_test_51STpHSAIZNC4mWLrbapCgFGi2o6tMg07vyFa22LKwGOpN4nNdO0KzB6S4ioHsz4YiQXWrFPn8dVuYgkl0xnCHl2l000K2JtygR'; 
const stripe = Stripe(STRIPE_PUBLIC_KEY);
const elements = stripe.elements();

// 1. Configurar o campo de cartão (Stripe Elements)
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

// 2. Capturar o Plano da URL
const urlParams = new URLSearchParams(window.location.search);
const selectedPlanId = urlParams.get('planId');

document.addEventListener("DOMContentLoaded", () => {
    const planDisplay = document.getElementById('plan-display');
    
    if (!selectedPlanId) {
        alert("Nenhum plano selecionado. A redirecionar...");
        window.location.href = "index.html#planos";
        return;
    }

    // Formata o ID para exibição (ex: solo_anual -> Solo Anual)
    const displayTitle = selectedPlanId.replace('_', ' ').toUpperCase();
    planDisplay.textContent = `PLANO SELECIONADO: ${displayTitle}`;
});

// 3. Processar o Registo
const form = document.getElementById('register-form');
const submitBtn = document.getElementById('submit-button');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    submitBtn.disabled = true;
    
    // Mostra feedback visual de carregamento
    const loader = submitBtn.querySelector('.loader');
    if(loader) loader.style.display = 'inline-block';

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
        const errorElement = document.getElementById('card-errors');
        errorElement.textContent = error.message;
        submitBtn.disabled = false;
        if(loader) loader.style.display = 'none';
        return;
    }

    // 3.2 Enviar os dados para o teu Backend
    const formData = {
        establishmentName: document.getElementById('establishmentName').value,
        establishmentId: document.getElementById('establishmentId').value,
        ownerEmail: document.getElementById('ownerEmail').value,
        ownerPassword: document.getElementById('ownerPassword').value,
        planId: selectedPlanId,
        paymentMethodId: paymentMethod.id,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone // Detecta fuso horário
    };

    try {
        // CORREÇÃO: O endereço correto deve incluir '/api/public/register'
        // Verifique se a URL base (https://...) está correta para o seu servidor Cloud Run
        const response = await fetch('https://kairos-app-407358446276.us-central1.run.app/api/public/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData) // <--- CORRIGIDO AQUI (antes estava 'payload')
        });

        const result = await response.json();

        if (response.ok) {
            alert("Sucesso! A sua conta foi criada.");
            window.location.href = result.loginUrl || 'login.html';
        } else {
            throw new Error(result.message || "Erro ao criar conta.");
        }

    } catch (err) {
        alert("Erro: " + err.message);
        submitBtn.disabled = false;
        if(loader) loader.style.display = 'none';
    }
});