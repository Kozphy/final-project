<template>
  <div
    class="section-index grid grid-cols-12 grid-flow-row"
    :class="[$style['section-index']]"
  >
    <!-- content start -->
    <router-view class="content col-span-12"></router-view>
    <!-- content end -->
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {};
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
