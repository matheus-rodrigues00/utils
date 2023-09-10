var isEmail = require("@teteu/utils").isEmail;
var email = "abc.def@mail-archive.com";
var result = isEmail(email);
console.log(result); // true
