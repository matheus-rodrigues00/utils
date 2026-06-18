# @teteu/utils
[![npm (scoped)](https://img.shields.io/npm/v/@teteu/utils?label=%40teteu%2Futils&style=for-the-badge)](https://www.npmjs.com/package/@teteu/utils)
[![dependencies](https://img.shields.io/badge/dependencies-0-brightgreen?style=for-the-badge)](https://www.npmjs.com/package/@teteu/utils)

✨ Zero-dependency library of commonly used cross-project utility methods ✨

🪶 **Zero runtime dependencies** — nothing but the standard library.

## Run
```bash
npm install @teteu/utils --save
# or
bun add @teteu/utils
```

## Usage
```js
const utils = require('@teteu/utils');

utils.random(10, 20); // should return a random number between 10 and 20
```

## Development
This project uses [Bun](https://bun.sh) as its primary runtime, [Biome](https://biomejs.dev) for linting/formatting, and TypeScript (the package is still published as CommonJS for npm consumers).

```bash
bun install          # install dependencies
bun test             # run the test suite
bun run test:watch   # run tests in watch mode
bun run lint         # lint + format (writes fixes)
bun run check        # lint + format check (no writes, used in CI)
bun run typecheck    # tsc --noEmit
bun run compile-files # build to dist/
```

## Contribute
Feel free to contribute. Check if we have open issues or request your utility method. Your code here is very welcome 🤝🤝

## Methods Docs
### Arrays
|Method|What It Does|Parameters|Return|
|-|-|-|-|
|uniqueElements|returns an array with unique elements|(array)|array with unique elements|
|groupBy|receives an array of objects and returns a grouped by object|(array of literal object, key) |object with keys being the values of array[i][key]|
|randomizeArray|recieves an array and returns a randomized version of it|(array to randomize)|randomized array|
### Promises
|Method|What It Does|Parameters|Return|
|-|-|-|-|
|sleep|pretty much sleeps until the specified time passes|(time in milliseconds)|Promise|
|throttle|runs an array of promise-returning functions, capping how many run at once|(array of functions returning promises, max concurrency = Infinity)|Promise of the array of results|
|timeout|rejects with a Timeout Error if the promise does not settle within the given time|(promise, time in milliseconds = 8000)|the resolved value, or rejects with a Timeout Error|
|race|races the given promises against each other|(array of promises)|the first promise to settle|
### Strings
|Method|What It Does|Parameters|Return|
|-|-|-|-|
|replaceTokens|replace tokens in a string based on a custom regular expression|(string, tokens and regex)|new string with tokens replaced|
|isEmail|validates if the input string is a valid email|(string)|True if the string is a valid email, false otherwise.|
|truncate|shortens a string to a maximum length and appends an omission indicator when it gets cut|(string, length, omission = "…")|the original string when it fits, otherwise the truncated string with the omission appended|
### Phone Numbers
|Method|What It Does|Parameters|Return|
|-|-|-|-|
|validBrazilianPhoneNumber|Checks if a string phone number has valid brazilian phone number format|(string phone number)|True if the string is a valid brazilian phone number, false otherwise|
### Numbers
|Method|What It Does|Parameters|Return|
|-|-|-|-|
|random|receives a min and max number and returns a random number between them|(min, max)|random number between min-max|
|mean|receives a numeric array and returns its average|(arr)|the average|
|max|receives an array of numbers and returns the biggest number|(arr of numbers)|the biggest number or undefined|
|maxBy|receives an array and finds the maximum element in an array based on a provided callback function|(array, callback)|element with maximum value in array based on callback function|
|divideFixed|receives a number, divisor and precision and returns the result of the division with provided precision|(dividend, divisor, precision)|result of the division with provided precision|
|meanBy|receives an array and returns the mean of value given by callback function|(array, callback)|The mean of the values given by callback function from the array|
|clamp|constrains a number to be within an inclusive [lower, upper] range, swapping the bounds if lower > upper|(number, lower, upper)|the number constrained to the [lower, upper] range|
### Date And Time
|Method|What It Does|Parameters|Return|
|-|-|-|-|
|getGreeting|Returns a greeting based on the current hour of the day|void|greeting string|
|getCurrentDate| Returns the current date in the format "YYYY-MM-DD"|void|current date|
|getCurrentTime|Returns the current time in the format "HH:MM:SS"|void|current time|
|getDaysBetweenDates|Calculates the number of days between two given dates|(date1, date2)|number of days between the two dates|
|formatDateToBrazilianDate|Formats a given date to the Brazilian date format "DD/MM/YYYY"|(date)|formatted date string|
### Databases
|Method|What It Does|Parameters|Return|
|-|-|-|-|
|sanitize|This method recieves an string input and sanitizes removing all SQL injection|(string to sanitize and optionally an object containing the options for sanitization)|sanitized string|
### Calculations
|Method|What It Does|Parameters|Return|
|-|-|-|-|
|getDiscountedValue|Calculate the discount amount based on the original price and discount percentage|(price, discount percentage [0 - 100])|discounted value|
|applyDiscount|Calculates the discounted price based on the original price and discount percentage|(price, discount percentage)|result of price after discount|

### Objects
|Method|What It Does|Parameters|Return|
|-|-|-|-|
|deepClone|recieves an object and returns a deep clone of it|(object to clone)|cloned object|
|pick|receives an object and an array of keys and returns a new object with only the keys specified|(source object and array of keys to pick from the source object)|new object with only the keys specified|
|omit|receives an object and an array of keys and returns a new object without the keys specified|(source object and array of keys to omit from the source object)|new object without the keys specified|
|isObject|receives a value and checks if it is a javascript object literal|(value to check)|boolean|
|isEmpty|receives a value and checks if it is empty (null, undefined, empty string/array, or plain object with no keys); non-collection values are treated as empty|(value to check)|boolean|
|deepPick| receives an object with nested properties and an array of keys and returns a new object with only the keys specified.|(source object and array of keys)|new object with only the keys specified|

