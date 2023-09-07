const { sanitize } = require("@/databases");

describe("sanitize", () => {
  test("removes all sql statement keywords from a string", () => {
    const result = sanitize("SELECT * FROM users;");
    expect(result).toBe("*  users;");
  });

  test("when passing options of data_types, statements, clauses, functions, operators and constraints, it sanitizes the sql keywords corresponding from the string", () => {
    const result = sanitize("SELECT * FROM users WHERE id = 1;", {
      data_types: true,
      statements: true,
      clauses: true,
      functions: true,
      operators: true,
      constraints: true,
    });
    expect(result).toBe("*  users  id  1;");
  });

  test("when passing only statements true it only removes statements", () => {
    const result = sanitize("DROP SELECT * FROM users WHERE id = 1;", {
      statements: true,
      data_types: false,
      clauses: false,
      functions: false,
      operators: false,
      constraints: false,
    });
    expect(result).toBe("* FROM users WHERE id = 1;");
  });

  test("when passing operators false it doesn't remove operators", () => {
    const result = sanitize(
      "SELECT * FROM users WHERE id = 1 and name == 'xyz'",
      {
        operators: false,
      }
    );
    expect(result).toBe("*  users  id = 1 and name == 'xyz'");
  });

  test("by default removes drop keyword", () => {
    const result = sanitize("DROP TABLE users;");
    expect(result).toBe("TABLE users;");
  });
});
