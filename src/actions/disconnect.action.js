import { Action } from "./interface/action.interface.js";
import { InvalidInstanceException } from "../exception/invalid-instance.exception.js";
import { AWSGatewaySocketRepository } from "../repository/aws-gateway-socket.repository.js";
import { MessageDTO } from "../dtos/message.dto.js";

export class DisconnectAction extends Action {
  #message;
  #awsGatewaySocketRepository;

  constructor(messageDTO, awsGatewaySocketRepository) {
    super();

    if (!(messageDTO instanceof MessageDTO)) {
      throw InvalidInstanceException(
        "[DisconnectAction] The instance is not instance of MessageDTO"
      );
    }

    if (!(awsGatewaySocketRepository instanceof AWSGatewaySocketRepository)) {
      throw InvalidInstanceException(
        "[DisconnectAction] The instance is not instance of AWSGatewaySocketRepository"
      );
    }

    this.#awsGatewaySocketRepository = awsGatewaySocketRepository;
    this.#message = {
      id: messageDTO.uuId,
      connectionId: messageDTO.connectionId,
      message: `The socket ${messageDTO.connectionId} was disconnected!`,
      date: new Date().toISOString(),
    };
  }

  async dispatch() {
    return this.#awsGatewaySocketRepository.emit(
      this.#message.connectionId,
      this.#message
    );
  }
}
