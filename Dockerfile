FROM oven/bun:latest

RUN mkdir -p /app/local_modules
WORKDIR /app
# COPY package.json ./
# COPY bun.lockb ./
# COPY src ./

# RUN bun install