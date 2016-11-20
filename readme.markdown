
# postscribe-script

[![Build Status](https://travis-ci.org/futpib/postscribe-script.svg?branch=master)](https://travis-ci.org/futpib/postscribe-script)

Asynchronously add `script` tags with [krux/postscribe](https://github.com/krux/postscribe).
Returns a Promise that is resolved after script executes.

Useful with browserify/webpack.

## Usage

```js
const postscribeScript = require('postscribe-script');

// load jQuery dynamically
postscribeScript('https://code.jquery.com/jquery-git.min.js').then(() => {
  // script was loaded and evaluated, we can use whatever it exports
  $('body').fadeIn();
});

// something more realistic
postscribeScript('https://api-maps.yandex.ru/2.1/')
  .then(() => ymaps.ready())
  .then(() => {
    const map = new ymaps.Map('map', {
      center: [55.751574, 37.573856],
      zoom: 9
    });
  });

```

## Install

With [npm](https://www.npmjs.com/) do:

```
npm install postscribe-script
```

You will also need a Promise/A+ polyfill if you want to support older browsers.
One of them is [taylorhakes/promise-polyfill](https://github.com/taylorhakes/promise-polyfill) (recommended by [github/fetch](https://github.com/github/fetch)).
Personally I like [core-js](https://github.com/zloirock/core-js), it has everything ES6 and more.
