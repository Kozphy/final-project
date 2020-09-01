import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true, // 嚴格模式，防止直接修改 state，只用在開發階段，發布階段用 false
  // data
  state: {
    isLoading: true,
    cartProducts: [],
  },
  // 處理 state 的資料
  // getters:{

  // }
  // 用於按鈕點擊觸發的同步事件，便於追蹤是甚麼觸發事件，commit 觸發
  mutations: {
    addToCart(state, product) {
      state.cartProducts.push(product);
      console.log(product);
    },
  },
  // 用於監測 mutations 處理非同步，便於 debugger，dispatch 觸發
  actions: {
    addToCart(context, product) {
      context.commit('addToCart', product);
    },
  },
});
