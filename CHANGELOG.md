# Changelog

## Release (2025-03-12)

ember-inflector 6.0.0 (major)

#### :boom: Breaking Change
* `ember-inflector`
  * [#513](https://github.com/emberjs/ember-inflector/pull/513) Added meta to the uncountable array because "metum" is not a word. ([@ErvinSabic](https://github.com/ErvinSabic))

#### Committers: 1
- Ervin Sabic ([@ErvinSabic](https://github.com/ErvinSabic))

## Release (2024-10-24)

ember-inflector 5.0.2 (patch)

#### :house: Internal
* `ember-inflector`
  * [#511](https://github.com/emberjs/ember-inflector/pull/511) Restore repository and author fields in package.json ([@SergeAstapov](https://github.com/SergeAstapov))

#### Committers: 1
- Sergey Astapov ([@SergeAstapov](https://github.com/SergeAstapov))

## Release (2024-08-05)

ember-inflector 5.0.1 (patch)

#### :bug: Bug Fix
* `ember-inflector`
  * [#509](https://github.com/emberjs/ember-inflector/pull/509) Add missing export for ts declaration ([@mkszepp](https://github.com/mkszepp))

#### Committers: 1
- Markus Sanin ([@mkszepp](https://github.com/mkszepp))

## Release (2024-07-24)

ember-inflector 5.0.0 (major)

#### :boom: Breaking Change
* `ember-inflector`, `test-app`
  * [#499](https://github.com/emberjs/ember-inflector/pull/499) convert to a v2 addon using ember init ([@mansona](https://github.com/mansona))

#### Committers: 1
- Chris Manson ([@mansona](https://github.com/mansona))

## Release (2024-07-12)

ember-inflector 4.0.3 (patch)

#### :bug: Bug Fix
* `ember-inflector`
  * [#505](https://github.com/emberjs/ember-inflector/pull/505) chore: Drop hidden ember/string dependency ([@Techn1x](https://github.com/Techn1x))

#### :house: Internal
* `ember-inflector`
  * [#503](https://github.com/emberjs/ember-inflector/pull/503) start using release-plan ([@mansona](https://github.com/mansona))
  * [#502](https://github.com/emberjs/ember-inflector/pull/502) Remove yarn and upgrade ember blueprint with ember-cli-update ([@mansona](https://github.com/mansona))

#### Committers: 2
- Brad Overton ([@Techn1x](https://github.com/Techn1x))
- Chris Manson ([@mansona](https://github.com/mansona))

## v4.0.2 (2021-06-11)

#### :bug: Bug Fix
* [#372](https://github.com/emberjs/ember-inflector/pull/372) Remove non-existing `defaultRules` re-export ([@mydea](https://github.com/mydea))

#### Committers: 2
- Francesco Novy ([@mydea](https://github.com/mydea))


## 4.0.0 (Dec 3, 2020)

- switch to GH actions
- fix and expand TypeScript types
- Embroider compatibility test scenarios via ember-try
- upgrade all dependencies (As of dec 3, 2020)
- update package.json#engines to reflect actually supported node versions (as of Dec 3, 2020)
- Drop string extension support [#154](https://github.com/emberjs/ember-inflector/pull/154)

  The deprecated global access has been removed. If you used to access `Emeber.inflector`,
  `Ember.String.singularize` or `Ember.String.pluralize` via the `window.Ember` global,
  you must now import the module like this instead:
  ```
  import { singularize } from 'ember-inflector'
  singularize('cats');
  ```

  See PR for more details.

- Document custom rules [#149](https://github.com/emberjs/ember-inflector/pull/149)

## 3.0.0 (May 1, 2018)

- Upgrade Ember [#148](https://github.com/emberjs/ember-inflector/pull/148)
- Add typings [#132](https://github.com/emberjs/ember-inflector/pull/132)

## 2.3.0 (April 20, 2018)

- Fix deprecation regarding `Ember.EXTEND_PROTOTYPES`.
- Add ability to specify count to `Inflector.pluralize` and `{{pluralize`.

## 2.2.0 (March 27, 2018)

- Fix documentation snippets in README.
- Fix issue with local CI runs.

## 2.1.0 (November 11, 2017)

- Deprecate `Ember.Inflector`, `Ember.String.singularize`, `Ember.String.pluralize`.

## 2.0.0 (April 22, 2017)

- Update to use Babel 6
- Drop support for Node 0.10 and Node 0.12.

## 1.10.1 (January 9, 2017)

- [BUGFIX] Return the same output format for `defined.amd` environments.

## 1.10.0 (January 3, 2017)

- Expose the same API (singularize, pluralize) for all UMD consumers

## 1.9.6 (August 3, 2016)

- Fix "bonus" inflection. - [#108](https://github.com/emberjs/ember-inflector/pull/108)
