<template>
  <div>
    <loading :active.sync="isLoading" />
    <div class="container mt-5">
      <div class="row">
        <div class="d-flex justify-content-between align-items-end w-100">
          <div class="form-check">
            <input
              class="form-check-input"
              id="enabled"
              type="checkbox"
              v-model="isEnabled"
            />
            <label
              class="form-check-label"
              for="enabled"
            >是否啟用</label>
          </div>
          <button
            @click="showModal('new')"
            class="btn btn-primary"
            type="button"
          >新增優惠券</button>
        </div>
        <table class="table table-bordered mt-3">
          <thead>
            <tr class="text-center">
              <th>優惠券名稱</th>
              <th>折價數</th>
              <th>到期日</th>
              <th>是否啟用</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr
              :key="coupon + key"
              v-for="(coupon, key) in filterContent"
            >
              <td class="text-center">{{ coupon.title }}</td>
              <td class="text-center">{{ coupon.percent | percentFormat }}</td>
              <td class="text-center">{{ coupon.deadline.datetime }}</td>
              <td class="text-center">
                <span
                  class="text-success"
                  v-show="coupon.enabled === true"
                >是</span>
                <span
                  class="text-danger"
                  v-show="coupon.enabled === false"
                >否</span>
              </td>
              <td class="text-center">
                <button
                  @click="showModal('edit', coupon.id)"
                  class="btn btn-primary btn-sm mr-1"
                >編輯</button>
                <button
                  @click="showModal('del', coupon.id)"
                  class="btn btn-danger btn-sm"
                >刪除</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- 刪除 Modal -->
    <div
      aria-hidden="true"
      aria-labelledby="exampleModalLabel"
      class="modal fade"
      id="delModal"
      role="dialog"
      tabindex="-1"
    >
      <div
        class="modal-dialog"
        role="document"
      >
        <delModal
          :couponData="coupon"
          @delCoupon="getCoupons"
        ></delModal>
      </div>
    </div>
    <!-- 新增與編輯modal -->
    <div
      aria-hidden="true"
      aria-labelledby="exampleModalLabel"
      class="modal fade"
      id="modal"
      role="dialog"
      tabindex="-1"
    >
      <div
        class="modal-dialog modal-lg"
        role="document"
      >
        <createModal
          :editCoupon="coupon"
          :listTitle="ModalTitle"
          @getCoupons="getCoupons"
        ></createModal>
      </div>
    </div>
  </div>
</template>

<script>
/* global $ */
import {
  getApiCoupons,
} from '@/utils/api';
import createModal from '@/views/dashboard/Coupons/components/CreateModal.vue';
import delModal from '@/views/dashboard/Coupons/components/DelModal.vue';

export default {
  name: 'Coupons',
  data() {
    return {
      isEnabled: false,
      isLoading: false,
      coupons: [],
      coupon: {},
      ModalTitle: '',
    };
  },
  components: {
    createModal,
    delModal,
  },
  methods: {
    getCoupons(page = 1) {
      this.isLoading = true;
      getApiCoupons(page).then((res) => {
        this.coupons = res.data.data;
        this.isLoading = false;
      }).catch((rej) => {
        this.isLoading = false;
        throw rej;
      });
    },
    showModal(active, id) {
      this.ModalTitle = '新增優惠券';
      // 編輯或刪除
      if (active !== 'new') {
        this.ModalTitle = '編輯優惠券';
        this.coupon = this.coupons.find((item) => item.id === id);
      }
      if (active !== 'del') {
        $('#modal').modal('show');
        return;
      }
      $('#delModal').modal('show');
    },
  },
  computed: {
    filterContent() {
      if (this.isEnabled === true) {
        return this.coupons.filter((item) => item.enabled === true);
      }
      return this.coupons;
    },
  },
  created() {
    this.getCoupons();
  },
};
</script>

<style lang="scss" scoped>

</style>
