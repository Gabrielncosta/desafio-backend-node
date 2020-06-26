<template>
  <div class="list-category">
    <div class="form category">
      <h1>Listar Vendas</h1>
      <ul v-if="isDataFetched">
        <el-table :data="responseData" style="width: 100%">
          <el-table-column prop="id" label="id da venda" width="120"></el-table-column>
          <el-table-column prop="created_at" label="Criado_em" width="200"></el-table-column>
          <el-table-column prop="product_id" label="Id do produto" width="150"></el-table-column>
          <el-table-column prop="product_name" label="Nome do produto" width="180"></el-table-column>
          <el-table-column prop="sale_total" label="Preço total" width="150"></el-table-column>
          <el-table-column label="Operations" width="150">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="handleDelete(scope.row)">Delete</el-button>
            </template>
          </el-table-column>
        </el-table>
      </ul>
    </div>
  </div>
</template>

<script>
import api from '@/services/api';
export default {
  name: 'ListCategory',
  data() {
    return {
      responseData: [],
      isDataFetched: false,
      token: sessionStorage.getItem('token')
    };
  },
  methods: {
    async fecthData(vm) {
      try {
        const response = await api.get('sales', {
          headers: { Authorization: `Bearer ${this.token}` }
        });
        vm.responseData = [];
        vm.$forceUpdate();

        response.data.map(function(item) {
          vm.responseData.push({
            id: item.id,
            created_at: item.created_at,
            product_name: item.product[0].name,
            product_id: item.product[0].id,
            sale_total: `R$ ${item.salesProduct[0].total_price}`,
          })
          
        })

        response.data.forEach(value => {
          if(value.products.length > 0) {
            value.products.forEach(value => {
              vm.responseData.push({
                id: value.id,
                category_id: value.category_id,
                name: value.name
              });
            })
          }
        });
      } catch (error) {
        console.log('There was an error getting categories from server');
      }
    },
    async handleDelete(scope) {
      const vm = this;
      this.$confirm('Você ira deletar permanentemente esse pedido de venda, a quantidade do produto retornará ao estoque.', 'Aviso', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(async () => {
        try {
          await api.delete(`sales/${scope.id}`, {
            headers: { Authorization: `Bearer ${vm.token}` }
          });

          this.$message({
            type: 'success',
            message: 'Produto Deletado'
          });

          vm.fecthData(vm);
        } catch (err) {
          this.$message({
            type: 'error',
            message: 'Este produto não pode ser deletado, verifique se há alguma compra em andamento.' + err
          });
        }
      });
    },
  },
  async created() {
    const vm = this;
    vm.fecthData(vm);
    this.isDataFetched = !this.isDataFetched;
  }
};
</script>