import Vue from 'vue';
import '@/plugins/veeValidate';
import '@/plugins/overlay';
import $ from 'jquery';
import 'bootstrap';
import '@/plugins/vueToast';
import store from '@/store/store';
import '@/plugins/swiper';
import App from './App.vue';
import router from './router';
import '@/utils/filter';
// logrocket 
import LogRocket from 'logrocket';
LogRocket.init('1hvh8k/webtest');

LogRocket.identify('dbdf0369', {
  name: 'dbdf0369',
  email: 'dbdf0369@gmail.com',

  // Add your own custom user variables here, ie:
  subscriptionType: 'pro'
});

window.$ = $;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
