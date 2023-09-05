const {
  formatDateToBrazilianDate,
  getDaysBetweenDates,
  getCurrentTime,
  getCurrentDate,
  getGreeting,
} = require("@/dateAndTime");

describe("formatDateToBrazilianDate", () => {
  test("returns a string with the date in the format DD/MM/YYYY", () => {
    const result = formatDateToBrazilianDate(new Date("2021/01/01"));
    expect(result).toBe("01/01/2021");
  });
  test("returns a string with the date in the format DD/MM/YYYY", () => {
    const result = formatDateToBrazilianDate(new Date("2021/12/31"));
    expect(result).toBe("31/12/2021");
  });
  test("returns a string with the date in the format DD/MM/YYYY", () => {
    const result = formatDateToBrazilianDate(new Date("2023.09.15"));
    expect(result).toBe("15/09/2023");
  });
  test("returns a string with the date in the format DD/MM/YYYY", () => {
    const result = formatDateToBrazilianDate(new Date("Mar 20, 2023"));
    expect(result).toBe("20/03/2023");
  });
});

describe("getDaysBetweenDates", () => {
  test("returns the number of days between two dates (1)", () => {
    const result = getDaysBetweenDates(
      new Date("2021/01/01"),
      new Date("2021/01/02")
    );
    expect(result).toBe(1);
  });
  test("returns the number of days between two dates (2)", () => {
    const result = getDaysBetweenDates(
      new Date("2021/01/01"),
      new Date("2021/01/03")
    );
    expect(result).toBe(2);
  });
  test("returns the number of days between two dates (7)", () => {
    const result = getDaysBetweenDates(
      new Date("2021/01/01"),
      new Date("2021/01/08")
    );
    expect(result).toBe(7);
  });
  test("returns the number of days between two dates (30)", () => {
    const result = getDaysBetweenDates(
      new Date("2021/01/01"),
      new Date("2021/01/31")
    );
    expect(result).toBe(30);
  });
  test("returns the number of days between two dates (365)", () => {
    const result = getDaysBetweenDates(
      new Date("2021/01/01"),
      new Date("2022/01/01")
    );
    expect(result).toBe(365);
  });
  test("returns the number of days between two dates (1096)", () => {
    const result = getDaysBetweenDates(
      new Date("2020/01/01"),
      new Date("2023/01/01")
    );
    expect(result).toBe(1096);
  });
});

describe("getCurrentTime", () => {
  test("returns the current time in the format HH:MM:SS", () => {
    const result = getCurrentTime();
    expect(result).toMatch(/\d\d:\d\d:\d\d/);
  });
});

describe("getCurrentDate", () => {
  test("returns the current date in the format YYYY-MM-DD", () => {
    const result = getCurrentDate();
    expect(result).toMatch(/\d\d\d\d-\d\d-\d\d/);
  });
});

describe("getGreeting", () => {
  test("returns 'Good morning' if the time is below", () => {
    const now = new Date();
    const result = getGreeting();
    if (now.getHours() < 12) {
      expect(result).toBe("Good morning!");
    } else if (now.getHours() < 18) {
      expect(result).toBe("Good afternoon!");
    } else {
      expect(result).toBe("Good evening!");
    }
  });
});
