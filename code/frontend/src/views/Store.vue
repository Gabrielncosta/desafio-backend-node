<template>
  <div class="store">
    <el-container>
      <el-main>
        <div class="product-container">
          <template v-for="produto in products">
            <Product
              :product_id="produto.id"
              :name="produto.name"
              :price="produto.price"
              :key="produto.id"
              :quantity="produto.stock_balance"
              :image_id="produto.image_id"
            ></Product>
          </template>
          <!-- <Product :name="title" :price="price"></Product>
          <Product :name="title" :price="price"></Product> -->
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Product from '@/components/Product.vue';
import api from '@/services/api';
export default {
  name: 'Store',
  components: {
    Product
  },
  data() {
    return {
      title: 'Blusa',
      price: '$50.99',
      products: [],
      config: { headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` } },
      token: sessionStorage.getItem('token')
    };
  },
  methods: {
    async fetchData() {
      const vm = this;
      try {
        const response = await api.get('category', this.config);
        for (const data of response.data) {
          for (const product of data.products) {
            console.log(product);
          
            vm.products.push(product);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  },
  async beforeMount() {
    await this.fetchData();
  }
};
</script>

<style>
.product-container {
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
}

</style>
