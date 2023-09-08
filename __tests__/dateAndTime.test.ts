const {
  formatDateToBrazilianDate,
  getDaysBetweenDates,
  getCurrentTime,
  getCurrentDate,
  getGreeting,
} = require("@/dateAndTime");

describe("formatDateToBrazilianDate", () => {
  test("returns a string with the date in the format DD/MM/YYYY", () => {
    const date: Date = new Date("2021/01/01");
    const new_date: string = formatDateToBrazilianDate(date);
    expect(new_date).toBe("01/01/2021");
  });
  test("returns a string with the date in the format DD/MM/YYYY", () => {
    const date: Date = new Date("2021/12/31");
    const new_date: string = formatDateToBrazilianDate(date);
    expect(new_date).toBe("31/12/2021");
  });
  test("returns a string with the date in the format DD/MM/YYYY", () => {
    const date: Date = new Date("2023.09.15");
    const new_date: string = formatDateToBrazilianDate(date);
    expect(new_date).toBe("15/09/2023");
  });
  test("returns a string with the date in the format DD/MM/YYYY", () => {
    const date: Date = new Date("Mar 20, 2023");
    const new_date: string = formatDateToBrazilianDate(date);
    expect(new_date).toBe("20/03/2023");
  });
});

describe("getDaysBetweenDates", () => {
  test("returns the number of days between two dates (1)", () => {
    const date1: Date = new Date("2021/01/01");
    const date2: Date = new Date("2021/01/02");
    const days_between_dates: number = getDaysBetweenDates(date1, date2);
    expect(days_between_dates).toBe(1);
  });
  test("returns the number of days between two dates (2)", () => {
    const date1: Date = new Date("2021/01/01");
    const date2: Date = new Date("2021/01/03");
    const days_between_dates: number = getDaysBetweenDates(date1, date2);
    expect(days_between_dates).toBe(2);
  });
  test("returns the number of days between two dates (7)", () => {
    const date1: Date = new Date("2021/01/01");
    const date2: Date = new Date("2021/01/08");
    const days_between_dates: number = getDaysBetweenDates(date1, date2);
    expect(days_between_dates).toBe(7);
  });
  test("returns the number of days between two dates (30)", () => {
    const date1: Date = new Date("2021/01/01");
    const date2: Date = new Date("2021/01/31");
    const days_between_dates: number = getDaysBetweenDates(date1, date2);
    expect(days_between_dates).toBe(30);
  });
  test("returns the number of days between two dates (365)", () => {
    const date1: Date = new Date("2021/01/01");
    const date2: Date = new Date("2022/01/01");
    const days_between_dates: number = getDaysBetweenDates(date1, date2);
    expect(days_between_dates).toBe(365);
  });
  test("returns the number of days between two dates (1096)", () => {
    const date1: Date = new Date("2020/01/01");
    const date2: Date = new Date("2023/01/01");
    const days_between_dates: number = getDaysBetweenDates(date1, date2);
    expect(days_between_dates).toBe(1096);
  });
});

describe("getCurrentTime", () => {
  test("returns the current time in the format HH:MM:SS", () => {
    const current_time: string = getCurrentTime();
    expect(current_time).toMatch(/\d\d:\d\d:\d\d/);
  });
});

describe("getCurrentDate", () => {
  test("returns the current date in the format YYYY-MM-DD", () => {
    const current_date: string = getCurrentDate();
    expect(current_date).toMatch(/\d\d\d\d-\d\d-\d\d/);
  });
});

describe("getGreeting", () => {
  test("returns 'Good morning' if the time is below", () => {
    const now: Date = new Date();
    const greeting: string = getGreeting();
    if (now.getHours() < 12) {
      expect(greeting).toBe("Good morning!");
    } else if (now.getHours() < 18) {
      expect(greeting).toBe("Good afternoon!");
    } else {
      expect(greeting).toBe("Good evening!");
    }
  });
});
