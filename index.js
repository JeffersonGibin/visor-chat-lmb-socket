/* eslint-disable no-case-declarations */
import { MessageDTO } from "./src/dtos/message.dto.js";
import { SendMessageAction } from "./src/actions/send-message.action.js";
import { OpenAiGPTRepository } from "./src/repository/open-ai-gpt.repository.js";
import { AWSGatewaySocketRepository } from "./src/repository/aws-gateway-socket.repository.js";
import { ValidateEnvironment } from "./src/validation/validate-environment.js";

export const handler = async (event) => {
  try {
    // Before Process
    new ValidateEnvironment().execute();

    const awsGatewaySocketRepository = new AWSGatewaySocketRepository(
      // eslint-disable-next-line no-undef
      process.env.GW_ENDPOINT
    );

    const openAiGPTRepository = new OpenAiGPTRepository(
      // eslint-disable-next-line no-undef
      process.env.OPENAI_API_KEY
    );

    const repositories = {
      awsGatewaySocketRepository,
      openAiGPTRepository,
    };

    if (event.requestContext) {
      const connectionId = event.requestContext.connectionId;
      const payload = event.body ? JSON.parse(event.body) : {};
      const action = event.requestContext.routeKey;

      switch (action) {
        case "$connect":
          break;

        case "$disconnect":
          console.log("Socket " + connectionId + " disconnect!");
          break;

        case "$default":
          break;

        case "sendMessage":
          const messageDTO = new MessageDTO({
            connectionId,
            message: payload.message,
          });
          await new SendMessageAction(messageDTO, repositories).dispatch();
          break;

        default:
      }
    }
  } catch (error) {
    console.error("[ Error ]", error);
  }

  const response = {
    statusCode: 200,
  };

  return response;
};
