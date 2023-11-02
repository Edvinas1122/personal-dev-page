FROM oven/bun:latest

RUN mkdir -p /app/local_modules
WORKDIR /app
COPY package.json ./
COPY bun.lockb ./
COPY src ./
COPY public ./public
COPY tsconfig.json ./
COPY tailwind.config.ts ./
COPY next.config.js ./
COPY postcss.config.js ./

# RUN bun install