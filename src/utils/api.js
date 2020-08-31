import {
  get, post, del, patch,
} from '@/plugins/axios';

const uuid = process.env.VUE_APP_UUID;

const headers = { 'Content-Type': 'application/json' };

const headersFile = { 'Content-Type': 'multipart/form-data' };

// 登入
const apiLogin = (data) => post('api/auth/login', data, headers);

// 驗證 token
const checkToken = (token) => post('api/auth/check', token, headers);

// 取得後台單一產品
const backApiProduct = (id) => get(`api/${uuid}/admin/ec/product/${id}`, '', headers);

// 取得後台所有產品
const backApiProducts = (page) => get(`api/${uuid}/admin/ec/products?page=${page}&paged=10`, '', headers);

// 上傳檔案
const uploadApiFile = (file) => post(`api/${uuid}/admin/storage`, file, headersFile);

// 刪除產品
const deleteProduct = (id) => del(`api/${uuid}/admin/ec/product/${id}`, '', headers);

// 新增商品
const createProduct = (data) => post(`api/${uuid}/admin/ec/product`, data, headers);

// 編輯商品
const editProduct = (data, id) => patch(`api/${uuid}/admin/ec/product/${id}`, data, headers);

// 取得後台所有訂單
const getApiOrders = (page) => get(`api/${uuid}/admin/ec/orders?page=${page}`, '', headers);

// 取得所有優患券
const getApiCoupons = (page) => get(`api/${uuid}/admin/ec/coupons?page=${page}`, '', headers);

// 新增優惠券
const createCoupon = (data) => post(`api/${uuid}/admin/ec/coupon`, data, headers);

// 刪除後台優惠券
const delBackCoupon = (id) => del(`api/${uuid}/admin/ec/coupon/${id}`, '', headers);

// 取得所有圖片
const getApiImg = (page) => get(`api/${uuid}/admin/storage?page=${page}`, '', headers);

// 刪除圖片
const delImg = (id) => del(`api/${uuid}/admin/storage/${id}`, '', headers);

// 修改上傳的圖片
const editImg = (file) => post(`api/${uuid}/admin/storage`, file, headersFile);

// 前台
// 取得前台所有產品
const fontApiProducts = (page) => get(`api/${uuid}/ec/products?page=${page}`, '', headers);

// 取得前台單一產品
const fontApiProduct = (id) => get(`api/${uuid}/ec/product/${id}`, '', headers);

// 取得購物車所有資料
const getCartProducts = (page) => get(`api/${uuid}/ec/shopping?page=${page}`, '', headers);

// 新增一筆購物車資料
const createCartProduct = (data) => post(`api/${uuid}/ec/shopping`, data, headers);

// 刪除某一筆購物車資料
const delCartProduct = (id, data) => del(`api/${uuid}/ec/shopping/${id}`, data, headers);

// 刪除全部購物車資料
const delAllCart = () => del(`api/${uuid}/ec/shopping/all/product`, '', headers);

// 新增一筆訂單
const createOrder = (data) => post(`api/${uuid}/ec/orders`, data, headers);

export {
  apiLogin,
  backApiProducts,
  backApiProduct,
  checkToken,
  uploadApiFile,
  createProduct,
  deleteProduct,
  editProduct,
  getApiOrders,
  getApiCoupons,
  createCoupon,
  delBackCoupon,
  delImg,
  editImg,
  getApiImg,
  fontApiProducts,
  fontApiProduct,
  getCartProducts,
  createCartProduct,
  delCartProduct,
  delAllCart,
  createOrder,
};
