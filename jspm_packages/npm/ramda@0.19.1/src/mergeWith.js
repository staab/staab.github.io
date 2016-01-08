/* */ 
var _curry3 = require('./internal/_curry3');
var mergeWithKey = require('./mergeWithKey');
module.exports = _curry3(function mergeWith(fn, l, r) {
  return mergeWithKey(function(_, _l, _r) {
    return fn(_l, _r);
  }, l, r);
});
