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
 * * If the promise is not fulfilled within the specified time, a Timeout Error is throw reject.
 * @template T
 * @param {Promise<T>} promise
 * @param {number} [time=8000]
 * @returns {Promise<T>}
 * @throws {TimeoutError} Throws a TimeoutError if the timeout is exceeded.
 * author: {ahn0min - YeongMin Ahn}
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

export { sleep, timeout, TimeoutErrors };
