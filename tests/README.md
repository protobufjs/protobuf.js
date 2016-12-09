This folder contains all the tests, one per file.

It is essential that tests only use the cross-platform API that is also available in browsers:

* Use `load`, not `loadSync`
* Use `Reader.create`, not `BufferReader`
* Use `Writer.create`, not `BufferWriter`
