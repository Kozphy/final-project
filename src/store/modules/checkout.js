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
    uploadOrder() {
      setTimeout(() => {
        console.log('Form true')
      }, 3000)
    },
    changePage({ dispatch, commit }, gap) {
      commit('isLoading', 'FullPage', { root: true });
      if (gap !== "") {
        const callApi = async () => {
          try {
            return gap.map(async (item) => {
              const { id: product } = item.product;
              const { isInServer, quantity } = item;
              const uploadData = {
                product,
                quantity,
              }
              console.log('isInServer', isInServer);
              if (!isInServer) {
                const done = await createCartProduct(uploadData);
                return done.data;
              }
              const done = await editCartProduct(uploadData);
              return done.data;
            });
          } catch {
            console.log('changeCartFail');
          }
        }

        callApi().then(async (res) => {
          console.log(res);
          // 送出訂單
          const doneOrder = await dispatch('uploadOrder');
          return doneOrder;
        })
          .then(() => {
            // 清空 gap
            commit('cart/clearCartProductGap', null, { root: true });
            // changePage
            commit('toCheckoutSuccess');
            commit('isLoading', false, { root: true });
          })
          .catch((err) => {
            commit('isLoading', false, { root: true });
            throw err.message;
          })
      }
    }
  },
}