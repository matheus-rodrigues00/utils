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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequence = exports.throttle = exports.TimeoutErrors = exports.race = exports.timeout = exports.sleep = void 0;
const asyncrify_1 = __importDefault(require("asyncrify"));
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
function throttle(promises, maxConcurrency) {
    return __awaiter(this, void 0, void 0, function* () {
        const returnArray = new Array(promises.length);
        const queue = new asyncrify_1.default(maxConcurrency);
        for (let i = 0; i < promises.length; i++) {
            returnArray[i] = new Promise((resolve, reject) => {
                queue.add(promises[i], (res, err) => {
                    if (err)
                        reject(err);
                    resolve(res);
                });
            });
        }
        return Promise.all(returnArray);
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
/**
 * This method executes an array of promise-returning functions sequentially,
 * waiting for each one to complete before starting the next.
 * @template T
 * @param {(() => Promise<T>)[]} promiseFunctions - The array of functions that return a promise.
 * @returns {Promise<T[]>} - A promise that resolves with an array of all results in order.
 * author: micheltechEr - Ângelo Miguel
 */
function sequence(promiseFunctions) {
    return __awaiter(this, void 0, void 0, function* () {
        const results = [];
        for (const fn of promiseFunctions) {
            const result = yield fn();
            results.push(result);
        }
        return results;
    });
}
exports.sequence = sequence;
