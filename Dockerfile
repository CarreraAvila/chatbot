FROM node:18-bullseye as bot
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .
EXPOSE 4000
CMD ["npm", "start"]
