'use strict';

var gulp = require('gulp');

gulp.task('tdd', 'Runs unit tests when file changes are detected', function () {
  gulp.watch('src/**/*.js', ['test']);
});

/**
 * Watches for ts files
 */
gulp.task('tsWatcher', false, function () {
  gulp.watch('**/*.ts', ['lint', 'compile']);
});

/**
 * Watches for non-ts files
 */
gulp.task('nonTsWatcher', false, function () {
  gulp.watch(['src/**/*', '!src/**/*.ts'], ['copyNonTs']);
});

/**
 * Combined watcher
 */
gulp.task('watch', 'Master watch task, adds cumulative watches (test/lint)', ['tdd', 'tsWatcher', 'nonTsWatcher'], function () {
});

/**
 * Combined watch and server
 */
gulp.task('watchAndServe', 'Launch the server on development mode, autoreloads it when there are code changes, plus registers cumulative watch task', ['watch', 'serve'], function(){}, {
  options: {
    'port': 'The port # the server should listen to. Defaults to 3000'
  }
});



