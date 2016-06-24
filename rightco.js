'use strict';

module.exports = rightco;

const righto = require('righto');

function rightco(starFunc) {
  return new Promise((resolve, reject) => {
    if (!(starFunc instanceof GeneratorFunction)) {
      return reject('must be generator');
    }
    try {
      let iterator = righto.iterate(starFunc);
      iterator((err, result) => {
        if (!err) {
          return resolve(result);
        }
        else {
          return reject(err);
        }
      });
    }
    catch (err) {
      return reject(err);
    }
  });
}

const GeneratorFunction = (function* () {}).constructor;
