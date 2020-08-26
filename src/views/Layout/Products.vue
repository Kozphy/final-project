<template>
  <div>
    <!-- <loading :active.sync="isLoading"></loading> -->
    <div class="container">
      <div class="row">
        <div
          :key="item + key"
          class="col-md-4 mb-3"
          v-for="(item, key) in products"
        >
          <div class="card h-100">
            <div
              :style="{ backgroundImage: `url(${item.imageUrl})` }"
              alt
              class="card-img-top"
              style="height:20rem;background-position:center center;background-size:cover;"
            ></div>
            <div class="card-body">
              <div class="h-100 d-flex flex-column justify-content-around">
                <h3 class="card-title">{{item.title}}</h3>
                <p class="card-text">{{item.content}}</p>
                <div class="d-flex justify-content-end align-items-end">
                  <del class="card-text">原價 {{item.origin_price | thousandsFormat}}</del>
                  <span class="h5 card-text text-danger ml-auto">
                    現在只要 {{item.price | thousandsFormat}}
                  </span>
                </div>
              </div>
            </div>
            <div class="card-footer">
              <button
                @click="showDetail(item.id)"
                class="btn btn-danger btn-block"
                type="button"
              >
                <span
                  class="spinner-border spinner-border-sm text-secondary"
                  v-show="showSpinner"
                ></span>
                查看更多
              </button>
              <button
                class="btn btn-primary btn-block"
                href="#"
                type="button"
              >加入購物車</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { fontApiProducts } from '@/utils/api';

export default {
  data() {
    return {
      isLoading: false,
      showSpinner: false,
      products: [],
    };
  },
  methods: {
    getProducts() {
      this.isLoading = true;
      fontApiProducts(1).then((res) => {
        this.products = res.data.data;
        this.isLoading = false;
      }).catch((rej) => {
        this.isLoading = false;
        throw rej;
      });
    },
    showDetail(id) {
      this.showSpinner = true;
      this.$router.push(`/Layout/product/${id}`);
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
