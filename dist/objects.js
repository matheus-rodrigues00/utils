"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deepPick = exports.isObject = exports.omit = exports.pick = exports.deepClone = void 0;
/**
 * This method recieves an object and returns a deep clone of it.
 * @param object - The object to clone.
 * @returns {object} - The cloned object.
 * author: MarcosViniciusCL - Marcos Vinicius
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
 * @returns {object} - The new object with only the keys specified
 * author: GustavoHBO - Gustavo Henrique
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
 * This method receives an object and an array of keys and returns a new object without the keys specified.
 * @param source - The source object
 * @param keys - An array of keys to omit from the source object
 * @returns {object} - The new object without the keys specified
 * author: NullSploit01 - Harshal Dharmik
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
/**
 * This method receives a value and checks if it is a javascript object literal.
 * @param value - The value to check
 * @returns {boolean} - True if the value is an object literal, false otherwise
 * author: NullSploit01 - Harshal Dharmik
 */
function isObject(value) {
    return Boolean(value &&
        typeof value === "object" &&
        Object.prototype.toString.call(value) === "[object Object]");
}
exports.isObject = isObject;
/**
 * This method receives an object with nested properties and an array of keys and returns a new object with only the keys specified.
 * @param object - The object to pick from
 * @param keys - An array of keys to pick from the source object
 * @returns {object} - The new object with only the keys specified
 * author: NullSploit01 - Harshal Dharmik
 */
function deepPick(source, keys) {
    const result = {};
    const recursivePick = (object_to_pick, object_path) => {
        for (const key in object_to_pick) {
            const new_object_path = [...object_path, key];
            const current_key = new_object_path.join(".");
            if (keys.includes(current_key)) {
                setObjectProperty(result, new_object_path, object_to_pick[key]);
            }
            if (isObject(object_to_pick[key])) {
                recursivePick(object_to_pick[key], new_object_path);
            }
        }
    };
    const setObjectProperty = (object_to_set_property, object_path, object_value) => {
        for (let i = 0; i < object_path.length - 1; i++) {
            const object_key = object_path[i];
            if (!object_to_set_property[object_key]) {
                object_to_set_property[object_key] = {};
            }
            object_to_set_property = object_to_set_property[object_key];
        }
        object_to_set_property[object_path[object_path.length - 1]] = object_value;
    };
    recursivePick(source, []);
    return result;
}
exports.deepPick = deepPick;
