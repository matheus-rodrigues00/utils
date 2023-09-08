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
 * This method recieves an array and returns a randomized version of it.
 * @param array - The array to randomize.
 * @returns {Array} - The randomized array.
 */

function randomizeArray(array: any[]): any[] {
  const new_arr = [...array];
  return new_arr.sort(() => Math.random() - 0.5);
}

export { random, randomizeArray };
