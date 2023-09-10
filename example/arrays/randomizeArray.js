var randomizeArray = require("@teteu/utils").randomizeArray;
// randomizeArray
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var randomizedArray = randomizeArray(arr);
console.log(randomizedArray); // [ 9, 8, 7, 6, 5, 4, 3, 2, 1 ]
