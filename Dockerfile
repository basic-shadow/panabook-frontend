FROM node:16-alpine AS deps
RUN apk add --no-cache libc6-compat

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production

COPY . .
RUN yarn build

ENV NODE_ENV production

CMD ["yarn", "start"]
