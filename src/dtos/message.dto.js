import AWS from "aws-sdk";

export class MessageDTO {
  message;
  connectionId;
  uuId;

  constructor(payload) {
    this.uuId = AWS.util.uuid.v4();
    this.message = payload.message;
    this.connectionId = payload.connectionId;
  }
}
