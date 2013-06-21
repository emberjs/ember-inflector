require('ember-inflector/system/string');

var pluralize = Ember.String.pluralize,
    singularize = Ember.String.singularize,
    humanize = Ember.String.humanize,
    titleize = Ember.String.titleize,
    capitalize = Ember.String.capitalize,
    tableize = Ember.String.tableize,
    classify = Ember.String.classify;

if (Ember.EXTEND_PROTOTYPES) {
    
    /*
     * 
     */
    String.prototype.pluralize = function() {
       return pluralize(this, arguments);
    };

    /*
     * 
     */
    String.prototype.singularize = function() {
       return singularize(this, arguments);
    };

    /*
     * 
     */
    String.prototype.humanize = function() {
       return humanize(this, arguments);
    };

    /*
     * 
     */
    String.prototype.titleize = function() {
       return titleize(this, arguments);
    };

    /*
     * 
     */
    String.prototype.capitalize = function() {
       return capitalize(this, arguments);
    };

    /*
     * 
     */
    String.prototype.tableize = function() {
       return tableize(this, arguments);
    };

    /*
     * 
     */
    String.prototype.classify = function() {
       return classify(this, arguments);
    };
}
