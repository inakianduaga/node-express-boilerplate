'use strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')({
        pattern: ['gulp-*']
    }),
    environment = require('./lib/environment.js');

gulp.task('serve', 'Launch the server on development mode, autoreloads it when there are code changes', ['build'], function () {

  var nodemonConfiguration = {
    script: './dist/server.js',
    ext: 'jade js .env', //reload when any of these file extensions changes
    ignore: [],
    env : {
      'NODE_ENV': 'development'
    }
  };

  $.nodemon(nodemonConfiguration)
    //.on('change', ['lint'])
    .on('restart', function () {
      console.log('restarted!')
    });

}, {
  options: {
    'port': 'The port # the server should listen to. Defaults to 3000'
  }
});

