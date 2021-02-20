FROM node:11.1.0-alpine
RUN mkdir -p /usr/local/orders
COPY package.json /usr/local/orders
WORKDIR /usr/local/orders/
RUN npm install
COPY . /usr/local/orders

EXPOSE 4044
CMD ["npm", "start"]
