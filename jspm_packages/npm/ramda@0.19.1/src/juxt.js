/* */ 
var __ = require('./__');
var _curry1 = require('./internal/_curry1');
var apply = require('./apply');
var map = require('./map');
module.exports = _curry1(function juxt(fns) {
  return function() {
    return map(apply(__, arguments), fns);
  };
});
