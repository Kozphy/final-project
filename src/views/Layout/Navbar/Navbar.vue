<template>
  <div>
    <nav class="bg-gray-900 flex justify-between items-center px-4 py-3">
      <div class="flex items-center">
        <router-link
          to="/Layout/Home"
          class="flex cursor-pointer"
          tag="div"
        >
          <span class="transform translate-y-1">
            <i class="fas fa-cheese text-2xl ml-2 text-white"></i>
          </span>
          <h1
            class="text-xl ml-2 text-white"
            style="font-family: 'Architects Daughter', cursive;"
          >Cheeze :D</h1>
        </router-link>>
        <ul class="flex">
          <router-link
            :key="item + key"
            v-for="(item, key) in selectPage"
            tag="li"
            :to="item.route"
            class="ml-3 text-white rounded px-2 py-2 hover:bg-orange-400 hover:text-black
            cursor-pointer transition-all ease-out duration-300"
            :class="{ active:isActive(item) }"
          >
            {{item.pageName}}
          </router-link>
        </ul>
      </div>
      <div>
        <button
          class="bg-transparent text-white-700 font-semibold hover:text-black
        py-2 px-4 border border-white hover:bg-orange-400 hover:border-transparent rounded mr-2
        transition-all ease-out duration-300  text-gray-100 "
          type="button"
        >
          <i class="fas fa-shopping-cart"></i>
        </button>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectPage: [
        {
          pageName: '首頁',
          isActive: false,
          route: '/Layout/Home',
        },
        {
          pageName: '產品列表',
          isActive: false,
          route: '/Layout/products',
        },
        {
          pageName: '購物車',
          isActive: false,
          route: '/Layout/cart',
        },
        {
          pageName: '優惠活動',
          isActive: false,
          route: '/Layout/about',
        },
        {
          pageName: '關於作者',
          isActive: false,
          route: '/Layout/checkout',
        },
        {
          pageName: '結帳完成',
          isActive: false,
          route: '/Layout/checkoutSuccess',
        },
      ],
    };
  },
  methods: {
    isActive(item) {
      let result = false;
      if (item.route === this.$route.path) {
        result = true;
      }
      return result;
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/component/_Navbar';
</style>
