#!/bin/sh

# Get the VITE_API_BASE_URL from the environment, or use a default
export API_BASE_URL=${VITE_API_BASE_URL:-http://localhost:5000}

echo "window.env = { API_BASE_URL: \"$API_BASE_URL\" };" > /usr/share/nginx/html/config.js

# Start Nginx in the foreground
nginx -g 'daemon off;'