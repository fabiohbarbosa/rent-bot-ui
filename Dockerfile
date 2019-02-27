#---- STAGE 1 - build stage ----
FROM node:11.1.0 as builder

ARG WORKDIR=/frontend
RUN mkdir -p ${WORKDIR}
WORKDIR ${WORKDIR}

COPY ./ ./

RUN npm install
RUN npm run build:prod

# ---- STAGE 2 - final image stage ----
FROM node:11.1.0-alpine

ARG WORKDIR=/frontend
RUN mkdir -p ${WORKDIR}
WORKDIR ${WORKDIR}

COPY --from=builder ${WORKDIR}/dist ./dist
COPY --from=builder ${WORKDIR}/server ./server

RUN npm install esm express

EXPOSE 4000
CMD ["node", "server/index.js"]
