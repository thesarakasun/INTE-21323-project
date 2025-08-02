# Use a slim, modern Node.js image
FROM node:22-bookworm-slim

# Set the working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies using 'npm ci' for consistency
RUN npm ci

# Copy the rest of your source code
# (This is mainly for the initial build; the volume will keep it in sync)
COPY . .

# The command to run the development server
CMD [ "npm", "start"]