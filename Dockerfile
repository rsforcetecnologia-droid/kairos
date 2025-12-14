# Dockerfile

# Fase 1: Construção (Build)
# 1. MUDANÇA CRÍTICA: Atualizado de node:18-slim para node:22-slim
FROM node:22-slim as builder

# Definir diretório de trabalho
WORKDIR /app

# Copiar ficheiros de dependências
COPY package*.json ./

# Instalar TODAS as dependências (incluindo devDependencies como o Vite)
RUN npm install

# Copiar todo o código fonte
COPY . .

# Executar o build do Vite (Gera a pasta cap-dist)
RUN npm run build:web

# Fase 2: Imagem Final (Execução)
# 2. MUDANÇA CRÍTICA: Atualizado para node:22-slim para manter compatibilidade
FROM node:22-slim

WORKDIR /app

# Copiar apenas o package.json novamente
COPY package*.json ./

# Instalar apenas dependências de produção para a imagem final
RUN npm install --only=production

# Copiar o restante do código do servidor
COPY . .

# Copiar a pasta 'cap-dist' gerada na Fase 1
COPY --from=builder /app/cap-dist ./cap-dist

ENV PORT=8080
EXPOSE 8080

CMD ["node", "index.js"]