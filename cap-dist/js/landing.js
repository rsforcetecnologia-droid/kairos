// Dentro de js/landing.js

document.addEventListener("DOMContentLoaded", () => {
    
    // --- CÓDIGO PARA MENU MOBILE (NOVO) ---
    const mobileMenu = document.getElementById('mobile-menu');
    const menuToggle = document.querySelector('.menu-toggle');
    const menuClose = document.querySelector('.menu-close');
    const mobileLinks = document.querySelectorAll('.mobile-nav-list a');

    // Abre o menu
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.add('active');
    });

    // Fecha o menu
    menuClose.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });

    // Fecha o menu ao clicar em um link (para navegação)
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    });
    // --- FIM CÓDIGO MENU MOBILE ---


    // --- CÓDIGO PARA ANIMAÇÃO HERO (TYPING EFFECT E SWAP) ---
    const typingTextElement = document.getElementById('typing-text');
    const subTextElement = document.getElementById('sub-text');
    const actionButton = document.querySelector('.botao-principal');
    
    // Frases a serem digitadas
    const fixedPrefix = "Kairos System: ";
    const sentencePart1 = "Menos tempo gerenciando";
    const sentencePart2 = "mais tempo atendendo";
    
    // Frase para o subtítulo (fixa)
    const subSentence = "O sistema de agendamento definitivo para barbearias, salões e profissionais da beleza.";
    
    // Configurações da animação
    const TYPING_SPEED = 80; // Velocidade de digitação (mais lenta)
    const PAUSE_DURATION = 5000; // Tempo de espera para leitura
    
    // -----------------------------------------------------
    // FUNÇÕES DO EFEITO DE DIGITAÇÃO
    // -----------------------------------------------------

    // Função para digitação
    function typeWriter(text, element, speed, prefix = '', callback) {
        let i = 0;
        let currentContent = prefix + '<span class="cursor"></span>'; 
        element.innerHTML = currentContent; 
        
        function typing() {
            if (i < text.length) {
                // Adiciona a próxima letra APÓS o prefixo
                let newText = prefix + text.substring(0, i + 1);
                element.innerHTML = newText + '<span class="cursor"></span>';
                i++;
                setTimeout(typing, speed);
            } else {
                element.querySelector('.cursor').style.display = 'none';
                if (callback) callback(prefix + text); 
            }
        }
        typing();
    }
    
    // Função para apagar o texto
    function eraseText(textToErase, element, speed, callback) {
        let i = textToErase.length;
        // Calcula o prefixo fixo
        let prefix = element.textContent.substring(0, element.textContent.length - textToErase.length);

        // Adiciona o cursor para começar a apagar
        element.innerHTML = element.textContent + '<span class="cursor"></span>';
        
        function erasing() {
            if (i >= 0) {
                let newText = prefix + textToErase.substring(0, i);
                element.innerHTML = newText + '<span class="cursor"></span>';
                i--;
                setTimeout(erasing, speed / 2); 
            } else {
                element.innerHTML = prefix; 
                if (callback) callback(prefix);
            }
        }
        erasing();
    }
    
    // -----------------------------------------------------
    // FUNÇÃO QUE GERENCIA A SEQUÊNCIA (LOOP)
    // -----------------------------------------------------

    function startTypingSequence() {
        
        // 1. Digita a PRIMEIRA PARTE: "Kairos System: Menos tempo gerenciando"
        typeWriter(sentencePart1, typingTextElement, TYPING_SPEED, fixedPrefix, (fullSentence1) => { 
            
            // 2. Espera um pouco antes de apagar
            setTimeout(() => {
                
                // 3. Apaga a PRIMEIRA PARTE ("Menos tempo gerenciando")
                eraseText(sentencePart1, typingTextElement, TYPING_SPEED / 2, (prefix) => { 
                    
                    // 4. Digita a SEGUNDA PARTE ("mais tempo atendendo")
                    typeWriter(sentencePart2, typingTextElement, TYPING_SPEED, prefix, () => {
                        
                        // 5. Espera a leitura da SEGUNDA PARTE
                        setTimeout(() => {
                            
                            // 6. Esconde o subtítulo e o botão (Com classe 'hidden' para fade out)
                            actionButton.classList.add('hidden');
                            subTextElement.classList.add('hidden');
                            
                            // 7. Espera o fade out e reinicia o loop (Apaga a Frase 2)
                            setTimeout(() => {
                                eraseText(sentencePart2, typingTextElement, TYPING_SPEED / 2, () => { 
                                    
                                    // 8. Torna visível o subtítulo e o botão (para o próximo ciclo)
                                    subTextElement.classList.remove('hidden');
                                    actionButton.classList.remove('hidden');
                                    
                                    // 9. Reinicia a sequência
                                    setTimeout(startTypingSequence, 500); 
                                });
                            }, 500); 
                        }, PAUSE_DURATION); 
                    });
                });
            }, PAUSE_DURATION / 2); 
        });
    }

    // Inicia a Sequência
    setTimeout(() => {
        // A. Insere o subtítulo FIXO e o torna visível
        subTextElement.innerHTML = subSentence;
        subTextElement.classList.remove('hidden');
        
        // B. Inicia a animação da linha principal
        startTypingSequence();
    }, 1000); // Atraso inicial de 1s
    
    // --- FIM DO CÓDIGO DE ANIMAÇÃO HERO (TYPING EFFECT E SWAP) ---

    
    // --- CÓDIGO PARA NAVBAR SCROLL (Original) ---
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) { 
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    // --- FIM DO CÓDIGO NAVBAR ---


    // --- CÓDIGO PARA SLIDER ATUALIZADO (Original) ---
    const slides = document.querySelectorAll('.hero-slider .slide');
    const dots = document.querySelectorAll('.slider-nav-dot');
    let currentSlide = 0;
    let slideInterval = setInterval(nextSlide, 5000); 

    // Função principal para MOSTRAR um slide
    function showSlide(index) {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        currentSlide = index;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    // Função que AVANÇA para o próximo slide
    function nextSlide() {
        let nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex); 
    }

    // Adiciona evento de clique nas bolinhas
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.getAttribute('data-slide-index'));
            
            if (index !== currentSlide) {
                showSlide(index); 
                clearInterval(slideInterval);
                slideInterval = setInterval(nextSlide, 5000); 
            }
        });
    });
    // --- FIM DA MUDANÇA DO SLIDER ---


    // --- CÓDIGO DO STRIPE (Assinatura Original) ---
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