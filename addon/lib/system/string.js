import Inflector from './inflector';

function pluralize() {
  return Inflector.inflector.pluralize(...arguments);
}

function singularize(word) {
  return Inflector.inflector.singularize(word);
}

export {
  pluralize,
  singularize
};
