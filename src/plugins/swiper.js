import Vue from 'vue';
import Swiper, { Navigation, Pagination, Autoplay } from 'swiper';
import VueAwesomeSwiper from 'vue-awesome-swiper';

// If you use Swiper 6.0.0 or higher
import 'swiper/swiper-bundle.css';

Swiper.use([Navigation, Pagination, Autoplay]);

Vue.use(VueAwesomeSwiper);
