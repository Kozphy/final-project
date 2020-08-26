<template>
  <div>
    <!-- carousel start -->
    <swiper
      class="swiper"
      :options="swiperOption"
    >
      <swiper-slide
        :key="carousel + key"
        v-for="(carousel, key) in carouselImg"
        class="carousel-box"
      >
        <!-- start -->
        <div
          class="h-full bg-cover bg-center"
          :style="{backgroundImage:`url(${carousel.img})`}"
        >
          <!-- say Cheese -->
          <div class="flex text-center">
            <h2 class="text-white text-5xl bg-gray-900 bg-opacity-50 rounded px-2 py-2 mt-4 ml-4
              cursor-pointer title-font">
              <span class="font-semibold">
                Subscribe Us
              </span>
              <br>
              讓你每一天都
              <span class="font-semibold">
                Cheeze :D
              </span>
            </h2>
          </div>
        </div>
        <!-- end -->
      </swiper-slide>
      <div
        class="swiper-button-prev text-black opacity-25"
        slot="button-prev"
      ></div>
      <div
        class="swiper-button-next text-black opacity-25"
        slot="button-next"
      ></div>
    </swiper>
    <!-- carousel end -->
    <!-- introduction product  -->
    <div class="introProducts container mx-auto mt-5">
      <h2 class="text-5xl inline-block mt-5 px-4 pb-2 mb-3 border-solid border-b-2 border-gray-400">
        商品介紹
      </h2>
      <div class="flex flex-1">
        <div
          :key="product + key"
          v-for="(product, key) in introProducts"
        >
          <img
            class="w-full"
            :src="product.img"
            :alt="product.img"
          >
          <h5 class="text-3xl pl-5">{{product.title}}</h5>
        </div>
        <div></div>
        <div></div>
      </div>
    </div>
    <!-- intorduction End -->
    <!-- About Us Start -->
    <div class="About text-center pb-5 pt-20 ">
      <div class="xl:grid xl:grid-cols-2 xl:gap-3">
        <!-- section left -->
        <div
          class="row-span-3 h-full bg-cover bg-center bg-no-repeat"
          :style="{ backgroundImage: `url(${About.left.img})`,height:`600px`}"
        ></div>
        <!-- section right -->
        <div class="row-span-2 col-span-2">
          {{About.right.describe}}
        </div>
        <!-- decoration -->
        <div class="row-span-1 col-span-2">
          <span class="text-black text-3xl ">
            關於我們
          </span>
        </div>
      </div>
    </div>
    <!-- About Us end -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: 'swiper-example-pagination',
      title: 'Navigation',
      swiperOption: {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
      carouselImg: [
        {
          img:
            'https://image.freepik.com/free-photo/various-types-cheese_121111-385.jpg',
        },
        {
          img:
            'https://img.freepik.com/free-photo/top-view-various-cheeses-table_23-2148325940.jpg?size=626&ext=jpg&ga=GA1.2.484476026.1598251390',
        },
        {
          img:
            'https://img.freepik.com/free-photo/fresh-cheese-wood-chopping-board_23-2148037536.jpg?size=626&ext=jpg&ga=GA1.2.484476026.1598251390',
        },
      ],
      introProducts: [
        {
          title: '新鮮起司',
          img:
            'https://images.unsplash.com/photo-1477921510058-85812315a3c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
        },
        {
          title: '白黴起司',
          img:
            'https://images.pexels.com/photos/4109939/pexels-photo-4109939.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        },
        {
          title: '半硬質起司',
          img:
            'https://image.freepik.com/free-photo/edam-chunk-with-red-knife-wooden-board_23-2148166460.jpg',
        },
      ],
      About: {
        left: {
          img:
            'https://images.unsplash.com/photo-1541696303913-8668e3f7e9fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
        },
        right: {
          describe:
            'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi, quasi provident. Tempore vel similique, cum obcaecati praesentium accusantium fugiat cupiditate quis doloremque ipsa sint ab, eligendi dolore cumque aliquid quas!',
        },
      },
    };
  },
  methods: {
    getProducts() {},
  },
};
</script>

<style lang="scss">
.carousel-box {
  height: 91vh;
}
.text-vertical {
  writing-mode: vertical-lr;
}
.title-font {
  font-family: 'Architects Daughter', cursive;
}
</style>
