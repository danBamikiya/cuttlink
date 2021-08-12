ARG STAGE=dev

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

# nginx as a reverse proxy to our server
FROM server-${STAGE} as server
# pulls the nginx image
COPY --from=nginx:1.18-alpine /etc/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/nginx.conf
# remove default nginx configuration
RUN rm /etc/nginx/conf.d/default.conf
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]