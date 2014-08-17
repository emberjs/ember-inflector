var run = Ember.run;
var view, lookup, text;
var originalLookup = Ember.lookup;

function appendView(view) {
  run(function() { view.appendTo('#qunit-fixture'); });
}

module("ember-inflector.integration");

test("pluralize", function(){
  expect(3);

  equal(Ember.String.pluralize('word'),     'words');
  equal(Ember.String.pluralize('ox'),       'oxen');
  equal(Ember.String.pluralize('octopus'),  'octopi');
});

test("singularize", function(){
  expect(3);

  equal(Ember.String.singularize('words'),  'word');
  equal(Ember.String.singularize('oxen'),   'ox');
  equal(Ember.String.singularize('octopi'), 'octopus');
});

module("ember-inflector.integration - Handlebars Helpers", {

  setup: function(){
    Ember.lookup = lookup = {Ember: Ember};
    run(function(){
      view = Ember.View.create({
        template: Ember.Handlebars.compile("{{singularize plural}} {{pluralize single}}"),
        context: {
          plural: "octopi",
          single: "ox"
        }
      });

      appendView(view);
      text = $("#qunit-fixture").text();
    });
  },

  teardown: function(){
    run(view, 'destroy');
    Ember.lookup = originalLookup;
  }
});

test("helpers - singularize", function(){
  ok(text.match(/octopus/));
});

test("helpers - pluralize", function(){
  ok(text.match(/oxen/));
});
