'use strict';

//Dependencies
var gulp = require('gulp'),
  $ = require('gulp-load-plugins')({
    pattern: ['gulp-*']
  });    

gulp.task('lint', 'Runs a typescript linter on the application code', function() {

  var options = {
      configuration: {},
      rulesDirectory: null,
      emitError: true,
      reportLimit: 0
  };
  
  var sources = [
    './src/**/*.ts',
    './gulp/**/*.ts'
  ];
  
  return gulp.src(sources)
    .pipe($.tslint(options))
    .pipe($.tslint.report('prose')); 

});