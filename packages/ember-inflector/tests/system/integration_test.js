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
  equal(Ember.String.pluralize('octopus'),  'octopodes');
});

test("singularize", function(){
  expect(3);

  equal(Ember.String.singularize('words'),  'word');
  equal(Ember.String.singularize('oxen'),   'ox');
  equal(Ember.String.singularize('octopodes'), 'octopus');
});

module("ember-inflector.integration - Handlebars Helpers", {

  setup: function(){
    Ember.lookup = lookup = {Ember: Ember};
    run(function(){
      view = Ember.View.create({
        template: Ember.Handlebars.compile("{{singularize plural}} {{pluralize single}} {{pluralize 1 singleArg}} {{pluralize 2 multiple}} {{pluralize one boundSingle}} {{pluralize oneString boundSingleString}} {{pluralize two boundMultiple}}"),
        context: {
          plural: "octopodes",
          single: "ox",
          singleArg: "opossums",
          multiple: "ocelot",
          one: 1,
          two: 2,
          oneString: "1.0",
          boundSingle: "oranges",
          boundSingleString: "owls",
          boundMultiple: "omnivore"
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

test("helpers - pluralize - single arg", function(){
  ok(text.match(/oxen/));
});

test("helpers - pluralize - one", function(){
  ok(text.match(/1 opossum/), text);
});

test("helpers - pluralize - multiple", function(){
  ok(text.match(/2 ocelots/));
});

test("helpers - pluralize - boundSingle", function(){
  ok(text.match(/1 orange/));
});

test("helpers - pluralize - boundSingle - string", function(){
  ok(text.match(/1.0 owl/));
});

test("helpers - pluralize - boundMultiple", function(){
  ok(text.match(/2 omnivores/));
});
