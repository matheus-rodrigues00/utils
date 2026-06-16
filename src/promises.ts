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
  maxConcurrency: number = Infinity
): Promise<T[]> {
  const results = new Array<T>(promises.length);
  let next = 0;
  async function worker() {
    while (next < promises.length) {
      const i = next++;
      results[i] = await promises[i]();
    }
  }
  const workers = Math.min(maxConcurrency, promises.length) || 0;
  await Promise.all(Array.from({ length: workers }, () => worker()));
  return results;
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
function timeout<T>(promise: Promise<T>, time: number = 8000): Promise<T> {
  return new Promise<T>((resolve, reject) => {
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

export { race, sleep, TimeoutErrors, throttle, timeout };
