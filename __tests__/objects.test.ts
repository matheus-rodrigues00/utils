const { deepClone, pick, omit, isObject } = require("@/objects");

describe("deepClone", () => {
  interface MockObject {
    [key: string]: any;
  }

  test("should clone the object and return a new object", () => {
    const obj: MockObject = { a: 1, b: 2, c: 3 };
    const clone: MockObject = deepClone(obj);
    expect(clone).toEqual(obj);
  });

  test("should have different references", () => {
    const obj: MockObject = { a: 1, b: 2, c: 3 };
    const clone: MockObject = deepClone(obj);
    expect(clone).not.toBe(obj);
  });

  test("should clone nested objects", () => {
    const obj: MockObject = { a: 1, b: { c: 2, d: 3 } };
    const clone: MockObject = deepClone(obj);
    expect(clone).toEqual(obj);
    expect(clone.b).not.toBe(obj.b);
    expect(clone).not.toBe(obj);
  });
});

describe("pick", () => {
  interface MockObject {
    [key: string]: any;
  }

  test("should return another object with the 'picked' properties", () => {
    const obj: MockObject = { a: 1, b: 2, c: 3 };
    const obj_pick: MockObject = pick(obj, ["a", "b"]);
    expect(obj_pick).toEqual({ a: 1, b: 2 });
  });

  test("should return same object in case the properties are the same", () => {
    const obj: MockObject = { a: 1, b: 2, c: 3 };
    const obj_pick: MockObject = pick(obj, ["a", "b", "c"]);
    expect(obj_pick).toEqual({ a: 1, b: 2, c: 3 });
  });

  test("should return empty if picks array is empty", () => {
    const obj: MockObject = { a: 1, b: 2, c: 3 };
    const obj_pick: MockObject = pick(obj, []);
    expect(obj_pick).toEqual({});
  });

  test("should return empty object in case a missing property is given", () => {
    const obj: MockObject = { a: 1, b: 2, c: 3 };
    const obj_pick: MockObject = pick(obj, ["d"]);
    expect(obj_pick).toEqual({});
  });

  test("should ignore missing properties and only consider valid properties", () => {
    const obj: MockObject = { a: 1, b: 2, c: 3 };
    const obj_pick_2: MockObject = pick(obj, ["a", "b", "c", "d"]);
    expect(obj_pick_2).toEqual({ a: 1, b: 2, c: 3 });
  });
});

describe("omit", () => {
  interface MockObject {
    [key: string]: any;
  }

  test("should return another object without the 'omitted' properties", () => {
    const obj: MockObject = { a: 1, b: 2, c: 3 };
    const obj_omit: MockObject = omit(obj, ["a", "b"]);
    expect(obj_omit).toEqual({ c: 3 });
  });

  test("should return empty if omits array is empty", () => {
    const obj: MockObject = { a: 1, b: 2, c: 3 };
    const obj_omit: MockObject = omit(obj, []);
    expect(obj_omit).toEqual({ a: 1, b: 2, c: 3 });
  });

  test("should return same object in case the properties are the same", () => {
    const obj: MockObject = { a: 1, b: 2, c: 3 };
    const obj_omit: MockObject = omit(obj, ["d"]);
    expect(obj_omit).toEqual({ a: 1, b: 2, c: 3 });
  });

  test("should ignore missing properties and only consider valid properties", () => {
    const obj: MockObject = { a: 1, b: 2, c: 3 };
    const obj_omit_2: MockObject = omit(obj, ["a", "b", "c", "d"]);
    expect(obj_omit_2).toEqual({});
  });
});

describe("isObject", () => {
  test("should return true if the value is an object literal", () => {
    expect(isObject({})).toBe(true);
    expect(isObject({ a: 1, b: 2 })).toBe(true);
  });

  test("should return false if the value is not an object literal", () => {
    expect(isObject(1)).toBe(false);
    expect(isObject("")).toBe(false);
    expect(isObject([])).toBe(false);
    expect(isObject(null)).toBe(false);
    expect(isObject(undefined)).toBe(false);
    expect(isObject(() => {})).toBe(false);
    expect(isObject(new Date())).toBe(false);
  });
});
