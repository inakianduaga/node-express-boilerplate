'use strict';

//-- Error handler service

/**
 * Generates a 500 response
 *
 * @param err
 * @param req
 * @param res
 * @param next
 * @param {Boolean=} includeStackTrace Whether to include a stack trace in the generated response
 */
var handler = function(err, req, res, next, includeStackTrace) {

  if (typeof includeStackTrace === 'undefined') {
    includeStackTrace = false;
  }

  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error:   includeStackTrace ? err : {}
  });
};

/**
 * 500 error development response
 *
 * @param err
 * @param req
 * @param res
 * @param next
 */
exports.development = function(err, req, res, next) {
  return handler(err, req, res, next, true);
};

/**
 * 500 error production response
 *
 * @param err
 * @param req
 * @param res
 * @param next
 */
exports.production = function(err, req, res, next) {
  return handler(err, req, res, next, false);
};


