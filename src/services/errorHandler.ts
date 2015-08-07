'use strict';

// Error handler service

module Services.ErrorHandler {

  /**
   * Generates a 500 response
   *
   * @param err
   * @param req
   * @param res
   * @param next
   * @param {Boolean=} includeStackTrace Whether to include a stack trace in the generated response
   */
  let handler = (err, req, res, next, includeStackTrace) => {

    if (typeof includeStackTrace === 'undefined') {
      includeStackTrace = false;
    }

    res.status(res.statusCode || 500);
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
  export function development (err, req, res, next) {
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
  export function production (err, req, res, next) {
    return handler(err, req, res, next, false);
  };

}

export = Services.ErrorHandler;
