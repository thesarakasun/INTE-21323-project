# --- Stage 1: Build the React application ---
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# --- Stage 2: Serve the static files with Nginx ---
FROM nginx:stable-alpine

# Copy the built files from the 'builder' stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy the Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the new startup script
COPY startup.sh /startup.sh
# Make the script executable
RUN chmod +x /startup.sh

EXPOSE 80

# The command to run when the container starts
CMD ["/startup.sh"]