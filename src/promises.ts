import Asyncrify from "asyncrify";
interface TimeoutErrorConstants {
  [erorr: string]: string;
}

const TimeoutErrors: TimeoutErrorConstants = {
  TIMEOUT_ERROR_MESSAGE: "Timeout Error",
  RESPONSE_ERROR_MESSAGE: "Response Error",
};

/**
 * This method receives a time in milliseconds and returns a promise that resolves after that time.
 * @param {number} time - The time in milliseconds.
 * @returns {Promise} - The promise that resolves after the time.
 */
function sleep(time: number = 1000) {
  return new Promise(resolve => setTimeout(resolve, time));
}

/**
 * @callback promiseFunction
 * @return {Promise<T>}
 */

/**
 * This method receives an array of functions that returns a promise and a max concurrency
 * @param {promiseFunction[]} promises - an array of functions that return a promise
 * @returns {Promise<T[]>} - a promise array of all the promises passed in
 */
async function throttle<T>(
  promises: (() => Promise<T>)[],
  maxConcurrency: number
): Promise<T[]> {
  const returnArray = new Array<Promise<T>>(promises.length);
  const queue = new Asyncrify(maxConcurrency);
  for (let i = 0; i < promises.length; i++) {
    returnArray[i] = new Promise((resolve, reject) => {
      queue.add(promises[i], (res, err) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  }
  return Promise.all(returnArray);
}

/**
 * * If the promise is not fulfilled within the specified time, a Timeout Error is throw reject.
 * @template T
 * @param {Promise<T>} promise
 * @param {number} [time=8000]
 * @returns {Promise<T>}
 * @throws {TimeoutError} Throws a TimeoutError if the timeout is exceeded.
 * author: ahn0min - YeongMin Ahn
 */
function timeout<T>(promise: Promise<T>, time: number = 8000) {
  return new Promise((resolve, reject) => {
    const timeout_id = setTimeout(
      () => reject(new Error(TimeoutErrors.TIMEOUT_ERROR_MESSAGE)),
      time
    );

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

/**
 * This method should race promises against each other.
 * @template T
 * @param {Promise<T>[]} array_of_promises - The array of promises.
 * @returns {Promise} - The first promise that is resolved.
 */
async function race<T>(array_of_promises: Promise<T>[]) {
  const result = await Promise.race(array_of_promises);
  return result;
}

/**
 * This method executes an array of promise-returning functions sequentially,
 * waiting for each one to complete before starting the next.
 * @template T
 * @param {(() => Promise<T>)[]} promiseFunctions - The array of functions that return a promise.
 * @returns {Promise<T[]>} - A promise that resolves with an array of all results in order.
 * author: micheltechEr - Ângelo Miguel
 */
async function sequence<T>(
  promiseFunctions: (() => Promise<T>)[]
): Promise<T[]> {
  const results: T[] = [];
  for (const fn of promiseFunctions) {
    const result = await fn();
    results.push(result);
  }
  return results;
}

export { sleep, timeout, race, TimeoutErrors, throttle, sequence };
