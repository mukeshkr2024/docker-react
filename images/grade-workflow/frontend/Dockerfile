# Use node:alpine as the base image for the build stage
FROM node:alpine as builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install --frozen-lockfile

# Copy the rest of the application files into the container
COPY . .

# Build the React application using Vite
RUN npm run build

# Use a smaller image (nginx) to serve the production build
FROM nginx:alpine

# Copy the build output from the builder image to the Nginx public directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 for the container
EXPOSE 80

# Start nginx to serve the app
CMD ["nginx", "-g", "daemon off;"]
