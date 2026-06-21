const {
  sleep,
  timeout,
  race,
  TimeoutErrors,
  throttle,
  sequence,
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

function mockResolvedPromise(value: any, time: number) {
  return new Promise(resolve => setTimeout(() => resolve(value), time));
}

function mockRejectedPromise(error: any, time: number) {
  return new Promise((_, reject) =>
    setTimeout(() => reject(new Error(error)), time)
  );
}

describe("Throttle", () => {
  test("In case of only resolve", async () => {
    const data = "resolved data";
    const success = await throttle([
      () => mockResolvedPromise(data, 100),
      () => mockResolvedPromise(data, 200),
      () => mockResolvedPromise(data, 300),
    ]);
    expect(success).toEqual([data, data, data]);
  });
  test("In case of one rejected", async () => {
    const data = "resolved data";
    await expect(
      throttle([
        () => mockResolvedPromise(data, 100),
        () => mockRejectedPromise(TimeoutErrors.RESPONSE_ERROR_MESSAGE, 200),
        () => mockResolvedPromise(data, 300),
      ])
    ).rejects.toThrow(TimeoutErrors.RESPONSE_ERROR_MESSAGE);
  });
  test("In case of all rejected", async () => {
    await expect(
      throttle([
        () => mockRejectedPromise(TimeoutErrors.RESPONSE_ERROR_MESSAGE, 200),
        () => mockRejectedPromise(TimeoutErrors.RESPONSE_ERROR_MESSAGE, 200),
        () => mockRejectedPromise(TimeoutErrors.RESPONSE_ERROR_MESSAGE, 200),
      ])
    ).rejects.toThrow(TimeoutErrors.RESPONSE_ERROR_MESSAGE);
  });
});

describe("timeout", () => {
  const data = "resolved data";

  test("In case of only resolve", async () => {
    const success = await timeout(mockResolvedPromise(data, 100), 300);
    expect(success).toBe(data);
  });

  test("In case of only rejected", async () => {
    await expect(
      timeout(
        mockRejectedPromise(TimeoutErrors.RESPONSE_ERROR_MESSAGE, 100),
        300
      )
    ).rejects.toThrow(new Error(TimeoutErrors.RESPONSE_ERROR_MESSAGE));
  });

  test("In case of timeout and resolve", async () => {
    await expect(timeout(mockResolvedPromise(data, 300), 100)).rejects.toThrow(
      new Error(TimeoutErrors.TIMEOUT_ERROR_MESSAGE)
    );
  });

  test("In case of timeout and rejected", async () => {
    await expect(
      timeout(
        mockRejectedPromise(TimeoutErrors.RESPONSE_ERROR_MESSAGE, 300),
        100
      )
    ).rejects.toThrow(new Error(TimeoutErrors.TIMEOUT_ERROR_MESSAGE));
  });
});

describe("race", () => {
  const sleepForNTime = (time: number) => sleep(time).then(() => time);

  test("should return the first promise as faster", async () => {
    const first = sleepForNTime(500);
    const second = sleepForNTime(1000);
    const third = sleepForNTime(2000);

    const race_winner = await race([first, second, third]);

    expect(race_winner).toBe(500);
  });

  test("should return the second promise as faster", async () => {
    const first = sleepForNTime(1000);
    const second = sleepForNTime(500);
    const third = sleepForNTime(2000);

    const race_winner = await race([first, second, third]);

    expect(race_winner).toBe(500);
  });

  test("should return the third promise as faster", async () => {
    const first = sleepForNTime(2000);
    const second = sleepForNTime(1000);
    const third = sleepForNTime(500);

    const race_winner = await race([first, second, third]);

    expect(race_winner).toBe(500);
  });
});

describe("sequence", () => {
  test("executes functions in order and returns results array", async () => {
    const results = await sequence([
      () => mockResolvedPromise("first", 100),
      () => mockResolvedPromise("second", 50),
      () => mockResolvedPromise("third", 10),
    ]);
    expect(results).toEqual(["first", "second", "third"]);
  });

  test("rejects if any function in the sequence rejects", async () => {
    const data = "resolved data";
    await expect(
      sequence([
        () => mockResolvedPromise(data, 50),
        () => mockRejectedPromise("error in middle", 30),
        () => mockResolvedPromise(data, 10),
      ])
    ).rejects.toThrow("error in middle");
  });

  test("works with an empty array", async () => {
    const results = await sequence([]);
    expect(results).toEqual([]);
  });

  test("executes sequentially, not in parallel", async () => {
    const order: number[] = [];
    await sequence([
      async () => {
        await sleep(50);
        order.push(1);
      },
      async () => {
        await sleep(30);
        order.push(2);
      },
      async () => {
        order.push(3);
      },
    ]);
    // Even though the second and third are faster, they must run in order
    expect(order).toEqual([1, 2, 3]);
  });
});
