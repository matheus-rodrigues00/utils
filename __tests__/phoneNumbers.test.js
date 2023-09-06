const { validBrazilianPhoneNumber } = require("@/phoneNumbers");

describe("validBrazilianPhoneNumber", () => {
  test("validate a BR phone is BR phone", () => {
    const result = validBrazilianPhoneNumber("(75) 9 9999-9999");
    expect(result).toBeTruthy();
  });

  test("validate a incorret phone isnot BR phone", () => {
    const result = validBrazilianPhoneNumber("55 (75) 99 9999-9999");
    expect(result).toBeFalsy();
  });
});
