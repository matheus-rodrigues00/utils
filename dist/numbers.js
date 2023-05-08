"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomizeArray = exports.random = void 0;
/**
 * This method recieves a min and max number and returns a random number between them.
 * @param min
 * @param max
 * @returns {number}
 */
function random(min = 0, max = 100) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
exports.random = random;
/**
 * This method recieves an array and returns a randomized version of it.
 * @param array
 * @returns {Array}
 */
function randomizeArray(array) {
    const new_arr = [...array];
    return new_arr.sort(() => Math.random() - 0.5);
}
exports.randomizeArray = randomizeArray;
