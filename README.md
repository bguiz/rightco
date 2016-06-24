# rightco

Wrap `righto` in a `Promise`,
for use as a replacement for `co`.

## Installation

```bash
npm install --save rightco righto
```

Note that `righto` is a peer dependency.

## Usage

```javascript
rightco(function* () {
  let foo = yield something;
  let bar = yield somethingElse;
  return {
    foo,
    bar,
  };
})
.then((result) => {
  // result: { foo, bar, }
})
.catch((err) => {
  // err: any throw or reject within something() or somethingElse()
});
```

Where `something` and `somethingElse` are either:
a *thenable*,
or an *errback*.

As such use `rightco` to run your generator functions,
where you need them to be wrapped in a `Promise`.

### *thenable*s

A `Promise` is a *thenable*.

```javascript
let thenable = new Promise((resolve, reject) => {
  // call either `resolve(result)` for success,
  // or `reject(error)` for failure
});
```

### thenables and errbacks

Any function which has a callback function as its last parameter;
and this callback function takes an error as its first parameter,
and results as subsequent parameters is an *errback*.

```javascript
let errback = function(callback) {
  // call either `callback(undefined, result)` for success,
  // or `callback(error)` for failure
};
```

The latter is the more interesting use case,
as `rightco` enables the use of generator functions to `yield`
a standard *errback* when wrapped with `righto`:

```javascript
yield righto(errback);
```

See the test spec files for detailed usage examples.

### Author

[Brendan Graetz](http://bguiz.com)

### Licence

GPL-3.0
