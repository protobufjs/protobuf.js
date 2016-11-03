var tap = require("tap");

var float_ = require("../src/support/float"),
    Writer = require("../src/writer"),
    Reader = require("../src/reader");

tap.test("float support", function(test) {
    var values = [
         [         0, "00000000" ],
         [         2, "00000040" ],
         [       0.1, "CDCCCC3D",  ],
         [        -0, "00000080" ],
         [  Infinity, "0000807F" ],
         [ -Infinity, "000080FF" ],
         [       NaN, "0000C07F" ],

         [         0, "0000000000000000" ],
         [         2, "0000000000000040" ],
         [       0.1, "9A9999999999B93F" ],
         [        -0, "0000000000000080" ],
         [  Infinity, "000000000000F07F" ],
         [ -Infinity, "000000000000F0FF" ],
         [       NaN, "000000000000F87F" ]
    ];

    values.forEach(function(val) {

        var isFloat = val[1].length === 8;
        var writer = new Writer(); // typed array version
        var type;
        if (isFloat)
            writer.float(val[0]),
            type = "float";
        else
            writer.double(val[0]),
            type = "double";
        
        var buf = writer.finish();

        test.equal(Buffer.from(buf).toString('hex').toUpperCase(), val[1], "should write " + val[0] + " as a " + type + " matching its hex representation");

        var reader = new Reader(buf); // typed array version
        var readval = isFloat ? reader.float() : reader.double();
        if (isNaN(val[0]))
            test.ok(isNaN(readval), "should read back a " + type + " NaN as NaN");
        else if (isFloat)
            test.equal(readval, Math.fround(val[0]), "should read back a " + type + " as the original value " + val[0] + " rounded to a float");
        else
            test.equal(readval, val[0], "should read back a " + type + " as the origin value " + val[0]);
        reader.finish();
    });

    test.end();
});
