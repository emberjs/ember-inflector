export function pluralize(word: string): string;
export function pluralize(
  count: number,
  word: string,
  options?: { withoutCount?: boolean }
): string;
export function singularize(word: string): string;

export default class Inflector {
  singularize(word: string): string;
  pluralize(word: string): string;
  pluralize(
    count: number,
    word: string,
    options?: { withoutCount?: boolean }
  ): string;
  irregular(singular: string, plural: string): void;
  uncountable(string: string): void;
  singular(regex: RegExp, string: string): void;
  plural(regex: RegExp, string: string): void;
  enableCache(): void;
  disableCache(): void;
  purgeCache(): void;
  static inflector: Inflector;
}
