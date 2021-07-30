# build environment
FROM node:14-slim AS server-dev

WORKDIR /app

# create a non-root user 'cuttlink'
RUN useradd -r -u 888 -g root -m cuttlink -c "Non-root user"

# make non-root user 'cuttlink' the owner of WORKDIR
RUN chown -R cuttlink:root /app

COPY --chown=cuttlink:root ./package*.json ./

RUN npm i

COPY --chown=cuttlink:root . .

EXPOSE 3000

USER cuttlink

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