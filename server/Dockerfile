FROM node:14-slim AS base
WORKDIR /app
COPY ./package*.json ./

# dev environment
FROM base AS server-dev
WORKDIR /app
COPY --from=base /app /app
RUN npm i
COPY . .
ENV NODE_ENV development
EXPOSE 3000

ENTRYPOINT ["npm", "run", "dev"]

# production environment
FROM base AS server-build
WORKDIR /app
COPY --from=base /app /app
RUN npm ci
COPY . .
ENV NODE_ENV production
EXPOSE 3000

ENTRYPOINT ["npm", "start"]
