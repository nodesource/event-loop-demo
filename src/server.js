'use strict';

const PORT = 8007;

const parser = require('./parser');
const http = require('http');
const url = require('url');


const server = http.createServer().listen(PORT);
const routes = [];


server.on('request', function(req, res) {
  const ret = simpleRoute(url.parse(req.url).path);
  setTimeout(function() {
    res.end(JSON.stringify(ret) + '\n');
    // Artificial latency for retrieving data from remote location. Play around
    // with it to see how much latency can affect response time.
  }, (Math.random() * 100) >>> 0);
});


// Return detailed user information from username
addRoute(/^\/user\/name\/.+/, function(path) {
  return parser.userDetails(path.substr(11));
});


// Return all modules maintained by given username
addRoute(/^\/user\/modules\/.+/, function(path) {
  return parser.moduleAuthor(path.substr(14));
});


// Return first level deps for module
addRoute(/^\/module\/simpledeps\/.+/, function(path) {
  return parser.singleDep(path.substr(19));
});


// Return a flattened list of recursive dependency lookup
addRoute(/^\/module\/fulldeps\/.+/, function(path) {
  return parser.fullDeps(path.substr(17));
});


// Simple routing logic for incoming requests.

function simpleRoute(path) {
  for (var i = 0; i < routes.length / 2; i++) {
    if (routes[i * 2].test(path))
      return routes[i * 2 + 1](path);
  }
  return null;
}


function addRoute(reg, fn) {
  routes.push(reg, fn);
}
