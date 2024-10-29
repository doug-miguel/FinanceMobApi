# Use uma imagem Node.js oficial como a imagem base
FROM node:16-alpine

# Defina o diretório de trabalho no container
WORKDIR /app

# Copie o arquivo package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie o arquivo schema.prisma para o diretório correto
COPY prisma/schema.prisma /app/prisma/schema.prisma

# Copie todo o código-fonte para o diretório de trabalho
COPY . .

# Copie o arquivo .env
COPY .env /app/.env

# Gere os arquivos Prisma necessários
RUN npx prisma generate

# Compile o código TypeScript
RUN npm run build

# Exponha a porta que o seu aplicativo vai usar
EXPOSE 3000

# Comando para iniciar o aplicativo
CMD ["npm", "start"]
