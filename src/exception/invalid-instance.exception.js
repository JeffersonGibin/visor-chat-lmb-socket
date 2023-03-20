export class InvalidInstanceException extends Error {
  constructor(message) {
    super();

    this.message = message;
    this.code = "InvalidInstance";
  }
}
