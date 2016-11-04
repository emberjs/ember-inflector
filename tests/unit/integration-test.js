import Ember from 'ember';
import { module } from 'qunit';
import { test, moduleForComponent } from "ember-qunit";

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

moduleForComponent("ember-inflector.integration - " + (!!Ember.HTMLBar ? "HTMLBars" : "Handlebars") + " Helpers", {
  integration: true
});

test("helpers - singularize", function(assert) {
  this.set('plural', 'octopi');
  this.render('{{singularize plural}}');
  assert.equal(this.$().text(), 'octopus');
});

test("helpers - pluralize - single arg", function(assert) {
  this.set('singular', 'ox');
  this.render('{{pluralize singular}}');
  assert.equal(this.$().text(), 'oxen');
});

test("helpers - pluralize - count 1", function(assert) {
  this.set('singular', 'opossum');
  this.render('{{pluralize 1 singular}}');
  assert.equal(this.$().text(), '1 opossum');
});

test("helpers - pluralize - count 2", function(assert) {
  this.set('singular', 'ocelot');
  this.render('{{pluralize 2 singular}}');
  assert.equal(this.$().text(), '2 ocelots');
});

test("helpers - pluralize - bound count 1", function(assert) {
  this.set('count', 1);
  this.set('singular', 'orange');
  this.render('{{pluralize count singular}}');

  assert.equal(this.$().text(), '1 orange');
});

test("helpers - pluralize - bound count 1, without count", function(assert) {
  this.set('count', 1);
  this.set('singular', 'orange');
  this.set('withoutCount', true);
  this.render('{{pluralize count singular withoutCount=withoutCount}}');
  assert.equal(this.$().text(), 'orange');
});

test("helpers - pluralize - bound count 1.0 float", function(assert) {
  this.set('count', 1.0);
  this.set('singular', 'owl');
  this.render('{{pluralize count singular}}');
  assert.equal(this.$().text(), '1 owl');
});


test("helpers - pluralize - bound count 1.0 float, without count", function(assert) {
  this.set('count', 1.0);
  this.set('singular', 'owl');
  this.set('withoutCount', true);
  this.render('{{pluralize count singular withoutCount=withoutCount}}');
  assert.equal(this.$().text(), 'owl');
});


test("helpers - pluralize - bound count 1.0 float, withoutCount=false, specifies count and word", function(assert) {
  this.set('count', 1.0);
  this.set('singular', 'owl');
  this.set('withoutCount', false);
  this.render('{{pluralize count singular withoutCount=withoutCount}}');
  assert.equal(this.$().text(), '1 owl');
});

test("helpers - pluralize - bound count 1.5 float", function(assert) {
  this.set('count', 1.5);
  this.set('singular', 'owl');
  this.render('{{pluralize count singular}}');
  assert.equal(this.$().text(), '1.5 owls');
});

test("helpers - pluralize - bound count 1.5 float, without count", function(assert) {
  this.set('count', 1.5);
  this.set('singular', 'owl');
  this.set('withoutCount', true);
  this.render('{{pluralize count singular withoutCount=withoutCount}}');
  assert.equal(this.$().text(), 'owls');
});

test("helpers - pluralize - bound count 1.0 string", function(assert) {
  this.set('count', '1.0');
  this.set('singular', 'owl');
  this.render('{{pluralize count singular}}');
  assert.equal(this.$().text(), '1.0 owl');
});

test("helpers - pluralize - bound count 1.0 string, without count", function(assert) {
  this.set('count', '1.0');
  this.set('singular', 'owl');
  this.set('withoutCount', true);
  this.render('{{pluralize count singular withoutCount=withoutCount}}');
  assert.equal(this.$().text(), 'owl');
});


test("helpers - pluralize - bound count 1.5 string", function(assert) {
  this.set('count', '1.5');
  this.set('singular', 'owl');
  this.render('{{pluralize count singular}}');
  assert.equal(this.$().text(), '1.5 owls');
});


test("helpers - pluralize - bound count 1.5 string, without count", function(assert) {
  this.set('count', '1.5');
  this.set('singular', 'owl');
  this.set("withoutCount", true);
  this.render('{{pluralize count singular withoutCount=withoutCount}}');
  assert.equal(this.$().text(), 'owls');
});

test("helpers - pluralize - bound count 2", function(assert) {
  this.set('count', 2);
  this.set('singular', 'omnivore');
  this.render('{{pluralize count singular}}');
  assert.equal(this.$().text(), '2 omnivores');
});

test("helpers - pluralize - bound count 2, without count", function(assert) {
  this.set('count', 2);
  this.set('singular', 'omnivore');
  this.set('withoutCount', true);
  this.render('{{pluralize count singular withoutCount=withoutCount}}');
  assert.equal(this.$().text(), 'omnivores');
});
