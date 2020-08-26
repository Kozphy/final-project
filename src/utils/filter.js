import Vue from 'vue';

Vue.filter('thousandsFormat', (dollar) => `$${dollar.toFixed(0)
  .toString()
  .replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')}`);

Vue.filter('percentFormat', (number) => `${number} %`);
