'use strict';

let gulp = require('gulp');


// flag to prevent multiple tests firing
let testRunned = false;

gulp.task('tdd', 'Runs unit tests when file changes are detected', () => {
  gulp.watch('dist/**/*.js', {awaitWriteFinish: true}, () => {
    if (testRunned) {return false;}
    testRunned = true;
    gulp.start('testWithoutBuild', () => testRunned = false);
  });
});

/**
 * Watches for ts files
 */
gulp.task('tsWatcher', false, () => {
  gulp.watch(['src/**/*.ts', 'gulp/**/*.ts'], ['lint', 'compile'])
});

/**
 * Watches for non-ts files
 */
gulp.task('nonTsWatcher', false, () => {
  gulp.watch(['src/.env','src/**/*', '!src/**/*.ts'], ['copyNonTs']);
});

/**
 * Combined watcher
 */
gulp.task('watch', 'Master watch task, adds cumulative watches (test/lint)', ['tdd', 'tsWatcher', 'nonTsWatcher'], () => {});

/**
 * Combined watch and server
 */
gulp.task('watchAndServe', 'Launch the server on development mode, autoreloads it when there are code changes, plus registers cumulative watch task', ['serve'], () => {
  gulp.start('watch');
}, {
  options: {
    'port': 'The port # the server should listen to. Defaults to value specified in .env file under PORT, or 3000 if .env not present'
  }
});
