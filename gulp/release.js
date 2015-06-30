'use strict';

//Dependencies
var gulp = require('gulp'),
  $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'concurrent-transform', 'del', 'q']
  });
  $.fs = require('fs');
  $.environment = require('./lib/environment.js');  

//CLI parameters
var VERSION_TYPE = $.environment.get('version', 'minor');

/**
 * Reads the package.json file
 * `fs` is used instead of require to prevent caching in watch (require caches)
 * @returns {json}
 */
function getPackageJson() {
  return JSON.parse($.fs.readFileSync('./package.json', 'utf-8'));
}

gulp.task('bump', false, ['lint', 'test'], function() {

  return gulp.src(['./package.json', './bower.json'])
    .pipe($.bump({ type: VERSION_TYPE}))
    .pipe(gulp.dest('./'));

});

gulp.task('commit', false, ['bump'], function() {

  var pkg = getPackageJson();
  var v = 'v' + pkg.version;
  var message = 'Release ' + v;

  return gulp.src('./')
    .pipe($.git.add())
    .pipe($.git.commit(message));

});

gulp.task('release', 'Bumps package version, tags release & pushes the current branch to the origin repo', ['commit'], function () {

  var pkg = getPackageJson();
  var v = 'v' + pkg.version;
  var message = 'Release ' + v;

  $.git.tag(v, message, function(err){
    if (err) throw err;
  });

  $.git.push('origin', 'HEAD', { args: ' --tags' }, function (err) {
    if (err) throw err;
  });

}, {
  options: {
    'version [minor]': 'The semantic version type for this release [patch|minor|major]. See http://semver.org/ for information.'
  }
});


gulp.task('package', 'Builds and zips the application', ['build'], function () {

  return gulp.src(['dist/**/*'])

    //Tar all files into single
    .pipe($.tar('release.tar'))

    //Compress tarball
    .pipe($.gzip())

    //Write file to tmp folder
    .pipe(gulp.dest('tmp'));
});
