<template>
  <div class="bg-cheese ">
    <!-- carousel start -->
    <swiper
      class="swiper rounded"
      :options="swiperOption"
    >
      <swiper-slide
        :key="carousel + key"
        v-for="(carousel, key) in carouselImg"
        class="carousel-box"
      >
        <!-- background -->
        <div
          class="h-full bg-cover bg-center"
          :style="{backgroundImage:`url(${carousel.img})`}"
        >
          <!-- subcribe -->
          <div class="flex justify-center items-end h-full text-center sm:cursor-pointer">
            <h2 class="text-white text-5xl bg-gray-900 bg-opacity-50 rounded px-2 py-2
              sm:cursor-shining sm:transition sm:transform duration-500 sm:ease-in-out
              sm:hover:-translate-y-2 sm:hover:scale-110 sm:hover:font-extrabold">
              <span>
                訂閱 E a Z <br> 讓你每天都 E a Z y :D
              </span>
            </h2>
          </div>
        </div>
        <!--backgorund end -->
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
    <!-- contact start-->
    <div class="contact mt-12 flex justify-evenly container mx-auto bg-gray-700
    bg-opacity-50 rounded-full
    text-2xl">
      <span
        :key="item + key"
        v-for="(item , key) in icons"
        class="cursor-pointer text-black hover:text-blue-600 px-3 py-3 flex items-center"
      >
        <i :class="item.name"></i>
        <span class="ml-2">{{item.content}}</span>
      </span>
    </div>
    <!-- contact end -->
    <div class="content">
      <!-- introduction product  -->
      <div class="introProducts py-32">
        <div class="container mx-auto">
          <!-- title -->
          <h2 class="line-left text-6xl block pb-1
          font-semibold text-black relative">
            主打產品
          </h2>
          <!-- content -->
          <div
            :class="[product.order, product.flex_row]"
            :key="product + key"
            v-for="(product, key) in introProducts"
            class="lg:flex group my-5 mt-16 bg-gray-700 bg-opacity-50 sm:cursor-shining
            transition duration-300 ease-in-out
            rounded shadow cursor-pointer"
          >
            <!-- content left -->
            <div>
              <img
                class="w-full block object-cover"
                :src="product.img"
                :alt="product.img"
                :style="product.style"
                :class="{'flex-shrink-0': product.shrink}"
              >
            </div>
            <!-- content right -->
            <div
              :class="{'flex-shrink': product.shrink_1}"
              class="group  flex flex-col justify-evenly px-12 bottom-0  text-black"
            >
              <h5 class="text-4xl lg:mt-0 mt-5 block">{{product.title}}</h5>
              <p class="my-5 lg:my-0">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Minus quas repellat natus blanditiis culpa quod fugiat! Exercitationem culpa
                explicabo consequatur, atque deserunt perspiciatis sapiente, quas molestias quo
                , officia mollitia praesentium.</p>
              <button
                type="button"
                class="btn-pill mb-5 lg:mb-0 text-lg bg-white text-black
              group-hover:bg-blue-500 group-hover:text-white border-solid border-4
              border-blue-500 transition duration-300 ease-in-out"
              >看詳細 <i class="fas fa-angle-double-right"></i></button>
            </div>
          </div>
        </div>
      </div>
      <!-- intorduction End -->
      <!-- About Us Start -->
      <div class=" text-black py-16">
        <div class="About container mx-auto text-center">
          <h3 class="text-6xl pt-3 pr-2 line-right flex justify-end font-semibold relative ">
            關於我們
          </h3>
          <div class="xl:grid xl:grid-cols-2 xl:grid-rows-1 xl:gap-3 py-16 ">
            <!-- // * section upstair -->
            <div
              class="flex w-full bg-cover bg-center bg-no-repeat"
              :style="{ backgroundImage: `url(${About.left.img})`,height:`400px`}"
            ></div>
            <!-- // * section under -->
            <div class="mt-5">
              <p class="flex items-center text-2xl h-full px-12  text-black">
                {{About.right.describe}}
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- About Us end -->
      <!-- content end -->
      <!-- history start  -->
      <div class="history ">
        <div class=" bg-black bg-opacity-25 relative py-48">
          <div class="grid grid-cols-1 grid-rows-1">
            <!-- timeline -->
            <div class="gird-rows-1 timeline ">
              <!-- content -->
              <div
                class="link-line timeline-circle bg-white bg-opacity-25 inline-block px-16 w-1/3
              shadow-md rounded absolute transform translate-y-12 -translate-x-1/2"
                style="left:50%;"
              >
                <h6 class="text-3xl font-semibold text-center">2020/06</h6>
                <p class="text-xl">
                  <span class="font-semibold">
                    E a Z :D
                  </span>
                  誕生於 <span class="font-semibold">2020/06</span>，為世界上的吃貨們增添一種新的選擇。</p>
              </div>
            </div>
          </div>
          <!-- grid end -->
        </div>
      </div>
      <!-- history end -->
      <!-- subscribe section start -->
      <div
        class=" py-10 rounded"
        style="background-image:url(https://images.unsplash.com/photo-1582224202548-6b715936bd0e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60);background-position:center center; background-size:cover;background-repeat:no-repeat;"
      >
        <div class="container mx-auto bg-gray-800 bg-opacity-50 py-12 px-12">
          <h3 class="text-2xl text-white mb-5">訂閱我們 <br>獲取最新資訊 & 優惠券</h3>
          <input
            class="input-simple"
            type="email"
          >
          <div class="flex justify-end mt-5">
            <button
              type="button"
              class="btn bg-blue-600 rounded text-white hover:bg-gray-300 hover:text-black
            transition duration-300"
            >送出訂閱</button>
          </div>
        </div>
      </div>
      <!-- subscribe section end -->
    </div>
  </div>
</template>

<script>
export default {
  nmae: 'Home',
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
            'https://images.unsplash.com/photo-1566897819059-db42e135fa69?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
        },
        {
          img:
            'https://images.unsplash.com/photo-1563245372-58fbd29afa7f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=60',
        },
        {
          img:
            'https://images.unsplash.com/photo-1561336166-49a81db676ca?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=60',
        },
      ],
      icons: [
        {
          name: 'fas fa-envelope',
          content: 'Eaz:D@demo.org',
        },
        {
          name: 'fas fa-phone',
          content: '09-3408-8974',
        },
        {
          name: 'fab fa-github',
          content: '',
        },
        {
          name: 'fab fa-facebook-f',
          content: '',
        },
        {
          name: 'fab fa-twitter',
          content: '',
        },
      ],
      introProducts: [
        {
          title: '湯種麵包',
          img:
            'https://images.unsplash.com/photo-1591484283608-18c0aaab9f7f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60',
          order: 'order-first',
          style: 'height:400px',
          flex_row: 'flex-row',
          shrink: true,
          shrink_1: true,
        },
        {
          title: '藍紋起司',
          img:
            'https://images.unsplash.com/photo-1452195100486-9cc805987862?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80',
          order: 'order-last',
          style: 'height:400px',
          flex_row: 'flex-row-reverse',
          shrink: true,
          shrink_1: true,
        },
        {
          title: '嚴選咖啡',
          img:
            'https://images.unsplash.com/photo-1500912708295-4cf8b060f381?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60',
          style: 'height:400px',
          order: 'order-last',
          flex_row: 'flex-row',
          shrink: true,
          shrink_1: true,
        },
      ],
      About: {
        left: {
          img:
            'https://images.unsplash.com/photo-1579697096985-41fe1430e5df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60',
        },
        right: {
          describe:
            'E a Z :D 於台灣成立，我們相信食物能給予人們歡笑與滿足，因此我們致力於開發各國不同的風味，期望在喧囂的城市中，可口的麵包與溫暖的咖啡，能遠離塵囂，帶來不一樣的滋味。',
        },
      },
    };
  },
  methods: {
    getProducts() {},
  },
};
</script>
