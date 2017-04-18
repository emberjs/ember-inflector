import { pluralize } from 'ember-inflector';
import makeHelper from '../utils/make-helper';

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
export default makeHelper(function (params, hash) {
  let count, word,withoutCount=false;

  if (params.length === 1) {
    word = params[0];
    return pluralize(word);
  } else {
    count = params[0];
    word  = params[1];

    if(hash["without-count"]){
      withoutCount = hash["without-count"];
    }

    if (parseFloat(count) !== 1) {
      word = pluralize(word);
    }

    return withoutCount ? word : count + " " + word;
  }
});
