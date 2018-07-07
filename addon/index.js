import {
  Inflector,
  defaultRules,
  pluralize,
  singularize
} from "./lib/system";

Inflector.defaultRules = defaultRules;

export default Inflector;

export {
  pluralize,
  singularize,
  defaultRules
};
