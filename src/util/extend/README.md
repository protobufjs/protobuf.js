@protobufjs/extend
==================
[![npm](https://img.shields.io/npm/v/@protobufjs/extend.svg)](https://www.npmjs.com/package/@protobufjs/extend)

Provides minimal drop-in inheritance for classes.

Usage
-----

```js
function ParentClass() {
}
ParentClass.extend = require("@protobufjs/extend");
```

```js
function ChildClass() {
}
var ChildPrototype = ParentClass.extend(ChildClass); // also inherits .extend itself
```

```js
function GrandchildClass() {
}
var GrandchildClass = ChildClass.extend(GrandchildClass); // and so it goes forever
```

**License:** [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0.html)
