# reg-ex-machina
Regular expressions with timeout. Based on VM

# Install
## Yarn
```sh
yarn add reg-ex-machina
```
## NPM
```sh
npm install reg-ex-machina
```

# Usage
## Common
```js
const { test } = require('reg-ex-machina');

const regexp = /abc$/;
const stringOk = 'abc';
const stringNotOk = 'abcd';

const timeout = 5; //ms

test(regexp, stringOk, timeout); // true
test(regexp, stringNotOk, timeout); // false

const evilRegexp = /(a|a)+$/;
const evilString = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa!';

test(evilRegexp, evilString, timeout); // throws error, because timeout exceeded
```

## test
```js
const { test } = require('reg-ex-machina');
// ...
test(regexp, string, timeout);
```

## exec
```js
const { exec } = require('reg-ex-machina');
// ...
exec(regexp, string, timeout);
```

## search
```js
const { search } = require('reg-ex-machina');
// ...
// reverse order, because search is a method of string
search(string, regexp, timeout);
```

## matchAll
```js
const { matchAll } = require('reg-ex-machina');
// ...
// reverse order, because matchAll is a method of string
matchAll(string, regexp, timeout);
```
