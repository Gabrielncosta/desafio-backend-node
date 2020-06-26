<template>
  <div class="list-category">
    <div class="form category">
      <h1>Listar Produtos</h1>
      <ul v-if="isDataFetched">
        <el-table :data="responseData" style="width: 100%">
          <el-table-column prop="id" label="id"></el-table-column>
          <el-table-column prop="name" label="name" width="100"></el-table-column>
          <el-table-column prop="stock_balance" label="Quantidade em estoque" width="205"></el-table-column>
          <el-table-column prop="category_id" label="category_id" width="150"></el-table-column>
          <el-table-column label="Operations" width="180">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
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
        const response = await api.get('category', {
          headers: { Authorization: `Bearer ${this.token}` }
        });
        vm.responseData = [];
        vm.$forceUpdate();

        response.data.forEach(value => {
          if(value.products.length > 0) {
            value.products.forEach(value => {
              vm.responseData.push({
                id: value.id,
                category_id: value.category_id,
                name: value.name,
                stock_balance: value.stock_balance
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
      this.$confirm('Você ira deletar permanentemente essa categoria e todos os produtos dentro dela', 'Aviso', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(async () => {
        try {
          await api.delete(`category/${scope.category_id}/products/${scope.id}`, {
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
    handleEdit(index, scope) {
      const vm = this;
      this.$prompt('Digite a quantidade em estoque', 'Editar produto', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        inputPattern: /^[1-9]+$/,
        inputErrorMessage: 'Nome inválido.'
      })
      .then(async ({ value }) => {
        const data = {
          stock_balance: value
        };
        try {
          const res = await api.put(`category/${scope.category_id}/products/${scope.id}`, data, {
            headers: { Authorization: `Bearer ${this.token}` }
          });

          console.log(res)

          this.$message({
            type: 'success',
            message: `Propridade com novo nome de: ${value}`
          });
          vm.fecthData(vm);
        } catch (error) {
          this.$message({
          type: 'error',
          message: 'Houve um erro ao editar esta categoria' 
        });
        }
      })
    }
  },
  async created() {
    const vm = this;
    vm.fecthData(vm);
    this.isDataFetched = !this.isDataFetched;
  }
};
</script>
