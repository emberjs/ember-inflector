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

test("inflect.advancedRules", function(){
  expect(1);

  var rule = [ /^(ox)$/i, '$1en'],
  rules = [rule];

  equal(Ember.Inflector.inflect("ox", rules ),"oxen");
});
