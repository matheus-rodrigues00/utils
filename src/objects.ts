/**
 * This method recieves an object and returns a deep clone of it.
 * @param object
 * @returns {object}
 */
function deepClone(obj: object) {
    return { ...obj}
}

/**
 * This method recieves an object and an array of keys and returns a new object with only the keys specified.
 * @param source 
 * @param keys 
 * @returns {object}
 */
function pick(source: any, keys: string[]): object {
  const result: any = {};
  // we should also consider if the values are objects, if so we search recursively.
  for (const key in source) {
    if(keys.includes(key)){
      result[key] = source[key]; 
    }
  }
  return result;
}

export { deepClone, pick };