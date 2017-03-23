// minimal stub for Long instances for reference when not using long.js,
// i.e. <reference path="node_modules/protobufjs/stub-long.d.ts" />

type Long = LongStub;

interface LongStub {
    lo: number,
    hi: number,
    unsigned?: boolean
}
