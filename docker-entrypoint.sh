#!/bin/sh

echo "Running migrations..."
# npx prisma migrate deploy applies pending migrations to the production DB
npx prisma migrate deploy

echo "Starting server..."
# Start the compiled JavaScript
node dist/server.js

