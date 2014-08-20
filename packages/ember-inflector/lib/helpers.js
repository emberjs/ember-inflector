import {singularize, pluralize} from "./system/string";

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
 * @for Ember.Handlebars.helpers
 * @method singularize
 * @param {String|Property} word word to singularize
*/
Ember.Handlebars.helper('singularize', singularize);

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
 * @for Ember.Handlebars.helpers
 * @method pluralize
 * @param {Number|Property|} [count] count of objects
 * @param {String|Property} word word to pluralize
*/
Ember.Handlebars.helper('pluralize', function(count, word, options) {
  if(arguments.length < 3) {
    return pluralize(count);
  } else {
    /* jshint eqeqeq: false */
    if(count != 1) {
      /* jshint eqeqeq: true */
      word = pluralize(word);
    }
    return count + " " + word;
  }
});
