"use strict";
const arrays = require("./arrays");
const numbers = require("./numbers");
const strings = require("./strings");
module.exports = Object.assign(Object.assign(Object.assign({}, arrays), numbers), strings);
