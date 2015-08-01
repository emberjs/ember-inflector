/* global define, module */

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

if (typeof define !== 'undefined' && define.amd){
  define('ember-inflector', ['exports'], function(__exports__){
    __exports__['default'] = Inflector;
    return Inflector;
  });
} else if (typeof module !== 'undefined' && module['exports']){
  module['exports'] = Inflector;
}
