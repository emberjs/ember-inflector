import { module, test } from 'qunit';
import { setupRenderingTest } from 'test-app/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | pluralize', function (hooks) {
  setupRenderingTest(hooks);

  test('single arg', async function (assert) {
    this.set('singular', 'ox');
    await render(hbs`{{pluralize this.singular}}`);
    assert.equal(this.element.textContent.trim(), 'oxen');
  });

  test('count 1', async function (assert) {
    this.set('singular', 'opossum');
    await render(hbs`{{pluralize 1 this.singular}}`);
    assert.equal(this.element.textContent.trim(), '1 opossum');
  });

  test('count 2', async function (assert) {
    this.set('singular', 'ocelot');
    await render(hbs`{{pluralize 2 this.singular}}`);
    assert.equal(this.element.textContent.trim(), '2 ocelots');
  });

  test('bound count 1', async function (assert) {
    this.set('count', 1);
    this.set('singular', 'orange');
    await render(hbs`{{pluralize this.count this.singular}}`);
    assert.equal(this.element.textContent.trim(), '1 orange');
  });

  test('bound count 1, without count', async function (assert) {
    this.set('count', 1);
    this.set('singular', 'orange');
    this.set('without-count', true);
    await render(hbs`{{pluralize this.count this.singular without-count=this.without-count}}`);
    assert.equal(this.element.textContent.trim(), 'orange');
  });

  test('bound count 1.0 float', async function (assert) {
    this.set('count', 1.0);
    this.set('singular', 'owl');
    await render(hbs`{{pluralize this.count this.singular}}`);
    assert.equal(this.element.textContent.trim(), '1 owl');
  });

  test('bound count 1.0 float, without count', async function (assert) {
    this.set('count', 1.0);
    this.set('singular', 'owl');
    this.set('without-count', true);
    await render(hbs`{{pluralize this.count this.singular without-count=this.without-count}}`);
    assert.equal(this.element.textContent.trim(), 'owl');
  });

  test('bound count 1.0 float, without-count=false, specifies count and word', async function (assert) {
    this.set('count', 1.0);
    this.set('singular', 'owl');
    this.set('without-count', false);
    await render(hbs`{{pluralize this.count this.singular without-count=this.without-count}}`);
    assert.equal(this.element.textContent.trim(), '1 owl');
  });

  test('bound count 1.5 float', async function (assert) {
    this.set('count', 1.5);
    this.set('singular', 'owl');
    await render(hbs`{{pluralize this.count this.singular}}`);
    assert.equal(this.element.textContent.trim(), '1.5 owls');
  });

  test('bound count 1.5 float, without count', async function (assert) {
    this.set('count', 1.5);
    this.set('singular', 'owl');
    this.set('without-count', true);
    await render(hbs`{{pluralize this.count this.singular without-count=this.without-count}}`);
    assert.equal(this.element.textContent.trim(), 'owls');
  });

  test('bound count 1.0 string', async function (assert) {
    this.set('count', '1.0');
    this.set('singular', 'owl');
    await render(hbs`{{pluralize this.count this.singular}}`);
    assert.equal(this.element.textContent.trim(), '1.0 owl');
  });

  test('bound count 1.0 string, without count', async function (assert) {
    this.set('count', '1.0');
    this.set('singular', 'owl');
    this.set('without-count', true);
    await render(hbs`{{pluralize this.count this.singular without-count=this.without-count}}`);
    assert.equal(this.element.textContent.trim(), 'owl');
  });

  test('bound count 1.5 string', async function (assert) {
    this.set('count', '1.5');
    this.set('singular', 'owl');
    await render(hbs`{{pluralize this.count this.singular}}`);
    assert.equal(this.element.textContent.trim(), '1.5 owls');
  });

  test('bound count 1.5 string, without count', async function (assert) {
    this.set('count', '1.5');
    this.set('singular', 'owl');
    this.set('without-count', true);
    await render(hbs`{{pluralize this.count this.singular without-count=this.without-count}}`);
    assert.equal(this.element.textContent.trim(), 'owls');
  });

  test('bound count 2', async function (assert) {
    this.set('count', 2);
    this.set('singular', 'omnivore');
    await render(hbs`{{pluralize this.count this.singular}}`);
    assert.equal(this.element.textContent.trim(), '2 omnivores');
  });

  test('helpers - bound count 2, without count', async function (assert) {
    this.set('count', 2);
    this.set('singular', 'omnivore');
    this.set('without-count', true);
    await render(hbs`{{pluralize this.count this.singular without-count=this.without-count}}`);
    assert.equal(this.element.textContent.trim(), 'omnivores');
  });
});
