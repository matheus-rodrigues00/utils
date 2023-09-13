/**
 * This method receives a min and max number and returns a random number between them.
 * @param min - The minimum number to return.
 * @param max - The maximum number to return.
 * @returns {number} - The random number.
 */
function random(min: number = 0, max: number = 100): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * This method receives an array of numbers and returns the biggest number.
 * @param {number[]} arr - The array with numbers.
 * @returns {number} - The biggest number.
 * author: teixeirista - Matheus Teixeira
 */
function max(arr: number[] | undefined): number | undefined {
  if (typeof arr == "undefined" || arr.length === 0) {
    return undefined;
  }

  let max: number = -Infinity;

  for (const val of arr) {
    if (val > max) {
      max = val;
    }
  }

  return max;
}

/**
 * This method receives an array and finds the maximum element in an array based on a provided callback function
 * @param array - The array to find the maximum element in
 * @param callback - The callback function to use to find the maximum element
 * @returns {T | undefined} - The element with maximum value in array based on callback function
 */
function maxBy<T>(array: T[], callback: (item: T) => number): T | undefined {
  if (typeof array === "undefined" || array.length === 0) {
    return undefined;
  }

  let max_element: T = array[0];
  let max_value: number = callback(array[0]);

  array.forEach(element => {
    const current_max_value: number = callback(element);
    if (current_max_value > max_value) {
      max_element = element;
      max_value = current_max_value;
    }
  });

  return max_element;
}

/**
 * This method receives a dividend and a divisor and returns the result of the division with provided precision.
 * @param {number} dividend - The dividend.
 * @param {number} divisor - The divisor.
 * @param {number} precision - The precision.
 * @returns {string} - The result of the division.
 */
function divideFixed(
  dividend: number,
  divisor: number,
  precision: number
): string {
  if (divisor === 0 || isNaN(divisor)) {
    throw new Error("Divisor is not a number or is equal to 0.");
  }

  if (precision < 0 || precision > 100) {
    throw new Error("Precision must be between 0 and 100.");
  }

  return (dividend / divisor).toFixed(precision);
}

export { random, max, maxBy, divideFixed };
