const { replaceTokens } = require("@/strings");

describe("replaceTokens", () => {
  test("replaces tokens with values, using basic regex /(w+)/g", () => {
    const regex = /(\w+)/g;
    const result = replaceTokens("Hello name", { name: "John" }, regex);
    expect(result).toBe("Hello John");
  });

  test("replaces tokens with values, using custom regex", () => {
    const regex = /(\{(\w+)\})/g;
    const result = replaceTokens("Hello {name}", { "{name}": "John" }, regex);
    expect(result).toBe("Hello John");
  });
  test("does not replace tokens if they are not present in the string", () => {
    const regex = /(\{(\w+)\})/g;
    const result = replaceTokens("Hello {name}", { "{age}": 25 }, regex);
    expect(result).toBe("Hello {name}");
  });

  test("handles multiple tokens in the string", () => {
    const regex = /(\{(\w+)\})/g;
    const result = replaceTokens(
      "Hello {name}, your age is {age}",
      { "{name}": "John", "{age}": 25 },
      regex
    );
    expect(result).toBe("Hello John, your age is 25");
  });

  test("handles tokens with special characters", () => {
    const regex = /(\{([^}]+)\})/g;
    const result = replaceTokens(
      "The value is {value!}",
      { "{value!}": "<strong>42</strong>" },
      regex
    );
    expect(result).toBe("The value is <strong>42</strong>");
  });

  test("does replace tokens within other words", () => {
    const regex = /(\{(\w+)\})/g;
    const result = replaceTokens(
      "This is a {tokenized}string",
      { "{tokenized}": "not " },
      regex
    );
    expect(result).toBe("This is a not string");
  });
});
