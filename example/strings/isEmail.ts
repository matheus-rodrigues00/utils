const utils = require("@teteu/utils");

const email: string = "abc.def@mail-archive.com";
const result: boolean = utils.isEmail(email);

console.log(result); // true
