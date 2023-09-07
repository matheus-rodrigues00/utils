const { validBrazilianPhoneNumber } = require("@/phoneNumbers");

describe("validBrazilianPhoneNumber", () => {
  test("validates that a brazilian phone is brazilian phone", () => {
    const result = validBrazilianPhoneNumber("(75) 9 9999-9999");
    expect(result).toBeTruthy();
  });

  test("validates that invalid number size isn't valid brazilian", () => {
    const result = validBrazilianPhoneNumber("55 (75) 99 9999-9999");
    expect(result).toBeFalsy();
  });

  test("validates that empty string isn't valid brazilian", () => {
    const result = validBrazilianPhoneNumber("");
    expect(result).toBeFalsy();
  });

  test("validates that only numbers isn't valid brazilian", () => {
    const result = validBrazilianPhoneNumber("75 9 9999 9999");
    expect(result).toBeTruthy();
  });
});
