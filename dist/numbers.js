"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.divideFixed = exports.meanBy = exports.mean = exports.maxBy = exports.max = exports.random = void 0;
/**
 * This method receives a min and max number and returns a random number between them.
 * @param min - The minimum number to return.
 * @param max - The maximum number to return.
 * @returns {number} - The random number.
 */
function random(min = 0, max = 100) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
exports.random = random;
/**
 * This method receives a numeric array and returns its average
 * @param {number[]} - The numeric array
 * @returns {number} - The number.
 */
function mean(arr) {
    let sum = 0;
    arr.map(n => {
        sum = sum + n;
    });
    return sum / arr.length;
}
exports.mean = mean;
/**
 * This method receives an array of numbers and returns the biggest number.
 * @param {number[]} arr - The array with numbers.
 * @returns {number} - The biggest number.
 * author: teixeirista - Matheus Teixeira
 */
function max(arr) {
    if (typeof arr == "undefined" || arr.length === 0) {
        return undefined;
    }
    let max = -Infinity;
    for (const val of arr) {
        if (val > max) {
            max = val;
        }
    }
    return max;
}
exports.max = max;
/**
 * This method receives an array and finds the maximum element in an array based on a provided callback function
 * @param array - The array to find the maximum element in
 * @param callback - The callback function to use to find the maximum element
 * @returns {T | undefined} - The element with maximum value in array based on callback function
 */
function maxBy(array, callback) {
    if (typeof array === "undefined" || array.length === 0) {
        return undefined;
    }
    let max_element = array[0];
    let max_value = callback(array[0]);
    array.forEach(element => {
        const current_max_value = callback(element);
        if (current_max_value > max_value) {
            max_element = element;
            max_value = current_max_value;
        }
    });
    return max_element;
}
exports.maxBy = maxBy;
/**
 * This method receives an array and returns the mean of value given by callback function
 * @param array - The array to find the mean of
 * @param callback - The callback function to use to find the mean
 * @returns {number | undefined} - The mean of the values in the array
 */
function meanBy(array, callback) {
    if (typeof array === "undefined" || array.length === 0) {
        return undefined;
    }
    let sum = 0;
    array.forEach(element => {
        sum += callback(element);
    });
    return sum / array.length;
}
exports.meanBy = meanBy;
/**
 * This method receives a dividend and a divisor and returns the result of the division with provided precision.
 * @param {number} dividend - The dividend.
 * @param {number} divisor - The divisor.
 * @param {number} precision - The precision.
 * @returns {string} - The result of the division.
 */
function divideFixed(dividend, divisor, precision) {
    if (divisor === 0 || isNaN(divisor)) {
        throw new Error("Divisor is not a number or is equal to 0.");
    }
    if (precision < 0 || precision > 100) {
        throw new Error("Precision must be between 0 and 100.");
    }
    return (dividend / divisor).toFixed(precision);
}
exports.divideFixed = divideFixed;
