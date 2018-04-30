import Ember from 'ember';
import {
  pluralize,
  singularize
} from '../system/string';
import { deprecate } from '@ember/application/deprecations';

if (Ember.ENV.EXTEND_PROTOTYPES === true || Ember.ENV.EXTEND_PROTOTYPES.String) {
  /**
    See {{#crossLink "Ember.String/pluralize"}}{{/crossLink}}

    @method pluralize
    @for String
  */
  Object.defineProperty(String.prototype, 'pluralize', {
    get() {
      deprecate(`String.prototype.pluralize() is deprecated. Please explicitly: import { pluralize } from 'ember-inflector';`, false, {
        id: 'ember-inflector.globals',
        until: '3.0.0',
      });

      return function() {
        return pluralize(this);
      };
    },
  });

  /**
    See {{#crossLink "Ember.String/singularize"}}{{/crossLink}}

    @method singularize
    @for String
  */
  Object.defineProperty(String.prototype, 'singularize', {
    get() {
      deprecate(`String.prototype.singularize() is deprecated. Please explicitly: import { singularize } from 'ember-inflector';`, false, {
        id: 'ember-inflector.globals',
        until: '3.0.0',
      });

      return function() {
        return singularize(this);
      };
    },
  });
}
