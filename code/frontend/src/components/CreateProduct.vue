<template>
  <div class="create-product" v-if="isDataFechted">
    <el-form ref="form" :model="form" label-width="140px" enctype="multipart/form-data">
     <div>
       </div>
      <el-form-item label="Nome do Produto">
        <el-col :span="8">
          <el-input class="inputt" v-model="form.name" placeholder="dasdsasd"></el-input>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Categorias">
            <el-select v-model="form.category" placeholder="Selecione uma categoria">
              <template v-for="item in categories">
                <el-option :label="item.name" :value="item.id" :key="item.id"></el-option>
              </template>
            </el-select>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="Preço">
        <el-input v-model="form.price"></el-input>
      </el-form-item>
      <el-form-item label="Quantidade">
        <el-input v-model="form.stock_balance"></el-input>
      </el-form-item>
      <el-form-item>
        <div class="imgDiv">
      
          <input class="el-input__inner" type="file" @change="onFileSelected" />
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="createProduct">Criar Produto</el-button>
      </el-form-item>
    </el-form> -->
  </div>
</template>

<script>
import api from '@/services/api';
export default {
  name: 'CreateProduct',
  data() {
    return {
      form: {
        category: '',
        name: '',
        price: '',
        stock_balance: '',
        imageFile: null
      },
      token: sessionStorage.getItem('token'),
      isDataFechted: false,
      url: null,
      config: { headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` } }
    };
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await api.get('category', this.config);
        return response.data;
      } catch (error) {
        console.log('Data not loaded');
      }
    },
    onFileSelected($event) {
      this.form.imageFile = $event.target.files[0];
      this.url = URL.createObjectURL(this.form.imageFile);
      console.log(this.form.imageFile);
    },
    async uploadImage() {
      const fd = new FormData();
      fd.append('file', this.form.imageFile);
      const config = {
        headers: { 'content-type': 'multipart/form-data', Authorization: `Bearer ${this.token}` }
      };
      const response = await api.post('files', fd, config);
      return response.data.id;
    },
    async createProduct() {
      const id = await this.uploadImage();
      const categoryPage = this.form.category;
      const data = {
        name: this.form.name,
        price: this.form.price,
        stock_balance: this.form.stock_balance,
        image_id: id
      };
      const response = await api.post(`category/${categoryPage}/products`, data, this.config);
      console.log(response);
    }
  },
  async created() {
    this.categories = await this.fetchCategories();
    this.isDataFechted = true;
    console.log(this.categories);
  }
};
</script>

<style scoped>

  .el-form-item > input {
    padding: 0px !important;
    margin: 0px !important;
  }
  .avatar-uploader .el-upload {
    cursor: pointer;
  }

  .el-form-item__label {
    height: 0px !important;
    background-color: pink !important;
  
  }

  .el-input__inner {
    margin: 0px !important;
  }

  input {
    margin: 0px !important;
    padding: 0px !important;
  }
  
  input[type='file'] {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    vertical-align: middle;
  }

  .imgDiv {
    display: flex;
    align-items: baseline;
    justify-content: center;
    height: 50px;

  }
  .image-preview {
    max-height: 100%;
    border-radius: 4px;
    height: 100%;
  }
</style>
