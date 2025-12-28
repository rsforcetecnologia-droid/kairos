// js/publicRegister.js

// 1. IMPORTS DO FIREBASE (Para Login Automático e Persistência)
import { auth, setPersistence, browserLocalPersistence } from './firebase-config.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

// CONFIGURAÇÃO: Chave Pública do Stripe
const STRIPE_PUBLIC_KEY = 'pk_test_51STpHSAIZNC4mWLrbapCgFGi2o6tMg07vyFa22LKwGOpN4nNdO0KzB6S4ioHsz4YiQXWrFPn8dVuYgkl0xnCHl2l000K2JtygR'; 
const stripe = Stripe(STRIPE_PUBLIC_KEY);
const elements = stripe.elements();

// 2. Configurar Stripe Elements
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

// 3. Lógica PWA (Instalação)
let deferredPrompt;
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
const isAndroid = /Android/.test(navigator.userAgent);
const isMobile = isIOS || isAndroid;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
});

// 4. Lógica de Planos
const urlParams = new URLSearchParams(window.location.search);
const selectedPlanId = urlParams.get('planId');

const PLAN_PRICES = {
    'lancamento_mensal': 85.90,
    'lancamento_semestral': 438.09,
    'lancamento_anual': 721.56
};

document.addEventListener("DOMContentLoaded", () => {
    // Cálculo da Data de Cobrança (7 dias)
    const today = new Date();
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + 7);
    
    const formattedDate = futureDate.toLocaleDateString('pt-BR', {
        day: '2-digit', month: '2-digit', year: 'numeric'
    });

    const dateDisplay = document.getElementById('charge-date-display');
    if(dateDisplay) dateDisplay.innerText = formattedDate;

    if (!selectedPlanId) {
        // Se não tiver plano, volta para home
        // window.location.href = "index.html#planos"; 
        // Comentado para facilitar testes locais
    } else {
        updateUIForPlan(selectedPlanId);
    }
});

function updateUIForPlan(planId) {
    const priceEl = document.getElementById('plan-price-val');
    const nameEl = document.getElementById('plan-name-display');
    const periodEl = document.getElementById('plan-period-text');
    const installmentsWrapper = document.getElementById('installments-wrapper');
    const installmentsSelect = document.getElementById('installmentsCount');

    let price = PLAN_PRICES[planId] || 0;
    let maxInstallments = 1;

    // Configuração Visual
    if (planId.includes('mensal')) {
        if(nameEl) nameEl.innerText = 'Plano Unlimited - Mensal';
        if(priceEl) priceEl.innerText = 'R$ 85,90';
        if(periodEl) periodEl.innerText = '/mês';
        if(installmentsWrapper) installmentsWrapper.classList.remove('visible');
    } 
    else if (planId.includes('semestral')) {
        if(nameEl) nameEl.innerText = 'Plano Unlimited - Semestral';
        if(priceEl) priceEl.innerText = 'R$ 438,09';
        if(periodEl) periodEl.innerText = '/semestre';
        if(installmentsWrapper) installmentsWrapper.classList.add('visible');
        maxInstallments = 6;
    } 
    else if (planId.includes('anual')) {
        if(nameEl) nameEl.innerText = 'Plano Unlimited - Anual';
        if(priceEl) priceEl.innerText = 'R$ 721,56';
        if(periodEl) periodEl.innerText = '/ano';
        if(installmentsWrapper) installmentsWrapper.classList.add('visible');
        maxInstallments = 12;
    }

    // Preencher Select de Parcelas
    if (installmentsSelect && maxInstallments > 1) {
        installmentsSelect.innerHTML = '';
        const opt1 = document.createElement('option');
        opt1.value = 1;
        opt1.text = `1x de R$ ${price.toFixed(2).replace('.', ',')} (À vista)`;
        installmentsSelect.add(opt1);

        for (let i = 2; i <= maxInstallments; i++) {
            let installmentValue = price / i;
            const opt = document.createElement('option');
            opt.value = i;
            opt.text = `${i}x de R$ ${installmentValue.toFixed(2).replace('.', ',')} sem juros`;
            installmentsSelect.add(opt);
        }
        installmentsSelect.value = maxInstallments;
    }
}

// 5. Processar Registro e Pagamento
const form = document.getElementById('registerForm'); // ID Corrigido conforme HTML anterior
const submitBtn = document.getElementById('btnRegister'); // ID Corrigido
const errorMsg = document.getElementById('errorMsg'); // ID Corrigido

if(form) {
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        // Bloqueia botão
        submitBtn.disabled = true;
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="ph ph-circle-notch loader" style="display:inline-block"></i> Processando...';
        if(errorMsg) errorMsg.style.display = 'none';

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value; // Captura senha para login automático
        const installmentsCount = parseInt(document.getElementById('installmentsCount')?.value) || 1;

        try {
            // A. Criar Payment Method no Stripe
            const { paymentMethod, error } = await stripe.createPaymentMethod({
                type: 'card',
                card: card,
                billing_details: {
                    name: document.getElementById('name').value,
                    email: email,
                    phone: document.getElementById('phone').value
                },
            });

            if (error) throw new Error(error.message);

            // B. Enviar para Backend (Cria Usuário e Assinatura)
            const formData = {
                establishmentName: document.getElementById('establishmentName').value,
                // Se o campo establishmentId não existir no HTML, usa um fallback ou gera no backend
                establishmentId: document.getElementById('establishmentId')?.value || '', 
                ownerName: document.getElementById('name').value,
                ownerEmail: email,
                ownerPassword: password,
                phone: document.getElementById('phone').value,
                planId: selectedPlanId,
                paymentMethodId: paymentMethod.id,
                installments: installmentsCount, 
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
            };

            const response = await fetch('https://kairos-app-407358446276.us-central1.run.app/api/public/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (!response.ok) throw new Error(result.message || "Erro ao processar assinatura.");

            // C. SUCESSO NO BACKEND -> LOGIN AUTOMÁTICO NO FRONTEND
            // Aqui acontece a mágica: usamos a senha que o usuário acabou de digitar
            
            submitBtn.innerHTML = '<i class="ph ph-check"></i> Sucesso! Entrando...';

            // 1. Configura Persistência LOCAL (PWA)
            await setPersistence(auth, browserLocalPersistence);

            // 2. Faz o Login Silencioso
            await signInWithEmailAndPassword(auth, email, password);

            // 3. Verifica se deve instalar PWA ou ir para o App
            const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
            
            if (isMobile && !isStandalone) {
                showPWAModal(); // Mostra convite para instalar
            } else {
                window.location.href = 'app.html'; // Vai direto para o sistema
            }

        } catch (err) {
            console.error(err);
            if(errorMsg) {
                errorMsg.textContent = err.message;
                errorMsg.style.display = 'block';
            } else {
                alert(err.message);
            }
            // Restaura botão
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
    });
}

// 6. Função Modal PWA
function showPWAModal() {
    const modal = document.getElementById('pwa-success-modal');
    const btnInstall = document.getElementById('pwa-install-btn');
    const iosHint = document.getElementById('pwa-ios-hint');
    const iosArrow = document.getElementById('ios-arrow');
    const skipBtn = document.getElementById('pwa-skip-btn');

    if(modal) modal.style.display = 'flex';

    if (isIOS) {
        if(iosHint) iosHint.style.display = 'block';
        if(iosArrow) iosArrow.style.display = 'block';
    } else if (isAndroid) {
        if(btnInstall) {
            btnInstall.style.display = 'block';
            btnInstall.onclick = async () => {
                if (deferredPrompt) {
                    deferredPrompt.prompt();
                    const { outcome } = await deferredPrompt.userChoice;
                    if (outcome === 'accepted') {
                        setTimeout(() => window.location.href = 'app.html', 2000);
                    }
                    deferredPrompt = null;
                } else {
                    alert("Toque no menu do navegador e escolha 'Instalar aplicativo'.");
                }
            };
        }
    }

    if(skipBtn) {
        skipBtn.onclick = () => {
            window.location.href = 'app.html';
        };
    }
}