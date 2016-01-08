/* */ 
var _curry2 = require('./internal/_curry2');
var _reduce = require('./internal/_reduce');
module.exports = _curry2(function indexBy(fn, list) {
  return _reduce(function(acc, elem) {
    var key = fn(elem);
    acc[key] = elem;
    return acc;
  }, {}, list);
});
