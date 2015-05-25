'use strict';

//Dependencies
var gulp = require('gulp'),
    $ = require('gulp-load-plugins')({
      pattern: ['gulp-*']
    }),
    buildSubprocesses = require('./lib/buildSubprocesses');


gulp.task('lint', 'Jshints through the application code', function() {

  return gulp.src(['**/*.js', '!./node_modules', '!./node_modules/**/*', '!./gulp/**/*']).pipe(buildSubprocesses.js.lintJS()());

});