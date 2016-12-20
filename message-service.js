const uuid = require('node-uuid');

const Message = require('./message');

class MessageService {
  constructor(db) {
    this.db = db;
  }

  create(application, environment, level, msg) {
    const message = new Message(application, environment, level, msg);
    message.id = this.persist(message);
    return message;
  }

  persist(message) {
    const id = uuid.v1();
    this.db.query('INSERT INTO messages(id, application, environment, level, message, timestamp) VALUES(${id}, ${application}, ${environment}, ${level}, ${message}, NOW());', {
      id,
      application: message.application,
      environment: message.environment,
      level: message.level,
      message: message.message
    });
    return id;
  }
}

module.exports = MessageService;
