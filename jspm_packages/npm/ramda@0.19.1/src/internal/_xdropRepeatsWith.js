/* */ 
var _curry2 = require('./_curry2');
module.exports = (function() {
  function XDropRepeatsWith(pred, xf) {
    this.xf = xf;
    this.pred = pred;
    this.lastValue = undefined;
    this.seenFirstValue = false;
  }
  XDropRepeatsWith.prototype['@@transducer/init'] = function() {
    return this.xf['@@transducer/init']();
  };
  XDropRepeatsWith.prototype['@@transducer/result'] = function(result) {
    return this.xf['@@transducer/result'](result);
  };
  XDropRepeatsWith.prototype['@@transducer/step'] = function(result, input) {
    var sameAsLast = false;
    if (!this.seenFirstValue) {
      this.seenFirstValue = true;
    } else if (this.pred(this.lastValue, input)) {
      sameAsLast = true;
    }
    this.lastValue = input;
    return sameAsLast ? result : this.xf['@@transducer/step'](result, input);
  };
  return _curry2(function _xdropRepeatsWith(pred, xf) {
    return new XDropRepeatsWith(pred, xf);
  });
}());
