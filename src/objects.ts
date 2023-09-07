/**
 * This method recieves an object and returns a deep clone of it.
 * @param object
 * @returns {object}
 */
function deepClone(obj: object) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * This method recieves an object and an array of keys and returns a new object with only the keys specified.
 * @param source
 * @param keys
 * @returns {object}
 */
function pick(source: any, keys: string[]): object {
  const result: any = {};
  for (const key in source) {
    if (keys.includes(key)) {
      result[key] = source[key];
    }
  }
  return result;
}

export { deepClone, pick };
