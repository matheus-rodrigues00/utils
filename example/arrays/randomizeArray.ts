const { randomizeArray } = require("@teteu/utils");

const arr: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const randomizedArray = randomizeArray(arr);

console.log(randomizedArray); // random order of the array
