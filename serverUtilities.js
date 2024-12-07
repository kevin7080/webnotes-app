// debug exposes a function; pass this function the name of your module,
// and it will return a decorated version of console.error for you to pass debug statements to.

const debug = require('debug')('webnotes:server');
// const debug = require('debug')
// debug('webnotes:server');

function normalizePort(val) {
    const port = parseInt(val, 10);
  
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
 * event listener for HTTP server "error" event. IE THE SERVER has some problem, not routing error, that will be set in the app.js file.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
    throw error;
    }

    const {port} = error;
    // pick out port from error.
    // same as const port = error.port;

    const bind = typeof port === 'string'
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
 * event listener for HTTP server "listening" event.
 * this is what gets called when the server is up and listening to requests.
 */

function onListening(event) {
    const addr = this.address(); // This is a reference to the server object
    const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
    debug('Listening on ' + bind);
}

module.exports = { normalizePort, onError, onListening};