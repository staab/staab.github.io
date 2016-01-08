/* */ 
var _curry2 = require('./internal/_curry2');
var concat = require('./concat');
var difference = require('./difference');
module.exports = _curry2(function symmetricDifference(list1, list2) {
  return concat(difference(list1, list2), difference(list2, list1));
});
