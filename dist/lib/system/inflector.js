import { defaultRules } from './inflections.js';

/**
 * A single inflection rule: the pattern to match, and its replacement.
 */

/**
 * The singular and plural forms of a word that does not follow the rules.
 */

/**
 * The rules an `Inflector` is created with.
 */

/**
 * The normalized rules an `Inflector` inflects with.
 */

const BLANK_REGEX = /^\s*$/;
const LAST_WORD_DASHED_REGEX = /([\w/-]+[_/\s-])([a-z\d]+$)/;
const LAST_WORD_CAMELIZED_REGEX = /([\w/\s-]+)([A-Z][a-z\d]*$)/;
const CAMELIZED_REGEX = /[A-Z][a-z\d]*$/;
const CAPITALIZE_REGEX = /(^|\/)([a-z\u00C0-\u024F])/g;
function capitalize(str) {
  return str.replace(CAPITALIZE_REGEX, match => match.toUpperCase());
}
function makeDictionary() {
  const cache = Object.create(null);
  cache['_dict'] = null;
  delete cache['_dict'];
  return cache;
}
function loadUncountable(rules, uncountable) {
  for (const word of uncountable) {
    rules.uncountable[word.toLowerCase()] = true;
  }
}
function loadIrregular(rules, irregularPairs) {
  for (const pair of irregularPairs) {
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
class Inflector {
  static defaultRules = defaultRules;
  static inflector = new Inflector(defaultRules);
  rules;
  _cacheUsed = false;
  _sCache = null;
  _pCache = null;
  constructor(ruleSet = {}) {
    const rules = this.rules = {
      plurals: ruleSet.plurals ?? [],
      singular: ruleSet.singular ?? [],
      irregular: makeDictionary(),
      irregularInverse: makeDictionary(),
      uncountable: makeDictionary()
    };
    loadUncountable(rules, ruleSet.uncountable ?? []);
    loadIrregular(rules, ruleSet.irregularPairs ?? []);
    this.enableCache();
  }

  /**
    @public
     As inflections can be costly, and commonly the same subset of words are repeatedly
    inflected an optional cache is provided.
     @method enableCache
  */
  enableCache() {
    this.purgeCache();
    this.singularize = word => {
      this._cacheUsed = true;
      const cache = this._sCache ??= makeDictionary();
      return cache[word] || (cache[word] = this._singularize(word));
    };
    this.pluralize = (numberOrWord, word, options = {}) => {
      this._cacheUsed = true;
      const cache = this._pCache ??= makeDictionary();
      const cacheKey = String([numberOrWord, word, options.withoutCount]);
      return cache[cacheKey] || (cache[cacheKey] = this._pluralize(numberOrWord, word, options));
    };
  }

  /**
    @public
     @method purgeCache
  */
  purgeCache() {
    this._cacheUsed = false;
    this._sCache = makeDictionary();
    this._pCache = makeDictionary();
  }

  /**
    @public
    disable caching
     @method disableCache;
  */
  disableCache() {
    this._sCache = null;
    this._pCache = null;
    this.singularize = word => this._singularize(word);
    this.pluralize = (numberOrWord, word, options = {}) => this._pluralize(numberOrWord, word, options);
  }

  /**
    @method plural
    @param {RegExp} regex
    @param {String} string
  */
  plural(regex, string) {
    if (this._cacheUsed) {
      this.purgeCache();
    }
    this.rules.plurals.push([regex, string.toLowerCase()]);
  }

  /**
    @method singular
    @param {RegExp} regex
    @param {String} string
  */
  singular(regex, string) {
    if (this._cacheUsed) {
      this.purgeCache();
    }
    this.rules.singular.push([regex, string.toLowerCase()]);
  }

  /**
    @method uncountable
    @param {String} regex
  */
  uncountable(string) {
    if (this._cacheUsed) {
      this.purgeCache();
    }
    loadUncountable(this.rules, [string.toLowerCase()]);
  }

  /**
    @method irregular
    @param {String} singular
    @param {String} plural
  */
  irregular(singular, plural) {
    if (this._cacheUsed) {
      this.purgeCache();
    }
    loadIrregular(this.rules, [[singular, plural]]);
  }

  /**
    @method pluralize
    @param {String} word
  */

  pluralize(wordOrCount, word, options = {}) {
    return this._pluralize(wordOrCount, word, options);
  }
  _pluralize(wordOrCount, word, options = {}) {
    if (word === undefined) {
      return this.inflect(wordOrCount, this.rules.plurals, this.rules.irregular);
    }
    if (parseFloat(wordOrCount) !== 1) {
      word = this.inflect(word, this.rules.plurals, this.rules.irregular);
    }
    return options.withoutCount ? word : `${wordOrCount} ${word}`;
  }

  /**
    @method singularize
    @param {String} word
  */
  singularize(word) {
    return this._singularize(word);
  }
  _singularize(word) {
    return this.inflect(word, this.rules.singular, this.rules.irregularInverse);
  }

  /**
    @protected
     @method inflect
    @param {String} word
    @param {Object} typeRules
    @param {Object} irregular
  */
  inflect(word, typeRules, irregular) {
    const isBlank = !word || BLANK_REGEX.test(word);
    if (isBlank) {
      return word;
    }
    const isCamelized = CAMELIZED_REGEX.test(word);
    const lowercase = word.toLowerCase();
    const wordSplit = LAST_WORD_DASHED_REGEX.exec(word) || LAST_WORD_CAMELIZED_REGEX.exec(word);
    const lastWord = wordSplit?.[2]?.toLowerCase();
    const isUncountable = this.rules.uncountable[lowercase] || lastWord !== undefined && this.rules.uncountable[lastWord];
    if (isUncountable) {
      return word;
    }
    if (irregular) {
      for (const key in irregular) {
        if (lowercase.match(`${key}$`)) {
          let rule = key;
          let substitution = irregular[key];
          if (isCamelized && lastWord !== undefined && irregular[lastWord]) {
            substitution = capitalize(substitution);
            rule = capitalize(rule);
          }
          return word.replace(new RegExp(rule, 'i'), substitution);
        }
      }
    }
    let inflection;
    for (let i = typeRules.length, min = 0; i > min; i--) {
      inflection = typeRules[i - 1];
      if (inflection?.[0].test(word)) {
        break;
      }
    }

    // Without a rule to apply, the word is returned untouched.
    if (!inflection) {
      return word;
    }
    return word.replace(inflection[0], inflection[1]);
  }
}

export { Inflector as default };
//# sourceMappingURL=inflector.js.map
