/* */ 
var _curry2 = require('./internal/_curry2');
var _slice = require('./internal/_slice');
module.exports = _curry2(function splitWhen(pred, list) {
  var idx = 0;
  var len = list.length;
  var prefix = [];
  while (idx < len && !pred(list[idx])) {
    prefix.push(list[idx]);
    idx += 1;
  }
  return [prefix, _slice(list, idx)];
});
