<template>
  <!-- nav start -->
  <div :class="$style.red">
    <!-- nav left -->
    <nav
      class="sidebar__left flex-col"
      :class="[$style['navbar-base'],$style['sidebar__left']]"
    >
      <!-- icon -->
      <router-link
        :to="{ name: selectPage[0].route }"
        class="flex cursor-pointer"
        tag="div"
      >
        <span class="transform translate-y-1">
          <i class="fas fa-cheese text-2xl ml-2 text-white"></i>
        </span>
        <h1 class="text-xl ml-2 text-white transition transform duration-300 ease-in-out
          hover:font-semibold">E a Z :D</h1>
      </router-link>
      <div
        class="sidebar__left__content"
        :class="[$style['sidebar__left__content']]"
      >
        <ul>
          <router-link
            :key="item + key"
            v-for="(item, key) in selectPage"
            tag="li"
            :to="{name:item.route}"
            class="left-right ml-3 text-white
            transition-all duration-300"
            :class="[{[$style.active]:isActive(item)} ,$style['nav-button'],$style['border-underline']]"
          >
            {{item.pageName}}
          </router-link>
        </ul>
      </div>
    </nav>
    <!-- nav right -->
    <nav
      class="sidebar__right grid grid-cols-2 gap-1 z-10"
      :class="[$style['sidebar__right']]"
    >
      <router-link
        tag="button"
        type="button"
        class="shopping"
        :to="{name: selectPage[2].route}"
      >
        <span
          class="material-icons md-36 md-light "
          :class="[$style['navbar-base']]"
        >shopping_cart</span>
      </router-link>
      <dropdown
        class="personal"
        :class="[$style['personal']]"
        :class_to_send="[{dropdown:$style['dropdown']},{dropdownBase:$style['dropdown-base']},{navbarBase:$style['navbar-base']}]"
      >
      </dropdown>
    </nav>
    <!-- nav end -->
  </div>
</template>


<script>
import dropdown from './component/Droupdown.vue';

export default {
  name: 'Menu',
  data() {
    return {
      selectPage: [
        {
          pageName: '首頁',
          isActive: false,
          route: 'Home',
        },
        {
          pageName: '產品列表',
          isActive: false,
          route: 'Products',
        },
        {
          pageName: '購物車',
          isActive: false,
          route: 'Cart',
        },
        {
          pageName: '最新活動',
          isActive: false,
          route: 'NewEvent',
        },
      ],
    };
  },
  components: {
    dropdown,
  },
  methods: {
    isActive(item) {
      let result = false;
      if (item.route === this.$route.name) {
        result = true;
      }
      return result;
    },
  },
};
</script>

<style lang="scss" module>
@import '@/assets/scss/component/Navbar/Navbar.module';
</style>