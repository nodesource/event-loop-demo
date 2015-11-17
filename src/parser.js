'use strict';

const DATA_PATH = __dirname + '/../data';
const DEPENCENCY_FILE = DATA_PATH + '/dependency_list.json';
const MODULE_MAINTAINERS_FILE = DATA_PATH + '/module_maintainers.json';

const fs = require('fs');

exports.singleDep = singleDep;
exports.fullDeps = fullDeps;
exports.moduleAuthor = moduleAuthor;

var deps_obj;
var mods_obj;


// Refresh JSON data at intervals to see if it's been updated
(function refreshData() {
  deps_obj = JSON.parse(fs.readFileSync(DEPENCENCY_FILE).toString());
  mods_obj = JSON.parse(fs.readFileSync(MODULE_MAINTAINERS_FILE).toString());
  //setTimeout(refreshData, 5000);
}());


// iterate through mods_obj and create a reverse lookup of modules and their
// maintainers.


// Return first layer of deps for given module
function singleDep(name) {
  if (!deps_obj[name])
    return null;
  return deps_obj[name];
}


// Return all depencencies as a flattened list for given module
function fullDeps(name) {
  if (!Array.isArray(deps_obj[name]))
    return null;

  const deps = [];
  deps_obj[name].forEach((item) => recurse(item, deps));
/* debug:start */
if (deps.length > 700)
  process._rawDebug(`${name}: ${deps.length}`);
/* debug:stop */

  return deps;
}


function recurse(name, deps) {
  if (deps.indexOf(name) > -1)
    return;
  deps.push(name);
  if (!Array.isArray(deps_obj[name]))
    return;
  deps_obj[name].forEach((item) => recurse(item, deps));
}


// Return all modules maintained by the given user
function moduleAuthor(name) {
  if (!mods_obj[name])
    return null;
  return mods_obj[name];
}
