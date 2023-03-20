import AWS from "aws-sdk";
import { Socket } from "./interface/socket.interface.js";

export class AWSGatewaySocketRepository extends Socket {
  #apiGateway;

  constructor(endpoint) {
    super();
    this.#apiGateway = new AWS.ApiGatewayManagementApi({ endpoint });
  }

  /**
   * Emit an event with AWS socket
   * @param {string} connectionID
   * @param {Object} payload
   */
  async emit(connectionId, payload) {

    // eslint-disable-next-line no-undef
    const payloadBuffer = Buffer.from(JSON.stringify(payload));

    await this.#apiGateway
      .postToConnection({
        ConnectionId: connectionId,
        Data: payloadBuffer,
      })
      .promise();
  }
}
