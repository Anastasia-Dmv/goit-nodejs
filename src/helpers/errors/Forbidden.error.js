exports.Forbidden = class Forbidden extends Error {
  constructor(message) {
    super((message = "Provided password is wrong"));
    this.status = 403;
  }
};
