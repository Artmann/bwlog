class Message {
  constructor(application, environment, level, message, timestamp) {
    this.application = application;
    this.environment = environment;
    this.level = level;
    this.message = message;
    this.timestamp = timestamp;
  }
}

module.exports = Message;
