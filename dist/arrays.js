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
 * @param array
 * @param key
 * @returns {Array}
 */
function groupBy(array, key) {
    return array.reduce((result, currentValue) => {
        (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue);
        return result;
    }, {});
}
exports.groupBy = groupBy;
