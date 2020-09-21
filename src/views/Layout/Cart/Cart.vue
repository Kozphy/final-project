<template>
  <div class="pt-16">
    <div class="container mx-auto ">
      <!-- breadcrumbs start -->
      <nav class="breadcrumbs font-sans w-full p-2 my-5  border-b border-solid
      border-gray-500">
        <ul class="flex text-grey-dark">
          <li
            :key="item + key"
            v-for="(item, key) in breadcrumbs"
          >
            <a
              href="#"
              class="text-blue font-bold"
            >{{ item.title }}</a>
            <span
              v-show="item.slash"
              class="mx-2"
            >/</span>
          </li>
        </ul>
      </nav>
      <!-- breadcrumbs end -->
      <!-- timeline start -->
      <div class="checkout__timeline relative my-8">
        <div
          class="checkout__timeline__line"
          :key="item + key"
          v-for="(item, key) in [1,2,3,4]"
        >
          <div class="checkout__timeline__circle">
            <div>
              {{item}}
            </div>
            <div class="checkout__timeline__text text-black">0000</div>
          </div>
        </div>
      </div>
      <!-- timeline end -->
      <!-- cart start -->
      <table class="table-auto w-full mb-32 ">
        <thead>
          <tr>
            <th
              width="150"
              class="px-4 py-2 border-t"
            >操作</th>
            <th class="px-4 py-2 border-t">分類</th>
            <th class="px-4 py-2 border-t">商品名稱</th>
            <th
              width="150"
              class="px-4 py-2 border-t"
            >數量</th>
            <th class="px-4 py-2 text-right border-t">小計</th>
          </tr>
        </thead>
        <tbody>
          <tr
            :key="product + key"
            v-for="(product, key) in cartProducts"
          >
            <td class="border-t px-4 py-2 text-center">
              <button class="btn btn-red px-3">
                <i class="fas fa-trash-alt"></i>
              </button>
            </td>
            <td class="border-t px-4 py-2">{{ product.category }}</td>
            <td class="border-t px-4 py-2">{{ product.title }}</td>
            <td class="flex border-t px-4 py-2">
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
            <td class="border-t px-4 py-2 text-right">{{ subTotal(product) | thousandsFormat }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr
            height="50"
            class="border-t"
          >
            <td
              colspan="4"
              class="text-right"
            >
              折扣：
            </td>
            <td class="text-right">-0</td>
          </tr>
          <tr
            height="50"
            class="border-t"
          >
            <td colspan="2">
              <div class="flex rounded-lg border border-solid border-gray-500">
                <label
                  for="discount"
                  class="w-1/6 px-2 py-2 bg-gray-400 text-center rounded-l-lg"
                >
                  優惠券
                </label>
                <input
                  id="discount"
                  class="w-full outline-none px-3 rounded-r-lg"
                >
              </div>
            </td>
            <td
              colspan="2"
              class="text-right"
            >總計：</td>
            <td class="text-right">
              {{ sumTotal | thousandsFormat}}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
    <!-- cart end -->
    <div class="w-1/2 mx-auto mb-20">
      <validation-observer v-slot="{ passed }">
        <form>
          <validation-provider
            :rules="item.rules"
            :key="item + key"
            v-for="(item, key) in form.section1"
            v-slot="{ errors , classes, valid }"
            class="form-divide"
          >
            <label
              class="title-size"
              :for="item.id"
            >{{item.title}}</label>
            <input
              class="input-simple icon"
              :class="classes"
              :id="item.id"
              :type="item.type"
              :name="item.title"
              v-model="item.validation"
            >
            <div
              v-show="valid"
              class="icon icon-success"
            ></div>
            <div
              class="icon icon-warning"
              v-show="errors[0]"
            >
              <small class="error-text-color">{{ errors[0] }}</small>
            </div>
          </validation-provider>
          <!-- payment -->
          <validation-provider
            :rules="form.section2.rule"
            v-slot="{ errors, classes }"
            class="form-divide"
          >
            <label
              class="title-size"
              for="purchaseWay"
            >付款方式</label>
            <div class=" icon icon-down">
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
            <span class="error-text-color">{{errors[0]}}</span>
          </validation-provider>
          <!-- comment -->
          <div class="form-divide">
            <label
              class="title-size"
              for="inputComment"
            >留言</label>
            <textarea
              class="input-simple"
              name="inputComment"
              id="inputComment"
              cols="30"
              rows="3"
            ></textarea>
          </div>
          <div class="flex flex-end">
            <button
              :disabled="!passed"
              :class="{'btn-disabled':!passed}"
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
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  name: 'Cart',
  data() {
    return {
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
            type: 'tele',
            id: 'tele',
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
        },
      },
      breadcrumbs: [
        {
          title: '首頁',
          slash: true,
        },
        {
          title: '購物車',
          slash: false,
        },
      ],
    };
  },
  computed: {
    ...mapState(['cartProducts']),
    ...mapGetters(['sumTotal']),
  },
  methods: {
    ...mapActions(['updateQuantity']),
    subTotal(product) {
      return product.price * product.quantity;
    },
  },
};
</script>

