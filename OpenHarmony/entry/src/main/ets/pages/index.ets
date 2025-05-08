/*
  * Copyright (c) 2022 Huawei Device Co., Ltd.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
    *
  * http://www.apache.org/licenses/LICENSE-2.0
    *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  */
import Long from 'long';

import { user } from './user.js'
import buffer from '@ohos.buffer'
import util from '@ohos.util';

@Entry
@Component
struct Index {
    @State result: string = "";
    str: string = '';
    scroller: Scroller = new Scroller();
    controller: TextInputController = new TextInputController();
    bigInt:string='9223372036854775807'

    getResourceString(res: Resource) {
        return getContext().resourceManager.getStringSync(res.id)
    }
    build() {
        Stack({ alignContent: Alignment.TopStart }) {
            Scroll(this.scroller) {
                Column() {
                    Text($r('app.string.proto_serialization_deserialization'))
                        .width('90%')
                        .height(60)
                        .backgroundColor(0xFFFFFF)
                        .borderRadius(15)
                        .fontSize(16)
                        .textAlign(TextAlign.Center)
                        .margin({ top: 10 })
                        .onClick(event => {
                            this.result = ""
                            let msg = user.UserLoginResponse.create({
                                sessionId: "215135415351435",
                                userPrivilege: "John123",
                                isTokenType: false,
                                formatTimestamp: Long.fromString("9223372036854775807"),
                                data:new Uint8Array(buffer.from(this.getResourceString($r('app.string.test'))).buffer)
                            });

                            let arrayBuffer: Uint8Array = user.UserLoginResponse.encode(msg).finish()
                            console.log("protobuf arrayBuffer:" + arrayBuffer);
                            this.result = this.result + this.getResourceString($r('app.string.serialized_data'))+"：" + JSON.stringify(arrayBuffer) + "\r\n";

                            let decodeMsg = user.UserLoginResponse.decode(arrayBuffer);
                            let timestamp=decodeMsg.formatTimestamp as Long
                            const decoder = util.TextDecoder.create('utf-8');
                            const utfStr = decoder.decodeToString(decodeMsg.data);
                            this.result = this.result + this.getResourceString($r('app.string.Deserialize_data'))+"： \r\n"
                                +"sessionId: " + decodeMsg.sessionId+"\r\n"
                                +"userPrivilege: " + decodeMsg.userPrivilege+"\r\n"
                                +"isTokenType: " + decodeMsg.isTokenType+"\r\n"
                                +"formatTimesStamp: " + timestamp.toString()+"\r\n"
                                + "data: " + utfStr
                        });

                    TextInput({ text: this.bigInt})
                        .width('90%')
                        .height(50)
                        .margin({ top: 10 })
                        .onChange((value: string) => {
                            this.bigInt = value;
                        })

                    Text($r('app.string.proto_serialization_deserialization_bigInt'))
                        .width('90%')
                        .height(60)
                        .backgroundColor(0xFFFFFF)
                        .borderRadius(15)
                        .fontSize(16)
                        .textAlign(TextAlign.Center)
                        .margin({ top: 10 })
                        .onClick(event => {
                            this.result = ""
                            let msg = user.UserLoginResponse.create({
                                sessionId: "215135415351435",
                                userPrivilege: "John123",
                                isTokenType: false,
                                formatTimestamp: BigInt(this.bigInt),
                            });

                            let arrayBuffer: Uint8Array = user.UserLoginResponse.encode(msg).finish()
                            this.result = this.result + this.getResourceString($r('app.string.serialized_data'))+"：" + JSON.stringify(arrayBuffer) + "\r\n";

                            let decodeMsg = user.UserLoginResponse.decode(arrayBuffer);
                            let timestamp=decodeMsg.formatTimestamp
                            this.result = this.result + this.getResourceString($r('app.string.Deserialize_data'))+"： \r\n"
                                +"sessionId: " + decodeMsg.sessionId+"\r\n"
                                +"userPrivilege: " + decodeMsg.userPrivilege+"\r\n"
                                +"isTokenType: " + decodeMsg.isTokenType+"\r\n"
                                +"formatTimesStamp: " + timestamp.toString()+"\r\n"
                        });


                    Text(this.getResourceString($r('app.string.proto_serialization_deserialization'))+`( ${this.getResourceString($r('app.string.Encode_to_decode'))} )`)
                        .width('90%')
                        .height(60)
                        .backgroundColor(0xFFFFFF)
                        .borderRadius(15)
                        .fontSize(16)
                        .textAlign(TextAlign.Center)
                        .margin({ top: 10 })
                        .onClick(event => {
                            this.result = "";
                            let msg = user.UserLoginResponse.create({
                                sessionId: "testSynchronouslyLoadProtoFile",
                                userPrivilege: "John123",
                                isTokenType: false,
                                formatTimestamp: Long.fromString("9007199254740991")
                            });


                            let arrayBuffer: Uint8Array = user.UserLoginResponse.encodeDelimited(msg).finish()
                            console.log("protobuf arrayBuffer:" + arrayBuffer);
                            this.result = this.result + this.getResourceString($r('app.string.serialized_data'))+"：" + JSON.stringify(arrayBuffer) + "\r\n";

                            let decodeMsg = user.UserLoginResponse.decodeDelimited(arrayBuffer);
                            let timestamp=decodeMsg.formatTimestamp
                            console.info("protobuf--> timestamp: "+timestamp)
                            this.result = this.result + this.getResourceString($r('app.string.Deserialize_data'))+"： \r\n"
                                +"sessionId: " + decodeMsg.sessionId+"\r\n"
                                +"userPrivilege: " + decodeMsg.userPrivilege+"\r\n"
                                +"isTokenType: " + decodeMsg.isTokenType+"\r\n"
                                +"formatTimesStamp: " + timestamp.toString()+"\r\n"
                        });

                    Text($r('app.string.Create_normal_message'))
                        .width('90%')
                        .height(60)
                        .backgroundColor(0xFFFFFF)
                        .borderRadius(15)
                        .fontSize(16)
                        .textAlign(TextAlign.Center)
                        .margin({ top: 10 })
                        .onClick(event => {
                            this.result = ""
                            let msg = user.UserLoginResponse.create({
                                sessionId: "testSynchronouslyLoadProtoFile",
                                userPrivilege: "John123",
                                isTokenType: false,
                                // formatTimestamp: "12342222"
                            });
                            let obj = user.UserLoginResponse.toObject(msg)
                            this.result = JSON.stringify(obj)
                        });

                    Text(this.getResourceString($r('app.string.Verify_protobuf_validity'))+`(${this.getResourceString($r('app.string.null_means_valid'))})`)
                        .width('90%')
                        .height(60)
                        .backgroundColor(0xFFFFFF)
                        .borderRadius(15)
                        .fontSize(16)
                        .textAlign(TextAlign.Center)
                        .margin({ top: 10 })
                        .onClick(event => {
                            this.result = ""
                            let msg = user.UserLoginResponse.verify({
                                sessionId: "testSynchronouslyLoadProtoFile",
                                userPrivilege: "zhansgan",
                                isTokenType: false,
                                formatTimestamp: "687568"
                            })
                            this.result = JSON.stringify(msg)
                        });

                    Text($r('app.string.Pure_object'))
                        .width('90%')
                        .height(60)
                        .backgroundColor(0xFFFFFF)
                        .borderRadius(15)
                        .fontSize(16)
                        .textAlign(TextAlign.Center)
                        .margin({ top: 10 })
                        .onClick(event => {
                            this.result = ""
                            let msg = user.UserLoginResponse.fromObject({
                                sessionId: "testSynchronouslyLoadProtoFile",
                                userPrivilege: "John123",
                                isTokenType: false,
                                formatTimestamp: "8976796"
                            })
                            this.result = JSON.stringify(msg)
                        });

                    Text(this.getResourceString($r('app.string.result'))+" :\r\n  " + this.result)
                        .fontSize(15)
                        .margin({ top: 55, left: 10,right:10 })

                }.width('100%');
            }
            .scrollable(ScrollDirection.Vertical).scrollBar(BarState.On)
            .scrollBarColor(Color.Gray).scrollBarWidth(30);
            Button($r('app.string.reset_display'), { type: ButtonType.Capsule, stateEffect: true })
                .backgroundColor(0x317aff)
                .margin({ top: 430, left: 5 })
                .width(110)
                .onClick(event => {
                    this.result = "";
                });
        }.width('100%').height('100%').backgroundColor(0xDCDCDC)
    }
}