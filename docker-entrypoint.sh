#!/bin/sh

echo "Waiting for database..."

until nc -z postgres 5432; do
  sleep 2
done

echo "Database started"

echo "Generating Prisma client..."
npx prisma generate

echo "Running migrations..."
npx prisma migrate deploy

echo "Starting server..."
node dist/server.js
