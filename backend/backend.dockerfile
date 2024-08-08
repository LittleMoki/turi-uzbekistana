# Use Node.js 20.x image as base
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if present) to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy Prisma schema and generate Prisma client
COPY prisma prisma/schema.prisma

RUN npx prisma generate

# Copy the rest of the application code
COPY . .

# Expose port 4000 to the outside world
EXPOSE 4000

# Command to run the application
CMD ["npm", "run", "dev"]
