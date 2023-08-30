

FROM node:18-alpine3.16


RUN npm i -g ts-node 
RUN npm i -g typescript
RUN npm i -g nodemon

WORKDIR /app

COPY package*.json /app

RUN npm install

COPY . /app

EXPOSE 3001

# CMD ["npm", "run", "start"]
ENTRYPOINT npm start