import { Action } from "./interface/action.interface.js";
import { InvalidInstanceException } from "../exception/invalid-instance.exception.js";
import { AWSGatewaySocketRepository } from "../repository/aws-gateway-socket.repository.js";
import { OpenAiGPTRepository } from "../repository/open-ai-gpt.repository.js";
import { MessageDTO } from "../dtos/message.dto.js";

export class SendMessageAction extends Action {
  #messageDTO;
  #repositories;

  constructor(messageDTO, repositories) {
    super();

    if (!(messageDTO instanceof MessageDTO)) {
      throw InvalidInstanceException(
        "[SendMessageAction] The instance is not instance of MessageDTO"
      );
    }

    if (
      !(
        repositories.awsGatewaySocketRepository instanceof
        AWSGatewaySocketRepository
      )
    ) {
      throw InvalidInstanceException(
        "[SendMessageAction] The instance is not instance of AWSGatewaySocketRepository"
      );
    }

    if (!(repositories.openAiGPTRepository instanceof OpenAiGPTRepository)) {
      throw InvalidInstanceException(
        "[SendMessageAction] The instance is not instance of OpenAiGPTRepository"
      );
    }

    this.#repositories = repositories;
    this.#messageDTO = messageDTO;
  }

  /**
   * Dispatch messages
   * @returns {Promise<void>}
   */
  async dispatch() {
    const { uuId, connectionId, message } = this.#messageDTO;
    const { awsGatewaySocketRepository, openAiGPTRepository } =
      this.#repositories;

    return openAiGPTRepository
      .requestResponse(message)
      .then((responseTextAI) => {
        return awsGatewaySocketRepository.emit(connectionId, {
          id: uuId,
          status: "Success",
          message: {
            to: connectionId,
            from: "OpenAI",
            date: new Date().toISOString(),
            text: responseTextAI,
          },
        });
      })
      .catch(() => {
        return awsGatewaySocketRepository.emit(connectionId, {
          id: uuId,
          status: "Error",
          message: {
            to: connectionId,
            from: "OpenAI",
            date: new Date().toISOString(),
          },
        });
      });
  }
}
