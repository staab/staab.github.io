/* */ 
var _curry1 = require('./internal/_curry1');
var assocPath = require('./assocPath');
var lens = require('./lens');
var path = require('./path');
module.exports = _curry1(function lensPath(p) {
  return lens(path(p), assocPath(p));
});
