const { uniqueElements, groupBy, randomizeArray, chunk } = require("@/arrays");

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

describe("chunk", () => {
  test("splits an array into even groups", () => {
    const result: number[][] = chunk([1, 2, 3, 4], 2);
    expect(result).toEqual([
      [1, 2],
      [3, 4],
    ]);
  });

  test("puts the leftover elements in the final group on an uneven split", () => {
    const result: number[][] = chunk([1, 2, 3, 4, 5], 2);
    expect(result).toEqual([[1, 2], [3, 4], [5]]);
  });

  test("returns a single group when size is greater than the array length", () => {
    const result: string[][] = chunk(["a", "b", "c"], 3);
    expect(result).toEqual([["a", "b", "c"]]);
  });

  test("returns an empty array for an empty input", () => {
    const result: number[][] = chunk([], 2);
    expect(result).toEqual([]);
  });

  test("returns an empty array when size is less than 1", () => {
    expect(chunk([1, 2, 3], 0)).toEqual([]);
    expect(chunk([1, 2, 3], -2)).toEqual([]);
  });
});
