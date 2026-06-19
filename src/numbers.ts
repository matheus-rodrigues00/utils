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
 * This method receives a numeric array and returns its average
 * @param {number[]} arr - The numeric array
 * @returns {number | undefined} - The average, or undefined for an empty array.
 */
function mean(arr: number[]): number | undefined {
  if (arr.length === 0) {
    return undefined;
  }

  return arr.reduce((sum, n) => sum + n, 0) / arr.length;
}

/**
 * This method receives an array of numbers and returns the biggest number.
 * @param {number[]} arr - The array with numbers.
 * @returns {number} - The biggest number.
 * author: teixeirista - Matheus Teixeira
 */
function max(arr: number[] | undefined): number | undefined {
  if (typeof arr === "undefined" || arr.length === 0) {
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
 * This method receives an array and returns the mean of value given by callback function
 * @param array - The array to find the mean of
 * @param callback - The callback function to use to find the mean
 * @returns {number | undefined} - The mean of the values in the array
 */
function meanBy<T>(
  array: T[],
  callback: (item: T) => number
): number | undefined {
  if (typeof array === "undefined" || array.length === 0) {
    return undefined;
  }

  let sum: number = 0;
  array.forEach(element => {
    sum += callback(element);
  });

  return sum / array.length;
}

/**
 * This method receives a numeric array and returns the sum of its values.
 * @param {number[]} arr - The numeric array.
 * @returns {number} - The sum of the values, or 0 for an empty array.
 */
function sum(arr: number[]): number {
  return arr.reduce((total, n) => total + n, 0);
}

/**
 * This method receives an array and returns the sum of the values given by the callback function.
 * @param array - The array to sum.
 * @param callback - The callback function to use to find each value to sum.
 * @returns {number} - The sum of the callback values, or 0 for an empty array.
 */
function sumBy<T>(array: T[], callback: (item: T) => number): number {
  return array.reduce((total, item) => total + callback(item), 0);
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
  if (divisor === 0 || Number.isNaN(divisor)) {
    throw new Error("Divisor is not a number or is equal to 0.");
  }

  if (precision < 0 || precision > 100) {
    throw new Error("Precision must be between 0 and 100.");
  }

  return (dividend / divisor).toFixed(precision);
}

/**
 * This method constrains a number to be within an inclusive [lower, upper] range.
 * If lower is greater than upper, the bounds are swapped so the method stays forgiving.
 * @param {number} number - The number to clamp.
 * @param {number} lower - The lower bound of the range.
 * @param {number} upper - The upper bound of the range.
 * @returns {number} - The number constrained to the [lower, upper] range.
 */
function clamp(number: number, lower: number, upper: number): number {
  const lowerBound = Math.min(lower, upper);
  const upperBound = Math.max(lower, upper);

  return Math.min(upperBound, Math.max(lowerBound, number));
}

export { clamp, divideFixed, max, maxBy, mean, meanBy, random, sum, sumBy };
