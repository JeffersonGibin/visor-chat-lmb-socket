import AWS from "aws-sdk";
import { Socket } from "./interface/socket.interface.js";

export class AWSGatewaySocketRepository extends Socket {
  #apiGateway;

  constructor(endpoint) {
    super();
    this.apiGateway = new AWS.ApiGatewayManagementApi({ endpoint });
  }

  /**
   * Emit an event with AWS socket
   * @param {string} connectionID
   * @param {Object} payload
   */
  async emit(connectionId, payload) {
    const payloadEmit = {
      ConnectionId: connectionId,

      // eslint-disable-next-line no-undef
      Data: Buffer.from(JSON.stringify(payload)),
    };

    return this.apiGateway
      .postToConnection(payloadEmit)
      .promise();
  }
}
