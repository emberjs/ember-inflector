import { pluralize as pluralize$1 } from 'ember-inflector';
import makeHelper from '../lib/utils/make-helper.js';

/* eslint-disable import/extensions */

/**
 *
 * If you have Ember Inflector (such as if Ember Data is present),
 * pluralize a word. For example, turn "ox" into "oxen".
 *
 * Example:
 *
 * {{pluralize count myProperty}}
 * {{pluralize 1 "oxen"}}
 * {{pluralize myProperty}}
 * {{pluralize "ox"}}
 *
 * @for Ember.HTMLBars.helpers
 * @method pluralize
 * @param {Number|Property} [count] count of objects
 * @param {String|Property} word word to pluralize
 */
var pluralize = makeHelper(function (params, hash) {
  let fullParams = new Array(...params);
  if (fullParams.length === 2) {
    fullParams.push({
      withoutCount: hash['without-count']
    });
  }
  return pluralize$1(...fullParams);
});

export { pluralize as default };
//# sourceMappingURL=pluralize.js.map
