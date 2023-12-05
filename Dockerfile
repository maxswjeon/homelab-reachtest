FROM oven/bun:1 as base

WORKDIR /usr/src/app

FROM base AS install
RUN mkdir -p /temp/dev/
COPY ./package.json /temp/dev/
COPY ./bun.lockb /temp/dev/
RUN cd /temp/dev/ && bun install --frozen-lockfile

RUN mkdir -p /temp/prod/
COPY ./package.json /temp/prod/
COPY ./bun.lockb /temp/prod/
RUN cd /temp/prod/ && bun install --production --frozen-lockfile

FROM base AS release
COPY --from=install /temp/prod/node_modules ./node_modules
COPY index.ts .
COPY package.json .

USER bun
EXPOSE 3000/tcp
ENTRYPOINT [ "bun", "run", "index.ts"]