# ---------- Builder ----------
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
# Install ALL dependencies (including devDeps for build)
RUN npm install

# Copy prisma and tsconfig BEFORE build
COPY prisma ./prisma
COPY tsconfig.json ./tsconfig.json

# Generate Prisma Client
RUN npx prisma generate

# Now copy source
COPY src ./src

# Build the app
RUN npm run build

# -------- Runner ----------
FROM node:20-alpine

WORKDIR /app

# Copy built assets and production dependencies
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma
COPY docker-entrypoint.sh ./

RUN chmod +x docker-entrypoint.sh

# Railway uses whatever port is in process.env.PORT
# but we document 3000 as default
EXPOSE 3000

CMD ["sh", "docker-entrypoint.sh"]

