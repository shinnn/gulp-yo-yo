'use strict';

const inspect = require('util').inspect;

const isVinyl = require('vinyl').isVinyl;
const PluginError = require('gulp-util/lib/PluginError');
const Transform = require('stream').Transform;
const yoYoify = require('yo-yoify');

module.exports = function gulpYoYo() {
  return new Transform({
    objectMode: true,
    transform(file, enc, cb) {
      if (!isVinyl(file)) {
        cb(new PluginError('gulp-yo-yo', new TypeError(`${
          inspect(file)
        } is not a Vinyl file. Expected a Vinyl file object of a JavaScript file.`)));
        return;
      }

      if (file.isNull()) {
        cb(null, file);
        return;
      }

      if (file.isStream()) {
        cb(new PluginError('gulp-yo-yo', 'Streaming not supported'));
        return;
      }

      yoYoify(file.path)
      .on('data', buf => {
        file.contents = buf;
        cb(null, file);
      })
      .on('error', err => {
        const option = {};

        if (file.path) {
          option.fileName = file.path;
        }

        cb(new PluginError('gulp-yo-yo', err, option));
      })
      .end(file.contents);
    }
  });
};
