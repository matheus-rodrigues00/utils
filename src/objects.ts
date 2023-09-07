/**
 * This method recieves an object and returns a deep clone of it.
 * @param object
 * @returns {object}
 */
function deepClone(obj: object) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * This method receives an object and an array of keys and returns a new object with only the keys specified.
 * @param T - The type of the source object
 * @param source - The source object
 * @param keys - An array of keys to pick from the source object
 * @returns {object}
 */
function pick<T extends object, K extends keyof T>(
  source: T,
  keys: K[]
): Pick<T, K> {
  const result: Partial<Pick<T, K>> = {};
  for (const key of keys) {
    if (key in source) {
      result[key] = source[key];
    }
  }
  return result as Pick<T, K>;
}

/**
 * @param source - The source object
 * @param keys - An array of keys to omit from the source object
 * @returns {object}
 */
function omit<T extends object, K extends keyof T>(
  source: T,
  keys: K[]
): Omit<T, K> {
  keys.map(key => {
    if (key in source) {
      delete source[key];
    }
  });

  return source as Omit<T, K>;
}

export { deepClone, pick, omit };
