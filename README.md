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
  let foo = yield something();
  let bar = yield somethingElse();
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

### Author

[Brendan Graetz](http://bguiz.com)

### Licence

GPL-3.0
