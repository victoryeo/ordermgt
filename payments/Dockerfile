FROM node:11.1.0-alpine
RUN mkdir -p /usr/local/victor
WORKDIR /usr/local/victor
RUN apk add --no-cache git

RUN git clone -b master https://github.com/victoryeo/ordermgt.git
WORKDIR /usr/local/victor/ordermgt/payments
RUN npm install

EXPOSE 4044
ENTRYPOINT [“npm”]
CMD [“start”] 
