exports.Unauthorized = class Unauthorized extends Error {
  constructor(message) {
    super((message = "Not authorized"));
    this.status = 401;
  }
};
