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
 * Create typescript project build reference for incremental compilation under watch tasks
 * 
 * @link https://github.com/ivogabe/gulp-typescript
 */
var tsProject = $.typescript.createProject('tsconfig.json', {
  // Override package version of typescript to use latest compiler version
  typescript: require('typescript')
});


/**
 * Compiles typescript app into js
 */
gulp.task('build', 'Compiles the typescript code into js', ['precopy'], function () {

  var tsResult = tsProject.src() // instead of gulp.src(...)  
      .pipe($.typescript(tsProject, undefined, $.typescript.reporter.longReporter()));

  return tsResult.js
    // Strip '/src' prefix from path
    .pipe($.rename(function (path) {
      path.dirname = path.dirname.substring('src'.length);
    }))  
    .pipe(gulp.dest('dist'));
});


/**
 * Precopies all non-ts files into the dist folder
 */
gulp.task('precopy', ['clean'], function () {
  return gulp.src(['src/**/*', '!src/**/*.ts'])
    .pipe(gulp.dest('dist'));
})
