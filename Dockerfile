FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY . .

# Install dependencies
RUN npm install


# Expose port 3000 (if your application uses it)
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
