This folder contains all the tests, one per file.

It is essential that tests only use the cross-platform API that is also available in browsers:

* Use `load`, not `loadSync`
* Use `Reader.create`, not `BufferReader`
* Use `Writer.create`, not `BufferWriter`
* It is safe to use `Long`

**Why?** Tests are run both under node.js and within all kinds of modern to ancient browsers automatically.
