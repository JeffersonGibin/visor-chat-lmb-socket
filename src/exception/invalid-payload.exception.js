export class InvalidPayloadException extends Error {
  constructor(message) {
    super();

    this.message = message;
    this.code = "InvalidPayload";
  }
}
