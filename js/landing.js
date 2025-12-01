document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. MENU MOBILE ---
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a'); // Todos os links do menu

    if (menuBtn && navLinks) {
        // Abrir/Fechar ao clicar no botão
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Troca o ícone (Lista <-> X)
            const icon = menuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.replace('ph-list', 'ph-x');
            } else {
                icon.classList.replace('ph-x', 'ph-list');
            }
        });

        // Fechar o menu automaticamente ao clicar em qualquer link
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                // Reseta o ícone para lista
                const icon = menuBtn.querySelector('i');
                icon.classList.replace('ph-x', 'ph-list');
            });
        });
    }

    // --- 2. NAVBAR SCROLL EFFECT ---
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) { 
            // Se desceu mais de 50px, adiciona fundo escuro
            navbar.classList.add('scrolled');
        } else {
            // Se voltou ao topo, fica transparente
            navbar.classList.remove('scrolled');
        }
    });

});