'use strict';

const path = require('path');
const {PassThrough} = require('stream');

const File = require('vinyl');
const test = require('tape');
const yoYo = require('.');

const expected = `const yo = require(\'yo-yo\');(function () {
      
      var ac = require(\'${require.resolve('yo-yoify/lib/appendChild.js')}\')\n      var bel0 = document.createElement("div")
      return bel0
    }())`;

test('gulp-yo-yo', t => {
  t.plan(7);

  yoYo()
  .on('error', t.fail)
  .on('data', file => {
    t.deepEqual(file, new File(), 'should read null file as it is.');
  })
  .end(new File());

  yoYo()
  .on('error', t.fail)
  .on('data', file => {
    t.strictEqual(
      file.contents.toString(),
      expected,
      'should transform yo-yo templates to pure function calls.'
    );
  })
  .end(new File({
    contents: Buffer.from('const yo = require(\'yo-yo\');yo`<div />`')
  }));

  yoYo()
  .on('error', err => {
    t.strictEqual(
      err.message,
      'Unexpected token (1:1)',
      'should emit an error when it cannot parse the file.'
    );
    t.notOk(
      'fileName' in err,
      'should not include `fileName` property to the error when the object doesn\'t have filename.'
    );
  })
  .end(new File({contents: Buffer.from('`')}));

  yoYo()
  .on('error', err => {
    t.strictEqual(
      err.fileName,
      path.resolve('tmp.js'),
      'should include `fileName` property to the error when the object have filename.'
    );
  })
  .end(new File({
    path: path.resolve('tmp.js'),
    contents: Buffer.from('*')
  }));

  yoYo()
  .on('error', err => {
    t.strictEqual(
      err.message,
      'Streaming not supported',
      'should emit an error when it takes a stream-mode file.'
    );
  })
  .end(new File({contents: new PassThrough()}));

  yoYo()
  .on('error', err => {
    t.strictEqual(
      err.message,
      '[ \'foo\' ] is not a Vinyl file. Expected a Vinyl file object of a JavaScript file.',
      'should emit an error when it takes a non-Vinyl object.'
    );
  })
  .end(['foo']);
});
