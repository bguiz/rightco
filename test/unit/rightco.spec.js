'use strict';

const chai = require('chai');

const expect = chai.expect;

describe('[rightco]', () => {

  it('should not run when not iterable', (done) => {
    rightco(function() {})
      .then((result) => {
        expect(result).to.be.undefined;
        done(true);
      })
      .catch((err) => {
        console.log('catch', err);
        done();
      });
  });

  it('should resolve thenables', (done) => {
    rightco(yieldThenablesAndResolve)
      .then((result) => {
        expect(result).to.equal('yay');
        done();
      })
      .catch((err) => {
        done(true);
      });
  });

  it('should reject thenables', (done) => {
    rightco(yieldThenablesAndReject)
      .then((result) => {
        done(true);
      })
      .catch((err) => {
        expect(err).to.equal('on purpose');
        done();
      });
  });

});

/*** Stuff to test ***/

const rightco = require('../../rightco.js');

let thenableWhichResolves = {
  then (resolve) {
    resolve('yay');
  },
};

let thenableWhichRejects = {
  then (resolve, reject) {
    reject('on purpose');
  },
};

function* yieldThenablesAndResolve() {
  let result = yield thenableWhichResolves;
  result = yield thenableWhichResolves;
  return result;
}

function* yieldThenablesAndReject() {
  let result = yield thenableWhichResolves;
  result = yield thenableWhichRejects;
  return result;
}
