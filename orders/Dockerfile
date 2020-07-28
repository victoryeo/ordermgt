FROM node:11.1.0-alpine
RUN mkdir -p /usr/local/victor
WORKDIR /usr/local/victor
RUN apk — update add git

RUN git clone -b master https://github.com/victoryeo/ordermgt.git
WORKDIR /usr/local/victor/ordermgt/orders
RUN npm install

EXPOSE 4044
ENTRYPOINT [“npm”]
CMD [“start”] 
