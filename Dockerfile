FROM node:lts-slim
WORKDIR /app
RUN corepack enable
COPY package.json .
COPY yarn.lock .
RUN yarn install --force
COPY . .
RUN yarn run build
CMD [ "yarn", "run", "preview" ]
EXPOSE 80