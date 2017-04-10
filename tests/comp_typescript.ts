// uncomment for browser only / non long.js versions
/*
/// <reference path="../stub-long.d.ts" />
/// <reference path="../stub-node.d.ts" />
*/

import { Root, Message, Type, Field, OneOf } from "..";

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

@Type.d()
export class AwesomeArrayMessage extends Message<AwesomeArrayMessage> {

  @Field.d(1, "uint32", "repeated")
  public awesomeArray: number[];

}

@Type.d()
export class AwesomeStringMessage extends Message<AwesomeStringMessage> {

  @Field.d(1, "string")
  public awesomeString: string;

}

@Type.d()
export class AwesomeMessage extends Message<AwesomeMessage> {

  @Field.d(1, "string", "optional", "awesome default string")
  public awesomeField: string;

  @Field.d(2, AwesomeArrayMessage)
  public awesomeArrayMessage: AwesomeArrayMessage;

  @Field.d(3, AwesomeStringMessage)
  public awesomeStringMessage: AwesomeStringMessage;

  @OneOf.d("awesomeArrayMessage", "awesomeStringMessage")
  public whichAwesomeMessage: string;

}

let awesomeMessage = new AwesomeMessage({ awesomeField: "hi" });
let awesomeBuffer  = AwesomeMessage.encode(awesomeMessage).finish();
let awesomeDecoded = AwesomeMessage.decode(awesomeBuffer);

// test currently consists only of not throwing
