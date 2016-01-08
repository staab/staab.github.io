/* */ 
var _contains = require('./internal/_contains');
var _curry2 = require('./internal/_curry2');
module.exports = _curry2(typeof Set === 'undefined' ? function uniqBy(fn, list) {
  var idx = 0;
  var applied = [];
  var result = [];
  var appliedItem,
      item;
  while (idx < list.length) {
    item = list[idx];
    appliedItem = fn(item);
    if (!_contains(appliedItem, applied)) {
      result.push(item);
      applied.push(appliedItem);
    }
    idx += 1;
  }
  return result;
} : function uniqBySet(fn, list) {
  var set = new Set();
  var applied = [];
  var prevSetSize = 0;
  var result = [];
  var nullExists = false;
  var negZeroExists = false;
  var idx = 0;
  var appliedItem,
      item,
      newSetSize;
  while (idx < list.length) {
    item = list[idx];
    appliedItem = fn(item);
    switch (typeof appliedItem) {
      case 'number':
        if (appliedItem === 0 && !negZeroExists && 1 / appliedItem === -Infinity) {
          negZeroExists = true;
          result.push(item);
          break;
        }
      case 'string':
      case 'boolean':
      case 'function':
      case 'undefined':
        set.add(appliedItem);
        newSetSize = set.size;
        if (newSetSize > prevSetSize) {
          result.push(item);
          prevSetSize = newSetSize;
        }
        break;
      case 'object':
        if (appliedItem === null) {
          if (!nullExists) {
            nullExists = true;
            result.push(null);
          }
          break;
        }
      default:
        if (!_contains(appliedItem, applied)) {
          applied.push(appliedItem);
          result.push(item);
        }
    }
    idx += 1;
  }
  return result;
});
