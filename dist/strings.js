"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmail = exports.replaceTokens = void 0;
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
/**
 * Validates if the input string is a valid email
 * @param str - The string to validate.
 * @returns {boolean} - True if the string is a valid email, false otherwise.
 */
function isEmail(str) {
    const email_validation_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return email_validation_regex.test(str);
}
exports.isEmail = isEmail;
