import { Message, Type, Field, OneOf } from "protobufjs/light.js";

export class AwesomeSubMessage extends Message<AwesomeSubMessage> {

  @Field.d(1, "string")
  public awesomeString: string;

}

export enum AwesomeEnum {
  ONE = 1,
  TWO = 2
}

@Type.d("SuperAwesomeMessage")
export class AwesomeMessage extends Message<AwesomeMessage> {

  @Field.d(1, "string", "optional", "awesome default string")
  public awesomeField: string;

  @Field.d(2, AwesomeSubMessage)
  public awesomeSubMessage: AwesomeSubMessage;

  @Field.d(3, AwesomeEnum, "optional", AwesomeEnum.ONE)
  public awesomeEnum: AwesomeEnum;

  @OneOf.d("awesomeSubMessage", "awesomeEnum")
  public which: string;

}

// example code
let message = new AwesomeMessage({ awesomeField: "hello" });
let buffer  = AwesomeMessage.encode(message).finish();
let decoded = AwesomeMessage.decode(buffer);
