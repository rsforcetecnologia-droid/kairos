/**
 * Kairos - Landing Page Logic
 * Inclui: Navegação Ativa, Sliders e Gestão Dinâmica de Preços/Planos
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // =========================================
    // 1. ESTADO ATIVO NA BARRA INFERIOR E NAVBAR
    // =========================================
    // Este bloco garante que o menu superior ganha uma sombra ao fazeres scroll
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
            window.scrollY > 50 ? navbar.classList.add('scrolled') : navbar.classList.remove('scrolled');
            changeActiveNav();
        });
    }

    // =========================================
    // 2. FUNÇÃO DE SLIDER (WEB & MOBILE)
    // =========================================
    // Lógica para animar as imagens dos telemóveis e dashboards na página inicial
    function createSlider(containerId, intervalTime = 4000) {
        const container = document.getElementById(containerId);
        if (!container) return; 

        let slides = container.querySelectorAll('.demo-slide, .mobile-slide');
        if (slides.length === 0) slides = container.querySelectorAll('img');
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
            if(slides[currentIndex]) slides[currentIndex].classList.add('active');
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

    createSlider('demo-slider', 5000);
    createSlider('mobile-slider', 4000);

    // =========================================
    // 3. LÓGICA DE PREÇOS (MENSAL, SEMESTRAL, ANUAL)
    // =========================================
    function initPricingToggle() {
        // Seleciona os botões (Mensal, Semestral, Anual) e os cartões de preço
        const toggleBtns = document.querySelectorAll('.toggle-btn');
        const pricingCards = document.querySelectorAll('.pricing-card');

        if (toggleBtns.length === 0) return;

        toggleBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Captura o período escolhido (ex: 'semestral')
                const period = this.getAttribute('data-period'); 
                
                // 1. Atualizar a cor/destaque dos botões (abas)
                toggleBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                // 2. Atualizar cada cartão de preço individualmente
                pricingCards.forEach(card => {
                    const amountEl = card.querySelector('.amount');
                    const originalPriceEl = card.querySelector('.original-price');
                    const totalInfoEl = card.querySelector('.total-price-info');
                    const actionBtn = card.querySelector('.btn-plan');
                    const planLevel = card.getAttribute('data-plan-level'); // ex: 'starter', 'pro'

                    if (amountEl) {
                        // Vai ao HTML buscar o valor correspondente ao período (ex: data-semestral="93,30")
                        const priceString = amountEl.getAttribute('data-' + period);
                        const priceValue = parseFloat(priceString.replace(',', '.'));

                        // Efeito visual: Esconde o preço atual, altera o texto e mostra de novo
                        amountEl.style.opacity = '0';
                        setTimeout(() => {
                            amountEl.textContent = priceString;
                            amountEl.style.opacity = '1';
                        }, 200); // Este delay coincide com a transição que colocámos no CSS!

                        // Lógica de textos auxiliares: Preço "Riscado" e Valor Total
                        if (period === 'mensal') {
                            // Se for mensal, não há desconto nem preço riscado a mostrar
                            if(originalPriceEl) originalPriceEl.classList.remove('visible');
                            if(totalInfoEl) {
                                totalInfoEl.innerHTML = 'Cobrança mensal recorrente<br>sem fidelidade';
                            }
                        } else {
                            // Se for longo prazo, mostramos o preço mensal como "de R$ X,XX"
                            const originalValue = amountEl.getAttribute('data-mensal');
                            if(originalPriceEl) {
                                originalPriceEl.textContent = 'de R$ ' + originalValue;
                                originalPriceEl.classList.add('visible');
                            }

                            // Calculamos o total multiplicando pelos meses
                            if(totalInfoEl) {
                                let multiplier = period === 'semestral' ? 6 : 12;
                                let total = (priceValue * multiplier).toFixed(2).replace('.', ',');
                                totalInfoEl.innerHTML = `Total de <strong>R$ ${total}</strong><br>em até ${multiplier}x sem juros no cartão`;
                            }
                        }

                        // 3. Atualizar o link do botão de compra para enviar o plano correto
                        if (actionBtn && planLevel) {
                            // Constrói o ID final: ex: "pro_semestral"
                            const finalPlanId = `${planLevel}_${period}`;
                            actionBtn.href = `publicRegister.html?planId=${finalPlanId}`;
                        }
                    }
                });
            });
        });

        // Inicializar os preços corretamente ao carregar a página
        // Simulamos um clique no botão que já está "ativo" por defeito no HTML (neste caso, o Anual)
        const activeBtn = document.querySelector('.toggle-btn.active');
        if (activeBtn) {
            setTimeout(() => {
                activeBtn.click();
            }, 100);
        }
    }

    initPricingToggle();
});