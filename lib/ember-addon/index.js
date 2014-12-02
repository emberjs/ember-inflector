/* jshint node: true */
'use strict';

var path = require('path');

module.exports = {
  name: 'ember-inflector',
  blueprintsPath: function() {
    return path.join(__dirname, 'blueprints');
  },
  included: function(app) {
    this._super.included(app);

    var options = {
      exports: {
        'ember-inflector': [
          'default'
        ]
      }
    };

    this.app.import(app.bowerDirectory + '/ember-inflector/ember-inflector.js', options);
  }
};
