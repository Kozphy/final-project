<template>
  <div>
    <loading :active.sync="isLoading" />
    <div class="container mt-5">
      <div class="row">
        <div class="d-flex justify-content-between align-items-end w-100">
          <button
            @click="delMultiImg"
            class="btn btn-danger d-flex"
          >
            <span class="material-icons">delete</span>
            <span>復選刪除</span>
          </button>
          <button
            @click="showModal('new')"
            class="btn btn-primary"
          >新增圖片</button>
        </div>
        <table class="table mt-3">
          <thead>
            <tr>
              <th></th>
              <th class="text-center">縮圖</th>
              <th class="text-center">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr
              :key="item + key"
              @click="selectMulti(item)"
              v-for="(item, key) in dataImg"
            >
              <td class="text-center align-middle">
                <input
                  type="checkbox"
                  v-model="item.selectDel"
                />
              </td>
              <td class="text-center">
                <img
                  :alt="item.path"
                  :src="item.path"
                  style="width:5rem; height:5rem;"
                />
              </td>
              <td class="text-center align-middle">
                <button
                  @click="showModal('eidt', item)"
                  class="btn btn-primary btn-sm mr-2"
                >修改</button>
                <button
                  @click="delSingleImg(item.id)"
                  class="btn btn-danger btn-sm"
                >刪除</button>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- 新增圖片的動態元件 -->
        <div
          aria-hidden="true"
          aria-labelledby="exampleModalLabel"
          class="modal fade"
          id="modal"
          role="dialog"
          tabindex="-1"
        >
          <div
            class="modal-dialog modal-lg"
            role="document"
          >
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">新增圖片</h5>
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
                <div class="from-group">
                  <label for="inputUrl">請輸入圖片位置</label>
                  <input
                    class="form-control"
                    ref="inputUrl"
                    type="text"
                    v-model="imgUrl"
                  />
                </div>
                <div class="from-group mt-2">
                  <label for="inputFile">請選擇檔案</label>
                  <input
                    @change="showFile('isFile')"
                    class="form-control"
                    ref="selectedFile"
                    type="file"
                  />
                </div>
                <img
                  :alt="imgUrl"
                  :src="imgUrl"
                  class="w-100 mt-3"
                />
              </div>
              <div class="modal-footer">
                <button
                  class="btn btn-secondary"
                  data-dismiss="modal"
                  type="button"
                >取消</button>
                <button
                  @click="checkActive"
                  class="btn btn-primary"
                  type="button"
                >確認</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* global $ */
import {
  getApiImg,
  delImg,
  uploadApiFile,
  editImg,
} from '@/utils/api';

export default {
  name: 'ImgStorage',
  data() {
    return {
      isNew: true,
      imgUrl: '',
      isLoading: false,
      pagination: {},
      dataImg: [],
    };
  },
  methods: {
    getAllImg(page = 1) {
      this.isLoading = true;
      getApiImg(page).then((res) => {
        this.dataImg = res.data.data;
        // 設定 checkbox
        this.dataImg.forEach((item) => {
          this.$set(item, 'selectDel', false);
        });
        this.pagination = res.data.meta.pagination;
        this.isLoading = false;
      }).catch((rej) => {
        this.isLoading = false;
        throw rej;
      });
    },
    showModal(active, item) {
      this.imgUrl = '';
      if (active !== 'new') {
        this.imgUrl = item.path;
        this.isNew = false;
      }
      // isNew === true
      this.$refs.selectedFile.value = '';
      $('#modal').modal('show');
    },
    showFile(active) {
      if (active === 'isFile') {
        const selectedFile = this.$refs.selectedFile.files[0];
        // 讀取並顯示圖片
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onload = () => {
          this.imgUrl = reader.result;
        };
        return;
      }
      this.uploadFile(this.imgUrl);
    },
    checkActive() {
      this.isLoading = true;
      const selectedFile = this.$refs.selectedFile.files[0];
      const inputUrl = this.$refs.inputUrl.value;
      // 轉換 file 到 formDataㄜ
      const formData = new FormData();
      formData.append('file', selectedFile);
      // 如果 input 為空
      if (!selectedFile && inputUrl) {
        this.$toasted.show('請選擇圖片', {
          icon: {
            name: 'warning',
          },
        });
        this.isLoading = false;
        return;
      }
      if (this.isNew === true) {
        this.uploadFile(formData);
        return;
      }
      this.editApiFile(formData);
      this.isLoading = false;
    },
    uploadFile(formData) {
      uploadApiFile(formData).then(() => {
        $('#modal').modal('hide');
        this.isLoading = false;
        this.$toasted.show('上傳成功', {
          icon: {
            name: 'check_circle',
          },
        });
        this.getAllImg();
      }).catch((rej) => {
        this.isLoading = false;
        this.$toasted.show('上傳失敗', {
          icon: {
            name: 'repeat_problem',
          },
        });
        $('#modal').modal('hide');
        throw rej;
      });
    },
    editApiFile(file) {
      editImg(file).then(() => {
        this.isLoading = false;
        $('#modal').modal('hide');
        this.$toasted.show('修改成功', {
          icon: {
            name: 'check_circle',
          },
        });
        this.getAllImg();
      }).catch((rej) => {
        this.isLoading = false;
        $('#modal').modal('hide');
        this.$toasted.show('修改失敗', {
          icon: {
            name: 'repeat_porblem',
          },
        });
        throw rej;
      });
    },
    selectMulti(choose) {
      // 點擊 td 任何地方切換 checkbox
      this.dataImg.forEach((item, index) => {
        if (choose.id === item.id) {
          this.dataImg[index].selectDel = !choose.selectDel;
        }
      });
    },
    delSingleImg(id) {
      // 無選取時，啟動單個刪除健
      this.isLoading = true;
      this.delImages(id);
    },
    delMultiImg() {
      this.isLoading = true;
      const selectImg = this.dataImg.filter((item) => item.selectDel === true)
        .map((item) => item.id);
      // 有選取時，刪除多個選取的圖片
      selectImg.forEach((id) => {
        this.delImages(id);
      });
      // 當無選取，但點擊複選刪除時
      if (!selectImg[0]) {
        this.isLoading = false;
      }
    },
    delImages(id) {
      delImg(id).then(() => {
        this.getAllImg();
      }).catch((rej) => {
        this.isLoading = false;
        throw rej;
      });
    },
  },
  created() {
    this.getAllImg();
  },
};
</script>
