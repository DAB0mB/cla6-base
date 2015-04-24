# Cla6 Base 

This is an addon plugin for [Cla6.js](https://github.com/DAB0mB/cla6) class system library which lets you do super calls. Although originally designed for use with [Node.js](http://nodejs.org) and installable via `npm install cla6-base`, it can also be used directly in the browser.

Cla6 Base is also installable via:

- [bower](http://bower.io/): `bower install cla6-base`

## Basic Example

```js
var Parent = Cla6('Parent', {
  constructor: function() {
    this.foo = 'foo';
  },

  method: function() {
    this.baz = 'baz';
  },
});

var Child = Cla6('Child').extend(Parent, {
  constructor: function() {
    Cla6.base();
    this.bar = 'bar';
  },

  method: function() {
    Cla6.base();
    this.qux = 'qux';
  },

  log: function() {
    console.log(this.foo, this.bar, this.baz, this.qux);
  }
});

var obj = new Child();
obj.method();
obj.log(); // foo bar baz qux
```

Note, base can only be used directly from method scope, not inner scopes or outer scopes.

## How To Use

```js
var Cla6 = require('cla6');
var Cla6Base = require('cla6-base');

Cla6.use(Cla6Base);
```

## Download

The source is available for download from
[GitHub](http://github.com/DAB0mB/cla6-base).
Alternatively, you can install using Node Package Manager (`npm`):

    npm install cla6-base
