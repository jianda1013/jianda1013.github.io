FROM node:alpine

WORKDIR /usr/app

COPY ./package* ./

RUN npm install

CMD ["npm", "start"]