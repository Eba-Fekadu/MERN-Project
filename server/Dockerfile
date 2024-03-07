FROM node

WORKDIR /index

COPY package.json /index

RUN npm install

COPY . /index

EXPOSE 80

CMD ["npm","run","start"]
