/* */ 
var _curry2 = require('./internal/_curry2');
var length = require('./length');
var slice = require('./slice');
module.exports = _curry2(function splitAt(index, array) {
  return [slice(0, index, array), slice(index, length(array), array)];
});
