exports.Conflict = class Conflict extends Error {
  constructor(message) {
    super((message = "User with such email already exists"));
    this.status = 409;
  }
};
