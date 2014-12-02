import {
  Inflector,
  defaultRules,
  pluralize,
  singularize
} from "./system";
import "./helpers";

Inflector.defaultRules = defaultRules;
Ember.Inflector        = Inflector;

Ember.String.pluralize   = pluralize;
Ember.String.singularize = singularize;

import "./ext/string";

export default Inflector;

export {
  pluralize,
  singularize
};

if (typeof 'define' !== 'undefined' && define.amd){
  define('ember-inflector', ['exports'], function(__exports__){
    __exports__['default'] = Inflector;
    return Inflector;
  });
}
