import {
  module,
  test
} from 'qunit';
import Inflector from 'ember-inflector';
import {singularize, pluralize} from 'ember-inflector';

module('ember-inflector.dsl imports');

test('es6 import', function(assert) {
  assert.equal(Inflector.inflector.pluralize('cow'), 'kine', 'no pluralization rule');
  assert.equal(pluralize('cow'), 'kine', 'no pluralization rule');

  assert.equal(Inflector.inflector.singularize('kine'), 'cow', 'no singularization rule');
  assert.equal(singularize('kine'), 'cow', 'no singularization rule');
});
