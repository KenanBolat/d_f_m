# Create app directory
FROM node:18-alpine as build
WORKDIR /ws-server

# Install app dependencies
COPY ws-server/* ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 4000
CMD [ "node", "server.js" ]