<template>
  <div>
    <loading :active.sync="isLoading" />
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">
          刪除
          <span class="text-danger">{{ couponData.title }}</span>
        </h5>
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
        確認要
        <span class="text-danger">刪除 {{ couponData.title }}</span> 嗎 ？
      </div>
      <div class="modal-footer">
        <button
          class="btn btn-secondary"
          data-dismiss="modal"
          type="button"
        >取消</button>
        <button
          @click="delCoupon"
          class="btn btn-primary"
          type="button"
        >確認</button>
      </div>
    </div>
  </div>
</template>

<script>
/* global $ */
import { delBackCoupon } from '@/utils/api';

export default {
  name: 'DelModal',
  data() {
    return {
      isLoading: false,
    };
  },
  props: {
    couponData: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    delCoupon() {
      this.isLoading = true;
      delBackCoupon(this.couponData.id)
        .then(() => {
          this.isLoading = false;
          this.$emit('delCoupon');
          $('#delModal').modal('hide');
        })
        .catch((rej) => {
          this.isLoading = false;
          $('#delModal').modal('hide');
          throw rej;
        });
    },
  },
};
</script>
