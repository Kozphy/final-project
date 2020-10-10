<template>
  <div>
    <!-- order detail -->
    <div
      class="cart__detail"
      :class="$style['cart__detail']"
    >
      <h4
        class="detail-box cart__detail__title"
        :class="$style['cart__detail__title']"
      >購物車明細</h4>
      <div class="cart__detail__content">
        <div class="detail-box flex justify-between">
          <span class="text-xl">小計：</span>
          <span>{{cartTotal | thousandsFormat}}</span>
        </div>
        <div class="detail-box flex justify-between">
          <span class="text-xl">
            折扣：
          </span>
          <span>-{{ discountNumber | thousandsFormat }}</span>
        </div>

        <div class="detail-box ">
          <div class="flex border border-solid border-gray-500 vid-parent">
            <loading
              v-if="!fullPage"
              :active.sync="isLoading"
              :is-full-page="fullPage"
              :height="32"
              :width="32"
              loader="bars"
            ></loading>
            <input
              placeholder="請輸入優惠券代碼"
              id="discount"
              class="w-full outline-none px-3"
              v-model="discountCode"
            >
            <button
              ref="spining"
              @click="getDiscount(discountCode)"
              class="btn btn-outline-blue rounded-none  px-5 py-3"
            ><i class="fas fa-mouse"></i></button>
          </div>
          <div class="bg-blue-200 py-2 px-2 mt-2">輸入 coupon1 取得優惠</div>
        </div>

        <div class="detail-box">
          <span class="text-right text-2xl">總共：</span>
          <span class="text-right text-2xl">
            {{ finalTotal | thousandsFormat}}
          </span>
        </div>
      </div>
      <!-- back & next button start -->
      <div class="cart__detail__footer flex justify-between my-5 table-box">
        <router-link
          to="/Layout/Products"
          tag="button"
          type="button"
          class="btn btn-outline-blue px-4"
        >上一頁</router-link>
        <router-link
          to="/Layout/checkout"
          class="btn btn-blue px-4"
        >結帳
        </router-link>
      </div>
      <!-- back & next button end -->
    </div>
    <!-- order detail end -->
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      discountCode: '',
    };
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.isLoading,
      fullPage: (state) => state.fullPage,
    }),
    ...mapGetters('cart', {
      cartTotal: 'sumTotal',
      couponPercent: 'couponPercent',
      finalTotal: 'finalTotal',
    }),
    discountNumber: {
      get: function () {
        return this.couponPercent
          ? Math.round(this.cartTotal * (1 - this.couponPercent / 100))
          : 0;
      },
    },
  },
  methods: {
    ...mapActions('cart', {
      getDiscount: 'getDiscount',
    }),
  },
};
</script>

<style lang="scss" module>
@import '@/assets/scss/component/Cart/cart_detail.module';
</style>

