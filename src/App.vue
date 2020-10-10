<template>
  <div id="app">
    <router-view name="navbar"></router-view>
    <router-view />
    <router-view name="footer"></router-view>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'app',
  data() {
    return {};
  },
  methods: {
    ...mapActions('cart', {
      getCart: 'getCart',
    }),
    ...mapActions('products', {
      getProducts: 'getProducts',
    }),
  },
  created() {
    // 網頁一進入先取得購物車，因為在商品頁加入購物車時較好調整
    this.getCart();
    // 先載入產品資料，當切換到展品頁時，就不用讀取，使用者體驗較好
    this.getProducts();
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/tailwindcss';
</style>

