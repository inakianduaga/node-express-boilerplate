'use strict';

var gulp = require('gulp'),
    events = require('events').EventEmitter,
    notifications = require('./notifications.js'),
    eventEmitter = new events;

module.exports = {

  /**
   * Emits an event with passthrough arguments
   */
  emit : function() {
    eventEmitter.emit.apply(eventEmitter, arguments);
  },

  /**
   * Returns the EventEmitter current instance
   */
  getEmitter : function() {
    return eventEmitter;
  },

  /**
   * Registers an event listener that triggers a notification
   *
   * @param {String} event
   * @param {string} notificationMessage
   * @param {Boolean=} isSuccessful whether the notification is for a successful or failed event
   */
  onEventTriggerSuccessfulNotification : function(event, notificationMessage, isSuccessful) {

    if(typeof isSuccessful === 'undefined') {
      isSuccessful = true;
    }

    eventEmitter.on(event, function() {
      gulp.src('./dist').pipe(notifications.notify(notificationMessage, isSuccessful)());
    });
  }



};
