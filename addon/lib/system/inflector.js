import { capitalize } from '@ember/string';
import defaultRules from "./inflections";

const BLANK_REGEX = /^\s*$/;
const LAST_WORD_DASHED_REGEX = /([\w/-]+[_/\s-])([a-z\d]+$)/;
const LAST_WORD_CAMELIZED_REGEX = /([\w/\s-]+)([A-Z][a-z\d]*$)/;
const CAMELIZED_REGEX = /[A-Z][a-z\d]*$/;

function loadUncountable(rules, uncountable) {
  for (let i = 0, length = uncountable.length; i < length; i++) {
    rules.uncountable[uncountable[i].toLowerCase()] = true;
  }
}

function loadIrregular(rules, irregularPairs) {
  let pair;

  for (let i = 0, length = irregularPairs.length; i < length; i++) {
    pair = irregularPairs[i];

    //pluralizing
    rules.irregular[pair[0].toLowerCase()] = pair[1];
    rules.irregular[pair[1].toLowerCase()] = pair[1];

    //singularizing
    rules.irregularInverse[pair[1].toLowerCase()] = pair[0];
    rules.irregularInverse[pair[0].toLowerCase()] = pair[0];
  }
}

/**
  Inflector.Ember provides a mechanism for supplying inflection rules for your
  application. Ember includes a default set of inflection rules, and provides an
  API for providing additional rules.

  Examples:

  Creating an inflector with no rules.

  ```js
  var inflector = new Ember.Inflector();
  ```

  Creating an inflector with the default ember ruleset.

  ```js
  var inflector = new Ember.Inflector(Ember.Inflector.defaultRules);

  inflector.pluralize('cow'); //=> 'kine'
  inflector.singularize('kine'); //=> 'cow'
  ```

  Creating an inflector and adding rules later.

  ```javascript
  var inflector = Ember.Inflector.inflector;

  inflector.pluralize('advice'); // => 'advices'
  inflector.uncountable('advice');
  inflector.pluralize('advice'); // => 'advice'

  inflector.pluralize('formula'); // => 'formulas'
  inflector.irregular('formula', 'formulae');
  inflector.pluralize('formula'); // => 'formulae'

  // you would not need to add these as they are the default rules
  inflector.plural(/$/, 's');
  inflector.singular(/s$/i, '');
  ```

  Creating an inflector with a nondefault ruleset.

  ```javascript
  var rules = {
    plurals:  [
      [ /$/, 's' ]
    ],
    singular: [
      [ /\s$/, '' ]
    ],
    irregularPairs: [
      [ 'cow', 'kine' ]
    ],
    uncountable: [ 'fish' ]
  };

  var inflector = new Ember.Inflector(rules);
  ```

  @class Inflector
  @namespace Ember
*/
function Inflector(ruleSet) {
  ruleSet = ruleSet || {};
  ruleSet.uncountable = ruleSet.uncountable || makeDictionary();
  ruleSet.irregularPairs = ruleSet.irregularPairs || makeDictionary();

  const rules = this.rules = {
    plurals:  ruleSet.plurals || [],
    singular: ruleSet.singular || [],
    irregular: makeDictionary(),
    irregularInverse: makeDictionary(),
    uncountable: makeDictionary()
  };

  loadUncountable(rules, ruleSet.uncountable);
  loadIrregular(rules, ruleSet.irregularPairs);

  this.enableCache();
}

if (!Object.create && !Object.create(null).hasOwnProperty) {
  throw new Error("This browser does not support Object.create(null), please polyfil with es5-sham: http://git.io/yBU2rg");
}

function makeDictionary() {
  var cache = Object.create(null);
  cache['_dict'] = null;
  delete cache['_dict'];
  return cache;
}

Inflector.prototype = {
  /**
    @public

    As inflections can be costly, and commonly the same subset of words are repeatedly
    inflected an optional cache is provided.

    @method enableCache
  */
  enableCache() {
    this.purgeCache();

    this.singularize = function(word) {
      this._cacheUsed = true;
      return this._sCache[word] || (this._sCache[word] = this._singularize(word));
    };

    this.pluralize = function(numberOrWord, word, options = {}) {
      this._cacheUsed = true;
      var cacheKey = [numberOrWord, word, options.withoutCount]
      return this._pCache[cacheKey] || (this._pCache[cacheKey] = this._pluralize(numberOrWord, word, options));
    };
  },

  /**
    @public

    @method purgeCache
  */
  purgeCache() {
    this._cacheUsed = false;
    this._sCache = makeDictionary();
    this._pCache = makeDictionary();
  },

  /**
    @public
    disable caching

    @method disableCache;
  */
  disableCache() {
    this._sCache = null;
    this._pCache = null;
    this.singularize = function(word) {
      return this._singularize(word);
    };

    this.pluralize = function() {
      return this._pluralize(...arguments);
    };
  },

  /**
    @method plural
    @param {RegExp} regex
    @param {String} string
  */
  plural(regex, string) {
    if (this._cacheUsed) { this.purgeCache(); }
    this.rules.plurals.push([regex, string.toLowerCase()]);
  },

  /**
    @method singular
    @param {RegExp} regex
    @param {String} string
  */
  singular(regex, string) {
    if (this._cacheUsed) { this.purgeCache(); }
    this.rules.singular.push([regex, string.toLowerCase()]);
  },

  /**
    @method uncountable
    @param {String} regex
  */
  uncountable(string) {
    if (this._cacheUsed) { this.purgeCache(); }
    loadUncountable(this.rules, [string.toLowerCase()]);
  },

  /**
    @method irregular
    @param {String} singular
    @param {String} plural
  */
  irregular(singular, plural) {
    if (this._cacheUsed) { this.purgeCache(); }
    loadIrregular(this.rules, [[singular, plural]]);
  },

  /**
    @method pluralize
    @param {String} word
  */
  pluralize() {
    return this._pluralize(...arguments);
  },

  _pluralize(wordOrCount, word, options = {}) {
    if (word === undefined) {
     return this.inflect(wordOrCount, this.rules.plurals, this.rules.irregular);
    }

    if (parseFloat(wordOrCount) !== 1) {
      word = this.inflect(word, this.rules.plurals, this.rules.irregular);
    }

    return options.withoutCount ? word : `${wordOrCount} ${word}`;
  },

  /**
    @method singularize
    @param {String} word
  */
  singularize(word) {
    return this._singularize(word);
  },

  _singularize(word) {
    return this.inflect(word, this.rules.singular,  this.rules.irregularInverse);
  },

  /**
    @protected

    @method inflect
    @param {String} word
    @param {Object} typeRules
    @param {Object} irregular
  */
  inflect(word, typeRules, irregular) {
    let inflection, substitution, result, lowercase, wordSplit,
      lastWord, isBlank, isCamelized, rule, isUncountable;

    isBlank = !word || BLANK_REGEX.test(word);
    isCamelized = CAMELIZED_REGEX.test(word);

    if (isBlank) {
      return word;
    }

    lowercase = word.toLowerCase();
    wordSplit = LAST_WORD_DASHED_REGEX.exec(word) || LAST_WORD_CAMELIZED_REGEX.exec(word);

    if (wordSplit){
      lastWord = wordSplit[2].toLowerCase();
    }

    isUncountable = this.rules.uncountable[lowercase] || this.rules.uncountable[lastWord];

    if (isUncountable) {
      return word;
    }

    for (rule in irregular) {
      if (lowercase.match(rule+"$")) {
        substitution = irregular[rule];

        if (isCamelized && irregular[lastWord]) {
          substitution = capitalize(substitution);
          rule = capitalize(rule);
        }

        return word.replace(new RegExp(rule, 'i'), substitution);
      }
    }

    for (var i = typeRules.length, min = 0; i > min; i--) {
      inflection = typeRules[i-1];
      rule = inflection[0];

      if (rule.test(word)) {
        break;
      }
    }

    inflection = inflection || [];

    rule = inflection[0];
    substitution = inflection[1];

    result = word.replace(rule, substitution);

    return result;
  }
};

Inflector.defaultRules = defaultRules;
Inflector.inflector = new Inflector(defaultRules);

export default Inflector;
