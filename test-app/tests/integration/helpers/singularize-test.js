import { module, test } from 'qunit';
import { setupRenderingTest } from 'test-app/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | singularize', function (hooks) {
  setupRenderingTest(hooks);

  test('works', async function (assert) {
    this.set('plural', 'octopi');
    await render(hbs`{{singularize this.plural}}`);
    assert.equal(this.element.textContent.trim(), 'octopus');
  });
});
