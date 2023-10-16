const { sleep, timeout, race, TimeoutErrors } = require("@/promises");

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

function mockResolvedPromise(value: any, time: number) {
  return new Promise(resolve => setTimeout(() => resolve(value), time));
}

function mockRejectedPromise(error: any, time: number) {
  return new Promise((_, reject) =>
    setTimeout(() => reject(new Error(error)), time)
  );
}

describe("timeout", () => {
  const data = "resolved data";

  test("In case of only resolve", async () => {
    const success = await timeout(mockResolvedPromise(data, 100), 300);
    expect(success).toBe(data);
  });

  test("In case of only rejected", async () => {
    await expect(() =>
      timeout(
        mockRejectedPromise(TimeoutErrors.RESPONSE_ERROR_MESSAGE, 100),
        300
      )
    ).rejects.toThrow(new Error(TimeoutErrors.RESPONSE_ERROR_MESSAGE));
  });

  test("In case of timeout and resolve", async () => {
    await expect(() =>
      timeout(mockResolvedPromise(data, 300), 100)
    ).rejects.toThrow(new Error(TimeoutErrors.TIMEOUT_ERROR_MESSAGE));
  });

  test("In case of timeout and rejected", async () => {
    await expect(() =>
      timeout(
        mockRejectedPromise(TimeoutErrors.RESPONSE_ERROR_MESSAGE, 300),
        100
      )
    ).rejects.toThrow(new Error(TimeoutErrors.TIMEOUT_ERROR_MESSAGE));
  });
});

describe("race", () => {
  const sleepForNTime = (time: number) =>
    new Promise(async resolve => {
      await sleep(time);
      return resolve(time);
    });

  test("should return the first promise as faster", async () => {
    const first = sleepForNTime(500);
    const second = sleepForNTime(1000);
    const third = sleepForNTime(2000);

    const race_winner = await race([
      first,
      second,
      third,
    ]);

    expect(race_winner).toBe(500);
  });

  test("should return the second promise as faster", async () => {
    const first = sleepForNTime(1000);
    const second = sleepForNTime(500);
    const third = sleepForNTime(2000);

    const race_winner = await race([
      first,
      second,
      third,
    ]);

    expect(race_winner).toBe(500);
  });

  test("should return the third promise as faster", async () => {
    const first = sleepForNTime(2000);
    const second = sleepForNTime(1000);
    const third = sleepForNTime(500);

    const race_winner = await race([
      first,
      second,
      third,
    ]);

    expect(race_winner).toBe(500);
  });


});
