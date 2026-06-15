"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.throttle = exports.TimeoutErrors = exports.race = exports.timeout = exports.sleep = void 0;
const TimeoutErrors = {
    TIMEOUT_ERROR_MESSAGE: "Timeout Error",
    RESPONSE_ERROR_MESSAGE: "Response Error",
};
exports.TimeoutErrors = TimeoutErrors;
/**
 * This method receives a time in milliseconds and returns a promise that resolves after that time.
 * @param {number} time - The time in milliseconds.
 * @returns {Promise} - The promise that resolves after the time.
 */
function sleep(time = 1000) {
    return new Promise(resolve => setTimeout(resolve, time));
}
exports.sleep = sleep;
/**
 * @callback promiseFunction
 * @return {Promise<T>}
 */
/**
 * This method receives an array of functions that returns a promise and a max concurrency
 * @param {promiseFunction[]} promises - an array of functions that return a promise
 * @returns {Promise<T[]>} - a promise array of all the promises passed in
 */
function throttle(promises, maxConcurrency = Infinity) {
    return __awaiter(this, void 0, void 0, function* () {
        const results = new Array(promises.length);
        let next = 0;
        function worker() {
            return __awaiter(this, void 0, void 0, function* () {
                while (next < promises.length) {
                    const i = next++;
                    results[i] = yield promises[i]();
                }
            });
        }
        const workers = Math.min(maxConcurrency, promises.length) || 0;
        yield Promise.all(Array.from({ length: workers }, () => worker()));
        return results;
    });
}
exports.throttle = throttle;
/**
 * * If the promise is not fulfilled within the specified time, a Timeout Error is throw reject.
 * @template T
 * @param {Promise<T>} promise
 * @param {number} [time=8000]
 * @returns {Promise<T>}
 * @throws {TimeoutError} Throws a TimeoutError if the timeout is exceeded.
 * author: ahn0min - YeongMin Ahn
 */
function timeout(promise, time = 8000) {
    return new Promise((resolve, reject) => {
        const timeout_id = setTimeout(() => reject(new Error(TimeoutErrors.TIMEOUT_ERROR_MESSAGE)), time);
        promise
            .then(response => {
            clearTimeout(timeout_id);
            resolve(response);
        })
            .catch(err => {
            clearTimeout(timeout_id);
            reject(err);
        });
    });
}
exports.timeout = timeout;
/**
 * This method should race promises against each other.
 * @template T
 * @param {Promise<T>[]} array_of_promises - The array of promises.
 * @returns {Promise} - The first promise that is resolved.
 */
function race(array_of_promises) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield Promise.race(array_of_promises);
        return result;
    });
}
exports.race = race;
