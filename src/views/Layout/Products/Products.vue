<template>
  <div>
    <!-- <loading :active.sync="isLoading"></loading> -->
    <!-- landscape start -->
    <div class="landscape mb-10">
      <div
        class="w-full bg-cover bg-no-repeat bg-center relative"
        style="height:600px; background-image:url(https://images.unsplash.com/photo-1591391615688-6a1ae0f41307?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60);"
      >
        <div
          class="absolute transform -translate-y-1/2 bg-black bg-opacity-25 w-full text-center
          py-24"
          style="top:50%;"
        >
          <h3 class="text-5xl text-white">產品專區</h3>
        </div>
      </div>
    </div>
    <!-- landscape end -->
    <div class="container mx-auto">
      <!-- card start -->
      <h3 class="text-3xl">分類</h3>
      <div class="flex">
        <div class="w-1/6 mt-5">
          <!-- left list -->
          <ul class="divide-y divide-gray-400 border border-solid border-gray-400 rounded-md">
            <li
              class="rounded p-3 hover:bg-gray-300 cursor-pointer"
              :key="category + key"
              v-for="(category, key) in ListCategory"
            >{{category}}</li>
          </ul>
        </div>
        <!-- right product -->
        <div class="flex flex-wrap w-5/6">
          <div
            class="w-1/3 p-5 "
            :key="product + key"
            v-for="(product, key) in products"
          >
            <div class="card relative">
              <!-- img & hover effect -->
              <img
                class="w-full object-cover"
                style="height:250px"
                :src="product.imageUrl[0]"
                :alt="product.imageUrl[0]"
              >
              <div class="px-6 py-4">
                <!-- title -->
                <div class="font-bold text-xl mb-2">{{product.title}}</div>
                <!-- content -->
                <p class="text-gray-700 text-base">
                  {{product.content}}
                </p>
              </div>
              <!-- badge -->
              <div class="px-6 pt-4 pb-2">
                <span
                  class="inline-block"
                  :class="$style['badge-simple']"
                >#photography</span>
              </div>
              <div :class="$style['black-screen']">
                <span
                  class="text-3xl"
                  :class="$style['show-more']"
                >
                  檢視更多&nbsp;
                  <i class="fas fa-arrow-right"></i>
                </span>
              </div>
              <!-- add to cart -->
              <div
                class="mx-6 mb-6"
                :class="$style['purchase']"
              >
                <button
                  class="btn btn-blue w-full 
                "
                  @click="addToCart(product)"
                >
                  加入購物車
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- card end -->
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'products',
  data() {
    return {
      isLoading: false,
      showSpinner: false,
    };
  },
  methods: {
    ...mapActions('products', {
      addToCart: 'addToCart',
    }),
    // ...mapActions(['addToCart']),
    showDetail(id) {
      this.showSpinner = true;
      this.$router.push(`/Layout/product/${id}`);
    },
  },
  computed: {
    ...mapState('products', {
      products: (state) => {
        return state.products;
      },
    }),
    ListCategory() {
      const temp = [];
      this.products.forEach((item) => {
        temp.push(item.category);
      });
      const result = temp.filter(
        (item, index, arr) => arr.indexOf(item) === index
      );
      return result;
    },
  },
};
</script>

<style lang="scss" module>
@import '@/assets/scss/component/Products/Products.module';
</style>
