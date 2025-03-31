# Use an official Node.js image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Install dependencies only when needed
COPY package.json package-lock.json* yarn.lock* ./
RUN npm install

# Copy the rest of the app (excluding node_modules)
COPY . .

# Expose the Next.js development port
EXPOSE 3000

# Start the Next.js app in development mode
CMD ["npm", "run", "dev"]

