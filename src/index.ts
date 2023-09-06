const arrays = require("./arrays");
const numbers = require("./numbers");
const dateAndTime = require("./dateAndTime");
const strings = require("./strings");
const databases = require("./databases");
const promises = require("./promises");
const objects = require("./objects");

module.exports = {
  ...arrays,
  ...numbers,
  ...dateAndTime,
  ...strings,
  ...databases,
  ...promises,
  ...objects,
};
