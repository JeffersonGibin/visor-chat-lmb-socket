import AWS from "aws-sdk";

export class MessageDTO {
  to;
  from;
  text;
  connectionId;
  uuId;

  constructor(payload) {
    this.uuId = AWS.util.uuid.v4();
    this.connectionId = payload.connectionId;
    this.to = payload.to;
    this.from = payload.from;
    this.message = payload.message;
  }
}
