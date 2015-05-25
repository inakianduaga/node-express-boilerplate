'use strict';

// Load environment variables
import dotenv = require('dotenv');
dotenv.load();

// Boot server
import debug = require('debug');
import app = require('./app');

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
}).on('error', function(err) {
  console.log('Cannot start server, port most likely in use');
  console.log(err);
});
