import Inflector from './inflector.ts';
import type { PluralizeOptions } from './inflector.ts';

export function pluralize(word: string): string;
export function pluralize(
  count: number | string,
  word: string,
  options?: PluralizeOptions,
): string;
export function pluralize(
  wordOrCount: string | number,
  word?: string,
  options?: PluralizeOptions,
): string {
  return word === undefined
    ? Inflector.inflector.pluralize(wordOrCount as string)
    : Inflector.inflector.pluralize(wordOrCount, word, options);
}

export function singularize(word: string): string {
  return Inflector.inflector.singularize(word);
}
