document.addEventListener("DOMContentLoaded", () => {
    
    // =========================================
    // 1. ACTIVE STATE NA BARRA INFERIOR (SCROLL SPY)
    // =========================================
    const navItems = document.querySelectorAll('.bottom-nav .nav-item');
    const sections = document.querySelectorAll('section, header');

    function changeActiveNav() {
        let index = sections.length;

        while(--index && window.scrollY + 200 < sections[index].offsetTop) {}
        
        // Remove active class from all
        navItems.forEach((link) => link.classList.remove('active'));
        
        // Add active based on scroll (apenas se corresponder a um link na barra)
        // A lógica aqui depende dos IDs. O primeiro link é "Início" (Header)
        if (index >= 0 && navItems[index]) {
             // Ajuste básico: index 0 = header, 1 = funcionalidades, 2 = demo
             // O ultimo link é "Entrar", que é externo, então ignoramos
             if(index < 3) {
                 navItems[index].classList.add('active');
             }
        } else {
            // Default Home Active
            navItems[0].classList.add('active');
        }
    }

    // Otimização: Debounce no scroll se necessário, ou usar direto
    window.addEventListener('scroll', changeActiveNav);

    // =========================================
    // 2. NAVBAR SCROLL (Fundo da Barra Superior)
    // =========================================
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) { 
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // =========================================
    // 3. SLIDER AUTOMÁTICO
    // =========================================
    function setupInfiniteSlider(wrapperSelector, intervalTime) {
        const wrapper = document.querySelector(wrapperSelector);
        if (!wrapper) return;

        const track = wrapper.querySelector('.sliding-track');
        if (!track) return;

        const images = track.querySelectorAll('img');
        if (images.length === 0) return;

        let currentIndex = 0;
        const totalImages = images.length;

        setInterval(() => {
            currentIndex++;
            if (currentIndex >= totalImages) {
                currentIndex = 0;
            }
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
        }, intervalTime);
    }

    setupInfiniteSlider('.monitor-wrapper', 3000);
    setupInfiniteSlider('.mobile-wrapper', 3000);
});