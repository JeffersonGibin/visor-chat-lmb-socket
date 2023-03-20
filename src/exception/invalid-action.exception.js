export class InvalidActionException extends Error {
  constructor(message) {
    super();

    this.message = message;
    this.code = "InvalidAction";
  }
}
