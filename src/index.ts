const arrays = require("./arrays");
const numbers = require("./numbers");
const dateAndTime = require("./dateAndTime");

module.exports = {
  ...arrays,
  ...numbers,
  ...dateAndTime,
};
