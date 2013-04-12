// #ifdef UNDEFINED
/*
 Copyright 2013 Daniel Wirtz <dcode@dcode.io>

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */
// #endif
/**
 * @alias ProtoBuf.Lang
 * @expose
 */
ProtoBuf.Lang = (function() {
    "use strict";
    
    /**
     * ProtoBuf Language.
     * @exports ProtoBuf.Lang
     * @type {Object.<string,string|RegExp>}
     * @namespace
     * @private
     * @expose
     */
    var Lang = { // Look, so cute!
        OPEN: "{",
        CLOSE: "}",
        OPTOPEN: "[",
        OPTCLOSE: "]",
        OPTEND: ",",
        EQUAL: "=",
        END: ";",

        DELIM: /[\s\{\}=;\[\],"\(\)]/g,
        KEYWORD: /package|option|import|message|enum|extend|service/,
        RULE: /required|optional|repeated/,
        TYPE: /double|float|int32|uint32|sint32|int64|uint64|sint64|fixed32|sfixed32|fixed64|sfixed64|bool|string|bytes/,
        NAME: /[a-zA-Z][a-zA-Z_0-9]*/,
        TYPEDEF: /[a-zA-Z](\.?[a-zA-Z_0-9])*/,
        TYPEREF: /\.?[a-zA-Z](\.?[a-zA-Z_0-9])*/,
        NUMBER: /^-?([1-9][0-9]*)|0$/,
        ID: /[0-9]+/,
        WHITESPACE: /\s/,
        STRING: /"([^"\\]*(\\.[^"\\]*)*)"/g,
        STRINGOPEN: '"',
        STRINGCLOSE: '"',
        COPTOPEN: '(',
        COPTCLOSE: ')'
    };
    
    return Lang;
})();
