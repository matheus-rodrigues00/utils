const { deepClone } = require("@/objects");

describe("deepClone", () => {
  test("clones an object", () => {
    const obj = { a: 1, b: 2, c: 3 };
    const clone = deepClone(obj);
    expect(clone).toEqual(obj);
  });
  test("test that the clone is a new object", () => {
    const obj = { a: 1, b: 2, c: 3 };
    const clone = deepClone(obj);
    expect(clone).not.toBe(obj);
  });
});