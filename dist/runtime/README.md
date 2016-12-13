This folder contains prebuilt browser versions of [protobuf.js](https://github.com/dcodeIO/protobuf.js)'s runtime for statically generated code. When sending pull requests, it is not required to update these.

**NOTE:** The static code runtime includes just the bare minimum required to work with statically generated modules - and *nothing else*. Where applicable, it can be used as a drop-in replacement for the full library as it has the same general structure.

Prebuilt files are in source control to enable pain-free frontend respectively CDN usage:

CDN usage
---------

Development:
```
<script src="//cdn.rawgit.com/dcodeIO/protobuf.js/6.1.0/dist/runtime/protobuf.js"></script>
```

Production:
```
<script src="//cdn.rawgit.com/dcodeIO/protobuf.js/6.1.0/dist/runtime/protobuf.min.js"></script>
```

**NOTE:** Remember to replace the version tag with the exact [release](https://github.com/dcodeIO/protobuf.js/releases) your project depends upon.

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
