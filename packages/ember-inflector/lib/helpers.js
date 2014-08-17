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
 * {{pluralize myProperty}}
 * {{pluralize "oxen"}}
 *
 * @for Ember.Handlebars.helpers
 * @method pluralize
 * @param {String|Property} word word to pluralize
*/
Ember.Handlebars.helper('pluralize', pluralize);
