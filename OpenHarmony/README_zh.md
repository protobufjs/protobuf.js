# protobuf

## 介绍

ProtoBuf(protocol buffers) 是一种语言无关、平台无关、可扩展的序列化结构数据的方法，它可用于（数据）通信协议、数据存储等。,是一种灵活，高效，自动化机制的结构数据序列化方法比XML更小,更快,更为简单。

本项目主要是OpenHarmony系统下以[protobuf.js 7.2.4](https://github.com/protobufjs/protobuf.js)为主要依赖开发，主要接口针对OpenHarmony系统进行合理的适配研发。

## 下载安装

1.安装

```
ohpm install @ohos/protobufjs
```
OpenHarmony ohpm环境配置等更多内容，请参考 [如何安装OpenHarmony ohpm包](https://gitcode.com/openharmony-tpc/docs/blob/master/OpenHarmony_har_usage.md) 。


2.proto文件

按照.proto文件格式定义消息体结构，如：userproto.proto文件。

```
syntax = "proto3";

package user;
message UserLoginResponse{
   string sessionId = 1;
   string userPrivilege = 2;
   bool isTokenType = 3;
   int64 formatTimestamp = 5;
   bytes data =6;
}
```

3.生成js和.d.ts文件

```
全局安装protobufjs
npm install -g protobufjs@7.2.4
全局安装protobufjs-cli
npm install -g protobufjs-cli

在.proto文件目录下执行下列命令
pbjs -t static-module -w es6 -o user.js user.proto
pbts user.js  -o user.d.ts  
```

4.修改生成的文件

```
1.将生成的js文件中的 import * as $protobuf from "protobufjs/minimal";
修改为   
修改为   import $protobuf from "@ohos/protobufjs";

2.将生成的.d.ts文件中的 import * as $protobuf from "protobufjs";
修改为   import $protobuf from "@ohos/protobufjs";

3.在生成的js文件中 const $protobuf = index;这行代码下方添加如下代码
import Long from 'long';
$protobuf.util.Long=Long
$protobuf.configure()
```

5.在entry目录下安装long

```
ohpm install long
```

6.BigInt使用

```
在生成的js文件中 将$protobuf.util.Long 设置为undefined
import Long from 'long';
$protobuf.util.Long = undefined
$protobuf.configure()

let msg = user.UserLoginResponse.create({
   sessionId: "215135415351435",
   userPrivilege: "John123",
   isTokenType: false,
   formatTimestamp: BigInt("9223372036854775807")
);
```

7.将生成js和.d.ts文件复制到工程中

## protobufjs-cli使用说明
```
在文件格式之间转换并生成静态代码
  -t, --target 指定目标格式，可以接受需要自定义目标的路径。
                   json          JSON
                   json-module   JSON表示为模块
                   proto2        Protocol Buffers, Version 2
                   proto3        Protocol Buffers, Version 3
                   static        无反射的静态代码（本身不起作用）
                   static-module 无反射模块的静态代码
  -p, --path 将某个目录添加到包含路径中
  -o, --out 保存文件而非写入到标准输出
  --sparse 只导出从主文件引用的类型（实验）
  仅限模块目标：
  -w, --wrap       指定要使用的包装器，可接受需要自定义包装器的路径。
                   default   默认包装器支持CommonJS与AMD标准
                   commonjs  CommonJS包装器
                   amd       AMD包装器
                   es6       ES6包装器
                   closure   添加到全局protobuf的protobuf.roots上的闭包
  --dependency     指定protobuf版本，可接受有效的模块ID。
  -r, --root       指定备用的protobuf.roots名称
  -l, --lint       Linter配置，默认protbuf.js兼容规则:
                   eslint-disable block-scoped-var, id-length, 
                   no-control-regex, no-magic-numbers, no-prototype-builtins, 
                   no-redeclare, no-shadow, no-var, sort-vars
  --es6            启用ES6语法
  仅限原始源:
  --keep-case      保留字段大小写而非是转换为驼峰大小写
  仅限静态目标:
  --no-create      不生成用于反射兼容性的创建函数.
  --no-encode      不生成编码函数.
  --no-decode      不生成解码函数.
  --no-verify      不生成验证函数.
  --no-convert     不生成转换函数
  --no-delimited   不生成风格的编码/解码函数.
  --no-beautify    不美化生成的代码.
  --no-comments    不输出任何JSDoc注释.
  --force-long     强制对s-/u-/int64和s-/fixed64字段使用Long
  --force-number   强制对s-/u-/int64和s-/fixed64字段使用number
  --force-message  强制使用消息而非普通对象
```
详细使用方式请参考：https://github.com/protobufjs/protobuf.js/blob/master/cli/README.md

## 使用说明

1.proto编码

```
import { user } from './user.js'

 let msg = user.UserLoginResponse.create({
     sessionId: "testSynchronouslyLoadProtoFile",
     userPrivilege: "John123",
     isTokenType: false,
     formatTimestamp: "12342222"
 });

 let arrayBuffer: Uint8Array = user.UserLoginResponse.encode(msg).finish()
```

2.proto编码
```
let decodeMsg = user.UserLoginResponse.decode(arrayBuffer);
```

## 接口说明

**create**

create(properties?: { [k: string]: any }): Message<{}>

生成Message对象

参数：

| 参数名   | 类型     | 必填 | 说明                                                   |
| -------- |--------| ---- | ------------------------------------------------------ |
| properties  | Object | 否   | 要设置的属性。 |

返回值：

| 类型    | 说明         |
| ------- |------------|
| Message | Message实例。 |

**encode**

encode(message: (Message<{}>|{ [k: string]: any }), writer?: Writer): Writer

编码消息

参数

| 参数名   | 类型                           | 必填 | 说明                          |
| -------- |------------------------------| ---- |-----------------------------|
| message    | Message<{}>  &#124;   Object | 是   | Message示例或者普通对象。            |
| writer  | Writer           | 否   | 编码的写入器。 |

返回值：

| 类型    | 说明               |
| ------- | ------------------ |
| Writer | 协议消息体构建器。 |

**decode**

decode(reader: (Reader|Uint8Array), length?: number): Message<{}>

解码消息

| 参数名          | 类型                                       | 必填 | 说明         |
| --------------- | ------------------------------------------ | ---- |------------|
| reader        | Reader &#124; Uint8Array | 是   | 解码的读取器或缓冲区。 |
| length        | number                                   | 否   | 长度。        |

返回值：

| 类型                | 说明               |
| ------------------- | ------------------ |
| Message<{}> | 解码的消息。 |

**verify**

static verify(message: { [k: string]: any }): (string|null)

验证消息有效性

| 参数名          | 类型   | 必填 | 说明                                                         |
| --------------- |------| ---- | ------------------------------------------------------------ |
| message | 普通对象 | 是   | 普通对象。                                         |

返回值：

| 类型                 | 说明                 |
|--------------------|--------------------|
| string &#124; null | 合法返回null,否则返回具体原因。 |

**fromObject**

static fromObject(object: { [k: string]: any }): Message<{}>

从纯对象创建此类型的新消息。还将值转换为各自的内部类型

参数：

| 参数名   | 类型                                                          | 必填 | 说明   |
| -------- |-------------------------------------------------------------| ---- |------|
| object     | Object                                           | 是   | 普通对象 |

返回值：

| 类型    | 说明               |
| ------- | ------------------ |
| object | 普通对象。 |

**toObject**

static toObject(message: Message<{}>, options?: IConversionOptions): { [k: string]: any }

将一个由键及其各自的值组成的数组转换为对象，省略未定义的值

| 参数名             | 类型                                     | 必填 | 说明            |
|-----------------|----------------------------------------| ---- |---------------|
| message         | Message  | 是   | Message 消息对象。 |
| options         | IConversionOptions       | 否   | 转换选项。         |

返回值：

| 类型    | 说明               |
| ------- | ------------------ |
| object | 普通对象。 |


## 约束与限制
在下述版本验证通过：

-  DevEco Studio: NEXT Beta1-5.0.3.806, SDK: API12 Release(5.0.0.66)

-  DevEco Studio 版本：4.1 Canary(4.1.3.317)，OpenHarmony SDK:API11 (4.1.0.36)

## 目录结构

```
|---- protobuf
|     |---- AppScrope  # 示例代码文件夹
|     |---- entry  # 示例代码文件夹
|     |---- library  # 核心库
|           |---- src/main  # 模块代码
|                |---- ets/   # 模块代码
|                     |---- dist     # 打包文件
|            |---- index.ets          # 入口文件
|            |---- .ohpmignore        # ohpm发布的忽略文件
|            |---- *.json5      # 配置文件
|     |---- README.md  # 安装使用方法
|     |---- README_zh.md  # 安装使用方法
|     |---- README.OpenSource  # 开源说明
|     |---- CHANGELOG.md  # 更新日志
```

## 贡献代码

使用过程中发现任何问题都可以提 [Issue](https://gitcode.com/openharmony-tpc/protobuf/issues) 给组件，当然，也非常欢迎发 [PR](https://gitcode.com/openharmony-tpc/protobuf/pulls)共建 。

## 开源协议

本项目基于 [BSD License](https://gitcode.com/openharmony-tpc/protobuf/blob/master/LICENSE) ，请自由地享受和参与开源。
