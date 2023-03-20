import { Configuration, OpenAIApi } from "openai";
import { retryIfError } from "../utils/retry-if-error.js";

export class OpenAiGPTRepository {
  #configuration;

  constructor(apiKey) {
    this.#configuration = new Configuration({
      apiKey,
    });
  }

  async requestResponse(message) {

    const request = () => {
      const openai = new OpenAIApi(this.#configuration);
      const MODEL_DAVINCI = "text-davinci-003";

      return openai.createCompletion({
        model: MODEL_DAVINCI,
        prompt: message,
        temperature: 0.5,
        max_tokens: 3500,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
    }

    const response = await retryIfError(request, 3, 500).then((res) => res.data.choices[0].text);

    return response;
  }
}
