FROM node:16-alpine AS deps
RUN apk add --no-cache libc6-compat

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production

COPY . .
RUN yarn build

ENV NODE_ENV production
ENV NEXT_PUBLIC_API_BASE_URL http://panabook.kz

CMD ["yarn", "start"]
