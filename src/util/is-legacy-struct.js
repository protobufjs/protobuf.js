"use strict";
module.exports = isLegacyStruct;

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
 * }
 *   
 * @param {object} payload 
 * @returns {boolean}
 */
function isLegacyStruct(payload) {
    // Value types in a struct
    const valueKeysSet = new Set(['string_value', 'number_value', 'bool_value', 'struct_value', 'list_value', 'null_value']);
    
    // If object has only one key and that key is "fields" which is an object
    if (payload && Object.keys(payload).length === 1 && payload.fields && typeof payload.fields === "object") {
        // Case when the fields key is an array. This can be of the form - 
        // {
        //   fields: [
        //     {key: "key1", value: {string_value: "test"}},
        //     {key: "key2", value: {number_value: 123}}
        //   ]
        // }
        if (Array.isArray(payload.fields)) {
            return payload.fields.every(field => Object.keys(field).length === 2 && 
                field.key && field.value && Object.keys(field.value).length === 1 
                    && valueKeysSet.has(Object.keys(field.value)[0]));
        }

        // Get all the values of the fields object
        // For the given example - 
        // fieldValues = [{string_value: "test"}, {number_value: 123}]
        const fieldValues = Object.values(payload.fields);

        // Check if all the fieldValues have only one key and that key is a valid value type
        if (fieldValues.every(fieldValue => {
            const fieldValueKeys = Object.keys(fieldValue);
            return fieldValueKeys.length === 1 && valueKeysSet.has(fieldValueKeys[0]);
        })) {
            return true;
        }
    }

    return false;
}
