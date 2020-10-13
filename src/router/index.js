import Vue from 'vue';
import VueRouter from 'vue-router';
import Navbar from '@/views/Layout/NavbarFooter/Menu.vue';
import Footer from '@/views/Layout/NavbarFooter/Footer.vue';
import index from '@/views/Layout/NavbarFooter/index.vue';
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    components: {
      navbar: Navbar,
      footer: Footer,
      default: index,
    },
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import(/* webpackChunkName: "Home" */ '@/views/Layout/Home/Home.vue')
      },
      {
        path: '/Layout/products',
        name: 'Products',
        component: () => import(/* webpackChunkName: "Products" */ '../views/Layout/Products/Products.vue'),
      },
      {
        path: '/Layout/product/:id',
        name: 'Product',
        component: () => import(/* webpackChunkName: "product/id" */ '../views/Layout/Products/Product.vue'),
      },
      {
        path: 'Layout/NewEvent',
        name: 'NewEvent',
        component: () => import(/* webpackChunkName: "NewEvent" */ '../views/Layout/NewEvent/NewEvent.vue'),
      },
      {
        path: '/Layout/cart',
        name: 'Cart',
        component: () => import(/* webpackChunkName: "Cart" */ '../views/Layout/Cart/Cart.vue'),
      },
      {
        path: '/Layout/coupon',
        name: 'Coupon',
        component: () => import(/* webpackChunkName: "Coupon" */ '../views/Layout/Coupon/Coupon.vue'),
      },
      {
        path: '/Layout/checkout',
        name: 'Checkout',
        component: () => import(/* webpackChunkName: "checkout" */ '../views/Layout/Checkout/Checkout.vue'),
      },
      {
        path: '/Layout/checkoutSuccess',
        name: 'CheckoutSuccess',
        component: () => import(/* webpackChunkName: "checkoutSuccess" */ '../views/Layout/Checkout/CheckoutSuccess.vue'),
      },
      {
        path: '/Layout/MyOrder',
        name: 'MyOrder',
        component: () => import(/* webpackChunkName: "checkoutSuccess" */ '../views/Layout/Order/MyOrder.vue'),
      },
    ],
  },
  // 後台
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/dashboard/Login'),
  },
  {
    path: '/admin',
    component: () => import(/* webpackChunkName: "admin" */ '@/views/dashboard/Dashboard'),
    children: [
      {
        path: 'imgStorage',
        component: () => import(/* webpackChunkName: "imgStorage" */ '@/views/dashboard/ImgStorage/ImgStorage'),
      },
      {
        path: 'products',
        component: () => import(/* webpackChunkName: "backendProducts" */ '@/views/dashboard/Products/Products'),
      },
      {
        path: 'coupons',
        component: () => import(/* webpackChunkName: "backendCoupons" */ '@/views/dashboard/Coupons/Coupons'),
      },
      {
        path: 'orders',
        component: () => import(/* webpackChunkName: "backendOrders" */ '@/views/dashboard/Orders/Orders'),
      },
      {
        path: 'orderDetail',
        component: () => import(/* webpackChunkName: "backendOrderDetail" */ '@/views/dashboard/Orders/components/Detail'),
      },
      {
        path: 'shopCart',
        component: () => import(/* webpackChunkName: "backendShopCart" */ '@/views/dashboard/ShopCart/ShopCart'),
      },
    ],
  },
  {
    path: '*',
    redirect: '/',
  },
];

const router = new VueRouter({
  routes,
});

export default router;
