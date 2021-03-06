const bodyParser = require('body-parser');
const express = require('express')
const pgp = require('pg-promise')();

const config = require('./config');
const MessageService = require('./message-service')


let app = express()
let db =  pgp(`postgres://${config.db.username}:${config.db.password}@${config.db.host}/${config.db.database}`);
app.use(bodyParser.urlencoded());

const messageService = new MessageService(db);

app.get('/messages', function (req, res) {
  messageService.getRecentMessages((messages) => {
    res.send(messages);
  });
});

app.post('/messages', function (req, res) {
  const { application, environment, level, message } = req.body;
  const response = messageService.create(application, environment, level, message );
  res.send({ message: response });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
