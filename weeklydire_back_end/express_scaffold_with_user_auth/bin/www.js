#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('../app');
var debug = require('debug')('testserver:server');
var http = require('http');
const https = require('https');
const fs = require('fs');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(
    // process.env.PORT || Google Cloud functions was not playing nice with the injected port.
    '3001'
);

app.set('port', port);
app.set('secPort', port+443); // add second port for https (not used. Other https code commented out while on Google Cloud Platform)

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);


// Commented out section on creting an https server.
// This was made obsolete when deployed on Google Cloud
// Caused trouble, but kept in case I need it for reference later.
/**
 * Create HTTPS server
 */
// const options = {
//     key: fs.readFileSync(__dirname+'/server.key'),
//     cert: fs.readFileSync(__dirname+'/server.cert')
// }

// const secureServer = https.createServer(options, app);

/**
 * Listen on provided port, on all network interfaces.
 * (Commented out, because https is already used through Google Cloud Platform)
 */

//  secureServer.listen(app.get('secPort'), () => {
//     console.log('Server listening on port', app.get('secPort'))
//  });
//  secureServer.on('error', onError);
//  secureServer.on('listening', onListening);


/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

exports.weeklydireexpress = app;