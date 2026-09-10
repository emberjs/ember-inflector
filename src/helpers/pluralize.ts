import { pluralize } from '../lib/system/string.ts';

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
export default function pluralizeHelper(...args: unknown[]): string {
  // Named arguments arrive as a trailing object, and only when the template
  // actually passes some — unlike the old `(positional, named)` helper
  // signature, where `named` was always present. Positional arguments here are
  // only ever a count and a word, so a trailing object is unambiguous.
  const last = args[args.length - 1];
  const named: PluralizeNamedArgs =
    typeof last === 'object' && last !== null
      ? (args.pop() as PluralizeNamedArgs)
      : {};

  if (args.length === 2) {
    const [count, word] = args as [number | string, string];

    return pluralize(count, word, { withoutCount: named['without-count'] });
  }

  const [word] = args as [string];

  return pluralize(word);
}
