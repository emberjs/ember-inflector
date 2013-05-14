module("ember-inflector.integration (String.prototype)",{
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

  equal( 'word'.pluralize(),     'words');
  equal( 'ox'.pluralize(),       'oxen');
  equal( 'octopus'.pluralize(),  'octopi');
});

test("singularize", function(){
  expect(3);

  equal( 'words'.singularize(),  'word');
  equal( 'oxen'.singularize(),   'ox');
  equal( 'octopi'.singularize(), 'octopus');
});

test("humanize", function(){
  expect(2);

  equal( ''.humanize(), '');
  equal( 'word_table'.humanize(), 'Word table');
});

test("titleize", function(){
  expect(1);

  equal( 'word_table'.titleize(), 'Word Table');
});

test("capitalize", function(){
  expect(3);

  equal(''.capitalize(),'');
  equal('word'.capitalize(),'Word');
  equal('word table'.capitalize(),'Word table');
});

test("tableize", function(){
  expect(4);

  equal(''.tableize(),'');
  equal('word'.tableize(),'words');
  equal('word table'.tableize(),'word_tables');
  equal('Word Table'.tableize(),'word_tables');
});
