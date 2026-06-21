const { uniqueElements, groupBy, randomizeArray, range } = require("@/arrays");

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

describe("range", () => {
  test("with a single argument counts from 0 up to (but not including) end", () => {
    const result: number[] = range(4);
    expect(result).toEqual([0, 1, 2, 3]);
  });

  test("with two arguments counts from start up to (but not including) end", () => {
    const result: number[] = range(1, 5);
    expect(result).toEqual([1, 2, 3, 4]);
  });

  test("with three arguments counts in increments of step", () => {
    const result: number[] = range(0, 10, 2);
    expect(result).toEqual([0, 2, 4, 6, 8]);
  });

  test("counts downwards when given a negative step", () => {
    const result: number[] = range(0, -4, -1);
    expect(result).toEqual([0, -1, -2, -3]);
  });

  test("returns an empty array when step is 0 to avoid an infinite loop", () => {
    const result: number[] = range(0, 5, 0);
    expect(result).toEqual([]);
  });
});
