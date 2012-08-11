module("ember-inflector.unit",{
  setup: function(){
    Ember.Inflector.reset();
  },
  tearDown: function(){
    Ember.Inflector.reset();
  }
});

// #integration
test("plurals", function() {
  expect(1);

  Ember.Inflector.plural(/$/, 's');
  Ember.Inflector.plural(/s$/i, 's');

  var inflected = Ember.Inflector.inflect("apple", Ember.Inflector.rules.plurals);

  equal(inflected, "apples");
});

test("singularization",function(){
  expect(1);

  Ember.Inflector.singular(/s$/i, '');
  Ember.Inflector.singular(/(ss)$/i, '$1');

  var inflected = Ember.Inflector.inflect("apple", Ember.Inflector.rules.singular);

  equal(inflected, "apple");
});

// \integration

// #unit
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

test("cache",function(){
  expect(0);
  // cache: function(word, rules, value){
});

test("plural",function(){
  expect(1);

  Ember.Inflector.plural("1","1");
  Ember.Inflector.plural("2","2");
  Ember.Inflector.plural("3","3");

  equal(Ember.Inflector.rules.plurals.length, 3);

});

test("singular",function(){
  expect(1);

  Ember.Inflector.singular("1","1");
  Ember.Inflector.singular("2","2");
  Ember.Inflector.singular("3","3");

  equal(Ember.Inflector.rules.singular.length, 3);
});

test("human",function(){
  expect(1);

  Ember.Inflector.human("1","1");
  Ember.Inflector.human("2","2");
  Ember.Inflector.human("3","3");

  equal(Ember.Inflector.rules.humans.length, 3);
});

test("irregular",function(){
  expect(6);

  Ember.Inflector.irregular("1","12");
  Ember.Inflector.irregular("2","22");
  Ember.Inflector.irregular("3","32");

  equal(Ember.Inflector.rules.irregular["1"], "12");
  equal(Ember.Inflector.rules.irregular["2"], "22");
  equal(Ember.Inflector.rules.irregular["3"], "32");

  equal(Ember.Inflector.rules.irregularInverse["12"], "1");
  equal(Ember.Inflector.rules.irregularInverse["22"], "2");
  equal(Ember.Inflector.rules.irregularInverse["32"], "3");
});

test("uncountable",function(){
  expect(3);

  Ember.Inflector.uncountable(["1","2","3"]);

  equal(Ember.Inflector.rules.uncountable["1"], true );
  equal(Ember.Inflector.rules.uncountable["2"], true );
  equal(Ember.Inflector.rules.uncountable["3"], true );
});

test("inflect.nothing", function(){
  expect(2);

  equal(Ember.Inflector.inflect("", []),"");
  equal(Ember.Inflector.inflect(" ", [])," ");
});

test("inflect.noRules",function(){
  expect(1);

  equal(Ember.Inflector.inflect("word", []),"word");
});

test("inflect.uncountable", function(){
  expect(1);

  var rules = [];

  Ember.Inflector.plural(/$/,'s');
  Ember.Inflector.uncountable(["word"]);

  equal(Ember.Inflector.inflect("word", rules),"word");
});

test("inflect.irregular", function(){
  expect(2);

  var rules = [];

  Ember.Inflector.irregular("word","wordy");

  equal(Ember.Inflector.inflect("word", rules),"wordy");
  equal(Ember.Inflector.inflect("wordy", rules),"word");
});

test("inflect.basicRules", function(){
  expect(1);

  var rule = [ /$/, 's'],
  rules = [rule];

  equal(Ember.Inflector.inflect("word", rules ),"words");
});
