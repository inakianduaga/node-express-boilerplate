'use strict';

var gulp = require('gulp'),
  $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'q']
  }),
  environment = require('./lib/environment.js'),
  Jasmine = require('jasmine'),
  jasmine = new Jasmine();


// Configure Jasmine
jasmine.loadConfigFile('src/spec/support/jasmine.json');

gulp.task('jasmineTests', false, ['build'], function () {   
  var deferred = $.q.defer();

  jasmine.onComplete(function (err) {
    return deferred.resolve();
  });
  
  jasmine.execute();
  
  return deferred.promise;
});


// Mocha tests  
gulp.task('mochaTests', false, ['build'], function () {   
  return gulp.src('dist/spec/routes/exampleMochaSpec.js', {read: false})
      // gulp-mocha needs filepaths so you can't have any plugins before it
      .pipe($.mocha({reporter: 'nyan'}));
});

// Main test tasks, choose between mocha or jasmine (or keep both)
gulp.task('test', 'Run unit tests (once)', ['jasmineTests','mochaTests']);
