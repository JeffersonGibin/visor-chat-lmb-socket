import { Configuration, OpenAIApi } from "openai";
export class OpenAiGPTRepository {
  #configuration;

  constructor(apiKey) {
    this.#configuration = new Configuration({
      apiKey,
    });
  }

  async requestResponse(message) {
    const openai = new OpenAIApi(this.#configuration);

    const res = await openai
      .createCompletion({
        model: "text-davinci-003",
        prompt: message,
        temperature: 0.5,
        max_tokens: 3500,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      })
      .then((res) => res.data.choices[0].text);

    return res;
  }
}
