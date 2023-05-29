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
  const newString = string.replace(
    regex,
    (match: string, ...groups: any[]): string => {
      const tokenVar = groups.pop();

      if (tokens[tokenVar] !== undefined) {
        let aux: any = tokens[tokenVar];

        if (Array.isArray(aux)) {
          aux = aux.length;
        } else if (typeof aux === "object") {
          aux = Object.keys(aux).length;
        } else {
          aux = 0;
        }

        return match.replace(regex, aux.toString());
      }

      return match;
    }
  );

  return newString;
}

export { replaceTokens };