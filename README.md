# Ember Inflector [![CI](https://github.com/emberjs/ember-inflector/workflows/CI/badge.svg)](https://github.com/emberjs/ember-inflector/actions/)

Ember Inflector is a library for inflecting words between plural and singular forms. Ember Inflector aims to be compatible with [ActiveSupport::Inflector](http://api.rubyonrails.org/classes/ActiveSupport/Inflector.html) from Ruby on Rails, including the ability to add your own inflections in your app.

## Compatibility

- Ember.js v4.8 or above
- Embroider or ember-auto-import v2

## Installation

```shell
ember install ember-inflector
```

## Usage

All methods are always available from the `ember-inflector` module:

```javascript
import Inflector from 'ember-inflector';
import { singularize, pluralize } from 'ember-inflector';

Inflector.inflector.singularize("tacos"); // taco
Inflector.inflector.pluralize("taco"); // tacos

singularize("tacos"); // taco
pluralize("taco"); // tacos

pluralize(2, "taco"); // 2 tacos
pluralize(2, "tacos", { withoutCount: true }); // tacos
```

### Custom Rules

If necessary you can setup special inflection rules for your application:

```javascript
import Inflector from 'ember-inflector';

Inflector.inflector.irregular('person', 'people');
Inflector.inflector.uncountable('sheep');

```

### Template Helpers

#### pluralize

Pluralize a word

```hbs
{{pluralize "taco"}} -> tacos
```

Specify a count with the word, with the pluralization being based on the number of items.

```hbs
{{pluralize 1 "taco"}} -> 1 taco
{{pluralize 2 "taco"}} -> 2 tacos
```

Specify a count with the word, with the pluralization being based on the number of items. Specify `without-count=true` to return on the word without the number.

```hbs
{{pluralize 1 "taco" without-count=true}} -> taco
{{pluralize 2 "taco" without-count=true}} -> tacos
```

#### singularize

```hbs
{{singularize 'octopi'}} -> octopus
```

### TypeScript

Types are published with the addon, so no `@types/*` package is needed.

If your app is not yet using strict mode templates, register the template
helpers with [Glint](https://typed-ember.gitbook.io/glint) by extending the
addon's registry:

```typescript
import type EmberInflectorRegistry from 'ember-inflector/template-registry';

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry extends EmberInflectorRegistry {}
}
```

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

This project is licensed under the [MIT License](LICENSE.md).
