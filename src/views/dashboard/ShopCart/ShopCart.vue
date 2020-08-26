<template>
  <div>
    <loading :active.sync="isLoading" />
    <div class="container mt-5">
      <div class="row">
        <div class="d-flex justify-content-between align-items-end w-100">
          <div class="form-group form-check mb-0">
            <input
              class="from-check-input mr-2"
              id="isShowImg"
              type="checkbox"
              v-model="isShowImg"
            />
            <label
              class="mb-0"
              for="isShowImg"
            >縮圖</label>
          </div>
          <div>
            <button
              @click="delCartProducts"
              class="btn btn-danger d-flex"
              type="button"
            >
              <span class="material-icons mr-1">delete</span>
              刪除
            </button>
          </div>
        </div>
        <table class="table mt-3">
          <thead>
            <tr class="text-center">
              <th width="10"></th>
              <th>分類</th>
              <th v-if="isShowImg === true">縮圖</th>
              <th>商品名稱</th>
              <th
                class="text-center"
                width="140"
              >數量</th>
              <th class="text-right">價格</th>
              <th class="text-right">小計</th>
            </tr>
          </thead>
          <tbody>
            <tr
              :key="item + key"
              v-for="(item, key) in cartProdcuts"
            >
              <td class="text-center align-middle">
                <input
                  type="checkbox"
                  v-model="item.selectDel"
                />
              </td>
              <td class="text-center align-middle">{{ item.product.category }}</td>
              <td
                class="align-middle text-center"
                v-if="isShowImg === true"
              >
                <img
                  :alt="item.product.imageUrl[0]"
                  :src="item.product.imageUrl[0]"
                  style="width:5rem; height:5rem"
                />
              </td>
              <td class="align-middle text-center">{{ item.product.title }}</td>
              <td class="align-middle text-right">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <button
                      :disabled="item.quantity === 1"
                      @click="item.quantity--"
                      class="btn btn-outline-danger"
                      type="button"
                    >-</button>
                  </div>
                  <input
                    class="form-control text-center"
                    type="number"
                    v-model="item.quantity"
                  />
                  <div class="input-group-append">
                    <button
                      @click="item.quantity++"
                      class="btn btn-outline-danger"
                      type="button"
                    >+</button>
                  </div>
                </div>
              </td>
              <td
                class="text-right align-middle"
              >{{ item.product.price | thousandsFormat }}</td>
              <td
                class="text-right align-middle"
              >{{ subTotal(item) | thousandsFormat }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr class="text-right">
              <td
                colspan="6"
                v-show="isShowImg === false"
              >總計：{{ total | thousandsFormat }}</td>
              <td
                colspan="7"
                v-show="isShowImg === true"
              >總計：{{ total | thousandsFormat }}</td>
            </tr>
          </tfoot>
        </table>
        <div class="d-flex justify-content-center w-100 mb-5">
          <div class="w-50">
            <h2 class="text-center">訂單資料</h2>
            <CartForm></CartForm>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getCartProducts,
  delCartProduct,
  delAllCart,
} from '@/utils/api';
import CartForm from '@/views/dashboard/ShopCart/components/CartForm.vue';

export default {
  name: 'ShopCart',
  data() {
    return {
      sumTotal: 0,
      isShowImg: false,
      isLoading: false,
      cartProdcuts: [],
      pagination: {},
    };
  },
  components: {
    CartForm,
  },
  methods: {
    getCart(page = 1) {
      this.isLoading = true;
      getCartProducts(page).then((res) => {
        this.cartProdcuts = res.data.data;
        this.cartProdcuts.forEach((item) => {
          this.$set(item, 'selectDel', false);
        });
        this.pagination = res.data.meta.pagination;
        this.isLoading = false;
      }).catch((rej) => {
        this.isLoading = false;
        throw rej;
      });
    },
    subTotal(item) {
      return item.product.price * item.quantity;
    },
    delCartProducts() {
      this.isLoading = true;
      // 過濾出 selectDel = true 的 id
      const delData = this.cartProdcuts.filter((item) => item.selectDel === true)
        .map((item) => item.product.id);
      // 無選取時刪除全部
      if (!delData[0]) {
        delAllCart().then(() => {
          this.getCart();
        }).catch((rej) => {
          this.isLoading = false;
          throw rej;
        });
      }
      // 有選取時刪除選取
      this.selectDel(delData);
    },
    selectDel(delData) {
      delData.forEach((item) => {
        const data = {
          product: item,
        };
        delCartProduct(item, data).then(() => {
          this.getCart();
        }).catch((rej) => {
          this.isLoading = false;
          throw rej;
        });
      });
    },
  },
  computed: {
    total: {
      get() {
        let sum = 0;
        this.cartProdcuts.forEach((item) => {
          sum += item.product.price * item.quantity;
        });
        return sum;
      },
    },
  },
  created() {
    this.getCart();
  },
};
</script>
<style lang="scss">
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
</style>
