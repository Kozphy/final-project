import Vue from 'vue';
import {
  ValidationObserver,
  ValidationProvider,
  extend,
  configure,
  localize,
} from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import TW from 'vee-validate/dist/locale/zh_TW.json';

// veeValidation
Vue.component('ValidationProvider', ValidationProvider);

Vue.component('ValidationObserver', ValidationObserver);

localize('tw', TW);

configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid',
  },
});

Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});
