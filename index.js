'use strict';

function unwatchedTree(dir) {
  return {
    read:    function() { return dir; },
    cleanup: function() { }
  };
}

module.exports = {
    name: 'ember-inflector',
    
    treeForVendor: function(){
        var treePath =  path.join(' node_modules', 'ember-inflector', 'dist' );

        return unwatchedTree(treePath);
    },

    included: function(){
        this.app.import('vendor/ember-inflector/ember-inflector.named-amd.js', {
        exports: {
                'ember-inflector': [
                    'default',
                    'pluralize',
                    'singularize'
                ]
            }
        });
    }
};