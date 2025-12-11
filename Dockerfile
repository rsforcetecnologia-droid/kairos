# Dockerfile

# Fase 1: Construção
# Usar uma imagem oficial do Node.js
FROM node:18-slim as builder

# Definir diretório de trabalho
WORKDIR /app

# Copiar ficheiros de dependências
COPY package*.json ./

# Instalar dependências. O seu projeto não deve precisar do firebase-credentials.json aqui
RUN npm install --only=production

# Fase 2: Imagem Final (Mais leve)
FROM node:18-slim

# Definir diretório de trabalho
WORKDIR /app

# Copiar a pasta de dependências da fase de construção
COPY --from=builder /app/node_modules ./node_modules

# Copiar o resto do código do servidor
# ATENÇÃO: Se houver um .dockerignore, garante que ele não bloqueia ficheiros essenciais!
COPY . .

# Variável de ambiente necessária para o servidor (index.js) saber que está na nuvem
# E para o Cloud Run saber a porta.
ENV PORT=8080
EXPOSE 8080

# Comando para iniciar
CMD ["node", "index.js"]