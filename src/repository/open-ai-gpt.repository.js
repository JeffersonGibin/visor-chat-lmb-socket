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
      .createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
      })
      .then((res) => res.data.choices[0].message.content);

    return res;
  }
}
