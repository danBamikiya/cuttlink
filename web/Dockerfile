# build environment
FROM node:14-slim  AS ui-dev

WORKDIR /app

# create a non-root user 'owner'
RUN useradd -r -u 1002 -g root owner

# make non-root user 'owner' the owner of WORKDIR
RUN chown -R owner:root /app

COPY --chown=owner:root ./package*.json ./

RUN npm i @angular/cli && npm i

COPY --chown=owner:root . .

EXPOSE 4200

USER owner

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