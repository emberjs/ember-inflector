import Ember from 'ember';

export default function makeHelper(helperFunction) {
  if (Ember.Helper) {
    return Ember.Helper.helper(helperFunction);
  }
  if (Ember.HTMLBars) {
    return Ember.HTMLBars.makeBoundHelper(helperFunction);
  }
  return Ember.Handlebars.makeBoundHelper(helperFunction);
}
