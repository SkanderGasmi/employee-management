# Use official Node.js image
FROM node:lts

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies

RUN npm install

# Copy the rest of the project
COPY . .

# Install netcat (required for wait-for-it.sh)
RUN apt-get update && apt-get install -y netcat-openbsd && rm -rf /var/lib/apt/lists/*

# Make wait-for-it.sh executable
RUN chmod +x wait-for-it.sh

# Expose port
EXPOSE 3000

# Start the application after MongoDB is ready
CMD ["./wait-for-it.sh", "mongo:27017", "--", "npm", "start"]
