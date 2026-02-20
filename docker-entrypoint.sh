#!/bin/sh

echo "Verifying DATABASE_URL..."
if [ -z "$DATABASE_URL" ]; then
  echo "❌ Error: DATABASE_URL is not set. Please add it in Railway Variables."
  exit 1
fi

echo "Running migrations with retry..."
RETRIES=5
until npx prisma migrate deploy || [ $RETRIES -eq 0 ]; do
  echo "Prisma migrate failed, retrying in 5s... ($RETRIES retries left)"
  RETRIES=$((RETRIES - 1))
  sleep 5
done

if [ $RETRIES -eq 0 ]; then
  echo "❌ Max retries reached for migrations. Exiting."
  exit 1
fi

echo "Starting server..."
# Start the compiled JavaScript
node dist/server.js


