Ember.Inflector.rules.ordinalization = {
  'default': 'th',
  0:  '',
  1:  'st',
  2:  'nd',
  3:  'rd',
  11: 'th',
  12: 'th',
  13: 'th'
};

Ember.Inflector.ordinal = function(number) {
  number = parseInt(number,10);
  number = Math.abs(number);

  if (number > 10 && number < 14){
    number %= 100;
  } else {
    number %= 10;
  }

  var ordinalization = Ember.Inflector.rules.ordinalization;

  return ordinalization[number] || ordinalization['default'];
};

Ember.String.ordinalize = function (word) {
  var ordinalization = Ember.Inflector.ordinal(word);

  return [word, ordinalization].join('');
};
