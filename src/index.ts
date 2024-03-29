const arrays = require("./arrays");
const numbers = require("./numbers");
const dateAndTime = require("./dateAndTime");
const strings = require("./strings");
const databases = require("./databases");
const promises = require("./promises");
const objects = require("./objects");
const phoneNumbers = require("./phoneNumbers");
const discountOnPrice = require("./calculations");
const files = require("./files");

module.exports = {
  ...arrays,
  ...numbers,
  ...dateAndTime,
  ...strings,
  ...databases,
  ...promises,
  ...objects,
  ...phoneNumbers,
  ...discountOnPrice,
  ...files,
};
