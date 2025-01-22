FROM node:18 AS build

# Set the working directory inside the container
WORKDIR /app

COPY package.json package-lock.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

#port 
EXPOSE 5173

# Run the app
CMD ["npm", "run", "dev", "--", "--host"]
