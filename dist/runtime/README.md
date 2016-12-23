The minimal runtime includes just the bare minimum required to work with statically generated code - and *nothing else*. Where applicable, it can be used as a drop-in replacement for the full library as it has the same general structure. To achieve the same with browserify, simply depend on `protobufjs/runtime` instead of `protobufjs`.

Prebuilt files are in source control to enable pain-free frontend respectively CDN usage:

CDN usage
---------

Development:
```
<script src="//cdn.rawgit.com/dcodeIO/protobuf.js/6.X.X/dist/runtime/protobuf.js"></script>
```

Production:
```
<script src="//cdn.rawgit.com/dcodeIO/protobuf.js/6.X.X/dist/runtime/protobuf.min.js"></script>
```

**NOTE:** Remember to replace the version tag with the exact [release](https://github.com/dcodeIO/protobuf.js/tags) your project depends upon.

Frontend usage
--------------

Development:
```
<script src="node_modules/protobufjs/dist/runtime/protobuf.js"></script>
```

Production:
```
<script src="node_modules/protobufjs/dist/runtime/protobuf.min.js"></script>
```
