#!/bin/bash

echo 'Waiting for PostgreSQL to start...'

# Wait for PostgreSQL to be ready
until PGPASSWORD=password psql -h postgres -U vijayselvaraj -d vijayselvaraj -c 'SELECT 1' > /dev/null 2>&1; do
  echo 'PostgreSQL not available yet - waiting...'
  sleep 2
done

echo 'PostgreSQL is ready!'
echo 'Running migrations...'
poetry run alembic upgrade head

echo 'Starting API server...'
poetry run uvicorn main:app --host 0.0.0.0 --port 8000 --reload