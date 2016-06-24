'use strict';

const chai = require('chai');

const expect = chai.expect;

describe('[rightco]', () => {

  const rightco = require('../../rightco.js');

  describe('[star function]', () => {

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

  });

  describe('[thenable]', () => {

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

    it('should resolve', (done) => {
      rightco(function* yieldThenablesAndResolve() {
          let result = yield thenableWhichResolves;
          result = yield thenableWhichResolves;
          return result;
        })
        .then((result) => {
          expect(result).to.equal('yay');
          done();
        })
        .catch((err) => {
          done('Was not supposed to reject');
        });
    });

    it('should reject', (done) => {
      rightco(function* yieldThenablesAndReject() {
          let result = yield thenableWhichResolves;
          result = yield thenableWhichRejects;
          return result;
        })
        .then((result) => {
          done('Was not supposed to resolve');
        })
        .catch((err) => {
          expect(err).to.equal('on purpose');
          done();
        });
    });

  });

  describe('[errback]', () => {

    const righto = require('righto');

    function errbackWhichBacks(callback) {
      callback(undefined, 'yay');
    }

    function errbackWhichErrs(callback) {
      callback('on purpose');
    }

    it('should resolve', (done) => {
      rightco(function* yieldErrbacksAndResolve() {
          let result = yield righto(errbackWhichBacks);
          result = yield righto(errbackWhichBacks);
          return result;
        })
        .then((result) => {
          expect(result).to.equal('yay');
          done();
        })
        .catch((err) => {
          done('Was not supposed to reject');
        });
    });

    it('should reject', (done) => {
      rightco(function* yieldErrbacksAndReject() {
          let result = yield righto(errbackWhichBacks);
          result = yield righto(errbackWhichErrs);
          return result;
        })
        .then((result) => {
          done('Was not supposed to resolve');
        })
        .catch((err) => {
          expect(err).to.equal('on purpose');
          done();
        });
    });

  });

});
