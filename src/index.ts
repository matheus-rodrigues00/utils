const arrays = require("./arrays");
const numbers = require("./numbers");
const strings = require("./strings");

module.exports = {
  ...arrays,
  ...numbers,
  ...strings,
};
