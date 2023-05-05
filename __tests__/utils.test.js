const path = require("path");
const { random } = require(path.resolve(__dirname, "../src/index.ts"));

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
