<template>
  <div class="relative">
    <button class="flex items-end bg-transparent text-white-700 border-none
    hover:border-transparent transition-all ease-out duration-300">
      <span class="material-icons  md-36 md-light outline-none">
        account_circle
      </span>
    </button>
    <div class="absolute right-0 mt-3 px-2 py-2 w-48 bg-white rounded-lg shodaw-xl">
      <router-link
        tag="a"
        class="block px-4 py-2 text-gray-800 hover:bg-gray-500
        hover:text-white"
        :key="item + key"
        v-for="(item, key) in dropData"
        :to="item.route"
      >
        {{item.pageName}}
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dropData: [
        {
          pageName: '登入',
          isActive: false,
          route: '/Layout/checkoutSuccess',
        },
        {
          pageName: '查看訂單',
          isActive: false,
          route: '/Layout/cart',
        },
      ],
    };
  },
};
</script>
