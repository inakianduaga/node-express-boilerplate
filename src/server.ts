'use strict';

// Load environment variables from file if present
import dotenv = require('dotenv');
dotenv.config({
  silent: true,
  path: 'src/.env'
});

// Boot server
import * as debug from 'debug';
import app from './app';

const port = process.env.PORT || 3000;
app.set('port', port);

app.listen(app.get('port'), () => {
  debug('Express server listening on port ' + port);
}).on('error', err => {
  console.log('Cannot start server, port most likely in use');
  console.log(err);
});
