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
    if (Object.keys(payload).length === 1 && typeof payload.fields === "object" 
            && typeof payload.fields === "object") {

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