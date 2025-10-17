"use strict";
module.exports = {
    isLegacyStruct,
    isLegacyValue
};


/**
 * Checks if the given payload is in the legacy value format.
 * 
 * @param {object} payload The payload to check for legacy value format
 * @returns {boolean} True if the value is in legacy format, false otherwise
 */
function isLegacyValue(payload) {
    const valueKeysSet = new Set(["string_value", "number_value", "bool_value", "struct_value", "list_value", "null_value"]);

    return payload && typeof payload === "object" && Object.keys(payload).length === 1 && valueKeysSet.has(Object.keys(payload)[0]);
}

/**
 * Identifies where the payload for a struct is in the form of a legacy struct.
 * The legacy format is -
 *
 * {
 *   fields: {
 *       "key1": {
 *           "string_value": "test",
 *       },
 *       "key2": {
 *           "number_value": 123,
 *       }
 *   }
 *   or
 *   fields: [
 *     {key: "key1", value: {string_value: "test"}},
 *     {key: "key2", value: {number_value: 123}}
 *   ]
 * }
 *
 * @param {object} payload The payload to check for legacy struct format
 * @returns {boolean} True if the payload is in legacy struct format, false otherwise
 */
function isLegacyStruct(payload) {
    // Value types in a struct
    const valueKeysSet = new Set(["string_value", "number_value", "bool_value", "struct_value", "list_value", "null_value"]);

    // If object has only one key and that key is "fields" which is an object
    if (payload && Object.keys(payload).length === 1 && payload.fields && typeof payload.fields === "object") {
        if (Array.isArray(payload.fields)) {
            return payload.fields.every(field => Object.keys(field).length === 2 &&
                field.key && isLegacyValue(field.value));
        }

        // Get all the values of the fields object
        // For the given example -
        // fieldValues = [{string_value: "test"}, {number_value: 123}]
        const fieldValues = Object.values(payload.fields);

        // Check if all the fieldValues have only one key and that key is a valid value type
        if (fieldValues.every(fieldValue => isLegacyValue(fieldValue))) {
            return true;
        }
    }

    return false;
}
