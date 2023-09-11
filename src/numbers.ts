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

export { random, max };
