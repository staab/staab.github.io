/* */ 
var _curry3 = require('./internal/_curry3');
var _has = require('./internal/_has');
module.exports = _curry3(function mergeWithKey(fn, l, r) {
  var result = {};
  var k;
  for (k in l) {
    if (_has(k, l)) {
      result[k] = _has(k, r) ? fn(k, l[k], r[k]) : l[k];
    }
  }
  for (k in r) {
    if (_has(k, r) && !(_has(k, result))) {
      result[k] = r[k];
    }
  }
  return result;
});
