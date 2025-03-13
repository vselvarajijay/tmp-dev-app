# Use an official Python image
FROM python:3.10-slim

# Disable Poetry's virtual environment creation
ENV POETRY_VIRTUALENVS_CREATE=false

# Create app directory
WORKDIR /app

# Copy dependency files first for caching benefits
COPY pyproject.toml poetry.lock /app/

# Install Poetry and project dependencies
RUN pip install --no-cache-dir poetry && \
    poetry install --no-root --no-interaction --no-ansi

# Copy the rest of the code
COPY . /app

# Expose FastAPI port
EXPOSE 8000

# Run the FastAPI server
CMD ["poetry", "run", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
