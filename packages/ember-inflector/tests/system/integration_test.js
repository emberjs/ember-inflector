module("ember-inflector.integration",{
  setup: function(){
    Ember.Inflector.reset();
    Ember.Inflector.loadAll();
  },
  tearDown: function(){
    Ember.Inflector.reset();
    Ember.Inflector.clearRules();
  }
});

test("pluralize", function(){
  expect(3);

  equal( Ember.String.pluralize('word'),     'words');
  equal( Ember.String.pluralize('ox'),       'oxen');
  equal( Ember.String.pluralize('octopus'),  'octopi');
});

test("singularize", function(){
  expect(3);

  equal( Ember.String.singularize('words'),  'word');
  equal( Ember.String.singularize('oxen'),   'ox');
  equal( Ember.String.singularize('octopi'), 'octopus');
});

test("humanize", function(){
  expect(2);

  equal( Ember.String.humanize(''), '');
  equal( Ember.String.humanize('word_table'), 'Word table');
});

test("titleize", function(){
  equal( Ember.String.titleize('word_table'), 'Word Table');
});

test("capitalize", function(){
  expect(3);

  equal(Ember.String.capitalize(''),'');
  equal(Ember.String.capitalize('word'),'Word');
  equal(Ember.String.capitalize('word table'),'Word table');
});

test("tableize", function(){
  expect(4);

  equal(Ember.String.tableize(''),'');
  equal(Ember.String.tableize('word'),'words');
  equal(Ember.String.tableize('word table'),'word_tables');
  equal(Ember.String.tableize('Word Table'),'word_tables');
});

test("classify", function(){
  expect(4);

  equal(Ember.String.classify(''),'');
  equal(Ember.String.classify('word'),'Word');
  equal(Ember.String.classify('words'),'Word');
  equal(Ember.String.classify('word table'),'WordTable');
});

test("initialize", function(){
  expect(5);

  equal(Ember.String.initialize(''),'');
  equal(Ember.String.initialize('Tom Dale'),'TD');
  equal(Ember.String.initialize('tom dale'),'TD');
  equal(Ember.String.initialize('tom dale premier'),'TDP');
  equal(Ember.String.initialize('tom dale 1er'),'TD');
});
