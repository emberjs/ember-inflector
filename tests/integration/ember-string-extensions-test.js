import Ember from 'ember';
import { module, test } from "ember-qunit";

module("Integration | Ember.String extensions");

test("pluralize", function(assert) {
  assert.expect(3);

  assert.equal(Ember.String.pluralize('word'),     'words');
  assert.equal(Ember.String.pluralize('ox'),       'oxen');
  assert.equal(Ember.String.pluralize('octopus'),  'octopi');
});

test("singularize", function(assert) {
  assert.expect(3);

  assert.equal(Ember.String.singularize('words'),  'word');
  assert.equal(Ember.String.singularize('oxen'),   'ox');
  assert.equal(Ember.String.singularize('octopi'), 'octopus');
});
