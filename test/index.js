'use strict';

/* eslint-env mocha */

window.Promise = require('promise-polyfill');

var chai = require('chai');
var spies = require('chai-spies');
var asPromised = require("chai-as-promised");

chai.use(asPromised);
chai.use(spies);

var expect = chai.expect;


var postscribeScript = require('../');

var URL = '../browser/script.js'; // relative to test/browser/index.html
var URL_404 = 'nonexistent.js';

describe('postscribeScript', function () {
  beforeEach(function () {
    delete window.loadedScript;
  });

  it('loads script', function () {
    return expect(postscribeScript(URL).then(function () {
      expect(window.loadedScript).to.be.defined;
    })).to.eventually.be.resolved;
  });

  it('rejects non-existent script', function () {
    return expect(postscribeScript(URL_404)).to.eventually.be.rejected;
  });
});