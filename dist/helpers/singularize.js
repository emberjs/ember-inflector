import { singularize } from '../lib/system/string.js';

/**
 *
 * If you have Ember Inflector (such as if Ember Data is present),
 * singularize a word. For example, turn "oxen" into "ox".
 *
 * Example:
 *
 * {{singularize myProperty}}
 * {{singularize "oxen"}}
 *
 * @for Ember.HTMLBars.helpers
 * @method singularize
 * @param {String|Property} word word to singularize
 */
function singularizeHelper(word) {
  return singularize(word);
}

export { singularizeHelper as default };
//# sourceMappingURL=singularize.js.map
