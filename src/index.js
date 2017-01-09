
const postscribe = require('postscribe');

const defaults = require('lodash.defaults');


/**
 * Add <script> tag to the given element (or <body>), resolve after it executes
 *
 * @param {HTMLElement|jQuery|string} [element=body] DOM Element, jQuery object, or id selector
 * @param {string} url Script to load (the 'src' attribute of the <script>)
 * @param {object} [options] Subset of "postscribe" options (ecerything except callbacks is allowed)
 * @returns {Promise} Promise that resolves after script has executed
 */
function postscribeScript (...args) {
  let element, url, options;

  if (args.length === 1) {
    [ url ] = args;
  } else if (args.length === 2) {
    if (typeof args[1] === 'string') {
      [ element, url ] = args;
    } else {
      [ url, options ] = args;
    }
  } else {
    [ element, url, options ] = args;
  }

  element = element || document.body;

  return new Promise(function (resolve, reject) {
    const scriptElement = document.createElement('script');

    scriptElement.setAttribute('type', 'text/javascript');
    scriptElement.setAttribute('async', 'true');
    scriptElement.setAttribute('src', url);

    const scriptHTML = scriptElement.outerHTML;

    postscribe(element, scriptHTML, defaults({
      afterAsync: resolve,
      error: reject,
    }, options))
  });
}

module.exports = postscribeScript;
