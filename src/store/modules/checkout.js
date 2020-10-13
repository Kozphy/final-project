import {
  editCartProduct,
  createCartProduct,
  createOrder,
} from '@/utils/api';
import router from '@/router/index';

export default {
  namespaced: true,
  state: {},
  getter: {},
  mutations: {
    toCheckoutSuccess() {
      console.log('change');
      router.push({ name: 'CheckoutSuccess' });
    }
  },
  actions: {
    changeCart(context, gap) {
      try {
        gap.map((item) => {
          const { id: product } = item.product;
          const { isInServer, quantity } = item;
          const uploadData = {
            product,
            quantity,
          }
          console.log('isInServer', isInServer);
          if (!isInServer) {
            createCartProduct(uploadData);
          }
          editCartProduct(uploadData);
          console.log('uploadData');
        });
      } catch (e) {
        throw e.message;
      }
    },
    uploadOrder(context, form) {
      try {
        const arr = ['name', 'email', 'tel', 'address'];
        let order = Object.entries(form.section1).reduce((obj, [key, value]) => {
          obj[arr[key]] = value.validation;
          return obj;
        }, {})
        const { validation: payment, comments } = form.section2;
        order.payment = payment;
        order.comments = comments;
        createOrder(order);
      } catch (e) {
        console.log('createOrderFail');
        throw e.message;
      }
    },
    changePage({ dispatch, commit }, data) {
      const { gap, form } = data;
      commit('isLoading', 'FullPage', { root: true });
      if (gap !== "") {
        const changeCartDone = async () => {
          await dispatch('changeCart', gap)
        }
        changeCartDone().then(async () => {
          // 送出訂單
          await dispatch('uploadOrder', form)
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
            throw err;
          })
      }
    }
  },
}