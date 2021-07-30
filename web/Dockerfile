# build environment
FROM node:14-slim  AS ui-dev

WORKDIR /app

# create a non-root user 'cuttlink'
RUN useradd -r -u 888 -g root -m cuttlink -c "Non-root user"

# make non-root user 'cuttlink' the owner of WORKDIR
RUN chown -R cuttlink:root /app

COPY --chown=cuttlink:root ./package*.json ./

RUN npm i @angular/cli && npm i

COPY --chown=cuttlink:root . .

EXPOSE 4200

USER cuttlink

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