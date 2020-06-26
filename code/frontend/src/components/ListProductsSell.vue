<template>
  <el-container style="height: 500px; border: 1px solid #eee">
    <el-aside>
      <h1>aside</h1>
    </el-aside>
    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <span class="product-label">Produtos</span>
        <el-input v-model="search" size="mini" placeholder="Type to search" style="width: 30%;" />
      </el-header>
      <el-main>
        <h1>main</h1>
        <el-table :data="tableData">
          <el-table-column label="ID" prop="id"></el-table-column>
          <el-table-column label="Preço" prop="total_price"></el-table-column>
          <el-table-column label="Produto" prop="product.name"></el-table-column>
        </el-table>
      </el-main>
    </el-container>
    <h2 v-on:click="close" class="x-button">X</h2>
  </el-container>
</template>

<script>
'use strict';
import api from '@/services/api';
export default {
  name: 'ListProductsSell',
  data() {
    return {
      config: { headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` } },
      token: sessionStorage.getItem('token'),
      tableData: []
    };
  },
  methods: {
    close() {
      this.$emit('close', this.$options.name);
    },
    async fetchData() {
      try {
        const response = await api.get('sales', this.config);
        this.tableData = response.data;
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

<style scoped>
.list-products-sell {
  position: relative;
  text-align: center;
}
.x-button {
  position: absolute;
  top: 5px;
  right: 25px;
  padding: 5px 15px;
  border: 1px solid rgba(0, 0, 0, 0.14);
  transition: 500ms;
}
.x-button:hover,
.x-button:focus {
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 1);
}
.product-label {
  font-size: 18px;
  padding-right: 20px;
}
</style>
