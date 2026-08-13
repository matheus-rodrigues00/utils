const {
  replaceTokens,
  isEmail,
  truncate,
  capitalize,
  titleCase,
  kebabCase,
  snakeCase,
} = require("@/strings");

describe("replaceTokens", () => {
  test("replaces tokens with values, using basic regex /(w+)/g", () => {
    const regex: RegExp = /(\w+)/g;
    const result: string = replaceTokens("Hello name", { name: "John" }, regex);
    expect(result).toBe("Hello John");
  });

  test("replaces tokens with values, using custom regex", () => {
    const regex: RegExp = /(\{(\w+)\})/g;
    const result: string = replaceTokens(
      "Hello {name}",
      { "{name}": "John" },
      regex
    );
    expect(result).toBe("Hello John");
  });
  test("does not replace tokens if they are not present in the string", () => {
    const regex: RegExp = /(\{(\w+)\})/g;
    const result: string = replaceTokens(
      "Hello {name}",
      { "{age}": 25 },
      regex
    );
    expect(result).toBe("Hello {name}");
  });

  test("handles multiple tokens in the string", () => {
    const regex: RegExp = /(\{(\w+)\})/g;
    const result: string = replaceTokens(
      "Hello {name}, your age is {age}",
      { "{name}": "John", "{age}": 25 },
      regex
    );
    expect(result).toBe("Hello John, your age is 25");
  });

  test("handles tokens with special characters", () => {
    const regex: RegExp = /(\{([^}]+)\})/g;
    const result: string = replaceTokens(
      "The value is {value!}",
      { "{value!}": "<strong>42</strong>" },
      regex
    );
    expect(result).toBe("The value is <strong>42</strong>");
  });

  test("does replace tokens within other words", () => {
    const regex: RegExp = /(\{(\w+)\})/g;
    const result: string = replaceTokens(
      "This is a {tokenized}string",
      { "{tokenized}": "not " },
      regex
    );
    expect(result).toBe("This is a not string");
  });
});

describe("isEmail", () => {
  test("Receives a string with valid email prefix format and returns true", () => {
    expect.assertions(1);
    const result: boolean = isEmail("abc.def@mail-archive.com");
    expect(result).toBe(true);
  });

  test("Receives a string with invalid email prefix format and returns false", () => {
    expect.assertions(1);
    const result: boolean = isEmail("abc#def@mail.com");
    expect(result).toBe(false);
  });

  test("Receives a string with valid email domain formats and returns true", () => {
    expect.assertions(1);
    const result: boolean = isEmail("abc.def@mail.cc");
    expect(result).toBe(true);
  });

  test("Receives a string with invalid email domain formats and returns false", () => {
    expect.assertions(1);
    const result: boolean = isEmail("abc.def@mail#archive.com");
    expect(result).toBe(false);
  });
});

describe("truncate", () => {
  test("returns the string unchanged when it already fits", () => {
    expect.assertions(1);
    const result: string = truncate("hi", 8);
    expect(result).toBe("hi");
  });

  test("truncates and appends the default omission when the string is too long", () => {
    expect.assertions(1);
    const result: string = truncate("hello world", 8);
    expect(result).toBe("hello w…");
  });

  test("truncates using a custom omission", () => {
    expect.assertions(1);
    const result: string = truncate("hello world", 8, "...");
    expect(result).toBe("hello...");
  });
});

describe("capitalize", () => {
  test("uppercases the first character of a lowercase string", () => {
    expect.assertions(1);
    const result: string = capitalize("hello");
    expect(result).toBe("Hello");
  });

  test("lowercases the rest of an all-caps string", () => {
    expect.assertions(1);
    const result: string = capitalize("FRED");
    expect(result).toBe("Fred");
  });

  test("returns an empty string when given an empty string", () => {
    expect.assertions(1);
    const result: string = capitalize("");
    expect(result).toBe("");
  });
});

describe("titleCase", () => {
  test("capitalizes each word in a sentence", () => {
    expect(titleCase("hello world")).toBe("Hello World");
  });

  test("lowercases mixed-case words after their first character", () => {
    expect(titleCase("the QUICK fox")).toBe("The Quick Fox");
  });

  test("capitalizes a single word", () => {
    expect(titleCase("hELLO")).toBe("Hello");
  });

  test("returns an empty string when given an empty string", () => {
    expect(titleCase("")).toBe("");
  });

  test("preserves repeated, leading and trailing spaces", () => {
    expect(titleCase("a  b")).toBe("A  B");
    expect(titleCase(" leading")).toBe(" Leading");
    expect(titleCase("trailing ")).toBe("Trailing ");
  });

  test("only treats spaces as word boundaries", () => {
    expect(titleCase("hello\tworld")).toBe("Hello\tworld");
  });
});

describe("kebabCase", () => {
  test("converts a camelCase string to kebab-case", () => {
    expect.assertions(1);
    const result: string = kebabCase("fooBar");
    expect(result).toBe("foo-bar");
  });

  test("converts a space-separated string to kebab-case", () => {
    expect.assertions(1);
    const result: string = kebabCase("foo Bar");
    expect(result).toBe("foo-bar");
  });

  test("converts an already-delimited string to kebab-case", () => {
    expect.assertions(2);
    expect(kebabCase("foo_bar")).toBe("foo-bar");
    expect(kebabCase("foo-bar")).toBe("foo-bar");
  });

  test("splits acronyms from the word that follows them", () => {
    expect.assertions(2);
    expect(kebabCase("parseHTMLString")).toBe("parse-html-string");
    expect(kebabCase("fooBAR")).toBe("foo-bar");
  });

  test("keeps digits attached to their word", () => {
    expect.assertions(1);
    const result: string = kebabCase("utf8Value");
    expect(result).toBe("utf8-value");
  });

  test("drops leading, trailing and repeated separators", () => {
    expect.assertions(1);
    const result: string = kebabCase("  --foo__bar!!  ");
    expect(result).toBe("foo-bar");
  });

  test("returns an empty string when given an empty string", () => {
    expect.assertions(1);
    const result: string = kebabCase("");
    expect(result).toBe("");
  });

  test("returns an empty string when there is nothing to convert", () => {
    expect.assertions(1);
    const result: string = kebabCase("---");
    expect(result).toBe("");
  });
});

describe("snakeCase", () => {
  test("converts a camelCase string to snake_case", () => {
    expect.assertions(1);
    const result: string = snakeCase("fooBar");
    expect(result).toBe("foo_bar");
  });

  test("converts a space-separated string to snake_case", () => {
    expect.assertions(1);
    const result: string = snakeCase("foo bar");
    expect(result).toBe("foo_bar");
  });

  test("converts an already-delimited string to snake_case", () => {
    expect.assertions(2);
    expect(snakeCase("foo-bar")).toBe("foo_bar");
    expect(snakeCase("foo_bar")).toBe("foo_bar");
  });

  test("splits acronyms from the word that follows them", () => {
    expect.assertions(2);
    expect(snakeCase("XMLHttpRequest")).toBe("xml_http_request");
    expect(snakeCase("IOStream")).toBe("io_stream");
  });

  test("drops leading, trailing and repeated separators", () => {
    expect.assertions(1);
    const result: string = snakeCase("  foo   bar  ");
    expect(result).toBe("foo_bar");
  });

  test("returns an empty string when given an empty string", () => {
    expect.assertions(1);
    const result: string = snakeCase("");
    expect(result).toBe("");
  });
});
