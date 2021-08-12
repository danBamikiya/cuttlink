FROM node:14-slim AS base
WORKDIR /app
# make non-root user 'node' the owner of WORKDIR
RUN chown -R node:node /app
COPY --chown=node:node ./package*.json ./

# dev environment
FROM base AS ui-dev
WORKDIR /app
COPY --from=base --chown=node:node /app /app
RUN npm i @angular/cli && npm i
COPY --chown=node:node . .
USER node
ENV NODE_ENV development
EXPOSE 4200

ENTRYPOINT ["npm", "start"]

# production environment
FROM base AS build
WORKDIR /app
COPY --from=base --chown=node:node /app /app
RUN npm i @angular/cli && npm ci
COPY --chown=node:node . .
USER node
ENV NODE_ENV production
RUN npm build

# nginx as a web server for production build
FROM build as ui-build
# pulls the nginx image
COPY --from=nginx:1.18-alpine /etc/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/nginx.conf
# remove default nginx configuration
RUN rm /etc/nginx/conf.d/default.conf
# remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*
# copy production build to nginx directory
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]