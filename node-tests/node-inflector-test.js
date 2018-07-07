/* eslint-env node */
require = require('esm')(module); // eslint-disable-line no-global-assign

var Inflector = require('../addon/index');
var singularize = Inflector.singularize;
var pluralize = Inflector.pluralize;

var module = QUnit.module;
var test = QUnit.test;

module('Inflector works in Node', function() {

  test('singularize works', function(assert) {
    assert.equal(singularize('cats'), 'cat');
  });

  test('pluralize works', function(assert) {
    assert.equal(pluralize('dog'), 'dogs');
  });

});
