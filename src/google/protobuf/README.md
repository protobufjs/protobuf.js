These files are by default not used by ProtoBuf.js and are here for the purpose of completeness. The library does not
need and therefore does not use these files by design. In most use cases including the descriptor isn't even required
and would just add about 10KB (minified JSON) to your application.

### Though it's possible to include them:

1. You may explicitly reference them by providing a relative or absolute path in your .proto files. E.g. use
   `./google/protobuf/descriptor.proto` and bundle the file with your application.
   
2. If you use the `proto2js` command line utility with the `-legacy` option and the descriptor namespace is explicitly
   referenced, it is included in the generated output.

You are then able to work with it as if it'd be no more and no less than a standard import.
