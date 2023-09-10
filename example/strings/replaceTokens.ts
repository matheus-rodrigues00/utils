const { replaceTokens } = require("@teteu/utils");

const str: string = "{greeting}, {name}!";
const tokens: Record<string, any> = {
  "{greeting}": "Hello",
  "{name}": "World",
};
const regex: RegExp = /{(\w+)}/g;

const result: string = replaceTokens(str, tokens, regex);

console.log(result); // Hello, World!
