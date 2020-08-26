<template>
  <div>
    <loading :active.sync="isLoading" />
    <div class="container mt-5">
      <div class="row">
        <div class="d-flex justify-content-between w-100 align-items-end">
          <div class="d-flex">
            <div class="form-group form-check mb-0">
              <input
                class="from-check-input mr-2"
                id="isPaid"
                type="checkbox"
                v-model="isPaid"
              />
              <label for="isPaid">已付款</label>
            </div>
          </div>
          <button
            @click="changePage"
            class="btn btn-primary"
            type="button"
          >購物車頁面</button>
        </div>
        <table class="table table-bordered mt-3">
          <thead>
            <tr class="text-center">
              <th>付款方式</th>
              <th>是否已付款</th>
              <th>訂單成立日</th>
              <th>總計</th>
              <th width="230">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr
              :key="item + key"
              v-for="(item, key) in filterOrders"
            >
              <td class="text-center align-middle">{{item.payment}}</td>
              <td class="text-center align-middle">
                <span
                  class="text-success"
                  v-show="item.paid === true"
                >是</span>
                <span
                  class="text-danger"
                  v-show="item.paid === false"
                >否</span>
              </td>
              <td class="text-center align-middle">{{item.created.datetime}}</td>
              <td
                class="text-right align-middle"
              >{{item.amount | thousandsFormat}}</td>
              <td class="text-center align-middle">
                <div class="btn-group">
                  <button
                    @click="showModal('detail', item.id)"
                    class="btn btn-success btn-sm mr-2"
                  >訂單細節</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- 訂單細節的動態元件 -->
    <div
      aria-hidden="true"
      aria-labelledby="exampleModalLabel"
      class="modal fade"
      id="modal"
      role="dialog"
      tabindex="-1"
    >
      <div
        class="modal-dialog modal-xl"
        role="document"
      >
        <detailOrder :orderDetail="tempOrder"></detailOrder>
      </div>
    </div>
  </div>
</template>

<script>
/* global $ */
import { getApiOrders } from '@/utils/api';
import detailOrder from './components/Detail.vue';

export default {
  name: 'Orders',
  data() {
    return {
      isLoading: false,
      isPaid: false,
      AllOrders: [],
      tempOrder: {},
    };
  },
  components: {
    detailOrder,
  },
  methods: {
    getOrders(page = 1) {
      this.isLoading = true;
      getApiOrders(page).then((res) => {
        this.isLoading = false;
        this.AllOrders = res.data.data;
      }).catch((rej) => {
        this.isLoading = false;
        throw rej;
      });
    },
    showModal(active, id) {
      if (active !== 'new') {
        this.tempOrder = this.AllOrders.find((item) => item.id === id);
        $('#modal').modal('show');
      }
    },
    changePage() {
      this.$router.push('/admin/ShopCart');
    },
  },
  computed: {
    filterOrders() {
      if (this.isPaid === true) {
        return this.AllOrders.filter((item) => item.paid === true);
      }
      return this.AllOrders;
    },
  },
  created() {
    this.getOrders();
  },
};
</script>
