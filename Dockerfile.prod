FROM node:alpine as BUILD_IMAGE
WORKDIR /app
COPY package.json yarn.lock ./

# install dependencies
RUN yarn install --frozen-lockfile --production

COPY . .
# build
RUN yarn build

FROM node:alpine
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production
ENV NEXT_PUBLIC_API_BASE_URL http://hotel.panabooking.kz

# copy from build image

COPY .env .env
COPY next.config.mjs ./next.config.mjs
COPY --from=BUILD_IMAGE /app/package.json ./package.json
COPY --from=BUILD_IMAGE /app/node_modules ./node_modules
COPY --from=BUILD_IMAGE /app/.next ./.next
COPY --from=BUILD_IMAGE /app/public ./public

CMD ["yarn", "start"]