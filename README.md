# Ember Inflector [![Build Status](https://travis-ci.org/emberjs/ember-inflector.svg?branch=master)](https://travis-ci.org/emberjs/ember-inflector)

Ember Inflector is a library for inflecting words between plural and singular forms. Ember Inflector aims to be compatible with [ActiveSupport::Inflector](http://api.rubyonrails.org/classes/ActiveSupport/Inflector.html) from Ruby on Rails, including the ability to add your own inflections in your app.

## Installation

```
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
