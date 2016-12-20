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
var GrandchildPrototype = ChildClass.extend(GrandchildClass); // and so it goes forever
```

**License:** [BSD 3-Clause License](https://opensource.org/licenses/BSD-3-Clause)
