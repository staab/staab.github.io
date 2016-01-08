/* */ 
var _curry2 = require('./internal/_curry2');
module.exports = _curry2(function zipObj(keys, values) {
  var idx = 0;
  var len = keys.length;
  var out = {};
  while (idx < len) {
    out[keys[idx]] = values[idx];
    idx += 1;
  }
  return out;
});
