import Inflector from "ember-inflector/system/inflector";

function pluralize(word) {
  return Inflector.inflector.pluralize(word);
};

function singularize(word) {
  return Inflector.inflector.singularize(word);
};

export {pluralize, singularize};
