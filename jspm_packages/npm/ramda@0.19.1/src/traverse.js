/* */ 
var _curry3 = require('./internal/_curry3');
var map = require('./map');
var sequence = require('./sequence');
module.exports = _curry3(function traverse(of, f, traversable) {
  return sequence(of, map(f, traversable));
});
