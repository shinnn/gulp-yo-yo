# gulp-yo-yo

[![npm version](https://img.shields.io/npm/v/gulp-yo-yo.svg)](https://www.npmjs.com/package/gulp-yo-yo)
[![Build Status](https://travis-ci.org/shinnn/gulp-yo-yo.svg?branch=master)](https://travis-ci.org/shinnn/gulp-yo-yo)
[![Coverage Status](https://coveralls.io/repos/github/shinnn/gulp-yo-yo/badge.svg?branch=master)](https://coveralls.io/github/shinnn/gulp-yo-yo?branch=master)

[gulp](https://github.com/gulpjs/gulp) plugin to transform [yo-yo](https://github.com/maxogden/yo-yo), [bel](https://github.com/shama/bel) or [choo](https://github.com/yoshuawuyts/choo) templates into pure and fast document calls

```javascript
const yo =require('yo-yo');
yo`<div>Yo</div>`;
```

↓

```javascript
const yo = require("yo-yo");
(function () {
  var ac = require('/path/to/project/node_modules/yo-yoify/lib/appendChild.js')
  var bel0 = document.createElement("div")
  ac(bel0, ["Yo"])
  return bel0
}())
```

## Installation

[Use](https://docs.npmjs.com/cli/install) [npm](https://docs.npmjs.com/getting-started/what-is-npm).

```
npm install --save-dev gulp-yo-yo
```

## API

```javascript
const yoYo = require('gulp-yo-yo');
```

### yoYo()

Return: [stream.Transform](https://nodejs.org/api/stream.html#stream_class_stream_transform)

It transforms JavaScript files with [yo-yoify](https://github.com/shama/yo-yoify).

```javascript
const gulp = require('gulp');
const yoYo = require('gulp-yo-yo');

gulp.task('default', () => {
  return gulp.src('src.js')
    .pipe(yoYo())
    .dest('dest');
});
```

## License

[ISC License](./LICENSE) © 2017 Shinnosuke Watanabe
