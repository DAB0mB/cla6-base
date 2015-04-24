var Chai = require('chai');
var ChaiSpies = require('chai-spies');
var Cla6 = require('cla6');
var Cla6Base = require('..');

// plugins
Chai.use(ChaiSpies);
Cla6.use(Cla6Base);

// tests
require('./base');