import { Action } from "./interface/action.interface.js";
import { InvalidInstanceException } from "../exception/invalid-instance.exception.js";
import { AWSGatewaySocketRepository } from "../repository/aws-gateway-socket.repository.js";
import { OpenAiGPTRepository } from "../repository/open-ai-gpt.repository.js";
import { MessageDTO } from "../dtos/message.dto.js";

export class SendMessageAction extends Action {
  #messageObject;
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

    this.#messageObject = {
      id: messageDTO.uuId,
      connectionId: messageDTO.connectionId,
      from: messageDTO.from,
      to: messageDTO.to,
      message: messageDTO.message,
      date: new Date().toISOString(),
    };
  }

  async dispatch() {
    const { awsGatewaySocketRepository, openAiGPTRepository } =
      this.#repositories;
    const responseToUSer = await openAiGPTRepository.requestResponse(
      this.#messageObject.text
    );

    return awsGatewaySocketRepository.emit(this.#messageObject.connectionId, {
      ...this.#messageObject,
      message: responseToUSer,
    });
  }
}
