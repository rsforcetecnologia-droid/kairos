# 🗺️ Contexto de Arquitetura: Kairos Agenda

## 1. Visão Geral do Projeto
- **Nome do Sistema:** Kairos Agenda
- **App ID:** `br.com.rsforce.kairos.pro`
- **Objetivo:** Plataforma de gestão para estabelecimentos, focada em agendamentos, controle financeiro, comissões, gestão de produtos/serviços e CRM.
- **Público-alvo:** Proprietários de estabelecimentos (Admin) e seus clientes finais (Portal do Cliente).

## 2. Stack Técnica (Core)
- **Frontend/Build:** Vite + Tailwind CSS (v4) com suporte a PWA (Progressive Web App).
- **Backend:** Node.js com framework Express (v5.2.1).
- **Mobile:** Capacitor (v7) para empacotamento nativo Android e iOS.
- **Banco de Dados & Cloud:** Ecossistema Firebase (Firestore, Auth, Hosting e Functions).
- **Integrações de Terceiros:**
  - Pagamentos: Mercado Pago e Stripe.
  - Comunicação: Integração com API de WhatsApp.
  - Utilitários: Excel (xlsx) para importação/exportação e date-fns para manipulação de datas.

## 3. Arquitetura e Fluxo de Dados
- **Infraestrutura:** O backend principal roda no **Google Cloud Run** (`kairos-app`), enquanto partes específicas da lógica (como o webhook do WhatsApp) rodam via **Firebase Functions**.
- **Hospedagem:** O frontend compilado reside na pasta `cap-dist` e é servido via Firebase Hosting.
- **Padrão de Rotas:** O sistema utiliza rotas Express organizadas para separar responsabilidades (admin, financeiro, agendamentos, clientes).

## 4. Estrutura de Pastas (Mapa Mental)
Para não se perder, siga esta hierarquia de arquivos:
- `/js/api/`: Camada de serviço. Contém a lógica de comunicação com o Firestore e APIs externas (ex: `appointments.js`, `financial.js`).
- `/js/ui/`: Lógica de interface. Scripts que controlam o comportamento dinâmico das telas (ex: `agenda.js`, `dashboard.js`).
- `/routes/`: Definições das rotas de API do servidor Express (ex: `sales.js`, `subscriptions.js`).
- `/functions/`: Lógica serverless do Firebase (Cloud Functions).
- `/android/` & `/ios/`: Projetos nativos gerados pelo Capacitor.
- `/cap-dist/`: Artefatos finais de build que vão para produção.

## 5. Diretrizes de Desenvolvimento (Senior UX/Dev)
1. **Performance Mobile:** Como o app é híbrido (Capacitor), priorize o uso de classes utilitárias do Tailwind para manter o CSS leve e transições suaves.
2. **Segurança de Dados:** Toda regra de acesso deve ser validada tanto no Firestore (`firestore.rules`) quanto no middleware de autenticação (`middlewares/auth.js`).
3. **Padrão de Código:**
   - Use `apiService.js` como base para todas as chamadas externas.
   - Mantenha a lógica de UI separada da lógica de dados (JS/UI vs JS/API).
4. **UX Centrado em Agilidade:** O sistema lida com finanças e agendas; erros de input devem ter feedback visual imediato e máscaras de dados rigorosas (especialmente em valores monetários e datas).

## 6. Scripts Principais
- `npm run dev`: Inicia o ambiente de desenvolvimento Vite.
- `npm run build:web`: Gera a versão de produção na pasta `cap-dist`.
- `npm run cap:android`: Sincroniza o build web com o projeto nativo Android.