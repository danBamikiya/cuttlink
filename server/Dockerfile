# build environment
FROM node:14-slim AS server-dev

WORKDIR /app

COPY ./package*.json ./

RUN npm i

COPY . .

EXPOSE 3000


ENV NODE_ENV development

CMD ["npm", "run", "dev"]


# production environment
# FROM node AS server-build
# WORKDIR /app
# COPY --from=builder /app /app
# COPY [".", "./"]
# RUN cd app && npm ci
# EXPOSE 3000
# CMD ["npm", "start"]