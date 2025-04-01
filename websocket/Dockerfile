# Use a lightweight Node.js image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY ./package.json ./
RUN npm install

# Copy the WebSocket server code
COPY . .

# Expose the WebSocket port
EXPOSE 8080

# Start the WebSocket server
CMD ["node", "server.js"]