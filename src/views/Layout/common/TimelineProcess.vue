<template>
  <div>
    <!-- timeline start -->
    <div
      class="checkout__timeline relative my-8"
      :class="$style['checkout__timeline']"
    >
      <div
        class="checkout__timeline__line"
        :class="$style['checkout__timeline__line']"
        :key="item + key"
        v-for="(item, key) in checkout__timeline__line"
        ref="timeline"
      >
        <div
          class="checkout__timeline__circle"
          :class="$style['checkout__timeline__circle']"
        >
          <div>
            {{item.number}}
          </div>
          <div
            class="checkout__timeline__text text-black mt-2"
            :class="$style['checkout__timeline__text']"
          >{{item.content}}</div>
        </div>
      </div>
    </div>
    <!-- timeline end -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      checkout__timeline__line: [
        {
          number: 1,
          content: '購物車',
        },
        {
          number: 2,
          content: '填寫資料',
        },
        {
          number: 3,
          content: '購物完成',
        },
      ],
    };
  },
  props: {
    page: {
      type: String,
    },
  },
  mounted() {
    //TODO: change nth-of-type(2) opcacity = 1 how to do in css module?
    // when page is different change opacity
    if (this.page === 'checkout') {
      this.$refs.timeline[1].style.opacity = 1;
    } else if (this.page === 'checkout success') {
      this.$refs.timeline[2].style.opacity = 1;
    }
  },
};
</script>

<style lang="scss" module>
@import '@/assets/scss/Common/_checkoutTime';
</style>