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
        const toggleBtns = document.querySelectorAll('.toggle-btn');
        const amounts = document.querySelectorAll('.amount');
        const totalAmounts = document.querySelectorAll('.total-amount');
        const pricingCards = document.querySelectorAll('.pricing-card');

        if (toggleBtns.length === 0) return;

        toggleBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Captura o período escolhido (ex: 'semestral', 'mensal', 'anual')
                const period = this.getAttribute('data-period'); 
                
                // 1. Atualizar a cor/destaque dos botões (abas)
                toggleBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                // 2. Atualizar todos os preços mensais
                amounts.forEach(amount => {
                    amount.style.opacity = '0';
                    setTimeout(() => {
                        amount.textContent = amount.getAttribute('data-' + period);
                        amount.style.opacity = '1';
                    }, 200);
                });

                // 3. Atualizar todos os valores totais
                totalAmounts.forEach(total => {
                    total.style.opacity = '0';
                    setTimeout(() => {
                        total.textContent = total.getAttribute('data-' + period);
                        total.style.opacity = '1';
                    }, 200);
                });

                // 4. Atualizar os links dos botões para enviar o plano e o período corretos
                pricingCards.forEach((card, index) => {
                    const actionBtn = card.querySelector('.btn-plan');
                    if (actionBtn) {
                        // Mapeamento das bases dos planos consoante a ordem dos cartões (0 a 3)
                        const planBases = [
                            '1_prof', 
                            '2_5_prof', 
                            '6_15_prof', 
                            'mais_15_prof'
                        ];
                        
                        if (planBases[index]) {
                            // Exemplo de output: publicRegister.html?planId=2_5_prof_anual
                            actionBtn.href = `publicRegister.html?planId=${planBases[index]}_${period}`;
                        }
                    }
                });
            });
        });

        // Inicializar os preços corretamente ao carregar a página
        // Simula um clique no botão que já está "ativo" por defeito no HTML
        const activeBtn = document.querySelector('.toggle-btn.active');
        if (activeBtn) {
            setTimeout(() => {
                activeBtn.click();
            }, 100);
        }
    }

    initPricingToggle();
});