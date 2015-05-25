'use strict';

/**
 * Environment-related methods
 */
var minimist = require('minimist'),
  ARGV = minimist(process.argv), //read cli
  overrides = {};

/**
 * Casts true/false strings into booleans
 *
 * @param value
 * @returns mixed
 */
function cast(value) {
    if (value === "true") {
        return true
    } else if (value === "false") {
        return false;
    } else {
        return value;
    }
}

//Public API
module.exports = {

  /**
   * Retrieves a parameter, with a default fallback
   * If we set the parameter manually, we return the override, otherwise we return the original CLI parameter
   *
   * @param {String} parameter
   * @param {String|Boolean} fallback optional
   */
  get: function(parameter, fallback) {

    if(overrides[parameter]) {
      return overrides[parameter];
    } else if (typeof ARGV[parameter] !== 'undefined'){
      return cast(ARGV[parameter]);
    } else {
      return fallback;
    }
  },

  /**
   * Set an environment value
   * @param parameter
   * @param value
   */
  set: function(parameter, value) {
    overrides[parameter] = value;
  },

  /**
   * Whether the current environment value is production
   *
   * @returns {boolean}
   */
  isProduction : function() {
    return this.get('environment', false) === 'production';
  },

  /**
   * Whether the environment/subenvironment combination are production
   * Used to distinguish between production & "like-production" staging systems
   */
  isRealProduction : function() {
    return this.get('environment', false) === 'production' && this.get('subenvironment', 'production') === 'production';
  }

};
