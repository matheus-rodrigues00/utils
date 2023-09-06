const { replaceTokens, evaluate, isEmail } = require("@/strings");

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

describe("evaluate", () => {
  test("Receive two strings, '1 + 1' and return true", () => {
    expect.assertions(1);
    const result = evaluate("1 + 1");
    expect(result).toBe(2);
  });

  // Tests for assert errors
  test("Receive '1 plus 1' and return error", () => {
    expect.assertions(1);
    expect(() => {evaluate("1 plus 1")}).toThrowError('Unexpected identifier');
  });

  test("Receive '1 plus 1' and execute the callback function", () => {
    expect.assertions(1);
    const callback = ()=> {
      throw new Error('Something went wrong');
    };
    expect(() => {evaluate("1 + 1", callback)}).not.toThrowError('Something went wrong');
  });

  test("Receive '1 plus 1' and execute the callback function with parameters", () => {
    expect.assertions(1);
    const num1 = 1;
    const num2 = 9;

    const callback = (first_num, second_num)=> {
      const result = first_num + second_num;
      expect(result).toBe(10);
      return result;
    };
    evaluate("1 plus 1", callback(num1, num2));
  });
});

describe("isEmail", () => {
  test("Receives a string with valid email prefix format and returns true", () => {
    expect.assertions(1);
    const result = isEmail("abc-d@mail.com");
    expect(result).toBe(true);
  });

  test("Receives a string with invalid email prefix format and returns false", () => {
    expect.assertions(1);
    const result = isEmail("abc..def@mail.com");
    expect(result).toBe(false);
  });

  test("Receives a string with valid email domain formats and returns true", () => {
    expect.assertions(1);
    const result = isEmail("abc.def@mail.cc")
    expect(result).toBe(true);
  });

  test("Receives a string with invalid email domain formats and returns false", () => {
    expect.assertions(1);
    const result = isEmail("abc.def@mail#archive.com")
    expect(result).toBe(false);
  });
});