/**
 * Returns an array with unique elements.
 * @param {any[]} array - The input array.
 * @returns {Array} - The array with unique elements.
 */
function uniqueElements(array: any[]): any[] {
  if (!Array.isArray(array)) {
    throw new Error("uniqueElements() expects an array as argument");
  }
  return [...new Set(array)];
}

/**
 * Removes duplicate elements based on the value returned by a callback, keeping the first occurrence.
 * @param {T[]} array - The input array.
 * @param {(item: T) => unknown} callback - The callback that derives the comparison key for each element.
 * @returns {T[]} - A new array without duplicates, keeping the first occurrence of each key.
 */
function uniqueBy<T>(array: T[], callback: (item: T) => unknown): T[] {
  const seen_keys = new Set<unknown>();
  const result: T[] = [];

  for (const element of array) {
    const key = callback(element);
    if (!seen_keys.has(key)) {
      seen_keys.add(key);
      result.push(element);
    }
  }

  return result;
}

/**
 * Returns the values present in both arrays.
 * @param {T[]} a - The first array.
 * @param {T[]} b - The second array.
 * @returns {T[]} - A new array containing the common elements.
 */
function intersection<T>(a: T[], b: T[]): T[] {
  const lookup = new Set(b);
  const result = a.filter(item => lookup.has(item));
  return uniqueElements(result);
}

/**
 * Returns the values in the first array that are not in the second array.
 * @param {T[]} a - The first array.
 * @param {T[]} b - The second array.
 * @returns {T[]} - A new array containing the values only present in the first array.
 */
function difference<T>(a: T[], b: T[]): T[] {
  const lookup = new Set(b);
  const result = a.filter(item => !lookup.has(item));
  return uniqueElements(result);
}

/**
 * Returns an object with the array grouped by the key.
 * @param {T[]} array - The input array to be grouped.
 * @param {Record<string, T[]>} key - The key to group the array by.
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

/**
 * This method receives an array and returns a randomized version of it.
 * @param {T[]} array - The array to be randomized.
 * @returns {T[]} - The randomized array.
 */
function randomizeArray<T>(array: T[]): T[] {
  const new_arr = [...array];

  for (
    let current_index = new_arr.length - 1;
    current_index > 0;
    current_index--
  ) {
    const random_index = Math.floor(Math.random() * (current_index + 1));
    const current_value = new_arr[current_index] as T;
    const random_value = new_arr[random_index] as T;

    new_arr[current_index] = random_value;
    new_arr[random_index] = current_value;
  }

  return new_arr;
}

/**
 * Splits an array into groups of a given size. The final chunk holds the remaining elements if the array can't be split evenly.
 * @param {T[]} array - The input array to be chunked.
 * @param {number} size - The size of each chunk.
 * @returns {T[][]} - An array containing the chunks. Returns an empty array if size <= 0.
 */
function chunk<T>(array: T[], size: number): T[][] {
  if (size <= 0) {
    return [];
  }
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

/**
 * Generates an array of numbers from start up to (but not including) end, stepping by step.
 * When called with a single argument it is treated as end, with start defaulting to 0.
 * @param {number} start - The start of the range, or the end when called with a single argument.
 * @param {number} [end] - The end of the range (exclusive).
 * @param {number} [step] - The amount to step by. Defaults to 1; a step of 0 returns an empty array to avoid an infinite loop.
 * @returns {number[]} - The array of numbers in the range.
 */
function range(start: number, end?: number, step: number = 1): number[] {
  if (end === undefined) {
    end = start;
    start = 0;
  }
  if (step === 0) {
    return [];
  }
  const result: number[] = [];
  if (step > 0) {
    for (let i = start; i < end; i += step) {
      result.push(i);
    }
  } else {
    for (let i = start; i > end; i += step) {
      result.push(i);
    }
  }
  return result;
}

/**
 * Returns a new array with all falsy values (false, 0, "", null, undefined, and NaN) removed.
 * @param {T[]} array - The input array to compact.
 * @returns {T[]} - A new array with the falsy values removed.
 */
function compact<T>(array: T[]): T[] {
  return array.filter(Boolean);
}

export {
  chunk,
  compact,
  difference,
  groupBy,
  intersection,
  randomizeArray,
  range,
  uniqueBy,
  uniqueElements,
};
