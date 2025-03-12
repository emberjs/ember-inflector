import { singularize as singularize$1 } from 'ember-inflector';
import makeHelper from '../lib/utils/make-helper.js';

/* eslint-disable import/extensions */

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
var singularize = makeHelper(function (params) {
  return singularize$1(params[0]);
});

export { singularize as default };
//# sourceMappingURL=singularize.js.map
