const { random, max } = require("@/numbers");

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
    let arr = [1, 2, 3, 4, 5];

    const result: number = max(arr);
    expect(result).toBe(5);
  });

  test("receives a numeric array and returns the max number", () => {
    let arr = [1, 2, 3, 4];

    const result: number = max(arr);
    expect(result).not.toBe(3);
    expect(result).toBe(4);
  });

  test("receives a numeric array and returns the max number", () => {
    let arr: number[] = [];

    const result: number = max(arr);
    expect(result).toBeUndefined()
  });
});