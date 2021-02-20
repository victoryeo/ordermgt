FROM node:11.1.0-alpine
RUN mkdir -p /usr/local/payments
COPY package.json /usr/local/payments
WORKDIR /usr/local/payments/
RUN npm install
COPY . /usr/local/payments

EXPOSE 4045
CMD ["npm", "start"] 
