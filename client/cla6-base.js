(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Cla6Base = require('..');

Cla6.use(Cla6Base);
},{"..":2}],2:[function(require,module,exports){
(function (global){
var Cla6 = (typeof window !== "undefined" ? window.Cla6 : typeof global !== "undefined" ? global.Cla6 : null);

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
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1]);
