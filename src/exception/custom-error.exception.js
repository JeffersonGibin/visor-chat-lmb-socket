export class CustomErrorException extends Error {
  constructor(code, message) {
    super();

    this.message = message;
    this.code = code;
  }
}
