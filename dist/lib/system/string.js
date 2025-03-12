import Inflector from './inflector.js';

/* eslint-disable import/extensions */
function pluralize() {
  return Inflector.inflector.pluralize(...arguments);
}
function singularize(word) {
  return Inflector.inflector.singularize(word);
}

export { pluralize, singularize };
//# sourceMappingURL=string.js.map
