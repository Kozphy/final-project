<template>
  <div>
    <div
      :key="item+key"
      v-for="(item,key) in orders"
    >
    {{}}
      {{item.products[0].product}}
    </div>
  </div>
</template>

<script>
import { getFrontOrders } from '@/utils/api';
export default {
  data() {
    return {
      orders: [],
    };
  },
  methods: {
    getOrders(query) {
      if (!query) {
        const searchPara = {
          page: 1,
          paged: 10,
        };
        getFrontOrders(searchPara)
          .then((res) => {
            console.log(res.data.data);
            this.orders = res.data.data;
          })
          .catch((rej) => {
            throw rej;
          });
      }
    },
  },
  created() {
    this.getOrders();
  },
};
</script>