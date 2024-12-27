class TodoeException extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode || 500;
      this.name = 'TodoeException';
    }
  }
  
  module.exports = TodoeException;