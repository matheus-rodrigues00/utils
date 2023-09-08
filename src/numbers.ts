/**
 * This method receives a min and max number and returns a random number between them.
 * @param min - The minimum number to return.
 * @param max - The maximum number to return.
 * @returns {number} - The random number.
 */
function random(min: number = 0, max: number = 100): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export { random };
