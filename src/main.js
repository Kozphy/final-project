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

window.$ = $;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
