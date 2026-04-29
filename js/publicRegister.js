// js/publicRegister.js

// 1. IMPORTS DO FIREBASE (Para Login Automático e Persistência)
import { auth, setPersistence, browserLocalPersistence } from './firebase-config.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

// 🚀 CONFIGURAÇÃO: Chave Pública do Pagar.me V5
// Substitua pela Public Key da sua conta MASTER do Pagar.me (Ex: pk_test_xxxxxx)
const PAGARME_PUBLIC_KEY = 'pk_e7xXzWnskUEZkjV0'; 

// 2. Lógica PWA (Instalação)
let deferredPrompt;
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
const isAndroid = /Android/.test(navigator.userAgent);
const isMobile = isIOS || isAndroid;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
});

// 3. Lógica de Planos
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

    if (selectedPlanId) {
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

// 4. Processar Registro e Pagamento via Pagar.me
const form = document.getElementById('registerForm');
const submitBtn = document.getElementById('btnRegister');
const errorMsg = document.getElementById('errorMsg');

if(form) {
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        // Bloqueia botão
        submitBtn.disabled = true;
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="ph ph-circle-notch loader" style="display:inline-block"></i> Processando...';
        if(errorMsg) errorMsg.style.display = 'none';

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value; 
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const installmentsCount = parseInt(document.getElementById('installmentsCount')?.value) || 1;

        // Captura os dados do cartão (Inputs que você deve ter no HTML)
        const cardNumber = document.getElementById('cardNumber')?.value.replace(/\D/g, '') || '';
        const cardHolderName = document.getElementById('cardHolderName')?.value || '';
        const expMonth = document.getElementById('expMonth')?.value || '';
        const expYear = document.getElementById('expYear')?.value || '';
        const cardCvv = document.getElementById('cardCvv')?.value || '';

        try {
            // A. GERAR TOKEN SEGURO DO CARTÃO VIA API DO PAGAR.ME V5
            const tokenResponse = await fetch(`https://api.pagar.me/core/v5/tokens?appId=${PAGARME_PUBLIC_KEY}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'card',
                    card: {
                        number: cardNumber,
                        holder_name: cardHolderName,
                        exp_month: parseInt(expMonth),
                        exp_year: parseInt(expYear),
                        cvv: cardCvv
                    }
                })
            });

            const tokenData = await tokenResponse.json();

            if (!tokenResponse.ok) {
                // Se der erro no cartão (Ex: número inválido, validade incorreta)
                throw new Error("Dados do cartão inválidos. Verifique e tente novamente.");
            }

            // B. Enviar dados e TOKEN para o SEU Backend
            const formData = {
                establishmentName: document.getElementById('establishmentName').value,
                establishmentId: document.getElementById('establishmentId')?.value || '', 
                ownerName: name,
                ownerEmail: email,
                ownerPassword: password,
                phone: phone,
                planId: selectedPlanId,
                cardToken: tokenData.id, // Enviando o Token Seguro do Pagar.me!
                installments: installmentsCount, 
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
            };

            const response = await fetch('https://kairos-app-407358446276.us-central1.run.app/api/public/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (!response.ok) throw new Error(result.message || "Erro ao processar assinatura no servidor.");

            // C. SUCESSO NO BACKEND -> LOGIN AUTOMÁTICO NO FRONTEND
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
            // Restaura botão em caso de erro
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
    });
}

// 5. Função Modal PWA
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