import {
  editCartProduct,
  createCartProduct,
} from '@/utils/api';
import router from '@/router/index';

export default {
  namespaced: true,
  state: {},
  getter: {},
  mutations: {
    toCheckoutSuccess() {
      router.push({ name: 'CheckoutSuccess' });
    }
  },
  actions: {
    createProductsInCart({ commit }, uploadData) {
      createCartProduct(uploadData)
        .then((res) => {
          console.log(res);
          // 清空 gap
          commit('cart/clearCartProductGap', null, { root: true });
        })
        .catch((rej) => {
          commit('isLoading', false, { root: true });
          throw rej;
        })
    },
    editProductsInCart({ commit }, uploadData) {
      editCartProduct(uploadData)
        .then((res) => {
          console.log(res);
          // 清空 gap
          commit('cart/clearCartProductGap', null, { root: true });
        })
        .catch((rej) => {
          commit('isLoading', false, { root: true });
          throw rej;
        })
    },
    uploadOrder() {
      console.log('Form true')
    },
    changePage({ dispatch, commit }, gap) {
      commit('isLoading', 'FullPage', { root: true });
      if (gap !== "") {
        const callApi = async () => {
          console.log('2');
          await gap.forEach((item) => {
            const { id: product } = item.product;
            const { isInServer, quantity } = item;
            const uploadData = {
              product,
              quantity,
            }
            console.log(isInServer);
            if (!isInServer) {
              dispatch('createProductsInCart', uploadData);
              return;
            }
            dispatch('editProductsInCart', uploadData);
          });
          await dispatch('uploadOrder');
        }
        callApi().then(() => {
          console.log('change');
          commit('toCheckoutSuccess');
          commit('isLoading', false, { root: true });
        })
          .catch(() => {
            console.log('uploadFail');
            commit('isLoading', false, { root: true });
          })
      }
    }
  },
}