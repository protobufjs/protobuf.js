This folder contains all the tests, one per file.

It is essential that tests only use the cross-platform API that is also available in browsers:

* Use `load`, not `loadSync`
* Use `Reader.create`, not `BufferReader`
* Use `Writer.create`, not `BufferWriter`
* It is safe to use `Long`

If it's absolutely inevitable for your test case to use node-specific features, you can still use this pattern:

```js
if (protobuf.util.isNode) {
    // node-specific tests
}
```

**Why?** Tests are run both under node.js and within all kinds of modern to ancient browsers automatically.
