# Dockerfile (in your repository root)
FROM nginx:alpine

# Copy all your website files
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
