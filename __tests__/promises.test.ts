const {
  sleep,
  timeout,
  TIMEOUT_ERROR_MESSAGE,
  RESPONSE_ERROR_MESSAGE,
} = require("@/promises");

describe("sleep", () => {
  test("sleeps for half a second passing 500", async () => {
    const start: Date = new Date();
    await sleep(500);
    const end: Date = new Date();
    const diff: number = end.getTime() - start.getTime();
    expect(diff).toBeGreaterThanOrEqual(499);
  });

  test("sleeps for 0.1 seconds passing 100", async () => {
    const start: Date = new Date();
    await sleep(100);
    const end: Date = new Date();
    const diff: number = end.getTime() - start.getTime();
    expect(diff).toBeGreaterThanOrEqual(99);
  });

  test("sleeps for 1 second without params", async () => {
    const start: Date = new Date();
    await sleep();
    const end: Date = new Date();
    const diff: number = end.getTime() - start.getTime();
    expect(diff).toBeGreaterThanOrEqual(999);
  });
});

describe("timeout", () => {
  const data = "resolved data";

  test("In case of only resolve", async () => {
    const success = await timeout(mockResolvedPromise(data, 100), 300);
    expect(success).toBe(data);
  });

  test("In case of only rejected", async () => {
    await expect(() =>
      timeout(mockRejectedPromise(RESPONSE_ERROR_MESSAGE, 100), 300)
    ).rejects.toThrow(new Error(RESPONSE_ERROR_MESSAGE));
  });

  test("In case of timeout and resolve", async () => {
    await expect(() =>
      timeout(mockResolvedPromise(data, 300), 100)
    ).rejects.toThrow(new Error(TIMEOUT_ERROR_MESSAGE));
  });

  test("In case of timeout and rejected", async () => {
    await expect(() =>
      timeout(mockRejectedPromise(RESPONSE_ERROR_MESSAGE, 300), 100)
    ).rejects.toThrow(new Error(TIMEOUT_ERROR_MESSAGE));
  });
});

function mockResolvedPromise(value: any, time: number) {
  return new Promise(resolve => setTimeout(() => resolve(value), time));
}

function mockRejectedPromise(error: any, time: number) {
  return new Promise((_, reject) =>
    setTimeout(() => reject(new Error(error)), time)
  );
}
