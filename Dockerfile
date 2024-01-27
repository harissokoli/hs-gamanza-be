FROM node:16.14.0-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000

# Define the command to run the app
CMD ["npm", "run", "start:dev"]

