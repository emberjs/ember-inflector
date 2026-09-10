import Inflector from './inflector.js';

function pluralize(wordOrCount, word, options) {
  return word === undefined ? Inflector.inflector.pluralize(wordOrCount) : Inflector.inflector.pluralize(wordOrCount, word, options);
}
function singularize(word) {
  return Inflector.inflector.singularize(word);
}

export { pluralize, singularize };
//# sourceMappingURL=string.js.map
