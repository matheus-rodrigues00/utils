const {
  deepClone,
  pick,
  omit,
  isObject,
  get,
  isEmpty,
  deepPick,
} = require("@/objects");

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

  test("should preserve Date instances", () => {
    const date = new Date("2026-01-01T00:00:00.000Z");
    const obj: MockObject = { date };
    const clone: MockObject = deepClone(obj);
    expect(clone.date).toEqual(date);
    expect(clone.date).toBeInstanceOf(Date);
    expect(clone.date).not.toBe(date);
  });

  test("should preserve Map instances", () => {
    const map = new Map<string, number>([["a", 1]]);
    const obj: MockObject = { map };
    const clone: MockObject = deepClone(obj);
    expect(clone.map).toEqual(map);
    expect(clone.map).toBeInstanceOf(Map);
    expect(clone.map).not.toBe(map);
  });

  test("should preserve Set instances", () => {
    const set = new Set([1, 2, 3]);
    const obj: MockObject = { set };
    const clone: MockObject = deepClone(obj);
    expect(clone.set).toEqual(set);
    expect(clone.set).toBeInstanceOf(Set);
    expect(clone.set).not.toBe(set);
  });

  test("should clone circular references", () => {
    const obj: MockObject = { a: 1 };
    obj.self = obj;
    const clone: MockObject = deepClone(obj);
    expect(clone).toEqual(obj);
    expect(clone).not.toBe(obj);
    expect(clone.self).toBe(clone);
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

describe("get", () => {
  const nested_object = {
    a: {
      b: {
        c: 42,
      },
    },
  };

  test("should return the value at a present deep path", () => {
    expect(get(nested_object, "a.b.c")).toBe(42);
  });

  test("should return undefined for a missing path without a default", () => {
    expect(get(nested_object, "a.b.x")).toBeUndefined();
  });

  test("should return the default value for a missing path", () => {
    expect(get(nested_object, "a.b.x", "fallback")).toBe("fallback");
  });

  test("should return the default when the path is missing partway down", () => {
    expect(get({ a: null }, "a.b.c", "fallback")).toBe("fallback");
  });
});

describe("isEmpty", () => {
  test("should return true for null and undefined", () => {
    expect(isEmpty(null)).toBe(true);
    expect(isEmpty(undefined)).toBe(true);
  });

  test("should return true for an empty string", () => {
    expect(isEmpty("")).toBe(true);
  });

  test("should return true for an empty array", () => {
    expect(isEmpty([])).toBe(true);
  });

  test("should return true for an empty plain object", () => {
    expect(isEmpty({})).toBe(true);
  });

  test("should return true for non-collection values (mirroring lodash)", () => {
    expect(isEmpty(0)).toBe(true);
    expect(isEmpty(42)).toBe(true);
    expect(isEmpty(true)).toBe(true);
    expect(isEmpty(false)).toBe(true);
  });

  test("should return false for a non-empty string", () => {
    expect(isEmpty("hello")).toBe(false);
  });

  test("should return false for a non-empty array", () => {
    expect(isEmpty([1, 2])).toBe(false);
  });

  test("should return false for a non-empty plain object", () => {
    expect(isEmpty({ a: 1 })).toBe(false);
  });
});

describe("deepPick", () => {
  interface MockObject {
    [key: string]: any;
  }

  const mock_object: MockObject = {
    a: 1,
    b: 2,
    c: {
      d: 3,
      e: 4,
      f: {
        g: 5,
        h: 6,
      },
    },
  };

  test("should return another object with the nested 'picked' properties", () => {
    const obj_pick: MockObject = deepPick(mock_object, ["a", "c.d", "c.f.g"]);
    expect(obj_pick).toEqual({ a: 1, c: { d: 3, f: { g: 5 } } });
  });

  test("should return same object in case the properties are the same", () => {
    const obj_pick: MockObject = deepPick(mock_object, [
      "a",
      "b",
      "c.d",
      "c.e",
      "c.f.g",
      "c.f.h",
    ]);
    expect(obj_pick).toEqual(mock_object);
  });

  test("should return empty if picks array is empty", () => {
    const obj_pick: MockObject = deepPick(mock_object, []);
    expect(obj_pick).toEqual({});
  });

  test("should return empty object in case a missing property is given", () => {
    const obj_pick: MockObject = deepPick(mock_object, ["d"]);
    expect(obj_pick).toEqual({});
  });

  test("should ignore missing properties and only consider valid properties", () => {
    const obj_pick_2: MockObject = deepPick(mock_object, [
      "a",
      "b",
      "c.d",
      "c.e.f", // invalid property
      "c.f.g",
    ]);
    expect(obj_pick_2).toEqual({ a: 1, b: 2, c: { d: 3, f: { g: 5 } } });
  });
});
