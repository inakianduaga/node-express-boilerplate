'use strict';

//Dependencies
var gulp = require('gulp'),
  $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'del']
  }),
  config = require('./config.json');    


/**
 * Cleans the dist folder
 */
gulp.task('clean', false, function () {
  return $.del(['dist']);
});

/**
 * Lints typescript code
 */
gulp.task('lint', 'Runs a typescript linter on the application code', function () {

  return gulp.src(config.tsLinter.sources)
    .pipe($.tslint(config.tsLinter.options))
    .pipe($.tslint.report(config.tsLinter.reporter));
    
});

/**
 * Compiles typescript app into js
 */
gulp.task('compile', 'Compiles the typescript code into js', ['clean'], function () {

  // Override package version of typescript to use latest compiler version
  var options = { typescript: require('typescript') };

  var tsProject = $.typescript.createProject('tsconfig.json', options),
    tsResult = tsProject.src() // instead of gulp.src(...)  
      .pipe($.typescript(tsProject, undefined, $.typescript.reporter.longReporter()));

  return tsResult.js.pipe(gulp.dest('dist'));
});

