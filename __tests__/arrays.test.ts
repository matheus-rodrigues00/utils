const {
  uniqueElements,
  uniqueBy,
  groupBy,
  randomizeArray,
  chunk,
  range,
  compact,
  difference,
  intersection,
  sortBy,
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

describe("uniqueBy", () => {
  interface MockObject {
    id: number;
  }

  test("removes duplicate objects by a keyed property, keeping the first occurrence", () => {
    const arr: MockObject[] = [{ id: 1 }, { id: 2 }, { id: 1 }];
    const result: MockObject[] = uniqueBy(arr, (item: MockObject) => item.id);
    expect(result).toEqual([{ id: 1 }, { id: 2 }]);
  });

  test("removes duplicate primitives", () => {
    const arr: number[] = [1, 2, 2, 3, 1];
    const result: number[] = uniqueBy(arr, (item: number) => item);
    expect(result).toEqual([1, 2, 3]);
  });

  test("returns an empty array when given an empty array", () => {
    const arr: number[] = [];
    const result: number[] = uniqueBy(arr, (item: number) => item);
    expect(result).toEqual([]);
  });
});

describe("intersection", () => {
  test("returns the common values from two arrays", () => {
    const a: number[] = [1, 2, 3, 4];
    const b: number[] = [2, 4, 6];

    const result: number[] = intersection(a, b);

    expect(result).toEqual([2, 4]);
  });

  test("removes duplicate values from the result", () => {
    const a: number[] = [1, 1, 2];
    const b: number[] = [1];

    const result: number[] = intersection(a, b);

    expect(result).toEqual([1]);
  });

  test("returns an empty array when there are no common values", () => {
    const a: number[] = [1, 2];
    const b: number[] = [3, 4];

    const result: number[] = intersection(a, b);

    expect(result).toEqual([]);
  });

  test("returns an empty array when the first array is empty", () => {
    const a: number[] = [];
    const b: number[] = [1, 2, 3];

    const result: number[] = intersection(a, b);

    expect(result).toEqual([]);
  });
});

describe("difference", () => {
  test("returns the values in the first array that are not in the second array", () => {
    const a: number[] = [1, 2, 3, 4];
    const b: number[] = [2, 4, 6];

    const result: number[] = difference(a, b);

    expect(result).toEqual([1, 3]);
  });

  test("removes duplicate values from the result", () => {
    const a: number[] = [1, 1, 2];
    const b: number[] = [2];

    const result: number[] = difference(a, b);

    expect(result).toEqual([1]);
  });

  test("returns an empty array when all values are present in the second array", () => {
    const a: number[] = [1, 2];
    const b: number[] = [1, 2];

    const result: number[] = difference(a, b);

    expect(result).toEqual([]);
  });

  test("returns an empty array when the first array is empty", () => {
    const a: number[] = [];
    const b: number[] = [1, 2];

    const result: number[] = difference(a, b);

    expect(result).toEqual([]);
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

  test("uses Fisher-Yates swaps without mutating the input array", () => {
    const original_random = Math.random;
    const random_values = [0, 0.5, 0.25];
    let random_call_count = 0;

    Math.random = () => random_values[random_call_count++] ?? 0;

    try {
      const arr: number[] = [1, 2, 3, 4];
      const result: number[] = randomizeArray(arr);

      expect(result).toEqual([3, 4, 2, 1]);
      expect(arr).toEqual([1, 2, 3, 4]);
    } finally {
      Math.random = original_random;
    }
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

describe("sortBy", () => {
  interface Person {
    age: number;
  }

  test("sorts an array of objects by a numeric value", () => {
    const arr: Person[] = [{ age: 30 }, { age: 18 }, { age: 25 }];

    const result: Person[] = sortBy(arr, (person: Person) => person.age);

    expect(result).toEqual([{ age: 18 }, { age: 25 }, { age: 30 }]);
  });

  test("sorts an array of strings alphabetically", () => {
    const arr: string[] = ["banana", "apple", "cherry"];

    const result: string[] = sortBy(arr, (fruit: string) => fruit);

    expect(result).toEqual(["apple", "banana", "cherry"]);
  });

  test("returns an already sorted array unchanged", () => {
    const arr: Person[] = [{ age: 18 }, { age: 25 }, { age: 30 }];

    const result: Person[] = sortBy(arr, (person: Person) => person.age);

    expect(result).toEqual([{ age: 18 }, { age: 25 }, { age: 30 }]);
  });

  test("does not mutate the input array", () => {
    const arr: Person[] = [{ age: 30 }, { age: 18 }, { age: 25 }];

    const original: Person[] = [...arr];

    sortBy(arr, (person: Person) => person.age);

    expect(arr).toEqual(original);
  });

  test("keeps the original order of items with an equal value", () => {
    interface NamedPerson extends Person {
      name: string;
    }

    const arr: NamedPerson[] = [
      { name: "John", age: 30 },
      { name: "Jane", age: 18 },
      { name: "Mary", age: 30 },
    ];

    const result: NamedPerson[] = sortBy(
      arr,
      (person: NamedPerson) => person.age
    );

    expect(result).toEqual([
      { name: "Jane", age: 18 },
      { name: "John", age: 30 },
      { name: "Mary", age: 30 },
    ]);
  });

  test("calls the callback once per item on each comparison", () => {
    const arr: Person[] = [{ age: 30 }, { age: 18 }, { age: 25 }];

    let call_count = 0;
    const result: Person[] = sortBy(arr, (person: Person) => {
      call_count++;
      return person.age;
    });

    expect(result).toEqual([{ age: 18 }, { age: 25 }, { age: 30 }]);
    expect(call_count).toBeLessThanOrEqual(2 * (arr.length - 1) * arr.length);
  });

  test("returns an empty array when given an empty array", () => {
    const arr: Person[] = [];

    const result: Person[] = sortBy(arr, (person: Person) => person.age);

    expect(result).toEqual([]);
  });
});
