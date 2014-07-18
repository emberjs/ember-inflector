import {
  Inflector,
  defaultRules,
  pluralize,
  singularize
} from "ember-inflector/system";

Inflector.defaultRules = defaultRules;
Ember.Inflector        = Inflector;

Ember.String.pluralize   = pluralize;
Ember.String.singularize = singularize;

import "ember-inflector/ext/string";

export default Inflector;

export {
  pluralize,
  singularize
};
