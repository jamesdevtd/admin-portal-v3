FROM node:17-alpine
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN STRIPE_KEY={$STRIPE_KEY} \
  APP_BASE_URL={$APP_BASE_URL} \
  yarn install --frozen-lockfile 
COPY . .

EXPOSE 3000
CMD ["yarn", "dev"]