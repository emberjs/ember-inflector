import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ember-inflector', 'Integration | Helpers', {
  integration: true
});

test("singularize", function(assert) {
  this.set('plural', 'octopi');
  this.render(hbs`{{singularize plural}}`);
  assert.equal(this.$().text(), 'octopus');
});

test("pluralize - single arg", function(assert) {
  this.set('singular', 'ox');
  this.render(hbs`{{pluralize singular}}`);
  assert.equal(this.$().text(), 'oxen');
});

test("pluralize - count 1", function(assert) {
  this.set('singular', 'opossum');
  this.render(hbs`{{pluralize 1 singular}}`);
  assert.equal(this.$().text(), '1 opossum');
});

test("pluralize - count 2", function(assert) {
  this.set('singular', 'ocelot');
  this.render(hbs`{{pluralize 2 singular}}`);
  assert.equal(this.$().text(), '2 ocelots');
});

test("pluralize - bound count 1", function(assert) {
  this.set('count', 1);
  this.set('singular', 'orange');
  this.render(hbs`{{pluralize count singular}}`);
  assert.equal(this.$().text(), '1 orange');
});

test("pluralize - bound count 1, without count", function(assert) {
  this.set('count', 1);
  this.set('singular', 'orange');
  this.set('without-count', true);
  this.render(hbs`{{pluralize count singular without-count=without-count}}`);
  assert.equal(this.$().text(), 'orange');
});


test("pluralize - bound count 1.0 float", function(assert) {
  this.set('count', 1.0);
  this.set('singular', 'owl');
  this.render(hbs`{{pluralize count singular}}`);
  assert.equal(this.$().text(), '1 owl');
});

test("pluralize - bound count 1.0 float, without count", function(assert) {
  this.set('count', 1.0);
  this.set('singular', 'owl');
  this.set('without-count', true);
  this.render(hbs`{{pluralize count singular without-count=without-count}}`);
  assert.equal(this.$().text(), 'owl');
});


test("pluralize - bound count 1.0 float, without-count=false, specifies count and word", function(assert) {
  this.set('count', 1.0);
  this.set('singular', 'owl');
  this.set('without-count', false);
  this.render(hbs`{{pluralize count singular without-count=without-count}}`);
  assert.equal(this.$().text(), '1 owl');
});


test("pluralize - bound count 1.5 float", function(assert) {
  this.set('count', 1.5);
  this.set('singular', 'owl');
  this.render(hbs`{{pluralize count singular}}`);
  assert.equal(this.$().text(), '1.5 owls');
});


test("pluralize - bound count 1.5 float, without count", function(assert) {
  this.set('count', 1.5);
  this.set('singular', 'owl');
  this.set('without-count', true);
  this.render(hbs`{{pluralize count singular without-count=without-count}}`);
  assert.equal(this.$().text(), 'owls');
});



test("pluralize - bound count 1.0 string", function(assert) {
  this.set('count', '1.0');
  this.set('singular', 'owl');
  this.render(hbs`{{pluralize count singular}}`);
  assert.equal(this.$().text(), '1.0 owl');
});


test("pluralize - bound count 1.0 string, without count", function(assert) {
  this.set('count', '1.0');
  this.set('singular', 'owl');
  this.set('without-count', true);
  this.render(hbs`{{pluralize count singular without-count=without-count}}`);
  assert.equal(this.$().text(), 'owl');
});

test("pluralize - bound count 1.5 string", function(assert) {
  this.set('count', '1.5');
  this.set('singular', 'owl');
  this.render(hbs`{{pluralize count singular}}`);
  assert.equal(this.$().text(), '1.5 owls');
});

test("pluralize - bound count 1.5 string, without count", function(assert) {
  this.set('count', '1.5');
  this.set('singular', 'owl');
  this.set("without-count", true);
  this.render(hbs`{{pluralize count singular without-count=without-count}}`);
  assert.equal(this.$().text(), 'owls');
});

test("pluralize - bound count 2", function(assert) {
  this.set('count', 2);
  this.set('singular', 'omnivore');
  this.render(hbs`{{pluralize count singular}}`);
  assert.equal(this.$().text(), '2 omnivores');
});

test("helpers - pluralize - bound count 2, without count", function(assert) {
  this.set('count', 2);
  this.set('singular', 'omnivore');
  this.set('without-count', true);
  this.render(hbs`{{pluralize count singular without-count=without-count}}`);
  assert.equal(this.$().text(), 'omnivores');
});
