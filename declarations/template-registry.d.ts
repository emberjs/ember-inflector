import type pluralize from './helpers/pluralize.ts';
import type singularize from './helpers/singularize.ts';
export default interface Registry {
    pluralize: typeof pluralize;
    singularize: typeof singularize;
}
//# sourceMappingURL=template-registry.d.ts.map