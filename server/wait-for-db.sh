#!/bin/bash
# wait-for-db.sh

set -e

host="$1"
shift
cmd="$@"

until PGPASSWORD=password psql -h "$host" -U "vijayselvaraj" -d "vijayselvaraj" -c '\q'; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 2
done

>&2 echo "Postgres is up - executing command"
exec $cmd