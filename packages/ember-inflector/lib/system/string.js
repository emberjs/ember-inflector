Ember.String.pluralize = function(word) {
  return Ember.Inflector.inflect(word, Ember.Inflector.rules.plurals);
};
String.prototype.pluralize = function() {
  return Ember.String.pluralize(this, arguments);
};

Ember.String.singularize = function(word) {
  return Ember.Inflector.inflect(word, Ember.Inflector.rules.singular);
};
String.prototype.singularize = function() {
  return Ember.String.singularize(this, arguments);
};


Ember.String.humanize = function(word) {

  var inflected = Ember.Inflector.inflect(word,Ember.Inflector.rules.humans);

  inflected = inflected.replace(Ember.Inflector.KEY_SUFFIX_REGEX,'');
  inflected = inflected.replace(Ember.Inflector.WHITESPACE_REGEX,' ');
  inflected = inflected.replace(/_/g,' ');

  // acronymize?

  return Ember.String.capitalize(inflected);
};
String.prototype.humanize = function() {
  return Ember.String.humanize(this, arguments);
};

Ember.String.titleize = function(word) {
   var result = Ember.String.humanize(word);

   result = result.
     replace(/\b(?:<!['’`])[a-z]/).
     toLowerCase().
     replace(/^.|\s\S/g, function(a) { return a.toUpperCase(); });

  return result;
};
String.prototype.titleize = function() {
  return Ember.String.titleize(this, arguments);
};

Ember.String.capitalize = function(word) {
  return word.replace(Ember.Inflector.FIRST_LETTER_REGEX, function(match) {
    return match.toUpperCase();
  });
};
String.prototype.capitalize = function() {
  return Ember.String.capitalize(this, arguments);
};

Ember.String.tableize = function(word) {
  return Ember.String.pluralize(Ember.String.underscore(word.toLowerCase()));
};
String.prototype.tableize = function() {
  return Ember.String.tableize(this, arguments);
};

Ember.String.classify = function(word) {
  return Ember.String.capitalize(Ember.String.camelize(Ember.String.singularize(word)));
};
String.prototype.classify = function() {
  return Ember.String.classify(this, arguments);
};
