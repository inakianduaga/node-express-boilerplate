'use strict';

//Dependencies
var gulp = require('gulp'),
    $ = require('gulp-load-plugins')({
      pattern: ['gulp-*', 'concurrent-transform', 'del', 'q']
    }),
   credentials = require('./aws/config.json'); //AWS credentials

    $.fs = require('fs');
    $.environment = require('./lib/environment.js');
    $.AWS = require('aws-sdk');

/**
 * The base filename used for storing the server package in s3
 */
function getPackageBaseFilename() {
  return $.environment.isProduction() ? 'release_production' : 'release_cidevelop';
}

//---------------
// Tasks
//---------------

gulp.task('zipCodebase', false, function() {

  var packageBaseFilename = getPackageBaseFilename()

  return gulp.src(['**/*', '!node_modules','!node_modules/**/*'])

    //Tar all files into single
    .pipe($.tar(packageBaseFilename + '.tar'))

    //Compress tarball
    .pipe($.gzip())

    //Write file to tmp folder
    .pipe(gulp.dest('.tmp'));

});

gulp.task('publish', 'Packages the entire server codebase into a single zipped-file and pushes it to AWS S3 (environment aware)', ['zipCodebase'], function () {

    var source = '.tmp/'+ getPackageBaseFilename() + '.tar.gz';

    // create a new publisher (uses npm knox as aws client)
    var publisher = $.awspublish.create({
      key: credentials.S3.KEY,
      secret: credentials.S3.SECRET,
      bucket:  credentials.S3.BUCKET.NAME,
      region : credentials.S3.BUCKET.REGION
    });

    return gulp.src(source)

      //Queue parallelized publishing
      .pipe($.concurrentTransform(publisher.publish(null, {
        force : true
      }), 10))

      // print upload updates to console
      .pipe($.awspublish.reporter())

      //Delete temp folder
      .on('end', function() {
        $.del('.tmp');
      });

  }, {
    options: {
      'environment [development]': 'AWS S3 filename will be based on the environment [development|production]'
    }
  }
);

gulp.task('awsOpsworksRedeploy', 'Triggers a redeploy of the running instances using AWS Opsworks', function () {

  var opsworksConfiguration = {
        accessKeyId: credentials.OPSWORKS.KEY,
        secretAccessKey: credentials.OPSWORKS.SECRET,
        region : credentials.OPSWORKS.REGION
      },
      operationParameters = {
        Command: { /* required */
          Name: 'deploy' /* required */
          //Args: {
          //  someKey: [
          //    'STRING_VALUE',
          //    /* more items */
          //  ],
          //  /* anotherKey: ... */
          //}
        },
        StackId: $.environment.isProduction() ? credentials.OPSWORKS.STACK_ID.PRODUCTION : credentials.OPSWORKS.STACK_ID.DEVELOPMENT, /* required */
        Comment: 'Manual cli-triggered deployment'
        //AppId: 'STRING_VALUE',
        //CustomJson: 'STRING_VALUE',
        //InstanceIds: [
        //  'STRING_VALUE',
        //  /* more items */
        //]
      },
      deferred = $.q.defer();

  //Update credentials & region
  $.AWS.config.update(opsworksConfiguration);

  //Instantiate opsworks service
  var opsworks = new $.AWS.OpsWorks();

  opsworks.createDeployment(operationParameters, function(err, data) {
    if (err) {
      console.log(err, err.stack); //error response
      deferred.reject(err);
    } else {
      console.log(data);           // successful response
      deferred.resolve();
    }
  });

  return deferred.promise;

}, {
  options: {
    'environment [development]': 'Enviroment we are redeploying for [development|production]'
  }
});