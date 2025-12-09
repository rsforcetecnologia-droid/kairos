# Use uma imagem oficial do Node.js
FROM node:20-slim

# Crie o diretório da aplicação
WORKDIR /usr/src/app

# Copie os arquivos de dependências
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie o restante dos arquivos da sua aplicação
COPY . .

# Exponha a porta que sua aplicação usa (conforme index.js)
EXPOSE 8080

# Comando para iniciar o servidor
CMD [ "node", "index.js" ]