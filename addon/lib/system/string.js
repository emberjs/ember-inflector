import Inflector from './inflector';

function pluralize(count, word, options = {}) {
  if (arguments.length === 1) {
    return Inflector.inflector.pluralize(count);
  } else {
    if (parseFloat(count) !== 1) {
      word = Inflector.inflector.pluralize(word);
    }

    return options.withoutCount ? word : count + " " + word;
  }
}

function singularize(word) {
  return Inflector.inflector.singularize(word);
}

export {
  pluralize,
  singularize
};
