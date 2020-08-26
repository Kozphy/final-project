<template>
  <div>
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">訂單明細</h5>
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
        <div class="container">
          <div class="row">
            <caption class="h4 w-100 text-center">訂單 Id：{{orderDetail.id}}</caption>
            <table class="table">
              <thead>
                <tr>
                  <th class="text-center">產品名稱</th>
                  <th class="text-center">縮圖</th>
                  <th class="text-right">數量</th>
                  <th class="text-right">價格</th>
                  <th class="text-right">小計</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  :key="item + key"
                  v-for="(item, key) in orderProducts"
                >
                  <td class="text-center align-middle">{{item.product.title}}</td>
                  <td class="text-center align-middle">
                    <img
                      :src="item.product.imageUrl[0]"
                      alt
                      style="width:4rem; height:4rem;"
                    />
                  </td>
                  <td class="text-right align-middle">{{item.quantity}}</td>
                  <td
                    class="text-right align-middle"
                  >{{item.product.price | thousandsFormat}}</td>
                  <td
                    class="text-right align-middle"
                  >{{item.product.price * item.quantity | thousandsFormat}}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr class="text-right">
                  <td colspan="5">總計：{{ total }}</td>
                </tr>
                <tr>
                  <td
                    class="text-right"
                    colspan="5"
                  >折扣：-{{discountDollar}}</td>
                </tr>
                <tr>
                  <td
                    class="text-right"
                    colspan="5"
                  >應付金額 : {{ shouldPay }}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button
          class="btn btn-secondary"
          data-dismiss="modal"
          type="button"
        >關閉</button>
        <button
          class="btn btn-primary"
          data-dismiss="modal"
          type="button"
        >確認</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'detailOrder',
  props: {
    orderDetail: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      orderProducts: {},
    };
  },
  computed: {
    total: {
      get() {
        let sum = 0;
        // 有商品時，計算總計
        if (this.orderProducts) {
          this.orderProducts.forEach((item) => {
            sum += item.quantity * item.product.price;
          });
        }
        return sum;
      },
    },
    discountDollar: {
      get() {
        let discount = 0;
        // 有折價券時，計算折價金額
        if (this.orderDetail.coupon) {
          discount += this.total * (1 - this.orderDetail.coupon.percent / 100);
        }
        return discount.toFixed(0);
      },
    },
    shouldPay: {
      get() {
        let pay = 0;
        // 有商品時，計算應付金額
        if (this.orderProducts) {
          pay += this.total - this.discountDollar;
        }
        return pay.toFixed(0);
      },
    },
  },
  watch: {
    orderDetail: {
      immediate: true,
      handler() {
        this.orderProducts = this.orderDetail.products;
      },
    },
  },
};
</script>
