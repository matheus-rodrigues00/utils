const { random, randomizeArray } = require("@/numbers");

describe("random", () => {
  test("generates a random number between 1 and 10", () => {
    const result = random(1, 10);
    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThanOrEqual(10);
  });

  test("generates a random number between 100 and 200", () => {
    const result = random(100, 200);
    expect(result).toBeGreaterThanOrEqual(100);
    expect(result).toBeLessThanOrEqual(200);
  });
});

describe("randomizeArray", () => {
  test("randomizes an array", () => {
    const arr = [1, 2, 3, 4, 5];
    const result = randomizeArray(arr);
    expect(result).toEqual(expect.arrayContaining(arr));
  });
  test("randomizes an array", () => {
    const arr = Array.from({ length: 1000 }, (_, i) => i + 1);
    const result = randomizeArray(arr);
    expect(result).not.toEqual(arr);
  });
});
