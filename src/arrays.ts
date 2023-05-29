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
 * @param array - The input array to be grouped.
 * @param key - The key to group the array by.
 * @returns {Array} - The grouped array.
 */
function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce(
    (result: Record<string, T[]>, current_value: T): Record<string, T[]> => {
      const group_key = String(current_value[key]);
      result[group_key] = result[group_key] || [];
      result[group_key].push(current_value);
      return result;
    },
    {}
  );
}

export { uniqueElements, groupBy };
