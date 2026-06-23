const {
  random,
  max,
  maxBy,
  min,
  minBy,
  meanBy,
  mean,
  divideFixed,
  clamp,
  sum,
  sumBy,
} = require("@/numbers");

describe("random", () => {
  test("generates a random number between 0 and 100 with empty parameters", () => {
    expect.assertions(2);
    const result: number = random();
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThanOrEqual(100);
  });

  test("generates a random number between 1 and 10", () => {
    expect.assertions(2);
    const result: number = random(1, 10);
    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThanOrEqual(10);
  });

  test("generates a random number between 100 and 200", () => {
    expect.assertions(2);
    const result: number = random(100, 200);
    expect(result).toBeGreaterThanOrEqual(100);
    expect(result).toBeLessThanOrEqual(200);
  });
});

describe("max", () => {
  test("receives a numeric array and returns the max number", () => {
    const arr = [1, 2, 3, 4, 5];

    const result: number = max(arr);
    expect(result).toBe(5);
  });

  test("receives a numeric array and returns the max number", () => {
    const arr = [1, 2, 3, 4];

    const result: number = max(arr);
    expect(result).not.toBe(3);
    expect(result).toBe(4);
  });

  test("receives a numeric array and returns the max number", () => {
    const arr: number[] = [];

    const result: number = max(arr);
    expect(result).toBeUndefined();
  });
});

describe("maxBy", () => {
  test("receives an array of numbers and a callback and returns the max element", () => {
    const arr = [1, 2, 3, 4, 5];
    const result: number | undefined = maxBy(arr, (item: number) => item);
    expect(result).toBe(5);
  });

  test("receives an array of object and a callback and returns the max element", () => {
    const arr = [
      { name: "Alice", age: 30 },
      { name: "Bob", age: 25 },
      { name: "Charlie", age: 35 },
    ];

    const result = maxBy(arr, (item: any) => item.age);
    expect(result).toStrictEqual({ name: "Charlie", age: 35 });
  });

  test("receives an array with nested object and a callback and returns the max element", () => {
    const arr = [
      { name: "Product A", info: { price: 10.25 } },
      { name: "Product B", info: { price: 50.75 } },
      { name: "Product C", info: { price: 15.25 } },
    ];
    const result = maxBy(arr, (item: any) => item.info.price);
    expect(result).toStrictEqual({ name: "Product B", info: { price: 50.75 } });
  });
});

describe("min", () => {
  test("receives a numeric array and returns the min number", () => {
    const arr = [1, 2, 3, 4, 5];

    const result: number = min(arr);
    expect(result).toBe(1);
  });

  test("receives a numeric array and returns the min number", () => {
    const arr = [4, 2, 3, 1];

    const result: number = min(arr);
    expect(result).not.toBe(2);
    expect(result).toBe(1);
  });

  test("receives a numeric array and returns the min number", () => {
    const arr: number[] = [];

    const result: number = min(arr);
    expect(result).toBeUndefined();
  });
});

describe("minBy", () => {
  test("receives an array of numbers and a callback and returns the min element", () => {
    const arr = [1, 2, 3, 4, 5];
    const result: number | undefined = minBy(arr, (item: number) => item);
    expect(result).toBe(1);
  });

  test("receives an array of object and a callback and returns the min element", () => {
    const arr = [
      { name: "Alice", age: 30 },
      { name: "Bob", age: 25 },
      { name: "Charlie", age: 35 },
    ];

    const result = minBy(arr, (item: any) => item.age);
    expect(result).toStrictEqual({ name: "Bob", age: 25 });
  });

  test("receives an array with nested object and a callback and returns the min element", () => {
    const arr = [
      { name: "Product A", info: { price: 10.25 } },
      { name: "Product B", info: { price: 50.75 } },
      { name: "Product C", info: { price: 15.25 } },
    ];
    const result = minBy(arr, (item: any) => item.info.price);
    expect(result).toStrictEqual({ name: "Product A", info: { price: 10.25 } });
  });
});

describe("mean", () => {
  test("should receive a numeric array and return its avarage", () => {
    const arr = [1, 2, 3, 4];

    const result = mean(arr);

    expect(result).toEqual(2.5);
  });

  test("should receive a numeric array and dont return greater or less than value", () => {
    const arr = [1, 2, 3, 4];

    const result = mean(arr);

    expect(result).not.toBeGreaterThan(2.5);
    expect(result).not.toBeLessThan(2.5);
  });

  test("should return undefined for an empty array", () => {
    const arr: number[] = [];

    const result = mean(arr);

    expect(result).toBeUndefined();
  });
});

describe("divideFixed", () => {
  test("receives a dividend, a divisor and a precision and returns the result of the division with provided precision", () => {
    expect.assertions(1);
    const result: string = divideFixed(10, 3, 2);
    expect(result).toBe("3.33");
  });

  test("receives a dividend, a divisor and a precision and returns the result of the division with provided precision", () => {
    expect.assertions(1);
    const result: string = divideFixed(10, 3, 0);
    expect(result).toBe("3");
  });

  test("receives a dividend, a divisor and a precision and returns the result of the division with provided precision", () => {
    expect.assertions(1);
    const result: string = divideFixed(10, 3, 5);
    expect(result).toBe("3.33333");
  });

  test("receives a dividend, a divisor and a precision and returns the result of the division with provided precision", () => {
    expect.assertions(1);
    const result: string = divideFixed(10, 4, 3);
    expect(result).toBe("2.500");
  });

  test("throws an error if divisor is 0", () => {
    expect.assertions(1);
    expect(() => divideFixed(10, 0, 3)).toThrow(
      "Divisor is not a number or is equal to 0."
    );
  });
});

describe("sum", () => {
  test("receives a numeric array and returns the total of its values", () => {
    const arr = [1, 2, 3];
    const result: number = sum(arr);
    expect(result).toBe(6);
  });

  test("returns 0 for an empty array", () => {
    const arr: number[] = [];
    const result: number = sum(arr);
    expect(result).toBe(0);
  });

  test("handles negative numbers", () => {
    const arr = [10, -4, -1];
    const result: number = sum(arr);
    expect(result).toBe(5);
  });
});

describe("sumBy", () => {
  test("receives an array and a callback and returns the total of the callback values", () => {
    const arr = [{ price: 10 }, { price: 5 }];
    const result: number = sumBy(arr, (item: any) => item.price);
    expect(result).toBe(15);
  });

  test("returns 0 for an empty array", () => {
    const arr: { price: number }[] = [];
    const result: number = sumBy(arr, (item: any) => item.price);
    expect(result).toBe(0);
  });
});

describe("meanBy", () => {
  test("receives an array of numbers and a callback and returns the mean of the values in the array", () => {
    const arr = [1, 2, 3, 4, 5];
    const result: number | undefined = meanBy(arr, (item: number) => item);
    expect(result).toBe(3);
  });

  test("receives an array of object and a callback and returns the mean of the values in the array", () => {
    const arr = [
      { name: "Alice", age: 30 },
      { name: "Bob", age: 25 },
      { name: "Charlie", age: 35 },
    ];

    const result: number | undefined = meanBy(arr, (item: any) => item.age);
    expect(result).toBe(30);
  });

  test("receives an array with nested object and a callback and returns the mean of the values in the array", () => {
    const arr = [
      { name: "Product A", info: { price: 10.25 } },
      { name: "Product B", info: { price: 50.75 } },
      { name: "Product C", info: { price: 15.25 } },
    ];
    const result: number | undefined = meanBy(
      arr,
      (item: any) => item.info.price
    );
    expect(result).toBe(25.416666666666668);
  });

  test("receives an empty array and returns undefined", () => {
    const arr: number[] = [];
    const result: number | undefined = meanBy(arr, (item: number) => item);
    expect(result).toBeUndefined();
  });
});

describe("clamp", () => {
  test("returns the upper bound when the number is above the range", () => {
    expect(clamp(10, 0, 5)).toBe(5);
  });

  test("returns the lower bound when the number is below the range", () => {
    expect(clamp(-2, 0, 5)).toBe(0);
  });

  test("returns the number itself when it is inside the range", () => {
    expect(clamp(3, 0, 5)).toBe(3);
  });

  test("returns the boundary value when the number equals a bound", () => {
    expect(clamp(0, 0, 5)).toBe(0);
    expect(clamp(5, 0, 5)).toBe(5);
  });

  test("normalizes the bounds when lower is greater than upper", () => {
    expect(clamp(10, 5, 0)).toBe(5);
    expect(clamp(-2, 5, 0)).toBe(0);
    expect(clamp(3, 5, 0)).toBe(3);
  });
});
