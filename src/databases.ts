const sql_keywords = require("./helpers/sql_keywords.json");
/**
 * This method recieves an string input and sanitizes removing all SQL injection.
 * @param input
 * @param options
 * @returns {string}
 * @default input ""
 */

function sanitize(
  input: string = "",
  options: {
    data_types?: boolean;
    statements?: boolean;
    clauses?: boolean;
    functions?: boolean;
    operators?: boolean;
    constraints?: boolean;
  } = {}
): string {
  const {
    statements = true,
    clauses = true,
    operators = true,
    data_types = false,
    functions = false,
    constraints = false,
  } = options;

  if (data_types) {
    const regex: RegExp = new RegExp(
      `(${sql_keywords.data_types.join("|")})`,
      "gi"
    );
    input = input.replace(regex, "");
  }
  if (statements) {
    const regex: RegExp = new RegExp(
      `(${sql_keywords.statements.join("|")})`,
      "gi"
    );
    input = input.replace(regex, "");
  }

  if (clauses) {
    const regex: RegExp = new RegExp(
      `(${sql_keywords.clauses.join("|")})`,
      "gi"
    );
    input = input.replace(regex, "");
  }

  if (functions) {
    const regex: RegExp = new RegExp(
      `(${sql_keywords.functions.join("|")})`,
      "gi"
    );
    input = input.replace(regex, "");
  }

  if (operators) {
    const regex: RegExp = new RegExp(
      `(${sql_keywords.operators.join("|")})`,
      "gi"
    );
    input = input.replace(regex, "");
  }

  if (constraints) {
    const regex: RegExp = new RegExp(
      `(${sql_keywords.constraints.join("|")})`,
      "gi"
    );
    input = input.replace(regex, "");
  }

  return input.trim();
}

export { sanitize };
