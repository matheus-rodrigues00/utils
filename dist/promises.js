"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleep = void 0;
/**
 * This method receives a time in milliseconds and returns a promise that resolves after that time.
 * @param time
 * @returns {Promise}
 * @default time 1000
 */
function sleep(time = 1000) {
    return new Promise(resolve => setTimeout(resolve, time));
}
exports.sleep = sleep;
