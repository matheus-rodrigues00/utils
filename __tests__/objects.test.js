const { deepClone, pick, omit } = require("@/objects");

describe("deepClone", () => {
  test("should clone the object and return a new object", () => {
    const obj = { a: 1, b: 2, c: 3 };
    const clone = deepClone(obj);
    expect(clone).toEqual(obj);
  });
  test("should have different references", () => {
    const obj = { a: 1, b: 2, c: 3 };
    const clone = deepClone(obj);
    expect(clone).not.toBe(obj);
  });

  test("should clone nested objects", () => {
    const obj = { a: 1, b: { c: 2, d: 3 } };
    const clone = deepClone(obj);
    expect(clone).toEqual(obj);
    expect(clone.b).not.toBe(obj.b);
    expect(clone).not.toBe(obj);
  });
});

describe("pick", () => {
  test("should return another object with the 'picked' properties", () => {
    const obj = { a: 1, b: 2, c: 3 };
    const obj_pick = pick(obj, ["a", "b"]);
    expect(obj_pick).toEqual({ a: 1, b: 2 });
  });

  test("should return same object in case the properties are the same", () => {
    const obj = { a: 1, b: 2, c: 3 };
    const obj_pick = pick(obj, ["a", "b", "c"]);
    expect(obj_pick).toEqual({ a: 1, b: 2, c: 3 });
  });

  test("should return empty if picks array is empty", () => {
    const obj = { a: 1, b: 2, c: 3 };
    const obj_pick = pick(obj, []);
    expect(obj_pick).toEqual({});
  });

  test("should return empty object in case missing property is given", () => {
    const obj = { a: 1, b: 2, c: 3 };
    const obj_pick = pick(obj, ["d"]);
    expect(obj_pick).toEqual({});
  });

  test("should ignore missing properties and only consider valid properties", () => {
    const obj = { a: 1, b: 2, c: 3 };
    const obj_pick_2 = pick(obj, ["a", "b", "c", "d"]);
    expect(obj_pick_2).toEqual({ a: 1, b: 2, c: 3 });
  });
});

describe("omit", () => {
  test("should return another object without the 'omitted' properties", () => {
    const obj = { a: 1, b: 2, c: 3 };
    const obj_omit = omit(obj, ["a", "b"]);
    expect(obj_omit).toEqual({ c: 3 });
  });

  test("should return empty if omits array is empty", () => {
    const obj = { a: 1, b: 2, c: 3 };
    const obj_omit = omit(obj, []);
    expect(obj_omit).toEqual({ a: 1, b: 2, c: 3 });
  });

  test("should return same object in case the properties are the same", () => {
    const obj = { a: 1, b: 2, c: 3 };
    const obj_omit = omit(obj, ["d"]);
    expect(obj_omit).toEqual({ a: 1, b: 2, c: 3 });
  });

  test("should ignore missing properties and only consider valid properties", () => {
    const obj = { a: 1, b: 2, c: 3 };
    const obj_omit_2 = omit(obj, ["a", "b", "c", "d"]);
    expect(obj_omit_2).toEqual({});
  });
});
