FROM node:20

WORKDIR /app

ARG OPENAI_API_KEY
ENV OPENAI_API_KEY=$OPENAI_API_KEY

RUN apt update && apt upgrade -y
RUN npm install -g npm@10.5.0

COPY commands /app/commands
COPY utils /app/utils
COPY index.ts /app/index.ts
COPY package.json /app/package.json
COPY tsconfig.json /app/tsconfig.json

RUN npm init -y && npm install && npm install -g ts-node && npm link