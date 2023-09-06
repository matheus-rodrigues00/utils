"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pick = exports.deepClone = void 0;
/**
 * This method recieves an object and returns a deep clone of it.
 * @param object
 * @returns {object}
 */
function deepClone(obj) {
    return Object.assign({}, obj);
}
exports.deepClone = deepClone;
/**
 * This method recieves an object and an array of keys and returns a new object with only the keys specified.
 * @param source
 * @param keys
 * @returns {object}
 */
function pick(source, keys) {
    const result = {};
    for (const key in source) {
        if (keys.includes(key)) {
            result[key] = source[key];
        }
    }
    return result;
}
exports.pick = pick;
