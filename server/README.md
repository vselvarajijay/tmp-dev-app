# Development Application

This repository contains a development application that can be run using Docker Compose.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started

### Running with Docker Compose

1. Clone the repository:
   ```bash
   git clone git@github.com:vselvarajijay/tmp-dev-app.git
   cd tmp-dev-app
   ```

2. Build and start the containers:
   ```bash
   docker-compose up -d
   ```
   This command builds the images (if they don't exist) and starts the containers in detached mode.

3. To see the logs:
   ```bash
   docker-compose logs -f
   ```
   Press `Ctrl+C` to exit the logs view.

4. Access the application:
   - Web interface: http://localhost:5173/
   - API documentation: http://localhost:8000/docs

### Stopping the Application

To stop the containers:
```bash
docker-compose down
```

To stop and remove all containers, networks, and volumes:
```bash
docker-compose down -v
```

## Development

For local development without Docker, please refer to the development documentation.
