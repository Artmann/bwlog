const uuid = require('node-uuid');

const Message = require('./message');

class MessageService {
  constructor(db) {
    this.db = db;
  }

  getRecentMessages(fn) {
    const query = `SELECT * FROM messages WHERE timestamp >= (current_date - interval '7 days')`;
    this.db.query(query).then((rows) => {
      const messages = rows.map((row) => {
        return new Message(row.application, row.environment, row.level, row.message, row.timestamp);
      });
      fn(messages);
    }).catch(() => {
      fn([]);
    });
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
