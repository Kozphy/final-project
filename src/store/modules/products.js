import {
  frontApiProducts,
} from '@/utils/api';

export default {
  namespaced: true,
  state: {
    products: [],
  },
  mutations: {
    getProducts(state, res) {
      state.products = res.data.data;
    },
  },
  actions: {
    addToCart({ dispatch }, product) {
      dispatch('cart/addToCart', product, { root: true });
    },
    getProducts({ commit }, page = 1) {
      frontApiProducts(page)
        .then((res) => {
          commit('getProducts', res);
        })
        .catch((rej) => {
          throw rej;
        });
    },
  }
}