<template>
  <div class="pt-16">
    <div class="container mx-auto ">
      <!-- cart start -->
      <table class="table-auto w-full my-32">
        <caption class="mb-5 text-4xl">訂單內容</caption>
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
                v-model="product.quantity"
                type="number"
              >
              <button
                type="button"
                class="btn-change-quantity"
                @click="updateQuantity({...product, active:'plus'})"
              >+</button>
            </td>
            <td class="border px-4 py-2">{{ product.price  }}</td>
            <td class="border px-4 py-2 text-center">
              <button class="btn btn-blue">
                刪除
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- cart end -->
    <div class="w-1/2 mx-auto">
      <validation-observer>
        <form>
          <validation-provider
            :key="item + key"
            v-for="(item, key) in form"
            v-slot="{ errors }"
            class="flex flex-col mb-5"
          >
            <label
              class="text-2xl mb-3"
              :for="item.id"
            >{{item.title}}</label>
            <input
              class="input-simple"
              :id="item.id"
              type="email"
              v-model="item.validation"
            >
            <small class="text-red-600">{{ errors[0] }}</small>
          </validation-provider>
          <div class="w-full">
            <button
              type="button"
              class="btn btn-blue ml-auto"
            >送出訂單</button>
          </div>
        </form>
      </validation-observer>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      form: [
        {
          title:'姓名',
          id: 'inputName',
          validation: '',
        },
        {
          title: '信箱',
          id: 'inputEmail',
          validation: '',
        }
      ],
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
