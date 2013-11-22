// pbm.js
var urlCookie = 'urlCookie';
var ProtoBuf = dcodeIO.ProtoBuf;

var mediaDeviceBuilder = ProtoBuf.protoFromFile({file:"TestProtos/MediaDevice.proto",
  root:"http://localhost:8080/"});  // update to point to the right spot on your server for the protos.
console.log('mediaDeviceBuilder built');

$(document).ready(function(){
  $("#testButton").click(test);
  
});

function test(){
 var root = mediaDeviceBuilder.lookup('MediaDevicePbm');
 var fields = dumpFields('MediaDevicePbm',root);
 if(fields instanceof Array) {
  fields.forEach(function(field){
    dumpFields(field.name,field);
  });
 }
}

function dumpFields(name, root) {
  var fields= [];

  if(root instanceof ProtoBuf.Reflect.Message)
    fields = root.getChildren(ProtoBuf.Reflect.Message.Field);
  else if('resolvedType' in root && 
    root.resolvedType &&
    'children' in root.resolvedType)
    fields = root.resolvedType.children;

  append('<h2>'+name+'  '+fields.length+'</h2>');
  fields.forEach(function(field){
    append('<h5>Field<h6><pre>'+field.name+'</pre>');
  });
  
  return fields;
}

function append(addenda) {
  $('#output').append(addenda);
}