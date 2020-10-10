import Vue from 'vue';
import Vuex from 'vuex';
import products from './modules/products';
import cart from './modules/cart';
import checkout from './modules/checkout';

Vue.use(Vuex);

const isLoadingStyle = {
  FullPage: { isLoading: true, fullPage: true },
  notFullPage: { isLoading: true, fullPage: false },
  false: { isLoading: false, fullPage: false }
};

export default new Vuex.Store({
  strict: true, // 嚴格模式，防止直接修改 state，只用在開發階段，發布階段用 false
  modules: {
    products,
    cart,
    checkout,
  },
  // data
  state: {
    fullPage: false,
    isLoading: false,
  },
  // 處理 state 的資料，computed
  getters: {

  },
  // 用於按鈕點擊觸發的同步事件，便於追蹤是甚麼觸發事件，commit 觸發
  mutations: {
    isLoading(state, result) {
      const { isLoading, fullPage } = isLoadingStyle[result];
      state.isLoading = isLoading;
      state.fullPage = fullPage;
    },
  },
  // 用於監測 mutations 處理非同步，便於 debugger，dispatch 觸發，method
  actions: {
  },
});
