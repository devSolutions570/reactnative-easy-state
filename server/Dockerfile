FROM node:12-alpine

ENV PORT=4000

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install dependencies
COPY package.json /usr/src/app
RUN npm install

# Copy source
COPY app.js /usr/src/app

EXPOSE $PORT
CMD [ "npm", "start" ]