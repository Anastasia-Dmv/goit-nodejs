exports.NotFound = class NotFound extends Error {
  constructor(message) {
    super((message = "User with such email not found"));
    this.status = 404;
  }
};
