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
  
gulp.task('test', 'Run unit tests (once)', ['build'], function () {   
  var deferred = $.q.defer();

  jasmine.onComplete(function (err) {
    return deferred.resolve();
  });
  
  jasmine.execute();
  
  return deferred.promise;
});
