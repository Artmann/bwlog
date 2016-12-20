FROM kkarczmarczyk/node-yarn
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app/
COPY yarn.lock /app/
RUN yarn
COPY . /app

EXPOSE 3000
CMD [ "npm", "start" ]
