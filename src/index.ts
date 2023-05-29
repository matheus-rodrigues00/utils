const arrays = require("./arrays");
const numbers = require("./numbers");
const dateAndTime = require("./dateAndTime");
const strings = require("./strings");

module.exports = {
  ...arrays,
  ...numbers,
  ...dateAndTime,
  ...strings,
};
