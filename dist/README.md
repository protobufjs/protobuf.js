This folder contains prebuilt browser versions of [protobuf.js](https://github.com/dcodeIO/protobuf.js). When sending pull requests, it is not required to update these.

Alternatively, you can also use [the minimal runtime](./runtime) when working with statically generated code from `pbjs` *only*.

Prebuilt files are in source control to enable pain-free frontend respectively CDN usage:

CDN usage
---------

Development:
```
<script src="//cdn.rawgit.com/dcodeIO/protobuf.js/6.1.0/dist/protobuf.js"></script>
```

Production:
```
<script src="//cdn.rawgit.com/dcodeIO/protobuf.js/6.1.0/dist/protobuf.min.js"></script>
```

**NOTE:** Remember to replace the version tag with the exact [release](https://github.com/dcodeIO/protobuf.js/releases) your project depends upon.

Frontend usage
--------------

Development:
```
<script src="node_modules/protobufjs/dist/protobuf.js"></script>
```

Production:
```
<script src="node_modules/protobufjs/dist/protobuf.min.js"></script>
```
