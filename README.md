# @teteu/utils
[![npm (scoped)](https://img.shields.io/npm/v/@teteu/utils?label=%40teteu%2Futils&style=for-the-badge)](https://www.npmjs.com/package/@teteu/utils)

✨ Library to commonly used cross-projects utilities methods ✨

## Run
```bash
npm install @teteu/utils --save
```

## Usage
```js
const utils = require('@teteu/utils');

utils.random(10, 20); // should return a random number between 10 and 20
```
## Methods Docs
### Arrays
|Method|What It Does|Parameters|Return|Example|
|-|-|-|-|-|
|uniqueElements|returns an array with unique elements|(array)|array with unique elements|[here]()|
|groupBy|receives an array of objects and returns a grouped by object|(array of literal object, key) |object with keys being the values of array[i][key]|[here]()|
|randomizeArray|recieves an array and returns a randomized version of it|(array to randomize)|randomized array|[here]()|
### Promises
|Method|What It Does|Parameters|Return|Example|
|-|-|-|-|-|
|sleep|pretty much sleeps until the specified time passes|(time in milliseconds)|Promise|[here]()|
### Strings
|Method|What It Does|Parameters|Return|Example|
|-|-|-|-|-|
|replaceTokens|replace tokens in a string based on a custom regular expression|(string, tokens and regex)|new string with tokens replaced|[here]()|
|isEmail|validates if the input string is a valid email|(string)|True if the string is a valid email, false otherwise.|[here]()|
### Phone Numbers
|Method|What It Does|Parameters|Return|Example|
|-|-|-|-|-|
|validBrazilianPhoneNumber|Checks if a string phone number has valid brazilian phone number format|(string phone number)|True if the string is a valid brazilian phone number, false otherwise|[here]()|
### Numbers
|Method|What It Does|Parameters|Return|Example|
|-|-|-|-|-|
|random|receives a min and max number and returns a random number between them|(min, max)|random number between min-max|[here]()|
### Date And Time
|Method|What It Does|Parameters|Return|Example|
|-|-|-|-|-|
|getGreeting|Returns a greeting based on the current hour of the day|void|greeting string|[here]()|
|getCurrentDate| Returns the current date in the format "YYYY-MM-DD"|void|current date|[here]()|
|getCurrentTime|Returns the current time in the format "HH:MM:SS"|void|current time|[here]()|
|getDaysBetweenDates|Calculates the number of days between two given dates|(date1, date2)|number of days between the two dates|[here]()|
|formatDateToBrazilianDate|Formats a given date to the Brazilian date format "DD/MM/YYYY"|(date)|formatted date string|[here]()|
### Databases
|Method|What It Does|Parameters|Return|Example|
|-|-|-|-|-|
|sanitize|This method recieves an string input and sanitizes removing all SQL injection|(string to sanitize and optionally an object containing the options for sanitization, check Example for better understanding)|sanitized string|[here]()|
### Calculations
|Method|What It Does|Parameters|Return|Example|
|-|-|-|-|-|
|getDiscountedValue|Calculate the discount amount based on the original price and discount percentage|(price, discount percentage [0 - 100])|discounted value|[here]()|
|applyDiscount|Calculates the discounted price based on the original price and discount percentage|(price, discount percentage)|result of price after discount|[here]()|

### Objects
|Method|What It Does|Parameters|Return|Example|
|-|-|-|-|-|
|deepClone|recieves an object and returns a deep clone of it|(object to clone)|cloned object|[here]()|
|pick|receives an object and an array of keys and returns a new object with only the keys specified|(source object and array of keys to pick from the source object)|new object with only the keys specified|[here]()|
|omit|receives an object and an array of keys and returns a new object without the keys specified|(source object and array of keys to omit from the source object)|new object without the keys specified|[here]()|
|isObject|receives a value and checks if it is a javascript object literal|(value to check)|boolean|[here]()|
## Contribute
Feel free to contribute. Check if we have open issues or request your utility method. Your code here is very welcome 🤝🤝

