/* */ 
"format cjs";
;
(function(factory) {
  var objectTypes = {
    'function': true,
    'object': true
  };
  function checkGlobal(value) {
    return (value && value.Object === Object) ? value : null;
  }
  var freeExports = (objectTypes[typeof exports] && exports && !exports.nodeType) ? exports : null;
  var freeModule = (objectTypes[typeof module] && module && !module.nodeType) ? module : null;
  var freeGlobal = checkGlobal(freeExports && freeModule && typeof global === 'object' && global);
  var freeSelf = checkGlobal(objectTypes[typeof self] && self);
  var freeWindow = checkGlobal(objectTypes[typeof window] && window);
  var moduleExports = (freeModule && freeModule.exports === freeExports) ? freeExports : null;
  var thisGlobal = checkGlobal(objectTypes[typeof this] && this);
  var root = freeGlobal || ((freeWindow !== (thisGlobal && thisGlobal.window)) && freeWindow) || freeSelf || thisGlobal || Function('return this')();
  if (typeof define === 'function' && define.amd) {
    define(['./rx'], function(Rx, exports) {
      return factory(root, exports, Rx);
    });
  } else if (typeof module === 'object' && module && module.exports === freeExports) {
    module.exports = factory(root, module.exports, require('./rx'));
  } else {
    root.Rx = factory(root, {}, root.Rx);
  }
}.call(this, function(root, exp, Rx, undefined) {
  var Observable = Rx.Observable,
      observableProto = Observable.prototype,
      AnonymousObservable = Rx.AnonymousObservable,
      observableNever = Observable.never,
      isEqual = Rx.internals.isEqual,
      defaultSubComparer = Rx.helpers.defaultSubComparer;
  observableProto.jortSort = function() {
    return this.jortSortUntil(observableNever());
  };
  observableProto.jortSortUntil = function(other) {
    var source = this;
    return new AnonymousObservable(function(observer) {
      var arr = [];
      return source.takeUntil(other).subscribe(arr.push.bind(arr), observer.onError.bind(observer), function() {
        var sorted = arr.slice(0).sort(defaultSubComparer);
        observer.onNext(isEqual(arr, sorted));
        observer.onCompleted();
      });
    }, source);
  };
  return Rx;
}));
