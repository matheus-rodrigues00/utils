/**
 * Replace tokens in a string based on a custom regular expression
 * @param {string} string - The input string containing the tokens.
 * @param {object} tokens - An object containing the tokens for replacement.
 * @param {RegExp} regex - The regular expression for identifying tokens.
 * @returns {string} - The string with tokens replaced.
 * author: giri-madhan - Giri Madhan
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
 * @param {string} str - The string to validate.
 * @returns {boolean} - True if the string is a valid email, false otherwise.
 * author: NullSploit01 - Harshal Dharmik
 */
function isEmail(str: string): boolean {
  const email_validation_regex =
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return email_validation_regex.test(str);
}

/**
 * Shortens a string to a maximum length and appends an omission indicator when it gets cut.
 * The total length (including the omission) never exceeds `length`.
 * @param {string} str - The string to truncate.
 * @param {number} length - The maximum length of the returned string.
 * @param {string} omission - The indicator appended when the string is cut. Defaults to "…".
 * @returns {string} - The original string when it fits, otherwise the truncated string with the omission appended.
 */
function truncate(str: string, length: number, omission = "…"): string {
  if (str.length <= length) {
    return str;
  }

  return str.slice(0, length - omission.length) + omission;
}

/**
 * Uppercases the first character of a string and lowercases the rest.
 * @param {string} str - The string to capitalize.
 * @returns {string} - The capitalized string, or an empty string when the input is empty.
 */
function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Capitalizes the first letter of each space-separated word and lowercases the rest.
 * Existing spaces are preserved.
 * @param {string} str - The string to convert to title case.
 * @returns {string} - The title-cased string, or an empty string when the input is empty.
 */
function titleCase(str: string): string {
  return str
    .split(" ")
    .map(word => capitalize(word))
    .join(" ");
}

/**
 * Splits a string into lowercased words, breaking on camelCase and acronym
 * boundaries as well as on any run of non-alphanumeric characters (spaces,
 * hyphens, underscores, punctuation). Empty entries are dropped, so leading,
 * trailing and repeated separators do not produce empty words. Digits stay
 * attached to the word they belong to.
 * @param {string} str - The string to split into words.
 * @returns {string[]} - The list of lowercased words.
 */
function splitWords(str: string): string[] {
  return str
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    .split(/[^a-zA-Z0-9]+/)
    .filter(word => word.length > 0)
    .map(word => word.toLowerCase());
}

/**
 * Converts a string to kebab-case, splitting on camelCase boundaries and any
 * non-alphanumeric separators.
 * @param {string} str - The string to convert.
 * @returns {string} - The kebab-cased string, or an empty string when the input has no alphanumeric characters.
 * author: Drishtyaggarwal - Drashti Aggarwal
 */
function kebabCase(str: string): string {
  return splitWords(str).join("-");
}

/**
 * Converts a string to snake_case, splitting on camelCase boundaries and any
 * non-alphanumeric separators.
 * @param {string} str - The string to convert.
 * @returns {string} - The snake_cased string, or an empty string when the input has no alphanumeric characters.
 * author: Drishtyaggarwal - Drashti Aggarwal
 */
function snakeCase(str: string): string {
  return splitWords(str).join("_");
}

export {
  capitalize,
  isEmail,
  kebabCase,
  replaceTokens,
  snakeCase,
  titleCase,
  truncate,
};
