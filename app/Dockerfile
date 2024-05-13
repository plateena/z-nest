FROM node:20

WORKDIR /usr/src/app

COPY ./nestjs/package*.json .

RUN npm install

COPY ./nestjs .

EXPOSE 3000

ENTRYPOINT [ "/entrypoint/entrypoint.sh" ]

CMD ["npm", "run", "start:dev"]
