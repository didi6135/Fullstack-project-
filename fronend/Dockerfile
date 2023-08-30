# Use an official Node.js runtime as the base image
FROM node:18-alpine3.16

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . /app

# Build the React app
# RUN npm run build

# Expose the port on which the React app will run (default is 3000)
EXPOSE 3000

# Start the React app when the container starts
ENTRYPOINT npm start