var tape = require('tape');

var protobuf = require('..');

var proto =
  'syntax = "proto3";\
package myservice;\
message DoSomethingRequest {\
}\
message DoSomethingResponse {\
}\
service MyService {\
  rpc DoSomething(DoSomethingRequest) returns (DoSomethingResponse) {\
    option (google.api.http) = {\
      // Some TODO comment \
    };\
  };\
}';

tape.test('option', function(test) {
  var root = protobuf.parse(proto).root;
  root.resolveAll();
  test.pass('should parse and resolve without errors');
  test.end();
});
