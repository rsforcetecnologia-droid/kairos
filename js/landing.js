document.addEventListener("DOMContentLoaded", () => {
    
    // =========================================
    // 1. ACTIVE STATE NA BARRA INFERIOR & SCROLL NAVBAR
    // =========================================
    const navItems = document.querySelectorAll('.bottom-nav .nav-item');
    const sections = document.querySelectorAll('section, header');
    const navbar = document.querySelector('.navbar');

    function changeActiveNav() {
        let index = sections.length;
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
    // 2. FUNÇÃO GENÉRICA DE SLIDER (WEB & MOBILE)
    // =========================================
    function createSlider(containerId, intervalTime = 4000) {
        const container = document.getElementById(containerId);
        if (!container) return; // Se não existir (ex: numa página de login), sai sem erro.

        const slides = container.querySelectorAll('img'); // Seleciona apenas imagens diretas ou com classe específica se preferir
        if (slides.length === 0) return;

        // Tenta encontrar indicadores e botões dentro do container PAI (browser-frame ou phone-frame)
        // Subimos um nível para encontrar os botões que podem estar fora da "tela"
        const parentFrame = container.parentElement;
        const indicators = parentFrame ? parentFrame.querySelectorAll('.indicator') : [];
        const nextBtn = parentFrame ? parentFrame.querySelector('.next-btn') : null;
        const prevBtn = parentFrame ? parentFrame.querySelector('.prev-btn') : null;

        let currentIndex = 0;
        let slideInterval;

        function showSlide(index) {
            // Lógica circular
            if (index >= slides.length) index = 0;
            if (index < 0) index = slides.length - 1;

            // Remove ativos antigos
            slides.forEach(s => s.classList.remove('active'));
            indicators.forEach(i => i.classList.remove('active'));

            // Define novos
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

        // Eventos
        if (nextBtn) nextBtn.addEventListener('click', (e) => { e.preventDefault(); next(); startTimer(); });
        if (prevBtn) prevBtn.addEventListener('click', (e) => { e.preventDefault(); prev(); startTimer(); });

        indicators.forEach(ind => {
            ind.addEventListener('click', (e) => {
                const idx = parseInt(e.target.dataset.index);
                showSlide(idx);
                startTimer();
            });
        });

        // Iniciar
        startTimer();
    }

    // =========================================
    // 3. INICIALIZAR SLIDERS
    // =========================================
    
    // Slider Web (Demonstração Principal)
    createSlider('demo-slider', 5000);

    // Slider Mobile (Nova Secção)
    createSlider('mobile-slider', 4000);

}
);

// =========================================
    // 4. LÓGICA DE PREÇOS (MENSAL/SEMESTRAL/ANUAL)
    // =========================================
    function initPricingToggle() {
        const toggleBtns = document.querySelectorAll('.toggle-btn');
        const priceAmounts = document.querySelectorAll('.plan-price .amount');
        const pricePeriods = document.querySelectorAll('.plan-price .period');

        if (toggleBtns.length === 0) return;

        toggleBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // 1. Remove active de todos
                toggleBtns.forEach(b => b.classList.remove('active'));
                // 2. Adiciona active no clicado
                btn.classList.add('active');

                // 3. Pega o período selecionado (mensal, semestral, anual)
                const period = btn.getAttribute('data-period');

                // 4. Atualiza os preços nos cards
                priceAmounts.forEach(price => {
                    // Pega o valor do atributo correspondente (ex: data-anual)
                    const newValue = price.getAttribute(`data-${period}`);
                    
                    // Pequena animação de fade
                    price.style.opacity = '0';
                    setTimeout(() => {
                        price.textContent = newValue;
                        price.style.opacity = '1';
                    }, 200);
                });

                // 5. Opcional: Atualizar texto "/mês" ou "/ano" se desejar
                // Neste caso mantivemos "/mês" pois geralmente mostra-se o valor equivalente mensal
                // Se quiser mudar a cobranca:
                /*
                pricePeriods.forEach(p => {
                    p.textContent = period === 'mensal' ? '/mês' : '/mês (cobrado '+ period +')';
                });
                */
            });
        });
    }

    initPricingToggle();