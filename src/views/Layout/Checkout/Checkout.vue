<template>
  <div class="py-16">
    <loading
      :active.sync="isLoading"
      :is-full-page="fullPage"
      loader="bars"
    ></loading>
    <!-- breadcrumbs start -->
    <div class="w-1/2 mx-auto">
      <Breadcrumbs></Breadcrumbs>
    </div>
    <!-- breadcrumbs end -->
    <!-- checkoutProcess start -->
    <checkoutProcess :page="'checkout'"></checkoutProcess>
    <!-- checkoutProcess end -->
    <div class="w-1/2 mx-auto my-16">
      <Checkout__detail></Checkout__detail>
      <div class="from__start mt-16">
        <h3 class="text-3xl font-bold text-center">購買資訊</h3>
        <!-- form start -->
        <validation-observer v-slot="{ passed }">
          <form @submit.prevent>
            <validation-provider
              tag="div"
              :rules="item.rules"
              :key="item + key"
              v-for="(item, key) in form.section1"
              v-slot="{ errors , classes, valid }"
              class="form-divide my-2"
            >
              <label
                :class="$style['form__title__size']"
                :for="item.id"
              >{{item.title}}</label>
              <input
                class="input-simple icon mt-2"
                :class="classes"
                :id="item.id"
                :type="item.type"
                :name="item.title"
                v-model="item.validation"
              >
              <div
                v-show="valid"
                :class="[$style.icon,$style['icon-success']]"
              ></div>
              <div
                :class="[$style.icon,$style['icon-warning']]"
                v-show="errors[0]"
              >
                <small class="error-text-color">{{ errors[0] }}</small>
              </div>
            </validation-provider>
            <!-- payment -->
            <validation-provider
              tag="div"
              :rules="form.section2.rule"
              v-slot="{ errors, classes }"
              class="my-2"
            >
              <label
                :class="$style['form__title__size']"
                for="purchaseWay"
              >付款方式</label>
              <div
                :class="[$style.icon,$style['icon-down']]"
                class="mt-2"
              >
                <select
                  id="purchaseWay"
                  class="input-simple appearance-none"
                  v-model="form.section2.validation"
                  name="付款方式"
                  :class="classes"
                >
                  <option
                    value=""
                    selected
                    disabled
                    hidden
                  >請選擇購買方式</option>
                  <option
                    :key="payment + key"
                    v-for="(payment, key) in form.section2.content"
                    :value="payment"
                  >{{payment}}</option>
                </select>
              </div>
              <small class="error-text-color">{{errors[0]}}</small>
            </validation-provider>
            <!-- comment -->
            <div class="form-divide">
              <label
                :class="$style['form__title__size']"
                for="inputComment"
              >留言</label>
              <textarea
                class="input-simple mt-2"
                name="inputComment"
                id="inputComment"
                cols="30"
                rows="3"
                v-model="form.section2.comments"
              ></textarea>
            </div>
            <div class="flex flex-end mt-5">
              <router-link
                to="/Layout/cart"
                tag="button"
                type="button"
                class="btn btn-outline-blue px-4"
              >上一頁</router-link>
              <input
                :disabled="!passed"
                :class="{'btn-disabled':!passed}"
                type="submit"
                value="送出訂單"
                class="btn btn-blue ml-auto"
                @click="changePage({gap:cartProductsGap,form})"
              >
            </div>
          </form>
        </validation-observer>
        <!-- form end -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      fullPage: true,
      form: {
        section1: [
          {
            title: '姓名',
            type: 'text',
            id: 'inputName',
            validation: '',
            rules: 'required',
          },
          {
            title: '信箱',
            type: 'email',
            id: 'inputEmail',
            validation: '',
            rules: 'required|email',
          },
          {
            title: '電話',
            type: 'tel',
            id: 'Inputtel',
            validation: '',
            rules: 'required|digits:10',
          },
          {
            title: '地址',
            type: 'text',
            id: 'inputAddress',
            validation: '',
            rules: 'required',
          },
        ],
        section2: {
          rule: 'required',
          content: [
            'WebATM',
            'ATM',
            'Barcode',
            'Credit',
            'ApplePay',
            'GooglePay',
          ],
          validation: '',
          comments: '',
        },
      },
    };
  },
  components: {
    CheckoutProcess: () =>
      import(
        /* webpackChunkName: "CheckoutProcess" */ '@/views/Layout/common/TimelineProcess'
      ),
    Checkout__detail: () =>
      import(
        /* webpackChunkName: "CheckoutProcess" */ '@/views/Layout/Checkout/checkout__detail'
      ),
    Breadcrumbs: () =>
      import(
        /* webpackChunkName: "BreadCrumbs" */ '@/views/Layout/common/Breadcrumbs'
      ),
  },
  computed: {
    ...mapState('cart', {
      cartProductsGap: 'cartProductsGap',
    }),
    ...mapState({
      isLoading: 'isLoading',
    }),
  },
  methods: {
    ...mapActions('checkout', {
      changePage: 'changePage',
    }),
  },
};
</script>

<style lang="scss" module>
@import '@/assets/scss/component/checkout/FormStyle';
</style>
