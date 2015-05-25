'use strict';

/**
 * Example controller that provides a healthcheck endpoint
 */
module Controllers.Example {
  
  /*
   * Return an empty 200 response
   */
  export function healthCheck (req, res) {
    res.end();
  }
  
}

export = Controllers.Example;