import {
  singularize,
  pluralize
} from "./system/string";

import registerHelper from './utils/register-helper';

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
registerHelper('singularize', function(params){
  return singularize(params[0]);
});

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
registerHelper('pluralize', function(params) {
  var count, word;

  if (params.length === 1) {
    word = params[0];
    return pluralize(word);
  } else {
    count = params[0];
    word  = params[1];

    if (count !== 1) {
      word = pluralize(word);
    }
    return count + " " + word;
  }
});
