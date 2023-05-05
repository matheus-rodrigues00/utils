/**
 * This method recieves a min and max number and returns a random number between them.
 */
function random(min: number = 0, max: number = 100): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export { random };
