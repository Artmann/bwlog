class Message {
  constructor(application, environment, level, message) {
    this.application = application;
    this.environment = environment;
    this.level = level;
    this.message = message;
  }
}

module.exports = Message;
