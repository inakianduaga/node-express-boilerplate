#!/bin/bash

# Builds the server and launches a non-daemonized cluster
# This file wouldn't be needed if we could integrate this into the gulp taks but PM2 doesn't seem to support --no-daemon flag programmatically

node ./node_modules/gulp/bin/gulp.js build
pm2 start ./dist/server.js --name nodeExpressBoilerplate "$@" && pm2 logs nodeExpressBoilerplate
