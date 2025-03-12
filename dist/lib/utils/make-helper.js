import Ember from 'ember';
import Helper from '@ember/component/helper';

function makeHelper(helperFunction) {
  if (Helper) {
    return Helper.helper(helperFunction);
  }
  if (Ember.HTMLBars) {
    return Ember.HTMLBars.makeBoundHelper(helperFunction);
  }
  return Ember.Handlebars.makeBoundHelper(helperFunction);
}

export { makeHelper as default };
//# sourceMappingURL=make-helper.js.map
