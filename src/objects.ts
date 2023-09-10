type DeepKeys<T> = T extends object
  ? T extends infer O
    ? { [K in keyof O]: K | `${K & string}.${DeepKeys<O[K]>}` }[keyof O]
    : never
  : never;

/**
 * This method recieves an object and returns a deep clone of it.
 * @param object - The object to clone.
 * @returns {object} - The cloned object.
 */
function deepClone(obj: object) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * This method receives an object and an array of keys and returns a new object with only the keys specified.
 * @param T - The type of the source object
 * @param source - The source object
 * @param keys - An array of keys to pick from the source object
 * @returns {object} - The new object with only the keys specified
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
 * This method receives an object and an array of keys and returns a new object without the keys specified.
 * @param source - The source object
 * @param keys - An array of keys to omit from the source object
 * @returns {object} - The new object without the keys specified
 */
function omit<T extends object, K extends keyof T>(
  source: T,
  keys: K[]
): Omit<T, K> {
  const result = { ...source };

  for (const key of keys) {
    if (key in source) {
      delete result[key];
    }
  }

  return result as Omit<T, K>;
}

/**
 * This method receives a value and checks if it is a javascript object literal.
 * @param value - The value to check
 * @returns {boolean} - True if the value is an object literal, false otherwise
 */
function isObject(value: any): boolean {
  return Boolean(
    value &&
      typeof value === "object" &&
      Object.prototype.toString.call(value) === "[object Object]"
  );
}

/**
 * This method receives an object with nested properties and an array of keys and returns a new object with only the keys specified.
 * @param object - The object to pick from
 * @param keys - An array of keys to pick from the source object
 * @returns {object} - The new object with only the keys specified
 */
function deepPick<T extends object, K extends DeepKeys<T>>(
  source: T,
  keys: K[]
): Pick<T, K> {
  const result: Partial<Pick<T, K>> = {};

  const recursivePick = (object_to_pick: any, object_path: string[]) => {
    for (const key in object_to_pick) {
      const new_object_path = [...object_path, key];
      const current_key = new_object_path.join(".");

      if (keys.includes(current_key as K)) {
        setObjectProperty(result, new_object_path, object_to_pick[key]);
      }

      if (isObject(object_to_pick[key])) {
        recursivePick(object_to_pick[key], new_object_path);
      }
    }
  };

  const setObjectProperty = (
    object_to_set_property: Record<string, any>,
    object_path: string[],
    object_value: any
  ) => {
    for (let i = 0; i < object_path.length - 1; i++) {
      const object_key = object_path[i];

      if (!object_to_set_property[object_key]) {
        object_to_set_property[object_key] = {};
      }

      object_to_set_property = object_to_set_property[object_key];
    }

    object_to_set_property[object_path[object_path.length - 1]] = object_value;
  };

  recursivePick(source, []);

  return result as Pick<T, K>;
}

export { deepClone, pick, omit, isObject, deepPick };
