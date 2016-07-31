'use strict';


let gulp = require('gulp'),
  $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'q', 'run-sequence', 'del']
  }),
  environment = require('./lib/environment.js'),
  Jasmine = require('jasmine'),
  jasmine = new Jasmine();


// Configure Jasmine
jasmine.loadConfigFile('src/spec/support/jasmine.json');

gulp.task('jasmineTests', false, () => {
  let deferred = $.q.defer();

  jasmine.onComplete(function (err) {
    return deferred.resolve();
  });

  jasmine.execute();

  return deferred.promise;
});


// Mocha tests
gulp.task('mochaTests', false, () => {

  let reporter = environment.get('reporter', 'progress');

  return gulp.src('dist/spec/routes/exampleMochaSpec.js', {read: false})
      // gulp-mocha needs filepaths so you can't have any plugins before it
    .pipe($.mocha({ reporter: reporter }))
    .pipe(gulp.dest('coverage'));
});

// Code coverage report
gulp.task('testCoverage', 'Generate a test coverage report (for mocha tests only)', () =>
  $.runSequence(['build', 'cleanCoverage'], 'copyNonTs', () =>
    gulp.src('dist/**/*.js')
        .pipe($.istanbul())
        .pipe($.istanbul.hookRequire())
        .on('finish', function () {
          gulp.src('dist/spec/routes/exampleMochaSpec.js')
            .pipe($.mocha({ reporter: 'spec' }))
            .pipe($.istanbul.writeReports({
              dir: './coverage',
              reporters: ['lcov'],
              reportOpts: { dir: './coverage'}
              })
            );
        })
    )
);

// Submit generated code coverage information to coveralls
gulp.task('coveralls', 'Submit generated code coverage information to coveralls (works only under travis ci environment)', ['testCoverage'], () => {
  gulp.src('coverage/**/lcov.info')
      .pipe($.coveralls());
});


// Cleans the coverage folder
gulp.task('cleanCoverage', false, () => $.del(['coverage']));

// Main test tasks, choose between mocha or jasmine (or keep both)
gulp.task('test', 'Run unit tests (once)', ['build'], () => {
  gulp.start('jasmineTests','mochaTests');
});
gulp.task('testWithoutBuild', 'Run unit tests(once) without building application', ['jasmineTests','mochaTests'])
