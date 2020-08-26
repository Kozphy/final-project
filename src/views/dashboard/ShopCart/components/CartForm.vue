<template>
  <div>
    <loading :active.sync="isLoading" />
    <validation-observer v-slot="{ invalid }">
      <form @submit.prevent="uploadOrder">
        <validation-provider
          :key="item + key"
          :rules="item.rule"
          v-for="(item, key) in form.formPart1"
          v-slot="{ errors, classes, passed }"
        >
          <div class="form-group">
            <label :for="item.id">{{item.title}}</label>
            <input
              :class="classes"
              :id="item.id"
              :name="item.title"
              class="form-control"
              type="text"
              v-model="item.validation"
            />
            <small class="invalid-feedback">{{ errors[0] }}</small>
            <small
              class="text-success"
              v-if="passed"
            >success</small>
          </div>
        </validation-provider>

        <div class="form-group">
          <validation-provider
            rules="required"
            v-slot="{ errors, classes, passed }"
          >
            <label for="selectPayment">請選擇付款方式</label>
            <select
              :class="classes"
              class="form-control"
              id="selectPayment"
              name="付款方式"
              v-model="form.purchaseWay.validation"
            >
              <option value>請選擇付款方式</option>
              <option
                :key="item + key"
                :value="item"
                v-for="(item, key) in form.purchaseWay.way"
              >{{ item }}</option>
            </select>
            <small class="invalid-feedback">{{ errors[0] }}</small>
            <small
              class="text-success"
              v-if="passed"
            >success</small>
          </validation-provider>
        </div>
        <div class="form-group">
          <label for="comment">留言</label>
          <textarea
            class="form-control"
            id="comment"
            type="text"
          ></textarea>
        </div>
        <div class="d-flex justify-content-end">
          <button
            :disabled="invalid"
            class="btn btn-primary"
            type="submit"
          >送出訂單</button>
        </div>
      </form>
    </validation-observer>
  </div>
</template>

<script>
import {
  createOrder,
} from '@/utils/api';

export default {
  data() {
    return {
      isLoading: false,
      form: {
        formPart1: [
          {
            title: '收件人名稱',
            type: 'text',
            id: 'consignee',
            rule: 'required',
            validation: '',
          },
          {
            title: 'Email',
            type: 'Email',
            id: 'consineeEmail',
            rule: 'email|required',
            validation: '',
          },
          {
            title: '電話',
            type: 'number',
            id: 'consigneeTel',
            rule: 'digits:10|required',
            validation: '',
          },
          {
            title: '地址',
            type: 'text',
            id: 'address',
            rule: 'required',
            validation: '',
          },
        ],
        purchaseWay: {
          way: ['WebATM', 'ATM', 'CVS', 'Barcode', 'Credit', 'ApplePay', 'GooglePay'],
          validation: '',
        },
        coupon: {
          validation: '',
        },
        comments: {
          validation: '',
        },
      },
    };
  },
  methods: {
    uploadOrder() {
      this.isLoading = true;
      const {
        formPart1: [
          { validation: name },
          { validation: email },
          { validation: tel },
          { validation: address },
        ],
        purchaseWay: { validation: payment },
        coupon: { validation: coupon },
        comments: { validation: message },
      } = this.form;
      const data = {
        name,
        email,
        tel,
        address,
        payment,
      };
      if (coupon !== '') {
        data.coupon = coupon;
      } else if (message !== '') {
        data.message = message;
      }
      // console.log(data);
      createOrder(data).then(() => {
        this.isLoading = false;
        this.$router.push('/admin/orders');
      }).catch((rej) => {
        this.isLoading = false;
        throw rej;
      });
    },
  },
};
</script>
