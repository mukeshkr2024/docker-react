# Use the official Node.js image as the base image
FROM node:latest

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first to install dependencies
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application files
COPY ./ ./

# Expose the port the app will run on (optional but recommended)
EXPOSE 3000

# Command to start the application
CMD ["npm", "start"]
