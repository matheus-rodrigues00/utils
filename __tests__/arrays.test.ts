const {
  uniqueElements,
  groupBy,
  randomizeArray,
  compact,
} = require("@/arrays");

describe("uniqueElements", () => {
  type CallbackFunction = () => void;
  test("returns an array with unique elements", () => {
    const arr: number[] = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5];
    const result: number[] = uniqueElements(arr);
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  test("throws error when the argument is not an array", () => {
    const callback: CallbackFunction = () => uniqueElements("hello");
    expect(callback).toThrow();
  });
});

describe("groupBy", () => {
  interface MockObject {
    id: number;
    name: string;
  }
  interface GroupedByObject {
    [key: string]: MockObject[];
  }

  test("groups an array of objects by a key", () => {
    const arr: MockObject[] = [
      { id: 1, name: "John" },
      { id: 2, name: "Jane" },
      { id: 3, name: "John" },
      { id: 4, name: "Jane" },
    ];
    const result: GroupedByObject = groupBy(arr, "name");
    const expected_response: GroupedByObject = {
      John: [
        { id: 1, name: "John" },
        { id: 3, name: "John" },
      ],
      Jane: [
        { id: 2, name: "Jane" },
        { id: 4, name: "Jane" },
      ],
    };
    expect(result).toEqual(expected_response);
  });
});

describe("randomizeArray", () => {
  test("randomizes an array", () => {
    const arr: number[] = [1, 2, 3, 4, 5];
    const result: number[] = randomizeArray(arr);
    expect(result).toEqual(expect.arrayContaining(arr));
  });
  test("randomizes an array", () => {
    const arr: number[] = Array.from({ length: 1000 }, (_, i) => i + 1);
    const result: number[] = randomizeArray(arr);
    expect(result).not.toEqual(arr);
  });
});

describe("compact", () => {
  test("removes all falsy values from the array", () => {
    const arr = [0, 1, false, 2, "", 3, null, undefined, NaN];
    const result = compact(arr);
    expect(result).toEqual([1, 2, 3]);
  });

  test("removes each falsy value on its own", () => {
    expect(compact([false])).toEqual([]);
    expect(compact([0])).toEqual([]);
    expect(compact([""])).toEqual([]);
    expect(compact([null])).toEqual([]);
    expect(compact([undefined])).toEqual([]);
    expect(compact([NaN])).toEqual([]);
  });

  test("returns an equivalent array when it is already clean", () => {
    const arr = [1, 2, 3, "a", true];
    const result = compact(arr);
    expect(result).toEqual([1, 2, 3, "a", true]);
  });

  test("returns an empty array for an empty array", () => {
    expect(compact([])).toEqual([]);
  });
});
