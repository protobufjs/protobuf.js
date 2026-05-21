// test currently consists only of not throwing

import { Root, Message, Method, Type, Field, MapField, OneOf, IEnum, IField, IMethod, IOneOf, IService, IType, ReflectedMessage } from "..";

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

const reflectedCreated: ReflectedMessage = HelloReflected.create({ value: "hi" });
type Assert<T extends true> = T;
type ReflectedTypeIsType = Assert<typeof reflectedCreated.$type extends Type ? true : false>;
const reflectedCreatedValue: string = reflectedCreated.value;
const reflectedDecodedValue: string = HelloReflected.decode(HelloReflected.encode({ value: "hi" }).finish()).value;
const reflectedConvertedValue: string = HelloReflected.fromObject({ value: "hi" }).value;

const parsedOptionValue: number | undefined = HelloReflected.parsedOptions?.[0]["(custom_option)"];
const reflectedMethod = new Method("Call", undefined, "Hello", "Hello", false, false, undefined, undefined, [{ option: 1 }]);
const parsedMethodOptionValue: number | undefined = reflectedMethod.parsedOptions?.[0].option;

const enumDescriptor: IEnum = {
    edition: "proto2",
    values: { A: 0 },
    valuesOptions: { A: { deprecated: true } },
    reserved: [[100, 200], "OLD"],
    comment: null,
    comments: { A: null }
};
const fieldDescriptor: IField = { edition: "2023", type: "string", id: 1, comment: null };
const methodDescriptor: IMethod = { requestType: "Hello", responseType: "Hello", comment: null };
const oneofDescriptor: IOneOf = { oneof: ["value"], comment: null };
const serviceDescriptor: IService = { edition: "2023", methods: { Call: methodDescriptor }, comment: null };
const typeDescriptor: IType = { edition: "2023", fields: { value: fieldDescriptor }, oneofs: { choice: oneofDescriptor }, comment: null };

// Custom classes

export class Hello extends Message<Hello> {

    public value: string; // for MessageProperties<T> coercion

    public foo() {
        this.value = "hi";
        return this;
    }
}

root.lookupType("Hello").ctor = Hello;

let helloCreated: Hello = Hello.create({ value: "hi" });
helloCreated.foo();
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
