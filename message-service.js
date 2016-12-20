const uuid = require('node-uuid');

const Message = require('./message');

class MessageService {
  constructor(db) {
    this.db = db;
  }

  create(environment, level, msg) {
    const message = new Message(environment, level, msg);
    message.id = this.persist(message);
    return message;
  }

  persist(message) {
    const id = uuid.v1();
    this.db.query('INSERT INTO messages(id, environment, level, message) VALUES(${id}, ${environment}, ${level}, ${message});', {
      id,
      environment: message.environment,
      level: message.level,
      message: message.message
    });
    return id;
  }
}

module.exports = MessageService;
