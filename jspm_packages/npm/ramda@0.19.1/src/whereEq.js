/* */ 
var _curry2 = require('./internal/_curry2');
var equals = require('./equals');
var map = require('./map');
var where = require('./where');
module.exports = _curry2(function whereEq(spec, testObj) {
  return where(map(equals, spec), testObj);
});
