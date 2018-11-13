import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helpers', function(hooks) {
  setupRenderingTest(hooks);

  test("singularize", async function(assert) {
    this.set('plural', 'octopi');
    await render(hbs`{{singularize plural}}`);
    assert.dom('*').hasText('octopus');
  });

  test("pluralize - single arg", async function(assert) {
    this.set('singular', 'ox');
    await render(hbs`{{pluralize singular}}`);
    assert.dom('*').hasText('oxen');
  });

  test("pluralize - count 1", async function(assert) {
    this.set('singular', 'opossum');
    await render(hbs`{{pluralize 1 singular}}`);
    assert.dom('*').hasText('1 opossum');
  });

  test("pluralize - count 2", async function(assert) {
    this.set('singular', 'ocelot');
    await render(hbs`{{pluralize 2 singular}}`);
    assert.dom('*').hasText('2 ocelots');
  });

  test("pluralize - bound count 1", async function(assert) {
    this.set('count', 1);
    this.set('singular', 'orange');
    await render(hbs`{{pluralize count singular}}`);
    assert.dom('*').hasText('1 orange');
  });

  test("pluralize - bound count 1, without count", async function(assert) {
    this.set('count', 1);
    this.set('singular', 'orange');
    this.set('without-count', true);
    await render(hbs`{{pluralize count singular without-count=without-count}}`);
    assert.dom('*').hasText('orange');
  });


  test("pluralize - bound count 1.0 float", async function(assert) {
    this.set('count', 1.0);
    this.set('singular', 'owl');
    await render(hbs`{{pluralize count singular}}`);
    assert.dom('*').hasText('1 owl');
  });

  test("pluralize - bound count 1.0 float, without count", async function(assert) {
    this.set('count', 1.0);
    this.set('singular', 'owl');
    this.set('without-count', true);
    await render(hbs`{{pluralize count singular without-count=without-count}}`);
    assert.dom('*').hasText('owl');
  });


  test("pluralize - bound count 1.0 float, without-count=false, specifies count and word", async function(assert) {
    this.set('count', 1.0);
    this.set('singular', 'owl');
    this.set('without-count', false);
    await render(hbs`{{pluralize count singular without-count=without-count}}`);
    assert.dom('*').hasText('1 owl');
  });


  test("pluralize - bound count 1.5 float", async function(assert) {
    this.set('count', 1.5);
    this.set('singular', 'owl');
    await render(hbs`{{pluralize count singular}}`);
    assert.dom('*').hasText('1.5 owls');
  });


  test("pluralize - bound count 1.5 float, without count", async function(assert) {
    this.set('count', 1.5);
    this.set('singular', 'owl');
    this.set('without-count', true);
    await render(hbs`{{pluralize count singular without-count=without-count}}`);
    assert.dom('*').hasText('owls');
  });



  test("pluralize - bound count 1.0 string", async function(assert) {
    this.set('count', '1.0');
    this.set('singular', 'owl');
    await render(hbs`{{pluralize count singular}}`);
    assert.dom('*').hasText('1.0 owl');
  });


  test("pluralize - bound count 1.0 string, without count", async function(assert) {
    this.set('count', '1.0');
    this.set('singular', 'owl');
    this.set('without-count', true);
    await render(hbs`{{pluralize count singular without-count=without-count}}`);
    assert.dom('*').hasText('owl');
  });

  test("pluralize - bound count 1.5 string", async function(assert) {
    this.set('count', '1.5');
    this.set('singular', 'owl');
    await render(hbs`{{pluralize count singular}}`);
    assert.dom('*').hasText('1.5 owls');
  });

  test("pluralize - bound count 1.5 string, without count", async function(assert) {
    this.set('count', '1.5');
    this.set('singular', 'owl');
    this.set("without-count", true);
    await render(hbs`{{pluralize count singular without-count=without-count}}`);
    assert.dom('*').hasText('owls');
  });

  test("pluralize - bound count 2", async function(assert) {
    this.set('count', 2);
    this.set('singular', 'omnivore');
    await render(hbs`{{pluralize count singular}}`);
    assert.dom('*').hasText('2 omnivores');
  });

  test("helpers - pluralize - bound count 2, without count", async function(assert) {
    this.set('count', 2);
    this.set('singular', 'omnivore');
    this.set('without-count', true);
    await render(hbs`{{pluralize count singular without-count=without-count}}`);
    assert.dom('*').hasText('omnivores');
  });
});
