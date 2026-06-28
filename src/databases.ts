const sql_keywords = require("../helpers/sql_keywords.json");

interface SanitizationOptions {
  data_types?: boolean;
  statements?: boolean;
  clauses?: boolean;
  functions?: boolean;
  operators?: boolean;
  constraints?: boolean;
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function buildKeywordsRegexPattern(keywords: string[]): string {
  return keywords
    .map(keyword => {
      const escaped = escapeRegExp(keyword);
      const startBoundary = /^\w/.test(keyword) ? "\\b" : "";
      const endBoundary = /\w$/.test(keyword) ? "\\b" : "";
      return `${startBoundary}${escaped}${endBoundary}`;
    })
    .join("|");
}

/**
 * WARNING: This is NOT a secure SQL injection defense. Always use parameterized queries instead.
 * This method removes SQL keywords on word boundaries to clean basic text inputs.
 *
 * @param {string} text - The string to sanitize.
 * @param {SanitizationOptions} sanitization_options - An object containing the options for sanitization.
 * @returns {string} - The sanitized string.
 */
function sanitize(
  text: string = "",
  sanitization_options: SanitizationOptions = {}
): string {
  const {
    statements = true,
    clauses = true,
    operators = true,
    data_types = false,
    functions = false,
    constraints = false,
  }: SanitizationOptions = sanitization_options;

  if (data_types) {
    const regex: RegExp = new RegExp(
      `(${buildKeywordsRegexPattern(sql_keywords.data_types)})`,
      "gi"
    );
    text = text.replace(regex, "");
  }
  if (statements) {
    const regex: RegExp = new RegExp(
      `(${buildKeywordsRegexPattern(sql_keywords.statements)})`,
      "gi"
    );
    text = text.replace(regex, "");
  }

  if (clauses) {
    const regex: RegExp = new RegExp(
      `(${buildKeywordsRegexPattern(sql_keywords.clauses)})`,
      "gi"
    );
    text = text.replace(regex, "");
  }

  if (functions) {
    const regex: RegExp = new RegExp(
      `(${buildKeywordsRegexPattern(sql_keywords.functions)})`,
      "gi"
    );
    text = text.replace(regex, "");
  }

  if (operators) {
    const regex: RegExp = new RegExp(
      `(${buildKeywordsRegexPattern(sql_keywords.operators)})`,
      "gi"
    );
    text = text.replace(regex, "");
  }

  if (constraints) {
    const regex: RegExp = new RegExp(
      `(${buildKeywordsRegexPattern(sql_keywords.constraints)})`,
      "gi"
    );
    text = text.replace(regex, "");
  }

  return text.trim();
}

export { sanitize };
