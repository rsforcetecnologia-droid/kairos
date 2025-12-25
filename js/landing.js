/**
 * Kairos - Landing Page Logic
 * Inclui: Navegação Ativa, Sliders e Gestão Dinâmica de Preços/Planos para Stripe
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // =========================================
    // 1. ESTADO ATIVO NA BARRA INFERIOR & NAVBAR
    // =========================================
    const navItems = document.querySelectorAll('.bottom-nav .nav-item');
    const sections = document.querySelectorAll('section, header');
    const navbar = document.querySelector('.navbar');

    function changeActiveNav() {
        let index = sections.length;
        // Deteta qual secção está visível no scroll
        while(--index && window.scrollY + 200 < sections[index].offsetTop) {}
        
        navItems.forEach((link) => link.classList.remove('active'));
        
        if (index >= 0 && navItems[index] && index < 3) {
             navItems[index].classList.add('active');
        } else if (navItems[0]) {
            navItems[0].classList.add('active');
        }
    }

    if (navbar) {
        window.addEventListener('scroll', () => {
            // Efeito de sombra/fundo na navbar ao rolar
            window.scrollY > 50 ? navbar.classList.add('scrolled') : navbar.classList.remove('scrolled');
            changeActiveNav();
        });
    }

    // =========================================
    // 2. FUNÇÃO DE SLIDER (WEB & MOBILE)
    // =========================================
    function createSlider(containerId, intervalTime = 4000) {
        const container = document.getElementById(containerId);
        if (!container) return; 

        const slides = container.querySelectorAll('img');
        if (slides.length === 0) return;

        const parentFrame = container.parentElement;
        const indicators = parentFrame ? parentFrame.querySelectorAll('.indicator') : [];
        const nextBtn = parentFrame ? parentFrame.querySelector('.next-btn') : null;
        const prevBtn = parentFrame ? parentFrame.querySelector('.prev-btn') : null;

        let currentIndex = 0;
        let slideInterval;

        function showSlide(index) {
            if (index >= slides.length) index = 0;
            if (index < 0) index = slides.length - 1;

            slides.forEach(s => s.classList.remove('active'));
            indicators.forEach(i => i.classList.remove('active'));

            currentIndex = index;
            slides[currentIndex].classList.add('active');
            if (indicators[currentIndex]) indicators[currentIndex].classList.add('active');
        }

        function next() { showSlide(currentIndex + 1); }
        function prev() { showSlide(currentIndex - 1); }

        function startTimer() {
            clearInterval(slideInterval);
            slideInterval = setInterval(next, intervalTime);
        }

        if (nextBtn) nextBtn.addEventListener('click', (e) => { e.preventDefault(); next(); startTimer(); });
        if (prevBtn) prevBtn.addEventListener('click', (e) => { e.preventDefault(); prev(); startTimer(); });

        indicators.forEach(ind => {
            ind.addEventListener('click', (e) => {
                const idx = parseInt(e.target.dataset.index);
                showSlide(idx);
                startTimer();
            });
        });

        startTimer();
    }

    // Inicializar os Sliders
    createSlider('demo-slider', 5000);
    createSlider('mobile-slider', 4000);

    // =========================================
    // 3. LÓGICA DE PREÇOS & INTEGRAÇÃO STRIPE
    // =========================================
    function initPricingToggle() {
        const toggleBtns = document.querySelectorAll('.toggle-btn');
        const pricingCards = document.querySelectorAll('.pricing-card');

        if (toggleBtns.length === 0) return;

        toggleBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const period = this.getAttribute('data-period'); // mensal, semestral, anual
                
                // 1. Atualizar visual dos botões
                toggleBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                // 2. Atualizar cada card de preço
                pricingCards.forEach(card => {
                    const amountEl = card.querySelector('.amount');
                    const originalPriceEl = card.querySelector('.original-price');
                    const totalInfoEl = card.querySelector('.total-price-info');
                    const actionBtn = card.querySelector('.btn-plan');
                    const planLevel = card.getAttribute('data-plan-level'); // solo, starter, pro, business

                    if (amountEl) {
                        const priceString = amountEl.getAttribute('data-' + period);
                        const priceValue = parseFloat(priceString.replace(',', '.'));

                        // Animação de transição do valor
                        amountEl.style.opacity = '0';
                        setTimeout(() => {
                            amountEl.textContent = priceString;
                            amountEl.style.opacity = '1';
                        }, 200);

                        // Lógica de Preço Riscado e Info Total
                        if (period === 'mensal') {
                            if(originalPriceEl) originalPriceEl.classList.remove('visible');
                            if(totalInfoEl) totalInfoEl.innerHTML = 'Cobrança mensal recorrente<br>sem fidelidade';
                        } else {
                            const originalValue = amountEl.getAttribute('data-mensal');
                            if(originalPriceEl) {
                                originalPriceEl.textContent = 'de R$ ' + originalValue;
                                originalPriceEl.classList.add('visible');
                            }

                            if(totalInfoEl) {
                                let multiplier = period === 'semestral' ? 6 : 12;
                                let total = (priceValue * multiplier).toFixed(2).replace('.', ',');
                                totalInfoEl.innerHTML = `Total de <strong>R$ ${total}</strong><br>em até ${multiplier}x sem juros no cartão`;
                            }
                        }

                        // --- INTEGRAÇÃO STRIPE: Atualiza o link com o planId correto ---
                        if (actionBtn && planLevel) {
                            // Constrói o ID conforme configurado no Banco de Dados (ex: solo_anual)
                            const finalPlanId = `${planLevel}_${period}`;
                            actionBtn.href = `publicRegister.html?planId=${finalPlanId}`;
                        }
                    }
                });
            });
        });

        // Inicializar os links corretamente no carregamento da página (padrão Anual)
        const activeBtn = document.querySelector('.toggle-btn.active');
        if (activeBtn) {
            const currentPeriod = activeBtn.getAttribute('data-period');
            // Pequeno delay para garantir que o DOM está pronto para os links
            setTimeout(() => {
                activeBtn.click();
            }, 100);
        }
    }

    // Inicializar lógica de preços
    initPricingToggle();
});