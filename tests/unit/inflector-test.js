import Inflector from 'ember-inflector';
import {
  module,
  test
} from 'qunit';

var inflector;
module('ember-inflector.dsl', {
  beforeEach() {
    inflector = new Inflector(/* no rulest == no rules */);
  },
  afterEach() {
    inflector = undefined;
  }
});

test('ability to include counts', function(assert) {
  inflector.plural(/$/, 's');
  assert.equal(inflector.pluralize(1, 'cat'), '1 cat', 'pluralize 1')
  assert.equal(inflector.pluralize(5, 'cat'), '5 cats', 'pluralize 5')
  assert.equal(inflector.pluralize(5, 'cat', { withoutCount: true }), 'cats', 'without count')
})

test('ability to add additional pluralization rules', function(assert){
  assert.equal(inflector.pluralize('cow'), 'cow', 'no pluralization rule');

  inflector.plural(/$/, 's');

  assert.equal(inflector.pluralize('cow'), 'cows', 'pluralization rule was applied');
});

test('ability to add additional singularization rules', function(assert) {
  assert.equal(inflector.singularize('cows'), 'cows', 'no singularization rule was applied');

  inflector.singular(/s$/, '');

  assert.equal(inflector.singularize('cows'), 'cow', 'singularization rule was applied');
});

test('ability to add additional uncountable rules', function(assert) {
  inflector.plural(/$/, 's');
  assert.equal(inflector.pluralize('cow'), 'cows', 'pluralization rule was applied');

  inflector.uncountable('cow');
  assert.equal(inflector.pluralize('cow'), 'cow', 'pluralization rule NOT was applied');
  assert.equal(inflector.pluralize('redCow'), 'redCow', 'pluralization rule NOT was applied');
  assert.equal(inflector.pluralize('red-cow'), 'red-cow', 'pluralization rule NOT was applied');
  assert.equal(inflector.pluralize('red/cow'), 'red/cow', 'pluralization rule NOT was applied');
});

test('ability to add additional irregular rules', function(assert) {
  inflector.singular(/s$/, '');
  inflector.plural(/$/, 's');

  assert.equal(inflector.singularize('cows'), 'cow', 'regular singularization rule was applied');
  assert.equal(inflector.pluralize('cow'), 'cows', 'regular pluralization rule was applied');

  assert.equal(inflector.singularize('red-cows'), 'red-cow', 'regular singularization rule was applied');
  assert.equal(inflector.pluralize('red-cow'), 'red-cows', 'regular pluralization rule was applied');

  assert.equal(inflector.singularize('redCows'), 'redCow', 'regular singularization rule was applied');
  assert.equal(inflector.pluralize('redCow'), 'redCows', 'regular pluralization rule was applied');

  assert.equal(inflector.singularize('red/cows'), 'red/cow', 'regular singularization rule was applied');
  assert.equal(inflector.pluralize('red/cow'), 'red/cows', 'regular pluralization rule was applied');

  inflector.irregular('cow', 'kine');

  assert.equal(inflector.singularize('kine'), 'cow', 'irregular singularization rule was applied');
  assert.equal(inflector.pluralize('cow'), 'kine', 'irregular pluralization rule was applied');

  assert.equal(inflector.singularize('red-kine'), 'red-cow', 'irregular singularization rule was applied');
  assert.equal(inflector.pluralize('red-cow'), 'red-kine', 'irregular pluralization rule was applied');

  assert.equal(inflector.singularize('red-red-cow'), 'red-red-cow', 'irregular singularization rule was applied correctly with dasherization');
  assert.equal(inflector.singularize('red-red-kine'), 'red-red-cow', 'irregular singularization rule was applied correctly with dasherization');
  assert.equal(inflector.pluralize('red-red-cow'), 'red-red-kine', 'irregular pluralization rule was applied correctly with dasherization');
  assert.equal(inflector.pluralize('red-red-kine'), 'red-red-kine', 'irregular pluralization rule was applied correctly with dasherization');

  assert.equal(inflector.singularize('redKine'), 'redCow', 'irregular singularization rule was applied');
  assert.equal(inflector.pluralize('redCow'), 'redKine', 'irregular pluralization rule was applied');

  assert.equal(inflector.singularize('red/kine'), 'red/cow', 'irregular singularization rule was applied');
  assert.equal(inflector.pluralize('red/cow'), 'red/kine', 'irregular pluralization rule was applied');
});

test('ability to add identical singular and pluralizations', function(assert) {

  inflector.singular(/s$/, '');
  inflector.plural(/$/, 's');

  assert.equal(inflector.singularize('settings'),'setting','regular singularization rule was applied');
  assert.equal(inflector.pluralize('setting'),'settings','regular pluralization rule was applied');

  inflector.irregular('settings','settings');
  inflector.irregular('userPreferences','userPreferences');

  assert.equal(inflector.singularize('settings'),'settings','irregular singularization rule was applied on lowercase word');
  assert.equal(inflector.pluralize('settings'),'settings','irregular pluralization rule was applied on lowercase word');

  assert.equal(inflector.singularize('userPreferences'),'userPreferences','irregular singularization rule was applied on camelcase word');
  assert.equal(inflector.pluralize('userPreferences'),'userPreferences','irregular pluralization rule was applied on camelcase word');
});

module('ember-inflector.unit');

test('plurals', function(assert) {
  assert.expect(1);

  var inflector = new Inflector({
    plurals: [
      [/$/, 's'],
      [/s$/i, 's']
    ]
  });

  assert.equal(inflector.pluralize('apple'), 'apples');
});

test('singularization', function(assert) {
  assert.expect(1);

  var inflector = new Inflector({
    singular: [
      [/s$/i, ''],
      [/(ss)$/i, '$1']
    ]
  });

  assert.equal(inflector.singularize('apple'), 'apple');
});

test('singularization of irregular singulars', function(assert) {
  assert.expect(1);

  var inflector = new Inflector({
    singular: [
      [/s$/i, ''],
      [/(ss)$/i, '$1']
    ],
    irregularPairs: [
      ['lens', 'lenses']
    ]
  });

  assert.equal(inflector.singularize('lens'), 'lens');
});

test('pluralization of irregular plurals', function(assert) {
  assert.expect(1);

  var inflector = new Inflector({
    plurals: [
      [/$/,'s']
    ],
    irregularPairs: [
      ['person', 'people']
    ]
  });

  assert.equal(inflector.pluralize('people'), 'people');
});

test('plural', function(assert) {
  assert.expect(1);

  var inflector = new Inflector({
    plurals: [
      ['1', '1'],
      ['2', '2'],
      ['3', '3']
    ]
  });

  assert.equal(inflector.rules.plurals.length, 3);
});

test('singular', function(assert) {
  assert.expect(1);

  var inflector = new Inflector({
    singular: [
      ['1', '1'],
      ['2', '2'],
      ['3', '3']
    ]
  });

  assert.equal(inflector.rules.singular.length, 3);
});

test('irregular', function(assert) {
  assert.expect(6);

  var inflector = new Inflector({
    irregularPairs: [
      ['1', '12'],
      ['2', '22'],
      ['3', '32']
    ]
  });

  assert.equal(inflector.rules.irregular['1'], '12');
  assert.equal(inflector.rules.irregular['2'], '22');
  assert.equal(inflector.rules.irregular['3'], '32');

  assert.equal(inflector.rules.irregularInverse['12'], '1');
  assert.equal(inflector.rules.irregularInverse['22'], '2');
  assert.equal(inflector.rules.irregularInverse['32'], '3');
});

test('uncountable', function(assert) {
  assert.expect(3);

  var inflector = new Inflector({
    uncountable: [
      '1',
      '2',
      '3'
    ]
  });

  assert.equal(inflector.rules.uncountable['1'], true);
  assert.equal(inflector.rules.uncountable['2'], true);
  assert.equal(inflector.rules.uncountable['3'], true);
});

test('inflect.nothing', function(assert) {
  assert.expect(2);

  var inflector = new Inflector();

  assert.equal(inflector.inflect('',  []), '');
  assert.equal(inflector.inflect(' ', []), ' ');
});

test('inflect.noRules', function(assert) {
  assert.expect(1);

  var inflector = new Inflector();

  assert.equal(inflector.inflect('word', []),'word');
});

test('inflect.uncountable', function(assert) {
  assert.expect(1);

  var inflector = new Inflector({
    plural: [
      [/$/,'s']
    ],
    uncountable: [
      'word'
    ]
  });

  var rules = [];

  assert.equal(inflector.inflect('word', rules), 'word');
});

test('inflect.irregular', function(assert) {
  assert.expect(2);

  var inflector = new Inflector({
    irregularPairs: [
      ['word', 'wordy']
    ]
  });

  var rules = [];

  assert.equal(inflector.inflect('word', rules, inflector.rules.irregular), 'wordy');
  assert.equal(inflector.inflect('wordy', rules, inflector.rules.irregularInverse), 'word');
});

test('inflect.basicRules', function(assert) {
  assert.expect(1);

  var inflector = new Inflector();
  var rules = [[/$/, 's']];

  assert.equal(inflector.inflect('word', rules ), 'words');
});

test('inflect.advancedRules', function(assert) {
  assert.expect(1);

  var inflector = new Inflector();
  var rules = [[/^(ox)$/i, '$1en']];

  assert.equal(inflector.inflect('ox', rules), 'oxen');
});

test('Inflector.defaultRules', function(assert) {
  assert.expect(1);

  var rules = Inflector.defaultRules;
  assert.ok(rules, 'has defaultRules');
});

test('Inflector.inflector exists', function(assert) {
  assert.expect(1);

  assert.ok(Inflector.inflector, 'Inflector.inflector exists');
});

test('new Inflector with defaultRules matches docs', function(assert) {
  assert.expect(4);

  var inflector = new Inflector(Inflector.defaultRules);

  // defaultRules includes these special rules
  assert.equal(inflector.pluralize('cow'), 'kine');
  assert.equal(inflector.singularize('kine'), 'cow');

  // defaultRules adds 's' to singular
  assert.equal(inflector.pluralize('item'), 'items');

  // defaultRules removes 's' from plural
  assert.equal(inflector.singularize('items'), 'item');
});

test('words containing irregular and uncountable words can be pluralized', function(assert) {
  var inflector = new Inflector(Inflector.defaultRules);
  assert.equal(inflector.pluralize('woman'), 'women');
  assert.equal(inflector.pluralize('salesperson'), 'salespeople');
});


test('words containing irregular and uncountable words can be singularized', function(assert) {
  var inflector = new Inflector(Inflector.defaultRules);
  assert.equal(inflector.singularize('women'), 'woman');
  assert.equal(inflector.singularize('salespeople'), 'salesperson');
  assert.equal(inflector.singularize('pufferfish'), 'pufferfish');
});

test('partial words containing uncountable words can be pluralized', function(assert) {
  var inflector = new Inflector(Inflector.defaultRules);
  assert.equal(inflector.pluralize('price'), 'prices');
});

test('partial words containing uncountable words can be singularized', function(assert) {
  var inflector = new Inflector(Inflector.defaultRules);
  assert.equal(inflector.singularize('subspecies'), 'subspecy');
});

test('CamelCase and UpperCamelCase is preserved for irregular and uncountable pluralizations', function(assert) {
  var inflector = new Inflector(Inflector.defaultRules);
  assert.equal(inflector.pluralize('SuperWoman'), 'SuperWomen');
  assert.equal(inflector.pluralize('superWoman'), 'superWomen');
  assert.equal(inflector.pluralize('SuperMan'), 'SuperMen');
  assert.equal(inflector.pluralize('superMan'), 'superMen');
  assert.equal(inflector.pluralize('FriedRice'), 'FriedRice');
  assert.equal(inflector.pluralize('friedRice'), 'friedRice');
});


test('CamelCase and UpperCamelCase is preserved for irregular and uncountable singularization', function(assert) {
  var inflector = new Inflector(Inflector.defaultRules);
  assert.equal(inflector.singularize('SuperWomen'), 'SuperWoman');
  assert.equal(inflector.singularize('superWomen'), 'superWoman');
  assert.equal(inflector.singularize('SuperMen'), 'SuperMan');
  assert.equal(inflector.singularize('superMen'), 'superMan');
  assert.equal(inflector.singularize('FriedRice'), 'FriedRice');
  assert.equal(inflector.singularize('friedRice'), 'friedRice');
});

test('CamelCase custom irregular words', function(assert) {
  var inflector = new Inflector(Inflector.defaultRules);
  inflector.irregular('unitOfMeasure', 'unitsOfMeasure');
  inflector.irregular('tipoDocumento', 'tiposDocumento');

  assert.equal(inflector.singularize('unitsOfMeasure'), 'unitOfMeasure');
  assert.equal(inflector.pluralize('unitOfMeasure'), 'unitsOfMeasure');

  assert.equal(inflector.singularize('tiposDocumento'), 'tipoDocumento');
  assert.equal(inflector.pluralize('tipoDocumento'), 'tiposDocumento');
});

test('Inflector.pluralize passes same test cases as ActiveSupport::Inflector#pluralize', function(assert) {
  var inflector = new Inflector(Inflector.defaultRules);

  assert.equal(inflector.pluralize('search'), 'searches');
  assert.equal(inflector.pluralize('switch'), 'switches');
  assert.equal(inflector.pluralize('fix'), 'fixes');
  assert.equal(inflector.pluralize('box'), 'boxes');
  assert.equal(inflector.pluralize('process'), 'processes');
  assert.equal(inflector.pluralize('address'), 'addresses');
  assert.equal(inflector.pluralize('case'), 'cases');
  assert.equal(inflector.pluralize('stack'), 'stacks');
  assert.equal(inflector.pluralize('wish'), 'wishes');
  assert.equal(inflector.pluralize('fish'), 'fish');
  assert.equal(inflector.pluralize('jeans'), 'jeans');
  assert.equal(inflector.pluralize('funky jeans'), 'funky jeans');
  assert.equal(inflector.pluralize('my money'), 'my money');
  assert.equal(inflector.pluralize('category'), 'categories');
  assert.equal(inflector.pluralize('query'), 'queries');
  assert.equal(inflector.pluralize('ability'), 'abilities');
  assert.equal(inflector.pluralize('agency'), 'agencies');
  assert.equal(inflector.pluralize('movie'), 'movies');
  assert.equal(inflector.pluralize('archive'), 'archives');
  assert.equal(inflector.pluralize('index'), 'indices');
  assert.equal(inflector.pluralize('wife'), 'wives');
  assert.equal(inflector.pluralize('safe'), 'saves');
  assert.equal(inflector.pluralize('half'), 'halves');
  assert.equal(inflector.pluralize('move'), 'moves');
  assert.equal(inflector.pluralize('salesperson'), 'salespeople');
  assert.equal(inflector.pluralize('person'), 'people');
  assert.equal(inflector.pluralize('spokesman'), 'spokesmen');
  assert.equal(inflector.pluralize('man'), 'men');
  assert.equal(inflector.pluralize('woman'), 'women');
  assert.equal(inflector.pluralize('basis'), 'bases');
  assert.equal(inflector.pluralize('diagnosis'), 'diagnoses');
  assert.equal(inflector.pluralize('diagnosis_a'), 'diagnosis_as');
  assert.equal(inflector.pluralize('datum'), 'data');
  assert.equal(inflector.pluralize('medium'), 'media');
  assert.equal(inflector.pluralize('stadium'), 'stadia');
  assert.equal(inflector.pluralize('analysis'), 'analyses');
  assert.equal(inflector.pluralize('my_analysis'), 'my_analyses');
  assert.equal(inflector.pluralize('node_child'), 'node_children');
  assert.equal(inflector.pluralize('child'), 'children');
  assert.equal(inflector.pluralize('experience'), 'experiences');
  assert.equal(inflector.pluralize('day'), 'days');
  assert.equal(inflector.pluralize('comment'), 'comments');
  assert.equal(inflector.pluralize('foobar'), 'foobars');
  assert.equal(inflector.pluralize('newsletter'), 'newsletters');
  assert.equal(inflector.pluralize('old_news'), 'old_news');
  assert.equal(inflector.pluralize('news'), 'news');
  assert.equal(inflector.pluralize('series'), 'series');
  assert.equal(inflector.pluralize('miniseries'), 'miniseries');
  assert.equal(inflector.pluralize('species'), 'species');
  assert.equal(inflector.pluralize('quiz'), 'quizzes');
  assert.equal(inflector.pluralize('perspective'), 'perspectives');
  assert.equal(inflector.pluralize('ox'), 'oxen');
  assert.equal(inflector.pluralize('photo'), 'photos');
  assert.equal(inflector.pluralize('buffalo'), 'buffaloes');
  assert.equal(inflector.pluralize('tomato'), 'tomatoes');
  assert.equal(inflector.pluralize('dwarf'), 'dwarves');
  assert.equal(inflector.pluralize('elf'), 'elves');
  assert.equal(inflector.pluralize('information'), 'information');
  assert.equal(inflector.pluralize('equipment'), 'equipment');
  assert.equal(inflector.pluralize('bus'), 'buses');
  assert.equal(inflector.pluralize('status'), 'statuses');
  assert.equal(inflector.pluralize('status_code'), 'status_codes');
  assert.equal(inflector.pluralize('mouse'), 'mice');
  assert.equal(inflector.pluralize('louse'), 'lice');
  assert.equal(inflector.pluralize('house'), 'houses');
  assert.equal(inflector.pluralize('octopus'), 'octopi');
  assert.equal(inflector.pluralize('virus'), 'viri');
  assert.equal(inflector.pluralize('alias'), 'aliases');
  assert.equal(inflector.pluralize('portfolio'), 'portfolios');
  assert.equal(inflector.pluralize('vertex'), 'vertices');
  assert.equal(inflector.pluralize('matrix'), 'matrices');
  assert.equal(inflector.pluralize('matrix_fu'), 'matrix_fus');
  assert.equal(inflector.pluralize('axis'), 'axes');
  assert.equal(inflector.pluralize('taxi'), 'taxis');
  assert.equal(inflector.pluralize('testis'), 'testes');
  assert.equal(inflector.pluralize('crisis'), 'crises');
  assert.equal(inflector.pluralize('rice'), 'rice');
  assert.equal(inflector.pluralize('shoe'), 'shoes');
  assert.equal(inflector.pluralize('horse'), 'horses');
  assert.equal(inflector.pluralize('prize'), 'prizes');
  assert.equal(inflector.pluralize('edge'), 'edges');
  assert.equal(inflector.pluralize('database'), 'databases');
  assert.equal(inflector.pluralize('|ice'), '|ices');
  assert.equal(inflector.pluralize('|ouse'), '|ouses');
  assert.equal(inflector.pluralize('slice'), 'slices');
  assert.equal(inflector.pluralize('police'), 'police');
});

test('Inflector.singularize passes same test cases as ActiveSupport::Inflector#singularize', function(assert) {
  var inflector = new Inflector(Inflector.defaultRules);

  assert.equal(inflector.singularize('searches'), 'search');
  assert.equal(inflector.singularize('switches'), 'switch');
  assert.equal(inflector.singularize('fixes'), 'fix');
  assert.equal(inflector.singularize('boxes'), 'box');
  assert.equal(inflector.singularize('processes'), 'process');
  assert.equal(inflector.singularize('addresses'), 'address');
  assert.equal(inflector.singularize('cases'), 'case');
  assert.equal(inflector.singularize('stacks'), 'stack');
  assert.equal(inflector.singularize('wishes'), 'wish');
  assert.equal(inflector.singularize('fish'), 'fish');
  assert.equal(inflector.singularize('jeans'), 'jeans');
  assert.equal(inflector.singularize('funky jeans'), 'funky jeans');
  assert.equal(inflector.singularize('my money'), 'my money');
  assert.equal(inflector.singularize('categories'), 'category');
  assert.equal(inflector.singularize('queries'), 'query');
  assert.equal(inflector.singularize('abilities'), 'ability');
  assert.equal(inflector.singularize('agencies'), 'agency');
  assert.equal(inflector.singularize('movies'), 'movie');
  assert.equal(inflector.singularize('archives'), 'archive');
  assert.equal(inflector.singularize('indices'), 'index');
  assert.equal(inflector.singularize('wives'), 'wife');
  assert.equal(inflector.singularize('saves'), 'safe');
  assert.equal(inflector.singularize('halves'), 'half');
  assert.equal(inflector.singularize('moves'), 'move');
  assert.equal(inflector.singularize('salespeople'), 'salesperson');
  assert.equal(inflector.singularize('people'), 'person');
  assert.equal(inflector.singularize('spokesmen'), 'spokesman');
  assert.equal(inflector.singularize('men'), 'man');
  assert.equal(inflector.singularize('women'), 'woman');
  assert.equal(inflector.singularize('bases'), 'basis');
  assert.equal(inflector.singularize('diagnoses'), 'diagnosis');
  assert.equal(inflector.singularize('diagnosis_as'), 'diagnosis_a');
  assert.equal(inflector.singularize('data'), 'datum');
  assert.equal(inflector.singularize('media'), 'medium');
  assert.equal(inflector.singularize('stadia'), 'stadium');
  assert.equal(inflector.singularize('analyses'), 'analysis');
  assert.equal(inflector.singularize('my_analyses'), 'my_analysis');
  assert.equal(inflector.singularize('node_children'), 'node_child');
  assert.equal(inflector.singularize('children'), 'child');
  assert.equal(inflector.singularize('experiences'), 'experience');
  assert.equal(inflector.singularize('days'), 'day');
  assert.equal(inflector.singularize('comments'), 'comment');
  assert.equal(inflector.singularize('foobars'), 'foobar');
  assert.equal(inflector.singularize('newsletters'), 'newsletter');
  assert.equal(inflector.singularize('old_news'), 'old_news');
  assert.equal(inflector.singularize('news'), 'news');
  assert.equal(inflector.singularize('series'), 'series');
  assert.equal(inflector.singularize('miniseries'), 'miniseries');
  assert.equal(inflector.singularize('species'), 'species');
  assert.equal(inflector.singularize('quizzes'), 'quiz');
  assert.equal(inflector.singularize('perspectives'), 'perspective');
  assert.equal(inflector.singularize('oxen'), 'ox');
  assert.equal(inflector.singularize('photos'), 'photo');
  assert.equal(inflector.singularize('buffaloes'), 'buffalo');
  assert.equal(inflector.singularize('tomatoes'), 'tomato');
  assert.equal(inflector.singularize('dwarves'), 'dwarf');
  assert.equal(inflector.singularize('elves'), 'elf');
  assert.equal(inflector.singularize('information'), 'information');
  assert.equal(inflector.singularize('equipment'), 'equipment');
  assert.equal(inflector.singularize('buses'), 'bus');
  assert.equal(inflector.singularize('statuses'), 'status');
  assert.equal(inflector.singularize('status_codes'), 'status_code');
  assert.equal(inflector.singularize('mice'), 'mouse');
  assert.equal(inflector.singularize('lice'), 'louse');
  assert.equal(inflector.singularize('houses'), 'house');
  assert.equal(inflector.singularize('octopi'), 'octopus');
  assert.equal(inflector.singularize('viri'), 'virus');
  assert.equal(inflector.singularize('aliases'), 'alias');
  assert.equal(inflector.singularize('portfolios'), 'portfolio');
  assert.equal(inflector.singularize('vertices'), 'vertex');
  assert.equal(inflector.singularize('matrices'), 'matrix');
  assert.equal(inflector.singularize('matrix_fus'), 'matrix_fu');
  assert.equal(inflector.singularize('axes'), 'axis');
  assert.equal(inflector.singularize('taxis'), 'taxi');
  assert.equal(inflector.singularize('testes'), 'testis');
  assert.equal(inflector.singularize('crises'), 'crisis');
  assert.equal(inflector.singularize('rice'), 'rice');
  assert.equal(inflector.singularize('shoes'), 'shoe');
  assert.equal(inflector.singularize('horses'), 'horse');
  assert.equal(inflector.singularize('prizes'), 'prize');
  assert.equal(inflector.singularize('edges'), 'edge');
  assert.equal(inflector.singularize('databases'), 'database');
  assert.equal(inflector.singularize('|ices'), '|ice');
  assert.equal(inflector.singularize('|ouses'), '|ouse');
  assert.equal(inflector.singularize('slices'), 'slice');
  assert.equal(inflector.singularize('police'), 'police');
});

test('Inflector.singularize can singularize "bonuses"', function(assert) {
  var inflector = new Inflector(Inflector.defaultRules);

  assert.equal(inflector.singularize('bonuses'), 'bonus');
});

test('Inflector.singularize can pluralize "bonus"', function(assert) {
  var inflector = new Inflector(Inflector.defaultRules);

  assert.equal(inflector.pluralize('bonus'), 'bonuses');
});
