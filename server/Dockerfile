FROM node:12-alpine

ENV PORT=3000

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install dependencies
COPY package.json /usr/src/app
RUN npm install

# Copy source
COPY . /usr/src/app

EXPOSE $PORT
CMD [ "npm", "start" ]