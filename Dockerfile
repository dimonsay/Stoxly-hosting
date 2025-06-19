FROM node:18-alpine

WORKDIR /app

# Копируем только package.json сначала
COPY package*.json ./

# Устанавливаем зависимости с явным указанием axios
RUN npm install && \
    npm install axios@1.6.2 --save-exact && \
    npm cache clean --force

# Копируем остальные файлы
COPY . .

# Собираем проект
RUN npm run build

CMD ["npm", "run", "dev"]