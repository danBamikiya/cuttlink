# build environment
FROM node:14-slim  AS ui-dev

WORKDIR /app

# make non-root user 'node' the owner of WORKDIR
RUN chown -R node:node /app

COPY --chown=node:node ./package*.json ./

RUN npm i @angular/cli && npm i

COPY --chown=node:node . .

EXPOSE 4200

USER node

ENV NODE_ENV development

CMD ["npm", "start"]


# production environment
# FROM node  AS ui-build
# WORKDIR /app
# COPY ["package.json", "package-lock.json", "./"]
# RUN cd app && npm ci @angular/cli && npm ci
# COPY . .
# EXPOSE 4200
# CMD ["npm", "build"]