import Inflector from "ember-inflector/system/inflector";
import {pluralize, singularize} from "ember-inflector/system/string";
import defaultRules from "ember-inflector/system/inflections";

Inflector.inflector = new Inflector(defaultRules);

export {
  Inflector,
  singularize,
  pluralize,
  defaultRules
};
