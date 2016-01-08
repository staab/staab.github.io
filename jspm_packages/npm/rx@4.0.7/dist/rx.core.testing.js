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
    define(['./rx.core'], function(Rx, exports) {
      return factory(root, exports, Rx);
    });
  } else if (typeof module === 'object' && module && module.exports === freeExports) {
    module.exports = factory(root, module.exports, require('./rx.core'));
  } else {
    root.Rx = factory(root, {}, root.Rx);
  }
}.call(this, function(root, exp, Rx, undefined) {
  var Observer = Rx.Observer,
      Observable = Rx.Observable,
      Disposable = Rx.Disposable,
      disposableEmpty = Disposable.empty,
      disposableCreate = Disposable.create,
      CompositeDisposable = Rx.CompositeDisposable,
      SingleAssignmentDisposable = Rx.SingleAssignmentDisposable,
      Scheduler = Rx.Scheduler,
      ScheduledItem = Rx.internals.ScheduledItem,
      SchedulePeriodicRecursive = Rx.internals.SchedulePeriodicRecursive,
      PriorityQueue = Rx.internals.PriorityQueue,
      inherits = Rx.internals.inherits,
      notImplemented = Rx.helpers.notImplemented,
      defaultComparer = Rx.helpers.defaultComparer = function(a, b) {
        return isEqual(a, b);
      };
  var Notification = Rx.Notification = (function() {
    function Notification() {}
    Notification.prototype._accept = function(onNext, onError, onCompleted) {
      throw new NotImplementedError();
    };
    Notification.prototype._acceptObserver = function(onNext, onError, onCompleted) {
      throw new NotImplementedError();
    };
    Notification.prototype.accept = function(observerOrOnNext, onError, onCompleted) {
      return observerOrOnNext && typeof observerOrOnNext === 'object' ? this._acceptObserver(observerOrOnNext) : this._accept(observerOrOnNext, onError, onCompleted);
    };
    Notification.prototype.toObservable = function(scheduler) {
      var self = this;
      isScheduler(scheduler) || (scheduler = immediateScheduler);
      return new AnonymousObservable(function(o) {
        return scheduler.schedule(self, function(_, notification) {
          notification._acceptObserver(o);
          notification.kind === 'N' && o.onCompleted();
        });
      });
    };
    return Notification;
  })();
  var OnNextNotification = (function(__super__) {
    inherits(OnNextNotification, __super__);
    function OnNextNotification(value) {
      this.value = value;
      this.kind = 'N';
    }
    OnNextNotification.prototype._accept = function(onNext) {
      return onNext(this.value);
    };
    OnNextNotification.prototype._acceptObserver = function(o) {
      return o.onNext(this.value);
    };
    OnNextNotification.prototype.toString = function() {
      return 'OnNext(' + this.value + ')';
    };
    return OnNextNotification;
  }(Notification));
  var OnErrorNotification = (function(__super__) {
    inherits(OnErrorNotification, __super__);
    function OnErrorNotification(error) {
      this.error = error;
      this.kind = 'E';
    }
    OnErrorNotification.prototype._accept = function(onNext, onError) {
      return onError(this.error);
    };
    OnErrorNotification.prototype._acceptObserver = function(o) {
      return o.onError(this.error);
    };
    OnErrorNotification.prototype.toString = function() {
      return 'OnError(' + this.error + ')';
    };
    return OnErrorNotification;
  }(Notification));
  var OnCompletedNotification = (function(__super__) {
    inherits(OnCompletedNotification, __super__);
    function OnCompletedNotification() {
      this.kind = 'C';
    }
    OnCompletedNotification.prototype._accept = function(onNext, onError, onCompleted) {
      return onCompleted();
    };
    OnCompletedNotification.prototype._acceptObserver = function(o) {
      return o.onCompleted();
    };
    OnCompletedNotification.prototype.toString = function() {
      return 'OnCompleted()';
    };
    return OnCompletedNotification;
  }(Notification));
  var notificationCreateOnNext = Notification.createOnNext = function(value) {
    return new OnNextNotification(value);
  };
  var notificationCreateOnError = Notification.createOnError = function(error) {
    return new OnErrorNotification(error);
  };
  var notificationCreateOnCompleted = Notification.createOnCompleted = function() {
    return new OnCompletedNotification();
  };
  var dontEnums = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'],
      dontEnumsLength = dontEnums.length;
  var argsTag = '[object Arguments]',
      arrayTag = '[object Array]',
      boolTag = '[object Boolean]',
      dateTag = '[object Date]',
      errorTag = '[object Error]',
      funcTag = '[object Function]',
      mapTag = '[object Map]',
      numberTag = '[object Number]',
      objectTag = '[object Object]',
      regexpTag = '[object RegExp]',
      setTag = '[object Set]',
      stringTag = '[object String]',
      weakMapTag = '[object WeakMap]';
  var arrayBufferTag = '[object ArrayBuffer]',
      float32Tag = '[object Float32Array]',
      float64Tag = '[object Float64Array]',
      int8Tag = '[object Int8Array]',
      int16Tag = '[object Int16Array]',
      int32Tag = '[object Int32Array]',
      uint8Tag = '[object Uint8Array]',
      uint8ClampedTag = '[object Uint8ClampedArray]',
      uint16Tag = '[object Uint16Array]',
      uint32Tag = '[object Uint32Array]';
  var typedArrayTags = {};
  typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
  typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
  var objectProto = Object.prototype,
      hasOwnProperty = objectProto.hasOwnProperty,
      objToString = objectProto.toString,
      MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;
  var keys = Object.keys || (function() {
    var hasOwnProperty = Object.prototype.hasOwnProperty,
        hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
        dontEnums = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'],
        dontEnumsLength = dontEnums.length;
    return function(obj) {
      if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
        throw new TypeError('Object.keys called on non-object');
      }
      var result = [],
          prop,
          i;
      for (prop in obj) {
        if (hasOwnProperty.call(obj, prop)) {
          result.push(prop);
        }
      }
      if (hasDontEnumBug) {
        for (i = 0; i < dontEnumsLength; i++) {
          if (hasOwnProperty.call(obj, dontEnums[i])) {
            result.push(dontEnums[i]);
          }
        }
      }
      return result;
    };
  }());
  function equalObjects(object, other, equalFunc, isLoose, stackA, stackB) {
    var objProps = keys(object),
        objLength = objProps.length,
        othProps = keys(other),
        othLength = othProps.length;
    if (objLength !== othLength && !isLoose) {
      return false;
    }
    var index = objLength,
        key;
    while (index--) {
      key = objProps[index];
      if (!(isLoose ? key in other : hasOwnProperty.call(other, key))) {
        return false;
      }
    }
    var skipCtor = isLoose;
    while (++index < objLength) {
      key = objProps[index];
      var objValue = object[key],
          othValue = other[key],
          result;
      if (!(result === undefined ? equalFunc(objValue, othValue, isLoose, stackA, stackB) : result)) {
        return false;
      }
      skipCtor || (skipCtor = key === 'constructor');
    }
    if (!skipCtor) {
      var objCtor = object.constructor,
          othCtor = other.constructor;
      if (objCtor !== othCtor && ('constructor' in object && 'constructor' in other) && !(typeof objCtor === 'function' && objCtor instanceof objCtor && typeof othCtor === 'function' && othCtor instanceof othCtor)) {
        return false;
      }
    }
    return true;
  }
  function equalByTag(object, other, tag) {
    switch (tag) {
      case boolTag:
      case dateTag:
        return +object === +other;
      case errorTag:
        return object.name === other.name && object.message === other.message;
      case numberTag:
        return (object !== +object) ? other !== +other : object === +other;
      case regexpTag:
      case stringTag:
        return object === (other + '');
    }
    return false;
  }
  var isObject = Rx.internals.isObject = function(value) {
    var type = typeof value;
    return !!value && (type === 'object' || type === 'function');
  };
  function isObjectLike(value) {
    return !!value && typeof value === 'object';
  }
  function isLength(value) {
    return typeof value === 'number' && value > -1 && value % 1 === 0 && value <= MAX_SAFE_INTEGER;
  }
  var isHostObject = (function() {
    try {
      Object({'toString': 0} + '');
    } catch (e) {
      return function() {
        return false;
      };
    }
    return function(value) {
      return typeof value.toString !== 'function' && typeof(value + '') === 'string';
    };
  }());
  function isTypedArray(value) {
    return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objToString.call(value)];
  }
  var isArray = Array.isArray || function(value) {
    return isObjectLike(value) && isLength(value.length) && objToString.call(value) === arrayTag;
  };
  function arraySome(array, predicate) {
    var index = -1,
        length = array.length;
    while (++index < length) {
      if (predicate(array[index], index, array)) {
        return true;
      }
    }
    return false;
  }
  function equalArrays(array, other, equalFunc, isLoose, stackA, stackB) {
    var index = -1,
        arrLength = array.length,
        othLength = other.length;
    if (arrLength !== othLength && !(isLoose && othLength > arrLength)) {
      return false;
    }
    while (++index < arrLength) {
      var arrValue = array[index],
          othValue = other[index],
          result;
      if (result !== undefined) {
        if (result) {
          continue;
        }
        return false;
      }
      if (isLoose) {
        if (!arraySome(other, function(othValue) {
          return arrValue === othValue || equalFunc(arrValue, othValue, isLoose, stackA, stackB);
        })) {
          return false;
        }
      } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, isLoose, stackA, stackB))) {
        return false;
      }
    }
    return true;
  }
  function baseIsEqualDeep(object, other, equalFunc, isLoose, stackA, stackB) {
    var objIsArr = isArray(object),
        othIsArr = isArray(other),
        objTag = arrayTag,
        othTag = arrayTag;
    if (!objIsArr) {
      objTag = objToString.call(object);
      if (objTag === argsTag) {
        objTag = objectTag;
      } else if (objTag !== objectTag) {
        objIsArr = isTypedArray(object);
      }
    }
    if (!othIsArr) {
      othTag = objToString.call(other);
      if (othTag === argsTag) {
        othTag = objectTag;
      }
    }
    var objIsObj = objTag === objectTag && !isHostObject(object),
        othIsObj = othTag === objectTag && !isHostObject(other),
        isSameTag = objTag === othTag;
    if (isSameTag && !(objIsArr || objIsObj)) {
      return equalByTag(object, other, objTag);
    }
    if (!isLoose) {
      var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
          othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');
      if (objIsWrapped || othIsWrapped) {
        return equalFunc(objIsWrapped ? object.value() : object, othIsWrapped ? other.value() : other, isLoose, stackA, stackB);
      }
    }
    if (!isSameTag) {
      return false;
    }
    stackA || (stackA = []);
    stackB || (stackB = []);
    var length = stackA.length;
    while (length--) {
      if (stackA[length] === object) {
        return stackB[length] === other;
      }
    }
    stackA.push(object);
    stackB.push(other);
    var result = (objIsArr ? equalArrays : equalObjects)(object, other, equalFunc, isLoose, stackA, stackB);
    stackA.pop();
    stackB.pop();
    return result;
  }
  function baseIsEqual(value, other, isLoose, stackA, stackB) {
    if (value === other) {
      return true;
    }
    if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
      return value !== value && other !== other;
    }
    return baseIsEqualDeep(value, other, baseIsEqual, isLoose, stackA, stackB);
  }
  var isEqual = Rx.internals.isEqual = function(value, other) {
    return baseIsEqual(value, other);
  };
  var SchedulePeriodicRecursive = Rx.internals.SchedulePeriodicRecursive = (function() {
    function createTick(self) {
      return function tick(command, recurse) {
        recurse(0, self._period);
        var state = tryCatch(self._action)(self._state);
        if (state === errorObj) {
          self._cancel.dispose();
          thrower(state.e);
        }
        self._state = state;
      };
    }
    function SchedulePeriodicRecursive(scheduler, state, period, action) {
      this._scheduler = scheduler;
      this._state = state;
      this._period = period;
      this._action = action;
    }
    SchedulePeriodicRecursive.prototype.start = function() {
      var d = new SingleAssignmentDisposable();
      this._cancel = d;
      d.setDisposable(this._scheduler.scheduleRecursiveFuture(0, this._period, createTick(this)));
      return d;
    };
    return SchedulePeriodicRecursive;
  }());
  var VirtualTimeScheduler = Rx.VirtualTimeScheduler = (function(__super__) {
    inherits(VirtualTimeScheduler, __super__);
    function VirtualTimeScheduler(initialClock, comparer) {
      this.clock = initialClock;
      this.comparer = comparer;
      this.isEnabled = false;
      this.queue = new PriorityQueue(1024);
      __super__.call(this);
    }
    var VirtualTimeSchedulerPrototype = VirtualTimeScheduler.prototype;
    VirtualTimeSchedulerPrototype.now = function() {
      return this.toAbsoluteTime(this.clock);
    };
    VirtualTimeSchedulerPrototype.schedule = function(state, action) {
      return this.scheduleAbsolute(state, this.clock, action);
    };
    VirtualTimeSchedulerPrototype.scheduleFuture = function(state, dueTime, action) {
      var dt = dueTime instanceof Date ? this.toRelativeTime(dueTime - this.now()) : this.toRelativeTime(dueTime);
      return this.scheduleRelative(state, dt, action);
    };
    VirtualTimeSchedulerPrototype.add = notImplemented;
    VirtualTimeSchedulerPrototype.toAbsoluteTime = notImplemented;
    VirtualTimeSchedulerPrototype.toRelativeTime = notImplemented;
    VirtualTimeSchedulerPrototype.schedulePeriodic = function(state, period, action) {
      var s = new SchedulePeriodicRecursive(this, state, period, action);
      return s.start();
    };
    VirtualTimeSchedulerPrototype.scheduleRelative = function(state, dueTime, action) {
      var runAt = this.add(this.clock, dueTime);
      return this.scheduleAbsolute(state, runAt, action);
    };
    VirtualTimeSchedulerPrototype.start = function() {
      if (!this.isEnabled) {
        this.isEnabled = true;
        do {
          var next = this.getNext();
          if (next !== null) {
            this.comparer(next.dueTime, this.clock) > 0 && (this.clock = next.dueTime);
            next.invoke();
          } else {
            this.isEnabled = false;
          }
        } while (this.isEnabled);
      }
    };
    VirtualTimeSchedulerPrototype.stop = function() {
      this.isEnabled = false;
    };
    VirtualTimeSchedulerPrototype.advanceTo = function(time) {
      var dueToClock = this.comparer(this.clock, time);
      if (this.comparer(this.clock, time) > 0) {
        throw new ArgumentOutOfRangeError();
      }
      if (dueToClock === 0) {
        return;
      }
      if (!this.isEnabled) {
        this.isEnabled = true;
        do {
          var next = this.getNext();
          if (next !== null && this.comparer(next.dueTime, time) <= 0) {
            this.comparer(next.dueTime, this.clock) > 0 && (this.clock = next.dueTime);
            next.invoke();
          } else {
            this.isEnabled = false;
          }
        } while (this.isEnabled);
        this.clock = time;
      }
    };
    VirtualTimeSchedulerPrototype.advanceBy = function(time) {
      var dt = this.add(this.clock, time),
          dueToClock = this.comparer(this.clock, dt);
      if (dueToClock > 0) {
        throw new ArgumentOutOfRangeError();
      }
      if (dueToClock === 0) {
        return;
      }
      this.advanceTo(dt);
    };
    VirtualTimeSchedulerPrototype.sleep = function(time) {
      var dt = this.add(this.clock, time);
      if (this.comparer(this.clock, dt) >= 0) {
        throw new ArgumentOutOfRangeError();
      }
      this.clock = dt;
    };
    VirtualTimeSchedulerPrototype.getNext = function() {
      while (this.queue.length > 0) {
        var next = this.queue.peek();
        if (next.isCancelled()) {
          this.queue.dequeue();
        } else {
          return next;
        }
      }
      return null;
    };
    VirtualTimeSchedulerPrototype.scheduleAbsolute = function(state, dueTime, action) {
      var self = this;
      function run(scheduler, state1) {
        self.queue.remove(si);
        return action(scheduler, state1);
      }
      var si = new ScheduledItem(this, state, run, dueTime, this.comparer);
      this.queue.enqueue(si);
      return si.disposable;
    };
    return VirtualTimeScheduler;
  }(Scheduler));
  function OnNextPredicate(predicate) {
    this.predicate = predicate;
  }
  OnNextPredicate.prototype.equals = function(other) {
    if (other === this) {
      return true;
    }
    if (other == null) {
      return false;
    }
    if (other.kind !== 'N') {
      return false;
    }
    return this.predicate(other.value);
  };
  function OnErrorPredicate(predicate) {
    this.predicate = predicate;
  }
  OnErrorPredicate.prototype.equals = function(other) {
    if (other === this) {
      return true;
    }
    if (other == null) {
      return false;
    }
    if (other.kind !== 'E') {
      return false;
    }
    return this.predicate(other.error);
  };
  var ReactiveTest = Rx.ReactiveTest = {
    created: 100,
    subscribed: 200,
    disposed: 1000,
    onNext: function(ticks, value) {
      return typeof value === 'function' ? new Recorded(ticks, new OnNextPredicate(value)) : new Recorded(ticks, Notification.createOnNext(value));
    },
    onError: function(ticks, error) {
      return typeof error === 'function' ? new Recorded(ticks, new OnErrorPredicate(error)) : new Recorded(ticks, Notification.createOnError(error));
    },
    onCompleted: function(ticks) {
      return new Recorded(ticks, Notification.createOnCompleted());
    },
    subscribe: function(start, end) {
      return new Subscription(start, end);
    }
  };
  var Recorded = Rx.Recorded = function(time, value, comparer) {
    this.time = time;
    this.value = value;
    this.comparer = comparer || defaultComparer;
  };
  Recorded.prototype.equals = function(other) {
    return this.time === other.time && this.comparer(this.value, other.value);
  };
  Recorded.prototype.toString = function() {
    return this.value.toString() + '@' + this.time;
  };
  var Subscription = Rx.Subscription = function(start, end) {
    this.subscribe = start;
    this.unsubscribe = end || Number.MAX_VALUE;
  };
  Subscription.prototype.equals = function(other) {
    return this.subscribe === other.subscribe && this.unsubscribe === other.unsubscribe;
  };
  Subscription.prototype.toString = function() {
    return '(' + this.subscribe + ', ' + (this.unsubscribe === Number.MAX_VALUE ? 'Infinite' : this.unsubscribe) + ')';
  };
  var MockDisposable = Rx.MockDisposable = function(scheduler) {
    this.scheduler = scheduler;
    this.disposes = [];
    this.disposes.push(this.scheduler.clock);
  };
  MockDisposable.prototype.dispose = function() {
    this.disposes.push(this.scheduler.clock);
  };
  var MockObserver = (function(__super__) {
    inherits(MockObserver, __super__);
    function MockObserver(scheduler) {
      __super__.call(this);
      this.scheduler = scheduler;
      this.messages = [];
    }
    var MockObserverPrototype = MockObserver.prototype;
    MockObserverPrototype.onNext = function(value) {
      this.messages.push(new Recorded(this.scheduler.clock, Notification.createOnNext(value)));
    };
    MockObserverPrototype.onError = function(e) {
      this.messages.push(new Recorded(this.scheduler.clock, Notification.createOnError(e)));
    };
    MockObserverPrototype.onCompleted = function() {
      this.messages.push(new Recorded(this.scheduler.clock, Notification.createOnCompleted()));
    };
    return MockObserver;
  })(Observer);
  function MockPromise(scheduler, messages) {
    var self = this;
    this.scheduler = scheduler;
    this.messages = messages;
    this.subscriptions = [];
    this.observers = [];
    for (var i = 0,
        len = this.messages.length; i < len; i++) {
      var message = this.messages[i],
          notification = message.value;
      (function(innerNotification) {
        scheduler.scheduleAbsolute(null, message.time, function() {
          var obs = self.observers.slice(0);
          for (var j = 0,
              jLen = obs.length; j < jLen; j++) {
            innerNotification.accept(obs[j]);
          }
          return disposableEmpty;
        });
      })(notification);
    }
  }
  MockPromise.prototype.then = function(onResolved, onRejected) {
    var self = this;
    this.subscriptions.push(new Subscription(this.scheduler.clock));
    var index = this.subscriptions.length - 1;
    var newPromise;
    var observer = Rx.Observer.create(function(x) {
      var retValue = onResolved(x);
      if (retValue && typeof retValue.then === 'function') {
        newPromise = retValue;
      } else {
        var ticks = self.scheduler.clock;
        newPromise = new MockPromise(self.scheduler, [Rx.ReactiveTest.onNext(ticks, undefined), Rx.ReactiveTest.onCompleted(ticks)]);
      }
      var idx = self.observers.indexOf(observer);
      self.observers.splice(idx, 1);
      self.subscriptions[index] = new Subscription(self.subscriptions[index].subscribe, self.scheduler.clock);
    }, function(err) {
      onRejected(err);
      var idx = self.observers.indexOf(observer);
      self.observers.splice(idx, 1);
      self.subscriptions[index] = new Subscription(self.subscriptions[index].subscribe, self.scheduler.clock);
    });
    this.observers.push(observer);
    return newPromise || new MockPromise(this.scheduler, this.messages);
  };
  var HotObservable = (function(__super__) {
    inherits(HotObservable, __super__);
    function HotObservable(scheduler, messages) {
      __super__.call(this);
      var message,
          notification,
          observable = this;
      this.scheduler = scheduler;
      this.messages = messages;
      this.subscriptions = [];
      this.observers = [];
      for (var i = 0,
          len = this.messages.length; i < len; i++) {
        message = this.messages[i];
        notification = message.value;
        (function(innerNotification) {
          scheduler.scheduleAbsolute(null, message.time, function() {
            var obs = observable.observers.slice(0);
            for (var j = 0,
                jLen = obs.length; j < jLen; j++) {
              innerNotification.accept(obs[j]);
            }
            return disposableEmpty;
          });
        })(notification);
      }
    }
    HotObservable.prototype._subscribe = function(o) {
      var observable = this;
      this.observers.push(o);
      this.subscriptions.push(new Subscription(this.scheduler.clock));
      var index = this.subscriptions.length - 1;
      return disposableCreate(function() {
        var idx = observable.observers.indexOf(o);
        observable.observers.splice(idx, 1);
        observable.subscriptions[index] = new Subscription(observable.subscriptions[index].subscribe, observable.scheduler.clock);
      });
    };
    return HotObservable;
  })(Observable);
  var ColdObservable = (function(__super__) {
    inherits(ColdObservable, __super__);
    function ColdObservable(scheduler, messages) {
      __super__.call(this);
      this.scheduler = scheduler;
      this.messages = messages;
      this.subscriptions = [];
    }
    ColdObservable.prototype._subscribe = function(o) {
      var message,
          notification,
          observable = this;
      this.subscriptions.push(new Subscription(this.scheduler.clock));
      var index = this.subscriptions.length - 1;
      var d = new CompositeDisposable();
      for (var i = 0,
          len = this.messages.length; i < len; i++) {
        message = this.messages[i];
        notification = message.value;
        (function(innerNotification) {
          d.add(observable.scheduler.scheduleRelative(null, message.time, function() {
            innerNotification.accept(o);
            return disposableEmpty;
          }));
        })(notification);
      }
      return disposableCreate(function() {
        observable.subscriptions[index] = new Subscription(observable.subscriptions[index].subscribe, observable.scheduler.clock);
        d.dispose();
      });
    };
    return ColdObservable;
  })(Observable);
  Rx.TestScheduler = (function(__super__) {
    inherits(TestScheduler, __super__);
    function baseComparer(x, y) {
      return x > y ? 1 : (x < y ? -1 : 0);
    }
    function TestScheduler() {
      __super__.call(this, 0, baseComparer);
    }
    TestScheduler.prototype.scheduleAbsolute = function(state, dueTime, action) {
      dueTime <= this.clock && (dueTime = this.clock + 1);
      return __super__.prototype.scheduleAbsolute.call(this, state, dueTime, action);
    };
    TestScheduler.prototype.add = function(absolute, relative) {
      return absolute + relative;
    };
    TestScheduler.prototype.toAbsoluteTime = function(absolute) {
      return new Date(absolute).getTime();
    };
    TestScheduler.prototype.toRelativeTime = function(timeSpan) {
      return timeSpan;
    };
    TestScheduler.prototype.startScheduler = function(createFn, settings) {
      settings || (settings = {});
      settings.created == null && (settings.created = ReactiveTest.created);
      settings.subscribed == null && (settings.subscribed = ReactiveTest.subscribed);
      settings.disposed == null && (settings.disposed = ReactiveTest.disposed);
      var observer = this.createObserver(),
          source,
          subscription;
      this.scheduleAbsolute(null, settings.created, function() {
        source = createFn();
        return disposableEmpty;
      });
      this.scheduleAbsolute(null, settings.subscribed, function() {
        subscription = source.subscribe(observer);
        return disposableEmpty;
      });
      this.scheduleAbsolute(null, settings.disposed, function() {
        subscription.dispose();
        return disposableEmpty;
      });
      this.start();
      return observer;
    };
    TestScheduler.prototype.createHotObservable = function() {
      var len = arguments.length,
          args;
      if (Array.isArray(arguments[0])) {
        args = arguments[0];
      } else {
        args = new Array(len);
        for (var i = 0; i < len; i++) {
          args[i] = arguments[i];
        }
      }
      return new HotObservable(this, args);
    };
    TestScheduler.prototype.createColdObservable = function() {
      var len = arguments.length,
          args;
      if (Array.isArray(arguments[0])) {
        args = arguments[0];
      } else {
        args = new Array(len);
        for (var i = 0; i < len; i++) {
          args[i] = arguments[i];
        }
      }
      return new ColdObservable(this, args);
    };
    TestScheduler.prototype.createResolvedPromise = function(ticks, value) {
      return new MockPromise(this, [Rx.ReactiveTest.onNext(ticks, value), Rx.ReactiveTest.onCompleted(ticks)]);
    };
    TestScheduler.prototype.createRejectedPromise = function(ticks, reason) {
      return new MockPromise(this, [Rx.ReactiveTest.onError(ticks, reason)]);
    };
    TestScheduler.prototype.createObserver = function() {
      return new MockObserver(this);
    };
    return TestScheduler;
  })(VirtualTimeScheduler);
  return Rx;
}));
