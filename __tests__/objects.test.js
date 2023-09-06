const { deepClone, pick } = require("@/objects");

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

describe("pick", () => {
  test("pick some properties from object", () => {
    const obj = { a: 1, b: 2, c: 3 };
    const obj_pick = pick(obj, ['a', 'b']);
    expect(obj_pick).toEqual({ a: 1, b: 2 });
  });

  test("pick all properties from object", () => {
    const obj = { a: 1, b: 2, c: 3 };
    const obj_pick = pick(obj, ['a', 'b', 'c']);
    expect(obj_pick).toEqual({ a: 1, b: 2 , c: 3});
  });

  test("pick anyone properties from object", () => {
    const obj = { a: 1, b: 2, c: 3 };
    const obj_pick = pick(obj, []);
    expect(obj_pick).toEqual({});
  });

  test("pick properties undefined from object", () => {
    const obj = { a: 1, b: 2, c: 3 };
    const obj_pick = pick(obj, ['d']);
    expect(obj_pick).toEqual({});

    const obj_pick_2 = pick(obj, ['a', 'b', 'c', 'd']);
    expect(obj_pick_2).toEqual({ a: 1, b: 2 , c: 3});
  });
});