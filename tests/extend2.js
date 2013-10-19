module.exports = require("../ProtoBuf.js").newBuilder().import({
    "package": "sample.basepackage",
    "messages": [
        {
            "name": "Foo",
            "fields": [
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "blah",
                    "id": 1,
                    "options": {}
                }
            ],
            "enums": [],
            "messages": [],
            "options": {}
        }
    ],
    "enums": [],
    "imports": [],
    "options": {},
    "extends": []
}).import({
    "package": "sample.package",
    "messages": [
        {
            "name": "Person",
            "fields": [
                {
                    "rule": "required",
                    "type": "string",
                    "name": "name",
                    "id": 1,
                    "options": {}
                },
                {
                    "rule": "required",
                    "type": "int32",
                    "name": "id",
                    "id": 2,
                    "options": {}
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "email",
                    "id": 3,
                    "options": {}
                }
            ],
            "enums": [],
            "messages": [],
            "options": {}
        }
    ],
    "enums": [],
    "imports": [],
    "options": {},
    "extends": [
        {
            "messageToExtend": "sample.basepackage.Foo",
            "fields": [
                {
                    "rule": "optional",
                    "type": "int32",
                    "name": "bar",
                    "id": 1001,
                    "options": {}
                }
            ]
        },
        {
            "messageToExtend": "sample.basepackage.Foo",
            "fields": [
                {
                    "rule": "optional",
                    "type": "sample.package.Person",
                    "name": "person",
                    "id": 1002,
                    "options": {}
                }
            ]
        }
    ]
}).build("sample");
