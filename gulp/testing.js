'use strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')({
      pattern: ['gulp-*', 'jasmine-node']
    }),
    environment = require('./lib/environment.js');


gulp.task('test', 'Run unit tests (once)', function () {

  return $.jasmineNode.run({specFolders:['./dist/spec']});

});


