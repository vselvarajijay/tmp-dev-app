# Use an official Node image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and lockfile first to cache installs
COPY package.json pnpm-lock.yaml ./
# Install pnpm globally (if you prefer pnpm)
RUN npm install -g pnpm
# Install dependencies
RUN pnpm install

# Copy the rest of your files
COPY . .

# Expose the port Vite runs on
EXPOSE 5173

# Command to start the dev server
CMD ["pnpm", "docker-dev"]
