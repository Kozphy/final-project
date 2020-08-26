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
                id="isEnabled"
                type="checkbox"
                v-model="isEnabled"
              />
              <label for="isEnabled">啟用</label>
            </div>
            <div class="form-group form-check mb-0">
              <input
                class="from-check-input mr-2"
                id="isShowImg"
                type="checkbox"
                v-model="isShowImg"
              />
              <label for="isShowImg">縮圖</label>
            </div>
          </div>
          <button
            @click="showModal('New')"
            class="btn btn-primary mb-3"
            type="button"
          >新增產品</button>
        </div>
        <table class="table table-bordered">
          <thead>
            <tr class="text-center">
              <th>分類</th>
              <th>是否啟用</th>
              <th v-if="isShowImg === true">縮圖</th>
              <th>商品名稱</th>
              <th>剩餘單位</th>
              <th>價格</th>
              <th width="250">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr
              :key="item + key"
              v-for="(item, key) in filterProducts"
            >
              <td class="text-center align-middle">{{item.category}}</td>
              <td class="align-middle text-center">
                <span
                  class="text-success"
                  v-show="item.enabled === true"
                >是</span>
                <span
                  class="text-danger"
                  v-show="item.enabled === false"
                >否</span>
              </td>
              <td
                class="text-center"
                v-if="isShowImg === true"
              >
                <img
                  :src="item.imageUrl"
                  alt
                  style="height:5rem; width:5rem"
                />
              </td>
              <td class="align-middle">{{item.title}}</td>
              <td class="text-right align-middle">{{item.unit}}</td>
              <td
                class="text-right align-middle"
              >{{item.price | thousandsFormat}}</td>
              <td class="text-center align-middle">
                <div class="btn-group">
                  <button
                    @click="addToCart(item)"
                    class="btn btn-success btn-sm mr-2"
                  >加入購物車</button>
                  <button
                    @click="showModal('edit', item)"
                    class="btn btn-primary btn-sm mr-2"
                  >修改</button>
                  <button
                    @click="showModal('del', item)"
                    class="btn btn-danger btn-sm"
                  >刪除</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- 新增與修改的動態元件-->
    <div
      class="modal fade"
      id="modal"
      role="dialog"
      tabindex="-1"
    >
      <div
        class="modal-dialog modal-xl"
        role="document"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">新增產品</h5>
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
                <!-- 動態元件左方 -->
                <div class="col-md-4">
                  <div class="form-group">
                    <label for="inputUrl">請輸入圖片來源</label>
                    <input
                      class="form-control"
                      id="inputUrl"
                      type="text"
                      v-model="tempProduct.imageUrl[0]"
                    />
                  </div>
                  <div class="form-group">
                    <label for="selectFile">或上傳圖片</label>
                    <input
                      @change="uploadFile"
                      class="form-control"
                      id="selectFile"
                      ref="selectFile"
                      type="file"
                    />
                  </div>
                  <div>
                    <img
                      :src="tempProduct.imageUrl[0]"
                      alt
                      class="w-100"
                    />
                  </div>
                </div>
                <!-- 動態元件右方 -->
                <div class="col-md-8">
                  <form>
                    <div class="form-group">
                      <label for="inputProduct">產品</label>
                      <input
                        class="form-control"
                        id="inputProduct"
                        type="text"
                        v-model="tempProduct.title"
                      />
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="inputCategory">分類</label>
                        <input
                          class="form-control"
                          id="inputCategory"
                          type="text"
                          v-model="tempProduct.category"
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <label for="inputUnit">單位</label>
                        <input
                          class="form-control"
                          id="inputUnit"
                          type="text"
                          v-model="tempProduct.unit"
                        />
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="inputOriginPrice">原價</label>
                        <input
                          class="form-control"
                          id="inputOriginPrice"
                          type="number"
                          v-model="tempProduct.origin_price"
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <label for="inputPrice">售價</label>
                        <input
                          class="form-control"
                          id="inputPrice"
                          type="number"
                          v-model="tempProduct.price"
                        />
                      </div>
                    </div>
                    <div class="form-gorup mb-3">
                      <label for="content">產品描述</label>
                      <textarea
                        class="form-control"
                        cols="30"
                        id="content"
                        name
                        rows="3"
                        v-model="tempProduct.content"
                      ></textarea>
                    </div>
                    <div class="form-gorup">
                      <label for="description">說明內容</label>
                      <textarea
                        class="form-control"
                        cols="30"
                        id="descirption"
                        name
                        rows="3"
                        v-model="tempProduct.description"
                      ></textarea>
                    </div>
                    <div class="form-group form-check mt-2">
                      <input
                        class="form-check-input"
                        id="enabled"
                        type="checkbox"
                        v-model="tempProduct.enabled"
                      />
                      <label
                        class="form-check-label"
                        for="enabled"
                      >是否啟用</label>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-secondary"
              data-dismiss="modal"
              type="button"
            >取消</button>
            <button
              @click="uploadProduct"
              class="btn btn-primary"
              type="button"
            >確認</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 刪除的動態元件 -->
    <div
      aria-hidden="true"
      aria-labelledby="exampleModalLabel"
      class="modal fade"
      id="deleteModal"
      role="dialog"
      tabindex="-1"
    >
      <div
        class="modal-dialog"
        role="document"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              刪除
              <span class="text-danger">{{tempProduct.title}}</span>
            </h5>
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
            <p>
              確認刪除
              <span class="text-danger">{{tempProduct.title}}</span> 嗎？
            </p>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-secondary"
              data-dismiss="modal"
              type="button"
            >取消</button>
            <button
              @click="confirmDel"
              class="btn btn-danger"
              type="button"
            >確認刪除</button>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-center">
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li
            :class="{ disabled: pagination.current_page === 1}"
            @click="getProducts(pageNumber-=1)"
            class="page-item"
          >
            <a
              class="page-link"
              href="#"
            >Previous</a>
          </li>
          <li
            :class="{active: pagination.current_page === item}"
            :key="item + key"
            @click="getProducts(item)"
            class="page-item"
            v-for="(item, key) in pagination.total_pages"
          >
            <a
              class="page-link"
              href="#"
            >{{ item }}</a>
          </li>
          <li
            :class="{ disabled:pagination.total_pages === pagination.current_page }"
            class="page-item"
          >
            <a
              @click="getProducts(pageNumber+=1)"
              class="page-link"
              href="#"
            >Next</a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
/* global $ */
import
{
  backApiProducts,
  uploadApiFile,
  createProduct,
  deleteProduct,
  editProduct,
  createCartProduct,
}
  from '@/utils/api';

export default {
  name: 'Products',
  data() {
    return {
      isEnabled: false,
      isShowImg: false,
      isLoading: false,
      pagination: {},
      pageNumber: 1,
      apiProducts: [],
      tempProduct: {
        id: '',
        title: '',
        category: '',
        description: '',
        imageUrl: [],
        enabled: false,
        origin_price: 0,
        price: 0,
        unit: '',
      },
    };
  },
  methods: {
    getProducts(page = 1) {
      this.isLoading = true;
      backApiProducts(page).then((res) => {
        // 防止點擊換頁數字後 pageNumber 頁數錯誤
        this.pageNumber = page;
        this.apiProducts = res.data.data;
        this.pagination = res.data.meta.pagination;
        this.isLoading = false;
      }).catch((rej) => {
        this.isLoading = false;
        throw rej;
      });
    },
    showModal(active, item) {
      this.tempProduct = {
        imageUrl: [],
      };
      // 如果不是新增找到相符的 id 把要修改或刪除的資料匯入到 tempProduct
      if (active !== 'New') {
        this.tempProduct = item;
      }
      if (active === 'del') {
        $('#deleteModal').modal('show');
      } else {
        $('#modal').modal('show');
      }
    },
    addToCart(item, quantity = 1) {
      this.isLoading = true;
      const cartData = {
        product: item.id,
        quantity,
      };
      createCartProduct(cartData).then(() => {
        this.isLoading = false;
        this.$toasted.show('加入購物車成功', {
          icon: {
            name: 'check_circle',
          },
        });
      }).catch((rej) => {
        this.$toasted.show('加入購物車失敗', {
          icon: {
            name: 'report_problem',
          },
        });
        this.isLoading = false;
        throw rej;
      });
    },
    uploadProduct() {
      this.isLoading = true;
      let method;
      let { id } = this.tempProduct;
      // 假設是 edit
      method = editProduct;
      // 判斷是新增商品，如果 id 是 undefined 賦予 id
      if (!this.tempProduct.id) {
        id = new Date().getTime();
        this.tempProduct.id = id;
        method = createProduct;
      }
      method(this.tempProduct, id).then(() => {
        $('#modal').modal('hide');
        this.getProducts();
        this.isLoading = false;
        this.toastSuccess(method);
      }).catch((rej) => {
        this.isLoading = false;
        this.toastFalse(method);
        throw rej;
      });
    },
    toastSuccess(method) {
      if (method === createProduct) {
        this.$toasted.show('新增成功', {
          icon: {
            name: 'check_circle',
          },
        });
        return;
      }
      this.$toasted.show('修改成功', {
        icon: {
          name: 'check_circle',
        },
      });
    },
    toastFalse(method) {
      if (method === createProduct) {
        this.$toasted.show('新增失敗', {
          icon: {
            name: 'report_problem',
          },
        });
        return;
      }
      this.$toasted.show('修改失敗', {
        icon: {
          name: 'report_problem',
        },
      });
    },
    uploadFile() {
      const selectedFile = this.$refs.selectFile.files[0];
      const formData = new FormData();
      // 把 file 加入到 formData 內
      formData.append('file', selectedFile);
      uploadApiFile(formData).then((res) => {
        this.tempProduct.imageUrl[0] = res.data.data.path;
      }).catch((rej) => {
        throw rej;
      });
    },
    confirmDel() {
      this.isLoading = true;
      deleteProduct(this.tempProduct.id).then(() => {
        this.getProducts();
        this.$toasted.show('刪除成功', {
          icon: {
            name: 'check_circle',
          },
        });
        $('#deleteModal').modal('hide');
      }).catch((rej) => {
        throw rej;
      });
    },
  },
  computed: {
    filterProducts() {
      if (this.isEnabled === true) {
        return this.apiProducts.filter((item) => item.enabled === true);
      }
      return this.apiProducts;
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
