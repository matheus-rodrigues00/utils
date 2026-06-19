const { replaceTokens, isEmail, truncate, capitalize } = require("@/strings");

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
