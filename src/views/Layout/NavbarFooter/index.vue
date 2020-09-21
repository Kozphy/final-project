<template>
  <div>
    <nav class="fixed w-full bg-gray-900 flex justify-between items-center px-3 py-3 z-10 ">
      <div class="flex items-center justify-between w-full">
        <!-- nav left -->
        <router-link
          to="/Layout/Home"
          class="flex cursor-pointer"
          tag="div"
        >
          <span class="transform translate-y-1">
            <i class="fas fa-cheese text-2xl ml-2 text-white"></i>
          </span>
          <h1 class="text-xl ml-2 text-white transition transform duration-300 ease-in-out
          hover:font-semibold">E a Z :D</h1>
        </router-link>
        <ul class="flex">
          <router-link
            :key="item + key"
            v-for="(item, key) in selectPage"
            tag="li"
            :to="item.route"
            class="border-underline left-right nav-button ml-3 text-white
            transition-all duration-300"
            :class="{ active:isActive(item) }"
          >
            {{item.pageName}}
          </router-link>
        </ul>
        <!-- nav right -->
        <div>
          <droupdown class="z-10"></droupdown>
        </div>
      </div>
    </nav>
    <router-view></router-view>
    <!-- footer start -->
    <footer class="bg-black py-16">
      <div class="container mx-auto">
        <!-- title -->
        <h2 class="text-white text-3xl border-solid border-b border-white">EaZ:D</h2>
        <!-- content -->
        <div class="flex flex-between w-full py-6">
          <!-- start -->
          <div class="flex-1 flex flex-col text-white">
            <p>
              地址：台中市 EAZ 路 D 巷 87 號
            </p>
            <p>營業時間：08：00&nbsp;～&nbsp;18：00</p>
          </div>
          <!-- center -->
          <span class="flex-1 flex text-white justify-center items-center">
            © 2020. All Rights Reserved.
          </span>
          <!-- right -->
          <div class="flex-1 flex justify-evenly  items-center text-white">
            <router-link
              :key="item + key"
              v-for="(item, key) in footerLink"
              tag="a"
              :to="item.link"
              class="text-xl border-underline"
            >{{item.name}}</router-link>
          </div>
        </div>
      </div>
    </footer>
    <!-- footer end -->
  </div>
</template>

<script>
import droupdown from './component/Droupdown.vue';

export default {
  name: 'nabar',
  data() {
    return {
      selectPage: [
        {
          pageName: '首頁',
          isActive: false,
          route: '/',
        },
        {
          pageName: '產品列表',
          isActive: false,
          route: '/Layout/products',
        },
        // {
        //   pageName: '優惠活動',
        //   isActive: false,
        //   route: '/Layout/about',
        // },
        {
          pageName: '最新活動',
          isActive: false,
          route: '/Layout/NewEvent',
        },
      ],
      footerLink: [
        {
          name: '產品列表',
          link: '/Layout/products',
        },
        {
          name: '關於作者',
          link: '/Layout/Author',
        },
        {
          name: '登入',
          link: '/Layout/Login',
        },
        // {
        //   name: '地址',
        //   link: '/Layout/Address',
        // },
      ],
    };
  },
  components: {
    droupdown,
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
