"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.omit = exports.pick = exports.deepClone = void 0;
/**
 * This method recieves an object and returns a deep clone of it.
 * @param object
 * @returns {object}
 */
function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}
exports.deepClone = deepClone;
/**
 * This method receives an object and an array of keys and returns a new object with only the keys specified.
 * @param T - The type of the source object
 * @param source - The source object
 * @param keys - An array of keys to pick from the source object
 * @returns {object}
 */
function pick(source, keys) {
    const result = {};
    for (const key of keys) {
        if (key in source) {
            result[key] = source[key];
        }
    }
    return result;
}
exports.pick = pick;
/**
 * @param source - The source object
 * @param keys - An array of keys to omit from the source object
 * @returns {object}
 */
function omit(source, keys) {
    const result = Object.assign({}, source);
    for (const key of keys) {
        if (key in source) {
            delete result[key];
        }
    }
    return result;
}
exports.omit = omit;
