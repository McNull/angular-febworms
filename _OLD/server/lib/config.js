
var argv = require('optimist').argv;
var path = require('path');

module.exports = {
  server: {
    distFolder: argv.root || '../dist',
    listenPort: argv.port || 7777,
    dataFolder: argv.data || 'data'
  }
};
