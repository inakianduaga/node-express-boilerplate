'use strict';

/**
 * Basic error handler
 */

module.exports = {

  /**
   * Error handler
   *
   * @param err
   */
  handle : function(err) {
    console.error(err.toString());
    this.emit('end');
  }

};
