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
|Method|What It Does|Parameters|Return|example|
|-|-|-|-|-|
|uniqueElements|Returns an array with unique elements|(array)|array with unique elements|[here]()|
|groupBy|Receives an array of objects and returns a grouped by object|(array of literal object, key) |object with keys being the values of array[i][key]|[here]()|
### Promises
|Method|What It Does|Parameters|Return|example|
|-|-|-|-|-|
|sleep|pretty much sleeps until the specified time passes|(time in milliseconds)|Promise|[here]()|


## Contribute
Feel free to contribute. Check if we have open issues or request your utility method. Your code here is very welcome 🤝🤝


