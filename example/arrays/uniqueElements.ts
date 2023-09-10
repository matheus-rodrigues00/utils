const { uniqueElements } = require("@teteu/utils");

const array: number[] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 2];
const uniqueArray: number[] = uniqueElements(array);

console.log(uniqueArray); // [1, 2]
