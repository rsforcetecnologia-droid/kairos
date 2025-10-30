// Dentro de js/landing.js

document.addEventListener("DOMContentLoaded", () => {
    
    // --- CÓDIGO PARA NAVBAR SCROLL ---
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) { 
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    // --- FIM DO CÓDIGO NAVBAR ---


    // --- INÍCIO DA MUDANÇA: CÓDIGO PARA SLIDER ATUALIZADO ---
    const slides = document.querySelectorAll('.hero-slider .slide');
    const dots = document.querySelectorAll('.slider-nav-dot'); // Pega as bolinhas
    let currentSlide = 0;
    let slideInterval = setInterval(nextSlide, 5000); // Salva o timer na variável

    // (NOVA) Função principal para MOSTRAR um slide
    function showSlide(index) {
        // Remove 'active' do slide e da bolinha atuais
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        
        // Define o novo slide
        currentSlide = index;
        
        // Adiciona 'active' ao novo slide e à nova bolinha
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    // (MODIFICADA) Função que AVANÇA para o próximo slide
    function nextSlide() {
        let nextIndex = (currentSlide + 1) % slides.length; // Calcula o próximo
        showSlide(nextIndex); // Mostra o próximo
    }

    // (NOVO) Adiciona evento de clique nas bolinhas
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            // Pega o índice do slide (do atributo 'data-slide-index' no HTML)
            const index = parseInt(dot.getAttribute('data-slide-index'));
            
            // Só faz algo se clicar em uma bolinha diferente da atual
            if (index !== currentSlide) {
                showSlide(index); // Mostra o slide clicado
                
                // Reinicia o timer do intervalo
                clearInterval(slideInterval); // Para o timer antigo
                slideInterval = setInterval(nextSlide, 5000); // Começa um novo timer de 5s
            }
        });
    });
    // --- FIM DA MUDANÇA DO SLIDER ---


    // --- CÓDIGO DO STRIPE (Assinatura) ---
    // 1. Configure o Stripe com sua Chave Publicável
    const stripe = Stripe('pk_test_SUA_CHAVE_PUBLICAVEL_AQUI'); // <--- TROQUE ISSO

    // 2. Encontre todos os botões de assinar
    const botoesAssinar = document.querySelectorAll('.botao-assinar');

    botoesAssinar.forEach(button => {
        button.addEventListener('click', async (event) => {
            // 3. Pegue o ID do plano
            const priceId = event.target.getAttribute('data-price-id');

            // 4. Chame a API do SEU back-end
            try {
                const response = await fetch('/api/public/create-checkout-session', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        priceId: priceId,
                    })
                });

                const session = await response.json();

                if (session.id) {
                    // 5. Redirecione para o Checkout do Stripe
                    const result = await stripe.redirectToCheckout({
                        sessionId: session.id
                    });

                    if (result.error) {
                        alert(result.error.message);
                    }
                } else {
                    alert("Não foi possível iniciar o processo de assinatura. Tente novamente.");
                }

            } catch (error) {
                console.error("Erro ao chamar a API:", error);
                alert("Ocorreu um erro. Tente mais tarde.");
            }
        });
    });
    // --- FIM DO CÓDIGO STRIPE ---
});