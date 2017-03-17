# rc-text-tagger
---

React TextTagger Component


[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![gemnasium deps][gemnasium-image]][gemnasium-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]
[![Sauce Test Status](https://saucelabs.com/buildstatus/rc-text-tagger)](https://saucelabs.com/u/rc-text-tagger)

[![Sauce Test Status](https://saucelabs.com/browser-matrix/rc-text-tagger.svg)](https://saucelabs.com/u/rc-text-tagger)

[npm-image]: http://img.shields.io/npm/v/rc-text-tagger.svg?style=flat-square
[npm-url]: http://npmjs.org/package/rc-text-tagger
[travis-image]: https://img.shields.io/travis/react-component/text-tagger.svg?style=flat-square
[travis-url]: https://travis-ci.org/react-component/text-tagger
[coveralls-image]: https://img.shields.io/coveralls/react-component/text-tagger.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/react-component/text-tagger?branch=master
[gemnasium-image]: http://img.shields.io/gemnasium/react-component/text-tagger.svg?style=flat-square
[gemnasium-url]: https://gemnasium.com/react-component/text-tagger
[node-image]: https://img.shields.io/badge/node.js-%3E=_0.10-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/rc-text-tagger.svg?style=flat-square
[download-url]: https://npmjs.org/package/rc-text-tagger


## Browser Support

|![IE](https://raw.github.com/alrra/browser-logos/master/internet-explorer/internet-explorer_48x48.png) | ![Chrome](https://raw.github.com/alrra/browser-logos/master/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/firefox/firefox_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/opera/opera_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/safari/safari_48x48.png)|
| --- | --- | --- | --- | --- |
| IE 8+ ✔ | Chrome 31.0+ ✔ | Firefox 31.0+ ✔ | Opera 30.0+ ✔ | Safari 7.0+ ✔ |

## Screenshots

<img src="" width="288"/>


## Development

```
npm install
npm start
```

## Example

http://localhost:8001/examples/


online example: http://react-component.github.io/text-tagger/


## Feature

* support ie8,ie8+,chrome,firefox,safari


## install


[![rc-text-tagger](https://nodei.co/npm/rc-text-tagger.png)](https://npmjs.org/package/rc-text-tagger)


## Usage

```js
var TextTagger = require('rc-text-tagger');
var React = require('react');
React.render(<TextTagger />, container);
```

## API

### props

<table class="table table-bordered table-striped">
    <thead>
    <tr>
        <th style="width: 100px;">name</th>
        <th style="width: 50px;">type</th>
        <th style="width: 50px;">default</th>
        <th>description</th>
    </tr>
    </thead>
    <tbody>
        <tr>
          <td>className</td>
          <td>String</td>
          <td></td>
          <td>additional css class of root dom node</td>
        </tr>
    </tbody>
</table>


## Test Case

```
npm test
npm run chrome-test
```

## Coverage

```
npm run coverage
```

open coverage/ dir

## License

rc-text-tagger is released under the MIT license.
