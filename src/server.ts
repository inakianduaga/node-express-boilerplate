'use strict';

// Load environment variables from file if present
import dotenv = require('dotenv');
dotenv.load({
  silent: true,
  path: 'src/.env'
});

// Boot server
import debug = require('debug');
import app = require('./app');

var port = process.env.PORT || 3000;
app.set('port', port);

app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + port);
}).on('error', function(err) {
  console.log('Cannot start server, port most likely in use');
  console.log(err);
});
