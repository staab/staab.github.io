/* */ 
var _curry3 = require('./internal/_curry3');
var path = require('./path');
module.exports = _curry3(function pathSatisfies(pred, propPath, obj) {
  return propPath.length > 0 && pred(path(propPath, obj));
});
