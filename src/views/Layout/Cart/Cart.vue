<template>
  <div class="py-16">
    <loading
      v-if="fullPage"
      :active.sync="isLoading"
      :is-full-page="fullPage"
      :height="32"
      :width="32"
      loader="bars"
    ></loading>
    <div class="container mx-auto ">
      <!-- breadcrumbs start -->
      <Breadcrumbs></Breadcrumbs>
      <!-- breadcrumbs end -->
      <!-- timeline start -->
      <CheckoutProcess :page="'Cart'"></CheckoutProcess>
      <!-- timeline end -->
      <!-- cart start -->
      <div class="flex mt-10">
        <!-- cart content -->
        <div class="w-2/3">
          <div class="text-right my-2">
            <button
              class="btn btn-red"
              @click="clearCartAll()"
            >清除購物車</button>
          </div>
          <table class="table-auto w-full mb-32 divide-y divide-gray-400">
            <thead>
              <tr>
                <th class="table-box">分類</th>
                <th
                  width="150"
                  class="table-box"
                >圖片</th>
                <th class="table-box ">商品名稱</th>
                <th
                  width="150"
                  class="table-box "
                >數量</th>
                <th class="table-box text-right ">金額</th>
                <th
                  width="100"
                  class="table-box "
                >刪除</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-400">
              <tr
                :key="item + key"
                v-for="(item, key) in cartProducts"
              >
                <td class="table-box text-center">{{ item.product.category }}</td>
                <td class="table-box">
                  <img
                    class="w-full object-cover"
                    style="height:100px"
                    :src="item.product.imageUrl[0]"
                    :alt="item.product.imageUrl[0]"
                  >
                </td>
                <td class=" table-box">{{ item.product.title }}</td>
                <td class="table-box">
                  <div class="flex">
                    <button
                      type="button"
                      class="btn-outline-red"
                      @click="changeQuantity({product:item,key,active:'minus'})"
                    >-</button>
                    <input
                      class="input-simple rounded-none"
                      v-model="item.quantity"
                      type="number"
                    >
                    <button
                      type="button"
                      class="btn-outline-red"
                      @click="changeQuantity({product:item,key,active:'plus'})"
                    >+</button>
                  </div>
                </td>
                <td class=" table-box text-right">{{ subTotal(item) | thousandsFormat }}</td>
                <td class=" table-box text-center">
                  <button
                    class="btn btn-red px-3"
                    @click="deleteProduct({product:item.product, key,isInServer:item.isInServer})"
                  >
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- cart content end -->
        <!-- order detail -->
        <Cart__detail class="w-1/3 ml-5"></Cart__detail>
        <!-- order detail end -->
      </div>
      <!-- cart end -->
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  name: 'Cart',
  data() {
    return {};
  },
  components: {
    CheckoutProcess: () =>
      import(
        /* webpackChunkName: "CheckoutProcess" */ '@/views/Layout/common/TimelineProcess.vue'
      ),
    Cart__detail: () =>
      import(
        /* webpackChunkName: "Cart__detail" */ '@/views/Layout/Cart/Cart__detail.vue'
      ),
    Breadcrumbs: () =>
      import(
        /* webpackChunkName: "CheckoutProcess" */ '@/views/Layout/common/Breadcrumbs.vue'
      ),
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.isLoading,
      fullPage: (state) => state.fullPage,
    }),
    ...mapState('cart', { cartProducts: (state) => state.cartProducts }),
  },
  methods: {
    ...mapMutations('cart', {
      addToCartHadFind: 'addToCartHadFind',
    }),
    ...mapActions('cart', {
      changeQuantity: 'changeQuantity',
      deleteProduct: 'deleteProduct',
      clearCartAll: 'clearCartAll',
    }),
    subTotal(item) {
      return item.product.price * item.quantity;
    },
  },
};
</script>

<style lang="scss" module>
@import '@/assets/scss/component/Cart/Cart.module';
</style>

