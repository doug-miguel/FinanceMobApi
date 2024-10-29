# Use uma imagem Node.js oficial como a imagem base
FROM node:16-alpine

# Defina o diretório de trabalho no container
WORKDIR /app

# Copie o arquivo package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Copie o arquivo schema.prisma para o diretório correto
COPY prisma/schema.prisma /app/prisma/schema.prisma

# Instale as dependências do projeto
RUN npm install

# Copie todo o código-fonte para o diretório de trabalho
COPY . .

# Compile o código TypeScript
RUN npm run build

# Exponha a porta que o seu aplicativo vai usar
EXPOSE 3000

# Comando para iniciar o aplicativo
CMD ["npm", "start"]
