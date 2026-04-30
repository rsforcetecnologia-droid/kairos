// js/publicRegister.js

// 1. IMPORTS DO FIREBASE (Para Login Automático e Persistência)
import { auth, setPersistence, browserLocalPersistence } from './firebase-config.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

// 🚀 CONFIGURAÇÃO: Chave Pública do Pagar.me V5
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

// 3. Captura do Plano da URL
const urlParams = new URLSearchParams(window.location.search);
const selectedPlanId = urlParams.get('planId');

document.addEventListener("DOMContentLoaded", () => {
    // Cálculo da Data de Cobrança (7 dias de teste)
    const today = new Date();
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + 7);
    
    const formattedDate = futureDate.toLocaleDateString('pt-BR', {
        day: '2-digit', month: '2-digit', year: 'numeric'
    });

    const dateDisplay = document.getElementById('charge-date-display');
    if(dateDisplay) dateDisplay.innerText = formattedDate;

    // Busca os dados do plano na API
    if (selectedPlanId) {
        updateUIForPlan(selectedPlanId);
    }
});

// =========================================================================
// NOVO: BUSCA DINÂMICA DOS DADOS DO PLANO
// =========================================================================
async function updateUIForPlan(planId) {
    try {
        // Busca a lista de planos públicos da sua API
        const response = await fetch('https://kairos-app-407358446276.us-central1.run.app/api/public/saas/plans');
        if (!response.ok) throw new Error("Erro ao carregar planos");
        
        const plans = await response.json();
        
        // Encontra o plano específico que o usuário escolheu
        const selectedPlan = plans.find(p => p.id === planId);
        
        if (!selectedPlan) {
            alert("Plano selecionado não encontrado ou indisponível.");
            window.location.href = "index.html#planos";
            return;
        }

        const priceEl = document.getElementById('plan-price-val');
        const nameEl = document.getElementById('plan-name-display');
        const periodEl = document.getElementById('plan-period-text');
        const installmentsWrapper = document.getElementById('installments-wrapper');
        const installmentsSelect = document.getElementById('installmentsCount');

        let price = Number(selectedPlan.price);
        
        // Atualiza Nomes e Preços na UI
        if(nameEl) nameEl.innerText = selectedPlan.name;
        if(priceEl) priceEl.innerText = `R$ ${price.toFixed(2).replace('.', ',')}`;
        if(periodEl) periodEl.innerText = '/mês'; // Assumindo padrão mensal por enquanto

        // Regra de Parcelamento (Se for acima de R$ 200, libera parcelamento)
        let maxInstallments = 1;
        if (price > 200) {
            maxInstallments = price > 600 ? 12 : 6;
        }

        // Preencher Select de Parcelas
        if (installmentsSelect && maxInstallments > 1) {
            if(installmentsWrapper) installmentsWrapper.classList.add('visible');
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
            installmentsSelect.value = maxInstallments; // Seleciona o máximo por padrão
        } else {
            if(installmentsWrapper) installmentsWrapper.classList.remove('visible');
        }

    } catch (error) {
        console.error("Erro ao buscar dados do plano:", error);
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

        // Captura os dados do cartão
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
                throw new Error("Dados do cartão inválidos. Verifique e tente novamente.");
            }

            // B. Enviar dados e TOKEN para o SEU Backend
            const formData = {
                establishmentName: document.getElementById('establishmentName').value,
                ownerName: name,
                ownerEmail: email,
                ownerPassword: password,
                phone: phone,
                planId: selectedPlanId, // <-- Mandando o ID dinâmico da URL para o Backend!
                cardToken: tokenData.id, 
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

            await setPersistence(auth, browserLocalPersistence);
            await signInWithEmailAndPassword(auth, email, password);

            const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
            
            if (isMobile && !isStandalone) {
                showPWAModal(); 
            } else {
                window.location.href = 'app.html'; 
            }

        } catch (err) {
            console.error(err);
            if(errorMsg) {
                errorMsg.textContent = err.message;
                errorMsg.style.display = 'block';
            } else {
                alert(err.message);
            }
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