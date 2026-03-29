// js/ui/onboarding.js (Motor de Tour Guiado Interativo e Iluminado)

import * as establishmentApi from '../api/establishments.js';
import { state } from '../state.js';

// ============================================================================
// 🚗 MOTOR DO TOUR GUIADO (Nativo, sem bibliotecas externas)
// ============================================================================

class GuidedTour {
    constructor(steps, onComplete, onSkip) {
        this.steps = steps;
        this.currentStep = 0;
        this.onComplete = onComplete;
        this.onSkip = onSkip;
        this.isActive = false;

        // Elementos do DOM
        this.overlay = null;
        this.spotlight = null;
        this.popover = null;

        this.handleResize = this.handleResize.bind(this);
    }

    start() {
        if (this.isActive) return;
        this.isActive = true;
        this.createElements();
        window.addEventListener('resize', this.handleResize);
        this.renderStep();
    }

    stop(isCompleted = false) {
        this.isActive = false;
        window.removeEventListener('resize', this.handleResize);
        if (this.overlay) this.overlay.remove();
        if (this.spotlight) this.spotlight.remove();
        if (this.popover) this.popover.remove();
        
        if (isCompleted && this.onComplete) this.onComplete();
        else if (!isCompleted && this.onSkip) this.onSkip();
    }

    createElements() {
        // 1. Camada escura que bloqueia a tela
        this.overlay = document.createElement('div');
        this.overlay.className = 'fixed inset-0 bg-black/60 z-[99990] transition-opacity duration-300';
        document.body.appendChild(this.overlay);

        // 2. Foco iluminado (Spotlight) com box-shadow vazado
        this.spotlight = document.createElement('div');
        this.spotlight.className = 'absolute rounded-xl z-[99991] transition-all duration-500 ease-in-out pointer-events-none bg-transparent';
        this.spotlight.style.boxShadow = '0 0 0 9999px rgba(0, 0, 0, 0.6), 0 0 15px rgba(255,255,255,0.5) inset';
        document.body.appendChild(this.spotlight);

        // 3. Caixa de diálogo (Popover)
        this.popover = document.createElement('div');
        this.popover.className = 'absolute z-[99992] bg-white rounded-2xl shadow-2xl w-[320px] transition-all duration-500 ease-in-out opacity-0 transform scale-95 border border-gray-100 flex flex-col';
        document.body.appendChild(this.popover);
    }

    async renderStep() {
        if (this.currentStep >= this.steps.length) {
            this.stop(true);
            return;
        }

        const step = this.steps[this.currentStep];
        
        // Esconde temporariamente o popover durante a transição
        this.popover.style.opacity = '0';
        this.popover.style.transform = 'scale(0.95)';

        // Se o passo exige navegação prévia (ex: ir para outra aba)
        if (step.onBefore) {
            await step.onBefore();
            await this.sleep(600); // Aguarda a tela renderizar
        }

        // Aguarda o elemento alvo aparecer na tela (SPA dynamic rendering)
        const targetEl = await this.waitForElement(step.targetSelector, 3000);

        if (targetEl) {
            // Rola suavemente até ao elemento
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            await this.sleep(300);

            const rect = targetEl.getBoundingClientRect();
            
            // Move e ajusta o Spotlight (Foco Iluminado)
            const padding = 8;
            this.spotlight.style.top = `${rect.top + window.scrollY - padding}px`;
            this.spotlight.style.left = `${rect.left + window.scrollX - padding}px`;
            this.spotlight.style.width = `${rect.width + (padding * 2)}px`;
            this.spotlight.style.height = `${rect.height + (padding * 2)}px`;
            this.spotlight.style.display = 'block';
            this.overlay.style.display = 'none'; // Desativa overlay plano, usa o shadow do spotlight

            // Posiciona o Popover (Diálogo) inteligentemente
            this.positionPopover(rect);
        } else {
            // Se não tem alvo, centraliza na tela
            this.spotlight.style.display = 'none';
            this.overlay.style.display = 'block'; // Fundo todo escuro
            
            this.popover.style.top = `50%`;
            this.popover.style.left = `50%`;
            this.popover.style.transform = `translate(-50%, -50%) scale(1)`;
        }

        // Preenche o conteúdo do Popover
        const isLastStep = this.currentStep === this.steps.length - 1;
        
        this.popover.innerHTML = `
            <div class="p-5">
                <div class="flex items-center gap-3 mb-3">
                    <span class="text-3xl">${step.icon || '✨'}</span>
                    <h3 class="text-lg font-bold text-gray-800 leading-tight">${step.title}</h3>
                </div>
                <p class="text-gray-600 text-sm leading-relaxed mb-6">${step.content}</p>
                
                <div class="flex items-center justify-between mt-2 pt-4 border-t border-gray-100">
                    <button id="tour-skip-btn" class="text-xs font-semibold text-gray-400 hover:text-red-500 transition-colors">Pular Tour</button>
                    <div class="flex gap-2">
                        ${this.currentStep > 0 ? `<button id="tour-prev-btn" class="px-4 py-2 text-xs font-bold text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">Voltar</button>` : ''}
                        <button id="tour-next-btn" class="px-4 py-2 text-xs font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-md flex items-center gap-1">
                            ${isLastStep ? 'Concluir <i class="bi bi-check2"></i>' : 'Próximo <i class="bi bi-chevron-right"></i>'}
                        </button>
                    </div>
                </div>
                <div class="absolute -top-3 -right-3 bg-indigo-100 text-indigo-800 text-[10px] font-black px-2 py-1 rounded-full border-2 border-white shadow-sm">
                    ${this.currentStep + 1} / ${this.steps.length}
                </div>
            </div>
        `;

        // Revela o popover
        setTimeout(() => {
            if (targetEl) this.popover.style.transform = `scale(1)`;
            this.popover.style.opacity = '1';
        }, 50);

        // Atribui Eventos aos Botões
        document.getElementById('tour-next-btn').onclick = () => {
            this.currentStep++;
            this.renderStep();
        };
        if (document.getElementById('tour-prev-btn')) {
            document.getElementById('tour-prev-btn').onclick = () => {
                this.currentStep--;
                this.renderStep();
            };
        }
        document.getElementById('tour-skip-btn').onclick = () => this.stop(false);
    }

    positionPopover(targetRect) {
        const popoverRect = this.popover.getBoundingClientRect();
        const padding = 20;
        
        let top = targetRect.bottom + window.scrollY + padding;
        let left = targetRect.left + window.scrollX;

        // Se sair da tela em baixo, coloca por cima
        if (top + popoverRect.height > window.scrollY + window.innerHeight) {
            top = targetRect.top + window.scrollY - popoverRect.height - padding;
        }

        // Se sair da tela à direita, alinha pela direita do elemento
        if (left + popoverRect.width > window.innerWidth) {
            left = targetRect.right + window.scrollX - popoverRect.width;
        }
        
        // Garante que não sai pelo lado esquerdo
        if (left < padding) left = padding;

        this.popover.style.top = `${top}px`;
        this.popover.style.left = `${left}px`;
    }

    handleResize() {
        if (this.isActive) this.renderStep();
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async waitForElement(selector, timeout) {
        if (!selector) return null;
        const start = Date.now();
        while (Date.now() - start < timeout) {
            const el = document.querySelector(selector);
            if (el) return el;
            await this.sleep(100);
        }
        return null;
    }
}


// ============================================================================
// 🚀 CONFIGURAÇÃO DAS MISSÕES DO KAIROS E INICIALIZAÇÃO
// ============================================================================

export async function checkAndStartOnboarding() {
    try {
        console.log("A verificar Onboarding interativo...");

        const estData = await establishmentApi.getEstablishmentDetails(state.establishmentId);
        
        // 🔥 REGRAS DE CANCELAMENTO:
        // 1. Se for Filial (tem parentId), ignora (o dono já sabe usar e a Matriz já fez).
        // 2. Se já foi completado no passado, ignora para sempre.
        if (!estData || estData.parentId || estData.onboardingCompleted) {
            return;
        }

        // Configuração dos Passos do Tour
        const steps = [
            {
                title: "Bem-vindo ao Kairos!",
                icon: "👋",
                content: "Preparei um tour rápido para lhe mostrar onde deve configurar as 3 coisas mais importantes antes de receber agendamentos. Vamos a isso?",
                targetSelector: null, // Fica no centro da tela
            },
            {
                title: "Perfil e Dados da Loja",
                icon: "🏢",
                content: "É aqui em 'Minha Empresa' que você define o nome do Salão, telefone, endereço e faz o upload da sua Logomarca.",
                targetSelector: '[data-target="estabelecimento-section"]',
                onBefore: async () => { window.navigateTo('estabelecimento-section'); }
            },
            {
                title: "Cores e Personalização",
                icon: "🎨",
                content: "Nesta área você pode mudar a cor principal do sistema para ficar com a cara da sua marca. O link do seu cliente vai usar esta cor!",
                targetSelector: '#themeColor',
                onBefore: async () => { window.navigateTo('estabelecimento-section'); }
            },
            {
                title: "Criação de Serviços",
                icon: "✂️",
                content: "Na aba 'Serviços' é onde a mágica acontece. Crie os serviços que os seus clientes vão poder agendar, informando o preço e a duração de cada um.",
                targetSelector: '[data-target="servicos-section"]',
                onBefore: async () => { window.navigateTo('servicos-section'); }
            },
            {
                title: "Novo Serviço",
                icon: "➕",
                content: "Sempre que precisar adicionar um novo serviço ao menu, basta clicar neste botão verde.",
                targetSelector: '[data-action="new-service"]',
                onBefore: async () => { window.navigateTo('servicos-section'); }
            },
            {
                title: "Gestão da Equipe",
                icon: "👥",
                content: "E para terminar: a 'Equipa'. Aqui você cadastra os profissionais, define quem faz qual serviço e ajusta a jornada de trabalho semanal de cada um.",
                targetSelector: '[data-target="profissionais-section"]',
                onBefore: async () => { window.navigateTo('profissionais-section'); }
            },
            {
                title: "Tudo Pronto!",
                icon: "🚀",
                content: "Você já conhece o caminho! Preencha as informações do seu negócio com calma. Quando terminar, volte à Agenda e partilhe o seu Link de Agendamento com os clientes!",
                targetSelector: null,
                onBefore: async () => { window.navigateTo('agenda-section'); }
            }
        ];

        // Função de finalização silenciosa
        const markAsCompleted = async () => {
            try {
                await establishmentApi.updateEstablishmentDetails(state.establishmentId, { onboardingCompleted: true });
                showNotification('Tour Concluído', 'Você já pode configurar o seu sistema livremente!', 'success');
            } catch (e) {
                console.error("Erro ao gravar fim do onboarding", e);
            }
        };

        // Inicia o Tour
        const tour = new GuidedTour(steps, markAsCompleted, markAsCompleted);
        tour.start();

    } catch (error) {
        console.error("Erro fatal ao iniciar onboarding:", error);
    }
}