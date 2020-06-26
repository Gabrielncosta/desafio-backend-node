<template>
  <div class="list-category">
    <div class="form category">
      <h1>Listar categorias</h1>
      <ul v-if="isDataFetched">
        <el-table :data="responseData" style="width: 100%">
          <el-table-column prop="id" label="id"></el-table-column>
          <el-table-column prop="name" label="name" width="100"></el-table-column>
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
             console.log(vm.responseData)
        response.data.forEach(value => {
          vm.responseData.push({
       
            id: value.id,
            name: value.name
          });
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
          const response = await api.delete(`category/${scope.id}`, {
            headers: { Authorization: `Bearer ${vm.token}` }
          });

          alert(response)

          this.$message({
            type: 'success',
            message: 'Categoria Deletada'
          });

          vm.fecthData(vm);
        } catch (err) {
          this.$message({
            type: 'error',
            message: 'Uma categoria com produtos não pode ser deletada'
          });
        }
      });
    },
    handleEdit(index, scope) {
      console.log(index);
      const vm = this;
      const id = scope.id;
      this.$prompt('Digite o novo nome da categoria', 'Editar Categoria', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        inputPattern: /^[a-zA-Z]+$/,
        inputErrorMessage: 'Nome inválido.'
      })
      .then(async ({ value }) => {
        const data = {
          name: value
        };
        try {
          const res = await api.put(`category/${id}`, data, {
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
