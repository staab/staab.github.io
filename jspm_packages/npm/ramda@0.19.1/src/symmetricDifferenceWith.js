/* */ 
var _curry3 = require('./internal/_curry3');
var concat = require('./concat');
var differenceWith = require('./differenceWith');
module.exports = _curry3(function symmetricDifferenceWith(pred, list1, list2) {
  return concat(differenceWith(pred, list1, list2), differenceWith(pred, list2, list1));
});
