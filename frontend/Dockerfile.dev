FROM node:11.1.0-alpine as build-step
RUN mkdir -p /usr/local/frontend
COPY package.json /usr/local/frontend
WORKDIR /usr/local/frontend
RUN npm install
COPY . /usr/local/frontend

CMD ["npm", "start"]
