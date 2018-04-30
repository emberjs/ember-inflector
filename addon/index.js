import Ember from 'ember';
import {
  Inflector,
  defaultRules,
  pluralize,
  singularize
} from "./lib/system";

import { deprecate } from '@ember/application/deprecations';

Inflector.defaultRules = defaultRules;

Object.defineProperty(Ember, 'Inflector', {
  get() {
    deprecate(`Ember.Inflector is deprecated. Please explicitly: import Inflector from 'ember-inflector';`, false, {
      id: 'ember-inflector.globals',
      until: '3.0.0',
    });

    return Inflector;
  },
});

Object.defineProperty(Ember.String, 'singularize', {
  get() {
    deprecate(`Ember.String.singularize() is deprecated. Please explicitly: import { singularize } from 'ember-inflector';`, false, {
      id: 'ember-inflector.globals',
      until: '3.0.0',
    });

    return singularize;
  },
});

Object.defineProperty(Ember.String, 'pluralize', {
  get() {
    deprecate(`Ember.String.pluralize() is deprecated. Please explicitly: import { pluralize } from 'ember-inflector';`, false, {
      id: 'ember-inflector.globals',
      until: '3.0.0',
    });

    return pluralize;
  },
});

import "./lib/ext/string";

export default Inflector;

export {
  pluralize,
  singularize,
  defaultRules
};
