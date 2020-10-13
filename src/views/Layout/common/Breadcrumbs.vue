<template>
  <!-- breadcrumbs start -->
  <div class="mx-auto">
    <nav class="breadcrumbs font-sans w-full p-2 my-5  border-b border-solid
      border-gray-500">
      <ul class="flex text-grey-dark">
        <router-link
          :key="item + key"
          v-for="(item, key) in breadcrumbs"
          :to="{name:item.page}"
        >
          <a
            href="#"
            class="text-blue font-bold"
          >{{ item.title }}</a>
          <span
            v-show="item.slash"
            class="mx-2"
          >/</span>
        </router-link>
      </ul>
    </nav>
  </div>
  <!-- breadcrumbs end -->
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'breadcrumbs',
  data() {
    return {};
  },

  computed: {
    ...mapGetters({
      checkoutBreadcrumbs: 'checkoutBreadcrumbs',
      cartBreadcrumbs: 'cartBreadcrumbs',
    }),
    breadcrumbs() {
      if (this.$route.name === 'Cart') {
        return this.cartBreadcrumbs;
      }
      return this.checkoutBreadcrumbs;
    },
  },
};
</script>