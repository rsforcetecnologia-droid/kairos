document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. MENU MOBILE (Mantido) ---
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.replace('ph-list', 'ph-x');
            } else {
                icon.classList.replace('ph-x', 'ph-list');
            }
        });

        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = menuBtn.querySelector('i');
                if(icon) icon.classList.replace('ph-x', 'ph-list');
            });
        });
    }

    // --- 2. NAVBAR SCROLL (Mantido) ---
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

    // --- 3. SLIDER AUTOMÁTICO (NOVO e CORRIGIDO) ---
    // Função que faz o trilho (track) deslizar
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
            
            // Se chegou na última, volta para a primeira
            if (currentIndex >= totalImages) {
                currentIndex = 0;
            }

            // Move o trilho para a esquerda baseado no índice
            // Ex: index 1 move -100%, index 2 move -200%
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            
        }, intervalTime);
    }

    // Inicia o Slider do Monitor (Web) - a cada 3 segundos
    setupInfiniteSlider('.monitor-wrapper', 3000);

    // Inicia o Slider do Celular (Mobile) - a cada 3 segundos
    setupInfiniteSlider('.mobile-wrapper', 3000);

});