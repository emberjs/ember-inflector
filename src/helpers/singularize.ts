import { singularize } from '../lib/system/string.ts';

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
export default function singularizeHelper(word: string): string {
  return singularize(word);
}
