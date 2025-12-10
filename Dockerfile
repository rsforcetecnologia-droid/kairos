# 1. Imagem base
FROM node:20-slim

# 2. Pasta de trabalho
WORKDIR /usr/src/app

# 3. Copiar dependências
COPY package*.json ./

# 4. Instalar TUDO (incluindo dependências de desenvolvimento como o Vite)
# O flag --include=dev é OBRIGATÓRIO para o build funcionar
RUN npm install --include=dev

# 5. Copiar o código fonte
COPY . .

# 6. CONSTRUIR O SITE (Gera a pasta cap-dist)
# Sem isto, o servidor dá erro 500 ou 404
RUN npm run build:web

# 7. Expor a porta
EXPOSE 8080

# 8. Iniciar
CMD [ "node", "index.js" ]