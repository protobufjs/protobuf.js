// uncomment for browser only / non long.js versions
/*
/// <reference path="../stub-long.d.ts" />
/// <reference path="../stub-node.d.ts" />
*/

import { Root, Message, Type, Field, MapField, OneOf } from "..";

// Reflection
const root = Root.fromJSON({
    nested: {
        Hello: {
            fields: {
                value: {
                    rule: "required",
                    type: "string",
                    id: 1
                }
            }
        }
    }
});
const HelloReflected = root.lookupType("Hello");

HelloReflected.create({ value: "hi" });

// Custom classes

export class Hello extends Message<Hello> {

    public value: string; // for MessageProperties<T> coercion

    public foo() {
        this.value = "hi";
        return this;
    }
}

root.lookupType("Hello").ctor = Hello;

Hello.create({ value: "hi" });
let helloMessage = new Hello({ value: "hi" });
let helloBuffer  = Hello.encode(helloMessage.foo()).finish();
let helloDecoded = Hello.decode(helloBuffer);

// Decorators

import "reflect-metadata";

export enum AwesomeEnum {
  ONE = 1,
  TWO = 2
}

export class AwesomeSubMessage extends Message<AwesomeSubMessage> {

  @Field.d(1, "string")
  public awesomeString: string;

  @MapField.d(2, "string", "string")
  public awesomeMapString : { [key: string]: string };

  @MapField.d(3, "string", AwesomeEnum)
  public awesomeMapEnum : { [key: string]: string };

  @MapField.d(4, "string", AwesomeSubMessage)
  public awesomeMapMessage : { [key: string]: Message<AwesomeSubMessage> };

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

let awesomeMessage = new AwesomeMessage({ awesomeField: "hi" });
let awesomeBuffer  = AwesomeMessage.encode(awesomeMessage).finish();
let awesomeDecoded = AwesomeMessage.decode(awesomeBuffer);

// test currently consists only of not throwing
