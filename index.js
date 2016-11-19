'use strict';

var postscribe = require('postscribe');

var defaults = require('lodash.defaults');

/**
 * Add <script> tag to the end of the <body>, resolve after it executes
 *
 * @param {string} url Script to load (the 'src' attribute of the <script>)
 * @param {object} options Subset of "postscribe" options (ecerything except callbacks is allowed)
 * @returns {Promise} Promise that resolves after script has executed
 */
function postscribeScript(url, options) {
  return new Promise(function (resolve, reject) {
    var scriptElement = document.createElement('script');

    scriptElement.setAttribute('type', 'text/javascript');
    scriptElement.setAttribute('async', 'true');
    scriptElement.setAttribute('src', url);

    var scriptHTML = scriptElement.outerHTML;

    postscribe(document.body, scriptHTML, defaults({
      afterAsync: resolve,
      error: reject
    }, options));
  });
}

module.exports = postscribeScript;