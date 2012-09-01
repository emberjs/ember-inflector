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
  expect(6);

  equal( Ember.String.pluralize('word'),     'words');
  equal( Ember.String.pluralize('ox'),       'oxen');
  equal( Ember.String.pluralize('octopus'),  'octopi');

  equal( 'word'.pluralize(),     'words');
  equal( 'ox'.pluralize(),       'oxen');
  equal( 'octopus'.pluralize(),  'octopi');
});

test("singularize", function(){
  expect(6);

  equal( Ember.String.singularize('words'),  'word');
  equal( Ember.String.singularize('oxen'),   'ox');
  equal( Ember.String.singularize('octopi'), 'octopus');

  equal( 'words'.singularize(),  'word');
  equal( 'oxen'.singularize(),   'ox');
  equal( 'octopi'.singularize(), 'octopus');
});

test("humanize", function(){
  expect(4);

  equal( Ember.String.humanize(''), '');
  equal( Ember.String.humanize('word_table'), 'Word table');

  equal( ''.humanize(), '');
  equal( 'word_table'.humanize(), 'Word table');
});

test("titleize", function(){
  expect(2);

  equal( Ember.String.titleize('word_table'), 'Word Table');
  equal( 'word_table'.titleize(), 'Word Table');
});

test("capitalize", function(){
  expect(6);

  equal(Ember.String.capitalize(''),'');
  equal(Ember.String.capitalize('word'),'Word');
  equal(Ember.String.capitalize('word table'),'Word table');

  equal(''.capitalize(),'');
  equal('word'.capitalize(),'Word');
  equal('word table'.capitalize(),'Word table');
});

test("tableize", function(){
  expect(8);

  equal(Ember.String.tableize(''),'');
  equal(Ember.String.tableize('word'),'words');
  equal(Ember.String.tableize('word table'),'word_tables');
  equal(Ember.String.tableize('Word Table'),'word_tables');

  equal(''.tableize(),'');
  equal('word'.tableize(),'words');
  equal('word table'.tableize(),'word_tables');
  equal('Word Table'.tableize(),'word_tables');
});

test("classify", function(){
  expect(8);

  equal(Ember.String.classify(''),'');
  equal(Ember.String.classify('word'),'Word');
  equal(Ember.String.classify('words'),'Word');
  equal(Ember.String.classify('word table'),'WordTable');

  equal(''.classify(),'');
  equal('word'.classify(),'Word');
  equal('words'.classify(),'Word');
  equal('word table'.classify(),'WordTable');
});
