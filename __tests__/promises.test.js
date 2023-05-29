const { sleep } = require("@/promises");

describe("sleep", () => {
  test("sleeps for half a second passing 500", async () => {
    const start = new Date();
    await sleep(500);
    const end = new Date();
    const diff = end.getTime() - start.getTime();
    expect(diff).toBeGreaterThanOrEqual(500);
  });

  test("sleeps for 0.1 seconds passin 100", async () => {
    const start = new Date();
    await sleep(100);
    const end = new Date();
    const diff = end.getTime() - start.getTime();
    expect(diff).toBeGreaterThanOrEqual(100);
  });

  test("sleeps for 1 second without params", async () => {
    const start = new Date();
    await sleep();
    const end = new Date();
    const diff = end.getTime() - start.getTime();
    expect(diff).toBeGreaterThanOrEqual(1000);
  });
});
