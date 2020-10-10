import {
  getCartProducts,
  searchCoupon,
  delCartProduct,
  delAllCart,
} from '@/utils/api';



export default {
  namespaced: true,
  state: {
    cartProducts: [],
    coupon: {},
    cartProductsGap: [],
  },
  // 處理 state 的資料，computed
  getters: {
    sumTotal(state) {
      return state.cartProducts.reduce((total, item) => {
        return total + item.quantity * item.product.price;
      }, 0);
    },
    couponPercent(state) {
      return state.coupon.percent ? state.coupon.percent : 0;
    },
    finalTotal(state, getters) {
      return Math.round(getters.sumTotal * (getters.couponPercent === 0 ? 1 : getters.couponPercent / 100));
    }
  },
  mutations: {
    addToCartHadFind(state, data) {
      const { cartIndex, result } = data;
      const legacyData = state.cartProductsGap.findIndex((item) => result.product.id === item.product.id);
      // if cartProductGap have same id, remove same data
      if (legacyData !== -1) {
        state.cartProductsGap.splice(legacyData, 1);
      }
      // update render
      state.cartProducts.splice(cartIndex, 1, result);
      // 移除後，紀錄新增的產品數量，在上傳至 API 時可用，無法直接加在 splice 的第三個參數，因為第一次 Gap 裡的資料是空的
      state.cartProductsGap.push(result);
    },
    addToCartNotFind(state, product) {
      const result = {
        product: product.product,
        quantity: 1,
      };
      // render
      state.cartProducts.push(result);
      // 紀錄新增的產品，在上傳時可用
      state.cartProductsGap.push(result);
    },
    deleteProduct(state, index) {
      state.cartProducts.splice(index, 1);
    },
    getCart(state, res) {
      // convert data to  { product , quantity }
      const result = [];
      // use in api
      const isInServer = true;
      for (const { product, quantity } of res.data.data) {
        result.push({ product, quantity, isInServer });
      }
      state.cartProducts = result;
    },
    getDiscount(state, res) {
      state.coupon = res.data.data;
    },
    clearCartProductGap(state) {
      state.cartProductsGap = [];
    },
    clearCartAll(state) {
      state.cartProducts = [];
      state.cartProductsGap = [];
    }
  },
  actions: {
    addToCart({ commit, state }, product) {
      // 找購物車是否已經有相同的產品
      const cartIndex = state.cartProducts.findIndex((item) => item.product.id === product.id);
      // 點擊購物車時，有找到相同的商品，因此 quantity += 1
      if (cartIndex !== -1) {
        let { quantity } = state.cartProducts[cartIndex];
        quantity += 1
        // 輸入的資料資料都轉換成這種形式
        const result = {
          product,
          quantity,
          isInServer: true,
        }
        commit('addToCartHadFind', { cartIndex, result });
        return;
      }
      // 沒有找到相同的 ID，新增 quantity = 1
      commit('addToCartNotFind', { product });
    },
    changeQuantity({ commit }, item) {
      const { key: cartIndex, active } = item;
      const { product, isInServer } = item.product;
      let { quantity } = item.product;
      if (active === 'minus' && quantity > 1) {
        quantity -= 1;
      } else if (active === 'plus') {
        quantity += 1;
      }
      const result = {
        product,
        quantity,
        isInServer
      };
      commit('addToCartHadFind', { cartIndex, result });
    },
    deleteProduct({ commit }, item) {
      commit('isLoading', 'FullPage', { root: true });
      const { id } = item.product;
      const { key, isInServer } = item;
      // if data in server call api to delete and render
      if (isInServer) {
        delCartProduct(id)
          .then(() => {
            commit('deleteProduct', key);
            commit('isLoading', false, { root: true });
          })
          .catch((rej) => {
            commit('isLoading', false, { root: true });
            throw rej;
          })
        return;
      }
      // not in server so just render
      commit('deleteProduct', key);
    },
    getCart({ commit }, page = 1) {
      getCartProducts(page)
        .then((res) => {
          commit('getCart', res);
        })
        .catch((rej) => {
          throw rej;
        })
    },
    clearCartAll({ commit }) {
      commit('isLoading', 'FullPage', { root: true });
      delAllCart()
        .then(() => {
          commit('clearCartAll');
          commit('isLoading', false, { root: true });
        })
        .catch((rej) => {
          commit('isLoading', false, { root: true });
          throw rej;
        })
    },
    getDiscount({ commit }, code) {
      // if code exist continue
      if (code) {
        const discountCode = {
          code: code
        };
        commit('isLoading', 'notFullPage', { root: true });
        searchCoupon(discountCode)
          .then((res) => {
            commit('getDiscount', res);
            commit('isLoading', false, { root: true });
          })
          .catch((rej) => {
            commit('isLoading', false, { root: true });
            throw rej;
          })
      }
    },
  },
}