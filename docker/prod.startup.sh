#!/bin/sh

MIGRATION_STATUS=$(npx prisma migrate status)

export PORT=3456 

if echo "$MIGRATION_STATUS" | grep -q "Database schema is up to date"; then
    echo "No migrations needed."
else
    echo "Running migrations..."
    npx prisma migrate deploy
fi

node server.js
