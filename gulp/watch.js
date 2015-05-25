'use strict';

var gulp = require('gulp');

gulp.task('tdd', 'Runs unit tests when file changes are detected', function () {
  gulp.watch('src/**/*.js', ['test']);
});

gulp.task('lintWatcher', false, function () {
  gulp.watch('**/*.ts', ['lint']);
});

gulp.task('assetsWatcher', false, function () {
  gulp.watch(['src/**/*', '!src/**/*.ts'], ['precopy']);
});

gulp.task('watch', 'Master watch task, adds cumulative watches (test/lint)', ['tdd', 'lintWatcher', 'assetsWatcher'], function () {
});

gulp.task('watchAndServe', 'Launch the server on development mode, autoreloads it when there are code changes, plus registers cumulative watch task', ['watch', 'serve'], function(){}, {
  options: {
    'port': 'The port # the server should listen to. Defaults to 3000'
  }
});



