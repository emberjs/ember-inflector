export interface PluralizeNamedArgs {
    'without-count'?: boolean;
}
/**
 *
 * If you have Ember Inflector (such as if Ember Data is present),
 * pluralize a word. For example, turn "ox" into "oxen".
 *
 * Example:
 *
 * {{pluralize count myProperty}}
 * {{pluralize 1 "oxen"}}
 * {{pluralize myProperty}}
 * {{pluralize "ox"}}
 *
 * @for Ember.HTMLBars.helpers
 * @method pluralize
 * @param {Number|Property} [count] count of objects
 * @param {String|Property} word word to pluralize
 */
export default function pluralizeHelper(...args: unknown[]): string;
//# sourceMappingURL=pluralize.d.ts.map