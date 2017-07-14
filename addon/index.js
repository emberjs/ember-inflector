import Ember from 'ember';
import {
  Inflector,
  defaultRules,
  pluralize,
  singularize
} from "./lib/system";

Inflector.defaultRules = defaultRules;
Ember.Inflector        = Inflector;

Ember.String.pluralize   = pluralize;
Ember.String.singularize = singularize;

import "./lib/ext/string";

export default Inflector;

export {
  pluralize,
  singularize,
  defaultRules
};
