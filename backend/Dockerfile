# For backend
FROM node:16

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE 9000

# Start the application
CMD ["npm", "start"]