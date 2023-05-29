"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceTokens = void 0;
/**
 * Replace tokens in a string based on a custom regular expression
 * @param {string} string - The input string containing the tokens.
 * @param {object} tokens - An object containing the tokens for replacement.
 * @param {RegExp} regex - The regular expression for identifying tokens.
 * @returns {string} - The string with tokens replaced.
 */
function replaceTokens(string, tokens, regex) {
    const new_string = string.replace(regex, (match) => {
        if (tokens[match] !== undefined) {
            return tokens[match];
        }
        return match;
    });
    return new_string;
}
exports.replaceTokens = replaceTokens;
