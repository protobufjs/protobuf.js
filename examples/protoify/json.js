module.exports = require("protobufjs").newBuilder()["import"]({
    "package": "js",
    "messages": [
        {
            "name": "Value",
            "fields": [
                {
                    "rule": "optional",
                    "options": {},
                    "type": "sint32",
                    "name": "integer",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "double",
                    "name": "double",
                    "id": 2
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "string",
                    "name": "string",
                    "id": 3
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "bool",
                    "name": "boolean",
                    "id": 4
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "bool",
                    "name": "null",
                    "id": 5
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "Array",
                    "name": "array",
                    "id": 6
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "Object",
                    "name": "object",
                    "id": 7
                }
            ],
            "enums": [],
            "messages": [],
            "options": {}
        },
        {
            "name": "Array",
            "fields": [
                {
                    "rule": "repeated",
                    "options": {},
                    "type": "Value",
                    "name": "values",
                    "id": 1
                }
            ],
            "enums": [],
            "messages": [],
            "options": {}
        },
        {
            "name": "Object",
            "fields": [
                {
                    "rule": "repeated",
                    "options": {},
                    "type": "Value",
                    "name": "keys",
                    "id": 1
                },
                {
                    "rule": "repeated",
                    "options": {},
                    "type": "Value",
                    "name": "values",
                    "id": 2
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
    "services": []
}).build("js");
