/* eslint-disable qunit/no-assert-equal */
import { module, test } from 'qunit';
import { pluralize, singularize } from 'ember-inflector';

module('Integration | Ember.string extensions', function () {
  test('pluralize', function (assert) {
    assert.expect(3);

    assert.equal(pluralize('word'), 'words');
    assert.equal(pluralize('ox'), 'oxen');
    assert.equal(pluralize('octopus'), 'octopi');
  });

  test('singularize', function (assert) {
    assert.expect(3);

    assert.equal(singularize('words'), 'word');
    assert.equal(singularize('oxen'), 'ox');
    assert.equal(singularize('octopi'), 'octopus');
  });
});
