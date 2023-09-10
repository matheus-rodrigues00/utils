var uniqueElements = require("@teteu/utils").uniqueElements;
var array = [1, 1, 1, 1, 1, 1, 1, 1, 1, 2];
var uniqueArray = uniqueElements(array);
console.log(uniqueArray); // [1, 2]
