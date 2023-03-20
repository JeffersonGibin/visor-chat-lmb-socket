import { MessageDTO } from "./src/dtos/message.dto.js";
import { SendMessageAction } from "./src/actions/send-message.action.js";
import { ConnectAction } from "./src/actions/connect.action.js";
import { DisconnectAction } from "./src/actions/disconnect.action.js";
import { OpenAiGPTRepository } from "./src/repository/open-ai-gpt.repository.js";
import { AWSGatewaySocketRepository } from "./src/repository/aws-gateway-socket.repository.js";
import { ValidateEnvironment } from "./src/validation/validate-environment.js";
import { InvalidActionException } from "./src/exception/invalid-action.exception.js";


export const handler = async (event) => {
  try {
    // After Process
    new ValidateEnvironment().execute();

    if (event.requestContext) {
      const action = event.requestContext.routeKey;
      const connectionId = event.requestContext.connectionId;
      const payload = event.body ? JSON.parse(event.body) : {};

      // DTO Message
      const messageDTO = new MessageDTO({
        to: payload.to,
        from: payload.from,
        message: payload.message,
        connectionId,
      });

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
        openAiGPTRepository
      };

      switch (action) {
        case "$connect":
            await new ConnectAction(messageDTO, awsGatewaySocketRepository).dispatch();
          break;
        case "$disconnect":
          await new DisconnectAction(
            messageDTO,
            awsGatewaySocketRepository
          ).dispatch();
          break;
        case "$default":
          break;
        case "sendMessage":
          await new SendMessageAction(
            messageDTO,
            repositories
          ).dispatch();

          break;
        default:
          throw new InvalidActionException(
            `The action ${action} is not valid!`
          );
      }
    }
  } catch (error) {
    console.error("[ Error ]", error);
  }

  const response = {
    statusCode: 200,
    body: JSON.stringify("Hello from Lambda!"),
  };
  return response;
};