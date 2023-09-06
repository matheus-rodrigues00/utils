"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deepClone = void 0;
/**
 * This method recieves an object and returns a deep clone of it.
 * @param object
 * @returns {object}
 */
function deepClone(obj) {
    return Object.assign({}, obj);
}
exports.deepClone = deepClone;
