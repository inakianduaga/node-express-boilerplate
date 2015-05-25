'use strict';

/**
 * Miscellaneous controller
 */
module.exports = {

  /*
   * Return an empty 200 response
   */
  healthCheck: function (req, res) {
    res.end();
  }

};
