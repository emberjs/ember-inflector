import { singularize } from 'ember-inflector';
import makeHelper from '../utils/make-helper';

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
export default makeHelper(function (params) {
  return singularize(params[0]);
});
