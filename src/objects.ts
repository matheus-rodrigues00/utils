/**
 * This method recieves an object and returns a deep clone of it.
 * @param object
 * @returns {object}
 */
function deepClone(obj: object) {
    return { ...obj}
}
  
export { deepClone };