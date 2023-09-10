var replaceTokens = require("@teteu/utils").replaceTokens;
var str = "{greeting}, {name}!";
var tokens = {
    "{greeting}": "Hello",
    "{name}": "World",
};
var regex = /{(\w+)}/g;
var result = replaceTokens(str, tokens, regex);
console.log(result); // Hello, World!
