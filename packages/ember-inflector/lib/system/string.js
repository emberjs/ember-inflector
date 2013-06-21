Ember.String.pluralize = function(word) {
  return Ember.Inflector.inflect(word, Ember.Inflector.rules.plurals);
};

Ember.String.singularize = function(word) {
  return Ember.Inflector.inflect(word, Ember.Inflector.rules.singular);
};

Ember.String.humanize = function(word) {

  var inflected = Ember.Inflector.inflect(word,Ember.Inflector.rules.humans);

  inflected = inflected.replace(Ember.Inflector.KEY_SUFFIX_REGEX,'');
  inflected = inflected.replace(Ember.Inflector.WHITESPACE_REGEX,' ');
  inflected = inflected.replace(/_/g,' ');

  // acronymize?

  return Ember.String.capitalize(inflected);
};

Ember.String.titleize = function(word) {
   var result = Ember.String.humanize(word);

   result = result.
     replace(/\b(?:<!['’`])[a-z]/).
     toLowerCase().
     replace(/^.|\s\S/g, function(a) { return a.toUpperCase(); });

  return result;
};

Ember.String.capitalize = function(word) {
  return word.replace(Ember.Inflector.FIRST_LETTER_REGEX, function(match) {
    return match.toUpperCase();
  });
};

Ember.String.tableize = function(word) {
  return Ember.String.pluralize(Ember.String.underscore(word.toLowerCase()));
};

Ember.String.classify = function(word) {
  return Ember.String.capitalize(Ember.String.camelize(Ember.String.singularize(word)));
};
