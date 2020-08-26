<template>
  <div>
    <loading :active.sync="isLoading" />
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">{{ listTitle }}</h5>
        <button
          aria-label="Close"
          class="close"
          data-dismiss="modal"
          type="button"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
          <div
            :key="row + key"
            class="form-row"
            v-for="(row, key) in list.repeatData"
          >
            <div class="form-group col">
              <label :for="row[0].id">{{ row[0].name }}</label>
              <input
                :id="row[0].id"
                :type="row[0].type"
                class="form-control"
                v-model="row[0].input"
              />
            </div>
            <div class="form-group col">
              <label :for="row[1].id">{{ row[1].name }}</label>
              <input
                :id="row[1].id"
                :type="row[1].type"
                class="form-control"
                v-model="row[1].input"
              />
            </div>
          </div>
          <div class="form-check">
            <input
              :id="list.isEnabled.id"
              :type="list.isEnabled.type"
              class="form-check-input"
              v-model="list.isEnabled.input"
            />
            <label
              :for="list.isEnabled.id"
              class="form-check-label"
            >{{ list.isEnabled.name }}</label>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button
          class="btn btn-secondary"
          data-dismiss="modal"
          type="button"
        >取消</button>
        <button
          @click="uploadCoupon"
          class="btn btn-primary"
          type="button"
        >確認</button>
      </div>
    </div>
  </div>
</template>

<script>
/* global $ */
import { createCoupon } from '@/utils/api';

export default {
  data() {
    return {
      isLoading: false,
      list: {
        repeatData: {
          row1: [
            {
              name: '名稱',
              type: 'text',
              id: 'CouponTitle',
              input: '',
            },
            {
              name: '編碼',
              type: 'text',
              id: 'couponCode',
              input: '',
            },
          ],
          row2: [
            {
              name: '折數',
              type: 'number',
              id: 'couponDiscount',
              input: 0,
            },
            {
              name: '到期日',
              type: 'text',
              deadline: 0,
              id: 'couponDeadline',
              input: '',
            },
          ],
        },
        isEnabled: {
          name: '是否啟用',
          type: 'checkbox',
          input: false,
          id: 'couponEnabled',
        },
      },
      tempCoupon: {},
    };
  },
  props: {
    listTitle: {
      type: String,
      default: '',
    },
    editCoupon: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    uploadCoupon() {
      this.isLoading = true;
      this.tempCoupon = {
        title: this.list.repeatData.row1[0].input,
        code: this.list.repeatData.row1[0].input,
        percent: this.list.repeatData.row2[0].input,
        enabled: this.list.isEnabled.input,
        deadline_at: this.list.repeatData.row2[1].input,
      };
      createCoupon(this.tempCoupon).then(() => {
        this.$emit('getCoupons');
        this.$toasted.show('新增成功!!', {
          icon: {
            name: 'check-circle',
          },
        });
        this.isLoading = false;
        $('#modal').modal('hide');
      }).catch((rej) => {
        $('#modal').modal('hide');
        throw rej;
      });
    },
  },
  watch: {
    listTitle: {
      immediate: true,
      handler() {
        if (this.listTitle === '新增優惠券') {
          this.list.repeatData.row1[0].input = '';
          this.list.repeatData.row1[1].input = '';
          this.list.repeatData.row2[0].input = 0;
          this.list.repeatData.row2[1].input = '';
          this.list.isEnabled.input = false;
        }
      },
    },
    editCoupon: {
      immediate: true,
      handler() {
        if (this.listTitle === '編輯優惠券') {
          this.list.repeatData.row1[0].input = this.editCoupon.title;
          this.list.repeatData.row1[1].input = this.editCoupon.code;
          this.list.repeatData.row2[0].input = this.editCoupon.percent;
          this.list.repeatData.row2[1].input = this.editCoupon.deadline.datetime;
          this.list.isEnabled.input = this.editCoupon.enabled;
        }
      },
    },
  },
};
</script>
