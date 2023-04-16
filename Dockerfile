# Use the official Node.js runtime as a parent image
FROM node:14-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY /package*.json ./

# Install app dependencies
RUN npm install

# Copy the app source code to the working directory
COPY . .

# Expose the port that the app will listen on
EXPOSE 8000

# Set the environment variable for the app
ENV NODE_ENV=production

# Start the app using the npm start command
CMD ["npm", "start"]