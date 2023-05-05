/**
 * Returns an array with unique elements.
 * @param array
 * @returns {Array}
 */
function uniqueElements(array: any[]): any[] {
  if (!Array.isArray(array)) {
    throw new Error("uniqueElements() expects an array as argument");
  }
  return [...new Set(array)];
}

/**
 * Returns an array grouped by the given key.
 * @param array
 * @param key
 * @returns {Array}
 */
function groupBy(array: any[], key: string): any[] {
  return array.reduce((result, currentValue) => {
    (result[currentValue[key]] = result[currentValue[key]] || []).push(
      currentValue
    );
    return result;
  }, {});
}

export { uniqueElements, groupBy };
