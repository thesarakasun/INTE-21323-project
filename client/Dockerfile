# Stage 1 - Build React app
FROM node:18-alpine AS build

WORKDIR /app

# Copy only the package files first (for caching install step)
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Build the app
RUN npm run build
RUN ls -la /app/dist

# Stage 2 - Serve with nginx
FROM nginx:stable-alpine

# Copy the production build from previous stage
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

