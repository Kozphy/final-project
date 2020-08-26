import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Layout/Home/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Navbar',
    component: () => import('../views/Layout/Navbar/Navbar.vue'),
    children: [
      {
        path: '/Layout/Home',
        name: 'Home',
        component: Home,
      },
      {
        path: '/Layout/about',
        name: 'About',
        component: () => import('../views/Layout/About.vue'),
      },
      {
        path: '/Layout/products',
        name: 'Products',
        component: () => import('../views/Layout/Products.vue'),
      },
      {
        path: '/Layout/product/:id',
        name: 'product',
        component: () => import('../views/Layout/Product.vue'),
      },
      {
        path: '/Layout/cart',
        name: 'Cart',
        component: () => import('../views/Layout/Cart.vue'),
      },
      {
        path: '/Layout/coupon',
        name: 'Coupon',
        component: () => import('../views/Layout/Coupon.vue'),
      },
      {
        path: '/Layout/checkout',
        name: 'checkout',
        component: () => import('../views/Layout/Checkout.vue'),
      },
      {
        path: '/Layout/checkoutSuccess',
        name: 'checkoutSuccess',
        component: () => import('../views/Layout/CheckoutSuccess.vue'),
      },
    ],
  },
  // 後台
  {
    path: '/login',
    component: () => import('@/views/dashboard/Login'),
  },
  {
    path: '/admin',
    component: () => import('@/views/dashboard/Dashboard'),
    children: [
      {
        path: 'imgStorage',
        component: () => import('@/views/dashboard/ImgStorage/ImgStorage'),
      },
      {
        path: 'products',
        component: () => import('@/views/dashboard/Products/Products'),
      },
      {
        path: 'coupons',
        component: () => import('../views/dashboard/Coupons/Coupons'),
      },
      {
        path: 'orders',
        component: () => import('@/views/dashboard/Orders/Orders'),
      },
      {
        path: 'orderDetail',
        component: () => import('@/views/dashboard/Orders/components/Detail'),
      },
      {
        path: 'shopCart',
        component: () => import('@/views/dashboard/ShopCart/ShopCart'),
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