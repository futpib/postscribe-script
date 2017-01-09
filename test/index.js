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

    const writtenElement = document.getElementById('written');
    if (writtenElement) {
      writtenElement.remove();
    }
  });

  it('loads script (with only `url` argument)', () => {
    return expect(postscribeScript(URL).then(() => {
      expect(window.loadedScript).to.be.defined;

      const writtenElement = document.getElementById('written');
      expect(writtenElement).to.be.defined;
      expect(writtenElement.parentElement).to.equal(document.body);
    })).to.eventually.be.fulfilled;
  });

  it('loads script (with `element` and `url` args)', () => {
    return expect(postscribeScript('#write-here', URL).then(() => {
      expect(window.loadedScript).to.be.defined;

      const writtenElement = document.getElementById('written');
      expect(writtenElement).to.be.defined;
      expect(writtenElement.parentElement.id).to.equal('write-here');
    })).to.eventually.be.fulfilled;
  });

  it('loads script (with `url` and `options` args)', () => {
    return expect(postscribeScript(URL, {}).then(() => {
      expect(window.loadedScript).to.be.defined;

      const writtenElement = document.getElementById('written');
      expect(writtenElement).to.be.defined;
      expect(writtenElement.parentElement).to.equal(document.body);
    })).to.eventually.be.fulfilled;
  });

  it('loaded script (3 args)', () => {
    return expect(postscribeScript('#write-here', URL, {}).then(() => {
      expect(window.loadedScript).to.be.defined;

      const writtenElement = document.getElementById('written');
      expect(writtenElement).to.be.defined;
      expect(writtenElement.parentElement.id).to.equal('write-here');
    })).to.eventually.be.fulfilled;
  });

  it('rejects non-existent script', () => {
    return expect(postscribeScript(URL_404)).to.eventually.be.rejected;
  });
});
