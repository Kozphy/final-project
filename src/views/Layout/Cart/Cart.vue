<template>
  <div class="pt-16">
    <div class="container mx-auto mt-32">
      <table class="table-auto w-full">
        <caption class="mb-5">購物車資料</caption>
        <thead>
          <tr>
            <th class="px-4 py-2">分類</th>
            <th class="px-4 py-2">商品</th>
            <th
              width="150"
              class="px-4 py-2"
            >數量</th>
            <th class="px-4 py-2">價格</th>
            <th class="px-4 py-2">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr
            :key="product + key"
            v-for="(product, key) in cartProducts"
          >
            <td class="border px-4 py-2">{{ product.category }}</td>
            <td class="border px-4 py-2">{{ product.title }}</td>
            <td class="flex border px-4 py-2">
              <button
                type="button"
                class="btn-change-quantity"
                @click="updateQuantity({...product, active:'minus'})"
              >-</button>
              <input
                class="input-simple rounded-none"
                :value="product.quantity"
                type="number"
              >
              <button
                type="button"
                class="btn-change-quantity"
                @click="updateQuantity({...product, active:'plus'})"
              >+</button>
            </td>
            <td class="border px-4 py-2">{{ product.price | thousandsFormat }}</td>
            <td class="border px-4 py-2 text-center">
              <button class="btn bg-blue-500 hover:bg-blue-600 hover:text-white
              transition-all duration-300 ease-in-out">
                刪除
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapState(['cartProducts']),
  },
  methods: {
    ...mapActions(['updateQuantity']),
  },
};
</script>
