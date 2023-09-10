const { isEmail } = require("@teteu/utils");

const email: string = "abc.def@mail-archive.com";
const result: boolean = isEmail(email);

console.log(result); // true
