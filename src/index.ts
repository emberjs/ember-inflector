import Inflector from './lib/system/inflector.ts';
import { pluralize, singularize } from './lib/system/string.ts';

export default Inflector;

export { pluralize, singularize };

export type {
  InflectionRule,
  IrregularPair,
  PluralizeOptions,
  Rules,
  RuleSet,
} from './lib/system/inflector.ts';
