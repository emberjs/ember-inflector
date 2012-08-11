Ember.Inflector = {
  FIRST_LETTER_REGEX: /^\w/,
  WHITESPACE_REGEX: /\s+/,
  KEY_SUFFIX_REGEX: /_id$/,
  BLANK_REGEX: /^\s*$/,

  _CACHE: {},
  cache: function(word, rules, value){
    Ember.Inflector._CACHE[word] = Ember.Inflector._CACHE[word] || {};

    if (value){
      Ember.Inflector._CACHE[word][rules] = value;
    }

    return Ember.Inflector._CACHE[word][rules];
  },

  clearCache: function(){
    Ember.Inflector._CACHE = {};
  },

  clearRules: function(){
    Ember.Inflector.rules.plurals     = [];
    Ember.Inflector.rules.plurals     = [];
    Ember.Inflector.rules.singular    = [];
    Ember.Inflector.rules.humans      = [];
    Ember.Inflector.rules.uncountable = {};
    Ember.Inflector.rules.irregular   = {};
    Ember.Inflector.rules.irregularInverse = {};
  },

  rules: {
    plurals:  [],
    singular: [],
    humans:   [],
    irregular: {},
    irregularInverse: {},
    uncountable: {},
    ordinalization: {
      'default': 'th',
      0:  '',
      1:  'st',
      2:  'nd',
      3:  'rd',
      11: 'th',
      12: 'th',
      13: 'th'
    }
  },

  reset: function(){
    Ember.Inflector.clearCache();
    Ember.Inflector.clearRules();
  },

  plural: function(rule,substituion){
    Ember.Inflector.rules.plurals.addObject([rule, substituion]);
  },

  singular: function(rule,substituion){
    Ember.Inflector.rules.singular.addObject([rule, substituion]);
  },

  human: function(rule,substituion){
    Ember.Inflector.rules.humans.addObject([rule, substituion]);
  },

  irregular: function(rule,substituion){
    Ember.Inflector.rules.irregular[rule] = substituion;
    Ember.Inflector.rules.irregularInverse[substituion] = rule;
  },

  uncountable: function(uncountable) {
    uncountable.forEach(function(word) {
      Ember.Inflector.rules.uncountable[word] = true;
    });
  },

  inflect: function(word, rules) {
    var inflection, substitution, result, lowercase,
    isCached, isIrregular, isIrregularInverse, rule;

    if (Ember.Inflector.BLANK_REGEX.test(word)){
      return word;
    }

    lowercase = word.toLowerCase();

    isCached =  Ember.Inflector.cache(lowercase,rules);
    if (isCached){
      // cached
      return isCached;
    }

    if (Ember.Inflector.rules.uncountable[lowercase]){
      // uncountable
      return word;
    }

    isIrregular = Ember.Inflector.rules.irregular[lowercase];

    if (isIrregular){
      // irregular
      return isIrregular;
    }

    isIrregularInverse = Ember.Inflector.rules.irregularInverse[lowercase];

    if (isIrregularInverse){
      // irregular
      return isIrregularInverse;
    }

    inflection = rules.find(function(inflection) {
      var rule = inflection[0];

      return rule.test(word);
    });

    inflection = inflection || [];

    rule = inflection[0];
    substitution = inflection[1];

    result = word.replace(rule,substitution);

    Ember.Inflector.cache(lowercase,rules,result);
    return result;

  },

  ordinal: function(number) {
    number = parseInt(number,10);
    number = Math.abs(number);

    if (number > 10 && number < 14){
      number %= 100;
    } else {
      number %= 10;
    }

    var ordinalization = Ember.Inflector.rules.ordinalization;

    return ordinalization[number] || ordinalization['default'];
  }
};
