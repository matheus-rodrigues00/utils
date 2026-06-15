"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomizeArray = exports.groupBy = exports.uniqueElements = void 0;
const { random } = require("@/numbers");
/**
 * Returns an array with unique elements.
 * @param {any[]} array - The input array.
 * @returns {Array} - The array with unique elements.
 */
function uniqueElements(array) {
    if (!Array.isArray(array)) {
        throw new Error("uniqueElements() expects an array as argument");
    }
    return [...new Set(array)];
}
exports.uniqueElements = uniqueElements;
/**
 * Returns an object with the array grouped by the key.
 * @param {T[]} array - The input array to be grouped.
 * @param {Record<string, T[]>} key - The key to group the array by.
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
/**
 * This method recieves an array and returns a randomized version of it.
 * @param {any[]} array - The array to be randomized.
 * @returns {Array} - The randomized array.
 */
function randomizeArray(array) {
    const new_arr = [...array];
    return new_arr.sort(() => random() - 50);
}
exports.randomizeArray = randomizeArray;
