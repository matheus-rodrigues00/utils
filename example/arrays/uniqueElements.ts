const utils = require("@teteu/utils");

const array: number[] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 2];
const uniqueArray: number[] = utils.uniqueElements(array);

console.log(uniqueArray); // [1, 2]
