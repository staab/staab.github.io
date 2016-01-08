/* */ 
var _curry2 = require('./internal/_curry2');
module.exports = _curry2(function evolve(transformations, object) {
  var result = {};
  var transformation,
      key,
      type;
  for (key in object) {
    transformation = transformations[key];
    type = typeof transformation;
    result[key] = type === 'function' ? transformation(object[key]) : type === 'object' ? evolve(transformations[key], object[key]) : object[key];
  }
  return result;
});
