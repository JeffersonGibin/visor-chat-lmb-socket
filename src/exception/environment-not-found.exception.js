export class EnvironmentNotFoundException extends Error {
  constructor(message) {
    super();

    this.message = message;
    this.code = "EnvironmentNotFound";
  }
}
