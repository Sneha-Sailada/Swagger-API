# ---------- Builder ----------
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

# copy prisma and tsconfig BEFORE build
COPY prisma ./prisma
COPY tsconfig.json ./tsconfig.json

RUN npx prisma generate

# now copy source
COPY src ./src

RUN npm run build

# -------- Runner ----------
FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache netcat-openbsd

COPY --from=builder /app ./
COPY docker-entrypoint.sh ./

RUN chmod +x docker-entrypoint.sh

EXPOSE 3000

CMD ["sh", "docker-entrypoint.sh"]
