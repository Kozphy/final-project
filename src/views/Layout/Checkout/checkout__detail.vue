<template>
  <div>
    <!-- order detail -->
    <div
      class="checkout__detail"
      :class="$style['checkout__detail']"
    >
      <h4
        class="detail-box checkout__detail__title"
        :class="$style['checkout__detail__title']"
      >訂單明細</h4>
      <div class="checkout__detail__content">
        <table class="table-fixed w-full border-b border-solid border-gray-500">
          <thead>
            <tr>
              <th class="detail-box text-xl">商品</th>
              <th class="detail-box text-xl">數量</th>
              <th class="detail-box text-xl">價格</th>
            </tr>
          </thead>
          <tbody>
            <tr
              :key="product+key"
              v-for="(product, key) in cartProducts"
            >
              <td class="detail-box text-center">
                {{product.product.title}}
              </td>
              <td class="detail-box text-center">
                {{product.quantity}}
              </td>
              <td class="detail-box text-center">
                {{product.product.price | thousandsFormat}}
              </td>
            </tr>
          </tbody>
        </table>
        <div class="detail-box text-right">
          <span class="text-right text-xl">折扣：</span>
          <span class="text-right text-xl">
            -{{ discountNumber | thousandsFormat }}
          </span>
        </div>
        <div class="detail-box text-right">
          <span class="text-right text-xl">總共：</span>
          <span class="text-right text-xl">
            {{ finalTotal | thousandsFormat}}
          </span>
        </div>
      </div>
    </div>
    <!-- order detail end -->
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState('cart', { cartProducts: (state) => state.cartProducts }),
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
};
</script>

<style lang="scss" module>
@import '@/assets/scss/component/checkout/checkout_detail';
</style>