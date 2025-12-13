# Use Node 20
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all frontend files
COPY . .

# Expose Vite dev server port
EXPOSE 5173

# Start the development server
CMD ["npm", "run", "dev"]
