/**
 * Returns the current timezone offset in minutes.
 * @returns {number}
 */
function getTimezoneOffset(): number {
  return new Date().getTimezoneOffset();
}

/**
 * Returns a greeting based on the current hour of the day.
 * @returns {string}
 */
function getGreeting(): string {
  const currentHour = new Date().getHours();

  if (currentHour < 12) {
    return "Good morning!";
  } else if (currentHour < 18) {
    return "Good afternoon!";
  } else {
    return `Good evening!`;
  }
}

/**
 * Returns the current date in the format "YYYY-MM-DD".
 * @returns {string}
 */
function getCurrentDate(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month =
    String(now.getMonth() + 1).length === 1
      ? "0" + (now.getMonth() + 1)
      : String(now.getMonth() + 1);
  const day =
    String(now.getDate()).length === 1
      ? "0" + now.getDate()
      : String(now.getDate());
  return `${year}-${month}-${day}`;
}

/**
 * Returns the current time in the format "HH:MM:SS".
 * @returns {string}
 */
function getCurrentTime(): string {
  const now = new Date();
  const hours =
    String(now.getHours()).length === 1
      ? "0" + now.getHours()
      : String(now.getHours());
  const minutes =
    String(now.getMinutes()).length === 1
      ? "0" + now.getMinutes()
      : String(now.getMinutes());
  const seconds =
    String(now.getSeconds()).length === 1
      ? "0" + now.getSeconds()
      : String(now.getSeconds());
  return `${hours}:${minutes}:${seconds}`;
}


/**
 * Calculates the number of days between two given dates.
 * @param date1 - The first date.
 * @param date2 - The second date.
 * @returns {number} - The number of days between the two dates.
 */
function getDaysBetweenDates(date1: Date, date2: Date): number {
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const diffInMilliseconds = Math.abs(date2.getTime() - date1.getTime());
  return Math.round(diffInMilliseconds / millisecondsPerDay);
}

export {
  getDaysBetweenDates,
  getCurrentDate,
  getGreeting,
  getTimezoneOffset,
  getCurrentTime,
};
