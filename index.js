'use strict';

function unwatchedTree(dir) {
  return {
    read:    function() { return dir; },
    cleanup: function() { }
  };
}

module.exports = {
    name: 'ember-inflector',
    
    treeFor: function( name ){
        if (name !== 'vendor') { return; }

        var treePath =  path.join( 'node_modules', 'ember-inflector', 'dist' );

        return unwatchedTree(treePath);
    },

    included: function(){
        this.app.import('vendor/ember-inflector.named-amd.js', {
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