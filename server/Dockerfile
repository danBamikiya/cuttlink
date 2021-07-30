# build environment
FROM node:14-slim AS server-dev

WORKDIR /app

# create a non-root user 'owner'
RUN useradd -r -u 1001 -g root owner

# make non-root user 'owner' the owner of WORKDIR
RUN chown -R owner:root /app

COPY --chown=owner:root ./package*.json ./

RUN npm i

COPY --chown=owner:root . .

EXPOSE 3000

USER owner

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