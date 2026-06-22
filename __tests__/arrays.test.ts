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
  test("splits an array into even chunks", () => {
    const arr: number[] = [1, 2, 3, 4];
    const result: number[][] = chunk(arr, 2);
    expect(result).toEqual([
      [1, 2],
      [3, 4],
    ]);
  });

  test("handles uneven splits, putting remainders in the last chunk", () => {
    const arr: number[] = [1, 2, 3, 4, 5];
    const result: number[][] = chunk(arr, 2);
    expect(result).toEqual([[1, 2], [3, 4], [5]]);
  });

  test("returns an empty array if the input array is empty", () => {
    const arr: any[] = [];
    const result: any[][] = chunk(arr, 2);
    expect(result).toEqual([]);
  });

  test("returns an empty array if size is less than or equal to 0", () => {
    const arr: number[] = [1, 2, 3];
    expect(chunk(arr, 0)).toEqual([]);
    expect(chunk(arr, -1)).toEqual([]);
  });
});
