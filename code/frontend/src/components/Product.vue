<template>
  <div class="product__item">
    <el-container>
      <el-main class="main__holder">
        <img :src="`${src}${image_id}`" alt="" class="product__item-image" />
        <h1>
          {{ name }}
        </h1>
        <p class="p-price">R${{ price }}</p>
        <div>
          <p>
            Quantidade: <span>{{ quantity }}</span>
          </p>
        </div>
        <el-button v-on:click="buy" type="success" round>Comprar</el-button>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import api from '@/services/api';
export default {
  name: 'Product',
  components: {},
  props: {
    product_id: Number,
    name: String,
    price: Number,
    quantity: Number,
    image_id: Number
  },
  data() {
    return {
      config: { headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` } },
      token: sessionStorage.getItem('token'),
      src: 'http://127.0.0.1:3333/files/'
    };
  },
  methods: {
    async fetchImages() {
      try {
        const response = await api.get(`files/${this.image_id}`, this.config);
        this.src = URL.createObjectURL(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    },

    async buy () {
      const data = {
        product_id: this.product_id,
        total_price: this.price,
        quantity: 1,
      }
      console.log(data)
      const response = await api.post('sales', data)
      console.log(response)
    }
  },
  async beforeMount() {
    await this.fetchImages();
  }
};
</script>

<style scoped>

.product__item {
  border: none !important;
}

.el-button {
  margin-top: 10px !important;
  border-radius: 5px !important;
  background-color: rgba(0, 216, 216, 1);
  border: none;
  font-weight: 700;
  font-size: 1.4em;
}

.main__holder {
  background-color: #fff !important;
  border: none;
}

.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}

.product__item {
  display: flex;
  justify-content: right;
  align-items: flex-start;
  margin: 2vw;
  border: 1px solid rgba(0, 0, 0, 0.25);
  width: 260px;
  min-height: 25vh;
  max-height: 35vh;
  word-wrap: break-word;
}
.product__item-image {
  width: 150px;
  height: 150px;
  object-fit: cover;
}
</style>
