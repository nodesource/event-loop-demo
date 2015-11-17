'use strict';

const http = require('http');
const fs = require('fs');

const CONNECTIONS = 10;
const USERNAME_PATH = __dirname + '/../data/maintainers_usernames.json';
const usernames = JSON.parse(fs.readFileSync(USERNAME_PATH));
var req_completed = 0;


setInterval(function() {
  console.log('Requests completed:', req_completed / 5, '/sec');
  req_completed = 0;
}, 5000);


function randomUser() {
  return usernames[((Math.random() * 1e7) % usernames.length) >>> 0];
}


function startRequest() {
  http.request('http://localhost:8007/user/modules/' + randomUser(), (res) => {
    res.on('data', function(chunk) {
    req_completed++;
      iteratePackages(JSON.parse(chunk.toString()));
    });
  }).end();
}


function iteratePackages(list) {
  if (!list || list.length === 0)
    return startRequest();

  const item = list.pop();
  http.request('http://localhost:8007/module/fulldeps/' + item, (res) => {
    res.on('data', function() {
      req_completed++;
      iteratePackages(list);
    });
  }).end();
}


for (var i = 0; i < CONNECTIONS; i++)
  startRequest();
