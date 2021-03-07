import {
  Inflector,
  pluralize,
  singularize
} from "./lib/system";

export default Inflector;
const { defaultRules } = Inflector;

export {
  pluralize,
  singularize,
  defaultRules
};
