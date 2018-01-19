import Ember from 'ember';
import Helper from '@ember/component/helper';

export default function makeHelper(helperFunction) {
  if (Helper) {
    return Helper.helper(helperFunction);
  }
  if (Ember.HTMLBars) {
    return Ember.HTMLBars.makeBoundHelper(helperFunction);
  }
  return Ember.Handlebars.makeBoundHelper(helperFunction);
}
