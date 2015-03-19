import Ember from 'ember';
import {
  module,
  test,
} from 'qunit';

var run = Ember.run;
var view, lookup, text;
var originalLookup = Ember.lookup;
var isHTMLBars = !!Ember.HTMLBars;

function appendView(view) {
  run(function() { view.appendTo('#qunit-fixture'); });
}

module("ember-inflector.integration");

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

module("ember-inflector.integration - " + (isHTMLBars ? "HTMLBars" : "Handlebars") + " Helpers", {
  setup: function(){
    Ember.lookup = lookup = {Ember: Ember};
    var compile = (Ember.HTMLBars || Ember.Handlebars).compile;

    run(function(){
      view = Ember.View.create({
        template: compile("{{singularize plural}} {{pluralize single}} {{pluralize 1 singleArg}} {{pluralize 2 multiple}} {{pluralize one boundSingle}} {{pluralize oneString boundSingleString}} {{pluralize two boundMultiple}}"),
        context: {
          plural: "octopi",
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

test("helpers - singularize", function(assert) {
  assert.ok(text.match(/octopus/));
});

test("helpers - pluralize - single arg", function(assert) {
  assert.ok(text.match(/oxen/));
});

test("helpers - pluralize - one", function(assert) {
  assert.ok(text.match(/1 opossum/), text);
});

test("helpers - pluralize - multiple", function(assert) {
  assert.ok(text.match(/2 ocelots/));
});

test("helpers - pluralize - boundSingle", function(assert) {
  assert.ok(text.match(/1 orange/));
});

test("helpers - pluralize - boundSingle - string", function(assert) {
  assert.ok(text.match(/1.0 owl/));
});

test("helpers - pluralize - boundMultiple", function(assert) {
  assert.ok(text.match(/2 omnivores/));
});
