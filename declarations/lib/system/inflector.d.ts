/**
 * A single inflection rule: the pattern to match, and its replacement.
 */
export type InflectionRule = [pattern: RegExp, replacement: string];
/**
 * The singular and plural forms of a word that does not follow the rules.
 */
export type IrregularPair = [singular: string, plural: string];
/**
 * The rules an `Inflector` is created with.
 */
export interface RuleSet {
    plurals?: InflectionRule[];
    singular?: InflectionRule[];
    irregularPairs?: IrregularPair[];
    uncountable?: string[];
}
/**
 * The normalized rules an `Inflector` inflects with.
 */
export interface Rules {
    plurals: InflectionRule[];
    singular: InflectionRule[];
    irregular: Record<string, string>;
    irregularInverse: Record<string, string>;
    uncountable: Record<string, boolean>;
}
export interface PluralizeOptions {
    withoutCount?: boolean;
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
export default class Inflector {
    static defaultRules: RuleSet;
    static inflector: Inflector;
    rules: Rules;
    _cacheUsed: boolean;
    _sCache: Record<string, string> | null;
    _pCache: Record<string, string> | null;
    constructor(ruleSet?: RuleSet);
    /**
      @public
  
      As inflections can be costly, and commonly the same subset of words are repeatedly
      inflected an optional cache is provided.
  
      @method enableCache
    */
    enableCache(): void;
    /**
      @public
  
      @method purgeCache
    */
    purgeCache(): void;
    /**
      @public
      disable caching
  
      @method disableCache;
    */
    disableCache(): void;
    /**
      @method plural
      @param {RegExp} regex
      @param {String} string
    */
    plural(regex: RegExp, string: string): void;
    /**
      @method singular
      @param {RegExp} regex
      @param {String} string
    */
    singular(regex: RegExp, string: string): void;
    /**
      @method uncountable
      @param {String} regex
    */
    uncountable(string: string): void;
    /**
      @method irregular
      @param {String} singular
      @param {String} plural
    */
    irregular(singular: string, plural: string): void;
    /**
      @method pluralize
      @param {String} word
    */
    pluralize(word: string): string;
    pluralize(count: number | string, word: string, options?: PluralizeOptions): string;
    _pluralize(wordOrCount: string | number, word?: string, options?: PluralizeOptions): string;
    /**
      @method singularize
      @param {String} word
    */
    singularize(word: string): string;
    _singularize(word: string): string;
    /**
      @protected
  
      @method inflect
      @param {String} word
      @param {Object} typeRules
      @param {Object} irregular
    */
    inflect(word: string, typeRules: InflectionRule[], irregular?: Record<string, string>): string;
}
//# sourceMappingURL=inflector.d.ts.map