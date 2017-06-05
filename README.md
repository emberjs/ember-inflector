# Ember Inflector [![Build Status](https://travis-ci.org/emberjs/ember-inflector.svg?branch=master)](https://travis-ci.org/emberjs/ember-inflector)

Ember Inflector is a library for inflecting words between plural and singular forms. Ember Inflector aims to be compatible with [ActiveSupport::Inflector](http://api.rubyonrails.org/classes/ActiveSupport/Inflector.html) from Ruby on Rails, including the ability to add your own inflections in your app.

## Installation

Ember CLI/NPM:

```
npm install --save ember-inflector
```

## Usage

All methods are always available from `Ember.Inflector`, but in Ember CLI, you can always `import` instead:

```javascript
import Inflector from 'ember-inflector';
import {singularize, pluralize} from 'ember-inflector';

Inflector.inflector.singularize("tacos"); // taco
Inflector.inflector.pluralize("taco"); // tacos

singularize("tacos"); // taco
pluralize("taco"); // tacos

// or if not using Ember CLI/ES6
Ember.Inflector.inflector.pluralize("taco"); // tacos
```

### Template Helpers

#### pluralize

Pluralize a word
```helpers
{{pluralize "taco"}} //tacos
```

Specify a count with the word, with the pluralization being based on the number of items.
```helpers
{{pluralize 1 "taco"}} //1 taco
{{pluralize 2 "taco"}} //2 tacos
```

Specify a count with the word, with the pluralization being based on the number of items. Specify `without-count=true` to return on the word without the number.
```helpers
{{pluralize 1 "taco" without-count=true}} //taco
{{pluralize 2 "taco" without-count=true}} //tacos
```

#### singularize
```helpers
{{singularize 'octopi'}} //octopus
```
