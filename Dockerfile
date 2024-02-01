FROM node:lts-slim
WORKDIR /app
COPY . .
RUN npm install
CMD ["node", "src/main.jsx"]
EXPOSE 3000