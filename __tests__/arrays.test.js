const { uniqueElements, groupBy } = require("@/arrays");

describe("uniqueElements", () => {
  test("returns an array with unique elements", () => {
    const arr = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5];
    const result = uniqueElements(arr);
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  test("throws error when the argument is not an array", () => {
    expect(() => uniqueElements("hello")).toThrow();
  });
});

describe("groupBy", () => {
  test("groups an array of objects by a key", () => {
    const arr = [
      { id: 1, name: "John" },
      { id: 2, name: "Jane" },
      { id: 3, name: "John" },
      { id: 4, name: "Jane" },
    ];
    const result = groupBy(arr, "name");
    expect(result).toEqual({
      John: [
        { id: 1, name: "John" },
        { id: 3, name: "John" },
      ],
      Jane: [
        { id: 2, name: "Jane" },
        { id: 4, name: "Jane" },
      ],
    });
  });
});
