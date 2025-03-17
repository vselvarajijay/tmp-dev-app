# Use an official Python image
FROM python:3.10-slim

# Disable Poetry's virtual environment creation
ENV POETRY_VIRTUALENVS_CREATE=false

# Create app directory
WORKDIR /app

# Install PostgreSQL client for health check
RUN apt-get update && \
    apt-get install -y postgresql-client && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copy dependency files first for caching benefits
COPY pyproject.toml poetry.lock /app/

# Install Poetry and project dependencies
RUN pip install --no-cache-dir poetry && \
    poetry install --no-root --no-interaction --no-ansi

# Copy the rest of the code
COPY . /app

# Expose FastAPI port
EXPOSE 8000

# Run the FastAPI server with Alembic migrations
CMD ["./start.sh"]