# Use official Node.js as a builder image
FROM node:18 AS builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Debug: List files to check if package.json is present
RUN ls -al /app

# Install dependencies
RUN npm install --frozen-lockfile

# Copy the rest of the application files into the container
COPY . .

# Build the React app
RUN npm run build

# Stage for serving the application using Nginx
FROM nginx:alpine

# Copy the build output to Nginx's HTML directory
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Command to run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
