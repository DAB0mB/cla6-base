var Cla6 = require('cla6');

var caller;
var base;

Object.defineProperty(Cla6, 'base', {
  enumerable: true,

  get: function() {
    if (arguments.callee.caller == caller)
      return base;
  }
});

function Base(descriptors, Parent) {
  Object.keys(descriptors).filter(function(k) {
    return typeof descriptors[k].value == 'function';
  })
  .forEach(function(k) {
    var descriptor = descriptors[k];
    var superMethod = Parent.prototype[k];
    descriptor.value = wrapMethod(descriptor.value, superMethod); 
  });
}

var wrapMethod = function(method, superMethod) {
  return function() {
    var result;
    var restore = defineBase(this, method, superMethod);

    try {
      result = method.apply(this, arguments);
    } finally {
      restore();
    }

    return result;
  };
};

var defineBase = function(obj, method, superMethod) {
  var oldCaller = caller;
  var oldBase = base;
  caller = method;

  if (superMethod == null)
    base = undefined;
  else
    base = superMethod.bind(obj);

  return function() {
    caller = oldCaller;
    base = oldBase;
  };
};

module.exports = Base;