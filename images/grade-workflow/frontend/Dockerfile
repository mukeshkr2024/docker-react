# Use node:alpine as the base image
FROM node:alpine as builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the React application using Vite
RUN npm run build

# Use a smaller image to serve the production build
FROM nginx:alpine

# Copy the build output from the builder image to the nginx folder
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose the port that nginx will use
EXPOSE 80

# Start nginx to serve the app
CMD ["nginx", "-g", "daemon off;"]
