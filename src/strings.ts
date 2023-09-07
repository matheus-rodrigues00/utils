/**
 * Replace tokens in a string based on a custom regular expression
 * @param {string} string - The input string containing the tokens.
 * @param {object} tokens - An object containing the tokens for replacement.
 * @param {RegExp} regex - The regular expression for identifying tokens.
 * @returns {string} - The string with tokens replaced.
 */
function replaceTokens(
  string: string,
  tokens: Record<string, any>,
  regex: RegExp
): string {
  const new_string = string.replace(regex, (match: string): string => {
    if (tokens[match] !== undefined) {
      return tokens[match];
    }

    return match;
  });

  return new_string;
}

/**
 * Validates if the input string is a valid email
 * @param str - The string to validate.
 * @returns {boolean} - True if the string is a valid email, false otherwise.
 */
function isEmail(str: string): boolean {
  const email_validation_regex =
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return email_validation_regex.test(str);
}

export { replaceTokens, isEmail };
