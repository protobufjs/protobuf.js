import path = require("path");
import * as tape from "tape";

import * as protobuf from "../index";
import { IFileDescriptorSet } from "../ext/descriptor";
// to extend Root
require("../ext/descriptor");

interface Descriptor {
  toDescriptor(
    protoVersion: string
  ): protobuf.Message<IFileDescriptorSet> & IFileDescriptorSet;
  fromDescriptor(
    descriptor: IFileDescriptorSet | protobuf.Reader | Uint8Array
  ): protobuf.Root;
}

tape.test("extensions", function (test) {
  // load document with extended field imported multiple times
  const root = protobuf.loadSync(path.resolve(__dirname, "data/test.proto"));
  root.resolveAll();

  // convert to Descriptor Set
  const decodedDescriptorSet = (root as unknown as Descriptor).toDescriptor(
    "proto3"
  );

  // load back from descriptor set
  const root2 = (protobuf.Root as unknown as Descriptor).fromDescriptor(
    decodedDescriptorSet
  );

  test.pass("should parse and resolve without errors");
  test.end();
});
