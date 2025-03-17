-- Create the user if it doesn't exist
CREATE USER vijayselvaraj WITH PASSWORD 'password';

-- Create the database if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'vijayselvaraj') THEN
        CREATE DATABASE vijayselvaraj;
    END IF;
END
$$;

-- Grant privileges to the user
GRANT ALL PRIVILEGES ON DATABASE vijayselvaraj TO vijayselvaraj;

-- Connect to the database
\c vijayselvaraj

-- Create schema if needed
-- CREATE SCHEMA IF NOT EXISTS app;

-- Set default privileges
ALTER DEFAULT PRIVILEGES GRANT ALL ON TABLES TO vijayselvaraj;
ALTER DEFAULT PRIVILEGES GRANT ALL ON SEQUENCES TO vijayselvaraj;