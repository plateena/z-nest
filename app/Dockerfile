FROM node:20

WORKDIR /usr/src/app

COPY ./src/package*.json .

RUN npm install

COPY ./src .

EXPOSE 3000

ENTRYPOINT [ "/entrypoint/entrypoint.sh" ]

CMD ["npm", "run", "start:dev"]
