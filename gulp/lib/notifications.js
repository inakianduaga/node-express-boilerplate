'use strict';

var $ = require('gulp-load-plugins')({
    pattern: ['gulp-notify', 'lazypipe']
});

/**
 * Notification pipe
 */
module.exports = {

    /**
     * Notification pipe
     *
     * @param {String} title
     * @param {Boolean} whether the notification indicates success or not
     */
    notify: function (title, successful) {

        return $.lazypipe().pipe(function () {
            return $.notify({
                title : title,
                //subtitle: '',
                //message : '',
                icon : successful ? __dirname + '/../icons/pass.png' : __dirname + '/../icons/fail.png'
                }
            );
        });
    }
};
