This folder contains all the tests, one per file.

Tests should only use the cross-platform API that is also available in browsers:

* Use `Reader.create`, not `BufferReader`
* Use `Writer.create`, not `BufferWriter`

If a test case must use node-specific features, you can use this pattern:

```js
if (protobuf.util.isNode) {
    // node-specific tests
}
```
