"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupBy = exports.uniqueElements = void 0;
/**
 * Returns an array with unique elements.
 * @param array
 * @returns {Array}
 */
function uniqueElements(array) {
    if (!Array.isArray(array)) {
        throw new Error("uniqueElements() expects an array as argument");
    }
    return [...new Set(array)];
}
exports.uniqueElements = uniqueElements;
/**
 * Returns an array grouped by the given key.
 * @param array - The input array to be grouped.
 * @param key - The key to group the array by.
 * @returns {Array} - The grouped array.
 */
function groupBy(array, key) {
    return array.reduce((result, current_value) => {
        const group_key = String(current_value[key]);
        result[group_key] = result[group_key] || [];
        result[group_key].push(current_value);
        return result;
    }, {});
}
exports.groupBy = groupBy;
