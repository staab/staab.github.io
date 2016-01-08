/* */ 
var _contains = require('./internal/_contains');
var _curry2 = require('./internal/_curry2');
var flip = require('./flip');
var reject = require('./reject');
module.exports = _curry2(function(xs, list) {
  return reject(flip(_contains)(xs), list);
});
