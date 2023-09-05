"use strict";
const arrays = require("./arrays");
const numbers = require("./numbers");
const dateAndTime = require("./dateAndTime");
const strings = require("./strings");
const databases = require("./databases");
const promises = require("./promises");
module.exports = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, arrays), numbers), dateAndTime), strings), databases), promises);
