/* eslint-env mocha */

window.Promise = require('promise-polyfill');

const chai = require('chai');
const spies = require('chai-spies');
const asPromised = require("chai-as-promised");

chai.use(asPromised);
chai.use(spies);

const { expect } = chai;

const postscribeScript = require('../');


const URL = '../browser/script.js'; // relative to test/browser/index.html
const URL_404 = 'nonexistent.js';


describe('postscribeScript', () => {
  beforeEach(() => {
    delete window.loadedScript;
  })

  it('loads script', () => {
    return expect(postscribeScript(URL).then(() => {
      expect(window.loadedScript).to.be.defined;
    })).to.eventually.be.resolved;
  });

  it('rejects non-existent script', () => {
    return expect(postscribeScript(URL_404)).to.eventually.be.rejected;
  });
});
