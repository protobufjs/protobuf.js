var root = require("..").newBuilder({
    "convertFieldsToCamelCase": true,
    "populateAccessors": false
})['import']({
    "package": "my.namespace",
    "messages": [
        {
            "name": "something",
            "fields": [],
            "messages": [
                {
                    "name": "v1",
                    "fields": [],
                    "messages": [
                        {
                            "name": "GetRequest",
                            "fields": []
                        },
                        {
                            "name": "GetResponse",
                            "fields": []
                        }
                    ],
                    "enums": [],
                    "services": [{
                        "name": "SomeService",
                        "rpc": {
                            "get": {
                                "request": "GetRequest",
                                "response": "GetResponse"
                            }
                        }
                    }]
                }
            ]
        }
    ]
}).build();
console.log(require("util").inspect(root, { depth: 10}));