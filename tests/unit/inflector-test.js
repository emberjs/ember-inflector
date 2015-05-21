import Ember from 'ember';
import {
  module,
  test
} from 'qunit';

var inflector;
module('ember-inflector.dsl', {
  setup: function() {
    inflector = new Ember.Inflector(/* no rulest == no rules */);
  },
  teardown: function() {
    inflector = undefined;
  }
});

test('ability to add additional pluralization rules', function(assert){
  assert.equal(inflector.pluralize('cow'), 'cow', 'no pluralization rule');

  inflector.plural(/$/, 's');

  assert.equal(inflector.pluralize('cow'), 'cows', 'pluralization rule was applied');
});

test('ability to add additional singularization rules', function(assert) {
  assert.equal(inflector.singularize('cows'), 'cows', 'no singularization rule was applied');

  inflector.singular(/s$/, '');

  assert.equal(inflector.singularize('cows'), 'cow', 'singularization rule was applied');
});

test('ability to add additional uncountable rules', function(assert) {
  inflector.plural(/$/, 's');
  assert.equal(inflector.pluralize('cow'), 'cows', 'pluralization rule was applied');

  inflector.uncountable('cow');
  assert.equal(inflector.pluralize('cow'), 'cow', 'pluralization rule NOT was applied');
  assert.equal(inflector.pluralize('redCow'), 'redCow', 'pluralization rule NOT was applied');
  assert.equal(inflector.pluralize('red-cow'), 'red-cow', 'pluralization rule NOT was applied');
  assert.equal(inflector.pluralize('red/cow'), 'red/cow', 'pluralization rule NOT was applied');
});

test('ability to add additional irregular rules', function(assert) {
  inflector.singular(/s$/, '');
  inflector.plural(/$/, 's');

  assert.equal(inflector.singularize('cows'), 'cow', 'regular singularization rule was applied');
  assert.equal(inflector.pluralize('cow'), 'cows', 'regular pluralization rule was applied');

  assert.equal(inflector.singularize('red-cows'), 'red-cow', 'regular singularization rule was applied');
  assert.equal(inflector.pluralize('red-cow'), 'red-cows', 'regular pluralization rule was applied');

  assert.equal(inflector.singularize('redCows'), 'redCow', 'regular singularization rule was applied');
  assert.equal(inflector.pluralize('redCow'), 'redCows', 'regular pluralization rule was applied');

  assert.equal(inflector.singularize('red/cows'), 'red/cow', 'regular singularization rule was applied');
  assert.equal(inflector.pluralize('red/cow'), 'red/cows', 'regular pluralization rule was applied');

  inflector.irregular('cow', 'kine');

  assert.equal(inflector.singularize('kine'), 'cow', 'irregular singularization rule was applied');
  assert.equal(inflector.pluralize('cow'), 'kine', 'irregular pluralization rule was applied');

  assert.equal(inflector.singularize('red-kine'), 'red-cow', 'irregular singularization rule was applied');
  assert.equal(inflector.pluralize('red-cow'), 'red-kine', 'irregular pluralization rule was applied');

  assert.equal(inflector.singularize('red-red-cow'), 'red-red-cow', 'irregular singularization rule was applied correctly with dasherization');
  assert.equal(inflector.singularize('red-red-kine'), 'red-red-cow', 'irregular singularization rule was applied correctly with dasherization');
  assert.equal(inflector.pluralize('red-red-cow'), 'red-red-kine', 'irregular pluralization rule was applied correctly with dasherization');
  assert.equal(inflector.pluralize('red-red-kine'), 'red-red-kine', 'irregular pluralization rule was applied correctly with dasherization');

  assert.equal(inflector.singularize('redKine'), 'redCow', 'irregular singularization rule was applied');
  assert.equal(inflector.pluralize('redCow'), 'redKine', 'irregular pluralization rule was applied');

  assert.equal(inflector.singularize('red/kine'), 'red/cow', 'irregular singularization rule was applied');
  assert.equal(inflector.pluralize('red/cow'), 'red/kine', 'irregular pluralization rule was applied');
});

test('ability to add identical singular and pluralizations', function(assert) {

  inflector.singular(/s$/, '');
  inflector.plural(/$/, 's');

  assert.equal(inflector.singularize('settings'),'setting','regular singularization rule was applied');
  assert.equal(inflector.pluralize('setting'),'settings','regular pluralization rule was applied');

  inflector.irregular('settings','settings');
  inflector.irregular('userPreferences','userPreferences');

  assert.equal(inflector.singularize('settings'),'settings','irregular singularization rule was applied on lowercase word');
  assert.equal(inflector.pluralize('settings'),'settings','irregular pluralization rule was applied on lowercase word');

  assert.equal(inflector.singularize('userPreferences'),'userPreferences','irregular singularization rule was applied on camelcase word');
  assert.equal(inflector.pluralize('userPreferences'),'userPreferences','irregular pluralization rule was applied on camelcase word');
});

module('ember-inflector.unit');

test('plurals', function(assert) {
  assert.expect(1);

  var inflector = new Ember.Inflector({
    plurals: [
      [/$/, 's'],
      [/s$/i, 's']
    ]
  });

  assert.equal(inflector.pluralize('apple'), 'apples');
});

test('singularization', function(assert) {
  assert.expect(1);

  var inflector = new Ember.Inflector({
    singular: [
      [/s$/i, ''],
      [/(ss)$/i, '$1']
    ]
  });

  assert.equal(inflector.singularize('apple'), 'apple');
});

test('singularization of irregular singulars', function(assert) {
  assert.expect(1);

  var inflector = new Ember.Inflector({
    singular: [
      [/s$/i, ''],
      [/(ss)$/i, '$1']
    ],
    irregularPairs: [
      ['lens', 'lenses']
    ]
  });

  assert.equal(inflector.singularize('lens'), 'lens');
});

test('pluralization of irregular plurals', function(assert) {
  assert.expect(1);

  var inflector = new Ember.Inflector({
    plurals: [
      [/$/,'s']
    ],
    irregularPairs: [
      ['person', 'people']
    ]
  });

  assert.equal(inflector.pluralize('people'), 'people');
});

test('plural', function(assert) {
  assert.expect(1);

  var inflector = new Ember.Inflector({
    plurals: [
      ['1', '1'],
      ['2', '2'],
      ['3', '3']
    ]
  });

  assert.equal(inflector.rules.plurals.length, 3);
});

test('singular', function(assert) {
  assert.expect(1);

  var inflector = new Ember.Inflector({
    singular: [
      ['1', '1'],
      ['2', '2'],
      ['3', '3']
    ]
  });

  assert.equal(inflector.rules.singular.length, 3);
});

test('irregular', function(assert) {
  assert.expect(6);

  var inflector = new Ember.Inflector({
    irregularPairs: [
      ['1', '12'],
      ['2', '22'],
      ['3', '32']
    ]
  });

  assert.equal(inflector.rules.irregular['1'], '12');
  assert.equal(inflector.rules.irregular['2'], '22');
  assert.equal(inflector.rules.irregular['3'], '32');

  assert.equal(inflector.rules.irregularInverse['12'], '1');
  assert.equal(inflector.rules.irregularInverse['22'], '2');
  assert.equal(inflector.rules.irregularInverse['32'], '3');
});

test('uncountable', function(assert) {
  assert.expect(3);

  var inflector = new Ember.Inflector({
    uncountable: [
      '1',
      '2',
      '3'
    ]
  });

  assert.equal(inflector.rules.uncountable['1'], true);
  assert.equal(inflector.rules.uncountable['2'], true);
  assert.equal(inflector.rules.uncountable['3'], true);
});

test('inflect.nothing', function(assert) {
  assert.expect(2);

  var inflector = new Ember.Inflector();

  assert.equal(inflector.inflect('',  []), '');
  assert.equal(inflector.inflect(' ', []), ' ');
});

test('inflect.noRules', function(assert) {
  assert.expect(1);

  var inflector = new Ember.Inflector();

  assert.equal(inflector.inflect('word', []),'word');
});

test('inflect.uncountable', function(assert) {
  assert.expect(1);

  var inflector = new Ember.Inflector({
    plural: [
      [/$/,'s']
    ],
    uncountable: [
      'word'
    ]
  });

  var rules = [];

  assert.equal(inflector.inflect('word', rules), 'word');
});

test('inflect.irregular', function(assert) {
  assert.expect(2);

  var inflector = new Ember.Inflector({
    irregularPairs: [
      ['word', 'wordy']
    ]
  });

  var rules = [];

  assert.equal(inflector.inflect('word', rules, inflector.rules.irregular), 'wordy');
  assert.equal(inflector.inflect('wordy', rules, inflector.rules.irregularInverse), 'word');
});

test('inflect.basicRules', function(assert) {
  assert.expect(1);

  var inflector = new Ember.Inflector();
  var rules = [[/$/, 's']];

  assert.equal(inflector.inflect('word', rules ), 'words');
});

test('inflect.advancedRules', function(assert) {
  assert.expect(1);

  var inflector = new Ember.Inflector();
  var rules = [[/^(ox)$/i, '$1en']];

  assert.equal(inflector.inflect('ox', rules), 'oxen');
});

test('Inflector.defaultRules', function(assert) {
  assert.expect(1);

  var rules = Ember.Inflector.defaultRules;
  assert.ok(rules, 'has defaultRules');
});

test('Ember.Inflector.inflector exists', function(assert) {
  assert.expect(1);

  assert.ok(Ember.Inflector.inflector, 'Ember.Inflector.inflector exists');
});

test('new Ember.Inflector with defaultRules matches docs', function(assert) {
  assert.expect(4);

  var inflector = new Ember.Inflector(Ember.Inflector.defaultRules);

  // defaultRules includes these special rules
  assert.equal(inflector.pluralize('cow'), 'kine');
  assert.equal(inflector.singularize('kine'), 'cow');

  // defaultRules adds 's' to singular
  assert.equal(inflector.pluralize('item'), 'items');

  // defaultRules removes 's' from plural
  assert.equal(inflector.singularize('items'), 'item');
});
