<template>
  <div class="footer col-span-12  bg-black py-16  w-full">
    <footer>
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
              class="text-xl"
              :class="$style['border-underline']"
            >{{item.name}}</router-link>
          </div>
        </div>
      </div>
    </footer>

  </div>
</template>

<script>
export default {
  name: 'bottomfooter',
  data() {
    return {
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

<style lang="scss" module>
@import '@/assets/scss/component/Navbar/Navbar.module';
</style>