var Chai = require('chai');
var Cla6 = require('cla6');

var expect = Chai.expect;
var spy = Chai.spy;

describe('Cla6', function() {
  describe('base', function() {
    describe('scoping', function() {
      it('should not exist by default', function() {
        expect(Cla6.base).to.be.not.exist;
      });

      it('should exist in methods', function() {
        var Parent = Cla6('Parent', {
          constructor: function() {
            expect(Cla6.base).to.be.exist;
          },

          method: function() {
          }
        });

        var Child = Cla6('Child').extend(Parent, {
          method: function() {
            expect(Cla6.base).to.be.exist;
          }
        });

        var obj = new Child();
        expect(Cla6.base).to.be.not.exist;

        obj.method();
        expect(Cla6.base).to.be.not.exist;
      });

      it('should not exist if no super method defined', function() {
        var Klass = Cla6('Klass', {
          method: function() {
            expect(Cla6.base).to.be.not.exist;
          }
        });

        var obj = new Klass();
        obj.method();
      });

      it('should not exist in nested method scopes', function() {
        var Klass = Cla6('Klass', {
          constructor: function() {
            (function() {
              expect(Cla6.base).to.not.exist;
            })();
          }
        });

        var obj = new Klass();
      });

      it('should not exist if an error was thrown', function() {
        var Klass = Cla6('Klass', {
          throw: function() {
            throw Error();
          }
        });

        var obj = new Klass();

        try {
          obj.throw();
        } catch (e) {
          expect(Cla6.base).to.not.exist;
        }
      });
    });

    it('should call super method', function() {
      var Parent = Cla6('Parent', {
        constructor: function(str) {
          expect(str).to.equal('constructor');
        },

        method: function(str) {
          expect(str).to.equal('method');
        }
      });

      var Child = Cla6('Child').extend(Parent, {
        constructor: function() {
          Cla6.base('constructor');
        },

        method: function() {
          Cla6.base('method');
        }
      });

      var obj = new Child();
      obj.method();
    });

    it('should be bound to instance', function() {
      var Parent = Cla6('Parent', {
        constructor: function() {
          return this;
        }
      });

      var Child = Cla6('Child').extend(Parent, {
        constructor: function() {
          expect(Cla6.base()).to.equal(this);
        }
      });

      new Child();
    });
  });
});