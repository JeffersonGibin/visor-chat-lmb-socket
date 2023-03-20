import { EnvironmentNotFoundException } from "../exception/environment-not-found.exception.js";

export class ValidateEnvironment {
  constructor() {}

  execute() {
    // eslint-disable-next-line no-undef
    if (!process.env.GW_ENDPOINT) {
      throw new EnvironmentNotFoundException(
        "Environment variable 'GW_ENDPOINT' not found"
      );
    }

    // eslint-disable-next-line no-undef
    if (!process.env.OPENAI_API_KEY) {
      throw new EnvironmentNotFoundException(
        "Environment variable 'OPENAI_API_KEY' not found"
      );
    }
  }
}
