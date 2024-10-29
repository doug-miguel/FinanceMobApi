FROM node:20

WORKDIR /app

COPY package*.json ./

COPY prisma/schema.prisma /app/prisma/schema.prisma

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

EXPOSE 3000

COPY .env /app/.env

CMD ["npm", "start"]
