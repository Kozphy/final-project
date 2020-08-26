<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <router-link
        class="navbar-brand"
        to="/admin"
      >後台管理頁面</router-link>
      <button
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
        class="navbar-toggler"
        data-target="#navbarSupportedContent"
        data-toggle="collapse"
        type="button"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse">
        <ul class="navbar-nav mr-auto">
          <router-link
            :key="item + key"
            :to="item.route"
            class="nav-item"
            tag="li"
            v-for="(item, key) in selectPage"
          >
            <a
              :class="{active: currentPage === item.route ? true : false }"
              :data-hover="item.pageName"
              class="nav-link"
              href="#"
            >{{item.pageName}}</a>
          </router-link>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <button
            @click="changePage"
            class="btn btn-outline-success d-flex align-items-end"
            type="submit"
          >
            <span class="material-icons shop-cart">shopping_cart</span>
          </button>
        </form>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
import { checkToken } from '@/utils/api';

export default {
  name: 'Dashboard',
  data() {
    return {
      api_token: '',
      selectPage: [
        {
          pageName: '產品管理頁面',
          isActive: false,
          route: '/admin/products',
        },
        {
          pageName: '優惠券管理頁面',
          isActive: false,
          route: '/admin/coupons',
        },
        {
          pageName: '訂單管理頁面',
          isActive: false,
          route: '/admin/orders',
        },
        {
          pageName: '圖片儲存列表頁',
          isActive: false,
          route: '/admin/ImgStorage',
        },
      ],
    };
  },
  methods: {
    checkLogin() {
      checkToken({ api_token: this.api_token }).catch(() => {
        this.$router.push('/login');
      });
    },
    changePage() {
      this.$router.push('/admin/ShopCart');
    },
  },
  computed: {
    currentPage() {
      return this.$route.path;
    },
  },
  created() {
    this.api_token = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      '$1',
    );
    this.checkLogin();
    this.$toasted.show(
      '登入成功!!', {
        icon: {
          name: 'verified_user',
        },
      },
    );
  },

};
</script>

<style lang="scss">
  @import '@/assets/scss/component/_Dashboard.scss';
</style>
