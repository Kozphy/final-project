<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <h2 class="font-weight-bold">
            {{this.product.title}}
            <span class="badge badge-pill badge-secondary">New</span>
          </h2>
          <blockquote class="blockquote mt-4">
            <p class="goods-content">{{this.product.content}}</p>
            <footer class="blockquote-footer">商品描述：{{this.product.description}}</footer>
          </blockquote>
          <div class="d-flex justify-content-end align-items-end my-4">
            <del class="text-muted h5 mb-0">原價：{{ this.product.origin_price | thousandsFormat}}</del>
            <span class="text-danger font-weight-bold h3 ml-auto mb-0">現在只要：{{ this.product.price | thousandsFormat }}</span>
          </div>
          <validation-observer v-slot="{ invalid }">
            <form>
              <validation-provider
                rules="required"
                v-slot="{ errors, classes }"
              >
                <div class="form-group">
                  <label for="selectQuantity">請選擇數量</label>
                  <select
                    :class="classes"
                    class="custom-select"
                    id="selectQuantity"
                    name="數量"
                    v-model="validQuantity"
                  >
                    <option
                      disabled
                      hidden
                      value
                    >請選擇數量</option>
                    <option
                      :key="item + key"
                      :value="item"
                      v-for="(item, key) in 5"
                    >{{item}}</option>
                  </select>
                  <span class="invalid-feedback">{{ errors[0] }}</span>
                </div>
              </validation-provider>
            </form>
            <button
              :disabled="invalid"
              class="btn btn-primary btn-block"
              type="button"
            >加入購物車</button>
          </validation-observer>
        </div>
        <div class="col-md-6">
          <img
            :src="product.imageUrl"
            alt
            class="w-100"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { frontApiProduct } from '@/utils/api';

export default {
  data() {
    return {
      isLoading: true,
      validQuantity: '',
      product: {},
    };
  },
  methods: {
    getProduct() {
      this.isLoading = true;
      const { id } = this.$route.params;
      frontApiProduct(id)
        .then((res) => {
          this.product = res.data;
          this.isLoading = false;
        })
        .catch((rej) => {
          this.isLoading = false;
          throw rej;
        });
    },
  },
  created() {
    this.getProduct();
  },
};
</script>

<style lang="scss">
.goods-content {
  text-indent: 2rem;
}
</style>
