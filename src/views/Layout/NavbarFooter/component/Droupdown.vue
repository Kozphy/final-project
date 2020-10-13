<template>
  <div class="relative">
    <button type="button">
      <span
        class="material-icons md-36 md-light "
        :class="decoration['navbarBase']"
      >
        account_circle
      </span>
    </button>
    <div
      class="absolute right-0 mt-1"
      :class="[decoration['dropdown'], decoration['dropdownBase']]"
    >
      <router-link
        tag="a"
        class="block px-4 py-2 hover:bg-white
        hover:text-black"
        :key="item + key"
        v-for="(item, key) in dropData"
        :to="{name:item.route}"
      >
        {{item.pageName}}
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dropdown',
  props: {
    class_to_send: {
      type: Array,
    },
  },
  data() {
    return {
      dropData: [
        {
          pageName: '登入',
          isActive: false,
          route: 'CheckoutSuccess',
        },
        {
          pageName: '我的訂單',
          isActive: false,
          route: 'MyOrder',
        },
      ],
      decoration: {},
    };
  },
  created() {
    let result = this.class_to_send;
    let { 0: dropdown, 1: dropdownBase, 2: navbarBase } = result;
    this.decoration = {
      ...dropdown,
      ...dropdownBase,
      ...navbarBase,
    };
  },
};
</script>

