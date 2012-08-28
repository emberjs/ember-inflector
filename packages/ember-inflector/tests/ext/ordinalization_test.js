module("ember-inflector.ordinalization",{
  setup: function(){
    Ember.Inflector.reset();
  },
  tearDown: function(){
    Ember.Inflector.reset();
  }
});

test("ordinal",function(){
  expect(16);

  equal(Ember.Inflector.ordinal(-1),  "st", -1);
  equal(Ember.Inflector.ordinal(0),   "th",  0);
  equal(Ember.Inflector.ordinal(1),   "st",  1);
  equal(Ember.Inflector.ordinal(2),   "nd",  2);
  equal(Ember.Inflector.ordinal(3),   "rd",  3);
  equal(Ember.Inflector.ordinal(4),   "th",  4);
  equal(Ember.Inflector.ordinal(10),  "th", 10);
  equal(Ember.Inflector.ordinal(11),  "th", 11);
  equal(Ember.Inflector.ordinal(12),  "th", 12);
  equal(Ember.Inflector.ordinal(13),  "th", 13);
  equal(Ember.Inflector.ordinal(14),  "th", 14);
  equal(Ember.Inflector.ordinal(20),  "th", 20);
  equal(Ember.Inflector.ordinal(21),  "st", 21);
  equal(Ember.Inflector.ordinal(22),  "nd", 22);
  equal(Ember.Inflector.ordinal(23),  "rd", 23);
  equal(Ember.Inflector.ordinal(24),  "th", 24);
});

test("ordinalize", function(){
  expect(2);

  equal( Ember.String.ordinalize(1),   '1st');
  equal( Ember.String.ordinalize('1'), '1st');
});

