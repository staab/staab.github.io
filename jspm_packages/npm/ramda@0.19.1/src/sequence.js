/* */ 
var _curry2 = require('./internal/_curry2');
var ap = require('./ap');
var map = require('./map');
var prepend = require('./prepend');
var reduceRight = require('./reduceRight');
module.exports = _curry2(function sequence(of, traversable) {
  return typeof traversable.sequence === 'function' ? traversable.sequence(of) : reduceRight(function(acc, x) {
    return ap(map(prepend, x), acc);
  }, of([]), traversable);
});
